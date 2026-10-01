/**
 * DEV ONLY — Vite config for driving the admin against the in-memory mock API:
 *
 *   node src/admin/__dev__/mock-api.mjs
 *   npx vite --config src/admin/__dev__/vite.mock.config.mjs --port 5183 --open false
 *
 * Adds what production gets from .htaccess + serve.php: /admin/* → admin.html, and a
 * #cms-boot with edit:true on ?cms-edit=1 pages so the in-place editor starts.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const MOCK = 'http://127.0.0.1:' + (process.env.MOCK_PORT || 4183);

function adminDev() {
  return {
    name: 'avo-admin-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/admin(\/|\?|$)/.test(req.url) && !req.url.startsWith('/admin.html')) req.url = '/admin.html';
        next();
      });
    },
    transformIndexHtml(html, ctx) {
      const url = ctx.originalUrl || '';
      if (!/[?&]cms-edit=1/.test(url)) return html;
      const lang = /^\/ms(\/|\?|$)/.test(url) ? 'ms' : 'en';
      const boot = {
        v: 1,
        build: 'mock',
        lang,
        text: { en: {}, ms: {} },
        images: { en: {}, ms: {} },
        menu: { en: { header: [], footer: [] }, ms: { header: [], footer: [] } },
        edit: true,
      };
      return html.replace('</body>', `<script id="cms-boot" type="application/json">${JSON.stringify(boot)}</script></body>`);
    },
  };
}

export default defineConfig({
  root: fileURLToPath(new URL('../../..', import.meta.url)),
  plugins: [adminDev(), react(), tailwindcss()],
  server: {
    port: 5183,
    strictPort: true,
    open: false,
    proxy: { '/api': MOCK, '/uploads': MOCK, '/cms-assets': MOCK },
  },
});
