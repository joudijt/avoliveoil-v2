import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LuArrowLeft, LuEye, LuHistory, LuLoaderCircle, LuRocket, LuRotateCcw, LuSearch, LuUsers } from 'react-icons/lu';
import type { CmsLang, EditPageToShell, HeadlineWord, ShellToEditPage, TextValue } from '../../../cms/contracts';
import { api, type PendingOverride, type SiteKeyItem, type SiteRevision, type SiteStructure, type OverrideItem } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtAgo, fmtDateTime, plural } from '../../lib/format';
import { useLoad, useMediaQuery } from '../../lib/hooks';
import { useUnsavedGuard } from '../../lib/navGuard';
import { rerenderDirtyPages } from '../../lib/render';
import { useUser } from '../../lib/session';
import { DeviceFrame, DeviceSwitch } from '../../ui/DeviceFrame';
import type { Device } from '../../lib/device';
import { Modal } from '../../ui/Modal';
import { Button, Checkbox, Chip, ErrorBlock, IconButton, Input, LoadingBlock, Segmented, Select } from '../../ui/ui';
import { ImageSpotField, SiteField, WordsDialog } from './siteFields';
import { currentValue, defaultValue, fieldState, humanizeKey, interpolate, isImageValue, sameValue, savedValue, textProblem, tokenValues } from './siteUtil';
import type { ImageEdit } from './types';

type Edits = Record<CmsLang, Record<string, unknown>>;
const sk = (lang: CmsLang, key: string) => `${lang}|${key}`;

export default function SiteEditor() {
  const { pageKey = 'home' } = useParams();
  const structure = useLoad(() => api.siteStructure(), []);
  if (structure.error) return <ErrorBlock message={structure.error} onRetry={() => void structure.reload()} />;
  if (!structure.data) return <LoadingBlock label="Opening the page…" />;
  const def = structure.data.pages[pageKey];
  if (!def)
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <p className="text-muted">This page cannot be edited here.</p>
        <Link to="/site" className="mt-3 inline-block font-medium text-olive hover:underline">
          Back to site pages
        </Link>
      </div>
    );
  return <SiteEditorInner key={pageKey} pageKey={pageKey} structure={structure.data} />;
}

function SiteEditorInner({ pageKey, structure }: { pageKey: string; structure: SiteStructure }) {
  const def = structure.pages[pageKey];
  const me = useUser();
  const [params] = useSearchParams();
  const wide = useMediaQuery('(min-width: 1024px)');
  const [lang, setLang] = useState<CmsLang>(params.get('lang') === 'ms' ? 'ms' : 'en');
  const [device, setDevice] = useState<Device>('desktop');
  const [path, setPath] = useState(def.paths?.[0] ?? def.path);
  const [items, setItems] = useState<Record<CmsLang, SiteKeyItem[] | null>>({ en: null, ms: null });
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [edits, setEdits] = useState<Edits>({ en: {}, ms: {} });
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<string> | null>(null);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState<'save' | 'publish' | 'discard' | null>(null);
  const [dialog, setDialog] = useState<'publish' | 'versions' | null>(null);
  const [wordsKey, setWordsKey] = useState<string | null>(null);
  const [pickerKey, setPickerKey] = useState<string | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const [noEdit, setNoEdit] = useState(false);
  const [frameNonce, setFrameNonce] = useState(0);
  const pending = useLoad(() => api.sitePending(), []);
  const orphans = useLoad(() => api.siteOrphans(), []);
  const iframe = useRef<HTMLIFrameElement>(null);

  const loadLang = useCallback(
    async (l: CmsLang, force = false) => {
      if (!force && items[l]) return;
      setLoadErr(null);
      try {
        const list = await api.siteKeys(pageKey, l);
        setItems((s) => ({ ...s, [l]: list }));
      } catch (e) {
        setLoadErr(e instanceof Error ? e.message : 'Could not load the texts.');
      }
    },
    [items, pageKey]
  );
  useEffect(() => {
    void loadLang(lang);
    void loadLang(lang === 'en' ? 'ms' : 'en');
  }, [lang, loadLang]);

  // My saved-but-unpublished drafts, both languages (drafts are kept per user on the server).
  const myDrafts = useMemo(
    () => (['en', 'ms'] as CmsLang[]).flatMap((l) => (items[l] ?? []).filter((i) => i.hasDraft).map((i) => ({ lang: l, key: i.key }))),
    [items]
  );

  const byKey = useMemo(() => new Map((items[lang] ?? []).map((i) => [i.key, i])), [items, lang]);
  const hasUnsaved = Object.keys(edits.en).length + Object.keys(edits.ms).length > 0;
  const unsavedRef = useRef(hasUnsaved);
  unsavedRef.current = hasUnsaved;
  const guardedNav = useUnsavedGuard(() => unsavedRef.current);

  // ---------------------------------------------------------------- iframe protocol

  const post = useCallback((m: ShellToEditPage) => iframe.current?.contentWindow?.postMessage(m, window.location.origin), []);

  const previewText = useCallback((item: SiteKeyItem, v: unknown): TextValue => {
    if (v === null || v === undefined) return (typeof item.default === 'string' || typeof item.default === 'number' || Array.isArray(item.default) ? item.default : '') as TextValue;
    if (item.template && typeof v === 'string' && typeof item.default === 'string') return interpolate(v, tokenValues(item.template, item.default));
    return v as TextValue;
  }, []);

  const pushToFrame = useCallback(
    (item: SiteKeyItem, v: unknown) => {
      if (item.type === 'image') post({ type: 'ov:set-image', key: item.key, override: v ? (v as ImageEdit) : null });
      else post({ type: 'ov:set-text', key: item.key, value: previewText(item, v) });
    },
    [post, previewText]
  );

  const editsRef = useRef(edits);
  editsRef.current = edits;
  const byKeyRef = useRef(byKey);
  byKeyRef.current = byKey;

  const setEdit = useCallback(
    (l: CmsLang, key: string, v: unknown, fromFrame = false) => {
      const item = l === lang ? byKeyRef.current.get(key) : (items[l] ?? []).find((i) => i.key === key);
      setEdits((e) => {
        const cur = { ...e[l] };
        // Editing back to exactly the saved value is not a change.
        const saved = item ? savedValue(item) : undefined;
        if (item && v !== null && sameValue(v, saved ?? defaultValue(item))) delete cur[key];
        else if (item && v === null && saved === null) delete cur[key];
        else cur[key] = v;
        return { ...e, [l]: cur };
      });
      if (item && l === lang && !fromFrame) pushToFrame(item, v);
    },
    [items, lang, pushToFrame]
  );

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || !iframe.current || e.source !== iframe.current.contentWindow) return;
      const m = e.data as EditPageToShell;
      if (!m || typeof m !== 'object') return;
      switch (m.type) {
        case 'ov:ready': {
          setFrameReady(true);
          setVisible(new Set([...(m.keys ?? []), ...(m.imageKeys ?? [])]));
          // re-apply unsaved edits (the frame itself shows saved drafts)
          for (const [key, v] of Object.entries(editsRef.current[lang])) {
            const item = byKeyRef.current.get(key);
            if (item) pushToFrame(item, v);
          }
          break;
        }
        case 'ov:text':
          setEdit(lang, m.key, m.value, true);
          setFocusKey(m.key);
          break;
        case 'ov:focus':
          setFocusKey(m.key);
          break;
        case 'ov:image-click':
          setFocusKey(m.key);
          setPickerKey(m.key);
          break;
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [lang, setEdit, pushToFrame]);

  useEffect(() => {
    setFrameReady(false);
    setNoEdit(false);
  }, [lang, path, frameNonce]);
  // The page loaded but its editing layer never said hello (e.g. signed out in that tab,
  // or an old cached page): editing still works from the list.
  const frameLoaded = () => setTimeout(() => setNoEdit(true), 4000);
  useEffect(() => {
    if (frameReady) post({ type: 'ov:highlight', key: focusKey });
  }, [focusKey, frameReady, post]);

  // ---------------------------------------------------------------- image edits apply to both languages

  const setImage = (key: string, v: ImageEdit | null) => {
    setEdit(lang, key, v);
    const other: CmsLang = lang === 'en' ? 'ms' : 'en';
    if (v === null) {
      setEdits((e) => ({ ...e, [other]: { ...e[other], [key]: null } }));
      return;
    }
    const otherItem = (items[other] ?? []).find((i) => i.key === key);
    const otherSaved = otherItem ? savedValue(otherItem) : null;
    const prevOther = (edits[other][key] as ImageEdit | undefined) ?? (isImageValue(otherSaved) ? (otherSaved as ImageEdit) : undefined);
    const otherAlt = prevOther && prevOther.media.id === v.media.id ? prevOther.alt : v.media.alt.ms || prevOther?.alt || v.alt;
    setEdits((e) => ({ ...e, [other]: { ...e[other], [key]: { ...v, alt: otherAlt } } }));
  };

  // ---------------------------------------------------------------- save / publish / discard

  const save = async (): Promise<boolean> => {
    if (!hasUnsaved) return true;
    for (const l of ['en', 'ms'] as CmsLang[]) {
      for (const [key, v] of Object.entries(edits[l])) {
        const item = (items[l] ?? []).find((i) => i.key === key);
        if (!item || item.type === 'image' || v === null) continue;
        const p = textProblem(item, v as TextValue);
        if (p) {
          if (l !== lang) setLang(l);
          setFocusKey(key);
          toast.error(`${humanizeKey(key)}: ${p}`);
          return false;
        }
      }
    }
    setBusy('save');
    try {
      for (const l of ['en', 'ms'] as CmsLang[]) {
        const entries = Object.entries(edits[l]);
        if (!entries.length) continue;
        const payload: OverrideItem[] = entries.map(([key, v]) => {
          if (isImageValue(v)) return { key, kind: 'image', value: { media: v.media.id, alt: v.alt, ...(v.focal ? { focal: v.focal } : {}) } };
          const item = (items[l] ?? []).find((i) => i.key === key);
          return { key, kind: item?.type === 'image' ? 'image' : 'text', value: v as TextValue | null };
        });
        await api.saveOverrides(l, payload);
        setItems((s) => ({
          ...s,
          [l]: (s[l] ?? []).map((i) => (edits[l][i.key] !== undefined ? { ...i, draft: edits[l][i.key] as SiteKeyItem['draft'], hasDraft: true, draftAt: new Date().toISOString() } : i)),
        }));
        setEdits((e) => ({ ...e, [l]: {} }));
      }
      return true;
    } catch (e) {
      toastError(e, 'The changes could not be saved.');
      return false;
    } finally {
      setBusy(null);
    }
  };

  const discard = async () => {
    const n = myDrafts.length + Object.keys(edits.en).length + Object.keys(edits.ms).length;
    const ok = await confirmDialog({
      title: 'Discard your changes?',
      message: `Your ${plural(n, 'change')} that are not published yet go back to what is live on the website now. Changes by other people are not touched.`,
      confirmLabel: 'Discard changes',
      danger: true,
    });
    if (!ok) return;
    setBusy('discard');
    try {
      if (myDrafts.length) await api.discardSite(myDrafts);
      setEdits({ en: {}, ms: {} });
      setItems({ en: null, ms: null });
      setFrameNonce((n) => n + 1);
      toast.ok('Changes discarded.');
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const openPublish = async () => {
    if (!(await save())) return;
    setDialog('publish');
  };

  const publish = async (keys: { lang: CmsLang; key: string }[]) => {
    setBusy('publish');
    try {
      await api.publishSite(keys);
      setItems({ en: null, ms: null });
      void pending.reload(true);
      toast.ok(`${plural(keys.length, 'change')} published. The website shows them now.`);
      setDialog(null);
      void rerenderDirtyPages();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  // ---------------------------------------------------------------- panel model

  const groups = useMemo(() => {
    const list = items[lang] ?? [];
    const known = new Set<string>();
    const out = def.groups.map((g) => {
      g.keys.forEach((k) => known.add(k));
      return { label: g.label, items: g.keys.map((k) => byKey.get(k)).filter((i): i is SiteKeyItem => !!i && i.type !== 'image') };
    });
    const rest = list.filter((i) => !known.has(i.key) && i.type !== 'image' && !def.images.includes(i.key));
    const shared = new Set(pageKey === 'global' ? [] : (structure.pages.global?.groups ?? []).flatMap((g) => g.keys));
    const headerFooter = rest.filter((i) => shared.has(i.key));
    const other = rest.filter((i) => !shared.has(i.key));
    if (headerFooter.length) out.push({ label: 'Header & footer (every page)', items: headerFooter });
    if (other.length) out.push({ label: 'Other texts', items: other });
    return out.filter((g) => g.items.length);
  }, [items, lang, def, byKey, pageKey, structure.pages]);

  const imageItems = useMemo(
    () =>
      def.images.map(
        (k) =>
          byKey.get(k) ??
          ({ key: k, type: 'image', default: structure.spots[k]?.default ?? null, draft: null, published: null, usage: [], editable: true } as SiteKeyItem)
      ),
    [def.images, byKey, structure.spots]
  );

  const needle = q.trim().toLowerCase();
  const match = (i: SiteKeyItem) => {
    if (!needle) return true;
    const v = currentValue(i, edits[lang][i.key], i.key in edits[lang]);
    return i.key.toLowerCase().includes(needle) || humanizeKey(i.key).toLowerCase().includes(needle) || JSON.stringify(v ?? '').toLowerCase().includes(needle);
  };

  const pageKeys = useMemo(
    () => new Set([...def.groups.flatMap((g) => g.keys), ...def.images, ...(structure.pages.global?.groups ?? []).flatMap((g) => g.keys)]),
    [def, structure.pages]
  );
  const others: PendingOverride[] = (pending.data ?? []).filter((p) => pageKeys.has(p.key) && p.userId !== me.id);
  const discardOther = async (o: PendingOverride) => {
    const who = o.userName ?? 'this person';
    const ok = await confirmDialog({
      title: `Discard ${who}’s change?`,
      message: `“${humanizeKey(o.key)}” (${o.lang === 'en' ? 'English' : 'Bahasa Melayu'}) was changed by ${who} but never published. Discarding deletes that unpublished text; the website keeps what it shows now. This cannot be undone.`,
      confirmLabel: 'Discard change',
      danger: true,
    });
    if (!ok || o.userId == null) return;
    try {
      await api.discardOtherDraft(o.userId, o.lang, o.key);
      toast.ok('Change discarded.');
    } catch (e) {
      toastError(e);
    }
    void pending.reload(true);
  };

  const changesCount = myDrafts.length + Object.keys(edits.en).length + Object.keys(edits.ms).length;
  const src = `/${lang}${path ? '/' + path : ''}?cms-edit=1`;

  const panel = (
    <aside className={cx('flex min-h-0 min-w-0 flex-col bg-cream', wide ? 'w-[400px] shrink-0 border-l border-line' : 'flex-1')}>
      <div className="border-b border-line px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-lg text-olive-dark">All texts on this page</h2>
          <span className="text-xs text-muted">{lang === 'en' ? 'English' : 'Bahasa Melayu'}</span>
        </div>
        <div className="relative mt-2.5">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a text…" className="pl-9" aria-label="Find a text" />
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-muted">
          {wide ? 'Click a text in the page to edit it there, or change it below.' : 'Change the texts below. On a computer you can also click texts in the page itself.'} Only words and photos can
          change — the design stays.
        </p>
      </div>
      <div className="avo-scroll min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {others.length > 0 && (
          <div className="mb-3 rounded-xl border border-info/20 bg-info-soft px-3 py-2.5 text-[12.5px] text-info">
            <div className="flex items-center gap-1.5 font-semibold">
              <LuUsers /> {plural(others.length, 'change')} by other people, not published yet
            </div>
            <ul className="mt-1 flex flex-col gap-0.5">
              {others.map((o) => (
                <li key={`${o.userId}:${o.lang}:${o.key}`} className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate">
                    {humanizeKey(o.key)} ({o.lang === 'en' ? 'EN' : 'BM'}) — {o.userName ?? 'someone'}, {fmtAgo(o.updatedAt)}
                  </span>
                  {o.userId != null && (
                    <button type="button" className="shrink-0 font-medium underline hover:no-underline" onClick={() => void discardOther(o)}>
                      Discard
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[11.5px] opacity-80">Your Publish only puts your own changes live.</p>
          </div>
        )}
        {loadErr && <ErrorBlock message={loadErr} onRetry={() => void loadLang(lang, true)} />}
        {!items[lang] && !loadErr && <LoadingBlock label="Loading texts…" />}
        {items[lang] && (
          <div className="flex flex-col gap-5">
            {imageItems.filter(match).length > 0 && (
              <section>
                <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">Photos</h3>
                <div className="flex flex-col gap-2">
                  {imageItems.filter(match).map((i) => {
                    const has = i.key in edits[lang];
                    const v = (has ? edits[lang][i.key] : savedValue(i)) as ImageEdit | null;
                    const spot = structure.spots[i.key];
                    return (
                      <ImageSpotField
                        key={i.key}
                        spotKey={i.key}
                        spot={spot ? { ...spot, label: i.label ?? spot.label, needsAlpha: i.needsAlpha ?? spot.needsAlpha } : undefined}
                        value={v && isImageValue(v) ? v : null}
                        changed={!!v}
                        state={fieldState(i, has)}
                        focused={focusKey === i.key}
                        onFocus={() => setFocusKey(i.key)}
                        onChange={(nv) => setImage(i.key, nv)}
                        onReset={() => setImage(i.key, null)}
                        pickerOpen={pickerKey === i.key}
                        setPickerOpen={(o) => setPickerKey(o ? i.key : null)}
                      />
                    );
                  })}
                </div>
              </section>
            )}
            {groups.map((g) => {
              const shown = g.items.filter(match);
              if (!shown.length) return null;
              return (
                <section key={g.label}>
                  <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">{g.label}</h3>
                  <div className="flex flex-col gap-2">
                    {shown.map((i) => {
                      const has = i.key in edits[lang];
                      const v = currentValue(i, edits[lang][i.key], has);
                      const changed = !sameValue(v, defaultValue(i));
                      return (
                        <SiteField
                          key={i.key}
                          item={i}
                          lang={lang}
                          value={v}
                          changed={changed}
                          state={fieldState(i, has)}
                          focused={focusKey === i.key}
                          visible={!visible || visible.has(i.key)}
                          onFocus={() => setFocusKey(i.key)}
                          onChange={(nv) => setEdit(lang, i.key, nv)}
                          onReset={() => setEdit(lang, i.key, null)}
                          onOpenWords={() => setWordsKey(i.key)}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
            {needle && !groups.some((g) => g.items.some(match)) && !imageItems.some(match) && <p className="py-8 text-center text-sm text-muted">No text contains “{q}”.</p>}
          </div>
        )}
      </div>
    </aside>
  );

  const wordsItem = wordsKey ? byKey.get(wordsKey) : undefined;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#e8e4d9]">
      <header className="z-20 flex min-h-14 shrink-0 flex-wrap items-center gap-2 border-b border-line bg-cream px-2 py-2 lg:flex-nowrap lg:py-0">
        <IconButton label="Back to site pages" onClick={() => void guardedNav('/site')}>
          <LuArrowLeft />
        </IconButton>
        <div className="mr-2 min-w-0">
          <div className="truncate text-sm font-semibold text-ink">{def.label}</div>
          <div className="text-[11.5px] text-muted">{changesCount ? `${plural(changesCount, 'change')} not published` : 'No changes'}</div>
        </div>
        {def.paths && def.paths.length > 1 && (
          <Select value={path} onChange={(e) => setPath(e.target.value)} className="h-8 w-auto max-w-[220px] text-[13px]" aria-label="Which product">
            {def.paths.map((p) => (
              <option key={p} value={p}>
                {humanizeKey(p.split('/').pop() ?? p).replace(/ › /g, ' ')}
              </option>
            ))}
          </Select>
        )}
        <div className="mx-auto flex items-center gap-2">
          <Segmented
            size="sm"
            value={lang}
            onChange={(l) => {
              setLang(l);
              setFocusKey(null);
            }}
            ariaLabel="Language"
            options={[
              { value: 'en', label: 'EN' },
              { value: 'ms', label: 'BM' },
            ]}
          />
          {wide && <DeviceSwitch value={device} onChange={setDevice} />}
        </div>
        <div className="flex items-center gap-1.5">
          <IconButton label="Versions" onClick={() => setDialog('versions')}>
            <LuHistory />
          </IconButton>
          <IconButton label="Preview the live page" onClick={() => window.open(`/${lang}${path ? '/' + path : ''}`, '_blank', 'noopener')}>
            <LuEye />
          </IconButton>
          <Button size="sm" variant="ghost" icon={<LuRotateCcw />} disabled={!changesCount} loading={busy === 'discard'} onClick={() => void discard()}>
            Discard
          </Button>
          <Button size="sm" disabled={!hasUnsaved} loading={busy === 'save'} onClick={() => void save().then((ok) => ok && toast.ok('Draft saved. Publish to show it on the website.'))}>
            Save draft
          </Button>
          <Button size="sm" variant="primary" icon={<LuRocket />} disabled={!changesCount} onClick={() => void openPublish()}>
            Publish
          </Button>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        {wide && (
          <div className="min-w-0 flex-1">
            <DeviceFrame key={frameNonce} ref={iframe} device={device} src={src} title={`${def.label} preview`} onLoad={frameLoaded}>
              {!frameReady && noEdit && (
                <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs text-muted shadow">Clicking texts in the preview is not available right now — edit them in the list on the right.</span>
                </div>
              )}
              {!frameReady && !noEdit && (
                <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                  <span className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs text-muted shadow">
                    <LuLoaderCircle className="animate-spin text-olive" /> Loading the page…
                  </span>
                </div>
              )}
            </DeviceFrame>
          </div>
        )}
        {panel}
      </div>

      {orphans.data && orphans.data.length > 0 && (
        <div className="border-t border-warn/30 bg-warn-soft px-4 py-2 text-[12.5px] text-warn">
          {orphans.data.length === 1
            ? '1 old edit no longer matches a text on the website (the website was updated), so it is ignored.'
            : `${orphans.data.length} old edits no longer match a text on the website (the website was updated), so they are ignored.`}
        </div>
      )}

      {wordsItem && (
        <WordsDialog
          open
          onClose={() => setWordsKey(null)}
          value={(currentValue(wordsItem, edits[lang][wordsItem.key], wordsItem.key in edits[lang]) as HeadlineWord[]) ?? []}
          onSave={(w) => setEdit(lang, wordsItem.key, w)}
        />
      )}
      <PublishSiteDialog
        open={dialog === 'publish'}
        onClose={() => setDialog(null)}
        keys={myDrafts}
        busy={busy === 'publish'}
        onPublish={(k) => void publish(k)}
      />
      <SiteVersionsDialog
        open={dialog === 'versions'}
        onClose={() => setDialog(null)}
        onReverted={async () => {
          setItems({ en: null, ms: null });

          setFrameNonce((n) => n + 1);
          void rerenderDirtyPages();
        }}
      />
    </div>
  );
}

function PublishSiteDialog({ open, onClose, keys, busy, onPublish }: { open: boolean; onClose: () => void; keys: { lang: CmsLang; key: string }[]; busy: boolean; onPublish: (k: { lang: CmsLang; key: string }[]) => void }) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (open) setSel(new Set(keys.map((k) => sk(k.lang, k.key))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const chosen = keys.filter((k) => sel.has(sk(k.lang, k.key)));
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Publish your changes"
      subtitle="These are the changes you made. Untick any you want to keep as a draft."
      size="md"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" loading={busy} disabled={!chosen.length} onClick={() => onPublish(chosen)}>
            Publish {plural(chosen.length, 'change')}
          </Button>
        </>
      }
    >
      {keys.length === 0 ? (
        <p className="text-sm text-muted">There is nothing of yours to publish.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-line">
          {keys.map((k) => {
            const id = sk(k.lang, k.key);
            return (
              <li key={id} className="flex items-center gap-3 py-2.5">
                <Checkbox
                  checked={sel.has(id)}
                  onChange={(v) =>
                    setSel((s) => {
                      const n = new Set(s);
                      if (v) n.add(id);
                      else n.delete(id);
                      return n;
                    })
                  }
                  label={<span className="text-sm text-ink">{humanizeKey(k.key)}</span>}
                />
                <Chip className="ml-auto">{k.lang === 'en' ? 'EN' : 'BM'}</Chip>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}

function SiteVersionsDialog({ open, onClose, onReverted }: { open: boolean; onClose: () => void; onReverted: () => Promise<void> }) {
  const [list, setList] = useState<SiteRevision[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  useEffect(() => {
    if (!open) return;
    setList(null);
    setError(null);
    api
      .siteRevisions()
      .then(setList)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load versions.'));
  }, [open]);
  const revert = async (r: SiteRevision) => {
    const ok = await confirmDialog({
      title: 'Undo this publish?',
      message: `The ${plural(r.items.length, 'text')} published on ${fmtDateTime(r.createdAt)} go back to what they were before — straight away on the website.`,
      confirmLabel: 'Undo publish',
      danger: true,
    });
    if (!ok) return;
    setBusy(r.publishId);
    try {
      await api.revertSite(r.publishId);
      toast.ok('Done — the earlier texts are live again.');
      await onReverted();
      onClose();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Published changes" subtitle="Every publish of site texts and photos, newest first." size="md">
      {!list && !error && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}
      {list?.length === 0 && <p className="py-8 text-center text-sm text-muted">Nothing has been published yet.</p>}
      {list && list.length > 0 && (
        <ol className="flex flex-col divide-y divide-line">
          {list.map((r) => (
            <li key={r.publishId} className="flex items-start gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-ink">{fmtDateTime(r.createdAt)}</div>
                <div className="text-xs text-muted">
                  {plural(r.items.length, 'change')}
                  {r.userName ? ` by ${r.userName}` : ''}
                </div>
                <div className="mt-1 line-clamp-2 text-xs text-faint">{r.items.map((i) => `${humanizeKey(i.key)} (${i.lang === 'en' ? 'EN' : 'BM'})`).join(', ')}</div>
              </div>
              <Button size="sm" icon={<LuRotateCcw />} loading={busy === r.publishId} onClick={() => void revert(r)}>
                Undo
              </Button>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}
