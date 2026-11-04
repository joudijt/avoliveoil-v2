/**
 * FORGE PRODUCTS-R1 O-41 — rewrites the facts in the LIVE landing page's DRAFT (en + ms) through
 * the CMS API: two branches -> five, "both sizes for every flavour" -> classic 250/500 + infused 250,
 * "Ampang Jaya" -> Ampang, hours only for the branches that have them, and the products widget
 * gains 'organic' right after 'classic'. It never publishes: run publish-page-via-panel.mjs after
 * (publishing renders the HTML in the panel).
 *
 *   AVO_BASE=https://avoliveoil.com PWFILE=<file with the admin password> PAGE_ID=2 \
 *     node scripts/dev/update-landing-r1.mjs            # dry run (default): prints the diff, writes nothing
 *   ... node scripts/dev/update-landing-r1.mjs --apply   # PUT the patched draft (baseVersion = live version)
 *   (local harness: AVO_BASE=https://localhost:8443 NODE_TLS_REJECT_UNAUTHORIZED=0;
 *    mock: AVO_BASE=http://127.0.0.1:4183 AVO_EMAIL=tarek@avoliveoil.com with PWFILE holding olive-oil-2026)
 *
 * Safety:
 *   - ABORTS when the page already has unpublished changes (hasUnpublished): someone's pending
 *     edit must be published or discarded by a person first, never folded into this one.
 *   - Exact old -> new string map, applied inside localized {en, ms} values only. Every map entry
 *     that matches nothing is listed (the owner may have reworded it in the panel — fix by hand).
 *   - Every write = POST + X-HTTP-Method-Override, Origin, X-CSRF-Token, X-CMS-Build (server/index.php).
 *   - The PUT carries baseVersion; a concurrent edit answers 409 stale_draft and nothing is written.
 *   - After --apply the draft is read back and asserted to equal what was sent.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FACTS = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
const B = FACTS.branches;

const joinList = (items, and) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`);
const N = B.length;
const NAMES_EN = joinList(B.map((b) => b.labelEn), 'and');
const NAMES_MS = joinList(B.map((b) => b.labelMs), 'dan');
const H = B.filter((b) => b.hours);
const HOURS_EN = H.length
  ? `${joinList(H.map((b) => b.labelEn), 'and')} open ${H[0].hours.displayEn}; for the others, and on festive days, ask on WhatsApp.`
  : 'Ask on WhatsApp for opening hours.';
const HOURS_MS = H.length
  ? `${joinList(H.map((b) => b.labelMs), 'dan')} dibuka ${H[0].hours.displayMs}; untuk cawangan lain, dan pada hari perayaan, tanya di WhatsApp.`
  : 'Tanya di WhatsApp untuk waktu operasi.';

/**
 * [old, new] per language, applied in order as substring replacements inside localized strings.
 * Old strings = the text scripts/dev/create-landing-draft.mjs wrote (the live page's origin) plus
 * the stores-widget line seen in the panel mock. New strings are built from storeFacts.json.
 */
export const REPLACEMENTS = {
  en: [
    ['The classic oil, plus six infused flavours.', 'Extra Virgin and Organic Extra Virgin, plus six infused flavours.'],
    [
      '<p>250 ml and 500 ml bottles. The classic oil and every infused flavour come in both sizes.</p>',
      '<p>Extra Virgin and Organic Extra Virgin come in 250 ml and 500 ml. Every infused flavour comes in 250 ml.</p>',
    ],
    [
      'The classic Palestinian extra virgin olive oil or one of six infused flavours, in 250 ml or 500 ml.',
      'Extra Virgin or Organic Extra Virgin Palestinian olive oil (250 ml or 500 ml), or one of six infused flavours (250 ml).',
    ],
    [
      'Visit one of the two Berkat Madinah Store branches in Selangor,',
      `Visit one of the ${N} Berkat Madinah Store branches in Selangor (stock can vary by branch — WhatsApp first),`,
    ],
    [
      'Two branches in Selangor: Batu Caves / Prima Seri Gombak and Ampang Jaya. Open 8:00 am – 12:00 midnight, Monday through Sunday; festive days can differ.',
      `${N} branches in Selangor: ${NAMES_EN}. ${HOURS_EN}`,
    ],
    ['Two branches in Selangor.', `${N} branches in Selangor. Stock can vary by branch.`],
    ['2 branches in Selangor', `${N} branches in Selangor`],
    [
      'at its Batu Caves / Prima Seri Gombak and Ampang Jaya branches in Selangor,',
      `at any of its ${N} branches in Selangor (${NAMES_EN} — stock can vary by branch),`,
    ],
    ['250 ml and 500 ml, for the classic oil and for every infused flavour.', 'Extra Virgin and Organic Extra Virgin: 250 ml and 500 ml. Every infused flavour: 250 ml.'],
    ['Both branches are in Selangor,', `All ${N} branches are in Selangor,`],
  ],
  ms: [
    ['Minyak klasik, serta enam perisa infused.', 'Extra Virgin dan Extra Virgin Organik, serta enam perisa infused.'],
    [
      '<p>Botol 250 ml dan 500 ml. Minyak klasik dan setiap perisa infused tersedia dalam kedua-dua saiz.</p>',
      '<p>Extra Virgin dan Extra Virgin Organik dalam 250 ml dan 500 ml. Setiap perisa infused dalam 250 ml.</p>',
    ],
    [
      'Minyak zaitun extra virgin Palestin klasik atau salah satu daripada enam perisa infused, dalam 250 ml atau 500 ml.',
      'Minyak zaitun Palestin Extra Virgin atau Extra Virgin Organik (250 ml atau 500 ml), atau salah satu daripada enam perisa infused (250 ml).',
    ],
    [
      'Kunjungi salah satu daripada dua cawangan Berkat Madinah Store di Selangor,',
      `Kunjungi salah satu daripada ${N} cawangan Berkat Madinah Store di Selangor (stok mungkin berbeza mengikut cawangan — WhatsApp dahulu),`,
    ],
    [
      'Dua cawangan di Selangor: Batu Caves / Prima Seri Gombak dan Ampang Jaya. Dibuka 8:00 pagi – 12:00 tengah malam, Isnin hingga Ahad; hari perayaan mungkin berbeza.',
      `${N} cawangan di Selangor: ${NAMES_MS}. ${HOURS_MS}`,
    ],
    ['Dua cawangan di Selangor.', `${N} cawangan di Selangor. Stok mungkin berbeza mengikut cawangan.`],
    ['2 cawangan di Selangor', `${N} cawangan di Selangor`],
    [
      'di cawangan Batu Caves / Prima Seri Gombak dan Ampang Jaya di Selangor,',
      `di mana-mana ${N} cawangannya di Selangor (${NAMES_MS} — stok mungkin berbeza mengikut cawangan),`,
    ],
    ['250 ml dan 500 ml, untuk minyak klasik dan untuk setiap perisa infused.', 'Extra Virgin dan Extra Virgin Organik: 250 ml dan 500 ml. Setiap perisa infused: 250 ml.'],
    ['Kedua-dua cawangan berada di Selangor,', `Kesemua ${N} cawangan berada di Selangor,`],
  ],
};

/** Phrases that must not survive the patch (same family as scripts/check-facts.mjs). */
const LEFTOVER = /Ampang Jaya|\b(?:two|both|2|dua|kedua-dua)\b[^.]{0,40}\b(?:branch(?:es)?|cawangan)|both sizes|kedua-dua saiz/i;

const isLocalized = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.en === 'string' && typeof v.ms === 'string';

/**
 * Pure: returns { doc, changes, unmatched, idsChanged, leftovers } without touching `doc`.
 * Exported so it can be unit-checked without a server.
 */
export function patchDoc(input) {
  const doc = structuredClone(input);
  const hits = { en: REPLACEMENTS.en.map(() => 0), ms: REPLACEMENTS.ms.map(() => 0) };
  const changes = [];
  const leftovers = [];
  let idsChanged = 0;

  const visit = (node, path) => {
    if (Array.isArray(node)) return node.forEach((v, i) => visit(v, `${path}[${i}]`));
    if (!node || typeof node !== 'object') return;
    if (node.type === 'products' && Array.isArray(node.settings?.ids) && !node.settings.ids.includes('organic')) {
      const ids = node.settings.ids;
      const at = ids.indexOf('classic');
      const before = JSON.stringify(ids);
      if (at > -1) ids.splice(at + 1, 0, 'organic');
      else ids.unshift('organic');
      idsChanged++;
      changes.push({ path: `${path}.settings.ids`, lang: '-', from: before, to: JSON.stringify(ids) });
    }
    for (const [k, v] of Object.entries(node)) {
      if (isLocalized(v)) {
        for (const lang of ['en', 'ms']) {
          let s = v[lang];
          REPLACEMENTS[lang].forEach(([from, to], i) => {
            if (s.includes(from)) {
              const n = s.split(from).length - 1;
              hits[lang][i] += n;
              s = s.split(from).join(to);
            }
          });
          if (s !== v[lang]) {
            changes.push({ path: `${path}.${k}`, lang, from: v[lang], to: s });
            v[lang] = s;
          }
          if (LEFTOVER.test(s)) leftovers.push({ path: `${path}.${k}`, lang, text: s });
        }
      } else visit(v, `${path}.${k}`);
    }
  };
  visit(doc, '$');

  const unmatched = ['en', 'ms'].flatMap((lang) => REPLACEMENTS[lang].filter((_, i) => hits[lang][i] === 0).map(([from]) => ({ lang, from })));
  return { doc, changes, unmatched, idsChanged, leftovers };
}

/* ------------------------------------------------------------------ CLI */

async function main() {
  const BASE = process.env.AVO_BASE;
  const EMAIL = process.env.AVO_EMAIL || 'admin@avoliveoil.com';
  const PAGE = Number(process.env.PAGE_ID);
  const APPLY = process.argv.includes('--apply');
  if (!BASE || !PAGE || !process.env.PWFILE) throw new Error('AVO_BASE, PAGE_ID and PWFILE are required');
  const PASSWORD = readFileSync(process.env.PWFILE, 'utf8').trim();

  let cookie = '';
  let csrf = '';
  let build = '';
  async function call(method, path, body) {
    const headers = { Origin: BASE, Accept: 'application/json' };
    if (cookie) headers.Cookie = cookie;
    if (csrf) headers['X-CSRF-Token'] = csrf;
    if (build) headers['X-CMS-Build'] = build;
    let sendMethod = method;
    if (method !== 'GET' && method !== 'POST') {
      headers['X-HTTP-Method-Override'] = method;
      sendMethod = 'POST';
    }
    let payload;
    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body);
    }
    const res = await fetch(BASE + path, { method: sendMethod, headers, body: payload, redirect: 'manual' });
    const set = res.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0];
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${typeof data === 'string' ? data.slice(0, 200) : JSON.stringify(data)}`);
    return data;
  }

  csrf = (await call('POST', '/api/auth/login', { email: EMAIL, password: PASSWORD })).csrf;
  build = (await call('GET', '/api/build')).build;
  const before = await call('GET', `/api/pages/${PAGE}`);
  const meta = before.page;
  console.log(`page ${meta.id} /${meta.slug} status=${meta.status} version=${meta.version} hasUnpublished=${meta.hasUnpublished}`);
  if (meta.hasUnpublished) {
    throw new Error('ABORT: the page already has unpublished changes. Publish or discard them in the panel first — this script never folds its edit into someone else\'s pending one.');
  }

  const { doc, changes, unmatched, idsChanged, leftovers } = patchDoc(before.draft);
  for (const c of changes) console.log(`\n${c.path} [${c.lang}]\n  - ${c.from}\n  + ${c.to}`);
  console.log(`\n${changes.length} change(s), products widgets patched: ${idsChanged}`);
  if (unmatched.length) {
    console.log('\nmap entries that matched nothing (reworded in the panel? check by hand):');
    for (const u of unmatched) console.log(`  [${u.lang}] ${u.from}`);
  }
  if (leftovers.length) {
    console.log('\nSTILL OLD after the patch (fix by hand in the panel):');
    for (const l of leftovers) console.log(`  ${l.path} [${l.lang}] ${l.text.slice(0, 160)}`);
  }
  if (!APPLY) {
    console.log('\nDRY RUN — nothing written. Re-run with --apply to save the draft.');
    return;
  }
  if (changes.length === 0) {
    console.log('nothing to change');
    return;
  }
  const saved = await call('PUT', `/api/pages/${PAGE}/draft`, { doc, baseVersion: meta.version });
  const after = await call('GET', `/api/pages/${PAGE}`);
  if (JSON.stringify(after.draft) !== JSON.stringify(doc)) throw new Error('read-back: the saved draft differs from what was sent');
  console.log(`\nsaved draft version ${saved.version} (read back OK). Now publish: publish-page-via-panel.mjs PAGE_ID=${PAGE}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
