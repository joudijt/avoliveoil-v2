import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import i18n, { SUPPORTED_LANGS, type Lang } from '../i18n';
import { SEO } from '../components/SEO';

function isSupportedLang(value: string | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/**
 * Validates the :lang URL segment, switches i18next to match, and renders
 * the page. <html lang/dir> is set declaratively by <SEO>'s Helmet
 * htmlAttributes (single source of truth — don't also set it imperatively
 * here, the two would fight). Invalid language segments redirect to /en.
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

  return (
    <>
      <SEO />
      <Outlet />
    </>
  );
}
