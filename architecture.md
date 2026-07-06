# K-Learning — Architektur-Masterplan (3-Schichten)

> Stand: Juni 2026 · **v3.0** | Supabase: `ifmwcgwfvunjbnfwwbtr` | Cloudflare: `k-learning.pages.dev`  
> Dieses Dokument ist der Masterplan für die Umstellung auf die professionelle 3-Schichten-Architektur.  
> **Keine Code-Änderungen ohne Freigabe dieses Plans.**
>
> **v3.0 (Juni 2026):** Two-Slot-Swipe-Engine (deadlock-frei), SM-2 Flashcards live, Codebase-Aufräumung (Daten-Monolithen archiviert), architecture.md um Sektionen 7–10 erweitert.  
> **Phase 3 abgeschlossen:** EMA + Streak-Gewichtung in `save_exam_result()`, `get_user_feed()` mit Deduplication, `topic_weights` um `ema_accuracy` + `correct_streak` erweitert.

---

## 1. Architektur-Übersicht — Die 3 Schichten

```
┌─────────────────────────────────────────────────────────────┐
│  SCHICHT 3: FRONTEND                                         │
│  Vanilla JS · Tailwind CDN · Cloudflare Pages               │
│                                                              │
│  feed.js ──── get_user_feed() ──────────────────────┐       │
│  feed.js ──── rate_video() ─────────────────────────┤       │
│  exam.js ──── exam_results (neu) ───────────────────┤       │
│  flashcards.js, topics.js, dashboard.js             │       │
└─────────────────────────────────────────────┬───────┘       
                                              │ Supabase JS Client
┌─────────────────────────────────────────────▼───────────────┐
│  SCHICHT 2: BACKEND (Supabase)                               │
│  PostgreSQL · Auth · Storage · Edge Functions · RLS          │
│                                                              │
│  RPC-Funktionen (serverseitige Logik):                       │
│  ├── get_user_feed()     Feed-Priorisierung + SM-2           │
│  ├── rate_video()        SM-2 Algorithmus                    │
│  ├── save_exam_result()  Prüfungs-Ergebnisse (geplant)       │
│  └── get_ai_key_internal() BYOK Vault (service_role only)    │
│                                                              │
│  Edge Function: ai-proxy                                     │
│  └── JWT verify → liest Key aus Vault → Claude/OpenAI-API   │
└─────────────────────────────────────────────┬───────────────┘
                                              │
┌─────────────────────────────────────────────▼───────────────┐
│  SCHICHT 1: DATENSPEICHER                                    │
│                                                              │
│  Supabase Storage: Bucket "videos" (MP4, public)             │
│  Cloudflare R2:    k-learning-videos/ (HLS .m3u8, geplant)  │
│  Supabase Vault:   Verschlüsselte API-Keys (BYOK)            │
│                                                              │
│  Tabellen:                                                   │
│  ├── videos          Content-Katalog                         │
│  ├── video_progress  SM-2 Fortschritt pro User × Video       │
│  ├── exam_results    Prüfungsergebnisse (geplant)            │
│  ├── topic_weights   Themen-Gewichtung aus Prüfungen (geplant)│
│  └── documents       Hochgeladene Lernmaterialien            │
└─────────────────────────────────────────────────────────────┘
```

### Wie die Schichten zusammenwirken

Der Browser (Schicht 3) kommuniziert **ausschliesslich** über den Supabase JS Client mit dem Backend (Schicht 2). Es gibt keinen eigenen API-Server. Alle sicherheitskritischen Operationen (Key-Zugriff, Prüfungs-Auswertung, SM-2-Berechnung) laufen als PostgreSQL-Funktionen oder Edge Functions in Schicht 2 — der Browser erhält nur die fertig aufbereiteten Daten.

Schicht 1 (Storage + R2) ist für das Frontend nie direkt schreibbar. Uploads laufen über Supabase Storage SDK mit RLS-Policies, die sicherstellen, dass ein User nur in seinen eigenen Ordner schreiben kann.

---

## 2. Datenbankschema

### 2.1 Tabelle: `videos` — Content-Katalog

```sql
CREATE TABLE public.videos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,     -- stabile ID, z.B. 'esf-sv-01'
  title           TEXT NOT NULL,
  subtitle        TEXT,
  description     TEXT,
  course          TEXT NOT NULL,            -- 'ESF' | 'Statistik' | 'MakroII' | 'OM'
  course_color    TEXT DEFAULT '#7c3aed',
  block           TEXT,                     -- Themenblock, z.B. 'M01 — Grundlagen'
  topics          TEXT[] DEFAULT '{}',      -- Schlagworte, z.B. '{Normalverteilung,z-Test}'
  duration        TEXT,                     -- Anzeigeformat '1:36'
  level           TEXT,                     -- 'Prüfungsrelevant ⚡' | 'Vertiefung 📚'
  type            TEXT DEFAULT 'localvideo',
  video_src       TEXT,                     -- Supabase Storage MP4-URL (Fallback)
  hls_src         TEXT,                     -- Cloudflare R2 master.m3u8 (bevorzugt)
  thumbnail_emoji TEXT DEFAULT '🎬',
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** Öffentliches Lesen (`SELECT`). Schreiben nur via `service_role`.

**Aktueller Bestand:** 10 ESF-Videos, 19 Statistik-Videos (Stand Juni 2026).

---

### 2.2 Tabelle: `video_progress` — SM-2 Lernfortschritt

```sql
CREATE TABLE public.video_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id         UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  UNIQUE(user_id, video_id),

  -- SM-2 Felder
  status           TEXT    DEFAULT 'new',       -- new | learning | review | mastered
  ease_factor      FLOAT   DEFAULT 2.5,         -- E-Faktor: min 1.3, max 3.0
  interval_days    INT     DEFAULT 0,           -- aktuelles Wiederholungsintervall
  next_review_at   TIMESTAMPTZ DEFAULT NOW(),   -- nächste fällige Wiederholung
  review_count     INT     DEFAULT 0,           -- Gesamtanzahl Bewertungen
  last_rating      TEXT,                        -- 'knew' | 'didnt'
  last_reviewed_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** User sieht und schreibt nur eigene Zeilen (`auth.uid() = user_id`).

**Status-Lebenszyklus:**
```
[new] ──(erster onPlay)──► [new]
                              │
            rate('didnt') ◄───┤───► rate('knew') ──► [review]
                 │                                        │
             [learning]                       interval >= 21 Tage
          (next_review: +10min)                           │
                                                      [mastered]
```

---

### 2.3 Tabelle: `exam_results` — Prüfungsergebnisse (geplant)

```sql
CREATE TABLE public.exam_results (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id       TEXT NOT NULL,     -- z.B. 'esf-hs23', 'statistik-pk2'
  course        TEXT NOT NULL,
  score_pct     INT NOT NULL,      -- Gesamtergebnis in Prozent (0–100)
  answers       JSONB NOT NULL,    -- [{question_id, topic, is_correct, chosen, correct}]
  taken_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** User sieht nur eigene Ergebnisse.

---

### 2.4 Tabelle: `topic_weights` — Themen-Schwächen-Profil ✅

```sql
CREATE TABLE public.topic_weights (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course         TEXT NOT NULL,
  topic_tag      TEXT NOT NULL,     -- Schlagwort, z.B. 'Normalverteilung'
  UNIQUE(user_id, course, topic_tag),

  wrong_count    INT   DEFAULT 0,   -- kumulativ, für Anzeige im Profil
  correct_count  INT   DEFAULT 0,
  ema_accuracy   FLOAT DEFAULT 0.5, -- EMA-gewichtete Genauigkeit (α=0.35), 0.0–1.0
  correct_streak INT   DEFAULT 0,   -- aufeinanderfolgende richtige Antworten
  priority       FLOAT DEFAULT 1.0, -- Feed-Multiplikator 1.0–4.0
  last_updated   TIMESTAMPTZ DEFAULT NOW()
);
```

**Algorithmus (EMA + Streak):**
```
ema_accuracy = ema_accuracy × 0.65 + new_result × 0.35   (new_result: 1.0 richtig, 0.0 falsch)
correct_streak: +1 bei richtig, reset auf 0 bei falsch

streak_factor = 0.15  wenn streak ≥ 3   (Thema gilt als verstanden)
              = 0.50  wenn streak = 2
              = 0.75  wenn streak = 1
              = 1.00  wenn streak = 0

priority = 1.0 + (1.0 − ema_accuracy) × 3.0 × streak_factor
```

**Beispiel:** Thema oft falsch (EMA ≈ 0.1), dann 3× richtig:

| Schritt | EMA | Streak | Priority |
|---------|-----|--------|---------|
| Ausgangslage | 0.10 | 0 | 3.70 |
| 1× richtig | 0.42 | 1 | 2.30 |
| 2× richtig | 0.62 | 2 | 1.57 |
| 3× richtig | 0.75 | 3 | **1.11** → unter Feed-Threshold |

---

## 3. Algorithmus-Logik

### 3.1 `rate_video(p_user_id, p_video_id, p_rating)` — SM-2 Update

Der SM-2-Algorithmus (SuperMemo 2) bestimmt, wann ein Video erneut angezeigt wird. Er wird nach jedem "Kapiert / Nochmal"-Klick aufgerufen.

```
Eingabe: user_id, video_id, rating ('knew' | 'didnt')

─── Rating = 'knew' ────────────────────────────────────────────
  Neues Intervall:
    review_count = 0  →  interval = 1 Tag
    review_count = 1  →  interval = 6 Tage
    review_count ≥ 2  →  interval = round(prev_interval × ease_factor)

  Ease-Factor anpassen:
    ease_factor = min(3.0, ease_factor + 0.1)

  Status:
    interval ≥ 21 Tage  →  'mastered'
    sonst               →  'review'

  next_review_at = NOW() + interval Tage

─── Rating = 'didnt' ───────────────────────────────────────────
  interval = 1 Tag
  next_review_at = NOW() + 10 Minuten   (sofort wiederholen)
  ease_factor = max(1.3, ease_factor - 0.2)
  status = 'learning'
```

**Beispiel-Verlauf (alles 'knew'):**

| Bewertung | Intervall | Nächste Wiederholung | ease_factor |
|-----------|-----------|----------------------|-------------|
| 1. Mal    | 1 Tag     | Morgen               | 2.6         |
| 2. Mal    | 6 Tage    | In 6 Tagen           | 2.7         |
| 3. Mal    | 16 Tage   | In 16 Tagen          | 2.8         |
| 4. Mal    | 45 Tage   | In 45 Tagen → mastered | 2.9       |

---

### 3.2 `get_user_feed(p_user_id, p_course, p_limit)` — Feed-Priorisierung ✅

Bestimmt, welche Videos in welcher Reihenfolge im Feed erscheinen. Läuft als PostgreSQL-Funktion, nie im Browser.

**Prioritätsstufen:**

| Priorität | Bedingung | Sortierung |
|-----------|-----------|------------|
| 0.0 — Fällig | SM-2: `status IN ('new','learning','review')` und `next_review_at <= NOW()` | Ältestes Review zuerst |
| 0.5 — Schwäche | `topic_weights.priority > 1.5` und nicht mastered | `MAX(priority)` × 1h — stärkstes Thema zuerst |
| 1.0 — Neu | Noch kein `video_progress`-Eintrag | `created_at` aufsteigend |

**Deduplication:** Ein Video, das in mehreren Buckets matcht (z.B. SM-2 fällig UND schwaches Thema), erscheint nur einmal — in der niedrigsten Prioritätsstufe. Bei Priority 0.5 gewinnt das stärkste passende Topic-Signal via `MAX(tw.priority)`.

**Threshold:** `priority > 1.5` entspricht EMA-Genauigkeit < 83% ohne aktiven Streak — Videos verschwinden aus dem Fokus-Bucket, sobald ein Thema als "Verstanden" gilt.

---

## 4. Zukunftssicherheit — Prüfungs-Schnittstelle

### 4.1 Funktionsprinzip

Wenn ein User eine Probeklausur abschliesst, passiert folgendes:

```
User beendet Prüfung (exam.js)
  │
  ├── exam_results eintragen:
  │   save_exam_result(user_id, exam_id, score, answers[])
  │
  └── topic_weights aktualisieren:
      Für jede falsch beantwortete Frage:
        → Extrahiere question.topics[]
        → Erhöhe wrong_count in topic_weights
        → Berechne neues priority-Gewicht
      Für jede korrekte Frage:
        → Erhöhe correct_count
        → Senke priority-Gewicht

      get_user_feed() liest topic_weights automatisch
      → Videos zu schwachen Themen erscheinen zuerst
```

### 4.2 Datenfluss-Diagramm

```
exam.js (Frontend)
  │
  │  rate('esf-hs23', answers[])
  ▼
save_exam_result() [Supabase RPC]
  │
  ├── INSERT INTO exam_results (score, answers, ...)
  │
  └── UPDATE topic_weights:
        Frage falsch + topics=['Normalverteilung','z-Test']
          → wrong_count['Normalverteilung'] += 1
          → wrong_count['z-Test'] += 1
          → priority['Normalverteilung'] = 1 + (wrong/(wrong+right+1)) × 3
          → priority['z-Test'] = ...

get_user_feed() [nächster Feed-Aufruf]
  │
  └── JOIN topic_weights ON topic_tag = ANY(v.topics)
        → Videos zu 'Normalverteilung' erscheinen oben
        → Schwächste Themen → höchste Priorität
```

### 4.3 Schema-Erweiterung für Prüfungsfragen (Anforderung an exam-data.js)

Damit das System funktioniert, müssen Prüfungsfragen ein `topics`-Feld haben, das mit den `topics`-Arrays der Videos übereinstimmt:

```js
// In exams/esf-hs23-data.js — jede Frage braucht topics:
{
  id: "esf-hs23-q01",
  question: "Was ist ein Laborexperiment?",
  topics: ["Laborexperiment", "Kausalität", "Experiment"],  // ← muss mit videos.topics matchen
  options: [...],
  correct: 0
}
```

**Wichtig:** Die Schlagworte in `exam questions[].topics` und `videos.topics` müssen identisch sein (Case-sensitive). Empfehlung: Kanonische Tag-Liste als `data/topics-tags.js` anlegen.

### 4.4 RPC-Funktion: `save_exam_result()` ✅

Kernlogik der EMA + Streak-Aktualisierung (vereinfacht):

```sql
-- Bei richtiger Antwort:
ema_accuracy   = ema_accuracy * 0.65 + 0.35
correct_streak = correct_streak + 1
priority       = 1.0 + (1.0 - new_ema) * 3.0 * streak_factor

-- Bei falscher Antwort:
ema_accuracy   = ema_accuracy * 0.65      -- × 0.0 entfällt
correct_streak = 0
priority       = 1.0 + (1.0 - new_ema) * 3.0

-- Hinweis: PostgreSQL evaluiert alle SET-RHS gegen den alten Row-State,
-- daher ist new_ema = ema_accuracy * 0.65 + 0.35 konsistent inline verwendbar.
```

---

## 5. Implementierungsplan (Phasen)

| Phase | Scope | Status |
|-------|-------|--------|
| **Phase 1** | Supabase Auth + Google OAuth | ✅ Live |
| **Phase 1** | `videos` + `video_progress` Tabellen | ✅ Live |
| **Phase 1** | `get_user_feed()` + `rate_video()` RPCs | ✅ Live |
| **Phase 1** | Feed: SM-2 Priorisierung + HLS-Ready | ✅ Live |
| **Phase 2** | BYOK AI-Key via Supabase Vault | ✅ Live |
| **Phase 2** | Prüfungs-Modus (exam.js) | ✅ Live |
| **Phase 2** | Alle Videos in Supabase DB (ESF + Statistik) | ✅ Live |
| **Phase 3** | `exam_results` Tabelle + `save_exam_result()` RPC | ✅ Live |
| **Phase 3** | `topic_weights` Tabelle + EMA/Streak-Algorithmus | ✅ Live |
| **Phase 3** | `get_user_feed()` Erweiterung mit topic_weights + Dedup | ✅ Live |
| **Phase 3** | Kanonische topics-Tag-Liste für Fragen + Videos | ⏳ Offen |
| **Phase 3** | Two-Slot-Swipe-Engine + SM-2 in Flashcards | ✅ Live (v3.0) |
| **Phase 3** | Codebase-Aufräumung: Archivierung Daten-Monolithen | ✅ Live (v3.0) |
| **Phase 4** | HLS-Transcoding + Cloudflare R2 Streaming | ⏳ Geplant |
| **Phase 4** | `courses`-Tabelle in Supabase (Kurs-Erweiterbarkeit) | ⏳ Geplant |
| **Phase 4** | Edge Function `get-flashcard-chunk` (25-Karten-Chunks) | ⏳ Geplant |
| **Phase 4** | Anki-Algorithmus ins Backend verlagern | ⏳ Geplant |
| **Phase 5** | `user_entitlements` + `billing_events` Tabellen | ✅ Schema bereit |
| **Phase 5** | `js/billing.js` — Entitlement-Check im Frontend | ✅ Live |
| **Phase 5** | `workers/billing/` — RevenueCat Webhook Worker | ✅ Code bereit |
| **Phase 5** | `workers/billing/` — Stripe Webhook + Sig-Verify | ✅ Code bereit |
| **Phase 5** | RevenueCat Dashboard konfigurieren (app_user_id = Supabase UUID) | ⏳ Offen |
| **Phase 5** | Stripe + TWINT in CHF aktivieren | ⏳ Offen |
| **Phase 5** | Worker deployen + Secrets setzen | ⏳ Offen |
| **Phase 5** | Paywall-Modal (UI) statt alert() | ⏳ Offen |
| **Phase 5** | Prepaid Credits-System (Stripe payment_intent → credits_balance) | ⏳ Offen |

---

## 6. Technische Constraints

- **Kein Build-Step:** Das Frontend ist reines Vanilla JS. Keine npm-Abhängigkeiten im Deploy.
- **Cloudflare Pages deployt von `main`:** Nie direkt auf `main` entwickeln. Branch: `develop` → merge → `main`.
- **RLS überall:** Jede Tabelle mit User-Daten hat Row Level Security. Kein Bypass via Frontend möglich.
- **Key-Sicherheit:** API-Keys verlassen den Supabase Vault nie. Der Browser sendet nur JWT-Token, nie den Key.
- **topics-Tags:** Müssen zwischen `videos.topics` und `exam questions[].topics` exakt übereinstimmen — sonst greift der Prüfungs-Algorithmus nicht.

---

## 7. Admin- & Kurs-Erweiterbarkeit (Zielzustand: 100% dynamisch)

### Problem (Ist-Zustand)
Kursmetadaten (Name, Farbe, Emoji, Prüfungsdatum, Raum, NotebookLM-ID) sind hartcodiert in `data/courses-config.js` als `window.COURSES_CONFIG`-Array. Neue Kurse erfordern manuelles Editieren der JS-Datei und einen neuen Deployment-Zyklus.

### Ziel-Zustand: Supabase-Tabelle `courses`

```sql
CREATE TABLE public.courses (
  key          TEXT PRIMARY KEY,             -- 'ESF' | 'Statistik' | 'MakroII' | 'OM'
  label        TEXT NOT NULL,
  icon         TEXT NOT NULL DEFAULT '📚',   -- Emoji
  hex_color    TEXT NOT NULL DEFAULT '#6366f1',
  tailwind_bg  TEXT,                         -- 'bg-purple-900' (für UI-Klassen)
  exam_date    DATE,
  exam_room    TEXT,
  exam_format  TEXT,
  notebook_id  TEXT,                         -- NotebookLM Notebook-ID
  sort_order   INT DEFAULT 0,
  active       BOOLEAN DEFAULT true,         -- false = Kurs ausgeblendet
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** Öffentliches Lesen. Schreiben nur `service_role`.

### Migration (Frontend)

```js
// dashboard.js, courseHub.js, learnPath.js:
// Vorher: const all = window.COURSES_CONFIG || [];
// Nachher:
const { data: courses } = await supabase.from('courses').select('*').eq('active', true).order('sort_order');
```

Bis zur Migration bleibt `data/courses-config.js` als `window.COURSES_CONFIG` der Source of Truth. Die Felder sind so gewählt, dass ein 1:1-Mapping zur DB-Tabelle möglich ist.

---

## 8. Video-Infrastruktur (Datenstrom & Speicher)

### Aktueller Datenstrom (Ist-Zustand)

```
Browser (feed.js)
  │
  ├── [Eingeloggt]  supabase.rpc('get_user_feed', { p_user_id, p_course, p_limit: 30 })
  │     └── PostgreSQL liest aus `videos`-Tabelle → gibt video_src-URLs zurück
  │           └── URL-Format: https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/<slug>.mp4
  │
  └── [Anonym]  window.FEED_CARDS (data/feed-data.js, statischer Fallback)
        └── Gleiche URL-Struktur: Supabase Storage Bucket "videos"
```

### Zuordnung im Content-Katalog (`videos`-Tabelle)

Jedes Video ist ein Datensatz mit:
- `slug` — stabile, sprechende ID (z.B. `esf-sv-01-v2`), entspricht dem Dateinamen ohne `.mp4`
- `video_src` — vollständige Supabase-Storage-URL (aktuell aktiv)
- `hls_src` — zukünftig: Cloudflare R2 `.m3u8`-URL für adaptives Streaming

```sql
-- Neues Video hinzufügen:
INSERT INTO videos (slug, title, course, block, video_src, sort_order)
VALUES (
  'statistik-08-korrelation',
  'Korrelation & Kausalität',
  'Statistik',
  'M03 — Zusammenhänge',
  'https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/statistik_08_korrelation.mp4',
  80
);
```

### Ziel-Infrastruktur: Cloudflare R2 + HLS

```
MP4-Rohvideo (lokal, /videos/)
  │
  ├── tools/transcode_hls.sh   → FFmpeg → HLS-Segmente (.ts) + master.m3u8
  │
  └── tools/upload_r2.sh       → wrangler r2 object put k-learning-videos/<slug>/ …
        └── R2-URL: https://videos.k-learning.pages.dev/<slug>/master.m3u8
              └── In videos.hls_src eintragen
```

feed.js nutzt `hls_src` prioritär (Hls.js), fällt auf `video_src` zurück:
```js
const src = card.hls_src || card.video_src;
const isHLS = src?.endsWith('.m3u8');
```

---

## 9. Rolling Feed & Skalierung (Pagination)

### Aktueller Zustand
`get_user_feed()` lädt fix 30 Videos in einem Batch (`p_limit: 30`). Kein Nachladen, kein Offset.

### Ziel: Unendlicher Nachlade-Mechanismus

**Schritt 1 — RPC erweitern:**

```sql
-- Neues Parameter in get_user_feed():
CREATE OR REPLACE FUNCTION get_user_feed(
  p_user_id UUID,
  p_course  TEXT DEFAULT NULL,
  p_limit   INT  DEFAULT 20,
  p_offset  INT  DEFAULT 0      -- ← neu
) RETURNS TABLE (...)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
    -- ... (bestehende Logik) ...
    OFFSET p_offset
    LIMIT  p_limit;
END;
$$;
```

**Schritt 2 — Frontend (feed.js):**

```js
let feedOffset = 0;
const FEED_PAGE = 20;

async function loadMore() {
  const { data } = await supabase.rpc('get_user_feed', {
    p_user_id: userId,
    p_course:  activeFilter,
    p_limit:   FEED_PAGE,
    p_offset:  feedOffset,
  });
  feedOffset += data.length;
  _appendCards(data);
  if (data.length < FEED_PAGE) _hideLoadMoreTrigger(); // Ende erreicht
}
```

**Schritt 3 — IntersectionObserver:**
Wenn das letzte sichtbare Video zu 80% in den Viewport scrollt → `loadMore()` aufrufen. Das bestehende `observer`-Objekt in `feed.js` lässt sich dafür erweitern.

---

## 10. Flashcard-Streaming-Architektur (Zielzustand)

### Problem (Ist-Zustand)
`flashcards.js` lädt **alle** Karten des Users via `supabase.from('deck_cards').select('*')` in einem einzigen Query. Bei einem grossen Deck (500+ Karten) bedeutet das:
- Hohe Latenz beim ersten Laden
- Grosse Payload (alle Karten, auch bereits gemeisterte)
- Keine Priorisierung durch SM-2 vor dem Transfer

### Ziel: Chunk-basiertes Laden via Edge Function

**Architektur:**

```
flashcards.js (Frontend)
  │
  └── POST /functions/v1/get-flashcard-chunk
        { user_id, course, deck_id, chunk_size: 25 }
        │
        └── Edge Function (Deno):
              1. Liest card_progress für user_id aus DB
              2. Berechnet SM-2-Fälligkeiten serverseitig
              3. Gibt die 25 höchst-priorisierten Karten zurück
              4. Sortierung: fällig → schwach → neu
```

**Edge Function Pseudocode:**

```ts
// supabase/functions/get-flashcard-chunk/index.ts
Deno.serve(async (req) => {
  const { user_id, course, chunk_size = 25 } = await req.json();
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // 1. Alle fälligen Karten (next_review <= now)
  const { data: due } = await supabase
    .from('deck_cards')
    .select('*, card_progress!inner(*)')
    .eq('card_progress.user_id', user_id)
    .lte('card_progress.next_review', new Date().toISOString())
    .eq('course', course)
    .limit(chunk_size);

  // 2. Auffüllen mit neuen Karten falls < chunk_size
  // 3. Rückgabe: 25 Karten, sortiert nach Priorität
  return new Response(JSON.stringify(due));
});
```

**Vorteil:** Frontend erhält immer genau 25 Karten, Anki-Algorithmus läuft serverseitig, keine 265KB-Monolith-JS-Datei mehr nötig.

---

# ToDo

## Flashcard-Skalierung (Phase 4)

- [ ] **1. Daten-Monolith auflösen:** `data/flashcard-data.js` (265KB) vollständig abschalten. Alle Karten ausschliesslich aus Supabase `deck_cards`-Tabelle laden. `window.FLASHCARD_DATA`-Fallback entfernen.

- [ ] **2. Anki-Algorithmus ins Backend verlagern:** Neue Edge Function `get-flashcard-chunk` implementieren (siehe Sektion 10). Die SM-2-Berechnung (`interval`, `ease`, `next_review`) aus `flashcards.js` in eine PostgreSQL-Funktion oder Edge Function auslagern. Frontend ist nur noch Renderer, kein Algorithmus-Träger.

- [ ] **3. Hartcodierte UI-Daten entfernen:** `data/courses-config.js` durch Supabase `courses`-Tabelle ersetzen (siehe Sektion 7). `data/topics-data.js` und `data/topics-tags.js` durch DB-Abfragen oder statische Supabase-Config ersetzen.
