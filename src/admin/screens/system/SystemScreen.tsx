import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { LuCircleAlert, LuCircleCheck, LuDatabaseBackup, LuRefreshCw } from 'react-icons/lu';
import { api, ApiError } from '../../api';
import { toast, toastError } from '../../lib/bus';
import { EMAIL_RE, fmtBytes, fmtDateTime } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { Button, Card, ErrorBlock, Field, Input, LoadingBlock, PageHeader } from '../../ui/ui';

function Row({ label, value, ok }: { label: string; value: ReactNode; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="flex items-center gap-1.5 text-right text-ink">
        {ok === true && <LuCircleCheck className="text-ok" />}
        {ok === false && <LuCircleAlert className="text-danger" />}
        {value}
      </span>
    </div>
  );
}

function SettingsCard() {
  const s = useLoad(() => api.settings(), []);
  const [email, setEmail] = useState('');
  const [cap, setCap] = useState(40);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (s.data) {
      setEmail(s.data.systemEmail);
      setCap(s.data.mailCapPerHour);
    }
  }, [s.data]);
  const save = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (email && !EMAIL_RE.test(email)) f.systemEmail = 'Enter a valid email address, or leave it empty.';
    if (!(cap >= 1 && cap <= 500)) f.mailCapPerHour = 'Choose a number between 1 and 500.';
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    try {
      const r = await api.saveSettings({ systemEmail: email.trim(), mailCapPerHour: cap });
      s.setData(r);
      toast.ok('Settings saved.');
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setFields(err.fields);
      else toastError(err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card>
      <h2 className="font-display text-lg text-olive-dark">Email settings</h2>
      {s.error && <ErrorBlock message={s.error} onRetry={() => void s.reload()} />}
      {!s.data && !s.error && <LoadingBlock />}
      {s.data && (
        <form onSubmit={save} className="mt-4 flex flex-col gap-4" noValidate>
          <Field
            label="System email"
            error={fields.systemEmail}
            hint="Bounces and delivery problems for form emails go to this address. Leave empty to use the first administrator’s email."
          >
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!fields.systemEmail} placeholder="you@avoliveoil.com" />
          </Field>
          <Field
            label="Maximum form emails per hour"
            error={fields.mailCapPerHour}
            hint="Protects the website from being marked as a spammer if a robot floods a form. Entries above the limit are kept in the inbox to resend."
          >
            <Input type="number" min={1} max={500} value={cap} onChange={(e) => setCap(Number(e.target.value))} className="w-32" invalid={!!fields.mailCapPerHour} />
          </Field>
          <div>
            <Button type="submit" variant="primary" loading={busy}>
              Save settings
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}

export function SystemScreen() {
  const h = useLoad(() => api.health(), []);
  const d = h.data;
  return (
    <>
      <PageHeader
        title="System"
        subtitle="Health of the control panel, backups and email settings."
        actions={
          <>
            <Button icon={<LuRefreshCw />} onClick={() => void h.reload()}>
              Check again
            </Button>
            <Button variant="primary" icon={<LuDatabaseBackup />} onClick={() => (window.location.href = api.backupUrl)}>
              Download latest backup
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card padded={false}>
          <div className="border-b border-line px-5 py-3.5">
            <h2 className="font-display text-lg text-olive-dark">Health</h2>
          </div>
          {h.loading && !d && <LoadingBlock />}
          {h.error && (
            <div className="p-5">
              <ErrorBlock message={h.error} onRetry={() => void h.reload()} />
            </div>
          )}
          {d && (
            <div className="divide-y divide-line">
              <Row label="Database check" value={d.integrity === 'ok' ? 'All good' : d.integrity} ok={d.integrity === 'ok'} />
              <Row label="Data folder writable" value={d.dataWritable ? 'Yes' : 'No — saving will fail'} ok={d.dataWritable} />
              <Row label="Emails not delivered" value={`${d.failedMails} failed · ${d.heldMails} waiting`} ok={d.failedMails + d.heldMails === 0} />
              <Row label="Last backup" value={d.lastBackupAt ? fmtDateTime(d.lastBackupAt) : 'None yet (made on every publish)'} ok={!!d.lastBackupAt} />
              <Row label="Ready-made pages" value={`${d.renderedFiles} files · ${fmtBytes(d.renderedBytes)}`} />
              <Row label="Website version" value={<code className="text-xs">{d.build}</code>} />
              <Row label="Content version" value={d.contentVersion} />
              <Row label="PHP / SQLite" value={`${d.php} / ${d.sqlite}`} />
            </div>
          )}
        </Card>
        <SettingsCard />
      </div>
      {d && (
        <Card padded={false} className="mt-6">
          <details>
            <summary className="cursor-pointer px-5 py-3.5 font-display text-lg text-olive-dark">Technical log (last 50 lines)</summary>
            <pre className="avo-scroll max-h-96 overflow-auto border-t border-line bg-[#1f261a] px-5 py-4 font-mono text-[11.5px] leading-relaxed text-[#d8dcc9]">
              {d.logTail.length ? d.logTail.join('\n') : 'The log is empty.'}
            </pre>
          </details>
        </Card>
      )}
    </>
  );
}
