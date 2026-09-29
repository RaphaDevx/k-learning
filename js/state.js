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
    _state.enrolledCourses  = _state.enrolledCourses  || null;
    _state.activeCourse     = _state.activeCourse     || null;
    _state.activeTab        = _state.activeTab        || 'feed';
    _state.quizResults      = _state.quizResults      || {};  // { dataVar: { qId: { correct, topic, ts } } }
    _state.quizTopicStats   = _state.quizTopicStats   || {};  // { topic: { correct, total } }
    _state.lernsetProgress  = _state.lernsetProgress  || {};  // { itemId: { attempts, bestScore, lastScore } }
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

  // Lernset (interactive exercises) progress helpers
  function getLernsetProgress(itemId) {
    return _state.lernsetProgress[itemId] || { attempts: 0, bestScore: 0, lastScore: 0 };
  }

  function setLernsetProgress(itemId, prog) {
    _state.lernsetProgress[itemId] = prog;
    save();
  }

  function getLernsetTopicProgress(course) {
    const data = window.LERNSET_DATA || [];
    const topics = {};
    const prog = _state.lernsetProgress || {};
    data.filter(c => c.course === course).forEach(c => {
      const t = c.topic || 'Allgemein';
      if (!topics[t]) topics[t] = { total: 0, done: 0 };
      topics[t].total++;
      if (prog[c.id] && prog[c.id].attempts > 0) topics[t].done++;
    });
    return topics;
  }

  load();
  return {
    get, set, update, save,
    getCardProgress, setCardProgress, getTopicProgress,
    getLernsetProgress, setLernsetProgress, getLernsetTopicProgress
  };
})();
