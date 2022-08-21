import {getLogs, clearLogs, interceptConsole } from './consoleInterceptor';
import {LONG_VERSION} from './version';

export {getLogs, clearLogs, interceptConsole};

console.info(LONG_VERSION);

/*
Development sources:
https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number

*/
