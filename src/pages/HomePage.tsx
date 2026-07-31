import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Loading } from '../components/sections/Loading';
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

export function HomePage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  useLenis(!loading);
  const faqs = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  // Marks the DOM as fully rendered (past the loading screen) so the
  // build-time prerender script knows when to snapshot — see
  // scripts/prerender.mjs. Client-side React uses createRoot (not
  // hydrateRoot), so it fully replaces this prerendered HTML on load
  // rather than hydrating it — real visitors always get the live Loading
  // animation fresh; the prerendered snapshot is purely for crawlers that
  // don't execute JS.
  useEffect(() => {
    if (!loading) {
      document.body.setAttribute('data-app-ready', 'true');
    }
  }, [loading]);

  return (
    <>
      <SEO page="home" faqs={faqs} includeProductSchema />
      {loading && <Loading onDone={() => setLoading(false)} />}
      {!loading && <Navbar />}
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
