/**
 * Tiny imperative helpers (toasts + confirm dialogs) so any screen or async handler can
 * call `toast.ok('Saved')` or `await confirmDialog({...})` without threading context.
 * The hosts (ui/Toaster.tsx, ui/ConfirmHost.tsx) subscribe once at the app root.
 */
export type ToastKind = 'ok' | 'error' | 'info' | 'progress';
export interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
  /** ms; 0 = sticky until dismissed or updated */
  duration: number;
}

type ToastListener = (items: ToastItem[]) => void;
let toasts: ToastItem[] = [];
let toastSeq = 1;
const toastListeners = new Set<ToastListener>();
const emitToasts = () => toastListeners.forEach((l) => l(toasts));

function push(kind: ToastKind, message: string, duration?: number): number {
  const id = toastSeq++;
  const d = duration ?? (kind === 'error' ? 7000 : kind === 'progress' ? 0 : 3500);
  toasts = [...toasts.slice(-4), { id, kind, message, duration: d }];
  emitToasts();
  if (d > 0) setTimeout(() => dismissToast(id), d);
  return id;
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emitToasts();
}

export function updateToast(id: number, kind: ToastKind, message: string, duration = 3500) {
  if (!toasts.some((t) => t.id === id)) return push(kind, message, duration);
  toasts = toasts.map((t) => (t.id === id ? { ...t, kind, message, duration } : t));
  emitToasts();
  if (duration > 0) setTimeout(() => dismissToast(id), duration);
  return id;
}

export function subscribeToasts(l: ToastListener) {
  toastListeners.add(l);
  l(toasts);
  return () => {
    toastListeners.delete(l);
  };
}

export const toast = {
  ok: (m: string, d?: number) => push('ok', m, d),
  error: (m: string, d?: number) => push('error', m, d),
  info: (m: string, d?: number) => push('info', m, d),
  progress: (m: string) => push('progress', m, 0),
};

/** Show the message of any thrown value as an error toast. */
export function toastError(e: unknown, fallback = 'Something went wrong. Please try again.') {
  const msg = e instanceof Error && e.message ? e.message : fallback;
  toast.error(msg);
}

// ---------------------------------------------------------------- confirm

export interface ConfirmOpts {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  /** third choice (e.g. "Overwrite"): resolves 'alt' */
  altLabel?: string;
}
export type ConfirmResult = boolean | 'alt';
export interface ConfirmRequest extends ConfirmOpts {
  id: number;
  resolve: (v: ConfirmResult) => void;
}

let confirmListener: ((r: ConfirmRequest | null) => void) | null = null;
let confirmSeq = 1;

export function subscribeConfirm(l: ((r: ConfirmRequest | null) => void) | null) {
  confirmListener = l;
}

export function confirmDialog(opts: ConfirmOpts): Promise<boolean> {
  return confirmChoice(opts).then((r) => r === true);
}

export function confirmChoice(opts: ConfirmOpts): Promise<ConfirmResult> {
  return new Promise((resolve) => {
    if (!confirmListener) {
      resolve(window.confirm(opts.title + (opts.message ? '\n\n' + opts.message : '')));
      return;
    }
    confirmListener({ ...opts, id: confirmSeq++, resolve });
  });
}
