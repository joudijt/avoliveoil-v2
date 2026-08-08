# Design — BottleOpening length, OliveJourney carousel, nav scroll reset

Date: 2026-08-08
Project: D:\avoliveoil-v2 (avoliveoil.com)

Three independent fixes reported by the user in one pass. They touch disjoint
files and can be implemented and verified in any order.

---

## 1. BottleOpening section is too long to scroll past

### Problem

`src/components/sections/BottleOpening.tsx:72` declares the section as
`h-[300vh]` with its inner screen pinned by a scrubbed ScrollTrigger
(`start: 'top top'`, `end: 'bottom bottom'`). Pin scroll distance is
`sectionHeight - viewportHeight`, so the reader scrolls **two full viewport
heights** to get past one kicker, one heading and one paragraph
(`bottleOpening.kicker` / `.title` / `.body`).

### Fix

Change the section height to `h-[170vh]`. Scroll distance drops from 200vh to
70vh — a 65% cut.

Every tween in the timeline is positioned by scrub *fraction*
(`0.05`, `0.28`, `0.42`, the `DROPS` delays, `0.45`, `0.5`), not by absolute
duration, so the whole choreography compresses proportionally. No retiming, no
markup change, no change to the pin itself.

### Rejected alternative

Removing the pin and letting the section flow at natural height. It would fix
the scrolling but delete the pour animation, which is the section's only
reason to exist.

---

## 2. OliveJourney carousel is slow and unresponsive

### Problem

Two independent causes, both in `src/components/sections/OliveJourney.tsx`.

**Payload.** Seven of the eight slides are uncompressed PNGs between 1.8 MB and
2.7 MB (`journey-01-tree.png` … `journey-08-final.png`; only
`journey-06-testing.webp` was ever optimised). Roughly 15 MB of images behind
one carousel.

**Rendering.** A single `<img ref={imgRef} src={PHOTOS[scene.key]}>` has its
`src` swapped when `index` changes. The browser therefore starts a cold fetch
and decode on every arrow click, while a GSAP
`fromTo(imgRef, {opacity: 0, scale: 1.03}, {…, duration: 0.6})` fades in a
frame that is still empty. The click appears to do nothing, then the image pops
in late.

### Fix — assets

The user supplied six replacement photographs (WhatsApp exports, 600×600 JPEG,
45–180 KB).

Three of them carry another brand's watermark — "NOOR FÈS" (نور فاس) rendered
in white in the top-right corner — on the harvest-crew shot, the man-picking
shot and the sunset aerial. Shipping a competitor's logo on avoliveoil.com is
not acceptable, and the user chose inpainting over cropping.

1. Inpaint the watermark out with OpenCV (`cv2.inpaint`, `INPAINT_TELEA`), with
   a hand-drawn mask covering the glyph box. The sunset aerial's sky is smooth
   and should come out clean; the crew shot places the mark over tree canopy
   and is the risky one. **Each result is inspected before it is wired in** — if
   inpainting leaves a visible smear on any photo, fall back to a bottom-biased
   crop for that photo and say so.
2. Convert all six to WebP q88 at native 600×600. Expected 40–60 KB each,
   ~300 KB for the full set versus ~15 MB today.
3. Name them `journey-01-grove.webp` … `journey-06-press.webp` and place them in
   `src/assets/images/`.

The carousel frame is `aspect-[4/3] object-cover`, so a square source is
cropped by roughly 12% at top and bottom. Bias each crop so the subject
survives.

### Fix — rendering

Render all six slides as absolutely-positioned stacked `<img>` elements inside
the existing frame, and crossfade with a CSS `opacity` transition driven by
`index`. Every image is fetched and decoded once at mount, which is affordable
at ~300 KB total, so an arrow click triggers no network request and no decode —
it is a pure compositor-level fade.

Remove the GSAP tween on the image. Keep the caption tween; it is cheap and
does not gate on a network fetch.

The prev/next handlers, the dot navigation, the `rtl:rotate-180` chevrons and
the `NN / NN` counter are unchanged apart from the shorter slide array.

### Fix — content

The carousel drops from eight slides to six, because the supplied photographs
cover only groves, harvesting and one washing/conveyor shot — there is no
photograph for filtering, testing, bottling or the finished bottle. Inventing
slides for those beats with unrelated stock imagery is worse than not having
them.

Captions stay Palestinian-origin as they are today; the user confirmed the copy
does not need to change.

| # | key | Photo | Title | Caption source |
|---|-----|-------|-------|----------------|
| 1 | `grove` | daylight aerial grove | The Olive Tree | existing `tree` caption, verbatim |
| 2 | `sunset` | sunset aerial grove | Olives Growing | existing `growing` caption, verbatim |
| 3 | `picking` | man picking from tree | Hand-Harvested Olives | existing `harvest` caption, verbatim |
| 4 | `crates` | crates of olives, top-down | The Day's Harvest | **new**, EN + AR + MS |
| 5 | `carrying` | crew carrying crates | Carried to the Press | **new**, EN + AR + MS |
| 6 | `press` | olives on conveyor | First Cold Press | existing `extraction` caption, verbatim |

Retired scene keys: `tree`, `growing`, `harvest`, `extraction`, `filtering`,
`testing`, `bottling`, `final` are replaced by the six above. The
`filtering` / `testing` / `bottling` / `final` captions are deleted from all
three locale files.

`journey-06-testing.webp` — the songkok tasting photograph the user supplied on
2026-07-30 — becomes unused. It is **kept on disk and left in git**, not
deleted, so it can be restored as a seventh slide on request. The seven orphaned
PNGs are deleted.

### Locale editing constraint

`src/i18n/locales/{en,ar,ms}/common.json` are hand-formatted. Editing them by
`JSON.parse` → mutate → `JSON.stringify` reformats the entire file and produces
a several-hundred-line diff. Use targeted string replacements only.

---

## 3. Top-nav navigation lands mid-page

### Problem

Nothing in the app resets scroll position on a route change. `App.tsx` has no
`ScrollRestoration`, `LangLayout.tsx` has no scroll effect, and no page
component scrolls to top on mount. React Router keeps `window.scrollY` across
client-side navigations, so clicking a nav link while scrolled halfway down the
homepage renders the new page already scrolled halfway down.

A second factor makes a naive fix insufficient: `HomePage` mounts Lenis
(`useLenis(!loading)`), the other pages do not. Lenis keeps its own internal
scroll value and animates the real scroll position toward it, so a bare
`window.scrollTo(0, 0)` is overwritten on Lenis's next frame whenever Lenis is
mounted.

### Fix

Add a `ScrollToTop` component rendered in `App.tsx` above `<Routes>`. On every
`useLocation().pathname` change it performs both resets:

- `window.scrollTo(0, 0)` — covers the pages with native scrolling.
- `scrollToTopImmediate()` — a new export from `src/hooks/useLenis.ts` calling
  `activeLenis?.scrollTo(0, { immediate: true })`. That file already owns the
  `activeLenis` singleton, so no new state is introduced.

Two guards:

- Skip the reset when `location.hash` is non-empty, so in-page anchors
  (`#shop`, `#journey`, used by Hero's two CTAs via `scrollToHash`) still work.
- Skip when `useNavigationType() === 'POP'`, so browser back and forward still
  restore the previous scroll position rather than snapping to the top.

The reset is instant, not smooth — a page you have just navigated to should
already be at its top, not visibly scrolling there.

---

## Verification

Real browser, not exit codes. Both `/en` and `/ar`, at 1440px and 390px.

1. **BottleOpening** — measure the scroll delta between the section entering the
   pin and releasing it; confirm it is roughly 70vh and that the pour, drops,
   pool and copy all still complete before release.
2. **OliveJourney** — confirm six slides; click through all six forward and
   backward and confirm each image is already painted at the moment the caption
   changes; confirm via the network panel that no image request fires on any
   arrow click; confirm no NOOR FÈS mark is visible on any slide at full frame
   width; confirm the RTL chevrons still point the intuitive direction.
3. **Nav scroll** — scroll to the footer on `/en`, click each of the five top-nav
   links, confirm each lands at the top of the target page. Then confirm the
   browser back button returns to the previous scroll position, and that Hero's
   "Shop Now" and "Discover Our Story" anchors still scroll in-page.
4. Zero console errors on every page touched.
