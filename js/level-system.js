// ── Level System ──────────────────────────────────────────────────────────
// Standalone XP + Level + Streak System mit Supabase-Sync.
// API: LevelSystem.award('eventName') — Konfiguration in data/level-config.js

window.LevelSystem = (function () {
  const CFG = () => window.LEVEL_CONFIG;

  let _xp    = 0;
  let _streak = 0;
  let _lastStudyDay = null;
  let _syncTimer = null;

  // ── Init ──────────────────────────────────────────────────────────────────

  async function init() {
    // Sofort aus localStorage laden (synchron, kein Flash)
    _xp           = AppState.get('xp')           || 0;
    _streak       = AppState.get('streak')        || 0;
    _lastStudyDay = AppState.get('lastStudyDay')  || null;
    _updateStreak();
    render();

    // Dann mit Supabase abgleichen (überschreibt falls höher / aktueller)
    const userId = await _getUserId();
    if (!userId) return;

    try {
      const { data } = await window.supabaseClient
        .from('user_xp')
        .select('xp, streak, last_study_day')
        .eq('user_id', userId)
        .maybeSingle();

      if (data) {
        // Nimm den höheren XP-Wert (Schutz vor Datenverlust)
        _xp           = Math.max(_xp, data.xp || 0);
        _streak       = data.streak || _streak;
        _lastStudyDay = data.last_study_day || _lastStudyDay;
        AppState.set('xp',           _xp);
        AppState.set('streak',       _streak);
        AppState.set('lastStudyDay', _lastStudyDay);
        _updateStreak();
        render();
      } else {
        // Kein Supabase-Eintrag → anlegen mit localStorage-Werten
        await _syncToSupabase(userId);
      }
    } catch (e) {
      console.warn('[LevelSystem] Supabase init failed, using localStorage:', e);
    }
  }

  // ── Haupt-API ─────────────────────────────────────────────────────────────

  function award(eventName) {
    const amount = CFG().events[eventName];
    if (!amount) { console.warn('[LevelSystem] Unknown event:', eventName); return; }

    const prevLevel = getLevelInfo(_xp).level;
    _xp += amount;
    AppState.set('xp', _xp);

    const newLevel = getLevelInfo(_xp).level;
    if (newLevel > prevLevel) _showLevelUp(newLevel);

    _updateStreak();
    render();
    _debouncedSync();
    return _xp;
  }

  // ── Level-Berechnung ──────────────────────────────────────────────────────

  function getLevelInfo(xp) {
    const levels = CFG().levels;
    let level = 0;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].xp) { level = i; break; }
    }
    const current  = levels[level];
    const next     = levels[level + 1];
    const xpInLevel = xp - current.xp;
    const xpNeeded  = next ? next.xp - current.xp : 0;
    const progress  = next ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;
    return { level, name: current.name, badge: current.badge, xpInLevel, xpNeeded, progress, isMax: !next, nextName: next?.name };
  }

  // ── Streak ────────────────────────────────────────────────────────────────

  function _updateStreak() {
    const today     = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (_lastStudyDay === today) return;
    _streak       = _lastStudyDay === yesterday ? _streak + 1 : 1;
    _lastStudyDay = today;
    AppState.set('streak',       _streak);
    AppState.set('lastStudyDay', _lastStudyDay);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  function render() {
    const info = getLevelInfo(_xp);

    document.querySelectorAll('.level-badge').forEach(el =>
      el.textContent = info.badge);

    document.querySelectorAll('.level-display').forEach(el =>
      el.textContent = `Lv.${info.level} ${info.name}`);

    document.querySelectorAll('.xp-display').forEach(el =>
      el.textContent = `⭐ ${_xp} XP`);

    document.querySelectorAll('.streak-display').forEach(el =>
      el.textContent = `🔥 ${_streak}`);

    document.querySelectorAll('.level-progress-fill').forEach(el =>
      el.style.width = `${info.progress.toFixed(1)}%`);

    document.querySelectorAll('.level-progress-text').forEach(el =>
      el.textContent = info.isMax
        ? '👑 Max Level erreicht'
        : `${info.xpInLevel} / ${info.xpNeeded} XP · nächstes: ${info.nextName}`);
  }

  // ── Level-Up Banner ───────────────────────────────────────────────────────

  function _showLevelUp(level) {
    const info = getLevelInfo(CFG().levels[level].xp);
    const el = document.createElement('div');
    el.style.cssText = [
      'position:fixed', 'top:4.5rem', 'left:50%', 'transform:translateX(-50%)',
      'z-index:9999', 'display:flex', 'align-items:center', 'gap:0.6rem',
      'padding:0.7rem 1.4rem', 'border-radius:1rem', 'font-weight:800',
      'font-size:0.95rem', 'color:#000', 'pointer-events:none',
      'background:linear-gradient(135deg,#f59e0b,#f97316)',
      'box-shadow:0 8px 32px rgba(245,158,11,0.55)',
    ].join(';');
    el.innerHTML = `<span style="font-size:1.6rem">${info.badge}</span> Level Up! ${info.name}`;
    document.body.appendChild(el);
    el.animate(
      [
        { opacity: 0, transform: 'translateX(-50%) translateY(-12px)' },
        { opacity: 1, transform: 'translateX(-50%) translateY(0)',     offset: 0.15 },
        { opacity: 1, transform: 'translateX(-50%) translateY(0)',     offset: 0.75 },
        { opacity: 0, transform: 'translateX(-50%) translateY(-8px)'  },
      ],
      { duration: 3200, fill: 'forwards' }
    ).onfinish = () => el.remove();
  }

  // ── Supabase Sync ─────────────────────────────────────────────────────────

  function _debouncedSync() {
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(async () => {
      const userId = await _getUserId();
      if (userId) await _syncToSupabase(userId);
    }, 2000);
  }

  async function _syncToSupabase(userId) {
    try {
      await window.supabaseClient.from('user_xp').upsert({
        user_id:        userId,
        xp:             _xp,
        streak:         _streak,
        last_study_day: _lastStudyDay ? new Date(_lastStudyDay).toISOString().split('T')[0] : null,
        updated_at:     new Date().toISOString(),
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('[LevelSystem] Sync failed:', e);
    }
  }

  async function _getUserId() {
    try {
      const { data } = await window.supabaseClient.auth.getUser();
      return data?.user?.id || null;
    } catch { return null; }
  }

  // ── Compat: alte Gamification.addXP Aufrufe ──────────────────────────────
  // Wird von gamification.js delegiert — nicht direkt aufrufen

  function _rawAddXP(amount) {
    const prevLevel = getLevelInfo(_xp).level;
    _xp += amount;
    AppState.set('xp', _xp);
    if (getLevelInfo(_xp).level > prevLevel) _showLevelUp(getLevelInfo(_xp).level);
    _updateStreak();
    render();
    _debouncedSync();
  }

  // ── Auth-Listener: Re-Init bei Login ─────────────────────────────────────

  if (window.supabaseClient) {
    window.supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') init();
    });
  }

  return { init, award, render, getLevelInfo, _rawAddXP };
})();
