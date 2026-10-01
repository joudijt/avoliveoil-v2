/**
 * In-place text editing on the builder canvas. contentEditable is fine HERE (the
 * canvas is canvas-owned markup, unlike the live site's React nodes): the edited
 * widget is remounted after every edit, so React never reconciles a DOM the
 * browser mutated.
 *
 *  - plain fields (heading, button label, quote, FAQ q/a, list item…): plain text,
 *    Enter = done, Esc = cancel, paste = plain text.
 *  - the text widget (field `html`): rich text with the floating toolbar, Enter =
 *    done, Shift+Enter = line break; the HTML is sanitised before it is sent.
 */
import { sanitizeRichText } from '../sanitize';

export interface InlineOptions {
  rich: boolean;
  onCommit: (value: string) => void;
  onCancel: () => void;
}

export interface InlineHandle {
  el: HTMLElement;
  rich: boolean;
  commit: () => void;
  cancel: () => void;
  /** run fn without the blur it causes committing the edit (link prompt) */
  withoutBlur: (fn: () => void) => void;
}

function selectAll(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

export function beginInlineEdit(el: HTMLElement, opts: InlineOptions): InlineHandle {
  const original = el.innerHTML;
  let done = false;
  let ignoreBlur = false;

  if (el.hasAttribute('data-cms-placeholder')) {
    el.removeAttribute('data-cms-placeholder');
    el.innerHTML = opts.rich ? '<p><br></p>' : '';
  }
  el.setAttribute('data-cms-editing', '');
  if (opts.rich) el.contentEditable = 'true';
  else {
    el.contentEditable = 'plaintext-only';
    if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
  }
  el.spellcheck = true;
  el.focus({ preventScroll: true });
  selectAll(el);

  const finish = () => {
    done = true;
    el.removeEventListener('keydown', onKey);
    el.removeEventListener('paste', onPaste);
    el.removeEventListener('drop', onDrop);
    el.removeEventListener('blur', onBlur);
    el.removeAttribute('contenteditable');
    el.removeAttribute('data-cms-editing');
    window.getSelection()?.removeAllRanges();
  };

  const commit = () => {
    if (done) return;
    const value = opts.rich ? sanitizeRichText(el.innerHTML) : (el.textContent ?? '').replace(/\s+/g, ' ').trim();
    finish();
    opts.onCommit(value);
  };

  const cancel = () => {
    if (done) return;
    el.innerHTML = original;
    finish();
    opts.onCancel();
  };

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      cancel();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (opts.rich && e.shiftKey) document.execCommand('insertLineBreak');
      else commit();
    }
  }

  function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    let text = e.clipboardData?.getData('text/plain') ?? '';
    if (!opts.rich) text = text.replace(/\s*\n\s*/g, ' ');
    document.execCommand('insertText', false, text);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
  }

  function onBlur() {
    if (!ignoreBlur) commit();
  }

  el.addEventListener('keydown', onKey);
  el.addEventListener('paste', onPaste);
  el.addEventListener('drop', onDrop);
  el.addEventListener('blur', onBlur);

  return {
    el,
    rich: opts.rich,
    commit,
    cancel,
    withoutBlur(fn) {
      const sel = window.getSelection();
      const saved = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
      ignoreBlur = true;
      try {
        fn();
      } finally {
        if (!done) {
          el.focus({ preventScroll: true });
          if (saved) {
            sel?.removeAllRanges();
            sel?.addRange(saved);
          }
        }
        ignoreBlur = false;
      }
    },
  };
}

export type RichCommand = 'bold' | 'italic' | 'link' | 'list' | 'h2' | 'h3';

/** Applies a toolbar command to the current selection inside the edited text widget. */
export function runRichCommand(handle: InlineHandle, cmd: RichCommand): void {
  switch (cmd) {
    case 'bold':
    case 'italic':
      document.execCommand(cmd);
      return;
    case 'list':
      document.execCommand('insertUnorderedList');
      return;
    case 'h2':
    case 'h3': {
      const current = String(document.queryCommandValue('formatBlock') || '').toLowerCase();
      document.execCommand('formatBlock', false, current === cmd ? '<p>' : `<${cmd}>`);
      return;
    }
    case 'link': {
      handle.withoutBlur(() => {
        const url = window.prompt('Link address — a page on this site (/en/contact), https://…, mailto: or tel:', 'https://');
        if (url === null) return;
        const trimmed = url.trim();
        if (!trimmed || trimmed === 'https://') {
          document.execCommand('unlink');
          return;
        }
        // Accept only what the sanitiser keeps; anything else would silently vanish on save.
        if (!/^(https?:\/\/[^/\s]+|\/(?!\/)|#|mailto:|tel:)/i.test(trimmed)) {
          window.alert('That link is not allowed. Use a page on this site (/en/…), an https:// address, mailto: or tel:.');
          return;
        }
        document.execCommand('createLink', false, trimmed);
      });
      return;
    }
  }
}

/** Which toolbar buttons are active for the current selection. */
export function richState(): Record<RichCommand, boolean> {
  const block = String(document.queryCommandValue('formatBlock') || '').toLowerCase();
  let inLink = false;
  const node = window.getSelection()?.anchorNode;
  const el = node && (node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement);
  if (el?.closest('a')) inLink = true;
  return {
    bold: document.queryCommandState('bold'),
    italic: document.queryCommandState('italic'),
    list: document.queryCommandState('insertUnorderedList'),
    link: inLink,
    h2: block === 'h2',
    h3: block === 'h3',
  };
}
