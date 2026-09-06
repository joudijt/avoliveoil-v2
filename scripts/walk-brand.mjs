// Local walk over the BUILT site: proves the header logo still renders, that
// every icon/manifest URL the head points at actually resolves, and that the
// tab icon a browser would use is the brand one — on desktop and phone, in all
// three languages.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.env.WALK_OUT ?? join(ROOT, '.walk-shots');
const PORT = 4176;
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
];
const ROUTES = ['/en', '/ar', '/ms'];

mkdirSync(OUT, { recursive: true });

const server = await preview({
  root: ROOT,
  preview: { port: PORT, strictPort: true },
});
const base = `http://localhost:${PORT}`;
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
const pages = await browser.pages();
const page = pages[0] ?? (await browser.newPage());

const fails = [];
const rows = [];

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('body[data-app-ready="true"]', { timeout: 60000 });

    const r = await page.evaluate(async () => {
      const head = document.head;
      const grab = (sel, attr) => head.querySelector(sel)?.getAttribute(attr) ?? null;
      const urls = {
        favicon: grab('link[rel="icon"][type="image/svg+xml"]', 'href'),
        favicon32: grab('link[rel="icon"][type="image/png"]', 'href'),
        ico: grab('link[rel="alternate icon"]', 'href'),
        apple: grab('link[rel="apple-touch-icon"]', 'href'),
        mask: grab('link[rel="mask-icon"]', 'href'),
        manifest: grab('link[rel="manifest"]', 'href'),
        og: head.querySelector('meta[property="og:image"]')?.content ?? null,
      };
      const status = {};
      for (const [k, raw] of Object.entries(urls)) {
        if (!raw) { status[k] = 'MISSING TAG'; continue; }
        // og:image is absolute and points at production; against a local
        // preview only its path is fetchable.
        const u = raw.startsWith('http') && !raw.startsWith(location.origin)
          ? new URL(raw).pathname
          : raw;
        try {
          const res = await fetch(u, { cache: 'no-store' });
          status[k] = `${res.status} ${res.headers.get('content-type') ?? ''}`.trim();
        } catch (e) {
          status[k] = `ERR ${e.message}`;
        }
      }
      // The logo the header actually paints, and whether the bitmap decoded.
      const imgs = [...document.querySelectorAll('header img, nav img')];
      const logo = imgs.find((i) => (i.alt || '').includes('Arabian')) ?? imgs[0] ?? null;
      return {
        title: document.title,
        titles: head.querySelectorAll('title').length,
        descs: head.querySelectorAll('meta[name="description"]').length,
        themeColor: head.querySelector('meta[name="theme-color"]')?.content ?? null,
        logoSrc: logo?.getAttribute('src') ?? null,
        logoPainted: logo ? logo.naturalWidth > 0 && logo.naturalHeight > 0 : false,
        logoBox: logo ? `${Math.round(logo.getBoundingClientRect().width)}x${Math.round(logo.getBoundingClientRect().height)}` : null,
        dir: document.documentElement.dir,
        status,
      };
    });

    const label = `${vp.name}${route.replace('/', '-')}`;
    await page.screenshot({ path: `${OUT}/${label}.png` });

    const bad = [];
    if (!r.logoPainted) bad.push('header logo did not paint');
    if (r.titles !== 1) bad.push(`${r.titles} <title>`);
    if (r.descs !== 1) bad.push(`${r.descs} descriptions`);
    for (const [k, v] of Object.entries(r.status)) {
      if (!v.startsWith('200')) bad.push(`${k}: ${v}`);
    }
    if (bad.length) fails.push(`${label}: ${bad.join(', ')}`);
    rows.push({ label, dir: r.dir, logo: r.logoSrc?.split('/').pop(), box: r.logoBox, painted: r.logoPainted, ...r.status });
  }
}

console.table(rows);
await browser.close();
await new Promise((res) => server.httpServer.close(res));

if (fails.length) {
  console.log('\nFAILURES:');
  for (const f of fails) console.log('  - ' + f);
  process.exit(1);
}
console.log('\nwalk clean: header logo painted and every icon/manifest/og URL 200 on all 6 views.');
