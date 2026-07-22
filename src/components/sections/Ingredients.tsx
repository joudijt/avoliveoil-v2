import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaAppleAlt, FaSnowflake, FaLeaf, FaTint, FaMedal } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  olive: FaAppleAlt,
  snow: FaSnowflake,
  leaf: FaLeaf,
  drop: FaTint,
  medal: FaMedal,
};

interface IngredientItem {
  title: string;
  desc: string;
  icon: string;
}

const ENTRANCES = [
  { x: -60, y: 0, rotate: -4 },
  { x: 0, y: 70, rotate: 0 },
  { x: 0, y: -70, rotate: 0, scale: 0.8 },
  { x: 60, y: 0, rotate: 4 },
  { x: 0, y: 70, rotate: -3, scale: 0.85 },
];

export function Ingredients() {
  const { t } = useTranslation();
  const items = t('ingredients.items', { returnObjects: true }) as IngredientItem[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );

      cardRefs.current.forEach((card, i) => {
        const e = ENTRANCES[i % ENTRANCES.length];
        gsap.fromTo(
          card,
          { opacity: 0, x: e.x, y: e.y, rotate: e.rotate, scale: e.scale ?? 1 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#E8E2D7] px-6 py-28 md:px-16 md:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          background: 'linear-gradient(180deg, rgba(184,138,42,0.12) 0%, rgba(232,226,215,0) 100%)',
        }}
      />

      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('ingredients.kicker')}</p>
        <h2 ref={headingRef} className="mx-auto mt-3 max-w-2xl text-4xl text-olive-dark md:text-5xl">
          {t('ingredients.title')}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="rounded-2xl border border-olive-dark/10 bg-cream p-8 text-start shadow-[0_10px_30px_rgba(46,58,36,0.06)] transition-transform duration-500 hover:-translate-y-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl text-olive-dark">{item.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-brown/70">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
