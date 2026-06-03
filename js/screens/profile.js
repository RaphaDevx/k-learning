// ── Profile Screen ────────────────────────────────────────────────────────

window.ProfileScreen = (function () {

  async function init() { await _render(); }
  async function refresh() { await _render(); }

  async function _render() {
    const user = await Auth.getUser();
    if (!user) return;

    const avatar = user.user_metadata?.avatar_url || '';
    const name   = user.user_metadata?.full_name || user.email;
    const email  = user.email;
    const initials = name.trim()[0]?.toUpperCase() || '?';

    document.getElementById('profile-content').innerHTML = `

      <!-- Avatar + Info -->
      <div class="flex flex-col items-center pt-2 pb-6 mb-6" style="border-bottom:1px solid var(--border)">
        ${avatar
          ? `<img src="${avatar}" class="w-20 h-20 rounded-full mb-3 ring-2 ring-indigo-500" alt="Avatar">`
          : `<div class="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold mb-3">${initials}</div>`
        }
        <div class="font-bold text-xl" style="color:var(--txt)">${name}</div>
        <div class="text-sm mt-0.5" style="color:var(--txt-2)">${email}</div>
      </div>

      <!-- Doc Upload -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
        <h3 class="font-semibold mb-0.5" style="color:var(--txt)">Dokument hochladen</h3>
        <p class="text-xs mb-4" style="color:var(--txt-2)">PDF · DOCX · PPTX — wird an OCR-Pipeline übergeben</p>
        <label id="upload-label"
          class="flex flex-col items-center justify-center w-full rounded-2xl py-8 px-6 cursor-pointer transition text-center"
          style="border:1px dashed var(--border);opacity:0.65">
          <span class="text-3xl mb-2">📄</span>
          <span class="text-sm font-medium" style="color:var(--txt)">Datei auswählen oder hierher ziehen</span>
          <span class="text-xs mt-1" style="color:var(--txt-3)">Max. 50 MB</span>
          <input type="file" id="doc-upload-input" accept=".pdf,.docx,.pptx,.doc,.ppt" class="hidden">
        </label>
        <div id="upload-status" class="hidden mt-3 p-3 rounded-xl text-sm"></div>
      </div>

      <!-- Upload History -->
      <div class="rounded-[20px] p-4 mb-6" style="background:var(--card);border:1px solid var(--border)">
        <h3 class="font-semibold mb-3" style="color:var(--txt)">Meine Dokumente</h3>
        <div id="upload-history"><p class="text-sm" style="color:var(--txt-2)">Lade...</p></div>
      </div>

      <!-- KI-Einstellungen (BYOK) -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold" style="color:var(--txt)">KI-Einstellungen</h3>
          <span class="text-xs" style="color:var(--txt-3)">BYOK</span>
        </div>
        <p class="text-xs mb-3" style="color:var(--txt-2)">Dein API-Key wird verschlüsselt gespeichert und verlässt den Server nie.</p>
        <div id="ai-key-section"><p class="text-xs py-1" style="color:var(--txt-3)">Lade…</p></div>
      </div>

      <!-- Voice Chat (Gemini Live) -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold" style="color:var(--txt)">Voice Chat (Gemini Live)</h3>
          <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background:rgba(66,133,244,0.15);color:#4285f4">Google</span>
        </div>
        <p class="text-xs mb-3" style="color:var(--txt-2)">Aktiviert den Gemini-2.0-Flash-Live WebSocket-Modus im Audio-Lernen. Schlüssel wird nur lokal gespeichert — verlässt niemals den Browser.</p>
        <div id="gemini-key-section"></div>
      </div>

      <!-- Quiz-Themenstatistik -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold" style="color:var(--txt)">Quiz-Ergebnisse</h3>
          <button onclick="QuizScreen.showSelector()"
            class="text-xs px-2.5 py-1 rounded-full font-medium transition"
            style="background:rgba(99,102,241,0.15);color:#a5b4fc;border:1px solid rgba(99,102,241,0.25)">
            Quiz starten
          </button>
        </div>
        <div id="quiz-stats-content"><p class="text-sm" style="color:var(--txt-2)">Noch kein Quiz absolviert.</p></div>
      </div>

      <!-- Lernprofil -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold" style="color:var(--txt)">Lernprofil</h3>
          <span class="text-xs" style="color:var(--txt-3)">aus Prüfungen</span>
        </div>
        <div id="learning-profile-content"><p class="text-sm" style="color:var(--txt-2)">Lade…</p></div>
      </div>

      <!-- Sign out -->
      <button onclick="Auth.signOut()"
        class="tap-card w-full rounded-xl py-3 text-sm font-medium transition"
        style="background:var(--card);border:1px solid var(--border);color:var(--txt-2)">
        Abmelden
      </button>
    `;

    document.getElementById('doc-upload-input').addEventListener('change', _handleUpload);
    _loadHistory(user);
    _initAiKeyUI();
    _initGeminiKeyUI();
    _renderQuizStats();
    _loadLearningProfile(user);
  }

  async function _handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const status = document.getElementById('upload-status');
    status.classList.remove('hidden');
    status.className = 'mt-3 p-3 rounded-xl text-sm bg-gray-700 text-gray-300';
    status.textContent = `Lade hoch: ${file.name} …`;

    const user = await Auth.getUser();
    const path = `${user.id}/${Date.now()}_${file.name}`;

    const { error } = await _supabase.storage.from('documents').upload(path, file);

    if (error) {
      status.className = 'mt-3 p-3 rounded-xl text-sm bg-red-900 text-red-300';
      status.textContent = `Fehler: ${error.message}`;
    } else {
      status.className = 'mt-3 p-3 rounded-xl text-sm bg-green-900 text-green-300';
      status.textContent = `✓ ${file.name} hochgeladen · OCR in Warteschlange`;
      _loadHistory(user);
    }
    e.target.value = '';
  }

  async function _loadHistory(user) {
    const el = document.getElementById('upload-history');
    if (!el) return;

    const { data, error } = await _supabase.storage
      .from('documents')
      .list(user.id, { limit: 20, sortBy: { column: 'created_at', order: 'desc' } });

    if (error || !data?.length) {
      el.innerHTML = '<p class="text-gray-500 text-sm">Noch keine Dokumente hochgeladen.</p>';
      return;
    }

    el.innerHTML = data.map(f => {
      const displayName = f.name.replace(/^\d+_/, '');
      const date = f.created_at ? new Date(f.created_at).toLocaleDateString('de-CH') : '';
      return `
        <div class="flex items-center justify-between py-2.5 border-b border-gray-700 last:border-0">
          <div>
            <div class="text-sm font-medium text-white">${displayName}</div>
            ${date ? `<div class="text-xs text-gray-500">${date}</div>` : ''}
          </div>
          <span class="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded-full flex-shrink-0 ml-3">OCR</span>
        </div>`;
    }).join('');
  }

  async function _initAiKeyUI() {
    const section = document.getElementById('ai-key-section');
    if (!section) return;

    const info = await AIService.getKeyInfo();
    info?.key_preview ? _renderKeySet(section, info) : _renderKeyInput(section, null);
  }

  function _renderKeySet(section, info) {
    const p = AIService.PROVIDERS[info.ai_provider] || { name: info.ai_provider || 'API-Key', color: '#6B7280', emoji: '⚪' };
    section.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2.5 py-1 rounded-full" style="background:${p.color}22;color:${p.color}">${p.emoji} ${p.name}</span>
        <button id="ai-key-delete" class="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-900/30 transition">
          Löschen
        </button>
      </div>
      <div class="bg-gray-900 rounded-xl px-3 py-2 font-mono text-xs text-gray-500 mb-3 tracking-wider">
        ${info.key_preview}
      </div>
      <button id="ai-key-replace" class="text-xs text-indigo-400 hover:text-indigo-300 transition">
        Key ersetzen
      </button>
      <div id="ai-key-replace-form" class="hidden mt-3"></div>
      <div id="ai-key-msg" class="hidden mt-2 text-xs text-center rounded-lg py-1.5"></div>`;

    document.getElementById('ai-key-delete').addEventListener('click', async () => {
      const btn = document.getElementById('ai-key-delete');
      btn.textContent = '…'; btn.disabled = true;
      try {
        await AIService.saveKey('');
        _renderKeyInput(section, 'Key gelöscht.');
      } catch (e) {
        btn.textContent = 'Löschen'; btn.disabled = false;
        _showMsg(section, `Fehler: ${e.message}`, true);
      }
    });

    document.getElementById('ai-key-replace').addEventListener('click', () => {
      const form = document.getElementById('ai-key-replace-form');
      if (form.classList.contains('hidden')) {
        form.classList.remove('hidden');
        _wireKeyInput(form, section);
      } else {
        form.classList.add('hidden');
      }
    });
  }

  function _renderKeyInput(section, successMsg) {
    section.innerHTML = `
      ${successMsg ? `<p class="text-xs text-green-400 mb-3">${successMsg}</p>` : '<p class="text-xs text-gray-500 mb-3">Noch kein API-Key hinterlegt.</p>'}
      <div id="ai-key-input-wrap"></div>
      <div id="ai-key-msg" class="hidden mt-2 text-xs text-center rounded-lg py-1.5"></div>`;
    _wireKeyInput(document.getElementById('ai-key-input-wrap'), section);
  }

  function _wireKeyInput(container, section) {
    container.innerHTML = `
      <div class="relative mb-3">
        <input type="password" id="ai-key-input" placeholder="sk-ant-api0…"
          autocomplete="off" spellcheck="false"
          class="w-full bg-gray-900 rounded-xl px-4 py-3 pr-20 text-sm text-gray-200 font-mono">
        <button id="ai-key-toggle" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200 transition px-1">
          Anzeigen
        </button>
      </div>
      <div id="ai-key-detect" class="mb-3 h-5"></div>
      <button id="ai-key-save" class="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2.5 text-sm font-bold transition">
        Key speichern
      </button>`;

    const input  = document.getElementById('ai-key-input');
    const toggle = document.getElementById('ai-key-toggle');
    const detect = document.getElementById('ai-key-detect');
    const save   = document.getElementById('ai-key-save');

    input.addEventListener('input', () => {
      const k = input.value;
      const id = k.startsWith('sk-ant-') ? 'anthropic' : k.startsWith('sk-') ? 'openai' : null;
      if (id) {
        const p = AIService.PROVIDERS[id];
        detect.innerHTML = `<span class="text-xs px-2 py-0.5 rounded-full" style="background:${p.color}22;color:${p.color}">${p.emoji} ${p.name} erkannt</span>`;
      } else {
        detect.innerHTML = k ? '<span class="text-xs text-gray-500">Anbieter nicht erkannt</span>' : '';
      }
    });

    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Verbergen' : 'Anzeigen';
    });

    save.addEventListener('click', async () => {
      const key = input.value.trim();
      if (!key) return;
      save.disabled = true; save.textContent = '…';
      try {
        const result = await AIService.saveKey(key);
        input.value = '';
        _renderKeySet(section, { ai_provider: result.provider, key_preview: result.preview });
      } catch (e) {
        save.disabled = false; save.textContent = 'Key speichern';
        _showMsg(section, `Fehler: ${e.message}`, true);
      }
    });
  }

  function _initGeminiKeyUI() {
    const section = document.getElementById('gemini-key-section');
    if (!section) return;
    const key = GeminiLive.getKey();
    if (key) {
      _renderGeminiKeySet(section, key);
    } else {
      _renderGeminiKeyInput(section);
    }
  }

  function _renderGeminiKeySet(section, key) {
    const preview = key.slice(0, 8) + '••••••••' + key.slice(-4);
    section.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold px-2.5 py-1 rounded-full" style="background:rgba(66,133,244,0.15);color:#4285f4">🎙 Aktiv</span>
        <button id="gemini-key-delete" class="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg hover:bg-red-900/30 transition">Löschen</button>
      </div>
      <div class="rounded-xl px-3 py-2 font-mono text-xs mb-2 tracking-wider" style="background:var(--card-raised);color:var(--txt-3)">${preview}</div>
      <p class="text-xs" style="color:var(--txt-3)">Audio-Modus nutzt Gemini Live statt Browser-Spracherkennung.</p>`;

    document.getElementById('gemini-key-delete').addEventListener('click', () => {
      GeminiLive.saveKey(null);
      _renderGeminiKeyInput(section);
    });
  }

  function _renderGeminiKeyInput(section) {
    section.innerHTML = `
      <p class="text-xs mb-3" style="color:var(--txt-3)">Noch kein Gemini API-Key hinterlegt. Ohne Key wird der Browser-Fallback verwendet.</p>
      <div class="relative mb-3">
        <input type="password" id="gemini-key-input" placeholder="AIzaSy…"
          autocomplete="off" spellcheck="false"
          class="w-full rounded-xl px-4 py-3 pr-20 text-sm font-mono" style="background:var(--card-raised);color:var(--txt);border:1px solid var(--border)">
        <button id="gemini-key-toggle" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs transition px-1" style="color:var(--txt-3)">Anzeigen</button>
      </div>
      <button id="gemini-key-save" class="w-full rounded-xl py-2.5 text-sm font-bold transition" style="background:#4285f4;color:#fff">Key speichern</button>
      <p class="text-xs mt-2 text-center" style="color:var(--txt-3)">API-Key unter <a href="https://aistudio.google.com/app/apikey" target="_blank" class="underline" style="color:#4285f4">aistudio.google.com</a> erstellen (kostenlos)</p>`;

    const input  = document.getElementById('gemini-key-input');
    const toggle = document.getElementById('gemini-key-toggle');
    const save   = document.getElementById('gemini-key-save');

    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Verbergen' : 'Anzeigen';
    });

    save.addEventListener('click', () => {
      const k = input.value.trim();
      if (!k || !k.startsWith('AIza')) {
        input.style.borderColor = '#ef4444';
        setTimeout(() => input.style.borderColor = '', 2000);
        return;
      }
      GeminiLive.saveKey(k);
      _renderGeminiKeySet(section, k);
    });
  }

  async function _loadLearningProfile(user) {
    const el = document.getElementById('learning-profile-content');
    if (!el) return;

    // Prüfungs-Historie laden
    const { data: results } = await _supabase
      .from('exam_results')
      .select('exam_id, score_pct, taken_at')
      .eq('user_id', user.id)
      .order('taken_at', { ascending: false })
      .limit(10);

    // Topic-Schwächenprofil laden
    const { data: weights } = await _supabase
      .from('topic_weights')
      .select('topic_tag, wrong_count, correct_count, priority, ema_accuracy, correct_streak')
      .eq('user_id', user.id)
      .order('priority', { ascending: false })
      .limit(20);

    if (!results?.length && !weights?.length) {
      el.innerHTML = '<p class="text-gray-500 text-sm">Noch keine Prüfung abgeschlossen. Leg los im Prüfungs-Modus!</p>';
      return;
    }

    const examHtml = results?.length ? `
      <div class="mb-4">
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Letzte Prüfungen</p>
        ${results.map(r => {
          const pct = r.score_pct;
          const color = pct >= 65 ? 'text-green-400' : pct >= 45 ? 'text-yellow-400' : 'text-red-400';
          const date = new Date(r.taken_at).toLocaleDateString('de-CH');
          const label = r.exam_id.replace('esf-', 'ESF ').replace('stat-', 'Statistik ').toUpperCase();
          return `
            <div class="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
              <div class="text-sm text-gray-300">${label}</div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-gray-500">${date}</span>
                <span class="text-sm font-bold ${color}">${pct}%</span>
              </div>
            </div>`;
        }).join('')}
      </div>` : '';

    const topicHtml = weights?.length ? `
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Schwächenprofil nach Thema</p>
        ${weights.map(w => {
          const total = w.wrong_count + w.correct_count;
          if (total === 0) return '';
          // EMA nutzen wenn vorhanden (neuere Antworten stärker gewichtet), sonst Fallback auf Rohquote
          const pct = w.ema_accuracy != null
            ? Math.round(w.ema_accuracy * 100)
            : Math.round((w.correct_count / total) * 100);
          const streak = w.correct_streak || 0;
          const barColor = pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500';
          const badge = streak >= 3 ? 'Verstanden' : pct >= 70 ? 'Stark' : pct >= 40 ? 'Üben' : 'Fokus';
          const badgeColor = streak >= 3
            ? 'bg-emerald-900 text-emerald-300'
            : pct >= 70 ? 'bg-green-900 text-green-300'
            : pct >= 40 ? 'bg-yellow-900 text-yellow-300'
            : 'bg-red-900 text-red-300';
          const streakLabel = streak >= 2
            ? `<span class="text-xs text-emerald-400">${streak}× ✓</span>` : '';
          return `
            <div class="mb-2.5">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-gray-300">${w.topic_tag}</span>
                <div class="flex items-center gap-2">
                  ${streakLabel}
                  <span class="text-xs text-gray-500">${w.correct_count}/${total}</span>
                  <span class="text-xs px-1.5 py-0.5 rounded-full ${badgeColor}">${badge}</span>
                </div>
              </div>
              <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div class="${barColor} h-full rounded-full transition-all" style="width:${pct}%"></div>
              </div>
            </div>`;
        }).filter(Boolean).join('')}
      </div>` : '';

    el.innerHTML = examHtml + topicHtml;
  }

  function _renderQuizStats() {
    const el = document.getElementById('quiz-stats-content');
    if (!el) return;

    const stats = AppState.get('quizTopicStats') || {};
    const entries = Object.entries(stats).filter(([, s]) => s.total > 0);
    if (!entries.length) return;

    const sorted = entries.sort((a, b) => {
      const ra = a[1].correct / a[1].total;
      const rb = b[1].correct / b[1].total;
      return ra - rb;
    });

    const totalQ = entries.reduce((s, [, v]) => s + v.total, 0);
    const totalC = entries.reduce((s, [, v]) => s + v.correct, 0);
    const overallPct = Math.round((totalC / totalQ) * 100);

    el.innerHTML = `
      <div class="flex items-center gap-3 mb-4 p-3 rounded-xl" style="background:var(--card-raised)">
        <div class="text-2xl font-black" style="color:${overallPct >= 70 ? '#4ade80' : overallPct >= 50 ? '#fbbf24' : '#f87171'}">${overallPct}%</div>
        <div>
          <div class="text-xs font-semibold" style="color:var(--txt)">Gesamt-Trefferquote</div>
          <div class="text-xs" style="color:var(--txt-2)">${totalC} / ${totalQ} Fragen richtig</div>
        </div>
      </div>
      ${sorted.map(([topic, s]) => {
        const pct = Math.round((s.correct / s.total) * 100);
        const col = pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171';
        const badge = pct >= 70 ? 'Stark' : pct >= 50 ? 'Üben' : 'Fokus';
        const badgeBg = pct >= 70 ? 'rgba(22,163,74,0.15)' : pct >= 50 ? 'rgba(202,138,4,0.15)' : 'rgba(220,38,38,0.15)';
        return `
          <div class="mb-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs" style="color:var(--txt)">${topic}</span>
              <div class="flex items-center gap-2">
                <span class="text-xs" style="color:var(--txt-2)">${s.correct}/${s.total}</span>
                <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" style="background:${badgeBg};color:${col}">${badge}</span>
              </div>
            </div>
            <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.06)">
              <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${col}"></div>
            </div>
          </div>`;
      }).join('')}
    `;
  }

  function _showMsg(section, text, isError) {
    const msg = section.querySelector('#ai-key-msg');
    if (!msg) return;
    msg.textContent = text;
    msg.className = `mt-2 text-xs text-center rounded-lg py-1.5 ${isError ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`;
    setTimeout(() => msg.classList.add('hidden'), 4000);
  }

  return { init, refresh };
})();
