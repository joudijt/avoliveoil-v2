
export interface Product {
  id: string;
}

/**
 * Structural-only (id only). Display name/description come from i18n
 * via `productShowcase.products.<id>` — see src/i18n/locales/<lang>/common.json.
 * Add a new product by adding an entry here AND a matching key in every
 * locale file; no layout/animation changes needed.
 */
export const PRODUCTS: Product[] = [
  { id: 'reserve' },
  { id: 'organic' },
  { id: 'classic' },
  { id: 'family' },
  { id: 'gold' },
];
