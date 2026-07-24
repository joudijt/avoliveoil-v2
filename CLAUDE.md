# Arabian Village — Olive Oil Site (avoliveoil-v2)

Trilingual (EN / AR / MS) single-page marketing site for **Arabian Village** premium Palestinian
cold-pressed olive oil. React 19 + TypeScript + Vite 8, heavy scroll/3D motion.

- **Local root:** `E:\avoliveoil-v2`
- **GitHub:** https://github.com/joudijt/avoliveoil-v2 (branch `main`, single commit `535d90e`)
- **Live:** https://avoliveoil.com — deployed 2026-07-22. `SITE_URL` in `src/config/site.ts`,
  `public/sitemap.xml`, `public/robots.txt` and the three `llms*.txt` all say `avoliveoil.com`
  (the repo originally shipped a `arabianvillage.com` placeholder; don't reintroduce it).

## Commands

| Command | What it does |
|---|---|
| `npm install` | 156 packages, ~45 s on this machine |
| `npm run dev` | Vite dev server on **http://localhost:5180** (port pinned in `vite.config.ts`) |
| `npm run build` | `tsc -b && vite build` → `dist/` |
| `npm run prerender` | Post-build static snapshot per language (needs the build first) |
| `npm run build:prerender` | build + prerender, the real release command |
| `npm run lint` | oxlint (not eslint) |
| `npm run preview` | serves `dist/` on 4173 |

## Routes

`src/App.tsx` — everything lives under a `:lang` segment:

- `/` → redirect to `/en`
- `/en`, `/ar`, `/ms` → `LangLayout` → `HomePage`
- anything else → redirect to `/en`

`LangLayout` validates the `:lang` segment, calls `i18n.changeLanguage`, renders `<SEO />`.
`<html lang>` and `<html dir>` are set **only** by `SEO`'s Helmet `htmlAttributes` — do not also
set them imperatively in `LangLayout`, the two sources fight each other.

## Structure

```
src/
  App.tsx                  routes
  main.tsx                 createRoot + HelmetProvider + BrowserRouter
  pages/HomePage.tsx       loading gate + section order
  routes/LangLayout.tsx    :lang validation, i18n switch
  components/
    SEO.tsx                Helmet: title, meta, canonical, hreflang, JSON-LD
    sections/              Loading, Hero, ScrollStory, BottleOpening, Ingredients,
                           ProductShowcase, PurchasePath, OliveJourney, Statistics,
                           Testimonials, FAQ   (rendered in this order)
    ui/                    Navbar, Footer, Modal
  data/content.ts          section copy keys / static content
  data/products.ts         product + pricing data
  i18n/index.ts            i18next init, SUPPORTED_LANGS
  i18n/locales/{en,ar,ms}/common.json
  hooks/useLenis.ts        smooth scroll, enabled only after loading finishes
  config/site.ts           SITE_URL, SITE_NAME, OG_IMAGE_PATH, OG_LOCALES
  assets/images|logo/
public/                    favicon.svg, og-image.jpg, robots.txt, sitemap.xml,
                           llms.txt + llms-ar.txt + llms-ms.txt
scripts/prerender.mjs      puppeteer snapshot of /en /ar /ms
```

## Deploy (FTP)

Host is Namecheap shared hosting, **not** madinah.com.my. `ftp.madinah.com.my` has no DNS record —
use `ftp.avoliveoil.com` (162.0.215.47, same box as Sihatree). Explicit **FTPS on port 21**;
Python `ftplib.FTP_TLS` + `prot_p()` + passive works, plain FTP is not needed.

- User `claudeoliveoil@avoliveoil.com`. The account is **chrooted to the docroot** — `/` *is* the
  web root. There is no `public_html`. Leave `cgi-bin`, `.well-known` and `.ftpquota` alone.
- Release: `npm run build:prerender`, then upload all of `dist/` to `/` **including dotfiles**
  (`.htaccess` must ship or every route except `/` breaks).
- Deploy script used: `scratchpad/ftp_deploy.py` (recursive STOR, `--clean` flag removes remote
  files no longer in `dist/`). 27 files / 25.5 MB, a few minutes on this uplink.

`public/.htaccess` handles: HTTPS redirect, `DirectorySlash Off` + an explicit
`^(en|ar|ms)/?$ -> /$1/index.html` rewrite (without it Apache 301s `/en` to `/en/`, which
contradicts the slash-less canonical/hreflang/sitemap URLs), SPA fallback to `/index.html`,
1-year caching for hashed assets, `no-cache` for HTML, and the usual security headers.

## Prerender contract (don't break it)

`scripts/prerender.mjs` runs `vite preview` on 4173, drives puppeteer to each of `/en /ar /ms`,
waits for **`body[data-app-ready="true"]`**, and writes `dist/<lang>/index.html`.

That attribute is set in `HomePage` once `loading` flips false (the gsap loading timeline runs
~5 s and always completes). If the loading screen ever stops calling `onDone`, or the attribute is
renamed, prerender hangs and fails on the selector timeout. Client-side React uses `createRoot`,
not `hydrateRoot` — the snapshot is thrown away in real browsers and exists purely for
crawlers/AI bots that don't run JS.

Two fixes were needed to make it run on Windows (both already applied, don't revert):

1. `puppeteer.launch({ headless: 'shell' })` and reuse `(await browser.pages())[0]`. With the
   default full headless Chrome 150, `browser.newPage()` **hangs and dies on the 30 s protocol
   timeout** — the error is a bare `TimeoutError: Timed out after waiting 30000ms` with no
   `goto` frame in the stack, which reads like a navigation timeout but is not one.
2. `waitUntil: 'domcontentloaded'`, not `networkidle0`. The page ships ~25 MB of imagery, so the
   network never goes quiet for 500 ms.

## Stack notes

- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js`, no PostCSS file — theme lives
  in `src/index.css` with `@theme`).
- **Motion:** framer-motion + gsap + lenis; 3D via `three` / `@react-three/fiber` / `drei`.
- **i18n:** i18next + react-i18next. Adding a key means adding it to all three
  `locales/*/common.json` — a missing key silently falls back to English.
- **Arabic is RTL.** Use CSS logical properties (`margin-inline-start`, `inset-inline-end`), never
  `left`/`right`, or the AR layout breaks.
- **This dev machine reports `prefers-reduced-motion: reduce`** — animation-gated content can look
  broken/blank locally while being fine elsewhere. Verify with the media query overridden before
  concluding something is bugged.

## Status (2026-07-22)

Deployed to https://avoliveoil.com. Verified live: `/`, `/en`, `/ar`, `/ms` all 200 with no
redirect hop, `robots.txt` / `sitemap.xml` / `llms*.txt` / hashed assets 200, unknown paths fall
back to the SPA shell, `http://` 301s to `https://`, security headers present, 0 console errors.

Known issues, both pre-existing and **not yet fixed**:

- **Asset weight.** 25.5 MB of unoptimized PNGs (hero and journey images are 1.7–2.8 MB each) plus
  a single 505 kB JS chunk. Convert to WebP/AVIF and code-split — this is the top thing to fix.
- **Mobile hero at 375 px.** EN: "Pure Palestinian" overflows the right edge and the bottle image
  overlaps the "Discover Our Story" button. AR: the headline collides with the subtitle. Desktop
  is fine.
- **Placeholder outbound links.** `PurchasePath.tsx` sends Shopee to `https://shopee.com.my/` and
  TikTok Shop to `https://www.tiktok.com/` — site roots, not the store. All four `SOCIALS` in
  `Footer.tsx` are `href="#"`.
- **Two dead forms.** The wholesale/partner form and the footer newsletter both only
  `e.preventDefault()`. They look like they submit; nothing is sent anywhere.
- **`/logo.svg` is missing and answers 200.** `SEO.tsx` points the Organization schema at
  `${SITE_URL}/logo.svg`, which isn't in `public/`. Because the `.htaccess` fallback catches
  everything, the request returns the HTML shell with a 200 instead of a 404 — a soft-404 for
  every missing asset, not just this one. Fix both halves: ship a real `public/logo.svg` and
  restrict the SPA fallback to extension-less paths.
- **Unverified social proof.** Testimonials (Layla H./Amman, Omar K./KL, Sara M./Dubai) and stats
  (5,000+ customers, 20+ years) look like placeholder copy — confirm with the client.
