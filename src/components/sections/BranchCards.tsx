import { useTranslation } from 'react-i18next';
import { STORE_BRANCHES, branchAddress, branchLabel } from '../../config/site';
import { cmsText } from '../../cms/editable';

/**
 * The Berkat Madinah Store branches as cards (FORGE PRODUCTS-R1 §4, O-37): label in
 * the page language, the street address (never translated, so Maps and couriers
 * still resolve it), opening hours only where the owner gave them, and the
 * owner's own Google Maps link. Used on /products (where to buy) and /contact.
 */
export function BranchCards({ cardClassName = 'bg-bg/70' }: { cardClassName?: string }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {STORE_BRANCHES.map((branch) => (
        <li
          key={branch.id}
          className={`flex flex-col rounded-2xl border border-olive-dark/10 p-6 text-start sm:p-7 ${cardClassName}`}
        >
          <h3 className="font-display text-xl text-olive-dark">{branchLabel(branch, lang)}</h3>
          <p className="mt-2 font-body text-[15px] leading-relaxed text-brown-ink">{branchAddress(branch)}</p>
          {branch.hours ? (
            <p className="mt-3 font-body text-sm font-semibold text-olive-dark">
              {lang === 'ms' ? branch.hours.displayMs : branch.hours.displayEn}
            </p>
          ) : (
            <p {...cmsText('productsPage.whereToBuy.noHours')} className="mt-3 font-body text-sm text-brown-ink">
              {t('productsPage.whereToBuy.noHours')}
            </p>
          )}
          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1 pt-5 font-body text-sm font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-olive-dark"
          >
            <span {...cmsText('productsPage.whereToBuy.mapsCta')}>{t('productsPage.whereToBuy.mapsCta')}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
