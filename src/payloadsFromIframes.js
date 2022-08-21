import {PREPARE_PAYLOAD_REQUEST, RETRIEVE_PAYLOAD_REQUEST} from "./eventNames";

const CONSOLE_LABEL = "Orhun";
const TIMEOUT = 5000;
let counter = 0;
let payloads = [];

function payloadRequested() {
  counter += 1;
  window.orhunDebug && console.debug(CONSOLE_LABEL, 'payloadRequested', counter);
}

function payloadRetrieved(payload) {
  counter -= 1;
  payloads.push(payload);
  window.orhunDebug && console.debug(CONSOLE_LABEL, 'payloadRetrieved', counter);
}

function payloadsReadyOrTimeout() {

  document.querySelectorAll('iframe')
    .forEach(el => {
      el.contentWindow.postMessage({type: RETRIEVE_PAYLOAD_REQUEST}, el.src);
      payloadRequested();
    })

  const requestedAt = new Date().getTime();
  return new Promise((resolve, reject) => {
    const intervalHandler = setInterval(function () {
      const now = new Date().getTime();
      const elapsed = now - requestedAt;
      if (counter === 0 || elapsed > TIMEOUT) {
        window.orhunDebug && console.debug(CONSOLE_LABEL, 'payloadsReadyOrTimeout', 'counter', counter, 'elapsed', elapsed);
        clearInterval(intervalHandler);
        resolve(payloads);
        payloads = [];
        counter = 0;
      }
    }, 500);
  });
}

function preparePayloadForIframes() {
  document.querySelectorAll('iframe') // @customizationCandidate: a function to return iframes
    .forEach(el => {
      try {
        el.contentWindow.postMessage({type: PREPARE_PAYLOAD_REQUEST}, el.src)
      } catch (e) {console.error(CONSOLE_LABEL, 'preparePayloadForIframes', e)}
    })
}

export {preparePayloadForIframes, payloadRetrieved, payloadsReadyOrTimeout}
