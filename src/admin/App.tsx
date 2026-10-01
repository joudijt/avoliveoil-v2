import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LuRefreshCw } from 'react-icons/lu';
import { api, session, type AdminUser } from './api';
import { SessionContext, useSession, type SessionState } from './lib/session';
import { reloadWithoutPrompt } from './lib/navGuard';
import { AppLayout } from './layout/AppLayout';
import { ConfirmHost, Toaster } from './ui/Hosts';
import { Modal } from './ui/Modal';
import { Button, LoadingBlock } from './ui/ui';
import { ForgotScreen, LoginScreen, ResetScreen, SetupScreen } from './screens/auth/AuthScreens';
import { Dashboard } from './screens/Dashboard';
import { PagesScreen } from './screens/pages/PagesScreen';
import { FormsList } from './screens/forms/FormsList';
import { FormEditor } from './screens/forms/FormEditor';
import { InboxScreen } from './screens/inbox/InboxScreen';
import { MediaScreen } from './screens/media/MediaScreen';
import { UsersScreen } from './screens/users/UsersScreen';
import { AccountScreen } from './screens/users/AccountScreen';
import { SystemScreen } from './screens/system/SystemScreen';
import { SitePagesList } from './screens/site/SitePagesList';

// The two full-screen editors are the heaviest code (builder pulls react-dom/server through
// the publish renderer), so they load on demand.
const Builder = lazy(() => import('./screens/builder/Builder'));
const SiteEditor = lazy(() => import('./screens/site/SiteEditor'));

type BootState = { phase: 'loading' } | { phase: 'error'; message: string } | { phase: 'ready'; needsSetup: boolean };

function Root() {
  const [boot, setBoot] = useState<BootState>({ phase: 'loading' });
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stale, setStale] = useState(false);
  const [unread, setUnread] = useState(0);

  const start = useCallback(async () => {
    setBoot({ phase: 'loading' });
    try {
      const b = await api.build();
      session.setBuild(b.build);
      const s = await api.setupStatus();
      if (s.needsSetup) {
        setBoot({ phase: 'ready', needsSetup: true });
        return;
      }
      try {
        const me = await api.me();
        session.setCsrf(me.csrf);
        setUser(me.user);
      } catch {
        setUser(null);
      }
      setBoot({ phase: 'ready', needsSetup: false });
    } catch (e) {
      setBoot({ phase: 'error', message: e instanceof Error ? e.message : 'The control panel could not start.' });
    }
  }, []);

  useEffect(() => {
    void start();
    session.onUnauthorized(() => setUser(null));
    session.onStalePanel(() => setStale(true));
    return () => {
      session.onUnauthorized(null);
      session.onStalePanel(null);
    };
  }, [start]);

  const refreshUnread = useCallback(() => {
    api
      .dashboard()
      .then((d) => setUnread(d.entries.unread))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    refreshUnread();
    const t = setInterval(refreshUnread, 120_000);
    return () => clearInterval(t);
  }, [user, refreshUnread]);

  const value = useMemo<SessionState>(
    () => ({
      user,
      setUser: (u) => {
        setUser(u);
        if (u) setBoot((b) => (b.phase === 'ready' ? { phase: 'ready', needsSetup: false } : b));
      },
      logout: async () => {
        try {
          await api.logout();
        } finally {
          session.setCsrf('');
          setUser(null);
        }
      },
      unread,
      refreshUnread,
    }),
    [user, unread, refreshUnread]
  );

  return (
    <SessionContext.Provider value={value}>
      {boot.phase === 'loading' && (
        <div className="min-h-screen">
          <LoadingBlock label="Opening the control panel…" />
        </div>
      )}
      {boot.phase === 'error' && (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="max-w-md text-center">
            <h1 className="font-display text-2xl text-olive-dark">The control panel could not start</h1>
            <p className="mt-2 text-sm text-muted">{boot.message}</p>
            <Button variant="primary" className="mt-5" icon={<LuRefreshCw />} onClick={() => void start()}>
              Try again
            </Button>
          </div>
        </div>
      )}
      {boot.phase === 'ready' && (
        <SetupGate needsSetup={boot.needsSetup}>
          <AdminRoutes />
        </SetupGate>
      )}
      <Toaster />
      <ConfirmHost />
      <Modal open={stale} onClose={() => {}} dismissable={false} title="The site was updated" size="sm"
        footer={
          <Button variant="primary" icon={<LuRefreshCw />} onClick={reloadWithoutPrompt} data-autofocus>
            Reload the panel
          </Button>
        }
      >
        <p className="text-sm leading-relaxed text-muted">
          A new version of the website was installed while this panel was open. Reload the panel so your changes are saved with the
          new version. Anything you saved before stays safe.
        </p>
      </Modal>
    </SessionContext.Provider>
  );
}

function SetupGate({ needsSetup, children }: { needsSetup: boolean; children: React.ReactNode }) {
  const loc = useLocation();
  if (needsSetup && loc.pathname !== '/setup') return <Navigate to="/setup" replace />;
  if (!needsSetup && loc.pathname === '/setup') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function RequireAuth() {
  const { user } = useSession();
  const loc = useLocation();
  if (!user) {
    const next = loc.pathname + loc.search;
    return <Navigate to={'/login' + (next && next !== '/' ? '?next=' + encodeURIComponent(next) : '')} replace />;
  }
  return <Outlet />;
}

function PublicOnly() {
  const { user } = useSession();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}

const full = (el: React.ReactNode) => <Suspense fallback={<LoadingBlock label="Opening the editor…" />}>{el}</Suspense>;

// Plain <BrowserRouter> + <Routes> on purpose: the data router (createBrowserRouter /
// useBlocker) would add ~17 KB to the react-vendor chunk the PUBLIC site shares.
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/setup" element={<SetupScreen />} />
      <Route element={<PublicOnly />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot" element={<ForgotScreen />} />
      </Route>
      <Route path="/reset" element={<ResetScreen />} />
      <Route element={<RequireAuth />}>
        <Route path="/pages/:id/edit" element={full(<Builder />)} />
        <Route path="/site/:pageKey" element={full(<SiteEditor />)} />
        <Route path="/edit/:pageKey" element={full(<SiteEditor />)} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pages" element={<PagesScreen />} />
          <Route path="/site" element={<SitePagesList />} />
          <Route path="/forms" element={<FormsList />} />
          <Route path="/forms/:id" element={<FormEditor />} />
          <Route path="/inbox" element={<InboxScreen />} />
          <Route path="/media" element={<MediaScreen />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/account" element={<AccountScreen />} />
          <Route path="/system" element={<SystemScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export function AdminApp() {
  return (
    <BrowserRouter basename="/admin">
      <Root />
    </BrowserRouter>
  );
}
