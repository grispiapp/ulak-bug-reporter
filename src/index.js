import {getLogs, clearLogs, interceptConsole } from './consoleInterceptor';
import {LONG_VERSION} from './version';

export {getLogs, clearLogs, interceptConsole};

console.info(LONG_VERSION);
