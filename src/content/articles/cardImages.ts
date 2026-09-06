/**
 * Card-sized copies of the article images, for the blog index grid.
 *
 * The grid renders each hero at `h-52 w-full` inside a 3-column `max-w-6xl`
 * layout — never wider than ~390 CSS px — but it was loading the full 1024-wide
 * press crop, 84 KB a card. `scripts/optimize-images.py` writes 400 and 600 px
 * copies into src/assets/opt/cards/; this resolves an already-hashed article
 * image URL to them.
 *
 * Why match on the URL rather than the image key: `images.ts` maps 200+ keys to
 * imported URLs, and duplicating that list by hand is exactly the kind of second
 * copy that goes stale. Vite's emitted filename is `<name>-<hash>.webp`, so the
 * source name is recoverable, and anything that fails to match falls back to the
 * original URL — a card that misses this optimisation still renders.
 */
const CARD_URLS = import.meta.glob('../../assets/opt/cards/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** `hifz-zayt-alzaytun-hero` -> { 400: url, 600: url } */
const BY_NAME = new Map<string, Map<number, string>>();

for (const [path, url] of Object.entries(CARD_URLS)) {
  const file = path.split('/').pop();
  if (!file) continue;
  const match = /^(.+)-(\d+)\.webp$/.exec(file);
  if (!match) continue;
  const [, name, width] = match;
  const widths = BY_NAME.get(name) ?? new Map<number, string>();
  widths.set(Number(width), url);
  BY_NAME.set(name, widths);
}

/** Strips Vite's content hash: `foo-hero-Ab12Cd34.webp` -> `foo-hero`. */
function sourceName(url: string): string {
  const file = url.split('/').pop() ?? '';
  return file.replace(/\.webp$/, '').replace(/-[A-Za-z0-9_-]{6,10}$/, '');
}

export interface CardSources {
  /** Smallest card width — the `src` fallback. */
  src: string;
  /** srcset across the generated card widths, or undefined if none exist. */
  srcSet?: string;
}

/**
 * Card sources for an article image URL. Falls back to the original when the
 * image has no card copies (the non-press images, which are already small).
 */
export function cardSources(originalUrl: string): CardSources {
  const widths = BY_NAME.get(sourceName(originalUrl));
  if (!widths || widths.size === 0) return { src: originalUrl };

  const sorted = [...widths.entries()].sort((a, b) => a[0] - b[0]);
  return {
    src: sorted[0][1],
    srcSet: sorted.map(([w, url]) => `${url} ${w}w`).join(', '),
  };
}
