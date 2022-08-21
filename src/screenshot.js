import {SCREENSHOT_READY} from "./eventNames";

export default function screenshot() {
  console.log('========================================');
  console.log('============== SCREENSHOT ==============');
  console.log('========================================');

  const options = {
    ignoreElements: el => el.id === "orhunFeedbackButton",
    logging: false
  };



  const promiseResult = new Promise( (resolve, reject) => {
    resolve(null);
  })
    .then(canvas => {
      window.dispatchEvent(new CustomEvent(SCREENSHOT_READY, {detail: canvas}));
      return canvas;
    });

  promiseResult.catch(reason => window.dispatchEvent(new CustomEvent(SCREENSHOT_READY)) )

  return promiseResult;
}
