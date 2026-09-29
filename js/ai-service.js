// ── AI Service ────────────────────────────────────────────────────────────
// The API key NEVER leaves the server after being saved.
// Frontend only: save key (once), get display info, send messages.
// If an OpenRouter key is stored locally (kl_or_key), it is used directly
// for all AIService.ask() calls — no server proxy needed.

window.AIService = (function () {
  const PROXY_URL = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co/functions/v1/ai-proxy';
  const OR_URL    = 'https://openrouter.ai/api/v1/chat/completions';
  const OR_MODEL  = 'google/gemini-2.5-flash';
  const OR_LS_KEY = 'kl_or_key';

  const PROVIDERS = {
    anthropic:   { name: 'Anthropic Claude', color: '#D97706', emoji: '🟡' },
    openai:      { name: 'OpenAI',           color: '#10B981', emoji: '🟢' },
    qwen:        { name: 'Qwen (Alibaba)',   color: '#3B82F6', emoji: '🔵' },
    openrouter:  { name: 'OpenRouter',       color: '#6366F1', emoji: '🟣' },
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
    const orKey = localStorage.getItem(OR_LS_KEY);
    if (orKey) {
      return { key_preview: orKey.slice(0, 8) + '…', ai_provider: 'openrouter' };
    }
    const { data: { user } } = await _supabase.auth.getUser();
    if (!user) return null;
    const { data } = await _supabase
      .from('user_settings')
      .select('key_preview, ai_provider')
      .eq('user_id', user.id)
      .single();
    return data; // may be null if no key set
  }

  // Send a request via OpenRouter directly (browser-side, key in localStorage).
  async function _askViaOpenRouter(orKey, messages, { system, max_tokens = 1024 } = {}) {
    const allMessages = system
      ? [{ role: 'system', content: system }, ...messages]
      : messages;
    const res = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${orKey}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  'https://k-learning.pages.dev',
        'X-Title':       'K-Learning',
      },
      body: JSON.stringify({ model: OR_MODEL, messages: allMessages, max_tokens }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenRouter HTTP ${res.status}`);
    }
    return res.json(); // OpenAI-format response — extractText handles it
  }

  // Send a request to the AI proxy. The proxy reads the key from Vault server-side.
  // No key is sent from the browser.
  async function ask(messages, { system, model, max_tokens = 1024 } = {}) {
    const orKey = localStorage.getItem(OR_LS_KEY);
    if (orKey) return _askViaOpenRouter(orKey, messages, { system, max_tokens });

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
