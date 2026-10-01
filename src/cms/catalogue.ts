/**
 * Products the `products` widget can show (spec §4, §14.1 catalogue.json).
 *
 * The classic olive oil (Products page) plus the six infused flavours
 * (INFUSED_PRODUCTS). Names and taglines stay in i18n so the owner's text edits
 * of existing pages flow into CMS pages too. Ids — `classic`, `blackseed` … —
 * must stay identical to `catalogue.json` (scripts/cms-build-data.mjs), which
 * the admin uses to offer the choices.
 *
 * Images use STABLE unhashed paths `/cms-assets/<name>-<w>.webp` (copied from
 * src/assets/opt at build): published page HTML lives in the database for months
 * and must not point at a hashed /assets/ file that the next deploy deletes.
 */
import manifest from '../assets/opt/manifest.json';
import { INFUSED_PRODUCTS } from '../data/infusedProducts';
import type { CmsLang, MediaVariant } from './contracts';

export interface CatalogueImage {
  name: string;
  width: number;
  height: number;
  variants: MediaVariant[];
}

export interface CatalogueItem {
  id: string;
  kind: 'infused' | 'classic';
  /** i18n keys (common namespace) */
  nameKey: string;
  taglineKey: string;
  /** product detail slug (infused only) */
  slug?: string;
  image: CatalogueImage;
}

interface ManifestEntry {
  width: number;
  height: number;
  widths: number[];
}

const MANIFEST = manifest as Record<string, ManifestEntry>;

export function cmsAsset(name: string): CatalogueImage {
  const entry = MANIFEST[name];
  if (!entry) return { name, width: 0, height: 0, variants: [] };
  return {
    name,
    width: entry.width,
    height: entry.height,
    variants: entry.widths.map((w) => ({ w, url: `/cms-assets/${name}-${w}.webp` })),
  };
}

/** Every product ships in the same 343×1683 bottle (see ProductShowcase). */
const BOTTLE = 'bottle-cutout';

export const CATALOGUE: CatalogueItem[] = [
  // The one classic product the site sells (two sizes), as the Products page shows it.
  {
    id: 'classic',
    kind: 'classic',
    nameKey: 'productsPage.product.name',
    taglineKey: 'productsPage.product.tagline',
    image: cmsAsset(BOTTLE),
  },
  ...INFUSED_PRODUCTS.map(
    (p): CatalogueItem => ({
      id: p.id,
      kind: 'infused',
      slug: p.slug,
      nameKey: `infusedPage.products.${p.id}.name`,
      taglineKey: `infusedPage.products.${p.id}.tagline`,
      image: cmsAsset(BOTTLE),
    })
  ),
];

/** Image names any block can show — scripts/cms-build-data.mjs copies these to /cms-assets/. */
export const CMS_ASSET_NAMES: string[] = [BOTTLE];

export function findCatalogueItem(id: string): CatalogueItem | undefined {
  return CATALOGUE.find((p) => p.id === id);
}

export function catalogueHref(item: CatalogueItem, lang: CmsLang): string {
  return item.kind === 'infused' && item.slug ? `/${lang}/products/${item.slug}` : `/${lang}/products`;
}
