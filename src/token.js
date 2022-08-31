import {IS_ON_BROWSER} from "./isSSR";
import t from "./translations";
import {AUTH_TOKEN_READY_EVENT_NAME} from "./eventNames";

let token = null;

export default function getToken() {
	if (token) {
		return token;
	}
	alert(t('authTokenNotFound'));
}

if (IS_ON_BROWSER) {
	window.addEventListener(AUTH_TOKEN_READY_EVENT_NAME, e => {
		token = e.detail;
	});
}
