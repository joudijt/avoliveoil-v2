First admin (docs/cms/CMS-SPEC.md §13.4)

1. Create a file named <64 lowercase hex characters>.token in this folder, e.g.
     php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
   The file content does not matter.
2. Deploy (it is uploaded to /api/_setup/, which the web server never serves).
3. Open https://avoliveoil.com/admin, enter that 64-character code, email, name, password.
   The file is deleted when the first user is created.

Emergency password reset: same, but name the file <64hex>.reset and use the setup
screen with the account's email and a new password. It works even when users exist,
re-activates the account and signs out all of its sessions. The file is deleted on use.
