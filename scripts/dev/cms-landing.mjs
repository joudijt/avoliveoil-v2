// DEV-ONLY: step 4 of scripts/dev/cms-harness.mjs — landing pages (docs/cms/LP-SPEC.md).
// Called with the harness's page, helpers and fixture docs; adds its checks through
// the shared check() and writes screenshots into the harness output folder.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FACTS = JSON.parse(readFileSync(join(ROOT, 'src/data/storeFacts.json'), 'utf8'));
const STORE_URLS = [FACTS.seller.url, FACTS.seller.shopeeUrl, FACTS.seller.tiktokShopUrl];

const DESKTOP = { width: 1440, height: 900 };
const TABLET = { width: 820, height: 1180, isMobile: true, hasTouch: true };
const PHONE = { width: 390, height: 844, isMobile: true, hasTouch: true };
const GOLD_TEXT = { en: 'extra virgin olive oil', ms: 'extra virgin Palestin' };

export async function runLandingChecks(h) {
  const { page, BASE, OUT, check, sleep, normalise, classAudit, docs, media, forms } = h;

  async function open(path, vp) {
    await page.setViewport(vp);
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('body[data-app-ready="true"]');
  }
  async function scrollThrough() {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
    });
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.race([
        Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => ((i.onload = r), (i.onerror = r)))))),
        new Promise((r) => setTimeout(r, 6000)),
      ]);
    });
    await sleep(500);
  }
  const overflowX = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  /** Scroll to the form with a button, wait for the smooth scroll to settle, return the anchor's top. */
  async function formTopAfter(clickSel) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(200);
    await page.click(clickSel);
    let last = -1;
    for (let i = 0; i < 40; i++) {
      await sleep(100);
      const y = await page.evaluate(() => window.scrollY);
      if (y === last && y > 0) break;
      last = y;
    }
    return page.evaluate(() => ({ top: Math.round(document.getElementById('cms-form')?.getBoundingClientRect().top ?? -999), hash: location.hash }));
  }
  /** Chrome markup with the per-page parts neutralised (scroll state, language-link targets). */
  async function chromeHtml() {
    return page.evaluate(() => {
      const strip = (el) => {
        if (!el) return null;
        const c = el.cloneNode(true);
        c.removeAttribute('data-scrolled');
        c.querySelectorAll('[data-cms-lang-link]').forEach((a) => a.setAttribute('href', 'X'));
        return c.outerHTML;
      };
      return { header: strip(document.querySelector('[data-cms-landing-header]')), footer: strip(document.querySelector('[data-cms-landing-footer]')) };
    });
  }

  // ---------------------------------------------------------------- public, desktop
  for (const lang of ['en', 'ms']) {
    await open(`/${lang}/lp-harness`, DESKTOP);
    await page.waitForSelector('[data-cms-page-root] [data-cms-dark-top]');
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);

    const live = await page.$eval('[data-cms-page-root]', (el) => el.innerHTML);
    const rendered = await page.evaluate(
      async (doc, media, forms, lang) => {
        const { renderPageHtml } = await import('/src/cms/render.tsx');
        return renderPageHtml(doc, { lang, media, forms, text: {}, pageId: 42 });
      },
      docs.landing,
      media,
      forms,
      lang
    );
    const [a, b] = [await normalise(live), await normalise(rendered)];
    let at = 0;
    while (at < a.length && a[at] === b[at]) at++;
    check(a === b, `landing ${lang}: [data-cms-page-root] === renderPageHtml()`, a === b ? '' : { at, live: a.slice(Math.max(0, at - 160), at + 160), rendered: b.slice(Math.max(0, at - 160), at + 160) });

    const f = await page.evaluate(() => {
      const header = document.querySelector('[data-cms-landing-header]');
      const root = document.querySelector('[data-cms-page-root]');
      const hero = root.querySelector('[data-cms-dark-top]');
      const heroImg = hero?.querySelector('img');
      return {
        header: !!header,
        footer: !!document.querySelector('[data-cms-landing-footer]'),
        menu: !!document.querySelector('[data-cms-menu]'),
        crumbs: !!root.querySelector('nav[aria-label="Breadcrumb"]'),
        globalWa: document.querySelectorAll('a.fixed[href*="wa.me"]').length,
        darkTop: root.querySelectorAll('[data-cms-dark-top]').length,
        heroTop: hero ? Math.round(hero.getBoundingClientRect().top) : null,
        headerBg: getComputedStyle(header).backgroundColor,
        logoFilter: getComputedStyle(header.querySelector('img')).filter,
        h1: Array.from(document.querySelectorAll('h1')).map((x) => x.textContent),
        gold: root.querySelector('h1 span')?.textContent ?? null,
        anchors: Array.from(document.querySelectorAll('#cms-form')).map((e) => ({ cls: e.className, inHero: !!e.closest('[data-cms-dark-top]') })),
        noJsIds: Array.from(root.querySelectorAll('[id^="form-sent-"],[id^="form-error-"]')).map((e) => e.id),
        widgetField: root.querySelector('input[name="_widget"]')?.value ?? null,
        external: Array.from(root.querySelectorAll('a[target="_blank"]')).map((x) => ({ href: x.getAttribute('href'), rel: x.getAttribute('rel') })),
        badLink: Array.from(root.querySelectorAll('a')).some((x) => /Bad link|Pautan buruk/.test(x.textContent)),
        rangeLink: Array.from(root.querySelectorAll('a')).find((x) => /See the range|Lihat rangkaian/.test(x.textContent))?.getAttribute('href') ?? null,
        langLinks: Array.from(header.querySelectorAll('[data-cms-lang-link]')).map((x) => x.getAttribute('data-cms-lang-link')),
        steps: Array.from(root.querySelectorAll('ol')).map((ol) => ol.children.length),
        heroImg: heroImg ? { loading: heroImg.getAttribute('loading'), fp: heroImg.getAttribute('fetchpriority') } : null,
        spacer: !!root.querySelector(':scope > [aria-hidden="true"]:first-child:not(section)'),
        bar: root.querySelector('[data-cms-bottom-bar]') ? getComputedStyle(root.querySelector('[data-cms-bottom-bar]')).display : null,
      };
    });
    check(f.header && f.footer && !f.menu && !f.crumbs, `landing ${lang}: landing header + footer, no site menu, no breadcrumb`, f);
    check(f.globalWa === 0, `landing ${lang}: global floating WhatsApp button hidden`, f.globalWa);
    check(f.darkTop === 1 && f.heroTop === 0 && !f.spacer, `landing ${lang}: dark hero opens the page edge to edge under the header (no spacer)`, f);
    check(f.headerBg === 'rgba(0, 0, 0, 0)' && /invert/.test(f.logoFilter), `landing ${lang}: header transparent with a light logo over the dark hero`, { bg: f.headerBg, filter: f.logoFilter });
    check(f.h1.length === 1 && f.gold === GOLD_TEXT[lang], `landing ${lang}: one h1, highlight painted gold`, { h1: f.h1, gold: f.gold });
    check(f.anchors.length === 1 && f.anchors[0].inHero && /scroll-mt-28/.test(f.anchors[0].cls), `landing ${lang}: exactly one #cms-form, on the hero card, scroll-mt-28`, f.anchors);
    check(f.noJsIds.length > 0 && f.noJsIds.every((x) => /^form-(sent|error)-w/.test(x)) && f.widgetField?.startsWith('w'), `landing ${lang}: no-JS result ids + _widget keyed by the widget id`, { ids: f.noJsIds, w: f.widgetField });
    const ext = f.external.filter((x) => !x.href.includes('wa.me'));
    check(
      STORE_URLS.every((u) => ext.some((x) => x.href === u)) && f.external.every((x) => x.rel === 'noopener noreferrer'),
      `landing ${lang}: store buttons go to the storeFacts URLs, new tab, rel=noopener noreferrer`,
      f.external
    );
    check(!f.badLink, `landing ${lang}: a CTA link with an unsafe href is left out`);
    check(f.rangeLink === `/${lang}/products`, `landing ${lang}: CTA link /en/… localised`, f.rangeLink);
    check(f.langLinks.join() === 'en,ms', `landing ${lang}: EN/BM links carry data-cms-lang-link`, f.langLinks);
    check(f.steps.length === 2 && f.steps[0] === 3 && f.steps[1] === 4, `landing ${lang}: steps are <ol> lists`, f.steps);
    check(f.heroImg?.loading === 'eager' && f.heroImg?.fp === 'high', `landing ${lang}: hero photo eager + fetchpriority=high`, f.heroImg);
    check(f.bar === 'none', `landing ${lang} 1440: phone bar hidden on desktop`, f.bar);
    await classAudit(page, '[data-cms-page-root]', `landing ${lang}`);
    await classAudit(page, '[data-cms-landing-header]', `landing header ${lang}`);

    // header after scrolling (retried: vite may reload the page once while it optimises dependencies)
    let hs = null;
    for (let i = 0; i < 3 && !hs?.scrolled; i++) {
      await page.waitForSelector('[data-cms-landing-header]');
      await page.evaluate(() => window.scrollTo(0, 500));
      await sleep(500);
      hs = await page.evaluate(() => {
        const hd = document.querySelector('[data-cms-landing-header]');
        return { scrolled: hd.hasAttribute('data-scrolled'), bg: getComputedStyle(hd).backgroundColor, filter: getComputedStyle(hd.querySelector('img')).filter, y: window.scrollY };
      });
    }
    check(hs.scrolled && hs.bg !== 'rgba(0, 0, 0, 0)' && !/invert/.test(hs.filter), `landing ${lang}: header turns solid cream with the brand logo once scrolled`, hs);

    // "Fill the form" in the hero → smooth scroll to the card, clear of the fixed header
    const ft = await formTopAfter('[data-cms-dark-top] a[href="#cms-form"]');
    check(ft.top >= 96 && ft.top <= 130 && ft.hash === '#cms-form', `landing ${lang}: hero "Fill the form" scrolls #cms-form just below the header`, ft);

    // contrast spot checks (small text ≥ 4.5:1, large ≥ 3:1) over the landing chrome and blocks
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    const low = await page.evaluate(() => {
      // Tailwind v4 computes colours as oklab()/color-mix(): let a canvas resolve any CSS colour.
      const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      const parse = (c) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#000';
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
      };
      const over = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
      const header = document.querySelector('[data-cms-landing-header]');
      const headerClear = parse(getComputedStyle(header).backgroundColor).a === 0;
      const bgOf = (el) => {
        const stack = [];
        let base = { r: 255, g: 255, b: 255, a: 1 };
        for (let n = el; n; n = n.parentElement) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c && c.a > 0) {
            stack.push(c);
            if (c.a >= 1) break;
          }
          // A transparent header sits on the dark hero, not on what the DOM puts behind it.
          if (n === header && headerClear) {
            base = parse('#2e3a24');
            break;
          }
        }
        let bg = base;
        for (let i = stack.length - 1; i >= 0; i--) bg = over(stack[i], bg);
        return bg;
      };
      const lum = ({ r, g, b }) => {
        const f = (v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const out = [];
      const scopes = [document.querySelector('[data-cms-landing-header]'), document.querySelector('[data-cms-landing-footer]'), document.querySelector('[data-cms-page-root]')];
      for (const scope of scopes) {
        for (const el of scope.querySelectorAll('*')) {
          const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
          if (!own) continue;
          const st = getComputedStyle(el);
          if (st.visibility === 'hidden' || st.display === 'none' || el.getClientRects().length === 0) continue;
          if (el.closest('[aria-hidden="true"]')) continue;
          // Text over a photo is judged by eye (overlay strength is the owner's choice).
          const heroWithPhoto = el.closest('[data-cms-dark-top]');
          if (heroWithPhoto && heroWithPhoto.querySelector(':scope > img') && !el.closest('a, [id="cms-form"]')) continue;
          // Site widgets mixed into the page keep the site's own look (not landing scope).
          if (el.closest('details, ul > li > a[href*="/products/"], [class*="text-brown/70"], [class*="placeholder"]')) continue;
          if (el.matches('option, select')) continue;
          const fg = parse(st.color);
          const bg = bgOf(el);
          const c = over(fg, bg);
          const L1 = lum(c);
          const L2 = lum(bg);
          const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          const size = parseFloat(st.fontSize);
          const bold = parseInt(st.fontWeight, 10) >= 700;
          const large = size >= 24 || (bold && size >= 18.66);
          if (ratio < (large ? 3 : 4.5)) out.push({ text: el.textContent.trim().slice(0, 40), ratio: +ratio.toFixed(2), size, cls: el.className.toString().slice(0, 80) });
        }
      }
      return out;
    });
    check(low.length === 0, `landing ${lang}: text contrast ≥ 4.5:1 (≥ 3:1 large) in header, blocks, bar, footer`, low.slice(0, 12));

    // header / footer parity with the landing template serve.php fills
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    const liveChrome = await chromeHtml();
    await open(`/${lang}/__cms-template-landing`, DESKTOP);
    await sleep(300);
    const tplChrome = await chromeHtml();
    const tpl = await page.evaluate(() => ({
      root: document.querySelector('main > [data-cms-page-root]')?.outerHTML,
      title: document.title,
      menu: !!document.querySelector('[data-cms-menu]'),
      globalWa: document.querySelectorAll('a.fixed[href*="wa.me"]').length,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
    }));
    check(liveChrome.header === tplChrome.header && !!liveChrome.header, `landing ${lang}: header markup == landing template header`, liveChrome.header === tplChrome.header ? '' : { live: liveChrome.header?.slice(0, 300), tpl: tplChrome.header?.slice(0, 300) });
    check(liveChrome.footer === tplChrome.footer && !!liveChrome.footer, `landing ${lang}: footer markup == landing template footer`);
    check(tpl.root === '<div data-cms-page-root=""></div>' && !tpl.menu && tpl.globalWa === 0 && /noindex/.test(tpl.robots ?? ''), `landing template ${lang}: empty root, no site menu, no global WhatsApp, noindex`, tpl);

    // screenshots at three widths
    for (const [name, vp] of [
      ['1440', DESKTOP],
      ['820', TABLET],
      ['390', PHONE],
    ]) {
      await open(`/${lang}/lp-harness`, vp);
      await page.waitForSelector('[data-cms-page-root] [data-cms-dark-top]');
      await scrollThrough();
      await page.screenshot({ path: join(OUT, `landing-${lang}-${name}-top.png`) });
      await page.screenshot({ path: join(OUT, `landing-${lang}-${name}.png`), fullPage: true });
      const ox = await overflowX();
      check(ox <= 0, `landing ${lang} ${name}: no horizontal scroll`, ox);
      if (name === '820') {
        const bar = await page.$eval('[data-cms-bottom-bar]', (el) => getComputedStyle(el).display);
        check(bar === 'none', `landing ${lang} 820: phone bar hidden on tablet`, bar);
      }
    }

    // phone: the bar
    await open(`/${lang}/lp-harness`, PHONE);
    await page.waitForSelector('[data-cms-bottom-bar]');
    const bar = await page.evaluate(() => {
      const b = document.querySelector('[data-cms-bottom-bar]');
      return { display: getComputedStyle(b).display, links: Array.from(b.querySelectorAll('a')).map((a) => a.getAttribute('href').slice(0, 30)), inRoot: !!b.closest('[data-cms-page-root]') };
    });
    check(bar.display === 'flex' && bar.links.length === 2 && bar.links[0].startsWith('https://wa.me/') && bar.links[1] === '#cms-form' && bar.inRoot, `landing ${lang} 390: bar in the page root with WhatsApp + Fill the form`, bar);
    const waLabel = await page.$eval('[data-cms-landing-header] a[href*="wa.me"] span', (el) => getComputedStyle(el).display);
    check(waLabel === 'none', `landing ${lang} 390: header WhatsApp button is icon-only`, waLabel);
    await page.focus('#cms-form input[name="name"]');
    await sleep(150);
    const hidden = await page.$eval('[data-cms-bottom-bar]', (el) => getComputedStyle(el).display);
    await page.evaluate(() => document.activeElement.blur());
    await sleep(150);
    const back = await page.$eval('[data-cms-bottom-bar]', (el) => getComputedStyle(el).display);
    check(hidden === 'none' && back === 'flex', `landing ${lang} 390: bar hides while a form field has focus`, { hidden, back });
    const pf = await formTopAfter('[data-cms-bottom-bar] a[href="#cms-form"]');
    check(pf.top >= 96 && pf.top <= 130, `landing ${lang} 390: bar "Fill the form" scrolls the form into view below the header`, pf);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(400);
    const cover = await page.evaluate(() => {
      const last = document.querySelector('[data-cms-landing-footer] p:last-child').getBoundingClientRect();
      const b = document.querySelector('[data-cms-bottom-bar]').getBoundingClientRect();
      return { lastBottom: Math.round(last.bottom), barTop: Math.round(b.top) };
    });
    check(cover.lastBottom <= cover.barTop, `landing ${lang} 390: bar never covers the end of the footer`, cover);
    await page.screenshot({ path: join(OUT, `landing-${lang}-390-bottom.png`) });
  }

  // ---------------------------------------------------------------- form submit inside the hero card
  await open('/en/lp-harness', DESKTOP);
  await page.waitForSelector('#cms-form form');
  h.formBodies.length = 0;
  await page.type('#cms-form input[name="name"]', 'Test Person');
  await page.type('#cms-form input[name="phone"]', '+60123456789');
  await page.select('#cms-form select[name="interest"]', 'i3');
  await page.click('#cms-form button[type="submit"]');
  await page.waitForSelector('#cms-form [role="status"]');
  const sent = JSON.parse(h.formBodies[0]?.body ?? '{}');
  check(h.formBodies[0]?.path === '/api/forms/9/submit' && sent.fields?.interest === 'i3' && sent.page === 42, 'landing: hero form posts to its form and shows the thank-you in the card', { path: h.formBodies[0]?.path, sent });

  // ---------------------------------------------------------------- landing without a form, not edge to edge
  for (const vp of [DESKTOP, PHONE]) {
    await open('/en/lp-noform', vp);
    await page.waitForSelector('[data-cms-page-root] h1');
    const nf = await page.evaluate(() => {
      const root = document.querySelector('[data-cms-page-root]');
      const first = root.firstElementChild;
      const hd = document.querySelector('[data-cms-landing-header]');
      return {
        anchor: !!document.getElementById('cms-form'),
        formLinks: document.querySelectorAll('a[href="#cms-form"]').length,
        barLinks: root.querySelectorAll('[data-cms-bottom-bar] a').length,
        spacer: first && first.tagName === 'DIV' && first.getAttribute('aria-hidden') === 'true',
        darkTop: !!root.querySelector('[data-cms-dark-top]'),
        headerBg: getComputedStyle(hd).backgroundColor,
        gold: !!root.querySelector('h1 span'),
        forms: root.querySelectorAll('form').length,
        h1Top: Math.round(root.querySelector('h1').getBoundingClientRect().top),
        headerBottom: Math.round(hd.getBoundingClientRect().bottom),
      };
    });
    check(!nf.anchor && nf.formLinks === 0 && nf.barLinks === 1 && nf.forms === 0, `landing no-form ${vp.width}: no anchor, no form buttons, bar has WhatsApp only, no card`, nf);
    check(nf.spacer && !nf.darkTop && nf.headerBg !== 'rgba(0, 0, 0, 0)' && nf.h1Top > nf.headerBottom, `landing no-form ${vp.width}: spacer + solid header, content starts below it`, nf);
    check(!nf.gold, `landing no-form ${vp.width}: highlight not found → plain title`);
    await page.screenshot({ path: join(OUT, `landing-noform-en-${vp.width}.png`), fullPage: true });
  }

  // ---------------------------------------------------------------- server sanitiser round trip
  // The published HTML goes through server/_lib/sanitize.php; anything it strips would make
  // the visitor's HTML differ from React's. Run the real sanitiser (PHP CLI) on both docs.
  for (const [name, doc] of Object.entries(docs)) {
    const html = await page.evaluate(
      async (doc, media, forms) => {
        const { renderPageHtml } = await import('/src/cms/render.tsx');
        return renderPageHtml(doc, { lang: 'en', media, forms, text: {}, pageId: 42 });
      },
      doc,
      media,
      forms
    );
    const php = [
      "define('AVO_CMS', true);",
      `require ${JSON.stringify(join(ROOT, 'server/_lib/sanitize.php').replace(/\\/g, '/'))};`,
      'echo avo_sanitize_html(stream_get_contents(STDIN));',
    ].join(' ');
    const res = spawnSync('php', ['-r', php], { input: html, encoding: 'utf8' });
    if (res.error || res.status !== 0) {
      check(false, `sanitiser round trip (${name}): php ran`, (res.error?.message ?? res.stderr ?? '').slice(0, 300));
      continue;
    }
    const [a, b] = [await normalise(html), await normalise(res.stdout)];
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    check(a === b, `sanitiser round trip (${name}): server sanitiser keeps the landing markup intact`, a === b ? '' : { at: i, ours: a.slice(Math.max(0, i - 160), i + 120), server: b.slice(Math.max(0, i - 160), i + 120) });
  }

  // ---------------------------------------------------------------- canvas
  await page.setViewport({ width: 1300, height: 900 });
  await page.goto(h.shellUrl, { waitUntil: 'load' });
  await page.evaluate((w) => window.__open('/cms-canvas?lang=en', w), 1280);
  await h.waitMsg((m) => m.type === 'cms:ready', 'cms:ready (landing)', 30000);
  await h.send({ type: 'cms:doc', doc: docs.landing, lang: 'en', media, forms, selectedId: null });
  let f = await h.frame();
  await f.waitForSelector('[data-cms-landing-strip]');
  await h.waitImages(f);
  const cv = await f.evaluate(() => {
    const fields = new Set(Array.from(document.querySelectorAll('[data-cms-field]')).map((e) => e.getAttribute('data-cms-field')));
    return {
      strip: document.querySelector('[data-cms-landing-strip]')?.textContent,
      crumbs: !!document.querySelector('nav[aria-label="Breadcrumb"]'),
      bar: !!document.querySelector('[data-cms-bottom-bar]'),
      fields: [...fields],
    };
  });
  const NEED = [
    'kicker', 'title', 'sub', 'chips.0.text', 'chips.3.text', 'buttons.0.label', 'buttons.1.label', 'formTitle', 'formSub',
    'items.0.title', 'items.0.text', 'items.2.button', 'items.0.quote', 'items.0.name', 'items.0.place', 'stats.0.value', 'stats.0.label',
  ];
  check(!!cv.strip && !cv.crumbs && !cv.bar, 'canvas landing: "Landing layout" strip, no breadcrumb, no phone bar', cv.strip);
  check(NEED.every((p) => cv.fields.includes(p)), 'canvas landing: inline-edit hooks on every new text', NEED.filter((p) => !cv.fields.includes(p)));
  await (await page.$('#f')).screenshot({ path: join(OUT, 'canvas-landing-en-1280.png') });
  await classAudit(f, 'main', 'canvas landing');

  for (const [path, value] of [
    ['chips.1.text', 'Pressed in Palestine'],
    ['stats.0.value', '2010+'],
    ['buttons.0.label', 'Chat now'],
  ]) {
    await h.clearMsgs();
    const sel = `[data-cms-field="${path}"]`;
    await f.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel);
    await f.click(sel, { count: 2 });
    await f.waitForSelector('[data-cms-editing]');
    await page.keyboard.type(value);
    await page.keyboard.press('Enter');
    const m = await h.waitMsg((x) => x.type === 'cms:inline-text', `inline ${path}`);
    check(m?.field === path && m?.value === value, `canvas landing: in-place edit of ${path}`, m);
    await sleep(200);
  }

  await page.evaluate((w) => window.__open('/cms-canvas?lang=en', w), 390);
  await h.waitMsg((m) => m.type === 'cms:ready', 'cms:ready (landing 390)', 30000);
  await h.send({ type: 'cms:doc', doc: docs.noform, lang: 'en', media, forms, selectedId: null });
  f = await h.frame();
  await f.waitForSelector('[data-cms-canvas-empty]');
  const empty = await f.evaluate(() => ({
    card: document.querySelector('[data-cms-canvas-empty]')?.textContent,
    fadedForm: !!document.querySelector('a[href="#cms-form"][data-cms-placeholder]'),
  }));
  check(empty.card === 'Choose a form in the panel' && empty.fadedForm, 'canvas: hero without a form shows "Choose a form", form button faded', empty);
  await (await page.$('#f')).screenshot({ path: join(OUT, 'canvas-landing-noform-390.png') });
}
