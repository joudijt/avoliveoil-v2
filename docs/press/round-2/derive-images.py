# -*- coding: utf-8 -*-
"""PRESS round 2 - derive article imagery from the site's OWN photos. No generation.

Each entry: (article_id, slot, source, zoom, cx, cy)
  zoom = fraction of the source width used for the 16:9 window
  cx/cy = centre of that window as a fraction of the source
Heroes are emitted at exactly 1280x720 because src/pages/ArticlePage.tsx declares
width=1280 height=720 on the hero <img>; anything else ships a false declaration.
Nothing is ever upscaled: every hero crop below is >= 1280 px wide at source.
"""
from PIL import Image
from pathlib import Path
import json, sys

ROOT = Path(r"E:\avoliveoil-v2")
SRC = ROOT / "src" / "assets" / "images"
OUT = SRC / "press"
OG = ROOT / "public" / "og"

HERO_W, HERO_H = 1280, 720
INLINE_W, INLINE_H = 1024, 576
OG_W, OG_H = 1200, 630

PLAN = [
    # id                              slot      source                                    zoom  cx    cy
    ("olive-oil-for-cooking",         "hero",   "journey-08-final.png",                   1.00, 0.50, 0.50),
    ("olive-oil-for-cooking",         "inline", "FarmerPouringOliveOilInTheField.png",    1.00, 0.55, 0.50),
    ("olive-oil-vs-pomace-oil",       "hero",   "journey-04-extraction.png",              1.00, 0.50, 0.45),
    ("olive-oil-vs-pomace-oil",       "inline", "journey-05-filtering.png",               0.70, 0.50, 0.50),
    ("olive-oil-smoke-point",         "hero",   "journey-06-testing.webp",                1.00, 0.50, 0.42),
    ("olive-oil-smoke-point",         "inline", "journey-06-testing.webp",                0.55, 0.74, 0.60),
    ("minyak-zaitun-habbatus-sauda",  "hero",   "HeroAVOliveOilBottleInTheField.png",     1.00, 0.50, 0.50),
    ("minyak-zaitun-habbatus-sauda",  "inline", "journey-06-testing.webp",                0.70, 0.48, 0.45),
    ("minyak-zaitun-untuk-salad",     "hero",   "malaysian-woman-bottle-kampung.webp",    1.00, 0.50, 0.45),
    ("minyak-zaitun-untuk-salad",     "inline", "journey-08-final.png",                   0.95, 0.42, 0.58),
    ("zaitun-dalam-al-quran",         "hero",   "OliveGroveSunsetHero.png",               1.00, 0.50, 0.50),
    ("zaitun-dalam-al-quran",         "inline", "FarmerPickingOliveOfTheTreeInTheField.png", 1.00, 0.50, 0.38),
    ("zayt-alzaytun-kuala-lumpur",    "hero",   "malaysian-woman-bottle-kampung.webp",    0.85, 0.58, 0.45),
    ("zayt-alzaytun-kuala-lumpur",    "inline", "HeroAVOliveOilBottleInTheField.png",     0.80, 0.55, 0.50),
    ("sier-zayt-alzaytun-malaysia",   "hero",   "journey-07-bottling.png",                1.00, 0.50, 0.50),
    ("sier-zayt-alzaytun-malaysia",   "inline", "journey-04-extraction.png",              0.55, 0.48, 0.58),
    ("hifz-zayt-alzaytun",            "hero",   "journey-05-filtering.png",               1.00, 0.50, 0.50),
    ("hifz-zayt-alzaytun",            "inline", "journey-08-final.png",                   0.55, 0.48, 0.45),
]

def crop_169(im, zoom, cx, cy):
    W, H = im.size
    w = min(int(W * zoom), W)
    h = int(round(w * 9 / 16))
    if h > H:                       # source too short for that width
        h = H
        w = int(round(h * 16 / 9))
    x = int(round(cx * W - w / 2)); y = int(round(cy * H - h / 2))
    x = max(0, min(x, W - w));      y = max(0, min(y, H - h))
    return im.crop((x, y, x + w, y + h))

def save_webp(im, path, max_kb=180):
    for q in (86, 82, 78, 72, 66, 60):
        im.save(path, "WEBP", quality=q, method=6)
        if path.stat().st_size <= max_kb * 1024:
            return q
    return q

rows = []
OUT.mkdir(parents=True, exist_ok=True)
OG.mkdir(parents=True, exist_ok=True)
for aid, slot, src, zoom, cx, cy in PLAN:
    im = Image.open(SRC / src).convert("RGB")
    box = crop_169(im, zoom, cx, cy)
    if slot == "hero":
        assert box.size[0] >= HERO_W, f"{aid}: crop {box.size} would upscale to {HERO_W}"
        out = box.resize((HERO_W, HERO_H), Image.LANCZOS)
    else:
        tw = min(INLINE_W, box.size[0])
        out = box.resize((tw, int(round(tw * 9 / 16))), Image.LANCZOS)
    path = OUT / f"{aid}-{slot}.webp"
    q = save_webp(out, path)
    rows.append((aid, slot, src, f"{box.size[0]}x{box.size[1]}", f"{out.size[0]}x{out.size[1]}",
                 round(path.stat().st_size / 1024, 1), q))
    if slot == "hero":
        ogc = out.crop((0, int((HERO_H - HERO_W * OG_H / OG_W) / 2),
                        HERO_W, int(HERO_H - (HERO_H - HERO_W * OG_H / OG_W) / 2)))
        ogp = OG / f"blog-{aid}.jpg"
        ogc.resize((OG_W, OG_H), Image.LANCZOS).save(ogp, "JPEG", quality=86, optimize=True, progressive=True)
        rows.append((aid, "og", src, "-", f"{OG_W}x{OG_H}", round(ogp.stat().st_size / 1024, 1), 86))

total = sum(r[5] for r in rows)
for r in rows:
    print("%-30s %-6s %-42s crop %-10s out %-9s %6.1f KB q%d" % r)
print("\n%d files, %.2f MB total" % (len(rows), total / 1024))
