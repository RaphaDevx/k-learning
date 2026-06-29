// ── Report System ─────────────────────────────────────────────────────────────
// Unified content reporting: flashcards, lernset, videos → card_reports table.

window.ReportSystem = (function() {
  let _item   = null;
  let _reason = null;

  // Open the report modal for any content type
  function open(id, type, preview, opts) {
    opts = opts || {};
    _item   = {
      id,
      type,
      preview: (preview || '').slice(0, 120),
      course:  opts.course || null,
      topic:   opts.topic  || null,
      back:    opts.back   || null,
    };
    _reason = null;

    const modal = document.getElementById('report-modal');
    if (!modal) return;

    const titles = { flashcard: 'Karte melden', lernset: 'Übung melden', video: 'Video melden' };
    document.getElementById('report-modal-title').textContent = titles[type] || 'Inhalt melden';
    document.getElementById('report-item-preview').textContent = _item.preview;
    document.getElementById('report-note').value = '';
    document.querySelectorAll('.report-reason-btn').forEach(b => b.style.border = '2px solid transparent');
    document.getElementById('report-submit').classList.add('opacity-40', 'pointer-events-none');

    modal.classList.remove('hidden');
  }

  function close() {
    document.getElementById('report-modal')?.classList.add('hidden');
    _item   = null;
    _reason = null;
  }

  function selectReason(btn, reason) {
    document.querySelectorAll('.report-reason-btn').forEach(b => b.style.border = '2px solid transparent');
    btn.style.border = '2px solid #818cf8';
    _reason = reason;
    document.getElementById('report-submit').classList.remove('opacity-40', 'pointer-events-none');
  }

  async function submit() {
    if (!_item || !_reason) return;
    const note = document.getElementById('report-note')?.value?.trim() || null;
    const snap = { ..._item };
    close();

    try {
      const { data: { user } } = await window.supabaseClient.auth.getUser();
      await window.supabaseClient.from('card_reports').insert({
        user_id:     user?.id || null,
        card_id:     snap.id,
        card_type:   snap.type,
        reason:      _reason,
        note,
        card_front:  snap.preview,
        card_back:   snap.back,
        card_topic:  snap.topic,
        card_course: snap.course,
        status:      'new',
      });
      _reportedSets = null; // Cache invalidieren → nächste Abfrage lädt frisch
    } catch(e) { console.warn('ReportSystem.submit:', e); }
  }

  // ⋮ button HTML for use inside video/feed cards (light-on-dark)
  function dotsBtnDark(id, type, preview, opts) {
    opts = opts || {};
    const e = s => (s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").slice(0,80);
    return `<button
      onclick="event.stopPropagation();ReportSystem.open('${e(id)}','${type}','${e(preview)}',{course:'${e(opts.course)}',topic:'${e(opts.topic)}',back:'${e(opts.back)}'})"
      style="width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;flex-shrink:0;
             display:flex;align-items:center;justify-content:center;
             background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);
             color:rgba(255,255,255,0.7);font-size:1.1rem;line-height:1"
      title="Inhalt melden">⋮</button>`;
  }

  // ⋮ button HTML for use inside cards with --card background (on light/dark theme)
  function dotsBtnCard(id, type, preview, opts) {
    opts = opts || {};
    const e = s => (s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").slice(0,80);
    return `<button
      onclick="event.stopPropagation();ReportSystem.open('${e(id)}','${type}','${e(preview)}',{course:'${e(opts.course)}',topic:'${e(opts.topic)}',back:'${e(opts.back)}'})"
      style="width:28px;height:28px;border-radius:50%;border:none;cursor:pointer;flex-shrink:0;
             display:flex;align-items:center;justify-content:center;
             background:var(--card-raised);color:var(--txt-3);font-size:1rem;line-height:1"
      title="Inhalt melden">⋮</button>`;
  }

  // ── Gemeldete IDs (session-gecacht, invalidiert nach Submit) ──────────────
  let _reportedSets = null; // { flashcard: Set, lernset: Set, video: Set }

  async function _fetchAllReported() {
    if (_reportedSets) return _reportedSets;
    try {
      const { data: { user } } = await window.supabaseClient.auth.getUser();
      if (!user) { _reportedSets = {}; return _reportedSets; }
      const { data } = await window.supabaseClient
        .from('card_reports')
        .select('card_id, card_type')
        .eq('user_id', user.id)
        .in('status', ['new', 'reviewed']);
      _reportedSets = {};
      (data || []).forEach(r => {
        if (!_reportedSets[r.card_type]) _reportedSets[r.card_type] = new Set();
        _reportedSets[r.card_type].add(r.card_id);
      });
    } catch { _reportedSets = {}; }
    return _reportedSets;
  }

  // Gibt ein Set mit gemeldeten IDs für den angegebenen Typ zurück
  async function getReportedIds(type) {
    const sets = await _fetchAllReported();
    return sets[type] || new Set();
  }

  return { open, close, selectReason, submit, dotsBtnDark, dotsBtnCard, getReportedIds };
})();
