import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

/**
 * Anchor links (`<a href="#...">`) must not use the browser's native
 * instant jump — it changes scrollY in one frame with no intermediate
 * scroll events, so GSAP ScrollTrigger scrub animations pinned across
 * sections (e.g. Hero's bottle traveling into ScrollStory) never get a
 * chance to interpolate and land frozen at a stale transform. Routing the
 * same jump through Lenis keeps it eased and in sync with ScrollTrigger.
 * Falls back to native smooth scroll if Lenis isn't mounted (e.g. during
 * the loading screen).
 */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (activeLenis) {
    activeLenis.scrollTo(el as HTMLElement, { duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with the eased scroll position instead of raw native scroll.
 */
export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    activeLenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      activeLenis = null;
      gsap.ticker.remove(raf);
    };
  }, [enabled]);
}
