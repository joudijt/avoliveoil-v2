"""
Writes public/product-photos/<id>.jpg — one 1200x1200 JPEG per catalogue product,
from the white square in src/assets/images/<image>.png (FORGE PRODUCTS-R1, spec §1).

Why a JPEG beside the webp variants: the Product JSON-LD `image` must be an absolute,
stable, crawler-friendly URL. The webp variants Picture renders are Vite-hashed
(/assets/product-organic-1200-<hash>.webp), so their URL changes with every byte change
and only exists after a vite build; a plain JPEG at a fixed path is what Google's
product snippets and every other consumer read without surprises.

Why not public/products/: /products would become a real directory on the host, and with
`Options -Indexes` + `DirectorySlash Off` a visit to the bare /products URL would answer
403 instead of reaching the SPA's redirect to /en/products.

Usage: python scripts/product-photos.py [--check]
  --check  fails when a JPEG is missing or differs from what the source would produce.
"""
import io
import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CATALOGUE = json.loads((ROOT / "src/data/catalogue.json").read_text(encoding="utf8"))
SRC = ROOT / "src/assets/images"
OUT = ROOT / "public/product-photos"
SIZE = 1200


def render(png: Path) -> bytes:
    im = Image.open(png)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    if im.size != (SIZE, SIZE):
        raise SystemExit(f"product-photos: {png.name} is {im.size[0]}x{im.size[1]}, expected {SIZE}x{SIZE}")
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=85, optimize=True, progressive=True)
    return buf.getvalue()


def main() -> int:
    check = "--check" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    bad = 0
    for p in CATALOGUE["products"]:
        src = SRC / f"{p['image']}.png"
        if not src.exists():
            print(f"x missing source {src.relative_to(ROOT)}")
            bad += 1
            continue
        data = render(src)
        dest = OUT / f"{p['id']}.jpg"
        if check:
            if not dest.exists() or dest.read_bytes() != data:
                print(f"x {dest.relative_to(ROOT)} is missing or stale - run: python scripts/product-photos.py")
                bad += 1
        else:
            dest.write_bytes(data)
            print(f"ok wrote {dest.relative_to(ROOT)} ({len(data) // 1024} KB)")
    if check and not bad:
        print(f"ok {len(CATALOGUE['products'])} product photos up to date")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
