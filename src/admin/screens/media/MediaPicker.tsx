import { useEffect, useState } from 'react';
import type { MediaItem } from '../../api';
import { mediaStore, useMedia } from '../../lib/mediaStore';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/ui';
import { MediaGrid } from './MediaLibrary';

/**
 * Choose one photo (or several, in order, for galleries). A fresh upload is selected
 * automatically so "upload then use" is one step.
 */
export function MediaPicker({
  open,
  onClose,
  onPick,
  multi,
  initial = [],
  title,
  note,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (items: MediaItem[]) => void;
  multi?: boolean;
  initial?: number[];
  title?: string;
  note?: React.ReactNode;
}) {
  const media = useMedia();
  const [sel, setSel] = useState<number[]>(initial);
  useEffect(() => {
    if (open) setSel(initial);
    // initial is a fresh array on every render of the caller; only reset when opening
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = (m: MediaItem) => {
    if (!multi) return setSel([m.id]);
    setSel((s) => (s.includes(m.id) ? s.filter((x) => x !== m.id) : [...s, m.id]));
  };
  const pick = () => {
    const items = sel.map((id) => mediaStore.get(id)).filter((m): m is MediaItem => !!m);
    onPick(items);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title ?? (multi ? 'Choose photos' : 'Choose a photo')}
      subtitle={note}
      size="xl"
      footer={
        <>
          {multi && <span className="mr-auto text-[13px] text-muted">{sel.length} selected — click in the order you want them shown</span>}
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={!sel.length && !multi} onClick={pick}>
            {multi ? 'Use these photos' : 'Use this photo'}
          </Button>
        </>
      }
    >
      <MediaGrid
        items={media.items}
        loading={media.loading}
        error={media.error}
        onReload={() => void media.reload()}
        selected={sel}
        onSelect={toggle}
        multi={multi}
        compact
        onUploaded={(m) => {
          mediaStore.add(m);
          setSel((s) => (multi ? [...s, m.id] : [m.id]));
        }}
      />
    </Modal>
  );
}
