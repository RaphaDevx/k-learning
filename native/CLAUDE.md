# K-Learning (Native) — Build Instructions

**iOS builds run on MacBook only** (Xcode 26.6 / SwiftPM 6.2 required).
See `/home/raphael/K-Dev/CLAUDE.md` for full build rules.

## Quick Build

```bash
# Trigger via Dashboard (Linux):
curl -X POST http://localhost:4200/api/build \
  -H 'Content-Type: application/json' \
  -d '{"project":"k-learning","platform":"ios","profile":"local"}'

# Watch log:
ssh macbook 'tail -f /tmp/klearning_build_mac.log'
```

## DO NOT

- ❌ Run `xcodebuild` on iMac — Xcode 16.4 cannot build Expo SDK 57 (SwiftPM 6.1 vs required 6.2)
- ❌ Run `eas build` without `--local` (triggers cloud build instead of MacBook)
- ❌ Run `npm start` / `expo start` for building (that's Metro, not a build)

## App Info

- Bundle ID: `com.raphael.klearning`
- Supabase project: `ifmwcgwfvunjbnfwwbtr` ("Lumin")
- App Store: ascAppId `6800736557`
- Apple Team: `H6X9JDXF96`
- EAS project: `2cf9754e-d26d-4455-a0af-b2af77a4a068`
