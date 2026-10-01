/**
 * `/cms-canvas?lang=en` — the page builder's canvas, loaded by the admin in an
 * iframe sized to a device width (1280 / 820 / 390). It renders the draft doc
 * with the SAME block components as the public page, so what the owner edits is
 * what visitors get; the editing layer (Chrome) sits on top. All state lives in
 * the admin shell: the canvas only reports intent (select, drop, action, in-place
 * text) and re-renders whatever doc the shell sends back (spec §8, contracts
 * ShellToCanvas / CanvasToShell).
 */
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import i18n from '../../i18n';
import type { CmsLang, CmsPageDoc, DragPayload, MediaRef, PublicForm } from '../contracts';
import { CMS_LANGS } from '../contracts';
import { CmsBlocks } from '../blocks/CmsBlocks';
import { PAGE_CHROME } from '../blocks/classes';
import { CANVAS_CSS } from './canvasCss';
import { Chrome } from './Chrome';
import type { DropHit } from './dnd';
import { setLocalizedAtPath } from './docText';
import { postToShell, shellMessage } from './protocol';

interface CanvasData {
  doc: CmsPageDoc;
  lang: CmsLang;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
}

function initialLang(): CmsLang {
  const q = new URLSearchParams(window.location.search).get('lang');
  return (CMS_LANGS as readonly string[]).includes(q ?? '') ? (q as CmsLang) : 'en';
}

const CanvasDoc = memo(function CanvasDoc({ data, renderKeys }: { data: CanvasData; renderKeys: Record<string, number> }) {
  return (
    <main className={PAGE_CHROME.main}>
      <CmsBlocks doc={data.doc} lang={data.lang} media={data.media} forms={data.forms} mode="canvas" renderKeys={renderKeys} />
      {data.doc.sections.length === 0 ? <div data-cms-empty-doc="">Add your first section — or drag one here from the panel</div> : null}
    </main>
  );
});

export default function CanvasPage() {
  const [data, setData] = useState<CanvasData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [renderKeys, setRenderKeys] = useState<Record<string, number>>({});
  const [dragEndTick, setDragEndTick] = useState(0);
  const shellDrag = useRef<DragPayload | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<CanvasData | null>(null);
  dataRef.current = data;

  // Canvas-only stylesheet + marker; removed again if the route ever unmounts.
  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-cms-canvas-css', '');
    style.textContent = CANVAS_CSS;
    document.head.appendChild(style);
    document.documentElement.setAttribute('data-cms-canvas', '');
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const lang = initialLang();
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
    return () => {
      style.remove();
      meta.remove();
      document.documentElement.removeAttribute('data-cms-canvas');
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const msg = shellMessage(e);
      if (!msg) return;
      switch (msg.type) {
        case 'cms:doc': {
          if (!msg.doc || msg.doc.schema !== 1) return;
          const lang: CmsLang = (CMS_LANGS as readonly string[]).includes(msg.lang) ? msg.lang : 'en';
          if (i18n.language !== lang) void i18n.changeLanguage(lang);
          setData({ doc: msg.doc, lang, media: msg.media ?? {}, forms: msg.forms ?? {} });
          setSelectedId(msg.selectedId ?? null);
          break;
        }
        case 'cms:select':
          setSelectedId(msg.id ?? null);
          break;
        case 'cms:drag-start':
          shellDrag.current = msg.payload ?? null;
          break;
        case 'cms:drag-end':
          shellDrag.current = null;
          setDragEndTick((t) => t + 1);
          break;
      }
    };
    window.addEventListener('message', onMessage);
    postToShell({ type: 'cms:ready' });
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // The shell sizes the iframe to the content, so report the content's own height
  // (not the document's, which never shrinks below the iframe it is in).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let last = -1;
    const report = () => {
      const px = Math.ceil(el.getBoundingClientRect().height);
      if (px !== last) {
        last = px;
        postToShell({ type: 'cms:height', px });
      }
    };
    const ro = new ResizeObserver(report);
    ro.observe(el);
    report();
    return () => ro.disconnect();
  }, []);

  const onSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    postToShell({ type: 'cms:select', id });
  }, []);

  const onAction = useCallback((id: string, action: 'duplicate' | 'delete' | 'up' | 'down' | 'add-section-after' | 'add-widget') => {
    postToShell({ type: 'cms:action', id, action });
  }, []);

  const onDrop = useCallback((payload: DragPayload, hit: DropHit) => {
    shellDrag.current = null;
    postToShell({ type: 'cms:drop', payload, target: hit.target });
  }, []);

  const onInlineCommit = useCallback((widgetId: string, field: string, value: string) => {
    const lang = dataRef.current?.lang;
    if (!lang) return;
    postToShell({ type: 'cms:inline-text', widgetId, field, lang, value });
    // Optimistic: show the new text at once; the shell answers with the same change in cms:doc.
    setData((d) => (d ? { ...d, doc: setLocalizedAtPath(d.doc, widgetId, field, d.lang, value) } : d));
  }, []);

  const onInlineEnd = useCallback((widgetId: string) => {
    // contentEditable touched this widget's DOM: remount it so React owns a clean tree again.
    setRenderKeys((k) => ({ ...k, [widgetId]: (k[widgetId] ?? 0) + 1 }));
  }, []);

  return (
    <div ref={rootRef} data-cms-canvas-root="">
      {data ? <CanvasDoc data={data} renderKeys={renderKeys} /> : null}
      {data ? (
        <Chrome
          doc={data.doc}
          selectedId={selectedId}
          onSelect={onSelect}
          onAction={onAction}
          onDrop={onDrop}
          onInlineCommit={onInlineCommit}
          onInlineEnd={onInlineEnd}
          shellDrag={shellDrag}
          dragEndTick={dragEndTick}
        />
      ) : null}
    </div>
  );
}
