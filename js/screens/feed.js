// ── Feed Screen ───────────────────────────────────────────────────────────────
// Infinite scroll video feed with 5-video preload window + SM-2 algorithm

window.FeedScreen = (function() {
  let _activeFilter = null;
  let _isMuted      = true;
  let _enrolledKeys = [];
  let _observer     = null;

  // Queue state
  let _queue       = [];   // all fetched card objects
  let _seenIds     = new Set(); // DB UUIDs seen this session (for exclude_ids)
  let _currentIdx  = 0;   // index of card currently in view
  let _isFetching  = false;
  let _exhausted   = false; // no more videos to fetch

  const FETCH_LIMIT   = 15;
  const PRELOAD_AHEAD = 2;  // preload current + 2 next
  const FETCH_AHEAD   = 3;  // start next fetch when this many from end

  // ── Init ──────────────────────────────────────────────────────────────────

  async function init() {
    _enrolledKeys = await CoursesDB.getEnrolledKeys();
    _renderFilterBar();
    _reset();
    await _fetchMore();
  }

  function _reset() {
    _queue      = [];
    _seenIds    = new Set();
    _currentIdx = 0;
    _isFetching = false;
    _exhausted  = false;
    _destroyObserver();
    const container = document.getElementById('feed-cards-container');
    if (container) container.innerHTML = _loadingSpinner();
  }

  // ── Filter bar ────────────────────────────────────────────────────────────

  function _renderFilterBar() {
    const bar = document.getElementById('feed-filter-bar');
    if (!bar) return;
    const catalog  = window.COURSES_CONFIG || [];
    const enrolled = _enrolledKeys;

    const courseButtons = enrolled.map(key => {
      const c = catalog.find(x => x.key === key);
      if (!c) return '';
      return `<button data-filter="${key}" onclick="FeedScreen.render('${key}')"
        class="feed-filter-btn flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-gray-700 text-gray-300">
        ${c.icon} ${c.label}</button>`;
    }).join('');

    bar.innerHTML = `
      <button data-filter="all" onclick="FeedScreen.render('all')"
        class="feed-filter-btn flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white">Alle</button>
      ${courseButtons}`;
  }

  // ── Data fetching ─────────────────────────────────────────────────────────

  async function _fetchMore() {
    if (_isFetching || _exhausted) return;
    _isFetching = true;

    try {
      const userId = await _getUserId();
      let newCards = [];

      if (userId) {
        const excludeIds = [..._seenIds].filter(id => id && id.length > 10);
        const { data, error } = await window.supabaseClient.rpc('get_user_feed', {
          p_user_id:    userId,
          p_course:     _activeFilter || null,
          p_limit:      FETCH_LIMIT,
          p_exclude_ids: excludeIds.length ? excludeIds : null
        });
        if (error) throw error;
        newCards = data || [];
      } else {
        newCards = _staticFallback(_activeFilter);
      }

      // Filter to enrolled courses
      if (!_activeFilter || _activeFilter === 'all') {
        newCards = newCards.filter(c => !c.course || _enrolledKeys.includes(c.course));
      }

      // Remove any we've already queued (safety dedup)
      const existing = new Set(_queue.map(c => c.id));
      newCards = newCards.filter(c => !existing.has(c.id));

      if (!newCards.length) {
        _exhausted = true;
      } else {
        const startIdx = _queue.length;
        _queue.push(...newCards);
        _appendCards(newCards, startIdx);
        if (_queue.length === newCards.length) {
          // First load: init observer after DOM is ready
          _initObserver();
          _updatePreloadWindow();
          _updateFilterButtons();
        }
      }
    } catch (err) {
      console.warn('Feed fetch error, using fallback:', err);
      if (!_queue.length) {
        const fallback = _staticFallback(_activeFilter);
        _queue.push(...fallback);
        _appendCards(fallback, 0);
        _initObserver();
        _updatePreloadWindow();
        _updateFilterButtons();
      }
    }

    _isFetching = false;
  }

  function _staticFallback(course) {
    let cards = window.FEED_CARDS || [];
    if (course && course !== 'all') {
      cards = cards.filter(c => c.course === course);
    } else {
      cards = cards.filter(c => !c.course || _enrolledKeys.includes(c.course));
    }
    // Exclude already seen
    cards = cards.filter(c => !_seenIds.has(c.id));
    return cards.filter(c => c.type === 'localvideo');
  }

  // ── DOM rendering ─────────────────────────────────────────────────────────

  function _appendCards(cards, startIdx) {
    const container = document.getElementById('feed-cards-container');
    if (!container) return;

    if (startIdx === 0) container.innerHTML = '';

    const html = cards.map((c, i) => _renderVideoCard(c, startIdx + i)).join('');
    container.insertAdjacentHTML('beforeend', html);

    // Observe newly added cards
    if (_observer) {
      cards.forEach((_, i) => {
        const el = document.getElementById(`feed-${startIdx + i}`);
        if (el) _observer.observe(el);
      });
    }
  }

  function _renderVideoCard(card, index) {
    const id    = card.slug || card.id;
    const src   = card.hls_src || card.video_src;
    const isHLS = src && src.endsWith('.m3u8');
    const label = id.includes('nlm') ? '🎬 NotebookLM AI' : '📹 Short Video';
    const color = card.course_color || card.courseColor || '#7c3aed';
    const dbId  = card.id || '';

    return `
    <div class="feed-card feed-card-video" id="feed-${index}" data-slug="${id}" data-db-id="${dbId}" data-idx="${index}">
      <div class="feed-card-inner" style="background:#000;">

        <video
          id="vid-${id}"
          style="display:block;background:#000;"
          muted loop playsinline preload="none"
          onplay="FeedScreen.onPlay('${id}','${dbId}')"
        >
          <source src="${src}" type="${isHLS ? 'application/x-mpegURL' : 'video/mp4'}">
        </video>

        <div onclick="FeedScreen.tapCard('${id}')"
          style="position:absolute;inset:0;z-index:5;cursor:pointer;background:transparent;">
          <div id="tap-ind-${id}" class="feed-tap-indicator"></div>
        </div>

        <button id="mute-${id}" onclick="FeedScreen.toggleMute('${id}')"
          style="position:absolute;top:4rem;right:1rem;z-index:20;
                 width:40px;height:40px;border-radius:50%;border:none;
                 background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);
                 color:white;font-size:1.1rem;cursor:pointer;display:flex;
                 align-items:center;justify-content:center;">
          🔇
        </button>

        <div style="position:absolute;bottom:0;left:0;right:0;z-index:10;
          background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 55%,transparent 100%);
          padding:5rem 1rem 1.5rem;pointer-events:none;">

          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style="background:${color}66;border:1px solid ${color}99">${card.course || ''}</span>
            <span class="text-xs text-white px-2 py-0.5 rounded-full"
              style="background:rgba(255,255,255,0.15)">${label}</span>
            <span class="text-xs text-gray-300 ml-auto">${card.duration || ''}</span>
          </div>

          <h2 class="text-sm font-bold text-white leading-tight mb-0.5">${card.title || ''}</h2>
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

  // ── Preload window management ─────────────────────────────────────────────

  function _updatePreloadWindow() {
    _queue.forEach((card, i) => {
      const id  = card.slug || card.id;
      const vid = document.getElementById('vid-' + id);
      if (!vid) return;
      const inWindow = i >= _currentIdx && i <= _currentIdx + PRELOAD_AHEAD;
      vid.preload = inWindow ? 'auto' : 'none';
    });
  }

  // ── IntersectionObserver ──────────────────────────────────────────────────

  function _initObserver() {
    _destroyObserver();

    _observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const slug = card.dataset.slug;
        const idx  = parseInt(card.dataset.idx, 10);
        const vid  = document.getElementById('vid-' + slug);
        if (!vid) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          _currentIdx = idx;
          vid.muted = _isMuted;
          vid.play().catch(() => { vid.muted = true; vid.play(); });

          // Mark as seen for next fetch's exclude list
          const dbId = card.dataset.dbId;
          if (dbId) _seenIds.add(dbId);

          _updatePreloadWindow();

          // Trigger next fetch when approaching end
          if (_currentIdx >= _queue.length - FETCH_AHEAD) {
            _fetchMore();
          }
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.feed-card-video').forEach(el => _observer.observe(el));
  }

  function _destroyObserver() {
    if (_observer) { _observer.disconnect(); _observer = null; }
  }

  // ── Filter ────────────────────────────────────────────────────────────────

  function render(filter) {
    _activeFilter = (filter === 'all' || !filter) ? null : filter;
    _reset();
    _fetchMore();
  }

  function _updateFilterButtons() {
    document.querySelectorAll('.feed-filter-btn').forEach(btn => {
      const isActive = (btn.dataset.filter === 'all' && !_activeFilter)
                    || btn.dataset.filter === _activeFilter;
      btn.classList.toggle('bg-blue-600',   isActive);
      btn.classList.toggle('text-white',    isActive);
      btn.classList.toggle('bg-gray-700',  !isActive);
      btn.classList.toggle('text-gray-300', !isActive);
    });
  }

  // ── Mute ──────────────────────────────────────────────────────────────────

  function toggleMute(slug) {
    _isMuted = !_isMuted;
    document.querySelectorAll('.feed-card-video').forEach(card => {
      const vid = document.getElementById('vid-' + card.dataset.slug);
      if (vid) vid.muted = _isMuted;
    });
    document.querySelectorAll('[id^="mute-"]').forEach(b => {
      b.textContent = _isMuted ? '🔇' : '🔊';
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

    const card = document.querySelector(`[data-slug="${slug}"]`);
    if (card) {
      card.style.transition = 'opacity 0.15s';
      card.style.opacity = '0.5';
      setTimeout(() => { card.style.opacity = '1'; }, 200);
    }
  }

  // ── Tap to pause / resume ─────────────────────────────────────────────────

  function tapCard(slug) {
    const vid = document.getElementById('vid-' + slug);
    const ind = document.getElementById('tap-ind-' + slug);
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      _flashIndicator(ind, '▶');
    } else {
      vid.pause();
      _flashIndicator(ind, '⏸');
    }
  }

  function _flashIndicator(el, icon) {
    if (!el) return;
    el.textContent = icon;
    el.style.opacity = '1';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; }, 700);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  async function _getUserId() {
    try {
      const { data } = await window.supabaseClient.auth.getUser();
      return data?.user?.id || null;
    } catch { return null; }
  }

  function _loadingSpinner() {
    return `<div class="feed-card" style="display:flex;align-items:center;justify-content:center;">
      <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.2);
                  border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite"></div>
    </div>`;
  }

  // Legacy compat
  function load(course) { render(course); }
  function toggleRecall(id) { const el = document.getElementById(id); if (el) el.classList.toggle('open'); }
  function trackVideoOpen(id) { onPlay(id, ''); }
  function togglePlay(videoId) { tapCard(videoId); }

  return { init, render, load, rate, toggleMute, togglePlay, tapCard, onPlay, toggleRecall, trackVideoOpen };
})();
