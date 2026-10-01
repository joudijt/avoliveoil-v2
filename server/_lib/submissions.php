<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

const AVO_SUBMIT_MAX_BYTES = 65536;
const AVO_SUBMIT_PER_10MIN = 5;
const AVO_SUBMIT_PER_DAY = 30;
const AVO_SUBMIT_MAX_URLS = 3;

/**
 * POST /api/forms/{id}/submit — public (spec §7.2, §13.4).
 * JSON body (src/cms/blocks/FormBlock.tsx): {fields:{name:value}, page, lang, company_website, elapsedMs}
 *   (pageId / page_id and a flat {name:value} body are accepted too)
 * urlencoded (no-JS fallback): name=value&_page=&_lang=&_widget=&company_website= → 303 back to the
 *   embedding CMS page with #form-sent-<w> / #form-error-<w>, never to Referer. <w> is the form
 *   WIDGET id from _widget (LP-SPEC §8 M3: one form may sit on a page twice); else the form id.
 * @return array{status:int, json?:array, location?:string}
 */
function avo_form_submit(int $formId): array
{
    $ctype = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    $isForm = str_starts_with($ctype, 'application/x-www-form-urlencoded') || str_starts_with($ctype, 'multipart/form-data');
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > AVO_SUBMIT_MAX_BYTES) {
        avo_fail(413, 'too_large', 'Your message is too long. Please shorten it and try again.');
    }
    if ($isForm) {
        $in = $_POST;
        $values = $in;
    } else {
        $raw = avo_body_raw(AVO_SUBMIT_MAX_BYTES);
        $in = json_decode($raw, true);
        if (!is_array($in)) avo_fail(400, 'bad_json', 'The form could not be read. Reload the page and try again.');
        $values = is_array($in['fields'] ?? null) ? $in['fields'] : $in;
    }
    $langIn = $in['lang'] ?? ($in['_lang'] ?? null);
    $lang = in_array($langIn, AVO_LANGS, true) ? $langIn : 'en';
    $honeypot = $in[AVO_FORM_HONEYPOT] ?? ($values[AVO_FORM_HONEYPOT] ?? '');
    $pageIdIn = $in['page'] ?? ($in['pageId'] ?? ($in['page_id'] ?? ($in['_page'] ?? null)));

    $formRow = db_one('SELECT * FROM forms WHERE id = ? AND deleted_at IS NULL', [$formId]);
    if (!$formRow) avo_fail(404, 'not_found', 'This form is no longer available.');
    $def = json_decode((string) $formRow['def_json'], true) ?: ['fields' => []];

    // The no-JS redirect target: only a published CMS page that really embeds this form.
    $page = null;
    if (is_numeric($pageIdIn)) {
        $p = db_one("SELECT id, slug, langs_json, published_json FROM pages WHERE id = ? AND status = 'published' AND deleted_at IS NULL", [(int) $pageIdIn]);
        if ($p && in_array($formId, avo_doc_form_ids(json_decode((string) $p['published_json'], true) ?: []), true)) $page = $p;
    }
    $widgetIn = $in['_widget'] ?? null;
    $anchor = is_string($widgetIn) && preg_match('/^[A-Za-z0-9_-]{1,64}$/', $widgetIn) ? $widgetIn : (string) $formId;
    $back = function (string $hash) use ($page, $lang): string {
        if ($page && in_array($lang, json_decode((string) $page['langs_json'], true) ?: [], true)) {
            return '/' . $lang . '/' . $page['slug'] . $hash;
        }
        return '/' . $lang . $hash;
    };

    $ipHash = hash_hmac('sha256', avo_ip(), avo_secret());
    $now = avo_now();
    $recent = (int) db_val('SELECT COUNT(*) FROM submissions WHERE ip_hash = ? AND created_at > ?', [$ipHash, $now - 600]);
    $today = (int) db_val('SELECT COUNT(*) FROM submissions WHERE ip_hash = ? AND created_at > ?', [$ipHash, $now - 86400]);
    if ($recent >= AVO_SUBMIT_PER_10MIN || $today >= AVO_SUBMIT_PER_DAY) {
        if ($isForm) return ['status' => 303, 'location' => $back('#form-error-' . $anchor)];
        avo_fail(429, 'rate_limited', $lang === 'ms'
            ? 'Terlalu banyak mesej dihantar. Sila cuba lagi kemudian.'
            : 'Too many messages were sent from your connection. Please try again later.', null, ['Retry-After' => '600']);
    }

    $success = function () use ($def, $lang, $isForm, $back, $anchor): array {
        $msg = avo_loc($def['successMessage'] ?? null, $lang) ?: avo_loc($def['successMessage'] ?? null, 'en') ?: 'Thank you!';
        $redirect = isset($def['redirectPath']) && is_string($def['redirectPath']) && preg_match(AVO_FORM_REDIRECT_RE, $def['redirectPath']) ? $def['redirectPath'] : null;
        if ($isForm) return ['status' => 303, 'location' => $redirect ?? $back('#form-sent-' . $anchor)];
        return ['status' => 200, 'json' => ['ok' => true, 'message' => $msg] + ($redirect ? ['redirectPath' => $redirect] : [])];
    };

    $data = [];
    $labels = [];
    $errors = [];
    $replyTo = null;
    foreach ($def['fields'] ?? [] as $f) {
        $name = (string) $f['name'];
        $label = avo_loc($f['label'] ?? null, $lang) ?: avo_loc($f['label'] ?? null, 'en') ?: $name;
        $labels[$name] = $label;
        $raw = $values[$name] ?? null;
        if (is_array($raw) || is_object($raw)) {
            $errors[$name] = 'Invalid value.';
            continue;
        }
        $type = (string) $f['type'];
        $req = !empty($f['required']);
        if ($type === 'checkbox') {
            $on = in_array(strtolower(trim((string) ($raw === true ? '1' : ($raw ?? '')))), ['1', 'on', 'true', 'yes'], true);
            if ($req && !$on) $errors[$name] = $lang === 'ms' ? 'Sila tandakan kotak ini.' : 'Please tick this box.';
            $data[$name] = $on ? 'Yes' : 'No';
            continue;
        }
        $v = $raw === null ? '' : trim(avo_clean_text((string) $raw, $type === 'textarea'));
        if ($v === '') {
            if ($req) $errors[$name] = $lang === 'ms' ? 'Ruangan ini wajib diisi.' : 'This field is required.';
            $data[$name] = '';
            continue;
        }
        $max = min((int) ($f['maxLength'] ?? 5000), $type === 'textarea' ? 5000 : 2000);
        if (mb_strlen($v) > $max) {
            $errors[$name] = $lang === 'ms' ? "Maksimum $max aksara." : "Maximum $max characters.";
            continue;
        }
        switch ($type) {
            case 'email':
                if (!avo_valid_email($v)) $errors[$name] = $lang === 'ms' ? 'Masukkan alamat e-mel yang sah.' : 'Enter a valid email address.';
                elseif ($replyTo === null) $replyTo = $v;
                break;
            case 'tel':
                if (!preg_match('/^[0-9+()\-\s.]{5,30}$/', $v)) $errors[$name] = $lang === 'ms' ? 'Masukkan nombor telefon yang sah.' : 'Enter a valid phone number.';
                break;
            case 'number':
                if (!is_numeric($v)) $errors[$name] = $lang === 'ms' ? 'Masukkan nombor.' : 'Enter a number.';
                break;
            case 'date':
                if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $v, $m) || !checkdate((int) $m[2], (int) $m[3], (int) $m[1])) {
                    $errors[$name] = $lang === 'ms' ? 'Masukkan tarikh yang sah.' : 'Enter a valid date.';
                }
                break;
            case 'select':
            case 'radio':
                $match = null;
                foreach ($f['options'] ?? [] as $o) {
                    if ($v === ($o['id'] ?? null) || $v === avo_loc($o['label'] ?? null, 'en') || $v === avo_loc($o['label'] ?? null, 'ms')) {
                        $match = avo_loc($o['label'] ?? null, $lang) ?: avo_loc($o['label'] ?? null, 'en');
                        break;
                    }
                }
                if ($match === null) $errors[$name] = $lang === 'ms' ? 'Pilih salah satu pilihan.' : 'Choose one of the options.';
                else $v = $match;
                break;
        }
        $data[$name] = $v;
    }

    $isHoneypot = is_string($honeypot) ? trim($honeypot) !== '' : !empty($honeypot);
    if (!$isHoneypot && $errors) {
        if ($isForm) return ['status' => 303, 'location' => $back('#form-error-' . $anchor)];
        avo_fail(422, 'invalid', $lang === 'ms' ? 'Sila semak ruangan yang ditanda.' : 'Please check the highlighted fields.', $errors);
    }
    $urls = preg_match_all('~(https?://|www\.)~i', implode(' ', array_map('strval', $data)));
    $spam = $isHoneypot || $urls > AVO_SUBMIT_MAX_URLS;

    db_exec('INSERT INTO submissions(form_id,page_id,lang,data_json,labels_json,ip_hash,ua,created_at,mail_status) VALUES(?,?,?,?,?,?,?,?,?)', [
        $formId, $page ? (int) $page['id'] : null, $lang, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        json_encode($labels, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), $ipHash, avo_ua(), $now, $spam ? 'spam' : 'pending',
    ]);
    $subId = (int) db()->lastInsertId();
    if ($spam) {
        avo_log('info', 'submission marked spam', ['id' => $subId, 'honeypot' => $isHoneypot, 'urls' => $urls]);
        return $success();
    }
    avo_submission_mail($subId);
    return $success();
}

/** Mail one stored submission to its form's recipients; records the result. */
function avo_submission_mail(int $subId): array
{
    $sub = db_one('SELECT * FROM submissions WHERE id = ?', [$subId]);
    if (!$sub) avo_fail(404, 'not_found', 'This entry no longer exists.');
    $form = db_one('SELECT * FROM forms WHERE id = ?', [$sub['form_id']]);
    if (!$form) {
        db_exec("UPDATE submissions SET mail_status = 'failed', mail_error = ? WHERE id = ?", ['The form was deleted', $subId]);
        return ['status' => 'failed', 'error' => 'The form was deleted'];
    }
    $data = json_decode((string) $sub['data_json'], true) ?: [];
    $labels = json_decode((string) ($sub['labels_json'] ?? '{}'), true) ?: [];
    $def = json_decode((string) $form['def_json'], true) ?: ['fields' => []];
    $rows = [];
    $replyTo = null;
    foreach ($data as $name => $value) {
        $rows[] = [$labels[$name] ?? $name, (string) $value];
    }
    foreach ($def['fields'] ?? [] as $f) {
        if (($f['type'] ?? '') === 'email' && avo_valid_email((string) ($data[$f['name']] ?? ''))) {
            $replyTo = (string) $data[$f['name']];
            break;
        }
    }
    $pageTitle = 'website';
    if ($sub['page_id'] !== null) {
        $p = db_one('SELECT slug, published_json FROM pages WHERE id = ?', [$sub['page_id']]);
        if ($p) {
            $doc = json_decode((string) ($p['published_json'] ?? '{}'), true) ?: [];
            $pageTitle = avo_loc($doc['title'] ?? null, (string) $sub['lang']) ?: (string) $p['slug'];
        }
    }
    $subject = '[Website] ' . ((string) $form['subject'] !== '' ? $form['subject'] : $form['name']) . ' — ' . $pageTitle;
    $intro = 'New entry from the form "' . $form['name'] . '" on ' . ($pageTitle === 'website' ? 'the website' : 'the page "' . $pageTitle . '"')
        . ' (' . ($sub['lang'] === 'ms' ? 'Malay' : 'English') . '), ' . gmdate('Y-m-d H:i', (int) $sub['created_at'] + 8 * 3600) . ' Malaysia time.';
    $mail = avo_mail_compose_entry($rows, $intro);
    $recipients = json_decode((string) $form['recipients_json'], true) ?: [];
    $res = avo_mail_send($recipients, $subject, $mail['text'], $mail['html'], $replyTo, 'submission');
    db_exec('UPDATE submissions SET mail_status = ?, mail_error = ? WHERE id = ?', [$res['status'], $res['error'], $subId]);
    return $res;
}

function avo_submission_out(array $r, array &$forms, array &$pages): array
{
    $fid = (int) $r['form_id'];
    $forms[$fid] ??= db_one('SELECT name FROM forms WHERE id = ?', [$fid])['name'] ?? '(deleted form)';
    $page = null;
    if ($r['page_id'] !== null) {
        $pid = (int) $r['page_id'];
        if (!array_key_exists($pid, $pages)) {
            $p = db_one('SELECT slug, draft_json FROM pages WHERE id = ?', [$pid]);
            $pages[$pid] = $p ? ['slug' => $p['slug'], 'title' => avo_loc((json_decode((string) $p['draft_json'], true) ?: [])['title'] ?? null, 'en')] : null;
        }
        $page = $pages[$pid];
    }
    return [
        'id' => (int) $r['id'],
        'formId' => $fid,
        'formName' => $forms[$fid],
        'pageId' => $r['page_id'] !== null ? (int) $r['page_id'] : null,
        'pageTitle' => $page['title'] ?? null,
        'pageSlug' => $page['slug'] ?? null,
        'lang' => $r['lang'],
        'data' => (object) (json_decode((string) $r['data_json'], true) ?: []),
        'labels' => (object) (json_decode((string) ($r['labels_json'] ?? '{}'), true) ?: []),
        'createdAt' => avo_iso((int) $r['created_at']),
        'readAt' => avo_iso($r['read_at'] !== null ? (int) $r['read_at'] : null),
        'mailStatus' => $r['mail_status'],
        'mailError' => $r['mail_error'],
    ];
}

/** @return array{0:string,1:array} WHERE clause + params for the inbox filters */
function avo_submission_filter(array $q): array
{
    $where = ['1=1'];
    $args = [];
    if (isset($q['form']) && is_numeric($q['form'])) {
        $where[] = 'form_id = ?';
        $args[] = (int) $q['form'];
    }
    if (isset($q['page']) && is_numeric($q['page'])) {
        $where[] = 'page_id = ?';
        $args[] = (int) $q['page'];
    }
    if (!empty($q['unread']) && $q['unread'] !== '0' && $q['unread'] !== 'false') $where[] = 'read_at IS NULL';
    $status = (string) ($q['status'] ?? '');
    if (in_array($status, ['sent', 'failed', 'held', 'spam', 'pending'], true)) {
        $where[] = 'mail_status = ?';
        $args[] = $status;
    } else {
        $where[] = "mail_status <> 'spam'";
    }
    return [implode(' AND ', $where), $args];
}

function avo_submissions_list(array $q): array
{
    [$where, $args] = avo_submission_filter($q);
    $limit = isset($q['limit']) && is_numeric($q['limit']) ? max(1, min(500, (int) $q['limit'])) : 50;
    $offset = isset($q['offset']) && is_numeric($q['offset']) ? max(0, (int) $q['offset']) : 0;
    $rows = db_all("SELECT * FROM submissions WHERE $where ORDER BY created_at DESC, id DESC LIMIT $limit OFFSET $offset", $args);
    $forms = [];
    $pages = [];
    $items = [];
    foreach ($rows as $r) $items[] = avo_submission_out($r, $forms, $pages);
    return [
        'items' => $items,
        'total' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE $where", $args),
        'unread' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE read_at IS NULL AND mail_status <> 'spam'"),
    ];
}

function avo_submission_patch(array $s, int $id, array $body): array
{
    if (!db_one('SELECT id FROM submissions WHERE id = ?', [$id])) avo_fail(404, 'not_found', 'This entry no longer exists.');
    if (array_key_exists('read', $body)) {
        db_exec('UPDATE submissions SET read_at = ? WHERE id = ?', [$body['read'] ? avo_now() : null, $id]);
    }
    return ['ok' => true];
}

function avo_submission_delete(array $s, int $id): array
{
    if (!db_exec('DELETE FROM submissions WHERE id = ?', [$id])) avo_fail(404, 'not_found', 'This entry no longer exists.');
    avo_audit($s['user_id'], 'submission.delete', 'submission:' . $id);
    return ['ok' => true];
}

function avo_submission_resend(array $s, int $id): array
{
    $res = avo_submission_mail($id);
    avo_audit($s['user_id'], 'submission.resend', 'submission:' . $id, $res['status']);
    return ['mailStatus' => $res['status'], 'mailError' => $res['error']];
}

/** A cell a spreadsheet would run as a formula gets a leading apostrophe (spec §13.5). */
function avo_csv_cell(string $v): string
{
    if ($v !== '' && in_array($v[0], ['=', '+', '-', '@', "\t", "\r"], true)) $v = "'" . $v;
    return $v;
}

/** GET /api/submissions/export.csv?form= — streams the file. */
function avo_submissions_export(array $q): void
{
    [$where, $args] = avo_submission_filter($q);
    $rows = db_all("SELECT * FROM submissions WHERE $where ORDER BY created_at DESC, id DESC", $args);
    $cols = [];
    $labels = [];
    $forms = [];
    $pages = [];
    $items = [];
    foreach ($rows as $r) {
        $o = avo_submission_out($r, $forms, $pages);
        foreach ((array) $o['data'] as $k => $_) {
            if (!isset($cols[$k])) {
                $cols[$k] = true;
                $labels[$k] = ((array) $o['labels'])[$k] ?? $k;
            }
        }
        $items[] = $o;
    }
    $name = 'entries-' . (isset($q['form']) && is_numeric($q['form']) ? 'form-' . (int) $q['form'] . '-' : '') . gmdate('Y-m-d') . '.csv';
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="' . $name . '"');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    fputcsv($out, array_map('avo_csv_cell', array_merge(['Date (Malaysia time)', 'Form', 'Page', 'Language', 'Email status'], array_values($labels))), ',', '"', '');
    foreach ($items as $o) {
        // Same clock as the notification email: the owner reads these in Malaysia, not in UTC.
        $line = [gmdate('Y-m-d H:i', (int) strtotime((string) $o['createdAt']) + 8 * 3600), (string) $o['formName'], (string) ($o['pageSlug'] ?? ''), (string) $o['lang'], (string) $o['mailStatus']];
        $data = (array) $o['data'];
        foreach (array_keys($cols) as $k) $line[] = (string) ($data[$k] ?? '');
        fputcsv($out, array_map('avo_csv_cell', $line), ',', '"', '');
    }
    fclose($out);
}
