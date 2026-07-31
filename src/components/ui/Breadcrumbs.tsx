import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Crumb {
  name: string;
  /** Path segment under /:lang. */
  path: string;
}

/**
 * Visible internal-link breadcrumb trail, rendered directly under the fixed
 * Navbar on every non-home page. Home is always the implicit first crumb.
 * Structured data for the same trail is emitted separately by <SEO
 * breadcrumbs=.../> — this component is the human-visible counterpart.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();

  return (
    <div className="px-6 pt-28 md:px-16 md:pt-32">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl text-sm text-brown/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to={`/${lang}`} className="transition-colors duration-300 hover:text-gold">
              {t('nav.home')}
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-brown/30">
                /
              </span>
              {i === items.length - 1 ? (
                <span className="text-olive-dark" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={`/${lang}/${item.path}`} className="transition-colors duration-300 hover:text-gold">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
