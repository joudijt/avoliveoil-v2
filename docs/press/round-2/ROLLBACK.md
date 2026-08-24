# Round 2 rollback

Pre-round state, recorded before Stage 5 wrote anything into the repo.

| Item | Value |
|---|---|
| Baseline commit | `ef332fd` on `main` (round 1's deploy record) |
| Round branch | `press-round-2` |
| Working tree at baseline | clean |
| Live site at baseline | 60 URLs, 18 article ids (8 en / 11 ms / 5 ar counting all languages) |

## To undo the whole round, locally

```bash
git checkout main
git branch -D press-round-2
```

## To undo after it has been merged

```bash
git revert --no-commit <merge-or-round-commit>
git commit -m "Revert PRESS round 2"
npm run build:prerender
AVO_FTP_PASS=... python scripts/ftp-deploy.py --clean
```

`--clean` is required on the redeploy: it deletes the remote article directories the round
created. Without it the old URLs keep serving from the server even though nothing links to them,
and the sitemap no longer lists them. On this host a deleted path still answers **200** with the
442-byte SPA shell, so confirm a deletion by comparing bytes, never by status code.

## What round 2 touched outside `docs/`

| Path | Change |
|---|---|
| `src/content/articles/{en,ms,ar}.ts` | one appended `PRESS round 2` block per language, 3 articles each |
| `src/content/articles/slugs.json` | 9 new ids |
| `src/content/articles/manifest.json` | 9 new entries (feeds the `{{ARTICLES}}` index in llms*.txt) |
| `src/content/articles/types.ts` | 18 new `ImageKey` union members |
| `src/content/articles/images.ts` | 18 new imports and map entries |
| `src/assets/images/press/` | 18 new WebP files, all cropped from existing repo photos |
| `public/og/` | 9 new JPEG cards |
| `scripts/press-import.py` | round number no longer hardcoded to 1 — a round-2 blocker, fixed |
