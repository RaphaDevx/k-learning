// ── Progress Screen ───────────────────────────────────────────────────────
// Lernpfad: Tagesziel · Level-Tree · Studiengang-Übersicht

window.ProgressScreen = (function () {

  function init() {
    const el = document.getElementById('view-progress');
    if (!el) return;
    el.innerHTML = _render();
  }

  // ── Haupt-Render ──────────────────────────────────────────────────────────

  function _render() {
    const daily    = LevelSystem.getDailyInfo();
    const xp       = LevelSystem.xp;
    const info     = LevelSystem.getLevelInfo(xp);
    const levels   = window.LEVEL_CONFIG?.levels || [];

    return `<div style="padding:1.25rem 1rem 6rem;max-width:640px;margin:0 auto">

      ${_renderDailyGoal(daily)}
      ${_renderLevelTree(xp, info, levels)}
      ${_renderStudiengang()}
      ${_renderTodos()}

    </div>`;
  }

  // ── Tagesziel ─────────────────────────────────────────────────────────────

  function _renderDailyGoal(daily) {
    const pct     = daily.progress.toFixed(0);
    const reached = daily.goalReached;
    const msg     = reached                  ? '🎉 Tagesziel erreicht — du bist ein Lernprofi!'
                  : daily.xpToday === 0      ? '💪 Starte jetzt deine heutige Lernsession!'
                  : daily.progress < 50      ? `🚀 Weiter so! Noch ${daily.goal - daily.xpToday} XP bis zum Ziel`
                                             : `🔥 Fast da! Nur noch ${daily.goal - daily.xpToday} XP fehlen`;

    return `
    <div class="fade-up" style="
      border-radius:1.25rem;padding:1.25rem;margin-bottom:1rem;
      background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(168,85,247,0.1));
      border:1px solid rgba(99,102,241,0.3)">

      <div class="flex items-center justify-between mb-3">
        <div>
          <div class="text-xs font-semibold mb-0.5" style="color:rgba(255,255,255,0.55)">TAGESZIEL</div>
          <div class="text-2xl font-black" style="color:#fff">
            ${daily.xpToday}
            <span style="font-size:0.9rem;font-weight:500;color:rgba(255,255,255,0.45)">/ ${daily.goal} XP</span>
          </div>
        </div>
        <div style="text-align:right">
          <div class="text-3xl font-black" style="color:${reached ? '#10b981' : '#f59e0b'}">${pct}%</div>
          <div class="text-xs mt-0.5" style="color:rgba(255,255,255,0.4)">🔥 ${daily.streak} Lerntage</div>
        </div>
      </div>

      <div style="height:8px;border-radius:9999px;background:rgba(255,255,255,0.1);overflow:hidden;margin-bottom:0.75rem">
        <div style="
          height:100%;border-radius:9999px;
          width:${Math.min(100, daily.progress)}%;
          background:${reached ? 'linear-gradient(90deg,#10b981,#34d399)' : 'linear-gradient(90deg,#6366f1,#a855f7)'};
          transition:width 0.8s ease"></div>
      </div>

      <div class="text-sm" style="color:rgba(255,255,255,0.7)">${msg}</div>
    </div>`;
  }

  // ── Level Tree ────────────────────────────────────────────────────────────

  function _renderLevelTree(xp, currentInfo, levels) {
    const nodes = levels.map((lvl, i) => {
      const isCompleted = xp >= (levels[i + 1]?.xp ?? Infinity);
      const isCurrent   = i === currentInfo.level;
      const isLocked    = !isCompleted && !isCurrent;
      const isLast      = i === levels.length - 1 && xp >= lvl.xp;

      const lineColor = isCompleted ? '#6366f1' : 'rgba(255,255,255,0.1)';
      const dot = isCompleted || isLast ? `<span style="font-size:1.4rem">${lvl.badge}</span>`
               : isCurrent             ? `<span style="font-size:1.4rem">${lvl.badge}</span>`
               :                         `<span style="font-size:1.1rem;opacity:0.35">🔒</span>`;

      const label = isCompleted || isLast
        ? `<span style="color:#6366f1;font-size:0.72rem;font-weight:700">ERREICHT</span>`
        : isCurrent
        ? `<span style="color:#a855f7;font-size:0.72rem;font-weight:700">AKTUELL</span>`
        : `<span style="color:rgba(255,255,255,0.25);font-size:0.72rem">ab ${lvl.xp} XP</span>`;

      const bar = isCurrent ? `
        <div style="margin-top:0.5rem">
          <div style="height:4px;border-radius:9999px;background:rgba(255,255,255,0.1);overflow:hidden">
            <div style="height:100%;border-radius:9999px;
              width:${currentInfo.progress.toFixed(1)}%;
              background:linear-gradient(90deg,#6366f1,#a855f7);
              transition:width 0.6s ease"></div>
          </div>
          <div style="font-size:0.72rem;margin-top:0.3rem;color:rgba(255,255,255,0.45)">
            ${currentInfo.xpInLevel} / ${currentInfo.xpNeeded} XP bis ${levels[i+1]?.name ?? '—'}
          </div>
        </div>` : '';

      const nodeBg = isCompleted || isLast ? 'rgba(99,102,241,0.15)'
                   : isCurrent             ? 'rgba(168,85,247,0.12)'
                   :                         'rgba(255,255,255,0.03)';
      const nodeBorder = isCompleted || isLast ? 'rgba(99,102,241,0.4)'
                        : isCurrent            ? 'rgba(168,85,247,0.5)'
                        :                        'rgba(255,255,255,0.07)';
      const nameColor = isLocked ? 'rgba(255,255,255,0.25)' : '#fff';

      const line = i < levels.length - 1
        ? `<div style="width:2px;height:16px;margin:2px auto 2px 1.35rem;background:${lineColor};border-radius:2px"></div>`
        : '';

      return `
        <div style="
          border-radius:0.875rem;padding:0.75rem 1rem;
          background:${nodeBg};border:1px solid ${nodeBorder}">
          <div class="flex items-center gap-3">
            <div style="width:2.5rem;text-align:center;flex-shrink:0">${dot}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span style="font-weight:700;font-size:0.95rem;color:${nameColor}">${lvl.name}</span>
                ${label}
              </div>
              ${bar}
            </div>
          </div>
        </div>
        ${line}`;
    }).join('');

    return `
    <div style="margin-bottom:1rem">
      <div class="flex items-center justify-between mb-3">
        <h2 style="font-size:1rem;font-weight:800;color:#fff">Dein Lernpfad</h2>
        <span style="font-size:0.75rem;color:rgba(255,255,255,0.4)">⭐ ${LevelSystem.xp} XP gesamt</span>
      </div>
      ${nodes}
    </div>`;
  }

  // ── Studiengang ───────────────────────────────────────────────────────────

  function _renderStudiengang() {
    const enrolled = AppState.get('enrolledCourses')
      || (window.COURSES_CONFIG || []).map(c => c.key);
    const courses = (window.COURSES_CONFIG || []).filter(c => enrolled.includes(c.key));
    if (!courses.length) return '';

    const quizStats = AppState.get('quizCourseStats') || {};
    const now = new Date();

    const cards = courses.map(c => {
      // Quiz-Trefferquote für diesen Kurs
      const topics = quizStats[c.key] || {};
      let correct = 0, total = 0;
      Object.values(topics).forEach(t => { correct += t.correct || 0; total += t.total || 0; });
      const readiness = total > 0 ? Math.round((correct / total) * 100) : 0;

      // Prüfungsdatum
      const examDate = c.examDate ? new Date(c.examDate) : null;
      const isPast   = examDate && examDate < now;
      const daysLeft = examDate && !isPast
        ? Math.ceil((examDate - now) / 86400000)
        : null;

      const dateLabel = isPast
        ? `<span style="color:#10b981;font-size:0.7rem">✓ Prüfung vorbei</span>`
        : daysLeft !== null
        ? `<span style="color:${daysLeft <= 7 ? '#f87171' : '#f59e0b'};font-size:0.7rem">📅 noch ${daysLeft}d</span>`
        : `<span style="color:rgba(255,255,255,0.3);font-size:0.7rem">Kein Termin</span>`;

      const barColor = readiness >= 70 ? '#10b981'
                     : readiness >= 40 ? '#f59e0b'
                     :                   '#6366f1';
      const statusText = readiness === 0 ? 'Noch kein Quiz gemacht'
                       : readiness >= 80  ? 'Sehr gut vorbereitet'
                       : readiness >= 60  ? 'Gut unterwegs'
                       : readiness >= 40  ? 'Ausbaufähig'
                       :                   'Mehr üben';

      return `
      <div style="border-radius:0.75rem;padding:0.875rem 1rem;margin-bottom:0.625rem;
        background:var(--card);border:1px solid var(--border)">
        <div class="flex items-center gap-2 mb-2">
          <span style="font-size:1.2rem">${c.icon}</span>
          <span style="font-weight:700;font-size:0.9rem;color:#fff;flex:1">${c.label}</span>
          ${dateLabel}
        </div>
        <div class="flex items-center gap-2">
          <div style="flex:1;height:5px;border-radius:9999px;background:rgba(255,255,255,0.08);overflow:hidden">
            <div style="height:100%;border-radius:9999px;width:${readiness}%;
              background:${barColor};transition:width 0.6s ease"></div>
          </div>
          <span style="font-size:0.75rem;font-weight:700;color:${barColor};min-width:2.5rem;text-align:right">${readiness}%</span>
        </div>
        <div style="font-size:0.7rem;margin-top:0.3rem;color:rgba(255,255,255,0.35)">${statusText}</div>
      </div>`;
    }).join('');

    return `
    <div style="margin-bottom:1rem">
      <div class="flex items-center justify-between mb-3">
        <h2 style="font-size:1rem;font-weight:800;color:#fff">Mein Studiengang</h2>
        <span style="font-size:0.7rem;color:rgba(255,255,255,0.3)">basierend auf Quiz-Performance</span>
      </div>
      ${cards}
    </div>`;
  }

  // ── Kommende Features ─────────────────────────────────────────────────────

  function _renderTodos() {
    const items = [
      { icon: '🌳', label: 'Skill-Tree mit Kurs-Freischaltung', tag: 'Coming soon' },
      { icon: '🎓', label: 'Semester-Import aus Studienplan',   tag: 'Coming soon' },
      { icon: '📄', label: 'Unterlagen-Management & Upload',    tag: 'Coming soon' },
    ];
    return `
    <div style="border-radius:1rem;padding:1rem;
      background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07)">
      <div style="font-size:0.75rem;font-weight:700;color:rgba(255,255,255,0.35);margin-bottom:0.75rem;letter-spacing:0.05em">
        BALD VERFÜGBAR
      </div>
      ${items.map(it => `
      <div class="flex items-center gap-3 py-2" style="border-top:1px solid rgba(255,255,255,0.05)">
        <span style="font-size:1.1rem">${it.icon}</span>
        <span style="font-size:0.85rem;color:rgba(255,255,255,0.45);flex:1">${it.label}</span>
        <span style="font-size:0.65rem;background:rgba(99,102,241,0.2);color:#818cf8;
          padding:0.2rem 0.5rem;border-radius:9999px;border:1px solid rgba(99,102,241,0.3)">${it.tag}</span>
      </div>`).join('')}
    </div>`;
  }

  return { init };
})();
