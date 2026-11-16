// DEV-ONLY browser walk of the Buy-now flow (FORGE BUY-NOW; replaces the ORDER-R1 cart walk). Not part of the build.
//
//   node scripts/dev/buynow-walk.mjs <baseUrl> [--out=<dir>] [--only=<section[,section]>] [--lang=en|ms] [--vp=d1366|p390|p360]
//                                    [--pay=mock|server] [--stub-state=<hitpay-stub.json>]
//
//   --pay      mock (default): /api/pay/* is answered by this script (a static preview has no PHP), delivery RM 10.
//              server: /api/pay/* goes to the real PHP server at <baseUrl> (scripts/dev/pay-harness.mjs: dist +
//              php -S + the local HitPay stub). The sections that need a forced answer (fees, mismatch) are
//              NOT MEASURED in server mode.
//   HitPay is NEVER contacted: any request to *.hit-pay.com is answered here with a stub page and recorded
//   (the walk "stops at the HitPay redirect"). WhatsApp is never opened (requests aborted, clicks prevented).
//
//   --only     surfaces,sheet,history,form,returning,fees,mismatch,review,paid,storage
//
// Each check prints PASS / FAIL / NOT MEASURED. Exit code 1 on any FAIL. Last line: `walk: N pass, M fail, K not measured`.
// Elements are selected by data-testid only. Only obviously fake test data is typed (never sent anywhere real).
import puppeteer, { ElementHandle } from 'puppeteer';
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const origClick = ElementHandle.prototype.click;
ElementHandle.prototype.click = async function (...args) {
  try {
    await this.evaluate((e) => e.scrollIntoView({ block: 'center', inline: 'nearest' }));
  } catch {
    /* detached: the original click reports it */
  }
  return origClick.apply(this, args);
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const BASE = (argv.find((a) => !a.startsWith('--')) ?? '').replace(/\/+$/, '');
if (!/^https?:\/\//.test(BASE)) {
  console.error('usage: node scripts/dev/buynow-walk.mjs <baseUrl> [--out=<dir>] [--only=<section>] [--lang=en|ms] [--vp=d1366|p390|p360] [--pay=mock|server]');
  process.exit(2);
}
const OUT = resolve(flag('out') ?? '.buynow-walk');
mkdirSync(OUT, { recursive: true });
const ORIGIN = new URL(BASE).origin;
const PAY = flag('pay') ?? 'mock';
const STUB_STATE = flag('stub-state') ? resolve(flag('stub-state')) : null;
const SECTION_NAMES = ['surfaces', 'sheet', 'history', 'form', 'returning', 'fees', 'mismatch', 'review', 'paid', 'storage'];
const onlySet = new Set((flag('only') ?? '').split(',').map((s) => s.trim()).filter(Boolean));
for (const s of onlySet) if (!SECTION_NAMES.includes(s)) (console.error(`unknown section ${s}`), process.exit(2));
const LANGS = ['en', 'ms'].filter((l) => !flag('lang') || flag('lang') === l);
const VIEWPORTS = [
  { short: 'd1366', width: 1366, height: 800, mobile: false },
  { short: 'p390', width: 390, height: 844, mobile: true },
  { short: 'p360', width: 360, height: 640, mobile: true },
].filter((v) => !flag('vp') || flag('vp') === v.short);

// ------------------------------------------------------------------ prices (integer sen) from the same sources as the site
const catalogue = JSON.parse(readFileSync(join(ROOT, 'src/data/catalogue.json'), 'utf-8'));
const storeFacts = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf-8'));
const toSen = (a) => {
  const m = /^(\d{1,6})(?:\.(\d{1,2}))?$/.exec(String(a).trim());
  return m ? Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0')) : null;
};
const ITEM = Object.fromEntries(
  catalogue.products.flatMap((p) =>
    p.sizes.flatMap((size) => {
      const pr = storeFacts.prices.products[p.priceKey]?.[`ml${size}`];
      const sen = pr ? toSen(pr.amount) : null;
      return sen ? [[`${p.id}:${size}`, { sku: `${p.id}:${size}`, productId: p.id, size, sen, slug: p.slug ?? null }]] : [];
    })
  )
);
const FEE = 1000; // RM 10 flat (owner 2026-11-16)
const fmt = (sen) => `RM ${Math.trunc(sen / 100)}.${String(sen % 100).padStart(2, '0')}`;
const norm = (s) => String(s ?? '').replace(/[\s ]+/g, ' ').trim();
const NAMES = {
  en: { 'extra-virgin': 'Extra Virgin', organic: 'Organic Extra Virgin', blackseed: 'Infused: Blackseed' },
  ms: { 'extra-virgin': 'Extra Virgin', organic: 'Extra Virgin Organik', blackseed: 'Infusi: Habbatus Sauda' },
};
const DETAILS = { name: "Tester O'Neil & Sons #1", phone: '0121234567', address: '12 Jalan Ujian 3, Taman Contoh, Petaling Jaya', postcode: '47800', state: 'Selangor' };

let nPass = 0;
let nFail = 0;
let nNm = 0;
function record(status, label, detail) {
  if (status === 'PASS') nPass++;
  else if (status === 'FAIL') nFail++;
  else nNm++;
  console.log(`${status === 'PASS' ? 'PASS' : status === 'FAIL' ? 'FAIL' : 'NOT MEASURED'}  ${label}${detail ? `  -- ${detail}` : ''}`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function until(fn, ms = 6000, step = 100) {
  const end = Date.now() + ms;
  for (;;) {
    try {
      const v = await fn();
      if (v) return v;
    } catch {
      /* retry */
    }
    if (Date.now() > end) return null;
    await sleep(step);
  }
}
const tid = (id, extra = '') => `[data-testid="${id}"]${extra}`;
const json = (req, status, data) => req.respond({ status, contentType: 'application/json', body: JSON.stringify(data) });
const mytDay = () => {
  const d = new Date(Date.now() + 8 * 3600 * 1000);
  return `${String(d.getUTCFullYear() % 100).padStart(2, '0')}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
};

/** The pay server mocked to its contract (docs/forge/HITPAY-AV-HANDOFF.md + BUY-NOW changes). */
async function payMock(c, req, u) {
  const P = c.pay;
  if (u.pathname === '/api/pay/config') {
    P.configCalls += 1;
    if (P.configFail) return json(req, 500, { error: { code: 'server_error', message: 'mock' } });
    const open = P.fee !== null;
    return json(req, 200, { site: 'av', ready: open, delivery_sen: open ? P.fee : null, currency: 'MYR' });
  }
  if (u.pathname === '/api/pay/create' && req.method() === 'POST') {
    if (P.createDelay) await sleep(P.createDelay);
    let body = null;
    try {
      body = JSON.parse(req.postData() ?? 'null');
    } catch {
      /* null */
    }
    P.creates.push(body);
    if (P.fee === null) return json(req, 503, { error: { code: 'pay_not_ready', message: 'closed' } });
    const l = body?.lines?.[0] ?? {};
    const sub = (ITEM[l.sku]?.sen ?? 0) * (l.qty ?? 0);
    P.last = { sku: l.sku, qty: l.qty };
    P.lastRef ??= `AV-${mytDay()}-WALK`;
    P.lastToken ??= '0123456789abcdef0123456789abcdef';
    const total = sub + (P.serverFee ?? P.fee);
    return json(req, 200, { ref: P.lastRef, token: P.lastToken, url: 'https://checkout.hit-pay.com/payment-request/@berkat-madinah/9a1b2c3d-walk/checkout', status: 'pending', total_sen: total });
  }
  if (u.pathname === '/api/pay/status') {
    if (u.searchParams.get('ref') !== P.lastRef || u.searchParams.get('t') !== P.lastToken) return json(req, 403, { error: { code: 'forbidden', message: 'no' } });
    const l = P.last ?? { sku: 'extra-virgin:500', qty: 1 };
    const unit = ITEM[l.sku]?.sen ?? 0;
    const [pid, size] = l.sku.split(':');
    return json(req, 200, {
      ref: P.lastRef, site: 'av', lang: c.lang, status: P.status, subtotal_sen: unit * l.qty, delivery_sen: P.fee ?? 0, total_sen: unit * l.qty + (P.fee ?? 0),
      lines: [{ sku: l.sku, qty: l.qty, unit_sen: unit, label: `${NAMES[c.lang][pid] ?? pid} ${size} ml`, bottles: l.qty }],
      payment_type: P.status === 'paid' ? 'touch_n_go' : null, paid_at: null,
    });
  }
  return json(req, 404, { error: { code: 'not_found', message: 'mock' } });
}

function stubPayNewest() {
  if (!STUB_STATE || !existsSync(STUB_STATE)) return false;
  const st = JSON.parse(readFileSync(STUB_STATE, 'utf-8'));
  const id = Object.keys(st.requests ?? {}).at(-1);
  if (!id) return false;
  const r = st.requests[id];
  r.status = 'completed';
  r.payments = [{ id: 'walk-pay', status: 'succeeded', amount: r.amount, currency: 'MYR', payment_type: 'touch_n_go' }];
  writeFileSync(STUB_STATE, JSON.stringify(st, null, 2));
  return true;
}

async function makeCtx(browser, section, lang, vp) {
  const context = typeof browser.createBrowserContext === 'function' ? await browser.createBrowserContext() : await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.mobile ? 2 : 1, isMobile: vp.mobile, hasTouch: vp.mobile });
  page.setDefaultTimeout(20000);
  const prefix = `[${section} ${lang} ${vp.short}]`;
  const c = {
    section, lang, vp, page, context, errors: [],
    check: (cond, name, detail) => record(cond ? 'PASS' : 'FAIL', `${prefix} ${name}`, cond ? '' : detail),
    nm: (name, why) => record('NOT MEASURED', `${prefix} ${name}`, why),
    pay: { fee: FEE, configFail: false, createDelay: 0, serverFee: null, status: 'pending', creates: [], hitpay: [], configCalls: 0, lastRef: null, lastToken: null, last: null },
    wa: [],
  };
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    let u = null;
    try {
      u = new URL(req.url());
    } catch {
      /* ignore */
    }
    const host = u?.hostname ?? '';
    if (/(^|\.)(wa\.me|whatsapp\.com)$/i.test(host)) {
      c.wa.push(req.url());
      req.abort('blockedbyclient').catch(() => {});
    } else if (/(^|\.)hit-pay\.com$/i.test(host)) {
      c.pay.hitpay.push(req.url());
      req.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><title>HitPay stub</title><h1 data-hitpay-stub>HitPay stub</h1>' }).catch(() => {});
    } else if (PAY === 'mock' && u && u.origin === ORIGIN && u.pathname.startsWith('/api/pay/')) {
      payMock(c, req, u).catch(() => req.continue().catch(() => {}));
    } else if (u && u.origin === ORIGIN && u.pathname === '/api/pay/create' && req.method() === 'POST') {
      try {
        c.pay.creates.push(JSON.parse(req.postData() ?? 'null'));
      } catch {
        c.pay.creates.push(null);
      }
      req.continue().catch(() => {});
    } else req.continue().catch(() => {});
  });
  page.on('pageerror', (e) => c.errors.push(String(e.message ?? e)));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|wa\.me|whatsapp|ERR_BLOCKED_BY_CLIENT|hit-pay/i.test(m.text() + (m.location()?.url ?? ''))) c.errors.push(m.text());
  });
  await page.evaluateOnNewDocument(() => {
    window.open = () => null;
    window.addEventListener('click', (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (a && /^https?:\/\/(wa\.me|web\.whatsapp\.com|api\.whatsapp\.com)/i.test(a.href)) e.preventDefault();
    });
  });
  c.close = () => context.close().catch(() => {});
  return c;
}

async function go(c, path) {
  try {
    // one retry: a redirect to the HitPay stub still in flight can abort the first navigation
    const nav = () => c.page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const res = await nav().catch(async (e) => (/ERR_ABORTED/.test(String(e?.message)) ? (await sleep(500), nav()) : Promise.reject(e)));
    if (res && res.status() >= 400) return c.check(false, `load ${path}`, `HTTP ${res.status()}`), false;
  } catch (e) {
    return c.check(false, `load ${path}`, e.message), false;
  }
  const ok = await c.page.waitForSelector('body[data-app-ready="true"]', { timeout: 30000 }).then(() => true, () => false);
  if (!ok) c.check(false, `app ready ${path}`, 'never ready');
  await sleep(250);
  return ok;
}
const vis = (page, sel) =>
  page.evaluate((s) => [...document.querySelectorAll(s)].some((e) => {
    const r = e.getBoundingClientRect();
    const st = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none';
  }), sel);
const text = (page, sel) => page.$eval(sel, (e) => e.textContent ?? '').catch(() => null);
const sheetOpen = (page) => page.evaluate(() => !!document.querySelector('dialog[data-testid="buy-now-sheet"][open]'));
const sheetState = (page) => page.$eval('[data-testid="buy-now-sheet"]', (e) => e.getAttribute('data-state')).catch(() => null);

/** Taps the Buy now button of a product (first one), waits for the sheet with an answered config. */
async function openSheet(c, productId = 'extra-virgin') {
  const sel = tid('buy-now', `[data-product="${productId}"]`);
  const btn = await c.page.$(sel);
  if (!btn) return c.check(false, `buy-now button for ${productId}`, 'missing'), false;
  await btn.click();
  const open = await until(() => sheetOpen(c.page), 8000);
  if (!open) return c.check(false, 'sheet opens on Buy now', 'no open dialog'), false;
  await until(async () => (await sheetState(c.page)) !== 'loading', 8000);
  return true;
}
async function fill(c, values = DETAILS) {
  for (const [f, v] of Object.entries(values)) {
    const sel = tid(`field-${f}`);
    if (f === 'state') await c.page.select(sel, v);
    else {
      await c.page.$eval(sel, (e) => {
        e.focus();
        e.select?.();
      });
      await c.page.$eval(sel, (e) => {
        const proto = e instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(e, '');
        e.dispatchEvent(new Event('input', { bubbles: true }));
      });
      await c.page.type(sel, v, { delay: 0 });
    }
  }
}
async function tapPay(c) {
  await (await c.page.$(tid('pay-hitpay'))).click();
}
const expectedTotal = (sku, qty, fee = FEE) => ITEM[sku].sen * qty + fee;

// ------------------------------------------------------------------ sections
const SECTIONS = {
  async surfaces(c) {
    const p = c.page;
    for (const path of [`/${c.lang}`, `/${c.lang}/products`, `/${c.lang}/shop`, `/${c.lang}/products/${ITEM['blackseed:250'].slug}`]) {
      if (!(await go(c, path))) continue;
      const n = await p.$$eval(tid('buy-now'), (els) => els.length);
      c.check(n > 0, `${path}: Buy now buttons present (${n})`, 'none');
      const label = norm(await text(p, tid('buy-now')));
      c.check(label === (c.lang === 'ms' ? 'Beli sekarang' : 'Buy now'), `${path}: label "${label}"`, label);
      const cart = await p.evaluate(() => document.querySelectorAll('[data-testid="cart-button"],[data-testid="add-to-cart"],[data-testid="cart-drawer"]').length);
      c.check(cart === 0, `${path}: no cart button, no Add to cart`, `${cart} cart elements`);
    }
    c.check(c.errors.length === 0, 'no page errors', c.errors.slice(0, 3).join(' | '));
  },

  async sheet(c) {
    const p = c.page;
    if (!(await go(c, `/${c.lang}/products`))) return;
    const t0 = Date.now();
    if (!(await openSheet(c))) return;
    c.check(true, `sheet open + config answered in ${Date.now() - t0} ms (first tap, chunk preloaded on pointerenter/touchstart)`);
    c.check((await sheetState(p)) === 'open', 'pay open state', await sheetState(p));
    if (PAY === 'mock') c.check(c.pay.configCalls === 1, 'config fetched once for this open', String(c.pay.configCalls));
    const chips = await p.$$eval(tid('size-chip'), (els) => els.map((e) => [e.getAttribute('data-sku'), e.getAttribute('aria-checked')]));
    c.check(chips.length === 2 && chips.find((x) => x[1] === 'true')?.[0] === 'extra-virgin:500', 'two size chips, 500 ml preselected', JSON.stringify(chips));
    c.check(norm(await text(p, tid('sheet-delivery'))) === fmt(FEE), `delivery ${fmt(FEE)}`, await text(p, tid('sheet-delivery')));
    c.check(norm(await text(p, tid('sheet-total'))) === fmt(expectedTotal('extra-virgin:500', 1)), 'total 500 ml x1 + RM 10', await text(p, tid('sheet-total')));
    const payLabel = norm(await text(p, tid('pay-hitpay')));
    c.check(payLabel.includes(fmt(expectedTotal('extra-virgin:500', 1))), `Pay button carries the total: "${payLabel}"`, payLabel);
    await (await p.$(tid('size-chip', '[data-sku="extra-virgin:250"]'))).click();
    await (await p.$(tid('qty-plus'))).click();
    await (await p.$(tid('qty-plus'))).click();
    c.check(norm(await text(p, tid('qty-value'))) === '3', 'qty stepper 3', await text(p, tid('qty-value')));
    c.check(norm(await text(p, tid('sheet-total'))) === fmt(expectedTotal('extra-virgin:250', 3)), 'total follows size + qty', await text(p, tid('sheet-total')));
    await (await p.$(tid('qty-minus'))).click();
    c.check(norm(await text(p, tid('qty-value'))) === '2', 'qty minus', await text(p, tid('qty-value')));
    // the sheet covers the screen on phones, a centred dialog on desktop; Pay is on screen
    const box = await p.$eval('[data-testid="buy-now-sheet"]', (e) => {
      const r = e.getBoundingClientRect();
      return { w: r.width, h: r.height, x: r.x, y: r.y };
    });
    if (c.vp.mobile) c.check(box.w >= c.vp.width - 1 && box.h >= c.vp.height - 2, 'phone: full-screen sheet', JSON.stringify(box));
    else c.check(box.w <= 560 && box.x > 100, 'desktop: centred dialog', JSON.stringify(box));
    const payBox = await p.$eval(tid('pay-hitpay'), (e) => e.getBoundingClientRect().bottom);
    c.check(payBox <= c.vp.height, 'Pay button visible without scrolling the page', `bottom ${payBox}`);
    const hscroll = await p.evaluate(() => {
      const d = document.querySelector('[data-testid="buy-now-sheet"]');
      return [...d.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > d.getBoundingClientRect().right + 1).length;
    });
    c.check(hscroll === 0, 'nothing sticks out of the sheet sideways', `${hscroll} elements`);
    c.check(!(await vis(p, 'a[aria-label="WhatsApp"].fixed, a.fixed[href^="https://wa.me/"]')), 'WhatsApp bubble hidden while the sheet is open');
    await sleep(450);
    await p.screenshot({ path: join(OUT, `sheet-${c.lang}-${c.vp.short}.png`) });
    c.check(c.errors.length === 0, 'no page errors', c.errors.slice(0, 3).join(' | '));
  },

  async history(c) {
    const p = c.page;
    if (!(await go(c, `/${c.lang}/products`))) return;
    const len0 = await p.evaluate(() => history.length);
    if (!(await openSheet(c))) return;
    c.check((await p.evaluate(() => history.length)) === len0 + 1, 'opening pushes ONE history entry', `${len0} -> ${await p.evaluate(() => history.length)}`);
    await p.goBack();
    c.check(await until(async () => !(await sheetOpen(p)), 4000), 'Back closes the sheet');
    c.check(p.url().endsWith(`/${c.lang}/products`), 'Back stays on the page', p.url());
    if (!(await openSheet(c))) return;
    await (await p.$(tid('buy-now-close'))).click();
    c.check(await until(async () => !(await sheetOpen(p)), 4000), 'close button closes');
    c.check(!(await p.evaluate(() => !!history.state?.buyNow)), 'close button went back over the sheet entry');
    if (!(await openSheet(c))) return;
    await p.keyboard.press('Escape');
    c.check(await until(async () => !(await sheetOpen(p)), 4000), 'Escape closes');
    // reload on the flagged entry must not reopen the sheet
    if (!(await openSheet(c))) return;
    await p.reload({ waitUntil: 'domcontentloaded' });
    await p.waitForSelector('body[data-app-ready="true"]').catch(() => {});
    await sleep(500);
    c.check(!(await sheetOpen(p)) && !(await p.evaluate(() => !!history.state?.buyNow)), 'reload: sheet closed, flag cleared');
    c.check(c.errors.length === 0, 'no page errors', c.errors.slice(0, 3).join(' | '));
  },

  async form(c) {
    const p = c.page;
    if (!(await go(c, `/${c.lang}/products`))) return;
    let taps = 0;
    if (!(await openSheet(c))) return;
    taps++;
    await tapPay(c);
    taps++;
    await sleep(300);
    c.check(await vis(p, tid('pay-error')), 'empty form: error summary shown (aria-live)', 'hidden');
    c.check((await p.evaluate(() => document.activeElement?.getAttribute('data-testid'))) === 'field-name', 'focus on the first problem (name)', await p.evaluate(() => document.activeElement?.getAttribute('data-testid')));
    c.check(await vis(p, tid('error-address')), 'address error shown');
    c.check(c.pay.creates.length === 0, 'nothing sent with an invalid form');
    c.check((await p.$eval(tid('pay-hitpay'), (e) => e.disabled)) === false, 'Pay is never disabled (M4)');
    await fill(c, { ...DETAILS, address: 'Lot 5' });
    await tapPay(c);
    await sleep(300);
    c.check(await vis(p, tid('error-address')), 'address under 10 characters refused (asks for area + city)');
    await fill(c, { address: DETAILS.address });
    await sleep(450);
    await p.screenshot({ path: join(OUT, `form-${c.lang}-${c.vp.short}.png`) });
    await tapPay(c);
    taps++;
    const left = await until(() => c.pay.hitpay.length > 0, 10000);
    c.check(!!left, 'redirect to the HitPay page', `creates ${c.pay.creates.length}`);
    const body = c.pay.creates.at(-1);
    c.check(body && body.lines?.length === 1 && body.lines[0].sku === 'extra-virgin:500' && body.lines[0].qty === 1, 'create: ONE line, sku + qty', JSON.stringify(body?.lines));
    c.check(body && Object.keys(body.details).sort().join() === 'address,name,phone,postcode,state', 'create: short form (no city, note, email)', JSON.stringify(Object.keys(body?.details ?? {})));
    c.check(body?.details?.phone === '60121234567' && body?.lang === c.lang && body?.site === 'av', 'create: phone normalised, lang, site');
    c.check(true, `new buyer: ${taps - 1} taps after the corrections (Buy now, Pay) + form fill; total taps incl. the empty try: ${taps}`);
    await go(c, `/${c.lang}/products`); // the page is on the HitPay stub now: read our origin's storage
    const stored = await p.evaluate(() => [localStorage.getItem('avo.details.v2'), localStorage.getItem('avo.draft.v1')]).catch(() => [null, null]);
    c.check(!!stored[0] && JSON.parse(stored[0]).values.address === DETAILS.address, 'details remembered (avo.details.v2)');
    c.check(!!stored[1] && !/Tester|0121234567|Jalan/.test(stored[1]), 'draft stored without personal data (avo.draft.v1)', stored[1]);
  },

  async returning(c) {
    const p = c.page;
    if (!(await go(c, `/${c.lang}/products`))) return;
    await p.evaluate((d) => localStorage.setItem('avo.details.v2', JSON.stringify({ savedAt: Date.now(), values: d })), DETAILS);
    if (!(await go(c, `/${c.lang}/products`))) return;
    if (!(await openSheet(c, 'organic'))) return;
    const name = await p.$eval(tid('field-name'), (e) => e.value);
    c.check(name === DETAILS.name, 'returning buyer: details prefilled', name);
    await tapPay(c);
    const left = await until(() => c.pay.hitpay.length > 0, 10000);
    c.check(!!left, 'returning buyer: Buy now -> Pay -> HitPay = 2 taps');
    const first = c.pay.creates.at(-1)?.idem;
    // back from HitPay, Pay again: same idem (same order)
    await go(c, `/${c.lang}/products`);
    if (!(await openSheet(c, 'organic'))) return;
    await tapPay(c);
    await until(() => c.pay.creates.length >= 2, 10000);
    c.check(c.pay.creates.length >= 2 && c.pay.creates.at(-1).idem === first, 'same order again within 20 min = same idem (B8)', `${first} vs ${c.pay.creates.at(-1)?.idem}`);
    await go(c, `/${c.lang}/products`);
    if (!(await openSheet(c, 'organic'))) return;
    await (await p.$(tid('qty-plus'))).click();
    await tapPay(c);
    await until(() => c.pay.creates.length >= 3, 10000);
    c.check(c.pay.creates.length >= 3 && c.pay.creates.at(-1).idem !== first, 'changed quantity = new idem', c.pay.creates.at(-1)?.idem);
  },

  async fees(c) {
    if (PAY !== 'mock') return c.nm('fee variants', 'needs --pay=mock');
    const p = c.page;
    for (const [fee, want] of [[0, c.lang === 'ms' ? 'Penghantaran percuma' : 'Free delivery'], [800, 'RM 8.00'], [1000, 'RM 10.00']]) {
      c.pay.fee = fee;
      if (!(await go(c, `/${c.lang}/products`))) return;
      if (!(await openSheet(c))) return;
      c.check(norm(await text(p, tid('sheet-delivery'))) === want, `fee ${fee}: "${want}"`, await text(p, tid('sheet-delivery')));
      c.check(norm(await text(p, tid('sheet-total'))) === fmt(ITEM['extra-virgin:500'].sen + fee), `fee ${fee}: total`, await text(p, tid('sheet-total')));
    }
    c.pay.fee = null;
    if (!(await go(c, `/${c.lang}/products`))) return;
    if (!(await openSheet(c))) return;
    c.check((await sheetState(p)) === 'closed', 'fee null: closed state');
    await (await p.$(tid('qty-plus'))).click();
    const href = await p.$eval(tid('closed-whatsapp'), (e) => e.href).catch(() => '');
    const msg = decodeURIComponent((/[?&]text=([^&]*)/.exec(href) ?? [])[1] ?? '');
    c.check(/601111119912/.test(href) && msg.includes('Extra Virgin 500 ml x 2'), `closed: WhatsApp link carries product + size + qty: "${msg}"`, href);
    c.check(!(await vis(p, tid('field-name'))) && !(await vis(p, tid('pay-hitpay'))), 'closed: no form, no Pay button');
    await sleep(450);
    await p.screenshot({ path: join(OUT, `closed-${c.lang}-${c.vp.short}.png`) });
    // a fee set later is seen on the NEXT open (no cache across opens)
    c.pay.fee = 1000;
    await (await p.$(tid('buy-now-close'))).click();
    await until(async () => !(await sheetOpen(p)), 3000);
    if (!(await openSheet(c))) return;
    c.check((await sheetState(p)) === 'open', 'next open asks again: open now');
  },

  async mismatch(c) {
    if (PAY !== 'mock') return c.nm('total mismatch', 'needs --pay=mock');
    const p = c.page;
    if (!(await go(c, `/${c.lang}/products`))) return;
    await p.evaluate((d) => localStorage.setItem('avo.details.v2', JSON.stringify({ savedAt: Date.now(), values: d })), DETAILS);
    c.pay.serverFee = 1500; // the panel changed the fee after the sheet fetched it
    if (!(await openSheet(c))) return;
    await tapPay(c);
    await until(() => c.pay.creates.length > 0, 8000);
    await sleep(400);
    c.check(c.pay.hitpay.length === 0, 'server total differs: NO redirect');
    const err = norm(await text(p, tid('pay-error')));
    const want = fmt(ITEM['extra-virgin:500'].sen + 1500);
    c.check(err.includes(want), `new total shown: "${err}"`, err);
    c.check(norm(await text(p, tid('pay-hitpay'))).includes(want), 'Pay button shows the new total');
    await sleep(450);
    await p.screenshot({ path: join(OUT, `mismatch-${c.lang}-${c.vp.short}.png`) });
    await tapPay(c);
    c.check(!!(await until(() => c.pay.hitpay.length > 0, 8000)), 'second tap (total now matches) redirects');
  },

  async paid(c) {
    const p = c.page;
    if (PAY === 'mock') {
      c.pay.lastRef = `AV-${mytDay()}-WALK`;
      c.pay.lastToken = '0123456789abcdef0123456789abcdef';
      c.pay.last = { sku: 'organic:250', qty: 3 };
      c.pay.status = 'failed';
      if (!(await go(c, `/${c.lang}/order/paid?ref=${c.pay.lastRef}&t=${c.pay.lastToken}`))) return;
      await until(async () => (await p.$eval(tid('paid-page'), (e) => e.getAttribute('data-status'))) === 'failed', 8000);
      await (await p.$(tid('paid-retry'))).click();
      c.check(!!(await until(() => sheetOpen(p), 8000)), 'failed: Try again reopens the Buy-now sheet');
      await until(async () => (await sheetState(p)) !== 'loading', 6000);
      const chip = await p.$eval(tid('size-chip', '[aria-checked="true"]'), (e) => e.getAttribute('data-sku')).catch(() => null);
      c.check(chip === 'organic:250' && norm(await text(p, tid('qty-value'))) === '3', 'same product, size and quantity', `${chip} x ${await text(p, tid('qty-value'))}`);
      c.pay.status = 'paid';
      if (!(await go(c, `/${c.lang}/order/paid?ref=${c.pay.lastRef}&t=${c.pay.lastToken}`))) return;
      await until(async () => (await p.$eval(tid('paid-page'), (e) => e.getAttribute('data-status'))) === 'paid', 8000);
      const line = norm(await text(p, tid('paid-line')));
      c.check(line === `${NAMES[c.lang].organic} 250 ml x 3`, `paid summary line "${line}"`, line);
      c.check(norm(await text(p, tid('paid-total'))) === fmt(6900 * 3 + FEE), 'paid total', await text(p, tid('paid-total')));
      await sleep(450);
      await p.screenshot({ path: join(OUT, `paid-${c.lang}-${c.vp.short}.png`) });
    } else {
      if (!(await go(c, `/${c.lang}/products`))) return;
      await p.evaluate((d) => localStorage.setItem('avo.details.v2', JSON.stringify({ savedAt: Date.now(), values: d })), DETAILS);
      if (!(await openSheet(c, 'blackseed'))) return;
      await tapPay(c);
      c.check(!!(await until(() => c.pay.hitpay.length > 0, 15000)), 'real server: create -> HitPay stub url');
      await go(c, `/${c.lang}/products`); // back on our origin (the page is on the HitPay stub)
      const draft = await p.evaluate(() => JSON.parse(localStorage.getItem('avo.draft.v1') ?? 'null'));
      c.check(!!draft?.ref && !!draft?.token, 'draft holds ref + token from the server', JSON.stringify(draft));
      c.check(stubPayNewest(), 'stub request marked paid');
      if (!(await go(c, `/${c.lang}/order/paid?ref=${draft.ref}&t=${draft.token}`))) return;
      const st = await until(async () => {
        const s = await p.$eval(tid('paid-page'), (e) => e.getAttribute('data-status'));
        return s === 'paid' ? s : null;
      }, 20000);
      c.check(st === 'paid', 'paid page: paid (verified by the server against the stub)');
      c.check(norm(await text(p, tid('paid-total'))) === fmt(7500 + FEE), 'paid total RM 75 + RM 10', await text(p, tid('paid-total')));
      const after = await p.evaluate(() => localStorage.getItem('avo.draft.v1'));
      c.check(after === null, 'paid: the draft is cleared');
      await sleep(450);
      await p.screenshot({ path: join(OUT, `paid-server-${c.lang}-${c.vp.short}.png`) });
    }
  },

  async review(c) {
    if (PAY !== 'mock') return c.nm('review fixes', 'needs --pay=mock');
    const p = c.page;
    // 5. config failure is not "closed": message + Retry (+ WhatsApp), Retry recovers
    c.pay.configFail = true;
    if (!(await go(c, `/${c.lang}/products`))) return;
    if (!(await openSheet(c))) return;
    c.check((await sheetState(p)) === 'error', 'config 500: error state, not closed', await sheetState(p));
    c.check((await vis(p, tid('pay-config-retry'))) && (await vis(p, tid('closed-whatsapp'))), 'Retry button + WhatsApp link shown');
    c.check(!(await vis(p, tid('pay-hitpay'))), 'no Pay button while the config is unknown');
    await sleep(450);
    await p.screenshot({ path: join(OUT, `config-error-${c.lang}-${c.vp.short}.png`) });
    c.pay.configFail = false;
    c.errors.length = 0; // the 500 above was forced on purpose
    await (await p.$(tid('pay-config-retry'))).click();
    c.check(!!(await until(async () => (await sheetState(p)) === 'open', 6000)), 'Retry loads the config: open');
    // 8. a press that starts inside the sheet and ends on the backdrop does not close it
    if (!c.vp.mobile) {
      const box = await p.$eval(tid('field-name'), (e) => { const r = e.getBoundingClientRect(); return { x: r.x + 20, y: r.y + r.height / 2 }; });
      await p.mouse.move(box.x, box.y);
      await p.mouse.down();
      await p.mouse.move(20, 20, { steps: 4 });
      await p.mouse.up();
      await sleep(200);
      c.check(await sheetOpen(p), 'drag from a field onto the backdrop: still open');
      await p.mouse.click(20, 20);
      c.check(!!(await until(async () => !(await sheetOpen(p)), 3000)), 'a real tap on the backdrop closes');
    } else c.nm('backdrop drag', 'no backdrop on a full-screen phone sheet');
    // 4. Forward onto the sheet's entry: no flagged entry without a sheet
    if (!(await go(c, `/${c.lang}/products`))) return;
    if (!(await openSheet(c))) return;
    await p.goBack();
    await until(async () => !(await sheetOpen(p)), 3000);
    await p.goForward();
    await sleep(400);
    c.check(!(await sheetOpen(p)) && !(await p.evaluate(() => !!history.state?.buyNow)), 'Forward: sheet stays closed, flag stripped');
    // 6. dismissed while create runs: no redirect
    await p.evaluate((d) => localStorage.setItem('avo.details.v2', JSON.stringify({ savedAt: Date.now(), values: d })), DETAILS);
    if (!(await go(c, `/${c.lang}/products`))) return;
    if (!(await openSheet(c))) return;
    c.pay.createDelay = 1500;
    await tapPay(c);
    await sleep(200);
    await (await p.$(tid('buy-now-close'))).click();
    await sleep(2500);
    c.check(c.pay.creates.length === 1 && c.pay.hitpay.length === 0, 'closed during create: no redirect to HitPay', `creates ${c.pay.creates.length}, hitpay ${c.pay.hitpay.length}`);
    c.check(!(await sheetOpen(p)), 'sheet stays closed');
    c.pay.createDelay = 0;
    // 7. total mismatch asks the config again
    const before = c.pay.configCalls;
    c.pay.serverFee = 1500;
    if (!(await openSheet(c))) return;
    await tapPay(c);
    await until(() => c.pay.configCalls >= before + 2, 6000);
    c.check(c.pay.configCalls >= before + 2, 'mismatch: config fetched again', `${before} -> ${c.pay.configCalls}`);
    c.pay.serverFee = null;
    c.check(c.errors.length === 0, 'no page errors', c.errors.slice(0, 3).join(' | '));
  },

  async storage(c) {
    const p = c.page;
    if (!(await go(c, `/${c.lang}`))) return;
    await p.evaluate(() => {
      localStorage.setItem('avo.cart.v1', '{"lines":[{"sku":"organic:250","qty":2}]}');
      localStorage.setItem('avo.order.v1', '{"details":{"name":"x"}}');
      localStorage.setItem('avo.details.v1', '{"savedAt":1,"values":{}}');
      sessionStorage.setItem('avo.cartOpened', '1');
    });
    if (!(await go(c, `/${c.lang}`))) return;
    await sleep(300);
    const left = await p.evaluate(() => ['avo.cart.v1', 'avo.order.v1', 'avo.details.v1'].filter((k) => localStorage.getItem(k) !== null).concat(sessionStorage.getItem('avo.cartOpened') ? ['avo.cartOpened'] : []));
    c.check(left.length === 0, 'old cart / order / details keys deleted on load (B5)', left.join(','));
  },
};

// ------------------------------------------------------------------ run
console.log(`buynow-walk: ${BASE} pay=${PAY} langs=${LANGS.join(',')} viewports=${VIEWPORTS.map((v) => v.short).join(',')} out=${OUT}`);
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
try {
  for (const section of SECTION_NAMES) {
    if (onlySet.size && !onlySet.has(section)) continue;
    for (const lang of LANGS) {
      for (const vp of VIEWPORTS) {
        const c = await makeCtx(browser, section, lang, vp);
        try {
          await SECTIONS[section](c);
        } catch (e) {
          record('FAIL', `[${section} ${lang} ${vp.short}] section crashed`, String(e?.stack ?? e).split('\n').slice(0, 3).join(' | '));
        } finally {
          await c.close();
        }
      }
    }
  }
} finally {
  await browser.close();
}
console.log(`walk: ${nPass} pass, ${nFail} fail, ${nNm} not measured`);
process.exit(nFail ? 1 : 0);
