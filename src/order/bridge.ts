/**
 * The ONLY order state module the entry bundle imports statically (FORGE ORDER-R1, O-1).
 * The real store (store.ts + cartLite.ts + config.ts) loads right after first render through
 * `loadStore()`; until then, and on the server, this mirror says: count 0, everything closed,
 * no saved order (O-12, O-14). Types from the store are imported as types only.
 */
import { useSyncExternalStore } from 'react';
import { isCmsStatic } from '../cms/boot';
import { isPrerender } from '../lib/prerender';
import type { AddResult, Sku } from './cartLite';
import type { OrderUi } from './store';

type Store = typeof import('./store');

/** False in prerender, on /cms-canvas, in CMS edit mode and without `window` (O-13). */
export function orderEnabled(): boolean {
  return (
    typeof window !== 'undefined' && !isPrerender() && !isCmsStatic() && window.location.pathname !== '/cms-canvas'
  );
}

const CLOSED: OrderUi = { cartOpen: false, checkoutOpen: false, hasOrder: false };
let count = 0;
let ui: OrderUi = CLOSED;
/** The store or the dialog chunk could not be loaded: OrderRoot shows the notice. */
let loadFailed = false;
const listeners = new Set<() => void>();
const emit = (): void => listeners.forEach((l) => l());

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Total quantity in the cart; 0 on the server and until the store has loaded (O-14). */
export function useCartCount(): number {
  return useSyncExternalStore(
    subscribe,
    () => count,
    () => 0
  );
}

export function useOrderUi(): OrderUi {
  return useSyncExternalStore(
    subscribe,
    () => ui,
    () => CLOSED
  );
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

let pending: Promise<Store> | null = null;

/**
 * Loads the real store once and mirrors its count and ui here. A failed load is forgotten,
 * so a later call tries again; the promise of the failed call still rejects.
 */
export function loadStore(): Promise<Store> {
  if (pending) return pending;
  const p = import('./store').then((m) => {
    const sync = (): void => {
      const nextCount = m.getCount();
      const nextUi = m.getUi();
      if (nextCount === count && nextUi === ui) return;
      count = nextCount;
      ui = nextUi;
      emit();
    };
    m.subscribe(sync);
    sync();
    return m;
  });
  pending = p;
  p.catch(() => {
    if (pending === p) pending = null;
  });
  return p;
}

/** Opens the cart drawer. A store that cannot be loaded shows the load-error notice. */
export function openCart(): void {
  if (!orderEnabled()) return;
  loadStore().then(
    (m) => m.orderActions.openCart(),
    () => setLoadFailed(true)
  );
}

/** Adds to the cart. 'invalid' when ordering is off or the store could not be loaded (notice shown). */
export function addToCart(sku: Sku, qty = 1): Promise<AddResult> {
  if (!orderEnabled()) return Promise.resolve('invalid');
  return loadStore().then(
    (m) => m.orderActions.add(sku, qty),
    (): AddResult => {
      setLoadFailed(true);
      return 'invalid';
    }
  );
}
