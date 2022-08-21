import {IS_SSR} from "./isSSR";
import {PREPARE_PAYLOAD_REQUEST, RETRIEVE_PAYLOAD_REQUEST, RETRIEVE_PAYLOAD_RESPONSE} from "./eventNames";
import {preparePayload, getPayload} from "./preparePayload";
import {payloadRetrieved} from "./payloadsFromIframes";
import isDebugEnabled from "./isDebugEnabled";
import BugReportButton from "./bug-report-button/bug-report-button";

const CONSOLE_LABEL = "Orhun";

export default function registerEventHandlers() {
	if (IS_SSR) {
		return;
	}

	isDebugEnabled() && console.debug(CONSOLE_LABEL, 'Registering message handler.');
	window.addEventListener("message", async (e) => {
		const origin = e.origin;
		const source = e.source;
		const eventData = e.data;

		if (ignoreEvent(e)) {
			return;
		}

		if (isNotTrusted(origin)) {
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
			case PREPARE_PAYLOAD_REQUEST: {
				preparePayload();
				break;
			}
			case RETRIEVE_PAYLOAD_REQUEST: {
				const response = {
					type: RETRIEVE_PAYLOAD_RESPONSE,
					payload: await getPayload()
				};
				console.log('response.payload.screenshot', response.payload.screenshot)
				source.postMessage(response, origin);
				break;
			}
			case RETRIEVE_PAYLOAD_RESPONSE: {
				payloadRetrieved(eventData.payload);
				break;
			}
			default:
				isDebugEnabled() && console.debug(CONSOLE_LABEL, `Invalid event type: '${type}'.`);
		}
	});
}

function isNotTrusted(origin) { // @customizationCandidate: function isTrusted(origin: string): boolean
	isDebugEnabled() && console.debug(CONSOLE_LABEL, `Checking if '${origin}' is trusted or not.`);
	return false; // FIXME
}

// @customizationCandidate: function ignoreEvent(e: MessageEvent): boolean
const IGNORE_EVENTS = ['react-devtools-content-script', 'react-devtools-bridge'];
function ignoreEvent(e/*: MessageEvent*/) {
	return IGNORE_EVENTS.includes(e?.data?.source);
}
