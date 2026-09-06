import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import i18n from './i18n'
import './index.css'
import App from './App.tsx'
import { ensureArticles } from './content/articles/registry'

// `/en`, `/ar/why-us`, `/ms/blog/foo` — the first segment is the language.
const LANG_RE = /^\/(en|ar|ms)(?:\/|$)/
// `/{lang}/blog` and `/{lang}/blog/{slug}`, and nothing else.
const BLOG_RE = /^\/(en|ar|ms)\/blog(?:\/|$)/

/**
 * Boot order exists for one reason: `hydrateRoot` demands that the FIRST
 * client render produce exactly the markup scripts/prerender.mjs already
 * baked into this page. Anything the first render needs must therefore be
 * resolved before we call it:
 *
 *  1. i18next language. It initialises to `lng: 'en'`, and LangLayout only
 *     switches it in an effect — i.e. after the first render. On /ar/... that
 *     first render would emit English into Arabic HTML, React would treat the
 *     whole root as a failed hydration and re-render it from scratch, and we
 *     would have paid for the prerender and thrown it away. Switch here.
 *  2. Article bodies, on a blog route only. They load through a dynamic
 *     import now, so a blog page cannot render its content synchronously
 *     unless the chunk is already in the registry cache. Await it.
 *
 * A later client-side navigation to the blog is a normal SPA transition:
 * hydration is long over, and BlogPage/ArticlePage handle the wait themselves.
 */
async function start() {
  const path = window.location.pathname

  const lang = LANG_RE.exec(path)?.[1]
  if (lang && i18n.language !== lang) {
    // Resources are bundled inline, so this settles in a microtask — but await
    // it rather than assume, because rendering early is the failure we are
    // trying to avoid.
    await i18n.changeLanguage(lang)
  }

  const blogLang = BLOG_RE.exec(path)?.[1]
  if (blogLang) await ensureArticles(blogLang)

  const container = document.getElementById('root')!

  const tree = (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  )

  /**
   * createRoot, not hydrateRoot — and that is a deliberate, tested decision.
   *
   * Adopting the prerendered markup would let a visitor see the finished page
   * without waiting for React, and it was implemented and measured. It could
   * not be made clean: every route reported React error #418 (a hydration
   * mismatch) even after the snapshot was proven byte-identical to a fresh
   * client render — the difference is transient, in the FIRST render only, and
   * production React reports it without detail. React recovers by re-rendering
   * the whole root, which costs more than createRoot does, so shipping it would
   * have been a regression dressed as an optimisation.
   *
   * What stays from that work, because it is worth having either way:
   * scripts/check-hydration.mjs (proves the prerendered HTML is what a visitor
   * ends up seeing), the language pre-load below, and a prerender that captures
   * pure React output. Re-attempt with `hydrateRoot(container, tree)` here and
   * run `npm run check:hydration` — it fails loudly, verified against a
   * deliberately corrupted snapshot.
   */
  createRoot(container).render(tree)
}

// If boot fails (a language chunk that will not download, say) we deliberately
// do NOT render and do NOT set data-app-ready. On a prerendered page that
// leaves the static, fully-readable HTML in place, un-hydrated — links are
// real <a href>s, so the site still works. During the prerender pass it makes
// scripts/prerender.mjs time out on its data-app-ready wait and fail the
// build, which is the outcome we want: never publish an empty article.
void start().catch((error) => {
  console.error('[boot] failed to start the app', error)
})
