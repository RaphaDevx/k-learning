// ── Gamification (Backward-Compat Wrapper) ────────────────────────────────
// Delegiert alles an LevelSystem. Nur noch für alte Calls die noch nicht
// migriert wurden. Neue Vergaben direkt mit LevelSystem.award('eventName').

window.Gamification = (function () {

  // XP-Tabelle (gelesen von level-config.js — bleibt für alten Code lesbar)
  const XP = {
    get cardEasy()       { return window.LEVEL_CONFIG?.events.cardEasy       ?? 10; },
    get cardMedium()     { return window.LEVEL_CONFIG?.events.cardMedium      ?? 5;  },
    get cardHard()       { return window.LEVEL_CONFIG?.events.cardHard        ?? 2;  },
    get lernCorrect()    { return window.LEVEL_CONFIG?.events.lernCorrect     ?? 12; },
    get lernPartial()    { return window.LEVEL_CONFIG?.events.lernPartial     ?? 5;  },
    get lernWrong()      { return window.LEVEL_CONFIG?.events.lernWrong       ?? 1;  },
    get topicCompleted() { return window.LEVEL_CONFIG?.events.topicCompleted  ?? 25; },
  };

  function addXP(amount)     { window.LevelSystem?._rawAddXP(amount); }
  function render()          { window.LevelSystem?.render(); }
  function updateStreak()    { /* handled by LevelSystem internally */ }
  function getLevel(xp)      { return window.LevelSystem?.getLevelInfo(xp)?.level ?? 0; }

  return { addXP, render, updateStreak, getLevel, XP };
})();
