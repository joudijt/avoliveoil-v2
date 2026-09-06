import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Chunking rationale
 * ------------------
 * Before this round the site shipped ONE ~1.9 MB script to every page, because
 * src/content/articles/index.ts statically imported en.ts + ar.ts + ms.ts. The
 * static imports are gone (src/content/articles/registry.ts loads a language
 * with `import()`), so rollup would already emit the three language files as
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
 */
function chunkFor(id: string): string | undefined {
  // Rollup ids are absolute paths; normalise Windows separators before matching.
  const path = id.replace(/\\/g, '/')

  if (path.includes('/src/content/articles/en.ts')) return 'articles-en'
  if (path.includes('/src/content/articles/ar.ts')) return 'articles-ar'
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => chunkFor(id),
      },
    },
  },
})
