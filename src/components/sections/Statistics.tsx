import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCrown } from 'react-icons/fa';
import { STORE } from '../../config/site';
import { isStaticRender } from '../../lib/prerender';
import { cmsNum, cmsText } from '../../cms/editable';

gsap.registerPlugin(ScrollTrigger);

/** Computed, not stored: the prerendered value is refreshed by every build. */
const YEARS_TRADING = new Date().getFullYear() - STORE.seller.foundedYear;

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  /**
   * Years-trading tiles derive their number from the seller's founding year in
   * storeFacts.json instead of carrying a hardcoded count that silently rots one
   * new year at a time. A stat nobody recomputes becomes a false claim.
   */
  fromFoundedYear?: boolean;
}

function Counter({
  value,
  suffix,
  cmsKey,
  numberEditable,
}: {
  value: number;
  suffix: string;
  /** i18n prefix of this tile, e.g. `statistics.items.1`. */
  cmsKey: string;
  /** False for the years-trading tile: its number is computed, not copy. */
  numberEditable: boolean;
}) {
  /**
   * Seeded with the REAL value, not 0.
   *
   * The count-up only runs when the tile scrolls into view, and
   * scripts/prerender.mjs never scrolls — so starting at 0 meant every
   * prerendered page published "0% Natural, 0+ Customers, 0+ Years". That is
   * what non-JS crawlers and AI fetchers read, and it contradicted AI-FACTS.yml
   * and llms.txt on all three homepages. Verified live before the fix.
   *
   * Seeding also keeps hydration honest: the first client render now matches
   * the markup React is adopting. Animating from 0 on enter (rather than
   * rendering 0 and animating up) preserves the effect for a visitor with JS.
   */
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // No gsap during the prerender snapshot or a CMS edit session — see src/lib/prerender.ts.
    if (isStaticRender()) return;
    const proxy = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          proxy,
          { v: 0 },
          {
            v: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setDisplay(Math.round(proxy.v)),
          },
        );
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    /* suppressHydrationWarning: the years-trading tile is derived from
       new Date().getFullYear(), so a page prerendered on 31 Dec and read on
       1 Jan differs by one — a text mismatch that would otherwise throw away
       the whole hydrated tree for a cosmetic difference. */
    /* Number and suffix sit in their own inline spans so the CMS can replace each
       (spec §15: serve.php formats the number like toLocaleString('en-US')). The
       locale is pinned for the same reason: the snapshot and every visitor must
       group digits identically to the server. */
    <span ref={ref} suppressHydrationWarning className="text-5xl text-cream md:text-6xl">
      {/* No count-up in a static render: show the value itself, so a number changed in the
          CMS editor shows at once (display only follows `value` through the animation). */}
      <span {...(numberEditable ? cmsNum(`${cmsKey}.value`) : {})}>{(isStaticRender() ? value : display).toLocaleString('en-US')}</span>
      <span {...cmsText(`${cmsKey}.suffix`)}>{suffix}</span>
    </span>
  );
}

export function Statistics() {
  const { t } = useTranslation();
  const stats = t('statistics.items', { returnObjects: true }) as StatItem[];

  return (
    <section className="relative w-full bg-olive-dark px-6 pb-12 pt-28 md:px-16 md:pb-16 md:pt-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label}>
            <Counter
              value={s.fromFoundedYear ? YEARS_TRADING : s.value}
              suffix={s.suffix}
              cmsKey={`statistics.items.${i}`}
              numberEditable={!s.fromFoundedYear}
            />
            <p {...cmsText(`statistics.items.${i}.label`)} className="mt-3 text-sm font-light uppercase tracking-[0.25em] text-cream/60">{s.label}</p>
          </div>
        ))}

        <div>
          <div className="flex justify-center text-gold">
            <FaCrown className="h-10 w-10 md:h-12 md:w-12" />
          </div>
          <p {...cmsText('statistics.premiumQuality')} className="mt-3 text-sm font-light uppercase tracking-[0.25em] text-cream/60">{t('statistics.premiumQuality')}</p>
        </div>
      </div>
    </section>
  );
}
