# K-Learning — Architektur-Dokumentation

> Lernplattform für HSG-Studenten: Instagram-Feed × Anki Spaced Repetition × Video-Streaming  
> Stand: Mai 2026 | Supabase Projekt: `ifmwcgwfvunjbnfwwbtr` (Lumin)

---

## 1. Überblick

K-Learning ist eine **statische Web-App** (kein Node-Server, kein Build-Step), die auf **Cloudflare Pages** gehostet wird. Die gesamte Logik läuft im Browser. Backend-Dienste werden über Supabase (Auth, DB, Storage) bereitgestellt.

```
Browser (Vanilla JS + Tailwind CDN)
    ├── Auth         → Supabase Google OAuth
    ├── Feed         → Supabase RPC: get_user_feed()   [Anki-Algorithmus]
    ├── Progress     → Supabase RPC: rate_video()       [SM-2 Update]
    ├── Videos       → Supabase Storage (MP4) oder Cloudflare R2 (HLS)
    └── Static Data  → Flashcards, Topics, Exams (lokale .js-Dateien)
```

---

## 2. Hosting & Deployment

| Schicht | Dienst | Details |
|---------|--------|---------|
| Frontend-Hosting | **Cloudflare Pages** | Projekt: `k-learning` |
| Datenbank + Auth | **Supabase** | Projekt: `ifmwcgwfvunjbnfwwbtr` (EU Central 2) |
| Video-Storage (aktuell) | **Supabase Storage** | Bucket: `videos` (public) |
| Video-Storage (geplant) | **Cloudflare R2** | Bucket: `k-learning-videos` (HLS-Segmente) |
| Repository | **GitHub** | `RaphaDevx/k-learning` |

### Deploy-Workflow

Jeder Push auf `main` triggert automatisch GitHub Actions (`.github/workflows/deploy.yml`):

```
git push origin main
  → GitHub Actions: cloudflare/pages-action@v1
  → Cloudflare Pages live in ~30 Sekunden
```

**Secrets** (GitHub Repo Settings → Secrets):
- `CLOUDFLARE_API_TOKEN` — Cloudflare Account Token mit Pages:Edit + R2:Edit

**Lokaler manueller Deploy** (Fallback):
```bash
source ~/.config/kcloud/.env   # lädt CLOUDFLARE_API_TOKEN
# Deploy aus sauberem Verzeichnis (ohne lokale videos/)
rsync -a --exclude='videos' --exclude='*.mp4' --exclude='private' \
  /home/raphael/lernplattform/ /tmp/k-learning-deploy/
cd /tmp/k-learning-deploy && npx wrangler pages deploy . --project-name k-learning --branch main --commit-dirty=true
```

---

## 3. Dateistruktur

```
lernplattform/
│
├── index.html                  # Einzige HTML-Datei — gesamte App-Shell
│
├── data/                       # Statische Daten (Legacy / Fallback)
│   ├── courses-config.js       # Kurs-Konfiguration (Prüfungsdaten, Farben, NotebookLM-IDs)
│   ├── feed-data.js            # Fallback-Feed für unauthentifizierte Nutzer
│   ├── flashcard-data.js       # Alle Flashcards (wird durch Supabase ersetzt → Phase 3)
│   └── topics-data.js          # Themen-Struktur pro Kurs
│
├── js/
│   ├── auth.js                 # Supabase-Client-Init + Google OAuth
│   ├── router.js               # View-Wechsel, body.feed-active-Toggle
│   ├── state.js                # localStorage-Wrapper (AppState)
│   ├── gamification.js         # XP, Streak, Level
│   └── screens/
│       ├── feed.js             ★ Supabase-backed Feed + Anki SM-2
│       ├── dashboard.js        # Kurs-Übersicht, Prüfungs-Countdown
│       ├── flashcards.js       # Spaced-Repetition-Kartenansicht
│       ├── topics.js           # Themen-Browser pro Kurs
│       ├── exam.js             # Probeklausur-Modus (Vollbild)
│       ├── tutor.js            # KI-Tutor (Phase 3)
│       └── profile.js          # Nutzer-Einstellungen
│
├── exams/
│   ├── esf-hs23-data.js        # ESF Probeklausur HS23
│   └── statistik-pk2-data.js   # Statistik PK2
│
├── tools/                      # Entwickler-Scripts (nicht deployed)
│   ├── transcode_hls.sh        # FFmpeg → HLS-Konvertierung
│   └── upload_r2.sh            # HLS-Segmente auf Cloudflare R2 hochladen
│
├── videos/                     # Lokale MP4-Kopien (gitignored, nur Entwicklung)
├── private/                    # OAuth-Credentials (gitignored)
│
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions → Cloudflare Pages
├── .gitignore                  # videos/, *.mp4, private/ ausgeschlossen
└── .cfignore                   # Gleiche Ausschlüsse für wrangler pages deploy
```

---

## 4. Datenbank-Schema (Supabase PostgreSQL)

### 4.1 Tabelle: `videos`
Zentraler Content-Katalog. Neue Videos werden hier eingetragen — **nicht** mehr in `feed-data.js`.

```sql
CREATE TABLE public.videos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,    -- z.B. 'esf-sv-01' (stabil, als Referenz)
  title           TEXT NOT NULL,
  subtitle        TEXT,
  description     TEXT,
  course          TEXT NOT NULL,           -- 'ESF' | 'Statistik' | 'MakroII' | 'OM'
  course_color    TEXT DEFAULT '#7c3aed',  -- Hex-Farbe für UI
  block           TEXT,                    -- Abschnitts-Gruppierung im Feed
  topics          TEXT[] DEFAULT '{}',     -- Array von Schlagworten
  duration        TEXT,                    -- '1:36' (für UI-Anzeige)
  level           TEXT,                    -- 'Prüfungsrelevant ⚡' | 'Vertiefung 📚'
  type            TEXT DEFAULT 'localvideo',
  video_src       TEXT,                    -- Supabase Storage URL (MP4 Fallback)
  hls_src         TEXT,                    -- Cloudflare R2 master.m3u8 (adaptive, bevorzugt)
  thumbnail_emoji TEXT DEFAULT '🎬',
  sort_order      INT DEFAULT 0,           -- Reihenfolge im Feed
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** Öffentliches Lesen (`SELECT`), Schreiben nur via `service_role`.

**Neues Video hinzufügen:**
```sql
INSERT INTO public.videos (slug, title, subtitle, course, course_color, block, topics, duration, level, type, video_src, sort_order)
VALUES ('esf-sv-05', 'Titel', 'Untertitel', 'ESF', '#7c3aed', 'Block', '{"Tag1","Tag2"}', '2:00', 'Prüfungsrelevant ⚡', 'localvideo', 'https://...supabase.co/.../video.mp4', 5);
```

---

### 4.2 Tabelle: `video_progress`
SM-2 Lernfortschritt pro Nutzer × Video.

```sql
CREATE TABLE public.video_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id         UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  UNIQUE(user_id, video_id),

  -- SM-2 Felder
  status           TEXT    DEFAULT 'new',       -- new | learning | review | mastered
  ease_factor      FLOAT   DEFAULT 2.5,         -- E-Faktor (min 1.3, max 3.0)
  interval_days    INT     DEFAULT 0,
  next_review_at   TIMESTAMPTZ DEFAULT NOW(),   -- nächste fällige Wiederholung
  review_count     INT     DEFAULT 0,
  last_rating      TEXT,                        -- 'knew' | 'didnt'
  last_reviewed_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** Nutzer sieht und bearbeitet nur eigene Zeilen (`auth.uid() = user_id`).

---

### 4.3 Funktion: `rate_video()` — SM-2 Algorithmus

```sql
SELECT rate_video(p_user_id, p_video_id, 'knew');  -- oder 'didnt'
```

| Rating | Effekt |
|--------|--------|
| `'knew'` (1. Mal) | interval = 1 Tag |
| `'knew'` (2. Mal) | interval = 6 Tage |
| `'knew'` (n. Mal) | interval = round(prev_interval × ease_factor) |
| `'knew'` immer | ease_factor += 0.1 (max 3.0) |
| `'didnt'` | interval = 1 Tag, next_review = jetzt + 10 Minuten, ease_factor -= 0.2 (min 1.3) |
| interval ≥ 21 Tage | status → `'mastered'` |

---

### 4.4 Funktion: `get_user_feed()` — Feed-Algorithmus

```sql
SELECT * FROM get_user_feed(
  p_user_id := '<uuid>',
  p_course  := 'ESF',   -- optional, NULL = alle Kurse
  p_limit   := 20
);
```

**Reihenfolge:**
1. **Fällige Reviews** (`next_review_at <= NOW()` und Status `learning` oder `review`) — älteste zuerst
2. **Neue Videos** (noch kein `video_progress`-Eintrag) — nach `sort_order` sortiert

---

### 4.5 Weitere Tabellen (aus anderen Projekten, gleiche DB)

| Tabelle | Zweck |
|---------|-------|
| `flashcards` | Spaced-Repetition-Karten (aus K-OCR Pipeline) |
| `courses` | Kurs-Zuordnung für Flashcards |
| `user_nodes` | Server-Infrastruktur (anderes Projekt) |
| `server_config` | Konfiguration (anderes Projekt) |

---

## 5. Frontend-Architektur

### 5.1 Router (`js/router.js`)

`showView(name)` ist die zentrale Navigation:
- Alle Views `hidden` → Ziel-View sichtbar
- `screen.init()` aufgerufen
- **`body.feed-active`** wird bei Feed gesetzt/entfernt → Fullscreen-CSS greift

### 5.2 Feed-Screen (`js/screens/feed.js`)

```
FeedScreen.init()
  └── load(course?)
        ├── getUserId() via supabase.auth.getUser()
        ├── [Auth] supabase.rpc('get_user_feed', {user_id, course, limit: 30})
        └── [Kein Auth] fallback auf window.FEED_CARDS (feed-data.js)
        └── _render(cards) → HTML-Injection in #feed-cards-container

FeedScreen.rate(slug, dbId, 'knew'|'didnt')
  ├── Gamification.addXP(15 | 5)
  ├── [Auth] supabase.rpc('rate_video', {user_id, video_id, rating})
  └── [Kein Auth] AppState.set('feedProgress', ...)
```

### 5.3 Fullscreen-Feed CSS

Wenn `body.feed-active` gesetzt:
- `#view-feed` → `position: fixed; inset: 0 0 56px 0` (mobile: Bottom-Nav-Höhe)
- `#view-feed` → `position: fixed; left: 240px; inset-block: 0` (desktop: Sidebar)
- `#feed-cards-container` → `scroll-snap-type: y mandatory; overflow-y: scroll`
- `.feed-card` → `height: calc(100vh - 56px)` → eine Karte = ein Viewport

### 5.4 Supabase-Client

Definiert in `js/auth.js`, global verfügbar als:
- `window._supabase` — primär (historisch)
- `window.supabaseClient` — Alias, genutzt von `feed.js`

```js
const SUPABASE_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
const SUPABASE_KEY = '<sb_publishable_key>';  // aus js/auth.js (publishable = sicher für Frontend)
```

---

## 6. Video-Streaming Pipeline

### 6.1 Aktueller Zustand: MP4 via Supabase Storage

Alle Videos liegen im Bucket `videos` des Supabase-Projekts:
```
https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/<filename>.mp4
```

Upload eines neuen Videos:
```bash
curl -X POST "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/videos/<name>.mp4" \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: video/mp4" \
  --data-binary @video.mp4
```

Danach in `videos`-Tabelle eintragen (SQL oder Supabase Dashboard).

---

### 6.2 Geplant: HLS Adaptive Streaming via Cloudflare R2

**Warum HLS?** Grosse Videos (>30 MB) puffern auf mobilen Verbindungen. HLS zerschneidet das Video in 4-Sekunden-Segmente und wechselt automatisch zwischen 360p und 720p je nach Bandbreite.

**Pipeline:**

```
MP4 (Supabase Storage)
  │
  ▼ tools/transcode_hls.sh
FFmpeg → HLS-Segmente + master.m3u8
  │
  ▼ tools/upload_r2.sh
Cloudflare R2: k-learning-videos/<slug>/master.m3u8
                              └── stream_0/ (360p .ts Segmente)
                              └── stream_1/ (720p .ts Segmente)
  │
  ▼ SQL: UPDATE videos SET hls_src = 'https://...' WHERE slug = '...'
Frontend: <video> mit HLS-Quelle via Video.js
```

**HLS-Transcoding ausführen:**
```bash
cd /home/raphael/lernplattform
./tools/transcode_hls.sh videos/Empirische_Sozialforschung.mp4
# Output: /home/raphael/lernplattform/hls/empirische_sozialforschung/master.m3u8
```

Logik des Scripts:
- **< 8 MB** → Single Quality (720p), kein ABR-Overhead
- **≥ 8 MB** → 360p (600 kbps) + 720p (2000 kbps), adaptive Bitrate

**R2-Upload:**
```bash
source ~/.config/kcloud/.env   # setzt CLOUDFLARE_API_TOKEN
./tools/upload_r2.sh
# Bucket: k-learning-videos
```

Danach im Supabase-Dashboard R2-Public-Access aktivieren und URL in `videos.hls_src` eintragen.

**Frontend-Verhalten:** `feed.js` bevorzugt `hls_src` über `video_src`. Video.js + HLS-Plugin übernimmt automatisch adaptive Wiedergabe.

---

## 7. Authentifizierung

Google OAuth via Supabase Auth:
1. `Auth.signInWithGoogle()` → Redirect zu Google
2. Callback → Supabase setzt Session-Cookie
3. `_supabase.auth.getSession()` → liefert User-Objekt inkl. `id` (UUID)
4. Diese UUID ist der `user_id` in allen Supabase-Tabellen

---

## 8. Credentials & Secrets

| Secret | Speicherort | Verwendung |
|--------|-------------|------------|
| `CLOUDFLARE_API_TOKEN` | `~/.config/kcloud/.env` + GitHub Repo Secret | Wrangler Deploy + R2 |
| Cloudflare Account ID | `4567be498d4437b735df9c22a7313c06` | Wrangler |
| Supabase Publishable Key | `js/auth.js` (public, sicher) | Frontend-Supabase-Client |
| Supabase URL | `js/auth.js` | Frontend-Supabase-Client |
| GitHub OAuth Token | `~/.config/gh/hosts.yml` | gh CLI |

---

## 9. Offene Punkte & nächste Schritte

| Priorität | Aufgabe | Details |
|-----------|---------|---------|
| 🔴 Hoch | HLS-Transcoding der langen Videos | `transcode_hls.sh` auf `Empirische_Sozialforschung.mp4`, `Forschungslogik.mp4` anwenden |
| 🔴 Hoch | R2-Bucket Public Access aktivieren | Cloudflare Dashboard → R2 → k-learning-videos → Settings → Allow public access |
| 🔴 Hoch | `hls_src` in DB eintragen | Nach R2-Upload: `UPDATE videos SET hls_src = '...' WHERE slug = '...'` |
| 🟡 Mittel | Flashcards auf Supabase migrieren | `data/flashcard-data.js` → `flashcards`-Tabelle (Schema existiert bereits) |
| 🟡 Mittel | Weitere Kurse im Feed | MakroII, Statistik, OM Videos in `videos`-Tabelle eintragen |
| 🟢 Niedrig | KI-Tutor (Phase 3) | `js/screens/tutor.js` → Supabase Edge Function → Claude API |
| 🟢 Niedrig | Autoplay im Feed | `IntersectionObserver` auf `.feed-card` → automatisch abspielen wenn sichtbar |
| 🟢 Niedrig | Video-Upload-UI | Admin-Screen zum direkten Hochladen + DB-Eintrag ohne SQL |

---

## 10. Lokale Entwicklung

```bash
# Projekt liegt auf dem Home-Server
cd /home/raphael/lernplattform

# Lokaler Dev-Server (Python reicht für statische App)
python3 -m http.server 8080
# → http://localhost:8080

# Oder: VS Code Live Server Extension

# Push & Deploy
git add . && git commit -m "feat: ..." && git push
# → GitHub Actions deployed automatisch auf Cloudflare Pages
```

**Wichtig:** `videos/` (lokale MP4-Kopien) ist gitignored und wird nicht deployed. Videos laufen ausschliesslich über Supabase Storage oder Cloudflare R2.
