# PRESS round 5 — rollback

| Thing | Value |
|---|---|
| Branch at start | `main` |
| Commit at start | `fb7aa662f5c6bd82b20df44a68bd1ed4a4045cae` |
| Live article instances | 69 (23 en / 26 ms / 20 ar) |
| Sitemap URLs | 105 |
| Round branch | `press-round-5` |

```
git checkout main && git reset --hard fb7aa662f5c6bd82b20df44a68bd1ed4a4045cae
npm run build:prerender && npm run sitemap
AVO_FTP_PASS=... python scripts/ftp-deploy.py --skip-static --clean
```

`--clean` is what removes the round's files from the server; without it the article
directories stay live as orphans answering 200.
