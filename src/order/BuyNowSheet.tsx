/**
 * The Buy-now sheet (FORGE BUY-NOW §2 + RULINGS). Lazy chunk (bridge.loadSheet), default export.
 * Buy now -> this sheet -> Pay -> HitPay. A returning buyer (details remembered) = 2 taps.
 *
 * - Native <dialog> + showModal (focus trap, inert page, Escape) via useModalDialog. Full height on
 *   phones, centred dialog from 768 px. Closing keeps everything typed (details are saved on input).
 * - History (M6): opening pushes ONE entry flagged `buyNow`; Back closes the sheet; the close button
 *   and Escape go back over that entry. BuyNowRoot clears a stale flag after a reload.
 * - Pay config is fetched fresh on every open (M2): null fee / keys missing = closed state with a
 *   WhatsApp link that carries product + size + qty; 0 = "Free delivery". Nothing is totalled or paid
 *   before the server answered.
 * - Pay is never disabled (M4): a tap validates, focuses the first problem and shows an aria-live
 *   summary. While `create` runs the button is aria-disabled + busy.
 * - Idempotency (B8): the draft (`avo.draft.v1`) keeps the idem of the exact order for 20 min.
 * - The `create` answer's total must equal the total on screen; otherwise the new total is shown
 *   and the buyer taps Pay again (no redirect).
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { Picture } from '../components/ui/Picture';
import { findProduct } from '../data/products';
import { closeBuyNow, type BuyNowTarget } from './bridge';
import { defaultItem, itemsForProduct, type OrderItem } from './catalog';
import { ORDER_CONFIG } from './config';
import {
  FIELD_MAX,
  FIELD_ORDER,
  buildEnquiryMessage,
  buildWhatsAppUrl,
  computeTotals,
  formatRM,
  isHitpayCheckoutUrl,
  isRef,
  nextDraft,
  plainChatUrl,
  validateDetails,
  type DetailErrorCode,
  type DetailErrors,
  type DetailField,
  type Lang,
} from './core';
import { MESSAGE_LABELS, ORDER_NAMES, STATES_MY, sizeLabel } from './messageStrings';
import { createPayment, fetchPayConfig, type PayConfig } from './payApi';
import { BAND, BTN_GOLD, BTN_WA, CARD, ICON_BTN, LABEL, LINK, SMALL, FOCUS_RING, useModalDialog } from './scrollLock';
import { orderStorage } from './storage';
import { BLANK, readDetails, readDraft, saveDetails, saveDraft, type Values } from './drafts';
import { UI_STRINGS, fill, type UiStrings } from './uiStrings';

const KEYS = ORDER_CONFIG.keys;

/* ---------- helpers ---------- */

function isDesktop(): boolean {
  try {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch {
    return false;
  }
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
      return code === 'tooShort' ? e.addressShort : e.addressRequired;
    case 'postcode':
      return code === 'postcode' ? e.postcodeInvalid : e.postcodeRequired;
    case 'state':
      return e.stateRequired;
    default:
      return e.tooLong;
  }
}

/** Server `fields` codes -> the form's codes (unknown ones become 'required'). */
function serverErrors(fields: Record<string, string> | undefined): DetailErrors {
  const out: DetailErrors = {};
  const known: DetailErrorCode[] = ['required', 'tooLong', 'tooShort', 'phone', 'postcode', 'state'];
  for (const f of FIELD_ORDER) {
    const code = fields?.[f];
    if (code) out[f] = (known as string[]).includes(code) ? (code as DetailErrorCode) : 'required';
  }
  return out;
}

function lineLabel(lang: Lang, item: OrderItem): string {
  return `${ORDER_NAMES[lang][item.productId] ?? item.productId} ${sizeLabel(item.size)}`;
}

const FIELD_BOX = `box-border w-full min-h-[50px] rounded-xl border-[1.5px] border-olive-dark/35 bg-cream px-3.5 py-3 text-[17px] leading-snug text-olive-dark placeholder:text-olive-dark/45 aria-[invalid=true]:border-2 aria-[invalid=true]:border-red-700 focus-visible:border-olive-dark focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-gold-ink`;
const ROW = 'flex items-baseline justify-between gap-4';
const CHIP = `min-h-[48px] min-w-[96px] cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-[15px] font-semibold transition-colors ${FOCUS_RING}`;
const STEP_BTN = `grid h-12 w-12 cursor-pointer place-items-center rounded-full border-[1.5px] border-olive-dark/40 text-olive-dark transition-colors hover:bg-olive-dark/5 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${FOCUS_RING}`;

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

/* ---------- the sheet ---------- */

type Cfg = PayConfig | 'loading';

export default function BuyNowSheet({ target }: { target: BuyNowTarget }) {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith('ms') ? 'ms' : 'en';
  const s = UI_STRINGS[lang];
  const ref = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  const product = findProduct(target.productId);
  const items = itemsForProduct(target.productId);
  const [sku, setSku] = useState(() => (items.find((i) => i.size === target.size) ?? defaultItem(target.productId))?.sku ?? '');
  const item = items.find((i) => i.sku === sku) ?? items[0];
  const [qty, setQty] = useState(() => Math.min(ORDER_CONFIG.maxQty, Math.max(1, Math.floor(target.qty ?? 1))));
  const [values, setValues] = useState<Values>(() => readDetails() ?? BLANK);
  const [errors, setErrors] = useState<DetailErrors>({});
  const [dirty, setDirty] = useState<Partial<Record<DetailField, true>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [cfg, setCfg] = useState<Cfg>('loading');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');
  const [notice, setNotice] = useState('');
  /** A total the server answered for this sku+qty that differs from the computed one (M1). */
  const [confirmed, setConfirmed] = useState<{ k: string; total: number } | null>(null);
  const remember = useRef(true);
  /** The sheet was dismissed (unmounted) while `create` ran: no redirect, no state updates (review 6). */
  const dismissed = useRef(false);
  /** The press STARTED on the backdrop: a text selection dragged out of the sheet must not close it (review 8). */
  const downOnBackdrop = useRef(false);
  const sellable = !!product && !!item;

  /* ----- closing + history (M6) ----- */

  const requestClose = useCallback((): void => {
    const st = window.history.state as { buyNow?: unknown } | null;
    if (st && st.buyNow) window.history.back(); // popstate closes
    else closeBuyNow();
  }, []);
  const { fallback } = useModalDialog(ref, requestClose);

  useEffect(() => () => {
    dismissed.current = true;
  }, []);

  useEffect(() => {
    if (!sellable) return; // review 4: no history entry for a sheet that closes at once
    const st = (window.history.state ?? {}) as Record<string, unknown>;
    if (!st.buyNow) window.history.pushState({ ...st, buyNow: true }, '');
    const onPop = (): void => {
      const now = window.history.state as { buyNow?: unknown } | null;
      if (!now || !now.buyNow) closeBuyNow();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [sellable]);

  /* ----- pay config, fresh on every open (M1/M2) ----- */

  const loadCfg = useCallback((): void => {
    setCfg('loading');
    void fetchPayConfig(ORDER_CONFIG.paySite).then((c) => {
      if (!dismissed.current) setCfg(c);
    });
  }, []);
  useEffect(() => {
    let live = true;
    void fetchPayConfig(ORDER_CONFIG.paySite).then((c) => {
      if (live) setCfg(c);
    });
    return () => {
      live = false;
    };
  }, []);

  // Back from the HitPay page (back/forward cache): the Pay button works again.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent): void => {
      if (e.persisted) setPaying(false);
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  /* ----- derived ----- */

  const open = cfg !== 'loading' && cfg.ready;
  /** Review 5: the config could not be loaded (network / server error) is NOT "payment closed". */
  const failed = cfg !== 'loading' && !cfg.ready && cfg.failed === true;
  const closed = cfg !== 'loading' && !cfg.ready && !failed;
  const priceKey = `${sku}:${qty}`;
  const totals = useMemo(() => (item && open ? computeTotals(item.priceSen, qty, cfg.deliverySen) : null), [item, open, qty, cfg]);
  const shownTotal = totals ? (confirmed && confirmed.k === priceKey ? confirmed.total : totals.totalSen) : null;
  // Review 7: after a fresh config, a server total that the new fee now explains is no longer an override.
  useEffect(() => {
    if (cfg === 'loading' || !cfg.ready || !item) return;
    setConfirmed((c) => (c && c.total === item.priceSen * Number(c.k.split(':').pop()) + (cfg.deliverySen ?? 0) ? null : c));
  }, [cfg, item]);

  const enquiryHref = useMemo(() => {
    if (!item) return plainChatUrl(ORDER_CONFIG.whatsapp, false);
    const msg = buildEnquiryMessage({ label: lineLabel(lang, item), qty }, MESSAGE_LABELS[lang]);
    return buildWhatsAppUrl(ORDER_CONFIG.whatsapp, msg, isDesktop());
  }, [item, qty, lang]);

  if (!product || !item) {
    // Unknown product (stale CMS markup): nothing to sell, close at once.
    queueMicrotask(closeBuyNow);
    return null;
  }

  /* ----- form ----- */

  const change = (field: DetailField, value: string): void => {
    const next = { ...values, [field]: value };
    setValues(next);
    setDirty((d) => (d[field] ? d : { ...d, [field]: true }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (remember.current) saveDetails(next);
  };

  /** Inline check on blur, only for a field the buyer has typed in (tabbing through says nothing). */
  const blur = (field: DetailField): void => {
    if (!dirty[field]) return;
    const r = validateDetails(values, STATES_MY);
    const code = r.ok ? undefined : r.errors[field];
    setErrors((e) => (e[field] === code ? e : { ...e, [field]: code }));
  };

  const forget = (): void => {
    remember.current = false;
    orderStorage.del(KEYS.details);
    orderStorage.del(KEYS.draft);
    setValues(BLANK);
    setErrors({});
    setDirty({});
    setNotice(s.form.forgotten);
  };

  const focusFirst = (errs: DetailErrors): void => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    const el = first ? formRef.current?.elements.namedItem(first) : null;
    if (el instanceof HTMLElement) el.focus();
  };

  const pay = async (): Promise<void> => {
    if (paying || cfg === 'loading') return;
    if (!cfg.ready) return;
    const result = validateDetails(values, STATES_MY);
    if (!result.ok) {
      setErrors(result.errors);
      setShowSummary(true);
      setPayError('');
      focusFirst(result.errors);
      return;
    }
    setErrors({});
    setShowSummary(false);
    remember.current = true;
    saveDetails(values);
    const expected = shownTotal ?? 0;
    const draft = nextDraft(readDraft(), { site: ORDER_CONFIG.paySite, lang, sku: item.sku, qty, details: result.details }, Date.now(), ORDER_CONFIG.draftReuseMs);
    saveDraft(draft);
    setPaying(true);
    setPayError('');
    const res = await createPayment({ site: ORDER_CONFIG.paySite, lang, idem: draft.idem, sku: item.sku, qty, details: result.details });
    if (res.ok && isRef(res.ref, ORDER_CONFIG.refPrefix)) saveDraft({ ...draft, ref: res.ref, token: res.token });
    // Review 6: closed while waiting: the buyer left the sheet, never send them off to pay.
    if (dismissed.current) return;
    if (res.ok && isRef(res.ref, ORDER_CONFIG.refPrefix)) {
      if (res.status === 'paid') {
        window.location.assign(`/${lang}/order/paid?ref=${encodeURIComponent(res.ref)}&t=${res.token}`);
        return;
      }
      if (res.totalSen !== expected) {
        // M1: never send the buyer to pay a total they were not shown.
        setConfirmed({ k: priceKey, total: res.totalSen });
        setPayError(fill(s.online.priceChanged, { total: formatRM(res.totalSen) }));
        setPaying(false);
        loadCfg(); // review 7: the fee may have changed in the panel
        return;
      }
      // R10: the customer only ever leaves for exactly https://checkout.hit-pay.com.
      if (isHitpayCheckoutUrl(res.url)) {
        window.location.assign(res.url);
        return; // busy until the page is gone (or comes back from bfcache)
      }
    }
    const o = s.online;
    const code = res.ok ? 'bad_answer' : res.code;
    if (code === 'pay_not_ready') {
      setPaying(false);
      loadCfg(); // shows the closed state
      return;
    }
    if (code === 'invalid' && !res.ok && res.fields) {
      const errs = serverErrors(res.fields);
      if (Object.keys(errs).length) {
        setErrors(errs);
        setShowSummary(true);
        focusFirst(errs);
      }
    }
    setPayError(
      code === 'invalid'
        ? o.detailsRefused
        : code === 'unknown_sku'
          ? o.productGone
          : code === 'stale_client'
            ? o.stale
            : code === 'rate_limited'
              ? o.tooMany
              : code === 'order_review'
                ? o.review
                : code === 'busy'
                  ? o.busy
                  : o.unavailable
    );
    setPaying(false);
  };

  const name = t(`${item.i18n}.name`);
  const errCount = FIELD_ORDER.filter((f) => errors[f]).length;
  const heading = 'text-lg font-semibold text-olive-dark';
  const foot =
    'sticky bottom-0 z-[1] grid gap-2 border-t border-olive-dark/15 bg-bg px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:px-5';

  return createPortal(
    <dialog
      ref={ref}
      data-testid="buy-now-sheet"
      data-buynow=""
      data-order-dialog=""
      data-lenis-prevent=""
      data-state={cfg === 'loading' ? 'loading' : cfg.ready ? 'open' : failed ? 'error' : 'closed'}
      data-product={item.productId}
      aria-label={s.sheet.title}
      onCancel={(e) => {
        // Escape: close through history so Back stays in step (M6).
        e.preventDefault();
        requestClose();
      }}
      onClose={() => {
        if (!ref.current?.open) closeBuyNow();
      }}
      onPointerDown={(e) => {
        downOnBackdrop.current = e.target === ref.current;
      }}
      onClick={(e) => {
        // a tap on the backdrop: the press must start AND end there (review 8)
        if (downOnBackdrop.current && e.target === ref.current) requestClose();
        downOnBackdrop.current = false;
      }}
      className={`fixed inset-0 m-auto h-dvh max-h-none w-full max-w-none flex-col overflow-hidden bg-bg p-0 text-base text-olive-dark shadow-2xl backdrop:bg-olive-dark/60 open:flex md:h-[min(820px,calc(100dvh-48px))] md:w-[min(560px,calc(100vw-48px))] md:rounded-2xl ${
        fallback ? 'z-[70]' : ''
      }`}
    >
      <header className={BAND}>
        <p className="text-xl font-semibold text-cream">{s.sheet.title}</p>
        <button type="button" data-testid="buy-now-close" data-autofocus="" aria-label={s.sheet.close} onClick={requestClose} className={ICON_BTN}>
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </header>

      <div className="min-h-0 flex-1 scroll-pb-40 overflow-y-auto overscroll-contain">
        <div className="grid gap-5 px-4 pt-4 pb-5 sm:px-5">
          {/* product */}
          <div className="flex items-center gap-4">
            <span className="block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-olive-dark/10 bg-white">
              <Picture name={product.image} alt={name} className="block h-full w-full object-contain" sizes="80px" />
            </span>
            <div className="min-w-0">
              <p data-testid="sheet-product" className="font-display text-xl leading-snug">
                {name}
              </p>
              <p className="tabular-nums text-olive-dark/80">
                {formatRM(item.priceSen)} {s.sheet.each}
              </p>
            </div>
          </div>

          {/* size + quantity */}
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            {items.length > 1 ? (
              <div className="grid gap-2">
                <p id="avo-size-label" className="font-semibold">
                  {s.sheet.size}
                </p>
                <div role="radiogroup" aria-labelledby="avo-size-label" className="flex flex-wrap gap-2">
                  {items.map((it) => {
                    const on = it.sku === sku;
                    return (
                      <button
                        key={it.sku}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        data-testid="size-chip"
                        data-sku={it.sku}
                        onClick={() => setSku(it.sku)}
                        className={`${CHIP} ${on ? 'border-olive-dark bg-olive-dark text-cream' : 'border-olive-dark/40 bg-cream text-olive-dark hover:border-olive-dark'}`}
                      >
                        {sizeLabel(it.size)} · {formatRM(it.priceSen)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="font-semibold">
                {s.sheet.size}: {sizeLabel(item.size)}
              </p>
            )}
            <div className="grid gap-2">
              <p id="avo-qty-label" className="font-semibold">
                {s.sheet.qty}
              </p>
              <div role="group" aria-labelledby="avo-qty-label" className="flex items-center gap-3">
                <button
                  type="button"
                  data-testid="qty-minus"
                  aria-label={s.sheet.minus}
                  aria-disabled={qty <= 1 || undefined}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className={STEP_BTN}
                >
                  <FiMinus className="h-5 w-5" aria-hidden="true" />
                </button>
                <output data-testid="qty-value" aria-live="polite" className="min-w-8 text-center text-xl font-semibold tabular-nums">
                  {qty}
                </output>
                <button
                  type="button"
                  data-testid="qty-plus"
                  aria-label={s.sheet.plus}
                  aria-disabled={qty >= ORDER_CONFIG.maxQty || undefined}
                  onClick={() => setQty((q) => Math.min(ORDER_CONFIG.maxQty, q + 1))}
                  className={STEP_BTN}
                >
                  <FiPlus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              {qty >= ORDER_CONFIG.maxQty && <p className={SMALL}>{fill(s.sheet.maxQty, { n: ORDER_CONFIG.maxQty })}</p>}
            </div>
          </div>

          {failed ? (
            <div data-testid="pay-config-error" role="alert" className="grid gap-3 rounded-2xl border border-red-700/40 bg-cream p-4">
              <p className="font-semibold">{s.online.loadFailed}</p>
              <button type="button" data-testid="pay-config-retry" onClick={loadCfg} className={BTN_GOLD}>
                {s.online.retry}
              </button>
              <a data-testid="closed-whatsapp" href={enquiryHref} target="_blank" rel="noopener" className={`${LINK} justify-self-center`}>
                {s.online.notReadyAction}
              </a>
            </div>
          ) : closed ? (
            <div data-testid="pay-closed" className="grid gap-3 rounded-2xl border border-gold-ink/50 bg-cream p-4">
              <p className="font-semibold">{s.online.notReady}</p>
              <a data-testid="closed-whatsapp" href={enquiryHref} target="_blank" rel="noopener" className={BTN_WA}>
                <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span>{s.online.notReadyAction}</span>
              </a>
            </div>
          ) : (
            <>
              <form
                ref={formRef}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  void pay();
                }}
                className="grid gap-4"
              >
                <h2 className={heading}>{s.form.title}</h2>
                <Field field="name" label={s.form.name} error={errors.name && errorText(s, 'name', errors.name)}>
                  {(a) => (
                    <input
                      {...a}
                      type="text"
                      autoComplete="name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      maxLength={FIELD_MAX.name}
                      required
                      value={values.name}
                      onChange={(e) => change('name', e.target.value)}
                      onBlur={() => blur('name')}
                    />
                  )}
                </Field>
                <Field field="phone" label={s.form.phone} hint={s.form.phoneHint} error={errors.phone && errorText(s, 'phone', errors.phone)}>
                  {(a) => (
                    <input
                      {...a}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      maxLength={FIELD_MAX.phone}
                      required
                      value={values.phone}
                      onChange={(e) => change('phone', e.target.value)}
                      onBlur={() => blur('phone')}
                    />
                  )}
                </Field>
                <Field
                  field="address"
                  label={s.form.address}
                  hint={s.form.addressHint}
                  error={errors.address && errorText(s, 'address', errors.address)}
                >
                  {(a) => (
                    <textarea
                      {...a}
                      rows={3}
                      autoComplete="street-address"
                      placeholder={s.form.addressPlaceholder}
                      maxLength={FIELD_MAX.address}
                      required
                      value={values.address}
                      onChange={(e) => change('address', e.target.value)}
                      onBlur={() => blur('address')}
                    />
                  )}
                </Field>
                <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-3 max-[359px]:grid-cols-1">
                  <Field field="postcode" label={s.form.postcode} error={errors.postcode && errorText(s, 'postcode', errors.postcode)}>
                    {(a) => (
                      <input
                        {...a}
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        enterKeyHint="next"
                        maxLength={FIELD_MAX.postcode}
                        required
                        value={values.postcode}
                        onChange={(e) => change('postcode', e.target.value)}
                        onBlur={() => blur('postcode')}
                      />
                    )}
                  </Field>
                  <Field field="state" label={s.form.state} error={errors.state && errorText(s, 'state', errors.state)}>
                    {(a) => (
                      <select
                        {...a}
                        autoComplete="address-level1"
                        required
                        value={values.state}
                        onChange={(e) => change('state', e.target.value)}
                        onBlur={() => blur('state')}
                      >
                        <option value="">{s.form.stateSelect}</option>
                        {STATES_MY.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>
                <div className="grid gap-0.5">
                  <p className={SMALL}>{s.form.stored}</p>
                  <button type="button" data-testid="forget-details" onClick={forget} className={`${LINK} justify-self-start`}>
                    {s.form.forget}
                  </button>
                </div>
                {/* Enter in a field submits = Pay (the visible button is in the sticky footer). */}
                <button type="submit" hidden tabIndex={-1} aria-hidden="true" />
              </form>

              <div data-testid="sheet-summary" className={`${CARD} grid gap-1.5`}>
                <p className={LABEL}>{s.summary.title}</p>
                <div className={ROW}>
                  <span data-testid="sheet-line" className="min-w-0">
                    {lineLabel(lang, item)} {'x '}
                    {qty}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums">{formatRM(item.priceSen * qty)}</span>
                </div>
                <div className={ROW}>
                  <span className="text-olive-dark/75">{s.summary.delivery}</span>
                  <span data-testid="sheet-delivery" className="shrink-0 font-semibold tabular-nums">
                    {totals ? (totals.deliverySen === 0 ? s.summary.free : formatRM(totals.deliverySen ?? 0)) : <Skeleton />}
                  </span>
                </div>
                <div className={`${ROW} border-t border-olive-dark/15 pt-1.5 text-lg`}>
                  <span className="font-semibold">{s.summary.total}</span>
                  <span data-testid="sheet-total" className="shrink-0 font-bold tabular-nums">
                    {shownTotal !== null ? formatRM(shownTotal) : <Skeleton />}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {!closed && !failed && (
        <div className={foot}>
          <p
            ref={summaryRef}
            role="alert"
            aria-live="assertive"
            data-testid="pay-error"
            hidden={!(showSummary && errCount > 0) && !payError}
            className="rounded-xl border border-red-700/40 bg-cream px-3.5 py-2.5 text-[15px] font-semibold text-red-700"
          >
            {payError || (showSummary && errCount > 0 ? s.errors.summary : '')}
          </p>
          <button
            type="button"
            data-testid="pay-hitpay"
            aria-disabled={paying || cfg === 'loading' || undefined}
            aria-busy={paying || undefined}
            onClick={() => void pay()}
            className={`${BTN_GOLD} aria-disabled:cursor-wait aria-disabled:opacity-80`}
          >
            {paying ? (
              <>
                <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-olive-dark/30 border-t-olive-dark" />
                <span>{s.online.opening}</span>
              </>
            ) : shownTotal === null ? (
              s.online.checking
            ) : (
              fill(s.online.pay, { total: formatRM(shownTotal) })
            )}
          </button>
          <p className={`${SMALL} text-center`} data-testid="pay-methods">
            {s.online.methods}
          </p>
          <p className="text-center text-[13px] font-semibold text-olive-dark/70">{s.online.secureNote}</p>
          {payError && (
            <a href={plainChatUrl(ORDER_CONFIG.whatsapp, isDesktop())} target="_blank" rel="noopener" className={`${LINK} justify-self-center`}>
              {s.online.whatsappHelp}
            </a>
          )}
        </div>
      )}

      <p
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute bottom-[calc(9rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[2] max-w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-full bg-olive-dark text-center font-semibold text-cream ${
          notice ? 'px-4 py-2.5 shadow-lg' : 'opacity-0'
        }`}
      >
        {notice}
      </p>
    </dialog>,
    document.body
  );
}

function Skeleton() {
  return <span aria-hidden="true" className="inline-block h-4 w-16 animate-pulse rounded bg-olive-dark/15 align-middle" />;
}
