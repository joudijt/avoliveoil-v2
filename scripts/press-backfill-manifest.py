#!/usr/bin/env python
"""
Backfill the llms.txt article manifest with articles that predate PRESS.

scripts/press-import.py writes a manifest entry for every article it imports, so
the llms.txt index is generated rather than hand-typed. Articles that existed
before the first round have no entry, which would leave the generated index
listing only the newest articles — the exact staleness the manifest exists to
prevent.

Reading TypeScript with regular expressions is fragile, so every extracted entry
is checked against slugs.json before it is accepted, and anything that does not
match is skipped loudly rather than written.

    python scripts/press-backfill-manifest.py
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src" / "content" / "articles"
LANGS = ("en", "ms", "ar")

# A single-quoted TS string, allowing escaped quotes inside it.
QUOTED = r"'((?:[^'\\]|\\.)*)'"


def field(block: str, name: str) -> str | None:
    # `^` with MULTILINE, not a literal newline: splitting on the object opener
    # consumes it, so the first field of each block has no newline before it and
    # a leading-\n pattern silently matches nothing.
    match = re.search(r"^    " + name + r":\s*\n?\s*" + QUOTED, block, re.M)
    return match.group(1).replace("\\'", "'") if match else None


def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        pass

    slugs = json.loads((ARTICLES / "slugs.json").read_text(encoding="utf-8"))
    manifest_path = ARTICLES / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else []
    known = {(m["id"], m["lang"]) for m in manifest}

    added, skipped = 0, []
    for lang in LANGS:
        src = (ARTICLES / f"{lang}.ts").read_text(encoding="utf-8")
        for block in re.split(r"\n  \{\n", src)[1:]:
            article_id = field(block, "id")
            if not article_id or (article_id, lang) in known:
                continue
            entry = {
                "id": article_id,
                "lang": lang,
                "slug": field(block, "slug"),
                "h1": field(block, "h1"),
                "excerpt": field(block, "excerpt"),
                "focusKeyword": field(block, "focusKeyword"),
            }
            missing = [k for k, v in entry.items() if not v]
            if missing:
                skipped.append(f"{article_id}/{lang}: could not extract {missing}")
                continue
            if entry["slug"] != slugs.get(article_id, {}).get(lang):
                skipped.append(f"{article_id}/{lang}: slug disagrees with slugs.json")
                continue
            manifest.append(entry)
            known.add((article_id, lang))
            added += 1

    manifest.sort(key=lambda m: (m["lang"], m["id"]))
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for line in skipped:
        print(f"SKIP {line}")
    print(f"added {added} entries; manifest now holds {len(manifest)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
