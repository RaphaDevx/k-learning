// ── Repetition Screen ────────────────────────────────────────────────────────
// Zentraler Wiederholungsplan: gespeicherte Prüfungsfragen, Formeln, Notizen

window.RepetitionScreen = (function() {
  let _items      = [];
  let _filter     = 'all'; // 'all' | 'question' | 'formula' | 'note'
  let _reviewItems  = [];
  let _reviewIdx    = 0;
  let _selfTestSel  = null; // gewählte Antwort im Self-Test

  // ── Public API ────────────────────────────────────────────────────────────

  async function init() {
    await _loadItems();
    _render();
  }

  async function getPendingCount() {
    try {
      const uid = await _uid();
      if (!uid) return 0;
      const { count } = await window.supabaseClient
        .from('repetition_items')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', uid).eq('status', 'pending');
      return count || 0;
    } catch { return 0; }
  }

  async function saveItem({ type = 'question', course = '', title = '', content = {}, source = '', source_id = '' }) {
    try {
      const uid = await _uid();
      if (!uid) return false;
      const { error } = await window.supabaseClient
        .from('repetition_items')
        .insert({ user_id: uid, type, course, title, content, source, source_id });
      if (error) throw error;
      return true;
    } catch(e) { console.warn('RepetitionScreen.saveItem:', e); return false; }
  }

  function setFilter(f) { _filter = f; _render(); }

  function startReview(startIdx) {
    const filtered = _filtered();
    _reviewItems = [...filtered.slice(startIdx), ...filtered.slice(0, startIdx)];
    _reviewIdx   = 0;
    _selfTestSel = null;
    _renderReviewCard();
  }

  function selfTestSelect(key) { _selfTestSel = key; _renderReviewCard(); }

  async function markDone(itemId) {
    try {
      await window.supabaseClient
        .from('repetition_items').update({ status: 'done' }).eq('id', itemId);
      _items = _items.filter(i => i.id !== itemId);
    } catch(e) { console.warn(e); }
    _reviewIdx++;
    _selfTestSel = null;
    _renderReviewCard();
  }

  function keepAndNext() { _reviewIdx++; _selfTestSel = null; _renderReviewCard(); }
  function reviewPrev()  { _reviewIdx = Math.max(0, _reviewIdx - 1); _selfTestSel = null; _renderReviewCard(); }

  function closeReview() {
    document.getElementById('rep-review-overlay')?.remove();
    _render();
  }

  async function deleteItem(itemId) {
    if (!confirm('Eintrag löschen?')) return;
    try {
      await window.supabaseClient.from('repetition_items').delete().eq('id', itemId);
      _items = _items.filter(i => i.id !== itemId);
      _render();
    } catch(e) { console.warn(e); }
  }

  function showAddFormula() {
    let modal = document.getElementById('rep-add-modal');
    if (!modal) { modal = document.createElement('div'); modal.id = 'rep-add-modal'; document.body.appendChild(modal); }
    modal.style.cssText = `position:fixed;inset:0;z-index:950;background:rgba(0,0,0,.75);
      display:flex;align-items:flex-end;justify-content:center;padding:0 0 env(safe-area-inset-bottom)`;
    const courseOptions = (window.COURSES_CONFIG||[])
      .map(c=>`<option value="${c.key}">${c.icon} ${c.label}</option>`).join('');
    modal.innerHTML = `
      <div style="width:100%;max-width:520px;background:#1a1a2e;border-radius:20px 20px 0 0;padding:1.5rem 1.25rem 2rem">
        <div style="font-weight:800;font-size:1rem;color:#e2e8f0;margin-bottom:1rem">Formel / Notiz hinzufügen</div>
        <select id="rep-add-type" style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.1);
          color:#e2e8f0;border-radius:10px;padding:.6rem .8rem;font-size:.85rem;margin-bottom:.7rem;box-sizing:border-box">
          <option value="formula">📐 Formel</option>
          <option value="note">📝 Notiz</option>
        </select>
        <select id="rep-add-course" style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.1);
          color:#e2e8f0;border-radius:10px;padding:.6rem .8rem;font-size:.85rem;margin-bottom:.7rem;box-sizing:border-box">
          <option value="">Kein Kurs</option>${courseOptions}
        </select>
        <input id="rep-add-title" placeholder="Titel (z.B. Euler-Gleichung)" autocomplete="off"
          style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.1);color:#e2e8f0;
          border-radius:10px;padding:.6rem .8rem;font-size:.85rem;margin-bottom:.7rem;box-sizing:border-box">
        <textarea id="rep-add-text" placeholder="Inhalt / Formel (LaTeX mit $…$ möglich)" rows="4"
          style="width:100%;background:#0f172a;border:1px solid rgba(255,255,255,.1);color:#e2e8f0;
          border-radius:10px;padding:.6rem .8rem;font-size:.85rem;margin-bottom:1rem;
          box-sizing:border-box;resize:vertical;font-family:inherit"></textarea>
        <div style="display:flex;gap:.75rem">
          <button onclick="document.getElementById('rep-add-modal').remove()"
            style="flex:1;background:rgba(255,255,255,.07);border:none;color:#9ca3af;
            border-radius:12px;padding:.75rem;font-size:.85rem;font-weight:600;cursor:pointer">Abbrechen</button>
          <button onclick="RepetitionScreen.submitAdd()"
            style="flex:1;background:#6366f1;border:none;color:#fff;
            border-radius:12px;padding:.75rem;font-size:.85rem;font-weight:700;cursor:pointer">Speichern</button>
        </div>
      </div>`;
  }

  async function submitAdd() {
    const type   = document.getElementById('rep-add-type').value;
    const course = document.getElementById('rep-add-course').value;
    const title  = document.getElementById('rep-add-title').value.trim();
    const text   = document.getElementById('rep-add-text').value.trim();
    if (!title || !text) { alert('Bitte Titel und Inhalt ausfüllen.'); return; }
    const ok = await saveItem({ type, course, title, content: { text }, source: 'manual' });
    if (ok) {
      document.getElementById('rep-add-modal')?.remove();
      await _loadItems();
      _render();
    } else {
      alert('Fehler beim Speichern.');
    }
  }

  // ── Private ───────────────────────────────────────────────────────────────

  async function _uid() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    return user?.id || null;
  }

  async function _loadItems() {
    try {
      const uid = await _uid();
      if (!uid) { _items = []; return; }
      const { data } = await window.supabaseClient
        .from('repetition_items')
        .select('*')
        .eq('user_id', uid)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      _items = data || [];
    } catch(e) { console.warn('RepetitionScreen load:', e); _items = []; }
  }

  function _filtered() {
    return _filter === 'all' ? _items : _items.filter(i => i.type === _filter);
  }

  function _render() {
    const el = document.getElementById('view-repetition');
    if (!el) return;
    const filtered = _filtered();

    const filterBtns = [['all','Alle'],['question','Fragen'],['formula','Formeln'],['note','Notizen']].map(([f,label]) => {
      const active = f === _filter;
      return `<button onclick="RepetitionScreen.setFilter('${f}')"
        style="padding:.35rem .85rem;border-radius:999px;font-size:.75rem;font-weight:700;border:none;cursor:pointer;
          background:${active?'#6366f1':'rgba(255,255,255,.07)'};
          color:${active?'#fff':'rgba(255,255,255,.45)'}">${label}</button>`;
    }).join('');

    const typeIcon = { formula:'📐', note:'📝', question:'❓' };

    const cards = filtered.map((item, i) => `
      <div onclick="RepetitionScreen.startReview(${i})"
        style="background:var(--card);border:1px solid var(--border);border-radius:16px;
          padding:.9rem 1rem;display:flex;align-items:center;gap:.85rem;cursor:pointer;
          transition:background .15s" class="tap-card">
        <div style="font-size:1.3rem;flex-shrink:0">${typeIcon[item.type]||'📌'}</div>
        <div style="flex:1;min-width:0">
          ${item.course ? `<div style="font-size:.65rem;font-weight:700;color:#6366f1;text-transform:uppercase;
            letter-spacing:.05em;margin-bottom:.15rem">${item.course}</div>` : ''}
          <div style="font-size:.88rem;font-weight:600;color:var(--txt);line-height:1.35;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.title||'—'}</div>
          <div style="font-size:.7rem;color:var(--txt-3);margin-top:.2rem">${_timeAgo(item.created_at)}</div>
        </div>
        <button onclick="event.stopPropagation();RepetitionScreen.deleteItem('${item.id}')"
          style="flex-shrink:0;background:none;border:none;color:rgba(255,255,255,.2);
          font-size:1rem;cursor:pointer;padding:.3rem .5rem;border-radius:6px">✕</button>
      </div>`).join('');

    el.innerHTML = `
      <div style="max-width:520px;margin:0 auto;padding:1rem 1rem 6rem">

        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;padding-top:.25rem">
          <button onclick="TabRouter.back()"
            style="background:rgba(255,255,255,.08);border:none;color:#9ca3af;border-radius:10px;
              padding:.4rem .75rem;cursor:pointer;font-size:.85rem">← Zurück</button>
          <h2 style="font-weight:800;font-size:1.1rem;margin:0;color:var(--txt)">
            Wiederholungen
            ${_items.length ? `<span style="font-size:.72rem;font-weight:700;color:#6366f1;
              background:rgba(99,102,241,.15);padding:.15rem .55rem;border-radius:999px;
              margin-left:.45rem">${_items.length}</span>` : ''}
          </h2>
        </div>

        <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">${filterBtns}</div>

        ${filtered.length
          ? `<div style="display:flex;flex-direction:column;gap:.55rem">${cards}</div>`
          : `<div style="text-align:center;padding:3rem 1rem">
              <div style="font-size:2.5rem;margin-bottom:.75rem">📭</div>
              <div style="font-weight:700;color:var(--txt);margin-bottom:.5rem">Keine Einträge</div>
              <div style="font-size:.82rem;color:var(--txt-2)">
                Im Prüfungskorrektur-Modus auf 📌 tippen<br>um Aufgaben zu speichern.
              </div>
            </div>`}

        <button onclick="RepetitionScreen.showAddFormula()"
          style="display:flex;align-items:center;justify-content:center;gap:.6rem;
            width:100%;margin-top:1.25rem;padding:.85rem;border-radius:14px;
            border:1.5px dashed rgba(99,102,241,.35);background:rgba(99,102,241,.06);
            color:#818cf8;font-size:.85rem;font-weight:600;cursor:pointer;box-sizing:border-box">
          + Formel oder Notiz hinzufügen
        </button>
      </div>`;
  }

  function _renderReviewCard() {
    let ov = document.getElementById('rep-review-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'rep-review-overlay';
      ov.style.cssText = `position:fixed;inset:0;z-index:900;background:#0b0b18;overflow-y:auto`;
      document.body.appendChild(ov);
    }

    if (_reviewIdx >= _reviewItems.length) {
      ov.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
          height:100%;gap:1.25rem;padding:2rem;text-align:center">
          <div style="font-size:3rem">🎉</div>
          <div style="font-size:1.1rem;font-weight:800;color:#e2e8f0">Alles durchgegangen!</div>
          <div style="font-size:.83rem;color:#6b7280">Als «Kapiert» markierte Einträge sind aus der Liste entfernt.</div>
          <button onclick="RepetitionScreen.closeReview()"
            style="background:#4f46e5;color:#fff;border:none;border-radius:14px;
            padding:.8rem 2rem;font-size:1rem;font-weight:700;cursor:pointer;margin-top:.5rem">Fertig</button>
        </div>`;
      return;
    }

    const item  = _reviewItems[_reviewIdx];
    const total = _reviewItems.length;
    const pct   = Math.round((_reviewIdx / total) * 100);
    const { type, course, title, content } = item;
    const isQ        = type === 'question';
    const choices    = content.choices || [];
    const correctKeys = content.correct_keys || [];
    const revealed   = !isQ || _selfTestSel !== null;

    // Choices HTML
    const choicesHtml = choices.map(c => {
      let bg, border, tc, icon = '';
      if (!revealed) {
        bg='rgba(255,255,255,.03)'; border='rgba(255,255,255,.1)'; tc='#d1d5db';
      } else {
        const sel  = c.key === _selfTestSel;
        const corr = correctKeys.includes(c.key);
        if (sel && corr)       { bg='rgba(74,222,128,.15)'; border='#4ade80'; tc='#4ade80'; icon='✓'; }
        else if (sel && !corr) { bg='rgba(248,113,113,.15)'; border='#f87171'; tc='#f87171'; icon='✗'; }
        else if (!sel && corr) { bg='rgba(74,222,128,.06)'; border='rgba(74,222,128,.4)'; tc='#86efac'; }
        else                   { bg='rgba(255,255,255,.03)'; border='rgba(255,255,255,.07)'; tc='#6b7280'; }
      }
      const onclick = !revealed ? `onclick="RepetitionScreen.selfTestSelect('${c.key}')"` : '';
      return `<div ${onclick} style="display:flex;align-items:flex-start;gap:.6rem;padding:.65rem .9rem;
        border-radius:10px;background:${bg};border:1.5px solid ${border};margin-bottom:.4rem;
        ${!revealed?'cursor:pointer;':''}transition:all .12s">
        <span style="font-weight:800;min-width:1.1rem;color:${tc};font-size:.85rem;flex-shrink:0">${c.key}</span>
        <span style="font-size:.85rem;line-height:1.5;color:${tc};flex:1">${c.text}</span>
        ${icon ? `<span style="font-weight:700;color:${tc}">${icon}</span>` : ''}
      </div>`;
    }).join('');

    const contextHtml = content.context ? `
      <details style="margin-bottom:.75rem">
        <summary style="cursor:pointer;font-size:.75rem;font-weight:700;color:#818cf8;
          padding:.45rem .75rem;background:rgba(99,102,241,.1);border-radius:8px;
          list-style:none;display:flex;align-items:center;gap:.4rem;user-select:none">
          ▶ Kontext anzeigen
        </summary>
        <div style="margin-top:.4rem;padding:.75rem;background:rgba(99,102,241,.06);
          border-left:2px solid rgba(99,102,241,.4);border-radius:0 8px 8px 0;
          font-size:.8rem;line-height:1.65;color:#94a3b8">${content.context.replace(/\n/g,'<br>')}</div>
      </details>` : '';

    const bodyHtml = isQ ? `
      ${contextHtml}
      <div style="background:#1a1a2e;border-radius:16px;padding:1.1rem;margin-bottom:.7rem">
        <div style="font-size:.68rem;font-weight:700;color:#6366f1;text-transform:uppercase;
          letter-spacing:.05em;margin-bottom:.45rem">Frage</div>
        <div style="font-size:.9rem;line-height:1.55;color:#e2e8f0">${content.question_text || title || ''}</div>
      </div>
      <div style="margin-bottom:.5rem">${choicesHtml}</div>
      ${!revealed ? `<div style="font-size:.73rem;color:#4b5563;text-align:center;margin:.25rem 0">Tippe auf eine Antwort</div>` : ''}
      ${revealed && content.explanation ? `
        <div style="background:#0f172a;border-radius:14px;padding:.9rem 1rem;margin-top:.6rem">
          <div style="font-size:.68rem;font-weight:700;color:#64748b;text-transform:uppercase;
            letter-spacing:.05em;margin-bottom:.4rem">Erklärung</div>
          <div style="font-size:.84rem;line-height:1.55;color:#94a3b8">${content.explanation}</div>
        </div>` : ''}` :
      `<div style="background:#1a1a2e;border-radius:16px;padding:1.1rem">
        <div style="font-size:.68rem;font-weight:700;color:#6366f1;text-transform:uppercase;
          letter-spacing:.05em;margin-bottom:.45rem">${type === 'formula' ? 'Formel' : 'Notiz'}</div>
        <div style="font-size:.9rem;line-height:1.65;color:#e2e8f0">${content.text || ''}</div>
      </div>`;

    ov.innerHTML = `
      <div style="max-width:520px;margin:0 auto;padding:1rem 1rem 6rem;width:100%">

        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;padding-top:.5rem">
          <button onclick="RepetitionScreen.closeReview()"
            style="background:rgba(255,255,255,.08);border:none;color:#9ca3af;border-radius:10px;
            padding:.4rem .7rem;cursor:pointer;font-size:.85rem">✕</button>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;margin-bottom:.3rem">
              <span style="font-size:.75rem;color:#6b7280">${_reviewIdx+1} / ${total}</span>
              <span style="font-size:.75rem;color:#6b7280">${pct}%</span>
            </div>
            <div style="height:4px;background:#1f2937;border-radius:2px">
              <div style="height:4px;background:#6366f1;border-radius:2px;width:${pct}%;transition:width .3s"></div>
            </div>
          </div>
        </div>

        ${course ? `<div style="font-size:.68rem;font-weight:700;color:#6366f1;text-transform:uppercase;
          letter-spacing:.05em;margin-bottom:.5rem">${course}</div>` : ''}
        <div style="font-size:1rem;font-weight:700;color:#e2e8f0;margin-bottom:.85rem;line-height:1.35">${title}</div>

        ${bodyHtml}

        ${revealed ? `
        <div style="display:flex;gap:.75rem;margin-top:1.25rem">
          <button onclick="RepetitionScreen.markDone('${item.id}')"
            style="flex:1;border:none;border-radius:14px;padding:.75rem;font-size:.85rem;font-weight:700;cursor:pointer;
              background:rgba(74,222,128,.15);color:#4ade80;border:1px solid rgba(74,222,128,.3)">Kapiert ✓</button>
          <button onclick="RepetitionScreen.keepAndNext()"
            style="flex:1;border:none;border-radius:14px;padding:.75rem;font-size:.85rem;font-weight:700;cursor:pointer;
              background:rgba(255,255,255,.07);color:#9ca3af;border:1px solid rgba(255,255,255,.1)">Nochmal üben</button>
        </div>` : ''}

        ${_reviewIdx > 0 ? `
        <button onclick="RepetitionScreen.reviewPrev()"
          style="display:block;width:100%;margin-top:.6rem;background:none;border:none;
          color:#4b5563;font-size:.8rem;cursor:pointer;padding:.5rem">← Zurück</button>` : ''}
      </div>`;

    window.LernsetEngine?.renderMathIn(ov);
  }

  function _timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff/60000);
    if (m < 60)  return `vor ${m} Min.`;
    const h = Math.floor(m/60);
    if (h < 24)  return `vor ${h} Std.`;
    const d = Math.floor(h/24);
    return `vor ${d} Tag${d>1?'en':''}`;
  }

  return {
    init, getPendingCount, saveItem, setFilter,
    startReview, selfTestSelect, markDone, keepAndNext, reviewPrev, closeReview,
    deleteItem, showAddFormula, submitAdd,
  };
})();
