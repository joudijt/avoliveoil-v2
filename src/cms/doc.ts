/**
 * Pure operations on a CmsPageDoc — FROZEN contract shared by the builder shell
 * (src/admin) and the canvas (src/cms). Every function returns a NEW doc and never
 * mutates its input, so the shell can keep an undo stack of plain references.
 */
import type {
  CmsLang,
  CmsPageDoc,
  Column,
  Localized,
  Section,
  SectionSettings,
  Widget,
  WidgetType,
} from './contracts';
import { emptyLocalized } from './contracts';

// ---------------------------------------------------------------- ids

export function newId(prefix = 'n'): string {
  const rnd =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 10)
      : Math.random().toString(36).slice(2, 12);
  return `${prefix}${rnd}`;
}

const L = (en: string, ms = ''): Localized => ({ en, ms });

// ---------------------------------------------------------------- factories

export function defaultSectionSettings(): SectionSettings {
  return { layout: 'boxed', bg: 'bg', padY: 'l', align: 'start', valign: 'start', gap: 'm' };
}

export function createWidget(type: WidgetType): Widget {
  const id = newId('w');
  switch (type) {
    case 'heading':
      return { id, type, settings: { text: L('New heading'), level: 'h2', size: 'l', align: 'start', color: 'olive-dark' } };
    case 'text':
      return { id, type, settings: { html: L('<p>Write your text here.</p>'), align: 'start', color: 'default', size: 'm' } };
    case 'image':
      return { id, type, settings: { alt: emptyLocalized(), ratio: 'auto', rounded: true, align: 'center', maxWidth: 0 } };
    case 'button':
      return { id, type, settings: { label: L('Learn more'), href: '/en/contact', style: 'primary', newTab: false, align: 'start', size: 'm' } };
    case 'spacer':
      return { id, type, settings: { size: 'm' } };
    case 'divider':
      return { id, type, settings: { style: 'gold', width: 's' } };
    case 'video':
      return { id, type, settings: { url: '', ratio: '16/9', title: emptyLocalized() } };
    case 'gallery':
      return { id, type, settings: { media: [], cols: 3, ratio: '4/3', lightbox: true } };
    case 'iconList':
      return {
        id,
        type,
        settings: {
          items: [
            { id: newId('i'), icon: 'check', text: L('First point') },
            { id: newId('i'), icon: 'check', text: L('Second point') },
          ],
          color: 'default',
          layout: 'list',
        },
      };
    case 'faq':
      return { id, type, settings: { items: [{ id: newId('q'), q: L('Your question?'), a: L('Your answer.') }] } };
    case 'products':
      return { id, type, settings: { ids: [], cols: 3, showTagline: true } };
    case 'form':
      return { id, type, settings: { style: 'card' } };
    case 'quote':
      return { id, type, settings: { text: L('A short quote from a customer.'), author: L('Name') } };
    case 'whatsapp':
      return { id, type, settings: { label: L('Chat on WhatsApp'), message: L('Hello, I would like to ask about your olive oil.'), align: 'start' } };
  }
}

export function createColumn(span = 12, widgets: Widget[] = []): Column {
  return { id: newId('c'), span, widgets };
}

/** layout = spans per column, e.g. [12], [6,6], [4,8], [4,4,4], [3,3,3,3] */
export function createSection(layout: number[] = [12], settings: Partial<SectionSettings> = {}): Section {
  return {
    id: newId('s'),
    kind: 'section',
    settings: { ...defaultSectionSettings(), ...settings },
    columns: layout.map((span) => createColumn(span)),
  };
}

export const COLUMN_LAYOUTS: number[][] = [[12], [6, 6], [4, 8], [8, 4], [4, 4, 4], [3, 3, 3, 3]];

export function emptyDoc(title: Localized = emptyLocalized()): CmsPageDoc {
  return {
    schema: 1,
    title,
    seo: { metaTitle: emptyLocalized(), metaDescription: emptyLocalized() },
    sections: [],
  };
}

// ---------------------------------------------------------------- lookup

export type NodeRef =
  | { kind: 'section'; section: Section; sectionIndex: number }
  | { kind: 'column'; column: Column; section: Section; sectionIndex: number; columnIndex: number }
  | { kind: 'widget'; widget: Widget; column: Column; section: Section; sectionIndex: number; columnIndex: number; widgetIndex: number };

export function findNode(doc: CmsPageDoc, id: string): NodeRef | null {
  for (let si = 0; si < doc.sections.length; si++) {
    const section = doc.sections[si];
    if (section.id === id) return { kind: 'section', section, sectionIndex: si };
    for (let ci = 0; ci < section.columns.length; ci++) {
      const column = section.columns[ci];
      if (column.id === id) return { kind: 'column', column, section, sectionIndex: si, columnIndex: ci };
      for (let wi = 0; wi < column.widgets.length; wi++) {
        const widget = column.widgets[wi];
        if (widget.id === id) {
          return { kind: 'widget', widget, column, section, sectionIndex: si, columnIndex: ci, widgetIndex: wi };
        }
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------- immutable helpers

function mapSections(doc: CmsPageDoc, fn: (s: Section, i: number) => Section): CmsPageDoc {
  return { ...doc, sections: doc.sections.map(fn) };
}

function mapColumn(doc: CmsPageDoc, columnId: string, fn: (c: Column) => Column): CmsPageDoc {
  return mapSections(doc, (s) =>
    s.columns.some((c) => c.id === columnId) ? { ...s, columns: s.columns.map((c) => (c.id === columnId ? fn(c) : c)) } : s
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/** Deep copy with fresh ids everywhere (used by duplicate and by templates). */
export function reId<T>(node: T): T {
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) out[k] = walk(val);
      if (typeof out.id === 'string') {
        const prefix = (out.id as string).charAt(0) || 'n';
        out.id = newId(prefix);
      }
      return out;
    }
    return v;
  };
  return walk(node) as T;
}

// ---------------------------------------------------------------- sections

export function insertSection(doc: CmsPageDoc, section: Section, index = doc.sections.length): CmsPageDoc {
  const sections = doc.sections.slice();
  sections.splice(clamp(index, 0, sections.length), 0, section);
  return { ...doc, sections };
}

export function moveSection(doc: CmsPageDoc, id: string, toIndex: number): CmsPageDoc {
  const from = doc.sections.findIndex((s) => s.id === id);
  if (from < 0) return doc;
  const sections = doc.sections.slice();
  const [s] = sections.splice(from, 1);
  sections.splice(clamp(toIndex, 0, sections.length), 0, s);
  return { ...doc, sections };
}

export function updateSection(doc: CmsPageDoc, id: string, patch: Partial<Section>): CmsPageDoc {
  return mapSections(doc, (s) => (s.id === id ? { ...s, ...patch, id: s.id, kind: 'section' } : s));
}

export function updateSectionSettings(doc: CmsPageDoc, id: string, patch: Partial<SectionSettings>): CmsPageDoc {
  return mapSections(doc, (s) => (s.id === id ? { ...s, settings: { ...s.settings, ...patch } } : s));
}

/**
 * Change a section's column layout. Widgets are kept: when there are fewer new
 * columns, the widgets of the removed columns move into the last remaining one.
 */
export function setSectionLayout(doc: CmsPageDoc, id: string, layout: number[]): CmsPageDoc {
  return mapSections(doc, (s) => {
    if (s.id !== id) return s;
    const columns: Column[] = layout.map((span, i) =>
      s.columns[i] ? { ...s.columns[i], span } : createColumn(span)
    );
    const overflow = s.columns.slice(layout.length).flatMap((c) => c.widgets);
    if (overflow.length) {
      const last = columns[columns.length - 1];
      columns[columns.length - 1] = { ...last, widgets: [...last.widgets, ...overflow] };
    }
    return { ...s, columns };
  });
}

// ---------------------------------------------------------------- widgets

export function insertWidget(doc: CmsPageDoc, columnId: string, widget: Widget, index?: number): CmsPageDoc {
  return mapColumn(doc, columnId, (c) => {
    const widgets = c.widgets.slice();
    widgets.splice(clamp(index ?? widgets.length, 0, widgets.length), 0, widget);
    return { ...c, widgets };
  });
}

export function moveWidget(doc: CmsPageDoc, id: string, toColumnId: string, toIndex: number): CmsPageDoc {
  const ref = findNode(doc, id);
  if (!ref || ref.kind !== 'widget') return doc;
  const target = findNode(doc, toColumnId);
  if (!target || target.kind !== 'column') return doc;
  let index = toIndex;
  // Moving down inside the same column: removing first shifts the target index.
  if (ref.column.id === toColumnId && ref.widgetIndex < toIndex) index -= 1;
  const removed = mapColumn(doc, ref.column.id, (c) => ({ ...c, widgets: c.widgets.filter((w) => w.id !== id) }));
  return insertWidget(removed, toColumnId, ref.widget, index);
}

export function updateWidget(doc: CmsPageDoc, id: string, patch: Partial<Widget>): CmsPageDoc {
  return mapSections(doc, (s) => ({
    ...s,
    columns: s.columns.map((c) => ({
      ...c,
      widgets: c.widgets.map((w) => (w.id === id ? ({ ...w, ...patch, id: w.id, type: w.type } as Widget) : w)),
    })),
  }));
}

export function updateWidgetSettings(doc: CmsPageDoc, id: string, patch: Record<string, unknown>): CmsPageDoc {
  return mapSections(doc, (s) => ({
    ...s,
    columns: s.columns.map((c) => ({
      ...c,
      widgets: c.widgets.map((w) => (w.id === id ? ({ ...w, settings: { ...w.settings, ...patch } } as Widget) : w)),
    })),
  }));
}

/** Set one language of a Localized field on a widget, e.g. field 'text' or 'label'. */
export function setWidgetText(doc: CmsPageDoc, id: string, field: string, lang: CmsLang, value: string): CmsPageDoc {
  const ref = findNode(doc, id);
  if (!ref || ref.kind !== 'widget') return doc;
  const current = (ref.widget.settings as unknown as Record<string, unknown>)[field] as Localized | undefined;
  if (!current || typeof current !== 'object') return doc;
  return updateWidgetSettings(doc, id, { [field]: { ...current, [lang]: value } });
}

// ---------------------------------------------------------------- generic node ops

export function removeNode(doc: CmsPageDoc, id: string): CmsPageDoc {
  const ref = findNode(doc, id);
  if (!ref) return doc;
  if (ref.kind === 'section') return { ...doc, sections: doc.sections.filter((s) => s.id !== id) };
  if (ref.kind === 'widget') {
    return mapColumn(doc, ref.column.id, (c) => ({ ...c, widgets: c.widgets.filter((w) => w.id !== id) }));
  }
  // A column is removed by changing the section layout; refuse the last column.
  if (ref.section.columns.length <= 1) return doc;
  const layout = ref.section.columns.filter((c) => c.id !== id).map((c) => c.span);
  return mapSections(doc, (s) =>
    s.id === ref.section.id ? { ...s, columns: s.columns.filter((c) => c.id !== id).map((c, i) => ({ ...c, span: layout[i] })) } : s
  );
}

export function duplicateNode(doc: CmsPageDoc, id: string): { doc: CmsPageDoc; newId: string | null } {
  const ref = findNode(doc, id);
  if (!ref) return { doc, newId: null };
  if (ref.kind === 'section') {
    const copy = reId(ref.section);
    return { doc: insertSection(doc, copy, ref.sectionIndex + 1), newId: copy.id };
  }
  if (ref.kind === 'widget') {
    const copy = reId(ref.widget);
    return { doc: insertWidget(doc, ref.column.id, copy, ref.widgetIndex + 1), newId: copy.id };
  }
  return { doc, newId: null };
}

/** Move a section or widget one step up/down (widgets stay inside their column). */
export function nudgeNode(doc: CmsPageDoc, id: string, dir: -1 | 1): CmsPageDoc {
  const ref = findNode(doc, id);
  if (!ref) return doc;
  if (ref.kind === 'section') return moveSection(doc, id, ref.sectionIndex + dir);
  if (ref.kind === 'widget') {
    const to = ref.widgetIndex + dir;
    if (to < 0 || to >= ref.column.widgets.length) return doc;
    return mapColumn(doc, ref.column.id, (c) => {
      const widgets = c.widgets.slice();
      [widgets[ref.widgetIndex], widgets[to]] = [widgets[to], widgets[ref.widgetIndex]];
      return { ...c, widgets };
    });
  }
  return doc;
}

// ---------------------------------------------------------------- analysis

/** Every Localized value in the doc (title, seo, widget texts), with a readable path. */
export function collectLocalized(doc: CmsPageDoc): { path: string; value: Localized }[] {
  const out: { path: string; value: Localized }[] = [];
  const isLoc = (v: unknown): v is Localized =>
    !!v && typeof v === 'object' && !Array.isArray(v) && 'en' in (v as object) && 'ms' in (v as object) && Object.keys(v as object).length === 2;
  const walk = (v: unknown, path: string) => {
    if (isLoc(v)) {
      out.push({ path, value: v });
      return;
    }
    if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}.${i}`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  };
  walk({ title: doc.title, seo: doc.seo, sections: doc.sections }, '');
  return out;
}

const plain = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

/** Fields filled in English but empty in Malay — the "needs translation" counter. */
export function missingTranslations(doc: CmsPageDoc, lang: CmsLang = 'ms'): string[] {
  const other: CmsLang = lang === 'ms' ? 'en' : 'ms';
  return collectLocalized(doc)
    .filter(({ value }) => plain(value[other]) !== '' && plain(value[lang]) === '')
    .map(({ path }) => path);
}

export function usedMediaIds(doc: CmsPageDoc): number[] {
  const ids = new Set<number>();
  if (doc.seo.ogImage) ids.add(doc.seo.ogImage);
  for (const s of doc.sections) {
    if (s.settings.bgImage) ids.add(s.settings.bgImage);
    for (const c of s.columns)
      for (const w of c.widgets) {
        if (w.type === 'image' && w.settings.media) ids.add(w.settings.media);
        if (w.type === 'gallery') w.settings.media.forEach((m) => ids.add(m));
      }
  }
  return [...ids];
}

export function usedFormIds(doc: CmsPageDoc): number[] {
  const ids = new Set<number>();
  for (const s of doc.sections)
    for (const c of s.columns) for (const w of c.widgets) if (w.type === 'form' && w.settings.formId) ids.add(w.settings.formId);
  return [...ids];
}
