const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// Create a window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false,
    },
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');
  mainWindow.setMenuBarVisibility(false);

  // Open the DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Create the main Electron window
app.whenReady().then(createWindow);

// Handle IPC communication from the renderer process
ipcMain.on('timetable', (event, timetable) => {
  // Send the timetable data to the renderer process
  event.reply('display-timetable', timetable);
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create a new window when the app is activated (e.g., clicking the app icon on macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
