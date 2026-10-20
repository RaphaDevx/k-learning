# K-Learning macOS desktop release

Universal macOS client, version 1.0.0, minimum macOS 13. Intel and Apple Silicon are contained in one signed bundle. Electron 44.9.1 is pinned; upstream Electron 44 requires macOS 13 (https://www.electronjs.org/docs/latest/breaking-changes/).

## Boundaries

The app opens the hosted K-Learning platform and requires internet. It has native macOS window controls, app menus, clipboard shortcuts, zoom and full screen. It reuses the existing K-Learning icon. Hosted interface glass effects remain CSS effects; native Liquid Glass in the content is not claimed.

Google authentication uses the regular system browser and PKCE, never an embedded Google login. The hosted callback carries an authorization code and random nonce to a registered `klearning://auth` handler. Access/refresh tokens are exchanged inside main and returned solely to the originating trusted renderer call. The hosted Supabase session is stored in Electron's persistent application browser profile; service-role keys, billing credentials and personal API keys are absent from the app.

Remote content has no Node integration; sandbox and context isolation are enabled. IPC checks exact hosted origin and the main frame. Callback handling checks route, nonce, one-use flow, originating frame and navigation generation. Only an explicit set of external HTTPS domains can reach the system browser. New webviews, untrusted navigation, arbitrary protocols, and renderer-created windows are denied.

## Checks

- Node syntax check main/preload passed.
- Synthetic runtime checks of actual main code passed: exact origin/credential/protocol allowlists, top-frame IPC, PKCE challenge, invalid/Unicode nonce rejection, token exchange and callback replay prevention. Synthetic tokens only.
- Live Supabase authorization request returned HTTP 302 to `accounts.google.com`, HTTPS, with PKCE parameters.
- Production callback page and hosted Auth desktop branch verified. Actual packaged-app sign-in invoked trusted IPC successfully and opened Safari as the system browser. Interactive Google account selection/consent still requires a user's Google login; completion of that account flow is not claimed verified.
- Actual universal Mac app launched and displayed the live login screen. The preload bridge was present; `window.require` was undefined.
- Actual app blocked unapproved top-level navigation, displayed its offline retry page under simulated offline networking, exposed no bridge on the file fallback and recovered when network returned.
- Universal bundle `lipo -archs`: `x86_64 arm64`.
- `codesign --verify --deep --strict`: valid on disk; satisfies Designated Requirement. Developer ID Team `H6X9JDXF96`.
- Apple notarization status **Accepted**, submission `939ef089-277a-4069-b853-115fbc029d44`.
- `xcrun stapler staple` and `stapler validate`: successful.
- Gatekeeper DMG assessment: **accepted**, `source=Notarized Developer ID`.
- Packaged `app.asar` inspected: only `main.cjs`, `preload.cjs`, `offline.html`, `package.json`; no credentials, build scripts, private key material or runtime dependencies bundled.
- macOS LaunchServices accepts `klearning://auth` activation; synthetic invalid callback ignored safely.
- Evidence files reside in ignored `desktop/dist/`: `notarization.json`, `verification.txt`, `SHA256SUMS`, and `smoke-macos-login.png`.

## Updates and costs

Learning content updates when loaded from the platform. Native app updates use the menu's version check and a manual signed download. There is no automatic binary installer.

Building/downloading the desktop client does not call a grading API. Exam evaluation, credit purchases and model costs remain backend platform operations and use the server's existing billing. No user needs to put a private API key into this desktop client. Existing Apple Developer membership/signing infrastructure and Cloudflare R2/Pages hosting are reused; storage/egress and API usage follow those existing accounts' plans.

## Website deployment

Dedicated page: `/storage/Public/K-Dev/Projekte/K-Adv/website/k-learning.html`. Product data: only `products.k-learning` in `releases.json`. Frozen `index.html` and `advisory.html` are untouched. Parent agent performs the existing K-Advisory Pages deployment after receiving artifact acceptance evidence.

## Published artifact

Download: https://pub-f8a055810aee4622b6883b39e71485fe.r2.dev/k-learning/K-Learning-1.0.0-universal.dmg

SHA-256: `6b96514412d471c3eb873772e5a9f2b9d6a4112dd7066a301da3c4fcadbf19c3`. Size: 230394863 bytes. Public HEAD: HTTP 200 with exact Content-Length. Original products in K-Advisory manifest compared against pre-release snapshot: all unchanged.

Production landing page verified after deployment: https://kaufmannadvisory.ch/k-learning.html returned HTTP 200 with the dedicated K-Learning title; live releases.json includes the published universal download. Production desktop-auth.html returns the actual callback page (not the SPA fallback), and hosted js/auth.js contains the desktop bridge branch.
