"""PRESS round 5 — derive heroes, inlines and OG cards from the repo's own photography.

Twelve heroes are generated (object-led prompts, per round 4's finding), six are repo crops, and
**every inline and every OG card is a repo photo**. Nothing is upscaled: every hero box is at least
1280 px wide at source and every card box at least 1200 px.

Two frames are permanently out of the rotation because the product label reads at rendered width:
`malaysian-woman-bottle-kampung.webp`, `AVOliveOilInTheField.png` and `bottle-source-raw.png`.

New this round: **a duplicate-hash assertion.** Round 4 shipped a hero byte-identical to a live
article's hero because two crop boxes happened to match, and a sweep then found a second such pair
from round 3. Nothing else in this repo can see that, so it is checked here.
"""
import hashlib
from collections import defaultdict
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "src" / "assets" / "images"
GEN = ROOT / "docs" / "press" / "round-5" / "gen"
OUT = SRC / "press"
OG = ROOT / "public" / "og"

HERO = (1280, 720)
CARD = (1200, 630)

BANNED = {"malaysian-woman-bottle-kampung.webp", "AVOliveOilInTheField.png", "bottle-source-raw.png"}

# Frames where the product bottle fills enough of the shot that its label reads at hero size.
# Fifth instance of that rejection on this repo, so it is now a rule the script enforces:
# these may carry an inline or a card, never a 1280x720 hero.
NO_HERO = {"journey-08-final.png", "HeroAVOliveOilBottleInTheField.png"}

HERO_CROPS = {
    # Four generated heroes were rejected on sight — the provider had a bad day: spring onions
    # for the pasta article, cucumbers for the avocado one, a grill pan with no oil in frame,
    # and a single lime in a bowl for the dough article. Repo frames instead. Round 4's 10/10
    # on object-led prompts did not reproduce, so provider quality is not stable across days.
    "aglio-e-olio":                  ("journey-04-extraction.png", (0, 120, 1536, 984)),
    "olive-oil-vs-avocado-oil":      ("OliveGroveSunsetHero-ar.png", (232, 60, 1672, 870)),
    "olive-oil-for-grilling":        ("OliveGroveSunsetHero-ar.png", (392, 60, 1672, 780)),
    "zayt-alzaytun-lilmuajanat":     ("journey-05-filtering.png", (96, 48, 1376, 768)),
    "cloudy-olive-oil":              ("journey-07-bottling.png", (0, 24, 1280, 744)),
    "minyak-zaitun-keruh":           ("journey-04-extraction.png", (0, 60, 1536, 924)),
    "minyak-zaitun-vs-minyak-sawit": ("journey-06-testing.webp", (0, 120, 1280, 840)),
    "minyak-zaitun-untuk-roti":      ("OliveGroveSunsetHero.png", (196, 60, 1476, 780)),
    "zayt-alzaytun-lilshawi":        ("journey-07-bottling.png", (48, 0, 1328, 720)),
    "tajmid-zayt-alzaytun":          ("journey-06-testing.webp", (0, 180, 1280, 900)),
}

INLINE_CROPS = {
    "aglio-e-olio":                  ("journey-04-extraction.png", (0, 0, 1024, 576), (1024, 576)),
    "olive-oil-vs-avocado-oil":      ("FarmerPickingOliveOfTheTreeInTheField.png", (0, 120, 928, 642), (928, 522)),
    "olive-oil-and-balsamic":        ("journey-08-final.png", (0, 0, 1024, 576), (1024, 576)),
    "olive-oil-for-hummus":          ("FarmerPouringOliveOilInTheField.png", (40, 0, 750, 387), (710, 387)),
    "olive-oil-for-grilling":        ("journey-07-bottling.png", (0, 192, 1024, 768), (1024, 576)),
    "cloudy-olive-oil":              ("journey-05-filtering.png", (0, 96, 1024, 672), (1024, 576)),
    "minyak-zaitun-vs-minyak-sawit": ("journey-06-press.webp", (0, 30, 600, 420), (600, 390)),
    "minyak-zaitun-untuk-pasta":     ("journey-01-grove.webp", (0, 30, 600, 420), (600, 390)),
    "minyak-zaitun-keruh":           ("journey-05-filtering.png", (352, 0, 1376, 576), (1024, 576)),
    "minyak-zaitun-untuk-ikan-bakar": ("journey-05-carrying.webp", (0, 30, 600, 420), (600, 390)),
    "minyak-zaitun-untuk-air-fryer": ("journey-04-crates.webp", (0, 0, 600, 450), (600, 450)),
    "minyak-zaitun-untuk-roti":      ("HeroAVOliveOilBottleInTheField.png", (0, 300, 1536, 1164), (1024, 576)),
    "anwae-alzaytun":                ("journey-03-picking.webp", (0, 30, 600, 420), (600, 390)),
    "zayt-alzaytun-walzaatar":       ("OliveGroveSunsetHero-ar.png", (300, 200, 1324, 776), (1024, 576)),
    "zayt-alzaytun-lilmuajanat":     ("journey-02-sunset.webp", (0, 30, 600, 420), (600, 390)),
    "zayt-alzaytun-lilshawi":        ("journey-07-bottling.png", (0, 0, 1024, 576), (1024, 576)),
    "tajmid-zayt-alzaytun":          ("journey-08-final.png", (352, 192, 1376, 768), (1024, 576)),
    "zayt-alzaytun-fi-ramadan":      ("OliveGroveSunsetHero.png", (0, 100, 1024, 676), (1024, 576)),
}

OG_CROPS = {
    "aglio-e-olio":                  ("journey-04-extraction.png", (0, 30, 1536, 836)),
    "olive-oil-vs-avocado-oil":      ("HeroAVOliveOilBottleInTheField.png", (800, 100, 2752, 1125)),
    "olive-oil-and-balsamic":        ("journey-08-final.png", (0, 10, 1376, 732)),
    "olive-oil-for-hummus":          ("OliveGroveSunsetHero-ar.png", (0, 40, 1440, 796)),
    "olive-oil-for-grilling":        ("OliveGroveSunsetHero-ar.png", (392, 90, 1672, 762)),
    "cloudy-olive-oil":              ("journey-07-bottling.png", (0, 48, 1280, 720)),
    "minyak-zaitun-vs-minyak-sawit": ("journey-06-testing.webp", (0, 108, 1280, 780)),
    "minyak-zaitun-untuk-pasta":     ("journey-04-extraction.png", (0, 190, 1536, 996)),
    "minyak-zaitun-keruh":           ("journey-04-extraction.png", (0, 90, 1536, 896)),
    "minyak-zaitun-untuk-ikan-bakar": ("journey-07-bottling.png", (96, 12, 1376, 734)),
    "minyak-zaitun-untuk-air-fryer": ("journey-05-filtering.png", (96, 0, 1376, 672)),
    "minyak-zaitun-untuk-roti":      ("OliveGroveSunsetHero.png", (196, 90, 1476, 762)),
    "anwae-alzaytun":                ("OliveGroveSunsetHero.png", (100, 60, 1540, 816)),
    "zayt-alzaytun-walzaatar":       ("OliveGroveSunsetHero-ar.png", (232, 90, 1672, 846)),
    "zayt-alzaytun-lilmuajanat":     ("journey-04-extraction.png", (0, 100, 1536, 906)),
    "zayt-alzaytun-lilshawi":        ("journey-07-bottling.png", (48, 20, 1328, 692)),
    "tajmid-zayt-alzaytun":          ("journey-06-testing.webp", (0, 200, 1280, 872)),
    "zayt-alzaytun-fi-ramadan":      ("OliveGroveSunsetHero.png", (0, 130, 1440, 886)),
}


def check(src, box, floor):
    assert src not in BANNED, f"{src} is out of rotation — the product label reads at rendered width"
    im = Image.open(SRC / src)
    w = box[2] - box[0]
    assert box[2] <= im.width and box[3] <= im.height, f"{src} box {box} out of bounds {im.size}"
    assert w >= floor, f"{src} box is {w}px wide, would upscale past {floor}"


def main():
    rows = []
    for aid, (s, box) in HERO_CROPS.items():
        assert s not in NO_HERO, f"{s} cannot be a hero — the product label reads at 1280px"
        check(s, box, HERO[0])
        im = Image.open(SRC / s).convert("RGB").crop(box).resize(HERO, Image.LANCZOS)
        p = OUT / f"{aid}-hero.webp"
        im.save(p, "WEBP", quality=82, method=6)
        rows.append((p.name, s, box, im.size, p.stat().st_size // 1024, "reused"))

    for aid, (s, box, size) in INLINE_CROPS.items():
        check(s, box, size[0])
        im = Image.open(SRC / s).convert("RGB").crop(box)
        if im.size != size:
            im = im.resize(size, Image.LANCZOS)
        p = OUT / f"{aid}-inline.webp"
        im.save(p, "WEBP", quality=78, method=6)
        rows.append((p.name, s, box, im.size, p.stat().st_size // 1024, "reused"))

    for aid, (s, box) in OG_CROPS.items():
        check(s, box, CARD[0])
        im = Image.open(SRC / s).convert("RGB").crop(box).resize(CARD, Image.LANCZOS)
        p = OG / f"blog-{aid}.jpg"
        q = 86
        while True:
            im.save(p, "JPEG", quality=q, optimize=True, progressive=True)
            if p.stat().st_size <= 150 * 1024 or q <= 60:
                break
            q -= 4
        rows.append((p.name, s, box, im.size, p.stat().st_size // 1024, f"card q{q}"))

    moved = 0
    for f in sorted(GEN.glob("*.webp")):
        dest = OUT / f.name
        dest.write_bytes(f.read_bytes())
        rows.append((dest.name, "generated", "-", Image.open(dest).size,
                     dest.stat().st_size // 1024, "generated"))
        moved += 1

    for r in rows:
        print("%-46s <- %-42s %-24s %-12s %4d KB  %s" % r)
    print(f"\n{len(rows)} files, {sum(r[4] for r in rows)} KB, {moved} generated moved in")

    # Round 4 shipped a hero byte-identical to a live article's hero. Nothing else sees this.
    seen = defaultdict(list)
    for f in list(OUT.glob("*.webp")) + list(OG.glob("*.jpg")):
        seen[hashlib.md5(f.read_bytes()).hexdigest()].append(f.name)
    dupes = {k: v for k, v in seen.items() if len(v) > 1}
    if dupes:
        for v in dupes.values():
            print("DUPLICATE CONTENT:", v)
        raise SystemExit("byte-identical images across the site — change a crop box")
    print(f"hash check: {len(seen)} files, 0 duplicates")


if __name__ == "__main__":
    main()
