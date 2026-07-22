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

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const route of ROUTES) {
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 });
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
