import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Picture } from '../ui/Picture';
import { isStaticRender } from '../../lib/prerender';
import { isCmsStatic } from '../../cms/boot';
import { cmsText } from '../../cms/editable';
import manifest from '../../assets/opt/manifest.json';

gsap.registerPlugin(ScrollTrigger);

const DROPS = [
  { delay: 0.62, x: -6, size: 10 },
  { delay: 0.68, x: 8, size: 7 },
  { delay: 0.75, x: -3, size: 12 },
  { delay: 0.82, x: 5, size: 8 },
];

/**
 * Pour geometry (FORGE PRODUCTS-R1 O-10). `product-extra-virgin-3-cutout` was
 * measured, not guessed: the neck spans x 0.31–0.68 of the image width and the cap
 * top sits at y 0.005 of its height (shoulders from y≈0.30). The aspect comes from
 * the optimiser manifest, so a re-cut image keeps the maths right.
 *
 * The bottle box is sized by HEIGHT and rotates about its centre by TILT degrees;
 * the stream, drops and pool live in the same (un-rotated) box and start at where
 * the mouth lands after that rotation — so the oil visibly leaves the bottle mouth.
 */
const POUR_IMAGE = 'product-extra-virgin-3-cutout';
const POUR_SIZE = (manifest as Record<string, { width: number; height: number }>)[POUR_IMAGE];
const ASPECT = POUR_SIZE.width / POUR_SIZE.height; // w / h
const NECK = { x0: 0.31, x1: 0.68 };
const CAP_TOP_Y = 0.005;
const TILT = 112; // degrees, clockwise: past horizontal so the mouth points down-right
const MOUTH = (() => {
  // Mouth relative to the box centre, in box-HEIGHT units (the box is ASPECT wide).
  const dx = ((NECK.x0 + NECK.x1) / 2 - 0.5) * ASPECT;
  const dy = CAP_TOP_Y - 0.5;
  const r = (TILT * Math.PI) / 180;
  const x = dx * Math.cos(r) - dy * Math.sin(r);
  const y = dx * Math.sin(r) + dy * Math.cos(r);
  // Back to % of the box: left in % of its width, top in % of its height.
  return { left: 50 + (x / ASPECT) * 100, top: 50 + y * 100 };
})();
/** Neck width in % of the box width; the stream is a little narrower than the opening. */
const STREAM_W = (NECK.x1 - NECK.x0) * 100 * 0.32;
/** Where the stream lands, % of the box height. */
const POOL_TOP = 104;

/**
 * Section 4 — the bottle tilts open and pours: a golden stream grows from
 * the mouth into a pooling glow, drops fall in a stagger, and a copy block
 * slides in once the pour is underway. All scroll-scrubbed.
 */
export function BottleOpening() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const dropRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  // The copy waits off-screen for the scroll-scrubbed pour; an edit session has no
  // scroll animation, so it shows the finished frame instead. The 170vh scroll track
  // only exists for the pin, so it collapses to the pinned screen there too.
  const editing = isCmsStatic();

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
      gsap.set(bottleRef.current, { rotate: 0 });
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

      // Tilt first (0.05–0.3), then the stream grows out of the mouth (0.3+) — the
      // stream is positioned for the FINISHED tilt, so it must not start earlier.
      tl.to(bottleRef.current, { rotate: TILT, duration: 0.25, ease: 'power2.inOut' }, 0.05);
      tl.to(streamRef.current, { scaleY: 1, duration: 0.18, ease: 'power1.in' }, 0.3);
      tl.to(poolRef.current, { scaleX: 1, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.44);

      DROPS.forEach((d, i) => {
        tl.to(dropRefs.current[i], { y: 70, opacity: 1, ease: 'power1.in' }, d.delay);
        tl.to(dropRefs.current[i], { opacity: 0, ease: 'none' }, d.delay + 0.08);
      });

      tl.to(kickerRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.45);
      tl.to(copyRef.current, { opacity: 1, x: 0, ease: 'power2.out' }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="bottle-opening" ref={sectionRef} className={`relative ${editing ? 'h-screen' : 'h-[170vh]'} w-full`}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-olive-dark">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(80% 60% at 50% 20%, rgba(184,138,42,0.14) 0%, rgba(46,58,36,0) 70%)' }}
        />

        <div className="relative z-10 grid h-full w-full content-center grid-cols-1 items-center gap-6 px-6 sm:gap-8 md:px-16 lg:grid-cols-2">
          <div className="relative flex h-full items-center justify-center">
            {/* Stage: un-rotated, sized by height with the cutout's own aspect. */}
            <div className="relative h-[30vh] sm:h-[46vh] lg:h-[54vh]" style={{ aspectRatio: `${POUR_SIZE.width} / ${POUR_SIZE.height}` }}>
              <div
                ref={streamRef}
                className="absolute z-0 -translate-x-1/2 rounded-b-full"
                style={{
                  left: `${MOUTH.left}%`,
                  top: `${MOUTH.top}%`,
                  width: `${STREAM_W}%`,
                  minWidth: 4,
                  height: `${POOL_TOP - MOUTH.top}%`,
                  background: 'linear-gradient(180deg, #f0cd6a 0%, #c99a30 45%, #a07a22 100%)',
                  boxShadow: '0 0 16px rgba(232,193,90,0.55)',
                }}
              />

              {DROPS.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    dropRefs.current[i] = el;
                  }}
                  className="absolute z-0 rounded-full"
                  style={{
                    top: `${MOUTH.top + 6}%`,
                    left: `calc(${MOUTH.left}% + ${d.x}px)`,
                    width: d.size,
                    height: d.size * 1.3,
                    background: 'radial-gradient(circle at 35% 30%, #f2d488, #b88a2a)',
                  }}
                />
              ))}

              <div
                ref={poolRef}
                className="absolute z-0 -translate-x-1/2 rounded-full"
                style={{
                  left: `${MOUTH.left}%`,
                  top: `${POOL_TOP - 1.5}%`,
                  width: '220%',
                  height: '4%',
                  background: 'radial-gradient(ellipse, rgba(232,193,90,0.9) 0%, rgba(184,138,42,0.2) 65%, transparent 100%)',
                  filter: 'blur(2px)',
                }}
              />

              {/* Rendered at the FINISHED tilt so the prerender snapshot and a CMS edit
                  session (no gsap) show bottle + stream together; gsap resets it to 0. */}
              <div ref={bottleRef} className="absolute inset-0 z-10" style={{ transform: `rotate(${TILT}deg)` }}>
                <Picture
                  name={POUR_IMAGE}
                  alt={t('alt.bottlePour')}
                  cmsKey="home.bottle.pour"
                  cmsAltKey="alt.bottlePour"
                  className="h-full w-full object-contain"
                  style={{ filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.4))' }}
                  sizes="(min-width: 1024px) 20vh, (min-width: 640px) 17vh, 12vh"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start text-start">
            <p
              ref={kickerRef}
              {...cmsText('bottleOpening.kicker')}
              className={`font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-light${editing ? '' : ' opacity-0'}`}
              style={editing ? undefined : { transform: 'translateY(16px)' }}
            >
              {t('bottleOpening.kicker')}
            </p>
            <div ref={copyRef} className={editing ? undefined : 'opacity-0'} style={editing ? undefined : { transform: 'translateX(40px)' }}>
              <h2 {...cmsText('bottleOpening.title')} className="mt-3 max-w-lg text-4xl leading-[1.15] text-cream md:text-5xl">
                {t('bottleOpening.title')}
              </h2>
              <p {...cmsText('bottleOpening.body')} className="mt-6 max-w-md font-body text-base leading-relaxed tracking-wide text-cream/80 md:text-lg">
                {t('bottleOpening.body')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
