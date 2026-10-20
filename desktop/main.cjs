'use strict';
const { app, BrowserWindow, Menu, ipcMain, shell, session, dialog } = require('electron');
const crypto = require('node:crypto');
const path = require('node:path');

const APP_ORIGIN = 'https://k-learning.pages.dev';
const AUTH_ORIGIN = 'https://ifmwcgwfvunjbnfwwbtr.supabase.co';
// Public Supabase publishable key: not a server credential and grants no privileged access.
const PUBLISHABLE_KEY = 'sb_publishable__h4cSWEEpNBjY3XGPvh0_A_ipyoeEjO';
const RELEASE_PAGE = 'https://kaufmannadvisory.ch/k-learning.html';
const RELEASE_MANIFEST = 'https://kaufmannadvisory.ch/releases.json';
const TIMEOUT_MS = 5 * 60 * 1000;
let mainWindow;
let pendingLogin;
let navigationGeneration = 0;

function trustedPage(value) {
  try { const u = new URL(value); return u.origin === APP_ORIGIN && !u.username && !u.password; }
  catch { return false; }
}
function trustedSender(event) {
  return mainWindow && !mainWindow.isDestroyed() && event.sender === mainWindow.webContents &&
    event.senderFrame === mainWindow.webContents.mainFrame && trustedPage(event.senderFrame.url);
}
function approvedExternal(value) {
  try {
    const u = new URL(value);
    const domains = ['kaufmannadvisory.ch', 'k-learning.pages.dev', 'unisg.ch', 'hsg.ch', 'youtube.com', 'youtu.be'];
    return u.protocol === 'https:' && !u.username && !u.password && domains.some(d => u.hostname === d || u.hostname.endsWith('.' + d));
  } catch { return false; }
}
function cancelLogin(message) {
  if (!pendingLogin) return;
  const login = pendingLogin; pendingLogin = undefined;
  clearTimeout(login.timeout);
  login.verifier = '';
  login.reject(new Error(message));
}
function startGoogleSignIn(event) {
  if (!trustedSender(event)) throw new Error('Anmeldung nur im K-Learning-Hauptfenster erlaubt.');
  cancelLogin('Die vorherige Anmeldung wurde durch eine neue Anmeldung ersetzt.');
  return new Promise((resolve, reject) => {
    const verifier = crypto.randomBytes(32).toString('base64url');
    const state = crypto.randomBytes(32).toString('base64url');
    const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
    const callback = new URL('/desktop-auth.html', APP_ORIGIN);
    callback.searchParams.set('desktop_state', state);
    const auth = new URL('/auth/v1/authorize', AUTH_ORIGIN);
    auth.searchParams.set('provider', 'google');
    auth.searchParams.set('redirect_to', callback.href);
    auth.searchParams.set('code_challenge', challenge);
    auth.searchParams.set('code_challenge_method', 's256');
    pendingLogin = { verifier, state, resolve, reject, senderId: event.sender.id, senderFrame: event.senderFrame, navigationGeneration,
      timeout: setTimeout(() => cancelLogin('Die Anmeldung ist abgelaufen. Bitte erneut mit Google anmelden.'), TIMEOUT_MS) };
    // Fixed Supabase authorization URL, generated locally; Google opens in the system browser.
    shell.openExternal(auth.href).catch(() => cancelLogin('Der Browser konnte nicht geöffnet werden.'));
  });
}
async function handleCallback(value) {
  if (!pendingLogin) return;
  let u;
  try { u = new URL(value); } catch { return; }
  if (u.protocol !== 'klearning:' || u.hostname !== 'auth' || (u.pathname !== '' && u.pathname !== '/') || u.username || u.password) return;
  const returnedState = u.searchParams.get('desktop_state') || '';
  const login = pendingLogin;
  if (!/^[A-Za-z0-9_-]{43}$/.test(returnedState) || returnedState.length !== login.state.length || !crypto.timingSafeEqual(Buffer.from(returnedState), Buffer.from(login.state))) return;
  const code = u.searchParams.get('code');
  if (!code || code.length > 4096 || !/^[A-Za-z0-9._~-]+$/.test(code)) { cancelLogin('Die Anmeldeantwort war ungültig. Bitte erneut anmelden.'); return; }
  // Consume once before network IO. Another protocol activation cannot replay this login.
  pendingLogin = undefined; clearTimeout(login.timeout);
  try {
    const response = await fetch(AUTH_ORIGIN + '/auth/v1/token?grant_type=pkce', {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { apikey: PUBLISHABLE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth_code: code, code_verifier: login.verifier }),
    });
    login.verifier = '';
    if (!response.ok) throw new Error('Die Anmeldung konnte nicht bestätigt werden. Bitte erneut anmelden.');
    const result = await response.json();
    if (typeof result.access_token !== 'string' || typeof result.refresh_token !== 'string') throw new Error('Die Anmeldeantwort war unvollständig.');
    if (!mainWindow || mainWindow.isDestroyed() || mainWindow.webContents.id !== login.senderId || mainWindow.webContents.mainFrame !== login.senderFrame || navigationGeneration !== login.navigationGeneration || !trustedPage(mainWindow.webContents.getURL())) throw new Error('Öffne K-Learning und melde dich erneut an.');
    // Only the original trusted top-frame invoke receives tokens. Never put tokens into URLs/logs.
    login.resolve({ access_token: result.access_token, refresh_token: result.refresh_token });
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show(); mainWindow.focus();
  } catch (error) { login.verifier = ''; login.reject(new Error(error.name === 'TimeoutError' ? 'Die Anmeldung hat zu lange gedauert. Bitte erneut versuchen.' : error.message)); }
}
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'K-Learning', width: 1300, height: 900, minWidth: 860, minHeight: 640,
    show: false, backgroundColor: '#f7f8fa', titleBarStyle: 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), partition: 'persist:klearning',
      nodeIntegration: false, contextIsolation: true, sandbox: true, webSecurity: true,
      allowRunningInsecureContent: false, webviewTag: false, navigateOnDragDrop: false,
      safeDialogs: true, spellcheck: true,
    },
  });
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = undefined; cancelLogin('Das Anmeldefenster wurde geschlossen.'); });
  const wc = mainWindow.webContents;
  wc.on('will-navigate', (event, url) => {
    if (trustedPage(url)) return;
    event.preventDefault();
    if (approvedExternal(url)) shell.openExternal(url);
  });
  wc.on('will-redirect', (event, url) => { if (!trustedPage(url)) event.preventDefault(); });
  wc.on('will-attach-webview', event => event.preventDefault());
  wc.setWindowOpenHandler(({ url }) => {
    if (approvedExternal(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  wc.on('did-start-navigation', (_event, _url, _inPlace, isMainFrame) => {
    if (isMainFrame) { navigationGeneration++; if (pendingLogin) cancelLogin('Die Seite wurde gewechselt. Bitte erneut anmelden.'); }
  });
  wc.on('did-fail-load', (_event, code, _description, _url, isMainFrame) => {
    if (isMainFrame && code !== -3) mainWindow?.loadFile(path.join(__dirname, 'offline.html'));
  });
  wc.on('render-process-gone', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.loadFile(path.join(__dirname, 'offline.html'));
  });
  mainWindow.loadURL(APP_ORIGIN + '/');
}
async function checkForUpdates() {
  try {
    const res = await fetch(RELEASE_MANIFEST, { signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!res.ok) throw new Error('manifest');
    const release = (await res.json()).products?.['k-learning'];
    if (!release || !/^\d+\.\d+\.\d+$/.test(release.version)) throw new Error('version');
    const current = app.getVersion().split('.').map(Number), next = release.version.split('.').map(Number);
    const newer = next.some((v, i) => v > current[i] && next.slice(0, i).every((n, j) => n === current[j]));
    if (newer) {
      const { response } = await dialog.showMessageBox(mainWindow, { type: 'info', title: 'K-Learning aktualisieren', message: 'Version ' + release.version + ' ist verfügbar.', detail: 'Lade die neue signierte Version bei K-Advisory herunter und ersetze K-Learning im Programme-Ordner.', buttons: ['Download öffnen', 'Später'], cancelId: 1 });
      if (response === 0) shell.openExternal(RELEASE_PAGE);
    } else await dialog.showMessageBox(mainWindow, { type: 'info', message: 'K-Learning ist aktuell.', detail: 'Version ' + app.getVersion() + '. Lerninhalte werden beim Laden automatisch von der Plattform aktualisiert.', buttons: ['Schliessen'] });
  } catch { await dialog.showMessageBox(mainWindow, { type: 'warning', message: 'Die Versionsprüfung ist gerade nicht möglich.', detail: 'Versuche es später erneut oder öffne kaufmannadvisory.ch/k-learning.html.', buttons: ['Schliessen'] }); }
}
function createMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'K-Learning', submenu: [ { role: 'about' }, { label: 'Nach Updates suchen …', click: checkForUpdates }, { type: 'separator' }, { role: 'services' }, { type: 'separator' }, { role: 'hide' }, { role: 'hideOthers' }, { role: 'unhide' }, { type: 'separator' }, { role: 'quit' } ] },
    { label: 'Ablage', submenu: [{ role: 'close' }] },
    { label: 'Bearbeiten', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' }] },
    { label: 'Darstellung', submenu: [{ role: 'reload' }, { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { type: 'separator' }, { role: 'togglefullscreen' }, { label: 'Im Browser öffnen', click: () => shell.openExternal(APP_ORIGIN) }] },
    { label: 'Fenster', submenu: [{ role: 'minimize' }, { role: 'zoom' }, { type: 'separator' }, { role: 'front' }] },
    { role: 'help', label: 'Hilfe', submenu: [{ label: 'K-Learning im Web', click: () => shell.openExternal(APP_ORIGIN) }, { label: 'K-Advisory Downloads', click: () => shell.openExternal(RELEASE_PAGE) }] },
  ]));
}
app.setName('K-Learning');
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('open-url', (event, url) => { event.preventDefault(); void handleCallback(url); });
  app.on('second-instance', (_event, argv) => { const callback = argv.find(a => a.startsWith('klearning://')); if (callback) void handleCallback(callback); if (mainWindow) { mainWindow.show(); mainWindow.focus(); } });
  app.whenReady().then(() => {
    app.setAsDefaultProtocolClient('klearning');
    const webSession = session.fromPartition('persist:klearning');
    webSession.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
    webSession.setPermissionCheckHandler(() => false);
    ipcMain.handle('klearning:google-signin', startGoogleSignIn);
    createMenu(); createWindow();
    app.on('activate', () => { if (!mainWindow) createWindow(); else mainWindow.show(); });
  });
  app.on('before-quit', () => cancelLogin('K-Learning wurde beendet.'));
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}
