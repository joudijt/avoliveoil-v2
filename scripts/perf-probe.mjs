// Measure what a real visitor actually downloads and how long they wait.
// Drives the LIVE site (or any --base) in headless Chrome, logs every request
// with its transfer size, and reports the moments that matter: first paint,
// LCP, when the loading animation lets go, and total bytes by type.
//
//   node scripts/perf-probe.mjs                       # live, desktop
//   node scripts/perf-probe.mjs --phone --route /ms
import puppeteer from 'puppeteer';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
};
const BASE = arg('--base', 'https://avoliveoil.com');
const ROUTE = arg('--route', '/en');
const PHONE = process.argv.includes('--phone');
const THROTTLE = process.argv.includes('--fast') ? null : {
  // Chrome DevTools "Fast 4G": what a phone on mobile data actually gets.
  downloadThroughput: (4 * 1024 * 1024) / 8,
  uploadThroughput: (3 * 1024 * 1024) / 8,
  latency: 70,
};

const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] });
const pages = await browser.pages();
const page = pages[0] ?? (await browser.newPage());
await page.setViewport(PHONE ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900 });

const client = await page.createCDPSession();
await client.send('Network.enable');
if (THROTTLE) await client.send('Network.emulateNetworkConditions', { offline: false, ...THROTTLE });

const reqs = new Map();
client.on('Network.responseReceived', (e) => {
  reqs.set(e.requestId, { url: e.response.url, type: e.type, status: e.response.status, bytes: 0 });
});
client.on('Network.loadingFinished', (e) => {
  const r = reqs.get(e.requestId);
  if (r) r.bytes = e.encodedDataLength;
});

// LCP is only delivered to a PerformanceObserver, and only with buffered:true
// for entries that fired before the observer existed. getEntriesByType() returns
// nothing for it, which is why every earlier run reported LCP null — the one
// metric the "images are slow" complaint is actually about.
await page.evaluateOnNewDocument(() => {
  window.__lcp = null;
  new PerformanceObserver((list) => {
    const last = list.getEntries().pop();
    if (last) window.__lcp = { time: last.startTime, url: last.url || null };
  }).observe({ type: 'largest-contentful-paint', buffered: true });
});

const t0 = Date.now();
await page.goto(`${BASE}${ROUTE}`, { waitUntil: 'domcontentloaded', timeout: 120000 });
const domContent = Date.now() - t0;
await page.waitForSelector('body[data-app-ready="true"]', { timeout: 120000 }).catch(() => {});
const appReady = Date.now() - t0;
// Let the hero settle so LCP and lazy images below the fold are represented.
await new Promise((r) => setTimeout(r, 6000));
const total = Date.now() - t0;

const vitals = await page.evaluate(() => {
  const paint = performance.getEntriesByType('paint');
  const lcp = window.__lcp;
  const nav = performance.getEntriesByType('navigation')[0];
  return {
    ttfb: nav ? Math.round(nav.responseStart) : null,
    fcp: Math.round(paint.find((p) => p.name === 'first-contentful-paint')?.startTime ?? 0),
    lcp: lcp ? Math.round(lcp.time) : null,
    lcpUrl: lcp?.url ?? null,
    domInteractive: nav ? Math.round(nav.domInteractive) : null,
  };
});

const all = [...reqs.values()].filter((r) => r.bytes > 0);
const byType = {};
for (const r of all) {
  const t = r.type.toLowerCase();
  byType[t] = byType[t] ?? { n: 0, bytes: 0 };
  byType[t].n += 1;
  byType[t].bytes += r.bytes;
}
const kb = (b) => `${(b / 1024).toFixed(0)} KB`;

console.log(`\n${BASE}${ROUTE}   ${PHONE ? 'phone 390px' : 'desktop 1440px'}   ${THROTTLE ? 'Fast 4G' : 'no throttling'}`);
console.log('─'.repeat(78));
console.log(`  TTFB                 ${vitals.ttfb} ms`);
console.log(`  first paint (FCP)    ${vitals.fcp} ms`);
console.log(`  LCP                  ${vitals.lcp} ms   ${vitals.lcpUrl?.split('/').pop() ?? ''}`);
console.log(`  DOM content loaded   ${domContent} ms`);
console.log(`  app-ready fired      ${appReady} ms   <- loading animation released the page`);
console.log(`  probe window         ${total} ms`);
console.log('\n  transferred by type:');
for (const [t, v] of Object.entries(byType).sort((a, b) => b[1].bytes - a[1].bytes)) {
  console.log(`    ${t.padEnd(12)} ${String(v.n).padStart(3)} req  ${kb(v.bytes).padStart(10)}`);
}
console.log(`    ${'TOTAL'.padEnd(12)} ${String(all.length).padStart(3)} req  ${kb(all.reduce((s, r) => s + r.bytes, 0)).padStart(10)}`);
console.log('\n  10 heaviest responses:');
for (const r of all.sort((a, b) => b.bytes - a.bytes).slice(0, 10)) {
  console.log(`    ${kb(r.bytes).padStart(10)}  ${r.type.padEnd(8)} ${r.url.replace(BASE, '')}`);
}

await browser.close();
