// ── Dashboard Screen ──────────────────────────────────────────────────────

window.DashboardScreen = (function() {

  // Cached data for current render cycle
  let _catalog = [];
  let _enrolled = [];

  async function init() {
    updateGreeting();
    _catalog  = await CoursesDB.getAvailableCourses();
    _enrolled = await CoursesDB.getEnrolledKeys();
    // Expose merged catalog globally so other screens can use it
    window.COURSES_CONFIG = _catalog;
    renderCourseGrid();
    renderDueToday();
    LevelSystem.render();
  }

  function updateGreeting() {
    const h = new Date().getHours();
    const g = h < 12 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend';
    const el = document.getElementById('greeting');
    if (el) el.textContent = g + '! 👋';
  }

  function renderCourseGrid() {
    const grid = document.getElementById('dashboard-course-grid');
    if (!grid) return;

    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};
    const active = _enrolled;

    if (active.length === 0) {
      grid.innerHTML = `
        <div class="col-span-2 flex flex-col items-center justify-center py-12 text-center">
          <div class="text-4xl mb-3">📚</div>
          <div class="font-semibold mb-1" style="color:var(--txt)">Noch kein Kurs eingeschrieben</div>
          <div class="text-sm mb-5" style="color:var(--txt-2)">Wähle deine Kurse, um loszulegen.</div>
          <button onclick="DashboardScreen.showCourseManager()"
            class="tap-card px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition">
            Kurse auswählen
          </button>
        </div>`;
      return;
    }

    grid.innerHTML = active.map((key, _idx) => {
      const c = _catalog.find(x => x.key === key);
      if (!c) return '';

      const courseCards = allCards.filter(x => x.course === key);
      const total = courseCards.length;
      const learned = courseCards.filter(x => prog[x.id] && prog[x.id].reviews > 0).length;
      const pct = total ? Math.round(learned / total * 100) : 0;
      const days = daysUntil(c.examDate);
      const daysText = days >= 999 ? '—' : days <= 0 ? 'Heute!' : days === 1 ? 'Morgen!' : `${days}d`;
      const urgencyColor = days <= 3 ? '#f87171' : days <= 7 ? '#fbbf24' : 'var(--txt-2)';
      const rgb = c.rgb || '37,99,235';

      return `
        <div class="tap-card rounded-[22px] p-4 cursor-pointer"
             style="background:var(--card);border:1px solid rgba(${rgb},0.35)"
             onmouseover="this.style.boxShadow='0 4px 20px rgba(${rgb},0.2)'"
             onmouseleave="this.style.boxShadow='none'"
             onclick="CourseHubScreen.open('${key}')">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 text-xl"
               style="background:rgba(${rgb},0.14)">${c.icon}</div>
          <div class="font-semibold text-sm leading-snug" style="color:var(--txt)">${c.label}</div>
          <div class="text-xs mt-0.5" style="color:var(--txt-2)">${learned} / ${total} Karten</div>
          <div class="text-xs mt-0.5 font-medium" style="color:${urgencyColor}">${daysText}</div>
          <div class="mt-3 rounded-full h-1" style="background:var(--border)">
            <div class="h-1 rounded-full transition-all" style="width:${pct}%;background:${c.hex}"></div>
          </div>
        </div>`;
    }).join('') + `
      <div class="tap-card rounded-[22px] p-4 cursor-pointer flex flex-col items-center justify-center gap-2"
           style="background:var(--card);border:1.5px dashed var(--border)"
           onclick="DashboardScreen.showNewCourseModal()">
        <div class="text-2xl" style="color:var(--txt-3)">+</div>
        <div class="text-xs text-center" style="color:var(--txt-3)">Neuer Kurs</div>
      </div>
      <div class="tap-card rounded-[22px] p-4 cursor-pointer flex flex-col items-center justify-center gap-2"
           style="background:var(--card);border:1px solid var(--border)"
           onclick="DashboardScreen.showCourseManager()">
        <div class="text-xl" style="color:var(--txt-3)">☰</div>
        <div class="text-xs text-center" style="color:var(--txt-3)">Kurse verwalten</div>
      </div>`;

    _staggerCards(grid);
  }

  function _staggerCards(grid) {
    const cards = grid.querySelectorAll('.tap-card');
    cards.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.22s ease, border-color 0.18s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 55);
    });
  }

  function renderDueToday() {
    const allCards = window.FLASHCARD_DATA || [];
    const prog = AppState.get('cardProgress') || {};
    const now = Date.now();
    const active = _enrolled;

    const due = allCards
      .filter(c => active.includes(c.course))
      .filter(c => { const p = prog[c.id]; return !p || !p.nextReview || p.nextReview <= now; })
      .slice(0, 5);

    const list = document.getElementById('due-today-list');
    if (!list) return;

    if (active.length === 0) {
      list.innerHTML = '<p class="text-sm" style="color:var(--txt-3)">Kurs einschreiben, um Lernkarten zu sehen.</p>';
    } else if (due.length === 0) {
      list.innerHTML = '<p class="text-green-400 text-sm">Alles erledigt für heute!</p>';
    } else {
      list.innerHTML = due.map(c => {
        const course = _catalog.find(x => x.key === c.course);
        const hex = course?.hex || '#6b7280';
        return `
        <div class="flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer transition tap-card"
             style="background:var(--card-raised);border:1px solid var(--border)"
             onclick="FlashcardsScreen.openCardDirect && FlashcardsScreen.openCardDirect('${c.id}')">
          <span class="text-sm truncate flex-1 mr-2" style="color:var(--txt)">${c.front.substring(0,55)}${c.front.length>55?'…':''}</span>
          <span class="text-xs px-2 py-0.5 rounded-full text-white flex-shrink-0 font-medium"
                style="background:${hex}">${c.course}</span>
        </div>`;
      }).join('');
    }
  }

  async function showCourseManager() {
    // Always fetch fresh catalog from Supabase
    const all = await CoursesDB.getAvailableCourses();
    const enrolled = await CoursesDB.getEnrolledKeys();

    // Remove existing modal if open
    document.getElementById('course-manager-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'course-manager-modal';
    modal.className = 'fixed inset-0 z-[170] flex items-center justify-center';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.innerHTML = `
      <div class="rounded-3xl p-6 max-w-sm mx-4 w-full" style="background:var(--card);border:1px solid var(--border)">
        <h2 class="text-xl font-bold mb-4" style="color:var(--txt)">Kurse verwalten</h2>
        <div class="space-y-2 mb-5">
          ${all.map(c => {
            const isEnrolled = enrolled.includes(c.key);
            return `
              <label class="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition tap-card"
                     style="background:var(--card-raised);border:1px solid var(--border)">
                <input type="checkbox" value="${c.key}" ${isEnrolled ? 'checked' : ''}
                  class="course-enroll-check w-4 h-4 rounded accent-blue-500">
                <span class="text-lg">${c.icon}</span>
                <div class="flex-1">
                  <div class="font-semibold text-sm" style="color:var(--txt)">${c.label}</div>
                  <div class="text-xs" style="color:var(--txt-2)">${c.examDate ? 'Prüfung: ' + c.examDate : 'Kein Prüfungsdatum'}</div>
                </div>
              </label>`;
          }).join('')}
        </div>
        <div class="flex gap-3">
          <button onclick="document.getElementById('course-manager-modal').remove()"
            class="tap-card flex-1 rounded-xl py-3 font-bold transition text-sm"
            style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt-2)">
            Abbrechen
          </button>
          <button onclick="DashboardScreen.saveCourses()"
            class="tap-card flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-bold transition text-sm text-white">
            Speichern
          </button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  async function saveCourses() {
    const checks = document.querySelectorAll('.course-enroll-check:checked');
    const selected = Array.from(checks).map(c => c.value);
    await CoursesDB.saveEnrollment(selected);
    document.getElementById('course-manager-modal')?.remove();
    _enrolled = selected;
    window.COURSES_CONFIG = _catalog;
    renderCourseGrid();
    renderDueToday();
  }

  function showNewCourseModal() {
    document.getElementById('new-course-modal')?.remove();

    const ICONS = ['📚','📖','📝','🧮','🔬','💻','🎓','📊','🌍','⚗️','🧪','🔢','📐','💡','🏛️','🧬','🎵','🎨','⚖️','🏋️'];
    const COLORS = [
      { key:'blue',   hex:'#2563eb', label:'Blau'   },
      { key:'green',  hex:'#059669', label:'Grün'   },
      { key:'purple', hex:'#7c3aed', label:'Lila'   },
      { key:'orange', hex:'#ea580c', label:'Orange' },
      { key:'teal',   hex:'#0d9488', label:'Teal'   },
      { key:'red',    hex:'#dc2626', label:'Rot'    },
      { key:'rose',   hex:'#e11d48', label:'Rose'   },
    ];

    const modal = document.createElement('div');
    modal.id = 'new-course-modal';
    modal.className = 'fixed inset-0 z-[170] flex items-end justify-center pb-6 px-4';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.innerHTML = `
      <div class="rounded-3xl p-6 w-full max-w-sm" style="background:var(--card);border:1px solid var(--border)">
        <h2 class="text-xl font-bold mb-5" style="color:var(--txt)">Neuer Kurs</h2>

        <!-- Name -->
        <label class="block mb-4">
          <span class="text-xs font-semibold mb-1.5 block" style="color:var(--txt-2)">KURSNAME</span>
          <input id="nc-name" type="text" placeholder="z.B. Mikroökonomie" maxlength="40"
            class="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none"
            style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt)">
        </label>

        <!-- Icon picker -->
        <div class="mb-4">
          <span class="text-xs font-semibold mb-1.5 block" style="color:var(--txt-2)">ICON</span>
          <div class="flex flex-wrap gap-2">
            ${ICONS.map((em, i) => `
              <button type="button" data-icon="${em}"
                onclick="document.querySelectorAll('#new-course-modal .icon-btn').forEach(b=>b.classList.remove('ring-2','ring-blue-500'));this.classList.add('ring-2','ring-blue-500');document.getElementById('nc-icon').value='${em}'"
                class="icon-btn w-9 h-9 rounded-xl text-xl flex items-center justify-center transition ${i===0?'ring-2 ring-blue-500':''}"
                style="background:var(--card-raised)">${em}</button>`).join('')}
          </div>
          <input type="hidden" id="nc-icon" value="${ICONS[0]}">
        </div>

        <!-- Color picker -->
        <div class="mb-6">
          <span class="text-xs font-semibold mb-1.5 block" style="color:var(--txt-2)">FARBE</span>
          <div class="flex gap-2 flex-wrap">
            ${COLORS.map((c, i) => `
              <button type="button" data-color="${c.key}"
                onclick="document.querySelectorAll('#new-course-modal .color-btn').forEach(b=>b.style.outline='none');this.style.outline='2px solid white';document.getElementById('nc-color').value='${c.key}'"
                class="color-btn w-8 h-8 rounded-full transition"
                style="background:${c.hex};outline:${i===0?'2px solid white':'none'};outline-offset:2px"
                title="${c.label}"></button>`).join('')}
          </div>
          <input type="hidden" id="nc-color" value="${COLORS[0].key}">
        </div>

        <div id="nc-error" class="hidden mb-3 text-sm text-red-400"></div>

        <div class="flex gap-3">
          <button onclick="document.getElementById('new-course-modal').remove()"
            class="tap-card flex-1 rounded-xl py-3 font-bold text-sm transition"
            style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt-2)">
            Abbrechen
          </button>
          <button onclick="DashboardScreen.createCourse()"
            id="nc-submit"
            class="tap-card flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-bold text-sm text-white transition">
            Erstellen
          </button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById('nc-name')?.focus(), 100);
  }

  async function createCourse() {
    const name  = document.getElementById('nc-name')?.value.trim();
    const icon  = document.getElementById('nc-icon')?.value || '📚';
    const color = document.getElementById('nc-color')?.value || 'blue';
    const errEl = document.getElementById('nc-error');
    const btn   = document.getElementById('nc-submit');

    if (!name) {
      errEl.textContent = 'Bitte einen Kursnamen eingeben.';
      errEl.classList.remove('hidden');
      return;
    }

    btn.textContent = 'Erstellt…';
    btn.disabled    = true;
    errEl.classList.add('hidden');

    try {
      await CoursesDB.createCourse({ label: name, icon, color });
      document.getElementById('new-course-modal')?.remove();
      _catalog  = await CoursesDB.getAvailableCourses();
      _enrolled = await CoursesDB.getEnrolledKeys();
      window.COURSES_CONFIG = _catalog;
      renderCourseGrid();
    } catch (err) {
      errEl.textContent = `Fehler: ${err.message}`;
      errEl.classList.remove('hidden');
      btn.textContent = 'Erstellen';
      btn.disabled    = false;
    }
  }

  function daysUntil(dateStr) {
    if (!dateStr) return 999;
    return Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  }

  return { init, showCourseManager, saveCourses, showNewCourseModal, createCourse };
})();
