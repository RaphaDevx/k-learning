// ── Gamification ──────────────────────────────────────────────────────────
// XP, Streaks, Level system

window.Gamification = (function() {

  const XP_LEVELS = [0, 50, 150, 350, 700, 1200, 2000, 3000, 5000];
  const LEVEL_NAMES = ['Rookie','Learner','Student','Scholar','Expert','Master','Professor','Genius','Legend'];

  function getLevel(xp) {
    for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
      if (xp >= XP_LEVELS[i]) return i;
    }
    return 0;
  }

  function addXP(amount) {
    const prev = AppState.get('xp');
    const newXP = prev + amount;
    AppState.set('xp', newXP);

    const prevLevel = getLevel(prev);
    const newLevel = getLevel(newXP);
    if (newLevel > prevLevel) showLevelUp(newLevel);

    updateStreak();
    render();
    return newXP;
  }

  function updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastDay = AppState.get('lastStudyDay');

    if (lastDay !== today) {
      const newStreak = lastDay === yesterday ? (AppState.get('streak') || 0) + 1 : 1;
      AppState.set('streak', newStreak);
      AppState.set('lastStudyDay', today);
    }
  }

  function showLevelUp(level) {
    const banner = document.createElement('div');
    banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black font-bold px-6 py-3 rounded-2xl shadow-2xl animate-slide-up';
    banner.textContent = `🎉 Level Up! ${LEVEL_NAMES[level]}`;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 3000);
  }

  function render() {
    const xp = AppState.get('xp');
    const streak = AppState.get('streak') || 0;
    const level = getLevel(xp);
    const levelName = LEVEL_NAMES[level];

    const xpStr = `⭐ ${xp} XP`;
    const streakStr = `🔥 ${streak}`;

    document.querySelectorAll('.xp-display').forEach(el => el.textContent = xpStr);
    document.querySelectorAll('.streak-display').forEach(el => el.textContent = streakStr);
    document.querySelectorAll('.level-display').forEach(el => el.textContent = `Lv.${level} ${levelName}`);
  }

  // XP rewards
  const XP = {
    cardEasy: 10,
    cardMedium: 5,
    cardHard: 2,
    feedKnew: 8,
    feedDidnt: 3,
    topicCompleted: 25
  };

  return { addXP, updateStreak, render, getLevel, LEVEL_NAMES, XP_LEVELS, XP };
})();
