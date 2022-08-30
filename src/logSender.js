import {clearLogs} from "./consoleInterceptor";
import getToken from "./token";
import t from "./translations";
import downloadFile from "./downloadFile";
import {IS_SSR} from "./isSSR";
import {payloadsReadyOrTimeout} from "./payloadsFromIframes";
import {getPayload} from "./preparePayload";
import isDebugEnabled from "./isDebugEnabled";

const CONSOLE_LABEL = "Ulak";
const hostname = IS_SSR ? "SSR" : new URL(location.href).hostname

let API_URL;
if(hostname.endsWith('grispi.com')){
  API_URL = 'https://api.grispi.com';
} else if(hostname.endsWith('grispi.dev')){
  API_URL = 'https://api.grispi.dev';
} else {
  API_URL = 'http://localhost:8080';
}

export default async function send(doneCallback) {

  const payloadsFromIframesPromise = payloadsReadyOrTimeout();
  const payloadPromise = getPayload();
  const allPayloadsResults = await Promise.allSettled([payloadsFromIframesPromise, payloadPromise]);
  console.log('allPayloadsResults', allPayloadsResults)
  const successfulResults = allPayloadsResults.filter(r => r.status === 'fulfilled')
  const iframePayloads = successfulResults.filter(r => Array.isArray(r.value)).flatMap(r => r.value);
  const payload = successfulResults.find(r => !Array.isArray(r.value)).value;

  const fd = prepareFormData(payload, iframePayloads);

  fetch(`${API_URL}/feedback`, {
    method: 'POST',
    body: fd,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'tenantId': 'dedeler'//FIXME window.location.host.split('.')[0]
    }
  })
    .then(
      function (response) {
        if (response.status !== 200) {
          console.error(CONSOLE_LABEL, 'Error in response. Response:', response);

          // This doesn't seem to work correctly on forms that have multiple fields with same name but we don't have such a case
          // https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json#comment102116212_55874235
          handleForManualSending(fd);
          doneCallback(false, t('sendErrorMessage'));
          return;
        }

        response.text().then(function (text) {
          clearLogs();
          doneCallback(true, t('successMessage', {TICKET_KEY: text}));
        });
      })
    .catch(function (err) {
      console.error(CONSOLE_LABEL, 'Fetch Error', err);
      handleForManualSending(fd);
      doneCallback(false, t('sendErrorMessage'));
    });
  // end of fetch
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

function handleForManualSending(formData) {
  for (let pair of formData.entries()) {
    if (pair[0] === 'files') {
      downloadFile(pair[1]);
    }
  }
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
