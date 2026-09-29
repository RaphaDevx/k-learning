// ── Level System Config ───────────────────────────────────────────────────
// Alle Level-Parameter hier anpassen — der Rest des Systems liest nur diese Datei.

window.LEVEL_CONFIG = {

  // Stufen: xp = Mindest-XP um dieses Level zu erreichen
  levels: [
    { xp: 0,     name: 'Rookie',     badge: '🌱' },
    { xp: 50,    name: 'Lernender',  badge: '📖' },
    { xp: 150,   name: 'Student',    badge: '✏️'  },
    { xp: 350,   name: 'Fleissig',   badge: '🎯' },
    { xp: 700,   name: 'Scholar',    badge: '🎓' },
    { xp: 1200,  name: 'Expert',     badge: '⚡' },
    { xp: 2000,  name: 'Meister',    badge: '🔥' },
    { xp: 3000,  name: 'Professor',  badge: '🧠' },
    { xp: 5000,  name: 'Legende',    badge: '👑' },
  ],

  // Tägliches XP-Ziel (aktives Lernen — nicht Login)
  dailyGoal: 50,

  // XP pro Event — alle Vergaben laufen über LevelSystem.award('eventName')
  events: {
    // Feed
    feedWatch:       5,
    feedKnew:       15,
    feedDidnt:       3,
    // Lernkarten (SM-2)
    cardEasy:       10,
    cardMedium:      5,
    cardHard:        2,
    // Lernset
    lernCorrect:    12,
    lernPartial:     5,
    lernWrong:       1,
    // Quiz
    quizCorrect:     8,
    quizWrong:       1,
    // Meilensteine
    topicCompleted: 25,
    examPass:       50,
  },

};
