import { useState, type FormEvent } from 'react';
import { api, ApiError } from '../../api';
import { toast, toastError } from '../../lib/bus';
import { EMAIL_RE, MIN_PASSWORD } from '../../lib/format';
import { useSession, useUser } from '../../lib/session';
import { Button, Card, Field, Input, PageHeader } from '../../ui/ui';

export function AccountScreen() {
  const user = useUser();
  const { setUser } = useSession();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pf, setPf] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<'profile' | 'pw' | null>(null);
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [next2, setNext2] = useState('');
  const [pw, setPw] = useState<Record<string, string>>({});

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!name.trim()) f.name = 'Enter your name.';
    if (!EMAIL_RE.test(email.trim())) f.email = 'Enter a valid email address.';
    setPf(f);
    if (Object.keys(f).length) return;
    setBusy('profile');
    try {
      const u = await api.updateUser(user.id, { name: name.trim(), email: email.trim() });
      setUser(u);
      toast.ok('Your details are saved.');
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setPf(err.fields);
      else toastError(err);
    } finally {
      setBusy(null);
    }
  };

  const savePw = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!cur) f.current = 'Enter your current password.';
    if (next.length < MIN_PASSWORD) f.next = `Use at least ${MIN_PASSWORD} characters.`;
    else if (next !== next2) f.next2 = 'The two new passwords are not the same.';
    setPw(f);
    if (Object.keys(f).length) return;
    setBusy('pw');
    try {
      await api.changePassword(cur, next);
      setCur('');
      setNext('');
      setNext2('');
      toast.ok('Password changed. You were signed out on your other devices.');
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setPw(err.fields);
      else toastError(err);
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <PageHeader title="My account" subtitle="Your name, the email you sign in with, and your password." />
      <div className="grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <form onSubmit={saveProfile} className="flex flex-col gap-4" noValidate>
            <h2 className="font-display text-lg text-olive-dark">Your details</h2>
            <Field label="Name" error={pf.name}>
              <Input value={name} onChange={(e) => setName(e.target.value)} invalid={!!pf.name} autoComplete="name" />
            </Field>
            <Field label="Email" error={pf.email} hint="You sign in with this email, and password-reset links are sent here.">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!pf.email} autoComplete="email" />
            </Field>
            <div>
              <Button type="submit" variant="primary" loading={busy === 'profile'} disabled={name === user.name && email === user.email}>
                Save details
              </Button>
            </div>
          </form>
        </Card>
        <Card>
          <form onSubmit={savePw} className="flex flex-col gap-4" noValidate>
            <h2 className="font-display text-lg text-olive-dark">Change password</h2>
            <Field label="Current password" error={pw.current}>
              <Input type="password" value={cur} onChange={(e) => setCur(e.target.value)} invalid={!!pw.current} autoComplete="current-password" />
            </Field>
            <Field label="New password" error={pw.next} hint={`At least ${MIN_PASSWORD} characters.`}>
              <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} invalid={!!pw.next} autoComplete="new-password" />
            </Field>
            <Field label="New password again" error={pw.next2}>
              <Input type="password" value={next2} onChange={(e) => setNext2(e.target.value)} invalid={!!pw.next2} autoComplete="new-password" />
            </Field>
            <div>
              <Button type="submit" variant="primary" loading={busy === 'pw'}>
                Change password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
