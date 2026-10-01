/** One shared media list for the Media screen and every picker (loaded once, kept fresh). */
import { useEffect, useState } from 'react';
import { api, type MediaItem } from '../api';

interface State {
  items: MediaItem[] | null;
  loading: boolean;
  error: string | null;
}

let state: State = { items: null, loading: false, error: null };
const listeners = new Set<(s: State) => void>();
const set = (p: Partial<State>) => {
  state = { ...state, ...p };
  listeners.forEach((l) => l(state));
};

let inflight: Promise<void> | null = null;

export const mediaStore = {
  load(force = false): Promise<void> {
    if (inflight) return inflight;
    if (state.items && !force) return Promise.resolve();
    set({ loading: true, error: null });
    inflight = api
      .media()
      .then((items) => set({ items, loading: false }))
      .catch((e: unknown) => set({ loading: false, error: e instanceof Error ? e.message : 'Could not load photos.' }))
      .finally(() => {
        inflight = null;
      });
    return inflight;
  },
  add(m: MediaItem) {
    set({ items: [m, ...(state.items ?? []).filter((x) => x.id !== m.id)] });
  },
  update(m: MediaItem) {
    set({ items: (state.items ?? []).map((x) => (x.id === m.id ? { ...x, ...m } : x)) });
  },
  remove(id: number) {
    set({ items: (state.items ?? []).filter((x) => x.id !== id) });
  },
  get(id: number | undefined | null): MediaItem | undefined {
    return id == null ? undefined : state.items?.find((m) => m.id === id);
  },
};

export function useMedia() {
  const [s, setS] = useState(state);
  useEffect(() => {
    listeners.add(setS);
    setS(state);
    void mediaStore.load();
    return () => {
      listeners.delete(setS);
    };
  }, []);
  return { ...s, reload: () => mediaStore.load(true) };
}
