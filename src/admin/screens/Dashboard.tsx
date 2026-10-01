import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuArrowRight, LuCircleAlert, LuFilePlus2, LuHouse, LuInbox, LuPanelsTopLeft, LuRefreshCw, LuSend } from 'react-icons/lu';
import { api } from '../api';
import { useLoad } from '../lib/hooks';
import { useUser } from '../lib/session';
import { rerenderDirtyPages } from '../lib/render';
import { fmtAgo, plural } from '../lib/format';
import { cx } from '../lib/cx';
import { Button, Card, Chip, ErrorBlock, LoadingBlock, PageHeader } from '../ui/ui';
import { NewPageDialog } from './pages/NewPageDialog';

function Stat({ label, value, hint, tone = 'neutral', to, icon }: { label: string; value: ReactNode; hint?: ReactNode; tone?: 'neutral' | 'warn' | 'danger' | 'ok'; to?: string; icon: ReactNode }) {
  const body = (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium leading-tight text-muted sm:text-[13px]">{label}</span>
        <span
          className={cx(
            'hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base sm:flex',
            tone === 'danger' ? 'bg-danger-soft text-danger' : tone === 'warn' ? 'bg-warn-soft text-warn' : tone === 'ok' ? 'bg-ok-soft text-ok' : 'bg-mist text-olive'
          )}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 font-display text-[30px] leading-none text-olive-dark tabular-nums sm:text-[34px]">{value}</div>
      {hint && <div className="mt-2 text-[12px] leading-snug text-muted sm:text-[12.5px]">{hint}</div>}
    </div>
  );
  return (
    <Card padded={false} className={cx('transition-shadow', to && 'hover:shadow-[var(--shadow-pop)]')}>
      {to ? (
        <Link to={to} className="block h-full rounded-xl">
          {body}
        </Link>
      ) : (
        body
      )}
    </Card>
  );
}

export function Dashboard() {
  const user = useUser();
  const nav = useNavigate();
  const { data, error, loading, reload } = useLoad(() => api.dashboard(), []);
  const [newOpen, setNewOpen] = useState(false);

  // Pages whose published HTML is out of date (site text / form / media alt / new build) are
  // re-rendered here, silently, every time the owner opens the dashboard.
  useEffect(() => {
    void rerenderDirtyPages().then((n) => {
      if (n > 0) void reload(true);
    });
  }, [reload]);

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <PageHeader
        title={`${greet}, ${(user.name || '').split(' ')[0] || 'there'}`}
        subtitle="Here is what is happening on avoliveoil.com."
        actions={
          <>
            <Button icon={<LuHouse />} onClick={() => nav('/site/home')}>
              Edit home page
            </Button>
            <Button variant="primary" icon={<LuFilePlus2 />} onClick={() => setNewOpen(true)}>
              New page
            </Button>
          </>
        }
      />
      {loading && !data && <LoadingBlock />}
      {error && <ErrorBlock message={error} onRetry={() => void reload()} />}
      {data && (
        <>
          {(data.mail.failed > 0 || data.mail.held > 0) && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-danger/20 bg-danger-soft px-5 py-4 sm:flex-row sm:items-center">
              <LuCircleAlert className="shrink-0 text-xl text-danger" />
              <p className="flex-1 text-sm text-ink">
                {data.mail.failed > 0 && <>{plural(data.mail.failed, 'form entry', 'form entries')} could not be emailed. </>}
                {data.mail.held > 0 && <>{plural(data.mail.held, 'entry', 'entries')} {data.mail.held === 1 ? 'is' : 'are'} waiting because the hourly email limit was reached. </>}
                They are safe in the inbox — you can resend them from there.
              </p>
              <Button size="sm" onClick={() => nav('/inbox?status=' + (data.mail.failed ? 'failed' : 'held'))}>
                Open inbox
              </Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <Stat
              label="Published pages"
              value={data.pages.published}
              icon={<LuPanelsTopLeft />}
              tone="ok"
              to="/pages"
              hint={data.pages.unpublishedChanges ? `${plural(data.pages.unpublishedChanges, 'page')} with changes not published` : 'All changes are live'}
            />
            <Stat label="Draft pages" value={data.pages.draft} icon={<LuFilePlus2 />} to="/pages" hint="Not visible on the website yet" />
            <Stat
              label="New form entries"
              value={data.entries.unread}
              icon={<LuInbox />}
              tone={data.entries.unread ? 'warn' : 'neutral'}
              to="/inbox?unread=1"
              hint={`${data.entries.last7days} in the last 7 days`}
            />
            <Stat
              label="Emails not delivered"
              value={data.mail.failed + data.mail.held}
              icon={<LuSend />}
              tone={data.mail.failed + data.mail.held ? 'danger' : 'ok'}
              to="/inbox?status=failed"
              hint={data.mail.failed + data.mail.held ? `${data.mail.failed} failed · ${data.mail.held} waiting` : 'Every entry was emailed'}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Card padded={false}>
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <h2 className="font-display text-lg text-olive-dark">Latest form entries</h2>
                <Link to="/inbox" className="inline-flex items-center gap-1 text-[13px] font-medium text-olive hover:underline">
                  Inbox <LuArrowRight />
                </Link>
              </div>
              {data.recentEntries?.length ? (
                <ul className="divide-y divide-line">
                  {data.recentEntries.slice(0, 6).map((s) => {
                    const first = Object.values(s.data).find((v) => typeof v === 'string' && v.trim()) as string | undefined;
                    return (
                      <li key={s.id}>
                        <Link to={`/inbox?open=${s.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-sand/60">
                          {!s.readAt && <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-label="Unread" />}
                          <div className="min-w-0 flex-1">
                            <div className={cx('truncate text-sm', !s.readAt ? 'font-semibold text-ink' : 'text-ink')}>{first ?? 'Entry #' + s.id}</div>
                            <div className="truncate text-xs text-muted">
                              {s.formName}
                              {s.pageTitle ? ' · ' + s.pageTitle : ''}
                            </div>
                          </div>
                          <span className="shrink-0 text-xs text-muted">{fmtAgo(s.createdAt)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="px-5 py-8 text-center text-sm text-muted">No entries yet. They appear here as soon as a visitor sends a form.</p>
              )}
            </Card>
            <Card padded={false}>
              <div className="border-b border-line px-5 py-3.5">
                <h2 className="font-display text-lg text-olive-dark">Website status</h2>
              </div>
              <ul className="divide-y divide-line text-sm">
                <li className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="text-muted">Site text waiting to be published</span>
                  {data.sitePending ? (
                    <Link to="/site">
                      <Chip tone="warn">{plural(data.sitePending, 'change')}</Chip>
                    </Link>
                  ) : (
                    <Chip tone="ok">None</Chip>
                  )}
                </li>
                <li className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="text-muted">Pages needing a refresh</span>
                  {data.dirtyPages ? (
                    <Button size="sm" icon={<LuRefreshCw />} onClick={() => void rerenderDirtyPages().then(() => reload(true))}>
                      Refresh {data.dirtyPages}
                    </Button>
                  ) : (
                    <Chip tone="ok">Up to date</Chip>
                  )}
                </li>
                <li className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="text-muted">Pages in the trash</span>
                  <span className="tabular-nums text-ink">{data.pages.trash}</span>
                </li>
                <li className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="text-muted">All form entries</span>
                  <span className="tabular-nums text-ink">{data.entries.total}</span>
                </li>
              </ul>
            </Card>
          </div>
        </>
      )}
      <NewPageDialog open={newOpen} onClose={() => setNewOpen(false)} />
    </>
  );
}
