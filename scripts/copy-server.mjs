// Copies the PHP backend (server/) into dist/api/ after `vite build`.
// server/tests/ is development-only and never shipped. See docs/cms/CMS-SPEC.md §14.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
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
    return !(rel === 'tests' || rel.startsWith('tests/') || rel.endsWith('.md'));
  },
});
console.log('copy-server: server/ -> dist/api/');
