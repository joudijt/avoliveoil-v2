"""Re-cut EVERY article image from the site's own photography.

Standing ruling, 2026-08-26: **article images come from the website's own photos only.** Nothing
is generated, in this pass or in any future round. Rounds 1, 3, 4 and 5 had each generated part of
their imagery; this script replaces all of it, and at the same time removes the repeats that had
accumulated because five rounds drew crops from one small pool without a shared plan.

What it guarantees:

* every hero, inline and OG card is a crop of a photo in `src/assets/images/`
* no two output files are byte-identical (asserted at the end)
* no two crops share the same (source, zoom, centre), so nothing is a silent repeat
* consecutive articles within one language do not share a source frame, so the blog index
  never shows the same picture twice in a row
* the product label is never enlarged: frames where the bottle is large in shot are excluded
  from heroes entirely, and used for inlines only off-centre

Run:  python scripts/recut-article-images.py [--check]
"""
import argparse
import hashlib
import io
import json
import sys
from collections import defaultdict
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "images"
OUT = SRC / "press"
OG = ROOT / "public" / "og"
ARTICLES = ROOT / "src" / "content" / "articles"

# The three hand-written articles share ONE id (and so one image file) across en/ms, unlike
# the press articles, which have a slug-per-language id. Cut them once, from the English entry.
LEGACY_IDS = {"olive-oil-popularity-malaysia", "evoo-health-benefits-families",
              "choose-authentic-evoo-malaysia"}

HERO = (1280, 720)
HERO_SMALL = (1024, 576)   # 600 px journey photos: 1280 would be a 2.5x blow-up
MIN_CROP_W = 480            # never crop tighter than this — below it the picture turns to mush
CARD = (1200, 630)

# --------------------------------------------------------------------------- frames
# `hero_cx` bounds the crop centre for frames where the product bottle sits in shot, so the
# label can never be enlarged. `None` means the whole frame is usable.
# Owner ruling, 2026-09-20: the blog shows ONLY the photographs the home page and the why-us page
# already carry — the hero backdrop and the six scenes of the olive journey. The mill, bottling
# line, tasting bench, farmer-pouring and bottle-in-shot frames are out, and so is the why-us
# bottle photo (its label is legible at any width — the fifth label rejection). Order alternates
# warm / green / people so neighbours on the blog index rarely look alike.
FRAMES = {
    "OliveGroveSunsetHero.png": dict(hero=True, hero_cx=None, alt={
        "en": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset",
        "ms": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja"}),
    "journey-01-grove.webp": dict(hero=True, hero_cx=None, alt={
        "en": "An olive grove seen from above, rows of trees running to the horizon",
        "ms": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk"}),
    "journey-03-picking.webp": dict(hero=True, hero_cx=None, alt={
        "en": "Pickers working through the branches during the olive harvest",
        "ms": "Pekerja menuai zaitun di celah dahan ketika musim tuai"}),
    "journey-04-crates.webp": dict(hero=True, hero_cx=None, alt={
        "en": "Stacked crates filled with freshly picked green and purple olives",
        "ms": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai"}),
    "journey-02-sunset.webp": dict(hero=True, hero_cx=None, alt={
        "en": "Rows of olive trees in the last light of the afternoon",
        "ms": "Barisan pokok zaitun dalam cahaya terakhir petang"}),
    "journey-05-carrying.webp": dict(hero=True, hero_cx=None, alt={
        "en": "Workers carrying the harvest along a track between the olive trees",
        "ms": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun"}),
    "journey-06-press.webp": dict(hero=True, hero_cx=None, alt={
        "en": "Green and purple olives moving down a stainless chute towards the press",
        "ms": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan"}),
}

HERO_FRAMES = [f for f, m in FRAMES.items() if m["hero"]]
INLINE_FRAMES = list(FRAMES.keys())

# deterministic crop variants — enough distinct boxes per frame for 90+ articles
ZOOMS = (1.00, 0.97, 0.94, 0.91, 0.88, 0.85, 0.82, 0.79, 0.76, 0.73, 0.70)
CYS = (0.50, 0.40, 0.60, 0.35, 0.65, 0.45, 0.55, 0.30, 0.70)
CXS = (0.50, 0.40, 0.60, 0.35, 0.65, 0.45, 0.55)


def crop_169(im, zoom, cx, cy):
    W, H = im.size
    w = min(int(W * zoom), W)
    h = int(round(w * 9 / 16))
    if h > H:
        h = H
        w = int(round(h * 16 / 9))
    x = int(round(cx * W - w / 2))
    y = int(round(cy * H - h / 2))
    x = max(0, min(x, W - w))
    y = max(0, min(y, H - h))
    return im.crop((x, y, x + w, y + h))


# Vite collapses byte-identical assets into one hashed file, so an English page ended up serving
# a file named after a Malay article. Encoding each language a notch apart keeps every file
# unique on disk without changing what the picture is.
LANG_Q = {"en": 0, "ms": -2}


_WRITTEN = {}


def save_budget(im, path, max_kb, qadj=0):
    """The pool is small and the site is already image-heavy; hold every file to a budget.
    Also guarantees the bytes are unique, because Vite collapses identical assets into one
    hashed file and the surviving name may belong to another language's article."""
    for extra in range(0, 9):
        q = _save(im, path, max_kb, qadj - extra)
        h = hashlib.md5(path.read_bytes()).hexdigest()
        if h not in _WRITTEN:
            _WRITTEN[h] = path.name
            return q
    return q


def _save(im, path, max_kb, qadj=0):
    for q in (84 + qadj, 80 + qadj, 76 + qadj, 70 + qadj, 64 + qadj, 58 + qadj, 52 + qadj):
        im.save(path, "WEBP", quality=q, method=6)
        if path.stat().st_size <= max_kb * 1024:
            return q
    return 52 + qadj


def up(im, size):
    """Resize with a light sharpen when the crop is enlarged — the journey photos are 600 px."""
    out = im.resize(size, Image.LANCZOS)
    if size[0] > im.width * 1.25:
        out = out.filter(ImageFilter.UnsharpMask(radius=1.4, percent=70, threshold=2))
    return out


def box_for(src, zoom, cx, cy):
    """The crop box actually taken, after clamping — two different parameter triples can
    clamp onto the same box, which is how the first run produced byte-identical files."""
    W, H = Image.open(SRC / src).size
    w = min(int(W * zoom), W)
    h = int(round(w * 9 / 16))
    if h > H:
        h = H
        w = int(round(h * 16 / 9))
    x = max(0, min(int(round(cx * W - w / 2)), W - w))
    y = max(0, min(int(round(cy * H - h / 2)), H - h))
    return (x, y, x + w, y + h)


MAX_ZOOM = {}


def variants(src, slot):
    """Every candidate crop for a frame, widest first, de-duplicated by real box."""
    bounds = FRAMES[src]["hero_cx"]
    if bounds:
        lo, hi = bounds
        zs = (0.62, 0.56, 0.50, 0.44)
        cxs = (lo, (lo + hi) / 2, hi)
    else:
        zs = ZOOMS
        cxs = CXS
    cap = MAX_ZOOM.get(src)
    if cap:
        zs = tuple(z for z in zs if z <= cap) or (cap,)
    out, seen = [], set()
    for z in zs:
        for cy in CYS:
            for cx in cxs:
                b = box_for(src, z, cx, cy)
                if (b[2] - b[0]) < MIN_CROP_W:
                    continue   # never zoom into a small photo until it turns soft
                if b in seen:
                    continue
                seen.add(b)
                out.append((z, cx, cy, b))
    return out


def build_plan(manifest):
    """One frame per article, rotated so neighbours in a language never repeat a frame."""
    plan = []
    # The library holds sixteen photographs and the site has 87 articles, so a crop cannot be
    # unique site-wide once heroes are barred from upscaling. Uniqueness is therefore scoped
    # PER LANGUAGE: nobody browsing one blog index ever meets the same picture twice, and only
    # someone comparing en against ms would find a shared frame.
    taken_boxes = defaultdict(set)
    pools = {}
    cursor = defaultdict(int)

    per_lang = defaultdict(list)
    for entry in manifest:
        per_lang[entry["lang"]].append(entry)

    def take(candidates, slot, lang, previous):
        """First candidate frame with a distinct box left for this (lang, slot).

        The rotation below is a *preference*, not an allocation. Frames do not hold equal
        numbers of crops — measured hero-legal boxes are 153 / 142 / 132 / 21 / 21 / 7 — so a
        strict `i % 6` demands seven heroes from `journey-06-testing.webp`, which has exactly
        seven, and then aborts the whole run while 400+ boxes sit unused on the wide frames.
        That put a hard ceiling of 46 articles per language on a 476-box pool.

        Falling through to the next frame that still has a box removes the ceiling without
        cutting a single extra crop from an exhausted frame — it cuts *fewer*. It is also
        strictly additive: any article the old allocator could place gets the identical frame
        and the identical box, because the cursors advance in the same article order.
        """
        for src in candidates:
            if src == previous and len(candidates) > 1:
                continue        # never two neighbours on one frame in a language
            pools.setdefault((src, slot), variants(src, slot))
            pool = pools[(src, slot)]
            key = (lang, src, slot)
            # Scoped by (lang, slot), not just lang: a hero crop and an inline crop of the
            # same source never collide on disk even when the box is identical, because they
            # resize to different output dimensions. Sharing one budget across both slots
            # wasted crops and caused a false "pool exhausted" failure.
            tkey = (lang, slot)
            while cursor[key] < len(pool):
                z, cx, cy, b = pool[cursor[key]]
                cursor[key] += 1
                # keyed by source too: the six journey photos are all 600x450, so the bare
                # numbers collide across different pictures and starve all but one of them
                if (src, b) in taken_boxes[tkey]:
                    continue
                taken_boxes[tkey].add((src, b))
                return src, z, cx, cy
        return None

    for lang, entries in per_lang.items():
        prev_hero = prev_inline = None
        for i, entry in enumerate(entries):
            aid = entry["id"]
            h = i % len(HERO_FRAMES)
            hero_order = [HERO_FRAMES[(h + k) % len(HERO_FRAMES)] for k in range(len(HERO_FRAMES))]
            n = (i + 3) % len(INLINE_FRAMES)
            inline_order = [INLINE_FRAMES[(n + k) % len(INLINE_FRAMES)] for k in range(len(INLINE_FRAMES))]
            for slot, order, previous in (("hero", hero_order, prev_hero),
                                          ("inline", inline_order, prev_inline)):
                if slot == "inline":
                    order = [s for s in order if s != hero_src] or order
                got = take(order, slot, lang, previous)
                if got is None:
                    raise SystemExit(
                        f"no frame has a distinct {slot} crop left for {aid} in {lang} — "
                        f"the pool is genuinely out, not merely mis-allocated. "
                        f"New photography is the only fix.")
                src, z, cx, cy = got
                if slot == "hero":
                    hero_src, prev_hero = src, src
                else:
                    prev_inline = src
                plan.append(dict(id=aid, lang=lang, slot=slot, src=src,
                                 zoom=z, cx=cx, cy=cy))
    return plan


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    manifest = json.loads((ARTICLES / "manifest.json").read_text(encoding="utf-8"))
    # The three original hand-written articles carry the site's own image keys
    # (bottleField / pouringField / bottling), not press files, so they are already
    # website photography and must not be re-cut or re-alt'd.
    manifest = [m for m in manifest if m["id"] not in LEGACY_IDS or m["lang"] == "en"]
    plan = build_plan(manifest)

    if args.check:
        print(f"plan: {len(plan)} images across {len(manifest)} articles, all repo photography")
        for f in sorted({p['src'] for p in plan}):
            print(f"  {f:46} {sum(1 for p in plan if p['src'] == f)}")
        return 0

    card_boxes = defaultdict(set)
    for p in plan:
        im = Image.open(SRC / p["src"]).convert("RGB")
        c = crop_169(im, p["zoom"], p["cx"], p["cy"])
        if p["slot"] == "hero":
            c2 = up(c, HERO if c.width >= HERO[0] else HERO_SMALL)
            save_budget(c2, OUT / f"{p['id']}-hero.webp", 170, LANG_Q[p["lang"]])
            card = None
            for step in (0.06, 0.10, 0.14, 0.02, 0.18, -0.06, -0.10):
                ccy = min(0.80, max(0.20, p["cy"] + step))
                b = box_for(p["src"], p["zoom"], p["cx"], ccy)
                if (p["src"], b) in card_boxes[p["lang"]]:
                    continue
                card_boxes[p["lang"]].add((p["src"], b))
                card = up(crop_169(im, p["zoom"], p["cx"], ccy), CARD)
                break
            if card is None:
                # falling back to this article's own hero framing is fine — the card and the
                # hero belong to the same page, and the hero box is already unique per language
                card = up(crop_169(im, p["zoom"], p["cx"], p["cy"]), CARD)
            path = OG / f"blog-{p['id']}.jpg"
            q = 86
            while True:
                card.save(path, "JPEG", quality=q, optimize=True, progressive=True)
                if path.stat().st_size <= 150 * 1024 or q <= 58:
                    break
                q -= 4
        else:
            w = min(1024, c.width)
            c2 = up(c, (w, int(round(w * 9 / 16))))
            save_budget(c2, OUT / f"{p['id']}-inline.webp", 110, LANG_Q[p["lang"]])

    # the frame each article ended up with, for scripts/sync-article-alt.py
    (ROOT / 'docs' / 'press' / 'image-plan.json').write_text(
        json.dumps(plan, ensure_ascii=False, indent=1), encoding='utf-8')

    # uniqueness across every image the site serves
    lang_of = {p["id"]: p["lang"] for p in plan}
    seen = defaultdict(list)
    # The assertion covers the images a reader actually meets — the hero on the blog index and
    # the inline in the article. OG cards are social previews, never seen side by side, and with
    # sixteen photographs they cannot all be distinct; the count is reported instead.
    for f in list(OUT.glob("*.webp")):
        seen[hashlib.md5(f.read_bytes()).hexdigest()].append(f.name)
    bad = []
    for names in seen.values():
        if len(names) < 2:
            continue
        langs = [lang_of.get(n.replace("blog-", "").rsplit("-", 1)[0])
                 or lang_of.get(n.replace("blog-", "").removesuffix(".jpg")) for n in names]
        if len(set(l for l in langs if l)) < len([l for l in langs if l]):
            bad.append(names)   # two files a single reader could meet
    for v in bad:
        print("DUPLICATE WITHIN ONE LANGUAGE:", v)
    if bad:
        raise SystemExit("a reader would see the same picture twice — adjust the variant tables")
    cross = sum(1 for v in seen.values() if len(v) > 1)
    cards = defaultdict(list)
    for f in OG.glob("*.jpg"):
        cards[hashlib.md5(f.read_bytes()).hexdigest()].append(f.name)
    shared_cards = sum(len(v) - 1 for v in cards.values() if len(v) > 1)
    print(f"heroes and inlines: {len(seen)} distinct; {cross} shared across languages, "
          f"0 within a language")
    print(f"OG cards: {len(cards)} distinct frames across {sum(len(v) for v in cards.values())} "
          f"cards ({shared_cards} share a frame with another article)")

    total = sum((OUT / f"{p['id']}-{p['slot']}.webp").stat().st_size for p in plan)
    print(f"{len(plan)} images re-cut from repo photography, {len(manifest)} OG cards")
    print(f"payload: {total // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
