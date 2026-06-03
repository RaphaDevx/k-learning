// ── Quiz Screen ────────────────────────────────────────────────────────────
// One-question-at-a-time mode with immediate feedback and topic tracking.
// Launched via QuizScreen.launch(dataVarName) or QuizScreen.showSelector()

window.QuizScreen = (function() {

  const QUIZ_REGISTRY = [
    {
      id: 'esf-eigenklausur',
      label: 'ESF Eigenklausur',
      subtitle: '30 Fragen · Konzeptprüfung mit neuen Szenarien',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_EIGENKLAUSUR',
      tag: 'Voll',
      tagColor: '#7c3aed',
      icon: '🧪',
    },
    {
      id: 'esf-quiz-s1',
      label: 'ESF Quiz — Forschungsgrundlagen',
      subtitle: '8 Fragen · Deduktion, Paradigmen, Hypothesen',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_QUIZ_S1',
      tag: 'S1/2',
      tagColor: '#16a34a',
      icon: '🔬',
    },
    {
      id: 'esf-quiz-s2',
      label: 'ESF Quiz — Forschungsdesign',
      subtitle: '8 Fragen · Längsschnitt, Primär/Sekundärdaten, Stichproben',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_QUIZ_S2',
      tag: 'S3/4',
      tagColor: '#16a34a',
      icon: '📐',
    },
    {
      id: 'esf-quiz-s3',
      label: 'ESF Quiz — Qualitative Methoden',
      subtitle: '8 Fragen · Grounded Theory, IPA, Gütekriterien',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_QUIZ_S3',
      tag: 'S5/6',
      tagColor: '#16a34a',
      icon: '🗣️',
    },
    {
      id: 'esf-quiz-s4',
      label: 'ESF Quiz — Quantitative & Experimente',
      subtitle: '8 Fragen · UV/AV, Validität, ANOVA, Randomisierung',
      course: 'ESF',
      dataVar: 'EXAM_DATA_ESF_QUIZ_S4',
      tag: 'S7/8',
      tagColor: '#16a34a',
      icon: '📊',
    },
    {
      id: 'stat-topic1',
      label: 'Statistik — Deskriptive Statistik',
      subtitle: '10 Fragen · Lageparameter, Streuung, Skalenniveaus',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC1',
      tag: 'B1',
      tagColor: '#2563eb',
      icon: '📊',
    },
    {
      id: 'stat-topic2',
      label: 'Statistik — Wahrscheinlichkeitsrechnung',
      subtitle: '10 Fragen · Kolmogorov, Bayes, Kombinatorik',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC2',
      tag: 'B2',
      tagColor: '#2563eb',
      icon: '🎲',
    },
    {
      id: 'stat-topic3',
      label: 'Statistik — Wahrscheinlichkeitsverteilungen',
      subtitle: '10 Fragen · Binomial, Poisson, Normal, t/χ²/F',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC3',
      tag: 'B3',
      tagColor: '#2563eb',
      icon: '🔔',
    },
    {
      id: 'stat-topic4',
      label: 'Statistik — Schätztheorie & KI',
      subtitle: '10 Fragen · ZGS, Konfidenzintervalle, n bestimmen',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC4',
      tag: 'B4',
      tagColor: '#2563eb',
      icon: '📐',
    },
    {
      id: 'stat-topic5',
      label: 'Statistik — Hypothesentests',
      subtitle: '10 Fragen · z/t/χ²-Test, Pooled vs. Welch, F-Test',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC5',
      tag: 'B5',
      tagColor: '#2563eb',
      icon: '🧪',
    },
    {
      id: 'stat-topic6',
      label: 'Statistik — ANOVA & Regression',
      subtitle: '10 Fragen · ANOVA-Tabelle, OLS, R², Dummies',
      course: 'Statistik',
      dataVar: 'EXAM_DATA_STATISTIK_TOPIC6',
      tag: 'B6',
      tagColor: '#2563eb',
      icon: '📈',
    },
  ];

  let _questions = [];
  let _current   = 0;
  let _results   = [];
  let _selected  = [];
  let _answered  = false;
  let _dataVar   = null;
  let _quizMeta  = null;

  // ── Init (inline view, called by Router) ────────────────────────────────
  function init() {
    const container = document.getElementById('quiz-content');
    if (!container) return;

    const byCourse = {};
    QUIZ_REGISTRY.forEach(q => {
      if (!byCourse[q.course]) byCourse[q.course] = [];
      byCourse[q.course].push(q);
    });

    let html = '<div class="space-y-6">';
    Object.entries(byCourse).forEach(([course, quizzes]) => {
      html += `
        <div>
          <div class="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style="color:var(--txt-3)">${course}</div>
          <div class="space-y-2">
            ${quizzes.map(q => `
              <button onclick="QuizScreen.launch('${q.dataVar}')"
                class="w-full text-left rounded-2xl p-4 transition tap-card"
                style="background:var(--card-raised);border:1px solid var(--border)">
                <div class="flex items-center gap-3">
                  <span class="text-2xl flex-shrink-0">${q.icon}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="font-semibold text-sm truncate" style="color:var(--txt)">${q.label}</span>
                      <span class="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium text-white" style="background:${q.tagColor}">${q.tag}</span>
                    </div>
                    <div class="text-xs truncate" style="color:var(--txt-2)">${q.subtitle}</div>
                  </div>
                  <span class="flex-shrink-0 text-xs px-3 py-1.5 rounded-xl font-bold text-white" style="background:#4f46e5">Start ›</span>
                </div>
              </button>`).join('')}
          </div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  // ── Public API ──────────────────────────────────────────────────────────

  function showSelector() {
    const el = document.getElementById('quiz-selector-modal');
    if (!el) return;

    // Group by course
    const byCourse = {};
    QUIZ_REGISTRY.forEach(q => {
      if (!byCourse[q.course]) byCourse[q.course] = [];
      byCourse[q.course].push(q);
    });

    el.innerHTML = `
      <div class="flex flex-col h-full max-h-[90dvh]">
        <div class="flex items-center justify-between px-4 pt-4 pb-3 border-b flex-shrink-0" style="border-color:var(--border)">
          <h2 class="text-lg font-bold" style="color:var(--txt)">Quiz wählen</h2>
          <button onclick="QuizScreen.closeSelector()" class="text-2xl leading-none" style="color:var(--txt-2)">×</button>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          ${Object.entries(byCourse).map(([course, quizzes]) => `
            <div>
              <div class="text-xs font-semibold uppercase tracking-widest mb-2" style="color:var(--txt-3)">${course}</div>
              <div class="space-y-2">
                ${quizzes.map(q => `
                  <button onclick="QuizScreen.launch('${q.dataVar}')"
                    class="w-full text-left rounded-2xl p-3 transition tap-card"
                    style="background:var(--card-raised);border:1px solid var(--border)">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl flex-shrink-0">${q.icon}</span>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-0.5">
                          <span class="text-sm font-semibold truncate" style="color:var(--txt)">${q.label}</span>
                          <span class="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium text-white" style="background:${q.tagColor}">${q.tag}</span>
                        </div>
                        <div class="text-xs truncate" style="color:var(--txt-2)">${q.subtitle}</div>
                      </div>
                      <span style="color:var(--txt-3)">›</span>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    el.classList.remove('hidden');
  }

  function closeSelector() {
    const el = document.getElementById('quiz-selector-modal');
    if (el) el.classList.add('hidden');
  }

  function launch(dataVarName) {
    closeSelector();
    const data = window[dataVarName];
    if (!data) {
      alert('Quiz-Daten nicht gefunden: ' + dataVarName);
      return;
    }

    _quizMeta = QUIZ_REGISTRY.find(q => q.dataVar === dataVarName) || { label: data.title };
    _dataVar  = dataVarName;
    _questions = [];
    data.sections.forEach(s => {
      s.questions.forEach(q => {
        _questions.push({ ...q, question_type: s.question_type });
      });
    });

    _current  = 0;
    _results  = [];
    _selected = [];
    _answered = false;

    const overlay = document.getElementById('quiz-overlay');
    if (overlay) overlay.classList.remove('hidden');
    _renderQuestion();
  }

  function close() {
    const overlay = document.getElementById('quiz-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  function toggleChoice(key) {
    if (_answered) return;
    const q = _questions[_current];
    const btn = document.getElementById('qc-' + key);

    if (q.question_type === 'single_choice') {
      _selected = [key];
      q.choices.forEach(c => {
        const b = document.getElementById('qc-' + c.key);
        if (b) _resetChoiceStyle(b, c.key === key);
      });
    } else {
      const idx = _selected.indexOf(key);
      if (idx >= 0) {
        _selected.splice(idx, 1);
        if (btn) _resetChoiceStyle(btn, false);
      } else {
        _selected.push(key);
        if (btn) _resetChoiceStyle(btn, true);
      }
    }
  }

  function submitAnswer() {
    if (_answered) {
      _current++;
      _renderQuestion();
      return;
    }
    if (_selected.length === 0) return;
    _answered = true;

    const q = _questions[_current];
    const correct = q.correct.slice().sort().join(',') === _selected.slice().sort().join(',');

    _results.push({ correct, topic: q.topics?.[0] || 'Allgemein', questionId: q.id });
    _updateState(q.id, correct, q.topics?.[0] || 'Allgemein');

    // Colour choices
    q.choices.forEach(c => {
      const btn = document.getElementById('qc-' + c.key);
      if (!btn) return;
      const isCorrect  = q.correct.includes(c.key);
      const isSelected = _selected.includes(c.key);
      if (isCorrect) {
        btn.style.background   = 'rgba(22,163,74,0.2)';
        btn.style.borderColor  = '#16a34a';
        btn.style.color        = '#86efac';
      } else if (isSelected) {
        btn.style.background   = 'rgba(220,38,38,0.15)';
        btn.style.borderColor  = '#dc2626';
        btn.style.color        = '#fca5a5';
      }
    });

    // Feedback
    const fb = document.getElementById('quiz-feedback');
    if (fb) {
      fb.classList.remove('hidden');
      const resultIcon  = correct ? '✅' : '❌';
      const resultClass = correct ? 'text-green-400' : 'text-red-400';
      const resultLabel = correct
        ? 'Richtig!'
        : ('Falsch' + (q.correct.length ? ' — Richtig: <strong>' + q.correct.join(', ') + '</strong>' : ''));
      fb.innerHTML = `
        <div class="flex items-start gap-2 mb-2">
          <span class="text-xl flex-shrink-0 mt-0.5">${resultIcon}</span>
          <div>
            <div class="font-bold text-sm ${resultClass}">${resultLabel}</div>
            <p class="text-sm mt-1 leading-relaxed" style="color:var(--txt-2)">${q.explanation}</p>
          </div>
        </div>
      `;
    }

    // Swap button
    const ansBtn = document.getElementById('quiz-ans-btn');
    if (ansBtn) {
      const last = _current >= _questions.length - 1;
      ansBtn.textContent  = last ? 'Ergebnis ansehen ›' : 'Weiter ›';
      ansBtn.style.background = last ? '#7c3aed' : '#374151';
    }
  }

  // ── Internal ────────────────────────────────────────────────────────────

  function _renderQuestion() {
    const overlay = document.getElementById('quiz-overlay');
    if (!overlay) return;

    if (_current >= _questions.length) {
      _showResults(overlay);
      return;
    }

    const q   = _questions[_current];
    const pct = Math.round((_current / _questions.length) * 100);
    _selected = [];
    _answered = false;

    const isMC = q.question_type === 'multiple_choice';
    const topic = q.topics?.[0] || '';

    overlay.innerHTML = `
      <!-- Header -->
      <div class="flex-shrink-0">
        <div class="flex items-center justify-between px-4 py-3" style="border-bottom:1px solid rgba(255,255,255,0.08);background:#0f1623">
          <button onclick="QuizScreen.close()"
            class="text-sm px-3 py-1.5 rounded-xl transition"
            style="color:var(--txt-2);background:rgba(255,255,255,0.06)">Beenden</button>
          <div class="text-sm font-mono" style="color:var(--txt-2)">${_current + 1} / ${_questions.length}</div>
          <div class="text-xs px-2 py-1 rounded-lg font-medium" style="color:#a5b4fc;background:rgba(99,102,241,0.15)">${topic}</div>
        </div>
        <div class="h-1" style="background:rgba(255,255,255,0.06)">
          <div class="h-1 transition-all duration-500" style="width:${pct}%;background:linear-gradient(90deg,#6366f1,#8b5cf6)"></div>
        </div>
      </div>

      <!-- Question body -->
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-4 py-5">
          ${isMC ? `<div class="text-xs font-semibold uppercase tracking-widest mb-3" style="color:#f59e0b">Mehrfachauswahl — alle richtigen markieren</div>` : ''}
          ${q.imageHtml ? `<div class="mb-4">${q.imageHtml}</div>` : ''}
          <p class="text-base font-medium leading-relaxed mb-5" style="color:var(--txt)">${q.text}</p>

          <div class="space-y-2" id="quiz-choices">
            ${q.choices.map(c => `
              <button onclick="QuizScreen.toggleChoice('${c.key}')"
                id="qc-${c.key}"
                class="w-full text-left px-4 py-3 rounded-2xl border text-sm transition-all duration-150"
                style="background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.10);color:var(--txt)">
                <span class="font-bold mr-2 text-indigo-400">${c.key}.</span>${c.text}
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback" class="hidden mt-4 rounded-2xl p-4" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)"></div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex-shrink-0 px-4 py-4" style="border-top:1px solid rgba(255,255,255,0.08)">
        <button id="quiz-ans-btn" onclick="QuizScreen.submitAnswer()"
          class="w-full py-3.5 rounded-2xl font-bold text-sm transition-all"
          style="background:#4f46e5;color:#fff">
          Antworten
        </button>
      </div>
    `;
  }

  function _showResults(overlay) {
    const total   = _results.length;
    const correct = _results.filter(r => r.correct).length;
    const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;

    const byTopic = {};
    _results.forEach(r => {
      if (!byTopic[r.topic]) byTopic[r.topic] = { correct: 0, total: 0 };
      byTopic[r.topic].total++;
      if (r.correct) byTopic[r.topic].correct++;
    });

    const grade = pct >= 85 ? '6.0' : pct >= 75 ? '5.5' : pct >= 65 ? '5.0'
                : pct >= 55 ? '4.5' : pct >= 45 ? '4.0' : pct >= 35 ? '3.5' : '3.0';

    const weakTopics = Object.entries(byTopic)
      .filter(([, s]) => s.total > 0 && s.correct / s.total < 0.6)
      .map(([t]) => t);

    overlay.innerHTML = `
      <div class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-4 py-8">

          <!-- Score circle -->
          <div class="text-center mb-8">
            <div class="text-5xl mb-3">${pct >= 70 ? '🎯' : pct >= 50 ? '📚' : '💪'}</div>
            <div class="text-5xl font-black mb-1">${correct}<span class="text-2xl font-normal text-gray-500"> / ${total}</span></div>
            <div class="text-gray-400 text-sm mb-2">${pct}% richtig</div>
            <div class="text-2xl font-bold ${pct >= 60 ? 'text-green-400' : pct >= 45 ? 'text-yellow-400' : 'text-red-400'}">
              Note ~${grade}
            </div>
          </div>

          <!-- Topic breakdown -->
          <div class="rounded-2xl p-4 mb-4" style="background:var(--card);border:1px solid var(--border)">
            <h3 class="font-semibold text-sm mb-3" style="color:var(--txt)">Ergebnis nach Thema</h3>
            ${Object.entries(byTopic).map(([topic, s]) => {
              const tp  = Math.round((s.correct / s.total) * 100);
              const col = tp >= 70 ? '#16a34a' : tp >= 50 ? '#ca8a04' : '#dc2626';
              return `
                <div class="flex items-center gap-3 mb-2.5">
                  <div class="flex-1 text-sm truncate" style="color:var(--txt)">${topic}</div>
                  <div class="text-xs flex-shrink-0 font-mono" style="color:var(--txt-2)">${s.correct}/${s.total}</div>
                  <div class="w-24 h-2 rounded-full flex-shrink-0" style="background:rgba(255,255,255,0.08)">
                    <div class="h-2 rounded-full transition-all" style="width:${tp}%;background:${col}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Weak topics hint -->
          ${weakTopics.length > 0 ? `
            <div class="rounded-2xl p-4 mb-6" style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3)">
              <div class="text-xs font-semibold text-indigo-400 mb-1">💡 Schwache Themen — im Feed priorisiert:</div>
              <div class="text-sm" style="color:var(--txt-2)">${weakTopics.join(' · ')}</div>
            </div>
          ` : `
            <div class="rounded-2xl p-4 mb-6" style="background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.3)">
              <div class="text-xs font-semibold text-green-400">🏆 Stark! Keine Schwachstellen erkannt.</div>
            </div>
          `}

          <!-- Actions -->
          <div class="flex gap-3">
            <button onclick="QuizScreen.close()"
              class="flex-1 py-3.5 rounded-2xl font-bold text-sm transition"
              style="background:var(--card-raised);border:1px solid var(--border);color:var(--txt)">
              Schliessen
            </button>
            <button onclick="QuizScreen.launch('${_dataVar}')"
              class="flex-1 py-3.5 rounded-2xl font-bold text-sm transition text-white"
              style="background:#4f46e5">
              Nochmal
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function _resetChoiceStyle(btn, selected) {
    if (selected) {
      btn.style.background  = 'rgba(99,102,241,0.2)';
      btn.style.borderColor = '#6366f1';
      btn.style.color       = '#c7d2fe';
    } else {
      btn.style.background  = 'rgba(255,255,255,0.04)';
      btn.style.borderColor = 'rgba(255,255,255,0.10)';
      btn.style.color       = 'var(--txt)';
    }
  }

  function _updateState(qId, correct, topic) {
    try {
      const quizResults = AppState.get('quizResults') || {};
      if (!quizResults[_dataVar]) quizResults[_dataVar] = {};
      quizResults[_dataVar][qId] = { correct, topic, ts: Date.now() };
      AppState.set('quizResults', quizResults);

      const stats = AppState.get('quizTopicStats') || {};
      if (!stats[topic]) stats[topic] = { correct: 0, total: 0 };
      stats[topic].total++;
      if (correct) stats[topic].correct++;
      AppState.set('quizTopicStats', stats);

      if (window.Gamification) {
        if (correct) Gamification.addXP(5);
        else         Gamification.addXP(1);
      }
    } catch(e) {}
  }

  // ── Feed boost helper (called by FeedScreen) ────────────────────────────
  function getWeakTopics(threshold = 0.6) {
    const stats = AppState.get('quizTopicStats') || {};
    return Object.entries(stats)
      .filter(([, s]) => s.total >= 2 && s.correct / s.total < threshold)
      .map(([topic]) => topic);
  }

  function getTopicStats() {
    return AppState.get('quizTopicStats') || {};
  }

  return { init, showSelector, closeSelector, launch, close, toggleChoice, submitAnswer, getWeakTopics, getTopicStats, QUIZ_REGISTRY };
})();
