// Run: node --test scripts/order.test.mjs   (Node 24 strips the types of the .ts imports)
// FORGE ORDER-R1: unit tests of the ordering core, the entry-bundle cart helpers and the message strings.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  FIELD_MAX,
  FIELD_ORDER,
  MAX_ORDER_LINES,
  MAX_UNIT_SEN,
  REF_ALPHABET,
  buildMessage,
  buildWhatsAppUrl,
  cleanText,
  computeTotals,
  createOrder,
  fitOrderMessage,
  formatRM,
  isRef,
  lineTotalSen,
  makeRef,
  normalisePhone,
  parseOrder,
  plainChatUrl,
  serializeOrder,
  toSen,
  validateDetails,
} from '../src/order/core.ts';
import {
  EMPTY_CART,
  addLine,
  cartCount,
  clampQty,
  makeSku,
  parseCart,
  serializeCart,
  setLineQty,
} from '../src/order/cartLite.ts';
import { MESSAGE_LABELS, ORDER_NAMES, STATES_MY, sizeLabel } from '../src/order/messageStrings.ts';

const MAX = 24;
const WA = '601111119912';
const TTL = 24 * 60 * 60 * 1000;
const CFG = { whatsapp: WA, maxQty: MAX, deliverySen: null, refPrefix: 'AV', urlCap: 1800, orderTtlMs: TTL };
const REF = 'AV-261112-7KQ4';
const T0 = new Date(Date.UTC(2026, 10, 12, 6, 0, 0)); // 14:00 Malaysia time, 12 Nov 2026

const catalogue = JSON.parse(readFileSync(new URL('../src/data/catalogue.json', import.meta.url), 'utf8'));
/** The 10 SKUs in catalogue order. */
const SKUS = catalogue.products.flatMap((p) => p.sizes.map((s) => makeSku(p.id, s)));
/** Test prices in sen (fixed here on purpose: the core never reads storeFacts). */
const PRICE = { 'extra-virgin:250': 5900, 'extra-virgin:500': 10900, 'organic:250': 6900, 'organic:500': 12900 };
const priceOf = (sku) => PRICE[sku] ?? 7500;

const line = (sku, qty, lang = 'en') => {
  const [id, size] = sku.split(':');
  return { sku, name: ORDER_NAMES[lang][id], sizeLabel: sizeLabel(size), qty, unitSen: priceOf(sku) };
};
const allLines = (qty, lang = 'en') => SKUS.map((sku) => line(sku, qty, lang));

const details = (over = {}) => ({
  name: 'Aisyah Rahman',
  phone: '60182059925',
  address: '12, Jalan Bukit 3, Taman Mewah',
  postcode: '43000',
  city: 'Kajang',
  state: 'Selangor',
  note: '',
  ...over,
});

const order = (over = {}) => ({
  ...createOrder({
    lines: [line('extra-virgin:500', 2), line('blackseed:250', 1)],
    details: details(),
    lang: 'en',
    payMode: 'chat',
    cfg: CFG,
    now: T0,
    keepRef: REF,
  }),
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
  assert.equal(Object.keys(MESSAGE_LABELS.en).length, 13);
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

test('totals: line total, subtotal, delivery null is left out of the total', () => {
  assert.equal(lineTotalSen({ qty: 2, unitSen: 10900 }), 21800);
  const lines = [line('extra-virgin:500', 2), line('blackseed:250', 1)];
  assert.deepEqual(computeTotals(lines, null), { subtotalSen: 29300, deliverySen: null, totalSen: 29300 });
  assert.deepEqual(computeTotals(lines, 0), { subtotalSen: 29300, deliverySen: 0, totalSen: 29300 });
  assert.deepEqual(computeTotals(lines, 800), { subtotalSen: 29300, deliverySen: 800, totalSen: 30100 });
  assert.deepEqual(computeTotals([], null), { subtotalSen: 0, deliverySen: null, totalSen: 0 });
  assert.equal(computeTotals(allLines(MAX), null).totalSen, 1958400, 'all 10 SKUs at the cap');
  assert.equal(computeTotals([{ qty: 3, unitSen: toSen('0.10') }], toSen('0.20')).totalSen, 50, 'no float drift');
});

/* ---------- cartLite ---------- */

test('cart qty clamp: integer in 0..max', () => {
  assert.equal(clampQty(0, MAX), 0);
  assert.equal(clampQty(1, MAX), 1);
  assert.equal(clampQty(MAX, MAX), MAX);
  assert.equal(clampQty(MAX + 5, MAX), MAX);
  assert.equal(clampQty(-3, MAX), 0);
  assert.equal(clampQty(1.9, MAX), 1);
  assert.equal(clampQty('7', MAX), 7);
  assert.equal(clampQty(' 12 ', MAX), 12);
  assert.equal(clampQty('999', MAX), MAX);
  for (const bad of [NaN, Infinity, '', '   ', 'abc', null, undefined, {}, true]) assert.equal(clampQty(bad, MAX), 0, String(bad));
});

test('parseCart: merges duplicates, clamps, keeps catalogue order, counts dropped SKUs (O-9)', () => {
  const raw = JSON.stringify({
    lines: [
      { sku: 'blackseed:250', qty: 2 },
      { sku: 'extra-virgin:500', qty: 1 },
      { sku: 'discontinued:250', qty: 1 },
      { sku: 'blackseed:250', qty: 30 },
      { sku: 'organic:250', qty: 99 },
    ],
  });
  assert.deepEqual(parseCart(raw, SKUS, MAX), {
    cart: {
      lines: [
        { sku: 'extra-virgin:500', qty: 1 },
        { sku: 'organic:250', qty: MAX },
        { sku: 'blackseed:250', qty: MAX },
      ],
    },
    dropped: 1,
  });
  const two = JSON.stringify({ lines: [{ sku: 'gone:1', qty: 1 }, { sku: 'gone:2', qty: 3 }] });
  assert.deepEqual(parseCart(two, SKUS, MAX), { cart: EMPTY_CART, dropped: 2 });
  // A SKU that lost its price is simply not in validSkus any more.
  const noPrice = SKUS.filter((s) => s !== 'organic:500');
  const had = JSON.stringify({ lines: [{ sku: 'organic:500', qty: 2 }, { sku: 'wild-thyme:250', qty: 1 }] });
  assert.deepEqual(parseCart(had, SKUS, MAX), { cart: { lines: [{ sku: 'organic:500', qty: 2 }, { sku: 'wild-thyme:250', qty: 1 }] }, dropped: 0 });
  assert.deepEqual(parseCart(had, noPrice, MAX), { cart: { lines: [{ sku: 'wild-thyme:250', qty: 1 }] }, dropped: 1 });
});

test('parseCart: bad quantities drop the line; the same line with a good quantity is kept', () => {
  const one = (qty) => parseCart(JSON.stringify({ lines: [{ sku: 'blackseed:250', qty }] }), SKUS, MAX);
  assert.deepEqual(one(3), { cart: { lines: [{ sku: 'blackseed:250', qty: 3 }] }, dropped: 0 }, 'control');
  for (const bad of [0, -1, 1.5, '3', null, undefined, true, {}]) {
    assert.deepEqual(one(bad), { cart: EMPTY_CART, dropped: 0 }, String(bad));
  }
});

test('parseCart: corrupted storage is an empty cart and never throws', () => {
  assert.deepEqual(parseCart('{"lines":[{"sku":"extra-virgin:500","qty":2}]}', SKUS, MAX).cart, { lines: [{ sku: 'extra-virgin:500', qty: 2 }] }, 'control');
  for (const bad of [null, undefined, '', '{', 'not json', 'null', '[]', '3', '"x"', '{}', '{"lines":null}', '{"lines":{}}', '{"lines":"x"}', '{"qty":3}', '{"lines":[null,3,"x",[],{}]}', '{"lines":[{"sku":5,"qty":1}]}']) {
    assert.doesNotThrow(() => parseCart(bad, SKUS, MAX));
    assert.deepEqual(parseCart(bad, SKUS, MAX), { cart: EMPTY_CART, dropped: 0 }, String(bad));
  }
});

test('serializeCart: round trip', () => {
  const cart = { lines: [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'fennel-anise:250', qty: 5 }] };
  assert.equal(serializeCart(cart), '{"lines":[{"sku":"extra-virgin:250","qty":2},{"sku":"fennel-anise:250","qty":5}]}');
  assert.deepEqual(parseCart(serializeCart(cart), SKUS, MAX), { cart, dropped: 0 });
  assert.equal(cartCount(cart), 7);
  assert.equal(cartCount(EMPTY_CART), 0);
  assert.equal(makeSku('extra-virgin', '500'), 'extra-virgin:500');
});

test('addLine: added, merged, capped at the per-line maximum, invalid', () => {
  const first = addLine(EMPTY_CART, 'blackseed:250', 1, SKUS, MAX);
  assert.deepEqual(first, { cart: { lines: [{ sku: 'blackseed:250', qty: 1 }] }, result: 'added' });
  const second = addLine(first.cart, 'extra-virgin:250', 2, SKUS, MAX);
  assert.equal(second.result, 'added');
  assert.deepEqual(second.cart.lines, [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }], 'catalogue order, not click order');
  const merged = addLine(second.cart, 'blackseed:250', 3, SKUS, MAX);
  assert.deepEqual(merged.cart.lines[1], { sku: 'blackseed:250', qty: 4 });
  assert.deepEqual(first.cart.lines, [{ sku: 'blackseed:250', qty: 1 }], 'the cart passed in is not changed');

  const near = { lines: [{ sku: 'blackseed:250', qty: 23 }] };
  assert.deepEqual(addLine(near, 'blackseed:250', 1, SKUS, MAX), { cart: { lines: [{ sku: 'blackseed:250', qty: MAX }] }, result: 'added' }, 'control: reaching the cap exactly is a plain add');
  assert.deepEqual(addLine(near, 'blackseed:250', 5, SKUS, MAX), { cart: { lines: [{ sku: 'blackseed:250', qty: MAX }] }, result: 'capped' });
  const full = { lines: [{ sku: 'blackseed:250', qty: MAX }] };
  const again = addLine(full, 'blackseed:250', 1, SKUS, MAX);
  assert.equal(again.result, 'capped');
  assert.equal(again.cart, full, 'nothing changed');
  // All 10 SKUs fit in one cart (O-4: no line cap).
  let cart = EMPTY_CART;
  for (const sku of [...SKUS].reverse()) cart = addLine(cart, sku, MAX, SKUS, MAX).cart;
  assert.deepEqual(cart.lines.map((l) => l.sku), SKUS);
  assert.equal(cartCount(cart), 240);

  for (const [sku, qty] of [['nope:250', 1], ['extra-virgin:750', 1], ['blackseed:250', 0], ['blackseed:250', -2], ['blackseed:250', NaN]]) {
    const r = addLine(first.cart, sku, qty, SKUS, MAX);
    assert.equal(r.result, 'invalid', `${sku} x ${qty}`);
    assert.equal(r.cart, first.cart);
  }
});

test('setLineQty: sets, clamps, 0 removes, unknown SKU changes nothing', () => {
  const cart = { lines: [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }] };
  assert.deepEqual(setLineQty(cart, 'blackseed:250', 5, SKUS, MAX).lines, [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 5 }]);
  assert.deepEqual(setLineQty(cart, 'blackseed:250', 99, SKUS, MAX).lines[1], { sku: 'blackseed:250', qty: MAX });
  assert.deepEqual(setLineQty(cart, 'blackseed:250', 0, SKUS, MAX), { lines: [{ sku: 'extra-virgin:250', qty: 2 }] });
  assert.deepEqual(setLineQty(cart, 'blackseed:250', -4, SKUS, MAX), { lines: [{ sku: 'extra-virgin:250', qty: 2 }] });
  assert.equal(setLineQty({ lines: [{ sku: 'blackseed:250', qty: 1 }] }, 'blackseed:250', 0, SKUS, MAX), EMPTY_CART);
  assert.deepEqual(setLineQty(cart, 'organic:500', 3, SKUS, MAX).lines.map((l) => l.sku), ['extra-virgin:250', 'organic:500', 'blackseed:250'], 'a valid SKU not yet in the cart is added in catalogue order');
  assert.equal(setLineQty(cart, 'nope:250', 3, SKUS, MAX), cart);
  assert.deepEqual(cart.lines, [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }], 'the cart passed in is not changed');
});

/* ---------- details ---------- */

test('validateDetails: a good form passes, phone normalised, text cleaned', () => {
  const r = validateDetails(
    { name: '  Aisyah   Rahman ', phone: '018-205 9925', address: ' 12, Jalan Bukit 3 \r\n\r\n Taman Mewah ', postcode: ' 43000 ', city: ' Kajang ', state: 'Selangor', note: '  ' },
    STATES_MY
  );
  assert.deepEqual(r, {
    ok: true,
    details: { name: 'Aisyah Rahman', phone: '60182059925', address: '12, Jalan Bukit 3 Taman Mewah', postcode: '43000', city: 'Kajang', state: 'Selangor', note: '' },
  });
  assert.equal(validateDetails(details({ note: undefined }), STATES_MY).ok, true, 'the note is optional');
  for (const state of STATES_MY) assert.equal(validateDetails(details({ state }), STATES_MY).ok, true, state);
});

test('validateDetails: empty form reports every required field, the note is not one', () => {
  for (const empty of [{}, { name: ' \t ', phone: '  ', address: '\n\n', postcode: '', city: '   ', state: '', note: '' }]) {
    assert.deepEqual(validateDetails(empty, STATES_MY), {
      ok: false,
      errors: { name: 'required', phone: 'required', address: 'required', postcode: 'required', city: 'required', state: 'required' },
    });
  }
  assert.deepEqual(FIELD_ORDER, ['name', 'phone', 'address', 'postcode', 'city', 'state', 'note']);
});

test('validateDetails: invalid phone, postcode and state each get their own code', () => {
  assert.equal(validateDetails(details(), STATES_MY).ok, true, 'control');
  assert.deepEqual(validateDetails(details({ phone: '03-1234 5678', postcode: '4300', state: 'Atlantis' }), STATES_MY), {
    ok: false,
    errors: { phone: 'phone', postcode: 'postcode', state: 'state' },
  });
  for (const ok of ['43000', '01000', ' 50450 ', '98000']) assert.equal(validateDetails(details({ postcode: ok }), STATES_MY).ok, true, ok);
  for (const bad of ['4300', '430000', '43 000', '4300a', 'abcde', '43-000', '４３００', '٤٣٠٠٠٠']) {
    assert.deepEqual(validateDetails(details({ postcode: bad }), STATES_MY), { ok: false, errors: { postcode: 'postcode' } }, bad);
  }
  assert.deepEqual(validateDetails(details({ state: 'selangor' }), STATES_MY), { ok: false, errors: { state: 'state' } }, 'state is matched exactly');
});

test('validateDetails: a field at its max length passes, one character more is tooLong (never cut silently)', () => {
  assert.deepEqual(FIELD_MAX, { name: 60, phone: 20, address: 160, postcode: 5, city: 40, state: 40, note: 200 });
  for (const field of ['name', 'address', 'city', 'note']) {
    const max = FIELD_MAX[field];
    const at = validateDetails(details({ [field]: 'x'.repeat(max) }), STATES_MY);
    assert.equal(at.ok, true, `${field} at ${max}`);
    assert.equal(at.details[field].length, max);
    assert.deepEqual(validateDetails(details({ [field]: 'x'.repeat(max + 1) }), STATES_MY), { ok: false, errors: { [field]: 'tooLong' } }, `${field} at ${max + 1}`);
    // Padding does not count: the length is measured after cleaning.
    assert.equal(validateDetails(details({ [field]: `   ${'x'.repeat(max)}   ` }), STATES_MY).ok, true, `${field} padded`);
  }
});

test('validateDetails: direction overrides and half emoji never reach the details', () => {
  const half = '\ud83d';
  const d = valid({ name: `‮Aisyah${half}‬`, address: `${half}شارع 12⁧`, note: `‭ok${half}` });
  assert.equal(d.name, 'Aisyah');
  assert.equal(d.address, 'شارع 12');
  assert.equal(d.note, 'ok');
});

/* ---------- order reference ---------- */

test('order ref: shape and charset', () => {
  assert.equal(REF_ALPHABET.length, 32);
  assert.equal(new Set(REF_ALPHABET).size, 32);
  for (const banned of ['I', 'O', '0', '1']) assert.equal(REF_ALPHABET.includes(banned), false, banned);

  const day = new Date(Date.UTC(2026, 10, 12, 1, 30)); // 09:30 Malaysia time
  const bytes = (...b) => () => new Uint8Array(b);
  assert.equal(makeRef('AV', day, bytes(0, 1, 2, 3)), 'AV-261112-ABCD');
  assert.equal(makeRef('AV', day, bytes(9, 6, 22, 30)), 'AV-261112-KGY8');
  assert.equal(makeRef('AV', day, bytes(255, 31, 32, 63)), 'AV-261112-99A9');
  assert.equal(makeRef('AV', new Date(Date.UTC(2027, 0, 5, 4)), bytes(0, 0, 0, 0)), 'AV-270105-AAAA');
  let asked = 0;
  makeRef('AV', day, (n) => ((asked = n), new Uint8Array(n)));
  assert.equal(asked, 4);

  const seen = new Set();
  for (let i = 0; i < 2000; i++) {
    const ref = makeRef('AV', day);
    assert.match(ref, /^AV-261112-[ABCDEFGHJKLMNPQRSTUVWXYZ2-9]{4}$/);
    assert.equal(isRef(ref, 'AV'), true);
    seen.add(ref);
  }
  assert.ok(seen.size > 1900, 'references are random');
});

test('isRef: refuses anything else found in storage', () => {
  assert.equal(isRef(REF, 'AV'), true, 'control');
  for (const bad of ['', 'AV-261112-7KQ', 'AV-261112-7KQI', 'AV-261112-7kq4', 'AV-26111-7KQ4', 'AV-261112-7KQ40', 'NF-261112-7KQ4', 'XAV-261112-7KQ4', ' AV-261112-7KQ4', null, undefined, 5, {}]) {
    assert.equal(isRef(bad, 'AV'), false, String(bad));
  }
  assert.equal(isRef('NF-261112-7KQ4', 'NF'), true, 'the prefix comes from config');
});

/* ---------- message ---------- */

test('message EN, chat mode: exact text, no note, no paid line', () => {
  assert.equal(
    buildMessage(order(), MESSAGE_LABELS.en),
    [
      'New order AV-261112-7KQ4',
      '1. Extra Virgin 500 ml x 2 = RM 218.00',
      '2. Infused: Blackseed 250 ml x 1 = RM 75.00',
      'Subtotal: RM 293.00',
      'Delivery: to be confirmed',
      'Total: RM 293.00',
      'Payment: to be arranged on WhatsApp',
      'Name: Aisyah Rahman',
      'Phone: +60182059925',
      'Address: 12, Jalan Bukit 3, Taman Mewah, 43000 Kajang, Selangor',
    ].join('\n')
  );
});

test('message EN, transfer mode: exact text, with a note and a delivery fee, ends with the paid line', () => {
  const o = order({ payMode: 'transfer', deliverySen: 800, details: details({ note: 'Leave with the guard' }) });
  assert.equal(
    buildMessage(o, MESSAGE_LABELS.en),
    [
      'New order AV-261112-7KQ4',
      '1. Extra Virgin 500 ml x 2 = RM 218.00',
      '2. Infused: Blackseed 250 ml x 1 = RM 75.00',
      'Subtotal: RM 293.00',
      'Delivery: RM 8.00',
      'Total: RM 301.00',
      "Payment: Touch 'n Go / DuitNow",
      'Name: Aisyah Rahman',
      'Phone: +60182059925',
      'Address: 12, Jalan Bukit 3, Taman Mewah, 43000 Kajang, Selangor',
      'Note: Leave with the guard',
      'I have paid, receipt follows.',
    ].join('\n')
  );
});

const msOrder = (over = {}) =>
  order({ lang: 'ms', lines: [line('extra-virgin:500', 2, 'ms'), line('blackseed:250', 1, 'ms')], ...over });

test('message MS, chat mode: exact text, with a note, no paid line', () => {
  const o = msOrder({ details: details({ note: 'Tinggalkan di pondok pengawal' }) });
  assert.equal(
    buildMessage(o, MESSAGE_LABELS.ms),
    [
      'Pesanan baharu AV-261112-7KQ4',
      '1. Extra Virgin 500 ml x 2 = RM 218.00',
      '2. Infusi: Habbatus Sauda 250 ml x 1 = RM 75.00',
      'Jumlah kecil: RM 293.00',
      'Penghantaran: akan disahkan',
      'Jumlah: RM 293.00',
      'Bayaran: akan diatur melalui WhatsApp',
      'Nama: Aisyah Rahman',
      'Telefon: +60182059925',
      'Alamat: 12, Jalan Bukit 3, Taman Mewah, 43000 Kajang, Selangor',
      'Nota: Tinggalkan di pondok pengawal',
    ].join('\n')
  );
});

test('message MS, transfer mode: exact text, no note, delivery 0, ends with the paid line', () => {
  assert.equal(
    buildMessage(msOrder({ payMode: 'transfer', deliverySen: 0 }), MESSAGE_LABELS.ms),
    [
      'Pesanan baharu AV-261112-7KQ4',
      '1. Extra Virgin 500 ml x 2 = RM 218.00',
      '2. Infusi: Habbatus Sauda 250 ml x 1 = RM 75.00',
      'Jumlah kecil: RM 293.00',
      'Penghantaran: RM 0.00',
      'Jumlah: RM 293.00',
      "Bayaran: Touch 'n Go / DuitNow",
      'Nama: Aisyah Rahman',
      'Telefon: +60182059925',
      'Alamat: 12, Jalan Bukit 3, Taman Mewah, 43000 Kajang, Selangor',
      'Saya sudah bayar, resit akan dihantar.',
    ].join('\n')
  );
});

test('message: all 10 SKUs in one order (O-4), numbered in catalogue order', () => {
  for (const lang of ['en', 'ms']) {
    const msg = buildMessage(order({ lang, lines: allLines(MAX, lang) }), MESSAGE_LABELS[lang]);
    const rows = msg.split('\n');
    assert.equal(rows.length, 1 + 10 + 7, lang);
    assert.equal(rows[1], '1. Extra Virgin 250 ml x 24 = RM 1416.00');
    assert.equal(rows[2], '2. Extra Virgin 500 ml x 24 = RM 2616.00');
    assert.equal(rows[10], lang === 'en' ? '10. Infused: Wild Thyme 250 ml x 24 = RM 1800.00' : '10. Infusi: Timi Liar 250 ml x 24 = RM 1800.00');
    assert.equal(rows[13], `${MESSAGE_LABELS[lang].total}: RM 19584.00`);
    assert.doesNotMatch(msg, /[–—]/);
    assert.doesNotMatch(msg, /undefined|null|NaN/);
  }
});

test('message: built from the order alone (O-6): its own names and prices, whatever the catalogue says today', () => {
  const frozen = order({ lines: [{ sku: 'extra-virgin:500', name: 'Old Name', sizeLabel: '500 ml', qty: 2, unitSen: 9900 }] });
  const rows = buildMessage(frozen, MESSAGE_LABELS[frozen.lang]).split('\n');
  assert.equal(rows[1], '1. Old Name 500 ml x 2 = RM 198.00');
  assert.equal(rows[2], 'Subtotal: RM 198.00');
  assert.equal(buildMessage(frozen, MESSAGE_LABELS[frozen.lang]), buildMessage(parseOrder(serializeOrder(frozen), T0.getTime(), CFG, STATES_MY), MESSAGE_LABELS.en));
});

/* ---------- WhatsApp URL ---------- */

test('WhatsApp URL: phone and desktop forms, plain chat link', () => {
  assert.equal(buildWhatsAppUrl(WA, 'hi', false), 'https://wa.me/601111119912?text=hi');
  assert.equal(buildWhatsAppUrl(WA, 'hi', true), 'https://web.whatsapp.com/send?phone=601111119912&text=hi');
  assert.equal(buildWhatsAppUrl('+60 11-1111 9912', 'hi', false), 'https://wa.me/601111119912?text=hi');
  assert.equal(plainChatUrl(WA, false), 'https://wa.me/601111119912');
  assert.equal(plainChatUrl(WA, true), 'https://web.whatsapp.com/send?phone=601111119912');
  assert.ok(buildWhatsAppUrl(WA, 'x'.repeat(50), true).length > buildWhatsAppUrl(WA, 'x'.repeat(50), false).length, 'the desktop form is the longer one');
});

test("WhatsApp URL: the message survives the round trip with & # ' emoji", () => {
  const d = valid({
    name: 'Tan & Sons #1 <b>',
    phone: '018-205 9925',
    address: 'Lot 5 & 6, #12-03 Menara A+B, Jalan P. Ramlee 100% 😀🫒 ?x=1&y=2 %20 "quoted"',
    city: "Mak Cik's Town",
    note: "Call first 📞 & ring bell #2, it's = ok?",
  });
  for (const payMode of ['chat', 'transfer']) {
    const msg = buildMessage(order({ details: d, payMode, lines: allLines(1) }), MESSAGE_LABELS.en);
    assert.ok(msg.includes('Address: Lot 5 & 6, #12-03 Menara A+B, Jalan P. Ramlee 100% 😀🫒 ?x=1&y=2 %20 "quoted", 43000 Mak Cik\'s Town, Selangor'));
    for (const desktop of [false, true]) {
      const url = buildWhatsAppUrl(WA, msg, desktop);
      const u = new URL(url);
      assert.equal(u.searchParams.get('text'), msg, 'URL parser reads the same text back');
      assert.equal(u.hash, '', 'a # does not start a fragment');
      assert.equal([...u.searchParams.keys()].length, desktop ? 2 : 1, 'an & does not add a parameter');
      const raw = url.slice(url.indexOf('text=') + 5);
      assert.equal(decodeURIComponent(raw), msg, 'decodeURIComponent reads the same text back');
      assert.doesNotMatch(raw, /[\s&#+"<>']/, 'nothing unsafe is left raw in the URL');
      assert.equal(u.href, url, 'the browser does not re-encode anything: the href it opens is this exact URL');
      if (desktop) assert.equal(u.searchParams.get('phone'), WA);
      else assert.equal(u.pathname, `/${WA}`);
    }
  }
});

test('WhatsApp URL: half an emoji never throws and never reaches the URL', () => {
  const half = '\ud83d';
  assert.doesNotThrow(() => buildWhatsAppUrl(WA, `x${half}`, false));
  assert.equal(buildWhatsAppUrl(WA, `x${half}y`, false), 'https://wa.me/601111119912?text=xy');
  const tampered = order({ details: details({ name: `Tan${half}` }) });
  const msg = buildMessage(tampered, MESSAGE_LABELS.en);
  assert.ok(msg.includes('Name: Tan\n'));
  assert.doesNotThrow(() => encodeURIComponent(msg));
});

/* ---------- URL cap (O-5) ---------- */

const urlLen = (message) => buildWhatsAppUrl(WA, message, true).length;
const NOTE_ZH = '請'.repeat(FIELD_MAX.note);
const NOTE_TA = 'த'.repeat(FIELD_MAX.note);

test('URL cap: an ordinary order is not shortened', () => {
  const o = order({ details: details({ note: 'Leave with the guard' }) });
  assert.deepEqual(fitOrderMessage(o, MESSAGE_LABELS.en, CFG), { message: buildMessage(o, MESSAGE_LABELS.en), fits: true });
});

test('URL cap: all 10 SKUs at 24 with a usual address and note fit whole in both languages and pay modes', () => {
  for (const lang of ['en', 'ms']) {
    for (const payMode of ['chat', 'transfer']) {
      const d = valid({ address: 'No. 12-3A, Jalan Bukit Bintang 3/4, Taman Mewah Jaya', city: 'Petaling Jaya', note: 'Sila hubungi sebelum hantar' });
      const o = order({ lang, payMode, lines: allLines(MAX, lang), details: d });
      const r = fitOrderMessage(o, MESSAGE_LABELS[lang], CFG);
      assert.deepEqual(r, { message: buildMessage(o, MESSAGE_LABELS[lang]), fits: true }, `${lang} ${payMode}`);
      assert.ok(urlLen(r.message) <= CFG.urlCap);
    }
  }
});

for (const [script, ch, note] of [['Chinese', '路', NOTE_ZH], ['Tamil', 'த', NOTE_TA]]) {
  test(`URL cap: ${script} address at max length, all 10 SKUs at 24: does not fit, the full uncut message comes back`, () => {
    for (const lang of ['en', 'ms']) {
      const d = valid({ name: ch.repeat(FIELD_MAX.name), address: ch.repeat(FIELD_MAX.address), city: ch.repeat(FIELD_MAX.city), note });
      const o = order({ lang, lines: allLines(MAX, lang), details: d });
      const full = buildMessage(o, MESSAGE_LABELS[lang]);
      const r = fitOrderMessage(o, MESSAGE_LABELS[lang], CFG);
      assert.equal(r.fits, false);
      assert.equal(r.message, full, 'nothing is cut when the copy flow takes over');
      assert.ok(r.message.includes(`${MESSAGE_LABELS[lang].name}: ${ch.repeat(60)}\n`), 'name whole');
      assert.ok(r.message.includes(`${MESSAGE_LABELS[lang].address}: ${ch.repeat(160)}, 43000 ${ch.repeat(40)}, Selangor`), 'address and city whole');
      assert.ok(r.message.includes(`${MESSAGE_LABELS[lang].note}: ${note}`), 'note whole');
      assert.ok(urlLen(r.message) > CFG.urlCap);
      // Same order, no note at all: still too long, still returned whole.
      const bare = { ...o, details: { ...d, note: '' } };
      assert.deepEqual(fitOrderMessage(bare, MESSAGE_LABELS[lang], CFG), { message: buildMessage(bare, MESSAGE_LABELS[lang]), fits: false });
      // Control: the same order with a short address and no note fits.
      const short = { ...o, details: valid({ name: ch.repeat(4), address: ch.repeat(12), city: ch.repeat(3) }) };
      assert.equal(fitOrderMessage(short, MESSAGE_LABELS[lang], CFG).fits, true);
    }
  });

  test(`URL cap: ${script} address, all 10 SKUs at 24: only the note is shortened, name, address and city never`, () => {
    for (const lang of ['en', 'ms']) {
      for (const payMode of ['chat', 'transfer']) {
        const d = valid({ name: ch.repeat(4), address: ch.repeat(20), city: ch.repeat(3), note });
        const o = order({ lang, payMode, lines: allLines(MAX, lang), details: d });
        const L = MESSAGE_LABELS[lang];
        assert.ok(urlLen(buildMessage(o, L)) > CFG.urlCap, 'the uncut message is too long');
        const r = fitOrderMessage(o, L, CFG);
        assert.equal(r.fits, true);
        for (const desktop of [true, false]) {
          const url = buildWhatsAppUrl(WA, r.message, desktop);
          assert.ok(url.length <= CFG.urlCap, `${url.length} characters`);
          assert.equal(new URL(url).searchParams.get('text'), r.message, 'the text reads back the same');
        }
        const rows = r.message.split('\n');
        const noteRow = rows.find((row) => row.startsWith(`${L.note}: `));
        assert.ok(noteRow && noteRow.endsWith('...'), 'note cut and marked');
        const kept = noteRow.slice(L.note.length + 2, -3);
        assert.ok(kept.length >= 1 && kept.length < 200 && note.startsWith(kept), 'the note keeps its beginning');
        // Everything else is the uncut message, line for line.
        const uncut = buildMessage(o, L).split('\n');
        assert.equal(rows.length, uncut.length);
        rows.forEach((row, i) => {
          if (row !== noteRow) assert.equal(row, uncut[i], `line ${i + 1}`);
        });
        assert.ok(r.message.includes(`${L.name}: ${ch.repeat(4)}\n`));
        assert.ok(r.message.includes(`${L.address}: ${ch.repeat(20)}, 43000 ${ch.repeat(3)}, Selangor`));
        assert.equal(rows.at(-1), payMode === 'transfer' ? L.paid : noteRow, 'last line kept');
        // The longest note that fits was chosen: one more character would pass the cap.
        const longer = buildMessage({ ...o, details: { ...d, note: `${note.slice(0, kept.length + 1)}...` } }, L);
        assert.ok(urlLen(longer) > CFG.urlCap, 'no room was wasted');
      }
    }
  });
}

test('URL cap: when even the marker does not fit, the note line is dropped whole and the rest is untouched', () => {
  const d = valid({ note: NOTE_ZH });
  const o = order({ lines: allLines(MAX), details: d });
  const noNote = buildMessage({ ...o, details: { ...d, note: '' } }, MESSAGE_LABELS.en);
  // 12 URL characters of room: "\nNote: 請..." needs more than that.
  const cfg = { ...CFG, urlCap: urlLen(noNote) + 12 };
  const r = fitOrderMessage(o, MESSAGE_LABELS.en, cfg);
  assert.deepEqual(r, { message: noNote, fits: true });
  assert.doesNotMatch(r.message, /Note:/);
  assert.ok(r.message.includes('Address: 12, Jalan Bukit 3, Taman Mewah, 43000 Kajang, Selangor'));
  // Control: with room for the marker and one character, the note line is back.
  const roomy = fitOrderMessage(o, MESSAGE_LABELS.en, { ...CFG, urlCap: urlLen(noNote) + 40 });
  assert.equal(roomy.fits, true);
  assert.match(roomy.message, /\nNote: 請+\.\.\.$/);
  // One character less than the note-free message: nothing fits, the full message comes back.
  assert.deepEqual(fitOrderMessage(o, MESSAGE_LABELS.en, { ...CFG, urlCap: urlLen(noNote) - 1 }), { message: buildMessage(o, MESSAGE_LABELS.en), fits: false });
});

test('URL cap: how long a Chinese or Tamil address can be before the copy flow takes over (pinned)', (t) => {
  // Short name and city, no note, chat mode, EN. Each such character costs 9 URL characters.
  const longest = (lines) => {
    let n = 0;
    while (n < FIELD_MAX.address) {
      const o = order({ lines, details: valid({ name: '陳美玲', address: '路'.repeat(n + 1), city: '怡保' }) });
      if (!fitOrderMessage(o, MESSAGE_LABELS.en, CFG).fits) break;
      n += 1;
    }
    return n;
  };
  const one = longest([line('extra-virgin:500', 1)]);
  const ten = longest(allLines(MAX));
  t.diagnostic(`longest fitting CJK address: ${one} characters with 1 line, ${ten} with all 10 lines (field max ${FIELD_MAX.address})`);
  assert.ok(ten < one && one < FIELD_MAX.address, 'a max-length address in such a script never fits, even with one line');
  assert.deepEqual({ one, ten }, { one: 154, ten: 75 });
});

test('URL cap: an emoji note is never cut in half', () => {
  const d = valid({ note: '📞'.repeat(100) });
  const r = fitOrderMessage(order({ lines: allLines(MAX), details: d }), MESSAGE_LABELS.en, CFG);
  assert.equal(r.fits, true);
  assert.match(r.message, /\nNote: (?:📞)+\.\.\.$/u);
  assert.equal(new URL(buildWhatsAppUrl(WA, r.message, true)).searchParams.get('text'), r.message);
});

test('URL cap: the cap comes from config', () => {
  const o = order({ details: details({ note: 'Leave with the guard' }) });
  const full = buildMessage(o, MESSAGE_LABELS.en);
  assert.deepEqual(fitOrderMessage(o, MESSAGE_LABELS.en, { ...CFG, urlCap: urlLen(full) }), { message: full, fits: true }, 'exactly at the cap fits');
  const tight = fitOrderMessage(o, MESSAGE_LABELS.en, { ...CFG, urlCap: urlLen(full) - 1 });
  assert.equal(tight.fits, true);
  assert.notEqual(tight.message, full);
  assert.deepEqual(fitOrderMessage(o, MESSAGE_LABELS.en, { ...CFG, urlCap: 100 }), { message: full, fits: false });
});

/* ---------- order snapshot ---------- */

test('createOrder: exactly the agreed shape, step 2, values copied', () => {
  const lines = [line('extra-virgin:500', 2), line('blackseed:250', 1)];
  const d = details();
  const o = createOrder({ lines, details: d, lang: 'ms', payMode: 'transfer', cfg: { ...CFG, deliverySen: 800 }, now: T0 });
  assert.deepEqual(Object.keys(o).sort(), ['createdAt', 'deliverySen', 'details', 'lang', 'lines', 'payMode', 'ref', 'step']);
  assert.match(o.ref, /^AV-261112-[ABCDEFGHJKLMNPQRSTUVWXYZ2-9]{4}$/);
  assert.equal(o.step, 2);
  assert.equal(o.lang, 'ms');
  assert.equal(o.payMode, 'transfer');
  assert.equal(o.deliverySen, 800);
  assert.equal(o.createdAt, T0.getTime());
  assert.deepEqual(o.lines, lines);
  assert.deepEqual(o.details, d);
  lines[0].qty = 9;
  lines[0].unitSen = 1;
  d.name = 'Changed later';
  assert.equal(o.lines[0].qty, 2, 'lines are copied, not shared');
  assert.equal(o.lines[0].unitSen, 10900, 'a later price change does not reach the order');
  assert.equal(o.details.name, 'Aisyah Rahman', 'details are copied, not shared');
});

test('createOrder: keepRef keeps the reference when valid, otherwise a new one is made', () => {
  const make = (keepRef, now = T0) => createOrder({ lines: [line('blackseed:250', 1)], details: details(), lang: 'en', payMode: 'chat', cfg: CFG, now, keepRef });
  assert.equal(make(REF).ref, REF);
  const later = make(REF, new Date(T0.getTime() + 90_000));
  assert.equal(later.ref, REF);
  assert.equal(later.createdAt, T0.getTime() + 90_000, 'frozen again at the new time');
  for (const bad of [undefined, '', 'NF-261112-7KQ4', 'AV-261112-7KQI', 'javascript:alert(1)']) {
    const ref = make(bad).ref;
    assert.notEqual(ref, bad);
    assert.equal(isRef(ref, 'AV'), true, String(bad));
  }
});

test('order snapshot: restore gives back the same order at every step, language and pay mode', () => {
  const now = T0.getTime() + 3 * 60 * 60 * 1000;
  for (const step of [1, 2, 3]) {
    for (const lang of ['en', 'ms']) {
      for (const payMode of ['chat', 'transfer']) {
        const o = order({ step, lang, payMode, lines: allLines(MAX, lang), deliverySen: payMode === 'chat' ? null : 800, details: valid({ note: 'Ring twice 😀', address: '路 12, தெரு 3' }) });
        assert.deepEqual(parseOrder(serializeOrder(o), now, CFG, STATES_MY), o);
      }
    }
  }
});

test('order snapshot: unknown keys are dropped', () => {
  const o = order();
  const extra = {
    ...o,
    injected: '<script>',
    __proto__x: 1,
    details: { ...o.details, extra: 1 },
    lines: o.lines.map((l) => ({ ...l, discount: 100 })),
  };
  assert.deepEqual(parseOrder(JSON.stringify(extra), T0.getTime(), CFG, STATES_MY), o);
});

test('order snapshot: expires at 24 hours, refuses a date more than 5 minutes ahead', () => {
  const raw = serializeOrder(order());
  const t = T0.getTime();
  assert.notEqual(parseOrder(raw, t, CFG, STATES_MY), null);
  assert.notEqual(parseOrder(raw, t + TTL - 1, CFG, STATES_MY), null);
  assert.equal(parseOrder(raw, t + TTL, CFG, STATES_MY), null);
  assert.equal(parseOrder(raw, t + 3 * TTL, CFG, STATES_MY), null);
  assert.notEqual(parseOrder(raw, t - 60_000, CFG, STATES_MY), null, 'a clock one minute behind is tolerated');
  assert.notEqual(parseOrder(raw, t - 5 * 60_000, CFG, STATES_MY), null, 'exactly 5 minutes ahead is tolerated');
  assert.equal(parseOrder(raw, t - 5 * 60_000 - 1, CFG, STATES_MY), null);
  assert.equal(parseOrder(raw, t - 60 * 60_000, CFG, STATES_MY), null, 'a snapshot from the future is refused');
  assert.notEqual(parseOrder(raw, t + 2 * TTL, { ...CFG, orderTtlMs: 3 * TTL }, STATES_MY), null, 'the TTL comes from config');
});

test('order snapshot: corrupted or tampered storage is no order, and never throws', () => {
  const good = order({ details: details({ note: 'Ring twice' }) });
  const now = T0.getTime();
  const read = (o) => parseOrder(typeof o === 'string' || o == null ? o : JSON.stringify(o), now, CFG, STATES_MY);
  // Control: the untouched order, and harmless variations of the same shape, are accepted.
  assert.deepEqual(read(good), good);
  assert.notEqual(read({ ...good, deliverySen: 0 }), null);
  assert.notEqual(read({ ...good, lines: Array.from({ length: MAX_ORDER_LINES }, (_, i) => ({ ...good.lines[0], sku: `sku-${i}:250` })) }), null, '16 lines are allowed');
  assert.notEqual(read({ ...good, lines: [{ ...good.lines[0], qty: MAX }] }), null);
  assert.notEqual(read({ ...good, details: { ...good.details, note: '' } }), null);
  assert.notEqual(read({ ...good, details: { ...good.details, name: 'x'.repeat(60) } }), null);

  const withLine = (over) => ({ ...good, lines: [{ ...good.lines[0], ...over }, good.lines[1]] });
  const withDetails = (over) => ({ ...good, details: { ...good.details, ...over } });
  const bad = [
    null,
    undefined,
    '',
    '{',
    'null',
    '[]',
    '"x"',
    '7',
    '{}',
    [good],
    { ...good, ref: 'AV-261112-7KQI' },
    { ...good, ref: 'NF-261112-7KQ4' },
    { ...good, ref: undefined },
    { ...good, ref: 5 },
    { ...good, step: 4 },
    { ...good, step: 0 },
    { ...good, step: '2' },
    { ...good, lang: 'ar' },
    { ...good, lang: undefined },
    { ...good, payMode: 'free' },
    { ...good, payMode: undefined },
    { ...good, deliverySen: -1 },
    { ...good, deliverySen: 8.5 },
    { ...good, deliverySen: 'free' },
    { ...good, deliverySen: undefined },
    { ...good, createdAt: 'today' },
    { ...good, createdAt: undefined },
    { ...good, createdAt: null },
    { ...good, lines: [] },
    { ...good, lines: null },
    { ...good, lines: {} },
    { ...good, lines: 'x' },
    { ...good, lines: [null] },
    { ...good, lines: [good.lines[0], good.lines[0]] }, // the same SKU twice
    { ...good, lines: Array.from({ length: MAX_ORDER_LINES + 1 }, (_, i) => ({ ...good.lines[0], sku: `sku-${i}:250` })) },
    withLine({ qty: 0 }),
    withLine({ qty: MAX + 1 }),
    withLine({ qty: 1.5 }),
    withLine({ qty: '2' }),
    withLine({ unitSen: 0 }),
    withLine({ unitSen: -10900 }),
    withLine({ unitSen: 109.5 }),
    withLine({ unitSen: '10900' }),
    withLine({ unitSen: null }),
    withLine({ name: '' }),
    withLine({ name: 5 }),
    withLine({ name: 'Extra\nVirgin' }),
    withLine({ name: 'x'.repeat(81) }),
    withLine({ sizeLabel: '' }),
    withLine({ sizeLabel: undefined }),
    withLine({ sku: '' }),
    withLine({ sku: 7 }),
    { ...good, details: null },
    { ...good, details: [] },
    { ...good, details: 'x' },
    withDetails({ name: '' }),
    withDetails({ name: 'x'.repeat(61) }),
    withDetails({ name: 'Aisyah‮ Rahman' }),
    withDetails({ name: ' Aisyah Rahman' }),
    withDetails({ phone: '0182059925' }), // valid mobile, but not in the stored form
    withDetails({ phone: '60312345678' }), // landline
    withDetails({ phone: '601800881234' }), // toll free
    withDetails({ address: '' }),
    withDetails({ address: 'x'.repeat(161) }),
    withDetails({ address: 'Lot 5\nJalan 3' }),
    withDetails({ postcode: '4300' }),
    withDetails({ postcode: 43000 }),
    withDetails({ city: '' }),
    withDetails({ city: 'x'.repeat(41) }),
    withDetails({ state: 'Atlantis' }),
    withDetails({ state: undefined }),
    withDetails({ note: 5 }),
    withDetails({ note: undefined }),
    withDetails({ note: 'x'.repeat(201) }),
  ];
  for (const item of bad) {
    assert.doesNotThrow(() => read(item));
    assert.equal(read(item), null, String(typeof item === 'string' ? item : JSON.stringify(item)).slice(0, 120));
  }
});

test('order snapshot: step 3 text is rebuilt from the snapshot alone and matches step 2', () => {
  const o = msOrder({ details: details({ note: 'Ring twice' }) });
  const build = (snap) => fitOrderMessage(snap, MESSAGE_LABELS[snap.lang], CFG).message;
  const atStep2 = build(o);
  const restored = parseOrder(serializeOrder({ ...o, step: 3 }), T0.getTime() + 1000, CFG, STATES_MY);
  assert.equal(restored.step, 3);
  assert.equal(build(restored), atStep2);
  assert.equal(decodeURIComponent(buildWhatsAppUrl(WA, atStep2, false).split('text=')[1]), atStep2, 'copied text = decoded URL text');
  assert.ok(atStep2.startsWith('Pesanan baharu AV-261112-7KQ4\n'), 'the language is the one frozen in the order');
});

/* ---------- review round 1 ---------- */

test('review 1: text made only of invisible format characters counts as empty', () => {
  const invisible = ['​', '⁠‍', '\u{e0041}\u{e0042}\u{e007f}', ' ​ ‍ ', '­‌', '﻿​'];
  for (const v of invisible) {
    const shown = JSON.stringify(v);
    for (const field of ['name', 'phone', 'address', 'postcode', 'city', 'state']) {
      assert.deepEqual(validateDetails(details({ [field]: v }), STATES_MY), { ok: false, errors: { [field]: 'required' } }, `${field} ${shown}`);
    }
    assert.equal(valid({ note: v }).note, '', `a note with nothing to see is no note: ${shown}`);
  }
  // Control: the same characters next to visible text pass, and the stored value keeps them.
  assert.equal(valid({ name: 'Ali‍' }).name, 'Ali‍');
  assert.equal(valid({ name: '👨‍👩‍👧 Tan' }).name, '👨‍👩‍👧 Tan', 'the joiner inside an emoji family stays');
  const d = valid({ address: 'Lot​5', city: 'K⁠L', note: 'ok​' });
  assert.deepEqual([d.address, d.city, d.note], ['Lot​5', 'K⁠L', 'ok​']);
});

test('review 2: Arabic-Indic, Extended Arabic-Indic and full-width digits; +60 (0)18…', () => {
  for (const form of ['٠١٨٢٠٥٩٩٢٥', '۰۱۸۲۰۵۹۹۲۵', '０１８２０５９９２５', '+٦٠ ١٨-٢٠٥ ٩٩٢٥', '+60 (0)18-205 9925', '60 018 205 9925', '+60018 2059925', '600182059925']) {
    assert.equal(normalisePhone(form), '60182059925', form);
    assert.equal(valid({ phone: form }).phone, '60182059925', form);
  }
  assert.equal(normalisePhone('+60 (0)11-1234 5678'), '601112345678');
  // The same shapes with a number that is not a Malaysian mobile are still refused.
  for (const bad of ['٠٣١٢٣٤٥٦٧٨', '０３１２３４５６７８', '+60 (0)3-1234 5678', '+60 (00)18-205 9925', '0060182059925', '00182059925', '+60 (0)18-205 992', '१८२०५९९२५']) {
    assert.equal(normalisePhone(bad), null, bad);
  }
  for (const form of ['４３０００', '٤٣٠٠٠', '۴۳۰۰۰', ' ４3０0０ ']) assert.equal(valid({ postcode: form }).postcode, '43000', form);
  for (const bad of ['４３００', '٤٣٠٠٠٠', '४३०००', '４３０００a']) {
    assert.deepEqual(validateDetails(details({ postcode: bad }), STATES_MY), { ok: false, errors: { postcode: 'postcode' } }, bad);
  }
  // A stored order holds the ASCII form only.
  const good = order();
  assert.notEqual(parseOrder(serializeOrder(good), T0.getTime(), CFG, STATES_MY), null, 'control');
  assert.equal(parseOrder(serializeOrder({ ...good, details: details({ postcode: '４３０００' }) }), T0.getTime(), CFG, STATES_MY), null);
  assert.equal(parseOrder(serializeOrder({ ...good, details: details({ phone: '٦٠١٨٢٠٥٩٩٢٥' }) }), T0.getTime(), CFG, STATES_MY), null);
});

test('review 3: a line break typed into a field never forges a NEW message line', () => {
  const plain = buildMessage(order({ details: valid({ name: 'Ali', note: 'ok' }) }), MESSAGE_LABELS.en).split('\n');
  for (const br of ['\n', '\r\n', '\r', ' ', ' ', '\u0085', '\u000b', '\u000c']) {
    const d = valid({
      name: `Ali${br}Total: RM 1.00`,
      address: `12 Jalan 3${br}Payment: paid in full`,
      city: `Kajang${br}Phone: +60000`,
      note: `ok${br}Total: RM 0.00`,
    });
    assert.equal(d.name, 'Ali Total: RM 1.00', 'accepted as typed, on one line');
    const rows = buildMessage(order({ details: d }), MESSAGE_LABELS.en).split('\n');
    assert.equal(rows.length, plain.length, `same number of lines as the plain order: ${JSON.stringify(br)}`);
    assert.deepEqual(rows.filter((r) => r.startsWith('Total: ')), ['Total: RM 293.00'], 'the only Total line is the real one');
    assert.deepEqual(rows.filter((r) => r.startsWith('Payment: ')), ['Payment: to be arranged on WhatsApp']);
    assert.deepEqual(rows.filter((r) => r.startsWith('Phone: ')), ['Phone: +60182059925']);
    assert.equal(rows[7], 'Name: Ali Total: RM 1.00');
    assert.equal(rows[9], 'Address: 12 Jalan 3 Payment: paid in full, 43000 Kajang Phone: +60000, Selangor');
    assert.equal(rows[10], 'Note: ok Total: RM 0.00');
    assert.deepEqual(rows.slice(0, 7), plain.slice(0, 7), 'everything above the customer text is untouched');
  }
});

test('review 4: a stored price above the ceiling is refused; formatRM prints RM 0.00 for anything that is not a safe non-negative integer', () => {
  const good = order();
  const priced = (unitSen) => parseOrder(JSON.stringify({ ...good, lines: [{ ...good.lines[0], unitSen }] }), T0.getTime(), CFG, STATES_MY);
  assert.equal(MAX_UNIT_SEN, 10_000_000);
  assert.equal(priced(10_000_000).lines[0].unitSen, 10_000_000, 'control: exactly at the ceiling');
  assert.equal(priced(10900).lines[0].unitSen, 10900, 'control');
  for (const bad of [10_000_001, 1e12, Number.MAX_SAFE_INTEGER, 1e21]) assert.equal(priced(bad), null, String(bad));

  assert.equal(formatRM(100), 'RM 1.00', 'control');
  assert.equal(formatRM(Number.MAX_SAFE_INTEGER), 'RM 90071992547409.91', 'control: the largest safe integer');
  for (const bad of [-1, -21800, 1.5, 0.1, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1, 1e21, '100', null, undefined]) {
    assert.equal(formatRM(bad), 'RM 0.00', String(bad));
  }
});

test('review 5: the reference date is the day in Malaysia, whatever the device zone', () => {
  const zero = () => new Uint8Array(4);
  const at = (...utc) => makeRef('AV', new Date(Date.UTC(...utc)), zero);
  assert.equal(at(2026, 10, 11, 17, 0), 'AV-261112-AAAA', '01:00 MYT on 12 Nov');
  assert.equal(at(2026, 10, 11, 16, 0, 0), 'AV-261112-AAAA', 'midnight MYT');
  assert.equal(at(2026, 10, 11, 15, 59, 59), 'AV-261111-AAAA', 'one second before midnight MYT');
  assert.equal(at(2026, 10, 12, 15, 59, 59), 'AV-261112-AAAA', '23:59:59 MYT');
  assert.equal(at(2026, 11, 31, 15, 59, 59), 'AV-261231-AAAA');
  assert.equal(at(2026, 11, 31, 16, 0, 0), 'AV-270101-AAAA', 'the year turns at midnight MYT');
  assert.equal(at(2028, 1, 28, 16, 0, 0), 'AV-280229-AAAA', 'leap day');
  const made = createOrder({ lines: [line('blackseed:250', 1)], details: details(), lang: 'en', payMode: 'chat', cfg: CFG, now: new Date(Date.UTC(2026, 10, 11, 17, 0)) });
  assert.match(made.ref, /^AV-261112-/, 'createOrder uses the same date');
});

test('review 6: isRef wants a real month and day', () => {
  for (const ok of ['AV-260101-7KQ4', 'AV-261231-7KQ4', 'AV-260930-7KQ4', 'AV-261019-7KQ4', 'AV-000229-7KQ4']) assert.equal(isRef(ok, 'AV'), true, ok);
  for (const bad of ['AV-260001-7KQ4', 'AV-261301-7KQ4', 'AV-269901-7KQ4', 'AV-261100-7KQ4', 'AV-261132-7KQ4', 'AV-261140-7KQ4', 'AV-261199-7KQ4']) {
    assert.equal(isRef(bad, 'AV'), false, bad);
  }
  const good = order();
  assert.notEqual(parseOrder(serializeOrder(good), T0.getTime(), CFG, STATES_MY), null, 'control');
  assert.equal(parseOrder(serializeOrder({ ...good, ref: 'AV-261301-7KQ4' }), T0.getTime(), CFG, STATES_MY), null);
  assert.notEqual(createOrder({ lines: good.lines, details: details(), lang: 'en', payMode: 'chat', cfg: CFG, now: T0, keepRef: 'AV-261132-7KQ4' }).ref, 'AV-261132-7KQ4');
});

const FAMILY = '👨‍👩‍👧'; // one visible character, 8 UTF-16 units
const FLAG = '🇲🇾'; // 4 units
const TAMIL = 'நி'; // letter + vowel sign, 2 units

test('review 7: a cut never splits a visible character (emoji family, flag, letter with its sign)', () => {
  assert.deepEqual([FAMILY.length, FLAG.length, TAMIL.length], [8, 4, 2]);
  assert.equal(cleanText(`ab${FAMILY}`, 10), `ab${FAMILY}`, 'control: it fits whole');
  for (const max of [3, 5, 9]) assert.equal(cleanText(`ab${FAMILY}`, max), 'ab', `max ${max}`);
  assert.equal(cleanText(`a${FLAG}`, 5), `a${FLAG}`, 'control');
  for (const max of [2, 3, 4]) assert.equal(cleanText(`a${FLAG}`, max), 'a', `max ${max}`);
  assert.equal(cleanText(TAMIL + TAMIL, 4), TAMIL + TAMIL, 'control');
  assert.equal(cleanText(TAMIL + TAMIL, 3), TAMIL);
  assert.equal(cleanText('éé', 3), 'é', 'a letter keeps its accent');

  for (const [unit, size] of [[FAMILY, 8], [FLAG, 4], [TAMIL, 2]]) {
    const note = unit.repeat(Math.floor(FIELD_MAX.note / size));
    const o = order({ lines: allLines(MAX), details: valid({ note }) });
    const L = MESSAGE_LABELS.en;
    assert.ok(urlLen(buildMessage(o, L)) > CFG.urlCap, 'the uncut message is too long');
    const r = fitOrderMessage(o, L, CFG);
    assert.equal(r.fits, true);
    const kept = r.message.split('\n').at(-1).slice('Note: '.length, -3);
    assert.ok(r.message.endsWith('...') && kept.length >= size && kept.length < note.length);
    assert.equal(kept, unit.repeat(kept.length / size), 'only whole characters are kept');
    assert.ok(urlLen(r.message) <= CFG.urlCap);
    // Control: with room for all of it, the note is whole and unmarked.
    assert.deepEqual(fitOrderMessage(o, L, { ...CFG, urlCap: 9000 }), { message: buildMessage(o, L), fits: true });
  }
});

test('review 7: without Intl.Segmenter the cut falls back to whole code points', () => {
  const real = Intl.Segmenter;
  assert.equal(typeof real, 'function', 'control: this runtime has it');
  try {
    Intl.Segmenter = undefined;
    assert.equal(cleanText('a😀', 2), 'a', 'never half an emoji');
    assert.equal(cleanText('a😀b', 3), 'a😀');
    assert.equal(cleanText('abc', 2), 'ab');
    const o = order({ lines: allLines(MAX), details: details({ note: '📞'.repeat(100) }) });
    const r = fitOrderMessage(o, MESSAGE_LABELS.en, CFG);
    assert.equal(r.fits, true);
    assert.match(r.message, /\nNote: (?:📞)+\.\.\.$/u);
    assert.equal(new URL(buildWhatsAppUrl(WA, r.message, true)).searchParams.get('text'), r.message);
  } finally {
    Intl.Segmenter = real;
  }
  assert.equal(cleanText(`ab${FAMILY}`, 9), 'ab', 'restored');
});

test('review 8: the Malay paid line', () => {
  assert.equal(MESSAGE_LABELS.ms.paid, 'Saya sudah bayar, resit akan dihantar.');
  assert.equal(buildMessage(msOrder({ payMode: 'transfer' }), MESSAGE_LABELS.ms).split('\n').at(-1), 'Saya sudah bayar, resit akan dihantar.');
  assert.doesNotMatch(buildMessage(msOrder({ payMode: 'chat' }), MESSAGE_LABELS.ms), /resit/, 'control: chat mode has no paid line');
});

test('review 9: a real "__proto__" key in stored JSON changes nothing and pollutes nothing', () => {
  const good = order({ details: details({ note: 'Ring twice' }) });
  const ser = serializeOrder(good);
  const now = T0.getTime();
  assert.deepEqual(parseOrder(ser, now, CFG, STATES_MY), good, 'control');

  const cases = [
    [`{"__proto__":{"polluted":true,"step":3,"ref":"AV-261112-AAAA"},${ser.slice(1)}`, (j) => j],
    [ser.replace('"details":{', '"details":{"__proto__":{"polluted":true,"name":"Evil"},'), (j) => j.details],
    [ser.replace('"lines":[{', '"lines":[{"__proto__":{"polluted":true,"qty":24,"unitSen":1},'), (j) => j.lines[0]],
  ];
  for (const [raw, where] of cases) {
    assert.equal(Object.hasOwn(where(JSON.parse(raw)), '__proto__'), true, 'the key is really in the JSON');
    const o = parseOrder(raw, now, CFG, STATES_MY);
    assert.deepEqual(o, good);
    for (const obj of [o, o.details, o.lines[0]]) {
      assert.equal(Object.getPrototypeOf(obj), Object.prototype);
      assert.equal(Object.hasOwn(obj, '__proto__'), false);
      assert.equal(obj.polluted, undefined);
    }
  }
  assert.equal({}.polluted, undefined);
  // Values that exist ONLY under "__proto__" are not read.
  assert.equal(parseOrder(`{"__proto__":${ser}}`, now, CFG, STATES_MY), null);
  const onlyProtoDetails = ser.replace(/"details":(\{[^}]*\})/, '"details":{"__proto__":$1}');
  const onlyProtoLine = ser.replace(/"lines":\[(\{[^}]*\})/, '"lines":[{"__proto__":$1}');
  for (const raw of [onlyProtoDetails, onlyProtoLine]) {
    assert.notEqual(raw, ser);
    assert.doesNotThrow(() => JSON.parse(raw));
    assert.equal(parseOrder(raw, now, CFG, STATES_MY), null);
  }

  const line1 = '{"sku":"blackseed:250","qty":2}';
  const want = { cart: { lines: [{ sku: 'blackseed:250', qty: 2 }] }, dropped: 0 };
  assert.deepEqual(parseCart(`{"lines":[${line1}]}`, SKUS, MAX), want, 'control');
  assert.deepEqual(parseCart(`{"__proto__":{"polluted":true,"lines":[{"sku":"organic:250","qty":9}]},"lines":[${line1}]}`, SKUS, MAX), want);
  const cartLine = parseCart('{"lines":[{"__proto__":{"polluted":true,"qty":24},"sku":"blackseed:250","qty":2}]}', SKUS, MAX);
  assert.deepEqual(cartLine, want);
  assert.equal(cartLine.cart.lines[0].polluted, undefined);
  assert.equal(Object.getPrototypeOf(cartLine.cart.lines[0]), Object.prototype);
  assert.deepEqual(parseCart(`{"__proto__":{"lines":[${line1}]}}`, SKUS, MAX), { cart: EMPTY_CART, dropped: 0 }, 'lines only under __proto__');
  assert.deepEqual(parseCart(`{"lines":[{"__proto__":${line1}}]}`, SKUS, MAX), { cart: EMPTY_CART, dropped: 0 });
  assert.deepEqual(parseCart(`{"lines":[{"sku":"__proto__","qty":1},{"sku":"constructor","qty":1},${line1}]}`, SKUS, MAX), { ...want, dropped: 2 }, 'a SKU named __proto__ is just an unknown SKU');
  assert.equal({}.polluted, undefined);
});

test('review 10: parseCart filters and merges first; dropped counts distinct unknown SKUs', () => {
  const good = { sku: 'wild-thyme:250', qty: 2 };
  const junk = Array.from({ length: 64 }, (_, i) => ({ sku: `junk-${i}:250`, qty: 1 }));
  assert.deepEqual(parseCart(JSON.stringify({ lines: [good] }), SKUS, MAX), { cart: { lines: [good] }, dropped: 0 }, 'control');
  assert.deepEqual(parseCart(JSON.stringify({ lines: [...junk, good] }), SKUS, MAX), { cart: { lines: [good] }, dropped: 64 });
  const noise = Array.from({ length: 500 }, (_, i) => [null, 7, 'x', {}, { sku: 'blackseed:250', qty: 0 }][i % 5]);
  assert.deepEqual(parseCart(JSON.stringify({ lines: [...noise, good, ...noise, good] }), SKUS, MAX), { cart: { lines: [{ sku: 'wild-thyme:250', qty: 4 }] }, dropped: 0 }, 'a line after 1,000 unreadable ones is still merged');

  const gone = (sku, qty = 1) => ({ sku, qty });
  const droppedOf = (lines) => parseCart(JSON.stringify({ lines }), SKUS, MAX).dropped;
  assert.equal(droppedOf([gone('gone:250'), gone('other:250')]), 2, 'control: two products');
  assert.equal(droppedOf([gone('gone:250'), gone('gone:250', 5), gone('gone:250', 24)]), 1, 'one product stored three times');
  assert.equal(droppedOf([gone('gone:250'), gone('gone:500')]), 2, 'two sizes are two SKUs');
  assert.equal(droppedOf([gone('gone:250', 0), gone('gone:250', 1.5)]), 0, 'a line with no usable quantity was never an item');
  // The cap applies to the result: a catalogue larger than the cap keeps the first 64 SKUs.
  const many = Array.from({ length: 70 }, (_, i) => `p${i}:250`);
  const big = parseCart(JSON.stringify({ lines: [...many].reverse().map((sku) => ({ sku, qty: 1 })) }), many, MAX);
  assert.deepEqual(big.cart.lines.map((l) => l.sku), many.slice(0, 64));
  assert.equal(parseCart(JSON.stringify({ lines: many.slice(0, 64).map((sku) => ({ sku, qty: 1 })) }), many, MAX).cart.lines.length, 64, 'control: 64 fit');
});

test('review 11: EMPTY_CART is frozen', () => {
  assert.equal(Object.isFrozen(EMPTY_CART), true);
  assert.equal(Object.isFrozen(EMPTY_CART.lines), true);
  assert.throws(() => EMPTY_CART.lines.push({ sku: 'blackseed:250', qty: 1 }), TypeError);
  assert.throws(() => {
    EMPTY_CART.lines = [{ sku: 'blackseed:250', qty: 1 }];
  }, TypeError);
  assert.deepEqual(EMPTY_CART, { lines: [] });
  // Control: every cart function still works from it and hands back a new, writable cart.
  const added = addLine(EMPTY_CART, 'blackseed:250', 1, SKUS, MAX).cart;
  assert.deepEqual(added, { lines: [{ sku: 'blackseed:250', qty: 1 }] });
  assert.equal(Object.isFrozen(added), false);
  assert.deepEqual(setLineQty(EMPTY_CART, 'blackseed:250', 3, SKUS, MAX), { lines: [{ sku: 'blackseed:250', qty: 3 }] });
  assert.equal(setLineQty(EMPTY_CART, 'blackseed:250', 0, SKUS, MAX), EMPTY_CART);
  assert.equal(cartCount(EMPTY_CART), 0);
  assert.equal(serializeCart(EMPTY_CART), '{"lines":[]}');
  assert.equal(EMPTY_CART.lines.length, 0);
});

test('review 12: setLineQty returns the same cart when nothing changed, and copies the lines it keeps', () => {
  const cart = { lines: [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }] };
  assert.equal(setLineQty(cart, 'nope:250', 3, SKUS, MAX), cart, 'unknown SKU');
  assert.equal(setLineQty(cart, 'nope:250', 0, SKUS, MAX), cart, 'unknown SKU, qty 0');
  assert.equal(setLineQty(cart, 'organic:500', 0, SKUS, MAX), cart, 'qty 0 for a line that is not there');
  assert.equal(setLineQty(cart, 'organic:500', -3, SKUS, MAX), cart);
  assert.equal(setLineQty(cart, 'blackseed:250', 1, SKUS, MAX), cart, 'the quantity it already has');
  const capped = { lines: [{ sku: 'blackseed:250', qty: MAX }] };
  assert.equal(setLineQty(capped, 'blackseed:250', 99, SKUS, MAX), capped, 'already at the cap');

  // Control: a real change gives a new cart that shares no line object with the old one.
  for (const next of [setLineQty(cart, 'blackseed:250', 5, SKUS, MAX), setLineQty(cart, 'blackseed:250', 0, SKUS, MAX), setLineQty(cart, 'organic:500', 1, SKUS, MAX)]) {
    assert.notEqual(next, cart);
    assert.notEqual(next.lines, cart.lines);
    assert.deepEqual(next.lines[0], { sku: 'extra-virgin:250', qty: 2 });
    assert.notEqual(next.lines[0], cart.lines[0], 'the kept line is a copy');
    next.lines[0].qty = 9;
    assert.equal(cart.lines[0].qty, 2);
  }
  // A line whose product went away can still be removed.
  const stale = { lines: [{ sku: 'gone:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }] };
  assert.deepEqual(setLineQty(stale, 'gone:250', 0, SKUS, MAX), { lines: [{ sku: 'blackseed:250', qty: 1 }] });
  assert.deepEqual(cart, { lines: [{ sku: 'extra-virgin:250', qty: 2 }, { sku: 'blackseed:250', qty: 1 }] });
});

test('review 13: clampQty reads a string only when it is plain digits', () => {
  for (const [text, n] of [['16', 16], ['10', 10], ['0', 0], [' 7 ', 7], ['007', 7], ['24', 24], ['25', MAX], ['99999999999999999999', MAX]]) {
    assert.equal(clampQty(text, MAX), n, JSON.stringify(text));
  }
  for (const bad of ['0x10', '1e1', '2.5', '2.0', '-1', '+5', '1_0', '1 0', '١٢', '１２', '0b11', 'Infinity', '']) {
    assert.equal(clampQty(bad, MAX), 0, JSON.stringify(bad));
  }
  assert.equal(clampQty(0x10, MAX), 16, 'control: numbers are unchanged');
  assert.equal(clampQty(2.5, MAX), 2);
  assert.equal(addLine(EMPTY_CART, 'blackseed:250', '1e1', SKUS, MAX).result, 'invalid');
  assert.equal(addLine(EMPTY_CART, 'blackseed:250', '10', SKUS, MAX).result, 'added', 'control');
});
