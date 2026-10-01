import { useEffect, useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { api, ApiError, variantUrl, type MediaItem } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { fmtBytes, fmtDate } from '../../lib/format';
import { mediaStore, useMedia } from '../../lib/mediaStore';
import { Drawer } from '../../ui/Modal';
import { Button, Card, Field, Input, PageHeader } from '../../ui/ui';
import { MediaGrid } from './MediaLibrary';

function MediaDetail({ m, onClose }: { m: MediaItem; onClose: () => void }) {
  const [en, setEn] = useState(m.alt.en);
  const [ms, setMs] = useState(m.alt.ms);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [blocked, setBlocked] = useState<string | null>(null);
  useEffect(() => {
    setEn(m.alt.en);
    setMs(m.alt.ms);
    setBlocked(null);
  }, [m]);
  const dirty = en !== m.alt.en || ms !== m.alt.ms;
  const save = async () => {
    setSaving(true);
    try {
      const r = await api.updateMedia(m.id, en.trim(), ms.trim());
      mediaStore.update({ ...m, ...r, alt: r.alt ?? { en: en.trim(), ms: ms.trim() } });
      toast.ok('Description saved. Pages that show this photo are updated automatically.');
    } catch (e) {
      toastError(e);
    } finally {
      setSaving(false);
    }
  };
  const del = async () => {
    if (!(await confirmDialog({ title: 'Delete this photo?', message: 'It is removed from the library for good. This cannot be undone.', confirmLabel: 'Delete photo', danger: true }))) return;
    setDeleting(true);
    try {
      await api.deleteMedia(m.id);
      mediaStore.remove(m.id);
      toast.ok('Photo deleted.');
      onClose();
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) setBlocked(e.message);
      else toastError(e);
    } finally {
      setDeleting(false);
    }
  };
  const used = m.usedIn ?? [];
  return (
    <Drawer
      open
      onClose={onClose}
      title={<span className="block truncate">{m.originalName}</span>}
      footer={
        <>
          <Button variant="dangerGhost" icon={<LuTrash2 />} loading={deleting} onClick={() => void del()} disabled={used.length > 0} title={used.length ? 'Remove it from the places below first' : undefined}>
            Delete
          </Button>
          <div className="ml-auto flex gap-2">
            <Button onClick={onClose}>Close</Button>
            <Button variant="primary" disabled={!dirty} loading={saving} onClick={() => void save()}>
              Save description
            </Button>
          </div>
        </>
      }
    >
      <div className={cx('overflow-hidden rounded-xl border border-line', m.hasAlpha ? 'avo-checker' : 'bg-sand')}>
        <img src={variantUrl(m, 960)} alt="" className="mx-auto max-h-[320px] w-auto object-contain" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-[13px]">
        <div>
          <dt className="text-xs text-muted">Size</dt>
          <dd className="text-ink">
            {m.width} × {m.height}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">File</dt>
          <dd className="text-ink">{fmtBytes(m.bytes)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Uploaded</dt>
          <dd className="text-ink">{fmtDate(m.createdAt)}</dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">Description</h3>
          <p className="mt-0.5 text-xs leading-snug text-muted">Describe what is in the photo. Google and people using screen readers read this. Example: “Bottle of rosemary olive oil on a wooden table”.</p>
        </div>
        <Field label="English" htmlFor="alt-en">
          <Input id="alt-en" value={en} onChange={(e) => setEn(e.target.value)} maxLength={200} />
        </Field>
        <Field label="Bahasa Melayu" htmlFor="alt-ms">
          <Input id="alt-ms" value={ms} onChange={(e) => setMs(e.target.value)} maxLength={200} />
        </Field>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-ink">Used in</h3>
        {used.length ? (
          <ul className="mt-2 flex flex-col gap-1.5">
            {used.map((u) => (
              <li key={u} className="rounded-lg bg-sand px-3 py-2 text-[13px] text-ink">
                {u}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1 text-[13px] text-muted">Not used anywhere yet.</p>
        )}
        {blocked && <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-[13px] text-danger">{blocked}</p>}
        {used.length > 0 && <p className="mt-2 text-xs text-muted">A photo can only be deleted when no page uses it.</p>}
      </div>
    </Drawer>
  );
}

export function MediaScreen() {
  const media = useMedia();
  const [openId, setOpenId] = useState<number | null>(null);
  const open = openId != null ? media.items?.find((m) => m.id === openId) : undefined;
  return (
    <>
      <PageHeader
        title="Media"
        subtitle="Photos you upload for your pages. Click a photo to add a description or delete it."
      />
      <Card>
        <MediaGrid
          items={media.items}
          loading={media.loading}
          error={media.error}
          onReload={() => void media.reload()}
          selected={openId != null ? [openId] : []}
          onSelect={(m) => setOpenId(m.id)}
          onUploaded={(m) => {
            mediaStore.add(m);
            toast.ok(`“${m.originalName}” uploaded.`);
          }}
        />
      </Card>
      {open && <MediaDetail m={open} onClose={() => setOpenId(null)} />}
    </>
  );
}
