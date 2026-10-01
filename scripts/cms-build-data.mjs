// Writes the build-time data the CMS server and admin read (docs/cms/CMS-SPEC.md §14.1).
// Runs in `npm run build` after `vite build`, before scripts/copy-server.mjs (which adds its own
// files to dist/api/_data). Writes only the files below — never clears a directory.
//
//   dist/api/_data/build.json          { build, selftestSha256 }
//   dist/api/_data/defaults-<lang>.json every common.json leaf: value, type, tokens, editable
//   dist/api/_data/page-keys.json      editable key groups per existing page (side list, sitemap)
//   dist/api/_data/key-usage.json      key -> where it shows ("Home › Hero"), from a static scan
//   dist/api/_data/image-spots.json    photo spots (cmsKey) with labels and their built-in image
//   dist/api/_data/catalogue.json      products for the "products" widget
//   dist/cms-assets/<name>-<w>.webp    stable (unhashed) copies of the images the above point at
//   .cms-selftest                      per-build deploy self-test token (gitignored, read by ftp-deploy.py)
//
// Fails the build when a common.json key is not in any page group: an editable text
// the owner cannot find in the panel is a silent gap.
import { createHash, randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const DATA = join(DIST, 'api', '_data');
const ASSETS_OUT = join(DIST, 'cms-assets');
const OPT = join(ROOT, 'src', 'assets', 'opt');
const LANGS = ['en', 'ms'];

const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const locale = Object.fromEntries(LANGS.map((l) => [l, readJson(`src/i18n/locales/${l}/common.json`)]));
const storeFacts = readJson('src/data/storeFacts.json');
const manifest = readJson('src/assets/opt/manifest.json');
const infusedSlugs = readJson('src/data/infusedSlugs.json');
const STORE_NAME = storeFacts.seller.name;

if (!existsSync(DIST)) {
  console.error('cms-build-data: dist/ is missing — run vite build first');
  process.exit(1);
}

// ------------------------------------------------------------------ ids (mirrors src/data)

/** src/data/infusedProducts.ts — id + slug; the slug list is the shared JSON. */
const INFUSED = infusedSlugs.map((slug) => ({ id: slug.replace(/^infused-extra-virgin-olive-oil-/, ''), slug }));
for (const p of INFUSED) {
  if (!locale.en.infusedPage.products[p.id]) {
    console.error(`cms-build-data: infused slug ${p.slug} has no infusedPage.products.${p.id} copy`);
    process.exit(1);
  }
}
/** src/data/products.ts */
const SHOWCASE = Object.keys(locale.en.productShowcase.products);
/** src/components/sections/OliveJourney.tsx PHOTOS */
const JOURNEY_PHOTOS = {
  grove: 'journey-01-grove',
  sunset: 'journey-02-sunset',
  picking: 'journey-03-picking',
  crates: 'journey-04-crates',
  carrying: 'journey-05-carrying',
  press: 'journey-06-press',
};

// ------------------------------------------------------------------ defaults

const WORDS_KEY = 'hero.headlineWords';
const tokensOf = (s) => [...new Set([...s.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map((m) => m[1]))];

/** Structural leaves: they shape the layout, they are not copy (spec §11). */
function isStructural(key, lang) {
  if (/\.icon$/.test(key)) return true;
  if (/^oliveJourney\.scenes\.\d+\.key$/.test(key)) return true;
  if (key.startsWith(`${WORDS_KEY}.`)) return true;
  if (/^statistics\.items\.\d+\.fromFoundedYear$/.test(key)) return true;
  const m = /^statistics\.items\.(\d+)\.value$/.exec(key);
  if (m && locale[lang].statistics.items[Number(m[1])]?.fromFoundedYear) return true;
  return false;
}

function flatten(obj, prefix, out) {
  if (Array.isArray(obj)) obj.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
  else if (obj && typeof obj === 'object') for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  else out.push([prefix, obj]);
  return out;
}

function buildDefaults(lang) {
  const out = {};
  const words = locale[lang].hero.headlineWords;
  out[WORDS_KEY] = { v: words, t: 'words', editable: true };
  for (const [key, v] of flatten(locale[lang], '', [])) {
    const entry = { v, t: typeof v === 'number' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'string', editable: !isStructural(key, lang) };
    if (typeof v === 'boolean') entry.editable = false;
    if (typeof v === 'string') {
      const tokens = tokensOf(v);
      if (tokens.length) {
        entry.tokens = tokens;
        // serve.php interpolates {{store}} only (spec §13.2); other tokens stay templates.
        if (tokens.includes('store')) entry.vi = v.replace(/\{\{\s*store\s*\}\}/g, STORE_NAME);
      }
    }
    out[key] = entry;
  }
  return out;
}

const defaults = Object.fromEntries(LANGS.map((l) => [l, buildDefaults(l)]));
const EN_KEYS = Object.keys(defaults.en);
const editableKeys = (pred) => EN_KEYS.filter((k) => defaults.en[k].editable && pred(k));
const under = (...prefixes) => (k) => prefixes.some((p) => k === p || k.startsWith(`${p}.`));
const exactly = (...keys) => (k) => keys.includes(k);
const either = (...preds) => (k) => preds.some((p) => p(k));

// ------------------------------------------------------------------ page groups

/** Owner-facing labels follow the content map (spec §11, BUILDERS brief). */
const group = (label, pred, extra = {}) => ({ label, ...extra, keys: editableKeys(pred) });

const PAGES = {
  home: {
    path: '',
    label: 'Home',
    groups: [
      group('Hero', either(under('hero'), exactly('alt.heroBottle'))),
      group('Our story', either(under('scrollStory'), exactly('alt.storyWoman'))),
      group('Bottle', either(under('bottleOpening'), exactly('alt.bottlePour'))),
      group('Ingredients', under('ingredients')),
      group('Products', under('productShowcase')),
      group('Where to buy', under('purchasePath')),
      group('Olive journey', under('oliveJourney')),
      group('Numbers', under('statistics')),
      group('Testimonials', under('testimonials')),
      group('FAQ', under('faq')),
      group('Search result', under('seo.home')),
    ],
    images: [
      'home.hero.bg',
      'home.hero.bottle',
      'home.story.woman',
      'home.bottle.pour',
      ...SHOWCASE.map((id) => `home.showcase.${id}`),
      ...Object.keys(JOURNEY_PHOTOS).map((k) => `home.journey.${k}`),
    ],
  },
  products: {
    path: 'products',
    label: 'Products',
    groups: [
      group('Intro', either(exactly('productsPage.kicker', 'productsPage.title', 'productsPage.intro', 'alt.productsHero', 'breadcrumb.products'))),
      group('Product', either(under('productsPage.product'), exactly('productsPage.benefitsKicker'))),
      group(
        'Infused collection',
        either(
          exactly('infusedPage.kicker', 'infusedPage.collectionTitle', 'infusedPage.collectionIntro', 'infusedPage.availableBadge'),
          (k) => /^infusedPage\.products\.[^.]+\.(name|tagline)$/.test(k),
        ),
      ),
      group('Where to buy', under('productsPage.whereToBuy')),
      group('Order links', under('productsPage.links')),
      group('FAQ', under('productsPage.faq')),
      group('Search result', under('seo.products')),
    ],
    images: ['products.hero'],
  },
  infused: {
    label: 'Infused products',
    paths: INFUSED.map((p) => `products/${p.slug}`),
    groups: [
      group(
        'Shared texts',
        either(
          exactly(
            'infusedPage.kicker',
            'infusedPage.availableBadge',
            'infusedPage.notesTitle',
            'infusedPage.benefitsTitle',
            'infusedPage.usesTitle',
            'infusedPage.otherTitle',
            'infusedPage.backToProducts',
            'breadcrumb.products',
          ),
          under('infusedPage.cta'),
        ),
      ),
      ...INFUSED.map((p) =>
        group(locale.en.infusedPage.products[p.id].name, under(`infusedPage.products.${p.id}`), { path: `products/${p.slug}` }),
      ),
    ],
    images: INFUSED.map((p) => `infused.${p.id}.hero`),
  },
  shop: {
    path: 'shop',
    label: 'Shop',
    groups: [
      group('Intro', exactly('shopPage.kicker', 'shopPage.title', 'shopPage.subtitle', 'breadcrumb.shop')),
      group('Store cards', under('shopPage.cards')),
      group('Partner', either(exactly('purchasePath.kicker'), under('purchasePath.partnerCard', 'purchasePath.partnerModal'))),
      group('FAQ', under('shopPage.faq')),
      group('Search result', under('seo.shop')),
    ],
    images: [],
  },
  'why-us': {
    path: 'why-us',
    label: 'Why us',
    groups: [
      group('Intro', exactly('whyUsPage.kicker', 'whyUsPage.title', 'whyUsPage.intro', 'alt.whyUsField', 'breadcrumb.whyUs')),
      group('Reasons', under('whyUsPage.reasons')),
      group('Distributor', under('whyUsPage.partner')),
      group('Our olive oil', under('whyUsPage.flavors')),
      group('FAQ', under('whyUsPage.faq')),
      group('Search result', under('seo.whyUs')),
    ],
    images: ['whyus.field'],
  },
  contact: {
    path: 'contact',
    label: 'Contact',
    groups: [
      group('Intro', exactly('contactPage.kicker', 'contactPage.title', 'contactPage.intro', 'breadcrumb.contact')),
      group('Contact details', under('contactPage.info')),
      group('Message form', under('contactPage.form')),
      group('FAQ', under('contactPage.faq')),
      group('Search result', under('seo.contact')),
    ],
    images: [],
  },
  global: {
    label: 'Header & footer',
    groups: [
      group('Header', either(under('nav'), exactly('alt.logo', 'whatsapp.label'))),
      group('Footer', under('footer')),
      group('WhatsApp messages', either(under('whatsapp.fields'), exactly('whatsapp.formIntro', 'whatsapp.wholesaleIntro', 'whatsapp.newsletterIntro'))),
      group('Blog labels', either(under('blogPage', 'articlePage', 'seo.blog'), exactly('breadcrumb.blog'))),
    ],
    images: [],
  },
};

const grouped = new Set(Object.values(PAGES).flatMap((p) => p.groups.flatMap((g) => g.keys)));
const orphans = EN_KEYS.filter((k) => defaults.en[k].editable && !grouped.has(k));
if (orphans.length) {
  console.error(`cms-build-data: ${orphans.length} editable key(s) are in no page group — add them to PAGES:\n  ${orphans.join('\n  ')}`);
  process.exit(1);
}
const msMissing = EN_KEYS.filter((k) => !defaults.ms[k]);
if (msMissing.length) console.warn(`cms-build-data: note — ${msMissing.length} key(s) have no Malay copy: ${msMissing.slice(0, 5).join(', ')}`);

// ------------------------------------------------------------------ key usage (static scan)

/** Which pages render a source file; `section` labels keys that sit in no group of that page. */
const FILES = [
  { match: /^src\/pages\/HomePage\.tsx$|^src\/components\/sections\//, pages: ['home'] },
  { match: /^src\/pages\/ProductsPage\.tsx$/, pages: ['products'] },
  { match: /^src\/pages\/InfusedProductPage\.tsx$/, pages: ['infused'] },
  { match: /^src\/pages\/ShopPage\.tsx$/, pages: ['shop'] },
  { match: /^src\/pages\/WhyUsPage\.tsx$/, pages: ['why-us'] },
  { match: /^src\/pages\/ContactPage\.tsx$/, pages: ['contact'] },
  { match: /^src\/components\/ui\/(Navbar|Footer|WhatsAppButton)\.tsx$/, pages: ['global'] },
  { match: /^src\/components\/ui\/Breadcrumbs\.tsx$/, pages: ['products', 'infused', 'shop', 'why-us', 'contact'], section: 'Breadcrumb trail' },
  { match: /^src\/pages\/(BlogPage|ArticlePage)\.tsx$/, pages: ['global'] },
];

/** Every string and template literal in a file; `${…}` holes become a one-segment wildcard. */
function literals(src) {
  const out = [];
  const WILD = '\u0000';
  let i = 0;
  const n = src.length;
  function readTemplate() {
    // src[i] === '`'
    i++;
    let text = '';
    while (i < n && src[i] !== '`') {
      if (src[i] === '\\') { text += src[i + 1] ?? ''; i += 2; continue; }
      if (src[i] === '$' && src[i + 1] === '{') {
        i += 2;
        let depth = 1;
        while (i < n && depth > 0) {
          const c = src[i];
          if (c === '`') { readTemplate(); continue; }
          if (c === "'" || c === '"') { readQuoted(c); continue; }
          if (c === '{') depth++;
          else if (c === '}') depth--;
          i++;
        }
        text += WILD;
        continue;
      }
      text += src[i++];
    }
    i++;
    out.push(text);
  }
  function readQuoted(q) {
    i++;
    let text = '';
    while (i < n && src[i] !== q && src[i] !== '\n') {
      if (src[i] === '\\') { text += src[i + 1] ?? ''; i += 2; continue; }
      text += src[i++];
    }
    i++;
    out.push(text);
  }
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e === -1 ? n : e + 2; continue; }
    if (c === '`') { readTemplate(); continue; }
    if (c === "'" || c === '"') { readQuoted(c); continue; }
    i++;
  }
  return out.map((t) => t.split(WILD));
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const KEY_SHAPE = /^[A-Za-z][\w-]*(\.[\w-]*)*$/;

/** Keys a literal refers to: itself, everything under it (returnObjects / keyPrefix), wildcards resolved. */
function keysFor(parts) {
  const joined = parts.join('X');
  if (!joined.includes('.') || !KEY_SHAPE.test(joined)) return [];
  const re = new RegExp(`^${parts.map(escapeRe).join('[^.]+')}(\\..+)?$`);
  return EN_KEYS.filter((k) => re.test(k));
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e)) acc.push(p);
  }
  return acc;
}

const usage = {};
const pageGroupOf = (pageId, key) => PAGES[pageId].groups.find((g) => g.keys.includes(key))?.label;
for (const file of walk(join(ROOT, 'src'))) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const spec = FILES.find((f) => f.match.test(rel));
  if (!spec) continue;
  const keys = new Set(literals(readFileSync(file, 'utf8')).flatMap(keysFor));
  for (const key of keys) {
    if (!defaults.en[key]?.editable) continue;
    for (const pageId of spec.pages) {
      // A shared key the page renders but does not own (WhatsApp prefill, breadcrumb
      // "Home") is named by the group that owns it elsewhere.
      const sec =
        pageGroupOf(pageId, key) ??
        spec.section ??
        Object.keys(PAGES).map((id) => pageGroupOf(id, key)).find(Boolean);
      const label = sec ? `${PAGES[pageId].label} › ${sec}` : PAGES[pageId].label;
      (usage[key] ??= new Set()).add(label);
    }
  }
}
// Keys no component names literally (e.g. SEO.tsx builds `seo.${page}.title`) are
// placed by their page group.
for (const page of Object.values(PAGES)) {
  for (const g of page.groups) for (const key of g.keys) if (!usage[key]) usage[key] = new Set([`${page.label} › ${g.label}`]);
}
const keyUsage = Object.fromEntries(Object.keys(usage).sort().map((k) => [k, [...usage[k]].sort()]));

// ------------------------------------------------------------------ images

const copied = new Map();
/** Copies a manifest image's variants to dist/cms-assets/ and returns the unhashed URLs. */
function stableImage(name) {
  const entry = manifest[name];
  if (!entry) throw new Error(`cms-build-data: ${name} is not in src/assets/opt/manifest.json`);
  if (!copied.has(name)) {
    const variants = entry.widths.map((w) => {
      const file = `${name}-${w}.webp`;
      copyFileSync(join(OPT, file), join(ASSETS_OUT, file));
      return { w, url: `/cms-assets/${file}` };
    });
    copied.set(name, { name, width: entry.width, height: entry.height, variants });
  }
  return copied.get(name);
}
mkdirSync(ASSETS_OUT, { recursive: true });

const sceneTitle = Object.fromEntries(locale.en.oliveJourney.scenes.map((s) => [s.key, s.title]));
const SPOTS = {
  'home.hero.bg': { label: 'Home › Hero background', needsAlpha: false, image: 'OliveGroveSunsetHero' },
  'home.hero.bottle': { label: 'Home › Hero bottle', needsAlpha: true, image: 'bottle-cutout' },
  'home.story.woman': { label: 'Home › Our story photo', needsAlpha: true, image: 'woman-holding-bottle-nobg' },
  'home.bottle.pour': {
    label: 'Home › Pouring bottle',
    needsAlpha: true,
    image: 'bottle-cutout',
    note: 'The pour animation is tuned to the tall 343×1683 bottle; another shape will not line up with the stream.',
  },
  ...Object.fromEntries(
    SHOWCASE.map((id) => [
      `home.showcase.${id}`,
      { label: `Home › Products › ${locale.en.productShowcase.products[id].name}`, needsAlpha: true, image: 'bottle-cutout' },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(JOURNEY_PHOTOS).map(([k, image]) => [
      `home.journey.${k}`,
      { label: `Home › Olive journey › ${sceneTitle[k] ?? k}`, needsAlpha: false, image },
    ]),
  ),
  'products.hero': { label: 'Products › Bottle photo', needsAlpha: true, image: 'bottle-cutout' },
  ...Object.fromEntries(
    INFUSED.map((p) => [
      `infused.${p.id}.hero`,
      { label: `Infused › ${locale.en.infusedPage.products[p.id].name} › Bottle photo`, needsAlpha: true, image: 'bottle-cutout' },
    ]),
  ),
  'whyus.field': { label: 'Why us › Field photo', needsAlpha: false, image: 'AVOliveOilInTheField' },
};
const imageSpots = Object.fromEntries(
  Object.entries(SPOTS).map(([spot, { image, ...rest }]) => [spot, { ...rest, default: stableImage(image) }]),
);
const listedSpots = Object.values(PAGES).flatMap((p) => p.images);
const unlisted = Object.keys(imageSpots).filter((s) => !listedSpots.includes(s));
if (unlisted.length) {
  console.error(`cms-build-data: image spots on no page: ${unlisted.join(', ')}`);
  process.exit(1);
}

// ------------------------------------------------------------------ catalogue

const bottle = stableImage('bottle-cutout');
const both = (fn) => Object.fromEntries(LANGS.map((l) => [l, fn(l)]));
const catalogue = [
  {
    id: 'classic',
    kind: 'classic',
    href: both((l) => `/${l}/products`),
    name: both((l) => locale[l].productsPage.product.name),
    tagline: both((l) => locale[l].productsPage.product.tagline),
    image: bottle,
  },
  ...INFUSED.map((p) => ({
    id: p.id,
    kind: 'infused',
    href: both((l) => `/${l}/products/${p.slug}`),
    name: both((l) => locale[l].infusedPage.products[p.id].name),
    tagline: both((l) => locale[l].infusedPage.products[p.id].tagline),
    image: bottle,
  })),
];

// ------------------------------------------------------------------ build id + self-test

function buildId() {
  const d = new Date();
  const p = (x) => String(x).padStart(2, '0');
  const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  let sha = 'nogit';
  try {
    sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    /* building outside a checkout */
  }
  return `${stamp}-${sha}`;
}

const selftest = randomBytes(32).toString('hex');
writeFileSync(join(ROOT, '.cms-selftest'), `${selftest}\n`, 'utf8');
const build = { build: buildId(), selftestSha256: createHash('sha256').update(selftest).digest('hex') };

// ------------------------------------------------------------------ write

mkdirSync(DATA, { recursive: true });
const write = (name, value) => writeFileSync(join(DATA, name), `${JSON.stringify(value, null, 1)}\n`, 'utf8');
write('build.json', build);
for (const l of LANGS) write(`defaults-${l}.json`, defaults[l]);
write('page-keys.json', PAGES);
write('key-usage.json', keyUsage);
write('image-spots.json', imageSpots);
write('catalogue.json', catalogue);

const groupedCount = grouped.size;
console.log(
  `cms-build-data: build ${build.build} · ${EN_KEYS.length} keys (${groupedCount} editable, all grouped) · ` +
    `${Object.keys(keyUsage).length} with usage · ${Object.keys(imageSpots).length} photo spots · ` +
    `${catalogue.length} catalogue products · ${[...copied.values()].reduce((n, c) => n + c.variants.length, 0)} cms-assets`,
);
