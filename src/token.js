import {IS_ON_BROWSER} from "./isSSR";
import t from "./translations";
import {AUTH_TOKEN_READY_EVENT} from "./eventNames";
import {CONSOLE_LABEL} from "./config";

let token = null;

export default function getToken() {
	if (token) {
		return token;
	}
	console.error(CONSOLE_LABEL, 'authTokenNotFound');
	alert(t('authTokenNotFound'));
}

if (IS_ON_BROWSER) {
	window.addEventListener(AUTH_TOKEN_READY_EVENT, e => {
		token = e.detail;
	});
}
