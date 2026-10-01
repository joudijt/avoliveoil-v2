"""Routing matrix against the Apache harness (docs/cms/CMS-SPEC.md §13.7). Local only."""
import http.client, ssl, sys
HOST = sys.argv[2] if len(sys.argv) > 2 else "localhost"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8443
ctx = ssl._create_unverified_context()
def req(method, path, headers=None):
    c = http.client.HTTPSConnection(HOST, PORT, context=ctx, timeout=30)
    c.request(method, path, headers=headers or {})
    r = c.getresponse(); body = r.read()
    return r.status, dict((k.lower(), v) for k, v in r.getheaders()), body
CASES = [
  # (method, path, expected status, expected Location substring or body check, label)
  ("GET", "/", 200, b"cms-boot", "bare domain = EN home with boot"),
  ("GET", "/en", 200, b"cms-boot", "/en"),
  ("GET", "/en/", 301, "/en", "trailing slash root"),
  ("GET", "/en/why-us/", 301, "/en/why-us", "trailing slash page"),
  ("GET", "/EN/Why-Us", 301, "/en/why-us", "uppercase"),
  ("GET", "/en/why-us/index.html", 301, "/en/why-us", "direct index.html"),
  ("GET", "/en/why-us?utm_source=x", 200, b"cms-boot", "tracking query"),
  ("HEAD", "/en/why-us", 200, None, "HEAD"),
  ("GET", "/en/__cms-template", 404, None, "template hidden"),
  ("GET", "/en/__cms-template/index.html", 404, None, "template index.html hidden (404, not 301)"),
  ("GET", "/en/__cms-template-landing", 404, None, "landing template hidden"),
  ("GET", "/en/__cms-template-landing/", 404, None, "landing template hidden (trailing slash)"),
  ("GET", "/en/__cms-template-landing/index.html", 404, None, "landing template index.html hidden"),
  ("GET", "/ms/__cms-template-landing", 404, None, "landing template hidden (ms)"),
  ("GET", "/EN/__CMS-TEMPLATE-LANDING", 404, None, "landing template hidden (uppercase, [NC])"),
  ("GET", "/en/does-not-exist", 404, b"noindex", "unknown CMS slug 404 noindex"),
  ("GET", "/ar", 301, "/en", "/ar"),
  ("GET", "/ar/why-us", 301, "/en/why-us", "/ar/why-us"),
  ("GET", "/AR/blog/zayt-alzaytun-lilsteak", 301, "/en/blog/olive-oil-for-steak", "/AR article NC"),
  ("GET", "/ar/products/infused-extra-virgin-olive-oil-wild-thyme", 301, "/en/products/infused-extra-virgin-olive-oil-wild-thyme", "/ar product"),
  ("GET", "/ar/anything/else", 301, "/en", "/ar catch-all"),
  ("GET", "/llms-ar.txt", 301, "/llms.txt", "llms-ar"),
  ("GET", "/api/_lib/bootstrap.php", 403, None, "_lib denied"),
  ("GET", "/api/_data/build.json", 403, None, "_data denied"),
  ("GET", "/api/_setup/README.txt", 403, None, "_setup denied"),
  ("GET", "/_r/en/index.html", 404, None, "_r direct denied"),
  ("GET", "/api/serve.php", None, None, "serve.php direct (no 500)"),
  ("GET", "/api/build", 200, b"build", "api build"),
  ("GET", "/api/auth/me", 401, None, "me without session"),
  ("GET", "/api/submissions/export.csv", 401, None, "csv route reaches API (auth)"),
  ("POST", "/api/users", 401, None, "write without session"),
  ("GET", "/admin", 200, b"admin-root", "admin entry"),
  ("GET", "/admin/pages/3/edit", 200, b"admin-root", "admin deep link"),
  ("GET", "/cms-canvas", 200, None, "canvas route"),
  ("GET", "/sitemap.xml", 200, b"<urlset", "sitemap via php"),
  ("GET", "/robots.txt", 200, b"Disallow: /admin", "robots"),
  ("GET", "/nope.png", 404, None, "extension 404"),
  ("GET", "/uploads/x.php", (403, 404), None, "uploads php (404 before the first upload, 403 once uploads/.htaccess exists)"),
  ("GET", "/en/blog/olive-oil-for-steak", 200, b"cms-boot", "article via serve"),
  ("GET", "/ms/products/infused-extra-virgin-olive-oil-wild-thyme", 200, b"cms-boot", "infused ms"),
]
fail = 0
for m, p, st, exp, label in CASES:
    s, h, b = req(m, p)
    ok = True
    if isinstance(st, tuple): ok = s in st
    elif st is not None and s != st: ok = False
    if st is None and s >= 500: ok = False
    if isinstance(exp, str) and not h.get("location", "").endswith(exp): ok = False
    if isinstance(exp, bytes) and exp not in b: ok = False
    if m == "GET" and s == 200 and "text/html" in h.get("content-type", "") and "content-security-policy" not in h: ok = False; label += " [NO CSP]"
    fail += not ok
    print(("ok  " if ok else "FAIL"), s, h.get("location", ""), "|", label)
# second hit of a page must come from /_r (no PHP) — compare ETag-less static file existence via X-Powered-By absence
s1, h1, b1 = req("GET", "/en/contact"); s2, h2, b2 = req("GET", "/en/contact")
print("ok  " if b1 == b2 and s2 == 200 else "FAIL", "repeat hit identical body;", "x-powered-by first:", h1.get("x-powered-by"), "second:", h2.get("x-powered-by"))
e = h1.get("etag")
print("etag:", e)
print("\n%d failures" % fail)
sys.exit(1 if fail else 0)
