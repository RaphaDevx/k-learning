// ── Exam Screen ───────────────────────────────────────────────────────────

window.ExamScreen = (function() {
  let inited = false;

  function init() {
    if (inited) return;
    inited = true;
    renderExamSelector();
  }

  function renderExamSelector() {
    const container = document.getElementById('exam-content');
    if (!container) return;

    const exams = [
      { id: 'esf-hs23', label: 'ESF — HS 2023', course: 'ESF', file: 'exams/esf-hs23-data.js', available: true },
      { id: 'stat-pk2', label: 'Statistik — PK2', course: 'Statistik', file: 'exams/statistik-pk2-data.js', available: true },
      { id: 'om-pk1',   label: 'OM — Probeklausur', course: 'OM', available: false },
      { id: 'makro-pk1',label: 'MakroII — Probeklausur', course: 'MakroII', available: false },
    ];

    container.innerHTML = exams.map(exam => `
      <div class="bg-gray-800 rounded-2xl p-4 ${exam.available ? 'cursor-pointer hover:bg-gray-700' : 'opacity-50'} transition"
           ${exam.available ? `onclick="ExamScreen.loadExam('${exam.id}')"` : ''}>
        <div class="flex items-center justify-between">
          <div>
            <div class="font-bold">${exam.label}</div>
            <div class="text-xs text-gray-400 mt-0.5">${exam.course}</div>
          </div>
          ${exam.available
            ? '<span class="text-green-400 text-sm font-bold">▶ Starten</span>'
            : '<span class="text-gray-600 text-xs">Coming soon</span>'}
        </div>
      </div>
    `).join('');
  }

  function loadExam(examId) {
    const container = document.getElementById('exam-content');
    if (!container) return;
    container.innerHTML = `<div class="text-center py-12 text-gray-400"><div class="text-4xl mb-4">🚧</div><p>Klausur-Interface in Entwicklung.</p><p class="text-sm mt-2">Lade: ${examId}</p></div>`;
  }

  return { init, loadExam };
})();
