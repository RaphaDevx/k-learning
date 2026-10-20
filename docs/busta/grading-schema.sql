-- Applied with kvault sql; never contains a secret.
BEGIN;
ALTER TABLE public.exam_results ALTER COLUMN score_pct DROP NOT NULL;
ALTER TABLE public.exam_results ADD COLUMN IF NOT EXISTS grading_status text NOT NULL DEFAULT 'graded';
CREATE TABLE IF NOT EXISTS public.k_ai_entitlements (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text NOT NULL DEFAULT 'premium',
  daily_limit_chf numeric(10,4) NOT NULL CHECK(daily_limit_chf>=2),
  status text NOT NULL CHECK(status IN ('active','inactive')),
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz NOT NULL,
  billing_reference text
);
ALTER TABLE public.k_ai_entitlements ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.k_ai_entitlements FROM anon,authenticated;
GRANT SELECT ON public.k_ai_entitlements TO authenticated;
GRANT ALL ON public.k_ai_entitlements TO service_role;
DROP POLICY IF EXISTS own_ai_entitlement ON public.k_ai_entitlements;
CREATE POLICY own_ai_entitlement ON public.k_ai_entitlements FOR SELECT TO authenticated USING ((select auth.uid())=user_id);
CREATE TABLE IF NOT EXISTS public.k_grading_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id text NOT NULL,
  question_id text NOT NULL,
  request_hash text NOT NULL UNIQUE CHECK (length(request_hash)=64),
  payer text NOT NULL,
  usd_chf_rate numeric(12,6) NOT NULL CHECK(usd_chf_rate>0),
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing','graded','review_required','failed')),
  reserved_usd numeric(12,6) NOT NULL CHECK (reserved_usd>=0),
  cost_usd numeric(12,6) CHECK (cost_usd>=0),
  result jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
CREATE INDEX IF NOT EXISTS k_grading_jobs_payer_created_idx ON public.k_grading_jobs(payer,created_at);
CREATE INDEX IF NOT EXISTS k_grading_jobs_user_created_idx ON public.k_grading_jobs(user_id,created_at);
ALTER TABLE public.k_grading_jobs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.k_grading_jobs FROM anon, authenticated;
GRANT SELECT ON public.k_grading_jobs TO authenticated;
GRANT ALL ON public.k_grading_jobs TO service_role;
DROP POLICY IF EXISTS own_grading_jobs ON public.k_grading_jobs;
CREATE POLICY own_grading_jobs ON public.k_grading_jobs FOR SELECT TO authenticated USING ((select auth.uid())=user_id);

CREATE OR REPLACE FUNCTION public.k_reserve_grade(
  p_user_id uuid,p_exam_id text,p_question_id text,p_request_hash text,
  p_reserved_usd numeric,p_monthly_budget_usd numeric,p_payer text,p_usd_chf_rate numeric
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public,pg_temp AS $$
DECLARE existing public.k_grading_jobs; job_id uuid; spent numeric; daily_spent numeric; day_limit numeric;
BEGIN
  IF p_reserved_usd IS NULL OR p_reserved_usd <= 0 OR p_usd_chf_rate IS NULL OR p_usd_chf_rate<=0 OR (p_monthly_budget_usd IS NOT NULL AND (p_monthly_budget_usd<=0 OR p_reserved_usd>p_monthly_budget_usd)) THEN
    RETURN jsonb_build_object('error','grading_budget_exhausted');
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('k-grading-budget',0));
  SELECT * INTO existing FROM public.k_grading_jobs WHERE request_hash=p_request_hash AND user_id=p_user_id;
  IF FOUND THEN
    IF existing.status IN ('graded','review_required') THEN RETURN jsonb_build_object('cached',true,'result',existing.result); END IF;
    RETURN jsonb_build_object('error',CASE WHEN existing.status='processing' THEN 'grading_in_progress' ELSE 'grading_retry_requires_review' END);
  END IF;
  SELECT daily_limit_chf INTO day_limit FROM public.k_ai_entitlements
    WHERE user_id=p_user_id AND status='active' AND now()>=valid_from AND now()<valid_until;
  day_limit:=coalesce(day_limit,2);
  SELECT coalesce(sum(coalesce(cost_usd,reserved_usd)*usd_chf_rate),0) INTO daily_spent FROM public.k_grading_jobs
    WHERE user_id=p_user_id AND (created_at AT TIME ZONE 'Europe/Zurich')::date=(now() AT TIME ZONE 'Europe/Zurich')::date;
  IF daily_spent+p_reserved_usd*p_usd_chf_rate>day_limit THEN
    RETURN jsonb_build_object('error','daily_limit_exceeded','dailyLimitChf',day_limit,'usedChf',daily_spent);
  END IF;
  IF (SELECT count(*) FROM public.k_grading_jobs WHERE user_id=p_user_id AND created_at>now()-interval '5 minutes')>=60 THEN
    RETURN jsonb_build_object('error','grading_rate_limit');
  END IF;
  SELECT coalesce(sum(coalesce(cost_usd,reserved_usd)),0) INTO spent FROM public.k_grading_jobs
    WHERE payer=p_payer AND created_at>=date_trunc('month',now());
  IF p_monthly_budget_usd IS NOT NULL AND spent+p_reserved_usd>p_monthly_budget_usd THEN RETURN jsonb_build_object('error','grading_budget_exhausted'); END IF;
  INSERT INTO public.k_grading_jobs(user_id,exam_id,question_id,request_hash,payer,reserved_usd,usd_chf_rate)
    VALUES(p_user_id,p_exam_id,p_question_id,p_request_hash,p_payer,p_reserved_usd,p_usd_chf_rate) RETURNING id INTO job_id;
  RETURN jsonb_build_object('id',job_id,'dailyLimitChf',day_limit);
END $$;
REVOKE ALL ON FUNCTION public.k_reserve_grade(uuid,text,text,text,numeric,numeric,text,numeric) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.k_reserve_grade(uuid,text,text,text,numeric,numeric,text,numeric) TO service_role;
COMMIT;
