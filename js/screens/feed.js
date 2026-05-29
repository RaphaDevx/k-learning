// ── Feed Screen ───────────────────────────────────────────────────────────
// Concept cards + Video cards, Instagram-style scroll

window.FeedScreen = (function() {
  let inited = false;
  let activeFilter = 'all';

  function init() {
    if (!inited) {
      render();
      inited = true;
    }
  }

  function render(filter) {
    if (filter !== undefined) activeFilter = filter;
    inited = false; // force re-render on filter change

    const container = document.getElementById('feed-cards-container');
    if (!container) return;

    let cards = window.FEED_CARDS || [];
    if (activeFilter === 'video') {
      cards = cards.filter(c => c.type === 'video');
    } else if (activeFilter === 'localvideo') {
      cards = cards.filter(c => c.type === 'localvideo');
    } else if (activeFilter !== 'all') {
      cards = cards.filter(c => c.course === activeFilter);
    }

    if (!cards.length) {
      container.innerHTML = '<div class="text-center py-20 text-gray-400"><div class="text-4xl mb-4">⚡</div><p>Keine Karten für diesen Filter.</p></div>';
      inited = true;
      return;
    }

    container.innerHTML = cards.map((c, i) => {
      if (c.type === 'localvideo') return renderLocalVideoCard(c, i);
      if (c.type === 'video')      return renderVideoCard(c, i);
      return renderConceptCard(c, i);
    }).join('');

    inited = true;
    updateFilterButtons();
  }

  function renderLocalVideoCard(card, index) {
    const topicBadges = (card.topics || []).map(t =>
      `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">${t}</span>`
    ).join('');

    const prog = AppState.get('feedProgress') || {};
    const watched = prog[card.id] === 'watched';

    return `
    <div class="feed-card px-4 py-3" id="feed-${index}">
      <div class="feed-card-inner rounded-3xl overflow-hidden flex flex-col"
           style="background:linear-gradient(160deg,#12040f 0%,#1e0a2e 100%); border:1px solid ${card.courseColor}44;">

        <!-- Header -->
        <div class="px-5 pt-5 pb-3">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold px-2 py-1 rounded-full text-white"
                  style="background:${card.courseColor}55; border:1px solid ${card.courseColor}88">${card.course}</span>
            <span class="text-xs px-2 py-0.5 rounded-full text-white"
                  style="${card.id.includes('nlm') ? 'background:rgba(16,185,129,0.3); border:1px solid rgba(16,185,129,0.5)' : 'background:rgba(124,58,237,0.3); border:1px solid rgba(124,58,237,0.5)'}">
              ${card.id.includes('nlm') ? '🎬 NotebookLM AI' : '📹 Short Video'}
            </span>
            <span class="text-xs text-gray-400 ml-auto">${card.duration}</span>
            ${watched ? '<span class="text-xs text-green-400 font-bold">✓ gesehen</span>' : ''}
          </div>
          <div class="text-xs text-gray-500 mb-2">${card.block || ''}</div>
          <div class="flex items-start gap-3">
            <div class="text-4xl">${card.emoji}</div>
            <div>
              <h2 class="text-lg font-bold leading-tight">${card.title}</h2>
              <p class="text-sm mt-1" style="color:${card.courseColor}cc">${card.subtitle}</p>
            </div>
          </div>
        </div>

        <!-- Video Player -->
        <div class="mx-4 mb-3 rounded-2xl overflow-hidden relative"
             style="background:#000; border:1px solid ${card.courseColor}33;">
          <video
            id="vid-${card.id}"
            class="w-full"
            style="max-height:55vh; object-fit:contain; background:#000;"
            controls
            preload="metadata"
            playsinline
            poster=""
            onplay="FeedScreen.trackVideoOpen('${card.id}')"
          >
            <source src="${card.video_src}" type="video/mp4">
            Dein Browser unterstützt kein Video.
          </video>
        </div>

        <!-- Meta -->
        <div class="px-5 pb-2">
          <p class="text-sm text-gray-300 mb-3">${card.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-3">${topicBadges}</div>
          <div class="flex items-center gap-3">
            <span class="text-xs px-2 py-1 rounded-full"
                  style="background:${card.courseColor}22; color:${card.courseColor}; border:1px solid ${card.courseColor}44">
              🎯 ${card.level}
            </span>
            <button onclick="FeedScreen.rate('${card.id}','knew')"
                    class="flex-1 text-xs py-2 rounded-xl font-bold transition"
                    style="background:rgba(52,211,153,0.15); color:#34d399; border:1px solid rgba(52,211,153,0.3)">
              ✅ Verstanden
            </button>
            <button onclick="FeedScreen.rate('${card.id}','didnt')"
                    class="flex-1 text-xs py-2 rounded-xl font-bold transition"
                    style="background:rgba(248,113,113,0.15); color:#f87171; border:1px solid rgba(248,113,113,0.3)">
              🔁 Nochmal
            </button>
          </div>
        </div>

        <!-- Spacer -->
        <div class="h-4"></div>
      </div>
    </div>`;
  }

  function renderConceptCard(card, index) {
    const urgencyBadge =
      card.course === 'ESF' ? '<span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">🔥 Nächste</span>' :
      card.course === 'OM'  ? '<span class="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">⚠️ Bald</span>' : '';

    return `
    <div class="feed-card px-4 py-3" id="feed-${index}">
      <div class="feed-card-inner rounded-3xl overflow-hidden flex flex-col"
           style="background:linear-gradient(160deg,#1e1e3a 0%,#0d1a2e 100%); border:1px solid rgba(255,255,255,0.08);">

        <div class="px-5 pt-5 pb-3">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold px-2 py-1 rounded-full text-white" style="background:${card.courseColor}88">${card.course}</span>
            <span class="text-xs text-gray-400">${card.block}</span>${urgencyBadge}
          </div>
          <div class="flex items-start gap-3">
            <span class="text-4xl">${card.emoji}</span>
            <div>
              <h2 class="text-lg font-bold leading-tight">${card.title}</h2>
              <p class="text-sm text-gray-300 mt-1 italic">${card.tldr}</p>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 flex-1">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Must-Knows</div>
          <ul class="space-y-2">
            ${card.key_points.map(p => `<li class="flex items-start gap-2 text-sm"><span class="text-blue-400 mt-0.5">→</span><span>${p}</span></li>`).join('')}
          </ul>
        </div>

        <div class="mx-4 rounded-2xl px-4 py-3 mb-3" style="background:rgba(255,255,255,0.05)">
          <div class="text-xs font-bold text-yellow-400 mb-1">💡 Merkhilfe</div>
          <p class="text-sm text-gray-200">${card.analogy}</p>
        </div>

        <div class="mx-4 rounded-2xl px-4 py-3 mb-3" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3)">
          <div class="text-xs font-bold text-red-400 mb-1">⚠️ Prüfungsfalle</div>
          <p class="text-sm text-gray-200">${card.exam_trap}</p>
        </div>

        <div class="px-5 pb-5">
          <div class="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">🧠 Recall Challenge</div>
          <div class="rounded-2xl px-4 py-3 mb-3" style="background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3)">
            <p class="text-sm font-medium">${card.recall_q}</p>
          </div>
          <button onclick="FeedScreen.toggleRecall('recall-feed-${index}')"
                  class="w-full text-sm text-gray-400 hover:text-white py-2 transition underline">
            Antwort anzeigen
          </button>
          <div id="recall-feed-${index}" class="recall-reveal">
            <div class="rounded-2xl px-4 py-3 mt-2" style="background:rgba(34,197,94,0.15)">
              <p class="text-sm text-green-200">${card.recall_a}</p>
            </div>
            <div class="flex gap-2 mt-3">
              <button onclick="FeedScreen.rate('${card.id}','knew')"
                      class="flex-1 bg-green-700 hover:bg-green-600 rounded-xl py-2 text-sm font-bold transition">✅ Wusste ich</button>
              <button onclick="FeedScreen.rate('${card.id}','didnt')"
                      class="flex-1 bg-red-800 hover:bg-red-700 rounded-xl py-2 text-sm font-bold transition">❌ Nicht gewusst</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderVideoCard(card, index) {
    const topicBadges = (card.topics || []).map(t =>
      `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">${t}</span>`
    ).join('');

    return `
    <div class="feed-card px-4 py-3" id="feed-${index}">
      <div class="feed-card-inner rounded-3xl overflow-hidden flex flex-col"
           style="background:linear-gradient(160deg,#0f1923 0%,#1a0a0a 100%); border:1px solid rgba(255,80,80,0.2);">

        <div class="px-5 pt-5 pb-3">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold px-2 py-1 rounded-full text-white" style="background:${card.courseColor}88">${card.course}</span>
            <span class="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">▶ Video</span>
            <span class="text-xs text-gray-400 ml-auto">${card.duration}</span>
          </div>

          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl">▶</div>
            <div>
              <h2 class="text-lg font-bold leading-tight">${card.title}</h2>
              <p class="text-sm text-gray-300 mt-1">${card.description}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 mb-4">${topicBadges}</div>

          <div class="rounded-2xl px-4 py-3 mb-4" style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2)">
            <div class="text-xs font-bold text-red-400 mb-1">🎯 Warum dieses Video?</div>
            <p class="text-sm text-gray-300">${card.why_watch}</p>
          </div>

          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-gray-500">Level:</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">${card.level}</span>
          </div>
        </div>

        <div class="px-5 pb-5">
          <a href="${card.youtube_url}" target="_blank" rel="noopener"
             class="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 rounded-2xl py-3 font-bold transition text-white no-underline"
             onclick="FeedScreen.trackVideoOpen('${card.id}')">
            <span class="text-xl">▶</span>
            <span>YouTube öffnen</span>
          </a>
        </div>
      </div>
    </div>`;
  }

  function toggleRecall(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  }

  function rate(cardId, rating) {
    const feedProg = AppState.get('feedProgress') || {};
    feedProg[cardId] = rating;
    AppState.set('feedProgress', feedProg);
    Gamification.addXP(rating === 'knew' ? Gamification.XP.feedKnew : Gamification.XP.feedDidnt);
  }

  function trackVideoOpen(cardId) {
    const feedProg = AppState.get('feedProgress') || {};
    feedProg[cardId] = 'watched';
    AppState.set('feedProgress', feedProg);
    Gamification.addXP(5);
  }

  function filterByAll()       { render('all'); }
  function filterByCourse(c)   { render(c); }

  function updateFilterButtons() {
    document.querySelectorAll('.feed-filter-btn').forEach(btn => {
      const isActive = btn.dataset.filter === activeFilter;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('bg-gray-700', !isActive);
      btn.classList.toggle('text-gray-300', !isActive);
    });
  }

  return { init, render, toggleRecall, rate, trackVideoOpen, filterByAll, filterByCourse };
})();
