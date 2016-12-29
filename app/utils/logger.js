import log from 'electron-log';
const updater = Remote.require('electron-simple-updater');

const configureLogger = () => {
  if (process.env.NODE_ENV !== 'development') {
    log.transports.file.streamConfig = { flags: 'w' };
    const windowConsole = console;
    log.transports.console = (msg) => {
      windowConsole.log(`[${msg.date.toLocaleTimeString()} ${msg.level}] ${msg.text}`);
    };
    window.console = log;
  }


  updater.on("update-available", () => {
    console.log("A new update is available")
  });

  updater.on("error", (err) => {
    console.log(err)
  });
};

export default configureLogger;
