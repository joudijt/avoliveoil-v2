import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { FormField, FormWidget, PublicForm } from '../contracts';
import { FORM_ANCHOR, FORM_HONEYPOT, FORM_REDIRECT_RE } from '../contracts';
import { FORM, FORM_ANCHOR_CLS, cx } from './classes';
import { fieldAttr, useBlockEnv, type BlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { ui } from './strings';
import { placeholderAttr, shown } from './text';

/** Focus without the browser's edge scroll, then bring the element to the middle of the screen. */
function reveal(el: HTMLElement | null) {
  if (!el) return;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/** POST target of a form; the no-JS fallback posts urlencoded to the same URL. */
function formAction(id: number): string {
  return `/api/forms/${id}/submit`;
}

/**
 * A form built in the panel. Works in two ways:
 *  - without JavaScript (published HTML, crawlers): a normal urlencoded POST to
 *    /api/forms/<id>/submit, the server answers 303 back to the page (#form-sent);
 *  - with JavaScript: fetch POST JSON {fields, page, lang, company_website, elapsedMs},
 *    the visitor stays on the page and sees the success message or the field errors.
 * The honeypot `company_website` is positioned off-screen (not display:none, which
 * some bots skip) and hidden from assistive tech.
 */
export function FormBlock({ w }: { w: FormWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const form = s.formId ? env.forms[String(s.formId)] : undefined;
  if (!form || !Array.isArray(form.def?.fields)) {
    return env.mode === 'canvas' ? <CanvasEmpty label="Form — choose a form in the settings panel" /> : null;
  }
  const title = shown(env, s.title, '');
  const card = s.style !== 'plain';
  // A card has its own light background, whatever the section behind it.
  const tone = card ? 'light' : env.tone;
  const anchor = env.formAnchor === w.id;
  return (
    <div id={anchor ? FORM_ANCHOR : undefined} className={cx(card ? FORM.card : FORM.plain, anchor && FORM_ANCHOR_CLS)}>
      {title.text ? (
        <h2 className={FORM.title[tone]} {...fieldAttr(env, 'title')} {...placeholderAttr(title)}>
          {title.text}
        </h2>
      ) : null}
      <FormBody form={form} widgetId={w.id} env={env} tone={tone} afterTitle={!!title.text} />
    </div>
  );
}

/**
 * The form itself (fields, states, no-JS fallback), shared by the form widget and the
 * heroForm card. Every id is keyed by the WIDGET id, so the same form placed twice on
 * one page never produces duplicate ids (LP-SPEC §8 M3).
 */
export function FormBody({ form, widgetId, env, tone, afterTitle }: { form: PublicForm; widgetId: string; env: BlockEnv; tone: 'light' | 'dark'; afterTitle: boolean }) {
  const { lang } = env;
  const def = form.def;
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  // With JavaScript the server's field errors (in the page's language) are shown, so the
  // browser's own bubbles — always in the browser's language, English on a BM page — are
  // switched off. Set after mount only: the published no-JS HTML keeps native validation.
  const [js, setJs] = useState(false);
  useEffect(() => setJs(true), []);
  const idFor = (f: FormField) => `cmsf-${widgetId}-${f.name}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    // Centre it: a plain focus() scrolls it to the top edge, under the site's fixed header,
    // and the visitor sees the form vanish with no thank-you.
    if (status.kind === 'sent') reveal(successRef.current);
  }, [status.kind]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (env.mode === 'canvas' || status.kind === 'sending') return;
    const el = e.currentTarget;
    const data = new FormData(el);
    const fields: Record<string, string> = {};
    for (const f of def.fields) {
      if (f.type === 'checkbox') fields[f.name] = data.get(f.name) ? 'yes' : '';
      else fields[f.name] = String(data.get(f.name) ?? '').trim();
    }
    setStatus({ kind: 'sending' });
    setErrors({});
    try {
      const res = await fetch(formAction(form.id), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          fields,
          page: env.pageId ?? null,
          lang,
          [FORM_HONEYPOT]: String(data.get(FORM_HONEYPOT) ?? ''),
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
        }),
      });
      if (res.ok) {
        const target = def.redirectPath;
        if (target && FORM_REDIRECT_RE.test(target)) {
          window.location.assign(target);
          return;
        }
        setStatus({ kind: 'sent' });
        return;
      }
      if (res.status === 429) {
        setStatus({ kind: 'error', message: ui(lang, 'tooMany') });
        return;
      }
      let body: { error?: { message?: string; fields?: Record<string, string> } } = {};
      try {
        body = await res.json();
      } catch {
        // non-JSON error page (WAF, proxy) — fall through to the generic message
      }
      const fieldErrors = body.error?.fields ?? {};
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        setStatus({ kind: 'error', message: ui(lang, 'checkFields') });
        const first = def.fields.find((f) => fieldErrors[f.name]);
        if (first) reveal(el.querySelector<HTMLElement>(`#${CSS.escape(idFor(first))}`));
        return;
      }
      setStatus({ kind: 'error', message: ui(lang, 'failed') });
    } catch {
      setStatus({ kind: 'error', message: ui(lang, 'failed') });
    }
  };

  if (status.kind === 'sent') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className={cx(FORM.success, afterTitle && FORM.formAfterTitle)}>
        {def.successMessage?.[lang] || def.successMessage?.en}
      </div>
    );
  }

  const sending = status.kind === 'sending';
  return (
    <>
      {/* Without JavaScript the server answers 303 back to #form-sent-<widget> / #form-error-<widget>
          (it reads the hidden _widget field): shown by :target. */}
      <p id={`form-sent-${widgetId}`} role="status" className={cx(FORM.noJsSent, afterTitle && FORM.formAfterTitle)}>
        {def.successMessage?.[lang] || def.successMessage?.en}
      </p>
      <p id={`form-error-${widgetId}`} role="alert" className={cx(FORM.noJsError, afterTitle && FORM.formAfterTitle)}>
        {ui(lang, 'notSent')}
      </p>
      <form action={formAction(form.id)} method="post" noValidate={js} className={cx(FORM.form, afterTitle && FORM.formAfterTitle)} onSubmit={onSubmit}>
        <input type="hidden" name="_page" value={env.pageId !== undefined ? String(env.pageId) : ''} />
        <input type="hidden" name="_lang" value={lang} />
        <input type="hidden" name="_widget" value={widgetId} />
        <div className={FORM.honeypot} aria-hidden="true">
          <label htmlFor={`cmsf-${widgetId}-${FORM_HONEYPOT}`}>{ui(lang, 'honeypot')}</label>
          <input id={`cmsf-${widgetId}-${FORM_HONEYPOT}`} type="text" name={FORM_HONEYPOT} tabIndex={-1} autoComplete="off" />
        </div>
        <div className={FORM.grid}>
          {def.fields.map((f) => (
            <Field key={f.id} f={f} id={idFor(f)} env={env} tone={tone} error={errors[f.name]} />
          ))}
        </div>
        <div className={FORM.submitWrap}>
          <button type="submit" className={FORM.submit} disabled={sending}>
            {sending ? ui(lang, 'sending') : def.submitLabel?.[lang] || def.submitLabel?.en || 'Send'}
          </button>
          {status.kind === 'error' ? (
            <p className={FORM.alert} role="alert">
              {status.message}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}

function Field({ f, id, env, tone, error }: { f: FormField; id: string; env: BlockEnv; tone: 'light' | 'dark'; error?: string }) {
  const { lang } = env;
  const label = f.label?.[lang] || f.label?.en || f.name;
  const placeholder = f.placeholder?.[lang] || undefined;
  const errId = `${id}-error`;
  const aria = error ? { 'aria-invalid': true as const, 'aria-describedby': errId } : {};
  const maxLength = f.maxLength && f.maxLength > 0 ? f.maxLength : f.type === 'textarea' ? 5000 : 2000;
  const req = f.required ? (
    <span className={FORM.required} aria-hidden="true">
      {' *'}
    </span>
  ) : null;
  const err = error ? (
    <p id={errId} className={FORM.error}>
      {error}
    </p>
  ) : null;
  const wrap = cx(FORM.field, FORM.width[f.width === 'half' ? 'half' : 'full']);

  if (f.type === 'checkbox') {
    return (
      <div className={wrap}>
        <label className={FORM.choice[tone]} htmlFor={id}>
          <input id={id} type="checkbox" name={f.name} value="yes" required={f.required} className={FORM.choiceInput} {...aria} />
          <span>
            {label}
            {req}
          </span>
        </label>
        {err}
      </div>
    );
  }

  if (f.type === 'radio') {
    return (
      <fieldset className={cx(wrap, FORM.fieldset)} {...(error ? { 'aria-describedby': errId } : {})}>
        <legend className={FORM.legend[tone]}>
          {label}
          {req}
        </legend>
        <div className={FORM.choices}>
          {(f.options ?? []).map((o, i) => (
            <label key={o.id} className={FORM.choice[tone]} htmlFor={`${id}-${i}`}>
              <input id={`${id}-${i}`} type="radio" name={f.name} value={o.id} required={f.required} className={FORM.choiceInput} />
              <span>{o.label?.[lang] || o.label?.en}</span>
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  let control;
  if (f.type === 'textarea') {
    control = <textarea id={id} name={f.name} rows={5} required={f.required} maxLength={maxLength} placeholder={placeholder} className={cx(FORM.input, FORM.textarea)} {...aria} />;
  } else if (f.type === 'select') {
    control = (
      // No defaultValue/disabled: an empty first option of a required select is the
      // HTML "placeholder label option" — it shows first and fails validation on its own.
      <select id={id} name={f.name} required={f.required} className={FORM.input} {...aria}>
        <option value="">
          {placeholder || ui(lang, 'choose')}
        </option>
        {(f.options ?? []).map((o) => (
          <option key={o.id} value={o.id}>
            {o.label?.[lang] || o.label?.en}
          </option>
        ))}
      </select>
    );
  } else {
    const type = f.type === 'email' || f.type === 'tel' || f.type === 'number' || f.type === 'date' ? f.type : 'text';
    const auto = f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : f.name === 'name' ? 'name' : undefined;
    control = (
      <input
        id={id}
        type={type}
        name={f.name}
        required={f.required}
        maxLength={type === 'number' || type === 'date' ? undefined : maxLength}
        placeholder={placeholder}
        autoComplete={auto}
        inputMode={f.type === 'tel' ? 'tel' : undefined}
        className={FORM.input}
        {...aria}
      />
    );
  }
  return (
    <div className={wrap}>
      <label htmlFor={id} className={FORM.label[tone]}>
        {label}
        {req}
      </label>
      {control}
      {err}
    </div>
  );
}
