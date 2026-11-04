/**
 * Generates AI-FACTS.yml — the input the ai-visibility-kit reads — from
 * src/data/storeFacts.json plus the editorial overlay held below.
 *
 * Why this exists: storeFacts.json is already this project's single source of
 * truth for every checkable value (prices, hours, branch addresses, WhatsApp,
 * seller URLs, scale figures), and its own comment says never to retype a value
 * into content. Hand-writing AI-FACTS.yml would have re-typed all of them into a
 * fourth place, which is exactly the drift the file exists to prevent. So the
 * facts come from storeFacts.json and only prose that lives nowhere else — the
 * definition sentence, the page map, the Q&A, the agent actions — is written
 * here.
 *
 * Usage: node scripts/ai/facts-sync.mjs [--check] [--today=YYYY-MM-DD]
 *   --check  fails instead of writing when the committed AI-FACTS.yml has
 *            drifted from storeFacts.json. Use before a deploy.
 *   --today  the `updated:` date. Default: the build date (Malaysia time); with
 *            --check, the date already committed (the check compares content,
 *            not the clock).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { perLitre, rm } from '../lib/price-math.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const F = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
const CHECK = process.argv.includes('--check');
const OUT = join(ROOT, 'AI-FACTS.yml');

const { seller: S, branches: B, prices: P, scale: SC, site: SITE, branchesNote: BN } = F;
const SITE_URL = 'https://avoliveoil.com';

const todayArg = process.argv.find(a => a.startsWith('--today='))?.slice('--today='.length);
if (todayArg && !/^\d{4}-\d{2}-\d{2}$/.test(todayArg)) throw new Error(`facts-sync: bad --today=${todayArg}`);
const committedDate = existsSync(OUT)
  ? readFileSync(OUT, 'utf8').match(/^ {2}updated: (\d{4}-\d{2}-\d{2})\r?$/m)?.[1]
  : undefined;
const TODAY = todayArg
  ?? (CHECK ? committedDate : undefined)
  ?? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());

/* Branches in storeFacts order (the owner's order, Ampang first) — no ranking: with
   five branches nobody gave a "main" or "larger" one. The postal address below is
   branch[0], the same CONTACT_ADDRESS the pages use. */
const main = B[0];
const addr = b => `${b.street}, ${b.postalCode} ${b.locality}, ${b.region}`;
const joinList = (items, and) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
const NAMES_EN = joinList(B.map(b => b.labelEn), 'and');
const NAMES_MS = joinList(B.map(b => b.labelMs), 'dan');

/* O-33: an hours sentence names ONLY the branches whose hours the owner gave. */
const withHours = B.filter(b => b.hours);
const noHours = B.filter(b => !b.hours);
const HOURS_EN = [
  ...[...new Set(withHours.map(b => b.hours.displayEn))].map(
    d => `${joinList(withHours.filter(b => b.hours.displayEn === d).map(b => b.labelEn), 'and')}: ${d}.`,
  ),
  noHours.length
    ? `${joinList(noHours.map(b => b.labelEn), 'and')}: ask for opening hours on WhatsApp ${S.whatsappDisplay}.`
    : '',
].filter(Boolean).join(' ');

/* Prices by product and size, from storeFacts; per-litre computed, never stored. */
const PX = (key, size) => {
  const v = P.products[key]?.[`ml${size}`];
  if (!v) throw new Error(`facts-sync: storeFacts.prices.products.${key}.ml${size} is not set`);
  return { display: v.display, perL: rm(perLitre(v.amount, size)) };
};
const EV250 = PX('extra-virgin', 250);
const EV500 = PX('extra-virgin', 500);
const OR250 = PX('organic', 250);
const OR500 = PX('organic', 500);
/* Infused: 250 ml only, and no price until the owner sets one — never a guessed number. */
const INF = P.products.infused?.ml250 ?? null;
const INFUSED_EN = INF ? `${INF.display} for 250 ml` : '250 ml only, price in store — ask on WhatsApp';
const INFUSED_MS = INF ? `${INF.display} untuk 250 ml` : '250 ml sahaja, harga di kedai — tanya melalui WhatsApp';
const PRICE_LINE_EN = `Extra Virgin ${EV250.display} (250 ml) / ${EV500.display} (500 ml); Organic Extra Virgin ${OR250.display} (250 ml) / ${OR500.display} (500 ml); infused flavours ${INFUSED_EN}`;
const PRICE_LINE_MS = `Extra Virgin ${EV250.display} (250 ml) / ${EV500.display} (500 ml); Extra Virgin Organik ${OR250.display} (250 ml) / ${OR500.display} (500 ml); rasa infusi ${INFUSED_MS}`;

/** A YAML scalar on one line. The kit's parser has no block scalars, and an
 *  unquoted value keeps colons and dashes intact because the key regex takes
 *  the whole rest of the line. */
const one = s => String(s).replace(/\s*\n\s*/g, ' ').trim();

const L = [];
const p = (...lines) => L.push(...lines);

p('####################################################################');
p('#  AI-FACTS.yml — Arabian Village (avoliveoil.com)');
p('#');
p('#  GENERATED by scripts/ai/facts-sync.mjs — do not hand-edit.');
p('#  Every checkable value comes from src/data/storeFacts.json, the same');
p('#  source the pages, the JSON-LD and llms*.txt read. Change a price or an');
p('#  address there and re-run; editing this file directly puts the value in a');
p('#  fourth place and it will drift.');
p('#');
p('#  Prose that exists nowhere else (definition, page map, Q&A, agent actions)');
p('#  lives in the overlay inside facts-sync.mjs.');
p('#');
p('#  HARD RULE: Malaysian Food Regulations 1985, Regulation 18(6) — no food may');
p('#  be advertised as preventing, alleviating, treating or curing any disease.');
p('#  Benefit words are search terms, never claims about this product.');
p('####################################################################');
p('');

p('site:');
p('  name: Arabian Village');
/* The site renders the brand as "Arabian Village" in both EN and MS. A language
   file whose heading disagrees with the pages is the wrong-language-body failure. */
p('  name_ms: Arabian Village');
p(`  url: ${SITE_URL}`);
/* scripts/ai/build.mjs emits Organization.logo when this fact exists, so the
   JSON-LD an assistant reads out of AI-FACTS.yml names the same mark the header
   renders. The file itself is written by scripts/brand-assets.py from
   src/assets/logo/logo_theme.svg. */
p(`  logo: ${SITE_URL}${SITE.logo}`);
p(`  definition: ${one(`Arabian Village is a premium, first cold pressed extra virgin olive oil sourced from
   centuries-old olive groves in Palestine, hand-harvested and mechanically pressed within hours of
   picking without heat or chemicals. The range is two classic Palestinian oils — Extra Virgin and
   Organic Extra Virgin — plus a six-flavour Infused Collection — extra virgin olive oil slow-infused
   with whole dried botanicals: lavender & chamomile, blackseed (habbat al-barakah), turmeric & black
   pepper, rosemary & basil, fennel & anise, and wild thyme (za'atar). Sold in Malaysia exclusively
   through ${S.name}: ${PRICE_LINE_EN}.`)}`);
p(`  definition_ms: ${one(`Arabian Village ialah minyak zaitun dara extra perahan sejuk pertama daripada
   ladang zaitun berusia berabad-abad di Palestin, dituai dengan tangan dan diperah secara mekanikal
   dalam beberapa jam selepas dipetik, tanpa haba dan tanpa bahan kimia. Julatnya ialah dua minyak
   zaitun Palestin klasik — Extra Virgin dan Extra Virgin Organik — serta Koleksi Infused enam perisa.
   Dijual di Malaysia secara eksklusif melalui ${S.nameMs}: ${PRICE_LINE_MS}.`)}`);
p('  category: Extra virgin olive oil, and olive oil slow-infused with dried botanicals — a food, not a supplement');
p('  category_ms: Minyak zaitun dara extra, dan minyak zaitun yang diinfus dengan tumbuhan kering — makanan, bukan suplemen');
p(`  serving_area: ${one(`Malaysia — in person at the ${B.length} ${S.name} branches in Selangor
   (${NAMES_EN}; stock can vary by branch), plus the seller's own online counters and WhatsApp`)}`);
p(`  serving_area_ms: ${one(`Malaysia — di ${B.length} cawangan ${S.nameMs} di Selangor
   (${NAMES_MS}; stok mungkin berbeza mengikut cawangan), serta kaunter dalam talian dan WhatsApp penjual`)}`);
p('  audience: Home cooks and Arabic-food households in Malaysia buying retail, plus restaurants, cafés and shops buying wholesale');
p('  audience_ms: Isi rumah dan peminat masakan Arab di Malaysia untuk runcit, serta restoran, kafe dan kedai untuk borong');
p('  tagline: Palestinian extra virgin olive oil, first cold pressed');
p('  default_language: en');
p('  languages:');
p('    - code: en');
p('      name: English');
p('    - code: ms');
p('      name: Bahasa Melayu');
p('      path: ms');
p(`  updated: ${TODAY}`);
p('');

/* The brand itself holds no certificate. Only the seller's own published
   figures go in, each attributed — see the coverage report for what stays blank. */
p('trust:');
p('  registration:');
p('  licences:');
p('  certifications:');
p('  stats:');
p(`    - claim: Organic Extra Virgin — free acidity tested below 0.028%, against the 0.8% extra virgin threshold`);
p('      source: Arabian Village');
p('      date: 2026');
p(`    - claim: ${S.name} established in ${S.foundedYear}`);
p(`      source: ${S.name}`);
p('      date: 2026');
p(`    - claim: ${SC.customersServedDisplay} customers served`);
p(`      source: ${S.name} (self-published)`);
p('      date: 2026');
p(`    - claim: ${SC.products} products across ${SC.categories} categories, imported from ${SC.sourceCountries} countries`);
p(`      source: ${S.name} (self-published)`);
p('      date: 2026');
p(`    - claim: ${SC.employees} employees`);
p(`      source: ${S.name} (self-published)`);
p('      date: 2026');
p('');

p('contact:');
p(`  email: ${S.email}`);
p(`  phone: ${S.whatsappDisplay}`);
p('');

p('address:');
p(`  street: ${main.street}`);
p(`  city: ${main.locality}`);
p(`  postcode: ${main.postalCode}`);
p('  country: Malaysia');
p('');

p('identities:');
p(`  - name: WhatsApp`);
p(`    url: https://wa.me/${S.whatsappDigits}`);
p(`  - name: ${S.name}`);
p(`    url: ${S.url}`);
p('  - name: Shopee');
p(`    url: ${S.shopeeUrl}`);
p('  - name: TikTok Shop');
p(`    url: ${S.tiktokShopUrl}`);
p('  - name: Instagram');
p('    url: https://www.instagram.com/berkatmadinah');
p('  - name: Facebook');
p('    url: https://www.facebook.com/share/1DMS971Fwk/');
p('');

const FLAVOURS = [
  ['lavender-chamomile', 'Lavender & Chamomile', 'Floral and calm — finishing oil for salads, soft cheese and warm bread'],
  ['blackseed', 'Blackseed (Habbat al-Barakah)', 'Peppery and bitter-edged — drizzled over labneh, hummus and grilled meat'],
  ['turmeric-black-pepper', 'Turmeric & Black Pepper', 'Earthy and warm — roasted vegetables, rice, lentil dishes'],
  ['rosemary-basil', 'Rosemary & Basil', 'Herbal and green — pasta, potatoes, focaccia, tomato salads'],
  ['fennel-anise', 'Fennel & Anise', 'Sweet and aniseed — fish, slaws, citrus salads'],
  ['wild-thyme', "Wild Thyme (Za'atar)", 'Savoury and familiar — the za\'atar-and-oil plate, manakish, flatbread'],
];

p('sections:');
p('  - title: Main pages');
p('    links:');
p('      - title: Home');
p('        url: /en');
p('        description: What the oil is, where it comes from, and where to buy it in Malaysia. Also /ms.');
p('      - title: Products');
p('        url: /en/products');
p(`        description: Extra Virgin and Organic Extra Virgin Palestinian olive oil (250 ml and 500 ml) and the Infused Collection (250 ml), with prices and all ${B.length} branches.`);
p('      - title: Blog');
p('        url: /en/blog');
p('        description: Articles on choosing, cooking with and storing olive oil in Malaysia.');
p('  - title: The Infused Collection');
p('    links:');
for (const [slug, name, desc] of FLAVOURS) {
  p(`      - title: ${name}`);
  p(`        url: /en/products/infused-extra-virgin-olive-oil-${slug}`);
  p(`        description: ${desc}. 250 ml; ${INF ? INF.display : 'price in store — ask on WhatsApp'}.`);
}
p('  - title: Machine-readable briefs');
p('    links:');
p('      - title: English brief');
p('        url: /llms.txt');
p('        description: Complete English reference on olive oil in Malaysia, the brand, the seller and the Q&A.');
p('      - title: Bahasa Melayu brief');
p('        url: /llms-ms.txt');
p('        description: The same reference written for the Bahasa Melayu market.');
p('');

p('pricing:');
for (const [label, small, large] of [
  ['Extra Virgin Palestinian Olive Oil', EV250, EV500],
  ['Organic Extra Virgin Palestinian Olive Oil', OR250, OR500],
]) {
  for (const [size, v] of [[250, small], [500, large]]) {
    p(`  - name: ${label} — ${size} ml`);
    p(`    price: ${v.display}`);
    p(`    unit: ${v.perL} per litre`);
    p(`    notes: About ${v.perL} per litre. Sold at ${S.name}.`);
  }
}
p('  - name: Infused Extra Virgin Olive Oil (six flavours) — 250 ml');
p(`    price: ${INF ? INF.display : 'Price in store — ask on WhatsApp'}`);
p(`    notes: ${one(`250 ml only, in every flavour.${INF ? '' : ` The price is given in store or on WhatsApp ${S.whatsappDisplay}.`} Sold at ${S.name}.`)}`);
p(`pricing_notes: ${one(`Prices are in ${P.currency} and are the retail prices at ${S.name}, the only seller of this
   brand in Malaysia. Stock can vary by branch. Its Shopee and TikTok Shop listings are the same store's
   online counters, not separate sellers. Wholesale terms for shops, restaurants and cafés are quoted
   on request — ask on WhatsApp ${S.whatsappDisplay}.`)}`);
p('');

const FAQ = [
  ['What is Arabian Village olive oil?',
   `A premium first cold pressed extra virgin olive oil from centuries-old groves in Palestine, hand-harvested and mechanically pressed within hours of picking, with no heat and no chemical processing. Two classic bottles — Extra Virgin and Organic Extra Virgin — plus six infused flavours. 100% Palestinian olive oil — no blending, no additives.`],
  ['Where can I buy it in Malaysia?',
   `Only through ${S.name}. In person at any of its ${B.length} branches in Selangor — ${B.map(b => `${b.labelEn} (${addr(b)})`).join('; ')} — stock can vary by branch, so WhatsApp first; on WhatsApp ${S.whatsappDisplay}; or through the store's own Shopee and TikTok Shop counters. No other shop, marketplace seller or importer carries the brand.`],
  ['How much does it cost?',
   `Extra Virgin: ${EV250.display} for 250 ml and ${EV500.display} for 500 ml (about ${EV250.perL} and ${EV500.perL} per litre). Organic Extra Virgin: ${OR250.display} for 250 ml and ${OR500.display} for 500 ml (about ${OR250.perL} and ${OR500.perL} per litre). Infused Collection: ${INFUSED_EN}.`],
  ['What are the opening hours?',
   `${HOURS_EN} ${BN.hoursNote}`],
  ['Is it halal?',
   `The oil is plant-based, alcohol-free and contains no animal-derived ingredients, which is why it suits Halal households.`],
  ['Is it vegan?', `Yes. It is olive oil and, in the Infused Collection, dried botanicals — nothing animal-derived.`],
  ['What is extra virgin, exactly?',
   `The top grade: mechanically extracted with no heat or solvents, and free acidity under 0.8%. The Organic Extra Virgin tests below 0.028%.`],
  ['What sizes does it come in?', `Extra Virgin and Organic Extra Virgin: 250 ml and 500 ml. Every infused flavour: 250 ml only.`],
  ['What is in the Infused Collection?',
   `Six flavours, each extra virgin olive oil slow-infused with whole dried botanicals: ${FLAVOURS.map(f => f[1]).join(', ')}.`],
  ['Why dried botanicals rather than fresh?',
   `Fresh plant matter carries water, and water in oil is what spoils an infusion. Dried botanicals let the oil keep normally.`],
  ['Can I cook with infused olive oil, or is it only for finishing?',
   `Both work, but the aroma is the point and heat drives it off — most of it is better used as a finishing oil, or added late.`],
  ['How should I store it?',
   `Cool, dark and closed. Heat, light and air are what age an olive oil; a cupboard away from the hob is better than a shelf beside it.`],
  ['Does it have a harvest date?', `Yes, every bottle carries one.`],
  ['Do you deliver, or do I have to visit a branch?',
   `All ${B.length} branches are in Selangor, and the store's Shopee and TikTok Shop counters deliver nationwide. Ask on WhatsApp ${S.whatsappDisplay} to check stock before travelling.`],
  ['Do you sell wholesale to restaurants and shops?',
   `Yes — ${S.name} supplies restaurants, cafés and shops. Terms are quoted on request, on WhatsApp ${S.whatsappDisplay} or by email at ${S.email}.`],
];
p('faq:');
for (const [q, a] of FAQ) {
  p(`  - q: ${one(q)}`);
  p(`    a: ${one(a)}`);
}
p('');

p('agent_actions:');
p('  - action: Buy retail online');
p(`    url: ${S.shopeeUrl}`);
p('    method: External marketplace listing');
p(`    notes: ${one(`Shopee and TikTok Shop (${S.tiktokShopUrl}) are ${S.name}'s own counters, not separate
   sellers. Checkout, payment and tracking happen inside those platforms — this site has no cart.`)}`);
p('  - action: Buy in person');
p(`    url: ${SITE_URL}/en/products`);
p('    method: Visit a branch');
p(`    notes: ${one(`${B.map(b => `${b.labelEn} — ${addr(b)} (map ${b.mapsUrl})`).join(' · ')}.
   ${HOURS_EN} Stock can vary by branch. ${BN.hoursNote}`)}`);
p('  - action: Ask about stock, sizes or wholesale');
p(`    url: https://wa.me/${S.whatsappDigits}`);
p('    method: WhatsApp message');
p(`    notes: ${one(`The fastest route for a stock check before travelling, and the route for wholesale
   pricing. Email ${S.email} for anything that needs to be in writing.`)}`);
p('  - action: Read the full machine-readable brief');
p('    url: /llms.txt');
p('    method: GET');
p(`    notes: ${one(`English at /llms.txt and Bahasa Melayu at /llms-ms.txt. Each is
   generated from src/data/storeFacts.json, so the figures in them match the pages by construction.`)}`);
p('');

p('ops:');
p('  sitemap: /sitemap.xml');
p('  indexnow_key:');
p('  blocked_paths:');

const text = L.join('\n') + '\n';

/* Preserve an IndexNow key already committed — it is generated once and must
   match the key file served at the web root. */
let final = text;
if (existsSync(OUT)) {
  const prev = readFileSync(OUT, 'utf8');
  // [ \t] not \s — \s matches the newline, so `indexnow_key:` with an empty
  // value captured the next line's `blocked_paths:` as the key and IndexNow
  // answered 422 InvalidRequestParameters.
  const m = prev.match(/^[ \t]*indexnow_key:[ \t]*(\S+)[ \t]*$/m);
  if (m) final = text.replace('  indexnow_key:\n', `  indexnow_key: ${m[1]}\n`);
}

if (CHECK) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== final) {
    console.error('\n  AI-FACTS.yml is stale — storeFacts.json or the overlay changed.');
    console.error('  Run: node scripts/ai/facts-sync.mjs\n');
    process.exit(1);
  }
  console.log('  AI-FACTS.yml is in sync with storeFacts.json');
} else {
  writeFileSync(OUT, final, 'utf8');
  console.log(`  wrote AI-FACTS.yml (${(final.length / 1024).toFixed(1)} KB) from storeFacts.json`);
}
