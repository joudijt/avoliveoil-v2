// Copies the PHP backend (server/) into dist/api/ after `vite build`.
// server/tests/ is development-only and never shipped. See docs/cms/CMS-SPEC.md §14.
//
// Also writes dist/api/_data/site-facts.json: the few store facts the PHP side needs at
// runtime ({{store}} interpolation, the default OG card). src/ is not deployed, so the
// server cannot read src/data/storeFacts.json itself.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'server');
const dest = join(root, 'dist', 'api');

if (!existsSync(src)) {
  console.error('copy-server: server/ is missing');
  process.exit(1);
}

// Keep dist/api/_data (written by cms-build-data.mjs) — only replace the PHP tree.
mkdirSync(dest, { recursive: true });
for (const entry of ['index.php', 'serve.php', 'sitemap.php', '.htaccess', '_lib', '_setup']) {
  rmSync(join(dest, entry), { recursive: true, force: true });
}
cpSync(src, dest, {
  recursive: true,
  filter: (p) => {
    const rel = relative(src, p).split(sep).join('/');
    if (rel === 'tests' || rel.startsWith('tests/')) return false;
    if (rel.endsWith('.md') || rel.endsWith('/.gitignore') || rel === '.gitignore') return false;
    return true;
  },
});

// Same values src/config/site.ts exports (SITE_NAME, OG_IMAGE_PATH, OG_IMAGE_WIDTH/HEIGHT/TYPE, MADINAH_NAME).
const facts = JSON.parse(readFileSync(join(root, 'src', 'data', 'storeFacts.json'), 'utf8'));
mkdirSync(join(dest, '_data'), { recursive: true });
writeFileSync(
  join(dest, '_data', 'site-facts.json'),
  JSON.stringify(
    {
      madinahName: facts.seller.name,
      siteName: facts.site.name,
      siteNameMs: facts.site.nameMs,
      ogImage: facts.site.ogImage,
      ogWidth: 1200,
      ogHeight: 630,
      ogType: 'image/jpeg',
    },
    null,
    2
  ) + '\n'
);

// Say so when a setup/reset file is going out, so the deploy log shows it.
const setupDir = join(dest, '_setup');
if (existsSync(setupDir)) {
  const tokens = readdirSync(setupDir).filter((n) => /\.(token|reset)$/.test(n));
  if (tokens.length) console.log(`copy-server: shipping ${tokens.length} setup file(s) in /api/_setup (deleted by the server on use)`);
}
console.log('copy-server: server/ -> dist/api/ (+ _data/site-facts.json)');
