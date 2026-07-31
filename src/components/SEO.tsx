import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, OG_LOCALES } from '../config/site';

interface FaqItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Path segment under /:lang, e.g. 'products'. */
  path: string;
}

export type Page = 'home' | 'products' | 'shop' | 'why-us' | 'contact' | 'blog';

const ALL_LANGS = ['en', 'ar', 'ms'] as const;

const PAGE_SLUG: Record<Page, string> = {
  home: '',
  products: 'products',
  shop: 'shop',
  'why-us': 'why-us',
  contact: 'contact',
  blog: 'blog',
};

const SEO_KEY: Record<Page, string> = {
  home: 'home',
  products: 'products',
  shop: 'shop',
  'why-us': 'whyUs',
  contact: 'contact',
  blog: 'blog',
};

interface SEOProps {
  page: Page;
  /** Trail after Home, e.g. [{name: 'Products', path: 'products'}]. Omit on the homepage. */
  breadcrumbs?: BreadcrumbItem[];
  /** When provided, emits FAQPage JSON-LD built from these items. */
  faqs?: FaqItem[];
  /** Emits Product JSON-LD (home + products page). */
  includeProductSchema?: boolean;
}

/**
 * Per-route meta tags, hreflang alternates, and JSON-LD schema. Reads the
 * active language from the URL and the requested `page` to pull the right
 * i18n copy, canonical path, and structured data — every page/language
 * combination gets its own title/description/schema.
 */
export function SEO({ page, breadcrumbs, faqs, includeProductSchema }: SEOProps) {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();

  const seoKey = SEO_KEY[page];
  const title = t(`seo.${seoKey}.title`);
  const description = t(`seo.${seoKey}.description`);

  const slug = PAGE_SLUG[page];
  const pathFor = (l: string) => (slug ? `${SITE_URL}/${l}/${slug}` : `${SITE_URL}/${l}`);
  const canonical = pathFor(lang);
  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: lang,
  };

  const productSchema = includeProductSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${SITE_NAME} — First Cold Pressed Palestinian Olive Oil`,
        description: t('seo.products.description'),
        brand: { '@type': 'Brand', name: SITE_NAME },
        image: ogImage,
      }
    : null;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${SITE_URL}/${lang}` },
            ...breadcrumbs.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: b.name,
              item: `${SITE_URL}/${lang}/${b.path}`,
            })),
          ],
        }
      : null;

  return (
    <Helmet htmlAttributes={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      {ALL_LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={pathFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={pathFor('en')} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={OG_LOCALES[lang]} />
      {ALL_LANGS.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {productSchema && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
}
