import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bottleImg from '../../assets/images/bottle-cutout.png';

gsap.registerPlugin(ScrollTrigger);

const DROPS = [
  { delay: 0.62, x: -6, size: 10 },
  { delay: 0.68, x: 8, size: 7 },
  { delay: 0.75, x: -3, size: 12 },
  { delay: 0.82, x: 5, size: 8 },
];

/**
 * Section 4 — the bottle tilts open and pours: a golden stream grows from
 * the mouth into a pooling glow, drops fall in a stagger, and a copy block
 * slides in once the pour is underway. All scroll-scrubbed.
 */
export function BottleOpening() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const isAr = lang === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const dropRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(streamRef.current, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(poolRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(dropRefs.current, { y: -10, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
        },
      });

      const tilt = isAr ? -7 : 7;
      const shift = isAr ? -30 : 30;
      tl.to(bottleRef.current, { rotate: tilt, x: shift, ease: 'power1.out' }, 0.05);
      tl.to(bottleRef.current, { rotate: tilt, x: shift }, 0.3);

      tl.to(streamRef.current, { scaleY: 1, ease: 'power1.inOut' }, 0.28);
      tl.to(poolRef.current, { scaleX: 1, opacity: 1, ease: 'power1.out' }, 0.42);

      DROPS.forEach((d, i) => {
        tl.to(dropRefs.current[i], { y: 90, opacity: 1, ease: 'power1.in' }, d.delay);
        tl.to(dropRefs.current[i], { opacity: 0, ease: 'none' }, d.delay + 0.08);
      });

      tl.to(kickerRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.45);
      tl.to(copyRef.current, { opacity: 1, x: 0, ease: 'power2.out' }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, [isAr]);

  return (
    <section id="bottle-opening" ref={sectionRef} className="relative h-[300vh] w-full">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-olive-dark">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(80% 60% at 50% 20%, rgba(184,138,42,0.14) 0%, rgba(46,58,36,0) 70%)' }}
        />

        <div className="relative z-10 grid h-full w-full content-center grid-cols-1 items-center gap-6 px-6 sm:gap-8 md:px-16 lg:grid-cols-2">
          <div className="relative flex h-full items-center justify-center">
            <div
              ref={bottleRef}
              className="relative w-[110px] sm:w-[min(28vh,220px)]"
              style={{ aspectRatio: '343 / 1683' }}
            >
              <img
                src={bottleImg}
                alt="Arabian Village Palestinian Olive Oil bottle, open and pouring"
                className="relative z-10 h-full w-full object-contain"
                style={{ filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.4))' }}
              />

              <div
                ref={streamRef}
                className="absolute left-1/2 top-[1%] z-0 hidden w-[7%] -translate-x-1/2 rounded-b-full sm:block"
                style={{
                  height: '340%',
                  background: 'linear-gradient(180deg, #e8c15a 0%, #b88a2a 55%, #8a6a1f 100%)',
                  boxShadow: '0 0 18px rgba(184,138,42,0.6)',
                }}
              />

              {DROPS.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    dropRefs.current[i] = el;
                  }}
                  className="absolute z-0 hidden rounded-full sm:block"
                  style={{
                    top: '30%',
                    left: `calc(50% + ${d.x}px)`,
                    width: d.size,
                    height: d.size * 1.3,
                    background: 'radial-gradient(circle at 35% 30%, #f2d488, #b88a2a)',
                  }}
                />
              ))}

              <div
                ref={poolRef}
                className="absolute left-1/2 z-0 hidden -translate-x-1/2 rounded-full sm:block"
                style={{
                  top: '132%',
                  width: '260%',
                  height: '5%',
                  background: 'radial-gradient(ellipse, rgba(184,138,42,0.85) 0%, rgba(184,138,42,0.15) 70%, transparent 100%)',
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-start text-start">
            <p ref={kickerRef} className="text-xs uppercase tracking-[0.35em] text-gold opacity-0" style={{ transform: 'translateY(16px)' }}>
              {t('bottleOpening.kicker')}
            </p>
            <div ref={copyRef} className="opacity-0" style={{ transform: 'translateX(40px)' }}>
              <h2 className="mt-3 max-w-lg text-4xl leading-[1.15] text-cream md:text-5xl">
                {t('bottleOpening.title')}
              </h2>
              <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed tracking-wide text-cream/75 md:text-lg">
                {t('bottleOpening.body')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
