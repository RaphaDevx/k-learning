// ── AI Service ────────────────────────────────────────────────────────────
// API key stored in Supabase user_settings (per-account, not localStorage)

window.AIService = (function () {
  const PROXY_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co/functions/v1/ai-proxy';

  const PROVIDERS = [
    { id: 'anthropic', name: 'Anthropic Claude', test: k => k.startsWith('sk-ant-'), color: '#D97706', emoji: '🟡', defaultModel: 'claude-haiku-4-5-20251001' },
    { id: 'openai',    name: 'OpenAI',           test: k => k.startsWith('sk-') && !k.startsWith('sk-ant-'), color: '#10B981', emoji: '🟢', defaultModel: 'gpt-4o-mini' },
    { id: 'qwen',      name: 'Qwen (Alibaba)',   test: () => false, color: '#3B82F6', emoji: '🔵', defaultModel: 'qwen-plus' },
  ];

  let _cache = null; // in-memory during session

  function detectProvider(key) {
    if (!key) return null;
    return PROVIDERS.find(p => p.test(key)) || null;
  }

  async function loadKey() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return null;
    const { data } = await _supabase
      .from('user_settings')
      .select('ai_api_key')
      .eq('user_id', user.id)
      .single();
    _cache = data?.ai_api_key || null;
    return _cache;
  }

  async function saveKey(key) {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) throw new Error('Nicht eingeloggt');
    const trimmed = key?.trim() || null;
    const provider = trimmed ? (detectProvider(trimmed)?.id || null) : null;
    const { error } = await _supabase
      .from('user_settings')
      .upsert({ user_id: user.id, ai_api_key: trimmed, ai_provider: provider, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    _cache = trimmed;
  }

  // Sync read of in-memory cache (call loadKey() first)
  function getKey() { return _cache; }

  async function ask(messages, { system, model, max_tokens = 1024 } = {}) {
    let key = _cache ?? await loadKey();
    if (!key) throw new Error('Kein API-Key gesetzt. Bitte im Profil eintragen.');
    const provider = detectProvider(key);
    if (!provider) throw new Error('Anbieter nicht erkannt. Bitte Key im Profil prüfen.');

    const { data: { session } } = await _supabase.auth.getSession();
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ provider: provider.id, key, messages, system, model: model || provider.defaultModel, max_tokens }),
    });
    if (!res.ok) throw new Error(`API-Fehler (${res.status}): ${await res.text()}`);
    return res.json();
  }

  function extractText(response) {
    if (response?.content?.[0]?.text) return response.content[0].text;
    if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
    return '';
  }

  return { detectProvider, loadKey, saveKey, getKey, ask, extractText, PROVIDERS };
})();
