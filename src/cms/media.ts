import type { MediaRef, MediaVariant } from './contracts';

/** `url w, url w` from ascending variants (duplicates and bad entries dropped). */
export function srcSetOf(variants: MediaVariant[]): string {
  const seen = new Set<number>();
  return variants
    .filter((v) => v && typeof v.url === 'string' && v.w > 0 && !seen.has(v.w) && seen.add(v.w))
    .sort((a, b) => a.w - b.w)
    .map((v) => `${v.url} ${v.w}w`)
    .join(', ');
}

/** The widest variant — the `src` fallback for browsers that ignore srcset. */
export function widestUrl(variants: MediaVariant[]): string {
  let best: MediaVariant | null = null;
  for (const v of variants) if (!best || v.w > best.w) best = v;
  return best?.url ?? '';
}

/** Smallest variant at least `min` px wide (thumbnails, lightbox preloads). */
export function variantAtLeast(variants: MediaVariant[], min: number): string {
  const sorted = [...variants].sort((a, b) => a.w - b.w);
  return (sorted.find((v) => v.w >= min) ?? sorted[sorted.length - 1])?.url ?? '';
}

export function mediaFor(media: Record<string, MediaRef>, id: number | undefined): MediaRef | null {
  if (id === undefined || id === null) return null;
  const m = media[String(id)];
  return m && Array.isArray(m.variants) && m.variants.length > 0 ? m : null;
}

/**
 * `sizes` for an image in a column of `span` twelfths. The boxed content column
 * caps at max-w-6xl (1152px); below lg every column is full width minus the
 * section padding (px-6 / md:px-16).
 */
export function sizesForSpan(span: number, full = false): string {
  const s = Math.min(12, Math.max(1, Math.round(span)));
  const desktop = full ? `${Math.round((s / 12) * 100)}vw` : `${Math.round((1152 * s) / 12)}px`;
  return `(min-width: 1024px) ${desktop}, (min-width: 768px) calc(100vw - 8rem), calc(100vw - 3rem)`;
}
