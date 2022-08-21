import takeScreenshot from './screenshot.js';
import {getLogs, STORAGE_KEY} from "./consoleInterceptor";
import generateFileName from "./generateFileName";

let logsReadyPromise = null;
let payload = null;

export function preparePayload() {
  // Prepare payload for this page
  logsReadyPromise = new Promise((resolve, reject) => {

    const meta = calculateMeta();
    const lStorage = JSON.stringify(localStorage, 0, 2);
    const sStorage = serializeSessionStorageWithoutOrhunData();
    const cookie = document.cookie;
    const fileName = generateFileName();

    takeScreenshot()
      .then(function (canvas) {
        // take SS before calling getLogs() so that we can see SS related errors if any
        const logs = getLogs();
        canvas.toBlob(screenshotBlob => {
          payload = {
            meta,
            cookie,
            lStorage,
            sStorage,
            logs,
            screenshot: screenshotBlob,
            fileName
          };
          resolve(payload);
        });
      })
      .catch(reason => reject(`Cannot take screenshot. Reason: '${reason}'.`));
  });
}

export function getPayload() {
  if (logsReadyPromise == null) {
    throw new Error("Illegal state: 'getPayload()' is called before 'preparePayload()'!");
  }
  return logsReadyPromise;
}

// ==================== PRIVATE FUNCTIONS ====================

function serializeSessionStorageWithoutOrhunData() {
  const sStorageClone = JSON.parse(JSON.stringify(sessionStorage));
  Object.keys(sessionStorage).filter(key => key.startsWith(STORAGE_KEY)).forEach(key => delete sStorageClone[key]);
  return JSON.stringify(sStorageClone, 0, 2);
}

function calculateMeta() {
  const now = new Date();
  return JSON.stringify({
    url: location.href,
    lang: window.navigator.language,
    userAgent: window.navigator.userAgent,
    os: window.navigator.platform, //FIXME consider switching to 'navigator.userAgentData.platform' when it's fully supported. https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
    date: now.toString(),
    epochMs: now.getTime()
  }, null, 2);
}
