# Plan: Prüfungs-Inhalte auf R2 statt Supabase (Stand 2026-10-20, von der K-Dev-Session)

STOPP: Den laufenden Import über die Staging-Tabelle (`public._busta_stage`, Weg A) NICHT fortsetzen. Falls schon etwas angelegt wurde: aufräumen und melden. Der Kurs bleibt privat (is_public=false, is_secret=true), bis Raphael freigibt.

## Entscheidung von Raphael
- Prüfungs-Inhalte (Aufgaben/Texte) liegen auf Cloudflare R2, wie die Videos. Supabase hält nur Metadaten, Berechtigungen, Ergebnisse, Antworten.
- Kurs ist öffentlich, Inhalt aber hinter einer Paywall. URL-Raten darf nichts bringen -> privater Bucket, KEINE öffentliche URL.
- Prüfungen müssen offline ausfüllbar sein. Ergebnisse gehen bei Verbindung nach Supabase.

## Architektur
- R2 (privat): `exams/<kurs>/<pruefung>.v<N>.json`, unveränderlich, Version im Namen, `content_hash` (sha256) in Supabase.
- Zugriff nur über einen Cloudflare-Worker: App sendet Supabase-JWT, Worker prüft JWT + Berechtigung (Tabelle in Supabase, später via RevenueCat/Kauf), liefert die Datei oder 403. Gratis-Vorschau-Prüfungen optional in einem öffentlichen Präfix.
- Der Worker wird von der K-Dev-Session gebaut und deployt (gemeinsam mit Piggy-Quittungsbildern). Du baust NICHT selbst Worker/Token-Handling.
- Supabase bleibt: eine Zeile pro Prüfung in k_exams (Titel, Kurs, Version, content_key, content_hash, Sichtbarkeit), Berechtigungen, Ergebnisse, Entwürfe, KI-Korrektur. Musterlösung und Rubriken für die KI-Korrektur bleiben in Supabase/serverseitig, nie in der App oder auf R2-Public.
- Offline: App lädt die Prüfung einmal berechtigt, cached sie lokal (Version+Hash), Antworten zuerst lokal, Sync nach Supabase bei Verbindung. Bei abgelaufenem Abo lokalen Cache sperren.
- Nur NEUE Prüfungen (BuSta) zuerst. Bestehende k_exams.content später migrieren.

## Deine Aufgaben
1. Ebene 1 (Idee) in `.kdev/PROJECT.md` / Partial anpassen: Inhalte nicht mehr nur in Supabase (Idee-Historie ergänzen), Raphael bestätigen lassen, danach Code.
2. Import-Skript: statt SQL-Literal die Prüfungs-JSONs nach `exams/busta/` als Dateien ablegen (Upload-Weg liefert K-Dev, bis dahin Dateien vorbereiten unter `build/r2-exams/` mit Hash-Liste) und pro Prüfung nur die kleine Metadaten-Zeile als SQL (passt unter 32 KB).
3. App: Laden über Worker-URL mit JWT, lokaler Cache, Offline-Ausfüllen, Sync der Ergebnisse. Tests dazu.
4. Berechtigungs-Tabelle/Spalte vorschlagen (wer darf welchen Kurs), mit Migration.
5. Übergabe an K-Dev wie gewohnt (`/api/handover`), kein eigener Commit/Deploy.
