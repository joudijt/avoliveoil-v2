import { useId, type ReactNode } from 'react';
import { LuArrowDown, LuArrowUp, LuCircleAlert, LuCircleCheck, LuPlus, LuTrash2 } from 'react-icons/lu';
import type { CmsLang, Localized, StoreKey, Widget } from '../../../../cms/contracts';
import { newId, updateWidgetSettings } from '../../../../cms/doc';
import { variantUrl, type MediaItem } from '../../../api';
import { cx } from '../../../lib/cx';
import { Button, Field, IconButton, Input, Select } from '../../../ui/ui';
import { useBuilder } from '../context';
import { highlightStatus } from '../readiness';
import { CtaButtonsField } from './CtaButtons';
import { PHOTO_NEED_BOXED, PHOTO_NEED_FULL, setLoc, type Tab } from './shared';
import { ChoiceField, FormPickerField, Group, IconPicker, ItemList, LocField, MediaField, NumberField } from './fields';
import { STORE_KEYS, STORES, sameLoc } from './stores';

type LandingWidget = Extract<Widget, { type: 'heroForm' | 'cards' | 'steps' | 'ctaBand' | 'badges' | 'reviews' | 'stores' }>;

const LANG_NAME: Record<CmsLang, string> = { en: 'English', ms: 'Bahasa Melayu' };
const empty = (): Localized => ({ en: '', ms: '' });
/** set one language of a Localized that may be missing (optional fields) */
const withLang = (cur: Localized | undefined, lang: CmsLang, v: string): Localized => ({ en: cur?.en ?? '', ms: cur?.ms ?? '', [lang]: v });

/** Content / Style for the seven ad-landing widgets (LP-SPEC §5). Visibility lives in ElementSettings. */
export function LandingWidgetSettings({ w, tab }: { w: LandingWidget; tab: Tab }) {
  const { commit, lang } = useBuilder();
  const set = (patch: Record<string, unknown>, key?: string) => commit((d) => updateWidgetSettings(d, w.id, patch), key ? `${w.id}.${key}` : undefined);
  const text = (field: string) => (v: string) => commit((d) => setLoc(d, w.id, field, lang, v), `${w.id}.${field}.${lang}`);
  const sectionNote = (what: string) => (
    <Group>
      <p className="text-sm text-muted">{what} follow the colours of their section — change them in the section’s Style tab.</p>
    </Group>
  );

  switch (w.type) {
    case 'heroForm': {
      const s = w.settings;
      if (tab === 'style')
        return (
          <Group title="Background">
            <ChoiceField
              label="Look"
              value={s.tone}
              onChange={(tone) => set({ tone })}
              options={[
                { value: 'dark', label: 'Dark olive' },
                { value: 'light', label: 'Light cream' },
              ]}
              hint={s.tone === 'dark' ? 'White text on dark olive, or on your photo below.' : 'Dark text on a cream background. The photo is not used.'}
            />
            {s.tone === 'dark' ? (
              <>
                <MediaField
                  label="Background photo (optional)"
                  value={s.media}
                  minWidth={PHOTO_NEED_FULL}
                  hint={s.media ? undefined : 'Without a photo the background is dark olive.'}
                  onChange={(media) => set({ media })}
                />
                {s.media != null && <OverlayField media={s.media} value={s.overlay} onChange={(overlay) => set({ overlay }, 'overlay')} />}
              </>
            ) : (
              s.media != null && (
                <div className="flex items-start gap-2 rounded-lg bg-warn-soft px-3 py-2 text-xs leading-snug text-warn">
                  <span className="flex-1">A background photo is still chosen but the light look does not show it.</span>
                  <button type="button" className="font-semibold underline" onClick={() => set({ media: undefined })}>
                    Remove it
                  </button>
                </div>
              )
            )}
          </Group>
        );
      return (
        <>
          <Group title="Headline">
            <LocField label="Small text above (optional)" value={s.kicker} onChange={text('kicker')} maxLength={80} />
            <LocField label="Main title" value={s.title} onChange={text('title')} multiline rows={2} maxLength={160} hint="The page’s main title (H1) — the words people searched for go first." />
            <HighlightField title={s.title} value={s.highlight} onChange={text('highlight')} />
            <LocField label="Text under the title" value={s.sub} onChange={text('sub')} multiline rows={3} maxLength={400} />
          </Group>
          <Group title="Buttons" aside={<Count n={s.buttons.length} max={3} />}>
            <CtaButtonsField buttons={s.buttons} onChange={(buttons) => set({ buttons }, 'buttons')} />
          </Group>
          <Group title="Ticks under the buttons" aside={<Count n={s.chips.length} max={6} />}>
            <ChipsField items={s.chips} onChange={(chips) => set({ chips }, 'chips')} max={6} />
          </Group>
          <Group title="Form card">
            <FormPickerField
              value={s.formId}
              onChange={(formId) => set({ formId })}
              emptyNote="Without a form, the card is left out on the website and the text uses the full width."
            />
            <LocField label="Card title" value={s.formTitle} onChange={text('formTitle')} maxLength={120} />
            <LocField label="Card text (optional)" value={s.formSub} onChange={text('formSub')} multiline rows={2} maxLength={240} />
          </Group>
        </>
      );
    }

    case 'cards': {
      const s = w.settings;
      if (tab === 'style')
        return (
          <Group>
            <ChoiceField
              label="Cards per row"
              value={s.columns}
              onChange={(columns) => set({ columns })}
              options={[2, 3, 4].map((n) => ({ value: n as 2 | 3 | 4, label: String(n) }))}
              hint={s.mediaSide !== 'none' ? 'With a photo beside them, the cards use 2 per row on computers.' : 'Phones always show one card per row.'}
            />
            <ChoiceField
              label="Photo"
              value={s.mediaSide}
              onChange={(mediaSide) => set({ mediaSide })}
              options={[
                { value: 'none', label: 'No photo' },
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' },
              ]}
            />
            {s.mediaSide !== 'none' && s.media == null && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">Choose the photo in the Content tab, or set Photo to “No photo”.</p>}
          </Group>
        );
      return (
        <>
          <HeaderFields kicker={s.kicker} title={s.title} sub={s.sub} text={text} />
          <Group title="Cards" aside={<Count n={s.items.length} max={12} />}>
            <ItemList
              items={s.items}
              onChange={(items) => set({ items }, 'items')}
              title={(it) => it.title[lang] || it.title.en}
              addLabel="Add a card"
              min={1}
              max={12}
              make={(): (typeof s.items)[number] => ({ id: newId('i'), icon: 'check', title: empty(), text: empty() })}
              render={(it, update) => (
                <>
                  <IconPicker value={it.icon} onChange={(icon) => update({ icon })} />
                  <LocField label="Title" value={it.title} onChange={(v) => update({ title: withLang(it.title, lang, v) })} maxLength={80} />
                  <LocField label="Text" value={it.text} onChange={(v) => update({ text: withLang(it.text, lang, v) })} multiline rows={3} maxLength={300} />
                </>
              )}
            />
          </Group>
          <PhotoWithAlt
            title="Photo beside the cards (optional)"
            media={s.media}
            alt={s.mediaAlt}
            onAlt={text('mediaAlt')}
            onMedia={(media, item) => {
              const patch: Record<string, unknown> = { media };
              if (media == null) patch.mediaAlt = empty();
              else {
                if (item && !s.mediaAlt.en && !s.mediaAlt.ms) patch.mediaAlt = { en: item.alt.en, ms: item.alt.ms };
                // a photo nobody can see would be confusing: show it on the right by default
                if (s.mediaSide === 'none') patch.mediaSide = 'right';
              }
              set(patch);
            }}
            note={s.media != null && s.mediaSide === 'none' ? 'The photo is hidden: choose Left or Right in the Style tab.' : undefined}
          />
        </>
      );
    }

    case 'steps': {
      const s = w.settings;
      if (tab === 'style') return sectionNote('Steps');
      return (
        <>
          <HeaderFields kicker={s.kicker} title={s.title} sub={s.sub} text={text} />
          <Group title="Steps" aside={<Count n={s.items.length} max={12} />}>
            <ItemList
              items={s.items}
              onChange={(items) => set({ items }, 'items')}
              title={(it, i) => `${i + 1}. ${it.title[lang] || it.title.en}`}
              addLabel="Add a step"
              min={1}
              max={12}
              make={() => ({ id: newId('i'), title: empty(), text: empty() })}
              render={(it, update) => (
                <>
                  <LocField label="Title" value={it.title} onChange={(v) => update({ title: withLang(it.title, lang, v) })} maxLength={80} />
                  <LocField label="Text" value={it.text} onChange={(v) => update({ text: withLang(it.text, lang, v) })} multiline rows={3} maxLength={300} />
                </>
              )}
            />
          </Group>
          <PhotoWithAlt
            title="Photo beside the steps (optional)"
            media={s.media}
            alt={s.mediaAlt}
            onAlt={text('mediaAlt')}
            onMedia={(media, item) => {
              const patch: Record<string, unknown> = { media };
              if (media == null) patch.mediaAlt = empty();
              else if (item && !s.mediaAlt.en && !s.mediaAlt.ms) patch.mediaAlt = { en: item.alt.en, ms: item.alt.ms };
              set(patch);
            }}
          />
        </>
      );
    }

    case 'ctaBand': {
      const s = w.settings;
      if (tab === 'style')
        return (
          <Group>
            <SwatchField
              label="Colour"
              value={s.tone}
              onChange={(tone) => set({ tone })}
              options={[
                { value: 'olive', label: 'Olive', swatch: '#556b2f' },
                { value: 'dark', label: 'Dark olive', swatch: '#2e3a24' },
                { value: 'gold', label: 'Gold', swatch: '#b88a2a' },
                { value: 'cream', label: 'Cream', swatch: '#fffdf8' },
              ]}
            />
            <IconPicker label="Icon above the title" value={s.icon} onChange={(icon) => set({ icon })} allowNone />
          </Group>
        );
      return (
        <>
          <Group>
            <LocField label="Title" value={s.title} onChange={text('title')} multiline rows={2} maxLength={160} />
            <LocField label="Text (optional)" value={s.sub} onChange={text('sub')} multiline rows={2} maxLength={300} />
          </Group>
          <Group title="Buttons" aside={<Count n={s.buttons.length} max={3} />}>
            <CtaButtonsField buttons={s.buttons} onChange={(buttons) => set({ buttons }, 'buttons')} />
          </Group>
        </>
      );
    }

    case 'badges': {
      const s = w.settings;
      if (tab === 'style') return sectionNote('Badges');
      return (
        <>
          <HeaderFields kicker={s.kicker} title={s.title} sub={s.sub} text={text} />
          <Group title="Badges" aside={<Count n={s.items.length} max={12} />}>
            <ItemList
              items={s.items}
              onChange={(items) => set({ items }, 'items')}
              title={(it) => it.title[lang] || it.title.en}
              addLabel="Add a badge"
              min={1}
              max={12}
              make={(): (typeof s.items)[number] => ({ id: newId('i'), icon: 'award', title: empty() })}
              render={(it, update) => (
                <>
                  <IconPicker value={it.icon} onChange={(icon) => update({ icon })} />
                  <LocField label="Title" value={it.title} onChange={(v) => update({ title: withLang(it.title, lang, v) })} maxLength={60} />
                  <LocField label="Small text (optional)" value={it.text} onChange={(v) => update({ text: withLang(it.text, lang, v) })} maxLength={120} />
                </>
              )}
            />
          </Group>
        </>
      );
    }

    case 'reviews': {
      const s = w.settings;
      if (tab === 'style') return sectionNote('Reviews');
      return (
        <>
          <HeaderFields kicker={s.kicker} title={s.title} sub={s.sub} text={text} subOptional />
          <Group title="Numbers (optional)" aside={<Count n={s.stats.length} max={4} />}>
            <p className="-mt-1 text-xs leading-snug text-muted">Only numbers you can back up, with who says so — e.g. “est. 2010” for Berkat Madinah Store.</p>
            <ItemList
              items={s.stats}
              onChange={(stats) => set({ stats }, 'stats')}
              title={(it) => [it.value[lang] || it.value.en, it.label[lang] || it.label.en].filter(Boolean).join(' — ')}
              addLabel="Add a number"
              max={4}
              make={() => ({ id: newId('i'), value: empty(), label: empty() })}
              render={(it, update) => (
                <>
                  <LocField label="Number" value={it.value} onChange={(v) => update({ value: withLang(it.value, lang, v) })} maxLength={20} placeholder="e.g. 2010" />
                  <LocField label="What it means" value={it.label} onChange={(v) => update({ label: withLang(it.label, lang, v) })} maxLength={60} />
                </>
              )}
            />
          </Group>
          <Group title="Reviews" aside={<Count n={s.items.length} max={12} />}>
            <p className="-mt-1 text-xs leading-snug text-muted">Use real customers’ words, as they wrote them.</p>
            <ItemList
              items={s.items}
              onChange={(items) => set({ items }, 'items')}
              title={(it) => it.name[lang] || it.name.en || (it.quote[lang] || it.quote.en).slice(0, 40)}
              addLabel="Add a review"
              min={1}
              max={12}
              make={() => ({ id: newId('q'), quote: empty(), name: empty(), place: empty() })}
              render={(it, update) => (
                <>
                  <LocField label="What they said" value={it.quote} onChange={(v) => update({ quote: withLang(it.quote, lang, v) })} multiline rows={4} maxLength={600} />
                  <LocField label="Name" value={it.name} onChange={(v) => update({ name: withLang(it.name, lang, v) })} maxLength={80} />
                  <LocField label="Town or country (optional)" value={it.place} onChange={(v) => update({ place: withLang(it.place, lang, v) })} maxLength={80} />
                </>
              )}
            />
          </Group>
        </>
      );
    }

    case 'stores': {
      const s = w.settings;
      if (tab === 'style') return sectionNote('Shop cards');
      const dupes = STORE_KEYS.filter((k) => s.items.filter((i) => i.store === k).length > 1);
      return (
        <>
          <HeaderFields kicker={s.kicker} title={s.title} sub={s.sub} text={text} />
          <Group title="Shops" aside={<Count n={s.items.length} max={3} />}>
            <p className="-mt-1 text-xs leading-snug text-muted">Each card’s button opens that shop in a new tab. The shop addresses are fixed — only the texts change here.</p>
            <ItemList
              items={s.items}
              onChange={(items) => set({ items }, 'items')}
              title={(it) => STORES[it.store].name}
              addLabel={s.items.length >= 3 ? 'All three shops are listed' : 'Add a shop'}
              min={1}
              max={3}
              make={() => {
                const store = STORE_KEYS.find((k) => !s.items.some((i) => i.store === k)) ?? 'madinah';
                return { id: newId('i'), store, title: { en: STORES[store].name, ms: STORES[store].name }, text: empty(), button: { ...STORES[store].cardButton } };
              }}
              render={(it, update) => (
                <>
                  <Field label="Shop">
                    <Select
                      value={it.store}
                      aria-label="Shop"
                      onChange={(e) => {
                        const store = e.target.value as StoreKey;
                        const old = STORES[it.store];
                        // starting texts follow the shop; the owner's own words stay
                        update({
                          store,
                          title: sameLoc(it.title, { en: old.name, ms: old.name }) ? { en: STORES[store].name, ms: STORES[store].name } : it.title,
                          button: sameLoc(it.button, old.cardButton) ? { ...STORES[store].cardButton } : it.button,
                        });
                      }}
                    >
                      {STORE_KEYS.map((k) => (
                        <option key={k} value={k}>
                          {STORES[k].name}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <LocField label="Title" value={it.title} onChange={(v) => update({ title: withLang(it.title, lang, v) })} maxLength={60} />
                  <LocField label="Text (optional)" value={it.text} onChange={(v) => update({ text: withLang(it.text, lang, v) })} multiline rows={2} maxLength={200} />
                  <LocField label="Button text" value={it.button} onChange={(v) => update({ button: withLang(it.button, lang, v) })} maxLength={40} />
                </>
              )}
            />
            {dupes.length > 0 && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">{dupes.map((k) => STORES[k].name).join(' and ')} is listed twice.</p>}
          </Group>
        </>
      );
    }

    default: {
      const never: never = w;
      void never;
      return null;
    }
  }
}

// ---------------------------------------------------------------- pieces

function Count({ n, max }: { n: number; max: number }) {
  return <span className={cx('whitespace-nowrap text-xs', n >= max ? 'font-medium text-ink' : 'text-muted')}>{n} of {max}</span>;
}

function HeaderFields({ kicker, title, sub, text, subOptional }: { kicker?: Localized; title: Localized; sub?: Localized; text: (f: string) => (v: string) => void; subOptional?: boolean }) {
  return (
    <Group title="Heading">
      <LocField label="Small text above (optional)" value={kicker} onChange={text('kicker')} maxLength={80} />
      <LocField label="Title" value={title} onChange={text('title')} maxLength={160} />
      <LocField label={subOptional ? 'Text under the title (optional)' : 'Text under the title'} value={sub} onChange={text('sub')} multiline rows={2} maxLength={400} />
    </Group>
  );
}

/** Photo + its description; removing the photo also clears the description (LP-SPEC §8 M9). */
function PhotoWithAlt({
  title,
  media,
  alt,
  onMedia,
  onAlt,
  note,
}: {
  title: string;
  media: number | undefined;
  alt: Localized;
  onMedia: (id: number | undefined, item?: MediaItem) => void;
  onAlt: (v: string) => void;
  note?: string;
}) {
  return (
    <Group title={title}>
      <MediaField label="Photo" value={media} onChange={onMedia} minWidth={PHOTO_NEED_BOXED} />
      {media != null && <LocField label="Description (alt text)" value={alt} onChange={onAlt} maxLength={200} hint="What is in the photo — read by Google and screen readers." />}
      {note && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">{note}</p>}
    </Group>
  );
}

function OverlayField({ media: id, value, onChange }: { media: number; value: number; onChange: (v: number) => void }) {
  const { media } = useBuilder();
  const m = media[String(id)];
  return (
    <>
      <NumberField label="Darken the photo" value={value} min={0} max={80} step={5} suffix="%" onChange={onChange} hint="Makes the white title easier to read on a busy photo." />
      {m && (
        <div className="relative h-20 overflow-hidden rounded-lg">
          <img src={variantUrl(m, 480)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black" style={{ opacity: value / 100 }} />
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-white">Preview</span>
        </div>
      )}
    </>
  );
}

/**
 * The words of the title painted gold. Checked live against the title in the language being
 * edited: the website only paints them when they appear in the title exactly (capitals too).
 */
function HighlightField({ title, value, onChange }: { title: Localized; value: Localized; onChange: (v: string) => void }) {
  const { lang } = useBuilder();
  const other: CmsLang = lang === 'en' ? 'ms' : 'en';
  const status = highlightStatus(title[lang], value[lang]);
  const otherStatus = highlightStatus(title[other], value[other]);
  const message: Record<typeof status, ReactNode> = {
    empty: <span className="text-muted">Optional. Copy a few words from the title to paint them gold.</span>,
    found: (
      <span className="flex items-center gap-1 text-ok">
        <LuCircleCheck className="shrink-0" /> Found in the title — shown in gold.
      </span>
    ),
    case: (
      <span className="flex items-center gap-1 text-warn">
        <LuCircleAlert className="shrink-0" /> Found, but the capital letters differ. Copy the words exactly as in the title.
      </span>
    ),
    missing: (
      <span className="flex items-center gap-1 text-warn">
        <LuCircleAlert className="shrink-0" /> Not found in the title, so nothing is gold. Copy the words exactly as in the title.
      </span>
    ),
  };
  return (
    <LocField
      label="Gold words in the title (optional)"
      value={value}
      onChange={onChange}
      optionalTranslation
      maxLength={80}
      hint={
        <span className="flex flex-col gap-0.5">
          {message[status]}
          {(otherStatus === 'missing' || otherStatus === 'case') && <span className="text-warn">The {LANG_NAME[other]} gold words are not in the {LANG_NAME[other]} title.</span>}
        </span>
      }
    />
  );
}

/** Short texts with a tick (hero chips): one input per row, current language. */
function ChipsField({ items, onChange, max }: { items: { id: string; text: Localized }[]; onChange: (v: { id: string; text: Localized }[]) => void; max: number }) {
  const { lang } = useBuilder();
  const other: CmsLang = lang === 'en' ? 'ms' : 'en';
  const baseId = useId();
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
        const missing = lang === 'ms' && !it.text.ms.trim() && !!it.text.en.trim();
        return (
          <div key={it.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-[11px] text-olive" aria-hidden>
                ✓
              </span>
              <Input
                id={`${baseId}-${i}`}
                aria-label={`Tick ${i + 1}`}
                value={it.text[lang]}
                maxLength={60}
                invalid={missing}
                placeholder={missing ? 'Needs translation' : undefined}
                onChange={(e) => onChange(items.map((x) => (x.id === it.id ? { ...x, text: { ...x.text, [lang]: e.target.value } } : x)))}
                className="min-w-0 flex-1"
              />
              <IconButton size="sm" label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
                <LuArrowUp />
              </IconButton>
              <IconButton size="sm" label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
                <LuArrowDown />
              </IconButton>
              <IconButton size="sm" label="Remove" onClick={() => onChange(items.filter((x) => x.id !== it.id))} className="hover:!text-danger">
                <LuTrash2 />
              </IconButton>
            </div>
            {it.text[other].trim() && (
              <p className="truncate pl-6 text-[11.5px] leading-snug text-faint" title={it.text[other]}>
                <span className="font-medium">{LANG_NAME[other]}:</span> {it.text[other]}
              </p>
            )}
          </div>
        );
      })}
      {!items.length && <p className="text-xs text-muted">No ticks — the hero shows only the title, text and buttons.</p>}
      <Button icon={<LuPlus />} disabled={items.length >= max} onClick={() => onChange([...items, { id: newId('i'), text: empty() }])}>
        {items.length >= max ? `Up to ${max} ticks` : 'Add a tick'}
      </Button>
    </div>
  );
}

function SwatchField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string; swatch: string }[] }) {
  return (
    <Field label={label} aside={options.find((o) => o.value === value)?.label}>
      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cx(
              'flex flex-col items-center gap-1.5 rounded-lg border p-2 text-[11.5px]',
              value === o.value ? 'border-olive bg-mist text-ink' : 'border-line bg-white text-muted hover:border-line-strong'
            )}
          >
            <span className="h-7 w-full rounded border border-line" style={{ background: o.swatch }} />
            {o.label}
          </button>
        ))}
      </div>
    </Field>
  );
}
