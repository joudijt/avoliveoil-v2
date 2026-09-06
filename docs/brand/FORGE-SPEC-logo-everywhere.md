# FORGE — the header logo everywhere + a complete icon/meta set

Round `LOGO-1`, 2026-09-06. Repo `E:\avoliveoil-v2`, baseline `c96abbe` (main, clean).

## Ask

> "the current logo in header in top nav bar menu — can u use it everywhere else and in
> favicon, meta tags…? the current one, not the one i gave u!"

Plus, from the same session's answered question round: `2a` icon = emblem only, `3a` ship SVG
plus PNG fallbacks, `5a` a branded OG card, `6a` deploy live + push to GitHub, and — stated twice —
**"do not change any colour in the website"**.

## Source of truth

`src/assets/logo/logo_theme.svg` — the exact file `Navbar.tsx`, `Footer.tsx` and `Loading.tsx`
render. viewBox `0 0 300.5 120.58`, two classes:

| class | fill | what it draws |
|---|---|---|
| `cls-2` | `#B88A2A` gold | the emblem — a trapezoid planter, 4 paths, bbox `x[-0.36, 90.14] y[0, 109.47]` |
| `cls-1` | `#2E3A24` olive-dark | the "Arabian Village" wordmark, 16 paths, `x[91.86, 300.51]` |

The palm inside the emblem is a **knockout**, not a white shape: whatever sits behind the SVG
shows through the fronds. Consequence for every derived asset — the tile background decides what
colour the palm appears to be. The header renders on the site cream, so **every icon tile uses
`#FFFDF8` (`--color-cream`)**. No new colour is introduced anywhere; a transparent tile on a dark
browser theme would render the fronds dark and is rejected for that reason.

## The defect this round fixes

`public/favicon.svg` is a **purple `#863bff` chevron** left over from the template this site was
cloned from (`Jul 22`, never touched). That is the icon in every browser tab today. Nothing else
in the repo references the brand at icon sizes: there is no `apple-touch-icon`, no web manifest,
no mask icon, no PNG raster of the logo.

`public/logo.svg` is already byte-identical to `logo_theme.svg` — it is correct and stays.

## Contract — file paths, fixed before any builder starts

| path | size | content |
|---|---|---|
| `public/favicon.svg` | square | emblem on cream, rounded tile |
| `public/favicon.ico` | 16+32+48 | same, rasterised |
| `public/favicon-32.png` | 32×32 | fallback for `rel=icon` |
| `public/apple-touch-icon.png` | 180×180 | opaque cream (iOS composites transparency to black) |
| `public/icons/icon-192.png` | 192×192 | manifest `any` |
| `public/icons/icon-512.png` | 512×512 | manifest `any` |
| `public/icons/icon-maskable-512.png` | 512×512 | emblem at 60% inside the 80% safe circle |
| `public/mask-icon.svg` | — | Safari pinned tab: ONE flat path family, solid fill, no `<style>` |
| `public/logo-512.png` | 512×… | raster lockup for schema `ImageObject` and chat previews |
| `public/og-image.jpg` | 1200×630 | branded card: an existing site photo + cream band + lockup |
| `public/site.webmanifest` | — | name, short_name, icons, cream `background_color`/`theme_color` |

Generator: `scripts/brand-assets.py`, re-runnable, reads only `logo_theme.svg` and a site photo.
Chrome headless does the SVG→PNG rasterising (`--headless=new --screenshot`, `file:///C:/…`
paths both sides, stdout grepped for `bytes written` — see the render trap in memory).

## Wiring

**`index.html`** (the SPA shell, and therefore every prerendered route's head):
`rel=icon` svg + png, `apple-touch-icon`, `mask-icon` with `color="#2E3A24"`, `manifest`,
`theme-color` `#FFFDF8`, `application-name`, `apple-mobile-web-app-title`,
`msapplication-TileColor`, and a base `<title>`/`<meta name=description>` so the pre-hydration
shell is not blank.

**`src/components/SEO.tsx`**: `og:image:width` `1200`, `og:image:height` `630`, `og:image:type`,
`og:image:alt`, `og:image:secure_url`; Organization/seller `logo` becomes an `ImageObject` with
explicit `width`/`height` (Google's requirement) and the Organization gains `image`.

**`src/config/site.ts`**: `LOGO_PATH`, `LOGO_RASTER_PATH`, `ICON_PATH` constants — no path
retyped in a component.

**`src/data/storeFacts.json` + `scripts/ai/facts-sync.mjs`**: add `site.logo`; `scripts/ai/build.mjs`
already emits `org.logo` when the fact exists, so AI-FACTS.yml and the JSON-LD stay in sync and
`npm run check:ai` keeps failing on drift. AI-FACTS.yml is generated — never hand-edited.

**`public/.htaccess`**: `AddType application/manifest+json .webmanifest`. The SPA fallback 404s
any missing path that carries an extension, so every new file must actually exist before deploy.

## Explicitly NOT changed

- No CSS token, no Tailwind class, no section colour. His instruction, twice.
- `Footer.tsx` keeps `brightness-0 invert` (white logo on the dark footer). Replacing it with
  `mono_logo.svg` cream, or with the gold lockup, would change a colour that is live today.
  Flagged in the report instead, one line to flip if he wants it.
- Article hero/inline images: untouched. Photo policy is reuse-only.

## Gates before it ships

`npm run build:prerender` → `npm run check:ai` → `npm run check:llms` → `npm run ai:gate` →
deploy `python scripts/ftp-deploy.py --skip-static` (its exit code is untrustworthy — count files,
compare bytes) → byte-verify every new asset live → Playwright walk desktop + phone × EN/AR/MS
with the tab icon read out of the DOM → `npm run ai:indexnow` → commit → push to GitHub.

---

# §10 — Adversarial review, and what it changed

A hostile review of the spec above (read-only, grounding every claim against the repo and the
live site) returned 3 blockers, 7 majors and 7 minors across two passes. **§10 overrides §1–§9
wherever they disagree.** Findings it raised that were already fixed mid-round are marked so.

## Accepted — blockers

1. **A one-year cache would have kept the purple favicon in every returning tab until 2027.**
   `public/.htaccess` serves `image/png|jpeg|svg+xml` with `ExpiresByType … "access plus 1 year"`,
   and the live response for `/favicon.svg` carried `max-age=31536000, expires: Mon, 06 Sep 2027`.
   New bytes at an old URL never reach a cache holding that. The spec's "same path, new content"
   contract was wrong.
   → The tab icon and the social card now ship at **new, dated URLs** (`/favicon-2026-09.svg`,
   `/og-card-2026-09.jpg`), which is what `index.html` and `storeFacts.site.ogImage` point at. The
   legacy paths are rewritten with the same bytes so a cold request for either gets the brand.
   Brand files are also pulled out of the one-year rule (`Cache-Control: max-age=604800` **and**
   `Header unset Expires`, because mod_expires' header survives a `Header set` otherwise), and the
   `FilesMatch` covers `/icons/*` too — otherwise the next logo change is stuck for a year.

2. **`https://avoliveoil.com/` served the empty 442-byte shell** — no title, no description, no
   og:image, no JSON-LD — because the rewrites only covered `/en|/ar|/ms` and the bare domain fell
   to `DirectoryIndex`. That is the most-shared URL of the site, and it is what `ai:gate` fetches
   for its homepage checks, so that gate could never pass.
   → `RewriteRule ^$ /en/index.html [L]`. Canonicals already point at `/en`, so no duplicate URL
   is created.

3. **`check:ai` and `check:llms` cannot fail when run after `npm run build`** — the build itself
   re-runs `facts-sync.mjs` and `build-llms.mjs` in write mode, so both drift detectors compare a
   file the build just wrote against a regeneration of itself.
   → Gate order inverted: both checks run **before** `build:prerender`, on the tree as committed,
   and `git status --porcelain` must be clean after the build and before the deploy.

## Accepted — majors

4. **`site.logo` in AI-FACTS.yml was decoration and added a third hardcoded copy of the path.**
   Nothing shipped consumes it (`surfaces.mjs` never adopts `schema.jsonld`), and the literal in
   `facts-sync.mjs` had no connection to the one in `site.ts`.
   → `storeFacts.json` gained a `site` block (name per language, logo, raster + its real pixel
   size, icon, og card). `site.ts` and `facts-sync.mjs` both read it, so one edit moves all three
   and the paths cannot disagree.

5. **`\.[A-Za-z0-9]{2,5}$` does not match `.webmanifest`** (eleven characters), so a missing or
   failed-upload manifest answered **200 with the SPA shell** — the exact soft-404 that rule exists
   to prevent, and invisible to any status-code check. → widened to `{2,12}`.

6. **The `ImageObject` declared PNG dimensions on an SVG `url`.** `logo.svg` has a viewBox and no
   pixel size, so `width: 512, height: 236` described a different file.
   → `url` now points at `logo-512.png`, whose 512x236 was measured, not assumed.

7. **`author` and `publisher` on article pages restated the `#organization` node** with a second,
   different logo value. Consumers merge by `@id`, producing a contradictory node.
   → both collapsed to bare `{ '@id': …/#organization }` references.

8. **One English manifest and English app names were served on all 45 Arabic and Malay routes** —
   an Arabic visitor installing the site got an English name, LTR direction and the English
   homepage. → three manifests generated from `storeFacts.site` (`site.webmanifest`,
   `site-ms.webmanifest`, `site-ar.webmanifest`, the Arabic one `dir: rtl`, `start_url: /ar`,
   named القرية العربية), and `SEO.tsx` emits the manifest link plus `application-name` /
   `apple-mobile-web-app-title` per language. The shell keeps English defaults, marked
   `data-shell`, which the prerenderer drops per route.

9. Already fixed before the review returned: **react-helmet-async appends rather than replaces**,
   so every prerendered page carried two `<title>` and two descriptions. `prerender.mjs` now drops
   the `data-shell` copies whenever Helmet produced a counterpart. Verified 0 duplicates on
   159 routes.

## Accepted — minors

10. `brand-assets.py` wrote a temp file **into `public/`**; an interrupted run would have shipped
    it. → `tempfile.TemporaryDirectory()`.
11. `favicon.ico`'s 16px frame was a bicubic reduction of a 48px bitmap, which mushes the palm
    fronds. → each of 16/32/48 is now rendered from the vector and combined.
12. `AddType image/x-icon .ico` added — with `nosniff` on, a wrong MIME is fatal rather than
    tolerated.
13. `check:brand` (`python scripts/brand-assets.py --check`) wired into `package.json`; it existed
    and nothing called it.
14. The walk is driven by **puppeteer**, which the repo already depends on. There is no Playwright
    here; §9 was wrong to name it.

## Rejected / corrected

15. The review read the spec's "Organization/seller logo" line and flagged putting the Arabian
    Village mark on **Berkat Madinah Store** as a false identity claim. It is right, and the spec
    line was wrong — but the implementation never touched `sellerSchema`. Spec text corrected here;
    no code change.
16. The spec's own numbers were wrong in two places: the maskable icon holds the art at **52%**,
    not 60% (52% is the safer figure and is what ships), and the emblem extent quoted in §2 is a
    **control-point hull**, not a measured bbox — `-0.36` is a cubic control point. Harmless for
    cropping, which is all it is used for, but not a number to build maths on.

## Deliberately not done

- **No per-language OG card.** The lockup has no Arabic wordmark; inventing one would be a brand
  change, and the owner's instruction this round was to use the existing logo untouched.
- **No colour change of any kind**, including the footer's `brightness-0 invert` (which renders the
  logo white on the dark footer). Replacing it with the cream `mono_logo.svg` would look better and
  would change a colour that is live today — his call, one line to flip.
