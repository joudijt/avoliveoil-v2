#!/usr/bin/env python3
"""Prove the brand assets and the head that references them are actually live.

Status codes are worthless on this host: the SPA fallback answered 200 with the
shell for missing files until it was fixed, and a rewrite can still hand back
HTML for a path that does not exist. So every asset is checked by **sha256
against the local file**, and every HTML head is checked for the tags that must
be in it.

curl is shelled out to on purpose: Norton re-signs HTTPS on this machine, which
breaks python's TLS, and `--ssl-no-revoke` is required for the same reason.

    python scripts/verify-brand.py
    python scripts/verify-brand.py --base https://avoliveoil.com
"""

from __future__ import annotations

import hashlib
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
BASE = "https://avoliveoil.com"

# path on the site -> file in dist that must match it byte for byte
ASSETS = [
    "/favicon-2026-09.svg",
    "/og-card-2026-09.jpg",
    "/site-ar.webmanifest",
    "/site-ms.webmanifest",
    "/favicon.svg",
    "/favicon.ico",
    "/favicon-32.png",
    "/apple-touch-icon.png",
    "/mask-icon.svg",
    "/site.webmanifest",
    "/logo.svg",
    "/logo-512.png",
    "/og-image.jpg",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
    "/icons/icon-maskable-512.png",
]

# Every tag the head must carry, checked on one route per language plus an
# article and a product page — the prerenderer writes each of these separately.
ROUTES = ["/en", "/ms", "/ar", "/en/products", "/en/blog"]

HEAD_MUST_HAVE = [
    'rel="icon" type="image/svg+xml" href="/favicon-2026-09.svg"',
    'href="/favicon-32.png"',
    'href="/favicon.ico"',
    'rel="apple-touch-icon"',
    'href="/mask-icon.svg"',
    'rel="manifest"',
    'name="application-name"',
    'name="theme-color"',
    'name="apple-mobile-web-app-title"',
    'property="og:image"',
    'property="og:image:width"',
    'property="og:image:height"',
    # JSON.stringify emits no space after the colon - probe the value, not a
    # pretty-printed spelling that never ships.
    'avoliveoil.com/#logo',
    '/logo-512.png',
]


def fetch(url: str) -> tuple[int, bytes, str]:
    res = subprocess.run(
        ["curl", "-sS", "--ssl-no-revoke", "-L", "-w", "\n%{http_code}\t%{content_type}", url],
        capture_output=True,
    )
    if res.returncode != 0:
        return 0, b"", res.stderr.decode("utf-8", "replace")[:200]
    body, _, tail = res.stdout.rpartition(b"\n")
    code, _, ctype = tail.decode("utf-8", "replace").partition("\t")
    return int(code or 0), body, ctype.strip()


def main() -> int:
    base = BASE
    if "--base" in sys.argv:
        base = sys.argv[sys.argv.index("--base") + 1].rstrip("/")

    failures: list[str] = []

    print(f"assets — sha256 against dist/  ({base})")
    for path in ASSETS:
        local = DIST / path.lstrip("/")
        if not local.exists():
            failures.append(f"{path}: not in dist/ — build first")
            print(f"  MISSING LOCAL  {path}")
            continue
        code, body, ctype = fetch(base + path)
        want = hashlib.sha256(local.read_bytes()).hexdigest()
        got = hashlib.sha256(body).hexdigest()
        ok = code == 200 and want == got
        if not ok:
            failures.append(f"{path}: http {code}, {len(body)} B, sha {'match' if want == got else 'DIFFERS'}")
        print(f"  {'ok  ' if ok else 'FAIL'}  {path:<34} {code}  {len(body):>8,} B  {ctype}")

    print("\nheads — the tags that must be in every prerendered route")
    for route in ROUTES:
        code, body, _ = fetch(f"{base}{route}")
        html = body.decode("utf-8", "replace")
        missing = [t for t in HEAD_MUST_HAVE if t not in html]
        # A stale purple favicon would still be a 200 with a plausible head, so
        # the old template icon is checked for by name as well.
        if "863bff" in html:
            missing.append("the old purple template favicon is STILL referenced")
        if missing:
            failures.append(f"{route}: {len(missing)} missing — {missing[0]}")
        print(f"  {'ok  ' if not missing else 'FAIL'}  {route:<20} {code}  {len(missing)} missing tag(s)")
        for m in missing:
            print(f"          - {m}")

    print()
    if failures:
        print(f"{len(failures)} FAILURE(S):")
        for f in failures:
            print(f"  - {f}")
        return 1
    print(f"all {len(ASSETS)} assets byte-identical and all {len(ROUTES)} heads complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
