# Round 1 rollback

Pre-round state, recorded before Stage 5 wrote anything into the repo.

| Item | Value |
|---|---|
| Baseline commit | `3de50b1ac849fb87ec95cae37e9786e6da652eb5` on `main` |
| Round branch | `press-round-1` |
| Working tree at baseline | clean |
| Live site at baseline | 45 URLs, 3 blog articles per language |

## To undo the whole round, locally

```bash
git checkout main
git branch -D press-round-1
```

## To undo after it has been merged

```bash
git revert --no-commit <merge-or-round-commit>
git commit -m "Revert PRESS round 1"
npm run build:prerender
AVO_FTP_PASS=... python scripts/ftp-deploy.py --clean
```

`--clean` is required on the redeploy: it deletes the remote article directories the
round created. Without it the old URLs keep serving from the server even though
nothing links to them, and the sitemap no longer lists them.

## Files this round touches

- `src/content/articles/{en,ms,ar}.ts` — new Article objects appended
- `src/content/articles/slugs.json` — 15 new ids
- `src/content/articles/manifest.json` — new file, feeds the llms.txt article index
- `src/content/articles/{types,images}.ts` — 30 new ImageKey members and imports
- `src/assets/images/press/` — new directory, 30 WebP files
- `public/og/` — 15 new JPEG cards
- `src/content/llms/{en,ms,ar}.txt` — one `{{ARTICLES}}` section each
- `scripts/build-llms.mjs` — generates that section from the manifest
- `src/components/SEO.tsx` — hreflang now follows `pathByLang` instead of ALL_LANGS
- `scripts/press-import.py`, `scripts/press-images.py` — new tooling
