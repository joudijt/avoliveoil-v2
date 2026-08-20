import type { Article } from './types';
import { EN_ARTICLES } from './en';
import { AR_ARTICLES } from './ar';
import { MS_ARTICLES } from './ms';
import slugTable from './slugs.json';

export type { Article, ArticleSection, Block, FaqItem, RelatedLink } from './types';

export const ARTICLE_LANGS = ['en', 'ar', 'ms'] as const;
export type ArticleLang = (typeof ARTICLE_LANGS)[number];

const BY_LANG: Record<ArticleLang, Article[]> = {
  en: EN_ARTICLES,
  ar: AR_ARTICLES,
  ms: MS_ARTICLES,
};

/**
 * The slug table is duplicated in `slugs.json` because the build tooling needs
 * it without a TypeScript loader: `scripts/prerender.mjs` and
 * `scripts/generate-sitemap.mjs` both read that file directly. Rather than trust
 * the two copies to stay in step, we fail loudly here the moment they diverge —
 * a mismatch would otherwise show up as a prerendered route that 404s in the SPA,
 * or a sitemap URL nobody can reach.
 */
// Partial on purpose: an article written for one market has no counterpart in
// the others, so its entry carries only the languages it was actually written
// in. Everything downstream already treats a missing slug as undefined.
const SLUGS = slugTable as Record<string, Partial<Record<ArticleLang, string>>>;

for (const lang of ARTICLE_LANGS) {
  for (const article of BY_LANG[lang]) {
    const expected = SLUGS[article.id]?.[lang];
    if (expected !== article.slug) {
      throw new Error(
        `Article slug mismatch for "${article.id}" (${lang}): ` +
          `slugs.json has "${expected ?? '<missing>'}", the content module has "${article.slug}". ` +
          `Update src/content/articles/slugs.json.`
      );
    }
  }
}

export function isArticleLang(lang: string | undefined): lang is ArticleLang {
  return lang === 'en' || lang === 'ar' || lang === 'ms';
}

/** Newest first — the blog index order. */
export function getArticles(lang: string | undefined): Article[] {
  return BY_LANG[isArticleLang(lang) ? lang : 'en'];
}

export function findArticle(lang: string | undefined, slug: string | undefined): Article | undefined {
  if (!slug) return undefined;
  return getArticles(lang).find((a) => a.slug === slug);
}

/** The same article's slug in another language, for hreflang and the language switcher. */
export function slugFor(id: string, lang: ArticleLang): string | undefined {
  return SLUGS[id]?.[lang];
}

/** `{ en: 'blog/foo', ar: 'blog/foo', ms: 'blog/bar' }` — the shape <SEO pathByLang> wants. */
export function articlePathByLang(id: string): Record<string, string> {
  const paths: Record<string, string> = {};
  for (const lang of ARTICLE_LANGS) {
    const slug = slugFor(id, lang);
    if (slug) paths[lang] = `blog/${slug}`;
  }
  return paths;
}
