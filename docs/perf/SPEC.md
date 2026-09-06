# FORGE — make avoliveoil.com fast

Round `PERF-1`, 2026-09-06. Baseline `c88a180` (main, clean, deployed).

## The complaint, and the measurement behind it

> "why the website tooo slow to load specially the images, it should be very fast it's just a
> static website!"

Measured live on Fast 4G with `scripts/perf-probe.mjs` (headless Chrome, CDP throttling):

| route | transferred | page revealed | first paint |
|---|---|---|---|
| `/en` desktop 1440 | 2.2 MB | **11.0 s** | 1.3 s |
| `/en` phone 390 | **5.0 MB** | **16.0 s** | 1.4 s |
| `/en/why-us` phone | 2.0 MB | 8.1 s | 1.4 s |

TTFB is 692 ms, so the host is not the problem. Four causes, each verified in the code:

1. **The source images were never optimised.** `OliveGroveSunsetHero.png` 2.77 MB,
   `bottle-cutout.png` 943 KB, `AVOliveOilInTheField.png` 1.31 MB, `HeroAVOliveOilBottleInTheField.png`
   5.80 MB, and four article images are 1.8–2.3 MB PNGs. `grep -rn "srcSet\|sizes=" src` returns
   **0** — a 390 px phone downloads the full desktop pixels.
2. **A ~5.2 s splash gates the homepage on every visit.** `Loading.tsx` runs a gsap timeline
   (1 + 1.8 + 1.9 + 0.5 + 0.9 fade) with no session memory, and renders the 943 KB
   `bottle-cutout.png` **twice** before anything else can paint.
3. **The prerendered HTML is discarded.** `main.tsx` uses `createRoot`, not `hydrateRoot`, so the
   crawler-ready markup already on the server is thrown away and re-rendered after the JS parses.
4. **One 1.9 MB JS chunk carrying all three languages' articles.** `src/content/articles/index.ts`
   statically imports `en.ts` (533 KB), `ms.ts` (624 KB) and `ar.ts` (722 KB) and then runs a slug
   validation loop over all of them at module load. Bundle probe: 2,514 hits for `zaitun`, 1,310
   for `olive oil`, and **0** for `THREE.`/`framer` — `three`, `@react-three/fiber`,
   `@react-three/drei` and `framer-motion` are dependencies with zero imports.

## Owner's decisions (answered `1b, 2a, 3a, 4a, 5a`)

1. **b — delete the splash entirely.** Not shortened, not once-per-session: removed.
2. **a — re-encode every large image**, all pages, originals kept in the repo.
3. **a — hydrate the prerendered HTML**, with a full RTL/i18n verification pass.
4. **a — self-host the fonts.**
5. **a — code-split** so a page carries only its own language's articles.

## Contracts (written before any builder starts)

### `src/components/ui/Picture.tsx`
```tsx
export interface PictureProps {
  /** Base name as it appears in src/assets/images, without extension. */
  name: string;
  alt: string;
  className?: string;
  /** The `sizes` attribute. Default '100vw'. */
  sizes?: string;
  /** Above the fold: eager + fetchpriority=high, and never lazy. */
  priority?: boolean;
  style?: CSSProperties;
  aria-hidden?: boolean;
}
export function Picture(props: PictureProps): JSX.Element;
```
Renders one `<img>` with `srcset` across the generated widths, intrinsic `width`/`height` (so no
layout shift), `decoding="async"`, and `loading="lazy"` unless `priority`. Widths that would
upscale the source are not generated and never appear in the srcset.

### `src/content/articles/registry.ts`
```ts
export function ensureArticles(lang: string): Promise<Article[]>;  // dynamic import, cached
export function peekArticles(lang: string): Article[] | undefined; // sync, undefined until loaded
```
`index.ts` keeps its current exported API (`getArticles`, `findArticle`, `slugFor`,
`articlePathByLang`, `isArticleLang`, types) so no caller outside the blog pages changes; the
static imports of `en/ms/ar` are what goes away. The slug-vs-`slugs.json` consistency check moves
to a build-time script (`scripts/check-article-slugs.mjs`, wired as `check:slugs`) because it
cannot run at module load once the languages are lazy.

### Hydration order — the rule that makes 3a and 5a compatible
`hydrateRoot` requires the first client render to match the server HTML. An article page whose
content arrives asynchronously **cannot** match. So `main.tsx`:

1. reads `lang` and the route from `location.pathname`,
2. if the route is `/{lang}/blog…`, `await ensureArticles(lang)` **before** hydrating,
3. then `hydrateRoot` when `#root` already has children, else `createRoot`.

A later client-side navigation to the blog is a normal SPA transition and may load the chunk
asynchronously with a fallback — hydration is not involved.

## Work split (disjoint file ownership, Edit-only, no builder builds/commits/deploys)

- **A — images.** `scripts/optimize-images.py`, `src/components/ui/Picture.tsx`, and the swaps in
  `Hero.tsx`, `BottleOpening.tsx`, `ScrollStory.tsx`, `OliveJourney.tsx`, `ProductShowcase.tsx`,
  `Ingredients.tsx`, `WhyUsPage.tsx`, `ProductsPage.tsx`, `InfusedProductPage.tsx`.
- **B — bundle + hydration.** `src/content/articles/{index,registry}.ts`, `src/main.tsx`,
  `src/pages/{ArticlePage,BlogPage}.tsx`, `src/components/blog/ArticleBody.tsx`,
  `scripts/check-article-slugs.mjs`, `vite.config.ts` chunking.
- **C — fonts, splash, dependencies.** `src/index.css`, `public/fonts/*`, `src/pages/HomePage.tsx`
  (splash removal), delete `src/components/sections/Loading.tsx`, `package.json` dependency
  removal, `index.html` font preloads.

Integrator (me): contracts, build, gates, prerender, browser walk, deploy, verify, commit, push.

## Gates

`check:ai` + `check:llms` + `check:slugs` **before** the build (they compare against generators the
build itself re-runs), then `npm run build:prerender`, `check:brand`, `check:heads`, the puppeteer
walk, deploy, `verify-brand.py`, `perf-probe.mjs` re-measured on the live site, `ai:gate`.

**Success is measured, not asserted:** the phone homepage must drop from 5.0 MB / 16.0 s to under
1 MB and under 3 s, and every page must still render identically in EN, AR and MS.
