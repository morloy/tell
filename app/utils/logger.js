import log from 'electron-log';

const configureLogger = () => {
  if (process.env.NODE_ENV !== 'development') {
    log.transports.file.streamConfig = { flags: 'w' };
    const windowConsole = console;
    log.transports.console = (msg) => {
      windowConsole.log(`[${msg.date.toLocaleTimeString()} ${msg.level}] ${msg.text}`);
    };
    window.console = log;
  }
};

export default configureLogger;
