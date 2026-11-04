// FORGE PRODUCTS-R1 B6 helper: load MS articles like scripts/lib/sitemap-shared.mjs
// loadArticles() does, MS only (en.ts is edited in parallel by B5). Cache-busted.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const MS_TS = join(ROOT, 'src/content/articles/ms.ts');
export const MAP = join(ROOT, 'docs/forge/r1-article-map.ms.json');

export async function loadMs(file = MS_TS) {
  const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
  if (!Array.isArray(mod.MS_ARTICLES)) throw new Error('MS_ARTICLES not exported');
  return mod.MS_ARTICLES;
}

/** Walk every string leaf: yields [pathString, value]. */
export function* strings(node, path = '') {
  if (typeof node === 'string') { yield [path, node]; return; }
  if (Array.isArray(node)) { for (let i = 0; i < node.length; i++) yield* strings(node[i], `${path}[${i}]`); return; }
  if (node && typeof node === 'object') for (const k of Object.keys(node)) yield* strings(node[k], path ? `${path}.${k}` : k);
}

export const TRIGGER = /\bRM\s?\d|\bsen\b|seliter|se liter|per liter|cawangan|Ampang|Batu Caves|Gombak|kedua|\bdua\b|lebih besar|500\s?ml|harga sama|harga yang sama|8(:00)? pagi|tengah malam|waktu (buka|operasi)/i;

export const BANNED = [
  /RM103/i, /RM206/i, /RM0\.206/i, /RM3\.09/i, /RM6\.18/i, /RM12\.36/i, /RM1\.03/i,
  /RM30\.00.{0,60}(litre|liter)|(litre|liter).{0,60}RM30\.00/i,
  /Ampang Jaya/i, /isLarger/i,
  /\b(two|both|2|dua|kedua-dua)\b[^.]{0,40}\b(branch(es)?|cawangan)/i,
  /Kedua-duanya buka\b/i, // \b: "kedua-duanya bukan ..." is ordinary Malay, not an hours claim
  /larger (store|branch|outlet)/i, /cawangan (yang )?lebih besar/i,
  /Persiaran Putra Sulaiman, 17-L1/i,
  /Batu Caves(?! *,? *Selangor)/i, // only as "68100 Batu Caves" postal town
  /infus[^.]{0,40}500\s?ml/i, // infused named BEFORE a 500 ml size; "250 ml dan 500 ml, serta Koleksi Infusi" = classic sizes
  /harga ikut saiz/i,
];
