import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS, LANGS } from '../../data/content';
import { MADINAH_NAME, MADINAH_URL } from '../../config/site';
import { SOCIAL_LINKS } from '../../data/social';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

export function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const subPath = lang ? location.pathname.replace(new RegExp(`^/${lang}`), '') : '';

  return (
    <footer className="relative w-full overflow-hidden bg-olive-dark px-6 pb-10 pt-20 md:px-16 md:pt-28">

      {/*
        dir="ltr" keeps the 3 columns (brand, navigate, newsletter) in a
        fixed physical left-to-right order regardless of language — same
        reasoning as Navbar's forced-ltr header (CSS Grid/Flex column order
        is direction-relative otherwise). Each column re-applies the real
        `dir` internally so its own text still aligns naturally per language.
      */}
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <img src={logo} alt="Arabian Village" className="h-10 brightness-0 invert" />
          <p dir={dir} className="mt-6 max-w-xs font-light leading-relaxed text-cream/60">
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href={MADINAH_URL}
            target="_blank"
            rel="noopener noreferrer"
            dir={dir}
            className="mt-5 inline-flex items-center gap-2 text-sm font-light text-cream/70 transition-colors duration-300 hover:text-gold"
          >
            <FaStore className="h-4 w-4 shrink-0" />
            {MADINAH_NAME}
          </a>
          <div className="mt-6 flex gap-4">
            {LANGS.map((l) => (
              <Link
                key={l.code}
                to={`/${l.code}${subPath}`}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  l.code === lang ? 'text-gold' : 'text-cream/60 hover:text-gold'
                }`}
              >
                {l.short}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t('footer.navigate')}</p>
          <ul dir={dir} className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  to={`/${lang}${link.path ? `/${link.path}` : ''}`}
                  className="font-light text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
            {/* Footer-only link — Blog is intentionally not in the top Navbar. */}
            <li>
              <Link
                to={`/${lang}/blog`}
                className="font-light text-cream/70 transition-colors duration-300 hover:text-gold"
              >
                {t('nav.blog')}
              </Link>
            </li>
          </ul>
        </div>

        <div dir={dir}>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t('footer.stayInTouch')}</p>
          <p className="mt-5 font-light text-cream/60">{t('footer.newsletterText')}</p>
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
              className="w-full bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-gold px-5 py-3 text-sm font-medium text-olive-dark transition-colors duration-300 hover:bg-cream"
            >
              {t('footer.join')}
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-6xl border-t border-cream/10 pt-6 text-center text-xs font-light text-cream/40 md:text-start">
        © {new Date().getFullYear()} Arabian Village. {t('footer.rights')}
      </div>
    </footer>
  );
}
