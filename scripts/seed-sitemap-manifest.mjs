// One-time seed of scripts/sitemap-manifest.json (docs/sitemap-lastmod/SPEC.md rule 3).
//
// For each of the 33 static + infused URLs:
//   hash    = sha1 of the prerendered <main> in dist/ (run `npm run build:prerender` first)
//   lastmod = date of the newest commit that changed that page's CONTENT:
//             - any non-excluded commit touching one of the page's source files, or
//             - a commit that changed a translation key the page renders, in that
//               page's OWN language's locale file (leaf-level JSON diff, so a new
//               infusedPage.* key does not re-date /en/why-us, and an Arabic copy
//               edit does not re-date /en).
// Commits in EXCLUDED only touched performance, layout/CSS, brand/meta or
// deploy config; they are listed with reasons and never date a page.
//
// Usage: node scripts/seed-sitemap-manifest.mjs [--write]   (dry run without --write)
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { ROOT, LANGS, MANIFEST_PATH, INFUSED_SLUGS, hashDist, parseFlags } from './lib/sitemap-shared.mjs';

const flags = parseFlags(
  process.argv.slice(2),
  ['--write', '--help'],
  'Usage: node scripts/seed-sitemap-manifest.mjs [--write]   (dry run without --write; needs a fresh build:prerender)'
);

export const EXCLUDED = {
  dc2df07: '2026-09-06 performance refactor (images/srcset, splash removal, code-split, fonts) — owner ruling: not a content change',
  c88a180: '2026-09-06 brand: header logo, icons, meta set (storeFacts.site block feeds SEO/header only)',
  '42b66c0': '2026-08-01 layout only: product bottles two per row on mobile (CSS grid)',
  '18683bf': '2026-08-08 layout only: halve the scroll length of the bottle pour section',
  '0579566': '2026-07-24 deploy config: SITE_URL placeholder -> avoliveoil.com, .htaccess, docs',
};

const git = (...args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf-8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'pipe'] });

const FAQ = 'src/components/sections/FAQ.tsx';
const CRUMBS = 'src/components/ui/Breadcrumbs.tsx';
const SITE = ['src/config/site.ts', 'src/data/storeFacts.json'];

/** page key -> { files, ns (locale key prefixes rendered inside <main>) } */
const PAGE_SOURCES = {
  '': {
    files: ['src/pages/HomePage.tsx', 'src/components/sections', 'src/data/products.ts', ...SITE],
    ns: ['hero', 'scrollStory', 'bottleOpening', 'ingredients', 'productShowcase', 'purchasePath',
      'oliveJourney', 'statistics', 'testimonials', 'faq', 'whatsapp'],
  },
  products: {
    files: ['src/pages/ProductsPage.tsx', FAQ, CRUMBS, 'src/data/infusedProducts.ts', 'src/data/infusedSlugs.json', ...SITE],
    ns: ['productsPage', 'infusedPage', 'breadcrumb.products'],
  },
  shop: {
    files: ['src/pages/ShopPage.tsx', FAQ, CRUMBS, 'src/utils/whatsapp.ts', ...SITE],
    ns: ['shopPage', 'purchasePath', 'whatsapp', 'breadcrumb.shop'],
  },
  'why-us': {
    files: ['src/pages/WhyUsPage.tsx', FAQ, CRUMBS],
    ns: ['whyUsPage', 'breadcrumb.whyUs'],
  },
  contact: {
    files: ['src/pages/ContactPage.tsx', FAQ, CRUMBS, 'src/data/social.ts', 'src/utils/whatsapp.ts', ...SITE],
    ns: ['contactPage', 'whatsapp', 'breadcrumb.contact'],
    // 426c7f2 moved CONTACT_EMAIL / MADINAH_* / CONTACT_ADDRESS (and so both
    // Maps URLs) from literals in site.ts into storeFacts.json. Verified
    // value-for-value identical — the rendered contact page did not change.
    ignore: { '426c7f2': 'value-preserving refactor of site.ts -> storeFacts.json (verified identical values)' },
  },
  infused: {
    files: ['src/pages/InfusedProductPage.tsx', CRUMBS, 'src/data/infusedProducts.ts', 'src/data/infusedSlugs.json', ...SITE],
    ns: ['infusedPage', 'breadcrumb.products'],
  },
};

/** [{ sha, date }] newest first, for commits touching any of `paths`. */
function commitsFor(paths) {
  const out = git('log', '--format=%h %ad', '--date=short', '--', ...paths).trim();
  return out ? out.split('\n').map((l) => ({ sha: l.split(' ')[0], date: l.split(' ')[1] })) : [];
}

function leafPaths(obj, prefix = '', acc = new Map()) {
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) leafPaths(v, prefix ? `${prefix}.${k}` : k, acc);
  } else acc.set(prefix, JSON.stringify(obj));
  return acc;
}

function localeAt(rev, lang) {
  try {
    return JSON.parse(git('show', `${rev}:src/i18n/locales/${lang}/common.json`));
  } catch {
    return {};
  }
}

/** Changed leaf keys in a commit's locale file for `lang`. */
const localeDiffCache = new Map();
function changedKeys(sha, lang) {
  const key = `${sha}:${lang}`;
  if (localeDiffCache.has(key)) return localeDiffCache.get(key);
  let parent;
  try {
    parent = git('rev-parse', `${sha}^`).trim();
  } catch {
    parent = null; // root commit
  }
  const a = leafPaths(parent ? localeAt(parent, lang) : {});
  const b = leafPaths(localeAt(sha, lang));
  const changed = [...new Set([...a.keys(), ...b.keys()])].filter((k) => a.get(k) !== b.get(k));
  localeDiffCache.set(key, changed);
  return changed;
}

const trace = [];
function seedDate(pageKey, lang) {
  const src = PAGE_SOURCES[pageKey];
  const hits = [];
  for (const c of commitsFor(src.files)) {
    if (EXCLUDED[c.sha] || src.ignore?.[c.sha]) continue;
    const files = git('show', '--name-only', '--format=', c.sha, '--', ...src.files).trim().split('\n');
    hits.push({ ...c, why: `files: ${files.join(', ')}` });
  }
  for (const c of commitsFor([`src/i18n/locales/${lang}/common.json`])) {
    if (EXCLUDED[c.sha]) continue;
    const keys = changedKeys(c.sha, lang).filter((k) => src.ns.some((n) => k === n || k.startsWith(`${n}.`)));
    if (keys.length) hits.push({ ...c, why: `${lang} keys: ${keys.length} (${keys.slice(0, 3).join(', ')}${keys.length > 3 ? ', …' : ''})` });
  }
  hits.sort((x, y) => (x.date < y.date ? 1 : -1));
  if (!hits.length) return null;
  trace.push(`${lang} ${pageKey || '(home)'} -> ${hits[0].date} via ${hits[0].sha} [${hits[0].why}]`);
  return hits[0].date;
}

const hashes = hashDist();
const pages = {};
for (const lang of LANGS) {
  for (const p of ['', 'products', 'shop', 'why-us', 'contact']) {
    const path = p ? `/${lang}/${p}` : `/${lang}`;
    const lastmod = seedDate(p, lang);
    pages[path] = lastmod ? { hash: hashes[path], lastmod } : { hash: hashes[path] };
  }
  const infusedDate = seedDate('infused', lang);
  for (const slug of INFUSED_SLUGS) {
    const path = `/${lang}/products/${slug}`;
    pages[path] = infusedDate ? { hash: hashes[path], lastmod: infusedDate } : { hash: hashes[path] };
  }
}

const manifest = {
  _comment:
    'Sitemap <lastmod> for pages with no content date. hash = sha1 of the prerendered <main> (scripts/lib/sitemap-shared.mjs mainHash). ' +
    '`node scripts/generate-sitemap.mjs --update-manifest` after `npm run build:prerender` bumps lastmod to today ONLY where the hash changed. ' +
    'Seeded 2026-09-26 by scripts/seed-sitemap-manifest.mjs from git history of each page\'s content files; excluded commits are listed there and in docs/sitemap-lastmod/REPORT.md.',
  pages: Object.fromEntries(Object.keys(pages).sort().map((k) => [k, pages[k]])),
};

console.log(trace.join('\n'));
console.log('\nexcluded commits:\n' + Object.entries(EXCLUDED).map(([k, v]) => `  ${k}  ${v}`).join('\n'));
if (flags.has('--write')) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log(`\nwrote ${MANIFEST_PATH} (${Object.keys(pages).length} pages)`);
} else {
  console.log('\n(dry run — pass --write to save)');
}
