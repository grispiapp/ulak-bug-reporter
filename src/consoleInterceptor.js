import {LONG_VERSION} from './version';
import {IS_SSR, IS_ON_BROWSER} from "./isSSR";
import registerEventHandlers from "./eventHandlers";
import {CONSOLE_LABEL} from "./config";

const NOOP = function(){}

const LOG_TYPE = {
  trace: 'T',
  debug: 'D',
  log: 'L',
  info: 'I',
  warn: 'W',
  error: 'E'
}

const logOriginal = IS_SSR ? NOOP : console.log.bind(window.console);
const traceOriginal = IS_SSR ? NOOP : console.trace.bind(window.console);
const debugOriginal = IS_SSR ? NOOP : console.debug.bind(window.console);
const infoOriginal = IS_SSR ? NOOP : console.info.bind(window.console);
const warnOriginal = IS_SSR ? NOOP : console.warn.bind(window.console);
const errorOriginal = IS_SSR ? NOOP : console.error.bind(window.console);

const startTime = Date.now();

let allLogs = "";
let consoleIntercepted = false;

registerEventHandlers();

function parseLog(args, logType) {
  let s = [Date.now() - startTime, logType];
  for (const a of args) {
    if (typeof a === "undefined") {
      s.push("undefined");
    }
    else if (typeof a === "object") {
      if (a instanceof Error) {
        s.push(a.stack || a.toString());
      }
      else {
        s.push(JSON.stringify(a));
      }
    }
    else if (typeof a === "boolean") {
      s.push(a);
    }
    else if (typeof a === "number") {
      s.push(a);
    }
    else if (typeof a === "bigint") {
      s.push(a);
    }
    else if (typeof a === "string") {
      s.push(a);
    }
    else if (typeof a === "symbol") {
      s.push(a);
    }
    else if (typeof a === "function") {
      s.push(`[Function ${a.name}]`);
    }
    else {
      s.push(`[Unrecognized type ${a}]`)
    }
  }
  //TODO xxx add file name and line number https://github.com/stacktracejs/stacktrace.js
  return s.join(' ');
}

function persist(log) {
  allLogs += "\n" + log;
}

function _log(args, logType) {
  const log = parseLog(args, logType);
  persist(log);
}

function log() {
  _log(arguments, LOG_TYPE.log)
}

function trace() {
  // TODO get the actual stack https://stackoverflow.com/a/6715624/878361
  _log(arguments, LOG_TYPE.trace)
}

function debug() {
  _log(arguments, LOG_TYPE.debug)
}

function info() {
  _log(arguments, LOG_TYPE.info)
}

function warn() {
  _log(arguments, LOG_TYPE.warn)
}

function error() {
  _log(arguments, LOG_TYPE.error)
}

export function getLogs() {
  const startTimeMessage = `\nStart time: ${startTime}\n`;
  return LONG_VERSION + startTimeMessage + allLogs;
}

export function clearLogs() {
  allLogs = "";
}

export function interceptConsole() {
  if (!IS_ON_BROWSER) {
    console.debug(CONSOLE_LABEL, 'Not on browser, ignoring...');
    return;
  }
  if (!consoleIntercepted && IS_ON_BROWSER) {

    // console.log
    window.console.log = function() {
      logOriginal.apply(window.console, arguments);
      log.apply(null, arguments);
    }

    // console.trace
    window.console.trace = function() {
      traceOriginal.apply(window.console, arguments);
      trace.apply(null, arguments);
    }

    // console.debug
    window.console.debug = function() {
      debugOriginal.apply(window.console, arguments);
      debug.apply(null, arguments);
    }

    // console.info
    window.console.info = function() {
      infoOriginal.apply(window.console, arguments);
      info.apply(null, arguments);
    }

    // console.warn
    window.console.warn = function() {
      warnOriginal.apply(window.console, arguments);
      warn.apply(null, arguments);
    }

    // console.error
    window.console.error = function() {
      errorOriginal.apply(window.console, arguments);
      error.apply(null, arguments);
    }

    consoleIntercepted = true;
  }
  else {
    warnOriginal(CONSOLE_LABEL, 'Console is already intercepted!');
  }
}
