# PRESS round 3 — rollback

Pre-round state, captured before Stage 5 touched a file:

| Thing | Value |
|---|---|
| Baseline commit | `91682c7` — also written to `docs/press/round-3/.baseline-sha` |
| Branch the round was built on | `press-round-3`, cut from `main` at that commit |
| Sitemap before | 69 URLs |
| Sitemap after | 87 URLs |
| Article instances before | 33 (en 11 / ms 14 / ar 8) |
| Article instances after | 51 (en 17 / ms 20 / ar 14) |
| `slugs.json` ids before / after | 27 / 45 |

## Undo before the merge

```bash
git checkout main
git branch -D press-round-3
```

Nothing on `main` changed, and no file outside the branch was written.

## Undo after the merge

```bash
git revert --no-commit <merge-sha>
git commit -m "Revert PRESS round 3"
npm run sitemap          # NOT part of build:prerender on this repo — run it explicitly
npm run build:prerender
AVO_FTP_PASS=... python scripts/ftp-deploy.py --skip-static
```

The 18 URLs will 404 after that redeploy, which is correct for content that was never
meant to exist — do **not** 301 them anywhere.

## Undo after the deploy, without a rebuild

Every round-3 file is additive. Deleting these from the server removes the round without
touching a single round-1 or round-2 file:

- `en/blog/<slug>/index.html` ×6, `ms/blog/<slug>/index.html` ×6, `ar/blog/<slug>/index.html` ×6
- `og/blog-<id>.jpg` ×18
- the hashed `assets/*.webp` heroes and inlines this round added (36 files)

Then restore `sitemap.xml`, `llms.txt`, `llms-ms.txt`, `llms-ar.txt` and `llms-full.txt` from
the `91682c7` build and re-upload them, because all five carry the round's articles.
