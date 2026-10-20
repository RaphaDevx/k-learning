-- Real database checks. Every test mutation is rolled back; no provider calls.
BEGIN;
DO $$
DECLARE u uuid; r jsonb; first_id uuid; nonce text:=gen_random_uuid()::text; base_hash text;
BEGIN
  SELECT id INTO u FROM auth.users a WHERE NOT EXISTS(
    SELECT 1 FROM public.k_grading_jobs j WHERE j.user_id=a.id AND (j.created_at AT TIME ZONE 'Europe/Zurich')::date=(now() AT TIME ZONE 'Europe/Zurich')::date
  ) LIMIT 1;
  IF u IS NULL THEN RAISE EXCEPTION 'No untouched test user available; refusing to alter existing jobs'; END IF;
  -- Transaction-local entitlement changes are restored by ROLLBACK below.
  DELETE FROM public.k_ai_entitlements WHERE user_id=u;
  base_hash:=md5(nonce)||md5(nonce||'a');
  r:=public.k_reserve_grade(u,'busta-test','q1',base_hash,1.5,NULL,'platform',1);
  IF NOT (r ? 'id') OR (r->>'dailyLimitChf')::numeric<>2 THEN RAISE EXCEPTION 'Free reservation/limit failed'; END IF;
  first_id:=(r->>'id')::uuid;
  r:=public.k_reserve_grade(u,'busta-test','q2',md5(nonce||'2')||md5(nonce||'b'),0.6,NULL,'platform',1);
  IF r->>'error'<>'daily_limit_exceeded' THEN RAISE EXCEPTION 'Daily reservation cap failed'; END IF;
  UPDATE public.k_grading_jobs SET status='graded',cost_usd=0.1,result='{"status":"graded","earned":1}'::jsonb WHERE id=first_id;
  r:=public.k_reserve_grade(u,'busta-test','q1',base_hash,1.5,NULL,'platform',1);
  IF NOT coalesce((r->>'cached')::boolean,false) THEN RAISE EXCEPTION 'Cache did not avoid new cost'; END IF;
  r:=public.k_reserve_grade(u,'busta-test','q3',md5(nonce||'3')||md5(nonce||'c'),1.9,NULL,'platform',1);
  IF NOT(r ? 'id') THEN RAISE EXCEPTION 'Settled cost not released from reservation'; END IF;
  r:=public.k_reserve_grade(u,'busta-test','q4',md5(nonce||'4')||md5(nonce||'d'),0.01,NULL,'platform',1);
  IF r->>'error'<>'daily_limit_exceeded' THEN RAISE EXCEPTION 'Exact daily ceiling not enforced'; END IF;
  INSERT INTO public.k_ai_entitlements(user_id,plan,daily_limit_chf,status,valid_until) VALUES(u,'premium',5,'active',now()+interval '1 day');
  r:=public.k_reserve_grade(u,'busta-test','q5',md5(nonce||'5')||md5(nonce||'e'),2,NULL,'platform',1);
  IF NOT(r ? 'id') OR (r->>'dailyLimitChf')::numeric<>5 THEN RAISE EXCEPTION 'Active premium limit failed'; END IF;
  UPDATE public.k_ai_entitlements SET valid_until=now()-interval '1 second' WHERE user_id=u;
  r:=public.k_reserve_grade(u,'busta-test','q6',md5(nonce||'6')||md5(nonce||'f'),0.01,NULL,'platform',1);
  IF r->>'error'<>'daily_limit_exceeded' THEN RAISE EXCEPTION 'Expired premium did not revert to free'; END IF;
  IF has_function_privilege('authenticated','public.k_reserve_grade(uuid,text,text,text,numeric,numeric,text,numeric)','EXECUTE') THEN RAISE EXCEPTION 'Users may bypass server quota'; END IF;
  IF has_table_privilege('authenticated','public.k_ai_entitlements','UPDATE') THEN RAISE EXCEPTION 'Users may promote themselves'; END IF;
  IF (SELECT count(*) FROM public.k_grading_jobs WHERE exam_id='busta-test' AND user_id=u)<>3 THEN RAISE EXCEPTION 'Unexpected reservation count'; END IF;
END $$;
SELECT 'BUSTA_BUDGET_CHECKS_PASSED_ROLLBACK_PENDING' AS evidence;
ROLLBACK;
