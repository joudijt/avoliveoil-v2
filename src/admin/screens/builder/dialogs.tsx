import { useEffect, useMemo, useState } from 'react';
import { LuCircleAlert, LuCircleCheck, LuCircleX, LuHistory, LuImagePlus, LuRotateCcw, LuX } from 'react-icons/lu';
import { CMS_LANGS, slugProblem, type CmsLang, type CmsPageDoc, type Localized } from '../../../cms/contracts';
import { api, variantUrl, type PageMeta, type PageRevision } from '../../api';
import { confirmDialog, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtAgo, fmtDateTime } from '../../lib/format';
import { Modal } from '../../ui/Modal';
import { Button, Checkbox, Chip, Counter, Field, Input, LoadingBlock, Segmented, Switch, Textarea, ErrorBlock } from '../../ui/ui';
import { MediaPicker } from '../media/MediaPicker';
import { useBuilder } from './context';
import { langChecks, MENU_LABEL_MAX, pageProblems, type LangCheck } from './readiness';

const LANG_LABEL: Record<CmsLang, string> = { en: 'English', ms: 'Bahasa Melayu' };
/** CMS menu items show the page title; longer labels break the header pill. */
const MENU_MAX = MENU_LABEL_MAX;

// ---------------------------------------------------------------- publish

export function PublishDialog({
  open,
  onClose,
  doc,
  page,
  onPublish,
  onUnpublish,
  onOpenSettings,
}: {
  open: boolean;
  onClose: () => void;
  doc: CmsPageDoc;
  page: PageMeta;
  onPublish: (langs: CmsLang[]) => Promise<void>;
  onUnpublish: () => Promise<void>;
  onOpenSettings: () => void;
}) {
  const inMenu = page.inHeader || page.inFooter;
  const checks = useMemo(() => Object.fromEntries(CMS_LANGS.map((l) => [l, langChecks(doc, l, inMenu)])) as Record<CmsLang, LangCheck[]>, [doc, inMenu]);
  const ready = (l: CmsLang) => checks[l].every((c) => c.ok || !c.blocking);
  const { formList } = useBuilder();
  const knownForms = useMemo(() => (formList ? new Set(formList.map((f) => f.id)) : null), [formList]);
  const problems = useMemo(() => pageProblems(doc, knownForms), [doc, knownForms]);
  const [langs, setLangs] = useState<CmsLang[]>([]);
  const [busy, setBusy] = useState<'publish' | 'unpublish' | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (open) {
      setLangs(CMS_LANGS.filter((l) => ready(l)));
      setError(null);
    }
    // only when opening
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const go = async () => {
    setBusy('publish');
    setError(null);
    try {
      await onPublish(langs);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Publishing failed.');
    } finally {
      setBusy(null);
    }
  };
  const unpublish = async () => {
    const ok = await confirmDialog({
      title: 'Take this page off the website?',
      message: 'Visitors will no longer see it and it is removed from Google’s list. Your content stays here as a draft.',
      confirmLabel: 'Unpublish',
      danger: true,
    });
    if (!ok) return;
    setBusy('unpublish');
    try {
      await onUnpublish();
      onClose();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const empty = !doc.sections.length;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={page.status === 'published' ? 'Publish changes' : 'Publish page'}
      subtitle="Choose the languages to put live. A language can only go live when it is complete."
      size="md"
      footer={
        <>
          {page.status === 'published' && (
            <Button variant="dangerGhost" className="mr-auto" loading={busy === 'unpublish'} onClick={() => void unpublish()}>
              Unpublish
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" loading={busy === 'publish'} disabled={!langs.length || empty || !!busy} onClick={() => void go()}>
            {langs.length === 2 ? 'Publish both languages' : langs.length === 1 ? `Publish ${LANG_LABEL[langs[0]]} only` : 'Publish'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        {CMS_LANGS.map((l) => {
          const ok = ready(l);
          const on = langs.includes(l);
          return (
            <div key={l} className={cx('rounded-xl border p-4', on ? 'border-olive/50 bg-mist/40' : 'border-line bg-white')}>
              <div className="flex items-center justify-between gap-3">
                <Checkbox
                  checked={on}
                  disabled={!ok}
                  onChange={(v) => setLangs((s) => (v ? [...s, l] : s.filter((x) => x !== l)))}
                  label={<span className="font-semibold text-ink">{LANG_LABEL[l]}</span>}
                />
                {page.langs.includes(l) ? <Chip tone="ok">Live now</Chip> : <Chip>Not live</Chip>}
              </div>
              {ok && !on && page.langs.includes(l) && (
                <p className="mt-2 pl-6 text-xs text-warn">Unticked: publishing now takes the {LANG_LABEL[l]} page off the website.</p>
              )}
              <ul className="mt-3 flex flex-col gap-1.5 pl-6">
                {checks[l].map((c) => (
                  <li key={c.label} className="flex items-center gap-2 text-[13px]">
                    {c.ok ? <LuCircleCheck className="shrink-0 text-ok" /> : c.blocking ? <LuCircleX className="shrink-0 text-danger" /> : <LuCircleAlert className="shrink-0 text-warn" />}
                    <span className={c.ok ? 'text-muted' : 'text-ink'}>{c.label}</span>
                  </li>
                ))}
              </ul>
              {!ok && (
                <p className="mt-3 pl-6 text-xs text-muted">
                  {page.langs.includes(l)
                    ? 'This language is live now, but publishing without it takes it off the website until the red items are fixed.'
                    : 'This language stays offline until the red items are fixed.'}{' '}
                  <button type="button" className="font-medium text-olive underline" onClick={onOpenSettings}>
                    Open page settings
                  </button>
                </p>
              )}
            </div>
          );
        })}
        {problems.length > 0 && (
          <div className="rounded-xl border border-warn/30 bg-warn-soft px-4 py-3">
            <p className="text-[13px] font-semibold text-warn">Check before publishing</p>
            <ul className="mt-1.5 list-disc pl-5 text-[13px] text-ink">
              {problems.slice(0, 10).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
              {problems.length > 10 && <li>…and {problems.length - 10} more.</li>}
            </ul>
          </div>
        )}
        {error && <ErrorBlock message={error} />}
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- versions

export function VersionsDialog({ open, onClose, pageId, onRestore }: { open: boolean; onClose: () => void; pageId: number; onRestore: (rid: number) => Promise<void> }) {
  const [list, setList] = useState<PageRevision[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const load = () => {
    setList(null);
    setError(null);
    api
      .revisions(pageId)
      .then(setList)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load versions.'));
  };
  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pageId]);
  const restore = async (r: PageRevision) => {
    const ok = await confirmDialog({
      title: 'Restore this version as your draft?',
      message: `Your current draft is replaced by the version from ${fmtDateTime(r.createdAt)}. The live page does not change until you publish. You can undo with Ctrl+Z.`,
      confirmLabel: 'Restore as draft',
    });
    if (!ok) return;
    setBusy(r.id);
    try {
      await onRestore(r.id);
      onClose();
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Versions" subtitle="Every time you publish, a version is kept. Restore one to see or reuse it." size="md">
      {!list && !error && <LoadingBlock label="Loading versions…" />}
      {error && <ErrorBlock message={error} onRetry={load} />}
      {list && list.length === 0 && (
        <div className="py-10 text-center text-sm text-muted">
          <LuHistory className="mx-auto mb-2 text-2xl text-faint" />
          No versions yet. A version is saved each time you publish.
        </div>
      )}
      {list && list.length > 0 && (
        <ol className="flex flex-col divide-y divide-line">
          {list.map((r, i) => (
            <li key={r.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-ink">
                  {fmtDateTime(r.createdAt)} {i === 0 && <Chip tone="ok" className="ml-1.5">Latest</Chip>}
                </div>
                <div className="text-xs text-muted">
                  {r.note && r.note !== 'publish' ? r.note : 'Published'}
                  {r.userName ? ` by ${r.userName}` : ''} · {fmtAgo(r.createdAt)}
                  {r.langs?.length ? ` · ${r.langs.map((l) => (l === 'en' ? 'EN' : 'BM')).join(' + ')}` : ''}
                </div>
              </div>
              <Button size="sm" icon={<LuRotateCcw />} loading={busy === r.id} onClick={() => void restore(r)}>
                Restore
              </Button>
            </li>
          ))}
        </ol>
      )}
    </Modal>
  );
}

// ---------------------------------------------------------------- page settings

/** Tiny schematic of the two page layouts: full header with menu vs logo-only header + phone bar. */
function LayoutThumb({ layout }: { layout: PageLayout }) {
  const bar = 'block h-1 rounded-full';
  return (
    <span className="flex h-16 w-14 shrink-0 flex-col gap-1 overflow-hidden rounded-md border border-line bg-sand/70 p-1">
      {layout === 'site' ? (
        <>
          <span className="flex items-center gap-0.5 rounded-sm bg-white px-0.5 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-olive" />
            <span className={cx(bar, 'w-1.5 bg-line-strong')} />
            <span className={cx(bar, 'w-1.5 bg-line-strong')} />
            <span className={cx(bar, 'w-1.5 bg-line-strong')} />
          </span>
          <span className={cx(bar, 'w-6 bg-line')} />
          <span className="flex-1 rounded-sm bg-[#e9e3d4]" />
          <span className="h-3 rounded-sm bg-olive-dark" />
        </>
      ) : (
        <>
          <span className="flex items-center justify-between rounded-sm bg-olive-dark px-0.5 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cream" />
            <span className="h-1.5 w-2.5 rounded-sm bg-[#25d366]" />
          </span>
          <span className="flex flex-1 gap-0.5 rounded-sm bg-olive-dark/85 p-0.5">
            <span className="flex flex-1 flex-col gap-0.5">
              <span className={cx(bar, 'w-full bg-cream/70')} />
              <span className={cx(bar, 'w-2/3 bg-gold')} />
            </span>
            <span className="w-3 rounded-[2px] bg-cream" />
          </span>
          <span className="flex gap-0.5">
            <span className="h-1.5 flex-1 rounded-sm bg-[#25d366]" />
            <span className="h-1.5 flex-1 rounded-sm bg-olive" />
          </span>
        </>
      )}
    </span>
  );
}

function Snippet({ title, desc, url }: { title: string; desc: string; url: string }) {
  const t = title.length > 62 ? title.slice(0, 60) + '…' : title;
  const d = desc.length > 158 ? desc.slice(0, 155) + '…' : desc;
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">Google preview</div>
      <div className="flex items-center gap-2">
        <img src="/favicon-32.png" alt="" className="h-6 w-6 rounded-full border border-line bg-white p-0.5" />
        <div className="min-w-0 leading-tight">
          <div className="text-[13px] text-[#202124]">Arabian Village</div>
          <div className="truncate text-[12px] text-[#4d5156]">{url}</div>
        </div>
      </div>
      <div className="mt-1.5 text-[19px] leading-snug text-[#1a0dab]" style={{ fontFamily: 'arial, sans-serif' }}>
        {t || <span className="text-faint">Your page title</span>}
      </div>
      <div className="mt-1 text-[13.5px] leading-snug text-[#4d5156]" style={{ fontFamily: 'arial, sans-serif' }}>
        {d || <span className="text-faint">Add a description so people know what the page is about before they click.</span>}
      </div>
    </div>
  );
}

export type PageLayout = NonNullable<CmsPageDoc['layout']>;

const LAYOUTS: { value: PageLayout; title: string; text: string }[] = [
  { value: 'site', title: 'Site page', text: 'The website’s full header with the menu, the breadcrumb and the full footer.' },
  { value: 'landing', title: 'Landing page', text: 'For ads: logo, language and WhatsApp at the top (no menu), a short footer, and a WhatsApp + form bar on phones.' },
];

export interface SettingsResult {
  doc: { title: Localized; menuLabel?: Localized; metaTitle: Localized; metaDescription: Localized; ogImage?: number; layout: PageLayout };
  patch: { slug?: string; inHeader?: boolean; inFooter?: boolean; menuOrder?: number; noindex?: boolean };
}

export function PageSettingsDialog({
  open,
  onClose,
  page,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  page: PageMeta;
  onSave: (r: SettingsResult) => Promise<void>;
}) {
  const { doc, pages, lang: builderLang, media, registerMedia } = useBuilder();
  const [lang, setLang] = useState<CmsLang>(builderLang);
  const [slug, setSlug] = useState(page.slug);
  const [title, setTitle] = useState(doc.title);
  const [menuLabel, setMenuLabel] = useState<Localized>(doc.menuLabel ?? { en: '', ms: '' });
  const [metaTitle, setMetaTitle] = useState(doc.seo.metaTitle);
  const [metaDesc, setMetaDesc] = useState(doc.seo.metaDescription);
  const [ogImage, setOgImage] = useState<number | undefined>(doc.seo.ogImage);
  const [layout, setLayout] = useState<PageLayout>(doc.layout ?? 'site');
  const [inHeader, setInHeader] = useState(page.inHeader);
  const [inFooter, setInFooter] = useState(page.inFooter);
  const [menuOrder, setMenuOrder] = useState(page.menuOrder);
  const [noindex, setNoindex] = useState(page.noindex);
  const [picker, setPicker] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setLang(builderLang);
    setSlug(page.slug);
    setTitle(doc.title);
    setMenuLabel(doc.menuLabel ?? { en: '', ms: '' });
    setMetaTitle(doc.seo.metaTitle);
    setMetaDesc(doc.seo.metaDescription);
    setOgImage(doc.seo.ogImage);
    setLayout(doc.layout ?? 'site');
    setInHeader(page.inHeader);
    setInFooter(page.inFooter);
    setMenuOrder(page.menuOrder);
    setNoindex(page.noindex);
    setFields({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const headerCount = (pages ?? []).filter((p) => p.inHeader && p.id !== page.id).length;
  const headerFull = headerCount >= 3 && !page.inHeader;
  const slugErr = slug !== page.slug ? slugProblem(slug) ?? ((pages ?? []).some((p) => p.slug === slug && p.id !== page.id) ? 'Another page already uses this address.' : null) : null;

  const save = async () => {
    if (slugErr) {
      setFields({ slug: slugErr });
      return;
    }
    if (!title.en.trim() && !title.ms.trim()) {
      setFields({ title: 'Give the page a title.' });
      return;
    }
    // The menu has room for short link texts only: the menu label, or the title when there is none.
    const langs = ['en', 'ms'] as CmsLang[];
    const labelTooLong = langs.find((l) => menuLabel[l].trim().length > MENU_MAX);
    if (labelTooLong) {
      setFields({ [`menuLabel.${labelTooLong}`]: `Keep the menu label to ${MENU_MAX} characters or fewer.` });
      return;
    }
    const titleTooLong = (inHeader || inFooter) && langs.find((l) => title[l].trim() && !menuLabel[l].trim() && title[l].trim().length > MENU_MAX);
    if (titleTooLong) {
      setFields({
        [`menuLabel.${titleTooLong}`]: `The ${LANG_LABEL[titleTooLong]} page title is too long for a menu. Add a short menu label (${MENU_MAX} characters or fewer), or take the page out of the menus.`,
      });
      return;
    }
    const patch: SettingsResult['patch'] = {};
    if (slug !== page.slug) patch.slug = slug;
    if (inHeader !== page.inHeader) patch.inHeader = inHeader;
    if (inFooter !== page.inFooter) patch.inFooter = inFooter;
    if (menuOrder !== page.menuOrder) patch.menuOrder = menuOrder;
    if (noindex !== page.noindex) patch.noindex = noindex;
    if (patch.slug && page.status === 'published') {
      const ok = await confirmDialog({
        title: 'Change the page address?',
        message: `Visitors and Google going to /${'{lang}'}/${page.slug} will be sent to /${'{lang}'}/${slug} automatically. Links you shared keep working.`.replace(/\{lang\}/g, 'en'),
        confirmLabel: 'Change address',
      });
      if (!ok) return;
    }
    setBusy(true);
    try {
      const label = { en: menuLabel.en.trim(), ms: menuLabel.ms.trim() };
      await onSave({ doc: { title, menuLabel: label.en || label.ms ? label : undefined, metaTitle, metaDescription: metaDesc, ogImage, layout }, patch });
      onClose();
    } catch (e) {
      const f = (e as { fields?: Record<string, string> }).fields;
      if (f && Object.keys(f).length) setFields(f.menuLabel ? { ...f, 'menuLabel.en': f.menuLabel } : f);
      else toastError(e);
    } finally {
      setBusy(false);
    }
  };

  const og = ogImage != null ? media[String(ogImage)] : undefined;
  const setL = (set: (f: (v: Localized) => Localized) => void) => (v: string) => set((cur) => ({ ...cur, [lang]: v }));
  const other: CmsLang = lang === 'en' ? 'ms' : 'en';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Page settings"
      size="lg"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" loading={busy} onClick={() => void save()}>
            Save settings
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-7">
        <section className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-olive-dark">Address</h3>
          <Field
            label="Page address"
            error={fields.slug || slugErr}
            hint={
              slug !== page.slug && page.status === 'published'
                ? `The old address /en/${page.slug} will redirect here automatically.`
                : 'Lowercase letters, numbers and hyphens.'
            }
          >
            <div className="flex items-stretch overflow-hidden rounded-lg border border-line-strong bg-white focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/15">
              <span className="flex items-center border-r border-line bg-sand px-3 text-[13px] text-muted">avoliveoil.com/{lang}/</span>
              <input className="h-9 min-w-0 flex-1 px-3 text-sm focus:outline-none" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} spellCheck={false} />
            </div>
          </Field>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-display text-lg text-olive-dark">Layout</h3>
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Layout">
            {LAYOUTS.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={layout === o.value}
                onClick={() => setLayout(o.value)}
                className={cx(
                  'flex gap-3 rounded-xl border p-3 text-left transition-colors',
                  layout === o.value ? 'border-olive bg-mist/50 ring-2 ring-olive/20' : 'border-line bg-white hover:border-line-strong'
                )}
              >
                <LayoutThumb layout={o.value} />
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <span className={cx('flex h-4 w-4 shrink-0 items-center justify-center rounded-full border', layout === o.value ? 'border-olive bg-olive' : 'border-line-strong bg-white')}>
                      {layout === o.value && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    {o.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-muted">{o.text}</span>
                </span>
              </button>
            ))}
          </div>
          {layout === 'landing' && (inHeader || inFooter) && (
            <p className="text-xs leading-snug text-muted">Landing pages are usually reached from an ad, not the menu. The menu switches below still work if you want both.</p>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-lg text-olive-dark">Title & Google</h3>
            <Segmented
              size="sm"
              value={lang}
              onChange={setLang}
              ariaLabel="Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'ms', label: 'Bahasa Melayu' },
              ]}
            />
          </div>
          <Field
            label="Page title"
            error={fields.title}
            hint={title[other] ? `${LANG_LABEL[other]}: ${title[other]}` : 'Used in the page’s breadcrumb and, without a menu label, in menus.'}
          >
            <Input value={title[lang]} onChange={(e) => setL(setTitle)(e.target.value)} maxLength={120} />
          </Field>
          <Field label="Title for Google" aside={<Counter value={metaTitle[lang]} ideal={[30, 60]} max={65} />} hint="The blue link in Google. Aim for 30–60 characters, with the main words first.">
            <Input value={metaTitle[lang]} onChange={(e) => setL(setMetaTitle)(e.target.value)} maxLength={120} />
          </Field>
          <Field label="Description for Google" aside={<Counter value={metaDesc[lang]} ideal={[120, 155]} max={170} />} hint="The grey text under the link. Aim for 120–155 characters.">
            <Textarea value={metaDesc[lang]} onChange={(e) => setL(setMetaDesc)(e.target.value)} rows={3} maxLength={300} />
          </Field>
          <Snippet title={metaTitle[lang] || title[lang]} desc={metaDesc[lang]} url={`avoliveoil.com › ${lang} › ${slug}`} />
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-display text-lg text-olive-dark">Share image</h3>
          <p className="-mt-1 text-[13px] text-muted">Shown when the page is shared on WhatsApp, Facebook and others. Without one, the site’s standard image is used.</p>
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-44 items-center justify-center overflow-hidden rounded-lg border border-line bg-sand">
              {og ? <img src={variantUrl(og, 480)} alt="" className="h-full w-full object-cover" /> : <LuImagePlus className="text-xl text-faint" />}
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={() => setPicker(true)}>
                {og ? 'Change image' : 'Choose image'}
              </Button>
              {og && (
                <Button size="sm" variant="ghost" icon={<LuX />} onClick={() => setOgImage(undefined)}>
                  Use the standard image
                </Button>
              )}
            </div>
          </div>
          <MediaPicker
            open={picker}
            onClose={() => setPicker(false)}
            initial={ogImage != null ? [ogImage] : []}
            note="Best size: 1200 × 630 pixels, landscape."
            onPick={(items) => {
              registerMedia(items);
              if (items[0]) setOgImage(items[0].id);
            }}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-display text-lg text-olive-dark">Menus & search engines</h3>
          <Switch
            checked={inHeader}
            onChange={setInHeader}
            disabled={headerFull}
            label="Show in the top menu"
            hint={headerFull ? 'The top menu already has 3 of your pages (the most that fit). Remove one of them from the top menu first.' : `${headerCount + (inHeader ? 1 : 0)} of 3 places used.`}
          />
          <Switch checked={inFooter} onChange={setInFooter} label="Show in the footer" />
          {(inHeader || inFooter) && (
            <div className="grid gap-3 sm:grid-cols-2">
              {(['en', 'ms'] as CmsLang[]).map((l) => (
                <Field
                  key={l}
                  label={`Menu label (${LANG_LABEL[l]})`}
                  aside={<Counter value={menuLabel[l].trim() || title[l].trim()} ideal={[1, MENU_MAX]} max={MENU_MAX} />}
                  error={fields[`menuLabel.${l}`]}
                  hint={`Optional. The link text in the menu, at most ${MENU_MAX} characters. Empty = the page title.`}
                >
                  <Input
                    value={menuLabel[l]}
                    placeholder={title[l] || undefined}
                    maxLength={40}
                    invalid={!!fields[`menuLabel.${l}`]}
                    onChange={(e) => setMenuLabel((cur) => ({ ...cur, [l]: e.target.value }))}
                  />
                </Field>
              ))}
            </div>
          )}
          {(inHeader || inFooter) && (
            <Field label="Order in the menu" hint="Lower numbers come first.">
              <Input type="number" min={0} max={99} value={menuOrder} onChange={(e) => setMenuOrder(Math.max(0, Math.min(99, Number(e.target.value) || 0)))} className="w-24" />
            </Field>
          )}
          <Switch
            checked={noindex}
            onChange={setNoindex}
            label="Hide from Google and other search engines"
            hint="Use for thank-you pages or private offers. Visitors with the link can still open it."
          />
        </section>
      </div>
    </Modal>
  );
}
