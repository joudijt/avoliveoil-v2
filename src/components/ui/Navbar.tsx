import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS, LANGS } from '../../data/content';

function linkPath(lang: string | undefined, path: string) {
  return `/${lang}${path ? `/${path}` : ''}`;
}

export function Navbar() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Path after the /:lang segment, e.g. "/en/products" -> "/products", "/en" -> "".
  // Used so the language switcher stays on the current page instead of
  // always bouncing back to the language root.
  const subPath = lang ? location.pathname.replace(new RegExp(`^/${lang}`), '') : '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const chromeIsLight = scrolled || mobileOpen;

  return (
    <>
      <header
        dir="ltr"
        className={`fixed inset-x-0 top-0 z-50 px-6 py-3 transition-all duration-500 sm:py-4 md:px-16 ${
          chromeIsLight ? 'bg-cream/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        {/*
          Caps the nav row at the same max-w-6xl column every page's content
          sections use (e.g. the Ingredients cards) — on ultra-wide screens
          the logo/links/language switcher now line up with that column
          instead of spreading out to the raw viewport edges.
        */}
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to={`/${lang}`} className="shrink-0">
            <img src={logo} alt="Arabian Village" className="h-7 sm:h-9 md:h-10" />
          </Link>

          <nav
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="hidden items-center gap-2 rounded-full bg-[#333D24]/85 px-3 py-2 backdrop-blur-sm md:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={linkPath(lang, link.path)}
                className="rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:text-gold"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-1 text-xs font-medium tracking-wide transition-colors duration-300 hover:text-gold sm:gap-1.5 sm:text-sm ${
                  chromeIsLight ? 'text-gold' : 'text-white'
                }`}
              >
                <span className="sm:hidden">{currentLang.short}</span>
                <span className="hidden sm:inline">{currentLang.label}</span>
                <FiChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 sm:h-4 sm:w-4 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langOpen && (
                <ul
                  role="listbox"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  className="absolute right-0 top-full mt-3 min-w-[9rem] overflow-hidden rounded-2xl border border-olive-dark/10 bg-cream/95 py-2 shadow-lg backdrop-blur-md"
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <Link
                        to={`/${l.code}${subPath}`}
                        onClick={() => setLangOpen(false)}
                        className={`block px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                          l.code === lang ? 'text-gold' : 'text-olive-dark/80 hover:text-gold'
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={(mobileOpen ? t('nav.close') : t('nav.menu')) ?? undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
                chromeIsLight ? 'text-olive-dark' : 'text-white'
              }`}
            >
              {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/*
        Rendered as a sibling of <header>, not a child: <header> gets
        backdrop-blur-md when chromeIsLight, and backdrop-filter creates a
        new containing block for `position: fixed` descendants — a fixed
        overlay nested inside it would clip to the header's own ~60px box
        instead of the viewport.
      */}
      <div
        className={`fixed inset-0 z-40 bg-olive-dark transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex flex-col items-start gap-1 px-6 pt-24 sm:pt-28">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={linkPath(lang, link.path)}
              className="w-full rounded-xl px-4 py-4 text-xl font-medium tracking-wide text-white transition-colors duration-300 hover:text-gold"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex items-center gap-4 border-t border-cream/10 px-10 pt-6">
          {LANGS.map((l) => (
            <Link
              key={l.code}
              to={`/${l.code}${subPath}`}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                l.code === lang ? 'text-gold' : 'text-cream/70 hover:text-gold'
              }`}
            >
              {l.short}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
