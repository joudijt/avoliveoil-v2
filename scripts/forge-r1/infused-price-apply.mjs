// Owner 2026-11-05: infused 250 ml = RM75. Rewrites every "priced in store" /
// "dengan harga di kedai" sentence the R1 article maps produced. Exact snippets,
// each with an expected count; aborts before writing if any count differs.
import { readFileSync, writeFileSync } from 'node:fs';

const EN = [
  ['There is no published price for them yet. The blackseed, turmeric-black-pepper, rosemary-basil, lavender-chamomile, fennel-anise and wild-thyme infused oils come in 250 ml only and are priced in store, so ask at the branch or on WhatsApp. The plain extra virgin 250 ml is RM59.00. Choose by what you cook.',
   'Yes, a little. The blackseed, turmeric-black-pepper, rosemary-basil, lavender-chamomile, fennel-anise and wild-thyme infused oils come in 250 ml only, at RM75.00 each, against RM59.00 for the plain extra virgin 250 ml. Choose by what you cook.', 1],
  ['and the 250 ml [infused flavours](/products/infused-extra-virgin-olive-oil-wild-thyme) are priced in store.',
   'and the 250 ml [infused flavours](/products/infused-extra-virgin-olive-oil-wild-thyme) are RM75.00 each.', 1],
  ['comes in 250 ml only, priced in store.', 'comes in 250 ml only, at RM75.00.', 1],
  ['and the infused flavours come in 250 ml, priced in store.', 'and the infused flavours come in 250 ml at RM75.00.', 1],
  ['come in 250 ml only, priced in store.', 'come in 250 ml only, at RM75.00.', 1],
  ['The infused range comes in 250 ml only and is priced in store.', 'The infused range comes in 250 ml only, at RM75.00.', 1],
  ['in 250 ml bottles priced in store.', 'in 250 ml bottles at RM75.00.', 1],
];

const MS = [
  ['Harganya belum disenaraikan dalam talian. Setiap perisa dalam Infused Collection',
   'Ya, sedikit. Setiap perisa dalam Infused Collection', 1],
  ['dijual dalam botol 250 ml sahaja, dan harganya boleh ditanya di kedai atau melalui WhatsApp. Semuanya infusi masakan',
   'dijual dalam botol 250 ml sahaja pada harga RM75.00, berbanding RM59.00 untuk extra virgin biasa 250 ml. Semuanya infusi masakan', 1],
  ['belum disenaraikan dalam talian ? ia dijual dalam botol 250 ml sahaja, dengan harga di kedai.', null, 0], // placeholder, replaced below by exact char
  ['minyak ini dijual dalam botol 250 ml sahaja, dan harganya boleh ditanya terus di kedai atau melalui WhatsApp.',
   'minyak ini dijual dalam botol 250 ml sahaja pada harga RM75.00, iaitu RM300 seliter.', 1],
  ['Enam pilihan itu dijual dalam botol 250 ml sahaja, dengan harga di kedai.', 'Enam pilihan itu dijual dalam botol 250 ml sahaja pada harga RM75.00.', 1],
  ['250 ml, dengan harga di kedai.', '250 ml, pada harga RM75.00.', 12],
];

function apply(file, pairs) {
  let s = readFileSync(file, 'utf8');
  for (const [from, to, n] of pairs) {
    if (to === null) continue;
    const got = s.split(from).length - 1;
    if (got !== n) throw new Error(`${file}: expected ${n} of "${from.slice(0, 70)}", found ${got}`);
    s = s.split(from).join(to);
  }
  return s;
}

const en = apply('src/content/articles/en.ts', EN);
let ms = readFileSync('src/content/articles/ms.ts', 'utf8');
// the wild-thyme sentence uses an em dash; find it exactly
const wt = /harga perisa seperti \[wild thyme\]\(\/products\/infused-extra-virgin-olive-oil-wild-thyme\) belum disenaraikan dalam talian (.) ia dijual dalam botol 250 ml sahaja, dengan harga di kedai\./;
if (!wt.test(ms)) throw new Error('ms: wild-thyme sentence not found');
ms = ms.replace(wt, 'harga perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme) ialah RM75.00 $1 ia dijual dalam botol 250 ml sahaja.');
writeFileSync('src/content/articles/ms.ts', ms);
ms = apply('src/content/articles/ms.ts', MS);

for (const [name, txt] of [['en', en], ['ms', ms]]) {
  const left = (txt.match(/priced in store|no published price|harga di kedai|belum disenaraikan dalam talian|boleh ditanya (terus )?di kedai/g) || []).length;
  if (left) throw new Error(`${name}: ${left} no-price phrases left`);
}
writeFileSync('src/content/articles/en.ts', en);
writeFileSync('src/content/articles/ms.ts', ms);
console.log('infused RM75 applied to en.ts + ms.ts');
