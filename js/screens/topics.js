// ── Topics Screen ─────────────────────────────────────────────────────────
// Sub-chapter browser: per course → sub-topics → flashcard count + progress

window.TopicsScreen = (function() {
  let activeCourse = 'ESF'; // ESF is most urgent

  function init() {
    render();
  }

  function render() {
    const container = document.getElementById('topics-content');
    if (!container) return;

    const data = window.TOPICS_DATA || {};
    const courses = Object.keys(data);

    // Course tabs
    const tabsHtml = courses.map(c => {
      const d = data[c];
      const isActive = c === activeCourse;
      return `
        <button onclick="TopicsScreen.selectCourse('${c}')"
                class="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition font-medium text-sm
                       ${isActive ? 'text-white' : 'text-gray-400 hover:text-white bg-gray-800'}"
                style="${isActive ? 'background:' + data[c].color + '33; border:1px solid ' + data[c].color + '66' : ''}">
          <span class="text-xl">${d.emoji}</span>
          <span>${c}</span>
        </button>`;
    }).join('');

    // Topic cards for active course
    const courseData = data[activeCourse];
    const allCards   = window.FLASHCARD_DATA || [];
    const prog       = AppState.get('cardProgress') || {};

    const topicsHtml = courseData.topics.map(topic => {
      const topicCards = allCards.filter(c => c.course === activeCourse && c.topic === topic.title);
      const total   = topicCards.length;
      const done    = topicCards.filter(c => prog[c.id] && prog[c.id].reviews > 0).length;
      const pct     = total ? Math.round(done / total * 100) : 0;
      const dueNow  = topicCards.filter(c => {
        const p = prog[c.id];
        return !p || !p.nextReview || p.nextReview <= Date.now();
      }).length;

      const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }[topic.priority] || '#6b7280';
      const priorityLabel = { high: 'Priorität hoch', medium: 'Mittel', low: 'Niedrig' }[topic.priority] || '';

      return `
        <div class="bg-gray-800 rounded-2xl p-4 hover:bg-gray-750 transition cursor-pointer"
             onclick="TopicsScreen.openTopic('${activeCourse}', '${topic.title.replace(/'/g, "\\'")}')">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="text-2xl">${topic.emoji}</span>
              <div>
                <div class="font-bold text-sm">${topic.title}</div>
                <div class="text-xs text-gray-400 mt-0.5">${topic.desc}</div>
              </div>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                  style="background:${priorityColor}22; color:${priorityColor}; border:1px solid ${priorityColor}44">
              ${priorityLabel}
            </span>
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-gray-400">${done} / ${total} Karten gelernt</span>
            ${dueNow > 0 ? `<span class="text-xs text-orange-400">${dueNow} fällig</span>` : '<span class="text-xs text-green-400">✓ Aktuell</span>'}
          </div>

          <div class="bg-gray-700 rounded-full h-1.5 mb-3">
            <div class="h-1.5 rounded-full transition-all" style="width:${pct}%; background:${courseData.color}"></div>
          </div>

          <div class="flex gap-2">
            <button onclick="event.stopPropagation(); TopicsScreen.openTopic('${activeCourse}', '${topic.title.replace(/'/g, "\\'")}')"
                    class="flex-1 text-xs py-1.5 rounded-xl font-medium transition"
                    style="background:${courseData.color}33; color:${courseData.color}; border:1px solid ${courseData.color}44">
              🃏 ${total > 0 ? 'Flashcards lernen' : 'Noch keine Karten'}
            </button>
          </div>
        </div>`;
    }).join('');

    // Course summary stats
    const allCourseCards = allCards.filter(c => c.course === activeCourse);
    const totalAll = allCourseCards.length;
    const doneAll  = allCourseCards.filter(c => prog[c.id] && prog[c.id].reviews > 0).length;
    const pctAll   = totalAll ? Math.round(doneAll / totalAll * 100) : 0;

    container.innerHTML = `
      <!-- Course tabs -->
      <div class="flex gap-2 overflow-x-auto pb-1 mb-6">${tabsHtml}</div>

      <!-- Course header -->
      <div class="rounded-2xl p-4 mb-5" style="background:${courseData.bgGradient}; border:1px solid rgba(255,255,255,0.1)">
        <div class="flex items-center gap-3 mb-3">
          <span class="text-4xl">${courseData.emoji}</span>
          <div>
            <h2 class="text-xl font-bold">${activeCourse}</h2>
            <div class="text-sm text-gray-300">${courseData.topics.length} Sub-Themen · ${totalAll} Flashcards</div>
          </div>
          <div class="ml-auto text-right">
            <div class="text-2xl font-bold">${pctAll}%</div>
            <div class="text-xs text-gray-300">erledigt</div>
          </div>
        </div>
        <div class="bg-black bg-opacity-20 rounded-full h-2">
          <div class="h-2 rounded-full transition-all" style="width:${pctAll}%; background:white; opacity:0.7"></div>
        </div>
      </div>

      <!-- Topic grid -->
      <div class="space-y-3">${topicsHtml}</div>
    `;
  }

  function selectCourse(course) {
    activeCourse = course;
    render();
  }

  function openTopic(course, topicTitle) {
    FlashcardsScreen.openForTopic(course, topicTitle);
  }

  return { init, render, selectCourse, openTopic };
})();
