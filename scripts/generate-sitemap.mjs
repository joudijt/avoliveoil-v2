// Regenerates public/sitemap.xml from one place, so the static pages, the blog
// articles and their per-language slugs can never drift apart by hand-editing.
// Slugs come from src/content/articles/slugs.json — the same file the app
// asserts against at runtime and that prerender.mjs walks.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SITE_URL = 'https://avoliveoil.com';
const LANGS = ['en', 'ar', 'ms'];
const X_DEFAULT = 'en';

/** Static pages: path under /:lang (empty string = the language root). */
const PAGES = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'products', changefreq: 'weekly', priority: '0.9' },
  { path: 'shop', changefreq: 'weekly', priority: '0.9' },
  { path: 'why-us', changefreq: 'monthly', priority: '0.8' },
  { path: 'contact', changefreq: 'monthly', priority: '0.7' },
  { path: 'blog', changefreq: 'weekly', priority: '0.8' },
];

const slugs = JSON.parse(readFileSync(join(root, 'src/content/articles/slugs.json'), 'utf-8'));

/**
 * Infused product detail pages: one slug, the same in every language.
 *
 * These were missing from this generator entirely while being present in the
 * committed sitemap, so regenerating silently dropped eighteen live URLs. The
 * same file backs prerender.mjs and src/data/infusedProducts.ts, which asserts
 * against it, so reading it here keeps all three in step.
 */
const INFUSED_SLUGS = JSON.parse(
  readFileSync(join(root, 'src/data/infusedSlugs.json'), 'utf-8')
);

/** Articles carry a lastmod; keep it in sync with `dateModified` in the content modules. */
const ARTICLE_LASTMOD = '2026-08-01';

const entries = [];

for (const page of PAGES) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, page.path ? `${l}/${page.path}` : l]));
  for (const lang of LANGS) {
    entries.push({ byLang, lang, changefreq: page.changefreq, priority: page.priority });
  }
}

// An article exists only in the languages it was actually written in. Mapping
// over every language regardless produced `/ar/blog/undefined` — thirty such
// URLs the first time a single-language round was imported, every one of them a
// 404 offered to a crawler. Build the language list from the entry itself, and
// let the alternates cover only those languages too.
for (const perLang of Object.values(slugs)) {
  const langs = LANGS.filter((l) => perLang[l]);
  if (langs.length === 0) continue;
  const byLang = Object.fromEntries(langs.map((l) => [l, `${l}/blog/${perLang[l]}`]));
  for (const lang of langs) {
    entries.push({
      byLang,
      lang,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: ARTICLE_LASTMOD,
    });
  }
}

for (const slug of INFUSED_SLUGS) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, `${l}/products/${slug}`]));
  for (const lang of LANGS) {
    entries.push({ byLang, lang, changefreq: 'monthly', priority: '0.7' });
  }
}

const url = (path) => `${SITE_URL}/${path}`;

const body = entries
  .map((entry) => {
    // Alternates come from the entry's own language map, not from LANGS. A page
    // that exists in one language has one alternate; mapping over LANGS emitted
    // `href="https://avoliveoil.com/undefined"` for the rest. x-default falls
    // back to whatever language the entry does have when English is not one.
    const entryLangs = LANGS.filter((l) => entry.byLang[l]);
    const alternates = entryLangs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(entry.byLang[l])}" />`)
      .join('\n');
    const xDefault = entry.byLang[X_DEFAULT] ?? entry.byLang[entryLangs[0]];
    return [
      '  <url>',
      `    <loc>${url(entry.byLang[entry.lang])}</loc>`,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(xDefault)}" />`,
      entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : null,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml, 'utf-8');
console.log(`sitemap.xml written — ${entries.length} URLs`);
