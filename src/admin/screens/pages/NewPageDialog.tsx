import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuCheck, LuFile } from 'react-icons/lu';
import { slugProblem } from '../../../cms/contracts';
import { api, ApiError } from '../../api';
import { PAGE_TEMPLATES, type PageTemplate } from '../../content/templates';
import { toast } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { slugify } from '../../lib/format';
import { Modal } from '../../ui/Modal';
import { Button, Field, Input } from '../../ui/ui';

const bandColor = { dark: 'bg-olive-dark', olive: 'bg-olive', cream: 'bg-[#f3ead6]', bg: 'bg-[#e9e3d4]' } as const;

function TemplateThumb({ t, selected, onClick }: { t: PageTemplate; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-white text-left transition-all',
        selected ? 'border-olive ring-2 ring-olive/25' : 'border-line hover:border-line-strong hover:shadow-[var(--shadow-card)]'
      )}
    >
      <div className="relative flex h-24 flex-col gap-1 bg-sand/70 p-2.5">
        {t.badge && <span className="absolute bottom-1.5 left-1.5 z-10 rounded bg-[#7a5a14] px-1.5 py-px text-[10px] font-semibold text-white shadow-sm">{t.badge}</span>}
        {t.bands.length ? (
          t.bands.map((b, i) => <div key={i} className={cx('flex-1 rounded-[3px]', bandColor[b])} />)
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-[3px] border border-dashed border-line-strong text-xl text-faint">
            <LuFile />
          </div>
        )}
      </div>
      <div className="px-3 py-2.5">
        <div className="text-[13px] font-semibold text-ink">{t.name}</div>
        <div className="mt-0.5 text-[11.5px] leading-snug text-muted">{t.description}</div>
      </div>
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-olive text-[12px] text-cream">
          <LuCheck />
        </span>
      )}
    </button>
  );
}

export function NewPageDialog({ open, onClose, takenSlugs = [] }: { open: boolean; onClose: () => void; takenSlugs?: string[] }) {
  const nav = useNavigate();
  const [titleEn, setTitleEn] = useState('');
  const [titleMs, setTitleMs] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [tpl, setTpl] = useState('landing');
  const [busy, setBusy] = useState(false);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    setTitleEn('');
    setTitleMs('');
    setSlug('');
    setSlugTouched(false);
    setTpl('landing');
    setFields({});
    api
      .catalogue()
      .then((c) => setProductIds(c.filter((p) => p.kind === 'infused').map((p) => p.id).concat(c.filter((p) => p.kind !== 'infused').map((p) => p.id))))
      .catch(() => setProductIds([]));
  }, [open]);

  const effSlug = slugTouched ? slug : slugify(titleEn);
  const slugErr = useMemo(() => {
    if (!effSlug) return null;
    const p = slugProblem(effSlug);
    if (p) return p;
    if (takenSlugs.includes(effSlug)) return 'Another page already uses this address.';
    return null;
  }, [effSlug, takenSlugs]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!titleEn.trim()) f.titleEn = 'Give the page an English title.';
    if (!effSlug) f.slug = 'Choose an address for the page.';
    else if (slugErr) f.slug = slugErr;
    setFields(f);
    if (Object.keys(f).length) return;
    const t = PAGE_TEMPLATES.find((x) => x.id === tpl) ?? PAGE_TEMPLATES[0];
    const title = { en: titleEn.trim(), ms: titleMs.trim() };
    setBusy(true);
    try {
      const r = await api.createPage({ slug: effSlug, title, doc: t.make(title, { productIds }) });
      toast.ok('Page created. Add your content, then publish.');
      onClose();
      nav(`/pages/${r.page.id}/edit`);
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setFields(err.fields);
      else toast.error(err instanceof Error ? err.message : 'Could not create the page.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New page"
      subtitle="Give it a name, choose where it lives, and pick a starting point."
      size="lg"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="new-page-form" loading={busy}>
            Create page
          </Button>
        </>
      }
    >
      <form id="new-page-form" onSubmit={submit} noValidate className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title (English)" htmlFor="np-en" error={fields.titleEn || fields['title.en']}>
            <Input id="np-en" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="e.g. Ramadan gift boxes" invalid={!!fields.titleEn} data-autofocus maxLength={120} />
          </Field>
          <Field label="Title (Bahasa Melayu)" htmlFor="np-ms" hint="Optional now — you can translate later.">
            <Input id="np-ms" value={titleMs} onChange={(e) => setTitleMs(e.target.value)} placeholder="cth. Kotak hadiah Ramadan" maxLength={120} />
          </Field>
        </div>
        <Field
          label="Page address"
          htmlFor="np-slug"
          error={fields.slug || (slugTouched || titleEn ? slugErr : null)}
          hint={effSlug && !slugErr ? <>The page will live at <strong className="text-ink">avoliveoil.com/en/{effSlug}</strong> and /ms/{effSlug}</> : 'Lowercase letters, numbers and hyphens.'}
        >
          <div className="flex items-stretch overflow-hidden rounded-lg border border-line-strong bg-white focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/15">
            <span className="flex items-center border-r border-line bg-sand px-3 text-[13px] text-muted">avoliveoil.com/en/</span>
            <input
              id="np-slug"
              className="h-9 min-w-0 flex-1 px-3 text-sm focus:outline-none"
              value={effSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </Field>
        <div>
          <div className="mb-2 text-[13px] font-medium text-ink">Start from</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PAGE_TEMPLATES.map((t) => (
              <TemplateThumb key={t.id} t={t} selected={tpl === t.id} onClick={() => setTpl(t.id)} />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
