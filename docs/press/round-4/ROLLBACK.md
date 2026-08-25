# PRESS round 4 — rollback

Pre-round state recorded before Stage 5 touched anything.

| Thing | Value |
|---|---|
| Branch at start | `main` |
| Commit at start | `0916f628940b9089cd2f00b6b08ce5e9d961fa1a` |
| Live article instances | 51 (17 en / 20 ms / 14 ar) |
| Sitemap URLs | 87 |
| Round branch | `press-round-4` |

## Revert the code

```
git checkout main
git reset --hard 0916f628940b9089cd2f00b6b08ce5e9d961fa1a
npm run build:prerender && npm run sitemap
AVO_FTP_PASS=... python scripts/ftp-deploy.py --skip-static --clean
```

`--clean` is what removes the round's files from the server. Without it the old article
directories stay live and answer 200 as orphans.

## What Stage 5 writes

- `src/content/articles/{en,ms,ar}.ts` — a `PRESS round 4` block appended to each
- `src/content/articles/slugs.json` — 18 new id -> slug entries
- `src/content/articles/types.ts` — 36 new `ImageKey` union members
- `src/content/articles/images.ts` — 36 imports + 36 map entries
- `src/assets/images/press/` — 36 new webp files
- `public/og/` — 18 new jpg cards
- `public/llms*.txt` — regenerated
- existing article modules — `related` arrays edited to link inbound to the new children
