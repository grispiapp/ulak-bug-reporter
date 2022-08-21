import {IS_SSR} from "./isSSR";

const TENANT_ID = IS_SSR ? "SSR" : getTenantId();

export default function generateFileName() {
  return `GrispiBugReport_${TENANT_ID}_${new Date().toISOString().split('.')[0]}`;
}

function getTenantId() {
  if (window.location.host.match(/(grispi\.com|grispi\.net|grispi\.dev)/)) {
    return window.location.host.split('.')[0];
  }
  return window.location.host;
}
