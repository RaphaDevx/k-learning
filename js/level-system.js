// ── Level System ──────────────────────────────────────────────────────────
// Standalone XP + Level + Streak System mit Supabase-Sync.
// API: LevelSystem.award('eventName') — Konfiguration in data/level-config.js

window.LevelSystem = (function () {
  const CFG = () => window.LEVEL_CONFIG;

  let _xp           = 0;
  let _streak       = 0;
  let _lastStudyDay = null;   // Tag an dem zuletzt aktiv gelernt wurde (award())
  let _xpToday      = 0;
  let _xpTodayDate  = null;
  let _syncTimer    = null;

  // ── Init ──────────────────────────────────────────────────────────────────

  async function init() {
    // Sofort aus localStorage (synchron, kein Flash)
    _xp           = AppState.get('xp')           || 0;
    _streak       = AppState.get('streak')        || 0;
    _lastStudyDay = AppState.get('lastStudyDay')  || null;

    // Tages-XP laden (nur wenn heutiges Datum passt)
    const today = new Date().toDateString();
    if (AppState.get('xpTodayDate') === today) {
      _xpToday     = AppState.get('xpToday') || 0;
      _xpTodayDate = today;
    } else {
      _xpToday     = 0;
      _xpTodayDate = null;
    }

    render();

    // Dann Supabase-Abgleich (höherer Wert gewinnt, schützt vor Datenverlust)
    const userId = await _getUserId();
    if (!userId) return;

    try {
      const { data } = await window.supabaseClient
        .from('user_xp')
        .select('xp, streak, last_study_day')
        .eq('user_id', userId)
        .maybeSingle();

      if (data) {
        _xp           = Math.max(_xp, data.xp || 0);
        _streak       = data.streak || _streak;
        _lastStudyDay = data.last_study_day || _lastStudyDay;
        AppState.set('xp',           _xp);
        AppState.set('streak',       _streak);
        AppState.set('lastStudyDay', _lastStudyDay);
        render();
      } else {
        await _syncToSupabase(userId);
      }
    } catch (e) {
      console.warn('[LevelSystem] Supabase init failed:', e);
    }
  }

  // ── Haupt-API ─────────────────────────────────────────────────────────────

  function award(eventName) {
    const amount = CFG()?.events?.[eventName];
    if (!amount) { console.warn('[LevelSystem] Unknown event:', eventName); return; }

    const prevLevel = getLevelInfo(_xp).level;
    _xp += amount;
    AppState.set('xp', _xp);

    // Tages-XP tracken
    const today = new Date().toDateString();
    if (_xpTodayDate !== today) { _xpToday = 0; _xpTodayDate = today; }
    const prevToday = _xpToday;
    _xpToday += amount;
    AppState.set('xpToday',     _xpToday);
    AppState.set('xpTodayDate', _xpTodayDate);

    // Tagesziel erreicht?
    const goal = CFG()?.dailyGoal || 50;
    if (prevToday < goal && _xpToday >= goal) _showDailyGoalReached();

    // Level-Up?
    const newLevel = getLevelInfo(_xp).level;
    if (newLevel > prevLevel) _showLevelUp(newLevel);

    // Streak: nur bei aktivem Lernen erhöhen (nicht bei Login)
    _updateStreak();

    render();
    _debouncedSync();
    return _xp;
  }

  // ── Level-Berechnung ──────────────────────────────────────────────────────

  function getLevelInfo(xp) {
    const levels = CFG()?.levels || [];
    let level = 0;
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].xp) { level = i; break; }
    }
    const current   = levels[level];
    const next      = levels[level + 1];
    const xpInLevel = xp - current.xp;
    const xpNeeded  = next ? next.xp - current.xp : 0;
    const progress  = next ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;
    return { level, name: current.name, badge: current.badge, xpInLevel, xpNeeded, progress, isMax: !next, nextName: next?.name };
  }

  function getDailyInfo() {
    const goal     = CFG()?.dailyGoal || 50;
    const progress = Math.min(100, (_xpToday / goal) * 100);
    return { xpToday: _xpToday, goal, progress, goalReached: _xpToday >= goal, streak: _streak };
  }

  // ── Streak (nur aktives Lernen) ───────────────────────────────────────────

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
    const info  = getLevelInfo(_xp);
    const daily = getDailyInfo();

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

    // Tagesziel
    document.querySelectorAll('.xp-today-display').forEach(el =>
      el.textContent = daily.goalReached
        ? `✅ ${daily.xpToday} XP`
        : `${daily.xpToday} / ${daily.goal} XP`);

    document.querySelectorAll('.daily-progress-fill').forEach(el => {
      el.style.width = `${daily.progress.toFixed(1)}%`;
      el.style.background = daily.goalReached
        ? 'linear-gradient(90deg,#10b981,#34d399)'
        : 'linear-gradient(90deg,#f59e0b,#f97316)';
    });
  }

  // ── Banners ───────────────────────────────────────────────────────────────

  function _showLevelUp(level) {
    const info = getLevelInfo(CFG().levels[level].xp);
    _showBanner(`<span style="font-size:1.6rem">${info.badge}</span> Level Up! ${info.name}`,
      'linear-gradient(135deg,#f59e0b,#f97316)', '#000');
  }

  function _showDailyGoalReached() {
    _showBanner('🎯 Tagesziel erreicht! Grossartig!',
      'linear-gradient(135deg,#10b981,#059669)', '#fff');
  }

  function _showBanner(html, bg, color) {
    const el = document.createElement('div');
    el.style.cssText = [
      'position:fixed','top:4.5rem','left:50%','transform:translateX(-50%)',
      'z-index:9999','display:flex','align-items:center','gap:0.6rem',
      'padding:0.7rem 1.4rem','border-radius:1rem','font-weight:800',
      'font-size:0.9rem',`color:${color}`,'pointer-events:none',
      `background:${bg}`,'box-shadow:0 8px 32px rgba(0,0,0,0.35)',
      'white-space:nowrap',
    ].join(';');
    el.innerHTML = html;
    document.body.appendChild(el);
    el.animate([
      { opacity:0, transform:'translateX(-50%) translateY(-12px)' },
      { opacity:1, transform:'translateX(-50%) translateY(0)',     offset: 0.15 },
      { opacity:1, transform:'translateX(-50%) translateY(0)',     offset: 0.80 },
      { opacity:0, transform:'translateX(-50%) translateY(-8px)'  },
    ], { duration: 3000, fill:'forwards' }).onfinish = () => el.remove();
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
        last_study_day: _lastStudyDay
          ? new Date(_lastStudyDay).toISOString().split('T')[0]
          : null,
        updated_at: new Date().toISOString(),
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

  // ── Compat ────────────────────────────────────────────────────────────────

  function _rawAddXP(amount) {
    const prevLevel = getLevelInfo(_xp).level;
    _xp += amount;
    AppState.set('xp', _xp);
    if (getLevelInfo(_xp).level > prevLevel) _showLevelUp(getLevelInfo(_xp).level);
    _updateStreak();
    render();
    _debouncedSync();
  }

  // Re-init bei Login
  if (window.supabaseClient) {
    window.supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') init();
    });
  }

  return {
    init, award, render, getLevelInfo, getDailyInfo, _rawAddXP,
    get xp()     { return _xp; },
    get streak() { return _streak; },
  };
})();
