/**
 * Header and footer of a landing page (`doc.layout === 'landing'`, LP-SPEC §2, §8 B2).
 * React-only chrome OUTSIDE the page root: CmsPage renders them for a landing page and
 * for the `/<lang>/__cms-template-landing` prerender, whose snapshot serve.php fills.
 * Part of the CMS chunk — App never imports them.
 *
 * The header's look over a dark first hero is decided by CSS from the page content
 * (classes.ts LP_HEADER), never from React state about the doc, so the template's
 * header (which knows no page) and React's header are the same markup.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/logo_theme.svg';
import { CONTACT_EMAIL, MADINAH_NAME, STORE } from '../../config/site';
import { langSwitchTarget } from '../../lib/cmsLangSwitch';
import type { CmsLang } from '../contracts';
import { LP_FOOTER, LP_HEADER, cx } from '../blocks/classes';
import { whatsappHref } from '../blocks/cta';
import { ArrowRightIcon, CMS_ICON_COMPONENTS, WhatsappIcon } from '../blocks/icons';
import { ui } from '../blocks/strings';
import { cmsAttr, cmsText } from '../editable';

const LANG_LINKS: { code: CmsLang; short: string }[] = [
  { code: 'en', short: 'EN' },
  { code: 'ms', short: 'BM' },
];

export function LandingHeader({ lang, slug }: { lang: CmsLang; slug: string }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const label = ui(lang, 'whatsappUs');
  return (
    <header data-cms-landing-header="" {...(scrolled ? { 'data-scrolled': '' } : {})} dir="ltr" className={LP_HEADER.root}>
      <div className={LP_HEADER.row}>
        <a href={`/${lang}`} className={LP_HEADER.logoLink}>
          <img src={logo} alt={t('alt.logo')} {...cmsAttr({ alt: 'alt.logo' })} className={LP_HEADER.logo} />
        </a>
        <div className={LP_HEADER.actions}>
          <nav aria-label={ui(lang, 'language')} className={LP_HEADER.langs}>
            {LANG_LINKS.map((l) => (
              // Plain links (full load): a CMS page arrives with its own boot data.
              <a
                key={l.code}
                href={langSwitchTarget(lang, l.code, `/${slug}`).to}
                hrefLang={l.code}
                lang={l.code}
                data-cms-lang-link={l.code}
                {...(l.code === lang ? { 'aria-current': 'true' as const } : {})}
                className={cx(LP_HEADER.lang, l.code === lang ? LP_HEADER.langOn : LP_HEADER.langOff)}
              >
                {l.short}
              </a>
            ))}
          </nav>
          <a href={whatsappHref(undefined, lang)} target="_blank" rel="noopener noreferrer" aria-label={label} className={LP_HEADER.wa}>
            <WhatsappIcon className={LP_HEADER.waIcon} />
            <span className={LP_HEADER.waLabel}>{label}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function LandingFooter({ lang }: { lang: CmsLang }) {
  const { t } = useTranslation();
  const Mail = CMS_ICON_COMPONENTS.mail;
  return (
    <footer data-cms-landing-footer="" className={LP_FOOTER.root}>
      <div className={LP_FOOTER.inner}>
        <a href={`/${lang}`}>
          <img src={logo} alt={t('alt.logo')} {...cmsAttr({ alt: 'alt.logo' })} className={LP_FOOTER.logo} />
        </a>
        <p className={LP_FOOTER.line}>{ui(lang, 'soldBy', { store: MADINAH_NAME })}</p>
        <div className={LP_FOOTER.contacts}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={LP_FOOTER.contact}>
            <Mail className={LP_FOOTER.contactIcon} />
            {CONTACT_EMAIL}
          </a>
          <a href={whatsappHref(undefined, lang)} target="_blank" rel="noopener noreferrer" className={LP_FOOTER.contact}>
            <WhatsappIcon className={LP_FOOTER.contactIcon} />
            {STORE.seller.whatsappDisplay}
          </a>
        </div>
        <a href={`/${lang}`} className={LP_FOOTER.site}>
          {ui(lang, 'fullSite')}
          <ArrowRightIcon className={LP_FOOTER.siteIcon} />
        </a>
        {/* suppressHydrationWarning: the year is computed at prerender time and again when read. */}
        <p suppressHydrationWarning className={LP_FOOTER.copy}>
          © {new Date().getFullYear()} Arabian Village. <span {...cmsText('footer.rights')}>{t('footer.rights')}</span>
        </p>
      </div>
    </footer>
  );
}
