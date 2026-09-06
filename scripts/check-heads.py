import glob, io, os, re, sys

os.chdir(r"E:\avoliveoil-v2")
COMMENT = re.compile(r"<!--.*?-->", re.S)
files = glob.glob("dist/**/index.html", recursive=True)
shell = None
problems = []
manifest_by_lang = {}
appname_by_lang = {}
for f in files:
    h = io.open(f, encoding="utf-8").read()
    head = COMMENT.sub("", h.split("</head>")[0])
    norm = f.replace(os.sep, "/")
    counts = {
        "title": len(re.findall(r"<title[\s>]", head)),
        "description": len(re.findall(r'<meta[^>]+name="description"', head)),
        "manifest": len(re.findall(r'rel="manifest"', head)),
        "application-name": len(re.findall(r'name="application-name"', head)),
        "apple-title": len(re.findall(r'name="apple-mobile-web-app-title"', head)),
    }
    if norm == "dist/index.html":
        shell = counts
        continue
    for k, v in counts.items():
        if v != 1:
            problems.append(f"{norm}: {v}x {k}")
    for probe in ["/favicon-2026-09.svg", "/apple-touch-icon.png", "/mask-icon.svg",
                  "/favicon.ico", "/favicon-32.png", 'name="theme-color"',
                  'property="og:image:width"']:
        if probe not in head:
            problems.append(f"{norm}: missing {probe}")
    # JSON-LD is rendered by Helmet into the body on this app, so these two are
    # document-scoped, not head-scoped.
    for probe in ["avoliveoil.com/#logo", "/logo-512.png"]:
        if probe not in h:
            problems.append(f"{norm}: missing {probe}")
    if "863bff" in h:
        problems.append(f"{norm}: STILL references the purple template icon")
    lang = norm.split("/")[1] if "/" in norm else "?"
    m = re.search(r'rel="manifest" href="([^"]+)"', head)
    if m:
        manifest_by_lang.setdefault(lang, set()).add(m.group(1))
    a = re.search(r'name="application-name" content="([^"]+)"', head)
    if a:
        appname_by_lang.setdefault(lang, set()).add(a.group(1))

print("routes checked:", len(files))
print("shell dist/index.html:", shell)
print("manifest per language:", {k: sorted(v) for k, v in manifest_by_lang.items()})
print("application-name lengths per language:",
      {k: sorted(len(x) for x in v) for k, v in appname_by_lang.items()})
print("problems:", len(problems))
for p in problems[:12]:
    print("   -", p)
sys.exit(1 if problems else 0)
