// Post-build step: launches the built app in a real headless browser,
// waits for it to finish rendering (data-app-ready),
// and writes the resulting HTML as a static index.html per language route.
// Since PERF-1 these snapshots are not only for crawlers: main.tsx HYDRATES
// this markup instead of replacing it, so a real visitor sees the finished page
// as soon as the HTML arrives and React adopts it in place. That makes the
// snapshot load-bearing for humans too — if a page is captured before its
// content renders, that is what everyone gets.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const LANGS = ['en', 'ms'];
const PAGES = ['', 'products', 'shop', 'why-us', 'contact', 'blog'];

// Blog article slugs differ per language, so they come from the shared table
// rather than a cartesian product. src/content/articles/index.ts asserts the
// app's own slugs match this file, so a stale entry fails loudly at runtime
// instead of silently prerendering a route the SPA cannot serve.
const ARTICLE_SLUGS = JSON.parse(
  readFileSync(join(__dirname, '..', 'src/content/articles/slugs.json'), 'utf-8')
);

// Infused product slugs are language-invariant; src/data/infusedProducts.ts
// asserts its entries match this file, same contract as the article slugs.
const INFUSED_SLUGS = JSON.parse(
  readFileSync(join(__dirname, '..', 'src/data/infusedSlugs.json'), 'utf-8')
);

const ROUTES = [
  ...LANGS.flatMap((lang) => PAGES.map((page) => (page ? `/${lang}/${page}` : `/${lang}`))),
  // Only the languages an article was actually written in. Without the filter
  // this emitted `/<lang>/blog/undefined` for every single-language article, and
  // puppeteer would dutifully snapshot the SPA's not-found fallback into a real
  // file that the deploy would then publish.
  ...LANGS.flatMap((lang) =>
    Object.values(ARTICLE_SLUGS)
      .filter((perLang) => perLang[lang])
      .map((perLang) => `/${lang}/blog/${perLang[lang]}`)
  ),
  ...LANGS.flatMap((lang) => INFUSED_SLUGS.map((slug) => `/${lang}/products/${slug}`)),
];
const PORT = 4173;

async function main() {
  const server = await preview({ preview: { port: PORT, strictPort: true } });
  const base = `http://localhost:${PORT}`;

  // headless: 'shell' (chrome-headless-shell) on purpose. With the default
  // full headless Chrome 150, browser.newPage() hangs and dies on the 30 s
  // protocol timeout on Windows. Reusing the about:blank tab the browser
  // already opened avoids newPage() entirely.
  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const openPages = await browser.pages();
  const page = openPages[0] ?? (await browser.newPage());

  // Tell the app it is being snapshotted, BEFORE any of its code runs. The
  // animation effects read this and skip gsap entirely, so the captured DOM is
  // exactly what React rendered — no inline styles React does not know about.
  // Without it the snapshot froze the hero mid-reveal at opacity 0 and made
  // every animated page fail hydration (React error #418).
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });

  try {
    for (const route of ROUTES) {
      // Don't wait for networkidle0 — the page ships ~25 MB of imagery and the
      // hero/journey sections keep requests in flight, so the network never
      // goes quiet for 500 ms. data-app-ready is the real signal that the app
      // finished rendering (the loading timeline runs ~5 s); wait on that.
      await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('body[data-app-ready="true"]', { timeout: 60000 });

      // Let the render that FOLLOWS data-app-ready commit before snapshotting.
      // Anything gated on useAppReady() — the floating WhatsApp button, on
      // every page — mounts on that next render. Capturing a frame too early
      // published HTML without it while the hydrating client rendered it
      // immediately (the attribute is already in the markup), so React saw a
      // structural mismatch and re-rendered the whole tree: error #418 on every
      // page. Two frames plus a beat is enough for React to flush.
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      );
      await new Promise((resolve) => setTimeout(resolve, 300));

      // react-helmet-async APPENDS its per-route <title> and description; it
      // does not replace the ones index.html ships, so a raw snapshot carries
      // two of each and a crawler picks whichever it likes. The shell's copies
      // are marked data-shell — drop them, but only once Helmet has actually
      // produced a replacement, so a route that renders no SEO component still
      // ends up titled.
      await page.evaluate(() => {
        const SHELL_TAGS = [
          'title',
          'meta[name="description"]',
          'link[rel="manifest"]',
          'meta[name="application-name"]',
          'meta[name="apple-mobile-web-app-title"]',
        ];
        for (const selector of SHELL_TAGS) {
          const all = [...document.head.querySelectorAll(selector)];
          const shell = all.filter((el) => el.hasAttribute('data-shell'));
          if (all.length > shell.length) shell.forEach((el) => el.remove());
        }
      });

      const html = await page.content();

      const outDir = join(distDir, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
      console.log('prerendered', route);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
