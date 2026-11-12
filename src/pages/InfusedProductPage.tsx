import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import { Picture } from '../components/ui/Picture';
import { INFUSED_PRODUCTS, findInfusedProduct } from '../data/infusedProducts';
import { InfusedCard, InStoreNote } from '../components/sections/InfusedCard';
import { STORE, BRANCH_COUNT, MADINAH_NAME } from '../config/site';
import { cmsText } from '../cms/editable';
import { priceOf } from '../data/products';
import { AddToCart, markCartOpened } from '../order/AddToCart';
import { itemsForProduct } from '../order/catalog';
import { loadStore, orderEnabled, setLoadFailed } from '../order/bridge';

const ALL_LANGS = ['en', 'ms'] as const;

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
  const infusedPrice = priceOf({ priceKey: 'infused' }, '250');
  const notes = t(`${key}.notes`, { returnObjects: true }) as string[];
  const benefits = t(`${key}.benefits`, { returnObjects: true }) as string[];
  const uses = t(`${key}.uses`, { returnObjects: true }) as string[];
  const others = INFUSED_PRODUCTS.filter((p) => p.id !== product.id);

  // FORGE ORDER-R1: "Order here" in the closing section puts this flavour in the cart
  // (once: a second press only opens the cart) and opens the cart. The cart is read at
  // click time, so this page does not re-render on every cart change. Opening it here
  // counts as the session's first open: the next add only updates the badge.
  const orderSku = itemsForProduct(product.id)[0]?.sku;
  const orderHere = () => {
    if (!orderSku || !orderEnabled()) return;
    // The store loads on demand (it is not in the first-render bundle).
    loadStore().then(
      (m) => {
        if (!m.currentCart().lines.some((l) => l.sku === orderSku)) m.orderActions.add(orderSku, 1);
        markCartOpened();
        m.orderActions.openCart();
      },
      () => setLoadFailed(true)
    );
  };

  const crumbs = [
    { name: t('breadcrumb.products'), path: 'products', cmsKey: 'breadcrumb.products' },
    { name, path: `products/${product.slug}`, cmsKey: `${key}.name` },
  ];

  return (
    <>
      <SEO
        page="products"
        pathByLang={Object.fromEntries(ALL_LANGS.map((l) => [l, `products/${product.slug}`]))}
        titleOverride={t(`${key}.seoTitle`)}
        descriptionOverride={t(`${key}.seoDescription`)}
        breadcrumbs={crumbs}
        productMeta={{ name, description: t(`${key}.seoDescription`), productId: product.id }}
      />
      <Navbar />
      <main className="bg-bg">
        <Breadcrumbs items={crumbs} />

        {/* ------------------------------------------------------------ hero */}
        <section className="px-6 pb-20 pt-10 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="text-start">
              <p
                {...cmsText('infusedPage.kicker')}
                className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink"
              >
                {t('infusedPage.kicker')}
              </p>
              <h1 {...cmsText(`${key}.name`)} className="mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl">{name}</h1>
              <p
                {...cmsText(`${key}.tagline`)}
                className="mt-3 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-ink"
              >
                {t(`${key}.tagline`)}
              </p>
              <p {...cmsText(`${key}.description`)} className="mt-6 max-w-md font-body text-[17px] leading-[1.75] text-brown-ink">
                {t(`${key}.description`)}
              </p>
              {/* Infused: 250 ml only. Price from storeFacts (owner 2026-11-05: RM75) via
                  priceOf; if it is ever unset again the line falls back to the WhatsApp ask. */}
              <p className="mt-6 font-body text-lg text-olive-dark">
                <span {...cmsText('infusedPage.size250')} className="font-bold">
                  {t('infusedPage.size250')}
                </span>
                {' — '}
                {infusedPrice ? (
                  <span className="font-display text-2xl text-olive-dark">{infusedPrice.display}</span>
                ) : (
                  <a
                    href={`https://wa.me/${STORE.seller.whatsappDigits}?text=${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...cmsText('productsPage.price.inStore')}
                    className="font-semibold text-gold-ink underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-olive-dark"
                  >
                    {t('productsPage.price.inStore')}
                  </a>
                )}
              </p>
              <InStoreNote className="mt-3" />
              <AddToCart productId={product.id} variant="page" className="mt-6 max-w-xs" />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-olive-dark/10 bg-white shadow-[0_30px_60px_rgba(46,58,36,0.12)]">
                <Picture
                  name={product.image}
                  alt={t(`${key}.imageAlt`)}
                  cmsKey={`infused.${product.id}.hero`}
                  cmsAltKey={`${key}.imageAlt`}
                  className="block aspect-square h-auto w-full object-contain"
                  sizes="(min-width: 768px) 460px, 88vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- flavor notes */}
        <section className="bg-cream px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 {...cmsText('infusedPage.notesTitle')} className="text-3xl text-olive-dark md:text-4xl">{t('infusedPage.notesTitle')}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {notes.map((note, i) => (
                <div
                  key={note}
                  className="rounded-2xl border border-olive-dark/10 bg-bg p-6 text-start shadow-[0_10px_30px_rgba(46,58,36,0.05)]"
                >
                  <p {...cmsText(`${key}.notes.${i}`)} className="font-body text-base font-semibold text-olive-dark">{note}</p>
                </div>
              ))}
            </div>

            <h2 {...cmsText('infusedPage.benefitsTitle')} className="mt-16 text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.benefitsTitle')}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-olive-dark/10 bg-bg p-5 text-start"
                >
                  <p {...cmsText(`${key}.benefits.${i}`)} className="font-body text-[15px] font-medium leading-relaxed text-olive-dark">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- how to use */}
        <section className="bg-[#E8E2D7] px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl text-start">
            <h2 {...cmsText('infusedPage.usesTitle')} className="text-3xl text-olive-dark md:text-4xl">{t('infusedPage.usesTitle')}</h2>
            <ol className="mt-10 space-y-4">
              {uses.map((use, i) => (
                <li
                  key={use}
                  className="flex items-start gap-4 rounded-2xl bg-bg/60 p-6 font-body text-base leading-relaxed text-brown-ink"
                >
                  <span className="font-display text-lg text-gold-ink-band">{i + 1}.</span>
                  {/* Its own span so the CMS can replace the text without the number. */}
                  <span {...cmsText(`${key}.uses.${i}`)}>{use}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- cta */}
        <section className="bg-olive-dark px-6 py-20 text-center md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 {...cmsText('infusedPage.cta.title')} className="text-3xl text-cream md:text-4xl">
              {t('infusedPage.cta.title', { store: MADINAH_NAME })}
            </h2>
            <p {...cmsText('infusedPage.cta.text')} className="mt-4 font-body text-base leading-relaxed text-cream/80">
              {t('infusedPage.cta.text', { store: MADINAH_NAME, count: BRANCH_COUNT })}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {orderSku ? (
                <button
                  type="button"
                  data-testid="order-here"
                  data-sku={orderSku}
                  onClick={orderHere}
                  {...cmsText('order.orderHere')}
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream"
                >
                  {t('order.orderHere')}
                </button>
              ) : null}
              <Link
                to={`/${lang}/shop`}
                {...cmsText('infusedPage.cta.shopCta')}
                className={
                  orderSku
                    ? 'rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold-light'
                    : 'rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream'
                }
              >
                {t('infusedPage.cta.shopCta')}
              </Link>
              <Link
                to={`/${lang}/contact`}
                {...cmsText('infusedPage.cta.contactCta')}
                className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold-light"
              >
                {t('infusedPage.cta.contactCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- other flavors */}
        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 {...cmsText('infusedPage.otherTitle')} className="text-center text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.otherTitle')}
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {others.map((other) => (
                <InfusedCard key={other.id} product={other} lang={lang} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to={`/${lang}/products`}
                {...cmsText('infusedPage.backToProducts')}
                className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-olive-dark transition-colors duration-300 hover:text-gold-ink"
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
