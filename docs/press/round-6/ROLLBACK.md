# PRESS round 6 — rollback

| Thing | Value |
|---|---|
| Branch at start | `main` |
| Commit at start | `084903a0940e5e8b52f52e3e493730cd7cb63863` |
| Live article instances | 87 (29 en / 32 ms / 26 ar) |
| Sitemap URLs | 123 |
| Round branch | `press-round-6` |

```
git checkout main && git reset --hard 084903a0940e5e8b52f52e3e493730cd7cb63863
npm run build:prerender && npm run sitemap
AVO_FTP_PASS=... python scripts/ftp-deploy.py --skip-static --clean
```

## What Stage 5 wrote this round

- `src/content/articles/{en,ms,ar}.ts` — a round-6 block appended to each
- `src/content/articles/slugs.json` — 18 new id -> slug entries (99 total)
- `src/content/articles/types.ts` / `images.ts` — new ImageKey union members + map entries
- `src/assets/images/press/` — every article's hero+inline **site-wide** re-cut (192 files)
- `public/og/` — every article's OG card **site-wide** re-cut (96 files)
- `public/llms*.txt` — regenerated
- `docs/press/image-plan.json`, `docs/press/frame-alt.json` — the site-wide image assignment
