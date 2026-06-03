// ── Flashcards Screen — Reels Edition ─────────────────────────────────────

window.FlashcardsScreen = (function () {

  // ── State ──
  let allCards = [];
  let filteredCards = [];
  let currentIndex = 0;
  let isFlipped = false;
  let deckFilter = 'all';   // current course filter in deck selector
  let activeCourse = null;  // course of current deck
  let activeTopic  = null;  // topic of current deck
  let _skipInitReset = false; // set by startDeck so init() doesn't override external nav

  // Card load dedup
  let _loadPromise = null;

  // Drag state
  let dragStartX = 0;
  let dragStartY = 0;
  let isDragging = false;
  let dragDir = null;       // 'h' | 'v'
  let currentDeltaX = 0;
  let swipeInProgress = false;

  // Speech state
  let speechMode = false;
  let recognition = null;
  let speechSession = [];          // rolling [{card, userAnswer, verdict, feedback}]
  let currentSpeechCard = null;
  let currentSpeechTranscript = '';
  let _geminiMode  = false;   // true when Gemini Live session is active
  let _geminiText  = '';      // accumulates text response for verdict detection

  // VAD state (Gemini-style Voice Activity Detection)
  let _vadStream   = null;   // MediaStream from getUserMedia
  let _vadActx     = null;   // AudioContext for VAD
  let _vadAnalyser = null;   // AnalyserNode
  let _vadRafId    = null;   // rAF handle
  let _ttsPlaying  = false;  // true while TTS is active

  // AudioContext (lazy)
  let audioCtx = null;

  // ── Gemini Live system prompt ─────────────────────────────
  const GEMINI_SYSTEM_PROMPT = `Du bist ein präziser Lernassistent im Flashcard-Modus für HSG-Studenten.

Jede Karte erhältst du im Format: "KARTE: [Frage] || [Antwort]"

Ablauf:
1. Lies die FRAGE klar und prägnant auf Deutsch vor
2. Warte auf die gesprochene Antwort des Studenten
3. Beginne dein Feedback IMMER mit genau einem dieser Sätze (damit die App den Ausgang erkennt):
   - "Richtig!" — wenn die Antwort korrekt ist
   - "Teilweise richtig." — wenn die Antwort unvollständig ist
   - "Leider falsch." — wenn die Antwort nicht stimmt
4. Erkläre kurz (2-3 Sätze) und nenne die korrekte Antwort
5. Sag am Ende: "Nächste Karte?" — dann warte auf mein Ja oder "weiter"

Sei prägnant, direkt und motivierend. Antworte ausschließlich auf Deutsch.`;

  // ══════════════════════════════════════════════════════════
  // INIT & DECK SELECTOR
  // ══════════════════════════════════════════════════════════

  async function _ensureCardsLoaded() {
    if (window.FLASHCARD_DATA) return;
    if (!_loadPromise) {
      _loadPromise = _supabase.from('deck_cards').select('*')
        .then(({ data, error }) => {
          window.FLASHCARD_DATA = error ? [] : (data || []);
          _loadPromise = null;
        })
        .catch(() => { window.FLASHCARD_DATA = []; _loadPromise = null; });
    }
    return _loadPromise;
  }

  async function init() {
    setupDragHandlers();

    // When startDeck/filterCards is called before Router.showView (e.g. from courseHub),
    // skip resetting to deck selector so the swipe view is preserved.
    if (_skipInitReset) {
      _skipInitReset = false;
      if (!allCards.length && window.FLASHCARD_DATA?.length) allCards = window.FLASHCARD_DATA;
      return;
    }

    // Show deck selector immediately with loading placeholder
    document.getElementById('fc-swipe-view')?.classList.add('hidden');
    document.getElementById('fc-deck-selector')?.classList.remove('hidden');
    if (!window.FLASHCARD_DATA) {
      const container = document.getElementById('fc-deck-list');
      if (container) container.innerHTML =
        '<p class="text-center py-10 text-sm" style="color:var(--txt-3)">Karten werden geladen…</p>';
    }

    await _ensureCardsLoaded();
    allCards = window.FLASHCARD_DATA;
    updateAllCount();
    filteredCards = [...allCards];
    renderDeckList(deckFilter);
  }

  function updateAllCount() {
    const el = document.getElementById('fc-all-count');
    if (el) el.textContent = `${allCards.length} Karten · alle Kurse`;
  }

  function setDeckFilter(course) {
    deckFilter = course;
    document.querySelectorAll('.fc-df-btn').forEach(btn => {
      const isActive = btn.dataset.df === course;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-gray-700', !isActive);
      btn.classList.toggle('text-gray-300', !isActive);
    });
    renderDeckList(course);
  }

  function renderDeckList(course) {
    const container = document.getElementById('fc-deck-list');
    if (!container) return;

    // Gather unique topics for the selected course
    const cards = course === 'all' ? allCards : allCards.filter(c => c.course === course);

    // Group by course+topic
    const groups = {};
    cards.forEach(c => {
      const key = `${c.course}|||${c.topic || 'Allgemein'}`;
      if (!groups[key]) groups[key] = { course: c.course, topic: c.topic || 'Allgemein', cards: [] };
      groups[key].cards.push(c);
    });

    const sorted = Object.values(groups).sort((a, b) => {
      if (a.course !== b.course) return a.course.localeCompare(b.course);
      return a.topic.localeCompare(b.topic);
    });

    const courseColors = { Statistik: '#3b82f6', MakroII: '#10b981', ESF: '#f59e0b', OM: '#8b5cf6' };
    const courseEmoji  = { Statistik: '📊', MakroII: '📈', ESF: '🔬', OM: '⚙️' };

    container.innerHTML = sorted.map(g => {
      const totalCards = g.cards.length;
      const doneCards = g.cards.filter(c => {
        const p = AppState.getCardProgress(c.id);
        return p && p.reviews > 0;
      }).length;
      const pct = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;
      const color = courseColors[g.course] || '#6366f1';
      const emoji = courseEmoji[g.course] || '📚';

      const topicShort = g.topic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '');

      return `
        <button onclick="FlashcardsScreen.startDeck('${g.course}', '${g.topic.replace(/'/g, '\\\'')}')"
                class="tap-card w-full rounded-2xl p-4 text-left flex items-center gap-4"
                style="background:var(--card);border:1px solid var(--border)">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
               style="background:${color}22">${emoji}</div>
          <div class="flex-1 min-w-0">
            ${course === 'all' ? `<div class="text-xs font-medium mb-0.5" style="color:${color}">${g.course}</div>` : ''}
            <div class="font-semibold text-sm truncate" style="color:var(--txt)">${topicShort}</div>
            <div class="flex items-center gap-2 mt-1.5">
              <div class="flex-1 h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
              </div>
              <span class="text-xs flex-shrink-0" style="color:var(--txt-3)">${doneCards}/${totalCards}</span>
            </div>
          </div>
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
               style="color:var(--txt-3)"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>`;
    }).join('');
  }

  function startDeck(course, topic) {
    _skipInitReset = true;
    if (!allCards.length && window.FLASHCARD_DATA?.length) allCards = window.FLASHCARD_DATA;
    activeCourse = course === 'all' ? null : course;
    activeTopic  = topic || null;

    filteredCards = allCards
      .filter(c => !activeCourse || c.course === activeCourse)
      .filter(c => !activeTopic  || c.topic  === activeTopic);

    // Shuffle
    for (let i = filteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }

    currentIndex = 0;
    isFlipped = false;

    const titleEl = document.getElementById('fc-deck-title');
    if (titleEl) {
      titleEl.textContent = activeTopic
        ? activeTopic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '')
        : (activeCourse || 'Alle Karten');
    }

    document.getElementById('fc-deck-selector')?.classList.add('hidden');
    document.getElementById('fc-swipe-view')?.classList.remove('hidden');

    if (filteredCards.length) {
      document.getElementById('fc-no-cards')?.classList.add('hidden');
      showCard(0);
    } else {
      document.getElementById('fc-no-cards')?.classList.remove('hidden');
      document.getElementById('fc-stack-area')?.classList.add('hidden');
    }
  }

  function showDeckSelector() {
    if (speechMode) exitSpeechMode();
    document.getElementById('fc-swipe-view')?.classList.add('hidden');
    document.getElementById('fc-deck-selector')?.classList.remove('hidden');
    renderDeckList(deckFilter);
  }

  // ══════════════════════════════════════════════════════════
  // CARD DISPLAY
  // ══════════════════════════════════════════════════════════

  function showCard(index) {
    if (!filteredCards.length) return;
    currentIndex = ((index % filteredCards.length) + filteredCards.length) % filteredCards.length;
    const card = filteredCards[currentIndex];

    // Reset drag/position
    const wrap = document.getElementById('fc-card-wrap');
    if (wrap) { wrap.style.transition = ''; wrap.style.transform = ''; wrap.style.opacity = ''; }

    // Animate card entrance on the FRONT face only — never on fc-card-inner.
    // Applying fc-card-in (fill:both + transform) to fc-card-inner would lock
    // the transform property via animation precedence, permanently blocking the
    // rotateY flip. Animating only the front face avoids this conflict entirely.
    const front = document.getElementById('fc-card-front');
    if (front) {
      front.classList.remove('fc-card-in');
      void front.offsetWidth;
      front.classList.add('fc-card-in');
    }

    // Content
    const typeMap = { cloze: 'Lückentext', why: 'Warum / Wie?', qa: 'Frage' };
    _setTxt('fc-type-label', typeMap[card.type] || 'Frage');
    _setTxt('fc-chapter-label', card.topic || '');
    _setTxt('fc-chapter-label-back', card.topic || '');
    _setTxt('fc-topic-label', card.topic || '');

    _renderContent('fc-front-text', (card.front || '').replace(/\{\{[^}]+\}\}/g, '______'));
    _renderContent('fc-back-text', card.back || '');

    // Progress
    const pct = filteredCards.length > 1
      ? Math.round((currentIndex / (filteredCards.length - 1)) * 100) : 100;
    const pb = document.getElementById('fc-progress-bar');
    if (pb) pb.style.width = pct + '%';
    _setTxt('fc-counter', `${currentIndex + 1} / ${filteredCards.length}`);

    // Reset flip
    isFlipped = false;
    if (inner) inner.classList.remove('flipped');

    // Reset swipe stamps
    const yes = document.getElementById('fc-swipe-yes');
    const no  = document.getElementById('fc-swipe-no');
    if (yes) yes.style.opacity = 0;
    if (no)  no.style.opacity  = 0;
  }

  function flipCard() {
    if (!filteredCards.length) return;
    isFlipped = !isFlipped;
    const inner = document.getElementById('fc-card-inner');
    if (!inner) return;
    inner.classList.toggle('flipped', isFlipped);
    playSound('flip');
  }

  // ══════════════════════════════════════════════════════════
  // CONTENT RENDERING (KaTeX + Images)
  // ══════════════════════════════════════════════════════════

  function _renderContent(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!text) { el.innerHTML = ''; return; }

    const hasKatex = typeof katex !== 'undefined';
    const hasMath  = text.includes('$');
    const hasImg   = text.includes('![');

    if (!hasMath && !hasImg) {
      el.textContent = text;
      return;
    }

    // Build HTML safely: escape first, then render math, then images
    let html = _escHtml(text);

    if (hasMath && hasKatex) {
      // Display math $$...$$
      html = html.replace(/\$\$([^$]+?)\$\$/g, (_, math) => {
        try { return katex.renderToString(_unescHtml(math), { displayMode: true, throwOnError: false }); }
        catch (e) { return `<code>${math}</code>`; }
      });
      // Inline math $...$
      html = html.replace(/\$([^$\n]+?)\$/g, (_, math) => {
        try { return katex.renderToString(_unescHtml(math), { displayMode: false, throwOnError: false }); }
        catch (e) { return `<code>${math}</code>`; }
      });
    }

    if (hasImg) {
      // ![alt](url) → <img>
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
        (_, alt, url) => `<img src="${url}" alt="${alt}" class="max-w-full rounded-xl mt-2 mx-auto block" style="max-height:160px;object-fit:contain">`);
    }

    el.innerHTML = html;
  }

  function _escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function _unescHtml(t) {
    return t.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  }
  function _setTxt(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ══════════════════════════════════════════════════════════
  // DRAG / SWIPE
  // ══════════════════════════════════════════════════════════

  function setupDragHandlers() {
    const wrap = document.getElementById('fc-card-wrap');
    if (!wrap || wrap._fcBound) return;
    wrap._fcBound = true;
    wrap.addEventListener('pointerdown',  _onDragStart, { passive: true });
    wrap.addEventListener('pointermove',  _onDragMove,  { passive: false });
    wrap.addEventListener('pointerup',    _onDragEnd);
    wrap.addEventListener('pointercancel',_onDragEnd);
  }

  function _onDragStart(e) {
    if (swipeInProgress) return;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    isDragging = true;
    dragDir = null;
    currentDeltaX = 0;
    // Do NOT touch fc-card-inner's transition here — drag moves fc-card-wrap,
    // and setting transition:none on fc-card-inner would break the flip animation.
  }

  function _onDragMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (!dragDir) {
      if (Math.abs(dx) > 8) { dragDir = 'h'; }
      else if (Math.abs(dy) > 8) {
        dragDir = 'v';
        isDragging = false;
        return;
      } else return;
    }
    if (dragDir !== 'h') return;

    e.preventDefault();
    currentDeltaX = dx;

    const wrap = document.getElementById('fc-card-wrap');
    if (wrap) wrap.style.transform = `translateX(${dx}px) rotate(${dx * 0.07}deg)`;

    const THRESH = 50;
    const yes = document.getElementById('fc-swipe-yes');
    const no  = document.getElementById('fc-swipe-no');
    if (dx > THRESH) {
      if (yes) yes.style.opacity = Math.min((dx - THRESH) / 70, 1);
      if (no)  no.style.opacity  = 0;
    } else if (dx < -THRESH) {
      if (no)  no.style.opacity  = Math.min((-dx - THRESH) / 70, 1);
      if (yes) yes.style.opacity = 0;
    } else {
      if (yes) yes.style.opacity = 0;
      if (no)  no.style.opacity  = 0;
    }
  }

  function _onDragEnd(e) {
    const endX = e.clientX ?? dragStartX;
    const endY = e.clientY ?? dragStartY;

    // Tap detection comes FIRST — before the isDragging guard.
    // Reason: _onDragMove sets isDragging=false on vertical micro-jitter,
    // so a plain click would otherwise never reach flipCard().
    if (Math.abs(endX - dragStartX) < 12 && Math.abs(endY - dragStartY) < 12) {
      isDragging = false;
      dragDir = null;
      flipCard();
      return;
    }

    if (!isDragging) return;
    isDragging = false;

    const inner = document.getElementById('fc-card-inner');
    if (inner) inner.style.transition = '';

    const dx = currentDeltaX;
    if (dragDir !== 'h') return;

    if (dx > 80)  { _animateOut('right'); }
    else if (dx < -80) { _animateOut('left'); }
    else {
      const wrap = document.getElementById('fc-card-wrap');
      if (wrap) {
        wrap.style.transition = 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)';
        wrap.style.transform  = '';
        setTimeout(() => { if (wrap) wrap.style.transition = ''; }, 450);
      }
      const yes = document.getElementById('fc-swipe-yes');
      const no  = document.getElementById('fc-swipe-no');
      if (yes) yes.style.opacity = 0;
      if (no)  no.style.opacity  = 0;
    }
  }

  function _animateOut(direction, callback) {
    const wrap = document.getElementById('fc-card-wrap');
    if (!wrap) { callback?.(); return; }
    const tx  = direction === 'right' ? '140%' : '-140%';
    const rot = direction === 'right' ? '22deg' : '-22deg';

    const yes = document.getElementById('fc-swipe-yes');
    const no  = document.getElementById('fc-swipe-no');
    if (yes) yes.style.opacity = 0;
    if (no)  no.style.opacity  = 0;

    wrap.style.transition = 'transform 0.38s ease-in, opacity 0.32s ease';
    wrap.style.transform  = `translateX(${tx}) rotate(${rot})`;
    wrap.style.opacity    = '0';
    setTimeout(callback || (() => {}), 340);
  }

  function handleSwipe(direction) {
    if (!filteredCards.length || swipeInProgress) return;
    swipeInProgress = true;

    _animateOut(direction, () => {
      _commitSwipe(direction);
      setTimeout(() => { swipeInProgress = false; }, 80);
    });
  }

  function _commitSwipe(direction) {
    const card = filteredCards[currentIndex];
    if (!card) { swipeInProgress = false; return; }

    if (direction === 'right') {
      _saveRating(card, 'easy');
      playSound('success');
      const msgs = ['Perfekt! 🔥', 'Das sitzt! ⚡', 'Klasse! 🎯', 'Top! ✨'];
      showSuccessAnim(msgs[Math.floor(Math.random() * msgs.length)]);
    } else {
      _saveRating(card, 'hard');
      playSound('fail');
    }

    const nextIdx = (currentIndex + 1) % filteredCards.length;
    showCard(nextIdx);
    _flashBorder(direction === 'right' ? 'green' : 'red');
  }

  function _flashBorder(color) {
    const front = document.getElementById('fc-card-front');
    const back  = document.getElementById('fc-card-back');
    const cls   = color === 'green' ? 'fc-flash-green' : 'fc-flash-red';
    [front, back].forEach(el => {
      if (!el) return;
      el.classList.remove('fc-flash-green', 'fc-flash-red');
      void el.offsetWidth;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), 800);
    });
  }

  // ══════════════════════════════════════════════════════════
  // RATING / SM-2
  // ══════════════════════════════════════════════════════════

  function _saveRating(card, rating) {
    const prog = AppState.getCardProgress(card.id);
    if (rating === 'easy') {
      prog.interval = Math.round(prog.interval * prog.ease);
      prog.ease     = Math.min(prog.ease + 0.15, 3.0);
      Gamification.addXP(Gamification.XP.cardEasy);
    } else if (rating === 'medium') {
      prog.interval = Math.max(1, Math.round(prog.interval * 1.2));
      Gamification.addXP(Gamification.XP.cardMedium);
    } else {
      prog.interval = 1;
      prog.ease     = Math.max(prog.ease - 0.2, 1.3);
      Gamification.addXP(Gamification.XP.cardHard);
    }
    prog.nextReview = Date.now() + prog.interval * 24 * 60 * 60 * 1000;
    prog.reviews    = (prog.reviews || 0) + 1;
    AppState.setCardProgress(card.id, prog);
    return prog;
  }

  // Legacy compatibility (keyboard shortcuts, etc.)
  function rateCard(rating) {
    if (!filteredCards.length) return;
    const direction = rating === 'easy' ? 'right' : 'left';
    handleSwipe(direction);
  }

  function nextCard() { if (filteredCards.length) handleSwipe('right'); }
  function prevCard() { if (filteredCards.length) showCard(currentIndex - 1); }

  // ══════════════════════════════════════════════════════════
  // SOUNDS
  // ══════════════════════════════════════════════════════════

  function _audioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function _tone(ctx, freq, delay, dur, type = 'sine', vol = 0.18) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur + 0.05);
  }

  function playSound(type) {
    try {
      const ctx = _audioCtx();
      if (type === 'success') {
        // Ascending C-E-G arpeggio
        _tone(ctx, 523.25, 0,    0.13);
        _tone(ctx, 659.25, 0.10, 0.13);
        _tone(ctx, 783.99, 0.20, 0.18);
      } else if (type === 'fail') {
        _tone(ctx, 200, 0,    0.18, 'triangle', 0.14);
        _tone(ctx, 155, 0.14, 0.22, 'triangle', 0.10);
      } else if (type === 'flip') {
        _tone(ctx, 900, 0, 0.055, 'sine', 0.08);
      }
    } catch (e) { /* AudioContext blocked – silent fail */ }
  }

  // ══════════════════════════════════════════════════════════
  // SUCCESS ANIMATION
  // ══════════════════════════════════════════════════════════

  function showSuccessAnim(text) {
    const overlay = document.getElementById('fc-success-overlay');
    const inner   = document.getElementById('fc-success-inner');
    const emoji   = document.getElementById('fc-success-emoji');
    const textEl  = document.getElementById('fc-success-text');
    if (!overlay) return;

    const emojis = ['⚡', '🔥', '✨', '💡', '🎯', '🏆'];
    if (emoji)  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    if (textEl) textEl.textContent = text;

    // Reset animation
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

  // ══════════════════════════════════════════════════════════
  // SPEECH MODE
  // ══════════════════════════════════════════════════════════

  function toggleSpeechMode() {
    speechMode ? exitSpeechMode() : enterSpeechMode();
  }

  async function enterSpeechMode() {
    if (!filteredCards.length) return;
    speechMode    = true;
    _geminiMode   = false;
    speechSession = [];
    currentSpeechCard    = filteredCards[currentIndex];
    currentSpeechTranscript = '';

    document.getElementById('fc-speech-panel')?.classList.remove('hidden');
    const btn = document.getElementById('fc-speech-btn');
    if (btn) btn.style.background = '#4f46e5';

    _updateSpeechPanel();

    if (GeminiLive.isAvailable()) {
      await _enterGeminiMode();
    } else {
      await _enterBrowserSpeechMode();
    }
  }

  async function _enterBrowserSpeechMode() {
    const micOk = await _ensureMic();
    const micBtn = document.getElementById('fc-speech-mic-btn');
    if (micBtn && micOk) micBtn.classList.add('hidden');
    _speakTextVAD(currentSpeechCard.front);
  }

  async function _enterGeminiMode() {
    speechMode   = true;
    _geminiMode  = true;
    speechSession = [];
    currentSpeechCard = filteredCards[currentIndex];

    document.getElementById('fc-speech-panel')?.classList.remove('hidden');
    const btn = document.getElementById('fc-speech-btn');
    if (btn) btn.style.background = '#4285f4'; // Google blue for Gemini mode

    _updateSpeechPanel();
    const micBtn = document.getElementById('fc-speech-mic-btn');
    if (micBtn) micBtn.classList.add('hidden');

    _setStatus('speaking');
    _setTxt('fc-speech-status-text', '🔵 Verbinde mit Gemini Live…');

    try {
      await GeminiLive.connect(GEMINI_SYSTEM_PROMPT, {
        onReady: () => {
          // Start mic streaming immediately (Gemini's server-side VAD handles detection)
          GeminiLive.startMic().catch(e => console.warn('Mic error:', e));
          // Also start local VAD for instant interruption
          _startInterruptVAD();
          // Send first card
          _geminiSendCard();
        },
        onAudioStart: () => {
          _ttsPlaying = true;
          _setStatus('speaking');
        },
        onAudioDone: () => {
          _ttsPlaying = false;
          _setStatus('listening');
          _setTxt('fc-speech-status-text', '🎙 Sprich jetzt — ich höre zu');
        },
        onText: (text) => {
          _geminiText += text;
          _geminiParseVerdictFromText(_geminiText);
          // Auto-advance when Gemini signals next card
          if (_geminiText.toLowerCase().includes('nächste karte') ||
              _geminiText.toLowerCase().includes('nächste frage')) {
            // small delay then advance
            setTimeout(() => { if (_geminiMode && speechMode) _geminiNextCard(); }, 800);
          }
        },
        onTurnComplete: () => {
          _ttsPlaying = false;
          _geminiText = '';
        },
        onInterrupted: () => {
          _ttsPlaying = false;
          _setStatus('listening');
        },
        onError: (msg) => {
          _setTxt('fc-speech-status-text', `❌ ${msg} — falle auf Browser-Modus zurück`);
          _geminiMode = false;
          GeminiLive.disconnect();
          // Fall back to browser speech mode
          setTimeout(() => { if (speechMode) _enterBrowserSpeechMode(); }, 1500);
        }
      });
    } catch(e) {
      _geminiMode = false;
      _setTxt('fc-speech-status-text', `❌ Gemini nicht verfügbar — falle auf Browser-Modus zurück`);
      setTimeout(() => { if (speechMode) _enterBrowserSpeechMode(); }, 1500);
    }
  }

  function _geminiSendCard() {
    if (!currentSpeechCard || !speechMode) return;
    _geminiText = '';
    _updateSpeechPanel();
    GeminiLive.sendText(`KARTE: ${currentSpeechCard.front} || ${currentSpeechCard.back}`);
  }

  function _geminiNextCard() {
    if (!filteredCards.length || !speechMode) return;
    // Rate card based on accumulated verdict
    const last = speechSession[speechSession.length - 1];
    if (last && last.card === currentSpeechCard?.id) {
      const rMap = { richtig: 'easy', teilweise: 'medium', falsch: 'hard' };
      _saveRating(currentSpeechCard, rMap[last.verdict] || 'medium');
    }
    currentIndex = (currentIndex + 1) % filteredCards.length;
    currentSpeechCard = filteredCards[currentIndex];
    showCard(currentIndex);
    _geminiText = '';
    document.getElementById('fc-speech-transcript-wrap')?.classList.add('hidden');
    document.getElementById('fc-speech-feedback-wrap')?.classList.add('hidden');
    document.getElementById('fc-speech-post-actions')?.classList.add('hidden');
    _geminiSendCard();
  }

  function _geminiParseVerdictFromText(text) {
    const lower = text.toLowerCase();
    let verdict = null;
    if (lower.includes('richtig!') || lower.startsWith('richtig')) verdict = 'richtig';
    else if (lower.includes('teilweise richtig')) verdict = 'teilweise';
    else if (lower.includes('leider falsch') || lower.includes('falsch')) verdict = 'falsch';

    if (verdict) {
      const styles = {
        richtig:   { bg: 'rgba(34,197,94,0.08)', border: '#22c55e', badgeCls: 'bg-green-900 text-green-300', label: '✓ Richtig!' },
        teilweise: { bg: 'rgba(234,179,8,0.08)',  border: '#eab308', badgeCls: 'bg-yellow-900 text-yellow-300', label: '~ Nicht ganz' },
        falsch:    { bg: 'rgba(239,68,68,0.08)',   border: '#ef4444', badgeCls: 'bg-red-900 text-red-300', label: '✗ Leider nicht' },
      };
      const s = styles[verdict];
      const fw = document.getElementById('fc-speech-feedback-wrap');
      if (fw) { fw.classList.remove('hidden'); fw.style.background = s.bg; fw.style.borderColor = s.border; }
      const badge = document.getElementById('fc-speech-verdict-badge');
      if (badge) { badge.textContent = s.label; badge.className = `inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${s.badgeCls}`; }
      _setTxt('fc-speech-feedback-text', text);

      speechSession.push({ card: currentSpeechCard?.id, verdict, feedback: text });
      if (speechSession.length > 3) speechSession.shift();

      document.getElementById('fc-speech-post-actions')?.classList.remove('hidden');

      if (verdict === 'richtig') { playSound('success'); showSuccessAnim('Richtig! 🎯'); }
      else if (verdict === 'falsch') playSound('fail');
    }
  }

  function exitSpeechMode() {
    speechMode  = false;
    _geminiMode = false;
    _ttsPlaying = false;
    _stopInterruptVAD();
    if (recognition) { try { recognition.abort(); } catch(e) {} recognition = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
    GeminiLive.disconnect();
    document.getElementById('fc-speech-panel')?.classList.add('hidden');
    const btn = document.getElementById('fc-speech-btn');
    if (btn) btn.style.background = '';
  }

  function _updateSpeechPanel() {
    if (!currentSpeechCard) return;
    _renderContent('fc-speech-question',
      currentSpeechCard.front.replace(/\{\{[^}]+\}\}/g, '______'));
    _setTxt('fc-speech-counter', `${currentIndex + 1} / ${filteredCards.length}`);

    const micBtn = document.getElementById('fc-speech-mic-btn');
    if (_vadStream) {
      // VAD mode: hide manual button, status will be updated when speech starts
      if (micBtn) micBtn.classList.add('hidden');
      _setStatus('speaking');
    } else {
      if (micBtn) { micBtn.classList.remove('hidden'); micBtn.disabled = false; }
      _setStatus('idle');
    }

    document.getElementById('fc-speech-transcript-wrap')?.classList.add('hidden');
    document.getElementById('fc-speech-feedback-wrap')?.classList.add('hidden');
    document.getElementById('fc-speech-post-actions')?.classList.add('hidden');
  }

  function _setStatus(state) {
    const orb  = document.getElementById('fc-speech-orb');
    const text = document.getElementById('fc-speech-status-text');
    const map  = {
      idle:      { bg: '#334155', text: _vadStream ? '🎙 Sprich jetzt — ich höre zu' : 'Tippe das Mikrofon zum Antworten', pulse: false },
      speaking:  { bg: '#3b82f6', text: '🔊 Karte wird vorgelesen...', pulse: false },
      listening: { bg: '#ef4444', text: '🎤 Ich höre zu — sprich jetzt!', pulse: true },
      thinking:  { bg: '#f59e0b', text: '🤔 Bewerte deine Antwort...', pulse: false },
    };
    const s = map[state] || map.idle;
    if (orb)  { orb.style.background = s.bg; orb.classList.toggle('fc-orb-listening', s.pulse); }
    if (text) text.textContent = s.text;
  }

  // Returns a promise that resolves to the loaded voice list.
  // Necessary because getVoices() often returns [] on first call until voiceschanged fires.
  function _getVoices() {
    return new Promise(resolve => {
      const v = speechSynthesis.getVoices();
      if (v.length) { resolve(v); return; }
      const onReady = () => resolve(speechSynthesis.getVoices());
      speechSynthesis.addEventListener('voiceschanged', onReady, { once: true });
      setTimeout(() => { speechSynthesis.removeEventListener('voiceschanged', onReady); resolve(speechSynthesis.getVoices()); }, 1500);
    });
  }

  async function _speakText(text) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    _setStatus('speaking');

    const clean = text
      .replace(/\$\$?[^$]+?\$\$?/g, 'Formel')
      .replace(/\{\{[^}]+\}\}/g, 'Lücke')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, 'Abbildung');

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang  = 'de-DE';
    utter.rate  = 0.9;
    utter.pitch = 1.0;

    // Wait for voice list, then pick best German voice:
    // priority: Google online DE > any online DE > any local DE
    const voices  = await _getVoices();
    const deVoices = voices.filter(v => v.lang.startsWith('de'));
    utter.voice = deVoices.find(v => v.name.toLowerCase().includes('google'))
               || deVoices.find(v => !v.localService)
               || deVoices[0]
               || null;

    utter.onend   = () => _setStatus('idle');
    utter.onerror = (ev) => { if (ev.error !== 'interrupted') _setStatus('idle'); };
    speechSynthesis.speak(utter);
  }

  function rereadQuestion() {
    if (currentSpeechCard) _speakTextVAD(currentSpeechCard.front);
  }

  // ── VAD: Gemini-style Voice Activity Detection ──────────

  async function _ensureMic() {
    if (_vadStream) return true;
    try {
      _vadStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      _vadActx    = new (window.AudioContext || window.webkitAudioContext)();
      const src   = _vadActx.createMediaStreamSource(_vadStream);
      _vadAnalyser = _vadActx.createAnalyser();
      _vadAnalyser.fftSize = 256;
      _vadAnalyser.smoothingTimeConstant = 0.4;
      src.connect(_vadAnalyser);
      return true;
    } catch (e) {
      _setTxt('fc-speech-status-text', 'Mikrofon nicht verfügbar — Zugriff erlauben und nochmal versuchen.');
      return false;
    }
  }

  function _getMicLevel() {
    if (!_vadAnalyser) return 0;
    const data = new Uint8Array(_vadAnalyser.frequencyBinCount);
    _vadAnalyser.getByteFrequencyData(data);
    return data.reduce((a, b) => a + b, 0) / data.length;
  }

  function _startInterruptVAD() {
    _stopInterruptVAD();
    const THRESH = 22;

    function loop() {
      if (!speechMode || !_ttsPlaying) return;
      const lvl = _getMicLevel();

      // Update orb size for visual feedback
      const orb = document.getElementById('fc-speech-orb');
      if (orb) orb.style.transform = `scale(${(1 + Math.min(lvl / 40, 0.6)).toFixed(2)})`;

      if (lvl > THRESH) {
        // User is speaking → interrupt TTS
        speechSynthesis.cancel();
        GeminiLive.stopPlayback();  // also stop Gemini audio
        _ttsPlaying = false;
        _stopInterruptVAD();
        _setStatus('listening');
        if (!_geminiMode) setTimeout(() => { if (speechMode) _autoStartRecognition(); }, 120);
        return;
      }
      _vadRafId = requestAnimationFrame(loop);
    }
    _vadRafId = requestAnimationFrame(loop);
  }

  function _stopInterruptVAD() {
    if (_vadRafId) { cancelAnimationFrame(_vadRafId); _vadRafId = null; }
    const orb = document.getElementById('fc-speech-orb');
    if (orb) orb.style.transform = '';
  }

  function _autoStartRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec || !speechMode) return;
    if (recognition) { try { recognition.stop(); } catch (_) {} }

    recognition = new SpeechRec();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    _setStatus('listening');

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      currentSpeechTranscript = transcript;
      document.getElementById('fc-speech-transcript-wrap')?.classList.remove('hidden');
      _setTxt('fc-speech-transcript', `"${transcript}"`);
      _evaluateAnswer(transcript, null);
    };

    recognition.onerror = (e) => {
      if ((e.error === 'no-speech' || e.error === 'aborted') && speechMode) {
        setTimeout(() => { if (speechMode) _autoStartRecognition(); }, 400);
      } else if (e.error !== 'aborted') {
        _setStatus('idle');
      }
    };

    recognition.onend = () => {};

    try { recognition.start(); } catch (_) { _setStatus('idle'); }
  }

  async function _speakTextVAD(text) {
    if (!window.speechSynthesis) return;
    _ttsPlaying = true;
    _setStatus('speaking');

    const clean = text
      .replace(/\$\$?[^$]+?\$\$?/g, 'Formel')
      .replace(/\{\{[^}]+\}\}/g, 'Lücke')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, 'Abbildung');

    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang  = 'de-DE';
    utter.rate  = 0.9;
    utter.pitch = 1.0;

    const voices   = await _getVoices();
    const deVoices = voices.filter(v => v.lang.startsWith('de'));
    utter.voice    = deVoices.find(v => v.name.toLowerCase().includes('google'))
                  || deVoices.find(v => !v.localService)
                  || deVoices[0] || null;

    utter.onstart = () => {
      if (_vadAnalyser) _startInterruptVAD();
    };

    utter.onend = () => {
      _ttsPlaying = false;
      _stopInterruptVAD();
      if (speechMode) {
        _setStatus('listening');
        setTimeout(() => { if (speechMode) _autoStartRecognition(); }, 150);
      }
    };

    utter.onerror = (ev) => {
      _ttsPlaying = false;
      _stopInterruptVAD();
      if (speechMode && ev.error === 'interrupted') {
        // Was interrupted by VAD — recognition already started in _startInterruptVAD
      } else if (ev.error !== 'interrupted') {
        _setStatus('idle');
      }
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }

  function startListening() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition nicht verfügbar. Bitte Chrome oder Edge verwenden.');
      return;
    }

    // Stop any ongoing TTS first — browsers can't do TTS and STT simultaneously,
    // which causes recognition to immediately abort.
    if (window.speechSynthesis?.speaking) {
      speechSynthesis.cancel();
    }
    if (recognition) { try { recognition.stop(); } catch (_) {} recognition = null; }

    const micBtn = document.getElementById('fc-speech-mic-btn');
    if (micBtn) micBtn.disabled = true;
    _setStatus('listening');

    // Small delay lets the audio subsystem release the output device before
    // opening the mic — prevents the "aborted" error on some Chrome versions.
    setTimeout(() => {
      recognition = new SpeechRec();
      recognition.lang = 'de-DE';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        currentSpeechTranscript = transcript;
        document.getElementById('fc-speech-transcript-wrap')?.classList.remove('hidden');
        _setTxt('fc-speech-transcript', `"${transcript}"`);
        _evaluateAnswer(transcript, null);
      };

      recognition.onerror = (e) => {
        _setStatus('idle');
        if (micBtn) micBtn.disabled = false;
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          _setTxt('fc-speech-status-text', `Fehler: ${e.error}. Nochmal versuchen.`);
        }
      };

      recognition.onend = () => {
        if (micBtn) micBtn.disabled = false;
      };

      try { recognition.start(); } catch (err) {
        _setStatus('idle');
        if (micBtn) micBtn.disabled = false;
      }
    }, 150);
  }

  async function _evaluateAnswer(userAnswer, previousFeedback) {
    if (!currentSpeechCard) return;
    _setStatus('thinking');
    const micBtn = document.getElementById('fc-speech-mic-btn');
    if (micBtn) micBtn.classList.add('hidden');

    const system = `Du bist ein präziser HSG-Lernassistent. Bewerte die Antwort des Studenten kurz und prägnant.
Antworte NUR in diesem JSON-Format (kein weiterer Text):
{"verdict":"richtig"|"teilweise"|"falsch","feedback":"2-3 Sätze direkte Erklärung","mixup":"Verwechslung falls vorhanden sonst null","correct_answer_summary":"1-2 Sätze zur richtigen Antwort"}`;

    const messages = [
      {
        role: 'user',
        content: `Frage: ${currentSpeechCard.front}\nRichtige Antwort: ${currentSpeechCard.back}\nAntwort des Studenten: "${userAnswer}"`
      }
    ];

    // Rolling context for "explain again"
    if (previousFeedback) {
      messages.push({ role: 'assistant', content: previousFeedback });
      messages.push({ role: 'user', content: 'Erkläre das nochmals ausführlicher mit einem konkreten Beispiel.' });
    }

    try {
      const res  = await AIService.ask(messages, { system, max_tokens: 420 });
      const text = AIService.extractText(res);

      let parsed;
      try {
        const m = text.match(/\{[\s\S]+?\}/);
        parsed = JSON.parse(m ? m[0] : text);
      } catch (e) {
        parsed = { verdict: 'teilweise', feedback: text, mixup: null, correct_answer_summary: currentSpeechCard.back };
      }

      speechSession.push({ card: currentSpeechCard.id, userAnswer, verdict: parsed.verdict, feedback: parsed.feedback });
      if (speechSession.length > 3) speechSession.shift();

      _showSpeechFeedback(parsed);

    } catch (err) {
      _setTxt('fc-speech-status-text', `KI-Fehler: ${err.message || 'Nicht verfügbar'}`);
      _setStatus('idle');
      if (micBtn) { micBtn.classList.remove('hidden'); micBtn.disabled = false; }
    }
  }

  function _showSpeechFeedback(parsed) {
    const styles = {
      richtig:   { bg: 'rgba(34,197,94,0.08)',  border: '#22c55e', badgeCls: 'bg-green-900 text-green-300', label: '✓ Richtig!' },
      teilweise: { bg: 'rgba(234,179,8,0.08)',  border: '#eab308', badgeCls: 'bg-yellow-900 text-yellow-300', label: '~ Nicht ganz' },
      falsch:    { bg: 'rgba(239,68,68,0.08)',  border: '#ef4444', badgeCls: 'bg-red-900 text-red-300', label: '✗ Leider nicht' },
    };
    const s = styles[parsed.verdict] || styles.teilweise;

    const fw = document.getElementById('fc-speech-feedback-wrap');
    if (fw) { fw.classList.remove('hidden'); fw.style.background = s.bg; fw.style.borderColor = s.border; }

    const badge = document.getElementById('fc-speech-verdict-badge');
    if (badge) { badge.textContent = s.label; badge.className = `inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${s.badgeCls}`; }

    let feedbackText = parsed.feedback || '';
    if (parsed.mixup) feedbackText += `\n\n⚠️ Typische Verwechslung: ${parsed.mixup}`;
    _setTxt('fc-speech-feedback-text', feedbackText);
    _setTxt('fc-speech-answer-text', parsed.correct_answer_summary || currentSpeechCard.back);

    document.getElementById('fc-speech-post-actions')?.classList.remove('hidden');
    _setStatus('idle');

    if (parsed.verdict === 'richtig') {
      playSound('success');
      showSuccessAnim('Richtig! 🎯');
    } else if (parsed.verdict === 'falsch') {
      playSound('fail');
    }
  }

  function speechExplainAgain() {
    const last = speechSession[speechSession.length - 1];
    const prevFeedback = last ? last.feedback : null;

    document.getElementById('fc-speech-feedback-wrap')?.classList.add('hidden');
    document.getElementById('fc-speech-post-actions')?.classList.add('hidden');

    _evaluateAnswer(currentSpeechTranscript, prevFeedback);
  }

  function speechNextCard() {
    if (_geminiMode) { _geminiNextCard(); return; }
    // Browser fallback path (unchanged)
    if (!filteredCards.length) return;
    const last = speechSession[speechSession.length - 1];
    if (last && last.card === currentSpeechCard?.id) {
      const rMap = { richtig: 'easy', teilweise: 'medium', falsch: 'hard' };
      _saveRating(currentSpeechCard, rMap[last.verdict] || 'medium');
    }
    currentIndex = (currentIndex + 1) % filteredCards.length;
    currentSpeechCard = filteredCards[currentIndex];
    currentSpeechTranscript = '';
    _updateSpeechPanel();
    showCard(currentIndex);
    _speakTextVAD(currentSpeechCard.front);
  }

  // ══════════════════════════════════════════════════════════
  // DEEP LINK COMPAT (called from other screens)
  // ══════════════════════════════════════════════════════════

  function filterCards(course, topic) {
    startDeck(course || 'all', topic || null);
  }

  function openCardDirect(id) {
    const cardIdx = allCards.findIndex(c => c.id === id);
    if (cardIdx < 0) { Router.showView('flashcards'); return; }
    filteredCards = [...allCards];
    activeCourse = null; activeTopic = null;
    _skipInitReset = true;
    Router.showView('flashcards');
    document.getElementById('fc-deck-selector')?.classList.add('hidden');
    document.getElementById('fc-swipe-view')?.classList.remove('hidden');
    _setTxt('fc-deck-title', 'Alle Karten');
    showCard(cardIdx);
  }

  function openForTopic(course, topic) {
    Router.showView('flashcards');
    startDeck(course, topic);
  }

  // ══════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════

  return {
    init,
    // Deck selector
    setDeckFilter,
    startDeck,
    showDeckSelector,
    // Swipe
    handleSwipe,
    flipCard,
    nextCard,
    prevCard,
    rateCard,
    // Speech
    toggleSpeechMode,
    exitSpeechMode,
    startListening,
    rereadQuestion,
    speechExplainAgain,
    speechNextCard,
    // Compat
    filterCards,
    openCardDirect,
    openForTopic,
    showCard,
  };
})();
