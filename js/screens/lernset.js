// ── Lernset Screen ─────────────────────────────────────────────────────────
// Full-screen overlay with interactive exercises: Reihenfolge (order),
// Wahr/Falsch (truefalse), Single Choice (single), Multiple Choice (multiple).
// Launched from LernenScreen's "Lernset" tab via LernsetScreen.startDeck(course, topic).
//
// Rendering & checking logic for the 4 exercise types lives in
// window.LernsetEngine (js/lernset-engine.js) so it can be reused elsewhere
// (e.g. QuizScreen) without duplicating the interaction code.

window.LernsetScreen = (function () {

  const E = window.LernsetEngine;

  // ── State ──
  let allItems = [];
  let filteredItems = [];
  let currentIndex = 0;
  let activeCourse = null;
  let activeTopic  = null;
  let checked = false;

  // Working state per exercise type
  let currentOrder   = [];   // 'order': current arrangement (array of indices into item.items)
  let tfAnswers      = [];   // 'truefalse': array of bool|null
  let selectedSingle = null; // 'single'
  let selectedMulti  = [];   // 'multiple'

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    allItems = window.LERNSET_DATA || [];
  }

  // ══════════════════════════════════════════════════════════
  // OPEN / CLOSE
  // ══════════════════════════════════════════════════════════

  function startDeck(course, topic) {
    activeCourse = course || null;
    activeTopic  = topic  || null;

    filteredItems = allItems
      .filter(c => !activeCourse || c.course === activeCourse)
      .filter(c => !activeTopic  || c.topic  === activeTopic);

    // Shuffle
    for (let i = filteredItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredItems[i], filteredItems[j]] = [filteredItems[j], filteredItems[i]];
    }

    currentIndex = 0;
    _render();

    const titleEl = document.getElementById('lns-deck-title');
    if (titleEl) {
      titleEl.textContent = activeTopic
        ? activeTopic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '')
        : (activeCourse || 'Alle Übungen');
    }

    document.getElementById('lernset-overlay')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (filteredItems.length) {
      document.getElementById('lns-no-items')?.classList.add('hidden');
      document.getElementById('lns-exercise-card')?.classList.remove('hidden');
      document.getElementById('lns-action-btn')?.classList.remove('hidden');
      showExercise(0);
    } else {
      document.getElementById('lns-no-items')?.classList.remove('hidden');
      document.getElementById('lns-exercise-card')?.classList.add('hidden');
      document.getElementById('lns-action-btn')?.classList.add('hidden');
    }
  }

  function close() {
    document.getElementById('lernset-overlay')?.classList.add('hidden');
    document.body.style.overflow = '';
    // Refresh the Lernset tab in the Lernen hub so progress bars update
    if (window.LernenScreen?.getActiveMode?.() === 'lernset') {
      window.LernenScreen.setMode('lernset');
    }
  }

  // ══════════════════════════════════════════════════════════
  // STATIC SHELL
  // ══════════════════════════════════════════════════════════

  function _render() {
    const overlay = document.getElementById('lernset-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="flex items-center justify-between px-4 py-3 flex-shrink-0" style="border-bottom:1px solid var(--border)">
        <button onclick="LernsetScreen.close()" class="flex items-center gap-1 text-sm" style="color:var(--txt-2)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>Themen
        </button>
        <div id="lns-deck-title" class="font-semibold text-sm truncate max-w-[160px]" style="color:var(--txt)"></div>
        <div class="w-16"></div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-4 py-4 w-full">

          <!-- Progress bar -->
          <div class="mb-3">
            <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
              <div id="lns-progress-bar" class="h-full rounded-full bg-blue-500 transition-all duration-500" style="width:0%"></div>
            </div>
            <div class="flex justify-between text-xs mt-1.5" style="color:var(--txt-3)">
              <span id="lns-counter">0 / 0</span>
              <span id="lns-topic-label" class="truncate ml-2 text-right" style="max-width:200px"></span>
            </div>
          </div>

          <!-- Exercise card -->
          <div id="lns-exercise-card" class="rounded-3xl p-5 mb-4" style="background:var(--card);border:2px solid var(--border)">
            <div class="flex items-center justify-between gap-2 mb-3">
              <span id="lns-type-label" class="text-xs uppercase tracking-widest font-semibold flex-shrink-0" style="color:var(--txt-3)"></span>
              <span id="lns-chapter-label" class="text-xs px-2 py-0.5 rounded-full truncate"
                    style="background:rgba(99,102,241,0.15);color:#a5b4fc;max-width:170px"></span>
            </div>
            <div id="lns-prompt" class="text-base font-semibold leading-relaxed mb-4" style="color:var(--txt)"></div>
            <div id="lns-body"></div>
            <div id="lns-feedback" class="hidden"></div>
          </div>

          <!-- Action button -->
          <button id="lns-action-btn" onclick="LernsetScreen.handleAction()"
                  class="w-full py-4 rounded-2xl font-bold text-base text-white transition hover:opacity-90">Prüfen</button>

          <!-- No items -->
          <div id="lns-no-items" class="hidden text-center py-16">
            <div class="text-5xl mb-4">🎯</div>
            <p style="color:var(--txt-2)">Keine Lern-Übungen für diese Auswahl.</p>
            <button onclick="LernsetScreen.close()" class="mt-4 text-blue-400 text-sm">← Zurück zur Auswahl</button>
          </div>

        </div>
      </div>

      <!-- Success animation overlay -->
      <div id="lns-success-overlay" class="hidden fixed inset-0 z-[5] pointer-events-none">
        <div id="lns-success-inner" class="absolute top-1/2 left-1/2 text-center">
          <div id="lns-success-emoji" class="text-7xl"></div>
          <div id="lns-success-text" class="text-2xl font-black text-white mt-2 drop-shadow-xl"></div>
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════
  // EXERCISE DISPLAY
  // ══════════════════════════════════════════════════════════

  function showExercise(index) {
    if (!filteredItems.length) return;
    currentIndex = ((index % filteredItems.length) + filteredItems.length) % filteredItems.length;
    const item = filteredItems[currentIndex];
    checked = false;

    _setTxt('lns-type-label', E.TYPE_LABELS[item.type] || '');
    _setTxt('lns-chapter-label', item.topic || '');
    E.renderContent(document.getElementById('lns-prompt'), item.prompt || item.question || '');

    const pct = filteredItems.length > 1
      ? Math.round((currentIndex / (filteredItems.length - 1)) * 100) : 100;
    const pb = document.getElementById('lns-progress-bar');
    if (pb) pb.style.width = pct + '%';
    _setTxt('lns-counter', `${currentIndex + 1} / ${filteredItems.length}`);
    _setTxt('lns-topic-label', item.topic || '');

    const feedback = document.getElementById('lns-feedback');
    if (feedback) { feedback.classList.add('hidden'); feedback.innerHTML = ''; }

    const body = document.getElementById('lns-body');
    if (body) {
      switch (item.type) {
        case 'order':      _renderOrder(item, body);     break;
        case 'truefalse':  _renderTrueFalse(item, body); break;
        case 'single':     _renderSingle(item, body);    break;
        case 'multiple':   _renderMultiple(item, body);  break;
        default:           body.innerHTML = '';
      }
      E.renderMathIn(body);
    }

    _setActionBtn('Prüfen', false);

    const card = document.getElementById('lns-exercise-card');
    if (card) {
      card.classList.remove('fc-card-in');
      void card.offsetWidth;
      card.classList.add('fc-card-in');
    }
  }

  // ══════════════════════════════════════════════════════════
  // TYPE-SPECIFIC RENDERING (delegates to LernsetEngine)
  // ══════════════════════════════════════════════════════════

  function _renderOrder(item, body) {
    currentOrder = E.shuffledIndices(item.items.length);
    body.innerHTML = `
      <div id="lns-order-list" class="space-y-2"></div>
      <div class="text-xs mt-2" style="color:var(--txt-3)">Ziehe die Karten (☰) oder nutze die Pfeile, um die richtige Reihenfolge herzustellen.</div>`;
    E.renderOrderList(document.getElementById('lns-order-list'), item.items, currentOrder, {
      getChecked: () => checked,
    });
  }

  function _renderTrueFalse(item, body) {
    tfAnswers = item.statements.map(() => null);
    body.innerHTML = `<div id="lns-tf-list" class="space-y-3"></div>`;
    E.renderTfList(document.getElementById('lns-tf-list'), item.statements, tfAnswers);
  }

  function _renderSingle(item, body) {
    selectedSingle = null;
    body.innerHTML = `<div id="lns-options" class="space-y-2"></div>`;
    const listEl = document.getElementById('lns-options');
    E.renderOptionsList(listEl, item.options, (idx) => {
      if (checked) return;
      selectedSingle = idx;
      E.updateSingleSelection(listEl, selectedSingle);
    });
  }

  function _renderMultiple(item, body) {
    selectedMulti = [];
    body.innerHTML = `
      <div id="lns-options" class="space-y-2"></div>
      <div class="text-xs mt-2" style="color:var(--txt-3)">Mehrfachauswahl möglich.</div>`;
    const listEl = document.getElementById('lns-options');
    E.renderOptionsList(listEl, item.options, (idx) => {
      if (checked) return;
      const pos = selectedMulti.indexOf(idx);
      if (pos >= 0) selectedMulti.splice(pos, 1);
      else selectedMulti.push(idx);
      E.updateMultiSelection(listEl, selectedMulti);
    });
  }

  // ══════════════════════════════════════════════════════════
  // CHECK / FEEDBACK / NEXT
  // ══════════════════════════════════════════════════════════

  function handleAction() {
    if (!filteredItems.length) return;
    const item = filteredItems[currentIndex];

    if (!checked) {
      let fraction = 0;
      switch (item.type) {
        case 'order':
          fraction = E.checkOrder(document.getElementById('lns-order-list'), item.items, currentOrder);
          break;
        case 'truefalse':
          fraction = E.checkTrueFalse(document.getElementById('lns-tf-list'), item.statements, tfAnswers);
          break;
        case 'single':
          fraction = E.checkSingle(document.getElementById('lns-options'), item.options, item.correctIndex, selectedSingle);
          break;
        case 'multiple':
          fraction = E.checkMultiple(document.getElementById('lns-options'), item.options, item.correctIndices, selectedMulti);
          break;
      }
      checked = true;
      _showFeedback(item, fraction);
      _saveProgress(item, fraction);
      _setActionBtn(currentIndex < filteredItems.length - 1 ? 'Weiter' : 'Fertig 🎉', true);
    } else if (currentIndex < filteredItems.length - 1) {
      showExercise(currentIndex + 1);
    } else {
      close();
    }
  }

  function _showFeedback(item, fraction) {
    const fb = document.getElementById('lns-feedback');
    if (!fb) return;

    const badge = E.feedbackBadge(fraction);

    let extra = '';
    if (item.type === 'order' && fraction < 1) {
      extra = `
        <div class="text-xs uppercase tracking-widest mb-1 mt-3" style="color:var(--txt-3)">Richtige Reihenfolge</div>
        <ol class="lns-correct-order">
          ${item.items.map(t => `<li>${E.escHtml(t)}</li>`).join('')}
        </ol>`;
    }

    const explanationText = item.explanation
      || (item.type === 'truefalse' ? 'Erklärungen findest du direkt bei den Aussagen oben.' : '');

    fb.className = `lns-feedback-box ${badge.cls}`;
    fb.innerHTML = `
      <div class="lns-fb-badge">${badge.label}</div>
      ${explanationText ? `<div class="text-sm leading-relaxed" style="color:var(--txt)">${E.escHtml(explanationText)}</div>` : ''}
      ${extra}`;
    fb.classList.remove('hidden');
    E.renderMathIn(fb);

    if (fraction === 1) _showSuccessAnim();
  }

  function _showSuccessAnim() {
    const overlay = document.getElementById('lns-success-overlay');
    const inner   = document.getElementById('lns-success-inner');
    const emoji   = document.getElementById('lns-success-emoji');
    const textEl  = document.getElementById('lns-success-text');
    if (!overlay) return;

    const emojis = ['⚡', '🔥', '✨', '💡', '🎯', '🏆'];
    if (emoji)  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    if (textEl) textEl.textContent = 'Richtig! 🎯';

    if (inner) {
      inner.classList.remove('fc-success-anim');
      void inner.offsetWidth;
      inner.classList.add('fc-success-anim');
    }
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.add('hidden');
      if (inner) inner.classList.remove('fc-success-anim');
    }, 1550);
  }

  function _saveProgress(item, fraction) {
    const prog = AppState.getLernsetProgress(item.id);
    prog.attempts  = (prog.attempts || 0) + 1;
    prog.lastScore = fraction;
    prog.bestScore = Math.max(prog.bestScore || 0, fraction);
    AppState.setLernsetProgress(item.id, prog);

    const xp = fraction === 1 ? Gamification.XP.lernCorrect
             : fraction > 0   ? Gamification.XP.lernPartial
             :                  Gamification.XP.lernWrong;
    Gamification.addXP(xp);
  }

  function _setActionBtn(label, isNext) {
    const btn = document.getElementById('lns-action-btn');
    if (!btn) return;
    btn.textContent = label;
    btn.classList.toggle('lns-btn-next', isNext);
  }

  function _setTxt(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ══════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════

  return {
    init,
    startDeck,
    close,
    handleAction,
  };
})();
