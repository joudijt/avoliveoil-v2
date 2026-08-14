import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCrown } from 'react-icons/fa';
import { STORE } from '../../config/site';

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

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const proxy = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          v: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplay(Math.round(proxy.v)),
        });
      },
    });
    return () => st.kill();
  }, [value]);

  return (
    <span ref={ref} className="text-5xl text-cream md:text-6xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const { t } = useTranslation();
  const stats = t('statistics.items', { returnObjects: true }) as StatItem[];

  return (
    <section className="relative w-full bg-olive-dark px-6 pb-12 pt-28 md:px-16 md:pb-16 md:pt-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <Counter
              value={s.fromFoundedYear ? YEARS_TRADING : s.value}
              suffix={s.suffix}
            />
            <p className="mt-3 text-sm font-light uppercase tracking-[0.25em] text-cream/60">{s.label}</p>
          </div>
        ))}

        <div>
          <div className="flex justify-center text-gold">
            <FaCrown className="h-10 w-10 md:h-12 md:w-12" />
          </div>
          <p className="mt-3 text-sm font-light uppercase tracking-[0.25em] text-cream/60">{t('statistics.premiumQuality')}</p>
        </div>
      </div>
    </section>
  );
}
