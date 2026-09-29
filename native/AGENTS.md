# K-Learning Native — Dev Guide

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## Maestro UI Tests

Maestro testet die App auf einem echten iOS-Gerät oder Simulator.

### Setup (einmalig)
```bash
export PATH="$PATH:$HOME/.maestro/bin"
```

### Tests ausführen
```bash
# App muss laufen (Simulator oder Gerät via TestFlight)
npx expo run:ios

# Einzelner Test
maestro test .maestro/flows/auth_flow.yaml

# Alle Tests
maestro test .maestro/config.yaml
```

### Test-Flows
| File | Was wird getestet |
|---|---|
| `auth_flow.yaml` | Login-Screen lädt, Apple + Google Buttons vorhanden |
| `google_login_no_browser_leak.yaml` | Google OAuth öffnet kein Safari-Fenster |
| `post_auth_navigation.yaml` | Nach Login: Tab-Bar sichtbar (Feed/Lernen/Karten/…) |

### Hinweis: Apple Sign-In
- Funktioniert nur auf echtem Gerät, nicht im Simulator
- Simulator-Test: Magic Link via Supabase Dashboard

## EAS Build & Submit
```bash
cd /home/raphael/K-Learning/native
source /home/claude/.keys/tokens.env
EAS_BUILD_NO_EXPO_GO_WARNING=true npx eas-cli build --platform ios --profile production --non-interactive
npx eas-cli submit --platform ios --latest --non-interactive
```
