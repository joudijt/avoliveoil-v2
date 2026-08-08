# OliveJourney / BottleOpening / Nav Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three reported defects on avoliveoil.com — a section that costs two viewport heights of scrolling, a photo carousel that stalls on every arrow click, and top-nav navigation that lands mid-page.

**Architecture:** Three independent changes against `D:\avoliveoil-v2`. (1) One-line height reduction on a pinned GSAP section whose timeline is already scrub-fraction based, so the choreography compresses for free. (2) The carousel's single swapping `<img>` becomes six stacked, always-mounted `<img>` elements crossfaded by CSS opacity, backed by six new ~50 KB WebP assets that replace ~15 MB of PNGs — after which an arrow click issues no network request at all. (3) A `ScrollToTop` component in the router resets both the native scroll position and Lenis's own internal scroll value on every push navigation.

**Tech Stack:** React 19 + TypeScript + Vite 8, Tailwind v4, GSAP 3 (ScrollTrigger), Lenis 1.3, react-router-dom v7, react-i18next. Python 3.14 with OpenCV 5.0 and Pillow 12.2 at `/c/Python314/python` for one-off asset preparation. Puppeteer 25 (devDependency) for browser verification.

## Global Constraints

- **This project has no unit test framework.** There is no vitest, jest, or test script in `package.json`. Do not add one. Every task is verified by `npm run lint`, `npx tsc -b`, and a real browser driven by the project's existing Puppeteer devDependency. A passing exit code is never sufficient evidence on its own — check the rendered effect.
- **Dev server runs on port 5180** (`npm run dev`). Vite silently shifts the port if 5180 is taken — read the actual URL off the startup banner before probing it.
- **After any structural GSAP/ScrollTrigger edit, restart the dev server** before judging correctness. HMR in this project has repeatedly carried stale ScrollTrigger instances and masked real failures.
- **Never edit `src/i18n/locales/{en,ar,ms}/common.json` by `JSON.parse` → mutate → `JSON.stringify`.** That reformats the entire file and produces a several-hundred-line diff. Use targeted string replacement only. The convention in these files is 2-space indent, arrays always expanded, and array-element objects that are all-primitive printed inline on one line: `{ "key": "grove", "title": "…", "caption": "…" }`.
- **No unverified factual claims in copy.** This project has an established rule against asserting certifications or process facts that cannot be substantiated. New captions must stay descriptive, not promissory.
- **The site is trilingual.** Any locale key added or removed must be added or removed in all three of `en`, `ar`, `ms`. A key present in one file and missing in another renders the raw key string to users.
- **Working tree is clean at `9174617`.** Commit after each task.
- **Every commit message in this plan ends with a trailing `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` line**, separated from the body by a blank line. The commit commands below omit it for brevity — add it.

---

## File Structure

| Path | Disposition | Responsibility |
|---|---|---|
| `src/routes/ScrollToTop.tsx` | create | Router-level scroll reset on push navigation. Renders nothing. |
| `src/hooks/useLenis.ts` | modify | Gains `scrollToTopImmediate()`. Already owns the `activeLenis` singleton — no new state. |
| `src/App.tsx` | modify | Mounts `<ScrollToTop />`. |
| `src/components/sections/BottleOpening.tsx` | modify (1 line) | Section height. |
| `src/components/sections/OliveJourney.tsx` | modify | Carousel: six stacked crossfaded images instead of one swapping `src`. |
| `src/assets/images/journey-0{1..6}-*.webp` | create | Six prepared photographs, 600×450, WebP q88. |
| `src/assets/images/journey-0{1,2,3,4,5,7,8}-*.png` | delete | Orphaned after the rewrite, ~15 MB. |
| `src/assets/images/journey-06-testing.webp` | **keep, untouched** | Deliberately retained though unused — user-supplied photo, restorable as a 7th slide on request. |
| `src/i18n/locales/{en,ar,ms}/common.json` | modify | `oliveJourney.scenes` goes from 8 entries to 6. |

Task order is: Task 1 (nav scroll) and Task 2 (section height) are independent one-file changes and land first. Task 3 produces the assets Task 4 imports, so Task 4 cannot start before Task 3 is committed.

---

### Task 1: Scroll to top on route change

**Files:**
- Create: `src/routes/ScrollToTop.tsx`
- Modify: `src/hooks/useLenis.ts` (append one exported function)
- Modify: `src/App.tsx:14-15` (mount the component)

**Interfaces:**
- Consumes: `activeLenis` module-level singleton already declared at `src/hooks/useLenis.ts:8`.
- Produces: `scrollToTopImmediate(): void` exported from `src/hooks/useLenis.ts`; `ScrollToTop` React component exported from `src/routes/ScrollToTop.tsx`. Nothing later in this plan depends on either.

**Why both resets are needed:** `HomePage` mounts Lenis via `useLenis(!loading)`; the other five pages do not. Lenis keeps its own internal target scroll value and drives the real scroll position toward it every frame, so on the homepage a bare `window.scrollTo(0, 0)` is overwritten on Lenis's next frame. Conversely `activeLenis` is `null` on the non-Lenis pages, so the Lenis call alone does nothing there. Both are required.

- [ ] **Step 1: Add the Lenis reset helper**

Append to `src/hooks/useLenis.ts`, after the existing `scrollToHash` function:

```ts
/**
 * Jumps Lenis to the top with no easing. Used on route changes, where the
 * new page should already be at its top rather than visibly scrolling
 * there. No-op when Lenis isn't mounted (every page except HomePage, and
 * HomePage itself while its loading screen is up) — the caller pairs this
 * with a plain window.scrollTo for those cases.
 */
export function scrollToTopImmediate() {
  activeLenis?.scrollTo(0, { immediate: true });
}
```

- [ ] **Step 2: Create the ScrollToTop component**

Create `src/routes/ScrollToTop.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToTopImmediate } from '../hooks/useLenis';

/**
 * React Router keeps window.scrollY across client-side navigations, so
 * clicking a top-nav link while scrolled halfway down renders the next page
 * already scrolled halfway down. This resets it on every push navigation.
 *
 * Two deliberate exemptions:
 *  - a URL carrying a hash is an in-page anchor (Hero's #shop / #journey
 *    CTAs go through scrollToHash), so leave the scroll alone;
 *  - POP means back/forward, where the browser's own scroll restoration is
 *    the behaviour users expect.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) return;
    if (navigationType === 'POP') return;
    window.scrollTo(0, 0);
    scrollToTopImmediate();
  }, [pathname, hash, navigationType]);

  return null;
}
```

- [ ] **Step 3: Mount it in the router**

In `src/App.tsx`, add the import alongside the existing `LangLayout` import:

```tsx
import { ScrollToTop } from './routes/ScrollToTop';
```

and render it as the first child of the fragment, immediately above `<Routes>`:

```tsx
    <>
      <ScrollToTop />
      <Routes>
```

- [ ] **Step 4: Typecheck and lint**

Run: `cd /d/avoliveoil-v2 && npx tsc -b && npm run lint`
Expected: both clean. `ScrollToTop` returning `null` is a valid `ReactNode` and needs no explicit return type.

- [ ] **Step 5: Verify in a real browser**

Start the dev server (`npm run dev`, note the actual port), then run this Puppeteer probe. It reproduces the exact reported symptom — navigate while scrolled down — and checks all three behaviours in one pass.

```js
// scratchpad/probe-scroll.mjs
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:5180';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

await page.goto(`${BASE}/en`, { waitUntil: 'networkidle0' });
await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 });

// Scroll to the bottom of the homepage the way a real user would.
for (let y = 0; y < 12000; y += 400) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 60));
}
const before = await page.evaluate(() => window.scrollY);
console.log('scrollY before nav:', before, before > 1000 ? 'OK' : 'FAIL — never scrolled');

for (const path of ['products', 'shop', 'why-us', 'contact']) {
  await page.evaluate((p) => {
    const link = [...document.querySelectorAll('header a')].find((a) => a.getAttribute('href')?.endsWith(`/${p}`));
    link.click();
  }, path);
  await new Promise((r) => setTimeout(r, 1200));
  const y = await page.evaluate(() => window.scrollY);
  console.log(`/${path} landed at scrollY=${y}`, y === 0 ? 'OK' : 'FAIL');
  // scroll down again so the next navigation starts from a non-zero position
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise((r) => setTimeout(r, 300));
}

// Back button must restore, not snap to top.
await page.goBack({ waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 1200));
console.log('after back, scrollY =', await page.evaluate(() => window.scrollY), '(non-zero expected)');

// In-page anchors must still work.
await page.goto(`${BASE}/en`, { waitUntil: 'networkidle0' });
await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 });
await page.evaluate(() => {
  [...document.querySelectorAll('a,button')].find((e) => /Discover Our Story/i.test(e.textContent))?.click();
});
await new Promise((r) => setTimeout(r, 2500));
const anchorY = await page.evaluate(() => window.scrollY);
console.log('after #journey anchor, scrollY =', anchorY, anchorY > 500 ? 'OK' : 'FAIL — anchor was reset');

console.log('console errors:', errors.length ? errors : 'none');
await browser.close();
```

Run: `node scratchpad/probe-scroll.mjs`
Expected: every nav link reports `landed at scrollY=0 OK`; back reports a non-zero value; the anchor reports `OK`; zero console errors.

Repeat the nav-link portion against `${BASE}/ar` — the Arabic route uses the same `<Link>`s but is worth confirming since `dir="rtl"` changes the header layout.

- [ ] **Step 6: Commit**

```bash
git add src/routes/ScrollToTop.tsx src/hooks/useLenis.ts src/App.tsx
git commit -m "Reset scroll position when navigating between pages"
```

---

### Task 2: Shorten the BottleOpening section

**Files:**
- Modify: `src/components/sections/BottleOpening.tsx:72`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. Purely a layout constant.

**Background for the implementer:** the section pins its inner screen with `ScrollTrigger({ start: 'top top', end: 'bottom bottom', scrub: 1, pin: pinRef })`. Pin scroll distance is `sectionHeight − viewportHeight`, so `h-[300vh]` costs 200vh of scrolling. Every tween in the timeline is positioned by scrub *fraction* (`0.05`, `0.28`, `0.42`, the four `DROPS` delays which top out at `0.82`, then `0.45` and `0.5`), never by absolute duration — so shrinking the section compresses the whole choreography proportionally and requires no retiming.

- [ ] **Step 1: Change the height**

In `src/components/sections/BottleOpening.tsx`, line 72:

```tsx
    <section id="bottle-opening" ref={sectionRef} className="relative h-[300vh] w-full">
```

becomes:

```tsx
    <section id="bottle-opening" ref={sectionRef} className="relative h-[170vh] w-full">
```

Change nothing else in the file.

- [ ] **Step 2: Restart the dev server**

Kill the running Vite process and start it again. Do not judge this change on an HMR update — ScrollTrigger pin state does not reliably rebuild in place in this project.

```bash
# PowerShell
Get-CimInstance Win32_Process | Where-Object CommandLine -like '*vite.js*' | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

then `npm run dev` again.

- [ ] **Step 3: Verify the pour still completes**

The risk of this change is that the animation now finishes so late in a shorter scroll that the copy never fully appears before the pin releases. Check the two endpoints directly.

```js
// scratchpad/probe-bottle.mjs
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5180/en', { waitUntil: 'networkidle0' });
await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 });

const box = await page.evaluate(() => {
  const s = document.querySelector('#bottle-opening');
  const r = s.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height, vh: window.innerHeight };
});
console.log('section height', Math.round(box.height), 'px =', (box.height / box.vh).toFixed(2), 'vh');
console.log('pin scroll distance =', ((box.height - box.vh) / box.vh).toFixed(2), 'vh (expect ~0.70)');

// Scroll incrementally to the very end of the pin and read the copy's opacity.
for (let y = box.top; y <= box.top + box.height - box.vh; y += 100) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 90));
}
await new Promise((r) => setTimeout(r, 900));
const state = await page.evaluate(() => {
  const h2 = document.querySelector('#bottle-opening h2');
  const copy = h2.parentElement;
  const kicker = copy.previousElementSibling;
  return {
    heading: h2.textContent.trim(),
    copyOpacity: getComputedStyle(copy).opacity,
    kickerOpacity: getComputedStyle(kicker).opacity,
  };
});
console.log(state, state.copyOpacity > 0.95 && state.kickerOpacity > 0.95 ? 'OK' : 'FAIL — copy never finished');
await browser.close();
```

Run: `node scratchpad/probe-bottle.mjs`
Expected: pin scroll distance ≈ 0.70 vh, both opacities ≥ 0.95, heading reads "Crafted the Traditional Way".

If either opacity is below 0.95, the fix is to move the two copy tweens earlier (`0.45` → `0.35` for the kicker, `0.5` → `0.4` for the copy block) rather than to lengthen the section again.

- [ ] **Step 4: Look at it**

Screenshot the pinned section at three scroll positions (pin start, midpoint, pin end) at 1440×900 and at 390×844, and confirm the bottle still tilts, the stream still grows and nothing overlaps the copy. Scroll incrementally to get there — a single `fullPage` screenshot never fires the scroll events these tweens depend on.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/BottleOpening.tsx
git commit -m "Halve the scroll length of the bottle pour section"
```

---

### Task 3: Prepare the six replacement photographs

**Files:**
- Create: `src/assets/images/journey-01-grove.webp`
- Create: `src/assets/images/journey-02-sunset.webp`
- Create: `src/assets/images/journey-03-picking.webp`
- Create: `src/assets/images/journey-04-crates.webp`
- Create: `src/assets/images/journey-05-carrying.webp`
- Create: `src/assets/images/journey-06-press.webp`
- Create: `scratchpad/prepare-journey-photos.py` (one-off, not committed — this project keeps asset-prep scripts out of the repo)

**Interfaces:**
- Consumes: six user-supplied source files in `C:\Users\joudi\Downloads`.
- Produces: the six `.webp` paths above, each **600×450** (already 4:3, so the carousel's `object-cover` crops nothing further). Task 4 imports them by exactly these filenames.

**Source mapping.** The six sources, their output names, and the reason for each vertical crop offset. The sources are all 600×600; the output window is 450px tall, so the offset ranges 0–150 and 75 is a plain centre crop.

| Source file | Output | Watermarked | Crop top | Why |
|---|---|---|---|---|
| `WhatsApp Image 2026-08-02 at 11.12.10 AM (1).jpeg` | `journey-01-grove.webp` | no | 75 | Aerial grove, daylight. Horizon sits above centre; a centre crop keeps both horizon and rows. |
| `WhatsApp Image 2026-08-02 at 11.12.10 AM (3).jpeg` | `journey-02-sunset.webp` | **yes** | 40 | Aerial grove at sunset. Biased upward because the sunset sky is the whole point of the shot. |
| `WhatsApp Image 2026-08-02 at 11.12.10 AM (2).jpeg` | `journey-03-picking.webp` | **yes** | 60 | Man picking from a tree. Slightly upward so his raised arms and the branch stay in frame. |
| `WhatsApp Image 2026-08-02 at 11.11.45 AM.jpeg` | `journey-04-crates.webp` | no | 75 | Top-down crates of olives. Uniform pattern, centre crop is fine. |
| `WhatsApp Image 2026-08-02 at 11.12.10 AM.jpeg` | `journey-05-carrying.webp` | **yes** | 75 | Crew carrying crates. Figures span the middle band. |
| `WhatsApp Image 2026-08-02 at 11.12.09 AM.jpeg` | `journey-06-press.webp` | no | 75 | Olives on the stainless conveyor. Subject is centred. |

**Watermark.** Three sources carry the NOOR FÈS mark (Arabic `نور فاس` above the Latin wordmark) in the top-right corner, in the identical position on all three: measured bounding box `x 515–595, y 10–95`. It sits over smooth sky on the sunset and picking shots and over dark tree canopy on the carrying shot — the canopy one is the only one at real risk of a visible smear.

- [ ] **Step 1: Write the preparation script**

Create `scratchpad/prepare-journey-photos.py`:

```python
import cv2
import numpy as np
from PIL import Image
from pathlib import Path

SRC = Path(r'C:\Users\joudi\Downloads')
DST = Path(r'D:\avoliveoil-v2\src\assets\images')

# The NOOR FES mark occupies the identical box on all three marked photos.
WM = (515, 10, 595, 95)  # x0, y0, x1, y1

JOBS = [
    ('WhatsApp Image 2026-08-02 at 11.12.10 AM (1).jpeg', 'journey-01-grove.webp',    False, 75),
    ('WhatsApp Image 2026-08-02 at 11.12.10 AM (3).jpeg', 'journey-02-sunset.webp',   True,  40),
    ('WhatsApp Image 2026-08-02 at 11.12.10 AM (2).jpeg', 'journey-03-picking.webp',  True,  60),
    ('WhatsApp Image 2026-08-02 at 11.11.45 AM.jpeg',     'journey-04-crates.webp',   False, 75),
    ('WhatsApp Image 2026-08-02 at 11.12.10 AM.jpeg',     'journey-05-carrying.webp', True,  75),
    ('WhatsApp Image 2026-08-02 at 11.12.09 AM.jpeg',     'journey-06-press.webp',    False, 75),
]

for src_name, out_name, marked, top in JOBS:
    img = cv2.imread(str(SRC / src_name))
    assert img is not None, f'could not read {src_name}'
    assert img.shape[:2] == (600, 600), f'{src_name} is {img.shape[:2]}, expected 600x600'

    if marked:
        mask = np.zeros(img.shape[:2], np.uint8)
        x0, y0, x1, y1 = WM
        mask[y0:y1, x0:x1] = 255
        img = cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)

    img = img[top:top + 450, :]  # 600x600 -> 600x450 (4:3)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(DST / out_name, 'WEBP', quality=88, method=6)
    kb = (DST / out_name).stat().st_size // 1024
    print(f'{out_name}: {img.shape[1]}x{img.shape[0]}, {kb} KB')
```

- [ ] **Step 2: Run it**

Run: `/c/Python314/python scratchpad/prepare-journey-photos.py`
Expected: six lines, each `600x450`, each between roughly 25 KB and 90 KB. If any file exceeds 150 KB, drop that one to `quality=82` and rerun — the whole set should total well under 500 KB.

- [ ] **Step 3: Look at the three inpainted results — this is the gate, not the file sizes**

Build a zoomed contact sheet of just the region the watermark used to occupy and view it. `cv2.inpaint` succeeding is not evidence that it looks right.

```python
# scratchpad/check-inpaint.py
from PIL import Image
from pathlib import Path

DST = Path(r'D:\avoliveoil-v2\src\assets\images')
# Watermark box was y 10-95 in the 600x600 source; after cropping `top` rows
# off, it lands at y (10-top)..(95-top) in the 600x450 output.
CHECKS = [('journey-02-sunset.webp', 40), ('journey-03-picking.webp', 60), ('journey-05-carrying.webp', 75)]

sheet = Image.new('RGB', (140 * 3 + 20, 130), 'black')
for i, (name, top) in enumerate(CHECKS):
    im = Image.open(DST / name)
    y0 = max(0, 10 - top - 15)
    sheet.paste(im.crop((490, y0, 600, y0 + 120)), (i * 150, 0))
sheet = sheet.resize((sheet.width * 3, sheet.height * 3), Image.LANCZOS)
sheet.save(r'scratchpad\inpaint-check.png')
print('written')
```

Run it, then **open `scratchpad/inpaint-check.png` and look at it.** Expected: no legible Arabic script, no legible "NOOR FÈS", no hard-edged rectangle where the mask was.

Acceptance: on the two sky-backed photos the region must be indistinguishable from surrounding sky. On `journey-05-carrying.webp` the mark sits over dark canopy — a slight blur there is acceptable, a visible rectangular patch is not.

**If `journey-05-carrying.webp` fails:** re-run just that one with `cv2.INPAINT_NS` instead of `INPAINT_TELEA`, which handles textured regions better. If it still fails, fall back to a bottom-biased crop for that photo alone — `top=150` cuts the entire watermark band off — and report the change rather than shipping a smear.

- [ ] **Step 4: Look at all six at carousel size**

Assemble the six side by side at their real rendered size (~570px wide on desktop) and view the sheet. Confirm each subject survived its crop: the sunset sky is still the dominant feature of 02, the picker's raised arms are still in frame on 03, and nobody is decapitated on 05.

- [ ] **Step 5: Commit the assets**

The old PNGs are still referenced by `OliveJourney.tsx` at this point, so this commit adds only. Deletion happens in Task 4, once nothing imports them.

```bash
git add src/assets/images/journey-01-grove.webp src/assets/images/journey-02-sunset.webp src/assets/images/journey-03-picking.webp src/assets/images/journey-04-crates.webp src/assets/images/journey-05-carrying.webp src/assets/images/journey-06-press.webp
git commit -m "Add six prepared olive harvest photographs for the journey carousel"
```

---

### Task 4: Rewrite the carousel and cut it to six slides

**Files:**
- Modify: `src/components/sections/OliveJourney.tsx` (imports at 5-12, `PHOTOS` at 20-29, the image effect at 41-44, the frame's contents at 76-99)
- Modify: `src/i18n/locales/en/common.json:131-140` (`oliveJourney.scenes`)
- Modify: `src/i18n/locales/ar/common.json:131-140`
- Modify: `src/i18n/locales/ms/common.json:131-140`
- Delete: `src/assets/images/journey-01-tree.png`, `journey-02-growing.png`, `journey-03-harvest.png`, `journey-04-extraction.png`, `journey-05-filtering.png`, `journey-07-bottling.png`, `journey-08-final.png`

**Interfaces:**
- Consumes: the six `.webp` files created in Task 3, by exact filename.
- Produces: nothing consumed elsewhere. `PHOTOS` is module-private and the component's props are unchanged (it takes none).

**Do not delete `src/assets/images/journey-06-testing.webp`.** It becomes unused by this task but is deliberately retained — it is a user-supplied photograph (the songkok tasting shot, added 2026-07-30) that may be restored as a seventh slide.

**Scene table.** Four titles and captions are reused **verbatim** from the retired scenes; only slides 4 and 5 are new copy. `key` values must match `PHOTOS` exactly or the image silently fails to resolve.

| # | `key` | Photo | Caption origin |
|---|---|---|---|
| 1 | `grove` | `journey-01-grove.webp` | old `tree` entry, verbatim |
| 2 | `sunset` | `journey-02-sunset.webp` | old `growing` entry, verbatim |
| 3 | `picking` | `journey-03-picking.webp` | old `harvest` entry, verbatim |
| 4 | `crates` | `journey-04-crates.webp` | **new** |
| 5 | `carrying` | `journey-05-carrying.webp` | **new** |
| 6 | `press` | `journey-06-press.webp` | old `extraction` entry, verbatim |

- [ ] **Step 1: Replace the English scenes**

In `src/i18n/locales/en/common.json`, replace the eight lines between `"scenes": [` and its closing `]` with exactly these six:

```json
      { "key": "grove", "title": "The Olive Tree", "caption": "rooted in Palestinian soil for generations, thriving under the Mediterranean sun." },
      { "key": "sunset", "title": "Olives Growing", "caption": "ripening slowly, gathering the richness that makes great olive oil." },
      { "key": "picking", "title": "Hand-Harvested Olives", "caption": "picked at the right time by experienced farmers." },
      { "key": "crates", "title": "The Day's Harvest", "caption": "crate after crate, gathered and kept whole before pressing." },
      { "key": "carrying", "title": "Carried to the Press", "caption": "moved from the grove to the mill while the fruit is still fresh." },
      { "key": "press", "title": "First Cold Press", "caption": "the first extraction, valued for its natural richness and quality." }
```

Six-space indent, objects inline on one line, trailing comma on all but the last — matching the file's existing convention exactly.

- [ ] **Step 2: Replace the Arabic scenes**

In `src/i18n/locales/ar/common.json`, same replacement:

```json
      { "key": "grove", "title": "شجرة الزيتون", "caption": "متجذرة في أرض فلسطين منذ أجيال، تزدهر تحت شمس متوسطة." },
      { "key": "sunset", "title": "نمو الزيتون", "caption": "ينضج ببطء، ليكتسب الغنى الذي يميز الزيت الفاخر." },
      { "key": "picking", "title": "حصاد يدوي", "caption": "يُقطف في الوقت المناسب على يد مزارعين ذوي خبرة." },
      { "key": "crates", "title": "حصاد اليوم", "caption": "صندوق بعد صندوق، يُجمع ويُحفظ سليماً قبل العصر." },
      { "key": "carrying", "title": "نقل إلى المعصرة", "caption": "يُنقل من البستان إلى المعصرة والثمار ما زالت طازجة." },
      { "key": "press", "title": "أول عصرة على البارد", "caption": "الاستخلاص الأول، يُقدَّر لغناه الطبيعي وجودته." }
```

- [ ] **Step 3: Replace the Malay scenes**

In `src/i18n/locales/ms/common.json`, same replacement:

```json
      { "key": "grove", "title": "Pokok Zaitun", "caption": "berakar di bumi Palestin sejak generasi lalu, subur di bawah suria Mediterranean." },
      { "key": "sunset", "title": "Zaitun Membesar", "caption": "masak perlahan-lahan, mengumpul kekayaan yang membentuk minyak zaitun terbaik." },
      { "key": "picking", "title": "Zaitun Dituai dengan Tangan", "caption": "dipetik pada waktu yang tepat oleh petani berpengalaman." },
      { "key": "crates", "title": "Hasil Tuaian Hari Itu", "caption": "bakul demi bakul, dikumpul dan dijaga elok sebelum diperah." },
      { "key": "carrying", "title": "Dibawa ke Kilang Perah", "caption": "dipindah dari kebun ke kilang semasa buah masih segar." },
      { "key": "press", "title": "Perahan Sejuk Pertama", "caption": "perahan pertama, dihargai kerana kekayaan dan kualiti semula jadinya." }
```

- [ ] **Step 4: Confirm the three files still parse and agree**

```bash
cd /d/avoliveoil-v2 && node -e "
const fs=require('fs');
const keys=['en','ar','ms'].map(l=>{
  const j=JSON.parse(fs.readFileSync(\`src/i18n/locales/\${l}/common.json\`,'utf8'));
  const s=j.oliveJourney.scenes;
  console.log(l, s.length, s.map(x=>x.key).join(','));
  return s.map(x=>x.key).join(',');
});
console.log(new Set(keys).size===1 && keys[0]==='grove,sunset,picking,crates,carrying,press' ? 'OK' : 'FAIL');
"
```

Expected: three lines each reading `6 grove,sunset,picking,crates,carrying,press`, then `OK`.

Also confirm you did not reformat anything: `git diff --stat src/i18n/locales/` must show roughly **8 deletions and 6 insertions per file**, not hundreds of changed lines. If the diff is large, you round-tripped the JSON — revert and redo with targeted string replacement.

- [ ] **Step 5: Swap the imports and PHOTOS map**

In `src/components/sections/OliveJourney.tsx`, replace lines 5-12 (the eight image imports) with:

```tsx
import groveImg from '../../assets/images/journey-01-grove.webp';
import sunsetImg from '../../assets/images/journey-02-sunset.webp';
import pickingImg from '../../assets/images/journey-03-picking.webp';
import cratesImg from '../../assets/images/journey-04-crates.webp';
import carryingImg from '../../assets/images/journey-05-carrying.webp';
import pressImg from '../../assets/images/journey-06-press.webp';
```

and replace the `PHOTOS` constant (lines 20-29) with:

```tsx
const PHOTOS: Record<string, string> = {
  grove: groveImg,
  sunset: sunsetImg,
  picking: pickingImg,
  crates: cratesImg,
  carrying: carryingImg,
  press: pressImg,
};
```

- [ ] **Step 6: Drop the image ref and its tween**

Delete the `imgRef` declaration (line 35):

```tsx
  const imgRef = useRef<HTMLImageElement>(null);
```

and delete the image tween from the effect, leaving only the caption tween:

```tsx
  useEffect(() => {
    gsap.fromTo(captionRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, [index]);
```

The image tween is what made a click appear to do nothing: it faded in a frame whose bytes had not arrived yet. The crossfade is now pure CSS on already-decoded images.

- [ ] **Step 7: Stack all six images in the frame**

Inside the frame `<div>` (line 76), replace the single `<img>` (lines 77-82) with a mapped stack. Leave the gradient overlay and both arrow buttons below it exactly as they are.

```tsx
            {journey.map((s, i) => (
              <img
                key={s.key}
                src={PHOTOS[s.key]}
                alt={s.title}
                aria-hidden={i !== index}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                  i === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
```

All six mount at once and the browser fetches all six immediately — roughly 300 KB in total, less than a fiftieth of what one old slide cost — so changing `index` only flips two opacity values, which the compositor handles without touching the network or the main thread. `aria-hidden` keeps the five inactive copies out of the accessibility tree.

- [ ] **Step 8: Delete the orphaned PNGs**

Confirm nothing references them first:

```bash
cd /d/avoliveoil-v2 && grep -rn "journey-0" src/ --include=*.tsx --include=*.ts
```

Expected: only the six new `.webp` imports. If `journey-06-testing.webp` appears, something still imports it — stop and investigate.

Then:

```bash
git rm src/assets/images/journey-01-tree.png src/assets/images/journey-02-growing.png src/assets/images/journey-03-harvest.png src/assets/images/journey-04-extraction.png src/assets/images/journey-05-filtering.png src/assets/images/journey-07-bottling.png src/assets/images/journey-08-final.png
```

Seven files, ~15 MB. `journey-06-testing.webp` is **not** in that list and must remain.

- [ ] **Step 9: Typecheck and lint**

Run: `npx tsc -b && npm run lint`
Expected: clean. A leftover unused `imgRef` or a stale import will surface here.

- [ ] **Step 10: Restart the dev server, then verify no request fires on click**

This is the decisive check for the reported symptom. If an arrow click still triggers a network request, the stacking did not take effect.

```js
// scratchpad/probe-journey.mjs
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

await page.goto('http://localhost:5180/en', { waitUntil: 'networkidle0' });
await page.waitForSelector('body[data-app-ready="true"]', { timeout: 20000 });

// Scroll the carousel into view incrementally so its entrance state settles.
const top = await page.evaluate(() => document.querySelector('#journey').getBoundingClientRect().top + window.scrollY);
for (let y = 0; y <= top; y += 400) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 60));
}
await new Promise((r) => setTimeout(r, 800));

const imgs = await page.evaluate(() => {
  const list = [...document.querySelectorAll('#journey img')];
  return {
    count: list.length,
    allDecoded: list.every((i) => i.complete && i.naturalWidth > 0),
    dims: list.map((i) => `${i.naturalWidth}x${i.naturalHeight}`),
  };
});
console.log('images:', imgs, imgs.count === 6 && imgs.allDecoded ? 'OK' : 'FAIL');

// Every image request from here on is a regression.
const late = [];
page.on('request', (r) => r.resourceType() === 'image' && late.push(r.url()));

for (let n = 0; n < 8; n++) {
  const t0 = Date.now();
  await page.evaluate(() => document.querySelector('#journey button[aria-label="Next"]').click());
  await new Promise((r) => setTimeout(r, 650));
  const shown = await page.evaluate(() => {
    const caption = document.querySelector('#journey p span.text-gold').parentElement.textContent.trim();
    const visible = [...document.querySelectorAll('#journey img')].findIndex((i) => getComputedStyle(i).opacity === '1');
    const counter = [...document.querySelectorAll('#journey p')].find((p) => /^\d\d \/ \d\d$/.test(p.textContent.trim()))?.textContent.trim();
    return { caption, visible, counter };
  });
  console.log(`click ${n + 1} (${Date.now() - t0}ms):`, shown);
}
console.log('image requests during clicks:', late.length ? late : 'none — OK');
console.log('console errors:', errors.length ? errors : 'none');
await browser.close();
```

Run: `node scratchpad/probe-journey.mjs`
Expected: 6 images, all decoded before the first click; the counter cycles `01 / 06` … `06 / 06` and wraps; exactly one image reports `opacity: 1` at each step; **zero image requests during the clicks**; zero console errors.

- [ ] **Step 11: Look at all six slides, in both directions, in both scripts**

Screenshot the carousel frame on each of the six slides at 1440×900 on `/en`, then repeat on `/ar`. Confirm: no NOOR FÈS mark visible at full frame width on any slide; the caption matches the photo; the prev arrow walks backwards correctly; and on `/ar` the chevrons still point the intuitive direction (`rtl:rotate-180` is already on both icons and must not have been disturbed).

Also click the dot navigation directly to a non-adjacent slide and confirm it crossfades rather than jumping.

- [ ] **Step 12: Commit**

```bash
git add src/components/sections/OliveJourney.tsx src/i18n/locales/en/common.json src/i18n/locales/ar/common.json src/i18n/locales/ms/common.json
git commit -m "Rebuild the journey carousel around six preloaded photographs

The carousel swapped the src of a single img element between eight PNGs of
1.8-2.7 MB each, so every arrow click began a cold fetch and decode while a
GSAP tween faded in a frame that was still empty. All six replacement photos
now mount together and crossfade with CSS opacity, which costs about 300 KB
once and issues no request on interaction.

The slide count drops from eight to six because the new photographs cover
groves, harvesting and pressing only; the filtering, testing, bottling and
final-product scenes had no matching imagery."
```

---

## Final verification

Run after all four tasks, before reporting completion.

- [ ] `npx tsc -b && npm run lint` — clean.
- [ ] `npm run build` — succeeds.
- [ ] `npm run build:prerender` — writes all 27 routes without error. The prerenderer waits on `body[data-app-ready="true"]`, which none of these changes touch, but the carousel now mounts six images per homepage render and that path deserves one confirmation.
- [ ] Homepage image payload: confirm the total bytes of `src/assets/images/journey-*` dropped from ~15 MB to under 600 KB.
- [ ] One pass through `/en`, `/ar` and `/ms` at 1440×900 and 390×844 with the console open: zero errors, no horizontal scroll, every `<img>` resolves.
- [ ] Delete the scratchpad probe scripts. They are throwaway.

## Out of scope

Stated so the implementer does not drift into it: the remaining large PNGs elsewhere in `src/assets/images` (`OliveGroveSunsetHero.png` and friends) are not touched by this plan, even though the same compression argument applies to them. That is a separate pass.
