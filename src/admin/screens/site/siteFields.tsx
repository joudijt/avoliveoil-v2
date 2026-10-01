import { useEffect, useRef, useState } from 'react';
import { LuArrowDown, LuArrowUp, LuEyeOff, LuImagePlus, LuPencil, LuPlus, LuRotateCcw, LuTrash2, LuTriangleAlert } from 'react-icons/lu';
import type { CmsLang, HeadlineWord } from '../../../cms/contracts';
import { variantUrl, type ImageSpot, type MediaItem, type SiteKeyItem } from '../../api';
import { cx } from '../../lib/cx';
import { mediaStore, useMedia } from '../../lib/mediaStore';
import { Modal } from '../../ui/Modal';
import { Button, IconButton, Input, Textarea } from '../../ui/ui';
import { MediaPicker } from '../media/MediaPicker';
import { humanizeKey, splitTemplate, textProblem, type FieldState } from './siteUtil';
import type { ImageEdit } from './types';

// ---------------------------------------------------------------- template text with fixed tokens

const TOKEN_LABEL: Record<string, string> = { store: 'Store name' };

/**
 * Text with automatic parts ({{store}}): the owner edits the text between fixed chips,
 * so a token can never be deleted or invented.
 */
type Slot = { text: string } | { token: string };

function toSlots(value: string): Slot[] {
  const parts = splitTemplate(value);
  // Make sure there is an editable text slot before, between and after every token.
  const slots: Slot[] = [];
  parts.forEach((p, i) => {
    if ('token' in p && (i === 0 || 'token' in parts[i - 1])) slots.push({ text: '' });
    slots.push(p);
  });
  if (!slots.length || 'token' in slots[slots.length - 1]) slots.push({ text: '' });
  return slots;
}

/**
 * Join the slots back into the template. The space next to a chip is invisible in the box,
 * so an owner retyping "sold only by" got "sold only byBerkat Madinah Store" live: put the
 * word space back on each side of a token unless punctuation or a space is already there.
 */
function joinSlots(slots: Slot[]): string {
  return slots
    .map((s, i) => {
      if ('token' in s) return `{{${s.token}}}`;
      let t = s.text;
      if (t && i + 1 < slots.length && 'token' in slots[i + 1] && !/[\s(“"'‘]$/.test(t)) t += ' ';
      if (t && i > 0 && 'token' in slots[i - 1] && /^[\p{L}\p{N}—–-]/u.test(t)) t = ' ' + t;
      return t;
    })
    .join('');
}

function TemplateInput({ value, onChange, onFocus, id }: { value: string; onChange: (v: string) => void; onFocus: () => void; id: string }) {
  // Local slots so the automatic spaces never jump the caret while typing; re-read only when the
  // value changes from outside (reset, discard, language switch).
  const [slots, setSlots] = useState<Slot[]>(() => toSlots(value));
  const emitted = useRef<string | null>(null);
  useEffect(() => {
    if (value !== emitted.current) setSlots(toSlots(value));
  }, [value]);
  const update = (idx: number, text: string) => {
    const next = slots.map((s, i) => (i === idx && 'text' in s ? { text: text.replace(/\{\{|\}\}/g, '') } : s));
    setSlots(next);
    emitted.current = joinSlots(next);
    onChange(emitted.current);
  };
  let firstText = true;
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-line-strong bg-white px-1.5 py-1.5 focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/15">
      {slots.map((s, i) => {
        if ('token' in s)
          return (
            <span key={i} className="select-none rounded-md bg-gold/15 px-2 py-0.5 text-[12px] font-medium text-[#7a5a14]" title="Filled in automatically — cannot be removed">
              {TOKEN_LABEL[s.token] ?? s.token}
            </span>
          );
        const isFirst = firstText;
        firstText = false;
        return (
          <input
            key={i}
            id={isFirst ? id : undefined}
            value={s.text}
            onFocus={onFocus}
            onChange={(e) => update(i, e.target.value)}
            className="h-7 min-w-[40px] max-w-full flex-1 bg-transparent px-1 text-sm focus:outline-none"
            style={{ width: Math.max(40, s.text.length * 7.5) }}
            aria-label={isFirst ? undefined : 'Text after the automatic part'}
          />
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- headline words

export function WordsDialog({ open, onClose, value, onSave }: { open: boolean; onClose: () => void; value: HeadlineWord[]; onSave: (w: HeadlineWord[]) => void }) {
  const [words, setWords] = useState<HeadlineWord[]>(value);
  useEffect(() => {
    if (open) setWords(value.map((w) => ({ ...w })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const set = (i: number, p: Partial<HeadlineWord>) => setWords((ws) => ws.map((w, k) => (k === i ? { ...w, ...p } : w)));
  const move = (i: number, d: -1 | 1) =>
    setWords((ws) => {
      const j = i + d;
      if (j < 0 || j >= ws.length) return ws;
      const n = ws.slice();
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  const problem = textProblem({ type: 'words' } as SiteKeyItem, words);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Main headline"
      subtitle="The big title at the top of the home page. Gold words are shown in the brand gold colour."
      size="md"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            disabled={!!problem}
            onClick={() => {
              onSave(words.map((w) => ({ text: w.text.trim(), gold: w.gold })));
              onClose();
            }}
          >
            Use this headline
          </Button>
        </>
      }
    >
      <div className="mb-5 rounded-xl bg-olive-dark px-6 py-8 text-center">
        <p className="font-display text-[34px] leading-tight text-cream">
          {words.map((w, i) => (
            <span key={i} className={w.gold ? 'text-gold' : undefined}>
              {w.text || '…'}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
      <ol className="flex flex-col gap-2">
        {words.map((w, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-5 text-right text-xs text-faint">{i + 1}</span>
            <Input value={w.text} onChange={(e) => set(i, { text: e.target.value.replace(/\s+/g, ' ') })} maxLength={30} aria-label={`Word ${i + 1}`} className="flex-1" />
            <button
              type="button"
              aria-pressed={w.gold}
              onClick={() => set(i, { gold: !w.gold })}
              className={cx('h-9 rounded-lg border px-3 text-[13px] font-medium', w.gold ? 'border-gold bg-gold text-white' : 'border-line-strong bg-white text-muted hover:text-ink')}
            >
              Gold
            </button>
            <IconButton size="sm" label="Move left" onClick={() => move(i, -1)} disabled={i === 0}>
              <LuArrowUp />
            </IconButton>
            <IconButton size="sm" label="Move right" onClick={() => move(i, 1)} disabled={i === words.length - 1}>
              <LuArrowDown />
            </IconButton>
            <IconButton size="sm" label="Remove word" onClick={() => setWords((ws) => ws.filter((_, k) => k !== i))} disabled={words.length <= 1}>
              <LuTrash2 />
            </IconButton>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-center justify-between">
        <Button size="sm" icon={<LuPlus />} disabled={words.length >= 8} onClick={() => setWords((ws) => [...ws, { text: '', gold: false }])}>
          Add a word
        </Button>
        {problem && <span className="text-xs text-danger">{problem}</span>}
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- focal point

export function FocalPicker({ src, focal, onChange }: { src: string; focal: { x: number; y: number }; onChange: (f: { x: number; y: number }) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const pick = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    onChange({ x: Math.round(((e.clientX - r.left) / r.width) * 100), y: Math.round(((e.clientY - r.top) / r.height) * 100) });
  };
  return (
    <div className="flex flex-col gap-2">
      <div ref={ref} onClick={pick} className="relative cursor-crosshair overflow-hidden rounded-lg border border-line" role="button" aria-label="Click the most important part of the photo">
        <img src={src} alt="" className="block w-full" draggable={false} />
        <span
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_2px_rgb(0_0_0/0.35)]"
          style={{ left: `${focal.x}%`, top: `${focal.y}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['16/9', '1/1', '3/4'].map((r) => (
          <div key={r} className="overflow-hidden rounded-md border border-line bg-sand" style={{ aspectRatio: r }}>
            <img src={src} alt="" className="h-full w-full object-cover" style={{ objectPosition: `${focal.x}% ${focal.y}%` }} />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">Click the most important part of the photo. On narrow screens the photo is cropped around it.</p>
    </div>
  );
}

const DOT: Record<Exclude<FieldState, null>, { cls: string; title: string }> = {
  unsaved: { cls: 'bg-warn', title: 'Changed, not saved yet' },
  draft: { cls: 'bg-gold', title: 'Saved as a draft, not on the website yet' },
  live: { cls: 'bg-olive', title: 'Changed from the original, live on the website' },
};
function StateDot({ state }: { state: FieldState }) {
  if (!state) return null;
  return <span className={cx('h-1.5 w-1.5 shrink-0 rounded-full', DOT[state].cls)} title={DOT[state].title} />;
}

// ---------------------------------------------------------------- one field in "All texts"

export function SiteField({
  item,
  value,
  changed,
  state,
  focused,
  visible,
  onChange,
  onReset,
  onFocus,
  onOpenWords,
  lang,
}: {
  item: SiteKeyItem;
  value: unknown;
  changed: boolean;
  state: FieldState;
  focused: boolean;
  visible: boolean;
  onChange: (v: unknown) => void;
  onReset: () => void;
  onFocus: () => void;
  onOpenWords: () => void;
  lang: CmsLang;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = 'f-' + item.key.replace(/[^a-z0-9]/gi, '-');
  useEffect(() => {
    if (focused) {
      ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const el = ref.current?.querySelector<HTMLElement>('input,textarea,button');
      el?.focus({ preventScroll: true });
    }
  }, [focused]);
  const problem = item.type !== 'image' && value !== null && value !== undefined ? textProblem(item, value as never) : null;
  const def = item.type === 'image' ? null : item.default;
  const str = typeof value === 'string' ? value : '';
  return (
    <div ref={ref} className={cx('rounded-xl border bg-white p-3 transition-shadow', focused ? 'border-gold shadow-[0_0_0_3px_rgb(184_138_42/0.18)]' : 'border-line')}>
      <div className="mb-1.5 flex items-center gap-1.5">
        <StateDot state={state} />
        <label htmlFor={id} className="min-w-0 flex-1 truncate text-[12px] font-medium text-muted" title={item.key}>
          {humanizeKey(item.key)}
        </label>
        {!visible && <LuEyeOff className="shrink-0 text-faint" title="Not visible in the preview (for example inside a closed pop-up) — edit it here" />}
        {item.usage.length > 1 && (
          <span className="shrink-0 rounded bg-info-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-info" title={'Also changes:\n' + item.usage.join('\n')}>
            Used in {item.usage.length} places
          </span>
        )}
      </div>
      {item.type === 'words' ? (
        <button type="button" id={id} onFocus={onFocus} onClick={onOpenWords} className="group flex w-full items-center gap-2 rounded-lg border border-line-strong bg-white px-3 py-2 text-left hover:border-olive">
          <span className="flex-1 font-display text-[17px] text-olive-dark">
            {(Array.isArray(value) ? (value as HeadlineWord[]) : []).map((w, i) => (
              <span key={i} className={w.gold ? 'text-gold' : undefined}>
                {w.text}{' '}
              </span>
            ))}
          </span>
          <LuPencil className="text-muted group-hover:text-olive" />
        </button>
      ) : item.type === 'number' ? (
        <Input
          id={id}
          type="number"
          min={0}
          step={1}
          value={typeof value === 'number' ? value : ''}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value === '' ? NaN : Math.floor(Number(e.target.value)))}
          invalid={!!problem}
          className="w-44"
        />
      ) : item.tokens?.length ? (
        <TemplateInput id={id} value={str} onChange={onChange} onFocus={onFocus} />
      ) : str.length > 70 || (typeof def === 'string' && def.length > 70) ? (
        <Textarea id={id} value={str} onFocus={onFocus} onChange={(e) => onChange(e.target.value.replace(/\n/g, ' '))} rows={3} invalid={!!problem} />
      ) : (
        <Input id={id} value={str} onFocus={onFocus} onChange={(e) => onChange(e.target.value)} invalid={!!problem} />
      )}
      {problem && <p className="mt-1.5 text-xs text-danger">{problem}</p>}
      {changed && (
        <div className="mt-2 flex items-start gap-2">
          <p className="line-clamp-2 flex-1 text-[11.5px] leading-snug text-faint">
            <span className="font-medium">Original ({lang === 'en' ? 'EN' : 'BM'}):</span>{' '}
            {Array.isArray(def) ? (def as HeadlineWord[]).map((w) => w.text).join(' ') : String(def ?? '')}
          </p>
          <button type="button" onClick={onReset} className="inline-flex shrink-0 items-center gap-1 text-[11.5px] font-medium text-olive hover:underline">
            <LuRotateCcw /> Reset to original
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- photo spot

export function ImageSpotField({
  spotKey,
  spot,
  value,
  changed,
  state,
  focused,
  onChange,
  onReset,
  onFocus,
  pickerOpen,
  setPickerOpen,
}: {
  spotKey: string;
  spot: ImageSpot | undefined;
  value: ImageEdit | null;
  changed: boolean;
  state: FieldState;
  focused: boolean;
  onChange: (v: ImageEdit) => void;
  onReset: () => void;
  onFocus: () => void;
  pickerOpen: boolean;
  setPickerOpen: (o: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [focalOpen, setFocalOpen] = useState(false);
  useEffect(() => {
    if (focused) ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [focused]);
  useMedia(); // keeps the library loaded so the cut-out check below knows each photo's transparency
  const thumb = value ? variantUrl(value.media, 480) : spot?.default.url ?? '';
  const alpha = value ? (value.hasAlpha ?? mediaStore.get(value.media.id)?.hasAlpha) : undefined;
  const noAlpha = !!spot?.needsAlpha && !!value && alpha === false;
  return (
    <div ref={ref} className={cx('rounded-xl border bg-white p-3', focused ? 'border-gold shadow-[0_0_0_3px_rgb(184_138_42/0.18)]' : 'border-line')}>
      <div className="mb-2 flex items-center gap-1.5">
        <StateDot state={state} />
        <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-muted" title={spotKey}>
          {spot?.label ?? humanizeKey(spotKey)}
        </span>
        {spot?.needsAlpha && <span className="rounded bg-sand px-1.5 py-0.5 text-[10.5px] text-muted" title="This spot shows a cut-out (transparent background)">Cut-out</span>}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onFocus={onFocus}
          onClick={() => setPickerOpen(true)}
          className={cx('group relative h-24 w-28 shrink-0 overflow-hidden rounded-lg border border-line', spot?.needsAlpha ? 'avo-checker' : 'bg-sand')}
          aria-label="Replace photo"
        >
          {thumb ? <img src={thumb} alt="" className={cx('h-full w-full', spot?.needsAlpha ? 'object-contain p-1' : 'object-cover')} /> : <LuImagePlus className="m-auto text-xl text-faint" />}
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-[12px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">Replace</span>
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Input
            value={value?.alt ?? ''}
            disabled={!value}
            onFocus={onFocus}
            onChange={(e) => value && onChange({ ...value, alt: e.target.value })}
            placeholder={value ? 'Describe the photo' : 'Original photo'}
            aria-label="Photo description"
            className="h-8 text-[13px]"
          />
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <button type="button" className="text-[12px] font-medium text-olive hover:underline" onClick={() => setPickerOpen(true)}>
              Replace
            </button>
            {value && !spot?.needsAlpha && (
              <button type="button" className="text-[12px] font-medium text-olive hover:underline" onClick={() => setFocalOpen(true)}>
                Focus point
              </button>
            )}
            {changed && (
              <button type="button" className="inline-flex items-center gap-1 text-[12px] font-medium text-olive hover:underline" onClick={onReset}>
                <LuRotateCcw /> Original
              </button>
            )}
          </div>
        </div>
      </div>
      {value && spot && value.media.width < spot.default.width && (
        <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-warn-soft px-2.5 py-2 text-[12px] leading-snug text-warn">
          <LuTriangleAlert className="mt-0.5 shrink-0" />
          This photo is only {value.media.width} px wide; the original here is {spot.default.width} px, so it may look blurry. A photo at least {spot.default.width} px wide works best.
        </p>
      )}
      {noAlpha && (
        <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-warn-soft px-2.5 py-2 text-[12px] leading-snug text-warn">
          <LuTriangleAlert className="mt-0.5 shrink-0" />
          This spot is designed for a cut-out picture (no background, like the original bottle). This photo has a background, so it will show as a rectangle.
        </p>
      )}
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        initial={value ? [value.media.id] : []}
        note={spot?.needsAlpha ? 'Use a PNG with a transparent background for this spot.' : spot ? `Original size: ${spot.default.width} × ${spot.default.height}` : undefined}
        onPick={(items: MediaItem[]) => {
          const m = items[0];
          if (!m) return;
          onChange({
            media: { id: m.id, width: m.width, height: m.height, variants: m.variants, alt: m.alt },
            alt: value?.alt || m.alt.en || '',
            focal: value?.focal,
            hasAlpha: mediaStore.get(m.id)?.hasAlpha ?? m.hasAlpha,
          });
        }}
      />
      {value && (
        <Modal
          open={focalOpen}
          onClose={() => setFocalOpen(false)}
          title="Focus point"
          size="md"
          footer={
            <Button variant="primary" onClick={() => setFocalOpen(false)}>
              Done
            </Button>
          }
        >
          <FocalPicker src={variantUrl(value.media, 960)} focal={value.focal ?? { x: 50, y: 50 }} onChange={(focal) => onChange({ ...value, focal })} />
        </Modal>
      )}
    </div>
  );
}
