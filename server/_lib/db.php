<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

/**
 * One SQLite file above the docroot (spec §2.2, §13.6). WAL is probed on first open
 * and falls back to DELETE journalling where the filesystem can't do shared memory.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $dir = avo_data_dir();
    $file = $dir . '/cms.sqlite';
    $pdo = new PDO('sqlite:' . $file, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 5,
    ]);
    @chmod($file, 0600);
    $pdo->exec('PRAGMA busy_timeout = 5000');
    $pdo->exec('PRAGMA foreign_keys = ON');
    $modeFile = $dir . '/journal_mode.txt';
    $mode = is_file($modeFile) ? trim((string) @file_get_contents($modeFile)) : '';
    if ($mode === '') {
        try {
            $got = strtolower((string) $pdo->query('PRAGMA journal_mode = WAL')->fetchColumn());
        } catch (Throwable) {
            $got = '';
        }
        if ($got !== 'wal') {
            $pdo->exec('PRAGMA journal_mode = DELETE');
            $got = 'delete';
        }
        @file_put_contents($modeFile, $got);
    } elseif ($mode === 'wal') {
        $pdo->exec('PRAGMA journal_mode = WAL');
    } else {
        $pdo->exec('PRAGMA journal_mode = DELETE');
    }
    $pdo->exec('PRAGMA synchronous = NORMAL');
    db_migrate($pdo);
    return $pdo;
}

/** @return list<string> */
function db_migrations(): array
{
    return [
        // 1 — spec §4 + §13 additions
        <<<'SQL'
        CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          email TEXT NOT NULL UNIQUE COLLATE NOCASE,
          name TEXT NOT NULL DEFAULT '',
          pass_hash TEXT NOT NULL,
          is_active INTEGER NOT NULL DEFAULT 1,
          created_at INTEGER NOT NULL,
          last_login_at INTEGER
        );
        CREATE TABLE sessions (
          token_hash TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          csrf TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          last_seen_at INTEGER NOT NULL,
          expires_at INTEGER NOT NULL,
          ip TEXT, ua TEXT
        );
        CREATE INDEX sessions_user ON sessions(user_id);
        CREATE TABLE login_attempts (id INTEGER PRIMARY KEY, ip TEXT, email TEXT, at INTEGER NOT NULL);
        CREATE INDEX login_attempts_at ON login_attempts(at);
        CREATE TABLE password_resets (
          token_hash TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at INTEGER NOT NULL,
          expires_at INTEGER NOT NULL,
          used_at INTEGER
        );
        CREATE TABLE pages (
          id INTEGER PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          status TEXT NOT NULL DEFAULT 'draft',
          langs_json TEXT NOT NULL DEFAULT '[]',
          in_header INTEGER NOT NULL DEFAULT 0,
          in_footer INTEGER NOT NULL DEFAULT 0,
          menu_order INTEGER NOT NULL DEFAULT 0,
          noindex INTEGER NOT NULL DEFAULT 0,
          draft_json TEXT NOT NULL,
          draft_version INTEGER NOT NULL DEFAULT 1,
          published_json TEXT,
          published_html_json TEXT,
          render_build TEXT,
          deps_json TEXT NOT NULL DEFAULT '[]',
          needs_render INTEGER NOT NULL DEFAULT 0,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          published_at INTEGER,
          deleted_at INTEGER,
          updated_by INTEGER
        );
        CREATE TABLE page_revisions (
          id INTEGER PRIMARY KEY,
          page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
          json TEXT NOT NULL,
          html_json TEXT,
          langs_json TEXT,
          created_at INTEGER NOT NULL,
          user_id INTEGER,
          note TEXT
        );
        CREATE INDEX page_revisions_page ON page_revisions(page_id);
        CREATE TABLE redirects (from_slug TEXT PRIMARY KEY, to_slug TEXT NOT NULL, created_at INTEGER NOT NULL);
        CREATE TABLE gone (slug TEXT PRIMARY KEY, at INTEGER NOT NULL);
        CREATE TABLE overrides (
          lang TEXT NOT NULL, key TEXT NOT NULL, kind TEXT NOT NULL,
          published_value TEXT NOT NULL,
          updated_at INTEGER NOT NULL, updated_by INTEGER,
          PRIMARY KEY (lang, key)
        );
        CREATE TABLE override_drafts (
          lang TEXT NOT NULL, key TEXT NOT NULL, user_id INTEGER NOT NULL, kind TEXT NOT NULL,
          value TEXT,
          updated_at INTEGER NOT NULL,
          PRIMARY KEY (lang, key, user_id)
        );
        CREATE TABLE site_publishes (id INTEGER PRIMARY KEY, user_id INTEGER, created_at INTEGER NOT NULL, note TEXT);
        CREATE TABLE override_revisions (
          id INTEGER PRIMARY KEY, publish_id INTEGER NOT NULL, lang TEXT NOT NULL, key TEXT NOT NULL, kind TEXT NOT NULL,
          old_value TEXT, new_value TEXT, created_at INTEGER NOT NULL, user_id INTEGER
        );
        CREATE INDEX override_revisions_publish ON override_revisions(publish_id);
        CREATE TABLE forms (
          id INTEGER PRIMARY KEY, name TEXT NOT NULL, recipients_json TEXT NOT NULL, subject TEXT NOT NULL DEFAULT '',
          def_json TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, deleted_at INTEGER
        );
        CREATE TABLE submissions (
          id INTEGER PRIMARY KEY, form_id INTEGER NOT NULL, page_id INTEGER, lang TEXT NOT NULL,
          data_json TEXT NOT NULL, labels_json TEXT, ip_hash TEXT, ua TEXT, created_at INTEGER NOT NULL,
          mail_status TEXT NOT NULL DEFAULT 'pending', mail_error TEXT, read_at INTEGER
        );
        CREATE INDEX submissions_form ON submissions(form_id, created_at);
        CREATE INDEX submissions_ip ON submissions(ip_hash, created_at);
        CREATE TABLE mail_log (id INTEGER PRIMARY KEY, at INTEGER NOT NULL, purpose TEXT, ok INTEGER NOT NULL);
        CREATE INDEX mail_log_at ON mail_log(at);
        CREATE TABLE media (
          id INTEGER PRIMARY KEY, file_base TEXT NOT NULL, original_name TEXT NOT NULL, width INTEGER NOT NULL,
          height INTEGER NOT NULL, widths_json TEXT NOT NULL, bytes INTEGER NOT NULL, alt_en TEXT NOT NULL DEFAULT '',
          alt_ms TEXT NOT NULL DEFAULT '', has_alpha INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL, user_id INTEGER
        );
        CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE audit (id INTEGER PRIMARY KEY, user_id INTEGER, action TEXT NOT NULL, target TEXT, at INTEGER NOT NULL, detail TEXT);
        CREATE INDEX audit_at ON audit(at);
        SQL,
        // 2 — JPEG copy for share images (og:image): {"w":…,"h":…}; file <file_base>-og.jpg
        'ALTER TABLE media ADD COLUMN og_json TEXT',
        // 3 — FORGE HITPAY: online orders, one row per HitPay payment request (R1), rate limiter (R16),
        //     webhook log (ids/status/amount only). Settings (encrypted keys, fees) live in `settings`.
        <<<'SQL'
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY,
          ref TEXT NOT NULL UNIQUE,
          site TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          idem TEXT NOT NULL,
          content_hash TEXT NOT NULL,
          lines_json TEXT NOT NULL,
          subtotal_sen INTEGER NOT NULL,
          delivery_sen INTEGER NOT NULL,
          total_sen INTEGER NOT NULL,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          address_json TEXT NOT NULL,
          lang TEXT NOT NULL,
          status_token TEXT NOT NULL,
          ip_hash TEXT,
          payment_type TEXT,
          paid_request_id TEXT,
          review_at INTEGER,
          created_at INTEGER NOT NULL,
          paid_at INTEGER,
          notified_at INTEGER,
          notify_attempts INTEGER NOT NULL DEFAULT 0,
          last_fetch_at INTEGER
        );
        CREATE UNIQUE INDEX orders_idem ON orders(site, idem, content_hash);
        CREATE INDEX orders_status ON orders(status, created_at);
        CREATE TABLE pay_requests (
          id INTEGER PRIMARY KEY,
          order_ref TEXT NOT NULL REFERENCES orders(ref) ON DELETE CASCADE,
          request_id TEXT NOT NULL UNIQUE,
          url TEXT NOT NULL,
          amount_sen INTEGER NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          payment_type TEXT,
          note TEXT,
          created_at INTEGER NOT NULL,
          checked_at INTEGER
        );
        CREATE INDEX pay_requests_order ON pay_requests(order_ref, status);
        CREATE TABLE rate_hits (id INTEGER PRIMARY KEY, bucket TEXT NOT NULL, ip_hash TEXT NOT NULL, ts INTEGER NOT NULL);
        CREATE INDEX rate_hits_bucket ON rate_hits(bucket, ip_hash, ts);
        CREATE INDEX rate_hits_ts ON rate_hits(ts);
        CREATE TABLE pay_events (id INTEGER PRIMARY KEY, at INTEGER NOT NULL, request_id TEXT, payment_id TEXT, status TEXT, amount TEXT, ok INTEGER NOT NULL);
        CREATE INDEX pay_events_at ON pay_events(at);
        SQL,
        // 4 — HITPAY review fixes: owner-email retry throttle (last_notify_at) and the per-order
        //     claim that lets only one click create a HitPay request at a time (creating_at).
        'ALTER TABLE orders ADD COLUMN last_notify_at INTEGER; ALTER TABLE orders ADD COLUMN creating_at INTEGER',
        // 5 — BUY-NOW review 3: why an order was closed by the server ("superseded by AV-…").
        'ALTER TABLE orders ADD COLUMN note TEXT',
    ];
}

function db_migrate(PDO $pdo): void
{
    $migrations = db_migrations();
    $target = count($migrations);
    if ((int) $pdo->query('PRAGMA user_version')->fetchColumn() >= $target) return;
    $pdo->exec('BEGIN IMMEDIATE');
    try {
        // re-read under the write lock: another request may have migrated meanwhile
        $current = (int) $pdo->query('PRAGMA user_version')->fetchColumn();
        for ($v = $current; $v < $target; $v++) {
            $pdo->exec($migrations[$v]);
        }
        $pdo->exec('PRAGMA user_version = ' . $target);
        $pdo->exec('COMMIT');
    } catch (Throwable $e) {
        $pdo->exec('ROLLBACK');
        throw $e;
    }
}

/** Run $fn inside BEGIN IMMEDIATE (one writer at a time, no upgrade deadlocks). */
function db_tx(callable $fn): mixed
{
    $pdo = db();
    $pdo->exec('BEGIN IMMEDIATE');
    try {
        $result = $fn($pdo);
        $pdo->exec('COMMIT');
        return $result;
    } catch (Throwable $e) {
        try {
            $pdo->exec('ROLLBACK');
        } catch (Throwable) {
        }
        throw $e;
    }
}

function db_one(string $sql, array $params = []): ?array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function db_all(string $sql, array $params = []): array
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st->fetchAll();
}

/**
 * Next id for a table whose rows can be hard-deleted (media, purged pages). SQLite hands the
 * highest deleted id out again, so old references (site-text versions, page versions, form
 * entries) would silently point at the NEW row. Ids come from a high-water mark instead.
 * Call inside db_tx().
 */
function db_next_id(string $table): int
{
    if (!in_array($table, ['media', 'pages'], true)) throw new InvalidArgumentException('db_next_id: ' . $table);
    $key = 'seq.' . $table;
    $id = max((int) db_val('SELECT value FROM settings WHERE key = ?', [$key]), (int) db_val("SELECT COALESCE(MAX(id), 0) FROM $table")) + 1;
    db_exec('INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', [$key, (string) $id]);
    return $id;
}

function db_val(string $sql, array $params = []): mixed
{
    $st = db()->prepare($sql);
    $st->execute($params);
    $v = $st->fetchColumn();
    return $v === false ? null : $v;
}

function db_exec(string $sql, array $params = []): int
{
    $st = db()->prepare($sql);
    $st->execute($params);
    return $st->rowCount();
}
