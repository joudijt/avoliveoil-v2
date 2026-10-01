import type { Article } from './types';
// Type-only, therefore fully erased by `verbatimModuleSyntax` — no runtime
// import of index.ts, so there is no cycle (index.ts imports this module).
import type { ArticleLang } from './index';

/**
 * Lazy, cached access to one language's article bodies.
 *
 * Why this exists: `index.ts` used to statically import every language's
 * article file, so every page on the site — the homepage included — shipped
 * all of the article bodies inside one chunk. Loading a language on demand is
 * what splits them into per-language chunks a
 * visitor never fetches unless they open the blog in that language.
 *
 * `peekArticles` is the synchronous half and exists for hydration: the first
 * client render has to match the server HTML exactly, so main.tsx awaits
 * `ensureArticles` for a blog route BEFORE hydrating, and the components then
 * read the already-resolved value synchronously.
 *
 * These `import()` calls are the ONLY references to en/ms in the app.
 * A static `import { EN_ARTICLES } from './en'` anywhere would silently pull
 * that language back into the entry chunk and undo the split.
 */

const LOADERS: Record<ArticleLang, () => Promise<Article[]>> = {
  en: () => import('./en').then((m) => m.EN_ARTICLES),
  ms: () => import('./ms').then((m) => m.MS_ARTICLES),
};

const cache = new Map<ArticleLang, Article[]>();
const inflight = new Map<ArticleLang, Promise<Article[]>>();

/**
 * Unknown / missing languages fall back to English — the same rule the old
 * synchronous `getArticles` used, so callers see no behaviour change.
 */
function normalise(lang: string | undefined): ArticleLang {
  return lang === 'ms' ? 'ms' : 'en';
}

/** Loads a language's articles once and caches them. Safe to call repeatedly. */
export function ensureArticles(lang: string | undefined): Promise<Article[]> {
  const key = normalise(lang);

  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  let pending = inflight.get(key);
  if (!pending) {
    pending = LOADERS[key]().then((articles) => {
      cache.set(key, articles);
      inflight.delete(key);
      return articles;
    });
    inflight.set(key, pending);
  }
  return pending;
}

/**
 * Already-loaded articles, or `undefined`. Never triggers a load, never
 * returns a partial list — a caller that gets `undefined` must render nothing
 * and wait, because a page that renders an empty article would be snapshotted
 * empty by scripts/prerender.mjs.
 */
export function peekArticles(lang: string | undefined): Article[] | undefined {
  return cache.get(normalise(lang));
}
