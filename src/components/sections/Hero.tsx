import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToHash } from '../../hooks/useLenis';
import { Picture } from '../ui/Picture';
import { isStaticRender } from '../../lib/prerender';
import { cmsText } from '../../cms/editable';

gsap.registerPlugin(ScrollTrigger);

function BottleParallax({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { t } = useTranslation();
  const imgRef = useRef<HTMLImageElement>(null);
  const current = useRef({ x: 0, y: 0 });

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
    let raf: number;
    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;
      if (imgRef.current) {
        const rotY = current.current.x * 8;
        const rotX = -current.current.y * 5;
        const tx = current.current.x * 14;
        imgRef.current.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateX(${tx}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  return (
    // Owner 2026-11-05: the header bottle sits on the scene with NO white tile —
    // the transparent Extra Virgin cut-out (533x1429), sized by height.
    <Picture
      ref={imgRef}
      name="product-extra-virgin-cutout"
      alt={t('alt.heroBottle')}
      cmsKey="home.hero.bottle"
      cmsAltKey="alt.heroBottle"
      className="relative z-10 h-[34vh] w-auto max-w-full object-contain sm:h-[44vh] md:h-[min(62vh,620px)]"
      style={{ filter: 'drop-shadow(0 28px 30px rgba(46,58,36,0.30))' }}
      sizes="(min-width: 768px) min(23vh, 232px), (min-width: 640px) 17vh, 13vh"
      priority
    />
  );
}

const LEAVES = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  left: `${55 + ((i * 23) % 40)}%`,
  top: `${(i * 41 + 5) % 100}%`,
  size: 14 + (i % 4) * 6,
  duration: 9 + (i % 5) * 2,
  delay: i * 0.6,
  depth: i % 3 === 0 ? 'far' : i % 3 === 1 ? 'mid' : 'near',
}));

export function Hero() {
  const { t } = useTranslation();
  const mouse = useRef({ x: 0, y: 0 });
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottleWrapRef = useRef<HTMLDivElement>(null);
  const bottleExitRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // No gsap during the prerender snapshot or a CMS edit session — see src/lib/prerender.ts.
    if (isStaticRender()) return;
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useLayoutEffect(() => {
    // No gsap during the prerender snapshot or a CMS edit session — see src/lib/prerender.ts.
    if (isStaticRender()) return;
    const words = headingRef.current?.querySelectorAll('span.word');
    const tl = gsap.timeline({ delay: 0.2 });
    if (words?.length) {
      tl.fromTo(
        words,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.09 },
      );
    }
    tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    tl.fromTo(
      bottleWrapRef.current,
      { opacity: 0, y: 60, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.1',
    );
    return () => {
      tl.kill();
    };
  }, []);

  const headlineWords = t('hero.headlineWords', { returnObjects: true }) as { text: string; gold: boolean }[];

  return (
    <section id="home" ref={rootRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-bg">
      {/* Was a `bg-cover` div with `background-position: 68% 62%`; an <img> with
          object-cover + the same object-position paints identically and is the
          only form that can carry a srcset for the LCP element. */}
      <Picture
        name="OliveGroveSunsetHero"
        alt=""
        aria-hidden
        cmsKey="home.hero.bg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '68% 62%' }}
        sizes="100vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(247,244,237,0.72) 0%, rgba(247,244,237,0.6) 32%, rgba(247,244,237,0.32) 55%, rgba(46,58,36,0.12) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 78% 55%, rgba(184,138,42,0.08) 0%, rgba(247,244,237,0) 70%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        {LEAVES.map((leaf) => (
          <span
            key={leaf.id}
            className="absolute rounded-[60%_40%_60%_40%] bg-olive/30"
            style={{
              left: leaf.left,
              top: leaf.top,
              width: leaf.size,
              height: leaf.size * 0.6,
              opacity: leaf.depth === 'far' ? 0.25 : leaf.depth === 'mid' ? 0.4 : 0.55,
              filter: leaf.depth === 'far' ? 'blur(1.5px)' : 'none',
              animation: `leaf-float ${leaf.duration}s ease-in-out ${leaf.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 grid w-full grid-cols-1 items-center gap-5 px-6 pt-24 sm:gap-8 sm:pt-20 md:grid-cols-2 md:px-16 md:pt-0">
        <div className="pointer-events-none flex flex-col items-start text-start">
          <h1 ref={headingRef} data-cms-words="hero.headlineWords" className="max-w-xl text-4xl leading-[1.1] text-olive-dark sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineWords.map((w, i) => (
              <span key={i} className="me-3 inline-block overflow-hidden align-bottom last:me-0">
                <span className={`word inline-block ${w.gold ? 'text-gold-ink' : ''}`}>{w.text}</span>
              </span>
            ))}
          </h1>

          <p ref={subRef} {...cmsText('hero.sub')} className="mt-4 max-w-md font-body text-base tracking-wide text-brown-ink sm:mt-6 md:text-lg">
            {t('hero.sub')}
          </p>

          <div ref={ctaRef} className="pointer-events-auto mt-6 flex flex-col gap-4 sm:mt-10 sm:flex-row">
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash('#shop');
              }}
              {...cmsText('hero.shopNow')}
              className="rounded-full bg-olive-dark px-9 py-3.5 text-center text-sm font-medium tracking-wide text-cream transition-all duration-300 hover:bg-gold hover:shadow-lg hover:shadow-gold/30"
            >
              {t('hero.shopNow')}
            </a>
            <a
              href="#journey"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash('#journey');
              }}
              {...cmsText('hero.discoverStory')}
              className="rounded-full border border-olive-dark/25 px-9 py-3.5 text-center text-sm font-medium tracking-wide text-olive-dark transition-all duration-300 hover:border-gold hover:text-gold-ink"
            >
              {t('hero.discoverStory')}
            </a>
          </div>
        </div>

        <div ref={bottleExitRef} className="relative z-30 h-[36vh] w-full sm:h-[46vh] md:h-[85vh]">
          <div
            ref={bottleWrapRef}
            className="relative flex h-full items-center justify-center md:justify-start md:ps-[6%]"
            style={{ animation: 'bottle-bob 6s ease-in-out infinite' }}
          >
            <BottleParallax mouse={mouse} />
          </div>
        </div>
      </div>

      <div {...cmsText('hero.scroll')} className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-olive-dark/40">
        {t('hero.scroll')}
      </div>

      <style>{`
        @keyframes leaf-float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-30px) translateX(14px) rotate(15deg); }
        }
        @keyframes bottle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}
