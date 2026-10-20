'use strict';
const { contextBridge, ipcRenderer } = require('electron');
// No general IPC, file, shell, node or token storage API reaches website JavaScript.
if (window.location.origin === 'https://k-learning.pages.dev' && process.isMainFrame) {
  contextBridge.exposeInMainWorld('kLearningDesktop', Object.freeze({
    isDesktop: true,
    signInWithGoogle: () => ipcRenderer.invoke('klearning:google-signin'),
  }));
}
