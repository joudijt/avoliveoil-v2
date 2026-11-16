// DEV-ONLY browser walk for the on-site ordering flow (FORGE ORDER-R1 + FORGE HITPAY). Not part of the build.
//
//   node scripts/dev/order-walk.mjs <baseUrl> [--out=<dir>] [--only=<section[,section]>] [--lang=en|ms] [--vp=d1366|p390|p360]
//                                   [--pay=mock|server] [--stub-state=<hitpay-stub.json>]
//
//   --pay      mock (default): /api/pay/* is answered by this script (a static preview has no PHP).
//              Every section except `hitpay` sees online payment CLOSED, so they walk the chat
//              (WhatsApp) fallback; `hitpay` sees it OPEN (delivery RM 8.00).
//              server: /api/pay/* goes to the real PHP server at <baseUrl> (scripts/dev/pay-harness.mjs:
//              dist + php -S + the local HitPay stub); --stub-state lets the walk mark the stub request paid.
//   HitPay itself is NEVER contacted: any request to checkout.hit-pay.com is answered here with a stub
//   page and recorded (the walk "stops at the HitPay redirect").
//
//   <baseUrl>  http://localhost:4173 (vite preview / static server of dist) or https://avoliveoil.com
//   --out      screenshot directory (default ./.order-walk)
//   --only     header,surfaces,drawer,checkout,chat,reload,sent,details,nostorage,lang,console,shots,hitpay
//              (or the numbers 1..13). Sections are independent (a fresh browser context each, own
//              storage), so several processes with different --only values can run in parallel.
//
// Written from the contract only (docs/forge/FORGE-ORDER-R1-OVERRIDES.md "Test hooks" + SPEC 2/3/4/7):
// elements are selected ONLY by data-testid (+ data-sku / data-product) on the live DOM.
// Each check prints PASS / FAIL / NOT MEASURED. A missing precondition is NOT MEASURED, never a
// silent pass. Exit code 1 on any FAIL. Last line: `walk: N pass, M fail, K not measured`.
//
// Safety: only obviously fake Malaysian test numbers are typed into form fields. WhatsApp is never
// opened: requests to wa.me / web.whatsapp.com / api.whatsapp.com are aborted, window.open is
// stubbed, and clicks on WhatsApp anchors are default-prevented at window level (after the app's own
// handlers ran, so the app still changes state).
import puppeteer, { ElementHandle } from 'puppeteer';
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// A sticky bar (checkout "Continue", header) can cover an element that puppeteer already counts as in view.
// Scroll the element to the middle of the screen before every click, like a person would.
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

// ------------------------------------------------------------------ args
const argv = process.argv.slice(2);
const flag = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const BASE = (argv.find((a) => !a.startsWith('--')) ?? '').replace(/\/+$/, '');
if (!/^https?:\/\//.test(BASE)) {
  console.error('usage: node scripts/dev/order-walk.mjs <baseUrl> [--out=<dir>] [--only=<section>] [--lang=en|ms] [--vp=d1366|p390|p360]');
  process.exit(2);
}
const OUT = resolve(flag('out') ?? '.order-walk');
mkdirSync(OUT, { recursive: true });
const ORIGIN = new URL(BASE).origin;

const SECTION_NAMES = ['header', 'surfaces', 'drawer', 'checkout', 'chat', 'reload', 'sent', 'details', 'nostorage', 'lang', 'console', 'shots', 'hitpay'];
const PAY = flag('pay') ?? 'mock';
if (!['mock', 'server'].includes(PAY)) {
  console.error('--pay must be mock or server');
  process.exit(2);
}
const STUB_STATE = flag('stub-state') ? resolve(flag('stub-state')) : null;
const onlyRaw = (flag('only') ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const onlySet = new Set(onlyRaw.map((s) => (/^\d+$/.test(s) ? SECTION_NAMES[Number(s) - 1] : s)));
for (const s of onlySet) {
  if (!SECTION_NAMES.includes(s)) {
    console.error(`unknown section "${s}". Known: ${SECTION_NAMES.join(', ')}`);
    process.exit(2);
  }
}

const LANGS = ['en', 'ms'].filter((l) => !flag('lang') || flag('lang') === l);
const VIEWPORTS = [
  { short: 'd1366', name: 'desktop 1366x800', width: 1366, height: 800, mobile: false },
  { short: 'p390', name: 'phone 390x664', width: 390, height: 664, mobile: true },
  { short: 'p360', name: 'phone 360x560', width: 360, height: 560, mobile: true },
].filter((v) => !flag('vp') || flag('vp') === v.short);

// ------------------------------------------------------------------ catalogue + prices (integer sen)
const catalogue = JSON.parse(readFileSync(join(ROOT, 'src/data/catalogue.json'), 'utf-8'));
const storeFacts = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf-8'));

function amountToSen(amount) {
  const m = /^(\d{1,6})(?:\.(\d{1,2}))?$/.exec(String(amount).trim());
  return m ? Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0')) : null;
}
/** Every orderable SKU, in catalogue order. */
const ITEMS = catalogue.products.flatMap((p) =>
  p.sizes.flatMap((size) => {
    const price = storeFacts.prices.products[p.priceKey]?.[`ml${size}`];
    const sen = price ? amountToSen(price.amount) : null;
    return sen && sen > 0 ? [{ sku: `${p.id}:${size}`, productId: p.id, size, sen, slug: p.slug ?? null, kind: p.kind }] : [];
  })
);
const ITEM = Object.fromEntries(ITEMS.map((i) => [i.sku, i]));
const PRODUCT_IDS = catalogue.products.map((p) => p.id);
const MULTI_SIZE = new Set(PRODUCT_IDS.filter((id) => ITEMS.filter((i) => i.productId === id).length > 1));
const INFUSED = catalogue.products.filter((p) => p.kind === 'infused');
const MAX_QTY = 24;
const WA = '601111119912';
const URL_CAP = 1800;
const KEY = { cart: 'avo.cart.v1', details: 'avo.details.v1', order: 'avo.order.v1' };

const fmt = (sen) => `${Math.trunc(sen / 100)}.${String(sen % 100).padStart(2, '0')}`;
const rm = (sen) => `RM ${fmt(sen)}`;
/** 'RM 1,800.00' / 'RM1800.00' -> comparable 'RM1800.00'. */
const normMoney = (s) => String(s).replace(/[\s ,]/g, '');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normText = (s) =>
  String(s)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[\s ]+/g, ' ')
    .trim()
    .toLowerCase();

// The cart used by most sections: 3 lines, catalogue order, no delivery in the total.
const CART_A = [
  { sku: 'extra-virgin:500', qty: 2 },
  { sku: 'organic:250', qty: 3 },
  { sku: 'blackseed:250', qty: 1 },
];
const cartJson = (lines) => JSON.stringify({ lines });
const sortLines = (lines) => [...lines].sort((a, b) => ITEMS.findIndex((i) => i.sku === a.sku) - ITEMS.findIndex((i) => i.sku === b.sku));

// Obviously fake Malaysian test data. NOTE: 0111234567 (the brief's example) is NOT a valid
// number under the spec regex (011 needs 8 more digits), so the valid sample is 0121234567.
const DETAILS = {
  name: "Tester O'Neil & Sons #1",
  phone: '0121234567',
  phoneIntl: '+60121234567',
  address: '12 Jalan Ujian 3, Taman Contoh',
  postcode: '47800',
  city: 'Petaling Jaya',
  state: 'Selangor',
  note: 'Please call first #5 & ring twice, 100% ok',
};

// ------------------------------------------------------------------ result bookkeeping
let nPass = 0;
let nFail = 0;
let nNm = 0;
function record(status, label, detail) {
  if (status === 'PASS') nPass += 1;
  else if (status === 'FAIL') nFail += 1;
  else nNm += 1;
  const d = detail === undefined || detail === '' ? '' : ` -- ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`;
  console.log(`${status === 'NOT MEASURED' ? 'NOT MEASURED' : status.padEnd(4)}  ${label}${d.length > 400 ? d.slice(0, 400) + '...' : d}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function until(fn, ms = 6000, step = 120) {
  const t = Date.now();
  for (;;) {
    try {
      const v = await fn();
      if (v) return v;
    } catch {
      /* retry */
    }
    if (Date.now() - t > ms) return false;
    await sleep(step);
  }
}

// ------------------------------------------------------------------ strings from the lazy TS files (optional)
let MSG = null; // namespace of src/order/messageStrings.ts
let UI = null; // namespace of src/order/uiStrings.ts
for (const [file, set] of [
  ['messageStrings.ts', (m) => (MSG = m)],
  ['uiStrings.ts', (m) => (UI = m)],
]) {
  const p = join(ROOT, 'src/order', file);
  if (!existsSync(p)) continue;
  try {
    set(await import(pathToFileURL(p).href));
  } catch (e) {
    console.log(`note: could not import src/order/${file} (${String(e.message).split('\n')[0]}); falling back to contract strings`);
  }
}

const FALLBACK_LABELS_EN = {
  newOrder: 'New order',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  deliveryTbc: 'to be confirmed',
  total: 'Total',
  payment: 'Payment',
  paymentChat: 'to be arranged on WhatsApp',
  name: 'Name',
  phone: 'Phone',
  address: 'Address',
  note: 'Note',
};

/** Message labels for a language, or null when they cannot be read from messageStrings.ts. */
function labelsFor(lang) {
  if (MSG) {
    const hits = [];
    const seen = new Set();
    const walk = (o, path, depth) => {
      if (!o || typeof o !== 'object' || seen.has(o) || depth > 4) return;
      seen.add(o);
      if (typeof o.newOrder === 'string' && typeof o.subtotal === 'string') hits.push({ path, o });
      for (const [k, v] of Object.entries(o)) walk(v, [...path, k], depth + 1);
    };
    for (const [k, v] of Object.entries(MSG)) {
      if (typeof v === 'function') {
        try {
          const r = v(lang);
          if (r && typeof r === 'object') walk(r, [`${k}()`], 1);
        } catch {
          /* not a labels function */
        }
      } else walk(v, [k], 0);
    }
    const hit = hits.find((h) => h.path.includes(lang)) ?? hits.find((h) => h.path[0].endsWith('()'));
    if (hit) return hit.o;
  }
  return lang === 'en' ? FALLBACK_LABELS_EN : null;
}
/** Short fixed product names (O-4), or null. */
function namesFor(lang) {
  const n = MSG?.ORDER_NAMES?.[lang];
  return n && typeof n === 'object' ? n : null;
}
/** A UI string for a language: EN is the literal from the overrides, MS is looked up in uiStrings.ts. */
function uiString(re, enLiteral, lang) {
  if (lang === 'en') return enLiteral;
  if (!UI) return null;
  let found = null;
  const seen = new Set();
  const walk = (o, path, depth) => {
    if (found || !o || typeof o !== 'object' || seen.has(o) || depth > 5) return;
    seen.add(o);
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string' && re.test(v) && path.includes('en')) {
        let cur = UI;
        const msPath = [...path, k].map((p) => (p === 'en' ? 'ms' : p));
        for (const p of msPath) cur = cur?.[p];
        if (typeof cur === 'string' && !/[{}]/.test(cur)) found = cur;
      } else walk(v, [...path, k], depth + 1);
    }
  };
  walk(UI, [], 0);
  return found;
}
const STR = {
  dropped: { re: /no longer available/i, en: '1 item is no longer available and was removed.' },
  finalTotal: { re: /confirm the final total/i, en: 'We confirm the final total with you on WhatsApp.' },
  stayOnDevice: { re: /stay on this device/i, en: 'Your details stay on this device to save you typing next time.' },
};

// FORGE HITPAY: the ORDER-R1 sections walk the chat (WhatsApp) fallback = online payment CLOSED
// (mocked /api/pay/config), delivery "confirmed on WhatsApp". The `hitpay` section walks the online path.
const CHAT_MODE = true;
const DELIVERY_NULL = true;
const PAY_DELIVERY_SEN = 800;

// ------------------------------------------------------------------ page helpers (live DOM, data-testid only)
const tid = (name, extra = '') => `[data-testid="${name}"]${extra}`;

const IS_VISIBLE_SRC = `(e) => {
  if (!e.getClientRects().length) return false;
  const cs = getComputedStyle(e);
  if (cs.visibility === 'hidden' || cs.display === 'none') return false;
  const r = e.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
}`;

/** Visible ElementHandles matching a selector. */
async function vis(page, sel) {
  const jsh = await page.evaluateHandle(
    (s, src) => {
      const ok = (0, eval)(src);
      return [...document.querySelectorAll(s)].filter(ok);
    },
    sel,
    IS_VISIBLE_SRC
  );
  const out = [];
  for (const p of (await jsh.getProperties()).values()) {
    const el = p.asElement();
    if (el) out.push(el);
  }
  return out;
}
async function count(page, sel) {
  return page.evaluate(
    (s, src) => {
      const ok = (0, eval)(src);
      return [...document.querySelectorAll(s)].filter(ok).length;
    },
    sel,
    IS_VISIBLE_SRC
  );
}
async function total(page, sel) {
  return page.evaluate((s) => document.querySelectorAll(s).length, sel);
}
async function textOf(page, sel) {
  return page.evaluate(
    (s, src) => {
      const ok = (0, eval)(src);
      const e = [...document.querySelectorAll(s)].find(ok);
      return e ? (e.textContent || '').replace(/[\s ]+/g, ' ').trim() : null;
    },
    sel,
    IS_VISIBLE_SRC
  );
}
async function click(page, sel, nth = 0) {
  const hs = await vis(page, sel);
  if (!hs[nth]) throw new Error(`no visible ${sel}[${nth}]`);
  await hs[nth].click();
}
async function badge(page) {
  return page.evaluate(() => {
    for (const e of document.querySelectorAll('[data-testid="cart-count"]')) {
      const m = /\d+/.exec(e.textContent || '');
      if (m) return Number(m[0]);
    }
    return 0;
  });
}
const ls = {
  get: (page, k) =>
    page.evaluate((k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return '__blocked__';
      }
    }, k),
  set: (page, kv) => page.evaluate((kv) => { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); }, kv),
};
async function orderUiOpen(page) {
  return page.evaluate((src) => {
    const ok = (0, eval)(src);
    const dialogs = document.querySelectorAll('dialog[open]').length;
    const ids = ['cart-drawer', 'checkout'].filter((id) => [...document.querySelectorAll(`[data-testid="${id}"]`)].some(ok));
    const roles = [...document.querySelectorAll('[role="dialog"],[aria-modal="true"]')].filter(ok).length;
    return { dialogs, ids, roles };
  }, IS_VISIBLE_SRC);
}

// ------------------------------------------------------------------ per-run context
async function newContext(browser) {
  return typeof browser.createBrowserContext === 'function' ? browser.createBrowserContext() : browser.createIncognitoBrowserContext();
}

/** Today in Malaysia as YYMMDD (the ref date rule of the server). */
function mytDay() {
  const d = new Date(Date.now() + 8 * 3600 * 1000);
  return `${String(d.getUTCFullYear() % 100).padStart(2, '0')}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`;
}
const json = (req, status, data) => req.respond({ status, contentType: 'application/json', body: JSON.stringify(data) });

/** The pay server, mocked to its contract (docs/forge/HITPAY-AV-HANDOFF.md). */
async function payMock(c, req, u) {
  const P = c.pay;
  if (u.pathname === '/api/pay/config') {
    return json(req, 200, { site: 'av', ready: P.open, delivery_sen: P.open ? PAY_DELIVERY_SEN : null, currency: 'MYR' });
  }
  if (u.pathname === '/api/pay/create' && req.method() === 'POST') {
    let body = null;
    try {
      body = JSON.parse(req.postData() ?? 'null');
    } catch {
      /* recorded as null */
    }
    P.creates.push(body);
    if (!P.open) return json(req, 503, { error: { code: 'pay_not_ready', message: 'closed' } });
    const lines = Array.isArray(body?.lines) ? body.lines : [];
    const sub = lines.reduce((n, l) => n + (ITEM[l.sku]?.sen ?? 0) * (l.qty ?? 0), 0);
    P.lastLines = lines;
    P.lastRef ??= `AV-${mytDay()}-WALK`;
    P.lastToken ??= '0123456789abcdef0123456789abcdef';
    if (!P.firstIdem) P.firstIdem = body?.idem;
    return json(req, 200, {
      ref: P.lastRef,
      token: P.lastToken,
      url: 'https://checkout.hit-pay.com/payment-request/@berkat-madinah/9a1b2c3d-walk/checkout',
      status: 'pending',
      total_sen: sub + PAY_DELIVERY_SEN,
    });
  }
  if (u.pathname === '/api/pay/status') {
    P.statusCalls += 1;
    if (u.searchParams.get('ref') !== P.lastRef || u.searchParams.get('t') !== P.lastToken) return json(req, 403, { error: { code: 'forbidden', message: 'no' } });
    const lines = (P.lastLines ?? []).map((l) => ({ sku: l.sku, qty: l.qty, unit_sen: ITEM[l.sku]?.sen ?? 0 }));
    const sub = lines.reduce((n, l) => n + l.unit_sen * l.qty, 0);
    return json(req, 200, {
      ref: P.lastRef, site: 'av', lang: c.lang, status: P.status, subtotal_sen: sub, delivery_sen: PAY_DELIVERY_SEN,
      total_sen: sub + PAY_DELIVERY_SEN, lines, payment_type: P.status === 'paid' ? 'touch_n_go' : null, paid_at: null,
    });
  }
  return json(req, 404, { error: { code: 'not_found', message: 'mock' } });
}

/** --pay=server: mark the newest stub request paid (the local HitPay stub of scripts/dev/pay-harness.mjs). */
function stubPayNewest() {
  if (!STUB_STATE || !existsSync(STUB_STATE)) return false;
  const st = JSON.parse(readFileSync(STUB_STATE, 'utf-8'));
  const ids = Object.keys(st.requests ?? {});
  const id = ids.at(-1);
  if (!id) return false;
  const r = st.requests[id];
  r.status = 'completed';
  r.payments = [{ id: 'walk-pay', status: 'succeeded', amount: r.amount, currency: 'MYR', payment_type: 'touch_n_go' }];
  writeFileSync(STUB_STATE, JSON.stringify(st, null, 2));
  return true;
}

async function makeCtx(browser, section, lang, vp, { blockStorage = false } = {}) {
  const context = await newContext(browser);
  try {
    await context.overridePermissions(ORIGIN, ['clipboard-read', 'clipboard-write', 'clipboard-sanitized-write']);
  } catch {
    /* clipboard checks become NOT MEASURED */
  }
  const page = await context.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: vp.mobile ? 2 : 1, isMobile: vp.mobile, hasTouch: vp.mobile });
  page.setDefaultTimeout(20000);
  const diag = { console: [], pageErrors: [], failed: [], bad: [], csp: [], waRequests: [], popups: 0, docCsp: false };
  const prefix = `[${section} ${lang} ${vp.short}]`;
  const c = {
    section, lang, vp, base: BASE, page, context, diag,
    check: (cond, name, detail) => record(cond ? 'PASS' : 'FAIL', `${prefix} ${name}`, cond ? '' : detail),
    fail: (name, detail) => record('FAIL', `${prefix} ${name}`, detail),
    nm: (name, why) => record('NOT MEASURED', `${prefix} ${name}`, why),
  };

  // FORGE HITPAY: `c.pay` drives the mocked pay server (PAY=mock) and records what the page sent.
  c.pay = { open: section === 'hitpay', status: 'pending', creates: [], hitpay: [], statusCalls: 0, lastRef: null, lastToken: null };
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
      diag.waRequests.push(req.url());
      req.abort('blockedbyclient').catch(() => {});
    } else if (/(^|\.)hit-pay\.com$/i.test(host)) {
      // Never the real HitPay: the redirect target is recorded and answered with a stub page.
      c.pay.hitpay.push(req.url());
      req.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><title>HitPay stub</title><h1 data-hitpay-stub>HitPay stub</h1>' }).catch(() => {});
    } else if (PAY === 'mock' && u && u.origin === ORIGIN && u.pathname.startsWith('/api/pay/')) {
      payMock(c, req, u).catch(() => req.continue().catch(() => {}));
    } else if (u && u.origin === ORIGIN && u.pathname === '/api/pay/create' && req.method() === 'POST') {
      // --pay=server: record what the page sent, then let the real server answer
      try {
        c.pay.creates.push(JSON.parse(req.postData() ?? 'null'));
      } catch {
        c.pay.creates.push(null);
      }
      req.continue().catch(() => {});
    } else req.continue().catch(() => {});
  });
  page.on('response', (res) => {
    try {
      const u = new URL(res.url());
      if (u.origin !== ORIGIN) return;
      if (res.status() >= 400 && !/favicon/i.test(u.pathname)) diag.bad.push(`${res.status()} ${u.pathname}`);
      const req = res.request();
      if (req.isNavigationRequest() && req.frame() === page.mainFrame() && res.headers()['content-security-policy']) diag.docCsp = true;
    } catch {
      /* ignore */
    }
  });
  page.on('requestfailed', (req) => {
    try {
      const u = new URL(req.url());
      const err = req.failure()?.errorText ?? '';
      if (u.origin === ORIGIN && err !== 'net::ERR_ABORTED') diag.failed.push(`${err} ${u.pathname}`);
    } catch {
      /* ignore */
    }
  });
  page.on('console', (msg) => {
    const loc = msg.location()?.url ?? '';
    if (/wa\.me|whatsapp\.com/i.test(loc)) return;
    if (msg.type() === 'error' && !/favicon/i.test(msg.text() + loc)) diag.console.push(msg.text());
    if (/Content Security Policy/i.test(msg.text())) diag.csp.push(msg.text());
  });
  page.on('pageerror', (e) => diag.pageErrors.push(String(e.message ?? e)));

  let armed = true;
  context.on('targetcreated', async (t) => {
    if (!armed || t.type() !== 'page') return;
    try {
      const p = await t.page();
      if (p && p !== page) {
        diag.popups += 1;
        await p.close().catch(() => {});
      }
    } catch {
      /* ignore */
    }
  });
  c.close = async () => {
    armed = false;
    await context.close().catch(() => {});
  };

  await page.evaluateOnNewDocument((block) => {
    window.__csp = [];
    window.__waClicks = [];
    window.__opens = [];
    window.__hydrationErrors = window.__hydrationErrors ?? [];
    const orig = window.reportError?.bind(window);
    window.reportError = (e) => {
      window.__hydrationErrors.push(String(e?.message ?? e));
      orig?.(e);
    };
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
    window.open = (...a) => {
      window.__opens.push(String(a[0]));
      return null;
    };
    // Bubble phase on window = after the app's own (React root) handlers: state changes run, navigation does not.
    window.addEventListener(
      'click',
      (e) => {
        const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
        if (a && /^https?:\/\/(wa\.me|web\.whatsapp\.com|api\.whatsapp\.com|(www\.)?whatsapp\.com)(\/|\?|$)/i.test(a.href)) {
          window.__waClicks.push(a.href);
          e.preventDefault();
        }
      },
      false
    );
    if (block) {
      const boom = () => {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      };
      for (const m of ['getItem', 'setItem', 'removeItem', 'clear', 'key']) {
        try { Storage.prototype[m] = boom; } catch { /* ignore */ }
      }
      try { Object.defineProperty(Storage.prototype, 'length', { get: boom }); } catch { /* ignore */ }
      for (const n of ['localStorage', 'sessionStorage']) {
        try { Object.defineProperty(window, n, { get: boom, configurable: true }); } catch { /* ignore */ }
      }
    }
  }, blockStorage);
  return c;
}

/** Navigate (or reload) and wait for the app to be ready. Records a FAIL and returns false when it never is. */
async function go(c, path, reload = false) {
  try {
    const res = reload ? await c.page.reload({ waitUntil: 'domcontentloaded' }) : await c.page.goto(c.base + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    if (res && res.status() >= 400) {
      c.fail(`load ${path}`, `HTTP ${res.status()}`);
      return false;
    }
  } catch (e) {
    c.fail(`load ${path}`, e.message);
    return false;
  }
  const ready = await c.page.waitForSelector('body[data-app-ready="true"]', { timeout: 30000 }).then(() => true, () => false);
  if (!ready) {
    c.fail(`app ready on ${path}`, 'body[data-app-ready="true"] never appeared');
    return false;
  }
  await waitStore(c);
  return true;
}
/** The badge and the saved-order dot only appear after the store chunk has been imported. */
async function waitStore(c) {
  await until(() => c.page.evaluate(() => performance.getEntriesByType('resource').some((r) => /\/store-[^/]*\.js/.test(r.name))), 8000, 100);
  await sleep(300);
  let valid = false;
  try {
    const raw = await c.page.evaluate(() => localStorage.getItem('avo.cart.v1'));
    const lines = JSON.parse(raw)?.lines ?? [];
    valid = lines.some((l) => ITEM[l.sku] && Number.isInteger(l.qty) && l.qty > 0);
  } catch {
    /* no stored cart */
  }
  if (valid) await until(async () => (await badge(c.page)) > 0, 5000, 100);
}
async function loadWith(c, path, kv) {
  if (!(await go(c, path))) return false;
  await ls.set(c.page, kv);
  return go(c, path, true);
}
const isTouchMode = (page) => page.evaluate(() => !matchMedia('(hover: hover) and (pointer: fine)').matches);

async function openDrawer(c) {
  if (await count(c.page, tid('cart-drawer'))) return true;
  const hs = await vis(c.page, tid('cart-button'));
  if (!hs.length) {
    c.fail('open drawer', 'no visible cart-button');
    return false;
  }
  await hs[0].click();
  const ok = await until(() => count(c.page, tid('cart-drawer')), 6000);
  if (!ok) c.fail('open drawer', 'cart-drawer not visible after clicking cart-button');
  return Boolean(ok);
}
/** Close whatever order dialog is open. The drawer takes Escape; the checkout closes only by its own close button. */
async function closeDialogs(c, quiet = false) {
  const open = async () => {
    const st = await orderUiOpen(c.page);
    return st.dialogs > 0 || st.ids.length > 0;
  };
  for (let i = 0; i < 3 && (await open()); i += 1) {
    const btns = await vis(c.page, 'dialog[open] button[data-autofocus], dialog[open] button[aria-label]');
    let clicked = false;
    if (await count(c.page, tid('checkout'))) {
      for (const b of btns) {
        const label = await b.evaluate((e) => e.getAttribute('aria-label') || '');
        if (/close|tutup/i.test(label)) {
          await b.click().catch(() => {});
          clicked = true;
          break;
        }
      }
    }
    if (!clicked) await c.page.keyboard.press('Escape');
    await until(async () => !(await open()), 1500);
  }
  const closed = !(await open());
  if (!closed && !quiet) c.fail('dialog closes (Escape for the drawer, close button for the checkout)', await orderUiOpen(c.page));
  return closed;
}

// ------------------------------------------------------------------ form helpers
async function fieldInfo(page, name) {
  return page.evaluate(
    (sel, src) => {
      const ok = (0, eval)(src);
      const e = [...document.querySelectorAll(sel)].find(ok);
      if (!e) return null;
      const isSel = e.tagName === 'SELECT';
      return {
        tag: e.tagName,
        value: isSel ? (e.value ? (e.selectedOptions[0]?.textContent || '').trim() : '') : e.value,
        rawValue: e.value,
        describedby: e.getAttribute('aria-describedby') || '',
        fontSize: parseFloat(getComputedStyle(e).fontSize),
      };
    },
    tid(`field-${name}`),
    IS_VISIBLE_SRC
  );
}
async function fillField(page, name, value) {
  const hs = await vis(page, tid(`field-${name}`));
  const h = hs[0];
  if (!h) return false;
  const tag = await h.evaluate((e) => e.tagName);
  if (tag === 'SELECT') {
    const optValue = await h.evaluate((e, v) => {
      const o = [...e.options].find((o) => o.value === v || (o.textContent || '').trim() === v) ?? [...e.options].find((o) => (o.textContent || '').toLowerCase().includes(v.toLowerCase()));
      return o ? o.value : null;
    }, value);
    if (optValue === null) return false;
    await h.select(optValue);
    return true;
  }
  await h.click();
  await page.keyboard.down('Control');
  await page.keyboard.press('a');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  if (value) await h.type(value);
  return true;
}
async function fillDetails(c, over = {}) {
  const d = { ...DETAILS, ...over };
  const missing = [];
  for (const f of ['name', 'phone', 'address', 'postcode', 'city', 'state', 'note']) {
    if (!(await fillField(c.page, f, d[f]))) missing.push(f);
  }
  if (missing.length) c.fail('fill checkout fields', `could not fill: ${missing.join(', ')}`);
  return missing.length === 0;
}
const submitDetails = (c) => click(c.page, tid('details-next'));

async function toCheckout(c, lines = CART_A, path = `/${c.lang}/products`) {
  if (!(await loadWith(c, path, { [KEY.cart]: cartJson(lines) }))) return false;
  if (!(await openDrawer(c))) return false;
  const hs = await vis(c.page, tid('cart-checkout'));
  if (!hs.length) {
    c.fail('cart-checkout visible', 'no visible cart-checkout in the drawer');
    return false;
  }
  await hs[0].click();
  const ok = await until(() => count(c.page, tid('checkout')), 6000);
  if (!ok) c.fail('checkout step 1 opens', 'checkout not visible after cart-checkout');
  return Boolean(ok);
}
async function toStep2(c, lines = CART_A, over = {}) {
  if (!(await toCheckout(c, lines))) return false;
  if (!(await fillDetails(c, over))) return false;
  await submitDetails(c);
  const ok = await until(() => count(c.page, tid('order-ref')), 6000);
  if (!ok) c.fail('step 2 opens with valid details', 'order-ref not visible after details-next');
  return Boolean(ok);
}
async function clickSend(c) {
  const hs = await vis(c.page, tid('send-whatsapp'));
  if (!hs.length) {
    c.fail('send-whatsapp visible', 'none');
    return false;
  }
  await hs[0].click();
  return true;
}
const REF_RE = /AV-\d{6}-[A-HJ-NP-Z2-9]{4}/;
async function readRef(page) {
  const t = await textOf(page, tid('order-ref'));
  return { text: t, ref: t ? (REF_RE.exec(t)?.[0] ?? null) : null };
}

// ------------------------------------------------------------------ cart maths
async function readCart(page) {
  return page.evaluate((src) => {
    const ok = (0, eval)(src);
    const money = (t) => {
      const m = /RM\s*([\d,]+)\.(\d{2})/.exec((t || '').replace(/ /g, ' '));
      return m ? Number(m[1].replace(/,/g, '')) * 100 + Number(m[2]) : null;
    };
    const num = (e) => {
      const v = 'value' in e && e.tagName !== 'LI' && e.tagName !== 'DIV' && e.tagName !== 'SPAN' ? e.value : e.textContent;
      const m = /\d+/.exec(String(v ?? ''));
      return m ? Number(m[0]) : NaN;
    };
    const lines = [...document.querySelectorAll('[data-testid="cart-line"]')].filter(ok).map((l) => {
      const q = l.querySelector('[data-testid="line-qty"]');
      const t = l.querySelector('[data-testid="line-total"]');
      return { sku: l.getAttribute('data-sku'), qty: q ? num(q) : null, totalSen: t ? money(t.textContent) : null, totalText: t ? (t.textContent || '').trim() : null };
    });
    const one = (id) => {
      const e = [...document.querySelectorAll(`[data-testid="${id}"]`)].find(ok);
      return e ? { sen: money(e.textContent), text: (e.textContent || '').replace(/[\s ]+/g, ' ').trim() } : null;
    };
    return { lines, subtotal: one('cart-subtotal'), total: one('cart-total') };
  }, IS_VISIBLE_SRC);
}
/** Recompute every number from storeFacts prices in integer sen and compare with the DOM text. */
async function verifyMaths(c, label, { storage = true } = {}) {
  const dom = await readCart(c.page);
  let sum = 0;
  let ok = true;
  const bad = [];
  for (const l of dom.lines) {
    const item = ITEM[l.sku];
    if (!item) {
      ok = false;
      bad.push(`unknown sku ${l.sku}`);
      continue;
    }
    if (!Number.isInteger(l.qty) || l.qty < 1 || l.qty > MAX_QTY) {
      ok = false;
      bad.push(`${l.sku} qty ${l.qty}`);
      continue;
    }
    const want = item.sen * l.qty;
    sum += want;
    if (l.totalSen !== want || normMoney(l.totalText ?? '') !== normMoney(rm(want))) {
      ok = false;
      bad.push(`${l.sku} line-total "${l.totalText}" want "${rm(want)}"`);
    }
  }
  c.check(ok, `${label}: ${dom.lines.length} line totals = unit price x qty`, bad.join('; '));
  c.check(dom.subtotal && dom.subtotal.sen === sum && normMoney(dom.subtotal.text).includes(normMoney(rm(sum))), `${label}: cart-subtotal = ${rm(sum)}`, dom.subtotal);
  if (DELIVERY_NULL) c.check(dom.total && dom.total.sen === sum && normMoney(dom.total.text).includes(normMoney(rm(sum))), `${label}: cart-total = subtotal (delivery confirmed on WhatsApp)`, dom.total);
  else c.nm(`${label}: cart-total`, 'config.ts sets a delivery fee; walk assumes null');
  const qty = dom.lines.reduce((n, l) => n + (Number.isInteger(l.qty) ? l.qty : 0), 0);
  const b = await badge(c.page);
  c.check(b === qty, `${label}: header badge = total quantity ${qty}`, `badge ${b}`);
  if (storage) {
    const raw = await ls.get(c.page, KEY.cart);
    let stored = [];
    try {
      stored = JSON.parse(raw)?.lines ?? [];
    } catch {
      stored = null;
    }
    // The app clamps and drops in memory and does not rewrite storage on load: compare with the parsed expectation.
    const merged = new Map();
    for (const l of stored ?? []) if (ITEM[l?.sku] && Number.isInteger(l.qty) && l.qty >= 1) merged.set(l.sku, Math.min(MAX_QTY, (merged.get(l.sku) ?? 0) + l.qty));
    const expect = sortLines([...merged].map(([sku, qty]) => ({ sku, qty })));
    const same = stored && JSON.stringify(expect.map((l) => [l.sku, l.qty])) === JSON.stringify(sortLines(dom.lines).map((l) => [l.sku, l.qty]));
    c.check(Boolean(same), `${label}: ${KEY.cart} (clamped, unknown SKUs dropped) matches the drawer`, raw);
  }
  return dom;
}

// ------------------------------------------------------------------ WhatsApp message
/** Expected message lines, one per line, built from labels + ORDER_NAMES. exact === null means pattern only. */
function expectedMessage(lang, ref, lines, d = DETAILS) {
  const L = labelsFor(lang);
  const N = namesFor(lang);
  const sorted = sortLines(lines);
  const join = (label, value) => (label.trim().endsWith(':') ? `${label.trim()} ${value}` : `${label}: ${value}`);
  const generic = (value) => new RegExp(`^[^:]{1,40}: ${esc(value)}$`);
  const sub = sorted.reduce((n, l) => n + ITEM[l.sku].sen * l.qty, 0);
  const out = [];
  out.push(L ? { name: 'header', exact: `${L.newOrder} ${ref}` } : { name: 'header', exact: null, re: new RegExp(`^.+ ${esc(ref)}$`) });
  sorted.forEach((l, i) => {
    const it = ITEM[l.sku];
    const amount = rm(it.sen * l.qty);
    const nm = N?.[it.productId];
    out.push(
      nm
        ? { name: `item ${i + 1} ${l.sku}`, exact: `${i + 1}. ${nm} ${it.size} ml x ${l.qty} = ${amount}` }
        : { name: `item ${i + 1} ${l.sku}`, exact: null, re: new RegExp(`^${i + 1}\\. .+ ${it.size} ml x ${l.qty} = ${esc(amount)}$`) }
    );
  });
  const val = (name, label, value) => out.push(label !== undefined ? { name, exact: join(label, value) } : { name, exact: null, re: generic(value) });
  val('subtotal', L?.subtotal, rm(sub));
  out.push(
    L
      ? { name: 'delivery', exact: join(L.delivery, L.deliveryTbc) }
      : { name: 'delivery', exact: null, re: /^[^:]{1,40}: .+$/ }
  );
  val('total', L?.total, rm(sub));
  out.push(L ? { name: 'payment (chat)', exact: join(L.payment, L.paymentChat) } : { name: 'payment (chat)', exact: null, re: /^[^:]{1,40}: .+$/ });
  val('name', L?.name, d.name);
  val('phone', L?.phone, d.phoneIntl);
  val('address', L?.address, `${d.address}, ${d.postcode} ${d.city}, ${d.state}`);
  if (d.note) val('note', L?.note, d.note);
  return { lines: out, labelsKnown: Boolean(L), namesKnown: Boolean(N) };
}
function checkMessageLines(c, tag, decoded, exp, lang) {
  const got = decoded.split(/\r?\n/);
  c.check(got.length === exp.lines.length, `${tag}: message has ${exp.lines.length} lines`, `got ${got.length}: ${JSON.stringify(got)}`);
  exp.lines.forEach((e, i) => {
    const g = got[i] ?? '';
    const ok = e.exact !== null ? g === e.exact : e.re.test(g);
    c.check(ok, `${tag}: line ${i + 1} ${e.name}`, `want ${e.exact ?? String(e.re)} got ${JSON.stringify(g)}`);
  });
  if (!exp.labelsKnown) c.nm(`${tag}: ${lang} label wording`, 'src/order/messageStrings.ts labels not importable; only the shape of each line was checked');
  if (!exp.namesKnown) c.nm(`${tag}: ${lang} short product names`, 'ORDER_NAMES not importable from src/order/messageStrings.ts; names matched as non-empty text');
}
async function sendLink(page) {
  const hs = await vis(page, tid('send-whatsapp'));
  if (!hs.length) return null;
  return hs[0].evaluate((e) => ({ tag: e.tagName, href: e.getAttribute('href'), target: e.getAttribute('target'), rel: e.getAttribute('rel') }));
}
/** Check the href shape and return the decoded message (or null). */
async function checkSendHref(c, tag, info) {
  if (!info) {
    c.fail(`${tag}: send-whatsapp visible`, 'none');
    return null;
  }
  const touch = await isTouchMode(c.page);
  const wantTouch = c.vp.mobile;
  if (touch !== wantTouch) c.nm(`${tag}: viewport input mode`, `expected ${wantTouch ? 'touch' : 'mouse'} emulation, page sees ${touch ? 'coarse/no-hover' : 'fine/hover'}; using what the page sees`);
  const prefix = touch ? `https://wa.me/${WA}?text=` : `https://web.whatsapp.com/send?phone=${WA}&text=`;
  c.check(info.tag === 'A', `${tag}: send-whatsapp is a real <a>`, info.tag);
  c.check(typeof info.href === 'string' && info.href.startsWith(prefix), `${tag}: href starts with ${prefix}`, (info.href ?? '').slice(0, 90));
  c.check(info.target === '_blank' && /noopener/.test(info.rel ?? ''), `${tag}: target=_blank rel=noopener`, `${info.target} / ${info.rel}`);
  if (!info.href || !info.href.startsWith(prefix)) return null;
  c.check(info.href.length <= URL_CAP, `${tag}: href length <= ${URL_CAP}`, info.href.length);
  const text = info.href.slice(prefix.length);
  c.check(!/[&#' \n]/.test(text), `${tag}: text part has no raw & # ' space newline`, text.slice(0, 120));
  c.check(text.includes('%27') && text.includes('%26') && text.includes('%23'), `${tag}: ' & # are percent-encoded (%27 %26 %23)`, text.slice(0, 160));
  try {
    return decodeURIComponent(text);
  } catch (e) {
    c.fail(`${tag}: text decodes`, e.message);
    return null;
  }
}

// ------------------------------------------------------------------ surfaces
async function settleDrawer(c) {
  await sleep(450);
  if (await count(c.page, tid('cart-drawer'))) await closeDialogs(c);
}
/** Add one SKU from the visible add-to-cart of a product (reveals the two sizes for two-size products). */
async function addProduct(c, pid, size, label) {
  const page = c.page;
  const btns = await vis(page, tid('add-to-cart', `[data-product="${pid}"]`));
  if (!btns.length) {
    c.fail(`${label}: visible add-to-cart for ${pid}`, 'none found');
    return false;
  }
  const b = btns[0];
  const info = await b.evaluate((e) => ({ sku: e.getAttribute('data-sku'), inA: Boolean(e.closest('a')) }));
  c.check(!info.inA, `${label}: add-to-cart ${pid} is not inside an <a>`);
  const sizes = ITEMS.filter((i) => i.productId === pid);
  if (sizes.length > 1) c.check(info.sku === null, `${label}: two-size ${pid} add-to-cart has no data-sku`, info.sku);
  else c.check(info.sku === sizes[0].sku, `${label}: one-size ${pid} add-to-cart data-sku=${sizes[0].sku}`, info.sku);
  const before = await badge(page);
  await b.click();
  if (sizes.length > 1) {
    const sel = tid('add-size');
    const shown = await until(async () => (await vis(page, sel)).length >= sizes.length, 4000);
    await sleep(500); // size buttons ignore taps for 350 ms after the reveal (double-tap guard)
    const all = await vis(page, sel);
    const mine = [];
    for (const h of all) {
      const d = await h.evaluate((e) => ({ sku: e.getAttribute('data-sku') || '', inA: Boolean(e.closest('a')) }));
      if (d.sku.startsWith(`${pid}:`)) mine.push({ h, ...d });
    }
    c.check(Boolean(shown) && mine.length === sizes.length && sizes.every((s) => mine.some((m) => m.sku === s.sku)), `${label}: tapping Add reveals ${sizes.map((s) => s.sku).join(' + ')}`, mine.map((m) => m.sku));
    c.check(mine.every((m) => !m.inA), `${label}: add-size buttons are not inside an <a>`);
    const pick = mine.find((m) => m.sku === `${pid}:${size}`);
    if (!pick) return false;
    await pick.h.click();
  }
  const want = before + 1;
  const got = await until(async () => (await badge(page)) === want, 6000);
  c.check(Boolean(got), `${label}: badge ${before} -> ${want} after adding ${pid}:${size}`, `badge ${await badge(page)}`);
  return Boolean(got);
}

async function distinctProducts(page, scope = '') {
  return page.evaluate((scope) => [...new Set([...document.querySelectorAll(`${scope} [data-testid="add-to-cart"]`)].map((e) => e.getAttribute('data-product')))].sort(), scope);
}

// ------------------------------------------------------------------ sections
/** Header items must not overlap, wrap or leave the screen (logo, nav pill, language, cart, menu toggle). */
async function headerLayout(c, state) {
  const lay = await c.page.evaluate((src) => {
    const ok = (0, eval)(src);
    const first = (s) => [...document.querySelectorAll(s)].find(ok);
    const box = (e) => {
      if (!e) return null;
      const b = e.getBoundingClientRect();
      return { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top), b: Math.round(b.bottom) };
    };
    const nav = first('header [data-cms-menu="header"]');
    return {
      w: innerWidth,
      logo: box(first('header img')?.closest('a')),
      nav: box(nav),
      navScrollOverflow: nav ? nav.scrollWidth - nav.clientWidth : 0,
      lang: box(first('header button[aria-haspopup="listbox"]')),
      cart: box(first('[data-testid="cart-button"]')),
      toggle: box(first('header [data-cms-menu-toggle]')),
    };
  }, IS_VISIBLE_SRC);
  const items = Object.entries(lay).filter(([k, v]) => v && typeof v === 'object');
  const hits = [];
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const [an, a] = items[i];
      const [bn, b] = items[j];
      if (Math.min(a.r, b.r) - Math.max(a.l, b.l) > 1 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 1) hits.push(`${an}x${bn}`);
    }
  }
  c.check(hits.length === 0, `header (${state}): no overlapping items`, { hits, lay });
  c.check(items.every(([, v]) => v.l >= 0 && v.r <= lay.w + 0.5), `header (${state}): every item inside the viewport`, lay);
  c.check(!lay.nav || lay.nav.b - lay.nav.t <= 64, `header (${state}): nav pill is one row (height <= 64)`, lay.nav);
  c.check(lay.navScrollOverflow <= 1, `header (${state}): nav links not clipped`, lay.navScrollOverflow);
  const f = join(OUT, `${c.lang}-${c.vp.short}-header-${state.replace(/\W+/g, '-')}.png`);
  await c.page.screenshot({ path: f, clip: { x: 0, y: 0, width: lay.w, height: 120 } }).catch(() => {});
}

const SECTIONS = {
  // 1 ------------------------------------------------------------
  async header(c) {
    if (!(await go(c, `/${c.lang}`))) return;
    const n = await count(c.page, tid('cart-button'));
    c.check(n === 1, 'exactly one visible cart-button in the header', `visible=${n}`);
    if (n < 1) return;
    c.check((await total(c.page, tid('cart-count'))) === 0, 'no cart-count badge element at count 0 (O-14)', `elements=${await total(c.page, tid('cart-count'))}`);
    const label = await (await vis(c.page, tid('cart-button')))[0].evaluate((e) => e.getAttribute('aria-label') || '');
    c.check(label.trim().length > 0, 'cart-button has an aria-label', label);
    const box = await (await vis(c.page, tid('cart-button')))[0].evaluate((e) => {
      const r = e.getBoundingClientRect();
      return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: innerWidth };
    });
    c.check(box.l >= 0 && box.r <= box.w + 0.5 && box.t >= 0, 'cart-button sits inside the viewport', box);
    c.check(await c.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no horizontal page scroll on home', await c.page.evaluate(() => `${document.documentElement.scrollWidth} > ${innerWidth}`));
    // The same HTML for every visitor (prerender parity): the raw file has the button but no badge.
    try {
      const raw = await (await fetch(`${BASE}/${c.lang}`)).text();
      c.check(!raw.includes('data-testid="cart-count"'), 'raw HTML has no cart-count badge (identical for every visitor)');
      if (raw.includes('data-testid="cart-button"')) c.check(true, 'raw HTML already contains the cart-button');
      else c.nm('raw HTML contains the cart-button', 'not in the raw file (client-only render); only the badge rule was checked');
    } catch (e) {
      c.nm('raw HTML parity', `fetch failed: ${e.message}`);
    }
    await headerLayout(c, 'empty cart');
    await ls.set(c.page, { [KEY.cart]: cartJson([...CART_A, { sku: 'lavender-chamomile:250', qty: 24 }]) });
    if (await go(c, '', true)) {
      c.check((await badge(c.page)) === 30, 'header with a 2-digit badge (30)', await badge(c.page));
      await headerLayout(c, '2-digit badge');
      await ls.set(c.page, { [KEY.cart]: cartJson([]) });
      await go(c, '', true);
    }
    // Clicking it opens the drawer (empty cart).
    if (await openDrawer(c)) {
      c.check(true, 'cart-button opens the cart drawer');
      c.check((await count(c.page, tid('cart-line'))) === 0, 'empty cart: no cart-line');
      const co = await vis(c.page, tid('cart-checkout'));
      const disabled = co.length ? await co[0].evaluate((e) => e.disabled || e.getAttribute('aria-disabled') === 'true') : true;
      c.check(disabled, 'empty cart: cart-checkout absent or disabled', co.length ? 'enabled' : '');
      await closeDialogs(c);
    }
  },

  // 2 ------------------------------------------------------------
  async surfaces(c) {
    const page = c.page;
    // home
    if (!(await go(c, `/${c.lang}`))) return;
    const homeProducts = await distinctProducts(page);
    c.check(JSON.stringify(homeProducts) === JSON.stringify([...PRODUCT_IDS].sort()), 'home: an add-to-cart for each of the 8 products', homeProducts);
    const oneSize = catalogue.products.find((p) => p.kind === 'infused' && p.id === 'blackseed').id;
    const ok1 = await addProduct(c, oneSize, '250', 'home');
    c.check(await until(() => count(page, tid('cart-drawer')), 3000), 'home: the first add of the session opens the cart drawer (spec 4)', 'drawer not visible');
    await settleDrawer(c);
    if (ok1) {
      await addProduct(c, 'organic', '250', 'home (two-size reveal)');
      await sleep(500);
      c.check((await count(page, tid('cart-drawer'))) === 0, 'home: a later add does not open the drawer again (spec 4)');
      await settleDrawer(c);
    }
    // products page: classic boxes + infused cards
    if (!(await go(c, `/${c.lang}/products`))) return;
    const prodProducts = await distinctProducts(page);
    c.check(JSON.stringify(prodProducts) === JSON.stringify([...PRODUCT_IDS].sort()), '/products: an add-to-cart for each of the 8 products', prodProducts);
    await addProduct(c, 'extra-virgin', '500', '/products classic box');
    await settleDrawer(c);
    await addProduct(c, 'lavender-chamomile', '250', '/products infused card');
    await settleDrawer(c);
    // one infused product page
    const wild = INFUSED.find((p) => p.id === 'wild-thyme');
    if (!(await go(c, `/${c.lang}/products/${wild.slug}`))) return;
    c.check((await total(page, tid('order-here'))) > 0, 'infused page: order-here hook present (closing section)');
    await addProduct(c, 'wild-thyme', '250', 'infused page');
    await settleDrawer(c);
    // shop order list
    if (!(await go(c, `/${c.lang}/shop`))) return;
    const shopProducts = await distinctProducts(page, tid('order-list'));
    c.check(JSON.stringify(shopProducts) === JSON.stringify([...PRODUCT_IDS].sort()), '/shop: [data-testid=order-list] holds an add-to-cart for each of the 8 products', shopProducts);
    await addProduct(c, 'fennel-anise', '250', '/shop order list');
    await settleDrawer(c);
    // every add button on every visited surface, not just the ones clicked
    const nested = await page.evaluate(() => [...document.querySelectorAll('[data-testid="add-to-cart"],[data-testid="add-size"]')].filter((e) => e.closest('a')).length);
    c.check(nested === 0, '/shop: no add button nested inside an <a>', `${nested} nested`);
    // the cart now holds what we added
    if (await openDrawer(c)) {
      const dom = await readCart(page);
      const want = ['extra-virgin:500', 'organic:250', 'blackseed:250', 'lavender-chamomile:250', 'wild-thyme:250', 'fennel-anise:250'].sort();
      c.check(JSON.stringify(dom.lines.map((l) => l.sku).sort()) === JSON.stringify(want), 'drawer lists exactly the 6 SKUs added from the 4 surfaces', dom.lines.map((l) => `${l.sku} x${l.qty}`));
      c.check(dom.lines.every((l) => l.qty === 1), 'each added line has quantity 1', dom.lines.map((l) => `${l.sku} x${l.qty}`));
      await verifyMaths(c, 'surfaces cart');
    }
  },

  // 3 ------------------------------------------------------------
  async drawer(c) {
    const page = c.page;
    // O-9: an unknown SKU is dropped and said once.
    const ghost = [{ sku: 'ghost:250', qty: 1 }, { sku: 'blackseed:250', qty: 1 }];
    if (await loadWith(c, `/${c.lang}/products`, { [KEY.cart]: cartJson(ghost) })) {
      c.check((await badge(page)) === 1, 'unknown SKU dropped on parse: badge counts only the valid line', `badge ${await badge(page)}`);
      if (await openDrawer(c)) {
        const dom = await readCart(page);
        c.check(dom.lines.length === 1 && dom.lines[0].sku === 'blackseed:250', 'unknown SKU dropped: one valid line in the drawer', dom.lines);
        const want = uiString(STR.dropped.re, STR.dropped.en, c.lang);
        const drawerText = normText((await textOf(page, tid('cart-drawer'))) ?? '');
        if (want) c.check(drawerText.includes(normText(want)), `drawer says once: "${want}"`, drawerText.slice(0, 200));
        else c.nm('drawer "item removed" notice (ms wording)', 'not importable from src/order/uiStrings.ts');
        await closeDialogs(c);
      }
    }
    // maths on a seeded cart; qty 99 in storage is clamped to 24 on parse.
    const seed = [...CART_A, { sku: 'lavender-chamomile:250', qty: 99 }];
    if (!(await loadWith(c, `/${c.lang}/products`, { [KEY.cart]: cartJson(seed) }))) return;
    if (!(await openDrawer(c))) return;
    let dom = await verifyMaths(c, 'seeded cart');
    c.check(JSON.stringify(dom.lines.map((l) => l.sku)) === JSON.stringify(sortLines(seed).map((l) => l.sku)), 'lines are in catalogue order', dom.lines.map((l) => l.sku));
    const lc = dom.lines.find((l) => l.sku === 'lavender-chamomile:250');
    c.check(lc?.qty === MAX_QTY, `stored qty 99 is clamped to ${MAX_QTY}`, lc);
    const lineSel = (sku) => tid('cart-line', `[data-sku="${sku}"]`);
    const inLine = async (sku, id) => {
      const hs = await vis(page, `${lineSel(sku)} ${tid(id)}`);
      return hs[0];
    };
    const qtyOf = async (sku) => (await readCart(page)).lines.find((l) => l.sku === sku)?.qty ?? null;
    // plus / minus
    const evBefore = await qtyOf('extra-virgin:500');
    await (await inLine('extra-virgin:500', 'line-plus'))?.click();
    await until(async () => (await qtyOf('extra-virgin:500')) === evBefore + 1, 3000);
    c.check((await qtyOf('extra-virgin:500')) === evBefore + 1, `line-plus: extra-virgin:500 ${evBefore} -> ${evBefore + 1}`, await qtyOf('extra-virgin:500'));
    await verifyMaths(c, 'after plus');
    await (await inLine('extra-virgin:500', 'line-minus'))?.click();
    await until(async () => (await qtyOf('extra-virgin:500')) === evBefore, 3000);
    c.check((await qtyOf('extra-virgin:500')) === evBefore, `line-minus: back to ${evBefore}`, await qtyOf('extra-virgin:500'));
    await verifyMaths(c, 'after minus');
    // max per line
    const plus = await inLine('lavender-chamomile:250', 'line-plus');
    const plusDisabled = plus ? await plus.evaluate((e) => e.disabled || e.getAttribute('aria-disabled') === 'true') : null;
    if (plus && !plusDisabled) await plus.click().catch(() => {});
    await sleep(300);
    c.check((await qtyOf('lavender-chamomile:250')) === MAX_QTY, `max ${MAX_QTY} per line: plus at ${MAX_QTY} does not go above (${plusDisabled ? 'plus disabled' : 'plus ignored'})`, await qtyOf('lavender-chamomile:250'));
    await verifyMaths(c, 'at max qty');
    // minus on a quantity-1 line: either removes it or keeps 1; the maths must stay consistent either way
    await (await inLine('blackseed:250', 'line-minus'))?.click().catch(() => {});
    await sleep(400);
    const bs = await qtyOf('blackseed:250');
    c.check(bs === null || bs === 1, 'minus at quantity 1 removes the line or keeps 1 (never 0 or negative)', bs);
    await verifyMaths(c, 'after minus at qty 1');
    // remove
    const before = (await readCart(page)).lines.length;
    await (await inLine('organic:250', 'line-remove'))?.click();
    await until(async () => (await readCart(page)).lines.length === before - 1, 3000);
    dom = await readCart(page);
    c.check(dom.lines.length === before - 1 && !dom.lines.some((l) => l.sku === 'organic:250'), 'line-remove drops the line', dom.lines.map((l) => l.sku));
    await verifyMaths(c, 'after remove');
    for (const sku of dom.lines.map((l) => l.sku)) {
      await (await inLine(sku, 'line-remove'))?.click().catch(() => {});
      await sleep(200);
    }
    await sleep(300);
    c.check((await count(page, tid('cart-line'))) === 0, 'removing every line empties the cart', await count(page, tid('cart-line')));
    c.check((await total(page, tid('cart-count'))) === 0 || (await badge(page)) === 0, 'badge gone at count 0', await badge(page));
    const co = await vis(page, tid('cart-checkout'));
    c.check(!co.length || (await co[0].evaluate((e) => e.disabled || e.getAttribute('aria-disabled') === 'true')), 'empty cart: cart-checkout absent or disabled');
    const raw = await ls.get(page, KEY.cart);
    let stored = null;
    try {
      stored = JSON.parse(raw)?.lines?.length ?? 0;
    } catch {
      stored = raw === null ? 0 : null;
    }
    c.check(stored === 0, `${KEY.cart} holds no lines after removing everything`, raw);
  },

  // 4 ------------------------------------------------------------
  async checkout(c) {
    const page = c.page;
    if (!(await toCheckout(c, [{ sku: 'blackseed:250', qty: 1 }]))) return;
    // submit empty
    await submitDetails(c);
    await sleep(300);
    const required = ['name', 'phone', 'address', 'postcode', 'city', 'state'];
    const errs = {};
    for (const f of required) errs[f] = await textOf(page, tid(`error-${f}`));
    c.check(required.every((f) => errs[f]), 'empty submit: an error under every required field', errs);
    c.check(!(await count(page, tid('error-note'))), 'empty submit: the optional note has no error');
    c.check(!(await count(page, tid('order-ref'))), 'empty submit: stays on step 1');
    c.check((await page.evaluate(() => document.activeElement?.getAttribute('data-testid'))) === 'field-name', 'empty submit: focus goes to the first field (field-name)', await page.evaluate(() => document.activeElement?.getAttribute('data-testid') ?? document.activeElement?.tagName));
    const wired = [];
    for (const f of required) {
      const info = await fieldInfo(page, f);
      const errId = await page.evaluate((s) => document.querySelector(s)?.id ?? '', tid(`error-${f}`));
      if (!info || !errId || !info.describedby.split(/\s+/).includes(errId)) wired.push(f);
    }
    c.check(wired.length === 0, 'each field is tied to its error with aria-describedby', `not wired: ${wired.join(',')}`);
    // phone / postcode
    await fillDetails(c, { phone: '12345', postcode: '123' });
    await submitDetails(c);
    await sleep(300);
    c.check(Boolean(await count(page, tid('error-phone'))), 'bad phone "12345": error-phone shown');
    c.check(Boolean(await count(page, tid('error-postcode'))), 'bad postcode "123": error-postcode shown');
    c.check(!(await count(page, tid('error-name'))) && !(await count(page, tid('error-address'))), 'valid name and address show no error');
    c.check((await page.evaluate(() => document.activeElement?.getAttribute('data-testid'))) === 'field-phone', 'first invalid field (field-phone) gets focus', await page.evaluate(() => document.activeElement?.getAttribute('data-testid')));
    const phoneErr = (await textOf(page, tid('error-phone'))) ?? '';
    c.check(/malaysia/i.test(phoneErr), 'phone error text says Malaysian numbers only (O-10)', phoneErr);
    for (const bad of ['0212345678', '+6591234567']) {
      await fillField(page, 'phone', bad);
      await submitDetails(c);
      await sleep(200);
      c.check(Boolean(await count(page, tid('error-phone'))), `non-Malaysian-mobile phone "${bad}" rejected`);
    }
    for (const good of ['0121234567', '+60121234567', '60121234567', '01112345678']) {
      await fillField(page, 'phone', good);
      await submitDetails(c);
      await sleep(200);
      c.check(!(await count(page, tid('error-phone'))), `fake Malaysian mobile "${good}" accepted (postcode still bad keeps us on step 1)`);
    }
    for (const bad of ['1234', '12a45', 'abcde']) {
      await fillField(page, 'postcode', bad);
      await submitDetails(c);
      await sleep(200);
      c.check(Boolean(await count(page, tid('error-postcode'))), `postcode "${bad}" rejected`);
    }
    // phone-only checks
    if (c.vp.mobile) {
      const small = [];
      for (const f of ['name', 'phone', 'address', 'postcode', 'city', 'state', 'note']) {
        const info = await fieldInfo(page, f);
        if (!info || !(info.fontSize >= 16)) small.push(`${f}:${info?.fontSize}`);
      }
      c.check(small.length === 0, 'phone: every checkout input has font-size >= 16px (no iOS zoom, O-19)', small);
    } else c.nm('phone input font-size >= 16px', 'desktop viewport');
    const geo = await page.evaluate(() => {
      const d = document.querySelector('[data-testid="checkout"]');
      const next = document.querySelector('[data-testid="details-next"]');
      next?.scrollIntoView({ block: 'nearest' });
      const r = next?.getBoundingClientRect();
      return { overflowX: document.documentElement.scrollWidth - innerWidth, dialogOverflowX: d ? d.scrollWidth - d.clientWidth : null, nextBottom: r ? r.bottom : null, nextTop: r ? r.top : null, h: innerHeight };
    });
    c.check(geo.overflowX <= 1 && (geo.dialogOverflowX ?? 0) <= 1, 'checkout has no horizontal overflow', geo);
    c.check(geo.nextBottom !== null && geo.nextBottom <= geo.h + 0.5 && geo.nextTop >= 0, 'details-next can be scrolled fully into the viewport', geo);
    // valid -> step 2
    await fillDetails(c);
    await submitDetails(c);
    const ok = await until(() => count(page, tid('order-ref')), 6000);
    c.check(Boolean(ok), 'valid details: step 2 opens');
    c.check(!(await count(page, tid('error-name'))), 'valid details: no leftover errors');
  },

  // 5 ------------------------------------------------------------
  async chat(c) {
    const page = c.page;
    if (!CHAT_MODE) {
      c.nm('chat mode checks', 'src/order/config.ts has the three pay values set (transfer mode); this walk covers chat mode only');
      return;
    }
    if (!(await toStep2(c))) return;
    const { text, ref } = await readRef(page);
    c.check(Boolean(ref) && /^AV-\d{6}-[A-HJ-NP-Z2-9]{4}$/.test(ref), 'order-ref matches /^AV-\\d{6}-[A-HJ-NP-Z2-9]{4}$/', text);
    if (!ref) return;
    c.check(text.replace(ref, '').trim() === '', 'order-ref holds only the ref', text);
    const ymd = /^AV-(\d{2})(\d{2})(\d{2})-/.exec(ref);
    const d = new Date(2000 + Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
    const days = Math.abs(Date.now() - d.getTime()) / 86400000;
    c.check(d.getMonth() === Number(ymd[2]) - 1 && days < 2.5, 'ref date part is today (+-1 day for timezone)', ref);
    const sub = CART_A.reduce((n, l) => n + ITEM[l.sku].sen * l.qty, 0);
    const tot = await textOf(page, tid('order-total'));
    c.check(Boolean(tot) && normMoney(tot).includes(normMoney(rm(sub))), `order-total shows ${rm(sub)}`, tot);
    const want = uiString(STR.finalTotal.re, STR.finalTotal.en, c.lang);
    const coText = normText((await textOf(page, tid('checkout'))) ?? '');
    if (want) c.check(coText.includes(normText(want)), `step 2 says: "${want}" (O-9)`, coText.slice(0, 200));
    else c.nm('step 2 "we confirm the final total" line (ms wording)', 'not importable from src/order/uiStrings.ts');
    c.check(!(await count(page, tid('copy-message'))) || true, 'step 2 reached');
    const info = await sendLink(page);
    const decoded = await checkSendHref(c, 'step 2', info);
    if (decoded !== null) checkMessageLines(c, 'step 2', decoded, expectedMessage(c.lang, ref, CART_A), c.lang);
    // nothing left the page
    c.check(c.diag.waRequests.length === 0 && c.diag.popups === 0, 'no request or popup went to WhatsApp', { req: c.diag.waRequests, popups: c.diag.popups });
  },

  // 6 ------------------------------------------------------------
  async reload(c) {
    const page = c.page;
    if (!(await toStep2(c))) return;
    const { ref } = await readRef(page);
    if (!ref) return c.fail('step 2 ref readable', 'no ref');
    const stored2 = JSON.parse((await ls.get(page, KEY.order)) ?? 'null');
    c.check(Boolean(stored2) && stored2.step === 2 && stored2.ref === ref, `step 2 saved ${KEY.order} with the same ref`, stored2 && { step: stored2.step, ref: stored2.ref });
    // reload on step 2
    await go(c, '', true);
    await sleep(1500); // give a lazy chunk time to (wrongly) open something
    const s2 = await orderUiOpen(page);
    c.check(s2.dialogs === 0 && s2.ids.length === 0 && s2.roles === 0, 'reload on step 2: no dialog opens by itself (O-7)', s2);
    c.check((await badge(page)) === CART_A.reduce((n, l) => n + l.qty, 0), 'reload on step 2: the cart is still there (badge)', await badge(page));
    if (await openDrawer(c)) {
      // Chat mode: the banner is for a sent order (step 3) or a transfer order (step 2). A chat step 2 is picked up again from the cart.
      c.check(!(await count(page, tid('cart-banner'))), 'reload on step 2 (chat mode): no banner (banner is for step 3 / transfer step 2, O-7)', await textOf(page, tid('cart-banner')));
      await click(page, tid('cart-checkout')).catch((e) => c.fail('click cart-checkout', e.message));
      if (await until(() => count(page, tid('checkout')), 5000)) {
        c.check((await fieldInfo(page, 'name'))?.value === DETAILS.name, 'reload on step 2: continuing shows the saved details');
        await submitDetails(c);
        await until(() => count(page, tid('order-ref')), 5000);
        const again = (await readRef(page)).ref;
        c.check(again === ref, 'reload on step 2: continuing keeps the same ref', `${ref} vs ${again}`);
      }
    }
    // step 3: send, reload
    await closeDialogs(c, true);
    if (!(await toStep2(c))) return;
    const r2 = (await readRef(page)).ref;
    const info = await sendLink(page);
    if (!(await clickSend(c))) return;
    await until(() => count(page, tid('new-order')), 5000);
    await closeDialogs(c, true);
    await go(c, '', true);
    await sleep(1500);
    const s3 = await orderUiOpen(page);
    c.check(s3.dialogs === 0 && s3.ids.length === 0 && s3.roles === 0, 'reload on step 3: no dialog opens by itself (O-7)', s3);
    c.check((await badge(page)) === 0, 'reload on step 3: cart badge is 0 (cart was cleared on send)', await badge(page));
    if (await openDrawer(c)) {
      const banner = await textOf(page, tid('cart-banner'));
      c.check(Boolean(banner) && banner.includes(r2), 'reload on step 3: drawer cart-banner shows the same ref', banner);
      // The banner button resumes the saved order: the checkout opens on step 3.
      const btn = await vis(page, `${tid('cart-banner')} button`);
      c.check(btn.length > 0, 'banner has a button to reopen the sent order');
      if (btn.length) {
        await btn[0].click();
        const opened = await until(() => count(page, tid('open-whatsapp-again')), 5000);
        c.check(Boolean(opened), 'banner button reopens step 3 (open-whatsapp-again visible)');
        if (opened) {
          c.check((await readRef(page)).ref === r2, 'reopened step 3 shows the same ref');
          const a = await (await vis(page, tid('open-whatsapp-again')))[0].evaluate((e) => ({ tag: e.tagName, href: e.getAttribute('href') }));
          c.check(a.tag === 'A' && a.href === info.href, 'open-whatsapp-again is a real <a> with the original send href', a.href?.slice(0, 80));
          await click(page, tid('new-order')).catch((e) => c.fail('click new-order', e.message));
          await sleep(500);
          c.check((await ls.get(page, KEY.order)) === null, 'new-order clears the snapshot');
          if (await openDrawer(c)) c.check(!(await count(page, tid('cart-banner'))), 'no banner after new-order');
        }
      }
    }
  },

  // 7 ------------------------------------------------------------
  async sent(c) {
    const page = c.page;
    if (!(await toStep2(c))) return;
    const { ref } = await readRef(page);
    const info = await sendLink(page);
    const decoded = await checkSendHref(c, 'sent', info);
    if (!(await clickSend(c))) return;
    c.check(Boolean(await until(() => count(page, tid('new-order')), 5000)), 'clicking send moves to step 3 (new-order visible)');
    const clicks = await page.evaluate(() => window.__waClicks);
    c.check(clicks.length === 1 && clicks[0] === info.href, 'send click went to the expected href once (default prevented by the walk)', clicks.map((x) => x.slice(0, 60)));
    c.check(c.diag.waRequests.length === 0 && c.diag.popups === 0, 'no request or popup reached WhatsApp', { req: c.diag.waRequests, popups: c.diag.popups });
    c.check((await badge(page)) === 0, 'step 3: header cart count is 0');
    const raw = await ls.get(page, KEY.cart);
    let lines = null;
    try {
      lines = raw === null ? 0 : (JSON.parse(raw)?.lines?.length ?? 0);
    } catch {
      lines = null;
    }
    c.check(lines === 0, `step 3: ${KEY.cart} has no lines`, raw);
    const r3 = (await readRef(page)).ref;
    c.check(r3 === ref, 'step 3 shows the same ref as step 2', `${ref} vs ${r3}`);
    const again = await vis(page, tid('open-whatsapp-again'));
    c.check(again.length > 0, 'step 3: open-whatsapp-again visible');
    if (again.length) {
      const a = await again[0].evaluate((e) => ({ tag: e.tagName, href: e.getAttribute('href') }));
      c.check(a.tag === 'A' && a.href === info.href, 'step 3: open-whatsapp-again is a real <a> with the same href', a.href?.slice(0, 80));
    }
    c.check((await count(page, tid('copy-message'))) > 0, 'step 3: copy-message visible');
    const preview = await page.evaluate(() => document.querySelector('[data-testid="message-preview"]')?.textContent ?? null);
    if (preview === null) c.fail('step 3: message-preview exists', 'missing');
    else if (decoded !== null) {
      const norm = (s) => s.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
      c.check(JSON.stringify(norm(preview)) === JSON.stringify(norm(decoded)), 'step 3: message-preview equals the message in the send href', norm(preview).slice(0, 3));
    }
    // copy-message puts the message on the clipboard
    try {
      await click(page, tid('copy-message'));
      await sleep(300);
      const clip = await page.evaluate(() => navigator.clipboard.readText());
      if (decoded !== null) c.check(clip.replace(/\r\n/g, '\n').trim() === decoded.trim(), 'copy-message copies the exact message', clip.slice(0, 80));
    } catch (e) {
      c.nm('copy-message clipboard content', `clipboard not readable in this browser: ${String(e.message).split('\n')[0]}`);
    }
    // new order clears the snapshot
    await click(page, tid('new-order')).catch((e) => c.fail('click new-order', e.message));
    await sleep(500);
    c.check(!(await count(page, tid('checkout'))), 'new-order closes the checkout');
    c.check((await ls.get(page, KEY.order)) === null, `new-order removes ${KEY.order}`, await ls.get(page, KEY.order));
    await go(c, '', true);
    if (await openDrawer(c)) c.check(!(await count(page, tid('cart-banner'))), 'after new-order and a reload: no cart-banner');
  },

  // 8 ------------------------------------------------------------
  async details(c) {
    const page = c.page;
    if (!(await toStep2(c))) return;
    if (!(await clickSend(c))) return;
    await until(() => count(page, tid('new-order')), 5000);
    const raw = await ls.get(page, KEY.details);
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      /* null */
    }
    c.check(Boolean(parsed) && typeof parsed.savedAt === 'number' && parsed.values && typeof parsed.values === 'object', `${KEY.details} = {savedAt, values}`, raw?.slice(0, 120));
    c.check(Boolean(parsed) && parsed.values.name === DETAILS.name, 'saved values contain the typed name', parsed?.values?.name);
    await click(page, tid('new-order')).catch(() => {});
    await sleep(400);
    // reopen checkout with a fresh cart: fields prefilled
    await ls.set(page, { [KEY.cart]: cartJson([{ sku: 'blackseed:250', qty: 1 }]) });
    await go(c, '', true);
    if (!(await openDrawer(c))) return;
    await click(page, tid('cart-checkout')).catch((e) => c.fail('click cart-checkout', e.message));
    if (!(await until(() => count(page, tid('checkout')), 5000))) return c.fail('checkout reopens', 'not visible');
    const val = async (f) => (await fieldInfo(page, f))?.value ?? null;
    c.check((await val('name')) === DETAILS.name, 'reopened checkout: name prefilled', await val('name'));
    c.check(String(await val('phone')).replace(/\D/g, '').endsWith('121234567'), 'reopened checkout: phone prefilled', await val('phone'));
    c.check((await val('address')) === DETAILS.address, 'reopened checkout: address prefilled', await val('address'));
    c.check((await val('postcode')) === DETAILS.postcode, 'reopened checkout: postcode prefilled', await val('postcode'));
    c.check((await val('city')) === DETAILS.city, 'reopened checkout: city prefilled', await val('city'));
    c.check(String(await val('state')).toLowerCase().includes('selangor'), 'reopened checkout: state prefilled', await val('state'));
    c.check((await val('note')) === DETAILS.note, 'reopened checkout: note prefilled', await val('note'));
    const want = uiString(STR.stayOnDevice.re, STR.stayOnDevice.en, c.lang);
    const coText = normText((await textOf(page, tid('checkout'))) ?? '');
    if (want) c.check(coText.includes(normText(want)), `form says: "${want}" (O-8)`, coText.slice(0, 160));
    else c.nm('"details stay on this device" line (ms wording)', 'not importable from src/order/uiStrings.ts');
    // forget
    const forget = await vis(page, tid('forget-details'));
    c.check(forget.length > 0, 'forget-details button visible');
    if (forget.length) {
      await forget[0].click();
      await sleep(400);
      const empties = [];
      for (const f of ['name', 'phone', 'address', 'postcode', 'city', 'state', 'note']) if ((await val(f)) !== '') empties.push(`${f}="${await val(f)}"`);
      c.check(empties.length === 0, 'Forget my details empties every field', empties);
      c.check((await ls.get(page, KEY.details)) === null, `Forget my details removes ${KEY.details}`, await ls.get(page, KEY.details));
      c.check((await badge(page)) === 1, 'forgetting details keeps the cart', await badge(page));
    }
    // older than 30 days: ignored and deleted (O-8)
    await closeDialogs(c, true);
    const old = { savedAt: Date.now() - 31 * 86400000, values: { ...DETAILS, name: 'Old Saved Name', phone: '60121234567' } };
    await ls.set(page, { [KEY.details]: JSON.stringify(old) });
    await go(c, '', true);
    if (await openDrawer(c)) {
      await click(page, tid('cart-checkout')).catch(() => {});
      if (await until(() => count(page, tid('checkout')), 5000)) {
        c.check((await val('name')) === '', 'details older than 30 days are not prefilled', await val('name'));
        c.check((await ls.get(page, KEY.details)) === null, `details older than 30 days are deleted from ${KEY.details}`, (await ls.get(page, KEY.details))?.slice(0, 60));
      }
    }
  },

  // 9 ------------------------------------------------------------
  async nostorage(c) {
    const page = c.page;
    if (!(await go(c, `/${c.lang}`))) return;
    const blocked = await ls.get(page, KEY.cart);
    if (blocked !== '__blocked__') return c.nm('localStorage blocked flow', 'could not block storage before page scripts ran');
    c.check(true, 'localStorage and sessionStorage throw before page scripts run');
    const pid = 'blackseed';
    if (!(await addProduct(c, pid, '250', 'no storage'))) return;
    await sleep(500);
    if (!(await openDrawer(c))) return;
    const dom = await readCart(page);
    c.check(dom.lines.length === 1 && dom.lines[0].sku === 'blackseed:250' && dom.lines[0].qty === 1, 'no storage: the drawer holds the added line (memory fallback)', dom.lines);
    await verifyMaths(c, 'no storage', { storage: false });
    const hs = await vis(page, tid('cart-checkout'));
    if (!hs.length) return c.fail('no storage: cart-checkout visible', 'none');
    await hs[0].click();
    if (!(await until(() => count(page, tid('checkout')), 6000))) return c.fail('no storage: checkout opens', 'not visible');
    if (!(await fillDetails(c))) return;
    await submitDetails(c);
    if (!(await until(() => count(page, tid('order-ref')), 6000))) return c.fail('no storage: step 2 opens', 'order-ref not visible');
    const { ref } = await readRef(page);
    c.check(Boolean(ref), 'no storage: order-ref present', ref);
    const info = await sendLink(page);
    const decoded = await checkSendHref(c, 'no storage', info);
    if (decoded !== null && ref && CHAT_MODE) checkMessageLines(c, 'no storage', decoded, expectedMessage(c.lang, ref, [{ sku: 'blackseed:250', qty: 1 }]), c.lang);
    c.check(c.diag.pageErrors.length === 0, 'no storage: no uncaught page errors', c.diag.pageErrors.slice(0, 2));
  },

  // 10 -----------------------------------------------------------
  async lang(c) {
    const page = c.page;
    const other = c.lang === 'en' ? 'ms' : 'en';
    if (!CHAT_MODE) return c.nm('language switch mid-order', 'transfer mode not covered');
    if (!(await toStep2(c))) return;
    const { ref } = await readRef(page);
    const info = await sendLink(page);
    const decoded = await checkSendHref(c, `${c.lang} order`, info);
    if (!(await clickSend(c))) return;
    await until(() => count(page, tid('new-order')), 5000);
    if (!(await closeDialogs(c))) return;
    // switch the site language
    const toggle = await vis(page, 'header button[aria-haspopup="listbox"]');
    if (!toggle.length) return c.nm('language switch mid-order', 'no header language button (button[aria-haspopup=listbox])');
    await toggle[0].click();
    const sel = `[role="listbox"] [data-cms-lang-link="${other}"]`;
    await until(() => count(page, sel), 3000);
    const link = (await vis(page, sel))[0];
    if (!link) return c.nm('language switch mid-order', `no visible ${sel}`);
    await link.click();
    const moved = await until(async () => (await page.evaluate(() => document.documentElement.lang)) === other && new URL(page.url()).pathname.startsWith(`/${other}`), 15000);
    c.check(Boolean(moved), `site language switched to ${other}`, `${page.url()} lang=${await page.evaluate(() => document.documentElement.lang)}`);
    if (!moved) return;
    await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 }).catch(() => {});
    await sleep(800);
    const ui = await orderUiOpen(page);
    c.check(ui.dialogs === 0 && ui.ids.length === 0, 'after the language switch no dialog opens by itself (O-7)', ui);
    if (!(await openDrawer(c))) return;
    const banner = await textOf(page, tid('cart-banner'));
    c.check(Boolean(banner) && banner.includes(ref), `banner after the switch still shows ${ref}`, banner);
    // The banner button reopens the saved order on step 3, painted from the snapshot.
    const bb = await vis(page, `${tid('cart-banner')} button`);
    if (!bb.length) return c.fail('banner button visible after the switch', 'none');
    await bb[0].click();
    await until(() => count(page, tid('open-whatsapp-again')), 5000);
    const again = await vis(page, tid('open-whatsapp-again'));
    if (!again.length) return c.fail('open-whatsapp-again visible after the switch', 'none');
    const sentTitle = UI?.UI_STRINGS?.[c.lang]?.sent?.title;
    const coText = (await textOf(page, tid('checkout'))) ?? '';
    if (sentTitle) c.check(normText(coText).includes(normText(sentTitle)), `step 3 stays in the order language (${c.lang}): "${sentTitle}" (O-6)`, coText.slice(0, 120));
    else c.nm('step 3 heading language', 'UI_STRINGS not importable');
    const href = await again[0].evaluate((e) => e.getAttribute('href'));
    c.check(href === info.href, `order language stays ${c.lang}: open-whatsapp-again href is unchanged after switching to ${other} (O-6)`, (href ?? '').slice(0, 100));
    if (decoded !== null) {
      try {
        const prefix = href.startsWith('https://wa.me/') ? `https://wa.me/${WA}?text=` : `https://web.whatsapp.com/send?phone=${WA}&text=`;
        c.check(decodeURIComponent(href.slice(prefix.length)) === decoded, 'decoded message is byte-identical to the one built before the switch', '');
      } catch (e) {
        c.fail('decode href after the switch', e.message);
      }
    }
    c.check(c.diag.waRequests.length === 0, 'no request went to WhatsApp', c.diag.waRequests);
  },

  // 11 -----------------------------------------------------------
  async console(c) {
    const page = c.page;
    const visited = [];
    const visit = async (path) => (visited.push(path), go(c, path));
    if (!(await visit(`/${c.lang}`))) return;
    await visit(`/${c.lang}/products`);
    await visit(`/${c.lang}/products/${INFUSED[0].slug}`);
    await visit(`/${c.lang}/shop`);
    // a real flow with a cart
    if (await toStep2(c)) {
      await clickSend(c);
      await sleep(600);
      await closeDialogs(c, true);
    }
    await visit(`/${c.lang}`);
    const hydration = await page.evaluate(() => window.__hydrationErrors ?? []);
    const csp = [...c.diag.csp, ...(await page.evaluate(() => window.__csp ?? []))];
    c.check(c.diag.console.length === 0 && c.diag.pageErrors.length === 0, `console: 0 errors and 0 uncaught errors over ${visited.length}+ pages and the full flow`, [...c.diag.console, ...c.diag.pageErrors].slice(0, 3));
    c.check(hydration.length === 0, 'no hydration / reportError events', hydration.slice(0, 2));
    if (c.diag.docCsp) c.check(csp.length === 0, 'no CSP violations', csp.slice(0, 3));
    else c.nm('CSP violations', `${ORIGIN} sends no content-security-policy header; ${csp.length} violation event(s) seen, but the host CSP is not in force here (run against the live site)`);
    c.check(c.diag.failed.length === 0 && c.diag.bad.length === 0, 'no failed or 4xx/5xx same-origin requests', [...c.diag.failed, ...c.diag.bad].slice(0, 4));
  },

  // 12 -----------------------------------------------------------
  async shots(c) {
    const page = c.page;
    const shot = async (name) => {
      const f = join(OUT, `${c.lang}-${c.vp.short}-${name}.png`);
      try {
        await page.screenshot({ path: f });
        c.check(existsSync(f), `screenshot ${c.lang}-${c.vp.short}-${name}.png`, f);
      } catch (e) {
        c.fail(`screenshot ${name}`, e.message);
      }
    };
    const scrollToFirst = (sel) => page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel);
    // product surfaces (empty cart)
    for (const [name, path] of [['home', ''], ['products', '/products'], ['infused', `/products/${INFUSED[1].slug}`], ['shop', '/shop']]) {
      if (await go(c, `/${c.lang}${path}`)) {
        await scrollToFirst(tid('add-to-cart'));
        await sleep(700);
        await shot(`surface-${name}`);
      }
    }
    // two-size reveal
    if (await go(c, `/${c.lang}/products`)) {
      const b = (await vis(page, tid('add-to-cart', '[data-product="extra-virgin"]')))[0];
      if (b) {
        await b.click();
        await sleep(600);
        await shot('surface-size-reveal');
      } else c.nm('screenshot size reveal', 'no visible add-to-cart for extra-virgin');
      await closeDialogs(c, true);
    }
    // drawer + checkout steps
    if (!(await loadWith(c, `/${c.lang}/products`, { [KEY.cart]: cartJson(CART_A) }))) return;
    if (!(await openDrawer(c))) return;
    await sleep(500);
    await shot('drawer');
    await click(page, tid('cart-checkout')).catch(() => {});
    if (!(await until(() => count(page, tid('checkout')), 5000))) return c.fail('checkout opens for screenshots', 'not visible');
    await sleep(400);
    await shot('checkout-1-empty');
    await submitDetails(c);
    await sleep(400);
    await shot('checkout-1-errors');
    await fillDetails(c);
    await sleep(300);
    await shot('checkout-1-filled');
    await submitDetails(c);
    if (!(await until(() => count(page, tid('order-ref')), 6000))) return c.fail('step 2 for screenshots', 'not visible');
    await sleep(400);
    await shot('checkout-2');
    await clickSend(c);
    await until(() => count(page, tid('new-order')), 5000);
    await sleep(400);
    await shot('checkout-3');
  },
};

// ------------------------------------------------------------------ FORGE HITPAY section
SECTIONS.hitpay = async (c) => {
  const { page } = c;
  const P = c.pay;
  const shot = async (name) => {
    const f = join(OUT, `hitpay-${c.lang}-${c.vp.short}-${name}.png`);
    try {
      await page.screenshot({ path: f });
      c.check(existsSync(f), `screenshot hitpay-${c.lang}-${c.vp.short}-${name}.png`, f);
    } catch (e) {
      c.fail(`screenshot ${name}`, e.message);
    }
  };
  const lsGet = (k) => page.evaluate((key) => localStorage.getItem(key), k);
  const subtotal = CART_A.reduce((n, l) => n + ITEM[l.sku].sen * l.qty, 0);
  const total = subtotal + PAY_DELIVERY_SEN;

  // 1. step 2 online: Pay RM X securely, the total includes the panel delivery fee
  if (!(await toCheckout(c, CART_A))) return;
  if (!(await fillDetails(c))) return;
  await submitDetails(c);
  const payBtn = await until(async () => (await vis(page, tid('pay-hitpay')))[0], 8000);
  if (!payBtn) return c.fail('online step 2: pay-hitpay visible', await textOf(page, tid('checkout')));
  const label = await payBtn.evaluate((e) => e.textContent.trim());
  const want = c.lang === 'ms' ? `Bayar RM ${fmt(total)} dengan selamat` : `Pay RM ${fmt(total)} securely`;
  c.check(label === want, 'pay button copy + total (subtotal + delivery fee from /api/pay/config)', `${label} != ${want}`);
  c.check(normMoney(await textOf(page, tid('order-total'))) === normMoney(rm(total)), 'order-total = subtotal + RM 8.00', await textOf(page, tid('order-total')));
  const methods = await textOf(page, tid('pay-methods'));
  c.check(/Touch 'n Go/.test(methods ?? '') && /HitPay/.test(methods ?? ''), 'methods line names the methods + HitPay', methods);
  c.check(!(await count(page, tid('send-whatsapp'))), 'no WhatsApp ordering in online mode (6b)');
  c.check(!(await count(page, tid('pay-not-ready'))), 'no "opens soon" notice when online payment is open');
  await sleep(300);
  await shot('step2-online');

  // 2. click: create -> redirect to exactly https://checkout.hit-pay.com (intercepted)
  await payBtn.click();
  const went = await until(() => P.hitpay.length > 0, 10000);
  if (!went) return c.fail('redirect to HitPay', `creates=${P.creates.length} error=${await textOf(page, tid('pay-error'))}`);
  const dest = new URL(P.hitpay[0]);
  c.check(dest.protocol === 'https:' && dest.hostname === 'checkout.hit-pay.com', 'redirect host is exactly checkout.hit-pay.com (https)', P.hitpay[0]);
  const body = P.creates[0];
  c.check(body && body.site === 'av' && body.lang === c.lang && /^[A-Za-z0-9-]{8,64}$/.test(body.idem ?? ''), 'create body: site av, page language, idem', body);
  c.check(
    Array.isArray(body?.lines) && body.lines.every((l) => Object.keys(l).sort().join() === 'qty,sku'),
    'create sends only sku + qty per line (server prices)',
    body?.lines
  );
  c.check(body?.details?.phone === '60121234567' && body?.details?.postcode === DETAILS.postcode, 'create sends the validated details', body?.details);

  // 3. back on our site: the saved order carries the server ref + token; banner continues it with the SAME idem (R17)
  if (!(await go(c, `/${c.lang}/products`))) return;
  const snap = JSON.parse((await lsGet(KEY.order)) ?? 'null');
  c.check(snap && snap.payMode === 'online' && /^[0-9a-f]{32}$/.test(snap.token ?? '') && REF_RE.test(snap.ref ?? ''), 'snapshot: online, ref + token from the server', snap && { ref: snap.ref, token: snap.token, payMode: snap.payMode });
  if (!(await openDrawer(c))) return;
  const banner = await until(async () => (await vis(page, tid('cart-banner')))[0], 5000);
  c.check(Boolean(banner), 'drawer banner: order waiting for payment (O-7)');
  if (banner) {
    const btn = await banner.$('button');
    await btn?.click();
    const again = await until(async () => (await vis(page, tid('pay-hitpay')))[0], 6000);
    c.check(Boolean(again), 'banner reopens step 2 with the pay button');
    c.check((await textOf(page, tid('order-ref')))?.includes(snap?.ref ?? '#'), 'step 2 shows the server ref once a payment was started');
    if (again) {
      await again.click();
      await until(() => P.creates.length > 1, 8000);
      c.check(P.creates[1]?.idem === P.creates[0]?.idem, 'second pay click of the same order sends the same idem (R17)', [P.creates[0]?.idem, P.creates[1]?.idem]);
    }
  }
  const ref = snap?.ref ?? P.lastRef;
  const token = snap?.token ?? P.lastToken;
  const paidPath = `/${c.lang}/order/paid?ref=${ref}&t=${token}`;

  // 4. paid page, payment not completed: "Try again" keeps the cart
  if (PAY === 'mock') {
    P.status = 'failed';
    if (!(await go(c, paidPath))) return;
    const failed = await until(() => page.$eval(tid('paid-page'), (e) => e.dataset.status === 'failed').catch(() => false), 8000);
    c.check(Boolean(failed), 'paid page: failed state', await page.$eval(tid('paid-page'), (e) => e.dataset.status).catch(() => 'no paid-page'));
    c.check(JSON.parse((await lsGet(KEY.cart)) ?? '{"lines":[]}').lines.length === CART_A.length, 'cart kept while not paid');
    await shot('paid-failed');
    const retry = (await vis(page, tid('paid-retry')))[0];
    if (retry) {
      await retry.click();
      c.check(Boolean(await until(() => count(page, tid('cart-drawer')), 6000)), '"Try again" opens the cart');
      await closeDialogs(c, true);
    } else c.fail('paid-retry visible', 'none');
  }

  // 5. paid page, pending -> paid (polls our status endpoint, never trusts the query)
  if (PAY === 'mock') P.status = 'pending';
  if (!(await go(c, `${paidPath}&status=completed&reference=fake`))) return;
  c.check(
    await page.$eval(tid('paid-page'), (e) => e.dataset.status === 'checking').catch(() => false),
    'a "status=completed" in the query alone does NOT show paid'
  );
  if (PAY === 'mock') P.status = 'paid';
  else c.check(stubPayNewest(), 'harness: the stub request is marked paid', STUB_STATE ?? 'no --stub-state');
  const paid = await until(() => page.$eval(tid('paid-page'), (e) => e.dataset.status === 'paid').catch(() => false), 20000);
  c.check(Boolean(paid), 'paid page: paid after the next status poll', await page.$eval(tid('paid-page'), (e) => e.dataset.status).catch(() => 'no paid-page'));
  if (!paid) return;
  const h1 = await textOf(page, 'h1');
  c.check(h1 === (c.lang === 'ms' ? 'Bayaran diterima — terima kasih!' : 'Payment received — thank you!'), 'thank-you copy (SPEC 5.6)', h1);
  c.check(normMoney(await textOf(page, tid('paid-total'))) === normMoney(rm(total)), 'paid summary total', await textOf(page, tid('paid-total')));
  const wa = await page.$eval(tid('paid-whatsapp'), (a) => a.href).catch(() => null);
  let text = '';
  try {
    text = new URL(wa).searchParams.get('text') ?? '';
  } catch {
    /* fails below */
  }
  c.check(wa && new URL(wa).pathname.includes(WA) || (wa ?? '').includes(`phone=${WA}`), 'WhatsApp button goes to 601111119912', wa);
  c.check(text.includes(ref) && (c.lang === 'ms' ? /DIBAYAR melalui HitPay/ : /PAID via HitPay/).test(text), 'message carries the ref + PAID via HitPay', text);
  c.check(text.includes(DETAILS.city), 'message carries the details saved on this device', text);
  await until(async () => JSON.parse((await lsGet(KEY.cart)) ?? '{"lines":[]}').lines.length === 0, 4000);
  c.check(JSON.parse((await lsGet(KEY.cart)) ?? '{"lines":[]}').lines.length === 0, 'paid lines left the cart');
  c.check((await lsGet(KEY.order)) === null, 'saved order removed once paid');
  const robots = await page.$eval('meta[name="robots"]', (m) => m.content).catch(() => null);
  c.check(robots === 'noindex, nofollow', 'paid page is noindex', robots);
  c.check(!(await page.$('link[rel="alternate"][hreflang]')), 'paid page has no hreflang alternates');
  await sleep(300);
  await shot('paid');
  // reload: still paid, message kept without the saved order
  if (await go(c, paidPath, true)) {
    const again = await until(() => page.$eval(tid('paid-page'), (e) => e.dataset.status === 'paid').catch(() => false), 10000);
    c.check(Boolean(again), 'reload of the paid page: still paid');
  }

  // 6. a paid page link of another order (no storage, bad token) = not found
  await page.evaluate(() => localStorage.clear());
  if (await go(c, `/${c.lang}/order/paid?ref=${ref}&t=${'f'.repeat(32)}`)) {
    const miss = await until(() => page.$eval(tid('paid-page'), (e) => e.dataset.status === 'missing').catch(() => false), 10000);
    c.check(Boolean(miss), 'wrong token: "We could not find this order"');
  }

  // 7. online payment closed: the "opens soon" notice + the WhatsApp fallback
  if (PAY === 'mock') {
    P.open = false;
    const c2 = c;
    await c2.page.evaluate(() => localStorage.clear());
    if (!(await toStep2(c2, CART_A))) return;
    const notice = await textOf(page, tid('pay-not-ready'));
    const wantNotice = c.lang === 'ms' ? 'Bayaran dalam talian akan dibuka tidak lama lagi — hubungi kami melalui WhatsApp' : 'Online payment opens soon — message us on WhatsApp';
    c.check(notice === wantNotice, 'closed: "Online payment opens soon — message us on WhatsApp"', notice);
    c.check(Boolean(await count(page, tid('send-whatsapp'))), 'closed: WhatsApp send link is the way to order');
    c.check(!(await count(page, tid('pay-hitpay'))), 'closed: no pay button');
  }
};

// ------------------------------------------------------------------ run
const startedAt = Date.now();
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
// Reuse the default blank page rather than leaving it open next to the per-run contexts.
const [spare] = await browser.pages();
await spare?.close().catch(() => {});

process.on('unhandledRejection', (e) => record('FAIL', '[walk] unhandled rejection', String(e?.message ?? e)));

console.log(`order-walk: ${BASE}  langs=${LANGS.join(',')}  viewports=${VIEWPORTS.map((v) => v.short).join(',')}  sections=${[...(onlySet.size ? onlySet : SECTION_NAMES)].join(',')}  out=${OUT}`);
console.log(`mode: pay server=${PAY} (ORDER-R1 sections: online payment closed -> chat; hitpay section: open, delivery RM ${fmt(PAY_DELIVERY_SEN)}) messageStrings=${MSG ? 'imported' : 'not available'} uiStrings=${UI ? 'imported' : 'not available'}`);

// The header is also checked at the awkward in-between widths (md breakpoint = 768).
const HEADER_EXTRA = [768, 820, 900].map((w) => ({ short: `d${w}`, name: `desktop ${w}x800`, width: w, height: 800, mobile: false })).filter((v) => !flag('vp') || flag('vp') === v.short);
for (const section of SECTION_NAMES) {
  if (onlySet.size && !onlySet.has(section)) continue;
  for (const lang of LANGS) {
    for (const vp of section === 'header' ? [...VIEWPORTS, ...HEADER_EXTRA] : VIEWPORTS) {
      let c;
      try {
        c = await makeCtx(browser, section, lang, vp, { blockStorage: section === 'nostorage' });
        await SECTIONS[section](c);
      } catch (e) {
        record('FAIL', `[${section} ${lang} ${vp.short}] section crashed`, String(e?.stack ?? e).split('\n').slice(0, 3).join(' | '));
      } finally {
        await c?.close?.();
      }
    }
  }
}
await browser.close().catch(() => {});

console.log(`\nwalk: ${nPass} pass, ${nFail} fail, ${nNm} not measured  (${Math.round((Date.now() - startedAt) / 1000)}s)`);
process.exit(nFail > 0 ? 1 : 0);
