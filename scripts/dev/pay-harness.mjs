// DEV-ONLY: the built site + the real PHP pay server + a LOCAL HitPay stub, for the order walk in
// --pay=server mode (FORGE HITPAY). Never contacts HitPay; never touches the live site.
//
//   npm run build:prerender            (dist/ must exist, with dist/api)
//   node scripts/dev/pay-harness.mjs [--walk] [--port=8093]
//
// Starts: the HitPay stub (server/tests/hitpay_stub.php on 127.0.0.1:8092) and `php -S` on dist/
// with server/tests/router.php (the .htaccess rules emulated), a throw-away CMS data dir, fake
// HitPay key + salt and a RM 8.00 delivery fee for site "av". With --walk it runs
// `order-walk.mjs <base> --pay=server --only=hitpay --stub-state=<state>` and stops everything after;
// without it, it prints the base URL and keeps running until Ctrl+C.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createConnection } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = join(ROOT, 'dist');
const argv = process.argv.slice(2);
const PORT = Number(argv.find((a) => a.startsWith('--port='))?.slice(7) ?? 8093);
const STUB_PORT = 8092;
const WALK = argv.includes('--walk');

if (!existsSync(join(DIST, 'api', 'index.php')) || !existsSync(join(DIST, 'api', '_data', 'prices.json'))) {
  console.error('pay-harness: dist/api (with _data/prices.json) missing: run npm run build:prerender first');
  process.exit(2);
}
const tmp = mkdtempSync(join(tmpdir(), 'avo-pay-harness-'));
const data = join(tmp, 'data');
const stubState = join(tmp, 'hitpay-stub.json');
writeFileSync(stubState, '{}');
const env = {
  ...process.env,
  AVO_CMS_DATA: data,
  AVO_CMS_MAIL: 'file',
  AVO_CMS_OFFLINE: '1',
  AVO_HITPAY_BASE: `http://127.0.0.1:${STUB_PORT}/v1`,
  HITPAY_STUB_STATE: stubState,
};

// Seed the settings the Payments (HitPay) panel would write (fake values, encrypted by the server code).
const seed = spawnSync(
  'php',
  [
    '-r',
    `define('AVO_CMS', true); require ${JSON.stringify(join(DIST, 'api', '_lib', 'bootstrap.php').replace(/\\/g, '/'))};
     avo_setting_set('hitpay.api_key', avo_pay_encrypt('test-key-not-real'));
     avo_setting_set('hitpay.salt', avo_pay_encrypt('test-salt-not-real-0123456789'));
     avo_setting_set('hitpay.delivery_sen.av', '800');
     avo_setting_set('hitpay.notify_email', 'orders@example.com');
     echo avo_pay_ready('av') ? "ready\\n" : "NOT ready\\n";`,
  ],
  { env, encoding: 'utf8' }
);
if (seed.status !== 0 || !/^ready/m.test(seed.stdout)) {
  console.error('pay-harness: seeding failed', seed.stdout, seed.stderr);
  process.exit(1);
}

const kids = [];
const start = (args, cwd) => {
  const p = spawn('php', args, { env, cwd, stdio: 'ignore', windowsHide: true });
  kids.push(p);
  return p;
};
start(['-S', `127.0.0.1:${STUB_PORT}`, join(ROOT, 'server', 'tests', 'hitpay_stub.php')], tmp);
start(['-d', 'display_errors=0', '-S', `127.0.0.1:${PORT}`, '-t', DIST, join(ROOT, 'server', 'tests', 'router.php')], DIST);

const up = (port) =>
  new Promise((resolve) => {
    const s = createConnection({ host: '127.0.0.1', port }, () => {
      s.end();
      resolve(true);
    });
    s.on('error', () => resolve(false));
  });
for (const port of [STUB_PORT, PORT]) {
  let ok = false;
  for (let i = 0; i < 100 && !ok; i++) {
    ok = await up(port);
    if (!ok) await new Promise((r) => setTimeout(r, 100));
  }
  if (!ok) {
    console.error(`pay-harness: port ${port} did not come up`);
    kids.forEach((k) => k.kill());
    process.exit(1);
  }
}
const base = `http://127.0.0.1:${PORT}`;
const stop = () => {
  kids.forEach((k) => k.kill());
  try {
    rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* Windows may hold the SQLite file for a moment */
  }
};
process.on('SIGINT', () => {
  stop();
  process.exit(0);
});
console.log(`pay-harness: ${base}  (HitPay stub 127.0.0.1:${STUB_PORT}, state ${stubState}, data ${data})`);

if (WALK) {
  const outArg = argv.find((a) => a.startsWith('--out='));
  const vpArg = argv.filter((a) => a.startsWith('--vp='));
  const langs = argv.find((a) => a.startsWith('--lang='))?.slice(7).split(',') ?? ['en', 'ms'];
  let status = 0;
  for (const lang of langs) {
    // The real limiter allows 10 creates / 10 min per IP; one language run makes 6. Start each language clean.
    spawnSync('php', ['-r', `define('AVO_CMS', true); require ${JSON.stringify(join(DIST, 'api', '_lib', 'bootstrap.php').replace(/\\/g, '/'))}; db_exec('DELETE FROM rate_hits');`], { env });
    const walk = spawnSync(
      process.execPath,
      [join(ROOT, 'scripts', 'dev', 'order-walk.mjs'), base, '--pay=server', '--only=hitpay', `--lang=${lang}`, `--stub-state=${stubState}`, ...(outArg ? [outArg] : []), ...vpArg],
      { stdio: 'inherit', env: process.env }
    );
    status ||= walk.status ?? 1;
  }
  stop();
  process.exit(status);
}
