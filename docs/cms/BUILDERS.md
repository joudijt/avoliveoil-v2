# Parallel build rules (all builders) — CMS FORGE 2026-10-01

* Repo `E:\avoliveoil-v2`, branch `cms-forge`. Stay on it. **Do not commit, do not push, do not deploy** — the
  integrator commits. Do not touch files outside your ownership list (spec §14.3). If you need a change in someone
  else's file, write it under "Requests for other builders" in your final report instead.
* Read `docs/cms/CMS-SPEC.md` fully (§13 and §14 are binding and override earlier sections) and
  `src/cms/contracts.ts` + `src/cms/doc.ts` (frozen — do not edit; add new files instead).
* Windows machine, Git Bash + PowerShell. PHP 8.4.24 CLI is on PATH (pdo_sqlite, gd+webp, Dom\HTMLDocument).
  Node/npm present. Docker is NOT running — don't start it.
* **Build lock**: before ANY `npm run build`, `npm run build:prerender`, `vite build` or `npm run prerender`,
  acquire the lock with `mkdir E:/avoliveoil-v2/.build.lock` (fails if it exists → wait 30 s and retry, up to
  20 min) and `rmdir` it when done, even on failure. `tsc --noEmit` and `oxlint` need no lock.
* Other builders are editing the same tree at the same time. Type errors in files you don't own that appear
  mid-flight are theirs — re-run later; only fix your own.
* Kill every server you start (vite, php -S, preview) before you finish. Use ports: B2 8091, B3a 5181/4181,
  B3b 5182/4182, B4 5183/4183.
* Code style: match the repo (TypeScript strict, Tailwind v4 classes, comments only where they explain WHY).
  Owner-facing text in the admin is plain English; errors are actionable ("Add at least one email address").
* Final report: files created/changed, what you verified (commands + results), anything not done, requests for
  other builders.
