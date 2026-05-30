// ── Feed Screen ───────────────────────────────────────────────────────────────
// Instagram-style fullscreen video feed with Anki spaced repetition
// Videos loaded from Supabase DB → get_user_feed() function (SM-2 algorithm)

window.FeedScreen = (function() {
  let activeFilter = null; // null = all
  let isLoading    = false;
  let cachedCards  = [];

  function init() {
    load();
  }

  // ── Data loading ──────────────────────────────────────────────────────────

  async function load(course) {
    if (isLoading) return;
    isLoading = true;

    const container = document.getElementById('feed-cards-container');
    if (!container) return;

    container.innerHTML = _loadingSpinner();

    try {
      const userId = await _getUserId();
      let cards;

      if (userId) {
        // Logged-in: use Anki feed function
        const { data, error } = await window.supabaseClient
          .rpc('get_user_feed', {
            p_user_id: userId,
            p_course:  course || null,
            p_limit:   30
          });
        if (error) throw error;
        cards = data;
      } else {
        // Not logged in: fall back to static data
        cards = _staticFallback(course);
      }

      cachedCards = cards || [];
      _render(cachedCards);

    } catch (err) {
      console.warn('Feed load error, using static fallback:', err);
      cachedCards = _staticFallback(course);
      _render(cachedCards);
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
      container.innerHTML = `
        <div class="feed-card" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;">
          <div style="font-size:3rem">⚡</div>
          <p style="color:#9ca3af">Keine Videos für diesen Filter.</p>
        </div>`;
      return;
    }

    container.innerHTML = cards.map((c, i) => _renderVideoCard(c, i)).join('');
    _updateFilterButtons();
  }

  function _renderVideoCard(card, index) {
    // Support both DB rows (slug) and static FEED_CARDS (id)
    const id        = card.slug || card.id;
    const src       = card.hls_src || card.video_src;
    const isHLS     = src && src.endsWith('.m3u8');
    const typeLabel = id.includes('nlm') ? '🎬 NotebookLM AI' : '📹 Short Video';
    const color     = card.course_color || card.courseColor || '#7c3aed';

    return `
    <div class="feed-card feed-card-video" id="feed-${index}" data-video-id="${card.id || ''}" data-slug="${id}">
      <div class="feed-card-inner" style="background:#000;">

        <video
          id="vid-${id}"
          style="display:block;background:#000;"
          controls
          preload="metadata"
          playsinline
          onplay="FeedScreen.onPlay('${id}', '${card.id || ''}')"
        >
          <source src="${src}" type="${isHLS ? 'application/x-mpegURL' : 'video/mp4'}">
        </video>

        <!-- Info overlay (above native controls) -->
        <div style="position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 55%,transparent 100%);
          padding:5rem 1rem 5.5rem;pointer-events:none;">

          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style="background:${color}66;border:1px solid ${color}99">${card.course}</span>
            <span class="text-xs text-white px-2 py-0.5 rounded-full"
              style="background:rgba(255,255,255,0.15)">${typeLabel}</span>
            <span class="text-xs text-gray-300 ml-auto">${card.duration || ''}</span>
          </div>

          <h2 class="text-sm font-bold text-white leading-tight mb-0.5">${card.title}</h2>
          <p class="text-xs mb-3" style="color:${color}dd">${card.subtitle || ''}</p>

          <div class="flex gap-2" style="pointer-events:auto">
            <button onclick="FeedScreen.rate('${id}','${card.id || ''}','knew')"
              class="flex-1 text-xs py-2 rounded-xl font-bold"
              style="background:rgba(52,211,153,0.25);color:#34d399;border:1px solid rgba(52,211,153,0.5)">
              ✅ Kapiert
            </button>
            <button onclick="FeedScreen.rate('${id}','${card.id || ''}','didnt')"
              class="flex-1 text-xs py-2 rounded-xl font-bold"
              style="background:rgba(248,113,113,0.25);color:#f87171;border:1px solid rgba(248,113,113,0.5)">
              🔁 Nochmal
            </button>
          </div>
        </div>

      </div>
    </div>`;
  }

  // ── User interactions ─────────────────────────────────────────────────────

  function togglePlay(videoId) {
    const vid = document.getElementById('vid-' + videoId);
    if (!vid) return;
    vid.paused ? vid.play() : vid.pause();
  }

  async function onPlay(slug, dbId) {
    Gamification.addXP(5);
    // Mark as seen in DB if we have a DB id
    if (!dbId) return;
    try {
      const userId = await _getUserId();
      if (!userId) return;
      // Insert progress row (status=new, no rating yet — just "seen")
      await window.supabaseClient
        .from('video_progress')
        .upsert({ user_id: userId, video_id: dbId }, { onConflict: 'user_id,video_id', ignoreDuplicates: true });
    } catch (e) { /* silent */ }
  }

  async function rate(slug, dbId, rating) {
    // Local XP + gamification
    Gamification.addXP(rating === 'knew' ? 15 : 5);

    // Persist to Supabase SM-2
    if (dbId) {
      try {
        const userId = await _getUserId();
        if (userId) {
          await window.supabaseClient.rpc('rate_video', {
            p_user_id:  userId,
            p_video_id: dbId,
            p_rating:   rating
          });
        }
      } catch (e) { console.warn('rate_video error:', e); }
    } else {
      // Fallback: local storage for concept cards / static feed
      const prog = AppState.get('feedProgress') || {};
      prog[slug] = rating;
      AppState.set('feedProgress', prog);
    }

    // Visual feedback: pulse the card
    const card = document.querySelector(`[data-slug="${slug}"]`);
    if (card) {
      card.style.transition = 'opacity 0.2s';
      card.style.opacity    = '0.5';
      setTimeout(() => { card.style.opacity = '1'; }, 300);
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
      <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.2);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite"></div>
    </div>`;
  }

  // Legacy compat
  function toggleRecall(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  }
  function trackVideoOpen(id) { onPlay(id, ''); }

  return { init, render, load, rate, togglePlay, onPlay, toggleRecall, trackVideoOpen };
})();
