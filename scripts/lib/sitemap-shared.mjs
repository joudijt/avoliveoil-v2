// Shared by generate-sitemap.mjs and seed-sitemap-manifest.mjs.
//
// The static pages (home, products, shop, why-us, contact per language, plus
// the eighteen infused product pages) carry no content date of their own, so
// their <lastmod> comes from a committed manifest: { path: { hash, lastmod } }.
// `hash` is a sha1 of the prerendered page's <main> ONLY, so a header, footer,
// nav, schema, script or asset-fingerprint change never moves a date.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SITE_URL = 'https://avoliveoil.com';
export const LANGS = ['en', 'ms'];
export const MANIFEST_PATH = join(ROOT, 'scripts', 'sitemap-manifest.json');

/** Static page paths under /:lang ('' = language root). `blog` is NOT here: it is dated by its articles. */
export const STATIC_PAGES = ['', 'products', 'shop', 'why-us', 'contact'];

export const INFUSED_SLUGS = JSON.parse(
  readFileSync(join(ROOT, 'src/data/infusedSlugs.json'), 'utf-8')
);

/** The 33 manifest-dated URL paths (15 static + 18 infused), e.g. "/en/products". */
export function manifestPaths() {
  const out = [];
  for (const lang of LANGS) {
    for (const p of STATIC_PAGES) out.push(p ? `/${lang}/${p}` : `/${lang}`);
    for (const slug of INFUSED_SLUGS) out.push(`/${lang}/products/${slug}`);
  }
  return out;
}

export function distFileFor(path) {
  return join(ROOT, 'dist', ...path.split('/').filter(Boolean), 'index.html');
}

/**
 * sha1 of the page's <main> after removing scripts/styles/noscript and Vite's
 * content-hash suffixes (`logo-CNHl_n6s.webp` -> `logo.webp`), with whitespace
 * collapsed. Throws unless there is exactly one non-empty <main> with an <h1>.
 */
export function mainHash(html, label) {
  const mains = html.match(/<main\b[\s\S]*?<\/main>/g) ?? [];
  if (mains.length !== 1) throw new Error(`${label}: expected exactly one <main>, found ${mains.length}`);
  let main = mains[0]
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '')
    .replace(/-[A-Za-z0-9_-]{8}\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();
  if (!/<h1\b/i.test(main)) throw new Error(`${label}: <main> has no <h1>`);
  const text = main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 200) throw new Error(`${label}: <main> text is only ${text.length} chars — snapshot looks empty`);
  return createHash('sha1').update(main, 'utf8').digest('hex');
}

/** Hash every manifest URL from dist/. Asserts files exist and hashes are unique. */
export function hashDist() {
  const hashes = {};
  const seen = new Map();
  for (const path of manifestPaths()) {
    const file = distFileFor(path);
    if (!existsSync(file)) {
      throw new Error(`${path}: ${file} missing — run \`npm run build:prerender\` first`);
    }
    const h = mainHash(readFileSync(file, 'utf-8'), path);
    if (seen.has(h)) throw new Error(`${path}: <main> hash identical to ${seen.get(h)} — snapshot is not page-specific`);
    seen.set(h, path);
    hashes[path] = h;
  }
  return hashes;
}

/** Load the article modules (Node >= 22.18 strips TS types natively). */
export async function loadArticles() {
  const out = {};
  const names = { en: 'EN_ARTICLES', ms: 'MS_ARTICLES' };
  for (const lang of LANGS) {
    const mod = await import(pathToFileURL(join(ROOT, 'src/content/articles', `${lang}.ts`)).href);
    const list = mod[names[lang]];
    if (!Array.isArray(list)) throw new Error(`src/content/articles/${lang}.ts: ${names[lang]} not exported`);
    out[lang] = list;
  }
  return out;
}

export const W3C_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Today in the site's timezone (all commits and deploys are +08:00). */
export function todayKL() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/** Strict flag parser: every argument must be in `allowed`, or we exit before touching anything. */
export function parseFlags(argv, allowed, usage) {
  const flags = new Set();
  for (const a of argv) {
    if (!allowed.includes(a)) {
      console.error(`Unknown argument: ${a}\n\n${usage}`);
      process.exit(2);
    }
    flags.add(a);
  }
  if (flags.has('--help')) {
    console.log(usage);
    process.exit(0);
  }
  return flags;
}
