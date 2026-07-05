// ── ReelModel — Interactive economic model panels for reels ───────────────────
// Implements the Euler two-period consumption model (log utility)
// Math: u = ln(C1) + β·ln(C2)
//   C1* = Y / (1+β)
//   C2* = Y·β·(1+r) / (1+β)
//   Euler: C2/C1 = β(1+r)

window.ReelModel = (function () {

  // ── Model registry ──────────────────────────────────────────────────────────

  const MODELS = {
    'euler-gleichung': {
      title: 'Modell: Euler-Gleichung',
      render: renderEulerPanel,
      init:   initEulerPanel,
    }
  };

  // ── Public API ───────────────────────────────────────────────────────────────

  function hasModel(modelId) {
    return !!MODELS[modelId];
  }

  function renderPanel(modelId) {
    const m = MODELS[modelId];
    if (!m) return `<div style="color:#888;padding:2rem;text-align:center">Modell nicht gefunden: ${modelId}</div>`;
    return m.render();
  }

  function initPanel(modelId, el) {
    const m = MODELS[modelId];
    if (!m || !el) return;
    m.init(el);
  }

  function openFromCard(cardId) {
    const track = document.getElementById('rmt-' + cardId);
    if (track) track.style.transform = 'translateX(-50%)';
    const vid = document.getElementById('vid-' + cardId);
    if (vid) vid.pause();
  }

  function closeFromCard(cardId) {
    const track = document.getElementById('rmt-' + cardId);
    if (track) track.style.transform = 'translateX(0)';
    const vid = document.getElementById('vid-' + cardId);
    if (vid) vid.play().catch(() => {});
  }

  // ── Euler-Gleichung Model ────────────────────────────────────────────────────

  function renderEulerPanel() {
    return `
<div id="euler-panel-root" style="
  background:#09090f;
  color:#fff;
  height:100%;
  overflow-y:auto;
  -webkit-overflow-scrolling:touch;
  font-family:system-ui,-apple-system,sans-serif;
  display:flex;
  flex-direction:column;
">

  <!-- Header -->
  <div style="
    display:flex;
    align-items:center;
    gap:0.75rem;
    padding:0.9rem 1rem 0.6rem;
    background:rgba(9,9,15,0.95);
    position:sticky;
    top:0;
    z-index:10;
    border-bottom:1px solid rgba(79,195,247,0.15);
    flex-shrink:0;
  ">
    <button id="euler-back-btn" onclick="event.stopPropagation()"
      style="
        background:rgba(79,195,247,0.12);
        border:1px solid rgba(79,195,247,0.4);
        color:#4FC3F7;
        border-radius:8px;
        padding:5px 10px;
        font-size:0.8rem;
        cursor:pointer;
        font-weight:600;
        flex-shrink:0;
      ">← Zurück</button>
    <span style="font-size:0.9rem;font-weight:700;color:#fff;line-height:1.2">Modell: Euler-Gleichung</span>
  </div>

  <!-- Canvas plot -->
  <div style="padding:0.75rem 0.75rem 0.25rem;flex-shrink:0">
    <canvas id="euler-canvas"
      style="width:100%;display:block;border-radius:10px;background:#0d0d18;"
    ></canvas>
  </div>

  <!-- Sliders -->
  <div style="padding:0 0.75rem;flex-shrink:0">

    <!-- β slider -->
    <div class="euler-slider-group" style="margin-bottom:0.7rem">
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
        <span style="font-size:0.78rem;color:#aaa;flex:1">β (Diskontfaktor)</span>
        <span id="euler-beta-val" style="font-size:0.82rem;font-weight:700;color:#4FC3F7;min-width:3rem;text-align:right">0.92</span>
        <button data-tip="euler-beta-tip"
          onclick="ReelModel._toggleTip('euler-beta-tip')"
          style="
            background:rgba(79,195,247,0.1);
            border:1px solid rgba(79,195,247,0.3);
            color:#4FC3F7;
            border-radius:50%;
            width:22px;height:22px;
            font-size:0.7rem;
            cursor:pointer;
            flex-shrink:0;
            display:flex;align-items:center;justify-content:center;
          ">ℹ</button>
      </div>
      <div id="euler-beta-tip" style="
        display:none;
        background:rgba(79,195,247,0.08);
        border:1px solid rgba(79,195,247,0.2);
        border-radius:8px;
        padding:0.5rem 0.7rem;
        font-size:0.72rem;
        color:#ccc;
        line-height:1.4;
        margin-bottom:0.3rem;
      ">β misst deine Ungeduld. β=0.9: Konsum morgen ist dir 90 Rp. pro Franken heute wert. Kleines β → mehr Konsum heute.</div>
      <input type="range" id="euler-beta" min="0.50" max="0.99" step="0.01" value="0.92"
        style="width:100%;accent-color:#4FC3F7;cursor:pointer">
    </div>

    <!-- r slider -->
    <div class="euler-slider-group" style="margin-bottom:0.7rem">
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
        <span style="font-size:0.78rem;color:#aaa;flex:1">r (Realzins)</span>
        <span id="euler-r-val" style="font-size:0.82rem;font-weight:700;color:#4FC3F7;min-width:3rem;text-align:right">3.0%</span>
        <button data-tip="euler-r-tip"
          onclick="ReelModel._toggleTip('euler-r-tip')"
          style="
            background:rgba(79,195,247,0.1);
            border:1px solid rgba(79,195,247,0.3);
            color:#4FC3F7;
            border-radius:50%;
            width:22px;height:22px;
            font-size:0.7rem;
            cursor:pointer;
            flex-shrink:0;
            display:flex;align-items:center;justify-content:center;
          ">ℹ</button>
      </div>
      <div id="euler-r-tip" style="
        display:none;
        background:rgba(79,195,247,0.08);
        border:1px solid rgba(79,195,247,0.2);
        border-radius:8px;
        padding:0.5rem 0.7rem;
        font-size:0.72rem;
        color:#ccc;
        line-height:1.4;
        margin-bottom:0.3rem;
      ">r ist der Realzins. Für 1 CHF heute sparst du (1+r) CHF morgen. r↑ → Sparen attraktiver → mehr C₂.</div>
      <input type="range" id="euler-r" min="0.00" max="0.15" step="0.005" value="0.03"
        style="width:100%;accent-color:#4FC3F7;cursor:pointer">
    </div>

    <!-- Y slider -->
    <div class="euler-slider-group" style="margin-bottom:0.5rem">
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
        <span style="font-size:0.78rem;color:#aaa;flex:1">Y (Einkommen)</span>
        <span id="euler-y-val" style="font-size:0.82rem;font-weight:700;color:#4FC3F7;min-width:3rem;text-align:right">1000</span>
        <button data-tip="euler-y-tip"
          onclick="ReelModel._toggleTip('euler-y-tip')"
          style="
            background:rgba(79,195,247,0.1);
            border:1px solid rgba(79,195,247,0.3);
            color:#4FC3F7;
            border-radius:50%;
            width:22px;height:22px;
            font-size:0.7rem;
            cursor:pointer;
            flex-shrink:0;
            display:flex;align-items:center;justify-content:center;
          ">ℹ</button>
      </div>
      <div id="euler-y-tip" style="
        display:none;
        background:rgba(79,195,247,0.08);
        border:1px solid rgba(79,195,247,0.2);
        border-radius:8px;
        padding:0.5rem 0.7rem;
        font-size:0.72rem;
        color:#ccc;
        line-height:1.4;
        margin-bottom:0.3rem;
      ">Y ist dein Gesamteinkommen (Barwert). Verschiebt die Budgetgerade parallel nach außen.</div>
      <input type="range" id="euler-y" min="500" max="3000" step="100" value="1000"
        style="width:100%;accent-color:#4FC3F7;cursor:pointer">
    </div>
  </div>

  <!-- Result grid -->
  <div style="
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:0.5rem;
    padding:0.5rem 0.75rem;
    flex-shrink:0;
  ">
    <div style="background:rgba(79,195,247,0.07);border:1px solid rgba(79,195,247,0.2);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">C₁* (heute)</div>
      <div id="euler-c1" style="font-size:1.0rem;font-weight:800;color:#4FC3F7">CHF 481</div>
    </div>
    <div style="background:rgba(79,195,247,0.07);border:1px solid rgba(79,195,247,0.2);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">C₂* (morgen)</div>
      <div id="euler-c2" style="font-size:1.0rem;font-weight:800;color:#4FC3F7">CHF 456</div>
    </div>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">β(1+r)</div>
      <div id="euler-euler" style="font-size:1.0rem;font-weight:800;color:#FFD700">0.948</div>
    </div>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">Trend</div>
      <div id="euler-trend" style="font-size:0.85rem;font-weight:700;color:#aaa">sinkt</div>
    </div>
  </div>

  <!-- Euler condition visual -->
  <div style="
    margin:0 0.75rem 0.75rem;
    padding:0.6rem 0.8rem;
    background:rgba(0,0,0,0.3);
    border-radius:10px;
    border:1px solid rgba(255,255,255,0.08);
    text-align:center;
    flex-shrink:0;
  ">
    <div style="font-size:0.68rem;color:#888;margin-bottom:0.25rem;letter-spacing:0.04em">EULER-BEDINGUNG</div>
    <div id="euler-condition" style="font-size:0.8rem;font-family:monospace;font-weight:600;line-height:1.8">
      1/C₁ = β(1+r)·1/C₂
    </div>
  </div>

</div>`;
  }

  function initEulerPanel(el) {
    // Find elements inside the panel container
    const canvas  = el.querySelector('#euler-canvas');
    const betaIn  = el.querySelector('#euler-beta');
    const rIn     = el.querySelector('#euler-r');
    const yIn     = el.querySelector('#euler-y');
    const betaVal = el.querySelector('#euler-beta-val');
    const rVal    = el.querySelector('#euler-r-val');
    const yVal    = el.querySelector('#euler-y-val');
    const c1Out   = el.querySelector('#euler-c1');
    const c2Out   = el.querySelector('#euler-c2');
    const eulerOut= el.querySelector('#euler-euler');
    const trendOut= el.querySelector('#euler-trend');
    const condOut = el.querySelector('#euler-condition');
    const backBtn = el.querySelector('#euler-back-btn');

    if (!canvas) return;

    // Wire back button — find card id from ancestor
    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Walk up to find rmt-* id
        let node = el;
        while (node && !node.id.startsWith('rmt-')) node = node.parentElement;
        if (node) {
          const cardId = node.id.replace('rmt-', '');
          ReelModel.closeFromCard(cardId);
        }
      });
    }

    function getVals() {
      return {
        beta: parseFloat(betaIn.value),
        r:    parseFloat(rIn.value),
        Y:    parseFloat(yIn.value),
      };
    }

    function compute(beta, r, Y) {
      const C1 = Y / (1 + beta);
      const C2 = Y * beta * (1 + r) / (1 + beta);
      const euler = beta * (1 + r);
      return { C1, C2, euler };
    }

    function drawCanvas(beta, r, Y) {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const cw   = rect.width  || canvas.offsetWidth  || 300;
      const ch   = Math.round(cw * 0.72);
      canvas.style.height = ch + 'px';
      canvas.width  = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const pad = { top: 28, right: 18, bottom: 38, left: 46 };
      const pw  = cw - pad.left - pad.right;
      const ph  = ch - pad.top  - pad.bottom;

      ctx.clearRect(0, 0, cw, ch);

      // Background
      ctx.fillStyle = '#0d0d18';
      ctx.fillRect(0, 0, cw, ch);

      const { C1, C2 } = compute(beta, r, Y);

      // Axis range: a bit beyond the budget intercepts
      const xMax = Y * 1.15;
      const yMax = Y * (1 + r) * 1.15;

      function toX(v) { return pad.left + (v / xMax) * pw; }
      function toY(v) { return pad.top + ph - (v / yMax) * ph; }

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.8;
      const gridN = 4;
      for (let i = 1; i <= gridN; i++) {
        const xg = pad.left + (i / gridN) * pw;
        const yg = pad.top  + (i / gridN) * ph;
        ctx.beginPath(); ctx.moveTo(xg, pad.top);    ctx.lineTo(xg, pad.top + ph); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad.left, yg);   ctx.lineTo(pad.left + pw, yg); ctx.stroke();
      }

      // Budget line: C1 + C2/(1+r) = Y  →  C2 = (Y - C1)*(1+r)
      ctx.strokeStyle = '#4FC3F7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(Y * (1 + r)));  // x=0 intercept
      ctx.lineTo(toX(Y), toY(0));             // y=0 intercept
      ctx.stroke();

      // Indifference curve through (C1*, C2*): ln(C1)+β·ln(C2)=const → C2 = exp((K-ln(C1))/β)
      const K = Math.log(C1) + beta * Math.log(C2);
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let first = true;
      const steps = 200;
      for (let i = 0; i <= steps; i++) {
        const c1v = (0.01 + (i / steps) * (Y * 0.99));
        const lnC2 = (K - Math.log(c1v)) / beta;
        if (!isFinite(lnC2)) continue;
        const c2v = Math.exp(lnC2);
        if (c2v < 0 || c2v > yMax * 1.1 || c1v > xMax * 1.05) continue;
        const px = toX(c1v);
        const py = toY(c2v);
        if (py < pad.top - 4 || px < pad.left - 4) continue;
        if (first) { ctx.moveTo(px, py); first = false; }
        else        ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Dashed lines to axes from optimal point
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(toX(C1), toY(C2)); ctx.lineTo(toX(C1), toY(0));    ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toX(C1), toY(C2)); ctx.lineTo(toX(0),  toY(C2));   ctx.stroke();
      ctx.setLineDash([]);

      // Optimal point
      ctx.beginPath();
      ctx.arc(toX(C1), toY(C2), 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#09090f';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Axes
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + ph + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left - 6, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#888';
      ctx.font = `${Math.round(9 * dpr) / dpr}px system-ui,sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('C₁ (heute)', pad.left + pw / 2, ch - 5);
      ctx.save();
      ctx.translate(11, pad.top + ph / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('C₂ (morgen)', 0, 0);
      ctx.restore();

      // Tick values
      ctx.fillStyle = '#666';
      ctx.font = `${Math.round(8 * dpr) / dpr}px system-ui,sans-serif`;
      ctx.textAlign = 'center';
      // X axis ticks
      for (let i = 1; i <= gridN; i++) {
        const v = (i / gridN) * xMax;
        ctx.fillText(Math.round(v), toX(v), pad.top + ph + 14);
      }
      // Y axis ticks
      ctx.textAlign = 'right';
      for (let i = 1; i <= gridN; i++) {
        const v = (i / gridN) * yMax;
        ctx.fillText(Math.round(v), pad.left - 6, toY(v) + 4);
      }

      // Legend
      ctx.font = `${Math.round(9 * dpr) / dpr}px system-ui,sans-serif`;
      ctx.textAlign = 'left';
      const lx = pad.left + 6;
      let ly = pad.top + 12;

      ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(lx, ly - 3); ctx.lineTo(lx + 18, ly - 3); ctx.stroke();
      ctx.fillStyle = '#4FC3F7';
      ctx.fillText('Budgetgerade', lx + 22, ly);
      ly += 14;

      ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(lx, ly - 3); ctx.lineTo(lx + 18, ly - 3); ctx.stroke();
      ctx.fillStyle = '#FFD700';
      ctx.fillText('Indifferenzkurve', lx + 22, ly);
    }

    function updateAll() {
      const { beta, r, Y } = getVals();

      betaVal.textContent = beta.toFixed(2);
      rVal.textContent    = (r * 100).toFixed(1) + '%';
      yVal.textContent    = Math.round(Y);

      const { C1, C2, euler } = compute(beta, r, Y);

      c1Out.textContent    = 'CHF ' + Math.round(C1);
      c2Out.textContent    = 'CHF ' + Math.round(C2);
      eulerOut.textContent = euler.toFixed(3);

      // Trend
      const EPS = 0.0005;
      if (Math.abs(euler - 1) < EPS) {
        trendOut.textContent = 'konstant';
        trendOut.style.color = '#4FC3F7';
      } else if (euler > 1) {
        trendOut.textContent = 'wächst';
        trendOut.style.color = '#34d399';
      } else {
        trendOut.textContent = 'sinkt';
        trendOut.style.color = '#f87171';
      }

      // Euler condition indicator
      const lhs = 1 / C1;
      const rhs = euler / C2;
      const diff = lhs - rhs;
      const EQ_EPS = 1e-8;
      let sym, color;
      if (Math.abs(diff) < EQ_EPS) {
        sym = '='; color = '#34d399';
      } else if (diff > 0) {
        sym = '>'; color = '#f87171';
      } else {
        sym = '<'; color = '#FFD700';
      }
      condOut.innerHTML = `<span style="color:#aaa">1/C₁</span> <span style="color:${color};font-size:1.05em"> ${sym} </span> <span style="color:#aaa">β(1+r)·1/C₂</span>`;

      drawCanvas(beta, r, Y);
    }

    betaIn.addEventListener('input', updateAll);
    rIn.addEventListener('input', updateAll);
    yIn.addEventListener('input', updateAll);

    // Prevent vertical scroll from triggering when dragging sliders
    [betaIn, rIn, yIn].forEach(sl => {
      sl.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      sl.addEventListener('touchmove',  e => e.stopPropagation(), { passive: true });
    });

    // Initial draw (after a tick so canvas has laid out)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => updateAll());
    });
  }

  // ── Tooltip toggle (public so inline onclick can call it) ────────────────────

  function _toggleTip(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }

  // ── Expose ───────────────────────────────────────────────────────────────────

  return {
    hasModel,
    renderPanel,
    initPanel,
    openFromCard,
    closeFromCard,
    _toggleTip,
  };

})();
