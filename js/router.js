// ── Router (v3.13.1) ────────────────────────────────────────────────────────
// Thin wrapper — all navigation logic lives in TabRouter (tab-router.js)

window.Router = (function() {

  function showView(name) {
    if (window.TabRouter) TabRouter.navigateTo(name);
  }

  function current() {
    return window.TabRouter ? TabRouter.currentView() : 'dashboard';
  }

  // Keyboard shortcuts (desktop) — nie in Inputs/Textareas feuern
  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    const editable = document.activeElement?.isContentEditable;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || editable) return;

    const cv = current();
    if (cv === 'flashcards' && window.FlashcardsScreen) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); FlashcardsScreen.flipCard(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); FlashcardsScreen.handleSwipe('right'); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); FlashcardsScreen.handleSwipe('left'); }
      if (e.key === '1') FlashcardsScreen.handleSwipe('left');
      if (e.key === '3') FlashcardsScreen.handleSwipe('right');
    }
  });

  return { showView, current };
})();

function showView(name) { Router.showView(name); }
