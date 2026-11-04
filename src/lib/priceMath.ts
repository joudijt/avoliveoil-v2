// Typed re-export of scripts/lib/price-math.mjs (FORGE PRODUCTS-R1 O-2) — one implementation.
// @ts-expect-error plain .mjs module without type declarations
import * as m from '../../scripts/lib/price-math.mjs';

export interface SizePrice {
  amount: string;
  display: string;
}
export type PriceKey = 'extra-virgin' | 'organic' | 'infused';
export type Size = '250' | '500';

export const perLitre = m.perLitre as (amount: string | number, ml: string | number) => number;
export const senPerMl = m.senPerMl as (amount: string | number, ml: string | number) => number;
export const rm = m.rm as (n: number) => string;
