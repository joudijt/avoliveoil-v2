/**
 * Ordering core (FORGE ORDER-R1). Pure logic: no DOM, no React, NO IMPORTS (O-3).
 * Port of E:\noorfes-lp\src\scripts\cart-core.ts made multi-line.
 *
 * Erasable TypeScript only: `node --test scripts/order.test.mjs` runs this file directly.
 * Money is integer sen everywhere. All config arrives as arguments (`CoreConfig`).
 * The exported names and signatures of the original contract stub are unchanged;
 * additions are marked "extra".
 */

export type Lang = 'en' | 'ms';
/**
 * 'online' = HitPay (FORGE HITPAY, owner answer 6b: online payment only).
 * 'chat' = only while online payment is not open yet: the order goes to WhatsApp.
 */
export type PayMode = 'chat' | 'online';

export interface CoreConfig {
  /** Digits only, e.g. '601111119912'. */
  whatsapp: string;
  maxQty: number;
  /** Delivery fee in sen; null = confirmed on WhatsApp, left out of the total. */
  deliverySen: number | null;
  refPrefix: string;
  /** Max length of the whole WhatsApp URL. */
  urlCap: number;
  orderTtlMs: number;
}

/** A line as frozen into an order: carries its own name and price (O-6). */
export interface OrderLine {
  sku: string;
  /** Short fixed name from ORDER_NAMES (O-4). */
  name: string;
  /** e.g. '500 ml'. */
  sizeLabel: string;
  qty: number;
  unitSen: number;
}

export interface Details {
  name: string;
  /** Normalised '60…' digits. */
  phone: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  note: string;
}
export type DetailField = keyof Details;
export type DetailErrorCode = 'required' | 'tooLong' | 'phone' | 'postcode' | 'state';
export type DetailErrors = Partial<Record<DetailField, DetailErrorCode>>;

export interface Order {
  ref: string;
  lines: OrderLine[];
  deliverySen: number | null;
  details: Details;
  step: 1 | 2 | 3;
  lang: Lang;
  payMode: PayMode;
  /** ms since epoch. */
  createdAt: number;
  /** Extra (HITPAY R17). Online mode: idempotency key sent with every pay click of THIS frozen order. */
  idem?: string;
  /** Extra (HITPAY). Status token the server returned with the order's server-made ref. */
  token?: string;
}

export interface Totals {
  subtotalSen: number;
  deliverySen: number | null;
  totalSen: number;
}

/** Labels of the WhatsApp message, one set per language (messageStrings.ts). */
export interface MessageLabels {
  newOrder: string;
  subtotal: string;
  delivery: string;
  deliveryTbc: string;
  total: string;
  payment: string;
  paymentChat: string;
  /** Online mode, after HitPay confirmed the payment. */
  paymentPaid: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  /** First words of the message in online mode (instead of `newOrder`). */
  paidOrder: string;
}

export const FIELD_MAX: Record<DetailField, number> = {
  name: 60,
  phone: 20,
  address: 160,
  postcode: 5,
  city: 40,
  state: 40,
  note: 200,
};

/** Extra. Form order: the first field in this list that has an error gets focus. */
export const FIELD_ORDER: readonly DetailField[] = ['name', 'phone', 'address', 'postcode', 'city', 'state', 'note'];

/** Extra. Order reference alphabet: no I, O, 0, 1. 32 characters, so `byte & 31` has no bias. */
export const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Extra. A stored order may hold at most this many lines (spec 3.1). */
export const MAX_ORDER_LINES = 16;

/** Extra. A stored order dated more than this far in the future is refused. */
export const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;

/** Extra. A stored order line priced above this (RM 100,000.00 a bottle) is refused. */
export const MAX_UNIT_SEN = 10_000_000;

const LINE_NAME_MAX = 80;
const SIZE_LABEL_MAX = 20;
const SKU_MAX = 80;

/* ---------- money ---------- */

/** Extra. '59.00' -> 5900 without float maths. null for anything that is not a plain amount. */
export function toSen(amount: unknown): number | null {
  if (typeof amount !== 'string') return null;
  const m = /^(\d{1,7})(?:\.(\d{1,2}))?$/.exec(amount.trim());
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0'));
}

/** 21800 -> 'RM 218.00'. Anything that is not a safe non-negative integer prints 'RM 0.00'. */
export function formatRM(sen: number): string {
  if (!Number.isSafeInteger(sen) || sen < 0) return 'RM 0.00';
  const cents = sen % 100;
  return `RM ${Math.floor(sen / 100)}.${cents < 10 ? '0' : ''}${cents}`;
}

export function lineTotalSen(line: Pick<OrderLine, 'qty' | 'unitSen'>): number {
  return line.unitSen * line.qty;
}

export function computeTotals(lines: readonly Pick<OrderLine, 'qty' | 'unitSen'>[], deliverySen: number | null): Totals {
  const subtotalSen = lines.reduce((sum, l) => sum + lineTotalSen(l), 0);
  return { subtotalSen, deliverySen, totalSen: subtotalSen + (deliverySen ?? 0) };
}

/* ---------- text ---------- */

/** Direction overrides and isolates: they can reorder what the seller reads. */
const BIDI_CONTROLS = /[\u202a-\u202e\u2066-\u2069]/g;
/** Half of a surrogate pair (a cut emoji). encodeURIComponent THROWS on one. */
const LONE_SURROGATE = /\p{Cs}/gu;
const CONTROL_CHARS = /\p{Cc}+/gu;

function wellFormed(text: string): string {
  return text.replace(LONE_SURROGATE, '');
}

/**
 * The text as the pieces a reader sees as one character each (an emoji family, a flag,
 * a Tamil letter with its vowel sign). Falls back to code points where Intl.Segmenter is missing.
 */
function graphemes(text: string): string[] {
  const Segmenter = typeof Intl === 'undefined' ? undefined : Intl.Segmenter;
  if (typeof Segmenter !== 'function') return Array.from(text);
  return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(text), (s) => s.segment);
}

/** Cut to `max` UTF-16 units (as a browser maxlength counts) without splitting a visible character. */
function capLen(text: string, max: number): string {
  if (text.length <= max) return text;
  let out = '';
  for (const g of graphemes(text)) {
    if (out.length + g.length > max) break;
    out += g;
  }
  return out.trim();
}

/** Arabic-Indic, Extended Arabic-Indic and full-width digits -> ASCII digits. */
function asciiDigits(text: string): string {
  return text.replace(/[٠-٩۰-۹０-９]/g, (c) => {
    const code = c.charCodeAt(0);
    return String(code >= 0xff10 ? code - 0xff10 : code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
}

/** True when nothing a person can see is left: empty, or only invisible format characters. */
function isBlank(text: string): boolean {
  return text.replace(/\p{Cf}/gu, '').trim() === '';
}

/** Strips control and bidi characters, lone surrogates, collapses whitespace, trims, cuts to max. */
export function cleanText(value: unknown, max: number): string {
  const text = typeof value === 'string' ? value : typeof value === 'number' && Number.isFinite(value) ? String(value) : '';
  const cleaned = wellFormed(text).replace(BIDI_CONTROLS, '').replace(CONTROL_CHARS, ' ').replace(/\s+/g, ' ').trim();
  return capLen(cleaned, max);
}

/* ---------- customer details ---------- */

/**
 * Malaysian mobile -> '60…' digits, or null (O-10: Malaysian mobile numbers only).
 * Spaces, dashes, dots, brackets and the invisible direction marks that come with a number
 * copied from WhatsApp or Contacts are removed first, and Arabic-Indic or full-width digits
 * become ASCII. Then: optional +60 / 60 / 0 (also '+60 (0)18\u2026': a 0 right after the 60), then
 * the national number with its exact length (011 and 015 = 8 more digits, the other 01x = 7).
 * Landlines and 1800 / 1300 numbers do not match.
 */
export function normalisePhone(raw: string): string | null {
  if (typeof raw !== 'string') return null;
  const s = asciiDigits(raw).replace(/[\s().\-\u00ad\u2010-\u2015\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069]/g, '');
  const m = /^(?:\+?600?|0)?(1(?:[02-46-9]\d{7}|[15]\d{8}))$/.exec(s);
  return m ? `60${m[1]}` : null;
}

/** Longer than any field: text is cleaned whole first so 'tooLong' can be reported instead of a silent cut. */
const CLEAN_ALL = 100_000;

export function validateDetails(
  raw: Partial<Record<DetailField, unknown>>,
  states: readonly string[]
): { ok: true; details: Details } | { ok: false; errors: DetailErrors } {
  const errors: DetailErrors = {};
  // Emptiness is judged on what a person can see (invisible format characters do not count);
  // the value that is kept is the cleaned text as typed. A note with nothing visible is no note.
  const text = (field: 'name' | 'address' | 'city' | 'note', required: boolean): string => {
    const v = cleanText(raw[field], CLEAN_ALL);
    if (isBlank(v)) {
      if (required) errors[field] = 'required';
      return '';
    }
    if (v.length > FIELD_MAX[field]) errors[field] = 'tooLong';
    return v;
  };

  const name = text('name', true);

  const phoneTyped = cleanText(raw.phone, CLEAN_ALL);
  const phone = typeof raw.phone === 'string' ? normalisePhone(raw.phone) : normalisePhone(phoneTyped);
  if (isBlank(phoneTyped)) errors.phone = 'required';
  else if (!phone) errors.phone = 'phone';

  const address = text('address', true);

  const postcode = asciiDigits(cleanText(raw.postcode, CLEAN_ALL));
  if (isBlank(postcode)) errors.postcode = 'required';
  else if (!/^\d{5}$/.test(postcode)) errors.postcode = 'postcode';

  const city = text('city', true);

  const state = cleanText(raw.state, CLEAN_ALL);
  if (isBlank(state)) errors.state = 'required';
  else if (!states.includes(state)) errors.state = 'state';

  const note = text('note', false);

  if (Object.keys(errors).length > 0 || phone === null) return { ok: false, errors };
  return { ok: true, details: { name, phone, address, postcode, city, state, note } };
}

/* ---------- order reference ---------- */

function defaultRandomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n);
  const c = (globalThis as { crypto?: { getRandomValues?: (a: Uint8Array) => Uint8Array } }).crypto;
  if (c && typeof c.getRandomValues === 'function') c.getRandomValues(out);
  else for (let i = 0; i < n; i++) out[i] = Math.floor(Math.random() * 256);
  return out;
}

/** Malaysia time is UTC+8 all year. */
const MYT_OFFSET_MS = 8 * 60 * 60 * 1000;

/**
 * 'AV-261112-7KQ4'. The date is the day in Malaysia, whatever zone the device is set to.
 * `randomBytes` is injectable for tests; default = crypto.getRandomValues.
 */
export function makeRef(prefix: string, now: Date, randomBytes?: (n: number) => Uint8Array): string {
  const two = (n: number) => (n < 10 ? `0${n}` : String(n));
  const my = new Date(now.getTime() + MYT_OFFSET_MS);
  const date = `${two(my.getUTCFullYear() % 100)}${two(my.getUTCMonth() + 1)}${two(my.getUTCDate())}`;
  const bytes = (randomBytes ?? defaultRandomBytes)(4);
  let tail = '';
  for (let i = 0; i < 4; i++) tail += REF_ALPHABET[(bytes[i] ?? 0) & 31];
  return `${prefix}-${date}-${tail}`;
}

/** Extra. True for '<prefix>-YYMMDD-XXXX': month 01-12, day 01-31, XXXX from REF_ALPHABET. */
export function isRef(value: unknown, prefix: string): value is string {
  if (typeof value !== 'string' || !value.startsWith(`${prefix}-`)) return false;
  return /^\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])-[ABCDEFGHJKLMNPQRSTUVWXYZ2-9]{4}$/.test(value.slice(prefix.length + 1));
}

export function createOrder(input: {
  lines: OrderLine[];
  details: Details;
  lang: Lang;
  payMode: PayMode;
  cfg: CoreConfig;
  now: Date;
  /** Keep the ref when the customer goes back to step 1 and forward again. */
  keepRef?: string;
  /** Extra (HITPAY R17): idempotency key of this frozen order (online mode). */
  idem?: string;
}): Order {
  const { cfg, now, keepRef } = input;
  return {
    ref: isRef(keepRef, cfg.refPrefix) ? keepRef : makeRef(cfg.refPrefix, now),
    lines: input.lines.map((l) => ({ sku: l.sku, name: l.name, sizeLabel: l.sizeLabel, qty: l.qty, unitSen: l.unitSen })),
    deliverySen: cfg.deliverySen,
    details: { ...input.details },
    step: 2,
    lang: input.lang,
    payMode: input.payMode,
    createdAt: now.getTime(),
    ...(input.idem && isIdem(input.idem) ? { idem: input.idem } : {}),
  };
}

/* ---------- WhatsApp ---------- */

/**
 * The order as plain text, one fact per line (spec 3.3 + O-4). Built from the order alone (O-6).
 * The Note line is left out when the note is empty. Online mode (after HitPay confirmed the payment) opens with "Paid order" and says PAID via HitPay.
 */
export function buildMessage(order: Order, labels: MessageLabels): string {
  const L = labels;
  const d = order.details;
  const t = computeTotals(order.lines, order.deliverySen);
  const online = order.payMode === 'online';
  const out = [`${online ? L.paidOrder : L.newOrder} ${order.ref}`];
  order.lines.forEach((l, i) => {
    out.push(`${i + 1}. ${l.name} ${l.sizeLabel} x ${l.qty} = ${formatRM(lineTotalSen(l))}`);
  });
  out.push(
    `${L.subtotal}: ${formatRM(t.subtotalSen)}`,
    `${L.delivery}: ${t.deliverySen === null ? L.deliveryTbc : formatRM(t.deliverySen)}`,
    `${L.total}: ${formatRM(t.totalSen)}`,
    `${L.payment}: ${online ? L.paymentPaid : L.paymentChat}`,
    `${L.name}: ${d.name}`,
    `${L.phone}: +${d.phone}`,
    `${L.address}: ${d.address}, ${d.postcode} ${d.city}, ${d.state}`
  );
  if (d.note) out.push(`${L.note}: ${d.note}`);
  return wellFormed(out.join('\n'));
}

/**
 * Extra (HITPAY). The paid message when this device no longer holds the customer's details
 * (paid page opened on another device): ref, lines and totals from the server, no personal data.
 */
export function buildPaidShortMessage(
  input: { ref: string; lines: readonly OrderLine[]; deliverySen: number | null },
  labels: MessageLabels
): string {
  const L = labels;
  const t = computeTotals(input.lines, input.deliverySen);
  const out = [`${L.paidOrder} ${input.ref}`];
  input.lines.forEach((l, i) => out.push(`${i + 1}. ${l.name} ${l.sizeLabel} x ${l.qty} = ${formatRM(lineTotalSen(l))}`));
  out.push(
    `${L.subtotal}: ${formatRM(t.subtotalSen)}`,
    `${L.delivery}: ${t.deliverySen === null ? L.deliveryTbc : formatRM(t.deliverySen)}`,
    `${L.total}: ${formatRM(t.totalSen)}`,
    `${L.payment}: ${L.paymentPaid}`
  );
  return wellFormed(out.join('\n'));
}

/* ---------- online payment helpers (HITPAY) ---------- */

/** Extra. 32 lowercase hex characters (the server's status token). */
export function isToken(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{32}$/.test(value);
}

/** Extra. Idempotency key: 8-64 of [A-Za-z0-9-]. */
export function isIdem(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(value);
}

/** Extra. A fresh idempotency key, 32 hex characters. `randomBytes` is injectable for tests. */
export function makeIdem(randomBytes?: (n: number) => Uint8Array): string {
  const bytes = (randomBytes ?? defaultRandomBytes)(16);
  let out = '';
  for (let i = 0; i < 16; i++) out += ((bytes[i] ?? 0) + 256).toString(16).slice(1);
  return out;
}

/**
 * Extra. ref + token from the return URL query. Tolerant (review 18): HitPay may append its own
 * `?reference=...&status=...` with a second "?", so only the leading valid part of each value counts.
 */
export function readPaidQuery(search: string, prefix: string): { ref: string; token: string } | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }
  const ref = /^[A-Z]{2}-\d{6}-[A-Z2-9]{4}/.exec(params.get('ref') ?? '')?.[0] ?? '';
  const token = /^[0-9a-f]{32}/.exec(params.get('t') ?? '')?.[0] ?? '';
  return isRef(ref, prefix) && isToken(token) ? { ref, token } : null;
}

/** Extra. Only an https URL on exactly checkout.hit-pay.com may receive the customer (R10). */
export function isHitpayCheckoutUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === 'checkout.hit-pay.com' && u.username === '' && u.password === '' && u.port === '';
  } catch {
    return false;
  }
}

/**
 * Extra. What the server prices and stores for an order: language, lines, details. Two frozen
 * orders with the same key share one idempotency key (R17); any change gets a new one.
 */
export function orderContentKey(order: Pick<Order, 'lines' | 'details' | 'lang'>): string {
  return JSON.stringify([order.lang, order.lines.map((l) => [l.sku, l.qty]), order.details]);
}

/**
 * desktop=true -> web.whatsapp.com/send?phone=…&text=…, else wa.me/…?text=…
 * The apostrophe is encoded too: a browser turns ' into %27 when it reads the href,
 * so the URL measured here is the URL that is really opened.
 */
export function buildWhatsAppUrl(whatsapp: string, message: string, desktop: boolean): string {
  const number = String(whatsapp).replace(/\D/g, '');
  const body = encodeURIComponent(wellFormed(String(message))).replace(/'/g, '%27');
  return desktop ? `https://web.whatsapp.com/send?phone=${number}&text=${body}` : `https://wa.me/${number}?text=${body}`;
}

/** Plain chat link with no text (used when the message does not fit, O-5). */
export function plainChatUrl(whatsapp: string, desktop: boolean): string {
  const number = String(whatsapp).replace(/\D/g, '');
  return desktop ? `https://web.whatsapp.com/send?phone=${number}` : `https://wa.me/${number}`;
}

/** First `n` visible characters (never half an emoji or half a letter cluster) + '...' when something was cut. */
function cutText(chars: readonly string[], n: number): string {
  if (n >= chars.length) return chars.join('');
  if (n <= 0) return '';
  return `${chars.slice(0, n).join('').trimEnd()}...`;
}

/**
 * Shortens ONLY the note until the longer (desktop) URL fits `cfg.urlCap`.
 * `fits:false` = still too long with an empty note (O-5); `message` is then the full, uncut message.
 */
export function fitOrderMessage(order: Order, labels: MessageLabels, cfg: CoreConfig): { message: string; fits: boolean } {
  const withNote = (note: string) => buildMessage({ ...order, details: { ...order.details, note } }, labels);
  const fits = (message: string) => buildWhatsAppUrl(cfg.whatsapp, message, true).length <= cfg.urlCap;

  const full = buildMessage(order, labels);
  if (fits(full)) return { message: full, fits: true };
  const note = order.details.note;
  if (!note || !fits(withNote(''))) return { message: full, fits: false };

  const chars = graphemes(note);
  let lo = 0;
  let hi = chars.length - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (fits(withNote(cutText(chars, mid)))) lo = mid;
    else hi = mid - 1;
  }
  return { message: withNote(cutText(chars, lo)), fits: true };
}

/* ---------- stored order (steps 2 and 3 read ONLY this) ---------- */

export function serializeOrder(order: Order): string {
  const d = order.details;
  return JSON.stringify({
    ref: order.ref,
    lines: order.lines.map((l) => ({ sku: l.sku, name: l.name, sizeLabel: l.sizeLabel, qty: l.qty, unitSen: l.unitSen })),
    deliverySen: order.deliverySen,
    details: { name: d.name, phone: d.phone, address: d.address, postcode: d.postcode, city: d.city, state: d.state, note: d.note },
    step: order.step,
    lang: order.lang,
    payMode: order.payMode,
    createdAt: order.createdAt,
    ...(order.idem ? { idem: order.idem } : {}),
    ...(order.token ? { token: order.token } : {}),
  });
}

function isCleanText(v: unknown, max: number): v is string {
  return typeof v === 'string' && v !== '' && cleanText(v, max) === v;
}

function parseLine(raw: unknown, maxQty: number): OrderLine | null {
  if (!raw || typeof raw !== 'object') return null;
  const l = raw as Record<string, unknown>;
  if (!isCleanText(l.sku, SKU_MAX) || !isCleanText(l.name, LINE_NAME_MAX) || !isCleanText(l.sizeLabel, SIZE_LABEL_MAX)) return null;
  if (typeof l.qty !== 'number' || !Number.isInteger(l.qty) || l.qty < 1 || l.qty > maxQty) return null;
  if (typeof l.unitSen !== 'number' || !Number.isSafeInteger(l.unitSen) || l.unitSen < 1 || l.unitSen > MAX_UNIT_SEN) return null;
  return { sku: l.sku, name: l.name, sizeLabel: l.sizeLabel, qty: l.qty, unitSen: l.unitSen };
}

/** null when missing, malformed, tampered, expired (>= ttl) or dated > 5 min in the future. */
export function parseOrder(raw: string | null | undefined, now: number, cfg: CoreConfig, states: readonly string[]): Order | null {
  if (!raw || typeof raw !== 'string') return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const o = data as Record<string, unknown>;

  if (!isRef(o.ref, cfg.refPrefix)) return null;
  if (o.step !== 1 && o.step !== 2 && o.step !== 3) return null;
  if (o.lang !== 'en' && o.lang !== 'ms') return null;
  if (o.payMode !== 'chat' && o.payMode !== 'online') return null;
  if (o.idem !== undefined && !isIdem(o.idem)) return null;
  if (o.token !== undefined && !isToken(o.token)) return null;
  const delivery = o.deliverySen;
  if (delivery !== null && (typeof delivery !== 'number' || !Number.isSafeInteger(delivery) || delivery < 0)) return null;

  if (typeof o.createdAt !== 'number' || !Number.isFinite(o.createdAt)) return null;
  const age = now - o.createdAt;
  if (age >= cfg.orderTtlMs || age < -FUTURE_TOLERANCE_MS) return null;

  if (!Array.isArray(o.lines) || o.lines.length < 1 || o.lines.length > MAX_ORDER_LINES) return null;
  const lines: OrderLine[] = [];
  for (const item of o.lines) {
    const line = parseLine(item, cfg.maxQty);
    if (!line || lines.some((l) => l.sku === line.sku)) return null;
    lines.push(line);
  }

  if (!o.details || typeof o.details !== 'object' || Array.isArray(o.details)) return null;
  const stored = o.details as Record<string, unknown>;
  for (const field of FIELD_ORDER) if (typeof stored[field] !== 'string') return null;
  const checked = validateDetails(stored, states);
  if (!checked.ok) return null;
  // A stored order holds values exactly as validateDetails returned them; anything else was edited by hand.
  for (const field of FIELD_ORDER) if (checked.details[field] !== stored[field]) return null;

  return {
    ref: o.ref,
    lines,
    deliverySen: delivery,
    details: checked.details,
    step: o.step,
    lang: o.lang,
    payMode: o.payMode,
    createdAt: o.createdAt,
    ...(isIdem(o.idem) ? { idem: o.idem } : {}),
    ...(isToken(o.token) ? { token: o.token } : {}),
  };
}
