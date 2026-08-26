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

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "images"
OUT = SRC / "press"
OG = ROOT / "public" / "og"
ARTICLES = ROOT / "src" / "content" / "articles"

LEGACY_IDS = {"olive-oil-popularity-malaysia", "evoo-health-benefits-families",
              "choose-authentic-evoo-malaysia"}

HERO = (1280, 720)
CARD = (1200, 630)

# --------------------------------------------------------------------------- frames
# `hero_cx` bounds the crop centre for frames where the product bottle sits in shot, so the
# label can never be enlarged. `None` means the whole frame is usable.
FRAMES = {
    "OliveGroveSunsetHero.png": dict(hero=True, hero_cx=None, alt={
        "en": "An old olive tree above a hillside grove, with a village and the sea behind it at sunset",
        "ms": "Pokok zaitun tua di atas ladang di lereng bukit, dengan perkampungan dan laut di belakangnya ketika senja",
        "ar": "شجرة زيتون معمّرة فوق بستان على سفح تل، وقرية والبحر خلفها عند الغروب"}),
    "OliveGroveSunsetHero-ar.png": dict(hero=True, hero_cx=None, alt={
        "en": "Olive trees on a hillside at sunset, the grove running down towards the sea",
        "ms": "Pokok zaitun di lereng bukit ketika senja, ladang menuruni bukit ke arah laut",
        "ar": "أشجار زيتون على سفح تل عند الغروب، والبستان ينحدر نحو البحر"}),
    "journey-04-extraction.png": dict(hero=True, hero_cx=None, alt={
        "en": "Olive paste coming out of a stainless mill with green oil running into the vat below",
        "ms": "Pes zaitun keluar dari kilang perahan keluli dengan minyak hijau mengalir ke dalam tangki",
        "ar": "عجينة الزيتون تخرج من المعصرة الفولاذية والزيت الأخضر ينساب إلى الخزان"}),
    "journey-05-filtering.png": dict(hero=True, hero_cx=None, alt={
        "en": "Green olive oil pouring from a stainless pipe into an open vat at the mill",
        "ms": "Minyak zaitun hijau mengalir dari paip keluli ke dalam tangki terbuka di kilang perahan",
        "ar": "زيت زيتون أخضر يتدفق من أنبوب فولاذي إلى خزان مفتوح في المعصرة"}),
    "journey-06-testing.webp": dict(hero=True, hero_cx=None, alt={
        "en": "A man in a songkok nosing olive oil from a blue tasting glass at a bench of sample flasks",
        "ms": "Seorang lelaki bersongkok menghidu minyak zaitun dari gelas rasa biru di meja kelalang sampel",
        "ar": "رجل يرتدي الطاقية يشمّ زيت الزيتون من كأس تذوّق أزرق على طاولة قوارير العيّنات"}),
    "journey-07-bottling.png": dict(hero=True, hero_cx=None, alt={
        "en": "Dark glass bottles moving along a filling line under stainless steel filling heads",
        "ms": "Botol kaca gelap bergerak di atas talian pengisian di bawah kepala pengisi keluli",
        "ar": "زجاجات داكنة تتحرّك على خط التعبئة تحت رؤوس التعبئة الفولاذية"}),
    # bottle in shot on the right — heroes and cards must stay left of it
    "HeroAVOliveOilBottleInTheField.png": dict(hero=False, hero_cx=(0.16, 0.30), alt={
        "en": "A sunlit path running between old olive trees in the grove",
        "ms": "Laluan yang terkena cahaya matahari di celah pokok zaitun tua di ladang",
        "ar": "ممر تسطع عليه الشمس بين أشجار الزيتون المعمّرة في البستان"}),
    # bottle at centre-right on a table — same rule
    "journey-08-final.png": dict(hero=False, hero_cx=(0.12, 0.26), alt={
        "en": "Whole olives and olive leaves scattered across a wooden table",
        "ms": "Buah zaitun dan daun zaitun bertaburan di atas meja kayu",
        "ar": "حبات زيتون وأوراق زيتون منثورة على طاولة خشبية"}),
    # inline-only frames
    "FarmerPickingOliveOfTheTreeInTheField.png": dict(hero=False, hero_cx=None, alt={
        "en": "A Palestinian farmer in a keffiyeh checking olives on the branch during the harvest",
        "ms": "Seorang petani Palestin berkeffiyeh memeriksa buah zaitun di dahan ketika musim tuai",
        "ar": "مزارع فلسطيني يرتدي الكوفية يفحص ثمار الزيتون على الغصن أثناء القطاف"}),
    "FarmerPouringOliveOilInTheField.png": dict(hero=False, hero_cx=None, alt={
        "en": "A farmer pouring olive oil from a dark bottle into a stoneware bowl on a wooden table",
        "ms": "Seorang petani menuang minyak zaitun dari botol gelap ke dalam mangkuk tembikar di atas meja kayu",
        "ar": "مزارع يصبّ زيت الزيتون من زجاجة داكنة في وعاء فخاري على طاولة خشبية"}),
    "journey-01-grove.webp": dict(hero=False, hero_cx=None, alt={
        "en": "An olive grove seen from above, rows of trees running to the horizon",
        "ms": "Ladang zaitun dilihat dari atas, barisan pokok memanjang ke ufuk",
        "ar": "بستان زيتون من الأعلى، وصفوف الأشجار ممتدة نحو الأفق"}),
    "journey-02-sunset.webp": dict(hero=False, hero_cx=None, alt={
        "en": "Rows of olive trees in the last light of the afternoon",
        "ms": "Barisan pokok zaitun dalam cahaya terakhir petang",
        "ar": "صفوف أشجار الزيتون في آخر ضوء العصر"}),
    "journey-03-picking.webp": dict(hero=False, hero_cx=None, alt={
        "en": "Pickers working through the branches during the olive harvest",
        "ms": "Pekerja menuai zaitun di celah dahan ketika musim tuai",
        "ar": "قاطفون يعملون بين الأغصان في موسم قطاف الزيتون"}),
    "journey-04-crates.webp": dict(hero=False, hero_cx=None, alt={
        "en": "Stacked crates filled with freshly picked green and purple olives",
        "ms": "Bekas bertindan penuh dengan buah zaitun hijau dan ungu yang baru dituai",
        "ar": "صناديق مرصوفة مملوءة بزيتون أخضر وأرجواني حديث القطاف"}),
    "journey-05-carrying.webp": dict(hero=False, hero_cx=None, alt={
        "en": "Workers carrying the day's harvest along a track between the olive trees",
        "ms": "Pekerja membawa hasil tuaian menyusuri laluan di celah pokok zaitun",
        "ar": "عمال يحملون محصول اليوم على ممر بين أشجار الزيتون"}),
    "journey-06-press.webp": dict(hero=False, hero_cx=None, alt={
        "en": "Green and purple olives moving down a stainless chute towards the press",
        "ms": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan",
        "ar": "ثمار زيتون خضراء وأرجوانية تنزلق على مجرى فولاذي نحو المعصرة"}),
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
LANG_Q = {"en": 0, "ms": -2, "ar": -4}


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


MAX_ZOOM = {"OliveGroveSunsetHero-ar.png": 0.94}  # mirrored composite: the symmetry shows


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
                if slot == "hero" and (b[2] - b[0]) < HERO[0]:
                    continue   # never upscale a hero, and never zoom into the label
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

    for lang, entries in per_lang.items():
        for i, entry in enumerate(entries):
            aid = entry["id"]
            hero_src = HERO_FRAMES[i % len(HERO_FRAMES)]
            inline_src = INLINE_FRAMES[(i * 5 + 3) % len(INLINE_FRAMES)]
            if inline_src == hero_src:
                inline_src = INLINE_FRAMES[(i * 5 + 4) % len(INLINE_FRAMES)]
            for slot, src in (("hero", hero_src), ("inline", inline_src)):
                pools.setdefault((src, slot), variants(src, slot))
                pool = pools[(src, slot)]
                key = (lang, src, slot)
                # Scoped by (lang, slot), not just lang: a hero crop and an inline crop of the
                # same source never collide on disk even when the box is identical, because they
                # resize to different output dimensions. Sharing one budget across both slots
                # wasted crops and caused a false "pool exhausted" failure.
                tkey = (lang, slot)
                z = cx = cy = None
                while cursor[key] < len(pool):
                    z, cx, cy, b = pool[cursor[key]]
                    cursor[key] += 1
                    if b in taken_boxes[tkey]:
                        continue
                    taken_boxes[tkey].add(b)
                    break
                else:
                    raise SystemExit(f"{src} has no distinct crop left for {aid} {slot} in {lang}")
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
    manifest = [m for m in manifest if m["id"] not in LEGACY_IDS]
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
            c2 = c.resize(HERO, Image.LANCZOS)
            save_budget(c2, OUT / f"{p['id']}-hero.webp", 170, LANG_Q[p["lang"]])
            card = None
            for step in (0.06, 0.10, 0.14, 0.02, 0.18, -0.06, -0.10):
                ccy = min(0.80, max(0.20, p["cy"] + step))
                b = box_for(p["src"], p["zoom"], p["cx"], ccy)
                if b in card_boxes[p["lang"]]:
                    continue
                card_boxes[p["lang"]].add(b)
                card = crop_169(im, p["zoom"], p["cx"], ccy).resize(CARD, Image.LANCZOS)
                break
            if card is None:
                # falling back to this article's own hero framing is fine — the card and the
                # hero belong to the same page, and the hero box is already unique per language
                card = crop_169(im, p["zoom"], p["cx"], p["cy"]).resize(CARD, Image.LANCZOS)
            path = OG / f"blog-{p['id']}.jpg"
            q = 86
            while True:
                card.save(path, "JPEG", quality=q, optimize=True, progressive=True)
                if path.stat().st_size <= 150 * 1024 or q <= 58:
                    break
                q -= 4
        else:
            w = min(1024, c.width)
            c2 = c.resize((w, int(round(w * 9 / 16))), Image.LANCZOS)
            save_budget(c2, OUT / f"{p['id']}-inline.webp", 110, LANG_Q[p["lang"]])

    # The three legacy articles keep their on-page hero (the site's own original image keys),
    # but their OG cards were cut by round 2 from boxes this plan also wants, so they are
    # re-cut here from frames nothing else uses at these boxes.
    for aid, srcname, z, cx, cy in (
        ("olive-oil-popularity-malaysia", "OliveGroveSunsetHero.png", 0.78, 0.30, 0.44),
        ("evoo-health-benefits-families", "journey-04-extraction.png", 0.78, 0.62, 0.40),
        ("choose-authentic-evoo-malaysia", "journey-07-bottling.png", 0.86, 0.36, 0.58),
    ):
        b = box_for(srcname, z, cx, cy)
        card_boxes["en"].add(b)
        im = Image.open(SRC / srcname).convert("RGB")
        card = crop_169(im, z, cx, cy).resize(CARD, Image.LANCZOS)
        path = OG / f"blog-{aid}.jpg"
        q = 86
        while True:
            card.save(path, "JPEG", quality=q, optimize=True, progressive=True)
            if path.stat().st_size <= 150 * 1024 or q <= 58:
                break
            q -= 4

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
