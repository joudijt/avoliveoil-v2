/**
 * Ordering core (FORGE ORDER-R1 -> FORGE HITPAY -> FORGE BUY-NOW). Pure logic: no DOM, no React,
 * NO IMPORTS. Erasable TypeScript only: `node --test scripts/order.test.mjs` runs this file directly.
 * Money is integer sen everywhere.
 *
 * BUY-NOW: one product + size + quantity per order, bought straight from a "Buy now" sheet. No
 * cart, no review step. What a browser keeps (localStorage):
 *  - details (`avo.details.v2`, 30 days): name, phone, ONE address field, postcode, state, so a
 *    returning buyer taps Buy now, then Pay;
 *  - the buy-now draft (`avo.draft.v1`, 24 h): sku, qty, language, a hash of the details and the
 *    idempotency key of that exact order (RULINGS B8), plus ref + token once the server made them.
 */

export type Lang = 'en' | 'ms';

/** The short form (BUY-NOW 3a). Mirrored by server/_lib/pay.php avo_pay_validate_details. */
export interface Details {
  name: string;
  /** Normalised '60…' digits. */
  phone: string;
  /** House no., street, area, city: ONE field, 10..300 characters. */
  address: string;
  postcode: string;
  state: string;
}
export type DetailField = keyof Details;
export type DetailErrorCode = 'required' | 'tooLong' | 'tooShort' | 'phone' | 'postcode' | 'state';
export type DetailErrors = Partial<Record<DetailField, DetailErrorCode>>;

export interface Totals {
  subtotalSen: number;
  deliverySen: number | null;
  totalSen: number;
}

/** Labels of the WhatsApp messages, one set per language (messageStrings.ts). */
export interface MessageLabels {
  delivery: string;
  deliveryFree: string;
  total: string;
  payment: string;
  /** After HitPay confirmed the payment. */
  paymentPaid: string;
  name: string;
  phone: string;
  address: string;
  /** First words of the paid message. */
  paidOrder: string;
  /** First words of the "online payment is closed" message (product + size + qty only). */
  wantToOrder: string;
}

export const FIELD_MAX: Record<DetailField, number> = {
  name: 60,
  phone: 20,
  address: 300,
  postcode: 5,
  state: 40,
};
/** The address must be at least this long (a courier needs more than a house number). */
export const ADDRESS_MIN = 10;

/** Form order: the first field in this list that has an error gets focus. */
export const FIELD_ORDER: readonly DetailField[] = ['name', 'phone', 'address', 'postcode', 'state'];

/** Order reference alphabet (the server makes refs): no I, O, 0, 1. */
export const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/* ---------- money ---------- */

/** '59.00' -> 5900 without float maths. null for anything that is not a plain amount. */
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

/** One product line: quantity x unit price, plus the delivery fee (null = not known yet, left out). */
export function computeTotals(unitSen: number, qty: number, deliverySen: number | null): Totals {
  const subtotalSen = unitSen * qty;
  return { subtotalSen, deliverySen, totalSen: subtotalSen + (deliverySen ?? 0) };
}

/* ---------- text ---------- */

/** Direction overrides and isolates: they can reorder what the seller reads. */
const BIDI_CONTROLS = /[‪-‮⁦-⁩]/g;
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
 * become ASCII. Then: optional +60 / 60 / 0 (also '+60 (0)18…': a 0 right after the 60), then
 * the national number with its exact length (011 and 015 = 8 more digits, the other 01x = 7).
 * Landlines and 1800 / 1300 numbers do not match.
 */
export function normalisePhone(raw: string): string | null {
  if (typeof raw !== 'string') return null;
  const s = asciiDigits(raw).replace(/[\s().\-­‐-―​-‏‪-‮⁠⁦-⁩]/g, '');
  const m = /^(?:\+?600?|0)?(1(?:[02-46-9]\d{7}|[15]\d{8}))$/.exec(s);
  return m ? `60${m[1]}` : null;
}

/** Longer than any field: text is cleaned whole first so 'tooLong' can be reported instead of a silent cut. */
const CLEAN_ALL = 100_000;

/** The address textarea: each typed line cleaned, empty lines dropped, joined with ", " (one line for the courier). */
export function cleanAddress(value: unknown): string {
  const text = typeof value === 'string' ? value : '';
  return text
    .split(/\r\n|\r|\n/)
    .map((line) => cleanText(line, CLEAN_ALL))
    .filter((line) => !isBlank(line))
    .join(', ');
}

export function validateDetails(
  raw: Partial<Record<DetailField, unknown>>,
  states: readonly string[]
): { ok: true; details: Details } | { ok: false; errors: DetailErrors } {
  const errors: DetailErrors = {};
  // Emptiness is judged on what a person can see (invisible format characters do not count).
  const name = cleanText(raw.name, CLEAN_ALL);
  if (isBlank(name)) errors.name = 'required';
  else if (name.length > FIELD_MAX.name) errors.name = 'tooLong';

  const phoneTyped = cleanText(raw.phone, CLEAN_ALL);
  const phone = typeof raw.phone === 'string' ? normalisePhone(raw.phone) : normalisePhone(phoneTyped);
  if (isBlank(phoneTyped)) errors.phone = 'required';
  else if (!phone) errors.phone = 'phone';

  const address = cleanAddress(raw.address);
  if (isBlank(address)) errors.address = 'required';
  else if (address.length > FIELD_MAX.address) errors.address = 'tooLong';
  else if (address.length < ADDRESS_MIN) errors.address = 'tooShort';

  const postcode = asciiDigits(cleanText(raw.postcode, CLEAN_ALL));
  if (isBlank(postcode)) errors.postcode = 'required';
  else if (!/^\d{5}$/.test(postcode)) errors.postcode = 'postcode';

  const state = cleanText(raw.state, CLEAN_ALL);
  if (isBlank(state)) errors.state = 'required';
  else if (!states.includes(state)) errors.state = 'state';

  if (Object.keys(errors).length > 0 || phone === null) return { ok: false, errors };
  return { ok: true, details: { name, phone, address, postcode, state } };
}

/* ---------- references, tokens, idempotency ---------- */

function defaultRandomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n);
  const c = (globalThis as { crypto?: { getRandomValues?: (a: Uint8Array) => Uint8Array } }).crypto;
  if (c && typeof c.getRandomValues === 'function') c.getRandomValues(out);
  else for (let i = 0; i < n; i++) out[i] = Math.floor(Math.random() * 256);
  return out;
}

/** True for '<prefix>-YYMMDD-XXXX': month 01-12, day 01-31, XXXX from REF_ALPHABET. */
export function isRef(value: unknown, prefix: string): value is string {
  if (typeof value !== 'string' || !value.startsWith(`${prefix}-`)) return false;
  return /^\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])-[ABCDEFGHJKLMNPQRSTUVWXYZ2-9]{4}$/.test(value.slice(prefix.length + 1));
}

/** 32 lowercase hex characters (the server's status token). */
export function isToken(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{32}$/.test(value);
}

/** Idempotency key: 8-64 of [A-Za-z0-9-]. */
export function isIdem(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(value);
}

/** A fresh idempotency key, 32 hex characters. `randomBytes` is injectable for tests. */
export function makeIdem(randomBytes?: (n: number) => Uint8Array): string {
  const bytes = (randomBytes ?? defaultRandomBytes)(16);
  let out = '';
  for (let i = 0; i < 16; i++) out += ((bytes[i] ?? 0) + 256).toString(16).slice(1);
  return out;
}

/**
 * ref + token from the return URL query. Tolerant (review 18): HitPay may append its own
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

/** Only an https URL on exactly checkout.hit-pay.com may receive the customer (R10). */
export function isHitpayCheckoutUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === 'checkout.hit-pay.com' && u.username === '' && u.password === '' && u.port === '';
  } catch {
    return false;
  }
}

/* ---------- the buy-now draft (RULINGS B8: idempotency without a cart) ---------- */

export interface Draft {
  site: 'av' | 'nf';
  sku: string;
  qty: number;
  lang: Lang;
  /** Hash of [site, lang, sku, qty, details]: what the server prices and stores. */
  key: string;
  /** Idempotency key sent with every Pay tap of THIS exact order. */
  idem: string;
  /** When this idem was made (ms). The same order within the reuse window keeps it. */
  createdAt: number;
  ref?: string;
  token?: string;
}

/** FNV-1a, 32 bit, as 8 hex characters. Not security: only "did anything change". */
function fnv1a(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** Same order = same key. Any change of site, language, product, size, quantity or details = another key. */
export function draftKey(site: string, lang: Lang, sku: string, qty: number, details: Details): string {
  const d = details;
  return fnv1a(JSON.stringify([site, lang, sku, qty, d.name, d.phone, d.address, d.postcode, d.state]));
}

/**
 * The draft for a Pay tap. The same order (same key) within `reuseMs` of the previous draft keeps
 * its idem, ref and token: the server then hands out the SAME HitPay request (no second order on a
 * double tap or a Back from HitPay). Anything else gets a fresh idem and no ref/token.
 */
export function nextDraft(
  prev: Draft | null,
  input: { site: 'av' | 'nf'; lang: Lang; sku: string; qty: number; details: Details },
  now: number,
  reuseMs: number,
  randomBytes?: (n: number) => Uint8Array
): Draft {
  const key = draftKey(input.site, input.lang, input.sku, input.qty, input.details);
  const base = { site: input.site, sku: input.sku, qty: input.qty, lang: input.lang, key };
  const age = prev ? now - prev.createdAt : -1;
  if (prev && prev.key === key && prev.site === input.site && age >= 0 && age < reuseMs) {
    return { ...base, idem: prev.idem, createdAt: prev.createdAt, ...(prev.ref ? { ref: prev.ref } : {}), ...(prev.token ? { token: prev.token } : {}) };
  }
  return { ...base, idem: makeIdem(randomBytes), createdAt: now };
}

export function serializeDraft(d: Draft): string {
  return JSON.stringify({
    site: d.site,
    sku: d.sku,
    qty: d.qty,
    lang: d.lang,
    key: d.key,
    idem: d.idem,
    createdAt: d.createdAt,
    ...(d.ref ? { ref: d.ref } : {}),
    ...(d.token ? { token: d.token } : {}),
  });
}

/** null when missing, malformed, tampered, older than `ttlMs` or dated more than 5 min ahead. */
export function parseDraft(raw: string | null | undefined, now: number, ttlMs: number, refPrefix: string, maxQty: number): Draft | null {
  if (!raw || typeof raw !== 'string') return null;
  let o: Record<string, unknown>;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
    o = data as Record<string, unknown>;
  } catch {
    return null;
  }
  if (o.site !== 'av' && o.site !== 'nf') return null;
  if (o.lang !== 'en' && o.lang !== 'ms') return null;
  if (typeof o.sku !== 'string' || !/^[a-z0-9-]{1,40}:[a-z0-9]{1,10}$/.test(o.sku)) return null;
  if (typeof o.qty !== 'number' || !Number.isInteger(o.qty) || o.qty < 1 || o.qty > maxQty) return null;
  if (typeof o.key !== 'string' || !/^[0-9a-f]{8}$/.test(o.key)) return null;
  if (!isIdem(o.idem)) return null;
  if (typeof o.createdAt !== 'number' || !Number.isFinite(o.createdAt)) return null;
  const age = now - o.createdAt;
  if (age >= ttlMs || age < -5 * 60 * 1000) return null;
  if (o.ref !== undefined && !isRef(o.ref, refPrefix)) return null;
  if (o.token !== undefined && !isToken(o.token)) return null;
  return {
    site: o.site,
    sku: o.sku,
    qty: o.qty,
    lang: o.lang,
    key: o.key,
    idem: o.idem,
    createdAt: o.createdAt,
    ...(isRef(o.ref, refPrefix) ? { ref: o.ref } : {}),
    ...(isToken(o.token) ? { token: o.token } : {}),
  };
}

/* ---------- WhatsApp messages ---------- */

/** A line as the messages print it: "Extra Virgin 500 ml x 2", or a package "Noor Fès, 2 bottles (500 ml each)". */
export interface MessageLine {
  label: string;
  qty: number;
  unitSen: number;
  /** A package: qty is always 1 and is never printed. */
  pack?: boolean;
}

function lineText(l: Pick<MessageLine, 'label' | 'qty' | 'pack'>): string {
  return l.pack ? l.label : `${l.label} x ${l.qty}`;
}

/**
 * Online payment closed (BUY-NOW §2): the WhatsApp text carries product + size + qty only,
 * never a name, a phone number or an address.
 */
export function buildEnquiryMessage(line: Pick<MessageLine, 'label' | 'qty' | 'pack'>, labels: MessageLabels): string {
  return wellFormed(`${labels.wantToOrder}: ${lineText(line)}`);
}

/**
 * The paid order as plain text, one fact per line. With `details` (this device still has them):
 * name, phone and address too; without: ref, line and totals only (nothing personal).
 */
export function buildPaidMessage(
  input: { ref: string; line: MessageLine; deliverySen: number; details?: Details | null },
  labels: MessageLabels
): string {
  const L = labels;
  const t = computeTotals(input.line.unitSen, input.line.qty, input.deliverySen);
  const out = [
    `${L.paidOrder} ${input.ref}`,
    `${lineText(input.line)} = ${formatRM(t.subtotalSen)}`,
    `${L.delivery}: ${input.deliverySen === 0 ? L.deliveryFree : formatRM(input.deliverySen)}`,
    `${L.total}: ${formatRM(t.totalSen)}`,
    `${L.payment}: ${L.paymentPaid}`,
  ];
  const d = input.details;
  if (d) out.push(`${L.name}: ${d.name}`, `${L.phone}: +${d.phone}`, `${L.address}: ${d.address}, ${d.postcode}, ${d.state}`);
  return wellFormed(out.join('\n'));
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

/** Plain chat link with no text. */
export function plainChatUrl(whatsapp: string, desktop: boolean): string {
  const number = String(whatsapp).replace(/\D/g, '');
  return desktop ? `https://web.whatsapp.com/send?phone=${number}` : `https://wa.me/${number}`;
}
