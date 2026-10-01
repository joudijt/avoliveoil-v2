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

const CMS_TEMPLATES = ['__cms-template', '__cms-template-landing'];

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
  // The page shells for pages built in the control panel (docs/cms/CMS-SPEC.md §5,
  // §15; LP-SPEC §8 B1): site chrome (Navbar + Footer) or landing chrome (landing
  // header + footer) around <main><div data-cms-page-root></div></main>, which
  // serve.php fills with a published page according to its layout. Never public URLs
  // (.htaccess 404s them), never in the sitemap, llms files or the per-page gates.
  ...LANGS.flatMap((lang) => CMS_TEMPLATES.map((name) => `/${lang}/${name}`)),
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

      // Vite's preload helper inserts <link rel="modulepreload"> for lazy chunks (articles,
      // CMS page blocks) with ABSOLUTE urls — the preview server's origin. Snapshotted as is,
      // every article and CMS page asked browsers for http://localhost:4173/assets/…
      // (blocked by CSP + mixed content: console errors live). Keep them, same-origin.
      await page.evaluate((origin) => {
        for (const el of document.querySelectorAll(`[href^="${origin}/"], [src^="${origin}/"]`)) {
          for (const attr of ['href', 'src']) {
            const v = el.getAttribute(attr);
            if (v?.startsWith(origin + '/')) el.setAttribute(attr, v.slice(origin.length));
          }
        }
      }, base);

      const html = await page.content();
      if (html.includes(base)) throw new Error(`${route}: snapshot still contains ${base}`);

      const outDir = join(distDir, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
      console.log('prerendered', route);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
  checkTemplates();
}

/**
 * serve.php trusts these two snapshots blindly, so a template that lost its page root
 * or got the wrong chrome would break every CMS page of that layout. Fail the build.
 */
function checkTemplates() {
  const problems = [];
  for (const lang of LANGS) {
    const read = (name) => readFileSync(join(distDir, lang, name, 'index.html'), 'utf-8');
    const site = read('__cms-template');
    const landing = read('__cms-template-landing');
    if (!site.includes('data-cms-page-root')) problems.push(`/${lang}/__cms-template: no data-cms-page-root`);
    if (!site.includes('data-cms-menu')) problems.push(`/${lang}/__cms-template: no data-cms-menu (site header missing)`);
    if (!landing.includes('data-cms-page-root')) problems.push(`/${lang}/__cms-template-landing: no data-cms-page-root`);
    if (!landing.includes('data-cms-landing-header')) problems.push(`/${lang}/__cms-template-landing: no data-cms-landing-header`);
    if (landing.includes('data-cms-menu')) problems.push(`/${lang}/__cms-template-landing: contains data-cms-menu (site menu on a landing page)`);
    // the landing page brings its own WhatsApp buttons: no global floating one (fixed, wa.me)
    if (/<a\b[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*class="fixed\b/.test(landing)) problems.push(`/${lang}/__cms-template-landing: global floating WhatsApp button present`);
    if (!/data-cms-lang-link="en"/.test(landing) || !/data-cms-lang-link="ms"/.test(landing)) problems.push(`/${lang}/__cms-template-landing: language links missing`);
  }
  if (problems.length) throw new Error(`CMS template check failed:\n  ${problems.join('\n  ')}`);
  console.log('CMS templates OK (site + landing, en + ms)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
