/**
 * Structural-only nav data (path never changes per language). Labels come
 * from i18n via `nav.<key>` — see src/i18n/locales/<lang>/common.json.
 * `path` is the route segment under /:lang ('' = language root/home).
 */
export const NAV_LINKS = [
  { key: 'home', path: '' },
  { key: 'products', path: 'products' },
  { key: 'shop', path: 'shop' },
  { key: 'whyUs', path: 'why-us' },
  { key: 'contact', path: 'contact' },
] as const;

/** Shared by Navbar and Footer language switchers. */
export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'ms', label: 'Bahasa Melayu', short: 'MS' },
] as const;
