// Regenerates public/sitemap.xml from one place, so the static pages, the blog
// articles and their per-language slugs can never drift apart by hand-editing.
// Slugs come from src/content/articles/slugs.json — the same file the app
// asserts against at runtime and that prerender.mjs walks.
//
// <lastmod> rules (docs/sitemap-lastmod/SPEC.md — a wrong date is worse than none):
//   - article      = that article's own `dateModified` from src/content/articles/{en,ms}.ts,
//                    the same value its BlogPosting JSON-LD and article:modified_time carry.
//   - /:lang/blog  = the newest `dateModified` among that language's articles.
//   - static + infused pages = scripts/sitemap-manifest.json { path: { hash, lastmod } }.
//     A page missing from the manifest gets NO <lastmod> (reported), never a guess.
//
// Usage:
//   node scripts/generate-sitemap.mjs                    write public/sitemap.xml from the committed manifest
//   node scripts/generate-sitemap.mjs --check            write nothing; exit 1 if public/sitemap.xml is stale
//   node scripts/generate-sitemap.mjs --update-manifest  AFTER `npm run build:prerender`: hash each page's
//                                                        <main> in dist/, bump lastmod to today ONLY where the
//                                                        hash changed, then write manifest + public/sitemap.xml
//
// The sitemap reaches dist/ through Vite's public/ copy. Do NOT run this after a
// build and upload dist/ — if --update-manifest changed anything, build again so
// dist/sitemap.xml is the same file as public/sitemap.xml.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  ROOT,
  SITE_URL,
  LANGS,
  MANIFEST_PATH,
  INFUSED_SLUGS,
  W3C_DATE,
  manifestPaths,
  hashDist,
  loadArticles,
  todayKL,
  parseFlags,
} from './lib/sitemap-shared.mjs';

const USAGE = `Usage: node scripts/generate-sitemap.mjs [--check | --update-manifest | --help]`;
const flags = parseFlags(process.argv.slice(2), ['--check', '--update-manifest', '--help'], USAGE);
if (flags.has('--check') && flags.has('--update-manifest')) {
  console.error(`--check and --update-manifest are mutually exclusive\n\n${USAGE}`);
  process.exit(2);
}

const X_DEFAULT = 'en';
const OUT = join(ROOT, 'public/sitemap.xml');
const TODAY = todayKL();

/** Static pages: path under /:lang (empty string = the language root). Order = sitemap order. */
const PAGES = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'products', changefreq: 'weekly', priority: '0.9' },
  { path: 'shop', changefreq: 'weekly', priority: '0.9' },
  { path: 'why-us', changefreq: 'monthly', priority: '0.8' },
  { path: 'contact', changefreq: 'monthly', priority: '0.7' },
  { path: 'blog', changefreq: 'weekly', priority: '0.8' },
];

const slugs = JSON.parse(readFileSync(join(ROOT, 'src/content/articles/slugs.json'), 'utf-8'));

// ---- article dates, straight from the content modules -------------------------
const articles = await loadArticles();
/** id -> lang -> { slug, datePublished, dateModified } */
const articleDates = {};
for (const lang of LANGS) {
  for (const a of articles[lang]) {
    for (const k of ['datePublished', 'dateModified']) {
      if (!W3C_DATE.test(a[k] ?? '')) throw new Error(`${lang}/${a.id}: ${k} "${a[k]}" is not YYYY-MM-DD`);
    }
    if (a.dateModified < a.datePublished) throw new Error(`${lang}/${a.id}: dateModified < datePublished`);
    if (a.dateModified > TODAY) throw new Error(`${lang}/${a.id}: dateModified ${a.dateModified} is in the future`);
    if (slugs[a.id]?.[lang] !== a.slug) {
      throw new Error(`${lang}/${a.id}: slug "${a.slug}" disagrees with slugs.json ("${slugs[a.id]?.[lang]}")`);
    }
    (articleDates[a.id] ??= {})[lang] = a;
  }
}
for (const [id, perLang] of Object.entries(slugs)) {
  for (const lang of LANGS) {
    if (perLang[lang] && !articleDates[id]?.[lang]) throw new Error(`slugs.json lists ${lang}/${id} but ${lang}.ts has no such article`);
  }
}
const blogIndexLastmod = Object.fromEntries(
  LANGS.map((l) => [l, articles[l].map((a) => a.dateModified).sort().at(-1)])
);

// ---- manifest ----------------------------------------------------------------
let manifest = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8')) : { pages: {} };

if (flags.has('--update-manifest')) {
  const hashes = hashDist(); // throws on missing/empty/h1-less/duplicate snapshots
  const pages = { ...manifest.pages };
  const changed = [];
  for (const [path, hash] of Object.entries(hashes)) {
    const prev = pages[path];
    if (!prev) {
      pages[path] = { hash, lastmod: TODAY };
      changed.push(`${path} (new page) -> ${TODAY}`);
    } else if (prev.hash !== hash) {
      pages[path] = { hash, lastmod: TODAY };
      changed.push(`${path} ${prev.lastmod ?? '(no date)'} -> ${TODAY}`);
    }
  }
  if (changed.length) {
    manifest = { ...manifest, pages: Object.fromEntries(Object.keys(pages).sort().map((k) => [k, pages[k]])) };
    writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
    console.log(`manifest: ${changed.length} page(s) changed <main>:\n  ${changed.join('\n  ')}`);
    console.log('Rebuild (npm run build:prerender) so dist/sitemap.xml picks up the new public/sitemap.xml.');
  } else {
    console.log('manifest: no <main> changed — all static lastmods kept');
  }
}

const noLastmod = [];
const staticLastmod = (path) => {
  const d = manifest.pages?.[path]?.lastmod;
  if (!d) {
    noLastmod.push(path);
    return undefined;
  }
  if (!W3C_DATE.test(d) || d > TODAY) throw new Error(`manifest ${path}: bad lastmod "${d}"`);
  return d;
};

// ---- entries -------------------------------------------------------------------
const entries = [];

for (const page of PAGES) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, page.path ? `${l}/${page.path}` : l]));
  for (const lang of LANGS) {
    const lastmod = page.path === 'blog' ? blogIndexLastmod[lang] : staticLastmod(`/${byLang[lang]}`);
    entries.push({ byLang, lang, changefreq: page.changefreq, priority: page.priority, lastmod });
  }
}

// An article exists only in the languages it was actually written in. Mapping
// over every language regardless produced `/<lang>/blog/undefined` — thirty such
// URLs the first time a single-language round was imported, every one of them a
// 404 offered to a crawler. Build the language list from the entry itself, and
// let the alternates cover only those languages too.
for (const [id, perLang] of Object.entries(slugs)) {
  const langs = LANGS.filter((l) => perLang[l]);
  if (langs.length === 0) continue;
  const byLang = Object.fromEntries(langs.map((l) => [l, `${l}/blog/${perLang[l]}`]));
  for (const lang of langs) {
    entries.push({
      byLang,
      lang,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: articleDates[id][lang].dateModified,
    });
  }
}

for (const slug of INFUSED_SLUGS) {
  const byLang = Object.fromEntries(LANGS.map((l) => [l, `${l}/products/${slug}`]));
  for (const lang of LANGS) {
    entries.push({
      byLang,
      lang,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: staticLastmod(`/${byLang[lang]}`),
    });
  }
}

// Every manifest path must be a sitemap URL and vice versa (catches a renamed page).
const stray = Object.keys(manifest.pages ?? {}).filter((p) => !manifestPaths().includes(p));
if (stray.length) throw new Error(`manifest has paths that are not sitemap pages: ${stray.join(', ')}`);

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

if (noLastmod.length) {
  console.warn(`no honest date — <lastmod> omitted for ${noLastmod.length} URL(s):\n  ${noLastmod.join('\n  ')}`);
}

if (flags.has('--check')) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf-8') : '';
  if (current !== xml) {
    console.error('public/sitemap.xml is STALE — run `node scripts/generate-sitemap.mjs`');
    process.exit(1);
  }
  console.log(`public/sitemap.xml is current — ${entries.length} URLs`);
} else {
  writeFileSync(OUT, xml, 'utf-8');
  console.log(`sitemap.xml written — ${entries.length} URLs`);
}
