/**
 * The small, dependency-free part of the cart that ships in the entry bundle
 * (FORGE ORDER-R1, O-1/O-3). Pure functions only. Imports nothing.
 */
export type Sku = string; // `${productId}:${size}`, e.g. 'extra-virgin:500'

export interface CartLine {
  sku: Sku;
  qty: number;
}
export interface Cart {
  lines: CartLine[];
}
export interface ParsedCart {
  cart: Cart;
  /** How many stored lines were dropped because their SKU is unknown or has no price (O-9). */
  dropped: number;
}

/** Shared and frozen: a write to it (or to its lines) throws instead of leaking into every empty cart. */
export const EMPTY_CART: Cart = Object.freeze({ lines: Object.freeze([] as CartLine[]) as CartLine[] });

/** A parsed cart never holds more lines than this (applied after filtering and merging). */
const MAX_CART_LINES = 64;

export function makeSku(productId: string, size: string): Sku {
  return `${productId}:${size}`;
}

/**
 * Integer in 0..max. Anything that is not a finite number becomes 0.
 * A string counts only when it is plain digits (spaces around it allowed): '0x10', '1e1', '2.5' are 0.
 */
export function clampQty(n: unknown, max: number): number {
  const v = typeof n === 'number' ? n : typeof n === 'string' && /^\d+$/.test(n.trim()) ? Number(n.trim()) : NaN;
  if (!Number.isFinite(v)) return 0;
  const f = Math.floor(v);
  return f < 0 ? 0 : f > max ? max : f;
}

function ordered(lines: CartLine[], validSkus: readonly Sku[]): CartLine[] {
  return validSkus.flatMap((sku) => {
    const l = lines.find((x) => x.sku === sku);
    return l && l.qty > 0 ? [{ sku, qty: l.qty }] : [];
  });
}

/** Tolerant parse of stored JSON. Merges duplicate SKUs, drops bad lines, keeps catalogue order. */
export function parseCart(raw: string | null | undefined, validSkus: readonly Sku[], max: number): ParsedCart {
  if (!raw) return { cart: EMPTY_CART, dropped: 0 };
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { cart: EMPTY_CART, dropped: 0 };
  }
  const arr = data && typeof data === 'object' ? (data as { lines?: unknown }).lines : null;
  if (!Array.isArray(arr)) return { cart: EMPTY_CART, dropped: 0 };
  // Filter and merge every stored line first, cap after: junk in front never pushes a good line out.
  const merged = new Map<Sku, number>();
  const unknown = new Set<Sku>();
  for (const item of arr) {
    if (!item || typeof item !== 'object') continue;
    const { sku, qty } = item as { sku?: unknown; qty?: unknown };
    if (typeof sku !== 'string') continue;
    const q = typeof qty === 'number' && Number.isInteger(qty) ? clampQty(qty, max) : 0;
    if (q < 1) continue;
    if (!validSkus.includes(sku)) {
      unknown.add(sku);
      continue;
    }
    merged.set(sku, clampQty((merged.get(sku) ?? 0) + q, max));
  }
  const lines = ordered(
    [...merged].map(([sku, qty]) => ({ sku, qty })),
    validSkus
  ).slice(0, MAX_CART_LINES);
  // `dropped` = distinct products that went away, not stored lines.
  return { cart: lines.length ? { lines } : EMPTY_CART, dropped: unknown.size };
}

export type AddResult = 'added' | 'capped' | 'invalid';

/** Adds `qty` of a SKU. 'capped' = the line hit the per-line maximum. */
export function addLine(
  cart: Cart,
  sku: Sku,
  qty: number,
  validSkus: readonly Sku[],
  max: number
): { cart: Cart; result: AddResult } {
  const add = clampQty(qty, max);
  if (!validSkus.includes(sku) || add < 1) return { cart, result: 'invalid' };
  const current = cart.lines.find((l) => l.sku === sku)?.qty ?? 0;
  const next = clampQty(current + add, max);
  if (next === current) return { cart, result: 'capped' };
  const lines = ordered([...cart.lines.filter((l) => l.sku !== sku), { sku, qty: next }], validSkus);
  return { cart: { lines }, result: current + add > max ? 'capped' : 'added' };
}

/**
 * Sets a line's quantity; 0 removes the line. Returns the SAME `cart` object when nothing
 * changed (unknown SKU, 0 for a line that is not there, or the quantity it already has).
 * A changed cart never shares line objects with the one passed in.
 */
export function setLineQty(cart: Cart, sku: Sku, qty: number, validSkus: readonly Sku[], max: number): Cart {
  const q = clampQty(qty, max);
  const current = cart.lines.find((l) => l.sku === sku);
  const rest = cart.lines.filter((l) => l.sku !== sku).map((l) => ({ sku: l.sku, qty: l.qty }));
  if (q < 1) {
    if (!current) return cart;
    return rest.length ? { lines: rest } : EMPTY_CART;
  }
  if (!validSkus.includes(sku) || current?.qty === q) return cart;
  return { lines: ordered([...rest, { sku, qty: q }], validSkus) };
}

export function cartCount(cart: Cart): number {
  return cart.lines.reduce((n, l) => n + l.qty, 0);
}

export function serializeCart(cart: Cart): string {
  return JSON.stringify({ lines: cart.lines.map((l) => ({ sku: l.sku, qty: l.qty })) });
}
