import {app, dialog} from "electron";
import * as os from "os";
import updater from "electron-simple-updater";

const configureUpdater = (window) => {
  updater.on("update-downloaded", ({ version }) => {
    dialog.showMessageBox({
      type: 'info',
      message: 'A new update is ready to install',
      buttons: ['Restart and Install'],
      detail: `Version ${version} is downloaded and will be automatically installed on restart.`
    });
    console.log("quitAndInstall");
    updater.quitAndInstall();
    if (process.platform === 'darwin') { app.quit(); }
    return true;
  });

  window.webContents.once("did-frame-finish-load", () => {
    updater.checkForUpdates();
    setInterval(() => { updater.checkForUpdates(); }, 2*60*60*1000);
  });
};

export default configureUpdater;
