/**
 * The builder's editing layer over the rendered page: hover / selection outlines
 * with a type label, the mini toolbar of the selected node (placed OUTSIDE the
 * node's edge so it never covers text), "+ Add section" bars between sections,
 * the drop indicator while something is dragged, in-place text editing and the
 * rich-text toolbar. Everything here is page-coordinate absolute boxes in one
 * layer with pointer-events off except on the controls — the content markup is
 * exactly the public markup plus data-node-* hooks.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { DragEvent as ReactDragEvent, MouseEvent as ReactMouseEvent, MutableRefObject, ReactNode } from 'react';
import { FiArrowDown, FiArrowUp, FiBold, FiCopy, FiItalic, FiLink, FiList, FiMove, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { CanvasToShell, CmsPageDoc, DragPayload } from '../contracts';
import { findNode } from '../doc';
import { computeDrop, type DropHit } from './dnd';
import { beginInlineEdit, richState, runRichCommand, type InlineHandle, type RichCommand } from './inline';

type Action = Extract<CanvasToShell, { type: 'cms:action' }>['action'];

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Layout {
  hover: (Box & { kind: string; label: string }) | null;
  selected: (Box & { kind: string; label: string }) | null;
  gaps: { afterId: string; top: number }[];
  edit: Box | null;
}

const EMPTY_LAYOUT: Layout = { hover: null, selected: null, gaps: [], edit: null };

function nodeEl(id: string | null): HTMLElement | null {
  return id ? document.querySelector<HTMLElement>(`[data-node-id="${CSS.escape(id)}"]`) : null;
}

function box(el: Element): Box {
  const r = el.getBoundingClientRect();
  return { left: r.left + window.scrollX, top: r.top + window.scrollY, width: r.width, height: r.height };
}

/** The node a pointer event is "on": a widget first, else the section (columns are not hover targets). */
function hoverNode(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>('[data-node-kind="widget"]') ?? target.closest<HTMLElement>('[data-node-kind="section"]');
}

export interface ChromeProps {
  doc: CmsPageDoc;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAction: (id: string, action: Action) => void;
  onDrop: (payload: DragPayload, hit: DropHit) => void;
  onInlineCommit: (widgetId: string, field: string, value: string) => void;
  onInlineEnd: (widgetId: string) => void;
  /** payload of a drag started in the shell (cms:drag-start), null when none */
  shellDrag: MutableRefObject<DragPayload | null>;
  /** bumped by the page when the shell ends its drag */
  dragEndTick: number;
}

export function Chrome({ doc, selectedId, onSelect, onAction, onDrop, onInlineCommit, onInlineEnd, shellDrag, dragEndTick }: ChromeProps) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);
  const [drop, setDrop] = useState<DropHit | null>(null);
  const [editing, setEditing] = useState<InlineHandle | null>(null);
  const [rte, setRte] = useState<Record<RichCommand, boolean> | null>(null);
  const [tick, setTick] = useState(0);
  const innerDrag = useRef<DragPayload | null>(null);
  const editRef = useRef<InlineHandle | null>(null);
  const dropRef = useRef<DropHit | null>(null);

  const props = useRef({ onSelect, onAction, onDrop, onInlineCommit, onInlineEnd });
  props.current = { onSelect, onAction, onDrop, onInlineCommit, onInlineEnd };

  // ------------------------------------------------------------ measuring
  useLayoutEffect(() => {
    const hEl = nodeEl(hoverId);
    const sEl = nodeEl(selectedId);
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-node-kind="section"]'));
    const next: Layout = {
      hover: hEl && hoverId !== selectedId ? { ...box(hEl), kind: hEl.dataset.nodeKind ?? '', label: hEl.dataset.nodeLabel ?? '' } : null,
      selected: sEl ? { ...box(sEl), kind: sEl.dataset.nodeKind ?? '', label: sEl.dataset.nodeLabel ?? '' } : null,
      gaps: sections.map((s) => {
        const b = box(s);
        return { afterId: s.dataset.nodeId ?? '', top: b.top + b.height };
      }),
      edit: editing ? box(editing.el) : null,
    };
    setLayout((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  }, [doc, hoverId, selectedId, tick, editing]);

  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    const ro = new ResizeObserver(bump);
    ro.observe(document.body);
    window.addEventListener('resize', bump);
    window.addEventListener('scroll', bump, { passive: true });
    // Images finishing loading change heights without resizing the body element first.
    document.addEventListener('load', bump, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', bump);
      window.removeEventListener('scroll', bump);
      document.removeEventListener('load', bump, true);
    };
  }, []);

  // ------------------------------------------------------------ inline editing
  const startEdit = useCallback((fieldEl: HTMLElement) => {
    const widgetEl = fieldEl.closest<HTMLElement>('[data-node-kind="widget"]');
    const widgetId = widgetEl?.dataset.nodeId;
    const field = fieldEl.dataset.cmsField;
    if (!widgetId || !field || editRef.current) return;
    const rich = field === 'html';
    const end = () => {
      editRef.current = null;
      setEditing(null);
      setRte(null);
      props.current.onInlineEnd(widgetId);
    };
    const handle = beginInlineEdit(fieldEl, {
      rich,
      onCommit: (value) => {
        props.current.onInlineCommit(widgetId, field, value);
        end();
      },
      onCancel: end,
    });
    editRef.current = handle;
    setEditing(handle);
    if (rich) setRte(richState());
  }, []);

  useEffect(() => {
    if (!editing?.rich) return;
    const update = () => setRte(richState());
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, [editing]);

  // ------------------------------------------------------------ pointer + guards
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (innerDrag.current || shellDrag.current) return;
      const n = hoverNode(e.target);
      setHoverId(n?.dataset.nodeId ?? null);
    };
    const onLeave = () => setHoverId(null);

    // Nothing on the canvas navigates or submits: capture phase, before React and the browser.
    const onClickCapture = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element)) return;
      if (t.closest('.cmsc-layer')) return;
      if (editRef.current && editRef.current.el.contains(t)) return;
      if (t.closest('a, summary, label')) e.preventDefault();
    };
    const onSubmit = (e: Event) => e.preventDefault();

    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element) || t.closest('.cmsc-layer')) return;
      if (editRef.current && editRef.current.el.contains(t)) return;
      const emptyCol = t.closest<HTMLElement>('[data-cms-empty-col]');
      if (emptyCol?.dataset.columnId) {
        props.current.onSelect(emptyCol.dataset.columnId);
        props.current.onAction(emptyCol.dataset.columnId, 'add-widget');
        return;
      }
      if (t.closest('[data-cms-empty-doc]')) {
        props.current.onAction('', 'add-section-after');
        return;
      }
      const node =
        t.closest<HTMLElement>('[data-node-kind="widget"]') ??
        t.closest<HTMLElement>('[data-node-kind="column"]') ??
        t.closest<HTMLElement>('[data-node-kind="section"]');
      props.current.onSelect(node?.dataset.nodeId ?? null);
    };

    const onDbl = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element) || t.closest('.cmsc-layer')) return;
      const field = t.closest<HTMLElement>('[data-cms-field]');
      if (!field) return;
      e.preventDefault();
      const w = field.closest<HTMLElement>('[data-node-kind="widget"]');
      if (w?.dataset.nodeId) props.current.onSelect(w.dataset.nodeId);
      startEdit(field);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('click', onClickCapture, true);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('click', onClick);
    document.addEventListener('dblclick', onDbl);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('click', onClickCapture, true);
      document.removeEventListener('submit', onSubmit, true);
      document.removeEventListener('click', onClick);
      document.removeEventListener('dblclick', onDbl);
    };
  }, [shellDrag, startEdit]);

  // ------------------------------------------------------------ drag and drop
  const clearDrop = useCallback(() => {
    dropRef.current = null;
    setDrop(null);
    document.querySelectorAll('[data-drop-active]').forEach((el) => el.removeAttribute('data-drop-active'));
  }, []);

  useEffect(() => {
    clearDrop();
  }, [dragEndTick, clearDrop]);

  useEffect(() => {
    const payload = () => innerDrag.current ?? shellDrag.current;
    const onOver = (e: DragEvent) => {
      const p = payload();
      if (!p) return;
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = p.kind === 'move' ? 'move' : 'copy';
      const hit = computeDrop(p, e.target as Element | null, e.clientX, e.clientY);
      const prev = dropRef.current;
      if (JSON.stringify(prev?.target) === JSON.stringify(hit?.target) && prev?.line.top === hit?.line.top) return;
      document.querySelectorAll('[data-drop-active]').forEach((el) => el.removeAttribute('data-drop-active'));
      hit?.emptyColumn?.setAttribute('data-drop-active', '');
      dropRef.current = hit;
      setDrop(hit);
    };
    const onDropEv = (e: DragEvent) => {
      const p = payload();
      if (!p) return;
      e.preventDefault();
      const hit = computeDrop(p, e.target as Element | null, e.clientX, e.clientY) ?? null;
      innerDrag.current = null;
      clearDrop();
      if (hit) props.current.onDrop(p, hit);
    };
    const onLeave = (e: DragEvent) => {
      // Left the iframe document entirely.
      if (!e.relatedTarget) clearDrop();
    };
    const onEnd = () => {
      innerDrag.current = null;
      clearDrop();
    };
    document.addEventListener('dragover', onOver);
    document.addEventListener('dragenter', onOver);
    document.addEventListener('drop', onDropEv);
    document.addEventListener('dragleave', onLeave);
    document.addEventListener('dragend', onEnd);
    return () => {
      document.removeEventListener('dragover', onOver);
      document.removeEventListener('dragenter', onOver);
      document.removeEventListener('drop', onDropEv);
      document.removeEventListener('dragleave', onLeave);
      document.removeEventListener('dragend', onEnd);
    };
  }, [shellDrag, clearDrop]);

  const startInnerDrag = (id: string) => (e: ReactDragEvent<HTMLElement>) => {
    innerDrag.current = { kind: 'move', id };
    setHoverId(null);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', id);
      const el = nodeEl(id);
      if (el) e.dataTransfer.setDragImage(el, 16, 16);
    }
  };

  // ------------------------------------------------------------ render
  const sel = selectedId ? findNode(doc, selectedId) : null;
  const selBox = layout.selected;
  const editingNow = !!editing;

  let toolbar = null;
  if (sel && selBox && !editingNow && (sel.kind === 'widget' || sel.kind === 'section')) {
    const isSection = sel.kind === 'section';
    const first = isSection ? sel.sectionIndex === 0 : sel.widgetIndex === 0;
    const last = isSection ? sel.sectionIndex === doc.sections.length - 1 : sel.widgetIndex === sel.column.widgets.length - 1;
    const id = selectedId as string;
    const width = 6 * 26 + 5;
    const docW = document.documentElement.clientWidth;
    let left = isSection ? selBox.left + 12 : selBox.left + selBox.width - width;
    left = Math.max(4, Math.min(left, docW - width - 4));
    // Above the node's top edge; below its bottom edge when there is no room above.
    const top = selBox.top - 24 - 2 >= 2 ? selBox.top - 26 : selBox.top + selBox.height + 2;
    const act = (a: Action) => (e: ReactMouseEvent) => {
      e.stopPropagation();
      props.current.onAction(id, a);
    };
    toolbar = (
      <div className={`cmsc-toolbar${isSection ? ' cmsc-section' : ''}`} style={{ left, top }} role="toolbar" aria-label={isSection ? 'Section' : 'Widget'}>
        <span draggable title="Drag to move" aria-label="Drag to move" onDragStart={startInnerDrag(id)} onDragEnd={() => (innerDrag.current = null)}>
          <FiMove aria-hidden />
        </span>
        <button type="button" title="Move up" aria-label="Move up" disabled={first} onClick={act('up')}>
          <FiArrowUp aria-hidden />
        </button>
        <button type="button" title="Move down" aria-label="Move down" disabled={last} onClick={act('down')}>
          <FiArrowDown aria-hidden />
        </button>
        <button type="button" title="Duplicate" aria-label="Duplicate" onClick={act('duplicate')}>
          <FiCopy aria-hidden />
        </button>
        <button
          type="button"
          title={isSection ? 'Add section below' : 'Add widget below'}
          aria-label={isSection ? 'Add section below' : 'Add widget below'}
          onClick={act(isSection ? 'add-section-after' : 'add-widget')}
        >
          <FiPlus aria-hidden />
        </button>
        <button type="button" title="Delete" aria-label="Delete" onClick={act('delete')}>
          <FiTrash2 aria-hidden />
        </button>
      </div>
    );
  }

  const label = (b: Box & { kind: string; label: string }, cls: string) => {
    const top = b.top - 18 >= 0 ? b.top - 18 : b.top;
    return (
      <div className="cmsc-label" style={{ left: b.left, top, ...(cls === 'sel' ? {} : { opacity: 0.85 }) }}>
        {b.label}
      </div>
    );
  };

  const showHover = layout.hover && !drop && !editingNow;
  const rteBtn = (cmd: RichCommand, title: string, content: ReactNode) => (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={rte?.[cmd] ? 'true' : 'false'}
      onMouseDown={(e) => {
        e.preventDefault();
        if (editRef.current) {
          runRichCommand(editRef.current, cmd);
          setRte(richState());
        }
      }}
    >
      {content}
    </button>
  );

  return (
    <div className="cmsc-layer">
      {showHover && layout.hover ? (
        <>
          <div className={`cmsc-box cmsc-hover${layout.hover.kind === 'section' ? ' cmsc-section' : ''}`} style={layout.hover} />
          {layout.hover.kind === 'widget' ? label(layout.hover, 'hover') : null}
        </>
      ) : null}
      {selBox ? (
        <>
          <div className={`cmsc-box cmsc-selected${selBox.kind === 'section' ? ' cmsc-section' : ''}`} style={selBox} />
          {!editingNow && selBox.kind !== 'section' ? label(selBox, 'sel') : null}
        </>
      ) : null}
      {toolbar}
      {!drop && !editingNow
        ? layout.gaps.map((g) => (
            <div key={g.afterId} className="cmsc-gap" style={{ top: g.top - 9 }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  props.current.onAction(g.afterId, 'add-section-after');
                }}
              >
                <FiPlus aria-hidden /> Add section
              </button>
            </div>
          ))
        : null}
      {drop && !drop.emptyColumn ? <div className={`cmsc-drop${drop.kind === 'section' ? ' cmsc-section' : ''}`} style={drop.line} /> : null}
      {editing?.rich && layout.edit ? (
        <div className="cmsc-rte" style={{ left: layout.edit.left, top: Math.max(2, layout.edit.top - 40) }} role="toolbar" aria-label="Text formatting">
          {rteBtn('bold', 'Bold', <FiBold aria-hidden />)}
          {rteBtn('italic', 'Italic', <FiItalic aria-hidden />)}
          {rteBtn('link', 'Link', <FiLink aria-hidden />)}
          {rteBtn('list', 'Bullet list', <FiList aria-hidden />)}
          {rteBtn('h2', 'Heading 2', 'H2')}
          {rteBtn('h3', 'Heading 3', 'H3')}
        </div>
      ) : null}
    </div>
  );
}
