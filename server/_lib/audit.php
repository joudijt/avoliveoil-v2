<?php
declare(strict_types=1);

defined('AVO_CMS') || exit;

function avo_audit(?int $userId, string $action, ?string $target = null, ?string $detail = null): void
{
    try {
        db_exec('INSERT INTO audit(user_id,action,target,at,detail) VALUES(?,?,?,?,?)', [
            $userId, $action, $target, avo_now(), $detail === null ? null : mb_substr($detail, 0, 2000),
        ]);
    } catch (Throwable $e) {
        avo_log('error', 'audit write failed: ' . $e->getMessage());
    }
}
