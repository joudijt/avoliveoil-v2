<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

const AVO_FORM_REDIRECT_RE = '~^/(en|ms)(/[a-z0-9]+(?:-[a-z0-9]+)*){0,3}$~';   // contracts.ts FORM_REDIRECT_RE
const AVO_FORM_HONEYPOT = 'company_website';
const AVO_FIELD_TYPES = ['text', 'email', 'tel', 'textarea', 'select', 'radio', 'checkbox', 'number', 'date'];
const AVO_FIELD_RESERVED = [AVO_FORM_HONEYPOT, 'page', 'page_id', 'pageid', 'lang', 'form_id', 'fields', 'elapsedms'];

function avo_validate_recipients(mixed $list): array
{
    $msg = 'Add 1 to 5 valid email addresses that should receive the entries.';
    if (is_string($list)) $list = preg_split('/[\s,;]+/', $list, -1, PREG_SPLIT_NO_EMPTY);
    if (!is_array($list)) avo_fail(400, 'invalid', $msg, ['recipients' => $msg]);
    $out = [];
    foreach ($list as $e) {
        $e = is_string($e) ? strtolower(trim($e)) : '';
        if ($e === '') continue;
        if (!avo_valid_email($e)) avo_fail(400, 'invalid', '"' . mb_substr($e, 0, 80) . '" is not a valid email address.', ['recipients' => 'Check the email addresses.']);
        $out[$e] = true;
    }
    $out = array_keys($out);
    if (count($out) < 1 || count($out) > 5) avo_fail(400, 'invalid', $msg, ['recipients' => $msg]);
    return $out;
}

function avo_valid_localized(mixed $v, int $max, bool $requireEn = false): ?array
{
    if (!avo_is_localized($v) || !is_string($v['en']) || !is_string($v['ms'])) return null;
    $v = ['en' => trim(avo_clean_text($v['en'])), 'ms' => trim(avo_clean_text($v['ms']))];
    if (mb_strlen($v['en']) > $max || mb_strlen($v['ms']) > $max) return null;
    if ($requireEn && $v['en'] === '' && $v['ms'] === '') return null;
    return $v;
}

function avo_validate_form_def(mixed $def): array
{
    $bad = fn (string $m, string $path = 'def') => avo_fail(400, 'invalid', $m, [$path => $m]);
    if (!is_array($def) || !is_array($def['fields'] ?? null) || !array_is_list($def['fields'])) $bad('The form fields are damaged.');
    if (count($def['fields']) < 1) $bad('Add at least one field to the form.', 'def.fields');
    if (count($def['fields']) > 40) $bad('A form can have at most 40 fields.', 'def.fields');
    $names = [];
    $fields = [];
    foreach ($def['fields'] as $i => $f) {
        $p = "def.fields.$i";
        if (!is_array($f)) $bad('A field is damaged.', $p);
        $name = is_string($f['name'] ?? null) ? $f['name'] : '';
        if (!preg_match('/^[a-z0-9_]{1,40}$/', $name)) $bad('Field names may only use lowercase letters, numbers and _.', "$p.name");
        if (in_array($name, AVO_FIELD_RESERVED, true) || str_starts_with($name, '_')) $bad("The field name \"$name\" is reserved. Choose another.", "$p.name");
        if (isset($names[$name])) $bad("Two fields are called \"$name\". Each field needs its own name.", "$p.name");
        $names[$name] = true;
        $type = $f['type'] ?? '';
        if (!in_array($type, AVO_FIELD_TYPES, true)) $bad('Unknown field type.', "$p.type");
        $label = avo_valid_localized($f['label'] ?? null, 200, true);
        if (!$label) $bad('Every field needs a label.', "$p.label");
        $placeholder = avo_valid_localized($f['placeholder'] ?? ['en' => '', 'ms' => ''], 200) ?? $bad('The placeholder is too long.', "$p.placeholder");
        $field = [
            'id' => is_string($f['id'] ?? null) && $f['id'] !== '' ? mb_substr($f['id'], 0, 40) : 'f' . bin2hex(random_bytes(4)),
            'name' => $name,
            'type' => $type,
            'label' => $label,
            'placeholder' => $placeholder,
            'required' => (bool) ($f['required'] ?? false),
            'width' => ($f['width'] ?? 'full') === 'half' ? 'half' : 'full',
        ];
        if (in_array($type, ['select', 'radio'], true)) {
            $opts = $f['options'] ?? null;
            if (!is_array($opts) || !array_is_list($opts) || count($opts) < 1 || count($opts) > 50) $bad('Add 1 to 50 options.', "$p.options");
            $field['options'] = [];
            foreach ($opts as $j => $o) {
                $ol = avo_valid_localized($o['label'] ?? null, 200, true) ?? $bad('Every option needs a label.', "$p.options.$j");
                $oid = is_string($o['id'] ?? null) && preg_match('/^[A-Za-z0-9_-]{1,40}$/', $o['id']) ? $o['id'] : 'o' . bin2hex(random_bytes(4));
                $field['options'][] = ['id' => $oid, 'label' => $ol];
            }
        }
        if (isset($f['maxLength'])) {
            $field['maxLength'] = avo_int($f['maxLength'], 1, 5000, "$p.maxLength", 'Maximum length must be between 1 and 5000.');
        }
        $fields[] = $field;
    }
    $out = [
        'fields' => $fields,
        'submitLabel' => avo_valid_localized($def['submitLabel'] ?? null, 80, true) ?? $bad('Add a label for the send button.', 'def.submitLabel'),
        'successMessage' => avo_valid_localized($def['successMessage'] ?? null, 500, true) ?? $bad('Add the message shown after sending.', 'def.successMessage'),
    ];
    $redirect = $def['redirectPath'] ?? null;
    if ($redirect !== null && $redirect !== '') {
        if (!is_string($redirect) || !preg_match(AVO_FORM_REDIRECT_RE, $redirect)) {
            $bad('The page to open after sending must be a page of this site, like /en/thank-you.', 'def.redirectPath');
        }
        $out['redirectPath'] = $redirect;
    }
    return $out;
}

function avo_form_row(int $id): array
{
    $row = db_one('SELECT * FROM forms WHERE id = ? AND deleted_at IS NULL', [$id]);
    if (!$row) avo_fail(404, 'not_found', 'This form no longer exists.');
    return $row;
}

function avo_form_out(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => (string) $row['name'],
        'recipients' => json_decode((string) $row['recipients_json'], true) ?: [],
        'subject' => (string) $row['subject'],
        'def' => json_decode((string) $row['def_json'], true),
        'createdAt' => avo_iso((int) $row['created_at']),
        'updatedAt' => avo_iso((int) $row['updated_at']),
    ];
}

/** Non-trashed pages whose draft or published doc embeds the form. @return int[] */
function avo_form_usage(int $formId): array
{
    $ids = [];
    foreach (db_all('SELECT id, draft_json, published_json FROM pages WHERE deleted_at IS NULL') as $p) {
        $docs = [json_decode((string) $p['draft_json'], true) ?: []];
        if ($p['published_json'] !== null) $docs[] = json_decode((string) $p['published_json'], true) ?: [];
        foreach ($docs as $d) {
            if (in_array($formId, avo_doc_form_ids($d), true)) {
                $ids[] = (int) $p['id'];
                break;
            }
        }
    }
    return $ids;
}

function avo_forms_list(): array
{
    $out = [];
    foreach (db_all('SELECT * FROM forms WHERE deleted_at IS NULL ORDER BY name COLLATE NOCASE, id') as $r) {
        $out[] = [
            'id' => (int) $r['id'],
            'name' => (string) $r['name'],
            'recipients' => json_decode((string) $r['recipients_json'], true) ?: [],
            'subject' => (string) $r['subject'],
            'entries' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE form_id = ? AND mail_status <> 'spam'", [$r['id']]),
            'unread' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE form_id = ? AND read_at IS NULL AND mail_status <> 'spam'", [$r['id']]),
            'usedOn' => avo_form_usage((int) $r['id']),
            'updatedAt' => avo_iso((int) $r['updated_at']),
        ];
    }
    return $out;
}

function avo_form_input(array $body): array
{
    return [
        'name' => avo_str($body, 'name', 120, true, 'Form name'),
        'recipients' => avo_validate_recipients($body['recipients'] ?? null),
        'subject' => avo_str($body, 'subject', 150, false, 'Email subject'),
        'def' => avo_validate_form_def($body['def'] ?? null),
    ];
}

function avo_form_create(array $s, array $body): array
{
    $in = avo_form_input($body);
    $now = avo_now();
    db_exec('INSERT INTO forms(name,recipients_json,subject,def_json,created_at,updated_at) VALUES(?,?,?,?,?,?)', [
        $in['name'], json_encode($in['recipients']), $in['subject'], json_encode($in['def'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $now, $now,
    ]);
    $id = (int) db()->lastInsertId();
    avo_audit($s['user_id'], 'form.create', 'form:' . $id, $in['name']);
    return avo_form_out(avo_form_row($id));
}

/** Saving a form marks every published page that embeds it for re-render (spec §7.4). */
function avo_form_update(array $s, int $id, array $body): array
{
    $in = avo_form_input($body);
    $dirty = db_tx(function () use ($id, $in) {
        avo_form_row($id);
        db_exec('UPDATE forms SET name = ?, recipients_json = ?, subject = ?, def_json = ?, updated_at = ? WHERE id = ?', [
            $in['name'], json_encode($in['recipients']), $in['subject'], json_encode($in['def'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), avo_now(), $id,
        ]);
        $dirty = avo_mark_dependants('form:' . $id);
        avo_bump_version();
        return $dirty;
    });
    avo_after_publish();
    avo_audit($s['user_id'], 'form.update', 'form:' . $id);
    return avo_form_out(avo_form_row($id)) + ['dirtyPages' => $dirty];
}

function avo_form_delete(array $s, int $id): array
{
    avo_form_row($id);
    $used = avo_form_usage($id);
    if ($used) {
        $names = array_map(fn ($pid) => (string) db_val('SELECT slug FROM pages WHERE id = ?', [$pid]), $used);
        avo_fail(409, 'in_use', 'This form is used on: ' . implode(', ', $names) . '. Remove it from those pages first.', ['pages' => implode(',', $used)]);
    }
    db_exec('UPDATE forms SET deleted_at = ? WHERE id = ?', [avo_now(), $id]);
    avo_audit($s['user_id'], 'form.delete', 'form:' . $id);
    return ['ok' => true];
}

function avo_form_test_email(array $s, int $id): array
{
    $form = avo_form_out(avo_form_row($id));
    $rows = [];
    foreach ($form['def']['fields'] as $f) {
        $rows[] = [$f['label']['en'] ?: $f['name'], match ($f['type']) {
            'email' => 'visitor@example.com',
            'tel' => '+60 12-345 6789',
            'number' => '3',
            'date' => gmdate('Y-m-d'),
            'checkbox' => 'Yes',
            'select', 'radio' => $f['options'][0]['label']['en'] ?? 'Option',
            'textarea' => "This is a test message from the control panel.\nIt checks that entries reach this inbox.",
            default => 'Test',
        }];
    }
    $subject = '[Website] [TEST] ' . ($form['subject'] !== '' ? $form['subject'] : $form['name']);
    $mail = avo_mail_compose_entry($rows, 'Test email sent from the avoliveoil.com control panel for the form "' . $form['name'] . '".');
    $res = avo_mail_send($form['recipients'], $subject, $mail['text'], $mail['html'], null, 'form-test');
    if ($res['status'] === 'held') {
        avo_fail(429, 'mail_cap', 'The hourly email limit was reached. Try the test again in an hour.');
    }
    if ($res['status'] !== 'sent') {
        avo_fail(502, 'mail_failed', 'The test email could not be sent: ' . ($res['error'] ?? 'unknown error') . '.');
    }
    avo_audit($s['user_id'], 'form.test-email', 'form:' . $id);
    return ['sentTo' => $form['recipients']];
}
