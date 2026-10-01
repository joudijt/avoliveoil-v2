/**
 * The seven landing widgets (LP-SPEC §3, §8): the Aircon Hero landing structure in
 * the olive brand. Same rules as every other block — literal class maps only
 * (classes.ts), no lazy parts, identical markup for React, the canvas (plus
 * data-cms-field hooks) and renderPageHtml.
 */
import type { ReactNode } from 'react';
import type { BadgesWidget, CardsWidget, CmsIcon, CtaBandWidget, HeroFormWidget, Localized, ReviewsWidget, StepsWidget, StoresWidget } from '../contracts';
import { FORM_ANCHOR } from '../contracts';
import { mediaFor, srcSetOf, widestUrl } from '../media';
import { BADGES, BAND, CARDS, CTA, FORM_ANCHOR_CLS, HERO, LP_HEAD, REVIEWS, STEPS, STORES, cx, type BandTone, type Tone } from './classes';
import { fieldAttr, useBlockEnv, type BlockEnv } from './context';
import { CanvasEmpty } from './CanvasEmpty';
import { CtaButtons } from './CtaButtons';
import { STORE_ICONS, STORE_URLS, isStoreKey } from './cta';
import { FormBody } from './FormBlock';
import { ArrowRightIcon, CMS_ICON_COMPONENTS } from './icons';
import { placeholderAttr, shown, type ShownText } from './text';

// ---------------------------------------------------------------- shared

function iconFor(name: CmsIcon | 'none' | undefined) {
  return name && name !== 'none' ? (CMS_ICON_COMPONENTS[name] ?? CMS_ICON_COMPONENTS.check) : null;
}

/** Overlay strength in tens, 0–80. */
function overlayStep(v: number | undefined): number {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : 50;
  return Math.min(80, Math.max(0, Math.round(n / 10) * 10));
}

/** Decorative olive sprig, drawn at a few percent opacity behind dark heroes and bands. */
function OliveSprig({ className }: { className: string }) {
  const leaves: [number, number, number][] = [
    [38, 150, -95],
    [58, 176, 5],
    [70, 116, -95],
    [92, 142, 5],
    [104, 82, -95],
    [126, 108, 5],
    [138, 48, -95],
    [160, 74, 5],
    [176, 22, -60],
  ];
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M18 196C64 148 112 96 186 14" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      {leaves.map(([cx, cy, a]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={24} ry={5.5} transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
      <ellipse cx={84} cy={166} rx={7} ry={9} transform="rotate(-30 84 166)" />
      <ellipse cx={150} cy={98} rx={7} ry={9} transform="rotate(-30 150 98)" />
    </svg>
  );
}

/** Kicker + h2 + sub on top of a landing section; nothing at all when all three are empty. */
function SectionHead({ env, tone, kicker, title, sub }: { env: BlockEnv; tone: Tone; kicker?: Localized; title?: Localized; sub?: Localized }) {
  const k = shown(env, kicker, '');
  const t = shown(env, title, 'Section title');
  const s = shown(env, sub, '');
  if (!k.text && !t.text && !s.text) return null;
  return (
    <div className={LP_HEAD.wrap[env.align] ?? LP_HEAD.wrap.start}>
      {k.text ? (
        <p className={LP_HEAD.kicker[tone]} {...fieldAttr(env, 'kicker')} {...placeholderAttr(k)}>
          {k.text}
        </p>
      ) : null}
      {t.text ? (
        <h2 className={LP_HEAD.title[tone]} {...fieldAttr(env, 'title')} {...placeholderAttr(t)}>
          {t.text}
        </h2>
      ) : null}
      {s.text ? (
        <p className={LP_HEAD.sub[tone]} {...fieldAttr(env, 'sub')} {...placeholderAttr(s)}>
          {s.text}
        </p>
      ) : null}
    </div>
  );
}

/** Field text with its canvas hooks, or nothing when empty. */
function Txt({ env, as: Tag, className, path, text }: { env: BlockEnv; as: 'p' | 'h2' | 'h3' | 'span'; className: string; path: string; text: ShownText }) {
  if (!text.text) return null;
  return (
    <Tag className={className} {...fieldAttr(env, path)} {...placeholderAttr(text)}>
      {text.text}
    </Tag>
  );
}

/** A photo beside cards / steps: object-cover in a rounded frame, lazy. */
function SidePhoto({ env, id, alt, figure, img, sizes }: { env: BlockEnv; id: number | undefined; alt: Localized | undefined; figure: string; img: string; sizes: string }) {
  const media = mediaFor(env.media, id);
  if (!media) return null;
  const text = alt?.[env.lang]?.trim() || media.alt?.[env.lang]?.trim() || '';
  return (
    <figure className={figure}>
      <img src={widestUrl(media.variants)} srcSet={srcSetOf(media.variants)} sizes={sizes} width={media.width} height={media.height} alt={text} loading="lazy" decoding="async" className={img} />
    </figure>
  );
}

/** The surface shape of a hero/band: edge to edge (lead or bleed) or a rounded panel inside a padded section. */
function shapeOf(env: BlockEnv, id: string, shapes: { lead: string; bleed: string; boxed: string }): { cls: string; lead: boolean } {
  const lead = env.leadId === id;
  return { cls: lead ? shapes.lead : env.bleed ? shapes.bleed : shapes.boxed, lead };
}

// ---------------------------------------------------------------- heroForm

export function HeroFormBlock({ w }: { w: HeroFormWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone: Tone = s.tone === 'light' ? 'light' : 'dark';
  const { cls: shape, lead } = shapeOf(env, w.id, HERO.shape);
  const form = s.formId ? env.forms[String(s.formId)] : undefined;
  const formOk = !!form && Array.isArray(form.def?.fields);
  const canvas = env.mode === 'canvas';
  const showCard = formOk || canvas;
  const media = tone === 'dark' ? mediaFor(env.media, s.media) : null;
  const overlay = media ? HERO.overlay[overlayStep(s.overlay)] : '';
  const anchor = formOk && env.formAnchor === w.id;

  const kicker = shown(env, s.kicker, '');
  const title = shown(env, s.title, 'Your headline');
  const sub = shown(env, s.sub, '');
  const formTitle = shown(env, s.formTitle, '');
  const formSub = shown(env, s.formSub, '');
  const chips = (s.chips ?? []).slice(0, 6).map((c, i) => ({ c, i, text: shown(env, c.text, 'Point') })).filter((x) => x.text.text);
  const Check = CMS_ICON_COMPONENTS.check;

  // The highlight is painted gold where it occurs in the title (exact, case-sensitive,
  // first occurrence); not found → the whole title stays plain.
  const hl = title.placeholder ? '' : (s.highlight?.[env.lang] ?? '');
  const at = hl ? title.text.indexOf(hl) : -1;
  let heading: ReactNode = title.text;
  if (at >= 0) {
    heading = (
      <>
        {title.text.slice(0, at)}
        <span className={HERO.gold[tone]}>{hl}</span>
        {title.text.slice(at + hl.length)}
      </>
    );
  }

  return (
    <div className={cx(HERO.root[tone], shape)} {...(lead && tone === 'dark' ? { 'data-cms-dark-top': '' } : {})}>
      {media ? (
        <img
          src={widestUrl(media.variants)}
          srcSet={srcSetOf(media.variants)}
          sizes="100vw"
          width={media.width}
          height={media.height}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className={HERO.media}
        />
      ) : null}
      {media && overlay ? <div className={overlay} aria-hidden="true" /> : null}
      {media ? <div className={HERO.shade} aria-hidden="true" /> : <OliveSprig className={HERO.leaves[tone]} />}
      <div className={HERO.inner}>
        <div className={HERO.copy[showCard ? 'card' : 'alone']}>
          <Txt env={env} as="p" className={HERO.kicker[tone]} path="kicker" text={kicker} />
          {title.text ? (
            <h1 className={HERO.title[tone]} {...fieldAttr(env, 'title')} {...placeholderAttr(title)}>
              {heading}
            </h1>
          ) : null}
          <Txt env={env} as="p" className={HERO.sub[tone]} path="sub" text={sub} />
          <CtaButtons buttons={s.buttons} styles={CTA.style[tone]} className={HERO.buttons} />
          {chips.length ? (
            <ul className={HERO.chips}>
              {chips.map(({ c, i, text }) => (
                <li key={c.id} className={HERO.chip[tone]}>
                  <Check className={HERO.chipIcon[tone]} />
                  <span {...fieldAttr(env, `chips.${i}.text`)} {...placeholderAttr(text)}>
                    {text.text}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {showCard ? (
          <div className={HERO.cardCol}>
            <div id={anchor ? FORM_ANCHOR : undefined} className={cx(HERO.card[tone], anchor && FORM_ANCHOR_CLS)}>
              {formTitle.text ? (
                <h2 className={HERO.formTitle} {...fieldAttr(env, 'formTitle')} {...placeholderAttr(formTitle)}>
                  {formTitle.text}
                </h2>
              ) : null}
              <Txt env={env} as="p" className={HERO.formSub} path="formSub" text={formSub} />
              <div className={HERO.formBody}>
                {formOk && form ? (
                  <FormBody form={form} widgetId={w.id} env={env} tone="light" afterTitle={false} />
                ) : (
                  <CanvasEmpty label="Choose a form in the panel" />
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- cards

export function CardsBlock({ w }: { w: CardsWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone = env.tone;
  const items = (s.items ?? []).slice(0, 12).map((it, i) => ({ it, i, title: shown(env, it.title, 'Card title'), text: shown(env, it.text, '') }));
  const side = s.mediaSide === 'left' || s.mediaSide === 'right' ? s.mediaSide : null;
  const media = side ? mediaFor(env.media, s.media) : null;
  const head = <SectionHead env={env} tone={tone} kicker={s.kicker} title={s.title} sub={s.sub} />;
  if (items.length === 0 && !media) return head;

  const cols = s.columns === 2 || s.columns === 4 ? s.columns : 3;
  const grid = (
    <ul className={media ? CARDS.gridBeside : (CARDS.grid[cols] ?? CARDS.grid[3])}>
      {items.map(({ it, i, title, text }) => {
        const Icon = iconFor(it.icon) ?? CMS_ICON_COMPONENTS.check;
        return (
          <li key={it.id} className={CARDS.card[tone]}>
            <span className={CARDS.iconWrap[tone]}>
              <Icon className={CARDS.icon} />
            </span>
            <Txt env={env} as="h3" className={CARDS.title[tone]} path={`items.${i}.title`} text={title} />
            <Txt env={env} as="p" className={CARDS.text[tone]} path={`items.${i}.text`} text={text} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      {head}
      {media && side ? (
        <div className={CARDS.split}>
          <div className={CARDS.mediaCol[side]}>
            <SidePhoto env={env} id={s.media} alt={s.mediaAlt} figure={CARDS.figure} img={CARDS.img} sizes="(min-width: 1024px) 480px, calc(100vw - 3rem)" />
          </div>
          <div className={CARDS.gridCol}>{grid}</div>
        </div>
      ) : (
        grid
      )}
    </div>
  );
}

// ---------------------------------------------------------------- steps

export function StepsBlock({ w }: { w: StepsWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone = env.tone;
  const items = (s.items ?? []).slice(0, 12).map((it, i) => ({ it, i, title: shown(env, it.title, 'Step'), text: shown(env, it.text, '') }));
  const media = mediaFor(env.media, s.media);
  const head = <SectionHead env={env} tone={tone} kicker={s.kicker} title={s.title} sub={s.sub} />;
  if (items.length === 0) return head;

  if (media) {
    return (
      <div>
        {head}
        <div className={STEPS.split}>
          <div className={STEPS.mediaCol}>
            <SidePhoto env={env} id={s.media} alt={s.mediaAlt} figure={STEPS.figure} img={STEPS.img} sizes="(min-width: 1024px) 480px, calc(100vw - 3rem)" />
          </div>
          <ol className={cx(STEPS.listCol, STEPS.column)}>
            {items.map(({ it, i, title, text }) => (
              <li key={it.id} className={STEPS.columnItem[tone]}>
                <span className={STEPS.num} aria-hidden="true">
                  {i + 1}
                </span>
                <div className={STEPS.body}>
                  <Txt env={env} as="h3" className={STEPS.title[tone]} path={`items.${i}.title`} text={title} />
                  <Txt env={env} as="p" className={STEPS.text[tone]} path={`items.${i}.text`} text={text} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div>
      {head}
      <ol className={STEPS.row}>
        {items.map(({ it, i, title, text }) => (
          <li key={it.id} className={STEPS.item[tone]}>
            <span className={cx(STEPS.num, STEPS.rowNum)} aria-hidden="true">
              {i + 1}
            </span>
            <Txt env={env} as="h3" className={cx(STEPS.title[tone], STEPS.rowTitle)} path={`items.${i}.title`} text={title} />
            <Txt env={env} as="p" className={STEPS.text[tone]} path={`items.${i}.text`} text={text} />
          </li>
        ))}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------- ctaBand

const BAND_TONES: BandTone[] = ['olive', 'dark', 'gold', 'cream'];

export function CtaBandBlock({ w }: { w: CtaBandWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone: BandTone = BAND_TONES.includes(s.tone) ? s.tone : 'olive';
  const { cls: shape, lead } = shapeOf(env, w.id, BAND.shape);
  const title = shown(env, s.title, 'Call to action');
  const sub = shown(env, s.sub, '');
  const Icon = iconFor(s.icon);
  const dark = tone === 'olive' || tone === 'dark';
  return (
    <div className={cx(BAND.root[tone], shape)} {...(lead && dark ? { 'data-cms-dark-top': '' } : {})}>
      <OliveSprig className={BAND.leaves[tone]} />
      <div className={BAND.inner}>
        {Icon ? (
          <span className={BAND.iconWrap[tone]}>
            <Icon className={BAND.icon} />
          </span>
        ) : null}
        <Txt env={env} as="h2" className={BAND.title[tone]} path="title" text={title} />
        <Txt env={env} as="p" className={BAND.sub[tone]} path="sub" text={sub} />
        <CtaButtons buttons={s.buttons} styles={BAND.style[tone]} className={BAND.buttons} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- badges

export function BadgesBlock({ w }: { w: BadgesWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone = env.tone;
  const items = (s.items ?? []).slice(0, 12).map((it, i) => ({ it, i, title: shown(env, it.title, 'Badge'), text: shown(env, it.text, '') }));
  const head = <SectionHead env={env} tone={tone} kicker={s.kicker} title={s.title} sub={s.sub} />;
  if (items.length === 0) return head;
  return (
    <div>
      {head}
      <ul className={BADGES.row}>
        {items.map(({ it, i, title, text }) => {
          const Icon = iconFor(it.icon) ?? CMS_ICON_COMPONENTS.award;
          return (
            <li key={it.id} className={BADGES.tile[tone]}>
              <span className={BADGES.iconWrap[tone]}>
                <Icon className={BADGES.icon} />
              </span>
              <Txt env={env} as="h3" className={BADGES.title[tone]} path={`items.${i}.title`} text={title} />
              <Txt env={env} as="p" className={BADGES.text[tone]} path={`items.${i}.text`} text={text} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------- reviews

export function ReviewsBlock({ w }: { w: ReviewsWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone = env.tone;
  const stats = (s.stats ?? [])
    .slice(0, 4)
    .map((st, i) => ({ st, i, value: shown(env, st.value, 'Value'), label: shown(env, st.label, '') }))
    .filter((x) => x.value.text);
  const items = (s.items ?? [])
    .slice(0, 12)
    .map((it, i) => ({ it, i, quote: shown(env, it.quote, 'Review'), name: shown(env, it.name, ''), place: shown(env, it.place, '') }))
    .filter((x) => x.quote.text);
  const head = <SectionHead env={env} tone={tone} kicker={s.kicker} title={s.title} sub={s.sub} />;
  if (stats.length === 0 && items.length === 0) return head;
  return (
    <div>
      {head}
      {stats.length ? (
        <ul className={REVIEWS.stats}>
          {stats.map(({ st, i, value, label }) => (
            <li key={st.id} className={REVIEWS.stat}>
              <Txt env={env} as="span" className={REVIEWS.statValue[tone]} path={`stats.${i}.value`} text={value} />
              <Txt env={env} as="span" className={REVIEWS.statLabel[tone]} path={`stats.${i}.label`} text={label} />
            </li>
          ))}
        </ul>
      ) : null}
      {items.length ? (
        <div className={REVIEWS.grid[Math.min(3, items.length)]}>
          {items.map(({ it, i, quote, name, place }) => (
            <figure key={it.id} className={REVIEWS.card[tone]}>
              <span className={REVIEWS.mark[tone]} aria-hidden="true">
                “
              </span>
              <blockquote className={REVIEWS.quote}>
                <p className={REVIEWS.text[tone]} {...fieldAttr(env, `items.${i}.quote`)} {...placeholderAttr(quote)}>
                  {quote.text}
                </p>
              </blockquote>
              {name.text || place.text ? (
                <figcaption className={REVIEWS.caption[tone]}>
                  <Txt env={env} as="span" className={REVIEWS.name[tone]} path={`items.${i}.name`} text={name} />
                  {name.text && place.text ? ' · ' : null}
                  {place.text ? (
                    <span {...fieldAttr(env, `items.${i}.place`)} {...placeholderAttr(place)}>
                      {place.text}
                    </span>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------- stores

export function StoresBlock({ w }: { w: StoresWidget }) {
  const env = useBlockEnv();
  const s = w.settings;
  const tone = env.tone;
  const items = (s.items ?? [])
    .slice(0, 12)
    .filter((it) => isStoreKey(it.store))
    .map((it, i) => ({ it, i, title: shown(env, it.title, 'Store'), text: shown(env, it.text, ''), button: shown(env, it.button, 'Button') }));
  const head = <SectionHead env={env} tone={tone} kicker={s.kicker} title={s.title} sub={s.sub} />;
  if (items.length === 0) return head;
  return (
    <div>
      {head}
      <ul className={STORES.grid[Math.min(3, items.length)]}>
        {items.map(({ it, i, title, text, button }) => {
          const Icon = STORE_ICONS[it.store];
          return (
            <li key={it.id} className={cx(STORES.card[tone], STORES.border[it.store === 'madinah' ? 'featured' : 'plain'])}>
              <span className={cx(STORES.iconWrap, STORES.iconBg[it.store])}>
                <Icon className={STORES.icon} />
              </span>
              <Txt env={env} as="h3" className={STORES.title[tone]} path={`items.${i}.title`} text={title} />
              <Txt env={env} as="p" className={STORES.text[tone]} path={`items.${i}.text`} text={text} />
              {button.text ? (
                <div className={STORES.buttonWrap}>
                  <a href={STORE_URLS[it.store]} target="_blank" rel="noopener noreferrer" className={STORES.button}>
                    <span {...fieldAttr(env, `items.${i}.button`)} {...placeholderAttr(button)}>
                      {button.text}
                    </span>
                    <ArrowRightIcon className={STORES.buttonIcon} />
                  </a>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
