/**
 * Generates public/llms.txt, llms-ms.txt and llms-ar.txt from the templates in
 * src/content/llms/ by filling in the facts held in src/data/storeFacts.json.
 *
 * Why this exists: addresses, phone numbers and prices were previously typed into
 * three long text files by hand, alongside the same values in the pages and the
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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FACTS = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
const CHECK = process.argv.includes('--check');

const { seller: S, branches: B, prices: P, scale } = FACTS;

const OUTPUTS = [
  { lang: 'en', template: 'src/content/llms/en.txt', out: 'public/llms.txt', sellerName: S.name },
  { lang: 'ms', template: 'src/content/llms/ms.txt', out: 'public/llms-ms.txt', sellerName: S.nameMs },
  { lang: 'ar', template: 'src/content/llms/ar.txt', out: 'public/llms-ar.txt', sellerName: S.nameAr },
];

const addr = (b) => `${b.street}, ${b.postalCode} ${b.locality}, ${b.region}`;

function tokensFor(sellerName) {
  return {
    SELLER: sellerName,
    SELLER_URL: S.url,
    EMAIL: S.email,
    WHATSAPP: S.whatsappDisplay,
    SHOPEE: S.shopeeUrl,
    TIKTOK: S.tiktokShopUrl,
    BRANCH1: addr(B[0]),
    BRANCH2: addr(B[1]),
    BRANCH1_FULL: `${addr(B[0])}, Malaysia`,
    BRANCH2_FULL: `${addr(B[1])}, Malaysia`,
    RESTAURANT: `${FACTS.restaurant.street}, ${FACTS.restaurant.postalCode} ${FACTS.restaurant.locality}, ${FACTS.restaurant.region}`,
    P250: P.ml250.display,
    P500: P.ml500.display,
    P250_PER_L: P.ml250.perLitreDisplay,
    P500_PER_L: P.ml500.perLitreDisplay,
    CUSTOMERS: scale.customersServedDisplay,
    FOUNDED: String(S.foundedYear),
  };
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
  const tokens = tokensFor(target.sellerName);

  const rendered = template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, name) => {
    if (!(name in tokens)) {
      console.error(`✗ ${target.template}: unknown token ${match}`);
      failed = true;
      return match;
    }
    return tokens[name];
  });

  // A template must never hardcode a fact — that is the whole point of this script.
  const forbidden = [S.email, S.whatsappDisplay, S.shopeeUrl, P.ml250.display, P.ml500.display, B[0].street, B[1].street];
  for (const value of forbidden) {
    if (template.includes(value)) {
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
