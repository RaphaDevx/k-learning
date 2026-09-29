# K-Learning — Pre-Deploy Checklist

Vor jedem `wrangler pages deploy` diese Punkte manuell prüfen.
Funktionen die schon einmal kaputt waren sind mit ⚠️ markiert — diese **immer** testen.

---

## ⚠️ Feed-Algorithmus (ist schon ausgefallen)

- [ ] Feed öffnen → mindestens 3 Reels erscheinen (kein leerer Screen)
- [ ] Feed schliessen und neu öffnen → **andere Reihenfolge** als vorher (RANDOM() aktiv)
- [ ] Kurs-Filter antippen → nur Videos des gewählten Kurses erscheinen
- [ ] Bis ans Ende scrollen → nächste Batch lädt nach (Infinite Scroll)
- [ ] Alle Videos gesehen → Cycling-Modus startet (Reels kommen wieder, andere Reihenfolge)

**Was kaputt gehen kann:**
- Supabase RPC `get_user_feed` wirft Fehler → Feed bleibt leer oder zeigt Fallback
- `RANDOM()` wurde aus der SQL entfernt → immer gleiche Reihenfolge
- `p_exclude_ids` zu gross → Supabase Query Timeout → leerer Feed
- `_seenIds` Reset-Logik → Duplikate im Feed

---

## Navigation / Tab-Router

- [ ] Alle 5 Tabs tippen → richtiger Screen erscheint
- [ ] Zurück-Navigation innerhalb Tab (z.B. Lernen → Flashcards → zurück) funktioniert
- [ ] Re-Tap auf aktiven Tab → scrollt nach oben / geht zur Root

---

## Prüfungen

- [ ] Prüfung starten → Fragen erscheinen korrekt
- [ ] Prüfung abschliessen → Ergebnis wird angezeigt und in Supabase gespeichert
- [ ] Korrektur-Modus → alle Fragen durchgehbar, KI-Chat öffnet sich
- [ ] Prüfungshistorie → vergangene Prüfungen erscheinen mit `📋`-Button
- [ ] Historischer Review → Fragen + Antworten korrekt rekonstruiert
- [ ] **KI-Probeexamen** → Fragen werden generiert (braucht OR-Key), Ergebnis gespeichert

---

## Lernkarten (Flashcards)

- [ ] Kurs auswählen → Karten laden
- [ ] Swipe links/rechts → nächste Karte
- [ ] `✨ Erklären` Button → AI-Chat öffnet sich mit Karten-Kontext
- [ ] LaTeX-Formeln (`$...$`) werden gerendert

---

## KI-Chat

- [ ] FAB nur auf Flashcard-Screen sichtbar (nicht auf anderen Screens)
- [ ] Chat öffnen → Nachricht senden → Antwort erscheint
- [ ] Ohne OR-Key → Fehlermeldung statt Absturz

---

## Lernprofil (Profil-Tab)

- [ ] Bereitschafts-Score erscheint pro Kurs
- [ ] Prüfungshistorie zeigt vergangene Ergebnisse
- [ ] Exam-Countdown sichtbar wenn Prüfung ≤ 30 Tage entfernt

---

## Auth

- [ ] Eingeloggt → Profil-Daten erscheinen
- [ ] Supabase-Abfragen funktionieren (kein 401-Fehler in Console)

---

## Deployment-Prozess selbst

```bash
# 1. Syntax-Check aller geänderten JS-Dateien
node --check js/screens/DATEI.js

# 2. Git commit + push (History)
git add [Dateien]
git commit -m "..."
git push origin main

# 3. Wrangler deploy (Live-Site)
source /home/claude/.keys/tokens.env
CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN npx wrangler pages deploy . --project-name k-learning --branch main

# 4. Live-Verifikation (charakteristischen String prüfen)
curl -sL "https://k-learning.pages.dev/js/screens/DATEI.js?v=$(date +%s)" | grep -c "SUCHSTRING"
```

---

## Supabase RPC — kritische Funktionen

| RPC | Prüfen ob... |
|---|---|
| `get_user_feed` | Gibt Videos zurück, RANDOM() in Score vorhanden |
| `save_exam_result` | Schreibt in `exam_results`, kein Fehler |
| `save_ai_key` | Speichert Key in Vault |

SQL-Check:
```sql
-- get_user_feed hat RANDOM():
SELECT prosrc FROM pg_proc WHERE proname = 'get_user_feed';
-- Ausgabe muss "RANDOM()" enthalten
```
