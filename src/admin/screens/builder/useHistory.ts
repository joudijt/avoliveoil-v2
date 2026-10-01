import { useCallback, useRef, useState } from 'react';
import type { CmsPageDoc } from '../../../cms/contracts';

const LIMIT = 150;
/** consecutive edits of the same field within this window become one undo step */
const COALESCE_MS = 900;

/**
 * Undo/redo over immutable docs (doc.ts never mutates, so the stack holds plain references).
 * Typing in one field coalesces into a single step.
 */
export function useHistory(initial: CmsPageDoc) {
  const [state, setState] = useState({ past: [] as CmsPageDoc[], present: initial, future: [] as CmsPageDoc[] });
  const last = useRef<{ key: string; at: number } | null>(null);

  const commit = useCallback((next: CmsPageDoc | ((d: CmsPageDoc) => CmsPageDoc), coalesceKey?: string) => {
    setState((s) => {
      const doc = typeof next === 'function' ? next(s.present) : next;
      if (doc === s.present) return s;
      const now = Date.now();
      const merge = !!coalesceKey && last.current?.key === coalesceKey && now - last.current.at < COALESCE_MS;
      last.current = coalesceKey ? { key: coalesceKey, at: now } : null;
      if (merge) return { ...s, present: doc, future: [] };
      return { past: [...s.past, s.present].slice(-LIMIT), present: doc, future: [] };
    });
  }, []);

  const undo = useCallback(() => {
    last.current = null;
    setState((s) => (s.past.length ? { past: s.past.slice(0, -1), present: s.past[s.past.length - 1], future: [s.present, ...s.future] } : s));
  }, []);

  const redo = useCallback(() => {
    last.current = null;
    setState((s) => (s.future.length ? { past: [...s.past, s.present], present: s.future[0], future: s.future.slice(1) } : s));
  }, []);

  /** replace the whole doc without an undo step (load, restore from server) */
  const reset = useCallback((doc: CmsPageDoc) => {
    last.current = null;
    setState({ past: [], present: doc, future: [] });
  }, []);

  return { doc: state.present, commit, undo, redo, reset, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}
