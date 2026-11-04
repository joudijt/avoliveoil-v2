// FORGE PRODUCTS-R1 B5 step 4: verify en.ts against git HEAD + the map.
// - expected = HEAD articles with each map entry applied to its own path (+ dateModified on changed ids);
//   deep-compare against the reloaded en.ts, so every unmapped path must be byte-identical.
// - no mapped path may be a slug / id / focusKeyword / relatedKeywords / heading / h1 / title / FAQ question.
// - zero O-30 banned phrases (plus R1 extras) in any EN article string and in the raw file.
// - spoon table re-derived from price-math.
import { readFileSync, writeFileSync, mkdtempSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { EN_TS, MAP, ROOT, loadEn, strings, BANNED } from './en-lib.mjs';
import { senPerMl } from '../lib/price-math.mjs';

const TODAY = '2026-11-04';
const map = JSON.parse(readFileSync(MAP, 'utf8'));
const errs = [];

// HEAD copy of en.ts in a temp dir (types.ts copied beside it for the type-only import).
const dir = mkdtempSync(join(tmpdir(), 'r1-en-'));
writeFileSync(join(dir, 'en.ts'), execFileSync('git', ['show', 'HEAD:src/content/articles/en.ts'], { cwd: ROOT, maxBuffer: 1 << 28 }));
copyFileSync(join(ROOT, 'src/content/articles/types.ts'), join(dir, 'types.ts'));
const head = (await import(pathToFileURL(join(dir, 'en.ts')).href)).EN_ARTICLES;
const now = await loadEn();

const keys = (p) => p.split(/\.|\[|\]/).filter(Boolean);
const get = (o, p) => keys(p).reduce((x, k) => x?.[k], o);
const set = (o, p, v) => { const k = keys(p); const last = k.pop(); k.reduce((x, kk) => x[kk], o)[last] = v; };

const PROTECTED = /^(slug|id|focusKeyword|seoTitle|metaTitle|h1)$|^relatedKeywords|heading$|^sections\[\d+\]\.id$|^faqs\[\d+\]\.q$|\.label$|\.path$/;
const expected = structuredClone(head);
const changed = new Set();
for (const e of map) {
  if (PROTECTED.test(e.path)) errs.push(`protected path mapped: ${e.id} ${e.path}`);
  const a = expected.find((x) => x.id === e.id);
  const v = get(a, e.path);
  if (typeof v !== 'string' || v.split(e.old).length !== 2) { errs.push(`map old not once in HEAD: ${e.id} ${e.path}`); continue; }
  set(a, e.path, v.split(e.old).join(e.new));
  changed.add(e.id);
}
for (const a of expected) if (changed.has(a.id)) a.dateModified = TODAY;

if (now.length !== expected.length) errs.push(`article count ${now.length} != ${expected.length}`);
for (let i = 0; i < expected.length; i++) {
  const x = expected[i], y = now[i];
  if (!y || x.id !== y.id) { errs.push(`order/id mismatch at ${i}`); continue; }
  if (!isDeepStrictEqual(x, y)) {
    const xs = new Map([...strings(x)]), ys = new Map([...strings(y)]);
    for (const p of new Set([...xs.keys(), ...ys.keys()])) if (xs.get(p) !== ys.get(p)) errs.push(`${x.id} ${p} differs from expected`);
    if (!errs.length) errs.push(`${x.id}: non-string difference`);
  }
  // explicit byte-identity of protected fields vs HEAD
  const h = head[i];
  for (const p of ['slug', 'id', 'focusKeyword', 'seoTitle', 'metaTitle', 'h1']) if (h[p] !== y[p]) errs.push(`${h.id} ${p} changed`);
  if (!isDeepStrictEqual(h.relatedKeywords, y.relatedKeywords)) errs.push(`${h.id} relatedKeywords changed`);
  (h.sections || []).forEach((s, j) => { if (s.heading !== y.sections[j]?.heading || s.id !== y.sections[j]?.id) errs.push(`${h.id} section ${j} heading/id changed`); });
  (h.faqs || []).forEach((f, j) => { if (f.q !== y.faqs[j]?.q) errs.push(`${h.id} faq ${j} q changed`); });
  if (!changed.has(h.id) && h.dateModified !== y.dateModified) errs.push(`${h.id} dateModified changed but article not in map`);
}

// Banned phrases (O-30) + R1 extras, in every string and in the raw source.
const EXTRA = [/Batu Caves(?<!68100 Batu Caves)/, /price follows (bottle )?size/i, /same price/i, /both branches/i, /larger (store|branch|outlet)/i, /\bRM103\b/, /\bRM206\b/, /21 sen/];
const hits = [];
for (const a of now) for (const [p, v] of strings(a)) for (const re of [...BANNED, ...EXTRA]) if (re.test(v)) hits.push(`${a.id} ${p}: ${re} -> ${v.slice(0, 100)}`);
const raw = readFileSync(EN_TS, 'utf8');
for (const re of [...BANNED, ...EXTRA]) if (re.test(raw)) hits.push(`raw en.ts: ${re}`);
errs.push(...hits);

// Review list (not an error): any sentence with "infused" and "500 ml" together, and any hours sentence.
const review = [];
for (const a of now) for (const [p, v] of strings(a)) for (const s of v.split(/(?<=\.)\s/)) {
  if (/infused/i.test(s) && /500 ?ml/i.test(s)) review.push(`${a.id} ${p}: ${s}`);
  if (/midnight|8:00 am/i.test(s) && !/Ampang and Sri Gombak/.test(s)) review.push(`HOURS ${a.id} ${p}: ${s}`);
}

// Spoon table re-derived from price-math (both columns).
const ck = now.find((a) => a.id === 'olive-oil-for-cooking').sections[3].blocks[1];
for (const r of ck.rows) {
  const ml = Number(r[1].replace(/\D/g, ''));
  const c250 = `RM${((senPerMl(59, 250) * ml) / 100).toFixed(2)}`, c500 = `RM${((senPerMl(109, 500) * ml) / 100).toFixed(2)}`;
  if (r[2] !== c250 || r[3] !== c500) errs.push(`spoon row ${r[0]}: ${r[2]}/${r[3]} != ${c250}/${c500}`);
}

console.log(`map entries ${map.length}; articles changed ${changed.size}: ${[...changed].join(', ')}`);
console.log(`review (infused+500ml / hours not naming Ampang+Sri Gombak): ${review.length}`);
review.forEach((r) => console.log('  ' + r));
if (errs.length) { console.error(`FAIL ${errs.length}\n` + errs.join('\n')); process.exit(1); }
console.log('PASS: unmapped paths identical to HEAD, protected fields identical, 0 banned phrases, spoon table matches price-math');
