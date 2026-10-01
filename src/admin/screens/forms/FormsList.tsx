import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuInbox, LuPencil, LuPlus, LuSquarePen, LuTrash2 } from 'react-icons/lu';
import { api, type FormListItem } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { fmtAgo, plural } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { Menu } from '../../ui/Menu';
import { Button, Card, Chip, EmptyState, ErrorBlock, LoadingBlock, PageHeader } from '../../ui/ui';

export function FormsList() {
  const nav = useNavigate();
  const forms = useLoad(() => api.forms(), []);
  const pages = useLoad(() => api.pages(), []);
  const pageTitle = useMemo(() => {
    const m = new Map<number, string>();
    (pages.data ?? []).forEach((p) => m.set(p.id, p.title.en || p.slug));
    return (id: number) => m.get(id) ?? `Page #${id}`;
  }, [pages.data]);

  const remove = async (f: FormListItem) => {
    if (f.usedOn.length) {
      await confirmDialog({
        title: 'This form is still on a page',
        message: `Remove the form from these pages first:\n\n${f.usedOn.map((id) => '• ' + pageTitle(id)).join('\n')}`,
        confirmLabel: 'OK',
        cancelLabel: 'Close',
      });
      return;
    }
    const ok = await confirmDialog({
      title: `Delete “${f.name}”?`,
      message: f.entries ? `Its ${plural(f.entries, 'entry', 'entries')} stay in the inbox.` : undefined,
      confirmLabel: 'Delete form',
      danger: true,
    });
    if (!ok) return;
    try {
      await api.deleteForm(f.id);
      toast.ok('Form deleted.');
      void forms.reload(true);
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <>
      <PageHeader
        title="Forms"
        subtitle="Forms visitors fill in on your pages. Every entry is saved in the inbox and emailed to the addresses you choose."
        actions={
          <Button variant="primary" icon={<LuPlus />} onClick={() => nav('/forms/new')}>
            New form
          </Button>
        }
      />
      <Card padded={false}>
        {forms.loading && !forms.data && <LoadingBlock />}
        {forms.error && (
          <div className="p-5">
            <ErrorBlock message={forms.error} onRetry={() => void forms.reload()} />
          </div>
        )}
        {forms.data && forms.data.length === 0 && (
          <EmptyState
            icon={<LuSquarePen />}
            title="No forms yet"
            body="Create a form — for example “Wholesale enquiry” — then add it to a page with the Form widget."
            action={
              <Button variant="primary" icon={<LuPlus />} onClick={() => nav('/forms/new')}>
                Create a form
              </Button>
            }
          />
        )}
        {forms.data && forms.data.length > 0 && (
          <ul className="divide-y divide-line">
            {forms.data.map((f) => (
              <li key={f.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                <div className="min-w-0 flex-1">
                  <Link to={`/forms/${f.id}`} className="font-medium text-ink hover:text-olive">
                    {f.name}
                  </Link>
                  <div className="mt-0.5 truncate text-xs text-muted">
                    Emails to {f.recipients[0]}
                    {f.recipients.length > 1 ? ` + ${f.recipients.length - 1} more` : ''}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:w-[46%] sm:flex-nowrap sm:justify-end">
                  <Link to={`/inbox?form=${f.id}`} className="shrink-0">
                    <Chip tone={f.unread ? 'gold' : 'neutral'}>
                      {plural(f.entries, 'entry', 'entries')}
                      {f.unread ? ` · ${f.unread} new` : ''}
                    </Chip>
                  </Link>
                  <span className="min-w-0 truncate text-xs text-muted" title={f.usedOn.map(pageTitle).join(', ')}>
                    {f.usedOn.length ? `On ${f.usedOn.map(pageTitle).join(', ')}` : 'Not on any page yet'}
                  </span>
                  <span className="hidden shrink-0 text-xs text-faint md:inline">{fmtAgo(f.updatedAt)}</span>
                  <Menu
                    items={[
                      { label: 'Edit', icon: <LuPencil />, onSelect: () => nav(`/forms/${f.id}`) },
                      { label: 'View entries', icon: <LuInbox />, onSelect: () => nav(`/inbox?form=${f.id}`) },
                      'sep',
                      { label: 'Delete', icon: <LuTrash2 />, danger: true, onSelect: () => void remove(f) },
                    ]}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
