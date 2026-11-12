/**
 * Header cart icon + count badge (FORGE ORDER-R1). Entry bundle: keep it small (O-1).
 *
 * - Badge renders nothing at count 0 (O-14). The count is 0 and there is no dot wherever
 *   orderEnabled() is false (prerender, CMS edit, static markup), on the first render and
 *   until the store has loaded (it is fetched after mount through ./bridge).
 * - The aria-label carries the owner-edit marker for order.cartLabel, like the menu button.
 * - A saved order with an empty cart shows a dot instead of a number (O-7).
 * - Click = openCart() of ./bridge. aria-label from t('order.cartLabel') / t('order.cartCount').
 * - Test hooks: data-testid="cart-button", badge data-testid="cart-count".
 */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cmsAttr } from '../cms/editable';
import { loadStore, openCart, orderEnabled, useCartCount, useOrderUi } from './bridge';

export interface CartButtonProps {
  /** true = dark icon on a light header (navbar `darkControls`), false = light icon (O-20). */
  dark?: boolean;
  className?: string;
}

export function CartButton({ dark = false, className = '' }: CartButtonProps) {
  const { t } = useTranslation();
  const count = useCartCount();
  const { hasOrder } = useOrderUi();
  // The store is not in the first-render bundle: fetch it once mounted, so the badge and the
  // saved-order dot appear shortly after load. A failure here is silent; a click reports it.
  useEffect(() => {
    if (orderEnabled()) loadStore().catch(() => {});
  }, []);
  return (
    <button
      type="button"
      data-testid="cart-button"
      onClick={openCart}
      aria-label={count > 0 ? `${t('order.cartLabel')}: ${t('order.cartCount', { count })}` : t('order.cartLabel')}
      {...cmsAttr({ 'aria-label': 'order.cartLabel' })}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        dark ? 'text-olive-dark' : 'text-white'
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[22px] w-[22px]"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 ? (
        <span
          data-testid="cart-count"
          className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-body text-[11px] font-bold leading-none text-[#1f2818]"
        >
          {count}
        </span>
      ) : hasOrder ? (
        <span aria-hidden="true" className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-gold" />
      ) : null}
    </button>
  );
}
