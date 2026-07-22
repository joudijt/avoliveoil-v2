import bottleImg from '../assets/images/bottle-cutout.png';

export interface Product {
  id: string;
  image: string;
}

/**
 * Structural-only (id + image). Display name/description come from i18n
 * via `productShowcase.products.<id>` — see src/i18n/locales/<lang>/common.json.
 * Add a new product by adding an entry here AND a matching key in every
 * locale file; no layout/animation changes needed.
 */
export const PRODUCTS: Product[] = [
  { id: 'reserve', image: bottleImg },
  { id: 'organic', image: bottleImg },
  { id: 'classic', image: bottleImg },
  { id: 'family', image: bottleImg },
  { id: 'gold', image: bottleImg },
];
