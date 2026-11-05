/**
 * Replace one uploaded photo on a CMS page with a new upload (owner 2026-11-05: the
 * landing's field photo showed the old bottle). Uploads the new file, copies the alt
 * text, swaps every reference to the old media id in the DRAFT (sections + seo.ogImage),
 * saves the draft with baseVersion. Publish afterwards with publish-page-via-panel.mjs.
 *   AVO_BASE=https://avoliveoil.com AVO_EMAIL=… PWFILE=… PAGE_ID=2 OLD_ID=3 \
 *   NEW_FILE=src/assets/opt/AVOliveOilInTheField-750.webp node scripts/dev/swap-landing-photo.mjs [--apply]
 */
import { readFileSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const BASE = process.env.AVO_BASE; const EMAIL = process.env.AVO_EMAIL || 'admin@avoliveoil.com';
const PASSWORD = readFileSync(process.env.PWFILE, 'utf8').trim();
const PAGE_ID = Number(process.env.PAGE_ID); const OLD_ID = Number(process.env.OLD_ID); const NEW_FILE = process.env.NEW_FILE;
const APPLY = process.argv.includes('--apply');
let cookie = '', csrf = '', build = '';
async function call(method, path, body) {
  const headers = { Origin: BASE, Accept: 'application/json' };
  if (cookie) headers.Cookie = cookie; if (csrf) headers['X-CSRF-Token'] = csrf; if (build) headers['X-CMS-Build'] = build;
  let send = method; if (method !== 'GET' && method !== 'POST') { headers['X-HTTP-Method-Override'] = method; send = 'POST'; }
  let payload; if (body instanceof FormData) payload = body; else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
  const res = await fetch(BASE + path, { method: send, headers, body: payload, redirect: 'manual' });
  const set = res.headers.get('set-cookie'); if (set) cookie = set.split(';')[0];
  const text = await res.text(); let data; try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${typeof data === 'string' ? data.slice(0, 200) : JSON.stringify(data)}`);
  return data;
}
csrf = (await call('POST', '/api/auth/login', { email: EMAIL, password: PASSWORD })).csrf;
build = (await call('GET', '/api/build')).build;
const p = await call('GET', `/api/pages/${PAGE_ID}`);
if (p.page.hasUnpublished) throw new Error('page has unpublished edits — not touching it');
const old = [p.media?.[OLD_ID]].filter(Boolean);
if (old.length !== 1) throw new Error(`media ${OLD_ID} not on this page: ${Object.keys(p.media || {})}`);
const oldId = OLD_ID;
const doc = p.draft; const s = JSON.stringify(doc);
const re = new RegExp(`("(?:media|ogImage|image|mediaId)"\s*:\s*)${oldId}(?=[,}])`, 'g');
const hits = s.match(re) || [];
console.log(`old media id ${oldId}; references in draft: ${hits.length}`);
if (!hits.length) throw new Error('no references found — check the doc shape');
if (!APPLY) { console.log('DRY RUN'); process.exit(0); }
const fd = new FormData();
fd.append('file', new Blob([readFileSync(join(ROOT, NEW_FILE))], { type: 'image/webp' }), basename(NEW_FILE));
const m = await call('POST', '/api/media', fd);
await call('PATCH', `/api/media/${m.id}`, { altEn: old[0].alt?.en ?? '', altMs: old[0].alt?.ms ?? '' });
const ndoc = JSON.parse(s.replace(re, `$1${m.id}`));
const saved = await call('PUT', `/api/pages/${PAGE_ID}/draft`, { doc: ndoc, baseVersion: p.page.version ?? p.version });
const back = await call('GET', `/api/pages/${PAGE_ID}`);
const left = (JSON.stringify(back.draft).match(re) || []).length;
console.log(`new media id ${m.id}; draft saved v${saved.version ?? '?'}; old refs left ${left}`);
if (left) throw new Error('old references remain');
