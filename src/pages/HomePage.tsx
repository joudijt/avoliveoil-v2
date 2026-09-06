import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Hero } from '../components/sections/Hero';
import { ScrollStory } from '../components/sections/ScrollStory';
import { BottleOpening } from '../components/sections/BottleOpening';
import { Ingredients } from '../components/sections/Ingredients';
import { ProductShowcase } from '../components/sections/ProductShowcase';
import { PurchasePath } from '../components/sections/PurchasePath';
import { OliveJourney } from '../components/sections/OliveJourney';
import { Statistics } from '../components/sections/Statistics';
import { Testimonials } from '../components/sections/Testimonials';
import { FAQ } from '../components/sections/FAQ';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { useLenis } from '../hooks/useLenis';
import { useMarkAppReady } from '../hooks/useMarkAppReady';

export function HomePage() {
  const { t } = useTranslation();

  // The splash screen is gone (PERF-1): it hid the whole homepage behind a
  // ~5.2 s gsap timeline on every single visit and pulled in the 943 KB
  // bottle cutout twice before anything else could paint. Lenis is therefore
  // enabled from the first render — its argument is "mount the smooth-scroll
  // instance", which used to be gated on the splash having finished.
  useLenis(true);

  // Marks the DOM as fully rendered so the build-time prerender script knows
  // when to snapshot — scripts/prerender.mjs (and perf-probe/walk-brand) wait
  // for body[data-app-ready="true"] and the build hangs without it. Same hook
  // every other page uses now that there is no loading screen to wait on.
  useMarkAppReady();

  const faqs = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <>
      <SEO page="home" faqs={faqs} includeProductSchema />
      <Navbar />
      <main>
        <Hero />
        <ScrollStory />
        <BottleOpening />
        <Ingredients />
        <ProductShowcase />
        <PurchasePath />
        <OliveJourney />
        <Statistics />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
