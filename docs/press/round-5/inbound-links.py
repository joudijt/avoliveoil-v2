"""PRESS round 5, Stage 5 step 10 — inbound internal links.

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
    "aglio-e-olio": ("en", "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "Aglio e olio with extra virgin olive oil",
        "The four-ingredient pasta where the oil is the sauce, and the emulsion step people miss."),
    "olive-oil-vs-avocado-oil": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Olive oil vs avocado oil",
        "Two oils compared on flavour, heat and price per litre, without the health argument."),
    "olive-oil-and-balsamic": ("en", "extra-virgin-olive-oil-salad-dressing",
        "Olive oil and balsamic vinegar",
        "Why the pairing needs a ratio, and where a cheap balsamic changes it."),
    "olive-oil-for-hummus": ("en", "olive-oil-for-bread-and-dipping",
        "Olive oil for hummus",
        "Hummus takes oil twice, and the two jobs want different things."),
    "olive-oil-for-grilling": ("en", "olive-oil-marinade-what-it-does",
        "Olive oil for grilling and barbecue",
        "Oil the food, not the grate, and save the good oil for after it comes off."),
    "cloudy-olive-oil": ("en", "why-does-olive-oil-taste-bitter",
        "Why is my olive oil cloudy",
        "Cold haze, unfiltered sediment and actual spoilage are three different things."),
    "minyak-zaitun-vs-minyak-sawit": ("ms", "minyak-zaitun-vs-minyak-masak-lain",
        "Minyak zaitun vs minyak sawit",
        "Minyak yang negara ini keluarkan, lawan minyak yang diimport, sebagai lemak masakan."),
    "minyak-zaitun-untuk-pasta": ("ms", "resepi-mudah-dengan-minyak-zaitun",
        "Minyak zaitun untuk pasta",
        "Aglio olio versi rumah, dengan air pasta sebagai pengikat."),
    "minyak-zaitun-keruh": ("ms", "cara-simpan-minyak-zaitun",
        "Kenapa minyak zaitun jadi keruh",
        "Keruh sejuk, mendapan, dan minyak yang betul-betul rosak adalah tiga perkara berbeza."),
    "minyak-zaitun-untuk-ikan-bakar": ("ms", "minyak-zaitun-untuk-goreng",
        "Minyak zaitun untuk ikan bakar",
        "Sapu pada ikan, bukan pada jaring, dan tuangan akhir selepas ikan diangkat."),
    "minyak-zaitun-untuk-air-fryer": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Minyak zaitun untuk air fryer",
        "Berapa banyak, kenapa bukan sembur aerosol, dan makanan mana yang sesuai."),
    "minyak-zaitun-untuk-roti": ("ms", "minyak-zaitun-untuk-salad-dan-hidangan-sejuk",
        "Minyak zaitun untuk roti dan cicahan",
        "Guna tanpa panas menunjukkan watak sebenar minyak."),
    "anwae-alzaytun": ("ar", "zayt-alzaytun-hasab-balad-almansha",
        "أنواع الزيتون التي يُعصر منها الزيت",
        "ما يفعله كل صنف بالطعم والمرارة واللذعة."),
    "zayt-alzaytun-walzaatar": ("ar", "zayt-alzaytun-lilsalata",
        "زيت الزيتون والزعتر",
        "الخلطة ونسبها، والمناقيش وكيف تُدهن."),
    "zayt-alzaytun-lilmuajanat": ("ar", "zayt-alzaytun-lil-tabkh",
        "زيت الزيتون للمعجنات",
        "نسبة الزيت إلى الطحين، ومتى يُستعمل زيت ألطف."),
    "zayt-alzaytun-lilshawi": ("ar", "zayt-alzaytun-lilqaly",
        "زيت الزيتون للشوي",
        "ادهن الطعام لا الشبك، واحتفظ بالسكبة الأخيرة."),
    "tajmid-zayt-alzaytun": ("ar", "hifz-zayt-alzaytun",
        "تجميد زيت الزيتون",
        "التصلّب في البرد ليس دليل جودة ولا دليل غش."),
    "zayt-alzaytun-fi-ramadan": ("ar", "sier-zayt-alzaytun-fi-malizya",
        "زيت الزيتون في رمضان",
        "ما يُشترى قبل الشهر، وأطباق الإفطار بلا طبخ طويل."),
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
