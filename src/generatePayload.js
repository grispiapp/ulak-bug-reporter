import generateFileName from "./generateFileName";
import {getLogs} from "./consoleInterceptor";
import isDebugEnabled from "./isDebugEnabled";
import {CONSOLE_LABEL} from "./config";
import {payloadsReadyOrTimeout} from "./payloadsFromIframes";

function calculateMeta() {
  const now = new Date();
  return JSON.stringify({
    url: location.href,
    lang: window.navigator.language,
    userAgent: window.navigator.userAgent,
    // TODO consider switching to 'navigator.userAgentData.platform' when it's fully supported.
    // window.navigator.platform: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
    // navigator.userAgentData.platform: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
    os: window.navigator.platform,
    date: now.toString(),
    epochMs: now.getTime()
  }, null, 2);
}

function getLogsAsBlob(payload) {
  const description = payload.description ? `Description:\n\n${payload.description}\n\n` : '';
  const meta = `Meta:\n\n${payload.meta}\n\n`;
  const cookie = `Cookie:\n\n${payload.cookie}\n\n`;
  const lStorage = `LocalStorage:\n\n${payload.lStorage}\n\n`;
  const sStorage = `SessionStorage:\n\n${payload.sStorage}\n\n`;
  const logs = payload.logs;
  return new Blob([meta, description, cookie, lStorage, sStorage, logs], { type: 'plain/text' });
}

function prepareFormData(payload, iframePayloads) {
  isDebugEnabled() && console.debug(CONSOLE_LABEL, 'payload, iframePayloads', payload, iframePayloads);

  const description = payload.message;
  // We will keep the message in payload object as well so that in offline file download mode
  // the 'description' info is not lost

  const fd = new FormData();
  fd.append('description', description);
  fd.append('meta', payload.meta);

  [payload, iframePayloads].flat().forEach(p => {

    // don't use '.log' extension, chrome shows a scary warning trying to convince end users to discard the downloaded file
    fd.append('files', getLogsAsBlob(p), `${p.fileName}.txt`);

    // screenshotBlob maybe null
    p.screenshot && fd.append('files', p.screenshot, `${p.fileName}_screenshot.png`);
  });

  return fd;
}

export function generatePayloadOnlyForThisPage() {
  const meta = calculateMeta();
  const lStorage = JSON.stringify(localStorage, 0, 2);
  const sStorage = JSON.stringify(sessionStorage, 0, 2);
  const cookie = document.cookie;
  const fileName = generateFileName();
  const logs = getLogs();

  return {
    meta,
    cookie,
    lStorage,
    sStorage,
    logs,
    fileName
  };
}

export function generatePayload(screenshotBlob, message) {

  const payload = generatePayloadOnlyForThisPage();

  payload.message = message;

  if (screenshotBlob) {
    payload.screenshot = screenshotBlob;
  }

  return new Promise((resolve, reject) => {
    payloadsReadyOrTimeout().then(payloads => {
      resolve(prepareFormData(payload, payloads));
    })
      .catch(error => {
        console.error(CONSOLE_LABEL, '[handled] Error occurred while collecting logs from iframes', error);
        resolve(prepareFormData(payload, []));
      });
  });
}
