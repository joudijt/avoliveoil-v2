import { useEffect, useRef, useState } from 'react';
import { LuBold, LuHeading2, LuHeading3, LuItalic, LuLink, LuList, LuListOrdered, LuPilcrow, LuRemoveFormatting, LuUnlink } from 'react-icons/lu';
import { sanitizeRichText } from '../../../../cms/sanitize';
import { cx } from '../../../lib/cx';
import { Button, Input } from '../../../ui/ui';
import { linkProblem } from './linkRules';

/**
 * Small rich-text editor for the text widget. contenteditable + execCommand is enough for
 * this tool set; every change goes through the shared allow-list sanitiser, so what is
 * stored is exactly what the server and the public renderer accept.
 */
export function RichText({ value, onChange, placeholder, ariaLabel }: { value: string; onChange: (html: string) => void; placeholder?: string; ariaLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef<string | null>(null);
  const savedRange = useRef<Range | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [urlErr, setUrlErr] = useState<string | null>(null);
  const [active, setActive] = useState<Record<string, boolean>>({});

  // Only overwrite the DOM when the value changed from OUTSIDE (undo, language switch),
  // never while typing — that would throw the caret to the start.
  useEffect(() => {
    if (!ref.current) return;
    if (value !== lastEmitted.current) {
      ref.current.innerHTML = value || '';
      lastEmitted.current = value;
    }
  }, [value]);

  const emit = () => {
    if (!ref.current) return;
    const clean = sanitizeRichText(ref.current.innerHTML);
    lastEmitted.current = clean;
    onChange(clean);
  };

  const refreshActive = () => {
    try {
      const block = String(document.queryCommandValue('formatBlock') || '').toLowerCase();
      setActive({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        ul: document.queryCommandState('insertUnorderedList'),
        ol: document.queryCommandState('insertOrderedList'),
        h2: block === 'h2',
        h3: block === 'h3',
      });
    } catch {
      /* queryCommand* can throw when the selection is outside the editor */
    }
  };

  const run = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
    refreshActive();
  };

  const block = (tag: 'h2' | 'h3' | 'p') => {
    const isOn = active[tag];
    run('formatBlock', isOn && tag !== 'p' ? '<p>' : `<${tag}>`);
  };

  const openLink = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || !ref.current?.contains(sel.anchorNode)) {
      ref.current?.focus();
      return;
    }
    savedRange.current = sel.getRangeAt(0).cloneRange();
    const a = (sel.anchorNode?.parentElement as HTMLElement | null)?.closest('a');
    setUrl(a?.getAttribute('href') ?? '');
    setUrlErr(null);
    setLinkOpen(true);
  };

  const applyLink = () => {
    const p = linkProblem(url);
    if (p) {
      setUrlErr(p);
      return;
    }
    const sel = window.getSelection();
    ref.current?.focus();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
    if (sel && sel.isCollapsed) {
      document.execCommand('insertText', false, url.trim());
      // select what we just typed so it becomes the link text
      const r = sel.getRangeAt(0);
      r.setStart(r.endContainer, Math.max(0, r.endOffset - url.trim().length));
      sel.removeAllRanges();
      sel.addRange(r);
    }
    document.execCommand('createLink', false, url.trim());
    setLinkOpen(false);
    emit();
  };

  const tools: { key: string; label: string; icon: React.ReactNode; on: () => void; activeKey?: string }[] = [
    { key: 'b', label: 'Bold (Ctrl+B)', icon: <LuBold />, on: () => run('bold'), activeKey: 'bold' },
    { key: 'i', label: 'Italic (Ctrl+I)', icon: <LuItalic />, on: () => run('italic'), activeKey: 'italic' },
    { key: 'h2', label: 'Heading', icon: <LuHeading2 />, on: () => block('h2'), activeKey: 'h2' },
    { key: 'h3', label: 'Small heading', icon: <LuHeading3 />, on: () => block('h3'), activeKey: 'h3' },
    { key: 'p', label: 'Normal text', icon: <LuPilcrow />, on: () => block('p') },
    { key: 'ul', label: 'Bullet list', icon: <LuList />, on: () => run('insertUnorderedList'), activeKey: 'ul' },
    { key: 'ol', label: 'Numbered list', icon: <LuListOrdered />, on: () => run('insertOrderedList'), activeKey: 'ol' },
    { key: 'a', label: 'Link', icon: <LuLink />, on: openLink },
    { key: 'ua', label: 'Remove link', icon: <LuUnlink />, on: () => run('unlink') },
    { key: 'x', label: 'Clear formatting', icon: <LuRemoveFormatting />, on: () => run('removeFormat') },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-line-strong bg-white focus-within:border-olive focus-within:ring-2 focus-within:ring-olive/15">
      <div className="flex flex-wrap gap-0.5 border-b border-line bg-sand/60 p-1" role="toolbar" aria-label="Text formatting">
        {tools.map((t) => (
          <button
            key={t.key}
            type="button"
            title={t.label}
            aria-label={t.label}
            aria-pressed={t.activeKey ? !!active[t.activeKey] : undefined}
            onMouseDown={(e) => e.preventDefault()}
            onClick={t.on}
            className={cx('flex h-7 w-7 items-center justify-center rounded text-[15px]', t.activeKey && active[t.activeKey] ? 'bg-olive text-cream' : 'text-muted hover:bg-white hover:text-ink')}
          >
            {t.icon}
          </button>
        ))}
      </div>
      {linkOpen && (
        <div className="flex flex-col gap-1.5 border-b border-line bg-cream p-2">
          <div className="flex gap-1.5">
            <Input
              autoFocus
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlErr(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyLink();
                }
                if (e.key === 'Escape') {
                  e.stopPropagation();
                  setLinkOpen(false);
                }
              }}
              placeholder="/en/shop or https://…"
              invalid={!!urlErr}
              className="h-8"
            />
            <Button size="sm" variant="primary" onClick={applyLink}>
              Add
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setLinkOpen(false)}>
              Cancel
            </Button>
          </div>
          {urlErr && <p className="text-xs text-danger">{urlErr}</p>}
        </div>
      )}
      <div
        ref={ref}
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onKeyUp={refreshActive}
        onMouseUp={refreshActive}
        onPaste={(e) => {
          e.preventDefault();
          const html = e.clipboardData.getData('text/html');
          const text = e.clipboardData.getData('text/plain');
          if (html) document.execCommand('insertHTML', false, sanitizeRichText(html));
          else document.execCommand('insertText', false, text);
          emit();
        }}
        className="avo-rich avo-scroll max-h-[420px] min-h-[140px] overflow-y-auto px-3 py-2.5 text-sm text-ink focus:outline-none empty:before:pointer-events-none empty:before:text-faint empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
