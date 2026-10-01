import { articleIdForSlug, articlePathByLang } from '../content/articles';

/** `/blog/<slug>` — the path after the `/:lang` segment on an article page. */
const ARTICLE_SUBPATH_RE = /^\/blog\/([^/]+)\/?$/;

/**
 * Where the language switcher (Navbar and Footer) sends a reader who is on
 * `/<lang><subPath>` and picks `target`.
 *
 * Every page keeps its path across languages EXCEPT an article: slugs are
 * written per language, so `/en/blog/<en-slug>` has to become the same
 * article's slug in the target language. An article with no translation in
 * that language goes to the target language's blog index instead of a URL
 * that does not exist.
 */
export function langSwitchPath(lang: string | undefined, target: string, subPath: string): string {
  const m = ARTICLE_SUBPATH_RE.exec(subPath);
  if (m && lang) {
    const id = articleIdForSlug(lang, decodeURIComponent(m[1]));
    const path = id ? articlePathByLang(id)[target] : undefined;
    return `/${target}/${path ?? 'blog'}`;
  }
  return `/${target}${subPath}`;
}
