import { useEffect, useState, type FormEvent } from 'react';
import { LuCircleAlert, LuCircleCheck, LuPlugZap } from 'react-icons/lu';
import { api, ApiError, type PaySite, type PaymentSettings } from '../../api';
import { toast, toastError } from '../../lib/bus';
import { EMAIL_RE } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { Button, Card, ErrorBlock, Field, Input, LoadingBlock, PageHeader } from '../../ui/ui';

/*
 * Payments (HitPay) section (FORGE HITPAY RULINGS R3). The API key and salt are write-only:
 * the server stores them encrypted and only ever says whether they are set (and the last 4
 * characters of the key). The delivery fee per site is the fee customers pay; while a site has
 * no fee, online payment on that site stays closed.
 */

const SITES: { id: PaySite; label: string; hint: string }[] = [
  { id: 'av', label: 'Delivery fee: avoliveoil.com (RM)', hint: 'Added to every order of the main site. 0 = free delivery. Empty = online payment closed.' },
  { id: 'nf', label: 'Delivery fee: Noor Fès page (RM)', hint: 'Added to every order of avoliveoil.com/noor-fes. 0 = free delivery. Empty = online payment closed.' },
];
const FEE_RE = /^\d{1,3}(\.\d{1,2})?$/;

function Ready({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm" data-testid={`pay-ready-${label}`}>
      {ok ? <LuCircleCheck className="text-ok" /> : <LuCircleAlert className="text-warn" />}
      <span>
        {label}: {ok ? 'online payment open' : 'online payment closed'}
      </span>
    </div>
  );
}

export function PaymentsScreen() {
  const s = useLoad(() => api.payments(), []);
  const [apiKey, setApiKey] = useState('');
  const [salt, setSalt] = useState('');
  const [email, setEmail] = useState('');
  const [fees, setFees] = useState<Record<PaySite, string>>({ av: '', nf: '' });
  const [fields, setFields] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(false);

  const fill = (d: PaymentSettings) => {
    setEmail(d.notifyEmail);
    setFees({ av: d.deliveryRM.av ?? '', nf: d.deliveryRM.nf ?? '' });
  };
  useEffect(() => {
    if (s.data) fill(s.data);
  }, [s.data]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (email && !EMAIL_RE.test(email)) f.notifyEmail = 'Enter a valid email address, or leave it empty.';
    for (const site of SITES) if (fees[site.id].trim() && !FEE_RE.test(fees[site.id].trim())) f[`deliveryRM.${site.id}`] = 'Enter an amount like 8 or 8.50.';
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    try {
      const r = await api.savePayments({
        ...(apiKey.trim() ? { apiKey: apiKey.trim() } : {}),
        ...(salt.trim() ? { salt: salt.trim() } : {}),
        notifyEmail: email.trim(),
        deliveryRM: { av: fees.av.trim() || null, nf: fees.nf.trim() || null },
      });
      s.setData(r);
      setApiKey('');
      setSalt('');
      toast.ok('Payment settings saved.');
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setFields(err.fields);
      else toastError(err);
    } finally {
      setBusy(false);
    }
  };

  const test = async () => {
    setTesting(true);
    try {
      const r = await api.testPayments();
      if (r.ok) toast.ok(r.message);
      else toast.error(r.message);
    } catch (err) {
      toastError(err);
    } finally {
      setTesting(false);
    }
  };

  const d = s.data;
  return (
    <>
      <PageHeader title="Payments (HitPay)" subtitle="Online payment for avoliveoil.com and the Noor Fès page: FPX, Touch 'n Go, GrabPay, ShopeePay, DuitNow, WeChat Pay and cards." />
      {s.error && <ErrorBlock message={s.error} onRetry={() => void s.reload()} />}
      {!d && !s.error && <LoadingBlock />}
      {d && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Card>
            <form onSubmit={save} className="flex flex-col gap-4" noValidate data-testid="payments-form">
              <Field
                label="HitPay API key"
                error={fields.apiKey}
                hint={d.apiKeySet ? `Saved (ends in …${d.apiKeyEnd}). Leave empty to keep it.` : 'From the HitPay dashboard: Settings → Payment gateway → API keys.'}
              >
                <Input type="password" autoComplete="off" value={apiKey} onChange={(e) => setApiKey(e.target.value)} invalid={!!fields.apiKey} placeholder={d.apiKeySet ? '••••••••' : ''} />
              </Field>
              <Field label="HitPay salt" error={fields.salt} hint={d.saltSet ? 'Saved. Leave empty to keep it.' : 'Shown next to the API key in the HitPay dashboard.'}>
                <Input type="password" autoComplete="off" value={salt} onChange={(e) => setSalt(e.target.value)} invalid={!!fields.salt} placeholder={d.saltSet ? '••••••••' : ''} />
              </Field>
              <Field
                label="Order notification email"
                error={fields.notifyEmail}
                hint={`Every paid order is emailed here. Leave empty to use ${d.notifyEmailDefault || 'the System email'}.`}
              >
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!fields.notifyEmail} placeholder={d.notifyEmailDefault} />
              </Field>
              {SITES.map((site) => (
                <Field key={site.id} label={site.label} error={fields[`deliveryRM.${site.id}`]} hint={site.hint}>
                  <Input
                    inputMode="decimal"
                    value={fees[site.id]}
                    onChange={(e) => setFees({ ...fees, [site.id]: e.target.value })}
                    className="w-32"
                    invalid={!!fields[`deliveryRM.${site.id}`]}
                    data-testid={`fee-${site.id}`}
                  />
                </Field>
              ))}
              <div className="flex flex-wrap gap-2">
                <Button type="submit" variant="primary" loading={busy}>
                  Save payment settings
                </Button>
                <Button icon={<LuPlugZap />} loading={testing} disabled={!d.apiKeySet} onClick={() => void test()}>
                  Test connection
                </Button>
              </div>
            </form>
          </Card>
          <Card>
            <h2 className="font-display text-lg text-olive-dark">Status</h2>
            <div className="mt-3 flex flex-col gap-2">
              <Ready ok={d.ready.av} label="avoliveoil.com" />
              <Ready ok={d.ready.nf} label="Noor Fès" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Online payment opens on a site when the API key, the salt and that site’s delivery fee are all set. Payments are checked with HitPay
              before an order is marked paid. Refunds are made in the HitPay dashboard.
            </p>
            <p className="mt-3 text-xs text-muted">
              Payment notifications go to <code className="text-[11px]">{d.webhookUrl}</code> (set automatically on every payment, nothing to set in
              HitPay).
            </p>
            {!d.liveApi && <p className="mt-3 text-xs font-semibold text-warn">This server talks to a test HitPay, not the real one.</p>}
          </Card>
        </div>
      )}
    </>
  );
}
