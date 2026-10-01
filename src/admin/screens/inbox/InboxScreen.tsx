import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LuDownload, LuInbox, LuMail, LuMailOpen, LuRefreshCw, LuSend, LuTrash2 } from 'react-icons/lu';
import { api, type MailStatus, type Submission } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtAgo, fmtDateTime } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { useSession } from '../../lib/session';
import { Drawer } from '../../ui/Modal';
import { Button, Card, Chip, EmptyState, ErrorBlock, LoadingBlock, PageHeader, Segmented, Select } from '../../ui/ui';

const PAGE = 50;

export function MailChip({ s }: { s: MailStatus }) {
  if (s === 'sent') return <Chip tone="ok">Emailed</Chip>;
  if (s === 'failed') return <Chip tone="danger">Email failed</Chip>;
  if (s === 'held') return <Chip tone="warn">Waiting</Chip>;
  return <Chip>Spam</Chip>;
}

function summary(s: Submission): { title: string; sub: string } {
  const vals = Object.entries(s.data);
  const email = vals.find(([k, v]) => /mail/i.test(k) && typeof v === 'string')?.[1] as string | undefined;
  const name = vals.find(([k, v]) => /name/i.test(k) && typeof v === 'string')?.[1] as string | undefined;
  const msg = vals.find(([k, v]) => /message|comment|enquiry|question/i.test(k) && typeof v === 'string')?.[1] as string | undefined;
  const first = vals.find(([, v]) => typeof v === 'string' && v.trim())?.[1] as string | undefined;
  return { title: name || email || first || `Entry #${s.id}`, sub: msg || (name && email ? email : '') || '' };
}

export function InboxScreen() {
  const [params, setParams] = useSearchParams();
  const { refreshUnread } = useSession();
  const form = params.get('form') ? Number(params.get('form')) : undefined;
  const page = params.get('page') ? Number(params.get('page')) : undefined;
  const unread = params.get('unread') === '1';
  const status = (params.get('status') ?? '') as MailStatus | '';
  const openId = params.get('open') ? Number(params.get('open')) : null;
  const [limit, setLimit] = useState(PAGE);

  const forms = useLoad(() => api.forms(), []);
  const pages = useLoad(() => api.pages(), []);
  const list = useLoad(() => api.submissions({ form, page, unread, status, limit, offset: 0 }), [form, page, unread, status, limit]);
  const [detail, setDetail] = useState<Submission | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const setParam = (k: string, v: string | null) => {
    const p = new URLSearchParams(params);
    if (v) p.set(k, v);
    else p.delete(k);
    if (k !== 'open') p.delete('open');
    setParams(p, { replace: true });
    if (k !== 'open') setLimit(PAGE);
  };

  // open from a link (?open=id) once the list has it
  useEffect(() => {
    if (openId == null || !list.data) return;
    const s = list.data.items.find((x) => x.id === openId);
    if (s) void open(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, list.data]);

  const patchLocal = (id: number, patch: Partial<Submission>) => {
    list.setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === id ? { ...x, ...patch } : x)) } : d));
    setDetail((d) => (d && d.id === id ? { ...d, ...patch } : d));
  };

  const open = async (s: Submission) => {
    setDetail(s);
    if (!s.readAt) {
      patchLocal(s.id, { readAt: new Date().toISOString() });
      try {
        await api.markSubmission(s.id, true);
        refreshUnread();
      } catch {
        patchLocal(s.id, { readAt: null });
      }
    }
  };

  const markUnread = async (s: Submission) => {
    setBusy('read');
    try {
      await api.markSubmission(s.id, !s.readAt ? true : false);
      patchLocal(s.id, { readAt: s.readAt ? null : new Date().toISOString() });
      refreshUnread();
      if (s.readAt) setDetail(null);
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const resend = async (s: Submission) => {
    setBusy('resend');
    try {
      const r = await api.resendSubmission(s.id);
      patchLocal(s.id, { mailStatus: r.mailStatus, mailError: r.mailError ?? null });
      if (r.mailStatus === 'sent') toast.ok('Email sent.');
      else toast.error(r.mailError || 'The email could not be sent yet. Try again later.');
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (s: Submission) => {
    if (!(await confirmDialog({ title: 'Delete this entry?', message: 'It is removed for good. This cannot be undone.', confirmLabel: 'Delete entry', danger: true }))) return;
    setBusy('delete');
    try {
      await api.deleteSubmission(s.id);
      list.setData((d) => (d ? { ...d, items: d.items.filter((x) => x.id !== s.id), total: d.total - 1 } : d));
      setDetail(null);
      refreshUnread();
      toast.ok('Entry deleted.');
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(null);
    }
  };

  const formName = useMemo(() => new Map((forms.data ?? []).map((f) => [f.id, f.name])), [forms.data]);
  const items = list.data?.items ?? [];

  return (
    <>
      <PageHeader
        title="Inbox"
        subtitle="Every form entry from the website. Entries are kept until you delete them."
        actions={
          <>
            <Button icon={<LuRefreshCw />} onClick={() => void list.reload()}>
              Refresh
            </Button>
            <Button
              icon={<LuDownload />}
              title={form ? `Download entries of “${formName.get(form) ?? ''}” as a spreadsheet (CSV)` : 'Choose a form first'}
              onClick={() => {
                if (!form) toast.info('Choose a form first — each form is exported to its own spreadsheet.');
                else window.location.href = api.exportUrl(form);
              }}
            >
              Export CSV
            </Button>
          </>
        }
      />
      <Card padded={false}>
        <div className="flex flex-col gap-3 border-b border-line px-4 py-3 lg:flex-row lg:items-center lg:px-5">
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <Select value={form ?? ''} onChange={(e) => setParam('form', e.target.value || null)} aria-label="Form" className="sm:w-52">
              <option value="">All forms</option>
              {(forms.data ?? []).map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </Select>
            <Select value={page ?? ''} onChange={(e) => setParam('page', e.target.value || null)} aria-label="Page" className="sm:w-52">
              <option value="">All pages</option>
              {(pages.data ?? []).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title.en || p.slug}
                </option>
              ))}
            </Select>
          </div>
          <div className="overflow-x-auto lg:ml-auto">
            <Segmented
              size="sm"
              value={unread ? 'unread' : status || 'all'}
              onChange={(v) => {
                const p = new URLSearchParams(params);
                p.delete('unread');
                p.delete('status');
                p.delete('open');
                if (v === 'unread') p.set('unread', '1');
                else if (v !== 'all') p.set('status', v);
                setParams(p, { replace: true });
                setLimit(PAGE);
              }}
              options={[
                { value: 'all', label: 'All' },
                { value: 'unread', label: 'Unread' },
                { value: 'failed', label: 'Email failed' },
                { value: 'held', label: 'Waiting' },
                { value: 'spam', label: 'Spam' },
              ]}
            />
          </div>
        </div>
        {list.loading && !list.data && <LoadingBlock />}
        {list.error && (
          <div className="p-5">
            <ErrorBlock message={list.error} onRetry={() => void list.reload()} />
          </div>
        )}
        {list.data && items.length === 0 && (
          <EmptyState
            icon={<LuInbox />}
            title={form || page || unread || status ? 'Nothing here' : 'No entries yet'}
            body={form || page || unread || status ? 'No entries match these filters.' : 'When a visitor sends one of your forms, the entry appears here and is emailed to you.'}
          />
        )}
        {items.length > 0 && (
          <ul className="divide-y divide-line">
            {items.map((s) => {
              const sm = summary(s);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setParam('open', String(s.id));
                      void open(s);
                    }}
                    className={cx('flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-sand/50 sm:px-5', detail?.id === s.id && 'bg-mist/50')}
                  >
                    <span className={cx('mt-1.5 h-2 w-2 shrink-0 rounded-full', s.readAt ? 'bg-transparent' : 'bg-gold')} aria-label={s.readAt ? undefined : 'Unread'} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={cx('truncate text-sm', s.readAt ? 'text-ink' : 'font-semibold text-ink')}>{sm.title}</span>
                        <span className="ml-auto shrink-0 text-xs text-muted" title={fmtDateTime(s.createdAt)}>
                          {fmtAgo(s.createdAt)}
                        </span>
                      </div>
                      {sm.sub && <div className="mt-0.5 line-clamp-1 text-[13px] text-muted">{sm.sub}</div>}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-faint">
                        <span>{s.formName || formName.get(s.formId)}</span>
                        {s.pageTitle && <span>· {s.pageTitle}</span>}
                        <span>· {s.lang === 'ms' ? 'BM' : 'EN'}</span>
                        {s.mailStatus !== 'sent' && <MailChip s={s.mailStatus} />}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {list.data && list.data.total > items.length && (
          <div className="border-t border-line p-4 text-center">
            <Button loading={list.loading} onClick={() => setLimit((l) => l + PAGE)}>
              Show more ({list.data.total - items.length} more)
            </Button>
          </div>
        )}
      </Card>

      {detail && (
        <Drawer
          open
          onClose={() => {
            setDetail(null);
            setParam('open', null);
          }}
          title={summary(detail).title}
          footer={
            <>
              <Button variant="dangerGhost" icon={<LuTrash2 />} loading={busy === 'delete'} onClick={() => void remove(detail)}>
                Delete
              </Button>
              <div className="ml-auto flex flex-wrap gap-2">
                <Button icon={detail.readAt ? <LuMail /> : <LuMailOpen />} loading={busy === 'read'} onClick={() => void markUnread(detail)}>
                  {detail.readAt ? 'Mark as unread' : 'Mark as read'}
                </Button>
                {(detail.mailStatus === 'failed' || detail.mailStatus === 'held') && (
                  <Button variant="primary" icon={<LuSend />} loading={busy === 'resend'} onClick={() => void resend(detail)}>
                    Resend email
                  </Button>
                )}
              </div>
            </>
          }
        >
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <MailChip s={detail.mailStatus} />
            <span>{fmtDateTime(detail.createdAt)}</span>
            <span>· {detail.formName || formName.get(detail.formId)}</span>
            {detail.pageTitle && <span>· from “{detail.pageTitle}”</span>}
            <span>· {detail.lang === 'ms' ? 'Bahasa Melayu' : 'English'}</span>
          </div>
          {detail.mailStatus === 'failed' && (
            <p className="mb-4 rounded-lg bg-danger-soft px-3 py-2 text-[13px] text-danger">
              The email could not be sent{detail.mailError ? `: ${detail.mailError.trim().replace(/\.?$/, '.')}` : '.'} The entry is safe here — press Resend email to try again.
            </p>
          )}
          {detail.mailStatus === 'held' && (
            <p className="mb-4 rounded-lg bg-warn-soft px-3 py-2 text-[13px] text-warn">
              Not emailed yet because the hourly email limit was reached (this protects the website from being flagged as spam). Press Resend email to send it now.
            </p>
          )}
          {detail.mailStatus === 'spam' && <p className="mb-4 rounded-lg bg-sand px-3 py-2 text-[13px] text-muted">This entry looked like spam, so it was not emailed.</p>}
          <dl className="flex flex-col divide-y divide-line rounded-xl border border-line bg-white">
            {Object.entries(detail.data).map(([k, v]) => {
              const val = Array.isArray(v) ? v.join(', ') : v;
              const isEmail = typeof val === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
              const isTel = /phone|tel/i.test(k) && typeof val === 'string' && /^[+\d][\d\s-]{5,}$/.test(val);
              return (
                <div key={k} className="px-4 py-3">
                  <dt className="text-xs font-medium text-muted">{detail.labels?.[k] ?? k.replace(/_/g, ' ')}</dt>
                  <dd className="mt-0.5 whitespace-pre-wrap break-words text-sm text-ink">
                    {isEmail ? (
                      <a href={`mailto:${val}`} className="text-olive underline">
                        {val}
                      </a>
                    ) : isTel ? (
                      <a href={`tel:${val.replace(/\s/g, '')}`} className="text-olive underline">
                        {val}
                      </a>
                    ) : val === '' ? (
                      <span className="text-faint">—</span>
                    ) : (
                      val
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Drawer>
      )}
    </>
  );
}
