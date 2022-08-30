export default function isDebugEnabled() {
  return typeof window?.ulakDebug === 'boolean' && window.ulakDebug;
}
