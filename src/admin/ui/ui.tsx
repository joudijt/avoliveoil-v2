/**
 * Admin UI primitives. Calm olive/cream look: white cards on warm background,
 * olive primary actions, gold only for focus + highlights.
 */
import { forwardRef, useEffect, useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

import { cx } from '../lib/cx';

// ---------------------------------------------------------------- buttons

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold' | 'dangerGhost';
type BtnSize = 'sm' | 'md' | 'lg';

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none';
const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-olive text-cream hover:bg-olive-dark shadow-[0_1px_0_rgb(0_0_0/0.08)]',
  secondary: 'bg-white text-ink border border-line-strong hover:bg-sand hover:border-faint',
  ghost: 'text-ink hover:bg-sand',
  danger: 'bg-danger text-white hover:bg-[#962f20]',
  dangerGhost: 'text-danger hover:bg-danger-soft',
  gold: 'bg-gold text-white hover:bg-[#9c7420]',
};
const btnSizes: Record<BtnSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-[15px]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  loading?: boolean;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', loading, icon, className, children, disabled, type = 'button', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(btnBase, btnVariants[variant], btnSizes[size], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <LuLoaderCircle className="animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
});

export function IconButton({
  label,
  children,
  className,
  active,
  size = 'md',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; active?: boolean; size?: 'sm' | 'md' }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex items-center justify-center rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' ? 'h-7 w-7 text-[15px]' : 'h-9 w-9 text-[17px]',
        active ? 'bg-olive text-cream' : 'text-muted hover:bg-sand hover:text-ink',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------- form controls

const inputBase =
  'w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none focus:border-olive focus:ring-2 focus:ring-olive/15 disabled:bg-sand disabled:text-muted';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(function Input(
  { className, invalid, ...rest },
  ref
) {
  return <input ref={ref} className={cx(inputBase, 'h-9', invalid ? 'border-danger' : 'border-line-strong', className)} aria-invalid={invalid || undefined} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  function Textarea({ className, invalid, rows = 3, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cx(inputBase, 'py-2 leading-relaxed resize-y', invalid ? 'border-danger' : 'border-line-strong', className)}
        aria-invalid={invalid || undefined}
        {...rest}
      />
    );
  }
);

export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cx(
        inputBase,
        'h-9 border-line-strong appearance-none pr-8 bg-[length:16px] bg-[right_8px_center] bg-no-repeat',
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b705f' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

// An error that appears out of view (e.g. at the top of a long dialog after clicking Save at the
// bottom) would make Save look like it did nothing: bring the FIRST visible error into view.
let errorScrollQueued = false;
function revealFirstError() {
  if (errorScrollQueued) return;
  errorScrollQueued = true;
  requestAnimationFrame(() => {
    errorScrollQueued = false;
    // the whole field (label + input + message), not just the message line
    document.querySelector('[data-field-error]')?.parentElement?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}

export function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
  aside,
  className,
}: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string | null;
  children: ReactNode;
  htmlFor?: string;
  aside?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (error) revealFirstError();
  }, [error]);
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {(label || aside) && (
        <div className="flex items-baseline justify-between gap-2">
          {label && (
            <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">
              {label}
            </label>
          )}
          {aside && <div className="text-xs text-muted">{aside}</div>}
        </div>
      )}
      {children}
      {error ? (
        <p className="text-xs text-danger" role="alert" data-field-error="">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted leading-snug">{hint}</p>
      ) : null}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  disabled,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  disabled?: boolean;
  hint?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          checked ? 'bg-olive' : 'bg-line-strong'
        )}
      >
        <span className={cx('inline-block h-4 w-4 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[18px]' : 'translate-x-0.5')} />
      </button>
      <div className="min-w-0">
        <label htmlFor={id} className={cx('text-sm text-ink', disabled ? 'opacity-60' : 'cursor-pointer')}>
          {label}
        </label>
        {hint && <p className="text-xs text-muted mt-0.5 leading-snug">{hint}</p>}
      </div>
    </div>
  );
}

export function Checkbox({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; disabled?: boolean }) {
  return (
    <label className={cx('inline-flex items-center gap-2 text-sm', disabled ? 'opacity-60' : 'cursor-pointer')}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-line-strong accent-[#556b2f]"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

/** A row of mutually-exclusive options (device switch, alignment, sizes). */
export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  size = 'md',
  className,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: ReactNode; title?: string; disabled?: boolean }[];
  onChange: (v: T) => void;
  size?: 'sm' | 'md';
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cx('inline-flex rounded-lg bg-sand p-0.5', className)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          title={o.title}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
          className={cx(
            'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-40',
            size === 'sm' ? 'h-7 min-w-7 px-2 text-xs' : 'h-8 min-w-8 px-3 text-[13px]',
            o.value === value ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- display

type ChipTone = 'neutral' | 'ok' | 'warn' | 'danger' | 'info' | 'olive' | 'gold';
const chipTones: Record<ChipTone, string> = {
  neutral: 'bg-sand text-muted',
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
  olive: 'bg-mist text-olive',
  gold: 'bg-[#f6ecd6] text-[#8a6418]',
};

export function Chip({ tone = 'neutral', children, className, dot }: { tone?: ChipTone; children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium whitespace-nowrap', chipTones[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

export function Spinner({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return <LuLoaderCircle className={cx('animate-spin text-olive', className)} aria-label={label} role="status" />;
}

export function LoadingBlock({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-20 text-muted" role="status">
      <LuLoaderCircle className="animate-spin text-olive text-xl" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-danger/20 bg-danger-soft px-5 py-4 text-sm text-danger flex items-center justify-between gap-4" role="alert">
      <span>{message}</span>
      {onRetry && (
        <Button size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function Card({ children, className, padded = true }: { children: ReactNode; className?: string; padded?: boolean }) {
  return <div className={cx('rounded-xl border border-line bg-white shadow-[var(--shadow-card)]', padded && 'p-5', className)}>{children}</div>;
}

export function PageHeader({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-[26px] leading-tight text-olive-dark sm:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, body, action }: { icon?: ReactNode; title: string; body?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {icon && <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-2xl text-olive">{icon}</div>}
      <h3 className="font-display text-lg text-olive-dark">{title}</h3>
      {body && <p className="mt-1.5 max-w-sm text-sm text-muted">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Tabs<T extends string>({
  value,
  onChange,
  tabs,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  tabs: { value: T; label: ReactNode; badge?: ReactNode }[];
  className?: string;
}) {
  return (
    <div role="tablist" className={cx('flex gap-1 border-b border-line', className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          type="button"
          aria-selected={t.value === value}
          onClick={() => onChange(t.value)}
          className={cx(
            '-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors',
            t.value === value ? 'border-olive text-olive-dark' : 'border-transparent text-muted hover:text-ink'
          )}
        >
          {t.label}
          {t.badge}
        </button>
      ))}
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-line-strong bg-white px-1.5 py-0.5 font-mono text-[11px] text-muted">{children}</kbd>;
}

/** Character counter that turns amber/red past the recommended range. */
export function Counter({ value, ideal, max }: { value: string; ideal: [number, number]; max: number }) {
  const n = value.length;
  const tone = n === 0 ? 'text-faint' : n > max ? 'text-danger' : n < ideal[0] || n > ideal[1] ? 'text-warn' : 'text-ok';
  return (
    <span className={cx('tabular-nums', tone)}>
      {n} / {ideal[1]}
    </span>
  );
}
