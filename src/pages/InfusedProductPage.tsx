import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { INFUSED_PRODUCTS, findInfusedProduct } from '../data/infusedProducts';
import { PRICES, MADINAH_NAME } from '../config/site';

const ALL_LANGS = ['en', 'ar', 'ms'] as const;

/**
 * Detail page for one flavor of the infused extra virgin olive oil
 * collection. URL: /:lang/products/infused-extra-virgin-olive-oil-<flavor>
 * (same slug in every language). All copy comes from i18n via
 * `infusedPage.products.<id>` — see src/data/infusedProducts.ts.
 */
export function InfusedProductPage() {
  const { t } = useTranslation();
  const { lang = 'en', slug } = useParams<{ lang: string; slug: string }>();
  const product = findInfusedProduct(slug);
  useMarkAppReady();

  // Unknown slug: send the visitor to the products page rather than showing
  // an empty shell that a crawler would happily index as a real page.
  if (!product) return <Navigate to={`/${lang}/products`} replace />;

  const key = `infusedPage.products.${product.id}`;
  const name = t(`${key}.name`);
  const notes = t(`${key}.notes`, { returnObjects: true }) as string[];
  const benefits = t(`${key}.benefits`, { returnObjects: true }) as string[];
  const uses = t(`${key}.uses`, { returnObjects: true }) as string[];
  const others = INFUSED_PRODUCTS.filter((p) => p.id !== product.id);

  const crumbs = [
    { name: t('breadcrumb.products'), path: 'products' },
    { name, path: `products/${product.slug}` },
  ];

  return (
    <>
      <SEO
        page="products"
        pathByLang={Object.fromEntries(ALL_LANGS.map((l) => [l, `products/${product.slug}`]))}
        titleOverride={t(`${key}.seoTitle`)}
        descriptionOverride={t(`${key}.seoDescription`)}
        breadcrumbs={crumbs}
        productMeta={{ name, description: t(`${key}.seoDescription`) }}
      />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={crumbs} />

        {/* ------------------------------------------------------------ hero */}
        <section className="px-6 pb-20 pt-10 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="text-start">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                {t('infusedPage.kicker')}
              </p>
              <h1 className="mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl">{name}</h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
                {t(`${key}.tagline`)}
              </p>
              <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
                {t(`${key}.description`)}
              </p>
              <span className="mt-6 inline-block rounded-full bg-gold/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {t('infusedPage.availableBadge', { store: MADINAH_NAME })}
              </span>
              {/* Prices from storeFacts.json — same numbers as the JSON-LD offer and llms.txt. */}
              <p className="mt-4 text-lg font-medium text-olive-dark">
                250ml — {PRICES.ml250.display} · 500ml — {PRICES.ml500.display}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={t(`${key}.imageAlt`)}
                className="h-[46vh] w-auto object-contain md:h-[56vh]"
                style={{ filter: 'drop-shadow(0 25px 35px rgba(46,58,36,0.25))' }}
              />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- flavor notes */}
        <section className="bg-cream px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl text-olive-dark md:text-4xl">{t('infusedPage.notesTitle')}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-olive-dark/10 bg-bg p-6 text-start shadow-[0_10px_30px_rgba(46,58,36,0.05)]"
                >
                  <p className="text-sm font-medium text-olive-dark">{note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.benefitsTitle')}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-olive-dark/10 bg-bg p-5 text-start"
                >
                  <p className="text-sm font-medium text-olive-dark">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- how to use */}
        <section className="bg-[#E8E2D7] px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl text-start">
            <h2 className="text-3xl text-olive-dark md:text-4xl">{t('infusedPage.usesTitle')}</h2>
            <ol className="mt-10 space-y-4">
              {uses.map((use, i) => (
                <li
                  key={use}
                  className="flex items-start gap-4 rounded-2xl bg-bg/60 p-6 font-body text-base font-light leading-relaxed text-brown/80"
                >
                  <span className="text-lg text-gold">{i + 1}.</span>
                  {use}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- cta */}
        <section className="bg-olive-dark px-6 py-20 text-center md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl text-cream md:text-4xl">
              {t('infusedPage.cta.title', { store: MADINAH_NAME })}
            </h2>
            <p className="mt-4 font-body text-base font-light leading-relaxed text-cream/70">
              {t('infusedPage.cta.text', { store: MADINAH_NAME })}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={`/${lang}/shop`}
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream"
              >
                {t('infusedPage.cta.shopCta')}
              </Link>
              <Link
                to={`/${lang}/contact`}
                className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {t('infusedPage.cta.contactCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- other flavors */}
        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.otherTitle')}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  to={`/${lang}/products/${other.slug}`}
                  className="group rounded-2xl border border-olive-dark/10 bg-cream p-6 text-start transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(46,58,36,0.14)]"
                >
                  <h3 className="text-lg leading-snug text-olive-dark transition-colors duration-300 group-hover:text-gold">
                    {t(`infusedPage.products.${other.id}.name`)}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70">
                    {t(`infusedPage.products.${other.id}.tagline`)}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to={`/${lang}/products`}
                className="font-body text-sm uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:text-gold"
              >
                {t('infusedPage.backToProducts')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
