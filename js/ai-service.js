// ── AI Service ────────────────────────────────────────────────────────────
// The API key NEVER leaves the server after being saved.
// Frontend only: save key (once), get display info, send messages.

window.AIService = (function () {
  const PROXY_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co/functions/v1/ai-proxy';

  const PROVIDERS = {
    anthropic: { name: 'Anthropic Claude', color: '#D97706', emoji: '🟡' },
    openai:    { name: 'OpenAI',           color: '#10B981', emoji: '🟢' },
    qwen:      { name: 'Qwen (Alibaba)',   color: '#3B82F6', emoji: '🔵' },
  };

  // Called once when user submits a new key in the profile screen.
  // The key travels over HTTPS to Supabase and is stored encrypted in Vault.
  // It is never returned to the browser again.
  async function saveKey(key) {
    const { data, error } = await _supabase.rpc('save_ai_key', { p_key: key ?? '' });
    if (error) throw new Error(error.message);
    return data; // { ok, provider, preview }
  }

  // Returns display-only info: { key_preview, ai_provider } — never the real key.
  async function getKeyInfo() {
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return null;
    const { data } = await _supabase
      .from('user_settings')
      .select('key_preview, ai_provider')
      .eq('user_id', user.id)
      .single();
    return data; // may be null if no key set
  }

  // Send a request to the AI proxy. The proxy reads the key from Vault server-side.
  // No key is sent from the browser.
  async function ask(messages, { system, model, max_tokens = 1024 } = {}) {
    const { data: { session } } = await _supabase.auth.getSession();
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ messages, system, model, max_tokens }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `HTTP ${res.status}`);
    }
    return res.json();
  }

  function extractText(response) {
    if (response?.content?.[0]?.text) return response.content[0].text;
    if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
    return '';
  }

  return { saveKey, getKeyInfo, ask, extractText, PROVIDERS };
})();
