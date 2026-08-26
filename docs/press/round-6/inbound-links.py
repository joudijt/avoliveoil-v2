"""PRESS round 6, Stage 5 step 10 — inbound internal links.

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
    "olive-oil-roasted-vegetables": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Olive oil for roasting vegetables",
        "How much oil per tray, and why a crowded tray steams instead of crisping."),
    "olive-oil-vs-butter": ("en", "olive-oil-substitute-what-to-use-instead",
        "Olive oil vs butter",
        "As a spread and a cooking fat, not a baking swap, on flavour and browning."),
    "olive-oil-for-steak": ("en", "olive-oil-marinade-what-it-does",
        "Olive oil for steak",
        "The two-oil trick for a stovetop sear, and where the good oil goes after."),
    "olive-oil-fried-egg": ("en", "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "Olive oil fried egg",
        "The Spanish method: a shallow pool of oil, hot oil spooned over the yolk."),
    "olive-oil-focaccia": ("en", "olive-oil-for-bread-and-dipping",
        "Olive oil focaccia recipe",
        "Baking the dough itself, dimples and all, not dipping bread that already exists."),
    "olive-oil-popcorn": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Olive oil popcorn",
        "Popping corn in olive oil on the stovetop, and what extra virgin adds."),
    "minyak-zaitun-untuk-sayur-panggang": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Minyak zaitun untuk sayur panggang",
        "Berapa banyak minyak setiap dulang, dan kenapa dulang penuh menghalang kegaringan."),
    "minyak-zaitun-vs-mentega": ("ms", "minyak-zaitun-untuk-roti-dan-cicahan",
        "Minyak zaitun vs mentega",
        "Sebagai sapuan dan lemak masakan, bukan penukaran bakeri, pada rasa dan sifat perang."),
    "minyak-zaitun-untuk-steak": ("ms", "minyak-zaitun-untuk-goreng",
        "Minyak zaitun untuk steak",
        "Teknik dua minyak untuk sear di atas dapur, dan bila minyak dara masuk."),
    "minyak-zaitun-untuk-telur": ("ms", "minyak-zaitun-untuk-roti-dan-cicahan",
        "Minyak zaitun untuk telur goreng",
        "Gaya Sepanyol: lopak minyak cetek, disiram panas ke atas kuning."),
    "minyak-zaitun-murah": ("ms", "harga-minyak-zaitun-di-malaysia",
        "Kenapa minyak zaitun tak pernah murah",
        "Kos sebenar di sebalik harga, dan bila harga rendah jadi tanda amaran."),
    "minyak-zaitun-popcorn": ("ms", "minyak-zaitun-untuk-masak-panduan-dapur",
        "Minyak zaitun untuk popcorn",
        "Popcorn atas dapur, bukan bag mikrogelombang, dan apa yang minyak dara tambah."),
    "zayt-alzaytun-lilkhudar-almashwi": ("ar", "zayt-alzaytun-lil-tabkh",
        "زيت الزيتون للخضار المشوي",
        "كمية الزيت لكل صينية، ولماذا الصينية المزدحمة تمنع التحمّر."),
    "zayt-alzaytun-walzubda": ("ar", "zayt-alzaytun-lilmuajanat",
        "زيت الزيتون والزبدة",
        "كدهن للطبخ والدهن على الخبز، لا في المعجنات، على الطعم والاسمرار."),
    "zayt-alzaytun-lilsteak": ("ar", "zayt-alzaytun-lilqaly",
        "زيت الزيتون للستيك",
        "حيلة الزيتين للسير على الموقد، ومتى يُسكب البكر الممتاز."),
    "zayt-alzaytun-lilbayd": ("ar", "zayt-alzaytun-lil-tabkh",
        "بيض بزيت الزيتون",
        "الطريقة الإسبانية: غمر خفيف من الزيت، يُسكب ساخناً فوق الصفار."),
    "zayt-alzaytun-al-rakhis": ("ar", "sier-zayt-alzaytun-fi-malizya",
        "هل يمكن أن يكون زيت الزيتون رخيصاً",
        "التكلفة الحقيقية خلف السعر، ومتى يكون الرخص علامة تحذير."),
    "zayt-alzaytun-lilfawshar": ("ar", "zayt-alzaytun-lil-tabkh",
        "زيت الزيتون للفوشار",
        "فوشار على الموقد بزيت الزيتون، وما يضيفه البكر الممتاز هنا."),
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
