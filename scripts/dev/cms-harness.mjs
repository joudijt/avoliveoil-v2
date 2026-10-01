// DEV-ONLY harness for the CMS blocks, the builder canvas and the in-place editor
// (builder B3b). Not part of the build or any gate.
//
//   node scripts/dev/cms-harness.mjs [outDir]
//
// Starts `vite` on :5182, then with headless Chrome:
//  1. frames /cms-canvas in scripts/dev/cms-shell.html (a stand-in for the admin
//     shell), posts a doc using every widget type, screenshots 1280/820/390 × EN/MS,
//     drives select / toolbar / drag-from-shell / drag-to-move / in-place text and
//     asserts the CanvasToShell replies;
//  2. opens the public route /<lang>/cms-harness (the page API is answered by
//     request interception) and checks that [data-cms-page-root] equals
//     renderPageHtml() for the same doc, byte for byte after attribute-order /
//     style normalisation; drives the form (429 / field error / success), the
//     lightbox, the FAQ, the not-found view and the prerender template;
//  3. opens /en/why-us?cms-edit=1 with an injected edit boot and drives inlineEdit.ts.
// Every class in the rendered markup must be in CMS_CLASS_LIST and in the CSS.
// Exit code 1 when any check fails; screenshots land in outDir.
import { createServer } from 'vite';
import puppeteer from 'puppeteer';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { buildDoc, payloadFor, MEDIA, FORMS } from './cms-fixture.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = process.argv[2] ?? join(tmpdir(), 'cms-harness');
mkdirSync(OUT, { recursive: true });
const PORT = 5182;
const BASE = `http://localhost:${PORT}`;
const SLUG = 'cms-harness';

const failures = [];
const passes = [];
function check(cond, name, detail) {
  if (cond) passes.push(name);
  else {
    failures.push(`${name}${detail ? ` — ${typeof detail === 'string' ? detail : JSON.stringify(detail)}` : ''}`);
    console.log(`  FAIL ${name}`, detail ?? '');
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const DOC = buildDoc();
const byType = (type) => DOC.sections.flatMap((s) => s.columns.flatMap((c) => c.widgets)).filter((w) => w.type === type);

// ------------------------------------------------------------------ server + browser
const server = await createServer({
  root: ROOT,
  logLevel: 'warn',
  server: { port: PORT, strictPort: true },
  optimizeDeps: { include: ['react-dom/server', 'react-icons/gi', 'react-icons/fi', 'react-icons/fa'] },
});
await server.listen();

const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = (await browser.pages())[0] ?? (await browser.newPage());
page.setDefaultTimeout(30000);

const consoleErrors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') {
    const text = m.text();
    // Vite's own chatter and React DevTools hint are not app problems.
    if (/Download the React DevTools|\[vite\]|WebSocket connection to 'ws:\/\/localhost|Failed to send error to Vite server/.test(text)) return;
    // The form / not-found tests answer 429, 422 and 404 on purpose.
    if (/Failed to load resource: the server responded with a status of (429|422|404)/.test(text)) return;
    consoleErrors.push(`[${m.type()}] ${text}`.slice(0, 400));
  }
});
page.on('pageerror', (e) => consoleErrors.push(`[pageerror] ${e.message}`.slice(0, 400)));

// ------------------------------------------------------------------ request interception
let formMode = 'ok';
let pageApiHits = 0;
const formBodies = [];
const EDIT_BOOT = {
  v: 1,
  build: 'dev',
  lang: 'en',
  text: { en: {}, ms: {} },
  images: { en: {}, ms: {} },
  menu: { en: { header: [], footer: [] }, ms: { header: [], footer: [] } },
  edit: true,
};

await page.setRequestInterception(true);
page.on('request', async (req) => {
  try {
    const url = new URL(req.url());
    if (url.origin === BASE) {
      if (url.pathname === '/api/public/page') {
        pageApiHits++;
        const slug = url.searchParams.get('slug');
        const lang = url.searchParams.get('lang');
        if (slug === SLUG && (lang === 'en' || lang === 'ms')) {
          return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(payloadFor(DOC, SLUG, lang)) });
        }
        return req.respond({ status: 404, contentType: 'application/json', body: JSON.stringify({ error: { code: 'not_found', message: 'Not found' } }) });
      }
      if (/^\/api\/forms\/\d+\/submit$/.test(url.pathname)) {
        formBodies.push({ path: url.pathname, body: req.postData(), contentType: req.headers()['content-type'] });
        if (formMode === '429') return req.respond({ status: 429, contentType: 'application/json', body: '{"error":{"code":"rate","message":"Too many"}}' });
        if (formMode === '422')
          return req.respond({
            status: 422,
            contentType: 'application/json',
            body: JSON.stringify({ error: { code: 'invalid', message: 'Check the form', fields: { email: 'Enter a valid email address.' } } }),
          });
        return req.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      }
      if (url.pathname.startsWith('/cms-assets/')) {
        const file = join(ROOT, 'src/assets/opt', url.pathname.slice('/cms-assets/'.length));
        if (existsSync(file)) return req.respond({ status: 200, contentType: 'image/webp', body: readFileSync(file) });
        return req.respond({ status: 404, body: '' });
      }
      if (url.searchParams.get('cms-edit') === '1' && req.resourceType() === 'document') {
        const res = await fetch(`${BASE}${url.pathname}`);
        let html = await res.text();
        html = html.replace('</body>', `<script id="cms-boot" type="application/json">${JSON.stringify(EDIT_BOOT)}</script></body>`);
        return req.respond({ status: 200, contentType: 'text/html; charset=utf-8', body: html });
      }
      return req.continue();
    }
    // Third-party embeds: answered locally so the run needs no network.
    if (/youtube-nocookie\.com|player\.vimeo\.com/.test(url.hostname)) {
      return req.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><title>embed</title><body style="margin:0;background:#111"></body>' });
    }
    if (/example\.com$/.test(url.hostname)) return req.respond({ status: 204, body: '' });
    return req.continue();
  } catch (e) {
    console.log('intercept error', e);
    try {
      await req.continue();
    } catch {
      /* already handled */
    }
  }
});

// ------------------------------------------------------------------ helpers
const shellUrl = `${BASE}/scripts/dev/cms-shell.html`;
async function msgs() {
  return page.evaluate(() => window.__msgs.slice());
}
async function waitMsg(pred, label, timeout = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const all = await msgs();
    const hit = all.find(pred);
    if (hit) return hit;
    await sleep(60);
  }
  check(false, `message: ${label}`, 'timed out');
  return null;
}
async function clearMsgs() {
  await page.evaluate(() => {
    window.__msgs = [];
  });
}
async function send(msg) {
  await page.evaluate((m) => window.__send(m), msg);
}
async function frame() {
  const h = await page.$('#f');
  return h.contentFrame();
}
async function waitImages(f) {
  await f.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.race([
      Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => ((i.onload = r), (i.onerror = r)))))),
      new Promise((r) => setTimeout(r, 6000)),
    ]);
  });
}

/** Class contract: every class in `rootSel` is in CMS_CLASS_LIST and has a CSS rule. */
async function classAudit(ctx, rootSel, label) {
  const res = await ctx.evaluate(async (sel) => {
    const { CMS_CLASS_LIST } = await import('/src/cms/blocks/classes.ts');
    const list = new Set(CMS_CLASS_LIST);
    const root = document.querySelector(sel);
    const used = new Set();
    root?.querySelectorAll('[class]').forEach((el) => {
      const cls = el.getAttribute('class') ?? '';
      cls.split(/\s+/).forEach((c) => c && used.add(c));
    });
    if (root?.getAttribute('class')) root.getAttribute('class').split(/\s+/).forEach((c) => c && used.add(c));
    const selectors = [];
    const walk = (rules) => {
      for (const r of rules) {
        if (r.selectorText) selectors.push(r.selectorText);
        if (r.cssRules) walk(r.cssRules);
      }
    };
    for (const sh of document.styleSheets) {
      try {
        walk(sh.cssRules);
      } catch {
        /* cross-origin sheet */
      }
    }
    const blob = selectors.join('\n');
    const notInList = [...used].filter((c) => !list.has(c));
    const noCss = [...list].filter((c) => !blob.includes(`.${CSS.escape(c)}`));
    return { used: used.size, listSize: list.size, notInList, noCss };
  }, rootSel);
  check(res.notInList.length === 0, `${label}: every emitted class is in CMS_CLASS_LIST`, res.notInList);
  check(res.noCss.length === 0, `${label}: every CMS_CLASS_LIST class has a CSS rule`, res.noCss);
  return res;
}

// ================================================================== 1. canvas
console.log('1. canvas');
await page.setViewport({ width: 1300, height: 900 });
await page.goto(shellUrl, { waitUntil: 'load' });

const WIDTHS = [1280, 820, 390];
for (const lang of ['en', 'ms']) {
  for (const width of WIDTHS) {
    await page.setViewport({ width: width + 20, height: 900 });
    await page.evaluate((src, w) => window.__open(src, w), `/cms-canvas?lang=${lang}`, width);
    await waitMsg((m) => m.type === 'cms:ready', `cms:ready ${lang} ${width}`, 30000);
    await send({ type: 'cms:doc', doc: DOC, lang, media: MEDIA, forms: FORMS, selectedId: null });
    const f = await frame();
    await f.waitForSelector('[data-node-kind="section"]');
    await waitImages(f);
    await sleep(300);
    const h = await waitMsg((m) => m.type === 'cms:height' && m.px > 1500, `cms:height ${lang} ${width}`);
    check(!!h, `canvas ${lang} ${width}: height reported`, h);
    await (await page.$('#f')).screenshot({ path: join(OUT, `canvas-${lang}-${width}.png`) });

    if (width === 390) {
      const tag = await f.evaluate(() => {
        const el = document.querySelector('[data-hide~="mobile"]');
        return el ? getComputedStyle(el, '::after').content : null;
      });
      check(tag && tag.includes('Hidden on mobile'), `canvas ${lang} 390: hidden-on-mobile widget is tagged, not removed`, tag);
    }
    if (width === 820) {
      const tag = await f.evaluate(() => {
        const el = document.querySelector('section[data-hide~="tablet"]');
        return el ? [getComputedStyle(el, '::after').content, getComputedStyle(el).display] : null;
      });
      check(tag && tag[0].includes('Hidden on tablet') && tag[1] !== 'none', `canvas ${lang} 820: hidden-on-tablet section is tagged`, tag);
    }
    if (lang === 'ms' && width === 1280) {
      const ph = await f.evaluate(() => Array.from(document.querySelectorAll('[data-cms-placeholder]')).map((e) => e.textContent));
      check(ph.some((t) => t.startsWith('Translate:')), 'canvas ms: untranslated texts show a "Translate:" hint', ph);
    }
  }
}

// ---- interaction tests at 1280 EN
console.log('   interactions');
await page.setViewport({ width: 1300, height: 900 });
await page.evaluate((w) => window.__open('/cms-canvas?lang=en', w), 1280);
await waitMsg((m) => m.type === 'cms:ready', 'cms:ready (interactions)', 30000);
await send({ type: 'cms:doc', doc: DOC, lang: 'en', media: MEDIA, forms: FORMS, selectedId: null });
let f = await frame();
await f.waitForSelector('[data-node-kind="section"]');
await waitImages(f);
await classAudit(f, 'main', 'canvas');

const h1 = byType('heading')[0];
const sec2 = DOC.sections[1];

// spacing: index.css zeroes p/h margins outside any layer, so blocks must space with gap/padding
const gaps = await f.evaluate(() => {
  const r = (el) => el.getBoundingClientRect();
  const kicker = document.querySelector('h1').previousElementSibling;
  const card = document.querySelector('ul a[href*="/products/"]');
  const box = card.firstElementChild;
  const name = card.querySelector('h3');
  const text = document.querySelectorAll('[data-cms-field="html"]')[1];
  const ul = text.querySelector('ul');
  const bq = text.querySelector('blockquote');
  return {
    kickerToH1: r(document.querySelector('h1')).top - r(kicker).bottom,
    boxToName: parseFloat(getComputedStyle(name).paddingTop) + (r(name).top - r(box).bottom),
    pToUl: r(ul).top - r(ul.previousElementSibling).bottom,
    bqToP: r(bq.nextElementSibling).top - r(bq).bottom,
  };
});
check(gaps.kickerToH1 >= 10 && gaps.boxToName >= 18 && gaps.pToUl >= 14 && gaps.bqToP >= 14, 'spacing between kicker/heading, card image/title, text blocks', gaps);

// select by click
await clearMsgs();
await f.click(`[data-node-id="${h1.id}"] h1`);
let m = await waitMsg((x) => x.type === 'cms:select', 'click selects');
check(m?.id === h1.id, 'click on a heading sends cms:select with its id', m);
await f.waitForSelector('.cmsc-toolbar');
await f.hover(`[data-node-id="${byType('text')[0].id}"]`);
await sleep(100);
await page.screenshot({ path: join(OUT, 'canvas-selected.png'), clip: { x: 0, y: 0, width: 1280, height: 640 } });
const geo = await f.evaluate((id) => {
  const el = document.querySelector(`[data-node-id="${id}"]`).getBoundingClientRect();
  const tb = document.querySelector('.cmsc-toolbar').getBoundingClientRect();
  return { elTop: el.top, elBottom: el.bottom, tbTop: tb.top, tbBottom: tb.bottom };
}, h1.id);
check(geo.tbBottom <= geo.elTop + 0.5 || geo.tbTop >= geo.elBottom - 0.5, 'selection toolbar sits outside the widget box', geo);

// toolbar action
await clearMsgs();
await f.click('.cmsc-toolbar button[aria-label="Move down"]');
m = await waitMsg((x) => x.type === 'cms:action', 'toolbar action');
check(m?.id === h1.id && m?.action === 'down', 'toolbar "Move down" sends cms:action down', m);
await clearMsgs();
await f.click('.cmsc-toolbar button[aria-label="Duplicate"]');
m = await waitMsg((x) => x.type === 'cms:action', 'toolbar duplicate');
check(m?.action === 'duplicate', 'toolbar "Duplicate" sends cms:action duplicate', m);
const upDisabled = await f.evaluate(() => document.querySelector('.cmsc-toolbar button[aria-label="Move up"]').disabled);
check(upDisabled, 'first widget: "Move up" is disabled');

// shell-driven selection of a section
await send({ type: 'cms:select', id: sec2.id });
await f.waitForSelector('.cmsc-selected.cmsc-section');
check(true, 'cms:select from the shell outlines the section');

// links never navigate, forms never submit
const before = f.url();
await f.click('a[href="/en/products"]');
await sleep(300);
check(f.url() === before, 'canvas: clicking a link does not navigate', f.url());

// add-section bar
await clearMsgs();
await f.evaluate(() => {
  const b = document.querySelector('.cmsc-gap button');
  b.style.opacity = '1';
  b.click();
});
m = await waitMsg((x) => x.type === 'cms:action' && x.action === 'add-section-after', 'add section bar');
check(m?.id === DOC.sections[0].id, '"+ Add section" bar sends add-section-after for the section above', m);

// empty column click
await clearMsgs();
const emptyCol = DOC.sections[7].columns[2];
await f.click(`[data-cms-empty-col][data-column-id="${emptyCol.id}"]`);
m = await waitMsg((x) => x.type === 'cms:action' && x.action === 'add-widget', 'empty column click');
check(m?.id === emptyCol.id, 'empty column placeholder sends add-widget for that column', m);

/** Synthetic HTML5 drag events inside the iframe. */
async function dragAt(sel, where, type, opts = {}) {
  return f.evaluate(
    (sel, where, type, opts) => {
      const el = document.querySelector(sel);
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      const x = r.left + r.width * (where.x ?? 0.5);
      const y = r.top + r.height * (where.y ?? 0.5);
      const target = document.elementFromPoint(x, y) ?? el;
      const dt = new DataTransfer();
      if (opts.text) dt.setData('text/plain', opts.text);
      const ev = new DragEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, dataTransfer: dt });
      target.dispatchEvent(ev);
      return { prevented: ev.defaultPrevented };
    },
    sel,
    where,
    type,
    opts
  );
}

// (a) new widget dragged from the shell into section 2 / column 2, top half of its 2nd widget
const col2 = sec2.columns[1];
await clearMsgs();
await send({ type: 'cms:drag-start', payload: { kind: 'new-widget', widgetType: 'heading' } });
await sleep(50);
const ov = await dragAt(`[data-node-id="${col2.widgets[1].id}"]`, { y: 0.2 }, 'dragover');
check(ov.prevented, 'dragover over a column is accepted (preventDefault)');
await f.waitForSelector('.cmsc-drop');
{
  const top = await f.$eval(`[data-node-id="${col2.id}"]`, (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.screenshot({ path: join(OUT, 'canvas-dragging.png'), clip: { x: 0, y: Math.max(0, top - 120), width: 1280, height: 700 } });
}
await dragAt(`[data-node-id="${col2.widgets[1].id}"]`, { y: 0.2 }, 'drop');
m = await waitMsg((x) => x.type === 'cms:drop', 'drop new widget');
check(
  m?.payload?.kind === 'new-widget' && m?.payload?.widgetType === 'heading' && m?.target?.columnId === col2.id && m?.target?.index === 1,
  'shell drag of a new widget → cms:drop {columnId, index}',
  m
);
await send({ type: 'cms:drag-end' });
await sleep(50);
check(!(await f.$('.cmsc-drop')), 'drop indicator cleared after the drop');

// (a') into an empty column
await clearMsgs();
await send({ type: 'cms:drag-start', payload: { kind: 'new-widget', widgetType: 'text' } });
await dragAt(`[data-cms-empty-col][data-column-id="${emptyCol.id}"]`, {}, 'dragover');
const activeCol = await f.evaluate(() => !!document.querySelector('[data-cms-empty-col][data-drop-active]'));
check(activeCol, 'empty column highlights while a widget is dragged over it');
await dragAt(`[data-cms-empty-col][data-column-id="${emptyCol.id}"]`, {}, 'drop');
m = await waitMsg((x) => x.type === 'cms:drop', 'drop into empty column');
check(m?.target?.columnId === emptyCol.id && m?.target?.index === 0, 'drop into an empty column → index 0', m);
await send({ type: 'cms:drag-end' });

// (a'') new section between sections 3 and 4 (pointer in the top half of section 4)
await clearMsgs();
await send({ type: 'cms:drag-start', payload: { kind: 'new-section', templateId: 'two-columns' } });
await dragAt(`[data-node-id="${DOC.sections[3].id}"]`, { y: 0.1 }, 'dragover');
await f.waitForSelector('.cmsc-drop.cmsc-section');
await dragAt(`[data-node-id="${DOC.sections[3].id}"]`, { y: 0.1 }, 'drop');
m = await waitMsg((x) => x.type === 'cms:drop', 'drop new section');
check(m?.payload?.kind === 'new-section' && m?.target?.sectionIndex === 3, 'shell drag of a new section → cms:drop {sectionIndex}', m);
await send({ type: 'cms:drag-end' });

// (b) move an existing widget with the toolbar handle
const moving = col2.widgets[0];
await clearMsgs();
await send({ type: 'cms:select', id: moving.id });
await f.waitForSelector('.cmsc-toolbar [draggable]');
await dragAt('.cmsc-toolbar [draggable]', {}, 'dragstart', { text: moving.id });
const destCol = DOC.sections[1].columns[0];
await dragAt(`[data-node-id="${destCol.widgets[0].id}"]`, { y: 0.8 }, 'dragover');
await dragAt(`[data-node-id="${destCol.widgets[0].id}"]`, { y: 0.8 }, 'drop');
m = await waitMsg((x) => x.type === 'cms:drop' && x.payload?.kind === 'move', 'move drop');
check(m?.payload?.id === moving.id && m?.target?.columnId === destCol.id && m?.target?.index === 1, 'drag handle move → cms:drop {kind:"move"}', m);

// (b') move a section down by one (drop below section 2 = final index 2)
await clearMsgs();
await send({ type: 'cms:select', id: DOC.sections[0].id });
await f.waitForSelector('.cmsc-toolbar.cmsc-section [draggable]');
await dragAt('.cmsc-toolbar [draggable]', {}, 'dragstart', { text: DOC.sections[0].id });
await dragAt(`[data-node-id="${DOC.sections[2].id}"]`, { y: 0.2 }, 'dragover');
await dragAt(`[data-node-id="${DOC.sections[2].id}"]`, { y: 0.2 }, 'drop');
m = await waitMsg((x) => x.type === 'cms:drop' && x.payload?.kind === 'move', 'section move');
check(m?.payload?.id === DOC.sections[0].id && m?.target?.sectionIndex === 1, 'section move → final index (moveSection semantics)', m);
await send({ type: 'cms:select', id: null });

// in-place text: heading, Enter commits
await clearMsgs();
const hSel = `[data-node-id="${h1.id}"] h1`;
await f.click(hSel, { count: 2 });
await f.waitForSelector('[data-cms-editing]');
const ce = await f.evaluate(() => document.querySelector('[data-cms-editing]').getAttribute('contenteditable'));
check(ce === 'plaintext-only' || ce === 'true', 'double-click makes ONLY that heading editable', ce);
await page.keyboard.type('Bulk orders welcome');
await page.keyboard.press('Enter');
m = await waitMsg((x) => x.type === 'cms:inline-text', 'inline heading');
check(m?.widgetId === h1.id && m?.field === 'text' && m?.lang === 'en' && m?.value === 'Bulk orders welcome', 'Enter commits → cms:inline-text', m);
await sleep(150);
const after = await f.evaluate((s) => [document.querySelector(s)?.textContent, document.querySelector(s)?.getAttribute('contenteditable')], hSel);
check(after[0] === 'Bulk orders welcome' && after[1] === null, 'heading shows the new text (optimistic) and is no longer editable', after);

// Esc cancels
await clearMsgs();
const quote = byType('quote')[0];
const qSel = `[data-node-id="${quote.id}"] [data-cms-field="text"]`;
const qBefore = await f.evaluate((s) => document.querySelector(s).textContent, qSel);
await f.click(qSel, { count: 2 });
await f.waitForSelector('[data-cms-editing]');
await page.keyboard.type('zzz');
await page.keyboard.press('Escape');
await sleep(200);
const qAfter = await f.evaluate((s) => document.querySelector(s).textContent, qSel);
check(qAfter === qBefore && !(await msgs()).some((x) => x.type === 'cms:inline-text'), 'Esc cancels the edit (text restored, nothing sent)', { qBefore, qAfter });

// FAQ answer path
await clearMsgs();
const faq = byType('faq')[0];
const aSel = `[data-node-id="${faq.id}"] [data-cms-field="items.1.a"]`;
await f.click(aSel, { count: 2 });
await f.waitForSelector('[data-cms-editing]');
await page.keyboard.type('Yes, everywhere in Malaysia.');
await page.keyboard.press('Enter');
m = await waitMsg((x) => x.type === 'cms:inline-text', 'inline faq');
check(m?.field === 'items.1.a' && m?.widgetId === faq.id && m?.value === 'Yes, everywhere in Malaysia.', 'FAQ answer edit → field "items.1.a"', m);

// rich text: toolbar + bold + sanitised html
await clearMsgs();
const textW = sec2.columns[1].widgets[1];
const tSel = `[data-node-id="${textW.id}"] [data-cms-field="html"]`;
await f.click(tSel, { count: 2 });
await f.waitForSelector('.cmsc-rte');
await f.evaluate(() => {
  const el = document.querySelector('[data-cms-editing]');
  const p = el.querySelector('p');
  const r = document.createRange();
  r.selectNodeContents(p);
  const s = getSelection();
  s.removeAllRanges();
  s.addRange(r);
});
{
  const top = await f.$eval('[data-cms-editing]', (el) => el.getBoundingClientRect().top + window.scrollY);
  await page.screenshot({ path: join(OUT, 'canvas-richtext.png'), clip: { x: 0, y: Math.max(0, top - 100), width: 1280, height: 420 } });
}
await f.evaluate(() => {
  const b = document.querySelector('.cmsc-rte button[aria-label="Bold"]');
  b.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
});
await page.keyboard.press('Enter');
m = await waitMsg((x) => x.type === 'cms:inline-text', 'inline rich');
check(
  m?.field === 'html' && /<b>|<strong>/.test(m?.value ?? '') && !/script|onclick|style=/.test(m?.value ?? ''),
  'text widget: rich edit sends sanitised HTML with bold',
  m?.value
);

// the rendered public markup never contains the canvas-only hooks
const hooksInPublic = await f.evaluate(async (doc, media, forms) => {
  const { renderPageHtml } = await import('/src/cms/render.tsx');
  const html = renderPageHtml(doc, { lang: 'en', media, forms, text: {}, pageId: 42 });
  return /data-node-|data-cms-field|data-cms-placeholder|data-hide/.test(html);
}, DOC, MEDIA, FORMS);
check(!hooksInPublic, 'renderPageHtml output has no canvas hooks');

// sanitiser + URL rules (run in the browser: DOMParser)
const unit = await f.evaluate(async () => {
  const { sanitizeRichText, safeHref } = await import('/src/cms/sanitize.ts');
  const { parseVideoUrl } = await import('/src/cms/video.ts');
  const cases = [
    '<p>a <b>b</b></p><script>x</script>',
    '<img src=x onerror=alert(1)>text',
    '<a href="javascript:alert(1)">j</a><a href="//evil.com">e</a><a href="/en/contact">ok</a>',
    '<div>line one</div><div>line two</div>',
    'plain <em>run</em><ul><li>x</li></ul>tail',
    '<p style="color:red" class="x" onclick="y">s</p><iframe src="https://evil"></iframe><span>keep</span>',
    '<h2>T</h2><h5>five</h5><table><tr><td>cell</td></tr></table>',
    '<a href="https://madinah.com.my/" target="_self">m</a>',
  ];
  const out = cases.map((c) => {
    const once = sanitizeRichText(c);
    return { c, once, idempotent: sanitizeRichText(once) === once };
  });
  const hrefs = ['/en/x', '#a', 'https://a.b/c', 'mailto:a@b.c', 'tel:+60', '//x.y', 'javascript:1', 'java	script:1', 'data:text/html,1', 'ftp://x'].map((h) => [h, safeHref(h)]);
  const vids = ['https://youtu.be/dQw4w9WgXcQ', 'https://www.youtube.com/shorts/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ?x=1', 'https://vimeo.com/76979871', 'https://player.vimeo.com/video/76979871', '/uploads/cms/a.mp4', 'http://x.com/a.mp4', 'https://youtube.com/watch?v=bad', 'javascript:alert(1)'].map((v) => [v, parseVideoUrl(v)]);
  return { out, hrefs, vids };
});
check(unit.out.every((o) => o.idempotent), 'sanitizeRichText is idempotent', unit.out.filter((o) => !o.idempotent));
const joined = unit.out.map((o) => o.once).join(' | ');
check(!/script|onerror|onclick|style=|class=|iframe|<img|javascript|evil|<div|<table|<h5/.test(joined), 'sanitizeRichText strips everything outside the allow-list', joined);
check(/<p>line one<\/p><p>line two<\/p>/.test(joined) && /<p>plain <em>run<\/em><\/p><ul><li>x<\/li><\/ul><p>tail<\/p>/.test(joined), 'sanitizeRichText turns divs / loose runs into paragraphs', joined);
check(/href="https:\/\/madinah\.com\.my\/" target="_blank" rel="noopener noreferrer"/.test(joined), 'external links forced to new tab + noopener', joined);
const okHrefs = Object.fromEntries(unit.hrefs);
check(okHrefs['/en/x'] && okHrefs['#a'] && okHrefs['https://a.b/c'] && okHrefs['mailto:a@b.c'] && okHrefs['tel:+60'] && !okHrefs['//x.y'] && !okHrefs['javascript:1'] && !okHrefs['java	script:1'] && !okHrefs['data:text/html,1'] && !okHrefs['ftp://x'], 'safeHref allow-list', unit.hrefs);
const v = Object.fromEntries(unit.vids.map(([k, val]) => [k, val && (val.embed ?? val.src)]));
check(
  v['https://youtu.be/dQw4w9WgXcQ'] === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' &&
    v['https://www.youtube.com/shorts/dQw4w9WgXcQ'] === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' &&
    v['https://www.youtube.com/embed/dQw4w9WgXcQ?x=1'] === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' &&
    v['https://vimeo.com/76979871'] === 'https://player.vimeo.com/video/76979871' &&
    v['https://player.vimeo.com/video/76979871'] === 'https://player.vimeo.com/video/76979871' &&
    v['/uploads/cms/a.mp4'] === '/uploads/cms/a.mp4' && !v['http://x.com/a.mp4'] && !v['https://youtube.com/watch?v=bad'] && !v['javascript:alert(1)'],
  'parseVideoUrl: YouTube/Vimeo/mp4 only, privacy embeds',
  unit.vids
);

// inventory of the published markup, for the server sanitiser's allow-list (B2)
const inventory = await f.evaluate(async (doc, media, forms) => {
  const { renderPageHtml } = await import('/src/cms/render.tsx');
  const tags = new Map();
  for (const lang of ['en', 'ms']) {
    const t = document.createElement('template');
    t.innerHTML = renderPageHtml(doc, { lang, media, forms, text: {}, pageId: 42 });
    t.content.querySelectorAll('*').forEach((el) => {
      const name = el.tagName.toLowerCase();
      if (!tags.has(name)) tags.set(name, new Set());
      for (const a of el.attributes) tags.get(name).add(a.name);
    });
  }
  return Object.fromEntries([...tags].sort().map(([k, set]) => [k, [...set].sort()]));
}, DOC, MEDIA, FORMS);
console.log('   published-HTML inventory (tag: attributes):');
for (const [tag, attrs] of Object.entries(inventory)) console.log(`     ${tag}: ${attrs.join(' ')}`);

// ================================================================== 2. public page
console.log('2. public page');
async function normalise(html) {
  return page.evaluate((h) => {
    const t = document.createElement('template');
    t.innerHTML = h;
    t.content.querySelectorAll('[style]').forEach((el) => el.setAttribute('style', el.style.cssText));
    // Attribute order is not meaningful.
    t.content.querySelectorAll('*').forEach((el) => {
      const attrs = Array.from(el.attributes).map((a) => [a.name, a.value]).sort((a, b) => a[0].localeCompare(b[0]));
      attrs.forEach(([n]) => el.removeAttribute(n));
      attrs.forEach(([n, v]) => el.setAttribute(n, v));
    });
    return t.innerHTML;
  }, html);
}

for (const lang of ['en', 'ms']) {
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE}/${lang}/${SLUG}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('body[data-app-ready="true"]');
  await page.waitForSelector('[data-cms-page-root] section');
  const live = await page.$eval('[data-cms-page-root]', (el) => el.innerHTML);
  const rendered = await page.evaluate(
    async (doc, media, forms, lang) => {
      const { renderPageHtml } = await import('/src/cms/render.tsx');
      return renderPageHtml(doc, { lang, media, forms, text: {}, pageId: 42 });
    },
    DOC,
    MEDIA,
    FORMS,
    lang
  );
  const [a, b] = [await normalise(live), await normalise(rendered)];
  let at = 0;
  while (at < a.length && a[at] === b[at]) at++;
  check(a === b, `public ${lang}: [data-cms-page-root] === renderPageHtml()`, a === b ? '' : { at, live: a.slice(Math.max(0, at - 120), at + 120), rendered: b.slice(Math.max(0, at - 120), at + 120) });
  if (live !== rendered) {
    let i = 0;
    while (i < live.length && live[i] === rendered[i]) i++;
    console.log(`   note ${lang}: raw strings differ only in serialisation (normalised equal: ${a === b}) at ${i}:
     live:     ${live.slice(i - 60, i + 60)}
     rendered: ${rendered.slice(i - 60, i + 60)}`);
  }
  const title = await page.title();
  check(title === payloadFor(DOC, SLUG, lang).seo.title, `public ${lang}: <title> from ResolvedSeo`, title);
  const htmlLang = await page.$eval('html', (el) => el.getAttribute('lang'));
  check(htmlLang === lang, `public ${lang}: <html lang>`, htmlLang);
  await classAudit(page, '[data-cms-page-root]', `public ${lang}`);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await sleep(600);
  await page.screenshot({ path: join(OUT, `public-${lang}-1280.png`), fullPage: true });
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await sleep(600);
  await page.screenshot({ path: join(OUT, `public-${lang}-390.png`), fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(overflow <= 0, `public ${lang} 390: no horizontal overflow`, overflow);
  const hiddenOk = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-cms-page-root] .max-md\\:hidden'));
    return els.length > 0 && els.every((e) => getComputedStyle(e).display === 'none');
  });
  check(hiddenOk, `public ${lang} 390: hidden-on-mobile widgets are not displayed`);
}

// form behaviour (EN)
await page.setViewport({ width: 1280, height: 900 });
await page.goto(`${BASE}/en/${SLUG}`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('[data-cms-page-root] form');
const formW = byType('form').find((w) => w.settings.formId === 7);
const fid = (name) => `#cmsf-${formW.id}-${name}`;
const formMarkup = await page.$eval(`${fid('name')}`, (el) => {
  const form = el.closest('form');
  const hp = form.querySelector('[name="company_website"]');
  const hpWrap = hp.parentElement;
  return {
    action: form.getAttribute('action'),
    method: form.getAttribute('method'),
    page: form.querySelector('[name="_page"]').value,
    lang: form.querySelector('[name="_lang"]').value,
    hpDisplay: getComputedStyle(hp).display,
    hpLeft: hpWrap.getBoundingClientRect().left,
    hpAria: hpWrap.getAttribute('aria-hidden'),
    labelFor: !!document.querySelector(`label[for="${el.id}"]`),
  };
});
check(
  formMarkup.action === '/api/forms/7/submit' && formMarkup.method === 'post' && formMarkup.page === '42' && formMarkup.lang === 'en',
  'form: no-JS action/method and hidden _page/_lang',
  formMarkup
);
check(formMarkup.hpDisplay !== 'none' && formMarkup.hpLeft < -5000 && formMarkup.hpAria === 'true', 'form: honeypot off-screen, not display:none, aria-hidden', formMarkup);
check(formMarkup.labelFor, 'form: labels are tied to inputs');

await page.type(fid('name'), 'Test Person');
await page.type(fid('email'), 'test@example.com');
await page.select(fid('topic'), 'o2');
await page.type(fid('message'), 'Hello there');
await page.click(fid('agree'));
await page.click(`#cmsf-${formW.id}-reply-1`);

formMode = '429';
formBodies.length = 0;
await page.click(`form[action="/api/forms/7/submit"] button[type="submit"]`);
await page.waitForSelector(`form[action="/api/forms/7/submit"] [role="alert"]`);
const alert429 = await page.$eval(`form[action="/api/forms/7/submit"] [role="alert"]`, (el) => el.textContent);
check(/Too many messages/.test(alert429), 'form: 429 shows the rate-limit message', alert429);
const body = JSON.parse(formBodies[0]?.body ?? '{}');
check(
  body.page === 42 && body.lang === 'en' && body.company_website === '' && typeof body.elapsedMs === 'number' &&
    body.fields?.name === 'Test Person' && body.fields?.topic === 'o2' && body.fields?.agree === 'yes' && body.fields?.reply === 'r2' && body.fields?.qty === '',
  'form: JSON body {fields, page, lang, company_website, elapsedMs}',
  body
);
check(/application\/json/.test(formBodies[0]?.contentType ?? ''), 'form: posted as JSON');

formMode = '422';
await page.click(`form[action="/api/forms/7/submit"] button[type="submit"]`);
await page.waitForSelector(`${fid('email')}-error`);
const fe = await page.$eval(fid('email'), (el) => [el.getAttribute('aria-invalid'), el.getAttribute('aria-describedby'), document.activeElement === el]);
check(fe[0] === 'true' && fe[1]?.endsWith('-error') && fe[2], 'form: field error marks + describes + focuses the field', fe);

formMode = 'ok';
await page.click(`form[action="/api/forms/7/submit"] button[type="submit"]`);
await page.waitForSelector('[data-cms-page-root] [role="status"]');
const okText = await page.$eval('[data-cms-page-root] [role="status"]', (el) => el.textContent);
check(okText === FORMS[7].def.successMessage.en, 'form: success message replaces the form', okText);

// redirectPath form
await page.type(`#cmsf-${byType('form').find((w) => w.settings.formId === 8).id}-email`, 'n@example.com');
await Promise.all([
  page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  page.click(`form[action="/api/forms/8/submit"] button[type="submit"]`),
]);
check(new URL(page.url()).pathname === '/en/why-us', 'form: success with redirectPath goes to that page', page.url());

// lightbox + FAQ
await page.goto(`${BASE}/en/${SLUG}`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('[data-cms-page-root] ul a[href*="/src/assets/opt/"]');
const firstTile = 'ul[aria-label="Image gallery"] li:first-child a';
await page.click(firstTile);
await page.waitForSelector('[role="dialog"][aria-modal="true"]');
await page.keyboard.press('ArrowRight');
const counter = await page.$eval('[role="dialog"] p', (el) => el.textContent);
check(counter === '2 / 6', 'lightbox: arrow key moves to the next photo', counter);
await page.keyboard.press('Escape');
await sleep(100);
const lb = await page.evaluate(() => [!!document.querySelector('[role="dialog"]'), document.activeElement === document.querySelector('ul[aria-label="Image gallery"] li:nth-child(2) a')]);
check(!lb[0] && lb[1], 'lightbox: Esc closes and focus returns to the tile of the photo shown', lb);
const noLb = await page.evaluate(() => {
  const grids = document.querySelectorAll('ul[aria-label="Image gallery"]');
  return grids.length;
});
check(noLb === 2, 'two galleries rendered', noLb);

const faqState = await page.evaluate(() => Array.from(document.querySelectorAll('[data-cms-page-root] details')).map((d) => d.open));
check(faqState[0] === true && faqState[1] === false, 'FAQ: first item open, others closed', faqState);
await page.click('[data-cms-page-root] details:nth-of-type(2) summary');
const faq2 = await page.evaluate(() => document.querySelectorAll('[data-cms-page-root] details')[1].open);
check(faq2, 'FAQ: clicking a question opens it');

const sanitized = await page.$eval('[data-cms-page-root]', (el) => ({
  script: !!el.querySelector('script'),
  onclick: !!el.querySelector('[onclick]'),
  style: !!el.querySelector('span[style]'),
  jsHref: !!el.querySelector('a[href^="javascript"]'),
  ext: el.querySelector('a[href="https://madinah.com.my/en/"]')?.getAttribute('rel'),
  yt: el.querySelector('iframe')?.getAttribute('src'),
  iframes: Array.from(el.querySelectorAll('iframe')).map((i) => i.getAttribute('src')),
  badVideo: el.querySelectorAll('video').length,
}));
check(!sanitized.script && !sanitized.onclick && !sanitized.style && !sanitized.jsHref, 'rich text sanitised; javascript: links neutralised', sanitized);
check(sanitized.ext === 'noopener noreferrer', 'external rich-text links get rel=noopener', sanitized.ext);
check(
  sanitized.iframes.length === 2 && sanitized.iframes[0] === 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' && sanitized.iframes[1] === 'https://player.vimeo.com/video/76979871',
  'video: YouTube via youtube-nocookie, Vimeo player, javascript: URL dropped',
  sanitized.iframes
);
check(sanitized.badVideo === 1, 'video: https .mp4 renders a <video>', sanitized.badVideo);

// not found + template
await page.goto(`${BASE}/en/no-such-page`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('body[data-app-ready="true"]');
await page.waitForSelector('main h1');
const nf = await page.evaluate(() => ({
  h1: document.querySelector('main h1')?.textContent,
  robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
  home: document.querySelector('main a[href="/en"]') !== null,
}));
check(nf.h1 === 'Page not found' && /noindex/.test(nf.robots ?? '') && nf.home, 'unknown slug → not-found view, noindex, link home', nf);
await page.screenshot({ path: join(OUT, 'public-notfound-en.png') });

pageApiHits = 0;
await page.goto(`${BASE}/ms/__cms-template`, { waitUntil: 'domcontentloaded' });
await page.waitForSelector('body[data-app-ready="true"]');
await sleep(300);
const tpl = await page.evaluate(() => ({
  root: document.querySelector('main > [data-cms-page-root]')?.outerHTML,
  title: document.title,
  robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
  nav: !!document.querySelector('header'),
  footer: !!document.querySelector('footer'),
}));
check(tpl.root === '<div data-cms-page-root=""></div>' && tpl.title === 'CMS template' && /noindex/.test(tpl.robots ?? '') && tpl.nav && tpl.footer, 'template: navbar + empty page root + footer, noindex', tpl);
check(pageApiHits === 0, 'template never fetches the page API', pageApiHits);

// ================================================================== 3. inline edit of an existing page
console.log('3. inline edit (existing page)');
await page.setViewport({ width: 1300, height: 900 });
await page.goto(shellUrl, { waitUntil: 'load' });
await page.evaluate((w) => window.__open('/en/why-us?cms-edit=1', w), 1280);
const ready = await waitMsg((x) => x.type === 'ov:ready', 'ov:ready', 30000);
check(!!ready && ready.path === '/en/why-us', 'edit page: ov:ready with path', ready && { path: ready.path, keys: ready.keys.length, images: ready.imageKeys.length });
f = await frame();
if (ready && ready.keys.length > 0) {
  const target = await f.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-cms]')).filter((e) => !/\{\{/.test(e.textContent ?? '') && e.getBoundingClientRect().width > 0);
    const el = els.find((e) => e.tagName === 'H1') ?? els[0];
    return el ? el.getAttribute('data-cms') : null;
  });
  if (target) {
    const sel = `[data-cms="${target}"]`;
    await clearMsgs();
    const ce = await f.evaluate((s) => document.querySelector(s).isContentEditable, sel);
    await f.click(sel);
    await f.waitForSelector('.cms-ov-input');
    check(!ce && !(await f.evaluate((s) => document.querySelector(s).isContentEditable, sel)), 'edit page: overlay input, never contentEditable on React nodes');
    await f.evaluate(() => {
      const i = document.querySelector('.cms-ov-input');
      i.value = '';
    });
    await page.keyboard.type('Edited in place');
    await page.keyboard.press('Enter');
    m = await waitMsg((x) => x.type === 'ov:text', 'ov:text');
    check(m?.key === target && m?.value === 'Edited in place', 'edit page: Enter → ov:text {key, value}', m);
    await sleep(200);
    const shownNow = await f.evaluate((s) => document.querySelector(s)?.textContent, sel);
    check(shownNow === 'Edited in place', 'edit page: React re-rendered the new text (optimistic)', shownNow);
    await send({ type: 'ov:set-text', key: target, value: 'Set by the shell' });
    await sleep(200);
    const shown2 = await f.evaluate((s) => document.querySelector(s)?.textContent, sel);
    check(shown2 === 'Set by the shell', 'edit page: ov:set-text updates the page', shown2);
    // Esc cancels
    await clearMsgs();
    await f.click(sel);
    await f.waitForSelector('.cms-ov-input');
    await page.keyboard.type('nope');
    await page.keyboard.press('Escape');
    await sleep(100);
    check(!(await f.$('.cms-ov-input')) && !(await msgs()).some((x) => x.type === 'ov:text'), 'edit page: Esc cancels');
  } else check(false, 'edit page: a plain [data-cms] element to click', 'none found');
  const imgKey = ready.imageKeys[0];
  if (imgKey) {
    await clearMsgs();
    await f.click(`img[data-cms-img="${imgKey}"]`);
    m = await waitMsg((x) => x.type === 'ov:image-click', 'ov:image-click');
    check(m?.key === imgKey, 'edit page: photo click → ov:image-click', m);
    await send({ type: 'ov:set-image', key: imgKey, override: { media: MEDIA[1], alt: 'New photo', focal: { x: 30, y: 60 } } });
    await sleep(150);
    const im = await f.$eval(`img[data-cms-img="${imgKey}"]`, (el) => [el.getAttribute('src'), el.getAttribute('alt'), el.style.objectPosition]);
    check(im[0].includes('OliveGroveSunsetHero-1672') && im[1] === 'New photo' && im[2] === '30% 60%', 'edit page: ov:set-image swaps src/srcset/alt/focal in place', im);
    await send({ type: 'ov:set-image', key: imgKey, override: null });
    await sleep(100);
    const back = await f.$eval(`img[data-cms-img="${imgKey}"]`, (el) => el.getAttribute('src'));
    check(!back.includes('OliveGroveSunsetHero-1672'), 'edit page: ov:set-image null restores the built-in photo', back);
  }
  const before2 = f.url();
  await f.evaluate(() => document.querySelector('a[href]:not([data-cms])')?.click());
  await sleep(300);
  check(f.url() === before2, 'edit page: links do not navigate', f.url());
} else {
  console.log('   (no [data-cms] marks on /en/why-us yet — B3a marking pending; overlay checks skipped)');
}

// ================================================================== done
check(consoleErrors.length === 0, 'no console errors or warnings', consoleErrors.slice(0, 15));
await browser.close();
await server.close();
console.log(`\n${passes.length} passed, ${failures.length} failed. Screenshots: ${OUT}`);
for (const fl of failures) console.log(`  ✗ ${fl}`);
process.exit(failures.length ? 1 : 0);
