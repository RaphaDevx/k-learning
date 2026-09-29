# Fonts — Self-Hosting Guide

K-Learning nutzt drei Font-Rollen. Alle aktuell per CDN geladen.
Für Offline-Betrieb / App Store: `.woff2` Dateien hier ablegen.

---

## Rolle 1 — UI: Nunito (aktuell: Google Fonts CDN)

Lädt via `index.html` Link-Tag.

## Download

1. https://fonts.google.com/specimen/Nunito → "Download family"
2. Oder via `google-webfonts-helper`:
   - Gewünschte Weights: **400, 600, 700, 800**
   - Format: **woff2** (reicht für alle modernen Browser + iOS/Android)

## Dateien die hier hingehören

```
Nunito-Regular.woff2      (400)
Nunito-SemiBold.woff2     (600)
Nunito-Bold.woff2         (700)
Nunito-ExtraBold.woff2    (800)
```

## CSS einbinden (in brand.css ergänzen)

```css
@font-face {
  font-family: 'Nunito';
  src: url('/branding/fonts/Nunito-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Nunito';
  src: url('/branding/fonts/Nunito-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Nunito';
  src: url('/branding/fonts/Nunito-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'Nunito';
  src: url('/branding/fonts/Nunito-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-display: swap;
}
```

Dann den Google Fonts `<link>`-Tag aus `index.html` entfernen.

---

## Rolle 2 — Academic Content: Latin Modern Roman (aktuell: jsDelivr CDN)

Lädt via `branding/tokens/typography.css` @import.

**Warum Latin Modern:** Gleiche Schriftfamilie wie Computer Modern (LaTeX-Standard).
KaTeX nutzt Computer Modern → Latin Modern = perfekte visuelle Harmonie.

### Self-Hosting
```
Download: https://www.gust.org.pl/projects/e-foundry/latin-modern/download
oder:     npm install lm-fonts

Dateien:
  lmroman10-regular.woff2
  lmroman10-bold.woff2
  lmroman10-italic.woff2
  lmroman10-bolditalic.woff2
```

```css
@font-face {
  font-family: 'Latin Modern Roman';
  src: url('../fonts/lmroman10-regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Latin Modern Roman';
  src: url('../fonts/lmroman10-bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Latin Modern Roman';
  src: url('../fonts/lmroman10-italic.woff2') format('woff2');
  font-weight: 400; font-style: italic; font-display: swap;
}
```

---

## Rolle 3 — Mono/Code: JetBrains Mono (aktuell: Google Fonts CDN)

Lädt via `branding/tokens/typography.css` @import.

### Self-Hosting
```
Download: https://www.jetbrains.com/lp/mono/ oder https://fonts.google.com/specimen/JetBrains+Mono

Dateien:
  JetBrainsMono-Regular.woff2
  JetBrainsMono-Medium.woff2
  JetBrainsMono-Bold.woff2
```

---

## Native App (Expo / React Native)

Für alle drei Fonts: `.ttf`-Dateien in `native/assets/fonts/` ablegen
und in `app.json` unter `expo.fonts` registrieren.

```json
"expo": {
  "fonts": [
    "./assets/fonts/Nunito-Regular.ttf",
    "./assets/fonts/Nunito-Bold.ttf",
    "./assets/fonts/LMRoman10-Regular.ttf",
    "./assets/fonts/JetBrainsMono-Regular.ttf"
  ]
}
```
