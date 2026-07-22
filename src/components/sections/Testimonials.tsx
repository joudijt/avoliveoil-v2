import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  quote: string;
  name: string;
  place: string;
}

export function Testimonials() {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-olive-dark px-6 pb-28 pt-12 md:px-16 md:pb-32 md:pt-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[80vh] -translate-x-1/2 opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(184,138,42,0.14) 0%, rgba(46,58,36,0) 65%)' }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('testimonials.kicker')}</p>
        <h2 className="mx-auto mt-3 text-4xl text-cream md:text-5xl">{t('testimonials.title')}</h2>
      </div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-8 text-start backdrop-blur-md"
            style={{ animation: `testimonial-float ${7 + i}s ease-in-out ${i * 0.5}s infinite` }}
          >
            <span className="font-display text-4xl text-gold">“</span>
            <p className="mt-2 font-light leading-relaxed text-cream/85">{item.quote}</p>
            <p className="mt-6 text-sm text-cream/60">
              <span className="text-gold">{item.name}</span> · {item.place}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes testimonial-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
