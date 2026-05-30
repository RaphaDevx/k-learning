// ── Feed Screen ───────────────────────────────────────────────────────────────
// Instagram-style fullscreen video feed with Anki spaced repetition

window.FeedScreen = (function() {
  let activeFilter = null;
  let isLoading    = false;
  let observer     = null;  // IntersectionObserver for autoplay
  let isMuted      = true;  // Start muted (browser autoplay policy)

  function init() {
    load();
  }

  // ── Data loading ──────────────────────────────────────────────────────────

  async function load(course) {
    if (isLoading) return;
    isLoading = true;

    _destroyObserver();

    const container = document.getElementById('feed-cards-container');
    if (!container) return;

    container.innerHTML = _loadingSpinner();

    try {
      const userId = await _getUserId();
      let cards;

      if (userId) {
        const { data, error } = await window.supabaseClient
          .rpc('get_user_feed', { p_user_id: userId, p_course: course || null, p_limit: 30 });
        if (error) throw error;
        cards = data;
      } else {
        cards = _staticFallback(course);
      }

      cachedCards = cards || [];
      _render(cachedCards);

    } catch (err) {
      console.warn('Feed load error, fallback:', err);
      _render(_staticFallback(course));
    }

    isLoading = false;
  }

  function _staticFallback(course) {
    let cards = window.FEED_CARDS || [];
    if (course) cards = cards.filter(c => c.course === course);
    return cards.filter(c => c.type === 'localvideo');
  }

  async function _getUserId() {
    try {
      const { data } = await window.supabaseClient.auth.getUser();
      return data?.user?.id || null;
    } catch { return null; }
  }

  // ── Rendering ─────────────────────────────────────────────────────────────

  function _render(cards) {
    const container = document.getElementById('feed-cards-container');
    if (!container) return;

    if (!cards.length) {
      container.innerHTML = `<div class="feed-card" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;">
        <div style="font-size:3rem">⚡</div>
        <p style="color:#9ca3af">Keine Videos.</p></div>`;
      return;
    }

    container.innerHTML = cards.map((c, i) => _renderVideoCard(c, i)).join('');
    _updateFilterButtons();
    _initAutoplay();
  }

  function _renderVideoCard(card, index) {
    const id       = card.slug || card.id;
    const src      = card.hls_src || card.video_src;
    const isHLS    = src && src.endsWith('.m3u8');
    const label    = id.includes('nlm') ? '🎬 NotebookLM AI' : '📹 Short Video';
    const color    = card.course_color || card.courseColor || '#7c3aed';
    const dbId     = card.id || '';

    return `
    <div class="feed-card feed-card-video" id="feed-${index}" data-slug="${id}" data-db-id="${dbId}">
      <div class="feed-card-inner" style="background:#000;">

        <!-- Video: muted + loop für Autoplay (wie Instagram) -->
        <video
          id="vid-${id}"
          style="display:block;background:#000;"
          muted
          loop
          playsinline
          preload="auto"
          onplay="FeedScreen.onPlay('${id}','${dbId}')"
        >
          <source src="${src}" type="${isHLS ? 'application/x-mpegURL' : 'video/mp4'}">
        </video>

        <!-- Mute-Toggle oben rechts (wie Instagram) -->
        <button id="mute-${id}" onclick="FeedScreen.toggleMute('${id}')"
          style="position:absolute;top:4rem;right:1rem;z-index:20;
                 width:40px;height:40px;border-radius:50%;border:none;
                 background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);
                 color:white;font-size:1.1rem;cursor:pointer;display:flex;
                 align-items:center;justify-content:center;">
          🔇
        </button>

        <!-- Info-Overlay unten -->
        <div style="position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 55%,transparent 100%);
          padding:5rem 1rem 1.5rem;pointer-events:none;">

          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style="background:${color}66;border:1px solid ${color}99">${card.course}</span>
            <span class="text-xs text-white px-2 py-0.5 rounded-full"
              style="background:rgba(255,255,255,0.15)">${label}</span>
            <span class="text-xs text-gray-300 ml-auto">${card.duration || ''}</span>
          </div>

          <h2 class="text-sm font-bold text-white leading-tight mb-0.5">${card.title}</h2>
          <p class="text-xs mb-3" style="color:${color}dd">${card.subtitle || ''}</p>

          <div class="flex gap-2" style="pointer-events:auto">
            <button onclick="FeedScreen.rate('${id}','${dbId}','knew')"
              class="flex-1 text-xs py-2 rounded-xl font-bold"
              style="background:rgba(52,211,153,0.25);color:#34d399;border:1px solid rgba(52,211,153,0.5)">
              ✅ Kapiert
            </button>
            <button onclick="FeedScreen.rate('${id}','${dbId}','didnt')"
              class="flex-1 text-xs py-2 rounded-xl font-bold"
              style="background:rgba(248,113,113,0.25);color:#f87171;border:1px solid rgba(248,113,113,0.5)">
              🔁 Nochmal
            </button>
          </div>
        </div>

      </div>
    </div>`;
  }

  // ── Autoplay via IntersectionObserver ─────────────────────────────────────

  function _initAutoplay() {
    _destroyObserver();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const slug = card.dataset.slug;
        const vid  = document.getElementById('vid-' + slug);
        if (!vid) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          vid.muted = isMuted;
          vid.play().catch(() => { vid.muted = true; vid.play(); });
        } else {
          vid.pause();
        }
      });
    }, {
      threshold: 0.6  // 60% des Videos muss sichtbar sein → autoplay
    });

    document.querySelectorAll('.feed-card-video').forEach(card => {
      observer.observe(card);
    });
  }

  function _destroyObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  // ── Mute Toggle ───────────────────────────────────────────────────────────

  function toggleMute(slug) {
    isMuted = !isMuted;
    // Alle aktuell spielenden Videos updaten
    document.querySelectorAll('.feed-card-video').forEach(card => {
      const vid = document.getElementById('vid-' + card.dataset.slug);
      if (vid) vid.muted = isMuted;
    });
    // Icon tauschen
    const btn = document.getElementById('mute-' + slug);
    if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
    // Alle anderen Mute-Buttons auch updaten
    document.querySelectorAll('[id^="mute-"]').forEach(b => {
      b.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  // ── Rating / Progress ─────────────────────────────────────────────────────

  async function onPlay(slug, dbId) {
    Gamification.addXP(5);
    if (!dbId) return;
    try {
      const userId = await _getUserId();
      if (!userId) return;
      await window.supabaseClient
        .from('video_progress')
        .upsert({ user_id: userId, video_id: dbId }, { onConflict: 'user_id,video_id', ignoreDuplicates: true });
    } catch { /* silent */ }
  }

  async function rate(slug, dbId, rating) {
    Gamification.addXP(rating === 'knew' ? 15 : 5);

    if (dbId) {
      try {
        const userId = await _getUserId();
        if (userId) {
          await window.supabaseClient.rpc('rate_video', {
            p_user_id: userId, p_video_id: dbId, p_rating: rating
          });
        }
      } catch (e) { console.warn('rate_video:', e); }
    } else {
      const prog = AppState.get('feedProgress') || {};
      prog[slug] = rating;
      AppState.set('feedProgress', prog);
    }

    // Kurzes visuelles Feedback
    const card = document.querySelector(`[data-slug="${slug}"]`);
    if (card) {
      card.style.transition = 'opacity 0.15s';
      card.style.opacity = '0.5';
      setTimeout(() => { card.style.opacity = '1'; }, 200);
    }
  }

  // ── Filter ────────────────────────────────────────────────────────────────

  function render(filter) {
    activeFilter = (filter === 'all' || !filter) ? null : filter;
    load(activeFilter);
  }

  function _updateFilterButtons() {
    document.querySelectorAll('.feed-filter-btn').forEach(btn => {
      const isActive = (btn.dataset.filter === 'all' && !activeFilter)
                    || btn.dataset.filter === activeFilter;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white',  isActive);
      btn.classList.toggle('bg-gray-700', !isActive);
      btn.classList.toggle('text-gray-300', !isActive);
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  function _loadingSpinner() {
    return `<div class="feed-card" style="display:flex;align-items:center;justify-content:center;">
      <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.2);
                  border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite"></div>
    </div>`;
  }

  // Legacy compat
  function toggleRecall(id) { const el = document.getElementById(id); if (el) el.classList.toggle('open'); }
  function trackVideoOpen(id) { onPlay(id, ''); }
  function togglePlay(videoId) {
    const vid = document.getElementById('vid-' + videoId);
    if (vid) vid.paused ? vid.play() : vid.pause();
  }

  return { init, render, load, rate, toggleMute, togglePlay, onPlay, toggleRecall, trackVideoOpen };
})();
