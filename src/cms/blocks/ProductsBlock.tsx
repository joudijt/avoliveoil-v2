import { useTranslation } from 'react-i18next';
import type { ProductsWidget } from '../contracts';
import { CATALOGUE, catalogueHref, findCatalogueItem, type CatalogueItem } from '../catalogue';
import { srcSetOf, widestUrl } from '../media';
import { PRODUCTS } from './classes';
import { useBlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { ui } from './strings';

/**
 * Product cards in the style of the Products page collection grid. Names and
 * taglines are the site's own i18n strings (so an owner edit of a product name on
 * an existing page shows here too); the photo (each product's white square,
 * FORGE PRODUCTS-R1 O-14) comes from the stable /cms-assets/ copy, never a hashed
 * build file.
 */
export function ProductsBlock({ w }: { w: ProductsWidget }) {
  const env = useBlockEnv();
  const { t } = useTranslation();
  const s = w.settings;
  const items = (s.ids ?? []).map(findCatalogueItem).filter((p): p is CatalogueItem => !!p);
  if (items.length === 0) {
    return env.mode === 'canvas' ? <CanvasEmpty label={`Products — pick from ${CATALOGUE.length} products in the settings panel`} /> : null;
  }
  const cols = s.cols === 2 || s.cols === 4 ? s.cols : 3;
  // Rendered width of the square photo per column count (container max-w-6xl, card padding).
  const sizes =
    cols === 2
      ? '(min-width: 640px) 520px, 90vw'
      : cols === 4
        ? '(min-width: 1024px) 250px, (min-width: 640px) 45vw, 42vw'
        : '(min-width: 1024px) 340px, (min-width: 640px) 45vw, 42vw';
  return (
    <ul className={PRODUCTS.grid[cols]}>
      {items.map((p) => {
        const name = t(p.nameKey);
        return (
          <li key={p.id}>
            <a href={catalogueHref(p, env.lang)} className={PRODUCTS.card}>
              <span className={PRODUCTS.imgWrap}>
                <img
                  src={widestUrl(p.image.variants)}
                  srcSet={srcSetOf(p.image.variants)}
                  sizes={sizes}
                  width={p.image.width}
                  height={p.image.height}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className={PRODUCTS.img}
                />
              </span>
              <h3 className={PRODUCTS.name}>{name}</h3>
              {s.showTagline ? <p className={PRODUCTS.tagline}>{t(p.taglineKey)}</p> : null}
              <span className={PRODUCTS.cta} aria-hidden="true">
                {`${ui(env.lang, 'viewProduct')} →`}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
