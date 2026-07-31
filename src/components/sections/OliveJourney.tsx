import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import treeImg from '../../assets/images/journey-01-tree.png';
import growingImg from '../../assets/images/journey-02-growing.png';
import harvestImg from '../../assets/images/journey-03-harvest.png';
import extractionImg from '../../assets/images/journey-04-extraction.png';
import filteringImg from '../../assets/images/journey-05-filtering.png';
import testingImg from '../../assets/images/journey-06-testing.webp';
import bottlingImg from '../../assets/images/journey-07-bottling.png';
import finalImg from '../../assets/images/journey-08-final.png';

interface JourneyScene {
  key: string;
  title: string;
  caption: string;
}

const PHOTOS: Record<string, string> = {
  tree: treeImg,
  growing: growingImg,
  harvest: harvestImg,
  extraction: extractionImg,
  filtering: filteringImg,
  testing: testingImg,
  bottling: bottlingImg,
  final: finalImg,
};

export function OliveJourney() {
  const { t } = useTranslation();
  const journey = t('oliveJourney.scenes', { returnObjects: true }) as JourneyScene[];
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const scene = journey[index];
  const go = (delta: number) => setIndex((i) => (i + delta + journey.length) % journey.length);

  useEffect(() => {
    gsap.fromTo(imgRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
    gsap.fromTo(captionRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, [index]);

  return (
    <section id="journey" className="relative w-full bg-[#E8E2D7] px-6 py-28 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col items-start text-start md:order-1">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">{t('oliveJourney.kicker')}</p>
          <h2 className="mt-3 text-4xl text-olive-dark md:text-5xl">{t('oliveJourney.title')}</h2>

          <p ref={captionRef} className="mt-8 max-w-md text-xl font-light leading-relaxed text-olive-dark/80 md:text-2xl">
            <span className="text-gold">{scene.title}:</span> {scene.caption}
          </p>

          <p className="mt-8 text-sm tracking-[0.2em] text-olive-dark/40">
            {String(index + 1).padStart(2, '0')} / {String(journey.length).padStart(2, '0')}
          </p>

          <div className="mt-4 flex gap-2">
            {journey.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setIndex(i)}
                aria-label={`Go to ${s.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-gold' : 'w-1.5 bg-olive-dark/20 hover:bg-olive-dark/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-olive-dark/10 shadow-[0_15px_40px_rgba(46,58,36,0.12)]">
            <img
              ref={imgRef}
              src={PHOTOS[scene.key]}
              alt={scene.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-olive-dark/40 via-transparent to-transparent" />

            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute start-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/50 bg-cream/80 text-olive-dark backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <FiChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute end-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/50 bg-cream/80 text-olive-dark backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <FiChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
