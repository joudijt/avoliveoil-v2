import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LangLayout } from './routes/LangLayout';
import { ScrollToTop } from './routes/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { InfusedProductPage } from './pages/InfusedProductPage';
import { ShopPage } from './pages/ShopPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { CanvasRoute, CmsRoute } from './routes/cmsRoutes';
import { useLandingChrome } from './cms/landingChrome';
import { OrderRoot } from './order/OrderRoot';

// The HitPay return page: its own lazy chunk, nothing of it in the first-render bundle (R13).
const PaidPage = lazy(() => import('./order/PaidPage'));

function App() {
  // The builder canvas is a bare surface inside the admin's iframe: no site chrome.
  const onCanvas = useLocation().pathname === '/cms-canvas';
  // A landing page brings its own WhatsApp header button and phone bar (LP-SPEC §2).
  const onLanding = useLandingChrome();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/cms-canvas" element={<CanvasRoute />} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<InfusedProductPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<ArticlePage />} />
          <Route path="order/paid" element={<Suspense fallback={null}><PaidPage /></Suspense>} />
          {/* Pages built in the control panel. Static segments above always win, so a
              CMS slug can never shadow a built-in page (and RESERVED_SLUGS forbids it). */}
          <Route path=":slug" element={<CmsRoute />} />
        </Route>
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
      {!onCanvas && !onLanding && <WhatsAppButton />}
      {/* Cart drawer + checkout. Also on landing pages (their chrome has a cart button), never on the canvas. */}
      {!onCanvas && <OrderRoot />}
    </>
  );
}

export default App;
