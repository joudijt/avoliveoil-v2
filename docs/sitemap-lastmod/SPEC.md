# Sitemap `<lastmod>` — FORGE spec (2026-09-26)

Owner answers: `1a 2a 3b 4a 5a 6a 7a 8c 9a`.
Sites in scope: sihatree.com (E:\sahtree), surratiperfume.my (E:\surrati-site), avoliveoil.com (E:\avoliveoil-v2), news.techvisionera.com (E:\news-techvisionera), vetta.techvisionera.com (E:\Vetta).
Out of scope: laverne.my (waits for the owner), airconhero.com (skipped).

## Rule (1a) — accurate per-URL dates, never a blanket build date
Google only uses `<lastmod>` when it is consistently accurate. A wrong date is worse than no date.
1. **Articles:** use the article's own real modified date (JSON-LD `dateModified` or the content file's date field). The sitemap and the page's JSON-LD must agree.
2. **Index/listing pages** (blog index, category pages, homepage when it lists articles): use the newest date among the items they list, in the same language/scope.
3. **Static pages without a content date:** use a committed manifest `{url: {hash, lastmod}}`.
   - `hash` = sha1 of the page's MAIN content only (`<main>…</main>` or the site's equivalent; strip header, footer, nav, scripts, analytics, cookie bar, build hashes).
   - Seed `lastmod` from git history of the files that hold that page's CONTENT. Ignore commits that only touched schema, performance, CSS or build tooling; write the ignored commits in the report.
   - On every later build, bump `lastmod` to today ONLY when the hash changes.
4. **If no honest date exists, omit `<lastmod>` for that URL** rather than invent one. Report the URL.
5. A header/footer/site-wide template change must NOT bump every URL.
6. Dates in W3C format: `YYYY-MM-DD`.

## Per site
- **sihatree** (hand-edited `public/sitemap.xml`): add a small generator (or a script that rewrites the existing file) using article JSON-LD `dateModified` and the manifest for the 21 static pages. Keep URL set and order unchanged. Future PRESS wiring scripts must set `dateModified` + `<lastmod>` together (document in CLAUDE.md). ⛔ Deploy the SITEMAP FILE ONLY (client-approved 2a). Do not deploy anything else.
- **surrati** (`scripts/build-live.mjs` `sitemapXml()`):
  - FIRST commit the whole current tree as "live snapshot 09-20 (previously uncommitted)" — not the scratch png.
  - Then add lastmod via the manifest (seed: 08-28 six posts, 09-03 OMNI/structure, 09-10 PRESS, 09-15 collections, 09-19/20 heroes+footer — verify each against file history/diffs rather than trusting this list).
  - Make the JSON-LD `datePublished`/`dateModified` in `build-live.mjs` agree with the sitemap. The 15 PRESS articles currently claim `datePublished` 2026-09-03 but went live 09-10 — fix.
  - Also regenerate `sitemap-images.xml` (live copy is stale).
  - Upload only the sitemap files (+ any article HTML whose JSON-LD date changed, if that fix is made — list them).
- **avoliveoil** (`scripts/generate-sitemap.mjs`, on branch `press-round-10`; no merge, no push):
  - Articles: `dateModified` from `src/content/articles/{en,ms,ar}.ts`.
  - Blog indexes: newest article per language.
  - 33 static + infused URLs: manifest seeded from git, excluding the 09-06 perf refactor `dc2df07`.
  - Remember `npm run sitemap` is NOT part of the build; the deploy must copy `public/sitemap.xml` into dist.
- **news** (`publish_news.py build_sitemap()`, which uploads directly over FTP):
  - Re-run/fix `create_category_pages.py` so the 4 category pages list their real articles, and add a Cybersecurity category page (wired into nav/sitemap the same way as the others).
  - Homepage = newest article date. Categories = newest article in that category.
  - Write the sitemap to a local file too, so it is reviewable and committable.
- **vetta** (hand-maintained `sitemap.xml`):
  - FIRST commit the current (live) tree.
  - Remove the 9 dead AR URLs from the sitemap AND the hreflang/alternate links to them on their EN pages. Fix `pipeline.py` so it never adds an AR twin that does not exist.
  - Add a generator: `VETTA_BLOG_META` date per article (per language), newest per language for the blog indexes, and the static pages at git 2026-06-07 flagged as a batch-commit upper bound.
- **9a:** move the plaintext FTP passwords out of tracked scripts into a gitignored `.env` (news: 6 files; vetta: 5 incl. a docs/plans file). Scripts read them from env. Do not print secrets. Note: they remain in git history — the owner must rotate.

## Gates (each site)
- URL set identical to live before/after (except vetta minus 9 dead, news plus the Cybersecurity page).
- Every `<lastmod>` ≤ today and ≥ the page's first commit/publish. None earlier than the page's own `datePublished`.
- Article sitemap date == page JSON-LD `dateModified`.
- The manifest is committed. Re-running the build without content changes produces an identical sitemap (idempotent).
- A header-only change test: temporarily change the footer text, rebuild, confirm 0 lastmods change, revert.
- XML validates (well-formed; for sitemap-index, children fetch).
- Deploy only the files listed. After deploy, verify live bytes == local. Then the integrator resubmits the sitemap to GSC and confirms `lastDownloaded`.

---
## REVIEW REVISIONS (adversarial review 2026-09-26) — override the above
- **NO DEPLOY BY BUILDERS.** Each builder commits locally and writes the exact one-file upload command/script. The integrator deploys and verifies.
- **R1 news (B1):** NEVER run `create_category_pages.py` — it uploads its stale 20-URL local sitemap over the 82-URL live one and rewrites publish_news.py. Move `build_category_page` logic into a new safe script (or into publish_news.py) that builds category pages + the sitemap from `articles.json`. Write both locally, then assert the URL set equals live (82) + 1 (Cybersecurity) before any upload.
- **R2 news (B2):** add the Cybersecurity link only to the regenerated index + category pages. Do NOT touch the 77 article pages (patch_ui.py's regex truncates bodies).
- **R3 surrati (B3):** the hash input = `<main>` MINUS `footer.ca-foot`, `nav.ca-omni__next`, `nav.omni-crumbs`, scripts, and `/_astro/` hashed asset names.
- **R4 surrati (M1):** if article JSON-LD dates are changed, download each live HTML and diff it against the rebuild. Only JSON-LD date lines may differ; ABORT if any `/_astro/` URL differs. Assert the uploaded file count. Otherwise upload the sitemap files only.
- **R5 surrati (M2/M3):** commit the snapshot with `GIT_AUTHOR_DATE`/`GIT_COMMITTER_DATE=2026-09-20T11:13:00`, excluding `scratch-live-dropdown-debug.png` (add it to .gitignore). Branch `press-round-gsc`, no push. Add a per-slug `{published, modified}` map. PRESS dates come from commit `6634674`; the ~09-20 link-removal edits count as modified 2026-09-20. Hero swaps with the same filename don't count (m4, accepted).
- **R6 gates (M4/M5):**
  - Check `dateModified` against an INDEPENDENT signal (hash history / diff), not the value it was generated from.
  - Lower bound = the page's `datePublished`, not the first commit.
  - Keep the header-only-change test and the idempotency test.
- **R7 avoliveoil (M6/M7):**
  - Hash only after `npm run build:prerender`. Assert each URL's main is non-empty, has an `<h1>`, and has a unique hash.
  - Strip Vite hash suffixes `-[A-Za-z0-9_-]{8}\.` before hashing.
  - The sitemap reaches dist via Vite's public copy, so don't run `npm run sitemap` after the build.
  - Upload ONLY sitemap.xml with a one-file script. Never run ftp-deploy.py; it has no path filter and has typo-flag footguns.
  - Scripts must reject unknown flags. The review showed `generate-sitemap.mjs --help` rewrites the file.
- **R8 env (M8):**
  - news: 7 files (create_category_pages, create_essential_pages, create_new_pages (inline login), patch_popup, patch_schema, publish_news, remove_popup). Keep `publish_news.FTP_PASS` as an attribute for patch_ui.py.
  - vetta: enrich_articles, fix_blog_images, fix_duplicate_gallery_images, gsc_index_vetta, vetta_remaining_fixes (+ gitignored upload.py optional). The docs plan file only holds a placeholder.
  - Add `.env` and `__pycache__/` to vetta's .gitignore BEFORE creating .env.
  - Use a tiny loader that fails loudly when a variable is missing.
- **R9 sahtree (m1/m2):** hash the SOURCE html body minus `nav#main-nav`, `footer.main-footer` and scripts (there is no `<main>`; the hero is a `<header>`, keep it). Blog indexes = newest article per language. Record in the report that `53d8cf1`/`dd949e8` are non-content commits.
- **R10 vetta:** static pages get NO `<lastmod>` (the 06-07 batch date is only an upper bound, so it would overstate freshness).
