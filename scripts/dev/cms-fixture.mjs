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
                '<p>Kami membotol dalam <em>kelompok kecil</em>. <a href="/ms/products">Lihat produk</a>.</p><ul><li>Pesanan minimum 12 botol</li></ul>'
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
