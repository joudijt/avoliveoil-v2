import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import i18n, { SUPPORTED_LANGS, type Lang } from '../i18n';

function isSupportedLang(value: string | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Validates the :lang URL segment, switches i18next to match, and renders
 * the page. <html lang/dir> is set declaratively by each page's <SEO>
 * Helmet htmlAttributes (single source of truth — don't also set it
 * imperatively here, the two would fight). Invalid language segments
 * redirect to /en. Each page under <Outlet/> renders its own <SEO
 * page="..."/> so title/canonical/schema are per-page, not just per-lang.
 */
export function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  const valid = isSupportedLang(lang);

  // Hooks must run unconditionally on every render — branch on `valid`
  // inside the effect/JSX, not by skipping the hook call itself.
  useEffect(() => {
    if (!valid) return;
    i18n.changeLanguage(lang);
  }, [lang, valid]);

  if (!valid) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
}
