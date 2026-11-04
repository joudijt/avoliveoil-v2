// FORGE PRODUCTS-R1 O-2: the ONLY place price arithmetic lives. Imported by
// scripts/build-llms.mjs, scripts/ai/facts-sync.mjs and (via src/lib/priceMath.ts)
// the React pages, so a per-litre figure can never drift between surfaces.

/** Ringgit per litre for a bottle, rounded to whole ringgit. 59.00 @ 250 -> 236. */
export function perLitre(amount, ml) {
  return Math.round((Number(amount) * 1000) / Number(ml));
}

/** Sen per millilitre, one decimal. 109.00 @ 500 -> 21.8. */
export function senPerMl(amount, ml) {
  return Math.round((Number(amount) * 100 * 10) / Number(ml)) / 10;
}

/** "RM236" style display of a whole-ringgit number. */
export function rm(n) {
  return `RM${n}`;
}

/** Look up a size price for a priceKey from storeFacts.prices; null when unset. */
export function priceFor(prices, priceKey, size) {
  const p = prices?.products?.[priceKey];
  if (!p) throw new Error(`price-math: unknown priceKey "${priceKey}"`);
  return p[`ml${size}`] ?? null;
}
