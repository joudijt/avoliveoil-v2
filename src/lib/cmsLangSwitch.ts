import { getBoot } from '../cms/boot';
import { langSwitchPath } from '../utils/langSwitch';

/** First path segments under /:lang that belong to built-in pages, never to a CMS page. */
const BUILT_IN = new Set(['products', 'shop', 'why-us', 'contact', 'blog']);
const CMS_SUBPATH = /^\/([a-z0-9]+(?:-[a-z0-9]+)*|__cms-template(?:-landing)?)\/?$/;

/** The CMS page slug when `subPath` (the path after /:lang) is a CMS page, else null. */
export function cmsSlugOf(subPath: string): string | null {
  const m = CMS_SUBPATH.exec(subPath);
  return m && !BUILT_IN.has(m[1]) ? m[1] : null;
}

/**
 * Where a language-switcher link points (spec §13.2, §15 `data-cms-lang-link`).
 *
 * Built-in pages keep the existing behaviour (same path, translated article slug).
 * A CMS page exists only in the languages it was published in, so the switcher
 * offers `/<target>/<slug>` only when the page has that language and the language
 * root otherwise. CMS links reload the document: the server sends the page's own
 * boot data with it, which a client-side transition would not have.
 */
export function langSwitchTarget(
  lang: string | undefined,
  target: string,
  subPath: string,
): { to: string; reloadDocument: boolean } {
  const slug = cmsSlugOf(subPath);
  if (!slug) return { to: langSwitchPath(lang, target, subPath), reloadDocument: false };
  const page = getBoot()?.page;
  const langs: readonly string[] | undefined = page && page.slug === slug ? page.langs : undefined;
  return { to: langs?.includes(target) ? `/${target}/${slug}` : `/${target}`, reloadDocument: true };
}
