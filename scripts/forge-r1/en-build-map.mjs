// FORGE PRODUCTS-R1 B5 step 2: write docs/forge/r1-article-map.en.json.
// Every derived money figure comes from scripts/lib/price-math.mjs (O-31) — no hand arithmetic.
// Re-runnable: if the owner flips "unnamed Arabian Village oil" to Organic, change DEFAULT below
// and re-run build-map -> apply (against the pre-R1 en.ts) -> verify.
import { writeFileSync } from 'node:fs';
import { perLitre, senPerMl } from '../lib/price-math.mjs';
import { MAP } from './en-lib.mjs';

const EV = { 250: 59, 500: 109, name: 'Extra Virgin' };
const OR = { 250: 69, 500: 129, name: 'Organic' };
const DEFAULT = EV; // O-31 Q1 default: an unnamed "Arabian Village oil" price = Extra Virgin.

const p2 = (n) => `RM${n.toFixed(2)}`; // article house style RM59.00
const D250 = p2(DEFAULT[250]), D500 = p2(DEFAULT[500]);
const L250 = perLitre(DEFAULT[250], 250), L500 = perLitre(DEFAULT[500], 500);
const GAP_L = L250 - L500; // per-litre gap
const TWO250 = DEFAULT[250] * 2, SAVE = TWO250 - DEFAULT[500]; // two small vs one large
const S250 = Math.round(senPerMl(DEFAULT[250], 250)), S500 = Math.round(senPerMl(DEFAULT[500], 500)); // "about N sen"
const spoon = (ml, size) => `RM${((senPerMl(DEFAULT[size], size) * ml) / 100).toFixed(2)}`;
const O250 = p2(OR[250]), O500 = p2(OR[500]);
if (DEFAULT === EV && (L250 !== 236 || L500 !== 218 || GAP_L !== 18 || SAVE !== 9 || S250 !== 24 || S500 !== 22)) throw new Error('price-math sanity');
if (perLitre(OR[250], 250) !== 276 || perLitre(OR[500], 500) !== 258) throw new Error('organic sanity');

const LIST = '(Ampang, Kajang, Shah Alam, Cash & Carry in Ampang and Sri Gombak)';
const FIVE = `five branches in Selangor ${LIST}`;
const STD_REL = ['Berkat Madinah Store in Ampang Jaya and Batu Caves', "Berkat Madinah Store's five branches in Selangor"];
const DN = DEFAULT.name.toLowerCase();

const m = [];
const add = (id, path, old, nw) => m.push({ id, path, old, new: nw });
const rel = (id, i) => add(id, `related[${i}].description`, ...STD_REL);

// --- cold-pressed-olive-oil-explained
add('cold-pressed-olive-oil-explained', 'sections[5].blocks[3].text',
  'On our own bottles, RM59.00 for 250 ml is RM236 a litre; RM103.00 for 500 ml is RM206. The [full range](/shop) prices the same by size across the classic oil and every Infused Collection flavour, and',
  `On our own ${DN} bottles, ${D250} for 250 ml is RM${L250} a litre; ${D500} for 500 ml is RM${L500}. The [full range](/shop) also lists the organic oil and the 250 ml Infused Collection flavours, and`);
add('cold-pressed-olive-oil-explained', 'faqs[5].a',
  'Both branches, Ampang Jaya and the larger Batu Caves store, open 8:00 am to 12:00 midnight daily, though festive days such as Hari Raya can differ. [Message the store](/contact) on WhatsApp at +60 11-1111 9912.',
  `It has ${FIVE}. Ampang and Sri Gombak open 8:00 am to 12:00 midnight daily, though festive days such as Hari Raya can differ. [Message the store](/contact) on WhatsApp at +60 11-1111 9912 to confirm hours at the other branches.`);
add('cold-pressed-olive-oil-explained', 'related[2].description',
  'Branch counters, opening hours, and the price of every size and flavour.',
  'All five branch counters, opening hours and current prices by size.');

// --- compare-olive-oil-brands-malaysia
const CB = 'compare-olive-oil-brands-malaysia';
add(CB, 'sections[3].blocks[1].rows[1][1]', 'RM103.00', D500);
add(CB, 'sections[3].blocks[1].rows[1][2]', 'RM206 per litre', `RM${L500} per litre`);
add(CB, 'sections[3].blocks[3].text',
  'Those [Arabian Village prices](/shop) hold by size for the classic oil and every [infused flavour](/products/infused-extra-virgin-olive-oil-wild-thyme).',
  'Those [Arabian Village prices](/shop) are for the extra virgin oil; the organic oil costs more, and the 250 ml [infused flavours](/products/infused-extra-virgin-olive-oil-wild-thyme) are priced in store.');
add(CB, 'conclusion.blocks[1].text',
  'or [visit a branch](/contact) in Ampang Jaya or Batu Caves.',
  'or [visit one of its five branches](/contact) in Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) and Sri Gombak.');
add(CB, 'faqs[2].a',
  'Arabian Village sells 250 ml at RM59.00 and 500 ml at RM103.00, which works out to RM236 and RM206 per litre. The larger bottle costs less per litre. The smaller one makes sense when you are trying a flavour for the first time.',
  `Arabian Village ${DEFAULT.name} is ${D250} for 250 ml and ${D500} for 500 ml, which works out to RM${L250} and RM${L500} per litre. The larger bottle costs less per litre. The smaller one makes sense when you are trying the oil for the first time, and the infused flavours come in 250 ml only.`);

// --- halal-olive-oil-malaysia
const H = 'halal-olive-oil-malaysia';
add(H, 'sections[5].blocks[0].text',
  'You can also read the back label yourself at either branch.',
  `You can also read the back label yourself at any of its ${FIVE}.`);
add(H, 'sections[5].blocks[1].rows[3][1]',
  'RM59.00 for 250 ml, RM103.00 for 500 ml', `${D250} for 250 ml, ${D500} for 500 ml (${DEFAULT.name})`);
add(H, 'sections[5].blocks[3].text',
  'Two branches: Ampang Jaya and Batu Caves, the larger. Both open 8:00 am to 12:00 midnight daily, though festive days differ.',
  'Five branches in Selangor: Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) and Sri Gombak. Ampang and Sri Gombak open 8:00 am to 12:00 midnight daily, though festive days differ; WhatsApp to confirm hours at the others.');
add(H, 'related[1].description',
  'Both Berkat Madinah branches, opening hours', 'All five Berkat Madinah branches, opening hours');

// --- olive-oil-price-malaysia
const P = 'olive-oil-price-malaysia';
add(P, 'metaDescription', 'RM103.00 for 500 ml, and how', `${D500} for 500 ml, and how`);
add(P, 'keyTakeaway',
  'Arabian Village is RM59.00 for 250 ml and RM103.00 for 500 ml, which works out at RM236.00 and RM206.00 per litre,',
  `Arabian Village ${DEFAULT.name} is ${D250} for 250 ml and ${D500} for 500 ml, which works out at RM${L250}.00 and RM${L500}.00 per litre,`);
add(P, 'sections[0].blocks[0].text',
  '**RM103.00 for 500 ml**. The same price holds for the classic oil and for every [infused flavour](/products/infused-extra-virgin-olive-oil-wild-thyme).',
  `**${D500} for 500 ml**. The organic version is ${O250} and ${O500}, and every [infused flavour](/products/infused-extra-virgin-olive-oil-wild-thyme) comes in 250 ml only, priced in store.`);
add(P, 'sections[0].blocks[1].rows[1][1]', 'RM103.00', D500);
add(P, 'sections[0].blocks[1].rows[1][2]', 'RM206.00 per litre', `RM${L500}.00 per litre`);
add(P, 'sections[2].blocks[0].text',
  'A 500 ml bottle at RM103.00 is RM206.00 per litre.', `A 500 ml bottle at ${D500} is RM${L500}.00 per litre.`);
add(P, 'sections[2].blocks[1].text',
  'The 500 ml wins: RM206.00 a litre against RM236.00, a gap of RM30.00. Two 250 ml bottles cost RM118.00; one 500 ml holds the same oil for RM103.00. Buy small to try a flavour, larger for daily cooking.',
  `The 500 ml wins: RM${L500}.00 a litre against RM${L250}.00, a gap of RM${GAP_L}.00. Two 250 ml bottles cost RM${TWO250}.00; one 500 ml holds the same oil for ${D500}, a saving of RM${SAVE}.00. Buy small to try the oil, larger for daily cooking.`);
add(P, 'sections[5].blocks[0].text',
  'It sells the oil at two branches, Ampang Jaya and Batu Caves, the larger of the pair, and through its own Shopee storefront and TikTok Shop. Both branches open 8:00 am to 12:00 midnight, Monday through Sunday.',
  `It sells the oil at ${FIVE} and through its own Shopee storefront and TikTok Shop. The Ampang and Sri Gombak branches open 8:00 am to 12:00 midnight, Monday through Sunday; WhatsApp to confirm hours at the other three. Stock can vary by branch.`);
add(P, 'conclusion.blocks[0].text',
  'Here that is RM236.00 a litre for the 250 ml and RM206.00 for the 500 ml, so the bigger bottle wins by RM30.00.',
  `Here that is RM${L250}.00 a litre for the 250 ml and RM${L500}.00 for the 500 ml, so the bigger bottle wins by RM${GAP_L}.00.`);
add(P, 'faqs[0].a',
  'RM59.00 for 250 ml and RM103.00 for 500 ml, and that price holds for the classic oil and for each infused flavour.',
  `${D250} for 250 ml and ${D500} for 500 ml; the organic oil is ${O250} and ${O500}, and the infused flavours come in 250 ml, priced in store.`);
add(P, 'faqs[1].a',
  'extra virgin olive oil is RM103.00. In a comparable unit that is RM206.00 per litre,',
  `extra virgin olive oil is ${D500}. In a comparable unit that is RM${L500}.00 per litre,`);
add(P, 'faqs[2].a',
  'It works out at RM206.00 per litre against RM236.00 for the 250 ml, a difference of RM30.00 a litre. Two 250 ml bottles cost RM118.00 for the same volume one 500 ml bottle delivers at RM103.00.',
  `It works out at RM${L500}.00 per litre against RM${L250}.00 for the 250 ml, a difference of RM${GAP_L}.00 a litre. Two 250 ml bottles cost RM${TWO250}.00 for the same volume one 500 ml bottle delivers at ${D500}, a saving of RM${SAVE}.00.`);
add(P, 'faqs[4].a',
  'No. Price follows bottle size only, so a 250 ml bottle of blackseed, turmeric-black-pepper, rosemary-basil, lavender-chamomile, fennel-anise or wild-thyme infused oil is RM59.00, exactly like the classic. The 500 ml is RM103.00 across the whole range. Choose by what you cook.',
  `There is no published price for them yet. The blackseed, turmeric-black-pepper, rosemary-basil, lavender-chamomile, fennel-anise and wild-thyme infused oils come in 250 ml only and are priced in store, so ask at the branch or on WhatsApp. The plain ${DN} 250 ml is ${D250}. Choose by what you cook.`);
add(P, 'related[0].description',
  'Every size and infused flavour, with current prices.',
  'Every classic size with its current price, plus the six infused flavours.');

// --- palestinian-olive-oil-origin
const PO = 'palestinian-olive-oil-origin';
add(PO, 'sections[5].blocks[0].text',
  'The oil is sold at its two branches, Ampang Jaya and Batu Caves, the larger, and through',
  `The oil is sold at its ${FIVE} and through`);
add(PO, 'sections[5].blocks[1].text',
  'Prices are RM59.00 for 250 ml and RM103.00 for 500 ml, and a size costs the same whether you take the classic oil or a flavour from the [infused collection](/products) such as [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme).',
  `${EV.name} is ${p2(EV[250])} for 250 ml and ${p2(EV[500])} for 500 ml, and ${OR.name} ${O250} and ${O500}. Flavours from the [infused collection](/products) such as [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme) come in 250 ml only, priced in store.`);
add(PO, 'sections[5].blocks[3].text',
  'Branches open 8:00 am to 12:00 midnight, Monday through Sunday.',
  'The Ampang and Sri Gombak branches open 8:00 am to 12:00 midnight, Monday through Sunday; check hours at the other three first.');
add(PO, 'faqs[4].a',
  'Buy it at the Ampang Jaya and Batu Caves branches, Batu Caves being the larger, or online',
  `Buy it at any of its ${FIVE}, or online`);
add(PO, 'faqs[5].a',
  'RM59.00 for the 250 ml bottle and RM103.00 for the 500 ml. Price follows the size and not the flavour, so a bottle from the infused range costs the same as the classic oil at the same volume.',
  `${D250} for the 250 ml bottle and ${D500} for the 500 ml of ${DEFAULT.name}; the organic oil is ${O250} and ${O500}. The infused range comes in 250 ml only and is priced in store.`);
add(PO, 'related[2].description',
  'Branch counters in Ampang Jaya and Batu Caves,', 'Five branch counters in Selangor,');

// --- olive-oil-for-cooking
const C = 'olive-oil-for-cooking';
add(C, 'sections[3].blocks[0].text',
  'Arabian Village is **RM59.00 for 250 ml** and **RM103.00 for 500 ml**, which is RM236 and RM206 a litre. Divide by a thousand and a millilitre costs about 24 sen from the small bottle, 21 sen from the large.',
  `Arabian Village ${DEFAULT.name} is **${D250} for 250 ml** and **${D500} for 500 ml**, which is RM${L250} and RM${L500} a litre. Divide by a thousand and a millilitre costs about ${S250} sen from the small bottle, about ${S500} sen from the large.`);
// Spoon table: volumes 5/15/30/60 ml (rows[i][1] in en.ts). The 250 ml column recomputes
// to the same values (checked by en-verify.mjs), the 500 ml column is new.
[[0, 5, 'RM1.03'], [1, 15, 'RM3.09'], [2, 30, 'RM6.18'], [3, 60, 'RM12.36']].forEach(([r, ml, old]) =>
  add(C, `sections[3].blocks[1].rows[${r}][3]`, old, spoon(ml, 500)));
add(C, 'sections[4].blocks[0].text',
  'is six botanicals in the same cold-pressed base, priced the same by size.',
  'is six botanicals in the same cold-pressed base, in 250 ml bottles priced in store.');
add(C, 'sections[5].blocks[3].text',
  'at Ampang Jaya and the larger Batu Caves branch in Prima Seri Gombak. Both open 8:00 am to midnight daily.',
  `at ${FIVE}. Ampang and Sri Gombak open 8:00 am to midnight daily.`);
add(C, 'faqs[2].a', 'and about RM3.09 from the 500 ml bottle.', `and about ${spoon(15, 500)} from the 500 ml bottle.`);
add(C, 'faqs[5].a',
  'its Ampang Jaya branch or the larger Batu Caves outlet in Prima Seri Gombak, plus',
  `any of its ${FIVE}, plus`);
add(C, 'related[0].description',
  'The classic oil and all six infused flavours, with current prices.',
  'The classic oil with current prices, and all six infused flavours in 250 ml.');

// --- price-only articles
add('olive-oil-smoke-point', 'related[0].description', 'and RM103.00 for 500 ml.', `and ${D500} for 500 ml.`);
rel('olive-oil-smoke-point', 3);
add('olive-oil-vs-pomace-oil', 'sections[4].blocks[1].text',
  'RM59.00 for 250 ml and RM103.00 for 500 ml, or RM236 and RM206 a litre.',
  `${D250} for 250 ml and ${D500} for 500 ml, or RM${L250} and RM${L500} a litre.`);
add('olive-oil-vs-pomace-oil', 'faqs[5].a', 'and RM103.00 for 500 ml through', `and ${D500} for 500 ml through`);
add('olive-oil-vs-coconut-oil', 'sections[4].blocks[0].text', 'and RM206 in the 500 ml,', `and RM${L500} in the 500 ml,`);

// --- branch-only body copy
add('best-extra-virgin-olive-oil-in-malaysia', 'sections[4].blocks[1].text',
  'with branches at Ampang Jaya and Batu Caves and a WhatsApp', `with ${FIVE} and a WhatsApp`);
const EM = 'extra-virgin-olive-oil-in-malaysia';
add(EM, 'sections[3].blocks[1].text',
  'with two physical branches in Selangor rather than', `with five physical branches in Selangor ${LIST} rather than`);
add(EM, 'sections[5].blocks[1].text',
  'at its Ampang Jaya and Batu Caves branches, the latter being the larger of the two, alongside',
  'at any of its five branches, alongside');
add(EM, 'faqs[5].a',
  'The same seller runs the two physical branches in Selangor.', 'The same seller runs the five physical branches in Selangor.');
add('olive-oil-is-it-healthy', 'sections[5].blocks[1].text',
  'one named distributor with two branches you can walk into', 'one named distributor with five branches you can walk into');
add('olive-oil-vs-sesame-oil', 'sections[5].blocks[1].text',
  '— two branches in Selangor, plus', `— ${FIVE}, plus`);
add('olive-oil-vs-sesame-oil', 'faqs[5].a',
  "Through Berkat Madinah Store's two branches in Selangor,", "Through Berkat Madinah Store's five branches in Selangor,");
add('olive-oil-vs-sunflower-oil', 'sections[5].blocks[1].text',
  "[Berkat Madinah Store's two branches, its Shopee counter", "[Berkat Madinah Store's five branches, its Shopee counter");
add('olive-oil-vs-sunflower-oil', 'related[3].description',
  "Berkat Madinah Store's two branches in Selangor,", "Berkat Madinah Store's five branches in Selangor,");

// --- standard "where to buy" related card (Ampang Jaya and Batu Caves)
for (const [id, i] of [
  ['evoo-salad-dressing', 3], ['evoo-vs-pure-olive-oil', 3], ['olive-oil-air-fryer', 3], ['olive-oil-for-bread', 3],
  ['olive-oil-marinade', 3], ['olive-oil-shelf-life', 3], ['garlic-infused-olive-oil', 3], ['olive-oil-bitter-taste', 3],
  ['olive-oil-bottle-size', 3], ['olive-oil-for-baking', 3], ['olive-oil-substitute', 3], ['olive-oil-vs-coconut-oil', 4],
  ['aglio-e-olio', 3], ['cloudy-olive-oil', 3], ['olive-oil-and-balsamic', 3], ['olive-oil-for-grilling', 3],
  ['olive-oil-for-hummus', 3], ['olive-oil-vs-avocado-oil', 3], ['olive-oil-focaccia', 3], ['olive-oil-fried-egg', 3],
  ['olive-oil-popcorn', 3], ['olive-oil-roasted-vegetables', 3], ['olive-oil-vs-butter', 3], ['olive-oil-coffee', 3],
  ['olive-oil-ice-cream', 2], ['olive-oil-mashed-potatoes', 3], ['olive-oil-orange-cake', 3], ['olive-oil-vs-sesame-oil', 3],
]) rel(id, i);

// --- product cards implying infused in 500 ml or an infused price
const INF1 = ['Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours and the price for each size.',
  'Palestinian cold-pressed oil in 250 ml and 500 ml with prices, plus the six infused flavours in 250 ml.'];
for (const [id, i] of [['olive-oil-and-balsamic', 0], ['olive-oil-focaccia', 0], ['olive-oil-fried-egg', 0], ['olive-oil-popcorn', 0],
  ['olive-oil-vs-butter', 0], ['olive-oil-mashed-potatoes', 2], ['olive-oil-vs-sesame-oil', 0], ['olive-oil-vs-sunflower-oil', 0]])
  add(id, `related[${i}].description`, ...INF1);
add('olive-oil-for-grilling', 'related[0].description',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused oils, with prices.',
  'Palestinian cold-pressed oil in 250 ml and 500 ml with prices, plus the six infused oils in 250 ml.');
add('olive-oil-for-hummus', 'related[0].description',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused oils.',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused oils in 250 ml.');
add('olive-oil-roasted-vegetables', 'related[0].description',
  'plus the six infused flavours for a finishing drizzle.', 'plus the six 250 ml infused flavours for a finishing drizzle.');
add('aglio-e-olio', 'related[0].description',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, the classic bottle plus six infused flavours.',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, plus six infused flavours in 250 ml.');
add('cloudy-olive-oil', 'related[0].description',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, classic and the six infused flavours.',
  'Palestinian cold-pressed oil in 250 ml and 500 ml, plus the six infused flavours in 250 ml.');
add('olive-oil-substitute', 'related[0].description',
  'The classic Palestinian cold-pressed oil and the six infused oils, in 250 ml and 500 ml bottles.',
  'The classic Palestinian cold-pressed oil in 250 ml and 500 ml bottles, and the six infused oils in 250 ml.');
add('extra-virgin-olive-oil-uses', 'related[0].description',
  'The classic oil and six infused flavours, in 250 ml and 500 ml.',
  'The classic oil in 250 ml and 500 ml, and six infused flavours in 250 ml.');
add('olive-oil-for-baking', 'related[0].description',
  'Palestinian cold-pressed oil in two bottle sizes, plus the six infused oils, with current prices.',
  'Palestinian cold-pressed oil in two bottle sizes with current prices, plus the six infused oils in 250 ml.');

writeFileSync(MAP, JSON.stringify(m, null, 2) + '\n');
console.log(`map entries ${m.length}, articles ${new Set(m.map((e) => e.id)).size} -> ${MAP}`);
