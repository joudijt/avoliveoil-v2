/**
 * The ONLY ordering state the entry bundle holds (FORGE BUY-NOW; was the ORDER-R1 cart mirror).
 * Which product the Buy-now sheet shows, whether it is open, and the loader of the sheet chunk.
 * The sheet itself (BuyNowSheet.tsx: form, pay server calls, strings) is a lazy chunk: it is
 * fetched on the first pointerenter / touchstart / focus of any Buy-now button (preloadBuyNow)
 * and at the latest on the tap. Nothing here reads storage while rendering.
 */
import { useSyncExternalStore } from 'react';
import { isCmsStatic } from '../cms/boot';
import { isPrerender } from '../lib/prerender';

/** False in prerender, on /cms-canvas, in CMS edit mode and without `window` (O-13). */
export function orderEnabled(): boolean {
  return (
    typeof window !== 'undefined' && !isPrerender() && !isCmsStatic() && window.location.pathname !== '/cms-canvas'
  );
}

export interface BuyNowTarget {
  productId: string;
  /** Preselected size ('250' | '500'); undefined = the product's default. */
  size?: string;
  /** Preselected quantity (the paid page's "Try again"); default 1. */
  qty?: number;
  /** Bumped on every open: the sheet starts fresh (new config fetch) each time. */
  openId: number;
}

let target: BuyNowTarget | null = null;
/** The sheet chunk could not be loaded: BuyNowRoot shows the notice. */
let loadFailed = false;
let openSeq = 0;
const listeners = new Set<() => void>();
const emit = (): void => listeners.forEach((l) => l());

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The open sheet's target, or null. Always null on the server and on first render. */
export function useBuyNow(): BuyNowTarget | null {
  return useSyncExternalStore(
    subscribe,
    () => target,
    () => null
  );
}

/** True while the sheet is open (the WhatsApp bubble hides). */
export function useBuyNowOpen(): boolean {
  return useBuyNow() !== null;
}

export function useLoadFailed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => loadFailed,
    () => false
  );
}

export function setLoadFailed(failed: boolean): void {
  if (loadFailed === failed) return;
  loadFailed = failed;
  emit();
}

type SheetModule = typeof import('./BuyNowSheet');
let sheet: Promise<SheetModule> | null = null;

/** Fetches the sheet chunk once. A failed load is forgotten, so the next call tries again. */
export function loadSheet(): Promise<SheetModule> {
  if (sheet) return sheet;
  const p = import('./BuyNowSheet');
  sheet = p;
  p.catch(() => {
    if (sheet === p) sheet = null;
  });
  return p;
}

/** pointerenter / touchstart / focus of a Buy-now button: start the chunk download (M7). */
export function preloadBuyNow(): void {
  if (orderEnabled()) loadSheet().catch(() => {});
}

/** Opens the Buy-now sheet for one product (and optional size / quantity). */
export function openBuyNow(productId: string, size?: string, qty?: number): void {
  if (!orderEnabled()) return;
  setLoadFailed(false);
  openSeq += 1;
  target = { productId, size, qty, openId: openSeq };
  emit();
}

export function closeBuyNow(): void {
  if (!target) return;
  target = null;
  emit();
}

/**
 * BUY-NOW B5: the cart is gone. Its key, the ORDER-R1 order snapshot (name, phone and address in
 * plain text) and the v1 details (old address shape, not migrated) are deleted once per page load.
 * Inlined key names: the entry bundle must not import config.ts.
 */
export function deleteOldOrderKeys(): void {
  for (const k of ['avo.cart.v1', 'avo.order.v1', 'avo.details.v1']) {
    try {
      window.localStorage.removeItem(k);
    } catch {
      /* storage blocked: nothing stored either */
    }
  }
  try {
    window.sessionStorage.removeItem('avo.cartOpened');
  } catch {
    /* ignored */
  }
}
