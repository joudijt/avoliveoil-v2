// Gate: the control panel must not make the public site heavier (docs/cms/CMS-SPEC.md §13.3).
//
//   1. public entry + react-vendor (gzip) <= baseline + 15 KB
//   2. everything dist/index.html loads before first render (entry, modulepreloads and
//      their static imports, gzip) <= baseline + 15 KB — catches code that moved into a
//      shared chunk instead of the entry
//   3. no chunk in (2) is, or contains, react-dom/server or admin code
//
// Baseline: scripts/bundle-baseline.json (pre-CMS build). Needs a fresh `vite build`.
//   node scripts/check-bundles.mjs
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const baseline = JSON.parse(readFileSync(join(ROOT, 'scripts/bundle-baseline.json'), 'utf8'));
const BUDGET = baseline.budgetBytes ?? 15 * 1024;

const shellPath = join(DIST, 'index.html');
if (!existsSync(shellPath)) {
  console.error('check-bundles: dist/index.html missing — run `vite build` first');
  process.exit(1);
}
const shell = readFileSync(shellPath, 'utf8');

const entrySrc = /<script\b[^>]*type="module"[^>]*src="([^"]+)"/.exec(shell)?.[1];
if (!entrySrc) {
  console.error('check-bundles: no module entry script in dist/index.html');
  process.exit(1);
}
const preloads = [...shell.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g)].map((m) => m[1]);

const gz = (buf) => gzipSync(buf, { level: 9 }).length;
const fileOf = (url) => join(DIST, ...url.replace(/^\//, '').split('/'));

/** Static imports only (`import … from"./x.js"`, `import"./x.js"`); dynamic import() is lazy by definition. */
function staticImports(code, fromUrl) {
  const dir = posix.dirname(fromUrl);
  const specs = [
    ...code.matchAll(/\bimport\s*(?:[\w*{}\s,$]+?\s*from\s*)?["']([^"']+\.js)["']/g),
    ...code.matchAll(/\bexport\s*[\w*{}\s,$]+?\s*from\s*["']([^"']+\.js)["']/g),
  ].map((m) => m[1]);
  return specs.map((s) => (s.startsWith('/') ? s : posix.normalize(posix.join(dir, s))));
}

const loaded = new Map();
const queue = [entrySrc, ...preloads];
while (queue.length) {
  const url = queue.shift();
  if (loaded.has(url) || !url.endsWith('.js')) continue;
  const code = readFileSync(fileOf(url));
  loaded.set(url, code);
  queue.push(...staticImports(code.toString('utf8'), url));
}

const failures = [];
const rows = [];
let entryGz = 0;
let vendorGz = 0;
let total = 0;
for (const [url, code] of loaded) {
  const size = gz(code);
  total += size;
  const name = posix.basename(url);
  if (url === entrySrc) entryGz = size;
  if (name.startsWith('react-vendor-')) vendorGz += size;
  rows.push({ chunk: name, gzipKB: +(size / 1024).toFixed(1) });

  const text = code.toString('utf8');
  if (name.includes('react-dom-server') || /\brenderToStaticMarkup\b|\brenderToPipeableStream\b|\brenderToReadableStream\b/.test(text)) {
    failures.push(`${name}: react-dom/server is in a chunk the public site loads before first render`);
  }
  if (/\bsrc\/admin\//.test(text) || /\badmin-root\b/.test(text)) {
    failures.push(`${name}: control-panel code is in a chunk the public site loads before first render`);
  }
}

const core = entryGz + vendorGz;
const coreBase = baseline.entryGzip + baseline.reactVendorGzip;
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const delta = (a, b) => `${a >= b ? '+' : '−'}${kb(Math.abs(a - b))}`;

console.table(rows);
console.log(`entry + react-vendor: ${kb(core)} gzip (baseline ${kb(coreBase)}, ${delta(core, coreBase)}, budget +${kb(BUDGET)})`);
console.log(`all JS before first render: ${kb(total)} gzip (baseline ${kb(baseline.staticJsGzip)}, ${delta(total, baseline.staticJsGzip)})`);

if (core > coreBase + BUDGET) failures.push(`entry + react-vendor grew ${delta(core, coreBase)} (budget +${kb(BUDGET)})`);
if (total > baseline.staticJsGzip + BUDGET) failures.push(`JS loaded before first render grew ${delta(total, baseline.staticJsGzip)} (budget +${kb(BUDGET)})`);

if (failures.length) {
  console.error(`\nFAIL check-bundles:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log('\ncheck-bundles: OK');
