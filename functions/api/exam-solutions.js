// Releases model answers and explanations of a split exam, only after the user has a saved attempt.
// Rubrics and grading metadata never leave the server.
import { foldKeyRows } from '../_lib/examKeys.js';

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function onRequestPost({ request, env }) {
  const base = env.SUPABASE_URL || 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
  const service = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!service) return json({ error: 'solutions_server_not_configured' }, 503);
  const db = async (path, { method = 'GET', body } = {}) => {
    const r = await fetch(`${base}/rest/v1/${path}`, { method,
      headers: { apikey: service, Authorization: `Bearer ${service}`, 'Content-Type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    if (!r.ok) throw Object.assign(new Error('solutions_database_unavailable'), { status: 503 });
    return r.json();
  };
  try {
    const authorization = request.headers.get('Authorization') || '';
    if (!authorization.startsWith('Bearer ')) return json({ error: 'not_authenticated' }, 401);
    const auth = await fetch(`${base}/auth/v1/user`, { headers: { apikey: service, Authorization: authorization } });
    const user = auth.ok ? await auth.json() : null;
    if (!user?.id) return json({ error: 'not_authenticated' }, 401);
    const raw = await request.text();
    let examId;
    try { examId = JSON.parse(raw)?.examId; } catch { return json({ error: 'invalid_json' }, 400); }
    if (raw.length > 1000 || typeof examId !== 'string' || !/^busta-(fs\d{2}|nh23)$/.test(examId)) return json({ error: 'invalid_request' }, 400);
    const rows = await db(`k_exams?id=eq.${encodeURIComponent(examId)}&active=eq.true&select=content_key,course`);
    const exam = rows?.[0];
    if (!exam?.content_key) return json({ error: 'exam_not_available' }, 404);
    if (await db('rpc/k_has_course_access', { method: 'POST', body: { p_user_id: user.id, p_course: exam.course } }) !== true) return json({ error: 'course_access_required' }, 403);
    const attempts = await db(`exam_results?user_id=eq.${encodeURIComponent(user.id)}&exam_id=eq.${encodeURIComponent(examId)}&select=id&limit=1`);
    if (!attempts?.length) return json({ error: 'submit_attempt_first' }, 403);
    const keyRows = await db(`k_exam_keys?exam_id=eq.${encodeURIComponent(examId)}&select=question_id,key`);
    const solutions = {};
    for (const [questionId, key] of foldKeyRows(keyRows)) {
      if (questionId === '_exam') continue;
      const entry = {};
      if (key.modelAnswer != null) entry.modelAnswer = key.modelAnswer;
      if (key.explanation != null) entry.explanation = key.explanation;
      if (Object.keys(entry).length) solutions[questionId] = entry;
    }
    return json({ examId, solutions });
  } catch (error) {
    return json({ error: error.message || 'solutions_failed' }, error.status || 500);
  }
}
