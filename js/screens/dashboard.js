// ── Dashboard Screen ──────────────────────────────────────────────────────

window.DashboardScreen = (function() {

  function init() {
    updateGreeting();
    renderCourseCards();
    renderDueToday();
    Gamification.render();
  }

  function updateGreeting() {
    const h = new Date().getHours();
    const g = h < 12 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend';
    const el = document.getElementById('greeting');
    if (el) el.textContent = g + '! 👋';
  }

  function renderCourseCards() {
    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};

    const courses = [
      { key: 'statistik', course: 'Statistik',  id: 'stat',  exam: '01.07.', daysLeft: daysUntil('2026-07-01'), color: 'blue'   },
      { key: 'makro',     course: 'MakroII',     id: 'makro', exam: '13.07.', daysLeft: daysUntil('2026-07-13'), color: 'green'  },
      { key: 'esf',       course: 'ESF',         id: 'esf',   exam: '23.06.', daysLeft: daysUntil('2026-06-23'), color: 'purple' },
      { key: 'om',        course: 'OM',          id: 'om',    exam: '25.06.', daysLeft: daysUntil('2026-06-25'), color: 'orange' },
    ];

    courses.forEach(({ course, id, daysLeft }) => {
      const courseCards = allCards.filter(c => c.course === course);
      const total   = courseCards.length;
      const learned = courseCards.filter(c => prog[c.id] && prog[c.id].reviews > 0).length;
      const pct     = total ? Math.round(learned / total * 100) : 0;

      const totalEl = document.getElementById(id + '-cards-total');
      const doneEl  = document.getElementById(id + '-cards-done');
      const barEl   = document.getElementById(id + '-progress');
      const daysEl  = document.getElementById(id + '-days');

      if (totalEl) totalEl.textContent = total;
      if (doneEl)  doneEl.textContent  = learned;
      if (barEl)   barEl.style.width   = pct + '%';
      if (daysEl)  daysEl.textContent  = daysLeft <= 0 ? '🔴 Heute!' : `${daysLeft}d`;
    });
  }

  function daysUntil(dateStr) {
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  function renderDueToday() {
    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};
    const now = Date.now();

    const due = allCards.filter(c => {
      const p = prog[c.id];
      return !p || !p.nextReview || p.nextReview <= now;
    }).slice(0, 5);

    const list = document.getElementById('due-today-list');
    if (!list) return;

    if (due.length === 0) {
      list.innerHTML = '<p class="text-green-400 text-sm">✅ Alles erledigt für heute!</p>';
    } else {
      list.innerHTML = due.map(c => `
        <div class="flex items-center justify-between bg-gray-700 rounded-xl px-3 py-2 cursor-pointer hover:bg-gray-600 transition"
             onclick="FlashcardsScreen.openCardDirect('${c.id}')">
          <span class="text-sm truncate flex-1 mr-2">${c.front.substring(0,55)}${c.front.length>55?'…':''}</span>
          <span class="text-xs px-2 py-0.5 rounded-full text-white flex-shrink-0"
                style="background:${courseColor(c.course)}">${c.course}</span>
        </div>`).join('');
    }
  }

  function courseColor(c) {
    return { Statistik:'#2563eb', MakroII:'#059669', ESF:'#7c3aed', OM:'#ea580c' }[c] || '#6b7280';
  }

  return { init };
})();
