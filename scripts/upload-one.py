"""
Uploads exactly the named file(s) from dist/ to the same path on the
avoliveoil.com docroot over explicit FTPS. Nothing else is touched: no
directory walk, no delete, no --clean.

    set AVO_FTP_PASS=...                       (env only - never on the command line)
    python scripts/upload-one.py dist/sitemap.xml
    python scripts/upload-one.py --dry-run dist/sitemap.xml

Each argument must be an existing regular file inside dist/; its remote path is
its path relative to dist/ (dist/sitemap.xml -> /sitemap.xml). Unknown flags are
rejected before connecting. After each STOR the remote SIZE must equal the local
byte count AND the file is downloaded back and compared byte for byte (a size
match alone cannot see a same-length edit).
"""
import io
import os
import ssl
import sys
from ftplib import FTP_TLS

HOST = "ftp.avoliveoil.com"
USER = "claudeoliveoil@avoliveoil.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
KNOWN_FLAGS = {"--dry-run"}

args = sys.argv[1:]
flags = [a for a in args if a.startswith("-")]
files = [a for a in args if not a.startswith("-")]
unknown = [f for f in flags if f not in KNOWN_FLAGS]
if unknown:
    sys.exit("unknown flag(s): %s\n%s" % (" ".join(unknown), __doc__))
if not files:
    sys.exit("no files given\n%s" % __doc__)
DRY_RUN = "--dry-run" in flags

plan = []
for f in files:
    local = os.path.abspath(f)
    rel = os.path.relpath(local, DIST)
    if rel.startswith("..") or os.path.isabs(rel):
        sys.exit("refusing %s: not inside dist/" % f)
    if not os.path.isfile(local):
        sys.exit("refusing %s: not an existing regular file" % f)
    plan.append((local, "/" + rel.replace(os.sep, "/")))

for local, remote in plan:
    print("%s  ->  %s  (%d bytes)" % (local, remote, os.path.getsize(local)))
if DRY_RUN:
    print("[DRY RUN] nothing uploaded")
    sys.exit(0)

password = os.environ.get("AVO_FTP_PASS")
if not password:
    sys.exit("AVO_FTP_PASS is not set")

ctx = ssl.create_default_context()
# The shared host presents the provider's certificate, not the domain's.
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
ftp = FTP_TLS(context=ctx)
ftp.connect(HOST, 21, timeout=60)
ftp.login(USER, password)
ftp.prot_p()
ftp.set_pasv(True)
print("connected to %s as %s" % (HOST, USER))

failed = False
for local, remote in plan:
    with open(local, "rb") as fh:
        data = fh.read()
    ftp.storbinary("STOR " + remote, io.BytesIO(data))
    ftp.voidcmd("TYPE I")
    size = ftp.size(remote)
    back = io.BytesIO()
    ftp.retrbinary("RETR " + remote, back.write)
    same = back.getvalue() == data
    ok = size == len(data) and same
    failed |= not ok
    print("%s %s  local=%d remote_size=%s bytes_identical=%s" % ("OK  " if ok else "FAIL", remote, len(data), size, same))

ftp.quit()
sys.exit(1 if failed else 0)
