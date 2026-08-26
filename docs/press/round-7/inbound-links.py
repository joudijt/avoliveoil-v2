"""PRESS round 7, Stage 5 step 10 — inbound internal links.

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

LINKS = {
    "olive-oil-vs-sunflower-oil": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Olive oil vs sunflower oil",
        "Flavour, smoke behaviour and price per use, olive oil against a refined seed oil."),
    "olive-oil-vs-sesame-oil": ("en", "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "Olive oil vs sesame oil",
        "Two strong, distinct flavours side by side, and where each earns its place."),
    "olive-oil-coffee": ("en", "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "Olive oil coffee",
        "The oil-in-coffee trend: quantity, why it needs blending, and what it tastes like."),
    "olive-oil-ice-cream": ("en", "olive-oil-for-cakes-and-baking",
        "Olive oil ice cream",
        "A churned Mediterranean dessert, extra virgin's fruit and pepper against the sweetness."),
    "olive-oil-orange-cake": ("en", "olive-oil-for-cakes-and-baking",
        "Olive oil orange cake",
        "One specific recipe: zest, juice, and why oil keeps the crumb moist for days."),
    "olive-oil-mashed-potatoes": ("en", "olive-oil-vs-butter",
        "Olive oil mashed potatoes",
        "A dairy-free mash, warm oil folded in, and how the texture differs from butter."),
    "minyak-zaitun-vs-minyak-bunga-matahari": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Minyak zaitun vs minyak bunga matahari",
        "Rasa, sifat takat berasap dan kos setiap kali guna, dua minyak berbanding."),
    "minyak-zaitun-vs-minyak-bijan": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Minyak zaitun vs minyak bijan",
        "Dua minyak berperisa kuat, dan bila setiap satu menang di dapur."),
    "kopi-minyak-zaitun": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Kopi minyak zaitun",
        "Trend minyak dalam kopi: kuantiti, kenapa perlu dikacau kuat, dan rasa sebenar."),
    "minyak-zaitun-ais-krim": ("ms", "minyak-zaitun-untuk-kek-dan-bakeri",
        "Ais krim minyak zaitun",
        "Pencuci mulut gaya Mediterranean, rasa buah dan pedas extra virgin menonjol."),
    "minyak-zaitun-kek-oren": ("ms", "minyak-zaitun-untuk-kek-dan-bakeri",
        "Kek oren minyak zaitun",
        "Satu resepi kek spesifik: kulit dan jus oren, kek lembap tanpa peti sejuk."),
    "minyak-zaitun-untuk-pizza": ("ms", "minyak-zaitun-untuk-roti-dan-cicahan",
        "Minyak zaitun untuk pizza",
        "Adunan dan kerak, bukan lopak untuk mencelup — minyak dilipat dan disapu."),
    "zayt-alzaytun-wazayt-abad-alshams": ("ar", "zayt-alzaytun-lil-tabkh",
        "زيت الزيتون وزيت عباد الشمس",
        "الطعم وسلوك درجة التدخين وتكلفة الاستعمال، زيتان جنباً إلى جنب."),
    "zayt-alzaytun-walsimsim": ("ar", "zayt-alzaytun-lil-tabkh",
        "زيت الزيتون والسمسم",
        "زيتان بطعم قوي ومختلف، ومتى يفوز كل واحد في المطبخ."),
    "qahwat-bizayt-alzaytun": ("ar", "zayt-alzaytun-lil-tabkh",
        "قهوة بزيت الزيتون",
        "موضة الزيت في القهوة: الكمية، لماذا يحتاج خلطاً قوياً، والطعم الفعلي."),
    "ays-krim-bizayt-alzaytun": ("ar", "zayt-alzaytun-lilmuajanat",
        "آيس كريم بزيت الزيتون",
        "حلوى متوسطية مخفوقة، طعم البكر الممتاز الفاكهي مقابل الحلاوة."),
    "kaykat-alburtuqal-bizayt-alzaytun": ("ar", "zayt-alzaytun-lilmuajanat",
        "كيكة البرتقال بزيت الزيتون",
        "وصفة كيكة واحدة محددة: قشر وعصير البرتقال، وقوام رطب لأيام."),
    "zayt-alzaytun-lilbatatis-almahrusa": ("ar", "zayt-alzaytun-walzubda",
        "زيت الزيتون للبطاطس المهروسة",
        "بطاطس مهروسة بلا ألبان، زيت دافئ يُطوى وقوام أخف."),
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
