import type { CtaButton, StoreKey } from '../../../../cms/contracts';
import { createCtaButton, usedFormIds } from '../../../../cms/doc';
import { Field, Select, Switch } from '../../../ui/ui';
import { useBuilder } from '../context';
import { ChoiceField, HideField, ItemList, LinkField, LocField } from './fields';
import { BUTTON_STYLES, changeKind, changeStore, CTA_KIND, KIND_ORDER } from './ctaOps';
import { shortUrl, STORE_KEYS, STORES } from './stores';

/** Up to `max` call-to-action buttons (hero with form, call-to-action band). */
export function CtaButtonsField({ buttons, onChange, max = 3 }: { buttons: CtaButton[]; onChange: (b: CtaButton[]) => void; max?: number }) {
  const { lang, doc } = useBuilder();
  const pageHasForm = usedFormIds(doc).length > 0;
  const replace = (b: CtaButton) => onChange(buttons.map((x) => (x.id === b.id ? b : x)));
  const nextKind = (): CtaButton['kind'] => (['whatsapp', 'form', 'store'] as const).find((k) => !buttons.some((b) => b.kind === k)) ?? 'link';
  return (
    <div className="flex flex-col gap-2">
      <ItemList
        items={buttons}
        onChange={onChange}
        max={max}
        addLabel={buttons.length >= max ? `Up to ${max} buttons` : 'Add a button'}
        make={() => createCtaButton(nextKind())}
        title={(b) => `${b.label[lang] || b.label.en || 'Button'} · ${CTA_KIND[b.kind].short}`}
        render={(b, update) => (
          <>
            <Field label="What the button does">
              <Select value={b.kind} onChange={(e) => replace(changeKind(b, e.target.value as CtaButton['kind']))} aria-label="What the button does">
                {KIND_ORDER.map((k) => (
                  <option key={k} value={k}>
                    {CTA_KIND[k].option}
                  </option>
                ))}
              </Select>
            </Field>
            <LocField label="Button text" value={b.label} onChange={(v) => update({ label: { ...b.label, [lang]: v } })} maxLength={40} />
            {b.kind === 'whatsapp' && (
              <LocField
                label="Message the customer sends"
                value={b.message}
                onChange={(v) => update({ message: { en: b.message?.en ?? '', ms: b.message?.ms ?? '', [lang]: v } })}
                multiline
                maxLength={300}
                hint="Typed for the visitor in WhatsApp — they just press send. The chat goes to the store’s WhatsApp number."
              />
            )}
            {b.kind === 'store' && (
              <Field label="Shop" hint={`Opens ${shortUrl(STORES[b.store ?? 'madinah'].url)} in a new tab.`}>
                <Select value={b.store ?? 'madinah'} onChange={(e) => replace(changeStore(b, e.target.value as StoreKey))} aria-label="Shop">
                  {STORE_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {STORES[k].name}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
            {b.kind === 'link' && (
              <>
                <LinkField value={b.href ?? ''} onChange={(href) => update({ href })} />
                <Switch checked={!!b.newTab} onChange={(newTab) => update({ newTab })} label="Open in a new tab" />
              </>
            )}
            {b.kind === 'form' &&
              (pageHasForm ? (
                <p className="text-xs leading-snug text-muted">Scrolls to the first form on this page.</p>
              ) : (
                <p className="rounded-lg bg-warn-soft px-3 py-2 text-xs leading-snug text-warn">
                  This page has no form yet, so visitors will not see this button. Choose a form in a Hero with form, or add a Form widget.
                </p>
              ))}
            <ChoiceField label="Look" value={b.style} onChange={(style) => update({ style })} options={BUTTON_STYLES} />
            <Field label="Show on devices" hint="Hide just this button on some screens. On phones a landing page already has a WhatsApp + form bar at the bottom.">
              <HideField value={b.hide} onChange={(hide) => update({ hide })} />
            </Field>
          </>
        )}
      />
    </div>
  );
}
