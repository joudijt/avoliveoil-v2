<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

function avo_users_list(): array
{
    return array_map('avo_user_public', db_all('SELECT * FROM users ORDER BY id'));
}

function avo_user_create(array $s, array $body): array
{
    $email = strtolower(avo_str($body, 'email', 254, true, 'Email'));
    if (!avo_valid_email($email)) avo_fail(400, 'invalid', 'Enter a valid email address.', ['email' => 'Enter a valid email address.']);
    $name = avo_str($body, 'name', 80, false, 'Name');
    $password = is_string($body['password'] ?? null) ? $body['password'] : '';
    if ($p = avo_password_problem($password)) avo_fail(400, 'invalid', 'Password: ' . $p, ['password' => $p]);
    if (db_one('SELECT id FROM users WHERE email = ?', [$email])) {
        avo_fail(409, 'duplicate', 'Another user already has this email address.', ['email' => 'Already used.']);
    }
    db_exec('INSERT INTO users(email,name,pass_hash,is_active,created_at) VALUES(?,?,?,1,?)', [
        $email, $name, password_hash($password, PASSWORD_DEFAULT), avo_now(),
    ]);
    $id = (int) db()->lastInsertId();
    avo_audit($s['user_id'], 'user.create', 'user:' . $id, $email);
    return avo_user_public(db_one('SELECT * FROM users WHERE id = ?', [$id]));
}

function avo_user_update(array $s, int $id, array $body): array
{
    return db_tx(function () use ($s, $id, $body) {
        $user = db_one('SELECT * FROM users WHERE id = ?', [$id]);
        if (!$user) avo_fail(404, 'not_found', 'This user no longer exists.');
        $killOthers = false;
        if (array_key_exists('name', $body)) {
            db_exec('UPDATE users SET name = ? WHERE id = ?', [avo_str($body, 'name', 80, false, 'Name'), $id]);
        }
        if (array_key_exists('email', $body)) {
            $email = strtolower(avo_str($body, 'email', 254, true, 'Email'));
            if (!avo_valid_email($email)) avo_fail(400, 'invalid', 'Enter a valid email address.', ['email' => 'Enter a valid email address.']);
            if (db_one('SELECT id FROM users WHERE email = ? AND id <> ?', [$email, $id])) {
                avo_fail(409, 'duplicate', 'Another user already has this email address.', ['email' => 'Already used.']);
            }
            db_exec('UPDATE users SET email = ? WHERE id = ?', [$email, $id]);
        }
        if (array_key_exists('isActive', $body)) {
            $active = (bool) $body['isActive'];
            if (!$active && (int) $user['is_active']) {
                $others = (int) db_val('SELECT COUNT(*) FROM users WHERE is_active = 1 AND id <> ?', [$id]);
                if ($others === 0) {
                    avo_fail(409, 'last_user', 'You cannot deactivate the last active user. Add another user first.');
                }
                if ($id === $s['user_id']) {
                    avo_fail(409, 'self', 'You cannot deactivate your own account. Ask another user to do it.');
                }
                $killOthers = true;
            }
            db_exec('UPDATE users SET is_active = ? WHERE id = ?', [$active ? 1 : 0, $id]);
        }
        if (array_key_exists('password', $body)) {
            $pw = is_string($body['password']) ? $body['password'] : '';
            if ($p = avo_password_problem($pw)) avo_fail(400, 'invalid', 'Password: ' . $p, ['password' => $p]);
            db_exec('UPDATE users SET pass_hash = ? WHERE id = ?', [password_hash($pw, PASSWORD_DEFAULT), $id]);
            $killOthers = true;
        }
        if ($killOthers) {
            avo_kill_sessions($id, $id === $s['user_id'] ? $s['token_hash'] : null);
        }
        avo_audit($s['user_id'], 'user.update', 'user:' . $id, implode(',', array_keys($body)));
        return avo_user_public(db_one('SELECT * FROM users WHERE id = ?', [$id]));
    });
}

function avo_user_name(?int $id): ?string
{
    static $cache = [];
    if ($id === null) return null;
    if (!array_key_exists($id, $cache)) {
        $u = db_one('SELECT name, email FROM users WHERE id = ?', [$id]);
        $cache[$id] = $u ? ($u['name'] !== '' ? $u['name'] : $u['email']) : null;
    }
    return $cache[$id];
}
