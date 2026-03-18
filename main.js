const { app, BrowserWindow, ipcMain, screen, shell, dialog } = require('electron')
const path = require('path')

// Disable GPU acceleration on Linux to fix rendering issues
if (process.platform === 'linux') {
    app.disableHardwareAcceleration()
    // Additional GPU-related flags for Linux Chromium/Electron
    app.commandLine.appendSwitch('disable-gpu')
    app.commandLine.appendSwitch('disable-gpu-compositing')
    app.commandLine.appendSwitch('disable-zero-copy')
}

function createWindow() {
    // Get the primary display's work area (excludes taskbar)
    const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize

    // Target ~78% of the screen width, ~82% of height
    // Clamped so it's never too small on small screens, and never too large on big ones
    const winW = Math.round(Math.max(980, Math.min(1200, screenW * 0.78)))
    const winH = Math.round(Math.max(620, Math.min(820, screenH * 0.82)))

    const win = new BrowserWindow({
        width: winW,
        height: winH,
        center: true,           // Always centered on screen
        resizable: false,       // No manual resize
        maximizable: false,     // No maximize button / shortcut
        fullscreenable: false,  // No fullscreen
        icon: path.join(__dirname, 'assets/Destro.ico'),
        show: false,            // Don't show until ready
        webPreferences: {
            preload: path.join(__dirname, 'dist-electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        frame: false,
        backgroundColor: '#070707',
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        console.log(`[Electron] Loading dev server: ${process.env.VITE_DEV_SERVER_URL}`)
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        const filePath = path.join(__dirname, 'dist/index.html')
        console.log(`[Electron] Loading file: ${filePath}`)
        win.loadFile(filePath)
    }

    // Show window when ready, with fallback to immediate show after short delay
    win.once('ready-to-show', () => {
        win.show()
    })
    
    // Fallback: show after 1 second if ready-to-show doesn't fire
    setTimeout(() => {
        if (!win.isVisible()) {
            console.log('[Electron] Forcing window to show (fallback)')
            win.show()
        }
    }, 1500)

    // Log when the window is created
    console.log('[Electron] BrowserWindow created')

    // Handle errors
    win.webContents.on('crashed', () => {
        console.error('[Electron] Renderer process crashed')
    })

    win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.error(`[Electron] Failed to load ${validatedURL}: ${errorCode} - ${errorDescription}`)
    })

    win.webContents.on('console-message', (event, level, message, line, sourceId) => {
        console.log(`[Renderer] ${message}`)
    })

    win.on('unresponsive', () => {
        console.warn('[Electron] App unresponsive')
    })

    // Handle window controls — maximize is intentionally disabled
    ipcMain.on('window-control', (event, action) => {
        switch (action) {
            case 'minimize': win.minimize(); break;
            case 'close': win.close(); break;
        }
    })

    ipcMain.on('open-external', (event, url) => {
        shell.openExternal(url)
    })

    // Native Dialog for Save Directory
    ipcMain.handle('select-directory', async () => {
        const result = await dialog.showOpenDialog(win, {
            properties: ['openDirectory'],
            title: 'Select Vault Directory'
        })
        return result.filePaths[0] // Returns the path or undefined if canceled
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
