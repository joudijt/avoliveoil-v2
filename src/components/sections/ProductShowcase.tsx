import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../../data/products';

gsap.registerPlugin(ScrollTrigger);

interface ProductText {
  name: string;
  description: string;
}

export function ProductShowcase() {
  const { t } = useTranslation();
  const productText = t('productShowcase.products', { returnObjects: true }) as Record<string, ProductText>;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const center = Math.floor(PRODUCTS.length / 2);

  return (
    <section id="shop" ref={sectionRef} className="relative w-full bg-bg px-6 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('productShowcase.kicker')}</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl text-olive-dark md:text-5xl">{t('productShowcase.title')}</h2>

        <div className="mt-20 flex flex-wrap items-end justify-center gap-4 md:gap-2">
          {PRODUCTS.map((product, i) => {
            const isCenter = i === center;
            const text = productText[product.id];
            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative flex flex-col items-center px-3"
                style={{ animation: `product-bob ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }}
              >
                <div
                  className={`relative flex items-end justify-center transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-105 h-[30vh] ${
                    isCenter ? 'lg:h-[50vh]' : 'lg:h-[36vh]'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-gold/0 blur-2xl transition-colors duration-500 group-hover:bg-gold/20" />
                  <img
                    src={product.image}
                    alt={text.name}
                    className="relative h-full w-auto object-contain transition-transform duration-500 group-hover:rotate-3"
                    style={{ filter: 'drop-shadow(0 20px 20px rgba(46,58,36,0.18))' }}
                  />
                </div>
                <p className={`mt-4 text-sm text-olive-dark ${isCenter ? 'font-medium' : 'font-light text-olive-dark/70'}`}>
                  {text.name}
                </p>
                <p className="mt-1 max-w-[160px] text-xs font-light text-brown/60">{text.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes product-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
