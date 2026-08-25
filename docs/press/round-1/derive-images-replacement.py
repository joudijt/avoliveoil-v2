"""Replace the five R1 English articles' generated imagery with crops of the repo's own photos."""
from pathlib import Path
from PIL import Image

ROOT = Path(r"E:\avoliveoil-v2")
SRC = ROOT / "src" / "assets" / "images"
HERO = (1280, 720)
CARD = (1200, 630)

# id -> (source, crop box in source px)  -> resized to 1280x720
HERO_CROPS = {
    "cold-pressed-olive-oil-explained": ("journey-05-filtering.png", (5, 0, 1370, 768)),
    "compare-olive-oil-brands-malaysia": ("journey-06-testing.webp", (0, 40, 1280, 760)),
    "halal-olive-oil-malaysia":          ("malaysian-woman-bottle-kampung.webp", (0, 160, 1536, 1024)),
    "olive-oil-price-malaysia":          ("journey-07-bottling.png", (5, 0, 1370, 768)),
    "palestinian-olive-oil-origin":      ("OliveGroveSunsetHero.png", (196, 110, 1476, 830)),
}
# id -> (source, crop box, output size)
INLINE_CROPS = {
    "cold-pressed-olive-oil-explained": ("journey-04-extraction.png", (320, 64, 1472, 712), (1024, 576)),
    "compare-olive-oil-brands-malaysia": ("journey-04-crates.webp", (0, 0, 600, 450), (600, 450)),
    "halal-olive-oil-malaysia":          ("journey-06-press.webp", (0, 0, 600, 450), (600, 450)),
    "olive-oil-price-malaysia":          ("FarmerPouringOliveOilInTheField.png", (0, 0, 750, 409), (750, 409)),
    "palestinian-olive-oil-origin":      ("FarmerPickingOliveOfTheTreeInTheField.png", (0, 60, 928, 582), (928, 522)),
}
# 1200x630 card, same frame as the hero
OG_CROPS = {
    "cold-pressed-olive-oil-explained": ("journey-05-filtering.png", (5, 20, 1370, 737)),
    "compare-olive-oil-brands-malaysia": ("journey-06-testing.webp", (0, 76, 1280, 748)),
    "halal-olive-oil-malaysia":          ("malaysian-woman-bottle-kampung.webp", (0, 217, 1536, 1024)),
    "olive-oil-price-malaysia":          ("journey-07-bottling.png", (5, 20, 1370, 737)),
    "palestinian-olive-oil-origin":      ("OliveGroveSunsetHero.png", (196, 144, 1476, 816)),
}

OUTDIR = Path(r"C:\Users\tarek\.claude\jobs\dae78325\tmp\out")

def check(src, box):
    w = box[2] - box[0]; h = box[3] - box[1]
    im = Image.open(SRC / src)
    assert box[2] <= im.width and box[3] <= im.height, f"{src} box out of bounds {im.size} {box}"
    return w, h

rows = []
for aid, (s, box) in HERO_CROPS.items():
    w, h = check(s, box)
    assert w >= HERO[0], f"{aid} hero would upscale: {w}px < 1280"
    im = Image.open(SRC / s).convert("RGB").crop(box).resize(HERO, Image.LANCZOS)
    p = OUTDIR / f"{aid}-hero.webp"; im.save(p, "WEBP", quality=82, method=6)
    rows.append((f"{aid}-hero", s, box, im.size, p.stat().st_size // 1024))

for aid, (s, box, size) in INLINE_CROPS.items():
    w, h = check(s, box)
    assert size[0] <= w, f"{aid} inline would upscale"
    im = Image.open(SRC / s).convert("RGB").crop(box)
    if im.size != size:
        im = im.resize(size, Image.LANCZOS)
    p = OUTDIR / f"{aid}-inline.webp"; im.save(p, "WEBP", quality=76, method=6)
    rows.append((f"{aid}-inline", s, box, im.size, p.stat().st_size // 1024))

for aid, (s, box) in OG_CROPS.items():
    w, h = check(s, box)
    assert w >= CARD[0], f"{aid} og would upscale"
    im = Image.open(SRC / s).convert("RGB").crop(box).resize(CARD, Image.LANCZOS)
    p = OUTDIR / f"blog-{aid}.jpg"; q = 86
    while True:
        im.save(p, "JPEG", quality=q, optimize=True, progressive=True)
        if p.stat().st_size <= 150 * 1024 or q <= 60:
            break
        q -= 4
    rows.append((f"blog-{aid}.jpg", s, box, im.size, p.stat().st_size // 1024))

for r in rows:
    print("%-42s <- %-42s %-24s %-12s %4d KB" % (r[0], r[1], r[2], r[3], r[4]))
