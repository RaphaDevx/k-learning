# K-Learning

## Ebene 1 — Idee
Lernplattform (Web, native, macOS), in der Kurse, Prüfungen, Karten und Videos als Inhalt auf Servern liegen und die Apps generische Hüllen sind. Neue Inhalte erscheinen ohne App-Update.

- Kurse sind öffentlich sichtbar, Prüfungsinhalte liegen hinter einer Paywall. Prüfungs-Aufgaben liegen auf privatem Cloudflare R2 und werden nur über einen Worker mit Supabase-Token und Berechtigung geliefert. Supabase hält Metadaten, Berechtigungen, Ergebnisse, Antworten sowie Musterlösungen und Rubriken (nie in der App).
- Prüfungen sind offline ausfüllbar: einmal berechtigt laden, lokal cachen, Antworten lokal, Sync bei Verbindung.
- BuSta (8 Originalprüfungen) wird zuerst so gebaut; der Kurs bleibt privat, bis Raphael freigibt. Bestehende Prüfungen folgen später.
- KI-Korrektur nur serverseitig, nach Rubrik, mit Budgetgrenze; Unsicherheit oder Fehler ergeben nie 0 Punkte.

## Idee-Historie
- 2026-10-15: Content-Split. Kurse, Prüfungen, Karten, Videos nur in Supabase.
- 2026-10-20: Prüfungsinhalte nach R2 (privat, Worker), Supabase nur Metadaten/Berechtigung/Ergebnisse/Lösungen. Offline-Ausfüllen. (Bestätigt von Raphael; ADR 0002.)

## Ebene 2 — Umsetzung
Siehe `ARCHITECTURE.md`, `docs/adr/0001-busta-grading.md`, `docs/adr/0002-exam-content-on-r2.md`, `PLAN-pruefungen-r2.md`.
