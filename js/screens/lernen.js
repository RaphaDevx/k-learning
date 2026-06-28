// ── Lernen Screen (v3.12.1) ─────────────────────────────────────────────────
// Hub: Fächerauswahl → Karten oder Quiz → Themenstruktur

window.LernenScreen = (function() {

  let _activeCourse = null;
  let _activeMode   = 'karten'; // 'karten' | 'lernset' | 'quiz'

  function init() {
    _activeCourse = AppState.get('activeCourse') || _firstEnrolled();
    window.LernsetScreen?.init();
    if (!window.FLASHCARD_DATA && window.FlashcardsScreen) {
      // Show skeleton while cards load from Supabase, then re-render with counts
      _render();
      FlashcardsScreen.ensureLoaded().then(() => _render());
    } else {
      _render();
    }
  }

  function _firstEnrolled() {
    const enrolled = AppState.get('enrolledCourses');
    if (enrolled && enrolled.length) return enrolled[0];
    return (window.COURSES_CONFIG || [])[0]?.key || null;
  }

  function selectCourse(key) {
    _activeCourse = key;
    AppState.set('activeCourse', key);
    _render();
  }

  function setMode(mode) {
    _activeMode = mode;
    _render();
  }

  function getActiveMode() {
    return _activeMode;
  }

  // ── Top-level render ──
  function _render() {
    const el = document.getElementById('lernen-content');
    if (!el) return;

    const enrolled = AppState.get('enrolledCourses') || (window.COURSES_CONFIG || []).map(c => c.key);
    const courses  = (window.COURSES_CONFIG || []).filter(c => enrolled.includes(c.key));

    el.innerHTML = _courseSlider(courses) + _modeToggle() + _contentArea();
  }

  // ── Course slider ──
  function _courseSlider(courses) {
    const chips = courses.map(c => {
      const active = c.key === _activeCourse;
      return `
        <button onclick="LernenScreen.selectCourse('${c.key}')"
          class="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all tap-card"
          style="background:${active ? c.hex : 'var(--card)'};
                 border:1px solid ${active ? c.hex : 'var(--border)'};
                 color:${active ? '#fff' : 'var(--txt-2)'}">
          <span>${c.icon}</span>
          <span class="font-semibold text-sm whitespace-nowrap">${c.label}</span>
        </button>`;
    }).join('');

    return `
      <div class="overflow-x-auto pb-1 -mx-4 px-4" style="scrollbar-width:none">
        <div class="flex gap-2.5 w-max">${chips}</div>
      </div>`;
  }

  // ── Mode toggle ──
  function _modeToggle() {
    const kartenActive  = _activeMode === 'karten';
    const lernsetActive = _activeMode === 'lernset';
    const quizActive    = _activeMode === 'quiz';

    const btn = (mode, icon, label, isActive) => `
      <button onclick="LernenScreen.setMode('${mode}')"
        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all"
        style="background:${isActive ? 'rgba(99,102,241,0.18)' : 'var(--card)'};
               color:${isActive ? '#818cf8' : 'var(--txt-2)'};
               border:1px solid ${isActive ? 'rgba(99,102,241,0.4)' : 'var(--border)'}">
        ${icon} ${label}
      </button>`;

    const kartenIcon  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
    const lernsetIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
    const quizIcon    = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

    return `
      <div class="flex gap-2 mt-4 mb-4">
        ${btn('karten',  kartenIcon,  'Lernkarten', kartenActive)}
        ${btn('lernset', lernsetIcon, 'Lernset',    lernsetActive)}
        ${btn('quiz',    quizIcon,    'Quiz',       quizActive)}
      </div>`;
  }

  // ── Dynamic content area ──
  function _contentArea() {
    if (_activeMode === 'karten')  return _renderKarten();
    if (_activeMode === 'lernset') return _renderLernset();
    return _renderQuiz();
  }

  // ── Lernkarten: topic list grouped by actual card.topic (same logic as deck selector) ──
  function _renderKarten() {
    if (!_activeCourse) return _empty('Wähle oben ein Fach aus.');

    const courseData  = (window.TOPICS_DATA || {})[_activeCourse];
    const allCards    = window.FLASHCARD_DATA || [];
    const prog        = AppState.get('cardProgress') || {};
    const loading     = !window.FLASHCARD_DATA;
    const courseCards = allCards.filter(c => c.course === _activeCourse);
    const course      = _activeCourse;
    const color       = courseData?.color || '#6366f1';

    if (loading) return `<p class="text-center py-8 text-sm" style="color:var(--txt-3)">Karten werden geladen…</p>`;
    if (!courseCards.length) return _empty(`Noch keine Karten für ${course}.`);

    // Group by actual c.topic (same as flashcards deck selector)
    const groups = {};
    courseCards.forEach(c => {
      const key = c.topic || 'Allgemein';
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });

    function _moduleNum(t) {
      const m = t.match(/^(?:Block|Modul|M)\s*(\d+)/i);
      return m ? parseInt(m[1], 10) : Infinity;
    }

    const now = Date.now();
    const sorted = Object.keys(groups).sort((a, b) => {
      const ka = _moduleNum(a), kb = _moduleNum(b);
      if (ka !== kb) return ka - kb;
      return a.localeCompare(b);
    });

    const rows = sorted.map(topicName => {
      const cards = groups[topicName];
      const total = cards.length;
      const done  = cards.filter(c => (prog[c.id]?.reviews || 0) > 0).length;
      const due   = cards.filter(c => {
        const p = prog[c.id];
        return !p?.nextReview || p.nextReview <= now;
      }).length;
      const pct   = total ? Math.round(done / total * 100) : 0;
      const safeTopic = topicName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const dueBadge  = due > 0
        ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style="background:rgba(251,146,60,0.18);color:#fb923c">${due} fällig</span>`
        : '';

      return `
        <button onclick="FlashcardsScreen.startDeck('${course}', '${safeTopic}'); showView('flashcards');"
          class="tap-card w-full rounded-2xl p-4 text-left flex items-center gap-4"
          style="background:var(--card);border:1px solid var(--border)">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
               style="background:${color}22">🃏</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-semibold text-sm truncate" style="color:var(--txt)">${topicName}</span>
              ${dueBadge}
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
              </div>
              <span class="text-[10px] font-mono flex-shrink-0" style="color:var(--txt-3)">${done}/${total}</span>
            </div>
          </div>
        </button>`;
    }).join('');

    return `<div class="space-y-2">${rows}</div>`;
  }

  // ── Lernset: interactive exercises (order/truefalse/single/multiple) ──
  function _renderLernset() {
    if (!_activeCourse) return _empty('Wähle oben ein Fach aus.');

    const items = (window.LERNSET_DATA || []).filter(c => c.course === _activeCourse);
    if (!items.length) {
      return `
        <div class="rounded-2xl p-6 text-center" style="background:var(--card);border:1px solid var(--border)">
          <div class="text-3xl mb-2">🎯</div>
          <div class="font-semibold text-sm" style="color:var(--txt)">Noch keine Lernset-Übungen für ${_activeCourse}</div>
          <div class="text-xs mt-1" style="color:var(--txt-2)">Bald verfügbar</div>
        </div>`;
    }

    const prog       = AppState.get('lernsetProgress') || {};
    const courseData = (window.TOPICS_DATA || {})[_activeCourse];
    const color      = courseData?.color || '#6366f1';
    const course     = _activeCourse;

    const groups = {};
    items.forEach(c => {
      const key = c.topic || 'Allgemein';
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });

    const allDone  = items.filter(c => prog[c.id]?.attempts > 0).length;
    const allTotal = items.length;
    const allPct   = allTotal ? Math.round(allDone / allTotal * 100) : 0;

    const allDeck = `
      <button onclick="LernsetScreen.startDeck('${course}', null)"
        class="tap-card w-full flex items-center justify-between rounded-2xl p-4 mb-3"
        style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border:1px solid rgba(255,255,255,0.1)">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🎯</span>
          <div>
            <div class="font-bold text-sm text-white">Alle Übungen — ${course}</div>
            <div class="text-xs text-white/60 mt-0.5">${allTotal} Übungen · ${allPct}% bearbeitet</div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>`;

    const topicRows = Object.entries(groups).map(([topic, cards]) => {
      const total = cards.length;
      const done  = cards.filter(c => prog[c.id]?.attempts > 0).length;
      const pct   = total ? Math.round(done / total * 100) : 0;
      const topicShort = topic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '');
      const safeTopic  = topic.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      return `
        <button onclick="LernsetScreen.startDeck('${course}', '${safeTopic}')"
          class="tap-card w-full flex items-center gap-3 rounded-2xl p-4"
          style="background:var(--card);border:1px solid var(--border)">
          <span class="text-xl flex-shrink-0">🎯</span>
          <div class="flex-1 min-w-0 text-left">
            <div class="font-semibold text-sm leading-snug" style="color:var(--txt)">${topicShort}</div>
            <div class="flex items-center gap-2 mt-1.5">
              <div class="flex-1 h-1.5 rounded-full" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
              </div>
              <span class="text-[10px] font-mono flex-shrink-0" style="color:var(--txt-3)">${done}/${total}</span>
            </div>
          </div>
        </button>`;
    }).join('');

    return allDeck + `<div class="space-y-2">${topicRows}</div>`;
  }

  // ── Quiz: registry filtered by course ──
  function _renderQuiz() {
    if (!_activeCourse) return _empty('Wahle oben ein Fach aus.');

    const registry = (window.QuizScreen?.QUIZ_REGISTRY || []).filter(q => q.course === _activeCourse);

    if (!registry.length) {
      return `
        <div class="rounded-2xl p-6 text-center" style="background:var(--card);border:1px solid var(--border)">
          <div class="text-3xl mb-2">🚧</div>
          <div class="font-semibold text-sm" style="color:var(--txt)">Noch keine Quizze fur ${_activeCourse}</div>
          <div class="text-xs mt-1" style="color:var(--txt-2)">Bald verfugbar</div>
        </div>`;
    }

    const rows = registry.map(q => `
      <button onclick="QuizScreen.launch('${q.dataVar}')"
        class="tap-card w-full flex items-center gap-3 rounded-2xl p-4"
        style="background:var(--card);border:1px solid var(--border)">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
             style="background:${q.tagColor}22;border:1px solid ${q.tagColor}33">${q.icon}</div>
        <div class="flex-1 min-w-0 text-left">
          <div class="font-semibold text-sm leading-snug" style="color:var(--txt)">${q.label}</div>
          <div class="text-xs mt-0.5" style="color:var(--txt-2)">${q.subtitle}</div>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style="background:${q.tagColor}22;color:${q.tagColor};border:1px solid ${q.tagColor}44">
          ${q.tag}
        </span>
      </button>`).join('');

    return `<div class="space-y-2">${rows}</div>`;
  }

  function _empty(msg) {
    return `<p class="text-sm text-center py-6" style="color:var(--txt-2)">${msg}</p>`;
  }

  return { init, selectCourse, setMode, getActiveMode };
})();
