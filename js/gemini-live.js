// ── Gemini Multimodal Live API ─────────────────────────────────────────────
// WebSocket bidirectional voice session with Gemini 2.0 Flash

window.GeminiLive = (() => {
  const STORAGE_KEY = 'gemini-live-api-key';
  const WS_BASE     = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent';
  const MODEL       = 'models/gemini-2.0-flash-live-001';

  // ── Key management ──────────────────────────────────────────────────────
  function getKey()      { return localStorage.getItem(STORAGE_KEY) || null; }
  function saveKey(key)  { key ? localStorage.setItem(STORAGE_KEY, key.trim()) : localStorage.removeItem(STORAGE_KEY); }
  function isAvailable() { return !!getKey(); }

  // ── PCM Streaming Player (24 kHz output from Gemini) ────────────────────
  class PCMPlayer {
    constructor() {
      this.actx     = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      this.nextTime = 0;
      this.nodes    = [];
    }

    enqueue(base64) {
      const raw   = atob(base64);
      const bytes = Uint8Array.from({ length: raw.length }, (_, i) => raw.charCodeAt(i));
      const i16   = new Int16Array(bytes.buffer);
      const f32   = new Float32Array(i16.length);
      for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 32768;

      const buf = this.actx.createBuffer(1, f32.length, 24000);
      buf.copyToChannel(f32, 0);

      const src = this.actx.createBufferSource();
      src.buffer = buf;
      src.connect(this.actx.destination);
      src.onended = () => { this.nodes = this.nodes.filter(n => n !== src); };

      const t = Math.max(this.actx.currentTime, this.nextTime);
      src.start(t);
      this.nextTime = t + buf.duration;
      this.nodes.push(src);
    }

    stop() {
      this.nodes.forEach(n => { try { n.stop(); } catch(_) {} });
      this.nodes    = [];
      this.nextTime = 0;
    }

    get isPlaying() { return this.nodes.length > 0; }

    close() { this.stop(); this.actx.close().catch(() => {}); }
  }

  // ── Module state ─────────────────────────────────────────────────────────
  let _ws        = null;
  let _player    = null;
  let _micStream = null;
  let _micActx   = null;
  let _micProc   = null;
  let _connected = false;

  // Callbacks (set per-connect)
  let _cb = {};

  // ── Connect ──────────────────────────────────────────────────────────────
  // systemPrompt: string
  // callbacks: { onReady, onAudioStart, onAudioDone, onText, onTurnComplete, onInterrupted, onError }
  function connect(systemPrompt, callbacks) {
    if (!getKey()) return Promise.reject(new Error('No Gemini API key'));
    _cb = callbacks || {};
    disconnect();
    _player = new PCMPlayer();

    return new Promise((resolve, reject) => {
      const to = setTimeout(() => reject(new Error('Setup timeout')), 12000);

      _ws = new WebSocket(`${WS_BASE}?key=${getKey()}`);

      _ws.onopen = () => {
        // First message must be setup
        _ws.send(JSON.stringify({
          setup: {
            model: MODEL,
            generation_config: {
              response_modalities: ['AUDIO', 'TEXT'],
              speech_config: {
                voice_config: {
                  prebuilt_voice_config: { voice_name: 'Aoede' }
                }
              }
            },
            system_instruction: {
              parts: [{ text: systemPrompt }]
            }
          }
        }));
      };

      _ws.onmessage = (evt) => {
        let msg;
        try { msg = JSON.parse(evt.data); } catch(e) { return; }

        // Setup acknowledged
        if (msg.setupComplete) {
          _connected = true;
          clearTimeout(to);
          resolve();
          _cb.onReady?.();
          return;
        }

        const sc = msg.serverContent;
        if (!sc) return;

        // Model was interrupted by user
        if (sc.interrupted) {
          _player.stop();
          _cb.onInterrupted?.();
          return;
        }

        // Streaming model response (audio + text chunks)
        if (sc.modelTurn?.parts) {
          let audioStarted = false;
          for (const part of sc.modelTurn.parts) {
            if (part.inlineData?.mimeType?.startsWith('audio/pcm')) {
              if (!_player.isPlaying && !audioStarted) { audioStarted = true; _cb.onAudioStart?.(); }
              _player.enqueue(part.inlineData.data);
            }
            if (part.text) {
              _cb.onText?.(part.text);
            }
          }
        }

        // Model finished its turn — wait until audio queue drains
        if (sc.turnComplete) {
          const poll = setInterval(() => {
            if (!_player.isPlaying) {
              clearInterval(poll);
              _cb.onAudioDone?.();
              _cb.onTurnComplete?.();
            }
          }, 80);
          // Failsafe: give up after 30 s
          setTimeout(() => clearInterval(poll), 30000);
        }
      };

      _ws.onerror = () => {
        clearTimeout(to);
        _cb.onError?.('WebSocket-Verbindungsfehler');
        reject(new Error('WebSocket error'));
      };

      _ws.onclose = () => { _connected = false; };
    });
  }

  // ── Send text turn ────────────────────────────────────────────────────────
  function sendText(text) {
    if (!_ws || _ws.readyState !== WebSocket.OPEN) return;
    _ws.send(JSON.stringify({
      client_content: {
        turns: [{ role: 'user', parts: [{ text }] }],
        turn_complete: true
      }
    }));
  }

  // ── Microphone streaming (PCM 16 kHz → base64 → WebSocket) ───────────────
  async function startMic() {
    if (_micStream) return;
    _micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    _micActx   = new (window.AudioContext || window.webkitAudioContext)();

    const src  = _micActx.createMediaStreamSource(_micStream);
    _micProc   = _micActx.createScriptProcessor(4096, 1, 1);
    src.connect(_micProc);
    _micProc.connect(_micActx.destination);

    _micProc.onaudioprocess = (e) => {
      if (!_ws || _ws.readyState !== WebSocket.OPEN) return;
      const raw     = e.inputBuffer.getChannelData(0);
      const fromHz  = _micActx.sampleRate;
      const ratio   = fromHz / 16000;
      const outLen  = Math.floor(raw.length / ratio);
      const f32     = new Float32Array(outLen);
      for (let i = 0; i < outLen; i++) f32[i] = raw[Math.floor(i * ratio)];

      const i16   = new Int16Array(outLen);
      for (let i = 0; i < outLen; i++) i16[i] = Math.max(-32768, Math.min(32767, f32[i] * 32768));

      const u8     = new Uint8Array(i16.buffer);
      let   binary = '';
      for (let i = 0; i < u8.length; i++) binary += String.fromCharCode(u8[i]);

      _ws.send(JSON.stringify({
        realtime_input: {
          media_chunks: [{ data: btoa(binary), mime_type: 'audio/pcm;rate=16000' }]
        }
      }));
    };
  }

  function stopMic() {
    if (_micProc)   { _micProc.disconnect();  _micProc   = null; }
    if (_micActx)   { _micActx.close().catch(() => {}); _micActx = null; }
    if (_micStream) { _micStream.getTracks().forEach(t => t.stop()); _micStream = null; }
  }

  // ── Stop audio playback (for local VAD interruption) ─────────────────────
  function stopPlayback() { _player?.stop(); }

  // ── Disconnect ────────────────────────────────────────────────────────────
  function disconnect() {
    stopMic();
    _player?.close(); _player = null;
    if (_ws) { try { _ws.close(); } catch(_) {} _ws = null; }
    _connected = false;
    _cb = {};
  }

  return {
    getKey,
    saveKey,
    isAvailable,
    connect,
    sendText,
    startMic,
    stopMic,
    stopPlayback,
    disconnect,
    get isPlaying() { return _player?.isPlaying ?? false; }
  };
})();
