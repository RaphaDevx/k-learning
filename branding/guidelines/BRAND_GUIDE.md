# K-Learning — Brand & Design System Guide
**Version 3.1 · Single Source of Truth**

> Vor jeder Design-Session lesen. Alle Werte kommen aus `branding/tokens.json` → `branding/brand.css` → `branding/tokens/typography.css`.

---

## 1. Identity

| Element | Wert |
|---------|------|
| **App-Name** | K-Learning |
| **Tagline** | Dein smarter Lernbegleiter |
| **Persönlichkeit** | Intelligent, fokussiert, motivierend — nie verspielt |
| **Primärfarbe** | K-Violet `#6C47FF` |
| **Font** | Nunito (400/600/700/800) |
| **Stil** | Dark-first, Glassmorphismus, subtile Gradienten |

---

## 2. Farbpalette

### Brand Accent
```
K-Violet (Primary)   #6C47FF   ████████  Hauptakzent, CTAs, aktive States
K-Violet Soft        #C4B5FD   ████████  Sekundärtext auf Accent-BG
K-Violet Light       rgba(108,71,255,0.15)   Hintergrund-Tints
Gradient             #6C47FF → #A855F7   Buttons, Hero-Elemente
```

### Semantic Colors
```
Success   #3DD68C   ████████  Richtig, Abgeschlossen, Streak
Warning   #FFB347   ████████  Hinweis, Pending
Danger    #FF6B6B   ████████  Fehler, Falsch
Info      #60A5FA   ████████  Neutral-Info, Links
```

### Dark Mode (Standard)
```
Background    #0D0D16   ████████  Tiefster Layer, main bg
Card          #19172A   ████████  Karten, Panels
Card Raised   #231F3A   ████████  Hover States, Dropdowns
Sidebar       #110F1C   ████████  Navigation
Text          #F0EEFF   ████████  Primary Text
Text 2        55% opacity   Sekundärtext, Labels
Text 3        28% opacity   Placeholder, Disabled
Border        rgba(255,255,255,0.09)   Subtile Trennlinien
```

### Light Mode
```
Background    #F5F3FF   ████████
Card          #FFFFFF   ████████
Accent        #5B3EE8   ████████  (etwas dunkler für Kontrast)
```

---

## 3. Typografie — 3-Rollen-System

K-Learning ist eine akademische App mit LaTeX/KaTeX. Drei Fonts, klar getrennt.

```
┌─────────────────────────────────────────────────────────────┐
│ ROLLE 1 · UI / Navigation / Controls   → Nunito (Sans)      │
│           Buttons, Labels, Nav, Badges, Metadaten           │
├─────────────────────────────────────────────────────────────┤
│ ROLLE 2 · Lerninhalte / Akademischer Text → Latin Modern    │
│           Erklärungen, Definitionen, Karteninhalte, Prose   │
├─────────────────────────────────────────────────────────────┤
│ ROLLE 3 · Formeln & Code  → KaTeX Math + JetBrains Mono     │
│           KaTeX: automatisch. Code-Blöcke: JetBrains Mono   │
└─────────────────────────────────────────────────────────────┘
```

**Warum Latin Modern + KaTeX harmonieren:**
KaTeX rendert Formeln in Computer Modern — Latin Modern Roman ist dessen direkte Weiterentwicklung. Beide sehen in einem Satz wie aus einem Guss aus. Das ist der Standard von Overleaf, ar5iv, und allen seriösen akademischen Apps.

### CSS-Variablen

```css
--font-ui:      'Nunito', system-ui, sans-serif
--font-content: 'Latin Modern Roman', 'Computer Modern', Georgia, serif
--font-mono:    'JetBrains Mono', 'Fira Code', monospace
```

### Anwendungsregeln

| Wo | Font | CSS |
|----|------|-----|
| Buttons, Nav, Labels, Badges | `--font-ui` | default (body) |
| Screen-Titel, Metadaten | `--font-ui` | default |
| Erklärungstexte, Definitionen | `--font-content` | `.prose` oder `.font-content` |
| Flashcard-Frage / Antwort | `--font-content` | `.flashcard-question/.answer` |
| Theorem- / Definitions-Block | `--font-content` | `.definition` / `.theorem` |
| KaTeX-Formeln | KaTeX intern | automatisch, kein Eingriff |
| Code-Blöcke, `<code>` | `--font-mono` | `.font-mono`, `code`, `pre` |

### Utility-Klassen (aus `typography.css`)

```html
<div class="prose">Akademischer Erklärungstext...</div>

<div class="definition">
  <span class="label">Definition</span>
  Der Erwartungswert E[X] ist...
</div>

<div class="theorem">
  <span class="label">Satz</span>
  Sei X ~ N(μ, σ²), dann gilt...
</div>

<code>inline code</code>
<pre><code>mehrzeiliger Code-Block</code></pre>
```

### Typografische Hierarchie (Grössen)

| Rolle | Grösse | Weight | Einsatz |
|-------|--------|--------|---------|
| Display | 2rem / 32px | 800 UI | Hero-Headlines, leere States |
| H1 | 1.5rem / 24px | 700 UI | Screen-Titel |
| H2 | 1.25rem / 20px | 700 UI | Section-Header |
| H3 | 1.05rem / 17px | 600 UI | Card-Titel |
| Prose Body | 1rem / 16px | 400 **Content** | Lerntexte, Erklärungen |
| Body | 0.9375rem / 15px | 400 UI | Allgemeiner UI-Text |
| Small | 0.8125rem / 13px | 400 UI | Meta, Timestamps |
| Caption | 0.6875rem / 11px | 600 UI | Badges |
| Label | 0.75rem / 12px | 600 CAPS UI | Feldbezeichnungen |

**Regel:** Max. 3 Grössen pro Screen. Nie unter 11px.

---

## 4. Abstände (Spacing)

```
4px   → Micro-Gap (Icon ↔ Label)
8px   → Tight (Badge-Padding, Icon-Gap)
12px  → Compact (Listen-Gap)
16px  → Base (Card-Padding mobile, Standard-Gap)
20px  → Comfortable (Section-Gap)
24px  → Generous (Card-Padding tablet)
32px  → Section (Trennabstand zwischen Sections)
48px  → Large (Hero-Padding)
64px  → XL (Screen-Top-Padding)
```

---

## 5. Border Radius

```
xs   6px   → Tags, kleine Chips
sm   10px  → Inputs, kleine Karten
md   16px  → Standard-Karten, Buttons
lg   22px  → Grosse Karten, Modals
xl   28px  → Hero-Cards, Feature-Tiles
2xl  36px  → Sheets, Bottom-Drawers
pill 999px → Pills, Avatar-Rahmen
```

---

## 6. Schatten

```css
--shadow-sm:     0 1px 3px rgba(0,0,0,0.25)                  /* Subtle lift */
--shadow-md:     0 4px 16px rgba(0,0,0,0.35)                 /* Karten-Hover */
--shadow-lg:     0 8px 32px rgba(0,0,0,0.45)                 /* Modals */
--shadow-accent: 0 4px 24px rgba(108,71,255,0.35)            /* Accent-CTA */
--shadow-card:   0 2px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)
```

---

## 7. Animationen

```
fast    150ms  → Hover-States, Farb-Transitions
normal  250ms  → Karten-Hover, Slide-Transitions
slow    400ms  → Page-Transitions, Modals
```

**Easing:**
```
easeOut:  cubic-bezier(0.25,0.46,0.45,0.94)  → Standard
spring:   cubic-bezier(0.34,1.56,0.64,1)     → Buttons, Bounce-Effekte
```

---

## 8. Komponenten-Patterns

### Glass Card (Standard)
```css
background: var(--card);
border: 1px solid var(--border);
border-radius: var(--r-lg);
padding: 20px;
transition: background 250ms, border-color 250ms, transform 250ms;
/* hover: */
background: var(--card-raised);
border-color: var(--border-h);
transform: translateY(-2px);
box-shadow: 0 8px 32px rgba(0,0,0,0.45);
```

### Primary Button
```css
background: var(--accent-grad-135);
color: white;
border-radius: var(--r-md);
padding: 12px 20px;
font-weight: 700;
box-shadow: var(--shadow-accent);
/* hover: scale(1.02), active: scale(0.97) */
```

### Badge / Chip
```css
background: var(--accent-l);
color: var(--accent-soft);
border: 1px solid var(--accent-border);
border-radius: var(--r-pill);
padding: 3px 10px;
font-size: 0.6875rem;
font-weight: 600;
```

### Bottom Tab Bar (Mobile)
```css
position: fixed; bottom: 0; left: 0; right: 0;
height: 56px;
background: rgba(13,13,22,0.92);
backdrop-filter: blur(20px);
border-top: 1px solid var(--border);
z-index: 40;
```

---

## 9. Do's & Don'ts

### ✅ DO
- Dark Mode als Standard — Light Mode ist optional
- K-Violet `#6C47FF` für primäre CTAs verwenden
- Gradient nur für **einen** Haupt-CTA pro Screen
- Hover-States auf **allen** klickbaren Elementen
- Touch-Targets min. 44×44px auf Mobile
- Nunito für alle Texte — keine Ausnahmen

### ❌ DON'T
- Kein reines Schwarz (`#000000`) als Hintergrund — zu hart
- Kein weisser Text auf farbigem Hintergrund wenn Kontrast < 4.5:1
- Kein Text kleiner als 11px
- Nie mehr als 3 Schriftgrössen auf einem Screen
- Keine `success`-Farbe `#3DD68C` für CTAs — nur für Erfolgs-States
- Kein harter Schatten ohne `border-radius`

---

## 10. File-Struktur

```
K-Learning/
├── branding/
│   ├── brand.css              ← CSS-Variablen (immer zuerst laden)
│   ├── brand.js               ← JS KBrand-Objekt (programmatischer Zugriff)
│   ├── tokens.json            ← Master-Quelle aller Werte
│   ├── identity/
│   │   ├── klearning-logo-primary.svg
│   │   ├── klearning-logo-white.svg
│   │   ├── klearning-icon-1024.png
│   │   └── favicon.ico
│   ├── fonts/
│   │   ├── README.md          ← Anleitung zum Download
│   │   └── Nunito-*.woff2     ← Self-hosted (wenn CDN ersetzt wird)
│   └── guidelines/
│       └── BRAND_GUIDE.md     ← Diese Datei
├── assets/
│   ├── icons/                 ← UI-Icons als SVG
│   └── images/                ← Illustrationen, Hintergründe
```

---

## 11. In-Session Checkliste

Vor dem Bauen eines neuen Screens oder einer Komponente:

- [ ] Welche **Tokens** braucht diese Komponente? (Farbe, Radius, Spacing)
- [ ] Ist das Touch-Target auf Mobile ≥ 44px?
- [ ] Gibt es einen **Hover** und **Active**-State?
- [ ] Stimmt der **Kontrast** Text zu Hintergrund?
- [ ] Ist der Screen konsistent mit der **Bottom-Tab-Höhe** (56px)?
- [ ] Werden nur `var(--...)` CSS-Variablen verwendet — keine Hardcode-Werte?

---

## 12. Schnell-Referenz CSS-Variablen

```css
/* Backgrounds */     var(--bg) var(--card) var(--card-raised) var(--sidebar-bg)
/* Text */            var(--txt) var(--txt-2) var(--txt-3)
/* Accent */          var(--accent) var(--accent-l) var(--accent-border) var(--accent-soft)
/* Gradient */        var(--accent-grad) var(--accent-grad-135)
/* Semantic */        var(--success) var(--warning) var(--danger)
/* Border */          var(--border) var(--border-h)
/* Radius */          var(--r-xs) var(--r-sm) var(--r-md) var(--r-lg) var(--r-xl) var(--r-pill)
/* Font */            var(--font-base)
```
