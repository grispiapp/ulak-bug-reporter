import {RETRIEVE_PAYLOAD_REQUEST} from "./eventNames";
import isDebugEnabled from "./isDebugEnabled";
import {CONSOLE_LABEL} from "./config";

const TIMEOUT = 1700; // More than enough to try 3 times (interval timeout is 500)
let counter = 0;
let payloads = [];

function payloadRequested() {
  counter += 1;
  isDebugEnabled() && console.debug(CONSOLE_LABEL, 'payloadRequested', counter);
}

function payloadRetrieved(payload) {
  counter -= 1;
  payloads.push(payload);
  isDebugEnabled() && console.debug(CONSOLE_LABEL, 'payloadRetrieved', counter);
}

function payloadsReadyOrTimeout() {

  document.querySelectorAll('iframe')
    .forEach(el => {
      el.contentWindow.postMessage({type: RETRIEVE_PAYLOAD_REQUEST}, el.src);
      payloadRequested();
    });

  const requestedAt = Date.now();
  return new Promise((resolve, reject) => {
    const intervalHandler = setInterval(function () {
      const elapsed = Date.now() - requestedAt;
      if (counter === 0 || elapsed > TIMEOUT) {
        isDebugEnabled() && console.debug(CONSOLE_LABEL, 'payloadsReadyOrTimeout', 'counter', counter, 'elapsed', elapsed);
        clearInterval(intervalHandler);
        resolve(payloads);
        payloads = [];
        counter = 0;
      }
    }, 500);
  });
}

export {payloadRetrieved, payloadsReadyOrTimeout}
