/**
 * Regenerates the AI-visibility surfaces in public/.
 *
 *   1. facts-sync.mjs   -> AI-FACTS.yml from src/data/storeFacts.json
 *   2. kit build        -> .beacon-out/ (git-ignored staging)
 *   3. adopt            -> about.md, pricing.md, faq.md, AGENTS.md into public/
 *   4. llms-full.txt    -> the three real briefs concatenated
 *
 * What it deliberately does NOT adopt: the kit's own llms.txt / ms/llms.txt /
 * ar/llms.txt. This project already generates public/llms.txt, llms-ms.txt and
 * llms-ar.txt from src/content/llms/*.txt templates filled with storeFacts.json
 * (scripts/build-llms.mjs) — 62 KB, 61 KB and 80 KB of reference prose that no
 * facts file can produce. The kit writes its versions into staging where they
 * are thrown away; adopting them would be a large downgrade.
 *
 * Nor does it adopt schema.jsonld: SEO.tsx already emits Organization,
 * GroceryStore, WebSite, Product, FAQPage and BreadcrumbList per page, with a
 * stable @id on the Organization and the parent GroceryStore. A second graph
 * would duplicate the entity rather than strengthen it.
 *
 * Runs as prebuild, alongside build:llms — anything written to public/ after the
 * vite build would never reach dist/.
 *
 * Usage: node scripts/ai/surfaces.mjs
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const STAGE = join(ROOT, '.beacon-out');
const ADOPT = ['about.md', 'pricing.md', 'faq.md', 'AGENTS.md'];

const run = (script, args = []) =>
  execFileSync(process.execPath, [join(ROOT, 'scripts/ai', script), ...args], {
    stdio: 'inherit',
    cwd: ROOT,
  });

run('facts-sync.mjs');
run('build.mjs', ['--out', STAGE]);

for (const f of ADOPT) {
  const src = join(STAGE, f);
  if (!existsSync(src)) {
    console.error(`  MISSING  ${src} — a block in AI-FACTS.yml went blank`);
    process.exit(1);
  }
  copyFileSync(src, join(ROOT, 'public', f));
  console.log(`  adopted   public/${f}`);
}

/* llms-full.txt, assembled from the real briefs rather than the kit's. */
const BRIEFS = [
  { file: 'llms.txt', label: 'English', url: 'https://avoliveoil.com/llms.txt' },
  { file: 'llms-ms.txt', label: 'Bahasa Melayu', url: 'https://avoliveoil.com/llms-ms.txt' },
  { file: 'llms-ar.txt', label: 'العربية / Arabic', url: 'https://avoliveoil.com/llms-ar.txt' },
];

const out = [
  '# Arabian Village — full brief, all languages',
  '',
  '> Every machine-readable brief this site publishes, concatenated. Each language section',
  '> is written for its own market rather than translated, so the three do not mirror each',
  '> other line for line. The individual files are at',
  '> https://avoliveoil.com/llms.txt · https://avoliveoil.com/llms-ms.txt · https://avoliveoil.com/llms-ar.txt',
  '',
];

for (const b of BRIEFS) {
  const full = join(ROOT, 'public', b.file);
  if (!existsSync(full)) {
    console.error(`  MISSING  public/${b.file} — llms-full.txt would ship incomplete`);
    process.exit(1);
  }
  const body = readFileSync(full, 'utf8').replace(/^﻿/, '').trimEnd();
  out.push('='.repeat(78), `# LANGUAGE: ${b.label}  —  source: ${b.url}`, '='.repeat(78), '', body, '');
}

const text = out.join('\n') + '\n';
writeFileSync(join(ROOT, 'public/llms-full.txt'), text, 'utf8');
console.log(`  wrote     public/llms-full.txt (${(Buffer.byteLength(text) / 1024).toFixed(1)} KB from ${BRIEFS.length} briefs)`);
