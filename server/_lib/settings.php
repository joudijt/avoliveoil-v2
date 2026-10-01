<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

function avo_setting(string $key, ?string $default = null): ?string
{
    $v = db_val('SELECT value FROM settings WHERE key = ?', [$key]);
    return $v === null ? $default : (string) $v;
}

function avo_setting_set(string $key, string $value): void
{
    db_exec('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', [$key, $value]);
}

/** System email default = the first admin's email (spec §13.5). */
function avo_settings_get(): array
{
    $first = db_val('SELECT email FROM users ORDER BY id LIMIT 1');
    return [
        'systemEmail' => (string) avo_setting('systemEmail', $first === null ? '' : (string) $first),
        'mailCapPerHour' => (int) avo_setting('mailCapPerHour', '40'),
    ];
}

function avo_settings_save(array $s, array $body): array
{
    if (array_key_exists('systemEmail', $body)) {
        $email = is_string($body['systemEmail']) ? strtolower(trim($body['systemEmail'])) : '';
        if ($email !== '' && !avo_valid_email($email)) {
            avo_fail(400, 'invalid', 'Enter a valid email address.', ['systemEmail' => 'Enter a valid email address.']);
        }
        avo_setting_set('systemEmail', $email);
    }
    if (array_key_exists('mailCapPerHour', $body)) {
        $cap = avo_int($body['mailCapPerHour'], 1, 500, 'mailCapPerHour', 'Use a number between 1 and 500.');
        avo_setting_set('mailCapPerHour', (string) $cap);
    }
    avo_audit($s['user_id'], 'settings.save', null, json_encode($body));
    return avo_settings_get();
}
