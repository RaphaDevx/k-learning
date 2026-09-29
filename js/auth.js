// ── Supabase Auth ─────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
const SUPABASE_KEY = 'sb_publishable__h4cSWEEpNBjY3XGPvh0_A_ipyoeEjO';

window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = window._supabase; // alias used by FeedScreen

window.Auth = (function () {

  async function init() {
    const { data: { session } } = await _supabase.auth.getSession();
    _setOverlay(!session);
    if (session?.user) window.Billing?.init(session.user.id);

    _supabase.auth.onAuthStateChange((_event, session) => {
      _setOverlay(!session);
      if (session?.user) window.Billing?.init(session.user.id);
      if (session && window.ProfileScreen?.refresh) window.ProfileScreen.refresh();
    });
  }

  function _setOverlay(show) {
    document.getElementById('auth-overlay').classList.toggle('hidden', !show);
  }

  async function signInWithGoogle() {
    await _supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
  }

  async function signOut() {
    await _supabase.auth.signOut();
  }

  async function getUser() {
    const { data: { user } } = await _supabase.auth.getUser();
    return user;
  }

  return { init, signInWithGoogle, signOut, getUser };
})();
