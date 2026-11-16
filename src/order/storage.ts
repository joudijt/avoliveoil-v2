/**
 * localStorage with a memory fallback (moved here from the ORDER-R1 cart store, review m4).
 * Lazy code only (the Buy-now sheet and the paid page).
 *
 * A key is in `mem` only while its LAST write to storage failed, so memory is the newer value and
 * wins. `gone` = a removal that failed: the key counts as deleted on this page. Private mode or
 * blocked storage therefore still keeps the draft and its idem for the life of the page.
 */
const mem = new Map<string, string>();
const gone = new Set<string>();

export const orderStorage = {
  get(key: string): string | null {
    if (mem.has(key)) return mem.get(key) as string;
    if (gone.has(key)) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    gone.delete(key);
    try {
      window.localStorage.setItem(key, value);
      mem.delete(key);
    } catch {
      mem.set(key, value);
    }
  },
  del(key: string): void {
    mem.delete(key);
    try {
      window.localStorage.removeItem(key);
      gone.delete(key);
    } catch {
      gone.add(key);
    }
  },
};
