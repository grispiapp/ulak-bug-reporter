export default function isDebugEnabled() {
  return typeof window?.orhunDebug === 'boolean' && window.orhunDebug;
}
