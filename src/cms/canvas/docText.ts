import type { CmsLang, CmsPageDoc, Localized, Widget } from '../contracts';

/**
 * Sets one language of a Localized field at a dotted path inside a widget's
 * settings (`text`, `label`, `items.2.q`). Used for the canvas's optimistic update
 * after an in-place edit — the shell applies the same change from the
 * `cms:inline-text` message and sends the doc back.
 */
export function setLocalizedAtPath(doc: CmsPageDoc, widgetId: string, path: string, lang: CmsLang, value: string): CmsPageDoc {
  const parts = path.split('.');
  const setIn = (node: unknown, i: number): unknown => {
    if (i === parts.length) {
      const loc = node as Localized | undefined;
      return { en: loc?.en ?? '', ms: loc?.ms ?? '', [lang]: value };
    }
    const key = parts[i];
    if (Array.isArray(node)) {
      const idx = Number(key);
      if (!Number.isInteger(idx) || idx < 0 || idx >= node.length) return node;
      const copy = node.slice();
      copy[idx] = setIn(node[idx], i + 1);
      return copy;
    }
    const obj = (node && typeof node === 'object' ? node : {}) as Record<string, unknown>;
    return { ...obj, [key]: setIn(obj[key], i + 1) };
  };
  return {
    ...doc,
    sections: doc.sections.map((s) => ({
      ...s,
      columns: s.columns.map((c) => ({
        ...c,
        widgets: c.widgets.map((w) => (w.id === widgetId ? ({ ...w, settings: setIn(w.settings, 0) } as Widget) : w)),
      })),
    })),
  };
}
