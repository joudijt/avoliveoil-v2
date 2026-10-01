# avoliveoil.com — Control Panel (CMS) + Arabic removal — FORGE spec

Status: **v2 HARDENED (2026-10-01)** - v1 + adversarial review (5 blockers, 15 majors, 11 minors). **Section 13 is binding and overrides sections 2-12 wherever they differ.** `src/cms/contracts.ts` is authoritative for every shape. Branch `cms-forge`; Arabic removal landed as `a80d708`.

## 0. The brief and the answers

Owner (via Tarek, 2026-10-01): *"create a control panel to control the pages, and add a new page, same way as we did
for sihatree same elementor way, and should be able to add a form that leads to this email … just for pages ! and
adding forms."*

| # | Question | Answer | Meaning for the build |
|---|---|---|---|
| 1 | Where do form entries go | **b** | Each form has its own recipient address(es), set in the panel. A form cannot be published without one. |
| 2 | Existing pages | **b** | Home, Products, product detail (infused), Shop, Why Us, Contact (+ shared header/footer) get **in-place text + photo editing, design unchanged**. New pages are built fully visually. |
| 3 | Languages | **EN + MS only; remove Arabic from the whole website** | `/ar/*` disappears everywhere (routes, snapshots, articles, sitemap, hreflang, llms-ar, manifest, switcher), every old `/ar/...` URL 301s to its EN equivalent. New pages are EN + MS. |
| 4 | The 3 existing forms (WhatsApp) | **a** | Untouched. |
| 5 | New pages in the menu | **a** | Per-page toggles "show in top menu" / "show in footer", default off. |
| 6 | Logins | **a** | Admin users with own email + password; admin can add/remove users. |

Out of scope (stated by owner: "just for pages"): blog articles, product catalogue editing, checkout.

## 1. Ground truth (phase 2 — codebase first)

| Fact | Source | Confidence |
|---|---|---|
| React 19 + Vite 8 SPA, i18next resources bundled inline, `createRoot` (not hydrate) | `src/main.tsx`, `src/i18n/index.ts` | High |
| Every public route is prerendered by puppeteer to `dist/<lang>/<path>/index.html`; Apache serves those files via `.htaccess` rewrites | `scripts/prerender.mjs`, `public/.htaccess` | High |
| Pages render their own `<Navbar/>` … `<main>` … `<Footer/>`; each calls `useMarkAppReady()` | `src/pages/*.tsx` | High |
| Photos render through `<Picture name=…>` reading `src/assets/opt/manifest.json` (build-time hashed webp) | `src/components/ui/Picture.tsx` | High |
| `isPrerender()` flag already disables every gsap animation | `src/lib/prerender.ts` | High |
| Host: LiteSpeed, **PHP 8.4.25**, `pdo_sqlite` (SQLite 3.53.4), `Dom\HTMLDocument` (HTML5 parser), GD+WebP, `mail()` via `/usr/sbin/sendmail -t -i`, docroot `/home/madinahcom/avoliveoil.com`, **parent dir writable from PHP** | live probe 2026-10-01 (uploaded, read, deleted, verified 404) | High |
| Mail DNS: SPF `+a +mx +ip4:162.0.235.164 include:spf.web-hosting.com ~all`, DKIM `default._domainkey` present, DMARC `p=none` | `nslookup` 2026-10-01 | High |
| FTP account chrooted to docroot; deploy = `scripts/ftp-deploy.py` with `--clean` deleting anything not in `dist/` except `PROTECTED` | `scripts/ftp-deploy.py` | High |
| Same cPanel account hosts 9 other live sites — every account-wide action (uapi, cron, DB) has a blast radius | memory `reference_a_chrooted_ftp_account_does_not_mean_a_chrooted_php` | High |

Design consequence: **no MariaDB, no uapi, no cron.** Storage is one SQLite file **above the docroot**
(`/home/madinahcom/avoliveoil-cms/cms.sqlite`) — nothing account-wide is created, backup = copy one file.

## 2. Architecture

```
                 ┌──────────── browser ────────────┐
 visitor ──GET /en/why-us──► .htaccess ──► /api/serve.php (HTML front controller)
                                              │  1. cache hit?  data/cache/<sha1>.html → readfile
                                              │  2. source = static snapshot  dist/en/why-us/index.html
                                              │            or CMS page        template + published_html
                                              │  3. apply PUBLISHED overrides (text/img/SEO) with Dom\HTMLDocument
                                              │  4. inject CMS menu links + <script id="cms-boot" type="application/json">
                                              │  5. write cache, send (on ANY error: raw snapshot, never a 500)
 React boot (main.tsx) reads #cms-boot → i18n.addResource(overrides) → renders identical page
 admin ──/admin──► same SPA, lazy `admin` chunk ──fetch──► /api/index.php (JSON API, session cookie + CSRF header)
```

### 2.1 Why a PHP front controller for HTML (and not runtime fetches)
* Owner edits must reach **Google and AI crawlers immediately** — they read the HTML, not React. Server-side
  application of overrides to the prerendered snapshot means no rebuild is ever needed for a text/photo edit,
  which is strictly better than answer 2b promised.
* React must render the SAME text the HTML has (no flash of old text): overrides travel in `#cms-boot` in the same
  response, applied to i18n **before** `createRoot` — no extra request.
* Fail-safe: serve.php wraps everything; on any exception it streams the untouched static snapshot (or the shell
  with 404 for unknown). Cache key includes the content version, so a cache hit never touches SQLite.

### 2.2 Data directory (above docroot)
`AVO_CMS_DATA` = env var if set (local dev/tests), else `dirname(DOCUMENT_ROOT) . '/avoliveoil-cms'`.
Contents: `cms.sqlite` (WAL), `version.txt` (int content version), `cache/` (rendered HTML), `logs/cms.log`
(rotated at 2 MB), `secret.key` (32 random bytes, created on first run, 0600). Created on first request with 0700.

### 2.3 Repo layout (new)
```
server/                         PHP source (copied to dist/api/ by scripts/copy-server.mjs after vite build)
  index.php                     JSON API router  (/api/…)
  serve.php                     HTML front controller
  sitemap.php                   /sitemap.xml = static sitemap + published CMS pages
  .htaccess                     deny direct access to _lib/, no indexes
  _lib/ bootstrap.php db.php migrate.php auth.php http.php pages.php overrides.php forms.php
        submissions.php media.php mailer.php render.php sanitize.php ratelimit.php users.php audit.php
  tests/                        php tests (run with local php + temp AVO_CMS_DATA) — NOT deployed
src/cms/                        shared by public site + admin
  contracts.ts                  block/page/form/boot/API types (frozen before builders start)
  boot.ts                       read #cms-boot, apply overrides to i18n, expose menu/page/images
  editable.ts                   cmsText(key) / data-cms helpers
  blocks/                       block renderer components (public + canvas + publish-time HTML)
  CmsPage.tsx                   public route /:lang/:slug
src/admin/                      lazy chunk: login, dashboard, pages, builder, existing-page editor, forms,
                                inbox, media, users, account
```

## 3. Arabic removal (answer 3)
Inventory → §3 appendix (filled from the inventory agent). Rules:
* `SUPPORTED_LANGS = ['en','ms']`; switcher = EN / BM.
* Delete `src/i18n/locales/ar`, AR article bodies, `public/llms-ar.txt`, `public/site-ar.webmanifest`, RTL-only code.
* `.htaccess` block (generated by `scripts/gen-ar-redirects.mjs` from `slugs.json`, between markers):
  `/ar` → `/en`; `/ar/(products|shop|why-us|contact|blog)` → `/en/$1`; `/ar/products/<slug>` → `/en/products/<slug>`;
  `/ar/blog/<ar-slug>` → `/en/blog/<en-slug>` (else `/ms/...` if only MS exists, else `/en/blog`); anything else
  under `/ar/` → `/en`. All **301**, placed before every other route rule.
* Server: `--clean` deploy removes `/ar/**`, `llms-ar.txt`, `site-ar.webmanifest`; verify each returns 301/404.
* Sitemap, hreflang, `og:locale:alternate`, llms*.txt, AGENTS.md/about.md/faq.md, AI-FACTS.yml, CLAUDE.md updated.

## 4. Data model (SQLite, migrations in `_lib/migrate.php`, `PRAGMA user_version`)
```
users(id PK, email UNIQUE COLLATE NOCASE, name, pass_hash, is_active 1, created_at, last_login_at)
sessions(token_hash PK, user_id, csrf, created_at, last_seen_at, expires_at, ip, ua)
login_attempts(id PK, ip, email, at)                        -- rate limit window
pages(id PK, slug UNIQUE, status 'draft'|'published', langs_json '["en","ms"]',
      in_header 0, in_footer 0, menu_order 0, noindex 0,
      draft_json, published_json, published_html_json {en:"…",ms:"…"}, render_build,
      created_at, updated_at, published_at, deleted_at, updated_by)
page_revisions(id PK, page_id, json, html_json, created_at, user_id, note)
overrides(lang, key, kind 'text'|'image', draft_value, published_value, updated_at, updated_by,
          PRIMARY KEY(lang,key))
override_revisions(id PK, publish_id, lang, key, kind, old_value, new_value, created_at, user_id)
forms(id PK, name, recipients, subject, def_json, created_at, updated_at, deleted_at)
submissions(id PK, form_id, page_id, lang, data_json, ip_hash, ua, created_at,
            mail_status 'sent'|'failed'|'spam', mail_error, read_at)
media(id PK, file_base, original_name, width, height, widths_json, bytes, alt_en, alt_ms, created_at, user_id)
settings(key PK, value)
audit(id PK, user_id, action, target, at, detail)
```
Page JSON (`draft_json` / `published_json`) = `CmsPageDoc` (contracts.ts):
`{ title:{en,ms}, seo:{metaTitle:{en,ms}, metaDescription:{en,ms}, ogImage?:mediaId}, sections: Section[] }`
`Section = {id, kind:'section', settings:{layout:'boxed'|'full', bg:'cream'|'bg'|'olive'|'olive-dark'|'white'|'image',
bgImage?, padY:'none'|'s'|'m'|'l'|'xl', align, hide:{desktop,tablet,mobile}, anchor?}, columns: Column[]}`
`Column = {id, span:1..12 (desktop), widgets: Widget[]}` — mobile always stacks, tablet keeps spans ≥6.
Widgets (each `{id,type,settings,hide}`; every user text is `{en,ms}`):
`heading(text,level h1-h4,size,align,color)` · `text(html{en,ms} sanitised rich text)` · `image(mediaId,alt,link,rounded,ratio)`
· `button(label,href,style primary|outline|whatsapp,newTab,align)` · `spacer(size)` · `divider` · `video(url youtube|vimeo|mp4)`
· `gallery(mediaIds[],cols)` · `iconList(items[{icon,text}])` · `faq(items[{q,a}])` (+FAQPage JSON-LD) ·
`products(ids[] from infused/catalogue data)` · `form(formId)` · `quote(text,author)` · `whatsapp(label,message)`.
Rich text allow-list: `p br strong b em i u a[href,target,rel] ul ol li h2 h3 h4 blockquote span` — enforced client AND server.

## 5. Public rendering
* **New pages** live at `/{lang}/{slug}`, slug `^[a-z0-9]+(-[a-z0-9]+)*$`, 2–80 chars, reserved:
  `products shop why-us contact blog admin api assets uploads fonts icons og ar en ms __cms-template sitemap robots`.
* **Template**: prerender also snapshots `/en/__cms-template` and `/ms/__cms-template` (CmsPage in template mode:
  Navbar + `<main data-cms-page-root>` + Footer). serve.php fills `[data-cms-page-root]` with the page's
  `published_html[lang]` (rendered in the admin browser with `renderToStaticMarkup` of the same block components at
  publish) and rewrites the head (title, description, canonical, hreflang en/ms/x-default for the langs the page has,
  og:*, robots, JSON-LD WebPage + BreadcrumbList + FAQPage if a faq widget exists). Direct GET of `__cms-template` → 404.
* React: route `/:lang/:slug` → `CmsPage` renders from `boot.page` (blocks JSON) — never fetches; if no boot page →
  NotFound view (`noindex`), status already 404 from serve.php.
* Form widgets in published HTML are re-rendered automatically when a form changes (§7.4).
* `/sitemap.xml` → `sitemap.php`: the static build sitemap (renamed `sitemap-static.xml` in dist) + published,
  indexable CMS pages with `lastmod = published_at`, `xhtml:link` alternates.

## 6. Existing pages: in-place editing (answer 2b)
* Keys: an editable text is an **i18n key** (`hero.title`); arrays use dotted indices (`faq.items.2.a`).
  Components mark the element whose whole text is that key with `data-cms="<key>"` via `cmsText()` helper.
  An editable photo is `<Picture cmsKey="home.hero" …>` → emits `data-cms-img="home.hero"` on the `<img>`.
* Overrides apply **site-wide per key** (a string used in several places changes everywhere — the editor shows a
  "used in N places" badge from the generated key-usage map).
* serve.php applies published overrides: `[data-cms=key]` → `textContent`; `img[data-cms-img=key]` → `src`,
  `srcset`, `width`, `height` (keeping class/sizes/alt/loading); SEO keys (`seo.<page>.title|description`) →
  `<title>`, meta description, og/twitter title/description; JSON-LD string occurrences of the old default value
  are replaced with the new one (`json_encode` both, exact match) so FAQ/Product schema follows visible text.
* `defaults-<lang>.json` (flattened i18n, generated at build into `dist/api/_data/`) gives the original value for
  "reset", "changed" badges and JSON-LD replacement.
* Edit mode: `/admin/edit/<page>?lang=` shows the real page in an iframe at `/<lang>/<path>?cms-edit=1`. serve.php
  sees a valid admin session + `cms-edit` → applies DRAFT overrides, no cache, injects `boot.edit=true`. The app
  then (a) sets the static flag so animations are skipped and everything is visible, (b) lazy-loads
  `src/cms/inlineEdit.ts`: outlines `[data-cms]`/`[data-cms-img]`, click-to-edit plain text (Enter = done,
  Esc = cancel, paste = plain text), image click → parent media picker, links don't navigate. Changes go to the
  parent via `postMessage` (origin-checked) → Save draft / Publish / Discard / per-field Reset / Versions.

## 7. Forms (answers 1b, 4a)
### 7.1 Definition
`def_json = { fields:[{id,name,type text|email|tel|textarea|select|radio|checkbox|number|date,
label:{en,ms}, placeholder:{en,ms}, required, width full|half, options:[{en,ms}], maxLength}],
submitLabel:{en,ms}, successMessage:{en,ms}, redirectUrl? }` · `recipients`: 1–5 valid addresses (required).
### 7.2 Submit `POST /api/forms/{id}/submit` (JSON or urlencoded; urlencoded → 303 back with `#form-sent`)
Validation from the definition (types, required, maxLength default 2000/textarea 5000, select ∈ options).
Spam: honeypot `company_website` (filled → pretend success, store as spam, no mail) · rate limit per IP 5 / 10 min,
30 / day · >3 URLs in the payload → spam · body ≤ 64 KB.
### 7.3 Mail
`mail()` with envelope `-f noreply@avoliveoil.com`, `From: "Arabian Village Website" <noreply@avoliveoil.com>`,
`Reply-To:` the first valid email field, multipart text+HTML table of fields, subject `[Website] <form subject> — <page>`.
CR/LF stripped from every header value; recipients validated with `FILTER_VALIDATE_EMAIL`. Result stored in
`mail_status`; the inbox shows failures with a "Resend" button. Submission is stored BEFORE mailing.
### 7.4 Republish on form change
Saving a form marks every published page that embeds it; the admin client re-renders those pages' HTML and posts
`/api/pages/{id}/html` (same blocks, new HTML) — the visitor HTML never shows a stale label.

## 8. Admin app (`/admin`, lazy chunk, `noindex`)
Login · Dashboard (pages, new entries, failed mails, pages needing re-render) · **Pages** (new: blank or from a
template; list; duplicate; trash/restore) · **Builder** (left panel: Widgets / Section library / element settings
with Content–Style–Advanced tabs; canvas iframe with device switch Desktop 1280 / Tablet 820 / Mobile 390; drag a widget
from the panel onto the canvas, drag to reorder, up/down/duplicate/delete; double-click text to edit in place;
undo/redo; autosave draft; sticky top bar: Save · Preview · Publish · Versions · Page settings; EN/BM switch with
"needs translation" counter) · **Site pages** (existing pages, in-place editor §6) · **Forms** (builder + recipients)
· **Inbox** (entries per form, read/unread, CSV export, resend) · **Media** (upload, alt EN/BM, delete if unused)
· **Users** (add / deactivate / reset password; cannot remove the last active user) · **My account**.

## 9. Security
* Session cookie `avo_cms` HttpOnly, Secure, SameSite=Strict, Path=/; 256-bit token, stored as SHA-256; idle 12 h,
  absolute 7 d. Every mutating API call requires header `X-CSRF-Token` = session csrf.
* `password_hash(PASSWORD_DEFAULT)`; min length 10; login rate limit 5 fails / 15 min per IP and per email;
  constant-ish response for unknown user.
* Uploads: ≤ 15 MB; `getimagesize` + finfo must agree on jpeg/png/webp/gif; re-encoded by GD to webp at widths
  480/960/1600/2400 (≤ original); random file names under `/uploads/cms/`; `/uploads/.htaccess` turns PHP off.
  No SVG.
* `server/_lib` denied by `.htaccess` + `defined('AVO_CMS') || exit` guard in every lib file.
* All SQL through PDO prepared statements. JSON output with `JSON_HEX_TAG|JSON_HEX_AMP` inside `<script>`.
* `robots.txt`: `Disallow: /admin` and `/api/`. Admin HTML `noindex`.
* deploy `PROTECTED` += `/uploads`.

## 10. Verification plan
PHP test suite (auth, CSRF, slugs, publish/versions, overrides apply, serve fallback, forms validation/spam/mail
capture, uploads, sitemap) · `tsc`, `vite build`, prerender, existing gates (`check:heads`, `check:hydration`,
`check:sitemap`, `check:llms`) green for EN+MS · local full-stack walk with `php -S` router + Playwright/puppeteer:
desktop + phone, EN + BM: login → new page from template → add widgets → form → publish → visit → submit form
(mail captured) → inbox → edit Home hero text + photo → publish → curl shows new text in raw HTML → revert →
versions → AR URLs 301 → deploy → same walk live (test page deleted after, test entries removed).

## 11. Existing-page edit model (from the content map, 2026-10-01)
* 440 string leaves in `common.json`, **no HTML, no newlines**, one namespace. Structural leaves are NOT editable:
  `*.icon`, `oliveJourney.scenes.*.key`, `hero.headlineWords.*.gold`, `statistics.items.*.fromFoundedYear`.
  Number leaves (`statistics.items.N.value`, N≠ the fromFoundedYear item) are editable as integers only.
* `{{store}}` strings: the editor edits the **rendered** text; the override is stored literal (renders identically).
  Defaults file stores interpolated values (`{{store}}` → `MADINAH_NAME`) so JSON-LD replacement matches.
* Marking: every element whose whole text is one key gets `data-cms`; attribute strings get
  `data-cms-attr="placeholder:<key>|alt:<key>|aria-label:<key>"`. Hero words: one mark per word span.
  Keys not present in the snapshot (closed modals, WhatsApp prefill, aria) are editable from the page's
  **"All texts"** side list; React applies them from `#cms-boot` (crawlers don't see closed modals anyway).
* Hard-coded EN alts (Hero bottle, BottleOpening, ScrollStory, ProductsPage hero, WhyUs, logo) move to new i18n keys
  `alt.*` (EN + MS) so they become editable and translated.
* Image spots (`cmsKey`): `home.hero.bg`, `home.hero.bottle`, `home.story.woman`, `home.bottle.pour` (warning: the pour
  animation is tuned to the 343×1683 bottle), `home.showcase.<id>`×5, `home.journey.<sceneKey>`×6, `products.hero`,
  `infused.<id>.hero`×6, `whyus.field`. Image override value = `{"media":<id>,"alt":"…"}` per language.
* "Used in N places": generated `dist/api/_data/key-usage.json` from a static scan of `t('…')` / `cmsText('…')` calls.
* Each existing page's editable key groups (for the side list + sitemap lastmod) reuse the page→key-group table in
  `scripts/seed-sitemap-manifest.mjs`.

## 12. API contract (JSON; errors `{error:{code,message,fields?}}` with 4xx; message is owner-readable)
```
POST /api/auth/login {email,password} → {user,csrf}          POST /api/auth/logout
GET  /api/auth/me → {user,csrf} | 401                        POST /api/auth/password {current,next}
GET  /api/users · POST /api/users {email,name,password} · PATCH /api/users/{id} {name?,isActive?,password?}
GET  /api/pages → [{id,slug,status,title,updatedAt,publishedAt,inHeader,inFooter,hasUnpublished,needsTranslation}]
POST /api/pages {slug,title:{en,ms},template?} → page          GET /api/pages/{id} → {page, draft, published}
PUT  /api/pages/{id}/draft {doc, baseVersion} → {version}     (409 if baseVersion stale — two tabs)
PATCH /api/pages/{id} {slug?,langs?,inHeader?,inFooter?,menuOrder?,noindex?}
POST /api/pages/{id}/publish {html:{en,ms}, doc} → {publishedAt}   POST /api/pages/{id}/unpublish
POST /api/pages/{id}/html {html:{en,ms}}  (re-render only, doc unchanged)
POST /api/pages/{id}/duplicate · DELETE /api/pages/{id} (trash) · POST /api/pages/{id}/restore
GET  /api/pages/{id}/revisions · POST /api/pages/{id}/revisions/{rid}/restore (→ becomes draft)
GET  /api/site/keys?page=home&lang=en → [{key,default,draft,published,type,usage}]
PUT  /api/site/overrides {lang, items:[{key,kind,value|null}]}  (null = reset draft to default)
POST /api/site/publish {lang?} → {publishId}   POST /api/site/discard {lang?}
GET  /api/site/revisions · POST /api/site/revisions/{publishId}/revert
GET/POST /api/forms · GET/PUT/DELETE /api/forms/{id} · GET /api/forms/{id}/usage → [pageIds]
POST /api/forms/{id}/submit  (PUBLIC, no session)
GET  /api/submissions?form=&page=&unread= · PATCH /api/submissions/{id} {read} · DELETE /api/submissions/{id}
POST /api/submissions/{id}/resend · GET /api/submissions/export.csv?form=
GET  /api/media · POST /api/media (multipart file) · PATCH /api/media/{id} {altEn,altMs} · DELETE /api/media/{id} (409 if used)
GET  /api/dashboard
GET  /api/catalogue → products for the products widget (from defaults + infused ids)
```

## 13. Review resolutions (BINDING — overrides earlier sections)

Owner-only questions raised by the review, decided by default (reported, reversible): first admin login
`admin@avoliveoil.com` (owner changes email/password in *My account*); submissions kept until deleted in the
inbox (no auto-purge); store facts (prices, branches, WhatsApp number, hours — `storeFacts.json`) stay
developer-managed because they also feed schema/llms; existing pages = **wording + photos only** (no
adding/removing FAQ items or list entries — the list shapes stay as built).

### 13.1 Serving (review #2 #3 #6 #7 #8 #26 #28)
* **Rendered-page store inside the docroot**: serve.php writes finished HTML to `/_r/<lang>/<path>/index.html`
  (`/_r/en/index.html`, `/_r/en/why-us/index.html`, `/_r/en/blog/<slug>/index.html`, `/_r/ms/<cms-slug>/index.html`).
  `.htaccess` serves `/_r/...` directly when the file exists → **PHP runs only on a miss**. Visitors never need
  SQLite: serve.php reads `DATA/published/site.json` and `DATA/published/pages/<slug>.json` (written atomically
  at publish). All writes are temp-file + `rename()`. After writing an `/_r` file, serve.php re-reads
  `version.txt`; if it changed meanwhile, it unlinks what it wrote (publish race).
* **Invalidation**: every publish (site text, page, form, menu, media alt) deletes the whole `/_r/` tree; pages
  regenerate on demand. A code deploy invalidates it too: `ftp-deploy.py --clean` deletes `/_r/**` because `_r`
  is not in `dist/` (intended). Never written to `/_r`: fallbacks, 404s, 503s, edit/preview responses, requests
  with a query string other than tracking params (`utm_*`, `gclid`, `fbclid`, `fbclid`, `ttclid` are ignored).
* **Fail-safe**: serve.php starts with `ob_start()` + `register_shutdown_function` that, on a fatal error,
  discards the buffer and `readfile()`s the raw static snapshot (or the `/index.html` shell with **503** +
  `Retry-After: 120` for a CMS slug — never 404 a CMS page because the CMS is down). Errors → `DATA/logs`.
* **.htaccess order (exact)**: 1 HTTPS · 2 www→apex · 3 `# BEGIN ar-redirects` block (with `[NC]` so `/AR/`
  works; plus `llms-ar.txt` → 301 `/llms.txt`) · 4 external requests for `/_r/`, `/api/_lib/`, `/api/_data/`,
  `/api/_setup/`, `/api/tests/` → 404 (`THE_REQUEST`) · 5 `^api/(.*)$` → `/api/index.php` (except real files
  `api/serve.php`, `api/sitemap.php`, `api/index.php`) · 6 `^sitemap\.xml$` → `/api/sitemap.php` ·
  7 `^admin(/.*)?$` → `/admin.html` (+ `X-Robots-Tag: noindex, nofollow`) · 8 external request for
  `/(en|ms)/…/index.html` → 301 clean path; any `__cms-template` / `cms-template` path → 404 · 9 uppercase in
  `/(en|ms)…` → 301 lowercase · 10 trailing slash on `/(en|ms)/x/` → 301 slashless (roots `/en/` → `/en`) ·
  11 `^$` and `^(en|ms)(/[a-z0-9-]+)*$` → `/_r/<path>/index.html` if it exists (bare `/` uses `_r/en`), else
  `/api/serve.php` · 12 `^cms-canvas$` → SPA shell · 13 existing file/dir passthrough · 14 extension-404
  (excluding `/api/`) · 15 SPA shell.
  `gen-ar-redirects.mjs` anchors on its own BEGIN/END markers (not on another rule) and `--check` joins `npm run build`.
* **Deploy (`ftp-deploy.py`)**: upload all files **except `/.htaccess`** → GET
  `https://avoliveoil.com/api/serve.php?selftest=1` with header `X-Selftest: <AVO_SELFTEST env>` must return
  `{"ok":true,...}` (server compares sha256 with the hash in `dist/api/_data/build.json`) → upload `.htaccess`
  last (previous remote copy saved locally as `.htaccess.prev-<ts>` for rollback) → `--clean`.
  `PROTECTED` += `/uploads`. `--clean` additionally removes empty directories bottom-up (never PROTECTED).
* serve.php response headers: `Content-Type: text/html; charset=UTF-8`, `Cache-Control: no-cache, must-revalidate`
  (edit/preview: `private, no-store`), `ETag` + 304 on `If-None-Match`, HEAD = headers only,
  `Content-Security-Policy: script-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'`,
  plus the existing security headers. `.htaccess` sends the same CSP for every `text/html` response.

### 13.2 Boot, navigation, language (review #1 #9 #12)
* `CmsBoot.text/images/menu` carry **both languages** (contracts). Client-side navigation always has the edits.
  CMS menu links are plain `<a href>` (full load). The language switcher on a CMS page offers only
  `boot.page.langs` (missing language → `/<lang>`); elsewhere unchanged.
* A CMS route reached without a boot page (client-side) fetches `GET /api/public/page?slug&lang`
  (`PublicPagePayload`); 404 → NotFound view (`noindex`). The prerender template route never fetches.
* Server filters boot text against the current `defaults-<lang>.json` (orphans dropped; listed in the admin as
  "orphaned edits"). Boot applies values with `i18n.addResource` for scalar keys and replaces the array for
  whole-array keys, **before** `createRoot`.
* Interpolated keys (default contains `{{…}}`): edited as **templates** in the side panel (tokens shown, all must
  remain, none added). Inline click on them focuses the side-panel field. serve.php interpolates only `{{store}}`
  (= `MADINAH_NAME`); keys with other tokens (e.g. `articlePage.readingTime`) are not applied server-side.
  Every other value: reject `{{`, `}}`, `$t(` with a plain-language 400.
* Statistics: number and suffix in separate spans (`data-cms` each; number formatted server-side like
  `toLocaleString('en-US')`), label keyed. The `fromFoundedYear` tile's number is not editable.
* `hero.headlineWords` = whole-array override (`HeadlineWord[]`, 1–8 words, each ≤ 30 chars), edited by a dialog
  (words + gold toggle). serve.php rebuilds the `h1` word spans by cloning an existing plain span and an existing
  gold span from the snapshot.
* serve.php never sets `textContent` on an element that has element children (skips + logs).
* **SEO for CMS pages**: the server computes one `ResolvedSeo`; boot passes it; `SEO.tsx` accepts it (robots,
  alternates only for the page's langs, canonical, og, JSON-LD) so React's head equals PHP's head. Helmet emits
  native tags (no `data-rh`): serve.php selects head tags by attribute and JSON-LD by
  `script[type="application/ld+json"]` wherever it is. Every `__cms-template` occurrence in the template is
  rewritten to the slug; alternates for languages the page lacks are removed.

### 13.3 New-page HTML (review #5 #10 #11 #17)
* Posted HTML is **sanitised on the server** with `Dom\HTMLDocument` against an allow-list: the tags the block
  renderer emits; attributes `class id href src srcset sizes alt width height loading decoding title target rel
  type name placeholder required maxlength min max value for role aria-* data-cms-* style` (style only
  `object-position`, `aspect-ratio`, `max-width`, `background-image:url(/uploads/...)`); URL schemes
  http/https/mailto/tel/relative (`//host` rejected); `iframe` only `https://www.youtube-nocookie.com/embed/<id>` or
  `https://player.vimeo.com/video/<id>`; `form` action only `/api/forms/<id>/submit`. Hrefs/video URLs inside the
  page JSON validated the same way at save. JSON written into `<script>` uses
  `JSON_HEX_TAG|JSON_HEX_AMP|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE`.
* WAF-proof transport: every write is **POST** (`X-HTTP-Method-Override: PUT|PATCH|DELETE` honoured); HTML fields
  travel **base64** (`htmlB64`). The live WAF is probed before go-live.
* Built-in images used by widgets (product bottle etc.) come from **stable unhashed paths**
  `/cms-assets/<name>-<w>.webp` (copied from `src/assets/opt` at build), never hashed `/assets/...`.
* Staleness: each page stores `render_build` and `deps` (`text`, `media:<id>`, `form:<id>`). Publishing site
  text, editing media alt or a form marks dependants `needs_render=1`; a deploy (build ≠ render_build) marks all.
  The admin re-renders dirty pages automatically on load (progress toast) and posts `/api/pages/{id}/html`.
  Every admin write carries `X-CMS-Build`; mismatch with the server build → 409 `{code:"stale_panel"}` → panel
  asks to reload.
* Rendering uses a **cloned i18n instance** per language (published text applied) + `MemoryRouter`; no lazy or
  Suspense inside blocks.
* Bundles: admin = separate Vite entry `admin.html` (+ `src/admin/admin.css` with its own Tailwind sources);
  `index.css` gets `@source not "./admin"`; `react-dom/server` only in admin chunks; gate
  `scripts/check-bundles.mjs` (public entry + react-vendor ≤ baseline + 15 KB gz; no `react-dom-server` in any
  chunk `index.html` loads). Block renderers use literal class maps; gate `scripts/check-cms-classes.mjs` asserts
  every class a widget variant can emit exists in the built public CSS.
* Canvas = public-app route `/cms-canvas` (lazy chunk), noindex, renders blocks with the public CSS; same-origin
  postMessage only.

### 13.4 Security (review #4 #5 #13 #14 #19 #20 #31)
* **First admin**: `/api/_setup/<64hex>.token` uploaded by FTP (denied from the web); `POST /api/setup
  {token,email,name,password}` works only when `users` is empty; an emergency `<64hex>.reset` file with
  `{token,email,password}` resets that user's password. The file is deleted on use; `--clean` removes leftovers.
* Login: per-IP and per-email progressive delay (1,2,4…30 s, no lockout); `password_verify` against a dummy hash
  for unknown emails; identical error text. **Forgot password**: `POST /api/auth/forgot {email}` (same response
  always) mails a link with a 32-byte token (stored hashed, 30 min, single use) → `/admin/reset?token=`.
  Password change / deactivation kills that user's other sessions.
* Every write: JSON body (or multipart for uploads), `X-CSRF-Token`, `Origin` (or `Sec-Fetch-Site`) same-origin.
  Cookie `SameSite=Strict; Secure (when https); HttpOnly; Path=/`.
* `REMOTE_ADDR` only (not behind Cloudflare; never trust X-Forwarded-For).
* Publishing site text publishes **only the keys sent** (`{keys:[{lang,key}]}`); other pending drafts are listed
  with author + time.
* Form redirect: `redirectPath` must match `FORM_REDIRECT_RE`; the no-JS 303 goes back to the CMS page that embeds
  the form (server checks that `page_id` embeds `form_id`), never to Referer.

### 13.5 Mail (review #13)
* From `noreply@avoliveoil.com`, envelope `-f` = setting *System email* when set (default: the first admin's
  email) else `noreply@avoliveoil.com`. Go-live requires a live test to a Gmail inbox showing `spf=pass`
  and `dkim=pass`.
* Subject via `mb_encode_mimeheader`; HTML values `htmlspecialchars`; CR/LF stripped from every header value.
* Site-wide cap 40 mails/hour; over the cap → stored `mail_status='held'`, inbox shows it, Resend.
* Per-form **Send test email** button. CSV export: cells starting `= + - @` tab or CR prefixed with `'`.

### 13.6 Data, backups, health, pages (review #15 #16 #21 #22 #23 #24)
* SQLite: probe WAL at first run, fall back to `journal_mode=DELETE`; `busy_timeout=5000`; migrations under
  `BEGIN IMMEDIATE`; `secret.key` created with `fopen(…,'x')`.
* Backups: `VACUUM INTO DATA/backups/cms-<ts>.sqlite` on every publish, keep 15. Admin **System**: download latest
  backup, health (PHP/SQLite versions, data dir writable, `_r` size, last 50 log lines, failed/held mails,
  `integrity_check`, build id).
* Uploads: browser resizes + orients first (`createImageBitmap(file,{imageOrientation:'from-image'})`, max 2400 px,
  keeps alpha → PNG if transparent else JPEG q .9); server re-checks: ≤ 40 MP from `getimagesize` before decoding,
  `imagealphablending(false)`+`imagesavealpha(true)`, NEW random file names (never overwrite). Spots that need a
  transparent cut-out (`home.hero.bottle`, `home.bottle.pour`, `home.showcase.*`, `products.hero`, `infused.*.hero`,
  `home.story.woman`) warn when the chosen image has no alpha. Image overrides may carry a focal point.
* Slug change → `redirects(from_slug,to_slug)` 301; trashed page → 410; trashed slugs stay reserved until purged.
* A page publishes per language: a language is published only when its title + meta title are filled and its
  "needs translation" count is 0; otherwise that language is left out (no URL, no hreflang).
* IndexNow ping (existing key file in `public/`) on publish (fire-and-forget, 3 s timeout).
* Header menu: max 3 CMS items in the desktop pill (panel enforces).

### 13.7 Robots, admin entry, inline editing, tests (review #18 #27 #29 #30)
* `robots.txt`: `Disallow: /admin` and `Disallow: /api/` in **every** `User-agent` group.
* Admin = `admin.html` entry (noindex meta + header).
* Inline editing of existing pages uses an **overlay input** over the element (never `contenteditable` on
  React-owned nodes); `window.__CMS_STATIC__` (set from `boot.edit`) skips animations and Lenis;
  `isStaticRender()` = prerender OR cms static.
* Test matrix against a real Apache with the real `.htaccess` (Docker `php:8.4-apache`, `AllowOverride All`):
  HEAD, trailing slash, uppercase, query strings, `/ar/*`, `/AR/*`, direct `index.html`, `_lib`, `_r`,
  `/uploads/x.php`, `/api/submissions/export.csv`, `/admin`, `_r` hit vs miss, deploy-order selftest.

## 14. Build artefacts, API delta, ownership (BINDING)

### 14.1 `dist/api/_data/` (written by `scripts/cms-build-data.mjs`, run in `npm run build` after `vite build`)
* `build.json` `{ "build": "<yyyymmddHHMMss>-<git short sha>", "selftestSha256": "<hex>" }` — the self-test token is
  random per build, written to the gitignored local file `.cms-selftest` (deploy reads it, sends `X-Selftest`).
* `defaults-en.json`, `defaults-ms.json`: `{ "<dotted.key>": {"v": <string|number|array>, "t": "string"|"number"|"words",
  "tokens": ["store"]?, "editable": true|false } }` — every leaf of `common.json` (arrays flattened with numeric
  segments; `hero.headlineWords` kept whole as type `words`), values **interpolated** for `{{store}}` in `"vi"`
  (`{"v": template, "vi": interpolated}` only when tokens exist). Structural leaves `editable:false`.
* `key-usage.json` `{ "<key>": ["Home › Hero", "Shop › Partner", ...] }` (static scan of `t('…')`/`cmsText('…')`,
  dynamic templates resolved for known id lists).
* `page-keys.json` `{ "home": {"path":"", "label":"Home", "groups":[{"label":"Hero","keys":[...]}], "images":[spot...]},
  "products": …, "infused": {…, "paths": ["products/<slug>"...]}, "shop": …, "why-us": …, "contact": …,
  "global": {"label":"Header & footer", …} }`.
* `image-spots.json` `{ "<spotKey>": {"label":"Home › Hero background", "needsAlpha": bool, "default": {"name":"…",
  "width":…, "height":…}} }`.
* `catalogue.json` products for the products widget: `[{ "id", "kind":"infused"|"classic", "href": {"en","ms"},
  "name": {"en","ms"}, "tagline": {"en","ms"}, "image": {"name":"bottle-cutout","variants":[{"w","url":"/cms-assets/…"}],
  "width","height"} }]`.
* `dist/cms-assets/<name>-<w>.webp` stable copies of every manifest image a block can show.
* `dist/api/` = `server/` minus `server/tests/` (copied by `scripts/copy-server.mjs`).

### 14.2 API delta (on top of §12; all writes POST, method override header)
```
POST /api/setup {token,email,name,password}            GET /api/setup/status → {needsSetup}
POST /api/auth/forgot {email}  POST /api/auth/reset {token,password}
GET  /api/public/page?slug=&lang=  (public)            POST /api/forms/{id}/submit (public)
POST /api/forms/{id}/test-email                         GET /api/site/pending → drafts by key/lang/user
POST /api/site/publish {keys:[{lang,key}]}              GET /api/site/orphans
GET  /api/system/health    GET /api/system/backup (download latest)    GET/POST /api/settings {systemEmail, mailCapPerHour}
GET  /api/pages/dirty → ids needing re-render           POST /api/pages/{id}/html {htmlB64:{en?,ms?}, build}
POST /api/pages/{id}/publish {doc, htmlB64:{en?,ms?}, langs:[...], build}
GET  /api/build → {build}
```
Error body always `{error:{code,message,fields?}}`; `message` is plain owner-readable English.

### 14.3 File ownership for the parallel build
* **B2 server**: `server/**`, `public/.htaccess` (routing, keeping the ar block untouched between its markers),
  `scripts/ftp-deploy.py`, `scripts/copy-server.mjs`.
* **B3 public**: `src/cms/**` (except `contracts.ts`/`doc.ts`, frozen — add new files instead), `src/components/**`,
  `src/pages/**`, `src/routes/**`, `src/App.tsx`, `src/main.tsx`, `src/i18n/**`, `src/lib/**`, `src/hooks/**`,
  `src/index.css`, `src/data/**`, `vite.config.ts`, `package.json`, `scripts/prerender.mjs`,
  `scripts/cms-build-data.mjs`, `scripts/check-bundles.mjs`, `scripts/check-cms-classes.mjs`,
  `scripts/gen-ar-redirects.mjs`, `public/robots.txt`, `.gitignore`.
* **B4 admin**: `admin.html`, `src/admin/**`.
* Integrator (me): spec, contracts, Apache test harness, live deploy.
