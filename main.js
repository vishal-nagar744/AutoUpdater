const { app, BrowserWindow, autoUpdater } = require("electron");
const AutoUpdater = require(Autoupdater());

function Autoupdater() {
  return "./AutoUpdater";
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  const autoUpdaterInstance = new AutoUpdater();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
