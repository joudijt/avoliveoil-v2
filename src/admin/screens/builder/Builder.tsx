import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  LuArrowLeft,
  LuCloud,
  LuCloudOff,
  LuEye,
  LuHistory,
  LuLaptop,
  LuLoaderCircle,
  LuMonitor,
  LuRedo2,
  LuRocket,
  LuSettings2,
  LuSmartphone,
  LuTablet,
  LuUndo2,
} from 'react-icons/lu';
import type { CanvasToShell, CmsLang, CmsPageDoc, DragPayload, DropTarget, MediaRef, PublicForm, ShellToCanvas, WidgetType } from '../../../cms/contracts';
import {
  createSection,
  createWidget,
  duplicateNode,
  findNode,
  insertSection,
  insertWidget,
  missingTranslations,
  moveSection,
  moveWidget,
  nudgeNode,
  removeNode,
} from '../../../cms/doc';
import { setLocalizedAtPath } from '../../../cms/canvas/docText';
import { sanitizeRichText } from '../../../cms/sanitize';
import { api, ApiError, toMediaRef, type MediaItem, type PageMeta, type PagePayload } from '../../api';
import { sectionFromTemplateId } from '../../content/templates';
import { confirmChoice, confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtAgo } from '../../lib/format';
import { useLoad, useMediaQuery } from '../../lib/hooks';
import { useUnsavedGuard } from '../../lib/navGuard';
import { renderLangs } from '../../lib/render';
import { Modal } from '../../ui/Modal';
import { Button, ErrorBlock, IconButton, Kbd, LoadingBlock, Segmented } from '../../ui/ui';
import { StatusChip } from '../pages/PagesScreen';
import { BuilderContext, type BuilderCtx } from './context';
import { PageSettingsDialog, PublishDialog, VersionsDialog, type SettingsResult } from './dialogs';
import { LeftPanel, type LeftTab } from './LeftPanel';
import { useHistory } from './useHistory';
import { WIDGET_META } from './widgetMeta';

type Device = 'desktop' | 'tablet' | 'mobile';
const DEVICE_W: Record<Device, number> = { desktop: 1280, tablet: 820, mobile: 390 };
const AUTOSAVE_MS = 5000;

export default function Builder() {
  const { id } = useParams();
  const pageId = Number(id);
  const load = useLoad(() => api.page(pageId), [pageId]);
  const wide = useMediaQuery('(min-width: 1024px)');
  if (!wide) return <PhoneNote slug={load.data?.page.slug} />;
  if (load.error)
    return (
      <div className="mx-auto max-w-lg p-8">
        <ErrorBlock message={load.error} onRetry={() => void load.reload()} />
        <Link to="/pages" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-olive hover:underline">
          <LuArrowLeft /> Back to pages
        </Link>
      </div>
    );
  if (!load.data) return <LoadingBlock label="Opening the page…" />;
  return <BuilderInner key={pageId} payload={load.data} />;
}

function PhoneNote({ slug }: { slug?: string }) {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl text-olive">
        <LuLaptop />
      </div>
      <h1 className="mt-5 font-display text-2xl text-olive-dark">Open the builder on a computer</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        Building a page needs a bigger screen (a laptop or a tablet held sideways). On your phone you can still read form entries, check your pages and preview them.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button icon={<LuArrowLeft />} onClick={() => nav('/pages')}>
          Back to pages
        </Button>
        {slug && (
          <Button variant="primary" icon={<LuEye />} onClick={() => window.open(`/en/${slug}?cms-preview=1`, '_blank', 'noopener')}>
            Preview page
          </Button>
        )}
      </div>
    </div>
  );
}

function BuilderInner({ payload }: { payload: PagePayload }) {
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const pageId = payload.page.id;
  const hist = useHistory(payload.draft);
  const { doc, commit, undo, redo } = hist;
  const docRef = useRef(doc);
  docRef.current = doc;

  const [page, setPage] = useState<PageMeta>(payload.page);
  const [saved, setSaved] = useState<CmsPageDoc>(payload.draft);
  const savedRef = useRef(saved);
  savedRef.current = saved;
  const version = useRef(payload.page.version);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'error'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(payload.page.updatedAt);
  const [conflict, setConflict] = useState(false);
  const dirty = doc !== saved;

  const [lang, setLang] = useState<CmsLang>('en');
  const [device, setDevice] = useState<Device>('desktop');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(true);
  const [leftTab, setLeftTab] = useState<LeftTab>('widgets');
  const [pendingColumn, setPendingColumn] = useState<string | null>(null);
  const [media, setMedia] = useState<Record<string, MediaRef>>(payload.media);
  const [forms, setForms] = useState<Record<string, PublicForm>>(payload.forms);
  const [dialog, setDialog] = useState<'publish' | 'versions' | 'settings' | null>(params.get('panel') === 'settings' ? 'settings' : null);

  const formList = useLoad(() => api.forms(), []);
  const catalogue = useLoad(() => api.catalogue(), []);
  const pages = useLoad(() => api.pages(), []);

  useEffect(() => {
    if (params.get('panel')) setParams({}, { replace: true });
    // strip ?panel=settings once, so a reload doesn't reopen it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id) {
      setShowSettings(true);
      setPendingColumn(null);
    }
  }, []);

  // ---------------------------------------------------------------- saving

  const savingRef = useRef<Promise<boolean> | null>(null);
  const save = useCallback(async (): Promise<boolean> => {
    if (savingRef.current) {
      await savingRef.current;
    }
    const target = docRef.current;
    if (target === savedRef.current) return true;
    const run = (async () => {
      setSaveState('saving');
      try {
        const r = await api.saveDraft(pageId, target, version.current);
        version.current = r.version;
        savedRef.current = target;
        setSaved(target);
        setLastSavedAt(r.updatedAt ?? new Date().toISOString());
        setPage((p) => ({ ...p, hasUnpublished: p.status === 'published' ? true : p.hasUnpublished, needsTranslation: missingTranslations(target, 'ms').length }));
        setSaveState('idle');
        return true;
      } catch (e) {
        if (e instanceof ApiError && e.status === 409 && e.code !== 'stale_panel') setConflict(true);
        else if (!(e instanceof ApiError && e.code === 'stale_panel')) toastError(e, 'The draft could not be saved.');
        setSaveState('error');
        return false;
      }
    })();
    savingRef.current = run;
    try {
      return await run;
    } finally {
      savingRef.current = null;
    }
  }, [pageId]);

  // Autosave 5 s after the first unsaved change (not after the LAST keystroke, so continuous
  // typing is still saved regularly).
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!dirty || conflict || timer.current) return;
    timer.current = setTimeout(() => {
      timer.current = null;
      void save();
    }, AUTOSAVE_MS);
  }, [dirty, conflict, doc, saved, save]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  useUnsavedGuard(() => docRef.current !== savedRef.current);

  const resolveConflict = async (keepMine: boolean) => {
    setConflict(false);
    if (!keepMine) {
      window.location.reload();
      return;
    }
    try {
      const fresh = await api.page(pageId);
      version.current = fresh.page.version;
      await save();
      toast.ok('Your version was saved.');
    } catch (e) {
      toastError(e);
    }
  };

  // ---------------------------------------------------------------- doc operations

  const ctxTemplate = useMemo(() => ({ productIds: (catalogue.data ?? []).map((c) => c.id) }), [catalogue.data]);

  const deleteNode = useCallback(
    async (id: string) => {
      const ref = findNode(docRef.current, id);
      if (!ref) return;
      if (ref.kind === 'section') {
        const n = ref.section.columns.reduce((a, c) => a + c.widgets.length, 0);
        const ok = await confirmDialog({
          title: 'Delete this section?',
          message: n ? `The section and the ${n} item${n === 1 ? '' : 's'} in it are removed. You can undo with Ctrl+Z.` : 'You can undo with Ctrl+Z.',
          confirmLabel: 'Delete section',
          danger: true,
        });
        if (!ok) return;
      }
      if (ref.kind === 'column') return;
      commit(removeNode(docRef.current, id));
      setSelectedId(null);
      if (ref.kind === 'widget') toast.info(`${WIDGET_META[ref.widget.type].name} removed. Press Ctrl+Z to undo.`);
    },
    [commit]
  );

  const duplicate = useCallback(
    (id: string) => {
      const r = duplicateNode(docRef.current, id);
      if (!r.newId) return;
      commit(r.doc);
      select(r.newId);
    },
    [commit, select]
  );

  const addWidget = useCallback(
    (t: WidgetType) => {
      const w = createWidget(t);
      const d = docRef.current;
      if (pendingColumn && findNode(d, pendingColumn)) {
        commit(insertWidget(d, pendingColumn, w));
      } else {
        const ref = selectedId ? findNode(d, selectedId) : null;
        if (ref?.kind === 'widget') commit(insertWidget(d, ref.column.id, w, ref.widgetIndex + 1));
        else if (ref?.kind === 'column') commit(insertWidget(d, ref.column.id, w));
        else if (ref?.kind === 'section') commit(insertWidget(d, ref.section.columns[0].id, w));
        else {
          const s = createSection([12]);
          commit(insertSection(d, { ...s, columns: [{ ...s.columns[0], widgets: [w] }] }));
        }
      }
      select(w.id);
    },
    [commit, pendingColumn, selectedId, select]
  );

  const addSection = useCallback(
    (templateId: string) => {
      const s = sectionFromTemplateId(templateId, ctxTemplate);
      if (!s) return;
      const d = docRef.current;
      const ref = selectedId ? findNode(d, selectedId) : null;
      commit(insertSection(d, s, ref ? ref.sectionIndex + 1 : d.sections.length));
      select(s.id);
    },
    [commit, ctxTemplate, selectedId, select]
  );

  const handleDrop = useCallback(
    (payload: DragPayload, target: DropTarget) => {
      const d = docRef.current;
      if (payload.kind === 'new-widget') {
        const w = createWidget(payload.widgetType);
        if ('columnId' in target) commit(insertWidget(d, target.columnId, w, target.index));
        else {
          const s = createSection([12]);
          commit(insertSection(d, { ...s, columns: [{ ...s.columns[0], widgets: [w] }] }, target.sectionIndex));
        }
        select(w.id);
        return;
      }
      if (payload.kind === 'new-section') {
        const s = sectionFromTemplateId(payload.templateId, ctxTemplate);
        if (!s) return;
        const at = 'sectionIndex' in target ? target.sectionIndex : (findNode(d, target.columnId)?.sectionIndex ?? d.sections.length - 1) + 1;
        commit(insertSection(d, s, at));
        select(s.id);
        return;
      }
      const ref = findNode(d, payload.id);
      if (!ref) return;
      if (ref.kind === 'widget') {
        if ('columnId' in target) commit(moveWidget(d, payload.id, target.columnId, target.index));
        else {
          const s = createSection([12]);
          commit(insertSection(removeNode(d, payload.id), { ...s, columns: [{ ...s.columns[0], widgets: [ref.widget] }] }, target.sectionIndex));
        }
        select(payload.id);
      } else if (ref.kind === 'section') {
        // the canvas sends the FINAL index (moveSection semantics)
        const to = 'sectionIndex' in target ? target.sectionIndex : (findNode(d, target.columnId)?.sectionIndex ?? d.sections.length - 1);
        commit(moveSection(d, payload.id, to));
        select(payload.id);
      }
    },
    [commit, ctxTemplate, select]
  );

  const inlineText = useCallback(
    (widgetId: string, field: string, l: CmsLang, raw: string) => {
      // field is a dotted path into the widget settings, e.g. "text", "label", "items.1.a"
      const value = field === 'html' ? sanitizeRichText(raw) : raw;
      commit((d) => setLocalizedAtPath(d, widgetId, field, l, value), `${widgetId}.${field}.${l}`);
    },
    [commit]
  );

  const canvasAction = useCallback(
    (id: string, action: Extract<CanvasToShell, { type: 'cms:action' }>['action']) => {
      const d = docRef.current;
      // an empty page asks for its first section with id ''
      if (!id && action === 'add-section-after') {
        const s = createSection([12]);
        commit(insertSection(d, s, 0));
        select(s.id);
        return;
      }
      const ref = findNode(d, id);
      if (!ref) return;
      switch (action) {
        case 'duplicate':
          duplicate(id);
          break;
        case 'delete':
          void deleteNode(id);
          break;
        case 'up':
        case 'down':
          commit(nudgeNode(d, id, action === 'up' ? -1 : 1));
          break;
        case 'add-section-after': {
          const s = createSection([12]);
          commit(insertSection(d, s, ref.sectionIndex + 1));
          select(s.id);
          break;
        }
        case 'add-widget': {
          const col = ref.kind === 'section' ? ref.section.columns[0].id : ref.kind === 'column' ? ref.column.id : ref.column.id;
          setSelectedId(null);
          setPendingColumn(col);
          setLeftTab('widgets');
          break;
        }
      }
    },
    [commit, deleteNode, duplicate, select]
  );

  // ---------------------------------------------------------------- canvas iframe

  const iframe = useRef<HTMLIFrameElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasSlow, setCanvasSlow] = useState(false);
  const post = useCallback((m: ShellToCanvas) => iframe.current?.contentWindow?.postMessage(m, window.location.origin), []);
  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;

  useEffect(() => {
    setCanvasReady(false);
    setCanvasSlow(false);
    const t = setTimeout(() => setCanvasSlow(true), 8000);
    return () => clearTimeout(t);
  }, [lang]);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || !iframe.current || e.source !== iframe.current.contentWindow) return;
      const m = e.data as CanvasToShell;
      if (!m || typeof m !== 'object' || typeof m.type !== 'string') return;
      switch (m.type) {
        case 'cms:ready':
          setCanvasReady(true);
          break;
        case 'cms:select':
          if (m.id) select(m.id);
          else setSelectedId(null);
          break;
        case 'cms:inline-text':
          inlineText(m.widgetId, m.field, m.lang, m.value);
          break;
        case 'cms:drop':
          handleDrop(m.payload, m.target);
          break;
        case 'cms:action':
          canvasAction(m.id, m.action);
          break;
        case 'cms:height':
          break;
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [select, inlineText, handleDrop, canvasAction]);

  useEffect(() => {
    if (!canvasReady) return;
    const t = setTimeout(() => post({ type: 'cms:doc', doc, lang, media, forms, selectedId: selectedRef.current }), 50);
    return () => clearTimeout(t);
  }, [doc, lang, media, forms, canvasReady, post]);

  useEffect(() => {
    if (canvasReady) post({ type: 'cms:select', id: selectedId });
  }, [selectedId, canvasReady, post]);

  // ---------------------------------------------------------------- keyboard

  const keyHandler = useRef<(e: KeyboardEvent) => void>(() => {});
  keyHandler.current = (e: KeyboardEvent) => {
    if (document.querySelector('[role="dialog"]')) return;
    const t = e.target as HTMLElement | null;
    const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    const mod = e.ctrlKey || e.metaKey;
    const k = e.key.toLowerCase();
    if (mod && k === 's') {
      e.preventDefault();
      void save().then((ok) => ok && toast.ok('Draft saved.'));
      return;
    }
    if (typing) return;
    if (mod && k === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if (mod && (k === 'y' || (k === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    } else if (mod && k === 'd' && selectedId) {
      e.preventDefault();
      duplicate(selectedId);
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
      e.preventDefault();
      void deleteNode(selectedId);
    } else if (e.key === 'Escape') {
      if (selectedId) setSelectedId(null);
      setPendingColumn(null);
    }
  };
  useEffect(() => {
    const h = (e: KeyboardEvent) => keyHandler.current(e);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  // Keys pressed while the canvas has focus happen in the iframe's own window.
  const attachIframeKeys = () => {
    try {
      iframe.current?.contentWindow?.addEventListener('keydown', (e) => keyHandler.current(e));
    } catch {
      /* cross-origin never happens here (same-origin canvas), but never crash the builder */
    }
  };

  // ---------------------------------------------------------------- stage sizing

  const stage = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 1000, h: 700 });
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStageSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const devW = DEVICE_W[device];
  const scale = Math.min(1, (stageSize.w - 48) / devW);
  const frameH = (stageSize.h - 40) / scale;

  // ---------------------------------------------------------------- actions

  const preview = async () => {
    const w = window.open('about:blank', '_blank');
    const ok = await save();
    if (!ok) {
      w?.close();
      return;
    }
    const url = `/${lang}/${page.slug}?cms-preview=1`;
    if (w) w.location.href = url;
    else window.open(url, '_blank');
  };

  const publish = async (langs: CmsLang[]) => {
    const ok = await save();
    if (!ok) throw new Error('The draft could not be saved, so nothing was published. Please try again.');
    const text = await api.publishedText();
    let html: Partial<Record<CmsLang, string>>;
    try {
      html = renderLangs(docRef.current, langs, media, forms, text, pageId);
    } catch (e) {
      throw new Error(`The page could not be prepared for the website (${e instanceof Error ? e.message : 'unknown problem'}). Nothing was changed on the website.`);
    }
    const r = await api.publish(pageId, docRef.current, html, langs);
    if (r.version) version.current = r.version;
    // the server re-checks readiness; anything it held back must not look like it went live
    savedRef.current = docRef.current;
    setSaved(docRef.current);
    const live = r.langs ?? langs;
    setPage((p) => ({ ...p, status: 'published', langs: live, publishedAt: r.publishedAt, hasUnpublished: false }));
    const name = (l: CmsLang) => (l === 'en' ? 'English' : 'Bahasa Melayu');
    toast.ok(live.length === 2 ? 'Published in English and Bahasa Melayu.' : `Published in ${name(live[0])}.`);
    for (const [l, why] of Object.entries(r.skipped ?? {}) as [CmsLang, string][]) toast.error(`${name(l)} was not published: ${why}`, 9000);
    void pages.reload(true);
  };

  const unpublish = async () => {
    await api.unpublish(pageId);
    setPage((p) => ({ ...p, status: 'draft', langs: [], hasUnpublished: false }));
    toast.ok('The page is no longer on the website. It is kept here as a draft.');
  };

  const restoreRevision = async (rid: number) => {
    if (dirty) await save();
    const r = await api.restoreRevision(pageId, rid);
    const fresh = await api.page(pageId);
    setMedia(fresh.media);
    setForms(fresh.forms);
    version.current = r.version ?? fresh.page.version;
    const restored = r.doc ?? fresh.draft;
    commit(restored);
    savedRef.current = restored;
    setSaved(restored);
    setPage(fresh.page);
    setSelectedId(null);
    toast.ok('Version restored as your draft. Publish to put it live.');
  };

  const saveSettings = async ({ doc: d, patch }: SettingsResult) => {
    const { menuLabel: _old, ...rest } = docRef.current;
    const next: CmsPageDoc = {
      ...rest,
      ...(d.menuLabel ? { menuLabel: d.menuLabel } : {}),
      title: d.title,
      seo: { ...rest.seo, metaTitle: d.metaTitle, metaDescription: d.metaDescription, ogImage: d.ogImage },
    };
    commit(next);
    // The server checks the menu link text against the saved draft, so save it before the menu switch.
    docRef.current = next;
    if (Object.keys(patch).length) {
      if (!(await save())) throw new Error('The settings could not be saved. Try again.');
      const r = await api.patchPage(pageId, patch);
      setPage((p) => ({ ...p, ...r }));
      void pages.reload(true);
    }
    toast.ok(page.status === 'published' && (patch.slug || patch.inHeader !== undefined || patch.inFooter !== undefined) ? 'Settings saved. Address and menu changes are live now.' : 'Settings saved.');
  };

  const goBack = async () => {
    if (docRef.current !== savedRef.current) {
      const ok = await save();
      if (!ok) {
        const leave = await confirmChoice({ title: 'Your changes could not be saved', message: 'Leave anyway and lose them?', confirmLabel: 'Leave', danger: true });
        if (leave !== true) return;
        savedRef.current = docRef.current;
      }
    }
    nav('/pages');
  };

  const registerMedia = useCallback((items: MediaItem[]) => setMedia((m) => ({ ...m, ...Object.fromEntries(items.map((i) => [String(i.id), toMediaRef(i)])) })), []);
  const registerForm = useCallback((f: PublicForm) => setForms((m) => ({ ...m, [String(f.id)]: f })), []);

  const ctx: BuilderCtx = {
    doc,
    lang,
    pageId,
    slug: page.slug,
    commit,
    media,
    registerMedia,
    forms,
    registerForm,
    formList: formList.data,
    reloadForms: () => void formList.reload(true),
    catalogue: catalogue.data,
    pages: pages.data,
    select,
  };

  const toTranslate = missingTranslations(doc, 'ms').length;
  const insertTarget = selectedId && !showSettings ? findNode(doc, selectedId) : null;

  return (
    <BuilderContext.Provider value={ctx}>
      <div className="flex h-screen flex-col overflow-hidden bg-[#e8e4d9]">
        {/* ------------------------------------------------ top bar */}
        <header className="z-20 flex h-14 shrink-0 items-center gap-2 border-b border-line bg-cream px-2 shadow-[0_1px_0_rgb(0_0_0/0.02)]">
          <IconButton label="Back to pages" onClick={() => void goBack()}>
            <LuArrowLeft />
          </IconButton>
          <div className="mr-2 min-w-0 max-w-[260px]">
            <div className="truncate text-sm font-semibold leading-tight text-ink" title={doc.title.en}>
              {doc.title[lang] || doc.title.en || 'Untitled page'}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <StatusChip p={page} />
            </div>
          </div>
          <div className="mx-auto flex items-center gap-2">
            <Segmented
              size="sm"
              value={lang}
              onChange={setLang}
              ariaLabel="Language you are editing"
              options={[
                { value: 'en', label: 'EN', title: 'Edit English' },
                {
                  value: 'ms',
                  title: toTranslate ? `${toTranslate} fields need translation` : 'Edit Bahasa Melayu',
                  label: (
                    <>
                      BM
                      {toTranslate > 0 && <span className="rounded-full bg-warn px-1.5 text-[10px] font-semibold leading-4 text-white">{toTranslate}</span>}
                    </>
                  ),
                },
              ]}
            />
            <Segmented
              size="sm"
              value={device}
              onChange={setDevice}
              ariaLabel="Preview size"
              options={[
                { value: 'desktop', label: <LuMonitor />, title: 'Computer (1280 px)' },
                { value: 'tablet', label: <LuTablet />, title: 'Tablet (820 px)' },
                { value: 'mobile', label: <LuSmartphone />, title: 'Phone (390 px)' },
              ]}
            />
          </div>
          <div className="flex items-center gap-0.5">
            <IconButton label="Undo (Ctrl+Z)" onClick={undo} disabled={!hist.canUndo}>
              <LuUndo2 />
            </IconButton>
            <IconButton label="Redo (Ctrl+Shift+Z)" onClick={redo} disabled={!hist.canRedo}>
              <LuRedo2 />
            </IconButton>
          </div>
          <SaveIndicator state={saveState} dirty={dirty} at={lastSavedAt} />
          <div className="flex items-center gap-1.5">
            <IconButton label="Versions" onClick={() => setDialog('versions')}>
              <LuHistory />
            </IconButton>
            <IconButton label="Page settings (address, Google, menu)" onClick={() => setDialog('settings')}>
              <LuSettings2 />
            </IconButton>
            <Button size="sm" variant="ghost" icon={<LuEye />} onClick={() => void preview()} className="hidden xl:inline-flex">
              Preview
            </Button>
            <IconButton label="Preview" onClick={() => void preview()} className="xl:hidden">
              <LuEye />
            </IconButton>
            <Button size="sm" onClick={() => void save().then((ok) => ok && toast.ok('Draft saved.'))} disabled={!dirty || saveState === 'saving'}>
              Save draft
            </Button>
            <Button size="sm" variant="primary" icon={<LuRocket />} onClick={() => setDialog('publish')}>
              Publish
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ------------------------------------------------ left panel */}
          <aside className="flex w-[320px] shrink-0 flex-col border-r border-line bg-cream">
            {insertTarget && insertTarget.kind !== 'column' && (
              <div className="flex items-center gap-2 border-b border-line bg-gold/10 px-3 py-2 text-[12px] text-[#7a5a14]">
                <span className="flex-1 truncate">
                  New items go below the selected {insertTarget.kind === 'widget' ? WIDGET_META[insertTarget.widget.type].name.toLowerCase() : 'section'}.
                </span>
                <button type="button" className="font-medium underline" onClick={() => setSelectedId(null)}>
                  Clear
                </button>
              </div>
            )}
            <div className="min-h-0 flex-1">
              <LeftPanel
                tab={leftTab}
                setTab={setLeftTab}
                selectedId={showSettings ? selectedId : null}
                onBack={() => setShowSettings(false)}
                onAddWidget={addWidget}
                onAddSection={addSection}
                onDragStart={(p) => post({ type: 'cms:drag-start', payload: p })}
                onDragEnd={() => post({ type: 'cms:drag-end' })}
                onDuplicate={duplicate}
                onDelete={(id) => void deleteNode(id)}
                pendingColumn={pendingColumn}
                cancelPending={() => setPendingColumn(null)}
              />
            </div>
            <div className="flex items-center gap-3 border-t border-line px-3 py-2 text-[11px] text-faint">
              <span>
                <Kbd>Ctrl</Kbd>+<Kbd>Z</Kbd> undo
              </span>
              <span>
                <Kbd>Del</Kbd> remove
              </span>
              <span>
                <Kbd>Esc</Kbd> deselect
              </span>
            </div>
          </aside>

          {/* ------------------------------------------------ canvas */}
          <div ref={stage} className="relative min-w-0 flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && setSelectedId(null)}>
            <div className="absolute left-1/2 top-5 -translate-x-1/2" style={{ width: devW * scale, height: stageSize.h - 40 }}>
              <iframe
                key={lang}
                ref={iframe}
                title="Page canvas"
                src={`/cms-canvas?lang=${lang}`}
                onLoad={attachIframeKeys}
                className="origin-top-left rounded-lg bg-white shadow-[0_8px_30px_-6px_rgb(38_48_30/0.25)]"
                style={{ width: devW, height: frameH, transform: `scale(${scale})`, border: 0 }}
              />
              {!canvasReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-white/90 text-sm text-muted">
                  {canvasSlow ? (
                    <>
                      <p className="max-w-xs text-center">The page preview is taking long to load. Check your connection, then reload.</p>
                      <Button size="sm" onClick={() => iframe.current?.contentWindow?.location.reload()}>
                        Reload preview
                      </Button>
                    </>
                  ) : (
                    <>
                      <LuLoaderCircle className="animate-spin text-xl text-olive" />
                      Loading the page…
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PublishDialog
        open={dialog === 'publish'}
        onClose={() => setDialog(null)}
        doc={doc}
        page={page}
        onPublish={publish}
        onUnpublish={unpublish}
        onOpenSettings={() => setDialog('settings')}
      />
      <VersionsDialog open={dialog === 'versions'} onClose={() => setDialog(null)} pageId={pageId} onRestore={restoreRevision} />
      <PageSettingsDialog open={dialog === 'settings'} onClose={() => setDialog(null)} page={page} onSave={saveSettings} />
      <Modal
        open={conflict}
        onClose={() => {}}
        dismissable={false}
        title="This page was changed in another tab"
        size="sm"
        footer={
          <>
            <Button onClick={() => void resolveConflict(false)}>Reload the page</Button>
            <Button variant="primary" onClick={() => void resolveConflict(true)}>
              Keep my version
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-muted">
          Someone (maybe you, in another browser tab) saved this page after you opened it. <strong className="text-ink">Reload</strong> to see their version (your latest changes here are lost), or{' '}
          <strong className="text-ink">keep my version</strong> to save yours over theirs.
        </p>
      </Modal>
    </BuilderContext.Provider>
  );
}

function SaveIndicator({ state, dirty, at }: { state: 'idle' | 'saving' | 'error'; dirty: boolean; at: string | null }) {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);
  let icon = <LuCloud />;
  let text = 'Saved';
  let tone = 'text-muted';
  if (state === 'saving') {
    icon = <LuLoaderCircle className="animate-spin" />;
    text = 'Saving…';
  } else if (state === 'error') {
    icon = <LuCloudOff />;
    text = 'Not saved';
    tone = 'text-danger';
  } else if (dirty) {
    icon = <LuCloud />;
    text = 'Unsaved changes';
    tone = 'text-warn';
  }
  return (
    <div className={cx('mx-1 hidden min-w-[118px] items-center gap-1.5 text-[12px] lg:flex', tone)} role="status" title={at && !dirty ? `Saved ${fmtAgo(at)}` : undefined}>
      {icon}
      {text}
    </div>
  );
}
