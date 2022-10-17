var U=Object.defineProperty;var pe=Object.getOwnPropertyDescriptor;var ge=Object.getOwnPropertyNames;var me=Object.prototype.hasOwnProperty;var fe=(e,t)=>{for(var n in t)U(e,n,{get:t[n],enumerable:!0})},he=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ge(t))!me.call(e,s)&&s!==n&&U(e,s,{get:()=>t[s],enumerable:!(o=pe(t,s))||o.enumerable});return e};var Ee=e=>he(U({},"__esModule",{value:!0}),e);var qe={};fe(qe,{clearLogs:()=>M,getLogs:()=>P,interceptConsole:()=>ue});module.exports=Ee(qe);var we="0.0.13",_=`Ulak bug reporter v${we}`;var x=typeof window=="object",u=!x;var I="ULAK_",ee=`${I}AUTH_TOKEN_READY`,O=`${I}PREPARE_PAYLOAD_REQUEST`,A=`${I}RETRIEVE_PAYLOAD_REQUEST`,C=`${I}RETRIEVE_PAYLOAD_RESPONSE`;var ye=u?"SSR":be();function $(){return`GrispiBugReport_${ye}_${new Date().toISOString().split(".")[0]}`}function be(){return window.location.host.match(/(grispi\.com|grispi\.net|grispi\.dev)/)?window.location.host.split(".")[0]:window.location.host}var k=null,V=null;function F(e,t){return k=new Promise((n,o)=>{let s=Te(),l=JSON.stringify(localStorage,0,2),g=Se(),d=document.cookie,r=$(),R=P();V={meta:s,cookie:d,lStorage:l,sStorage:g,logs:R,fileName:r,message:t},e&&(V.screenshot=e),n(V)}),k}function L(){if(k==null)throw new Error("Illegal state: 'getPayload()' is called before 'preparePayload()'!");return k}function Se(){let e=JSON.parse(JSON.stringify(sessionStorage));return Object.keys(sessionStorage).filter(t=>t.startsWith(m)).forEach(t=>delete e[t]),JSON.stringify(e,0,2)}function Te(){let e=new Date;return JSON.stringify({url:location.href,lang:window.navigator.language,userAgent:window.navigator.userAgent,os:window.navigator.platform,date:e.toString(),epochMs:e.getTime()},null,2)}function c(){return typeof window?.ulakDebug=="boolean"&&window.ulakDebug}var B="Ulak",xe=5e3,f=0,Y=[];function ve(){f+=1,c()&&console.debug(B,"payloadRequested",f)}function te(e){f-=1,Y.push(e),c()&&console.debug(B,"payloadRetrieved",f)}function oe(){document.querySelectorAll("iframe").forEach(t=>{t.contentWindow.postMessage({type:A},t.src),ve()});let e=new Date().getTime();return new Promise((t,n)=>{let o=setInterval(function(){let l=new Date().getTime()-e;(f===0||l>xe)&&(c()&&console.debug(B,"payloadsReadyOrTimeout","counter",f,"elapsed",l),clearInterval(o),t(Y),Y=[],f=0)},500)})}function ne(){document.querySelectorAll("iframe").forEach(e=>{try{e.contentWindow.postMessage({type:O},e.src)}catch(t){console.error(B,"preparePayloadForIframes",t)}})}var se;if(typeof window<"u"){class e extends window.HTMLElement{static#c=`
        <style>
          #canvas, #video {
            display: none;
          }
        </style>
        <video id="video">Video stream not available.</video>
        <canvas id="canvas"></canvas>
        <button id="startButton"></button>
      `;#a;#l;#n;#o;#t;#e;#s;#r;#i;constructor(){super(),this.attachShadow({mode:"open"}).innerHTML=e.#c}connectedCallback(){this.#a=this.attributes.getNamedItem("text")?.value||"Take screenshot",this.#l=!!this.attributes.getNamedItem("use-computed-style"),this.#r=this.attributes.getNamedItem("use-computed-style")?.value?.trim().toLowerCase()==="remove",this.#n=this.attributes.getNamedItem("timeout")?.value||"500",this.#o=this.attributes.getNamedItem("preview-scale")?.value||"0.5",this.#i={timeout:this.#n,isFromInternalEvent:!0},this.#t=this.shadowRoot.getElementById("video"),this.#e=this.shadowRoot.getElementById("canvas");let n=this.shadowRoot.getElementById("startButton");if(n.addEventListener("click",this.takeScreenshot.bind(this,this.#i),!1),n.innerText=this.#a,this.#l){let o=window.getComputedStyle(this);Array.from(o).forEach(s=>n.style.setProperty(s,o.getPropertyValue(s),o.getPropertyPriority(s))),this.#r&&(this.removeAttribute("class"),this.removeAttribute("style"))}}#d(){return document.querySelector(this.attributes.getNamedItem("preview-target")?.value)}takeScreenshot(n){let o=n&&n.isFromInternalEvent===!0,s=n?.timeout||this.#i.timeout;return new Promise((l,g)=>{navigator.mediaDevices.getDisplayMedia({video:{cursor:"always",displaySurface:"monitor"},audio:!1}).then(d=>{this.#t.srcObject=d,this.#t.play(),setTimeout(()=>{let r=d.getVideoTracks()[0].getSettings();this.#e.setAttribute("width",r.width),this.#e.setAttribute("height",r.height),this.#e.getContext("2d").drawImage(this.#t,0,0,this.#e.width,this.#e.height),this.#e.toBlob(i=>{this.#s=i,l(i)});let a=this.#d();o&&a instanceof HTMLImageElement&&(a.src=this.#e.toDataURL("image/png"),a.width=this.#e.width*this.#o,a.height=this.#e.height*this.#o),this.#t.srcObject.getTracks().forEach(i=>i.stop()),this.#t.srcObject=null},s)}).catch(d=>{console.error(`An error occurred: ${d}`),g(d)})})}static instance(){return document.querySelector("screenshot-button")}}window.customElements.define("screenshot-button",e),se=e}else{class e{static instance(){return document.querySelector("screenshot-button")}}se=e}var H;if(typeof window<"u"){let e="(Optional) Message or bug description",t="Send",n="Sending...",o="Cancel",s="Error",l="(TIMEOUT) Sending might not be successful, time out occurred!",g="10000",d="https://i.imgur.com/MXRT775.png";class r extends window.HTMLElement{static SEND_EVENT_NAME="BugReportButton:Send";static SENDING_DONE_EVENT_NAME="BugReportButton:SendingDone";static#c=`
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
                <textarea id="message" rows="5" placeholder="${e}"></textarea>
                <div style=" text-align: center; ">
                  <button id="cancelBtn">${o}</button>
                  <button id="sendBtn" style=" font-weight: bold; ">${t}</button>
                </div>
              </div>
          </main>
        </section>
      `;#a;#l;#n;#o;#t;#e;#s;#r;#i;constructor(){super();let a=this.attributes.getNamedItem("text")?.value||"Bug Report";this.#r=this.attributes.getNamedItem("send-timeout")?.value||g;let i=this.attachShadow({mode:"open"});i.innerHTML=r.#c;let p=i.getElementById("actionBtn");p.innerText=a,p.onclick=this.#d.bind(this),this.#a=i.querySelector("screenshot-button"),this.#l=i.getElementById("preview"),this.#n=i.getElementById("captureErrorMsg"),this.#o=i.getElementById("popup"),this.#s=i.getElementById("sendBtn"),this.#e=i.querySelector("textarea");let N=this.#p.bind(this);i.getElementById("closeBtn").onclick=N,i.getElementById("cancelBtn").onclick=N,this.#s.onclick=this.#g.bind(this),window.addEventListener(r.SENDING_DONE_EVENT_NAME,this.#m.bind(this))}#d(){this.#a.takeScreenshot().then(a=>{this.#u(a),this.#t=a}).catch(a=>{console.error("bug-report-button:",a),this.#u(null,a)})}#u(a,i){let p=this.#l;p.removeAttribute("width"),p.onload=null,a?(p.src=URL.createObjectURL(a),p.onload=()=>{p.width=p.width*.4}):(p.src=d,this.#n.innerText=`${s}: ${i}`),this.#o.style.display="block"}#p(){this.#o.style.display="none",this.#n.innerText="",this.#t=null}#g(){let a={screenshot:this.#t,message:this.#e.value};window.dispatchEvent(new CustomEvent(r.SEND_EVENT_NAME,{detail:a})),this.#f()}#m(a){clearTimeout(this.#i);let i=a.detail;this.#h(i?.message,i?.success,i?.keepPopupOpenOnSuccess)}#f(){this.#s.innerText=n,this.shadowRoot.querySelectorAll("button, textarea").forEach(a=>a.disabled=!0),this.#r>0&&(this.#i=setTimeout(()=>{window.dispatchEvent(new CustomEvent(r.SENDING_DONE_EVENT_NAME,{detail:{message:l}}))},this.#r))}#h(a,i,p){this.shadowRoot.querySelectorAll("button, textarea").forEach(N=>N.disabled=!1),this.#s.innerText=t,i===!0&&p!==!0&&this.#p()}}window.customElements.define("bug-report-button",r),H=r}else{class e{static SEND_EVENT_NAME="BugReportButton:Send";static SENDING_DONE_EVENT_NAME="BugReportButton:SendingDone"}H=e}var K=H;var Re={feedbackButtonText:"Hata bildir",sendBtnText:"Hatay\u0131 G\xF6nder",sendBtnLoading:"L\xFCtfen bekleyiniz...",successMessage:"Hata kayd\u0131n\u0131z (TICKET_KEY) g\xF6nderildi. Te\u015Fekk\xFCr ederiz.",sendErrorMessage:`Hata kayd\u0131n\u0131z g\xF6nderilemedi!
L\xFCtfen bu mesaj\u0131 kapatt\u0131ktan sonra indirilen log dosyas\u0131n\u0131 yetkililere kendiniz iletin.`,close:"Kapat",cancel:"\u0130ptal",descPlaceholder:"Hata hakk\u0131nda a\xE7\u0131klama (\u0130ste\u011Fe ba\u011Fl\u0131)",authTokenNotFound:"Eri\u015Fim token'\u0131 bulunamad\u0131!",loadingScreenshot:"Ekran g\xF6r\xFCnt\xFCs\xFC y\xFCkleniyor, l\xFCtfen bekleyiniz..."},Ne={feedbackButtonText:"Report a bug",sendBtnText:"Send bug report",sendBtnLoading:"Please wait...",successMessage:"Your bug report (TICKET_KEY) is sent. Thank you.",sendErrorMessage:`Could not send bug report!
Please send the log file that will be downloaded after closing this message to site admin yourself.`,close:"Close",cancel:"Cancel",descPlaceholder:"Optional description of the bug",authTokenNotFound:"Access token not available!",loadingScreenshot:"Loading screenshot, please wait..."},_e={tr:Re,en:Ne};function Ie(e,t){let n=_e.tr[e];return n?t?Object.keys(t).reduce((o,s)=>o.replace(s,t[s]),n):n:`{??${e}??}`}var E=Ie;var j=null;function G(){if(j)return j;alert(E("authTokenNotFound"))}x&&window.addEventListener(ee,e=>{j=e.detail});function q(e){let t=URL.createObjectURL(e),n=document.createElement("a");n.setAttribute("href",t),n.setAttribute("download",e.name),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}var z="Ulak",re=u?"SSR":new URL(location.href).hostname,D;re.endsWith("grispi.com")?D="https://api.grispi.com":re.endsWith("grispi.dev")?D="https://api.grispi.dev":D="http://localhost:8080";async function W(e){let t=oe(),n=L(),o=await Promise.allSettled([t,n]);console.log("allPayloadsResults",o);let s=o.filter(r=>r.status==="fulfilled"),l=s.filter(r=>Array.isArray(r.value)).flatMap(r=>r.value),g=s.find(r=>!Array.isArray(r.value)).value,d=Oe(g,l);fetch(`${D}/feedback`,{method:"POST",body:d,headers:{Authorization:`Bearer ${G()}`,tenantId:window.location.host.split(".")[0]}}).then(function(r){if(r.status!==200){console.error(z,"Error in response. Response:",r),ie(d),e(!1,E("sendErrorMessage"));return}r.text().then(function(R){M(),e(!0,E("successMessage",{TICKET_KEY:R}))})}).catch(function(r){console.error(z,"Fetch Error",r),ie(d),e(!1,E("sendErrorMessage"))})}function Oe(e,t){c()&&console.debug(z,"payload, iframePayloads",e,t);let n=e.message,o=new FormData;return o.append("description",n),o.append("meta",e.meta),[e,t].flat().forEach(s=>{o.append("files",Ae(s),`${s.fileName}.txt`),s.screenshot&&o.append("files",s.screenshot,`${s.fileName}_screenshot.png`)}),o}function ie(e){for(let t of e.entries())t[0]==="files"&&q(t[1])}function Ae(e){let t=e.description?`Description:

${e.description}

`:"",n=`Meta:

${e.meta}

`,o=`Cookie:

${e.cookie}

`,s=`LocalStorage:

${e.lStorage}

`,l=`SessionStorage:

${e.sStorage}

`,g=e.logs;return new Blob([n,t,o,s,l,g],{type:"plain/text"})}var w="Ulak";function ke(e,t){window.dispatchEvent(new CustomEvent(K.SENDING_DONE_EVENT_NAME,{detail:{success:e,message:t}}))}function Q(){u||(window.addEventListener(K.SEND_EVENT_NAME,e=>{ne(),F(e.detail.screenshot,e.detail.message).then(()=>{W(ke)})}),c()&&console.debug(w,"Registering message handler."),window.addEventListener("message",async e=>{let t=e.origin,n=e.source,o=e.data;if(Be(e))return;if(Le(t)){c()&&console.debug(w,`Event from '${t}' is not trusted, ignoring...`);return}if(typeof o!="object"||typeof o.type!="string"||o.type.length===0){c()&&console.debug(w,`Event data from '${t}' is invalid.`,o);return}let s=o.type;switch(c()&&console.debug(w,"eventHandlers",window.location.href,o.type,o.data),s){case O:{F();break}case A:{let l={type:C,payload:await L()};console.log("response.payload.screenshot",l.payload.screenshot),n.postMessage(l,t);break}case C:{te(o.payload);break}default:c()&&console.debug(w,`Invalid event type: '${s}'.`)}}))}function Le(e){return c()&&console.debug(w,`Checking if '${e}' is trusted or not.`),!1}var Pe=["react-devtools-content-script","react-devtools-bridge"];function Be(e){return Pe.includes(e?.data?.source)}var m="UlakLog",ae=2e5,J="Ulak",b=function(){},S={trace:"T",debug:"D",log:"L",info:"I",warn:"W",error:"E"},De=u?b:console.log.bind(window.console),Me=u?b:console.trace.bind(window.console),Ue=u?b:console.debug.bind(window.console),X=u?b:console.info.bind(window.console),le=u?b:console.warn.bind(window.console),Ce=u?b:console.error.bind(window.console),de=Date.now(),h="",ce=!1,Z=!1,y=0,v=0;Q();function $e(e,t){let n=[Date.now()-de,t];for(let o of e)typeof o>"u"?n.push("undefined"):typeof o=="object"?o instanceof Error?n.push(o.stack||o.toString()):n.push(JSON.stringify(o)):typeof o=="boolean"||typeof o=="number"||typeof o=="bigint"||typeof o=="string"||typeof o=="symbol"?n.push(o):typeof o=="function"?n.push(`[Function ${o.name}]`):n.push(`[Unrecognized type ${o}]`);return n.join(" ")}function Ve(e){if(h+=`
`+e,!(h.length<ae))try{let t=m+y++;v=Math.max(v,y),X(J,"writing to storage",t),sessionStorage.setItem(t,h.substring(h.length-ae)),h="",X(J,"written to storage",t)}catch(t){Z=!0,!!sessionStorage.getItem(m+y)||(y=0),sessionStorage.removeItem(m+y),console.error(`Session storage is full. e.code '${t.code}' e.name ${t.name}`)}}function T(e,t){let n=$e(e,t);Ve(n)}function Fe(){T(arguments,S.log)}function Ye(){T(arguments,S.trace)}function He(){T(arguments,S.debug)}function Ke(){T(arguments,S.info)}function je(){T(arguments,S.warn)}function Ge(){T(arguments,S.error)}function P(){let e=[];for(let o=0;o<v;o++){let s=sessionStorage.getItem(m+o);s&&e.push(s)}let t=Z?`[Session storage quota exceeded, logs may be not ordered by time!]
`:"",n=`
Start time: ${de}
`;return _+n+t+e.join("")+h}function M(){h="";for(let e=0;e<v;e++)sessionStorage.removeItem(m+e);y=0,v=0,Z=!1}function ue(){!ce&&x?(window.console.log=function(){De.apply(window.console,arguments),Fe.apply(null,arguments)},window.console.trace=function(){Me.apply(window.console,arguments),Ye.apply(null,arguments)},window.console.debug=function(){Ue.apply(window.console,arguments),He.apply(null,arguments)},window.console.info=function(){X.apply(window.console,arguments),Ke.apply(null,arguments)},window.console.warn=function(){le.apply(window.console,arguments),je.apply(null,arguments)},window.console.error=function(){Ce.apply(window.console,arguments),Ge.apply(null,arguments)},ce=!0):le(J,"Console is already intercepted!")}console.info(_);
//# sourceMappingURL=ulak.js.map
