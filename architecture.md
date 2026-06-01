# K-Learning — Architektur-Masterplan (3-Schichten)

> Stand: Juni 2026 | Supabase: `ifmwcgwfvunjbnfwwbtr` | Cloudflare: `k-learning.pages.dev`  
> Dieses Dokument ist der Masterplan für die Umstellung auf die professionelle 3-Schichten-Architektur.  
> **Keine Code-Änderungen ohne Freigabe dieses Plans.**

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

### 2.4 Tabelle: `topic_weights` — Themen-Schwächen-Profil (geplant)

```sql
CREATE TABLE public.topic_weights (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course        TEXT NOT NULL,
  topic_tag     TEXT NOT NULL,     -- Schlagwort, z.B. 'Normalverteilung'
  UNIQUE(user_id, course, topic_tag),

  wrong_count   INT DEFAULT 0,     -- Prüfungsfragen falsch beantwortet
  correct_count INT DEFAULT 0,
  priority      FLOAT DEFAULT 1.0, -- Multiplikator für Feed-Algorithmus
  last_updated  TIMESTAMPTZ DEFAULT NOW()
);
```

**Logik:** `priority = 1.0 + (wrong_count / (wrong_count + correct_count + 1)) × 3.0`  
→ Thema vollständig falsch: priority ≈ 4.0 (sehr hoch)  
→ Thema vollständig richtig: priority ≈ 1.0 (normal)

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

### 3.2 `get_user_feed(p_user_id, p_course, p_limit)` — Feed-Priorisierung

Bestimmt, welche Videos in welcher Reihenfolge im Feed erscheinen. Läuft als PostgreSQL-Funktion, nie im Browser.

```sql
-- Aktuelle Implementierung (vereinfacht):
SELECT v.*, 0 AS _priority, vp.next_review_at AS _sort
FROM videos v
JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = p_user_id
WHERE (status = 'new' OR (status IN ('learning','review') AND next_review_at <= NOW()))
  AND (p_course IS NULL OR v.course = p_course)

UNION ALL

SELECT v.*, 1 AS _priority, v.created_at AS _sort
FROM videos v
WHERE NOT EXISTS (SELECT 1 FROM video_progress vp WHERE vp.video_id = v.id AND vp.user_id = p_user_id)
  AND (p_course IS NULL OR v.course = p_course)

ORDER BY _priority ASC, _sort ASC
LIMIT p_limit;
```

**Prioritätsstufen (aktuell):**

| Priorität | Bedingung | Sortierung |
|-----------|-----------|------------|
| 0 — Fällig | `status IN ('new','learning','review')` und Review überfällig | Ältestes Review zuerst |
| 1 — Neu | Noch kein `video_progress`-Eintrag | `sort_order` aufsteigend |

---

### 3.3 `get_user_feed()` — Erweiterung mit Prüfungs-Priorität (geplant)

Nach Implementierung der `topic_weights`-Tabelle wird der Algorithmus um eine dritte Prioritätsstufe erweitert:

```sql
-- Erweiterter Algorithmus (Entwurf):
SELECT v.*, 0 AS _priority, vp.next_review_at AS _sort, 1.0 AS _boost
FROM videos v
JOIN video_progress vp ON ...
WHERE (vp.status = 'new' OR (vp.status IN ('learning','review') AND vp.next_review_at <= NOW()))
-- ... (wie bisher)

UNION ALL

-- NEU: Videos zu schwachen Themen aus Prüfungen (Priorität 0.5 — zwischen fällig und neu)
SELECT v.*, 0.5 AS _priority, NOW() - (tw.priority * INTERVAL '1 day') AS _sort, tw.priority AS _boost
FROM videos v
JOIN topic_weights tw ON tw.user_id = p_user_id
  AND tw.course = v.course
  AND tw.topic_tag = ANY(v.topics)
  AND tw.priority > 1.5                       -- nur wenn Thema deutlich schwach
LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = p_user_id
WHERE (vp IS NULL OR vp.status NOT IN ('mastered'))
  AND (p_course IS NULL OR v.course = p_course)

UNION ALL

SELECT v.*, 1 AS _priority, v.created_at AS _sort, 1.0 AS _boost
FROM videos v
WHERE NOT EXISTS (...)
-- ... (wie bisher)

ORDER BY _priority ASC, _sort ASC
LIMIT p_limit;
```

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

### 4.4 Neue RPC-Funktion: `save_exam_result()`

```sql
CREATE OR REPLACE FUNCTION public.save_exam_result(
  p_user_id  UUID,
  p_exam_id  TEXT,
  p_course   TEXT,
  p_score    INT,
  p_answers  JSONB         -- [{question_id, topics[], is_correct}]
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  answer JSONB;
  tag    TEXT;
BEGIN
  -- 1. Gesamtergebnis speichern
  INSERT INTO public.exam_results (user_id, exam_id, course, score_pct, answers)
  VALUES (p_user_id, p_exam_id, p_course, p_score, p_answers);

  -- 2. topic_weights aktualisieren
  FOR answer IN SELECT * FROM jsonb_array_elements(p_answers) LOOP
    FOR tag IN SELECT * FROM jsonb_array_elements_text(answer->'topics') LOOP
      INSERT INTO public.topic_weights (user_id, course, topic_tag)
      VALUES (p_user_id, p_course, tag)
      ON CONFLICT (user_id, course, topic_tag) DO NOTHING;

      IF (answer->>'is_correct')::BOOLEAN THEN
        UPDATE public.topic_weights
        SET correct_count = correct_count + 1,
            priority = 1.0 + ((wrong_count::FLOAT / (wrong_count + correct_count + 2)) * 3.0),
            last_updated = NOW()
        WHERE user_id = p_user_id AND course = p_course AND topic_tag = tag;
      ELSE
        UPDATE public.topic_weights
        SET wrong_count = wrong_count + 1,
            priority = 1.0 + (((wrong_count + 1)::FLOAT / (wrong_count + correct_count + 2)) * 3.0),
            last_updated = NOW()
        WHERE user_id = p_user_id AND course = p_course AND topic_tag = tag;
      END IF;
    END LOOP;
  END LOOP;
END;
$$;
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
| **Phase 3** | `exam_results` Tabelle + `save_exam_result()` RPC | ⏳ Geplant |
| **Phase 3** | `topic_weights` Tabelle + Algorithmus | ⏳ Geplant |
| **Phase 3** | `get_user_feed()` Erweiterung mit topic_weights | ⏳ Geplant |
| **Phase 3** | Kanonische topics-Tag-Liste für Fragen + Videos | ⏳ Geplant |
| **Phase 4** | HLS-Transcoding + Cloudflare R2 Streaming | ⏳ Geplant |
| **Phase 4** | Flashcards aus Supabase statt statische JS-Datei | ⏳ Geplant |

---

## 6. Technische Constraints

- **Kein Build-Step:** Das Frontend ist reines Vanilla JS. Keine npm-Abhängigkeiten im Deploy.
- **Cloudflare Pages deployt von `main`:** Nie direkt auf `main` entwickeln. Branch: `develop` → merge → `main`.
- **RLS überall:** Jede Tabelle mit User-Daten hat Row Level Security. Kein Bypass via Frontend möglich.
- **Key-Sicherheit:** API-Keys verlassen den Supabase Vault nie. Der Browser sendet nur JWT-Token, nie den Key.
- **topics-Tags:** Müssen zwischen `videos.topics` und `exam questions[].topics` exakt übereinstimmen — sonst greift der Prüfungs-Algorithmus nicht.
