import { useEffect, useState, type ReactNode } from 'react';
import {
  LuArrowLeft,
  LuCheck,
  LuClock,
  LuCopy,
  LuDroplet,
  LuExternalLink,
  LuHeart,
  LuLeaf,
  LuMail,
  LuMapPin,
  LuMedal,
  LuPhone,
  LuPlus,
  LuShieldCheck,
  LuSprout,
  LuStar,
  LuTrash2,
  LuTruck,
} from 'react-icons/lu';
import {
  CMS_ICONS,
  type CmsIcon,
  type CmsLang,
  type CmsPageDoc,
  type Localized,
  type Section,
  type SectionBg,
  type Widget,
} from '../../../../cms/contracts';
import { COLUMN_LAYOUTS, findNode, newId, setSectionLayout, setWidgetText, updateSection, updateSectionSettings, updateWidget, updateWidgetSettings } from '../../../../cms/doc';
import { richTextToPlain } from '../../../../cms/sanitize';
import { parseVideoUrl } from '../../../../cms/video';
import { api, variantUrl } from '../../../api';
import { toastError } from '../../../lib/bus';
import { cx } from '../../../lib/cx';
import { Button, Field, Input, Select, Switch, Tabs } from '../../../ui/ui';
import { useBuilder } from '../context';
import { WIDGET_META } from '../widgetMeta';
import { AlignField, ChoiceField, ColorField, GalleryField, Group, HideField, ItemList, LinkField, LocField, MediaField, NumberField } from './fields';
import { RichText } from './RichText';

const ICONS: Record<CmsIcon, ReactNode> = {
  check: <LuCheck />,
  leaf: <LuLeaf />,
  olive: <LuSprout />,
  drop: <LuDroplet />,
  medal: <LuMedal />,
  star: <LuStar />,
  truck: <LuTruck />,
  shield: <LuShieldCheck />,
  heart: <LuHeart />,
  phone: <LuPhone />,
  mail: <LuMail />,
  pin: <LuMapPin />,
  clock: <LuClock />,
};

type Tab = 'content' | 'style' | 'advanced';

/** set one language of a Localized setting, creating the field when it is optional and absent */
function setLoc(d: CmsPageDoc, id: string, field: string, lang: CmsLang, value: string): CmsPageDoc {
  const ref = findNode(d, id);
  if (!ref || ref.kind !== 'widget') return d;
  const cur = (ref.widget.settings as unknown as Record<string, unknown>)[field] as Localized | undefined;
  if (cur && typeof cur === 'object') return setWidgetText(d, id, field, lang, value);
  return updateWidgetSettings(d, id, { [field]: { en: '', ms: '', [lang]: value } });
}

export function ElementSettings({ id, onBack, onDuplicate, onDelete }: { id: string; onBack: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const { doc } = useBuilder();
  const [tab, setTab] = useState<Tab>('content');
  const ref = findNode(doc, id);
  useEffect(() => setTab('content'), [id]);
  if (!ref) return null;
  const title = ref.kind === 'widget' ? WIDGET_META[ref.widget.type].name : ref.kind === 'section' ? 'Section' : 'Column';
  const icon = ref.kind === 'widget' ? WIDGET_META[ref.widget.type].icon : null;
  const tabs: { value: Tab; label: string }[] =
    ref.kind === 'column'
      ? [{ value: 'content', label: 'Layout' }]
      : [
          { value: 'content', label: ref.kind === 'section' ? 'Layout' : 'Content' },
          { value: 'style', label: 'Style' },
          { value: 'advanced', label: 'Advanced' },
        ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <button type="button" onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-sand hover:text-ink" aria-label="Back to widgets" title="Back to widgets (Esc)">
          <LuArrowLeft />
        </button>
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-mist text-olive">{icon ?? <span className="text-[10px] font-bold">{ref.kind === 'section' ? '§' : '▥'}</span>}</span>
        <h2 className="flex-1 truncate text-sm font-semibold text-ink">Edit {title.split(' ').map((w) => (/[A-Z].*[A-Z]/.test(w) ? w : w.toLowerCase())).join(' ')}</h2>
        {ref.kind !== 'column' && (
          <>
            <button type="button" onClick={onDuplicate} className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-sand hover:text-ink" aria-label="Duplicate" title="Duplicate (Ctrl+D)">
              <LuCopy />
            </button>
            <button type="button" onClick={onDelete} className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-danger-soft hover:text-danger" aria-label="Delete" title="Delete (Del)">
              <LuTrash2 />
            </button>
          </>
        )}
      </div>
      {tabs.length > 1 && <Tabs value={tab} onChange={setTab} tabs={tabs} className="px-2" />}
      <div className="avo-scroll min-h-0 flex-1 overflow-y-auto">
        {ref.kind === 'widget' && <WidgetSettings w={ref.widget} tab={tab} />}
        {ref.kind === 'section' && <SectionSettingsPanel s={ref.section} tab={tab} />}
        {ref.kind === 'column' && <ColumnPanel section={ref.section} columnId={ref.column.id} />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- widgets

/** Photo width a widget can be shown at: a full-width section is up to ~1600 px, a boxed one ~800. */
const PHOTO_NEED_FULL = 1600;
const PHOTO_NEED_BOXED = 800;

function WidgetSettings({ w, tab }: { w: Widget; tab: Tab }) {
  const { commit, lang, doc } = useBuilder();
  const set = (patch: Record<string, unknown>, key?: string) => commit((d) => updateWidgetSettings(d, w.id, patch), key ? `${w.id}.${key}` : undefined);
  const text = (field: string) => (v: string) => commit((d) => setLoc(d, w.id, field, lang, v), `${w.id}.${field}.${lang}`);

  if (tab === 'advanced')
    return (
      <Group title="Visibility">
        <HideField value={w.hide} onChange={(hide) => commit((d) => updateWidget(d, w.id, { hide }))} />
      </Group>
    );

  switch (w.type) {
    case 'heading': {
      const s = w.settings;
      return tab === 'content' ? (
        <Group>
          <LocField label="Heading" value={s.text} onChange={text('text')} multiline rows={2} maxLength={200} />
          <LocField label="Small text above (optional)" value={s.kicker} onChange={text('kicker')} maxLength={80} hint="A short line shown above the heading, e.g. “New season”." />
          <ChoiceField
            label="Heading level"
            value={s.level}
            onChange={(level) => set({ level })}
            hint="Use H1 once per page, for the main title. Sections use H2."
            options={[
              { value: 'h1', label: 'H1' },
              { value: 'h2', label: 'H2' },
              { value: 'h3', label: 'H3' },
              { value: 'h4', label: 'H4' },
            ]}
          />
        </Group>
      ) : (
        <Group>
          <ChoiceField label="Size" value={s.size} onChange={(size) => set({ size })} options={sizeOpts4} />
          <AlignField value={s.align} onChange={(align) => set({ align })} />
          <ColorField value={s.color} onChange={(color) => set({ color })} />
        </Group>
      );
    }
    case 'text': {
      const s = w.settings;
      const other: CmsLang = lang === 'en' ? 'ms' : 'en';
      return tab === 'content' ? (
        <Group>
          <Field label={`Text (${lang === 'en' ? 'English' : 'Bahasa Melayu'})`}>
            <RichText key={w.id + lang} value={s.html[lang]} onChange={text('html')} ariaLabel="Text" placeholder="Start typing…" />
            {richTextToPlain(s.html[other]) && (
              <p className="line-clamp-3 text-[11.5px] leading-snug text-faint">
                <span className="font-medium">{other === 'en' ? 'English' : 'Bahasa Melayu'}:</span> {richTextToPlain(s.html[other])}
              </p>
            )}
          </Field>
          <p className="text-xs text-muted">Tip: you can also double-click the text on the page to type straight into it.</p>
        </Group>
      ) : (
        <Group>
          <ChoiceField label="Text size" value={s.size} onChange={(size) => set({ size })} options={sizeOpts3} />
          <AlignField value={s.align} onChange={(align) => set({ align })} />
          <ColorField value={s.color} onChange={(color) => set({ color })} />
        </Group>
      );
    }
    case 'image': {
      const s = w.settings;
      return tab === 'content' ? (
        <Group>
          <MediaField
            label="Photo"
            value={s.media}
            minWidth={(() => {
              const node = findNode(doc, w.id);
              const need = node && node.kind === 'widget' && node.section.settings.layout === 'full' ? PHOTO_NEED_FULL : PHOTO_NEED_BOXED;
              return s.maxWidth > 0 ? Math.min(need, s.maxWidth) : need;
            })()}
            onChange={(media, item) => {
              const patch: Record<string, unknown> = { media };
              // Pre-fill the description from the library when the widget has none yet.
              if (item && !s.alt.en && !s.alt.ms) patch.alt = { en: item.alt.en, ms: item.alt.ms };
              set(patch);
            }}
          />
          <LocField label="Description (alt text)" value={s.alt} onChange={text('alt')} maxLength={200} hint="What is in the photo — read by Google and screen readers." />
          <LocField label="Caption (optional)" value={s.caption} onChange={text('caption')} maxLength={200} />
          <LinkField label="Link (optional)" value={s.href ?? ''} onChange={(href) => set({ href: href || undefined }, 'href')} allowEmpty />
        </Group>
      ) : (
        <Group>
          <ChoiceField label="Shape" value={s.ratio} onChange={(ratio) => set({ ratio })} options={ratioOpts} />
          <Switch checked={s.rounded} onChange={(rounded) => set({ rounded })} label="Rounded corners" />
          <AlignField value={s.align} onChange={(align) => set({ align })} />
          <NumberField
            label="Maximum width"
            value={s.maxWidth}
            min={0}
            max={1200}
            step={20}
            onChange={(maxWidth) => set({ maxWidth }, 'maxWidth')}
            suffix={s.maxWidth ? ' px' : ''}
            hint={s.maxWidth ? undefined : 'Full width of the column. Drag to make the photo smaller.'}
          />
        </Group>
      );
    }
    case 'button': {
      const s = w.settings;
      return tab === 'content' ? (
        <Group>
          <LocField label="Button text" value={s.label} onChange={text('label')} maxLength={60} />
          <LinkField value={s.href} onChange={(href) => set({ href }, 'href')} />
          <Switch checked={s.newTab} onChange={(newTab) => set({ newTab })} label="Open in a new tab" />
        </Group>
      ) : (
        <Group>
          <ChoiceField
            label="Style"
            value={s.style}
            onChange={(style) => set({ style })}
            options={[
              { value: 'primary', label: 'Olive' },
              { value: 'outline', label: 'Outline' },
              { value: 'gold', label: 'Gold' },
              { value: 'whatsapp', label: 'WhatsApp' },
            ]}
          />
          <ChoiceField label="Size" value={s.size} onChange={(size) => set({ size })} options={sizeOpts3} />
          <AlignField value={s.align} onChange={(align) => set({ align })} />
        </Group>
      );
    }
    case 'spacer':
      return (
        <Group>
          <ChoiceField
            label="Height"
            value={w.settings.size}
            onChange={(size) => set({ size })}
            options={[
              { value: 'none', label: 'None' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' },
            ]}
          />
        </Group>
      );
    case 'divider':
      return (
        <Group>
          <ChoiceField
            label="Look"
            value={w.settings.style}
            onChange={(style) => set({ style })}
            options={[
              { value: 'line', label: 'Thin line' },
              { value: 'gold', label: 'Gold' },
              { value: 'leaf', label: 'Olive leaf' },
            ]}
          />
          <ChoiceField
            label="Width"
            value={w.settings.width}
            onChange={(width) => set({ width })}
            options={[
              { value: 's', label: 'Short' },
              { value: 'm', label: 'Medium' },
              { value: 'full', label: 'Full' },
            ]}
          />
        </Group>
      );
    case 'video':
      return tab === 'content' ? <VideoContent w={w} /> : (
        <Group>
          <ChoiceField
            label="Shape"
            value={w.settings.ratio}
            onChange={(ratio) => set({ ratio })}
            options={[
              { value: '16/9', label: 'Wide' },
              { value: '4/3', label: '4:3' },
              { value: '1/1', label: 'Square' },
              { value: '9/16', label: 'Tall (Shorts)' },
            ]}
          />
        </Group>
      );
    case 'gallery': {
      const s = w.settings;
      return tab === 'content' ? (
        <Group>
          <GalleryField value={s.media} onChange={(media) => set({ media })} />
        </Group>
      ) : (
        <Group>
          <ChoiceField label="Photos per row" value={s.cols} onChange={(cols) => set({ cols })} options={[2, 3, 4].map((n) => ({ value: n as 2 | 3 | 4, label: String(n) }))} />
          <ChoiceField
            label="Shape"
            value={s.ratio}
            onChange={(ratio) => set({ ratio })}
            options={[
              { value: '1/1', label: 'Square' },
              { value: '4/3', label: 'Landscape' },
              { value: '3/4', label: 'Portrait' },
            ]}
          />
          <Switch checked={s.lightbox} onChange={(lightbox) => set({ lightbox })} label="Open large when clicked" />
        </Group>
      );
    }
    case 'iconList': {
      const s = w.settings;
      return tab === 'content' ? (
        <Group>
          <ItemList
            items={s.items}
            onChange={(items) => set({ items }, 'items')}
            title={(it) => it.text[lang] || it.text.en}
            addLabel="Add a point"
            min={1}
            make={() => ({ id: newId('i'), icon: 'check', text: { en: '', ms: '' } })}
            render={(it, update) => (
              <>
                <Field label="Icon">
                  <div className="grid grid-cols-7 gap-1" role="radiogroup" aria-label="Icon">
                    {CMS_ICONS.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        role="radio"
                        aria-checked={it.icon === ic}
                        title={ic}
                        onClick={() => update({ icon: ic })}
                        className={cx('flex h-8 items-center justify-center rounded-md text-[15px]', it.icon === ic ? 'bg-olive text-cream' : 'bg-sand text-muted hover:text-ink')}
                      >
                        {ICONS[ic]}
                      </button>
                    ))}
                  </div>
                </Field>
                <LocField label="Text" value={it.text} onChange={(v) => update({ text: { ...it.text, [lang]: v } })} maxLength={160} />
              </>
            )}
          />
        </Group>
      ) : (
        <Group>
          <ChoiceField
            label="Layout"
            value={s.layout}
            onChange={(layout) => set({ layout })}
            options={[
              { value: 'list', label: 'Under each other' },
              { value: 'inline', label: 'In a row' },
            ]}
          />
          <ColorField value={s.color} onChange={(color) => set({ color })} />
        </Group>
      );
    }
    case 'faq':
      return tab === 'content' ? (
        <Group>
          <p className="text-xs leading-snug text-muted">Questions also appear in Google search results as an FAQ.</p>
          <ItemList
            items={w.settings.items}
            onChange={(items) => set({ items }, 'items')}
            title={(it) => it.q[lang] || it.q.en}
            addLabel="Add a question"
            min={1}
            make={() => ({ id: newId('q'), q: { en: '', ms: '' }, a: { en: '', ms: '' } })}
            render={(it, update) => (
              <>
                <LocField label="Question" value={it.q} onChange={(v) => update({ q: { ...it.q, [lang]: v } })} maxLength={200} />
                <LocField label="Answer" value={it.a} onChange={(v) => update({ a: { ...it.a, [lang]: v } })} multiline rows={4} maxLength={2000} />
              </>
            )}
          />
        </Group>
      ) : (
        <Group>
          <p className="text-sm text-muted">The FAQ follows the colours of its section.</p>
        </Group>
      );
    case 'products':
      return tab === 'content' ? <ProductsContent w={w} /> : (
        <Group>
          <ChoiceField label="Products per row" value={w.settings.cols} onChange={(cols) => set({ cols })} options={[2, 3, 4].map((n) => ({ value: n as 2 | 3 | 4, label: String(n) }))} />
          <Switch checked={w.settings.showTagline} onChange={(showTagline) => set({ showTagline })} label="Show the short description" />
        </Group>
      );
    case 'form':
      return tab === 'content' ? <FormContent w={w} /> : (
        <Group>
          <ChoiceField
            label="Look"
            value={w.settings.style}
            onChange={(style) => set({ style })}
            options={[
              { value: 'card', label: 'On a card' },
              { value: 'plain', label: 'Plain' },
            ]}
          />
        </Group>
      );
    case 'quote':
      return tab === 'content' ? (
        <Group>
          <LocField label="Quote" value={w.settings.text} onChange={text('text')} multiline rows={4} maxLength={600} />
          <LocField label="Name" value={w.settings.author} onChange={text('author')} maxLength={80} />
          <LocField label="Place (optional)" value={w.settings.place} onChange={text('place')} maxLength={80} />
        </Group>
      ) : (
        <Group>
          <p className="text-sm text-muted">Quotes follow the colours of their section.</p>
        </Group>
      );
    case 'whatsapp':
      return tab === 'content' ? (
        <Group>
          <LocField label="Button text" value={w.settings.label} onChange={text('label')} maxLength={60} />
          <LocField
            label="Message the customer sends"
            value={w.settings.message}
            onChange={text('message')}
            multiline
            maxLength={300}
            hint="This text is typed for the visitor in WhatsApp — they just press send. The chat goes to the store’s WhatsApp number."
          />
        </Group>
      ) : (
        <Group>
          <AlignField value={w.settings.align} onChange={(align) => set({ align })} />
        </Group>
      );
  }
}

const sizeOpts3 = [
  { value: 's' as const, label: 'Small' },
  { value: 'm' as const, label: 'Medium' },
  { value: 'l' as const, label: 'Large' },
];
const sizeOpts4 = [
  { value: 's' as const, label: 'S' },
  { value: 'm' as const, label: 'M' },
  { value: 'l' as const, label: 'L' },
  { value: 'xl' as const, label: 'XL' },
];
const ratioOpts = [
  { value: 'auto' as const, label: 'Original' },
  { value: '1/1' as const, label: '1:1' },
  { value: '4/3' as const, label: '4:3' },
  { value: '3/2' as const, label: '3:2' },
  { value: '16/9' as const, label: '16:9' },
  { value: '3/4' as const, label: '3:4' },
];

function VideoContent({ w }: { w: Extract<Widget, { type: 'video' }> }) {
  const { commit, lang } = useBuilder();
  const [url, setUrl] = useState(w.settings.url);
  useEffect(() => setUrl(w.settings.url), [w.settings.url]);
  const parsed = parseVideoUrl(url);
  const err = url.trim() && !parsed ? 'Paste a YouTube or Vimeo link, e.g. https://www.youtube.com/watch?v=…' : null;
  return (
    <Group>
      <Field label="Video link" error={err} hint={!url.trim() ? 'Copy the link from YouTube (Share → Copy) or Vimeo and paste it here.' : parsed ? (parsed.kind === 'mp4' ? 'Found a video file.' : `Found a ${parsed.kind === 'youtube' ? 'YouTube' : 'Vimeo'} video.`) : undefined}>
        <Input
          value={url}
          invalid={!!err}
          placeholder="https://www.youtube.com/watch?v=…"
          onChange={(e) => {
            setUrl(e.target.value);
            const v = e.target.value.trim();
            if (!v || parseVideoUrl(v)) commit((d) => updateWidgetSettings(d, w.id, { url: v }), `${w.id}.url`);
          }}
        />
      </Field>
      <LocField
        label="Video title"
        value={w.settings.title}
        onChange={(v) => commit((d) => setLoc(d, w.id, 'title', lang, v), `${w.id}.title.${lang}`)}
        maxLength={120}
        hint="Describes the video for Google and screen readers."
      />
    </Group>
  );
}

function ProductsContent({ w }: { w: Extract<Widget, { type: 'products' }> }) {
  const { catalogue, commit, lang } = useBuilder();
  const ids = w.settings.ids;
  const toggle = (id: string) => commit((d) => updateWidgetSettings(d, w.id, { ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] }));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= ids.length) return;
    const next = ids.slice();
    [next[i], next[j]] = [next[j], next[i]];
    commit((d) => updateWidgetSettings(d, w.id, { ids: next }));
  };
  if (!catalogue) return <Group><p className="text-sm text-muted">Loading products…</p></Group>;
  const ordered = [...ids.map((id) => catalogue.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c), ...catalogue.filter((c) => !ids.includes(c.id))];
  return (
    <Group title="Products to show" aside={<span className="text-xs text-muted">{ids.length} chosen</span>}>
      <ul className="flex flex-col gap-1.5">
        {ordered.map((p) => {
          const on = ids.includes(p.id);
          const idx = ids.indexOf(p.id);
          return (
            <li key={p.id} className={cx('flex items-center gap-2.5 rounded-lg border px-2 py-1.5', on ? 'border-olive/40 bg-mist/50' : 'border-line bg-white')}>
              <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={on} onChange={() => toggle(p.id)} className="h-4 w-4 accent-[#556b2f]" aria-label={p.name.en} />
                <img src={variantUrl(p.image, 120)} alt="" className="h-10 w-8 shrink-0 object-contain" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-ink">{p.name[lang] || p.name.en}</div>
                  <div className="truncate text-[11px] text-muted">{p.kind === 'infused' ? 'Infused' : 'Classic'}</div>
                </div>
              </label>
              {on && (
                <div className="flex">
                  <button type="button" className="rounded p-1 text-muted hover:bg-white disabled:opacity-30" disabled={idx === 0} onClick={() => move(idx, -1)} aria-label="Move up">
                    ↑
                  </button>
                  <button type="button" className="rounded p-1 text-muted hover:bg-white disabled:opacity-30" disabled={idx === ids.length - 1} onClick={() => move(idx, 1)} aria-label="Move down">
                    ↓
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {!ids.length && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">Tick at least one product, or the block stays empty on the page.</p>}
    </Group>
  );
}

function FormContent({ w }: { w: Extract<Widget, { type: 'form' }> }) {
  const { formList, reloadForms, commit, registerForm, lang } = useBuilder();
  const [loading, setLoading] = useState(false);
  const choose = async (formId: number | undefined) => {
    commit((d) => updateWidgetSettings(d, w.id, { formId }));
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
  const current = formList?.find((f) => f.id === w.settings.formId);
  return (
    <Group>
      <Field label="Form" hint={current ? `Entries are emailed to ${current.recipients.join(', ')}.` : 'Choose which form visitors fill in.'}>
        <Select value={w.settings.formId ?? ''} onChange={(e) => void choose(e.target.value ? Number(e.target.value) : undefined)} disabled={loading}>
          <option value="">— Choose a form —</option>
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
      {!w.settings.formId && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">Without a form chosen, nothing is shown on the page.</p>}
      <LocField label="Title above the form (optional)" value={w.settings.title} onChange={(v) => commit((d) => setLoc(d, w.id, 'title', lang, v), `${w.id}.title.${lang}`)} maxLength={120} />
    </Group>
  );
}

// ---------------------------------------------------------------- sections + columns

const BG: { value: SectionBg; label: string; swatch: string }[] = [
  { value: 'bg', label: 'Warm sand', swatch: '#f7f4ed' },
  { value: 'cream', label: 'Cream', swatch: '#fffdf8' },
  { value: 'white', label: 'White', swatch: '#ffffff' },
  { value: 'olive', label: 'Olive', swatch: '#556b2f' },
  { value: 'olive-dark', label: 'Dark olive', swatch: '#2e3a24' },
  { value: 'image', label: 'Photo', swatch: 'linear-gradient(135deg,#c9b98f,#6d7f4a)' },
];

export function LayoutPicker({ value, onChange }: { value: number[]; onChange: (l: number[]) => void }) {
  const key = value.join('-');
  return (
    <div className="grid grid-cols-3 gap-2">
      {COLUMN_LAYOUTS.map((l) => {
        const on = l.join('-') === key;
        return (
          <button
            key={l.join('-')}
            type="button"
            aria-pressed={on}
            title={l.length === 1 ? 'One column' : `${l.length} columns (${l.map((n) => Math.round((n / 12) * 100) + '%').join(' / ')})`}
            onClick={() => onChange(l)}
            className={cx('flex h-11 gap-1 rounded-lg border p-1.5', on ? 'border-olive bg-mist' : 'border-line bg-white hover:border-line-strong')}
          >
            {l.map((span, i) => (
              <span key={i} className={cx('rounded-[3px]', on ? 'bg-olive/70' : 'bg-line-strong')} style={{ flex: span }} />
            ))}
          </button>
        );
      })}
    </div>
  );
}

function SectionSettingsPanel({ s, tab }: { s: Section; tab: Tab }) {
  const { commit, media } = useBuilder();
  const set = (patch: Partial<Section['settings']>, key?: string) => commit((d) => updateSectionSettings(d, s.id, patch), key ? `${s.id}.${key}` : undefined);
  const [anchor, setAnchor] = useState(s.settings.anchor ?? '');
  useEffect(() => setAnchor(s.settings.anchor ?? ''), [s.settings.anchor]);
  const anchorErr = anchor && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(anchor) ? 'Use lowercase letters, numbers and hyphens, e.g. “our-story”.' : null;
  const widgets = s.columns.reduce((n, c) => n + c.widgets.length, 0);

  if (tab === 'content')
    return (
      <>
        <Group title="Columns">
          <LayoutPicker value={s.columns.map((c) => c.span)} onChange={(l) => commit((d) => setSectionLayout(d, s.id, l))} />
          {widgets > 0 && <p className="text-xs leading-snug text-muted">Choosing fewer columns moves the content of removed columns into the last one — nothing is lost.</p>}
        </Group>
        <Group title="Width">
          <ChoiceField
            label="Content width"
            value={s.settings.layout}
            onChange={(layout) => set({ layout })}
            options={[
              { value: 'boxed', label: 'Boxed' },
              { value: 'full', label: 'Full width' },
            ]}
            hint="Boxed keeps text at a comfortable reading width on big screens."
          />
          <ChoiceField
            label="Space between columns"
            value={s.settings.gap ?? 'm'}
            onChange={(gap) => set({ gap })}
            options={[
              { value: 's', label: 'Small' },
              { value: 'm', label: 'Medium' },
              { value: 'l', label: 'Large' },
            ]}
          />
          <ChoiceField
            label="Line up columns"
            value={s.settings.valign ?? 'start'}
            onChange={(valign) => set({ valign })}
            options={[
              { value: 'start', label: 'Top' },
              { value: 'center', label: 'Middle' },
              { value: 'end', label: 'Bottom' },
            ]}
          />
        </Group>
      </>
    );

  if (tab === 'style')
    return (
      <>
        <Group title="Background">
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Background">
            {BG.map((b) => (
              <button
                key={b.value}
                type="button"
                role="radio"
                aria-checked={s.settings.bg === b.value}
                onClick={() => set({ bg: b.value })}
                className={cx('flex flex-col items-center gap-1.5 rounded-lg border p-2 text-[11.5px]', s.settings.bg === b.value ? 'border-olive bg-mist text-ink' : 'border-line bg-white text-muted hover:border-line-strong')}
              >
                <span className="h-7 w-full rounded border border-line" style={{ background: b.swatch }} />
                {b.label}
              </button>
            ))}
          </div>
          {s.settings.bg === 'image' && (
            <>
              <MediaField label="Background photo" value={s.settings.bgImage} onChange={(bgImage) => set({ bgImage })} minWidth={PHOTO_NEED_FULL} />
              {!s.settings.bgImage && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">Choose a photo, or the section shows a plain background.</p>}
              <NumberField
                label="Darken the photo"
                value={s.settings.overlay ?? 40}
                min={0}
                max={80}
                step={5}
                suffix="%"
                onChange={(overlay) => set({ overlay }, 'overlay')}
                hint="Makes white text easier to read on a busy photo."
              />
              {s.settings.bgImage && media[String(s.settings.bgImage)] && (
                <div className="relative h-20 overflow-hidden rounded-lg">
                  <img src={variantUrl(media[String(s.settings.bgImage)], 480)} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black" style={{ opacity: (s.settings.overlay ?? 40) / 100 }} />
                  <span className="absolute inset-0 flex items-center justify-center font-display text-lg text-white">Preview</span>
                </div>
              )}
            </>
          )}
        </Group>
        <Group title="Spacing & alignment">
          <ChoiceField
            label="Space above and below"
            value={s.settings.padY}
            onChange={(padY) => set({ padY })}
            options={[
              { value: 'none', label: 'None' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' },
            ]}
          />
          <AlignField label="Text alignment" value={s.settings.align} onChange={(align) => set({ align })} />
        </Group>
      </>
    );

  return (
    <>
      <Group title="Anchor">
        <Field label="Anchor name (optional)" error={anchorErr} hint={!anchorErr && anchor ? `Link to this section with #${anchor}` : 'Lets a button jump to this section.'}>
          <Input
            value={anchor}
            invalid={!!anchorErr}
            placeholder="our-story"
            onChange={(e) => {
              const v = e.target.value.toLowerCase();
              setAnchor(v);
              if (!v || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v)) set({ anchor: v || undefined }, 'anchor');
            }}
          />
        </Field>
      </Group>
      <Group title="Visibility">
        <HideField value={s.hide} onChange={(hide) => commit((d) => updateSection(d, s.id, { hide }))} />
      </Group>
    </>
  );
}

function ColumnPanel({ section, columnId }: { section: Section; columnId: string }) {
  const { commit, select } = useBuilder();
  const idx = section.columns.findIndex((c) => c.id === columnId);
  return (
    <>
      <Group title="This section’s columns">
        <LayoutPicker value={section.columns.map((c) => c.span)} onChange={(l) => commit((d) => setSectionLayout(d, section.id, l))} />
        <p className="text-xs text-muted">
          Column {idx + 1} of {section.columns.length}. On phones, columns are shown one under the other.
        </p>
        <Button size="sm" onClick={() => select(section.id)}>
          Edit the section (background, spacing)
        </Button>
      </Group>
    </>
  );
}
