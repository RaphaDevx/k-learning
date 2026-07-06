// ── AI Chat (v3.13.1) ─────────────────────────────────────────────────────
// Floating ✨ button + slide-up chat panel powered by OpenRouter BYOK.
// Key stored in localStorage only — never sent to any K-Learning server.

window.AIChat = (function () {
  const LS_KEY   = 'kl_or_key';
  const OR_URL   = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL    = 'google/gemini-2.5-flash';
  const SITE_URL = 'https://k-learning.pages.dev';

  let _history      = [];
  let _isOpen       = false;
  let _ctxCache     = {};
  let _sending      = false;
  let _externalCtx  = null; // set by ExamScreen for review mode

  // ── Key management ────────────────────────────────────────────────────────
  function getKey()  { return localStorage.getItem(LS_KEY) || ''; }
  function setKey(k) { k ? localStorage.setItem(LS_KEY, k) : localStorage.removeItem(LS_KEY); }

  // ── External context (exam review mode) ──────────────────────────────────
  function setExternalContext(ctx) {
    _externalCtx = ctx;
    _history = []; // fresh chat per question
    _updateContextBadge();
  }
  function clearExternalContext() { _externalCtx = null; }

  // ── Context ───────────────────────────────────────────────────────────────
  async function _loadCourseCtx(course) {
    if (!course) return '';
    if (_ctxCache[course] !== undefined) return _ctxCache[course];
    try {
      const slug = course.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/ii$/i, '2')
        .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
      const r = await fetch(`data/course-contexts/${slug}.md`);
      _ctxCache[course] = r.ok ? await r.text() : '';
    } catch { _ctxCache[course] = ''; }
    return _ctxCache[course];
  }

  function _getCardContext() {
    return window.FlashcardsScreen?.getCurrentCard?.() || null;
  }

  async function _buildSystem() {
    const base = `Du bist ein präziser Lernassistent für Schweizer Universitätsstudenten (HSG-Niveau).
Antworte immer auf Deutsch. Sei kurz, klar, lehrreich.
Nutze LaTeX-Notation ($...$) für inline-Formeln, ($$...$$) für Display-Formeln.
Wenn der Student etwas nicht versteht, erkläre es anders — mit Beispiel, Analogie oder Gegenbeispiel.`;

    // Exam review mode: external context takes priority
    if (_externalCtx) {
      const ctx = await _loadCourseCtx(_externalCtx.course || '');
      let sys = base;
      if (ctx) sys += `\n\n## Kurskontext: ${_externalCtx.course}\n${ctx}`;
      sys += `\n\n## Prüfungskorrektur — aktuelle Frage
**Kurs:** ${_externalCtx.course || '—'}
**Frage:** ${_externalCtx.questionText}
**Antwort des Studenten:** ${_externalCtx.userAnswer || '(keine Antwort)'}
**Korrekte Antwort:** ${_externalCtx.correctAnswer}
**Ergebnis:** ${_externalCtx.isCorrect ? '✅ Richtig' : '❌ Falsch'}
${_externalCtx.explanation ? `**Erklärung im Skript:** ${_externalCtx.explanation}` : ''}

Erkläre warum die Antwort korrekt oder falsch ist. Wenn der Student falsch lag, hilf ihm das Konzept zu verstehen. Stelle Rückfragen wenn nötig.`;
      return sys;
    }

    // Flashcard mode
    const card   = _getCardContext();
    const course = card?.course || '';
    const ctx    = await _loadCourseCtx(course);
    let sys = base;
    if (ctx) sys += `\n\n## Kurskontext: ${course}\n${ctx}`;
    if (card) {
      sys += `\n\n## Aktuelle Lernkarte
**Kurs:** ${card.course}  **Thema:** ${card.topic || '—'}
**Frage:** ${card.front}
**Antwort:** ${card.back}

Beantworte Fragen zu dieser Karte oder zum Kontext. Gib nie einfach die Antwort weg, sondern führe den Lernenden hin.`;
    }
    return sys;
  }

  // ── API ───────────────────────────────────────────────────────────────────
  async function _callOR(userMsg) {
    const key = getKey();
    if (!key) throw new Error('Kein OpenRouter-Key gesetzt. Bitte im Profil unter "KI-Chat" eintragen.');

    const system   = await _buildSystem();
    const messages = [..._history, { role: 'user', content: userMsg }];

    const res = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  SITE_URL,
        'X-Title':       'K-Learning',
      },
      body: JSON.stringify({
        model:      MODEL,
        messages:   [{ role: 'system', content: system }, ...messages],
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content || '';
    _history.push({ role: 'user', content: userMsg }, { role: 'assistant', content: reply });
    if (_history.length > 24) _history = _history.slice(-24);
    return reply;
  }

  // ── UI actions ────────────────────────────────────────────────────────────
  function toggle() { _isOpen ? close() : open(); }

  function open() {
    _isOpen = true;
    document.getElementById('ai-chat-panel')?.classList.add('open');
    document.getElementById('ai-chat-fab')?.classList.add('active');
    document.getElementById('ai-chat-backdrop')?.classList.add('show');
    _updateContextBadge();
    setTimeout(() => document.getElementById('ai-chat-input')?.focus(), 320);
  }

  function close() {
    _isOpen = false;
    document.getElementById('ai-chat-panel')?.classList.remove('open');
    document.getElementById('ai-chat-fab')?.classList.remove('active');
    document.getElementById('ai-chat-backdrop')?.classList.remove('show');
  }

  function _updateContextBadge() {
    const badge = document.getElementById('ai-chat-ctx-badge');
    if (!badge) return;
    badge.style.display = 'inline-block';
    if (_externalCtx) {
      badge.textContent = `${_externalCtx.course} — Prüfungsfrage`;
      return;
    }
    const card = _getCardContext();
    badge.textContent = card
      ? `${card.course} — ${card.topic || 'Aktuelle Karte'}`
      : 'Kein Kartenkontext';
  }

  async function sendMessage() {
    if (_sending) return;
    const input = document.getElementById('ai-chat-input');
    const msg   = input?.value?.trim();
    if (!msg) return;

    input.value = '';
    input.style.height = 'auto';
    _sending = true;

    _appendMsg('user', msg);
    const thinking = _appendThinking();

    try {
      const reply = await _callOR(msg);
      thinking.remove();
      _appendMsg('assistant', reply);
    } catch (e) {
      thinking.remove();
      _appendMsg('error', e.message);
    } finally {
      _sending = false;
      document.getElementById('ai-chat-send').disabled = false;
      input?.focus();
    }
  }

  function clearChat() {
    _history = [];
    const list = document.getElementById('ai-chat-messages');
    if (list) list.innerHTML = '<div class="ai-msg ai-msg-system">Chat geleert — neues Gespräch.</div>';
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────
  function _appendMsg(role, text) {
    const list = document.getElementById('ai-chat-messages');
    if (!list) return null;
    const div = document.createElement('div');
    div.className = `ai-msg ai-msg-${role}`;

    if (role === 'assistant') {
      div.innerHTML = _md(text);
      if (typeof renderMathInElement !== 'undefined') {
        setTimeout(() => renderMathInElement(div, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$',  right: '$',  display: false },
          ],
          throwOnError: false,
        }), 0);
      }
    } else {
      div.textContent = text;
    }

    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
    return div;
  }

  function _appendThinking() {
    const list = document.getElementById('ai-chat-messages');
    const div  = document.createElement('div');
    div.className = 'ai-msg ai-msg-thinking';
    div.innerHTML = '<span></span><span></span><span></span>';
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
    return div;
  }

  function _md(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/gs, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('ai-chat-fab')) return;
    _injectStyles();
    _injectDOM();
  }

  function _injectDOM() {
    // FAB
    const fab = document.createElement('button');
    fab.id = 'ai-chat-fab';
    fab.setAttribute('aria-label', 'KI-Assistent öffnen');
    fab.innerHTML = '✨';
    fab.addEventListener('click', toggle);
    document.body.appendChild(fab);

    // Backdrop
    const bd = document.createElement('div');
    bd.id = 'ai-chat-backdrop';
    bd.addEventListener('click', close);
    document.body.appendChild(bd);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'ai-chat-panel';
    panel.innerHTML = `
      <div class="ai-chat-header">
        <span style="font-size:1.1rem;line-height:1">✨</span>
        <span class="ai-chat-title">KI-Assistent</span>
        <span id="ai-chat-ctx-badge"></span>
        <button class="ai-chat-icon-btn" onclick="AIChat.clearChat()" title="Chat leeren">🗑</button>
        <button class="ai-chat-icon-btn" onclick="AIChat.close()" title="Schliessen">✕</button>
      </div>
      <div id="ai-chat-messages">
        <div class="ai-msg ai-msg-system">Frag mich zur aktuellen Lernkarte oder zum Kursinhalt.</div>
      </div>
      <div class="ai-chat-input-row">
        <textarea id="ai-chat-input" placeholder="Frage stellen…" rows="1"></textarea>
        <button id="ai-chat-send" onclick="AIChat.sendMessage()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;
    document.body.appendChild(panel);

    // Auto-resize textarea + Enter to send
    const inp = panel.querySelector('#ai-chat-input');
    inp.addEventListener('input', () => {
      inp.style.height = 'auto';
      inp.style.height = Math.min(inp.scrollHeight, 100) + 'px';
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  function _injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
#ai-chat-fab {
  position: fixed; bottom: 74px; right: 16px; z-index: 990;
  width: 46px; height: 46px; border-radius: 50%; border: none;
  background: linear-gradient(135deg,#6366f1,#8b5cf6);
  color: #fff; font-size: 1.2rem; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 18px rgba(99,102,241,.55);
  transition: transform .2s, box-shadow .2s;
}
#ai-chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(99,102,241,.7); }
#ai-chat-fab.active { background: linear-gradient(135deg,#4f46e5,#7c3aed); }

#ai-chat-backdrop {
  position: fixed; inset: 0; z-index: 988;
  background: rgba(0,0,0,.45); backdrop-filter: blur(2px);
  display: none;
}
#ai-chat-backdrop.show { display: block; }

#ai-chat-panel {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 989;
  max-width: 500px; margin: 0 auto;
  height: 74vh;
  background: #131320;
  border-radius: 22px 22px 0 0;
  border: 1px solid rgba(99,102,241,.25); border-bottom: none;
  display: flex; flex-direction: column;
  transform: translateY(100%);
  transition: transform .35s cubic-bezier(.32,.72,0,1);
  box-shadow: 0 -8px 48px rgba(0,0,0,.6);
}
#ai-chat-panel.open { transform: translateY(0); }

.ai-chat-header {
  display: flex; align-items: center; gap: .5rem;
  padding: .8rem 1rem .6rem;
  border-bottom: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.ai-chat-title {
  font-weight: 700; font-size: .9rem; color: #e2e8f0; flex: 1;
}
#ai-chat-ctx-badge {
  font-size: .65rem; color: #a5b4fc;
  background: rgba(99,102,241,.15);
  border: 1px solid rgba(99,102,241,.3);
  padding: .15rem .6rem; border-radius: 999px;
  max-width: 160px; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
}
.ai-chat-icon-btn {
  background: none; border: none; color: #6b7280;
  cursor: pointer; font-size: 1rem; padding: .25rem .3rem;
  border-radius: 8px; transition: color .15s, background .15s;
  display: flex; align-items: center;
}
.ai-chat-icon-btn:hover { color: #e2e8f0; background: rgba(255,255,255,.08); }

#ai-chat-messages {
  flex: 1; overflow-y: auto; padding: .75rem 1rem;
  display: flex; flex-direction: column; gap: .55rem;
  scrollbar-width: thin; scrollbar-color: #2d2d4e transparent;
}

.ai-msg {
  max-width: 88%; padding: .5rem .75rem;
  border-radius: 16px; font-size: .82rem; line-height: 1.55;
  word-break: break-word;
}
.ai-msg-user {
  align-self: flex-end; background: #4f46e5; color: #fff;
  border-bottom-right-radius: 5px;
}
.ai-msg-assistant {
  align-self: flex-start; background: rgba(255,255,255,.08); color: #e2e8f0;
  border-bottom-left-radius: 5px;
}
.ai-msg-assistant code {
  background: rgba(0,0,0,.35); padding: .1em .35em;
  border-radius: 4px; font-size: .83em; font-family: monospace;
}
.ai-msg-error {
  align-self: flex-start; background: rgba(239,68,68,.12);
  color: #fca5a5; border: 1px solid rgba(239,68,68,.3);
  border-radius: 12px; font-size: .78rem;
}
.ai-msg-system {
  align-self: center; color: #4b5563;
  font-size: .72rem; font-style: italic; max-width: 100%; text-align: center;
}
.ai-msg-thinking {
  align-self: flex-start; display: flex; gap: 4px;
  padding: .6rem .75rem; background: rgba(255,255,255,.08);
  border-radius: 16px; border-bottom-left-radius: 5px;
}
.ai-msg-thinking span {
  width: 6px; height: 6px; border-radius: 50%; background: #6366f1;
  animation: aib 1.2s infinite ease-in-out;
}
.ai-msg-thinking span:nth-child(2) { animation-delay: .2s; }
.ai-msg-thinking span:nth-child(3) { animation-delay: .4s; }
@keyframes aib {
  0%,80%,100% { transform:scale(.6); opacity:.4; }
  40% { transform:scale(1); opacity:1; }
}

.ai-chat-input-row {
  display: flex; align-items: flex-end; gap: .5rem;
  padding: .6rem .75rem max(.6rem, env(safe-area-inset-bottom));
  border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0;
}
#ai-chat-input {
  flex: 1; background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.12); border-radius: 14px;
  padding: .55rem .75rem; color: #e2e8f0; font-size: .85rem;
  resize: none; outline: none; font-family: inherit;
  max-height: 100px; min-height: 38px; line-height: 1.4;
  transition: border-color .15s;
}
#ai-chat-input:focus { border-color: rgba(99,102,241,.55); }
#ai-chat-input::placeholder { color: #374151; }
#ai-chat-send {
  width: 38px; height: 38px; border-radius: 12px; border: none;
  background: #4f46e5; color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: background .2s;
}
#ai-chat-send:hover { background: #4338ca; }
#ai-chat-send:disabled { background: #1f2937; cursor: default; }
    `;
    document.head.appendChild(s);
  }

  return { init, toggle, open, close, sendMessage, clearChat, getKey, setKey, setExternalContext, clearExternalContext };
})();
