# PRESS project profile — avoliveoil.com

Written by PRESS Stage 0 on 2026-08-20. Refresh when the repo changes shape.
Every line cites what proved it. Hierarchy of truth: codebase → docs → chat.

## Shape

| Fact | Value | Source |
|---|---|---|
| Stack | React 19 + Vite 8 SPA, prerendered | `package.json` \| Code \| High |
| Languages | `en`, `ar`, `ms` | `src/content/articles/index.ts` `ARTICLE_LANGS` \| Code \| High |
| Article store | Typed TS modules, one per language | `src/content/articles/{en,ar,ms}.ts` \| Code \| High |
| Article schema | `Article` interface — 20 fields incl. `focusKeyword`, `keyTakeaway`, `faqs`, `related`, `ogImage` | `src/content/articles/types.ts` \| Code \| High |
| Body markup | Blocks: `p`,`h3`,`h4`,`ul`,`ol`,`note`,`table`,`image`. Inline: **only** `**bold**` and `[label](href)` | `types.ts` \| Code \| High |
| Slug registry | `src/content/articles/slugs.json`, **throws on drift** vs the content modules | `index.ts` lines 30–41 \| Code \| High |
| Images | Keyed map, 12 keys, imported from `src/assets/images` | `src/content/articles/images.ts` \| Code \| High |
| Routes | Enumerated in the prerender script from `slugs.json` | `scripts/prerender.mjs` L18–39 \| Code \| High |
| Build | `npm run build:prerender` (llms → surfaces → tsc → vite → puppeteer) | `package.json` \| Code \| High |
| Gates present | `check:llms`, `check:ai`, `ai:coverage`, `ai:gate`, `ai:answers` | `package.json` \| Code \| High |
| AI surfaces | `llms.txt`, `llms-ms.txt`, `llms-ar.txt`, `llms-full.txt`, `about.md`, `pricing.md`, `faq.md`, `AGENTS.md`, `AI-FACTS.yml` | repo + live \| Code \| High |
| Facts source of truth | `src/data/storeFacts.json` — seller, hours, 2 branches, prices, compliance | file \| Code \| High |
| `AI-FACTS.yml` | **Generated** by `scripts/ai/facts-sync.mjs`. Hand-editing is wrong here | `project_avoliveoil` memory + script \| Doc \| High |
| Git | `main` = `3de50b1`, working tree clean | `git status` \| Code \| High |

## Market and legal ceiling

**Malaysia.** Food Regulations 1985 Reg. 18(6) — food may not be labelled or advertised as
preventing, alleviating, treating or curing any disease.

The project already carries this in machine-readable form at `storeFacts.json` → `compliance`,
in all three languages. **Every article in this round imports that ceiling rather than restating
it.** Benefit words belong in keyword lists as things people type, never as claims about the oil.

## Deploy

| Fact | Value |
|---|---|
| Host | `ftp.avoliveoil.com` → 162.0.215.47, explicit FTPS port 21, chrooted — `/` **is** the web root |
| Script | `python scripts/ftp-deploy.py --skip-static` (skips `dist/assets` whose remote SIZE matches) |
| Credential | `AVO_FTP_PASS` — **not set in the shell**; recovered from `reference_avoliveoil_hosting` |
| Verify | By **bytes or body**. The SPA fallback answers 200 for files that do not exist |

## Capability probe — run 2026-08-20

| Capability | Result |
|---|---|
| Free image generation | ✅ working via keyless provider, 26 KB WebP at 1600×900. `MODELSCOPE_API_KEY` is set but returns **401** — zimage falls through automatically |
| Python HTTPS | ⚠ requires the TLS shim; both PRESS tools carry it |
| Keyword Planner | ✅ Google Ads MCP, geo 2458, read-only |
| Search Console | ❌ **not connected for this property** — no live ranking data available this round. Keyword volumes only |
| Gate runner | ✅ control-tested against two live articles; found 3 real defects |

## Platform constraints that bind this round

1. **⛔ Arabic slugs cannot be native script.** `public/.htaccess` L32–33 routes blog articles with
   `RewriteRule ^(en|ar|ms)/blog/([a-z0-9-]+)/?$`. Arabic characters never match that class, so the
   prerendered `index.html` is skipped and the request falls through to the SPA shell — a crawler
   then sees no article meta and no JSON-LD. Percent-encoded paths would also have to survive the
   prerender writer, the sitemap, and an FTP upload of UTF-8 directory names.
   **Degradation taken:** Arabic slugs are ASCII transliteration. Malay slugs are native Malay
   words, which are Latin script already, so the native-script ruling is fully met there.
   Changing this later means 301s, so it is recorded as a decision, not left implicit.
2. **Only 12 image keys exist** and `ImageKey` is a closed union in `types.ts`. New images require
   both the asset import and a union member, or `tsc -b` fails the build.
3. **The build already ships 26 MB, of which ~26 MB is unoptimised PNG.** A round payload ceiling is
   mandatory, not advisory.
4. **`ai:gate` 429s itself** on this host after ~20 rapid requests — expected, not a defect.
5. **`ai:gate` reports a false "no /{lang}/llms.txt links"** — this site publishes `/llms-ms.txt`,
   not `/ms/llms.txt`. Do not "fix" the site to satisfy the pattern.
