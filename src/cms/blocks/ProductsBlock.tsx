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
 * an existing page shows here too); the bottle comes from the stable /cms-assets/
 * copy, never a hashed build file.
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
  const sizes = '(min-width: 768px) 48px, 46px';
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
