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

  // Session
  let _sessionKey   = null;   // `${course}::${topic}` for cross-device sync
  let _pendingResume = null;  // { savedSet, savedIndex, freshSet } while resume prompt is shown
  let _sessionDone   = false; // true once the current set has been fully swiped

  // Two-slot state
  let _currSlot = 'a';   // 'a' or 'b' — which DOM slot is currently on top

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

    const [, enrolledKeys] = await Promise.all([
      _ensureCardsLoaded(),
      CoursesDB.getEnrolledKeys(),
    ]);

    // Only show cards from enrolled courses
    const enrolled = enrolledKeys.length > 0 ? enrolledKeys : null;
    allCards = enrolled
      ? (window.FLASHCARD_DATA || []).filter(c => enrolled.includes(c.course))
      : (window.FLASHCARD_DATA || []);

    _renderFilterButtons(enrolled || []);
    updateAllCount();
    filteredCards = [...allCards];
    renderDeckList(deckFilter);
  }

  function _renderFilterButtons(enrolledKeys) {
    const bar = document.getElementById('fc-filter-bar');
    if (!bar) return;
    const catalog = window.COURSES_CONFIG || [];

    const courseButtons = enrolledKeys.map(key => {
      const c = catalog.find(x => x.key === key);
      if (!c) return '';
      return `<button data-df="${key}" onclick="FlashcardsScreen.setDeckFilter('${key}')"
        class="fc-df-btn flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-gray-700 text-gray-300">
        ${c.icon} ${c.label}</button>`;
    }).join('');

    bar.innerHTML = `
      <button data-df="all" onclick="FlashcardsScreen.setDeckFilter('all')"
        class="fc-df-btn flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white">Alle</button>
      ${courseButtons}`;
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

    const catalog = window.COURSES_CONFIG || [];
    const courseColors = Object.fromEntries(catalog.map(c => [c.key, c.hex]));
    const courseEmoji  = Object.fromEntries(catalog.map(c => [c.key, c.icon]));

    const now = Date.now();
    container.innerHTML = sorted.map(g => {
      const totalCards = g.cards.length;
      const doneCards  = g.cards.filter(c => (AppState.getCardProgress(c.id).reviews || 0) > 0).length;
      const dueCards   = g.cards.filter(c => {
        const p = AppState.getCardProgress(c.id);
        return !p.nextReview || p.nextReview <= now;
      }).length;
      const pct   = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;
      const color = courseColors[g.course] || '#6366f1';
      const emoji = courseEmoji[g.course] || '📚';
      const topicShort = g.topic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '');
      const dueBadge = dueCards > 0
        ? `<span class="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style="background:rgba(251,146,60,0.18);color:#fb923c">${dueCards} fällig</span>`
        : '';

      return `
        <button onclick="FlashcardsScreen.startDeck('${g.course}', '${g.topic.replace(/'/g, '\\\'')}')"
                class="tap-card w-full rounded-2xl p-4 text-left flex items-center gap-4"
                style="background:var(--card);border:1px solid var(--border)">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
               style="background:${color}22">${emoji}</div>
          <div class="flex-1 min-w-0">
            ${course === 'all' ? `<div class="text-xs font-medium mb-0.5" style="color:${color}">${g.course}</div>` : ''}
            <div class="flex items-center gap-2 mb-1">
              <div class="font-semibold text-sm truncate" style="color:var(--txt)">${topicShort}</div>
              ${dueBadge}
            </div>
            <div class="flex items-center gap-2">
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

  async function startDeck(course, topic) {
    _skipInitReset = true;
    if (!allCards.length && window.FLASHCARD_DATA?.length) allCards = window.FLASHCARD_DATA;
    activeCourse = course === 'all' ? null : course;
    activeTopic  = topic || null;
    _sessionKey  = `${activeCourse || 'all'}::${activeTopic || '_all'}`;

    filteredCards = allCards
      .filter(c => !activeCourse || c.course === activeCourse)
      .filter(c => !activeTopic  || c.topic  === activeTopic);

    // SM-2: due cards first (sorted by ease asc = hardest first), then new, then future
    const now = Date.now();
    filteredCards.sort((a, b) => {
      const pa = AppState.getCardProgress(a.id);
      const pb = AppState.getCardProgress(b.id);
      const aDue = !pa.nextReview || pa.nextReview <= now;
      const bDue = !pb.nextReview || pb.nextReview <= now;
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      if (aDue && bDue) return (pa.ease ?? 2.5) - (pb.ease ?? 2.5);
      return (pa.nextReview || 0) - (pb.nextReview || 0);
    });

    // Dynamic session size: full set if ≤30, else ~15-16 chunks
    const freshSet = filteredCards.slice(0, SessionSync.sessionSize(filteredCards.length));

    // Reset slot state
    _currSlot = 'a';
    _sessionDone = false;

    // Hide overlays
    document.getElementById('fc-session-done')?.classList.add('hidden');
    document.getElementById('fc-resume-prompt')?.classList.add('hidden');

    const titleEl = document.getElementById('fc-deck-title');
    if (titleEl) {
      titleEl.textContent = activeTopic
        ? activeTopic.replace(/^M\d+ — /, '').replace(/^Modul \d+: /, '')
        : (activeCourse || 'Alle Karten');
    }

    document.getElementById('fc-deck-selector')?.classList.add('hidden');
    document.getElementById('fc-swipe-view')?.classList.remove('hidden');

    if (!freshSet.length) {
      document.getElementById('fc-no-cards')?.classList.remove('hidden');
      document.getElementById('fc-stack-area')?.classList.add('hidden');
      filteredCards = freshSet;
      return;
    }
    document.getElementById('fc-no-cards')?.classList.add('hidden');
    document.getElementById('fc-stack-area')?.classList.remove('hidden');

    // Check for a saved set from another device
    const saved = await SessionSync.load('flashcards', _sessionKey);
    let savedSet = null;
    if (saved && Array.isArray(saved.item_ids) && saved.current_index < saved.item_ids.length) {
      const mapped = saved.item_ids.map(id => allCards.find(c => c.id === id)).filter(Boolean);
      if (mapped.length === saved.item_ids.length) savedSet = mapped;
    }

    if (savedSet) {
      _pendingResume = { savedSet, savedIndex: saved.current_index, freshSet };
      const prompt = document.getElementById('fc-resume-prompt');
      if (prompt) {
        prompt.innerHTML = SessionSync.resumePromptHtml({
          position: saved.current_index + 1,
          total: savedSet.length,
          resumeOnClick: 'FlashcardsScreen._resumeSaved()',
          restartOnClick: 'FlashcardsScreen._restartSaved()',
          closeOnClick: 'FlashcardsScreen._closeResumePrompt()',
        });
        prompt.classList.remove('hidden');
      }
      return;
    }

    if (saved) SessionSync.clear('flashcards', _sessionKey);
    _startSet(freshSet, 0);
  }

  function _startSet(set, index) {
    filteredCards = set;
    currentIndex = 0;
    isFlipped = false;
    showCard(index);
    SessionSync.save('flashcards', _sessionKey, { itemIds: filteredCards.map(c => c.id), currentIndex: index });
  }

  function _resumeSaved() {
    document.getElementById('fc-resume-prompt')?.classList.add('hidden');
    const { savedSet, savedIndex } = _pendingResume;
    _pendingResume = null;
    _startSet(savedSet, savedIndex);
  }

  function _restartSaved() {
    document.getElementById('fc-resume-prompt')?.classList.add('hidden');
    SessionSync.clear('flashcards', _sessionKey);
    const { freshSet } = _pendingResume;
    _pendingResume = null;
    _startSet(freshSet, 0);
  }

  // Verlässt den Resume-Prompt ohne den gespeicherten Fortschritt zu verändern
  function _closeResumePrompt() {
    _pendingResume = null;
    document.getElementById('fc-resume-prompt')?.classList.add('hidden');
  }

  function showDeckSelector() {
    if (speechMode) exitSpeechMode();
    if (!_sessionDone && filteredCards.length && currentIndex < filteredCards.length) {
      SessionSync.save('flashcards', _sessionKey, { itemIds: filteredCards.map(c => c.id), currentIndex });
    }
    document.getElementById('fc-swipe-view')?.classList.add('hidden');
    document.getElementById('fc-deck-selector')?.classList.remove('hidden');
    renderDeckList(deckFilter);
  }

  // ══════════════════════════════════════════════════════════
  // CARD DISPLAY — Two-slot system
  // ══════════════════════════════════════════════════════════

  // Slot accessors
  function _currEl()  { return document.getElementById('fc-slot-' + _currSlot); }
  function _nextEl()  { return document.getElementById('fc-slot-' + (_currSlot === 'a' ? 'b' : 'a')); }

  // Replaces cloze {{...}} markers with a KaTeX-safe blank.
  // Inside $...$ / $$...$$: use \underline{\quad} (renders as blank line in math).
  // Outside math: use ______ (plain text).
  function _clozeFront(text) {
    let out = '', i = 0, inMath = false, inDisplay = false;
    while (i < text.length) {
      if (text[i] === '{' && text[i + 1] === '{') {
        const end = text.indexOf('}}', i + 2);
        if (end !== -1) {
          out += (inMath || inDisplay) ? '\\underline{\\quad}' : '______';
          i = end + 2;
          continue;
        }
      }
      if (text[i] === '$') {
        if (text[i + 1] === '$') { inDisplay = !inDisplay; out += '$$'; i += 2; continue; }
        else                      { inMath    = !inMath;    out += '$';  i += 1; continue; }
      }
      out += text[i++];
    }
    return out;
  }

  // Load card content into a slot element using class selectors (no IDs inside slots)
  function _loadSlot(slotEl, card) {
    if (!slotEl || !card) return;
    const typeMap = { cloze: 'Lückentext', why: 'Warum / Wie?', qa: 'Frage' };
    const typeEl = slotEl.querySelector('.fc-type-label');
    if (typeEl) typeEl.textContent = typeMap[card.type] || 'Frage';
    slotEl.querySelectorAll('.fc-chapter-label').forEach(el => el.textContent = card.topic || '');

    const frontTxt = slotEl.querySelector('.fc-front-text');
    const backTxt  = slotEl.querySelector('.fc-back-text');
    if (frontTxt) _renderContentInEl(frontTxt, _clozeFront(card.front || ''));
    if (backTxt)  _renderContentInEl(backTxt,  card.back || '');

    // Ensure slot is unflipped
    const inner = slotEl.querySelector('.card-inner');
    if (inner) inner.classList.remove('flipped');
  }

  // Version of _renderContent that takes a DOM element directly (avoids ID lookup)
  function _renderContentInEl(el, text) {
    if (!text) { el.innerHTML = ''; return; }
    const hasImg = text.includes('![');
    if (hasImg) {
      let html = _escHtml(text);
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
        (_, alt, url) => `<img src="${url}" alt="${alt}" class="max-w-full rounded-xl mt-2 mx-auto block" style="max-height:160px;object-fit:contain">`);
      el.innerHTML = html;
    } else {
      el.textContent = text;
    }
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

  function showCard(index) {
    if (!filteredCards.length) return;
    currentIndex = Math.max(0, Math.min(index, filteredCards.length - 1));

    // ── Current slot: reset any in-flight transition, then load + animate ──
    const curr = _currEl();
    if (curr) {
      curr.style.transition = 'none';
      curr.style.transform  = '';
      curr.style.opacity    = '1';
      curr.style.zIndex     = '5';
      void curr.offsetWidth;        // flush to cancel in-flight transitions
      _loadSlot(curr, filteredCards[currentIndex]);
      // Entrance animation: on .card-inner so fill:backwards doesn't block flip
      const inner = curr.querySelector('.card-inner');
      if (inner) {
        inner.classList.remove('fc-card-in');
        void inner.offsetWidth;
        inner.classList.add('fc-card-in');
      }
    }

    // ── Next slot: load next card silently behind current ──
    const nextCard = filteredCards[currentIndex + 1];
    const nextEl   = _nextEl();
    if (nextEl) {
      nextEl.style.transition = 'none';
      nextEl.style.transform  = '';
      nextEl.style.opacity    = '1';
      nextEl.style.zIndex     = '4';
      if (nextCard) {
        _loadSlot(nextEl, nextCard);
        nextEl.style.display = '';
      } else {
        nextEl.style.display = 'none';
      }
    }

    // ── UI updates ──
    isFlipped = false;
    const pct = filteredCards.length > 1
      ? Math.round((currentIndex / (filteredCards.length - 1)) * 100) : 100;
    const pb = document.getElementById('fc-progress-bar');
    if (pb) pb.style.width = pct + '%';
    _setTxt('fc-counter', `${currentIndex + 1} / ${filteredCards.length}`);
    _setTxt('fc-topic-label', filteredCards[currentIndex]?.topic || '');

    const yes = document.getElementById('fc-swipe-yes');
    const no  = document.getElementById('fc-swipe-no');
    if (yes) yes.style.opacity = '0';
    if (no)  no.style.opacity  = '0';

    _updateShadows(filteredCards.length - currentIndex);
  }

  function flipCard() {
    if (!filteredCards.length) return;
    isFlipped = !isFlipped;
    const inner = _currEl()?.querySelector('.card-inner');
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
    _renderContentInEl(el, text);
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
    const area = document.getElementById('fc-stack-area');
    if (!area || area._fcBound) return;
    area._fcBound = true;
    area.addEventListener('pointerdown',   _onDragStart, { passive: false });
    area.addEventListener('pointermove',   _onDragMove,  { passive: false });
    area.addEventListener('pointerup',     _onDragEnd);
    area.addEventListener('pointercancel', _onDragEnd);
  }

  function _onDragStart(e) {
    if (swipeInProgress || !filteredCards.length) return;
    dragStartX    = e.clientX;
    dragStartY    = e.clientY;
    isDragging    = true;
    dragDir       = null;
    currentDeltaX = 0;
    try { e.target.setPointerCapture(e.pointerId); } catch(_) {}
  }

  function _onDragMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    if (!dragDir) {
      if (Math.abs(dx) > 6)      { dragDir = 'h'; }
      else if (Math.abs(dy) > 6) { dragDir = 'v'; isDragging = false; return; }
      else return;
    }
    if (dragDir !== 'h') return;
    e.preventDefault();
    currentDeltaX = dx;

    const curr = _currEl();
    if (curr) curr.style.transform = `translateX(${dx}px) rotate(${dx * 0.04}deg)`;

    const THRESH = 40;
    const yes = document.getElementById('fc-swipe-yes') || document.getElementById('fc-swipe-yes-btn');
    const no  = document.getElementById('fc-swipe-no')  || document.getElementById('fc-swipe-no-btn');
    if (dx > THRESH) {
      if (yes) yes.style.opacity = String(Math.min((dx - THRESH) / 60, 1));
      if (no)  no.style.opacity  = '0';
    } else if (dx < -THRESH) {
      if (no)  no.style.opacity  = String(Math.min((-dx - THRESH) / 60, 1));
      if (yes) yes.style.opacity = '0';
    } else {
      if (yes) yes.style.opacity = '0';
      if (no)  no.style.opacity  = '0';
    }
  }

  function _onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    try { e.target.releasePointerCapture(e.pointerId); } catch(_) {}

    const endX = e.clientX ?? dragStartX;
    const endY = e.clientY ?? dragStartY;

    if (Math.abs(endX - dragStartX) < 5 && Math.abs(endY - dragStartY) < 5) {
      dragDir = null;
      flipCard();
      return;
    }

    if (dragDir !== 'h') return;

    if      (currentDeltaX >  80) { handleSwipe('right'); }
    else if (currentDeltaX < -80) { handleSwipe('left');  }
    else {
      const curr = _currEl();
      if (curr) {
        curr.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
        curr.style.transform  = '';
        setTimeout(() => { if (curr) curr.style.transition = ''; }, 300);
      }
      _resetOverlayOpacities();
    }
  }

  function _resetOverlayOpacities() {
    const yes = document.getElementById('fc-swipe-yes') || document.getElementById('fc-swipe-yes-btn');
    const no  = document.getElementById('fc-swipe-no')  || document.getElementById('fc-swipe-no-btn');
    if (yes) yes.style.opacity = '0';
    if (no)  no.style.opacity  = '0';
  }

  function handleSwipe(direction) {
    if (!filteredCards.length || swipeInProgress) return;
    swipeInProgress = true;
    const curr = _currEl();
    if (!curr) { _commitSwipe(direction); return; }
    const tx  = direction === 'right' ? '140vw' : '-140vw';
    const rot = direction === 'right' ? '20deg'  : '-20deg';
    _resetOverlayOpacities();
    curr.style.transition = 'transform 0.3s ease-in, opacity 0.25s ease';
    curr.style.transform  = `translateX(${tx}) rotate(${rot})`;
    curr.style.opacity    = '0';
    setTimeout(() => { _commitSwipe(direction); }, 280);
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

    const nextIdx = currentIndex + 1;
    if (nextIdx >= filteredCards.length) {
      SessionSync.clear('flashcards', _sessionKey);
      _showSessionComplete();
      return;
    }
    SessionSync.save('flashcards', _sessionKey, { itemIds: filteredCards.map(c => c.id), currentIndex: nextIdx });

    // ── Slot swap: back slot is already rendered, bring it forward ──
    const oldCurrEl = _currEl();
    const oldNextEl = _nextEl();

    // Flip slot role
    _currSlot = (_currSlot === 'a' ? 'b' : 'a');
    currentIndex = nextIdx;
    isFlipped = false;

    // Bring new-current to front (it's the old next slot, already rendered at opacity:1)
    if (oldNextEl) {
      oldNextEl.style.transition = 'none';
      void oldNextEl.offsetWidth;
      oldNextEl.style.zIndex    = '5';
      oldNextEl.style.transform = '';
      oldNextEl.style.opacity   = '1';
    }

    // Reset old-current slot → load next-next card into it (goes to back, z-index 4)
    if (oldCurrEl) {
      oldCurrEl.style.transition = 'none';
      void oldCurrEl.offsetWidth;
      oldCurrEl.style.transform  = '';
      oldCurrEl.style.opacity    = '1';
      oldCurrEl.style.zIndex     = '4';
      const nextNextCard = filteredCards[currentIndex + 1];
      if (nextNextCard) {
        _loadSlot(oldCurrEl, nextNextCard);
        oldCurrEl.style.display = '';
      } else {
        oldCurrEl.style.display = 'none';
      }
    }

    // UI
    const pct = filteredCards.length > 1
      ? Math.round((currentIndex / (filteredCards.length - 1)) * 100) : 100;
    const pb = document.getElementById('fc-progress-bar');
    if (pb) pb.style.width = pct + '%';
    _setTxt('fc-counter', `${currentIndex + 1} / ${filteredCards.length}`);
    _setTxt('fc-topic-label', filteredCards[currentIndex]?.topic || '');
    _updateShadows(filteredCards.length - currentIndex);
    _flashBorder(direction === 'right' ? 'green' : 'red');

    setTimeout(() => { swipeInProgress = false; }, 50);
  }

  function _flashBorder(color) {
    const curr = _currEl();
    if (!curr) return;
    const front = curr.querySelector('.card-front');
    const back  = curr.querySelector('.card-back');
    const cls   = color === 'green' ? 'fc-flash-green' : 'fc-flash-red';
    [front, back].forEach(el => {
      if (!el) return;
      el.classList.remove('fc-flash-green', 'fc-flash-red');
      void el.offsetWidth;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), 800);
    });
  }

  function _showSessionComplete() {
    const done = document.getElementById('fc-session-done');
    const sub  = document.getElementById('fc-session-sub');
    const easy = filteredCards.filter(c => (AppState.getCardProgress(c.id).reps || 0) > 0).length;
    if (sub) sub.textContent = `${easy} von ${filteredCards.length} Karten gewusst`;
    // Hide both slots
    const a = document.getElementById('fc-slot-a');
    const b = document.getElementById('fc-slot-b');
    if (a) a.style.opacity = '0';
    if (b) b.style.opacity = '0';
    if (done) done.classList.remove('hidden');
    swipeInProgress = false;
    _sessionDone = true;
  }

  function startNextSession() {
    startDeck(activeCourse || 'all', activeTopic);
  }

  function _updateShadows(remaining) {
    // remaining = cards left including current card
    // afterCurrent = cards sitting behind the current card
    const after = remaining - 1;

    const cfg = [
      { id: 'fc-shadow-1', threshold: 1 },
      { id: 'fc-shadow-2', threshold: 2 },
      { id: 'fc-shadow-3', threshold: 5 },
    ];
    cfg.forEach(({ id, threshold }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.display = after >= threshold ? '' : 'none';
    });
  }

  // ══════════════════════════════════════════════════════════
  // RATING / SM-2
  // ══════════════════════════════════════════════════════════

  // SM-2 spaced repetition algorithm (ANKI-compatible)
  // prog fields: interval (days), ease (EF 1.3–3.0), reps (consecutive ok), reviews (total), nextReview
  function _saveRating(card, rating) {
    const prog = AppState.getCardProgress(card.id);
    prog.ease    = prog.ease    ?? 2.5;
    prog.reps    = prog.reps    ?? 0;
    prog.interval = prog.interval ?? 1;

    if (rating === 'easy') {
      // Correct — advance interval using SM-2 schedule
      if (prog.reps === 0)      { prog.interval = 1; }
      else if (prog.reps === 1) { prog.interval = 4; }
      else                       { prog.interval = Math.round(prog.interval * prog.ease); }
      prog.reps++;
      prog.ease = Math.min(3.0, prog.ease + 0.1);
      Gamification.addXP(Gamification.XP.cardEasy);
    } else if (rating === 'medium') {
      // Partially correct — small interval boost, ease unchanged
      prog.interval = Math.max(1, Math.round(prog.interval * 1.2));
      prog.reps     = Math.max(0, prog.reps - 1); // partial credit: don't fully reset
      Gamification.addXP(Gamification.XP.cardHard);
    } else {
      // Failed (Again) — reset to day 1, penalise ease
      prog.interval = 1;
      prog.reps     = 0;
      prog.ease     = Math.max(1.3, prog.ease - 0.2);
      Gamification.addXP(Gamification.XP.cardHard);
    }

    prog.nextReview = Date.now() + prog.interval * 24 * 60 * 60 * 1000;
    prog.reviews    = (prog.reviews || 0) + 1;
    AppState.setCardProgress(card.id, prog);
    return prog;
  }

  function rateCard(rating) {
    if (swipeInProgress || !filteredCards.length) return;
    const direction = (rating === 'easy' || rating === 'right') ? 'right' : 'left';
    handleSwipe(direction);
  }

  function nextCard() { if (filteredCards.length) handleSwipe('right'); }
  function prevCard() { /* not supported in two-slot mode */ }

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
    startNextSession,
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
    // Data preloading (used by LernenScreen)
    ensureLoaded: _ensureCardsLoaded,
    // Session resume
    _resumeSaved,
    _restartSaved,
    _closeResumePrompt,
  };
})();
