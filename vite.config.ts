import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

/**
 * Chunking rationale
 * ------------------
 * Before this round the site shipped ONE ~1.9 MB script to every page, because
 * src/content/articles/index.ts statically imported every language's articles. The
 * static imports are gone (src/content/articles/registry.ts loads a language
 * with `import()`), so rollup would already emit the language files as
 * their own chunks. The explicit rules below make that guarantee load-bearing
 * rather than incidental, and split the two vendor groups that every page pays
 * for out of the entry chunk so they cache across navigations and releases:
 *
 *   react-vendor  react, react-dom, scheduler, react-router(-dom) — changes
 *                 only when those deps change, so it stays in the HTTP cache
 *                 across every content deploy.
 *   animation     gsap + lenis — used by the homepage sections; keeping them
 *                 separate stops a scroll-animation bump from invalidating the
 *                 whole app bundle.
 *   articles-xx   one chunk per language, fetched only when a visitor opens
 *                 the blog in that language. Never referenced by a static
 *                 import, so it is never part of any page's critical path.
 *
 * Note: react and react-dom MUST stay in the same chunk (react-dom reaches
 * into react's internals at module scope). Do not split them.
 *
 * Control panel (docs/cms/CMS-SPEC.md §13.3): admin.html is a second entry. Its
 * code under src/admin and react-dom/server (which the admin uses to render CMS
 * pages to HTML at publish time) must never reach a chunk the public site loads.
 * react-dom/server is left to rolldown's own splitting (it lands in the admin's
 * lazy chunks): naming it as a manual chunk made rolldown capture react ITSELF
 * into that group as a dependency, and the public entry then preloaded the whole
 * server renderer. scripts/check-bundles.mjs enforces both.
 */
function chunkFor(id: string): string | undefined {
  // Rollup ids are absolute paths; normalise Windows separators before matching.
  const path = id.replace(/\\/g, '/')

  if (path.includes('/src/admin/')) return undefined

  // Must be tested before the react-vendor rule below, which would otherwise match it.
  if (/\/node_modules\/react-dom\/(server[^/]*\.js|cjs\/react-dom-server)/.test(path)) return undefined

  if (path.includes('/src/content/articles/en.ts')) return 'articles-en'
  if (path.includes('/src/content/articles/ms.ts')) return 'articles-ms'

  if (!path.includes('/node_modules/')) return undefined

  if (
    /\/node_modules\/(react|react-dom|scheduler)\//.test(path) ||
    path.includes('/node_modules/react-router/') ||
    path.includes('/node_modules/react-router-dom/')
  ) {
    return 'react-vendor'
  }

  if (path.includes('/node_modules/gsap/') || path.includes('/node_modules/lenis/')) {
    return 'animation'
  }

  return undefined
}

/**
 * Dev server only: production sends /admin/* to admin.html from .htaccess, the
 * dev server would otherwise fall back to index.html (the public site).
 */
function adminDevRewrite(): Plugin {
  return {
    name: 'avo-admin-dev-rewrite',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/admin(\/|\?|$)/.test(req.url)) req.url = '/admin.html'
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), adminDevRewrite()],
  server: {
    port: 5180,
    // The PHP API (server/, run locally with `php -S 127.0.0.1:8091`) and its uploads.
    proxy: {
      '/api': 'http://127.0.0.1:8091',
      '/uploads': 'http://127.0.0.1:8091',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        admin: fileURLToPath(new URL('./admin.html', import.meta.url)),
      },
      output: {
        manualChunks: (id) => chunkFor(id),
      },
    },
  },
})
