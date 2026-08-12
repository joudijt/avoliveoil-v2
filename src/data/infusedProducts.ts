import bottleImg from '../assets/images/bottle-cutout.png';
import slugs from './infusedSlugs.json';

export interface InfusedProduct {
  /** i18n key under `infusedPage.products.<id>`. */
  id: string;
  /** Full URL segment under /:lang/products/ — same in every language. */
  slug: string;
  image: string;
}

const SLUG_PREFIX = 'infused-extra-virgin-olive-oil-';

/**
 * Structural-only (id + slug + image), same pattern as PRODUCTS: every
 * user-visible string lives in i18n via `infusedPage.products.<id>`.
 * The slug list is duplicated in `infusedSlugs.json` because
 * scripts/prerender.mjs (plain .mjs, can't import .ts) needs the same
 * routes; the assertion below fails the build loudly if they drift.
 */
export const INFUSED_PRODUCTS: InfusedProduct[] = [
  { id: 'lavender-chamomile', slug: `${SLUG_PREFIX}lavender-chamomile`, image: bottleImg },
  { id: 'blackseed', slug: `${SLUG_PREFIX}blackseed`, image: bottleImg },
  { id: 'turmeric-black-pepper', slug: `${SLUG_PREFIX}turmeric-black-pepper`, image: bottleImg },
  { id: 'rosemary-basil', slug: `${SLUG_PREFIX}rosemary-basil`, image: bottleImg },
  { id: 'fennel-anise', slug: `${SLUG_PREFIX}fennel-anise`, image: bottleImg },
  { id: 'wild-thyme', slug: `${SLUG_PREFIX}wild-thyme`, image: bottleImg },
];

for (const product of INFUSED_PRODUCTS) {
  if (!slugs.includes(product.slug)) {
    throw new Error(
      `infusedSlugs.json is out of sync: missing "${product.slug}". ` +
        'Update src/data/infusedSlugs.json to match INFUSED_PRODUCTS.'
    );
  }
}

export function findInfusedProduct(slug: string | undefined): InfusedProduct | undefined {
  return INFUSED_PRODUCTS.find((p) => p.slug === slug);
}
