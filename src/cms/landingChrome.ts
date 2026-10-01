import { useSyncExternalStore } from 'react';

/**
 * "A landing page is on screen" — set by the CMS page (src/cms/CmsPage.tsx) while a
 * page with `layout: 'landing'` (or the landing template) is mounted, read by App to
 * hide the global floating WhatsApp button: the landing page brings its own header
 * button and phone bar, and two WhatsApp buttons on a phone is one too many
 * (LP-SPEC §2, §8 B2). A module store rather than a context so App, which sits above
 * the router outlet, sees it, and client-side navigation away clears it on unmount.
 * Kept tiny on purpose: App imports it, so it lives in the entry chunk.
 */
let landing = false;
const listeners = new Set<() => void>();

export function setLandingChrome(on: boolean): void {
  if (landing === on) return;
  landing = on;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useLandingChrome(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => landing,
    () => false
  );
}
