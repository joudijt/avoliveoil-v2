/**
 * Starter content for new pages and the "Sections" library. Every factory builds fresh
 * ids through doc.ts so two inserts of the same template never share ids.
 */
import type { CmsPageDoc, CtaButton, HideOn, Localized, Section, SectionSettings, Widget, WidgetType } from '../../cms/contracts';
import { createColumn, createCtaButton, createSection, createWidget, emptyDoc, newId } from '../../cms/doc';
import storeFacts from '../../data/storeFacts.json';

const L = (en: string, ms: string): Localized => ({ en, ms });

type SettingsOf<T extends WidgetType> = Extract<Widget, { type: T }>['settings'];

function w<T extends WidgetType>(type: T, s: Partial<SettingsOf<T>> = {}, hide?: HideOn): Widget {
  const base = createWidget(type);
  return { ...base, settings: { ...base.settings, ...s }, ...(hide ? { hide } : {}) } as Widget;
}

function sec(settings: Partial<SectionSettings>, ...cols: { span: number; widgets: Widget[] }[]): Section {
  const s = createSection([12], settings);
  return { ...s, columns: cols.map((c) => createColumn(c.span, c.widgets)) };
}

const col = (span: number, ...widgets: Widget[]) => ({ span, widgets });

/* Branch count + hours from storeFacts.json (FORGE PRODUCTS-R1): hours are named ONLY for
   the branches whose hours the owner gave; the rest say to ask on WhatsApp. */
const BRANCHES = storeFacts.branches;
const joinList = (items: string[], and: string) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
const WITH_HOURS = BRANCHES.filter((b) => b.hours);
const HOURS_TEXT = L(
  WITH_HOURS.length
    ? `${joinList(WITH_HOURS.map((b) => b.labelEn), 'and')}: ${WITH_HOURS[0].hours!.displayEn}. Other branches: ask on WhatsApp.`
    : 'Opening hours: ask on WhatsApp.',
  WITH_HOURS.length
    ? `${joinList(WITH_HOURS.map((b) => b.labelMs), 'dan')}: ${WITH_HOURS[0].hours!.displayMs}. Cawangan lain: tanya melalui WhatsApp.`
    : 'Waktu operasi: tanya melalui WhatsApp.'
);

export interface TemplateCtx {
  /** a few catalogue product ids, so product widgets are not empty */
  productIds: string[];
}

// ---------------------------------------------------------------- sections library

export interface SectionTemplate {
  id: string;
  name: string;
  description: string;
  /** 'landing' = listed under "Landing sections" (the ad-landing widgets) */
  group?: 'landing';
  make: (ctx: TemplateCtx) => Section;
}

const hero = () =>
  sec(
    { bg: 'olive-dark', padY: 'xl', align: 'center', layout: 'full' },
    col(
      12,
      w('heading', { kicker: L('From the groves of Palestine', 'Dari ladang zaitun Palestin'), text: L('Pure olive oil, pressed the traditional way', 'Minyak zaitun tulen, diperah secara tradisional'), level: 'h1', size: 'xl', align: 'center', color: 'white' }),
      w('text', { html: L('<p>Cold-pressed in Palestine and bottled with care, for kitchens across Malaysia.</p>', '<p>Diperah sejuk di Palestin dan dibotolkan dengan teliti, untuk dapur di seluruh Malaysia.</p>'), align: 'center', color: 'white', size: 'l' }),
      w('button', { label: L('Shop now', 'Beli sekarang'), href: '/en/shop', style: 'gold', align: 'center', size: 'l' })
    )
  );

const textImage = () =>
  sec(
    { bg: 'cream', padY: 'l', valign: 'center', gap: 'l' },
    col(
      6,
      w('heading', { kicker: L('Our story', 'Kisah kami'), text: L('Harvested by hand, every season', 'Dituai dengan tangan, setiap musim'), level: 'h2', size: 'l' }),
      w('text', {
        html: L(
          '<p>Our olives are picked by hand at the right moment and pressed within hours. No heat, no chemicals, no additives — just first cold pressed extra virgin olive oil.</p>',
          '<p>Buah zaitun kami dipetik dengan tangan pada masa yang tepat dan diperah dalam beberapa jam. Tiada apa yang ditambah dan tiada apa yang dibuang — hanya rasa minyak zaitun extra virgin yang asli.</p>'
        ),
      }),
      w('button', { label: L('Why choose us', 'Mengapa pilih kami'), href: '/en/why-us', style: 'outline' })
    ),
    col(6, w('image', { alt: L('Olive harvest', 'Penuaian zaitun'), ratio: '4/3' }))
  );

const features = () =>
  sec(
    { bg: 'bg', padY: 'l', align: 'center' },
    col(12, w('heading', { text: L('Why families choose us', 'Mengapa keluarga memilih kami'), level: 'h2', size: 'l', align: 'center' })),
    col(
      4,
      w('heading', { text: L('Cold-pressed', 'Perahan sejuk'), level: 'h3', size: 's', align: 'center', color: 'olive' }),
      w('text', { html: L('<p>First cold pressed within hours of picking — no heat, no chemicals.</p>', '<p>Perahan sejuk pertama dalam beberapa jam selepas dipetik — tanpa haba, tanpa bahan kimia.</p>'), align: 'center', size: 's' })
    ),
    col(
      4,
      w('heading', { text: L('100% Palestinian', '100% Palestin'), level: 'h3', size: 's', align: 'center', color: 'olive' }),
      w('text', { html: L('<p>From centuries-old groves in Palestine — no blending, no additives.</p>', '<p>Dari ladang zaitun berusia berabad-abad di Palestin — tanpa campuran, tanpa bahan tambahan.</p>'), align: 'center', size: 's' })
    ),
    col(
      4,
      w('heading', { text: L('Easy to buy', 'Mudah dibeli'), level: 'h3', size: 's', align: 'center', color: 'olive' }),
      w('text', { html: L('<p>At Berkat Madinah Store branches in Selangor, or online through their Shopee and TikTok Shop counters.</p>', '<p>Di cawangan Berkat Madinah Store di Selangor, atau dalam talian melalui kaunter Shopee dan TikTok Shop mereka.</p>'), align: 'center', size: 's' })
    )
  );

const cta = () =>
  sec(
    { bg: 'olive', padY: 'l', align: 'center' },
    col(
      12,
      w('heading', { text: L('Taste the difference today', 'Rasai perbezaannya hari ini'), level: 'h2', size: 'l', align: 'center', color: 'white' }),
      w('text', { html: L('<p>Buy at Berkat Madinah Store or ask us anything on WhatsApp.</p>', '<p>Beli di Berkat Madinah Store atau tanya kami apa sahaja di WhatsApp.</p>'), align: 'center', color: 'white' }),
      w('whatsapp', { label: L('Chat on WhatsApp', 'Berbual di WhatsApp'), message: L('Hello, I would like to order olive oil.', 'Hai, saya ingin memesan minyak zaitun.'), align: 'center' })
    )
  );

const faq = () =>
  sec(
    { bg: 'cream', padY: 'l' },
    col(
      12,
      w('heading', { text: L('Frequently asked questions', 'Soalan lazim'), level: 'h2', size: 'l', align: 'center' }),
      w('faq', {
        items: [
          { id: newId('q'), q: L('Is your olive oil extra virgin?', 'Adakah minyak zaitun anda extra virgin?'), a: L('Yes. It is first cold pressed extra virgin olive oil — 100% Palestinian, no blending, no additives.', 'Ya. Ia minyak zaitun extra virgin perahan sejuk pertama — 100% Palestin, tanpa campuran, tanpa bahan tambahan.') },
          { id: newId('q'), q: L('How should I store it?', 'Bagaimana cara menyimpannya?'), a: L('Keep the bottle tightly closed, away from sunlight and heat.', 'Tutup botol dengan rapat, jauhkan daripada cahaya matahari dan haba.') },
          { id: newId('q'), q: L('Do you deliver, or do I have to visit a branch?', 'Adakah anda menghantar, atau saya perlu ke cawangan?'), a: L(`Both. All ${BRANCHES.length} branches are in Selangor (stock can vary by branch — WhatsApp first), and the Shopee and TikTok Shop counters deliver nationwide.`, `Boleh kedua-duanya. Kesemua ${BRANCHES.length} cawangan berada di Selangor (stok mungkin berbeza mengikut cawangan — WhatsApp dahulu), dan kaunter Shopee serta TikTok Shop menghantar ke seluruh negara.`) },
        ],
      })
    )
  );

const quotes = () =>
  sec(
    { bg: 'bg', padY: 'l' },
    col(12, w('heading', { text: L('What our customers say', 'Kata pelanggan kami'), level: 'h2', size: 'l', align: 'center' })),
    col(6, w('quote', { text: L('[Paste a real customer review here.]', '[Tampal ulasan pelanggan sebenar di sini.]'), author: L('[Customer name]', '[Nama pelanggan]'), place: L('[Town]', '[Bandar]') })),
    col(6, w('quote', { text: L('[Paste a real customer review here.]', '[Tampal ulasan pelanggan sebenar di sini.]'), author: L('[Customer name]', '[Nama pelanggan]'), place: L('[Town]', '[Bandar]') }))
  );

const contactForm = () =>
  sec(
    { bg: 'cream', padY: 'l', gap: 'l' },
    col(
      5,
      w('heading', { text: L('Send us a message', 'Hantar mesej kepada kami'), level: 'h2', size: 'l' }),
      w('text', { html: L('<p>Questions about our oils, wholesale or events? Leave your details and we will get back to you.</p>', '<p>Ada soalan tentang minyak kami, borong atau acara? Tinggalkan butiran anda dan kami akan menghubungi anda.</p>') }),
      w('iconList', {
        items: [
          { id: newId('i'), icon: 'clock', text: HOURS_TEXT },
          { id: newId('i'), icon: 'pin', text: L('Berkat Madinah, Selangor', 'Berkat Madinah, Selangor') },
        ],
      })
    ),
    col(7, w('form', { style: 'card' }))
  );

const gallery = () =>
  sec(
    { bg: 'bg', padY: 'l' },
    col(12, w('heading', { text: L('From the groves', 'Dari ladang zaitun'), level: 'h2', size: 'l', align: 'center' }), w('gallery', { cols: 3, ratio: '4/3' }))
  );

const products = (ctx: TemplateCtx) =>
  sec(
    { bg: 'cream', padY: 'l' },
    col(
      12,
      w('heading', { text: L('Our infused olive oils', 'Minyak zaitun infused kami'), level: 'h2', size: 'l', align: 'center' }),
      w('products', { ids: ctx.productIds.slice(0, 3), cols: 3 })
    )
  );

// ---------------------------------------------------------------- landing sections (LP-SPEC §5)
// Each is ONE widget in a full-width, one-column section. Copy is neutral: words in [brackets]
// are for the owner to replace (the publish dialog lists any left), and nothing states a fact
// about the product — no prices, claims, certifications or delivery promises.

/** a full-width one-column section holding one landing widget; hero and band own their padding */
const lp = (bg: SectionSettings['bg'], widget: Widget, padY: SectionSettings['padY'] = 'l') => sec({ layout: 'full', bg, padY }, col(12, widget));

const btn = (kind: CtaButton['kind']) => createCtaButton(kind);

const lpHeroForm = () =>
  lp(
    'olive-dark',
    w('heroForm', {
      kicker: L('[Short line above the headline]', '[Baris pendek di atas tajuk]'),
      title: L('[Your headline] with a few words in gold', '[Tajuk anda] dengan beberapa perkataan emas'),
      highlight: L('a few words in gold', 'beberapa perkataan emas'),
      sub: L('[One or two sentences: what the visitor gets and why it matters to them.]', '[Satu atau dua ayat: apa yang pelawat dapat dan mengapa ia penting kepada mereka.]'),
      chips: [
        { id: newId('i'), text: L('[First reason to choose you]', '[Sebab pertama memilih anda]') },
        { id: newId('i'), text: L('[Second reason]', '[Sebab kedua]') },
        { id: newId('i'), text: L('[Third reason]', '[Sebab ketiga]') },
      ],
      buttons: [btn('whatsapp'), btn('form')],
    }),
    'none'
  );

const lpCards = (mediaSide: 'none' | 'right' = 'none') =>
  lp(
    'cream',
    w('cards', {
      kicker: L('Why choose us', 'Mengapa pilih kami'),
      title: L('[What makes your product different]', '[Apa yang membezakan produk anda]'),
      sub: L('[A short introduction to the points below.]', '[Pengenalan ringkas kepada perkara di bawah.]'),
      columns: mediaSide === 'none' ? 3 : 2,
      mediaSide,
      items: (['leaf', 'drop', 'olive', 'medal'] as const).slice(0, mediaSide === 'none' ? 3 : 4).map((icon, i) => ({
        id: newId('i'),
        icon,
        title: L(`[Point ${i + 1}]`, `[Perkara ${i + 1}]`),
        text: L('[Describe this point in a sentence or two.]', '[Terangkan perkara ini dalam satu atau dua ayat.]'),
      })),
    })
  );

const lpSteps = () =>
  lp(
    'bg',
    w('steps', {
      kicker: L('How to order', 'Cara membuat pesanan'),
      title: L('How it works', 'Bagaimana ia berfungsi'),
      sub: L('', ''),
      items: [
        { id: newId('i'), title: L('Contact us', 'Hubungi kami'), text: L('[How the visitor reaches you: WhatsApp or the form.]', '[Cara pelawat menghubungi anda: WhatsApp atau borang.]') },
        { id: newId('i'), title: L('[Step two]', '[Langkah kedua]'), text: L('[What happens after they contact you.]', '[Apa yang berlaku selepas mereka menghubungi anda.]') },
        { id: newId('i'), title: L('[Step three]', '[Langkah ketiga]'), text: L('[How they receive or collect their order.]', '[Cara mereka menerima atau mengambil pesanan.]') },
      ],
    })
  );

const lpCtaBand = (variant: 'mid' | 'final' = 'mid') =>
  lp(
    variant === 'mid' ? 'olive' : 'olive-dark',
    variant === 'mid'
      ? w('ctaBand', {
          icon: 'whatsapp',
          title: L('Questions before you order?', 'Ada soalan sebelum membuat pesanan?'),
          sub: L('Message us on WhatsApp or fill in the form.', 'Hantar mesej kepada kami di WhatsApp atau isi borang.'),
          buttons: [btn('whatsapp'), btn('form')],
          tone: 'olive',
        })
      : w('ctaBand', {
          icon: 'chat',
          title: L('Ready to order?', 'Sedia untuk membuat pesanan?'),
          sub: L('Message us on WhatsApp, fill in the form, or buy at the store.', 'Hantar mesej di WhatsApp, isi borang, atau beli di kedai.'),
          buttons: [btn('whatsapp'), btn('form'), btn('store')],
          tone: 'dark',
        }),
    'none'
  );

const lpBadges = () =>
  lp(
    'cream',
    w('badges', {
      title: L('[Why customers trust you]', '[Mengapa pelanggan mempercayai anda]'),
      sub: L('', ''),
      items: (['award', 'leaf', 'users', 'store'] as const).map((icon, i) => ({ id: newId('i'), icon, title: L(`[Badge ${i + 1}]`, `[Lencana ${i + 1}]`) })),
    })
  );

const lpReviews = () => lp('bg', w('reviews', { kicker: L('Reviews', 'Ulasan'), title: L('What customers say', 'Kata pelanggan') }));

const lpStores = () => lp('cream', w('stores', { kicker: L('Where to buy', 'Di mana untuk membeli'), title: L('Buy online or at the store', 'Beli dalam talian atau di kedai'), sub: L('', '') }));

const lpFaq = () =>
  sec(
    { bg: 'cream', padY: 'l' },
    col(
      12,
      w('heading', { text: L('Questions and answers', 'Soalan dan jawapan'), level: 'h2', size: 'l', align: 'center' }),
      w('faq', {
        items: [1, 2, 3].map(() => ({
          id: newId('q'),
          q: L('[A question customers often ask]', '[Soalan yang sering ditanya pelanggan]'),
          a: L('[The answer, in one or two sentences.]', '[Jawapannya, dalam satu atau dua ayat.]'),
        })),
      })
    )
  );

export const SECTION_TEMPLATES: SectionTemplate[] = [
  { id: 'hero', name: 'Hero', description: 'Big headline, short text and a button', make: hero },
  { id: 'text-image', name: 'Text + image', description: 'Story text beside a photo', make: textImage },
  { id: 'features', name: 'Three features', description: 'Three short selling points', make: features },
  { id: 'cta', name: 'Call to action band', description: 'Coloured band with WhatsApp button', make: cta },
  { id: 'faq', name: 'FAQ', description: 'Questions and answers (shows in Google)', make: faq },
  { id: 'quotes', name: 'Testimonials', description: 'Two customer quotes', make: quotes },
  { id: 'contact', name: 'Contact form', description: 'Text with a form beside it', make: contactForm },
  { id: 'gallery', name: 'Gallery', description: 'Grid of photos', make: gallery },
  { id: 'products', name: 'Products', description: 'Your bottles with links to buy', make: products },
  { id: 'lp-hero-form', group: 'landing', name: 'Hero with form', description: 'Headline, WhatsApp + form buttons, ticks and a form card', make: lpHeroForm },
  { id: 'lp-cards', group: 'landing', name: 'Icon cards', description: 'Selling points as cards with icons', make: () => lpCards() },
  { id: 'lp-steps', group: 'landing', name: 'Steps', description: 'Numbered steps, e.g. how to order', make: lpSteps },
  { id: 'lp-cta-band', group: 'landing', name: 'Call-to-action band', description: 'Coloured band with WhatsApp and form buttons', make: () => lpCtaBand() },
  { id: 'lp-badges', group: 'landing', name: 'Badges', description: 'Four small tiles with icons', make: lpBadges },
  { id: 'lp-reviews', group: 'landing', name: 'Reviews', description: 'Customer quotes (paste real ones)', make: lpReviews },
  { id: 'lp-stores', group: 'landing', name: 'Where to buy', description: 'Berkat Madinah Store, Shopee and TikTok Shop', make: lpStores },
];

/** Drag/drop template id for a plain column layout, e.g. "layout:6-6". */
export const layoutTemplateId = (layout: number[]) => 'layout:' + layout.join('-');

export function sectionFromTemplateId(id: string, ctx: TemplateCtx): Section | null {
  if (id.startsWith('layout:')) {
    const spans = id
      .slice(7)
      .split('-')
      .map((n) => parseInt(n, 10))
      .filter((n) => n >= 1 && n <= 12);
    return spans.length ? createSection(spans) : null;
  }
  return SECTION_TEMPLATES.find((t) => t.id === id)?.make(ctx) ?? null;
}

// ---------------------------------------------------------------- page templates

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  /** small schematic for the picker: section bands, darkest first */
  bands: ('dark' | 'olive' | 'cream' | 'bg')[];
  /** shown as a small label on the picker card */
  badge?: string;
  make: (title: Localized, ctx: TemplateCtx) => CmsPageDoc;
}

function page(title: Localized, seoDesc: Localized, sections: Section[], layout?: CmsPageDoc['layout']): CmsPageDoc {
  const d = emptyDoc(title);
  return {
    ...d,
    ...(layout ? { layout } : {}),
    seo: { metaTitle: { en: title.en ? title.en + ' | Arabian Village Olive Oil' : '', ms: title.ms ? title.ms + ' | Minyak Zaitun Arabian Village' : '' }, metaDescription: seoDesc },
    sections,
  };
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'blank',
    name: 'Blank page',
    description: 'Start from an empty page',
    bands: [],
    make: (t) => page(t, { en: '', ms: '' }, []),
  },
  {
    id: 'landing',
    name: 'Landing page',
    description: 'Hero, three features and a call to action',
    bands: ['dark', 'bg', 'cream', 'olive'],
    make: (t, ctx) =>
      page(
        t,
        L('First cold pressed Palestinian extra virgin olive oil, sold in Malaysia through Berkat Madinah Store.', 'Minyak zaitun extra virgin Palestin perahan sejuk pertama, dijual di Malaysia melalui Berkat Madinah Store.'),
        [hero(), features(), products(ctx), cta()]
      ),
  },
  {
    id: 'ad-landing',
    name: 'Ad landing page (form + WhatsApp)',
    description: 'For ads: hero with a form, selling points, shops, reviews and FAQ',
    badge: 'Landing',
    bands: ['dark', 'cream', 'olive', 'bg', 'cream', 'bg', 'cream', 'dark'],
    make: (t, ctx) =>
      page(
        t,
        L('[Describe the page for Google in 120–155 characters: what you offer and how to order.]', '[Terangkan halaman untuk Google dalam 120–155 aksara: apa yang anda tawarkan dan cara membuat pesanan.]'),
        [lpHeroForm(), lpCards('right'), lpCtaBand('mid'), lpSteps(), products(ctx), lpStores(), gallery(), lpBadges(), lpReviews(), lpFaq(), lpCtaBand('final')],
        'landing'
      ),
  },
  {
    id: 'about',
    name: 'About / our story',
    description: 'Tell the story behind the oil',
    bands: ['cream', 'bg', 'cream', 'olive'],
    make: (t) =>
      page(t, L('The family story behind Arabian Village olive oil — from the groves of Palestine to your table.', 'Kisah keluarga di sebalik minyak zaitun Arabian Village — dari ladang di Palestin ke meja anda.'), [
        sec(
          { bg: 'cream', padY: 'xl', align: 'center' },
          col(
            12,
            w('heading', { kicker: L('About us', 'Tentang kami'), text: L('[Your story headline]', '[Tajuk kisah anda]'), level: 'h1', size: 'xl', align: 'center' }),
            w('text', { html: L('<p>[Tell your story here — where the olives come from and who brings them to Malaysia.]</p>', '<p>[Ceritakan kisah anda di sini — dari mana zaitun datang dan siapa membawanya ke Malaysia.]</p>'), align: 'center', size: 'l' }),
            w('divider', { style: 'leaf' })
          )
        ),
        textImage(),
        quotes(),
        cta(),
      ]),
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Short intro with a contact form',
    bands: ['cream', 'cream', 'bg'],
    make: (t) =>
      page(t, L('Contact Arabian Village — questions about our olive oil, wholesale orders and events.', 'Hubungi Arabian Village — soalan tentang minyak zaitun, pesanan borong dan acara.'), [
        sec(
          { bg: 'bg', padY: 'l', align: 'center' },
          col(12, w('heading', { text: L('We would love to hear from you', 'Kami ingin mendengar daripada anda'), level: 'h1', size: 'xl', align: 'center' }))
        ),
        contactForm(),
      ]),
  },
  {
    id: 'promo',
    name: 'Product promo',
    description: 'Hero photo, products and FAQ',
    bands: ['bg', 'cream', 'cream', 'olive'],
    make: (t, ctx) =>
      page(t, L('Discover our infused extra virgin olive oils — natural herbs and spices, nothing artificial.', 'Temui minyak zaitun extra virgin infused kami — herba dan rempah asli, tiada bahan tiruan.'), [
        sec(
          { bg: 'bg', padY: 'l', valign: 'center', gap: 'l' },
          col(
            6,
            w('heading', { kicker: L('New flavours', 'Perisa baharu'), text: L('Infused olive oils for everyday cooking', 'Minyak zaitun infused untuk masakan harian'), level: 'h1', size: 'xl' }),
            w('text', { html: L('<p>Rosemary, black seed, turmeric and more — extra virgin olive oil slow-infused with whole dried botanicals.</p>', '<p>Rosmari, habbatus sauda, kunyit dan banyak lagi — minyak zaitun extra virgin yang diinfus perlahan dengan herba kering.</p>'), size: 'l' }),
            w('button', { label: L('See all flavours', 'Lihat semua perisa'), href: '/en/products', style: 'primary', size: 'l' })
          ),
          col(6, w('image', { alt: L('Infused olive oil bottles', 'Botol minyak zaitun infused'), ratio: '4/3' }))
        ),
        products(ctx),
        faq(),
        cta(),
      ]),
  },
  {
    id: 'text',
    name: 'Simple text page',
    description: 'A heading and text — for policies or notices',
    bands: ['bg'],
    make: (t) =>
      page(t, L('', ''), [
        sec(
          { bg: 'bg', padY: 'l' },
          col(
            12,
            w('heading', { text: { en: t.en || 'Page title', ms: t.ms }, level: 'h1', size: 'xl' }),
            w('text', {
              html: L(
                '<p>Write your text here. Use headings to break long text into parts, and bullet points for lists.</p><h2>A sub-heading</h2><p>More text.</p>',
                '<p>Tulis teks anda di sini. Gunakan tajuk kecil untuk membahagikan teks yang panjang, dan senarai berbutir untuk senarai.</p><h2>Tajuk kecil</h2><p>Teks tambahan.</p>'
              ),
            })
          )
        ),
      ]),
  },
  {
    id: 'event',
    name: 'Event / offer',
    description: 'Announce a sale, a market or a season',
    bands: ['olive', 'cream', 'bg', 'dark'],
    make: (t, ctx) =>
      page(t, L('A limited-time offer on Arabian Village extra virgin olive oil. While stocks last.', 'Tawaran masa terhad untuk minyak zaitun extra virgin Arabian Village. Selagi stok masih ada.'), [
        sec(
          { bg: 'olive', padY: 'xl', align: 'center' },
          col(
            12,
            w('heading', { kicker: L('Limited time', 'Masa terhad'), text: L('[Your offer headline — e.g. Harvest season offer]', '[Tajuk tawaran anda — cth. Tawaran musim tuai]'), level: 'h1', size: 'xl', align: 'center', color: 'white' }),
            w('text', { html: L('<p>[Dates and where the offer applies — replace before publishing.]</p>', '<p>[Tarikh dan tempat tawaran — tukar sebelum diterbitkan.]</p>'), align: 'center', color: 'white', size: 'l' }),
            w('button', { label: L('Shop the sale', 'Beli sekarang'), href: '/en/shop', style: 'gold', align: 'center', size: 'l' })
          )
        ),
        sec(
          { bg: 'cream', padY: 'l' },
          col(
            12,
            w('iconList', {
              layout: 'inline',
              items: [
                { id: newId('i'), icon: 'medal', text: L('First cold pressed', 'Perahan sejuk pertama') },
                { id: newId('i'), icon: 'truck', text: L('[Your delivery terms]', '[Syarat penghantaran anda]') },
                { id: newId('i'), icon: 'shield', text: L('No additives', 'Tanpa bahan tambahan') },
              ],
            })
          )
        ),
        products(ctx),
        sec(
          { bg: 'olive-dark', padY: 'l', align: 'center' },
          col(
            12,
            w('heading', { text: L('Questions about the offer?', 'Ada soalan tentang tawaran ini?'), level: 'h2', size: 'm', align: 'center', color: 'white' }),
            w('whatsapp', { label: L('Ask us on WhatsApp', 'Tanya kami di WhatsApp'), message: L('Hello, I would like to ask about the harvest sale.', 'Hai, saya ingin bertanya tentang jualan musim tuai.'), align: 'center' })
          )
        ),
      ]),
  },
];
