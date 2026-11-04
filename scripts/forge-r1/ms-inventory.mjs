// FORGE PRODUCTS-R1 B6 step 1: list every MS article string leaf hitting a trigger.
// Usage: node scripts/forge-r1/ms-inventory.mjs [outFile]
import { writeFileSync } from 'node:fs';
import { loadMs, strings, TRIGGER } from './ms-lib.mjs';

const arts = await loadMs();
const rows = [];
for (const a of arts) for (const [p, v] of strings(a)) if (TRIGGER.test(v)) rows.push({ id: a.id, path: p, text: v });
const out = process.argv[2];
if (out) writeFileSync(out, JSON.stringify(rows, null, 1));
const ids = new Set(rows.map((r) => r.id));
console.log(`articles ${arts.length}, hits ${rows.length}, in ${ids.size} articles`);
