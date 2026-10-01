import type { ComponentType } from 'react';

/** Built-in pages under /:lang — a CMS slug can never shadow them (RESERVED_SLUGS). */
const BUILT_IN = new Set(['products', 'shop', 'why-us', 'contact', 'blog']);
const CMS_PATH = /^\/(en|ms)\/([a-z0-9]+(?:-[a-z0-9]+)*|__cms-template)\/?$/;

/** True for `/<lang>/<slug>` paths that render a CMS page (incl. the prerender template). */
export function isCmsRoute(pathname: string): boolean {
  const m = CMS_PATH.exec(pathname);
  return !!m && !BUILT_IN.has(m[2]);
}

let loaded: ComponentType | null = null;

/** The CMS page component, fetched from its own chunk (the block renderer stays out of the entry). */
export async function loadCmsPage(): Promise<ComponentType> {
  loaded ??= (await import('../cms/CmsPage')).CmsPage as ComponentType;
  return loaded;
}

/** The component once loaded, else null — lets the route render it without a Suspense frame. */
export function loadedCmsPage(): ComponentType | null {
  return loaded;
}

/**
 * Called by main.tsx before the first render on a CMS URL. With the module already
 * here, the route renders the page synchronously — a lazy() boundary would commit an
 * empty fallback first and wipe the server's HTML for a frame.
 */
export async function preloadCmsPage(): Promise<void> {
  await loadCmsPage();
}
