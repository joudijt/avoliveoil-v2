import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE_PATH,
  OG_LOCALES,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  SHOPEE_URL,
  TIKTOK_SHOP_URL,
  STORE,
  STORE_BRANCHES,
  STORE_HOURS,
  PRICES,
  MADINAH_NAME,
  MADINAH_URL,
} from '../config/site';

interface FaqItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Path segment under /:lang, e.g. 'products'. */
  path: string;
}

export type Page = 'home' | 'products' | 'shop' | 'why-us' | 'contact' | 'blog' | 'article';

const ALL_LANGS = ['en', 'ar', 'ms'] as const;

const PAGE_SLUG: Record<Page, string> = {
  home: '',
  products: 'products',
  shop: 'shop',
  'why-us': 'why-us',
  contact: 'contact',
  blog: 'blog',
  // Articles have a different slug per language, so they always pass `pathByLang`.
  article: 'blog',
};

const SEO_KEY: Record<Page, string> = {
  home: 'home',
  products: 'products',
  shop: 'shop',
  'why-us': 'whyUs',
  contact: 'contact',
  blog: 'blog',
  article: 'blog',
};

/** Everything an article page adds on top of the standard per-page metadata. */
export interface ArticleMeta {
  headline: string;
  description: string;
  /** Site-root-relative, e.g. '/og/blog-something.jpg'. */
  imagePath: string;
  datePublished: string;
  dateModified: string;
  section: string;
  tags: string[];
  keywords: string[];
}

interface SEOProps {
  page: Page;
  /** Trail after Home, e.g. [{name: 'Products', path: 'products'}]. Omit on the homepage. */
  breadcrumbs?: BreadcrumbItem[];
  /** When provided, emits FAQPage JSON-LD built from these items. */
  faqs?: FaqItem[];
  /** Emits Product JSON-LD (home + products page). */
  includeProductSchema?: boolean;
  /**
   * Per-product name/description for the Product JSON-LD. Implies
   * includeProductSchema; used by the infused product detail pages.
   */
  productMeta?: { name: string; description: string };
  /**
   * Per-language path under /:lang, for pages whose URL segment is translated.
   * Drives canonical, hreflang and og:url. Falls back to PAGE_SLUG when omitted.
   */
  pathByLang?: Record<string, string>;
  /** Replaces the i18n `seo.<page>.title` / `.description` lookup. */
  titleOverride?: string;
  descriptionOverride?: string;
  /** Emits BlogPosting JSON-LD and switches og:type to `article`. */
  article?: ArticleMeta;
}

/**
 * Per-route meta tags, hreflang alternates, and JSON-LD schema. Reads the
 * active language from the URL and the requested `page` to pull the right
 * i18n copy, canonical path, and structured data — every page/language
 * combination gets its own title/description/schema.
 */
export function SEO({
  page,
  breadcrumbs,
  faqs,
  includeProductSchema,
  productMeta,
  pathByLang,
  titleOverride,
  descriptionOverride,
  article,
}: SEOProps) {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();

  const seoKey = SEO_KEY[page];
  const title = titleOverride ?? t(`seo.${seoKey}.title`);
  const description = descriptionOverride ?? t(`seo.${seoKey}.description`);

  const pathFor = (l: string) => {
    const slug = pathByLang?.[l] ?? PAGE_SLUG[page];
    return slug ? `${SITE_URL}/${l}/${slug}` : `${SITE_URL}/${l}`;
  };
  const canonical = pathFor(lang);

  /**
   * Only languages this page actually exists in get an hreflang alternate.
   *
   * When `pathByLang` is supplied it is the authoritative list of translations,
   * and it is not always all three: an article written for one market has no
   * counterpart in the others. Mapping over ALL_LANGS regardless made `pathFor`
   * fall back to PAGE_SLUG, which pointed the missing languages at the *blog
   * index* — every such article would declare /ms/blog and /ar/blog as its own
   * translations, and the index would be claimed as an alternate by all of them.
   * x-default follows the same list, preferring English when it is one of them.
   */
  const altLangs = pathByLang ? ALL_LANGS.filter((l) => pathByLang[l]) : ALL_LANGS;
  const defaultLang = altLangs.includes('en') ? 'en' : (altLangs[0] ?? lang);
  const ogImage = `${SITE_URL}${article?.imagePath ?? OG_IMAGE_PATH}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#organization`,
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    // Real, owned profiles only — sameAs is an identity claim, not a link list.
    sameAs: [INSTAGRAM_URL, FACEBOOK_URL, SHOPEE_URL, TIKTOK_SHOP_URL],
  };

  // @id + publisher, so the WebSite node joins the graph instead of floating as
  // an unlinked duplicate on all 45 pages.
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#website`,
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: lang,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  /**
   * The seller, as a real place. Emitted on every page because "where do I buy this"
   * is the question this site exists to answer, and because llms.txt makes the same
   * exclusivity claim — an assistant that cross-checks the two must find them
   * identical. Values come from storeFacts.json, never typed here.
   */
  const sellerSchema = {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#seller`,
    '@type': 'GroceryStore',
    name: MADINAH_NAME,
    slogan: STORE.seller.tagline,
    url: MADINAH_URL,
    email: STORE.seller.email,
    telephone: STORE.seller.whatsappE164,
    foundingDate: String(STORE.seller.foundedYear),
    priceRange: `${PRICES.ml250.display}–${PRICES.ml500.display}`,
    sameAs: [SHOPEE_URL, TIKTOK_SHOP_URL, INSTAGRAM_URL, FACEBOOK_URL],
    location: STORE_BRANCHES.map((b) => ({
      '@type': 'GroceryStore',
      name: `${MADINAH_NAME} — ${b.labelEn}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.street,
        postalCode: b.postalCode,
        addressLocality: b.locality,
        addressRegion: b.region,
        addressCountry: b.country,
      },
      telephone: STORE.seller.whatsappE164,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: STORE_HOURS.days,
        opens: STORE_HOURS.opens,
        closes: STORE_HOURS.closes,
      },
    })),
  };

  /**
   * Offers carry the real price and name the seller, so the JSON-LD, the page copy
   * and llms.txt all state the same number. `offerCount` covers the two sizes.
   */
  const productSchema =
    includeProductSchema || productMeta
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productMeta?.name ?? `${SITE_NAME} — First Cold Pressed Palestinian Olive Oil`,
          description: productMeta?.description ?? t('seo.products.description'),
          brand: { '@type': 'Brand', name: SITE_NAME },
          image: ogImage,
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: PRICES.currency,
            lowPrice: PRICES.ml250.amount,
            highPrice: PRICES.ml500.amount,
            offerCount: 2,
            availability: 'https://schema.org/InStock',
            seller: { '@id': `${SITE_URL}/#seller` },
            areaServed: 'MY',
          },
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

  /**
   * BlogPosting rather than a bare Article: these are dated editorial posts on a
   * brand blog. The author is the organisation, not an invented byline — a
   * fabricated Person here would be a straightforward EEAT lie.
   */
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        headline: article.headline,
        description: article.description,
        image: [ogImage],
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: lang,
        articleSection: article.section,
        keywords: article.keywords.join(', '),
        isAccessibleForFree: true,
        author: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
        },
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

      {altLangs.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={pathFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={pathFor(defaultLang)} />

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={OG_LOCALES[lang]} />
      {altLangs.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
      ))}

      {article && <meta property="article:published_time" content={article.datePublished} />}
      {article && <meta property="article:modified_time" content={article.dateModified} />}
      {article && <meta property="article:section" content={article.section} />}
      {article?.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={article?.headline ?? title} />

      {article && <meta name="keywords" content={article.keywords.join(', ')} />}
      {article && <meta name="author" content={SITE_NAME} />}

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(sellerSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {productSchema && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
}
