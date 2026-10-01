/**
 * Drop-target maths for the canvas, from the pointer position and the rendered
 * nodes (data-node-kind / data-node-id hooks the blocks add in canvas mode).
 *
 * Index semantics follow src/cms/doc.ts so the shell can apply a drop directly:
 *  - widget target `{columnId, index}`: insertion position in the column as it is
 *    NOW (insertWidget / moveWidget — moveWidget itself corrects a same-column move
 *    downwards);
 *  - section target `{sectionIndex}`: the index the section will HAVE after the
 *    drop (insertSection / moveSection — for a move this is already corrected).
 */
import type { DragPayload, DropTarget } from '../contracts';

export interface DropHit {
  target: DropTarget;
  /** indicator line in page coordinates */
  line: { left: number; top: number; width: number };
  kind: 'widget' | 'section';
  /** empty column under the pointer (highlighted instead of a line) */
  emptyColumn?: HTMLElement;
}

function pageRect(el: Element) {
  const r = el.getBoundingClientRect();
  return { left: r.left + window.scrollX, top: r.top + window.scrollY, width: r.width, height: r.height, bottom: r.bottom + window.scrollY, right: r.right + window.scrollX };
}

function directChildren(parent: Element, kind: string): HTMLElement[] {
  return Array.from(parent.children).filter((c): c is HTMLElement => c instanceof HTMLElement && c.dataset.nodeKind === kind);
}

export function allSections(root: ParentNode = document): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-node-kind="section"]'));
}

/** 'widget' | 'section' — what the payload drops as. */
export function payloadKind(payload: DragPayload): 'widget' | 'section' | null {
  if (payload.kind === 'new-widget') return 'widget';
  if (payload.kind === 'new-section') return 'section';
  const el = document.querySelector<HTMLElement>(`[data-node-id="${CSS.escape(payload.id)}"]`);
  const k = el?.dataset.nodeKind;
  return k === 'widget' || k === 'section' ? k : null;
}

function sectionDrop(clientY: number, movingId: string | null): DropHit | null {
  const sections = allSections();
  const y = clientY + window.scrollY;
  let index = sections.length;
  for (let i = 0; i < sections.length; i++) {
    const r = pageRect(sections[i]);
    if (y < r.top + r.height / 2) {
      index = i;
      break;
    }
  }
  let lineTop: number;
  if (sections.length === 0) {
    const empty = document.querySelector('[data-cms-empty-doc]');
    lineTop = empty ? pageRect(empty).top : y;
  } else if (index < sections.length) lineTop = pageRect(sections[index]).top;
  else lineTop = pageRect(sections[sections.length - 1]).bottom;

  let finalIndex = index;
  if (movingId) {
    const from = sections.findIndex((s) => s.dataset.nodeId === movingId);
    if (from >= 0) {
      if (index === from || index === from + 1) return null; // dropping where it already is
      if (from < index) finalIndex = index - 1;
    }
  }
  return { kind: 'section', target: { sectionIndex: finalIndex }, line: { left: 0, top: lineTop, width: document.documentElement.clientWidth } };
}

function columnUnder(target: Element | null, clientX: number, clientY: number): HTMLElement | null {
  const direct = target?.closest<HTMLElement>('[data-node-kind="column"]');
  if (direct) return direct;
  // Pointer in a section's padding: the nearest column of that section.
  const section = target?.closest<HTMLElement>('[data-node-kind="section"]');
  if (!section) return null;
  const cols = Array.from(section.querySelectorAll<HTMLElement>('[data-node-kind="column"]'));
  let best: HTMLElement | null = null;
  let bestD = Infinity;
  for (const c of cols) {
    const r = c.getBoundingClientRect();
    const dx = clientX < r.left ? r.left - clientX : clientX > r.right ? clientX - r.right : 0;
    const dy = clientY < r.top ? r.top - clientY : clientY > r.bottom ? clientY - r.bottom : 0;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

function widgetDrop(target: Element | null, clientX: number, clientY: number, movingId: string | null): DropHit | null {
  const col = columnUnder(target, clientX, clientY);
  const columnId = col?.dataset.nodeId;
  if (!col || !columnId) return null;
  const widgets = directChildren(col, 'widget');
  const y = clientY + window.scrollY;
  let index = widgets.length;
  for (let i = 0; i < widgets.length; i++) {
    const r = pageRect(widgets[i]);
    if (y < r.top + r.height / 2) {
      index = i;
      break;
    }
  }
  if (movingId) {
    const from = widgets.findIndex((w) => w.dataset.nodeId === movingId);
    if (from >= 0 && (index === from || index === from + 1)) return null;
    // A widget dropped into itself (its own subtree) makes no sense.
    if (target?.closest(`[data-node-id="${CSS.escape(movingId)}"]`) && from < 0) return null;
  }
  const cr = pageRect(col);
  if (widgets.length === 0) {
    const empty = col.querySelector<HTMLElement>('[data-cms-empty-col]') ?? undefined;
    return { kind: 'widget', target: { columnId, index: 0 }, line: { left: cr.left, top: cr.top + 2, width: cr.width }, emptyColumn: empty };
  }
  let top: number;
  if (index === 0) top = pageRect(widgets[0]).top - 4;
  else if (index >= widgets.length) top = pageRect(widgets[widgets.length - 1]).bottom + 4;
  else {
    const a = pageRect(widgets[index - 1]);
    const b = pageRect(widgets[index]);
    top = (a.bottom + b.top) / 2;
  }
  return { kind: 'widget', target: { columnId, index }, line: { left: cr.left, top, width: cr.width } };
}

export function computeDrop(payload: DragPayload, target: Element | null, clientX: number, clientY: number): DropHit | null {
  const kind = payloadKind(payload);
  const movingId = payload.kind === 'move' ? payload.id : null;
  if (kind === 'section') return sectionDrop(clientY, movingId);
  if (kind === 'widget') return widgetDrop(target, clientX, clientY, movingId);
  return null;
}
