import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/logo/logo_theme.svg';
import { NAV_LINKS, LANGS } from '../../data/content';
import { langSwitchTarget } from '../../lib/cmsLangSwitch';
import { useCmsMenu } from '../../cms/boot';
import { cmsAttr, cmsText } from '../../cms/editable';

// Labels never wrap: a wrapped label made the pill two lines tall between 768 and ~1000 px
// (Malay worst). Tighter below xl; when the pill still cannot fit, usePillOverflow switches
// the header to the menu button.
const DESKTOP_LINK =
  'whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium tracking-wide text-white transition-colors duration-300 hover:text-gold lg:px-3 lg:text-sm xl:px-4';
const MOBILE_LINK =
  'w-full rounded-xl px-4 py-4 text-xl font-medium tracking-wide text-white transition-colors duration-300 hover:text-gold';

function linkPath(lang: string | undefined, path: string) {
  return `/${lang}${path ? `/${path}` : ''}`;
}

/**
 * The desktop pill can be wider than the row: Malay labels on a tablet, the cart
 * button beside the language switch (FORGE ORDER-R1), owner-added header links
 * (control panel, up to 3), a long page name. When the pill's natural width does
 * not fit between the logo and the language switcher, the header switches to the
 * menu button at that width (index.css, `data-cms-menu-compact`) instead of letting
 * links collide or wrap. Runs for every header since FORGE ORDER-R1.
 */
function usePillOverflow(enabled: boolean) {
  const rowRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const need = useRef(0);
  const [on, setOn] = useState(false);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const nav = navRef.current;
    if (!enabled || !row || !nav) return;
    const check = () => {
      // Measure only while the pill is laid out; when it is hidden keep the last width.
      if (getComputedStyle(nav).display !== 'none') need.current = nav.scrollWidth;
      const others = [...row.children].filter((el) => el !== nav).reduce((w, el) => w + (el as HTMLElement).offsetWidth, 0);
      setOn(need.current > 0 && need.current + others + 32 > row.clientWidth);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(row);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [enabled]);

  return { on, rowRef, navRef };
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
  const cmsMenu = useCmsMenu(lang);
  const compact = usePillOverflow(true);

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
  // White controls only make sense over the home hero photo. Every other page
  // (inner pages, CMS pages) starts on the cream background, where white text and
  // a white menu icon were invisible until the visitor scrolled.
  const onHomeHero = subPath === '' || subPath === '/';
  const darkControls = chromeIsLight || !onHomeHero;

  return (
    <>
      <header
        {...(compact.on ? { 'data-cms-menu-compact': '' } : {})}
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
        <div ref={compact.rowRef} className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to={`/${lang}`} className="shrink-0">
            <img src={logo} alt={t('alt.logo')} {...cmsAttr({ alt: 'alt.logo' })} className="h-7 sm:h-9 md:h-10" />
          </Link>

          <nav
            ref={compact.navRef}
            data-cms-menu="header"
            className="hidden shrink-0 items-center gap-1 rounded-full bg-[#333D24]/85 px-2 py-2 backdrop-blur-sm md:flex lg:gap-2 lg:px-3"
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.key} to={linkPath(lang, link.path)} {...cmsText(`nav.${link.key}`)} className={DESKTOP_LINK}>
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            {/* Pages the owner added in the control panel. Plain links (full load):
                the server sends a CMS page together with its content. */}
            {cmsMenu.header.map((item) => (
              <a key={item.slug} href={`/${lang}/${item.slug}`} data-cms-menu-item="" className={DESKTOP_LINK}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={currentLang.label}
                className={`flex items-center gap-1 text-xs font-medium tracking-wide transition-colors duration-300 hover:text-gold sm:gap-1.5 sm:text-sm ${
                  darkControls ? 'text-gold-ink' : 'text-white'
                }`}
              >
                {/* Short code below lg (the full name pushed the tablet header to two lines). */}
                <span className="lg:hidden">{currentLang.short}</span>
                <span className="hidden whitespace-nowrap lg:inline">{currentLang.label}</span>
                <FiChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 sm:h-4 sm:w-4 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full mt-3 min-w-[9rem] overflow-hidden rounded-2xl border border-olive-dark/10 bg-cream/95 py-2 shadow-lg backdrop-blur-md"
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <Link
                        {...langSwitchTarget(lang, l.code, subPath)}
                        data-cms-lang-link={l.code}
                        onClick={() => setLangOpen(false)}
                        className={`block px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                          l.code === lang ? 'text-gold-ink' : 'text-olive-dark hover:text-gold-ink'
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
              data-cms-menu-toggle=""
              {...cmsAttr({ 'aria-label': mobileOpen ? 'nav.close' : 'nav.menu' })}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
                darkControls ? 'text-olive-dark' : 'text-white'
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
        data-cms-menu-overlay=""
        {...(compact.on ? { 'data-cms-menu-compact': '' } : {})}
        className={`fixed inset-0 z-40 bg-olive-dark transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav data-cms-menu="header-mobile" className="flex flex-col items-start gap-1 px-6 pt-24 sm:pt-28">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} to={linkPath(lang, link.path)} {...cmsText(`nav.${link.key}`)} className={MOBILE_LINK}>
              {t(`nav.${link.key}`)}
            </Link>
          ))}
          {cmsMenu.header.map((item) => (
            <a key={item.slug} href={`/${lang}/${item.slug}`} data-cms-menu-item="" className={MOBILE_LINK}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex items-center gap-4 border-t border-cream/10 px-10 pt-6">
          {LANGS.map((l) => (
            <Link
              key={l.code}
              {...langSwitchTarget(lang, l.code, subPath)}
              data-cms-lang-link={l.code}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                l.code === lang ? 'text-gold-light' : 'text-cream/70 hover:text-gold-light'
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
