// Gates for public/sitemap.xml <lastmod> (docs/sitemap-lastmod/SPEC.md). Writes nothing.
//
//   node scripts/check-sitemap.mjs          local gates (needs a fresh `npm run build:prerender`)
//   node scripts/check-sitemap.mjs --live   also: URL set == https://avoliveoil.com/sitemap.xml
//
// Gates:
//   1. every <url> has one <loc>; no duplicate locs; lastmod (when present) is YYYY-MM-DD and <= today
//   2. article lastmod == dateModified in the content module == dateModified in the
//      PRERENDERED page's JSON-LD (dist/), and >= datePublished
//   3. /:lang/blog lastmod == newest article lastmod of that language in the sitemap
//   4. static/infused lastmod >= the date the page's component was first committed
//   5. manifest hashes == <main> hashes of the current dist/ (manifest is not stale)
//   6. dist/sitemap.xml is byte-identical to public/sitemap.xml
//   7. (--live) URL set identical to the live sitemap
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ROOT, SITE_URL, LANGS, MANIFEST_PATH, W3C_DATE, manifestPaths, hashDist, distFileFor, loadArticles, todayKL, parseFlags,
} from './lib/sitemap-shared.mjs';

const flags = parseFlags(process.argv.slice(2), ['--live', '--help'], 'Usage: node scripts/check-sitemap.mjs [--live]');
const TODAY = todayKL();
const fails = [];
const ok = (msg) => console.log(`PASS  ${msg}`);
const gate = (name, errs) => (errs.length ? fails.push(...errs.map((e) => `${name}: ${e}`)) : ok(name));

const xml = readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf-8');
const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
  const locs = [...m[1].matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
  const lm = [...m[1].matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((x) => x[1]);
  return { locs, loc: locs[0], lastmods: lm, lastmod: lm[0] };
});
const byPath = new Map(urls.map((u) => [u.loc.slice(SITE_URL.length), u]));

// 1
{
  const e = [];
  for (const u of urls) {
    if (u.locs.length !== 1) e.push(`${u.loc}: ${u.locs.length} <loc>`);
    if (u.lastmods.length > 1) e.push(`${u.loc}: ${u.lastmods.length} <lastmod>`);
    if (u.lastmod && (!W3C_DATE.test(u.lastmod) || u.lastmod > TODAY)) e.push(`${u.loc}: lastmod ${u.lastmod}`);
  }
  if (byPath.size !== urls.length) e.push(`${urls.length - byPath.size} duplicate <loc>`);
  gate(`1 structure/format/<=today (${urls.length} URLs, ${urls.filter((u) => u.lastmod).length} with lastmod)`, e);
}

// 2
const articles = await loadArticles();
{
  const e = [];
  let n = 0;
  for (const lang of LANGS) {
    for (const a of articles[lang]) {
      n++;
      const path = `/${lang}/blog/${a.slug}`;
      const u = byPath.get(path);
      if (!u) { e.push(`${path} missing from sitemap`); continue; }
      if (u.lastmod !== a.dateModified) e.push(`${path}: sitemap ${u.lastmod} != module dateModified ${a.dateModified}`);
      if (u.lastmod < a.datePublished) e.push(`${path}: lastmod ${u.lastmod} < datePublished ${a.datePublished}`);
      const f = distFileFor(path);
      if (!existsSync(f)) { e.push(`${path}: no prerendered page`); continue; }
      const html = readFileSync(f, 'utf-8');
      const ld = [...html.matchAll(/"dateModified":"([^"]+)"/g)].map((x) => x[1]);
      const meta = html.match(/article:modified_time" content="([^"]+)"/)?.[1];
      if (!ld.length || ld.some((d) => d !== u.lastmod)) e.push(`${path}: JSON-LD dateModified ${ld.join(',') || 'none'} != sitemap ${u.lastmod}`);
      if (meta !== u.lastmod) e.push(`${path}: article:modified_time ${meta} != sitemap ${u.lastmod}`);
    }
  }
  gate(`2 article lastmod == module dateModified == prerendered JSON-LD, >= datePublished (${n} articles)`, e);
}

// 3
{
  const e = [];
  for (const lang of LANGS) {
    const newest = urls.filter((u) => u.loc.startsWith(`${SITE_URL}/${lang}/blog/`)).map((u) => u.lastmod).sort().at(-1);
    const got = byPath.get(`/${lang}/blog`)?.lastmod;
    if (got !== newest) e.push(`/${lang}/blog: ${got} != newest article ${newest}`);
  }
  gate('3 blog index == newest article per language', e);
}

// 4
{
  const firstCommit = (file) =>
    execFileSync('git', ['log', '--diff-filter=A', '--format=%ad', '--date=short', '--', file], { cwd: ROOT, encoding: 'utf-8' })
      .trim().split('\n').at(-1);
  const born = {
    '': firstCommit('src/pages/HomePage.tsx'),
    products: firstCommit('src/pages/ProductsPage.tsx'),
    shop: firstCommit('src/pages/ShopPage.tsx'),
    'why-us': firstCommit('src/pages/WhyUsPage.tsx'),
    contact: firstCommit('src/pages/ContactPage.tsx'),
    infused: firstCommit('src/pages/InfusedProductPage.tsx'),
  };
  const e = [];
  const missing = [];
  for (const path of manifestPaths()) {
    const seg = path.split('/')[2] ?? '';
    const key = path.split('/').length > 3 ? 'infused' : seg;
    const u = byPath.get(path);
    if (!u) { e.push(`${path} missing from sitemap`); continue; }
    if (!u.lastmod) { missing.push(path); continue; }
    if (u.lastmod < born[key]) e.push(`${path}: lastmod ${u.lastmod} < page first committed ${born[key]}`);
  }
  if (missing.length) console.log(`INFO  no <lastmod> (no honest date): ${missing.join(', ')}`);
  gate(`4 static/infused lastmod >= page's first commit (${JSON.stringify(born)})`, e);
}

// 5
{
  const e = [];
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  const hashes = hashDist();
  for (const [p, h] of Object.entries(hashes)) {
    if (manifest.pages[p]?.hash !== h) e.push(`${p}: dist <main> hash differs from manifest — run --update-manifest`);
  }
  gate(`5 manifest hashes == dist <main> (${Object.keys(hashes).length} pages, all unique, all with <h1>)`, e);
}

// 6
{
  const d = join(ROOT, 'dist/sitemap.xml');
  gate('6 dist/sitemap.xml == public/sitemap.xml', existsSync(d) && readFileSync(d, 'utf-8') === xml ? [] : ['differ or missing — rebuild']);
}

// 7
if (flags.has('--live')) {
  const live = execFileSync('curl', ['-s', '--ssl-no-revoke', '-A', 'Mozilla/5.0', `${SITE_URL}/sitemap.xml`], { encoding: 'utf-8' });
  const liveSet = new Set([...live.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const localSet = new Set(urls.map((u) => u.loc));
  const e = [];
  for (const l of liveSet) if (!localSet.has(l)) e.push(`live-only ${l}`);
  for (const l of localSet) if (!liveSet.has(l)) e.push(`local-only ${l}`);
  if (liveSet.size === 0) e.push('live sitemap had no <loc> — fetch failed?');
  gate(`7 URL set == live (${liveSet.size} live, ${localSet.size} local)`, e);
}

if (fails.length) {
  console.log(`\nFAIL ${fails.length}:\n  ${fails.slice(0, 50).join('\n  ')}`);
  process.exit(1);
}
console.log('\nall gates passed');
