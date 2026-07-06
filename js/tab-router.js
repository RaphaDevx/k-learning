// ── Tab Router (v3.13.1) ────────────────────────────────────────────────────
// Persistent per-tab stacks with re-tap-to-root behavior (Apple Music style)

window.TabRouter = (function() {

  const TAB_ROOTS = {
    home:       'dashboard',
    feed:       'feed',
    lernen:     'lernen',
    pruefungen: 'exam',
    profil:     'profile',
  };

  // Every navigable view → its owning tab
  const VIEW_TAB = {
    dashboard:    'home',
    'course-hub': 'home',
    tutor:        'home',
    feed:         'feed',
    lernen:       'lernen',
    flashcards:   'lernen',
    topics:       'lernen',
    quiz:         'lernen',
    'learn-path': 'lernen',
    exam:         'pruefungen',
    profile:      'profil',
    progress:     'profil',
  };

  const ALL_VIEWS = Object.keys(VIEW_TAB);

  // Per-tab navigation stacks — session memory, not persisted
  const stacks = {
    home:       ['dashboard'],
    feed:       ['feed'],
    lernen:     ['lernen'],
    pruefungen: ['exam'],
    profil:     ['profile'],
  };

  let _activeTab = 'home';

  // ── Render a view (no stack manipulation) ──
  function _render(name) {
    if (window.ExamScreen && ExamScreen.isExamActive && ExamScreen.isExamActive()) {
      ExamScreen.confirmAbort();
      return;
    }

    ALL_VIEWS.forEach(v => {
      const el = document.getElementById('view-' + v);
      if (el) el.classList.add('hidden');
    });

    const target = document.getElementById('view-' + name);
    if (target) target.classList.remove('hidden');

    document.body.classList.toggle('feed-active', name === 'feed');
    _highlightNav(_activeTab);

    const screens = {
      dashboard:    window.DashboardScreen,
      'course-hub': window.CourseHubScreen,
      feed:         window.FeedScreen,
      flashcards:   window.FlashcardsScreen,
      lernen:       window.LernenScreen,
      'learn-path': window.LearnPathScreen,
      topics:       window.TopicsScreen,
      quiz:         window.QuizScreen,
      exam:         window.ExamScreen,
      tutor:        window.TutorScreen,
      profile:      window.ProfileScreen,
      progress:     window.ProgressScreen,
    };
    const screen = screens[name];
    if (screen && screen.init) screen.init();
    window.scrollTo(0, 0);
  }

  // ── Called by bottom-nav tap buttons ──
  function tapTab(tabName) {
    if (!TAB_ROOTS[tabName]) return;

    if (tabName !== _activeTab) {
      _activeTab = tabName;
      const stack = stacks[tabName];
      _render(stack.length ? stack[stack.length - 1] : TAB_ROOTS[tabName]);
    } else {
      const stack = stacks[tabName];
      if (stack.length > 1) {
        stacks[tabName] = [TAB_ROOTS[tabName]];
        _render(TAB_ROOTS[tabName]);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // ── Called by Router.showView / screen-to-screen navigations ──
  function navigateTo(name) {
    if (!VIEW_TAB[name]) return;
    const ownerTab = VIEW_TAB[name];

    if (ownerTab !== _activeTab) {
      _activeTab = ownerTab;
      // Reset the target tab's stack to a clean path from its root
      stacks[ownerTab] = [TAB_ROOTS[ownerTab]];
    }

    const stack = stacks[_activeTab];
    if (stack[stack.length - 1] !== name) {
      stack.push(name);
    }
    _render(name);
  }

  // ── Go back one level within the active tab ──
  function back() {
    const stack = stacks[_activeTab];
    if (stack.length > 1) {
      stack.pop();
      _render(stack[stack.length - 1]);
      return true;
    }
    return false;
  }

  function _highlightNav(tab) {
    Object.keys(TAB_ROOTS).forEach(t => {
      const btn = document.getElementById('nav-tab-' + t);
      if (btn) {
        btn.classList.toggle('text-white',    t === tab);
        btn.classList.toggle('text-gray-400', t !== tab);
      }
      const sbtn = document.getElementById('snav-tab-' + t);
      if (sbtn) sbtn.classList.toggle('active', t === tab);
    });
  }

  function currentTab()  { return _activeTab; }
  function currentView() {
    const s = stacks[_activeTab];
    return s[s.length - 1];
  }

  return { tapTab, navigateTo, back, currentTab, currentView };
})();
