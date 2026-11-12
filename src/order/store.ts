/**
 * Cart store (FORGE ORDER-R1). NOT in the first-render bundle: the entry imports only
 * ./bridge, which loads this module with a dynamic import right after first render and
 * mirrors count + ui. The lazy dialog chunk imports this file directly.
 * It must never import core.ts, the string files or any dialog code.
 *
 * Rules: O-11 (storage + pageshow), O-12 (getServerSnapshot + stable snapshots),
 * O-13 (orderEnabled), O-14 (count is 0 on the server and during hydration).
 */
import { useSyncExternalStore } from 'react';
import { orderEnabled } from './bridge';
import {
  EMPTY_CART,
  addLine,
  cartCount,
  parseCart,
  serializeCart,
  setLineQty,
  type AddResult,
  type Cart,
  type Sku,
} from './cartLite';
import { VALID_SKUS } from './catalog';
import { ORDER_CONFIG } from './config';

export interface OrderUi {
  cartOpen: boolean;
  checkoutOpen: boolean;
  /** A saved order snapshot exists (step 2 or 3): show the header dot and the drawer banner (O-7). */
  hasOrder: boolean;
}

/** Why the checkout was opened: a fresh checkout of the cart, or the saved order from the banner. */
export type CheckoutIntent = 'new' | 'resume';

const CLOSED: OrderUi = { cartOpen: false, checkoutOpen: false, hasOrder: false };
const { keys, maxQty } = ORDER_CONFIG;

export { orderEnabled };

/* ---------- storage (falls back to memory when it throws) ---------- */

// A key is in `mem` only while its LAST write to storage failed, so memory is the newer
// value and wins. `gone` = a removal that failed: the key counts as deleted on this page.
const mem = new Map<string, string>();
const gone = new Set<string>();

export const orderStorage = {
  get(key: string): string | null {
    if (mem.has(key)) return mem.get(key) as string;
    if (gone.has(key)) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    gone.delete(key);
    try {
      window.localStorage.setItem(key, value);
      mem.delete(key);
    } catch {
      mem.set(key, value);
    }
  },
  del(key: string): void {
    mem.delete(key);
    try {
      window.localStorage.removeItem(key);
      gone.delete(key);
    } catch {
      gone.add(key);
    }
  },
};

/* ---------- state ---------- */

let cart: Cart = EMPTY_CART;
let ui: OrderUi = CLOSED;
let dropped = 0;
let intent: CheckoutIntent = 'new';
let ready = false;
/** Bumped whenever the saved order may have changed (the drawer banner re-reads on it). */
let orderRev = 0;
let orderRaw: string | null = null;
const listeners = new Set<() => void>();

const emit = (): void => listeners.forEach((l) => l());

/**
 * Storage WRITES that are decided while React may be rendering (getSnapshot calls init())
 * run after the render, and only when the key still holds the value that was judged.
 */
function later(key: string, judged: string | null, write: () => void): void {
  queueMicrotask(() => {
    if (orderStorage.get(key) === judged) write();
  });
}

/**
 * Cheap look at the saved order (the real validation is parseOrder in the lazy chunk):
 * true for a sent order (step 3) and for an unpaid transfer order (step 2), inside its lifetime.
 * An expired or malformed snapshot is deleted: it holds a name, a phone number and an address.
 * A live snapshot that is not a banner state (step 1, chat-mode step 2) is kept until it expires.
 */
function readHasOrder(): boolean {
  const raw = orderStorage.get(keys.order);
  if (raw !== orderRaw) {
    orderRaw = raw;
    orderRev += 1;
  }
  if (raw === null) return false;
  let o: { step?: unknown; payMode?: unknown; createdAt?: unknown } = {};
  try {
    const data: unknown = JSON.parse(raw);
    if (data && typeof data === 'object') o = data;
  } catch {
    /* malformed: no createdAt, deleted below */
  }
  if (typeof o.createdAt !== 'number' || Date.now() - o.createdAt >= ORDER_CONFIG.orderTtlMs) {
    later(keys.order, raw, () => {
      orderStorage.del(keys.order);
      orderActions.refreshOrder();
    });
    return false;
  }
  return o.step === 3 || (o.step === 2 && o.payMode !== 'chat');
}

function setUi(patch: Partial<OrderUi>): boolean {
  const next = { ...ui, ...patch };
  if (next.cartOpen === ui.cartOpen && next.checkoutOpen === ui.checkoutOpen && next.hasOrder === ui.hasOrder) {
    return false;
  }
  ui = next;
  return true;
}

/** Re-reads the cart and the order flag from storage. Returns true when something changed. */
function readStorage(): boolean {
  const rawCart = orderStorage.get(keys.cart);
  const parsed = parseCart(rawCart, VALID_SKUS, maxQty);
  const rev = orderRev;
  let changed = false;
  if (serializeCart(parsed.cart) !== serializeCart(cart)) {
    cart = parsed.cart;
    changed = true;
  }
  if (parsed.dropped > 0) {
    dropped += parsed.dropped;
    const cleaned = serializeCart(parsed.cart);
    later(keys.cart, rawCart, () => orderStorage.set(keys.cart, cleaned)); // the dead lines are reported once
    changed = true;
  }
  return setUi({ hasOrder: readHasOrder() }) || changed || orderRev !== rev;
}

function init(): void {
  if (ready || !orderEnabled()) return;
  ready = true;
  readStorage();
  // Another tab changed the cart or the order.
  window.addEventListener('storage', (e) => {
    if ((e.key === null || e.key === keys.cart || e.key === keys.order) && readStorage()) emit();
  });
  // Back from WhatsApp or a payment app: the page may come out of the back/forward cache.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted && readStorage()) emit();
  });
}

/** Plain subscription, also used by ./bridge to mirror count + ui into the entry bundle. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getCart = (): Cart => (init(), cart);
export const getCount = (): number => (init(), cartCount(cart));
export const getUi = (): OrderUi => (init(), ui);
const serverCart = (): Cart => EMPTY_CART;
const serverCount = (): number => 0;
const serverUi = (): OrderUi => CLOSED;
const getOrderRev = (): number => (init(), orderRev);
const serverOrderRev = (): number => 0;

/** Current cart; EMPTY_CART on the server and on first render. */
export function useCart(): Cart {
  return useSyncExternalStore(subscribe, getCart, serverCart);
}

/** Total quantity in the cart; 0 on the server and until mounted (O-14). */
export function useCartCount(): number {
  return useSyncExternalStore(subscribe, getCount, serverCount);
}

export function useOrderUi(): OrderUi {
  return useSyncExternalStore(subscribe, getUi, serverUi);
}

/** Changes whenever the saved order was written, deleted or replaced by another tab. */
export function useOrderRev(): number {
  return useSyncExternalStore(subscribe, getOrderRev, serverOrderRev);
}

function commit(next: Cart): void {
  if (next === cart) return;
  cart = next;
  orderStorage.set(keys.cart, serializeCart(cart));
  emit();
}

/** The cart right now, outside React (the checkout reads it when the details are submitted). */
export function currentCart(): Cart {
  return getCart();
}

/** How many stored lines were dropped on parse and not yet reported (O-9). */
export function droppedCount(): number {
  return dropped;
}
export function clearDropped(): void {
  dropped = 0;
}

export function checkoutIntent(): CheckoutIntent {
  return intent;
}

function showCheckout(why: CheckoutIntent): void {
  if (!orderEnabled()) return;
  init();
  intent = why;
  if (setUi({ cartOpen: false, checkoutOpen: true })) emit();
}

export const orderActions = {
  /** Adds to the cart and persists. No-op returning 'invalid' when !orderEnabled(). */
  add(sku: Sku, qty = 1): AddResult {
    if (!orderEnabled()) return 'invalid';
    init();
    const r = addLine(cart, sku, qty, VALID_SKUS, maxQty);
    commit(r.cart);
    return r.result;
  },
  setQty(sku: Sku, qty: number): void {
    if (!orderEnabled()) return;
    init();
    commit(setLineQty(cart, sku, qty, VALID_SKUS, maxQty));
  },
  remove(sku: Sku): void {
    orderActions.setQty(sku, 0);
  },
  clear(): void {
    if (!orderEnabled()) return;
    init();
    commit(EMPTY_CART);
  },
  openCart(): void {
    if (!orderEnabled()) return;
    init();
    // An order is on screen: the cart stays shut, the count badge still updates.
    if (!ui.checkoutOpen && setUi({ cartOpen: true })) emit();
  },
  closeCart(): void {
    if (setUi({ cartOpen: false })) emit();
  },
  /** Checkout of the current cart, starting at the details step. */
  openCheckout(): void {
    showCheckout('new');
  },
  /** Reopens the saved order (drawer banner, O-7) at its own step. */
  resumeOrder(): void {
    showCheckout('resume');
  },
  closeCheckout(): void {
    if (setUi({ checkoutOpen: false })) emit();
  },
  /** Call after the order snapshot was written or deleted. */
  refreshOrder(): void {
    if (!ready) return;
    const rev = orderRev;
    if (setUi({ hasOrder: readHasOrder() }) || orderRev !== rev) emit();
  },
};
