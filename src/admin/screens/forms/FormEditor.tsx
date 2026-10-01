import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LuArrowLeft,
  LuCalendar,
  LuCircleCheck,
  LuHash,
  LuList,
  LuMail,
  LuPhone,
  LuPlus,
  LuSend,
  LuSquareCheck,
  LuText,
  LuTextCursorInput,
  LuTrash2,
  LuX,
  LuCircleDot,
} from 'react-icons/lu';
import { FORM_REDIRECT_RE, type CmsFormDef, type CmsLang, type FormField, type FormFieldType, type Localized } from '../../../cms/contracts';
import { newId } from '../../../cms/doc';
import { api, ApiError, type FormInput } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { EMAIL_RE } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { useUnsavedGuard } from '../../lib/navGuard';
import { rerenderDirtyPages } from '../../lib/render';
import { useUser } from '../../lib/session';
import { Menu } from '../../ui/Menu';
import { Button, Card, Checkbox, ErrorBlock, Field, Input, LoadingBlock, Segmented, Select } from '../../ui/ui';
import { ItemList } from '../builder/settings/fields';

const TYPE_META: Record<FormFieldType, { label: string; icon: ReactNode }> = {
  text: { label: 'Short text', icon: <LuTextCursorInput /> },
  email: { label: 'Email', icon: <LuMail /> },
  tel: { label: 'Phone', icon: <LuPhone /> },
  textarea: { label: 'Long text', icon: <LuText /> },
  select: { label: 'Dropdown', icon: <LuList /> },
  radio: { label: 'Choose one', icon: <LuCircleDot /> },
  checkbox: { label: 'Tick box', icon: <LuSquareCheck /> },
  number: { label: 'Number', icon: <LuHash /> },
  date: { label: 'Date', icon: <LuCalendar /> },
};

const L = (en: string, ms: string): Localized => ({ en, ms });

function newField(type: FormFieldType, taken: string[]): FormField {
  const base = { text: 'answer', email: 'email', tel: 'phone', textarea: 'message', select: 'choice', radio: 'option', checkbox: 'agree', number: 'quantity', date: 'date' }[type];
  let name = base;
  for (let i = 2; taken.includes(name); i++) name = `${base}_${i}`;
  const label: Record<FormFieldType, Localized> = {
    text: L('Your answer', 'Jawapan anda'),
    email: L('Email', 'E-mel'),
    tel: L('Phone number', 'Nombor telefon'),
    textarea: L('Message', 'Mesej'),
    select: L('Choose one', 'Pilih satu'),
    radio: L('Choose one', 'Pilih satu'),
    checkbox: L('I agree to be contacted', 'Saya setuju untuk dihubungi'),
    number: L('Quantity', 'Kuantiti'),
    date: L('Date', 'Tarikh'),
  };
  return {
    id: newId('f'),
    name,
    type,
    label: label[type],
    placeholder: L('', ''),
    required: type === 'email',
    width: type === 'textarea' || type === 'checkbox' || type === 'radio' ? 'full' : 'half',
    ...(type === 'select' || type === 'radio'
      ? { options: [{ id: newId('o'), label: L('Option 1', 'Pilihan 1') }, { id: newId('o'), label: L('Option 2', 'Pilihan 2') }] }
      : {}),
  };
}

function defaultForm(email: string): FormInput {
  return {
    name: '',
    recipients: email ? [email] : [],
    subject: 'New message from the website',
    def: {
      fields: [
        { id: newId('f'), name: 'name', type: 'text', label: L('Your name', 'Nama anda'), placeholder: L('', ''), required: true, width: 'half' },
        { id: newId('f'), name: 'email', type: 'email', label: L('Email', 'E-mel'), placeholder: L('', ''), required: true, width: 'half' },
        { id: newId('f'), name: 'phone', type: 'tel', label: L('Phone number', 'Nombor telefon'), placeholder: L('', ''), required: false, width: 'half' },
        { id: newId('f'), name: 'message', type: 'textarea', label: L('Message', 'Mesej'), placeholder: L('How can we help?', 'Bagaimana kami boleh membantu?'), required: true, width: 'full' },
      ],
      submitLabel: L('Send message', 'Hantar mesej'),
      successMessage: L('Thank you! We will get back to you soon.', 'Terima kasih! Kami akan menghubungi anda tidak lama lagi.'),
    },
  };
}

/** problems keyed by field path; empty = valid */
function validate(f: FormInput): Record<string, string> {
  const e: Record<string, string> = {};
  if (!f.name.trim()) e.name = 'Give the form a name, e.g. “Wholesale enquiry”.';
  if (!f.recipients.length) e.recipients = 'Add at least one email address to receive the entries.';
  else if (f.recipients.length > 5) e.recipients = 'Use at most 5 email addresses.';
  else if (f.recipients.some((r) => !EMAIL_RE.test(r))) e.recipients = 'One of the email addresses is not valid.';
  if (!f.subject.trim()) e.subject = 'Write an email subject so you recognise these emails.';
  if (!f.def.fields.length) e.fields = 'Add at least one field.';
  const names = new Set<string>();
  f.def.fields.forEach((fl) => {
    if (!fl.label.en.trim()) e[`field.${fl.id}`] = 'Every field needs an English label.';
    else if (!/^[a-z0-9_]{1,40}$/.test(fl.name)) e[`field.${fl.id}`] = 'The field’s internal name may only use a–z, 0–9 and _.';
    else if (names.has(fl.name)) e[`field.${fl.id}`] = `Two fields share the internal name “${fl.name}”.`;
    else if ((fl.type === 'select' || fl.type === 'radio') && !(fl.options ?? []).some((o) => o.label.en.trim())) e[`field.${fl.id}`] = 'Add at least one choice.';
    names.add(fl.name);
  });
  if (Object.keys(e).some((k) => k.startsWith('field.'))) e.fields = e.fields ?? 'Some fields need attention (marked in red).';
  if (!f.def.submitLabel.en.trim()) e.submit = 'Write the text of the send button.';
  if (!f.def.successMessage.en.trim()) e.success = 'Write the thank-you message visitors see after sending.';
  if (f.def.redirectPath && !FORM_REDIRECT_RE.test(f.def.redirectPath)) e.redirect = 'Choose a page of this website.';
  return e;
}

function BiInput({ label, value, onChange, error, hint, placeholder, multiline }: { label: string; value: Localized; onChange: (v: Localized) => void; error?: string; hint?: ReactNode; placeholder?: Localized; multiline?: boolean }) {
  const Comp = multiline ? 'textarea' : 'input';
  const cls = cx(
    'w-full rounded-lg border bg-white px-3 text-sm placeholder:text-faint focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/15',
    multiline ? 'min-h-[64px] py-2' : 'h-9',
    error ? 'border-danger' : 'border-line-strong'
  );
  return (
    <Field label={label} error={error} hint={hint}>
      <div className="grid gap-2 sm:grid-cols-2">
        {(['en', 'ms'] as CmsLang[]).map((l) => (
          <div key={l} className="relative">
            <Comp
              className={cls + ' pr-10'}
              value={value[l]}
              placeholder={placeholder?.[l]}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, [l]: e.target.value })}
              aria-label={`${label} (${l === 'en' ? 'English' : 'Bahasa Melayu'})`}
              maxLength={multiline ? 600 : 160}
            />
            <span className="pointer-events-none absolute right-2.5 top-2 text-[10px] font-semibold text-faint">{l === 'en' ? 'EN' : 'BM'}</span>
          </div>
        ))}
      </div>
    </Field>
  );
}

function RecipientsInput({ value, onChange, error }: { value: string[]; onChange: (v: string[]) => void; error?: string }) {
  const [draft, setDraft] = useState('');
  const [local, setLocal] = useState<string | null>(null);
  const add = () => {
    const parts = draft.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    const bad = parts.find((p) => !EMAIL_RE.test(p));
    if (bad) {
      setLocal(`“${bad}” is not a valid email address.`);
      return;
    }
    const next = [...value, ...parts.filter((p) => !value.includes(p))];
    if (next.length > 5) {
      setLocal('Use at most 5 email addresses.');
      return;
    }
    onChange(next);
    setDraft('');
    setLocal(null);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1));
  };
  return (
    <Field label="Send entries to" error={local ?? error} hint="Up to 5 addresses. Press Enter after each one.">
      <div className={cx('flex min-h-9 flex-wrap items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/15', local || error ? 'border-danger' : 'border-line-strong')}>
        {value.map((r) => (
          <span key={r} className="inline-flex items-center gap-1 rounded-full bg-mist py-0.5 pl-2.5 pr-1 text-[13px] text-olive-dark">
            {r}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== r))} className="rounded-full p-0.5 hover:bg-white" aria-label={`Remove ${r}`}>
              <LuX className="text-[12px]" />
            </button>
          </span>
        ))}
        {value.length < 5 && (
          <input
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setLocal(null);
            }}
            onKeyDown={onKey}
            onBlur={add}
            placeholder={value.length ? 'Add another…' : 'name@example.com'}
            className="h-6 min-w-[160px] flex-1 bg-transparent px-1 text-sm focus:outline-none"
            type="email"
            aria-label="Add an email address"
          />
        )}
      </div>
    </Field>
  );
}

function FormPreview({ def, lang }: { def: CmsFormDef; lang: CmsLang }) {
  const t = (l: Localized) => l[lang] || l.en;
  const [sent, setSent] = useState(false);
  useEffect(() => setSent(false), [def, lang]);
  if (sent)
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#fffdf8] p-8 text-center">
        <LuCircleCheck className="text-3xl text-olive" />
        <p className="text-sm text-olive-dark">{t(def.successMessage)}</p>
        <button type="button" className="text-xs text-muted underline" onClick={() => setSent(false)}>
          Show the form again
        </button>
      </div>
    );
  return (
    <form
      className="grid grid-cols-2 gap-x-3 gap-y-3.5 rounded-xl border border-[#e8e0cc] bg-[#fffdf8] p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {def.fields.map((f) => {
        const label = (
          <span className="mb-1 block text-[13px] font-medium text-[#2e3a24]">
            {t(f.label)}
            {f.required && <span className="text-[#b88a2a]"> *</span>}
          </span>
        );
        const input = 'w-full rounded-lg border border-[#d9d0bb] bg-white px-3 py-2 text-sm text-[#2e3a24] placeholder:text-[#a6a08f]';
        const span = f.width === 'half' ? 'col-span-2 sm:col-span-1' : 'col-span-2';
        if (f.type === 'checkbox')
          return (
            <label key={f.id} className={cx(span, 'flex items-start gap-2 text-sm text-[#2e3a24]')}>
              <input type="checkbox" className="mt-0.5 accent-[#556b2f]" />
              <span>
                {t(f.label)}
                {f.required && <span className="text-[#b88a2a]"> *</span>}
              </span>
            </label>
          );
        if (f.type === 'radio')
          return (
            <fieldset key={f.id} className={span}>
              <legend>{label}</legend>
              <div className="flex flex-col gap-1">
                {(f.options ?? []).map((o) => (
                  <label key={o.id} className="flex items-center gap-2 text-sm text-[#2e3a24]">
                    <input type="radio" name={f.id} className="accent-[#556b2f]" /> {t(o.label)}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        return (
          <label key={f.id} className={span}>
            {label}
            {f.type === 'textarea' ? (
              <textarea rows={4} placeholder={t(f.placeholder)} className={input} />
            ) : f.type === 'select' ? (
              <select className={input} defaultValue="">
                <option value="" disabled>
                  {t(f.placeholder) || (lang === 'ms' ? 'Pilih…' : 'Choose…')}
                </option>
                {(f.options ?? []).map((o) => (
                  <option key={o.id}>{t(o.label)}</option>
                ))}
              </select>
            ) : (
              <input type={f.type} placeholder={t(f.placeholder)} className={input} />
            )}
          </label>
        );
      })}
      <div className="col-span-2 pt-1">
        <button type="submit" className="rounded-full bg-[#556b2f] px-6 py-2.5 text-sm font-medium text-[#fffdf8]">
          {t(def.submitLabel) || 'Send'}
        </button>
      </div>
    </form>
  );
}

export function FormEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const user = useUser();
  const nav = useNavigate();
  const load = useLoad(async () => (isNew ? null : api.form(Number(id))), [id]);
  const pages = useLoad(() => api.pages(), []);
  const [form, setForm] = useState<FormInput | null>(null);
  const [base, setBase] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<'save' | 'test' | 'delete' | null>(null);
  const [previewLang, setPreviewLang] = useState<CmsLang>('en');
  const submitted = useRef(false);

  useEffect(() => {
    if (isNew) {
      const f = defaultForm(user.email);
      setForm(f);
      setBase(JSON.stringify(f));
    } else if (load.data) {
      const f = { name: load.data.name, recipients: load.data.recipients, subject: load.data.subject, def: load.data.def };
      setForm(f);
      setBase(JSON.stringify(f));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load.data, isNew]);

  const dirty = !!form && JSON.stringify(form) !== base;
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  const guardedNav = useUnsavedGuard(() => dirtyRef.current);

  const redirectOptions = useMemo(() => {
    const out: { label: string; value: string }[] = [
      { label: 'Home', value: '/en' },
      { label: 'Products', value: '/en/products' },
      { label: 'Shop', value: '/en/shop' },
      { label: 'Why us', value: '/en/why-us' },
      { label: 'Contact', value: '/en/contact' },
    ];
    (pages.data ?? []).forEach((p) => out.push({ label: p.title.en || p.slug, value: `/en/${p.slug}` }));
    return out;
  }, [pages.data]);

  if (!isNew && load.error) return <ErrorBlock message={load.error} onRetry={() => void load.reload()} />;
  if (!form) return <LoadingBlock />;

  const update = (patch: Partial<FormInput>) => {
    const next = { ...form, ...patch };
    setForm(next);
    if (submitted.current) setErrors(validate(next));
  };
  const setDef = (patch: Partial<CmsFormDef>) => update({ def: { ...form.def, ...patch } });

  const save = async () => {
    submitted.current = true;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      toast.error('Please fix the items marked in red.');
      return false;
    }
    setBusy('save');
    try {
      const clean: FormInput = { ...form, name: form.name.trim(), subject: form.subject.trim(), def: { ...form.def, redirectPath: form.def.redirectPath || undefined } };
      if (isNew) {
        const r = await api.createForm(clean);
        setBase(JSON.stringify(form));
        dirtyRef.current = false;
        toast.ok('Form created. Add it to a page with the Form widget.');
        nav(`/forms/${r.id}`, { replace: true });
      } else {
        const r = await api.saveForm(Number(id), clean);
        setBase(JSON.stringify(form));
        toast.ok('Form saved.');
        if (r.dirtyPages?.length) void rerenderDirtyPages();
      }
      return true;
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setErrors(err.fields);
      toastError(err);
      return false;
    } finally {
      setBusy(null);
    }
  };

  const test = async () => {
    if (dirty && !(await save())) return;
    setBusy('test');
    try {
      const r = await api.testEmail(Number(id));
      toast.ok(`Test email sent to ${(r.sentTo ?? form.recipients).join(', ')}. Check the inbox (and spam folder).`, 6000);
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const remove = async () => {
    setBusy('delete');
    try {
      const used = await api.formUsage(Number(id));
      if (used.length) {
        const titles = used.map((pid) => pages.data?.find((p) => p.id === pid)?.title.en ?? `Page #${pid}`);
        await confirmDialog({ title: 'This form is still on a page', message: `Remove the form from these pages first:\n\n${titles.map((t) => '• ' + t).join('\n')}`, confirmLabel: 'OK' });
        return;
      }
      if (!(await confirmDialog({ title: `Delete “${form.name}”?`, message: 'Entries already received stay in the inbox.', confirmLabel: 'Delete form', danger: true }))) return;
      await api.deleteForm(Number(id));
      setBase(JSON.stringify(form));
      dirtyRef.current = false;
      toast.ok('Form deleted.');
      nav('/forms');
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const taken = form.def.fields.map((f) => f.name);
  const missingMs = form.def.fields.some((f) => f.label.en && !f.label.ms) || (!!form.def.submitLabel.en && !form.def.submitLabel.ms) || (!!form.def.successMessage.en && !form.def.successMessage.ms);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="button" onClick={() => void guardedNav('/forms')} className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted hover:text-ink sm:self-center">
          <LuArrowLeft /> Forms
        </button>
        <h1 className="min-w-0 flex-1 truncate font-display text-[26px] text-olive-dark">{isNew ? 'New form' : form.name || 'Untitled form'}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {!isNew && (
            <>
              <Button variant="dangerGhost" icon={<LuTrash2 />} loading={busy === 'delete'} onClick={() => void remove()}>
                Delete
              </Button>
              <Button icon={<LuSend />} loading={busy === 'test'} onClick={() => void test()} title="Sends a sample entry to the addresses below">
                Send test email
              </Button>
            </>
          )}
          {!isNew && !dirty ? (
            <span className="inline-flex h-9 items-center gap-1.5 px-2 text-[13px] text-ok">
              <LuCircleCheck /> All changes saved
            </span>
          ) : (
            <Button variant="primary" loading={busy === 'save'} onClick={() => void save()}>
              {isNew ? 'Create form' : 'Save changes'}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-olive-dark">Where entries go</h2>
            <Field label="Form name" error={errors.name} hint="Only you see this name — in the inbox and in the builder.">
              <Input value={form.name} onChange={(e) => update({ name: e.target.value })} invalid={!!errors.name} placeholder="e.g. Wholesale enquiry" maxLength={80} />
            </Field>
            <RecipientsInput value={form.recipients} onChange={(recipients) => update({ recipients })} error={errors.recipients} />
            <Field label="Email subject" error={errors.subject} hint="Emails arrive as “[Website] subject — page name”.">
              <Input value={form.subject} onChange={(e) => update({ subject: e.target.value })} invalid={!!errors.subject} maxLength={120} />
            </Field>
          </Card>

          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg text-olive-dark">Fields</h2>
              <Menu
                label="Add a field"
                trigger={
                  <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong bg-white px-3 text-[13px] font-medium text-ink">
                    <LuPlus /> Add field
                  </span>
                }
                items={(Object.keys(TYPE_META) as FormFieldType[]).map((t) => ({
                  label: TYPE_META[t].label,
                  icon: TYPE_META[t].icon,
                  onSelect: () => setDef({ fields: [...form.def.fields, newField(t, taken)] }),
                }))}
              />
            </div>
            {errors.fields && <p className="rounded-lg bg-danger-soft px-3 py-2 text-[13px] text-danger">{errors.fields}</p>}
            <ItemList
              items={form.def.fields}
              onChange={(fields) => setDef({ fields })}
              addLabel="Add a short text field"
              make={() => newField('text', taken)}
              title={(f) => `${f.label.en || 'Untitled'} · ${TYPE_META[f.type].label}${f.required ? ' · required' : ''}${errors[`field.${f.id}`] ? '  ⚠' : ''}`}
              render={(f, set) => (
                <>
                  {errors[`field.${f.id}`] && <p className="rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">{errors[`field.${f.id}`]}</p>}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Type">
                      <Select
                        value={f.type}
                        onChange={(e) => {
                          const type = e.target.value as FormFieldType;
                          set({ type, ...(type === 'select' || type === 'radio' ? { options: f.options?.length ? f.options : newField(type, []).options } : { options: undefined }) });
                        }}
                      >
                        {(Object.keys(TYPE_META) as FormFieldType[]).map((t) => (
                          <option key={t} value={t}>
                            {TYPE_META[t].label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Width">
                      <Segmented
                        value={f.width}
                        onChange={(width) => set({ width })}
                        options={[
                          { value: 'half', label: 'Half' },
                          { value: 'full', label: 'Full' },
                        ]}
                      />
                    </Field>
                  </div>
                  <BiInput label="Label" value={f.label} onChange={(label) => set({ label })} />
                  {f.type !== 'checkbox' && f.type !== 'radio' && f.type !== 'date' && (
                    <BiInput label="Hint inside the box (optional)" value={f.placeholder} onChange={(placeholder) => set({ placeholder })} />
                  )}
                  {(f.type === 'select' || f.type === 'radio') && (
                    <Field label="Choices">
                      <div className="flex flex-col gap-2">
                        {(f.options ?? []).map((o, i) => (
                          <div key={o.id} className="flex items-center gap-2">
                            <Input value={o.label.en} placeholder={`Choice ${i + 1}`} aria-label={`Choice ${i + 1} English`} onChange={(e) => set({ options: (f.options ?? []).map((x) => (x.id === o.id ? { ...x, label: { ...x.label, en: e.target.value } } : x)) })} />
                            <Input value={o.label.ms} placeholder="BM" aria-label={`Choice ${i + 1} Bahasa Melayu`} onChange={(e) => set({ options: (f.options ?? []).map((x) => (x.id === o.id ? { ...x, label: { ...x.label, ms: e.target.value } } : x)) })} />
                            <button type="button" aria-label="Remove choice" className="rounded p-1.5 text-muted hover:bg-danger-soft hover:text-danger" onClick={() => set({ options: (f.options ?? []).filter((x) => x.id !== o.id) })}>
                              <LuX />
                            </button>
                          </div>
                        ))}
                        <Button size="sm" icon={<LuPlus />} className="self-start" onClick={() => set({ options: [...(f.options ?? []), { id: newId('o'), label: { en: '', ms: '' } }] })}>
                          Add a choice
                        </Button>
                      </div>
                    </Field>
                  )}
                  <div className="grid items-start gap-3 sm:grid-cols-3">
                    <div className="sm:pt-8">
                      <Checkbox checked={f.required} onChange={(required) => set({ required })} label="Must be filled in" />
                    </div>
                    {f.type === 'text' || f.type === 'textarea' ? (
                      <Field label="Max characters">
                        <Input
                          type="number"
                          min={1}
                          max={f.type === 'textarea' ? 5000 : 2000}
                          value={f.maxLength ?? ''}
                          placeholder={f.type === 'textarea' ? '5000' : '2000'}
                          onChange={(e) => set({ maxLength: e.target.value ? Math.max(1, Math.min(f.type === 'textarea' ? 5000 : 2000, Number(e.target.value))) : undefined })}
                        />
                      </Field>
                    ) : (
                      <span className="hidden sm:block" />
                    )}
                    <Field label="Internal name" hint="Used in emails and the spreadsheet.">
                      <Input value={f.name} onChange={(e) => set({ name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 40) })} className="font-mono text-xs" />
                    </Field>
                  </div>
                </>
              )}
            />
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="font-display text-lg text-olive-dark">After sending</h2>
            <BiInput label="Send button text" value={form.def.submitLabel} onChange={(submitLabel) => setDef({ submitLabel })} error={errors.submit} />
            <BiInput label="Thank-you message" value={form.def.successMessage} onChange={(successMessage) => setDef({ successMessage })} error={errors.success} multiline />
            <Field label="Then go to a page (optional)" error={errors.redirect} hint="Leave empty to show the thank-you message on the same page.">
              <Select value={form.def.redirectPath ?? ''} onChange={(e) => setDef({ redirectPath: e.target.value || undefined })}>
                <option value="">Stay on the same page</option>
                {redirectOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} ({o.value})
                  </option>
                ))}
              </Select>
            </Field>
            {missingMs && <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs text-warn">Some Bahasa Melayu texts are empty — the Malay page will show the English text there.</p>}
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg text-olive-dark">Preview</h2>
              <Segmented
                size="sm"
                value={previewLang}
                onChange={setPreviewLang}
                options={[
                  { value: 'en', label: 'EN' },
                  { value: 'ms', label: 'BM' },
                ]}
              />
            </div>
            <FormPreview def={form.def} lang={previewLang} />
            <p className="text-xs text-muted">This is how the form looks on a page. Try the button to see the thank-you message.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
