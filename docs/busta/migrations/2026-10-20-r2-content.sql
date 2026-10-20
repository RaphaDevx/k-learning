-- R2 content split (docs/adr/0002-exam-content-on-r2.md). PROPOSED, not applied. Apply with `kvault sql klearning <file>`.
-- Idempotent; contains no secret. Order: this migration, then build/sql/00-course.sql, <id>.meta.sql, <id>.keys-NN.sql.
BEGIN;

-- 1) Metadata pointers. content stays NULL for split exams; has_content (generated from content) is deliberately left alone,
--    clients treat content_key IS NOT NULL as available.
ALTER TABLE public.k_exams ADD COLUMN IF NOT EXISTS content_key text;
ALTER TABLE public.k_exams ADD COLUMN IF NOT EXISTS content_hash text;
ALTER TABLE public.k_exams DROP CONSTRAINT IF EXISTS k_exams_content_pointer;
ALTER TABLE public.k_exams ADD CONSTRAINT k_exams_content_pointer CHECK (
  content_key IS NULL OR (content IS NULL AND content_hash ~ '^[0-9a-f]{64}$' AND content_key ~ '^exams/[a-z0-9-]+/[a-z0-9-]+\.v[0-9]+\.json$'));

-- 2) Model answers, explanations, rubrics and grading metadata. Server only: no policy, no grant for anon/authenticated.
CREATE TABLE IF NOT EXISTS public.k_exam_keys (
  exam_id text NOT NULL,
  question_id text NOT NULL,
  part text NOT NULL DEFAULT '',
  content_version integer NOT NULL,
  key jsonb NOT NULL,
  PRIMARY KEY (exam_id, question_id, part)
);
ALTER TABLE public.k_exam_keys ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.k_exam_keys FROM anon, authenticated;
GRANT ALL ON public.k_exam_keys TO service_role;

-- 3) Paywall entitlements (written by purchase handling / admin, never by the client).
CREATE TABLE IF NOT EXISTS public.k_course_entitlements (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course text NOT NULL,
  status text NOT NULL CHECK (status IN ('active','inactive')),
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz,
  source text NOT NULL DEFAULT 'manual',
  billing_reference text,
  PRIMARY KEY (user_id, course)
);
ALTER TABLE public.k_course_entitlements ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.k_course_entitlements FROM anon, authenticated;
GRANT SELECT ON public.k_course_entitlements TO authenticated;
GRANT ALL ON public.k_course_entitlements TO service_role;
DROP POLICY IF EXISTS own_course_entitlement ON public.k_course_entitlements;
CREATE POLICY own_course_entitlement ON public.k_course_entitlements FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);

-- 4) Single access rule shared by the content worker, grade-answer and exam-solutions:
--    an active entitlement, or an enrollment in a secret course (existing invite-code mechanism).
CREATE OR REPLACE FUNCTION public.k_has_course_access(p_user_id uuid, p_course text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM public.k_course_entitlements e
                  WHERE e.user_id = p_user_id AND e.course = p_course AND e.status = 'active'
                    AND now() >= e.valid_from AND (e.valid_until IS NULL OR now() < e.valid_until))
      OR EXISTS (SELECT 1 FROM public.user_course_enrollments u
                  WHERE u.user_id = p_user_id AND u.course_key = p_course);
$$;
REVOKE ALL ON FUNCTION public.k_has_course_access(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.k_has_course_access(uuid, text) TO service_role;
COMMIT;
