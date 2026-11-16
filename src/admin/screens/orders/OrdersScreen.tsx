import { useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { api, type AdminOrder, type AdminOrderStatus } from '../../api';
import { toast, toastError } from '../../lib/bus';
import { useLoad } from '../../lib/hooks';
import { Button, Card, Chip, EmptyState, ErrorBlock, LoadingBlock, PageHeader, Segmented } from '../../ui/ui';

/*
 * Orders paid (or started) online through HitPay (FORGE HITPAY §5.3). Read-only: refunds are made
 * in the HitPay dashboard. "Re-check" asks HitPay again about the order's open payment requests.
 */

const rm = (sen: number) => `RM ${Math.floor(sen / 100)}.${String(sen % 100).padStart(2, '0')}`;
const SITE: Record<string, string> = { av: 'Arabian Village', nf: 'Noor Fès' };
const STATUS: Record<AdminOrderStatus, { label: string; tone: 'ok' | 'warn' | 'danger' | 'neutral' }> = {
  paid: { label: 'Paid', tone: 'ok' },
  pending: { label: 'Waiting for payment', tone: 'neutral' },
  failed: { label: 'Not paid', tone: 'danger' },
  needs_review: { label: 'Check in HitPay', tone: 'warn' },
};

function OrderRow({ o, onChange }: { o: AdminOrder; onChange: (o: AdminOrder) => void }) {
  const [busy, setBusy] = useState(false);
  const st = STATUS[o.status];
  const double = o.requests.some((r) => r.status === 'double_paid');
  const recheck = async () => {
    setBusy(true);
    try {
      const next = await api.recheckOrder(o.ref);
      onChange(next);
      toast.ok(next.status === 'paid' ? `Order ${o.ref} is paid.` : `Order ${o.ref}: ${STATUS[next.status].label.toLowerCase()}.`);
    } catch (e) {
      toastError(e);
    } finally {
      setBusy(false);
    }
  };
  return (
    <tr className="align-top" data-testid="admin-order" data-ref={o.ref}>
      <td className="px-4 py-3">
        <div className="font-mono text-[13px] font-semibold text-ink">{o.ref}</div>
        <div className="text-xs text-muted">{SITE[o.site] ?? o.site}</div>
        <div className="text-xs text-muted">{o.createdMyt} MYT</div>
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="font-medium text-ink">{o.name}</div>
        <div className="text-muted">{o.phone}</div>
        <div className="max-w-[260px] text-xs whitespace-pre-line text-muted">
          {[o.address.address, `${o.address.postcode ?? ''} ${o.address.city ?? ''}`.trim(), o.address.state].filter(Boolean).join('\n')}
        </div>
        {o.address.note && <div className="mt-1 max-w-[260px] text-xs text-muted italic">Note: {o.address.note}</div>}
        {o.note && <div className="mt-1 max-w-[260px] text-xs text-muted">{o.note}</div>}
      </td>
      <td className="px-4 py-3 text-sm">
        <ul className="grid gap-0.5">
          {o.lines.map((l) => (
            <li key={l.sku}>
              {/* a package reads "Noor Fès, 2 bottles (500 ml each)", never "× 1" (BUY-NOW B3) */}
              {l.pack ? l.name : `${l.name} × ${l.qty}`}
            </li>
          ))}
        </ul>
        <div className="mt-1 text-xs text-muted">Delivery {o.deliverySen === 0 ? 'free' : rm(o.deliverySen)}</div>
      </td>
      <td className="px-4 py-3 text-right text-sm font-semibold whitespace-nowrap text-ink">{rm(o.totalSen)}</td>
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-wrap gap-1">
          <Chip tone={st.tone} dot>
            {st.label}
          </Chip>
          {double && <Chip tone="danger">Paid twice: refund one in HitPay</Chip>}
          {o.status === 'paid' && !o.notified && <Chip tone="warn">Email not sent yet</Chip>}
        </div>
        {o.paymentType && <div className="mt-1 text-xs text-muted">{o.paymentType.replace(/_/g, ' ')}</div>}
        {o.requests.some((r) => r.note) && (
          <div className="mt-1 max-w-[220px] text-xs text-warn">{o.requests.filter((r) => r.note).map((r) => r.note).join('; ')}</div>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        {o.status !== 'paid' && o.requests.some((r) => r.status === 'pending') && (
          <Button size="sm" icon={<LuRefreshCw />} loading={busy} onClick={() => void recheck()}>
            Re-check
          </Button>
        )}
      </td>
    </tr>
  );
}

export function OrdersScreen() {
  const [filter, setFilter] = useState<AdminOrderStatus | ''>('');
  const l = useLoad(() => api.orders(filter), [filter]);
  const replace = (o: AdminOrder) => l.setData((d) => (d ? { ...d, orders: d.orders.map((x) => (x.ref === o.ref ? o : x)) } : d));
  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Orders paid online through HitPay (FPX, e-wallets, cards). Refunds are made in the HitPay dashboard."
        actions={
          <Button icon={<LuRefreshCw />} onClick={() => void l.reload()}>
            Refresh
          </Button>
        }
      />
      <div className="mb-4">
        <Segmented
          value={filter}
          onChange={(v) => setFilter(v)}
          options={[
            { value: '', label: 'All' },
            { value: 'paid', label: 'Paid' },
            { value: 'pending', label: 'Waiting' },
            { value: 'needs_review', label: 'Check' },
            { value: 'failed', label: 'Not paid' },
          ]}
        />
      </div>
      {l.data && (l.data.unnotified > 0 || l.data.doublePaid > 0) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {l.data.unnotified > 0 && <Chip tone="warn">{l.data.unnotified} paid order email(s) not sent yet: they are retried automatically</Chip>}
          {l.data.doublePaid > 0 && <Chip tone="danger">{l.data.doublePaid} payment(s) to refund in HitPay</Chip>}
        </div>
      )}
      <Card padded={false}>
        {l.loading && !l.data && <LoadingBlock />}
        {l.error && (
          <div className="p-5">
            <ErrorBlock message={l.error} onRetry={() => void l.reload()} />
          </div>
        )}
        {l.data && l.data.orders.length === 0 && <EmptyState title="No orders yet" body="Orders appear here as soon as a customer starts paying online." />}
        {l.data && l.data.orders.length > 0 && (
          <div className="avo-scroll overflow-x-auto">
            <table className="w-full min-w-[860px] text-left">
              <thead className="border-b border-line text-[11px] font-semibold tracking-[0.08em] text-faint uppercase">
                <tr>
                  <th className="px-4 py-2.5">Order</th>
                  <th className="px-4 py-2.5">Customer</th>
                  <th className="px-4 py-2.5">Items</th>
                  <th className="px-4 py-2.5 text-right">Total</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {l.data.orders.map((o) => (
                  <OrderRow key={o.ref} o={o} onChange={replace} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
