/**
 * Starter content for new pages and the "Sections" library. Every factory builds fresh
 * ids through doc.ts so two inserts of the same template never share ids.
 */
import type { CmsPageDoc, HideOn, Localized, Section, SectionSettings, Widget, WidgetType } from '../../cms/contracts';
import { createColumn, createSection, createWidget, emptyDoc, newId } from '../../cms/doc';

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

export interface TemplateCtx {
  /** a few catalogue product ids, so product widgets are not empty */
  productIds: string[];
}

// ---------------------------------------------------------------- sections library

export interface SectionTemplate {
  id: string;
  name: string;
  description: string;
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
          { id: newId('q'), q: L('Do you deliver, or do I have to visit a branch?', 'Adakah anda menghantar, atau saya perlu ke cawangan?'), a: L('Both. The two branches are in Selangor, and the Shopee and TikTok Shop counters deliver nationwide.', 'Kedua-duanya. Dua cawangan berada di Selangor, dan kaunter Shopee serta TikTok Shop menghantar ke seluruh negara.') },
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
          { id: newId('i'), icon: 'clock', text: L('8:00 am – 12:00 midnight, Monday through Sunday', '8:00 pagi – 12:00 tengah malam, Isnin hingga Ahad') },
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
  make: (title: Localized, ctx: TemplateCtx) => CmsPageDoc;
}

function page(title: Localized, seoDesc: Localized, sections: Section[]): CmsPageDoc {
  const d = emptyDoc(title);
  return {
    ...d,
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
