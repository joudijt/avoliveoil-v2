// Dev-only fixture for scripts/dev/cms-harness.mjs: one CMS page doc that uses
// EVERY widget type in several settings variants, with real photos from
// src/assets/opt (served by vite dev as /src/assets/opt/…).
const L = (en, ms = '') => ({ en, ms });
const img = (name, widths, width, height, id, altEn, altMs) => ({
  id,
  width,
  height,
  variants: widths.map((w) => ({ w, url: `/src/assets/opt/${name}-${w}.webp` })),
  alt: L(altEn, altMs),
});

export const MEDIA = {
  1: img('OliveGroveSunsetHero', [400, 800, 1200, 1600, 1672], 1672, 941, 1, 'Olive grove at sunset', 'Kebun zaitun ketika matahari terbenam'),
  2: img('AVOliveOilInTheField', [400, 750], 750, 947, 2, 'Arabian Village bottle in the olive field', 'Botol Arabian Village di ladang zaitun'),
  3: img('FarmerPickingOliveOfTheTreeInTheField', [400, 800, 928], 928, 750, 3, 'Farmer picking olives', 'Petani memetik buah zaitun'),
  4: img('FarmerPouringOliveOilInTheField', [400, 750], 750, 409, 4, 'Pouring fresh olive oil', 'Menuang minyak zaitun segar'),
  5: img('journey-03-picking', [400, 600], 600, 450, 5, 'Hand picking', 'Memetik dengan tangan'),
  6: img('journey-07-bottling', [400, 800, 1200, 1376], 1376, 768, 6, 'Bottling', 'Pembotolan'),
  7: img('malaysian-woman-bottle-kampung', [400, 800, 1200, 1536], 1536, 1024, 7, 'Woman with a bottle in a kampung kitchen', 'Wanita dengan botol di dapur kampung'),
};

const opt = (id, en, ms) => ({ id, label: L(en, ms) });

export const FORMS = {
  7: {
    id: 7,
    def: {
      fields: [
        { id: 'f1', name: 'name', type: 'text', label: L('Your name', 'Nama anda'), placeholder: L('Full name', 'Nama penuh'), required: true, width: 'half' },
        { id: 'f2', name: 'email', type: 'email', label: L('Email', 'E-mel'), placeholder: L('you@example.com', 'anda@contoh.com'), required: true, width: 'half' },
        { id: 'f3', name: 'phone', type: 'tel', label: L('Phone / WhatsApp', 'Telefon / WhatsApp'), placeholder: L('+60…', '+60…'), required: false, width: 'half' },
        {
          id: 'f4',
          name: 'topic',
          type: 'select',
          label: L('Topic', 'Topik'),
          placeholder: L('Choose a topic', 'Pilih topik'),
          required: true,
          width: 'half',
          options: [opt('o1', 'Wholesale', 'Borong'), opt('o2', 'Gift sets', 'Set hadiah'), opt('o3', 'Something else', 'Lain-lain')],
        },
        { id: 'f5', name: 'qty', type: 'number', label: L('Bottles', 'Botol'), placeholder: L('12', '12'), required: false, width: 'half' },
        { id: 'f6', name: 'date', type: 'date', label: L('Needed by', 'Diperlukan pada'), placeholder: L('', ''), required: false, width: 'half' },
        {
          id: 'f7',
          name: 'reply',
          type: 'radio',
          label: L('Reply by', 'Balas melalui'),
          placeholder: L('', ''),
          required: false,
          width: 'full',
          options: [opt('r1', 'Email', 'E-mel'), opt('r2', 'WhatsApp', 'WhatsApp')],
        },
        { id: 'f8', name: 'message', type: 'textarea', label: L('Message', 'Mesej'), placeholder: L('How can we help?', 'Bagaimana kami boleh bantu?'), required: true, width: 'full', maxLength: 3000 },
        { id: 'f9', name: 'agree', type: 'checkbox', label: L('I agree to be contacted about my enquiry', 'Saya setuju dihubungi mengenai pertanyaan saya'), placeholder: L('', ''), required: true, width: 'full' },
      ],
      submitLabel: L('Send enquiry', 'Hantar pertanyaan'),
      successMessage: L('Thank you — we will reply within one working day.', 'Terima kasih — kami akan membalas dalam satu hari bekerja.'),
    },
  },
  8: {
    id: 8,
    def: {
      fields: [
        { id: 'g1', name: 'email', type: 'email', label: L('Email', 'E-mel'), placeholder: L('you@example.com', 'anda@contoh.com'), required: true, width: 'full' },
      ],
      submitLabel: L('Subscribe', 'Langgan'),
      successMessage: L('Subscribed.', 'Telah dilanggan.'),
      redirectPath: '/en/why-us',
    },
  },
};

let n = 0;
const id = (p) => `${p}${(++n).toString(36).padStart(4, '0')}`;
const sec = (settings, columns, hide) => ({
  id: id('s'),
  kind: 'section',
  settings: { layout: 'boxed', bg: 'bg', padY: 'l', align: 'start', valign: 'start', gap: 'm', ...settings },
  ...(hide ? { hide } : {}),
  columns: columns.map(([span, widgets]) => ({ id: id('c'), span, widgets })),
});
const w = (type, settings, hide) => ({ id: id('w'), type, settings, ...(hide ? { hide } : {}) });

const ALL_ICONS = ['check', 'leaf', 'olive', 'drop', 'medal', 'star', 'truck', 'shield', 'heart', 'phone', 'mail', 'pin', 'clock'];

export function buildDoc() {
  n = 0;
  return {
    schema: 1,
    title: L('Wholesale & gifts', 'Borong & hadiah'),
    seo: { metaTitle: L('Wholesale olive oil | Arabian Village', 'Minyak zaitun borong | Arabian Village'), metaDescription: L('Order in bulk.', 'Pesan secara pukal.') },
    sections: [
      sec({ align: 'center', padY: 's' }, [
        [
          12,
          [
            w('heading', { text: L('Wholesale & gift orders', 'Pesanan borong & hadiah'), level: 'h1', size: 'xl', align: 'center', color: 'default', kicker: L('For businesses', 'Untuk perniagaan') }),
            w('text', { html: L('<p>First cold pressed <strong>Palestinian</strong> olive oil for cafés, hampers and corporate gifts.</p>', '<p>Minyak zaitun Palestin <strong>perahan sejuk pertama</strong> untuk kafe, hamper dan hadiah korporat.</p>'), align: 'center', color: 'default', size: 'l' }),
            w('iconList', {
              items: [
                { id: 'i1', icon: 'truck', text: L('Delivery across Malaysia', 'Penghantaran seluruh Malaysia') },
                { id: 'i2', icon: 'medal', text: L('Halal certified', 'Diperakui halal') },
                { id: 'i3', icon: 'olive', text: L('Single origin', 'Asal tunggal') },
              ],
              color: 'olive-dark',
              layout: 'inline',
            }),
            w('button', { label: L('Ask for a quote', 'Minta sebut harga'), href: '#enquiry', style: 'primary', newTab: false, align: 'center', size: 'l' }),
          ],
        ],
      ]),
      sec({ bg: 'cream', valign: 'center', gap: 'l' }, [
        [6, [w('image', { media: 2, alt: L('', ''), caption: L('Harvested by hand in Palestine.', 'Dituai dengan tangan di Palestin.'), ratio: '4/3', rounded: true, align: 'start', maxWidth: 0 })]],
        [
          6,
          [
            w('heading', { text: L('Why cafés choose us', 'Mengapa kafe memilih kami'), level: 'h2', size: 'l', align: 'start', color: 'olive-dark' }),
            w('text', {
              html: L(
                '<p>We bottle in <em>small batches</em> so every case is fresh. <a href="/en/products">See the range</a> or <a href="https://madinah.com.my/en/">visit the store</a>.</p><ul><li>Minimum order 12 bottles</li><li>Mixed cases welcome</li></ul><h3>Storage</h3><blockquote>Keep away from light and heat.</blockquote><script>alert(1)</script><p onclick="x()">Clean <span style="color:red">styles</span> removed.</p>',
                '<p>Kami membotol dalam <em>kelompok kecil</em>. <a href="/ms/products">Lihat produk</a> atau <a href="/en/contact">hubungi kami</a>.</p><ul><li>Pesanan minimum 12 botol</li></ul>'
              ),
              align: 'start',
              color: 'default',
              size: 'm',
            }),
            w('button', { label: L('Download price list', 'Muat turun senarai harga'), href: 'https://example.com/prices.pdf', style: 'gold', newTab: true, align: 'start', size: 'm' }),
            w('button', { label: L('See all products', 'Lihat semua produk'), href: '/en/products', style: 'outline', newTab: false, align: 'start', size: 's' }),
            w('whatsapp', { label: L('Chat on WhatsApp', 'Sembang di WhatsApp'), message: L('Hello, I would like a wholesale quote.', 'Helo, saya mahu sebut harga borong.'), align: 'start' }),
          ],
        ],
      ]),
      sec({ bg: 'olive-dark', align: 'center' }, [
        [
          12,
          [
            w('heading', { text: L('What our partners say', 'Kata rakan kongsi kami'), level: 'h2', size: 'l', align: 'center', color: 'default', kicker: L('Testimonials', 'Testimoni') }),
            w('divider', { style: 'gold', width: 's' }),
          ],
        ],
        [4, [w('quote', { text: L('Our customers ask for it by name now.', 'Pelanggan kami kini memintanya dengan nama.'), author: L('Aisyah', 'Aisyah'), place: L('Café owner, Shah Alam', 'Pemilik kafe, Shah Alam') })]],
        [4, [w('quote', { text: L('The best hamper item we stock.', 'Barang hamper terbaik kami.'), author: L('Daniel', 'Daniel'), place: L('', '') })]],
        [4, [w('iconList', { items: ALL_ICONS.slice(0, 5).map((icon, i) => ({ id: `d${i}`, icon, text: L(`Point ${icon}`, `Perkara ${icon}`) })), color: 'default', layout: 'list' })]],
      ]),
      sec({ bg: 'image', bgImage: 1, overlay: 50, layout: 'full', padY: 'xl', align: 'center' }, [
        [
          12,
          [
            w('heading', { text: L('From the grove to your shelf', 'Dari kebun ke rak anda'), level: 'h2', size: 'xl', align: 'center', color: 'white' }),
            w('text', { html: L('<p>Every bottle is traceable to its harvest.</p>', '<p>Setiap botol boleh dikesan ke tuaiannya.</p>'), align: 'center', color: 'white', size: 'l' }),
            w('button', { label: L('Our story', 'Kisah kami'), href: '/en/why-us', style: 'primary', newTab: false, align: 'center', size: 'm' }),
            w('button', { label: L('Outline on dark', 'Garis di gelap'), href: '/en/contact', style: 'outline', newTab: false, align: 'center', size: 's' }),
          ],
        ],
      ]),
      sec({ bg: 'white' }, [
        [
          8,
          [
            w('heading', { text: L('From our groves', 'Dari kebun kami'), level: 'h3', size: 'm', align: 'start', color: 'olive' }),
            w('gallery', { media: [3, 4, 5, 6, 7, 2], cols: 3, ratio: '4/3', lightbox: true }),
            w('spacer', { size: 's' }),
            w('gallery', { media: [5, 6, 7, 3], cols: 4, ratio: '1/1', lightbox: false }),
          ],
        ],
        [
          4,
          [
            w('video', { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', ratio: '16/9', title: L('Harvest film', 'Filem tuaian') }),
            w('divider', { style: 'leaf', width: 'full' }),
            w('video', { url: 'https://vimeo.com/76979871', ratio: '4/3', title: L('', '') }),
            w('divider', { style: 'line', width: 'm' }),
            w('image', { media: 4, alt: L('Pouring oil', 'Menuang minyak'), href: '/en/shop', ratio: '1/1', rounded: false, align: 'center', maxWidth: 240 }),
            w('heading', { text: L('Small print', 'Cetakan kecil'), level: 'h4', size: 's', align: 'end', color: 'brown' }),
            w('text', { html: L('<p>Prices exclude delivery.</p>', ''), align: 'end', color: 'gold', size: 's' }),
          ],
        ],
      ]),
      sec({ padY: 'm' }, [
        [
          12,
          [
            w('heading', { text: L('Infused collection', 'Koleksi infusi'), level: 'h2', size: 'l', align: 'start', color: 'default' }),
            w('products', { ids: ['blackseed', 'rosemary-basil', 'wild-thyme', 'not-a-product'], cols: 3, showTagline: true }),
            w('divider', { style: 'gold', width: 'm' }),
            w('products', { ids: ['classic', 'turmeric-black-pepper', 'reserve-is-not-in-the-catalogue', 'fennel-anise', 'blackseed'], cols: 4, showTagline: false }),
            w('products', { ids: ['fennel-anise', 'lavender-chamomile'], cols: 2, showTagline: true }),
          ],
        ],
      ]),
      sec({ bg: 'cream', anchor: 'enquiry', gap: 'l' }, [
        [
          6,
          [
            w('heading', { text: L('Questions', 'Soalan'), level: 'h2', size: 'm', align: 'start', color: 'default' }),
            w('faq', {
              items: [
                { id: 'q1', q: L('What is the minimum order?', 'Berapakah pesanan minimum?'), a: L('Twelve bottles, mixed sizes allowed.', 'Dua belas botol, saiz bercampur dibenarkan.') },
                { id: 'q2', q: L('Do you deliver to Sabah?', 'Adakah anda menghantar ke Sabah?'), a: L('Yes, across Malaysia.', 'Ya, ke seluruh Malaysia.') },
                { id: 'q3', q: L('Can I get custom labels?', ''), a: L('Ask us about corporate gift labels.', '') },
              ],
            }),
          ],
        ],
        [6, [w('form', { formId: 7, title: L('Request a quote', 'Minta sebut harga'), style: 'card' })]],
      ]),
      sec({ bg: 'olive', padY: 'm', align: 'center' }, [
        [3, [w('spacer', { size: 'l' })]],
        [6, [w('heading', { text: L('Newsletter', 'Surat berita'), level: 'h2', size: 's', align: 'center', color: 'default' }), w('form', { formId: 8, style: 'plain' })]],
        [3, []],
      ]),
      sec({ padY: 's' }, [
        [
          12,
          [
            w('heading', { text: L('Hidden on phones', 'Tersembunyi di telefon'), level: 'h3', size: 's', align: 'start', color: 'default' }, { mobile: true }),
            w('text', { html: L('<p>Hidden on desktop.</p>', '<p>Tersembunyi di desktop.</p>'), align: 'start', color: 'default', size: 'm' }, { desktop: true }),
            w('video', { url: 'https://cdn.example.com/clip.mp4', ratio: '16/9', title: L('Clip', 'Klip') }),
            w('image', { alt: L('', ''), ratio: 'auto', rounded: true, align: 'center', maxWidth: 0 }),
            w('form', { style: 'card' }),
            w('video', { url: 'javascript:alert(1)', ratio: '16/9', title: L('', '') }),
            w('button', { label: L('Bad link is neutralised', 'Pautan buruk'), href: 'javascript:alert(1)', style: 'primary', newTab: false, align: 'start', size: 'm' }),
          ],
        ],
      ], { tablet: true }),
    ],
  };
}

export function payloadFor(doc, slug, lang, pageId = 42) {
  return {
    id: pageId,
    slug,
    lang,
    langs: ['en', 'ms'],
    doc,
    media: MEDIA,
    forms: FORMS,
    seo: {
      title: doc.seo.metaTitle[lang],
      description: doc.seo.metaDescription[lang],
      canonical: `https://avoliveoil.com/${lang}/${slug}`,
      robots: 'index, follow',
      alternates: { en: `https://avoliveoil.com/en/${slug}`, ms: `https://avoliveoil.com/ms/${slug}` },
      ogImage: { url: 'https://avoliveoil.com/og/og-image.jpg', width: 1200, height: 630 },
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: doc.title[lang] }],
    },
  };
}

// ================================================================== landing (LP-SPEC §3)
// A landing-layout doc using every landing widget and variant: dark hero with photo +
// form, cards with / without a side photo on light and dark sections, both steps
// variants, all four band tones (edge to edge and boxed), badges, reviews with stats,
// stores, every CmsIcon, plus the site widgets a landing page typically mixes in.
// buildLandingDocNoForm(): light hero without a form, not edge to edge.

MEDIA[8] = img('HeroAVOliveOilBottleInTheField', [400, 800, 1200, 1600, 2000], 2000, 1116, 8, 'Arabian Village bottle in an olive field', 'Botol Arabian Village di ladang zaitun');

FORMS[9] = {
  id: 9,
  def: {
    fields: [
      { id: 'h1', name: 'name', type: 'text', label: L('Name', 'Nama'), placeholder: L('Your name', 'Nama anda'), required: true, width: 'full' },
      { id: 'h2', name: 'phone', type: 'tel', label: L('Phone (WhatsApp)', 'Telefon (WhatsApp)'), placeholder: L('+60…', '+60…'), required: true, width: 'half' },
      { id: 'h3', name: 'email', type: 'email', label: L('Email', 'E-mel'), placeholder: L('you@example.com', 'anda@contoh.com'), required: false, width: 'half' },
      {
        id: 'h4',
        name: 'interest',
        type: 'select',
        label: L('Interested in', 'Berminat dengan'),
        placeholder: L('Choose one', 'Pilih satu'),
        required: true,
        width: 'full',
        options: [
          opt('i1', 'Classic extra virgin olive oil', 'Minyak zaitun extra virgin klasik'),
          opt('i2', 'Infused Collection', 'Koleksi Infused'),
          opt('i3', 'Both', 'Kedua-duanya'),
          opt('i4', 'Wholesale for my business', 'Borong untuk perniagaan saya'),
        ],
      },
      { id: 'h5', name: 'message', type: 'textarea', label: L('Message', 'Mesej'), placeholder: L('Anything we should know?', 'Apa-apa yang perlu kami tahu?'), required: false, width: 'full' },
    ],
    submitLabel: L('Send my enquiry', 'Hantar pertanyaan saya'),
    successMessage: L('Thank you — your enquiry has been sent.', 'Terima kasih — pertanyaan anda telah dihantar.'),
  },
};

/** All 23 CmsIcon values (contracts CMS_ICONS). */
export const LANDING_ICONS = [
  'check', 'leaf', 'olive', 'drop', 'medal', 'star', 'truck', 'shield', 'heart', 'phone', 'mail', 'pin', 'clock',
  'whatsapp', 'store', 'gift', 'hand', 'sun', 'award', 'users', 'globe', 'bottle', 'chat',
];

const btn = (kind, label, extra = {}) => ({ id: id('b'), kind, label, style: 'primary', ...extra });
const WA = L('Hello, I would like to ask about your Palestinian olive oil.', 'Hai, saya ingin bertanya tentang minyak zaitun Palestin anda.');

export function buildLandingDoc() {
  n = 1000;
  return {
    schema: 1,
    layout: 'landing',
    title: L('Palestinian Extra Virgin Olive Oil', 'Minyak Zaitun Extra Virgin Palestin'),
    seo: {
      metaTitle: L('Palestinian Extra Virgin Olive Oil in Malaysia | Arabian Village', 'Minyak Zaitun Extra Virgin Palestin di Malaysia | Arabian Village'),
      metaDescription: L('First cold pressed olive oil from Palestine.', 'Minyak zaitun perahan sejuk pertama dari Palestin.'),
    },
    sections: [
      sec({ layout: 'full', padY: 'none', bg: 'olive-dark' }, [
        [
          12,
          [
            w('heroForm', {
              kicker: L('From the groves of Palestine', 'Dari kebun zaitun Palestin'),
              title: L('Palestinian extra virgin olive oil, first cold pressed', 'Minyak zaitun extra virgin Palestin, perahan sejuk pertama'),
              highlight: L('extra virgin olive oil', 'extra virgin Palestin'),
              sub: L(
                'The classic bottle and the six-flavour Infused Collection, sold in Malaysia by Berkat Madinah Store. Ask us on WhatsApp or leave your details.',
                'Botol klasik dan Koleksi Infused enam perisa, dijual di Malaysia oleh Berkat Madinah Store. Tanya kami di WhatsApp atau tinggalkan butiran anda.'
              ),
              chips: [
                { id: id('i'), text: L('First cold pressed', 'Perahan sejuk pertama') },
                { id: id('i'), text: L('Single origin: Palestine', 'Asal tunggal: Palestin') },
                { id: id('i'), text: L('250 ml & 500 ml', '250 ml & 500 ml') },
                { id: id('i'), text: L('Six infused flavours', 'Enam perisa infused') },
              ],
              buttons: [
                btn('whatsapp', L('WhatsApp us', 'WhatsApp kami'), { style: 'whatsapp', message: WA }),
                btn('form', L('Fill the form', 'Isi borang'), { style: 'outline' }),
              ],
              formId: 9,
              formTitle: L('Ask about our olive oil', 'Tanya tentang minyak zaitun kami'),
              formSub: L('Leave your details and the store will get back to you.', 'Tinggalkan butiran anda dan kedai akan menghubungi anda.'),
              media: 8,
              overlay: 50,
              tone: 'dark',
            }),
          ],
        ],
      ]),
      sec({ padY: 'l' }, [
        [
          12,
          [
            w('cards', {
              kicker: L('Why this oil', 'Mengapa minyak ini'),
              title: L('What makes it different', 'Apa yang membezakannya'),
              sub: L('Four things customers notice first.', 'Empat perkara yang pelanggan perasan dahulu.'),
              columns: 3,
              items: [
                { id: id('i'), icon: 'olive', title: L('Single origin', 'Asal tunggal'), text: L('Olives from Palestinian groves only.', 'Zaitun dari kebun Palestin sahaja.') },
                { id: id('i'), icon: 'drop', title: L('First cold pressed', 'Perahan sejuk pertama'), text: L('Pressed once, without heat.', 'Diperah sekali, tanpa haba.') },
                { id: id('i'), icon: 'leaf', title: L('Six infusions', 'Enam infusi'), text: L('Herb and spice flavours for every dish.', 'Perisa herba dan rempah untuk setiap hidangan.') },
                { id: id('i'), icon: 'bottle', title: L('Two sizes', 'Dua saiz'), text: L('250 ml and 500 ml bottles.', 'Botol 250 ml dan 500 ml.') },
              ],
              media: 2,
              mediaAlt: L('A bottle of Arabian Village olive oil in the field', 'Sebotol minyak zaitun Arabian Village di ladang'),
              mediaSide: 'right',
            }),
          ],
        ],
      ]),
      sec({ layout: 'full', padY: 'none', bg: 'bg' }, [
        [
          12,
          [
            w('ctaBand', {
              icon: 'shield',
              title: L('Not sure which bottle to choose?', 'Tidak pasti botol mana untuk dipilih?'),
              sub: L('Tell us how you cook and the store will suggest one.', 'Beritahu kami cara anda memasak dan kedai akan mencadangkan satu.'),
              buttons: [btn('form', L('Fill the form', 'Isi borang'), { style: 'gold' }), btn('store', L('Visit the store', 'Lawati kedai'), { style: 'outline', store: 'madinah', newTab: true })],
              tone: 'olive',
            }),
          ],
        ],
      ]),
      sec({ bg: 'cream', align: 'center' }, [
        [
          12,
          [
            w('steps', {
              kicker: L('How to order', 'Cara memesan'),
              title: L('Three steps to your bottle', 'Tiga langkah ke botol anda'),
              sub: L('', ''),
              items: [
                { id: id('i'), title: L('Message us', 'Hantar mesej'), text: L('On WhatsApp or with the form above.', 'Di WhatsApp atau dengan borang di atas.') },
                { id: id('i'), title: L('Choose', 'Pilih'), text: L('Classic, infused, or both.', 'Klasik, infused, atau kedua-duanya.') },
                { id: id('i'), title: L('Collect or order online', 'Ambil atau pesan dalam talian'), text: L('At the store, Shopee or TikTok Shop.', 'Di kedai, Shopee atau TikTok Shop.') },
              ],
              mediaAlt: L('', ''),
            }),
          ],
        ],
      ]),
      sec({ padY: 'l' }, [
        [
          12,
          [
            w('steps', {
              title: L('From the tree to the bottle', 'Dari pokok ke botol'),
              sub: L('How the oil is made.', 'Bagaimana minyak dihasilkan.'),
              items: [
                { id: id('i'), title: L('Hand picked', 'Dipetik tangan'), text: L('Olives are picked in the harvest season.', 'Zaitun dipetik pada musim tuai.') },
                { id: id('i'), title: L('Cold pressed', 'Perahan sejuk'), text: L('Pressed without heat.', 'Diperah tanpa haba.') },
                { id: id('i'), title: L('Bottled', 'Dibotolkan'), text: L('Sealed in dark glass.', 'Dimeterai dalam kaca gelap.') },
                { id: id('i'), title: L('Shipped to Malaysia', 'Dihantar ke Malaysia'), text: L('', '') },
              ],
              media: 4,
              mediaAlt: L('Pouring fresh olive oil', 'Menuang minyak zaitun segar'),
            }),
          ],
        ],
      ]),
      sec({ bg: 'olive-dark', align: 'center' }, [
        [
          12,
          [
            w('cards', {
              kicker: L('In the kitchen', 'Di dapur'),
              title: L('Made for everyday cooking', 'Untuk masakan harian'),
              sub: L('', ''),
              columns: 2,
              items: [
                { id: id('i'), icon: 'sun', title: L('Salads', 'Salad'), text: L('Drizzle it raw.', 'Siram mentah.') },
                { id: id('i'), icon: 'heart', title: L('Family meals', 'Hidangan keluarga'), text: L('One bottle for the whole table.', 'Satu botol untuk seluruh meja.') },
                { id: id('i'), icon: 'gift', title: L('Gifts', 'Hadiah'), text: L('A bottle that travels well.', 'Botol yang sesuai dijadikan hadiah.') },
                { id: id('i'), icon: 'hand', title: L('Dipping', 'Celup'), text: L('With bread and zaatar.', 'Dengan roti dan zaatar.') },
              ],
              media: 3,
              mediaAlt: L('Farmer picking olives', 'Petani memetik zaitun'),
              mediaSide: 'left',
            }),
            w('badges', {
              title: L('', ''),
              sub: L('', ''),
              items: [
                { id: id('i'), icon: 'award', title: L('Since 2010', 'Sejak 2010'), text: L('Berkat Madinah Store', 'Berkat Madinah Store') },
                { id: id('i'), icon: 'users', title: L('500,000+ customers', '500,000+ pelanggan'), text: L('Self-published', 'Diterbitkan sendiri') },
                { id: id('i'), icon: 'globe', title: L('Palestine to Malaysia', 'Palestin ke Malaysia') },
              ],
            }),
          ],
        ],
      ]),
      sec({ align: 'center' }, [
        [
          12,
          [
            w('products', { ids: ['classic', 'blackseed', 'rosemary-basil'], cols: 3, showTagline: true }),
          ],
        ],
      ]),
      sec({ align: 'center', bg: 'white' }, [
        [
          12,
          [
            w('stores', {
              kicker: L('Where to buy', 'Di mana membeli'),
              title: L('Buy it in store or online', 'Beli di kedai atau dalam talian'),
              sub: L('Three counters, the same oil.', 'Tiga kaunter, minyak yang sama.'),
              items: [
                { id: id('i'), store: 'madinah', title: L('Berkat Madinah Store', 'Berkat Madinah Store'), text: L('The official seller, Ampang and online.', 'Penjual rasmi, Ampang dan dalam talian.'), button: L('Visit the store', 'Lawati kedai') },
                { id: id('i'), store: 'shopee', title: L('Shopee', 'Shopee'), text: L('Order on Shopee.', 'Pesan di Shopee.'), button: L('Shop on Shopee', 'Beli di Shopee') },
                { id: id('i'), store: 'tiktok', title: L('TikTok Shop', 'TikTok Shop'), text: L('', ''), button: L('Shop on TikTok', 'Beli di TikTok') },
              ],
            }),
          ],
        ],
      ]),
      sec({ bg: 'cream', align: 'center' }, [
        [
          12,
          [
            w('badges', {
              kicker: L('Good to know', 'Baik untuk tahu'),
              title: L('Why customers trust the store', 'Mengapa pelanggan mempercayai kedai'),
              sub: L('', ''),
              items: [
                { id: id('i'), icon: 'store', title: L('Walk-in branches', 'Cawangan fizikal') },
                { id: id('i'), icon: 'truck', title: L('Shopee & TikTok delivery', 'Penghantaran Shopee & TikTok'), text: L('Nationwide', 'Seluruh negara') },
                { id: id('i'), icon: 'chat', title: L('WhatsApp help', 'Bantuan WhatsApp') },
                { id: id('i'), icon: 'medal', title: L('Palestinian origin', 'Asal Palestin') },
              ],
            }),
            w('iconList', { items: LANDING_ICONS.map((icon, i) => ({ id: `li${i}`, icon, text: L(icon, icon) })), color: 'default', layout: 'inline' }),
          ],
        ],
      ]),
      sec({ align: 'center' }, [
        [
          12,
          [
            w('reviews', {
              kicker: L('Reviews', 'Ulasan'),
              title: L('What customers say', 'Kata pelanggan'),
              stats: [
                { id: id('i'), value: L('2010', '2010'), label: L('Store founded', 'Kedai diasaskan') },
                { id: id('i'), value: L('500,000+', '500,000+'), label: L('Customers served (self-published)', 'Pelanggan dilayan (diterbitkan sendiri)') },
                { id: id('i'), value: L('7', '7'), label: L('Flavours', 'Perisa') },
              ],
              items: [
                { id: id('q'), quote: L('Hands down the richest, most authentic extra virgin olive oil I have tried.', 'Minyak zaitun extra virgin paling kaya yang pernah saya rasa — kualiti perahan pertama yang sebenar.'), name: L('Layla H.', 'Layla H.'), place: L('Amman', 'Amman') },
                { id: id('q'), quote: L('Beautifully packaged and even better in the kitchen — real cold-pressed flavor.', 'Tiba dengan pembungkusan cantik, dan rasanya di dapur lebih sedap daripada rupanya.'), name: L('Omar K.', 'Omar K.'), place: L('Kuala Lumpur', 'Kuala Lumpur') },
                { id: id('q'), quote: L('Our family everyday olive oil now — nothing else compares.', 'Kini satu-satunya minyak zaitun di meja keluarga kami — tiada tandingan.'), name: L('Sara M.', 'Sara M.'), place: L('Dubai', 'Dubai') },
              ],
            }),
          ],
        ],
      ]),
      sec({ bg: 'white', padY: 'm' }, [
        [6, [w('ctaBand', { icon: 'gift', title: L('Gift sets', 'Set hadiah'), sub: L('Ask about bottles for gifting.', 'Tanya tentang botol untuk hadiah.'), buttons: [btn('whatsapp', L('Ask on WhatsApp', 'Tanya di WhatsApp'), { style: 'whatsapp', message: WA }), btn('link', L('See the range', 'Lihat rangkaian'), { style: 'outline', href: '/en/products' })], tone: 'gold' })]],
        [6, [w('ctaBand', { icon: 'pin', title: L('Visit a branch', 'Lawati cawangan'), sub: L('See the bottles before you buy.', 'Lihat botol sebelum membeli.'), buttons: [btn('store', L('Shopee', 'Shopee'), { style: 'primary', store: 'shopee' }), btn('store', L('TikTok Shop', 'TikTok Shop'), { style: 'gold', store: 'tiktok' }), btn('link', L('Bad link', 'Pautan buruk'), { href: 'javascript:alert(1)' })], tone: 'cream' })]],
      ]),
      sec({ bg: 'cream' }, [
        [
          12,
          [
            w('heading', { text: L('Questions', 'Soalan'), level: 'h2', size: 'l', align: 'center', color: 'default' }),
            w('faq', { items: [{ id: 'lq1', q: L('Where is the oil from?', 'Dari mana minyak ini?'), a: L('Palestine.', 'Palestin.') }] }),
          ],
        ],
      ]),
      sec({ layout: 'full', padY: 'none' }, [
        [
          12,
          [
            w('ctaBand', {
              icon: 'whatsapp',
              title: L('Ready to taste it?', 'Sedia untuk merasainya?'),
              sub: L('Message the store or leave your details.', 'Hantar mesej kepada kedai atau tinggalkan butiran anda.'),
              buttons: [btn('whatsapp', L('WhatsApp us', 'WhatsApp kami'), { style: 'whatsapp', message: WA }), btn('form', L('Fill the form', 'Isi borang'), { style: 'gold' })],
              tone: 'dark',
            }),
          ],
        ],
      ]),
    ],
  };
}

export function buildLandingDocNoForm() {
  n = 2000;
  return {
    schema: 1,
    layout: 'landing',
    title: L('Infused olive oils', 'Minyak zaitun infused'),
    seo: { metaTitle: L('Infused olive oils | Arabian Village', 'Minyak zaitun infused | Arabian Village'), metaDescription: L('Six flavours.', 'Enam perisa.') },
    sections: [
      sec({ padY: 's' }, [
        [
          12,
          [
            w('heroForm', {
              title: L('Six infused olive oils', 'Enam minyak zaitun infused'),
              highlight: L('NOT IN THE TITLE', 'TIADA'),
              sub: L('Rosemary, black seed, thyme and more.', 'Rosmarin, jintan hitam, thyme dan banyak lagi.'),
              chips: [{ id: id('i'), text: L('Six flavours', 'Enam perisa') }],
              buttons: [btn('whatsapp', L('WhatsApp us', 'WhatsApp kami'), { style: 'whatsapp' }), btn('form', L('Fill the form', 'Isi borang'), { style: 'outline' })],
              formTitle: L('Unused', 'Tidak digunakan'),
              formSub: L('', ''),
              overlay: 40,
              tone: 'light',
            }),
          ],
        ],
      ]),
      sec({ bg: 'cream', align: 'center' }, [[12, [w('reviews', { title: L('Reviews', 'Ulasan'), stats: [], items: [{ id: id('q'), quote: L('Lovely.', 'Sedap.'), name: L('A.', 'A.'), place: L('', '') }] })]]]),
    ],
  };
}
