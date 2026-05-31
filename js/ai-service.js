// ── AI Service ────────────────────────────────────────────────────────────
// Provider detection, key storage, and API calls via Supabase edge proxy

window.AIService = (function () {
  const LS_KEY = 'hsg-ai-key';
  const PROXY_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co/functions/v1/ai-proxy';

  const PROVIDERS = [
    { id: 'anthropic', name: 'Anthropic Claude', test: k => k.startsWith('sk-ant-'), color: '#D97706', emoji: '🟡', defaultModel: 'claude-haiku-4-5-20251001' },
    { id: 'openai',    name: 'OpenAI',           test: k => k.startsWith('sk-') && !k.startsWith('sk-ant-'), color: '#10B981', emoji: '🟢', defaultModel: 'gpt-4o-mini' },
    { id: 'qwen',      name: 'Qwen (Alibaba)',   test: () => false, color: '#3B82F6', emoji: '🔵', defaultModel: 'qwen-plus' },
  ];

  function detectProvider(key) {
    if (!key) return null;
    return PROVIDERS.find(p => p.test(key)) || null;
  }

  function getKey() { return localStorage.getItem(LS_KEY) || ''; }

  function saveKey(key) {
    if (key && key.trim()) localStorage.setItem(LS_KEY, key.trim());
    else localStorage.removeItem(LS_KEY);
  }

  async function ask(messages, { system, model, max_tokens = 1024 } = {}) {
    const key = getKey();
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
      body: JSON.stringify({
        provider: provider.id,
        key,
        messages,
        system,
        model: model || provider.defaultModel,
        max_tokens,
      }),
    });

    if (!res.ok) throw new Error(`API-Fehler (${res.status}): ${await res.text()}`);
    return res.json();
  }

  function extractText(response) {
    if (response?.content?.[0]?.text) return response.content[0].text;
    if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
    return '';
  }

  return { detectProvider, getKey, saveKey, ask, extractText, PROVIDERS };
})();
