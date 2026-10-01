/**
 * Creates the owner's landing page (docs/cms/LP-SPEC.md §6) through the CMS API as a DRAFT:
 * uploads 3 photos, creates the enquiry form, creates the page and saves its draft doc.
 * It never publishes.
 *
 *   AVO_BASE=https://localhost:8443 AVO_EMAIL=… AVO_PASSWORD=… node scripts/dev/create-landing-draft.mjs
 *   (harness: also NODE_TLS_REJECT_UNAUTHORIZED=0)
 *
 * Copy rules (LP-SPEC §8 M7): facts from AI-FACTS.yml / storeFacts.json / existing site copy only. No prices,
 * no acidity figure, no "halal", no health claims, no certifications/awards, no reply-time promises.
 * Reviews = the home page testimonials verbatim (owner: real, 2026-10-02).
 */
import { readFileSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = process.env.AVO_BASE || 'https://localhost:8443';
const EMAIL = process.env.AVO_EMAIL;
const PASSWORD = process.env.AVO_PASSWORD;
const RECIPIENT = process.env.AVO_RECIPIENT || 'cs@madinah.com.my';
const SLUG = process.env.AVO_SLUG || 'palestinian-extra-virgin-olive-oil';
if (!EMAIL || !PASSWORD) throw new Error('AVO_EMAIL / AVO_PASSWORD missing');

let cookie = '';
let csrf = '';
let build = '';

async function call(method, path, body, extra = {}) {
  const headers = { Origin: BASE, Accept: 'application/json', ...extra };
  if (cookie) headers.Cookie = cookie;
  if (csrf) headers['X-CSRF-Token'] = csrf;
  if (build) headers['X-CMS-Build'] = build;
  let sendMethod = method;
  if (method !== 'GET' && method !== 'POST') {
    headers['X-HTTP-Method-Override'] = method;
    sendMethod = 'POST';
  }
  let payload;
  if (body instanceof FormData) payload = body;
  else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const res = await fetch(BASE + path, { method: sendMethod, headers, body: payload, redirect: 'manual' });
  const set = res.headers.get('set-cookie');
  if (set) cookie = set.split(';')[0];
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${typeof data === 'string' ? data.slice(0, 200) : JSON.stringify(data)}`);
  return data;
}

const L = (en, ms) => ({ en, ms });
let n = 0;
const id = (p) => `${p}lp${(++n).toString(36).padStart(4, '0')}`;

// ---------------------------------------------------------------- facts reused verbatim
const common = (lang) => JSON.parse(readFileSync(join(ROOT, `src/i18n/locales/${lang}/common.json`), 'utf8'));
const EN = common('en');
const MS = common('ms');
const reviews = EN.testimonials.items.map((r, i) => ({
  id: id('q'),
  quote: L(r.quote, MS.testimonials.items[i].quote),
  name: L(r.name, MS.testimonials.items[i].name),
  place: L(r.place, MS.testimonials.items[i].place),
}));

async function upload(rel, altEn, altMs) {
  const file = join(ROOT, rel);
  const fd = new FormData();
  fd.append('file', new Blob([readFileSync(file)], { type: 'image/webp' }), basename(file));
  const m = await call('POST', '/api/media', fd);
  await call('PATCH', `/api/media/${m.id}`, { altEn, altMs });
  return m.id;
}

const waMsg = L('Hello, I would like to ask about Arabian Village olive oil.', 'Hai, saya ingin bertanya tentang minyak zaitun Arabian Village.');
const btnWa = () => ({ id: id('b'), kind: 'whatsapp', label: L('WhatsApp Us', 'WhatsApp Kami'), message: waMsg, style: 'whatsapp' });
const btnForm = () => ({ id: id('b'), kind: 'form', label: L('Fill the Form', 'Isi Borang'), style: 'outline' });
const btnStore = () => ({ id: id('b'), kind: 'store', store: 'madinah', label: L('Buy at Berkat Madinah Store', 'Beli di Berkat Madinah Store'), style: 'gold', newTab: true });

const section = (widgets, settings = {}) => ({
  id: id('s'),
  kind: 'section',
  settings: { layout: 'full', bg: 'bg', padY: 'none', align: 'start', valign: 'start', gap: 'm', ...settings },
  columns: [{ id: id('c'), span: 12, widgets }],
});

async function main() {
  await call('POST', '/api/auth/login', { email: EMAIL, password: PASSWORD }).then((r) => (csrf = r.csrf));
  build = (await call('GET', '/api/build')).build;

  const existing = await call('GET', '/api/pages');
  if (existing.some((p) => p.slug === SLUG)) throw new Error(`a page with the address ${SLUG} already exists — not creating a second one`);

  const heroImg = await upload(
    'src/assets/opt/HeroAVOliveOilBottleInTheField-2000.webp',
    'A bottle of Arabian Village Palestinian extra virgin olive oil in an olive grove',
    'Sebotol minyak zaitun extra virgin Palestin Arabian Village di ladang zaitun'
  );
  const fieldImg = await upload(
    'src/assets/opt/AVOliveOilInTheField-750.webp',
    'Arabian Village olive oil among the olive trees',
    'Minyak zaitun Arabian Village di antara pokok zaitun'
  );
  const pourImg = await upload(
    'src/assets/opt/FarmerPouringOliveOilInTheField-750.webp',
    'Fresh olive oil being poured in the olive grove',
    'Minyak zaitun segar dituang di ladang zaitun'
  );

  const form = await call('POST', '/api/forms', {
    name: 'Olive oil enquiry (landing page)',
    recipients: [RECIPIENT],
    subject: 'Olive oil enquiry',
    def: {
      fields: [
        { id: id('f'), name: 'name', type: 'text', label: L('Your name', 'Nama anda'), placeholder: L('', ''), required: true, width: 'full' },
        { id: id('f'), name: 'phone', type: 'tel', label: L('Phone (WhatsApp)', 'Telefon (WhatsApp)'), placeholder: L('+60', '+60'), required: true, width: 'half' },
        { id: id('f'), name: 'email', type: 'email', label: L('Email', 'E-mel'), placeholder: L('', ''), required: false, width: 'half' },
        {
          id: id('f'),
          name: 'interest',
          type: 'select',
          label: L('Interested in', 'Berminat dengan'),
          placeholder: L('Choose…', 'Pilih…'),
          required: true,
          width: 'full',
          options: [
            { id: id('o'), label: L('Classic extra virgin olive oil', 'Minyak zaitun extra virgin klasik') },
            { id: id('o'), label: L('Infused Collection', 'Koleksi Infused') },
            { id: id('o'), label: L('Both', 'Kedua-duanya') },
            { id: id('o'), label: L('Wholesale for my business', 'Borong untuk perniagaan saya') },
          ],
        },
        {
          id: id('f'),
          name: 'size',
          type: 'select',
          label: L('Bottle size', 'Saiz botol'),
          placeholder: L('Choose…', 'Pilih…'),
          required: false,
          width: 'full',
          options: [
            { id: id('o'), label: L('250 ml', '250 ml') },
            { id: id('o'), label: L('500 ml', '500 ml') },
            { id: id('o'), label: L('Not sure yet', 'Belum pasti') },
          ],
        },
        { id: id('f'), name: 'message', type: 'textarea', label: L('Message', 'Mesej'), placeholder: L('', ''), required: false, width: 'full', maxLength: 2000 },
      ],
      submitLabel: L('Send My Enquiry', 'Hantar Pertanyaan'),
      successMessage: L(
        'Thank you! Your message has been sent to Berkat Madinah Store.',
        'Terima kasih! Mesej anda telah dihantar kepada Berkat Madinah Store.'
      ),
    },
  });

  const doc = {
    schema: 1,
    layout: 'landing',
    title: L('Palestinian Extra Virgin Olive Oil', 'Minyak Zaitun Extra Virgin Palestin'),
    seo: {
      metaTitle: L('Palestinian Extra Virgin Olive Oil in Malaysia | Arabian Village', 'Minyak Zaitun Extra Virgin Palestin di Malaysia | Arabian Village'),
      metaDescription: L(
        'First cold pressed Palestinian extra virgin olive oil, hand-harvested in Palestine. The classic oil and six infused flavours, sold by Berkat Madinah Store.',
        'Minyak zaitun extra virgin Palestin perahan sejuk pertama, dituai dengan tangan. Minyak klasik dan enam perisa infused, dijual oleh Berkat Madinah Store.'
      ),
      ogImage: heroImg,
    },
    sections: [
      section([
        {
          id: id('w'),
          type: 'heroForm',
          settings: {
            kicker: L('Arabian Village · Sold in Malaysia by Berkat Madinah Store', 'Arabian Village · Dijual di Malaysia oleh Berkat Madinah Store'),
            title: L('Palestinian Extra Virgin Olive Oil, First Cold Pressed', 'Minyak Zaitun Extra Virgin Palestin, Perahan Sejuk Pertama'),
            highlight: L('Palestinian Extra Virgin Olive Oil', 'Minyak Zaitun Extra Virgin Palestin'),
            sub: L(
              'Hand-harvested from centuries-old olive groves in Palestine and pressed within hours of picking — no heat, no chemicals, no blending. The classic oil, plus six infused flavours.',
              'Dituai dengan tangan dari ladang zaitun berusia berabad-abad di Palestin dan diperah dalam beberapa jam selepas dipetik — tanpa haba, tanpa bahan kimia, tanpa campuran. Minyak klasik, serta enam perisa infused.'
            ),
            chips: [
              { id: id('i'), text: L('First cold pressed', 'Perahan sejuk pertama') },
              { id: id('i'), text: L('100% Palestinian', '100% Palestin') },
              { id: id('i'), text: L('No additives', 'Tanpa bahan tambahan') },
              { id: id('i'), text: L('6 infused flavours', '6 perisa infused') },
            ],
            buttons: [btnWa(), btnForm(), btnStore()],
            formId: form.id,
            formTitle: L('Ask About Our Olive Oil', 'Tanya Tentang Minyak Zaitun Kami'),
            formSub: L(
              'Tell us what you need and the Berkat Madinah Store team will get back to you.',
              'Beritahu kami apa yang anda perlukan dan pasukan Berkat Madinah Store akan menghubungi anda.'
            ),
            media: heroImg,
            overlay: 60,
            tone: 'dark',
          },
        },
      ]),
      section(
        [
          {
            id: id('w'),
            type: 'cards',
            settings: {
              kicker: L('Why Arabian Village', 'Kenapa Arabian Village'),
              title: L('Made the Traditional Way, From Grove to Bottle', 'Dihasilkan Secara Tradisional, Dari Ladang ke Botol'),
              sub: L('Every bottle follows the same simple rules.', 'Setiap botol mengikut peraturan mudah yang sama.'),
              columns: 2,
              items: [
                { id: id('i'), icon: 'hand', title: L('Hand-harvested', 'Dituai dengan tangan'), text: L('Picked by hand from centuries-old olive groves in Palestine.', 'Dipetik dengan tangan dari ladang zaitun berusia berabad-abad di Palestin.') },
                { id: id('i'), icon: 'clock', title: L('Pressed within hours', 'Diperah dalam beberapa jam'), text: L('Mechanically pressed within hours of picking.', 'Diperah secara mekanikal dalam beberapa jam selepas dipetik.') },
                { id: id('i'), icon: 'leaf', title: L('No heat, no chemicals', 'Tanpa haba, tanpa bahan kimia'), text: L('First cold pressed, with no heat and no chemical processing.', 'Perahan sejuk pertama, tanpa haba dan tanpa pemprosesan kimia.') },
                { id: id('i'), icon: 'olive', title: L('100% Palestinian', '100% Palestin'), text: L('No blending and no additives.', 'Tanpa campuran dan tanpa bahan tambahan.') },
                { id: id('i'), icon: 'gift', title: L('Six infused flavours', 'Enam perisa infused'), text: L('Extra virgin olive oil slow-infused with whole dried botanicals.', 'Minyak zaitun extra virgin yang diinfus perlahan dengan herba kering.') },
                { id: id('i'), icon: 'store', title: L('One trusted seller', 'Satu penjual dipercayai'), text: L('Sold in Malaysia only through Berkat Madinah Store.', 'Dijual di Malaysia hanya melalui Berkat Madinah Store.') },
              ],
              media: fieldImg,
              mediaAlt: L('Arabian Village olive oil among the olive trees', 'Minyak zaitun Arabian Village di antara pokok zaitun'),
              mediaSide: 'right',
            },
          },
        ],
        { layout: 'boxed', bg: 'cream', padY: 'l' }
      ),
      section(
        [
          {
            id: id('w'),
            type: 'heading',
            settings: {
              kicker: L('The Range', 'Rangkaian Kami'),
              text: L('The Classic Oil and Six Infused Flavours', 'Minyak Klasik dan Enam Perisa Infused'),
              level: 'h2',
              size: 'l',
              align: 'center',
              color: 'olive-dark',
            },
          },
          {
            id: id('w'),
            type: 'text',
            settings: {
              html: L(
                '<p>250 ml and 500 ml bottles. The classic oil and every infused flavour come in both sizes.</p>',
                '<p>Botol 250 ml dan 500 ml. Minyak klasik dan setiap perisa infused tersedia dalam kedua-dua saiz.</p>'
              ),
              align: 'center',
              color: 'default',
              size: 'm',
            },
          },
          {
            id: id('w'),
            type: 'products',
            settings: {
              ids: ['classic', 'lavender-chamomile', 'blackseed', 'turmeric-black-pepper', 'rosemary-basil', 'fennel-anise', 'wild-thyme'],
              cols: 4,
              showTagline: true,
            },
          },
        ],
        { layout: 'boxed', bg: 'bg', padY: 'l', align: 'center' }
      ),
      section([
        {
          id: id('w'),
          type: 'ctaBand',
          settings: {
            icon: 'chat',
            title: L('Not Sure Which Bottle to Choose?', 'Tidak Pasti Botol Mana Yang Sesuai?'),
            sub: L('Tell us how you cook and ask us anything on WhatsApp.', 'Beritahu kami cara anda memasak dan tanya apa sahaja di WhatsApp.'),
            buttons: [btnWa(), btnForm()],
            tone: 'olive',
          },
        },
      ]),
      section(
        [
          {
            id: id('w'),
            type: 'steps',
            settings: {
              kicker: L('Simple to Order', 'Mudah Dipesan'),
              title: L('How to Get Your Bottle', 'Cara Mendapatkan Botol Anda'),
              sub: L('', ''),
              items: [
                { id: id('i'), title: L('Choose your oil', 'Pilih minyak anda'), text: L('The classic Palestinian extra virgin olive oil or one of six infused flavours, in 250 ml or 500 ml.', 'Minyak zaitun extra virgin Palestin klasik atau salah satu daripada enam perisa infused, dalam 250 ml atau 500 ml.') },
                { id: id('i'), title: L('Ask or order', 'Tanya atau pesan'), text: L("Message us on WhatsApp, fill in the form, or order on the store's Shopee or TikTok Shop counters.", 'Hantar mesej di WhatsApp, isi borang, atau pesan di kaunter Shopee atau TikTok Shop kedai.') },
                { id: id('i'), title: L('Collect or receive', 'Ambil atau terima'), text: L('Visit one of the two Berkat Madinah Store branches in Selangor, or get it delivered nationwide through Shopee or TikTok Shop.', 'Kunjungi salah satu daripada dua cawangan Berkat Madinah Store di Selangor, atau dapatkan penghantaran ke seluruh negara melalui Shopee atau TikTok Shop.') },
              ],
              media: pourImg,
              mediaAlt: L('Fresh olive oil being poured in the olive grove', 'Minyak zaitun segar dituang di ladang zaitun'),
            },
          },
        ],
        { layout: 'boxed', bg: 'cream', padY: 'l' }
      ),
      section(
        [
          {
            id: id('w'),
            type: 'stores',
            settings: {
              kicker: L('Where to Buy', 'Di Mana Untuk Membeli'),
              title: L('Buy Arabian Village in Malaysia', 'Beli Arabian Village di Malaysia'),
              sub: L(
                'Arabian Village is sold in Malaysia only by Berkat Madinah Store — in its branches and on its own online counters.',
                'Arabian Village dijual di Malaysia hanya oleh Berkat Madinah Store — di cawangannya dan di kaunter dalam talian miliknya sendiri.'
              ),
              items: [
                {
                  id: id('i'),
                  store: 'madinah',
                  title: L('Berkat Madinah Store', 'Berkat Madinah Store'),
                  text: L(
                    'Two branches in Selangor: Batu Caves / Prima Seri Gombak and Ampang Jaya. Open 8:00 am – 12:00 midnight, Monday through Sunday; festive days can differ.',
                    'Dua cawangan di Selangor: Batu Caves / Prima Seri Gombak dan Ampang Jaya. Dibuka 8:00 pagi – 12:00 tengah malam, Isnin hingga Ahad; hari perayaan mungkin berbeza.'
                  ),
                  button: L('Visit Berkat Madinah Store', 'Lawati Berkat Madinah Store'),
                },
                {
                  id: id('i'),
                  store: 'shopee',
                  title: L('Shopee', 'Shopee'),
                  text: L("The store's own Shopee counter, with delivery across Malaysia.", 'Kaunter Shopee milik kedai, dengan penghantaran ke seluruh Malaysia.'),
                  button: L('Shop on Shopee', 'Beli di Shopee'),
                },
                {
                  id: id('i'),
                  store: 'tiktok',
                  title: L('TikTok Shop', 'TikTok Shop'),
                  text: L("The store's own TikTok Shop counter, with delivery across Malaysia.", 'Kaunter TikTok Shop milik kedai, dengan penghantaran ke seluruh Malaysia.'),
                  button: L('Shop on TikTok', 'Beli di TikTok'),
                },
              ],
            },
          },
        ],
        { layout: 'boxed', bg: 'bg', padY: 'l' }
      ),
      section(
        [
          {
            id: id('w'),
            type: 'badges',
            settings: {
              kicker: L('Berkat Madinah Store', 'Berkat Madinah Store'),
              title: L('Sold by a Store Malaysians Know', 'Dijual oleh Kedai yang Dikenali Rakyat Malaysia'),
              sub: L('Figures published by Berkat Madinah Store.', 'Angka yang diterbitkan oleh Berkat Madinah Store.'),
              items: [
                { id: id('i'), icon: 'award', title: L('Established in 2010', 'Ditubuhkan pada 2010') },
                { id: id('i'), icon: 'users', title: L('500,000+ customers served', '500,000+ pelanggan dilayan') },
                { id: id('i'), icon: 'globe', title: L('6,000+ products from 15+ countries', '6,000+ produk dari 15+ negara') },
                { id: id('i'), icon: 'pin', title: L('2 branches in Selangor', '2 cawangan di Selangor') },
              ],
            },
          },
        ],
        { layout: 'boxed', bg: 'cream', padY: 'l' }
      ),
      section(
        [
          {
            id: id('w'),
            type: 'reviews',
            settings: {
              title: L('What People Say', 'Apa Kata Pelanggan'),
              stats: [],
              items: reviews,
            },
          },
        ],
        { layout: 'boxed', bg: 'bg', padY: 'l' }
      ),
      section(
        [
          {
            id: id('w'),
            type: 'heading',
            settings: { text: L('Frequently Asked Questions', 'Soalan Lazim'), level: 'h2', size: 'l', align: 'center', color: 'olive-dark' },
          },
          {
            id: id('w'),
            type: 'faq',
            settings: {
              items: [
                {
                  id: id('q'),
                  q: L('What is Arabian Village olive oil?', 'Apakah minyak zaitun Arabian Village?'),
                  a: L(
                    'A premium first cold pressed extra virgin olive oil from centuries-old groves in Palestine, hand-harvested and mechanically pressed within hours of picking, with no heat and no chemical processing. 100% Palestinian olive oil — no blending, no additives.',
                    'Minyak zaitun extra virgin perahan sejuk pertama yang premium dari ladang berusia berabad-abad di Palestin, dituai dengan tangan dan diperah secara mekanikal dalam beberapa jam selepas dipetik, tanpa haba dan tanpa pemprosesan kimia. 100% minyak zaitun Palestin — tanpa campuran, tanpa bahan tambahan.'
                  ),
                },
                {
                  id: id('q'),
                  q: L('Where can I buy it in Malaysia?', 'Di mana saya boleh membelinya di Malaysia?'),
                  a: L(
                    "Only through Berkat Madinah Store — at its Batu Caves / Prima Seri Gombak and Ampang Jaya branches in Selangor, on WhatsApp +60 11-1111 9912, or on the store's own Shopee and TikTok Shop counters.",
                    'Hanya melalui Berkat Madinah Store — di cawangan Batu Caves / Prima Seri Gombak dan Ampang Jaya di Selangor, di WhatsApp +60 11-1111 9912, atau di kaunter Shopee dan TikTok Shop milik kedai itu sendiri.'
                  ),
                },
                {
                  id: id('q'),
                  q: L('What sizes does it come in?', 'Apakah saiz yang ada?'),
                  a: L('250 ml and 500 ml, for the classic oil and for every infused flavour.', '250 ml dan 500 ml, untuk minyak klasik dan untuk setiap perisa infused.'),
                },
                {
                  id: id('q'),
                  q: L('What is in the Infused Collection?', 'Apakah yang ada dalam Koleksi Infused?'),
                  a: L(
                    "Six flavours, each extra virgin olive oil slow-infused with whole dried botanicals: Lavender & Chamomile, Blackseed (Habbat al-Barakah), Turmeric & Black Pepper, Rosemary & Basil, Fennel & Anise, and Wild Thyme (Za'atar).",
                    "Enam perisa, setiap satunya minyak zaitun extra virgin yang diinfus perlahan dengan herba kering: Lavender & Chamomile, Habbatus Sauda (Habbat al-Barakah), Kunyit & Lada Hitam, Rosmari & Basil, Adas & Jintan Manis, dan Thyme Liar (Za'atar)."
                  ),
                },
                {
                  id: id('q'),
                  q: L('Do you deliver, or do I have to visit a branch?', 'Adakah anda menghantar, atau saya perlu ke cawangan?'),
                  a: L(
                    "Both branches are in Selangor, and the store's Shopee and TikTok Shop counters deliver nationwide. Ask on WhatsApp +60 11-1111 9912 to check stock before travelling.",
                    'Kedua-dua cawangan berada di Selangor, dan kaunter Shopee serta TikTok Shop kedai menghantar ke seluruh negara. Tanya di WhatsApp +60 11-1111 9912 untuk menyemak stok sebelum datang.'
                  ),
                },
                {
                  id: id('q'),
                  q: L('Do you sell wholesale to restaurants and shops?', 'Adakah anda menjual secara borong kepada restoran dan kedai?'),
                  a: L(
                    'Yes — Berkat Madinah Store supplies restaurants, cafés and shops. Terms are quoted on request, on WhatsApp +60 11-1111 9912 or by email at cs@madinah.com.my.',
                    'Ya — Berkat Madinah Store membekalkan restoran, kafe dan kedai. Terma diberikan atas permintaan, di WhatsApp +60 11-1111 9912 atau melalui e-mel di cs@madinah.com.my.'
                  ),
                },
                {
                  id: id('q'),
                  q: L('How should I store it?', 'Bagaimana cara menyimpannya?'),
                  a: L(
                    'Cool, dark and closed. Heat, light and air are what age an olive oil; a cupboard away from the hob is better than a shelf beside it.',
                    'Sejuk, gelap dan tertutup. Haba, cahaya dan udara yang menjadikan minyak zaitun cepat lama; almari yang jauh dari dapur lebih baik daripada rak di sebelahnya.'
                  ),
                },
              ],
            },
          },
        ],
        { layout: 'boxed', bg: 'cream', padY: 'l' }
      ),
      section([
        {
          id: id('w'),
          type: 'ctaBand',
          settings: {
            icon: 'olive',
            title: L('Taste Palestinian Extra Virgin Olive Oil', 'Rasai Minyak Zaitun Extra Virgin Palestin'),
            sub: L('Ask us on WhatsApp, fill in the form, or buy at Berkat Madinah Store.', 'Tanya kami di WhatsApp, isi borang, atau beli di Berkat Madinah Store.'),
            buttons: [btnWa(), btnForm(), btnStore()],
            tone: 'dark',
          },
        },
      ]),
    ],
  };

  const created = await call('POST', '/api/pages', { slug: SLUG, title: doc.title });
  const pageId = created.page.id;
  const saved = await call('PUT', `/api/pages/${pageId}/draft`, { doc, baseVersion: created.page.version });
  const check = await call('GET', `/api/pages/${pageId}`);
  if (check.page.status !== 'draft' && check.page.status !== undefined && check.published) throw new Error('page is not a draft');
  console.log(JSON.stringify({ pageId, formId: form.id, media: [heroImg, fieldImg, pourImg], draftVersion: saved.version, status: check.page.status, published: !!check.published }, null, 1));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
