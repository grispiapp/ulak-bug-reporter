import {IS_SSR} from "./isSSR";

export const CONSOLE_LABEL = 'Ulak';

/**
 * http(s)://{host}(:{port})/log-sessions
 * @type {string}
 */
export const SERVER_PATH = 'http://localhost:8080/log-sessions'; //FIXME

let tmpUrl;
const hostname = IS_SSR ? "SSR" : new URL(location.href).hostname
if(hostname.endsWith('grispi.com')){
  tmpUrl = 'https://api.grispi.com';
} else if(hostname.endsWith('grispi.dev')){
  tmpUrl = 'https://api.grispi.dev';
} else {
  tmpUrl = 'http://localhost:8080';
}

export const API_URL = tmpUrl;
export const TENANT_ID = 'dedeler'//window.location.host.split('.')[0];
