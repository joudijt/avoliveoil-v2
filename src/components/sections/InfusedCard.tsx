import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Picture } from '../ui/Picture';
import { cmsText } from '../../cms/editable';
import { priceOf } from '../../data/products';
import { BuyNowButton } from '../../order/BuyNowButton';

/** What a card needs from either INFUSED_PRODUCTS or the catalogue. */
export interface InfusedCardProduct {
  id: string;
  slug?: string;
  image: string;
}

/**
 * One infused flavour as a card (FORGE PRODUCTS-R1 §3): white square photo on top,
 * full name, tagline, then a footer row with the only size (250 ml), its price from
 * storeFacts (owner 2026-11-05: RM75; hidden if ever unset — never a guess) and a small
 * "in store now" note. Used by the /products grid and
 * by the "other flavours" grid on each infused page, so both stay identical.
 * The link covers photo + text; the order button is its sibling inside the same
 * card box, never inside the anchor (FORGE ORDER-R1 O-15).
 */
export function InfusedCard({ product, lang }: { product: InfusedCardProduct; lang: string }) {
  const { t } = useTranslation();
  const key = `infusedPage.products.${product.id}`;
  const infusedPrice = priceOf({ priceKey: 'infused' }, '250');
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-olive-dark/10 bg-cream text-start transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(46,58,36,0.14)]">
      <Link
        to={`/${lang}/products/${product.slug}`}
        className="flex flex-1 flex-col rounded-t-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold"
      >
        <span className="block aspect-square overflow-hidden border-b border-olive-dark/5 bg-white">
          <Picture
            name={product.image}
            alt={t(`${key}.imageAlt`)}
            cmsAltKey={`${key}.imageAlt`}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 50vw"
          />
        </span>
        <span className="flex flex-1 flex-col p-4 pb-3 sm:p-6 sm:pb-4">
          <h3
            {...cmsText(`${key}.name`)}
            className="font-display text-[15px] leading-snug text-olive-dark transition-colors duration-300 group-hover:text-gold-ink sm:text-lg"
          >
            {t(`${key}.name`)}
          </h3>
          <p {...cmsText(`${key}.tagline`)} className="mt-2 font-body text-sm leading-relaxed text-brown-ink">
            {t(`${key}.tagline`)}
          </p>
          <span className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-4">
            <span {...cmsText('infusedPage.size250')} className="font-body text-sm font-bold text-olive-dark">
              {t('infusedPage.size250')}
              {infusedPrice ? <span className="font-display font-normal"> · {infusedPrice.display}</span> : null}
            </span>
            <InStoreNote />
          </span>
        </span>
      </Link>
      <BuyNowButton productId={product.id} className="px-4 pb-4 sm:px-6 sm:pb-6" />
    </div>
  );
}

/** Small green-dot "In store now" note (infused cards + the infused page price line). */
export function InStoreNote({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <span className={`inline-flex items-center gap-1.5 font-body text-xs text-brown-ink ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#3f8a3c]" />
      <span {...cmsText('infusedPage.inStoreNote')}>{t('infusedPage.inStoreNote')}</span>
    </span>
  );
}
