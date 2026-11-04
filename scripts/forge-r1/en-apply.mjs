// FORGE PRODUCTS-R1 B5 step 3: apply docs/forge/r1-article-map.en.json to src/content/articles/en.ts.
// Exact-snippet replacement inside each article's own source span, with an expected-count
// assert per snippet. No global regex. Also gives each changed article its own
// dateModified literal (O-34). Aborts without writing if anything does not match.
import { readFileSync, writeFileSync } from 'node:fs';
import { EN_TS, MAP, loadEn } from './en-lib.mjs';

const TODAY = '2026-11-04';
const map = JSON.parse(readFileSync(MAP, 'utf8'));
let src = readFileSync(EN_TS, 'utf8');
const arts = await loadEn();
const byId = new Map(arts.map((a) => [a.id, a]));

const get = (obj, path) => path.split(/\.|\[|\]/).filter(Boolean).reduce((o, k) => o?.[k], obj);
const encS = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const encD = (s) => JSON.stringify(s).slice(1, -1);
const count = (hay, needle) => hay.split(needle).length - 1;

function span(text, id) {
  const marks = [`\n    id: '${id}',`, `\n    "id": "${id}",`];
  const starts = marks.map((m) => text.indexOf(m)).filter((i) => i >= 0);
  if (starts.length !== 1) throw new Error(`article ${id}: id line found ${starts.length}x`);
  const s = starts[0];
  const re = /\n {4}(id: '|"id": ")/g;
  re.lastIndex = s + 5;
  const nx = re.exec(text);
  return [s, nx ? nx.index : text.length];
}

const fail = [];
const groups = new Map(); // id -> Map(oldKey -> {entries})
for (const e of map) {
  const a = byId.get(e.id);
  if (!a) { fail.push(`unknown id ${e.id}`); continue; }
  const v = get(a, e.path);
  if (typeof v !== 'string') { fail.push(`${e.id} ${e.path}: not a string`); continue; }
  if (count(v, e.old) !== 1) { fail.push(`${e.id} ${e.path}: old snippet found ${count(v, e.old)}x in field`); continue; }
  const full = v === e.old;
  const key = `${full ? 'FULL' : 'PART'}\u0000${e.old}`;
  if (!groups.has(e.id)) groups.set(e.id, new Map());
  const g = groups.get(e.id);
  if (!g.has(key)) g.set(key, { full, old: e.old, new: e.new, n: 0 });
  const grp = g.get(key);
  if (grp.new !== e.new) fail.push(`${e.id}: same old snippet mapped to two different new texts`);
  grp.n++;
}
if (fail.length) { console.error(fail.join('\n')); process.exit(1); }

let replaced = 0;
// Work back-to-front by span so earlier offsets stay valid.
const ids = [...groups.keys()].map((id) => [id, span(src, id)[0]]).sort((x, y) => y[1] - x[1]).map((x) => x[0]);
for (const id of ids) {
  const [s, t] = span(src, id);
  let part = src.slice(s, t);
  for (const g of groups.get(id).values()) {
    const forms = [
      { enc: encS, q: "'" },
      { enc: encD, q: '"' },
    ].map((f) => ({ ...f, needle: g.full ? f.q + f.enc(g.old) + f.q : f.enc(g.old) }));
    const hits = forms.map((f) => count(part, f.needle));
    const total = forms[0].needle === forms[1].needle ? hits[0] : hits[0] + hits[1];
    if (total !== g.n) { fail.push(`${id}: "${g.old.slice(0, 60)}" expected ${g.n}, source has ${total}`); continue; }
    for (let k = 0; k < forms.length; k++) {
      if (!hits[k]) continue;
      const f = forms[k];
      const rep = g.full ? f.q + f.enc(g.new) + f.q : f.enc(g.new);
      part = part.split(f.needle).join(rep);
      replaced += hits[k];
      if (forms[0].needle === forms[1].needle) break;
    }
  }
  // O-34: own dateModified literal on each changed article.
  const m = part.match(/\n {4}("dateModified": "\d{4}-\d{2}-\d{2}",|dateModified: MODIFIED,|dateModified: '\d{4}-\d{2}-\d{2}',)/g) || [];
  if (m.length !== 1) { fail.push(`${id}: dateModified line found ${m.length}x`); continue; }
  const line = m[0];
  const nl = line.startsWith('\n    "') ? `\n    "dateModified": "${TODAY}",` : `\n    dateModified: '${TODAY}',`;
  part = part.replace(line, () => nl);
  src = src.slice(0, s) + part + src.slice(t);
}
if (fail.length) { console.error('ABORT, nothing written:\n' + fail.join('\n')); process.exit(1); }
writeFileSync(EN_TS, src);
console.log(`applied ${replaced} replacements (${map.length} map entries) in ${groups.size} articles; dateModified -> ${TODAY}`);
