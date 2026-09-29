// ── KI-Tutor Screen ───────────────────────────────────────────────────────
// Explain-back interface (Phase 3: needs API backend)

window.TutorScreen = (function() {

  function init() {
    // Nothing to init dynamically
  }

  function submit() {
    const course = document.getElementById('tutor-course')?.value;
    const input  = document.getElementById('tutor-input')?.value?.trim();
    const resp   = document.getElementById('tutor-response');
    const score  = document.getElementById('tutor-score');
    const text   = document.getElementById('tutor-feedback-text');

    if (!input) return;
    if (resp)  resp.classList.remove('hidden');
    if (score) score.textContent = '🚧';
    if (text)  text.textContent  = 'KI-Backend noch nicht aktiv. Phase 3 in Entwicklung.\n\nDein Text (' + input.length + ' Zeichen) wurde empfangen.';
  }

  return { init, submit };
})();
