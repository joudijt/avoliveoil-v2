// Build-time gate: src/content/articles/{en,ar,ms}.ts must agree with
// src/content/articles/slugs.json, in BOTH directions.
//
// Why this is a script and not a runtime check any more
// -----------------------------------------------------
// index.ts used to run this loop at module load. That was only possible
// because it statically imported all three language files — which is exactly
// what put 1.9 MB of article prose into the chunk every page of the site
// downloads. The languages are lazy now, so nothing holds all three at once
// at runtime and the check has to happen here instead.
//
// HOW IT READS THE .ts FILES — please read before editing
// -------------------------------------------------------
// Node cannot import these modules: they are TypeScript (`import type`,
// `const X: Article[]`) and this repo has no TS loader in its script path.
// So the files are read as TEXT and the id/slug pairs are pulled out with a
// regex. The regex is deliberately strict — it only matches an `id` line
// immediately followed by a `slug` line, both at exactly four spaces of
// indent, which is the one place a top-level article object declares them:
//
//     id: 'olive-oil-popularity-malaysia',
//     slug: 'why-olive-oil-is-becoming-popular-in-malaysia',
//
// (Both quoting styles appear in the corpus — `id:` and `"id":`, single and
// double quotes — so both are accepted.) This is a text heuristic, not a
// parse. Two things protect it:
//   * every language must yield at least one pair, else the format changed
//     underneath us and we fail rather than pass vacuously;
//   * the pair count per language must equal the number of entries slugs.json
//     claims for that language, so an article the regex silently skipped shows
//     up as a missing-article error rather than as a clean run.
// If the content files are ever reformatted (prettier with a different indent,
// nested objects that also carry `id`/`slug` at four spaces), fix the regex —
// do not loosen the guards.
//
// Exit code 1 on any disagreement, and it prints every offending
// article/language rather than only the first.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = join(__dirname, '..', 'src', 'content', 'articles');
const LANGS = ['en', 'ar', 'ms'];

/** `id: 'x',` / `"id": "x",` on one line, `slug` on the very next. */
const PAIR_RE =
  /^ {4}"?id"?:\s*(['"])(.*?)\1,\s*\r?\n {4}"?slug"?:\s*(['"])(.*?)\3,\s*\r?$/gm;

function readPairs(lang) {
  const file = join(ARTICLES_DIR, `${lang}.ts`);
  const source = readFileSync(file, 'utf-8');
  const pairs = [];
  PAIR_RE.lastIndex = 0;
  let match;
  while ((match = PAIR_RE.exec(source)) !== null) {
    pairs.push({ id: match[2], slug: match[4] });
  }
  return pairs;
}

const errors = [];
const slugTable = JSON.parse(readFileSync(join(ARTICLES_DIR, 'slugs.json'), 'utf-8'));

for (const lang of LANGS) {
  const pairs = readPairs(lang);

  if (pairs.length === 0) {
    errors.push(
      `[${lang}] the id/slug regex in scripts/check-article-slugs.mjs matched nothing in ` +
        `src/content/articles/${lang}.ts. The file format changed — fix the regex, ` +
        `do not delete this check.`
    );
    continue;
  }

  const seenSlugs = new Map();
  const seenIds = new Set();

  for (const { id, slug } of pairs) {
    // 1. content -> slugs.json
    const expected = slugTable[id]?.[lang];
    if (expected !== slug) {
      errors.push(
        `[${lang}] "${id}": slugs.json has "${expected ?? '<missing>'}", ` +
          `${lang}.ts has "${slug}". Update src/content/articles/slugs.json.`
      );
    }

    // 2. two articles must not claim the same URL — prerender would write one
    //    file for both and the SPA would only ever reach the first.
    const duplicate = seenSlugs.get(slug);
    if (duplicate) {
      errors.push(`[${lang}] duplicate slug "${slug}" used by both "${duplicate}" and "${id}".`);
    } else {
      seenSlugs.set(slug, id);
    }

    if (seenIds.has(id)) errors.push(`[${lang}] duplicate article id "${id}" in ${lang}.ts.`);
    seenIds.add(id);
  }

  // 3. slugs.json -> content. An entry with no article behind it becomes a
  //    prerendered route that 404s in the SPA and a dead sitemap URL.
  for (const [id, perLang] of Object.entries(slugTable)) {
    if (perLang[lang] && !seenIds.has(id)) {
      errors.push(
        `[${lang}] slugs.json lists "${id}" -> "${perLang[lang]}", but ${lang}.ts has no such ` +
          `article. Remove the entry or write the article (prerender.mjs reads slugs.json and ` +
          `would publish a 404).`
      );
    }
  }

  console.log(`  ${lang}: ${pairs.length} articles checked`);
}

if (errors.length > 0) {
  console.error(`\ncheck:slugs FAILED — ${errors.length} problem(s):\n`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error('');
  process.exit(1);
}

console.log('check:slugs OK — article slugs and slugs.json agree.');
