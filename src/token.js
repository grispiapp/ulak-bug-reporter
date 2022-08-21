import {IS_ON_BROWSER} from "./isSSR";
import t from "./translations";
import {AUTH_TOKEN_READY} from "./eventNames";

const CONSOLE_LABEL = "Orhun";
let token = null;

export default function getToken() {
	if (IS_ON_BROWSER && window.grispiToken) {
		console.warn(`'window.grispiToken' is deprecated! Use '${AUTH_TOKEN_READY}' event to pass authorization token to Orhun Logger.`)
		return window.grispiToken;
	}
	if (token) {
		return token;
	}
	alert(t('authTokenNotFound'));
}

if (IS_ON_BROWSER) {
	window.addEventListener(AUTH_TOKEN_READY, e => {
		const tokenFromEvent = e.detail;
		if (typeof tokenFromEvent !== 'string' || tokenFromEvent.trim().length === 0) {
			console.error(CONSOLE_LABEL, `Invalid token sent via '${AUTH_TOKEN_READY}'. token: '${tokenFromEvent}'.`);
			return;
		}
		token = tokenFromEvent;
	});
}
