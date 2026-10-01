/**
 * DEV ONLY — screenshots + assertions for the landing-page admin (docs/cms/LP-SPEC.md §5, §8).
 * Needs the mock API and vite running (see vite.mock.config.mjs), e.g. on 4193/5193:
 *
 *   MOCK_PORT=4193 node src/admin/__dev__/mock-api.mjs
 *   MOCK_PORT=4193 npx vite --config src/admin/__dev__/vite.mock.config.mjs --port 5193
 *   ADMIN_URL=http://localhost:5193 node src/admin/__dev__/shots-landing.mjs <outDir>
 *
 * Exits 1 when an assertion fails (kind change drops fields, photo removal clears alt,
 * layout survives Page settings, every other doc field is kept).
 */
import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.ADMIN_URL || 'http://localhost:5193';
const OUT = process.argv[2] || './shots-landing';
mkdirSync(OUT, { recursive: true });
const log = [];
const failures = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const check = (ok, what) => {
  (ok ? log : failures).push(`${ok ? 'PASS' : 'FAIL'} ${what}`);
  console.log(ok ? 'PASS' : 'FAIL', what);
};

const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && log.push(`console.${m.type()}: ${m.text()}`));
page.on('pageerror', (e) => log.push(`pageerror: ${e.message}`));
page.on('dialog', (d) => void d.accept());

const shot = async (name) => {
  await sleep(350);
  await page.screenshot({ path: join(OUT, name + '.png') });
  console.log('shot', name);
};
const clickText = async (text, scope = 'body', exact = false) => {
  await page.waitForFunction(
    (t, sc, ex) => [...document.querySelectorAll(`${sc} button, ${sc} a`)].some((n) => (ex ? n.textContent?.trim() === t : n.textContent?.trim().startsWith(t))),
    { timeout: 8000 },
    text,
    scope,
    exact
  );
  await page.evaluate(
    (t, sc, ex) => [...document.querySelectorAll(`${sc} button, ${sc} a`)].find((n) => (ex ? n.textContent?.trim() === t : n.textContent?.trim().startsWith(t)))?.click(),
    text,
    scope,
    exact
  );
  await sleep(250);
};
/** scroll the left panel so the element matching `sel` (or the group titled `title`) is at the top */
const scrollPanelTo = async ({ sel, title }) => {
  await page.evaluate(
    (s, t) => {
      const el = s ? document.querySelector(s) : [...document.querySelectorAll('aside h3')].find((h) => h.textContent?.trim().startsWith(t));
      el?.scrollIntoView({ block: 'start' });
    },
    sel ?? null,
    title ?? null
  );
  await sleep(200);
};
const api = (path) => page.evaluate(async (p) => (await fetch(p, { credentials: 'same-origin' })).json(), path);
const saveDraft = async () => {
  await page.keyboard.down('Control');
  await page.keyboard.press('s');
  await page.keyboard.up('Control');
  await sleep(900);
};
const pickRow = async (label) => {
  // leave the open settings panel first, so the library tabs are showing
  await page.evaluate(() => document.querySelector('button[aria-label="Back to widgets"]')?.click());
  await sleep(200);
  await clickText('Navigator', 'aside');
  const ok = await page.evaluate((l) => {
    const b = [...document.querySelectorAll('aside button.flex-1')].find((n) => n.textContent?.trim().startsWith(l));
    b?.click();
    return !!b;
  }, label);
  await sleep(500);
  return ok;
};
const widget = (doc, id) => doc.sections.flatMap((s) => s.columns.flatMap((c) => c.widgets)).find((w) => w.id === id);

try {
  // ---------------------------------------------------------------- login
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle0' });
  await page.type('#email', 'tarek@avoliveoil.com');
  await page.type('#password', 'olive-oil-2026');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), page.click('button[type=submit]')]);
  await sleep(800);

  // ---------------------------------------------------------------- new page from the ad template
  await page.goto(BASE + '/admin/pages', { waitUntil: 'networkidle0' });
  await clickText('New page', 'main');
  await sleep(500);
  await page.type('#np-en', 'Olive oil offer ' + (Date.now() % 10000));
  await page.evaluate(() => [...document.querySelectorAll('[role=dialog] button')].find((n) => n.textContent?.includes('Ad landing page'))?.click());
  await sleep(250);
  await shot('l01-new-page-ad-template');
  await clickText('Create page', '[role=dialog]');
  await page.waitForSelector('iframe[title="Page canvas"]', { timeout: 10000 });
  await sleep(3000);
  await shot('l02-builder-ad-template');
  const newId = Number(page.url().match(/pages\/(\d+)\/edit/)?.[1]);
  const created = await api(`/api/pages/${newId}`);
  const types = created.draft.sections.map((s) => s.columns[0].widgets.map((w) => w.type).join('+'));
  check(created.draft.layout === 'landing', 'ad template creates a landing-layout page');
  check(
    JSON.stringify(types) === JSON.stringify(['heroForm', 'cards', 'ctaBand', 'steps', 'heading+products', 'stores', 'heading+gallery', 'badges', 'reviews', 'heading+faq', 'ctaBand']),
    `ad template section order (${types.join(', ')})`
  );

  // palette + section library
  await clickText('Widgets', 'aside');
  await scrollPanelTo({ sel: '[role=group][aria-label="Landing sections"]' });
  await shot('l03-palette-landing-group');
  await clickText('Sections', 'aside');
  await scrollPanelTo({ sel: '[role=group][aria-label="Landing sections"]' });
  await shot('l04-section-library-landing');
  await clickText('Hero with form', 'aside [role=group][aria-label="Landing sections"]');
  await sleep(500);
  const afterAdd = await page.evaluate(() => document.querySelector('aside h2')?.textContent);
  check(/section/i.test(afterAdd ?? ''), 'section library adds a section and selects it');
  await page.keyboard.press('Escape');

  // publish dialog on the fresh template: placeholders + no form
  await clickText('Publish', 'header', true);
  await sleep(500);
  await page.evaluate(() => document.querySelector('[role=dialog] .avo-scroll, [role=dialog] [class*=overflow-y]')?.scrollTo(0, 99999));
  await shot('l05-publish-template-warnings');
  const tplWarnings = await page.evaluate(() => [...document.querySelectorAll('[role=dialog] li')].map((l) => l.textContent));
  check(tplWarnings.some((t) => /no form chosen/.test(t)), 'publish warns: hero without a form');
  check(tplWarnings.some((t) => /placeholder text/.test(t)), 'publish warns: [placeholder] text');
  check(tplWarnings.some((t) => /no photo is chosen/.test(t)), 'publish warns: cards photo side without a photo');
  check(tplWarnings.some((t) => /jumps to a form, but the page has no form/.test(t)), 'publish warns: form button on a page with no form');
  await page.keyboard.press('Escape');

  // ---------------------------------------------------------------- the filled landing page (mock page 5)
  await page.goto(BASE + '/admin/pages/5/edit', { waitUntil: 'networkidle0' });
  await sleep(3000);
  await shot('l10-builder-landing-fixture');

  // hero with form
  await pickRow('Hero with form');
  await shot('l11-hero-content-top');
  await scrollPanelTo({ title: 'Buttons' });
  await shot('l12-hero-buttons-whatsapp');
  await page.select('aside select[aria-label="What the button does"]', 'form');
  await shot('l13-cta-kind-form');
  await page.select('aside select[aria-label="What the button does"]', 'store');
  await scrollPanelTo({ title: 'Buttons' });
  await shot('l14-cta-kind-store');
  await page.select('aside select[aria-label="Shop"]', 'shopee');
  await sleep(200);
  await page.select('aside select[aria-label="What the button does"]', 'link');
  await scrollPanelTo({ title: 'Buttons' });
  await shot('l15-cta-kind-link');
  await saveDraft();
  let d = (await api('/api/pages/5')).draft;
  let b0 = widget(d, 'lw1').settings.buttons[0];
  check(b0.kind === 'link' && !('message' in b0) && !('store' in b0) && typeof b0.href === 'string', `whatsapp→form→store→link keeps only link fields (${Object.keys(b0).join(',')})`);
  check(b0.label.en === 'Learn more', `untouched label follows the kind (“${b0.label.en}”)`);
  await page.select('aside select[aria-label="What the button does"]', 'whatsapp');
  await saveDraft();
  d = (await api('/api/pages/5')).draft;
  b0 = widget(d, 'lw1').settings.buttons[0];
  check(b0.kind === 'whatsapp' && !('href' in b0) && !('newTab' in b0) && !!b0.message?.en, `link→whatsapp drops href/newTab and gets a message (${Object.keys(b0).join(',')})`);
  await scrollPanelTo({ title: 'Ticks under the buttons' });
  await shot('l16-hero-chips-and-form');
  await scrollPanelTo({ title: 'Form card' });
  await shot('l17-hero-form-card');
  await clickText('Style', 'aside', true);
  await shot('l18-hero-style');
  // highlight check in BM (fixture BM highlight has other capitals than the title)
  await clickText('BM', 'header');
  await sleep(1200);
  await pickRow('Hero with form');
  await shot('l19-hero-highlight-bm-case');
  await clickText('EN', 'header');
  await sleep(1200);

  // icon cards
  await pickRow('Icon cards');
  await shot('l20-cards-content');
  await scrollPanelTo({ sel: 'aside [role=radiogroup][aria-label="Icon"]' });
  await shot('l21-icon-picker');
  await scrollPanelTo({ title: 'Photo beside the cards' });
  await shot('l22-cards-photo-alt');
  await page.evaluate(() => [...document.querySelectorAll('aside button')].find((n) => n.textContent?.trim() === 'Remove')?.click());
  await sleep(300);
  await saveDraft();
  d = (await api('/api/pages/5')).draft;
  const cards = widget(d, 'lw2').settings;
  check(cards.media == null && cards.mediaAlt.en === '' && cards.mediaAlt.ms === '', 'removing the cards photo clears mediaAlt');
  await clickText('Style', 'aside', true);
  await shot('l23-cards-style-photo-warning');

  await pickRow('Steps');
  await shot('l24-steps-content');
  await scrollPanelTo({ title: 'Photo beside the steps' });
  await shot('l25-steps-photo');
  await pickRow('Call-to-action band');
  await shot('l26-ctaband-content');
  await clickText('Style', 'aside', true);
  await shot('l27-ctaband-style');
  await pickRow('Where to buy');
  await shot('l28-stores-content');
  await pickRow('Badges');
  await shot('l29-badges-content');
  await pickRow('Reviews');
  await shot('l30-reviews-content');
  await scrollPanelTo({ title: 'Reviews' });
  await shot('l31-reviews-quotes');

  // ---------------------------------------------------------------- page settings: layout
  const before = (await api('/api/pages/5')).draft;
  await page.click('button[aria-label="Page settings (address, Google, menu)"]');
  await sleep(500);
  await shot('l40-page-settings-layout');
  await clickText('Site page', '[role=dialog]');
  await shot('l41-page-settings-site');
  await clickText('Save settings', '[role=dialog]');
  await sleep(600);
  await saveDraft();
  let after = (await api('/api/pages/5')).draft;
  check(after.layout === 'site', 'Page settings saves layout = site');
  await page.click('button[aria-label="Page settings (address, Google, menu)"]');
  await sleep(400);
  await clickText('Landing page', '[role=dialog]');
  await clickText('Save settings', '[role=dialog]');
  await sleep(600);
  await saveDraft();
  after = (await api('/api/pages/5')).draft;
  check(after.layout === 'landing', 'Page settings saves layout = landing');
  const strip = ({ layout: _l, ...rest }) => JSON.stringify(rest);
  check(strip(after) === strip(before), 'saving page settings keeps every other doc field byte-identical');

  // ---------------------------------------------------------------- publish dialog with landing warnings
  await clickText('Publish', 'header', true);
  await sleep(500);
  await shot('l50-publish-dialog');
  await page.evaluate(() => {
    const box = [...document.querySelectorAll('[role=dialog] *')].find((n) => n.scrollHeight > n.clientHeight + 4 && getComputedStyle(n).overflowY !== 'visible');
    box?.scrollTo(0, box.scrollHeight);
  });
  await shot('l51-publish-dialog-warnings');
  const warnings = await page.evaluate(() => [...document.querySelectorAll('[role=dialog] li')].map((l) => l.textContent));
  log.push('publish warnings:\n  ' + warnings.join('\n  '));
  check(warnings.some((t) => /link is not allowed/.test(t)), 'publish warns: CtaButton link invalid');
  check(warnings.some((t) => /gold words/.test(t)), 'publish warns: highlight not found in title');
  check(warnings.some((t) => /placeholder text/.test(t)), 'publish warns: placeholder text on the filled page');
  check(warnings.some((t) => /no photo is chosen/.test(t)), 'publish warns: mediaSide without media (after removing the photo)');
  await page.keyboard.press('Escape');
} catch (e) {
  failures.push('SCRIPT ERROR: ' + (e.stack || e.message));
  console.error(e);
  await page.screenshot({ path: join(OUT, 'zz-error.png') }).catch(() => {});
} finally {
  await browser.close();
  writeFileSync(join(OUT, 'console.log'), [...failures, ...log].join('\n'));
  console.log(`${failures.length} failure(s); log lines ${log.length}`);
  process.exitCode = failures.length ? 1 : 0;
}
