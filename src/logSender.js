import {clearLogs} from "./consoleInterceptor";
import getToken from "./token";
import t from "./translations";
import downloadFile from "./downloadFile";
import {API_URL, CONSOLE_LABEL, TENANT_ID} from "./config";

/**
 *
 * @param doneCallback function(isSuccess: boolean, message: string)
 * @param fd form data object
 * @returns {Promise<void>}
 */
export default async function send(doneCallback, fd) {

  fetch(`${API_URL}/feedback`, {
    method: 'POST',
    body: fd,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'tenantId': TENANT_ID
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

function handleForManualSending(formData) {
  for (let pair of formData.entries()) {
    if (pair[0] === 'files') {
      downloadFile(pair[1]);
    }
  }
}
