import {IS_SSR} from "./isSSR";
import {RETRIEVE_PAYLOAD_REQUEST, RETRIEVE_PAYLOAD_RESPONSE} from "./eventNames";
import {payloadRetrieved} from "./payloadsFromIframes";
import isDebugEnabled from "./isDebugEnabled";
import BugReportButton from "./bug-report-button/bug-report-button";
import send from "./logSender";
import {CONSOLE_LABEL} from "./config";
import {generatePayload, generatePayloadOnlyForThisPage} from "./generatePayload";

function sendDoneCallback(success, message) {
	window.dispatchEvent(new CustomEvent(BugReportButton.SENDING_DONE_EVENT_NAME, {detail: {success, message}}));
}

export default function registerEventHandlers() {
	if (IS_SSR) {
		return;
	}

	window.addEventListener(BugReportButton.SEND_EVENT_NAME, evt => {
		generatePayload(evt.detail.screenshot, evt.detail.message)
			.then(formData => send(sendDoneCallback, formData));
	});

	isDebugEnabled() && console.debug(CONSOLE_LABEL, 'Registering message handler.');
	window.addEventListener("message", async (e) => {
		if (ignoreEvent(e)) {
			return;
		}

		const {origin, source} = e;
		const eventData = e.data;

		if (!isTrusted(origin)) {
			isDebugEnabled() && console.debug(CONSOLE_LABEL, `Event from '${origin}' is not trusted, ignoring...`);
			return;
		}
		if (typeof eventData !== 'object' || typeof eventData.type !== 'string' || eventData.type.length === 0) {
			isDebugEnabled() && console.debug(CONSOLE_LABEL, `Event data from '${origin}' is invalid.`, eventData);
			return;
		}

		const type = eventData.type;

		isDebugEnabled() && console.debug(CONSOLE_LABEL, 'eventHandlers', window.location.href, eventData.type, eventData.data);

		switch (type) {
			case RETRIEVE_PAYLOAD_REQUEST: {
				const response = {
					type: RETRIEVE_PAYLOAD_RESPONSE,
					payload: generatePayloadOnlyForThisPage()
				};
				console.debug(CONSOLE_LABEL, 'Sending RETRIEVE_PAYLOAD_RESPONSE', response);
				source.postMessage(response, origin);
				break;
			}
			case RETRIEVE_PAYLOAD_RESPONSE: {
				payloadRetrieved(eventData.payload);
				break;
			}
			default:
				console.warn(CONSOLE_LABEL, `Invalid event type: '${type}'.`, e);
		}
	});
}

function isTrusted(origin) {
	isDebugEnabled() && console.debug(CONSOLE_LABEL, `Checking if '${origin}' is trusted or not.`);
	return true; // FIXME
}

// @customizationCandidate: function ignoreEvent(e: MessageEvent): boolean
const IGNORE_EVENTS = ['react-devtools-content-script', 'react-devtools-bridge'];
function ignoreEvent(e/*: MessageEvent*/) {
	return IGNORE_EVENTS.includes(e?.data?.source);
}
