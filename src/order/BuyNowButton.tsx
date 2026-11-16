/**
 * "Buy now" button (FORGE BUY-NOW; replaces the ORDER-R1 "Add to cart"). Entry bundle: keep it
 * small and never import the sheet statically (the bundle gate counts static imports).
 *
 * - Tap = the Buy-now sheet for this product, default size preselected (500 ml where it exists).
 * - pointerenter / touchstart / focus start the download of the sheet chunk (first-tap latency).
 * - The first render never reads storage or `window`, so prerendered, published (CMS) and live
 *   markup are the same. Inert when `inert` or !orderEnabled() (O-13). Never inside an <a> (O-15).
 * - Text: t('order.buyNow'). Test hooks: data-testid="buy-now" + data-product (+ data-size).
 *
 * Every class below is also listed in src/cms/blocks/classes.ts (PRODUCTS.order): the CMS products
 * block publishes this markup as stored HTML. Change both together.
 */
import { useTranslation } from 'react-i18next';
import { defaultItem } from './catalog';
import { openBuyNow, preloadBuyNow } from './bridge';

export interface BuyNowButtonProps {
  productId: string;
  /** Preselect this size instead of the product's default. */
  size?: string;
  /** Visual size. 'card' = compact, full width of a product card; 'page' = larger, product pages. */
  variant?: 'card' | 'page';
  /** Dark background behind the button (light text). */
  onDark?: boolean;
  /** Render the markup but ignore taps (CMS canvas). */
  inert?: boolean;
  className?: string;
}

const BTN =
  'flex w-full items-center justify-center gap-1.5 rounded-full text-center font-body font-semibold transition-colors duration-300 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';
const SIZE = { card: 'min-h-11 px-2 py-2 text-[13px] tracking-normal sm:text-sm', page: 'min-h-12 px-7 py-3 text-base tracking-wide' };
const LIGHT = 'bg-olive-dark text-cream hover:bg-gold hover:text-[#1f2818]';
const DARK = 'bg-gold text-[#1f2818] hover:bg-cream';

export function BuyNowButton({ productId, size, variant = 'card', onDark = false, inert = false, className }: BuyNowButtonProps) {
  const { t } = useTranslation();
  const item = defaultItem(productId);
  if (!item) return null;
  const preload = inert ? undefined : preloadBuyNow;
  return (
    <div className={className}>
      <button
        type="button"
        data-testid="buy-now"
        data-product={productId}
        {...(size ? { 'data-size': size } : {})}
        className={`${BTN} ${SIZE[variant]} ${onDark ? DARK : LIGHT}`}
        onPointerEnter={preload}
        onTouchStart={preload}
        onFocus={preload}
        onClick={() => {
          if (!inert) openBuyNow(productId, size);
        }}
      >
        <span data-cms="order.buyNow">{t('order.buyNow')}</span>
      </button>
    </div>
  );
}
