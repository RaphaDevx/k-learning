// Cloudflare Pages Function: POST /api/create-course
// Validates user JWT via Supabase, then inserts into k_courses using service role.
// Ownership is encoded as data_dir = "user:USER_ID" so no DDL (ALTER TABLE) is needed.

export async function onRequestPost(context) {
  const { request, env } = context;

  const SUPABASE_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
  const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SERVICE_KEY) {
    return json({ error: 'Server misconfigured' }, 500);
  }

  // 1. Validate user JWT
  const authHeader = request.headers.get('Authorization') || '';
  const userJwt    = authHeader.replace('Bearer ', '').trim();
  if (!userJwt) return json({ error: 'Not authenticated' }, 401);

  const userResp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${userJwt}`, 'apikey': SERVICE_KEY },
  });
  if (!userResp.ok) return json({ error: 'Invalid token' }, 401);
  const { id: userId } = await userResp.json();
  if (!userId) return json({ error: 'Could not get user id' }, 401);

  // 2. Parse body
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { label, icon, color } = body;
  if (!label || !icon || !color) return json({ error: 'label, icon, color required' }, 400);

  const hexMap = {
    blue:'#2563eb', green:'#059669', purple:'#7c3aed',
    orange:'#ea580c', teal:'#0d9488', red:'#dc2626', rose:'#e11d48',
  };

  // Key: deterministic from label + userId (truncated) for deduplication safety
  const baseKey  = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  const shortUid = userId.replace(/-/g, '').slice(0, 8);
  const key      = `u_${shortUid}_${baseKey}_${Date.now().toString(36)}`;

  // 3. Insert into k_courses using service role (bypasses RLS)
  // Ownership is tracked via data_dir = "user:USER_ID"
  const insertResp = await fetch(`${SUPABASE_URL}/rest/v1/k_courses`, {
    method:  'POST',
    headers: {
      'apikey':        SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type':  'application/json',
      'Prefer':        'return=representation',
    },
    body: JSON.stringify({
      key,
      label,
      icon,
      color,
      hex:        hexMap[color] || hexMap.blue,
      active:     true,
      sort_order: 999,
      data_dir:   `user:${userId}`,
    }),
  });

  if (!insertResp.ok) {
    const err = await insertResp.text();
    return json({ error: `DB insert failed: ${err}` }, 500);
  }

  const [course] = await insertResp.json();

  // 4. Auto-enroll user
  await fetch(`${SUPABASE_URL}/rest/v1/user_enrollments`, {
    method:  'POST',
    headers: {
      'apikey':        SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({ user_id: userId, course_key: key }),
  });

  return json({ course }, 201);
}

export async function onRequestDelete(context) {
  const { request, env } = context;

  const SUPABASE_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
  const SERVICE_KEY  = env.SUPABASE_SERVICE_ROLE_KEY;

  const authHeader = request.headers.get('Authorization') || '';
  const userJwt    = authHeader.replace('Bearer ', '').trim();
  if (!userJwt) return json({ error: 'Not authenticated' }, 401);

  const userResp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${userJwt}`, 'apikey': SERVICE_KEY },
  });
  if (!userResp.ok) return json({ error: 'Invalid token' }, 401);
  const { id: userId } = await userResp.json();

  const url      = new URL(request.url);
  const courseKey = url.searchParams.get('key');
  if (!courseKey) return json({ error: 'key required' }, 400);

  // Verify ownership: data_dir must equal "user:USER_ID"
  const checkResp = await fetch(
    `${SUPABASE_URL}/rest/v1/k_courses?key=eq.${encodeURIComponent(courseKey)}&select=data_dir`,
    { headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` } }
  );
  const [row] = await checkResp.json();
  if (!row || row.data_dir !== `user:${userId}`) {
    return json({ error: 'Not your course' }, 403);
  }

  await fetch(`${SUPABASE_URL}/rest/v1/user_enrollments?user_id=eq.${userId}&course_key=eq.${encodeURIComponent(courseKey)}`,
    { method: 'DELETE', headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` } });

  await fetch(`${SUPABASE_URL}/rest/v1/k_courses?key=eq.${encodeURIComponent(courseKey)}`,
    { method: 'DELETE', headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` } });

  return json({ ok: true }, 200);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
