import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, type Product } from '../../data/products';
import { Picture } from '../ui/Picture';
import { isStaticRender } from '../../lib/prerender';
import { cmsText } from '../../cms/editable';

gsap.registerPlugin(ScrollTrigger);

/**
 * The 8 real products (FORGE PRODUCTS-R1 O-13): Extra Virgin, Organic and the six
 * infused flavours from src/data/catalogue.json, each as its white square photo.
 * Classic cards link to their block on /products (#extra-virgin, #organic), infused
 * cards to their own page. Infused cards show the flavour-only `shortName` so the
 * grid stays readable; classic cards the full name.
 */
function productHref(p: Product, lang: string): string {
  return p.kind === 'classic' ? `/${lang}/products#${p.id}` : `/${lang}/products/${p.slug}`;
}

export function ProductShowcase() {
  const { t } = useTranslation();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // gsap sets its initial states here — opacity 0, yPercent 120 and friends.
  // This runs in useLayoutEffect, NOT useEffect, because the page now HYDRATES a
  // prerendered snapshot in which those animations had already finished: the
  // markup carries `opacity: 1; transform: translate(0px,0px)`. With useEffect
  // the browser painted that finished state first, then the animation reset it
  // and replayed — a visible flash above the fold on every load. useLayoutEffect
  // lands the reset before the first paint.
  useLayoutEffect(() => {
    // No gsap during the prerender snapshot or a CMS edit session — see src/lib/prerender.ts.
    if (isStaticRender()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sizeLine = (p: Product) => p.sizes.map((s) => t(`productsPage.price.size${s}`)).join(' · ');

  return (
    <section id="shop" ref={sectionRef} className="relative w-full bg-bg px-6 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36">
      <div className="mx-auto max-w-6xl text-center">
        <p
          {...cmsText('productShowcase.kicker')}
          className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink"
        >
          {t('productShowcase.kicker')}
        </p>
        <h2 {...cmsText('productShowcase.title')} className="mx-auto mt-3 max-w-2xl text-4xl text-olive-dark md:text-5xl">
          {t('productShowcase.title')}
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 md:mt-16 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => {
            const nameKey = product.kind === 'classic' ? `${product.i18n}.name` : `${product.i18n}.shortName`;
            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="min-w-0"
              >
                <Link
                  to={productHref(product, lang)}
                  className="group flex h-full flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <span className="block aspect-square w-full overflow-hidden rounded-2xl border border-olive-dark/10 bg-white shadow-[0_12px_30px_rgba(46,58,36,0.07)] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_rgba(46,58,36,0.14)]">
                    <Picture
                      name={product.image}
                      alt={t(`${product.i18n}.imageAlt`)}
                      cmsKey={`home.showcase.${product.cmsId}`}
                      cmsAltKey={`${product.i18n}.imageAlt`}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width:1024px) 260px, 45vw"
                    />
                  </span>
                  <span
                    {...cmsText(nameKey)}
                    className="mt-3 line-clamp-2 font-display text-[15px] leading-snug text-olive-dark transition-colors duration-300 group-hover:text-gold-ink sm:mt-4 sm:text-lg"
                  >
                    {t(nameKey)}
                  </span>
                  <span className="mt-1 font-body text-sm text-brown-ink">{sizeLine(product)}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
