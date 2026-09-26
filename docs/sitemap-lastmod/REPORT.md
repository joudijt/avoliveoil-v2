# Sitemap lastmod — REPORT (2026-09-26)
Commit `66d2e4f` on branch press-round-10 (the live branch). Not merged, not pushed.

**Dates**
- 148 articles use each article's own `dateModified`. Before, they all said 2026-08-01, which predated most of them.
- Blog indexes use the newest article: en 09-15, ms 09-10, ar 08-26.
- 33 static/infused pages come from `scripts/sitemap-manifest.json`: 08-14 (`426c7f2`) or 07-31 (`60ada23`).
- Excluded non-content commits: dc2df07, c88a180, 42b66c0, 18683bf, 0579566.

**Deployed 2026-09-26:** `scripts/upload-one.py dist/sitemap.xml` uploaded ONLY /sitemap.xml. Bytes verified; sha1 2d767701fd03f4ed04f9b6c39011add80ad6430f; 184/184 URLs have lastmod.

**Open owner decision:** the 09-20 image re-cut (`7cccb1a`) and later related-links additions did not bump dateModified.
