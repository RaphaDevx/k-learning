> **EXPORT VERSION** — Kein K-Learning-Kontext. Pfade in Phase 0 + 4A anpassen.
> Installieren: Datei nach `~/.claude/commands/create-exam.md` kopieren, dann `/create-exam` in Claude Code nutzen.
> Für K-Learning: Original-Skill von Raphael Kaufmann verwenden.

# Exam Builder v3 — Shareable Skill

Konvertiert Prüfungen aus PDF oder Markdown in das **Open Exam JSON Format v1** —
kompatibel mit der K-Learning Plattform und jedem Standalone-Browser-Viewer.

**Trigger**: `/create-exam`, `/create-exam --standalone`, „erstelle Prüfung aus PDF/MD"

---

## Workflow-Übersicht

```
Phase 0 — Discovery (Quelldateien + fehlende Infos)
Phase 1 — Lesen (MD/PDF vollständig verarbeiten)
Phase 2 — Grafiken extrahieren (pdfimages → OCR-Check → komprimieren)
Phase 3 — JSON im Speicher generieren + Preview zeigen
          ↓  User sagt "Lock Exam"
Phase 4 — Schreiben (JSON + Assets + Registrierung + optional Standalone-HTML)
Phase 5 — Abschlussbericht
```

**Nichts wird geschrieben bevor "Lock Exam" kommt.**

---

## ═══════════════════════════════════════════════
## OPEN EXAM JSON FORMAT v1 — SCHEMA CONTRACT
## ═══════════════════════════════════════════════
##
## Felder markiert mit 🔒 LOCKED sind Platform-API.
## Sie dürfen NIEMALS umbenannt, entfernt oder in ihrer
## Bedeutung verändert werden — egal in welchem Kontext
## der Skill adaptiert wird.
##
## Felder markiert mit 🔧 ADAPTABLE können für den
## jeweiligen Use-Case angepasst, erweitert oder
## weggelassen werden.
##
## ═══════════════════════════════════════════════

```json
{
  "_meta": {
    "schemaVersion": "1",            // 🔒 immer "1" für diese Version
    "sourceFile": "pruefung.pdf",    // 🔧 Quelldatei-Name
    "createdAt": "2026-01-15",       // 🔧 ISO-Datum
    "promptVersion": "create-exam-v3", // 🔧 Skill-Version
    "status": "draft"                // 🔒 "draft" → "final" nach Lock Exam
  },

  "id": "esf-hs23",                  // 🔒 kebab-case, global eindeutig, z.B. "kurs-semester"
  "title": "ESF — Herbstsemester 23",// 🔒 Anzeigename in der Plattform
  "course": "ESF",                   // 🔒 Kurs-Key, muss COURSES_CONFIG.key entsprechen
  "courseColor": "#7c3aed",          // 🔒 Hex-Farbe für UI-Akzente
  "durationMinutes": 60,             // 🔒 Prüfungsdauer → IMMER = totalPoints (Regel: 1 Pkt = 1 Min)
  "totalPoints": 60,                 // 🔒 Gesamtpunktzahl
  "resourceLink": "assets/exams/esf-hs23/original-exam.pdf", // 🔒 Pfad zum Original-PDF (null wenn kein Download)

  "examInfo": {
    "date": "15.01.2023",            // 🔒 Datum oder Semester-String
    "duration": "60 Minuten",        // 🔒 Lesbare Dauer
    "format": "30 Single Choice",    // 🔒 Prüfungsformat-Beschreibung
    "allowedAids": "Keine",          // 🔒 Erlaubte Hilfsmittel
    "grading": "Note 6.0: ≥85%, Note 5.5: ≥75%, Note 5.0: ≥65%, Note 4.5: ≥55%, Note 4.0: ≥45%, Note 3.5: ≥35%, Note 3.0: ≥25%"
    //          🔒 Notenschlüssel — anpassen wenn Prüfung anderen Schlüssel hat, aber Feld bleibt
  },

  "scoringRules": {                  // 🔒 gesamter Block locked — Plattform berechnet damit Punkte
    "single_choice": { "correct": 2, "wrong": 0, "blank": 0 },
    "multiple_choice": { "allCorrect": 2, "anyWrong": 0, "blank": 0 }
    // Werte dürfen geändert werden (z.B. Negativpunkte), Keys nicht
  },

  "telemetry": {                     // 🔧 ADAPTABLE — weglassen für Standalone, Plattform ignoriert null
    "hook": "onQuestionChange",
    "saveEndpoint": "save_exam_result",
    "trackDuration": true,
    "trackClicks": true
  },

  "sections": [
    {
      "id": "teil1",                 // 🔒 eindeutiger Abschnitts-Key
      "title": "Teil I: Grundlagen (20 Punkte)", // 🔒 Anzeige-Titel
      "description": "Anweisungstext", // 🔧 Freitext für Studierende
      "context": "Sachverhalt...",   // 🔧 gemeinsamer Kontext für mehrere Fragen (null wenn nicht nötig)
      "points": 20,                  // 🔒 Punkte dieses Abschnitts
      "questionType": "single_choice", // 🔒 "single_choice" | "multiple_choice" | "open"

      "questions": [
        {
          "id": "esf-hs23-q01",      // 🔒 "{exam-id}-q{NN}" — global eindeutig
          "number": 1,               // 🔒 Fragenummer (1-based)
          "text": "Was ist...",      // 🔒 Fragetext — darf LaTeX enthalten (siehe unten)
          "type": "single_choice",   // 🔒 "single_choice" | "multiple_choice" | "open"
          "points": 2,               // 🔒 Punkte dieser Frage
          "expectedDuration": 2,     // 🔧 Minuten (default = points × 1)

          "imageHtml": null,         // 🔒 HTML-String für Grafik (null wenn keine) — Inhalt ADAPTABLE
          "imageAsset": null,        // 🔧 Pfad zum Original-Bild für externe Nutzung

          "choices": [               // 🔒 Array — NUR bei single_choice/multiple_choice
            { "key": "A", "text": "Antwort A" }, // 🔒 key = Buchstabe, text = Antworttext
            { "key": "B", "text": "Antwort B" },
            { "key": "C", "text": "Antwort C" },
            { "key": "D", "text": "Antwort D" }
          ],

          "correct": ["C"],          // 🔒 Array mit richtigen Keys — null bei open
          "modelAnswer": null,       // 🔒 Musterlösung für offene Fragen (null bei MC/SC)

          "explanation": "C ist richtig weil...", // 🔒 Begründung — immer ausfüllen
          "topics": ["Marktversagen", "Externalitäten"], // 🔒 1–3 Tags für Lernprofil-Tracking

          "metadata": {              // 🔧 FREI ERWEITERBAR — Plattform liest nur bekannte Felder
            "difficulty": null,      // 🔧 "easy" | "medium" | "hard" | null
            "category": null,        // 🔧 frei
            "latex": false,          // 🔧 true wenn Frage LaTeX enthält (für Viewer-Hint)
            "_generated": false      // 🔧 true wenn Lösung AI-generiert (zur manuellen Prüfung)
          }
        }
      ]
    }
  ],

  "_validation": [                   // 🔒 Feld bleibt, Inhalt ADAPTABLE
    "⚠ Q06 Choices A/B aus PDF-Seite rekonstruiert — bitte prüfen"
  ]
}
```

---

## ADAPTABLE — Was darf geändert werden

Die folgenden Bereiche können **ohne Einschränkung** an den Use-Case angepasst werden.
Das Ausgabe-Schema bleibt dabei unverändert.

### 1. LaTeX-Formeln in Fragetext und Antworten

Verwende Standard-LaTeX-Notation direkt im `text`- und `choices[].text`-Feld:

```json
"text": "Berechne $\\lim_{x \\to 0} \\frac{\\sin x}{x}$",
"choices": [
  { "key": "A", "text": "$0$" },
  { "key": "B", "text": "$1$" },
  { "key": "C", "text": "$\\infty$" }
],
"metadata": { "latex": true }
```

- Inline: `$...$`
- Block: `$$...$$`
- Setze `"latex": true` in `metadata` — der Standalone-Viewer rendert dann KaTeX
- Die Plattform muss KaTeX laden wenn `latex: true` vorkommt (einmalige Erweiterung)

### 2. imageHtml — Grafikformat frei wählbar

Der Inhalt von `imageHtml` ist vollständig adaptierbar:

```json
// Base64 JPG (Standard — funktioniert offline)
"imageHtml": "<img src=\"data:image/jpeg;base64,{B64}\" style=\"max-width:100%;border-radius:8px;margin:8px 0;\">"

// URL-Referenz (Plattform mit Asset-Hosting)
"imageHtml": "<img src=\"assets/exams/kurs-id/fig-q01-name.jpg\" style=\"max-width:100%;\">"

// SVG inline (für einfache Diagramme)
"imageHtml": "<svg width='200' height='100'>...</svg>"

// HTML-Tabelle (für Bilanzen, Matrizen)
"imageHtml": "<table class='exam-table'>...</table>"

// KaTeX-Block (für mathematische Darstellungen)
"imageHtml": "<div class='katex-block'>$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$</div>"
```

### 3. Grafik-Extraktions-Pipeline

Die Befehle in Phase 2 (pdfimages, ImageMagick, tesseract) sind Empfehlungen, keine Vorschriften.
Alternativen:
- Manuelle Screenshots → direkt komprimieren
- Python `pypdf2` / `pdfplumber`
- Online-PDF-to-Image-Converter
- Kein Bild nötig → `"imageHtml": null` lassen

### 4. Deployment-Ziel (Phase 4)

Phase 4 beschreibt den K-Learning-spezifischen Deployment-Pfad.
Für andere Plattformen: Phase 4 komplett ersetzen, Schema bleibt gleich.

Optionen:
- **K-Learning**: Standardpfad (Phase 4 wie dokumentiert)
- **Standalone**: `--standalone` Flag → erzeugt self-contained HTML (kein Server nötig)
- **Andere Plattform**: JSON per API hochladen, `resourceLink` auf eigenen Asset-Store zeigen
- **LMS-Export**: JSON in Moodle-XML oder SCORM konvertieren (anderes Tool nötig)

### 5. Freie Felder in metadata

`metadata` ist ein offenes Objekt — beliebige Felder hinzufügen:

```json
"metadata": {
  "difficulty": "hard",
  "category": "Infinitesimalrechnung",
  "latex": true,
  "source": "Musterlösung FS22 S.4",
  "reviewed": false,
  "tags": ["Analysis", "Grenzwerte"]
}
```

---

## LOCKED — Was NICHT geändert werden darf

| Was | Warum |
|---|---|
| `id`, `course`, `courseColor` | Plattform-Routing + Farbgebung |
| `durationMinutes = totalPoints` | Timer-Logik der Plattform |
| `scoringRules` Key-Namen | Punkte-Berechnung |
| `sections[].questionType` Werte | Renderer-Dispatch |
| `questions[].id` Schema | Supabase `topic_weights` FK |
| `questions[].correct` als Array | MC/SC-Auswertungs-Logik |
| `questions[].topics` als Array | Lernprofil-Vektor in Supabase |
| `_meta.status` = "draft"/"final" | Deployment-Gate |
| `_meta.schemaVersion` = "1" | Versionierungs-Check |
| `_validation` als Array | Muss immer vorhanden sein (darf leer sein `[]`) |

---

## Phase 0 — Discovery

**K-Learning Pfade:**
```bash
ls "{DEIN-PRÜFUNGSPFAD}/{KURS}/"
# optional: bekannte Topics-Tags für konsistentes Tagging laden
```

**Standalone / andere Plattform:** Pfade vom User erfragen.

Frage **einmal kompakt** was fehlt:

| Fehlt | Aktion |
|---|---|
| Kein MD, nur PDF | PDF visuell lesen — frage ob MD-Zwischendatei gewünscht |
| Kein Antwortschlüssel | Ins `_validation`-Array, User fragen |
| Unklare Grafik | Ins `_validation`-Array mit Seiten-Referenz |
| Keine Dauer | Default: `durationMinutes = totalPoints` |
| LaTeX-Fragen erkannt | Notieren: `metadata.latex = true` setzen |

---

## Phase 1 — Quelldateien lesen

MD/PDF vollständig lesen. Identifizieren:
- Abschnitte + Fragetypen
- Punkte pro Frage + Abschnitt
- Grafiken (Seite + Beschreibung)
- Antwortbogen / Lösungsschlüssel
- LaTeX-Formeln (→ `metadata.latex = true`)

---

## Phase 2 — Grafik-Extraktion

**Regel: pdfimages zuerst — nie SVG aus Tabellen nachbauen.**

### Schritt 1: Eingebettete Bilder prüfen
```bash
pdfimages -list "{pfad/zur/pruefung.pdf}"
```

### Schritt 2: Alle extrahieren
```bash
mkdir -p /tmp/exam_imgs
pdfimages -png "{pfad/zur/pruefung.pdf}" /tmp/exam_imgs/img
ls -lh /tmp/exam_imgs/
```

### Schritt 3: Visuell prüfen (Read-Tool) + Lösungstext-Check
```bash
tesseract /tmp/exam_imgs/img-00N.png stdout 2>/dev/null | grep -iE "correct|lösung|answer|richtig|solution|X\s+[ABCDE]"
```
Lösungstext gefunden → ImageMagick-Crop:
```bash
convert /tmp/exam_imgs/img-00N.png -gravity South -chop 0x20% /tmp/exam_imgs/img-00N-clean.png
```

### Schritt 4: Komprimieren
```bash
# Diagramme: max 500px, 85%
convert /tmp/exam_imgs/img-00N-clean.png -quality 85 -resize 500x /tmp/exam_imgs/q{NN}_app.jpg
# Bilanzen / komplexe Grafiken: max 720px, 82%
convert /tmp/exam_imgs/img-00N-clean.png -quality 82 -resize 720x /tmp/exam_imgs/q{NN}_app.jpg
```

### Schritt 5a: base64 (Standalone / Offline)
```bash
base64 -w 0 /tmp/exam_imgs/q{NN}_app.jpg > /tmp/q{NN}_b64.txt
```
→ `imageHtml`: `<img src="data:image/jpeg;base64,{B64}" style="max-width:100%;border-radius:8px;margin:8px 0;">`

### Schritt 5b: URL-Referenz (K-Learning / Plattform mit Asset-Hosting)
→ `imageHtml`: `<img src="assets/exams/{id}/fig-q{NN}-{name}.jpg" style="max-width:100%;">`
→ `imageAsset`: `"assets/exams/{id}/fig-q{NN}-{name}.png"` (Original für Archiv)

### Fallback: Seiten-Screenshot
```bash
pdftoppm -r 150 -f {N} -l {N} -png "{pdf}" /tmp/pg
convert /tmp/pg-{N}.png -crop {W}x{H}+{X}+{Y} -quality 82 /tmp/q{NN}_app.jpg
```

---

## Phase 3 — JSON generieren (im Speicher) + Preview

### Asset-Manifest (immer vor Preview erstellen)

```
ASSET-MANIFEST: {Titel}
══════════════════════════════════════════════
Quelle:     {Pfad}
Modus:      K-Learning | Standalone
LaTeX:      ja / nein

GRAFIKEN ({N} total):
  Q06  fig-q06-barchart.jpg   → pdfimages img-001  ✓ sauber
  Q15  fig-q15-tabelle.jpg    → pdfimages img-003  ✓ sauber

VALIDATION ({N} Punkte):
  1. Q12 Antwortschlüssel fehlt — aus Kontext abgeleitet
══════════════════════════════════════════════
```

### Preview zeigen

```
📋 PREVIEW: {Titel}
──────────────────────────────────────────
ID:        {id}
Fragen:    {N} ({SC} SC + {MC} MC + {O} Offen)
Punkte:    {total}
Dauer:     {min} Min  (= {total} Pkte)
LaTeX:     ja ({X} Fragen) / nein
Grafiken:  {N} — pdfimages, sauber
Modus:     K-Learning / Standalone
Status:    DRAFT

⚠ VALIDATION:
  1. ...

→ "Lock Exam"              — finalisieren
→ "Lock Exam [Korrektur]"  — mit Anpassung finalisieren
→ "Lock Exam --standalone" — zusätzlich Standalone-HTML erzeugen
```

**Warten. Nicht schreiben.**

---

## Phase 4A — K-Learning Deployment (Standard)

### 4A.1 Infrastruktur prüfen
```bash
grep -n "_loadExamJSON" {DEIN-EXAM-RENDERER}
```

Falls `_loadExamJSON` fehlt → in `exam.js` einfügen (nach EXAM_REGISTRY):
```javascript
async function _loadExamJSON(entry) {
  const r = await fetch(entry.file + '?v=' + Date.now());
  if (!r.ok) throw new Error('Exam JSON not found: ' + entry.file);
  return r.json();
}
```
Und in `loadExam` ergänzen:
```javascript
if (entry.format === 'json') {
  _examData = await _loadExamJSON(entry);
} else {
  _examData = window[entry.dataVar] || null;
}
```

### 4A.2 Dateien schreiben
```bash
# JSON
{PLATTFORM-PFAD}/exams/{id}-data.json

# Assets
mkdir -p {PLATTFORM-PFAD}/assets/exams/{id}/
cp "{original-pdf}" {PLATTFORM-PFAD}/assets/exams/{id}/original-exam.pdf
# Grafiken: URL-Referenz (nicht base64) — Bilder ins assets-Verzeichnis kopieren
cp /tmp/exam_imgs/img-00N.png {PLATTFORM-PFAD}/assets/exams/{id}/fig-q{NN}-{name}.png
```

### 4A.3 EXAM_REGISTRY eintragen (`js/screens/exam.js`)
```javascript
{
  id: '{id}',
  label: '{Label} — {Semester}',
  course: '{Kurs-Key}',
  dataVar: null,
  file: 'exams/{id}-data.json',
  format: 'json',
  available: true,
},
```
Kein `<script>`-Tag in `index.html` nötig (lazy-load).

### 4A.4 JSON validieren
```bash
node -e "JSON.parse(require('fs').readFileSync('{PLATTFORM-PFAD}/exams/{id}-data.json','utf8'))" && echo "✓ valid"
```

### 4A.5 `_meta.status` → `"final"` setzen

### 4A.6 Commit & Push
```bash
git -C {DEIN-REPO-PFAD} add exams/{id}-data.json assets/exams/{id}/ js/screens/exam.js
git -C {DEIN-REPO-PFAD} commit -m "Add {Titel}"
git -C {DEIN-REPO-PFAD} push
```

---

## Phase 4B — Standalone HTML (bei `--standalone` Flag)

Erzeugt eine **self-contained HTML-Datei** — kein Server, kein Login nötig.
Grafiken als base64 eingebettet. KaTeX-Support wenn `metadata.latex: true`.

Datei: `{id}-standalone.html`

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{EXAM_TITLE}</title>
<!-- KaTeX — nur laden wenn latex:true in mindestens einer Frage -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]})"></script>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh}
  .container{max-width:680px;margin:0 auto;padding:24px 16px}
  .header{background:#1e293b;border-radius:16px;padding:20px;margin-bottom:24px;border:1px solid #334155}
  .header h1{font-size:1.25rem;font-weight:700;margin-bottom:6px}
  .header .meta{font-size:.8rem;color:#94a3b8;display:flex;gap:16px;flex-wrap:wrap}
  .section{background:#1e293b;border-radius:12px;margin-bottom:16px;overflow:hidden;border:1px solid #334155}
  .section-title{padding:14px 18px;font-weight:600;font-size:.9rem;background:#0f172a;border-bottom:1px solid #334155}
  .section-context{padding:12px 18px;font-size:.85rem;color:#94a3b8;border-bottom:1px solid #1e293b;background:#1a2436}
  .question{padding:18px;border-bottom:1px solid #1e293b}
  .question:last-child{border-bottom:none}
  .q-header{display:flex;gap:8px;align-items:baseline;margin-bottom:10px}
  .q-num{font-size:.75rem;font-weight:700;color:#64748b;flex-shrink:0}
  .q-text{font-size:.9rem;line-height:1.5}
  .q-image{margin:10px 0}
  .q-image img,.q-image table{max-width:100%;border-radius:8px}
  .choices{display:flex;flex-direction:column;gap:6px;margin-top:12px}
  .choice{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;background:#0f172a;border:1.5px solid #334155;cursor:pointer;transition:all .15s;font-size:.875rem}
  .choice:hover{border-color:#6366f1;background:#1a1a3e}
  .choice.selected{border-color:#6366f1;background:#1e1b4b}
  .choice.correct{border-color:#22c55e;background:#052e16}
  .choice.wrong{border-color:#ef4444;background:#2d0a0a}
  .choice-key{width:24px;height:24px;border-radius:50%;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;flex-shrink:0}
  .explanation{margin-top:12px;padding:12px;border-radius:8px;background:#0f2117;border:1px solid #166534;font-size:.83rem;color:#86efac;display:none}
  .explanation.visible{display:block}
  .open-answer{margin-top:10px;width:100%;background:#0f172a;border:1.5px solid #334155;border-radius:10px;padding:12px;color:#e2e8f0;font-size:.875rem;min-height:100px;resize:vertical}
  .model-answer{margin-top:10px;padding:12px;border-radius:8px;background:#1a1200;border:1px solid #854d0e;font-size:.83rem;color:#fde68a;display:none}
  .model-answer.visible{display:block}
  .actions{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
  .btn{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;font-weight:600;font-size:.85rem;transition:all .15s}
  .btn-check{background:#6366f1;color:white}.btn-check:hover{background:#4f46e5}
  .btn-reveal{background:#334155;color:#e2e8f0}.btn-reveal:hover{background:#475569}
  .score-bar{position:sticky;bottom:0;background:#1e293b;border-top:1px solid #334155;padding:14px 24px;display:flex;justify-content:space-between;align-items:center;font-size:.875rem}
  .score-num{font-weight:700;font-size:1.1rem;color:#6366f1}
  .badge{padding:2px 8px;border-radius:999px;font-size:.7rem;font-weight:600}
  .badge-sc{background:#1e1b4b;color:#a5b4fc}
  .badge-mc{background:#052e16;color:#86efac}
  .badge-open{background:#1a1200;color:#fde68a}
  .download-btn{display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:8px 16px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#94a3b8;font-size:.8rem;text-decoration:none;cursor:pointer}
  .download-btn:hover{border-color:#6366f1;color:#a5b4fc}
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1 id="exam-title"></h1>
    <div class="meta" id="exam-meta"></div>
    <a id="download-btn" class="download-btn" style="display:none" target="_blank">📄 Original-PDF</a>
  </div>

  <div id="exam-content"></div>

</div>

<div class="score-bar">
  <span>Punkte: <span class="score-num" id="score-display">0 / 0</span></span>
  <span id="progress-display" style="color:#64748b;font-size:.8rem"></span>
</div>

<script>
// ── Exam JSON (eingebettet von create-exam Skill) ──────────────────────────
const EXAM = {EXAM_JSON_PLACEHOLDER};
// ──────────────────────────────────────────────────────────────────────────

const state = { answers: {}, revealed: {} };

function init() {
  document.getElementById('exam-title').textContent = EXAM.title;
  const ei = EXAM.examInfo || {};
  document.getElementById('exam-meta').innerHTML = [
    ei.date && `<span>📅 ${ei.date}</span>`,
    ei.duration && `<span>⏱ ${ei.duration}</span>`,
    ei.format && `<span>${ei.format}</span>`,
    ei.allowedAids && `<span>📚 ${ei.allowedAids}</span>`,
  ].filter(Boolean).join('');

  if (EXAM.resourceLink) {
    const dl = document.getElementById('download-btn');
    dl.href = EXAM.resourceLink;
    dl.style.display = 'inline-flex';
  }

  const content = document.getElementById('exam-content');
  content.innerHTML = (EXAM.sections || []).map(section => renderSection(section)).join('');
  updateScore();
}

function renderSection(s) {
  const typeBadge = { single_choice:'SC', multiple_choice:'MC', open:'Offen' }[s.questionType] || s.questionType;
  const badgeClass = { single_choice:'badge-sc', multiple_choice:'badge-mc', open:'badge-open' }[s.questionType] || '';
  return `
    <div class="section">
      <div class="section-title">
        ${s.title} <span class="badge ${badgeClass}" style="margin-left:8px">${typeBadge}</span>
      </div>
      ${s.context ? `<div class="section-context">${s.context}</div>` : ''}
      ${(s.questions || []).map(q => renderQuestion(q, s.questionType)).join('')}
    </div>`;
}

function renderQuestion(q, sectionType) {
  const type = q.type || sectionType;
  const choicesHtml = (q.choices || []).map(c => `
    <div class="choice" id="choice-${q.id}-${c.key}" onclick="selectChoice('${q.id}','${c.key}','${type}')">
      <div class="choice-key">${c.key}</div>
      <div>${c.text}</div>
    </div>`).join('');

  const openHtml = type === 'open' ? `
    <textarea class="open-answer" id="open-${q.id}" placeholder="Deine Antwort..."></textarea>
    ${q.modelAnswer ? `<div class="model-answer" id="ma-${q.id}"><strong>Musterlösung:</strong><br>${q.modelAnswer}</div>` : ''}` : '';

  const actionsHtml = type === 'open'
    ? (q.modelAnswer ? `<button class="btn btn-reveal" onclick="revealAnswer('${q.id}')">Musterlösung zeigen</button>` : '')
    : `<button class="btn btn-check" onclick="checkAnswer('${q.id}')">Prüfen</button>`;

  return `
    <div class="question" id="q-${q.id}">
      <div class="q-header">
        <span class="q-num">${q.number}.</span>
        <span class="q-text">${q.text}</span>
      </div>
      ${q.imageHtml ? `<div class="q-image">${q.imageHtml}</div>` : ''}
      ${type !== 'open' ? `<div class="choices">${choicesHtml}</div>` : openHtml}
      <div class="explanation" id="exp-${q.id}">${q.explanation || ''}</div>
      <div class="actions">${actionsHtml}</div>
    </div>`;
}

function selectChoice(qId, key, type) {
  if (state.revealed[qId]) return;
  if (type === 'single_choice') {
    state.answers[qId] = [key];
    document.querySelectorAll(`[id^="choice-${qId}-"]`).forEach(el => el.classList.remove('selected'));
  } else {
    if (!state.answers[qId]) state.answers[qId] = [];
    const idx = state.answers[qId].indexOf(key);
    if (idx >= 0) state.answers[qId].splice(idx, 1);
    else state.answers[qId].push(key);
  }
  const el = document.getElementById(`choice-${qId}-${key}`);
  if (el) el.classList.toggle('selected', (state.answers[qId] || []).includes(key));
}

function checkAnswer(qId) {
  if (state.revealed[qId]) return;
  state.revealed[qId] = true;
  const q = findQuestion(qId);
  if (!q) return;
  const given = state.answers[qId] || [];
  const correct = q.correct || [];
  (q.choices || []).forEach(c => {
    const el = document.getElementById(`choice-${qId}-${c.key}`);
    if (!el) return;
    const isCorrect = correct.includes(c.key);
    const isGiven = given.includes(c.key);
    el.classList.remove('selected');
    if (isCorrect) el.classList.add('correct');
    else if (isGiven && !isCorrect) el.classList.add('wrong');
  });
  const exp = document.getElementById(`exp-${qId}`);
  if (exp) exp.classList.add('visible');
  updateScore();
}

function revealAnswer(qId) {
  state.revealed[qId] = true;
  const ma = document.getElementById(`ma-${qId}`);
  if (ma) ma.classList.add('visible');
  const exp = document.getElementById(`exp-${qId}`);
  if (exp) exp.classList.add('visible');
}

function findQuestion(qId) {
  for (const s of EXAM.sections || []) {
    for (const q of s.questions || []) {
      if (q.id === qId) return q;
    }
  }
  return null;
}

function updateScore() {
  let earned = 0, total = 0, answered = 0;
  const rules = EXAM.scoringRules || {};
  for (const s of EXAM.sections || []) {
    for (const q of s.questions || []) {
      if (q.type === 'open') continue;
      total += q.points || 0;
      if (!state.revealed[q.id]) continue;
      answered++;
      const given = state.answers[q.id] || [];
      const correct = q.correct || [];
      const r = q.type === 'multiple_choice' ? (rules.multiple_choice || {}) : (rules.single_choice || {});
      const allRight = correct.length === given.length && correct.every(k => given.includes(k));
      const anyWrong = given.some(k => !correct.includes(k));
      if (allRight) earned += r.correct ?? r.allCorrect ?? 2;
      else if (anyWrong) earned += r.wrong ?? r.anyWrong ?? 0;
    }
  }
  document.getElementById('score-display').textContent = `${earned} / ${total}`;
  const allQ = (EXAM.sections||[]).flatMap(s=>s.questions||[]).filter(q=>q.type!=='open').length;
  document.getElementById('progress-display').textContent = `${answered} / ${allQ} geprüft`;
}

init();
</script>
</body>
</html>
```

**Einbettungs-Regel:**
- `{EXAM_JSON_PLACEHOLDER}` → vollständiges JSON ersetzen
- Grafiken als **base64** in `imageHtml` (nicht URL-Referenz), damit kein Server nötig
- `resourceLink` → zeigt auf externen PDF-Link oder `null` setzen

---

## Phase 5 — Abschlussbericht

```
✅ {Titel} — {K-Learning DEPLOYED | Standalone HTML erzeugt}
──────────────────────────────────────────
ID:         {id}
Format:     JSON (lazy-load) | Standalone HTML
Fragen:     {N} ({SC} SC + {MC} MC + {O} Offen)
Punkte:     {total}  |  Dauer: {min} Min
LaTeX:      {X} Fragen mit latex:true
Grafiken:   {N} × pdfimages — sauber ✓
Download:   assets/exams/{id}/original-exam.pdf ✓
VALIDATION: {N} offene Punkte im _validation-Array

→ Nächste Schritte (falls VALIDATION nicht leer):
  Fragen manuell prüfen, dann _validation auf [] setzen
```

---

## Sonderfälle

| Fall | Lösung |
|---|---|
| `pdfimages` findet nichts | Fallback: `pdftoppm -r 150` + präziser Crop |
| OCR erkennt Lösungstext | `convert -gravity South -chop 0x{N}%` |
| Offene Frage ohne Musterlösung | `"correct": null`, `"modelAnswer": null`, `"_generated": true` in metadata |
| Mehrere Prüfungen gleichzeitig | Alle JSONs im Speicher → gesammelter Preview → "Lock Exam all" |
| JS-Exam migrieren | `*-data.js` lesen → JSON konvertieren, altes JS bleibt für Rückwärtskompatibilität |
| Negativpunkte | `scoringRules.single_choice.wrong = -1` (Werte ändern erlaubt, Keys nicht) |
| Prüfung ohne Grafiken | Phase 2 überspringen |
| Formelsammlung als Bild | In `section.context` als `imageHtml` einbetten, nicht in jeder Frage |

---

## Skill adaptieren — Checkliste für andere Nutzer

Wenn du diesen Skill für eine andere Plattform oder Institution anpasst:

- [ ] **Phase 0**: Pfade auf deine Ordnerstruktur anpassen
- [ ] **Phase 4A**: Deployment-Logik für deine Plattform ersetzen
- [ ] **Phase 4B**: Standalone-Viewer CSS/JS nach Bedarf anpassen
- [ ] **Kurs-Farben**: Eigene Hex-Werte verwenden
- [ ] **Notenschlüssel**: `examInfo.grading` an deine Institution anpassen
- [ ] **LaTeX**: KaTeX CDN-Links auf gewünschte Version aktualisieren
- [ ] **NICHT ändern**: Alle mit 🔒 markierten Felder

Das JSON-Schema bleibt identisch — Prüfungen bleiben zwischen Plattformen portierbar.
