/**
 * DEV ONLY — in-memory mock of the PHP JSON API so the admin panel can be driven and
 * screenshotted without PHP. Never imported by production code; not deployed.
 *
 *   node src/admin/__dev__/mock-api.mjs            (listens on 127.0.0.1:4183)
 *   MOCK_SETUP=1 node …                            (starts with "needs setup")
 *
 * Shapes follow src/admin/api.ts (the contract B2 must match). Login: any listed user
 * email + password "olive-oil-2026".
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { randomBytes } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const OPT = join(ROOT, 'src', 'assets', 'opt');
const PORT = Number(process.env.MOCK_PORT || 4183);
const BUILD = '20261001120000-mock';
const PASSWORD = 'olive-oil-2026';
const now = () => new Date().toISOString();
const ago = (min) => new Date(Date.now() - min * 60000).toISOString();

// ---------------------------------------------------------------- data

const db = {
  needsSetup: process.env.MOCK_SETUP === '1',
  users: [
    { id: 1, email: 'tarek@avoliveoil.com', name: 'Tarek Sammad', isActive: true, createdAt: ago(90000), lastLoginAt: ago(30) },
    { id: 2, email: 'aisha@avoliveoil.com', name: 'Aisha Rahman', isActive: true, createdAt: ago(40000), lastLoginAt: ago(60 * 26) },
    { id: 3, email: 'intern@avoliveoil.com', name: 'Daniel Tan', isActive: false, createdAt: ago(20000), lastLoginAt: null },
  ],
  sessions: new Map(),
  settings: { systemEmail: 'tarek@avoliveoil.com', mailCapPerHour: 40 },
  media: [],
  pages: [],
  revisions: new Map(),
  forms: [],
  submissions: [],
  overrides: { en: {}, ms: {} }, // key -> {draft, published, kind, updatedAt, userId}
  siteRevisions: [],
  dirty: new Set(),
  seq: { media: 100, page: 10, form: 10, sub: 100, rev: 1000, pub: 1 },
};

// media from the real optimised photos
const MEDIA_SRC = [
  ['OliveGroveSunsetHero', 'Olive grove at sunset', 'Ladang zaitun ketika matahari terbenam'],
  ['FarmerPickingOliveOfTheTreeInTheField', 'Farmer picking olives by hand', 'Petani memetik buah zaitun dengan tangan'],
  ['HeroAVOliveOilBottleInTheField', 'Bottle of olive oil in the field', 'Botol minyak zaitun di ladang'],
  ['AVOliveOilInTheField', 'Arabian Village olive oil among the trees', ''],
  ['FarmerPouringOliveOilInTheField', 'Pouring fresh olive oil', 'Menuang minyak zaitun segar'],
  ['journey-07-bottling', 'Bottling the oil', 'Membotolkan minyak'],
  ['malaysian-woman-bottle-kampung', 'Customer holding a bottle at home', 'Pelanggan memegang botol di rumah'],
  ['woman-holding-bottle-nobg', '', ''],
  ['bottle-cutout', 'Olive oil bottle', 'Botol minyak zaitun'],
];
const manifest = JSON.parse(readFileSync(join(OPT, 'manifest.json'), 'utf8'));
for (const [name, en, ms] of MEDIA_SRC) {
  const m = manifest[name];
  if (!m) continue;
  db.media.push({
    id: ++db.seq.media,
    width: m.width,
    height: m.height,
    variants: m.widths.map((w) => ({ w, url: `/uploads/cms/${name}-${w}.webp` })),
    alt: { en, ms },
    originalName: name + '.jpg',
    bytes: 180000 + Math.round(Math.random() * 400000),
    createdAt: ago(5000 + db.seq.media * 30),
    hasAlpha: /nobg|cutout/.test(name),
  });
}
const uploads = new Map(); // file name -> {type, buf}

const INFUSED = ['lavender-chamomile', 'blackseed', 'turmeric-black-pepper', 'rosemary-basil', 'fennel-anise', 'wild-thyme'];
const CLASSIC = ['reserve', 'organic', 'classic', 'family', 'gold'];
const en = JSON.parse(readFileSync(join(ROOT, 'src/i18n/locales/en/common.json'), 'utf8'));
const ms = JSON.parse(readFileSync(join(ROOT, 'src/i18n/locales/ms/common.json'), 'utf8'));
const get = (o, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const bottle = { name: 'bottle-cutout', width: 343, height: 1683, variants: [{ w: 343, url: '/cms-assets/bottle-cutout-343.webp' }] };
const catalogue = [
  ...INFUSED.map((id) => ({
    id,
    kind: 'infused',
    href: { en: `/en/products/infused-extra-virgin-olive-oil-${id}`, ms: `/ms/products/infused-extra-virgin-olive-oil-${id}` },
    name: { en: get(en, `infusedPage.products.${id}.name`) ?? id, ms: get(ms, `infusedPage.products.${id}.name`) ?? id },
    tagline: { en: get(en, `infusedPage.products.${id}.tagline`) ?? '', ms: get(ms, `infusedPage.products.${id}.tagline`) ?? '' },
    image: bottle,
  })),
  ...CLASSIC.map((id) => ({
    id,
    kind: 'classic',
    href: { en: '/en/products', ms: '/ms/products' },
    name: { en: get(en, `productShowcase.products.${id}.name`) ?? id, ms: get(ms, `productShowcase.products.${id}.name`) ?? id },
    tagline: { en: get(en, `productShowcase.products.${id}.description`) ?? '', ms: get(ms, `productShowcase.products.${id}.description`) ?? '' },
    image: bottle,
  })),
];

// ---------------------------------------------------------------- site text structure (page-keys.json stand-in)

const STRUCTURAL = /\.(icon|key|gold|fromFoundedYear)$|^oliveJourney\.scenes\.\d+\.key$/;
function flatten(o, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(o)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (key === 'hero.headlineWords') out[key] = v;
    else if (v && typeof v === 'object') flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
const DEF = { en: flatten(en), ms: flatten(ms) };
const STORE = 'Berkat Madinah';
const groupsOf = (prefixes) =>
  prefixes.map(([label, p]) => ({ label, keys: Object.keys(DEF.en).filter((k) => (k === p || k.startsWith(p + '.')) && !STRUCTURAL.test(k)) })).filter((g) => g.keys.length);
const structure = {
  pages: {
    home: {
      path: '',
      label: 'Home',
      groups: groupsOf([
        ['Hero', 'hero'],
        ['Our story', 'scrollStory'],
        ['Bottle', 'bottleOpening'],
        ['Ingredients', 'ingredients'],
        ['Products', 'productShowcase'],
        ['Where to buy', 'purchasePath'],
        ['Olive journey', 'oliveJourney'],
        ['Statistics', 'statistics'],
        ['Testimonials', 'testimonials'],
        ['FAQ', 'faq'],
      ]),
      images: ['home.hero.bg', 'home.hero.bottle', 'home.story.woman', 'home.bottle.pour'],
    },
    products: { path: 'products', label: 'Products', groups: groupsOf([['Products page', 'productsPage']]), images: ['products.hero'] },
    infused: {
      path: 'products/infused-extra-virgin-olive-oil-lavender-chamomile',
      paths: INFUSED.map((id) => `products/infused-extra-virgin-olive-oil-${id}`),
      label: 'Infused product pages',
      groups: groupsOf([['Infused products', 'infusedPage']]),
      images: INFUSED.map((id) => `infused.${id}.hero`),
    },
    shop: { path: 'shop', label: 'Shop', groups: groupsOf([['Shop', 'shopPage']]), images: [] },
    'why-us': { path: 'why-us', label: 'Why us', groups: groupsOf([['Why us', 'whyUsPage']]), images: ['whyus.field'] },
    contact: { path: 'contact', label: 'Contact', groups: groupsOf([['Contact', 'contactPage']]), images: [] },
    global: { path: '', label: 'Header & footer', groups: groupsOf([['Menu', 'nav'], ['Footer', 'footer'], ['WhatsApp', 'whatsapp']]), images: [] },
  },
  spots: {
    'home.hero.bg': { label: 'Home › Hero background', needsAlpha: false, default: { name: 'OliveGroveSunsetHero', width: 1672, height: 941, url: '/uploads/cms/OliveGroveSunsetHero-800.webp' } },
    'home.hero.bottle': { label: 'Home › Hero bottle', needsAlpha: true, default: { name: 'bottle-cutout', width: 343, height: 1683, url: '/uploads/cms/bottle-cutout-343.webp' } },
    'home.story.woman': { label: 'Home › Story photo', needsAlpha: true, default: { name: 'woman-holding-bottle-nobg', width: 895, height: 1277, url: '/uploads/cms/woman-holding-bottle-nobg-400.webp' } },
    'home.bottle.pour': { label: 'Home › Pouring bottle', needsAlpha: true, default: { name: 'bottle-cutout', width: 343, height: 1683, url: '/uploads/cms/bottle-cutout-343.webp' } },
    'products.hero': { label: 'Products › Hero bottle', needsAlpha: true, default: { name: 'bottle-cutout', width: 343, height: 1683, url: '/uploads/cms/bottle-cutout-343.webp' } },
    'whyus.field': { label: 'Why us › Field photo', needsAlpha: false, default: { name: 'AVOliveOilInTheField', width: 750, height: 947, url: '/uploads/cms/AVOliveOilInTheField-400.webp' } },
    ...Object.fromEntries(
      INFUSED.map((id) => [`infused.${id}.hero`, { label: `Infused › ${id} bottle`, needsAlpha: true, default: { name: 'bottle-cutout', width: 343, height: 1683, url: '/uploads/cms/bottle-cutout-343.webp' } }])
    ),
  },
};
const usage = (key) => {
  const top = key.split('.')[0];
  if (['nav', 'footer', 'whatsapp', 'breadcrumb'].includes(top)) return ['Every page › Header', 'Every page › Footer'];
  if (key.startsWith('faq.')) return ['Home › FAQ', 'Shop › FAQ'];
  return ['Page'];
};

// Drafts are per user (like the PHP API): `draft` is only reported to the user who made it.
function siteItem(key, lang, uid) {
  const isImg = key in structure.spots;
  const ov = db.overrides[lang][key];
  const mine = !!ov?.hasDraft && ov.userId === uid;
  if (isImg) {
    const expand = (v) => (v ? { media: db.media.find((m) => m.id === v.media) ?? null, alt: v.alt, focal: v.focal } : null);
    const spot = structure.spots[key];
    return { key, type: 'image', default: spot.default, draft: mine ? expand(ov.draft) : null, hasDraft: mine, published: expand(ov?.published), usage: [spot.label], editable: true, label: spot.label, needsAlpha: spot.needsAlpha };
  }
  const raw = DEF[lang][key] ?? DEF.en[key];
  const isTpl = typeof raw === 'string' && raw.includes('{{');
  const type = key === 'hero.headlineWords' ? 'words' : typeof raw === 'number' ? 'number' : 'string';
  return {
    key,
    type,
    default: isTpl ? raw.replace(/\{\{store\}\}/g, STORE) : raw,
    ...(isTpl ? { template: raw, tokens: [...raw.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]) } : {}),
    draft: mine ? ov.draft : null,
    hasDraft: mine,
    published: ov?.published ?? null,
    usage: usage(key),
    editable: !STRUCTURAL.test(key),
    draftAt: mine ? ov.updatedAt : null,
  };
}

// a pending change by another user, so "other people's changes" shows
db.overrides.en['hero.sub'] = { draft: 'Cold-pressed, unprocessed olive oil — from our family groves to your kitchen.', hasDraft: true, published: null, kind: 'text', updatedAt: ago(140), userId: 2 };
db.overrides.en['statistics.items.1.value'] = { published: 520000, hasDraft: false, kind: 'text', updatedAt: ago(3000), userId: 1 };
db.siteRevisions.push({ publishId: db.seq.pub++, createdAt: ago(3000), userName: 'Tarek Sammad', items: [{ lang: 'en', key: 'statistics.items.1.value' }] });

// ---------------------------------------------------------------- forms + pages + entries

const L = (e, m) => ({ en: e, ms: m });
const f = (id, name, type, le, lm, required, width, extra = {}) => ({ id, name, type, label: L(le, lm), placeholder: L('', ''), required, width, ...extra });
db.forms.push(
  {
    id: 1,
    name: 'Wholesale enquiry',
    recipients: ['sales@avoliveoil.com', 'tarek@avoliveoil.com'],
    subject: 'Wholesale enquiry',
    def: {
      fields: [
        f('f1', 'name', 'text', 'Your name', 'Nama anda', true, 'half'),
        f('f2', 'company', 'text', 'Company', 'Syarikat', false, 'half'),
        f('f3', 'email', 'email', 'Email', 'E-mel', true, 'half'),
        f('f4', 'phone', 'tel', 'Phone number', 'Nombor telefon', false, 'half'),
        f('f5', 'quantity', 'select', 'Monthly quantity', 'Kuantiti sebulan', true, 'full', {
          options: [
            { id: 'o1', label: L('Under 50 bottles', 'Bawah 50 botol') },
            { id: 'o2', label: L('50–200 bottles', '50–200 botol') },
            { id: 'o3', label: L('More than 200', 'Lebih 200') },
          ],
        }),
        f('f6', 'message', 'textarea', 'Message', 'Mesej', false, 'full'),
      ],
      submitLabel: L('Send enquiry', 'Hantar pertanyaan'),
      successMessage: L('Thank you — our sales team will call you within one working day.', 'Terima kasih — pasukan jualan kami akan menghubungi anda dalam satu hari bekerja.'),
    },
    createdAt: ago(9000),
    updatedAt: ago(2000),
  },
  {
    id: 2,
    name: 'Ramadan gift order',
    recipients: ['orders@avoliveoil.com'],
    subject: 'Ramadan gift box order',
    def: {
      fields: [f('f1', 'name', 'text', 'Your name', 'Nama anda', true, 'half'), f('f2', 'phone', 'tel', 'WhatsApp number', 'Nombor WhatsApp', true, 'half'), f('f3', 'boxes', 'number', 'How many boxes?', 'Berapa kotak?', true, 'half')],
      submitLabel: L('Order now', 'Pesan sekarang'),
      successMessage: L('Thank you! We will confirm your order on WhatsApp.', 'Terima kasih! Kami akan mengesahkan pesanan anda di WhatsApp.'),
    },
    createdAt: ago(5000),
    updatedAt: ago(800),
  }
);

const sec = (id, settings, columns) => ({ id, kind: 'section', settings: { layout: 'boxed', bg: 'bg', padY: 'l', align: 'start', valign: 'start', gap: 'm', ...settings }, columns });
const docRamadan = {
  schema: 1,
  title: L('Ramadan gift boxes', 'Kotak hadiah Ramadan'),
  seo: { metaTitle: L('Ramadan gift boxes | Arabian Village Olive Oil', 'Kotak hadiah Ramadan | Minyak Zaitun Arabian Village'), metaDescription: L('Olive oil gift boxes for Ramadan and Hari Raya, delivered across Malaysia.', '') },
  sections: [
    sec('s1', { bg: 'olive-dark', padY: 'xl', align: 'center', layout: 'full' }, [
      {
        id: 'c1',
        span: 12,
        widgets: [
          { id: 'w1', type: 'heading', settings: { kicker: L('Ramadan 2027', 'Ramadan 2027'), text: L('Gift boxes made for sharing', 'Kotak hadiah untuk dikongsi'), level: 'h1', size: 'xl', align: 'center', color: 'white' } },
          { id: 'w2', type: 'text', settings: { html: L('<p>Three bottles of our finest oils in a hand-made wooden box.</p>', ''), align: 'center', color: 'white', size: 'l' } },
          { id: 'w3', type: 'button', settings: { label: L('Order a box', 'Pesan kotak'), href: '#order', style: 'gold', newTab: false, align: 'center', size: 'l' } },
        ],
      },
    ]),
    sec('s2', { bg: 'cream', anchor: 'order' }, [
      { id: 'c2', span: 5, widgets: [{ id: 'w4', type: 'heading', settings: { text: L('Order your box', 'Pesan kotak anda'), level: 'h2', size: 'l', align: 'start', color: 'olive-dark' } }] },
      { id: 'c3', span: 7, widgets: [{ id: 'w5', type: 'form', settings: { formId: 2, style: 'card' } }] },
    ]),
  ],
};
const docAbout = {
  schema: 1,
  title: L('Our groves in Palestine', 'Ladang kami di Palestin'),
  seo: { metaTitle: L('Our olive groves | Arabian Village', 'Ladang zaitun kami | Arabian Village'), metaDescription: L('Meet the families who grow and press our olives.', 'Kenali keluarga yang menanam dan memerah buah zaitun kami.') },
  sections: [sec('s1', { bg: 'cream', padY: 'xl', align: 'center' }, [{ id: 'c1', span: 12, widgets: [{ id: 'w1', type: 'heading', settings: { text: L('Our groves in Palestine', 'Ladang kami di Palestin'), level: 'h1', size: 'xl', align: 'center', color: 'olive-dark' } }] }])],
};
const docWholesale = {
  schema: 1,
  title: L('Wholesale', ''),
  seo: { metaTitle: L('', ''), metaDescription: L('', '') },
  sections: [
    sec('s1', { bg: 'bg' }, [
      { id: 'c1', span: 12, widgets: [{ id: 'w1', type: 'heading', settings: { text: L('Olive oil for your shop or restaurant', ''), level: 'h1', size: 'xl', align: 'start', color: 'olive-dark' } }, { id: 'w2', type: 'form', settings: { formId: 1, style: 'card' } }] },
    ]),
  ],
};
const page = (id, slug, status, draft, published, extra = {}) => ({
  id,
  slug,
  status,
  draft,
  published,
  langs: status === 'published' ? ['en', 'ms'] : [],
  inHeader: false,
  inFooter: false,
  menuOrder: 0,
  noindex: false,
  createdAt: ago(8000),
  updatedAt: ago(90),
  publishedAt: status === 'published' ? ago(2000) : null,
  version: 3,
  deletedAt: null,
  updatedBy: 'Tarek Sammad',
  ...extra,
});
db.pages.push(
  page(1, 'ramadan-gift-boxes', 'published', docRamadan, { ...docRamadan, sections: docRamadan.sections.slice(0, 1) }, { inHeader: true, updatedAt: ago(45), langs: ['en'] }),
  page(2, 'our-groves', 'published', docAbout, docAbout, { inFooter: true, updatedAt: ago(60 * 30) }),
  page(3, 'wholesale', 'draft', docWholesale, null, { updatedAt: ago(60 * 50), updatedBy: 'Aisha Rahman' }),
  page(4, 'hari-raya-sale-2026', 'draft', docAbout, null, { deletedAt: ago(60 * 24 * 3) })
);
db.revisions.set(1, [{ id: 501, createdAt: ago(2000), userName: 'Tarek Sammad', note: 'publish', langs: ['en'], doc: docRamadan }]);
db.revisions.set(2, [
  { id: 502, createdAt: ago(60 * 30), userName: 'Aisha Rahman', note: 'publish', langs: ['en', 'ms'], doc: docAbout },
  { id: 503, createdAt: ago(60 * 24 * 6), userName: 'Tarek Sammad', note: 'publish', langs: ['en'], doc: docAbout },
]);
db.dirty.add(2);

const sub = (formId, pageId, data, minAgo, status = 'sent', read = true, lang = 'en') => ({
  id: ++db.seq.sub,
  formId,
  pageId,
  lang,
  data,
  createdAt: ago(minAgo),
  readAt: read ? ago(minAgo - 1) : null,
  mailStatus: status,
  mailError: status === 'failed' ? 'sendmail exited with status 75 (temporary failure)' : null,
});
db.submissions.push(
  sub(2, 1, { name: 'Nurul Huda', phone: '+60 12-345 6789', boxes: '4' }, 12, 'sent', false, 'ms'),
  sub(1, 3, { name: 'Lim Wei Jie', company: 'Kedai Runcit Lim', email: 'weijie@kedailim.my', phone: '+60 16 222 3344', quantity: '50–200 bottles', message: 'Hi, we run two grocery shops in Ipoh and would like to stock your infused oils. Can you send a price list?' }, 95, 'failed', false),
  sub(2, 1, { name: 'Ahmad Faiz', phone: '+60 19 876 5432', boxes: '10' }, 60 * 5, 'held', false),
  sub(1, 3, { name: 'Sarah Lee', company: 'The Olive Kitchen', email: 'sarah@olivekitchen.my', phone: '', quantity: 'More than 200', message: 'We are opening a Mediterranean restaurant in Bangsar in December.' }, 60 * 26),
  sub(2, 1, { name: 'Siti Aminah', phone: '+60 11 1111 2222', boxes: '2' }, 60 * 50),
  sub(1, 3, { name: 'Cheap SEO', company: '', email: 'seo@spam.example', phone: '', quantity: 'Under 50 bottles', message: 'Buy backlinks http://x.example http://y.example http://z.example http://w.example' }, 60 * 70, 'spam')
);

// ---------------------------------------------------------------- helpers

const pub = (u) => ({ id: u.id, email: u.email, name: u.name, isActive: u.isActive, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt });
const strip = (h) => String(h).replace(/<[^>]*>/g, '').trim();
function missingMs(doc) {
  let n = 0;
  const walk = (v) => {
    if (v && typeof v === 'object' && !Array.isArray(v) && 'en' in v && 'ms' in v && Object.keys(v).length === 2) {
      if (strip(v.en) && !strip(v.ms)) n++;
      return;
    }
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk({ title: doc.title, seo: doc.seo, sections: doc.sections });
  return n;
}
const listItem = (p) => ({
  id: p.id,
  slug: p.slug,
  status: p.status,
  title: p.draft.title,
  updatedAt: p.updatedAt,
  publishedAt: p.publishedAt,
  langs: p.langs,
  inHeader: p.inHeader,
  inFooter: p.inFooter,
  menuOrder: p.menuOrder,
  noindex: p.noindex,
  hasUnpublished: p.status === 'published' && JSON.stringify(p.draft) !== JSON.stringify(p.published),
  needsTranslation: missingMs(p.draft),
  deletedAt: p.deletedAt,
  updatedBy: p.updatedBy,
});
function mediaIds(doc) {
  const ids = new Set();
  if (!doc) return ids;
  if (doc.seo?.ogImage) ids.add(doc.seo.ogImage);
  for (const s of doc.sections) {
    if (s.settings.bgImage) ids.add(s.settings.bgImage);
    for (const c of s.columns)
      for (const w of c.widgets) {
        if (w.type === 'image' && w.settings.media) ids.add(w.settings.media);
        if (w.type === 'gallery') w.settings.media.forEach((m) => ids.add(m));
      }
  }
  return ids;
}
function formIds(doc) {
  const ids = new Set();
  if (!doc) return ids;
  for (const s of doc.sections) for (const c of s.columns) for (const w of c.widgets) if (w.type === 'form' && w.settings.formId) ids.add(w.settings.formId);
  return ids;
}
const ref = (m) => ({ id: m.id, width: m.width, height: m.height, variants: m.variants, alt: m.alt });
function payload(p) {
  const mids = new Set([...mediaIds(p.draft), ...mediaIds(p.published)]);
  const fids = new Set([...formIds(p.draft), ...formIds(p.published)]);
  return {
    page: { ...listItem(p), createdAt: p.createdAt, version: p.version },
    draft: p.draft,
    published: p.published,
    media: Object.fromEntries(db.media.filter((m) => mids.has(m.id)).map((m) => [String(m.id), ref(m)])),
    forms: Object.fromEntries(db.forms.filter((f) => fids.has(f.id)).map((f) => [String(f.id), { id: f.id, def: f.def }])),
  };
}
const usedOn = (formId) => db.pages.filter((p) => !p.deletedAt && (formIds(p.draft).has(formId) || formIds(p.published).has(formId))).map((p) => p.id);
function mediaUsedIn(id) {
  const out = [];
  for (const p of db.pages) if (!p.deletedAt && (mediaIds(p.draft).has(id) || mediaIds(p.published).has(id))) out.push(`Page: ${p.draft.title.en}`);
  for (const l of ['en', 'ms'])
    for (const [k, v] of Object.entries(db.overrides[l])) if (v.kind === 'image' && ((v.hasDraft && v.draft?.media === id) || v.published?.media === id)) out.push(structure.spots[k]?.label ?? k);
  return [...new Set(out)];
}
const subOut = (s) => {
  const form = db.forms.find((f) => f.id === s.formId);
  const page = db.pages.find((p) => p.id === s.pageId);
  return {
    ...s,
    formName: form?.name ?? 'Deleted form',
    pageTitle: page?.draft.title.en ?? null,
    pageSlug: page?.slug ?? null,
    labels: Object.fromEntries((form?.def.fields ?? []).map((f) => [f.name, f.label.en])),
  };
};

function imageSize(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'image/png' };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7), type: 'image/jpeg' };
      i += 2 + len;
    }
  }
  return { w: 1200, h: 800, type: 'application/octet-stream' };
}

function parseMultipart(buf, contentType) {
  const boundary = /boundary=(?:"([^"]+)"|([^;]+))/.exec(contentType);
  if (!boundary) return null;
  const b = Buffer.from('--' + (boundary[1] || boundary[2]));
  let start = buf.indexOf(b);
  while (start >= 0) {
    const next = buf.indexOf(b, start + b.length);
    if (next < 0) break;
    const part = buf.subarray(start + b.length + 2, next - 2);
    const headEnd = part.indexOf('\r\n\r\n');
    const head = part.subarray(0, headEnd).toString();
    if (/name="file"/.test(head)) {
      const name = /filename="([^"]*)"/.exec(head)?.[1] ?? 'upload';
      return { name, data: part.subarray(headEnd + 4) };
    }
    start = next;
  }
  return null;
}

// ---------------------------------------------------------------- server

class Fail extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}
const fail = (s, c, m, f) => {
  throw new Fail(s, c, m, f);
};

function cookieSession(req) {
  const m = /(?:^|;\s*)mock_sess=([a-f0-9]+)/.exec(req.headers.cookie || '');
  return m ? db.sessions.get(m[1]) : null;
}

async function handle(req, res, body, rawBody) {
  const url = new URL(req.url, 'http://x');
  const path = url.pathname.replace(/^\/api/, '');
  const method = req.method === 'POST' && req.headers['x-http-method-override'] ? String(req.headers['x-http-method-override']).toUpperCase() : req.method;
  const sess = cookieSession(req);
  const user = sess ? db.users.find((u) => u.id === sess.userId) : null;
  const q = url.searchParams;
  const write = method !== 'GET';
  const seg = path.split('/').filter(Boolean);
  const id = Number(seg[1]);

  // public
  if (path === '/build') return { build: BUILD };
  if (path === '/setup/status') return { needsSetup: db.needsSetup };
  if (path === '/setup' && method === 'POST') {
    if (!db.needsSetup) fail(409, 'done', 'The control panel is already set up.');
    if (body.token?.length !== 64) fail(400, 'invalid', 'That setup code is not right.', { token: 'Not the right code.' });
    db.needsSetup = false;
    const u = { id: 9, email: body.email, name: body.name, isActive: true, createdAt: now(), lastLoginAt: now() };
    db.users = [u];
    return login(res, u);
  }
  if (path === '/auth/login') {
    const u = db.users.find((x) => x.email.toLowerCase() === String(body.email || '').toLowerCase());
    await new Promise((r) => setTimeout(r, 350));
    if (!u || !u.isActive || body.password !== PASSWORD) fail(401, 'bad_login', 'That email and password do not match. Check both and try again.');
    u.lastLoginAt = now();
    return login(res, u);
  }
  if (path === '/auth/forgot') return { ok: true };
  if (path === '/auth/reset') {
    if (String(body.password || '').length < 10) fail(400, 'invalid', 'New password: use at least 10 characters.', { password: 'Use at least 10 characters.' });
    return { ok: true };
  }
  if (!user) fail(401, 'unauthorized', 'Please sign in again.');
  if (write && req.headers['x-csrf-token'] !== sess.csrf) fail(403, 'csrf', 'Your session expired. Reload the page.');
  if (write && req.headers['x-cms-build'] !== BUILD) fail(409, 'stale_panel', 'The website was updated. Reload the control panel.');

  // auth
  if (path === '/auth/me') return { user: pub(user), csrf: sess.csrf };
  if (path === '/auth/logout') {
    db.sessions.delete(sess.token);
    res.setHeader('Set-Cookie', 'mock_sess=; Path=/; Max-Age=0');
    return { ok: true };
  }
  if (path === '/auth/password') {
    if (body.current !== PASSWORD) fail(400, 'invalid', 'Your current password is not correct.', { current: 'Not correct.' });
    return { ok: true };
  }

  // users
  if (path === '/users' && method === 'GET') return db.users.map(pub);
  if (path === '/users' && method === 'POST') {
    if (db.users.some((u) => u.email === body.email)) fail(409, 'duplicate', 'Another user already has this email address.', { email: 'Already used.' });
    const u = { id: Math.max(...db.users.map((x) => x.id)) + 1, email: body.email, name: body.name, isActive: true, createdAt: now(), lastLoginAt: null };
    db.users.push(u);
    return pub(u);
  }
  if (seg[0] === 'users' && method === 'PATCH') {
    const u = db.users.find((x) => x.id === id) ?? fail(404, 'not_found', 'User not found.');
    if (body.isActive === false && u.id === user.id) fail(400, 'self', 'You cannot remove your own access.');
    Object.assign(u, Object.fromEntries(Object.entries({ name: body.name, email: body.email, isActive: body.isActive }).filter(([, v]) => v !== undefined)));
    return pub(u);
  }

  // dashboard
  if (path === '/dashboard') {
    const live = db.pages.filter((p) => !p.deletedAt);
    return {
      pages: {
        published: live.filter((p) => p.status === 'published').length,
        draft: live.filter((p) => p.status === 'draft').length,
        unpublishedChanges: live.filter((p) => listItem(p).hasUnpublished).length,
        trash: db.pages.length - live.length,
      },
      entries: { unread: db.submissions.filter((s) => !s.readAt && s.mailStatus !== 'spam').length, last7days: db.submissions.length, total: db.submissions.length },
      mail: { failed: db.submissions.filter((s) => s.mailStatus === 'failed').length, held: db.submissions.filter((s) => s.mailStatus === 'held').length },
      dirtyPages: db.dirty.size,
      sitePending: Object.values(db.overrides.en).concat(Object.values(db.overrides.ms)).filter((o) => o.hasDraft).length,
      recentEntries: db.submissions.filter((s) => s.mailStatus !== 'spam').slice(0, 6).map(subOut),
    };
  }

  // pages
  if (path === '/pages' && method === 'GET') return db.pages.filter((p) => (q.get('trash') ? p.deletedAt : !p.deletedAt)).map(listItem);
  if (path === '/pages/dirty') return [...db.dirty];
  if (path === '/pages' && method === 'POST') {
    if (db.pages.some((p) => p.slug === body.slug)) fail(409, 'slug_taken', 'Another page already uses this address.', { slug: 'Another page already uses this address.' });
    const p = page(++db.seq.page, body.slug, 'draft', body.doc ?? { schema: 1, title: body.title, seo: { metaTitle: L('', ''), metaDescription: L('', '') }, sections: [] }, null, { updatedAt: now(), createdAt: now(), version: 1, updatedBy: user.name });
    db.pages.push(p);
    return payload(p);
  }
  if (seg[0] === 'pages' && id) {
    const p = db.pages.find((x) => x.id === id) ?? fail(404, 'not_found', 'This page no longer exists.');
    const action = seg[2];
    if (!action && method === 'GET') return payload(p);
    if (action === 'draft') {
      if (body.baseVersion !== p.version && !body.force) fail(409, 'version_conflict', 'This page was changed in another tab.');
      p.draft = body.doc;
      p.version++;
      p.updatedAt = now();
      p.updatedBy = user.name;
      return { version: p.version, updatedAt: p.updatedAt };
    }
    if (!action && method === 'PATCH') {
      if (body.slug && db.pages.some((x) => x.slug === body.slug && x.id !== p.id)) fail(409, 'slug_taken', 'Another page already uses this address.', { slug: 'Another page already uses this address.' });
      if (body.inHeader && !p.inHeader && db.pages.filter((x) => x.inHeader && !x.deletedAt).length >= 3) fail(400, 'menu_full', 'The top menu already has 3 pages.');
      for (const k of ['slug', 'inHeader', 'inFooter', 'menuOrder', 'noindex']) if (body[k] !== undefined) p[k] = body[k];
      return { ...listItem(p), createdAt: p.createdAt, version: p.version };
    }
    if (action === 'publish') {
      if (!body.htmlB64 || !Object.keys(body.htmlB64).length) fail(400, 'invalid', 'Nothing to publish.');
      p.published = body.doc;
      p.draft = body.doc;
      p.status = 'published';
      p.langs = body.langs;
      p.publishedAt = now();
      p.version++;
      const list = db.revisions.get(p.id) ?? [];
      list.unshift({ id: ++db.seq.rev, createdAt: now(), userName: user.name, note: 'publish', langs: body.langs, doc: body.doc });
      db.revisions.set(p.id, list);
      db.dirty.delete(p.id);
      return { publishedAt: p.publishedAt, langs: p.langs, skipped: {}, version: p.version };
    }
    if (action === 'unpublish') {
      p.status = 'draft';
      p.langs = [];
      return { ok: true };
    }
    if (action === 'html') {
      db.dirty.delete(p.id);
      await new Promise((r) => setTimeout(r, 400));
      return { ok: true };
    }
    if (action === 'duplicate') {
      let slug = p.slug + '-copy';
      for (let i = 2; db.pages.some((x) => x.slug === slug); i++) slug = `${p.slug}-copy-${i}`;
      const c = page(++db.seq.page, slug, 'draft', { ...structuredClone(p.draft), title: { en: p.draft.title.en + ' (copy)', ms: p.draft.title.ms ? p.draft.title.ms + ' (salinan)' : '' } }, null, { updatedAt: now() });
      db.pages.push(c);
      return listItem(c);
    }
    if (!action && method === 'DELETE') {
      p.deletedAt = now();
      return { ok: true };
    }
    if (action === 'purge') {
      if (!p.deletedAt) fail(409, 'not_trashed', 'Move the page to the trash first.');
      db.pages = db.pages.filter((x) => x.id !== p.id);
      return { ok: true };
    }
    if (action === 'restore') {
      p.deletedAt = null;
      return { ok: true };
    }
    if (action === 'revisions' && !seg[3]) return (db.revisions.get(p.id) ?? []).map(({ doc: _doc, ...r }) => r);
    if (action === 'revisions' && seg[4] === 'restore') {
      const r = (db.revisions.get(p.id) ?? []).find((x) => x.id === Number(seg[3])) ?? fail(404, 'not_found', 'Version not found.');
      p.draft = structuredClone(r.doc);
      p.version++;
      return { version: p.version, doc: p.draft };
    }
  }

  // site
  if (path === '/site/pages') return structure;
  if (path === '/site/keys') {
    const def = structure.pages[q.get('page')] ?? fail(404, 'not_found', 'Unknown page.');
    const lang = q.get('lang') === 'ms' ? 'ms' : 'en';
    const keys = [...def.groups.flatMap((g) => g.keys), ...def.images];
    return keys.map((k) => siteItem(k, lang, user.id));
  }
  if (path === '/site/text') {
    const out = { en: {}, ms: {} };
    for (const l of ['en', 'ms']) for (const [k, v] of Object.entries(db.overrides[l])) if (v.published != null && v.kind === 'text') out[l][k] = v.published;
    return out;
  }
  if (path === '/site/overrides') {
    const lang = body.lang;
    for (const it of body.items) {
      const cur = db.overrides[lang][it.key] ?? { published: null };
      db.overrides[lang][it.key] = { ...cur, draft: it.value, hasDraft: true, kind: it.kind, updatedAt: now(), userId: user.id };
    }
    return { ok: true };
  }
  if (path === '/site/publish') {
    for (const k of body.keys) {
      const o = db.overrides[k.lang][k.key];
      if (o && o.hasDraft && o.userId === user.id) {
        o.published = o.draft;
        o.hasDraft = false;
      }
    }
    db.siteRevisions.unshift({ publishId: db.seq.pub++, createdAt: now(), userName: user.name, items: body.keys });
    db.pages.filter((p) => p.status === 'published').forEach((p) => db.dirty.add(p.id));
    return { publishId: db.seq.pub - 1 };
  }
  if (path === '/site/discard') {
    for (const k of body.keys ?? []) {
      const o = db.overrides[k.lang][k.key];
      if (o && o.userId === user.id) o.hasDraft = false;
    }
    return { ok: true };
  }
  if (path === '/site/pending') {
    const out = [];
    for (const l of ['en', 'ms'])
      for (const [k, o] of Object.entries(db.overrides[l]))
        if (o.hasDraft) out.push({ lang: l, key: k, kind: o.kind, updatedAt: o.updatedAt, userId: o.userId, userName: db.users.find((u) => u.id === o.userId)?.name ?? null });
    return out;
  }
  if (path === '/site/orphans') return [{ lang: 'en', key: 'hero.tagline', value: 'Pure. Honest. Palestinian.', updatedAt: ago(60 * 24 * 20) }];
  if (path === '/site/revisions') return db.siteRevisions;
  if (seg[0] === 'site' && seg[1] === 'revisions' && seg[3] === 'revert') return { ok: true };

  // forms
  if (path === '/forms' && method === 'GET')
    return db.forms.map((f) => ({
      id: f.id,
      name: f.name,
      recipients: f.recipients,
      subject: f.subject,
      entries: db.submissions.filter((s) => s.formId === f.id).length,
      unread: db.submissions.filter((s) => s.formId === f.id && !s.readAt).length,
      usedOn: usedOn(f.id),
      updatedAt: f.updatedAt,
    }));
  if (path === '/forms' && method === 'POST') {
    const f = { id: ++db.seq.form, ...body, createdAt: now(), updatedAt: now() };
    db.forms.push(f);
    return f;
  }
  if (seg[0] === 'forms' && id) {
    const f = db.forms.find((x) => x.id === id) ?? fail(404, 'not_found', 'This form no longer exists.');
    if (seg[2] === 'usage') return usedOn(id);
    if (seg[2] === 'test-email') return { sentTo: f.recipients };
    if (method === 'GET') return f;
    if (method === 'PUT') {
      Object.assign(f, body, { updatedAt: now() });
      const dirty = usedOn(id).filter((pid) => db.pages.find((p) => p.id === pid)?.status === 'published');
      dirty.forEach((d) => db.dirty.add(d));
      return { ...f, dirtyPages: dirty };
    }
    if (method === 'DELETE') {
      if (usedOn(id).length) fail(409, 'form_in_use', 'This form is still on a page.');
      db.forms = db.forms.filter((x) => x.id !== id);
      return { ok: true };
    }
  }

  // submissions
  if (path === '/submissions/export.csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="entries.csv"');
    return { __raw: 'id,date\n1,2026-10-01\n' };
  }
  if (path === '/submissions') {
    let list = db.submissions.slice();
    if (q.get('form')) list = list.filter((s) => s.formId === Number(q.get('form')));
    if (q.get('page')) list = list.filter((s) => s.pageId === Number(q.get('page')));
    if (q.get('unread')) list = list.filter((s) => !s.readAt);
    if (q.get('status')) list = list.filter((s) => s.mailStatus === q.get('status'));
    const limit = Number(q.get('limit') || 50);
    return { items: list.slice(0, limit).map(subOut), total: list.length, unread: list.filter((s) => !s.readAt).length };
  }
  if (seg[0] === 'submissions' && id) {
    const s = db.submissions.find((x) => x.id === id) ?? fail(404, 'not_found', 'Entry not found.');
    if (seg[2] === 'resend') {
      s.mailStatus = 'sent';
      s.mailError = null;
      return { mailStatus: 'sent', mailError: null };
    }
    if (method === 'PATCH') {
      s.readAt = body.read ? now() : null;
      return { ok: true };
    }
    if (method === 'DELETE') {
      db.submissions = db.submissions.filter((x) => x.id !== id);
      return { ok: true };
    }
  }

  // media
  if (path === '/media' && method === 'GET') return db.media.map((m) => ({ ...m, usedIn: mediaUsedIn(m.id) }));
  if (path === '/media' && method === 'POST') {
    const file = parseMultipart(rawBody, req.headers['content-type'] || '') ?? fail(400, 'invalid', 'No file received.');
    const size = imageSize(file.data);
    const mid = ++db.seq.media;
    const ext = size.type === 'image/png' ? 'png' : 'jpg';
    const fname = `up-${mid}.${ext}`;
    uploads.set(fname, { type: size.type, buf: Buffer.from(file.data) });
    const m = { id: mid, width: size.w, height: size.h, variants: [{ w: size.w, url: `/uploads/cms/${fname}` }], alt: { en: '', ms: '' }, originalName: file.name, bytes: file.data.length, createdAt: now(), hasAlpha: ext === 'png' };
    db.media.unshift(m);
    return m;
  }
  if (seg[0] === 'media' && id) {
    const m = db.media.find((x) => x.id === id) ?? fail(404, 'not_found', 'Photo not found.');
    if (method === 'PATCH') {
      m.alt = { en: body.altEn ?? m.alt.en, ms: body.altMs ?? m.alt.ms };
      return m;
    }
    if (method === 'DELETE') {
      const used = mediaUsedIn(id);
      if (used.length) fail(409, 'media_in_use', `This photo is used in: ${used.join(', ')}. Remove it there first.`);
      db.media = db.media.filter((x) => x.id !== id);
      return { ok: true };
    }
  }

  if (path === '/catalogue') return catalogue;
  if (path === '/system/health')
    return {
      php: '8.4.25',
      sqlite: '3.53.4',
      build: BUILD,
      contentVersion: 42,
      dataWritable: true,
      renderedFiles: 37,
      renderedBytes: 2_400_000,
      integrity: 'ok',
      failedMails: db.submissions.filter((s) => s.mailStatus === 'failed').length,
      heldMails: db.submissions.filter((s) => s.mailStatus === 'held').length,
      lastBackupAt: ago(45),
      logTail: ['[2026-10-01 11:02:13] info publish page=1 langs=en', '[2026-10-01 11:40:02] warn mail failed submission=102 status=75', '[2026-10-01 12:00:00] info backup cms-20261001120000.sqlite'],
    };
  if (path === '/system/backup') {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="cms-backup.sqlite"');
    return { __raw: 'SQLite format 3\0' };
  }
  if (path === '/settings' && method === 'GET') return db.settings;
  if (path === '/settings' && method === 'POST') {
    db.settings = { systemEmail: body.systemEmail, mailCapPerHour: body.mailCapPerHour };
    return db.settings;
  }
  fail(404, 'not_found', `No such endpoint: ${method} ${path}`);
}

function login(res, u) {
  const token = randomBytes(16).toString('hex');
  const csrf = randomBytes(16).toString('hex');
  db.sessions.set(token, { token, csrf, userId: u.id });
  res.setHeader('Set-Cookie', `mock_sess=${token}; Path=/; HttpOnly; SameSite=Strict`);
  return { user: pub(u), csrf };
}

createServer((req, res) => {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', async () => {
    const raw = Buffer.concat(chunks);
    // static: uploads + cms-assets map onto the real optimised images
    const u = new URL(req.url, 'http://x');
    if (u.pathname.startsWith('/uploads/cms/') || u.pathname.startsWith('/cms-assets/')) {
      const name = u.pathname.split('/').pop();
      const up = uploads.get(name);
      if (up) {
        res.writeHead(200, { 'Content-Type': up.type });
        return res.end(up.buf);
      }
      const file = join(OPT, name);
      if (existsSync(file)) {
        res.writeHead(200, { 'Content-Type': 'image/webp', 'Cache-Control': 'max-age=3600' });
        return res.end(readFileSync(file));
      }
      res.writeHead(404);
      return res.end();
    }
    let body = {};
    if ((req.headers['content-type'] || '').includes('json') && raw.length) {
      try {
        body = JSON.parse(raw.toString());
      } catch {
        body = {};
      }
    }
    try {
      await new Promise((r) => setTimeout(r, 120));
      const out = await handle(req, res, body, raw);
      if (out && out.__raw !== undefined) {
        res.writeHead(200);
        return res.end(out.__raw);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(out ?? { ok: true }));
    } catch (e) {
      const status = e instanceof Fail ? e.status : 500;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: e.code ?? 'server', message: e.message, ...(e.fields ? { fields: e.fields } : {}) } }));
      if (!(e instanceof Fail)) console.error(e);
    }
  });
}).listen(PORT, '127.0.0.1', () => console.log(`admin mock API on http://127.0.0.1:${PORT}`));
