import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SITE_URL, SITE_NAME, OG_IMAGE_PATH, OG_LOCALES } from '../config/site';

interface FaqItem {
  q: string;
  a: string;
}

const ALL_LANGS = ['en', 'ar', 'ms'];

/**
 * Per-route meta tags, hreflang alternates, and JSON-LD schema. Reads the
 * active language from the URL and pulls copy from i18n so every language
 * gets its own title/description/schema, not just the English one.
 */
export function SEO() {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const faqs = t('faq.items', { returnObjects: true }) as FaqItem[];

  const title = t('seo.title');
  const description = t('seo.description');
  const canonical = `${SITE_URL}/${lang}`;
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

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${SITE_NAME} — First Cold Pressed Palestinian Olive Oil`,
    description,
    brand: { '@type': 'Brand', name: SITE_NAME },
    image: ogImage,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <Helmet htmlAttributes={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      {ALL_LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}/${l}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />

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
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
