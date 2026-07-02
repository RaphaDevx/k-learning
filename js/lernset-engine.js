// ── Lernset Engine ────────────────────────────────────────────────────────
// Shared rendering & checking logic for the 4 interactive exercise types:
// "order" (Reihenfolge), "truefalse" (Wahr/Falsch), "single" (Single Choice),
// "multiple" (Multiple Choice).
//
// Used by LernsetScreen, but kept independent of it on purpose: any other
// screen (e.g. QuizScreen / EXAM_DATA-based quizzes) can reuse these
// render*/check* functions for questions of the same shape — e.g. to add
// truefalse or order questions to other courses' quizzes without
// reimplementing the interaction logic.
//
// Conventions:
//  - render* functions take a container element + data and (re)build its
//    innerHTML, wiring up their own event listeners.
//  - check* functions take the same container + data + the user's current
//    answer, apply visual correct/incorrect styling, and return a score
//    fraction in [0, 1].

window.LernsetEngine = (function () {

  const TYPE_LABELS = {
    order: 'Reihenfolge',
    truefalse: 'Wahr / Falsch',
    single: 'Single Choice',
    multiple: 'Multiple Choice',
    open: 'Offene Aufgabe',
  };

  // ══════════════════════════════════════════════════════════
  // CONTENT HELPERS (KaTeX-aware text rendering)
  // ══════════════════════════════════════════════════════════

  function escHtml(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function unescHtml(t) {
    return t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  // Renders text into `el`, converting $...$ / $$...$$ to KaTeX if available.
  function renderContent(el, text) {
    if (!el) return;
    if (!text) { el.innerHTML = ''; return; }
    el.textContent = text;
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
        ],
        throwOnError: false,
      });
    }
  }

  // KaTeX delimiters used by auto-render across the whole app.
  const MATH_DELIMITERS = [
    { left: '$$', right: '$$', display: true },
    { left: '$',  right: '$',  display: false },
  ];

  // Scans `el` for $...$ / $$...$$ math (e.g. in choice/option/explanation
  // text that was inserted via innerHTML without going through
  // renderContent) and renders it in place with KaTeX.
  function renderMathIn(el) {
    if (!el || typeof renderMathInElement === 'undefined') return;
    try {
      renderMathInElement(el, { delimiters: MATH_DELIMITERS, throwOnError: false });
    } catch (e) { /* ignore malformed LaTeX */ }
  }

  // ══════════════════════════════════════════════════════════
  // VERDICT / FEEDBACK
  // ══════════════════════════════════════════════════════════

  // 'richtig' | 'teilweise' | 'falsch'
  function verdict(fraction) {
    return fraction === 1 ? 'richtig' : (fraction > 0 ? 'teilweise' : 'falsch');
  }

  function feedbackBadge(fraction) {
    const v = verdict(fraction);
    if (v === 'richtig')   return { cls: 'lns-fb-richtig',   verdict: v, label: '✓ Richtig!' };
    if (v === 'teilweise') return { cls: 'lns-fb-teilweise', verdict: v, label: `~ Teilweise richtig (${Math.round(fraction * 100)}%)` };
    return { cls: 'lns-fb-falsch', verdict: v, label: '✗ Leider nicht' };
  }

  // ══════════════════════════════════════════════════════════
  // ORDER (Reihenfolge)
  // ══════════════════════════════════════════════════════════

  // Returns a shuffled array of indices [0..n-1] (never the identity order, if n > 1)
  function shuffledIndices(n) {
    const arr = Array.from({ length: n }, (_, i) => i);
    if (arr.length > 1) {
      do {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      } while (arr.every((v, i) => v === i));
    }
    return arr;
  }

  // Renders the reorderable list into `listEl` and wires up arrow buttons +
  // pointer-based drag reordering. `order` is mutated in place as the user
  // reorders. `opts.getChecked()` should return true once the exercise has
  // been checked (disables further reordering); `opts.onChange()` is called
  // after every reorder.
  function renderOrderList(listEl, items, order, opts) {
    opts = opts || {};

    function paint() {
      listEl.innerHTML = order.map((origIdx, pos) => `
        <div class="lns-order-item" data-pos="${pos}">
          <span class="lns-order-handle">☰</span>
          <span class="lns-order-text">${escHtml(items[origIdx])}</span>
          <div class="lns-order-arrows">
            <button class="lns-order-arrow" data-pos="${pos}" data-dir="-1" ${pos === 0 ? 'disabled' : ''}>▲</button>
            <button class="lns-order-arrow" data-pos="${pos}" data-dir="1"  ${pos === order.length - 1 ? 'disabled' : ''}>▼</button>
          </div>
        </div>`).join('');
      renderMathIn(listEl);
    }
    paint();

    // Arrow buttons (delegated — survives re-paints since listEl itself stays)
    listEl.addEventListener('click', (e) => {
      if (opts.getChecked && opts.getChecked()) return;
      const btn = e.target.closest('.lns-order-arrow');
      if (!btn || !listEl.contains(btn)) return;
      const pos = parseInt(btn.dataset.pos, 10);
      const dir = parseInt(btn.dataset.dir, 10);
      const target = pos + dir;
      if (target < 0 || target >= order.length) return;
      [order[pos], order[target]] = [order[target], order[pos]];
      paint();
      opts.onChange && opts.onChange();
    });

    // Drag reordering via Pointer Events
    let dragPos = null;
    function onMove(e) {
      if (dragPos === null) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const target = el && el.closest('.lns-order-item');
      if (!target || !listEl.contains(target)) return;
      const targetPos = parseInt(target.dataset.pos, 10);
      if (targetPos === dragPos) return;
      [order[dragPos], order[targetPos]] = [order[targetPos], order[dragPos]];
      dragPos = targetPos;
      paint();
      opts.onChange && opts.onChange();
      const el2 = listEl.querySelector(`.lns-order-item[data-pos="${dragPos}"]`);
      if (el2) el2.classList.add('lns-dragging');
    }
    function onEnd() {
      dragPos = null;
      listEl.querySelectorAll('.lns-order-item').forEach(el => el.classList.remove('lns-dragging'));
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onEnd);
      document.removeEventListener('pointercancel', onEnd);
    }
    listEl.addEventListener('pointerdown', (e) => {
      if (opts.getChecked && opts.getChecked()) return;
      const handle = e.target.closest('.lns-order-handle');
      if (!handle) return;
      const item = handle.closest('.lns-order-item');
      if (!item) return;
      e.preventDefault();
      dragPos = parseInt(item.dataset.pos, 10);
      item.classList.add('lns-dragging');
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onEnd);
      document.addEventListener('pointercancel', onEnd);
    });
  }

  // Applies correct/incorrect styling to `listEl` based on the final `order`
  // and returns the fraction of items in their correct position.
  function checkOrder(listEl, items, order) {
    let correctCount = 0;
    order.forEach((origIdx, pos) => {
      const isCorrect = origIdx === pos;
      if (isCorrect) correctCount++;
      const el = listEl.querySelector(`.lns-order-item[data-pos="${pos}"]`);
      if (el) {
        el.classList.add(isCorrect ? 'lns-correct' : 'lns-incorrect');
        el.querySelectorAll('.lns-order-arrow').forEach(b => b.disabled = true);
        const handle = el.querySelector('.lns-order-handle');
        if (handle) handle.classList.add('lns-disabled');
      }
    });
    return correctCount / items.length;
  }

  // ══════════════════════════════════════════════════════════
  // TRUE/FALSE (Wahr/Falsch)
  // ══════════════════════════════════════════════════════════

  // Renders the statement list. `answers` is an array of bool|null, mutated
  // in place as the user picks Wahr/Falsch. `opts.onChange()` fires after
  // every selection.
  function renderTfList(listEl, statements, answers, opts) {
    opts = opts || {};
    listEl.innerHTML = statements.map((s, idx) => `
      <div class="lns-tf-item" data-idx="${idx}">
        <div class="text-sm leading-relaxed mb-2.5">${escHtml(s.text)}</div>
        <div class="grid grid-cols-2 gap-2">
          <button class="lns-tf-btn" data-val="true">Wahr</button>
          <button class="lns-tf-btn" data-val="false">Falsch</button>
        </div>
        <div class="lns-tf-explain hidden"></div>
      </div>`).join('');
    renderMathIn(listEl);

    listEl.querySelectorAll('.lns-tf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemEl = btn.closest('.lns-tf-item');
        const idx = parseInt(itemEl.dataset.idx, 10);
        answers[idx] = btn.dataset.val === 'true';
        updateTfButtons(listEl, answers);
        opts.onChange && opts.onChange();
      });
    });

    updateTfButtons(listEl, answers);
  }

  function updateTfButtons(listEl, answers) {
    listEl.querySelectorAll('.lns-tf-item').forEach(itemEl => {
      const idx = parseInt(itemEl.dataset.idx, 10);
      const val = answers[idx];
      itemEl.querySelectorAll('.lns-tf-btn').forEach(btn => {
        const btnVal = btn.dataset.val === 'true';
        btn.classList.toggle('lns-tf-active', val === btnVal);
      });
    });
  }

  // Applies correct/incorrect styling + shows explanations, returns the
  // fraction of statements answered correctly.
  function checkTrueFalse(listEl, statements, answers) {
    let correctCount = 0;
    statements.forEach((s, idx) => {
      const userVal = answers[idx];
      const isCorrect = userVal === s.isTrue;
      if (isCorrect) correctCount++;

      const el = listEl.querySelector(`.lns-tf-item[data-idx="${idx}"]`);
      if (!el) return;
      el.classList.add(isCorrect ? 'lns-correct' : 'lns-incorrect');
      el.querySelectorAll('.lns-tf-btn').forEach(btn => {
        btn.disabled = true;
        const btnVal = btn.dataset.val === 'true';
        if (btnVal === s.isTrue) btn.classList.add('lns-tf-correct');
        else if (btnVal === userVal) btn.classList.add('lns-tf-wrong');
        else btn.classList.add('lns-disabled');
      });
      const ex = el.querySelector('.lns-tf-explain');
      if (ex && s.explanation) {
        ex.textContent = s.explanation;
        ex.classList.remove('hidden');
        renderMathIn(ex);
      }
    });
    return correctCount / statements.length;
  }

  // ══════════════════════════════════════════════════════════
  // SINGLE / MULTIPLE CHOICE
  // ══════════════════════════════════════════════════════════

  // Renders the option list. `onClick(idx)` fires on every click — the
  // caller decides single- vs. multi-select behaviour and how to reflect
  // the selection (via updateSingleSelection / updateMultiSelection).
  function renderOptionsList(listEl, options, onClick) {
    listEl.innerHTML = options.map((opt, idx) => `
      <button class="lns-option" data-idx="${idx}">${escHtml(opt)}</button>`).join('');
    renderMathIn(listEl);

    listEl.querySelectorAll('.lns-option').forEach(btn => {
      btn.addEventListener('click', () => onClick(parseInt(btn.dataset.idx, 10)));
    });
  }

  function updateSingleSelection(listEl, selectedIdx) {
    listEl.querySelectorAll('.lns-option').forEach(btn => {
      btn.classList.toggle('lns-option-selected', parseInt(btn.dataset.idx, 10) === selectedIdx);
    });
  }

  function updateMultiSelection(listEl, selectedIndices) {
    const selectedSet = new Set(selectedIndices);
    listEl.querySelectorAll('.lns-option').forEach(btn => {
      const i = parseInt(btn.dataset.idx, 10);
      btn.classList.toggle('lns-option-selected', selectedSet.has(i));
    });
  }

  // Returns 1 if selectedIdx === correctIndex, else 0. Applies styling.
  function checkSingle(listEl, options, correctIndex, selectedIdx) {
    listEl.querySelectorAll('.lns-option').forEach(btn => {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      btn.classList.remove('lns-option-selected');
      if (i === correctIndex) btn.classList.add('lns-option-correct');
      else if (i === selectedIdx) btn.classList.add('lns-option-wrong');
      else btn.classList.add('lns-disabled');
    });
    return selectedIdx === correctIndex ? 1 : 0;
  }

  // Returns 1 if the selection exactly matches correctIndices, otherwise the
  // fraction of options classified correctly (selected/not-selected matches
  // should/should-not). Applies styling (correct / missed / wrong / disabled).
  function checkMultiple(listEl, options, correctIndices, selectedIndices) {
    const correctSet  = new Set(correctIndices);
    const selectedSet = new Set(selectedIndices);
    const isFullyCorrect = correctSet.size === selectedSet.size &&
      [...correctSet].every(i => selectedSet.has(i));

    listEl.querySelectorAll('.lns-option').forEach(btn => {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      btn.classList.remove('lns-option-selected');
      const should = correctSet.has(i);
      const was    = selectedSet.has(i);
      if (should && was)        btn.classList.add('lns-option-correct');
      else if (should && !was)  btn.classList.add('lns-option-missed');
      else if (!should && was)  btn.classList.add('lns-option-wrong');
      else                       btn.classList.add('lns-disabled');
    });

    let correctClassified = 0;
    options.forEach((_, i) => {
      if (correctSet.has(i) === selectedSet.has(i)) correctClassified++;
    });
    return isFullyCorrect ? 1 : correctClassified / options.length;
  }

  // ══════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════

  return {
    TYPE_LABELS,
    escHtml,
    unescHtml,
    renderContent,
    renderMathIn,
    verdict,
    feedbackBadge,
    shuffledIndices,
    renderOrderList,
    checkOrder,
    renderTfList,
    updateTfButtons,
    checkTrueFalse,
    renderOptionsList,
    updateSingleSelection,
    updateMultiSelection,
    checkSingle,
    checkMultiple,
  };
})();
