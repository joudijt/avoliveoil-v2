// FORGE PRODUCTS-R1 B6 step 4: verify ms.ts after ms-apply.
// Loads the pre-edit copy (argv[2], a .ts file with ./types beside it) and the
// current ms.ts, rebuilds the expected articles by applying the map to the old
// values, and deep-compares EVERY path. Protected fields compared explicitly.
// Then scans for banned phrases.
// Usage: node scripts/forge-r1/ms-verify.mjs <before.ts>
import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { MAP, loadMs, strings, BANNED } from './ms-lib.mjs';

const before = await loadMs(process.argv[2]);
const after = await loadMs();
const map = JSON.parse(readFileSync(MAP, 'utf-8'));
const DATE = '2026-11-04';
let fail = 0;
const bad = (m) => { fail++; console.error('FAIL', m); };

if (before.length !== after.length) bad('article count');
const expected = structuredClone(before);
const byId = Object.fromEntries(expected.map((a) => [a.id, a]));
const setP = (o, p, f) => { const ks = p.split(/\.|\[|\]/).filter(Boolean); const last = ks.pop(); const par = ks.reduce((x, k) => x[k], o); par[last] = f(par[last]); };
for (const e of map) setP(byId[e.id], e.path, (v) => { if (v.split(e.old).length !== 2) bad(`map old not once: ${e.id} ${e.path}`); return v.replace(e.old, () => e.new); });
const changed = new Set(map.map((e) => e.id));
for (const id of changed) byId[id].dateModified = DATE;

for (let i = 0; i < after.length; i++) {
  const a = after[i], x = expected[i];
  if (!isDeepStrictEqual(a, x)) {
    const ea = new Map([...strings(a)]), ex = new Map([...strings(x)]);
    for (const [p, v] of ex) if (ea.get(p) !== v) bad(`${x.id} ${p}\n   want ${v}\n   got  ${ea.get(p)}`);
    if (ea.size !== ex.size) bad(`${x.id} leaf count ${ea.size} vs ${ex.size}`);
  }
  const b = before[i];
  for (const k of ['id', 'slug', 'focusKeyword', 'relatedKeywords', 'h1', 'seoTitle', 'metaTitle', 'datePublished'])
    if (!isDeepStrictEqual(a[k], b[k])) bad(`${a.id} protected ${k} changed`);
  const heads = (o) => JSON.stringify([(o.sections || []).map((s) => [s.heading, s.id]), o.conclusion?.heading, (o.faqs || []).map((f) => f.q)]);
  if (heads(a) !== heads(b)) bad(`${a.id} headings/anchors/questions changed`);
  if (!changed.has(a.id) && a.dateModified !== b.dateModified) bad(`${a.id} dateModified changed but no text change`);
}
// banned phrases
let hits = 0;
for (const a of after) for (const [p, v] of strings(a)) {
  for (const re of BANNED) if (re.test(v.replace(/68100 Batu Caves, Selangor/g, ''))) { hits++; console.error(`BANNED ${re} ${a.id} ${p}: ${v.slice(0, 160)}`); }
  if (/Batu Caves/.test(v) && !/68100 Batu Caves/.test(v)) { hits++; console.error(`Batu Caves as branch: ${a.id} ${p}`); }
  if (/\bharga (yang )?sama\b/i.test(v) && /perisa|infus|rasa|saiz/i.test(v)) console.warn(`CHECK harga sama: ${a.id} ${p}: ${v.slice(0, 160)}`);
}
if (hits) fail += hits;
console.log(`articles ${after.length}, changed ${changed.size}, map entries ${map.length}, banned hits ${hits}, failures ${fail}`);
process.exit(fail ? 1 : 0);
