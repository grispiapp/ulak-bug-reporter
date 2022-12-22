import {CONSOLE_LABEL, SERVER_PATH} from "./config";

// SSK: SESSION_STORAGE_KEY
const SESSION_ID_SSK = 'ulakSessionId';
const SESSION_CREATION_TIME_SSK = 'ulakSessionCreatedAt';

let _logSessionId = null;

export function ensureLogSession() {
  const logSessionId = sessionStorage.getItem(SESSION_ID_SSK);
  if (logSessionId === null) {
    fetch(SERVER_PATH, {method: 'post'})
      .then(response => {
        if (!response.ok) {
          console.error(CONSOLE_LABEL, 'Log session cannot be acquired.', response.status, response.statusText, response);
        }
        return response.json();
      })
      .then(data => {
        console.debug(CONSOLE_LABEL, 'New log session id is acquired', data);
        _logSessionId = data;
        sessionStorage.setItem(SESSION_ID_SSK, data);
        sessionStorage.setItem(SESSION_CREATION_TIME_SSK, Date.now());
      })
  } else {
    fetch(`${SERVER_PATH}/${logSessionId}/ensure`, {method: 'post'})
      .then(response => {
        if (!response.ok) {
          console.error(CONSOLE_LABEL, `Log session ${logSessionId} cannot be acquired.`, response.status, response.statusText, response);
        }
      })
  }
}

export function logSessionId() {
  return _logSessionId;
}
