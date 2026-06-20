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

  // ── Lernkarten: all-deck + topics ──
  function _renderKarten() {
    if (!_activeCourse) return _empty('Wähle oben ein Fach aus.');

    const courseData = (window.TOPICS_DATA || {})[_activeCourse];
    const allCards   = window.FLASHCARD_DATA || [];
    const prog       = AppState.get('cardProgress') || {};

    const loading = !window.FLASHCARD_DATA;
    const courseCards = allCards.filter(c => c.course === _activeCourse);
    if (!loading && !courseCards.length && !courseData) return _empty(`Noch keine Karten für ${_activeCourse}.`);

    const allDone  = courseCards.filter(c => prog[c.id]?.reviews > 0).length;
    const allTotal = courseCards.length;
    const allPct   = allTotal ? Math.round(allDone / allTotal * 100) : 0;

    const bgGrad  = courseData?.bgGradient || 'linear-gradient(135deg,#1e3a8a,#1e40af)';
    const emoji   = courseData?.emoji || '📚';
    const color   = courseData?.color || '#6366f1';
    const course  = _activeCourse;

    // filterCards first, then showView — avoids init() async overwrite race
    const allDeck = `
      <button onclick="FlashcardsScreen.filterCards('${course}', null); showView('flashcards');"
        class="tap-card w-full flex items-center justify-between rounded-2xl p-4 mb-3"
        style="background:${bgGrad};border:1px solid rgba(255,255,255,0.1)">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${emoji}</span>
          <div>
            <div class="font-bold text-sm text-white">Alle Karten — ${course}</div>
            <div class="text-xs text-white/60 mt-0.5">${loading ? 'Lädt…' : `${allTotal} Karten · ${allPct}% gelernt`}</div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>`;

    if (!courseData || !courseData.topics?.length) return allDeck;

    const _topicCard = (topic) => {
      const cards = courseCards.filter(c => c.topic === topic.title);
      const total = cards.length;
      const done  = cards.filter(c => prog[c.id]?.reviews > 0).length;
      const pct   = total ? Math.round(done / total * 100) : 0;
      const due   = cards.filter(c => {
        const p = prog[c.id];
        return !p || !p.nextReview || new Date(p.nextReview) <= new Date();
      }).length;

      const dueBadge = due > 0
        ? `<span class="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">${due} fällig</span>`
        : '';

      const safeTitle = topic.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      return `
        <button onclick="FlashcardsScreen.filterCards('${course}', '${safeTitle}'); showView('flashcards');"
          class="tap-card w-full flex items-start gap-3 rounded-2xl p-4"
          style="background:var(--card);border:1px solid var(--border)">
          <span class="text-xl mt-0.5 flex-shrink-0">${topic.emoji}</span>
          <div class="flex-1 min-w-0 text-left">
            <div class="font-semibold text-sm leading-snug" style="color:var(--txt)">${topic.title}</div>
            <div class="text-xs mt-0.5 mb-2.5" style="color:var(--txt-2)">${topic.desc}</div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-1.5 rounded-full" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
              </div>
              <span class="text-[10px] font-mono flex-shrink-0" style="color:var(--txt-3)">${loading ? '…' : `${done}/${total}`}</span>
            </div>
          </div>
          ${dueBadge}
        </button>`;
    };

    // Group by session if sessions map exists and topics have session field
    const hasSessions = courseData.sessions && courseData.topics.some(t => t.session);

    let topicRows;
    if (hasSessions) {
      const grouped = {};
      courseData.topics.forEach(t => {
        const s = t.session || 0;
        if (!grouped[s]) grouped[s] = [];
        grouped[s].push(t);
      });

      topicRows = Object.keys(grouped).sort((a, b) => a - b).map(s => {
        const label = courseData.sessions[s] || `Sitzung ${s}`;
        const cards = grouped[s].map(_topicCard).join('');
        return `
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-2 px-1">
              <span class="text-[10px] font-bold uppercase tracking-widest" style="color:var(--txt-3)">S${s}</span>
              <span class="text-xs font-semibold" style="color:var(--txt-2)">${label}</span>
            </div>
            <div class="space-y-2">${cards}</div>
          </div>`;
      }).join('');
    } else {
      topicRows = `<div class="space-y-2">${courseData.topics.map(_topicCard).join('')}</div>`;
    }

    return allDeck + topicRows;
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
