/**
 * Generates public/llms.txt and llms-ms.txt from the templates in
 * src/content/llms/ by filling in the facts held in src/data/storeFacts.json.
 *
 * Why this exists: addresses, phone numbers and prices were previously typed into
 * long text files by hand, alongside the same values in the pages and the
 * JSON-LD. A model cross-checks llms.txt against the site, so a single stale
 * address is worse than none. Facts now live in exactly one place; the prose lives
 * in the templates and never repeats a fact literally.
 *
 * Runs BEFORE the vite build (see package.json), never after — anything written to
 * public/ after the dist copy would never ship.
 *
 * Usage: node scripts/build-llms.mjs [--check]
 *   --check  verifies the committed public/*.txt match the templates and facts,
 *            and fails instead of writing. Use in CI or before a deploy.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { perLitre, rm } from './lib/price-math.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FACTS = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
const CHECK = process.argv.includes('--check');

const { seller: S, branches: B, prices: P, scale } = FACTS;

const OUTPUTS = [
  { lang: 'en', template: 'src/content/llms/en.txt', out: 'public/llms.txt', sellerName: S.name },
  { lang: 'ms', template: 'src/content/llms/ms.txt', out: 'public/llms-ms.txt', sellerName: S.nameMs },
];

const addr = (b) => `${b.street}, ${b.postalCode} ${b.locality}, ${b.region}`;
const CATALOGUE = JSON.parse(readFileSync(join(ROOT, 'src/data/catalogue.json'), 'utf8'));

/** Display + per-litre display for one product/size, read from storeFacts — never typed. */
function price(key, size) {
  const p = P.products?.[key]?.[`ml${size}`];
  if (!p) throw new Error(`build-llms: storeFacts.prices.products.${key}.ml${size} is not set`);
  return { display: p.display, perL: rm(perLitre(p.amount, size)) };
}

/** "A, B, C and D" (en) / "A, B, C dan D" (ms). */
function joinList(items, lang) {
  const and = lang === 'ms' ? 'dan' : 'and';
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}
const label = (b, lang) => (lang === 'ms' ? b.labelMs : b.labelEn);

/**
 * One line per branch, in storeFacts order. Hours appear ONLY for a branch whose
 * `hours` is set (O-33) — the others say to ask, never a guessed time.
 */
function branchList(lang) {
  return B.map((b) => {
    const hours = b.hours
      ? lang === 'ms' ? `Waktu operasi: ${b.hours.displayMs}.` : `Opening hours: ${b.hours.displayEn}.`
      : lang === 'ms' ? 'Waktu operasi: tanya melalui WhatsApp.' : 'Opening hours: ask on WhatsApp.';
    const maps = lang === 'ms' ? 'Peta' : 'Map';
    return `- **${label(b, lang)}** — ${addr(b)}, Malaysia. ${hours} ${maps}: ${b.mapsUrl}`;
  }).join('\n');
}

/** The hours sentence: names only the branches with published hours, grouped by identical hours. */
function branchHoursLine(lang) {
  const withHours = B.filter((b) => b.hours);
  const without = B.filter((b) => !b.hours);
  const groups = new Map();
  for (const b of withHours) {
    const k = lang === 'ms' ? b.hours.displayMs : b.hours.displayEn;
    groups.set(k, [...(groups.get(k) ?? []), label(b, lang)]);
  }
  const parts = [...groups].map(([display, names]) =>
    `${joinList(names, lang)}: ${display}`,
  );
  const known = parts.join('; ');
  const rest = joinList(without.map((b) => label(b, lang)), lang);
  if (lang === 'ms') {
    return `${known ? `Waktu operasi yang disiarkan — ${known}.` : ''}${rest ? ` Untuk ${rest}, tanya waktu operasi melalui WhatsApp ${S.whatsappDisplay}.` : ''}`.trim();
  }
  return `${known ? `Published opening hours — ${known}.` : ''}${rest ? ` For ${rest}, ask for opening hours on WhatsApp ${S.whatsappDisplay}.` : ''}`.trim();
}

/** Infused price: the owner has not set one yet, so the text says where to ask — never a number. */
function infusedPriceNote(lang) {
  const p = P.products?.infused?.ml250;
  if (p) return lang === 'ms' ? `${p.display} untuk 250 ml` : `${p.display} for 250 ml`;
  return lang === 'ms'
    ? '250 ml sahaja — harga di kedai; tanya melalui WhatsApp'
    : '250 ml only — price in store; ask on WhatsApp';
}

if (!CATALOGUE.products.some((p) => p.id === 'organic')) throw new Error('build-llms: catalogue has no organic product');

/**
 * The article index each llms.txt carries, built from the registry rather than
 * typed into the template.
 *
 * A hand-written list of article URLs rots the moment a round publishes: the
 * file keeps claiming articles that moved and omitting ones that exist, and a
 * model quoting it sends readers to 404s. Reading the manifest means the index
 * cannot disagree with the site — and an empty manifest yields an empty section
 * rather than a stale one.
 *
 * The manifest is written by scripts/press-import.py, which derives it from the
 * same content modules the site renders.
 */
const MANIFEST_PATH = join(ROOT, 'src/content/articles/manifest.json');
const MANIFEST = existsSync(MANIFEST_PATH)
  ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  : [];

function articleIndexFor(lang) {
  const mine = MANIFEST.filter((a) => a.lang === lang);
  if (mine.length === 0) return '';
  return mine
    .map((a) => `- ${a.h1}\n  https://avoliveoil.com/${lang}/blog/${a.slug}\n  ${a.excerpt}`)
    .join('\n');
}

/**
 * The freshness line was a hardcoded date in every template, so it never moved: the
 * briefs claimed 2026-08-14 while indexing articles published 2026-08-25. A build clock
 * would churn the file on every build and break --check, so this derives the date from the
 * newest article the manifest carries — content-derived, deterministic, and it cannot go
 * stale while the index below it grows.
 */
// The last date a fact in storeFacts.json changed (FORGE PRODUCTS-R1: prices + 5 branches).
// A facts change is content too, so the freshness line never claims a date older than it.
const FACTS_REVISED = '2026-11-04';

function lastUpdated() {
  const dates = [FACTS_REVISED, ...MANIFEST.map((a) => a.dateModified || a.datePublished)].filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : '';
}

function tokensFor(sellerName, lang) {
  return {
    ARTICLES: articleIndexFor(lang),
    LAST_UPDATED: lastUpdated(),
    SELLER: sellerName,
    SELLER_URL: S.url,
    EMAIL: S.email,
    WHATSAPP: S.whatsappDisplay,
    SHOPEE: S.shopeeUrl,
    TIKTOK: S.tiktokShopUrl,
    BRANCH_COUNT: String(B.length),
    BRANCH_LIST: branchList(lang),
    BRANCH_NAMES: joinList(B.map((b) => b.labelEn), 'en'),
    BRANCH_NAMES_MS: joinList(B.map((b) => b.labelMs), 'ms'),
    BRANCH_HOURS_LINE: branchHoursLine(lang),
    RESTAURANT: `${FACTS.restaurant.street}, ${FACTS.restaurant.postalCode} ${FACTS.restaurant.locality}, ${FACTS.restaurant.region}`,
    EV250: price('extra-virgin', '250').display,
    EV500: price('extra-virgin', '500').display,
    OR250: price('organic', '250').display,
    OR500: price('organic', '500').display,
    EV250_PER_L: price('extra-virgin', '250').perL,
    EV500_PER_L: price('extra-virgin', '500').perL,
    OR250_PER_L: price('organic', '250').perL,
    OR500_PER_L: price('organic', '500').perL,
    INFUSED_PRICE_NOTE: infusedPriceNote(lang),
    CUSTOMERS: scale.customersServedDisplay,
    FOUNDED: String(S.foundedYear),
  };
}

/** Every fact a template must take from a token: contacts, every branch street and every price display. */
function forbiddenLiterals() {
  const prices = Object.values(P.products).flatMap((sizes) =>
    Object.entries(sizes)
      .filter(([, v]) => v)
      .flatMap(([size, v]) => [v.display, rm(perLitre(v.amount, size.replace('ml', '')))]),
  );
  return [
    S.email,
    S.whatsappDisplay,
    S.shopeeUrl,
    S.tiktokShopUrl,
    FACTS.restaurant.street,
    ...B.map((b) => b.street),
    ...B.map((b) => b.mapsUrl),
    ...prices,
  ];
}

let failed = false;

for (const target of OUTPUTS) {
  const templatePath = join(ROOT, target.template);
  if (!existsSync(templatePath)) {
    console.error(`✗ missing template ${target.template}`);
    failed = true;
    continue;
  }
  const template = readFileSync(templatePath, 'utf8');
  const tokens = tokensFor(target.sellerName, target.lang);

  const rendered = template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, name) => {
    if (!(name in tokens)) {
      console.error(`✗ ${target.template}: unknown token ${match}`);
      failed = true;
      return match;
    }
    return tokens[name];
  });

  // A template must never hardcode a fact — that is the whole point of this script.
  // Whitespace is normalised on both sides, so a value wrapped
  // across two lines ("Jalan Prima" / "SG 2") is still caught.
  const norm = (v) => String(v).replace(/\s+/g, ' ').trim();
  const flatTemplate = norm(template);
  for (const value of forbiddenLiterals()) {
    if (flatTemplate.includes(norm(value))) {
      console.error(`✗ ${target.template} hardcodes "${value}" — use a token instead.`);
      failed = true;
    }
  }

  const outPath = join(ROOT, target.out);
  if (CHECK) {
    const current = existsSync(outPath) ? readFileSync(outPath, 'utf8') : '';
    if (current !== rendered) {
      console.error(`✗ ${target.out} is out of date — run: node scripts/build-llms.mjs`);
      failed = true;
    } else {
      console.log(`✓ ${target.out} up to date (${rendered.length} bytes)`);
    }
  } else {
    writeFileSync(outPath, rendered, 'utf8');
    console.log(`✓ wrote ${target.out} (${rendered.length} bytes)`);
  }
}

if (failed) process.exit(1);
