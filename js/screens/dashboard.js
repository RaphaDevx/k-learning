// ── Dashboard Screen ──────────────────────────────────────────────────────

window.DashboardScreen = (function() {

  function init() {
    updateGreeting();
    renderCourseGrid();
    renderDueToday();
    Gamification.render();
  }

  function updateGreeting() {
    const h = new Date().getHours();
    const g = h < 12 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend';
    const el = document.getElementById('greeting');
    if (el) el.textContent = g + '! 👋';
  }

  function enrolledCourses() {
    const enrolled = AppState.get('enrolledCourses');
    const all = (window.COURSES_CONFIG || []).map(c => c.key);
    if (!enrolled || enrolled.length === 0) return all;
    return enrolled;
  }

  function renderCourseGrid() {
    const grid = document.getElementById('dashboard-course-grid');
    if (!grid) return;

    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};
    const active = enrolledCourses();

    const colorBg = {
      blue:   'background:linear-gradient(135deg,#1e3a5f,#1d4ed8)',
      green:  'background:linear-gradient(135deg,#14532d,#15803d)',
      purple: 'background:linear-gradient(135deg,#3b0764,#7c3aed)',
      orange: 'background:linear-gradient(135deg,#7c2d12,#ea580c)',
      red:    'background:linear-gradient(135deg,#7f1d1d,#dc2626)',
      teal:   'background:linear-gradient(135deg,#134e4a,#0d9488)',
    };

    grid.innerHTML = active.map(key => {
      const c = (window.COURSES_CONFIG || []).find(x => x.key === key);
      if (!c) return '';

      const courseCards = allCards.filter(x => x.course === key);
      const total = courseCards.length;
      const learned = courseCards.filter(x => prog[x.id] && prog[x.id].reviews > 0).length;
      const pct = total ? Math.round(learned / total * 100) : 0;
      const days = daysUntil(c.examDate);
      const daysText = days <= 0 ? '🔴 Heute!' : days === 1 ? '🔥 Morgen!' : `${days}d`;
      const urgency = days <= 3 ? 'text-red-300' : days <= 7 ? 'text-yellow-300' : 'text-gray-300';
      const bgStyle = colorBg[c.color] || colorBg.blue;
      const fillColor = { blue:'#93c5fd', green:'#86efac', purple:'#d8b4fe', orange:'#fdba74', teal:'#5eead4' }[c.color] || '#93c5fd';

      return `
        <div class="rounded-2xl p-4 cursor-pointer transition hover:opacity-90 hover:scale-[1.02]"
             style="${bgStyle}; border:1px solid rgba(255,255,255,0.1)"
             onclick="CourseHubScreen.open('${key}')">
          <div class="text-2xl mb-2">${c.icon}</div>
          <div class="font-bold">${c.label}</div>
          <div class="text-xs text-gray-300 mt-1">${learned} / ${total} Karten</div>
          <div class="text-xs ${urgency} mt-0.5">${daysText}</div>
          <div class="mt-2 rounded-full h-1.5" style="background:rgba(255,255,255,0.15)">
            <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${fillColor}"></div>
          </div>
        </div>`;
    }).join('') + `
      <div class="rounded-2xl p-4 cursor-pointer transition hover:opacity-80 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-gray-500"
           onclick="DashboardScreen.showCourseManager()">
        <div class="text-3xl mb-1 text-gray-600">+</div>
        <div class="text-xs text-gray-600">Kurs hinzufügen</div>
      </div>`;
  }

  function renderDueToday() {
    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};
    const now = Date.now();
    const active = enrolledCourses();

    const due = allCards
      .filter(c => active.includes(c.course))
      .filter(c => { const p = prog[c.id]; return !p || !p.nextReview || p.nextReview <= now; })
      .slice(0, 5);

    const list = document.getElementById('due-today-list');
    if (!list) return;

    if (due.length === 0) {
      list.innerHTML = '<p class="text-green-400 text-sm">✅ Alles erledigt für heute!</p>';
    } else {
      list.innerHTML = due.map(c => `
        <div class="flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-600 transition"
             onclick="FlashcardsScreen.openCardDirect && FlashcardsScreen.openCardDirect('${c.id}')">
          <span class="text-sm truncate flex-1 mr-2">${c.front.substring(0,55)}${c.front.length>55?'…':''}</span>
          <span class="text-xs px-2 py-0.5 rounded-full text-white flex-shrink-0"
                style="background:${getCourse(c.course)?.hex || '#6b7280'}">${c.course}</span>
        </div>`).join('');
    }
  }

  function showCourseManager() {
    const all = window.COURSES_CONFIG || [];
    const enrolled = enrolledCourses();

    const modal = document.createElement('div');
    modal.id = 'course-manager-modal';
    modal.className = 'fixed inset-0 z-[170] flex items-center justify-center';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.innerHTML = `
      <div class="bg-gray-800 rounded-3xl p-6 max-w-sm mx-4 w-full">
        <h2 class="text-xl font-bold mb-4">📚 Kurse verwalten</h2>
        <div class="space-y-2 mb-5">
          ${all.map(c => {
            const isEnrolled = enrolled.includes(c.key);
            return `
              <label class="flex items-center gap-3 bg-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-600 transition">
                <input type="checkbox" value="${c.key}" ${isEnrolled ? 'checked' : ''}
                  class="course-enroll-check w-4 h-4 rounded accent-blue-500">
                <span class="text-lg">${c.icon}</span>
                <div class="flex-1">
                  <div class="font-bold text-sm">${c.label}</div>
                  <div class="text-xs text-gray-400">${c.examDate ? 'Prüfung: ' + c.examDate : ''}</div>
                </div>
              </label>`;
          }).join('')}
        </div>
        <div class="flex gap-3">
          <button onclick="document.getElementById('course-manager-modal').remove()"
            class="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-bold transition text-sm">
            Abbrechen
          </button>
          <button onclick="DashboardScreen.saveCourses()"
            class="flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-bold transition text-sm">
            Speichern
          </button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function saveCourses() {
    const checks = document.querySelectorAll('.course-enroll-check:checked');
    const selected = Array.from(checks).map(c => c.value);
    AppState.set('enrolledCourses', selected.length > 0 ? selected : null);
    document.getElementById('course-manager-modal')?.remove();
    init();
  }

  function daysUntil(dateStr) {
    if (!dateStr) return 999;
    return Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  }

  return { init, showCourseManager, saveCourses };
})();
