// ── Router ────────────────────────────────────────────────────────────────
// View management: show/hide screens, update navigation

window.Router = (function() {
  const VIEWS = ['dashboard', 'course-hub', 'feed', 'flashcards', 'learn-path', 'topics', 'quiz', 'exam', 'tutor', 'profile'];
  let currentView = 'dashboard';

  function showView(name) {
    if (!VIEWS.includes(name)) return;
    // Block navigation during active exam
    if (window.ExamScreen && ExamScreen.isExamActive && ExamScreen.isExamActive()) {
      ExamScreen.confirmAbort();
      return;
    }

    VIEWS.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.classList.add('hidden');
    });
    const target = document.getElementById('view-' + name);
    if (target) target.classList.remove('hidden');

    currentView = name;
    document.body.classList.toggle('feed-active', name === 'feed');
    updateNav(name);

    // Call screen init
    const screens = {
      dashboard:    window.DashboardScreen,
      'course-hub': window.CourseHubScreen,
      feed:         window.FeedScreen,
      flashcards:   window.FlashcardsScreen,
      'learn-path': window.LearnPathScreen,
      topics:       window.TopicsScreen,
      quiz:         window.QuizScreen,
      exam:         window.ExamScreen,
      tutor:        window.TutorScreen,
      profile:      window.ProfileScreen,
    };
    const screen = screens[name];
    if (screen && screen.init) screen.init();

    window.scrollTo(0, 0);
  }

  function updateNav(name) {
    // Sekundäre Views haben keinen eigenen Nav-Button → nächste Hauptseite aktiv lassen
    const navMap = { 'course-hub': 'dashboard', topics: 'flashcards', 'learn-path': 'flashcards', tutor: 'dashboard' };
    const navName = navMap[name] || name;

    // Mobile bottom nav
    VIEWS.forEach(v => {
      const btn = document.getElementById('nav-' + v);
      if (btn) {
        btn.classList.toggle('text-white',  v === navName);
        btn.classList.toggle('text-gray-400', v !== navName);
      }
    });
    // Desktop sidebar
    VIEWS.forEach(v => {
      const btn = document.getElementById('snav-' + v);
      if (btn) btn.classList.toggle('active', v === navName);
    });
  }

  function current() { return currentView; }

  // Keyboard navigation (desktop)
  document.addEventListener('keydown', e => {
    if (currentView === 'flashcards' && window.FlashcardsScreen) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); FlashcardsScreen.flipCard(); }
      if (e.key === 'ArrowRight') FlashcardsScreen.nextCard();
      if (e.key === 'ArrowLeft')  FlashcardsScreen.prevCard();
      if (e.key === '1') FlashcardsScreen.rateCard('hard');
      if (e.key === '2') FlashcardsScreen.rateCard('medium');
      if (e.key === '3') FlashcardsScreen.rateCard('easy');
    }
  });

  return { showView, current };
})();

// Global shortcut
function showView(name) { Router.showView(name); }
