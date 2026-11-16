import { PRODUCTS, priceOf } from '../data/products';
import type { Size } from '../lib/priceMath';

/** `${productId}:${size}`, e.g. 'extra-virgin:500' (the pay server's AV sku). */
export type Sku = string;

/** One orderable product + size. A size with no price set is not orderable. */
export interface OrderItem {
  sku: Sku;
  productId: string;
  size: Size;
  /** Unit price in integer sen. */
  priceSen: number;
  /** Price as shown on cards, e.g. 'RM59' (from storeFacts). */
  display: string;
  /** i18n prefix of the product (`${i18n}.name`). */
  i18n: string;
}

/** '59.00' -> 5900 without float maths. Returns null for anything else. */
export function amountToSen(amount: string): number | null {
  const m = /^(\d{1,6})(?:\.(\d{1,2}))?$/.exec(amount.trim());
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? '').padEnd(2, '0'));
}

export const ORDER_ITEMS: OrderItem[] = PRODUCTS.flatMap((p) =>
  p.sizes.flatMap((size) => {
    const price = priceOf(p, size);
    const priceSen = price ? amountToSen(price.amount) : null;
    if (!price || priceSen === null || priceSen <= 0) return [];
    return [{ sku: `${p.id}:${size}`, productId: p.id, size, priceSen, display: price.display, i18n: p.i18n }];
  })
);

export const VALID_SKUS: readonly Sku[] = ORDER_ITEMS.map((i) => i.sku);

export function itemsForProduct(productId: string): OrderItem[] {
  return ORDER_ITEMS.filter((i) => i.productId === productId);
}

export function findItem(sku: Sku): OrderItem | undefined {
  return ORDER_ITEMS.find((i) => i.sku === sku);
}

/**
 * The size a Buy-now button preselects (BUY-NOW 4a): 500 ml where the product has it, else its
 * first orderable size. A product page can pass another size.
 */
export function defaultItem(productId: string): OrderItem | undefined {
  const items = itemsForProduct(productId);
  return items.find((i) => i.size === '500') ?? items[0];
}
