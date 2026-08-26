# PRESS round 7 — rollback

Pre-round state: branch `main`, commit `b187c8b`, 105 live article instances (en 35 / ms 38 /
ar 32), sitemap 141 URLs.

Branch: `press-round-7`, off `main` at `b187c8b`.

To roll back before merge: `git checkout main && git branch -D press-round-7`.
To roll back after merge but before push: `git reset --hard b187c8b` on `main`.
To roll back after push: revert the merge commit, force-push only with explicit approval.

## What Stage 5 wrote this round

- `src/content/articles/{en,ms,ar}.ts` — 18 new articles imported + 18 inbound links + review fixes
  (fabricated flavour name, cake pan/temp, broken link, quantity mismatch) patched directly since
  the round-7 marker was already present when the fixes landed.
- `src/content/articles/slugs.json` (99 → 117), `manifest.json` (105 → 123), `types.ts`, `images.ts`
- `src/assets/images/press/*-{hero,inline}.webp` — all 228 heroes/inlines site-wide, re-cut
- `public/og/blog-*.jpg` — all 114 OG cards site-wide, re-cut
- `public/llms.txt`, `llms-ms.txt`, `llms-ar.txt`, `llms-full.txt` — regenerated
- `public/sitemap.xml` — 141 → 159 URLs
- `docs/press/ROUND-7-MAP.md`, `docs/press/round-7/BRIEF.md`, `GATE.md`, `inbound-links.py`
- `docs/press/DECISIONS.md` — round 7 section, D46
