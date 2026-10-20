#!/usr/bin/env bash
set -euo pipefail
# Run on the signing Mac after syncing desktop/ to this isolated build directory.
export PATH="/Users/Builder/.nvm/versions/node/v22.23.2/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
cd "$(dirname "$0")/.."
npm ci --no-audit --no-fund
/Users/Builder/bin/kdev-unlock-keychain
SIGNING_KEYCHAIN='/Users/Builder/Library/Keychains/kdev-signing.keychain-db'
security list-keychains -d user -s "$SIGNING_KEYCHAIN" /Library/Keychains/System.keychain /System/Library/Keychains/SystemRootCertificates.keychain
CSC_KEYCHAIN="$SIGNING_KEYCHAIN" CSC_NAME='Raphael Markus Kaufmann (H6X9JDXF96)' npm run build:mac
APP_PATH='dist/mac-universal/K-Learning.app'
DMG_PATH="dist/K-Learning-$(node -p 'require("./package.json").version')-universal.dmg"
codesign --verify --deep --strict --verbose=2 "$APP_PATH"
lipo -archs "$APP_PATH/Contents/MacOS/K-Learning"
xcrun notarytool submit "$DMG_PATH" --key '/Users/Builder/private/AuthKey_56XGD2G938.p8' --key-id '56XGD2G938' --issuer '574f04c9-0353-4156-9ad6-28ffe3f42850' --wait --output-format json > dist/notarization.json
node -e 'if (require("./dist/notarization.json").status !== "Accepted") process.exit(1)'
xcrun stapler staple "$DMG_PATH"
xcrun stapler validate "$DMG_PATH"
spctl --assess --type open --context context:primary-signature --verbose=2 "$DMG_PATH"
shasum -a 256 "$DMG_PATH" > dist/SHA256SUMS
printf '%s\n' 'Build signed, notarized, stapled and Gatekeeper verified.'
