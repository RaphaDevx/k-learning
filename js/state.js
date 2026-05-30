// ── State Management ──────────────────────────────────────────────────────
// Single source of truth for all app state, persisted to localStorage

const STATE_KEY = 'hsg-lp-v2';

window.AppState = (function() {
  let _state = {};

  function load() {
    try {
      _state = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    } catch(e) {
      _state = {};
    }
    // Init defaults
    _state.xp            = _state.xp || 0;
    _state.streak        = _state.streak || 0;
    _state.cardProgress  = _state.cardProgress || {};
    _state.feedProgress  = _state.feedProgress || {};
    _state.topicProgress = _state.topicProgress || {};
    _state.enrolledCourses = _state.enrolledCourses || null; // null = all courses
  }

  function save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(_state));
  }

  function get(key) {
    return key ? _state[key] : _state;
  }

  function set(key, value) {
    _state[key] = value;
    save();
  }

  function update(key, updater) {
    _state[key] = updater(_state[key]);
    save();
  }

  // Card progress helpers
  function getCardProgress(cardId) {
    return _state.cardProgress[cardId] || { interval: 1, ease: 2.5, reviews: 0 };
  }

  function setCardProgress(cardId, prog) {
    _state.cardProgress[cardId] = prog;
    save();
  }

  function getTopicProgress(course) {
    const data = window.FLASHCARD_DATA || [];
    const topics = {};
    const prog = _state.cardProgress || {};
    data.filter(c => c.course === course).forEach(c => {
      const t = c.topic || 'Allgemein';
      if (!topics[t]) topics[t] = { total: 0, done: 0 };
      topics[t].total++;
      if (prog[c.id] && prog[c.id].reviews > 0) topics[t].done++;
    });
    return topics;
  }

  load();
  return { get, set, update, save, getCardProgress, setCardProgress, getTopicProgress };
})();
