"""PRESS round 8, Stage 5 step 10 — inbound internal links.

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
    "olive-oil-is-it-healthy": ("en", "extra-virgin-olive-oil-health-benefits-for-malaysian-families",
        "Olive oil: is it healthy?",
        "What a label may legally tell you in Malaysia, and what no label can."),
    "is-it-good-to-cook-with-extra-virgin-olive-oil": ("en", "olive-oil-smoke-point-what-heat-it-can-take",
        "Is it good to cook with extra virgin olive oil?",
        "The decision behind the temperatures: three heat bands, and which oil each deserves."),
    "vitamins-in-extra-virgin-olive-oil": ("en", "extra-virgin-olive-oil-vs-pure-olive-oil",
        "Vitamins in extra virgin olive oil",
        "What is actually in the bottle, compound by compound, and why refining removes it."),
    "advantages-of-extra-virgin-olive-oil": ("en", "extra-virgin-olive-oil-vs-pure-olive-oil",
        "Advantages of extra virgin olive oil",
        "What the top grade gives a kitchen, and the three limits attached to it."),
    "consuming-extra-virgin-olive-oil-day-to-day": ("en", "olive-oil-for-bread-and-dipping",
        "Consuming extra virgin olive oil day to day",
        "Where a bottle actually goes across a week, measured per dish rather than per person."),
    "extra-virgin-olive-oil-uses": ("en", "how-to-cook-with-olive-oil-in-a-malaysian-kitchen",
        "Extra virgin olive oil uses",
        "Four families of use, and what grade and freshness each one needs."),
    "extra-virgin-olive-oil-in-malaysia": ("en", "why-olive-oil-is-becoming-popular-in-malaysia",
        "Extra virgin olive oil in Malaysia",
        "A shelf survey: three places to buy the grade, and what to check in each."),
    "best-extra-virgin-olive-oil-in-malaysia": ("en", "how-to-compare-olive-oil-brands-in-malaysia",
        "Best extra virgin olive oil in Malaysia",
        "Why no honest page ranks this market, and what best can mean against a use."),
    "which-olive-oil-to-buy": ("en", "what-size-olive-oil-bottle-to-buy",
        "Which olive oil to buy",
        "Four questions in order, ending in a grade and a size."),
    "kelebihan-olive-oil-untuk-dapur-harian": ("ms", "manfaat-kesihatan-minyak-zaitun-dara-untuk-keluarga-malaysia",
        "Kelebihan olive oil untuk dapur harian",
        "Kelebihan di dapur dan pada bil belanja, berserta lajur had yang jujur."),
    "kelebihan-extra-virgin-olive-oil-berbanding-gred-lain": ("ms", "apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "Kelebihan extra virgin berbanding gred lain",
        "Kelebihannya ialah apa yang masih tinggal, dan bila ia boleh musnah."),
    "cara-makan-minyak-zaitun-setiap-hari": ("ms", "minyak-zaitun-untuk-roti-dan-cicahan",
        "Cara makan minyak zaitun setiap hari",
        "Slot sebenar dalam menu Malaysia, diukur ikut hidangan bukan ikut orang."),
    "minyak-zaitun-panduan-lengkap": ("ms", "mengapa-minyak-zaitun-semakin-popular-di-malaysia",
        "Minyak zaitun: panduan lengkap",
        "Enam soalan asas dijawab ringkas, dengan pautan ke bacaan penuh."),
    "minyak-zaitun-original-cara-pastikan": ("ms", "cara-kenal-minyak-zaitun-palsu",
        "Minyak zaitun original: apa perkataan itu janjikan",
        "Apa yang boleh disahkan sebelum bayar, dan apa yang tidak boleh."),
    "maksud-olive-oil-dalam-bahasa-malaysia": ("ms", "apa-itu-minyak-zaitun-extra-virgin-dan-gred-lain",
        "Maksud olive oil dalam bahasa Malaysia",
        "Jambatan istilah antara label Inggeris dan perbualan Melayu."),
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
