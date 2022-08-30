import ScreenshotButton from "../screenshot-button/screenshot-button";

const textareaPlaceholderText = '(Optional) Message or bug description';
const sendButtonText = 'Send';
const sendButtonLoadingText = 'Sending...';
const cancelText = 'Cancel';
const errorText = 'Error';
const timeoutErrorMessage = '(TIMEOUT) Sending might not be successful, time out occurred!';

const sendTimeoutDefault = '10000';
const noPermitScreenCaptureImgUrl = 'https://i.imgur.com/MXRT775.png';

export default class BugReportButton extends HTMLElement {

  static SEND_EVENT_NAME = 'BugReportButton:Send'

  static SENDING_DONE_EVENT_NAME = 'BugReportButton:SendingDone'

  static #htmlContent = `
  			<style>
  			  button {
  			    cursor: pointer;
  			  }
  			  button:disabled {
  			    pointer-events: none;
  			    opacity: 0.3;
  			  }
  			  section {
  			    backdrop-filter: blur(3px);
            bottom: 0;
            display: none;
            height: auto;
            left: 0;
            padding: 50px;
            position: fixed;
            right: 0;
            top: 0;
            overflow: auto;
            width: auto;
  			  }
  			  header {
  			      text-align: right;
  			  }
  			  main {
            background: #f7f7f7;
            border-radius: 3px;
            border: 1px solid #b3adad;
            min-height: 600px;
            min-width: 600px;
            padding: 1% 10%;
            position: relative;
  			  }
  			  main > div {
            display: flex;
            flex-direction: column;
  			  }
  			  screenshot-button {
  			    display: none;
  			  }
  			  textarea {
  			      margin: 20px auto;
  			      min-width: 600px;
  			  }
          #closeBtn {
            background: none;
            border: 0;
            color: #555;
            font-family: sans-serif;
            font-size: 1.2rem;
            position: absolute;
            right: 20px;
          }
          #closeBtn:hover {
            color: #000;
          }
        	#actionBtn {
            background-color: lightgray;
            border-radius: 5px;
            border: 1px solid #333;
            color: #333;
            display: flex;
            font-family: sans-serif;
            font-size: 13pt;
            height: 30px;
            justify-content: center;
            padding-top: 3px;
            position: fixed;
            right: -65px;
            top: 50%;
            transform: rotate(-90deg);
            min-width: 150px;
        }
        #cancelBtn, #sendBtn {
          background: #f7f7f7;
          border-radius: 3px;
          border: 1px solid #b3adad;
          color: #333;
          padding: 10px 20px;
        }
        #cancelBtn:hover, #sendBtn:hover {
          background: #eee;
        }
        #captureErrorMsg {
          text-align: center;
          color: darkred;
        }
        #preview {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        </style>
        <screenshot-button></screenshot-button>
        <button id="actionBtn"></button>
        <section id="popup">
          <main>
            <button id="closeBtn">X</button>
            <div>
                <img id="preview" src="" alt="Screenshot preview"/>
                <em id="captureErrorMsg"></em>
                <textarea id="message" rows="5" placeholder="${textareaPlaceholderText}"></textarea>
                <div style=" text-align: center; ">
                  <button id="cancelBtn">${cancelText}</button>
                  <button id="sendBtn" style=" font-weight: bold; ">${sendButtonText}</button>
                </div>
              </div>
          </main>
        </section>
      `;

  #screenshotButton;
  #previewImg;
  #captureErrorMsg;
  #popup;
  #screenshotAsBlob;
  #textarea;
  #sendBtn;
  #sendTimeout;
  #sendTimeoutHandle;

  constructor() {
    super();

    const text = this.attributes.getNamedItem('text')?.value || 'Bug Report';
    this.#sendTimeout = this.attributes.getNamedItem('send-timeout')?.value || sendTimeoutDefault;

    const shadowDom = this.attachShadow({
      mode: 'open'
    });
    shadowDom.innerHTML = BugReportButton.#htmlContent;
    const button = shadowDom.getElementById('actionBtn');
    button.innerText = text;
    button.onclick = this.#clickCallback.bind(this);

    this.#screenshotButton = shadowDom.querySelector('screenshot-button');
    this.#previewImg = shadowDom.getElementById('preview');
    this.#captureErrorMsg = shadowDom.getElementById('captureErrorMsg');
    this.#popup = shadowDom.getElementById('popup');
    this.#sendBtn = shadowDom.getElementById('sendBtn');
    this.#textarea = shadowDom.querySelector('textarea');
    const closePopupFn = this.#hidePopup.bind(this);
    shadowDom.getElementById('closeBtn').onclick = closePopupFn;
    shadowDom.getElementById('cancelBtn').onclick = closePopupFn;

    this.#sendBtn.onclick = this.#send.bind(this);
    window.addEventListener(BugReportButton.SENDING_DONE_EVENT_NAME, this.#sendingDone.bind(this));
  }

  #clickCallback() {
    this.#screenshotButton
      .takeScreenshot()
      .then(blob => {
        this.#showPopup(blob);
        this.#screenshotAsBlob = blob;
      })
      .catch(e => {
        this.#showPopup(null, e);
      });
  }

  #showPopup(blob, error) {
    const imgEl = this.#previewImg;
    imgEl.removeAttribute('width');
    imgEl.onload = null;

    if (blob) {
      imgEl.src = URL.createObjectURL(blob);
      imgEl.onload = () => {
        imgEl.width = imgEl.width * 0.4;
      };
    } else {
      imgEl.src = noPermitScreenCaptureImgUrl;
      this.#captureErrorMsg.innerText = `${errorText}: ${error}`;
    }

    this.#popup.style.display = 'block';
  }

  #hidePopup() {
    this.#popup.style.display = 'none';
    this.#captureErrorMsg.innerText = '';
    this.#screenshotAsBlob = null;
  }

  #send() {
    const payload = {
      screenshot: this.#screenshotAsBlob,
      message: this.#textarea.value
    };
    window.dispatchEvent(new CustomEvent(BugReportButton.SEND_EVENT_NAME, {detail: payload}));
    this.#startLoading();
  }

  #sendingDone(e) {
    clearTimeout(this.#sendTimeoutHandle);
    const eventDetail = e.detail;
    this.#endLoading(eventDetail?.message, eventDetail?.success, eventDetail?.keepPopupOpenOnSuccess);
  }

  #startLoading() {
    this.#sendBtn.innerText = sendButtonLoadingText;
    this.shadowRoot.querySelectorAll('button, textarea').forEach(el => el.disabled = true);

    if (this.#sendTimeout > 0) {
      this.#sendTimeoutHandle = setTimeout(() => {
        window.dispatchEvent(new CustomEvent(BugReportButton.SENDING_DONE_EVENT_NAME, {detail: {message: timeoutErrorMessage}}))
      }, this.#sendTimeout);
    }
  }

  #endLoading(message, success, keepPopupOpenOnSuccess) {
    this.shadowRoot.querySelectorAll('button, textarea').forEach(el => el.disabled = false);
    this.#sendBtn.innerText = sendButtonText;

    if (success === true && keepPopupOpenOnSuccess !== true) {
      this.#hidePopup();
    }
  }

}

window.customElements.define('bug-report-button', BugReportButton);
