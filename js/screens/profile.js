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

      <!-- Sign out -->
      <button onclick="Auth.signOut()"
        class="w-full bg-gray-700 hover:bg-gray-600 rounded-xl py-3 text-sm font-medium transition">
        Abmelden
      </button>
    `;

    document.getElementById('doc-upload-input').addEventListener('change', _handleUpload);
    _loadHistory(user);
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

  return { init, refresh };
})();
