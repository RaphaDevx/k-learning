# K-Learning for macOS

Sandboxed Electron client for the existing hosted K-Learning platform. macOS 13+, universal Intel and Apple Silicon. Internet required. No server secret or personal API key is included.

## Architecture

The signed main process opens only `https://k-learning.pages.dev`. Remote JavaScript has no Node integration, filesystem or shell API. A sandboxed, isolated preload exposes one Google sign-in function only in the trusted main frame. Native menus provide standard window, clipboard, zoom and update commands. The app uses native macOS window chrome; it does not claim the hosted content is native Liquid Glass.

Google sign-in runs in the user's regular browser. Main generates PKCE verifier/challenge and a random one-time state. Supabase redirects to the hosted `desktop-auth.html`, which returns only an authorization code and nonce to `klearning://auth`. Main checks exact callback route, nonce, original renderer frame and navigation generation, then exchanges the code. The original IPC call receives access/refresh tokens and the hosted Supabase client stores the authenticated session in the app's persistent browser profile. No credentials or tokens go in protocol links, source files or logs.

A reloaded page, closed window, invalid nonce or expired login requires a fresh sign-in. Authorization codes are consumed once. Arbitrary protocols, page origins, embedded webviews and renderer-created windows are denied. External links open only for the documented HTTPS domain allowlist. New externally linked domains require explicit source review.

The backend remains responsible for authorization, billing and secret storage. Closing the app does not cancel or modify the user's platform account. Sign-out uses the existing K-Learning sign-out action.

## Build and publish

Dependencies are pinned in `package-lock.json`. `electron-builder` remains on the signing skill's supported 24.13.3; development packaging dependencies are not runtime application dependencies.

1. Sync this directory to `macbook:/Users/Builder/KLearningDesktopBuild/`, excluding `node_modules` and `dist`.
2. Run `bash /Users/Builder/KLearningDesktopBuild/scripts/build-mac.sh` on the Mac. The existing private signing keychain helper and ASC key must be present. The script signs a universal app, notarizes the DMG, staples it and checks Gatekeeper.
3. Copy the DMG, `notarization.json`, `SHA256SUMS` and actual verification output into local `desktop/dist/`.
4. Run `python3 desktop/scripts/publish-r2.py`. It reads the existing Cloudflare token privately, uploads into the `k-learning/` prefix and checks public download status/size before adding the release to the K-Advisory manifest.
5. Deploy the K-Advisory site using its existing Pages project. Existing frozen hub HTML is not edited; the dedicated download page is `k-learning.html`.

Updates to learning content arrive from the live website. Native binary updates are checked from the app menu and downloaded manually from K-Advisory; there is no automatic binary installer.

## Release verification

See `docs/busta/desktop.md` for the actual release's artifact hash, Apple acceptance and checks, along with the interactive Google-login verification limit.
