import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Minimal inline markup for article copy: `**bold**` and `[label](href)`. An
 * href starting with `/` is an in-site route and gets the active language
 * prefix plus a real react-router <Link>; anything else is external and opens
 * in a new tab.
 *
 * Deliberately not a markdown library — the article modules are ours, the
 * surface is two constructs wide, and pulling in a parser would also pull in a
 * sanitiser problem we do not otherwise have.
 *
 * Lives in its own module (not next to the block components) so the component
 * files stay component-only and Fast Refresh keeps working.
 */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

const LINK_CLASS =
  'text-olive underline decoration-gold/60 underline-offset-4 transition-colors duration-300 hover:text-gold';

export function renderInline(text: string, lang: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-olive-dark">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith('/')) {
        return (
          <Link key={i} to={`/${lang}${href}`} className={LINK_CLASS}>
            {label}
          </Link>
        );
      }
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
        </a>
      );
    }

    return part;
  });
}
