import {app, dialog} from "electron";
import * as os from "os";
import updater from "electron-simple-updater";

const configureUpdater = (window) => {
  updater.on("update-available", () => {
    console.log("A new update is available")
  });

  updater.on("update-downloaded", ({ version }) => {
    dialog.showMessageBox({
      type: 'info',
      message: 'A new update is ready to install',
      buttons: ['Restart and Install'],
      detail: `Version ${version} is downloaded and will be automatically installed on Quit.`
    });
    console.log("quitAndInstall");
    updater.quitAndInstall();
    if (process.platform === 'darwin') { app.quit(); }
    return true;
  });

  updater.on("error", (err) => {
    console.log(err)
  });

  updater.on("checking-for-update", () => {
    console.log("checking-for-update")
  });

  updater.on("update-not-available", () => {
    console.log("update-not-available")
  });

  window.webContents.once("did-frame-finish-load", () => {
    updater.checkForUpdates()
    setInterval(() => { updater.checkForUpdates(); }, 5*60*60*1000);
  });
};

export default configureUpdater;
