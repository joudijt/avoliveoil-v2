import { lazy, Suspense } from 'react';
import { loadCmsPage, loadedCmsPage } from './cmsLoader';

/**
 * Route elements for the CMS (spec §5, §13.3), kept out of the entry chunk: the
 * block renderer only downloads on a CMS page, and the builder canvas only inside
 * the admin's iframe.
 */

const LazyCmsPage = lazy(() => loadCmsPage().then((Page) => ({ default: Page })));

/** `/:lang/:slug` — a page built in the control panel (client-side navigation lands here too). */
export function CmsRoute() {
  const Loaded = loadedCmsPage();
  if (Loaded) return <Loaded />;
  return (
    <Suspense fallback={null}>
      <LazyCmsPage />
    </Suspense>
  );
}

const LazyCanvasPage = lazy(() => import('../cms/canvas/CanvasPage'));

/** `/cms-canvas` — the page-builder canvas, only ever loaded inside the admin's iframe. */
export function CanvasRoute() {
  return (
    <Suspense fallback={null}>
      <LazyCanvasPage />
    </Suspense>
  );
}
