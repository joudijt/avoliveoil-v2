<?php
declare(strict_types=1);

/*
 * Local stand-in for https://api.hit-pay.com/v1 (FORGE HITPAY tests). NEVER the real API.
 *   php -S 127.0.0.1:8092 server/tests/hitpay_stub.php   with HITPAY_STUB_STATE=<json file>
 * State (read + written by the tests too): {requests:{id:{...}}, calls:[...], failNextCreate, key}.
 * The shapes follow docs/forge/HITPAY-FORGE-SPEC.md §1.
 */

$file = (string) getenv('HITPAY_STUB_STATE');
$state = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
$state += ['requests' => [], 'calls' => [], 'failNextCreate' => false, 'key' => 'test-key-not-real'];
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = (string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
$state['calls'][] = ['method' => $method, 'path' => $path, 'query' => (string) ($_SERVER['QUERY_STRING'] ?? '')];
$save = function () use (&$state, $file) {
    file_put_contents($file, json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
};
$out = function (int $status, array $data) use ($save) {
    $save();
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    return true;
};

if (($_SERVER['HTTP_X_BUSINESS_API_KEY'] ?? '') !== $state['key'] || ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'XMLHttpRequest') {
    return $out(401, ['message' => 'Unauthenticated.']);
}
if ($method === 'POST' && $path === '/v1/payment-requests') {
    if ($state['failNextCreate']) {
        $state['failNextCreate'] = false;
        return $out(500, ['message' => 'stub failure']);
    }
    parse_str((string) file_get_contents('php://input'), $f);
    $id = sprintf('%08x-%04x-%04x-%04x-%012x', random_int(0, 0xffffffff), random_int(0, 0xffff), random_int(0, 0xffff), random_int(0, 0xffff), random_int(0, 0xffffffffffff));
    $req = [
        'id' => $id, 'status' => 'pending', 'amount' => $f['amount'] ?? null, 'currency' => $f['currency'] ?? null,
        'reference_number' => $f['reference_number'] ?? null, 'purpose' => $f['purpose'] ?? null,
        'url' => 'https://checkout.hit-pay.com/payment-request/@berkat-madinah/' . $id . '/checkout',
        'payments' => [], '_form' => $f,
    ];
    $state['requests'][$id] = $req;
    return $out(201, array_diff_key($req, ['_form' => 1]));
}
if ($method === 'GET' && $path === '/v1/payment-requests') {
    return $out(200, ['data' => [], 'meta' => ['per_page' => (int) ($_GET['per_page'] ?? 15)]]);
}
if ($method === 'GET' && preg_match('~^/v1/payment-requests/([0-9a-f-]+)$~', $path, $m)) {
    $req = $state['requests'][$m[1]] ?? null;
    if (!$req) return $out(404, ['message' => 'Not found']);
    return $out(200, array_diff_key($req, ['_form' => 1]));
}
return $out(404, ['message' => 'stub: no route']);
