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
  let skipCalculator = false; // 'open': when true, all requiresCalculator questions are auto-skipped

  // Session
  let _sessionKey    = null; // `${course}::${topic}` for cross-device sync
  let _pendingResume = null; // { savedSet, savedIndex, pool } while resume prompt is shown

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    allItems = window.LERNSET_DATA || [];
  }

  // ══════════════════════════════════════════════════════════
  // OPEN / CLOSE
  // ══════════════════════════════════════════════════════════

  async function startDeck(course, topic) {
    activeCourse = course || null;
    activeTopic  = topic  || null;
    _sessionKey  = `${activeCourse || 'all'}::${activeTopic || '_all'}`;

    const reportedIds = await (window.ReportSystem?.getReportedIds('lernset') ?? Promise.resolve(new Set()));
    const pool = allItems
      .filter(c => !activeCourse || c.course === activeCourse)
      .filter(c => !activeTopic  || c.topic  === activeTopic)
      .filter(c => !reportedIds.has(c.id));

    document.getElementById('lernset-overlay')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const saved = await SessionSync.load('lernset', _sessionKey);
    let savedSet = null;
    if (saved && Array.isArray(saved.item_ids) && saved.current_index < saved.item_ids.length) {
      const mapped = saved.item_ids.map(id => pool.find(i => i.id === id)).filter(Boolean);
      if (mapped.length === saved.item_ids.length) savedSet = mapped;
    }

    if (savedSet) {
      _pendingResume = { savedSet, savedIndex: saved.current_index, pool };
      const overlay = document.getElementById('lernset-overlay');
      if (overlay) {
        overlay.innerHTML = SessionSync.resumePromptHtml({
          position: saved.current_index + 1,
          total: savedSet.length,
          resumeOnClick: 'LernsetScreen._resumeSaved()',
          restartOnClick: 'LernsetScreen._restartSaved()',
          closeOnClick: 'LernsetScreen._closeResumePrompt()',
        });
      }
      return;
    }

    if (saved) SessionSync.clear('lernset', _sessionKey);
    _startNewSet(pool);
  }

  // Wählt das Set für diese Session: unbearbeitete/schwache Items zuerst
  // (Anpassung durch den Lernalgorithmus), begrenzt auf SessionSync.sessionSize.
  function _selectSet(pool) {
    const groups = { neu: [], schwach: [], mittel: [], gemeistert: [] };
    pool.forEach(item => {
      const prog = AppState.getLernsetProgress(item.id);
      if (!prog.attempts)                     groups.neu.push(item);
      else if ((prog.bestScore || 0) < 0.6)   groups.schwach.push(item);
      else if ((prog.bestScore || 0) < 1)     groups.mittel.push(item);
      else                                    groups.gemeistert.push(item);
    });

    const shuffle = arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const ordered = [
      ...shuffle(groups.neu),
      ...shuffle(groups.schwach),
      ...shuffle(groups.mittel),
      ...shuffle(groups.gemeistert),
    ];
    return ordered.slice(0, SessionSync.sessionSize(pool.length));
  }

  function _setTitle() {
    const titleEl = document.getElementById('lns-deck-title');
    if (titleEl) {
      titleEl.textContent = activeTopic
        ? activeTopic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '')
        : (activeCourse || 'Alle Übungen');
    }
  }

  function _startNewSet(pool) {
    filteredItems = _selectSet(pool);
    currentIndex = 0;
    skipCalculator = false;
    _render();
    _setTitle();

    if (filteredItems.length) {
      document.getElementById('lns-no-items')?.classList.add('hidden');
      document.getElementById('lns-exercise-card')?.classList.remove('hidden');
      document.getElementById('lns-action-btn')?.classList.remove('hidden');
      showExercise(0);
      SessionSync.save('lernset', _sessionKey, { itemIds: filteredItems.map(i => i.id), currentIndex: 0 });
    } else {
      document.getElementById('lns-no-items')?.classList.remove('hidden');
      document.getElementById('lns-exercise-card')?.classList.add('hidden');
      document.getElementById('lns-action-btn')?.classList.add('hidden');
    }
  }

  function _resumeSaved() {
    const { savedSet, savedIndex } = _pendingResume;
    _pendingResume = null;
    filteredItems = savedSet;
    currentIndex = savedIndex;
    _render();
    _setTitle();
    document.getElementById('lns-no-items')?.classList.add('hidden');
    document.getElementById('lns-exercise-card')?.classList.remove('hidden');
    document.getElementById('lns-action-btn')?.classList.remove('hidden');
    showExercise(currentIndex);
  }

  function _restartSaved() {
    SessionSync.clear('lernset', _sessionKey);
    const { pool } = _pendingResume;
    _pendingResume = null;
    _startNewSet(pool);
  }

  // Verlässt den Resume-Prompt ohne den gespeicherten Fortschritt zu verändern
  function _closeResumePrompt() {
    _pendingResume = null;
    document.getElementById('lernset-overlay')?.classList.add('hidden');
    document.body.style.overflow = '';
    if (window.LernenScreen?.getActiveMode?.() === 'lernset') {
      window.LernenScreen.setMode('lernset');
    }
  }

  function close() {
    if (filteredItems.length && (currentIndex < filteredItems.length - 1 || !checked)) {
      SessionSync.save('lernset', _sessionKey, { itemIds: filteredItems.map(i => i.id), currentIndex });
    }
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
        <button onclick="LernsetScreen.openReport()"
          style="width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;flex-shrink:0;
                 display:flex;align-items:center;justify-content:center;
                 background:var(--card-raised);color:var(--txt-3);font-size:1.1rem"
          title="Übung melden">⋮</button>
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
        case 'open':       _renderOpen(item, body);      break;
        default:           body.innerHTML = '';
      }
      E.renderMathIn(body);
    }

    if (item.type === 'open') {
      // If skipCalculator is active and this question needs a calculator → auto-skip it
      if (item.requiresCalculator && skipCalculator) {
        _showOpenSkipped(item);
        _saveProgress(item, 0.5);
        checked = true;
        _setActionBtn(currentIndex < filteredItems.length - 1 ? 'Weiter' : 'Fertig 🎉', true);
        const btn = document.getElementById('lns-action-btn');
        if (btn) btn.classList.remove('hidden');
      }
      // Main action button is hidden for open questions (inline buttons take over)
    } else {
      _setActionBtn('Prüfen', false);
    }

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

  function _renderOpen(item, body) {
    const ctx = item.context
      ? `<div class="text-sm mb-3 px-3 py-2 rounded-xl" style="background:rgba(99,102,241,0.1);color:var(--txt-2)">${E.escHtml(item.context)}</div>`
      : '';
    const skipBtn = item.requiresCalculator
      ? `<button id="lns-skip-calc-btn" onclick="LernsetScreen.openSkip()"
           class="py-3 px-4 rounded-xl font-semibold text-sm flex-shrink-0"
           style="background:var(--card-raised);color:var(--txt-2);border:1px solid var(--border)">
           🧮 Kein TR</button>`
      : '';
    body.innerHTML = `
      ${ctx}
      <textarea id="lns-open-answer" rows="5"
        class="w-full rounded-xl p-3 text-sm resize-none"
        style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt);outline:none;font-family:inherit"
        placeholder="Tippe deine Antwort hier…"></textarea>
      <div class="flex gap-2 mt-3">
        <button id="lns-ai-eval-btn" onclick="LernsetScreen.openAiCheck()"
          class="flex-1 py-3 rounded-xl font-bold text-sm text-white"
          style="background:#4f46e5">🤖 KI-Auswertung</button>
        ${skipBtn}
      </div>`;
    E.renderMathIn(body);
    // Hide the main action button — inline buttons drive the flow
    const btn = document.getElementById('lns-action-btn');
    if (btn) btn.classList.add('hidden');
  }

  function _showOpenResult(item, aiText, fraction) {
    const fb = document.getElementById('lns-feedback');
    if (!fb) return;
    const badge = E.feedbackBadge(fraction);
    fb.className = `lns-feedback-box ${badge.cls}`;
    fb.innerHTML = `
      <div class="lns-fb-badge">${badge.label}</div>
      <div class="text-sm leading-relaxed mb-3" style="color:var(--txt)">${E.escHtml(aiText)}</div>
      <div class="text-xs uppercase tracking-widest mb-1" style="color:var(--txt-3)">Musterlösung</div>
      <div class="text-sm p-3 rounded-xl" style="background:rgba(0,0,0,0.25);color:var(--txt-2)">${E.escHtml(item.modelAnswer)}</div>`;
    fb.classList.remove('hidden');
    E.renderMathIn(fb);
    if (fraction === 1) _showSuccessAnim();
  }

  function _showOpenSkipped(item) {
    const fb = document.getElementById('lns-feedback');
    if (!fb) return;
    fb.className = 'lns-feedback-box lns-fb-teilweise';
    fb.innerHTML = `
      <div class="lns-fb-badge">🧮 Übersprungen — kein Taschenrechner</div>
      <div class="text-xs mt-2 mb-1" style="color:var(--txt-3)">Musterlösung</div>
      <div class="text-sm p-3 rounded-xl" style="background:rgba(0,0,0,0.25);color:var(--txt-2)">${E.escHtml(item.modelAnswer)}</div>`;
    fb.classList.remove('hidden');
    E.renderMathIn(fb);
  }

  async function openAiCheck() {
    if (checked) return;
    const item = filteredItems[currentIndex];
    const userAnswer = (document.getElementById('lns-open-answer')?.value || '').trim();

    if (!userAnswer) {
      const ta = document.getElementById('lns-open-answer');
      if (ta) { ta.style.borderColor = '#ef4444'; setTimeout(() => { ta.style.borderColor = ''; }, 1500); }
      return;
    }

    const evalBtn = document.getElementById('lns-ai-eval-btn');
    const skipBtn = document.getElementById('lns-skip-calc-btn');
    if (evalBtn) { evalBtn.disabled = true; evalBtn.textContent = '⏳ Wird ausgewertet…'; }
    if (skipBtn) skipBtn.disabled = true;

    try {
      const resp = await AIService.ask([{
        role: 'user',
        content: `Frage: ${item.prompt}\n\nMusterlösung: ${item.modelAnswer}\n\nStudentenantwort: "${userAnswer}"\n\nBeurteile die Antwort. Beginne die erste Zeile mit genau einem von: "Korrekt", "Teilweise korrekt" oder "Nicht korrekt". Danach 2-3 Sätze Feedback auf Deutsch.`,
      }], {
        system: 'Du bist ein präziser Makroökonomik-Tutor an der Universität St. Gallen. Vergleiche die Studentenantwort mit der Musterlösung und gib konstruktives, kurzes Feedback auf Deutsch.',
        max_tokens: 320,
      });

      const text = AIService.extractText(resp);
      const lower = text.toLowerCase();
      const fraction = lower.startsWith('nicht') ? 0 : lower.startsWith('teilweise') ? 0.5 : 1;

      _showOpenResult(item, text, fraction);
      _saveProgress(item, fraction);
    } catch (_) {
      // No key or network error → show model answer without AI verdict
      const fb = document.getElementById('lns-feedback');
      if (fb) {
        fb.className = 'lns-feedback-box lns-fb-teilweise';
        fb.innerHTML = `
          <div class="lns-fb-badge">⚠️ KI nicht verfügbar — Selbstkorrektur</div>
          <div class="text-sm mb-2" style="color:var(--txt)">Kein API-Key gesetzt oder Verbindungsfehler. Vergleiche deine Antwort selbst mit der Musterlösung.</div>
          <div class="text-xs mb-1" style="color:var(--txt-3)">Musterlösung</div>
          <div class="text-sm p-3 rounded-xl" style="background:rgba(0,0,0,0.25);color:var(--txt-2)">${E.escHtml(item.modelAnswer)}</div>`;
        fb.classList.remove('hidden');
        E.renderMathIn(fb);
      }
      _saveProgress(item, 0.5);
    }

    checked = true;
    const btn = document.getElementById('lns-action-btn');
    if (btn) {
      btn.classList.remove('hidden');
      _setActionBtn(currentIndex < filteredItems.length - 1 ? 'Weiter' : 'Fertig 🎉', true);
    }
  }

  function openSkip() {
    if (checked) return;
    skipCalculator = true; // auto-skip all future requiresCalculator questions this session
    const item = filteredItems[currentIndex];
    _showOpenSkipped(item);
    _saveProgress(item, 0.5);
    checked = true;
    const btn = document.getElementById('lns-action-btn');
    if (btn) {
      btn.classList.remove('hidden');
      _setActionBtn(currentIndex < filteredItems.length - 1 ? 'Weiter' : 'Fertig 🎉', true);
    }
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
      SessionSync.save('lernset', _sessionKey, { itemIds: filteredItems.map(i => i.id), currentIndex });
    } else {
      SessionSync.clear('lernset', _sessionKey);
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

    LevelSystem.award(fraction === 1 ? 'lernCorrect' : fraction > 0 ? 'lernPartial' : 'lernWrong');
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

  function openReport() {
    const item = filteredItems[currentIndex];
    if (!item) return;
    window.ReportSystem?.open(item.id, 'lernset', item.prompt || item.question || item.id, {
      course: item.course,
      topic:  item.topic,
    });
  }

  // ══════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════

  return {
    init,
    startDeck,
    close,
    handleAction,
    openReport,
    openAiCheck,
    openSkip,
    _resumeSaved,
    _restartSaved,
    _closeResumePrompt,
  };
})();
