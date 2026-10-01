/**
 * DEV ONLY — drives the admin (mock API + vite on :5183) with puppeteer and saves
 * screenshots. Usage: node src/admin/__dev__/shots.mjs <outDir> [desktop|mobile|all]
 */
import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.ADMIN_URL || 'http://localhost:5183';
const OUT = process.argv[2] || './shots';
const WHICH = process.argv[3] || 'all';
mkdirSync(OUT, { recursive: true });
const log = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, w, h) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && log.push(`[${w}] console.${m.type()}: ${m.text()}`));
  page.on('dialog', (d) => {
    log.push(`[${w}] dialog: ${d.type()} ${d.message()}`);
    void d.accept();
  });
  page.on('pageerror', (e) => log.push(`[${w}] pageerror: ${e.message}`));
  page.on('requestfailed', (r) => log.push(`[${w}] requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  return page;
}
const shot = async (page, name) => {
  await sleep(350);
  await page.screenshot({ path: join(OUT, name + '.png') });
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (over > 0) log.push(`OVERFLOW ${over}px on ${name}`);
  console.log('shot', name);
};
/** click the first button (or link) whose own text is exactly `text` */
const clickText = async (page, text, scope = '') => {
  await page.waitForFunction(
    (t, sc) => [...document.querySelectorAll(`${sc} button, ${sc} a`)].some((n) => n.textContent?.trim().startsWith(t)),
    { timeout: 8000 },
    text,
    scope || 'body'
  );
  await page.evaluate(
    (t, sc) => {
      const el = [...document.querySelectorAll(`${sc} button, ${sc} a`)].find((n) => n.textContent?.trim().startsWith(t));
      el?.click();
    },
    text,
    scope || 'body'
  );
};
async function login(page) {
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle0' });
  await page.type('#email', 'tarek@avoliveoil.com');
  await page.type('#password', 'olive-oil-2026');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), page.click('button[type=submit]')]);
  await sleep(600);
}

async function desktop(browser) {
  const page = await newPage(browser, 1440, 900);
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle0' });
  await shot(page, 'd01-login');
  // wrong password first, to see the error state
  await page.type('#email', 'tarek@avoliveoil.com');
  await page.type('#password', 'wrong-password');
  await page.click('button[type=submit]');
  await sleep(900);
  await shot(page, 'd01b-login-error');
  await page.goto(BASE + '/admin/forgot', { waitUntil: 'networkidle0' });
  await shot(page, 'd01c-forgot');
  await login(page);
  await sleep(1800);
  await shot(page, 'd02-dashboard');

  await page.goto(BASE + '/admin/pages', { waitUntil: 'networkidle0' });
  await shot(page, 'd03-pages');
  await clickText(page, 'New page', 'main');
  await sleep(500);
  await page.type('#np-en', 'Harvest sale ' + (Date.now() % 100000));
  await page.type('#np-ms', 'Jualan musim tuai 2026');
  await clickText(page, 'Event / offer');
  await shot(page, 'd04-new-page');
  await clickText(page, 'Create page');
  await page.waitForSelector('iframe[title="Page canvas"]', { timeout: 10000 });
  await sleep(3500);
  await shot(page, 'd05-builder');

  // widget settings via the navigator
  await clickText(page, 'Navigator');
  await sleep(300);
  await shot(page, 'd06-navigator');
  const rows = await page.$$('aside [class*="h-8"] button.flex-1');
  const pickRow = async (label) => {
    for (const r of await page.$$('aside button.flex-1')) {
      const t = await r.evaluate((n) => n.textContent || '');
      if (t.startsWith(label)) {
        await r.click();
        await sleep(500);
        return true;
      }
    }
    return false;
  };
  void rows;
  if (await pickRow('Heading')) await shot(page, 'd07-heading-settings');
  await page.keyboard.press('Escape');
  await clickText(page, 'Navigator').catch(() => {});
  if (await pickRow('Text')) await shot(page, 'd08-text-settings');
  await page.keyboard.press('Escape');
  if (await pickRow('Button')) {
    await shot(page, 'd09-button-settings');
    await clickText(page, 'Style', 'aside');
    await shot(page, 'd09b-button-style');
  }
  await page.keyboard.press('Escape');
  if (await pickRow('Icon list')) await shot(page, 'd10-iconlist-settings');
  await page.keyboard.press('Escape');
  if (await pickRow('Products')) await shot(page, 'd11-products-settings');
  await page.keyboard.press('Escape');
  if (await pickRow('Section 1')) {
    await shot(page, 'd12-section-settings');
    await clickText(page, 'Style', 'aside');
    await shot(page, 'd12b-section-style');
  }
  await page.keyboard.press('Escape');
  await clickText(page, 'Sections');
  await shot(page, 'd13-sections-tab');
  // switch to BM + phone preview
  await clickText(page, 'BM', 'header');
  await page.click('[title="Phone (390 px)"]');
  await sleep(2500);
  await shot(page, 'd14-builder-bm-phone');
  await page.click('[title="Computer (1280 px)"]');
  await clickText(page, 'EN', 'header');
  await sleep(1500);
  await page.click('button[aria-label="Page settings (address, Google, menu)"]');
  await sleep(500);
  await shot(page, 'd15-page-settings');
  await page.keyboard.press('Escape');
  await sleep(300);
  await clickText(page, 'Publish', 'header');
  await sleep(500);
  await shot(page, 'd16-publish-dialog');
  await clickText(page, 'Publish both languages', '[role=dialog]');
  await sleep(2500);
  await shot(page, 'd16b-published');
  // add a form widget by clicking it in the widgets tab
  await clickText(page, 'Widgets');
  await sleep(300);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('aside button')].find((n) => n.textContent?.trim() === 'Form');
    b?.click();
  });
  await sleep(800);
  await shot(page, 'd17-form-widget-settings');
  await page.click('button[aria-label="Versions"]');
  await sleep(700);
  await shot(page, 'd18-versions');
  await page.keyboard.press('Escape');

  // existing published page in the builder
  await page.goto(BASE + '/admin/pages/1/edit', { waitUntil: 'networkidle0' });
  await sleep(3000);
  await shot(page, 'd19-builder-existing');

  await page.goto(BASE + '/admin/forms', { waitUntil: 'networkidle0' });
  await shot(page, 'd20-forms');
  await page.goto(BASE + '/admin/forms/1', { waitUntil: 'networkidle0' });
  await sleep(600);
  await shot(page, 'd21-form-editor');
  await page.goto(BASE + '/admin/forms/new', { waitUntil: 'networkidle0' });
  await sleep(600);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((n) => n.textContent?.trim() === 'Create form');
    b?.click();
  });
  await sleep(500);
  await shot(page, 'd21b-form-new-errors');

  await page.goto(BASE + '/admin/inbox', { waitUntil: 'networkidle0' });
  await shot(page, 'd22-inbox');
  await page.goto(BASE + '/admin/inbox?open=102', { waitUntil: 'networkidle0' });
  await sleep(800);
  await shot(page, 'd23-inbox-detail');

  await page.goto(BASE + '/admin/media', { waitUntil: 'networkidle0' });
  await sleep(1200);
  await shot(page, 'd24-media');
  const tiles = await page.$$('main button[aria-pressed]');
  if (tiles[0]) {
    await tiles[0].click();
    await sleep(700);
    await shot(page, 'd25-media-detail');
  }

  await page.goto(BASE + '/admin/users', { waitUntil: 'networkidle0' });
  await shot(page, 'd26-users');
  await page.goto(BASE + '/admin/system', { waitUntil: 'networkidle0' });
  await shot(page, 'd27-system');
  await page.goto(BASE + '/admin/account', { waitUntil: 'networkidle0' });
  await shot(page, 'd28-account');

  await page.goto(BASE + '/admin/site', { waitUntil: 'networkidle0' });
  await shot(page, 'd29-site-pages');
  await page.goto(BASE + '/admin/site/home', { waitUntil: 'networkidle0' });
  await sleep(6000);
  await shot(page, 'd30-site-editor');
  // edit a text in the side panel
  const sub = await page.$('#f-hero-sub');
  if (sub) {
    await sub.click({ clickCount: 3 });
    await sub.type('Cold-pressed olive oil from Palestine, made the traditional way.');
    await sleep(600);
    await shot(page, 'd31-site-editor-edited');
  }
  const words = await page.$('#f-hero-headlineWords');
  if (words) {
    await words.click();
    await sleep(500);
    await shot(page, 'd32-headline-words');
    await page.keyboard.press('Escape');
  }
  await page.close();
}

async function mobile(browser) {
  const page = await newPage(await browser.createBrowserContext(), 390, 844);
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle0' });
  await shot(page, 'm01-login');
  await login(page);
  await sleep(1500);
  await shot(page, 'm02-dashboard');
  await page.click('button[aria-label="Open menu"]');
  await sleep(400);
  await shot(page, 'm03-menu');
  await page.goto(BASE + '/admin/pages', { waitUntil: 'networkidle0' });
  await shot(page, 'm04-pages');
  await page.goto(BASE + '/admin/inbox', { waitUntil: 'networkidle0' });
  await shot(page, 'm05-inbox');
  await page.goto(BASE + '/admin/inbox?open=101', { waitUntil: 'networkidle0' });
  await sleep(700);
  await shot(page, 'm06-inbox-detail');
  await page.goto(BASE + '/admin/forms/1', { waitUntil: 'networkidle0' });
  await shot(page, 'm07-form-editor');
  await page.goto(BASE + '/admin/pages/1/edit', { waitUntil: 'networkidle0' });
  await shot(page, 'm08-builder-phone-note');
  await page.goto(BASE + '/admin/site/home', { waitUntil: 'networkidle0' });
  await sleep(1500);
  await shot(page, 'm09-site-editor-phone');
  await page.goto(BASE + '/admin/media', { waitUntil: 'networkidle0' });
  await sleep(1000);
  await shot(page, 'm10-media');
  await page.close();
}

const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
try {
  if (WHICH === 'all' || WHICH === 'desktop') await desktop(browser);
  if (WHICH === 'all' || WHICH === 'mobile') await mobile(browser);
} catch (e) {
  log.push('SCRIPT ERROR: ' + (e.stack || e.message));
  console.error(e);
} finally {
  await browser.close();
  writeFileSync(join(OUT, 'console.log'), log.join('\n'));
  console.log('log lines', log.length);
}
