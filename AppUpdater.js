import {app, dialog} from "electron";
import * as os from "os";
import {autoUpdater} from "electron-auto-updater";

const UPDATE_SERVER_HOST = "tell-now.com/update"

export default class AppUpdater {
  constructor(window: BrowserWindow) {

    const platform = os.platform()
    if (platform === "linux") {
      return
    }

    const version = app.getVersion()
    autoUpdater.addListener("update-available", (event: any) => {
      console.log("A new update is available")
    })

    autoUpdater.addListener("update-downloaded", (event: any, releaseNotes: string, releaseName: string, releaseDate: string, updateURL: string) => {
      dialog.showMessageBox({
        type: 'info',
        message: 'A new update is ready to install',
        buttons: ['Restart and Install'],
        detail: `Version ${releaseName} is downloaded and will be automatically installed on Quit.`
      });
      console.log("quitAndInstall");
      autoUpdater.quitAndInstall();
      if (process.platform === 'darwin') { app.quit(); }
      return true;
    })
    autoUpdater.addListener("error", (error: any) => {
      console.log(error)
    })
    autoUpdater.addListener("checking-for-update", (event: any) => {
      console.log("checking-for-update")
    })
    autoUpdater.addListener("update-not-available", () => {
      console.log("update-not-available")
    })

    if (platform === "darwin") {
      console.log(`https://${UPDATE_SERVER_HOST}/update/${platform}_${os.arch()}/${version}`);
      autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${platform}_${os.arch()}/${version}`);
    }

    window.webContents.once("did-frame-finish-load", (event: any) => {
      autoUpdater.checkForUpdates()
      setInterval(() => { autoUpdater.checkForUpdates(); }, 5*60*60*1000);
    })
  }
}
