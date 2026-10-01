import { createContext, useContext } from 'react';
import type { AdminUser } from '../api';

export interface SessionState {
  user: AdminUser | null;
  setUser: (u: AdminUser | null) => void;
  logout: () => Promise<void>;
  /** unread inbox entries, shown as a sidebar badge */
  unread: number;
  refreshUnread: () => void;
}

export const SessionContext = createContext<SessionState | null>(null);

export function useSession(): SessionState {
  const s = useContext(SessionContext);
  if (!s) throw new Error('useSession outside SessionContext');
  return s;
}

/** Same user, guaranteed signed-in (only used under RequireAuth). */
export function useUser(): AdminUser {
  const { user } = useSession();
  if (!user) throw new Error('useUser without a signed-in user');
  return user;
}
