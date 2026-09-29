// Billing & Entitlement Layer
//
// Priorität:  Pro/Pro+ Abo  >  BYOK (eigener API-Key)  >  Free (kein AI-Zugriff)
// Wird nach dem Login in Auth.init() aufgerufen.

window.Billing = (function () {
  let _entitlement = null; // { plan, status, current_period_end }

  async function init(userId) {
    if (!userId) {
      _entitlement = { plan: 'free', status: 'active' };
      return;
    }

    const { data, error } = await window.supabaseClient
      .from('user_entitlements')
      .select('plan, status, current_period_end, credits_balance')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) console.warn('[Billing] Entitlement fetch error:', error.message);

    // Kein Eintrag = Free-Tier
    _entitlement = data ?? { plan: 'free', status: 'active', credits_balance: 0 };
  }

  // Abo aktiv?
  function isPro() {
    return (
      _entitlement?.plan !== 'free' &&
      (_entitlement?.status === 'active' || _entitlement?.status === 'grace_period')
    );
  }

  // BYOK-Key konfiguriert? (bestehende Funktionalität bleibt erhalten)
  function hasByok() {
    // ai-service.js legt den Key in localStorage als 'kl_api_key' ab
    return !!localStorage.getItem('kl_api_key');
  }

  // Darf der User KI-Features verwenden?
  function canUseAI() {
    return isPro() || hasByok();
  }

  function getPlan() {
    return _entitlement?.plan ?? 'free';
  }

  function getEntitlement() {
    return _entitlement;
  }

  // Paywall-Prompt: zeigt Modal wenn kein Zugriff
  function requireAI(onGranted) {
    if (canUseAI()) {
      onGranted();
      return;
    }
    _showPaywall();
  }

  function _showPaywall() {
    // Einfacher Alert — später durch ein echtes Modal ersetzen
    const message =
      'Diese Funktion erfordert ein K-Learning Pro-Abo oder einen eigenen API-Key (BYOK).\n\nBYOK: Einstellungen → AI-Key eintragen\nAbo: Coming soon 🚀';
    alert(message);
  }

  return { init, isPro, hasByok, canUseAI, getPlan, getEntitlement, requireAI };
})();
