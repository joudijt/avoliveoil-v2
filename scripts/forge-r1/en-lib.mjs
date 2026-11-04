// FORGE PRODUCTS-R1 B5 helper: load EN articles the same way scripts/lib/sitemap-shared.mjs
// loadArticles() does, but EN only (ms.ts is edited in parallel by another builder and may be
// mid-edit; loadArticles() imports both). Cache-busted so a re-load after an edit is fresh.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const EN_TS = join(ROOT, 'src/content/articles/en.ts');
export const MAP = join(ROOT, 'docs/forge/r1-article-map.en.json');

export async function loadEn() {
  const mod = await import(pathToFileURL(EN_TS).href + `?t=${Date.now()}`);
  if (!Array.isArray(mod.EN_ARTICLES)) throw new Error('EN_ARTICLES not exported');
  return mod.EN_ARTICLES;
}

/** Walk every string leaf: yields [pathString, value]. */
export function* strings(node, path = '') {
  if (typeof node === 'string') { yield [path, node]; return; }
  if (Array.isArray(node)) { for (let i = 0; i < node.length; i++) yield* strings(node[i], `${path}[${i}]`); return; }
  if (node && typeof node === 'object') for (const k of Object.keys(node)) yield* strings(node[k], path ? `${path}.${k}` : k);
}

export const TRIGGER = /\bRM\s?\d|\bsen\b|per[- ]litre|per[- ]liter|branch|outlet|Ampang|Batu Caves|Gombak|\bboth\b|\btwo\b|larger|500\s?ml|same price|price follows|every flavour|each flavour|infused|8(:00)?\s?a\.?m|midnight|opening hours/i;

export const BANNED = [
  /RM103/i, /RM206/i, /RM0\.206/i, /RM3\.09/i, /RM6\.18/i, /RM12\.36/i, /RM1\.03/i,
  /RM30\.00.{0,60}(litre|liter)|(litre|liter).{0,60}RM30\.00/i,
  /Ampang Jaya/i, /isLarger/i,
  /\b(two|both|2|dua|kedua-dua)\b[^.]{0,40}\b(branch(es)?|cawangan)/i,
  /Kedua-duanya buka/i, /larger (store|branch|outlet)/i, /cawangan (yang )?lebih besar/i,
  /Persiaran Putra Sulaiman, 17-L1/i,
];
