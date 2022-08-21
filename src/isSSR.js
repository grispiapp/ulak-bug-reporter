const IS_ON_BROWSER = typeof window === 'object';
const IS_SSR = !IS_ON_BROWSER;
export {IS_SSR, IS_ON_BROWSER}
