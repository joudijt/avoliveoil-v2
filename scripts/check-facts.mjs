/**
 * FORGE PRODUCTS-R1 O-30 — the facts gate.
 *
 * Default (text scan, runs in `build` after build:llms + ai surfaces): fails when an
 * old or unverified fact survives anywhere a visitor or an assistant can read it —
 * the old prices (RM103 / RM206 and the per-ml / per-spoon figures derived from
 * them), "Ampang Jaya", "two/both branches", "the larger branch", the old Ampang
 * street, `isLarger`. Case-insensitive.
 *
 * --dist (runs after prerender as `check:facts:dist`): positive assertions on the
 * rendered pages — the new prices on /en/products and /ms/products and every branch
 * name on /en/products. A gate that only bans can pass on an empty page.
 *
 * Usage: node scripts/check-facts.mjs [--dist] [--root <dir>]
 *   --root  scan another tree (used to prove each ban on a scratch copy).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), '..');
const argRoot = process.argv.indexOf('--root');
const ROOT = argRoot > -1 ? process.argv[argRoot + 1] : REPO;
const DIST = process.argv.includes('--dist');

/* ------------------------------------------------------------------ bans */

const BANS = [
  { id: 'old price RM103', re: /RM\s?103(?!\d)/gi },
  { id: 'old price RM206', re: /RM\s?206(?!\d)/gi },
  { id: 'old per-ml RM0.206', re: /RM\s?0\.206(?!\d)/gi },
  { id: 'old spoon RM3.09', re: /RM\s?3\.09(?!\d)/gi },
  { id: 'old spoon RM6.18', re: /RM\s?6\.18(?!\d)/gi },
  { id: 'old spoon RM12.36', re: /RM\s?12\.36(?!\d)/gi },
  { id: 'old spoon RM1.03', re: /RM\s?1\.03(?!\d)/gi },
  {
    id: 'old per-litre gap RM30.00 near litre',
    re: /RM\s?30\.00(?!\d)[\s\S]{0,60}?\b(?:litre|liter)|\b(?:litre|liter)[\s\S]{0,60}?RM\s?30\.00(?!\d)/gi,
  },
  { id: 'Ampang Jaya', re: /Ampang Jaya/gi },
  { id: 'isLarger', re: /isLarger/gi },
  { id: 'two/both branches', re: /\b(?:two|both|2|dua|kedua-dua)\b[^.]{0,40}\b(?:branch(?:es)?|cawangan)/gi },
  { id: 'Kedua-duanya buka', re: /Kedua-duanya buka\b/gi },
  { id: 'larger store/branch/outlet', re: /larger (?:store|branch|outlet)/gi },
  { id: 'cawangan lebih besar', re: /cawangan (?:yang )?lebih besar/gi },
  { id: 'old Ampang street', re: /Persiaran Putra Sulaiman, 17-L1/gi },
];

/** A hit whose surrounding text contains one of these is not a violation. */
const ALLOWS = [/68100 Batu Caves/i];

const TEXT_EXT = /\.(?:ts|tsx|js|mjs|cjs|jsx|json|txt|md|ya?ml|css|html|php)$/i;
const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'docs', '.git', '.beacon-out']);
/** Files whose job is to hold the OLD text: the live-landing patch script's old -> new map. */
const EXCLUDE_FILES = new Set(['scripts/dev/update-landing-r1.mjs']);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (TEXT_EXT.test(name)) out.push(full);
  }
  return out;
}

function scanFiles() {
  const files = [
    ...walk(join(ROOT, 'src')), // includes src/admin
    ...walk(join(ROOT, 'scripts/dev')),
    ...walk(join(ROOT, 'scripts/ai')),
  ];
  const pub = join(ROOT, 'public');
  if (existsSync(pub)) {
    for (const name of readdirSync(pub)) if (/\.(?:txt|md)$/i.test(name)) files.push(join(pub, name));
  }
  const yml = join(ROOT, 'AI-FACTS.yml');
  if (existsSync(yml)) files.push(yml);
  return files.filter((f) => f !== SELF && !EXCLUDE_FILES.has(relative(ROOT, f).split(sep).join('/')));
}

function lineOf(text, index) {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

function runBans() {
  const hits = [];
  for (const file of scanFiles()) {
    const text = readFileSync(file, 'utf8');
    for (const ban of BANS) {
      ban.re.lastIndex = 0;
      let m;
      while ((m = ban.re.exec(text))) {
        const ctx = text.slice(Math.max(0, m.index - 80), m.index + m[0].length + 80);
        if (!ALLOWS.some((a) => a.test(ctx))) {
          hits.push({ file: relative(ROOT, file).split(sep).join('/'), line: lineOf(text, m.index), ban: ban.id, match: m[0].replace(/\s+/g, ' ') });
        }
        if (m[0].length === 0) ban.re.lastIndex++;
      }
    }
  }
  const byFile = {};
  for (const h of hits) {
    console.error(`  ✗ ${h.file}:${h.line}  [${h.ban}]  "${h.match.slice(0, 90)}"`);
    byFile[h.file] = (byFile[h.file] ?? 0) + 1;
  }
  if (hits.length) {
    console.error(`\ncheck-facts: ${hits.length} banned fact(s) in ${Object.keys(byFile).length} file(s):`);
    for (const [f, n] of Object.entries(byFile)) console.error(`  ${n}\t${f}`);
    process.exit(1);
  }
  console.log('✓ check-facts: no old prices, no "Ampang Jaya", no two/both/larger branch phrases');
}

/* ------------------------------------------------------------------ dist positives */

function runDist() {
  const facts = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
  const P = facts.prices.products;
  const mustPrices = [P['extra-virgin'].ml250, P['extra-virgin'].ml500, P.organic.ml250, P.organic.ml500].map((v) => v.display);
  const decode = (html) => html.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');
  const fails = [];
  const page = (route) => {
    const f = join(ROOT, 'dist', route, 'index.html');
    if (!existsSync(f)) {
      fails.push(`dist/${route}/index.html missing — run prerender first`);
      return '';
    }
    return decode(readFileSync(f, 'utf8'));
  };
  for (const route of ['en/products', 'ms/products']) {
    const html = page(route);
    if (!html) continue;
    for (const price of mustPrices) {
      // Whole token: "RM109" must not be satisfied by "RM1090".
      if (!new RegExp(`${price}(?!\\d)`).test(html)) fails.push(`${route}: price ${price} not on the page`);
    }
    const products = (html.match(/"@type":"Product"/g) ?? []).length;
    if (products !== 2) fails.push(`${route}: expected 2 Product JSON-LD nodes, found ${products}`);
  }
  const en = page('en/products');
  if (en) {
    for (const b of facts.branches) if (!en.includes(b.labelEn)) fails.push(`en/products: branch "${b.labelEn}" not on the page`);
  }
  if (fails.length) {
    for (const f of fails) console.error(`  ✗ ${f}`);
    console.error(`\ncheck-facts --dist: ${fails.length} failure(s)`);
    process.exit(1);
  }
  console.log(`✓ check-facts --dist: ${mustPrices.join(', ')} on /en + /ms products, ${facts.branches.length} branches on /en/products`);
}

if (DIST) runDist();
else runBans();
