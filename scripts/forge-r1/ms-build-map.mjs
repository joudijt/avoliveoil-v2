// FORGE PRODUCTS-R1 B6 step 2: build docs/forge/r1-article-map.ms.json.
// Every number below is derived from src/data/storeFacts.json through
// scripts/lib/price-math.mjs — none is typed by hand. Each entry is a whole
// natural sentence (or a whole short field) keyed by article id + field path.
// Re-run after a price change (e.g. owner switches the default to Organic):
// edit DEFAULT_KEY, run this, then ms-apply against a fresh ms.ts.
// Usage: node scripts/forge-r1/ms-build-map.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { perLitre, senPerMl } from '../lib/price-math.mjs';
import { ROOT, MAP, loadMs, strings } from './ms-lib.mjs';

const facts = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf-8'));
const P = facts.prices.products;
const DEFAULT_KEY = 'extra-virgin'; // ⏳ Q1: unnamed "Arabian Village oil" = Extra Virgin
const amt = (k, s) => Number(P[k][`ml${s}`].amount);
const rm2 = (n) => `RM${Number(n).toFixed(2)}`; // article house style "RM59.00"
const D250 = amt(DEFAULT_KEY, 250), D500 = amt(DEFAULT_KEY, 500);
const O250 = amt('organic', 250), O500 = amt('organic', 500);
const L250 = perLitre(D250, 250), L500 = perLitre(D500, 500);
const LO250 = perLitre(O250, 250), LO500 = perLitre(O500, 500);
const GAP_L = L250 - L500; // per-litre gap
const TWO250 = D250 * 2;
const GAP_TWO = TWO250 - D500;
const PER_ML_500 = (D500 / 500).toFixed(3); // "0.218"
// sanity against O-31
const expect = { L250: 236, L500: 218, LO250: 276, LO500: 258, GAP_L: 18, TWO250: 118, GAP_TWO: 9 };
for (const [k, v] of Object.entries(expect)) if (eval(k) !== v) throw new Error(`price-math drift: ${k}=${eval(k)} expected ${v}`);
if (senPerMl(D500, 500) !== 21.8 || Math.round(senPerMl(D250, 250)) !== 24) throw new Error('sen/ml drift');

const NAME_DEFAULT = DEFAULT_KEY === 'organic' ? 'Minyak Zaitun Extra Virgin Organik Palestin' : 'Minyak Zaitun Extra Virgin Palestin';
const E250 = rm2(D250), E500 = rm2(D500), OR250 = rm2(O250), OR500 = rm2(O500);

// Branches (labelMs from storeFacts, order as stored)
const B = facts.branches;
const lab = (id) => B.find((b) => b.id === id).labelMs;
const withHours = B.filter((b) => b.hours).map((b) => b.labelMs); // Ampang, Sri Gombak
const noHours = B.filter((b) => !b.hours).map((b) => b.labelMs);
const join_ = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} dan ${xs.at(-1)}`);
const N = B.length; // 5
const NUM = { 5: 'lima' }[N];
if (!NUM) throw new Error('branch count changed — rewrite the Malay number word');
const NAMES = join_(B.map((b) => b.labelMs)); // "Ampang, Kajang, Shah Alam, Cash & Carry (Ampang) dan Sri Gombak"
const NAMES_P = join_(B.map((b) => (b.id === 'cash-and-carry' ? 'Cash & Carry di Ampang' : b.labelMs))); // for use inside ( )
const HRS = join_(withHours); // "Ampang dan Sri Gombak"
const NOHRS = join_(noHours); // "Kajang, Shah Alam dan Cash & Carry (Ampang)"
const OPEN = '8:00 pagi hingga 12:00 tengah malam';
const addr = (id) => { const b = B.find((x) => x.id === id); return `${b.street}, ${b.postalCode} ${b.locality}, ${b.region === 'Selangor' ? 'Selangor' : b.region}`; };
const Num = NUM[0].toUpperCase() + NUM.slice(1);
const INF = 'hanya dalam botol 250 ml, dengan harga di kedai';

const E = []; // [id, path, old, new]
const add = (id, path, old, nu) => E.push({ id, path, old, new: nu });

// ---------------- beli-minyak-zaitun-kl ----------------
add('beli-minyak-zaitun-kl', 'keyTakeaway',
  'Arabian Village dijual melalui Berkat Madinah Store — cawangan Ampang Jaya dan Batu Caves, buka 8:00 pagi hingga 12:00 tengah malam setiap hari, serta kaunter Shopee dan TikTok Shop mereka sendiri.',
  `Arabian Village dijual melalui Berkat Madinah Store — ${NUM} cawangan di Selangor (${NAMES_P}), serta kaunter Shopee dan TikTok Shop mereka sendiri. Cawangan ${HRS} buka ${OPEN} setiap hari.`);
add('beli-minyak-zaitun-kl', 'sections[4].blocks[0].text',
  'Ada dua cawangan, Ampang Jaya dan Batu Caves, dan Batu Caves ialah yang lebih besar. Waktu operasi kedua-duanya 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad.',
  `Kini ada ${NUM} cawangan di Selangor: ${NAMES}. Cawangan ${HRS} buka ${OPEN}, Isnin hingga Ahad; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka. Stok boleh berbeza ikut cawangan.`);
add('beli-minyak-zaitun-kl', 'sections[5].blocks[1].rows[0][0]', 'Cawangan Ampang Jaya', `Cawangan ${HRS}`);
add('beli-minyak-zaitun-kl', 'sections[5].blocks[1].rows[0][1]', 'KL timur', 'KL timur dan utara');
add('beli-minyak-zaitun-kl', 'sections[5].blocks[1].rows[1][0]', 'Cawangan Batu Caves', `Cawangan ${NOHRS}`);
add('beli-minyak-zaitun-kl', 'sections[5].blocks[1].rows[1][1]', 'Pilihan terluas', 'Lebih banyak lokasi di Selangor');
add('beli-minyak-zaitun-kl', 'sections[5].blocks[1].rows[1][2]', 'Cawangan lebih besar', 'WhatsApp untuk sahkan waktu buka');
add('beli-minyak-zaitun-kl', 'sections[6].blocks[0].text',
  'Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga mengikut saiz itu sama untuk minyak klasik dan untuk setiap perisa Infused Collection.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml; versi Organik pula ${OR250} dan ${OR500}. Setiap perisa Infused Collection ${INF}.`);
add('beli-minyak-zaitun-kl', 'faqs[0].a',
  'Untuk Arabian Village, dua kaunter fizikalnya ialah Berkat Madinah Store cawangan Ampang Jaya dan cawangan Batu Caves, dan Batu Caves ialah yang lebih besar. Kedua-duanya buka 8:00 pagi hingga 12:00 tengah malam setiap hari.',
  `Untuk Arabian Village, kaunter fizikalnya ialah ${NUM} cawangan Berkat Madinah Store di Selangor: ${NAMES}. Cawangan ${HRS} buka ${OPEN} setiap hari; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka.`);
add('beli-minyak-zaitun-kl', 'faqs[1].a',
  '8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad, di kedua-dua cawangan.',
  `Cawangan ${HRS} buka ${OPEN}, Isnin hingga Ahad. Untuk ${NOHRS}, sahkan waktu buka melalui WhatsApp.`);
add('beli-minyak-zaitun-kl', 'faqs[3].a',
  'RM59.00 untuk botol 250 ml dan RM103.00 untuk botol 500 ml. Harga mengikut saiz itu sama untuk minyak klasik dan untuk setiap perisa dalam Infused Collection, jadi anda memilih perisa mengikut cara anda memasak, bukan mengikut bajet yang tinggal.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml. Versi Organik berharga ${OR250} (250 ml) dan ${OR500} (500 ml). Enam perisa Infused Collection ${INF}.`);

// ---------------- harga-minyak-zaitun-malaysia ----------------
const H = 'harga-minyak-zaitun-malaysia';
add(H, 'metaDescription', 'RM59.00 bagi 250 ml, RM103.00 bagi 500 ml.', `${E250} bagi 250 ml, ${E500} bagi 500 ml.`);
add(H, 'keyTakeaway',
  'Arabian Village berharga RM59.00 bagi botol 250 ml dan RM103.00 bagi botol 500 ml. Tukar kepada seliter dan angkanya jadi RM236.00 berbanding RM206.00 — botol 500 ml RM30.00 lebih murah bagi jumlah minyak yang sama.',
  `${NAME_DEFAULT} Arabian Village berharga ${E250} bagi botol 250 ml dan ${E500} bagi botol 500 ml. Tukar kepada seliter dan angkanya jadi ${rm2(L250)} berbanding ${rm2(L500)} — botol 500 ml ${rm2(GAP_L)} lebih murah bagi setiap liter minyak yang sama.`);
add(H, 'intro[0]', 'RM59.00 dan RM103.00 tak boleh dibanding', `${E250} dan ${E500} tak boleh dibanding`);
add(H, 'sections[0].blocks[0].text',
  'Minyak zaitun dara extra virgin sejuk perah Arabian Village berharga **RM59.00** bagi botol 250 ml dan **RM103.00** bagi botol 500 ml di Malaysia. Harga itu sama untuk minyak klasik dan untuk setiap perisa dalam Infused Collection — memilih perisa tidak menaikkan harga botol anda.',
  `Minyak zaitun dara extra virgin sejuk perah Arabian Village berharga **${E250}** bagi botol 250 ml dan **${E500}** bagi botol 500 ml di Malaysia. Versi organiknya berharga **${OR250}** (250 ml) dan **${OR500}** (500 ml), iaitu ${rm2(LO250)} dan ${rm2(LO500)} seliter. Enam perisa Infused Collection pula hanya dijual dalam botol 250 ml, dengan harga di kedai.`);
add(H, 'sections[0].blocks[1].rows[1][1]', 'RM103.00', E500);
add(H, 'sections[0].blocks[1].rows[1][2]', 'RM206.00', rm2(L500));
add(H, 'sections[2].blocks[0].text', 'Botol 500 ml pada RM103.00 menjadi RM206.00 seliter.', `Botol 500 ml pada ${E500} menjadi ${rm2(L500)} seliter.`);
add(H, 'sections[2].blocks[1].items[0]', 'Ambil harga botol: RM103.00.', `Ambil harga botol: ${E500}.`);
add(H, 'sections[2].blocks[1].items[1]', 'Bahagi dengan mililiter: RM103.00 ÷ 500 = RM0.206.', `Bahagi dengan mililiter: ${E500} ÷ 500 = RM${PER_ML_500}.`);
add(H, 'sections[2].blocks[1].items[2]', 'Darab dengan 1,000: RM206.00 seliter.', `Darab dengan 1,000: ${rm2(L500)} seliter.`);
add(H, 'sections[3].blocks[0].text',
  'Botol 500 ml, dan bezanya bukan kecil. Seliter, ia RM206.00 berbanding RM236.00 — anda jimat RM30.00 bagi setiap liter minyak yang sama. Beli dua botol 250 ml pula memberi 500 ml pada RM118.00, iaitu RM15.00 lebih mahal daripada satu botol 500 ml yang berharga RM103.00.',
  `Botol 500 ml, walaupun bezanya sederhana. Seliter, ia ${rm2(L500)} berbanding ${rm2(L250)} — anda jimat ${rm2(GAP_L)} bagi setiap liter minyak yang sama. Beli dua botol 250 ml pula memberi 500 ml pada ${rm2(TWO250)}, iaitu ${rm2(GAP_TWO)} lebih mahal daripada satu botol 500 ml yang berharga ${E500}.`);
add(H, 'sections[5].blocks[0].text',
  'Beli di kaunter mereka di **Ampang Jaya** dan **Batu Caves** — Batu Caves lebih besar — atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Waktu buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad.',
  `Beli di mana-mana daripada ${NUM} cawangan mereka di Selangor — ${B.map((b) => `**${b.labelMs}**`).slice(0, -1).join(', ')} dan **${B.at(-1).labelMs}** — atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Cawangan ${HRS} buka ${OPEN}, Isnin hingga Ahad; stok boleh berbeza ikut cawangan, jadi WhatsApp dahulu.`);
add(H, 'conclusion.blocks[0].text', 'RM103.00 bagi 500 ml ialah RM206.00 seliter.', `${E500} bagi 500 ml ialah ${rm2(L500)} seliter.`);
add(H, 'faqs[0].a',
  'Harga sama dikenakan untuk minyak klasik dan setiap perisa Infused Collection, jadi memilih perisa tidak mengubah apa yang anda bayar bagi saiz botol itu.',
  `Versi organik 250 ml pula berharga ${OR250}, manakala perisa Infused Collection juga datang dalam botol 250 ml, dengan harga di kedai.`);
add(H, 'faqs[1].a',
  'Botol 500 ml berharga RM103.00, iaitu RM206.00 seliter. Berbanding botol 250 ml yang menjadi RM236.00 seliter, anda jimat RM30.00 bagi setiap liter. Dua botol 250 ml memberi jumlah minyak yang sama tetapi berharga RM118.00, jadi satu botol 500 ml RM15.00 lebih murah.',
  `Botol 500 ml Extra Virgin berharga ${E500}, iaitu ${rm2(L500)} seliter. Berbanding botol 250 ml yang menjadi ${rm2(L250)} seliter, anda jimat ${rm2(GAP_L)} bagi setiap liter. Dua botol 250 ml memberi jumlah minyak yang sama tetapi berharga ${rm2(TWO250)}, jadi satu botol 500 ml ${rm2(GAP_TWO)} lebih murah. Botol organik 500 ml berharga ${OR500}.`);
add(H, 'faqs[2].a', 'botol 500 ml menjadi RM206.00 seliter.', `botol 500 ml menjadi ${rm2(L500)} seliter.`);
add(H, 'faqs[4].a',
  'Tidak. Setiap perisa dalam Infused Collection — lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise dan wild-thyme — berharga sama dengan minyak klasik pada saiz yang sama: RM59.00 bagi 250 ml dan RM103.00 bagi 500 ml.',
  'Harganya belum disenaraikan dalam talian. Setiap perisa dalam Infused Collection — lavender-chamomile, blackseed, turmeric-black-pepper, rosemary-basil, fennel-anise dan wild-thyme — dijual dalam botol 250 ml sahaja, dan harganya boleh ditanya di kedai atau melalui WhatsApp.');
add(H, 'faqs[5].a',
  'Beli di kaunter cawangan Ampang Jaya atau Batu Caves, atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Waktu buka 8:00 pagi hingga 12:00 tengah malam setiap hari; hari perayaan boleh berbeza.',
  `Beli di mana-mana daripada ${NUM} cawangannya di Selangor (${NAMES_P}), atau melalui storefront Shopee dan TikTok Shop mereka sendiri. Cawangan ${HRS} buka ${OPEN} setiap hari; hari perayaan boleh berbeza.`);
add(H, 'related[1].description', 'Kaunter Ampang Jaya dan Batu Caves, serta Shopee dan TikTok Shop Berkat Madinah.', `${Num} cawangan di Selangor, serta Shopee dan TikTok Shop Berkat Madinah.`);

// ---------------- jenama-minyak-zaitun-terbaik ----------------
const J = 'jenama-minyak-zaitun-terbaik';
add(J, 'sections[5].blocks[1].rows[1][1]', 'RM103.00', E500);
add(J, 'sections[5].blocks[1].rows[1][2]', 'RM206.00', rm2(L500));
add(J, 'faqs[4].a',
  'Bagi Arabian Village, tidak. Harga ditetapkan mengikut saiz — RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml — dan harga itu sama untuk minyak klasik mahupun mana-mana perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme). Anda boleh menyemak dasar harga jenama lain dengan cara yang sama.',
  `Bagi Arabian Village, harga perisa seperti [wild thyme](/products/infused-extra-virgin-olive-oil-wild-thyme) belum disenaraikan dalam talian — ia dijual dalam botol 250 ml sahaja, dengan harga di kedai. Minyak extra virgin klasik pula ${E250} untuk 250 ml dan ${E500} untuk 500 ml. Untuk jenama lain, semak harga seliter dengan cara yang sama.`);
add(J, 'faqs[5].a',
  'Arabian Village diedar di Malaysia oleh Berkat Madinah Store, yang mempunyai dua cawangan: Ampang Jaya dan Batu Caves, dengan Batu Caves lebih besar. Waktu buka 8:00 pagi hingga 12:00 tengah malam setiap hari.',
  `Arabian Village diedar di Malaysia oleh Berkat Madinah Store, yang mempunyai ${NUM} cawangan di Selangor: ${NAMES}. Cawangan ${HRS} buka ${OPEN} setiap hari, dan stok boleh berbeza ikut cawangan.`);

// ---------------- minyak-zaitun-extra-virgin-gred ----------------
const G = 'minyak-zaitun-extra-virgin-gred';
add(G, 'sections[4].blocks[1].text',
  '250 ml berharga **RM59.00** dan 500 ml **RM103.00** — botol besar lebih murah seliter. Harga sama mengikut saiz terpakai untuk setiap perisa Koleksi Infused.',
  `250 ml berharga **${E250}** dan 500 ml **${E500}** — botol besar lebih murah seliter. Perisa Koleksi Infused pula ${INF}.`);
add(G, 'faqs[4].a',
  'Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga itu sama mengikut saiz untuk minyak klasik dan untuk setiap perisa dalam Koleksi Infused.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml. Versi Organik berharga ${OR250} dan ${OR500}, manakala perisa Koleksi Infused ${INF}.`);
add(G, 'faqs[5].a',
  'mempunyai dua cawangan — Ampang Jaya dan Batu Caves, dengan Batu Caves yang lebih besar. Waktu buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad.',
  `mempunyai ${NUM} cawangan di Selangor — ${NAMES}. Cawangan ${HRS} buka ${OPEN}, Isnin hingga Ahad.`);

// ---------------- minyak-zaitun-halal ----------------
const HL = 'minyak-zaitun-halal';
add(HL, 'sections[5].blocks[3].text', 'dengan cawangan di Ampang Jaya dan Batu Caves — tanya', `dengan ${NUM} cawangan di Selangor (${NAMES_P}) — tanya`);
add(HL, 'faqs[5].a',
  'Berkat Madinah Store mempunyai dua cawangan, iaitu di Ampang Jaya dan di Batu Caves, dan cawangan Batu Caves adalah yang lebih besar. Kedua-duanya buka dari 8:00 pagi hingga 12:00 tengah malam setiap hari, kecuali hari perayaan yang mungkin berbeza.',
  `Berkat Madinah Store mempunyai ${NUM} cawangan di Selangor: ${NAMES}. Cawangan ${HRS} buka dari ${OPEN} setiap hari, kecuali hari perayaan yang mungkin berbeza; untuk cawangan lain, WhatsApp dahulu untuk sahkan waktu buka.`);
add(HL, 'related[0].description',
  'Minyak zaitun dara klasik dan siri Infused Collection, RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml.',
  `Minyak zaitun dara klasik pada ${E250} (250 ml) dan ${E500} (500 ml), serta siri Infused Collection dalam botol 250 ml.`);
add(HL, 'related[3].description',
  'WhatsApp, dua cawangan dan waktu buka Berkat Madinah Store untuk sebarang soalan bahan atau dokumen.',
  `WhatsApp, ${NUM} cawangan dan waktu buka Berkat Madinah Store untuk sebarang soalan bahan atau dokumen.`);

// ---------------- minyak-zaitun-organik ----------------
const OG = 'minyak-zaitun-organik';
add(OG, 'sections[5].blocks[1].text', 'botol 500 ml pada **RM103.00** bersamaan RM206 seliter.', `botol 500 ml pada **${E500}** bersamaan RM${L500} seliter.`);
add(OG, 'faqs[5].a',
  'Anda juga boleh tanya di kaunter Ampang Jaya atau Batu Caves, yang dibuka 8:00 pagi hingga 12:00 tengah malam.',
  `Anda juga boleh tanya di ${NUM} cawangan Berkat Madinah Store di Selangor (${NAMES_P}); cawangan ${HRS} dibuka ${OPEN}.`);
add(OG, 'related[3].description',
  'Kaunter Berkat Madinah Store di Ampang Jaya dan Batu Caves, serta saluran dalam talian rasminya.',
  `${Num} cawangan Berkat Madinah Store di Selangor, serta saluran dalam talian rasminya.`);

// ---------------- minyak-zaitun-palestin ----------------
const PL = 'minyak-zaitun-palestin';
add(PL, 'sections[5].blocks[0].text',
  'Ia dijual di dua cawangan kedai itu, di Ampang Jaya dan di Batu Caves, dan cawangan Batu Caves ialah yang lebih besar. Kedai dibuka dari 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad.',
  `Ia dijual di ${NUM} cawangan kedai itu di Selangor: ${NAMES}. Cawangan ${HRS} dibuka dari ${OPEN}, Isnin hingga Ahad, dan stok boleh berbeza ikut cawangan.`);
add(PL, 'sections[5].blocks[1].text',
  'Harganya RM59.00 untuk botol 250 ml dan RM103.00 untuk 500 ml, sama harga mengikut saiz untuk minyak klasik mahupun mana-mana perisa dalam [koleksi infused](/products).',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk 500 ml, dan versi Organik ${OR250} dan ${OR500}. Perisa dalam [koleksi infused](/products) ${INF}.`);
add(PL, 'faqs[4].a',
  'Botol 250 ml berharga RM59.00 dan botol 500 ml berharga RM103.00. Harga sama mengikut saiz untuk minyak klasik dan untuk setiap perisa dalam koleksi infused.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml; versi Organik ${OR250} dan ${OR500}. Perisa dalam koleksi infused ${INF}.`);
add(PL, 'related[2].description',
  'Kaunter di Ampang Jaya dan Batu Caves, serta Shopee dan TikTok Shop milik Berkat Madinah.',
  `${Num} cawangan di Selangor, serta Shopee dan TikTok Shop milik Berkat Madinah.`);

// ---------------- minyak-zaitun-untuk-masak ----------------
const MK = 'minyak-zaitun-untuk-masak';
add(MK, 'sections[4].blocks[1].text', 'pada RM59.00 (250 ml) dan RM103.00 (500 ml).', `pada ${E250} (250 ml) dan ${E500} (500 ml).`);
add(MK, 'faqs[4].a',
  'RM59.00 untuk botol 250 ml dan RM103.00 untuk botol 500 ml. Harga sama mengikut saiz untuk minyak klasik dan untuk setiap perisa Infused Collection, jadi pilihan perisa tidak mengubah kos.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml; versi Organik ${OR250} dan ${OR500}. Perisa Infused Collection ${INF}.`);
add(MK, 'faqs[5].a',
  'Di dua cawangan Berkat Madinah Store — Ampang Jaya dan Batu Caves, yang lebih besar — dari 8:00 pagi hingga 12:00 tengah malam setiap hari.',
  `Di ${NUM} cawangan Berkat Madinah Store di Selangor — ${NAMES}. Cawangan ${HRS} buka ${OPEN} setiap hari.`);

// ---------------- minyak-zaitun-habbatus-sauda ----------------
const HS = 'minyak-zaitun-habbatus-sauda';
add(HS, 'metaDescription', 'bacaan bahan, harga RM59 dan RM103.', 'bacaan bahan, saiz 250 ml dan tempat membelinya.');
add(HS, 'sections[5].blocks[0].text',
  'Harganya sama seperti setiap botol lain dalam Infused Collection: RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml. Ditukar kepada seliter, itu RM236 berbanding RM206. Botol besar lebih jimat setiap mililiter, dan perbandingan seliter itulah cara paling jujur menilai dua botol yang berlainan saiz.',
  'Seperti setiap perisa dalam Infused Collection, minyak ini dijual dalam botol 250 ml sahaja, dan harganya boleh ditanya terus di kedai atau melalui WhatsApp. Untuk membanding dengan botol lain, tukar harga kepada seliter: harga botol dibahagi 250, kemudian darab 1,000 — itulah cara paling jujur menilai dua botol yang berlainan saiz.');
add(HS, 'sections[5].blocks[3].items[0]',
  'Berkat Madinah Store ialah pengedar rasmi dan satu-satunya di Malaysia, dengan dua cawangan yang menyimpan jenama ini.',
  `Berkat Madinah Store ialah pengedar rasmi dan satu-satunya di Malaysia, dengan ${NUM} cawangan di Selangor: ${NAMES}. Stok boleh berbeza ikut cawangan.`);
add(HS, 'sections[5].blocks[3].items[1]',
  'Ampang Jaya: Putra Sulaiman, 17-L1, Persiaran Putra Sulaiman, Taman Putra Sulaiman, 68000 Ampang Jaya, Selangor.',
  `${lab('ampang')}: ${addr('ampang')}.`);
add(HS, 'sections[5].blocks[3].items[2]',
  'Batu Caves, cawangan lebih besar: 32, Jalan Prima SG 2, Prima Seri Gombak, 68100 Batu Caves, Selangor.',
  `${lab('sri-gombak')}: ${addr('sri-gombak')}.`);
add(HS, 'sections[5].blocks[3].items[3]',
  'Buka 8:00 pagi hingga 12:00 tengah malam setiap hari.',
  `Cawangan ${HRS} buka ${OPEN} setiap hari; alamat cawangan lain ada di [halaman tempat membeli](/shop).`);
add(HS, 'faqs[4].a',
  'RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml. Kalau ini kali pertama anda mencuba minyak berperisa, mulakan dengan 250 ml sebelum ambil botol besar.',
  'Ia dijual dalam botol 250 ml sahaja, dan harganya ada di kedai — tanya di cawangan atau melalui WhatsApp di +60 11-1111 9912. Saiz 250 ml itu juga sesuai untuk kali pertama anda mencuba minyak berperisa.');
add(HS, 'faqs[7].a',
  'Di dua cawangan Berkat Madinah Store, di Ampang Jaya dan Batu Caves, serta melalui Shopee dan TikTok Shop yang dikendalikan kedai yang sama.',
  `Di ${NUM} cawangan Berkat Madinah Store di Selangor (${NAMES_P}), serta melalui Shopee dan TikTok Shop yang dikendalikan kedai yang sama. Stok boleh berbeza ikut cawangan, jadi WhatsApp dahulu.`);
add(HS, 'related[0].description',
  'Halaman produk penuh: senarai bahan, saiz 250 ml dan 500 ml, dan nota rasa.',
  'Halaman produk penuh: senarai bahan, saiz 250 ml, dan nota rasa.');
add(HS, 'related[3].description',
  'RM59 dan RM103, perbandingan seliter, dan apa yang ada di sebalik harga itu.',
  `RM${D250} dan RM${D500} untuk minyak klasik, perbandingan seliter, dan apa yang ada di sebalik harga itu.`);

// ---------------- minyak-zaitun-untuk-salad ----------------
const SL = 'minyak-zaitun-untuk-salad';
add(SL, 'sections[4].blocks[0].text', 'Enam pilihan itu berharga sama seperti minyak klasik mengikut saiz botol.', `Enam pilihan itu dijual dalam botol 250 ml sahaja, dengan harga di kedai.`);
add(SL, 'sections[5].blocks[3].text', 'Botol 500 ml pada RM103.00 turun kepada RM206 seliter', `Botol 500 ml pada ${E500} turun kepada RM${L500} seliter`);
add(SL, 'faqs[6].a',
  'RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml — harga yang sama mengikut saiz untuk minyak klasik dan setiap perisa Infused Collection.',
  `${NAME_DEFAULT} berharga ${E250} untuk 250 ml dan ${E500} untuk 500 ml; versi Organik ${OR250} dan ${OR500}. Setiap perisa Infused Collection ${INF}.`);

// ---------------- zaitun-dalam-al-quran ----------------
const Q = 'zaitun-dalam-al-quran';
add(Q, 'sections[5].blocks[0].text',
  'Botol 250 ml berharga RM59.00 dan botol 500 ml RM103.00, iaitu harga yang sama mengikut saiz untuk minyak klasik dan setiap rasa Koleksi Infusi.',
  `Botol 250 ml berharga ${E250} dan botol 500 ml ${E500}; versi Organik ${OR250} dan ${OR500}. Setiap rasa Koleksi Infusi ${INF}.`);
add(Q, 'sections[5].blocks[1].text',
  'Kedai itu ada dua cawangan, di Ampang Jaya dan di Batu Caves (Prima Seri Gombak), dan cawangan Batu Caves lebih besar. Waktu buka 8:00 pagi hingga 12:00 tengah malam, Isnin hingga Ahad. Hari perayaan seperti Hari Raya boleh berbeza, jadi sahkan dahulu melalui WhatsApp.',
  `Kedai itu ada ${NUM} cawangan di Selangor: ${NAMES}, dan stok boleh berbeza ikut cawangan. Cawangan ${HRS} buka ${OPEN}, Isnin hingga Ahad. Untuk cawangan lain dan hari perayaan seperti Hari Raya, sahkan waktu buka dahulu melalui WhatsApp.`);
add(Q, 'faqs[6].a',
  'RM59.00 untuk 250 ml dan RM103.00 untuk 500 ml, melalui Berkat Madinah Store di Ampang Jaya dan Batu Caves, atau kaunter Shopee dan TikTok Shop mereka.',
  `${NAME_DEFAULT} berharga ${E250} untuk 250 ml dan ${E500} untuk 500 ml, melalui ${NUM} cawangan Berkat Madinah Store di Selangor (${NAMES_P}), atau kaunter Shopee dan TikTok Shop mereka.`);

// ---------------- botol-minyak-zaitun ----------------
const BT = 'botol-minyak-zaitun';
add(BT, 'sections[5].blocks[0].text',
  'Arabian Village dijual di dua cawangan Berkat Madinah Store di Selangor, iaitu di Ampang Jaya dan di Batu Caves.',
  `Arabian Village dijual di ${NUM} cawangan Berkat Madinah Store di Selangor: ${NAMES}.`);
add(BT, 'faqs[6].a',
  'RM59.00 untuk botol 250 ml dan RM103.00 untuk botol 500 ml, iaitu RM236 dan RM206 seliter. Harga itu sama mengikut saiz untuk minyak klasik dan untuk setiap perisa Infused Collection.',
  `${NAME_DEFAULT} berharga ${E250} untuk botol 250 ml dan ${E500} untuk botol 500 ml, iaitu RM${L250} dan RM${L500} seliter. Versi Organik berharga ${OR250} dan ${OR500}, manakala perisa Infused Collection ${INF}.`);

// ---------------- frying / vs cooking oil tables ----------------
for (const id of ['minyak-zaitun-untuk-goreng', 'minyak-zaitun-vs-minyak-masak']) {
  add(id, 'sections[3].blocks[1].rows[1][1]', 'RM103.00', E500);
  add(id, 'sections[3].blocks[1].rows[1][2]', 'RM206', `RM${L500}`);
}
add('minyak-zaitun-untuk-goreng', 'sections[3].blocks[3].text', 'Pada RM206 seliter, dua liter dalam periuk bermakna lebih empat ratus ringgit minyak', `Pada RM${L500} seliter, dua liter dalam periuk bermakna lebih empat ratus ringgit minyak`);
if (L500 * 2 < 400 || L500 * 2 >= 500) throw new Error('"lebih empat ratus ringgit" no longer true');
add('minyak-zaitun-vs-minyak-masak', 'faqs[2].a', 'RM103.00 untuk 500 ml, iaitu RM236 dan RM206 seliter.', `${E500} untuk 500 ml, iaitu RM${L250} dan RM${L500} seliter.`);
add('minyak-zaitun-vs-minyak-masak', 'faqs[5].a', 'botol 500 ml pada RM103.00 lebih murah setiap liter', `botol 500 ml pada ${E500} lebih murah setiap liter`);

// ---------------- other branch sentences ----------------
add('beli-minyak-zaitun-online', 'sections[4].blocks[1].text',
  'Arabian Village di Malaysia diedarkan oleh Berkat Madinah Store, dua cawangan di Selangor.',
  `Arabian Village di Malaysia diedarkan oleh Berkat Madinah Store, dengan ${NUM} cawangan di Selangor (${NAMES_P}).`);
for (const [id, fp] of [['minyak-zaitun-untuk-ikan-bakar', 'faqs[6].a'], ['minyak-zaitun-untuk-pasta', 'faqs[5].a']])
  add(id, fp, 'dengan dua cawangan di Selangor serta', `dengan ${NUM} cawangan di Selangor serta`);
add('minyak-zaitun-untuk-roti', 'faqs[6].a',
  'Di Berkat Madinah Store sahaja, satu-satunya penjual sah di Malaysia: cawangan Ampang Jaya dan Batu Caves di Selangor, serta kaunter Shopee dan TikTok Shop milik mereka sendiri.',
  `Di Berkat Madinah Store sahaja, satu-satunya penjual sah di Malaysia: ${NUM} cawangan di Selangor (${NAMES_P}), serta kaunter Shopee dan TikTok Shop milik mereka sendiri.`);
add('minyak-zaitun-original-cara-pastikan', 'sections[4].blocks[1].text',
  'dengan cawangan di Ampang Jaya dan Batu Caves serta kaunter',
  `dengan ${NUM} cawangan di Selangor (${NAMES_P}) serta kaunter`);
add('minyak-zaitun-original-cara-pastikan', 'faqs[5].a',
  'Dua di Selangor, di Ampang Jaya dan Batu Caves, dengan Batu Caves yang lebih besar. Kedua-duanya buka 8:00 pagi hingga 12:00 tengah malam setiap hari.',
  `${Num}, semuanya di Selangor: ${NAMES}. Cawangan ${HRS} buka ${OPEN} setiap hari; untuk cawangan lain, WhatsApp untuk sahkan waktu buka.`);

// ---------------- repeated related-card descriptions (whole field) ----------------
const CARD = {
  'Cawangan Ampang Jaya dan Batu Caves, waktu operasi, dan saluran dalam talian Berkat Madinah Store.': `${Num} cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah Store.`,
  'Cawangan Ampang Jaya dan Batu Caves, waktu operasi, dan kaunter dalam talian Berkat Madinah Store.': `${Num} cawangan di Selangor, waktu operasi, dan kaunter dalam talian Berkat Madinah Store.`,
  'Cawangan Ampang Jaya dan Batu Caves, waktu operasi, dan kaunter dalam talian rasmi Berkat Madinah Store.': `${Num} cawangan di Selangor, waktu operasi, dan kaunter dalam talian rasmi Berkat Madinah Store.`,
  'Cawangan Ampang Jaya dan Batu Caves, waktu operasi, dan saluran dalam talian Berkat Madinah.': `${Num} cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah.`,
  'Kaunter Ampang Jaya dan Batu Caves, waktu operasi, dan saluran dalam talian Berkat Madinah.': `${Num} cawangan di Selangor, waktu operasi, dan saluran dalam talian Berkat Madinah.`,
  'Cawangan Ampang Jaya dan Batu Caves, serta saluran dalam talian Berkat Madinah Store.': `${Num} cawangan di Selangor, serta saluran dalam talian Berkat Madinah Store.`,
  'Cawangan Ampang Jaya dan Batu Caves, waktu buka, serta kaunter dalam talian rasmi.': `${Num} cawangan di Selangor, waktu buka, serta kaunter dalam talian rasmi.`,
  'Cawangan Berkat Madinah di Ampang Jaya dan Batu Caves, waktu operasi, dan saluran dalam talian.': `${Num} cawangan Berkat Madinah di Selangor, waktu operasi, dan saluran dalam talian.`,
  'Berkat Madinah Store di Ampang Jaya dan Batu Caves, waktu operasi, dan kaunter dalam talian mereka sendiri.': `${Num} cawangan Berkat Madinah Store di Selangor, waktu operasi, dan kaunter dalam talian mereka sendiri.`,
  'Berkat Madinah Store di Ampang Jaya dan Batu Caves, berserta kaunter Shopee dan TikTok Shop.': `${Num} cawangan Berkat Madinah Store di Selangor, berserta kaunter Shopee dan TikTok Shop.`,
  'Berkat Madinah Store di Ampang Jaya dan Batu Caves, serta kaunter Shopee dan TikTok Shop penjual yang sama.': `${Num} cawangan Berkat Madinah Store di Selangor, serta kaunter Shopee dan TikTok Shop penjual yang sama.`,
  'Berkat Madinah Store, cawangan Ampang Jaya dan Batu Caves, serta kaunter dalam talian mereka sendiri.': `Berkat Madinah Store, ${NUM} cawangan di Selangor, serta kaunter dalam talian mereka sendiri.`,
  'Dua cawangan Berkat Madinah Store di Selangor, waktu operasi, dan saluran dalam talian rasmi.': `${Num} cawangan Berkat Madinah Store di Selangor, waktu operasi, dan saluran dalam talian rasmi.`,
};
const arts = await loadMs();
const seen = new Set(E.map((e) => `${e.id}|${e.path}`));
for (const a of arts) for (const [p, v] of strings(a)) {
  if (/^related\[\d+\]\.description$/.test(p) && CARD[v] && !seen.has(`${a.id}|${p}`)) add(a.id, p, v, CARD[v]);
}

// validate: every old snippet occurs exactly once in its field
const byId = Object.fromEntries(arts.map((a) => [a.id, a]));
const get = (o, p) => p.split(/\.|\[|\]/).filter(Boolean).reduce((x, k) => x?.[k], o);
for (const e of E) {
  const v = get(byId[e.id], e.path);
  if (typeof v !== 'string') throw new Error(`no string at ${e.id} ${e.path}`);
  const n = v.split(e.old).length - 1;
  if (n !== 1) throw new Error(`${e.id} ${e.path}: old found ${n}x\n  ${e.old}`);
  e.wholeField = v === e.old;
  if (/^(slug|id|focusKeyword|relatedKeywords|h1|seoTitle|metaTitle)|heading|\.id$|\.q$|label$/.test(e.path)) throw new Error(`protected path ${e.path}`);
}
writeFileSync(MAP, JSON.stringify(E, null, 2) + '\n');
console.log(`map: ${E.length} entries, ${new Set(E.map((e) => e.id)).size} articles -> ${MAP}`);
