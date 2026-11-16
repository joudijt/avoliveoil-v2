// FORGE HITPAY §5.1: the price table the pay server charges from, written at build time to
// dist/api/_data/prices.json (blocked from HTTP by server/_data/.htaccess + the docroot rules).
//
// AV prices come from the SAME sources the cart uses (src/order/catalog.ts): catalogue.json
// products x sizes, priced by storeFacts.json prices.products[priceKey].ml<size>, SKU =
// `<product id>:<size>` (the catalogue `id`, NOT `cmsId`: Extra Virgin is 'extra-virgin', not
// 'classic'). Short names + the state list come from src/order/messageStrings.ts (one list for
// the form and the server). NF = server/_data/noorfes.json (3 packs), cross-checked against the Noor
// Fès repo's site.ts `packages` when that repo is next to this one (skipped with a warning otherwise).
// The delivery fee is NOT here: it is a panel setting per site (RULINGS R3).
//
//   node scripts/build-prices.mjs [out.json]     (default dist/api/_data/prices.json)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

/** '59.00' -> 5900 without float maths (same rule as catalog.ts amountToSen). */
function amountToSen(amount) {
  const m = /^(\d{1,6})(?:\.(\d{1,2}))?$/.exec(String(amount).trim());
  return m ? Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0')) : null;
}

/**
 * Reads `packages: [{ id: 'pack1', bottles: 1, priceRM: 149 }, ...]` from site.ts without running
 * it. Tolerant of quotes, spacing, line breaks, key order, trailing commas, `as const` and decimals.
 * @returns {{id: string, bottles: number|null, sen: number|null}[] | null} null = no packages array
 */
export function parseSitePackages(src) {
  const at = /(?<![\w$.])packages\s*[:=]\s*\[/.exec(src);
  if (!at) return null;
  let i = at.index + at[0].length;
  let depth = 1;
  const from = i;
  for (; i < src.length && depth > 0; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') depth--;
  }
  if (depth !== 0) return null;
  const body = src.slice(from, i - 1);
  const out = [];
  for (const m of body.matchAll(/\{([^{}]*)\}/g)) {
    const o = m[1];
    const id = /(?:^|[\s,])['"]?id['"]?\s*:\s*['"`]([^'"`]+)['"`]/.exec(o)?.[1] ?? null;
    const b = /(?:^|[\s,])['"]?bottles['"]?\s*:\s*(\d+)/.exec(o);
    const p = /(?:^|[\s,])['"]?priceRM['"]?\s*:\s*(\d+)(?:\.(\d{1,2}))?(?!\d)/.exec(o);
    out.push({ id, bottles: b ? Number(b[1]) : null, sen: p ? Number(p[1]) * 100 + Number((p[2] ?? '').padEnd(2, '0')) : null });
  }
  return out;
}

/** Every server pack must appear in site.ts with the same bottles and price, and nothing extra. */
export function comparePackages(shown, packs) {
  const problems = [];
  for (const pk of packs) {
    const s = shown.find((x) => x.id === pk.id);
    if (!s) problems.push(`${pk.id} missing in site.ts`);
    else {
      if (s.sen !== pk.priceSen) problems.push(`${pk.id}: site.ts shows ${s.sen} sen, server charges ${pk.priceSen} sen`);
      if (s.bottles !== pk.bottles) problems.push(`${pk.id}: site.ts says ${s.bottles} bottles, server ${pk.bottles}`);
    }
  }
  for (const s of shown) if (!packs.some((pk) => pk.id === s.id)) problems.push(`site.ts package ${s.id} is not sold by the server`);
  return problems;
}

export async function buildPrices() {
  const catalogue = read('src/data/catalogue.json');
  const facts = read('src/data/storeFacts.json');
  const nf = read('server/_data/noorfes.json');
  const strings = await import(pathToFileURL(join(ROOT, 'src/order/messageStrings.ts')).href);

  const av = {};
  const names = {};
  for (const p of catalogue.products) {
    const byKey = facts.prices.products[p.priceKey];
    if (!byKey) throw new Error(`build-prices: unknown priceKey "${p.priceKey}"`);
    for (const size of p.sizes) {
      const price = byKey[`ml${size}`];
      const sen = price ? amountToSen(price.amount) : null;
      if (!sen || sen <= 0) continue; // same rule as catalog.ts: no price = not orderable
      const sku = `${p.id}:${size}`;
      av[sku] = sen;
      names[sku] = {
        en: `${strings.ORDER_NAMES.en[p.id] ?? p.id} ${strings.sizeLabel(size)}`,
        ms: `${strings.ORDER_NAMES.ms[p.id] ?? p.id} ${strings.sizeLabel(size)}`,
      };
    }
  }
  const packs = Array.isArray(nf.packs) ? nf.packs : [];
  if (packs.length < 1) throw new Error('build-prices: noorfes.json needs a non-empty packs array');
  const nfTable = {};
  const bottles = {};
  for (const pk of packs) {
    if (!/^pack\d$/.test(pk.id ?? '') || pk.sku !== `noor-fes:${pk.id}`) throw new Error(`build-prices: bad Noor Fès pack ${JSON.stringify(pk.id)}`);
    if (!Number.isInteger(pk.priceSen) || pk.priceSen <= 0) throw new Error(`build-prices: noorfes.json ${pk.id} priceSen must be a positive integer`);
    if (!Number.isInteger(pk.bottles) || pk.bottles < 1) throw new Error(`build-prices: noorfes.json ${pk.id} bottles must be a positive integer`);
    nfTable[pk.sku] = pk.priceSen;
    bottles[pk.sku] = pk.bottles;
    names[pk.sku] = pk.name;
  }
  for (const [alias, target] of Object.entries(nf.aliases ?? {})) {
    if (!nfTable[target]) throw new Error(`build-prices: alias ${alias} points at unknown sku ${target}`);
  }

  // Cross-repo check (minor 34, BUY-NOW B6): every package the NF page shows must be what we charge.
  const siteTs = join(ROOT, '..', 'noorfes-lp', 'src', 'data', 'site.ts');
  let nfCheck = 'skipped (noorfes-lp not next to this repo)';
  if (!existsSync(siteTs)) {
    console.warn('build-prices: WARNING noorfes-lp/src/data/site.ts not found next to this repo; Noor Fès price check skipped');
  } else {
    const shown = parseSitePackages(readFileSync(siteTs, 'utf8'));
    if (shown === null) {
      if (process.env.AVO_SKIP_NF_PRICE_CHECK === '1') {
        console.warn('build-prices: WARNING site.ts has no `packages` array; check skipped by AVO_SKIP_NF_PRICE_CHECK=1');
        nfCheck = 'SKIPPED by env (site.ts has no packages)';
      } else {
        throw new Error('build-prices: noorfes-lp site.ts has no `packages` array (set AVO_SKIP_NF_PRICE_CHECK=1 only while the NF lane is not merged)');
      }
    } else {
      const problems = comparePackages(shown, packs);
      if (problems.length) throw new Error(`build-prices: Noor Fès price mismatch: ${problems.join('; ')}`);
      nfCheck = `ok (site.ts packages ${shown.map((x) => `${x.id}=${x.sen / 100}`).join(', ')})`;
    }
  }
  return {
    table: {
      _comment: 'Generated by scripts/build-prices.mjs. Integer sen. Do not edit.',
      currency: facts.prices.currency,
      av,
      nf: nfTable,
      aliases: { av: {}, nf: { ...(nf.aliases ?? {}) } },
      // bottles per NF package sku (qty is always 1 for a pack; BUY-NOW B3)
      packs: { av: {}, nf: bottles },
      names,
      states: [...strings.STATES_MY],
    },
    nfCheck,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const out = process.argv[2] ?? join(ROOT, 'dist', 'api', '_data', 'prices.json');
  const { table, nfCheck } = await buildPrices();
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(table, null, 2) + '\n');
  console.log(`build-prices: ${Object.keys(table.av).length} AV SKUs + ${Object.keys(table.nf).length} NF packs -> ${out}; NF price check ${nfCheck}`);
}
