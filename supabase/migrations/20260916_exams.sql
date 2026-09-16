-- K-Learning: k_exams table for dynamic exam registry
-- Replaces hard-coded EXAM_REGISTRY in native app.
-- Exam question data (JSON) is stored in Supabase Storage, bucket: "exams", path: "{id}.json"
-- Bundled exams (storage_path IS NULL) are loaded from the app bundle (zero latency, offline).

CREATE TABLE IF NOT EXISTS k_exams (
  id               TEXT PRIMARY KEY,
  title            TEXT        NOT NULL,
  course           TEXT        NOT NULL,       -- matches k_courses.key
  course_color     TEXT        NOT NULL DEFAULT '#6366f1',
  duration_minutes INTEGER     NOT NULL DEFAULT 90,
  total_points     INTEGER     NOT NULL DEFAULT 60,
  storage_path     TEXT        DEFAULT NULL,   -- NULL = bundled in app
  scoring_rules    JSONB       NOT NULL DEFAULT '{
    "single_choice":   {"correct": 2, "wrong": -1, "blank": 0},
    "multiple_choice": {"allCorrect": 3, "anyWrong": -1, "blank": 0}
  }',
  active           BOOLEAN     NOT NULL DEFAULT true,
  sort_order       INTEGER     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: all authenticated users can read active exams
ALTER TABLE k_exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "k_exams_select" ON k_exams
  FOR SELECT TO authenticated USING (active = true);

CREATE POLICY "k_exams_admin_all" ON k_exams
  FOR ALL TO service_role USING (true);

-- Seed from existing registry
INSERT INTO k_exams (id, title, course, course_color, duration_minutes, total_points, storage_path, sort_order)
VALUES
  ('makro2-probeklausur-fs26',  'Probeklausur FS26',        'MakroII',   '#059669', 90, 90, NULL,                            1),
  ('makro2-probeklausur-b',     'Probeklausur B (Juli 2026)','MakroII',   '#059669', 90, 90, NULL,                            2),
  ('om-fs26',                   'Probeprüfung FS 2026',     'OM',        '#7c3aed', 90, 60, 'om-fs26.json',                  3),
  ('om-hs24',                   'Prüfung HS 2024',           'OM',        '#7c3aed', 90, 60, 'om-hs24.json',                  4),
  ('om-hs23',                   'Prüfung HS 2023',           'OM',        '#7c3aed', 90, 60, 'om-hs23.json',                  5),
  ('stat-pk1',                  'Probeklausur 1',            'Statistik', '#0284c7', 90, 60, 'stat-pk1.json',                 6),
  ('stat-pk2',                  'Probeklausur 2',            'Statistik', '#0284c7', 90, 60, 'stat-pk2.json',                 7),
  ('bwl-b-fs25',                'BWL B — FS 2025',           'BWL',       '#ea580c', 90, 60, 'bwl-b-fs25.json',               8)
ON CONFLICT (id) DO NOTHING;

-- Storage bucket for exam JSON files (run via Supabase dashboard or CLI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('exams', 'exams', false);
--
-- Storage policy: authenticated users can read
-- CREATE POLICY "exams_read" ON storage.objects
--   FOR SELECT TO authenticated USING (bucket_id = 'exams');
--
-- Service role can write
-- CREATE POLICY "exams_write" ON storage.objects
--   FOR INSERT TO service_role USING (bucket_id = 'exams');

-- Index for fast course-based queries
CREATE INDEX IF NOT EXISTS k_exams_course_idx ON k_exams (course, active, sort_order);
