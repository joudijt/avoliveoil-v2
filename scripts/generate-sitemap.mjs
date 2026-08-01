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

/** Articles carry a lastmod; keep it in sync with `dateModified` in the content modules. */
const ARTICLE_LASTMOD = '2026-08-01';

const entries = [];

for (const page of PAGES) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, page.path ? `${l}/${page.path}` : l]));
  for (const lang of LANGS) {
    entries.push({ byLang, lang, changefreq: page.changefreq, priority: page.priority });
  }
}

for (const perLang of Object.values(slugs)) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, `${l}/blog/${perLang[l]}`]));
  for (const lang of LANGS) {
    entries.push({
      byLang,
      lang,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: ARTICLE_LASTMOD,
    });
  }
}

const url = (path) => `${SITE_URL}/${path}`;

const body = entries
  .map((entry) => {
    const alternates = LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(entry.byLang[l])}" />`
    ).join('\n');
    return [
      '  <url>',
      `    <loc>${url(entry.byLang[entry.lang])}</loc>`,
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(entry.byLang[X_DEFAULT])}" />`,
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
