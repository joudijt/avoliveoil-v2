#!/usr/bin/env python3
"""Generate responsive WebP variants for every photograph the site renders.

The originals in src/assets/images stay exactly as they are — they are the
masters, and the press pipeline crops from them. This writes derivatives into
src/assets/opt/, which is what components import through
src/components/ui/Picture.tsx.

Why it exists: the site shipped its source PNGs. OliveGroveSunsetHero.png is
2.77 MB, HeroAVOliveOilBottleInTheField.png 5.80 MB, and a 390 px phone
downloaded every one of those pixels because nothing declared a srcset.

    python scripts/optimize-images.py            # write variants + manifest
    python scripts/optimize-images.py --check    # fail if anything is missing
                                                 # or older than its source
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "images"
OUT = ROOT / "src" / "assets" / "opt"
MANIFEST = OUT / "manifest.json"
# The encoder stamp lives BESIDE the manifest, not inside it: manifest.json is
# imported by src/components/ui/Picture.tsx as Record<name, {width,height,widths}>
# and a stray key of a different shape would break its typing.
ENCODER_STAMP = OUT / "encoder.json"

# Widths a real layout asks for: a 390 px phone at DPR 2, a tablet, a laptop,
# and a wide desktop. A width larger than the source is never generated — an
# upscale costs bytes and adds nothing.
WIDTHS = [400, 800, 1200, 1600, 2000]

# The press folder is a special case. Those files are already 1024-wide WebP
# crops, so they are NOT re-encoded at full size — but the blog index renders
# them as cards no wider than ~380 CSS px and was downloading all 84 KB of each
# one.
#
# 400 and 600, not 400 and 800: a card is ~380 CSS px, so 800 is the honest 2x
# width — but it weighs 60 KB against the 84 KB original, a 25% saving for a
# thumbnail nobody inspects closely. 600 (~1.5x, ~30 KB) halves the bytes and
# stays sharp on a phone. Full-size article heroes are untouched by this.
PRESS = SRC / "press"
CARDS = OUT / "cards"
CARD_WIDTHS = [400, 600]

QUALITY = 82

SOURCE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp"}


def sources() -> list[Path]:
    """Top-level photographs only.

    `src/assets/images/press/` is deliberately excluded: those are already
    1024-wide WebP crops produced by the press pipeline and re-encoding them
    would be a second lossy pass over the same picture.
    """
    return sorted(p for p in SRC.iterdir() if p.is_file() and p.suffix.lower() in SOURCE_SUFFIXES)


def variants_for(im: Image.Image) -> list[int]:
    widths = [w for w in WIDTHS if w < im.width]
    widths.append(im.width if im.width <= max(WIDTHS) else max(WIDTHS))
    return sorted(set(widths))


def build_cards(check_only: bool) -> list[str]:
    """Card-sized copies of the press images, for the blog index grid."""
    if not PRESS.is_dir():
        return []
    CARDS.mkdir(parents=True, exist_ok=True)
    missing: list[str] = []
    for src in sorted(PRESS.glob("*.webp")):
        with Image.open(src) as im:
            for w in CARD_WIDTHS:
                if w >= im.width:
                    continue
                target = CARDS / f"{src.stem}-{w}.webp"
                if check_only:
                    if not target.exists() or target.stat().st_mtime < src.stat().st_mtime:
                        missing.append(str(target.relative_to(ROOT)))
                    continue
                if target.exists() and target.stat().st_mtime >= src.stat().st_mtime:
                    continue
                h = round(im.height * w / im.width)
                im.convert("RGB").resize((w, h), Image.LANCZOS).save(
                    target, "WEBP", quality=QUALITY, method=6
                )
    return missing


def encoder_settings() -> dict:
    return {"quality": QUALITY, "widths": WIDTHS, "card_widths": CARD_WIDTHS, "method": 6}


def build(check_only: bool = False) -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict] = {}
    missing: list[str] = []
    saved_from = 0
    saved_to = 0

    for src in sources():
        name = src.stem
        with Image.open(src) as im:
            im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
            widths = variants_for(im)
            manifest[name] = {"width": im.width, "height": im.height, "widths": widths}
            for w in widths:
                target = OUT / f"{name}-{w}.webp"
                if check_only:
                    if not target.exists() or target.stat().st_mtime < src.stat().st_mtime:
                        missing.append(str(target.relative_to(ROOT)))
                    continue
                if target.exists() and target.stat().st_mtime >= src.stat().st_mtime:
                    continue
                h = round(im.height * w / im.width)
                resized = im if w == im.width else im.resize((w, h), Image.LANCZOS)
                # Lossy WebP for everything, alpha included. Lossless was tried
                # for the cut-outs and made them far BIGGER than their sources
                # (woman-holding-bottle-nobg went 143 KB -> 601 KB), which is the
                # opposite of the point. alpha_quality=100 keeps the cut-out
                # edges clean while the colour channels stay compressed.
                resized.save(
                    target,
                    "WEBP",
                    quality=QUALITY,
                    method=6,
                    alpha_quality=100,
                )
        saved_from += src.stat().st_size
        widest = OUT / f"{name}-{manifest[name]['widths'][-1]}.webp"
        if widest.exists():
            saved_to += widest.stat().st_size

    missing += build_cards(check_only)

    if check_only:
        if not MANIFEST.exists():
            missing.append("src/assets/opt/manifest.json")
        stored = json.loads(ENCODER_STAMP.read_text(encoding="utf-8")) if ENCODER_STAMP.exists() else None
        if stored != encoder_settings():
            missing.append(f"encoder settings changed since the variants were written: {stored}")
        if missing:
            print(f"{len(missing)} optimised image(s) missing or stale — run: npm run images")
            for m in missing[:10]:
                print(f"  - {m}")
            return 1
        print(f"all optimised images present for {len(manifest)} source(s)")
        return 0

    # The encoder settings are recorded so --check can notice a re-tune.
    # Comparing mtimes alone is blind to it: when QUALITY changed earlier today
    # every variant was still "fresh" while carrying the old encoding — and one
    # of those was 4x LARGER than its own source.
    ENCODER_STAMP.write_text(json.dumps(encoder_settings(), indent=2) + "\n", encoding="utf-8")
    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    total_variants = sum(len(v["widths"]) for v in manifest.values())
    cards = len(list(CARDS.glob("*.webp"))) if CARDS.is_dir() else 0
    print(f"{len(manifest)} sources -> {total_variants} variants in {OUT.relative_to(ROOT)}")
    print(f"  plus {cards} card-sized copies of the press images")
    print(f"  originals (masters, still in the repo): {saved_from / 1024 / 1024:.1f} MB")
    print(f"  widest variant of each:                 {saved_to / 1024 / 1024:.1f} MB")
    biggest = sorted(manifest.items(), key=lambda kv: -kv[1]["width"])[:6]
    for name, v in biggest:
        widest_file = OUT / f"{name}-{v['widths'][-1]}.webp"
        src_file = next(p for p in sources() if p.stem == name)
        print(
            f"  {src_file.stat().st_size / 1024:8.0f} KB -> {widest_file.stat().st_size / 1024:7.0f} KB  {name}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(build(check_only="--check" in sys.argv))
