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
      <div class="flex flex-col items-center pt-2 pb-6 border-b border-gray-700 mb-6">
        ${avatar
          ? `<img src="${avatar}" class="w-20 h-20 rounded-full mb-3 ring-2 ring-indigo-500" alt="Avatar">`
          : `<div class="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold mb-3">${initials}</div>`
        }
        <div class="font-bold text-xl">${name}</div>
        <div class="text-gray-400 text-sm mt-0.5">${email}</div>
      </div>

      <!-- Doc Upload -->
      <div class="bg-gray-800 rounded-2xl p-4 mb-4">
        <h3 class="font-bold mb-0.5">Dokument hochladen</h3>
        <p class="text-gray-400 text-xs mb-3">PDF · DOCX · PPTX — wird an OCR-Pipeline übergeben</p>
        <label id="upload-label"
          class="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-600 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition text-center">
          <span class="text-4xl mb-2">📄</span>
          <span class="text-sm text-gray-300 font-medium">Datei auswählen oder hierher ziehen</span>
          <span class="text-xs text-gray-500 mt-1">Max. 50 MB</span>
          <input type="file" id="doc-upload-input" accept=".pdf,.docx,.pptx,.doc,.ppt" class="hidden">
        </label>
        <div id="upload-status" class="hidden mt-3 p-3 rounded-xl text-sm"></div>
      </div>

      <!-- Upload History -->
      <div class="bg-gray-800 rounded-2xl p-4 mb-6">
        <h3 class="font-bold mb-3">Meine Dokumente</h3>
        <div id="upload-history"><p class="text-gray-500 text-sm">Lade...</p></div>
      </div>

      <!-- KI-Einstellungen -->
      <div class="bg-gray-800 rounded-2xl p-4 mb-4">
        <h3 class="font-bold mb-0.5">KI-Einstellungen</h3>
        <p class="text-gray-400 text-xs mb-3">API-Key für KI-gestützte Prüfungskorrektur</p>
        <div id="ai-provider-badge" class="mb-3"></div>
        <div class="relative">
          <input type="password" id="ai-key-input" placeholder="sk-ant-..."
            autocomplete="off" spellcheck="false"
            class="w-full bg-gray-900 rounded-xl px-4 py-3 pr-24 text-sm text-gray-200 font-mono">
          <button id="ai-key-toggle"
            class="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 text-xs px-1 py-1">
            Anzeigen
          </button>
          <button id="ai-key-clear"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm leading-none px-1">
            ✕
          </button>
        </div>
        <button id="ai-key-save"
          class="mt-3 w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-2.5 text-sm font-bold transition">
          Key speichern
        </button>
        <div id="ai-key-msg" class="hidden mt-2 text-xs text-center rounded-lg py-1.5"></div>
      </div>

      <!-- Sign out -->
      <button onclick="Auth.signOut()"
        class="w-full bg-gray-700 hover:bg-gray-600 rounded-xl py-3 text-sm font-medium transition">
        Abmelden
      </button>
    `;

    document.getElementById('doc-upload-input').addEventListener('change', _handleUpload);
    _loadHistory(user);
    _initAiKeyUI();
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
    const input  = document.getElementById('ai-key-input');
    const badge  = document.getElementById('ai-provider-badge');
    const toggle = document.getElementById('ai-key-toggle');
    const clear  = document.getElementById('ai-key-clear');
    const save   = document.getElementById('ai-key-save');
    const msg    = document.getElementById('ai-key-msg');
    if (!input) return;

    // Load from Supabase
    badge.innerHTML = '<span class="text-xs text-gray-500">Lade…</span>';
    const stored = await AIService.loadKey();
    if (stored) input.value = stored;
    _updateBadge(stored);

    function _updateBadge(key) {
      const p = AIService.detectProvider(key);
      badge.innerHTML = p
        ? `<span class="text-xs font-bold px-2 py-1 rounded-full" style="background:${p.color}22;color:${p.color}">${p.emoji} ${p.name}</span>`
        : '<span class="text-xs text-gray-500">Kein Anbieter erkannt</span>';
    }

    input.addEventListener('input', () => _updateBadge(input.value));

    toggle.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Verbergen' : 'Anzeigen';
    });

    clear.addEventListener('click', async () => {
      input.value = '';
      await AIService.saveKey('');
      _updateBadge('');
      _showMsg('Key gelöscht', false);
    });

    save.addEventListener('click', async () => {
      save.disabled = true;
      save.textContent = '…';
      try {
        const key = input.value.trim();
        await AIService.saveKey(key);
        const p = AIService.detectProvider(key);
        _updateBadge(key);
        _showMsg(key ? `Gespeichert${p ? ` · ${p.name}` : ''}` : 'Key gelöscht', false);
      } catch (e) {
        _showMsg(`Fehler: ${e.message}`, true);
      } finally {
        save.disabled = false;
        save.textContent = 'Key speichern';
      }
    });

    function _showMsg(text, isError) {
      msg.textContent = text;
      msg.className = `mt-2 text-xs text-center rounded-lg py-1.5 ${isError ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`;
      setTimeout(() => msg.classList.add('hidden'), 3000);
    }
  }

  return { init, refresh };
})();
