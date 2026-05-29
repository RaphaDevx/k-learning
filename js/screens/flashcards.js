// ── Flashcards Screen ─────────────────────────────────────────────────────

window.FlashcardsScreen = (function() {
  let allCards = [];
  let filteredCards = [];
  let currentIndex = 0;
  let isFlipped = false;
  let activeFilter = 'all';
  let activeTopic = null;

  function init() {
    allCards = window.FLASHCARD_DATA || [];
    filteredCards = [...allCards];
    if (allCards.length > 0) {
      document.getElementById('no-cards-msg')?.classList.add('hidden');
      showCard(0);
    } else {
      document.getElementById('no-cards-msg')?.classList.remove('hidden');
    }
    updateFilterButtons();
  }

  function filterCards(course, topic) {
    activeFilter = course || 'all';
    activeTopic  = topic  || null;

    filteredCards = activeFilter === 'all' ? [...allCards] : allCards.filter(c => c.course === activeFilter);
    if (activeTopic) filteredCards = filteredCards.filter(c => c.topic === activeTopic);

    currentIndex = 0;
    const noMsg = document.getElementById('no-cards-msg');

    if (filteredCards.length) {
      noMsg?.classList.add('hidden');
      showCard(0);
    } else {
      noMsg?.classList.remove('hidden');
    }
    updateFilterButtons();
  }

  function showCard(index) {
    if (!filteredCards.length) return;
    currentIndex = Math.max(0, Math.min(index, filteredCards.length - 1));
    const card = filteredCards[currentIndex];

    const counter   = document.getElementById('card-counter');
    const topicEl   = document.getElementById('card-topic');
    const typeLabel = document.getElementById('card-type-label');
    const frontText = document.getElementById('card-front-text');
    const backText  = document.getElementById('card-back-text');
    const ratingBtns= document.getElementById('rating-buttons');
    const cardInner = document.getElementById('card-inner');

    if (counter)   counter.textContent   = `Karte ${currentIndex + 1} / ${filteredCards.length}`;
    if (topicEl)   topicEl.textContent   = card.topic || '';
    if (typeLabel) typeLabel.textContent  = card.type === 'cloze' ? 'Lückentext' : card.type === 'why' ? 'Warum/Wie?' : 'Frage';
    if (frontText) frontText.textContent = (card.front || '').replace(/\{\{[^}]+\}\}/g, '______');
    if (backText)  backText.textContent  = card.back || '';

    isFlipped = false;
    cardInner?.classList.remove('flipped');
    ratingBtns?.classList.add('hidden');
  }

  function flipCard() {
    isFlipped = !isFlipped;
    document.getElementById('card-inner')?.classList.toggle('flipped', isFlipped);
    if (isFlipped) document.getElementById('rating-buttons')?.classList.remove('hidden');
  }

  function nextCard() {
    if (filteredCards.length) showCard((currentIndex + 1) % filteredCards.length);
  }

  function prevCard() {
    if (filteredCards.length) showCard((currentIndex - 1 + filteredCards.length) % filteredCards.length);
  }

  function rateCard(rating) {
    if (!filteredCards.length) return;
    const card = filteredCards[currentIndex];
    const prog = AppState.getCardProgress(card.id);

    if (rating === 'easy') {
      prog.interval = Math.round(prog.interval * prog.ease);
      prog.ease = Math.min(prog.ease + 0.15, 3.0);
      Gamification.addXP(Gamification.XP.cardEasy);
    } else if (rating === 'medium') {
      prog.interval = Math.max(1, Math.round(prog.interval * 1.2));
      Gamification.addXP(Gamification.XP.cardMedium);
    } else {
      prog.interval = 1;
      prog.ease = Math.max(prog.ease - 0.2, 1.3);
      Gamification.addXP(Gamification.XP.cardHard);
    }

    prog.nextReview = Date.now() + prog.interval * 24 * 60 * 60 * 1000;
    prog.reviews = (prog.reviews || 0) + 1;
    AppState.setCardProgress(card.id, prog);
    nextCard();
  }

  function openCardDirect(id) {
    Router.showView('flashcards');
    const idx = allCards.findIndex(c => c.id === id);
    if (idx >= 0) {
      filteredCards = [...allCards];
      activeFilter = 'all';
      activeTopic = null;
      showCard(idx);
    }
  }

  function openForTopic(course, topic) {
    Router.showView('flashcards');
    filterCards(course, topic);
  }

  function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const f = btn.dataset.filter;
      const isActive = f === activeFilter;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-gray-700', !isActive);
      btn.classList.toggle('text-gray-300', !isActive);
    });
  }

  return { init, filterCards, showCard, flipCard, nextCard, prevCard, rateCard, openCardDirect, openForTopic };
})();
