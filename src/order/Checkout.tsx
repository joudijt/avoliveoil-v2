/**
 * Checkout (FORGE ORDER-R1 + FORGE HITPAY), part of the lazy chunk. Steps in one <dialog>:
 * 1 details form; 2 "Check and pay" (online mode: Pay RM X securely -> HitPay page), or, only while
 * online payment is not open yet (chat mode), 2 review + send on WhatsApp and 3 sent.
 * The return from HitPay lands on /<lang>/order/paid (PaidPage.tsx), not in this dialog.
 * Steps 2 and 3 are painted ONLY from the frozen order snapshot, in the snapshot's language (O-6).
 * The dialog closes only by its buttons: a stray tap or Escape must not hide a half-typed form.
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { findItem } from './catalog';
import { ORDER_CONFIG } from './config';
import {
  FIELD_MAX,
  FIELD_ORDER,
  buildWhatsAppUrl,
  computeTotals,
  createOrder,
  fitOrderMessage,
  formatRM,
  isHitpayCheckoutUrl,
  isRef,
  lineTotalSen,
  makeIdem,
  orderContentKey,
  parseOrder,
  plainChatUrl,
  serializeOrder,
  validateDetails,
  type CoreConfig,
  type DetailErrorCode,
  type DetailErrors,
  type DetailField,
  type Lang,
  type Order,
  type OrderLine,
} from './core';
import { MESSAGE_LABELS, ORDER_NAMES, STATES_MY, sizeLabel } from './messageStrings';
import {
  BAND,
  BTN_GOLD,
  BTN_LINE,
  BTN_WA,
  CARD,
  ICON_BTN,
  LABEL,
  LINK,
  SMALL,
  copyText,
  useModalDialog,
} from './scrollLock';
import { checkoutIntent, currentCart, orderActions, orderStorage, useOrderRev, useOrderUi } from './store';
import { UI_STRINGS, fill, type UiStrings } from './uiStrings';
import { createPayment, forgetPayConfig, loadPayConfig, type PayConfig } from './payApi';

const KEYS = ORDER_CONFIG.keys;
/** Exactly the fields core.ts takes, nothing else from the site config. */
const CORE_CFG: CoreConfig = {
  whatsapp: ORDER_CONFIG.whatsapp,
  maxQty: ORDER_CONFIG.maxQty,
  deliverySen: ORDER_CONFIG.deliverySen,
  refPrefix: ORDER_CONFIG.refPrefix,
  urlCap: ORDER_CONFIG.urlCap,
  orderTtlMs: ORDER_CONFIG.orderTtlMs,
};
type Values = Record<DetailField, string>;
const BLANK: Values = { name: '', phone: '', address: '', postcode: '', city: '', state: '', note: '' };

/* ---------- storage ---------- */

function readOrder(): Order | null {
  return parseOrder(orderStorage.get(KEYS.order), Date.now(), CORE_CFG, STATES_MY);
}
function saveOrder(order: Order): void {
  orderStorage.set(KEYS.order, serializeOrder(order));
  orderActions.refreshOrder();
}
function dropOrder(): void {
  orderStorage.del(KEYS.order);
  orderActions.refreshOrder();
}

/** O-8: `{savedAt, values}`, ignored and deleted when older than 30 days or malformed. */
function readDetails(): Values | null {
  const raw = orderStorage.get(KEYS.details);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { savedAt?: unknown; values?: unknown } | null;
    const age = data && typeof data.savedAt === 'number' ? Date.now() - data.savedAt : NaN;
    if (data && data.values && typeof data.values === 'object' && age >= 0 && age < ORDER_CONFIG.detailsTtlMs) {
      const stored = data.values as Record<string, unknown>;
      const out = { ...BLANK };
      for (const f of FIELD_ORDER) {
        const v = stored[f];
        if (typeof v !== 'string') continue;
        if (f === 'state') out.state = STATES_MY.includes(v) ? v : '';
        else out[f] = v.slice(0, FIELD_MAX[f]);
      }
      return out;
    }
  } catch {
    /* falls through to the delete */
  }
  orderStorage.del(KEYS.details);
  return null;
}
function saveDetails(values: Values): void {
  orderStorage.set(KEYS.details, JSON.stringify({ savedAt: Date.now(), values }));
}

/* ---------- pointer type (desktop = hover + fine pointer) ---------- */

function pointerQuery(): MediaQueryList | null {
  try {
    return typeof window.matchMedia === 'function' ? window.matchMedia('(hover: hover) and (pointer: fine)') : null;
  } catch {
    return null;
  }
}
function subscribePointer(onChange: () => void): () => void {
  const mq = pointerQuery();
  if (!mq || typeof mq.addEventListener !== 'function') return () => {};
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
const isDesktop = (): boolean => pointerQuery()?.matches ?? false;
const notDesktop = (): boolean => false;

/* ---------- helpers ---------- */

/** 29300 -> '293.00' (what is typed into a banking app). */
function plainAmount(sen: number): string {
  return `${Math.floor(sen / 100)}.${String(sen % 100).padStart(2, '0')}`;
}

function errorText(s: UiStrings, field: DetailField, code: DetailErrorCode): string {
  const e = s.errors;
  if (code === 'tooLong') return e.tooLong;
  switch (field) {
    case 'name':
      return e.nameRequired;
    case 'phone':
      return code === 'phone' ? e.phoneInvalid : e.phoneRequired;
    case 'address':
      return e.addressRequired;
    case 'postcode':
      return code === 'postcode' ? e.postcodeInvalid : e.postcodeRequired;
    case 'city':
      return e.cityRequired;
    case 'state':
      return e.stateRequired;
    default:
      return e.tooLong;
  }
}

/** Links and message of an order, for the pointer in use right now. */
function useOrderLinks(order: Order | null): { message: string; fits: boolean; href: string } | null {
  const desktop = useSyncExternalStore(subscribePointer, isDesktop, notDesktop);
  return useMemo(() => {
    if (!order) return null;
    const fit = fitOrderMessage(order, MESSAGE_LABELS[order.lang], CORE_CFG);
    const wa = ORDER_CONFIG.whatsapp;
    return {
      message: fit.message,
      fits: fit.fits,
      // O-5: a message that does not fit is copied by hand, the link opens the plain chat.
      href: fit.fits ? buildWhatsAppUrl(wa, fit.message, desktop) : plainChatUrl(wa, desktop),
    };
  }, [order, desktop]);
}

const FIELD_BOX = `box-border w-full min-h-[50px] rounded-xl border-[1.5px] border-olive-dark/35 bg-cream px-3.5 py-3 text-[17px] leading-snug text-olive-dark aria-[invalid=true]:border-2 aria-[invalid=true]:border-red-700 focus-visible:border-olive-dark focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-gold-ink`;
const ROW = 'flex items-baseline justify-between gap-4';
const MONO = 'min-w-0 text-[22px] font-semibold tracking-wide tabular-nums [overflow-wrap:anywhere] select-all';

/* ---------- drawer banner (O-7) ---------- */

/** Row at the top of the cart drawer for a saved order. Never opens anything by itself. */
export function OrderBanner() {
  const ui = useOrderUi();
  const rev = useOrderRev();
  // Re-read whenever the saved order changes (`rev` is only a trigger).
  const order = useMemo(() => (ui.hasOrder && rev >= 0 ? readOrder() : null), [ui.hasOrder, rev]);
  const shown = order && (order.step === 3 || (order.step === 2 && order.payMode === 'online')) ? order : null;

  useEffect(() => {
    // The key is there but it does not hold a live order: remove it so the header dot goes too.
    if (ui.hasOrder && !shown) dropOrder();
  }, [ui.hasOrder, shown]);

  if (!shown) return null;
  const s = UI_STRINGS[shown.lang].cart;
  const sent = shown.step === 3;
  return (
    <div
      data-testid="cart-banner"
      data-step={shown.step}
      className="mb-4 grid gap-1 rounded-2xl border border-gold-ink/50 bg-cream px-4 py-3"
    >
      <p className="font-semibold">{fill(sent ? s.bannerSent : s.bannerContinue, { ref: shown.ref })}</p>
      <button type="button" onClick={orderActions.resumeOrder} className={LINK}>
        {sent ? s.bannerSentAction : s.bannerContinueAction}
      </button>
    </div>
  );
}

/* ---------- small pieces ---------- */

function Field(props: {
  field: DetailField;
  label: string;
  hint?: string;
  error?: string;
  children: (attrs: {
    id: string;
    name: DetailField;
    'data-testid': string;
    'aria-invalid': true | undefined;
    'aria-describedby': string | undefined;
    className: string;
  }) => ReactNode;
}) {
  const { field, label, hint, error } = props;
  const id = `avo-f-${field}`;
  const hintId = `avo-h-${field}`;
  const errId = `avo-e-${field}`;
  const described = [hint ? hintId : '', error ? errId : ''].filter(Boolean).join(' ');
  return (
    <div className="grid min-w-0 gap-1.5">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {props.children({
        id,
        name: field,
        'data-testid': `field-${field}`,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': described || undefined,
        className: FIELD_BOX,
      })}
      {hint && (
        <p id={hintId} className={SMALL}>
          {hint}
        </p>
      )}
      <p id={errId} data-testid={`error-${field}`} hidden={!error} className="text-[15px] font-semibold text-red-700">
        {error ?? ''}
      </p>
    </div>
  );
}

function Summary({ order, s, onEdit }: { order: Order; s: UiStrings; onEdit?: () => void }) {
  const t = computeTotals(order.lines, order.deliverySen);
  const d = order.details;
  return (
    <div className={`${CARD} grid gap-2`}>
      <p className={LABEL}>{s.review.summaryTitle}</p>
      <ul className="grid gap-1.5">
        {order.lines.map((l) => (
          <li key={l.sku} className={ROW}>
            <span className="min-w-0">
              {/* 'x' and the quantity stay on one line (display only; the message text is core.ts) */}
              {l.name} {l.sizeLabel} {'x\u00a0'}{l.qty}
            </span>
            <span className="shrink-0 font-semibold tabular-nums">{formatRM(lineTotalSen(l))}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-1 grid gap-1 border-t border-olive-dark/15 pt-2">
        <div className={ROW}>
          <dt className="text-olive-dark/75">{s.cart.subtotal}</dt>
          <dd className="font-semibold tabular-nums">{formatRM(t.subtotalSen)}</dd>
        </div>
        <div className={ROW}>
          <dt className="text-olive-dark/75">{s.cart.delivery}</dt>
          <dd className="text-end font-semibold">
            {t.deliverySen === null ? s.cart.deliveryTbc : formatRM(t.deliverySen)}
          </dd>
        </div>
        <div className={`${ROW} text-lg`}>
          <dt className="font-semibold">{s.cart.total}</dt>
          <dd data-testid="order-total" className="font-bold tabular-nums">
            {formatRM(t.totalSen)}
          </dd>
        </div>
      </dl>
      {order.payMode === 'chat' && <p className={SMALL}>{s.review.confirmTotal}</p>}
      <p className={`${LABEL} mt-2`}>{s.review.deliverTo}</p>
      <p className="[overflow-wrap:anywhere]">
        {d.name}
        <br />+{d.phone}
        <br />
        {d.address}, {d.postcode} {d.city}, {d.state}
      </p>
      {onEdit && (
        <button type="button" onClick={onEdit} className={`${LINK} justify-self-start`}>
          {s.review.edit}
        </button>
      )}
    </div>
  );
}

function MessagePreview({ message, label }: { message: string; label: string }) {
  return (
    <details>
      <summary className={`${LINK} w-fit`}>{label}</summary>
      <pre
        data-testid="message-preview"
        className="mt-2 rounded-xl border border-olive-dark/15 bg-bg p-3 font-[inherit] text-[15px] whitespace-pre-wrap [overflow-wrap:anywhere] select-text"
      >
        {message}
      </pre>
    </details>
  );
}

/* ---------- the dialog ---------- */

export function Checkout() {
  const { i18n } = useTranslation();
  const siteLang: Lang = i18n.language?.startsWith('ms') ? 'ms' : 'en';
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const close = orderActions.closeCheckout;
  const { fallback } = useModalDialog(ref);

  // Read once when the dialog opens. Nothing is written here.
  const [start] = useState(() => {
    const stored = checkoutIntent() === 'resume' ? readOrder() : null;
    const resumed = stored && stored.step !== 1 ? stored : null;
    return { order: resumed, values: readDetails() ?? BLANK };
  });
  const [order, setOrder] = useState<Order | null>(start.order);
  const [values, setValues] = useState<Values>(start.values);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [status, setStatus] = useState('');
  // false after "Forget my details": nothing is stored again until the form is submitted.
  const remember = useRef(true);
  const lastSend = useRef(0);
  // FORGE HITPAY: is online payment open (server answer, cached for the page view)?
  const [payCfg, setPayCfg] = useState<PayConfig | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const step: 1 | 2 | 3 = order ? order.step : 1;
  // O-6: an order that exists is shown in its own language, whatever the site language is now.
  const s = UI_STRINGS[order && step !== 1 ? order.lang : siteLang];
  const links = useOrderLinks(step === 1 || order?.payMode === 'online' ? null : order);
  const online = order ? order.payMode === 'online' : payCfg?.ready === true;

  useEffect(() => {
    let live = true;
    void loadPayConfig(ORDER_CONFIG.paySite).then((c) => {
      if (live) setPayCfg(c);
    });
    return () => {
      live = false;
    };
  }, []);

  // Back from the HitPay page (back/forward cache): the pay button works again.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent): void => {
      if (e.persisted) setPaying(false);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  // Nothing to check out (empty cart and no order to resume): show the cart instead.
  useEffect(() => {
    if (!start.order && currentCart().lines.length === 0) {
      orderActions.closeCheckout();
      orderActions.openCart();
    }
  }, [start]);

  // Each step starts at its top with the focus on its heading (not on first open: showModal did it).
  const firstStep = useRef(true);
  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // O-11: another tab, or the page coming back from the back/forward cache, changed the order.
  useEffect(() => {
    if (step === 1) return;
    const sync = (): void => {
      const stored = readOrder();
      if (!stored || stored.step === 1) orderActions.closeCheckout();
      else setOrder((cur) => (cur && serializeOrder(cur) === serializeOrder(stored) ? cur : stored));
    };
    const onStorage = (e: StorageEvent): void => {
      if (e.key === null || e.key === KEYS.order) sync();
    };
    const onShow = (e: PageTransitionEvent): void => {
      if (e.persisted) sync();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('pageshow', onShow);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onShow);
    };
  }, [step]);

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(''), 2600);
    return () => window.clearTimeout(timer);
  }, [status]);

  /** Copies the order message; when that fails the message is opened and selected for a manual copy. */
  const copyMessage = (text: string): void => {
    void copyText(text, ref.current).then((ok) => {
      setStatus(ok ? s.copied : s.copyMessageFailed);
      if (ok) return;
      const pre = ref.current?.querySelector<HTMLElement>('[data-testid="message-preview"]');
      const box = pre?.closest('details');
      if (!pre || !box) return;
      box.open = true;
      try {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        pre.scrollIntoView({ block: 'nearest' });
      } catch {
        /* the message is at least visible */
      }
    });
  };

  /* ----- step 1 ----- */

  const change = (field: DetailField, value: string): void => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
    if (remember.current) saveDetails(next);
  };

  const forget = (): void => {
    remember.current = false;
    orderStorage.del(KEYS.details);
    // A saved order of any step holds the same details: it goes too.
    dropOrder();
    setValues(BLANK);
    setErrors({});
    setStatus(s.checkout.forgotten);
  };

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const result = validateDetails(values, STATES_MY);
    if (!result.ok) {
      setErrors(result.errors);
      const first = FIELD_ORDER.find((f) => result.errors[f]);
      const el = first ? formRef.current?.elements.namedItem(first) : null;
      if (el instanceof HTMLElement) el.focus();
      return;
    }
    setErrors({});
    remember.current = true;
    saveDetails(values);

    const lines: OrderLine[] = currentCart().lines.flatMap((l) => {
      const item = findItem(l.sku);
      if (!item) return [];
      const name = ORDER_NAMES[siteLang][item.productId] ?? item.productId;
      return [{ sku: l.sku, name, sizeLabel: sizeLabel(item.size), qty: l.qty, unitSen: item.priceSen }];
    });
    if (lines.length === 0) {
      // The cart was emptied in another tab while the form was open.
      orderActions.closeCheckout();
      orderActions.openCart();
      return;
    }
    const cfg = await loadPayConfig(ORDER_CONFIG.paySite);
    setPayCfg(cfg);
    const payMode = cfg.ready ? 'online' : 'chat';
    // Going back to the details and forward again keeps the reference; a sent order never lends its own.
    const previous = readOrder();
    const draft = createOrder({
      lines,
      details: result.details,
      lang: siteLang,
      payMode,
      cfg: { ...CORE_CFG, deliverySen: cfg.ready ? cfg.deliverySen : null },
      now: new Date(),
      keepRef: previous && previous.step !== 3 ? previous.ref : undefined,
    });
    // R17: the same order (same lines, details, language) keeps its idempotency key, ref and token,
    // so a second "Pay" opens the SAME HitPay request; any change is a new order on the server.
    const same = previous && previous.step !== 3 && previous.payMode === 'online' && payMode === 'online' && orderContentKey(previous) === orderContentKey(draft);
    const frozen: Order = {
      ...draft,
      step: 2,
      ...(payMode === 'online'
        ? same && previous.idem
          ? { idem: previous.idem, ...(previous.token ? { ref: previous.ref, token: previous.token } : {}) }
          : { idem: makeIdem() }
        : {}),
    };
    setPayError('');
    saveOrder(frozen);
    setOrder(frozen);
  };

  /** Online mode: create (or reuse) the HitPay request on our server, then leave for HitPay. */
  const pay = async (): Promise<void> => {
    if (!order || order.payMode !== 'online' || paying) return;
    setPaying(true);
    setPayError('');
    const idem = order.idem ?? makeIdem();
    const res = await createPayment({ site: ORDER_CONFIG.paySite, lang: order.lang, idem, lines: order.lines, details: order.details });
    if (res.ok && isRef(res.ref, ORDER_CONFIG.refPrefix)) {
      const next: Order = { ...order, ref: res.ref, token: res.token, idem };
      saveOrder(next);
      setOrder(next);
      if (res.status === 'paid') {
        window.location.assign(`/${order.lang}/order/paid?ref=${encodeURIComponent(res.ref)}&t=${res.token}`);
        return;
      }
      // R10: the customer only ever leaves for exactly https://checkout.hit-pay.com.
      if (isHitpayCheckoutUrl(res.url)) {
        window.location.assign(res.url);
        return; // the button stays busy until the page is gone (or comes back from bfcache)
      }
    }
    const o = s.online;
    const code = res.ok ? 'bad_answer' : res.code;
    if (code === 'pay_not_ready') forgetPayConfig();
    setPayError(
      code === 'invalid'
        ? o.detailsRefused
        : code === 'unknown_sku'
          ? o.cartChanged
          : code === 'rate_limited'
            ? o.tooMany
            : code === 'order_review'
              ? o.review
              : o.unavailable
    );
    setPaying(false);
  };

  /* ----- step 2 and 3 ----- */

  const backToDetails = (): void => {
    if (!order) return;
    saveOrder({ ...order, step: 1 }); // keeps the reference for the next "Continue"
    setOrder(null);
  };

  /** The send button is a real link: the browser opens WhatsApp, this only changes state. */
  const onSend = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (e.type === 'auxclick' && e.button !== 1) return; // only a middle click opens the link
    const now = Date.now();
    if (now - lastSend.current < 2000 || !order || order.step !== 2) {
      e.preventDefault(); // repeat tap: no second tab, no second state change
      return;
    }
    lastSend.current = now;
    const sent: Order = { ...order, step: 3, createdAt: now };
    saveOrder(sent);
    // Only what was ordered leaves the cart; items added since (another tab) stay.
    for (const line of order.lines) {
      const inCart = currentCart().lines.find((l) => l.sku === line.sku)?.qty ?? 0;
      if (inCart > 0) orderActions.setQty(line.sku, Math.max(0, inCart - line.qty));
    }
    // After the click has done its navigation, so the link is still in the page while it does.
    window.setTimeout(() => setOrder(sent), 0);
  };

  /** Step 3 link: a tap that lands on it within 2 s of the send is the same double tap. */
  const onAgain = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (Date.now() - lastSend.current < 2000) e.preventDefault();
  };

  const newOrder = (): void => {
    dropOrder();
    close();
  };

  const stepNames = online ? [s.checkout.step1, s.checkout.step2Online] : [s.checkout.step1, s.checkout.step2Chat, s.checkout.step3];
  const totalSen = order ? computeTotals(order.lines, order.deliverySen).totalSen : 0;
  const heading = 'text-[26px] leading-tight font-semibold text-olive-dark focus:outline-none';
  const foot =
    'sticky bottom-0 z-[1] -mx-4 mt-1 grid gap-2.5 border-t border-olive-dark/15 bg-bg px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:-mx-5 sm:px-5';

  return createPortal(
    <dialog
      ref={ref}
      data-testid="checkout"
      data-order-dialog=""
      data-lenis-prevent=""
      data-step={step}
      aria-label={s.checkout.title}
      onCancel={(e) => e.preventDefault()}
      onClose={() => {
        // A stale close event (StrictMode, a quick reopen) must not shut a dialog that is open again.
        if (!ref.current?.open) close();
      }}
      className={`fixed inset-0 m-auto h-dvh max-h-none w-full max-w-none flex-col overflow-hidden bg-bg p-0 text-base text-olive-dark shadow-2xl backdrop:bg-olive-dark/60 open:flex sm:h-[min(860px,calc(100dvh-32px))] sm:w-[min(600px,calc(100vw-32px))] sm:rounded-2xl ${
        fallback ? 'z-[70]' : ''
      }`}
    >
      <header className={BAND}>
        <p className="text-xl font-semibold text-cream">{s.checkout.title}</p>
        <button type="button" data-autofocus="" aria-label={s.checkout.close} onClick={close} className={ICON_BTN}>
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      <ol aria-label={s.checkout.stepsLabel} className="flex shrink-0 gap-x-4 bg-olive-dark/5 px-4 py-2.5 text-sm text-olive-dark/75 sm:px-5">
        {stepNames.map((name, i) => {
          const n = i + 1;
          const on = n <= step;
          return (
            <li
              key={n}
              aria-current={n === step ? 'step' : undefined}
              className={`flex min-w-0 items-center gap-1.5 ${n === step ? 'font-semibold text-olive-dark' : ''}`}
            >
              <span
                aria-hidden="true"
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-semibold ${
                  on ? 'bg-olive-dark text-cream' : 'border-[1.5px] border-olive-dark/60'
                }`}
              >
                {n}
              </span>
              <span className={n === step ? '' : 'max-[400px]:sr-only'}>{name}</span>
            </li>
          );
        })}
      </ol>

      <div ref={scrollRef} className="min-h-0 flex-1 scroll-pb-24 overflow-y-auto overscroll-contain">
        {step === 1 && (
          <section className="grid gap-4 px-4 pt-5 sm:px-5">
            <h2 ref={headingRef} tabIndex={-1} className={heading}>
              {s.checkout.step1}
            </h2>
            <form ref={formRef} noValidate onSubmit={(e) => void submit(e)} className="grid gap-4">
              <Field field="name" label={s.checkout.name} error={errors.name && errorText(s, 'name', errors.name)}>
                {(a) => (
                  <input
                    {...a}
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    maxLength={FIELD_MAX.name}
                    required
                    value={values.name}
                    onChange={(e) => change('name', e.target.value)}
                  />
                )}
              </Field>
              <Field
                field="phone"
                label={s.checkout.phone}
                hint={s.checkout.phoneHint}
                error={errors.phone && errorText(s, 'phone', errors.phone)}
              >
                {(a) => (
                  <input
                    {...a}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={FIELD_MAX.phone}
                    required
                    value={values.phone}
                    onChange={(e) => change('phone', e.target.value)}
                  />
                )}
              </Field>
              <Field
                field="address"
                label={s.checkout.address}
                hint={s.checkout.addressHint}
                error={errors.address && errorText(s, 'address', errors.address)}
              >
                {(a) => (
                  <textarea
                    {...a}
                    rows={3}
                    autoComplete="street-address"
                    maxLength={FIELD_MAX.address}
                    required
                    value={values.address}
                    onChange={(e) => change('address', e.target.value)}
                  />
                )}
              </Field>
              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-3 max-[359px]:grid-cols-1">
                <Field
                  field="postcode"
                  label={s.checkout.postcode}
                  error={errors.postcode && errorText(s, 'postcode', errors.postcode)}
                >
                  {(a) => (
                    <input
                      {...a}
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={FIELD_MAX.postcode}
                      required
                      value={values.postcode}
                      onChange={(e) => change('postcode', e.target.value)}
                    />
                  )}
                </Field>
                <Field field="city" label={s.checkout.city} error={errors.city && errorText(s, 'city', errors.city)}>
                  {(a) => (
                    <input
                      {...a}
                      type="text"
                      autoComplete="address-level2"
                      autoCapitalize="words"
                      maxLength={FIELD_MAX.city}
                      required
                      value={values.city}
                      onChange={(e) => change('city', e.target.value)}
                    />
                  )}
                </Field>
              </div>
              <Field field="state" label={s.checkout.state} error={errors.state && errorText(s, 'state', errors.state)}>
                {(a) => (
                  <select
                    {...a}
                    autoComplete="address-level1"
                    required
                    value={values.state}
                    onChange={(e) => change('state', e.target.value)}
                  >
                    <option value="">{s.checkout.stateSelect}</option>
                    {STATES_MY.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field field="note" label={s.checkout.note} error={errors.note && errorText(s, 'note', errors.note)}>
                {(a) => (
                  <textarea
                    {...a}
                    rows={2}
                    autoComplete="off"
                    maxLength={FIELD_MAX.note}
                    value={values.note}
                    onChange={(e) => change('note', e.target.value)}
                  />
                )}
              </Field>

              <div className="grid gap-0.5">
                <p className={SMALL}>{s.checkout.stored}</p>
                <button type="button" data-testid="forget-details" onClick={forget} className={`${LINK} justify-self-start`}>
                  {s.checkout.forget}
                </button>
              </div>

              <div className={foot}>
                <button type="submit" data-testid="details-next" className={BTN_GOLD}>
                  {s.checkout.next}
                </button>
              </div>
            </form>
          </section>
        )}

        {step === 2 && order && online && (
          <section className="grid gap-4 px-4 pt-5 pb-5 sm:px-5" data-pay-mode="online">
            <h2 ref={headingRef} tabIndex={-1} className={heading}>
              {s.review.titleOnline}
            </h2>
            {order.token && (
              <div className={`${CARD} grid gap-1`}>
                <p className={LABEL}>{s.review.refLabel}</p>
                <p data-testid="order-ref" className={MONO}>
                  {order.ref}
                </p>
              </div>
            )}
            <Summary order={order} s={s} onEdit={paying ? undefined : backToDetails} />
            <p className={`${SMALL} text-center`} data-testid="pay-methods">
              {s.online.methods}
            </p>
            {payError && (
              <div role="alert" data-testid="pay-error" className="grid gap-2 rounded-xl border border-red-700/40 bg-cream px-3.5 py-3 text-[15px] font-medium">
                <p>{payError}</p>
                <a href={plainChatUrl(ORDER_CONFIG.whatsapp, false)} target="_blank" rel="noopener" className={`${LINK} justify-self-start`}>
                  {s.online.notReadyAction}
                </a>
              </div>
            )}
            <div className={foot}>
              <button
                type="button"
                data-testid="pay-hitpay"
                disabled={paying}
                aria-busy={paying || undefined}
                onClick={() => void pay()}
                className={`${BTN_GOLD} disabled:cursor-wait disabled:opacity-70`}
              >
                {paying ? s.online.opening : fill(s.online.pay, { total: plainAmount(totalSen) })}
              </button>
              <p className={`${SMALL} text-center`}>{s.online.secureNote}</p>
            </div>
            {!paying && (
              <button type="button" onClick={backToDetails} className={`${LINK} justify-self-center`}>
                {s.review.back}
              </button>
            )}
          </section>
        )}

        {step === 2 && order && !online && links && (
          <section className="grid gap-4 px-4 pt-5 sm:px-5" data-pay-mode="chat">
            <h2 ref={headingRef} tabIndex={-1} className={heading}>
              {s.review.titleChat}
            </h2>
            {/* HITPAY 5.1: the only state in which ordering on WhatsApp shows. */}
            <p data-testid="pay-not-ready" className="rounded-xl border border-gold-ink/50 bg-cream px-3.5 py-3 font-semibold">
              {s.online.notReady}
            </p>
            <div className={`${CARD} grid gap-1`}>
              <p className={LABEL}>{s.review.refLabel}</p>
              <p data-testid="order-ref" className={MONO}>
                {order.ref}
              </p>
            </div>

            <Summary order={order} s={s} onEdit={backToDetails} />
            <p className="text-center font-semibold">{s.review.confirmChat}</p>
            <MessagePreview message={links.message} label={s.review.showMessage} />

            {!links.fits && (
              <p className="rounded-xl border border-gold-ink/50 bg-cream px-3.5 py-3 text-[15px] font-medium">
                {s.review.tooLong}
              </p>
            )}
            {/* Only the main action is sticky, so a 560 px tall screen keeps room for the content. */}
            <div className={foot}>
              {links.fits ? (
                <a
                  data-testid="send-whatsapp"
                  data-fits="true"
                  href={links.href}
                  target="_blank"
                  rel="noopener"
                  onClick={onSend}
                  onAuxClick={onSend}
                  className={BTN_WA}
                >
                  <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span>{s.review.send}</span>
                </a>
              ) : (
                <button type="button" data-testid="copy-message" onClick={() => copyMessage(links.message)} className={BTN_GOLD}>
                  {s.review.copyMessage}
                </button>
              )}
            </div>
            <div className="grid gap-2 pb-5">
              {!links.fits && (
                <a
                  data-testid="send-whatsapp"
                  data-fits="false"
                  href={links.href}
                  target="_blank"
                  rel="noopener"
                  onClick={onSend}
                  onAuxClick={onSend}
                  className={BTN_WA}
                >
                  <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span>{s.review.openWhatsApp}</span>
                </a>
              )}
              <button type="button" onClick={backToDetails} className={`${LINK} justify-self-center`}>
                {s.review.back}
              </button>
            </div>
          </section>
        )}

        {step === 3 && order && links && (
          <section className="grid gap-4 px-4 pt-5 pb-5 sm:px-5">
            <h2 ref={headingRef} tabIndex={-1} className={heading}>
              {s.sent.title}
            </h2>
            <p className="text-lg">{!links.fits ? s.sent.bodyNoFit : s.sent.bodyChat}</p>

            <div className={`${CARD} grid gap-1`}>
              <p className={LABEL}>{s.review.refLabel}</p>
              <p data-testid="order-ref" className={MONO}>
                {order.ref}
              </p>
            </div>

            <div className={`${CARD} grid gap-3`}>
              <p className={LABEL}>{s.sent.againHint}</p>
              <a
                data-testid="open-whatsapp-again"
                href={links.href}
                target="_blank"
                rel="noopener"
                onClick={onAgain}
                className={BTN_WA}
              >
                <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span>{s.sent.again}</span>
              </a>
              <button type="button" data-testid="copy-message" onClick={() => copyMessage(links.message)} className={BTN_LINE}>
                {s.review.copyMessage}
              </button>
              <MessagePreview message={links.message} label={s.review.showMessage} />
            </div>

            <Summary order={order} s={s} />

            <button type="button" data-testid="new-order" onClick={newOrder} className={BTN_LINE}>
              {s.sent.newOrder}
            </button>
          </section>
        )}
      </div>

      {/* "Copied" toast, also the polite live region: it stays in the tree when empty. */}
      <p
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[2] max-w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-full bg-olive-dark text-center font-semibold text-cream ${
          status ? 'px-4 py-2.5 shadow-lg' : 'opacity-0'
        }`}
      >
        {status}
      </p>
    </dialog>,
    document.body
  );
}
