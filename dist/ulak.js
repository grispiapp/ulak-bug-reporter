var O=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var oe=Object.getOwnPropertyNames;var ne=Object.prototype.hasOwnProperty;var se=(e,n)=>{for(var t in n)O(e,t,{get:n[t],enumerable:!0})},ie=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of oe(n))!ne.call(e,s)&&s!==t&&O(e,s,{get:()=>n[s],enumerable:!(o=te(n,s))||o.enumerable});return e};var re=e=>ie(O({},"__esModule",{value:!0}),e);var Pe={};se(Pe,{clearLogs:()=>x,getLogs:()=>_,interceptConsole:()=>ee});module.exports=re(Pe);var ae="0.1.0",T=`Ulak bug reporter v${ae}`;var h=typeof window=="object",l=!h;var R="ULAK_",F=`${R}AUTH_TOKEN_READY`,N=`${R}RETRIEVE_PAYLOAD_REQUEST`,L=`${R}RETRIEVE_PAYLOAD_RESPONSE`;function d(){return typeof window?.ulakDebug=="boolean"&&window.ulakDebug}var r="Ulak";var v,H=l?"SSR":new URL(location.href).hostname;H.endsWith("grispi.com")?v="https://api.grispi.com":H.endsWith("grispi.dev")?v="https://api.grispi.dev":v="http://localhost:8080";var Y=v,j="dedeler";var ce=1700,m=0,I=[];function le(){m+=1,d()&&console.debug(r,"payloadRequested",m)}function G(e){m-=1,I.push(e),d()&&console.debug(r,"payloadRetrieved",m)}function q(){document.querySelectorAll("iframe").forEach(n=>{n.contentWindow.postMessage({type:N},n.src),le()});let e=Date.now();return new Promise((n,t)=>{let o=setInterval(function(){let s=Date.now()-e;(m===0||s>ce)&&(d()&&console.debug(r,"payloadsReadyOrTimeout","counter",m,"elapsed",s),clearInterval(o),n(I),I=[],m=0)},500)})}var z;if(typeof window<"u"){class e extends window.HTMLElement{static#l=`
        <style>
          #canvas, #video {
            display: none;
          }
        </style>
        <video id="video">Video stream not available.</video>
        <canvas id="canvas"></canvas>
        <button id="startButton"></button>
      `;#a;#c;#n;#o;#t;#e;#s;#i;#r;constructor(){super(),this.attachShadow({mode:"open"}).innerHTML=e.#l}connectedCallback(){this.#a=this.attributes.getNamedItem("text")?.value||"Take screenshot",this.#c=!!this.attributes.getNamedItem("use-computed-style"),this.#i=this.attributes.getNamedItem("use-computed-style")?.value?.trim().toLowerCase()==="remove",this.#n=this.attributes.getNamedItem("timeout")?.value||"500",this.#o=this.attributes.getNamedItem("preview-scale")?.value||"0.5",this.#r={timeout:this.#n,isFromInternalEvent:!0},this.#t=this.shadowRoot.getElementById("video"),this.#e=this.shadowRoot.getElementById("canvas");let t=this.shadowRoot.getElementById("startButton");if(t.addEventListener("click",this.takeScreenshot.bind(this,this.#r),!1),t.innerText=this.#a,this.#c){let o=window.getComputedStyle(this);Array.from(o).forEach(s=>t.style.setProperty(s,o.getPropertyValue(s),o.getPropertyPriority(s))),this.#i&&(this.removeAttribute("class"),this.removeAttribute("style"))}}#d(){return document.querySelector(this.attributes.getNamedItem("preview-target")?.value)}takeScreenshot(t){let o=t&&t.isFromInternalEvent===!0,s=t?.timeout||this.#r.timeout;return new Promise((c,y)=>{navigator.mediaDevices.getDisplayMedia({video:{cursor:"always",displaySurface:"monitor"},audio:!1}).then(g=>{this.#t.srcObject=g,this.#t.play(),setTimeout(()=>{let p=g.getVideoTracks()[0].getSettings();this.#e.setAttribute("width",p.width),this.#e.setAttribute("height",p.height),this.#e.getContext("2d").drawImage(this.#t,0,0,this.#e.width,this.#e.height),this.#e.toBlob(i=>{this.#s=i,c(i)});let a=this.#d();o&&a instanceof HTMLImageElement&&(a.src=this.#e.toDataURL("image/png"),a.width=this.#e.width*this.#o,a.height=this.#e.height*this.#o),this.#t.srcObject.getTracks().forEach(i=>i.stop()),this.#t.srcObject=null},s)}).catch(g=>{console.error(`An error occurred: ${g}`),y(g)})})}static instance(){return document.querySelector("screenshot-button")}}window.customElements.define("screenshot-button",e),z=e}else{class e{static instance(){return document.querySelector("screenshot-button")}}z=e}var A;if(typeof window<"u"){let e="(Optional) Message or bug description",n="Send",t="Sending...",o="Cancel",s="Error",c="(TIMEOUT) Sending might not be successful, time out occurred!",y="10000",g="https://i.imgur.com/MXRT775.png";class p extends window.HTMLElement{static SEND_EVENT_NAME="BugReportButton:Send";static SENDING_DONE_EVENT_NAME="BugReportButton:SendingDone";static#l=`
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
        #popup {
          z-index: 1;
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
                <textarea id="message" rows="5" placeholder="${e}"></textarea>
                <div style=" text-align: center; ">
                  <button id="cancelBtn">${o}</button>
                  <button id="sendBtn" style=" font-weight: bold; ">${n}</button>
                </div>
              </div>
          </main>
        </section>
      `;#a;#c;#n;#o;#t;#e;#s;#i;#r;constructor(){super();let a=this.attributes.getNamedItem("text")?.value||"Bug Report";this.#i=this.attributes.getNamedItem("send-timeout")?.value||y;let i=this.attachShadow({mode:"open"});i.innerHTML=p.#l;let u=i.getElementById("actionBtn");u.innerText=a,u.onclick=this.#d.bind(this),this.#a=i.querySelector("screenshot-button"),this.#c=i.getElementById("preview"),this.#n=i.getElementById("captureErrorMsg"),this.#o=i.getElementById("popup"),this.#s=i.getElementById("sendBtn"),this.#e=i.querySelector("textarea");let S=this.#p.bind(this);i.getElementById("closeBtn").onclick=S,i.getElementById("cancelBtn").onclick=S,this.#s.onclick=this.#g.bind(this),window.addEventListener(p.SENDING_DONE_EVENT_NAME,this.#m.bind(this))}#d(){this.#a.takeScreenshot().then(a=>{this.#u(a),this.#t=a}).catch(a=>{console.error("bug-report-button:",a),this.#u(null,a)})}#u(a,i){let u=this.#c;u.removeAttribute("width"),u.onload=null,a?(u.src=URL.createObjectURL(a),u.onload=()=>{u.width=u.width*.4}):(u.src=g,this.#n.innerText=`${s}: ${i}`),this.#o.style.display="block"}#p(){this.#o.style.display="none",this.#n.innerText="",this.#t=null}#g(){let a={screenshot:this.#t,message:this.#e.value};window.dispatchEvent(new CustomEvent(p.SEND_EVENT_NAME,{detail:a})),this.#h()}#m(a){clearTimeout(this.#r);let i=a.detail;this.#f(i?.message,i?.success,i?.keepPopupOpenOnSuccess)}#h(){this.#s.innerText=t,this.shadowRoot.querySelectorAll("button, textarea").forEach(a=>a.disabled=!0),this.#i>0&&(this.#r=setTimeout(()=>{window.dispatchEvent(new CustomEvent(p.SENDING_DONE_EVENT_NAME,{detail:{message:c}}))},this.#i))}#f(a,i,u){this.shadowRoot.querySelectorAll("button, textarea").forEach(S=>S.disabled=!1),this.#s.innerText=n,i===!0&&u!==!0&&this.#p()}}window.customElements.define("bug-report-button",p),A=p}else{class e{static SEND_EVENT_NAME="BugReportButton:Send";static SENDING_DONE_EVENT_NAME="BugReportButton:SendingDone"}A=e}var k=A;var de={feedbackButtonText:"Hata bildir",sendBtnText:"Hatay\u0131 G\xF6nder",sendBtnLoading:"L\xFCtfen bekleyiniz...",successMessage:"Hata kayd\u0131n\u0131z (TICKET_KEY) g\xF6nderildi. Te\u015Fekk\xFCr ederiz.",sendErrorMessage:`Hata kayd\u0131n\u0131z g\xF6nderilemedi!
L\xFCtfen bu mesaj\u0131 kapatt\u0131ktan sonra indirilen log dosyas\u0131n\u0131 yetkililere kendiniz iletin.`,close:"Kapat",cancel:"\u0130ptal",descPlaceholder:"Hata hakk\u0131nda a\xE7\u0131klama (\u0130ste\u011Fe ba\u011Fl\u0131)",authTokenNotFound:"Eri\u015Fim token'\u0131 bulunamad\u0131!",loadingScreenshot:"Ekran g\xF6r\xFCnt\xFCs\xFC y\xFCkleniyor, l\xFCtfen bekleyiniz..."},ue={feedbackButtonText:"Report a bug",sendBtnText:"Send bug report",sendBtnLoading:"Please wait...",successMessage:"Your bug report (TICKET_KEY) is sent. Thank you.",sendErrorMessage:`Could not send bug report!
Please send the log file that will be downloaded after closing this message to site admin yourself.`,close:"Close",cancel:"Cancel",descPlaceholder:"Optional description of the bug",authTokenNotFound:"Access token not available!",loadingScreenshot:"Loading screenshot, please wait..."},pe={tr:de,en:ue};function ge(e,n){let t=pe.tr[e];return t?n?Object.keys(n).reduce((o,s)=>o.replace(s,n[s]),t):t:`{??${e}??}`}var f=ge;var B=null;function D(){if(B)return B;console.error(r,"authTokenNotFound"),alert(f("authTokenNotFound"))}h&&window.addEventListener(F,e=>{B=e.detail});function P(e){let n=URL.createObjectURL(e),t=document.createElement("a");t.setAttribute("href",n),t.setAttribute("download",e.name),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}async function M(e,n){fetch(`${Y}/feedback`,{method:"POST",body:n,headers:{Authorization:`Bearer ${D()}`,tenantId:j}}).then(function(t){if(t.status!==200){console.error(r,"Error in response. Response:",t),K(n),e(!1,f("sendErrorMessage"));return}t.text().then(function(o){x(),e(!0,f("successMessage",{TICKET_KEY:o}))})}).catch(function(t){console.error(r,"Fetch Error",t),K(n),e(!1,f("sendErrorMessage"))})}function K(e){for(let n of e.entries())n[0]==="files"&&P(n[1])}var me=l?"SSR":he();function C(){return`GrispiBugReport_${me}_${new Date().toISOString().split(".")[0]}`}function he(){return window.location.host.match(/(grispi\.com|grispi\.net|grispi\.dev)/)?window.location.host.split(".")[0]:window.location.host}function fe(){let e=new Date;return JSON.stringify({url:location.href,lang:window.navigator.language,userAgent:window.navigator.userAgent,os:window.navigator.platform,date:e.toString(),epochMs:e.getTime()},null,2)}function Ee(e){let n=e.description?`Description:

${e.description}

`:"",t=`Meta:

${e.meta}

`,o=`Cookie:

${e.cookie}

`,s=`LocalStorage:

${e.lStorage}

`,c=`SessionStorage:

${e.sStorage}

`,y=e.logs;return new Blob([t,n,o,s,c,y],{type:"plain/text"})}function W(e,n){d()&&console.debug(r,"payload, iframePayloads",e,n);let t=e.message,o=new FormData;return o.append("description",t),o.append("meta",e.meta),[e,n].flat().forEach(s=>{o.append("files",Ee(s),`${s.fileName}.txt`),s.screenshot&&o.append("files",s.screenshot,`${s.fileName}_screenshot.png`)}),o}function V(){let e=fe(),n=JSON.stringify(localStorage,0,2),t=JSON.stringify(sessionStorage,0,2),o=document.cookie,s=C(),c=_();return{meta:e,cookie:o,lStorage:n,sStorage:t,logs:c,fileName:s}}function J(e,n){let t=V();return t.message=n,e&&(t.screenshot=e),new Promise((o,s)=>{q().then(c=>{o(W(t,c))}).catch(c=>{console.error(r,"[handled] Error occurred while collecting logs from iframes",c),o(W(t,[]))})})}function we(e,n){window.dispatchEvent(new CustomEvent(k.SENDING_DONE_EVENT_NAME,{detail:{success:e,message:n}}))}function $(){l||(window.addEventListener(k.SEND_EVENT_NAME,e=>{J(e.detail.screenshot,e.detail.message).then(n=>M(we,n))}),d()&&console.debug(r,"Registering message handler."),window.addEventListener("message",async e=>{if(Se(e))return;let{origin:n,source:t}=e,o=e.data;if(!be(n)){d()&&console.debug(r,`Event from '${n}' is not trusted, ignoring...`);return}if(typeof o!="object"||typeof o.type!="string"||o.type.length===0){d()&&console.debug(r,`Event data from '${n}' is invalid.`,o);return}let s=o.type;switch(d()&&console.debug(r,"eventHandlers",window.location.href,o.type,o.data),s){case N:{let c={type:L,payload:V()};console.debug(r,"Sending RETRIEVE_PAYLOAD_RESPONSE",c),t.postMessage(c,n);break}case L:{G(o.payload);break}default:console.warn(r,`Invalid event type: '${s}'.`,e)}}))}function be(e){return d()&&console.debug(r,`Checking if '${e}' is trusted or not.`),!0}var ye=["react-devtools-content-script","react-devtools-bridge"];function Se(e){return ye.includes(e?.data?.source)}var E=function(){},w={trace:"T",debug:"D",log:"L",info:"I",warn:"W",error:"E"},Te=l?E:console.log.bind(window.console),Ne=l?E:console.trace.bind(window.console),ve=l?E:console.debug.bind(window.console),xe=l?E:console.info.bind(window.console),Q=l?E:console.warn.bind(window.console),_e=l?E:console.error.bind(window.console),Z=Date.now(),U="",X=!1;$();function Oe(e,n){let t=[Date.now()-Z,n];for(let o of e)typeof o>"u"?t.push("undefined"):typeof o=="object"?o instanceof Error?t.push(o.stack||o.toString()):t.push(JSON.stringify(o)):typeof o=="boolean"||typeof o=="number"||typeof o=="bigint"||typeof o=="string"||typeof o=="symbol"?t.push(o):typeof o=="function"?t.push(`[Function ${o.name}]`):t.push(`[Unrecognized type ${o}]`);return t.join(" ")}function Re(e){U+=`
`+e}function b(e,n){let t=Oe(e,n);Re(t)}function Le(){b(arguments,w.log)}function Ie(){b(arguments,w.trace)}function Ae(){b(arguments,w.debug)}function ke(){b(arguments,w.info)}function Be(){b(arguments,w.warn)}function De(){b(arguments,w.error)}function _(){let e=`
Start time: ${Z}
`;return T+e+U}function x(){U=""}function ee(){if(!h){console.debug(r,"Not on browser, ignoring...");return}!X&&h?(window.console.log=function(){Te.apply(window.console,arguments),Le.apply(null,arguments)},window.console.trace=function(){Ne.apply(window.console,arguments),Ie.apply(null,arguments)},window.console.debug=function(){ve.apply(window.console,arguments),Ae.apply(null,arguments)},window.console.info=function(){xe.apply(window.console,arguments),ke.apply(null,arguments)},window.console.warn=function(){Q.apply(window.console,arguments),Be.apply(null,arguments)},window.console.error=function(){_e.apply(window.console,arguments),De.apply(null,arguments)},X=!0):Q(r,"Console is already intercepted!")}console.info(T);
//# sourceMappingURL=ulak.js.map
