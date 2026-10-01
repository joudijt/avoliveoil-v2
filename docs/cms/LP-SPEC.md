# Landing page (Aircon Hero style) for avoliveoil.com — FORGE spec

Status: v1 (2026-10-02). Branch `cms-landing` (from `cms-forge` @ `2662724`, which is LIVE). Contracts additions are
FROZEN in `src/cms/contracts.ts` (`layout`, `CtaButton`, `StoreKey`, 7 widgets, 10 icons, `FORM_ANCHOR`) and
defaults in `src/cms/doc.ts` (`createWidget` cases, `createCtaButton`). CMS-SPEC.md §13–§15 still binding.

## 0. Brief and answers
Owner: *"create a landing page same as the aircon hero landing pages but olive oil colors, logo… I can edit or add new
sections from the control panel — keep it in drafts."*

| # | Question | Answer |
|---|---|---|
| 1 | What it sells | **c — the whole range** (classic Palestinian EVOO + 6-flavour Infused Collection) |
| 2 | Goal | **c — form + WhatsApp + "buy at store" buttons** |
| 3 | Form email | **cs@madinah.com.my** (also the seller's published contact email) |
| 4 | Languages | **a — EN + BM** |
| 5 | Reviews | **a — reuse the 3 home-page reviews** (`testimonials.items`, EN + MS) |
| 6 | Prices | **b — no prices on the page** |
| 7 | Search engines | **b — indexable** (but the page stays a DRAFT; nothing is public until the owner publishes) |

## 1. Reference: Aircon Hero landing pages (ground truth `E:\aircon-landing-pages`, live service.airconhero.com)
Minimal header (logo · phone · WhatsApp, no menu) → dark hero: headline with a gold highlight, sub, WhatsApp +
"Fill the form" buttons, tick chips, a white **form card** on the right → `cards` (icon cards, optional photo) →
`guarantee` band with CTA → `process` steps with photo → `badges` → `testimonials` (stats + quotes) → `gallery` →
`faq` → `finalCta` → minimal footer; phone: sticky bottom bar (WhatsApp + form) and floating WhatsApp.
Source: `src/components/{Hero,Sections,StickyBar,FloatingActions,Header,Footer}.astro` | Type: Code | Confidence: High.

## 2. Landing layout (`doc.layout = 'landing'`)
* **LandingHeader**: Arabian Village logo (→ `/<lang>`), right: EN/BM switch (`data-cms-lang-link`) + green WhatsApp
  button (wa.me with a default message). Transparent over a dark hero, cream when scrolled. No site menu, no breadcrumb.
* **LandingFooter**: logo, one line "Sold in Malaysia by Berkat Madinah Store" (+ email `cs@madinah.com.my`, WhatsApp
  `+60 11-1111 9912` from storeFacts), link "Visit the full website" → `/<lang>`, © year Arabian Village.
* **Phone bottom bar** (<768 px, fixed): WhatsApp + "Fill the form" (scrolls to `#cms-form`; hidden when the page has no
  form). The global floating WhatsApp button is HIDDEN on landing pages (no double WhatsApp on phones; desktop keeps the
  header button). Page gets bottom padding so the bar never covers the footer.
* **Template**: prerender `/en/__cms-template-landing` and `/ms/__cms-template-landing` (LandingHeader +
  `<main><div data-cms-page-root></div></main>` + LandingFooter + bottom bar). serve.php picks it when
  `doc.layout === 'landing'` (published page JSON), else `__cms-template`. The existing `.htaccess` 404 for any path
  containing `cms-template` already hides it. `RESERVED_SLUGS` has it.
* `renderPageHtml`/`CmsBlocks`: landing → **no breadcrumb** in the root (BreadcrumbList JSON-LD stays server-side).
* Canvas shows a thin "Landing layout — header/footer added on the live page" strip instead of the site chrome.

## 3. New widgets (contracts: `heroForm cards steps ctaBand badges reviews stores`)
All render full-width-friendly inside any section (put them in a 1-column `full` section for the AH look; they also
work boxed). Visual language = the olive site (tokens in `src/index.css`): dark = olive-dark `#2e3a24` with subtle
gradient + leaf-light texture, gold `#b88a2a` highlight, cream cards, Playfair headings, Inter body. NOT navy.
* **heroForm**: 2 columns ≥1024 (copy 7/12 · form card 5/12), stacked on phone (copy first, then card). Copy: optional
  kicker, `h1` title with `highlight` substring wrapped in a gold span (if not found → whole title plain), sub, buttons
  (CtaButton[] ≤3), chips (tick + text). Card: white/cream rounded card, formTitle (bold), formSub, then the FORM block
  (`FormBlock` reused) with id anchor `cms-form` on the card. Background: tone dark (olive-dark gradient, or `media`
  photo + `overlay`% black overlay) or light (cream). If `formId` empty: card shows "Choose a form in the panel" ONLY in
  the canvas; public render omits the card and the copy spans full width.
* **cards**: kicker/title/sub header; grid of `columns` icon cards (icon in a gold-tinted circle, title, text); optional
  photo left/right (`mediaSide`) as a tall rounded image beside the grid on ≥1024 (grid then 2 columns).
* **steps**: numbered steps (gold number circle, connecting line on desktop), optional photo beside.
* **ctaBand**: full band, tone olive / dark / gold / cream, optional icon, title, sub, buttons (≤3) centered.
* **badges**: row/grid of badge tiles (icon + title + optional small text).
* **reviews**: optional stats row (big value + label), quote cards (quote mark, text, name · place).
* **stores**: cards for Berkat Madinah Store / Shopee / TikTok Shop, each: icon (react-icons FaStore/SiShopee-like
  generic/ FaTiktok… use what the Shop page uses), title, text, button → the fixed URL (`MADINAH_URL`, `SHOPEE_URL`,
  `TIKTOK_SHOP_URL` from `src/config/site.ts`) opening in a new tab with `rel="noopener"`.
* **CtaButton** render: `whatsapp` → `buildWhatsAppUrl(message[lang])` (new tab), `form` → `#cms-form` (smooth scroll;
  hidden if the page has no form), `store` → fixed store URL (new tab), `link` → `href` with the same `/en→/ms` rewrite
  and `safeHref` as the button widget. Styles reuse the button widget's style map.
* Every user text supports the canvas inline edit (dotted paths, e.g. `items.2.title`, `buttons.0.label`,
  `chips.1.text`, `stats.0.value`).
* Literal class maps only; every class listed in `CMS_CLASS_LIST`.

## 4. Server (PHP)
* `AVO_WIDGET_TYPES` += the 7 types; validation per type: arrays ≤ 12 items (chips ≤ 6, buttons ≤ 3, stats ≤ 4),
  every CtaButton `kind` ∈ enum, `store` ∈ enum, `link` href validated like the button widget, icons ∈ CMS_ICONS list,
  numbers in range (overlay 0–80, columns 2|3|4), `layout` ∈ {site, landing}.
* Media usage (`media in use` 409 + og), form usage (`/api/forms/{id}/usage`, dependants dirty-marking), FAQPage
  JSON-LD unchanged (faq widget only), WebPage/Breadcrumb JSON-LD unchanged.
* serve.php: template choice by `layout`; missing landing template file → fall back to the site template (log), never 500.
* Sanitiser: allow whatever the new blocks emit (anchors with `#cms-form`, `id="cms-form"` on the card div, `data-cms-*`).
* Tests: extend `server/tests` — publish a landing page → served with the landing template (no site nav markers, has
  landing header), validation rejects bad kind/store/icon/href, form usage counts a heroForm.

## 5. Admin
* Palette: the 7 widgets in a new group **"Landing sections"** (icons + names: Hero with form, Icon cards, Steps, Call to
  action band, Badges, Reviews, Where to buy).
* Settings UIs per widget (Content/Style), CtaButton list editor (add ≤3, kind select, label EN/BM, message for
  WhatsApp, store select, link picker for link, style), items editors (add/remove/reorder), media pickers with the
  small-photo warning, form picker (+ create form), chips editor, highlight field with a live check "found in title".
* Page settings: **Layout** (Site page / Landing page) with a one-line explanation.
* Section library: one entry per landing widget (each = a full-width 1-column section with that widget, sensible bg/pad).
* New-page templates: **"Landing page — Aircon Hero style"** (hero form → cards → ctaBand → steps → products → stores →
  badges → reviews → faq → final ctaBand), using neutral `[edit me]`-style copy, layout landing.

## 6. The owner's page (content) — created on LIVE as a DRAFT only
* Title EN "Palestinian Extra Virgin Olive Oil" / BM "Minyak Zaitun Extra Virgin Palestin"; address
  `/en|ms/palestinian-extra-virgin-olive-oil`; layout landing; not in menus; meta title/description EN+BM written for
  "Palestinian extra virgin olive oil Malaysia" intent, different from the home page title.
* Copy rules: ONLY facts from `AI-FACTS.yml` / `storeFacts.json` / existing site copy. Forbidden: prices (answer 6b),
  any health/disease claim (Food Regulations 1985 Reg 18(6)), the unsourced "0.028% acidity" figure, certifications,
  awards, delivery promises beyond "the store's Shopee and TikTok Shop counters deliver nationwide", reply-time
  promises. Seller stats are attributed to Berkat Madinah Store ("Berkat Madinah Store: est. 2010 · 500,000+
  customers served (self-published)").
* Reviews = the 3 home `testimonials.items` verbatim (EN and MS), no star rating.
* Form "Olive oil enquiry" → recipients `cs@madinah.com.my`; fields: Name* · Phone (WhatsApp)* · Email · Interested in*
  (Classic extra virgin olive oil / Infused Collection / Both / Wholesale for my business) · Bottle size (250 ml / 500 ml
  / Not sure yet) · Message. BM labels. Success message EN/BM. **No test submissions on live** (they would email the
  real inbox).
* Photos: uploaded from `src/assets/images` (hero: `HeroAVOliveOilBottleInTheField`; cards: `AVOliveOilInTheField`;
  steps: `FarmerPouringOliveOilInTheField` or `FarmerPickingOliveOfTheTreeInTheField`), alt EN+BM.
* Status stays **Draft** (never published by us). Owner previews via the panel's Preview button.

## 7. Verification
Unit: php tests, tsc, lint, `check:cms` (bundle + classes), `check:hydration`. Harness (Docker Apache): build the
landing template page in the builder with every new widget, publish on the HARNESS (not live), visitor checks desktop +
phone EN/BM (no console errors, no horizontal scroll, sticky bar, no double WhatsApp, form submit → mail captured,
`#cms-form` scroll, store links), raw HTML == React, landing template used. Live: deploy, matrix, create the owner page
as DRAFT via the panel, preview it (logged in) desktop + phone EN/BM, confirm the public URL is 404 (draft) and nothing
else on the live site changed (home/why-us/sitemap byte-compare except version).

## 8. Review resolutions (BINDING — overrides §2–§7)
Review: 4 blockers, 9 majors, 14 minors (all verified against code).
* **B1 template prerender**: template map `{'__cms-template':'site','__cms-template-landing':'landing'}`; widen the
  regexes in `src/routes/cmsLoader.ts`, `src/lib/cmsLangSwitch.ts`, `src/cms/CmsPage.tsx` to `__cms-template(?:-landing)?`;
  `CmsTemplate` gets a `layout` prop; add both routes to `scripts/prerender.mjs`; build check: landing snapshot contains
  `data-cms-page-root`, `data-cms-landing-header`, and NO `data-cms-menu`.
* **B2 React chrome**: `CmsPageView` chooses chrome from `doc.layout` (site: Navbar/Breadcrumb/Footer; landing:
  LandingHeader/LandingFooter/BottomBar — all inside the CMS chunk, never imported by App). `App.tsx` hides the global
  `WhatsAppButton` while a landing page is mounted (tiny context/store set by CmsPage, works for client nav + template).
* **B3 server scans**: `avo_doc_media_ids` / `avo_doc_form_ids` include `heroForm.formId` and
  `heroForm|cards|steps.media` — every consumer (builder payload, publish deps + page file, preview, media-in-use,
  form usage, no-JS redirect, re-render) inherits it. Tests for each.
* **B4 hiding**: `.htaccess` + `server/tests/router.php`: `RewriteRule (^|/)_*cms-template[a-z0-9-]*(/|$) - [NC,R=404,L]`;
  matrix rows `/en/__cms-template-landing`, trailing slash, `/index.html`; slugs containing `cms-template` rejected
  (contracts `slugProblem` + PHP).
* **M1 serve.php**: choose template from the doc actually being rendered (published OR draft preview) inside
  `avo_render_cms_page`; replace the exact template segment name; landing template missing/without root → site template
  (log), never 503 for that reason.
* **M2 full-bleed**: section with `layout:'full'` AND `padY:'none'` drops its horizontal padding (edge to edge). heroForm
  and ctaBand own their backgrounds (bg photo rendered as `<img>` + overlay class map, never inline style). heroForm
  first on a landing page carries top padding that clears the fixed header (`pt-28 md:pt-32`). Header: transparent with
  light text ONLY when the first widget of the page is a dark heroForm/ctaBand; otherwise solid cream.
* **M3 form anchor**: the page's FIRST form (any form or heroForm, document order) gets `id="cms-form"` + `scroll-mt-28`,
  computed once at page level; CtaButton `form` buttons and the phone bar's form button render ONLY when the page has a
  form. The phone bottom bar is rendered INSIDE the page root (from the blocks, layout landing) so server HTML == React
  HTML and it is per-page. Hide the bar while an input inside the form is focused. `cms-form` is a reserved anchor (admin
  + PHP). FormBlock ids (`form-sent-*`, `form-error-*`) use the WIDGET id, not the form id (same form twice is legal).
* **M4 bundle**: CMS icons (all 23) are inline-SVG components in `src/cms/blocks/icons.tsx` (no react-icons import in
  CMS blocks or landing chrome); record the `check:cms` delta; must stay within budget.
* **M5 tracking**: OUT of this round (no analytics on the site today; CSP `script-src 'self'`). Reported to the owner as
  the next step (needs his Google Ads / GA4 IDs).
* **M6 re-render after deploy**: live has 0 published CMS pages today (verified 2026-10-02 after the cleanup) — nothing
  to re-render; still snapshot `/api/pages` before deploy.
* **M7 copy**: page copy excludes: prices (6b), the "0.028%" acidity figure, the word halal, any health/disease claim,
  certifications, awards, reply-time promises; FAQ items must not contain prices. Reviews = home `testimonials.items`
  verbatim (owner answered 5a "real"); the section title will not say "worldwide" claims beyond the quotes themselves.
* **M8 readiness** (warnings in the publish dialog): heroForm without a resolvable form; CtaButton link empty/invalid; a
  `form` button on a page with no form; mediaSide≠none without media; `[`…`]` placeholder text anywhere; highlight not
  found in its title.
* **M9 hidden fields**: changing a CtaButton kind drops fields that kind doesn't use; removing media clears `mediaAlt`;
  `highlight` excluded from the translation counter (`doc.ts` + PHP mirror).
* **Minors**: rel `noopener noreferrer`; `fetchpriority` allowed by the sanitiser; hero photo eager + `fetchpriority=high`;
  exhaustive `switch` with `never` checks in WidgetView/labels/settings; `<ol>` for steps; one `h1` per page (heroForm
  title is h1, the CMS page H1 rule otherwise unchanged); ctaBand has its own button style map per tone with ≥4.5:1
  contrast where text is small (WhatsApp button text uses dark green on light or white on `#128C4A`); bar never covers
  the preview badge; template name **"Ad landing page (form + WhatsApp)"**, includes a gallery section; upload the hero
  as `src/assets/opt/HeroAVOliveOilBottleInTheField-2000.webp`; BreadcrumbList JSON-LD omitted for landing pages;
  gates: harness compares header/footer/bar parity too; fixture lists the new icons.
* **Live form test**: no test email to `cs@madinah.com.my` without the owner's OK — the report tells him to press
  *Send test email* once.

### 8.1 File ownership (parallel build)
* **L1 public** — `src/cms/**` except `contracts.ts`/`doc.ts`; `src/App.tsx`, `src/routes/**`, `src/lib/cmsLangSwitch.ts`,
  `scripts/prerender.mjs`, `scripts/check-*.mjs`, `scripts/dev/**`.
* **L2 server** — `server/**`, `public/.htaccess` (outside the ar block), `server-harness/matrix.py`.
* **L3 admin** — `src/admin/**`.
* Integrator — `contracts.ts`, `doc.ts`, specs, the owner's page content.
