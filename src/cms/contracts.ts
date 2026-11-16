/**
 * CMS contracts — FROZEN before the parallel build (docs/cms/CMS-SPEC.md §4, §12).
 *
 * Shared by three parties that never import each other's internals:
 *   - the PHP backend (server/), which stores and validates these shapes,
 *   - the public site (src/cms/*), which renders them,
 *   - the admin app (src/admin/*), which edits them.
 * Change a shape here only together with server/_lib validation and both UIs.
 */

/** The two site languages. Arabic was removed from the site on 2026-10-01. */
export const CMS_LANGS = ['en', 'ms'] as const;
export type CmsLang = (typeof CMS_LANGS)[number];

/** Every owner-visible text of a new page is stored once per language. */
export type Localized = { en: string; ms: string };

export const emptyLocalized = (): Localized => ({ en: '', ms: '' });

// ---------------------------------------------------------------- page doc

export interface HideOn {
  desktop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
}

export type SectionBg = 'bg' | 'cream' | 'white' | 'olive' | 'olive-dark' | 'image';
export type Pad = 'none' | 's' | 'm' | 'l' | 'xl';
export type Align = 'start' | 'center' | 'end';

export interface SectionSettings {
  layout: 'boxed' | 'full';
  bg: SectionBg;
  /** media id, only when bg === 'image' */
  bgImage?: number;
  /** 0–80, dark overlay over a background image so text stays readable */
  overlay?: number;
  padY: Pad;
  align: Align;
  /** vertical alignment of the columns inside the row */
  valign?: 'start' | 'center' | 'end';
  gap?: 's' | 'm' | 'l';
  /** optional in-page anchor (#id), [a-z0-9-] */
  anchor?: string;
}

export interface Section {
  id: string;
  kind: 'section';
  settings: SectionSettings;
  hide?: HideOn;
  columns: Column[];
}

export interface Column {
  id: string;
  /** desktop width in twelfths; tablet keeps it when ≥ 6, phone always stacks */
  span: number;
  widgets: Widget[];
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type TextColor = 'default' | 'olive' | 'olive-dark' | 'gold' | 'brown' | 'white';
export type ButtonStyle = 'primary' | 'outline' | 'gold' | 'whatsapp';

export interface WidgetBase<T extends string, S> {
  id: string;
  type: T;
  settings: S;
  hide?: HideOn;
}

export type HeadingWidget = WidgetBase<
  'heading',
  { text: Localized; level: HeadingLevel; size: 's' | 'm' | 'l' | 'xl'; align: Align; color: TextColor; kicker?: Localized }
>;
/** html is sanitised rich text (allow-list in spec §4), never raw user HTML */
export type TextWidget = WidgetBase<'text', { html: Localized; align: Align; color: TextColor; size: 's' | 'm' | 'l' }>;
export type ImageWidget = WidgetBase<
  'image',
  {
    media?: number;
    alt: Localized;
    caption?: Localized;
    href?: string;
    ratio: 'auto' | '1/1' | '4/3' | '3/2' | '16/9' | '3/4';
    rounded: boolean;
    align: Align;
    /** max width in px, 0 = full column */
    maxWidth: number;
  }
>;
export type ButtonWidget = WidgetBase<
  'button',
  { label: Localized; href: string; style: ButtonStyle; newTab: boolean; align: Align; size: 's' | 'm' | 'l' }
>;
export type SpacerWidget = WidgetBase<'spacer', { size: Pad }>;
export type DividerWidget = WidgetBase<'divider', { style: 'line' | 'gold' | 'leaf'; width: 's' | 'm' | 'full' }>;
export type VideoWidget = WidgetBase<'video', { url: string; ratio: '16/9' | '4/3' | '1/1' | '9/16'; title: Localized }>;
export type GalleryWidget = WidgetBase<'gallery', { media: number[]; cols: 2 | 3 | 4; ratio: '1/1' | '4/3' | '3/4'; lightbox: boolean }>;
export type IconListWidget = WidgetBase<
  'iconList',
  { items: { id: string; icon: CmsIcon; text: Localized }[]; color: TextColor; layout: 'list' | 'inline' }
>;
export type FaqWidget = WidgetBase<'faq', { items: { id: string; q: Localized; a: Localized }[] }>;
export type ProductsWidget = WidgetBase<'products', { ids: string[]; cols: 2 | 3 | 4; showTagline: boolean }>;
export type FormWidget = WidgetBase<'form', { formId?: number; title?: Localized; style: 'card' | 'plain' }>;
export type QuoteWidget = WidgetBase<'quote', { text: Localized; author: Localized; place?: Localized }>;
export type WhatsappWidget = WidgetBase<'whatsapp', { label: Localized; message: Localized; align: Align }>;

/**
 * A call-to-action button used by the landing widgets (LP-SPEC §3).
 * kind 'whatsapp' → wa.me link with `message`; 'form' → scrolls to the page's first form
 * (anchor #cms-form); 'store' → one of the seller's fixed store URLs; 'link' → `href`
 * (same rules as the button widget: site path, https URL, mailto:, tel:).
 */
export interface CtaButton {
  id: string;
  kind: 'link' | 'whatsapp' | 'form' | 'store';
  label: Localized;
  href?: string;
  store?: StoreKey;
  message?: Localized;
  style: ButtonStyle;
  newTab?: boolean;
  /** hide this one button on some devices (e.g. on phones, where the bottom bar already offers WhatsApp + form) */
  hide?: HideOn;
}

/** The seller's three fixed shop fronts; URLs come from storeFacts.json, never from the doc. */
export type StoreKey = 'madinah' | 'shopee' | 'tiktok';

export type HeroFormWidget = WidgetBase<
  'heroForm',
  {
    kicker?: Localized;
    title: Localized;
    /** a substring of `title` painted gold (per language; ignored when not found) */
    highlight: Localized;
    sub: Localized;
    chips: { id: string; text: Localized }[];
    buttons: CtaButton[];
    /** the form shown in the card on the right (phone: below the copy) */
    formId?: number;
    formTitle: Localized;
    formSub: Localized;
    /** optional background photo + dark overlay 0–80 */
    media?: number;
    overlay: number;
    tone: 'dark' | 'light';
  }
>;
export type CardsWidget = WidgetBase<
  'cards',
  {
    kicker?: Localized;
    title: Localized;
    sub: Localized;
    columns: 2 | 3 | 4;
    items: { id: string; icon: CmsIcon; title: Localized; text: Localized }[];
    media?: number;
    mediaAlt: Localized;
    mediaSide: 'none' | 'left' | 'right';
  }
>;
export type StepsWidget = WidgetBase<
  'steps',
  {
    kicker?: Localized;
    title: Localized;
    sub: Localized;
    items: { id: string; title: Localized; text: Localized }[];
    media?: number;
    mediaAlt: Localized;
  }
>;
export type CtaBandWidget = WidgetBase<
  'ctaBand',
  { icon: CmsIcon | 'none'; title: Localized; sub: Localized; buttons: CtaButton[]; tone: 'olive' | 'dark' | 'gold' | 'cream' }
>;
export type BadgesWidget = WidgetBase<
  'badges',
  { kicker?: Localized; title: Localized; sub: Localized; items: { id: string; icon: CmsIcon; title: Localized; text?: Localized }[] }
>;
export type ReviewsWidget = WidgetBase<
  'reviews',
  {
    kicker?: Localized;
    title: Localized;
    sub?: Localized;
    stats: { id: string; value: Localized; label: Localized }[];
    items: { id: string; quote: Localized; name: Localized; place: Localized }[];
  }
>;
export type StoresWidget = WidgetBase<
  'stores',
  {
    kicker?: Localized;
    title: Localized;
    sub: Localized;
    items: { id: string; store: StoreKey; title: Localized; text: Localized; button: Localized }[];
  }
>;

export type Widget =
  | HeadingWidget
  | TextWidget
  | ImageWidget
  | ButtonWidget
  | SpacerWidget
  | DividerWidget
  | VideoWidget
  | GalleryWidget
  | IconListWidget
  | FaqWidget
  | ProductsWidget
  | FormWidget
  | QuoteWidget
  | WhatsappWidget
  | HeroFormWidget
  | CardsWidget
  | StepsWidget
  | CtaBandWidget
  | BadgesWidget
  | ReviewsWidget
  | StoresWidget;

export type WidgetType = Widget['type'];

export const WIDGET_TYPES: WidgetType[] = [
  'heading',
  'text',
  'image',
  'button',
  'spacer',
  'divider',
  'video',
  'gallery',
  'iconList',
  'faq',
  'products',
  'form',
  'quote',
  'whatsapp',
  'heroForm',
  'cards',
  'steps',
  'ctaBand',
  'badges',
  'reviews',
  'stores',
];

/** Icon names available to the icon list (mapped to react-icons in the renderer). */
export const CMS_ICONS = [
  'check', 'leaf', 'olive', 'drop', 'medal', 'star', 'truck', 'shield', 'heart', 'phone', 'mail', 'pin', 'clock',
  // added 2026-10-02 for the landing sections (docs/cms/LP-SPEC.md)
  'whatsapp', 'store', 'gift', 'hand', 'sun', 'award', 'users', 'globe', 'bottle', 'chat',
] as const;
export type CmsIcon = (typeof CMS_ICONS)[number];

export interface PageSeo {
  metaTitle: Localized;
  metaDescription: Localized;
  /** media id of the share image; falls back to the site OG card */
  ogImage?: number;
}

export interface CmsPageDoc {
  /** bumped when the shape changes; renderer refuses unknown majors */
  schema: 1;
  /**
   * 'site' (default/missing) = full site header, breadcrumb, footer.
   * 'landing' = minimal ad-landing chrome: logo + language + WhatsApp header, no menu, no
   * breadcrumb, short footer, phone bottom bar (LP-SPEC §2). Optional so old docs stay valid.
   */
  layout?: 'site' | 'landing';
  title: Localized;
  /**
   * Optional short link text for the header/footer menus (≤ 20 characters per language).
   * Empty or missing = the title is used. Optional so docs saved before it stay valid.
   */
  menuLabel?: Localized;
  seo: PageSeo;
  sections: Section[];
}

// ---------------------------------------------------------------- media

export interface MediaVariant {
  w: number;
  url: string;
}

export interface CmsMedia {
  id: number;
  width: number;
  height: number;
  /** ascending widths, every url is /uploads/cms/… webp */
  variants: MediaVariant[];
  alt: Localized;
  originalName: string;
  bytes: number;
  createdAt: string;
}

/** The subset of media the public renderer needs, embedded in boot/page payloads. */
export interface MediaRef {
  id: number;
  width: number;
  height: number;
  variants: MediaVariant[];
  alt: Localized;
  /** JPEG copy (at most 1200 px wide) used as og:image; absent only if GD could not write it */
  og?: { url: string; width: number; height: number };
}

// ---------------------------------------------------------------- forms

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'date';

export interface FormField {
  id: string;
  /** stable machine name, [a-z0-9_], unique in the form; used as the POST key */
  name: string;
  type: FormFieldType;
  label: Localized;
  placeholder: Localized;
  required: boolean;
  width: 'full' | 'half';
  /** select / radio only */
  options?: { id: string; label: Localized }[];
  maxLength?: number;
}

export interface CmsFormDef {
  fields: FormField[];
  submitLabel: Localized;
  successMessage: Localized;
  /**
   * Optional same-site page to send the visitor to after success. Must match
   * FORM_REDIRECT_RE (an /en or /ms path on this site) — validated client AND server,
   * never a full URL (open-redirect guard, review #14).
   */
  redirectPath?: string;
}

export const FORM_REDIRECT_RE = /^\/(en|ms)(\/[a-z0-9]+(?:-[a-z0-9]+)*){0,3}$/;

export interface CmsForm {
  id: number;
  name: string;
  /** 1–5 addresses */
  recipients: string[];
  subject: string;
  def: CmsFormDef;
  createdAt: string;
  updatedAt: string;
}

/** What the public renderer needs to draw a form (no recipients — never exposed publicly). */
export interface PublicForm {
  id: number;
  def: CmsFormDef;
}

/** Honeypot input name; must stay empty. */
export const FORM_HONEYPOT = 'company_website';

/** Anchor id of the first form on a CMS page; CtaButton kind 'form' scrolls here. */
export const FORM_ANCHOR = 'cms-form';

// ---------------------------------------------------------------- boot payload

export interface MenuItem {
  slug: string;
  label: string;
  order: number;
}

/** Image override for an existing-page photo spot (`cmsKey`). */
export interface ImageOverride {
  media: MediaRef;
  alt: string;
  /** optional focal point in percent (object-position), default 50/50 */
  focal?: { x: number; y: number };
}

/** The hero headline is edited as ONE value: an ordered list of words, each gold or not. */
export interface HeadlineWord {
  text: string;
  gold: boolean;
}

/**
 * A published text override value: a string for normal keys, a number for numeric
 * leaves (statistics values), HeadlineWord[] for the whole-array key `hero.headlineWords`.
 */
export type TextValue = string | number | HeadlineWord[];

/** Keys whose override replaces a whole array (edited by a dedicated dialog). */
export const WHOLE_ARRAY_KEYS = ['hero.headlineWords'] as const;

/** Head data for a CMS page, resolved ONCE by the server and used by both PHP and SEO.tsx. */
export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  robots: 'index, follow' | 'noindex, follow';
  /** lang → absolute URL, only for the languages the page is published in */
  alternates: Partial<Record<CmsLang, string>>;
  ogImage: { url: string; width: number; height: number };
  /** extra JSON-LD objects: WebPage, FAQPage, and BreadcrumbList for site-layout pages only (landing pages show no breadcrumb) */
  jsonLd: object[];
}

/**
 * Injected by server/serve.php into every HTML response as
 * <script id="cms-boot" type="application/json">…</script>. Absent during the
 * build-time prerender and on the static fallback — every consumer must treat
 * a missing boot as "no CMS data" and render the built-in content.
 */
export interface CmsBoot {
  /** content version (bumped on every publish) */
  v: number;
  /** build id of the frontend the server snapshot came from */
  build: string;
  lang: CmsLang;
  /**
   * i18n key → value for BOTH languages (client-side navigation and the language
   * switcher never reload, so the other language must be present too — review #1).
   * Already filtered by the server against the current defaults (no orphan keys).
   * Published values, or draft values in edit mode.
   */
  text: Record<CmsLang, Record<string, TextValue>>;
  /** image spot key → override, per language (alt differs) */
  images: Record<CmsLang, Record<string, ImageOverride>>;
  /** menu labels are per language; a page appears only in the languages it is published in */
  menu: Record<CmsLang, { header: MenuItem[]; footer: MenuItem[] }>;
  /** present only on a CMS page route */
  page?: PublicPagePayload;
  /** in-place edit mode for an existing page (admin session + ?cms-edit=1) */
  edit?: boolean;
  /** draft preview of a CMS page (admin session + ?cms-preview=1) */
  preview?: boolean;
}

/** A published (or previewed) CMS page as the public renderer receives it. */
export interface PublicPagePayload {
  id: number;
  slug: string;
  lang: CmsLang;
  /** languages this page is published in (the switcher only offers these) */
  langs: CmsLang[];
  doc: CmsPageDoc;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
  seo: ResolvedSeo;
}

/**
 * GET /api/public/page?slug=&lang= → PublicPagePayload | 404.
 * Used when a CMS page is reached by client-side navigation (no boot page in the HTML).
 */
export const PUBLIC_PAGE_ENDPOINT = '/api/public/page';

/**
 * Publish-time HTML rendering (spec §5): implemented in src/cms/render.tsx (public side),
 * called by the admin with the page doc and the language context. Returns the inner HTML
 * of <main data-cms-page-root>. Synchronous; blocks must not lazy-load.
 */
export interface RenderContext {
  lang: CmsLang;
  media: Record<string, MediaRef>;
  forms: Record<string, PublicForm>;
  /** current published site text for this language (product names etc.) */
  text: Record<string, TextValue>;
}

// ---------------------------------------------------------------- slugs

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RESERVED_SLUGS = [
  'products',
  'shop',
  'why-us',
  'contact',
  'blog',
  'admin',
  'api',
  'assets',
  'uploads',
  'fonts',
  'icons',
  'og',
  'ar',
  'en',
  'ms',
  '__cms-template',
  '__cms-template-landing',
  'sitemap',
  'robots',
  'index',
  'cms-template',
  // /<lang>/order/paid = the HitPay return page (FORGE HITPAY R14)
  'order',
] as const;

export function slugProblem(slug: string): string | null {
  if (slug.length < 2 || slug.length > 80) return 'Use 2–80 characters.';
  if (!SLUG_RE.test(slug)) return 'Use lowercase letters, numbers and single hyphens only.';
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) return 'This address is already used by the site.';
  if (slug.includes('cms-template')) return 'This address is reserved by the control panel.';
  return null;
}

// ---------------------------------------------------------------- builder canvas protocol

/**
 * The builder shell (src/admin) and its canvas iframe (/admin/canvas, rendered by
 * src/cms) talk only through window.postMessage with these messages. Both sides
 * MUST check event.origin === window.location.origin and event.source.
 */
export type DropTarget = { columnId: string; index: number } | { sectionIndex: number };

export type ShellToCanvas =
  | { type: 'cms:doc'; doc: CmsPageDoc; lang: CmsLang; media: Record<string, MediaRef>; forms: Record<string, PublicForm>; selectedId: string | null }
  | { type: 'cms:select'; id: string | null }
  | { type: 'cms:drag-start'; payload: DragPayload }
  | { type: 'cms:drag-end' };

export type DragPayload =
  | { kind: 'new-widget'; widgetType: WidgetType }
  | { kind: 'new-section'; templateId: string }
  | { kind: 'move'; id: string };

export type CanvasToShell =
  | { type: 'cms:ready' }
  | { type: 'cms:select'; id: string | null }
  | { type: 'cms:inline-text'; widgetId: string; field: string; lang: CmsLang; value: string }
  | { type: 'cms:drop'; payload: DragPayload; target: DropTarget }
  | { type: 'cms:action'; id: string; action: 'duplicate' | 'delete' | 'up' | 'down' | 'add-section-after' | 'add-widget' }
  | { type: 'cms:height'; px: number };

/** Existing-page in-place editing: real page iframe (?cms-edit=1) ⇄ admin shell. */
export type EditPageToShell =
  | { type: 'ov:ready'; keys: string[]; imageKeys: string[]; path: string }
  | { type: 'ov:text'; key: string; value: TextValue }
  | { type: 'ov:image-click'; key: string }
  | { type: 'ov:focus'; key: string };

export type ShellToEditPage =
  | { type: 'ov:set-text'; key: string; value: TextValue }
  | { type: 'ov:set-image'; key: string; override: ImageOverride | null }
  | { type: 'ov:highlight'; key: string | null };
