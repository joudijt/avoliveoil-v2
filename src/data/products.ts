import catalogue from './catalogue.json';
import storeFacts from './storeFacts.json';
import type { PriceKey, Size, SizePrice } from '../lib/priceMath';

/**
 * The real catalogue (FORGE PRODUCTS-R1 O-1): Extra Virgin, Organic Extra Virgin
 * and the six infused flavours. Source = src/data/catalogue.json (shared with the
 * .mjs build scripts). Names/taglines come from i18n under `i18n` (prefix).
 * Prices come from storeFacts.json via `priceOf` — never typed into content.
 */
export interface Product {
  id: string;
  /** Id the CMS uses (Extra Virgin = 'classic' for backward compatibility). */
  cmsId: string;
  kind: 'classic' | 'infused';
  /** Base name of the white 1200x1200 square in src/assets/images. */
  image: string;
  sizes: Size[];
  priceKey: PriceKey;
  /** i18n key prefix: `${i18n}.name`, `${i18n}.tagline`, `${i18n}.imageAlt`. */
  i18n: string;
  /** Infused only: URL segment under /:lang/products/. */
  slug?: string;
}

export const PRODUCTS: Product[] = catalogue.products as Product[];
export const CLASSIC_PRODUCTS = PRODUCTS.filter((p) => p.kind === 'classic');

/** Price for one size of a product, or null when the owner has not set it. */
export function priceOf(product: Pick<Product, 'priceKey'>, size: Size): SizePrice | null {
  const byKey = storeFacts.prices.products as Record<string, Record<string, SizePrice | null>>;
  const p = byKey[product.priceKey];
  if (!p) throw new Error(`products: unknown priceKey "${product.priceKey}"`);
  return p[`ml${size}`] ?? null;
}

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
