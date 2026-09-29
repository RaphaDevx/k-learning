# K-OCR / Content Generation Pipeline (Archiviert)

Archiviert am 2026-06-06. Kann jederzeit reaktiviert werden.

## Reaktivierung
1. Dateien zurück nach `tools/content_gen/` verschieben
2. `pip install anthropic` im ki_pipeline_env sicherstellen
3. `python3 pipeline.py --course [kurs-id]` ausführen

## Was die Pipeline macht
- Liest Kurs-Markdown-Notizen aus HSG-Ordnern
- Generiert Lernkarten via Claude API
- Generiert Reel-Scripts für Video-Produktion
- Schreibt direkt in `data/flashcard-data.js`

## Kurs-Configs
- `courses/esf.json` — Empirische Sozialforschung
- `courses/statistik.json` — Statistik
