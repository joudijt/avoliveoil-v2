// Gate: what a crawler reads must be what a visitor sees — and, if the app is
// ever switched to hydrateRoot, that hydration must be clean.
//
// The round attempted hydrateRoot (adopting the prerendered markup instead of
// re-rendering over it). It reported React #418 on every route and was reverted
// — see the comment in src/main.tsx. This gate is what proved it, and it is
// what will prove the next attempt: it catches a hydration mismatch AND the
// more fundamental failure of a prerendered page whose content the browser
// then contradicts.
//
// So: load every language x page-type against the built site, fail on any
// hydration error, and prove the article text was in the HTML before any JS ran.
//
//   npm run check:hydration
import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname } from 'node:path';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4177;

const SLUGS = JSON.parse(readFileSync(join(ROOT, 'src/content/articles/slugs.json'), 'utf-8'));
const firstSlug = (lang) => {
  for (const perLang of Object.values(SLUGS)) if (perLang[lang]) return perLang[lang];
  return null;
};

const ROUTES = [];
for (const lang of ['en', 'ar', 'ms']) {
  ROUTES.push(`/${lang}`, `/${lang}/blog`, `/${lang}/products`, `/${lang}/why-us`);
  const slug = firstSlug(lang);
  if (slug) ROUTES.push(`/${lang}/blog/${slug}`);
}

// React reports hydration problems TWO different ways and this gate has to
// catch both. In development it logs readable text through console.error; in a
// production bundle — which is what `vite preview` serves, and what this gate
// actually runs against — it throws minified errors carrying only a code:
// #418/#423/#425 are the hydration family. Matching only the readable strings
// meant this gate could never fail on a production build: it printed
// "hydration clean" while every page silently fell back to client rendering.
const HYDRATION_MARKERS = [
  'Hydration failed',
  'hydration',
  'did not match',
  'Text content does not match',
  'server rendered HTML',
  'Minified React error #418',
  'Minified React error #419',
  'Minified React error #421',
  'Minified React error #422',
  'Minified React error #423',
  'Minified React error #425',
];

/**
 * A static server that resolves paths the way the production host does.
 *
 * `vite preview` answers `/en` with the SPA shell and only serves the
 * prerendered file for `/en/` — so testing against it either exercised the
 * wrong page entirely, or, with the slash added, made react-router emit
 * `/en/` links against a snapshot containing `/en` and reported a hydration
 * mismatch that does not exist in production. public/.htaccess maps `/en` to
 * `/en/index.html` with no redirect; this does the same, so the URL the browser
 * thinks it is on is the URL visitors are actually on.
 */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const candidates = [
    `${ROOT}/dist${url}`,
    `${ROOT}/dist${url.replace(/\/$/, '')}/index.html`,
    `${ROOT}/dist/index.html`,
  ];
  for (const file of candidates) {
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(readFileSync(file));
      return;
    }
  }
  res.writeHead(404).end('not found');
});
await new Promise((resolve) => server.listen(PORT, resolve));
const base = `http://localhost:${PORT}`;
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
const pages = await browser.pages();
const page = pages[0] ?? (await browser.newPage());

const failures = [];
const rows = [];

for (const route of ROUTES) {
  // No trailing slash: this is the exact URL form the canonicals, the sitemap
  // and real visitors use, and react-router builds its links from it.
  const url = `${base}${route}`;
  const messages = [];
  const onConsole = (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') messages.push(msg.text());
  };
  const onPageError = (err) => messages.push(`PAGE ERROR: ${err.message}`);
  // React 19 routes recoverable hydration errors through reportError, which is
  // neither a console message nor an unhandled rejection.
  // main.tsx pushes React's onRecoverableError payloads onto
  // window.__hydrationErrors; that is the only channel that sees a RECOVERED
  // mismatch in a production build. reportError is shimmed too, for anything
  // that arrives that way instead.
  await page.evaluateOnNewDocument(() => {
    window.__hydrationErrors = window.__hydrationErrors ?? [];
    const orig = window.reportError?.bind(window);
    window.reportError = (e) => {
      window.__hydrationErrors.push(String(e?.message ?? e));
      orig?.(e);
    };
  });
  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  // The raw file, before a line of JS runs — this is what a crawler reads.
  const rawHtml = await (await fetch(url)).text();
  const rawH1 = (/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(rawHtml)?.[1] ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const rawText = rawHtml
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('body[data-app-ready="true"]', { timeout: 60000 }).catch(() => {
    failures.push(`${route}: never reached data-app-ready`);
  });
  await new Promise((r) => setTimeout(r, 1500));

  const reported = await page.evaluate(() => window.__hydrationErrors ?? []);
  messages.push(...reported.map((m) => `reportError: ${m}`));

  const state = await page.evaluate(() => ({
    text: document.body.innerText.trim().length,
    domText: document.body.innerText.replace(/\s+/g, ' ').trim(),
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    imgs: document.querySelectorAll('img').length,
    broken: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
    srcset: [...document.querySelectorAll('img')].filter((i) => i.srcset).length,
  }));

  page.off('console', onConsole);
  page.off('pageerror', onPageError);

  const hydrationErrors = messages.filter((m) => HYDRATION_MARKERS.some((h) => m.includes(h)));
  const otherErrors = messages.filter((m) => !hydrationErrors.includes(m) && !m.includes('favicon'));

  if (hydrationErrors.length) failures.push(`${route}: ${hydrationErrors.length} hydration error(s) — ${hydrationErrors[0].slice(0, 160)}`);
  const pageErrors = messages.filter((m) => m.startsWith('PAGE ERROR:') || m.startsWith('reportError:'));
  if (pageErrors.length && !hydrationErrors.length) {
    failures.push(`${route}: ${pageErrors.length} page error(s) — ${pageErrors[0].slice(0, 160)}`);
  }
  if (state.broken) failures.push(`${route}: ${state.broken} image(s) failed to decode`);
  if (state.text < 400) failures.push(`${route}: only ${state.text} chars of text rendered`);

  // The real invariant, and the one that does not depend on React choosing to
  // report anything: the page a crawler reads must be the page a visitor ends
  // up looking at. If React discarded the snapshot and re-rendered, the two
  // diverge — this is what caught a deliberately corrupted snapshot when
  // console/pageerror/onRecoverableError all stayed silent.
  if (!rawH1) {
    failures.push(`${route}: no <h1> in the prerendered HTML`);
  } else if (!state.domText.replace(/\s+/g, '').includes(rawH1.replace(/\s+/g, ''))) {
    // Whitespace-insensitive on purpose: the hero splits its headline into
    // adjacent <span>s with no whitespace between them, so innerText yields
    // "PurePalestinianOliveOil" while stripping tags from the HTML yields
    // "Pure Palestinian Olive Oil". The words are what matter, not the gaps.
    failures.push(
      `${route}: the prerendered <h1> is not what the browser shows — ` +
        `HTML says "${rawH1.slice(0, 60)}", DOM does not contain it (snapshot was discarded)`
    );
  }
  if (rawText.length < 400) {
    failures.push(`${route}: only ${rawText.length} chars of text in the raw HTML (crawlers see this)`);
  }

  rows.push({
    route,
    lang: state.lang,
    dir: state.dir,
    chars: state.text,
    rawChars: rawText.length,
    imgs: state.imgs,
    srcset: state.srcset,
    broken: state.broken,
    hydration: hydrationErrors.length,
    other: otherErrors.length,
  });
  if (otherErrors.length) for (const m of otherErrors.slice(0, 2)) console.log(`   note ${route}: ${m.slice(0, 160)}`);
}

console.table(rows);
await browser.close();
await new Promise((r) => server.close(r));

if (failures.length) {
  console.log('\nFAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log(`\nhydration clean: ${ROUTES.length} routes, no hydration errors, no broken images.`);
