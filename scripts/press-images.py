#!/usr/bin/env python
"""
PRESS Stage 4 — generate every image a round needs, inside a payload ceiling.

For each validated draft: a hero (1600x900), one inline (1200x675), and an OG
card (1200x630). The OG is derived from the hero by centre-crop rather than
generated separately — a second generation would cost another download, another
150 KB, and would show the reader a different picture than the one they clicked.

Prompts are built from the writer's own alt text plus a fixed house style, so the
round looks like the site rather than like a stock library. Text, logos and
numbers are never put in a prompt: generators garble them and the result cannot
go on a commercial page.

    python scripts/press-images.py --round 1 [--only <id>] [--ceiling-mb 6]

Existing files are skipped, so a re-run after a partial failure costs nothing.
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMGEN = Path(r"C:\Users\tarek\.claude\skills\press\bin\imgen.py")
ASSETS = ROOT / "src" / "assets" / "images" / "press"
OG_DIR = ROOT / "public" / "og"

# Warm and sunlit like the existing site photography — but note what is NOT here.
# An earlier version leaned on "shallow depth of field" and fed the writer's alt
# text in verbatim. Alt text describes a scene for a reader ("a shopper reading a
# back label in a shop aisle"), which the model cannot stage, so it fell back on
# what the style words alone suggested and returned abstract bokeh with no
# subject at all. Two of the first three heroes were unusable. Subject first,
# sharp focus stated explicitly, and the depth-of-field language removed.
HOUSE_STYLE = (
    "professional food product photography, sharp focus on the subject, "
    "subject fills the frame, warm natural sunlight, rustic wooden surface, "
    "olive green and amber palette, clean simple composition, "
    "no text, no writing, no labels, no logos, 4K"
)

# Concrete, stageable subjects. A generator renders objects well and situations
# badly, so each article gets a still life it can actually produce rather than a
# narrative scene. Alt text stays as written for readers who cannot see them.
SCENES = {
    "hero": {
        "cold-pressed-olive-oil-explained": "a clear glass bottle of green extra virgin olive oil beside a pile of fresh green and black olives on a wooden table",
        "compare-olive-oil-brands-malaysia": "three dark glass olive oil bottles standing in a row on a wooden kitchen counter",
        "palestinian-olive-oil-origin": "an ancient gnarled olive tree with silver-green leaves and ripe olives on a terraced hillside",
        "olive-oil-price-malaysia": "two olive oil bottles of different sizes side by side on a wooden table, one small one large",
        "halal-olive-oil-malaysia": "a single glass bottle of golden green olive oil on a clean wooden table beside a sprig of olive leaves",
        "minyak-zaitun-untuk-masak": "a frying pan on a stove with olive oil being poured in, fresh vegetables and garlic beside it",
        "minyak-zaitun-extra-virgin-gred": "four small glass bowls of olive oil in different shades of green and gold arranged on dark wood",
        "harga-minyak-zaitun-malaysia": "two glass olive oil bottles of different sizes on a wooden table beside a small stack of coins",
        "beli-minyak-zaitun-kl": "wooden grocery shelves stocked with glass olive oil bottles and jars of olives in a small specialty shop",
        "jenama-minyak-zaitun-terbaik": "a dark green glass olive oil bottle standing upright on a wooden counter, olives scattered at its base",
        "minyak-zaitun-organik": "an olive branch heavy with ripe green olives beside a glass jug of olive oil on rustic wood",
        "minyak-zaitun-palestin": "hands cupping freshly harvested green olives above a woven basket in an olive grove",
        "minyak-zaitun-halal": "a sealed glass bottle of olive oil on a clean wooden table with olive branches arranged around it",
        "zayt-zaytun-falastini": "a terraced olive grove at golden hour with old olive trees and stone walls",
        "zayt-zaytun-lil-tabkh": "olive oil being drizzled from a glass bottle over a bowl of fresh salad on a wooden table",
    },
    "inline": {
        "cold-pressed-olive-oil-explained": "green olives being crushed into paste in a traditional stone olive mill",
        "compare-olive-oil-brands-malaysia": "a dark glass olive oil bottle beside a clear plastic one on a wooden surface, showing the contrast",
        "palestinian-olive-oil-origin": "ripe olives falling into a woven basket beneath an olive tree during harvest",
        "olive-oil-price-malaysia": "olive oil pouring in a thin golden stream from a bottle into a glass measuring jug",
        "halal-olive-oil-malaysia": "a close up of pure golden green olive oil in a clear glass bowl on wood",
        "minyak-zaitun-untuk-masak": "vegetables sizzling in olive oil in a hot pan, steam rising",
        "minyak-zaitun-extra-virgin-gred": "olive oil in a clear glass bowl with olive leaves resting beside it on dark wood",
        "harga-minyak-zaitun-malaysia": "a small glass bottle and a large glass bottle of olive oil standing together on a wooden shelf",
        "beli-minyak-zaitun-kl": "a wooden shop shelf lined with glass bottles of olive oil and jars of preserved olives",
        "jenama-minyak-zaitun-terbaik": "olive oil in a shallow tasting glass held up to warm daylight",
        "minyak-zaitun-organik": "an olive grove in soft morning light with wild grass growing between the trees",
        "minyak-zaitun-palestin": "a rustic stone olive press with fresh oil running from it into a metal basin",
        "minyak-zaitun-halal": "a glass bottle of olive oil beside a bowl of green olives on a linen cloth",
        "zayt-zaytun-falastini": "a farmer's hands holding a cluster of freshly picked olives with leaves attached",
        "zayt-zaytun-lil-tabkh": "flatbread torn beside a shallow dish of olive oil for dipping on a wooden board",
    },
}

GENERIC = "a glass bottle of extra virgin olive oil beside fresh olives on a rustic wooden table"


def prompt_for(article_id: str, kind: str) -> str:
    return f"{SCENES[kind].get(article_id, GENERIC)}. {HOUSE_STYLE}"


def generate(prompt: str, out: Path, width: int, height: int, max_kb: int, force: bool = False) -> bool:
    if out.exists() and out.stat().st_size > 0 and not force:
        print(f"  skip (exists) {out.name}")
        return True
    out.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        [sys.executable, str(IMGEN), prompt, "-o", str(out),
         "-W", str(width), "-H", str(height), "--max-kb", str(max_kb)],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if result.returncode != 0 or not out.exists():
        print(f"  FAIL {out.name}: {(result.stderr or '').strip()[-200:]}")
        return False
    print(f"  {result.stdout.strip()}")
    return True


def make_og(hero: Path, og: Path, force: bool = False) -> bool:
    """Centre-crop the hero to the 1.91:1 card ratio social platforms expect."""
    from PIL import Image

    if og.exists() and og.stat().st_size > 0 and not force:
        print(f"  skip (exists) {og.name}")
        return True
    if not hero.exists():
        return False
    og.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(hero) as im:
        im = im.convert("RGB")
        target = 1200 / 630
        w, h = im.size
        if w / h > target:                      # too wide, trim the sides
            new_w = int(h * target)
            im = im.crop(((w - new_w) // 2, 0, (w - new_w) // 2 + new_w, h))
        else:                                   # too tall, trim top and bottom
            new_h = int(w / target)
            im = im.crop((0, (h - new_h) // 2, w, (h - new_h) // 2 + new_h))
        im = im.resize((1200, 630), Image.LANCZOS)
        for quality in (86, 80, 72, 65):
            im.save(og, "JPEG", quality=quality, optimize=True)
            if og.stat().st_size // 1024 <= 140:
                break
    print(f"  OK {og.name} {og.stat().st_size // 1024}KB")
    return True


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--round", default="1")
    ap.add_argument("--only", help="one article id")
    ap.add_argument("--ceiling-mb", type=float, default=6.0)
    ap.add_argument("--force", action="store_true",
                    help="regenerate even if the file exists — for replacing a bad image")
    args = ap.parse_args()

    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:  # noqa: BLE001
        pass

    drafts_dir = ROOT / "docs" / "press" / f"round-{args.round}" / "drafts"
    paths = sorted(drafts_dir.glob("*.json"))
    if args.only:
        paths = [p for p in paths if p.stem == args.only]

    failed = []
    for path in paths:
        draft = json.loads(path.read_text(encoding="utf-8"))
        article_id = draft["id"]
        print(f"\n{article_id}")
        hero = ASSETS / f"{article_id}-hero.webp"
        inline = ASSETS / f"{article_id}-inline.webp"
        og = OG_DIR / f"blog-{article_id}.jpg"

        ok = generate(prompt_for(article_id, "hero"), hero, 1600, 900, 150, args.force)
        ok &= generate(prompt_for(article_id, "inline"), inline, 1200, 675, 110, args.force)
        ok &= make_og(hero, og, args.force)
        if not ok:
            failed.append(article_id)

    total = sum(f.stat().st_size for f in list(ASSETS.glob("*.webp")) + list(OG_DIR.glob("*.jpg")))
    mb = total / 1_048_576
    print(f"\nround image payload: {mb:.2f} MB (ceiling {args.ceiling_mb} MB)")
    if mb > args.ceiling_mb:
        print("OVER CEILING — reduce quality or drop an inline image before shipping")
    if failed:
        print(f"FAILED: {failed}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
