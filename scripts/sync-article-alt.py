"""Point every article's alt text at the frame it actually carries.

`recut-article-images.py` writes `docs/press/image-plan.json` saying which source photo each
article's hero and inline were cut from. This rewrites the alt text in the three content modules
to that photo's description, in the article's language.

The modules do not store `heroAlt` / `inlineAlt` — those are draft-only fields. On disk the hero
alt sits in `hero: { src, alt }` and the inline alt on every `{type: "image", src, alt}` block,
repeated once per section. Both quoted (rounds 1+) and unquoted (round 1) key styles occur.

An alt that describes a picture the page is not showing is a worse defect than a weak lead image
(D26), and after a site-wide re-cut every alt is stale.
"""
import io
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src" / "content" / "articles"

# the article-level id is the one immediately followed by the slug
ARTICLE_RE = re.compile(r"""["']?id["']?\s*:\s*["']([a-z0-9\-]+)["']\s*,\s*\n\s*["']?slug["']?\s*:""")
HERO_RE = re.compile(r"""(["']?hero["']?\s*:\s*\{\s*\n\s*["']?src["']?\s*:\s*["'][A-Za-z0-9]+["']\s*,\s*\n\s*["']?alt["']?\s*:\s*)(["'])(.*?)(?<!\\)\2""", re.S)
INLINE_RE = re.compile(r"""(["']?src["']?\s*:\s*["'][A-Za-z0-9]*Inline["']\s*,\s*\n\s*["']?alt["']?\s*:\s*)(["'])(.*?)(?<!\\)\2""", re.S)


def main():
    plan = json.loads((ROOT / "docs" / "press" / "image-plan.json").read_text(encoding="utf-8"))
    frames = json.loads((ROOT / "docs" / "press" / "frame-alt.json").read_text(encoding="utf-8"))
    want = {(p["id"], p["slot"]): frames[p["src"]][p["lang"]] for p in plan}

    changed = missing = 0
    for lang in ("en", "ms", "ar"):
        path = ARTICLES / f"{lang}.ts"
        src = io.open(path, encoding="utf-8").read()
        marks = [(m.start(), m.group(1)) for m in ARTICLE_RE.finditer(src)]
        for n in range(len(marks) - 1, -1, -1):
            pos, aid = marks[n]
            stop = marks[n + 1][0] if n + 1 < len(marks) else len(src)
            block = src[pos:stop]
            new_block = block

            hero_alt = want.get((aid, "hero"))
            if hero_alt:
                m = HERO_RE.search(new_block)
                if not m:
                    missing += 1
                elif m.group(3) != hero_alt:
                    q = m.group(2)
                    new_block = new_block[:m.start()] + m.group(1) + q + hero_alt + q + new_block[m.end():]
                    changed += 1

            inline_alt = want.get((aid, "inline"))
            if inline_alt:
                hits = list(INLINE_RE.finditer(new_block))
                if not hits:
                    missing += 1
                for m in reversed(hits):
                    if m.group(3) == inline_alt:
                        continue
                    q = m.group(2)
                    new_block = new_block[:m.start()] + m.group(1) + q + inline_alt + q + new_block[m.end():]
                    changed += 1

            if new_block != block:
                src = src[:pos] + new_block + src[stop:]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)

    print(f"alt strings rewritten to the real frame: {changed}")
    if missing:
        print(f"no alt found for {missing} article/slot pairs — check those by hand")
    return 0


if __name__ == "__main__":
    sys.exit(main())
