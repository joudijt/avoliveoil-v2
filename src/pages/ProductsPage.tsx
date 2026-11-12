import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ } from '../components/sections/FAQ';
import { InfusedCard } from '../components/sections/InfusedCard';
import { BranchCards } from '../components/sections/BranchCards';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { Picture } from '../components/ui/Picture';
import { CLASSIC_PRODUCTS, PRODUCTS, priceOf, type Product } from '../data/products';
import { STORE, BRANCH_COUNT, MADINAH_NAME } from '../config/site';
import { cmsText } from '../cms/editable';
import { AddToCart } from '../order/AddToCart';

interface Highlight {
  label: string;
  value: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const INFUSED = PRODUCTS.filter((p) => p.kind === 'infused');

/**
 * One classic product (Extra Virgin, Organic) — spec §2: square photo left, then
 * name, kicker, description, a price box with one row per size, the store note and
 * the product's own spec chips. Prices come from storeFacts.json through `priceOf`
 * (the same numbers the JSON-LD offers and llms.txt publish), never from copy, and
 * never sit in the title area.
 */
function ClassicProductBlock({ product }: { product: Product }) {
  const { t } = useTranslation();
  const k = product.i18n;
  const highlights = t(`${k}.highlights`, { returnObjects: true }) as Highlight[];
  const rows = product.sizes.flatMap((size) => {
    const price = priceOf(product, size);
    return price ? [{ size, price }] : [];
  });

  return (
    <article
      id={product.id}
      className="grid scroll-mt-28 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 lg:gap-16"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-olive-dark/10 bg-white shadow-[0_24px_50px_rgba(46,58,36,0.10)] md:sticky md:top-28">
        <Picture
          name={product.image}
          alt={t(`${k}.imageAlt`)}
          cmsKey={`products.${product.cmsId}.photo`}
          cmsAltKey={`${k}.imageAlt`}
          className="block aspect-square h-auto w-full object-contain"
          sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 92vw"
        />
      </div>

      <div className="text-start">
        <h2 {...cmsText(`${k}.name`)} className="font-display text-[32px] leading-[1.15] text-olive-dark md:text-[40px]">
          {t(`${k}.name`)}
        </h2>
        <p
          {...cmsText(`${k}.tagline`)}
          className="mt-3 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-ink"
        >
          {t(`${k}.tagline`)}
        </p>
        <p
          {...cmsText(`${k}.description`)}
          className="mt-5 max-w-2xl font-body text-[17px] font-normal leading-[1.75] text-brown-ink"
        >
          {t(`${k}.description`)}
        </p>

        <div className="mt-7 max-w-sm rounded-2xl border border-olive-dark/10 bg-white p-5 shadow-[0_10px_30px_rgba(46,58,36,0.06)] sm:p-6">
          <p
            {...cmsText('productsPage.price.label')}
            className="font-body text-[11.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink"
          >
            {t('productsPage.price.label')}
          </p>
          <dl className="mt-2 divide-y divide-olive-dark/10">
            {rows.map(({ size, price }) => (
              <div key={size} className="flex items-baseline justify-between gap-6 py-2.5">
                <dt {...cmsText(`productsPage.price.size${size}`)} className="font-body text-base text-brown-ink">
                  {t(`productsPage.price.size${size}`)}
                </dt>
                <dd className="font-display text-2xl text-olive-dark">{price.display}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* FORGE ORDER-R1: tapping it reveals one button per size, priced from the catalogue. */}
        <AddToCart productId={product.id} variant="page" className="mt-4 max-w-sm" />
        <p {...cmsText('productsPage.storeNote')} className="mt-4 max-w-xl font-body text-[15px] leading-relaxed text-brown-ink">
          {t('productsPage.storeNote', { store: MADINAH_NAME, count: BRANCH_COUNT })}
        </p>

        {Array.isArray(highlights) && highlights.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <div key={h.label} className="rounded-2xl border border-olive-dark/10 bg-bg p-4 text-start">
                <h3
                  {...cmsText(`${k}.highlights.${i}.label`)}
                  className="font-body text-[11.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink"
                >
                  {h.label}
                </h3>
                <p {...cmsText(`${k}.highlights.${i}.value`)} className="mt-1.5 font-body text-base font-semibold text-olive-dark">
                  {h.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProductsPage() {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const { hash } = useLocation();
  useMarkAppReady();

  // Home showcase cards link to /products#extra-virgin and #organic. ScrollToTop
  // leaves hash navigations alone and this page runs no Lenis, so jump here.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  const faqItems = t('productsPage.faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <>
      <SEO
        page="products"
        breadcrumbs={[{ name: t('breadcrumb.products'), path: 'products' }]}
        faqs={faqItems}
        includeProductSchema
      />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={[{ name: t('breadcrumb.products'), path: 'products', cmsKey: 'breadcrumb.products' }]} />

        <section className="px-6 pb-20 pt-10 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="text-start">
              <p
                {...cmsText('productsPage.kicker')}
                className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink"
              >
                {t('productsPage.kicker')}
              </p>
              <h1 {...cmsText('productsPage.title')} className="mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
                {t('productsPage.title')}
              </h1>
              <p {...cmsText('productsPage.intro')} className="mt-6 max-w-md font-body text-base leading-relaxed text-brown-ink md:text-lg">
                {t('productsPage.intro')}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-olive-dark/10 bg-white shadow-[0_30px_60px_rgba(46,58,36,0.12)]">
                <Picture
                  name="product-extra-virgin-3"
                  alt={t('alt.productsHero')}
                  cmsKey="products.hero"
                  cmsAltKey="alt.productsHero"
                  className="block aspect-square h-auto w-full object-contain"
                  sizes="(min-width: 768px) 460px, 88vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto flex max-w-6xl flex-col gap-20 md:gap-28">
            {CLASSIC_PRODUCTS.map((product) => (
              <ClassicProductBlock key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-6xl text-start">
            <p
              {...cmsText('infusedPage.kicker')}
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink"
            >
              {t('infusedPage.kicker')}
            </p>
            <h2 {...cmsText('infusedPage.collectionTitle')} className="mt-3 max-w-2xl text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.collectionTitle')}
            </h2>
            <p {...cmsText('infusedPage.collectionIntro')} className="mt-4 max-w-xl font-body text-base leading-relaxed text-brown-ink">
              {t('infusedPage.collectionIntro', { store: MADINAH_NAME })}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {INFUSED.map((product) => (
                <InfusedCard key={product.id} product={product} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* The "more flavours / gift sets coming soon" block was removed: the owner
            confirmed there is no seventh flavour and no bundle in preparation, and an
            announcement nobody can honour is an invented promise. Where to buy replaces it. */}
        <section className="bg-[#E8E2D7] px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-6xl text-start">
            <p
              {...cmsText('productsPage.whereToBuy.kicker')}
              className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink-band"
            >
              {t('productsPage.whereToBuy.kicker')}
            </p>
            <h2 {...cmsText('productsPage.whereToBuy.title')} className="mt-3 max-w-2xl text-3xl text-olive-dark md:text-4xl">
              {t('productsPage.whereToBuy.title', { store: MADINAH_NAME, count: BRANCH_COUNT })}
            </h2>
            <p {...cmsText('productsPage.whereToBuy.text')} className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brown-ink">
              {t('productsPage.whereToBuy.text', { store: MADINAH_NAME, count: BRANCH_COUNT })}
            </p>

            <div className="mt-12">
              <BranchCards />
            </div>
            <p
              {...cmsText('productsPage.whereToBuy.stockNote')}
              className="mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-brown-ink"
            >
              {t('productsPage.whereToBuy.stockNote', { store: MADINAH_NAME, count: BRANCH_COUNT })}
            </p>

            <a
              href={`https://wa.me/${STORE.seller.whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              {...cmsText('productsPage.whereToBuy.whatsappCta')}
              className="mt-8 inline-block rounded-full bg-olive-dark px-8 py-3 text-sm uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:bg-gold"
            >
              {t('productsPage.whereToBuy.whatsappCta')}
            </a>
          </div>
        </section>

        <section className="bg-olive-dark px-6 py-20 text-center md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 {...cmsText('productsPage.links.shopTitle')} className="text-3xl text-cream md:text-4xl">
              {t('productsPage.links.shopTitle')}
            </h2>
            <p {...cmsText('productsPage.links.shopText')} className="mt-4 font-body text-base leading-relaxed text-cream/80">
              {t('productsPage.links.shopText')}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={`/${lang}/shop`}
                {...cmsText('productsPage.links.shopCta')}
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream"
              >
                {t('productsPage.links.shopCta')}
              </Link>
              <Link
                to={`/${lang}/why-us`}
                {...cmsText('productsPage.links.whyUsCta')}
                className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold-light"
              >
                {t('productsPage.links.whyUsCta')}
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cream/50">
              <a
                href="https://madinah.com.my/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/30 underline-offset-4 transition-colors duration-300 hover:text-gold-light"
              >
                Berkat Madinah Store
              </a>
            </p>
          </div>
        </section>

        <FAQ
          kicker={t('productsPage.faq.kicker')}
          title={t('productsPage.faq.title')}
          items={faqItems}
          keyPrefix="productsPage.faq"
        />
      </main>
      <Footer />
    </>
  );
}
