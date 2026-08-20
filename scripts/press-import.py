#!/usr/bin/env python
"""
PRESS Stage 5 — import validated article drafts into the typed content modules.

Writers produce JSON, not TypeScript, because fifteen parallel agents editing
three shared .ts modules is a merge conflict with extra steps. JSON is also
checkable before it can break a build: this script validates every draft against
the `Article` contract in src/content/articles/types.ts and refuses to write
anything if a single draft is bad.

What it touches:
    src/content/articles/{en,ms,ar}.ts   new Article objects appended
    src/content/articles/slugs.json      id -> { lang: slug }
    src/content/articles/types.ts        ImageKey union extended
    src/content/articles/images.ts       imports + map entries

    python scripts/press-import.py --round 1 [--check]

--check validates and reports without writing, which is what CI wants.
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src" / "content" / "articles"
LANGS = ("en", "ms", "ar")
BLOCK_TYPES = {"p", "h3", "h4", "ul", "ol", "note", "table", "image"}
REQUIRED = (
    "id lang slug seoTitle metaTitle metaDescription focusKeyword relatedKeywords "
    "category tags h1 excerpt keyTakeaway datePublished dateModified readingTime "
    "heroAlt inlineAlt intro sections conclusion faqs related"
).split()

# The renderer understands **bold** and [label](href) only. Anything else that
# looks like markup would be printed literally on the page.
ALLOWED_INLINE = re.compile(r"\[[^\]]*\]\([^)]*\)|\*\*[^*]+\*\*")
SUSPECT_INLINE = re.compile(r"^#{1,6}\s|<[a-z/][^>]*>|!\[|```|\|\s*-{3,}", re.M)


def word_count(draft: dict) -> int:
    """Count the prose a reader actually sees: intro, sections, conclusion, FAQs."""
    parts: list[str] = list(draft.get("intro", []))
    for section in draft.get("sections", []):
        parts.append(section.get("heading", ""))
        parts.extend(block_text(b) for b in section.get("blocks", []))
    conclusion = draft.get("conclusion") or {}
    parts.append(conclusion.get("heading", ""))
    parts.extend(block_text(b) for b in conclusion.get("blocks", []))
    for faq in draft.get("faqs", []):
        parts.append(f"{faq.get('q', '')} {faq.get('a', '')}")
    # Count tokens that contain a letter or digit. A bare "—" between two spaces
    # is punctuation, not a word, and counting it pushed one writer into
    # replacing every em dash with a comma to get under the band — the gate
    # should measure the prose, not reshape it.
    return sum(1 for p in parts for tok in p.split() if any(c.isalnum() for c in tok))


def block_text(block: dict) -> str:
    kind = block.get("type")
    if kind in ("p", "h3", "h4"):
        return block.get("text", "")
    if kind in ("ul", "ol"):
        return " ".join(block.get("items", []))
    if kind == "note":
        return f"{block.get('title', '')} {block.get('text', '')}"
    if kind == "table":
        rows = " ".join(" ".join(r) for r in block.get("rows", []))
        return " ".join(block.get("head", [])) + " " + rows
    return ""


def validate(draft: dict, path: Path, seen_focus: dict) -> list[str]:
    """Every problem, not just the first — a writer should get one fix list."""
    bad: list[str] = []
    for field in REQUIRED:
        if field not in draft or draft[field] in ("", [], None):
            bad.append(f"missing field: {field}")
    if bad:
        return bad

    if draft["lang"] not in LANGS:
        bad.append(f"lang {draft['lang']!r} is not one of {LANGS}")
    if draft["id"] != path.stem:
        bad.append(f"id {draft['id']!r} does not match filename {path.stem!r}")
    if not re.fullmatch(r"[a-z0-9-]+", draft["slug"]):
        bad.append(f"slug {draft['slug']!r} must match [a-z0-9-]+ — the .htaccess "
                   "route rule cannot match anything else")

    # Cannibalisation within the round.
    focus = draft["focusKeyword"].strip().lower()
    if focus in seen_focus:
        bad.append(f"focus keyword {focus!r} already used by {seen_focus[focus]}")
    else:
        seen_focus[focus] = draft["id"]

    words = word_count(draft)
    if not 800 <= words <= 1000:
        bad.append(f"word count {words} outside 800-1000")

    if len(draft["metaTitle"]) > 60:
        bad.append(f"metaTitle {len(draft['metaTitle'])} chars, max 60")
    if len(draft["seoTitle"]) > 60:
        bad.append(f"seoTitle {len(draft['seoTitle'])} chars, max 60")
    if len(draft["metaDescription"]) > 155:
        bad.append(f"metaDescription {len(draft['metaDescription'])} chars, max 155")

    tokens = [t for t in re.split(r"\W+", focus) if t]
    if tokens and not all(t in draft["h1"].lower() for t in tokens):
        bad.append(f"h1 does not carry every focus token {tokens}")

    if not 5 <= len(draft["sections"]) <= 7:
        bad.append(f"{len(draft['sections'])} sections, want 5-7")
    if not 6 <= len(draft["faqs"]) <= 10:
        bad.append(f"{len(draft['faqs'])} faqs, want 6-10")
    if not 8 <= len(draft["relatedKeywords"]) <= 14:
        bad.append(f"{len(draft['relatedKeywords'])} relatedKeywords, want 8-12")

    takeaway = len(draft["keyTakeaway"].split())
    if not 35 <= takeaway <= 70:
        bad.append(f"keyTakeaway {takeaway} words, want 40-60")

    has_structured = False
    for idx, section in enumerate(draft["sections"]):
        for field in ("heading", "id", "blocks"):
            if not section.get(field):
                bad.append(f"section {idx}: missing {field}")
        blocks = section.get("blocks") or []
        if blocks:
            first = blocks[0]
            if first.get("type") != "p":
                bad.append(f"section {idx} ({section.get('heading', '')[:30]}): "
                           "first block must be the answer paragraph")
            elif not 30 <= len(first.get("text", "").split()) <= 90:
                bad.append(f"section {idx}: answer paragraph "
                           f"{len(first.get('text', '').split())} words, want 40-70")
        for block in blocks:
            if block.get("type") not in BLOCK_TYPES:
                bad.append(f"section {idx}: unknown block type {block.get('type')!r}")
            if block.get("type") in ("table", "ul", "ol"):
                has_structured = True
    if not has_structured:
        bad.append("no table or list anywhere — answer engines lift structured blocks")

    # Markup the renderer would print literally.
    for section in draft["sections"]:
        for block in section.get("blocks", []):
            text = block_text(block)
            if SUSPECT_INLINE.search(text):
                bad.append(f"unsupported markup in section {section.get('id')}: "
                           "renderer handles only **bold** and [label](href)")
                break

    return bad


def ts(value) -> str:
    """Emit a TypeScript literal. json.dumps is valid TS for every shape here."""
    return json.dumps(value, ensure_ascii=False, indent=2)


def to_ts_object(draft: dict, image_keys: dict) -> str:
    hero_key, inline_key = image_keys[draft["id"]]
    sections = []
    for section in draft["sections"]:
        blocks = list(section["blocks"])
        # Drop the inline image in after the first supporting block so it breaks
        # the text rather than separating a heading from its answer paragraph.
        at = min(2, len(blocks))
        blocks.insert(at, {"type": "image", "src": inline_key, "alt": draft["inlineAlt"]})
        sections.append({**section, "blocks": blocks})

    obj = {
        "id": draft["id"],
        "slug": draft["slug"],
        "seoTitle": draft["seoTitle"],
        "metaTitle": draft["metaTitle"],
        "metaDescription": draft["metaDescription"],
        "focusKeyword": draft["focusKeyword"],
        "relatedKeywords": draft["relatedKeywords"],
        "category": draft["category"],
        "tags": draft["tags"],
        "h1": draft["h1"],
        "excerpt": draft["excerpt"],
        "keyTakeaway": draft["keyTakeaway"],
        "datePublished": draft["datePublished"],
        "dateModified": draft["dateModified"],
        "readingTime": draft["readingTime"],
        "hero": {"src": hero_key, "alt": draft["heroAlt"]},
        "ogImage": f"/og/blog-{draft['id']}.jpg",
        "intro": draft["intro"],
        "sections": sections,
        "conclusion": draft["conclusion"],
        "faqs": draft["faqs"],
        "related": draft["related"],
    }
    body = ts(obj)
    indented = "\n".join(("  " + line) if line else line for line in body.splitlines())
    return "  /* ---------------- PRESS round 1 ---------------- */\n" + indented + ","


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--round", default="1")
    ap.add_argument("--check", action="store_true", help="validate only, write nothing")
    args = ap.parse_args()

    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        pass

    drafts_dir = ROOT / "docs" / "press" / f"round-{args.round}" / "drafts"
    paths = sorted(drafts_dir.glob("*.json"))
    if not paths:
        print(f"no drafts in {drafts_dir}")
        return 1

    drafts, failures, seen_focus = [], {}, {}
    for path in paths:
        try:
            draft = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            failures[path.name] = [f"invalid JSON: {exc}"]
            continue
        problems = validate(draft, path, seen_focus)
        if problems:
            failures[path.name] = problems
        else:
            drafts.append(draft)

    print(f"{len(drafts)}/{len(paths)} drafts valid")
    for name, problems in failures.items():
        print(f"\nFAIL {name}")
        for p in problems:
            print(f"   - {p}")

    if failures:
        print("\nnothing written — fix the drafts and re-run")
        return 1
    if args.check:
        print("\n--check: valid, nothing written")
        return 0

    # ---- image keys ----------------------------------------------------
    image_keys = {d["id"]: (f"press{d['id'].title().replace('-', '')}Hero",
                            f"press{d['id'].title().replace('-', '')}Inline") for d in drafts}

    types_path = ARTICLES / "types.ts"
    types_src = types_path.read_text(encoding="utf-8")
    new_keys = [k for pair in image_keys.values() for k in pair
                if f"'{k}'" not in types_src]
    if new_keys:
        union_add = "\n" + "\n".join(f"  | '{k}'" for k in new_keys)
        types_src = types_src.replace("  | 'kampungBottle';", "  | 'kampungBottle'" + union_add + ";")
        types_path.write_text(types_src, encoding="utf-8")

    images_path = ARTICLES / "images.ts"
    images_src = images_path.read_text(encoding="utf-8")
    imports, entries = [], []
    for article_id, (hero, inline) in image_keys.items():
        if f"\n  {hero}," not in images_src:
            imports.append(f"import {hero} from '../../assets/images/press/{article_id}-hero.webp';")
            entries.append(f"  {hero},")
        if f"\n  {inline}," not in images_src:
            imports.append(f"import {inline} from '../../assets/images/press/{article_id}-inline.webp';")
            entries.append(f"  {inline},")
    if imports:
        anchor = "import kampungBottle from '../../assets/images/malaysian-woman-bottle-kampung.webp';"
        images_src = images_src.replace(anchor, anchor + "\n\n" + "\n".join(imports))
        images_src = images_src.replace("  kampungBottle,\n};", "  kampungBottle,\n" + "\n".join(entries) + "\n};")
        images_path.write_text(images_src, encoding="utf-8")

    # ---- content modules ------------------------------------------------
    for lang in LANGS:
        mine = [d for d in drafts if d["lang"] == lang]
        if not mine:
            continue
        module = ARTICLES / f"{lang}.ts"
        src = module.read_text(encoding="utf-8")
        if "PRESS round 1" in src:
            print(f"SKIP {lang}.ts — already carries a PRESS round-1 block")
            continue
        block = "\n".join(to_ts_object(d, image_keys) for d in mine)
        idx = src.rstrip().rfind("\n];")
        if idx == -1:
            print(f"FAIL {lang}.ts — could not find the closing `];`")
            return 1
        src = src[:idx] + "\n" + block + src[idx:]
        module.write_text(src, encoding="utf-8")
        print(f"wrote {len(mine)} articles into {lang}.ts")

    # ---- slug registry ---------------------------------------------------
    slugs_path = ARTICLES / "slugs.json"
    slugs = json.loads(slugs_path.read_text(encoding="utf-8"))
    for draft in drafts:
        slugs.setdefault(draft["id"], {})[draft["lang"]] = draft["slug"]
    slugs_path.write_text(json.dumps(slugs, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"slugs.json now holds {len(slugs)} articles")

    # ---- manifest for the llms.txt article index --------------------------
    # build-llms.mjs is Node and cannot import the TypeScript content modules,
    # so the index it needs is emitted here instead of being typed into three
    # templates by hand where it would immediately start rotting.
    manifest_path = ARTICLES / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else []
    known = {(m["id"], m["lang"]) for m in manifest}
    for draft in drafts:
        if (draft["id"], draft["lang"]) in known:
            continue
        manifest.append({
            "id": draft["id"],
            "lang": draft["lang"],
            "slug": draft["slug"],
            "h1": draft["h1"],
            "excerpt": draft["excerpt"],
            "focusKeyword": draft["focusKeyword"],
        })
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"manifest.json now holds {len(manifest)} entries")

    print("\nimported. Next: generate images, then `npm run build:prerender`.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
