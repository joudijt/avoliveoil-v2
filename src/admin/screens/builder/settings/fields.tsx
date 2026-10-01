import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuArrowDown,
  LuArrowUp,
  LuBan,
  LuExternalLink,
  LuGripVertical,
  LuImagePlus,
  LuLink,
  LuMonitor,
  LuPlus,
  LuSmartphone,
  LuTablet,
  LuTrash2,
  LuTriangleAlert,
  LuX,
} from 'react-icons/lu';
import { CMS_ICONS, type Align, type CmsIcon, type CmsLang, type HideOn, type Localized, type TextColor } from '../../../../cms/contracts';
import { linkProblem } from './linkRules';
import { api, variantUrl, type MediaItem } from '../../../api';
import { toastError } from '../../../lib/bus';
import { cx } from '../../../lib/cx';
import { MediaPicker } from '../../media/MediaPicker';
import { useBuilder } from '../context';
import { Button, Field, IconButton, Input, Segmented, Select, Switch, Textarea } from '../../../ui/ui';
import { CMS_ICON_VIEW } from '../cmsIcons';

const LANG_NAME: Record<CmsLang, string> = { en: 'English', ms: 'Bahasa Melayu' };

/** A heading for a group of settings inside a tab. */
export function Group({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="border-b border-line px-4 py-4 last:border-b-0">
      {(title || aside) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">{title}</h3>}
          {aside}
        </div>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

/**
 * One language of a Localized value. The current builder language is edited; the other
 * language is shown underneath as a reference so translating never needs a tab switch.
 */
export function LocField({
  label,
  value,
  onChange,
  multiline,
  placeholder,
  maxLength,
  hint,
  rows = 3,
  optionalTranslation,
}: {
  label: string;
  value: Localized | undefined;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  hint?: ReactNode;
  rows?: number;
  /** decoration that may stay untranslated (excluded from the "needs translation" count) */
  optionalTranslation?: boolean;
}) {
  const { lang } = useBuilder();
  const id = useId();
  const other: CmsLang = lang === 'en' ? 'ms' : 'en';
  const cur = value?.[lang] ?? '';
  const ref = value?.[other] ?? '';
  const missing = !optionalTranslation && lang === 'ms' && !cur.trim() && !!ref.trim();
  return (
    <Field
      label={label}
      htmlFor={id}
      aside={
        missing ? (
          <span className="rounded bg-warn-soft px-1.5 py-0.5 text-[10.5px] font-semibold text-warn">Needs translation</span>
        ) : (
          <span className="text-[10.5px] font-semibold uppercase text-faint">{lang === 'en' ? 'EN' : 'BM'}</span>
        )
      }
      hint={hint}
    >
      {multiline ? (
        <Textarea id={id} value={cur} rows={rows} placeholder={placeholder} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input id={id} value={cur} placeholder={placeholder} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} />
      )}
      {ref.trim() && (
        <p className="line-clamp-2 text-[11.5px] leading-snug text-faint" title={ref}>
          <span className="font-medium">{LANG_NAME[other]}:</span> {ref}
        </p>
      )}
    </Field>
  );
}

export function AlignField({ value, onChange, label = 'Alignment' }: { value: Align; onChange: (v: Align) => void; label?: string }) {
  return (
    <Field label={label}>
      <Segmented
        value={value}
        onChange={onChange}
        ariaLabel={label}
        options={[
          { value: 'start', label: <LuAlignLeft />, title: 'Left' },
          { value: 'center', label: <LuAlignCenter />, title: 'Centre' },
          { value: 'end', label: <LuAlignRight />, title: 'Right' },
        ]}
      />
    </Field>
  );
}

export function ChoiceField<T extends string | number>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: ReactNode; title?: string }[];
  hint?: ReactNode;
}) {
  return (
    <Field label={label} hint={hint}>
      <Segmented value={value} onChange={onChange} options={options} ariaLabel={label} className="flex-wrap" />
    </Field>
  );
}

const COLORS: { value: TextColor; label: string; swatch: string }[] = [
  { value: 'default', label: 'Default', swatch: '#3a3f33' },
  { value: 'olive-dark', label: 'Dark olive', swatch: '#2e3a24' },
  { value: 'olive', label: 'Olive', swatch: '#556b2f' },
  { value: 'gold', label: 'Gold', swatch: '#b88a2a' },
  { value: 'brown', label: 'Brown', swatch: '#6b4f32' },
  { value: 'white', label: 'White', swatch: '#ffffff' },
];

export function ColorField({ value, onChange, label = 'Colour' }: { value: TextColor; onChange: (v: TextColor) => void; label?: string }) {
  return (
    <Field label={label} aside={COLORS.find((c) => c.value === value)?.label}>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={value === c.value}
            title={c.label}
            onClick={() => onChange(c.value)}
            className={cx(
              'h-8 w-8 rounded-full border transition-shadow',
              value === c.value ? 'ring-2 ring-gold ring-offset-2' : 'hover:ring-2 hover:ring-line-strong hover:ring-offset-1',
              c.value === 'white' ? 'border-line-strong' : 'border-transparent'
            )}
            style={{ background: c.swatch }}
          >
            <span className="sr-only">{c.label}</span>
          </button>
        ))}
      </div>
    </Field>
  );
}

export function HideField({ value, onChange }: { value: HideOn | undefined; onChange: (v: HideOn) => void }) {
  const v = value ?? {};
  const all = v.desktop && v.tablet && v.mobile;
  const row = (k: keyof HideOn, icon: ReactNode, label: string) => (
    <div className="flex items-center gap-2">
      <span className="text-muted">{icon}</span>
      <Switch checked={!!v[k]} onChange={(on) => onChange({ ...v, [k]: on })} label={`Hide on ${label}`} />
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      {row('desktop', <LuMonitor />, 'computers')}
      {row('tablet', <LuTablet />, 'tablets')}
      {row('mobile', <LuSmartphone />, 'phones')}
      {all && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">This is hidden everywhere — visitors will not see it.</p>}
    </div>
  );
}

export function NumberField({ label, value, onChange, min, max, step = 1, suffix, hint }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; suffix?: string; hint?: ReactNode }) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} aside={suffix ? `${value}${suffix}` : undefined}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#556b2f]"
      />
    </Field>
  );
}

// ---------------------------------------------------------------- links

const BUILT_IN_PAGES: { label: string; path: string }[] = [
  { label: 'Home', path: '' },
  { label: 'Products', path: '/products' },
  { label: 'Shop', path: '/shop' },
  { label: 'Why us', path: '/why-us' },
  { label: 'Contact', path: '/contact' },
  { label: 'Blog', path: '/blog' },
];

export function LinkField({ label = 'Link', value, onChange, allowEmpty }: { label?: string; value: string; onChange: (v: string) => void; allowEmpty?: boolean }) {
  const { pages, lang, catalogue } = useBuilder();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => setDraft(value), [value]);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const problem = draft.trim() || !allowEmpty ? linkProblem(draft) : null;
  const options = useMemo(() => {
    const out: { group: string; label: string; href: string }[] = [];
    BUILT_IN_PAGES.forEach((p) => out.push({ group: 'Website pages', label: p.label, href: `/${lang}${p.path}` }));
    (pages ?? []).filter((p) => p.status === 'published').forEach((p) => out.push({ group: 'Your pages', label: p.title[lang] || p.title.en || p.slug, href: `/${lang}/${p.slug}` }));
    (catalogue ?? []).forEach((c) => out.push({ group: 'Products', label: c.name[lang] || c.name.en, href: c.href[lang] || c.href.en }));
    return out;
  }, [pages, lang, catalogue]);
  const commit = (v: string) => {
    setDraft(v);
    onChange(v.trim());
  };
  return (
    <Field label={label} htmlFor={id} error={problem && draft !== '' ? problem : null} hint={!problem ? hrefHint(draft) : undefined}>
      <div ref={box} className="relative">
        <div className="flex gap-1.5">
          <div className="relative flex-1">
            <LuLink className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
            <Input id={id} value={draft} invalid={!!problem && draft !== ''} onChange={(e) => commit(e.target.value)} placeholder="Choose a page or paste https://…" className="pl-9" />
          </div>
          <Button size="md" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            Pages
          </Button>
        </div>
        {open && (
          <div className="avo-in avo-scroll absolute right-0 z-30 mt-1.5 max-h-72 w-full overflow-y-auto rounded-xl border border-line bg-white py-1.5 shadow-[var(--shadow-pop)]">
            {options.map((o, i) => (
              <div key={o.href + i}>
                {(i === 0 || options[i - 1].group !== o.group) && <div className="px-3 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-wide text-faint">{o.group}</div>}
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-[13px] hover:bg-sand"
                  onClick={() => {
                    commit(o.href);
                    setOpen(false);
                  }}
                >
                  <span className="truncate text-ink">{o.label}</span>
                  <span className="shrink-0 text-[11px] text-faint">{o.href}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Field>
  );
}

function hrefHint(v: string): string | undefined {
  if (/^https?:\/\//i.test(v) && !/avoliveoil\.com/i.test(v)) return 'Opens in a new tab (another website).';
  if (v.startsWith('mailto:')) return 'Opens the visitor’s email app.';
  if (v.startsWith('tel:')) return 'Calls this number on phones.';
  if (v.startsWith('#')) return 'Jumps to a section of this page with that anchor name.';
  return undefined;
}

// ---------------------------------------------------------------- media

/** Warns (never blocks) when a photo is narrower than the space it will fill. */
export function SmallPhotoWarning({ width, need }: { width: number; need: number }) {
  if (!width || width >= need) return null;
  return (
    <p className="flex items-start gap-1.5 rounded-lg bg-warn-soft px-2.5 py-2 text-[12px] leading-snug text-warn">
      <LuTriangleAlert className="mt-0.5 shrink-0" />
      This photo is only {width} px wide, but this spot can show it up to {need} px wide, so it may look blurry. A photo at least {need} px wide works best.
    </p>
  );
}

export function MediaField({
  label,
  value,
  onChange,
  hint,
  allowClear = true,
  minWidth,
}: {
  label: string;
  value: number | undefined;
  onChange: (id: number | undefined, item?: MediaItem) => void;
  hint?: ReactNode;
  allowClear?: boolean;
  /** width the photo can be shown at; a narrower photo gets a "may look blurry" warning */
  minWidth?: number;
}) {
  const { media, registerMedia } = useBuilder();
  const [open, setOpen] = useState(false);
  const ref = value != null ? media[String(value)] : undefined;
  return (
    <Field label={label} hint={hint}>
      {ref ? (
        <div className="group relative overflow-hidden rounded-xl border border-line bg-sand">
          <img src={variantUrl(ref, 480)} alt="" className="h-36 w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/35 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <Button size="sm" onClick={() => setOpen(true)}>
              Replace
            </Button>
            {allowClear && (
              <Button size="sm" variant="secondary" icon={<LuX />} onClick={() => onChange(undefined)}>
                Remove
              </Button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-28 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-line-strong bg-white text-muted transition-colors hover:border-olive hover:text-olive"
        >
          <LuImagePlus className="text-xl" />
          <span className="text-[13px] font-medium">Choose a photo</span>
        </button>
      )}
      {ref && minWidth ? <SmallPhotoWarning width={ref.width} need={minWidth} /> : null}
      <MediaPicker
        open={open}
        onClose={() => setOpen(false)}
        initial={value != null ? [value] : []}
        onPick={(items) => {
          if (!items[0]) return;
          registerMedia(items);
          onChange(items[0].id, items[0]);
        }}
      />
    </Field>
  );
}

export function GalleryField({ value, onChange }: { value: number[]; onChange: (ids: number[]) => void }) {
  const { media, registerMedia } = useBuilder();
  const [open, setOpen] = useState(false);
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = value.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <Field label="Photos" hint={value.length ? 'Use the arrows to change the order.' : undefined}>
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((id, i) => {
            const m = media[String(id)];
            return (
              <div key={id + '-' + i} className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-sand">
                {m && <img src={variantUrl(m, 240)} alt="" className="h-full w-full object-cover" />}
                <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/45 p-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  <IconButton size="sm" label="Move earlier" className="text-white hover:bg-white/20 hover:text-white" onClick={() => move(i, -1)} disabled={i === 0}>
                    <LuArrowUp className="-rotate-90" />
                  </IconButton>
                  <IconButton size="sm" label="Remove" className="text-white hover:bg-white/20 hover:text-white" onClick={() => onChange(value.filter((_, k) => k !== i))}>
                    <LuTrash2 />
                  </IconButton>
                  <IconButton size="sm" label="Move later" className="text-white hover:bg-white/20 hover:text-white" onClick={() => move(i, 1)} disabled={i === value.length - 1}>
                    <LuArrowDown className="-rotate-90" />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Button icon={<LuImagePlus />} onClick={() => setOpen(true)}>
        {value.length ? 'Add or change photos' : 'Choose photos'}
      </Button>
      <MediaPicker
        open={open}
        multi
        onClose={() => setOpen(false)}
        initial={value}
        onPick={(items) => {
          registerMedia(items);
          onChange(items.map((m) => m.id));
        }}
      />
    </Field>
  );
}

// ---------------------------------------------------------------- repeatable items

/** Add / remove / reorder rows (FAQ items, icon list items, form fields). */
export function ItemList<T extends { id: string }>({
  items,
  onChange,
  render,
  title,
  make,
  addLabel,
  min = 0,
  max = 50,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  title: (item: T, index: number) => string;
  make: () => T;
  addLabel: string;
  min?: number;
  max?: number;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  // An item appended from outside (e.g. the form editor's "Add field" menu) opens like one added here.
  const prevIds = useRef(items.map((x) => x.id));
  useEffect(() => {
    const prev = prevIds.current;
    prevIds.current = items.map((x) => x.id);
    if (items.length === prev.length + 1 && prev.every((id, i) => items[i]?.id === id)) setOpenId(items[items.length - 1].id);
  }, [items]);
  const update = (id: string, patch: Partial<T>) => onChange(items.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-2">
      {items.map((it, i) => {
        const open = openId === it.id;
        return (
          <div key={it.id} className={cx('rounded-xl border bg-white', open ? 'border-line-strong shadow-[var(--shadow-card)]' : 'border-line')}>
            <div className="flex items-center gap-1 pl-2 pr-1">
              <LuGripVertical className="shrink-0 text-faint" aria-hidden />
              <button type="button" onClick={() => setOpenId(open ? null : it.id)} aria-expanded={open} className="min-w-0 flex-1 truncate py-2.5 pl-1 text-left text-[13px] font-medium text-ink">
                {title(it, i) || <span className="italic text-faint">Empty</span>}
              </button>
              <IconButton size="sm" label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
                <LuArrowUp />
              </IconButton>
              <IconButton size="sm" label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
                <LuArrowDown />
              </IconButton>
              <IconButton size="sm" label="Remove" onClick={() => onChange(items.filter((x) => x.id !== it.id))} disabled={items.length <= min} className="hover:!text-danger">
                <LuTrash2 />
              </IconButton>
            </div>
            {open && <div className="flex flex-col gap-3 border-t border-line px-3 py-3">{render(it, (p) => update(it.id, p), i)}</div>}
          </div>
        );
      })}
      <Button
        icon={<LuPlus />}
        disabled={items.length >= max}
        onClick={() => {
          const n = make();
          onChange([...items, n]);
          setOpenId(n.id);
        }}
      >
        {addLabel}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------- icons

/** Visual grid of every CMS icon; `allowNone` adds a "no icon" choice first. */
export function IconPicker<T extends CmsIcon | 'none'>({ label = 'Icon', value, onChange, allowNone }: { label?: string; value: T; onChange: (v: T) => void; allowNone?: boolean }) {
  const choices = (allowNone ? ['none', ...CMS_ICONS] : [...CMS_ICONS]) as T[];
  return (
    <Field label={label} aside={value === 'none' ? 'No icon' : CMS_ICON_VIEW[value as CmsIcon]?.label}>
      <div className="grid grid-cols-6 gap-1" role="radiogroup" aria-label={label}>
        {choices.map((ic) => {
          const name = ic === 'none' ? 'No icon' : CMS_ICON_VIEW[ic as CmsIcon].label;
          return (
            <button
              key={ic}
              type="button"
              role="radio"
              aria-checked={value === ic}
              aria-label={name}
              title={name}
              onClick={() => onChange(ic)}
              className={cx(
                'flex h-9 items-center justify-center rounded-md text-[16px] transition-colors',
                value === ic ? 'bg-olive text-cream shadow-[var(--shadow-card)]' : 'bg-sand text-muted hover:bg-mist hover:text-ink'
              )}
            >
              {ic === 'none' ? <LuBan className="opacity-70" /> : CMS_ICON_VIEW[ic as CmsIcon].icon}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

// ---------------------------------------------------------------- forms

/** Choose one of the site's forms (+ shortcuts to create or edit one in a new tab). */
export function FormPickerField({ label = 'Form', value, onChange, emptyNote }: { label?: string; value: number | undefined; onChange: (id: number | undefined) => void; emptyNote?: string }) {
  const { formList, reloadForms, registerForm } = useBuilder();
  const [loading, setLoading] = useState(false);
  const choose = async (formId: number | undefined) => {
    onChange(formId);
    if (!formId) return;
    setLoading(true);
    try {
      const f = await api.form(formId);
      registerForm({ id: f.id, def: f.def });
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };
  // When the owner comes back from the "new form" tab, show the new form in the list.
  useEffect(() => {
    const h = () => document.visibilityState === 'visible' && reloadForms();
    document.addEventListener('visibilitychange', h);
    return () => document.removeEventListener('visibilitychange', h);
  }, [reloadForms]);
  const current = formList?.find((f) => f.id === value);
  const missing = value != null && formList != null && !current;
  return (
    <>
      <Field
        label={label}
        error={missing ? 'This form was deleted. Choose another one.' : null}
        hint={current ? `Entries are emailed to ${current.recipients.join(', ')}.` : 'Choose which form visitors fill in.'}
      >
        <Select value={value ?? ''} onChange={(e) => void choose(e.target.value ? Number(e.target.value) : undefined)} disabled={loading}>
          <option value="">— Choose a form —</option>
          {missing && <option value={value}>Deleted form</option>}
          {(formList ?? []).map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </Select>
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" icon={<LuPlus />} onClick={() => window.open('/admin/forms/new', '_blank')}>
          Create a new form
        </Button>
        {current && (
          <Button size="sm" variant="ghost" icon={<LuExternalLink />} onClick={() => window.open(`/admin/forms/${current.id}`, '_blank')}>
            Edit this form
          </Button>
        )}
      </div>
      {!value && emptyNote && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">{emptyNote}</p>}
    </>
  );
}
