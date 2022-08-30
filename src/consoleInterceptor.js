import {LONG_VERSION} from './version';
import {IS_SSR, IS_ON_BROWSER} from "./isSSR";
import registerEventHandlers from "./eventHandlers";

export const STORAGE_KEY = "UlakLog";
const STRING_STORAGE_THRESHOLD = 200_000; //Don't let this to be customized
const CONSOLE_LABEL = "Ulak";
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
let quotaExceeded = false;
let storageKeyIndex = 0;

// When quotaExceeded, then we start to overwrite old sessionStorage buckets. In that case storageKeyIndex won't show
//the latest index.
let storageMaxKeyIndex = 0;

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

  return s.join(' ');
}

function persist(log) {

  allLogs += "\n" + log;

  if (allLogs.length < STRING_STORAGE_THRESHOLD) return;

  try {
    const currentStorageKey = STORAGE_KEY + (storageKeyIndex++);
    storageMaxKeyIndex = Math.max(storageMaxKeyIndex, storageKeyIndex);
    infoOriginal(CONSOLE_LABEL, 'writing to storage', currentStorageKey);

    // There will be some log loss but this trimming will increase the chances of successful write w/o another quotaExceeded exception
    sessionStorage.setItem(currentStorageKey, allLogs.substring(allLogs.length - STRING_STORAGE_THRESHOLD));
    allLogs = "";
    infoOriginal(CONSOLE_LABEL, 'written to storage', currentStorageKey);
  }
  catch(e) {
    quotaExceeded = true;

    // currentStorageKeyIsUsed would be true when quotaExceeded before and we started to overwrite session storage buckets
    // Say there's already UlakLog0, UlakLog1 then when trying to create UlakLog3 we got quotaExceeded exception.
    //Then we clear UlakLog0, set storageKeyIndex=0 and move on. After a while we try to write to UlakLog1 and get an exception.
    //In that case we shouldn't clear UlakLog0 but we should clear UlakLog1 and write to it.
    //UlakLog1 was used before we got the first quotaExceeded exception hence it's not empty. Hence, we don't change storageKeyIndex
    // which is currently 1 so we clear UlakLog1 and write to it (in the next log).
    const currentStorageKeyIsUsed = !!sessionStorage.getItem(STORAGE_KEY + storageKeyIndex);
    if (!currentStorageKeyIsUsed) {
      storageKeyIndex = 0;
    }

    sessionStorage.removeItem(STORAGE_KEY + storageKeyIndex);

    console.error(`Session storage is full. e.code '${e.code}' e.name ${e.name}`);
    // We expect => e.code == 22 && e.name == 'QuotaExceededError'
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names
  }
}

function _log(args, logType) {
  const log = parseLog(args, logType);
  persist(log);
}

export function log() {
  _log(arguments, LOG_TYPE.log)
}

export function trace() {
  // TODO get the actual stack https://stackoverflow.com/a/6715624/878361
  _log(arguments, LOG_TYPE.trace)
}

export function debug() {
  _log(arguments, LOG_TYPE.debug)
}

export function info() {
  _log(arguments, LOG_TYPE.info)
}

export function warn() {
  _log(arguments, LOG_TYPE.warn)
}

export function error() {
  _log(arguments, LOG_TYPE.error)
}

export function getLogs() {
  const allLogsFromStorage = [];
  for (let i = 0; i < storageMaxKeyIndex; i++) {
    const logsFromStorage = sessionStorage.getItem(STORAGE_KEY + i);
    if (logsFromStorage) {
      allLogsFromStorage.push(logsFromStorage);
    }
  }
  const quotaMessage = quotaExceeded ? `[Session storage quota exceeded, logs may be not ordered by time!]\n` : '';
  const startTimeMessage = `\nStart time: ${startTime}\n`;
  return LONG_VERSION + startTimeMessage + quotaMessage + allLogsFromStorage.join('') + allLogs;
}

export function clearLogs() {
  allLogs = "";
  for (let i = 0; i < storageMaxKeyIndex; i++) {
    sessionStorage.removeItem(STORAGE_KEY + i);
  }
  storageKeyIndex = 0;
  storageMaxKeyIndex = 0;
  quotaExceeded = false;
}

export function interceptConsole() {
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
