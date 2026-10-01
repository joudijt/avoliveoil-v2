import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LuEllipsis } from 'react-icons/lu';
import { cx } from '../lib/cx';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  danger?: boolean;
  disabled?: boolean;
  hint?: string;
}

/** Kebab menu rendered in a portal so it never gets clipped by table overflow. */
export function Menu({ items, label = 'More actions', trigger }: { items: (MenuItem | 'sep')[]; label?: string; trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!open || !btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const w = 220;
    const h = pop.current?.offsetHeight ?? 200;
    let top = r.bottom + 6;
    if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
    setPos({ top, left: Math.max(8, Math.min(window.innerWidth - w - 8, r.right - w)) });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (pop.current?.contains(e.target as Node) || btn.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const els = Array.from(pop.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? []);
        const i = els.indexOf(document.activeElement as HTMLButtonElement);
        els[(i + (e.key === 'ArrowDown' ? 1 : -1) + els.length) % els.length]?.focus();
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', () => setOpen(false), { once: true, capture: true });
    requestAnimationFrame(() => pop.current?.querySelector<HTMLButtonElement>('button:not([disabled])')?.focus());
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={cx('inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1.5 text-lg text-muted hover:bg-sand hover:text-ink', open && 'bg-sand text-ink')}
      >
        {trigger ?? <LuEllipsis />}
      </button>
      {open &&
        createPortal(
          <div
            ref={pop}
            role="menu"
            style={{ top: pos.top, left: pos.left }}
            className="avo-in fixed z-[150] w-[220px] overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-[var(--shadow-pop)]"
          >
            {items.map((it, i) =>
              it === 'sep' ? (
                <div key={i} className="my-1 border-t border-line" />
              ) : (
                <button
                  key={i}
                  role="menuitem"
                  type="button"
                  disabled={it.disabled}
                  title={it.hint}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    it.onSelect();
                  }}
                  className={cx(
                    'flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13.5px] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none',
                    it.danger ? 'text-danger hover:bg-danger-soft focus:bg-danger-soft' : 'text-ink hover:bg-sand focus:bg-sand'
                  )}
                >
                  {it.icon && <span className={cx('text-[15px]', it.danger ? '' : 'text-muted')}>{it.icon}</span>}
                  {it.label}
                </button>
              )
            )}
          </div>,
          document.body
        )}
    </>
  );
}
