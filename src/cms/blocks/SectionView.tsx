import { useMemo } from 'react';
import type { Column, Section } from '../contracts';
import { mediaFor, srcSetOf, widestUrl } from '../media';
import { COLUMN, ROW, SECTION, cx, type Tone } from './classes';
import { BlockContext, useBlockEnv, type BlockEnv } from './context';
import { hideAttr, hideClasses } from './hide';
import { WidgetView } from './WidgetView';

const DARK_BG = new Set(['olive', 'olive-dark', 'image']);

function clampSpan(n: number): number {
  return Math.min(12, Math.max(1, Math.round(Number(n) || 12)));
}

/** Overlay strength in tens, 0–80; a background photo defaults to 40 so cream text stays readable. */
function overlayStep(v: number | undefined): number {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : 40;
  return Math.min(80, Math.max(0, Math.round(n / 10) * 10));
}

/**
 * A section = full-width band (background, vertical padding) holding one row of
 * columns. Phones stack every column; tablets keep the desktop spans only when
 * every column of the row is at least half wide (6/12), otherwise they stack too;
 * desktops (≥1024px) use the spans.
 */
export function SectionView({ section, renderKeys }: { section: Section; renderKeys?: Record<string, number> }) {
  const env = useBlockEnv();
  const s = section.settings;
  const canvas = env.mode === 'canvas';
  const bgMedia = s.bg === 'image' ? mediaFor(env.media, s.bgImage) : null;
  const tone: Tone = DARK_BG.has(s.bg) ? 'dark' : 'light';
  const full = s.layout === 'full';
  const tabletKeepsSpans = section.columns.length > 0 && section.columns.every((c) => clampSpan(c.span) >= 6);
  const anchor = s.anchor && /^[a-z0-9-]{1,60}$/.test(s.anchor) ? s.anchor : undefined;
  const overlay = SECTION.overlay[overlayStep(s.overlay)];

  const sectionEnv = useMemo<BlockEnv>(() => ({ ...env, tone, align: s.align ?? 'start', full }), [env, tone, s.align, full]);

  const cls = cx(
    SECTION.base,
    SECTION.bg[s.bg] ?? SECTION.bg.bg,
    SECTION.pad[s.padY] ?? SECTION.pad.l,
    SECTION.align[s.align] ?? SECTION.align.start,
    !canvas && hideClasses(section.hide)
  );

  return (
    <section
      id={anchor}
      className={cls}
      {...(canvas ? { 'data-node-id': section.id, 'data-node-kind': 'section', 'data-node-label': 'Section', ...hideAttr(section.hide) } : {})}
    >
      {bgMedia ? (
        <img
          src={widestUrl(bgMedia.variants)}
          srcSet={srcSetOf(bgMedia.variants)}
          sizes="100vw"
          width={bgMedia.width}
          height={bgMedia.height}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={SECTION.bgImage}
        />
      ) : null}
      {bgMedia && overlay ? <div className={overlay} aria-hidden="true" /> : null}
      <div className={SECTION.inner[full ? 'full' : 'boxed']}>
        <div className={cx(ROW.base, ROW.gap[s.gap ?? 'm'] ?? ROW.gap.m, ROW.valign[s.valign ?? 'start'] ?? ROW.valign.start)}>
          <BlockContext.Provider value={sectionEnv}>
            {section.columns.map((c) => (
              <ColumnView key={c.id} column={c} tabletKeepsSpans={tabletKeepsSpans} renderKeys={renderKeys} />
            ))}
          </BlockContext.Provider>
        </div>
      </div>
    </section>
  );
}

function ColumnView({ column, tabletKeepsSpans, renderKeys }: { column: Column; tabletKeepsSpans: boolean; renderKeys?: Record<string, number> }) {
  const env = useBlockEnv();
  const span = clampSpan(column.span);
  const colEnv = useMemo<BlockEnv>(() => ({ ...env, span }), [env, span]);
  const canvas = env.mode === 'canvas';
  return (
    <div
      className={cx(COLUMN.base, tabletKeepsSpans ? COLUMN.md[span] : COLUMN.md[12], COLUMN.lg[span])}
      {...(canvas ? { 'data-node-id': column.id, 'data-node-kind': 'column', 'data-node-label': 'Column' } : {})}
    >
      <BlockContext.Provider value={colEnv}>
        {column.widgets.map((w) => (
          <WidgetView key={w.id} w={w} renderKey={renderKeys?.[w.id]} />
        ))}
      </BlockContext.Provider>
      {canvas && column.widgets.length === 0 ? (
        <div data-cms-empty-col="" data-column-id={column.id}>
          Drag a widget here
        </div>
      ) : null}
    </div>
  );
}
