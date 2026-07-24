// Post-build step: launches the built app in a real headless browser,
// waits for it to fully render past the loading screen (data-app-ready),
// and writes the resulting HTML as a static index.html per language route.
// Real visitors never see this file — their browser loads the normal JS
// bundle and createRoot() fully replaces it with the live app (Loading
// animation and all). This snapshot exists purely so crawlers that don't
// execute JavaScript (many AI bots) see real content instead of an empty
// shell.
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const ROUTES = ['/en', '/ar', '/ms'];
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

  try {
    for (const route of ROUTES) {
      // Don't wait for networkidle0 — the page ships ~25 MB of imagery and the
      // hero/journey sections keep requests in flight, so the network never
      // goes quiet for 500 ms. data-app-ready is the real signal that the app
      // finished rendering (the loading timeline runs ~5 s); wait on that.
      await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('body[data-app-ready="true"]', { timeout: 60000 });
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
