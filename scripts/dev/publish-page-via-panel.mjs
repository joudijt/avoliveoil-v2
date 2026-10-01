/**
 * Publishes a CMS page in BOTH languages by driving the real control panel in a headless browser.
 * Publishing has to go through the panel: the page HTML is rendered in the admin browser
 * (renderPageHtml) and posted with the doc — the API alone cannot render it.
 *
 *   AVO_BASE=https://avoliveoil.com PWFILE=<file with the admin password> PAGE_ID=2 node scripts/dev/publish-page-via-panel.mjs
 *   (local harness: AVO_BASE=https://localhost:8443)
 */
import puppeteer from 'puppeteer';
import { readFileSync } from 'node:fs';

const B = process.env.AVO_BASE;
const EMAIL = process.env.AVO_EMAIL || 'admin@avoliveoil.com';
const PW = readFileSync(process.env.PWFILE, 'utf8').trim();
const PAGE = process.env.PAGE_ID;
if (!B || !PAGE) throw new Error('AVO_BASE and PAGE_ID are required');

const br = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox', '--ignore-certificate-errors'] });
const pg = (await br.pages())[0]; // newPage() hangs with Chrome 150 on Windows
const errs = [];
pg.on('pageerror', (e) => errs.push(e.message));
try {
  await pg.setViewport({ width: 1440, height: 900 });
  await pg.goto(B + '/admin', { waitUntil: 'networkidle2' });
  await pg.waitForSelector('input[type=password]', { timeout: 30000 });
  const em = (await pg.$('input[type=email]')) ?? (await pg.$('input[autocomplete=email]')) ?? (await pg.$$('input'))[0];
  await em.type(EMAIL);
  await pg.type('input[type=password]', PW);
  await pg.keyboard.press('Enter');
  await new Promise((r) => setTimeout(r, 4000));
  await pg.goto(`${B}/admin/pages/${PAGE}/edit`, { waitUntil: 'networkidle2' });
  await pg.waitForFunction((t) => [...document.querySelectorAll('button')].some((x) => x.textContent.trim() === t && !x.disabled), { timeout: 60000 }, 'Publish');
  await new Promise((r) => setTimeout(r, 3000));
  await pg.evaluate((t) => [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t && !x.disabled).click(), 'Publish');
  await pg.waitForFunction(() => !!document.querySelector('[role=dialog]'), { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 1500));
  const dialog = await pg.evaluate(() => document.querySelector('[role=dialog]')?.innerText ?? '');
  console.log('DIALOG:\n' + dialog.slice(0, 1500));
  const target = dialog.includes('Publish both languages') ? 'Publish both languages' : null;
  if (!target) throw new Error('both languages are not ready to publish — see the dialog text above');
  await pg.evaluate((t) => [...document.querySelectorAll('[role=dialog] button')].find((x) => x.textContent.trim() === t).click(), target);
  await new Promise((r) => setTimeout(r, 8000));
  const st = await pg.evaluate(async (id) => (await (await fetch('/api/pages/' + id)).json()).page, PAGE);
  console.log('status', st.status, 'langs', JSON.stringify(st.langs ?? st.publishedLangs), 'page errors', errs);
} finally {
  await br.close();
}
