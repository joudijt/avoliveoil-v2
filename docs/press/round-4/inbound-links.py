"""PRESS round 4, Stage 5 step 10 — inbound internal links.

A round links outward into the articles that came before it and receives nothing back except
the blog index. An article nothing links to is an orphan. Round 3 had to fix this as a review
finding; this round does it as part of Stage 5.

For every new article this adds one `related` entry to one existing parent article — the first
sibling the child already links to, so the pair is mutual.

Idempotent: a parent that already carries a link to the child is skipped.
"""
import io
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
ARTICLES = ROOT / "src" / "content" / "articles"

# child id -> (lang, parent slug, label on the parent, description on the parent)
LINKS = {
    "olive-oil-vs-coconut-oil": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Olive oil vs coconut oil in a Malaysian kitchen",
        "Which of the two fats a dish wants, on flavour, texture and cost."),
    "garlic-infused-olive-oil": ("en", "olive-oil-for-bread-and-dipping",
        "Garlic infused olive oil, and how to do it safely",
        "Cold and warm infusion, and the refrigeration rule that makes it safe."),
    "olive-oil-substitute": ("en", "extra-virgin-olive-oil-salad-dressing",
        "Olive oil substitute: what to use instead",
        "What to reach for when the bottle is empty, split by the job in hand."),
    "olive-oil-for-baking": ("en", "what-cold-pressed-olive-oil-really-means",
        "Olive oil for cakes and baking",
        "The butter-to-oil conversion, and which bakes suit a fruity oil."),
    "olive-oil-bottle-size": ("en", "olive-oil-shelf-life-how-long-a-bottle-lasts",
        "What size extra virgin olive oil bottle to buy",
        "How fast a household gets through oil, against how long an opened bottle lasts."),
    "olive-oil-bitter-taste": ("en", "how-to-choose-authentic-extra-virgin-olive-oil-in-malaysia",
        "Why does olive oil taste bitter",
        "Bitterness and the peppery catch as signs of a young oil, not a spoiled one."),
    "minyak-zaitun-vs-minyak-kelapa": ("ms", "minyak-zaitun-vs-minyak-masak-lain",
        "Minyak zaitun vs minyak kelapa",
        "Dua minyak yang ada dalam dapur Malaysia, dibandingkan sebagai lemak masakan."),
    "minyak-zaitun-palsu": ("ms", "cara-memilih-minyak-zaitun-dara-asli-di-malaysia",
        "Cara kenal minyak zaitun palsu",
        "Bagaimana minyak dipalsukan, dan ujian rumah mana yang sebenarnya mitos."),
    "rasa-minyak-zaitun": ("ms", "apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "Rasa minyak zaitun: pahit dan pedas",
        "Kenapa minyak muda terasa pahit dan pedas di tekak, dan bila ia tanda rosak."),
    "beli-minyak-zaitun-online": ("ms", "di-mana-beli-minyak-zaitun-di-kuala-lumpur",
        "Beli minyak zaitun online di Malaysia",
        "Apa yang perlu ada pada penyenaraian sebelum anda bayar."),
    "minyak-zaitun-tulen": ("ms", "minyak-zaitun-organik-apa-maksudnya",
        "Maksud minyak zaitun tulen",
        "Istilah pemasaran lawan istilah gred, dan apa yang sebenarnya dijamin."),
    "minyak-zaitun-untuk-kek": ("ms", "resepi-mudah-dengan-minyak-zaitun",
        "Minyak zaitun untuk kek dan bakeri",
        "Penukaran mentega kepada minyak, dan kek mana sesuai dengan minyak dara."),
    "mawsim-qitaf-alzaytun": ("ar", "hifz-zayt-alzaytun",
        "موسم قطاف الزيتون",
        "متى يُقطف الزيتون، ولماذا تاريخ القطاف أهم من تاريخ انتهاء الصلاحية."),
    "zayt-alzaytun-almukarrar": ("ar", "alfarq-bayn-zayt-alzaytun-albikr-walmumtaz",
        "زيت الزيتون المكرر",
        "ما هو الزيت المكرر، ولماذا هو أرخص، وأين يصلح استعماله."),
    "zayt-zaytun-baladi": ("ar", "zayt-alzaytun-aludwi",
        "زيت زيتون بلدي",
        "ماذا تعني كلمة بلدي على الزجاجة، ومن الذي يدققها."),
    "afdal-zayt-zaytun": ("ar", "taem-zayt-alzaytun-albikr-almumtaz",
        "كيف تختار أفضل زيت زيتون",
        "قائمة فحص عملية تطبّقها على أي زجاجة بيدك."),
    "zayt-alzaytun-balad-almansha": ("ar", "zayt-zaytun-falastini-ma-yumayyizuh",
        "زيت الزيتون حسب بلد المنشأ",
        "ماذا يقول اسم البلد على الملصق، وعمّ يسكت."),
    "zujajat-zayt-alzaytun": ("ar", "zayt-alzaytun-fi-kuala-lumpur",
        "زجاجة زيت الزيتون",
        "ما تقوله العبوة عن البائع، قبل أن تقول شيئاً عن الزيت."),
}


def child_slug(slugs_src, child_id, lang):
    m = re.search(r'"%s"\s*:\s*\{[^}]*\}' % re.escape(child_id), slugs_src, re.S)
    if not m:
        return None
    m2 = re.search(r'"%s"\s*:\s*"([^"]+)"' % lang, m.group(0))
    return m2.group(1) if m2 else None


def main():
    slugs_src = io.open(ARTICLES / "slugs.json", encoding="utf-8").read()
    added = skipped = missing = 0

    for lang in ("en", "ms", "ar"):
        path = ARTICLES / f"{lang}.ts"
        src = io.open(path, encoding="utf-8").read()
        for cid, (clang, parent_slug, label, desc) in LINKS.items():
            if clang != lang:
                continue
            cslug = child_slug(slugs_src, cid, lang)
            if not cslug:
                print(f"MISSING slug for {cid} ({lang}) — run press-import first")
                missing += 1
                continue
            target = f"blog/{cslug}"

            # locate the parent article object by its slug, then its own related array
            ms = re.search(r'"?slug"?:\s*[\'"]%s[\'"]' % re.escape(parent_slug), src)
            if not ms:
                print(f"MISSING parent {parent_slug} in {lang}.ts")
                missing += 1
                continue
            mr = re.search(r'("?related"?:\s*\[)(.*?)(\n(\s*)\],?\n)', src[ms.start():], re.S)
            if not mr:
                print(f"MISSING related array on {parent_slug}")
                missing += 1
                continue
            body = mr.group(2)
            if target in body:
                skipped += 1
                continue

            indent = mr.group(4)
            entry = (
                f",\n{indent}  {{\n"
                f'{indent}    "label": "{label}",\n'
                f'{indent}    "path": "{target}",\n'
                f'{indent}    "description": "{desc}"\n'
                f"{indent}  }}"
            )
            # the array's last element never ends in a comma here, so prepend one to the entry
            new_block = mr.group(1) + body.rstrip().rstrip(",") + entry + mr.group(3)
            start = ms.start() + mr.start()
            end = ms.start() + mr.end()
            src = src[:start] + new_block + src[end:]
            added += 1

        io.open(path, "w", encoding="utf-8", newline="\n").write(src)

    print(f"inbound links: {added} added, {skipped} already present, {missing} missing")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
