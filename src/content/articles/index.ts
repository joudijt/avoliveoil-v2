import type { Article } from './types';
import slugTable from './slugs.json';
import { ensureArticles, peekArticles } from './registry';

export type { Article, ArticleSection, Block, FaqItem, RelatedLink } from './types';
export { ensureArticles, peekArticles };

export const ARTICLE_LANGS = ['en', 'ms'] as const;
export type ArticleLang = (typeof ARTICLE_LANGS)[number];

/**
 * This module is deliberately CHEAP: it pulls in `slugs.json` (10 KB) and
 * nothing else. It must never statically import `./en` or `./ms` —
 * doing so puts 1.9 MB of article prose into the entry chunk that every page
 * of the site downloads, homepage included. Bodies arrive through
 * `./registry` (dynamic `import()`, cached).
 *
 * The slug table is duplicated in `slugs.json` because the build tooling needs
 * it without a TypeScript loader: `scripts/prerender.mjs` and
 * `scripts/generate-sitemap.mjs` both read that file directly. The two copies
 * are checked against each other by `scripts/check-article-slugs.mjs` at build
 * time — it used to be a module-load loop here, but that loop could only run
 * by holding every language in memory, which is precisely what we removed.
 * A divergence would otherwise show up as a prerendered route that 404s in the
 * SPA, or a sitemap URL nobody can reach.
 */
// Partial on purpose: an article written for one market has no counterpart in
// the others, so its entry carries only the languages it was actually written
// in. Everything downstream already treats a missing slug as undefined.
const SLUGS = slugTable as Record<string, Partial<Record<ArticleLang, string>>>;

export function isArticleLang(lang: string | undefined): lang is ArticleLang {
  return lang === 'en' || lang === 'ms';
}

/**
 * Newest first — the blog index order.
 *
 * Reads through the registry cache, so it returns `[]` until that language has
 * been loaded. Pages that render articles must NOT use this: they call
 * `peekArticles` and distinguish "not loaded yet" (undefined) from "no
 * articles" (empty array), because rendering an empty list would let
 * scripts/prerender.mjs snapshot a blank page.
 */
export function getArticles(lang: string | undefined): Article[] {
  return peekArticles(lang) ?? [];
}

export function findArticle(lang: string | undefined, slug: string | undefined): Article | undefined {
  if (!slug) return undefined;
  return peekArticles(lang)?.find((a) => a.slug === slug);
}

/** The same article's slug in another language, for hreflang and the language switcher. */
export function slugFor(id: string, lang: ArticleLang): string | undefined {
  return SLUGS[id]?.[lang];
}

/** The article id whose `lang` slug is `slug`, or undefined. */
export function articleIdForSlug(lang: string, slug: string): string | undefined {
  for (const [id, slugs] of Object.entries(SLUGS)) {
    if (slugs[lang as ArticleLang] === slug) return id;
  }
  return undefined;
}

/** `{ en: 'blog/foo', ms: 'blog/bar' }` — the shape <SEO pathByLang> wants. */
export function articlePathByLang(id: string): Record<string, string> {
  const paths: Record<string, string> = {};
  for (const lang of ARTICLE_LANGS) {
    const slug = slugFor(id, lang);
    if (slug) paths[lang] = `blog/${slug}`;
  }
  return paths;
}
