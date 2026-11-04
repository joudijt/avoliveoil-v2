/**
 * Products the `products` widget can show (spec §4, §14.1 catalogue.json).
 *
 * The real catalogue (src/data/catalogue.json, FORGE PRODUCTS-R1 O-1): Extra
 * Virgin, Organic Extra Virgin and the six infused flavours. Names and taglines
 * stay in i18n (each product's `i18n` prefix) so the owner's text edits of
 * existing pages flow into CMS pages too. Ids are the catalogue `cmsId`s —
 * Extra Virgin keeps `classic` because stored pages reference it — and must stay
 * identical to the build's catalogue.json (scripts/cms-build-data.mjs reads the
 * same source), which the admin uses to offer the choices.
 *
 * Images use STABLE unhashed paths `/cms-assets/<name>-<w>.webp` (copied from
 * src/assets/opt at build): published page HTML lives in the database for months
 * and must not point at a hashed /assets/ file that the next deploy deletes.
 */
import manifest from '../assets/opt/manifest.json';
import { PRODUCTS } from '../data/products';
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

/**
 * The old tall 343×1683 bottle. No product shows it any more, but page HTML
 * published before FORGE PRODUCTS-R1 still points at /cms-assets/bottle-cutout-343.webp
 * until each page is re-rendered, so it stays in the asset list (and in the build).
 */
const LEGACY_BOTTLE = 'bottle-cutout';

export const CATALOGUE: CatalogueItem[] = PRODUCTS.map(
  (p): CatalogueItem => ({
    id: p.cmsId,
    kind: p.kind,
    ...(p.kind === 'infused' && p.slug ? { slug: p.slug } : {}),
    nameKey: `${p.i18n}.name`,
    taglineKey: `${p.i18n}.tagline`,
    // Each product's own white 1200×1200 square.
    image: cmsAsset(p.image),
  })
);

/** Image names any block can show — scripts/cms-build-data.mjs copies these to /cms-assets/. */
export const CMS_ASSET_NAMES: string[] = [...PRODUCTS.map((p) => p.image), LEGACY_BOTTLE];

export function findCatalogueItem(id: string): CatalogueItem | undefined {
  return CATALOGUE.find((p) => p.id === id);
}

export function catalogueHref(item: CatalogueItem, lang: CmsLang): string {
  return item.kind === 'infused' && item.slug ? `/${lang}/products/${item.slug}` : `/${lang}/products`;
}
