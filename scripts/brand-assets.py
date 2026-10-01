#!/usr/bin/env python3
"""Derive every brand asset the site serves from the ONE logo the header renders.

Source of truth is `src/assets/logo/logo_theme.svg` — the exact file Navbar.tsx,
Footer.tsx and Loading.tsx import. Nothing here invents a colour: the gold
(#B88A2A) and the olive-dark (#2E3A24) are read out of that file's own <style>
block, and the tile background is the site's existing cream token (#FFFDF8).

Why a tile at all: the palm inside the emblem is a *knockout*, not a white
shape. Whatever sits behind the SVG shows through the fronds, so a transparent
favicon renders a dark palm on a dark browser theme. Painting the site cream
behind it makes every icon read exactly the way the header does.

Rasterising goes through headless Chrome because cairosvg is not installed on
this box. Chrome silently writes nothing when handed a Git-Bash-style
`/c/Users/...` path, so every path crossing the command line is normalised to
`C:/...` form and stdout is checked for "bytes written".

Re-runnable: `python scripts/brand-assets.py`. Add --check to verify the
outputs exist and are non-empty without regenerating them.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "src" / "assets" / "logo" / "logo_theme.svg"
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"

CHROME = Path("C:/Program Files/Google/Chrome/Application/chrome.exe")

# Read out of the source SVG at run time; these are the fallbacks only.
GOLD = "#B88A2A"
INK = "#2E3A24"
CREAM = "#FFFDF8"  # --color-cream in src/index.css

# The photo behind the OG card. The grove frame is used rather than either
# bottle frame on purpose: the bottle carries label text ("ORGANIC", "Rich in
# antioxidants") that must not be enlarged into a social card on a site bound
# by Malaysian Food Regulations 1985 Reg. 18(6).
OG_PHOTO = ROOT / "src" / "assets" / "images" / "OliveGroveSunsetHero.png"

# public/.htaccess serves every png/jpeg/svg with "access plus 1 year", so the
# two paths that already existed before this round — favicon.svg (the purple
# template chevron) and og-image.jpg — are sitting in browser and social-scraper
# caches until 2027. New bytes at those URLs would never reach a returning
# visitor. The marks are therefore published at NEW, dated URLs, which is what
# index.html and OG_IMAGE_PATH point at; the legacy paths are rewritten too, so
# a cold request for either gets the brand rather than the template.
VERSION = "2026-09"

# Every file this script owns. Referenced by --check and by the report.
STORE_FACTS = ROOT / "src" / "data" / "storeFacts.json"

# One manifest per language. The site is bilingual (EN / MS) and the prerenderer
# snapshots both from the same shell, so a single English manifest gave a
# Malay visitor who installs the site an English name and the English
# homepage. `lang`/`start_url`/`name` differ; the icons do not.
MANIFESTS = [
    ("site.webmanifest", "en", "ltr", "name"),
    ("site-ms.webmanifest", "ms", "ltr", "nameMs"),
]

OUTPUTS = [
    PUBLIC / f"favicon-{VERSION}.svg",
    PUBLIC / f"og-card-{VERSION}.jpg",
    PUBLIC / "favicon.svg",
    PUBLIC / "favicon.ico",
    PUBLIC / "favicon-32.png",
    PUBLIC / "apple-touch-icon.png",
    PUBLIC / "mask-icon.svg",
    PUBLIC / "logo-512.png",
    PUBLIC / "og-image.jpg",
    ICONS / "icon-192.png",
    ICONS / "icon-512.png",
    ICONS / "icon-maskable-512.png",
    *[PUBLIC / name for name, _, _, _ in MANIFESTS],
]


# --------------------------------------------------------------------------
# Reading the source logo
# --------------------------------------------------------------------------

_TOKEN = re.compile(r"[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e[-+]?\d+)?")


def path_bbox(d: str) -> tuple[float, float, float, float]:
    """Bounding box of one path's `d`, control points included.

    Control points make the box a slight over-estimate, never an under-estimate,
    which is the safe direction when it is used to crop.
    """
    ts = _TOKEN.findall(d)
    i = 0
    cx = cy = sx = sy = 0.0
    cmd = None
    pts: list[tuple[float, float]] = []

    def num() -> float:
        nonlocal i
        v = float(ts[i])
        i += 1
        return v

    while i < len(ts):
        if re.match(r"[A-Za-z]", ts[i]):
            cmd = ts[i]
            i += 1
            if cmd in ("Z", "z"):
                cx, cy = sx, sy
                continue
        if cmd in ("M", "L"):
            cx, cy = num(), num()
            pts.append((cx, cy))
            if cmd == "M":
                sx, sy, cmd = cx, cy, "L"
        elif cmd in ("m", "l"):
            cx += num()
            cy += num()
            pts.append((cx, cy))
            if cmd == "m":
                sx, sy, cmd = cx, cy, "l"
        elif cmd == "H":
            cx = num()
            pts.append((cx, cy))
        elif cmd == "h":
            cx += num()
            pts.append((cx, cy))
        elif cmd == "V":
            cy = num()
            pts.append((cx, cy))
        elif cmd == "v":
            cy += num()
            pts.append((cx, cy))
        elif cmd in ("C", "c", "S", "s", "Q", "q", "T", "t"):
            n = {"C": 6, "S": 4, "Q": 4, "T": 2}[cmd.upper()]
            vals = [num() for _ in range(n)]
            if cmd.islower():
                abs_pts = [(cx + vals[k], cy + vals[k + 1]) for k in range(0, n, 2)]
            else:
                abs_pts = [(vals[k], vals[k + 1]) for k in range(0, n, 2)]
            pts.extend(abs_pts)
            cx, cy = abs_pts[-1]
        elif cmd in ("A", "a"):
            vals = [num() for _ in range(7)]
            if cmd == "a":
                cx += vals[5]
                cy += vals[6]
            else:
                cx, cy = vals[5], vals[6]
            pts.append((cx, cy))
        else:  # pragma: no cover - unreachable for this file
            i += 1
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


def read_logo() -> dict:
    src = LOGO.read_text(encoding="utf-8")
    colours = dict(re.findall(r"\.(cls-\d+)\s*\{\s*fill:\s*(#[0-9A-Fa-f]{6})", src))
    emblem = re.findall(r'<path class="cls-2"[^>]*/>', src)
    wordmark = re.findall(r'<path class="cls-1"[^>]*/>', src)
    if not emblem or not wordmark:
        sys.exit("logo_theme.svg no longer splits into cls-1/cls-2 — check the source file")

    boxes = [path_bbox(re.search(r'd="([^"]*)"', p).group(1)) for p in emblem]
    x0 = min(b[0] for b in boxes)
    y0 = min(b[1] for b in boxes)
    x1 = max(b[2] for b in boxes)
    y1 = max(b[3] for b in boxes)

    vb = re.search(r'viewBox="([^"]+)"', src).group(1).split()
    return {
        "emblem": emblem,
        "wordmark": wordmark,
        "emblem_box": (x0, y0, x1, y1),
        "gold": colours.get("cls-2", GOLD),
        "ink": colours.get("cls-1", INK),
        "viewbox": [float(v) for v in vb],
        "source": src,
    }


# --------------------------------------------------------------------------
# SVG composition
# --------------------------------------------------------------------------


def emblem_svg(logo: dict, *, tile: str | None, pad_ratio: float = 0.11, radius_ratio: float = 0.22) -> str:
    """Square emblem, optionally on a rounded tile.

    `pad_ratio` is a share of the final square, so the emblem keeps the same
    optical weight whatever the output size.
    """
    x0, y0, x1, y1 = logo["emblem_box"]
    w, h = x1 - x0, y1 - y0
    art = max(w, h)
    side = art / (1 - 2 * pad_ratio)
    ox = x0 - (side - w) / 2
    oy = y0 - (side - h) / 2
    tile_rect = ""
    if tile:
        r = side * radius_ratio
        tile_rect = (
            f'\n  <rect x="{ox:.3f}" y="{oy:.3f}" width="{side:.3f}" height="{side:.3f}" '
            f'rx="{r:.3f}" ry="{r:.3f}" fill="{tile}"/>'
        )
    paths = "\n  ".join(logo["emblem"])
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox:.3f} {oy:.3f} {side:.3f} {side:.3f}">\n'
        f"  <style>.cls-2{{fill:{logo['gold']};}}</style>{tile_rect}\n"
        f"  {paths}\n</svg>\n"
    )


def mask_icon_svg(logo: dict) -> str:
    """Safari pinned-tab icon: one flat colour, no <style>, no tile.

    Safari recolours the shape and ignores fills, so the knockout palm has to
    survive as real holes in the path data — it does, the fronds are subpaths
    of the same path with the default nonzero rule cutting them out.
    """
    x0, y0, x1, y1 = logo["emblem_box"]
    w, h = x1 - x0, y1 - y0
    side = max(w, h) * 1.06
    ox = x0 - (side - w) / 2
    oy = y0 - (side - h) / 2
    paths = "\n  ".join(p.replace(' class="cls-2"', ' fill="#000000"') for p in logo["emblem"])
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox:.3f} {oy:.3f} {side:.3f} {side:.3f}">\n'
        f"  {paths}\n</svg>\n"
    )


def lockup_svg(logo: dict, *, tile: str) -> str:
    """The full header lockup, unchanged, on an opaque background."""
    vb = logo["viewbox"]
    pad = vb[3] * 0.14
    ox, oy = vb[0] - pad, vb[1] - pad
    w, h = vb[2] + 2 * pad, vb[3] + 2 * pad
    paths = "\n  ".join(logo["emblem"] + logo["wordmark"])
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{ox:.3f} {oy:.3f} {w:.3f} {h:.3f}">\n'
        f"  <style>.cls-1{{fill:{logo['ink']};}}.cls-2{{fill:{logo['gold']};}}</style>\n"
        f'  <rect x="{ox:.3f}" y="{oy:.3f}" width="{w:.3f}" height="{h:.3f}" fill="{tile}"/>\n'
        f"  {paths}\n</svg>\n"
    )


# --------------------------------------------------------------------------
# Rasterising through headless Chrome
# --------------------------------------------------------------------------


def _win(path: Path) -> str:
    """`C:/…` form — Chrome writes nothing when given a Git Bash `/c/…` path."""
    return str(path.resolve()).replace("\\", "/")


def render_png(svg_text: str, out: Path, width: int, height: int, *, background: str | None) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        tmpdir = Path(tmp)
        svg_file = tmpdir / "art.svg"
        svg_file.write_text(svg_text, encoding="utf-8")
        bg = background or "transparent"
        html = (
            "<!doctype html><html><head><meta charset='utf-8'><style>"
            f"html,body{{margin:0;padding:0;width:{width}px;height:{height}px;"
            f"background:{bg};overflow:hidden}}"
            f"img{{display:block;width:{width}px;height:{height}px}}"
            "</style></head><body>"
            f"<img src='{_win(svg_file)}'></body></html>"
        )
        page = tmpdir / "page.html"
        page.write_text(html, encoding="utf-8")
        cmd = [
            str(CHROME),
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--hide-scrollbars",
            f"--window-size={width},{height}",
            f"--screenshot={_win(out)}",
        ]
        if background is None:
            cmd.append("--default-background-color=00000000")
        cmd.append(f"file:///{_win(page)}")
        res = subprocess.run(cmd, capture_output=True, text=True)
        blob = (res.stdout or "") + (res.stderr or "")
        if "bytes written" not in blob:
            sys.exit(f"Chrome wrote nothing for {out.name}:\n{blob[-800:]}")
    with Image.open(out) as im:
        if im.size != (width, height):
            im.convert("RGBA").resize((width, height), Image.LANCZOS).save(out)


# --------------------------------------------------------------------------
# The OG card
# --------------------------------------------------------------------------


def build_og_card(logo: dict, out: Path) -> None:
    """1200x630: a real site photograph above a cream band carrying the lockup.

    Photo, not a generated image — this project reuses its own library only.
    """
    W, H = 1200, 630
    band = 168
    photo_h = H - band

    with Image.open(OG_PHOTO) as src:
        photo = src.convert("RGB")
        scale = max(W / photo.width, photo_h / photo.height)
        if scale > 1:
            raise SystemExit(
                f"{OG_PHOTO.name} is {photo.width}x{photo.height} — too small to fill "
                f"{W}x{photo_h} without upscaling. Pick a larger frame."
            )
        new = (round(photo.width * scale), round(photo.height * scale))
        photo = photo.resize(new, Image.LANCZOS)
        left = (photo.width - W) // 2
        top = (photo.height - photo_h) // 3  # bias up: the horizon sits high in this frame
        photo = photo.crop((left, top, left + W, top + photo_h))

    card = Image.new("RGB", (W, H), CREAM)
    card.paste(photo, (0, 0))

    # A hairline of the brand gold between photo and band, same weight as the
    # site's own rules.
    gold = Image.new("RGB", (W, 3), logo["gold"])
    card.paste(gold, (0, photo_h))

    lock_h = band - 56
    lock_w = round(lock_h * (logo["viewbox"][2] / logo["viewbox"][3]))
    # Scratch stays OUT of public/: an interrupted run used to leave the file
    # behind, and vite copies public/ verbatim into dist/, so the deploy would
    # publish it.
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir) / "og-lockup.png"
        render_png(lockup_svg(logo, tile=CREAM), tmp, lock_w, lock_h, background=CREAM)
        with Image.open(tmp) as lock:
            card.paste(lock.convert("RGB"), ((W - lock_w) // 2, photo_h + 3 + (band - 3 - lock_h) // 2))

    card.save(out, "JPEG", quality=88, optimize=True, progressive=True)


# --------------------------------------------------------------------------


def build_manifests() -> None:
    """Write one web manifest per language, named from storeFacts.json.

    The brand string is never retyped here: `site.nameMs` is the same value the
    Malay pages use.
    """
    facts = json.loads(STORE_FACTS.read_text(encoding="utf-8"))
    site = facts["site"]
    icons = [
        {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
        {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
        {"src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        {"src": site["icon"], "sizes": "any", "type": "image/svg+xml"},
    ]
    for filename, lang, direction, name_key in MANIFESTS:
        doc = {
            "name": site[name_key],
            "short_name": site[name_key],
            "start_url": f"/{lang}",
            "scope": "/",
            "display": "standalone",
            "orientation": "portrait",
            "lang": lang,
            "dir": direction,
            "background_color": CREAM,
            "theme_color": CREAM,
            "icons": icons,
        }
        (PUBLIC / filename).write_text(
            json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )


def check() -> int:
    missing = [p for p in OUTPUTS if not p.exists() or p.stat().st_size == 0]
    for p in OUTPUTS:
        state = "MISSING" if p in missing else f"{p.stat().st_size:>8,} B"
        print(f"  {state}  {p.relative_to(ROOT)}")
    if missing:
        print(f"\n{len(missing)} brand asset(s) missing — run: python scripts/brand-assets.py")
        return 1
    print(f"\nAll {len(OUTPUTS)} brand assets present.")
    return 0


def main() -> int:
    if "--check" in sys.argv:
        return check()
    if not CHROME.exists():
        sys.exit(f"Chrome not found at {CHROME} — needed to rasterise the SVG")

    logo = read_logo()
    print(f"source  {LOGO.relative_to(ROOT)}  gold={logo['gold']}  ink={logo['ink']}")
    print("emblem  bbox x[{:.2f},{:.2f}] y[{:.2f},{:.2f}]".format(*[logo["emblem_box"][i] for i in (0, 2, 1, 3)]))

    PUBLIC.mkdir(exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)

    tile = emblem_svg(logo, tile=CREAM)
    (PUBLIC / f"favicon-{VERSION}.svg").write_text(tile, encoding="utf-8")
    (PUBLIC / "favicon.svg").write_text(tile, encoding="utf-8")  # legacy URL
    (PUBLIC / "mask-icon.svg").write_text(mask_icon_svg(logo), encoding="utf-8")

    # Browser tab / manifest icons. Cream tile, never transparent — see module docstring.
    render_png(tile, PUBLIC / "favicon-32.png", 32, 32, background=CREAM)
    render_png(tile, ICONS / "icon-192.png", 192, 192, background=CREAM)
    render_png(tile, ICONS / "icon-512.png", 512, 512, background=CREAM)

    # iOS composites any transparency onto black, so this one is opaque by
    # construction and square-cornered: iOS applies its own mask.
    render_png(
        emblem_svg(logo, tile=None, pad_ratio=0.16),
        PUBLIC / "apple-touch-icon.png",
        180,
        180,
        background=CREAM,
    )

    # Maskable: Android may crop to a circle of 80% of the canvas, so the art
    # sits inside 60% and the cream fills edge to edge.
    render_png(
        emblem_svg(logo, tile=None, pad_ratio=0.24),
        ICONS / "icon-maskable-512.png",
        512,
        512,
        background=CREAM,
    )

    # Raster lockup for schema ImageObject and chat previews that refuse SVG.
    vb = logo["viewbox"]
    lock_w = 512
    lock_h = round(lock_w * (vb[3] + 2 * vb[3] * 0.14) / (vb[2] + 2 * vb[3] * 0.14))
    render_png(lockup_svg(logo, tile=CREAM), PUBLIC / "logo-512.png", lock_w, lock_h, background=CREAM)

    # favicon.ico — 48/32/16 for the bookmark bars and legacy clients that ask
    # for /favicon.ico by convention. Each size is rendered from the VECTOR:
    # letting PIL bicubic-reduce one 48px bitmap mushes the palm fronds at 16px.
    with tempfile.TemporaryDirectory() as tmpdir:
        frames = []
        for size in (16, 32, 48):
            f = Path(tmpdir) / f"ico-{size}.png"
            render_png(tile, f, size, size, background=CREAM)
            frames.append(Image.open(f).convert("RGBA"))
        frames[-1].save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=frames[:-1])
        for fr in frames:
            fr.close()

    build_manifests()

    build_og_card(logo, PUBLIC / f"og-card-{VERSION}.jpg")
    # Legacy path, same bytes: anything still pointing at it gets the brand.
    shutil.copyfile(PUBLIC / f"og-card-{VERSION}.jpg", PUBLIC / "og-image.jpg")

    print()
    return check()


if __name__ == "__main__":
    raise SystemExit(main())
