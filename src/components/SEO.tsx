import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_LOCALES,
  LOGO_RASTER_PATH,
  LOGO_RASTER_WIDTH,
  LOGO_RASTER_HEIGHT,
  SITE_NAME_BY_LANG,
  MANIFEST_BY_LANG,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  SHOPEE_URL,
  TIKTOK_SHOP_URL,
  STORE,
  STORE_BRANCHES,
  PRICES,
  MADINAH_NAME,
  MADINAH_URL,
} from '../config/site';
import { CLASSIC_PRODUCTS, PRODUCTS, priceOf, type Product } from '../data/products';
import type { SizePrice } from '../lib/priceMath';
import type { ResolvedSeo } from '../cms/contracts';

interface FaqItem {
  q: string;
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Path segment under /:lang, e.g. 'products'. */
  path: string;
}

export type Page = 'home' | 'products' | 'shop' | 'why-us' | 'contact' | 'blog' | 'article' | 'cms';

const ALL_LANGS = ['en', 'ms'] as const;

const PAGE_SLUG: Record<Page, string> = {
  home: '',
  products: 'products',
  shop: 'shop',
  'why-us': 'why-us',
  contact: 'contact',
  blog: 'blog',
  // Articles have a different slug per language, so they always pass `pathByLang`.
  article: 'blog',
  // CMS pages always pass `resolved`, which carries their own URLs.
  cms: '',
};

const SEO_KEY: Record<Page, string> = {
  home: 'home',
  products: 'products',
  shop: 'shop',
  'why-us': 'whyUs',
  contact: 'contact',
  blog: 'blog',
  article: 'blog',
  cms: 'home',
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
  /**
   * Emits Product JSON-LD. On `page="products"`: one Product per classic product
   * (Extra Virgin + Organic). Anywhere else (home): the Extra Virgin bottle only.
   */
  includeProductSchema?: boolean;
  /**
   * Per-product name/description for the Product JSON-LD of one catalogue product
   * (the infused detail pages). `productId` = catalogue id; without it the product is
   * looked up by nothing and no Product is emitted. A product with no price set in
   * storeFacts.json emits NO Product: a Product without offers is an invalid rich
   * result (FORGE PRODUCTS-R1 O-35) — today that is every infused flavour.
   */
  productMeta?: { name: string; description: string; productId?: string };
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
  /**
   * A CMS page's head, computed ONCE by the server (spec §13.2) and passed through
   * the boot payload. When given, every page-specific tag comes from it verbatim so
   * React's head is the head serve.php wrote; only the site-wide graph nodes
   * (Organization, seller, WebSite) are added, as on every other page.
   */
  resolved?: ResolvedSeo;
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
  resolved,
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
   * and it is not always both: an article written for one market has no
   * counterpart in the other. Mapping over ALL_LANGS regardless made `pathFor`
   * fall back to PAGE_SLUG, which pointed the missing languages at the *blog
   * index* — every such article would declare /ms/blog as its own
   * translations, and the index would be claimed as an alternate by all of them.
   * x-default follows the same list, preferring English when it is one of them.
   */
  const altLangs = pathByLang ? ALL_LANGS.filter((l) => pathByLang[l]) : ALL_LANGS;
  const defaultLang = altLangs.includes('en') ? 'en' : (altLangs[0] ?? lang);
  const ogImage = `${SITE_URL}${article?.imagePath ?? OG_IMAGE_PATH}`;
  /** The brand as this language writes it. */
  const brandName = SITE_NAME_BY_LANG[lang] ?? SITE_NAME;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#organization`,
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    /**
     * Google reads Organization.logo as an ImageObject and wants explicit
     * dimensions; the raster twin is there for consumers that will not render
     * SVG. Both files come out of scripts/brand-assets.py, so they cannot drift
     * from the logo in the header.
     */
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      // The raster, not the SVG: `width`/`height` have to describe the file at
      // `url`, and logo.svg carries a viewBox but no pixel size. The vector is
      // still what the pages render and what `LOGO_PATH` serves.
      url: `${SITE_URL}${LOGO_RASTER_PATH}`,
      contentUrl: `${SITE_URL}${LOGO_RASTER_PATH}`,
      width: LOGO_RASTER_WIDTH,
      height: LOGO_RASTER_HEIGHT,
      caption: SITE_NAME,
    },
    image: { '@id': `${SITE_URL}/#logo` },
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
    priceRange: PRICE_RANGE,
    sameAs: [SHOPEE_URL, TIKTOK_SHOP_URL, INSTAGRAM_URL, FACEBOOK_URL],
    location: STORE_BRANCHES.map((b) => ({
      '@type': 'GroceryStore',
      '@id': `${SITE_URL}/#branch-${b.id}`,
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
      hasMap: b.mapsUrl,
      // Only branches whose hours the owner gave (O-33/O-35). The others carry no
      // openingHoursSpecification at all — absent is true, a guessed time is not.
      ...(b.hours
        ? {
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: b.hours.days,
              opens: b.hours.opens,
              closes: b.hours.closes,
            },
          }
        : {}),
    })),
  };

  /**
   * Offers carry the real price per product and name the seller, so the JSON-LD, the
   * page copy and llms.txt all state the same numbers (all from storeFacts.json).
   * /products emits both classic products; home emits the Extra Virgin bottle; an
   * infused page emits nothing while its price is unset (see `productMeta`).
   */
  const productNode = (p: Product, name: string, description: string) => {
    const offers = productOffers(p);
    if (!offers) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${SITE_URL}/#product-${p.id}`,
      name,
      description,
      brand: { '@type': 'Brand', name: SITE_NAME },
      image: productImageUrl(p),
      url: p.slug ? `${SITE_URL}/${lang}/products/${p.slug}` : `${SITE_URL}/${lang}/products#${p.id}`,
      offers,
    };
  };
  const productSchemas = (() => {
    if (productMeta) {
      const p = productMeta.productId ? PRODUCTS.find((x) => x.id === productMeta.productId) : undefined;
      return p ? [productNode(p, productMeta.name, productMeta.description)] : [];
    }
    if (!includeProductSchema) return [];
    const list = page === 'products' ? CLASSIC_PRODUCTS : CLASSIC_PRODUCTS.filter((p) => p.id === 'extra-virgin');
    return list.map((p) => productNode(p, t(`${p.i18n}.name`), t(`${p.i18n}.description`)));
  })().filter((n) => n !== null);

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
        // Both are the same graph node the page already emits in full, so they
        // are references. Restating name/logo here published two spellings of
        // one @id, and a consumer merging them gets a contradictory node.
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
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

  if (resolved) {
    return (
      <ResolvedHead
        resolved={resolved}
        lang={lang}
        brandName={brandName}
        siteSchemas={[organizationSchema, sellerSchema, websiteSchema]}
      />
    );
  }

  return (
    <Helmet htmlAttributes={{ lang, dir: 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      {altLangs.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={pathFor(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={pathFor(defaultLang)} />

      <link rel="manifest" href={MANIFEST_BY_LANG[lang] ?? MANIFEST_BY_LANG.en} />
      <meta name="application-name" content={brandName} />
      <meta name="apple-mobile-web-app-title" content={brandName} />

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={OG_IMAGE_TYPE} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={article?.headline ?? title} />
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
      {productSchemas.map((schema) => (
        <script key={schema['@id']} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
}

/** Price range across every product with a price set: "RM59–RM129". */
const PRICED = PRODUCTS.flatMap((p) => p.sizes.map((size) => priceOf(p, size))).filter(
  (v): v is SizePrice => v !== null,
);
const LOWEST = PRICED.reduce((a, b) => (Number(b.amount) < Number(a.amount) ? b : a));
const HIGHEST = PRICED.reduce((a, b) => (Number(b.amount) > Number(a.amount) ? b : a));
const PRICE_RANGE = `${LOWEST.display}–${HIGHEST.display}`;

/**
 * The product's square photo as a fixed-path JPEG (1200x1200, written into public/ by
 * scripts/product-photos.py). Not the Vite-hashed webp: a Product image should be a
 * stable absolute URL any crawler can fetch.
 */
function productImageUrl(p: Product): string {
  return `${SITE_URL}/product-photos/${p.id}.jpg`;
}

/** AggregateOffer over the sizes that have a price; null when none has (never a guessed price). */
function productOffers(p: Product) {
  const prices = p.sizes.map((size) => priceOf(p, size)).filter((v): v is SizePrice => v !== null);
  if (prices.length === 0) return null;
  const amounts = prices.map((v) => Number(v.amount));
  const low = prices[amounts.indexOf(Math.min(...amounts))];
  const high = prices[amounts.indexOf(Math.max(...amounts))];
  return {
    '@type': 'AggregateOffer',
    priceCurrency: PRICES.currency,
    lowPrice: low.amount,
    highPrice: high.amount,
    offerCount: prices.length,
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${SITE_URL}/#seller` },
    areaServed: 'MY',
  };
}

/** Media type of an og:image, from its extension — uploads are webp, the site card is jpeg. */
function imageType(url: string): string | undefined {
  const ext = /\.([a-z0-9]+)(?:[?#].*)?$/i.exec(url)?.[1]?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  return undefined;
}

/**
 * The head of a CMS page: exactly the server's ResolvedSeo, plus the same
 * site-wide icons/manifest/app names and graph nodes every page carries. Nothing
 * here may contradict `resolved` — alternates, og:locale:alternate and x-default
 * are derived from `resolved.alternates` alone.
 */
function ResolvedHead({
  resolved,
  lang,
  brandName,
  siteSchemas,
}: {
  resolved: ResolvedSeo;
  lang: string;
  brandName: string;
  siteSchemas: object[];
}) {
  const alternates = (['en', 'ms'] as const).filter((l) => resolved.alternates[l]);
  const xDefault = resolved.alternates.en ?? (alternates[0] ? resolved.alternates[alternates[0]] : undefined);
  const og = resolved.ogImage;
  const ogType = imageType(og.url);

  return (
    <Helmet htmlAttributes={{ lang, dir: 'ltr' }}>
      <title>{resolved.title}</title>
      <meta name="description" content={resolved.description} />
      <link rel="canonical" href={resolved.canonical} />
      <meta name="robots" content={resolved.robots} />

      {alternates.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={resolved.alternates[l]} />
      ))}
      {xDefault && <link rel="alternate" hrefLang="x-default" href={xDefault} />}

      <link rel="manifest" href={MANIFEST_BY_LANG[lang] ?? MANIFEST_BY_LANG.en} />
      <meta name="application-name" content={brandName} />
      <meta name="apple-mobile-web-app-title" content={brandName} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolved.title} />
      <meta property="og:description" content={resolved.description} />
      <meta property="og:url" content={resolved.canonical} />
      <meta property="og:image" content={og.url} />
      <meta property="og:image:secure_url" content={og.url} />
      {ogType && <meta property="og:image:type" content={ogType} />}
      <meta property="og:image:width" content={String(og.width)} />
      <meta property="og:image:height" content={String(og.height)} />
      <meta property="og:image:alt" content={resolved.title} />
      <meta property="og:locale" content={OG_LOCALES[lang]} />
      {alternates
        .filter((l) => l !== lang)
        .map((l) => (
          <meta key={l} property="og:locale:alternate" content={OG_LOCALES[l]} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolved.title} />
      <meta name="twitter:description" content={resolved.description} />
      <meta name="twitter:image" content={og.url} />
      <meta name="twitter:image:alt" content={resolved.title} />

      {siteSchemas.map((schema, i) => (
        <script key={`site-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      {resolved.jsonLd.map((schema, i) => (
        <script key={`page-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
