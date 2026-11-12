"""
Deploys dist/ to the avoliveoil.com docroot over explicit FTPS.

    set AVO_FTP_PASS=...          (never pass the password on the command line:
    python scripts/ftp-deploy.py --dry-run    it contains %, ), ? and * which the
    python scripts/ftp-deploy.py --clean      shell will mangle)

Order (docs/cms/CMS-SPEC.md section 13.1) - the site keeps running on the OLD routing
until the new PHP has proven itself:
  1. upload every file of dist/ EXCEPT /.htaccess
  2. self-test: GET https://avoliveoil.com/api/serve.php?selftest=1 with header
     X-Selftest: <contents of the local .cms-selftest file, written by the build>.
     The server compares its sha256 with dist/api/_data/build.json and answers
     {"ok":true,...}. Anything else aborts here and /.htaccess is NOT uploaded.
  3. the current remote /.htaccess is saved locally as .htaccess.prev-<timestamp>
     (rollback = upload that file back with scripts/upload-one.py)
  4. upload /.htaccess
  5. --clean: delete remote files that are not in dist/ (PROTECTED excepted), then
     remove empty remote directories bottom-up. This also clears /_r (the rendered
     page store, regenerated on demand) and leftover /api/_setup files.

  --no-selftest   EMERGENCY ONLY (e.g. the self-test itself is broken while the site is
                  down): skips step 2. Say why in the deploy notes.
  --skip-static   skip /assets/* files whose remote SIZE already matches (hashed names)
  --dry-run       list what would happen, change nothing

Notes for whoever runs this next:
  * The host in the hosting hand-off, ftp.madinah.com.my, does not resolve. The
    real host is ftp.<domain>.
  * The account is chrooted to the docroot, so "/" is the web root - there is no
    public_html directory to descend into.
  * Large files occasionally time out mid-STOR. Every upload is retried on a
    fresh connection, and afterwards every file's remote SIZE is compared with
    the local byte count, because a clean STOR return proves nothing.
  * --clean deletes remote files that no longer exist in dist/. PROTECTED holds
    the server-owned paths it must never touch (/uploads = CMS photos).
"""
import io
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from ftplib import FTP_TLS, error_perm

HOST = "ftp.avoliveoil.com"
USER = "claudeoliveoil@avoliveoil.com"
SITE = "https://avoliveoil.com"
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL = os.path.join(REPO, "dist")
SELFTEST_FILE = os.path.join(REPO, ".cms-selftest")

# Server-owned; deleting any of these breaks the account, the TLS renewal or the
# owner's uploaded photos.
# /noor-fes = a separate site (repo E:\noorfes-lp) living in this docroot since 2026-11-10.
PROTECTED = {"/cgi-bin", "/.well-known", "/.ftpquota", "/uploads", "/noor-fes"}

DRY_RUN = "--dry-run" in sys.argv
CLEAN = "--clean" in sys.argv
SKIP_STATIC = "--skip-static" in sys.argv
# Re-run only the --clean pass (e.g. after it was interrupted). Implies --clean.
CLEAN_ONLY = "--clean-only" in sys.argv
if CLEAN_ONLY:
    CLEAN = True
NO_SELFTEST = "--no-selftest" in sys.argv

# dist/ is 28 MB and 26 MB of it is dist/assets - hashed images, JS and CSS.
# Vite puts the content hash in the filename, so a changed file arrives under a
# new name and a matching name with a matching size is the same bytes. With
# --skip-static those are skipped when the remote SIZE already matches, which is
# where nearly all of the deploy wall-clock goes (one TLS data connection per
# file, and the images are megabytes each).
#
# Deliberately NOT applied to html/txt/md/xml: an edit can leave the byte count
# identical, and silently not shipping an edited page is the worst thing this
# script could do.
STATIC_DIRS = ("/assets/",)

password = os.environ.get("AVO_FTP_PASS")
if not password:
    sys.exit("AVO_FTP_PASS is not set")


def connect():
    ctx = ssl.create_default_context()
    # The shared host serves a certificate for the hosting provider, not for the
    # customer domain, so hostname verification can never pass here.
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    f = FTP_TLS(context=ctx)
    f.connect(HOST, 21, timeout=60)
    f.login(USER, password)
    f.prot_p()
    f.set_pasv(True)
    return f


def is_protected(path):
    return any(path == p or path.startswith(p + "/") for p in PROTECTED)


ftp = connect()
print("connected to %s as %s%s" % (HOST, USER, "  [DRY RUN]" if DRY_RUN else ""))

# ---------------------------------------------------------------- local files
local_files = {}
for root, _dirs, files in os.walk(LOCAL):
    rel = os.path.relpath(root, LOCAL).replace("\\", "/")
    for name in files:
        remote = "/" + name if rel == "." else "/%s/%s" % (rel, name)
        local_files[remote] = os.path.join(root, name)
print("%d local files in dist/" % len(local_files))

setup_files = [r for r in local_files if r.startswith("/api/_setup/") and r.endswith((".token", ".reset"))]
for r in setup_files:
    print("  NOTE shipping %s - delete it locally once it has been used" % r)

htaccess_local = local_files.get("/.htaccess")
if not htaccess_local:
    sys.exit("dist/.htaccess is missing - refusing to deploy a site without its routing")

# ---------------------------------------------------------------- upload
made = set()


def ensure_dir(d):
    if d in ("", "/", ".") or d in made:
        return
    ensure_dir(os.path.dirname(d))
    try:
        ftp.mkd(d)
        print("  MKD %s" % d)
    except error_perm as e:
        if not str(e).startswith("550"):
            raise
    made.add(d)


uploaded, failed, skipped = [], [], []


def is_static(path):
    return any(path.startswith(d) for d in STATIC_DIRS)


def reconnect():
    global ftp
    try:
        ftp.quit()
    except Exception:
        pass
    for reconnect_attempt in (1, 2, 3):
        try:
            ftp = connect()
            return
        except Exception as reconnect_err:
            print("  RECONNECT FAILED (attempt %d): %s" % (reconnect_attempt, reconnect_err))
            if reconnect_attempt == 3:
                raise
            time.sleep(5)


def upload(remote, local):
    size = os.path.getsize(local)
    if SKIP_STATIC and is_static(remote):
        try:
            if ftp.size(remote) == size:
                skipped.append(remote)
                return
        except Exception:
            pass          # not on the server yet, or SIZE refused - upload it
    if DRY_RUN:
        print("  PUT %-58s %8d" % (remote, size))
        uploaded.append((remote, size))
        return
    ensure_dir(os.path.dirname(remote))
    for attempt in (1, 2, 3):
        try:
            with open(local, "rb") as fh:
                ftp.storbinary("STOR " + remote, fh, blocksize=32768)
            uploaded.append((remote, size))
            print("  PUT %-58s %8d" % (remote, size))
            return
        except Exception as e:
            print("  ERR %s (attempt %d): %s" % (remote, attempt, e))
            if attempt == 3:
                failed.append(remote)
            else:
                reconnect()


# 1. everything except the routing
for remote, local in sorted(local_files.items()):
    if CLEAN_ONLY:
        break
    if remote == "/.htaccess":
        continue
    upload(remote, local)

if failed:
    print("\n%d upload(s) failed - NOT switching the routing (/.htaccess unchanged):" % len(failed))
    for f in failed:
        print("  FAILED %s" % f)
    sys.exit(1)


# ---------------------------------------------------------------- 2. self-test
def http_get(url, headers):
    req = urllib.request.Request(url, headers=dict(headers, **{"User-Agent": "avo-deploy-selftest"}))
    try:
        return urllib.request.urlopen(req, timeout=30)
    except urllib.error.URLError as e:
        # A local antivirus that re-signs HTTPS breaks certificate checks for Python on
        # this machine; the self-test reads one JSON status, so retry without verify.
        if isinstance(getattr(e, "reason", None), ssl.SSLError):
            print("  (TLS verification failed locally, retrying the self-test without it)")
            return urllib.request.urlopen(req, timeout=30, context=ssl._create_unverified_context())
        raise


def selftest():
    try:
        with open(SELFTEST_FILE, "r", encoding="utf-8") as fh:
            token = fh.read().strip()
    except OSError:
        print("SELFTEST ABORT: %s is missing - run the build (npm run build) first" % SELFTEST_FILE)
        return False
    if not token:
        print("SELFTEST ABORT: %s is empty" % SELFTEST_FILE)
        return False
    url = SITE + "/api/serve.php?selftest=1&t=%d" % int(time.time())
    try:
        res = http_get(url, {"X-Selftest": token, "Cache-Control": "no-cache"})
        body = res.read().decode("utf-8", "replace")
        status = res.status
    except urllib.error.HTTPError as e:
        status, body = e.code, e.read().decode("utf-8", "replace")
    except Exception as e:
        print("SELFTEST ABORT: request failed: %s" % e)
        return False
    try:
        data = json.loads(body)
    except ValueError:
        data = None
    if status != 200 or not isinstance(data, dict) or data.get("ok") is not True:
        print("SELFTEST ABORT: HTTP %s %s" % (status, body[:300].replace("\n", " ")))
        return False
    expected_build = None
    try:
        with open(os.path.join(LOCAL, "api", "_data", "build.json"), encoding="utf-8") as fh:
            expected_build = json.load(fh).get("build")
    except (OSError, ValueError):
        pass
    if expected_build and data.get("build") != expected_build:
        print("SELFTEST ABORT: server reports build %s, dist/ is %s" % (data.get("build"), expected_build))
        return False
    if not data.get("dataWritable"):
        print("SELFTEST ABORT: the data directory above the docroot is not writable: %s" % body)
        return False
    print("selftest ok: php %s, sqlite %s, build %s" % (data.get("php"), data.get("sqlite"), data.get("build")))
    return True


if DRY_RUN or CLEAN_ONLY:
    print("\n(dry run) would run the self-test, back up the remote /.htaccess, then upload it")
elif NO_SELFTEST:
    print("\n!!! --no-selftest: skipping the self-test (emergency mode) !!!")
else:
    print("\n=== self-test ===")
    if not selftest():
        print("/.htaccess NOT uploaded - the live site still runs on the previous routing.")
        try:
            ftp.quit()
        except Exception:
            ftp.close()
        sys.exit(1)

# ---------------------------------------------------------------- 3 + 4. routing
if CLEAN_ONLY:
    pass
elif not DRY_RUN:
    stamp = time.strftime("%Y%m%d-%H%M%S")
    backup_path = os.path.join(REPO, ".htaccess.prev-%s" % stamp)
    buf = io.BytesIO()
    try:
        ftp.retrbinary("RETR /.htaccess", buf.write)
        with open(backup_path, "wb") as fh:
            fh.write(buf.getvalue())
        print("previous remote /.htaccess saved to %s (%d bytes)" % (backup_path, len(buf.getvalue())))
    except error_perm as e:
        print("no previous remote /.htaccess to save (%s)" % e)
    upload("/.htaccess", htaccess_local)
    if failed:
        print("UPLOAD OF /.htaccess FAILED - restore %s by hand if the site misbehaves" % backup_path)
        sys.exit(1)
else:
    upload("/.htaccess", htaccess_local)


# ---------------------------------------------------------------- 5. orphans
def with_retry(op, *args):
    """Run one FTP command; on a dropped connection reconnect once and retry.
    The clean pass runs after a long upload + the HTTP self-test, and the host
    drops idle control connections (WinError 10054) — 2026-10-01 every LIST/DELE of
    the clean pass failed that way until this existed."""
    try:
        return op(*args)
    except error_perm:
        raise
    except Exception:
        reconnect()
        return getattr(ftp, op.__name__)(*args)


def list_dir(path):
    entries = []
    try:
        with_retry(ftp.retrlines, "LIST " + path, entries.append)
    except Exception as e:
        print("  LIST failed for %s: %s" % (path, e))
        return None
    out = []
    for line in entries:
        parts = line.split(None, 8)
        if len(parts) < 9:
            continue
        name, is_dir = parts[8], line.startswith("d")
        if name in (".", ".."):
            continue
        out.append((path.rstrip("/") + "/" + name, is_dir))
    return out


def walk_remote(path="/", dirs=None):
    """Yields every remote file path under `path`, skipping protected subtrees.
    Directories seen are appended to `dirs` (parents before children)."""
    entries = list_dir(path)
    if entries is None:
        return
    for child, is_dir in entries:
        if is_protected(child):
            continue
        if is_dir:
            if dirs is not None:
                dirs.append(child)
            for sub in walk_remote(child, dirs):
                yield sub
        else:
            yield child


if CLEAN:
    print("\n=== orphans (on server, not in dist/) ===")
    if not DRY_RUN:
        reconnect()  # fresh control connection: the upload + self-test can outlast the idle timeout
    remote_dirs = []
    orphans = [r for r in walk_remote("/", remote_dirs) if r not in local_files]
    # Rendered pages first: a stale /_r page must never outlive the old asset bundle it
    # references (old /assets/* files are orphans in this same pass).
    orphans.sort(key=lambda r: (0 if r.startswith("/_r/") else 1, r))
    for o in orphans:
        if DRY_RUN:
            print("  would DELE %s" % o)
        else:
            try:
                with_retry(ftp.delete, o)
                print("  DELE %s" % o)
            except Exception as e:
                print("  DELE failed %s: %s" % (o, e))
    print("%d orphan(s)" % len(orphans))

    # Empty directories, deepest first. A directory that still holds anything is
    # refused by the server (550) and simply stays.
    local_dirs = {os.path.dirname(r) for r in local_files}
    pruned = 0
    for d in sorted(remote_dirs, key=lambda p: p.count("/"), reverse=True):
        if is_protected(d) or d in ("", "/") or d in local_dirs:
            continue
        if DRY_RUN:
            print("  would RMD %s (if empty)" % d)
            continue
        try:
            if list_dir(d) == []:
                with_retry(ftp.rmd, d)
                pruned += 1
                print("  RMD %s" % d)
        except Exception as e:
            print("  RMD failed %s: %s" % (d, e))
    print("%d empty director%s removed" % (pruned, "y" if pruned == 1 else "ies"))

# ---------------------------------------------------------------- verify
if not DRY_RUN:
    print("\n=== verify: remote SIZE vs local ===")
    mismatch = []
    for remote, size in uploaded:
        actual = None
        for verify_attempt in (1, 2, 3):
            try:
                actual = ftp.size(remote)
                break
            except Exception as e:
                actual = "ERR:%s" % e
                if verify_attempt < 3:
                    try:
                        ftp.quit()
                    except Exception:
                        pass
                    try:
                        ftp = connect()
                    except Exception:
                        time.sleep(5)
        if actual != size:
            mismatch.append((remote, size, actual))
    print("checked %d, mismatched %d" % (len(uploaded), len(mismatch)))
    for m in mismatch:
        print("  MISMATCH %s local=%s remote=%s" % m)
else:
    failed, mismatch = [], []

try:
    ftp.quit()
except Exception:
    ftp.close()

print("\nuploaded %d, skipped %d unchanged static, failed %d" % (len(uploaded), len(skipped), len(failed)))
sys.exit(1 if (failed or mismatch) else 0)
