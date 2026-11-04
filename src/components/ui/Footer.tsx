import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS, LANGS } from '../../data/content';
import { langSwitchTarget } from '../../lib/cmsLangSwitch';
import { useCmsMenu } from '../../cms/boot';
import { cmsAttr, cmsText } from '../../cms/editable';
import { MADINAH_NAME, MADINAH_URL } from '../../config/site';
import { SOCIAL_LINKS } from '../../data/social';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const NAV_LINK = 'text-cream/70 transition-colors duration-300 hover:text-gold-light';

export function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const subPath = lang ? location.pathname.replace(new RegExp(`^/${lang}`), '') : '';
  const cmsMenu = useCmsMenu(lang);

  return (
    <footer className="relative w-full overflow-hidden bg-olive-dark px-6 pb-10 pt-20 md:px-16 md:pt-28">

      {/*
        dir="ltr" keeps the 3 columns (brand, navigate, newsletter) in a
        fixed physical left-to-right order — same reasoning as Navbar's
        forced-ltr header (CSS Grid/Flex column order is direction-relative).
      */}
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <img src={logo} alt={t('alt.logo')} {...cmsAttr({ alt: 'alt.logo' })} className="h-10 brightness-0 invert" />
          <p {...cmsText('footer.tagline')} className="mt-6 max-w-xs leading-relaxed text-cream/60">
            {t('footer.tagline')}
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold-light"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href={MADINAH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-gold-light"
          >
            <FaStore className="h-4 w-4 shrink-0" />
            {MADINAH_NAME}
          </a>
          <div className="mt-6 flex gap-4">
            {LANGS.map((l) => (
              <Link
                key={l.code}
                {...langSwitchTarget(lang, l.code, subPath)}
                data-cms-lang-link={l.code}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  l.code === lang ? 'text-gold-light' : 'text-cream/60 hover:text-gold-light'
                }`}
              >
                {l.short}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p {...cmsText('footer.navigate')} className="text-xs uppercase tracking-[0.3em] text-gold-light">{t('footer.navigate')}</p>
          <ul data-cms-menu="footer" className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link to={`/${lang}${link.path ? `/${link.path}` : ''}`} {...cmsText(`nav.${link.key}`)} className={NAV_LINK}>
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
            {/* Footer-only link — Blog is intentionally not in the top Navbar. */}
            <li>
              <Link to={`/${lang}/blog`} {...cmsText('nav.blog')} className={NAV_LINK}>
                {t('nav.blog')}
              </Link>
            </li>
            {/* Pages the owner added in the control panel (full-load links). */}
            {cmsMenu.footer.map((item) => (
              <li key={item.slug}>
                <a href={`/${lang}/${item.slug}`} data-cms-menu-item="" className={NAV_LINK}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p {...cmsText('footer.stayInTouch')} className="text-xs uppercase tracking-[0.3em] text-gold-light">{t('footer.stayInTouch')}</p>
          <p {...cmsText('footer.newsletterText')} className="mt-5 text-cream/60">{t('footer.newsletterText')}</p>
          <form
            className="mt-5 flex overflow-hidden rounded-full border border-cream/20 focus-within:border-gold"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const url = buildWhatsAppUrl(t('whatsapp.newsletterIntro'), [
                { label: t('whatsapp.fields.email'), value: String(data.get('email') ?? '') },
              ]);
              window.open(url, '_blank', 'noopener,noreferrer');
              e.currentTarget.reset();
            }}
          >
            <input
              name="email"
              type="email"
              placeholder={t('footer.emailPlaceholder') ?? undefined}
              {...cmsAttr({ placeholder: 'footer.emailPlaceholder' })}
              className="w-full bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              {...cmsText('footer.join')}
              className="shrink-0 bg-gold px-5 py-3 text-sm font-medium text-olive-dark transition-colors duration-300 hover:bg-cream"
            >
              {t('footer.join')}
            </button>
          </form>
        </div>
      </div>

      {/* suppressHydrationWarning: the year is computed when the page is
          prerendered and again when it is read. Across New Year those differ,
          and a text mismatch in the footer would discard the hydrated tree on
          every page of the site. */}
      <div
        suppressHydrationWarning
        className="relative z-10 mx-auto mt-16 max-w-6xl border-t border-cream/10 pt-6 text-center text-xs text-cream/60 md:text-start"
      >
        © {new Date().getFullYear()} Arabian Village. <span {...cmsText('footer.rights')}>{t('footer.rights')}</span>
      </div>
    </footer>
  );
}
