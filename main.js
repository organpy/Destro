const { app, BrowserWindow, ipcMain, screen, shell, dialog } = require('electron')
const path = require('path')

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
        webPreferences: {
            preload: path.join(__dirname, 'dist-electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        frame: false,
        backgroundColor: '#070707',
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(__dirname, 'dist/index.html'))
    }

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
