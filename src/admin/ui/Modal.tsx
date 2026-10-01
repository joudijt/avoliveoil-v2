import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LuX } from 'react-icons/lu';
import { cx } from '../lib/cx';
import { IconButton } from './ui';

/**
 * Open dialogs, innermost last. A dialog opened from another one (the media picker inside page
 * settings) must be the only one that reacts to Esc / Tab — otherwise Esc closes both and the
 * outer dialog's unsaved edits are lost.
 */
const layers: HTMLElement[] = [];
const isTop = (el: HTMLElement | null) => !!el && layers[layers.length - 1] === el;

/** Trap Tab inside `root` and restore focus to the opener on close. */
function useFocusTrap(open: boolean, root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const el = root.current;
    if (el) layers.push(el);
    const focusables = () =>
      el
        ? Array.from(
            el.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')
          ).filter((n) => n.offsetParent !== null)
        : [];
    // Prefer an explicit target, then the first control in the body — not the header's close button.
    const body = el?.querySelector<HTMLElement>('[data-modal-body]');
    const inBody = body
      ? Array.from(body.querySelectorAll<HTMLElement>('input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled])')).find((n) => n.offsetParent !== null)
      : undefined;
    const first = el?.querySelector<HTMLElement>('[data-autofocus]') ?? inBody ?? focusables()[0];
    requestAnimationFrame(() => first?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !el || !isTop(el)) return;
      const f = focusables();
      if (!f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      const i = el ? layers.lastIndexOf(el) : -1;
      if (i >= 0) layers.splice(i, 1);
      opener?.focus?.();
    };
  }, [open, root]);
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  dismissable = true,
  bodyClassName,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dismissable?: boolean;
  bodyClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref);
  useEffect(() => {
    if (!open || !dismissable) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTop(ref.current)) {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, dismissable, onClose]);
  if (!open) return null;
  const width = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }[size];
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="avo-fade absolute inset-0 bg-[#1d2417]/45 backdrop-blur-[2px]" onClick={dismissable ? onClose : undefined} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cx(
          'avo-in relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-cream shadow-[var(--shadow-pop)] sm:rounded-2xl',
          width
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            <h2 className="font-display text-xl text-olive-dark">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>}
          </div>
          {dismissable && (
            <IconButton label="Close" onClick={onClose} className="-mr-2 -mt-1">
              <LuX />
            </IconButton>
          )}
        </div>
        <div data-modal-body className={cx('avo-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5', bodyClassName)}>
          {children}
        </div>
        {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line bg-white/60 px-6 py-3.5">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  width = 'max-w-xl',
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && isTop(ref.current) && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[90] flex justify-end">
      <div className="avo-fade absolute inset-0 bg-[#1d2417]/35" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        data-autofocus
        className={cx('avo-slide relative flex h-full w-full flex-col bg-cream shadow-[var(--shadow-pop)] outline-none', width)}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0 font-display text-lg text-olive-dark">{title}</div>
          <IconButton label="Close" onClick={onClose}>
            <LuX />
          </IconButton>
        </div>
        <div className="avo-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
