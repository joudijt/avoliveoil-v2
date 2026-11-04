// FORGE PRODUCTS-R1 B5 step 1: list every EN article string that mentions price/branch facts.
import { writeFileSync } from 'node:fs';
import { loadEn, strings, TRIGGER } from './en-lib.mjs';
const arts = await loadEn();
const out = [];
for (const a of arts) for (const [p, v] of strings(a)) {
  if (['slug', 'id', 'focusKeyword'].includes(p) || p.startsWith('relatedKeywords') || p.startsWith('hero.') || p === 'ogImage') continue;
  if (TRIGGER.test(v)) out.push({ id: a.id, path: p, text: v });
}
const file = process.argv[2];
if (file) writeFileSync(file, JSON.stringify(out, null, 1));
console.log(`articles ${arts.length}, hits ${out.length}, articles hit ${new Set(out.map(o => o.id)).size}`);
