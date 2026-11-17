<?php
declare(strict_types=1);

/*
 * CMS backend test suite.  php server/tests/run.php
 *
 * Builds a throw-away docroot (fixture snapshots + server/ as api/ + fixture build data),
 * a throw-away data dir, starts `php -S 127.0.0.1:8091` with server/tests/router.php
 * (the .htaccess rules emulated) and runs every case in cases.php against it.
 * Mail goes to DATA/mail-outbox/*.eml (AVO_CMS_MAIL=file); IndexNow is skipped
 * (AVO_CMS_OFFLINE=1); AVO_CMS_TEST_HOOKS=1 enables the fatal-error hook header.
 * Exit code 1 on any failure.
 */

require __DIR__ . '/lib.php';

const PORT = 8091;
const STUB_PORT = 8092;
$server = dirname(__DIR__);

function copy_tree(string $from, string $to, ?callable $filter = null): void
{
    @mkdir($to, 0777, true);
    foreach (scandir($from) ?: [] as $n) {
        if ($n === '.' || $n === '..') continue;
        $src = "$from/$n";
        if ($filter && !$filter($src)) continue;
        if (is_dir($src)) copy_tree($src, "$to/$n", $filter);
        else copy($src, "$to/$n");
    }
}

function rm_tree(string $dir): void
{
    if (!is_dir($dir)) return;
    foreach (scandir($dir) ?: [] as $n) {
        if ($n === '.' || $n === '..') continue;
        $p = "$dir/$n";
        is_dir($p) && !is_link($p) ? rm_tree($p) : @unlink($p);
    }
    @rmdir($dir);
}

$tmp = str_replace('\\', '/', sys_get_temp_dir()) . '/avo-cms-test-' . bin2hex(random_bytes(4));
$docroot = "$tmp/docroot";
$data = "$tmp/data";
copy_tree(__DIR__ . '/fixtures/docroot', $docroot);
copy_tree($server, "$docroot/api", fn ($p) => !str_ends_with(str_replace('\\', '/', $p), '/tests'));
copy_tree(__DIR__ . '/fixtures/data', "$docroot/api/_data");
// FORGE HITPAY: the real price table (same generator as the build) + a local HitPay stub.
$pricesOut = "$docroot/api/_data/prices.json";
exec(escapeshellarg('node') . ' ' . escapeshellarg(dirname($server) . '/scripts/build-prices.mjs') . ' ' . escapeshellarg($pricesOut) . ' 2>&1', $pricesLog, $pricesRc);
if ($pricesRc !== 0 || !is_file($pricesOut)) {
    fwrite(STDERR, "could not build prices.json (node scripts/build-prices.mjs):
" . implode("
", $pricesLog) . "
");
    exit(1);
}
$stubState = "$tmp/hitpay-stub.json";
file_put_contents($stubState, '{}');
$selftest = bin2hex(random_bytes(16));
$build = '20261001120000-test1234';
file_put_contents("$docroot/api/_data/build.json", json_encode(['build' => $build, 'selftestSha256' => hash('sha256', $selftest)]));
$setupToken = bin2hex(random_bytes(32));
file_put_contents("$docroot/api/_setup/$setupToken.token", '');
@mkdir($data, 0777, true);

$GLOBALS['CTX'] = [
    'docroot' => $docroot, 'data' => $data, 'setupToken' => $setupToken, 'selftest' => $selftest, 'build' => $build,
    'stubState' => $stubState,
];

$env = getenv();
$env['AVO_CMS_DATA'] = $data;
$env['AVO_CMS_MAIL'] = 'file';
$env['AVO_CMS_OFFLINE'] = '1';
$env['AVO_CMS_TEST_HOOKS'] = '1';
$env['AVO_HITPAY_BASE'] = 'http://127.0.0.1:' . STUB_PORT . '/v1';
$env['HITPAY_STUB_STATE'] = $stubState;
// Extra order inboxes come from a file kept out of git (pay.php avo_pay_site_notify_extra); the tests use their own.
$notifyExtra = "$tmp/pay-local.php";
file_put_contents($notifyExtra, "<?php return ['nf' => ['noorfes-inbox@example.com']];
");
$env['AVO_PAY_NOTIFY_EXTRA_FILE'] = $notifyExtra;
$log = "$tmp/server.log";
$proc = proc_open(
    [PHP_BINARY, '-d', 'upload_max_filesize=20M', '-d', 'post_max_size=24M', '-d', 'display_errors=0', '-d', 'log_errors=1',
        '-S', '127.0.0.1:' . PORT, '-t', $docroot, __DIR__ . '/router.php'],
    [0 => ['pipe', 'r'], 1 => ['file', $log, 'a'], 2 => ['file', $log, 'a']],
    $pipes,
    $docroot,
    $env,
);
if (!is_resource($proc)) {
    fwrite(STDERR, "could not start php -S\n");
    exit(1);
}
$stub = proc_open(
    [PHP_BINARY, '-d', 'display_errors=0', '-S', '127.0.0.1:' . STUB_PORT, __DIR__ . '/hitpay_stub.php'],
    [0 => ['pipe', 'r'], 1 => ['file', $log, 'a'], 2 => ['file', $log, 'a']],
    $stubPipes,
    $tmp,
    $env,
);
$up = false;
for ($i = 0; $i < 100; $i++) {
    $s = @fsockopen('127.0.0.1', STUB_PORT, $errno, $errstr, 0.2);
    if ($s) {
        fclose($s);
        $up = true;
        break;
    }
    usleep(100000);
}
if (!$up) {
    proc_terminate($proc);
    if (is_resource($stub)) proc_terminate($stub);
    fwrite(STDERR, "HitPay stub did not come up on port " . STUB_PORT . "
");
    exit(1);
}
$up = false;
for ($i = 0; $i < 100; $i++) {
    $s = @fsockopen('127.0.0.1', PORT, $errno, $errstr, 0.2);
    if ($s) {
        fclose($s);
        $up = true;
        break;
    }
    usleep(100000);
}
if (!$up) {
    proc_terminate($proc);
    fwrite(STDERR, "php -S did not come up on port " . PORT . " (is it in use?)\n" . @file_get_contents($log));
    exit(1);
}
Client::$base = 'http://127.0.0.1:' . PORT;

require __DIR__ . '/cases.php';
require __DIR__ . '/cases_pay.php';

$pass = 0;
$fail = [];
$t0 = microtime(true);
foreach ($GLOBALS['TESTS'] as [$name, $fn]) {
    try {
        $fn();
        $pass++;
        echo "  ok    $name\n";
    } catch (Throwable $e) {
        $fail[] = $name;
        echo "  FAIL  $name\n        " . str_replace("\n", "\n        ", $e->getMessage())
            . ($e instanceof TestFailure ? '' : ' @ ' . basename($e->getFile()) . ':' . $e->getLine()) . "\n";
    }
}

proc_terminate($proc);
foreach ($pipes as $p) @fclose($p);
proc_close($proc);
proc_terminate($stub);
foreach ($stubPipes as $p) @fclose($p);
proc_close($stub);

$total = $pass + count($fail);
printf("\n%d tests, %d passed, %d failed (%.1f s)\n", $total, $pass, count($fail), microtime(true) - $t0);
if ($fail) {
    echo "server log + data kept in $tmp\n";
    $phpLog = @file_get_contents($log);
    if ($phpLog) echo "--- server log (last 40 lines) ---\n" . implode("\n", array_slice(explode("\n", trim($phpLog)), -40)) . "\n";
    $cmsLog = @file_get_contents("$data/logs/cms.log");
    if ($cmsLog) echo "--- cms.log (last 20 lines) ---\n" . implode("\n", array_slice(explode("\n", trim($cmsLog)), -20)) . "\n";
    exit(1);
}
$GLOBALS['TDB'] = null; // release the SQLite handle so Windows lets the temp dir go
gc_collect_cycles();
rm_tree($tmp);
if (is_dir($tmp)) echo "note: could not remove $tmp completely
";
exit(0);
