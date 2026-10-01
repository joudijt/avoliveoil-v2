import { useCallback, useRef, useState, type DragEvent } from 'react';
import { LuCheck, LuCloudUpload, LuImage, LuSearch, LuTriangleAlert } from 'react-icons/lu';
import { variantUrl, type MediaItem } from '../../api';
import { toast } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { uploadImage, ACCEPTED_TYPES } from '../../lib/upload';
import { Button, EmptyState, ErrorBlock, Input, LoadingBlock } from '../../ui/ui';

interface UploadTile {
  key: string;
  name: string;
  pct: number;
  error?: string;
}

/**
 * Grid of uploaded photos with drag-and-drop upload. Used by the Media screen and by the
 * picker modal (builder, site editor, page settings).
 */
export function MediaGrid({
  items,
  loading,
  error,
  onReload,
  selected,
  onSelect,
  onUploaded,
  multi,
  compact,
}: {
  items: MediaItem[] | null;
  loading: boolean;
  error: string | null;
  onReload: () => void;
  selected: number[];
  onSelect: (m: MediaItem) => void;
  onUploaded: (m: MediaItem) => void;
  multi?: boolean;
  compact?: boolean;
}) {
  const [uploads, setUploads] = useState<UploadTile[]>([]);
  const [over, setOver] = useState(false);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const start = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files);
      if (!list.length) return;
      list.forEach((file) => {
        const key = Math.random().toString(36).slice(2);
        setUploads((u) => [...u, { key, name: file.name, pct: 0 }]);
        uploadImage(file, (pct) => setUploads((u) => u.map((x) => (x.key === key ? { ...x, pct } : x))))
          .then((m) => {
            setUploads((u) => u.filter((x) => x.key !== key));
            onUploaded(m);
          })
          .catch((e: unknown) => {
            const msg = e instanceof Error ? e.message : 'Upload failed.';
            setUploads((u) => u.map((x) => (x.key === key ? { ...x, error: msg } : x)));
            toast.error(msg);
          });
      });
    },
    [onUploaded]
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    if (e.dataTransfer.files?.length) start(e.dataTransfer.files);
  };

  const needle = q.trim().toLowerCase();
  const shown = (items ?? []).filter(
    (m) => !needle || m.originalName.toLowerCase().includes(needle) || m.alt.en.toLowerCase().includes(needle) || m.alt.ms.toLowerCase().includes(needle)
  );

  return (
    <div
      onDragOver={(e) => {
        if (Array.from(e.dataTransfer.types).includes('Files')) {
          e.preventDefault();
          setOver(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setOver(false);
      }}
      onDrop={onDrop}
      className="relative"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <LuSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search photos" className="pl-9" aria-label="Search photos" />
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <span className="hidden text-xs text-muted md:inline">Drag photos here, or</span>
          <Button variant="primary" icon={<LuCloudUpload />} onClick={() => input.current?.click()}>
            Upload photos
          </Button>
        </div>
        <input
          ref={input}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) start(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {loading && !items && <LoadingBlock label="Loading photos…" />}
      {error && <ErrorBlock message={error} onRetry={onReload} />}
      {items && items.length === 0 && uploads.length === 0 && (
        <button type="button" onClick={() => input.current?.click()} className="block w-full rounded-xl border-2 border-dashed border-line-strong bg-white/60 hover:border-olive">
          <EmptyState icon={<LuImage />} title="No photos yet" body="Drop photos here or click to upload. Large photos are resized automatically before they are sent." />
        </button>
      )}
      {(shown.length > 0 || uploads.length > 0) && (
        <div className={cx('grid gap-3', compact ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5')}>
          {uploads.map((u) => (
            <div key={u.key} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-line bg-white p-3 text-center">
              {u.error ? (
                <>
                  <LuTriangleAlert className="text-xl text-danger" />
                  <span className="line-clamp-3 text-[11px] text-danger">{u.error}</span>
                  <button type="button" className="text-[11px] text-muted underline" onClick={() => setUploads((x) => x.filter((y) => y.key !== u.key))}>
                    Dismiss
                  </button>
                </>
              ) : (
                <>
                  <span className="w-full truncate text-[11px] text-muted">{u.name}</span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-olive transition-[width]" style={{ width: Math.max(4, u.pct) + '%' }} />
                  </div>
                  <span className="text-[11px] text-muted">{u.pct < 100 ? `Uploading ${u.pct}%` : 'Processing…'}</span>
                </>
              )}
            </div>
          ))}
          {shown.map((m) => {
            const idx = selected.indexOf(m.id);
            const isSel = idx >= 0;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m)}
                aria-pressed={isSel}
                title={m.originalName}
                className={cx(
                  'group relative aspect-square overflow-hidden rounded-xl border bg-white text-left transition-all',
                  isSel ? 'border-olive ring-2 ring-olive/40' : 'border-line hover:border-line-strong hover:shadow-[var(--shadow-card)]'
                )}
              >
                <div className={cx('h-full w-full', m.hasAlpha && 'avo-checker')}>
                  <img src={variantUrl(m, 480)} alt={m.alt.en || ''} loading="lazy" className={cx('h-full w-full', m.hasAlpha ? 'object-contain p-2' : 'object-cover')} />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="block truncate text-[11px] text-white">{m.originalName}</span>
                </div>
                {!m.alt.en && !compact && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-warn-soft px-1.5 py-0.5 text-[10px] font-medium text-warn">No description</span>
                )}
                {isSel && (
                  <span className="absolute right-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-olive px-1 text-[12px] font-semibold text-cream shadow">
                    {multi ? idx + 1 : <LuCheck />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
      {items && items.length > 0 && shown.length === 0 && <p className="py-10 text-center text-sm text-muted">No photos match “{q}”.</p>}
      {over && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-olive bg-mist/90">
          <div className="text-center text-olive">
            <LuCloudUpload className="mx-auto text-3xl" />
            <p className="mt-2 font-medium">Drop to upload</p>
          </div>
        </div>
      )}
    </div>
  );
}
