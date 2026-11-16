/**
 * /<lang>/order/paid: where HitPay sends the customer back (FORGE HITPAY §5.5, R13/R14/R18).
 * Own lazy chunk (App.tsx), prerendered as a neutral "checking" shell, noindex, outside the
 * sitemap/llms/hreflang gates. The page never trusts HitPay's `status` query: it polls OUR server
 * (/api/pay/status), which asks HitPay itself (verify by fetch, §2).
 *
 * ref + token: from this device's buy-now draft first, then the query (R18). Paid: summary,
 * optional "Send order details on WhatsApp" (ref + PAID via HitPay), the draft is cleared.
 * Failed: "Try again" reopens the Buy-now sheet for the same product, size and quantity (BUY-NOW).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { isPrerender } from '../lib/prerender';
import { openBuyNow } from './bridge';
import { ORDER_CONFIG } from './config';
import {
  buildPaidMessage,
  buildWhatsAppUrl,
  draftKey,
  formatRM,
  isRef,
  isToken,
  plainChatUrl,
  readPaidQuery,
  validateDetails,
  type Details,
  type Draft,
  type Lang,
  type MessageLine,
} from './core';
import { MESSAGE_LABELS, ORDER_NAMES, STATES_MY, sizeLabel } from './messageStrings';
import { readDetails, readDraft } from './drafts';
import { orderStorage } from './storage';
import { fetchPayStatus, type StatusAnswer } from './payApi';
import { BTN_GOLD, BTN_LINE, BTN_WA, CARD, LABEL, LINK, SMALL } from './scrollLock';
import { PAID_STRINGS } from './paidStrings';

const KEYS = ORDER_CONFIG.keys;
/** HitPay payment_type -> the name customers know. Unknown types are shown as sent, underscores as spaces. */
const METHOD_NAMES: Record<string, string> = {
  card: 'Card',
  fpx: 'FPX',
  grabpay: 'GrabPay',
  grabpay_direct: 'GrabPay',
  grabpay_paylater: 'GrabPay PayLater',
  shopee_pay: 'ShopeePay',
  touch_n_go: "Touch 'n Go",
  duitnow: 'DuitNow',
  wechat_pay: 'WeChat Pay',
};
const POLL_MS = 3000;
/** After a 429 the page waits this long before the next poll (and still stops after POLL_FOR_MS). */
const SLOW_MS = 30000;
const POLL_FOR_MS = 2 * 60 * 1000;

type View =
  | { kind: 'checking' }
  | { kind: 'paid'; answer: StatusAnswer; message: string }
  | { kind: 'failed'; answer: StatusAnswer }
  | { kind: 'review'; ref: string }
  | { kind: 'wait'; ref: string }
  | { kind: 'missing' };

interface Target {
  ref: string;
  token: string;
  /** This device's draft of this order (language, and the key that says whether the details still match). */
  draft: Draft | null;
}

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function getKey(key: string): string | null {
  try {
    return store()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function setKey(key: string, value: string | null): void {
  try {
    if (value === null) store()?.removeItem(key);
    else store()?.setItem(key, value);
  } catch {
    /* private mode: the page still works from the query */
  }
}

interface PaidMemo {
  ref: string;
  token: string;
  message: string;
  createdAt: number;
}
function readPaidMemo(): PaidMemo | null {
  try {
    const m = JSON.parse(getKey(KEYS.paid) ?? 'null') as PaidMemo | null;
    if (m && isRef(m.ref, ORDER_CONFIG.refPrefix) && isToken(m.token) && typeof m.message === 'string' && Date.now() - m.createdAt < ORDER_CONFIG.draftTtlMs) return m;
  } catch {
    /* ignored */
  }
  return null;
}

/** R18: this device's draft (or paid memo) first; the query second. */
function findTarget(): Target | null {
  const q = readPaidQuery(window.location.search, ORDER_CONFIG.refPrefix);
  const draft = readDraft();
  if (draft && draft.ref && draft.token && (!q || q.ref === draft.ref)) return { ref: draft.ref, token: draft.token, draft };
  const memo = readPaidMemo();
  if (memo && (!q || q.ref === memo.ref)) return { ref: memo.ref, token: memo.token, draft: null };
  return q ? { ref: q.ref, token: q.token, draft: draft && draft.ref === q.ref ? draft : null } : null;
}

/** The server line as the page and the message print it (B3: a package by its label, never "x 1"). */
function paidLine(answer: StatusAnswer, lang: Lang): MessageLine & { sku: string } {
  const l = answer.lines[0] ?? { sku: '', qty: 1, unitSen: answer.subtotalSen, label: '', bottles: 1 };
  const [productId = l.sku, size = ''] = l.sku.split(':');
  const label = l.label || `${ORDER_NAMES[lang][productId] ?? productId} ${sizeLabel(size)}`;
  return { sku: l.sku, label, qty: l.qty, unitSen: l.unitSen, pack: l.sku.includes(':pack') };
}

/** This device's details, only when they are still the ones this order was placed with. */
function matchingDetails(t: Target): Details | null {
  const d = t.draft;
  const v = readDetails();
  if (!d || !v) return null;
  const r = validateDetails(v, STATES_MY);
  return r.ok && draftKey(d.site, d.lang, d.sku, d.qty, r.details) === d.key ? r.details : null;
}

/** The WhatsApp text of a paid order: with the details when this device still has them, else ref + line. */
function paidMessage(t: Target, answer: StatusAnswer, lang: Lang): string {
  const memo = readPaidMemo();
  if (memo && memo.ref === t.ref) return memo.message;
  const msgLang = t.draft?.lang ?? lang;
  return buildPaidMessage({ ref: t.ref, line: paidLine(answer, msgLang), deliverySen: answer.deliverySen, details: matchingDetails(t) }, MESSAGE_LABELS[msgLang]);
}

/** Once per order: the draft goes, the message is kept for a reload. */
function settlePaidOnDevice(t: Target, message: string): void {
  if (readPaidMemo()?.ref === t.ref) return;
  setKey(KEYS.paid, JSON.stringify({ ref: t.ref, token: t.token, message, createdAt: Date.now() } satisfies PaidMemo));
  if (readDraft()?.ref === t.ref) orderStorage.del(KEYS.draft);
}

/** "Try again": the Buy-now sheet for the same product, size and quantity. */
function retry(answer: StatusAnswer | null): void {
  const l = answer?.lines[0];
  const [productId, size] = (l?.sku ?? '').split(':');
  if (productId && size) openBuyNow(productId, size, l?.qty);
}

function isDesktop(): boolean {
  try {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch {
    return false;
  }
}

export default function PaidPage() {
  const { lang: langParam } = useParams<{ lang: string }>();
  const lang: Lang = langParam === 'ms' ? 'ms' : 'en';
  const s = PAID_STRINGS[lang];
  useMarkAppReady();

  const [view, setView] = useState<View>({ kind: 'checking' });
  /** The last status answer (the "wait" view has none of its own): what "Try again" reopens. */
  const lastAnswer = useRef<StatusAnswer | null>(null);
  const target = useRef<Target | null>(null);
  const run = useRef(0);

  const poll = useCallback(() => {
    const t = target.current;
    if (!t) return;
    const id = ++run.current;
    const started = Date.now();
    setView({ kind: 'checking' });
    const tick = async (): Promise<void> => {
      if (id !== run.current) return;
      const a = await fetchPayStatus(t.ref, t.token);
      if (id !== run.current) return;
      if (a && typeof a === 'object') lastAnswer.current = a;
      if (a === 'forbidden') return setView({ kind: 'missing' });
      if (a === 'slow') {
        if (Date.now() - started >= POLL_FOR_MS) return setView({ kind: 'wait', ref: t.ref });
        window.setTimeout(() => void tick(), SLOW_MS);
        return;
      }
      if (a && a.status === 'paid') {
        const message = paidMessage(t, a, lang);
        settlePaidOnDevice(t, message);
        return setView({ kind: 'paid', answer: a, message });
      }
      if (a && a.status === 'failed') return setView({ kind: 'failed', answer: a });
      if (a && a.status === 'needs_review') return setView({ kind: 'review', ref: t.ref });
      if (Date.now() - started >= POLL_FOR_MS) return setView({ kind: 'wait', ref: t.ref });
      window.setTimeout(() => void tick(), POLL_MS);
    };
    void tick();
  }, [lang]);

  useEffect(() => {
    if (isPrerender()) return; // the snapshot is the neutral "checking" shell
    target.current = findTarget();
    if (!target.current) {
      setView({ kind: 'missing' });
      return;
    }
    poll();
    return () => {
      run.current += 1; // stops a running poll
    };
  }, [poll]);

  const chatUrl = useMemo(() => (typeof window === 'undefined' ? plainChatUrl(ORDER_CONFIG.whatsapp, false) : plainChatUrl(ORDER_CONFIG.whatsapp, isDesktop())), []);
  const heading = 'font-display text-[32px] leading-tight text-olive-dark sm:text-4xl';
  const titles: Record<View['kind'], string> = {
    checking: s.checkingTitle,
    paid: s.paidTitle,
    failed: s.failedTitle,
    review: s.reviewTitle,
    wait: s.waitTitle,
    missing: s.missingTitle,
  };
  const refOf = view.kind === 'paid' || view.kind === 'failed' ? view.answer.ref : view.kind === 'review' || view.kind === 'wait' ? view.ref : null;

  return (
    <>
      <SEO
        page="shop"
        noindex
        titleOverride={s.seoTitle}
        descriptionOverride={s.seoDescription}
        pathByLang={{ en: 'order/paid', ms: 'order/paid' }}
      />
      <Helmet>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Navbar />
      <main className="bg-bg px-4 pt-32 pb-20 text-olive-dark sm:px-6">
        <section data-testid="paid-page" data-status={view.kind} className="mx-auto grid max-w-xl gap-5" aria-live="polite">
          <h1 className={heading}>{titles[view.kind]}</h1>

          {view.kind === 'checking' && <p className="text-lg">{s.checkingBody}</p>}

          {refOf && (
            <div className={`${CARD} grid gap-1`}>
              <p className={LABEL}>{s.refLabel}</p>
              <p data-testid="paid-ref" className="text-[22px] font-semibold tracking-wide tabular-nums select-all">
                {refOf}
              </p>
            </div>
          )}

          {view.kind === 'paid' && (
            <>
              <p className="text-lg">{s.paidBody}</p>
              <Summary answer={view.answer} lang={lang} />
              <div className="grid gap-2">
                <a
                  data-testid="paid-whatsapp"
                  href={buildWhatsAppUrl(ORDER_CONFIG.whatsapp, view.message, isDesktop())}
                  target="_blank"
                  rel="noopener"
                  className={BTN_WA}
                >
                  <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span>{s.sendDetails}</span>
                </a>
                <p className={SMALL}>{s.sendDetailsHint}</p>
              </div>
            </>
          )}

          {view.kind === 'failed' && (
            <>
              <p className="text-lg">{s.failedBody}</p>
              <button type="button" data-testid="paid-retry" onClick={() => retry(view.answer)} className={BTN_GOLD}>
                {s.tryAgain}
              </button>
            </>
          )}

          {view.kind === 'wait' && (
            <>
              <p className="text-lg">{s.waitBody}</p>
              <button type="button" data-testid="paid-check-again" onClick={poll} className={BTN_GOLD}>
                {s.checkAgain}
              </button>
              <button type="button" data-testid="paid-retry" onClick={() => retry(lastAnswer.current)} className={BTN_LINE}>
                {s.tryAgain}
              </button>
            </>
          )}

          {view.kind === 'review' && <p className="text-lg">{s.reviewBody}</p>}
          {view.kind === 'missing' && <p className="text-lg">{s.missingBody}</p>}

          {(view.kind === 'review' || view.kind === 'missing' || view.kind === 'wait' || view.kind === 'failed') && (
            <a data-testid="paid-chat" href={chatUrl} target="_blank" rel="noopener" className={`${LINK} justify-self-start`}>
              {s.whatsapp}
            </a>
          )}
          <Link to={`/${lang}`} className={`${LINK} justify-self-start`}>
            {s.home}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Summary({ answer, lang }: { answer: StatusAnswer; lang: Lang }) {
  const s = PAID_STRINGS[lang];
  const l = paidLine(answer, lang);
  const row = 'flex items-baseline justify-between gap-4';
  return (
    <div data-testid="paid-summary" className={`${CARD} grid gap-2`}>
      <p className={LABEL}>{s.summaryTitle}</p>
      <div className={row}>
        <span data-testid="paid-line" className="min-w-0">
          {l.pack ? l.label : `${l.label} x ${l.qty}`}
        </span>
        <span className="shrink-0 font-semibold tabular-nums">{formatRM(l.unitSen * l.qty)}</span>
      </div>
      <dl className="mt-1 grid gap-1 border-t border-olive-dark/15 pt-2">
        <div className={row}>
          <dt className="text-olive-dark/75">{s.delivery}</dt>
          <dd className="font-semibold tabular-nums">{answer.deliverySen === 0 ? s.free : formatRM(answer.deliverySen)}</dd>
        </div>
        <div className={`${row} text-lg`}>
          <dt className="font-semibold">{s.total}</dt>
          <dd data-testid="paid-total" className="font-bold tabular-nums">
            {formatRM(answer.totalSen)}
          </dd>
        </div>
      </dl>
      {answer.paymentType && (
        <p className={SMALL}>
          {s.method}: {METHOD_NAMES[answer.paymentType] ?? answer.paymentType.replace(/_/g, ' ')} (HitPay)
        </p>
      )}
    </div>
  );
}
