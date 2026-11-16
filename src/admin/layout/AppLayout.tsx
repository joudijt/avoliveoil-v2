import { useEffect, useRef, useState, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LuChevronDown,
  LuCreditCard,
  LuExternalLink,
  LuFileText,
  LuImage,
  LuInbox,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuPanelsTopLeft,
  LuReceipt,
  LuServer,
  LuSquarePen,
  LuUserRound,
  LuUsers,
  LuX,
} from 'react-icons/lu';
import { useSession, useUser } from '../lib/session';
import { cx } from '../lib/cx';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
  badge?: number;
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { unread } = useSession();
  const main: NavItem[] = [
    { to: '/', label: 'Dashboard', icon: <LuLayoutDashboard />, end: true },
    { to: '/pages', label: 'Pages', icon: <LuFileText /> },
    { to: '/site', label: 'Site pages', icon: <LuPanelsTopLeft /> },
    { to: '/forms', label: 'Forms', icon: <LuSquarePen /> },
    { to: '/inbox', label: 'Inbox', icon: <LuInbox />, badge: unread },
    { to: '/media', label: 'Media', icon: <LuImage /> },
    { to: '/orders', label: 'Orders', icon: <LuReceipt /> },
  ];
  const admin: NavItem[] = [
    { to: '/payments', label: 'Payments', icon: <LuCreditCard /> },
    { to: '/users', label: 'Users', icon: <LuUsers /> },
    { to: '/system', label: 'System', icon: <LuServer /> },
    { to: '/account', label: 'My account', icon: <LuUserRound /> },
  ];
  const item = (n: NavItem) => (
    <NavLink
      key={n.to}
      to={n.to}
      end={n.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cx(
          'group relative flex h-9 items-center gap-3 rounded-lg px-3 text-[13.5px] font-medium transition-colors',
          isActive ? 'bg-mist text-olive-dark' : 'text-muted hover:bg-sand hover:text-ink'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute -left-3 top-2 bottom-2 w-[3px] rounded-r bg-gold" aria-hidden />}
          <span className={cx('text-[17px]', isActive ? 'text-olive' : 'text-faint group-hover:text-muted')}>{n.icon}</span>
          <span className="flex-1">{n.label}</span>
          {!!n.badge && (
            <span className="min-w-5 rounded-full bg-gold px-1.5 py-px text-center text-[11px] font-semibold text-white" aria-label={`${n.badge} unread`}>
              {n.badge > 99 ? '99+' : n.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
  return (
    <nav className="flex h-full flex-col px-3 pb-4" aria-label="Control panel">
      <div className="flex h-16 items-center gap-2.5 px-3">
        <img src="/logo.svg" alt="Arabian Village" className="h-8 w-auto" />
      </div>
      <div className="mt-2 flex flex-col gap-0.5">{main.map(item)}</div>
      <div className="mt-6 px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">Settings</div>
      <div className="flex flex-col gap-0.5">{admin.map(item)}</div>
      <div className="mt-auto pt-4">
        <a
          href="/en"
          target="_blank"
          rel="noopener"
          className="flex h-9 items-center gap-3 rounded-lg px-3 text-[13.5px] font-medium text-muted hover:bg-sand hover:text-ink"
        >
          <LuExternalLink className="text-[17px] text-faint" />
          View site
        </a>
      </div>
    </nav>
  );
}

function UserMenu() {
  const user = useUser();
  const { logout } = useSession();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', h);
    document.addEventListener('keydown', k);
    return () => {
      document.removeEventListener('mousedown', h);
      document.removeEventListener('keydown', k);
    };
  }, [open]);
  const initials = (user.name || user.email)
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 hover:bg-sand"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-olive text-[12px] font-semibold text-cream">{initials}</span>
        <span className="hidden text-left sm:block">
          <span className="block max-w-[180px] truncate text-[13px] font-medium leading-tight text-ink">{user.name || 'Admin'}</span>
          <span className="block max-w-[180px] truncate text-[11.5px] leading-tight text-muted">{user.email}</span>
        </span>
        <LuChevronDown className="text-muted" />
      </button>
      {open && (
        <div role="menu" className="avo-in absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-[var(--shadow-pop)]">
          <button
            role="menuitem"
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm hover:bg-sand"
            onClick={() => {
              setOpen(false);
              nav('/account');
            }}
          >
            <LuUserRound className="text-muted" /> My account
          </button>
          <a role="menuitem" href="/en" target="_blank" rel="noopener" className="flex items-center gap-2.5 px-3.5 py-2 text-sm hover:bg-sand">
            <LuExternalLink className="text-muted" /> View site
          </a>
          <div className="my-1 border-t border-line" />
          <button
            role="menuitem"
            type="button"
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-danger hover:bg-danger-soft"
            onClick={() => void logout()}
          >
            <LuLogOut /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function AppLayout() {
  const [drawer, setDrawer] = useState(false);
  const loc = useLocation();
  useEffect(() => setDrawer(false), [loc.pathname]);
  return (
    <div className="min-h-screen lg:pl-[248px]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-line bg-cream lg:block">
        <Sidebar />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="avo-fade absolute inset-0 bg-[#1d2417]/40" onClick={() => setDrawer(false)} aria-hidden />
          <aside className="avo-slide absolute inset-y-0 left-0 w-[270px] bg-cream shadow-[var(--shadow-pop)]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-muted hover:bg-sand"
            >
              <LuX className="text-lg" />
            </button>
            <Sidebar onNavigate={() => setDrawer(false)} />
          </aside>
        </div>
      )}
      <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur sm:px-8">
        <button type="button" aria-label="Open menu" onClick={() => setDrawer(true)} className="-ml-1 rounded-md p-2 text-ink hover:bg-sand lg:hidden">
          <LuMenu className="text-xl" />
        </button>
        <img src="/logo.svg" alt="Arabian Village" className="h-7 w-auto lg:hidden" />
        <div className="ml-auto">
          <UserMenu />
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-8 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
