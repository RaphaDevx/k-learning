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
      <div class="mb-4">
        <h3 class="font-semibold mb-3 px-1" style="color:var(--txt)">Lernprofil</h3>
        <div id="learning-profile-cards" class="space-y-3">
          <p class="text-sm px-1" style="color:var(--txt-2)">Lade…</p>
        </div>
      </div>

      ${user.id === '1a834dc1-1c0e-4d4f-ac50-e790deb8f8c7' ? `
      <!-- Admin Panel -->
      <div class="rounded-[20px] p-4 mb-4" style="background:var(--card);border:1px solid rgba(239,68,68,0.3)">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm font-semibold" style="color:#f87171">Admin</span>
          <span class="text-xs px-2 py-0.5 rounded-full" style="background:rgba(239,68,68,0.15);color:#f87171">Gemeldete Karten</span>
        </div>
        <div id="admin-reports-content"><p class="text-xs" style="color:var(--txt-3)">Lade…</p></div>
      </div>
      ` : ''}

      <!-- Sign out -->
      <button onclick="Auth.signOut()"
        class="tap-card w-full rounded-xl py-3 text-sm font-medium transition"
        style="background:var(--card);border:1px solid var(--border);color:var(--txt-2)">
        Abmelden
      </button>

      <!-- App Version -->
      <div class="text-center mt-6 pb-2">
        <span class="text-xs font-mono px-2.5 py-1 rounded-full" style="background:rgba(99,102,241,0.12);color:var(--txt-3);border:1px solid rgba(99,102,241,0.2)">K-Learning v3.12.1</span>
      </div>
    `;

    document.getElementById('doc-upload-input').addEventListener('change', _handleUpload);
    _loadHistory(user);
    _initAiKeyUI();
    _initGeminiKeyUI();
    _renderQuizStats();
    _loadLearningProfile(user);
    if (user.id === '1a834dc1-1c0e-4d4f-ac50-e790deb8f8c7') _loadAdminReports();
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

    // 1. Upload to Storage
    const { error: uploadError } = await _supabase.storage.from('documents').upload(path, file);
    if (uploadError) {
      status.className = 'mt-3 p-3 rounded-xl text-sm bg-red-900 text-red-300';
      status.textContent = `Upload-Fehler: ${uploadError.message}`;
      e.target.value = '';
      return;
    }

    status.textContent = `✓ Hochgeladen — wird in die Warteschlange eingereiht…`;

    // 2. Queue for processing via Edge Function
    try {
      const { data: { session } } = await _supabase.auth.getSession();
      const resp = await fetch(
        'https://ifmwcgwfvunjbnfwwbtr.supabase.co/functions/v1/queue-document',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file_path:     path,
            original_name: file.name,
            file_size:     file.size,
            mime_type:     file.type || 'application/pdf',
          }),
        }
      );
      const result = await resp.json();
      if (!resp.ok) throw new Error(result.error || 'Queue-Fehler');

      status.className = 'mt-3 p-3 rounded-xl text-sm bg-green-900 text-green-300';
      status.textContent = `✓ ${file.name} — OCR läuft (Job ${result.queue_id?.slice(0,8)}…)`;
    } catch (qErr) {
      // Upload succeeded but queueing failed — show warning, not error
      status.className = 'mt-3 p-3 rounded-xl text-sm bg-yellow-900 text-yellow-300';
      status.textContent = `✓ Hochgeladen, aber Queue-Fehler: ${qErr.message}`;
    }

    _loadHistory(user);
    e.target.value = '';
  }

  async function _loadHistory(user) {
    const el = document.getElementById('upload-history');
    if (!el) return;

    // Load from processing_queue (real status) instead of storage listing
    const { data, error } = await _supabase
      .from('processing_queue')
      .select('id, original_name, status, doc_type, course, created_at, error_message, document_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error || !data?.length) {
      el.innerHTML = '<p class="text-sm" style="color:var(--txt-3)">Noch keine Dokumente hochgeladen.</p>';
      return;
    }

    const statusBadge = {
      pending:    { cls: 'bg-yellow-900 text-yellow-300', label: '⏳ Wartet' },
      processing: { cls: 'bg-blue-900 text-blue-300',    label: '⚙️ OCR läuft' },
      completed:  { cls: 'bg-green-900 text-green-300',  label: '✓ Fertig' },
      error:      { cls: 'bg-red-900 text-red-300',      label: '✗ Fehler' },
    };
    const typeIcon = { exam: '📝', lecture: '📖', exercise: '✏️', solution: '✅', other: '📄' };

    el.innerHTML = data.map(item => {
      const badge = statusBadge[item.status] || statusBadge.pending;
      const date  = item.created_at ? new Date(item.created_at).toLocaleDateString('de-CH') : '';
      const icon  = typeIcon[item.doc_type] || '📄';
      const courseTag = item.course ? `<span class="text-xs text-gray-400">${item.course}</span>` : '';
      const examBtn = item.status === 'completed' && item.doc_type === 'exam' && item.document_id
        ? `<button onclick="ProfileScreen.reviewExamDraft('${item.document_id}')"
             class="text-xs px-2 py-0.5 rounded-full bg-purple-900 text-purple-300 ml-2 hover:bg-purple-800">
             Prüfung prüfen →</button>`
        : '';
      const errTip = item.error_message
        ? `title="${item.error_message.replace(/"/g, "'")}"` : '';

      return `
        <div class="flex items-center justify-between py-2.5 border-b border-gray-700 last:border-0" ${errTip}>
          <div class="flex-1 min-w-0 mr-3">
            <div class="text-sm font-medium text-white truncate">${icon} ${item.original_name}</div>
            <div class="flex items-center gap-2 mt-0.5">${courseTag}${date ? `<span class="text-xs text-gray-500">${date}</span>` : ''}${examBtn}</div>
          </div>
          <span class="text-xs px-2 py-1 rounded-full flex-shrink-0 ${badge.cls}">${badge.label}</span>
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

  // ── Lernprofil: pro Kurs eine Karte mit Etappen + Gesamt-Fortschritt ─────

  async function _loadLearningProfile(user) {
    const el = document.getElementById('learning-profile-cards');
    if (!el) return;

    const [{ data: examResults }, { data: weights }, { data: deckCards }, { data: allVideos }, { data: myVideoProgress }, enrolled] = await Promise.all([
      _supabase.from('exam_results').select('id, exam_id, score_pct, taken_at, answers').eq('user_id', user.id),
      _supabase.from('topic_weights')
        .select('topic_tag, wrong_count, correct_count, priority, ema_accuracy, correct_streak')
        .eq('user_id', user.id).limit(200),
      _supabase.from('deck_cards').select('id, course, topic'),
      _supabase.from('videos').select('id, course'),
      _supabase.from('video_progress').select('video_id, last_rating, review_count').eq('user_id', user.id),
      CoursesDB.getEnrolledKeys(),
    ]);

    if (!enrolled?.length) {
      el.innerHTML = '<p class="text-sm px-1" style="color:var(--txt-2)">Noch keine Kurse ausgewählt.</p>';
      return;
    }

    const weightsByTag = new Map((weights || []).map(w => [w.topic_tag, w]));
    const quizStats = AppState.get('quizTopicStats') || {};
    const quizCourseStats = AppState.get('quizCourseStats') || {};

    // Flashcard-Abdeckung pro Kurs (unabhängig von window.FLASHCARD_DATA)
    const flashcardCoverage = {};
    (deckCards || []).forEach(c => {
      if (!flashcardCoverage[c.course]) flashcardCoverage[c.course] = { total: 0, done: 0 };
      flashcardCoverage[c.course].total++;
      if (AppState.getCardProgress(c.id).reviews > 0) flashcardCoverage[c.course].done++;
    });
    Object.keys(flashcardCoverage).forEach(k => {
      const c = flashcardCoverage[k];
      flashcardCoverage[k] = c.total ? c.done / c.total : null;
    });

    // Video-Abdeckung pro Kurs: 'knew' → 1.0, watched (review_count>0) → 0.25, ungesehen → 0
    const videoCoverage = {};
    const vpByVideoId = new Map((myVideoProgress || []).map(p => [p.video_id, p]));
    (allVideos || []).forEach(v => {
      if (!v.course) return;
      if (!videoCoverage[v.course]) videoCoverage[v.course] = { total: 0, scoreSum: 0, kapiert: 0 };
      videoCoverage[v.course].total++;
      const p = vpByVideoId.get(v.id);
      if (p) {
        const score = p.last_rating === 'knew' ? 1.0 : (p.review_count > 0 ? 0.25 : 0);
        videoCoverage[v.course].scoreSum += score;
        if (p.last_rating === 'knew') videoCoverage[v.course].kapiert++;
      }
    });
    // Normalize to 0..1
    Object.keys(videoCoverage).forEach(k => {
      const c = videoCoverage[k];
      videoCoverage[k] = { pct: c.total ? c.scoreSum / c.total : null, kapiert: c.kapiert, total: c.total };
    });

    const ctx = { examResults: examResults || [], weightsByTag, quizStats, quizCourseStats, flashcardCoverage, videoCoverage };

    el.innerHTML = enrolled.map(courseKey =>
      window.TOPICS_DATA?.[courseKey]
        ? _renderCourseCard(courseKey, ctx)
        : _renderSimpleCourseCard(courseKey, ctx)
    ).join('');
  }

  // exam_id → Kurs-Zuordnung (QUIZ_REGISTRY-Lookup mit Präfix-Fallback)
  function _examIdToCourse(examId) {
    const entry = window.QuizScreen?.QUIZ_REGISTRY?.find(q => q.id === examId);
    if (entry) return entry.course;
    if (examId.startsWith('stat'))  return 'Statistik';
    if (examId.startsWith('makro')) return 'MakroII';
    if (examId.startsWith('esf'))   return 'ESF';
    if (examId.startsWith('om'))    return 'OM';
    if (examId.startsWith('bwl'))   return 'BWL';
    if (examId.startsWith('eng'))   return 'EnglischC1';
    return null;
  }

  function _topicWeightAccuracy(w) {
    const total = w.wrong_count + w.correct_count;
    if (total === 0) return null;
    return w.ema_accuracy != null ? w.ema_accuracy : w.correct_count / total;
  }

  // Pro-Etappe-Fortschritt: Mix aus Quiz/Exam-Signal + Lernset-Signal, 0..1 oder null ("nicht begonnen")
  // courseTagStats: { [tag]: { correct, total } } — kurs-spezifisch, nach Tag-Name indiziert
  function _etappePct(courseKey, etappe, courseTagStats, weightsByTag) {
    const scores = [];
    (etappe.tags || []).forEach(tag => {
      const s = courseTagStats[tag];
      if (s && s.total > 0) scores.push(s.correct / s.total);
      const w = weightsByTag.get(tag);
      const acc = w ? _topicWeightAccuracy(w) : null;
      if (acc != null) scores.push(acc);
    });
    const quizPct = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

    const items = (window.LERNSET_DATA || []).filter(i => i.course === courseKey && i.topic === etappe.title);
    const attempted = items.map(i => AppState.getLernsetProgress(i.id)).filter(p => p.attempts > 0);
    const lernsetPct = attempted.length ? attempted.reduce((a, p) => a + p.bestScore, 0) / attempted.length : null;

    if (quizPct == null && lernsetPct == null) return null;
    if (quizPct == null) return lernsetPct;
    if (lernsetPct == null) return quizPct;
    return quizPct * 0.65 + lernsetPct * 0.35;
  }

  // Bereitschafts-Score: Lernen gibt Punkte, Prüfung korrigiert nach oben/unten.
  // fcSeenPct:  % gesehener Karten (0..1)  — niedrig, kann ohne Wissen geklickt werden
  // fcAccPct:   EMA-Accuracy topic_weights (0..1) — sehr niedrig
  // videoAvg:   Reels gesehen/kapiert (0..1) — niedrig, passives Medium
  // lernsetAvg: Ø bestScore Lernset-Übungen (0..1) — mittel
  // quizAvg:    Ø Quiz-Trefferquote (0..1) — hoch
  // examAvg:    Ø Prüfungs-Score (0..1)    — dominiert, zieht hoch oder runter
  function _readinessScore({ fcSeenPct, fcAccPct, videoAvg, lernsetAvg, quizAvg, examAvg }) {
    const comps = [];
    if (fcSeenPct  != null) comps.push({ val: fcSeenPct,  w: 0.12 });
    if (fcAccPct   != null) comps.push({ val: fcAccPct,   w: 0.05 });
    if (videoAvg   != null) comps.push({ val: videoAvg,   w: 0.08 });
    if (lernsetAvg != null) comps.push({ val: lernsetAvg, w: 0.28 });
    if (quizAvg    != null) comps.push({ val: quizAvg,    w: 0.47 });
    const totalW   = comps.reduce((s, c) => s + c.w, 0);
    const studyRaw = totalW > 0 ? comps.reduce((s, c) => s + c.val * c.w, 0) / totalW : null;
    if (examAvg == null) return studyRaw != null ? Math.round(studyRaw * 100) : 0;
    const base = studyRaw != null ? studyRaw * 0.45 + examAvg * 0.55 : examAvg;
    return Math.round(base * 100);
  }

  // Schweizer Note (1–6, halbe Schritte) aus score_pct (0–100)
  function _gradeFromPct(pct) {
    const raw = 1 + 5 * (pct / 100);
    return (Math.round(Math.max(1, Math.min(6, raw)) * 2) / 2).toFixed(1);
  }

  function _overallColor(pct) {
    return pct >= 70 ? '#4ade80' : pct >= 40 ? '#fbbf24' : '#f87171';
  }

  // Banner: zeigt letzte Prüfung (Score + Note), oder "Keine Daten"
  function _examBannerHtml(results) {
    if (!results?.length) {
      return `
        <div class="flex items-center justify-between px-3 py-2 rounded-xl mb-3"
             style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
          <span class="text-xs" style="color:var(--txt-3)">Letzte Prüfung</span>
          <span class="text-xs italic" style="color:var(--txt-3)">Keine Daten</span>
        </div>`;
    }
    const sorted  = [...results].sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at));
    const latest  = sorted[0];
    const lPct    = latest.score_pct;
    const lGrade  = _gradeFromPct(lPct);
    const lColor  = _overallColor(lPct);
    const avgPct  = Math.round(results.reduce((s, r) => s + r.score_pct, 0) / results.length);
    const aGrade  = _gradeFromPct(avgPct);
    const aColor  = _overallColor(avgPct);
    return `
      <div class="flex items-center justify-between px-3 py-2.5 rounded-xl mb-3"
           style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
        <div>
          <div class="text-xs mb-1" style="color:var(--txt-3)">Letzte Prüfung</div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold" style="color:${lColor}">${lPct}%</span>
            <span class="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style="background:${lColor}22;color:${lColor}">Note ${lGrade}</span>
          </div>
        </div>
        ${results.length > 1 ? `
          <div class="text-right">
            <div class="text-xs mb-1" style="color:var(--txt-3)">Ø ${results.length} Prüfungen</div>
            <div class="flex items-center gap-2 justify-end">
              <span class="text-sm font-bold" style="color:${aColor}">${avgPct}%</span>
              <span class="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style="background:${aColor}22;color:${aColor}">Ø Note ${aGrade}</span>
            </div>
          </div>` : ''}
      </div>`;
  }

  function _etappeBarHtml(et) {
    const pct = et.pct;
    const display = pct == null ? 0 : Math.round(pct * 100);
    const label = pct == null ? 'Neu' : `${display}%`;
    const color = pct == null ? 'rgba(255,255,255,0.15)' : _overallColor(display);
    return `
      <div>
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs" style="color:var(--txt)">${et.emoji} ${et.short}</span>
          <span class="text-xs" style="color:var(--txt-2)">${label}</span>
        </div>
        <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.06)">
          <div class="h-1.5 rounded-full transition-all" style="width:${display}%;background:${color}"></div>
        </div>
      </div>`;
  }

  function _detailsToggleHtml() {
    return `
      <button onclick="ProfileScreen._toggleDetails(this)" aria-expanded="false"
        class="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition"
        style="background:var(--card-raised);color:var(--txt-2)">
        <span>Details</span>
        <span class="details-arrow transition-transform inline-block" style="font-size:0.7rem">▶</span>
      </button>`;
  }

  function _toggleDetails(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = btn.nextElementSibling;
    panel.classList.toggle('hidden', expanded);
    const arrow = btn.querySelector('.details-arrow');
    if (arrow) arrow.style.transform = expanded ? '' : 'rotate(90deg)';
  }

  function _renderCourseCard(courseKey, ctx) {
    const { examResults, weightsByTag, quizCourseStats, flashcardCoverage, videoCoverage } = ctx;
    const topicsData = window.TOPICS_DATA[courseKey];
    const course = window.getCourse?.(courseKey);
    const label = course?.label || courseKey;

    const courseTagStats = quizCourseStats?.[courseKey] || {};
    const etappen = topicsData.topics.map(et => ({ ...et, pct: _etappePct(courseKey, et, courseTagStats, weightsByTag) }));
    const started = etappen.map(e => e.pct).filter(p => p != null);
    const etappenAvg = started.length ? started.reduce((a, b) => a + b, 0) / started.length : null;

    const quizEntries = Object.values(courseTagStats).filter(s => s.total > 0);
    const quizAvg = quizEntries.length ? quizEntries.reduce((s, e) => s + e.correct / e.total, 0) / quizEntries.length : null;

    const courseExamResults = examResults.filter(r => _examIdToCourse(r.exam_id) === courseKey);
    const examAvg = courseExamResults.length
      ? courseExamResults.reduce((s, r) => s + r.score_pct, 0) / courseExamResults.length / 100
      : null;

    const fcPct = flashcardCoverage[courseKey] ?? null;

    const allTags = new Set(topicsData.topics.flatMap(t => t.tags || []));
    const courseWeights = [...weightsByTag.values()].filter(w => allTags.has(w.topic_tag));
    const accVals = courseWeights.map(_topicWeightAccuracy).filter(v => v != null);
    const fcAccAvg = accVals.length ? accVals.reduce((a, b) => a + b, 0) / accVals.length : null;

    const vidData  = videoCoverage?.[courseKey] ?? null;
    const videoAvg = vidData?.pct ?? null;

    const readiness = _readinessScore({ fcSeenPct: fcPct, fcAccPct: fcAccAvg, videoAvg, lernsetAvg: etappenAvg, quizAvg, examAvg });

    const detailsHtml = _weaknessProfileHtml(courseWeights) + _quizTopicBarsHtml(courseTagStats) + _videoSummaryHtml(vidData);

    return `
      <div class="rounded-[20px] p-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">${topicsData.emoji}</span>
            <h3 class="font-semibold" style="color:var(--txt)">${label}</h3>
          </div>
          <div class="text-right">
            <div class="text-xs mb-0.5" style="color:var(--txt-3)">Bereitschaft</div>
            <div class="text-2xl font-black" style="color:${_overallColor(readiness)}">${readiness}%</div>
          </div>
        </div>
        ${_examHistoryHtml(courseExamResults)}
        <div class="space-y-2 mb-3">
          ${etappen.map(_etappeBarHtml).join('')}
        </div>
        ${detailsHtml ? _detailsToggleHtml() : ''}
        ${detailsHtml ? `<div class="hidden mt-3 pt-3" style="border-top:1px solid var(--border)">${detailsHtml}</div>` : ''}
      </div>`;
  }

  function _renderSimpleCourseCard(courseKey, ctx) {
    const { examResults, flashcardCoverage, videoCoverage } = ctx;
    const course = window.getCourse?.(courseKey);
    const label = course?.label || courseKey;
    const emoji = course?.icon || '📘';

    const courseExamResults = examResults.filter(r => _examIdToCourse(r.exam_id) === courseKey);
    const examAvg = courseExamResults.length
      ? courseExamResults.reduce((s, r) => s + r.score_pct, 0) / courseExamResults.length / 100
      : null;
    const fcPct    = flashcardCoverage[courseKey] ?? null;
    const vidData  = videoCoverage?.[courseKey] ?? null;
    const videoAvg = vidData?.pct ?? null;
    const readiness = _readinessScore({ fcSeenPct: fcPct, videoAvg, examAvg });

    const detailsHtml = _videoSummaryHtml(vidData);

    return `
      <div class="rounded-[20px] p-4" style="background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">${emoji}</span>
            <h3 class="font-semibold" style="color:var(--txt)">${label}</h3>
          </div>
          <div class="text-right">
            <div class="text-xs mb-0.5" style="color:var(--txt-3)">Bereitschaft</div>
            <div class="text-2xl font-black" style="color:${_overallColor(readiness)}">${readiness}%</div>
          </div>
        </div>
        ${_examHistoryHtml(courseExamResults)}
        ${detailsHtml ? `
          ${_detailsToggleHtml()}
          <div class="hidden mt-3 pt-3" style="border-top:1px solid var(--border)">${detailsHtml}</div>
        ` : ''}
      </div>`;
  }

  function _videoSummaryHtml(vidData) {
    if (!vidData || vidData.total === 0) return '';
    const pct      = Math.round((vidData.pct ?? 0) * 100);
    const kapiert  = vidData.kapiert ?? 0;
    const total    = vidData.total ?? 0;
    const color    = pct >= 70 ? '#4ade80' : pct >= 30 ? '#fbbf24' : '#60a5fa';
    return `
      <div class="mb-4">
        <p class="text-xs uppercase tracking-wide mb-2" style="color:var(--txt-3)">Reels</p>
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">
          <span class="text-base">🎬</span>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between text-xs mb-1" style="color:var(--txt-2)">
              <span>${kapiert} von ${total} kapiert</span>
              <span style="color:${color}">${pct}%</span>
            </div>
            <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
              <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  function _examHistoryHtml(results) {
    if (!results?.length) return '';
    const sorted = [...results].sort((a, b) => new Date(b.taken_at) - new Date(a.taken_at)).slice(0, 6);
    const rows = sorted.map(r => {
      const pct   = r.score_pct;
      const grade = _gradeFromPct(pct);
      const col   = _overallColor(pct);
      const date  = new Date(r.taken_at).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: '2-digit' });
      const lbl   = r.exam_id
        .replace(/^esf-/i, 'ESF ')
        .replace(/^stat-/i, 'Statistik ')
        .replace(/^om-/i, 'OM ')
        .replace(/^makro-/i, 'Makro ')
        .toUpperCase();
      const answers = r.answers || [];
      const hasUngraded = answers.some(a => a.user_answer && a.model_answer && a.earned === null);
      const badge = hasUngraded
        ? `<span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:rgba(234,179,8,0.15);color:#fbbf24">⚠ Offen</span>`
        : '';
      return `
        <button onclick="ProfileScreen.showExamDetail('${r.id}','${r.exam_id}')"
          class="w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition tap-card"
          style="background:var(--card-raised);border:1px solid transparent">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-xs truncate font-medium" style="color:var(--txt)">${lbl}</span>
            ${badge}
            <span class="text-xs flex-shrink-0" style="color:var(--txt-3)">${date}</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0 ml-2">
            <span class="text-sm font-bold" style="color:${col}">${pct}%</span>
            <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded-lg" style="background:${col}18;color:${col}">Note ${grade}</span>
            <span class="text-xs" style="color:var(--txt-3)">›</span>
          </div>
        </button>`;
    }).join('');
    return `
      <div class="mb-3">
        <p class="text-[10px] uppercase tracking-widest font-semibold mb-2" style="color:var(--txt-3)">Prüfungen</p>
        <div class="space-y-1.5">${rows}</div>
      </div>`;
  }

  function _weaknessProfileHtml(weights) {
    const rows = (weights || []).filter(w => (w.wrong_count + w.correct_count) > 0);
    if (!rows.length) return '';
    return `
      <div class="mb-4">
        <p class="text-[10px] uppercase tracking-widest font-semibold mb-2" style="color:var(--txt-3)">Schwächenprofil</p>
        ${rows.map(w => {
          const total = w.wrong_count + w.correct_count;
          const pct = w.ema_accuracy != null
            ? Math.round(w.ema_accuracy * 100)
            : Math.round((w.correct_count / total) * 100);
          const streak = w.correct_streak || 0;
          const col = pct >= 70 ? '#4ade80' : pct >= 40 ? '#fbbf24' : '#f87171';
          const badge = streak >= 3 ? 'Verstanden' : pct >= 70 ? 'Stark' : pct >= 40 ? 'Üben' : 'Fokus';
          const streakLabel = streak >= 2 ? `<span class="text-[10px]" style="color:#34d399">${streak}× ✓</span>` : '';
          return `
            <div class="mb-2.5">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs" style="color:var(--txt)">${w.topic_tag}</span>
                <div class="flex items-center gap-2">
                  ${streakLabel}
                  <span class="text-xs" style="color:var(--txt-3)">${w.correct_count}/${total}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:${col}18;color:${col}">${badge}</span>
                </div>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${col}"></div>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function _quizTopicBarsHtml(stats) {
    const entries = Object.entries(stats).filter(([, s]) => s.total > 0);
    if (!entries.length) return '';
    const sorted = entries.sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
    return `
      <div class="mb-4">
        <p class="text-[10px] uppercase tracking-widest font-semibold mb-2" style="color:var(--txt-3)">Quiz-Themen</p>
        ${sorted.map(([topic, s]) => {
          const pct = Math.round((s.correct / s.total) * 100);
          const col = pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171';
          const badge = pct >= 70 ? 'Stark' : pct >= 50 ? 'Üben' : 'Fokus';
          return `
            <div class="mb-2.5">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs" style="color:var(--txt)">${topic}</span>
                <div class="flex items-center gap-2">
                  <span class="text-xs" style="color:var(--txt-3)">${s.correct}/${s.total}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:${col}18;color:${col}">${badge}</span>
                </div>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background:var(--card-raised)">
                <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${col}"></div>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  async function _renderQuizStats() {
    const el = document.getElementById('quiz-stats-content');
    if (!el) return;

    const courseStats = AppState.get('quizCourseStats') || {};
    const enrolled    = await CoursesDB.getEnrolledKeys();

    // Nur eingeschriebene Kurse mit Quiz-Daten zeigen
    const activeCourses = enrolled.filter(k => {
      const cs = courseStats[k];
      return cs && Object.values(cs).some(s => s.total > 0);
    });

    if (!activeCourses.length) {
      // Fallback: flache Statistik (ältere Daten ohne Kurszuordnung)
      const flat = AppState.get('quizTopicStats') || {};
      const flatEntries = Object.entries(flat).filter(([, s]) => s.total > 0);
      if (!flatEntries.length) return;
      const sorted = flatEntries.sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
      const totalQ = flatEntries.reduce((s, [, v]) => s + v.total, 0);
      const totalC = flatEntries.reduce((s, [, v]) => s + v.correct, 0);
      const overallPct = Math.round((totalC / totalQ) * 100);
      const col0 = overallPct >= 70 ? '#4ade80' : overallPct >= 50 ? '#fbbf24' : '#f87171';
      el.innerHTML = `
        <div class="flex items-center gap-3 mb-4 p-3 rounded-xl" style="background:var(--card-raised)">
          <div class="text-2xl font-black" style="color:${col0}">${overallPct}%</div>
          <div>
            <div class="text-xs font-semibold" style="color:var(--txt)">Gesamt-Trefferquote</div>
            <div class="text-xs" style="color:var(--txt-2)">${totalC} / ${totalQ} Fragen richtig</div>
          </div>
        </div>
        ${sorted.map(([topic, s]) => {
          const pct = Math.round((s.correct / s.total) * 100);
          const col = pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171';
          const badge = pct >= 70 ? 'Stark' : pct >= 50 ? 'Üben' : 'Fokus';
          return `
            <div class="mb-3">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs" style="color:var(--txt)">${topic}</span>
                <div class="flex items-center gap-2">
                  <span class="text-xs" style="color:var(--txt-2)">${s.correct}/${s.total}</span>
                  <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" style="background:${col}22;color:${col}">${badge}</span>
                </div>
              </div>
              <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.06)">
                <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${col}"></div>
              </div>
            </div>`;
        }).join('')}`;
      return;
    }

    // Pro-Kurs-Aufschlüsselung — nur eingeschriebene Kurse
    const courseBlocks = activeCourses.map((courseKey, ci) => {
      const cs = courseStats[courseKey];
      const entries = Object.entries(cs).filter(([, s]) => s.total > 0);
      if (!entries.length) return '';
      const sorted = [...entries].sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
      const totalQ = entries.reduce((s, [, v]) => s + v.total, 0);
      const totalC = entries.reduce((s, [, v]) => s + v.correct, 0);
      const overallPct = Math.round((totalC / totalQ) * 100);
      const col = overallPct >= 70 ? '#4ade80' : overallPct >= 50 ? '#fbbf24' : '#f87171';
      const course = window.getCourse?.(courseKey);
      const icon = course?.icon || '📚';
      const isLast = ci === activeCourses.length - 1;
      return `
        <div class="mb-4${isLast ? '' : ' pb-4'}"${isLast ? '' : ' style="border-bottom:1px solid var(--border)"'}>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold" style="color:var(--txt)">${icon} ${course?.label || courseKey}</span>
            <span class="text-sm font-bold" style="color:${col}">${overallPct}% <span class="text-xs font-normal" style="color:var(--txt-3)">${totalC}/${totalQ}</span></span>
          </div>
          ${sorted.map(([topic, s]) => {
            const pct = Math.round((s.correct / s.total) * 100);
            const c = pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171';
            const badge = pct >= 70 ? 'Stark' : pct >= 50 ? 'Üben' : 'Fokus';
            return `
              <div class="mb-2">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs" style="color:var(--txt)">${topic}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-xs" style="color:var(--txt-2)">${s.correct}/${s.total}</span>
                    <span class="text-xs px-1.5 py-0.5 rounded-full font-medium" style="background:${c}22;color:${c}">${badge}</span>
                  </div>
                </div>
                <div class="h-1.5 rounded-full" style="background:rgba(255,255,255,0.06)">
                  <div class="h-1.5 rounded-full transition-all" style="width:${pct}%;background:${c}"></div>
                </div>
              </div>`;
          }).join('')}
        </div>`;
    });
    el.innerHTML = courseBlocks.join('');
  }

  function _showMsg(section, text, isError) {
    const msg = section.querySelector('#ai-key-msg');
    if (!msg) return;
    msg.textContent = text;
    msg.className = `mt-2 text-xs text-center rounded-lg py-1.5 ${isError ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`;
    setTimeout(() => msg.classList.add('hidden'), 4000);
  }

  async function reviewExamDraft(documentId) {
    const { data, error } = await _supabase
      .from('documents')
      .select('id, original_name, content_meta, course, doc_type')
      .eq('id', documentId)
      .single();

    if (error || !data?.content_meta) {
      alert('Dokument nicht gefunden.');
      return;
    }
    const draft = data.content_meta;
    const questions = (draft.sections || []).flatMap(s => s.questions || []);
    const validation = draft._validation || [];

    const modal = document.createElement('div');
    modal.id = 'exam-draft-modal';
    modal.className = 'fixed inset-0 z-[200] flex items-end justify-center';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.innerHTML = `
      <div class="rounded-t-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
           style="background:var(--card);border-top:1px solid var(--border)">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-lg font-bold" style="color:var(--txt)">📝 Prüfungs-Draft</h2>
            <p class="text-xs mt-0.5" style="color:var(--txt-2)">${data.original_name}</p>
          </div>
          <button onclick="document.getElementById('exam-draft-modal').remove()"
            class="text-gray-400 hover:text-white text-xl leading-none">✕</button>
        </div>

        <div class="rounded-xl p-3 mb-4" style="background:var(--card-raised);border:1px solid var(--border)">
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div><span style="color:var(--txt-2)">Titel:</span> <span style="color:var(--txt)">${draft.title || '—'}</span></div>
            <div><span style="color:var(--txt-2)">Kurs:</span> <span style="color:var(--txt)">${draft.course || data.course || '—'}</span></div>
            <div><span style="color:var(--txt-2)">Fragen:</span> <span style="color:var(--txt)">${questions.length}</span></div>
            <div><span style="color:var(--txt-2)">Punkte:</span> <span style="color:var(--txt)">${draft.totalPoints || '—'}</span></div>
          </div>
        </div>

        ${validation.length ? `
          <div class="rounded-xl p-3 mb-4" style="background:rgba(234,88,12,0.12);border:1px solid rgba(234,88,12,0.3)">
            <div class="text-xs font-bold text-orange-400 mb-1">⚠ ${validation.length} Punkte zum Prüfen</div>
            ${validation.map(v => `<div class="text-xs text-orange-300">${v}</div>`).join('')}
          </div>` : ''}

        <div class="text-xs font-semibold mb-2" style="color:var(--txt-2)">ERSTE 3 FRAGEN</div>
        ${questions.slice(0,3).map(q => `
          <div class="rounded-xl p-3 mb-2" style="background:var(--card-raised);border:1px solid var(--border)">
            <div class="text-sm font-medium mb-1" style="color:var(--txt)">${q.number}. ${q.text?.substring(0,120)}${(q.text?.length||0)>120?'…':''}</div>
            ${q.correct ? `<div class="text-xs text-green-400">Antwort: ${(q.correct||[]).join(', ')}</div>` : '<div class="text-xs text-orange-400">⚠ Antwort fehlt</div>'}
          </div>`).join('')}

        <p class="text-xs text-center mt-3 mb-4" style="color:var(--txt-3)">
          Vollständige Bearbeitung mit <code>/create-exam</code> in Claude Code
        </p>
        <button onclick="document.getElementById('exam-draft-modal').remove()"
          class="w-full py-3 rounded-xl font-bold text-sm"
          style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt-2)">
          Schliessen
        </button>
      </div>`;
    document.body.appendChild(modal);
  }

  // ── Exam History Detail Modal ─────────────────────────────────────────────

  let _pendingCorrections = {}; // questionId → earned (manuell gesetzt, noch nicht gespeichert)

  function _updatePts(qId, val) {
    _pendingCorrections[qId] = parseFloat(val) || 0;
    const bar = document.getElementById('exam-corrections-bar');
    if (bar) bar.style.display = 'block';
  }

  async function _saveExamCorrections(resultId, examId) {
    const btn = document.querySelector('#exam-corrections-bar button');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Speichert…'; }

    const { data: result } = await _supabase.from('exam_results').select('*').eq('id', resultId).single();
    if (!result) return;

    const answers = (result.answers || []).map(a => {
      if (_pendingCorrections[a.question_id] !== undefined) {
        const maxPts = a.max_pts || 0;
        const earned = Math.min(maxPts, Math.max(0, _pendingCorrections[a.question_id]));
        return { ...a, earned, is_correct: earned > 0 };
      }
      return a;
    });

    let totalEarned = 0, totalMax = 0;
    answers.forEach(a => {
      totalMax += (a.max_pts || 0);
      totalEarned += (a.earned != null ? a.earned : (a.is_correct ? (a.max_pts || 0) : 0));
    });

    const newPct = totalMax > 0 ? Math.round(totalEarned / totalMax * 100) : result.score_pct;
    await _supabase.from('exam_results').update({ score_pct: newPct, answers }).eq('id', resultId);
    _pendingCorrections = {};
    showExamDetail(resultId, examId);
  }

  async function showExamDetail(resultId, examId) {
    document.getElementById('exam-detail-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'exam-detail-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);overflow-y:auto;display:flex;flex-direction:column';
    modal.innerHTML = `
      <div style="max-width:680px;width:100%;margin:0 auto;padding:1rem;flex:1">
        <div class="rounded-[20px] overflow-hidden" style="background:var(--card);border:1px solid var(--border)">
          <div class="flex items-center justify-between px-5 py-4 sticky top-0" style="background:var(--card);border-bottom:1px solid var(--border);z-index:1">
            <h2 class="font-bold text-base" style="color:var(--txt)">Prüfungsansicht</h2>
            <button onclick="document.getElementById('exam-detail-modal').remove()"
              style="width:28px;height:28px;border-radius:50%;border:none;background:var(--card-raised);color:var(--txt-2);font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center">✕</button>
          </div>
          <div id="exam-detail-body" class="p-5" style="color:var(--txt-2)">
            <div style="text-align:center;padding:2rem">⏳ Lade…</div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    try {
      const { data: result, error } = await _supabase
        .from('exam_results').select('*').eq('id', resultId).single();
      if (error || !result) throw new Error('Ergebnis nicht gefunden');

      // Find exam data from registry
      const registry = window.ExamScreen?.EXAM_REGISTRY || [];
      const entry = registry.find(e => e.id === examId);
      const examData = entry?.dataVar ? window[entry.dataVar] : null;

      const answersMap = {};
      (result.answers || []).forEach(a => { answersMap[a.question_id] = a; });

      const pct   = result.score_pct;
      const grade = _gradeFromPct(pct);
      const col   = _overallColor(pct);
      const date  = new Date(result.taken_at).toLocaleDateString('de-CH', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
      const lbl   = (entry?.label || examId).toUpperCase();
      const hasUngraded = result.answers?.some(a => a.user_answer && a.model_answer && a.earned === null);

      let sectionsHtml = '';
      if (examData?.sections) {
        examData.sections.forEach(section => {
          let secEarned = 0, secMax = 0;
          const qRows = (section.questions || []).map(q => {
            const a = answersMap[q.id] || {};
            const maxPts = q.points || 0;
            secMax += maxPts;
            const isText = q.type === 'text' || q.type === 'open';
            const isGapped = q.type === 'gapped_text_dropdown' || q.type === 'gapped_text_input';
            const earned = a.earned ?? (a.is_correct ? maxPts : 0);
            secEarned += (earned || 0);
            const isOk = a.is_correct;
            const qCol = isText
              ? (a.earned !== null && a.earned !== undefined ? (a.earned / maxPts >= 0.7 ? '#4ade80' : a.earned / maxPts >= 0.4 ? '#fbbf24' : '#f87171') : '#fbbf24')
              : (isOk ? '#4ade80' : '#f87171');
            const icon = isText ? '📝' : (isOk ? '✅' : '❌');
            const qText = q.text || '';
            const correctChoices = (q.choices || []).filter(c => c.correct).map(c => c.text).join(', ');
            const ptsDisplay = isText
              ? `<span class="flex-shrink-0 ml-1 flex items-center gap-0.5">
                   <input type="number" min="0" max="${maxPts}" step="0.5"
                     value="${earned != null ? earned : ''}"
                     id="pts-${q.id}"
                     oninput="ProfileScreen._updatePts('${q.id}', this.value)"
                     style="width:44px;background:var(--card-raised);color:${qCol};border:1px solid var(--border);border-radius:6px;padding:2px 4px;font-size:0.7rem;font-weight:700;text-align:center">
                   <span style="font-size:0.7rem;color:var(--txt-3)">/${maxPts}P</span>
                 </span>`
              : `<span class="text-xs font-bold flex-shrink-0 ml-1" style="color:${qCol}">${earned != null ? earned : '?'}/${maxPts}P</span>`;
            return `
              <div class="py-3" style="border-bottom:1px solid var(--border)">
                <div class="flex items-start gap-2">
                  <span class="text-sm flex-shrink-0 mt-0.5">${icon}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <p class="text-sm leading-snug" style="color:var(--txt)">${qText}</p>
                      ${ptsDisplay}
                    </div>
                    ${!isText && !isOk && correctChoices ? `<div class="text-xs mt-1" style="color:#4ade80">✓ ${correctChoices}</div>` : ''}
                    ${isText && a.user_answer ? `<div class="text-xs mt-2 p-2 rounded-lg italic" style="color:var(--txt-2);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07)">Deine Antwort: ${a.user_answer}</div>` : ''}
                    ${isText && a.model_answer ? `<div class="text-xs mt-1.5 p-2 rounded-lg" style="color:#4ade80;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15)">✓ Musterlösung: ${a.model_answer}</div>` : ''}
                    ${a.ai_feedback ? `<div class="text-xs mt-1 italic" style="color:#818cf8">KI: ${a.ai_feedback}</div>` : ''}
                  </div>
                </div>
              </div>`;
          }).join('');
          sectionsHtml += `
            <div class="rounded-xl mb-3 overflow-hidden" style="border:1px solid var(--border)">
              <div class="flex items-center justify-between px-4 py-2.5" style="background:var(--card-raised)">
                <span class="text-sm font-semibold" style="color:var(--txt)">${section.title || ''}</span>
                <span class="text-xs font-bold" style="color:#818cf8">${secEarned} / ${secMax} P</span>
              </div>
              <div class="px-4">${qRows}</div>
            </div>`;
        });
      } else {
        // Fallback: show saved answers without full question text
        const allAnswers = result.answers || [];
        const openOnes = allAnswers.filter(a => a.user_answer);
        if (openOnes.length) {
          sectionsHtml = openOnes.map(a => {
            const earned = a.earned;
            const maxPts = a.max_pts || 0;
            const col2 = earned !== null ? (earned/maxPts >= 0.7 ? '#4ade80' : earned/maxPts >= 0.4 ? '#fbbf24' : '#f87171') : '#fbbf24';
            return `
              <div class="rounded-xl p-4 mb-2" style="background:var(--card-raised);border:1px solid var(--border)">
                <div class="flex justify-between mb-1">
                  <span class="text-xs font-semibold" style="color:var(--txt)">📝 ${(a.question_text || a.question_id || '').slice(0,100)}</span>
                  <span class="text-xs font-bold" style="color:${col2}">${earned !== null ? `${earned}/${maxPts}P` : '?P'}</span>
                </div>
                <div class="text-xs italic mb-1" style="color:var(--txt-2)">${a.user_answer.slice(0,200)}</div>
                ${a.model_answer ? `<div class="text-xs" style="color:#4ade80">✓ ${a.model_answer.slice(0,150)}</div>` : ''}
                ${a.ai_feedback ? `<div class="text-xs italic" style="color:#818cf8">KI: ${a.ai_feedback}</div>` : ''}
              </div>`;
          }).join('');
        } else {
          const mcRows = allAnswers.map(a => `
            <div class="flex items-center justify-between py-2" style="border-bottom:1px solid var(--border)">
              <span class="text-xs" style="color:var(--txt)">${a.is_correct ? '✅' : '❌'} Frage ${a.question_id?.slice(0,12) || '?'}</span>
              <span class="text-xs" style="color:${a.is_correct?'#4ade80':'#f87171'}">${a.earned ?? (a.is_correct ? a.max_pts : 0)}/${a.max_pts || 0}P</span>
            </div>`).join('');
          sectionsHtml = `<div>${mcRows || '<p class="text-xs py-2" style="color:var(--txt-3)">Keine Fragedetails gespeichert.</p>'}</div>`;
        }
      }

      _pendingCorrections = {};
      document.getElementById('exam-detail-body').innerHTML = `
        <div class="flex items-center justify-between mb-5 pb-4" style="border-bottom:1px solid var(--border)">
          <div>
            <div class="font-bold text-base" style="color:var(--txt)">${lbl}</div>
            <div class="text-xs mt-0.5" style="color:var(--txt-3)">${date}</div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-black" style="color:${col}">${pct}%</div>
            <div class="text-sm font-semibold" style="color:${col}">Note ${grade}</div>
          </div>
        </div>
        ${hasUngraded ? `
          <div class="rounded-xl p-3 mb-4 flex items-center justify-between gap-3" style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.25)">
            <span class="text-xs" style="color:#fbbf24">⚠ Offene Fragen noch nicht bewertet</span>
            <button onclick="ProfileScreen._regradeExam('${resultId}','${examId}')"
              class="text-xs px-3 py-1.5 rounded-lg font-bold" style="background:#4f46e5;color:#fff">KI bewerten</button>
          </div>` : ''}
        ${sectionsHtml}
        <div id="exam-corrections-bar" style="display:none;margin-top:1rem;position:sticky;bottom:0;padding:0.75rem 0">
          <button onclick="ProfileScreen._saveExamCorrections('${resultId}','${examId}')"
            class="w-full py-3 rounded-2xl font-bold text-sm text-white"
            style="background:#4f46e5;box-shadow:0 4px 20px rgba(99,102,241,0.4)">
            💾 Korrekturen speichern
          </button>
        </div>`;

    } catch (err) {
      const body = document.getElementById('exam-detail-body');
      if (body) body.innerHTML = `<p class="text-xs" style="color:#f87171">Fehler: ${err.message}</p>`;
    }
  }

  async function _regradeExam(resultId, examId) {
    const btn = document.querySelector('#exam-detail-body button[onclick*="_regradeExam"]');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ KI bewertet…'; }

    try {
      // Fetch current result
      const { data: result } = await _supabase
        .from('exam_results')
        .select('*')
        .eq('id', resultId)
        .single();

      if (!result) throw new Error('Ergebnis nicht gefunden');

      const answers = result.answers || [];
      const openAnswers = answers.filter(a => a.user_answer && a.model_answer);
      if (!openAnswers.length) throw new Error('Keine offenen Fragen zum Bewerten');

      // Local AI grader (mirrors exam.js _callAIGrader)
      async function _localCallAIGrader(questionText, modelAnswer, userAnswer, maxPts, course) {
        const prompt = `Bewerte die folgende Prüfungsantwort.\n\nFrage: ${questionText}\n\nMaximale Punktzahl: ${maxPts} Punkte\n\nMusterlösung:\n${modelAnswer}\n\nStudentenantwort:\n"${userAnswer}"\n\nGib NUR dieses JSON zurück:\n{"points": <Zahl 0 bis ${maxPts}>, "feedback": "<1-2 kurze Sätze auf Deutsch>"}`;
        const response = await AIService.ask(
          [{ role: 'user', content: prompt }],
          { system: `Du bist ein Prüfungskorrigierender für ${course || ''} (HSG). Bewerte streng aber fair. Antworte NUR mit JSON.`, max_tokens: 200 }
        );
        const text = AIService.extractText(response);
        const match = text.match(/\{[\s\S]*\}/);
        if (!match) throw new Error('No JSON');
        const parsed = JSON.parse(match[0]);
        const earned = Math.round(Math.min(maxPts, Math.max(0, Number(parsed.points))) * 10) / 10;
        return { earned, feedback: parsed.feedback || '' };
      }

      const updatedAnswers = [...answers];
      let totalEarned = 0, totalMax = 0;

      for (const a of updatedAnswers) {
        const maxPts = a.max_pts || 0;
        totalMax += maxPts;
        if (a.user_answer && a.model_answer) {
          try {
            const grade = await _localCallAIGrader(
              a.question_text || a.question_id,
              a.model_answer,
              a.user_answer,
              maxPts,
              examId.split('-')[0]
            );
            a.earned = grade.earned;
            a.ai_feedback = grade.feedback;
            a.is_correct = grade.earned > 0;
            totalEarned += grade.earned;
          } catch (_) {
            totalEarned += (a.earned || 0);
          }
        } else {
          totalEarned += (a.earned || 0);
        }
      }

      const newPct = totalMax > 0 ? Math.round(totalEarned / totalMax * 100) : result.score_pct;

      await _supabase
        .from('exam_results')
        .update({ score_pct: newPct, answers: updatedAnswers })
        .eq('id', resultId);

      // Refresh the detail view
      showExamDetail(resultId, examId);
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = err.message === 'no_key_set'
          ? 'Kein API-Key gesetzt'
          : `Fehler: ${err.message}`;
      }
    }
  }

  // ── Admin: Card Reports ───────────────────────────────────────────
  const REASON_LABELS = { wrong_content: 'Inhaltlich falsch', wrong_category: 'Falsche Kategorie', other: 'Sonstiges' };

  async function _loadAdminReports() {
    const el = document.getElementById('admin-reports-content');
    if (!el) return;
    const { data, error } = await _supabase
      .from('card_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) { el.innerHTML = `<p class="text-xs text-red-400">${error.message}</p>`; return; }
    if (!data?.length) { el.innerHTML = `<p class="text-xs" style="color:var(--txt-3)">Keine Meldungen.</p>`; return; }
    const pending = data.filter(r => r.status === 'pending');
    const done    = data.filter(r => r.status !== 'pending');
    el.innerHTML = `
      <p class="text-xs mb-3" style="color:var(--txt-3)">${pending.length} offen · ${done.length} erledigt</p>
      ${data.map(r => `
        <div class="rounded-xl p-3 mb-2" style="background:var(--card-raised);border:1px solid ${r.status==='pending'?'rgba(239,68,68,0.3)':'var(--border)'}">
          <div class="flex items-start justify-between gap-2 mb-1">
            <span class="text-xs font-semibold" style="color:${r.status==='pending'?'#f87171':'var(--txt-3)'}">${REASON_LABELS[r.reason]||r.reason}</span>
            <div class="flex gap-1 flex-shrink-0">
              ${r.status==='pending' ? `
                <button onclick="ProfileScreen._resolveReport('${r.id}','resolved')" class="text-xs px-2 py-0.5 rounded-full" style="background:rgba(34,197,94,0.15);color:#4ade80">Erledigt</button>
                <button onclick="ProfileScreen._resolveReport('${r.id}','dismissed')" class="text-xs px-2 py-0.5 rounded-full" style="background:rgba(255,255,255,0.07);color:var(--txt-3)">Ignorieren</button>
              ` : `<span class="text-xs" style="color:var(--txt-3)">${r.status}</span>`}
            </div>
          </div>
          <div class="text-xs mb-0.5" style="color:var(--txt-2)">${(r.card_front||'').slice(0,100)}</div>
          ${r.card_topic ? `<div class="text-xs" style="color:var(--txt-3)">${r.card_course} · ${r.card_topic}</div>` : ''}
          ${r.note ? `<div class="text-xs mt-1 italic" style="color:var(--txt-3)">"${r.note}"</div>` : ''}
          <div class="text-xs mt-1" style="color:var(--txt-3)">${new Date(r.created_at).toLocaleDateString('de-CH')}</div>
        </div>`).join('')}`;
  }

  async function _resolveReport(id, status) {
    await _supabase.from('card_reports').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id);
    _loadAdminReports();
  }

  return { init, refresh, reviewExamDraft, _toggleDetails, _resolveReport, showExamDetail, _regradeExam, _updatePts, _saveExamCorrections };
})();
