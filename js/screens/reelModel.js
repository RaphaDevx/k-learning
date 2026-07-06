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
    },
    'erwartungshypothese': {
      title: 'Modell: Zinsstruktur & Arbitrage',
      render: renderErwartungsPanel,
      init:   initErwartungsPanel,
    },
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

  // ── Erwartungshypothese Model ────────────────────────────────────────────────

  function renderErwartungsPanel() {
    return `
<div id="erw-panel-root" style="
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
    border-bottom:1px solid rgba(255,215,0,0.15);
    flex-shrink:0;
  ">
    <button id="erw-back-btn" onclick="event.stopPropagation()"
      style="
        background:rgba(255,215,0,0.12);
        border:1px solid rgba(255,215,0,0.4);
        color:#FFD700;
        border-radius:8px;
        padding:5px 10px;
        font-size:0.8rem;
        cursor:pointer;
        font-weight:600;
        flex-shrink:0;
      ">← Zurück</button>
    <span style="font-size:0.9rem;font-weight:700;color:#fff;line-height:1.2">Zinsstrukturkurve</span>
    <span id="erw-shape-badge" style="
      margin-left:auto;
      font-size:0.72rem;
      font-weight:700;
      padding:3px 10px;
      border-radius:20px;
      background:rgba(52,211,153,0.15);
      border:1px solid rgba(52,211,153,0.4);
      color:#34d399;
      flex-shrink:0;
    ">Normal</span>
  </div>

  <!-- Canvas -->
  <div style="padding:0.75rem 0.75rem 0.25rem;flex-shrink:0">
    <canvas id="erw-canvas"
      style="width:100%;display:block;border-radius:10px;background:#0d0d18;"
    ></canvas>
  </div>

  <!-- Sliders -->
  <div style="padding:0 0.75rem;flex-shrink:0">

    <!-- i₁ₜ slider -->
    <div style="margin-bottom:0.7rem">
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
        <span style="font-size:0.78rem;color:#aaa;flex:1">i₁ₜ — aktueller 1-Jahres-Zins</span>
        <span id="erw-i1-val" style="font-size:0.82rem;font-weight:700;color:#FFD700;min-width:3.2rem;text-align:right">3.00%</span>
        <button onclick="ReelModel._toggleTip('erw-i1-tip')"
          style="background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.3);color:#FFD700;border-radius:50%;width:22px;height:22px;font-size:0.7rem;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;">ℹ</button>
      </div>
      <div id="erw-i1-tip" style="display:none;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:8px;padding:0.5rem 0.7rem;font-size:0.72rem;color:#ccc;line-height:1.4;margin-bottom:0.3rem;">
        Aktueller Zins für eine einjährige Anleihe. Preis: P = 100 / (1+i₁). Zins steigt → Preis sinkt (inverse Relation!).
      </div>
      <input type="range" id="erw-i1" min="0.00" max="0.12" step="0.0025" value="0.03"
        style="width:100%;accent-color:#FFD700;cursor:pointer">
    </div>

    <!-- i₁ₑ slider -->
    <div style="margin-bottom:0.5rem">
      <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
        <span style="font-size:0.78rem;color:#aaa;flex:1">i¹ᵉₜ₊₁ — erwarteter Zins in 1J</span>
        <span id="erw-ie-val" style="font-size:0.82rem;font-weight:700;color:#FF7043;min-width:3.2rem;text-align:right">4.00%</span>
        <button onclick="ReelModel._toggleTip('erw-ie-tip')"
          style="background:rgba(255,112,67,0.1);border:1px solid rgba(255,112,67,0.3);color:#FF7043;border-radius:50%;width:22px;height:22px;font-size:0.7rem;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;">ℹ</button>
      </div>
      <div id="erw-ie-tip" style="display:none;background:rgba(255,112,67,0.08);border:1px solid rgba(255,112,67,0.2);border-radius:8px;padding:0.5rem 0.7rem;font-size:0.72rem;color:#ccc;line-height:1.4;margin-bottom:0.3rem;">
        Was der Markt erwartet: Wenn Zinsen steigen sollen → i¹ᵉ > i₁ → Kurve steigt (normal). Wenn Rezession erwartet → i¹ᵉ < i₁ → Kurve fällt (invers).
      </div>
      <input type="range" id="erw-ie" min="0.00" max="0.12" step="0.0025" value="0.04"
        style="width:100%;accent-color:#FF7043;cursor:pointer">
    </div>
  </div>

  <!-- Result grid -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;padding:0.5rem 0.75rem;flex-shrink:0">
    <div style="background:rgba(255,215,0,0.07);border:1px solid rgba(255,215,0,0.2);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">P₁ₜ (Preis)</div>
      <div id="erw-price" style="font-size:1.0rem;font-weight:800;color:#FFD700">97.09</div>
    </div>
    <div style="background:rgba(255,112,67,0.07);border:1px solid rgba(255,112,67,0.2);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">i₂ₜ (2J-Zins)</div>
      <div id="erw-i2" style="font-size:1.0rem;font-weight:800;color:#FF7043">3.50%</div>
    </div>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">Strat. A — 2J-Bond</div>
      <div id="erw-strat-a" style="font-size:0.92rem;font-weight:800;color:#4FC3F7">107.12</div>
    </div>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:0.6rem;text-align:center">
      <div style="font-size:0.68rem;color:#888;margin-bottom:0.2rem">Strat. B — Roll-over</div>
      <div id="erw-strat-b" style="font-size:0.92rem;font-weight:800;color:#4FC3F7">107.12</div>
    </div>
  </div>

  <!-- Arbitrage condition -->
  <div style="margin:0 0.75rem 0.75rem;padding:0.6rem 0.8rem;background:rgba(0,0,0,0.3);border-radius:10px;border:1px solid rgba(255,255,255,0.08);text-align:center;flex-shrink:0">
    <div style="font-size:0.68rem;color:#888;margin-bottom:0.25rem;letter-spacing:0.04em">ARBITRAGE-BEDINGUNG (kein Profit möglich)</div>
    <div id="erw-condition" style="font-size:0.78rem;font-family:monospace;font-weight:600;line-height:1.8;color:#aaa">
      (1+i₂)² = (1+i₁)(1+i₁ᵉ)
    </div>
  </div>

</div>`;
  }

  function initErwartungsPanel(el) {
    const canvas     = el.querySelector('#erw-canvas');
    const i1In       = el.querySelector('#erw-i1');
    const ieIn       = el.querySelector('#erw-ie');
    const i1Val      = el.querySelector('#erw-i1-val');
    const ieVal      = el.querySelector('#erw-ie-val');
    const priceOut   = el.querySelector('#erw-price');
    const i2Out      = el.querySelector('#erw-i2');
    const stratAOut  = el.querySelector('#erw-strat-a');
    const stratBOut  = el.querySelector('#erw-strat-b');
    const shapeBadge = el.querySelector('#erw-shape-badge');
    const condOut    = el.querySelector('#erw-condition');
    const backBtn    = el.querySelector('#erw-back-btn');

    if (!canvas) return;

    if (backBtn) {
      backBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let node = el;
        while (node && !node.id.startsWith('rmt-')) node = node.parentElement;
        if (node) ReelModel.closeFromCard(node.id.replace('rmt-', ''));
      });
    }

    function compute(i1, ie) {
      const i2     = Math.sqrt((1 + i1) * (1 + ie)) - 1;
      const price  = 100 / (1 + i1);
      const stratA = 100 * Math.pow(1 + i2, 2);
      const stratB = 100 * (1 + i1) * (1 + ie);
      return { i2, price, stratA, stratB };
    }

    function drawCanvas(i1, ie) {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const cw   = rect.width || canvas.offsetWidth || 300;
      const ch   = Math.round(cw * 0.62);
      canvas.style.height = ch + 'px';
      canvas.width  = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const { i2 } = compute(i1, ie);

      const pad = { top: 24, right: 20, bottom: 36, left: 52 };
      const pw = cw - pad.left - pad.right;
      const ph = ch - pad.top - pad.bottom;

      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#0d0d18';
      ctx.fillRect(0, 0, cw, ch);

      const allRates = [i1, i2, 0.005];
      const yMax = Math.max(...allRates) * 1.45 || 0.08;

      function toX(t) { return pad.left + ((t - 0.5) / (2.8 - 0.5)) * pw; }
      function toY(r) { return pad.top + ph - (r / yMax) * ph; }

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.8;
      [1, 2].forEach(t => {
        const x = toX(t);
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ph); ctx.stroke();
      });
      for (let i = 1; i <= 4; i++) {
        const y = pad.top + (i / 4) * ph;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + pw, y); ctx.stroke();
      }

      // Shaded area under the curve segment
      const grad = ctx.createLinearGradient(toX(1), 0, toX(2), 0);
      grad.addColorStop(0, 'rgba(255,215,0,0.07)');
      grad.addColorStop(1, 'rgba(255,112,67,0.07)');
      ctx.beginPath();
      ctx.moveTo(toX(1), toY(i1));
      ctx.lineTo(toX(2), toY(i2));
      ctx.lineTo(toX(2), toY(0));
      ctx.lineTo(toX(1), toY(0));
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Yield curve line
      const lineGrad = ctx.createLinearGradient(toX(1), 0, toX(2), 0);
      lineGrad.addColorStop(0, '#FFD700');
      lineGrad.addColorStop(1, '#FF7043');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(toX(1), toY(i1));
      ctx.lineTo(toX(2), toY(i2));
      ctx.stroke();

      // Dashed drop lines
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      [[1, i1], [2, i2]].forEach(([t, r]) => {
        ctx.beginPath(); ctx.moveTo(toX(t), toY(r)); ctx.lineTo(toX(t), toY(0)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(toX(t), toY(r)); ctx.lineTo(pad.left, toY(r)); ctx.stroke();
      });
      ctx.setLineDash([]);

      // Points
      [[toX(1), toY(i1), '#FFD700'], [toX(2), toY(i2), '#FF7043']].forEach(([px, py, color]) => {
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#09090f';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Axes
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + ph + 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left - 5, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

      ctx.fillStyle = '#888';
      ctx.font = `${Math.round(9 * dpr) / dpr}px system-ui,sans-serif`;

      // X labels
      ctx.textAlign = 'center';
      ctx.fillText('1J', toX(1), ch - 5);
      ctx.fillText('2J', toX(2), ch - 5);

      // Y labels
      ctx.textAlign = 'right';
      for (let i = 1; i <= 4; i++) {
        const v = (i / 4) * yMax;
        ctx.fillText((v * 100).toFixed(1) + '%', pad.left - 5, toY(v) + 4);
      }

      // Axis title
      ctx.save();
      ctx.translate(11, pad.top + ph / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('Rendite', 0, 0);
      ctx.restore();

      // Point labels
      ctx.font = `bold ${Math.round(10 * dpr) / dpr}px system-ui,sans-serif`;
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.fillText('i₁ₜ', toX(1), toY(i1) - 11);

      ctx.fillStyle = '#FF7043';
      ctx.fillText('i₂ₜ', toX(2), toY(i2) - 11);
    }

    function updateAll() {
      const i1 = parseFloat(i1In.value);
      const ie = parseFloat(ieIn.value);

      i1Val.textContent = (i1 * 100).toFixed(2) + '%';
      ieVal.textContent = (ie * 100).toFixed(2) + '%';

      const { i2, price, stratA, stratB } = compute(i1, ie);

      priceOut.textContent  = price.toFixed(2);
      i2Out.textContent     = (i2 * 100).toFixed(2) + '%';
      stratAOut.textContent = stratA.toFixed(2);
      stratBOut.textContent = stratB.toFixed(2);

      // Shape badge
      const EPS = 0.0005;
      let shape, shapeColor, shapeBg, shapeBorder;
      if (i2 > i1 + EPS) {
        shape = 'Normal'; shapeColor = '#34d399';
        shapeBg = 'rgba(52,211,153,0.15)'; shapeBorder = 'rgba(52,211,153,0.4)';
      } else if (i2 < i1 - EPS) {
        shape = 'Invers'; shapeColor = '#f87171';
        shapeBg = 'rgba(248,113,113,0.15)'; shapeBorder = 'rgba(248,113,113,0.4)';
      } else {
        shape = 'Flach'; shapeColor = '#FFD700';
        shapeBg = 'rgba(255,215,0,0.15)'; shapeBorder = 'rgba(255,215,0,0.4)';
      }
      shapeBadge.textContent = shape;
      shapeBadge.style.color = shapeColor;
      shapeBadge.style.background = shapeBg;
      shapeBadge.style.border = '1px solid ' + shapeBorder;

      // Condition with numbers
      const lhs = Math.pow(1 + i2, 2);
      const rhs = (1 + i1) * (1 + ie);
      condOut.innerHTML =
        `<span style="color:#FF7043">(1+${(i2*100).toFixed(2)}%)²</span>` +
        ` <span style="color:#34d399"> = </span>` +
        ` <span style="color:#FFD700">(1+${(i1*100).toFixed(2)}%)</span>` +
        `<span style="color:#aaa"> × </span>` +
        `<span style="color:#FF7043">(1+${(ie*100).toFixed(2)}%)</span>` +
        `<br><span style="color:#888;font-size:0.9em">${lhs.toFixed(4)} = ${rhs.toFixed(4)}</span>`;

      drawCanvas(i1, ie);
    }

    i1In.addEventListener('input', updateAll);
    ieIn.addEventListener('input', updateAll);

    [i1In, ieIn].forEach(sl => {
      sl.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
      sl.addEventListener('touchmove',  e => e.stopPropagation(), { passive: true });
    });

    requestAnimationFrame(() => requestAnimationFrame(() => updateAll()));
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
