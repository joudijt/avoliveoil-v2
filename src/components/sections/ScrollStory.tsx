import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import storyPortraitImg from '../../assets/images/woman-holding-bottle-nobg.webp';

gsap.registerPlugin(ScrollTrigger);

interface StoryCard {
  order: string;
  title: string;
  text: string;
}

const PLACEMENT = [
  'lg:col-start-1 lg:row-start-1 lg:justify-self-end',
  'lg:col-start-1 lg:row-start-2 lg:justify-self-end',
  'lg:col-start-3 lg:row-start-1 lg:justify-self-start',
  'lg:col-start-3 lg:row-start-2 lg:justify-self-start',
];

function Card({
  order,
  title,
  text,
  className,
  cardRef,
}: {
  order: string;
  title: string;
  text: string;
  className: string;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`w-full max-w-[300px] rounded-2xl border border-white/60 bg-white/40 p-6 opacity-0 shadow-[0_20px_45px_rgba(46,58,36,0.1)] backdrop-blur-md lg:p-7 ${className}`}
    >
      <span className="text-[11px] tracking-[0.3em] text-gold">{order}</span>
      <h3 className="mt-3 font-display text-xl tracking-wide text-olive-dark lg:text-2xl">{title}</h3>
      <p className="mt-3 font-body text-sm font-light leading-relaxed text-brown/75">{text}</p>
    </div>
  );
}

/**
 * Section 3 — "From the grove" storytelling. Title/kicker are static; the
 * only animation is a one-shot card reveal the first time the section
 * enters the viewport. Not pinned, not scroll-scrubbed — once played,
 * everything stays put and scrolls away normally.
 *
 * Below lg (phone/tablet) the 4 cards render as one evenly-spaced column
 * in order 01→04 with a simple fade/slide-up reveal, with the product
 * portrait image sitting between card 02 and 03. At lg+ the cards split
 * left/right around that same image via explicit grid placement on the
 * same DOM order rather than a separate markup branch, so there's only
 * one set of card refs to animate.
 */
export function ScrollStory() {
  const { t } = useTranslation();
  const leftCards = t('scrollStory.leftCards', { returnObjects: true }) as StoryCard[];
  const rightCards = t('scrollStory.rightCards', { returnObjects: true }) as StoryCard[];
  const cards = [...leftCards, ...rightCards];
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
        cardRefs.current.forEach((card, i) => {
          tl.fromTo(
            card,
            { opacity: 0, x: i < 2 ? -60 : 60 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
            i === 0 ? undefined : '-=0.35',
          );
        });
      });

      mm.add('(max-width: 1023px)', () => {
        cardRefs.current.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            },
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="our-story" ref={sectionRef} className="relative w-full overflow-hidden bg-[#E8E2D7] px-6 py-24 md:px-16 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(184,138,42,0.14) 0%, rgba(232,226,215,0) 70%)' }} />

      <div className="relative mx-auto max-w-7xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('scrollStory.kicker')}</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl text-olive-dark md:text-5xl">
          {t('scrollStory.title')}
        </h2>

        <div className="relative mt-16 grid grid-cols-1 items-center justify-items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2 lg:gap-6">
          {cards.slice(0, 2).map((card, i) => (
            <Card
              key={card.order}
              {...card}
              className={PLACEMENT[i]}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}

          <img
            src={storyPortraitImg}
            alt="Woman holding a bottle of Arabian Village organic Palestinian olive oil"
            className="h-[45vh] w-auto object-contain lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-[65vh]"
            style={{ filter: 'drop-shadow(0 25px 35px rgba(46,58,36,0.25))' }}
          />

          {cards.slice(2, 4).map((card, i) => (
            <Card
              key={card.order}
              {...card}
              className={PLACEMENT[i + 2]}
              cardRef={(el) => {
                cardRefs.current[i + 2] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
