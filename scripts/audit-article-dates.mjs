// Independent check of article dates (docs/sitemap-lastmod/SPEC.md R6).
//
// The sitemap copies each article's `dateModified`, so comparing the sitemap to
// `dateModified` proves nothing. This walks git history instead: it loads every
// committed version of src/content/articles/{en,ar,ms}.ts, hashes each article
// (dates excluded) and reports, per article:
//   - first commit that contains it       vs datePublished
//   - last commit that changed its TEXT   vs dateModified   (text = everything but images and `related`)
//   - last commit that changed its `related` link list        (reported, not failed)
//   - last commit that changed its IMAGES vs dateModified   (hero/src/alt/caption/ogImage)
// Exit 1 only when TEXT changed after dateModified, or datePublished is after the
// article first appeared in git (a date that claims a later birth than the history).
//
// Usage: node scripts/audit-article-dates.mjs [--verbose]
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, LANGS, loadArticles, parseFlags } from './lib/sitemap-shared.mjs';

const flags = parseFlags(process.argv.slice(2), ['--verbose', '--help'], 'Usage: node scripts/audit-article-dates.mjs [--verbose]');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf-8', maxBuffer: 256 << 20 });
const NAMES = { en: 'EN_ARTICLES', ar: 'AR_ARTICLES', ms: 'MS_ARTICLES' };
const IMAGE_KEYS = new Set(['hero', 'ogImage', 'src', 'alt', 'caption', 'width', 'height']);
const DATE_KEYS = new Set(['datePublished', 'dateModified', 'readingTime']);

function strip(value, drop) {
  if (Array.isArray(value)) return value.map((v) => strip(v, drop));
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) if (!drop.has(k)) out[k] = strip(value[k], drop);
    return out;
  }
  return value;
}
const sha = (v) => createHash('sha1').update(JSON.stringify(v)).digest('hex');
// `related` = the "related articles" link list later PRESS rounds append to when
// they wire inbound links. Tracked separately: it is navigation, not the article.
const TEXT_DROP = new Set([...DATE_KEYS, ...IMAGE_KEYS, 'related']);
const LINK_DROP = new Set([...DATE_KEYS, ...IMAGE_KEYS]);

const tmp = mkdtempSync(join(tmpdir(), 'avo-article-audit-'));
/** lang -> id -> { first, lastText, lastImage, textHash, fullHash } */
const hist = Object.fromEntries(LANGS.map((l) => [l, {}]));
try {
  for (const lang of LANGS) {
    const file = `src/content/articles/${lang}.ts`;
    const commits = git('log', '--reverse', '--format=%h %ad', '--date=short', '--', file)
      .trim().split('\n').map((l) => l.split(' '));
    for (const [c, date] of commits) {
      let src;
      try { src = git('show', `${c}:${file}`); } catch { continue; } // deleted in this commit
      const p = join(tmp, `${c}-${lang}.ts`);
      writeFileSync(p, src);
      const list = (await import(pathToFileURL(p).href))[NAMES[lang]] ?? [];
      for (const a of list) {
        const textHash = sha(strip(a, TEXT_DROP));
        const linkHash = sha(strip(a, LINK_DROP));
        const fullHash = sha(strip(a, DATE_KEYS));
        const h = hist[lang][a.id];
        if (!h) hist[lang][a.id] = { first: date, firstSha: c, lastText: date, lastTextSha: c, lastImage: date, lastImageSha: c, lastLink: date, lastLinkSha: c, textHash, linkHash, fullHash };
        else {
          const textChanged = h.textHash !== textHash;
          const linkChanged = h.linkHash !== linkHash;
          if (textChanged) Object.assign(h, { lastText: date, lastTextSha: c, textHash });
          else if (linkChanged) Object.assign(h, { lastLink: date, lastLinkSha: c });
          else if (h.fullHash !== fullHash) Object.assign(h, { lastImage: date, lastImageSha: c });
          h.linkHash = linkHash;
          h.fullHash = fullHash;
        }
      }
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

const current = await loadArticles();
const fails = [];
const notes = {};
let n = 0;
for (const lang of LANGS) {
  for (const a of current[lang]) {
    n++;
    const h = hist[lang][a.id];
    const tag = `${lang}/${a.id}`;
    if (!h) { fails.push(`${tag}: not found in git history`); continue; }
    if (a.datePublished > h.first) fails.push(`${tag}: datePublished ${a.datePublished} is after first commit ${h.first} (${h.firstSha})`);
    if (h.lastText > a.dateModified) fails.push(`${tag}: TEXT changed ${h.lastText} (${h.lastTextSha}) after dateModified ${a.dateModified}`);
    if (h.lastLink > h.lastText && h.lastLink > a.dateModified) {
      (notes[`related-links list changed after dateModified (inbound-link wiring by later rounds)`] ??= []).push(`${tag} ${a.dateModified} -> ${h.lastLink} (${h.lastLinkSha})`);
    }
    const imageDate = h.lastImage > h.lastText ? h.lastImage : null;
    if (imageDate && imageDate > a.dateModified) {
      const k = `images/alt/captions changed ${imageDate} (${h.lastImageSha}) after dateModified`;
      (notes[k] ??= []).push(tag);
    }
    if (a.datePublished < h.first) {
      const k = `datePublished earlier than first commit (article committed after its stated publish date)`;
      (notes[k] ??= []).push(`${tag} ${a.datePublished} < ${h.first}`);
    }
  }
}

console.log(`audited ${n} articles against ${LANGS.length} git histories`);
for (const [k, v] of Object.entries(notes)) {
  console.log(`NOTE ${v.length}: ${k}`);
  if (flags.has('--verbose')) console.log('  ' + v.join('\n  '));
}
if (fails.length) {
  console.log(`FAIL ${fails.length}:\n  ${fails.join('\n  ')}`);
  process.exit(1);
}
console.log('PASS: no article text changed after its dateModified; no datePublished after its first commit');
