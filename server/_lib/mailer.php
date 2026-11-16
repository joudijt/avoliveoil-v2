<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/*
 * mail() via the host's sendmail (spec §7.3, §13.5). Every header value is stripped of
 * CR/LF; the subject is MIME-encoded; bodies are base64 so no visitor text can ever start
 * a header line. With AVO_CMS_MAIL=file (tests, local) messages land in DATA/mail-outbox/.
 * Over the hourly site cap nothing is sent: the caller stores the entry as 'held'.
 */

function avo_header_value(string $v): string
{
    return trim((string) preg_replace('/[\r\n\0]+/', ' ', $v));
}

/** Envelope sender: the System email when it is on our own domain (SPF), else noreply. */
function avo_mail_envelope(): string
{
    $sys = strtolower((string) (avo_settings_get()['systemEmail'] ?? ''));
    if ($sys !== '' && preg_match('/^[a-z0-9._%+\-]+@avoliveoil\.com$/', $sys)) return $sys;
    return AVO_MAIL_FROM;
}

function avo_mail_cap(): int
{
    return max(1, (int) avo_setting('mailCapPerHour', '40'));
}

/**
 * Paid-order emails (purpose 'order') have their own hourly budget, so a flooded contact form
 * can never hold back the email of a paid order, and orders never eat the form budget (review 15).
 */
function avo_mail_capped(string $purpose = ''): bool
{
    $which = $purpose === 'order' ? "purpose = 'order'" : "COALESCE(purpose, '') <> 'order'";
    return (int) db_val("SELECT COUNT(*) FROM mail_log WHERE at > ? AND ok = 1 AND $which", [avo_now() - 3600]) >= avo_mail_cap();
}

/**
 * @param string[] $to
 * @return array{status:'sent'|'failed'|'held', error:?string}
 */
function avo_mail_send(array $to, string $subject, string $text, string $html, ?string $replyTo, string $purpose): array
{
    $to = array_values(array_filter(array_map(fn ($e) => avo_header_value((string) $e), $to), 'avo_valid_email'));
    if (!$to) return ['status' => 'failed', 'error' => 'no valid recipient'];
    if (avo_mail_capped($purpose)) {
        avo_log('warn', 'mail held: hourly cap reached', ['purpose' => $purpose]);
        return ['status' => 'held', 'error' => 'Hourly email limit reached'];
    }
    $boundary = 'avo-' . bin2hex(random_bytes(12));
    $headers = [
        'From: "' . AVO_MAIL_FROM_NAME . '" <' . AVO_MAIL_FROM . '>',
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@avoliveoil.com>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Auto-Response-Suppress: All',
    ];
    if ($replyTo !== null) {
        $replyTo = avo_header_value($replyTo);
        if (avo_valid_email($replyTo)) $headers[] = 'Reply-To: ' . $replyTo;
    }
    $subjectEnc = mb_encode_mimeheader(avo_header_value($subject), 'UTF-8', 'B', "\r\n");
    $body = "This is a multi-part message in MIME format.\r\n\r\n"
        . '--' . $boundary . "\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text), 76, "\r\n")
        . '--' . $boundary . "\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html), 76, "\r\n")
        . '--' . $boundary . "--\r\n";
    $toHeader = implode(', ', $to);
    $envelope = avo_mail_envelope();

    $ok = false;
    $error = null;
    if (getenv('AVO_CMS_MAIL') === 'file') {
        $dir = avo_data_dir() . '/mail-outbox';
        @mkdir($dir, 0700, true);
        $eml = 'X-Envelope-From: ' . $envelope . "\r\nTo: " . $toHeader . "\r\nSubject: " . $subjectEnc . "\r\n"
            . implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $ok = @file_put_contents($dir . '/' . gmdate('Ymd-His') . '-' . str_pad((string) hrtime(true), 20, '0', STR_PAD_LEFT) . '-' . bin2hex(random_bytes(3)) . '.eml', $eml) !== false;
        if (!$ok) $error = 'could not write the mail file';
    } else {
        $ok = @mail($toHeader, $subjectEnc, $body, implode("\r\n", $headers), '-f' . $envelope);
        if (!$ok) {
            $last = error_get_last();
            $error = 'The mail server refused the message' . ($last ? ' (' . mb_substr((string) $last['message'], 0, 200) . ')' : '');
        }
    }
    db_exec('INSERT INTO mail_log(at, purpose, ok) VALUES(?, ?, ?)', [avo_now(), $purpose, $ok ? 1 : 0]);
    if (!$ok) avo_log('error', 'mail failed', ['purpose' => $purpose, 'error' => $error]);
    return ['status' => $ok ? 'sent' : 'failed', 'error' => $error];
}

/** Text + HTML body for a form entry: a table of label → value (values escaped). */
function avo_mail_compose_entry(array $rows, string $intro): array
{
    $text = $intro . "\n\n";
    $html = '<p>' . htmlspecialchars($intro, ENT_QUOTES, 'UTF-8') . '</p><table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse">';
    foreach ($rows as [$label, $value]) {
        $text .= $label . ":\n" . $value . "\n\n";
        $html .= '<tr><th align="left" valign="top">' . htmlspecialchars((string) $label, ENT_QUOTES, 'UTF-8') . '</th><td>'
            . nl2br(htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8')) . '</td></tr>';
    }
    $html .= '</table>';
    return ['text' => $text, 'html' => $html];
}
