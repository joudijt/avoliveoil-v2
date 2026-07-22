import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS } from '../../data/content';
import { scrollToHash } from '../../hooks/useLenis';

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'MS' },
];

export function Navbar() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 transition-all duration-500 sm:px-6 sm:py-4 md:px-12 ${
        scrolled ? 'bg-cream/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <img src={logo} alt="Arabian Village" className="h-7 shrink-0 sm:h-9 md:h-10" />

      <nav className="hidden items-center gap-2 rounded-full bg-[#333D24]/85 px-3 py-2 backdrop-blur-sm md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(link.href);
            }}
            className="rounded-full px-4 py-1.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:text-gold"
          >
            {t(`nav.${link.key}`)}
          </a>
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
              scrolled ? 'text-gold' : 'text-white'
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
              className="absolute end-0 top-full mt-3 min-w-[9rem] overflow-hidden rounded-2xl border border-olive-dark/10 bg-cream/95 py-2 shadow-lg backdrop-blur-md"
            >
              {LANGS.map((l) => (
                <li key={l.code}>
                  <Link
                    to={`/${l.code}`}
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

        <a
          href="#shop"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#shop');
          }}
          className="shrink-0 rounded-full bg-olive-dark px-3.5 py-2 text-xs font-medium tracking-wide text-cream transition-all duration-300 hover:bg-gold sm:px-6 sm:py-2.5 sm:text-sm"
        >
          {t('nav.shopNow')}
        </a>
      </div>
    </header>
  );
}
