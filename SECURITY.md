# Security policy

## Scope

This repository is part of the ECO-SYS ecosystem and is owned and maintained by
[@KhadijaChahmoud](https://github.com/KhadijaChahmoud). It contains a public
GitHub Pages website and a separately hosted API.

The API provides GitHub OAuth sign-in, profile records, hashed session tokens,
and an aggregate profile-link click counter. It must not store GitHub OAuth
access or refresh tokens. MongoDB is the default database provider; PostgreSQL
is also supported.

The website is public. A website route, hidden file, or client-side check is not
an authorization boundary. Protected data and actions must be authorized by the
API on every request.

## Account and repository ownership

- The repository owner is responsible for approving maintainers and OAuth
  access.
- Only accounts explicitly approved by the repository owner may use protected
  profile features.
- The API must configure `ALLOWED_GITHUB_LOGINS` with exact GitHub login names
  and must fail closed if the allowlist is absent, empty, or invalid.
- An account must not be added to the allowlist without owner approval.
- OAuth and database administrator access must be limited to owner-approved
  maintainers.
- GitHub organization, repository, OAuth application, and API-host permissions
  should use the least privilege required.

Do not infer approval from public profile data, repository access, or possession
of a valid GitHub account.

## Authentication and sessions

GitHub OAuth requests only the profile scopes required by this application.
GitHub access tokens must not be written to the database, browser storage,
logs, or source control.

The API stores the GitHub account ID, username, available name, avatar URL,
profile URL, and other profile fields explicitly required by the application.
Session tokens are random values stored only as SHA-256 hashes in the database.

Production session cookies must be:

- `HttpOnly`
- `Secure`
- `SameSite=None` for a cross-site frontend/API deployment
- Scoped to the narrowest valid cookie domain and path
- Invalidated by logout and by account or session revocation

Development may use local HTTP origins and a less restrictive cookie
configuration, but it must never be copied into production. Production
`FRONTEND_URL`, OAuth callback URLs, CORS origins, and cookie settings must use
HTTPS and agree on the same trusted deployment origin.

## Secrets and infrastructure

GitHub OAuth client secrets, database credentials, signing secrets, recovery
keys, and API-host credentials must remain in the deployment environment or an
ignored local environment file.

- Never commit secrets or placeholders that can become credentials.
- Never place secrets in frontend variables, repository files, logs, or issue
  reports.
- Rotate a secret immediately if it may have been exposed.
- Restrict production database access to the API service.
- Enable TLS for all production API and database connections.
- Keep dependencies and OAuth/database integrations updated.
- Apply rate limiting and monitoring to login, session, recovery, and profile
  endpoints.

## Browser storage and media

The music player stores visitor-added files in IndexedDB and saved audio URLs,
playback position, and preferences in the visitor's browser. This data is not
uploaded by this site, is not encrypted by the site, and is not synchronized
between devices.

A saved audio URL is not loaded until the visitor chooses to play it. The
browser then contacts the selected audio host, which receives normal browser
network metadata.

Do not place passwords, access tokens, private signed URLs, or sensitive data
in playlists, browser storage, public media fields, or repository content.

## Vulnerability reporting

Do not publish unpatched vulnerability details in a public issue, pull request,
or discussion. Use GitHub private vulnerability reporting for this repository
when available. Otherwise, contact the repository owner through
[@KhadijaChahmoud](https://github.com/KhadijaChahmoud).

Include the affected endpoint or file, impact, and a minimal reproduction.
Remove real credentials, personal information, private links, and user data
from reports. If an account or secret is exposed, report that directly instead
of including the value in the report.

## Security review process

For changes that affect authentication, authorization, secrets, cookies, CORS,
database access, or account ownership:

1. Review the API, environment template, deployment configuration, and this
   policy together.
2. Verify the account allowlist is present and fail-closed.
3. Verify production HTTPS and cookie settings.
4. Verify secrets are absent from source and logs.
5. Test denied, approved, expired, revoked, and cross-site session behavior.
6. Revoke sessions and rotate credentials after a suspected compromise.

This policy applies to the repository, its owner account, maintainers, clients,
deployment hosts, and connected API services. It does not authorize any commit,
push, account change, secret rotation, or synchronization; all such actions
require separate owner approval.
