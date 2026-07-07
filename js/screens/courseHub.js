// ── Course Hub Screen ─────────────────────────────────────────────────────
// Hub & Unterseiten-Struktur: Ein Hub pro Kurs mit 5 Tabs

window.CourseHubScreen = (function () {

  const TABS = [
    { id: 'feed',       label: '⚡ Feed',       title: 'Dynamischer Feed'    },
    { id: 'modules',    label: '📹 Module',     title: 'Modul-Katalog'       },
    { id: 'exams',      label: '📝 Prüfungen',  title: 'Prüfungen'           },
    { id: 'summaries',  label: '📄 Skripte',    title: 'Zusammenfassungen'   },
    { id: 'flashcards', label: '🃏 Lernkarten', title: 'Lernkarten'          },
  ];

  // ── Public API ────────────────────────────────────────────────────────────

  function open(courseKey) {
    AppState.set('activeCourse', courseKey);
    AppState.set('activeTab', 'feed');
    Router.showView('course-hub');
  }

  function init() {
    _render();
  }

  function showTab(tabId) {
    AppState.set('activeTab', tabId);
    _renderTabBar();
    _renderTabContent(tabId);
  }

  function back() {
    AppState.set('activeCourse', null);
    Router.showView('dashboard');
  }

  // ── Shell Render ──────────────────────────────────────────────────────────

  function _render() {
    const container = document.getElementById('view-course-hub');
    if (!container) return;

    const courseKey = AppState.get('activeCourse');
    const course    = _getCourse(courseKey);
    if (!course) { Router.showView('dashboard'); return; }

    container.innerHTML = `
      <!-- Back + Header -->
      <div class="sticky top-0 z-30 bg-gray-900 border-b border-gray-800">
        <div class="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onclick="CourseHubScreen.back()"
            class="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm font-medium">
            <span class="text-base">←</span>
            <span>Alle Kurse</span>
          </button>
          <div class="flex items-center gap-2 ml-1">
            <span class="text-xl">${course.icon}</span>
            <span class="font-bold text-lg">${course.label}</span>
          </div>
          ${_examCountdown(course)}
        </div>

        <!-- Tab Bar -->
        <div id="course-hub-tabs" class="flex overflow-x-auto gap-1 px-4 pb-3 scrollbar-hide">
          ${_renderTabBarHTML(AppState.get('activeTab'))}
        </div>
      </div>

      <!-- Tab Content -->
      <div id="course-hub-content" class="pb-24">
      </div>
    `;

    _renderTabContent(AppState.get('activeTab'));
  }

  // ── Tab Bar ───────────────────────────────────────────────────────────────

  function _renderTabBarHTML(activeTabId) {
    return TABS.map(tab => `
      <button onclick="CourseHubScreen.showTab('${tab.id}')"
        id="hub-tab-${tab.id}"
        class="hub-tab-btn flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap
               ${tab.id === activeTabId
                 ? 'bg-indigo-600 text-white'
                 : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}">
        ${tab.label}
      </button>`).join('');
  }

  function _renderTabBar() {
    const el = document.getElementById('course-hub-tabs');
    if (el) el.innerHTML = _renderTabBarHTML(AppState.get('activeTab'));
  }

  // ── Tab Content Dispatcher ────────────────────────────────────────────────

  function _renderTabContent(tabId) {
    const content = document.getElementById('course-hub-content');
    if (!content) return;

    content.innerHTML = `
      <div class="flex items-center justify-center py-16">
        <div class="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>`;

    switch (tabId) {
      case 'feed':       return _renderFeed(content);
      case 'modules':    return _renderModules(content);
      case 'exams':      return _renderExams(content);
      case 'summaries':  return _renderSummaries(content);
      case 'flashcards': return _renderFlashcards(content);
    }
  }

  // ── Tab 1: Feed ───────────────────────────────────────────────────────────

  function _renderFeed(container) {
    const courseKey = AppState.get('activeCourse');
    const videos = (window.FEED_CARDS || []).filter(c => c.course === courseKey);

    const colorStop = _courseColor(courseKey);

    let html = `<div class="p-4 space-y-3">`;

    html += `
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-bold text-xs text-gray-400 uppercase tracking-widest">Empfohlene Videos</h3>
        <button onclick="Router.showView('feed'); FeedScreen.render('${courseKey}')"
          class="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition">Alle →</button>
      </div>`;

    if (videos.length === 0) {
      html += `<p class="text-gray-500 text-sm text-center py-12">Noch keine Videos für diesen Kurs.</p>`;
    } else {
      html += videos.map(v => `
        <div class="flex items-center gap-3 bg-gray-800 rounded-2xl px-3 py-3 cursor-pointer hover:bg-gray-700 transition"
             onclick="Router.showView('feed'); FeedScreen.render('${courseKey}')">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
               style="background:${colorStop}22">${v.emoji || '🎬'}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold leading-tight truncate">${v.title}</div>
            <div class="text-xs text-gray-400 mt-0.5 truncate">${v.subtitle || v.block || ''}</div>
          </div>
          <span class="text-xs text-gray-500 flex-shrink-0 font-mono">${v.duration || ''}</span>
        </div>`).join('');
    }

    // Due-today flashcards teaser
    const prog = AppState.get('cardProgress') || {};
    const now  = Date.now();
    const allCards = (window.FLASHCARD_DATA || []).filter(c => c.course === courseKey);
    const due = allCards.filter(c => {
      const p = prog[c.id];
      return !p || !p.nextReview || p.nextReview <= now;
    });

    html += `
      <div class="mt-4 bg-gray-800 rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-sm">📅 Fällige Karten</h3>
          <span class="text-xs text-gray-400">${due.length} fällig</span>
        </div>`;
    if (due.length === 0) {
      html += `<p class="text-green-400 text-sm">✅ Alle Karten erledigt!</p>`;
    } else {
      html += `
        <button onclick="FlashcardsScreen.filterCards('${courseKey}'); Router.showView('flashcards')"
          class="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2.5 text-sm font-bold transition">
          ${due.length} Karten wiederholen →
        </button>`;
    }
    html += `</div></div>`;

    container.innerHTML = html;
  }

  // ── Tab 2: Module ─────────────────────────────────────────────────────────

  function _renderModules(container) {
    const courseKey = AppState.get('activeCourse');
    const videos = (window.FEED_CARDS || []).filter(c => c.course === courseKey);

    if (videos.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-sm text-center py-16">Noch keine Module verfügbar.</p>`;
      return;
    }

    // Group by block
    const blocks = {};
    videos.forEach(v => {
      const b = v.block || 'Allgemein';
      if (!blocks[b]) blocks[b] = [];
      blocks[b].push(v);
    });

    const colorStop = _courseColor(courseKey);

    let html = `<div class="p-4 space-y-3">`;
    Object.entries(blocks).forEach(([blockName, vids], idx) => {
      const open = idx === 0 ? 'true' : 'false';
      html += `
        <div class="bg-gray-800 rounded-2xl overflow-hidden">
          <button onclick="_toggleBlock(this)" aria-expanded="${open}"
            class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-700 transition">
            <div class="flex items-center gap-2">
              <span class="text-base font-bold">${blockName}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-gray-400">${vids.length} Video${vids.length !== 1 ? 's' : ''}</span>
              <span class="text-gray-500 transition-transform ${open === 'true' ? 'rotate-90' : ''}" style="font-size:0.75rem">▶</span>
            </div>
          </button>
          <div class="${open === 'true' ? '' : 'hidden'} border-t border-gray-700 divide-y divide-gray-700/60">
            ${vids.map(v => `
              <div class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-700/50 transition"
                   onclick="Router.showView('feed'); FeedScreen.render('${courseKey}')">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                     style="background:${colorStop}22">${v.emoji || '🎬'}</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium leading-tight truncate">${v.title}</div>
                  <div class="text-xs text-gray-400 mt-0.5">${v.duration || ''} · ${v.level || ''}</div>
                </div>
                <span class="text-gray-500 text-xs">▶</span>
              </div>`).join('')}
          </div>
        </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;

    // Make _toggleBlock available globally (scoped to this render)
    window._toggleBlock = function(btn) {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const list = btn.nextElementSibling;
      list.classList.toggle('hidden', expanded);
      const arrow = btn.querySelector('span:last-child');
      arrow.style.transform = expanded ? '' : 'rotate(90deg)';
    };
  }

  // ── Tab 3: Klausuren ──────────────────────────────────────────────────────

  function _renderExams(container) {
    const courseKey = AppState.get('activeCourse');
    const exams = window.ExamScreen ? ExamScreen.getExamsByCourse(courseKey) : [];

    if (exams.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-sm text-center py-16">Noch keine Probeklausuren für diesen Kurs.</p>`;
      return;
    }

    let html = `<div class="p-4 space-y-3">`;
    exams.forEach(exam => {
      if (exam.available) {
        html += `
          <div class="bg-gray-800 rounded-2xl p-4 cursor-pointer hover:bg-gray-700 transition"
               onclick="ExamScreen.showSetup('${exam.id}')">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold">${exam.label}</div>
                <div class="text-xs text-gray-400 mt-0.5">Probeklausur · ${exam.course}</div>
              </div>
              <span class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition">▶ Start</span>
            </div>
          </div>`;
      } else {
        html += `
          <div class="bg-gray-800 rounded-2xl p-4 opacity-40 cursor-default">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold">${exam.label}</div>
                <div class="text-xs text-gray-400 mt-0.5">${exam.course}</div>
              </div>
              <span class="text-gray-500 text-xs">Kommt bald</span>
            </div>
          </div>`;
      }
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  // ── Tab 4: Zusammenfassungen ──────────────────────────────────────────────

  async function _renderSummaries(container) {
    const courseKey = AppState.get('activeCourse');

    // Try to load from Supabase documents table
    let docs = [];
    try {
      if (window._supabase) {
        const { data } = await window._supabase
          .from('documents')
          .select('id, title, description, file_url, created_at')
          .eq('course', courseKey)
          .order('created_at', { ascending: false });
        if (data) docs = data;
      }
    } catch (_) {}

    if (docs.length === 0) {
      container.innerHTML = `
        <div class="p-4 text-center py-16">
          <div class="text-4xl mb-3">📄</div>
          <p class="text-gray-400 text-sm">Noch keine Skripte für diesen Kurs.</p>
          <p class="text-gray-600 text-xs mt-2">Dokumente können über das Admin-Panel hochgeladen werden.</p>
        </div>`;
      return;
    }

    let html = `<div class="p-4 space-y-3">`;
    docs.forEach(doc => {
      html += `
        <div class="bg-gray-800 rounded-2xl p-4 flex items-start gap-3">
          <div class="text-3xl flex-shrink-0">📄</div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-sm">${doc.title || 'Dokument'}</div>
            ${doc.description ? `<div class="text-xs text-gray-400 mt-0.5 line-clamp-2">${doc.description}</div>` : ''}
          </div>
          ${doc.file_url ? `
          <a href="${doc.file_url}" target="_blank" rel="noopener"
            class="flex-shrink-0 bg-gray-700 hover:bg-gray-600 rounded-xl px-3 py-1.5 text-xs font-bold transition">
            Öffnen
          </a>` : ''}
        </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  // ── Tab 5: Lernkarten ─────────────────────────────────────────────────────

  function _renderFlashcards(container) {
    const courseKey = AppState.get('activeCourse');
    const allCards  = (window.FLASHCARD_DATA || []).filter(c => c.course === courseKey);
    const prog      = AppState.get('cardProgress') || {};
    const now       = Date.now();

    if (allCards.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-sm text-center py-16">Noch keine Lernkarten für diesen Kurs.</p>`;
      return;
    }

    // Group by topic
    const topics = {};
    allCards.forEach(c => {
      const t = c.topic || 'Allgemein';
      if (!topics[t]) topics[t] = { cards: [], done: 0, due: 0 };
      topics[t].cards.push(c);
      if (prog[c.id] && prog[c.id].reviews > 0) topics[t].done++;
      const p = prog[c.id];
      if (!p || !p.nextReview || p.nextReview <= now) topics[t].due++;
    });

    const totalDue   = allCards.filter(c => { const p = prog[c.id]; return !p || !p.nextReview || p.nextReview <= now; }).length;
    const totalDone  = allCards.filter(c => prog[c.id] && prog[c.id].reviews > 0).length;
    const totalCards = allCards.length;
    const overallPct = totalCards ? Math.round(totalDone / totalCards * 100) : 0;
    const colorStop  = _courseColor(courseKey);

    let html = `<div class="p-4 space-y-3">`;

    // Summary bar
    html += `
      <div class="bg-gray-800 rounded-2xl p-4 mb-2">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="text-sm font-bold">${totalDone}/${totalCards} Karten gelernt</div>
            <div class="text-xs text-gray-400 mt-0.5">${totalDue} fällig zur Wiederholung</div>
          </div>
          <span class="text-2xl font-bold">${overallPct}%</span>
        </div>
        <div class="rounded-full h-2" style="background:rgba(255,255,255,0.1)">
          <div class="h-2 rounded-full transition-all" style="width:${overallPct}%;background:${colorStop}"></div>
        </div>
        <button onclick="FlashcardsScreen.filterCards('${courseKey}'); Router.showView('flashcards')"
          class="w-full mt-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2.5 text-sm font-bold transition">
          Alle ${courseKey}-Karten →
        </button>
      </div>`;

    // Topics
    Object.entries(topics).forEach(([topicName, data]) => {
      const pct = data.cards.length ? Math.round(data.done / data.cards.length * 100) : 0;
      const fillColor = pct === 100 ? '#16a34a' : colorStop;
      html += `
        <div class="bg-gray-800 rounded-2xl p-3 cursor-pointer hover:bg-gray-700 transition"
             onclick="FlashcardsScreen.filterCards('${courseKey}', '${topicName.replace(/'/g, "\\'")}'); Router.showView('flashcards')">
          <div class="flex items-center justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold truncate">${topicName}</div>
              <div class="text-xs text-gray-400 mt-0.5">${data.done}/${data.cards.length} · ${data.due} fällig</div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              ${pct === 100 ? `<span class="text-green-400 text-xs font-bold">✓</span>` :
                data.due > 0 ? `<span class="text-xs bg-orange-600/80 text-white px-2 py-0.5 rounded-full">${data.due}</span>` : ''}
              <span class="text-xs font-bold" style="color:${fillColor}">${pct}%</span>
            </div>
          </div>
          <div class="mt-2 rounded-full h-1" style="background:rgba(255,255,255,0.1)">
            <div class="h-1 rounded-full transition-all" style="width:${pct}%;background:${fillColor}"></div>
          </div>
        </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  function _getCourse(key) {
    return (window.COURSES_CONFIG || []).find(c => c.key === key) || null;
  }

  function _courseColor(courseKey) {
    const hex = _getCourse(courseKey)?.hex;
    return hex || '#4f46e5';
  }

  function _examCountdown(course) {
    if (!course.examDate) return '';
    const days = Math.ceil((new Date(course.examDate) - new Date()) / 86400000);
    if (days < 0) return '';
    const color = days <= 3 ? 'text-red-400' : days <= 7 ? 'text-yellow-400' : 'text-gray-400';
    const label = days === 0 ? 'Heute!' : days === 1 ? 'Morgen!' : `${days}d`;
    return `<span class="ml-auto text-xs font-bold ${color}">🎯 ${label}</span>`;
  }

  return { open, init, showTab, back };
})();
