// ── Session Sync ──────────────────────────────────────────────────────────
// Cross-device "Häppchen"-Sync für Quiz / Lernset / Lernkarten-Sessions.
// Persistiert das aktuelle Set (item_ids) + Position (current_index) je
// session_type + session_key in Supabase (`learning_sessions`), sodass eine
// Session auf einem anderen Gerät an derselben Stelle fortgesetzt werden kann.

window.SessionSync = (function () {

  async function _userId() {
    try {
      const { data } = await window.supabaseClient.auth.getUser();
      return data?.user?.id || null;
    } catch { return null; }
  }

  async function load(sessionType, sessionKey) {
    try {
      const userId = await _userId();
      if (!userId) return null;
      const { data } = await window.supabaseClient
        .from('learning_sessions').select('*')
        .eq('user_id', userId).eq('session_type', sessionType).eq('session_key', sessionKey)
        .maybeSingle();
      return data || null;
    } catch { return null; }
  }

  async function save(sessionType, sessionKey, { itemIds, currentIndex, results }) {
    try {
      const userId = await _userId();
      if (!userId) return;
      await window.supabaseClient.from('learning_sessions').upsert({
        user_id: userId, session_type: sessionType, session_key: sessionKey,
        item_ids: itemIds, current_index: currentIndex, results: results || [],
        updated_at: new Date().toISOString(),
      });
    } catch (e) { console.warn('SessionSync.save:', e); }
  }

  async function clear(sessionType, sessionKey) {
    try {
      const userId = await _userId();
      if (!userId) return;
      await window.supabaseClient.from('learning_sessions').delete()
        .eq('user_id', userId).eq('session_type', sessionType).eq('session_key', sessionKey);
    } catch (e) {}
  }

  // Shared "Häppchen"-Grösse: volle Menge bis 30, sonst ~16er Chunks
  const CHUNK = 16;
  function sessionSize(total) {
    if (total <= 30) return total;
    const chunks = Math.ceil(total / CHUNK);
    return Math.ceil(total / chunks);
  }

  // Generischer Resume-Prompt, wird ins jeweilige Overlay injiziert
  function resumePromptHtml({ position, total, resumeOnClick, restartOnClick, closeOnClick }) {
    return `
      <div class="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4 relative">
        ${closeOnClick ? `
        <button onclick="${closeOnClick}" class="absolute top-3 left-3 flex items-center gap-1 text-sm" style="color:var(--txt-2)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>Zurück
        </button>` : ''}
        <div class="text-4xl">📍</div>
        <div class="font-bold text-lg" style="color:var(--txt)">Weitermachen?</div>
        <div class="text-sm" style="color:var(--txt-2)">Du warst bei ${position} / ${total}.</div>
        <div class="flex flex-col gap-3 w-full max-w-xs">
          <button onclick="${resumeOnClick}" class="tap-card w-full py-3.5 rounded-2xl font-bold text-sm text-white" style="background:#4f46e5">Weiter bei ${position}</button>
          <button onclick="${restartOnClick}" class="tap-card w-full py-3.5 rounded-2xl font-bold text-sm" style="background:var(--card);border:1px solid var(--border);color:var(--txt-2)">Neues Set starten</button>
        </div>
      </div>`;
  }

  return { load, save, clear, sessionSize, resumePromptHtml };
})();
