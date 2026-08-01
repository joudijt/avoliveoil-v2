/**
 * Article content model.
 *
 * Article bodies deliberately live here as typed TS modules instead of inside
 * `src/i18n/locales/<lang>/common.json`: those files are hand-formatted UI copy
 * and a long-form body would bloat every page's translation bundle. Each
 * language ships its own module (`en.ts`, `ar.ts`, `ms.ts`) with the same
 * article ids, so the registry can resolve an article across locales for
 * hreflang without the three versions being literal translations of each other.
 *
 * Inline markup inside any `text` field is intentionally tiny — the renderer in
 * `ArticleBody.tsx` understands only `**bold**` and `[label](href)`. An href
 * starting with `/` is an internal route and gets the active `/:lang` prefix;
 * anything else is treated as an external link.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'image'; src: ImageKey; alt: string; caption?: string };

/** Keys of the shared image map in `./images.ts`. */
export type ImageKey =
  | 'bottleField'
  | 'pouringField'
  | 'pickingOlives'
  | 'oilInField'
  | 'groveSunset'
  | 'tasting'
  | 'extraction'
  | 'filtering'
  | 'bottling'
  | 'finalBottle'
  | 'womanHoldingBottle'
  | 'kampungBottle';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ArticleSection {
  /** Rendered as an <h2> and used as the table-of-contents entry. */
  heading: string;
  /** Stable anchor id. Shared across languages so deep links survive a locale switch. */
  id: string;
  blocks: Block[];
}

export interface RelatedLink {
  label: string;
  /** Route under /:lang, e.g. 'products' or 'blog/some-slug'. */
  path: string;
  description: string;
}

export interface Article {
  /** Stable across all three languages — this is what ties translations together. */
  id: string;
  /** Locale-specific URL segment under /:lang/blog/. */
  slug: string;

  seoTitle: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  relatedKeywords: string[];

  category: string;
  tags: string[];

  h1: string;
  /** One-sentence summary. Used on the blog index and as the schema description. */
  excerpt: string;
  /** Short, quotable answer placed right under the H1 — the AEO/GEO extract target. */
  keyTakeaway: string;

  datePublished: string;
  dateModified: string;
  readingTime: number;

  hero: { src: ImageKey; alt: string };
  /** Absolute path under the site root for og:image / twitter:image. */
  ogImage: string;

  intro: string[];
  sections: ArticleSection[];
  conclusion: { heading: string; blocks: Block[] };
  faqs: FaqItem[];
  related: RelatedLink[];
}
