const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendControl: (action) => ipcRenderer.send('window-control', action),
    openExternal: (url) => ipcRenderer.send('open-external', url),
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    // Generic Store access for cross-process state
    getStoreValue: (key) => ipcRenderer.invoke('get-store-value', key),
    setStoreValue: (key, value) => ipcRenderer.send('set-store-value', key, value)
})
