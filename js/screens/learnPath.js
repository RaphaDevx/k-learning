// ── Learn Path Screen ─────────────────────────────────────────────────────
// Duolingo-style milestone path showing progress through enrolled courses

window.LearnPathScreen = (function() {

  function init() {
    _render();
  }

  function _render() {
    const container = document.getElementById('view-learn-path');
    if (!container) return;

    const active = _enrolledCourses();
    if (active.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center py-20">
          <div class="text-5xl mb-4">📚</div>
          <p class="text-gray-400 mb-4">Keine Kurse ausgewählt.</p>
          <button onclick="DashboardScreen.showCourseManager()"
            class="bg-blue-600 hover:bg-blue-500 rounded-xl px-5 py-2 text-sm font-bold transition">
            Kurse hinzufügen
          </button>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="py-4 pb-24">
        <div class="px-4 mb-6">
          <h1 class="text-2xl font-bold">🛤️ Lernpfad</h1>
          <p class="text-gray-400 text-sm mt-1">Dein Fortschritt durch alle Kurse</p>
        </div>
        ${active.map(key => _renderCourseSection(key)).join('')}
      </div>`;
  }

  function _renderCourseSection(courseKey) {
    const course = (window.COURSES_CONFIG || []).find(c => c.key === courseKey);
    if (!course) return '';

    const nodes = _buildNodes(courseKey);
    if (nodes.length === 0) return '';

    // Mark active / done on each node sequentially
    nodes.forEach((node, i) => {
      node.isDone   = node.total > 0 && node.done === node.total;
      node.isActive = !node.isDone && (i === 0 || nodes[i - 1].done > 0);
    });

    const totalCards = nodes.reduce((a, n) => a + n.total, 0);
    const doneCards  = nodes.reduce((a, n) => a + n.done,  0);
    const overallPct = totalCards ? Math.round(doneCards / totalCards * 100) : 0;

    const days = course.examDate
      ? Math.ceil((new Date(course.examDate) - new Date()) / 86400000)
      : null;
    const urgency = days === null ? 'text-gray-400'
      : days <= 3 ? 'text-red-400' : days <= 7 ? 'text-yellow-400' : 'text-gray-400';
    const daysLabel = days === null ? '' : days <= 0 ? 'Heute!' : days === 1 ? 'Morgen!' : `${days}d bis Prüfung`;

    const colorStop = {
      blue: '#1d4ed8', green: '#15803d', purple: '#7c3aed',
      orange: '#ea580c', teal: '#0d9488', red: '#dc2626',
    }[course.color] || '#4f46e5';

    return `
      <div class="mb-10">
        <!-- Course header card -->
        <div class="mx-4 mb-6 rounded-2xl p-4 cursor-pointer hover:opacity-90 transition"
             style="background:linear-gradient(135deg,${colorStop}33,${colorStop}11);border:1px solid ${colorStop}44"
             onclick="CourseHubScreen.open('${courseKey}')">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${course.icon}</span>
            <div class="flex-1">
              <div class="font-bold text-lg">${course.label}</div>
              ${daysLabel ? `<div class="text-xs ${urgency} mt-0.5">🎯 ${daysLabel}</div>` : ''}
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">${overallPct}%</div>
              <div class="text-xs text-gray-400">${doneCards}/${totalCards} Karten</div>
            </div>
          </div>
          <div class="mt-3 rounded-full h-2" style="background:rgba(255,255,255,0.1)">
            <div class="h-2 rounded-full transition-all" style="width:${overallPct}%;background:${colorStop}"></div>
          </div>
        </div>

        <!-- Milestone nodes -->
        <div class="relative px-4">
          <!-- Centre spine -->
          <div class="absolute left-[2.25rem] top-4 bottom-4 w-0.5" style="background:rgba(255,255,255,0.08)"></div>

          <div class="space-y-3">
            ${nodes.map((node, i) => _nodeHTML(node, i, nodes.length, course, colorStop)).join('')}
          </div>
        </div>
      </div>`;
  }

  function _nodeHTML(node, i, total, course, colorStop) {
    const pct      = node.total ? Math.round(node.done / node.total * 100) : 0;
    const isLast   = i === total - 1;

    let circleStyle, circleIcon, cardOpacity, badgeHTML;
    if (node.isDone) {
      circleStyle = 'background:#16a34a';
      circleIcon  = '✓';
      cardOpacity = '';
      badgeHTML   = `<span class="text-green-400 text-xs font-bold">Fertig ✓</span>`;
    } else if (node.isActive) {
      circleStyle = `background:${colorStop}`;
      circleIcon  = '★';
      cardOpacity = '';
      badgeHTML   = `<span class="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Jetzt lernen</span>`;
    } else {
      circleStyle = 'background:#374151';
      circleIcon  = '🔒';
      cardOpacity = 'opacity-40';
      badgeHTML   = `<span class="text-gray-600 text-xs">Gesperrt</span>`;
    }

    const clickHandler = (node.isActive || node.isDone)
      ? `onclick="CourseHubScreen.open('${course.key}'); setTimeout(()=>CourseHubScreen.showTab('flashcards'),150)"`
      : '';

    return `
      <div class="flex items-start gap-3 ${cardOpacity}">
        <!-- Circle node -->
        <div class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10 relative"
             style="${circleStyle}">
          ${circleIcon}
        </div>

        <!-- Content card -->
        <div class="flex-1 bg-gray-800 rounded-2xl px-4 py-3 ${node.isActive || node.isDone ? 'cursor-pointer hover:bg-gray-700' : ''} transition"
             ${clickHandler}>
          <div class="flex items-center justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="font-bold text-sm truncate">${node.label}</div>
              <div class="text-xs text-gray-400 mt-0.5">${node.done}/${node.total} Karten · ${pct}%</div>
            </div>
            ${badgeHTML}
          </div>
          ${node.isActive && node.total > 0 ? `
          <div class="mt-2 rounded-full h-1" style="background:rgba(255,255,255,0.1)">
            <div class="h-1 rounded-full transition-all" style="width:${pct}%;background:${colorStop}"></div>
          </div>` : ''}
        </div>
      </div>`;
  }

  function _buildNodes(courseKey) {
    const cards = (window.FLASHCARD_DATA || []).filter(c => c.course === courseKey);
    const prog  = AppState.get('cardProgress') || {};
    const map   = {};

    cards.forEach(c => {
      const t = c.topic || 'Allgemein';
      if (!map[t]) map[t] = { label: t, total: 0, done: 0 };
      map[t].total++;
      if (prog[c.id] && prog[c.id].reviews > 0) map[t].done++;
    });

    return Object.values(map);
  }

  function _enrolledCourses() {
    const enrolled = AppState.get('enrolledCourses');
    const all = (window.COURSES_CONFIG || []).map(c => c.key);
    if (!enrolled || enrolled.length === 0) return all;
    return enrolled;
  }

  return { init };
})();
