var Xe=Object.defineProperty;var Ze=(e,n,t)=>n in e?Xe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var me=(e,n,t)=>(Ze(e,typeof n!="symbol"?n+"":n,t),t),fe=(e,n,t)=>{if(!n.has(e))throw TypeError("Cannot "+t)};var r=(e,n,t)=>(fe(e,n,"read from private field"),t?t.call(e):n.get(e)),i=(e,n,t)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,t)},a=(e,n,t,o)=>(fe(e,n,"write to private field"),o?o.call(e,t):n.set(e,t),t);var g=(e,n,t)=>(fe(e,n,"access private method"),t);var et="0.0.2",Q=`Ulak bug reporter v${et}`;var B=typeof window=="object",u=!B;var J="ULAK_",Be=`${J}AUTH_TOKEN_READY`,X=`${J}PREPARE_PAYLOAD_REQUEST`,Z=`${J}RETRIEVE_PAYLOAD_REQUEST`,he=`${J}RETRIEVE_PAYLOAD_RESPONSE`;var tt=u?"SSR":ot();function Ee(){return`GrispiBugReport_${tt}_${new Date().toISOString().split(".")[0]}`}function ot(){return window.location.host.match(/(grispi\.com|grispi\.net|grispi\.dev)/)?window.location.host.split(".")[0]:window.location.host}var ee=null,ye=null;function we(e,n){return ee=new Promise((t,o)=>{let s=st(),l=JSON.stringify(localStorage,0,2),E=nt(),m=document.cookie,c=Ee(),q=be();ye={meta:s,cookie:m,lStorage:l,sStorage:E,logs:q,fileName:c,message:n},e&&(ye.screenshot=e),t(ye)}),ee}function te(){if(ee==null)throw new Error("Illegal state: 'getPayload()' is called before 'preparePayload()'!");return ee}function nt(){let e=JSON.parse(JSON.stringify(sessionStorage));return Object.keys(sessionStorage).filter(n=>n.startsWith(y)).forEach(n=>delete e[n]),JSON.stringify(e,0,2)}function st(){let e=new Date;return JSON.stringify({url:location.href,lang:window.navigator.language,userAgent:window.navigator.userAgent,os:window.navigator.platform,date:e.toString(),epochMs:e.getTime()},null,2)}function d(){return typeof window?.ulakDebug=="boolean"&&window.ulakDebug}var oe="Ulak",rt=5e3,w=0,Se=[];function it(){w+=1,d()&&console.debug(oe,"payloadRequested",w)}function Me(e){w-=1,Se.push(e),d()&&console.debug(oe,"payloadRetrieved",w)}function $e(){document.querySelectorAll("iframe").forEach(n=>{n.contentWindow.postMessage({type:Z},n.src),it()});let e=new Date().getTime();return new Promise((n,t)=>{let o=setInterval(function(){let l=new Date().getTime()-e;(w===0||l>rt)&&(d()&&console.debug(oe,"payloadsReadyOrTimeout","counter",w,"elapsed",l),clearInterval(o),n(Se),Se=[],w=0)},500)})}function Ue(){document.querySelectorAll("iframe").forEach(e=>{try{e.contentWindow.postMessage({type:X},e.src)}catch(n){console.error(oe,"preparePayloadForIframes",n)}})}var se,M,$,U,T,h,p,re,C,v,ie,Ce,Te=class extends HTMLElement{constructor(){super();i(this,ie);i(this,M,void 0);i(this,$,void 0);i(this,U,void 0);i(this,T,void 0);i(this,h,void 0);i(this,p,void 0);i(this,re,void 0);i(this,C,void 0);i(this,v,void 0);this.attachShadow({mode:"open"}).innerHTML=r(Te,se)}connectedCallback(){a(this,M,this.attributes.getNamedItem("text")?.value||"Take screenshot"),a(this,$,!!this.attributes.getNamedItem("use-computed-style")),a(this,C,this.attributes.getNamedItem("use-computed-style")?.value?.trim().toLowerCase()==="remove"),a(this,U,this.attributes.getNamedItem("timeout")?.value||"500"),a(this,T,this.attributes.getNamedItem("preview-scale")?.value||"0.5"),a(this,v,{timeout:r(this,U),isFromInternalEvent:!0}),a(this,h,this.shadowRoot.getElementById("video")),a(this,p,this.shadowRoot.getElementById("canvas"));let t=this.shadowRoot.getElementById("startButton");if(t.addEventListener("click",this.takeScreenshot.bind(this,r(this,v)),!1),t.innerText=r(this,M),r(this,$)){let o=window.getComputedStyle(this);Array.from(o).forEach(s=>t.style.setProperty(s,o.getPropertyValue(s),o.getPropertyPriority(s))),r(this,C)&&(this.removeAttribute("class"),this.removeAttribute("style"))}}takeScreenshot(t){let o=t&&t.isFromInternalEvent===!0,s=t?.timeout||r(this,v).timeout;return new Promise((l,E)=>{navigator.mediaDevices.getDisplayMedia({video:{cursor:"always",displaySurface:"monitor"},audio:!1}).then(m=>{r(this,h).srcObject=m,r(this,h).play(),setTimeout(()=>{let c=m.getVideoTracks()[0].getSettings();r(this,p).setAttribute("width",c.width),r(this,p).setAttribute("height",c.height),r(this,p).getContext("2d").drawImage(r(this,h),0,0,r(this,p).width,r(this,p).height),r(this,p).toBlob(W=>{a(this,re,W),l(W)});let z=g(this,ie,Ce).call(this);o&&z instanceof HTMLImageElement&&(z.src=r(this,p).toDataURL("image/png"),z.width=r(this,p).width*r(this,T),z.height=r(this,p).height*r(this,T)),r(this,h).srcObject.getTracks().forEach(W=>W.stop()),r(this,h).srcObject=null},s)}).catch(m=>{console.error(`An error occurred: ${m}`),E(m)})})}static instance(){return document.querySelector("screenshot-button")}},ne=Te;se=new WeakMap,M=new WeakMap,$=new WeakMap,U=new WeakMap,T=new WeakMap,h=new WeakMap,p=new WeakMap,re=new WeakMap,C=new WeakMap,v=new WeakMap,ie=new WeakSet,Ce=function(){return document.querySelector(this.attributes.getNamedItem("preview-target")?.value)},i(ne,se,`
        <style>
          #canvas, #video {
            display: none;
          }
        </style>
        <video id="video">Video stream not available.</video>
        <canvas id="canvas"></canvas>
        <button id="startButton"></button>
      `);window.customElements.define("screenshot-button",ne);var at="(Optional) Message or bug description",Ve="Send",lt="Sending...",ct="Cancel",dt="Error",ut="(TIMEOUT) Sending might not be successful, time out occurred!",pt="10000",gt="https://i.imgur.com/MXRT775.png",ae,V,F,R,N,_,Y,b,I,H,le,Fe,K,ve,j,xe,ce,Ye,de,He,ue,Ke,pe,je,x=class extends HTMLElement{constructor(){super();i(this,le);i(this,K);i(this,j);i(this,ce);i(this,de);i(this,ue);i(this,pe);i(this,V,void 0);i(this,F,void 0);i(this,R,void 0);i(this,N,void 0);i(this,_,void 0);i(this,Y,void 0);i(this,b,void 0);i(this,I,void 0);i(this,H,void 0);let t=this.attributes.getNamedItem("text")?.value||"Bug Report";a(this,I,this.attributes.getNamedItem("send-timeout")?.value||pt);let o=this.attachShadow({mode:"open"});o.innerHTML=r(x,ae);let s=o.getElementById("actionBtn");s.innerText=t,s.onclick=g(this,le,Fe).bind(this),a(this,V,o.querySelector("screenshot-button")),a(this,F,o.getElementById("preview")),a(this,R,o.getElementById("captureErrorMsg")),a(this,N,o.getElementById("popup")),a(this,b,o.getElementById("sendBtn")),a(this,Y,o.querySelector("textarea"));let l=g(this,j,xe).bind(this);o.getElementById("closeBtn").onclick=l,o.getElementById("cancelBtn").onclick=l,r(this,b).onclick=g(this,ce,Ye).bind(this),window.addEventListener(x.SENDING_DONE_EVENT_NAME,g(this,de,He).bind(this))}},f=x;ae=new WeakMap,V=new WeakMap,F=new WeakMap,R=new WeakMap,N=new WeakMap,_=new WeakMap,Y=new WeakMap,b=new WeakMap,I=new WeakMap,H=new WeakMap,le=new WeakSet,Fe=function(){r(this,V).takeScreenshot().then(t=>{g(this,K,ve).call(this,t),a(this,_,t)}).catch(t=>{g(this,K,ve).call(this,null,t)})},K=new WeakSet,ve=function(t,o){let s=r(this,F);s.removeAttribute("width"),s.onload=null,t?(s.src=URL.createObjectURL(t),s.onload=()=>{s.width=s.width*.4}):(s.src=gt,r(this,R).innerText=`${dt}: ${o}`),r(this,N).style.display="block"},j=new WeakSet,xe=function(){r(this,N).style.display="none",r(this,R).innerText="",a(this,_,null)},ce=new WeakSet,Ye=function(){let t={screenshot:r(this,_),message:r(this,Y).value};window.dispatchEvent(new CustomEvent(x.SEND_EVENT_NAME,{detail:t})),g(this,ue,Ke).call(this)},de=new WeakSet,He=function(t){clearTimeout(r(this,H));let o=t.detail;g(this,pe,je).call(this,o?.message,o?.success,o?.keepPopupOpenOnSuccess)},ue=new WeakSet,Ke=function(){r(this,b).innerText=lt,this.shadowRoot.querySelectorAll("button, textarea").forEach(t=>t.disabled=!0),r(this,I)>0&&a(this,H,setTimeout(()=>{window.dispatchEvent(new CustomEvent(x.SENDING_DONE_EVENT_NAME,{detail:{message:ut}}))},r(this,I)))},pe=new WeakSet,je=function(t,o,s){this.shadowRoot.querySelectorAll("button, textarea").forEach(l=>l.disabled=!1),r(this,b).innerText=Ve,o===!0&&s!==!0&&g(this,j,xe).call(this)},me(f,"SEND_EVENT_NAME","BugReportButton:Send"),me(f,"SENDING_DONE_EVENT_NAME","BugReportButton:SendingDone"),i(f,ae,`
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
                <textarea id="message" rows="5" placeholder="${at}"></textarea>
                <div style=" text-align: center; ">
                  <button id="cancelBtn">${ct}</button>
                  <button id="sendBtn" style=" font-weight: bold; ">${Ve}</button>
                </div>
              </div>
          </main>
        </section>
      `);window.customElements.define("bug-report-button",f);var mt={feedbackButtonText:"Hata bildir",sendBtnText:"Hatay\u0131 G\xF6nder",sendBtnLoading:"L\xFCtfen bekleyiniz...",successMessage:"Hata kayd\u0131n\u0131z (TICKET_KEY) g\xF6nderildi. Te\u015Fekk\xFCr ederiz.",sendErrorMessage:`Hata kayd\u0131n\u0131z g\xF6nderilemedi!
L\xFCtfen bu mesaj\u0131 kapatt\u0131ktan sonra indirilen log dosyas\u0131n\u0131 yetkililere kendiniz iletin.`,close:"Kapat",cancel:"\u0130ptal",descPlaceholder:"Hata hakk\u0131nda a\xE7\u0131klama (\u0130ste\u011Fe ba\u011Fl\u0131)",authTokenNotFound:"Eri\u015Fim token'\u0131 bulunamad\u0131!",loadingScreenshot:"Ekran g\xF6r\xFCnt\xFCs\xFC y\xFCkleniyor, l\xFCtfen bekleyiniz..."},ft={feedbackButtonText:"Report a bug",sendBtnText:"Send bug report",sendBtnLoading:"Please wait...",successMessage:"Your bug report (TICKET_KEY) is sent. Thank you.",sendErrorMessage:`Could not send bug report!
Please send the log file that will be downloaded after closing this message to site admin yourself.`,close:"Close",cancel:"Cancel",descPlaceholder:"Optional description of the bug",authTokenNotFound:"Access token not available!",loadingScreenshot:"Loading screenshot, please wait..."},ht={tr:mt,en:ft};function Et(e,n){let t=ht.tr[e];return t?n?Object.keys(n).reduce((o,s)=>o.replace(s,n[s]),t):t:`{??${e}??}`}var O=Et;var Re=null;function Ne(){if(Re)return Re;alert(O("authTokenNotFound"))}B&&window.addEventListener(Be,e=>{Re=e.detail});function _e(e){let n=URL.createObjectURL(e),t=document.createElement("a");t.setAttribute("href",n),t.setAttribute("download",e.name),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}var Ie="Ulak",Ge=u?"SSR":new URL(location.href).hostname,ge;Ge.endsWith("grispi.com")?ge="https://api.grispi.com":Ge.endsWith("grispi.dev")?ge="https://api.grispi.dev":ge="http://localhost:8080";async function Oe(e){let n=$e(),t=te(),o=await Promise.allSettled([n,t]);console.log("allPayloadsResults",o);let s=o.filter(c=>c.status==="fulfilled"),l=s.filter(c=>Array.isArray(c.value)).flatMap(c=>c.value),E=s.find(c=>!Array.isArray(c.value)).value,m=yt(E,l);fetch(`${ge}/feedback`,{method:"POST",body:m,headers:{Authorization:`Bearer ${Ne()}`,tenantId:"dedeler"}}).then(function(c){if(c.status!==200){console.error(Ie,"Error in response. Response:",c),qe(m),e(!1,O("sendErrorMessage"));return}c.text().then(function(q){Ae(),e(!0,O("successMessage",{TICKET_KEY:q}))})}).catch(function(c){console.error(Ie,"Fetch Error",c),qe(m),e(!1,O("sendErrorMessage"))})}function yt(e,n){d()&&console.debug(Ie,"payload, iframePayloads",e,n);let t=e.message,o=new FormData;return o.append("description",t),o.append("meta",e.meta),[e,n].flat().forEach(s=>{o.append("files",wt(s),`${s.fileName}.txt`),s.screenshot&&o.append("files",s.screenshot,`${s.fileName}_screenshot.png`)}),o}function qe(e){for(let n of e.entries())n[0]==="files"&&_e(n[1])}function wt(e){let n=e.description?`Description:

${e.description}

`:"",t=`Meta:

${e.meta}

`,o=`Cookie:

${e.cookie}

`,s=`LocalStorage:

${e.lStorage}

`,l=`SessionStorage:

${e.sStorage}

`,E=e.logs;return new Blob([t,n,o,s,l,E],{type:"plain/text"})}var A="Ulak";function bt(e,n){alert(`Success ${e} message: ${n}`),window.dispatchEvent(new CustomEvent(f.SENDING_DONE_EVENT_NAME,{detail:{success:e,message:n}}))}function ke(){u||(window.addEventListener(f.SEND_EVENT_NAME,e=>{Ue(),we(e.detail.screenshot,e.detail.message).then(()=>{Oe(bt)})}),d()&&console.debug(A,"Registering message handler."),window.addEventListener("message",async e=>{let n=e.origin,t=e.source,o=e.data;if(vt(e))return;if(St(n)){d()&&console.debug(A,`Event from '${n}' is not trusted, ignoring...`);return}if(typeof o!="object"||typeof o.type!="string"||o.type.length===0){d()&&console.debug(A,`Event data from '${n}' is invalid.`,o);return}let s=o.type;switch(d()&&console.debug(A,"eventHandlers",window.location.href,o.type,o.data),s){case X:{we();break}case Z:{let l={type:he,payload:await te()};console.log("response.payload.screenshot",l.payload.screenshot),t.postMessage(l,n);break}case he:{Me(o.payload);break}default:d()&&console.debug(A,`Invalid event type: '${s}'.`)}}))}function St(e){return d()&&console.debug(A,`Checking if '${e}' is trusted or not.`),!1}var Tt=["react-devtools-content-script","react-devtools-bridge"];function vt(e){return Tt.includes(e?.data?.source)}var y="UlakLog",ze=2e5,Le="Ulak",L=function(){},P={trace:"T",debug:"D",log:"L",info:"I",warn:"W",error:"E"},xt=u?L:console.log.bind(window.console),Rt=u?L:console.trace.bind(window.console),Nt=u?L:console.debug.bind(window.console),Pe=u?L:console.info.bind(window.console),We=u?L:console.warn.bind(window.console),_t=u?L:console.error.bind(window.console),Je=Date.now(),S="",Qe=!1,De=!1,k=0,G=0;ke();function It(e,n){let t=[Date.now()-Je,n];for(let o of e)typeof o>"u"?t.push("undefined"):typeof o=="object"?o instanceof Error?t.push(o.stack||o.toString()):t.push(JSON.stringify(o)):typeof o=="boolean"||typeof o=="number"||typeof o=="bigint"||typeof o=="string"||typeof o=="symbol"?t.push(o):typeof o=="function"?t.push(`[Function ${o.name}]`):t.push(`[Unrecognized type ${o}]`);return t.join(" ")}function Ot(e){if(S+=`
`+e,!(S.length<ze))try{let n=y+k++;G=Math.max(G,k),Pe(Le,"writing to storage",n),sessionStorage.setItem(n,S.substring(S.length-ze)),S="",Pe(Le,"written to storage",n)}catch(n){De=!0,!!sessionStorage.getItem(y+k)||(k=0),sessionStorage.removeItem(y+k),console.error(`Session storage is full. e.code '${n.code}' e.name ${n.name}`)}}function D(e,n){let t=It(e,n);Ot(t)}function At(){D(arguments,P.log)}function kt(){D(arguments,P.trace)}function Lt(){D(arguments,P.debug)}function Pt(){D(arguments,P.info)}function Dt(){D(arguments,P.warn)}function Bt(){D(arguments,P.error)}function be(){let e=[];for(let o=0;o<G;o++){let s=sessionStorage.getItem(y+o);s&&e.push(s)}let n=De?`[Session storage quota exceeded, logs may be not ordered by time!]
`:"",t=`
Start time: ${Je}
`;return Q+t+n+e.join("")+S}function Ae(){S="";for(let e=0;e<G;e++)sessionStorage.removeItem(y+e);k=0,G=0,De=!1}function Mt(){!Qe&&B?(window.console.log=function(){xt.apply(window.console,arguments),At.apply(null,arguments)},window.console.trace=function(){Rt.apply(window.console,arguments),kt.apply(null,arguments)},window.console.debug=function(){Nt.apply(window.console,arguments),Lt.apply(null,arguments)},window.console.info=function(){Pe.apply(window.console,arguments),Pt.apply(null,arguments)},window.console.warn=function(){We.apply(window.console,arguments),Dt.apply(null,arguments)},window.console.error=function(){_t.apply(window.console,arguments),Bt.apply(null,arguments)},Qe=!0):We(Le,"Console is already intercepted!")}console.info(Q);export{Ae as clearLogs,be as getLogs,Mt as interceptConsole};
//# sourceMappingURL=ulak.js.map
