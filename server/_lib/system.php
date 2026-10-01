<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

function avo_dir_stats(string $dir): array
{
    $files = 0;
    $bytes = 0;
    if (is_dir($dir)) {
        $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS));
        foreach ($it as $f) {
            if ($f->isFile()) {
                $files++;
                $bytes += $f->getSize();
            }
        }
    }
    return [$files, $bytes];
}

function avo_log_tail(int $lines = 50): array
{
    $file = avo_data_dir() . '/logs/cms.log';
    if (!is_file($file)) return [];
    $size = filesize($file);
    $fh = fopen($file, 'r');
    fseek($fh, max(0, $size - 64 * 1024));
    $chunk = (string) stream_get_contents($fh);
    fclose($fh);
    $all = preg_split('/\r?\n/', trim($chunk)) ?: [];
    return array_slice($all, -$lines);
}

function avo_latest_backup(): ?string
{
    $all = glob(avo_data_dir() . '/backups/cms-*.sqlite') ?: [];
    sort($all);
    return $all ? end($all) : null;
}

function avo_health(): array
{
    [$files, $bytes] = avo_dir_stats(avo_rendered_dir());
    $latest = avo_latest_backup();
    $probe = avo_data_dir() . '/.probe-' . bin2hex(random_bytes(3));
    $writable = @file_put_contents($probe, 'x') === 1;
    @unlink($probe);
    return [
        'php' => PHP_VERSION,
        'sqlite' => (string) db_val('SELECT sqlite_version()'),
        'journalMode' => (string) db()->query('PRAGMA journal_mode')->fetchColumn(),
        'build' => avo_build_id(),
        'contentVersion' => avo_content_version(),
        'dataWritable' => $writable,
        'renderedFiles' => $files,
        'renderedBytes' => $bytes,
        'integrity' => (string) db_val('PRAGMA integrity_check'),
        'failedMails' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE mail_status = 'failed'"),
        'heldMails' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE mail_status = 'held'"),
        'lastBackupAt' => $latest ? avo_iso((int) filemtime($latest)) : null,
        'logTail' => avo_log_tail(50),
    ];
}

function avo_backup_download(array $s): void
{
    $file = avo_latest_backup() ?? avo_backup();
    if (!$file || !is_file($file)) avo_fail(500, 'backup_failed', 'No backup could be created. Check the System page for errors.');
    avo_audit($s['user_id'], 'backup.download', basename($file));
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="avoliveoil-' . basename($file) . '"');
    header('Content-Length: ' . filesize($file));
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    readfile($file);
}

function avo_dashboard(): array
{
    $pages = db_all('SELECT status, deleted_at, draft_json, published_json FROM pages');
    $p = ['published' => 0, 'draft' => 0, 'unpublishedChanges' => 0, 'trash' => 0];
    foreach ($pages as $r) {
        if ($r['deleted_at'] !== null) {
            $p['trash']++;
            continue;
        }
        $r['status'] === 'published' ? $p['published']++ : $p['draft']++;
        if ($r['status'] === 'published' && json_decode((string) $r['draft_json'], true) != json_decode((string) $r['published_json'], true)) {
            $p['unpublishedChanges']++;
        }
    }
    $recent = avo_submissions_list(['limit' => 5]);
    return [
        'pages' => $p,
        'entries' => [
            'unread' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE read_at IS NULL AND mail_status <> 'spam'"),
            'last7days' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE created_at > ? AND mail_status <> 'spam'", [avo_now() - 7 * 86400]),
            'total' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE mail_status <> 'spam'"),
        ],
        'mail' => [
            'failed' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE mail_status = 'failed'"),
            'held' => (int) db_val("SELECT COUNT(*) FROM submissions WHERE mail_status = 'held'"),
        ],
        'dirtyPages' => count(avo_pages_dirty()),
        'sitePending' => (int) db_val('SELECT COUNT(*) FROM override_drafts'),
        'recentEntries' => $recent['items'],
    ];
}

function avo_catalogue(): array
{
    return avo_read_json(AVO_BUILD_DATA . '/catalogue.json') ?? [];
}
