// Run: node --test scripts/order.test.mjs   (Node 24 strips the types of the .ts imports)
// FORGE ORDER-R1 -> HITPAY -> BUY-NOW: unit tests of the ordering core (short form, buy-now draft +
// idempotency, messages), the message strings and the server price table.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import {
  ADDRESS_MIN,
  FIELD_MAX,
  FIELD_ORDER,
  REF_ALPHABET,
  buildEnquiryMessage,
  buildPaidMessage,
  buildWhatsAppUrl,
  cleanAddress,
  cleanText,
  computeTotals,
  draftKey,
  formatRM,
  isHitpayCheckoutUrl,
  isIdem,
  isRef,
  isToken,
  makeIdem,
  nextDraft,
  normalisePhone,
  parseDraft,
  plainChatUrl,
  readPaidQuery,
  serializeDraft,
  toSen,
  validateDetails,
} from '../src/order/core.ts';
import { MESSAGE_LABELS, ORDER_NAMES, STATES_MY, sizeLabel } from '../src/order/messageStrings.ts';

const MAX = 24;
const WA = '601111119912';
const TTL = 24 * 60 * 60 * 1000;
const REF = 'AV-261112-7KQ4';
const T0 = new Date(Date.UTC(2026, 10, 12, 6, 0, 0)); // 14:00 Malaysia time, 12 Nov 2026

const catalogue = JSON.parse(readFileSync(new URL('../src/data/catalogue.json', import.meta.url), 'utf8'));
/** The 10 SKUs in catalogue order. */
const SKUS = catalogue.products.flatMap((p) => p.sizes.map((s) => `${p.id}:${s}`));

const details = (over = {}) => ({
  name: 'Aisyah Rahman',
  phone: '60182059925',
  address: '12, Jalan Bukit 3, Taman Mewah, Kajang',
  postcode: '43000',
  state: 'Selangor',
  ...over,
});

/** Details that passed validateDetails (so the test proves the form accepts them). */
const valid = (over) => {
  const v = validateDetails(details(over), STATES_MY);
  assert.equal(v.ok, true, JSON.stringify(v.errors ?? {}));
  return v.details;
};

/* ---------- catalogue and strings ---------- */

test('catalogue: 8 products, 10 SKUs, every product has a short name in both languages', () => {
  assert.equal(catalogue.products.length, 8);
  assert.equal(SKUS.length, 10);
  const ids = catalogue.products.map((p) => p.id).sort();
  for (const lang of ['en', 'ms']) {
    assert.deepEqual(Object.keys(ORDER_NAMES[lang]).sort(), ids, lang);
    for (const id of ids) assert.ok(ORDER_NAMES[lang][id].trim().length > 0, `${lang} ${id}`);
    assert.equal(new Set(Object.values(ORDER_NAMES[lang])).size, 8, `${lang}: names are distinct`);
  }
  assert.equal(ORDER_NAMES.en['extra-virgin'], 'Extra Virgin');
  assert.equal(ORDER_NAMES.en.organic, 'Organic Extra Virgin');
  assert.equal(ORDER_NAMES.en.blackseed, 'Infused: Blackseed');
  assert.equal(ORDER_NAMES.ms.organic, 'Extra Virgin Organik');
  assert.equal(ORDER_NAMES.ms.blackseed, 'Infusi: Habbatus Sauda');
  assert.equal(sizeLabel('500'), '500 ml');
  assert.equal(sizeLabel('250'), '250 ml');
});

test('strings: both languages have the same label keys, none empty, no dash, no claim, no price', () => {
  assert.deepEqual(Object.keys(MESSAGE_LABELS.ms).sort(), Object.keys(MESSAGE_LABELS.en).sort());
  assert.equal(Object.keys(MESSAGE_LABELS.en).length, 10);
  const all = [];
  for (const lang of ['en', 'ms']) {
    for (const [k, v] of Object.entries(MESSAGE_LABELS[lang])) all.push([`${lang}.label.${k}`, v]);
    for (const [k, v] of Object.entries(ORDER_NAMES[lang])) all.push([`${lang}.name.${k}`, v]);
  }
  for (const s of STATES_MY) all.push([`state.${s}`, s]);
  for (const [path, v] of all) {
    assert.equal(typeof v, 'string', path);
    assert.ok(v.trim() !== '' && v === v.trim(), `${path} is empty or padded`);
    assert.doesNotMatch(v, /[—–]/, `${path} has a dash`);
    assert.doesNotMatch(v, /\b(cure[sd]?|treat(s|ment|ments)?|prevent(s|ion)?|heal(s|ing|th|thy)?|halal|best seller|certified|award-winning)\b/i, path);
    assert.doesNotMatch(v, /\b(sembuh|menyembuhkan|merawat|rawatan|mencegah|penyakit|kesihatan|khasiat)\b/i, path);
    assert.doesNotMatch(v, /RM\s?\d/, `${path} carries a price`);
    assert.equal(cleanText(v, 200), v, `${path} survives cleanText unchanged`);
  }
});

test('states: 13 states + 3 federal territories, no duplicates', () => {
  assert.equal(STATES_MY.length, 16);
  assert.equal(new Set(STATES_MY).size, 16);
  assert.equal(STATES_MY.filter((s) => s.startsWith('W.P. ')).length, 3);
  for (const s of ['Selangor', 'Sabah', 'Sarawak', 'Pulau Pinang', 'W.P. Kuala Lumpur']) assert.ok(STATES_MY.includes(s), s);
});

/* ---------- phone ---------- */

test('phone: every accepted form normalises to 60182059925', () => {
  for (const form of ['0182059925', '018-205 9925', '+60182059925', '60182059925', '182059925', ' +60 18-205 9925 ', '(018) 205.9925', '+60-18-205-9925']) {
    assert.equal(normalisePhone(form), '60182059925', form);
  }
});

test('phone: 011 and 015 numbers carry one more digit', () => {
  for (const form of ['01112345678', '011-1234 5678', '+601112345678', '601112345678', '1112345678', '+60 11-1234 5678']) {
    assert.equal(normalisePhone(form), '601112345678', form);
  }
  assert.equal(normalisePhone('015-1234 5678'), '601512345678');
  assert.equal(normalisePhone('011-1234 56789'), null, 'one digit too many');
  assert.equal(normalisePhone('011-1234'), null, 'too short');
});

test('phone: Malaysian mobiles only (O-10): landlines, toll free, other countries and wrong lengths are refused', () => {
  // Control: the same shapes with a mobile prefix and the right length pass.
  for (const p of ['010', '012', '013', '014', '016', '017', '018', '019']) {
    assert.equal(normalisePhone(`${p}-234 5678`), `6${p}2345678`, p);
    assert.equal(normalisePhone(`${p.slice(1)}2345678`), `6${p}2345678`, `bare ${p}`);
  }
  for (const bad of [
    '',
    '   ',
    '03-1234 5678', // KL landline
    '0312345678',
    '+60312345678',
    '04-123 4567', // Penang landline
    '082-123456', // Sarawak landline
    '01820599', // short
    '018205992', // one digit short
    '018205992555', // too long
    '01820599255', // 018 + 8 digits
    '0111234567', // 011 needs 8 digits after it
    '0151234567',
    '01212345678',
    '1800881234', // toll free
    '1-800-88-1234',
    '1300881234',
    '018-205-992a',
    'call me',
    '018205 9925 ext 2',
    '+6582059925', // Singapore
    '+1 182059925',
    '0060182059925',
    '0282059925',
    '++60182059925',
    '018+2059925',
  ]) {
    assert.equal(normalisePhone(bad), null, JSON.stringify(bad));
  }
  for (const notText of [null, undefined, 182059925, {}]) assert.equal(normalisePhone(notText), null);
});

test('phone: a number copied from WhatsApp or Contacts (direction marks, non-breaking hyphens and spaces)', () => {
  assert.equal(normalisePhone('‪+60 18‑205 9925‬'), '60182059925');
  assert.equal(normalisePhone('⁦018–205​9925⁩‎'), '60182059925');
  assert.equal(valid({ phone: '‪+60 18‑205 9925‬' }).phone, '60182059925');
});

/* ---------- text cleaning ---------- */

test('cleanText: control and direction characters out, white space collapsed, trimmed, cut to max', () => {
  assert.equal(cleanText('  Aisyah \t  Rahman \r\n', 60), 'Aisyah Rahman');
  assert.equal(cleanText('a\u0000b\u0007c\u007fd\u0085e', 60), 'a b c d e');
  assert.equal(cleanText('‮Aisyah‬ ⁧x⁩', 60), 'Aisyah x');
  assert.equal(cleanText('Lot 5\nJalan 3', 60), 'Lot 5 Jalan 3', 'one fact per line: a line break becomes a space');
  assert.equal(cleanText('محمد بن عبد الله', 60), 'محمد بن عبد الله', 'an Arabic name is kept as typed');
  assert.equal(cleanText('abcdef', 3), 'abc');
  assert.equal(cleanText('ab cdef', 3), 'ab', 'no trailing space after the cut');
  assert.equal(cleanText('ab', 0), '');
  assert.equal(cleanText(12345, 60), '12345');
  for (const v of [null, undefined, {}, [], NaN, true]) assert.equal(cleanText(v, 60), '', String(v));
});

test('cleanText: half an emoji (lone surrogate) is dropped and a cut never leaves one', () => {
  const half = '\ud83d';
  assert.equal(cleanText(`a${half}b😀\udc00c`, 60), 'ab😀c');
  assert.equal(cleanText('a😀', 2), 'a', 'the cut falls inside the emoji: the whole emoji goes');
  assert.equal(cleanText('a😀', 3), 'a😀');
  assert.doesNotThrow(() => encodeURIComponent(cleanText(`x${half}`, 60)));
});

/* ---------- money ---------- */

test('sen maths: amount strings parse without float drift', () => {
  assert.equal(toSen('59.00'), 5900);
  assert.equal(toSen('109.00'), 10900);
  assert.equal(toSen('75'), 7500);
  assert.equal(toSen('19.99'), 1999);
  assert.equal(toSen('0.07'), 7);
  assert.equal(toSen('89.9'), 8990);
  assert.equal(toSen(' 129.00 '), 12900);
  assert.equal(toSen('0'), 0);
  for (const bad of ['', 'RM59', '59,00', '59.000', '-59.00', '5e3', '59.', '.59', 'abc', null, undefined, 59, NaN]) {
    assert.equal(toSen(bad), null, String(bad));
  }
});

test('sen maths: formatRM', () => {
  assert.equal(formatRM(21800), 'RM 218.00');
  assert.equal(formatRM(5900), 'RM 59.00');
  assert.equal(formatRM(8905), 'RM 89.05');
  assert.equal(formatRM(7), 'RM 0.07');
  assert.equal(formatRM(0), 'RM 0.00');
  assert.equal(formatRM(1958400), 'RM 19584.00');
});


/* ---------- totals ---------- */

test('totals: one line x qty + delivery; null delivery is left out; 0 is free', () => {
  assert.deepEqual(computeTotals(10900, 2, null), { subtotalSen: 21800, deliverySen: null, totalSen: 21800 });
  assert.deepEqual(computeTotals(10900, 2, 1000), { subtotalSen: 21800, deliverySen: 1000, totalSen: 22800 });
  assert.deepEqual(computeTotals(7500, 1, 0), { subtotalSen: 7500, deliverySen: 0, totalSen: 7500 });
  assert.equal(computeTotals(10900, MAX, 1000).totalSen, 262600, '24 x RM 109 + RM 10');
  // Noor Fès packages (server prices) + RM 10 = 159 / 259 / 359
  assert.deepEqual([14900, 24900, 34900].map((p) => computeTotals(p, 1, 1000).totalSen), [15900, 25900, 35900]);
});

/* ---------- details (BUY-NOW short form) ---------- */

test('validateDetails: a good short form passes; phone normalised; no city, no note, no email', () => {
  const d = valid();
  assert.deepEqual(d, {
    name: 'Aisyah Rahman',
    phone: '60182059925',
    address: '12, Jalan Bukit 3, Taman Mewah, Kajang',
    postcode: '43000',
    state: 'Selangor',
  });
  assert.deepEqual(Object.keys(d).sort(), [...FIELD_ORDER].sort());
  assert.deepEqual(FIELD_ORDER, ['name', 'phone', 'address', 'postcode', 'state']);
});

test('validateDetails: empty form reports every field', () => {
  const r = validateDetails({}, STATES_MY);
  assert.deepEqual(r, { ok: false, errors: { name: 'required', phone: 'required', address: 'required', postcode: 'required', state: 'required' } });
});

test('validateDetails: invalid phone, postcode and state each get their own code', () => {
  const r = validateDetails(details({ phone: '03-1234 5678', postcode: '4300', state: 'Bali' }), STATES_MY);
  assert.deepEqual(r, { ok: false, errors: { phone: 'phone', postcode: 'postcode', state: 'state' } });
});

test('validateDetails: address is ONE field of 10..300 (B4 mirror of the server)', () => {
  assert.equal(FIELD_MAX.address, 300);
  assert.equal(ADDRESS_MIN, 10);
  assert.deepEqual(validateDetails(details({ address: '123456789' }), STATES_MY), { ok: false, errors: { address: 'tooShort' } });
  assert.equal(valid({ address: '1234567890' }).address, '1234567890');
  assert.equal(valid({ address: 'a'.repeat(300) }).address.length, 300);
  assert.deepEqual(validateDetails(details({ address: 'a'.repeat(301) }), STATES_MY), { ok: false, errors: { address: 'tooLong' } });
  assert.equal(valid({ name: 'a'.repeat(60) }).name.length, 60);
  assert.deepEqual(validateDetails(details({ name: 'a'.repeat(61) }), STATES_MY), { ok: false, errors: { name: 'tooLong' } });
});

test('cleanAddress: typed lines are cleaned and joined with ", "; empty lines dropped', () => {
  assert.equal(cleanAddress('No 3, Jalan Bunga\nTaman Melati\r\n\n  Kajang  '), 'No 3, Jalan Bunga, Taman Melati, Kajang');
  assert.equal(cleanAddress('‮Lot 5‬\rJalan 3'), 'Lot 5, Jalan 3');
  assert.equal(cleanAddress('  \n ​ \n'), '');
  for (const v of [null, undefined, 5, {}]) assert.equal(cleanAddress(v), '');
  // a line break never forges a new message line
  assert.equal(valid({ address: '12 Jalan 3\nPayment: paid in full' }).address.includes('\n'), false);
});

test('review 1: text made only of invisible format characters counts as empty', () => {
  const invisible = ['​', '⁠‍', '\u{e0041}\u{e0042}\u{e007f}', ' ​ ‍ ', '­‌', '﻿​'];
  for (const v of invisible) {
    for (const field of ['name', 'phone', 'address', 'postcode', 'state']) {
      assert.deepEqual(validateDetails(details({ [field]: v }), STATES_MY), { ok: false, errors: { [field]: 'required' } }, `${field} ${JSON.stringify(v)}`);
    }
  }
  assert.equal(valid({ name: 'Ali‍' }).name, 'Ali‍');
  assert.equal(valid({ name: '👨‍👩‍👧 Tan' }).name, '👨‍👩‍👧 Tan', 'the joiner inside an emoji family stays');
});

test('review 2: Arabic-Indic, Extended Arabic-Indic and full-width digits; +60 (0)18…', () => {
  for (const form of ['٠١٨٢٠٥٩٩٢٥', '۰۱۸۲۰۵۹۹۲۵', '０１８２０５９９２５', '+٦٠ ١٨-٢٠٥ ٩٩٢٥', '+60 (0)18-205 9925', '60 018 205 9925', '+60018 2059925', '600182059925']) {
    assert.equal(normalisePhone(form), '60182059925', form);
    assert.equal(valid({ phone: form }).phone, '60182059925', form);
  }
  for (const form of ['４３０００', '٤٣٠٠٠', '۴۳۰۰۰', ' ４3０0０ ']) assert.equal(valid({ postcode: form }).postcode, '43000', form);
  for (const bad of ['４３００', '٤٣٠٠٠٠', '४३०००', '４３０００a']) {
    assert.deepEqual(validateDetails(details({ postcode: bad }), STATES_MY), { ok: false, errors: { postcode: 'postcode' } }, bad);
  }
});

/* ---------- references, idem, token ---------- */

test('isRef: shape, real month and day, prefix from the caller', () => {
  assert.equal(REF_ALPHABET.length, 32);
  for (const banned of ['I', 'O', '0', '1']) assert.equal(REF_ALPHABET.includes(banned), false, banned);
  assert.equal(isRef(REF, 'AV'), true, 'control');
  for (const bad of ['', 'AV-261112-7KQ', 'AV-261112-7KQI', 'AV-261112-7kq4', 'AV-26111-7KQ4', 'NF-261112-7KQ4', ' AV-261112-7KQ4', 'AV-261301-7KQ4', 'AV-261132-7KQ4', null, 5]) {
    assert.equal(isRef(bad, 'AV'), false, String(bad));
  }
  assert.equal(isRef('NF-261112-7KQ4', 'NF'), true);
});

test('hitpay: makeIdem / isIdem / isToken', () => {
  const a = makeIdem();
  assert.match(a, /^[0-9a-f]{32}$/);
  assert.notEqual(makeIdem(), a);
  assert.equal(makeIdem(() => new Uint8Array(16).fill(255)), 'f'.repeat(32));
  assert.equal(isIdem(a), true);
  for (const bad of ['', 'short', 'x'.repeat(65), 'has space ok', null, 5]) assert.equal(isIdem(bad), false, String(bad));
  assert.equal(isToken('0123456789abcdef0123456789abcdef'), true);
  for (const bad of ['0123456789ABCDEF0123456789ABCDEF', '0123', null]) assert.equal(isToken(bad), false, String(bad));
});

/* ---------- the buy-now draft (B8) ---------- */

const REUSE = 20 * 60 * 1000;
const input = (over = {}) => ({ site: 'av', lang: 'en', sku: 'extra-virgin:500', qty: 2, details: valid(), ...over });

test('draft: the same order within 20 min keeps idem, ref and token; after 20 min a new idem', () => {
  const t0 = T0.getTime();
  const a = nextDraft(null, input(), t0, REUSE);
  assert.match(a.idem, /^[0-9a-f]{32}$/);
  assert.equal(a.createdAt, t0);
  assert.equal('ref' in a, false);
  const paidOnce = { ...a, ref: REF, token: '0123456789abcdef0123456789abcdef' };
  const b = nextDraft(paidOnce, input(), t0 + REUSE - 1, REUSE);
  assert.deepEqual([b.idem, b.ref, b.token, b.createdAt], [a.idem, REF, paidOnce.token, t0], 'double tap / Back from HitPay = same order');
  const c = nextDraft(paidOnce, input(), t0 + REUSE, REUSE);
  assert.notEqual(c.idem, a.idem, '20 min later: new idem');
  assert.equal('ref' in c || 'token' in c, false);
  assert.notEqual(nextDraft(paidOnce, input(), t0 - 1, REUSE).idem, a.idem, 'a draft from the future is not reused');
});

test('draft: any change of size, qty, language, site or details = a new idem (NF: the pack id counts)', () => {
  const t0 = T0.getTime();
  const a = nextDraft(null, input(), t0, REUSE);
  for (const over of [
    { sku: 'extra-virgin:250' },
    { qty: 3 },
    { lang: 'ms' },
    { site: 'nf', sku: 'noor-fes:pack2', qty: 1 },
    { details: valid({ address: '99, Jalan Lain, Bangi' }) },
    { details: valid({ phone: '011-1234 5678' }) },
    { details: valid({ state: 'Johor' }) },
  ]) {
    const b = nextDraft(a, input(over), t0 + 1000, REUSE);
    assert.notEqual(b.idem, a.idem, JSON.stringify(over));
    assert.notEqual(b.key, a.key, JSON.stringify(over));
  }
  assert.notEqual(draftKey('nf', 'en', 'noor-fes:pack1', 1, valid()), draftKey('nf', 'en', 'noor-fes:pack2', 1, valid()));
  assert.match(a.key, /^[0-9a-f]{8}$/);
});

test('draft: storage round trip; expired, future, tampered or malformed = no draft (never throws)', () => {
  const t0 = T0.getTime();
  const d = { ...nextDraft(null, input(), t0, REUSE), ref: REF, token: '0123456789abcdef0123456789abcdef' };
  const raw = serializeDraft(d);
  assert.deepEqual(parseDraft(raw, t0 + 1000, TTL, 'AV', MAX), d);
  assert.doesNotMatch(raw, /Aisyah|60182059925|Jalan|43000/, 'no personal data in the draft');
  assert.equal(parseDraft(raw, t0 + TTL, TTL, 'AV', MAX), null, '24 h');
  assert.equal(parseDraft(raw, t0 - 6 * 60 * 1000, TTL, 'AV', MAX), null, 'more than 5 min ahead');
  const j = JSON.parse(raw);
  for (const [k, v] of [['qty', 25], ['qty', 0], ['qty', 1.5], ['sku', 'x'], ['site', 'zz'], ['lang', 'fr'], ['key', 'nothex!!'], ['idem', 'bad idem'], ['ref', 'NF-261112-7KQ4'], ['token', 'abc'], ['createdAt', 'now']]) {
    assert.equal(parseDraft(JSON.stringify({ ...j, [k]: v }), t0, TTL, 'AV', MAX), null, `${k}=${JSON.stringify(v)}`);
  }
  for (const bad of [null, undefined, '', 'nope', '[]', '{"__proto__":{"x":1}}', '5']) assert.equal(parseDraft(bad, t0, TTL, 'AV', MAX), null, String(bad));
  assert.equal({}.x, undefined, 'nothing polluted');
});

/* ---------- messages ---------- */

test('closed-state message: product + size + qty only, never personal data (EN + MS)', () => {
  assert.equal(buildEnquiryMessage({ label: 'Extra Virgin 500 ml', qty: 2 }, MESSAGE_LABELS.en), 'Hi, I would like to order: Extra Virgin 500 ml x 2');
  assert.equal(buildEnquiryMessage({ label: 'Infusi: Habbatus Sauda 250 ml', qty: 1 }, MESSAGE_LABELS.ms), 'Hai, saya ingin memesan: Infusi: Habbatus Sauda 250 ml x 1');
  assert.equal(buildEnquiryMessage({ label: 'Noor Fès, 2 bottles (500 ml each)', qty: 1, pack: true }, MESSAGE_LABELS.en), 'Hi, I would like to order: Noor Fès, 2 bottles (500 ml each)');
  const url = buildWhatsAppUrl(WA, buildEnquiryMessage({ label: 'Extra Virgin 500 ml', qty: 2 }, MESSAGE_LABELS.en), false);
  assert.equal(url, 'https://wa.me/601111119912?text=Hi%2C%20I%20would%20like%20to%20order%3A%20Extra%20Virgin%20500%20ml%20x%202');
});

test('paid message EN: with the details of this device (exact text)', () => {
  assert.equal(
    buildPaidMessage({ ref: 'AV-261116-7KQ4', line: { label: 'Extra Virgin 500 ml', qty: 2, unitSen: 10900 }, deliverySen: 1000, details: valid() }, MESSAGE_LABELS.en),
    [
      'Paid order AV-261116-7KQ4',
      'Extra Virgin 500 ml x 2 = RM 218.00',
      'Delivery: RM 10.00',
      'Total: RM 228.00',
      'Payment: PAID via HitPay',
      'Name: Aisyah Rahman',
      'Phone: +60182059925',
      'Address: 12, Jalan Bukit 3, Taman Mewah, Kajang, 43000, Selangor',
    ].join('\n')
  );
});

test('paid message MS without details (another device): ref, line, totals, nothing personal; delivery 0 = Percuma', () => {
  const m = buildPaidMessage({ ref: 'AV-261116-7KQ4', line: { label: 'Extra Virgin Organik 250 ml', qty: 1, unitSen: 6900 }, deliverySen: 0 }, MESSAGE_LABELS.ms);
  assert.equal(m, ['Pesanan dibayar AV-261116-7KQ4', 'Extra Virgin Organik 250 ml x 1 = RM 69.00', 'Penghantaran: Percuma', 'Jumlah: RM 69.00', 'Bayaran: DIBAYAR melalui HitPay'].join('\n'));
});

test('paid message: a package is printed by its label, never "x 1" (B3)', () => {
  const m = buildPaidMessage({ ref: 'NF-261116-7KQ4', line: { label: 'Noor Fès, 3 bottles (500 ml each)', qty: 1, unitSen: 34900, pack: true }, deliverySen: 1000 }, MESSAGE_LABELS.en);
  assert.match(m, /^Noor Fès, 3 bottles \(500 ml each\) = RM 349\.00$/m);
  assert.doesNotMatch(m, / x 1\b/);
  assert.match(m, /^Total: RM 359\.00$/m);
});

/* ---------- WhatsApp URL ---------- */

test('WhatsApp URL: phone and desktop forms, plain chat link', () => {
  assert.equal(buildWhatsAppUrl(WA, 'Hi', false), 'https://wa.me/601111119912?text=Hi');
  assert.equal(buildWhatsAppUrl(WA, 'Hi', true), 'https://web.whatsapp.com/send?phone=601111119912&text=Hi');
  assert.equal(plainChatUrl(WA, false), 'https://wa.me/601111119912');
  assert.equal(plainChatUrl(WA, true), 'https://web.whatsapp.com/send?phone=601111119912');
});

test("WhatsApp URL: the message survives the round trip with & # ' emoji; half an emoji never throws", () => {
  const msg = "Tom & Jerry's #1 😀\nline 2";
  const url = buildWhatsAppUrl(WA, msg, true);
  assert.doesNotMatch(url, /'/);
  assert.equal(new URL(url).searchParams.get('text'), msg);
  assert.doesNotThrow(() => buildWhatsAppUrl(WA, 'a\ud83db', false));
  assert.equal(new URL(buildWhatsAppUrl(WA, 'a\ud83db', false)).searchParams.get('text'), 'ab');
});

/* ---------- return page + redirect guard ---------- */

test('hitpay: readPaidQuery is tolerant of a "?" HitPay may append, strict on the values', () => {
  const t = '0123456789abcdef0123456789abcdef';
  assert.deepEqual(readPaidQuery(`?ref=AV-261116-7KQ4&t=${t}`, 'AV'), { ref: 'AV-261116-7KQ4', token: t });
  assert.deepEqual(readPaidQuery(`?ref=AV-261116-7KQ4&t=${t}?reference=abc&status=completed`, 'AV'), { ref: 'AV-261116-7KQ4', token: t });
  assert.equal(readPaidQuery(`?ref=NF-261116-7KQ4&t=${t}`, 'AV'), null, 'other site prefix');
  assert.equal(readPaidQuery('?ref=AV-261116-7KQ4&t=abc', 'AV'), null, 'short token');
  assert.equal(readPaidQuery('', 'AV'), null);
});

test('hitpay: only https://checkout.hit-pay.com may receive the customer', () => {
  assert.equal(isHitpayCheckoutUrl('https://checkout.hit-pay.com/payment-request/@berkat-madinah/9a1b/checkout'), true);
  for (const bad of [
    'http://checkout.hit-pay.com/x',
    'https://securecheckout.hit-pay.com/x',
    'https://checkout.hit-pay.com.evil.example/x',
    'https://evil.example/?https://checkout.hit-pay.com',
    'https://user:pw@checkout.hit-pay.com/x',
    'https://checkout.hit-pay.com:8443/x',
    'javascript:alert(1)',
    '',
    null,
  ]) {
    assert.equal(isHitpayCheckoutUrl(bad), false, String(bad));
  }
});

/* ---------- server price table (build-prices.mjs) ---------- */

test('prices: AV table from the catalogue (ids, not cmsIds); NF = 3 packages; aliases = pack1; states mirror core.ts', async () => {
  const { buildPrices } = await import('./build-prices.mjs');
  const { table } = await buildPrices();
  assert.deepEqual(Object.keys(table.av).sort(), [...SKUS].sort(), 'the 10 AV SKUs');
  assert.equal(table.av['extra-virgin:500'], 10900);
  assert.equal(table.av['organic:250'], 6900);
  assert.equal(table.av['wild-thyme:250'], 7500);
  assert.equal('classic:500' in table.av, false, 'never the cmsId');
  assert.deepEqual(table.nf, { 'noor-fes:pack1': 14900, 'noor-fes:pack2': 24900, 'noor-fes:pack3': 34900 });
  assert.deepEqual(table.packs.nf, { 'noor-fes:pack1': 1, 'noor-fes:pack2': 2, 'noor-fes:pack3': 3 });
  for (const alias of ['noor-fes:500', 'NOORFES-500', 'noor-fes:NOORFES-500']) assert.equal(table.aliases.nf[alias], 'noor-fes:pack1', alias);
  assert.equal(table.names['noor-fes:pack2'].en, 'Noor Fès, 2 bottles (500 ml each)');
  assert.equal(table.names['noor-fes:pack2'].ms, 'Noor Fès, 2 botol (500 ml setiap satu)');
  assert.deepEqual(table.states, [...STATES_MY]);
  assert.equal(table.names['blackseed:250'].en, 'Infused: Blackseed 250 ml');
});

test('prices: the NF site.ts parser reads every package, tolerates formatting, and a changed price fails (B6)', async () => {
  const { parseSitePackages, comparePackages } = await import('./build-prices.mjs');
  const packs = [
    { id: 'pack1', bottles: 1, priceSen: 14900 },
    { id: 'pack2', bottles: 2, priceSen: 24900 },
    { id: 'pack3', bottles: 3, priceSen: 34900 },
  ];
  const tight = "packages: [{id:'pack1',bottles:1,priceRM:149},{id:'pack2',bottles:2,priceRM:249},{id:'pack3',bottles:3,priceRM:349}],";
  const loose = `export const packages = [\n  { "priceRM": 149.00, id: "pack1", bottles: 1 },\n  {\n    id: 'pack2',\n    bottles: 2,\n    priceRM: 249,\n  },\n  { id: \`pack3\`, bottles: 3, priceRM: 349 },\n] as const;`;
  for (const src of [tight, loose]) {
    assert.deepEqual(parseSitePackages(src), [
      { id: 'pack1', bottles: 1, sen: 14900 },
      { id: 'pack2', bottles: 2, sen: 24900 },
      { id: 'pack3', bottles: 3, sen: 34900 },
    ]);
    assert.deepEqual(comparePackages(parseSitePackages(src), packs), []);
  }
  assert.deepEqual(comparePackages(parseSitePackages(tight.replace('249', '250')), packs), ['pack2: site.ts shows 25000 sen, server charges 24900 sen']);
  assert.deepEqual(comparePackages(parseSitePackages(tight.replace("{id:'pack3',bottles:3,priceRM:349}", '')), packs), ['pack3 missing in site.ts']);
  assert.equal(parseSitePackages('const SITE = { priceRM: 149 };'), null, 'no packages array');
  assert.equal(parseSitePackages('mypackages: [1]'), null, 'a longer name is not packages');
});

/* ---------- the cart is gone (B1) ---------- */

test('no cart left: deleted modules stay deleted; the entry button never imports the sheet statically', () => {
  for (const f of ['AddToCart.tsx', 'CartButton.tsx', 'CartDrawer.tsx', 'cartLite.ts', 'store.ts', 'Checkout.tsx', 'OrderRoot.tsx']) {
    assert.equal(existsSync(new URL(`../src/order/${f}`, import.meta.url)), false, f);
  }
  for (const f of ['BuyNowButton.tsx', 'bridge.ts', 'BuyNowRoot.tsx']) {
    const src = readFileSync(new URL(`../src/order/${f}`, import.meta.url), 'utf8');
    assert.doesNotMatch(src, /^import[^;]*['"]\.\/BuyNowSheet['"]/m, `${f} must not import the sheet statically`);
    assert.doesNotMatch(src, /^import[^;]*['"]\.\/(core|payApi|uiStrings|messageStrings|config|drafts|storage)['"]/m, `${f} must stay out of the lazy modules`);
  }
});
