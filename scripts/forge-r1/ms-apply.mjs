// FORGE PRODUCTS-R1 B6 step 3: apply docs/forge/r1-article-map.ms.json to ms.ts.
// Exact-snippet replacement scoped to each article's source range, with a count
// assert per snippet; no global regex. Also stamps dateModified '2026-11-04' on
// each changed article (own literal, never the shared MODIFIED const).
// Usage: node scripts/forge-r1/ms-apply.mjs [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import { MS_TS, MAP } from './ms-lib.mjs';

const DATE = '2026-11-04';
const dry = process.argv.includes('--dry');
let src = readFileSync(MS_TS, 'utf-8');
const map = JSON.parse(readFileSync(MAP, 'utf-8'));

function ranges(text) {
  const re = /^ {4}"?id"?: ['"]([^'"]+)['"],$/gm;
  const hits = [...text.matchAll(re)];
  const out = {};
  hits.forEach((m, i) => { out[m[1]] = [m.index, i + 1 < hits.length ? hits[i + 1].index : text.length]; });
  return out;
}
const encD = (s) => JSON.stringify(s).slice(1, -1);
const encS = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const count = (h, n) => h.split(n).length - 1;

// group by article + old
const groups = new Map();
for (const e of map) {
  const k = `${e.id}\u0000${e.old}`;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(e);
}
let replaced = 0;
const changed = new Set();
for (const [, es] of groups) {
  const { id, old } = es[0];
  if (new Set(es.map((e) => e.new)).size !== 1) throw new Error(`${id}: same old, different new`);
  const r = ranges(src)[id];
  if (!r) throw new Error(`article ${id} not found`);
  let seg = src.slice(r[0], r[1]);
  const single = /^ {4}id: '/m.test(seg.slice(0, 200));
  const enc = single ? encS : encD;
  // A whole-field value? Then match it with its quotes so it never hits inside a longer string.
  const whole = es[0].wholeField;
  let o = enc(old), n = enc(es[0].new);
  const q = single ? "'" : '"';
  if (whole) { o = q + o + q; n = q + n + q; }
  let c = count(seg, o);
  if (c !== es.length && !single) { /* no fallback */ }
  if (c !== es.length && single) { // first articles may use "..." for strings with apostrophes
    const o2 = (whole ? '"' : '') + encD(old) + (whole ? '"' : '');
    if (count(seg, o2) === es.length) { o = o2; n = (whole ? '"' : '') + encD(es[0].new) + (whole ? '"' : ''); c = es.length; }
  }
  if (c !== es.length) throw new Error(`${id}: snippet found ${c}x, expected ${es.length}\n  ${old}`);
  seg = seg.split(o).join(n);
  src = src.slice(0, r[0]) + seg + src.slice(r[1]);
  replaced += es.length;
  changed.add(id);
}
for (const id of changed) {
  const r = ranges(src)[id];
  let seg = src.slice(r[0], r[1]);
  const pats = [/^ {4}dateModified: MODIFIED,$/m, /^ {4}"dateModified": "\d{4}-\d{2}-\d{2}",$/m, /^ {4}dateModified: '\d{4}-\d{2}-\d{2}',$/m];
  const p = pats.find((x) => x.test(seg));
  if (!p || (seg.match(new RegExp(p.source, 'gm')) || []).length !== 1) throw new Error(`${id}: dateModified not found exactly once`);
  seg = seg.replace(p, (m) => (m.includes('"') ? `    "dateModified": "${DATE}",` : `    dateModified: '${DATE}',`));
  src = src.slice(0, r[0]) + seg + src.slice(r[1]);
}
if (!dry) writeFileSync(MS_TS, src);
console.log(`${dry ? '[dry] ' : ''}replacements ${replaced}, articles changed ${changed.size}: ${[...changed].join(', ')}`);
