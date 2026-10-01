import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuCopy, LuExternalLink, LuFilePlus2, LuFileText, LuPencil, LuRotateCcw, LuSearch, LuSettings2, LuTrash2 } from 'react-icons/lu';
import { api, type PageListItem } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtAgo, fmtDate } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { Menu } from '../../ui/Menu';
import { Button, Card, Chip, EmptyState, ErrorBlock, Input, LoadingBlock, PageHeader, Segmented, Tabs } from '../../ui/ui';
import { NewPageDialog } from './NewPageDialog';

type Filter = 'all' | 'published' | 'draft' | 'changes';

export function StatusChip({ p }: { p: Pick<PageListItem, 'status' | 'hasUnpublished'> }) {
  if (p.status === 'draft') return <Chip tone="neutral" dot>Draft</Chip>;
  if (p.hasUnpublished) return <Chip tone="warn" dot>Changes not published</Chip>;
  return <Chip tone="ok" dot>Published</Chip>;
}

function LangChips({ p }: { p: PageListItem }) {
  const chip = (l: 'en' | 'ms', label: string, name: string) => {
    const live = p.langs.includes(l);
    return (
      <span title={live ? `Live in ${name}` : `Not on the website in ${name}`}>
        <Chip tone={live ? 'ok' : 'neutral'} className={cx('!px-1.5', !live && 'opacity-55 line-through decoration-1')}>
          {label}
        </Chip>
      </span>
    );
  };
  return (
    <div className="flex flex-wrap items-center gap-1">
      {chip('en', 'EN', 'English')}
      {chip('ms', 'BM', 'Bahasa Melayu')}
      {p.needsTranslation > 0 && (
        <span className="text-[11.5px] text-warn" title="Malay fields that are still empty">
          {p.needsTranslation} to translate
        </span>
      )}
    </div>
  );
}

export function PagesScreen() {
  const nav = useNavigate();
  const [tab, setTab] = useState<'pages' | 'trash'>('pages');
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const list = useLoad(() => api.pages(false), []);
  const trash = useLoad(() => api.pages(true), []);

  const rows = useMemo(() => {
    const src = (tab === 'pages' ? list.data : trash.data) ?? [];
    const needle = q.trim().toLowerCase();
    return src
      .filter((p) => !needle || p.title.en.toLowerCase().includes(needle) || p.title.ms.toLowerCase().includes(needle) || p.slug.includes(needle))
      .filter((p) =>
        tab === 'trash' || filter === 'all'
          ? true
          : filter === 'published'
            ? p.status === 'published' && !p.hasUnpublished
            : filter === 'draft'
              ? p.status === 'draft'
              : p.status === 'published' && p.hasUnpublished
      )
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  }, [list.data, trash.data, tab, q, filter]);

  const takenSlugs = useMemo(() => [...(list.data ?? []), ...(trash.data ?? [])].map((p) => p.slug), [list.data, trash.data]);

  const act = async (id: number, fn: () => Promise<unknown>, ok: string) => {
    setBusyId(id);
    try {
      await fn();
      toast.ok(ok);
      await Promise.all([list.reload(true), trash.reload(true)]);
    } catch (e) {
      toastError(e);
    } finally {
      setBusyId(null);
    }
  };

  const trashPage = async (p: PageListItem) => {
    const ok = await confirmDialog({
      title: `Move “${p.title.en || p.slug}” to the trash?`,
      message:
        p.status === 'published'
          ? 'The page disappears from the website straight away (visitors see “page removed”). You can restore it from the trash.'
          : 'You can restore it from the trash later.',
      confirmLabel: 'Move to trash',
      danger: true,
    });
    if (ok) void act(p.id, () => api.trashPage(p.id), 'Page moved to the trash.');
  };

  const purge = async (p: PageListItem) => {
    const ok = await confirmDialog({
      title: `Delete “${p.title.en || p.slug}” forever?`,
      message: 'The page and all its versions are removed for good, and its address can be used again. This cannot be undone.',
      confirmLabel: 'Delete forever',
      danger: true,
    });
    if (ok) void act(p.id, () => api.purgePage(p.id), 'Page deleted for good.');
  };

  const loading = tab === 'pages' ? list.loading && !list.data : trash.loading && !trash.data;
  const error = tab === 'pages' ? list.error : trash.error;

  const actions = (p: PageListItem) =>
    tab === 'trash'
      ? [
          { label: 'Restore', icon: <LuRotateCcw />, onSelect: () => void act(p.id, () => api.restorePage(p.id), 'Page restored as it was.') },
          'sep' as const,
          { label: 'Delete forever', icon: <LuTrash2 />, danger: true, onSelect: () => void purge(p) },
        ]
      : [
          { label: 'Edit', icon: <LuPencil />, onSelect: () => nav(`/pages/${p.id}/edit`) },
          {
            label: p.status === 'published' ? 'View on website' : 'Preview draft',
            icon: <LuExternalLink />,
            onSelect: () => window.open(`/en/${p.slug}${p.status === 'published' ? '' : '?cms-preview=1'}`, '_blank', 'noopener'),
          },
          { label: 'Duplicate', icon: <LuCopy />, onSelect: () => void act(p.id, () => api.duplicatePage(p.id), 'Copy created as a draft.') },
          { label: 'Settings', icon: <LuSettings2 />, onSelect: () => nav(`/pages/${p.id}/edit?panel=settings`) },
          'sep' as const,
          { label: 'Move to trash', icon: <LuTrash2 />, danger: true, onSelect: () => void trashPage(p) },
        ];

  return (
    <>
      <PageHeader
        title="Pages"
        subtitle="New pages you build yourself. To change the words on Home, Products and the other built-in pages, use Site pages."
        actions={
          <Button variant="primary" icon={<LuFilePlus2 />} onClick={() => setNewOpen(true)}>
            New page
          </Button>
        }
      />
      <Card padded={false}>
        <div className="px-4 pt-2 sm:px-5">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'pages', label: 'All pages', badge: list.data ? <span className="text-xs text-faint">{list.data.length}</span> : null },
              { value: 'trash', label: 'Trash', badge: trash.data?.length ? <span className="text-xs text-faint">{trash.data.length}</span> : null },
            ]}
          />
        </div>
        <div className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <div className="relative sm:w-72">
            <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title or address" className="pl-9" aria-label="Search pages" />
          </div>
          {tab === 'pages' && (
            <div className="overflow-x-auto">
              <Segmented
                size="sm"
                value={filter}
                onChange={setFilter}
                ariaLabel="Filter by status"
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Drafts' },
                  { value: 'changes', label: 'Changes not published' },
                ]}
              />
            </div>
          )}
        </div>
        {loading && <LoadingBlock />}
        {error && (
          <div className="p-5">
            <ErrorBlock message={error} onRetry={() => void (tab === 'pages' ? list.reload() : trash.reload())} />
          </div>
        )}
        {!loading && !error && rows.length === 0 && (
          tab === 'trash' ? (
            <EmptyState icon={<LuTrash2 />} title="The trash is empty" body="Pages you move to the trash appear here and can be restored." />
          ) : q || filter !== 'all' ? (
            <EmptyState icon={<LuSearch />} title="No pages match" body="Try another word or clear the filter." action={<Button onClick={() => { setQ(''); setFilter('all'); }}>Clear search</Button>} />
          ) : (
            <EmptyState
              icon={<LuFileText />}
              title="No pages yet"
              body="Build your first page — a landing page for a promotion, an about page or a contact page with a form."
              action={<Button variant="primary" icon={<LuFilePlus2 />} onClick={() => setNewOpen(true)}>Create your first page</Button>}
            />
          )
        )}
        {rows.length > 0 && (
          <>
            {/* desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[12px] uppercase tracking-wide text-faint">
                    <th className="px-5 py-2.5 font-medium">Page</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="px-3 py-2.5 font-medium">Languages</th>
                    <th className="px-3 py-2.5 font-medium">Menu</th>
                    <th className="px-3 py-2.5 font-medium">{tab === 'trash' ? 'Deleted' : 'Updated'}</th>
                    <th className="w-12 px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((p) => (
                    <tr key={p.id} className={cx('group hover:bg-sand/40', busyId === p.id && 'opacity-50')}>
                      <td className="max-w-[340px] px-5 py-3">
                        {tab === 'pages' ? (
                          <Link to={`/pages/${p.id}/edit`} className="block truncate font-medium text-ink hover:text-olive">
                            {p.title.en || <span className="italic text-muted">Untitled</span>}
                          </Link>
                        ) : (
                          <span className="block truncate font-medium text-ink">{p.title.en || 'Untitled'}</span>
                        )}
                        <span className="block truncate text-xs text-muted">/en/{p.slug}</span>
                      </td>
                      <td className="px-3 py-3">
                        <StatusChip p={p} />
                      </td>
                      <td className="px-3 py-3">
                        <LangChips p={p} />
                      </td>
                      <td className="px-3 py-3 text-xs text-muted">
                        {[p.inHeader && 'Top menu', p.inFooter && 'Footer'].filter(Boolean).join(' · ') || '—'}
                      </td>
                      <td className="px-3 py-3 text-xs text-muted" title={fmtDate(tab === 'trash' ? p.deletedAt : p.updatedAt)}>
                        {fmtAgo(tab === 'trash' ? p.deletedAt : p.updatedAt)}
                        {p.updatedBy && tab === 'pages' && <span className="block text-faint">by {p.updatedBy}</span>}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <Menu items={actions(p)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* phone cards */}
            <ul className="divide-y divide-line md:hidden">
              {rows.map((p) => (
                <li key={p.id} className={cx('flex items-start gap-3 px-4 py-3.5', busyId === p.id && 'opacity-50')}>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-ink">{p.title.en || 'Untitled'}</div>
                    <div className="truncate text-xs text-muted">/en/{p.slug}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {tab === 'pages' && <StatusChip p={p} />}
                      <LangChips p={p} />
                      <span className="text-xs text-faint">{fmtAgo(tab === 'trash' ? p.deletedAt : p.updatedAt)}</span>
                    </div>
                  </div>
                  <Menu items={actions(p)} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
      <NewPageDialog open={newOpen} onClose={() => setNewOpen(false)} takenSlugs={takenSlugs} />
    </>
  );
}
