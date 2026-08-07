# K-Learning — App Store Roadmap
> Stand: August 2026 | Expo + React Native | Bundle: `com.raphael.klearning`

---

## Phase 1: Accounts & Lizenzen

- [ ] **Apple Developer Account** — $99/Jahr → [developer.apple.com](https://developer.apple.com)
  - Nach Zahlung 24-48h Aktivierungszeit einplanen
- [ ] **Google Play Developer Account** — $25 einmalig → [play.google.com/console](https://play.google.com/console)
  - Sofort verfügbar nach Zahlung

---

## Phase 2: Tech-Vorbereitung (native/)

### 2.1 EAS (Expo Application Services) einrichten
```bash
cd /home/raphael/K-Learning/native
npm install -g eas-cli
eas login                    # mit Expo-Account einloggen
eas build:configure          # erstellt eas.json
```

### 2.2 eas.json kontrollieren
```json
{
  "cli": { "version": ">= 13.0.0" },
  "build": {
    "production": {
      "ios": { "resourceClass": "m1-medium" },
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {
      "ios": { "appleId": "raphael.m.kaufmann@gmail.com" }
    }
  }
}
```

### 2.3 Supabase Auth für Native App fixen (wichtig!)
Expo nutzt `k-learning://` als Deep Link — das muss in Supabase registriert sein:
- Supabase Dashboard → Authentication → URL Configuration
- **Redirect URLs** hinzufügen:
  - `k-learning://login-callback`
  - `exp://localhost:8081` (für lokales Testen)
- In `native/lib/supabase.ts` prüfen: `redirectTo: 'k-learning://login-callback'`

### 2.4 app.json vervollständigen
```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1",
      "bundleIdentifier": "com.raphael.klearning",
      "supportsTablet": false
    },
    "android": {
      "versionCode": 1,
      "package": "com.raphael.klearning"
    },
    "splash": {
      "image": "./assets/splash-icon.png",
      "backgroundColor": "#111827"
    }
  }
}
```

### 2.5 Pakete prüfen
```bash
npx expo-doctor          # zeigt Konflikte / veraltete Pakete
npx expo install --fix   # korrigiert Versions-Mismatches
```

---

## Phase 3: Assets erstellen

### Icon ✅
- `assets/icon.png` → 1024×1024 px ✅ (bereits vorhanden)
- `assets/android-icon-foreground.png` ✅ (bereits vorhanden)

### Screenshots (noch erstellen)
**iOS — Pflichtgrössen:**
| Gerät | Grösse | Anzahl |
|-------|--------|--------|
| iPhone 6.9" (16 Pro Max) | 1320×2868 px | min. 3 |
| iPhone 6.5" (14 Plus) | 1242×2688 px | min. 3 |
| iPad 12.9" | 2048×2732 px | min. 3 (wenn iPad supported) |

**Android — Pflicht:**
| Format | Grösse |
|--------|--------|
| Phone Screenshots | min. 1080×1920 px, max. 8 Stück |
| Feature Graphic | 1024×500 px (Banner oben im Store) |

**Tipp:** Mit `npx expo start` → Simulator/Emulator Screenshots machen.
Screens die unbedingt gezeigt werden sollten: Feed, Flashcards, Exam, Profil.

### App-Store-Texte (vorbereiten)
```
Name (max. 30 Zeichen):     K-Learning
Untertitel iOS (30 Zeichen): Lernen mit KI-Videos & Karten
Beschreibung (4000 Zeichen): [schreiben: Was macht die App, für wen, USPs]
Keywords iOS (100 Zeichen):  lernen,studium,karteikarten,prüfung,ki,flashcards,uni
```

---

## Phase 4: Privacy Policy (Pflicht für beide Stores)

Ohne Privacy Policy → Ablehnung garantiert.

- [ ] Privacy Policy Seite erstellen (z.B. `k-learning.pages.dev/privacy`)
  - Muss abdecken: welche Daten gesammelt werden (Email, Lernfortschritt), Supabase als Verarbeiter, Löschrecht
  - Generator: [privacypolicygenerator.info](https://www.privacypolicygenerator.info) als Ausgangsbasis
- [ ] Support-URL festlegen (z.B. `raphael.m.kaufmann@gmail.com` oder eigene Seite)

---

## Phase 5: iOS Build & TestFlight

```bash
cd /home/raphael/K-Learning/native

# 1. Production Build erstellen (EAS Cloud Build, ~15-20 Min)
eas build --platform ios --profile production

# 2. Build auf TestFlight hochladen
eas submit --platform ios --latest

# 3. App Store Connect öffnen → Metadaten ausfüllen
#    → Screenshots, Beschreibung, Keywords, Privacy Policy URL
```

**In App Store Connect:**
- [ ] Neue App anlegen (Bundle ID: `com.raphael.klearning`)
- [ ] App-Informationen ausfüllen (Kategorie: Education)
- [ ] Screenshots hochladen
- [ ] Build aus TestFlight auswählen
- [ ] **App Privacy** ausfüllen (Nutrition Label):
  - Daten die gesammelt werden: E-Mail, Lernfortschritt
  - Linked to identity: Ja (Auth)
- [ ] **Altersfreigabe:** 4+ (keine problematischen Inhalte)
- [ ] Review einreichen → "Submit for Review"

**Apple Review:** 1–7 Tage (meist 24–48h)

---

## Phase 6: Android Build & Google Play

```bash
cd /home/raphael/K-Learning/native

# 1. AAB (Android App Bundle) erstellen
eas build --platform android --profile production

# 2. Manuell hochladen ODER:
eas submit --platform android --latest
```

**In Google Play Console:**
- [ ] Neue App anlegen (Package: `com.raphael.klearning`)
- [ ] **Internal Testing** → AAB hochladen → erste Tests
- [ ] **Haupt-Store-Eintrag** ausfüllen:
  - Kurzbeschreibung (80 Zeichen)
  - Vollständige Beschreibung (4000 Zeichen)
  - Screenshots + Feature Graphic hochladen
- [ ] **Inhalts-Bewertung** ausfüllen (Fragebogen, ~5 Min)
- [ ] **Datensicherheit** ausfüllen (Pflicht seit 2022):
  - Welche Daten: E-Mail, App-Aktivität (Lernfortschritt)
  - Drittanbieter: Supabase
- [ ] Produktion → "Zur Überprüfung einreichen"

**Google Review:** 1–3 Tage

---

## Phase 7: Nach dem Launch

- [ ] Crash-Monitoring einrichten: `npx expo install expo-updates` + Sentry oder EAS Insights
- [ ] Push Notifications vorbereiten (für Streak-Reminder): `expo-notifications`
- [ ] Versionierung: bei jedem Update `buildNumber` (iOS) und `versionCode` (Android) erhöhen
- [ ] RevenueCat mit Apple/Google verbinden (→ ToDo.md Phase 5.3)

---

## Zeitplan (realistisch)

| Woche | Was |
|-------|-----|
| KW 32 (jetzt) | Accounts anlegen, EAS einrichten, Auth fixen |
| KW 33 | Screenshots erstellen, Texte schreiben, Privacy Policy |
| KW 34 | iOS Build → TestFlight, Android Build → Internal Testing |
| KW 35 | App Store Reviews einreichen |
| KW 36 | **Live im App Store & Google Play** |

---

## Checkliste Kurzfassung

```
ACCOUNTS
[ ] Apple Developer ($99)
[ ] Google Play Developer ($25)

TECH
[ ] EAS CLI + eas.json konfigurieren
[ ] Supabase Auth Deep Links eintragen
[ ] app.json: buildNumber + versionCode setzen
[ ] npx expo-doctor ausführen

ASSETS
[ ] iOS Screenshots 6.9" + 6.5"
[ ] Android Screenshots + Feature Graphic (1024×500)
[ ] Privacy Policy URL live

iOS
[ ] eas build --platform ios --profile production
[ ] App Store Connect: App anlegen + Metadaten
[ ] TestFlight testen
[ ] Submit for Review

ANDROID
[ ] eas build --platform android --profile production
[ ] Play Console: App anlegen + Metadaten
[ ] Internal Testing
[ ] Submit for Review
```
