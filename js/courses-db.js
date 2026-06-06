// ── Courses DB — Supabase-backed course catalog + user enrollment ──────────
//
// Replaces localStorage-based enrolledCourses with Supabase tables:
//   k_courses        — global catalog (admin-only writes, everyone reads)
//   user_enrollments — per-user enrollment (user owns their own rows)
//
// Falls back to COURSES_CONFIG (static) when not authenticated or offline.

window.CoursesDB = (function () {

  // ── Internal cache ─────────────────────────────────────────────────────
  let _catalog = null;   // array of k_courses rows merged with COURSES_CONFIG tailwind data
  let _enrolled = null;  // array of course keys the current user is enrolled in

  // Tailwind class map and RGB values — kept here so we don't duplicate in config
  const _tailwind = {
    blue:   { bg:'bg-blue-900',   hover:'hover:bg-blue-800',   bar:'bg-blue-700',   fill:'bg-blue-300',   text:'text-blue-300',   rgb:'37,99,235'   },
    green:  { bg:'bg-green-900',  hover:'hover:bg-green-800',  bar:'bg-green-700',  fill:'bg-green-300',  text:'text-green-300',  rgb:'5,150,105'   },
    purple: { bg:'bg-purple-900', hover:'hover:bg-purple-800', bar:'bg-purple-700', fill:'bg-purple-300', text:'text-purple-300', rgb:'124,58,237'  },
    orange: { bg:'bg-orange-900', hover:'hover:bg-orange-800', bar:'bg-orange-700', fill:'bg-orange-300', text:'text-orange-300', rgb:'234,88,12'   },
    teal:   { bg:'bg-teal-900',   hover:'hover:bg-teal-800',   bar:'bg-teal-700',   fill:'bg-teal-300',   text:'text-teal-300',   rgb:'13,148,136'  },
    red:    { bg:'bg-red-900',    hover:'hover:bg-red-800',    bar:'bg-red-700',    fill:'bg-red-300',    text:'text-red-300',    rgb:'220,38,38'   },
  };

  // ── Public: get available courses (catalog) ────────────────────────────
  async function getAvailableCourses() {
    if (_catalog) return _catalog;
    await _loadCatalog();
    return _catalog;
  }

  // ── Public: get enrolled course keys for current user ─────────────────
  async function getEnrolledKeys() {
    if (_enrolled !== null) return _enrolled;
    await _loadEnrolled();
    return _enrolled;
  }

  // ── Public: enroll/unenroll — saves full selection to Supabase ─────────
  async function saveEnrollment(selectedKeys) {
    const user = await _getUser();
    if (!user) {
      // Offline fallback: localStorage
      AppState.set('enrolledCourses', selectedKeys);
      _enrolled = selectedKeys;
      return;
    }

    const sb = window.supabaseClient;

    // Delete all existing enrollments, then insert new ones
    await sb.from('user_enrollments').delete().eq('user_id', user.id);

    if (selectedKeys.length > 0) {
      const rows = selectedKeys.map(key => ({ user_id: user.id, course_key: key }));
      const { error } = await sb.from('user_enrollments').insert(rows);
      if (error) console.warn('CoursesDB.saveEnrollment insert error:', error);
    }

    _enrolled = selectedKeys;
    // Mirror to localStorage as offline cache
    AppState.set('enrolledCourses', selectedKeys);
  }

  // ── Public: invalidate cache (call on auth state change) ───────────────
  function reset() {
    _catalog = null;
    _enrolled = null;
  }

  // ── Internal: load catalog from Supabase (or fallback) ────────────────
  async function _loadCatalog() {
    const sb = window.supabaseClient;
    let rows = null;

    if (sb) {
      const { data, error } = await sb
        .from('k_courses')
        .select('*')
        .eq('active', true)
        .order('sort_order');
      if (!error && data && data.length > 0) rows = data;
    }

    if (!rows) {
      // Fallback to static config
      rows = (window.COURSES_CONFIG || []).map((c, i) => ({
        key: c.key, label: c.label, icon: c.icon, color: c.color, hex: c.hex,
        exam_date: c.examDate, exam_room: c.examRoom, exam_format: c.examFormat,
        notebook_id: c.notebookId, data_dir: c.dataDir, active: true, sort_order: i,
      }));
    }

    _catalog = rows.map(r => _mergeRow(r));
  }

  // ── Internal: load enrollments from Supabase (or fallback) ────────────
  async function _loadEnrolled() {
    const user = await _getUser();
    if (!user) {
      // Not logged in — use localStorage cache
      _enrolled = AppState.get('enrolledCourses') || [];
      return;
    }

    const { data, error } = await window.supabaseClient
      .from('user_enrollments')
      .select('course_key')
      .eq('user_id', user.id);

    if (!error && data) {
      _enrolled = data.map(r => r.course_key);
      // Keep localStorage in sync as offline cache
      AppState.set('enrolledCourses', _enrolled);
    } else {
      // Fallback to localStorage if query fails
      _enrolled = AppState.get('enrolledCourses') || [];
    }
  }

  // ── Internal: merge DB row with tailwind metadata ──────────────────────
  function _mergeRow(r) {
    const tw = _tailwind[r.color] || _tailwind.blue;
    return {
      key:        r.key,
      label:      r.label,
      icon:       r.icon,
      color:      r.color,
      hex:        r.hex,
      examDate:   r.exam_date   || null,
      examRoom:   r.exam_room   || null,
      examFormat: r.exam_format || null,
      notebookId: r.notebook_id || null,
      dataDir:    r.data_dir    || r.key,
      tailwind:   tw,
      rgb:        tw.rgb,
    };
  }

  async function _getUser() {
    try {
      if (window.Auth && Auth.getUser) return await Auth.getUser();
      const { data: { user } } = await window.supabaseClient.auth.getUser();
      return user;
    } catch { return null; }
  }

  return { getAvailableCourses, getEnrolledKeys, saveEnrollment, reset };
})();
