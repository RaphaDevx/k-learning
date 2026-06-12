// ── Exam Screen ───────────────────────────────────────────────────────────
// Full exam mode: selector → settings → fullscreen exam → results

window.ExamScreen = (function() {

  // ── Registry of available exams ──────────────────────────────────────────
  const EXAM_REGISTRY = [
    {
      id: 'stat-pk1',
      label: 'Statistik — Probeklausur 1',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_PK1',
      file: 'exams/statistik-pk1-data.js',
      available: true,
    },
    {
      id: 'stat-pk2',
      label: 'Statistik — Probeklausur 2',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_PK2',
      file: 'exams/statistik-pk2-data.js',
      available: true,
    },
    {
      id: 'esf-eigenklausur',
      label: 'ESF — Eigenklausur (Konzeptprüfung)',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_EIGENKLAUSUR',
      file: 'exams/esf-eigenklausur-data.js',
      available: true,
    },
    {
      id: 'esf-hs23',
      label: 'ESF — HS 2023',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_HS23',
      file: 'exams/esf-hs23-data.js',
      available: true,
    },
    {
      id: 'esf-hs22',
      label: 'ESF — HS 2022',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_HS22',
      file: 'exams/esf-hs22-data.js',
      available: true,
    },
    {
      id: 'esf-hs22-new',
      label: 'ESF HS22 (new)',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_HS22_NEW',
      file: 'exams/esf-hs22-new-data.js',
      available: true,
    },
    {
      id: 'esf-uebung23',
      label: 'ESF — Übungsklausur HS 2023',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_UEBUNG23',
      file: 'exams/esf-uebung23-data.js',
      available: true,
    },
    {
      id: 'om-hs23',
      label: 'OM — Prüfung HS 2023',
      course: 'OM',
      dataVar: 'EXAM_DATA_OM_HS23',
      file: 'exams/om-hs23-data.js',
      available: true,
    },
    {
      id: 'om-fs21',
      label: 'OM — Prüfung FS 2021',
      course: 'OM',
      dataVar: 'EXAM_DATA_OM_FS21',
      file: 'exams/om-fs21-data.js',
      available: true,
    },
    {
      id: 'om-hs20',
      label: 'OM — Final Exam HS 2020',
      course: 'OM',
      dataVar: 'EXAM_DATA_OM_HS20',
      file: 'exams/om-hs20-data.js',
      available: true,
    },
    {
      id: 'om-fs20',
      label: 'OM — Prüfung FS 2020',
      course: 'OM',
      dataVar: 'EXAM_DATA_OM_FS20',
      file: 'exams/om-fs20-data.js',
      available: true,
    },
    {
      id: 'om-pk1',
      label: 'OM — Probeklausur 1',
      course: 'OM',
      dataVar: 'EXAM_DATA_OM_PK1',
      file: 'exams/om-pk1-data.js',
      available: false,
    },
    {
      id: 'makro-pk1',
      label: 'MakroII — Probeklausur 1',
      course: 'MakroII',
      dataVar: 'EXAM_DATA_MAKRO_PK1',
      file: 'exams/makro-pk1-data.js',
      available: false,
    },
    {
      id: 'bwl-hs22',
      label: 'BWL — HS 2022',
      course: 'BWL',
      dataVar: 'EXAM_DATA_BWL_HS22',
      file: 'exams/bwl-hs22-data.js',
      available: true,
    },
    {
      id: 'bwl-fifu-2021',
      label: 'BWL — Finanzielle Führung FS 2021',
      course: 'BWL',
      dataVar: null,
      file: 'exams/bwl-fifu-2021-data.json',
      format: 'json',
      available: true,
    },
    {
      id: 'c1-lang-functions',
      label: 'Englisch C1 — Language Functions Practice',
      course: 'EnglischC1',
      dataVar: null,
      file: 'exams/c1-lang-functions-data.json',
      format: 'json',
      available: true,
    },
    {
      id: 'c1-written-hs24',
      label: 'Englisch C1 — Written Exam Practice HS24',
      course: 'EnglischC1',
      dataVar: null,
      file: 'exams/c1-written-hs24-data.json',
      format: 'json',
      available: true,
    },
    {
      id: 'c1-bec-higher-1',
      label: 'Englisch C1 — BEC Higher Sample Test 1 (Reading & Listening)',
      course: 'EnglischC1',
      dataVar: null,
      file: 'exams/c1-bec-higher-1-data.json',
      format: 'json',
      available: true,
    },
    {
      id: 'c1-bec-higher-2',
      label: 'Englisch C1 — BEC Higher Sample Test 2 (Reading & Listening)',
      course: 'EnglischC1',
      dataVar: null,
      file: 'exams/c1-bec-higher-2-data.json',
      format: 'json',
      available: true,
    },
  ];

  // ── Internal state ────────────────────────────────────────────────────────
  let _examData = null;
  let _currentEntry = null;  // EXAM_REGISTRY entry currently running
  let _answers = {};         // { questionId: ['A'] | 'text' }
  let _timerInterval = null;
  let _secondsLeft = 0;
  let _useTimer = true;
  let _examActive = false;
  let _inited = false;

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    if (!_inited) { _inited = true; }
    renderSelector();
  }

  // ── Selector ──────────────────────────────────────────────────────────────
  function renderSelector() {
    const container = document.getElementById('exam-content');
    if (!container) return;

    const enrolled = _enrolledCourses();
    const grouped = {};
    enrolled.forEach(k => { grouped[k] = []; });
    EXAM_REGISTRY.forEach(e => {
      if (grouped[e.course] !== undefined) grouped[e.course].push(e);
    });

    const courseColor = key => getCourse(key)?.hex || '#6b7280';

    let html = '<div class="space-y-6">';

    // ── Exam sections per course ───────────────────────────────────────────
    Object.entries(grouped).forEach(([course, exams]) => {
      const c = getCourse(course);
      if (!c) return;
      html += `
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xl">${c.icon}</span>
            <h3 class="font-bold text-lg">${c.label} — Prüfungen</h3>
          </div>
          <div class="space-y-2">`;
      exams.forEach(exam => {
        if (exam.available) {
          const isQuiz = exam.id === 'esf-eigenklausur';
          html += `
            <div class="rounded-2xl p-4 transition tap-card"
                 style="background:var(--card-raised);border:1px solid var(--border)">
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-bold text-sm truncate" style="color:var(--txt)">${exam.label}</div>
                  <div class="text-xs mt-0.5" style="color:var(--txt-2)">${exam.course}</div>
                </div>
                <div class="flex gap-2 flex-shrink-0">
                  ${isQuiz ? `<button onclick="QuizScreen.launch('${exam.dataVar}')"
                    class="text-xs px-3 py-1.5 rounded-xl font-semibold text-white transition"
                    style="background:#4f46e5">Quiz</button>` : ''}
                  <button onclick="ExamScreen.showSetup('${exam.id}')"
                    class="text-xs px-3 py-1.5 rounded-xl font-bold text-white transition"
                    style="background:#15803d">Prüfung</button>
                </div>
              </div>
            </div>`;
        } else {
          html += `
            <div class="rounded-2xl p-4 opacity-40" style="background:var(--card-raised);border:1px solid var(--border)">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-sm" style="color:var(--txt)">${exam.label}</div>
                  <div class="text-xs mt-0.5" style="color:var(--txt-2)">${exam.course}</div>
                </div>
                <span class="text-xs" style="color:var(--txt-3)">Kommt bald</span>
              </div>
            </div>`;
        }
      });
      if (exams.length === 0) {
        html += `<div class="text-sm px-1" style="color:var(--txt-3)">Noch keine Prüfungen verfügbar.</div>`;
      }
      html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // ── Setup Modal ───────────────────────────────────────────────────────────
  async function showSetup(examId) {
    const entry = EXAM_REGISTRY.find(e => e.id === examId);
    if (!entry) return;

    let data;
    if (entry.format === 'json') {
      try { data = await _loadExamJSON(entry); } catch(e) { alert('JSON-Prüfung konnte nicht geladen werden: ' + e.message); return; }
      if (data.durationMinutes && !data.duration_minutes) data.duration_minutes = data.durationMinutes;
      if (data.totalPoints    && !data.total_points)    data.total_points    = data.totalPoints;
      if (data.examInfo       && !data.exam_info)       data.exam_info       = data.examInfo;
    } else {
      data = window[entry.dataVar];
      if (!data) { alert('Prüfungsdaten konnten nicht geladen werden.'); return; }
    }

    const modal = document.getElementById('exam-setup-modal');
    if (!modal) return;

    document.getElementById('exam-setup-title').textContent = entry.label;
    document.getElementById('exam-setup-duration').textContent = data.duration_minutes
      ? `${data.duration_minutes} Minuten` : 'Keine Zeitlimit';
    document.getElementById('exam-setup-points').textContent = `${data.total_points} Punkte`;
    document.getElementById('exam-setup-info').textContent = data.exam_info?.format || '';

    // Download button (Excel or original PDF)
    const dlBtn = document.getElementById('exam-setup-excel-download');
    if (dlBtn) {
      const dlSrc = data.excel_download || data.resourceLink;
      if (dlSrc) {
        dlBtn.href = dlSrc;
        dlBtn.download = dlSrc.split('/').pop();
        dlBtn.textContent = data.excel_download ? '📊 Excel-Vorlage' : '📄 Original-PDF';
        dlBtn.classList.remove('hidden');
      } else {
        dlBtn.classList.add('hidden');
      }
    }

    // Store exam id for start
    modal.dataset.examId = examId;
    modal.classList.remove('hidden');
  }

  function closeSetup() {
    const modal = document.getElementById('exam-setup-modal');
    if (modal) modal.classList.add('hidden');
  }

  async function startFromSetup() {
    const modal = document.getElementById('exam-setup-modal');
    if (!modal) return;
    const examId = modal.dataset.examId;
    const timerEnabled = document.getElementById('exam-timer-toggle')?.checked ?? true;
    modal.classList.add('hidden');
    await startExam(examId, timerEnabled);
  }

  // ── JSON Lazy Loader ──────────────────────────────────────────────────────
  async function _loadExamJSON(entry) {
    const r = await fetch(entry.file + '?v=' + Date.now());
    if (!r.ok) throw new Error('Exam JSON not found: ' + entry.file);
    return r.json();
  }

  // ── Start Exam ────────────────────────────────────────────────────────────
  async function startExam(examId, useTimer) {
    const entry = EXAM_REGISTRY.find(e => e.id === examId);
    if (!entry) return;

    let data;
    if (entry.format === 'json') {
      try { data = await _loadExamJSON(entry); } catch(e) { console.error(e); return; }
    } else {
      data = window[entry.dataVar];
      if (!data) return;
    }

    // Normalize field names (JSON uses camelCase, legacy JS uses snake_case)
    if (data.durationMinutes && !data.duration_minutes) data.duration_minutes = data.durationMinutes;
    if (data.totalPoints    && !data.total_points)    data.total_points    = data.totalPoints;
    if (data.examInfo       && !data.exam_info)       data.exam_info       = data.examInfo;
    if (data.scoringRules   && !data.scoring_rules)   data.scoring_rules   = data.scoringRules;

    _examData = data;
    _currentEntry = entry;
    _answers = {};
    _useTimer = useTimer;
    _examActive = true;

    // Prevent accidental browser close
    window._examBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = 'Prüfung läuft — wirklich abbrechen?';
    };
    window.addEventListener('beforeunload', window._examBeforeUnload);

    // Open overlay
    const overlay = document.getElementById('exam-overlay');
    if (overlay) overlay.classList.remove('hidden');

    // Render
    _renderExamHeader();
    _renderQuestions();

    // Start timer
    if (useTimer && data.duration_minutes) {
      _secondsLeft = data.duration_minutes * 60;
      _updateTimerDisplay();
      _timerInterval = setInterval(() => {
        _secondsLeft--;
        _updateTimerDisplay();
        if (_secondsLeft <= 0) {
          clearInterval(_timerInterval);
          submitExam(true);
        }
      }, 1000);
    } else {
      const timerEl = document.getElementById('exam-timer');
      if (timerEl) timerEl.textContent = '';
    }

    // Scroll to top
    const scroll = document.getElementById('exam-scroll');
    if (scroll) scroll.scrollTop = 0;
  }

  function _renderExamHeader() {
    const d = _examData;
    const titleEl = document.getElementById('exam-overlay-title');
    if (titleEl) titleEl.textContent = d.title;
    _updateProgress();
  }

  function _updateProgress() {
    const d = _examData;
    if (!d) return;
    const total = d.sections.reduce((sum, s) => sum + s.questions.length, 0);
    const answered = Object.keys(_answers).length;
    const pct = total ? Math.round(answered / total * 100) : 0;

    const bar = document.getElementById('exam-progress-bar');
    if (bar) bar.style.width = pct + '%';

    const txt = document.getElementById('exam-progress-text');
    if (txt) txt.textContent = `${answered} / ${total} beantwortet`;
  }

  function _updateTimerDisplay() {
    const el = document.getElementById('exam-timer');
    if (!el) return;
    const m = Math.floor(_secondsLeft / 60);
    const s = _secondsLeft % 60;
    const timeStr = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    el.textContent = timeStr;

    // Color warning
    if (_secondsLeft < 300) {
      el.className = el.className.replace(/text-\w+-400/, '') + ' text-red-400';
    } else if (_secondsLeft < 600) {
      el.className = el.className.replace(/text-\w+-400/, '') + ' text-yellow-400';
    } else {
      el.className = el.className.replace(/text-\w+-400/, '') + ' text-green-400';
    }
  }

  // ── Render Questions ──────────────────────────────────────────────────────
  function _renderQuestions() {
    const container = document.getElementById('exam-questions-container');
    if (!container || !_examData) return;

    let html = '';
    let globalQNum = 0;

    _examData.sections.forEach((section, si) => {
      html += `
        <div class="mb-8">
          <div class="bg-gray-800 rounded-2xl p-4 mb-4 border-l-4 border-blue-500">
            <h2 class="font-bold text-lg">${section.title}</h2>
            ${section.description ? `<p class="text-gray-400 text-sm mt-1">${section.description}</p>` : ''}
            ${section.points ? `<p class="text-blue-400 text-xs mt-1">${section.points} Punkte</p>` : ''}
          </div>
          ${section.sectionAttachment ? `
            <div class="bg-blue-950 border border-blue-700 rounded-xl p-3 mb-4 flex items-center gap-3">
              <span class="text-2xl flex-shrink-0">📎</span>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-sm text-blue-200">${section.sectionAttachment.label}</div>
                <div class="text-xs text-blue-400">Reading text — download for offline use</div>
              </div>
              <a href="${section.sectionAttachment.file}" target="_blank"
                class="flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition">
                📥 PDF
              </a>
            </div>` : ''}
          ${section.context ? `
            <div class="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4 text-sm text-gray-300 leading-relaxed">
              <div class="text-xs text-gray-500 uppercase tracking-widest mb-2">Lesetext</div>
              ${section.context.replace(/\n/g, '<br>')}
            </div>` : ''}
          ${section.audio ? _renderSectionAudio(section) : ''}`;

      section.questions.forEach((q, qi) => {
        globalQNum++;
        const qtype = q.type || section.question_type || 'single_choice';
        if (qtype === 'gapped_text_dropdown') {
          html += _renderGappedDropdown(q);
        } else if (qtype === 'gapped_text_input') {
          html += _renderGappedInput(q);
        } else if (qtype === 'text' || qtype === 'open') {
          html += _renderTextQ(q, globalQNum);
        } else {
          html += _renderMCQ(q, globalQNum, qtype);
        }
      });

      html += '</div>';
    });

    container.innerHTML = html;
    window.LernsetEngine?.renderMathIn(container);
  }

  function _renderMCQ(q, num, qtype) {
    const isMulti = qtype === 'multiple_choice';
    return `
      <div class="bg-gray-800 rounded-2xl p-4 mb-4" id="q-card-${q.id}">
        <div class="flex gap-3 mb-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">${num}</span>
          <div class="flex-1">
            <p class="text-sm leading-relaxed font-medium">${q.text.replace(/\n/g, '<br>')}</p>
            <div class="flex gap-2 mt-1">
              <span class="text-xs text-blue-400">${q.points} ${q.points === 1 ? 'Punkt' : 'Punkte'}</span>
              ${isMulti ? '<span class="text-xs text-gray-500">Mehrere Antworten möglich</span>' : ''}
            </div>
            ${q.imageHtml ? `<div class="mt-3 overflow-x-auto">${q.imageHtml}</div>` : ''}
          </div>
        </div>
        <div class="space-y-2 ml-10" id="choices-${q.id}">
          ${(q.choices || []).map(c => `
            <button onclick="ExamScreen.selectChoice('${q.id}', '${c.key}', '${qtype}')"
              id="choice-${q.id}-${c.key}"
              class="w-full text-left px-4 py-3 rounded-xl text-sm transition choice-btn
                     bg-gray-700 hover:bg-gray-600 text-gray-200 border border-transparent">
              <span class="font-bold text-blue-400 mr-2">${c.key})</span>${c.text}
            </button>`).join('')}
        </div>
      </div>`;
  }

  function _renderTextQ(q, num) {
    return `
      <div class="bg-gray-800 rounded-2xl p-4 mb-4" id="q-card-${q.id}">
        <div class="flex gap-3 mb-3">
          <span class="flex-shrink-0 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">${num}</span>
          <div class="flex-1">
            <p class="text-sm leading-relaxed font-medium">${q.text.replace(/\n/g, '<br>')}</p>
            ${q.imageHtml ? `<div class="mt-3 overflow-x-auto">${q.imageHtml}</div>` : ''}
            <span class="text-xs text-blue-400">${q.points} ${q.points === 1 ? 'Punkt' : 'Punkte'}</span>
          </div>
        </div>
        <div class="ml-10">
          <textarea
            id="text-${q.id}"
            oninput="ExamScreen.setTextAnswer('${q.id}', this.value)"
            class="w-full bg-gray-900 border border-gray-600 rounded-xl px-3 py-2 text-sm resize-none h-24 focus:border-blue-500 focus:outline-none transition"
            placeholder="Deine Antwort hier eingeben..."></textarea>
        </div>
      </div>`;
  }

  function _renderSectionAudio(section) {
    const a = section.audio;
    if (!a) return '';
    if (a.type === 'mp3') {
      return `
          <div class="bg-indigo-950 border border-indigo-700 rounded-xl p-3 mb-4">
            <div class="text-xs text-indigo-300 font-semibold mb-2">🎧 Hörtext</div>
            <audio controls preload="none" class="w-full" src="${a.src}"></audio>
          </div>`;
    }
    if (a.type === 'tts') {
      return `
          <div class="bg-indigo-950 border border-indigo-700 rounded-xl p-3 mb-4">
            <div class="text-xs text-indigo-300 font-semibold mb-1">🎧 Hörtext (Computerstimme)</div>
            <div class="text-xs text-gray-400 mb-2">Für diese ältere Prüfung existiert keine Original-Aufnahme — der Text wird von der Sprachausgabe deines Geräts vorgelesen. Du kannst ihn beliebig oft abspielen.</div>
            <div class="flex gap-2 flex-wrap">
              <button onclick="ExamScreen.playSectionAudio('${section.id}')" class="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3 py-1.5 text-xs font-bold transition">▶ Abspielen</button>
              <button onclick="ExamScreen.stopSectionAudio()" class="bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1.5 text-xs font-bold transition">⏹ Stopp</button>
              <button onclick="ExamScreen.toggleTranscript('${section.id}')" id="tts-transcript-btn-${section.id}" class="bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1.5 text-xs font-bold transition hidden">Transkript anzeigen</button>
            </div>
            <div id="tts-transcript-${section.id}" class="hidden mt-2 text-xs text-gray-300 bg-gray-900 rounded-lg p-3 leading-relaxed"></div>
          </div>`;
    }
    return '';
  }

  function playSectionAudio(sectionId) {
    const section = (_examData?.sections || []).find(s => s.id === sectionId);
    if (!section || !section.audio || section.audio.type !== 'tts') return;
    if (!('speechSynthesis' in window)) { alert('Sprachausgabe wird von diesem Browser nicht unterstützt.'); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(section.audio.voiceText);
    utter.lang = 'en-GB';
    utter.rate = 0.95;
    window.speechSynthesis.speak(utter);
    const btn = document.getElementById(`tts-transcript-btn-${sectionId}`);
    if (btn) btn.classList.remove('hidden');
  }

  function stopSectionAudio() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function toggleTranscript(sectionId) {
    const section = (_examData?.sections || []).find(s => s.id === sectionId);
    const box = document.getElementById(`tts-transcript-${sectionId}`);
    const btn = document.getElementById(`tts-transcript-btn-${sectionId}`);
    if (!section || !box) return;
    if (box.classList.contains('hidden')) {
      box.textContent = section.audio.voiceText;
      box.classList.remove('hidden');
      if (btn) btn.textContent = 'Transkript verbergen';
    } else {
      box.classList.add('hidden');
      if (btn) btn.textContent = 'Transkript anzeigen';
    }
  }

  function _renderGappedDropdown(q) {
    let text = q.gappedText || '';
    (q.gaps || []).forEach((gap, i) => {
      const gid = gap.gapId || gap.id;
      const opts = gap.choices.map(c => `<option value="${c}">${c}</option>`).join('');
      const sel = `<select id="gap-${q.id}-${gid}"
        onchange="ExamScreen.setGapAnswer('${q.id}','${gid}',this.value)"
        class="inline-block bg-gray-900 border border-blue-500 rounded-lg px-2 py-0.5 text-sm mx-0.5 cursor-pointer text-white align-middle">
        <option value="">[${i + 1}]</option>${opts}
      </select>`;
      text = text.replace(new RegExp('\\{\\{' + gid + '\\}\\}', 'g'), sel);
    });
    return `
      <div class="bg-gray-800 rounded-2xl p-4 mb-4" id="q-card-${q.id}">
        <div class="flex items-center gap-2 mb-3 text-xs">
          <span class="text-blue-400 font-bold">${q.points} Punkte</span>
          <span class="text-gray-500">— Wähle für jede Lücke das passende Wort aus dem Dropdown</span>
        </div>
        <div class="text-sm leading-9 text-gray-200 bg-gray-900 rounded-xl p-4">${text}</div>
      </div>`;
  }

  function _renderGappedInput(q) {
    let text = q.gappedText || '';
    (q.gaps || []).forEach((gap, i) => {
      const gid = gap.gapId || gap.id;
      const bracket = gap.wordInBrackets
        ? `<span class="text-xs text-yellow-400 ml-0.5 align-middle font-mono">(${gap.wordInBrackets})</span>` : '';
      const inp = `<span class="inline-flex items-baseline mx-0.5 align-middle">` +
        `<input type="text" id="gap-${q.id}-${gid}"` +
        ` oninput="ExamScreen.setGapAnswer('${q.id}','${gid}',this.value)"` +
        ` class="inline-block bg-gray-900 border-b-2 border-blue-400 w-28 text-center text-sm px-1 text-white focus:outline-none focus:border-blue-300"` +
        ` placeholder="${i + 1}. ……" autocomplete="off" autocorrect="off" spellcheck="false">` +
        bracket + `</span>`;
      text = text.replace(new RegExp('\\{\\{' + gid + '\\}\\}', 'g'), inp);
    });
    return `
      <div class="bg-gray-800 rounded-2xl p-4 mb-4" id="q-card-${q.id}">
        <div class="flex items-center gap-2 mb-3 text-xs">
          <span class="text-blue-400 font-bold">${q.points} Punkte</span>
          <span class="text-gray-500">— Schreibe die richtige Wortform in jede Lücke</span>
        </div>
        <div class="text-sm leading-9 text-gray-200 bg-gray-900 rounded-xl p-4">${text}</div>
      </div>`;
  }

  // ── Answer Handling ───────────────────────────────────────────────────────
  function selectChoice(questionId, choiceKey, qtype) {
    const isMulti = qtype === 'multiple_choice';

    if (isMulti) {
      if (!_answers[questionId]) _answers[questionId] = [];
      const arr = _answers[questionId];
      const idx = arr.indexOf(choiceKey);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(choiceKey);
    } else {
      _answers[questionId] = [choiceKey];
    }

    _updateChoiceUI(questionId, isMulti);
    _updateProgress();
  }

  function _updateChoiceUI(questionId, isMulti) {
    const selected = _answers[questionId] || [];
    const container = document.getElementById('choices-' + questionId);
    if (!container) return;

    container.querySelectorAll('.choice-btn').forEach(btn => {
      const key = btn.id.split('-').pop();
      const isSelected = selected.includes(key);
      btn.className = btn.className
        .replace(/bg-blue-600|bg-gray-700/g, '')
        .replace(/border-blue-500|border-transparent/g, '');
      btn.className += isSelected
        ? ' bg-blue-600 border-blue-500'
        : ' bg-gray-700 border-transparent';
    });
  }

  function setTextAnswer(questionId, value) {
    _answers[questionId] = value;
    _updateProgress();
  }

  function setGapAnswer(questionId, gapId, value) {
    if (!_answers[questionId] || typeof _answers[questionId] !== 'object' || Array.isArray(_answers[questionId])) {
      _answers[questionId] = {};
    }
    _answers[questionId][gapId] = value;
    _updateProgress();
  }

  // ── Abort ─────────────────────────────────────────────────────────────────
  function confirmAbort() {
    const modal = document.getElementById('exam-abort-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function cancelAbort() {
    const modal = document.getElementById('exam-abort-modal');
    if (modal) modal.classList.add('hidden');
  }

  function abortExam() {
    _stopTimer();
    _examActive = false;
    if (window._examBeforeUnload) window.removeEventListener('beforeunload', window._examBeforeUnload);

    document.getElementById('exam-abort-modal')?.classList.add('hidden');
    document.getElementById('exam-overlay')?.classList.add('hidden');
    document.getElementById('exam-results-overlay')?.classList.add('hidden');
    _examData = null;
    _answers = {};
  }

  function _stopTimer() {
    if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
  }

  // ── Submit & Score ────────────────────────────────────────────────────────
  function submitExam(timeUp = false) {
    if (!_examData) return;
    _stopTimer();

    // Confirm if not time-up and some questions unanswered
    const total = _examData.sections.reduce((s, sec) => s + sec.questions.length, 0);
    const answered = Object.keys(_answers).length;
    if (!timeUp && answered < total) {
      const go = confirm(`Du hast ${total - answered} Frage(n) nicht beantwortet. Trotzdem abgeben?`);
      if (!go) return;
    }

    const results = _scoreExam();
    _renderResults(results, timeUp);
  }

  function _scoreExam() {
    const d = _examData;
    const scoring = d.scoring_rules || {};
    let totalEarned = 0;
    let totalMax = 0;
    const sections = [];

    d.sections.forEach(section => {
      const qt = section.question_type || 'single_choice';
      const rules = scoring[qt] || scoring['single_choice'] || { correct: 1, wrong: 0, blank: 0 };
      let secEarned = 0;
      let secMax = 0;
      const questions = [];

      section.questions.forEach(q => {
        const qtype = q.type || qt;
        const maxPts = q.points || 0;
        secMax += maxPts;
        const userAnswer = _answers[q.id];

        let earned = 0;
        let isCorrect = false;
        let partial = false;

        if (qtype === 'text' || qtype === 'open') {
          // Text: manual / AI evaluation — we defer to results screen
          earned = null; // unknown until reviewed
          isCorrect = null;
        } else if (qtype === 'gapped_text_dropdown' || qtype === 'gapped_text_input') {
          const gaps = q.gaps || [];
          const ptsPerGap = gaps.length > 0 ? maxPts / gaps.length : 0;
          let correctCount = 0;
          gaps.forEach(gap => {
            const gid = gap.gapId || gap.id;
            const userVal = ((userAnswer && typeof userAnswer === 'object') ? (userAnswer[gid] || '') : '').trim();
            if (qtype === 'gapped_text_dropdown') {
              if (userVal === gap.correct) correctCount++;
            } else {
              const acceptable = (Array.isArray(gap.correct) ? gap.correct : [gap.correct])
                .map(a => String(a).trim().toLowerCase());
              if (userVal.length > 0 && acceptable.includes(userVal.toLowerCase())) correctCount++;
            }
          });
          earned = Math.round(correctCount * ptsPerGap * 10) / 10;
          isCorrect = correctCount === gaps.length;
        } else {
          const correct = q.correct || [];
          if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
            earned = rules.blank || 0;
          } else {
            const userArr = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
            const isFullyCorrect = correct.length === userArr.length
              && correct.every(k => userArr.includes(k));
            if (isFullyCorrect) {
              earned = maxPts; // full points for correct
              isCorrect = true;
            } else {
              earned = 0; // standard: wrong = 0
              isCorrect = false;
            }
          }
        }

        if (earned !== null) secEarned += earned;
        questions.push({
          q, userAnswer,
          earned, maxPts, isCorrect,
          correct: q.correct || [],
          explanation: q.explanation || '',
          modelAnswer: q.model_answer || '',
        });
      });

      totalEarned += secEarned;
      totalMax += secMax;
      sections.push({ section, questions, secEarned, secMax });
    });

    return { sections, totalEarned, totalMax, grading: d.exam_info?.grading };
  }

  function _renderResults(results, timeUp) {
    const overlay = document.getElementById('exam-results-overlay');
    if (!overlay) return;

    // Hide exam overlay, show results
    document.getElementById('exam-overlay').classList.add('hidden');
    overlay.classList.remove('hidden');

    const pct = results.totalMax > 0
      ? Math.round(results.totalEarned / results.totalMax * 100) : 0;

    let grade = '';
    if (results.grading) {
      // Parse grading string like "Note 6.0: ≥85%, Note 5.5: ≥75%, ..."
      const matches = results.grading.match(/Note (\d+\.?\d*): ≥(\d+)%/g) || [];
      for (const m of matches) {
        const [, g, threshold] = m.match(/Note (\d+\.?\d*): ≥(\d+)%/);
        if (pct >= parseInt(threshold)) { grade = g; break; }
      }
    }

    const gradeColor = grade >= 4 ? 'text-green-400' : grade ? 'text-red-400' : 'text-gray-400';
    const pctColor = pct >= 60 ? 'text-green-400' : pct >= 45 ? 'text-yellow-400' : 'text-red-400';

    let html = `
      <div class="max-w-3xl mx-auto px-4 py-8">
        ${timeUp ? '<div class="bg-red-900 text-red-200 rounded-xl px-4 py-2 text-sm text-center mb-6">⏱ Zeit abgelaufen — Prüfung automatisch abgegeben</div>' : ''}

        <div class="bg-gray-800 rounded-3xl p-6 text-center mb-6">
          <div class="text-5xl font-black ${pctColor} mb-1">${pct}%</div>
          <div class="text-xl text-gray-300">${results.totalEarned} / ${results.totalMax} Punkte</div>
          ${grade ? `<div class="text-3xl font-bold ${gradeColor} mt-3">Note ${grade}</div>` : ''}
          ${results.grading ? `<div class="text-xs text-gray-500 mt-3 leading-relaxed">${results.grading}</div>` : ''}
        </div>

        <div class="space-y-4">`;

    results.sections.forEach(({ section, questions, secEarned, secMax }) => {
      html += `
          <div class="bg-gray-800 rounded-2xl overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
              <h3 class="font-bold">${section.title}</h3>
              <span class="text-sm font-bold text-blue-400">${secEarned} / ${secMax} P</span>
            </div>
            <div class="divide-y divide-gray-700">`;

      questions.forEach(({ q, userAnswer, earned, maxPts, isCorrect, correct, explanation, modelAnswer }) => {
        const userArr = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
        const isText = q.type === 'text' || q.type === 'open';
        const isGapped = q.type === 'gapped_text_dropdown' || q.type === 'gapped_text_input';

        const statusIcon = isText ? '📝' : isGapped ? (isCorrect ? '✅' : '📝') : isCorrect ? '✅' : '❌';
        const bgClass = (isText || isGapped) ? (isCorrect ? 'border-l-4 border-green-600' : 'border-l-4 border-yellow-700') : isCorrect ? 'border-l-4 border-green-600' : 'border-l-4 border-red-700';

        const displayLabel = isGapped
          ? (q.type === 'gapped_text_dropdown' ? 'Gapped Text (Dropdown)' : 'Word Building / Collocations')
          : (q.text || '').substring(0, 120) + ((q.text || '').length > 120 ? '…' : '');

        html += `
              <div class="px-4 py-4 ${bgClass}">
                <div class="flex gap-2 items-start mb-2">
                  <span class="text-base flex-shrink-0">${statusIcon}</span>
                  <p class="text-sm font-medium flex-1">${displayLabel}</p>
                  <span class="text-xs text-gray-500 flex-shrink-0">${earned !== null ? earned : '?'}/${maxPts}P</span>
                </div>`;

        if (isGapped) {
          const userGaps = (userAnswer && typeof userAnswer === 'object' && !Array.isArray(userAnswer)) ? userAnswer : {};
          html += `<div class="ml-7 mt-1 space-y-1">`;
          (q.gaps || []).forEach((gap, i) => {
            const gid = gap.gapId || gap.id;
            const userVal = (userGaps[gid] || '').trim();
            let gapOk;
            if (q.type === 'gapped_text_dropdown') {
              gapOk = userVal === gap.correct;
            } else {
              const acc = (Array.isArray(gap.correct) ? gap.correct : [gap.correct]).map(a => String(a).trim().toLowerCase());
              gapOk = userVal.length > 0 && acc.includes(userVal.toLowerCase());
            }
            const correctVal = Array.isArray(gap.correct) ? gap.correct[0] : gap.correct;
            const bracketLabel = gap.wordInBrackets ? ` (${gap.wordInBrackets})` : '';
            html += `<div class="text-xs ${gapOk ? 'text-green-400' : 'text-red-400'}">
              ${gapOk ? '✓' : '✗'} Gap ${i + 1}${bracketLabel}: <strong>"${userVal || '—'}"</strong>
              ${!gapOk ? `<span class="text-gray-400"> → "${correctVal}"</span>` : ''}
            </div>`;
          });
          html += `</div>`;
          if (explanation) html += `<div class="ml-7 mt-2 text-xs text-gray-500 italic">${explanation}</div>`;
        } else if (isText) {
          html += `
                <div class="ml-7 space-y-2">
                  <div class="bg-gray-900 rounded-lg p-3 text-xs">
                    <div class="text-gray-500 mb-1">Deine Antwort:</div>
                    <div class="text-gray-300">${userAnswer || '(keine Antwort)'}</div>
                  </div>
                  ${modelAnswer ? `
                  <div class="bg-green-950 border border-green-800 rounded-lg p-3 text-xs">
                    <div class="text-green-500 mb-1">Musterlösung:</div>
                    <div class="text-gray-300">${modelAnswer}</div>
                  </div>` : ''}
                  <div class="text-xs text-yellow-600">Textantworten: Bitte mit Musterlösung selbst vergleichen.</div>
                </div>`;
        } else {
          // Show choices with correct/wrong indicators
          if (q.choices) {
            html += `<div class="ml-7 space-y-1 mt-1">`;
            q.choices.forEach(c => {
              const userSelected = userArr.includes(c.key);
              const isRight = correct.includes(c.key);
              let cls = 'text-gray-500';
              let prefix = '  ';
              if (isRight && userSelected) { cls = 'text-green-400 font-bold'; prefix = '✓ '; }
              else if (isRight && !userSelected) { cls = 'text-green-600'; prefix = '✓ '; }
              else if (!isRight && userSelected) { cls = 'text-red-400'; prefix = '✗ '; }
              html += `<div class="text-xs ${cls}">${prefix}<span class="font-bold">${c.key})</span> ${c.text}</div>`;
            });
            html += '</div>';
          }
          if (explanation) {
            html += `<div class="ml-7 mt-2 text-xs text-gray-500 italic">${explanation}</div>`;
          }
        }

        html += '</div>';
      });

      html += '</div></div>';
    });

    html += `
        </div>

        <div id="ai-feedback-section" class="mt-6 bg-gray-800 rounded-2xl p-4">
          <div class="flex items-center justify-between mb-2">
            <div>
              <div class="font-bold text-sm">KI-Prüfungskorrektur</div>
              <div class="text-xs text-gray-400">Personalisiertes Feedback zu deinen Fehlern</div>
            </div>
            <button onclick="ExamScreen.requestAiFeedback()"
              class="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-4 py-2 text-sm font-bold transition flex-shrink-0 ml-3">
              Analysieren
            </button>
          </div>
          <div id="ai-feedback-output" class="hidden"></div>
        </div>

        <div class="mt-6 flex gap-3">
          <button onclick="ExamScreen.closeResults()" class="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-bold transition">
            Zurück zur Auswahl
          </button>
          <button onclick="ExamScreen.closeResults(); ExamScreen.showSetup('${_examData?.id || ''}')"
            class="flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-bold transition">
            Nochmals üben
          </button>
        </div>
      </div>`;

    overlay.innerHTML = html;
    window.LernsetEngine?.renderMathIn(overlay);
    overlay.scrollTop = 0;

    // Clean up
    _examActive = false;
    if (window._examBeforeUnload) window.removeEventListener('beforeunload', window._examBeforeUnload);

    // Ergebnis async in Supabase speichern + Feed invalidieren
    _saveResultToSupabase(results);
  }

  function closeResults() {
    const overlay = document.getElementById('exam-results-overlay');
    if (overlay) overlay.classList.add('hidden');
    _examData = null;
    _answers = {};
    renderSelector();
  }

  // ── Supabase Result Persistence ───────────────────────────────────────────
  async function _getUserId() {
    try {
      const { data } = await window.supabaseClient.auth.getUser();
      return data?.user?.id || null;
    } catch { return null; }
  }

  async function _saveResultToSupabase(results) {
    try {
      const userId = await _getUserId();
      if (!userId || !_currentEntry) return;

      const pct = results.totalMax > 0
        ? Math.round(results.totalEarned / results.totalMax * 100) : 0;

      const answers = [];
      results.sections.forEach(({ questions }) => {
        questions.forEach(({ q, isCorrect }) => {
          answers.push({
            question_id: q.id,
            topics: q.topics || [],
            is_correct: isCorrect === true,
          });
        });
      });

      await window.supabaseClient.rpc('save_exam_result', {
        p_user_id:  userId,
        p_exam_id:  _currentEntry.id,
        p_course:   _currentEntry.course,
        p_score:    pct,
        p_answers:  answers,
      });

      // Feed im Hintergrund neu laden — Schwachstellen-Videos erscheinen sofort oben
      if (window.FeedScreen) FeedScreen.load();
    } catch (e) {
      console.warn('save_exam_result:', e);
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function _enrolledCourses() {
    const enrolled = AppState.get('enrolledCourses');
    if (!enrolled || enrolled.length === 0) return (COURSES_CONFIG || []).map(c => c.key);
    return enrolled;
  }

  function isExamActive() { return _examActive; }

  async function requestAiFeedback() {
    const btn = document.querySelector('#ai-feedback-section button');
    const out = document.getElementById('ai-feedback-output');
    if (!btn || !out) return;

    btn.disabled = true;
    btn.textContent = '…';
    out.classList.remove('hidden');
    out.className = 'mt-3 text-xs text-gray-400 animate-pulse';
    out.textContent = 'KI analysiert deine Fehler…';

    try {
      const results = _scoreExam();
      const wrong = [];
      results.sections.forEach(({ questions }) => {
        questions.forEach(({ q, userAnswer, isCorrect, correct }) => {
          if (!isCorrect && q.type !== 'text') {
            const userArr = Array.isArray(userAnswer) ? userAnswer : (userAnswer ? [userAnswer] : []);
            wrong.push(`F: ${q.text}\nDeine Antwort: ${userArr.join(', ') || '(leer)'}\nRichtig: ${correct.join(', ')}`);
          }
        });
      });

      if (!wrong.length) {
        out.className = 'mt-3 text-xs text-green-400';
        out.textContent = 'Perfekt — keine Fehler zu analysieren!';
        btn.textContent = '✓';
        return;
      }

      const response = await AIService.ask(
        [{ role: 'user', content: `Ich habe ${wrong.length} Fragen falsch beantwortet:\n\n${wrong.join('\n\n')}\n\nGib mir in 3–5 Sätzen auf Deutsch personalisiertes Feedback: Welche Wissenslücken zeigen sich, und was soll ich gezielt wiederholen?` }],
        { system: 'Du bist ein präziser Prüfungscoach für Empirische Sozialforschung (HSG). Antworte auf Deutsch, knapp und direkt.', max_tokens: 512 }
      );

      const text = AIService.extractText(response);
      out.className = 'mt-3 text-sm text-gray-200 leading-relaxed bg-gray-900 rounded-xl p-3';
      out.textContent = text;
      btn.textContent = 'Nochmals';
      btn.disabled = false;
    } catch (err) {
      out.className = 'mt-3 text-xs text-yellow-400';
      out.textContent = err.message === 'no_key_set'
        ? 'Kein API-Key gesetzt — bitte im Profil eintragen.'
        : `Fehler: ${err.message}`;
      btn.textContent = 'Nochmals';
      btn.disabled = false;
    }
  }

  function getExamsByCourse(courseKey) {
    return EXAM_REGISTRY.filter(e => e.course === courseKey);
  }

  return {
    init, renderSelector,
    showSetup, closeSetup, startFromSetup, startExam,
    selectChoice, setTextAnswer, setGapAnswer,
    confirmAbort, cancelAbort, abortExam,
    submitExam, closeResults,
    isExamActive, requestAiFeedback,
    getExamsByCourse,
    playSectionAudio, stopSectionAudio, toggleTranscript,
  };
})();
