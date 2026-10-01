import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LuCircleAlert, LuCircleCheck, LuInfo, LuLoaderCircle, LuX } from 'react-icons/lu';
import { dismissToast, subscribeConfirm, subscribeToasts, type ConfirmRequest, type ToastItem } from '../lib/bus';
import { cx } from '../lib/cx';
import { Modal } from './Modal';
import { Button } from './ui';

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  useEffect(() => subscribeToasts(setItems), []);
  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[200] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-5 sm:items-end" aria-live="polite">
      {items.map((t) => (
        <div
          key={t.id}
          className={cx(
            'avo-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3 text-sm shadow-[var(--shadow-pop)]',
            t.kind === 'error' ? 'bg-[#3a1d17] text-white' : 'bg-olive-dark text-cream'
          )}
          role={t.kind === 'error' ? 'alert' : 'status'}
        >
          <span className="mt-0.5 shrink-0 text-base">
            {t.kind === 'ok' && <LuCircleCheck className="text-[#b9d39a]" />}
            {t.kind === 'error' && <LuCircleAlert className="text-[#f2a593]" />}
            {t.kind === 'info' && <LuInfo className="text-[#e5cf95]" />}
            {t.kind === 'progress' && <LuLoaderCircle className="animate-spin text-[#e5cf95]" />}
          </span>
          <span className="min-w-0 flex-1 leading-snug">{t.message}</span>
          <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="-mr-1 shrink-0 rounded p-0.5 opacity-60 hover:opacity-100">
            <LuX />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export function ConfirmHost() {
  const [req, setReq] = useState<ConfirmRequest | null>(null);
  useEffect(() => {
    subscribeConfirm(setReq);
    return () => subscribeConfirm(null);
  }, []);
  const done = (v: boolean | 'alt') => {
    req?.resolve(v);
    setReq(null);
  };
  return (
    <Modal
      open={!!req}
      onClose={() => done(false)}
      title={req?.title ?? ''}
      size="sm"
      footer={
        <>
          <Button onClick={() => done(false)}>{req?.cancelLabel ?? 'Cancel'}</Button>
          {req?.altLabel && (
            <Button variant="secondary" onClick={() => done('alt')}>
              {req.altLabel}
            </Button>
          )}
          <Button variant={req?.danger ? 'danger' : 'primary'} onClick={() => done(true)} data-autofocus>
            {req?.confirmLabel ?? 'OK'}
          </Button>
        </>
      }
    >
      {req?.message && <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{req.message}</p>}
    </Modal>
  );
}
