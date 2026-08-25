"""PRESS round 3 — generate the image slots the repo's own photography cannot fill.

Stage 4 is reuse-first: twelve of the eighteen heroes are crops of existing repo photos
(see derive-images.py). This script covers only what is left — six heroes whose subject
does not exist anywhere in the repo, and every inline image, because the repo has nine
usable frames and this round needs eighteen distinct ones.

Sequential by design. The free provider 429s hard when two jobs run at once, and a shell
loop around the generator hides per-item failures behind exit 0 — so this checks the
artefact on disk after every call and prints a per-file verdict at the end.
"""
import subprocess
import sys
from pathlib import Path

IMGEN = Path.home() / ".claude" / "skills" / "press" / "bin" / "imgen.py"
OUT = Path(__file__).resolve().parents[3] / "src" / "assets" / "images" / "press"

STILL = "photographic still life, sharp focus on the subject, subject fills the frame, natural daylight, no text, no lettering, no labels"

# (filename stem, prompt, max KB)
JOBS = [
    # ---- six generated heroes: no repo photo carries these subjects ----
    ("olive-oil-air-fryer-hero",
     "an open air fryer basket on a kitchen counter holding raw potato wedges coated in olive oil, "
     "a small glass bowl of green olive oil and a silicone brush beside it, " + STILL, 110),
    ("minyak-zaitun-untuk-goreng-hero",
     "a stainless steel frying pan on a stovetop with a thin shimmering layer of green olive oil, "
     "sliced onion at the edge of the pan, " + STILL, 110),
    ("botol-minyak-zaitun-hero",
     "three dark green glass olive oil bottles of different sizes standing in a row on a plain "
     "wooden shelf against a plain pale wall, " + STILL, 110),
    ("minyak-zaitun-vs-minyak-masak-hero",
     "four clear glass bottles of different cooking oils standing in a row on a kitchen counter, "
     "colours ranging from deep green to pale yellow, plain background, " + STILL, 110),
    ("humudat-zayt-alzaytun-hero",
     "a clean laboratory bench with a glass beaker of green olive oil, a glass pipette and a small "
     "white ceramic dish on a white surface, bright even light, " + STILL, 110),
    ("zayt-alzaytun-lilsalata-hero",
     "a Levantine table seen from above with a bowl of chopped tomato and parsley salad, a small "
     "bowl of olive oil, flatbread and a dish of olives, " + STILL, 110),

    # ---- eighteen inline images ----
    ("evoo-salad-dressing-inline",
     "a white ceramic bowl of mixed green salad leaves beside a small glass jug of olive oil and "
     "half a lemon on a wooden table, seen from above, " + STILL, 80),
    ("evoo-vs-pure-olive-oil-inline",
     "two clear glass tumblers side by side on a marble surface, one holding deep green oil and "
     "one holding pale yellow oil, plain background, " + STILL, 80),
    ("olive-oil-air-fryer-inline",
     "potato wedges being brushed with olive oil on a metal air fryer tray, close view on a "
     "kitchen counter, " + STILL, 80),
    ("olive-oil-marinade-inline",
     "a shallow glass dish of raw chicken pieces coated in olive oil with garlic cloves, lemon "
     "slices and rosemary sprigs, on a wooden table, " + STILL, 80),
    ("olive-oil-for-bread-inline",
     "a small white saucer of green olive oil beside torn flatbread and a spoon of dried thyme on "
     "a wooden board, " + STILL, 80),
    ("olive-oil-shelf-life-inline",
     "a dark green glass olive oil bottle standing closed inside a wooden kitchen cupboard beside "
     "storage jars, dim indoor light, " + STILL, 80),
    ("minyak-zaitun-untuk-goreng-inline",
     "a wok on a gas flame with olive oil and chopped garlic, seen from above, " + STILL, 80),
    ("minyak-zaitun-pomace-inline",
     "a heap of spent olive pomace, dark brown crushed olive pulp and stones, on a concrete floor "
     "beside a metal shovel, " + STILL, 80),
    ("cara-simpan-minyak-zaitun-inline",
     "a dark glass bottle of olive oil with its cap on, standing on a cool tiled kitchen shelf "
     "away from the window, soft indoor light, " + STILL, 80),
    ("botol-minyak-zaitun-inline",
     "a hand holding a dark green glass bottle up towards a window so light passes through the "
     "neck of the bottle, " + STILL, 80),
    ("resepi-minyak-zaitun-inline",
     "a wooden table set with a bowl of cucumber and tomato salad, a small jug of olive oil, a "
     "lemon and a pepper grinder, " + STILL, 80),
    ("minyak-zaitun-vs-minyak-masak-inline",
     "two frying pans side by side on a kitchen counter, one holding green olive oil and one "
     "holding pale cooking oil, seen from above, " + STILL, 80),
    ("alfarq-bayn-albikr-walmumtaz-inline",
     "two small glass tasting cups of olive oil side by side on a stone surface, one noticeably "
     "greener than the other, olive leaves beside them, " + STILL, 80),
    ("taem-zayt-alzaytun-inline",
     "a cobalt blue tasting glass half filled with olive oil, held in two hands over a wooden "
     "bench, " + STILL, 80),
    ("humudat-zayt-alzaytun-inline",
     "a glass flask of golden green olive oil on a laboratory bench beside a rack of small empty "
     "sample tubes, " + STILL, 80),
    ("zayt-alzaytun-aludwi-inline",
     "an olive branch heavy with green olives growing in a grove with bare untreated soil "
     "beneath, morning light, " + STILL, 80),
    ("zayt-alzaytun-lilsalata-inline",
     "a hand drizzling olive oil from a small jug over a bowl of chopped tomato and parsley "
     "salad, close view, " + STILL, 80),
    ("zayt-alzaytun-lilqaly-inline",
     "a deep pan of olive oil heating on a stove with one slice of aubergine just added, "
     "kitchen daylight, " + STILL, 80),
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    results = []
    for stem, prompt, kb in JOBS:
        path = OUT / f"{stem}.webp"
        if path.exists() and path.stat().st_size > 4096:
            print(f"SKIP  {stem} — already on disk ({path.stat().st_size // 1024} KB)", flush=True)
            results.append((stem, "skip", path.stat().st_size))
            continue
        print(f"GEN   {stem}", flush=True)
        proc = subprocess.run(
            [sys.executable, str(IMGEN), prompt, "-o", str(path), "-W", "1280", "-H", "720",
             "--max-kb", str(kb)],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        # The exit code is not the evidence — the file on disk is.
        size = path.stat().st_size if path.exists() else 0
        if size > 4096:
            print(f"  ok  {size // 1024} KB", flush=True)
            results.append((stem, "ok", size))
        else:
            tail = (proc.stdout or "")[-200:] + (proc.stderr or "")[-200:]
            print(f"  FAIL rc={proc.returncode} {tail!r}", flush=True)
            results.append((stem, "FAIL", size))

    print("\n---- summary ----")
    bad = [r for r in results if r[1] == "FAIL"]
    for stem, state, size in results:
        print(f"{state:<5} {size // 1024:>4} KB  {stem}")
    print(f"\n{len(results) - len(bad)}/{len(results)} produced a file")
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
