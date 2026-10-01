import { useState, type FormEvent } from 'react';
import { LuKeyRound, LuPlus, LuUserCheck, LuUserX, LuUsers } from 'react-icons/lu';
import { api, ApiError, type AdminUser } from '../../api';
import { confirmDialog, toast, toastError } from '../../lib/bus';
import { cx } from '../../lib/cx';
import { EMAIL_RE, fmtAgo, MIN_PASSWORD } from '../../lib/format';
import { useLoad } from '../../lib/hooks';
import { useUser } from '../../lib/session';
import { Menu } from '../../ui/Menu';
import { Modal } from '../../ui/Modal';
import { Button, Card, Chip, EmptyState, ErrorBlock, Field, Input, LoadingBlock, PageHeader } from '../../ui/ui';

/** A readable temporary password: 3 words-ish chunks, no look-alike characters. */
function tempPassword(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  const s = Array.from(bytes, (b) => chars[b % chars.length]).join('');
  return `${s.slice(0, 5)}-${s.slice(5, 10)}-${s.slice(10, 15)}`;
}

function PasswordReveal({ password }: { password: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-sand px-3 py-2">
      <code className="flex-1 select-all font-mono text-[15px] tracking-wide text-ink">{password}</code>
      <Button size="sm" onClick={() => void navigator.clipboard?.writeText(password).then(() => toast.ok('Copied.'))}>
        Copy
      </Button>
    </div>
  );
}

function AddUserDialog({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(tempPassword);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<AdminUser | null>(null);
  const reset = () => {
    setName('');
    setEmail('');
    setPassword(tempPassword());
    setFields({});
    setCreated(null);
  };
  const close = () => {
    reset();
    onClose();
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const f: Record<string, string> = {};
    if (!name.trim()) f.name = 'Enter their name.';
    if (!EMAIL_RE.test(email.trim())) f.email = 'Enter a valid email address.';
    if (password.length < MIN_PASSWORD) f.password = `At least ${MIN_PASSWORD} characters.`;
    setFields(f);
    if (Object.keys(f).length) return;
    setBusy(true);
    try {
      const u = await api.createUser({ name: name.trim(), email: email.trim(), password });
      setCreated(u);
      onDone();
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.fields).length) setFields(err.fields);
      else toastError(err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={close}
      title={created ? 'User added' : 'Add a user'}
      size="sm"
      footer={
        created ? (
          <Button variant="primary" onClick={close}>
            Done
          </Button>
        ) : (
          <>
            <Button onClick={close}>Cancel</Button>
            <Button variant="primary" type="submit" form="add-user" loading={busy}>
              Add user
            </Button>
          </>
        )
      }
    >
      {created ? (
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-ink">
            Send <strong>{created.name}</strong> these details (by WhatsApp or in person). They can change the password in <em>My account</em> after signing in.
          </p>
          <div className="rounded-lg bg-white p-3 text-[13px]">
            <div>
              <span className="text-muted">Sign-in page:</span> {window.location.origin}/admin
            </div>
            <div>
              <span className="text-muted">Email:</span> {created.email}
            </div>
          </div>
          <PasswordReveal password={password} />
          <p className="text-xs text-muted">This password is shown only now.</p>
        </div>
      ) : (
        <form id="add-user" onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <Field label="Name" error={fields.name}>
            <Input value={name} onChange={(e) => setName(e.target.value)} invalid={!!fields.name} data-autofocus />
          </Field>
          <Field label="Email" error={fields.email}>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} invalid={!!fields.email} />
          </Field>
          <Field label="Temporary password" error={fields.password} hint="Made up for you. You will see it once more after adding the user.">
            <div className="flex gap-2">
              <Input value={password} onChange={(e) => setPassword(e.target.value)} className="font-mono" invalid={!!fields.password} />
              <Button onClick={() => setPassword(tempPassword())}>New</Button>
            </div>
          </Field>
        </form>
      )}
    </Modal>
  );
}

export function UsersScreen() {
  const me = useUser();
  const users = useLoad(() => api.users(), []);
  const [adding, setAdding] = useState(false);
  const [resetFor, setResetFor] = useState<{ user: AdminUser; password: string } | null>(null);
  const activeCount = (users.data ?? []).filter((u) => u.isActive).length;

  const toggle = async (u: AdminUser) => {
    if (u.isActive) {
      const ok = await confirmDialog({
        title: `Remove access for ${u.name || u.email}?`,
        message: 'They are signed out straight away and can no longer sign in. Their past work stays. You can give access back later.',
        confirmLabel: 'Remove access',
        danger: true,
      });
      if (!ok) return;
    }
    try {
      await api.updateUser(u.id, { isActive: !u.isActive });
      toast.ok(u.isActive ? 'Access removed.' : 'Access given back.');
      void users.reload(true);
    } catch (e) {
      toastError(e);
    }
  };

  const resetPw = async (u: AdminUser) => {
    const ok = await confirmDialog({
      title: `Make a new password for ${u.name || u.email}?`,
      message: 'Their current password stops working and they are signed out everywhere. You will see the new password to send them.',
      confirmLabel: 'Make new password',
    });
    if (!ok) return;
    const password = tempPassword();
    try {
      await api.updateUser(u.id, { password });
      setResetFor({ user: u, password });
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="People who can sign in to this control panel. Everyone has the same access."
        actions={
          <Button variant="primary" icon={<LuPlus />} onClick={() => setAdding(true)}>
            Add user
          </Button>
        }
      />
      <Card padded={false}>
        {users.loading && !users.data && <LoadingBlock />}
        {users.error && (
          <div className="p-5">
            <ErrorBlock message={users.error} onRetry={() => void users.reload()} />
          </div>
        )}
        {users.data?.length === 0 && <EmptyState icon={<LuUsers />} title="No users" />}
        {users.data && users.data.length > 0 && (
          <ul className="divide-y divide-line">
            {users.data.map((u) => {
              const isMe = u.id === me.id;
              const lastActive = u.isActive && activeCount <= 1;
              return (
                <li key={u.id} className={cx('flex items-center gap-3 px-4 py-3.5 sm:px-5', !u.isActive && 'opacity-60')}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-[13px] font-semibold text-olive">
                    {(u.name || u.email).slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-medium text-ink">{u.name || '—'}</span>
                      {isMe && <Chip tone="olive">You</Chip>}
                      {!u.isActive && <Chip>No access</Chip>}
                    </div>
                    <div className="truncate text-xs text-muted">
                      {u.email} · {u.lastLoginAt ? `last signed in ${fmtAgo(u.lastLoginAt)}` : 'never signed in'}
                    </div>
                  </div>
                  <Menu
                    items={[
                      { label: 'Make a new password', icon: <LuKeyRound />, onSelect: () => void resetPw(u), disabled: isMe, hint: isMe ? 'Change your own password in My account' : undefined },
                      u.isActive
                        ? {
                            label: 'Remove access',
                            icon: <LuUserX />,
                            danger: true,
                            disabled: isMe || lastActive,
                            hint: isMe ? 'You cannot remove your own access' : lastActive ? 'At least one person must keep access' : undefined,
                            onSelect: () => void toggle(u),
                          }
                        : { label: 'Give access back', icon: <LuUserCheck />, onSelect: () => void toggle(u) },
                    ]}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      <p className="mt-3 text-xs text-muted">You cannot remove your own access, and at least one person always keeps access.</p>
      <AddUserDialog open={adding} onClose={() => setAdding(false)} onDone={() => void users.reload(true)} />
      <Modal open={!!resetFor} onClose={() => setResetFor(null)} title="New password ready" size="sm" footer={<Button variant="primary" onClick={() => setResetFor(null)}>Done</Button>}>
        {resetFor && (
          <div className="flex flex-col gap-3 text-sm">
            <p>
              Send this password to <strong>{resetFor.user.name || resetFor.user.email}</strong>. It is shown only now.
            </p>
            <PasswordReveal password={resetFor.password} />
          </div>
        )}
      </Modal>
    </>
  );
}
