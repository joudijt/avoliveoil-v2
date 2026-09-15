# PRESS round 8 — rollback

Pre-round state captured **before Stage 5 touched anything** (gates.md check 26c).

| Item | Value at capture |
|---|---|
| Branch | `main` |
| Commit | `dc2df07` ("Performance: 4,996 KB and ~16 s on a phone down to 577 KB and ~5 s") |
| Working tree | clean |
| Article instances | **123** — en 41 / ms 44 / ar 38 |
| `slugs.json` entries | 117 |
| `manifest.json` entries | 123 |
| Sitemap URLs | 159 |
| Round branch | `press-round-gsc`, cut from `main` at `dc2df07` |

## Pre-existing gate state (NOT caused by this round)

| Gate | Result at capture |
|---|---|
| `check:slugs` | PASS — en 41 / ar 38 / ms 44, slugs.json agrees |
| `check:images` | PASS — 22 sources |
| `check:llms` | **FAIL (pre-existing)** — all three `public/llms*.txt` are checked out with CRLF; `build-llms.mjs` renders LF, so `current !== rendered` on every fresh Windows checkout. `git diff` is empty, so the committed content is correct. The repo has **no `.gitattributes`**. `npm run build` runs `build:llms` (write), not `check:llms`, so a release self-heals. |
| `check:ai` | PASS — AI-FACTS.yml in sync with storeFacts.json |
| `check:heads` | PASS — 160 routes, 0 problems |
| `check:brand` | PASS — all 15 brand assets |

## Rollback commands

```
# before merge
git checkout main && git branch -D press-round-gsc

# after merge, before push
git reset --hard dc2df07

# after push
revert the merge commit; force-push only with explicit approval
```

⛔ Never `git stash` on this repo — a builder agent once stashed seven agents' work.
