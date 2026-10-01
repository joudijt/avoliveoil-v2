// Gate: every class a CMS block can emit exists in the public CSS (docs/cms/CMS-SPEC.md §13.3).
//
// Published CMS pages are HTML strings rendered in the admin and served inside the
// public site's stylesheet. Tailwind only generates classes it finds in the public
// sources, so a class used solely by a block variant the build never saw would ship
// unstyled. The block renderer lists every class it can emit in CMS_CLASS_LIST
// (src/cms/blocks/classes.ts); this checks each one against the CSS dist/index.html loads.
//
//   node scripts/check-cms-classes.mjs      (needs a fresh `vite build`)
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLASSES_TS = join(ROOT, 'src/cms/blocks/classes.ts');
const SHELL = join(ROOT, 'dist/index.html');

if (!existsSync(CLASSES_TS)) {
  console.log('check-cms-classes: SKIP — src/cms/blocks/classes.ts does not exist yet (no CMS_CLASS_LIST to check)');
  process.exit(0);
}
if (!existsSync(SHELL)) {
  console.error('check-cms-classes: dist/index.html missing — run `vite build` first');
  process.exit(1);
}

/**
 * classes.ts is TypeScript. Node >= 22.18 strips erasable types natively (the same
 * mechanism scripts/lib/sitemap-shared.mjs uses for the article modules), which also
 * evaluates a COMPUTED list. On an older Node, fall back to reading a literal
 * `CMS_CLASS_LIST = ['…', …];` as text.
 */
async function loadClassList() {
  try {
    const mod = await import(pathToFileURL(CLASSES_TS).href);
    if (Array.isArray(mod.CMS_CLASS_LIST)) return mod.CMS_CLASS_LIST;
  } catch (err) {
    console.log(`check-cms-classes: could not import classes.ts (${String(err.message).split('\n')[0]}); reading it as text`);
  }
  const ts = readFileSync(CLASSES_TS, 'utf8');
  const m = /\bCMS_CLASS_LIST\b[^=]*=\s*\[([\s\S]*?)\]\s*(?:as const\s*)?;/.exec(ts);
  if (!m) return null;
  const body = m[1].replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  if (/\.\.\.|\$\{/.test(body)) return null;
  return [...body.matchAll(/(['"`])((?:(?!\1).)*)\1/g)].map((x) => x[2]);
}

const list = await loadClassList();
if (!list) {
  console.error('check-cms-classes: CMS_CLASS_LIST not found in src/cms/blocks/classes.ts');
  process.exit(1);
}
const classes = [...new Set(list.flatMap((c) => String(c).split(/\s+/)).filter(Boolean))];
if (!classes.length) {
  console.error('check-cms-classes: CMS_CLASS_LIST is empty');
  process.exit(1);
}

const shell = readFileSync(SHELL, 'utf8');
const cssFiles = [...shell.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"/g)].map((m) => m[1]);
if (!cssFiles.length) {
  console.error('check-cms-classes: dist/index.html links no stylesheet');
  process.exit(1);
}
const css = cssFiles.map((href) => readFileSync(join(ROOT, 'dist', ...href.replace(/^\//, '').split('/')), 'utf8')).join('\n');

/** The selector form Tailwind writes for a class: every non-identifier character backslash-escaped. */
const selectorFor = (cls) => '.' + cls.replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`);
const isDefined = (cls) => {
  const sel = selectorFor(cls);
  let at = css.indexOf(sel);
  while (at !== -1) {
    const next = css[at + sel.length];
    if (next === undefined || !/[a-zA-Z0-9_\\-]/.test(next)) return true;
    at = css.indexOf(sel, at + 1);
  }
  return false;
};

const missing = classes.filter((c) => !isDefined(c));
console.log(`check-cms-classes: ${classes.length} classes from CMS_CLASS_LIST, ${classes.length - missing.length} found in ${cssFiles.join(', ')}`);
if (missing.length) {
  console.error(
    `FAIL — ${missing.length} class(es) a CMS block can emit are not in the public CSS:\n  ${missing.join('\n  ')}`,
  );
  process.exit(1);
}
console.log('check-cms-classes: OK');
