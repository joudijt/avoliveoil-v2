import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LuArrowLeft, LuEye, LuEyeOff, LuMailCheck } from 'react-icons/lu';
import { api, ApiError, session } from '../../api';
import { EMAIL_RE, MIN_PASSWORD } from '../../lib/format';
import { useSession } from '../../lib/session';
import { toast } from '../../lib/bus';
import { Button, Field, Input } from '../../ui/ui';


function AuthFrame({ title, subtitle, children, footer }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="relative hidden overflow-hidden bg-olive-dark lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, #b88a2a 0%, transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #8aa05a 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative flex items-center gap-3">
          <img src="/favicon-2026-09.svg" alt="" className="h-10 w-10" />
          <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#d9cfae]">Arabian Village · Control panel</span>
        </div>
        <div className="relative max-w-md">
          <p className="font-display text-[40px] leading-[1.1] text-cream">
            Your website, <span className="italic text-gold">in your hands.</span>
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#cfd3c0]">
            Edit the words and photos on every page, build new pages, and read every message your customers send — in English and Bahasa Melayu.
          </p>
        </div>
        <p className="relative text-xs text-[#9aa189]">avoliveoil.com</p>
      </div>
      <div className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-[400px]">
          <img src="/logo.svg" alt="Arabian Village" className="mb-8 h-10 w-auto lg:hidden" />
          <h1 className="font-display text-[28px] leading-tight text-olive-dark">{title}</h1>
          {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>}
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ id, value, onChange, invalid, autoComplete }: { id: string; value: string; onChange: (v: string) => void; invalid?: boolean; autoComplete: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        invalid={invalid}
        autoComplete={autoComplete}
        className="h-11 pr-11"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted hover:text-ink"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <LuEyeOff /> : <LuEye />}
      </button>
    </div>
  );
}

function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="mb-5 rounded-lg border border-danger/20 bg-danger-soft px-3.5 py-2.5 text-sm text-danger" role="alert">
      {message}
    </div>
  );
}

export function LoginScreen() {
  const { setUser } = useSession();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!EMAIL_RE.test(email.trim())) f.email = 'Enter your email address.';
    if (!password) f.password = 'Enter your password.';
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    setError(null);
    try {
      const r = await api.login(email.trim(), password);
      session.setCsrf(r.csrf);
      setUser(r.user);
      const next = params.get('next');
      nav(next && next.startsWith('/') && !next.startsWith('//') ? next : '/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
      if (err instanceof ApiError) setFields(err.fields);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthFrame title="Sign in" subtitle="Welcome back. Sign in to manage the avoliveoil.com website.">
      <FormError message={error} />
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field label="Email" htmlFor="email" error={fields.email}>
          <Input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!fields.email} className="h-11" autoFocus />
        </Field>
        <Field label="Password" htmlFor="password" error={fields.password} aside={<Link to="/forgot" className="font-medium text-olive hover:underline">Forgot password?</Link>}>
          <PasswordInput id="password" value={password} onChange={setPassword} invalid={!!fields.password} autoComplete="current-password" />
        </Field>
        <Button type="submit" variant="primary" size="lg" loading={busy} className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    </AuthFrame>
  );
}

export function ForgotScreen() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter the email address you sign in with.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api.forgot(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the email.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthFrame
      title="Reset your password"
      subtitle={sent ? undefined : 'Enter your email and we will send you a link to choose a new password.'}
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-olive hover:underline">
          <LuArrowLeft /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-line bg-white p-5">
          <LuMailCheck className="text-2xl text-olive" />
          <p className="mt-3 text-sm leading-relaxed text-ink">
            If <strong>{email.trim()}</strong> belongs to an account, a reset link is on its way. The link works for 30 minutes.
          </p>
          <p className="mt-2 text-xs text-muted">Nothing after a few minutes? Check your spam folder.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <FormError message={error} />
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" autoFocus />
          </Field>
          <Button type="submit" variant="primary" size="lg" loading={busy} className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthFrame>
  );
}

export function ResetScreen() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const token = params.get('token') ?? '';
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (pw.length < MIN_PASSWORD) f.password = `Use at least ${MIN_PASSWORD} characters.`;
    else if (pw !== pw2) f.password2 = 'The two passwords are not the same.';
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    setError(null);
    try {
      await api.reset(token, pw);
      toast.ok('Password changed. Sign in with your new password.');
      nav('/login', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset the password.');
    } finally {
      setBusy(false);
    }
  };
  if (!token)
    return (
      <AuthFrame title="This link is incomplete" subtitle="Open the link from the email again, or ask for a new one." footer={<Link to="/forgot" className="font-medium text-olive hover:underline">Send a new link</Link>}>
        <span />
      </AuthFrame>
    );
  return (
    <AuthFrame title="Choose a new password" subtitle={`Use at least ${MIN_PASSWORD} characters. A short sentence is easy to remember and hard to guess.`}>
      <FormError message={error} />
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field label="New password" htmlFor="pw" error={fields.password}>
          <PasswordInput id="pw" value={pw} onChange={setPw} invalid={!!fields.password} autoComplete="new-password" />
        </Field>
        <Field label="Type it again" htmlFor="pw2" error={fields.password2}>
          <PasswordInput id="pw2" value={pw2} onChange={setPw2} invalid={!!fields.password2} autoComplete="new-password" />
        </Field>
        <Button type="submit" variant="primary" size="lg" loading={busy} className="mt-2 w-full">
          Save new password
        </Button>
      </form>
    </AuthFrame>
  );
}

export function SetupScreen() {
  const { setUser } = useSession();
  const nav = useNavigate();
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@avoliveoil.com');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!/^[a-f0-9]{64}$/i.test(token.trim())) f.token = 'Paste the 64-character setup code you were given.';
    if (!name.trim()) f.name = 'Enter your name.';
    if (!EMAIL_RE.test(email.trim())) f.email = 'Enter a valid email address.';
    if (pw.length < MIN_PASSWORD) f.password = `Use at least ${MIN_PASSWORD} characters.`;
    else if (pw !== pw2) f.password2 = 'The two passwords are not the same.';
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    setError(null);
    try {
      const r = await api.setup({ token: token.trim(), name: name.trim(), email: email.trim(), password: pw });
      session.setCsrf(r.csrf);
      setUser(r.user);
      toast.ok('Your account is ready. Welcome!');
      nav('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Setup failed.');
      if (err instanceof ApiError) setFields(err.fields);
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthFrame title="Set up the control panel" subtitle="Create the first administrator account. You only do this once.">
      <FormError message={error} />
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field label="Setup code" htmlFor="token" error={fields.token} hint="The long code your developer sent you.">
          <Input id="token" value={token} onChange={(e) => setToken(e.target.value)} invalid={!!fields.token} className="h-11 font-mono text-xs" autoComplete="off" spellCheck={false} />
        </Field>
        <Field label="Your name" htmlFor="name" error={fields.name}>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} invalid={!!fields.name} className="h-11" autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="email" error={fields.email} hint="You sign in with this address and receive password-reset emails here.">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!fields.email} className="h-11" autoComplete="username" />
        </Field>
        <Field label="Password" htmlFor="pw" error={fields.password} hint={`At least ${MIN_PASSWORD} characters.`}>
          <PasswordInput id="pw" value={pw} onChange={setPw} invalid={!!fields.password} autoComplete="new-password" />
        </Field>
        <Field label="Type the password again" htmlFor="pw2" error={fields.password2}>
          <PasswordInput id="pw2" value={pw2} onChange={setPw2} invalid={!!fields.password2} autoComplete="new-password" />
        </Field>
        <Button type="submit" variant="primary" size="lg" loading={busy} className="mt-2 w-full">
          Create my account
        </Button>
      </form>
    </AuthFrame>
  );
}
