"""PRESS round 4 — rewrite alt text to the frame that actually shipped.

Writers wrote heroAlt and inlineAlt from the frame descriptions in BRIEF.md. Stage 4 then
changed many of those frames: the free provider could not stage a kitchen still life, so every
inline became a repo photo and several heroes were re-prompted to a bottle-led subject.

D26 says an alt text that describes an image the page is not showing is a worse defect than a
weak lead image. This rewrites those alts to what is really in the file. Run before
press-import.py writes the content modules.

Only ids listed here are touched; the rest keep the alt their writer wrote because their frame
did not change.
"""
import io
import json
from pathlib import Path

DRAFTS = Path(__file__).resolve().parent / "drafts"

# id -> {"heroAlt": ..., "inlineAlt": ...} — omit a key to leave it alone
FIX = {
    # --- heroes whose subject was re-prompted, and every inline, which is now a repo photo ---
    "olive-oil-vs-coconut-oil": {
        "heroAlt": "Two shallow glass bowls side by side on a white counter, the left holding green olive oil and the right holding solid white coconut oil",
        "inlineAlt": "A bottle of Palestinian extra virgin olive oil standing on a wooden table with whole olives and olive leaves scattered around it",
    },
    "garlic-infused-olive-oil": {
        "heroAlt": "A glass bottle of golden olive oil on a wooden board with two whole garlic bulbs beside it",
        "inlineAlt": "A bottle of olive oil held at the edge of a sunlit olive grove, a stone ledge and an olive branch in the frame",
    },
    "olive-oil-substitute": {
        "heroAlt": "Four small glass bottles of cooking oil in different shades of gold standing in a row on a wooden kitchen shelf",
        "inlineAlt": "Olive paste coming out of a stainless mill with green oil running down into the vat below",
    },
    "olive-oil-for-baking": {
        "heroAlt": "A glass carafe of green olive oil and lemons on a wooden kitchen table beside a window",
        "inlineAlt": "An old olive tree framing a hillside village and the sea at sunset, with olives resting on the stone ledge",
    },
    "olive-oil-bottle-size": {
        "inlineAlt": "Dark glass olive oil bottles moving along a filling line under stainless steel filling heads",
    },
    "olive-oil-bitter-taste": {
        "inlineAlt": "A small blue tasting glass of olive oil held in one hand at a laboratory bench",
    },
    "minyak-zaitun-vs-minyak-kelapa": {
        "heroAlt": "Sebotol kaca minyak zaitun hijau di sebelah kelapa muda dan isi kelapa parut putih di atas tikar anyaman",
        "inlineAlt": "Seorang wanita Malaysia bertudung memegang sebotol minyak zaitun di hadapan rumah kampung",
    },
    "minyak-zaitun-palsu": {
        "inlineAlt": "Tabung sampel kaca dan mikroskop di atas meja makmal penilaian minyak",
    },
    "rasa-minyak-zaitun": {
        "heroAlt": "Mangkuk kaca kecil berisi minyak zaitun hijau di atas meja kayu, cahaya siang dari tingkap",
        "inlineAlt": "Buah zaitun hijau dan ungu bergerak di atas pelongsor keluli menuju mesin perahan",
    },
    "beli-minyak-zaitun-online": {
        "heroAlt": "Kotak penghantaran kadbod di atas meja kayu dengan dua biji zaitun di sebelahnya",
        "inlineAlt": "Pekerja ladang membawa hasil kutipan zaitun menyusuri laluan di celah pokok zaitun",
    },
    "minyak-zaitun-tulen": {
        "inlineAlt": "Minyak zaitun hijau mengalir dari paip keluli ke dalam tangki terbuka di kilang perahan",
    },
    "minyak-zaitun-untuk-kek": {
        "heroAlt": "Sebotol kaca minyak zaitun hijau di atas meja kayu dapur dengan cahaya siang dari tingkap",
        "inlineAlt": "Pandangan dari udara ke atas ladang zaitun dengan barisan pokok memanjang ke ufuk",
    },
    "mawsim-qitaf-alzaytun": {
        "heroAlt": "بستان زيتون معمّر وقد فُرشت شباك القطاف تحت الأشجار في ضوء الخريف",
        "inlineAlt": "مزارع فلسطيني يرتدي الكوفية يفحص ثمار الزيتون على الغصن أثناء موسم القطاف",
    },
    "zayt-alzaytun-almukarrar": {
        "heroAlt": "زيت الزيتون يتدفق من أنبوب فولاذي إلى خزان مفتوح في المعصرة",
        "inlineAlt": "بستان زيتون عند الغروب، صفوف الأشجار ممتدة نحو الأفق",
    },
    "zayt-zaytun-baladi": {
        "inlineAlt": "مزارع يصب زيت الزيتون من زجاجة داكنة في وعاء فخاري على طاولة خشبية",
    },
    "afdal-zayt-zaytun": {
        "heroAlt": "عدة زجاجات من زيت الزيتون الأخضر بأحجام مختلفة على طاولة خشبية",
        "inlineAlt": "صناديق مرصوفة مملوءة بثمار الزيتون الأخضر والأرجواني بعد القطاف",
    },
    "zayt-alzaytun-balad-almansha": {
        "inlineAlt": "عمال يقطفون ثمار الزيتون من الأشجار في البستان أثناء الموسم",
    },
    "zujajat-zayt-alzaytun": {
        "heroAlt": "زجاجة زيت زيتون داكنة قائمة على طاولة خشبية وحولها حبات زيتون وأوراق",
        "inlineAlt": "صف من الزجاجات الداكنة يمتلئ بزيت الزيتون على خط التعبئة",
    },
}


def main():
    changed = 0
    for aid, fields in FIX.items():
        p = DRAFTS / f"{aid}.json"
        if not p.exists():
            print(f"MISSING {p.name}")
            continue
        d = json.load(io.open(p, encoding="utf-8"))
        touched = []
        for k, v in fields.items():
            if d.get(k) != v:
                d[k] = v
                touched.append(k)
        if touched:
            io.open(p, "w", encoding="utf-8", newline="\n").write(
                json.dumps(d, ensure_ascii=False, indent=2) + "\n")
            changed += 1
            print(f"{aid}: {', '.join(touched)}")
    print(f"\n{changed} drafts had alt text rewritten to the real frame")


if __name__ == "__main__":
    main()
