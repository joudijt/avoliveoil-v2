import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FAQ } from '../components/sections/FAQ';
import { useMarkAppReady } from '../hooks/useMarkAppReady';
import bottleImg from '../assets/images/bottle-cutout.png';
import { INFUSED_PRODUCTS } from '../data/infusedProducts';

interface Highlight {
  label: string;
  value: string;
}

interface ComingSoonItem {
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export function ProductsPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useMarkAppReady();

  const highlights = t('productsPage.product.highlights', { returnObjects: true }) as Highlight[];
  const comingSoonItems = t('productsPage.comingSoon.items', { returnObjects: true }) as ComingSoonItem[];
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
        <Breadcrumbs items={[{ name: t('breadcrumb.products'), path: 'products' }]} />

        <section className="px-6 pb-20 pt-10 md:px-16 md:pb-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="text-start">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('productsPage.kicker')}</p>
              <h1 className="mt-3 text-4xl leading-[1.1] text-olive-dark md:text-5xl lg:text-6xl">
                {t('productsPage.title')}
              </h1>
              <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
                {t('productsPage.intro')}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={bottleImg}
                alt="Arabian Village Organic Palestinian Olive Oil 500ml bottle, first cold pressed"
                className="h-[46vh] w-auto object-contain md:h-[56vh]"
                style={{ filter: 'drop-shadow(0 25px 35px rgba(46,58,36,0.25))' }}
              />
            </div>
          </div>
        </section>

        <section className="bg-cream px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl text-olive-dark md:text-4xl">{t('productsPage.product.name')}</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {t('productsPage.product.tagline')}
            </p>
            <p className="mt-6 max-w-2xl font-body text-base font-light leading-relaxed text-brown/75 md:text-lg">
              {t('productsPage.product.description')}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-olive-dark/10 bg-bg p-5 text-start shadow-[0_10px_30px_rgba(46,58,36,0.05)]"
                >
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold">{h.label}</h3>
                  <p className="mt-2 text-sm font-medium text-olive-dark">{h.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl text-start">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('infusedPage.kicker')}</p>
            <h2 className="mt-3 max-w-2xl text-3xl text-olive-dark md:text-4xl">
              {t('infusedPage.collectionTitle')}
            </h2>
            <p className="mt-4 max-w-xl font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('infusedPage.collectionIntro')}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INFUSED_PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  to={`/${lang}/products/${product.slug}`}
                  className="group rounded-2xl border border-olive-dark/10 bg-cream p-6 text-start transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(46,58,36,0.14)]"
                >
                  <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                    {t('infusedPage.comingSoonBadge')}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug text-olive-dark transition-colors duration-300 group-hover:text-gold">
                    {t(`infusedPage.products.${product.id}.name`)}
                  </h3>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/70">
                    {t(`infusedPage.products.${product.id}.tagline`)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#E8E2D7] px-6 py-20 md:px-16 md:py-28">
          <div className="mx-auto max-w-5xl text-start">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('productsPage.comingSoon.kicker')}</p>
            <h2 className="mt-3 max-w-2xl text-3xl text-olive-dark md:text-4xl">
              {t('productsPage.comingSoon.title')}
            </h2>
            <p className="mt-4 max-w-xl font-body text-sm font-light leading-relaxed text-brown/70 md:text-base">
              {t('productsPage.comingSoon.text')}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {comingSoonItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-dashed border-olive-dark/20 bg-bg/60 p-8 text-start"
                >
                  <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                    {t('productsPage.comingSoon.kicker')}
                  </span>
                  <h3 className="mt-4 text-lg text-olive-dark">{item.title}</h3>
                  <p className="mt-2 text-sm font-light text-brown/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-olive-dark px-6 py-20 text-center md:px-16 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl text-cream md:text-4xl">{t('productsPage.links.shopTitle')}</h2>
            <p className="mt-4 font-body text-base font-light leading-relaxed text-cream/70">
              {t('productsPage.links.shopText')}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={`/${lang}/shop`}
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-olive-dark transition-colors duration-300 hover:bg-cream"
              >
                {t('productsPage.links.shopCta')}
              </Link>
              <Link
                to={`/${lang}/why-us`}
                className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {t('productsPage.links.whyUsCta')}
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-cream/40">
              <a
                href="https://madinah.com.my/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-cream/30 underline-offset-4 transition-colors duration-300 hover:text-gold"
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
        />
      </main>
      <Footer />
    </>
  );
}
