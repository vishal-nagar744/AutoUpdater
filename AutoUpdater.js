const { Notification } = require("electron");
const { autoUpdater } = require("electron-updater");

class AutoUpdater {
  constructor() {
    this.updateNotification = null;

    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on("update-available", () => this.onUpdateAvailable());
    autoUpdater.on("update-downloaded", () => this.onUpdateDownloaded());
    autoUpdater.on("error", (error) => this.onError(error));

    autoUpdater.checkForUpdates();
  }

  onUpdateAvailable() {
    this.showNotification("A new update is available. Downloading...");
    autoUpdater.downloadUpdate();
  }

  onUpdateDownloaded() {
    this.showNotification("Update downloaded. Restart the application to apply changes.");
    // Optionally trigger installation process
    // autoUpdater.quitAndInstall();
  }

  onError(error) {
    console.error("Update error:", error);
  }

  showNotification(message) {
    if (!this.updateNotification) {
      this.updateNotification = new Notification({
        title: "Update Notification",
        body: message,
      });
    } else {
      this.updateNotification.body = message;
    }
    this.updateNotification.show();
  }
}

module.exports = AutoUpdater;
