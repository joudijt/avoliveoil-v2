import { useState, type DragEvent } from 'react';
import { LuChevronRight, LuColumns2, LuEyeOff, LuLayers, LuLayoutGrid, LuPanelsTopLeft, LuX } from 'react-icons/lu';
import { WIDGET_TYPES, type DragPayload, type Section, type WidgetType } from '../../../cms/contracts';
import { COLUMN_LAYOUTS } from '../../../cms/doc';
import { cx } from '../../lib/cx';
import { layoutTemplateId, SECTION_TEMPLATES } from '../../content/templates';
import { useBuilder } from './context';
import { ElementSettings } from './settings/ElementSettings';
import { WIDGET_META, widgetLabel } from './widgetMeta';

export type LeftTab = 'widgets' | 'sections' | 'navigator';

interface Props {
  tab: LeftTab;
  setTab: (t: LeftTab) => void;
  /** element whose settings are shown (null = show the library tabs) */
  selectedId: string | null;
  onBack: () => void;
  onAddWidget: (t: WidgetType) => void;
  onAddSection: (templateId: string) => void;
  onDragStart: (p: DragPayload) => void;
  onDragEnd: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  /** set when the canvas asked to add a widget into a specific column */
  pendingColumn: string | null;
  cancelPending: () => void;
}

function dragProps(payload: DragPayload, onStart: Props['onDragStart'], onEnd: Props['onDragEnd']) {
  return {
    draggable: true,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.effectAllowed = 'copy';
      // Firefox only starts a drag when some data is set.
      e.dataTransfer.setData('text/plain', JSON.stringify(payload));
      onStart(payload);
    },
    onDragEnd: () => onEnd(),
  };
}

export function LeftPanel(p: Props) {
  if (p.selectedId)
    return (
      <ElementSettings
        id={p.selectedId}
        onBack={p.onBack}
        onDuplicate={() => p.onDuplicate(p.selectedId!)}
        onDelete={() => p.onDelete(p.selectedId!)}
      />
    );
  const tabs: { value: LeftTab; label: string; icon: React.ReactNode }[] = [
    { value: 'widgets', label: 'Widgets', icon: <LuLayoutGrid /> },
    { value: 'sections', label: 'Sections', icon: <LuPanelsTopLeft /> },
    { value: 'navigator', label: 'Navigator', icon: <LuLayers /> },
  ];
  return (
    <div className="flex h-full flex-col">
      <div role="tablist" className="grid grid-cols-3 gap-1 border-b border-line p-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={p.tab === t.value}
            onClick={() => p.setTab(t.value)}
            className={cx(
              'flex flex-col items-center gap-1 rounded-lg py-2 text-[11.5px] font-medium transition-colors',
              p.tab === t.value ? 'bg-mist text-olive-dark' : 'text-muted hover:bg-sand hover:text-ink'
            )}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="avo-scroll min-h-0 flex-1 overflow-y-auto">
        {p.tab === 'widgets' && <WidgetsTab {...p} />}
        {p.tab === 'sections' && <SectionsTab {...p} />}
        {p.tab === 'navigator' && <Navigator selectedId={p.selectedId} />}
      </div>
    </div>
  );
}

function WidgetsTab(p: Props) {
  return (
    <div className="p-3">
      {p.pendingColumn ? (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-gold/10 px-3 py-2 text-[12.5px] text-[#7a5a14]">
          <span className="flex-1">Click a widget to add it to the column you chose.</span>
          <button type="button" onClick={p.cancelPending} aria-label="Cancel" className="rounded p-0.5 hover:bg-white/60">
            <LuX />
          </button>
        </div>
      ) : (
        <p className="mb-3 px-1 text-[12px] leading-snug text-muted">Drag a widget onto the page, or click to add it below the selected item.</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {WIDGET_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            title={WIDGET_META[t].hint}
            onClick={() => p.onAddWidget(t)}
            {...dragProps({ kind: 'new-widget', widgetType: t }, p.onDragStart, p.onDragEnd)}
            className="group flex cursor-grab flex-col items-center gap-1.5 rounded-xl border border-line bg-white px-2 py-3.5 text-center transition-all hover:border-olive/50 hover:shadow-[var(--shadow-card)] active:cursor-grabbing"
          >
            <span className="text-[22px] text-olive transition-transform group-hover:scale-110">{WIDGET_META[t].icon}</span>
            <span className="text-[12px] font-medium text-ink">{WIDGET_META[t].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionsTab(p: Props) {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div>
        <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">Empty section</h3>
        <div className="grid grid-cols-3 gap-2">
          {COLUMN_LAYOUTS.map((l) => (
            <button
              key={l.join('-')}
              type="button"
              title={l.length === 1 ? 'One column' : `${l.length} columns`}
              onClick={() => p.onAddSection(layoutTemplateId(l))}
              {...dragProps({ kind: 'new-section', templateId: layoutTemplateId(l) }, p.onDragStart, p.onDragEnd)}
              className="flex h-12 cursor-grab gap-1 rounded-lg border border-line bg-white p-2 hover:border-olive/50 hover:shadow-[var(--shadow-card)]"
            >
              {l.map((span, i) => (
                <span key={i} className="rounded-[3px] bg-line-strong" style={{ flex: span }} />
              ))}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">Ready-made sections</h3>
        <div className="flex flex-col gap-2">
          {SECTION_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => p.onAddSection(t.id)}
              {...dragProps({ kind: 'new-section', templateId: t.id }, p.onDragStart, p.onDragEnd)}
              className="flex cursor-grab items-center gap-3 rounded-xl border border-line bg-white p-2.5 text-left hover:border-olive/50 hover:shadow-[var(--shadow-card)]"
            >
              <SectionThumb id={t.id} />
              <span className="min-w-0">
                <span className="block text-[13px] font-medium text-ink">{t.name}</span>
                <span className="block text-[11.5px] leading-snug text-muted">{t.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Tiny schematic of each ready-made section. */
function SectionThumb({ id }: { id: string }) {
  const bar = (w: string, c = 'bg-line-strong') => <span className={cx('block h-1 rounded-full', c)} style={{ width: w }} />;
  const box = 'flex h-11 w-16 shrink-0 flex-col justify-center gap-1 rounded-md p-1.5';
  switch (id) {
    case 'hero':
      return <span className={cx(box, 'items-center bg-olive-dark')}>{bar('80%', 'bg-cream/80')}{bar('55%', 'bg-cream/50')}<span className="mt-0.5 block h-1.5 w-5 rounded-sm bg-gold" /></span>;
    case 'text-image':
      return <span className={cx(box, 'flex-row items-center bg-[#f3ead6]')}><span className="flex flex-1 flex-col gap-1">{bar('90%')}{bar('70%')}{bar('80%')}</span><span className="h-full w-6 rounded-sm bg-[#c9b98f]" /></span>;
    case 'features':
      return <span className={cx(box, 'flex-row items-end gap-1 bg-[#e9e3d4]')}>{[0, 1, 2].map((i) => <span key={i} className="flex flex-1 flex-col items-center gap-0.5"><span className="h-2 w-2 rounded-full bg-olive/60" />{bar('100%')}</span>)}</span>;
    case 'cta':
      return <span className={cx(box, 'items-center bg-olive')}>{bar('70%', 'bg-cream/80')}<span className="mt-0.5 block h-1.5 w-6 rounded-sm bg-[#25d366]" /></span>;
    case 'faq':
      return <span className={cx(box, 'bg-[#f3ead6]')}>{[0, 1, 2].map((i) => <span key={i} className="flex items-center justify-between">{bar('70%')}<span className="text-[7px] leading-none text-faint">+</span></span>)}</span>;
    case 'quotes':
      return <span className={cx(box, 'flex-row gap-1 bg-[#e9e3d4]')}>{[0, 1].map((i) => <span key={i} className="flex flex-1 flex-col gap-0.5 rounded-sm bg-white/70 p-0.5"><span className="font-display text-[9px] leading-none text-gold">“</span>{bar('90%')}</span>)}</span>;
    case 'contact':
      return <span className={cx(box, 'flex-row gap-1 bg-[#f3ead6]')}><span className="flex flex-1 flex-col justify-center gap-1">{bar('90%')}{bar('60%')}</span><span className="flex flex-1 flex-col gap-0.5 rounded-sm bg-white p-0.5">{bar('100%', 'bg-line')}{bar('100%', 'bg-line')}<span className="h-1 w-3 rounded-sm bg-olive" /></span></span>;
    case 'gallery':
      return <span className={cx(box, 'grid grid-cols-3 gap-0.5 bg-[#e9e3d4]')}>{Array.from({ length: 6 }, (_, i) => <span key={i} className="rounded-[2px] bg-[#c9b98f]" />)}</span>;
    case 'products':
      return <span className={cx(box, 'flex-row items-end justify-center gap-1.5 bg-[#f3ead6]')}>{[0, 1, 2].map((i) => <span key={i} className="h-7 w-2.5 rounded-t-full rounded-b-sm bg-olive/70" />)}</span>;
    default:
      return <span className={cx(box, 'bg-sand')} />;
  }
}

function Navigator({ selectedId }: { selectedId: string | null }) {
  const { doc, select, lang } = useBuilder();
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  if (!doc.sections.length) return <p className="p-5 text-center text-sm text-muted">The page is empty. Add a section to start.</p>;
  const hidden = (h?: { desktop?: boolean; tablet?: boolean; mobile?: boolean }) => !!(h && (h.desktop || h.tablet || h.mobile));
  const row = (id: string, depth: number, label: React.ReactNode, icon: React.ReactNode, opts: { toggle?: boolean; hide?: boolean } = {}) => (
    <div
      key={id}
      className={cx(
        'group flex h-8 items-center gap-1.5 rounded-md pr-2 text-[12.5px]',
        selectedId === id ? 'bg-olive text-cream' : 'text-ink hover:bg-sand'
      )}
      style={{ paddingLeft: 6 + depth * 14 }}
    >
      {opts.toggle !== undefined ? (
        <button type="button" onClick={() => setClosed((c) => ({ ...c, [id]: !c[id] }))} className="flex h-5 w-5 items-center justify-center rounded opacity-70 hover:opacity-100" aria-label={closed[id] ? 'Expand' : 'Collapse'}>
          <LuChevronRight className={cx('transition-transform', !closed[id] && 'rotate-90')} />
        </button>
      ) : (
        <span className="w-5" />
      )}
      <button type="button" onClick={() => select(id)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
        <span className={cx('shrink-0 text-[14px]', selectedId === id ? 'text-cream' : 'text-olive')}>{icon}</span>
        <span className="truncate">{label}</span>
      </button>
      {opts.hide && <LuEyeOff className="shrink-0 opacity-60" title="Hidden on some devices" />}
    </div>
  );
  const sectionLabel = (s: Section, i: number) => {
    const first = s.columns.flatMap((c) => c.widgets).find((w) => w.type === 'heading');
    const t = first ? widgetLabel(first, lang) : '';
    return (
      <>
        Section {i + 1}
        {t && <span className="opacity-60"> · {t}</span>}
      </>
    );
  };
  return (
    <div className="p-2">
      {doc.sections.map((s, si) => (
        <div key={s.id}>
          {row(s.id, 0, sectionLabel(s, si), <LuPanelsTopLeft />, { toggle: true, hide: hidden(s.hide) })}
          {!closed[s.id] &&
            s.columns.map((c, ci) => (
              <div key={c.id}>
                {s.columns.length > 1 && row(c.id, 1, `Column ${ci + 1}`, <LuColumns2 />)}
                {c.widgets.map((w) =>
                  row(
                    w.id,
                    s.columns.length > 1 ? 2 : 1,
                    <>
                      {WIDGET_META[w.type].name}
                      {widgetLabel(w, lang) && <span className="opacity-60"> · {widgetLabel(w, lang)}</span>}
                    </>,
                    WIDGET_META[w.type].icon,
                    { hide: hidden(w.hide) }
                  )
                )}
                {!c.widgets.length && (
                  <div className="py-1 text-[11.5px] italic text-faint" style={{ paddingLeft: 6 + (s.columns.length > 1 ? 2 : 1) * 14 + 26 }}>
                    empty
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
