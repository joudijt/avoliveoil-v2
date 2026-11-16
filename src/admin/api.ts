/**
 * Typed client for the PHP JSON API (spec §12 + §14.2).
 *
 * Transport rules that the WAF and the server both depend on:
 *   - every write is a POST; PUT/PATCH/DELETE travel as X-HTTP-Method-Override,
 *   - every write carries X-CSRF-Token (from login / me) and X-CMS-Build (from /api/build),
 *   - HTML travels base64 (htmlB64), never as a raw string in JSON.
 * Errors are always {error:{code,message,fields?}}; `message` is owner-readable.
 */
import type {
  CmsForm,
  CmsFormDef,
  CmsLang,
  CmsMedia,
  CmsPageDoc,
  HeadlineWord,
  ImageOverride,
  Localized,
  MediaRef,
  PublicForm,
  TextValue,
} from '../cms/contracts';

// ---------------------------------------------------------------- errors + session hooks

export class ApiError extends Error {
  status: number;
  code: string;
  fields: Record<string, string>;
  constructor(status: number, code: string, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

let csrf = '';
let build = '';
let onUnauthorized: (() => void) | null = null;
let onStalePanel: (() => void) | null = null;

export const session = {
  setCsrf(v: string) {
    csrf = v;
  },
  setBuild(v: string) {
    build = v;
  },
  get build() {
    return build;
  },
  onUnauthorized(fn: (() => void) | null) {
    onUnauthorized = fn;
  },
  onStalePanel(fn: (() => void) | null) {
    onStalePanel = fn;
  },
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOpts {
  /** do not trigger the global 401 → login handler (used by the auth screens themselves) */
  quiet401?: boolean;
  signal?: AbortSignal;
}

async function request<T>(method: Method, path: string, body?: unknown, opts: RequestOpts = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const isWrite = method !== 'GET';
  let payload: BodyInit | undefined;
  if (isWrite) {
    if (method !== 'POST') headers['X-HTTP-Method-Override'] = method;
    if (csrf) headers['X-CSRF-Token'] = csrf;
    if (build) headers['X-CMS-Build'] = build;
    if (body instanceof FormData) payload = body;
    else {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(body ?? {});
    }
  }
  let res: Response;
  try {
    res = await fetch(path, {
      method: isWrite ? 'POST' : 'GET',
      headers,
      body: payload,
      credentials: 'same-origin',
      signal: opts.signal,
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e;
    throw new ApiError(0, 'network', 'Could not reach the server. Check your internet connection and try again.');
  }
  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }
  if (!res.ok) {
    const err = (data as { error?: { code?: string; message?: string; fields?: Record<string, string> } } | null)?.error;
    const code = err?.code ?? (res.status === 401 ? 'unauthorized' : 'http_' + res.status);
    const message =
      err?.message ??
      (res.status === 401
        ? 'Please sign in again.'
        : res.status >= 500
          ? 'The server had a problem. Please try again in a minute.'
          : 'Something went wrong (' + res.status + ').');
    if (res.status === 401 && !opts.quiet401) onUnauthorized?.();
    if (res.status === 409 && code === 'stale_panel') onStalePanel?.();
    throw new ApiError(res.status, code, message, err?.fields ?? {});
  }
  return data as T;
}

const get = <T>(p: string, o?: RequestOpts) => request<T>('GET', p, undefined, o);
const post = <T>(p: string, b?: unknown, o?: RequestOpts) => request<T>('POST', p, b, o);
const put = <T>(p: string, b?: unknown) => request<T>('PUT', p, b);
const patch = <T>(p: string, b?: unknown) => request<T>('PATCH', p, b);
const del = <T>(p: string, b?: unknown) => request<T>('DELETE', p, b);

const qs = (o: Record<string, string | number | boolean | undefined | null>) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) if (v !== undefined && v !== null && v !== '' && v !== false) p.set(k, String(v));
  const s = p.toString();
  return s ? '?' + s : '';
};

/** base64 of the UTF-8 bytes of a string (htmlB64 transport, spec §13.3) */
export function toB64(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

// ---------------------------------------------------------------- shapes

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthResponse {
  user: AdminUser;
  csrf: string;
}

export type PageStatus = 'draft' | 'published';

export interface PageListItem {
  id: number;
  slug: string;
  status: PageStatus;
  title: Localized;
  updatedAt: string;
  publishedAt: string | null;
  /** languages the page is currently published in */
  langs: CmsLang[];
  inHeader: boolean;
  inFooter: boolean;
  menuOrder: number;
  noindex: boolean;
  /** draft differs from the published version */
  hasUnpublished: boolean;
  /** Malay fields missing in the draft (missingTranslations(draft,'ms').length) */
  needsTranslation: number;
  /** published HTML is out of date (re-rendered automatically from the dashboard) */
  needsRender?: boolean;
  /** only in ?trash=1 */
  deletedAt?: string | null;
  updatedBy?: string | null;
}

export interface PageMeta extends PageListItem {
  createdAt: string;
  /** draft version for optimistic concurrency (PUT draft baseVersion) */
  version: number;
}

export interface PagePayload {
  page: PageMeta;
  draft: CmsPageDoc;
  published: CmsPageDoc | null;
  /** every media item the draft OR published doc references */
  media: Record<string, MediaRef>;
  /** every form the draft OR published doc embeds */
  forms: Record<string, PublicForm>;
}

export interface PageRevision {
  id: number;
  createdAt: string;
  userName: string | null;
  note: string | null;
  langs?: CmsLang[];
}

export interface PagePatch {
  slug?: string;
  inHeader?: boolean;
  inFooter?: boolean;
  menuOrder?: number;
  noindex?: boolean;
}

/** page-keys.json entry (spec §14.1) */
export interface SitePageDef {
  path: string;
  label: string;
  groups: { label: string; keys: string[] }[];
  images: string[];
  /** infused only: one path per product */
  paths?: string[];
}

export interface ImageSpot {
  label: string;
  needsAlpha: boolean;
  default: { name: string; width: number; height: number; url?: string };
}

export interface SiteStructure {
  pages: Record<string, SitePageDef>;
  spots: Record<string, ImageSpot>;
}

export type SiteKeyType = 'string' | 'number' | 'words' | 'image';

/** image override as the API returns it (media expanded so a thumbnail can be shown) */
export type ImageValue = ImageOverride;

export interface SiteKeyItem {
  key: string;
  type: SiteKeyType;
  /** default value, interpolated for display ({{store}} resolved) */
  default: TextValue | ImageSpot['default'] | null;
  /** raw default template when it contains {{tokens}} */
  template?: string;
  tokens?: string[];
  /**
   * MY saved draft (drafts are per user). null + hasDraft = I reset it to the default
   * but have not published that yet.
   */
  draft: TextValue | ImageValue | null;
  hasDraft?: boolean;
  /** what the website shows now (null = the built-in default) */
  published: TextValue | ImageValue | null;
  usage: string[];
  editable: boolean;
  draftAt?: string | null;
  /** image spots only */
  label?: string;
  needsAlpha?: boolean;
}

export interface OverrideItem {
  key: string;
  kind: 'text' | 'image';
  /** null resets the draft to the built-in default */
  value: TextValue | { media: number; alt: string; focal?: { x: number; y: number } } | null;
}

export interface PendingOverride {
  lang: CmsLang;
  key: string;
  kind: 'text' | 'image';
  updatedAt: string;
  userId: number | null;
  userName: string | null;
}

export interface OrphanOverride {
  lang: CmsLang;
  key: string;
  value: unknown;
  updatedAt: string;
}

export interface SiteRevision {
  publishId: number;
  createdAt: string;
  userName: string | null;
  items: { lang: CmsLang; key: string }[];
}

export interface FormListItem {
  id: number;
  name: string;
  recipients: string[];
  subject: string;
  entries: number;
  unread: number;
  /** CMS page ids that embed this form */
  usedOn: number[];
  updatedAt: string;
}

export interface FormInput {
  name: string;
  recipients: string[];
  subject: string;
  def: CmsFormDef;
}

export type MailStatus = 'sent' | 'failed' | 'held' | 'spam';

export interface Submission {
  id: number;
  formId: number;
  formName: string;
  pageId: number | null;
  pageTitle: string | null;
  pageSlug: string | null;
  lang: CmsLang;
  /** POST field name → value; labels come from the form definition at the time of submit */
  data: Record<string, string | string[]>;
  labels?: Record<string, string>;
  createdAt: string;
  readAt: string | null;
  mailStatus: MailStatus;
  mailError: string | null;
}

export interface SubmissionList {
  items: Submission[];
  total: number;
  unread: number;
}

export interface MediaItem extends CmsMedia {
  /** owner-readable list of where this image is used ("Page: Ramadan offer", "Home › Hero background") */
  usedIn?: string[];
  /** true when the uploaded file had an alpha channel */
  hasAlpha?: boolean;
}

export interface Dashboard {
  pages: { published: number; draft: number; unpublishedChanges: number; trash: number };
  entries: { unread: number; last7days: number; total: number };
  mail: { failed: number; held: number };
  dirtyPages: number;
  sitePending: number;
  recentEntries?: Submission[];
}

export interface Health {
  php: string;
  sqlite: string;
  build: string;
  contentVersion: number;
  dataWritable: boolean;
  renderedFiles: number;
  renderedBytes: number;
  integrity: string;
  failedMails: number;
  heldMails: number;
  lastBackupAt: string | null;
  logTail: string[];
}

export interface Settings {
  systemEmail: string;
  mailCapPerHour: number;
}

// FORGE HITPAY: Orders page + Payments (HitPay) section
export type PaySite = 'av' | 'nf';
export type AdminOrderStatus = 'pending' | 'paid' | 'failed' | 'needs_review';
export interface AdminPayRequest {
  id: string;
  amountSen: number;
  status: 'pending' | 'completed' | 'needs_review' | 'double_paid' | 'expired' | 'canceled';
  paymentType: string | null;
  createdAt: string;
  checkedAt: string | null;
  note: string | null;
}
export interface AdminOrder {
  ref: string;
  site: PaySite;
  status: AdminOrderStatus;
  createdAt: string;
  createdMyt: string;
  paidAt: string | null;
  name: string;
  phone: string;
  email: string | null;
  address: { address?: string; postcode?: string; city?: string; state?: string; note?: string };
  lang: CmsLang;
  /** BUY-NOW B3: `pack` lines (Noor Fès packages) have qty 1 and a bottle count; `bottles`/`pack` are absent on older orders. */
  lines: { sku: string; qty: number; unit_sen: number; name: string; bottles?: number; pack?: boolean }[];
  subtotalSen: number;
  deliverySen: number;
  totalSen: number;
  paymentType: string | null;
  notified: boolean;
  requests: AdminPayRequest[];
}
export interface AdminOrderList {
  orders: AdminOrder[];
  unnotified: number;
  doublePaid: number;
}
export interface PaymentSettings {
  apiKeySet: boolean;
  saltSet: boolean;
  notifyEmail: string;
  notifyEmailDefault: string;
  deliveryRM: Record<PaySite, string | null>;
  ready: Record<PaySite, boolean>;
  webhookUrl: string;
  liveApi: boolean;
}
export interface PaymentSettingsInput {
  apiKey?: string;
  salt?: string;
  clearKeys?: boolean;
  notifyEmail?: string;
  deliveryRM?: Partial<Record<PaySite, string | null>>;
}

export interface CatalogueProduct {
  id: string;
  kind: 'infused' | 'classic';
  href: Localized;
  name: Localized;
  tagline: Localized;
  image: { name: string; variants: { w: number; url: string }[]; width: number; height: number };
}

// ---------------------------------------------------------------- endpoints

export const api = {
  build: () => get<{ build: string }>('/api/build'),

  // setup + auth
  setupStatus: () => get<{ needsSetup: boolean }>('/api/setup/status', { quiet401: true }),
  setup: (b: { token: string; email: string; name: string; password: string }) =>
    post<AuthResponse>('/api/setup', b, { quiet401: true }),
  me: () => get<AuthResponse>('/api/auth/me', { quiet401: true }),
  login: (email: string, password: string) => post<AuthResponse>('/api/auth/login', { email, password }, { quiet401: true }),
  logout: () => post<unknown>('/api/auth/logout', {}, { quiet401: true }),
  forgot: (email: string) => post<unknown>('/api/auth/forgot', { email }, { quiet401: true }),
  reset: (token: string, password: string) => post<unknown>('/api/auth/reset', { token, password }, { quiet401: true }),
  changePassword: (current: string, next: string) => post<unknown>('/api/auth/password', { current, next }),

  // users
  users: () => get<AdminUser[]>('/api/users'),
  createUser: (b: { email: string; name: string; password: string }) => post<AdminUser>('/api/users', b),
  updateUser: (id: number, b: { name?: string; email?: string; isActive?: boolean; password?: string }) =>
    patch<AdminUser>(`/api/users/${id}`, b),

  // dashboard
  dashboard: () => get<Dashboard>('/api/dashboard'),

  // pages
  pages: (trash = false) => get<PageListItem[]>('/api/pages' + qs({ trash: trash ? 1 : undefined })),
  createPage: (b: { slug: string; title: Localized; doc?: CmsPageDoc }) => post<PagePayload>('/api/pages', b),
  page: (id: number) => get<PagePayload>(`/api/pages/${id}`),
  saveDraft: (id: number, doc: CmsPageDoc, baseVersion: number, force = false) =>
    put<{ version: number; updatedAt: string }>(`/api/pages/${id}/draft`, { doc, baseVersion, force: force || undefined }),
  patchPage: (id: number, b: PagePatch) => patch<PageMeta>(`/api/pages/${id}`, b),
  publish: (id: number, doc: CmsPageDoc, html: Partial<Record<CmsLang, string>>, langs: CmsLang[]) =>
    post<{ publishedAt: string; langs: CmsLang[]; version?: number; skipped?: Partial<Record<CmsLang, string>> }>(`/api/pages/${id}/publish`, {
      doc,
      htmlB64: b64Map(html),
      langs,
      build,
    }),
  unpublish: (id: number) => post<unknown>(`/api/pages/${id}/unpublish`, {}),
  rerender: (id: number, html: Partial<Record<CmsLang, string>>) =>
    post<unknown>(`/api/pages/${id}/html`, { htmlB64: b64Map(html), build }),
  duplicatePage: (id: number) => post<PageListItem>(`/api/pages/${id}/duplicate`, {}),
  trashPage: (id: number) => del<unknown>(`/api/pages/${id}`),
  restorePage: (id: number) => post<unknown>(`/api/pages/${id}/restore`, {}),
  /** permanently delete a page that is in the trash */
  purgePage: (id: number) => post<unknown>(`/api/pages/${id}/purge`, {}),
  revisions: (id: number) => get<PageRevision[]>(`/api/pages/${id}/revisions`),
  restoreRevision: (id: number, rid: number) =>
    post<{ version: number; doc: CmsPageDoc }>(`/api/pages/${id}/revisions/${rid}/restore`, {}),
  dirtyPages: async () => {
    const r = await get<number[] | { ids: number[] }>('/api/pages/dirty');
    return Array.isArray(r) ? r : r.ids;
  },

  // existing pages (site text + photos)
  siteStructure: () => get<SiteStructure>('/api/site/pages'),
  siteKeys: (page: string, lang: CmsLang) => get<SiteKeyItem[]>('/api/site/keys' + qs({ page, lang })),
  /** published override values for both languages — the RenderContext.text of CMS pages */
  publishedText: () => get<Record<CmsLang, Record<string, TextValue>>>('/api/site/text'),
  saveOverrides: (lang: CmsLang, items: OverrideItem[]) => put<unknown>('/api/site/overrides', { lang, items }),
  publishSite: (keys: { lang: CmsLang; key: string }[]) => post<{ publishId: number }>('/api/site/publish', { keys }),
  discardSite: (keys: { lang: CmsLang; key: string }[]) => post<unknown>('/api/site/discard', { keys }),
  sitePending: () => get<PendingOverride[]>('/api/site/pending'),
  /** delete another person's unpublished change (audited) */
  discardOtherDraft: (userId: number, lang: CmsLang, key: string) => post<{ ok: true }>('/api/site/discard-other', { userId, lang, key }),
  siteOrphans: () => get<OrphanOverride[]>('/api/site/orphans'),
  siteRevisions: () => get<SiteRevision[]>('/api/site/revisions'),
  revertSite: (publishId: number) => post<unknown>(`/api/site/revisions/${publishId}/revert`, {}),

  // forms
  forms: () => get<FormListItem[]>('/api/forms'),
  form: (id: number) => get<CmsForm>(`/api/forms/${id}`),
  createForm: (b: FormInput) => post<CmsForm>('/api/forms', b),
  saveForm: (id: number, b: FormInput) => put<CmsForm & { dirtyPages?: number[] }>(`/api/forms/${id}`, b),
  deleteForm: (id: number) => del<unknown>(`/api/forms/${id}`),
  formUsage: (id: number) => get<number[]>(`/api/forms/${id}/usage`),
  testEmail: (id: number) => post<{ sentTo: string[] }>(`/api/forms/${id}/test-email`, {}),

  // inbox
  submissions: (f: { form?: number; page?: number; unread?: boolean; status?: MailStatus | ''; limit?: number; offset?: number }) =>
    get<SubmissionList>('/api/submissions' + qs(f)),
  markSubmission: (id: number, read: boolean) => patch<unknown>(`/api/submissions/${id}`, { read }),
  deleteSubmission: (id: number) => del<unknown>(`/api/submissions/${id}`),
  resendSubmission: (id: number) => post<{ mailStatus: MailStatus; mailError?: string | null }>(`/api/submissions/${id}/resend`, {}),
  exportUrl: (form?: number) => '/api/submissions/export.csv' + qs({ form }),

  // media
  media: () => get<MediaItem[]>('/api/media'),
  uploadMedia: (file: Blob, name: string, onProgress?: (pct: number) => void) => uploadWithProgress(file, name, onProgress),
  updateMedia: (id: number, altEn: string, altMs: string) => patch<MediaItem>(`/api/media/${id}`, { altEn, altMs }),
  deleteMedia: (id: number) => del<unknown>(`/api/media/${id}`),

  catalogue: () => get<CatalogueProduct[]>('/api/catalogue'),

  // system
  health: () => get<Health>('/api/system/health'),
  backupUrl: '/api/system/backup',
  settings: () => get<Settings>('/api/settings'),
  saveSettings: (s: Settings) => post<Settings>('/api/settings', s),

  // orders + payments (FORGE HITPAY)
  orders: (status?: AdminOrderStatus | '') => get<AdminOrderList>('/api/admin/orders' + qs({ status })),
  recheckOrder: (ref: string) => post<AdminOrder>(`/api/admin/orders/${encodeURIComponent(ref)}/recheck`, {}),
  payments: () => get<PaymentSettings>('/api/admin/payments'),
  savePayments: (b: PaymentSettingsInput) => post<PaymentSettings>('/api/admin/payments', b),
  testPayments: () => post<{ ok: boolean; message: string }>('/api/admin/payments/test', {}),
};

function b64Map(html: Partial<Record<CmsLang, string>>): Partial<Record<CmsLang, string>> {
  const out: Partial<Record<CmsLang, string>> = {};
  for (const [k, v] of Object.entries(html) as [CmsLang, string | undefined][]) if (typeof v === 'string') out[k] = toB64(v);
  return out;
}

/** fetch() has no upload progress, so uploads use XHR with the same headers and error shape. */
function uploadWithProgress(file: Blob, name: string, onProgress?: (pct: number) => void): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/media');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');
    if (csrf) xhr.setRequestHeader('X-CSRF-Token', csrf);
    if (build) xhr.setRequestHeader('X-CMS-Build', build);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onerror = () => reject(new ApiError(0, 'network', 'The upload was interrupted. Check your connection and try again.'));
    xhr.onload = () => {
      let data: unknown = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        data = null;
      }
      if (xhr.status >= 200 && xhr.status < 300) return resolve(data as MediaItem);
      const err = (data as { error?: { code?: string; message?: string; fields?: Record<string, string> } } | null)?.error;
      const code = err?.code ?? 'http_' + xhr.status;
      if (xhr.status === 401) onUnauthorized?.();
      if (xhr.status === 409 && code === 'stale_panel') onStalePanel?.();
      reject(
        new ApiError(
          xhr.status,
          code,
          err?.message ?? (xhr.status === 413 ? 'This file is too large (15 MB maximum).' : 'The upload failed (' + xhr.status + ').'),
          err?.fields ?? {}
        )
      );
    };
    const fd = new FormData();
    fd.append('file', file, name);
    xhr.send(fd);
  });
}

/** Media list → MediaRef map for render contexts. */
export function toMediaRef(m: CmsMedia): MediaRef {
  return { id: m.id, width: m.width, height: m.height, variants: m.variants, alt: m.alt };
}

/** Pick the smallest variant at least `w` wide (for thumbnails). */
export function variantUrl(m: { variants: { w: number; url: string }[] } | null | undefined, w = 480): string {
  if (!m || !m.variants?.length) return '';
  const sorted = [...m.variants].sort((a, b) => a.w - b.w);
  return (sorted.find((v) => v.w >= w) ?? sorted[sorted.length - 1]).url;
}

export type { HeadlineWord };
