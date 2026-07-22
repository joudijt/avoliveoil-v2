import { useTranslation } from 'react-i18next';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS } from '../../data/content';
import { scrollToHash } from '../../hooks/useLenis';

const SOCIALS = [
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaTiktok, href: '#', label: 'TikTok' },
  { Icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-olive-dark px-6 pb-10 pt-20 md:px-16 md:pt-28">

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <img src={logo} alt="Arabian Village" className="h-10 brightness-0 invert" />
          <p className="mt-6 max-w-xs font-light leading-relaxed text-cream/60">{t('footer.tagline')}</p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t('footer.navigate')}</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(link.href);
                  }}
                  className="font-light text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t('footer.stayInTouch')}</p>
          <p className="mt-5 font-light text-cream/60">{t('footer.newsletterText')}</p>
          <form className="mt-5 flex overflow-hidden rounded-full border border-cream/20 focus-within:border-gold" onSubmit={(e) => e.preventDefault()}>
            <input
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
