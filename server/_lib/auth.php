<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

const AVO_COOKIE = 'avo_cms';
const AVO_SESSION_IDLE = 12 * 3600;
const AVO_SESSION_ABSOLUTE = 7 * 86400;
const AVO_PASSWORD_MIN = 10;
const AVO_LOGIN_WINDOW = 15 * 60;
const AVO_RESET_TTL = 30 * 60;
const AVO_LOGIN_FAILED = 'Email or password is incorrect.';

/** password_hash('not-a-real-password-…') — verified for unknown emails so timing doesn't reveal accounts. */
function avo_dummy_hash(): string
{
    static $h = null;
    return $h ??= password_hash('dummy-' . bin2hex(random_bytes(8)), PASSWORD_DEFAULT);
}

function avo_user_public(array $u): array
{
    return [
        'id' => (int) $u['id'],
        'email' => (string) $u['email'],
        'name' => (string) $u['name'],
        'isActive' => (bool) $u['is_active'],
        'createdAt' => avo_iso((int) $u['created_at']),
        'lastLoginAt' => avo_iso($u['last_login_at'] !== null ? (int) $u['last_login_at'] : null),
    ];
}

function avo_set_cookie(string $value, int $expires): void
{
    setcookie(AVO_COOKIE, $value, [
        'expires' => $expires,
        'path' => '/',
        'secure' => avo_is_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

function avo_session_create(int $userId): array
{
    $token = avo_hex_token(32);
    $csrf = avo_hex_token(32);
    $now = avo_now();
    db_exec('INSERT INTO sessions(token_hash,user_id,csrf,created_at,last_seen_at,expires_at,ip,ua) VALUES(?,?,?,?,?,?,?,?)', [
        hash('sha256', $token), $userId, $csrf, $now, $now, $now + AVO_SESSION_ABSOLUTE, avo_ip(), avo_ua(),
    ]);
    avo_set_cookie($token, $now + AVO_SESSION_ABSOLUTE);
    return ['token_hash' => hash('sha256', $token), 'csrf' => $csrf, 'user_id' => $userId];
}

/**
 * The current session (joined with its active user) or null. Expired rows are removed.
 * @return array{token_hash:string,csrf:string,user_id:int,user:array}|null
 */
function avo_session(): ?array
{
    static $cache = false;
    if ($cache !== false) return $cache;
    $token = (string) ($_COOKIE[AVO_COOKIE] ?? '');
    if (!preg_match('/^[0-9a-f]{64}$/', $token)) return $cache = null;
    $hash = hash('sha256', $token);
    $row = db_one('SELECT s.*, u.id AS uid, u.email, u.name, u.is_active, u.created_at AS u_created, u.last_login_at
        FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?', [$hash]);
    $now = avo_now();
    if (!$row) return $cache = null;
    if ((int) $row['expires_at'] < $now || (int) $row['last_seen_at'] + AVO_SESSION_IDLE < $now || !(int) $row['is_active']) {
        db_exec('DELETE FROM sessions WHERE token_hash = ?', [$hash]);
        return $cache = null;
    }
    if ($now - (int) $row['last_seen_at'] > 60) {
        db_exec('UPDATE sessions SET last_seen_at = ? WHERE token_hash = ?', [$now, $hash]);
    }
    return $cache = [
        'token_hash' => $hash,
        'csrf' => (string) $row['csrf'],
        'user_id' => (int) $row['uid'],
        'user' => [
            'id' => (int) $row['uid'], 'email' => $row['email'], 'name' => $row['name'], 'is_active' => (int) $row['is_active'],
            'created_at' => (int) $row['u_created'], 'last_login_at' => $row['last_login_at'],
        ],
    ];
}

function avo_require_session(): array
{
    $s = avo_session();
    if (!$s) avo_fail(401, 'unauthorized', 'Please sign in again.');
    return $s;
}

/** Kill every session of a user except (optionally) the current one. */
function avo_kill_sessions(int $userId, ?string $exceptHash = null): void
{
    if ($exceptHash) {
        db_exec('DELETE FROM sessions WHERE user_id = ? AND token_hash <> ?', [$userId, $exceptHash]);
    } else {
        db_exec('DELETE FROM sessions WHERE user_id = ?', [$userId]);
    }
}

function avo_password_problem(string $pw): ?string
{
    if (mb_strlen($pw) < AVO_PASSWORD_MIN) return 'Use at least ' . AVO_PASSWORD_MIN . ' characters.';
    if (strlen($pw) > 200) return 'Use at most 200 characters.';
    return null;
}

/** Progressive delay 1,2,4…30 s after failures in the last 15 min, per IP and per email. No lockout. */
function avo_login_delay(string $email): int
{
    $since = avo_now() - AVO_LOGIN_WINDOW;
    $byIp = (int) db_val('SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND at > ?', [avo_ip(), $since]);
    $byEmail = (int) db_val('SELECT COUNT(*) FROM login_attempts WHERE email = ? AND at > ?', [strtolower($email), $since]);
    $n = max($byIp, $byEmail);
    return $n <= 0 ? 0 : (int) min(30, 2 ** ($n - 1));
}

function avo_login(array $body): array
{
    $email = is_string($body['email'] ?? null) ? strtolower(trim($body['email'])) : '';
    $password = is_string($body['password'] ?? null) ? $body['password'] : '';
    if ($email === '' || $password === '') {
        avo_fail(400, 'invalid', 'Enter your email and password.');
    }
    $delay = avo_login_delay($email);
    if ($delay > 0) sleep($delay);
    if (mt_rand(1, 50) === 1) {
        db_exec('DELETE FROM login_attempts WHERE at < ?', [avo_now() - 86400]);
    }
    $user = db_one('SELECT * FROM users WHERE email = ?', [$email]);
    $ok = password_verify($password, $user ? (string) $user['pass_hash'] : avo_dummy_hash());
    if (!$user || !$ok || !(int) $user['is_active']) {
        db_exec('INSERT INTO login_attempts(ip,email,at) VALUES(?,?,?)', [avo_ip(), $email, avo_now()]);
        avo_log('info', 'login failed', ['email' => $email, 'ip' => avo_ip()]);
        avo_fail(401, 'login_failed', AVO_LOGIN_FAILED);
    }
    if (password_needs_rehash((string) $user['pass_hash'], PASSWORD_DEFAULT)) {
        db_exec('UPDATE users SET pass_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $user['id']]);
    }
    db_exec('DELETE FROM login_attempts WHERE email = ?', [$email]);
    db_exec('UPDATE users SET last_login_at = ? WHERE id = ?', [avo_now(), $user['id']]);
    $s = avo_session_create((int) $user['id']);
    avo_audit((int) $user['id'], 'login', 'user:' . $user['id']);
    $user = db_one('SELECT * FROM users WHERE id = ?', [$user['id']]);
    return ['user' => avo_user_public($user), 'csrf' => $s['csrf']];
}

function avo_logout(): array
{
    $s = avo_session();
    if ($s) db_exec('DELETE FROM sessions WHERE token_hash = ?', [$s['token_hash']]);
    avo_set_cookie('', 1);
    return ['ok' => true];
}

function avo_me(): array
{
    $s = avo_require_session();
    return ['user' => avo_user_public(db_one('SELECT * FROM users WHERE id = ?', [$s['user_id']])), 'csrf' => $s['csrf']];
}

function avo_change_password(array $s, array $body): array
{
    $current = is_string($body['current'] ?? null) ? $body['current'] : '';
    $next = is_string($body['next'] ?? null) ? $body['next'] : '';
    $user = db_one('SELECT * FROM users WHERE id = ?', [$s['user_id']]);
    if (!password_verify($current, (string) $user['pass_hash'])) {
        avo_fail(400, 'invalid', 'Your current password is not correct.', ['current' => 'Not correct.']);
    }
    if ($p = avo_password_problem($next)) avo_fail(400, 'invalid', 'New password: ' . $p, ['next' => $p]);
    db_exec('UPDATE users SET pass_hash = ? WHERE id = ?', [password_hash($next, PASSWORD_DEFAULT), $s['user_id']]);
    avo_kill_sessions($s['user_id'], $s['token_hash']);
    avo_audit($s['user_id'], 'password.change', 'user:' . $s['user_id']);
    return ['ok' => true];
}

/** Always the same answer, whether or not the email exists (spec §13.4). */
function avo_forgot(array $body): array
{
    $email = is_string($body['email'] ?? null) ? strtolower(trim($body['email'])) : '';
    $answer = ['ok' => true, 'message' => 'If that email belongs to an account, a reset link is on its way.'];
    if (!avo_valid_email($email)) return $answer;
    $user = db_one('SELECT * FROM users WHERE email = ? AND is_active = 1', [$email]);
    if (!$user) return $answer;
    $recent = (int) db_val('SELECT COUNT(*) FROM password_resets WHERE user_id = ? AND created_at > ?', [$user['id'], avo_now() - 3600]);
    if ($recent >= 3) {
        avo_log('info', 'forgot-password rate limited', ['user' => $user['id']]);
        return $answer;
    }
    $token = avo_hex_token(32);
    db_exec('INSERT INTO password_resets(token_hash,user_id,created_at,expires_at) VALUES(?,?,?,?)', [
        hash('sha256', $token), $user['id'], avo_now(), avo_now() + AVO_RESET_TTL,
    ]);
    $link = AVO_SITE_URL . '/admin/reset?token=' . $token;
    $name = $user['name'] !== '' ? $user['name'] : 'there';
    $text = "Hello $name,\n\nSomeone (hopefully you) asked to reset the password of your avoliveoil.com control panel account.\n\n"
        . "Open this link within 30 minutes to choose a new password:\n$link\n\n"
        . "If you did not ask for this, ignore this email - your password stays the same.\n";
    $html = '<p>Hello ' . htmlspecialchars($name) . ',</p><p>Someone (hopefully you) asked to reset the password of your '
        . 'avoliveoil.com control panel account.</p><p><a href="' . htmlspecialchars($link) . '">Choose a new password</a> '
        . '(the link works for 30 minutes, once).</p><p>If you did not ask for this, ignore this email - your password stays the same.</p>';
    avo_mail_send([$user['email']], 'Reset your avoliveoil.com control panel password', $text, $html, null, 'password-reset');
    avo_audit((int) $user['id'], 'password.forgot', 'user:' . $user['id']);
    return $answer;
}

function avo_reset_password(array $body): array
{
    $token = is_string($body['token'] ?? null) ? trim($body['token']) : '';
    $password = is_string($body['password'] ?? null) ? $body['password'] : '';
    $bad = 'This reset link is invalid or has expired. Ask for a new one.';
    if (!preg_match('/^[0-9a-f]{64}$/', $token)) avo_fail(400, 'invalid_token', $bad);
    if ($p = avo_password_problem($password)) avo_fail(400, 'invalid', 'New password: ' . $p, ['password' => $p]);
    return db_tx(function () use ($token, $password, $bad) {
        $row = db_one('SELECT r.*, u.is_active FROM password_resets r JOIN users u ON u.id = r.user_id WHERE r.token_hash = ?', [hash('sha256', $token)]);
        if (!$row || $row['used_at'] !== null || (int) $row['expires_at'] < avo_now() || !(int) $row['is_active']) {
            avo_fail(400, 'invalid_token', $bad);
        }
        db_exec('UPDATE password_resets SET used_at = ? WHERE token_hash = ?', [avo_now(), $row['token_hash']]);
        db_exec('UPDATE users SET pass_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $row['user_id']]);
        avo_kill_sessions((int) $row['user_id']);
        avo_audit((int) $row['user_id'], 'password.reset', 'user:' . $row['user_id']);
        return ['ok' => true];
    });
}

// ---------------------------------------------------------------- first admin (spec §13.4)

function avo_setup_dir(): string
{
    return AVO_API_DIR . '/_setup';
}

function avo_needs_setup(): bool
{
    return (int) db_val('SELECT COUNT(*) FROM users') === 0;
}

/**
 * POST /api/setup {token,email,name,password}
 *  - <token>.token + no users yet  → create the first admin and sign in
 *  - <token>.reset (emergency)     → reset that user's password (re-activates it), kill its sessions
 * The file is deleted on use either way.
 */
function avo_setup(array $body): array
{
    $token = is_string($body['token'] ?? null) ? strtolower(trim($body['token'])) : '';
    $invalid = 'This setup code is not valid. Check the code from the setup file and try again.';
    if (!preg_match('/^[0-9a-f]{64}$/', $token)) avo_fail(403, 'invalid_token', $invalid);
    $tokenFile = avo_setup_dir() . '/' . $token . '.token';
    $resetFile = avo_setup_dir() . '/' . $token . '.reset';
    $email = is_string($body['email'] ?? null) ? strtolower(trim($body['email'])) : '';
    $password = is_string($body['password'] ?? null) ? $body['password'] : '';
    if (!avo_valid_email($email)) avo_fail(400, 'invalid', 'Enter a valid email address.', ['email' => 'Enter a valid email address.']);
    if ($p = avo_password_problem($password)) avo_fail(400, 'invalid', 'Password: ' . $p, ['password' => $p]);

    if (is_file($resetFile)) {
        $user = db_one('SELECT * FROM users WHERE email = ?', [$email]);
        if (!$user) avo_fail(404, 'not_found', 'No account uses that email address.', ['email' => 'No account uses that email.']);
        db_exec('UPDATE users SET pass_hash = ?, is_active = 1 WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $user['id']]);
        avo_kill_sessions((int) $user['id']);
        @unlink($resetFile);
        avo_audit((int) $user['id'], 'setup.reset', 'user:' . $user['id']);
        avo_log('warn', 'emergency password reset used', ['user' => $user['id']]);
        $s = avo_session_create((int) $user['id']);
        return ['user' => avo_user_public(db_one('SELECT * FROM users WHERE id = ?', [$user['id']])), 'csrf' => $s['csrf']];
    }
    if (!avo_needs_setup()) avo_fail(409, 'already_setup', 'The control panel is already set up. Sign in instead.');
    if (!is_file($tokenFile)) avo_fail(403, 'invalid_token', $invalid);
    $name = is_string($body['name'] ?? null) ? mb_substr(trim(avo_clean_text($body['name'])), 0, 80) : '';
    $id = db_tx(function () use ($email, $name, $password) {
        if ((int) db_val('SELECT COUNT(*) FROM users') > 0) {
            avo_fail(409, 'already_setup', 'The control panel is already set up. Sign in instead.');
        }
        db_exec('INSERT INTO users(email,name,pass_hash,is_active,created_at,last_login_at) VALUES(?,?,?,1,?,?)', [
            $email, $name, password_hash($password, PASSWORD_DEFAULT), avo_now(), avo_now(),
        ]);
        return (int) db()->lastInsertId();
    });
    @unlink($tokenFile);
    avo_audit($id, 'setup', 'user:' . $id);
    $s = avo_session_create($id);
    return ['user' => avo_user_public(db_one('SELECT * FROM users WHERE id = ?', [$id])), 'csrf' => $s['csrf']];
}
