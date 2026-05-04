(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var eh={exports:{}},No={};var Cg;function D_(){if(Cg)return No;Cg=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:a,type:s,key:h,ref:l!==void 0?l:null,props:c}}return No.Fragment=e,No.jsx=i,No.jsxs=i,No}var Dg;function R_(){return Dg||(Dg=1,eh.exports=D_()),eh.exports}var Qo=R_(),th={exports:{}},lt={};var Rg;function w_(){if(Rg)return lt;Rg=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),A=Symbol.iterator;function S(L){return L===null||typeof L!="object"?null:(L=A&&L[A]||L["@@iterator"],typeof L=="function"?L:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,y={};function _(L,j,pe){this.props=L,this.context=j,this.refs=y,this.updater=pe||E}_.prototype.isReactComponent={},_.prototype.setState=function(L,j){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,j,"setState")},_.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function P(){}P.prototype=_.prototype;function U(L,j,pe){this.props=L,this.context=j,this.refs=y,this.updater=pe||E}var I=U.prototype=new P;I.constructor=U,C(I,_.prototype),I.isPureReactComponent=!0;var Y=Array.isArray;function O(){}var F={H:null,A:null,T:null,S:null},ie=Object.prototype.hasOwnProperty;function w(L,j,pe){var Se=pe.ref;return{$$typeof:a,type:L,key:j,ref:Se!==void 0?Se:null,props:pe}}function R(L,j){return w(L.type,j,L.props)}function W(L){return typeof L=="object"&&L!==null&&L.$$typeof===a}function re(L){var j={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(pe){return j[pe]})}var fe=/\/+/g;function $(L,j){return typeof L=="object"&&L!==null&&L.key!=null?re(""+L.key):j.toString(36)}function N(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(O,O):(L.status="pending",L.then(function(j){L.status==="pending"&&(L.status="fulfilled",L.value=j)},function(j){L.status==="pending"&&(L.status="rejected",L.reason=j)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function D(L,j,pe,Se,Ue){var J=typeof L;(J==="undefined"||J==="boolean")&&(L=null);var ue=!1;if(L===null)ue=!0;else switch(J){case"bigint":case"string":case"number":ue=!0;break;case"object":switch(L.$$typeof){case a:case e:ue=!0;break;case v:return ue=L._init,D(ue(L._payload),j,pe,Se,Ue)}}if(ue)return Ue=Ue(L),ue=Se===""?"."+$(L,0):Se,Y(Ue)?(pe="",ue!=null&&(pe=ue.replace(fe,"$&/")+"/"),D(Ue,j,pe,"",function(Xe){return Xe})):Ue!=null&&(W(Ue)&&(Ue=R(Ue,pe+(Ue.key==null||L&&L.key===Ue.key?"":(""+Ue.key).replace(fe,"$&/")+"/")+ue)),j.push(Ue)),1;ue=0;var Te=Se===""?".":Se+":";if(Y(L))for(var Ne=0;Ne<L.length;Ne++)Se=L[Ne],J=Te+$(Se,Ne),ue+=D(Se,j,pe,J,Ue);else if(Ne=S(L),typeof Ne=="function")for(L=Ne.call(L),Ne=0;!(Se=L.next()).done;)Se=Se.value,J=Te+$(Se,Ne++),ue+=D(Se,j,pe,J,Ue);else if(J==="object"){if(typeof L.then=="function")return D(N(L),j,pe,Se,Ue);throw j=String(L),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return ue}function H(L,j,pe){if(L==null)return L;var Se=[],Ue=0;return D(L,Se,"","",function(J){return j.call(pe,J,Ue++)}),Se}function z(L){if(L._status===-1){var j=L._result;j=j(),j.then(function(pe){(L._status===0||L._status===-1)&&(L._status=1,L._result=pe)},function(pe){(L._status===0||L._status===-1)&&(L._status=2,L._result=pe)}),L._status===-1&&(L._status=0,L._result=j)}if(L._status===1)return L._result.default;throw L._result}var le=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)},he={map:H,forEach:function(L,j,pe){H(L,function(){j.apply(this,arguments)},pe)},count:function(L){var j=0;return H(L,function(){j++}),j},toArray:function(L){return H(L,function(j){return j})||[]},only:function(L){if(!W(L))throw Error("React.Children.only expected to receive a single React element child.");return L}};return lt.Activity=g,lt.Children=he,lt.Component=_,lt.Fragment=i,lt.Profiler=l,lt.PureComponent=U,lt.StrictMode=s,lt.Suspense=m,lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=F,lt.__COMPILER_RUNTIME={__proto__:null,c:function(L){return F.H.useMemoCache(L)}},lt.cache=function(L){return function(){return L.apply(null,arguments)}},lt.cacheSignal=function(){return null},lt.cloneElement=function(L,j,pe){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var Se=C({},L.props),Ue=L.key;if(j!=null)for(J in j.key!==void 0&&(Ue=""+j.key),j)!ie.call(j,J)||J==="key"||J==="__self"||J==="__source"||J==="ref"&&j.ref===void 0||(Se[J]=j[J]);var J=arguments.length-2;if(J===1)Se.children=pe;else if(1<J){for(var ue=Array(J),Te=0;Te<J;Te++)ue[Te]=arguments[Te+2];Se.children=ue}return w(L.type,Ue,Se)},lt.createContext=function(L){return L={$$typeof:h,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:c,_context:L},L},lt.createElement=function(L,j,pe){var Se,Ue={},J=null;if(j!=null)for(Se in j.key!==void 0&&(J=""+j.key),j)ie.call(j,Se)&&Se!=="key"&&Se!=="__self"&&Se!=="__source"&&(Ue[Se]=j[Se]);var ue=arguments.length-2;if(ue===1)Ue.children=pe;else if(1<ue){for(var Te=Array(ue),Ne=0;Ne<ue;Ne++)Te[Ne]=arguments[Ne+2];Ue.children=Te}if(L&&L.defaultProps)for(Se in ue=L.defaultProps,ue)Ue[Se]===void 0&&(Ue[Se]=ue[Se]);return w(L,J,Ue)},lt.createRef=function(){return{current:null}},lt.forwardRef=function(L){return{$$typeof:d,render:L}},lt.isValidElement=W,lt.lazy=function(L){return{$$typeof:v,_payload:{_status:-1,_result:L},_init:z}},lt.memo=function(L,j){return{$$typeof:p,type:L,compare:j===void 0?null:j}},lt.startTransition=function(L){var j=F.T,pe={};F.T=pe;try{var Se=L(),Ue=F.S;Ue!==null&&Ue(pe,Se),typeof Se=="object"&&Se!==null&&typeof Se.then=="function"&&Se.then(O,le)}catch(J){le(J)}finally{j!==null&&pe.types!==null&&(j.types=pe.types),F.T=j}},lt.unstable_useCacheRefresh=function(){return F.H.useCacheRefresh()},lt.use=function(L){return F.H.use(L)},lt.useActionState=function(L,j,pe){return F.H.useActionState(L,j,pe)},lt.useCallback=function(L,j){return F.H.useCallback(L,j)},lt.useContext=function(L){return F.H.useContext(L)},lt.useDebugValue=function(){},lt.useDeferredValue=function(L,j){return F.H.useDeferredValue(L,j)},lt.useEffect=function(L,j){return F.H.useEffect(L,j)},lt.useEffectEvent=function(L){return F.H.useEffectEvent(L)},lt.useId=function(){return F.H.useId()},lt.useImperativeHandle=function(L,j,pe){return F.H.useImperativeHandle(L,j,pe)},lt.useInsertionEffect=function(L,j){return F.H.useInsertionEffect(L,j)},lt.useLayoutEffect=function(L,j){return F.H.useLayoutEffect(L,j)},lt.useMemo=function(L,j){return F.H.useMemo(L,j)},lt.useOptimistic=function(L,j){return F.H.useOptimistic(L,j)},lt.useReducer=function(L,j,pe){return F.H.useReducer(L,j,pe)},lt.useRef=function(L){return F.H.useRef(L)},lt.useState=function(L){return F.H.useState(L)},lt.useSyncExternalStore=function(L,j,pe){return F.H.useSyncExternalStore(L,j,pe)},lt.useTransition=function(){return F.H.useTransition()},lt.version="19.2.0",lt}var wg;function Ud(){return wg||(wg=1,th.exports=w_()),th.exports}var Oc=Ud(),nh={exports:{}},Po={},ih={exports:{}},ah={};var Ug;function U_(){return Ug||(Ug=1,(function(a){function e(D,H){var z=D.length;D.push(H);e:for(;0<z;){var le=z-1>>>1,he=D[le];if(0<l(he,H))D[le]=H,D[z]=he,z=le;else break e}}function i(D){return D.length===0?null:D[0]}function s(D){if(D.length===0)return null;var H=D[0],z=D.pop();if(z!==H){D[0]=z;e:for(var le=0,he=D.length,L=he>>>1;le<L;){var j=2*(le+1)-1,pe=D[j],Se=j+1,Ue=D[Se];if(0>l(pe,z))Se<he&&0>l(Ue,pe)?(D[le]=Ue,D[Se]=z,le=Se):(D[le]=pe,D[j]=z,le=j);else if(Se<he&&0>l(Ue,z))D[le]=Ue,D[Se]=z,le=Se;else break e}}return H}function l(D,H){var z=D.sortIndex-H.sortIndex;return z!==0?z:D.id-H.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;a.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();a.unstable_now=function(){return h.now()-d}}var m=[],p=[],v=1,g=null,A=3,S=!1,E=!1,C=!1,y=!1,_=typeof setTimeout=="function"?setTimeout:null,P=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function I(D){for(var H=i(p);H!==null;){if(H.callback===null)s(p);else if(H.startTime<=D)s(p),H.sortIndex=H.expirationTime,e(m,H);else break;H=i(p)}}function Y(D){if(C=!1,I(D),!E)if(i(m)!==null)E=!0,O||(O=!0,re());else{var H=i(p);H!==null&&N(Y,H.startTime-D)}}var O=!1,F=-1,ie=5,w=-1;function R(){return y?!0:!(a.unstable_now()-w<ie)}function W(){if(y=!1,O){var D=a.unstable_now();w=D;var H=!0;try{e:{E=!1,C&&(C=!1,P(F),F=-1),S=!0;var z=A;try{t:{for(I(D),g=i(m);g!==null&&!(g.expirationTime>D&&R());){var le=g.callback;if(typeof le=="function"){g.callback=null,A=g.priorityLevel;var he=le(g.expirationTime<=D);if(D=a.unstable_now(),typeof he=="function"){g.callback=he,I(D),H=!0;break t}g===i(m)&&s(m),I(D)}else s(m);g=i(m)}if(g!==null)H=!0;else{var L=i(p);L!==null&&N(Y,L.startTime-D),H=!1}}break e}finally{g=null,A=z,S=!1}H=void 0}}finally{H?re():O=!1}}}var re;if(typeof U=="function")re=function(){U(W)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,$=fe.port2;fe.port1.onmessage=W,re=function(){$.postMessage(null)}}else re=function(){_(W,0)};function N(D,H){F=_(function(){D(a.unstable_now())},H)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(D){D.callback=null},a.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ie=0<D?Math.floor(1e3/D):5},a.unstable_getCurrentPriorityLevel=function(){return A},a.unstable_next=function(D){switch(A){case 1:case 2:case 3:var H=3;break;default:H=A}var z=A;A=H;try{return D()}finally{A=z}},a.unstable_requestPaint=function(){y=!0},a.unstable_runWithPriority=function(D,H){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var z=A;A=D;try{return H()}finally{A=z}},a.unstable_scheduleCallback=function(D,H,z){var le=a.unstable_now();switch(typeof z=="object"&&z!==null?(z=z.delay,z=typeof z=="number"&&0<z?le+z:le):z=le,D){case 1:var he=-1;break;case 2:he=250;break;case 5:he=1073741823;break;case 4:he=1e4;break;default:he=5e3}return he=z+he,D={id:v++,callback:H,priorityLevel:D,startTime:z,expirationTime:he,sortIndex:-1},z>le?(D.sortIndex=z,e(p,D),i(m)===null&&D===i(p)&&(C?(P(F),F=-1):C=!0,N(Y,z-le))):(D.sortIndex=he,e(m,D),E||S||(E=!0,O||(O=!0,re()))),D},a.unstable_shouldYield=R,a.unstable_wrapCallback=function(D){var H=A;return function(){var z=A;A=H;try{return D.apply(this,arguments)}finally{A=z}}}})(ah)),ah}var Lg;function L_(){return Lg||(Lg=1,ih.exports=U_()),ih.exports}var rh={exports:{}},In={};var Bg;function B_(){if(Bg)return In;Bg=1;var a=Ud();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,v){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:m,containerInfo:p,implementation:v}}var h=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return In.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,In.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,v)},In.flushSync=function(m){var p=h.T,v=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=v,s.d.f()}},In.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},In.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},In.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,g=d(v,p.crossOrigin),A=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:g,integrity:A,fetchPriority:S}):v==="script"&&s.d.X(m,{crossOrigin:g,integrity:A,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},In.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},In.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,g=d(v,p.crossOrigin);s.d.L(m,v,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},In.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},In.requestFormReset=function(m){s.d.r(m)},In.unstable_batchedUpdates=function(m,p){return m(p)},In.useFormState=function(m,p,v){return h.H.useFormState(m,p,v)},In.useFormStatus=function(){return h.H.useHostTransitionStatus()},In.version="19.2.0",In}var Og;function O_(){if(Og)return rh.exports;Og=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),rh.exports=B_(),rh.exports}var Ng;function N_(){if(Ng)return Po;Ng=1;var a=L_(),e=Ud(),i=O_();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)n+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,r=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(r=n.return),t=n.return;while(t)}return n.tag===3?r:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var r=t,o=n;;){var u=r.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){r=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===r)return m(u),t;if(f===o)return m(u),n;f=f.sibling}throw Error(s(188))}if(r.return!==o.return)r=u,o=f;else{for(var x=!1,b=u.child;b;){if(b===r){x=!0,r=u,o=f;break}if(b===o){x=!0,o=u,r=f;break}b=b.sibling}if(!x){for(b=f.child;b;){if(b===r){x=!0,r=f,o=u;break}if(b===o){x=!0,o=f,r=u;break}b=b.sibling}if(!x)throw Error(s(189))}}if(r.alternate!==o)throw Error(s(190))}if(r.tag!==3)throw Error(s(188));return r.stateNode.current===r?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var g=Object.assign,A=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),P=Symbol.for("react.consumer"),U=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),O=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),ie=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),R=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function re(t){return t===null||typeof t!="object"?null:(t=W&&t[W]||t["@@iterator"],typeof t=="function"?t:null)}var fe=Symbol.for("react.client.reference");function $(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===fe?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case _:return"Profiler";case y:return"StrictMode";case Y:return"Suspense";case O:return"SuspenseList";case w:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case U:return t.displayName||"Context";case P:return(t._context.displayName||"Context")+".Consumer";case I:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case F:return n=t.displayName||null,n!==null?n:$(t.type)||"Memo";case ie:n=t._payload,t=t._init;try{return $(t(n))}catch{}}return null}var N=Array.isArray,D=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,z={pending:!1,data:null,method:null,action:null},le=[],he=-1;function L(t){return{current:t}}function j(t){0>he||(t.current=le[he],le[he]=null,he--)}function pe(t,n){he++,le[he]=t.current,t.current=n}var Se=L(null),Ue=L(null),J=L(null),ue=L(null);function Te(t,n){switch(pe(J,n),pe(Ue,t),pe(Se,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Zm(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Zm(n),t=Jm(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}j(Se),pe(Se,t)}function Ne(){j(Se),j(Ue),j(J)}function Xe(t){t.memoizedState!==null&&pe(ue,t);var n=Se.current,r=Jm(n,t.type);n!==r&&(pe(Ue,t),pe(Se,r))}function st(t){Ue.current===t&&(j(Se),j(Ue)),ue.current===t&&(j(ue),Uo._currentValue=z)}var en,ut;function Et(t){if(en===void 0)try{throw Error()}catch(r){var n=r.stack.trim().match(/\n( *(at )?)/);en=n&&n[1]||"",ut=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+en+t+ut}var V=!1;function at(t,n){if(!t||V)return"";V=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var xe=function(){throw Error()};if(Object.defineProperty(xe.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(xe,[])}catch(ce){var se=ce}Reflect.construct(t,[],xe)}else{try{xe.call()}catch(ce){se=ce}t.call(xe.prototype)}}else{try{throw Error()}catch(ce){se=ce}(xe=t())&&typeof xe.catch=="function"&&xe.catch(function(){})}}catch(ce){if(ce&&se&&typeof ce.stack=="string")return[ce.stack,se.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),x=f[0],b=f[1];if(x&&b){var G=x.split(`
`),ne=b.split(`
`);for(u=o=0;o<G.length&&!G[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ne.length&&!ne[u].includes("DetermineComponentFrameRoot");)u++;if(o===G.length||u===ne.length)for(o=G.length-1,u=ne.length-1;1<=o&&0<=u&&G[o]!==ne[u];)u--;for(;1<=o&&0<=u;o--,u--)if(G[o]!==ne[u]){if(o!==1||u!==1)do if(o--,u--,0>u||G[o]!==ne[u]){var me=`
`+G[o].replace(" at new "," at ");return t.displayName&&me.includes("<anonymous>")&&(me=me.replace("<anonymous>",t.displayName)),me}while(1<=o&&0<=u);break}}}finally{V=!1,Error.prepareStackTrace=r}return(r=t?t.displayName||t.name:"")?Et(r):""}function gt(t,n){switch(t.tag){case 26:case 27:case 5:return Et(t.type);case 16:return Et("Lazy");case 13:return t.child!==n&&n!==null?Et("Suspense Fallback"):Et("Suspense");case 19:return Et("SuspenseList");case 0:case 15:return at(t.type,!1);case 11:return at(t.type.render,!1);case 1:return at(t.type,!0);case 31:return Et("Activity");default:return""}}function It(t){try{var n="",r=null;do n+=gt(t,r),r=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ge=Object.prototype.hasOwnProperty,Wt=a.unstable_scheduleCallback,qe=a.unstable_cancelCallback,ot=a.unstable_shouldYield,B=a.unstable_requestPaint,M=a.unstable_now,te=a.unstable_getCurrentPriorityLevel,ve=a.unstable_ImmediatePriority,_e=a.unstable_UserBlockingPriority,de=a.unstable_NormalPriority,We=a.unstable_LowPriority,Le=a.unstable_IdlePriority,Je=a.log,Ye=a.unstable_setDisableYieldValue,ye=null,Ee=null;function Qe(t){if(typeof Je=="function"&&Ye(t),Ee&&typeof Ee.setStrictMode=="function")try{Ee.setStrictMode(ye,t)}catch{}}var Ve=Math.clz32?Math.clz32:k,Pe=Math.log,it=Math.LN2;function k(t){return t>>>=0,t===0?32:31-(Pe(t)/it|0)|0}var Re=256,Ce=262144,De=4194304;function Me(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ae(t,n,r){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,x=t.pingedLanes;t=t.warmLanes;var b=o&134217727;return b!==0?(o=b&~f,o!==0?u=Me(o):(x&=b,x!==0?u=Me(x):r||(r=b&~t,r!==0&&(u=Me(r))))):(b=o&~f,b!==0?u=Me(b):x!==0?u=Me(x):r||(r=o&~t,r!==0&&(u=Me(r)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,r=n&-n,f>=r||f===32&&(r&4194048)!==0)?n:u}function ze(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function rt(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ht(){var t=De;return De<<=1,(De&62914560)===0&&(De=4194304),t}function Rt(t){for(var n=[],r=0;31>r;r++)n.push(t);return n}function Pn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function jn(t,n,r,o,u,f){var x=t.pendingLanes;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=r,t.entangledLanes&=r,t.errorRecoveryDisabledLanes&=r,t.shellSuspendCounter=0;var b=t.entanglements,G=t.expirationTimes,ne=t.hiddenUpdates;for(r=x&~r;0<r;){var me=31-Ve(r),xe=1<<me;b[me]=0,G[me]=-1;var se=ne[me];if(se!==null)for(ne[me]=null,me=0;me<se.length;me++){var ce=se[me];ce!==null&&(ce.lane&=-536870913)}r&=~xe}o!==0&&tl(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(x&~n))}function tl(t,n,r){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Ve(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|r&261930}function Vs(t,n){var r=t.entangledLanes|=n;for(t=t.entanglements;r;){var o=31-Ve(r),u=1<<o;u&n|t[o]&n&&(t[o]|=n),r&=~u}}function ks(t,n){var r=n&-n;return r=(r&42)!==0?1:Mi(r),(r&(t.suspendedLanes|n))!==0?0:r}function Mi(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function sr(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Xs(){var t=H.p;return t!==0?t:(t=window.event,t===void 0?32:_g(t.type))}function Ys(t,n){var r=H.p;try{return H.p=t,n()}finally{H.p=r}}var $n=Math.random().toString(36).slice(2),cn="__reactFiber$"+$n,gn="__reactProps$"+$n,ki="__reactContainer$"+$n,Nr="__reactEvents$"+$n,Qc="__reactListeners$"+$n,qc="__reactHandles$"+$n,nl="__reactResources$"+$n,or="__reactMarker$"+$n;function Ws(t){delete t[cn],delete t[gn],delete t[Nr],delete t[Qc],delete t[qc]}function Ea(t){var n=t[cn];if(n)return n;for(var r=t.parentNode;r;){if(n=r[ki]||r[cn]){if(r=n.alternate,n.child!==null||r!==null&&r.child!==null)for(t=ag(t);t!==null;){if(r=t[cn])return r;t=ag(t)}return n}t=r,r=t.parentNode}return null}function T(t){if(t=t[cn]||t[ki]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Q(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function oe(t){var n=t[nl];return n||(n=t[nl]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function ae(t){t[or]=!0}var Z=new Set,be={};function we(t,n){Ie(t,n),Ie(t+"Capture",n)}function Ie(t,n){for(be[t]=n,t=0;t<n.length;t++)Z.add(n[t])}var Fe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),$e={},nt={};function Ke(t){return Ge.call(nt,t)?!0:Ge.call($e,t)?!1:Fe.test(t)?nt[t]=!0:($e[t]=!0,!1)}function ht(t,n,r){if(Ke(n))if(r===null)t.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+r)}}function Dt(t,n,r){if(r===null)t.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+r)}}function wt(t,n,r,o){if(o===null)t.removeAttribute(r);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(r);return}t.setAttributeNS(n,r,""+o)}}function bt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Pt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function je(t,n,r){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(x){r=""+x,f.call(this,x)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return r},setValue:function(x){r=""+x},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Qt(t){if(!t._valueTracker){var n=Pt(t)?"checked":"value";t._valueTracker=je(t,n,""+t[n])}}function Tt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var r=n.getValue(),o="";return t&&(o=Pt(t)?t.checked?"true":"false":t.value),t=o,t!==r?(n.setValue(t),!0):!1}function yn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var ba=/[\n"\\]/g;function Kt(t){return t.replace(ba,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Xi(t,n,r,o,u,f,x,b){t.name="",x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?t.type=x:t.removeAttribute("type"),n!=null?x==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+bt(n)):t.value!==""+bt(n)&&(t.value=""+bt(n)):x!=="submit"&&x!=="reset"||t.removeAttribute("value"),n!=null?Mn(t,x,bt(n)):r!=null?Mn(t,x,bt(r)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.name=""+bt(b):t.removeAttribute("name")}function Zt(t,n,r,o,u,f,x,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||r!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Qt(t);return}r=r!=null?""+bt(r):"",n=n!=null?""+bt(n):r,b||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=b?t.checked:!!o,t.defaultChecked=!!o,x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"&&(t.name=x),Qt(t)}function Mn(t,n,r){n==="number"&&yn(t.ownerDocument)===t||t.defaultValue===""+r||(t.defaultValue=""+r)}function vn(t,n,r,o){if(t=t.options,n){n={};for(var u=0;u<r.length;u++)n["$"+r[u]]=!0;for(r=0;r<t.length;r++)u=n.hasOwnProperty("$"+t[r].value),t[r].selected!==u&&(t[r].selected=u),u&&o&&(t[r].defaultSelected=!0)}else{for(r=""+bt(r),n=null,u=0;u<t.length;u++){if(t[u].value===r){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function En(t,n,r){if(n!=null&&(n=""+bt(n),n!==t.value&&(t.value=n),r==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=r!=null?""+bt(r):""}function Rn(t,n,r,o){if(n==null){if(o!=null){if(r!=null)throw Error(s(92));if(N(o)){if(1<o.length)throw Error(s(93));o=o[0]}r=o}r==null&&(r=""),n=r}r=bt(n),t.defaultValue=r,o=t.textContent,o===r&&o!==""&&o!==null&&(t.value=o),Qt(t)}function Bi(t,n){if(n){var r=t.firstChild;if(r&&r===t.lastChild&&r.nodeType===3){r.nodeValue=n;return}}t.textContent=n}var Yi=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Qd(t,n,r){var o=n.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,r):typeof r!="number"||r===0||Yi.has(n)?n==="float"?t.cssFloat=r:t[n]=(""+r).trim():t[n]=r+"px"}function qd(t,n,r){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,r!=null){for(var o in r)!r.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&r[u]!==o&&Qd(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&Qd(t,f,n[f])}function Kc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ex=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function il(t){return bx.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Wi(){}var Zc=null;function Jc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pr=null,Ir=null;function Kd(t){var n=T(t);if(n&&(t=n.stateNode)){var r=t[gn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Xi(t,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),n=r.name,r.type==="radio"&&n!=null){for(r=t;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Kt(""+n)+'"][type="radio"]'),n=0;n<r.length;n++){var o=r[n];if(o!==t&&o.form===t.form){var u=o[gn]||null;if(!u)throw Error(s(90));Xi(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<r.length;n++)o=r[n],o.form===t.form&&Tt(o)}break e;case"textarea":En(t,r.value,r.defaultValue);break e;case"select":n=r.value,n!=null&&vn(t,!!r.multiple,n,!1)}}}var jc=!1;function Zd(t,n,r){if(jc)return t(n,r);jc=!0;try{var o=t(n);return o}finally{if(jc=!1,(Pr!==null||Ir!==null)&&(Xl(),Pr&&(n=Pr,t=Ir,Ir=Pr=null,Kd(n),t)))for(n=0;n<t.length;n++)Kd(t[n])}}function Qs(t,n){var r=t.stateNode;if(r===null)return null;var o=r[gn]||null;if(o===null)return null;r=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(r&&typeof r!="function")throw Error(s(231,n,typeof r));return r}var Qi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$c=!1;if(Qi)try{var qs={};Object.defineProperty(qs,"passive",{get:function(){$c=!0}}),window.addEventListener("test",qs,qs),window.removeEventListener("test",qs,qs)}catch{$c=!1}var Ta=null,eu=null,al=null;function Jd(){if(al)return al;var t,n=eu,r=n.length,o,u="value"in Ta?Ta.value:Ta.textContent,f=u.length;for(t=0;t<r&&n[t]===u[t];t++);var x=r-t;for(o=1;o<=x&&n[r-o]===u[f-o];o++);return al=u.slice(t,1<o?1-o:void 0)}function rl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function sl(){return!0}function jd(){return!1}function Yn(t){function n(r,o,u,f,x){this._reactName=r,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=x,this.currentTarget=null;for(var b in t)t.hasOwnProperty(b)&&(r=t[b],this[b]=r?r(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?sl:jd,this.isPropagationStopped=jd,this}return g(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=sl)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=sl)},persist:function(){},isPersistent:sl}),n}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ol=Yn(lr),Ks=g({},lr,{view:0,detail:0}),Tx=Yn(Ks),tu,nu,Zs,ll=g({},Ks,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:au,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Zs&&(Zs&&t.type==="mousemove"?(tu=t.screenX-Zs.screenX,nu=t.screenY-Zs.screenY):nu=tu=0,Zs=t),tu)},movementY:function(t){return"movementY"in t?t.movementY:nu}}),$d=Yn(ll),Cx=g({},ll,{dataTransfer:0}),Dx=Yn(Cx),Rx=g({},Ks,{relatedTarget:0}),iu=Yn(Rx),wx=g({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ux=Yn(wx),Lx=g({},lr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Bx=Yn(Lx),Ox=g({},lr,{data:0}),ep=Yn(Ox),Nx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Px={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ix={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zx(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Ix[t])?!!n[t]:!1}function au(){return zx}var Fx=g({},Ks,{key:function(t){if(t.key){var n=Nx[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=rl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Px[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:au,charCode:function(t){return t.type==="keypress"?rl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?rl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Hx=Yn(Fx),Gx=g({},ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tp=Yn(Gx),Vx=g({},Ks,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:au}),kx=Yn(Vx),Xx=g({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yx=Yn(Xx),Wx=g({},ll,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Qx=Yn(Wx),qx=g({},lr,{newState:0,oldState:0}),Kx=Yn(qx),Zx=[9,13,27,32],ru=Qi&&"CompositionEvent"in window,Js=null;Qi&&"documentMode"in document&&(Js=document.documentMode);var Jx=Qi&&"TextEvent"in window&&!Js,np=Qi&&(!ru||Js&&8<Js&&11>=Js),ip=" ",ap=!1;function rp(t,n){switch(t){case"keyup":return Zx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var zr=!1;function jx(t,n){switch(t){case"compositionend":return sp(n);case"keypress":return n.which!==32?null:(ap=!0,ip);case"textInput":return t=n.data,t===ip&&ap?null:t;default:return null}}function $x(t,n){if(zr)return t==="compositionend"||!ru&&rp(t,n)?(t=Jd(),al=eu=Ta=null,zr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return np&&n.locale!=="ko"?null:n.data;default:return null}}var eA={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function op(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!eA[t.type]:n==="textarea"}function lp(t,n,r,o){Pr?Ir?Ir.push(o):Ir=[o]:Pr=o,n=Jl(n,"onChange"),0<n.length&&(r=new ol("onChange","change",null,r,o),t.push({event:r,listeners:n}))}var js=null,$s=null;function tA(t){Xm(t,0)}function cl(t){var n=Q(t);if(Tt(n))return t}function cp(t,n){if(t==="change")return n}var up=!1;if(Qi){var su;if(Qi){var ou="oninput"in document;if(!ou){var fp=document.createElement("div");fp.setAttribute("oninput","return;"),ou=typeof fp.oninput=="function"}su=ou}else su=!1;up=su&&(!document.documentMode||9<document.documentMode)}function hp(){js&&(js.detachEvent("onpropertychange",dp),$s=js=null)}function dp(t){if(t.propertyName==="value"&&cl($s)){var n=[];lp(n,$s,t,Jc(t)),Zd(tA,n)}}function nA(t,n,r){t==="focusin"?(hp(),js=n,$s=r,js.attachEvent("onpropertychange",dp)):t==="focusout"&&hp()}function iA(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return cl($s)}function aA(t,n){if(t==="click")return cl(n)}function rA(t,n){if(t==="input"||t==="change")return cl(n)}function sA(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ei=typeof Object.is=="function"?Object.is:sA;function eo(t,n){if(ei(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var r=Object.keys(t),o=Object.keys(n);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var u=r[o];if(!Ge.call(n,u)||!ei(t[u],n[u]))return!1}return!0}function pp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function mp(t,n){var r=pp(t);t=0;for(var o;r;){if(r.nodeType===3){if(o=t+r.textContent.length,t<=n&&o>=n)return{node:r,offset:n-t};t=o}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=pp(r)}}function gp(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?gp(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function vp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=yn(t.document);n instanceof t.HTMLIFrameElement;){try{var r=typeof n.contentWindow.location.href=="string"}catch{r=!1}if(r)t=n.contentWindow;else break;n=yn(t.document)}return n}function lu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var oA=Qi&&"documentMode"in document&&11>=document.documentMode,Fr=null,cu=null,to=null,uu=!1;function xp(t,n,r){var o=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;uu||Fr==null||Fr!==yn(o)||(o=Fr,"selectionStart"in o&&lu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),to&&eo(to,o)||(to=o,o=Jl(cu,"onSelect"),0<o.length&&(n=new ol("onSelect","select",null,n,r),t.push({event:n,listeners:o}),n.target=Fr)))}function cr(t,n){var r={};return r[t.toLowerCase()]=n.toLowerCase(),r["Webkit"+t]="webkit"+n,r["Moz"+t]="moz"+n,r}var Hr={animationend:cr("Animation","AnimationEnd"),animationiteration:cr("Animation","AnimationIteration"),animationstart:cr("Animation","AnimationStart"),transitionrun:cr("Transition","TransitionRun"),transitionstart:cr("Transition","TransitionStart"),transitioncancel:cr("Transition","TransitionCancel"),transitionend:cr("Transition","TransitionEnd")},fu={},Ap={};Qi&&(Ap=document.createElement("div").style,"AnimationEvent"in window||(delete Hr.animationend.animation,delete Hr.animationiteration.animation,delete Hr.animationstart.animation),"TransitionEvent"in window||delete Hr.transitionend.transition);function ur(t){if(fu[t])return fu[t];if(!Hr[t])return t;var n=Hr[t],r;for(r in n)if(n.hasOwnProperty(r)&&r in Ap)return fu[t]=n[r];return t}var _p=ur("animationend"),Sp=ur("animationiteration"),yp=ur("animationstart"),lA=ur("transitionrun"),cA=ur("transitionstart"),uA=ur("transitioncancel"),Mp=ur("transitionend"),Ep=new Map,hu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");hu.push("scrollEnd");function Ei(t,n){Ep.set(t,n),we(n,[t])}var ul=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},hi=[],Gr=0,du=0;function fl(){for(var t=Gr,n=du=Gr=0;n<t;){var r=hi[n];hi[n++]=null;var o=hi[n];hi[n++]=null;var u=hi[n];hi[n++]=null;var f=hi[n];if(hi[n++]=null,o!==null&&u!==null){var x=o.pending;x===null?u.next=u:(u.next=x.next,x.next=u),o.pending=u}f!==0&&bp(r,u,f)}}function hl(t,n,r,o){hi[Gr++]=t,hi[Gr++]=n,hi[Gr++]=r,hi[Gr++]=o,du|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function pu(t,n,r,o){return hl(t,n,r,o),dl(t)}function fr(t,n){return hl(t,null,null,n),dl(t)}function bp(t,n,r){t.lanes|=r;var o=t.alternate;o!==null&&(o.lanes|=r);for(var u=!1,f=t.return;f!==null;)f.childLanes|=r,o=f.alternate,o!==null&&(o.childLanes|=r),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-Ve(r),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=r|536870912),f):null}function dl(t){if(50<Eo)throw Eo=0,Ef=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Vr={};function fA(t,n,r,o){this.tag=t,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,n,r,o){return new fA(t,n,r,o)}function mu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qi(t,n){var r=t.alternate;return r===null?(r=ti(t.tag,n,t.key,t.mode),r.elementType=t.elementType,r.type=t.type,r.stateNode=t.stateNode,r.alternate=t,t.alternate=r):(r.pendingProps=n,r.type=t.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=t.flags&65011712,r.childLanes=t.childLanes,r.lanes=t.lanes,r.child=t.child,r.memoizedProps=t.memoizedProps,r.memoizedState=t.memoizedState,r.updateQueue=t.updateQueue,n=t.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},r.sibling=t.sibling,r.index=t.index,r.ref=t.ref,r.refCleanup=t.refCleanup,r}function Tp(t,n){t.flags&=65011714;var r=t.alternate;return r===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=r.childLanes,t.lanes=r.lanes,t.child=r.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=r.memoizedProps,t.memoizedState=r.memoizedState,t.updateQueue=r.updateQueue,t.type=r.type,n=r.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function pl(t,n,r,o,u,f){var x=0;if(o=t,typeof t=="function")mu(t)&&(x=1);else if(typeof t=="string")x=g_(t,r,Se.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case w:return t=ti(31,r,n,u),t.elementType=w,t.lanes=f,t;case C:return hr(r.children,u,f,n);case y:x=8,u|=24;break;case _:return t=ti(12,r,n,u|2),t.elementType=_,t.lanes=f,t;case Y:return t=ti(13,r,n,u),t.elementType=Y,t.lanes=f,t;case O:return t=ti(19,r,n,u),t.elementType=O,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:x=10;break e;case P:x=9;break e;case I:x=11;break e;case F:x=14;break e;case ie:x=16,o=null;break e}x=29,r=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=ti(x,r,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function hr(t,n,r,o){return t=ti(7,t,o,n),t.lanes=r,t}function gu(t,n,r){return t=ti(6,t,null,n),t.lanes=r,t}function Cp(t){var n=ti(18,null,null,0);return n.stateNode=t,n}function vu(t,n,r){return n=ti(4,t.children!==null?t.children:[],t.key,n),n.lanes=r,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Dp=new WeakMap;function di(t,n){if(typeof t=="object"&&t!==null){var r=Dp.get(t);return r!==void 0?r:(n={value:t,source:n,stack:It(n)},Dp.set(t,n),n)}return{value:t,source:n,stack:It(n)}}var kr=[],Xr=0,ml=null,no=0,pi=[],mi=0,Ca=null,Oi=1,Ni="";function Ki(t,n){kr[Xr++]=no,kr[Xr++]=ml,ml=t,no=n}function Rp(t,n,r){pi[mi++]=Oi,pi[mi++]=Ni,pi[mi++]=Ca,Ca=t;var o=Oi;t=Ni;var u=32-Ve(o)-1;o&=~(1<<u),r+=1;var f=32-Ve(n)+u;if(30<f){var x=u-u%5;f=(o&(1<<x)-1).toString(32),o>>=x,u-=x,Oi=1<<32-Ve(n)+u|r<<u|o,Ni=f+t}else Oi=1<<f|r<<u|o,Ni=t}function xu(t){t.return!==null&&(Ki(t,1),Rp(t,1,0))}function Au(t){for(;t===ml;)ml=kr[--Xr],kr[Xr]=null,no=kr[--Xr],kr[Xr]=null;for(;t===Ca;)Ca=pi[--mi],pi[mi]=null,Ni=pi[--mi],pi[mi]=null,Oi=pi[--mi],pi[mi]=null}function wp(t,n){pi[mi++]=Oi,pi[mi++]=Ni,pi[mi++]=Ca,Oi=n.id,Ni=n.overflow,Ca=t}var wn=null,Jt=null,Ct=!1,Da=null,gi=!1,_u=Error(s(519));function Ra(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw io(di(n,t)),_u}function Up(t){var n=t.stateNode,r=t.type,o=t.memoizedProps;switch(n[cn]=t,n[gn]=o,r){case"dialog":At("cancel",n),At("close",n);break;case"iframe":case"object":case"embed":At("load",n);break;case"video":case"audio":for(r=0;r<To.length;r++)At(To[r],n);break;case"source":At("error",n);break;case"img":case"image":case"link":At("error",n),At("load",n);break;case"details":At("toggle",n);break;case"input":At("invalid",n),Zt(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":At("invalid",n);break;case"textarea":At("invalid",n),Rn(n,o.value,o.defaultValue,o.children)}r=o.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||n.textContent===""+r||o.suppressHydrationWarning===!0||qm(n.textContent,r)?(o.popover!=null&&(At("beforetoggle",n),At("toggle",n)),o.onScroll!=null&&At("scroll",n),o.onScrollEnd!=null&&At("scrollend",n),o.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||Ra(t,!0)}function Lp(t){for(wn=t.return;wn;)switch(wn.tag){case 5:case 31:case 13:gi=!1;return;case 27:case 3:gi=!0;return;default:wn=wn.return}}function Yr(t){if(t!==wn)return!1;if(!Ct)return Lp(t),Ct=!0,!1;var n=t.tag,r;if((r=n!==3&&n!==27)&&((r=n===5)&&(r=t.type,r=!(r!=="form"&&r!=="button")||Ff(t.type,t.memoizedProps)),r=!r),r&&Jt&&Ra(t),Lp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Jt=ig(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Jt=ig(t)}else n===27?(n=Jt,ka(t.type)?(t=Xf,Xf=null,Jt=t):Jt=n):Jt=wn?xi(t.stateNode.nextSibling):null;return!0}function dr(){Jt=wn=null,Ct=!1}function Su(){var t=Da;return t!==null&&(Kn===null?Kn=t:Kn.push.apply(Kn,t),Da=null),t}function io(t){Da===null?Da=[t]:Da.push(t)}var yu=L(null),pr=null,Zi=null;function wa(t,n,r){pe(yu,n._currentValue),n._currentValue=r}function Ji(t){t._currentValue=yu.current,j(yu)}function Mu(t,n,r){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===r)break;t=t.return}}function Eu(t,n,r,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var x=u.child;f=f.firstContext;e:for(;f!==null;){var b=f;f=u;for(var G=0;G<n.length;G++)if(b.context===n[G]){f.lanes|=r,b=f.alternate,b!==null&&(b.lanes|=r),Mu(f.return,r,t),o||(x=null);break e}f=b.next}}else if(u.tag===18){if(x=u.return,x===null)throw Error(s(341));x.lanes|=r,f=x.alternate,f!==null&&(f.lanes|=r),Mu(x,r,t),x=null}else x=u.child;if(x!==null)x.return=u;else for(x=u;x!==null;){if(x===t){x=null;break}if(u=x.sibling,u!==null){u.return=x.return,x=u;break}x=x.return}u=x}}function Wr(t,n,r,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var x=u.alternate;if(x===null)throw Error(s(387));if(x=x.memoizedProps,x!==null){var b=u.type;ei(u.pendingProps.value,x.value)||(t!==null?t.push(b):t=[b])}}else if(u===ue.current){if(x=u.alternate,x===null)throw Error(s(387));x.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Uo):t=[Uo])}u=u.return}t!==null&&Eu(n,t,r,o),n.flags|=262144}function gl(t){for(t=t.firstContext;t!==null;){if(!ei(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function mr(t){pr=t,Zi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Un(t){return Bp(pr,t)}function vl(t,n){return pr===null&&mr(t),Bp(t,n)}function Bp(t,n){var r=n._currentValue;if(n={context:n,memoizedValue:r,next:null},Zi===null){if(t===null)throw Error(s(308));Zi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Zi=Zi.next=n;return r}var hA=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(r,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(r){return r()})}},dA=a.unstable_scheduleCallback,pA=a.unstable_NormalPriority,un={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function bu(){return{controller:new hA,data:new Map,refCount:0}}function ao(t){t.refCount--,t.refCount===0&&dA(pA,function(){t.controller.abort()})}var ro=null,Tu=0,Qr=0,qr=null;function mA(t,n){if(ro===null){var r=ro=[];Tu=0,Qr=wf(),qr={status:"pending",value:void 0,then:function(o){r.push(o)}}}return Tu++,n.then(Op,Op),n}function Op(){if(--Tu===0&&ro!==null){qr!==null&&(qr.status="fulfilled");var t=ro;ro=null,Qr=0,qr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function gA(t,n){var r=[],o={status:"pending",value:null,reason:null,then:function(u){r.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<r.length;u++)(0,r[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<r.length;u++)(0,r[u])(void 0)}),o}var Np=D.S;D.S=function(t,n){xm=M(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&mA(t,n),Np!==null&&Np(t,n)};var gr=L(null);function Cu(){var t=gr.current;return t!==null?t:qt.pooledCache}function xl(t,n){n===null?pe(gr,gr.current):pe(gr,n.pool)}function Pp(){var t=Cu();return t===null?null:{parent:un._currentValue,pool:t}}var Kr=Error(s(460)),Du=Error(s(474)),Al=Error(s(542)),_l={then:function(){}};function Ip(t){return t=t.status,t==="fulfilled"||t==="rejected"}function zp(t,n,r){switch(r=t[r],r===void 0?t.push(n):r!==n&&(n.then(Wi,Wi),n=r),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Hp(t),t;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(t=qt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Hp(t),t}throw xr=n,Kr}}function vr(t){try{var n=t._init;return n(t._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(xr=r,Kr):r}}var xr=null;function Fp(){if(xr===null)throw Error(s(459));var t=xr;return xr=null,t}function Hp(t){if(t===Kr||t===Al)throw Error(s(483))}var Zr=null,so=0;function Sl(t){var n=so;return so+=1,Zr===null&&(Zr=[]),zp(Zr,t,n)}function oo(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function yl(t,n){throw n.$$typeof===A?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Gp(t){function n(q,X){if(t){var ee=q.deletions;ee===null?(q.deletions=[X],q.flags|=16):ee.push(X)}}function r(q,X){if(!t)return null;for(;X!==null;)n(q,X),X=X.sibling;return null}function o(q){for(var X=new Map;q!==null;)q.key!==null?X.set(q.key,q):X.set(q.index,q),q=q.sibling;return X}function u(q,X){return q=qi(q,X),q.index=0,q.sibling=null,q}function f(q,X,ee){return q.index=ee,t?(ee=q.alternate,ee!==null?(ee=ee.index,ee<X?(q.flags|=67108866,X):ee):(q.flags|=67108866,X)):(q.flags|=1048576,X)}function x(q){return t&&q.alternate===null&&(q.flags|=67108866),q}function b(q,X,ee,ge){return X===null||X.tag!==6?(X=gu(ee,q.mode,ge),X.return=q,X):(X=u(X,ee),X.return=q,X)}function G(q,X,ee,ge){var Ze=ee.type;return Ze===C?me(q,X,ee.props.children,ge,ee.key):X!==null&&(X.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===ie&&vr(Ze)===X.type)?(X=u(X,ee.props),oo(X,ee),X.return=q,X):(X=pl(ee.type,ee.key,ee.props,null,q.mode,ge),oo(X,ee),X.return=q,X)}function ne(q,X,ee,ge){return X===null||X.tag!==4||X.stateNode.containerInfo!==ee.containerInfo||X.stateNode.implementation!==ee.implementation?(X=vu(ee,q.mode,ge),X.return=q,X):(X=u(X,ee.children||[]),X.return=q,X)}function me(q,X,ee,ge,Ze){return X===null||X.tag!==7?(X=hr(ee,q.mode,ge,Ze),X.return=q,X):(X=u(X,ee),X.return=q,X)}function xe(q,X,ee){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=gu(""+X,q.mode,ee),X.return=q,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case S:return ee=pl(X.type,X.key,X.props,null,q.mode,ee),oo(ee,X),ee.return=q,ee;case E:return X=vu(X,q.mode,ee),X.return=q,X;case ie:return X=vr(X),xe(q,X,ee)}if(N(X)||re(X))return X=hr(X,q.mode,ee,null),X.return=q,X;if(typeof X.then=="function")return xe(q,Sl(X),ee);if(X.$$typeof===U)return xe(q,vl(q,X),ee);yl(q,X)}return null}function se(q,X,ee,ge){var Ze=X!==null?X.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint")return Ze!==null?null:b(q,X,""+ee,ge);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case S:return ee.key===Ze?G(q,X,ee,ge):null;case E:return ee.key===Ze?ne(q,X,ee,ge):null;case ie:return ee=vr(ee),se(q,X,ee,ge)}if(N(ee)||re(ee))return Ze!==null?null:me(q,X,ee,ge,null);if(typeof ee.then=="function")return se(q,X,Sl(ee),ge);if(ee.$$typeof===U)return se(q,X,vl(q,ee),ge);yl(q,ee)}return null}function ce(q,X,ee,ge,Ze){if(typeof ge=="string"&&ge!==""||typeof ge=="number"||typeof ge=="bigint")return q=q.get(ee)||null,b(X,q,""+ge,Ze);if(typeof ge=="object"&&ge!==null){switch(ge.$$typeof){case S:return q=q.get(ge.key===null?ee:ge.key)||null,G(X,q,ge,Ze);case E:return q=q.get(ge.key===null?ee:ge.key)||null,ne(X,q,ge,Ze);case ie:return ge=vr(ge),ce(q,X,ee,ge,Ze)}if(N(ge)||re(ge))return q=q.get(ee)||null,me(X,q,ge,Ze,null);if(typeof ge.then=="function")return ce(q,X,ee,Sl(ge),Ze);if(ge.$$typeof===U)return ce(q,X,ee,vl(X,ge),Ze);yl(X,ge)}return null}function He(q,X,ee,ge){for(var Ze=null,Ut=null,ke=X,dt=X=0,yt=null;ke!==null&&dt<ee.length;dt++){ke.index>dt?(yt=ke,ke=null):yt=ke.sibling;var Lt=se(q,ke,ee[dt],ge);if(Lt===null){ke===null&&(ke=yt);break}t&&ke&&Lt.alternate===null&&n(q,ke),X=f(Lt,X,dt),Ut===null?Ze=Lt:Ut.sibling=Lt,Ut=Lt,ke=yt}if(dt===ee.length)return r(q,ke),Ct&&Ki(q,dt),Ze;if(ke===null){for(;dt<ee.length;dt++)ke=xe(q,ee[dt],ge),ke!==null&&(X=f(ke,X,dt),Ut===null?Ze=ke:Ut.sibling=ke,Ut=ke);return Ct&&Ki(q,dt),Ze}for(ke=o(ke);dt<ee.length;dt++)yt=ce(ke,q,dt,ee[dt],ge),yt!==null&&(t&&yt.alternate!==null&&ke.delete(yt.key===null?dt:yt.key),X=f(yt,X,dt),Ut===null?Ze=yt:Ut.sibling=yt,Ut=yt);return t&&ke.forEach(function(qa){return n(q,qa)}),Ct&&Ki(q,dt),Ze}function tt(q,X,ee,ge){if(ee==null)throw Error(s(151));for(var Ze=null,Ut=null,ke=X,dt=X=0,yt=null,Lt=ee.next();ke!==null&&!Lt.done;dt++,Lt=ee.next()){ke.index>dt?(yt=ke,ke=null):yt=ke.sibling;var qa=se(q,ke,Lt.value,ge);if(qa===null){ke===null&&(ke=yt);break}t&&ke&&qa.alternate===null&&n(q,ke),X=f(qa,X,dt),Ut===null?Ze=qa:Ut.sibling=qa,Ut=qa,ke=yt}if(Lt.done)return r(q,ke),Ct&&Ki(q,dt),Ze;if(ke===null){for(;!Lt.done;dt++,Lt=ee.next())Lt=xe(q,Lt.value,ge),Lt!==null&&(X=f(Lt,X,dt),Ut===null?Ze=Lt:Ut.sibling=Lt,Ut=Lt);return Ct&&Ki(q,dt),Ze}for(ke=o(ke);!Lt.done;dt++,Lt=ee.next())Lt=ce(ke,q,dt,Lt.value,ge),Lt!==null&&(t&&Lt.alternate!==null&&ke.delete(Lt.key===null?dt:Lt.key),X=f(Lt,X,dt),Ut===null?Ze=Lt:Ut.sibling=Lt,Ut=Lt);return t&&ke.forEach(function(C_){return n(q,C_)}),Ct&&Ki(q,dt),Ze}function kt(q,X,ee,ge){if(typeof ee=="object"&&ee!==null&&ee.type===C&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case S:e:{for(var Ze=ee.key;X!==null;){if(X.key===Ze){if(Ze=ee.type,Ze===C){if(X.tag===7){r(q,X.sibling),ge=u(X,ee.props.children),ge.return=q,q=ge;break e}}else if(X.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===ie&&vr(Ze)===X.type){r(q,X.sibling),ge=u(X,ee.props),oo(ge,ee),ge.return=q,q=ge;break e}r(q,X);break}else n(q,X);X=X.sibling}ee.type===C?(ge=hr(ee.props.children,q.mode,ge,ee.key),ge.return=q,q=ge):(ge=pl(ee.type,ee.key,ee.props,null,q.mode,ge),oo(ge,ee),ge.return=q,q=ge)}return x(q);case E:e:{for(Ze=ee.key;X!==null;){if(X.key===Ze)if(X.tag===4&&X.stateNode.containerInfo===ee.containerInfo&&X.stateNode.implementation===ee.implementation){r(q,X.sibling),ge=u(X,ee.children||[]),ge.return=q,q=ge;break e}else{r(q,X);break}else n(q,X);X=X.sibling}ge=vu(ee,q.mode,ge),ge.return=q,q=ge}return x(q);case ie:return ee=vr(ee),kt(q,X,ee,ge)}if(N(ee))return He(q,X,ee,ge);if(re(ee)){if(Ze=re(ee),typeof Ze!="function")throw Error(s(150));return ee=Ze.call(ee),tt(q,X,ee,ge)}if(typeof ee.then=="function")return kt(q,X,Sl(ee),ge);if(ee.$$typeof===U)return kt(q,X,vl(q,ee),ge);yl(q,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint"?(ee=""+ee,X!==null&&X.tag===6?(r(q,X.sibling),ge=u(X,ee),ge.return=q,q=ge):(r(q,X),ge=gu(ee,q.mode,ge),ge.return=q,q=ge),x(q)):r(q,X)}return function(q,X,ee,ge){try{so=0;var Ze=kt(q,X,ee,ge);return Zr=null,Ze}catch(ke){if(ke===Kr||ke===Al)throw ke;var Ut=ti(29,ke,null,q.mode);return Ut.lanes=ge,Ut.return=q,Ut}finally{}}}var Ar=Gp(!0),Vp=Gp(!1),Ua=!1;function Ru(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wu(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function La(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ba(t,n,r){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Nt&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=dl(t),bp(t,null,r),n}return hl(t,o,n,r),dl(t)}function lo(t,n,r){if(n=n.updateQueue,n!==null&&(n=n.shared,(r&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,r|=o,n.lanes=r,Vs(t,r)}}function Uu(t,n){var r=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var u=null,f=null;if(r=r.firstBaseUpdate,r!==null){do{var x={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};f===null?u=f=x:f=f.next=x,r=r.next}while(r!==null);f===null?u=f=n:f=f.next=n}else u=f=n;r={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=r;return}t=r.lastBaseUpdate,t===null?r.firstBaseUpdate=n:t.next=n,r.lastBaseUpdate=n}var Lu=!1;function co(){if(Lu){var t=qr;if(t!==null)throw t}}function uo(t,n,r,o){Lu=!1;var u=t.updateQueue;Ua=!1;var f=u.firstBaseUpdate,x=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var G=b,ne=G.next;G.next=null,x===null?f=ne:x.next=ne,x=G;var me=t.alternate;me!==null&&(me=me.updateQueue,b=me.lastBaseUpdate,b!==x&&(b===null?me.firstBaseUpdate=ne:b.next=ne,me.lastBaseUpdate=G))}if(f!==null){var xe=u.baseState;x=0,me=ne=G=null,b=f;do{var se=b.lane&-536870913,ce=se!==b.lane;if(ce?(St&se)===se:(o&se)===se){se!==0&&se===Qr&&(Lu=!0),me!==null&&(me=me.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});e:{var He=t,tt=b;se=n;var kt=r;switch(tt.tag){case 1:if(He=tt.payload,typeof He=="function"){xe=He.call(kt,xe,se);break e}xe=He;break e;case 3:He.flags=He.flags&-65537|128;case 0:if(He=tt.payload,se=typeof He=="function"?He.call(kt,xe,se):He,se==null)break e;xe=g({},xe,se);break e;case 2:Ua=!0}}se=b.callback,se!==null&&(t.flags|=64,ce&&(t.flags|=8192),ce=u.callbacks,ce===null?u.callbacks=[se]:ce.push(se))}else ce={lane:se,tag:b.tag,payload:b.payload,callback:b.callback,next:null},me===null?(ne=me=ce,G=xe):me=me.next=ce,x|=se;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;ce=b,b=ce.next,ce.next=null,u.lastBaseUpdate=ce,u.shared.pending=null}}while(!0);me===null&&(G=xe),u.baseState=G,u.firstBaseUpdate=ne,u.lastBaseUpdate=me,f===null&&(u.shared.lanes=0),za|=x,t.lanes=x,t.memoizedState=xe}}function kp(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Xp(t,n){var r=t.callbacks;if(r!==null)for(t.callbacks=null,t=0;t<r.length;t++)kp(r[t],n)}var Jr=L(null),Ml=L(0);function Yp(t,n){t=sa,pe(Ml,t),pe(Jr,n),sa=t|n.baseLanes}function Bu(){pe(Ml,sa),pe(Jr,Jr.current)}function Ou(){sa=Ml.current,j(Jr),j(Ml)}var ni=L(null),vi=null;function Oa(t){var n=t.alternate;pe(rn,rn.current&1),pe(ni,t),vi===null&&(n===null||Jr.current!==null||n.memoizedState!==null)&&(vi=t)}function Nu(t){pe(rn,rn.current),pe(ni,t),vi===null&&(vi=t)}function Wp(t){t.tag===22?(pe(rn,rn.current),pe(ni,t),vi===null&&(vi=t)):Na()}function Na(){pe(rn,rn.current),pe(ni,ni.current)}function ii(t){j(ni),vi===t&&(vi=null),j(rn)}var rn=L(0);function El(t){for(var n=t;n!==null;){if(n.tag===13){var r=n.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Vf(r)||kf(r)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ji=0,ft=null,Gt=null,fn=null,bl=!1,jr=!1,_r=!1,Tl=0,fo=0,$r=null,vA=0;function nn(){throw Error(s(321))}function Pu(t,n){if(n===null)return!1;for(var r=0;r<n.length&&r<t.length;r++)if(!ei(t[r],n[r]))return!1;return!0}function Iu(t,n,r,o,u,f){return ji=f,ft=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,D.H=t===null||t.memoizedState===null?R0:ju,_r=!1,f=r(o,u),_r=!1,jr&&(f=qp(n,r,o,u)),Qp(t),f}function Qp(t){D.H=mo;var n=Gt!==null&&Gt.next!==null;if(ji=0,fn=Gt=ft=null,bl=!1,fo=0,$r=null,n)throw Error(s(300));t===null||hn||(t=t.dependencies,t!==null&&gl(t)&&(hn=!0))}function qp(t,n,r,o){ft=t;var u=0;do{if(jr&&($r=null),fo=0,jr=!1,25<=u)throw Error(s(301));if(u+=1,fn=Gt=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}D.H=w0,f=n(r,o)}while(jr);return f}function xA(){var t=D.H,n=t.useState()[0];return n=typeof n.then=="function"?ho(n):n,t=t.useState()[0],(Gt!==null?Gt.memoizedState:null)!==t&&(ft.flags|=1024),n}function zu(){var t=Tl!==0;return Tl=0,t}function Fu(t,n,r){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~r}function Hu(t){if(bl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}bl=!1}ji=0,fn=Gt=ft=null,jr=!1,fo=Tl=0,$r=null}function Gn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?ft.memoizedState=fn=t:fn=fn.next=t,fn}function sn(){if(Gt===null){var t=ft.alternate;t=t!==null?t.memoizedState:null}else t=Gt.next;var n=fn===null?ft.memoizedState:fn.next;if(n!==null)fn=n,Gt=t;else{if(t===null)throw ft.alternate===null?Error(s(467)):Error(s(310));Gt=t,t={memoizedState:Gt.memoizedState,baseState:Gt.baseState,baseQueue:Gt.baseQueue,queue:Gt.queue,next:null},fn===null?ft.memoizedState=fn=t:fn=fn.next=t}return fn}function Cl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ho(t){var n=fo;return fo+=1,$r===null&&($r=[]),t=zp($r,t,n),n=ft,(fn===null?n.memoizedState:fn.next)===null&&(n=n.alternate,D.H=n===null||n.memoizedState===null?R0:ju),t}function Dl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ho(t);if(t.$$typeof===U)return Un(t)}throw Error(s(438,String(t)))}function Gu(t){var n=null,r=ft.updateQueue;if(r!==null&&(n=r.memoCache),n==null){var o=ft.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),r===null&&(r=Cl(),ft.updateQueue=r),r.memoCache=n,r=n.data[n.index],r===void 0)for(r=n.data[n.index]=Array(t),o=0;o<t;o++)r[o]=R;return n.index++,r}function $i(t,n){return typeof n=="function"?n(t):n}function Rl(t){var n=sn();return Vu(n,Gt,t)}function Vu(t,n,r){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=r;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var x=u.next;u.next=f.next,f.next=x}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var b=x=null,G=null,ne=n,me=!1;do{var xe=ne.lane&-536870913;if(xe!==ne.lane?(St&xe)===xe:(ji&xe)===xe){var se=ne.revertLane;if(se===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null}),xe===Qr&&(me=!0);else if((ji&se)===se){ne=ne.next,se===Qr&&(me=!0);continue}else xe={lane:0,revertLane:ne.revertLane,gesture:null,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null},G===null?(b=G=xe,x=f):G=G.next=xe,ft.lanes|=se,za|=se;xe=ne.action,_r&&r(f,xe),f=ne.hasEagerState?ne.eagerState:r(f,xe)}else se={lane:xe,revertLane:ne.revertLane,gesture:ne.gesture,action:ne.action,hasEagerState:ne.hasEagerState,eagerState:ne.eagerState,next:null},G===null?(b=G=se,x=f):G=G.next=se,ft.lanes|=xe,za|=xe;ne=ne.next}while(ne!==null&&ne!==n);if(G===null?x=f:G.next=b,!ei(f,t.memoizedState)&&(hn=!0,me&&(r=qr,r!==null)))throw r;t.memoizedState=f,t.baseState=x,t.baseQueue=G,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function ku(t){var n=sn(),r=n.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=t;var o=r.dispatch,u=r.pending,f=n.memoizedState;if(u!==null){r.pending=null;var x=u=u.next;do f=t(f,x.action),x=x.next;while(x!==u);ei(f,n.memoizedState)||(hn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),r.lastRenderedState=f}return[f,o]}function Kp(t,n,r){var o=ft,u=sn(),f=Ct;if(f){if(r===void 0)throw Error(s(407));r=r()}else r=n();var x=!ei((Gt||u).memoizedState,r);if(x&&(u.memoizedState=r,hn=!0),u=u.queue,Wu(jp.bind(null,o,u,t),[t]),u.getSnapshot!==n||x||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,es(9,{destroy:void 0},Jp.bind(null,o,u,r,n),null),qt===null)throw Error(s(349));f||(ji&127)!==0||Zp(o,n,r)}return r}function Zp(t,n,r){t.flags|=16384,t={getSnapshot:n,value:r},n=ft.updateQueue,n===null?(n=Cl(),ft.updateQueue=n,n.stores=[t]):(r=n.stores,r===null?n.stores=[t]:r.push(t))}function Jp(t,n,r,o){n.value=r,n.getSnapshot=o,$p(n)&&e0(t)}function jp(t,n,r){return r(function(){$p(n)&&e0(t)})}function $p(t){var n=t.getSnapshot;t=t.value;try{var r=n();return!ei(t,r)}catch{return!0}}function e0(t){var n=fr(t,2);n!==null&&Zn(n,t,2)}function Xu(t){var n=Gn();if(typeof t=="function"){var r=t;if(t=r(),_r){Qe(!0);try{r()}finally{Qe(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:t},n}function t0(t,n,r,o){return t.baseState=r,Vu(t,Gt,typeof o=="function"?o:$i)}function AA(t,n,r,o,u){if(Ll(t))throw Error(s(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(x){f.listeners.push(x)}};D.T!==null?r(!0):f.isTransition=!1,o(f),r=n.pending,r===null?(f.next=n.pending=f,n0(n,f)):(f.next=r.next,n.pending=r.next=f)}}function n0(t,n){var r=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=D.T,x={};D.T=x;try{var b=r(u,o),G=D.S;G!==null&&G(x,b),i0(t,n,b)}catch(ne){Yu(t,n,ne)}finally{f!==null&&x.types!==null&&(f.types=x.types),D.T=f}}else try{f=r(u,o),i0(t,n,f)}catch(ne){Yu(t,n,ne)}}function i0(t,n,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(o){a0(t,n,o)},function(o){return Yu(t,n,o)}):a0(t,n,r)}function a0(t,n,r){n.status="fulfilled",n.value=r,r0(n),t.state=r,n=t.pending,n!==null&&(r=n.next,r===n?t.pending=null:(r=r.next,n.next=r,n0(t,r)))}function Yu(t,n,r){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=r,r0(n),n=n.next;while(n!==o)}t.action=null}function r0(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function s0(t,n){return n}function o0(t,n){if(Ct){var r=qt.formState;if(r!==null){e:{var o=ft;if(Ct){if(Jt){t:{for(var u=Jt,f=gi;u.nodeType!==8;){if(!f){u=null;break t}if(u=xi(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Jt=xi(u.nextSibling),o=u.data==="F!";break e}}Ra(o)}o=!1}o&&(n=r[0])}}return r=Gn(),r.memoizedState=r.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:s0,lastRenderedState:n},r.queue=o,r=T0.bind(null,ft,o),o.dispatch=r,o=Xu(!1),f=Ju.bind(null,ft,!1,o.queue),o=Gn(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,r=AA.bind(null,ft,u,f,r),u.dispatch=r,o.memoizedState=t,[n,r,!1]}function l0(t){var n=sn();return c0(n,Gt,t)}function c0(t,n,r){if(n=Vu(t,n,s0)[0],t=Rl($i)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ho(n)}catch(x){throw x===Kr?Al:x}else o=n;n=sn();var u=n.queue,f=u.dispatch;return r!==n.memoizedState&&(ft.flags|=2048,es(9,{destroy:void 0},_A.bind(null,u,r),null)),[o,f,t]}function _A(t,n){t.action=n}function u0(t){var n=sn(),r=Gt;if(r!==null)return c0(n,r,t);sn(),n=n.memoizedState,r=sn();var o=r.queue.dispatch;return r.memoizedState=t,[n,o,!1]}function es(t,n,r,o){return t={tag:t,create:r,deps:o,inst:n,next:null},n=ft.updateQueue,n===null&&(n=Cl(),ft.updateQueue=n),r=n.lastEffect,r===null?n.lastEffect=t.next=t:(o=r.next,r.next=t,t.next=o,n.lastEffect=t),t}function f0(){return sn().memoizedState}function wl(t,n,r,o){var u=Gn();ft.flags|=t,u.memoizedState=es(1|n,{destroy:void 0},r,o===void 0?null:o)}function Ul(t,n,r,o){var u=sn();o=o===void 0?null:o;var f=u.memoizedState.inst;Gt!==null&&o!==null&&Pu(o,Gt.memoizedState.deps)?u.memoizedState=es(n,f,r,o):(ft.flags|=t,u.memoizedState=es(1|n,f,r,o))}function h0(t,n){wl(8390656,8,t,n)}function Wu(t,n){Ul(2048,8,t,n)}function SA(t){ft.flags|=4;var n=ft.updateQueue;if(n===null)n=Cl(),ft.updateQueue=n,n.events=[t];else{var r=n.events;r===null?n.events=[t]:r.push(t)}}function d0(t){var n=sn().memoizedState;return SA({ref:n,nextImpl:t}),function(){if((Nt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function p0(t,n){return Ul(4,2,t,n)}function m0(t,n){return Ul(4,4,t,n)}function g0(t,n){if(typeof n=="function"){t=t();var r=n(t);return function(){typeof r=="function"?r():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function v0(t,n,r){r=r!=null?r.concat([t]):null,Ul(4,4,g0.bind(null,n,t),r)}function Qu(){}function x0(t,n){var r=sn();n=n===void 0?null:n;var o=r.memoizedState;return n!==null&&Pu(n,o[1])?o[0]:(r.memoizedState=[t,n],t)}function A0(t,n){var r=sn();n=n===void 0?null:n;var o=r.memoizedState;if(n!==null&&Pu(n,o[1]))return o[0];if(o=t(),_r){Qe(!0);try{t()}finally{Qe(!1)}}return r.memoizedState=[o,n],o}function qu(t,n,r){return r===void 0||(ji&1073741824)!==0&&(St&261930)===0?t.memoizedState=n:(t.memoizedState=r,t=_m(),ft.lanes|=t,za|=t,r)}function _0(t,n,r,o){return ei(r,n)?r:Jr.current!==null?(t=qu(t,r,o),ei(t,n)||(hn=!0),t):(ji&42)===0||(ji&1073741824)!==0&&(St&261930)===0?(hn=!0,t.memoizedState=r):(t=_m(),ft.lanes|=t,za|=t,n)}function S0(t,n,r,o,u){var f=H.p;H.p=f!==0&&8>f?f:8;var x=D.T,b={};D.T=b,Ju(t,!1,n,r);try{var G=u(),ne=D.S;if(ne!==null&&ne(b,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var me=gA(G,o);po(t,n,me,si(t))}else po(t,n,o,si(t))}catch(xe){po(t,n,{then:function(){},status:"rejected",reason:xe},si())}finally{H.p=f,x!==null&&b.types!==null&&(x.types=b.types),D.T=x}}function yA(){}function Ku(t,n,r,o){if(t.tag!==5)throw Error(s(476));var u=y0(t).queue;S0(t,u,n,z,r===null?yA:function(){return M0(t),r(o)})}function y0(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:z,baseState:z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:z},next:null};var r={};return n.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:$i,lastRenderedState:r},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function M0(t){var n=y0(t);n.next===null&&(n=t.alternate.memoizedState),po(t,n.next.queue,{},si())}function Zu(){return Un(Uo)}function E0(){return sn().memoizedState}function b0(){return sn().memoizedState}function MA(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var r=si();t=La(r);var o=Ba(n,t,r);o!==null&&(Zn(o,n,r),lo(o,n,r)),n={cache:bu()},t.payload=n;return}n=n.return}}function EA(t,n,r){var o=si();r={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ll(t)?C0(n,r):(r=pu(t,n,r,o),r!==null&&(Zn(r,t,o),D0(r,n,o)))}function T0(t,n,r){var o=si();po(t,n,r,o)}function po(t,n,r,o){var u={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ll(t))C0(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var x=n.lastRenderedState,b=f(x,r);if(u.hasEagerState=!0,u.eagerState=b,ei(b,x))return hl(t,n,u,0),qt===null&&fl(),!1}catch{}finally{}if(r=pu(t,n,u,o),r!==null)return Zn(r,t,o),D0(r,n,o),!0}return!1}function Ju(t,n,r,o){if(o={lane:2,revertLane:wf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ll(t)){if(n)throw Error(s(479))}else n=pu(t,r,o,2),n!==null&&Zn(n,t,2)}function Ll(t){var n=t.alternate;return t===ft||n!==null&&n===ft}function C0(t,n){jr=bl=!0;var r=t.pending;r===null?n.next=n:(n.next=r.next,r.next=n),t.pending=n}function D0(t,n,r){if((r&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,r|=o,n.lanes=r,Vs(t,r)}}var mo={readContext:Un,use:Dl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};mo.useEffectEvent=nn;var R0={readContext:Un,use:Dl,useCallback:function(t,n){return Gn().memoizedState=[t,n===void 0?null:n],t},useContext:Un,useEffect:h0,useImperativeHandle:function(t,n,r){r=r!=null?r.concat([t]):null,wl(4194308,4,g0.bind(null,n,t),r)},useLayoutEffect:function(t,n){return wl(4194308,4,t,n)},useInsertionEffect:function(t,n){wl(4,2,t,n)},useMemo:function(t,n){var r=Gn();n=n===void 0?null:n;var o=t();if(_r){Qe(!0);try{t()}finally{Qe(!1)}}return r.memoizedState=[o,n],o},useReducer:function(t,n,r){var o=Gn();if(r!==void 0){var u=r(n);if(_r){Qe(!0);try{r(n)}finally{Qe(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=EA.bind(null,ft,t),[o.memoizedState,t]},useRef:function(t){var n=Gn();return t={current:t},n.memoizedState=t},useState:function(t){t=Xu(t);var n=t.queue,r=T0.bind(null,ft,n);return n.dispatch=r,[t.memoizedState,r]},useDebugValue:Qu,useDeferredValue:function(t,n){var r=Gn();return qu(r,t,n)},useTransition:function(){var t=Xu(!1);return t=S0.bind(null,ft,t.queue,!0,!1),Gn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,r){var o=ft,u=Gn();if(Ct){if(r===void 0)throw Error(s(407));r=r()}else{if(r=n(),qt===null)throw Error(s(349));(St&127)!==0||Zp(o,n,r)}u.memoizedState=r;var f={value:r,getSnapshot:n};return u.queue=f,h0(jp.bind(null,o,f,t),[t]),o.flags|=2048,es(9,{destroy:void 0},Jp.bind(null,o,f,r,n),null),r},useId:function(){var t=Gn(),n=qt.identifierPrefix;if(Ct){var r=Ni,o=Oi;r=(o&~(1<<32-Ve(o)-1)).toString(32)+r,n="_"+n+"R_"+r,r=Tl++,0<r&&(n+="H"+r.toString(32)),n+="_"}else r=vA++,n="_"+n+"r_"+r.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Zu,useFormState:o0,useActionState:o0,useOptimistic:function(t){var n=Gn();n.memoizedState=n.baseState=t;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=r,n=Ju.bind(null,ft,!0,r),r.dispatch=n,[t,n]},useMemoCache:Gu,useCacheRefresh:function(){return Gn().memoizedState=MA.bind(null,ft)},useEffectEvent:function(t){var n=Gn(),r={impl:t};return n.memoizedState=r,function(){if((Nt&2)!==0)throw Error(s(440));return r.impl.apply(void 0,arguments)}}},ju={readContext:Un,use:Dl,useCallback:x0,useContext:Un,useEffect:Wu,useImperativeHandle:v0,useInsertionEffect:p0,useLayoutEffect:m0,useMemo:A0,useReducer:Rl,useRef:f0,useState:function(){return Rl($i)},useDebugValue:Qu,useDeferredValue:function(t,n){var r=sn();return _0(r,Gt.memoizedState,t,n)},useTransition:function(){var t=Rl($i)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:ho(t),n]},useSyncExternalStore:Kp,useId:E0,useHostTransitionStatus:Zu,useFormState:l0,useActionState:l0,useOptimistic:function(t,n){var r=sn();return t0(r,Gt,t,n)},useMemoCache:Gu,useCacheRefresh:b0};ju.useEffectEvent=d0;var w0={readContext:Un,use:Dl,useCallback:x0,useContext:Un,useEffect:Wu,useImperativeHandle:v0,useInsertionEffect:p0,useLayoutEffect:m0,useMemo:A0,useReducer:ku,useRef:f0,useState:function(){return ku($i)},useDebugValue:Qu,useDeferredValue:function(t,n){var r=sn();return Gt===null?qu(r,t,n):_0(r,Gt.memoizedState,t,n)},useTransition:function(){var t=ku($i)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:ho(t),n]},useSyncExternalStore:Kp,useId:E0,useHostTransitionStatus:Zu,useFormState:u0,useActionState:u0,useOptimistic:function(t,n){var r=sn();return Gt!==null?t0(r,Gt,t,n):(r.baseState=t,[t,r.queue.dispatch])},useMemoCache:Gu,useCacheRefresh:b0};w0.useEffectEvent=d0;function $u(t,n,r,o){n=t.memoizedState,r=r(o,n),r=r==null?n:g({},n,r),t.memoizedState=r,t.lanes===0&&(t.updateQueue.baseState=r)}var ef={enqueueSetState:function(t,n,r){t=t._reactInternals;var o=si(),u=La(o);u.payload=n,r!=null&&(u.callback=r),n=Ba(t,u,o),n!==null&&(Zn(n,t,o),lo(n,t,o))},enqueueReplaceState:function(t,n,r){t=t._reactInternals;var o=si(),u=La(o);u.tag=1,u.payload=n,r!=null&&(u.callback=r),n=Ba(t,u,o),n!==null&&(Zn(n,t,o),lo(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var r=si(),o=La(r);o.tag=2,n!=null&&(o.callback=n),n=Ba(t,o,r),n!==null&&(Zn(n,t,r),lo(n,t,r))}};function U0(t,n,r,o,u,f,x){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,x):n.prototype&&n.prototype.isPureReactComponent?!eo(r,o)||!eo(u,f):!0}function L0(t,n,r,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(r,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(r,o),n.state!==t&&ef.enqueueReplaceState(n,n.state,null)}function Sr(t,n){var r=n;if("ref"in n){r={};for(var o in n)o!=="ref"&&(r[o]=n[o])}if(t=t.defaultProps){r===n&&(r=g({},r));for(var u in t)r[u]===void 0&&(r[u]=t[u])}return r}function B0(t){ul(t)}function O0(t){console.error(t)}function N0(t){ul(t)}function Bl(t,n){try{var r=t.onUncaughtError;r(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function P0(t,n,r){try{var o=t.onCaughtError;o(r.value,{componentStack:r.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function tf(t,n,r){return r=La(r),r.tag=3,r.payload={element:null},r.callback=function(){Bl(t,n)},r}function I0(t){return t=La(t),t.tag=3,t}function z0(t,n,r,o){var u=r.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){P0(n,r,o)}}var x=r.stateNode;x!==null&&typeof x.componentDidCatch=="function"&&(t.callback=function(){P0(n,r,o),typeof u!="function"&&(Fa===null?Fa=new Set([this]):Fa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function bA(t,n,r,o,u){if(r.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=r.alternate,n!==null&&Wr(n,r,u,!0),r=ni.current,r!==null){switch(r.tag){case 31:case 13:return vi===null?Yl():r.alternate===null&&an===0&&(an=3),r.flags&=-257,r.flags|=65536,r.lanes=u,o===_l?r.flags|=16384:(n=r.updateQueue,n===null?r.updateQueue=new Set([o]):n.add(o),Cf(t,o,u)),!1;case 22:return r.flags|=65536,o===_l?r.flags|=16384:(n=r.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},r.updateQueue=n):(r=n.retryQueue,r===null?n.retryQueue=new Set([o]):r.add(o)),Cf(t,o,u)),!1}throw Error(s(435,r.tag))}return Cf(t,o,u),Yl(),!1}if(Ct)return n=ni.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==_u&&(t=Error(s(422),{cause:o}),io(di(t,r)))):(o!==_u&&(n=Error(s(423),{cause:o}),io(di(n,r))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=di(o,r),u=tf(t.stateNode,o,u),Uu(t,u),an!==4&&(an=2)),!1;var f=Error(s(520),{cause:o});if(f=di(f,r),Mo===null?Mo=[f]:Mo.push(f),an!==4&&(an=2),n===null)return!0;o=di(o,r),r=n;do{switch(r.tag){case 3:return r.flags|=65536,t=u&-u,r.lanes|=t,t=tf(r.stateNode,o,t),Uu(r,t),!1;case 1:if(n=r.type,f=r.stateNode,(r.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Fa===null||!Fa.has(f))))return r.flags|=65536,u&=-u,r.lanes|=u,u=I0(u),z0(u,t,r,o),Uu(r,u),!1}r=r.return}while(r!==null);return!1}var nf=Error(s(461)),hn=!1;function Ln(t,n,r,o){n.child=t===null?Vp(n,null,r,o):Ar(n,t.child,r,o)}function F0(t,n,r,o,u){r=r.render;var f=n.ref;if("ref"in o){var x={};for(var b in o)b!=="ref"&&(x[b]=o[b])}else x=o;return mr(n),o=Iu(t,n,r,x,f,u),b=zu(),t!==null&&!hn?(Fu(t,n,u),ea(t,n,u)):(Ct&&b&&xu(n),n.flags|=1,Ln(t,n,o,u),n.child)}function H0(t,n,r,o,u){if(t===null){var f=r.type;return typeof f=="function"&&!mu(f)&&f.defaultProps===void 0&&r.compare===null?(n.tag=15,n.type=f,G0(t,n,f,o,u)):(t=pl(r.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!ff(t,u)){var x=f.memoizedProps;if(r=r.compare,r=r!==null?r:eo,r(x,o)&&t.ref===n.ref)return ea(t,n,u)}return n.flags|=1,t=qi(f,o),t.ref=n.ref,t.return=n,n.child=t}function G0(t,n,r,o,u){if(t!==null){var f=t.memoizedProps;if(eo(f,o)&&t.ref===n.ref)if(hn=!1,n.pendingProps=o=f,ff(t,u))(t.flags&131072)!==0&&(hn=!0);else return n.lanes=t.lanes,ea(t,n,u)}return af(t,n,r,o,u)}function V0(t,n,r,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|r:r,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return k0(t,n,f,r,o)}if((r&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&xl(n,f!==null?f.cachePool:null),f!==null?Yp(n,f):Bu(),Wp(n);else return o=n.lanes=536870912,k0(t,n,f!==null?f.baseLanes|r:r,r,o)}else f!==null?(xl(n,f.cachePool),Yp(n,f),Na(),n.memoizedState=null):(t!==null&&xl(n,null),Bu(),Na());return Ln(t,n,u,r),n.child}function go(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function k0(t,n,r,o,u){var f=Cu();return f=f===null?null:{parent:un._currentValue,pool:f},n.memoizedState={baseLanes:r,cachePool:f},t!==null&&xl(n,null),Bu(),Wp(n),t!==null&&Wr(t,n,o,!0),n.childLanes=u,null}function Ol(t,n){return n=Pl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function X0(t,n,r){return Ar(n,t.child,null,r),t=Ol(n,n.pendingProps),t.flags|=2,ii(n),n.memoizedState=null,t}function TA(t,n,r){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ct){if(o.mode==="hidden")return t=Ol(n,o),n.lanes=536870912,go(null,t);if(Nu(n),(t=Jt)?(t=ng(t,gi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ca!==null?{id:Oi,overflow:Ni}:null,retryLane:536870912,hydrationErrors:null},r=Cp(t),r.return=n,n.child=r,wn=n,Jt=null)):t=null,t===null)throw Ra(n);return n.lanes=536870912,null}return Ol(n,o)}var f=t.memoizedState;if(f!==null){var x=f.dehydrated;if(Nu(n),u)if(n.flags&256)n.flags&=-257,n=X0(t,n,r);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(hn||Wr(t,n,r,!1),u=(r&t.childLanes)!==0,hn||u){if(o=qt,o!==null&&(x=ks(o,r),x!==0&&x!==f.retryLane))throw f.retryLane=x,fr(t,x),Zn(o,t,x),nf;Yl(),n=X0(t,n,r)}else t=f.treeContext,Jt=xi(x.nextSibling),wn=n,Ct=!0,Da=null,gi=!1,t!==null&&wp(n,t),n=Ol(n,o),n.flags|=4096;return n}return t=qi(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Nl(t,n){var r=n.ref;if(r===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(s(284));(t===null||t.ref!==r)&&(n.flags|=4194816)}}function af(t,n,r,o,u){return mr(n),r=Iu(t,n,r,o,void 0,u),o=zu(),t!==null&&!hn?(Fu(t,n,u),ea(t,n,u)):(Ct&&o&&xu(n),n.flags|=1,Ln(t,n,r,u),n.child)}function Y0(t,n,r,o,u,f){return mr(n),n.updateQueue=null,r=qp(n,o,r,u),Qp(t),o=zu(),t!==null&&!hn?(Fu(t,n,f),ea(t,n,f)):(Ct&&o&&xu(n),n.flags|=1,Ln(t,n,r,f),n.child)}function W0(t,n,r,o,u){if(mr(n),n.stateNode===null){var f=Vr,x=r.contextType;typeof x=="object"&&x!==null&&(f=Un(x)),f=new r(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=ef,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Ru(n),x=r.contextType,f.context=typeof x=="object"&&x!==null?Un(x):Vr,f.state=n.memoizedState,x=r.getDerivedStateFromProps,typeof x=="function"&&($u(n,r,x,o),f.state=n.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(x=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),x!==f.state&&ef.enqueueReplaceState(f,f.state,null),uo(n,o,f,u),co(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var b=n.memoizedProps,G=Sr(r,b);f.props=G;var ne=f.context,me=r.contextType;x=Vr,typeof me=="object"&&me!==null&&(x=Un(me));var xe=r.getDerivedStateFromProps;me=typeof xe=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,me||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||ne!==x)&&L0(n,f,o,x),Ua=!1;var se=n.memoizedState;f.state=se,uo(n,o,f,u),co(),ne=n.memoizedState,b||se!==ne||Ua?(typeof xe=="function"&&($u(n,r,xe,o),ne=n.memoizedState),(G=Ua||U0(n,r,G,o,se,ne,x))?(me||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ne),f.props=o,f.state=ne,f.context=x,o=G):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,wu(t,n),x=n.memoizedProps,me=Sr(r,x),f.props=me,xe=n.pendingProps,se=f.context,ne=r.contextType,G=Vr,typeof ne=="object"&&ne!==null&&(G=Un(ne)),b=r.getDerivedStateFromProps,(ne=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(x!==xe||se!==G)&&L0(n,f,o,G),Ua=!1,se=n.memoizedState,f.state=se,uo(n,o,f,u),co();var ce=n.memoizedState;x!==xe||se!==ce||Ua||t!==null&&t.dependencies!==null&&gl(t.dependencies)?(typeof b=="function"&&($u(n,r,b,o),ce=n.memoizedState),(me=Ua||U0(n,r,me,o,se,ce,G)||t!==null&&t.dependencies!==null&&gl(t.dependencies))?(ne||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ce,G),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ce,G)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||x===t.memoizedProps&&se===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||x===t.memoizedProps&&se===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ce),f.props=o,f.state=ce,f.context=G,o=me):(typeof f.componentDidUpdate!="function"||x===t.memoizedProps&&se===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||x===t.memoizedProps&&se===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,Nl(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,r=o&&typeof r.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=Ar(n,t.child,null,u),n.child=Ar(n,null,r,u)):Ln(t,n,r,u),n.memoizedState=f.state,t=n.child):t=ea(t,n,u),t}function Q0(t,n,r,o){return dr(),n.flags|=256,Ln(t,n,r,o),n.child}var rf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function sf(t){return{baseLanes:t,cachePool:Pp()}}function of(t,n,r){return t=t!==null?t.childLanes&~r:0,n&&(t|=ri),t}function q0(t,n,r){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,x;if((x=f)||(x=t!==null&&t.memoizedState===null?!1:(rn.current&2)!==0),x&&(u=!0,n.flags&=-129),x=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ct){if(u?Oa(n):Na(),(t=Jt)?(t=ng(t,gi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ca!==null?{id:Oi,overflow:Ni}:null,retryLane:536870912,hydrationErrors:null},r=Cp(t),r.return=n,n.child=r,wn=n,Jt=null)):t=null,t===null)throw Ra(n);return kf(t)?n.lanes=32:n.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Na(),u=n.mode,b=Pl({mode:"hidden",children:b},u),o=hr(o,u,r,null),b.return=n,o.return=n,b.sibling=o,n.child=b,o=n.child,o.memoizedState=sf(r),o.childLanes=of(t,x,r),n.memoizedState=rf,go(null,o)):(Oa(n),lf(n,b))}var G=t.memoizedState;if(G!==null&&(b=G.dehydrated,b!==null)){if(f)n.flags&256?(Oa(n),n.flags&=-257,n=cf(t,n,r)):n.memoizedState!==null?(Na(),n.child=t.child,n.flags|=128,n=null):(Na(),b=o.fallback,u=n.mode,o=Pl({mode:"visible",children:o.children},u),b=hr(b,u,r,null),b.flags|=2,o.return=n,b.return=n,o.sibling=b,n.child=o,Ar(n,t.child,null,r),o=n.child,o.memoizedState=sf(r),o.childLanes=of(t,x,r),n.memoizedState=rf,n=go(null,o));else if(Oa(n),kf(b)){if(x=b.nextSibling&&b.nextSibling.dataset,x)var ne=x.dgst;x=ne,o=Error(s(419)),o.stack="",o.digest=x,io({value:o,source:null,stack:null}),n=cf(t,n,r)}else if(hn||Wr(t,n,r,!1),x=(r&t.childLanes)!==0,hn||x){if(x=qt,x!==null&&(o=ks(x,r),o!==0&&o!==G.retryLane))throw G.retryLane=o,fr(t,o),Zn(x,t,o),nf;Vf(b)||Yl(),n=cf(t,n,r)}else Vf(b)?(n.flags|=192,n.child=t.child,n=null):(t=G.treeContext,Jt=xi(b.nextSibling),wn=n,Ct=!0,Da=null,gi=!1,t!==null&&wp(n,t),n=lf(n,o.children),n.flags|=4096);return n}return u?(Na(),b=o.fallback,u=n.mode,G=t.child,ne=G.sibling,o=qi(G,{mode:"hidden",children:o.children}),o.subtreeFlags=G.subtreeFlags&65011712,ne!==null?b=qi(ne,b):(b=hr(b,u,r,null),b.flags|=2),b.return=n,o.return=n,o.sibling=b,n.child=o,go(null,o),o=n.child,b=t.child.memoizedState,b===null?b=sf(r):(u=b.cachePool,u!==null?(G=un._currentValue,u=u.parent!==G?{parent:G,pool:G}:u):u=Pp(),b={baseLanes:b.baseLanes|r,cachePool:u}),o.memoizedState=b,o.childLanes=of(t,x,r),n.memoizedState=rf,go(t.child,o)):(Oa(n),r=t.child,t=r.sibling,r=qi(r,{mode:"visible",children:o.children}),r.return=n,r.sibling=null,t!==null&&(x=n.deletions,x===null?(n.deletions=[t],n.flags|=16):x.push(t)),n.child=r,n.memoizedState=null,r)}function lf(t,n){return n=Pl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Pl(t,n){return t=ti(22,t,null,n),t.lanes=0,t}function cf(t,n,r){return Ar(n,t.child,null,r),t=lf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function K0(t,n,r){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Mu(t.return,n,r)}function uf(t,n,r,o,u,f){var x=t.memoizedState;x===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:u,treeForkCount:f}:(x.isBackwards=n,x.rendering=null,x.renderingStartTime=0,x.last=o,x.tail=r,x.tailMode=u,x.treeForkCount=f)}function Z0(t,n,r){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var x=rn.current,b=(x&2)!==0;if(b?(x=x&1|2,n.flags|=128):x&=1,pe(rn,x),Ln(t,n,o,r),o=Ct?no:0,!b&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&K0(t,r,n);else if(t.tag===19)K0(t,r,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(r=n.child,u=null;r!==null;)t=r.alternate,t!==null&&El(t)===null&&(u=r),r=r.sibling;r=u,r===null?(u=n.child,n.child=null):(u=r.sibling,r.sibling=null),uf(n,!1,u,r,f,o);break;case"backwards":case"unstable_legacy-backwards":for(r=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&El(t)===null){n.child=u;break}t=u.sibling,u.sibling=r,r=u,u=t}uf(n,!0,r,null,f,o);break;case"together":uf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ea(t,n,r){if(t!==null&&(n.dependencies=t.dependencies),za|=n.lanes,(r&n.childLanes)===0)if(t!==null){if(Wr(t,n,r,!1),(r&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,r=qi(t,t.pendingProps),n.child=r,r.return=n;t.sibling!==null;)t=t.sibling,r=r.sibling=qi(t,t.pendingProps),r.return=n;r.sibling=null}return n.child}function ff(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&gl(t)))}function CA(t,n,r){switch(n.tag){case 3:Te(n,n.stateNode.containerInfo),wa(n,un,t.memoizedState.cache),dr();break;case 27:case 5:Xe(n);break;case 4:Te(n,n.stateNode.containerInfo);break;case 10:wa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Nu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Oa(n),n.flags|=128,null):(r&n.child.childLanes)!==0?q0(t,n,r):(Oa(n),t=ea(t,n,r),t!==null?t.sibling:null);Oa(n);break;case 19:var u=(t.flags&128)!==0;if(o=(r&n.childLanes)!==0,o||(Wr(t,n,r,!1),o=(r&n.childLanes)!==0),u){if(o)return Z0(t,n,r);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),pe(rn,rn.current),o)break;return null;case 22:return n.lanes=0,V0(t,n,r,n.pendingProps);case 24:wa(n,un,t.memoizedState.cache)}return ea(t,n,r)}function J0(t,n,r){if(t!==null)if(t.memoizedProps!==n.pendingProps)hn=!0;else{if(!ff(t,r)&&(n.flags&128)===0)return hn=!1,CA(t,n,r);hn=(t.flags&131072)!==0}else hn=!1,Ct&&(n.flags&1048576)!==0&&Rp(n,no,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=vr(n.elementType),n.type=t,typeof t=="function")mu(t)?(o=Sr(t,o),n.tag=1,n=W0(null,n,t,o,r)):(n.tag=0,n=af(null,n,t,o,r));else{if(t!=null){var u=t.$$typeof;if(u===I){n.tag=11,n=F0(null,n,t,o,r);break e}else if(u===F){n.tag=14,n=H0(null,n,t,o,r);break e}}throw n=$(t)||t,Error(s(306,n,""))}}return n;case 0:return af(t,n,n.type,n.pendingProps,r);case 1:return o=n.type,u=Sr(o,n.pendingProps),W0(t,n,o,u,r);case 3:e:{if(Te(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,wu(t,n),uo(n,o,null,r);var x=n.memoizedState;if(o=x.cache,wa(n,un,o),o!==f.cache&&Eu(n,[un],r,!0),co(),o=x.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:x.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Q0(t,n,o,r);break e}else if(o!==u){u=di(Error(s(424)),n),io(u),n=Q0(t,n,o,r);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Jt=xi(t.firstChild),wn=n,Ct=!0,Da=null,gi=!0,r=Vp(n,null,o,r),n.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(dr(),o===u){n=ea(t,n,r);break e}Ln(t,n,o,r)}n=n.child}return n;case 26:return Nl(t,n),t===null?(r=lg(n.type,null,n.pendingProps,null))?n.memoizedState=r:Ct||(r=n.type,t=n.pendingProps,o=jl(J.current).createElement(r),o[cn]=n,o[gn]=t,Bn(o,r,t),ae(o),n.stateNode=o):n.memoizedState=lg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Xe(n),t===null&&Ct&&(o=n.stateNode=rg(n.type,n.pendingProps,J.current),wn=n,gi=!0,u=Jt,ka(n.type)?(Xf=u,Jt=xi(o.firstChild)):Jt=u),Ln(t,n,n.pendingProps.children,r),Nl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ct&&((u=o=Jt)&&(o=i_(o,n.type,n.pendingProps,gi),o!==null?(n.stateNode=o,wn=n,Jt=xi(o.firstChild),gi=!1,u=!0):u=!1),u||Ra(n)),Xe(n),u=n.type,f=n.pendingProps,x=t!==null?t.memoizedProps:null,o=f.children,Ff(u,f)?o=null:x!==null&&Ff(u,x)&&(n.flags|=32),n.memoizedState!==null&&(u=Iu(t,n,xA,null,null,r),Uo._currentValue=u),Nl(t,n),Ln(t,n,o,r),n.child;case 6:return t===null&&Ct&&((t=r=Jt)&&(r=a_(r,n.pendingProps,gi),r!==null?(n.stateNode=r,wn=n,Jt=null,t=!0):t=!1),t||Ra(n)),null;case 13:return q0(t,n,r);case 4:return Te(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Ar(n,null,o,r):Ln(t,n,o,r),n.child;case 11:return F0(t,n,n.type,n.pendingProps,r);case 7:return Ln(t,n,n.pendingProps,r),n.child;case 8:return Ln(t,n,n.pendingProps.children,r),n.child;case 12:return Ln(t,n,n.pendingProps.children,r),n.child;case 10:return o=n.pendingProps,wa(n,n.type,o.value),Ln(t,n,o.children,r),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,mr(n),u=Un(u),o=o(u),n.flags|=1,Ln(t,n,o,r),n.child;case 14:return H0(t,n,n.type,n.pendingProps,r);case 15:return G0(t,n,n.type,n.pendingProps,r);case 19:return Z0(t,n,r);case 31:return TA(t,n,r);case 22:return V0(t,n,r,n.pendingProps);case 24:return mr(n),o=Un(un),t===null?(u=Cu(),u===null&&(u=qt,f=bu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=r),u=f),n.memoizedState={parent:o,cache:u},Ru(n),wa(n,un,u)):((t.lanes&r)!==0&&(wu(t,n),uo(n,null,null,r),co()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),wa(n,un,o)):(o=f.cache,wa(n,un,o),o!==u.cache&&Eu(n,[un],r,!0))),Ln(t,n,n.pendingProps.children,r),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ta(t){t.flags|=4}function hf(t,n,r,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(Em())t.flags|=8192;else throw xr=_l,Du}else t.flags&=-16777217}function j0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!dg(n))if(Em())t.flags|=8192;else throw xr=_l,Du}function Il(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Ht():536870912,t.lanes|=n,as|=n)}function vo(t,n){if(!Ct)switch(t.tailMode){case"hidden":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t.tail=null:r.sibling=null;break;case"collapsed":r=t.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function jt(t){var n=t.alternate!==null&&t.alternate.child===t.child,r=0,o=0;if(n)for(var u=t.child;u!==null;)r|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)r|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=r,n}function DA(t,n,r){var o=n.pendingProps;switch(Au(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return jt(n),null;case 1:return jt(n),null;case 3:return r=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Ji(un),Ne(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Yr(n)?ta(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Su())),jt(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(ta(n),f!==null?(jt(n),j0(n,f)):(jt(n),hf(n,u,null,o,r))):f?f!==t.memoizedState?(ta(n),jt(n),j0(n,f)):(jt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ta(n),jt(n),hf(n,u,t,o,r)),null;case 27:if(st(n),r=J.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ta(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return jt(n),null}t=Se.current,Yr(n)?Up(n):(t=rg(u,o,r),n.stateNode=t,ta(n))}return jt(n),null;case 5:if(st(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ta(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return jt(n),null}if(f=Se.current,Yr(n))Up(n);else{var x=jl(J.current);switch(f){case 1:f=x.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=x.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=x.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?x.createElement("select",{is:o.is}):x.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?x.createElement(u,{is:o.is}):x.createElement(u)}}f[cn]=n,f[gn]=o;e:for(x=n.child;x!==null;){if(x.tag===5||x.tag===6)f.appendChild(x.stateNode);else if(x.tag!==4&&x.tag!==27&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===n)break e;for(;x.sibling===null;){if(x.return===null||x.return===n)break e;x=x.return}x.sibling.return=x.return,x=x.sibling}n.stateNode=f;e:switch(Bn(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ta(n)}}return jt(n),hf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,r),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ta(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=J.current,Yr(n)){if(t=n.stateNode,r=n.memoizedProps,o=null,u=wn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[cn]=n,t=!!(t.nodeValue===r||o!==null&&o.suppressHydrationWarning===!0||qm(t.nodeValue,r)),t||Ra(n,!0)}else t=jl(t).createTextNode(o),t[cn]=n,n.stateNode=t}return jt(n),null;case 31:if(r=n.memoizedState,t===null||t.memoizedState!==null){if(o=Yr(n),r!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[cn]=n}else dr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;jt(n),t=!1}else r=Su(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),t=!0;if(!t)return n.flags&256?(ii(n),n):(ii(n),null);if((n.flags&128)!==0)throw Error(s(558))}return jt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Yr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[cn]=n}else dr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;jt(n),u=!1}else u=Su(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ii(n),n):(ii(n),null)}return ii(n),(n.flags&128)!==0?(n.lanes=r,n):(r=o!==null,t=t!==null&&t.memoizedState!==null,r&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),r!==t&&r&&(n.child.flags|=8192),Il(n,n.updateQueue),jt(n),null);case 4:return Ne(),t===null&&Of(n.stateNode.containerInfo),jt(n),null;case 10:return Ji(n.type),jt(n),null;case 19:if(j(rn),o=n.memoizedState,o===null)return jt(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)vo(o,!1);else{if(an!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=El(t),f!==null){for(n.flags|=128,vo(o,!1),t=f.updateQueue,n.updateQueue=t,Il(n,t),n.subtreeFlags=0,t=r,r=n.child;r!==null;)Tp(r,t),r=r.sibling;return pe(rn,rn.current&1|2),Ct&&Ki(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&M()>Vl&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304)}else{if(!u)if(t=El(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Il(n,t),vo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!Ct)return jt(n),null}else 2*M()-o.renderingStartTime>Vl&&r!==536870912&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=M(),t.sibling=null,r=rn.current,pe(rn,u?r&1|2:r&1),Ct&&Ki(n,o.treeForkCount),t):(jt(n),null);case 22:case 23:return ii(n),Ou(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(r&536870912)!==0&&(n.flags&128)===0&&(jt(n),n.subtreeFlags&6&&(n.flags|=8192)):jt(n),r=n.updateQueue,r!==null&&Il(n,r.retryQueue),r=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==r&&(n.flags|=2048),t!==null&&j(gr),null;case 24:return r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Ji(un),jt(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function RA(t,n){switch(Au(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Ji(un),Ne(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return st(n),null;case 31:if(n.memoizedState!==null){if(ii(n),n.alternate===null)throw Error(s(340));dr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ii(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));dr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return j(rn),null;case 4:return Ne(),null;case 10:return Ji(n.type),null;case 22:case 23:return ii(n),Ou(),t!==null&&j(gr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Ji(un),null;case 25:return null;default:return null}}function $0(t,n){switch(Au(n),n.tag){case 3:Ji(un),Ne();break;case 26:case 27:case 5:st(n);break;case 4:Ne();break;case 31:n.memoizedState!==null&&ii(n);break;case 13:ii(n);break;case 19:j(rn);break;case 10:Ji(n.type);break;case 22:case 23:ii(n),Ou(),t!==null&&j(gr);break;case 24:Ji(un)}}function xo(t,n){try{var r=n.updateQueue,o=r!==null?r.lastEffect:null;if(o!==null){var u=o.next;r=u;do{if((r.tag&t)===t){o=void 0;var f=r.create,x=r.inst;o=f(),x.destroy=o}r=r.next}while(r!==u)}}catch(b){Ft(n,n.return,b)}}function Pa(t,n,r){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var x=o.inst,b=x.destroy;if(b!==void 0){x.destroy=void 0,u=n;var G=r,ne=b;try{ne()}catch(me){Ft(u,G,me)}}}o=o.next}while(o!==f)}}catch(me){Ft(n,n.return,me)}}function em(t){var n=t.updateQueue;if(n!==null){var r=t.stateNode;try{Xp(n,r)}catch(o){Ft(t,t.return,o)}}}function tm(t,n,r){r.props=Sr(t.type,t.memoizedProps),r.state=t.memoizedState;try{r.componentWillUnmount()}catch(o){Ft(t,n,o)}}function Ao(t,n){try{var r=t.ref;if(r!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof r=="function"?t.refCleanup=r(o):r.current=o}}catch(u){Ft(t,n,u)}}function Pi(t,n){var r=t.ref,o=t.refCleanup;if(r!==null)if(typeof o=="function")try{o()}catch(u){Ft(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(u){Ft(t,n,u)}else r.current=null}function nm(t){var n=t.type,r=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":r.autoFocus&&o.focus();break e;case"img":r.src?o.src=r.src:r.srcSet&&(o.srcset=r.srcSet)}}catch(u){Ft(t,t.return,u)}}function df(t,n,r){try{var o=t.stateNode;JA(o,t.type,r,n),o[gn]=n}catch(u){Ft(t,t.return,u)}}function im(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ka(t.type)||t.tag===4}function pf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||im(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ka(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function mf(t,n,r){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(t,n):(n=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,n.appendChild(t),r=r._reactRootContainer,r!=null||n.onclick!==null||(n.onclick=Wi));else if(o!==4&&(o===27&&ka(t.type)&&(r=t.stateNode,n=null),t=t.child,t!==null))for(mf(t,n,r),t=t.sibling;t!==null;)mf(t,n,r),t=t.sibling}function zl(t,n,r){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?r.insertBefore(t,n):r.appendChild(t);else if(o!==4&&(o===27&&ka(t.type)&&(r=t.stateNode),t=t.child,t!==null))for(zl(t,n,r),t=t.sibling;t!==null;)zl(t,n,r),t=t.sibling}function am(t){var n=t.stateNode,r=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Bn(n,o,r),n[cn]=t,n[gn]=r}catch(f){Ft(t,t.return,f)}}var na=!1,dn=!1,gf=!1,rm=typeof WeakSet=="function"?WeakSet:Set,bn=null;function wA(t,n){if(t=t.containerInfo,If=rc,t=vp(t),lu(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else e:{r=(r=t.ownerDocument)&&r.defaultView||window;var o=r.getSelection&&r.getSelection();if(o&&o.rangeCount!==0){r=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{r.nodeType,f.nodeType}catch{r=null;break e}var x=0,b=-1,G=-1,ne=0,me=0,xe=t,se=null;t:for(;;){for(var ce;xe!==r||u!==0&&xe.nodeType!==3||(b=x+u),xe!==f||o!==0&&xe.nodeType!==3||(G=x+o),xe.nodeType===3&&(x+=xe.nodeValue.length),(ce=xe.firstChild)!==null;)se=xe,xe=ce;for(;;){if(xe===t)break t;if(se===r&&++ne===u&&(b=x),se===f&&++me===o&&(G=x),(ce=xe.nextSibling)!==null)break;xe=se,se=xe.parentNode}xe=ce}r=b===-1||G===-1?null:{start:b,end:G}}else r=null}r=r||{start:0,end:0}}else r=null;for(zf={focusedElem:t,selectionRange:r},rc=!1,bn=n;bn!==null;)if(n=bn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,bn=t;else for(;bn!==null;){switch(n=bn,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(r=0;r<t.length;r++)u=t[r],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,r=n,u=f.memoizedProps,f=f.memoizedState,o=r.stateNode;try{var He=Sr(r.type,u);t=o.getSnapshotBeforeUpdate(He,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(tt){Ft(r,r.return,tt)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,r=t.nodeType,r===9)Gf(t);else if(r===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Gf(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,bn=t;break}bn=n.return}}function sm(t,n,r){var o=r.flags;switch(r.tag){case 0:case 11:case 15:aa(t,r),o&4&&xo(5,r);break;case 1:if(aa(t,r),o&4)if(t=r.stateNode,n===null)try{t.componentDidMount()}catch(x){Ft(r,r.return,x)}else{var u=Sr(r.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(x){Ft(r,r.return,x)}}o&64&&em(r),o&512&&Ao(r,r.return);break;case 3:if(aa(t,r),o&64&&(t=r.updateQueue,t!==null)){if(n=null,r.child!==null)switch(r.child.tag){case 27:case 5:n=r.child.stateNode;break;case 1:n=r.child.stateNode}try{Xp(t,n)}catch(x){Ft(r,r.return,x)}}break;case 27:n===null&&o&4&&am(r);case 26:case 5:aa(t,r),n===null&&o&4&&nm(r),o&512&&Ao(r,r.return);break;case 12:aa(t,r);break;case 31:aa(t,r),o&4&&cm(t,r);break;case 13:aa(t,r),o&4&&um(t,r),o&64&&(t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(r=FA.bind(null,r),r_(t,r))));break;case 22:if(o=r.memoizedState!==null||na,!o){n=n!==null&&n.memoizedState!==null||dn,u=na;var f=dn;na=o,(dn=n)&&!f?ra(t,r,(r.subtreeFlags&8772)!==0):aa(t,r),na=u,dn=f}break;case 30:break;default:aa(t,r)}}function om(t){var n=t.alternate;n!==null&&(t.alternate=null,om(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Ws(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tn=null,Wn=!1;function ia(t,n,r){for(r=r.child;r!==null;)lm(t,n,r),r=r.sibling}function lm(t,n,r){if(Ee&&typeof Ee.onCommitFiberUnmount=="function")try{Ee.onCommitFiberUnmount(ye,r)}catch{}switch(r.tag){case 26:dn||Pi(r,n),ia(t,n,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:dn||Pi(r,n);var o=tn,u=Wn;ka(r.type)&&(tn=r.stateNode,Wn=!1),ia(t,n,r),Do(r.stateNode),tn=o,Wn=u;break;case 5:dn||Pi(r,n);case 6:if(o=tn,u=Wn,tn=null,ia(t,n,r),tn=o,Wn=u,tn!==null)if(Wn)try{(tn.nodeType===9?tn.body:tn.nodeName==="HTML"?tn.ownerDocument.body:tn).removeChild(r.stateNode)}catch(f){Ft(r,n,f)}else try{tn.removeChild(r.stateNode)}catch(f){Ft(r,n,f)}break;case 18:tn!==null&&(Wn?(t=tn,eg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,r.stateNode),hs(t)):eg(tn,r.stateNode));break;case 4:o=tn,u=Wn,tn=r.stateNode.containerInfo,Wn=!0,ia(t,n,r),tn=o,Wn=u;break;case 0:case 11:case 14:case 15:Pa(2,r,n),dn||Pa(4,r,n),ia(t,n,r);break;case 1:dn||(Pi(r,n),o=r.stateNode,typeof o.componentWillUnmount=="function"&&tm(r,n,o)),ia(t,n,r);break;case 21:ia(t,n,r);break;case 22:dn=(o=dn)||r.memoizedState!==null,ia(t,n,r),dn=o;break;default:ia(t,n,r)}}function cm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{hs(t)}catch(r){Ft(n,n.return,r)}}}function um(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{hs(t)}catch(r){Ft(n,n.return,r)}}function UA(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new rm),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new rm),n;default:throw Error(s(435,t.tag))}}function Fl(t,n){var r=UA(t);n.forEach(function(o){if(!r.has(o)){r.add(o);var u=HA.bind(null,t,o);o.then(u,u)}})}function Qn(t,n){var r=n.deletions;if(r!==null)for(var o=0;o<r.length;o++){var u=r[o],f=t,x=n,b=x;e:for(;b!==null;){switch(b.tag){case 27:if(ka(b.type)){tn=b.stateNode,Wn=!1;break e}break;case 5:tn=b.stateNode,Wn=!1;break e;case 3:case 4:tn=b.stateNode.containerInfo,Wn=!0;break e}b=b.return}if(tn===null)throw Error(s(160));lm(f,x,u),tn=null,Wn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)fm(n,t),n=n.sibling}var bi=null;function fm(t,n){var r=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Qn(n,t),qn(t),o&4&&(Pa(3,t,t.return),xo(3,t),Pa(5,t,t.return));break;case 1:Qn(n,t),qn(t),o&512&&(dn||r===null||Pi(r,r.return)),o&64&&na&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(r=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=r===null?o:r.concat(o))));break;case 26:var u=bi;if(Qn(n,t),qn(t),o&512&&(dn||r===null||Pi(r,r.return)),o&4){var f=r!==null?r.memoizedState:null;if(o=t.memoizedState,r===null)if(o===null)if(t.stateNode===null){e:{o=t.type,r=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[or]||f[cn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Bn(f,o,r),f[cn]=t,ae(f),o=f;break e;case"link":var x=fg("link","href",u).get(o+(r.href||""));if(x){for(var b=0;b<x.length;b++)if(f=x[b],f.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&f.getAttribute("rel")===(r.rel==null?null:r.rel)&&f.getAttribute("title")===(r.title==null?null:r.title)&&f.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){x.splice(b,1);break t}}f=u.createElement(o),Bn(f,o,r),u.head.appendChild(f);break;case"meta":if(x=fg("meta","content",u).get(o+(r.content||""))){for(b=0;b<x.length;b++)if(f=x[b],f.getAttribute("content")===(r.content==null?null:""+r.content)&&f.getAttribute("name")===(r.name==null?null:r.name)&&f.getAttribute("property")===(r.property==null?null:r.property)&&f.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&f.getAttribute("charset")===(r.charSet==null?null:r.charSet)){x.splice(b,1);break t}}f=u.createElement(o),Bn(f,o,r),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[cn]=t,ae(f),o=f}t.stateNode=o}else hg(u,t.type,t.stateNode);else t.stateNode=ug(u,o,t.memoizedProps);else f!==o?(f===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):f.count--,o===null?hg(u,t.type,t.stateNode):ug(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&df(t,t.memoizedProps,r.memoizedProps)}break;case 27:Qn(n,t),qn(t),o&512&&(dn||r===null||Pi(r,r.return)),r!==null&&o&4&&df(t,t.memoizedProps,r.memoizedProps);break;case 5:if(Qn(n,t),qn(t),o&512&&(dn||r===null||Pi(r,r.return)),t.flags&32){u=t.stateNode;try{Bi(u,"")}catch(He){Ft(t,t.return,He)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,df(t,u,r!==null?r.memoizedProps:u)),o&1024&&(gf=!0);break;case 6:if(Qn(n,t),qn(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,r=t.stateNode;try{r.nodeValue=o}catch(He){Ft(t,t.return,He)}}break;case 3:if(tc=null,u=bi,bi=$l(n.containerInfo),Qn(n,t),bi=u,qn(t),o&4&&r!==null&&r.memoizedState.isDehydrated)try{hs(n.containerInfo)}catch(He){Ft(t,t.return,He)}gf&&(gf=!1,hm(t));break;case 4:o=bi,bi=$l(t.stateNode.containerInfo),Qn(n,t),qn(t),bi=o;break;case 12:Qn(n,t),qn(t);break;case 31:Qn(n,t),qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Fl(t,o)));break;case 13:Qn(n,t),qn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Gl=M()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Fl(t,o)));break;case 22:u=t.memoizedState!==null;var G=r!==null&&r.memoizedState!==null,ne=na,me=dn;if(na=ne||u,dn=me||G,Qn(n,t),dn=me,na=ne,qn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(r===null||G||na||dn||yr(t)),r=null,n=t;;){if(n.tag===5||n.tag===26){if(r===null){G=r=n;try{if(f=G.stateNode,u)x=f.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none";else{b=G.stateNode;var xe=G.memoizedProps.style,se=xe!=null&&xe.hasOwnProperty("display")?xe.display:null;b.style.display=se==null||typeof se=="boolean"?"":(""+se).trim()}}catch(He){Ft(G,G.return,He)}}}else if(n.tag===6){if(r===null){G=n;try{G.stateNode.nodeValue=u?"":G.memoizedProps}catch(He){Ft(G,G.return,He)}}}else if(n.tag===18){if(r===null){G=n;try{var ce=G.stateNode;u?tg(ce,!0):tg(G.stateNode,!1)}catch(He){Ft(G,G.return,He)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;r===n&&(r=null),n=n.return}r===n&&(r=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(r=o.retryQueue,r!==null&&(o.retryQueue=null,Fl(t,r))));break;case 19:Qn(n,t),qn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Fl(t,o)));break;case 30:break;case 21:break;default:Qn(n,t),qn(t)}}function qn(t){var n=t.flags;if(n&2){try{for(var r,o=t.return;o!==null;){if(im(o)){r=o;break}o=o.return}if(r==null)throw Error(s(160));switch(r.tag){case 27:var u=r.stateNode,f=pf(t);zl(t,f,u);break;case 5:var x=r.stateNode;r.flags&32&&(Bi(x,""),r.flags&=-33);var b=pf(t);zl(t,b,x);break;case 3:case 4:var G=r.stateNode.containerInfo,ne=pf(t);mf(t,ne,G);break;default:throw Error(s(161))}}catch(me){Ft(t,t.return,me)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function hm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;hm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function aa(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)sm(t,n.alternate,n),n=n.sibling}function yr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Pa(4,n,n.return),yr(n);break;case 1:Pi(n,n.return);var r=n.stateNode;typeof r.componentWillUnmount=="function"&&tm(n,n.return,r),yr(n);break;case 27:Do(n.stateNode);case 26:case 5:Pi(n,n.return),yr(n);break;case 22:n.memoizedState===null&&yr(n);break;case 30:yr(n);break;default:yr(n)}t=t.sibling}}function ra(t,n,r){for(r=r&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,x=f.flags;switch(f.tag){case 0:case 11:case 15:ra(u,f,r),xo(4,f);break;case 1:if(ra(u,f,r),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ne){Ft(o,o.return,ne)}if(o=f,u=o.updateQueue,u!==null){var b=o.stateNode;try{var G=u.shared.hiddenCallbacks;if(G!==null)for(u.shared.hiddenCallbacks=null,u=0;u<G.length;u++)kp(G[u],b)}catch(ne){Ft(o,o.return,ne)}}r&&x&64&&em(f),Ao(f,f.return);break;case 27:am(f);case 26:case 5:ra(u,f,r),r&&o===null&&x&4&&nm(f),Ao(f,f.return);break;case 12:ra(u,f,r);break;case 31:ra(u,f,r),r&&x&4&&cm(u,f);break;case 13:ra(u,f,r),r&&x&4&&um(u,f);break;case 22:f.memoizedState===null&&ra(u,f,r),Ao(f,f.return);break;case 30:break;default:ra(u,f,r)}n=n.sibling}}function vf(t,n){var r=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==r&&(t!=null&&t.refCount++,r!=null&&ao(r))}function xf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ao(t))}function Ti(t,n,r,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)dm(t,n,r,o),n=n.sibling}function dm(t,n,r,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ti(t,n,r,o),u&2048&&xo(9,n);break;case 1:Ti(t,n,r,o);break;case 3:Ti(t,n,r,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ao(t)));break;case 12:if(u&2048){Ti(t,n,r,o),t=n.stateNode;try{var f=n.memoizedProps,x=f.id,b=f.onPostCommit;typeof b=="function"&&b(x,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(G){Ft(n,n.return,G)}}else Ti(t,n,r,o);break;case 31:Ti(t,n,r,o);break;case 13:Ti(t,n,r,o);break;case 23:break;case 22:f=n.stateNode,x=n.alternate,n.memoizedState!==null?f._visibility&2?Ti(t,n,r,o):_o(t,n):f._visibility&2?Ti(t,n,r,o):(f._visibility|=2,ts(t,n,r,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&vf(x,n);break;case 24:Ti(t,n,r,o),u&2048&&xf(n.alternate,n);break;default:Ti(t,n,r,o)}}function ts(t,n,r,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,x=n,b=r,G=o,ne=x.flags;switch(x.tag){case 0:case 11:case 15:ts(f,x,b,G,u),xo(8,x);break;case 23:break;case 22:var me=x.stateNode;x.memoizedState!==null?me._visibility&2?ts(f,x,b,G,u):_o(f,x):(me._visibility|=2,ts(f,x,b,G,u)),u&&ne&2048&&vf(x.alternate,x);break;case 24:ts(f,x,b,G,u),u&&ne&2048&&xf(x.alternate,x);break;default:ts(f,x,b,G,u)}n=n.sibling}}function _o(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var r=t,o=n,u=o.flags;switch(o.tag){case 22:_o(r,o),u&2048&&vf(o.alternate,o);break;case 24:_o(r,o),u&2048&&xf(o.alternate,o);break;default:_o(r,o)}n=n.sibling}}var So=8192;function ns(t,n,r){if(t.subtreeFlags&So)for(t=t.child;t!==null;)pm(t,n,r),t=t.sibling}function pm(t,n,r){switch(t.tag){case 26:ns(t,n,r),t.flags&So&&t.memoizedState!==null&&v_(r,bi,t.memoizedState,t.memoizedProps);break;case 5:ns(t,n,r);break;case 3:case 4:var o=bi;bi=$l(t.stateNode.containerInfo),ns(t,n,r),bi=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=So,So=16777216,ns(t,n,r),So=o):ns(t,n,r));break;default:ns(t,n,r)}}function mm(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function yo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];bn=o,vm(o,t)}mm(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)gm(t),t=t.sibling}function gm(t){switch(t.tag){case 0:case 11:case 15:yo(t),t.flags&2048&&Pa(9,t,t.return);break;case 3:yo(t);break;case 12:yo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Hl(t)):yo(t);break;default:yo(t)}}function Hl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];bn=o,vm(o,t)}mm(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Pa(8,n,n.return),Hl(n);break;case 22:r=n.stateNode,r._visibility&2&&(r._visibility&=-3,Hl(n));break;default:Hl(n)}t=t.sibling}}function vm(t,n){for(;bn!==null;){var r=bn;switch(r.tag){case 0:case 11:case 15:Pa(8,r,n);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var o=r.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ao(r.memoizedState.cache)}if(o=r.child,o!==null)o.return=r,bn=o;else e:for(r=t;bn!==null;){o=bn;var u=o.sibling,f=o.return;if(om(o),o===r){bn=null;break e}if(u!==null){u.return=f,bn=u;break e}bn=f}}}var LA={getCacheForType:function(t){var n=Un(un),r=n.data.get(t);return r===void 0&&(r=t(),n.data.set(t,r)),r},cacheSignal:function(){return Un(un).controller.signal}},BA=typeof WeakMap=="function"?WeakMap:Map,Nt=0,qt=null,xt=null,St=0,zt=0,ai=null,Ia=!1,is=!1,Af=!1,sa=0,an=0,za=0,Mr=0,_f=0,ri=0,as=0,Mo=null,Kn=null,Sf=!1,Gl=0,xm=0,Vl=1/0,kl=null,Fa=null,xn=0,Ha=null,rs=null,oa=0,yf=0,Mf=null,Am=null,Eo=0,Ef=null;function si(){return(Nt&2)!==0&&St!==0?St&-St:D.T!==null?wf():Xs()}function _m(){if(ri===0)if((St&536870912)===0||Ct){var t=Ce;Ce<<=1,(Ce&3932160)===0&&(Ce=262144),ri=t}else ri=536870912;return t=ni.current,t!==null&&(t.flags|=32),ri}function Zn(t,n,r){(t===qt&&(zt===2||zt===9)||t.cancelPendingCommit!==null)&&(ss(t,0),Ga(t,St,ri,!1)),Pn(t,r),((Nt&2)===0||t!==qt)&&(t===qt&&((Nt&2)===0&&(Mr|=r),an===4&&Ga(t,St,ri,!1)),Ii(t))}function Sm(t,n,r){if((Nt&6)!==0)throw Error(s(327));var o=!r&&(n&127)===0&&(n&t.expiredLanes)===0||ze(t,n),u=o?PA(t,n):Tf(t,n,!0),f=o;do{if(u===0){is&&!o&&Ga(t,n,0,!1);break}else{if(r=t.current.alternate,f&&!OA(r)){u=Tf(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var x=0;else x=t.pendingLanes&-536870913,x=x!==0?x:x&536870912?536870912:0;if(x!==0){n=x;e:{var b=t;u=Mo;var G=b.current.memoizedState.isDehydrated;if(G&&(ss(b,x).flags|=256),x=Tf(b,x,!1),x!==2){if(Af&&!G){b.errorRecoveryDisabledLanes|=f,Mr|=f,u=4;break e}f=Kn,Kn=u,f!==null&&(Kn===null?Kn=f:Kn.push.apply(Kn,f))}u=x}if(f=!1,u!==2)continue}}if(u===1){ss(t,0),Ga(t,n,0,!0);break}e:{switch(o=t,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ga(o,n,ri,!Ia);break e;case 2:Kn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Gl+300-M(),10<u)){if(Ga(o,n,ri,!Ia),Ae(o,0,!0)!==0)break e;oa=n,o.timeoutHandle=jm(ym.bind(null,o,r,Kn,kl,Sf,n,ri,Mr,as,Ia,f,"Throttled",-0,0),u);break e}ym(o,r,Kn,kl,Sf,n,ri,Mr,as,Ia,f,null,-0,0)}}break}while(!0);Ii(t)}function ym(t,n,r,o,u,f,x,b,G,ne,me,xe,se,ce){if(t.timeoutHandle=-1,xe=n.subtreeFlags,xe&8192||(xe&16785408)===16785408){xe={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},pm(n,f,xe);var He=(f&62914560)===f?Gl-M():(f&4194048)===f?xm-M():0;if(He=x_(xe,He),He!==null){oa=f,t.cancelPendingCommit=He(wm.bind(null,t,n,f,r,o,u,x,b,G,me,xe,null,se,ce)),Ga(t,f,x,!ne);return}}wm(t,n,f,r,o,u,x,b,G)}function OA(t){for(var n=t;;){var r=n.tag;if((r===0||r===11||r===15)&&n.flags&16384&&(r=n.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var o=0;o<r.length;o++){var u=r[o],f=u.getSnapshot;u=u.value;try{if(!ei(f(),u))return!1}catch{return!1}}if(r=n.child,n.subtreeFlags&16384&&r!==null)r.return=n,n=r;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ga(t,n,r,o){n&=~_f,n&=~Mr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-Ve(u),x=1<<f;o[f]=-1,u&=~x}r!==0&&tl(t,r,n)}function Xl(){return(Nt&6)===0?(bo(0),!1):!0}function bf(){if(xt!==null){if(zt===0)var t=xt.return;else t=xt,Zi=pr=null,Hu(t),Zr=null,so=0,t=xt;for(;t!==null;)$0(t.alternate,t),t=t.return;xt=null}}function ss(t,n){var r=t.timeoutHandle;r!==-1&&(t.timeoutHandle=-1,e_(r)),r=t.cancelPendingCommit,r!==null&&(t.cancelPendingCommit=null,r()),oa=0,bf(),qt=t,xt=r=qi(t.current,null),St=n,zt=0,ai=null,Ia=!1,is=ze(t,n),Af=!1,as=ri=_f=Mr=za=an=0,Kn=Mo=null,Sf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Ve(o),f=1<<u;n|=t[u],o&=~f}return sa=n,fl(),r}function Mm(t,n){ft=null,D.H=mo,n===Kr||n===Al?(n=Fp(),zt=3):n===Du?(n=Fp(),zt=4):zt=n===nf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ai=n,xt===null&&(an=1,Bl(t,di(n,t.current)))}function Em(){var t=ni.current;return t===null?!0:(St&4194048)===St?vi===null:(St&62914560)===St||(St&536870912)!==0?t===vi:!1}function bm(){var t=D.H;return D.H=mo,t===null?mo:t}function Tm(){var t=D.A;return D.A=LA,t}function Yl(){an=4,Ia||(St&4194048)!==St&&ni.current!==null||(is=!0),(za&134217727)===0&&(Mr&134217727)===0||qt===null||Ga(qt,St,ri,!1)}function Tf(t,n,r){var o=Nt;Nt|=2;var u=bm(),f=Tm();(qt!==t||St!==n)&&(kl=null,ss(t,n)),n=!1;var x=an;e:do try{if(zt!==0&&xt!==null){var b=xt,G=ai;switch(zt){case 8:bf(),x=6;break e;case 3:case 2:case 9:case 6:ni.current===null&&(n=!0);var ne=zt;if(zt=0,ai=null,os(t,b,G,ne),r&&is){x=0;break e}break;default:ne=zt,zt=0,ai=null,os(t,b,G,ne)}}NA(),x=an;break}catch(me){Mm(t,me)}while(!0);return n&&t.shellSuspendCounter++,Zi=pr=null,Nt=o,D.H=u,D.A=f,xt===null&&(qt=null,St=0,fl()),x}function NA(){for(;xt!==null;)Cm(xt)}function PA(t,n){var r=Nt;Nt|=2;var o=bm(),u=Tm();qt!==t||St!==n?(kl=null,Vl=M()+500,ss(t,n)):is=ze(t,n);e:do try{if(zt!==0&&xt!==null){n=xt;var f=ai;t:switch(zt){case 1:zt=0,ai=null,os(t,n,f,1);break;case 2:case 9:if(Ip(f)){zt=0,ai=null,Dm(n);break}n=function(){zt!==2&&zt!==9||qt!==t||(zt=7),Ii(t)},f.then(n,n);break e;case 3:zt=7;break e;case 4:zt=5;break e;case 7:Ip(f)?(zt=0,ai=null,Dm(n)):(zt=0,ai=null,os(t,n,f,7));break;case 5:var x=null;switch(xt.tag){case 26:x=xt.memoizedState;case 5:case 27:var b=xt;if(x?dg(x):b.stateNode.complete){zt=0,ai=null;var G=b.sibling;if(G!==null)xt=G;else{var ne=b.return;ne!==null?(xt=ne,Wl(ne)):xt=null}break t}}zt=0,ai=null,os(t,n,f,5);break;case 6:zt=0,ai=null,os(t,n,f,6);break;case 8:bf(),an=6;break e;default:throw Error(s(462))}}IA();break}catch(me){Mm(t,me)}while(!0);return Zi=pr=null,D.H=o,D.A=u,Nt=r,xt!==null?0:(qt=null,St=0,fl(),an)}function IA(){for(;xt!==null&&!ot();)Cm(xt)}function Cm(t){var n=J0(t.alternate,t,sa);t.memoizedProps=t.pendingProps,n===null?Wl(t):xt=n}function Dm(t){var n=t,r=n.alternate;switch(n.tag){case 15:case 0:n=Y0(r,n,n.pendingProps,n.type,void 0,St);break;case 11:n=Y0(r,n,n.pendingProps,n.type.render,n.ref,St);break;case 5:Hu(n);default:$0(r,n),n=xt=Tp(n,sa),n=J0(r,n,sa)}t.memoizedProps=t.pendingProps,n===null?Wl(t):xt=n}function os(t,n,r,o){Zi=pr=null,Hu(n),Zr=null,so=0;var u=n.return;try{if(bA(t,u,n,r,St)){an=1,Bl(t,di(r,t.current)),xt=null;return}}catch(f){if(u!==null)throw xt=u,f;an=1,Bl(t,di(r,t.current)),xt=null;return}n.flags&32768?(Ct||o===1?t=!0:is||(St&536870912)!==0?t=!1:(Ia=t=!0,(o===2||o===9||o===3||o===6)&&(o=ni.current,o!==null&&o.tag===13&&(o.flags|=16384))),Rm(n,t)):Wl(n)}function Wl(t){var n=t;do{if((n.flags&32768)!==0){Rm(n,Ia);return}t=n.return;var r=DA(n.alternate,n,sa);if(r!==null){xt=r;return}if(n=n.sibling,n!==null){xt=n;return}xt=n=t}while(n!==null);an===0&&(an=5)}function Rm(t,n){do{var r=RA(t.alternate,t);if(r!==null){r.flags&=32767,xt=r;return}if(r=t.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!n&&(t=t.sibling,t!==null)){xt=t;return}xt=t=r}while(t!==null);an=6,xt=null}function wm(t,n,r,o,u,f,x,b,G){t.cancelPendingCommit=null;do Ql();while(xn!==0);if((Nt&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=du,jn(t,r,f,x,b,G),t===qt&&(xt=qt=null,St=0),rs=n,Ha=t,oa=r,yf=f,Mf=u,Am=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,GA(de,function(){return Nm(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=D.T,D.T=null,u=H.p,H.p=2,x=Nt,Nt|=4;try{wA(t,n,r)}finally{Nt=x,H.p=u,D.T=o}}xn=1,Um(),Lm(),Bm()}}function Um(){if(xn===1){xn=0;var t=Ha,n=rs,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=D.T,D.T=null;var o=H.p;H.p=2;var u=Nt;Nt|=4;try{fm(n,t);var f=zf,x=vp(t.containerInfo),b=f.focusedElem,G=f.selectionRange;if(x!==b&&b&&b.ownerDocument&&gp(b.ownerDocument.documentElement,b)){if(G!==null&&lu(b)){var ne=G.start,me=G.end;if(me===void 0&&(me=ne),"selectionStart"in b)b.selectionStart=ne,b.selectionEnd=Math.min(me,b.value.length);else{var xe=b.ownerDocument||document,se=xe&&xe.defaultView||window;if(se.getSelection){var ce=se.getSelection(),He=b.textContent.length,tt=Math.min(G.start,He),kt=G.end===void 0?tt:Math.min(G.end,He);!ce.extend&&tt>kt&&(x=kt,kt=tt,tt=x);var q=mp(b,tt),X=mp(b,kt);if(q&&X&&(ce.rangeCount!==1||ce.anchorNode!==q.node||ce.anchorOffset!==q.offset||ce.focusNode!==X.node||ce.focusOffset!==X.offset)){var ee=xe.createRange();ee.setStart(q.node,q.offset),ce.removeAllRanges(),tt>kt?(ce.addRange(ee),ce.extend(X.node,X.offset)):(ee.setEnd(X.node,X.offset),ce.addRange(ee))}}}}for(xe=[],ce=b;ce=ce.parentNode;)ce.nodeType===1&&xe.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<xe.length;b++){var ge=xe[b];ge.element.scrollLeft=ge.left,ge.element.scrollTop=ge.top}}rc=!!If,zf=If=null}finally{Nt=u,H.p=o,D.T=r}}t.current=n,xn=2}}function Lm(){if(xn===2){xn=0;var t=Ha,n=rs,r=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||r){r=D.T,D.T=null;var o=H.p;H.p=2;var u=Nt;Nt|=4;try{sm(t,n.alternate,n)}finally{Nt=u,H.p=o,D.T=r}}xn=3}}function Bm(){if(xn===4||xn===3){xn=0,B();var t=Ha,n=rs,r=oa,o=Am;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?xn=5:(xn=0,rs=Ha=null,Om(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Fa=null),sr(r),n=n.stateNode,Ee&&typeof Ee.onCommitFiberRoot=="function")try{Ee.onCommitFiberRoot(ye,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=D.T,u=H.p,H.p=2,D.T=null;try{for(var f=t.onRecoverableError,x=0;x<o.length;x++){var b=o[x];f(b.value,{componentStack:b.stack})}}finally{D.T=n,H.p=u}}(oa&3)!==0&&Ql(),Ii(t),u=t.pendingLanes,(r&261930)!==0&&(u&42)!==0?t===Ef?Eo++:(Eo=0,Ef=t):Eo=0,bo(0)}}function Om(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,ao(n)))}function Ql(){return Um(),Lm(),Bm(),Nm()}function Nm(){if(xn!==5)return!1;var t=Ha,n=yf;yf=0;var r=sr(oa),o=D.T,u=H.p;try{H.p=32>r?32:r,D.T=null,r=Mf,Mf=null;var f=Ha,x=oa;if(xn=0,rs=Ha=null,oa=0,(Nt&6)!==0)throw Error(s(331));var b=Nt;if(Nt|=4,gm(f.current),dm(f,f.current,x,r),Nt=b,bo(0,!1),Ee&&typeof Ee.onPostCommitFiberRoot=="function")try{Ee.onPostCommitFiberRoot(ye,f)}catch{}return!0}finally{H.p=u,D.T=o,Om(t,n)}}function Pm(t,n,r){n=di(r,n),n=tf(t.stateNode,n,2),t=Ba(t,n,2),t!==null&&(Pn(t,2),Ii(t))}function Ft(t,n,r){if(t.tag===3)Pm(t,t,r);else for(;n!==null;){if(n.tag===3){Pm(n,t,r);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Fa===null||!Fa.has(o))){t=di(r,t),r=I0(2),o=Ba(n,r,2),o!==null&&(z0(r,o,n,t),Pn(o,2),Ii(o));break}}n=n.return}}function Cf(t,n,r){var o=t.pingCache;if(o===null){o=t.pingCache=new BA;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(r)||(Af=!0,u.add(r),t=zA.bind(null,t,n,r),n.then(t,t))}function zA(t,n,r){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&r,t.warmLanes&=~r,qt===t&&(St&r)===r&&(an===4||an===3&&(St&62914560)===St&&300>M()-Gl?(Nt&2)===0&&ss(t,0):_f|=r,as===St&&(as=0)),Ii(t)}function Im(t,n){n===0&&(n=Ht()),t=fr(t,n),t!==null&&(Pn(t,n),Ii(t))}function FA(t){var n=t.memoizedState,r=0;n!==null&&(r=n.retryLane),Im(t,r)}function HA(t,n){var r=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(r=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Im(t,r)}function GA(t,n){return Wt(t,n)}var ql=null,ls=null,Df=!1,Kl=!1,Rf=!1,Va=0;function Ii(t){t!==ls&&t.next===null&&(ls===null?ql=ls=t:ls=ls.next=t),Kl=!0,Df||(Df=!0,kA())}function bo(t,n){if(!Rf&&Kl){Rf=!0;do for(var r=!1,o=ql;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var x=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-Ve(42|t)+1)-1,f&=u&~(x&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(r=!0,Gm(o,f))}else f=St,f=Ae(o,o===qt?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||ze(o,f)||(r=!0,Gm(o,f));o=o.next}while(r);Rf=!1}}function VA(){zm()}function zm(){Kl=Df=!1;var t=0;Va!==0&&$A()&&(t=Va);for(var n=M(),r=null,o=ql;o!==null;){var u=o.next,f=Fm(o,n);f===0?(o.next=null,r===null?ql=u:r.next=u,u===null&&(ls=r)):(r=o,(t!==0||(f&3)!==0)&&(Kl=!0)),o=u}xn!==0&&xn!==5||bo(t),Va!==0&&(Va=0)}function Fm(t,n){for(var r=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var x=31-Ve(f),b=1<<x,G=u[x];G===-1?((b&r)===0||(b&o)!==0)&&(u[x]=rt(b,n)):G<=n&&(t.expiredLanes|=b),f&=~b}if(n=qt,r=St,r=Ae(t,t===n?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,r===0||t===n&&(zt===2||zt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&qe(o),t.callbackNode=null,t.callbackPriority=0;if((r&3)===0||ze(t,r)){if(n=r&-r,n===t.callbackPriority)return n;switch(o!==null&&qe(o),sr(r)){case 2:case 8:r=_e;break;case 32:r=de;break;case 268435456:r=Le;break;default:r=de}return o=Hm.bind(null,t),r=Wt(r,o),t.callbackPriority=n,t.callbackNode=r,n}return o!==null&&o!==null&&qe(o),t.callbackPriority=2,t.callbackNode=null,2}function Hm(t,n){if(xn!==0&&xn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var r=t.callbackNode;if(Ql()&&t.callbackNode!==r)return null;var o=St;return o=Ae(t,t===qt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(Sm(t,o,n),Fm(t,M()),t.callbackNode!=null&&t.callbackNode===r?Hm.bind(null,t):null)}function Gm(t,n){if(Ql())return null;Sm(t,n,!0)}function kA(){t_(function(){(Nt&6)!==0?Wt(ve,VA):zm()})}function wf(){if(Va===0){var t=Qr;t===0&&(t=Re,Re<<=1,(Re&261888)===0&&(Re=256)),Va=t}return Va}function Vm(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:il(""+t)}function km(t,n){var r=n.ownerDocument.createElement("input");return r.name=n.name,r.value=n.value,t.id&&r.setAttribute("form",t.id),n.parentNode.insertBefore(r,n),t=new FormData(t),r.parentNode.removeChild(r),t}function XA(t,n,r,o,u){if(n==="submit"&&r&&r.stateNode===u){var f=Vm((u[gn]||null).action),x=o.submitter;x&&(n=(n=x[gn]||null)?Vm(n.formAction):x.getAttribute("formAction"),n!==null&&(f=n,x=null));var b=new ol("action","action",null,o,u);t.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Va!==0){var G=x?km(u,x):new FormData(u);Ku(r,{pending:!0,data:G,method:u.method,action:f},null,G)}}else typeof f=="function"&&(b.preventDefault(),G=x?km(u,x):new FormData(u),Ku(r,{pending:!0,data:G,method:u.method,action:f},f,G))},currentTarget:u}]})}}for(var Uf=0;Uf<hu.length;Uf++){var Lf=hu[Uf],YA=Lf.toLowerCase(),WA=Lf[0].toUpperCase()+Lf.slice(1);Ei(YA,"on"+WA)}Ei(_p,"onAnimationEnd"),Ei(Sp,"onAnimationIteration"),Ei(yp,"onAnimationStart"),Ei("dblclick","onDoubleClick"),Ei("focusin","onFocus"),Ei("focusout","onBlur"),Ei(lA,"onTransitionRun"),Ei(cA,"onTransitionStart"),Ei(uA,"onTransitionCancel"),Ei(Mp,"onTransitionEnd"),Ie("onMouseEnter",["mouseout","mouseover"]),Ie("onMouseLeave",["mouseout","mouseover"]),Ie("onPointerEnter",["pointerout","pointerover"]),Ie("onPointerLeave",["pointerout","pointerover"]),we("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),we("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),we("onBeforeInput",["compositionend","keypress","textInput","paste"]),we("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),we("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),we("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var To="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),QA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(To));function Xm(t,n){n=(n&4)!==0;for(var r=0;r<t.length;r++){var o=t[r],u=o.event;o=o.listeners;e:{var f=void 0;if(n)for(var x=o.length-1;0<=x;x--){var b=o[x],G=b.instance,ne=b.currentTarget;if(b=b.listener,G!==f&&u.isPropagationStopped())break e;f=b,u.currentTarget=ne;try{f(u)}catch(me){ul(me)}u.currentTarget=null,f=G}else for(x=0;x<o.length;x++){if(b=o[x],G=b.instance,ne=b.currentTarget,b=b.listener,G!==f&&u.isPropagationStopped())break e;f=b,u.currentTarget=ne;try{f(u)}catch(me){ul(me)}u.currentTarget=null,f=G}}}}function At(t,n){var r=n[Nr];r===void 0&&(r=n[Nr]=new Set);var o=t+"__bubble";r.has(o)||(Ym(n,t,2,!1),r.add(o))}function Bf(t,n,r){var o=0;n&&(o|=4),Ym(r,t,o,n)}var Zl="_reactListening"+Math.random().toString(36).slice(2);function Of(t){if(!t[Zl]){t[Zl]=!0,Z.forEach(function(r){r!=="selectionchange"&&(QA.has(r)||Bf(r,!1,t),Bf(r,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Zl]||(n[Zl]=!0,Bf("selectionchange",!1,n))}}function Ym(t,n,r,o){switch(_g(n)){case 2:var u=S_;break;case 8:u=y_;break;default:u=Kf}r=u.bind(null,n,r,t),u=void 0,!$c||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,r,{capture:!0,passive:u}):t.addEventListener(n,r,!0):u!==void 0?t.addEventListener(n,r,{passive:u}):t.addEventListener(n,r,!1)}function Nf(t,n,r,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var x=o.tag;if(x===3||x===4){var b=o.stateNode.containerInfo;if(b===u)break;if(x===4)for(x=o.return;x!==null;){var G=x.tag;if((G===3||G===4)&&x.stateNode.containerInfo===u)return;x=x.return}for(;b!==null;){if(x=Ea(b),x===null)return;if(G=x.tag,G===5||G===6||G===26||G===27){o=f=x;continue e}b=b.parentNode}}o=o.return}Zd(function(){var ne=f,me=Jc(r),xe=[];e:{var se=Ep.get(t);if(se!==void 0){var ce=ol,He=t;switch(t){case"keypress":if(rl(r)===0)break e;case"keydown":case"keyup":ce=Hx;break;case"focusin":He="focus",ce=iu;break;case"focusout":He="blur",ce=iu;break;case"beforeblur":case"afterblur":ce=iu;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ce=$d;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ce=Dx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ce=kx;break;case _p:case Sp:case yp:ce=Ux;break;case Mp:ce=Yx;break;case"scroll":case"scrollend":ce=Tx;break;case"wheel":ce=Qx;break;case"copy":case"cut":case"paste":ce=Bx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ce=tp;break;case"toggle":case"beforetoggle":ce=Kx}var tt=(n&4)!==0,kt=!tt&&(t==="scroll"||t==="scrollend"),q=tt?se!==null?se+"Capture":null:se;tt=[];for(var X=ne,ee;X!==null;){var ge=X;if(ee=ge.stateNode,ge=ge.tag,ge!==5&&ge!==26&&ge!==27||ee===null||q===null||(ge=Qs(X,q),ge!=null&&tt.push(Co(X,ge,ee))),kt)break;X=X.return}0<tt.length&&(se=new ce(se,He,null,r,me),xe.push({event:se,listeners:tt}))}}if((n&7)===0){e:{if(se=t==="mouseover"||t==="pointerover",ce=t==="mouseout"||t==="pointerout",se&&r!==Zc&&(He=r.relatedTarget||r.fromElement)&&(Ea(He)||He[ki]))break e;if((ce||se)&&(se=me.window===me?me:(se=me.ownerDocument)?se.defaultView||se.parentWindow:window,ce?(He=r.relatedTarget||r.toElement,ce=ne,He=He?Ea(He):null,He!==null&&(kt=c(He),tt=He.tag,He!==kt||tt!==5&&tt!==27&&tt!==6)&&(He=null)):(ce=null,He=ne),ce!==He)){if(tt=$d,ge="onMouseLeave",q="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(tt=tp,ge="onPointerLeave",q="onPointerEnter",X="pointer"),kt=ce==null?se:Q(ce),ee=He==null?se:Q(He),se=new tt(ge,X+"leave",ce,r,me),se.target=kt,se.relatedTarget=ee,ge=null,Ea(me)===ne&&(tt=new tt(q,X+"enter",He,r,me),tt.target=ee,tt.relatedTarget=kt,ge=tt),kt=ge,ce&&He)t:{for(tt=qA,q=ce,X=He,ee=0,ge=q;ge;ge=tt(ge))ee++;ge=0;for(var Ze=X;Ze;Ze=tt(Ze))ge++;for(;0<ee-ge;)q=tt(q),ee--;for(;0<ge-ee;)X=tt(X),ge--;for(;ee--;){if(q===X||X!==null&&q===X.alternate){tt=q;break t}q=tt(q),X=tt(X)}tt=null}else tt=null;ce!==null&&Wm(xe,se,ce,tt,!1),He!==null&&kt!==null&&Wm(xe,kt,He,tt,!0)}}e:{if(se=ne?Q(ne):window,ce=se.nodeName&&se.nodeName.toLowerCase(),ce==="select"||ce==="input"&&se.type==="file")var Ut=cp;else if(op(se))if(up)Ut=rA;else{Ut=iA;var ke=nA}else ce=se.nodeName,!ce||ce.toLowerCase()!=="input"||se.type!=="checkbox"&&se.type!=="radio"?ne&&Kc(ne.elementType)&&(Ut=cp):Ut=aA;if(Ut&&(Ut=Ut(t,ne))){lp(xe,Ut,r,me);break e}ke&&ke(t,se,ne),t==="focusout"&&ne&&se.type==="number"&&ne.memoizedProps.value!=null&&Mn(se,"number",se.value)}switch(ke=ne?Q(ne):window,t){case"focusin":(op(ke)||ke.contentEditable==="true")&&(Fr=ke,cu=ne,to=null);break;case"focusout":to=cu=Fr=null;break;case"mousedown":uu=!0;break;case"contextmenu":case"mouseup":case"dragend":uu=!1,xp(xe,r,me);break;case"selectionchange":if(oA)break;case"keydown":case"keyup":xp(xe,r,me)}var dt;if(ru)e:{switch(t){case"compositionstart":var yt="onCompositionStart";break e;case"compositionend":yt="onCompositionEnd";break e;case"compositionupdate":yt="onCompositionUpdate";break e}yt=void 0}else zr?rp(t,r)&&(yt="onCompositionEnd"):t==="keydown"&&r.keyCode===229&&(yt="onCompositionStart");yt&&(np&&r.locale!=="ko"&&(zr||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&zr&&(dt=Jd()):(Ta=me,eu="value"in Ta?Ta.value:Ta.textContent,zr=!0)),ke=Jl(ne,yt),0<ke.length&&(yt=new ep(yt,t,null,r,me),xe.push({event:yt,listeners:ke}),dt?yt.data=dt:(dt=sp(r),dt!==null&&(yt.data=dt)))),(dt=Jx?jx(t,r):$x(t,r))&&(yt=Jl(ne,"onBeforeInput"),0<yt.length&&(ke=new ep("onBeforeInput","beforeinput",null,r,me),xe.push({event:ke,listeners:yt}),ke.data=dt)),XA(xe,t,ne,r,me)}Xm(xe,n)})}function Co(t,n,r){return{instance:t,listener:n,currentTarget:r}}function Jl(t,n){for(var r=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Qs(t,r),u!=null&&o.unshift(Co(t,u,f)),u=Qs(t,n),u!=null&&o.push(Co(t,u,f))),t.tag===3)return o;t=t.return}return[]}function qA(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Wm(t,n,r,o,u){for(var f=n._reactName,x=[];r!==null&&r!==o;){var b=r,G=b.alternate,ne=b.stateNode;if(b=b.tag,G!==null&&G===o)break;b!==5&&b!==26&&b!==27||ne===null||(G=ne,u?(ne=Qs(r,f),ne!=null&&x.unshift(Co(r,ne,G))):u||(ne=Qs(r,f),ne!=null&&x.push(Co(r,ne,G)))),r=r.return}x.length!==0&&t.push({event:n,listeners:x})}var KA=/\r\n?/g,ZA=/\u0000|\uFFFD/g;function Qm(t){return(typeof t=="string"?t:""+t).replace(KA,`
`).replace(ZA,"")}function qm(t,n){return n=Qm(n),Qm(t)===n}function Vt(t,n,r,o,u,f){switch(r){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Bi(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Bi(t,""+o);break;case"className":Dt(t,"class",o);break;case"tabIndex":Dt(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Dt(t,r,o);break;case"style":qd(t,o,f);break;case"data":if(n!=="object"){Dt(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||r!=="href")){t.removeAttribute(r);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(r);break}o=il(""+o),t.setAttribute(r,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(r==="formAction"?(n!=="input"&&Vt(t,n,"name",u.name,u,null),Vt(t,n,"formEncType",u.formEncType,u,null),Vt(t,n,"formMethod",u.formMethod,u,null),Vt(t,n,"formTarget",u.formTarget,u,null)):(Vt(t,n,"encType",u.encType,u,null),Vt(t,n,"method",u.method,u,null),Vt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(r);break}o=il(""+o),t.setAttribute(r,o);break;case"onClick":o!=null&&(t.onclick=Wi);break;case"onScroll":o!=null&&At("scroll",t);break;case"onScrollEnd":o!=null&&At("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(r=o.__html,r!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=r}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}r=il(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,""+o):t.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,""):t.removeAttribute(r);break;case"capture":case"download":o===!0?t.setAttribute(r,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,o):t.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(r,o):t.removeAttribute(r);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(r):t.setAttribute(r,o);break;case"popover":At("beforetoggle",t),At("toggle",t),ht(t,"popover",o);break;case"xlinkActuate":wt(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":wt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":wt(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":wt(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":wt(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":wt(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":wt(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":wt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":wt(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ht(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=Ex.get(r)||r,ht(t,r,o))}}function Pf(t,n,r,o,u,f){switch(r){case"style":qd(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(r=o.__html,r!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=r}}break;case"children":typeof o=="string"?Bi(t,o):(typeof o=="number"||typeof o=="bigint")&&Bi(t,""+o);break;case"onScroll":o!=null&&At("scroll",t);break;case"onScrollEnd":o!=null&&At("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Wi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!be.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(u=r.endsWith("Capture"),n=r.slice(2,u?r.length-7:void 0),f=t[gn]||null,f=f!=null?f[r]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(r in t?t[r]=null:t.hasAttribute(r)&&t.removeAttribute(r)),t.addEventListener(n,o,u);break e}r in t?t[r]=o:o===!0?t.setAttribute(r,""):ht(t,r,o)}}}function Bn(t,n,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":At("error",t),At("load",t);var o=!1,u=!1,f;for(f in r)if(r.hasOwnProperty(f)){var x=r[f];if(x!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Vt(t,n,f,x,r,null)}}u&&Vt(t,n,"srcSet",r.srcSet,r,null),o&&Vt(t,n,"src",r.src,r,null);return;case"input":At("invalid",t);var b=f=x=u=null,G=null,ne=null;for(o in r)if(r.hasOwnProperty(o)){var me=r[o];if(me!=null)switch(o){case"name":u=me;break;case"type":x=me;break;case"checked":G=me;break;case"defaultChecked":ne=me;break;case"value":f=me;break;case"defaultValue":b=me;break;case"children":case"dangerouslySetInnerHTML":if(me!=null)throw Error(s(137,n));break;default:Vt(t,n,o,me,r,null)}}Zt(t,f,b,G,ne,x,u,!1);return;case"select":At("invalid",t),o=x=f=null;for(u in r)if(r.hasOwnProperty(u)&&(b=r[u],b!=null))switch(u){case"value":f=b;break;case"defaultValue":x=b;break;case"multiple":o=b;default:Vt(t,n,u,b,r,null)}n=f,r=x,t.multiple=!!o,n!=null?vn(t,!!o,n,!1):r!=null&&vn(t,!!o,r,!0);return;case"textarea":At("invalid",t),f=u=o=null;for(x in r)if(r.hasOwnProperty(x)&&(b=r[x],b!=null))switch(x){case"value":o=b;break;case"defaultValue":u=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Vt(t,n,x,b,r,null)}Rn(t,o,u,f);return;case"option":for(G in r)if(r.hasOwnProperty(G)&&(o=r[G],o!=null))switch(G){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:Vt(t,n,G,o,r,null)}return;case"dialog":At("beforetoggle",t),At("toggle",t),At("cancel",t),At("close",t);break;case"iframe":case"object":At("load",t);break;case"video":case"audio":for(o=0;o<To.length;o++)At(To[o],t);break;case"image":At("error",t),At("load",t);break;case"details":At("toggle",t);break;case"embed":case"source":case"link":At("error",t),At("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ne in r)if(r.hasOwnProperty(ne)&&(o=r[ne],o!=null))switch(ne){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Vt(t,n,ne,o,r,null)}return;default:if(Kc(n)){for(me in r)r.hasOwnProperty(me)&&(o=r[me],o!==void 0&&Pf(t,n,me,o,r,void 0));return}}for(b in r)r.hasOwnProperty(b)&&(o=r[b],o!=null&&Vt(t,n,b,o,r,null))}function JA(t,n,r,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,x=null,b=null,G=null,ne=null,me=null;for(ce in r){var xe=r[ce];if(r.hasOwnProperty(ce)&&xe!=null)switch(ce){case"checked":break;case"value":break;case"defaultValue":G=xe;default:o.hasOwnProperty(ce)||Vt(t,n,ce,null,o,xe)}}for(var se in o){var ce=o[se];if(xe=r[se],o.hasOwnProperty(se)&&(ce!=null||xe!=null))switch(se){case"type":f=ce;break;case"name":u=ce;break;case"checked":ne=ce;break;case"defaultChecked":me=ce;break;case"value":x=ce;break;case"defaultValue":b=ce;break;case"children":case"dangerouslySetInnerHTML":if(ce!=null)throw Error(s(137,n));break;default:ce!==xe&&Vt(t,n,se,ce,o,xe)}}Xi(t,x,b,G,ne,me,f,u);return;case"select":ce=x=b=se=null;for(f in r)if(G=r[f],r.hasOwnProperty(f)&&G!=null)switch(f){case"value":break;case"multiple":ce=G;default:o.hasOwnProperty(f)||Vt(t,n,f,null,o,G)}for(u in o)if(f=o[u],G=r[u],o.hasOwnProperty(u)&&(f!=null||G!=null))switch(u){case"value":se=f;break;case"defaultValue":b=f;break;case"multiple":x=f;default:f!==G&&Vt(t,n,u,f,o,G)}n=b,r=x,o=ce,se!=null?vn(t,!!r,se,!1):!!o!=!!r&&(n!=null?vn(t,!!r,n,!0):vn(t,!!r,r?[]:"",!1));return;case"textarea":ce=se=null;for(b in r)if(u=r[b],r.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Vt(t,n,b,null,o,u)}for(x in o)if(u=o[x],f=r[x],o.hasOwnProperty(x)&&(u!=null||f!=null))switch(x){case"value":se=u;break;case"defaultValue":ce=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Vt(t,n,x,u,o,f)}En(t,se,ce);return;case"option":for(var He in r)if(se=r[He],r.hasOwnProperty(He)&&se!=null&&!o.hasOwnProperty(He))switch(He){case"selected":t.selected=!1;break;default:Vt(t,n,He,null,o,se)}for(G in o)if(se=o[G],ce=r[G],o.hasOwnProperty(G)&&se!==ce&&(se!=null||ce!=null))switch(G){case"selected":t.selected=se&&typeof se!="function"&&typeof se!="symbol";break;default:Vt(t,n,G,se,o,ce)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var tt in r)se=r[tt],r.hasOwnProperty(tt)&&se!=null&&!o.hasOwnProperty(tt)&&Vt(t,n,tt,null,o,se);for(ne in o)if(se=o[ne],ce=r[ne],o.hasOwnProperty(ne)&&se!==ce&&(se!=null||ce!=null))switch(ne){case"children":case"dangerouslySetInnerHTML":if(se!=null)throw Error(s(137,n));break;default:Vt(t,n,ne,se,o,ce)}return;default:if(Kc(n)){for(var kt in r)se=r[kt],r.hasOwnProperty(kt)&&se!==void 0&&!o.hasOwnProperty(kt)&&Pf(t,n,kt,void 0,o,se);for(me in o)se=o[me],ce=r[me],!o.hasOwnProperty(me)||se===ce||se===void 0&&ce===void 0||Pf(t,n,me,se,o,ce);return}}for(var q in r)se=r[q],r.hasOwnProperty(q)&&se!=null&&!o.hasOwnProperty(q)&&Vt(t,n,q,null,o,se);for(xe in o)se=o[xe],ce=r[xe],!o.hasOwnProperty(xe)||se===ce||se==null&&ce==null||Vt(t,n,xe,se,o,ce)}function Km(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function jA(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,r=performance.getEntriesByType("resource"),o=0;o<r.length;o++){var u=r[o],f=u.transferSize,x=u.initiatorType,b=u.duration;if(f&&b&&Km(x)){for(x=0,b=u.responseEnd,o+=1;o<r.length;o++){var G=r[o],ne=G.startTime;if(ne>b)break;var me=G.transferSize,xe=G.initiatorType;me&&Km(xe)&&(G=G.responseEnd,x+=me*(G<b?1:(b-ne)/(G-ne)))}if(--o,n+=8*(f+x)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var If=null,zf=null;function jl(t){return t.nodeType===9?t:t.ownerDocument}function Zm(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Jm(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Ff(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Hf=null;function $A(){var t=window.event;return t&&t.type==="popstate"?t===Hf?!1:(Hf=t,!0):(Hf=null,!1)}var jm=typeof setTimeout=="function"?setTimeout:void 0,e_=typeof clearTimeout=="function"?clearTimeout:void 0,$m=typeof Promise=="function"?Promise:void 0,t_=typeof queueMicrotask=="function"?queueMicrotask:typeof $m<"u"?function(t){return $m.resolve(null).then(t).catch(n_)}:jm;function n_(t){setTimeout(function(){throw t})}function ka(t){return t==="head"}function eg(t,n){var r=n,o=0;do{var u=r.nextSibling;if(t.removeChild(r),u&&u.nodeType===8)if(r=u.data,r==="/$"||r==="/&"){if(o===0){t.removeChild(u),hs(n);return}o--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")o++;else if(r==="html")Do(t.ownerDocument.documentElement);else if(r==="head"){r=t.ownerDocument.head,Do(r);for(var f=r.firstChild;f;){var x=f.nextSibling,b=f.nodeName;f[or]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||r.removeChild(f),f=x}}else r==="body"&&Do(t.ownerDocument.body);r=u}while(r);hs(n)}function tg(t,n){var r=t;t=0;do{var o=r.nextSibling;if(r.nodeType===1?n?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(n?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(t===0)break;t--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||t++;r=o}while(r)}function Gf(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var r=n;switch(n=n.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Gf(r),Ws(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}t.removeChild(r)}}function i_(t,n,r,o){for(;t.nodeType===1;){var u=r;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[or])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=xi(t.nextSibling),t===null)break}return null}function a_(t,n,r){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!r||(t=xi(t.nextSibling),t===null))return null;return t}function ng(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=xi(t.nextSibling),t===null))return null;return t}function Vf(t){return t.data==="$?"||t.data==="$~"}function kf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function r_(t,n){var r=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||r.readyState!=="loading")n();else{var o=function(){n(),r.removeEventListener("DOMContentLoaded",o)};r.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function xi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Xf=null;function ig(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var r=t.data;if(r==="/$"||r==="/&"){if(n===0)return xi(t.nextSibling);n--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||n++}t=t.nextSibling}return null}function ag(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var r=t.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(n===0)return t;n--}else r!=="/$"&&r!=="/&"||n++}t=t.previousSibling}return null}function rg(t,n,r){switch(n=jl(r),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Do(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Ws(t)}var Ai=new Map,sg=new Set;function $l(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var la=H.d;H.d={f:s_,r:o_,D:l_,C:c_,L:u_,m:f_,X:d_,S:h_,M:p_};function s_(){var t=la.f(),n=Xl();return t||n}function o_(t){var n=T(t);n!==null&&n.tag===5&&n.type==="form"?M0(n):la.r(t)}var cs=typeof document>"u"?null:document;function og(t,n,r){var o=cs;if(o&&typeof n=="string"&&n){var u=Kt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof r=="string"&&(u+='[crossorigin="'+r+'"]'),sg.has(u)||(sg.add(u),t={rel:t,crossOrigin:r,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Bn(n,"link",t),ae(n),o.head.appendChild(n)))}}function l_(t){la.D(t),og("dns-prefetch",t,null)}function c_(t,n){la.C(t,n),og("preconnect",t,n)}function u_(t,n,r){la.L(t,n,r);var o=cs;if(o&&t&&n){var u='link[rel="preload"][as="'+Kt(n)+'"]';n==="image"&&r&&r.imageSrcSet?(u+='[imagesrcset="'+Kt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(u+='[imagesizes="'+Kt(r.imageSizes)+'"]')):u+='[href="'+Kt(t)+'"]';var f=u;switch(n){case"style":f=us(t);break;case"script":f=fs(t)}Ai.has(f)||(t=g({rel:"preload",href:n==="image"&&r&&r.imageSrcSet?void 0:t,as:n},r),Ai.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Ro(f))||n==="script"&&o.querySelector(wo(f))||(n=o.createElement("link"),Bn(n,"link",t),ae(n),o.head.appendChild(n)))}}function f_(t,n){la.m(t,n);var r=cs;if(r&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Kt(o)+'"][href="'+Kt(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=fs(t)}if(!Ai.has(f)&&(t=g({rel:"modulepreload",href:t},n),Ai.set(f,t),r.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(wo(f)))return}o=r.createElement("link"),Bn(o,"link",t),ae(o),r.head.appendChild(o)}}}function h_(t,n,r){la.S(t,n,r);var o=cs;if(o&&t){var u=oe(o).hoistableStyles,f=us(t);n=n||"default";var x=u.get(f);if(!x){var b={loading:0,preload:null};if(x=o.querySelector(Ro(f)))b.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":n},r),(r=Ai.get(f))&&Yf(t,r);var G=x=o.createElement("link");ae(G),Bn(G,"link",t),G._p=new Promise(function(ne,me){G.onload=ne,G.onerror=me}),G.addEventListener("load",function(){b.loading|=1}),G.addEventListener("error",function(){b.loading|=2}),b.loading|=4,ec(x,n,o)}x={type:"stylesheet",instance:x,count:1,state:b},u.set(f,x)}}}function d_(t,n){la.X(t,n);var r=cs;if(r&&t){var o=oe(r).hoistableScripts,u=fs(t),f=o.get(u);f||(f=r.querySelector(wo(u)),f||(t=g({src:t,async:!0},n),(n=Ai.get(u))&&Wf(t,n),f=r.createElement("script"),ae(f),Bn(f,"link",t),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function p_(t,n){la.M(t,n);var r=cs;if(r&&t){var o=oe(r).hoistableScripts,u=fs(t),f=o.get(u);f||(f=r.querySelector(wo(u)),f||(t=g({src:t,async:!0,type:"module"},n),(n=Ai.get(u))&&Wf(t,n),f=r.createElement("script"),ae(f),Bn(f,"link",t),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function lg(t,n,r,o){var u=(u=J.current)?$l(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(n=us(r.href),r=oe(u).hoistableStyles,o=r.get(n),o||(o={type:"style",instance:null,count:0,state:null},r.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){t=us(r.href);var f=oe(u).hoistableStyles,x=f.get(t);if(x||(u=u.ownerDocument||u,x={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,x),(f=u.querySelector(Ro(t)))&&!f._p&&(x.instance=f,x.state.loading=5),Ai.has(t)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Ai.set(t,r),f||m_(u,t,r,x.state))),n&&o===null)throw Error(s(528,""));return x}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=r.async,r=r.src,typeof r=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=fs(r),r=oe(u).hoistableScripts,o=r.get(n),o||(o={type:"script",instance:null,count:0,state:null},r.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function us(t){return'href="'+Kt(t)+'"'}function Ro(t){return'link[rel="stylesheet"]['+t+"]"}function cg(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function m_(t,n,r,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Bn(n,"link",r),ae(n),t.head.appendChild(n))}function fs(t){return'[src="'+Kt(t)+'"]'}function wo(t){return"script[async]"+t}function ug(t,n,r){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Kt(r.href)+'"]');if(o)return n.instance=o,ae(o),o;var u=g({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),ae(o),Bn(o,"style",u),ec(o,r.precedence,t),n.instance=o;case"stylesheet":u=us(r.href);var f=t.querySelector(Ro(u));if(f)return n.state.loading|=4,n.instance=f,ae(f),f;o=cg(r),(u=Ai.get(u))&&Yf(o,u),f=(t.ownerDocument||t).createElement("link"),ae(f);var x=f;return x._p=new Promise(function(b,G){x.onload=b,x.onerror=G}),Bn(f,"link",o),n.state.loading|=4,ec(f,r.precedence,t),n.instance=f;case"script":return f=fs(r.src),(u=t.querySelector(wo(f)))?(n.instance=u,ae(u),u):(o=r,(u=Ai.get(f))&&(o=g({},r),Wf(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),ae(u),Bn(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,ec(o,r.precedence,t));return n.instance}function ec(t,n,r){for(var o=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,x=0;x<o.length;x++){var b=o[x];if(b.dataset.precedence===n)f=b;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=r.nodeType===9?r.head:r,n.insertBefore(t,n.firstChild))}function Yf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function Wf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var tc=null;function fg(t,n,r){if(tc===null){var o=new Map,u=tc=new Map;u.set(r,o)}else u=tc,o=u.get(r),o||(o=new Map,u.set(r,o));if(o.has(t))return o;for(o.set(t,null),r=r.getElementsByTagName(t),u=0;u<r.length;u++){var f=r[u];if(!(f[or]||f[cn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var x=f.getAttribute(n)||"";x=t+x;var b=o.get(x);b?b.push(f):o.set(x,[f])}}return o}function hg(t,n,r){t=t.ownerDocument||t,t.head.insertBefore(r,n==="title"?t.querySelector("head > title"):null)}function g_(t,n,r){if(r===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function dg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function v_(t,n,r,o){if(r.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var u=us(o.href),f=n.querySelector(Ro(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=nc.bind(t),n.then(t,t)),r.state.loading|=4,r.instance=f,ae(f);return}f=n.ownerDocument||n,o=cg(o),(u=Ai.get(u))&&Yf(o,u),f=f.createElement("link"),ae(f);var x=f;x._p=new Promise(function(b,G){x.onload=b,x.onerror=G}),Bn(f,"link",o),r.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(r,n),(n=r.state.preload)&&(r.state.loading&3)===0&&(t.count++,r=nc.bind(t),n.addEventListener("load",r),n.addEventListener("error",r))}}var Qf=0;function x_(t,n){return t.stylesheets&&t.count===0&&ac(t,t.stylesheets),0<t.count||0<t.imgCount?function(r){var o=setTimeout(function(){if(t.stylesheets&&ac(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&Qf===0&&(Qf=62500*jA());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&ac(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>Qf?50:800)+n);return t.unsuspend=r,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function nc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ac(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ic=null;function ac(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ic=new Map,n.forEach(A_,t),ic=null,nc.call(t))}function A_(t,n){if(!(n.state.loading&4)){var r=ic.get(t);if(r)var o=r.get(null);else{r=new Map,ic.set(t,r);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var x=u[f];(x.nodeName==="LINK"||x.getAttribute("media")!=="not all")&&(r.set(x.dataset.precedence,x),o=x)}o&&r.set(null,o)}u=n.instance,x=u.getAttribute("data-precedence"),f=r.get(x)||o,f===o&&r.set(null,u),r.set(x,u),this.count++,o=nc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Uo={$$typeof:U,Provider:null,Consumer:null,_currentValue:z,_currentValue2:z,_threadCount:0};function __(t,n,r,o,u,f,x,b,G){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Rt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Rt(0),this.hiddenUpdates=Rt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=x,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function pg(t,n,r,o,u,f,x,b,G,ne,me,xe){return t=new __(t,n,r,x,G,ne,me,xe,b),n=1,f===!0&&(n|=24),f=ti(3,null,null,n),t.current=f,f.stateNode=t,n=bu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:r,cache:n},Ru(f),t}function mg(t){return t?(t=Vr,t):Vr}function gg(t,n,r,o,u,f){u=mg(u),o.context===null?o.context=u:o.pendingContext=u,o=La(n),o.payload={element:r},f=f===void 0?null:f,f!==null&&(o.callback=f),r=Ba(t,o,n),r!==null&&(Zn(r,t,n),lo(r,t,n))}function vg(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var r=t.retryLane;t.retryLane=r!==0&&r<n?r:n}}function qf(t,n){vg(t,n),(t=t.alternate)&&vg(t,n)}function xg(t){if(t.tag===13||t.tag===31){var n=fr(t,67108864);n!==null&&Zn(n,t,67108864),qf(t,67108864)}}function Ag(t){if(t.tag===13||t.tag===31){var n=si();n=Mi(n);var r=fr(t,n);r!==null&&Zn(r,t,n),qf(t,n)}}var rc=!0;function S_(t,n,r,o){var u=D.T;D.T=null;var f=H.p;try{H.p=2,Kf(t,n,r,o)}finally{H.p=f,D.T=u}}function y_(t,n,r,o){var u=D.T;D.T=null;var f=H.p;try{H.p=8,Kf(t,n,r,o)}finally{H.p=f,D.T=u}}function Kf(t,n,r,o){if(rc){var u=Zf(o);if(u===null)Nf(t,n,o,sc,r),Sg(t,o);else if(E_(u,t,n,r,o))o.stopPropagation();else if(Sg(t,o),n&4&&-1<M_.indexOf(t)){for(;u!==null;){var f=T(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var x=Me(f.pendingLanes);if(x!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;x;){var G=1<<31-Ve(x);b.entanglements[1]|=G,x&=~G}Ii(f),(Nt&6)===0&&(Vl=M()+500,bo(0))}}break;case 31:case 13:b=fr(f,2),b!==null&&Zn(b,f,2),Xl(),qf(f,2)}if(f=Zf(o),f===null&&Nf(t,n,o,sc,r),f===u)break;u=f}u!==null&&o.stopPropagation()}else Nf(t,n,o,null,r)}}function Zf(t){return t=Jc(t),Jf(t)}var sc=null;function Jf(t){if(sc=null,t=Ea(t),t!==null){var n=c(t);if(n===null)t=null;else{var r=n.tag;if(r===13){if(t=h(n),t!==null)return t;t=null}else if(r===31){if(t=d(n),t!==null)return t;t=null}else if(r===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return sc=t,null}function _g(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(te()){case ve:return 2;case _e:return 8;case de:case We:return 32;case Le:return 268435456;default:return 32}default:return 32}}var jf=!1,Xa=null,Ya=null,Wa=null,Lo=new Map,Bo=new Map,Qa=[],M_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Sg(t,n){switch(t){case"focusin":case"focusout":Xa=null;break;case"dragenter":case"dragleave":Ya=null;break;case"mouseover":case"mouseout":Wa=null;break;case"pointerover":case"pointerout":Lo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bo.delete(n.pointerId)}}function Oo(t,n,r,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:r,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=T(n),n!==null&&xg(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function E_(t,n,r,o,u){switch(n){case"focusin":return Xa=Oo(Xa,t,n,r,o,u),!0;case"dragenter":return Ya=Oo(Ya,t,n,r,o,u),!0;case"mouseover":return Wa=Oo(Wa,t,n,r,o,u),!0;case"pointerover":var f=u.pointerId;return Lo.set(f,Oo(Lo.get(f)||null,t,n,r,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Bo.set(f,Oo(Bo.get(f)||null,t,n,r,o,u)),!0}return!1}function yg(t){var n=Ea(t.target);if(n!==null){var r=c(n);if(r!==null){if(n=r.tag,n===13){if(n=h(r),n!==null){t.blockedOn=n,Ys(t.priority,function(){Ag(r)});return}}else if(n===31){if(n=d(r),n!==null){t.blockedOn=n,Ys(t.priority,function(){Ag(r)});return}}else if(n===3&&r.stateNode.current.memoizedState.isDehydrated){t.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}t.blockedOn=null}function oc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var r=Zf(t.nativeEvent);if(r===null){r=t.nativeEvent;var o=new r.constructor(r.type,r);Zc=o,r.target.dispatchEvent(o),Zc=null}else return n=T(r),n!==null&&xg(n),t.blockedOn=r,!1;n.shift()}return!0}function Mg(t,n,r){oc(t)&&r.delete(n)}function b_(){jf=!1,Xa!==null&&oc(Xa)&&(Xa=null),Ya!==null&&oc(Ya)&&(Ya=null),Wa!==null&&oc(Wa)&&(Wa=null),Lo.forEach(Mg),Bo.forEach(Mg)}function lc(t,n){t.blockedOn===n&&(t.blockedOn=null,jf||(jf=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,b_)))}var cc=null;function Eg(t){cc!==t&&(cc=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){cc===t&&(cc=null);for(var n=0;n<t.length;n+=3){var r=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(Jf(o||r)===null)continue;break}var f=T(r);f!==null&&(t.splice(n,3),n-=3,Ku(f,{pending:!0,data:u,method:r.method,action:o},o,u))}}))}function hs(t){function n(G){return lc(G,t)}Xa!==null&&lc(Xa,t),Ya!==null&&lc(Ya,t),Wa!==null&&lc(Wa,t),Lo.forEach(n),Bo.forEach(n);for(var r=0;r<Qa.length;r++){var o=Qa[r];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Qa.length&&(r=Qa[0],r.blockedOn===null);)yg(r),r.blockedOn===null&&Qa.shift();if(r=(t.ownerDocument||t).$$reactFormReplay,r!=null)for(o=0;o<r.length;o+=3){var u=r[o],f=r[o+1],x=u[gn]||null;if(typeof f=="function")x||Eg(r);else if(x){var b=null;if(f&&f.hasAttribute("formAction")){if(u=f,x=f[gn]||null)b=x.formAction;else if(Jf(u)!==null)continue}else b=x.action;typeof b=="function"?r[o+1]=b:(r.splice(o,3),o-=3),Eg(r)}}}function bg(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(x){return u=x})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(r,20)}function r(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(r,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function $f(t){this._internalRoot=t}uc.prototype.render=$f.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var r=n.current,o=si();gg(r,o,t,n,null,null)},uc.prototype.unmount=$f.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;gg(t.current,2,null,t,null,null),Xl(),n[ki]=null}};function uc(t){this._internalRoot=t}uc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Xs();t={blockedOn:null,target:t,priority:n};for(var r=0;r<Qa.length&&n!==0&&n<Qa[r].priority;r++);Qa.splice(r,0,t),r===0&&yg(t)}};var Tg=e.version;if(Tg!=="19.2.0")throw Error(s(527,Tg,"19.2.0"));H.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var T_={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:D,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fc.isDisabled&&fc.supportsFiber)try{ye=fc.inject(T_),Ee=fc}catch{}}return Po.createRoot=function(t,n){if(!l(t))throw Error(s(299));var r=!1,o="",u=B0,f=O0,x=N0;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(x=n.onRecoverableError)),n=pg(t,1,!1,null,null,r,o,null,u,f,x,bg),t[ki]=n.current,Of(t),new $f(n)},Po.hydrateRoot=function(t,n,r){if(!l(t))throw Error(s(299));var o=!1,u="",f=B0,x=O0,b=N0,G=null;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onUncaughtError!==void 0&&(f=r.onUncaughtError),r.onCaughtError!==void 0&&(x=r.onCaughtError),r.onRecoverableError!==void 0&&(b=r.onRecoverableError),r.formState!==void 0&&(G=r.formState)),n=pg(t,1,!0,n,r??null,o,u,G,f,x,b,bg),n.context=mg(null),r=n.current,o=si(),o=Mi(o),u=La(o),u.callback=null,Ba(r,u,o),r=o,n.current.lanes=r,Pn(n,r),Ii(n),t[ki]=n.current,Of(t),new uc(n)},Po.version="19.2.0",Po}var Pg;function P_(){if(Pg)return nh.exports;Pg=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),nh.exports=N_(),nh.exports}var I_=P_();const zs="181",z_=0,Ig=1,F_=2,Gv=1,H_=2,ma=3,_a=0,Cn=1,kn=2,On=0,Rs=1,zg=2,Fg=3,Hg=4,G_=5,Ur=100,V_=101,k_=102,X_=103,Y_=104,W_=200,Q_=201,q_=202,K_=203,Gh=204,Vh=205,Z_=206,J_=207,j_=208,$_=209,eS=210,tS=211,nS=212,iS=213,aS=214,kh=0,Hc=1,Xh=2,Us=3,Yh=4,Wh=5,Qh=6,qh=7,Vv=0,rS=1,sS=2,ir=0,oS=1,lS=2,cS=3,uS=4,fS=5,hS=6,dS=7,kv=300,Ls=301,Bs=302,Kh=303,Zh=304,Xc=306,Jh=1e3,ga=1001,jh=1002,Xn=1003,pS=1004,hc=1005,Dn=1006,sh=1007,Br=1008,Nn=1009,Xv=1010,Yv=1011,qo=1012,Ld=1013,ar=1014,va=1015,Fs=1016,Bd=1017,Od=1018,Os=1020,Wv=35902,Qv=35899,qv=1021,Kv=1022,Ui=1023,Ko=1026,Ns=1027,Zv=1028,Nd=1029,Pd=1030,Id=1031,zd=1033,Nc=33776,Pc=33777,Ic=33778,zc=33779,$h=35840,ed=35841,td=35842,nd=35843,id=36196,ad=37492,rd=37496,sd=37808,od=37809,ld=37810,cd=37811,ud=37812,fd=37813,hd=37814,dd=37815,pd=37816,md=37817,gd=37818,vd=37819,xd=37820,Ad=37821,_d=36492,Sd=36494,yd=36495,Md=36283,Ed=36284,bd=36285,Td=36286,Or=3200,mS=3201,gS=0,vS=1,Fi="",Yt="srgb",rr="srgb-linear",Gc="linear",Xt="srgb",ds=7680,Gg=519,xS=512,AS=513,_S=514,Jv=515,SS=516,yS=517,MS=518,ES=519,Vg=35044,kg="300 es",Hi=2e3,Vc=2001;function jv(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function kc(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function bS(){const a=kc("canvas");return a.style.display="block",a}const Xg={};function Yg(...a){const e="THREE."+a.shift();console.log(e,...a)}function ct(...a){const e="THREE."+a.shift();console.warn(e,...a)}function on(...a){const e="THREE."+a.shift();console.error(e,...a)}function Zo(...a){const e=a.join(" ");e in Xg||(Xg[e]=!0,ct(...a))}function TS(a,e,i){return new Promise(function(s,l){function c(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:l();break;case a.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}class ya{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oh=Math.PI/180,Cd=180/Math.PI;function Jo(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(zn[a&255]+zn[a>>8&255]+zn[a>>16&255]+zn[a>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]).toLowerCase()}function _t(a,e,i){return Math.max(e,Math.min(i,a))}function CS(a,e){return(a%e+e)%e}function lh(a,e,i){return(1-i)*a+i*e}function Io(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Jn(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}class Oe{constructor(e=0,i=0){Oe.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=_t(this.x,e.x,i.x),this.y=_t(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=_t(this.x,e,i),this.y=_t(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(_t(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,h=this.y-e.y;return this.x=c*s-h*l+e.x,this.y=c*l+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jo{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],v=s[l+2],g=s[l+3],A=c[h+0],S=c[h+1],E=c[h+2],C=c[h+3];if(d<=0){e[i+0]=m,e[i+1]=p,e[i+2]=v,e[i+3]=g;return}if(d>=1){e[i+0]=A,e[i+1]=S,e[i+2]=E,e[i+3]=C;return}if(g!==C||m!==A||p!==S||v!==E){let y=m*A+p*S+v*E+g*C;y<0&&(A=-A,S=-S,E=-E,C=-C,y=-y);let _=1-d;if(y<.9995){const P=Math.acos(y),U=Math.sin(P);_=Math.sin(_*P)/U,d=Math.sin(d*P)/U,m=m*_+A*d,p=p*_+S*d,v=v*_+E*d,g=g*_+C*d}else{m=m*_+A*d,p=p*_+S*d,v=v*_+E*d,g=g*_+C*d;const P=1/Math.sqrt(m*m+p*p+v*v+g*g);m*=P,p*=P,v*=P,g*=P}}e[i]=m,e[i+1]=p,e[i+2]=v,e[i+3]=g}static multiplyQuaternionsFlat(e,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],v=s[l+3],g=c[h],A=c[h+1],S=c[h+2],E=c[h+3];return e[i]=d*E+v*g+m*S-p*A,e[i+1]=m*E+v*A+p*g-d*S,e[i+2]=p*E+v*S+d*A-m*g,e[i+3]=v*E-d*g-m*A-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,h=e._order,d=Math.cos,m=Math.sin,p=d(s/2),v=d(l/2),g=d(c/2),A=m(s/2),S=m(l/2),E=m(c/2);switch(h){case"XYZ":this._x=A*v*g+p*S*E,this._y=p*S*g-A*v*E,this._z=p*v*E+A*S*g,this._w=p*v*g-A*S*E;break;case"YXZ":this._x=A*v*g+p*S*E,this._y=p*S*g-A*v*E,this._z=p*v*E-A*S*g,this._w=p*v*g+A*S*E;break;case"ZXY":this._x=A*v*g-p*S*E,this._y=p*S*g+A*v*E,this._z=p*v*E+A*S*g,this._w=p*v*g-A*S*E;break;case"ZYX":this._x=A*v*g-p*S*E,this._y=p*S*g+A*v*E,this._z=p*v*E-A*S*g,this._w=p*v*g+A*S*E;break;case"YZX":this._x=A*v*g+p*S*E,this._y=p*S*g+A*v*E,this._z=p*v*E-A*S*g,this._w=p*v*g-A*S*E;break;case"XZY":this._x=A*v*g-p*S*E,this._y=p*S*g-A*v*E,this._z=p*v*E+A*S*g,this._w=p*v*g+A*S*E;break;default:ct("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],v=i[6],g=i[10],A=s+d+g;if(A>0){const S=.5/Math.sqrt(A+1);this._w=.25/S,this._x=(v-m)*S,this._y=(c-p)*S,this._z=(h-l)*S}else if(s>d&&s>g){const S=2*Math.sqrt(1+s-d-g);this._w=(v-m)/S,this._x=.25*S,this._y=(l+h)/S,this._z=(c+p)/S}else if(d>g){const S=2*Math.sqrt(1+d-s-g);this._w=(c-p)/S,this._x=(l+h)/S,this._y=.25*S,this._z=(m+v)/S}else{const S=2*Math.sqrt(1+g-s-d);this._w=(h-l)/S,this._x=(c+p)/S,this._y=(m+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,h=e._w,d=i._x,m=i._y,p=i._z,v=i._w;return this._x=s*v+h*d+l*p-c*m,this._y=l*v+h*m+c*d-s*p,this._z=c*v+h*p+s*m-l*d,this._w=h*v-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){if(i<=0)return this;if(i>=1)return this.copy(e);let s=e._x,l=e._y,c=e._z,h=e._w,d=this.dot(e);d<0&&(s=-s,l=-l,c=-c,h=-h,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),v=Math.sin(p);m=Math.sin(m*p)/v,i=Math.sin(i*p)/v,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,i=0,s=0){K.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Wg.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Wg.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,h=e.y,d=e.z,m=e.w,p=2*(h*l-d*s),v=2*(d*i-c*l),g=2*(c*s-h*i);return this.x=i+m*p+h*g-d*v,this.y=s+m*v+d*p-c*g,this.z=l+m*g+c*v-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=_t(this.x,e.x,i.x),this.y=_t(this.y,e.y,i.y),this.z=_t(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=_t(this.x,e,i),this.y=_t(this.y,e,i),this.z=_t(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return ch.copy(this).projectOnVector(e),this.sub(ch)}reflect(e){return this.sub(ch.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(_t(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ch=new K,Wg=new jo;class pt{constructor(e,i,s,l,c,h,d,m,p){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,h,d,m,p)}set(e,i,s,l,c,h,d,m,p){const v=this.elements;return v[0]=e,v[1]=l,v[2]=d,v[3]=i,v[4]=c,v[5]=m,v[6]=s,v[7]=h,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],v=s[4],g=s[7],A=s[2],S=s[5],E=s[8],C=l[0],y=l[3],_=l[6],P=l[1],U=l[4],I=l[7],Y=l[2],O=l[5],F=l[8];return c[0]=h*C+d*P+m*Y,c[3]=h*y+d*U+m*O,c[6]=h*_+d*I+m*F,c[1]=p*C+v*P+g*Y,c[4]=p*y+v*U+g*O,c[7]=p*_+v*I+g*F,c[2]=A*C+S*P+E*Y,c[5]=A*y+S*U+E*O,c[8]=A*_+S*I+E*F,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8];return i*h*v-i*d*p-s*c*v+s*d*m+l*c*p-l*h*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8],g=v*h-d*p,A=d*m-v*c,S=p*c-h*m,E=i*g+s*A+l*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=g*C,e[1]=(l*p-v*s)*C,e[2]=(d*s-l*h)*C,e[3]=A*C,e[4]=(v*i-l*m)*C,e[5]=(l*c-d*i)*C,e[6]=S*C,e[7]=(s*m-p*i)*C,e[8]=(h*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+e,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(uh.makeScale(e,i)),this}rotate(e){return this.premultiply(uh.makeRotation(-e)),this}translate(e,i){return this.premultiply(uh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uh=new pt,Qg=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qg=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function DS(){const a={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Xt&&(l.r=xa(l.r),l.g=xa(l.g),l.b=xa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Xt&&(l.r=ws(l.r),l.g=ws(l.g),l.b=ws(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Fi?Gc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Zo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Zo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return a.define({[rr]:{primaries:e,whitePoint:s,transfer:Gc,toXYZ:Qg,fromXYZ:qg,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:s,transfer:Xt,toXYZ:Qg,fromXYZ:qg,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),a}const Bt=DS();function xa(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function ws(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let ps;class RS{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{ps===void 0&&(ps=kc("canvas")),ps.width=e.width,ps.height=e.height;const l=ps.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=ps}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=kc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=xa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(xa(i[s]/255)*255):i[s]=xa(i[s]);return{data:i,width:e.width,height:e.height}}else return ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wS=0;class Fd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=Jo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(fh(l[h].image)):c.push(fh(l[h]))}else c=fh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function fh(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?RS.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(ct("Texture: Unable to serialize Texture."),{})}let US=0;const hh=new K;class An extends ya{constructor(e=An.DEFAULT_IMAGE,i=An.DEFAULT_MAPPING,s=ga,l=ga,c=Dn,h=Br,d=Ui,m=Nn,p=An.DEFAULT_ANISOTROPY,v=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:US++}),this.uuid=Jo(),this.name="",this.source=new Fd(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hh).x}get height(){return this.source.getSize(hh).y}get depth(){return this.source.getSize(hh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){ct(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ct(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jh:e.x=e.x-Math.floor(e.x);break;case ga:e.x=e.x<0?0:1;break;case jh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jh:e.y=e.y-Math.floor(e.y);break;case ga:e.y=e.y<0?0:1;break;case jh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=kv;An.DEFAULT_ANISOTROPY=1;class $t{constructor(e=0,i=0,s=0,l=1){$t.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],v=m[4],g=m[8],A=m[1],S=m[5],E=m[9],C=m[2],y=m[6],_=m[10];if(Math.abs(v-A)<.01&&Math.abs(g-C)<.01&&Math.abs(E-y)<.01){if(Math.abs(v+A)<.1&&Math.abs(g+C)<.1&&Math.abs(E+y)<.1&&Math.abs(p+S+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(p+1)/2,I=(S+1)/2,Y=(_+1)/2,O=(v+A)/4,F=(g+C)/4,ie=(E+y)/4;return U>I&&U>Y?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=O/s,c=F/s):I>Y?I<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(I),s=O/l,c=ie/l):Y<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(Y),s=F/c,l=ie/c),this.set(s,l,c,i),this}let P=Math.sqrt((y-E)*(y-E)+(g-C)*(g-C)+(A-v)*(A-v));return Math.abs(P)<.001&&(P=1),this.x=(y-E)/P,this.y=(g-C)/P,this.z=(A-v)/P,this.w=Math.acos((p+S+_-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=_t(this.x,e.x,i.x),this.y=_t(this.y,e.y,i.y),this.z=_t(this.z,e.z,i.z),this.w=_t(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=_t(this.x,e,i),this.y=_t(this.y,e,i),this.z=_t(this.z,e,i),this.w=_t(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_t(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class LS extends ya{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new $t(0,0,e,i),this.scissorTest=!1,this.viewport=new $t(0,0,e,i);const l={width:e,height:i,depth:s.depth},c=new An(l);this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Fd(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hn extends LS{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class $v extends An{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ga,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class BS extends An{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ga,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $o{constructor(e=new K(1/0,1/0,1/0),i=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Ci.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Ci.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Ci.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Ci):Ci.fromBufferAttribute(c,h),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),dc.copy(s.boundingBox)),dc.applyMatrix4(e.matrixWorld),this.union(dc)}const l=e.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zo),pc.subVectors(this.max,zo),ms.subVectors(e.a,zo),gs.subVectors(e.b,zo),vs.subVectors(e.c,zo),Ka.subVectors(gs,ms),Za.subVectors(vs,gs),Er.subVectors(ms,vs);let i=[0,-Ka.z,Ka.y,0,-Za.z,Za.y,0,-Er.z,Er.y,Ka.z,0,-Ka.x,Za.z,0,-Za.x,Er.z,0,-Er.x,-Ka.y,Ka.x,0,-Za.y,Za.x,0,-Er.y,Er.x,0];return!dh(i,ms,gs,vs,pc)||(i=[1,0,0,0,1,0,0,0,1],!dh(i,ms,gs,vs,pc))?!1:(mc.crossVectors(Ka,Za),i=[mc.x,mc.y,mc.z],dh(i,ms,gs,vs,pc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ca),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ca=[new K,new K,new K,new K,new K,new K,new K,new K],Ci=new K,dc=new $o,ms=new K,gs=new K,vs=new K,Ka=new K,Za=new K,Er=new K,zo=new K,pc=new K,mc=new K,br=new K;function dh(a,e,i,s,l){for(let c=0,h=a.length-3;c<=h;c+=3){br.fromArray(a,c);const d=l.x*Math.abs(br.x)+l.y*Math.abs(br.y)+l.z*Math.abs(br.z),m=e.dot(br),p=i.dot(br),v=s.dot(br);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const OS=new $o,Fo=new K,ph=new K;class Hd{constructor(e=new K,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):OS.setFromPoints(e).getCenter(s);let l=0;for(let c=0,h=e.length;c<h;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fo.subVectors(e,this.center);const i=Fo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Fo,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ph.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fo.copy(e.center).add(ph)),this.expandByPoint(Fo.copy(e.center).sub(ph))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ua=new K,mh=new K,gc=new K,Ja=new K,gh=new K,vc=new K,vh=new K;class NS{constructor(e=new K,i=new K(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ua)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ua.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ua.copy(this.origin).addScaledVector(this.direction,i),ua.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){mh.copy(e).add(i).multiplyScalar(.5),gc.copy(i).sub(e).normalize(),Ja.copy(this.origin).sub(mh);const c=e.distanceTo(i)*.5,h=-this.direction.dot(gc),d=Ja.dot(this.direction),m=-Ja.dot(gc),p=Ja.lengthSq(),v=Math.abs(1-h*h);let g,A,S,E;if(v>0)if(g=h*m-d,A=h*d-m,E=c*v,g>=0)if(A>=-E)if(A<=E){const C=1/v;g*=C,A*=C,S=g*(g+h*A+2*d)+A*(h*g+A+2*m)+p}else A=c,g=Math.max(0,-(h*A+d)),S=-g*g+A*(A+2*m)+p;else A=-c,g=Math.max(0,-(h*A+d)),S=-g*g+A*(A+2*m)+p;else A<=-E?(g=Math.max(0,-(-h*c+d)),A=g>0?-c:Math.min(Math.max(-c,-m),c),S=-g*g+A*(A+2*m)+p):A<=E?(g=0,A=Math.min(Math.max(-c,-m),c),S=A*(A+2*m)+p):(g=Math.max(0,-(h*c+d)),A=g>0?c:Math.min(Math.max(-c,-m),c),S=-g*g+A*(A+2*m)+p);else A=h>0?-c:c,g=Math.max(0,-(h*A+d)),S=-g*g+A*(A+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(mh).addScaledVector(gc,A),S}intersectSphere(e,i){ua.subVectors(e.center,this.origin);const s=ua.dot(this.direction),l=ua.dot(ua)-s*s,c=e.radius*e.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,h,d,m;const p=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,A=this.origin;return p>=0?(s=(e.min.x-A.x)*p,l=(e.max.x-A.x)*p):(s=(e.max.x-A.x)*p,l=(e.min.x-A.x)*p),v>=0?(c=(e.min.y-A.y)*v,h=(e.max.y-A.y)*v):(c=(e.max.y-A.y)*v,h=(e.min.y-A.y)*v),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),g>=0?(d=(e.min.z-A.z)*g,m=(e.max.z-A.z)*g):(d=(e.max.z-A.z)*g,m=(e.min.z-A.z)*g),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ua)!==null}intersectTriangle(e,i,s,l,c){gh.subVectors(i,e),vc.subVectors(s,e),vh.crossVectors(gh,vc);let h=this.direction.dot(vh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ja.subVectors(this.origin,e);const m=d*this.direction.dot(vc.crossVectors(Ja,vc));if(m<0)return null;const p=d*this.direction.dot(gh.cross(Ja));if(p<0||m+p>h)return null;const v=-d*Ja.dot(vh);return v<0?null:this.at(v/h,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mn{constructor(e,i,s,l,c,h,d,m,p,v,g,A,S,E,C,y){mn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,h,d,m,p,v,g,A,S,E,C,y)}set(e,i,s,l,c,h,d,m,p,v,g,A,S,E,C,y){const _=this.elements;return _[0]=e,_[4]=i,_[8]=s,_[12]=l,_[1]=c,_[5]=h,_[9]=d,_[13]=m,_[2]=p,_[6]=v,_[10]=g,_[14]=A,_[3]=S,_[7]=E,_[11]=C,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/xs.setFromMatrixColumn(e,0).length(),c=1/xs.setFromMatrixColumn(e,1).length(),h=1/xs.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),v=Math.cos(c),g=Math.sin(c);if(e.order==="XYZ"){const A=h*v,S=h*g,E=d*v,C=d*g;i[0]=m*v,i[4]=-m*g,i[8]=p,i[1]=S+E*p,i[5]=A-C*p,i[9]=-d*m,i[2]=C-A*p,i[6]=E+S*p,i[10]=h*m}else if(e.order==="YXZ"){const A=m*v,S=m*g,E=p*v,C=p*g;i[0]=A+C*d,i[4]=E*d-S,i[8]=h*p,i[1]=h*g,i[5]=h*v,i[9]=-d,i[2]=S*d-E,i[6]=C+A*d,i[10]=h*m}else if(e.order==="ZXY"){const A=m*v,S=m*g,E=p*v,C=p*g;i[0]=A-C*d,i[4]=-h*g,i[8]=E+S*d,i[1]=S+E*d,i[5]=h*v,i[9]=C-A*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const A=h*v,S=h*g,E=d*v,C=d*g;i[0]=m*v,i[4]=E*p-S,i[8]=A*p+C,i[1]=m*g,i[5]=C*p+A,i[9]=S*p-E,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const A=h*m,S=h*p,E=d*m,C=d*p;i[0]=m*v,i[4]=C-A*g,i[8]=E*g+S,i[1]=g,i[5]=h*v,i[9]=-d*v,i[2]=-p*v,i[6]=S*g+E,i[10]=A-C*g}else if(e.order==="XZY"){const A=h*m,S=h*p,E=d*m,C=d*p;i[0]=m*v,i[4]=-g,i[8]=p*v,i[1]=A*g+C,i[5]=h*v,i[9]=S*g-E,i[2]=E*g-S,i[6]=d*v,i[10]=C*g+A}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(PS,e,IS)}lookAt(e,i,s){const l=this.elements;return oi.subVectors(e,i),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),ja.crossVectors(s,oi),ja.lengthSq()===0&&(Math.abs(s.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),ja.crossVectors(s,oi)),ja.normalize(),xc.crossVectors(oi,ja),l[0]=ja.x,l[4]=xc.x,l[8]=oi.x,l[1]=ja.y,l[5]=xc.y,l[9]=oi.y,l[2]=ja.z,l[6]=xc.z,l[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],v=s[1],g=s[5],A=s[9],S=s[13],E=s[2],C=s[6],y=s[10],_=s[14],P=s[3],U=s[7],I=s[11],Y=s[15],O=l[0],F=l[4],ie=l[8],w=l[12],R=l[1],W=l[5],re=l[9],fe=l[13],$=l[2],N=l[6],D=l[10],H=l[14],z=l[3],le=l[7],he=l[11],L=l[15];return c[0]=h*O+d*R+m*$+p*z,c[4]=h*F+d*W+m*N+p*le,c[8]=h*ie+d*re+m*D+p*he,c[12]=h*w+d*fe+m*H+p*L,c[1]=v*O+g*R+A*$+S*z,c[5]=v*F+g*W+A*N+S*le,c[9]=v*ie+g*re+A*D+S*he,c[13]=v*w+g*fe+A*H+S*L,c[2]=E*O+C*R+y*$+_*z,c[6]=E*F+C*W+y*N+_*le,c[10]=E*ie+C*re+y*D+_*he,c[14]=E*w+C*fe+y*H+_*L,c[3]=P*O+U*R+I*$+Y*z,c[7]=P*F+U*W+I*N+Y*le,c[11]=P*ie+U*re+I*D+Y*he,c[15]=P*w+U*fe+I*H+Y*L,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],h=e[1],d=e[5],m=e[9],p=e[13],v=e[2],g=e[6],A=e[10],S=e[14],E=e[3],C=e[7],y=e[11],_=e[15];return E*(+c*m*g-l*p*g-c*d*A+s*p*A+l*d*S-s*m*S)+C*(+i*m*S-i*p*A+c*h*A-l*h*S+l*p*v-c*m*v)+y*(+i*p*g-i*d*S-c*h*g+s*h*S+c*d*v-s*p*v)+_*(-l*d*v-i*m*g+i*d*A+l*h*g-s*h*A+s*m*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],v=e[8],g=e[9],A=e[10],S=e[11],E=e[12],C=e[13],y=e[14],_=e[15],P=g*y*p-C*A*p+C*m*S-d*y*S-g*m*_+d*A*_,U=E*A*p-v*y*p-E*m*S+h*y*S+v*m*_-h*A*_,I=v*C*p-E*g*p+E*d*S-h*C*S-v*d*_+h*g*_,Y=E*g*m-v*C*m-E*d*A+h*C*A+v*d*y-h*g*y,O=i*P+s*U+l*I+c*Y;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/O;return e[0]=P*F,e[1]=(C*A*c-g*y*c-C*l*S+s*y*S+g*l*_-s*A*_)*F,e[2]=(d*y*c-C*m*c+C*l*p-s*y*p-d*l*_+s*m*_)*F,e[3]=(g*m*c-d*A*c-g*l*p+s*A*p+d*l*S-s*m*S)*F,e[4]=U*F,e[5]=(v*y*c-E*A*c+E*l*S-i*y*S-v*l*_+i*A*_)*F,e[6]=(E*m*c-h*y*c-E*l*p+i*y*p+h*l*_-i*m*_)*F,e[7]=(h*A*c-v*m*c+v*l*p-i*A*p-h*l*S+i*m*S)*F,e[8]=I*F,e[9]=(E*g*c-v*C*c-E*s*S+i*C*S+v*s*_-i*g*_)*F,e[10]=(h*C*c-E*d*c+E*s*p-i*C*p-h*s*_+i*d*_)*F,e[11]=(v*d*c-h*g*c-v*s*p+i*g*p+h*s*S-i*d*S)*F,e[12]=Y*F,e[13]=(v*C*l-E*g*l+E*s*A-i*C*A-v*s*y+i*g*y)*F,e[14]=(E*d*l-h*C*l-E*s*m+i*C*m+h*s*y-i*d*y)*F,e[15]=(h*g*l-v*d*l+v*s*m-i*g*m-h*s*A+i*d*A)*F,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=e.x,d=e.y,m=e.z,p=c*h,v=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+s,v*m-l*h,0,p*m-l*d,v*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,h){return this.set(1,s,c,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,v=h+h,g=d+d,A=c*p,S=c*v,E=c*g,C=h*v,y=h*g,_=d*g,P=m*p,U=m*v,I=m*g,Y=s.x,O=s.y,F=s.z;return l[0]=(1-(C+_))*Y,l[1]=(S+I)*Y,l[2]=(E-U)*Y,l[3]=0,l[4]=(S-I)*O,l[5]=(1-(A+_))*O,l[6]=(y+P)*O,l[7]=0,l[8]=(E+U)*F,l[9]=(y-P)*F,l[10]=(1-(A+C))*F,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let c=xs.set(l[0],l[1],l[2]).length();const h=xs.set(l[4],l[5],l[6]).length(),d=xs.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],Di.copy(this);const p=1/c,v=1/h,g=1/d;return Di.elements[0]*=p,Di.elements[1]*=p,Di.elements[2]*=p,Di.elements[4]*=v,Di.elements[5]*=v,Di.elements[6]*=v,Di.elements[8]*=g,Di.elements[9]*=g,Di.elements[10]*=g,i.setFromRotationMatrix(Di),s.x=c,s.y=h,s.z=d,this}makePerspective(e,i,s,l,c,h,d=Hi,m=!1){const p=this.elements,v=2*c/(i-e),g=2*c/(s-l),A=(i+e)/(i-e),S=(s+l)/(s-l);let E,C;if(m)E=c/(h-c),C=h*c/(h-c);else if(d===Hi)E=-(h+c)/(h-c),C=-2*h*c/(h-c);else if(d===Vc)E=-h/(h-c),C=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=A,p[12]=0,p[1]=0,p[5]=g,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=C,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,h,d=Hi,m=!1){const p=this.elements,v=2/(i-e),g=2/(s-l),A=-(i+e)/(i-e),S=-(s+l)/(s-l);let E,C;if(m)E=1/(h-c),C=h/(h-c);else if(d===Hi)E=-2/(h-c),C=-(h+c)/(h-c);else if(d===Vc)E=-1/(h-c),C=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=0,p[12]=A,p[1]=0,p[5]=g,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=E,p[14]=C,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const xs=new K,Di=new mn,PS=new K(0,0,0),IS=new K(1,1,1),ja=new K,xc=new K,oi=new K,Kg=new mn,Zg=new jo;class Sa{constructor(e=0,i=0,s=0,l=Sa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],v=l[9],g=l[2],A=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(_t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(A,p),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(_t(A,-1,1)),Math.abs(A)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-_t(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(A,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(_t(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(A,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,S),this._y=0);break;default:ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Kg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kg,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Zg.setFromEuler(this),this.setFromQuaternion(Zg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sa.DEFAULT_ORDER="XYZ";class ex{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zS=0;const Jg=new K,As=new jo,fa=new mn,Ac=new K,Ho=new K,FS=new K,HS=new jo,jg=new K(1,0,0),$g=new K(0,1,0),ev=new K(0,0,1),tv={type:"added"},GS={type:"removed"},_s={type:"childadded",child:null},xh={type:"childremoved",child:null};class ui extends ya{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zS++}),this.uuid=Jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ui.DEFAULT_UP.clone();const e=new K,i=new Sa,s=new jo,l=new K(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new mn},normalMatrix:{value:new pt}}),this.matrix=new mn,this.matrixWorld=new mn,this.matrixAutoUpdate=ui.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ex,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return As.setFromAxisAngle(e,i),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,i){return As.setFromAxisAngle(e,i),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(jg,e)}rotateY(e){return this.rotateOnAxis($g,e)}rotateZ(e){return this.rotateOnAxis(ev,e)}translateOnAxis(e,i){return Jg.copy(e).applyQuaternion(this.quaternion),this.position.add(Jg.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(jg,e)}translateY(e){return this.translateOnAxis($g,e)}translateZ(e){return this.translateOnAxis(ev,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fa.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Ac.copy(e):Ac.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Ho.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fa.lookAt(Ho,Ac,this.up):fa.lookAt(Ac,Ho,this.up),this.quaternion.setFromRotationMatrix(fa),l&&(fa.extractRotation(l.matrixWorld),As.setFromRotationMatrix(fa),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(on("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tv),_s.child=e,this.dispatchEvent(_s),_s.child=null):on("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(GS),xh.child=e,this.dispatchEvent(xh),xh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fa.multiply(e.parent.matrixWorld)),e.applyMatrix4(fa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tv),_s.child=e,this.dispatchEvent(_s),_s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,e,FS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ho,HS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const g=m[p];c(e.shapes,g)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));l.material=d}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),p=h(e.textures),v=h(e.images),g=h(e.shapes),A=h(e.skeletons),S=h(e.animations),E=h(e.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),v.length>0&&(s.images=v),g.length>0&&(s.shapes=g),A.length>0&&(s.skeletons=A),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=l,s;function h(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}ui.DEFAULT_UP=new K(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ri=new K,ha=new K,Ah=new K,da=new K,Ss=new K,ys=new K,nv=new K,_h=new K,Sh=new K,yh=new K,Mh=new $t,Eh=new $t,bh=new $t;class wi{constructor(e=new K,i=new K,s=new K){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ri.subVectors(e,i),l.cross(Ri);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ri.subVectors(l,i),ha.subVectors(s,i),Ah.subVectors(e,i);const h=Ri.dot(Ri),d=Ri.dot(ha),m=Ri.dot(Ah),p=ha.dot(ha),v=ha.dot(Ah),g=h*p-d*d;if(g===0)return c.set(0,0,0),null;const A=1/g,S=(p*m-d*v)*A,E=(h*v-d*m)*A;return c.set(1-S-E,E,S)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,da)===null?!1:da.x>=0&&da.y>=0&&da.x+da.y<=1}static getInterpolation(e,i,s,l,c,h,d,m){return this.getBarycoord(e,i,s,l,da)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,da.x),m.addScaledVector(h,da.y),m.addScaledVector(d,da.z),m)}static getInterpolatedAttribute(e,i,s,l,c,h){return Mh.setScalar(0),Eh.setScalar(0),bh.setScalar(0),Mh.fromBufferAttribute(e,i),Eh.fromBufferAttribute(e,s),bh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Mh,c.x),h.addScaledVector(Eh,c.y),h.addScaledVector(bh,c.z),h}static isFrontFacing(e,i,s,l){return Ri.subVectors(s,i),ha.subVectors(e,i),Ri.cross(ha).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),ha.subVectors(this.a,this.b),Ri.cross(ha).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return wi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return wi.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return wi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let h,d;Ss.subVectors(l,s),ys.subVectors(c,s),_h.subVectors(e,s);const m=Ss.dot(_h),p=ys.dot(_h);if(m<=0&&p<=0)return i.copy(s);Sh.subVectors(e,l);const v=Ss.dot(Sh),g=ys.dot(Sh);if(v>=0&&g<=v)return i.copy(l);const A=m*g-v*p;if(A<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(s).addScaledVector(Ss,h);yh.subVectors(e,c);const S=Ss.dot(yh),E=ys.dot(yh);if(E>=0&&S<=E)return i.copy(c);const C=S*p-m*E;if(C<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(s).addScaledVector(ys,d);const y=v*E-S*g;if(y<=0&&g-v>=0&&S-E>=0)return nv.subVectors(c,l),d=(g-v)/(g-v+(S-E)),i.copy(l).addScaledVector(nv,d);const _=1/(y+C+A);return h=C*_,d=A*_,i.copy(s).addScaledVector(Ss,h).addScaledVector(ys,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const tx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$a={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Th(a,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?a+(e-a)*6*i:i<1/2?e:i<2/3?a+(e-a)*6*(2/3-i):a}class vt{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Bt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Bt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Bt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Bt.workingColorSpace){if(e=CS(e,1),i=_t(i,0,1),s=_t(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Th(h,c,e+1/3),this.g=Th(h,c,e),this.b=Th(h,c,e-1/3)}return Bt.colorSpaceToWorking(this,l),this}setStyle(e,i=Yt){function s(c){c!==void 0&&parseFloat(c)<1&&ct("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ct("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ct("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Yt){const s=tx[e.toLowerCase()];return s!==void 0?this.setHex(s,i):ct("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xa(e.r),this.g=xa(e.g),this.b=xa(e.b),this}copyLinearToSRGB(e){return this.r=ws(e.r),this.g=ws(e.g),this.b=ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Bt.workingToColorSpace(Fn.copy(this),e),Math.round(_t(Fn.r*255,0,255))*65536+Math.round(_t(Fn.g*255,0,255))*256+Math.round(_t(Fn.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Bt.workingColorSpace){Bt.workingToColorSpace(Fn.copy(this),i);const s=Fn.r,l=Fn.g,c=Fn.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const v=(d+h)/2;if(d===h)m=0,p=0;else{const g=h-d;switch(p=v<=.5?g/(h+d):g/(2-h-d),h){case s:m=(l-c)/g+(l<c?6:0);break;case l:m=(c-s)/g+2;break;case c:m=(s-l)/g+4;break}m/=6}return e.h=m,e.s=p,e.l=v,e}getRGB(e,i=Bt.workingColorSpace){return Bt.workingToColorSpace(Fn.copy(this),i),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=Yt){Bt.workingToColorSpace(Fn.copy(this),e);const i=Fn.r,s=Fn.g,l=Fn.b;return e!==Yt?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL($a),this.setHSL($a.h+e,$a.s+i,$a.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL($a),e.getHSL(_c);const s=lh($a.h,_c.h,i),l=lh($a.s,_c.s,i),c=lh($a.l,_c.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fn=new vt;vt.NAMES=tx;let VS=0;class Hs extends ya{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:VS++}),this.uuid=Jo(),this.name="",this.type="Material",this.blending=Rs,this.side=_a,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gh,this.blendDst=Vh,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vt(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){ct(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ct(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Rs&&(s.blending=this.blending),this.side!==_a&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Gh&&(s.blendSrc=this.blendSrc),this.blendDst!==Vh&&(s.blendDst=this.blendDst),this.blendEquation!==Ur&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gg&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(s.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(e.textures),h=l(e.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nx extends Hs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sa,this.combine=Vv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pn=new K,Sc=new Oe;let kS=0;class fi{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kS++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=Vg,this.updateRanges=[],this.gpuType=va,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Sc.fromBufferAttribute(this,i),Sc.applyMatrix3(e),this.setXY(i,Sc.x,Sc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix3(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix4(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyNormalMatrix(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.transformDirection(e),this.setXYZ(i,pn.x,pn.y,pn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=Io(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Jn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Io(i,this.array)),i}setX(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Io(i,this.array)),i}setY(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Io(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Io(i,this.array)),i}setW(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array),l=Jn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array),l=Jn(l,this.array),c=Jn(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vg&&(e.usage=this.usage),e}}class ix extends fi{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class ax extends fi{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Vi extends fi{constructor(e,i,s){super(new Float32Array(e),i,s)}}let XS=0;const _i=new mn,Ch=new ui,Ms=new K,li=new $o,Go=new $o,Tn=new K;class Li extends ya{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:XS++}),this.uuid=Jo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jv(e)?ax:ix)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new pt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _i.makeRotationFromQuaternion(e),this.applyMatrix4(_i),this}rotateX(e){return _i.makeRotationX(e),this.applyMatrix4(_i),this}rotateY(e){return _i.makeRotationY(e),this.applyMatrix4(_i),this}rotateZ(e){return _i.makeRotationZ(e),this.applyMatrix4(_i),this}translate(e,i,s){return _i.makeTranslation(e,i,s),this.applyMatrix4(_i),this}scale(e,i,s){return _i.makeScale(e,i,s),this.applyMatrix4(_i),this}lookAt(e){return Ch.lookAt(e),Ch.updateMatrix(),this.applyMatrix4(Ch.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const h=e[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Vi(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $o);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){on("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];li.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&on('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hd);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){on("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const s=this.boundingSphere.center;if(li.setFromBufferAttribute(e),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Go.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(li.min,Go.min),li.expandByPoint(Tn),Tn.addVectors(li.max,Go.max),li.expandByPoint(Tn)):(li.expandByPoint(Go.min),li.expandByPoint(Go.max))}li.getCenter(s);let l=0;for(let c=0,h=e.count;c<h;c++)Tn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Tn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)Tn.fromBufferAttribute(d,p),m&&(Ms.fromBufferAttribute(e,p),Tn.add(Ms)),l=Math.max(l,s.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&on('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){on("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fi(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let ie=0;ie<s.count;ie++)d[ie]=new K,m[ie]=new K;const p=new K,v=new K,g=new K,A=new Oe,S=new Oe,E=new Oe,C=new K,y=new K;function _(ie,w,R){p.fromBufferAttribute(s,ie),v.fromBufferAttribute(s,w),g.fromBufferAttribute(s,R),A.fromBufferAttribute(c,ie),S.fromBufferAttribute(c,w),E.fromBufferAttribute(c,R),v.sub(p),g.sub(p),S.sub(A),E.sub(A);const W=1/(S.x*E.y-E.x*S.y);isFinite(W)&&(C.copy(v).multiplyScalar(E.y).addScaledVector(g,-S.y).multiplyScalar(W),y.copy(g).multiplyScalar(S.x).addScaledVector(v,-E.x).multiplyScalar(W),d[ie].add(C),d[w].add(C),d[R].add(C),m[ie].add(y),m[w].add(y),m[R].add(y))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let ie=0,w=P.length;ie<w;++ie){const R=P[ie],W=R.start,re=R.count;for(let fe=W,$=W+re;fe<$;fe+=3)_(e.getX(fe+0),e.getX(fe+1),e.getX(fe+2))}const U=new K,I=new K,Y=new K,O=new K;function F(ie){Y.fromBufferAttribute(l,ie),O.copy(Y);const w=d[ie];U.copy(w),U.sub(Y.multiplyScalar(Y.dot(w))).normalize(),I.crossVectors(O,w);const W=I.dot(m[ie])<0?-1:1;h.setXYZW(ie,U.x,U.y,U.z,W)}for(let ie=0,w=P.length;ie<w;++ie){const R=P[ie],W=R.start,re=R.count;for(let fe=W,$=W+re;fe<$;fe+=3)F(e.getX(fe+0)),F(e.getX(fe+1)),F(e.getX(fe+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new fi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let A=0,S=s.count;A<S;A++)s.setXYZ(A,0,0,0);const l=new K,c=new K,h=new K,d=new K,m=new K,p=new K,v=new K,g=new K;if(e)for(let A=0,S=e.count;A<S;A+=3){const E=e.getX(A+0),C=e.getX(A+1),y=e.getX(A+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,C),h.fromBufferAttribute(i,y),v.subVectors(h,c),g.subVectors(l,c),v.cross(g),d.fromBufferAttribute(s,E),m.fromBufferAttribute(s,C),p.fromBufferAttribute(s,y),d.add(v),m.add(v),p.add(v),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let A=0,S=i.count;A<S;A+=3)l.fromBufferAttribute(i,A+0),c.fromBufferAttribute(i,A+1),h.fromBufferAttribute(i,A+2),v.subVectors(h,c),g.subVectors(l,c),v.cross(g),s.setXYZ(A+0,v.x,v.y,v.z),s.setXYZ(A+1,v.x,v.y,v.z),s.setXYZ(A+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Tn.fromBufferAttribute(e,i),Tn.normalize(),e.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(d,m){const p=d.array,v=d.itemSize,g=d.normalized,A=new p.constructor(m.length*v);let S=0,E=0;for(let C=0,y=m.length;C<y;C++){d.isInterleavedBufferAttribute?S=m[C]*d.data.stride+d.offset:S=m[C]*v;for(let _=0;_<v;_++)A[E++]=p[S++]}return new fi(A,v,g)}if(this.index===null)return ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Li,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let v=0,g=p.length;v<g;v++){const A=p[v],S=e(A,s);m.push(S)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let g=0,A=p.length;g<A;g++){const S=p[g];v.push(S.toJSON(e.data))}v.length>0&&(l[m]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const c=e.morphAttributes;for(const p in c){const v=[],g=c[p];for(let A=0,S=g.length;A<S;A++)v.push(g[A].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,v=h.length;p<v;p++){const g=h[p];this.addGroup(g.start,g.count,g.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const iv=new mn,Tr=new NS,yc=new Hd,av=new K,Mc=new K,Ec=new K,bc=new K,Dh=new K,Tc=new K,rv=new K,Cc=new K;class Si extends ui{constructor(e=new Li,i=new nx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(c&&d){Tc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=d[m],g=c[m];v!==0&&(Dh.fromBufferAttribute(g,e),h?Tc.addScaledVector(Dh,v):Tc.addScaledVector(Dh.sub(i),v))}i.add(Tc)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),yc.copy(s.boundingSphere),yc.applyMatrix4(c),Tr.copy(e.ray).recast(e.near),!(yc.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(yc,av)===null||Tr.origin.distanceToSquared(av)>(e.far-e.near)**2))&&(iv.copy(c).invert(),Tr.copy(e.ray).applyMatrix4(iv),!(s.boundingBox!==null&&Tr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Tr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,g=c.attributes.normal,A=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,C=A.length;E<C;E++){const y=A[E],_=h[y.materialIndex],P=Math.max(y.start,S.start),U=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let I=P,Y=U;I<Y;I+=3){const O=d.getX(I),F=d.getX(I+1),ie=d.getX(I+2);l=Dc(this,_,e,s,p,v,g,O,F,ie),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),C=Math.min(d.count,S.start+S.count);for(let y=E,_=C;y<_;y+=3){const P=d.getX(y),U=d.getX(y+1),I=d.getX(y+2);l=Dc(this,h,e,s,p,v,g,P,U,I),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let E=0,C=A.length;E<C;E++){const y=A[E],_=h[y.materialIndex],P=Math.max(y.start,S.start),U=Math.min(m.count,Math.min(y.start+y.count,S.start+S.count));for(let I=P,Y=U;I<Y;I+=3){const O=I,F=I+1,ie=I+2;l=Dc(this,_,e,s,p,v,g,O,F,ie),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),C=Math.min(m.count,S.start+S.count);for(let y=E,_=C;y<_;y+=3){const P=y,U=y+1,I=y+2;l=Dc(this,h,e,s,p,v,g,P,U,I),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function YS(a,e,i,s,l,c,h,d){let m;if(e.side===Cn?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,e.side===_a,d),m===null)return null;Cc.copy(d),Cc.applyMatrix4(a.matrixWorld);const p=i.ray.origin.distanceTo(Cc);return p<i.near||p>i.far?null:{distance:p,point:Cc.clone(),object:a}}function Dc(a,e,i,s,l,c,h,d,m,p){a.getVertexPosition(d,Mc),a.getVertexPosition(m,Ec),a.getVertexPosition(p,bc);const v=YS(a,e,i,s,Mc,Ec,bc,rv);if(v){const g=new K;wi.getBarycoord(rv,Mc,Ec,bc,g),l&&(v.uv=wi.getInterpolatedAttribute(l,d,m,p,g,new Oe)),c&&(v.uv1=wi.getInterpolatedAttribute(c,d,m,p,g,new Oe)),h&&(v.normal=wi.getInterpolatedAttribute(h,d,m,p,g,new K),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const A={a:d,b:m,c:p,normal:new K,materialIndex:0};wi.getNormal(Mc,Ec,bc,A.normal),v.face=A,v.barycoord=g}return v}class el extends Li{constructor(e=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],v=[],g=[];let A=0,S=0;E("z","y","x",-1,-1,s,i,e,h,c,0),E("z","y","x",1,-1,s,i,-e,h,c,1),E("x","z","y",1,1,e,s,i,l,h,2),E("x","z","y",1,-1,e,s,-i,l,h,3),E("x","y","z",1,-1,e,i,s,l,c,4),E("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Vi(p,3)),this.setAttribute("normal",new Vi(v,3)),this.setAttribute("uv",new Vi(g,2));function E(C,y,_,P,U,I,Y,O,F,ie,w){const R=I/F,W=Y/ie,re=I/2,fe=Y/2,$=O/2,N=F+1,D=ie+1;let H=0,z=0;const le=new K;for(let he=0;he<D;he++){const L=he*W-fe;for(let j=0;j<N;j++){const pe=j*R-re;le[C]=pe*P,le[y]=L*U,le[_]=$,p.push(le.x,le.y,le.z),le[C]=0,le[y]=0,le[_]=O>0?1:-1,v.push(le.x,le.y,le.z),g.push(j/F),g.push(1-he/ie),H+=1}}for(let he=0;he<ie;he++)for(let L=0;L<F;L++){const j=A+L+N*he,pe=A+L+N*(he+1),Se=A+(L+1)+N*(he+1),Ue=A+(L+1)+N*he;m.push(j,pe,Ue),m.push(pe,Se,Ue),z+=6}d.addGroup(S,z,w),S+=z,A+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new el(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ps(a){const e={};for(const i in a){e[i]={};for(const s in a[i]){const l=a[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function Vn(a){const e={};for(let i=0;i<a.length;i++){const s=Ps(a[i]);for(const l in s)e[l]=s[l]}return e}function WS(a){const e=[];for(let i=0;i<a.length;i++)e.push(a[i].clone());return e}function rx(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Bt.workingColorSpace}const QS={clone:Ps,merge:Vn};var qS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,KS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ln extends Hs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qS,this.fragmentShader=KS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=WS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class sx extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mn,this.projectionMatrix=new mn,this.projectionMatrixInverse=new mn,this.coordinateSystem=Hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const er=new K,sv=new Oe,ov=new Oe;class ci extends sx{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Cd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cd*2*Math.atan(Math.tan(oh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){er.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(er.x,er.y).multiplyScalar(-e/er.z),er.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(er.x,er.y).multiplyScalar(-e/er.z)}getViewSize(e,i){return this.getViewBounds(e,sv,ov),i.subVectors(ov,sv)}setViewOffset(e,i,s,l,c,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(oh*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Es=-90,bs=1;class ZS extends ui{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ci(Es,bs,e,i);l.layers=this.layers,this.add(l);const c=new ci(Es,bs,e,i);c.layers=this.layers,this.add(c);const h=new ci(Es,bs,e,i);h.layers=this.layers,this.add(h);const d=new ci(Es,bs,e,i);d.layers=this.layers,this.add(d);const m=new ci(Es,bs,e,i);m.layers=this.layers,this.add(m);const p=new ci(Es,bs,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(e===Hi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Vc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,v]=this.children,g=e.getRenderTarget(),A=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,c),e.setRenderTarget(s,1,l),e.render(i,h),e.setRenderTarget(s,2,l),e.render(i,d),e.setRenderTarget(s,3,l),e.render(i,m),e.setRenderTarget(s,4,l),e.render(i,p),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),e.render(i,v),e.setRenderTarget(g,A,S),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class ox extends An{constructor(e=[],i=Ls,s,l,c,h,d,m,p,v){super(e,i,s,l,c,h,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class JS extends Hn{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new ox(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new el(5,5,5),c=new ln({name:"CubemapFromEquirect",uniforms:Ps(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Cn,blending:On});c.uniforms.tEquirect.value=i;const h=new Si(l,c),d=i.minFilter;return i.minFilter===Br&&(i.minFilter=Dn),new ZS(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,l);e.setRenderTarget(c)}}class Rc extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jS={type:"move"};class Rh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const C of e.hand.values()){const y=i.getJointPose(C,s),_=this._getHandJoint(p,C);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const v=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],A=v.position.distanceTo(g.position),S=.02,E=.005;p.inputState.pinching&&A>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&A<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(jS)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Rc;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}class Gd{constructor(e,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new vt(e),this.near=i,this.far=s}clone(){return new Gd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Dd extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sa,this.environmentIntensity=1,this.environmentRotation=new Sa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class $S extends An{constructor(e=null,i=1,s=1,l,c,h,d,m,p=Xn,v=Xn,g,A){super(null,h,d,m,p,v,l,c,g,A),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ts extends fi{constructor(e,i,s,l=1){super(e,i,s),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=l}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wh=new K,ey=new K,ty=new pt;class wr{constructor(e=new K(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=wh.subVectors(s,i).cross(ey.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(wh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(s,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||ty.getNormalMatrix(e),l=this.coplanarPoint(wh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cr=new Hd,ny=new Oe(.5,.5),wc=new K;class lx{constructor(e=new wr,i=new wr,s=new wr,l=new wr,c=new wr,h=new wr){this.planes=[e,i,s,l,c,h]}set(e,i,s,l,c,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Hi,s=!1){const l=this.planes,c=e.elements,h=c[0],d=c[1],m=c[2],p=c[3],v=c[4],g=c[5],A=c[6],S=c[7],E=c[8],C=c[9],y=c[10],_=c[11],P=c[12],U=c[13],I=c[14],Y=c[15];if(l[0].setComponents(p-h,S-v,_-E,Y-P).normalize(),l[1].setComponents(p+h,S+v,_+E,Y+P).normalize(),l[2].setComponents(p+d,S+g,_+C,Y+U).normalize(),l[3].setComponents(p-d,S-g,_-C,Y-U).normalize(),s)l[4].setComponents(m,A,y,I).normalize(),l[5].setComponents(p-m,S-A,_-y,Y-I).normalize();else if(l[4].setComponents(p-m,S-A,_-y,Y-I).normalize(),i===Hi)l[5].setComponents(p+m,S+A,_+y,Y+I).normalize();else if(i===Vc)l[5].setComponents(m,A,y,I).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Cr.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cr)}intersectsSprite(e){Cr.center.set(0,0,0);const i=ny.distanceTo(e.center);return Cr.radius=.7071067811865476+i,Cr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cr)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(wc.x=l.normal.x>0?e.max.x:e.min.x,wc.y=l.normal.y>0?e.max.y:e.min.y,wc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(wc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vd extends An{constructor(e,i,s=ar,l,c,h,d=Xn,m=Xn,p,v=Ko,g=1){if(v!==Ko&&v!==Ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const A={width:e,height:i,depth:g};super(A,l,c,h,d,m,v,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class cx extends An{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ma{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ct("Curve: .getPoint() not implemented.")}getPointAt(e,i){const s=this.getUtoTmapping(e);return this.getPoint(s,i)}getPoints(e=5){const i=[];for(let s=0;s<=e;s++)i.push(this.getPoint(s/e));return i}getSpacedPoints(e=5){const i=[];for(let s=0;s<=e;s++)i.push(this.getPointAt(s/e));return i}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const i=[];let s,l=this.getPoint(0),c=0;i.push(0);for(let h=1;h<=e;h++)s=this.getPoint(h/e),c+=s.distanceTo(l),i.push(c),l=s;return this.cacheArcLengths=i,i}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,i=null){const s=this.getLengths();let l=0;const c=s.length;let h;i?h=i:h=e*s[c-1];let d=0,m=c-1,p;for(;d<=m;)if(l=Math.floor(d+(m-d)/2),p=s[l]-h,p<0)d=l+1;else if(p>0)m=l-1;else{m=l;break}if(l=m,s[l]===h)return l/(c-1);const v=s[l],A=s[l+1]-v,S=(h-v)/A;return(l+S)/(c-1)}getTangent(e,i){let l=e-1e-4,c=e+1e-4;l<0&&(l=0),c>1&&(c=1);const h=this.getPoint(l),d=this.getPoint(c),m=i||(h.isVector2?new Oe:new K);return m.copy(d).sub(h).normalize(),m}getTangentAt(e,i){const s=this.getUtoTmapping(e);return this.getTangent(s,i)}computeFrenetFrames(e,i=!1){const s=new K,l=[],c=[],h=[],d=new K,m=new mn;for(let S=0;S<=e;S++){const E=S/e;l[S]=this.getTangentAt(E,new K)}c[0]=new K,h[0]=new K;let p=Number.MAX_VALUE;const v=Math.abs(l[0].x),g=Math.abs(l[0].y),A=Math.abs(l[0].z);v<=p&&(p=v,s.set(1,0,0)),g<=p&&(p=g,s.set(0,1,0)),A<=p&&s.set(0,0,1),d.crossVectors(l[0],s).normalize(),c[0].crossVectors(l[0],d),h[0].crossVectors(l[0],c[0]);for(let S=1;S<=e;S++){if(c[S]=c[S-1].clone(),h[S]=h[S-1].clone(),d.crossVectors(l[S-1],l[S]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(_t(l[S-1].dot(l[S]),-1,1));c[S].applyMatrix4(m.makeRotationAxis(d,E))}h[S].crossVectors(l[S],c[S])}if(i===!0){let S=Math.acos(_t(c[0].dot(c[e]),-1,1));S/=e,l[0].dot(d.crossVectors(c[0],c[e]))>0&&(S=-S);for(let E=1;E<=e;E++)c[E].applyMatrix4(m.makeRotationAxis(l[E],S*E)),h[E].crossVectors(l[E],c[E])}return{tangents:l,normals:c,binormals:h}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ux extends Ma{constructor(e=0,i=0,s=1,l=1,c=0,h=Math.PI*2,d=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=i,this.xRadius=s,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=h,this.aClockwise=d,this.aRotation=m}getPoint(e,i=new Oe){const s=i,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const h=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(h?c=0:c=l),this.aClockwise===!0&&!h&&(c===l?c=-l:c=c-l);const d=this.aStartAngle+e*c;let m=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const v=Math.cos(this.aRotation),g=Math.sin(this.aRotation),A=m-this.aX,S=p-this.aY;m=A*v-S*g+this.aX,p=A*g+S*v+this.aY}return s.set(m,p)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class iy extends ux{constructor(e,i,s,l,c,h){super(e,i,s,s,l,c,h),this.isArcCurve=!0,this.type="ArcCurve"}}function kd(){let a=0,e=0,i=0,s=0;function l(c,h,d,m){a=c,e=d,i=-3*c+3*h-2*d-m,s=2*c-2*h+d+m}return{initCatmullRom:function(c,h,d,m,p){l(h,d,p*(d-c),p*(m-h))},initNonuniformCatmullRom:function(c,h,d,m,p,v,g){let A=(h-c)/p-(d-c)/(p+v)+(d-h)/v,S=(d-h)/v-(m-h)/(v+g)+(m-d)/g;A*=v,S*=v,l(h,d,A,S)},calc:function(c){const h=c*c,d=h*c;return a+e*c+i*h+s*d}}}const Uc=new K,Uh=new kd,Lh=new kd,Bh=new kd;class ay extends Ma{constructor(e=[],i=!1,s="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=i,this.curveType=s,this.tension=l}getPoint(e,i=new K){const s=i,l=this.points,c=l.length,h=(c-(this.closed?0:1))*e;let d=Math.floor(h),m=h-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/c)+1)*c:m===0&&d===c-1&&(d=c-2,m=1);let p,v;this.closed||d>0?p=l[(d-1)%c]:(Uc.subVectors(l[0],l[1]).add(l[0]),p=Uc);const g=l[d%c],A=l[(d+1)%c];if(this.closed||d+2<c?v=l[(d+2)%c]:(Uc.subVectors(l[c-1],l[c-2]).add(l[c-1]),v=Uc),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(g),S),C=Math.pow(g.distanceToSquared(A),S),y=Math.pow(A.distanceToSquared(v),S);C<1e-4&&(C=1),E<1e-4&&(E=C),y<1e-4&&(y=C),Uh.initNonuniformCatmullRom(p.x,g.x,A.x,v.x,E,C,y),Lh.initNonuniformCatmullRom(p.y,g.y,A.y,v.y,E,C,y),Bh.initNonuniformCatmullRom(p.z,g.z,A.z,v.z,E,C,y)}else this.curveType==="catmullrom"&&(Uh.initCatmullRom(p.x,g.x,A.x,v.x,this.tension),Lh.initCatmullRom(p.y,g.y,A.y,v.y,this.tension),Bh.initCatmullRom(p.z,g.z,A.z,v.z,this.tension));return s.set(Uh.calc(m),Lh.calc(m),Bh.calc(m)),s}copy(e){super.copy(e),this.points=[];for(let i=0,s=e.points.length;i<s;i++){const l=e.points[i];this.points.push(l.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let i=0,s=this.points.length;i<s;i++){const l=this.points[i];e.points.push(l.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let i=0,s=e.points.length;i<s;i++){const l=e.points[i];this.points.push(new K().fromArray(l))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lv(a,e,i,s,l){const c=(s-e)*.5,h=(l-i)*.5,d=a*a,m=a*d;return(2*i-2*s+c+h)*m+(-3*i+3*s-2*c-h)*d+c*a+i}function ry(a,e){const i=1-a;return i*i*e}function sy(a,e){return 2*(1-a)*a*e}function oy(a,e){return a*a*e}function Yo(a,e,i,s){return ry(a,e)+sy(a,i)+oy(a,s)}function ly(a,e){const i=1-a;return i*i*i*e}function cy(a,e){const i=1-a;return 3*i*i*a*e}function uy(a,e){return 3*(1-a)*a*a*e}function fy(a,e){return a*a*a*e}function Wo(a,e,i,s,l){return ly(a,e)+cy(a,i)+uy(a,s)+fy(a,l)}class hy extends Ma{constructor(e=new Oe,i=new Oe,s=new Oe,l=new Oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=i,this.v2=s,this.v3=l}getPoint(e,i=new Oe){const s=i,l=this.v0,c=this.v1,h=this.v2,d=this.v3;return s.set(Wo(e,l.x,c.x,h.x,d.x),Wo(e,l.y,c.y,h.y,d.y)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dy extends Ma{constructor(e=new K,i=new K,s=new K,l=new K){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=i,this.v2=s,this.v3=l}getPoint(e,i=new K){const s=i,l=this.v0,c=this.v1,h=this.v2,d=this.v3;return s.set(Wo(e,l.x,c.x,h.x,d.x),Wo(e,l.y,c.y,h.y,d.y),Wo(e,l.z,c.z,h.z,d.z)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class py extends Ma{constructor(e=new Oe,i=new Oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=i}getPoint(e,i=new Oe){const s=i;return e===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(e).add(this.v1)),s}getPointAt(e,i){return this.getPoint(e,i)}getTangent(e,i=new Oe){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,i){return this.getTangent(e,i)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fx extends Ma{constructor(e=new K,i=new K){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=i}getPoint(e,i=new K){const s=i;return e===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(e).add(this.v1)),s}getPointAt(e,i){return this.getPoint(e,i)}getTangent(e,i=new K){return i.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,i){return this.getTangent(e,i)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class my extends Ma{constructor(e=new Oe,i=new Oe,s=new Oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=i,this.v2=s}getPoint(e,i=new Oe){const s=i,l=this.v0,c=this.v1,h=this.v2;return s.set(Yo(e,l.x,c.x,h.x),Yo(e,l.y,c.y,h.y)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hx extends Ma{constructor(e=new K,i=new K,s=new K){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=i,this.v2=s}getPoint(e,i=new K){const s=i,l=this.v0,c=this.v1,h=this.v2;return s.set(Yo(e,l.x,c.x,h.x),Yo(e,l.y,c.y,h.y),Yo(e,l.z,c.z,h.z)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gy extends Ma{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,i=new Oe){const s=i,l=this.points,c=(l.length-1)*e,h=Math.floor(c),d=c-h,m=l[h===0?h:h-1],p=l[h],v=l[h>l.length-2?l.length-1:h+1],g=l[h>l.length-3?l.length-1:h+2];return s.set(lv(d,m.x,p.x,v.x,g.x),lv(d,m.y,p.y,v.y,g.y)),s}copy(e){super.copy(e),this.points=[];for(let i=0,s=e.points.length;i<s;i++){const l=e.points[i];this.points.push(l.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let i=0,s=this.points.length;i<s;i++){const l=this.points[i];e.points.push(l.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let i=0,s=e.points.length;i<s;i++){const l=e.points[i];this.points.push(new Oe().fromArray(l))}return this}}var vy=Object.freeze({__proto__:null,ArcCurve:iy,CatmullRomCurve3:ay,CubicBezierCurve:hy,CubicBezierCurve3:dy,EllipseCurve:ux,LineCurve:py,LineCurve3:fx,QuadraticBezierCurve:my,QuadraticBezierCurve3:hx,SplineCurve:gy});class Is extends Li{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,v=m+1,g=e/d,A=i/m,S=[],E=[],C=[],y=[];for(let _=0;_<v;_++){const P=_*A-h;for(let U=0;U<p;U++){const I=U*g-c;E.push(I,-P,0),C.push(0,0,1),y.push(U/d),y.push(1-_/m)}}for(let _=0;_<m;_++)for(let P=0;P<d;P++){const U=P+p*_,I=P+p*(_+1),Y=P+1+p*(_+1),O=P+1+p*_;S.push(U,I,O),S.push(I,Y,O)}this.setIndex(S),this.setAttribute("position",new Vi(E,3)),this.setAttribute("normal",new Vi(C,3)),this.setAttribute("uv",new Vi(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.widthSegments,e.heightSegments)}}class Xd extends Li{constructor(e=new hx(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),i=64,s=1,l=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:i,radius:s,radialSegments:l,closed:c};const h=e.computeFrenetFrames(i,c);this.tangents=h.tangents,this.normals=h.normals,this.binormals=h.binormals;const d=new K,m=new K,p=new Oe;let v=new K;const g=[],A=[],S=[],E=[];C(),this.setIndex(E),this.setAttribute("position",new Vi(g,3)),this.setAttribute("normal",new Vi(A,3)),this.setAttribute("uv",new Vi(S,2));function C(){for(let U=0;U<i;U++)y(U);y(c===!1?i:0),P(),_()}function y(U){v=e.getPointAt(U/i,v);const I=h.normals[U],Y=h.binormals[U];for(let O=0;O<=l;O++){const F=O/l*Math.PI*2,ie=Math.sin(F),w=-Math.cos(F);m.x=w*I.x+ie*Y.x,m.y=w*I.y+ie*Y.y,m.z=w*I.z+ie*Y.z,m.normalize(),A.push(m.x,m.y,m.z),d.x=v.x+s*m.x,d.y=v.y+s*m.y,d.z=v.z+s*m.z,g.push(d.x,d.y,d.z)}}function _(){for(let U=1;U<=i;U++)for(let I=1;I<=l;I++){const Y=(l+1)*(U-1)+(I-1),O=(l+1)*U+(I-1),F=(l+1)*U+I,ie=(l+1)*(U-1)+I;E.push(Y,O,ie),E.push(O,F,ie)}}function P(){for(let U=0;U<=i;U++)for(let I=0;I<=l;I++)p.x=U/i,p.y=I/l,S.push(p.x,p.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Xd(new vy[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class xy extends Hs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Or,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ay extends Hs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class dx{constructor(e,i,s){const l=this;let c=!1,h=0,d=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(v){d++,c===!1&&l.onStart!==void 0&&l.onStart(v,h,d),c=!0},this.itemEnd=function(v){h++,l.onProgress!==void 0&&l.onProgress(v,h,d),h===d&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(v){l.onError!==void 0&&l.onError(v)},this.resolveURL=function(v){return m?m(v):v},this.setURLModifier=function(v){return m=v,this},this.addHandler=function(v,g){return p.push(v,g),this},this.removeHandler=function(v){const g=p.indexOf(v);return g!==-1&&p.splice(g,2),this},this.getHandler=function(v){for(let g=0,A=p.length;g<A;g+=2){const S=p[g],E=p[g+1];if(S.global&&(S.lastIndex=0),S.test(v))return E}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}class px extends sx{constructor(e=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,h=s+e,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class cv extends Li{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class _y extends ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Sy{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}class mt{constructor(e){this.value=e}clone(){return new mt(this.value.clone===void 0?this.value:this.value.clone())}}function uv(a,e,i,s){const l=yy(s);switch(i){case qv:return a*e;case Zv:return a*e/l.components*l.byteLength;case Nd:return a*e/l.components*l.byteLength;case Pd:return a*e*2/l.components*l.byteLength;case Id:return a*e*2/l.components*l.byteLength;case Kv:return a*e*3/l.components*l.byteLength;case Ui:return a*e*4/l.components*l.byteLength;case zd:return a*e*4/l.components*l.byteLength;case Nc:case Pc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Ic:case zc:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case ed:case nd:return Math.max(a,16)*Math.max(e,8)/4;case $h:case td:return Math.max(a,8)*Math.max(e,8)/2;case id:case ad:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case rd:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case sd:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case od:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case ld:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case cd:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case ud:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case fd:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case hd:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case dd:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case pd:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case md:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case gd:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case vd:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case xd:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Ad:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case _d:case Sd:case yd:return Math.ceil(a/4)*Math.ceil(e/4)*16;case Md:case Ed:return Math.ceil(a/4)*Math.ceil(e/4)*8;case bd:case Td:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function yy(a){switch(a){case Nn:case Xv:return{byteLength:1,components:1};case qo:case Yv:case Fs:return{byteLength:2,components:1};case Bd:case Od:return{byteLength:2,components:4};case ar:case Ld:case va:return{byteLength:4,components:1};case Wv:case Qv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zs}}));typeof window<"u"&&(window.__THREE__?ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zs);function mx(){let a=null,e=!1,i=null,s=null;function l(c,h){i(c,h),s=a.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=a.requestAnimationFrame(l),e=!0)},stop:function(){a.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){a=c}}}function My(a){const e=new WeakMap;function i(d,m){const p=d.array,v=d.usage,g=p.byteLength,A=a.createBuffer();a.bindBuffer(m,A),a.bufferData(m,p,v),d.onUploadCallback();let S;if(p instanceof Float32Array)S=a.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=a.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=a.HALF_FLOAT:S=a.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=a.SHORT;else if(p instanceof Uint32Array)S=a.UNSIGNED_INT;else if(p instanceof Int32Array)S=a.INT;else if(p instanceof Int8Array)S=a.BYTE;else if(p instanceof Uint8Array)S=a.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:A,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:g}}function s(d,m,p){const v=m.array,g=m.updateRanges;if(a.bindBuffer(p,d),g.length===0)a.bufferSubData(p,0,v);else{g.sort((S,E)=>S.start-E.start);let A=0;for(let S=1;S<g.length;S++){const E=g[A],C=g[S];C.start<=E.start+E.count+1?E.count=Math.max(E.count,C.start+C.count-E.start):(++A,g[A]=C)}g.length=A+1;for(let S=0,E=g.length;S<E;S++){const C=g[S];a.bufferSubData(p,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(a.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=e.get(d);(!v||v.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var Ey=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,by=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ty=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ry=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ly=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,By=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Oy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ny=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Py=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Iy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ky=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ky=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$y=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eM="gl_FragColor = linearToOutputTexel( gl_FragColor );",tM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,iM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,aM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,oM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_M=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,CM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,UM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,BM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,NM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,PM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,IM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,FM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,HM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,VM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,WM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,QM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,KM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,JM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,$M=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,oE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,AE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_E=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,SE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ME=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,EE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,UE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,LE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,BE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,VE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,XE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,YE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$E=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Ey,alphahash_pars_fragment:by,alphamap_fragment:Ty,alphamap_pars_fragment:Cy,alphatest_fragment:Dy,alphatest_pars_fragment:Ry,aomap_fragment:wy,aomap_pars_fragment:Uy,batching_pars_vertex:Ly,batching_vertex:By,begin_vertex:Oy,beginnormal_vertex:Ny,bsdfs:Py,iridescence_fragment:Iy,bumpmap_pars_fragment:zy,clipping_planes_fragment:Fy,clipping_planes_pars_fragment:Hy,clipping_planes_pars_vertex:Gy,clipping_planes_vertex:Vy,color_fragment:ky,color_pars_fragment:Xy,color_pars_vertex:Yy,color_vertex:Wy,common:Qy,cube_uv_reflection_fragment:qy,defaultnormal_vertex:Ky,displacementmap_pars_vertex:Zy,displacementmap_vertex:Jy,emissivemap_fragment:jy,emissivemap_pars_fragment:$y,colorspace_fragment:eM,colorspace_pars_fragment:tM,envmap_fragment:nM,envmap_common_pars_fragment:iM,envmap_pars_fragment:aM,envmap_pars_vertex:rM,envmap_physical_pars_fragment:gM,envmap_vertex:sM,fog_vertex:oM,fog_pars_vertex:lM,fog_fragment:cM,fog_pars_fragment:uM,gradientmap_pars_fragment:fM,lightmap_pars_fragment:hM,lights_lambert_fragment:dM,lights_lambert_pars_fragment:pM,lights_pars_begin:mM,lights_toon_fragment:vM,lights_toon_pars_fragment:xM,lights_phong_fragment:AM,lights_phong_pars_fragment:_M,lights_physical_fragment:SM,lights_physical_pars_fragment:yM,lights_fragment_begin:MM,lights_fragment_maps:EM,lights_fragment_end:bM,logdepthbuf_fragment:TM,logdepthbuf_pars_fragment:CM,logdepthbuf_pars_vertex:DM,logdepthbuf_vertex:RM,map_fragment:wM,map_pars_fragment:UM,map_particle_fragment:LM,map_particle_pars_fragment:BM,metalnessmap_fragment:OM,metalnessmap_pars_fragment:NM,morphinstance_vertex:PM,morphcolor_vertex:IM,morphnormal_vertex:zM,morphtarget_pars_vertex:FM,morphtarget_vertex:HM,normal_fragment_begin:GM,normal_fragment_maps:VM,normal_pars_fragment:kM,normal_pars_vertex:XM,normal_vertex:YM,normalmap_pars_fragment:WM,clearcoat_normal_fragment_begin:QM,clearcoat_normal_fragment_maps:qM,clearcoat_pars_fragment:KM,iridescence_pars_fragment:ZM,opaque_fragment:JM,packing:jM,premultiplied_alpha_fragment:$M,project_vertex:eE,dithering_fragment:tE,dithering_pars_fragment:nE,roughnessmap_fragment:iE,roughnessmap_pars_fragment:aE,shadowmap_pars_fragment:rE,shadowmap_pars_vertex:sE,shadowmap_vertex:oE,shadowmask_pars_fragment:lE,skinbase_vertex:cE,skinning_pars_vertex:uE,skinning_vertex:fE,skinnormal_vertex:hE,specularmap_fragment:dE,specularmap_pars_fragment:pE,tonemapping_fragment:mE,tonemapping_pars_fragment:gE,transmission_fragment:vE,transmission_pars_fragment:xE,uv_pars_fragment:AE,uv_pars_vertex:_E,uv_vertex:SE,worldpos_vertex:yE,background_vert:ME,background_frag:EE,backgroundCube_vert:bE,backgroundCube_frag:TE,cube_vert:CE,cube_frag:DE,depth_vert:RE,depth_frag:wE,distanceRGBA_vert:UE,distanceRGBA_frag:LE,equirect_vert:BE,equirect_frag:OE,linedashed_vert:NE,linedashed_frag:PE,meshbasic_vert:IE,meshbasic_frag:zE,meshlambert_vert:FE,meshlambert_frag:HE,meshmatcap_vert:GE,meshmatcap_frag:VE,meshnormal_vert:kE,meshnormal_frag:XE,meshphong_vert:YE,meshphong_frag:WE,meshphysical_vert:QE,meshphysical_frag:qE,meshtoon_vert:KE,meshtoon_frag:ZE,points_vert:JE,points_frag:jE,shadow_vert:$E,shadow_frag:eb,sprite_vert:tb,sprite_frag:nb},Be={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},zi={basic:{uniforms:Vn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Vn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new vt(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Vn([Be.common,Be.specularmap,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,Be.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Vn([Be.common,Be.envmap,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.roughnessmap,Be.metalnessmap,Be.fog,Be.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Vn([Be.common,Be.aomap,Be.lightmap,Be.emissivemap,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.gradientmap,Be.fog,Be.lights,{emissive:{value:new vt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Vn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,Be.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Vn([Be.points,Be.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Vn([Be.common,Be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Vn([Be.common,Be.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Vn([Be.common,Be.bumpmap,Be.normalmap,Be.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Vn([Be.sprite,Be.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Vn([Be.common,Be.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Vn([Be.lights,Be.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};zi.physical={uniforms:Vn([zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Lc={r:0,b:0,g:0},Dr=new Sa,ib=new mn;function ab(a,e,i,s,l,c,h){const d=new vt(0);let m=c===!0?0:1,p,v,g=null,A=0,S=null;function E(U){let I=U.isScene===!0?U.background:null;return I&&I.isTexture&&(I=(U.backgroundBlurriness>0?i:e).get(I)),I}function C(U){let I=!1;const Y=E(U);Y===null?_(d,m):Y&&Y.isColor&&(_(Y,1),I=!0);const O=a.xr.getEnvironmentBlendMode();O==="additive"?s.buffers.color.setClear(0,0,0,1,h):O==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(a.autoClear||I)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function y(U,I){const Y=E(I);Y&&(Y.isCubeTexture||Y.mapping===Xc)?(v===void 0&&(v=new Si(new el(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Ps(zi.backgroundCube.uniforms),vertexShader:zi.backgroundCube.vertexShader,fragmentShader:zi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(O,F,ie){this.matrixWorld.copyPosition(ie.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Dr.copy(I.backgroundRotation),Dr.x*=-1,Dr.y*=-1,Dr.z*=-1,Y.isCubeTexture&&Y.isRenderTargetTexture===!1&&(Dr.y*=-1,Dr.z*=-1),v.material.uniforms.envMap.value=Y,v.material.uniforms.flipEnvMap.value=Y.isCubeTexture&&Y.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(ib.makeRotationFromEuler(Dr)),v.material.toneMapped=Bt.getTransfer(Y.colorSpace)!==Xt,(g!==Y||A!==Y.version||S!==a.toneMapping)&&(v.material.needsUpdate=!0,g=Y,A=Y.version,S=a.toneMapping),v.layers.enableAll(),U.unshift(v,v.geometry,v.material,0,0,null)):Y&&Y.isTexture&&(p===void 0&&(p=new Si(new Is(2,2),new ln({name:"BackgroundMaterial",uniforms:Ps(zi.background.uniforms),vertexShader:zi.background.vertexShader,fragmentShader:zi.background.fragmentShader,side:_a,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=Y,p.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,p.material.toneMapped=Bt.getTransfer(Y.colorSpace)!==Xt,Y.matrixAutoUpdate===!0&&Y.updateMatrix(),p.material.uniforms.uvTransform.value.copy(Y.matrix),(g!==Y||A!==Y.version||S!==a.toneMapping)&&(p.material.needsUpdate=!0,g=Y,A=Y.version,S=a.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function _(U,I){U.getRGB(Lc,rx(a)),s.buffers.color.setClear(Lc.r,Lc.g,Lc.b,I,h)}function P(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,I=1){d.set(U),m=I,_(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(U){m=U,_(d,m)},render:C,addToRenderList:y,dispose:P}}function rb(a,e){const i=a.getParameter(a.MAX_VERTEX_ATTRIBS),s={},l=A(null);let c=l,h=!1;function d(R,W,re,fe,$){let N=!1;const D=g(fe,re,W);c!==D&&(c=D,p(c.object)),N=S(R,fe,re,$),N&&E(R,fe,re,$),$!==null&&e.update($,a.ELEMENT_ARRAY_BUFFER),(N||h)&&(h=!1,I(R,W,re,fe),$!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function m(){return a.createVertexArray()}function p(R){return a.bindVertexArray(R)}function v(R){return a.deleteVertexArray(R)}function g(R,W,re){const fe=re.wireframe===!0;let $=s[R.id];$===void 0&&($={},s[R.id]=$);let N=$[W.id];N===void 0&&(N={},$[W.id]=N);let D=N[fe];return D===void 0&&(D=A(m()),N[fe]=D),D}function A(R){const W=[],re=[],fe=[];for(let $=0;$<i;$++)W[$]=0,re[$]=0,fe[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:re,attributeDivisors:fe,object:R,attributes:{},index:null}}function S(R,W,re,fe){const $=c.attributes,N=W.attributes;let D=0;const H=re.getAttributes();for(const z in H)if(H[z].location>=0){const he=$[z];let L=N[z];if(L===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(L=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(L=R.instanceColor)),he===void 0||he.attribute!==L||L&&he.data!==L.data)return!0;D++}return c.attributesNum!==D||c.index!==fe}function E(R,W,re,fe){const $={},N=W.attributes;let D=0;const H=re.getAttributes();for(const z in H)if(H[z].location>=0){let he=N[z];he===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(he=R.instanceColor));const L={};L.attribute=he,he&&he.data&&(L.data=he.data),$[z]=L,D++}c.attributes=$,c.attributesNum=D,c.index=fe}function C(){const R=c.newAttributes;for(let W=0,re=R.length;W<re;W++)R[W]=0}function y(R){_(R,0)}function _(R,W){const re=c.newAttributes,fe=c.enabledAttributes,$=c.attributeDivisors;re[R]=1,fe[R]===0&&(a.enableVertexAttribArray(R),fe[R]=1),$[R]!==W&&(a.vertexAttribDivisor(R,W),$[R]=W)}function P(){const R=c.newAttributes,W=c.enabledAttributes;for(let re=0,fe=W.length;re<fe;re++)W[re]!==R[re]&&(a.disableVertexAttribArray(re),W[re]=0)}function U(R,W,re,fe,$,N,D){D===!0?a.vertexAttribIPointer(R,W,re,$,N):a.vertexAttribPointer(R,W,re,fe,$,N)}function I(R,W,re,fe){C();const $=fe.attributes,N=re.getAttributes(),D=W.defaultAttributeValues;for(const H in N){const z=N[H];if(z.location>=0){let le=$[H];if(le===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const he=le.normalized,L=le.itemSize,j=e.get(le);if(j===void 0)continue;const pe=j.buffer,Se=j.type,Ue=j.bytesPerElement,J=Se===a.INT||Se===a.UNSIGNED_INT||le.gpuType===Ld;if(le.isInterleavedBufferAttribute){const ue=le.data,Te=ue.stride,Ne=le.offset;if(ue.isInstancedInterleavedBuffer){for(let Xe=0;Xe<z.locationSize;Xe++)_(z.location+Xe,ue.meshPerAttribute);R.isInstancedMesh!==!0&&fe._maxInstanceCount===void 0&&(fe._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Xe=0;Xe<z.locationSize;Xe++)y(z.location+Xe);a.bindBuffer(a.ARRAY_BUFFER,pe);for(let Xe=0;Xe<z.locationSize;Xe++)U(z.location+Xe,L/z.locationSize,Se,he,Te*Ue,(Ne+L/z.locationSize*Xe)*Ue,J)}else{if(le.isInstancedBufferAttribute){for(let ue=0;ue<z.locationSize;ue++)_(z.location+ue,le.meshPerAttribute);R.isInstancedMesh!==!0&&fe._maxInstanceCount===void 0&&(fe._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ue=0;ue<z.locationSize;ue++)y(z.location+ue);a.bindBuffer(a.ARRAY_BUFFER,pe);for(let ue=0;ue<z.locationSize;ue++)U(z.location+ue,L/z.locationSize,Se,he,L*Ue,L/z.locationSize*ue*Ue,J)}}else if(D!==void 0){const he=D[H];if(he!==void 0)switch(he.length){case 2:a.vertexAttrib2fv(z.location,he);break;case 3:a.vertexAttrib3fv(z.location,he);break;case 4:a.vertexAttrib4fv(z.location,he);break;default:a.vertexAttrib1fv(z.location,he)}}}}P()}function Y(){ie();for(const R in s){const W=s[R];for(const re in W){const fe=W[re];for(const $ in fe)v(fe[$].object),delete fe[$];delete W[re]}delete s[R]}}function O(R){if(s[R.id]===void 0)return;const W=s[R.id];for(const re in W){const fe=W[re];for(const $ in fe)v(fe[$].object),delete fe[$];delete W[re]}delete s[R.id]}function F(R){for(const W in s){const re=s[W];if(re[R.id]===void 0)continue;const fe=re[R.id];for(const $ in fe)v(fe[$].object),delete fe[$];delete re[R.id]}}function ie(){w(),h=!0,c!==l&&(c=l,p(c.object))}function w(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:ie,resetDefaultState:w,dispose:Y,releaseStatesOfGeometry:O,releaseStatesOfProgram:F,initAttributes:C,enableAttribute:y,disableUnusedAttributes:P}}function sb(a,e,i){let s;function l(p){s=p}function c(p,v){a.drawArrays(s,p,v),i.update(v,s,1)}function h(p,v,g){g!==0&&(a.drawArraysInstanced(s,p,v,g),i.update(v,s,g))}function d(p,v,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,v,0,g);let S=0;for(let E=0;E<g;E++)S+=v[E];i.update(S,s,1)}function m(p,v,g,A){if(g===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<p.length;E++)h(p[E],v[E],A[E]);else{S.multiDrawArraysInstancedWEBGL(s,p,0,v,0,A,0,g);let E=0;for(let C=0;C<g;C++)E+=v[C]*A[C];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function ob(a,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");l=a.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(F){return!(F!==Ui&&s.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(F){const ie=F===Fs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Nn&&s.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==va&&!ie)}function m(F){if(F==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(ct("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const g=i.logarithmicDepthBuffer===!0,A=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),S=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),E=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=a.getParameter(a.MAX_TEXTURE_SIZE),y=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),_=a.getParameter(a.MAX_VERTEX_ATTRIBS),P=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),U=a.getParameter(a.MAX_VARYING_VECTORS),I=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),Y=E>0,O=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:g,reversedDepthBuffer:A,maxTextures:S,maxVertexTextures:E,maxTextureSize:C,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:P,maxVaryings:U,maxFragmentUniforms:I,vertexTextures:Y,maxSamples:O}}function lb(a){const e=this;let i=null,s=0,l=!1,c=!1;const h=new wr,d=new pt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(g,A){const S=g.length!==0||A||s!==0||l;return l=A,s=g.length,S},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,A){i=v(g,A,0)},this.setState=function(g,A,S){const E=g.clippingPlanes,C=g.clipIntersection,y=g.clipShadows,_=a.get(g);if(!l||E===null||E.length===0||c&&!y)c?v(null):p();else{const P=c?0:s,U=P*4;let I=_.clippingState||null;m.value=I,I=v(E,A,U,S);for(let Y=0;Y!==U;++Y)I[Y]=i[Y];_.clippingState=I,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=P}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(g,A,S,E){const C=g!==null?g.length:0;let y=null;if(C!==0){if(y=m.value,E!==!0||y===null){const _=S+C*4,P=A.matrixWorldInverse;d.getNormalMatrix(P),(y===null||y.length<_)&&(y=new Float32Array(_));for(let U=0,I=S;U!==C;++U,I+=4)h.copy(g[U]).applyMatrix4(P,d),h.normal.toArray(y,I),y[I+3]=h.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,y}}function cb(a){let e=new WeakMap;function i(h,d){return d===Kh?h.mapping=Ls:d===Zh&&(h.mapping=Bs),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Kh||d===Zh)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new JS(m.height);return p.fromEquirectangularTexture(a,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function c(){e=new WeakMap}return{get:s,dispose:c}}const nr=4,fv=[.125,.215,.35,.446,.526,.582],Lr=20,ub=256,Vo=new px,hv=new vt;let Oh=null,Nh=0,Ph=0,Ih=!1;const fb=new K;class dv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:h=256,position:d=fb}=c;Oh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oh,Nh,Ph),this._renderer.xr.enabled=Ih,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Ls||e.mapping===Bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),Ih=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:Fs,format:Ui,colorSpace:rr,depthBuffer:!1},l=pv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=hb(c)),this._blurMaterial=pb(c,e,i),this._ggxMaterial=db(c,e,i)}return l}_compileMaterial(e){const i=new Si(new Li,e);this._renderer.compile(i,Vo)}_sceneToCubeUV(e,i,s,l,c){const m=new ci(90,1,i,s),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],g=this._renderer,A=g.autoClear,S=g.toneMapping;g.getClearColor(hv),g.toneMapping=ir,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(l),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Si(new el,new nx({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,y=C.material;let _=!1;const P=e.background;P?P.isColor&&(y.color.copy(P),e.background=null,_=!0):(y.color.copy(hv),_=!0);for(let U=0;U<6;U++){const I=U%3;I===0?(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[U],c.y,c.z)):I===1?(m.up.set(0,0,p[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[U],c.z)):(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[U]));const Y=this._cubeSize;Cs(l,I*Y,U>2?Y:0,Y,Y),g.setRenderTarget(l),_&&g.render(C,m),g.render(e,m)}g.toneMapping=S,g.autoClear=A,e.background=P}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Ls||e.mapping===Bs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=gv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mv());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;Cs(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Vo)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[s];d.material=h;const m=h.uniforms,p=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),g=Math.sqrt(p*p-v*v),A=.05+p*.95,S=g*A,{_lodMax:E}=this,C=this._sizeLods[s],y=3*C*(s>E-nr?s-E+nr:0),_=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=S,m.mipInt.value=E-i,Cs(c,y,_,3*C,2*C),l.setRenderTarget(c),l.render(d,Vo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-s,Cs(e,y,_,3*C,2*C),l.setRenderTarget(e),l.render(d,Vo)}_blur(e,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,s,l,"latitudinal",c),this._halfBlur(h,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&on("blur direction must be either latitudinal or longitudinal!");const v=3,g=this._lodMeshes[l];g.material=p;const A=p.uniforms,S=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Lr-1),C=c/E,y=isFinite(c)?1+Math.floor(v*C):Lr;y>Lr&&ct(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Lr}`);const _=[];let P=0;for(let F=0;F<Lr;++F){const ie=F/C,w=Math.exp(-ie*ie/2);_.push(w),F===0?P+=w:F<y&&(P+=2*w)}for(let F=0;F<_.length;F++)_[F]=_[F]/P;A.envMap.value=e.texture,A.samples.value=y,A.weights.value=_,A.latitudinal.value=h==="latitudinal",d&&(A.poleAxis.value=d);const{_lodMax:U}=this;A.dTheta.value=E,A.mipInt.value=U-s;const I=this._sizeLods[l],Y=3*I*(l>U-nr?l-U+nr:0),O=4*(this._cubeSize-I);Cs(i,Y,O,3*I,2*I),m.setRenderTarget(i),m.render(g,Vo)}}function hb(a){const e=[],i=[],s=[];let l=a;const c=a-nr+1+fv.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);e.push(d);let m=1/d;h>a-nr?m=fv[h-a+nr-1]:h===0&&(m=0),i.push(m);const p=1/(d-2),v=-p,g=1+p,A=[v,v,g,v,g,g,v,v,g,g,v,g],S=6,E=6,C=3,y=2,_=1,P=new Float32Array(C*E*S),U=new Float32Array(y*E*S),I=new Float32Array(_*E*S);for(let O=0;O<S;O++){const F=O%3*2/3-1,ie=O>2?0:-1,w=[F,ie,0,F+2/3,ie,0,F+2/3,ie+1,0,F,ie,0,F+2/3,ie+1,0,F,ie+1,0];P.set(w,C*E*O),U.set(A,y*E*O);const R=[O,O,O,O,O,O];I.set(R,_*E*O)}const Y=new Li;Y.setAttribute("position",new fi(P,C)),Y.setAttribute("uv",new fi(U,y)),Y.setAttribute("faceIndex",new fi(I,_)),s.push(new Si(Y,null)),l>nr&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function pv(a,e,i){const s=new Hn(a,e,i);return s.texture.mapping=Xc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Cs(a,e,i,s,l){a.viewport.set(e,i,s,l),a.scissor.set(e,i,s,l)}function db(a,e,i){return new ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ub,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function pb(a,e,i){const s=new Float32Array(Lr),l=new K(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function mv(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function gv(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Yc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mb(a){let e=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Kh||m===Zh,v=m===Ls||m===Bs;if(p||v){let g=e.get(d);const A=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==A)return i===null&&(i=new dv(a)),g=p?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{const S=d.image;return p&&S&&S.height>0||v&&S&&l(S)?(i===null&&(i=new dv(a)),g=p?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",c),g.texture):null}}}return d}function l(d){let m=0;const p=6;for(let v=0;v<p;v++)d[v]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function gb(a){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=a.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Zo("WebGLRenderer: "+s+" extension not supported."),l}}}function vb(a,e,i,s){const l={},c=new WeakMap;function h(g){const A=g.target;A.index!==null&&e.remove(A.index);for(const E in A.attributes)e.remove(A.attributes[E]);A.removeEventListener("dispose",h),delete l[A.id];const S=c.get(A);S&&(e.remove(S),c.delete(A)),s.releaseStatesOfGeometry(A),A.isInstancedBufferGeometry===!0&&delete A._maxInstanceCount,i.memory.geometries--}function d(g,A){return l[A.id]===!0||(A.addEventListener("dispose",h),l[A.id]=!0,i.memory.geometries++),A}function m(g){const A=g.attributes;for(const S in A)e.update(A[S],a.ARRAY_BUFFER)}function p(g){const A=[],S=g.index,E=g.attributes.position;let C=0;if(S!==null){const P=S.array;C=S.version;for(let U=0,I=P.length;U<I;U+=3){const Y=P[U+0],O=P[U+1],F=P[U+2];A.push(Y,O,O,F,F,Y)}}else if(E!==void 0){const P=E.array;C=E.version;for(let U=0,I=P.length/3-1;U<I;U+=3){const Y=U+0,O=U+1,F=U+2;A.push(Y,O,O,F,F,Y)}}else return;const y=new(jv(A)?ax:ix)(A,1);y.version=C;const _=c.get(g);_&&e.remove(_),c.set(g,y)}function v(g){const A=c.get(g);if(A){const S=g.index;S!==null&&A.version<S.version&&p(g)}else p(g);return c.get(g)}return{get:d,update:m,getWireframeAttribute:v}}function xb(a,e,i){let s;function l(A){s=A}let c,h;function d(A){c=A.type,h=A.bytesPerElement}function m(A,S){a.drawElements(s,S,c,A*h),i.update(S,s,1)}function p(A,S,E){E!==0&&(a.drawElementsInstanced(s,S,c,A*h,E),i.update(S,s,E))}function v(A,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,A,0,E);let y=0;for(let _=0;_<E;_++)y+=S[_];i.update(y,s,1)}function g(A,S,E,C){if(E===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<A.length;_++)p(A[_]/h,S[_],C[_]);else{y.multiDrawElementsInstancedWEBGL(s,S,0,c,A,0,C,0,E);let _=0;for(let P=0;P<E;P++)_+=S[P]*C[P];i.update(_,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function Ab(a){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case a.TRIANGLES:i.triangles+=d*(c/3);break;case a.LINES:i.lines+=d*(c/2);break;case a.LINE_STRIP:i.lines+=d*(c-1);break;case a.LINE_LOOP:i.lines+=d*c;break;case a.POINTS:i.points+=d*c;break;default:on("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function _b(a,e,i){const s=new WeakMap,l=new $t;function c(h,d,m){const p=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=v!==void 0?v.length:0;let A=s.get(d);if(A===void 0||A.count!==g){let R=function(){ie.dispose(),s.delete(d),d.removeEventListener("dispose",R)};var S=R;A!==void 0&&A.texture.dispose();const E=d.morphAttributes.position!==void 0,C=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],P=d.morphAttributes.normal||[],U=d.morphAttributes.color||[];let I=0;E===!0&&(I=1),C===!0&&(I=2),y===!0&&(I=3);let Y=d.attributes.position.count*I,O=1;Y>e.maxTextureSize&&(O=Math.ceil(Y/e.maxTextureSize),Y=e.maxTextureSize);const F=new Float32Array(Y*O*4*g),ie=new $v(F,Y,O,g);ie.type=va,ie.needsUpdate=!0;const w=I*4;for(let W=0;W<g;W++){const re=_[W],fe=P[W],$=U[W],N=Y*O*4*W;for(let D=0;D<re.count;D++){const H=D*w;E===!0&&(l.fromBufferAttribute(re,D),F[N+H+0]=l.x,F[N+H+1]=l.y,F[N+H+2]=l.z,F[N+H+3]=0),C===!0&&(l.fromBufferAttribute(fe,D),F[N+H+4]=l.x,F[N+H+5]=l.y,F[N+H+6]=l.z,F[N+H+7]=0),y===!0&&(l.fromBufferAttribute($,D),F[N+H+8]=l.x,F[N+H+9]=l.y,F[N+H+10]=l.z,F[N+H+11]=$.itemSize===4?l.w:1)}}A={count:g,texture:ie,size:new Oe(Y,O)},s.set(d,A),d.addEventListener("dispose",R)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(a,"morphTexture",h.morphTexture,i);else{let E=0;for(let y=0;y<p.length;y++)E+=p[y];const C=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(a,"morphTargetBaseInfluence",C),m.getUniforms().setValue(a,"morphTargetInfluences",p)}m.getUniforms().setValue(a,"morphTargetsTexture",A.texture,i),m.getUniforms().setValue(a,"morphTargetsTextureSize",A.size)}return{update:c}}function Sb(a,e,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,v=m.geometry,g=e.get(m,v);if(l.get(g)!==p&&(e.update(g),l.set(g,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,a.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,a.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const A=m.skeleton;l.get(A)!==p&&(A.update(),l.set(A,p))}return g}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const gx=new An,vv=new Vd(1,1),vx=new $v,xx=new BS,Ax=new ox,xv=[],Av=[],_v=new Float32Array(16),Sv=new Float32Array(9),yv=new Float32Array(4);function Gs(a,e,i){const s=a[0];if(s<=0||s>0)return a;const l=e*i;let c=xv[l];if(c===void 0&&(c=new Float32Array(l),xv[l]=c),e!==0){s.toArray(c,0);for(let h=1,d=0;h!==e;++h)d+=i,a[h].toArray(c,d)}return c}function _n(a,e){if(a.length!==e.length)return!1;for(let i=0,s=a.length;i<s;i++)if(a[i]!==e[i])return!1;return!0}function Sn(a,e){for(let i=0,s=e.length;i<s;i++)a[i]=e[i]}function Wc(a,e){let i=Av[e];i===void 0&&(i=new Int32Array(e),Av[e]=i);for(let s=0;s!==e;++s)i[s]=a.allocateTextureUnit();return i}function yb(a,e){const i=this.cache;i[0]!==e&&(a.uniform1f(this.addr,e),i[0]=e)}function Mb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;a.uniform2fv(this.addr,e),Sn(i,e)}}function Eb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(_n(i,e))return;a.uniform3fv(this.addr,e),Sn(i,e)}}function bb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;a.uniform4fv(this.addr,e),Sn(i,e)}}function Tb(a,e){const i=this.cache,s=e.elements;if(s===void 0){if(_n(i,e))return;a.uniformMatrix2fv(this.addr,!1,e),Sn(i,e)}else{if(_n(i,s))return;yv.set(s),a.uniformMatrix2fv(this.addr,!1,yv),Sn(i,s)}}function Cb(a,e){const i=this.cache,s=e.elements;if(s===void 0){if(_n(i,e))return;a.uniformMatrix3fv(this.addr,!1,e),Sn(i,e)}else{if(_n(i,s))return;Sv.set(s),a.uniformMatrix3fv(this.addr,!1,Sv),Sn(i,s)}}function Db(a,e){const i=this.cache,s=e.elements;if(s===void 0){if(_n(i,e))return;a.uniformMatrix4fv(this.addr,!1,e),Sn(i,e)}else{if(_n(i,s))return;_v.set(s),a.uniformMatrix4fv(this.addr,!1,_v),Sn(i,s)}}function Rb(a,e){const i=this.cache;i[0]!==e&&(a.uniform1i(this.addr,e),i[0]=e)}function wb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;a.uniform2iv(this.addr,e),Sn(i,e)}}function Ub(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_n(i,e))return;a.uniform3iv(this.addr,e),Sn(i,e)}}function Lb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;a.uniform4iv(this.addr,e),Sn(i,e)}}function Bb(a,e){const i=this.cache;i[0]!==e&&(a.uniform1ui(this.addr,e),i[0]=e)}function Ob(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(_n(i,e))return;a.uniform2uiv(this.addr,e),Sn(i,e)}}function Nb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(_n(i,e))return;a.uniform3uiv(this.addr,e),Sn(i,e)}}function Pb(a,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(_n(i,e))return;a.uniform4uiv(this.addr,e),Sn(i,e)}}function Ib(a,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l);let c;this.type===a.SAMPLER_2D_SHADOW?(vv.compareFunction=Jv,c=vv):c=gx,i.setTexture2D(e||c,l)}function zb(a,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||xx,l)}function Fb(a,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||Ax,l)}function Hb(a,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||vx,l)}function Gb(a){switch(a){case 5126:return yb;case 35664:return Mb;case 35665:return Eb;case 35666:return bb;case 35674:return Tb;case 35675:return Cb;case 35676:return Db;case 5124:case 35670:return Rb;case 35667:case 35671:return wb;case 35668:case 35672:return Ub;case 35669:case 35673:return Lb;case 5125:return Bb;case 36294:return Ob;case 36295:return Nb;case 36296:return Pb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return zb;case 35680:case 36300:case 36308:case 36293:return Fb;case 36289:case 36303:case 36311:case 36292:return Hb}}function Vb(a,e){a.uniform1fv(this.addr,e)}function kb(a,e){const i=Gs(e,this.size,2);a.uniform2fv(this.addr,i)}function Xb(a,e){const i=Gs(e,this.size,3);a.uniform3fv(this.addr,i)}function Yb(a,e){const i=Gs(e,this.size,4);a.uniform4fv(this.addr,i)}function Wb(a,e){const i=Gs(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,i)}function Qb(a,e){const i=Gs(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,i)}function qb(a,e){const i=Gs(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,i)}function Kb(a,e){a.uniform1iv(this.addr,e)}function Zb(a,e){a.uniform2iv(this.addr,e)}function Jb(a,e){a.uniform3iv(this.addr,e)}function jb(a,e){a.uniform4iv(this.addr,e)}function $b(a,e){a.uniform1uiv(this.addr,e)}function eT(a,e){a.uniform2uiv(this.addr,e)}function tT(a,e){a.uniform3uiv(this.addr,e)}function nT(a,e){a.uniform4uiv(this.addr,e)}function iT(a,e,i){const s=this.cache,l=e.length,c=Wc(i,l);_n(s,c)||(a.uniform1iv(this.addr,c),Sn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||gx,c[h])}function aT(a,e,i){const s=this.cache,l=e.length,c=Wc(i,l);_n(s,c)||(a.uniform1iv(this.addr,c),Sn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||xx,c[h])}function rT(a,e,i){const s=this.cache,l=e.length,c=Wc(i,l);_n(s,c)||(a.uniform1iv(this.addr,c),Sn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||Ax,c[h])}function sT(a,e,i){const s=this.cache,l=e.length,c=Wc(i,l);_n(s,c)||(a.uniform1iv(this.addr,c),Sn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||vx,c[h])}function oT(a){switch(a){case 5126:return Vb;case 35664:return kb;case 35665:return Xb;case 35666:return Yb;case 35674:return Wb;case 35675:return Qb;case 35676:return qb;case 5124:case 35670:return Kb;case 35667:case 35671:return Zb;case 35668:case 35672:return Jb;case 35669:case 35673:return jb;case 5125:return $b;case 36294:return eT;case 36295:return tT;case 36296:return nT;case 35678:case 36198:case 36298:case 36306:case 35682:return iT;case 35679:case 36299:case 36307:return aT;case 35680:case 36300:case 36308:case 36293:return rT;case 36289:case 36303:case 36311:case 36292:return sT}}class lT{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Gb(i.type)}}class cT{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=oT(i.type)}}class uT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(e,i[d.id],s)}}}const zh=/(\w+)(\])?(\[|\.)?/g;function Mv(a,e){a.seq.push(e),a.map[e.id]=e}function fT(a,e,i){const s=a.name,l=s.length;for(zh.lastIndex=0;;){const c=zh.exec(s),h=zh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){Mv(i,p===void 0?new lT(d,a,e):new cT(d,a,e));break}else{let g=i.map[d];g===void 0&&(g=new uT(d),Mv(i,g)),i=g}}}class Fc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=e.getActiveUniform(i,l),h=e.getUniformLocation(i,c.name);fT(c,h,this)}}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const h=e[l];h.id in i&&s.push(h)}return s}}function Ev(a,e,i){const s=a.createShader(e);return a.shaderSource(s,i),a.compileShader(s),s}const hT=37297;let dT=0;function pT(a,e){const i=a.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const bv=new pt;function mT(a){Bt._getMatrix(bv,Bt.workingColorSpace,a);const e=`mat3( ${bv.elements.map(i=>i.toFixed(4))} )`;switch(Bt.getTransfer(a)){case Gc:return[e,"LinearTransferOETF"];case Xt:return[e,"sRGBTransferOETF"];default:return ct("WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function Tv(a,e,i){const s=a.getShaderParameter(e,a.COMPILE_STATUS),c=(a.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+pT(a.getShaderSource(e),d)}else return c}function gT(a,e){const i=mT(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function vT(a,e){let i;switch(e){case oS:i="Linear";break;case lS:i="Reinhard";break;case cS:i="Cineon";break;case uS:i="ACESFilmic";break;case hS:i="AgX";break;case dS:i="Neutral";break;case fS:i="Custom";break;default:ct("WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+a+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Bc=new K;function xT(){Bt.getLuminanceCoefficients(Bc);const a=Bc.x.toFixed(4),e=Bc.y.toFixed(4),i=Bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AT(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xo).join(`
`)}function _T(a){const e=[];for(const i in a){const s=a[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function ST(a,e){const i={},s=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=a.getActiveAttrib(e,l),h=c.name;let d=1;c.type===a.FLOAT_MAT2&&(d=2),c.type===a.FLOAT_MAT3&&(d=3),c.type===a.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:a.getAttribLocation(e,h),locationSize:d}}return i}function Xo(a){return a!==""}function Cv(a,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dv(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rd(a){return a.replace(yT,ET)}const MT=new Map;function ET(a,e){let i=et[e];if(i===void 0){const s=MT.get(e);if(s!==void 0)i=et[s],ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Rd(i)}const bT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rv(a){return a.replace(bT,TT)}function TT(a,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function wv(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function CT(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===Gv?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===H_?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===ma&&(e="SHADOWMAP_TYPE_VSM"),e}function DT(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Ls:case Bs:e="ENVMAP_TYPE_CUBE";break;case Xc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function RT(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Bs:e="ENVMAP_MODE_REFRACTION";break}return e}function wT(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Vv:e="ENVMAP_BLENDING_MULTIPLY";break;case rS:e="ENVMAP_BLENDING_MIX";break;case sS:e="ENVMAP_BLENDING_ADD";break}return e}function UT(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function LT(a,e,i,s){const l=a.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=CT(i),p=DT(i),v=RT(i),g=wT(i),A=UT(i),S=AT(i),E=_T(c),C=l.createProgram();let y,_,P=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Xo).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Xo).join(`
`),_.length>0&&(_+=`
`)):(y=[wv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xo).join(`
`),_=[wv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+g:"",A?"#define CUBEUV_TEXEL_WIDTH "+A.texelWidth:"",A?"#define CUBEUV_TEXEL_HEIGHT "+A.texelHeight:"",A?"#define CUBEUV_MAX_MIP "+A.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ir?"#define TONE_MAPPING":"",i.toneMapping!==ir?et.tonemapping_pars_fragment:"",i.toneMapping!==ir?vT("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,gT("linearToOutputTexel",i.outputColorSpace),xT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Xo).join(`
`)),h=Rd(h),h=Cv(h,i),h=Dv(h,i),d=Rd(d),d=Cv(d,i),d=Dv(d,i),h=Rv(h),d=Rv(d),i.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",i.glslVersion===kg?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===kg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const U=P+y+h,I=P+_+d,Y=Ev(l,l.VERTEX_SHADER,U),O=Ev(l,l.FRAGMENT_SHADER,I);l.attachShader(C,Y),l.attachShader(C,O),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function F(W){if(a.debug.checkShaderErrors){const re=l.getProgramInfoLog(C)||"",fe=l.getShaderInfoLog(Y)||"",$=l.getShaderInfoLog(O)||"",N=re.trim(),D=fe.trim(),H=$.trim();let z=!0,le=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(z=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(l,C,Y,O);else{const he=Tv(l,Y,"vertex"),L=Tv(l,O,"fragment");on("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+N+`
`+he+`
`+L)}else N!==""?ct("WebGLProgram: Program Info Log:",N):(D===""||H==="")&&(le=!1);le&&(W.diagnostics={runnable:z,programLog:N,vertexShader:{log:D,prefix:y},fragmentShader:{log:H,prefix:_}})}l.deleteShader(Y),l.deleteShader(O),ie=new Fc(l,C),w=ST(l,C)}let ie;this.getUniforms=function(){return ie===void 0&&F(this),ie};let w;this.getAttributes=function(){return w===void 0&&F(this),w};let R=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=l.getProgramParameter(C,hT)),R},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=dT++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=Y,this.fragmentShader=O,this}let BT=0;class OT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new NT(e),i.set(e,s)),s}}class NT{constructor(e){this.id=BT++,this.code=e,this.usedTimes=0}}function PT(a,e,i,s,l,c,h){const d=new ex,m=new OT,p=new Set,v=[],g=l.logarithmicDepthBuffer,A=l.vertexTextures;let S=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(w){return p.add(w),w===0?"uv":`uv${w}`}function y(w,R,W,re,fe){const $=re.fog,N=fe.geometry,D=w.isMeshStandardMaterial?re.environment:null,H=(w.isMeshStandardMaterial?i:e).get(w.envMap||D),z=H&&H.mapping===Xc?H.image.height:null,le=E[w.type];w.precision!==null&&(S=l.getMaxPrecision(w.precision),S!==w.precision&&ct("WebGLProgram.getParameters:",w.precision,"not supported, using",S,"instead."));const he=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,L=he!==void 0?he.length:0;let j=0;N.morphAttributes.position!==void 0&&(j=1),N.morphAttributes.normal!==void 0&&(j=2),N.morphAttributes.color!==void 0&&(j=3);let pe,Se,Ue,J;if(le){const Rt=zi[le];pe=Rt.vertexShader,Se=Rt.fragmentShader}else pe=w.vertexShader,Se=w.fragmentShader,m.update(w),Ue=m.getVertexShaderID(w),J=m.getFragmentShaderID(w);const ue=a.getRenderTarget(),Te=a.state.buffers.depth.getReversed(),Ne=fe.isInstancedMesh===!0,Xe=fe.isBatchedMesh===!0,st=!!w.map,en=!!w.matcap,ut=!!H,Et=!!w.aoMap,V=!!w.lightMap,at=!!w.bumpMap,gt=!!w.normalMap,It=!!w.displacementMap,Ge=!!w.emissiveMap,Wt=!!w.metalnessMap,qe=!!w.roughnessMap,ot=w.anisotropy>0,B=w.clearcoat>0,M=w.dispersion>0,te=w.iridescence>0,ve=w.sheen>0,_e=w.transmission>0,de=ot&&!!w.anisotropyMap,We=B&&!!w.clearcoatMap,Le=B&&!!w.clearcoatNormalMap,Je=B&&!!w.clearcoatRoughnessMap,Ye=te&&!!w.iridescenceMap,ye=te&&!!w.iridescenceThicknessMap,Ee=ve&&!!w.sheenColorMap,Qe=ve&&!!w.sheenRoughnessMap,Ve=!!w.specularMap,Pe=!!w.specularColorMap,it=!!w.specularIntensityMap,k=_e&&!!w.transmissionMap,Re=_e&&!!w.thicknessMap,Ce=!!w.gradientMap,De=!!w.alphaMap,Me=w.alphaTest>0,Ae=!!w.alphaHash,ze=!!w.extensions;let rt=ir;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(rt=a.toneMapping);const Ht={shaderID:le,shaderType:w.type,shaderName:w.name,vertexShader:pe,fragmentShader:Se,defines:w.defines,customVertexShaderID:Ue,customFragmentShaderID:J,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:S,batching:Xe,batchingColor:Xe&&fe._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&fe.instanceColor!==null,instancingMorph:Ne&&fe.morphTexture!==null,supportsVertexTextures:A,outputColorSpace:ue===null?a.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:rr,alphaToCoverage:!!w.alphaToCoverage,map:st,matcap:en,envMap:ut,envMapMode:ut&&H.mapping,envMapCubeUVHeight:z,aoMap:Et,lightMap:V,bumpMap:at,normalMap:gt,displacementMap:A&&It,emissiveMap:Ge,normalMapObjectSpace:gt&&w.normalMapType===vS,normalMapTangentSpace:gt&&w.normalMapType===gS,metalnessMap:Wt,roughnessMap:qe,anisotropy:ot,anisotropyMap:de,clearcoat:B,clearcoatMap:We,clearcoatNormalMap:Le,clearcoatRoughnessMap:Je,dispersion:M,iridescence:te,iridescenceMap:Ye,iridescenceThicknessMap:ye,sheen:ve,sheenColorMap:Ee,sheenRoughnessMap:Qe,specularMap:Ve,specularColorMap:Pe,specularIntensityMap:it,transmission:_e,transmissionMap:k,thicknessMap:Re,gradientMap:Ce,opaque:w.transparent===!1&&w.blending===Rs&&w.alphaToCoverage===!1,alphaMap:De,alphaTest:Me,alphaHash:Ae,combine:w.combine,mapUv:st&&C(w.map.channel),aoMapUv:Et&&C(w.aoMap.channel),lightMapUv:V&&C(w.lightMap.channel),bumpMapUv:at&&C(w.bumpMap.channel),normalMapUv:gt&&C(w.normalMap.channel),displacementMapUv:It&&C(w.displacementMap.channel),emissiveMapUv:Ge&&C(w.emissiveMap.channel),metalnessMapUv:Wt&&C(w.metalnessMap.channel),roughnessMapUv:qe&&C(w.roughnessMap.channel),anisotropyMapUv:de&&C(w.anisotropyMap.channel),clearcoatMapUv:We&&C(w.clearcoatMap.channel),clearcoatNormalMapUv:Le&&C(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Je&&C(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ye&&C(w.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&C(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&C(w.sheenColorMap.channel),sheenRoughnessMapUv:Qe&&C(w.sheenRoughnessMap.channel),specularMapUv:Ve&&C(w.specularMap.channel),specularColorMapUv:Pe&&C(w.specularColorMap.channel),specularIntensityMapUv:it&&C(w.specularIntensityMap.channel),transmissionMapUv:k&&C(w.transmissionMap.channel),thicknessMapUv:Re&&C(w.thicknessMap.channel),alphaMapUv:De&&C(w.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(gt||ot),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:fe.isPoints===!0&&!!N.attributes.uv&&(st||De),fog:!!$,useFog:w.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:Te,skinning:fe.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:j,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:a.shadowMap.enabled&&W.length>0,shadowMapType:a.shadowMap.type,toneMapping:rt,decodeVideoTexture:st&&w.map.isVideoTexture===!0&&Bt.getTransfer(w.map.colorSpace)===Xt,decodeVideoTextureEmissive:Ge&&w.emissiveMap.isVideoTexture===!0&&Bt.getTransfer(w.emissiveMap.colorSpace)===Xt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===kn,flipSided:w.side===Cn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ze&&w.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&w.extensions.multiDraw===!0||Xe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ht.vertexUv1s=p.has(1),Ht.vertexUv2s=p.has(2),Ht.vertexUv3s=p.has(3),p.clear(),Ht}function _(w){const R=[];if(w.shaderID?R.push(w.shaderID):(R.push(w.customVertexShaderID),R.push(w.customFragmentShaderID)),w.defines!==void 0)for(const W in w.defines)R.push(W),R.push(w.defines[W]);return w.isRawShaderMaterial===!1&&(P(R,w),U(R,w),R.push(a.outputColorSpace)),R.push(w.customProgramCacheKey),R.join()}function P(w,R){w.push(R.precision),w.push(R.outputColorSpace),w.push(R.envMapMode),w.push(R.envMapCubeUVHeight),w.push(R.mapUv),w.push(R.alphaMapUv),w.push(R.lightMapUv),w.push(R.aoMapUv),w.push(R.bumpMapUv),w.push(R.normalMapUv),w.push(R.displacementMapUv),w.push(R.emissiveMapUv),w.push(R.metalnessMapUv),w.push(R.roughnessMapUv),w.push(R.anisotropyMapUv),w.push(R.clearcoatMapUv),w.push(R.clearcoatNormalMapUv),w.push(R.clearcoatRoughnessMapUv),w.push(R.iridescenceMapUv),w.push(R.iridescenceThicknessMapUv),w.push(R.sheenColorMapUv),w.push(R.sheenRoughnessMapUv),w.push(R.specularMapUv),w.push(R.specularColorMapUv),w.push(R.specularIntensityMapUv),w.push(R.transmissionMapUv),w.push(R.thicknessMapUv),w.push(R.combine),w.push(R.fogExp2),w.push(R.sizeAttenuation),w.push(R.morphTargetsCount),w.push(R.morphAttributeCount),w.push(R.numDirLights),w.push(R.numPointLights),w.push(R.numSpotLights),w.push(R.numSpotLightMaps),w.push(R.numHemiLights),w.push(R.numRectAreaLights),w.push(R.numDirLightShadows),w.push(R.numPointLightShadows),w.push(R.numSpotLightShadows),w.push(R.numSpotLightShadowsWithMaps),w.push(R.numLightProbes),w.push(R.shadowMapType),w.push(R.toneMapping),w.push(R.numClippingPlanes),w.push(R.numClipIntersection),w.push(R.depthPacking)}function U(w,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),R.gradientMap&&d.enable(22),w.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reversedDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),w.push(d.mask)}function I(w){const R=E[w.type];let W;if(R){const re=zi[R];W=QS.clone(re.uniforms)}else W=w.uniforms;return W}function Y(w,R){let W;for(let re=0,fe=v.length;re<fe;re++){const $=v[re];if($.cacheKey===R){W=$,++W.usedTimes;break}}return W===void 0&&(W=new LT(a,R,w,c),v.push(W)),W}function O(w){if(--w.usedTimes===0){const R=v.indexOf(w);v[R]=v[v.length-1],v.pop(),w.destroy()}}function F(w){m.remove(w)}function ie(){m.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:I,acquireProgram:Y,releaseProgram:O,releaseShaderCache:F,programs:v,dispose:ie}}function IT(){let a=new WeakMap;function e(h){return a.has(h)}function i(h){let d=a.get(h);return d===void 0&&(d={},a.set(h,d)),d}function s(h){a.delete(h)}function l(h,d,m){a.get(h)[d]=m}function c(){a=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function zT(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function Uv(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function Lv(){const a=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function h(g,A,S,E,C,y){let _=a[e];return _===void 0?(_={id:g.id,object:g,geometry:A,material:S,groupOrder:E,renderOrder:g.renderOrder,z:C,group:y},a[e]=_):(_.id=g.id,_.object=g,_.geometry=A,_.material=S,_.groupOrder=E,_.renderOrder=g.renderOrder,_.z=C,_.group=y),e++,_}function d(g,A,S,E,C,y){const _=h(g,A,S,E,C,y);S.transmission>0?s.push(_):S.transparent===!0?l.push(_):i.push(_)}function m(g,A,S,E,C,y){const _=h(g,A,S,E,C,y);S.transmission>0?s.unshift(_):S.transparent===!0?l.unshift(_):i.unshift(_)}function p(g,A){i.length>1&&i.sort(g||zT),s.length>1&&s.sort(A||Uv),l.length>1&&l.sort(A||Uv)}function v(){for(let g=e,A=a.length;g<A;g++){const S=a[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:v,sort:p}}function FT(){let a=new WeakMap;function e(s,l){const c=a.get(s);let h;return c===void 0?(h=new Lv,a.set(s,[h])):l>=c.length?(h=new Lv,c.push(h)):h=c[l],h}function i(){a=new WeakMap}return{get:e,dispose:i}}function HT(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new K,color:new vt};break;case"SpotLight":i={position:new K,direction:new K,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new K,color:new vt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new K,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":i={color:new vt,position:new K,halfWidth:new K,halfHeight:new K};break}return a[e.id]=i,i}}}function GT(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=i,i}}}let VT=0;function kT(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function XT(a){const e=new HT,i=GT(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new K);const l=new K,c=new mn,h=new mn;function d(p){let v=0,g=0,A=0;for(let w=0;w<9;w++)s.probe[w].set(0,0,0);let S=0,E=0,C=0,y=0,_=0,P=0,U=0,I=0,Y=0,O=0,F=0;p.sort(kT);for(let w=0,R=p.length;w<R;w++){const W=p[w],re=W.color,fe=W.intensity,$=W.distance,N=W.shadow&&W.shadow.map?W.shadow.map.texture:null;if(W.isAmbientLight)v+=re.r*fe,g+=re.g*fe,A+=re.b*fe;else if(W.isLightProbe){for(let D=0;D<9;D++)s.probe[D].addScaledVector(W.sh.coefficients[D],fe);F++}else if(W.isDirectionalLight){const D=e.get(W);if(D.color.copy(W.color).multiplyScalar(W.intensity),W.castShadow){const H=W.shadow,z=i.get(W);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,s.directionalShadow[S]=z,s.directionalShadowMap[S]=N,s.directionalShadowMatrix[S]=W.shadow.matrix,P++}s.directional[S]=D,S++}else if(W.isSpotLight){const D=e.get(W);D.position.setFromMatrixPosition(W.matrixWorld),D.color.copy(re).multiplyScalar(fe),D.distance=$,D.coneCos=Math.cos(W.angle),D.penumbraCos=Math.cos(W.angle*(1-W.penumbra)),D.decay=W.decay,s.spot[C]=D;const H=W.shadow;if(W.map&&(s.spotLightMap[Y]=W.map,Y++,H.updateMatrices(W),W.castShadow&&O++),s.spotLightMatrix[C]=H.matrix,W.castShadow){const z=i.get(W);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,s.spotShadow[C]=z,s.spotShadowMap[C]=N,I++}C++}else if(W.isRectAreaLight){const D=e.get(W);D.color.copy(re).multiplyScalar(fe),D.halfWidth.set(W.width*.5,0,0),D.halfHeight.set(0,W.height*.5,0),s.rectArea[y]=D,y++}else if(W.isPointLight){const D=e.get(W);if(D.color.copy(W.color).multiplyScalar(W.intensity),D.distance=W.distance,D.decay=W.decay,W.castShadow){const H=W.shadow,z=i.get(W);z.shadowIntensity=H.intensity,z.shadowBias=H.bias,z.shadowNormalBias=H.normalBias,z.shadowRadius=H.radius,z.shadowMapSize=H.mapSize,z.shadowCameraNear=H.camera.near,z.shadowCameraFar=H.camera.far,s.pointShadow[E]=z,s.pointShadowMap[E]=N,s.pointShadowMatrix[E]=W.shadow.matrix,U++}s.point[E]=D,E++}else if(W.isHemisphereLight){const D=e.get(W);D.skyColor.copy(W.color).multiplyScalar(fe),D.groundColor.copy(W.groundColor).multiplyScalar(fe),s.hemi[_]=D,_++}}y>0&&(a.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Be.LTC_FLOAT_1,s.rectAreaLTC2=Be.LTC_FLOAT_2):(s.rectAreaLTC1=Be.LTC_HALF_1,s.rectAreaLTC2=Be.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=g,s.ambient[2]=A;const ie=s.hash;(ie.directionalLength!==S||ie.pointLength!==E||ie.spotLength!==C||ie.rectAreaLength!==y||ie.hemiLength!==_||ie.numDirectionalShadows!==P||ie.numPointShadows!==U||ie.numSpotShadows!==I||ie.numSpotMaps!==Y||ie.numLightProbes!==F)&&(s.directional.length=S,s.spot.length=C,s.rectArea.length=y,s.point.length=E,s.hemi.length=_,s.directionalShadow.length=P,s.directionalShadowMap.length=P,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=I,s.spotShadowMap.length=I,s.directionalShadowMatrix.length=P,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=I+Y-O,s.spotLightMap.length=Y,s.numSpotLightShadowsWithMaps=O,s.numLightProbes=F,ie.directionalLength=S,ie.pointLength=E,ie.spotLength=C,ie.rectAreaLength=y,ie.hemiLength=_,ie.numDirectionalShadows=P,ie.numPointShadows=U,ie.numSpotShadows=I,ie.numSpotMaps=Y,ie.numLightProbes=F,s.version=VT++)}function m(p,v){let g=0,A=0,S=0,E=0,C=0;const y=v.matrixWorldInverse;for(let _=0,P=p.length;_<P;_++){const U=p[_];if(U.isDirectionalLight){const I=s.directional[g];I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(y),g++}else if(U.isSpotLight){const I=s.spot[S];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(y),I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(y),S++}else if(U.isRectAreaLight){const I=s.rectArea[E];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(y),h.identity(),c.copy(U.matrixWorld),c.premultiply(y),h.extractRotation(c),I.halfWidth.set(U.width*.5,0,0),I.halfHeight.set(0,U.height*.5,0),I.halfWidth.applyMatrix4(h),I.halfHeight.applyMatrix4(h),E++}else if(U.isPointLight){const I=s.point[A];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(y),A++}else if(U.isHemisphereLight){const I=s.hemi[C];I.direction.setFromMatrixPosition(U.matrixWorld),I.direction.transformDirection(y),C++}}}return{setup:d,setupView:m,state:s}}function Bv(a){const e=new XT(a),i=[],s=[];function l(v){p.camera=v,i.length=0,s.length=0}function c(v){i.push(v)}function h(v){s.push(v)}function d(){e.setup(i)}function m(v){e.setupView(i,v)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function YT(a){let e=new WeakMap;function i(l,c=0){const h=e.get(l);let d;return h===void 0?(d=new Bv(a),e.set(l,[d])):c>=h.length?(d=new Bv(a),h.push(d)):d=h[c],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const WT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qT(a,e,i){let s=new lx;const l=new Oe,c=new Oe,h=new $t,d=new xy({depthPacking:mS}),m=new Ay,p={},v=i.maxTextureSize,g={[_a]:Cn,[Cn]:_a,[kn]:kn},A=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:WT,fragmentShader:QT}),S=A.clone();S.defines.HORIZONTAL_PASS=1;const E=new Li;E.setAttribute("position",new fi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new Si(E,A),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gv;let _=this.type;this.render=function(O,F,ie){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;const w=a.getRenderTarget(),R=a.getActiveCubeFace(),W=a.getActiveMipmapLevel(),re=a.state;re.setBlending(On),re.buffers.depth.getReversed()===!0?re.buffers.color.setClear(0,0,0,0):re.buffers.color.setClear(1,1,1,1),re.buffers.depth.setTest(!0),re.setScissorTest(!1);const fe=_!==ma&&this.type===ma,$=_===ma&&this.type!==ma;for(let N=0,D=O.length;N<D;N++){const H=O[N],z=H.shadow;if(z===void 0){ct("WebGLShadowMap:",H,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;l.copy(z.mapSize);const le=z.getFrameExtents();if(l.multiply(le),c.copy(z.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/le.x),l.x=c.x*le.x,z.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/le.y),l.y=c.y*le.y,z.mapSize.y=c.y)),z.map===null||fe===!0||$===!0){const L=this.type!==ma?{minFilter:Xn,magFilter:Xn}:{};z.map!==null&&z.map.dispose(),z.map=new Hn(l.x,l.y,L),z.map.texture.name=H.name+".shadowMap",z.camera.updateProjectionMatrix()}a.setRenderTarget(z.map),a.clear();const he=z.getViewportCount();for(let L=0;L<he;L++){const j=z.getViewport(L);h.set(c.x*j.x,c.y*j.y,c.x*j.z,c.y*j.w),re.viewport(h),z.updateMatrices(H,L),s=z.getFrustum(),I(F,ie,z.camera,H,this.type)}z.isPointLightShadow!==!0&&this.type===ma&&P(z,ie),z.needsUpdate=!1}_=this.type,y.needsUpdate=!1,a.setRenderTarget(w,R,W)};function P(O,F){const ie=e.update(C);A.defines.VSM_SAMPLES!==O.blurSamples&&(A.defines.VSM_SAMPLES=O.blurSamples,S.defines.VSM_SAMPLES=O.blurSamples,A.needsUpdate=!0,S.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new Hn(l.x,l.y)),A.uniforms.shadow_pass.value=O.map.texture,A.uniforms.resolution.value=O.mapSize,A.uniforms.radius.value=O.radius,a.setRenderTarget(O.mapPass),a.clear(),a.renderBufferDirect(F,null,ie,A,C,null),S.uniforms.shadow_pass.value=O.mapPass.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,a.setRenderTarget(O.map),a.clear(),a.renderBufferDirect(F,null,ie,S,C,null)}function U(O,F,ie,w){let R=null;const W=ie.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(W!==void 0)R=W;else if(R=ie.isPointLight===!0?m:d,a.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const re=R.uuid,fe=F.uuid;let $=p[re];$===void 0&&($={},p[re]=$);let N=$[fe];N===void 0&&(N=R.clone(),$[fe]=N,F.addEventListener("dispose",Y)),R=N}if(R.visible=F.visible,R.wireframe=F.wireframe,w===ma?R.side=F.shadowSide!==null?F.shadowSide:F.side:R.side=F.shadowSide!==null?F.shadowSide:g[F.side],R.alphaMap=F.alphaMap,R.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,R.map=F.map,R.clipShadows=F.clipShadows,R.clippingPlanes=F.clippingPlanes,R.clipIntersection=F.clipIntersection,R.displacementMap=F.displacementMap,R.displacementScale=F.displacementScale,R.displacementBias=F.displacementBias,R.wireframeLinewidth=F.wireframeLinewidth,R.linewidth=F.linewidth,ie.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const re=a.properties.get(R);re.light=ie}return R}function I(O,F,ie,w,R){if(O.visible===!1)return;if(O.layers.test(F.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===ma)&&(!O.frustumCulled||s.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,O.matrixWorld);const fe=e.update(O),$=O.material;if(Array.isArray($)){const N=fe.groups;for(let D=0,H=N.length;D<H;D++){const z=N[D],le=$[z.materialIndex];if(le&&le.visible){const he=U(O,le,w,R);O.onBeforeShadow(a,O,F,ie,fe,he,z),a.renderBufferDirect(ie,null,fe,he,O,z),O.onAfterShadow(a,O,F,ie,fe,he,z)}}}else if($.visible){const N=U(O,$,w,R);O.onBeforeShadow(a,O,F,ie,fe,N,null),a.renderBufferDirect(ie,null,fe,N,O,null),O.onAfterShadow(a,O,F,ie,fe,N,null)}}const re=O.children;for(let fe=0,$=re.length;fe<$;fe++)I(re[fe],F,ie,w,R)}function Y(O){O.target.removeEventListener("dispose",Y);for(const ie in p){const w=p[ie],R=O.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}const KT={[kh]:Hc,[Xh]:Qh,[Yh]:qh,[Us]:Wh,[Hc]:kh,[Qh]:Xh,[qh]:Yh,[Wh]:Us};function ZT(a,e){function i(){let k=!1;const Re=new $t;let Ce=null;const De=new $t(0,0,0,0);return{setMask:function(Me){Ce!==Me&&!k&&(a.colorMask(Me,Me,Me,Me),Ce=Me)},setLocked:function(Me){k=Me},setClear:function(Me,Ae,ze,rt,Ht){Ht===!0&&(Me*=rt,Ae*=rt,ze*=rt),Re.set(Me,Ae,ze,rt),De.equals(Re)===!1&&(a.clearColor(Me,Ae,ze,rt),De.copy(Re))},reset:function(){k=!1,Ce=null,De.set(-1,0,0,0)}}}function s(){let k=!1,Re=!1,Ce=null,De=null,Me=null;return{setReversed:function(Ae){if(Re!==Ae){const ze=e.get("EXT_clip_control");Ae?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),Re=Ae;const rt=Me;Me=null,this.setClear(rt)}},getReversed:function(){return Re},setTest:function(Ae){Ae?ue(a.DEPTH_TEST):Te(a.DEPTH_TEST)},setMask:function(Ae){Ce!==Ae&&!k&&(a.depthMask(Ae),Ce=Ae)},setFunc:function(Ae){if(Re&&(Ae=KT[Ae]),De!==Ae){switch(Ae){case kh:a.depthFunc(a.NEVER);break;case Hc:a.depthFunc(a.ALWAYS);break;case Xh:a.depthFunc(a.LESS);break;case Us:a.depthFunc(a.LEQUAL);break;case Yh:a.depthFunc(a.EQUAL);break;case Wh:a.depthFunc(a.GEQUAL);break;case Qh:a.depthFunc(a.GREATER);break;case qh:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}De=Ae}},setLocked:function(Ae){k=Ae},setClear:function(Ae){Me!==Ae&&(Re&&(Ae=1-Ae),a.clearDepth(Ae),Me=Ae)},reset:function(){k=!1,Ce=null,De=null,Me=null,Re=!1}}}function l(){let k=!1,Re=null,Ce=null,De=null,Me=null,Ae=null,ze=null,rt=null,Ht=null;return{setTest:function(Rt){k||(Rt?ue(a.STENCIL_TEST):Te(a.STENCIL_TEST))},setMask:function(Rt){Re!==Rt&&!k&&(a.stencilMask(Rt),Re=Rt)},setFunc:function(Rt,Pn,jn){(Ce!==Rt||De!==Pn||Me!==jn)&&(a.stencilFunc(Rt,Pn,jn),Ce=Rt,De=Pn,Me=jn)},setOp:function(Rt,Pn,jn){(Ae!==Rt||ze!==Pn||rt!==jn)&&(a.stencilOp(Rt,Pn,jn),Ae=Rt,ze=Pn,rt=jn)},setLocked:function(Rt){k=Rt},setClear:function(Rt){Ht!==Rt&&(a.clearStencil(Rt),Ht=Rt)},reset:function(){k=!1,Re=null,Ce=null,De=null,Me=null,Ae=null,ze=null,rt=null,Ht=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let v={},g={},A=new WeakMap,S=[],E=null,C=!1,y=null,_=null,P=null,U=null,I=null,Y=null,O=null,F=new vt(0,0,0),ie=0,w=!1,R=null,W=null,re=null,fe=null,$=null;const N=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,H=0;const z=a.getParameter(a.VERSION);z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(z)[1]),D=H>=1):z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),D=H>=2);let le=null,he={};const L=a.getParameter(a.SCISSOR_BOX),j=a.getParameter(a.VIEWPORT),pe=new $t().fromArray(L),Se=new $t().fromArray(j);function Ue(k,Re,Ce,De){const Me=new Uint8Array(4),Ae=a.createTexture();a.bindTexture(k,Ae),a.texParameteri(k,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(k,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let ze=0;ze<Ce;ze++)k===a.TEXTURE_3D||k===a.TEXTURE_2D_ARRAY?a.texImage3D(Re,0,a.RGBA,1,1,De,0,a.RGBA,a.UNSIGNED_BYTE,Me):a.texImage2D(Re+ze,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Me);return Ae}const J={};J[a.TEXTURE_2D]=Ue(a.TEXTURE_2D,a.TEXTURE_2D,1),J[a.TEXTURE_CUBE_MAP]=Ue(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[a.TEXTURE_2D_ARRAY]=Ue(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),J[a.TEXTURE_3D]=Ue(a.TEXTURE_3D,a.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ue(a.DEPTH_TEST),h.setFunc(Us),at(!1),gt(Ig),ue(a.CULL_FACE),Et(On);function ue(k){v[k]!==!0&&(a.enable(k),v[k]=!0)}function Te(k){v[k]!==!1&&(a.disable(k),v[k]=!1)}function Ne(k,Re){return g[k]!==Re?(a.bindFramebuffer(k,Re),g[k]=Re,k===a.DRAW_FRAMEBUFFER&&(g[a.FRAMEBUFFER]=Re),k===a.FRAMEBUFFER&&(g[a.DRAW_FRAMEBUFFER]=Re),!0):!1}function Xe(k,Re){let Ce=S,De=!1;if(k){Ce=A.get(Re),Ce===void 0&&(Ce=[],A.set(Re,Ce));const Me=k.textures;if(Ce.length!==Me.length||Ce[0]!==a.COLOR_ATTACHMENT0){for(let Ae=0,ze=Me.length;Ae<ze;Ae++)Ce[Ae]=a.COLOR_ATTACHMENT0+Ae;Ce.length=Me.length,De=!0}}else Ce[0]!==a.BACK&&(Ce[0]=a.BACK,De=!0);De&&a.drawBuffers(Ce)}function st(k){return E!==k?(a.useProgram(k),E=k,!0):!1}const en={[Ur]:a.FUNC_ADD,[V_]:a.FUNC_SUBTRACT,[k_]:a.FUNC_REVERSE_SUBTRACT};en[X_]=a.MIN,en[Y_]=a.MAX;const ut={[W_]:a.ZERO,[Q_]:a.ONE,[q_]:a.SRC_COLOR,[Gh]:a.SRC_ALPHA,[eS]:a.SRC_ALPHA_SATURATE,[j_]:a.DST_COLOR,[Z_]:a.DST_ALPHA,[K_]:a.ONE_MINUS_SRC_COLOR,[Vh]:a.ONE_MINUS_SRC_ALPHA,[$_]:a.ONE_MINUS_DST_COLOR,[J_]:a.ONE_MINUS_DST_ALPHA,[tS]:a.CONSTANT_COLOR,[nS]:a.ONE_MINUS_CONSTANT_COLOR,[iS]:a.CONSTANT_ALPHA,[aS]:a.ONE_MINUS_CONSTANT_ALPHA};function Et(k,Re,Ce,De,Me,Ae,ze,rt,Ht,Rt){if(k===On){C===!0&&(Te(a.BLEND),C=!1);return}if(C===!1&&(ue(a.BLEND),C=!0),k!==G_){if(k!==y||Rt!==w){if((_!==Ur||I!==Ur)&&(a.blendEquation(a.FUNC_ADD),_=Ur,I=Ur),Rt)switch(k){case Rs:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case zg:a.blendFunc(a.ONE,a.ONE);break;case Fg:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Hg:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:on("WebGLState: Invalid blending: ",k);break}else switch(k){case Rs:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case zg:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case Fg:on("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hg:on("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:on("WebGLState: Invalid blending: ",k);break}P=null,U=null,Y=null,O=null,F.set(0,0,0),ie=0,y=k,w=Rt}return}Me=Me||Re,Ae=Ae||Ce,ze=ze||De,(Re!==_||Me!==I)&&(a.blendEquationSeparate(en[Re],en[Me]),_=Re,I=Me),(Ce!==P||De!==U||Ae!==Y||ze!==O)&&(a.blendFuncSeparate(ut[Ce],ut[De],ut[Ae],ut[ze]),P=Ce,U=De,Y=Ae,O=ze),(rt.equals(F)===!1||Ht!==ie)&&(a.blendColor(rt.r,rt.g,rt.b,Ht),F.copy(rt),ie=Ht),y=k,w=!1}function V(k,Re){k.side===kn?Te(a.CULL_FACE):ue(a.CULL_FACE);let Ce=k.side===Cn;Re&&(Ce=!Ce),at(Ce),k.blending===Rs&&k.transparent===!1?Et(On):Et(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),c.setMask(k.colorWrite);const De=k.stencilWrite;d.setTest(De),De&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ge(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ue(a.SAMPLE_ALPHA_TO_COVERAGE):Te(a.SAMPLE_ALPHA_TO_COVERAGE)}function at(k){R!==k&&(k?a.frontFace(a.CW):a.frontFace(a.CCW),R=k)}function gt(k){k!==z_?(ue(a.CULL_FACE),k!==W&&(k===Ig?a.cullFace(a.BACK):k===F_?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Te(a.CULL_FACE),W=k}function It(k){k!==re&&(D&&a.lineWidth(k),re=k)}function Ge(k,Re,Ce){k?(ue(a.POLYGON_OFFSET_FILL),(fe!==Re||$!==Ce)&&(a.polygonOffset(Re,Ce),fe=Re,$=Ce)):Te(a.POLYGON_OFFSET_FILL)}function Wt(k){k?ue(a.SCISSOR_TEST):Te(a.SCISSOR_TEST)}function qe(k){k===void 0&&(k=a.TEXTURE0+N-1),le!==k&&(a.activeTexture(k),le=k)}function ot(k,Re,Ce){Ce===void 0&&(le===null?Ce=a.TEXTURE0+N-1:Ce=le);let De=he[Ce];De===void 0&&(De={type:void 0,texture:void 0},he[Ce]=De),(De.type!==k||De.texture!==Re)&&(le!==Ce&&(a.activeTexture(Ce),le=Ce),a.bindTexture(k,Re||J[k]),De.type=k,De.texture=Re)}function B(){const k=he[le];k!==void 0&&k.type!==void 0&&(a.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function M(){try{a.compressedTexImage2D(...arguments)}catch(k){k("WebGLState:",k)}}function te(){try{a.compressedTexImage3D(...arguments)}catch(k){k("WebGLState:",k)}}function ve(){try{a.texSubImage2D(...arguments)}catch(k){k("WebGLState:",k)}}function _e(){try{a.texSubImage3D(...arguments)}catch(k){k("WebGLState:",k)}}function de(){try{a.compressedTexSubImage2D(...arguments)}catch(k){k("WebGLState:",k)}}function We(){try{a.compressedTexSubImage3D(...arguments)}catch(k){k("WebGLState:",k)}}function Le(){try{a.texStorage2D(...arguments)}catch(k){k("WebGLState:",k)}}function Je(){try{a.texStorage3D(...arguments)}catch(k){k("WebGLState:",k)}}function Ye(){try{a.texImage2D(...arguments)}catch(k){k("WebGLState:",k)}}function ye(){try{a.texImage3D(...arguments)}catch(k){k("WebGLState:",k)}}function Ee(k){pe.equals(k)===!1&&(a.scissor(k.x,k.y,k.z,k.w),pe.copy(k))}function Qe(k){Se.equals(k)===!1&&(a.viewport(k.x,k.y,k.z,k.w),Se.copy(k))}function Ve(k,Re){let Ce=p.get(Re);Ce===void 0&&(Ce=new WeakMap,p.set(Re,Ce));let De=Ce.get(k);De===void 0&&(De=a.getUniformBlockIndex(Re,k.name),Ce.set(k,De))}function Pe(k,Re){const De=p.get(Re).get(k);m.get(Re)!==De&&(a.uniformBlockBinding(Re,De,k.__bindingPointIndex),m.set(Re,De))}function it(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),h.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),v={},le=null,he={},g={},A=new WeakMap,S=[],E=null,C=!1,y=null,_=null,P=null,U=null,I=null,Y=null,O=null,F=new vt(0,0,0),ie=0,w=!1,R=null,W=null,re=null,fe=null,$=null,pe.set(0,0,a.canvas.width,a.canvas.height),Se.set(0,0,a.canvas.width,a.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:ue,disable:Te,bindFramebuffer:Ne,drawBuffers:Xe,useProgram:st,setBlending:Et,setMaterial:V,setFlipSided:at,setCullFace:gt,setLineWidth:It,setPolygonOffset:Ge,setScissorTest:Wt,activeTexture:qe,bindTexture:ot,unbindTexture:B,compressedTexImage2D:M,compressedTexImage3D:te,texImage2D:Ye,texImage3D:ye,updateUBOMapping:Ve,uniformBlockBinding:Pe,texStorage2D:Le,texStorage3D:Je,texSubImage2D:ve,texSubImage3D:_e,compressedTexSubImage2D:de,compressedTexSubImage3D:We,scissor:Ee,viewport:Qe,reset:it}}function JT(a,e,i,s,l,c,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Oe,v=new WeakMap;let g;const A=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(B,M){return S?new OffscreenCanvas(B,M):kc("canvas")}function C(B,M,te){let ve=1;const _e=ot(B);if((_e.width>te||_e.height>te)&&(ve=te/Math.max(_e.width,_e.height)),ve<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const de=Math.floor(ve*_e.width),We=Math.floor(ve*_e.height);g===void 0&&(g=E(de,We));const Le=M?E(de,We):g;return Le.width=de,Le.height=We,Le.getContext("2d").drawImage(B,0,0,de,We),ct("WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+de+"x"+We+")."),Le}else return"data"in B&&ct("WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),B;return B}function y(B){return B.generateMipmaps}function _(B){a.generateMipmap(B)}function P(B){return B.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?a.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function U(B,M,te,ve,_e=!1){if(B!==null){if(a[B]!==void 0)return a[B];ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let de=M;if(M===a.RED&&(te===a.FLOAT&&(de=a.R32F),te===a.HALF_FLOAT&&(de=a.R16F),te===a.UNSIGNED_BYTE&&(de=a.R8)),M===a.RED_INTEGER&&(te===a.UNSIGNED_BYTE&&(de=a.R8UI),te===a.UNSIGNED_SHORT&&(de=a.R16UI),te===a.UNSIGNED_INT&&(de=a.R32UI),te===a.BYTE&&(de=a.R8I),te===a.SHORT&&(de=a.R16I),te===a.INT&&(de=a.R32I)),M===a.RG&&(te===a.FLOAT&&(de=a.RG32F),te===a.HALF_FLOAT&&(de=a.RG16F),te===a.UNSIGNED_BYTE&&(de=a.RG8)),M===a.RG_INTEGER&&(te===a.UNSIGNED_BYTE&&(de=a.RG8UI),te===a.UNSIGNED_SHORT&&(de=a.RG16UI),te===a.UNSIGNED_INT&&(de=a.RG32UI),te===a.BYTE&&(de=a.RG8I),te===a.SHORT&&(de=a.RG16I),te===a.INT&&(de=a.RG32I)),M===a.RGB_INTEGER&&(te===a.UNSIGNED_BYTE&&(de=a.RGB8UI),te===a.UNSIGNED_SHORT&&(de=a.RGB16UI),te===a.UNSIGNED_INT&&(de=a.RGB32UI),te===a.BYTE&&(de=a.RGB8I),te===a.SHORT&&(de=a.RGB16I),te===a.INT&&(de=a.RGB32I)),M===a.RGBA_INTEGER&&(te===a.UNSIGNED_BYTE&&(de=a.RGBA8UI),te===a.UNSIGNED_SHORT&&(de=a.RGBA16UI),te===a.UNSIGNED_INT&&(de=a.RGBA32UI),te===a.BYTE&&(de=a.RGBA8I),te===a.SHORT&&(de=a.RGBA16I),te===a.INT&&(de=a.RGBA32I)),M===a.RGB&&(te===a.UNSIGNED_INT_5_9_9_9_REV&&(de=a.RGB9_E5),te===a.UNSIGNED_INT_10F_11F_11F_REV&&(de=a.R11F_G11F_B10F)),M===a.RGBA){const We=_e?Gc:Bt.getTransfer(ve);te===a.FLOAT&&(de=a.RGBA32F),te===a.HALF_FLOAT&&(de=a.RGBA16F),te===a.UNSIGNED_BYTE&&(de=We===Xt?a.SRGB8_ALPHA8:a.RGBA8),te===a.UNSIGNED_SHORT_4_4_4_4&&(de=a.RGBA4),te===a.UNSIGNED_SHORT_5_5_5_1&&(de=a.RGB5_A1)}return(de===a.R16F||de===a.R32F||de===a.RG16F||de===a.RG32F||de===a.RGBA16F||de===a.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function I(B,M){let te;return B?M===null||M===ar||M===Os?te=a.DEPTH24_STENCIL8:M===va?te=a.DEPTH32F_STENCIL8:M===qo&&(te=a.DEPTH24_STENCIL8,ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ar||M===Os?te=a.DEPTH_COMPONENT24:M===va?te=a.DEPTH_COMPONENT32F:M===qo&&(te=a.DEPTH_COMPONENT16),te}function Y(B,M){return y(B)===!0||B.isFramebufferTexture&&B.minFilter!==Xn&&B.minFilter!==Dn?Math.log2(Math.max(M.width,M.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?M.mipmaps.length:1}function O(B){const M=B.target;M.removeEventListener("dispose",O),ie(M),M.isVideoTexture&&v.delete(M)}function F(B){const M=B.target;M.removeEventListener("dispose",F),R(M)}function ie(B){const M=s.get(B);if(M.__webglInit===void 0)return;const te=B.source,ve=A.get(te);if(ve){const _e=ve[M.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&w(B),Object.keys(ve).length===0&&A.delete(te)}s.remove(B)}function w(B){const M=s.get(B);a.deleteTexture(M.__webglTexture);const te=B.source,ve=A.get(te);delete ve[M.__cacheKey],h.memory.textures--}function R(B){const M=s.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),s.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray(M.__webglFramebuffer[ve]))for(let _e=0;_e<M.__webglFramebuffer[ve].length;_e++)a.deleteFramebuffer(M.__webglFramebuffer[ve][_e]);else a.deleteFramebuffer(M.__webglFramebuffer[ve]);M.__webglDepthbuffer&&a.deleteRenderbuffer(M.__webglDepthbuffer[ve])}else{if(Array.isArray(M.__webglFramebuffer))for(let ve=0;ve<M.__webglFramebuffer.length;ve++)a.deleteFramebuffer(M.__webglFramebuffer[ve]);else a.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&a.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&a.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ve=0;ve<M.__webglColorRenderbuffer.length;ve++)M.__webglColorRenderbuffer[ve]&&a.deleteRenderbuffer(M.__webglColorRenderbuffer[ve]);M.__webglDepthRenderbuffer&&a.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const te=B.textures;for(let ve=0,_e=te.length;ve<_e;ve++){const de=s.get(te[ve]);de.__webglTexture&&(a.deleteTexture(de.__webglTexture),h.memory.textures--),s.remove(te[ve])}s.remove(B)}let W=0;function re(){W=0}function fe(){const B=W;return B>=l.maxTextures&&ct("WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+l.maxTextures),W+=1,B}function $(B){const M=[];return M.push(B.wrapS),M.push(B.wrapT),M.push(B.wrapR||0),M.push(B.magFilter),M.push(B.minFilter),M.push(B.anisotropy),M.push(B.internalFormat),M.push(B.format),M.push(B.type),M.push(B.generateMipmaps),M.push(B.premultiplyAlpha),M.push(B.flipY),M.push(B.unpackAlignment),M.push(B.colorSpace),M.join()}function N(B,M){const te=s.get(B);if(B.isVideoTexture&&Wt(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&te.__version!==B.version){const ve=B.image;if(ve===null)ct("WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)ct("WebGLRenderer: Texture marked for update but image is incomplete");else{J(te,B,M);return}}else B.isExternalTexture&&(te.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(a.TEXTURE_2D,te.__webglTexture,a.TEXTURE0+M)}function D(B,M){const te=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&te.__version!==B.version){J(te,B,M);return}else B.isExternalTexture&&(te.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(a.TEXTURE_2D_ARRAY,te.__webglTexture,a.TEXTURE0+M)}function H(B,M){const te=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&te.__version!==B.version){J(te,B,M);return}i.bindTexture(a.TEXTURE_3D,te.__webglTexture,a.TEXTURE0+M)}function z(B,M){const te=s.get(B);if(B.version>0&&te.__version!==B.version){ue(te,B,M);return}i.bindTexture(a.TEXTURE_CUBE_MAP,te.__webglTexture,a.TEXTURE0+M)}const le={[Jh]:a.REPEAT,[ga]:a.CLAMP_TO_EDGE,[jh]:a.MIRRORED_REPEAT},he={[Xn]:a.NEAREST,[pS]:a.NEAREST_MIPMAP_NEAREST,[hc]:a.NEAREST_MIPMAP_LINEAR,[Dn]:a.LINEAR,[sh]:a.LINEAR_MIPMAP_NEAREST,[Br]:a.LINEAR_MIPMAP_LINEAR},L={[xS]:a.NEVER,[ES]:a.ALWAYS,[AS]:a.LESS,[Jv]:a.LEQUAL,[_S]:a.EQUAL,[MS]:a.GEQUAL,[SS]:a.GREATER,[yS]:a.NOTEQUAL};function j(B,M){if(M.type===va&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Dn||M.magFilter===sh||M.magFilter===hc||M.magFilter===Br||M.minFilter===Dn||M.minFilter===sh||M.minFilter===hc||M.minFilter===Br)&&ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(B,a.TEXTURE_WRAP_S,le[M.wrapS]),a.texParameteri(B,a.TEXTURE_WRAP_T,le[M.wrapT]),(B===a.TEXTURE_3D||B===a.TEXTURE_2D_ARRAY)&&a.texParameteri(B,a.TEXTURE_WRAP_R,le[M.wrapR]),a.texParameteri(B,a.TEXTURE_MAG_FILTER,he[M.magFilter]),a.texParameteri(B,a.TEXTURE_MIN_FILTER,he[M.minFilter]),M.compareFunction&&(a.texParameteri(B,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(B,a.TEXTURE_COMPARE_FUNC,L[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Xn||M.minFilter!==hc&&M.minFilter!==Br||M.type===va&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||s.get(M).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");a.texParameterf(B,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,l.getMaxAnisotropy())),s.get(M).__currentAnisotropy=M.anisotropy}}}function pe(B,M){let te=!1;B.__webglInit===void 0&&(B.__webglInit=!0,M.addEventListener("dispose",O));const ve=M.source;let _e=A.get(ve);_e===void 0&&(_e={},A.set(ve,_e));const de=$(M);if(de!==B.__cacheKey){_e[de]===void 0&&(_e[de]={texture:a.createTexture(),usedTimes:0},h.memory.textures++,te=!0),_e[de].usedTimes++;const We=_e[B.__cacheKey];We!==void 0&&(_e[B.__cacheKey].usedTimes--,We.usedTimes===0&&w(M)),B.__cacheKey=de,B.__webglTexture=_e[de].texture}return te}function Se(B,M,te){return Math.floor(Math.floor(B/te)/M)}function Ue(B,M,te,ve){const de=B.updateRanges;if(de.length===0)i.texSubImage2D(a.TEXTURE_2D,0,0,0,M.width,M.height,te,ve,M.data);else{de.sort((ye,Ee)=>ye.start-Ee.start);let We=0;for(let ye=1;ye<de.length;ye++){const Ee=de[We],Qe=de[ye],Ve=Ee.start+Ee.count,Pe=Se(Qe.start,M.width,4),it=Se(Ee.start,M.width,4);Qe.start<=Ve+1&&Pe===it&&Se(Qe.start+Qe.count-1,M.width,4)===Pe?Ee.count=Math.max(Ee.count,Qe.start+Qe.count-Ee.start):(++We,de[We]=Qe)}de.length=We+1;const Le=a.getParameter(a.UNPACK_ROW_LENGTH),Je=a.getParameter(a.UNPACK_SKIP_PIXELS),Ye=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,M.width);for(let ye=0,Ee=de.length;ye<Ee;ye++){const Qe=de[ye],Ve=Math.floor(Qe.start/4),Pe=Math.ceil(Qe.count/4),it=Ve%M.width,k=Math.floor(Ve/M.width),Re=Pe,Ce=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,it),a.pixelStorei(a.UNPACK_SKIP_ROWS,k),i.texSubImage2D(a.TEXTURE_2D,0,it,k,Re,Ce,te,ve,M.data)}B.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,Le),a.pixelStorei(a.UNPACK_SKIP_PIXELS,Je),a.pixelStorei(a.UNPACK_SKIP_ROWS,Ye)}}function J(B,M,te){let ve=a.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ve=a.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ve=a.TEXTURE_3D);const _e=pe(B,M),de=M.source;i.bindTexture(ve,B.__webglTexture,a.TEXTURE0+te);const We=s.get(de);if(de.version!==We.__version||_e===!0){i.activeTexture(a.TEXTURE0+te);const Le=Bt.getPrimaries(Bt.workingColorSpace),Je=M.colorSpace===Fi?null:Bt.getPrimaries(M.colorSpace),Ye=M.colorSpace===Fi||Le===Je?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,M.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,M.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let ye=C(M.image,!1,l.maxTextureSize);ye=qe(M,ye);const Ee=c.convert(M.format,M.colorSpace),Qe=c.convert(M.type);let Ve=U(M.internalFormat,Ee,Qe,M.colorSpace,M.isVideoTexture);j(ve,M);let Pe;const it=M.mipmaps,k=M.isVideoTexture!==!0,Re=We.__version===void 0||_e===!0,Ce=de.dataReady,De=Y(M,ye);if(M.isDepthTexture)Ve=I(M.format===Ns,M.type),Re&&(k?i.texStorage2D(a.TEXTURE_2D,1,Ve,ye.width,ye.height):i.texImage2D(a.TEXTURE_2D,0,Ve,ye.width,ye.height,0,Ee,Qe,null));else if(M.isDataTexture)if(it.length>0){k&&Re&&i.texStorage2D(a.TEXTURE_2D,De,Ve,it[0].width,it[0].height);for(let Me=0,Ae=it.length;Me<Ae;Me++)Pe=it[Me],k?Ce&&i.texSubImage2D(a.TEXTURE_2D,Me,0,0,Pe.width,Pe.height,Ee,Qe,Pe.data):i.texImage2D(a.TEXTURE_2D,Me,Ve,Pe.width,Pe.height,0,Ee,Qe,Pe.data);M.generateMipmaps=!1}else k?(Re&&i.texStorage2D(a.TEXTURE_2D,De,Ve,ye.width,ye.height),Ce&&Ue(M,ye,Ee,Qe)):i.texImage2D(a.TEXTURE_2D,0,Ve,ye.width,ye.height,0,Ee,Qe,ye.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){k&&Re&&i.texStorage3D(a.TEXTURE_2D_ARRAY,De,Ve,it[0].width,it[0].height,ye.depth);for(let Me=0,Ae=it.length;Me<Ae;Me++)if(Pe=it[Me],M.format!==Ui)if(Ee!==null)if(k){if(Ce)if(M.layerUpdates.size>0){const ze=uv(Pe.width,Pe.height,M.format,M.type);for(const rt of M.layerUpdates){const Ht=Pe.data.subarray(rt*ze/Pe.data.BYTES_PER_ELEMENT,(rt+1)*ze/Pe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Me,0,0,rt,Pe.width,Pe.height,1,Ee,Ht)}M.clearLayerUpdates()}else i.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Me,0,0,0,Pe.width,Pe.height,ye.depth,Ee,Pe.data)}else i.compressedTexImage3D(a.TEXTURE_2D_ARRAY,Me,Ve,Pe.width,Pe.height,ye.depth,0,Pe.data,0,0);else ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?Ce&&i.texSubImage3D(a.TEXTURE_2D_ARRAY,Me,0,0,0,Pe.width,Pe.height,ye.depth,Ee,Qe,Pe.data):i.texImage3D(a.TEXTURE_2D_ARRAY,Me,Ve,Pe.width,Pe.height,ye.depth,0,Ee,Qe,Pe.data)}else{k&&Re&&i.texStorage2D(a.TEXTURE_2D,De,Ve,it[0].width,it[0].height);for(let Me=0,Ae=it.length;Me<Ae;Me++)Pe=it[Me],M.format!==Ui?Ee!==null?k?Ce&&i.compressedTexSubImage2D(a.TEXTURE_2D,Me,0,0,Pe.width,Pe.height,Ee,Pe.data):i.compressedTexImage2D(a.TEXTURE_2D,Me,Ve,Pe.width,Pe.height,0,Pe.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?Ce&&i.texSubImage2D(a.TEXTURE_2D,Me,0,0,Pe.width,Pe.height,Ee,Qe,Pe.data):i.texImage2D(a.TEXTURE_2D,Me,Ve,Pe.width,Pe.height,0,Ee,Qe,Pe.data)}else if(M.isDataArrayTexture)if(k){if(Re&&i.texStorage3D(a.TEXTURE_2D_ARRAY,De,Ve,ye.width,ye.height,ye.depth),Ce)if(M.layerUpdates.size>0){const Me=uv(ye.width,ye.height,M.format,M.type);for(const Ae of M.layerUpdates){const ze=ye.data.subarray(Ae*Me/ye.data.BYTES_PER_ELEMENT,(Ae+1)*Me/ye.data.BYTES_PER_ELEMENT);i.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,Ae,ye.width,ye.height,1,Ee,Qe,ze)}M.clearLayerUpdates()}else i.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Ee,Qe,ye.data)}else i.texImage3D(a.TEXTURE_2D_ARRAY,0,Ve,ye.width,ye.height,ye.depth,0,Ee,Qe,ye.data);else if(M.isData3DTexture)k?(Re&&i.texStorage3D(a.TEXTURE_3D,De,Ve,ye.width,ye.height,ye.depth),Ce&&i.texSubImage3D(a.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Ee,Qe,ye.data)):i.texImage3D(a.TEXTURE_3D,0,Ve,ye.width,ye.height,ye.depth,0,Ee,Qe,ye.data);else if(M.isFramebufferTexture){if(Re)if(k)i.texStorage2D(a.TEXTURE_2D,De,Ve,ye.width,ye.height);else{let Me=ye.width,Ae=ye.height;for(let ze=0;ze<De;ze++)i.texImage2D(a.TEXTURE_2D,ze,Ve,Me,Ae,0,Ee,Qe,null),Me>>=1,Ae>>=1}}else if(it.length>0){if(k&&Re){const Me=ot(it[0]);i.texStorage2D(a.TEXTURE_2D,De,Ve,Me.width,Me.height)}for(let Me=0,Ae=it.length;Me<Ae;Me++)Pe=it[Me],k?Ce&&i.texSubImage2D(a.TEXTURE_2D,Me,0,0,Ee,Qe,Pe):i.texImage2D(a.TEXTURE_2D,Me,Ve,Ee,Qe,Pe);M.generateMipmaps=!1}else if(k){if(Re){const Me=ot(ye);i.texStorage2D(a.TEXTURE_2D,De,Ve,Me.width,Me.height)}Ce&&i.texSubImage2D(a.TEXTURE_2D,0,0,0,Ee,Qe,ye)}else i.texImage2D(a.TEXTURE_2D,0,Ve,Ee,Qe,ye);y(M)&&_(ve),We.__version=de.version,M.onUpdate&&M.onUpdate(M)}B.__version=M.version}function ue(B,M,te){if(M.image.length!==6)return;const ve=pe(B,M),_e=M.source;i.bindTexture(a.TEXTURE_CUBE_MAP,B.__webglTexture,a.TEXTURE0+te);const de=s.get(_e);if(_e.version!==de.__version||ve===!0){i.activeTexture(a.TEXTURE0+te);const We=Bt.getPrimaries(Bt.workingColorSpace),Le=M.colorSpace===Fi?null:Bt.getPrimaries(M.colorSpace),Je=M.colorSpace===Fi||We===Le?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,M.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,M.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);const Ye=M.isCompressedTexture||M.image[0].isCompressedTexture,ye=M.image[0]&&M.image[0].isDataTexture,Ee=[];for(let Ae=0;Ae<6;Ae++)!Ye&&!ye?Ee[Ae]=C(M.image[Ae],!0,l.maxCubemapSize):Ee[Ae]=ye?M.image[Ae].image:M.image[Ae],Ee[Ae]=qe(M,Ee[Ae]);const Qe=Ee[0],Ve=c.convert(M.format,M.colorSpace),Pe=c.convert(M.type),it=U(M.internalFormat,Ve,Pe,M.colorSpace),k=M.isVideoTexture!==!0,Re=de.__version===void 0||ve===!0,Ce=_e.dataReady;let De=Y(M,Qe);j(a.TEXTURE_CUBE_MAP,M);let Me;if(Ye){k&&Re&&i.texStorage2D(a.TEXTURE_CUBE_MAP,De,it,Qe.width,Qe.height);for(let Ae=0;Ae<6;Ae++){Me=Ee[Ae].mipmaps;for(let ze=0;ze<Me.length;ze++){const rt=Me[ze];M.format!==Ui?Ve!==null?k?Ce&&i.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze,0,0,rt.width,rt.height,Ve,rt.data):i.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze,it,rt.width,rt.height,0,rt.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?Ce&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze,0,0,rt.width,rt.height,Ve,Pe,rt.data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze,it,rt.width,rt.height,0,Ve,Pe,rt.data)}}}else{if(Me=M.mipmaps,k&&Re){Me.length>0&&De++;const Ae=ot(Ee[0]);i.texStorage2D(a.TEXTURE_CUBE_MAP,De,it,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(ye){k?Ce&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Ee[Ae].width,Ee[Ae].height,Ve,Pe,Ee[Ae].data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,it,Ee[Ae].width,Ee[Ae].height,0,Ve,Pe,Ee[Ae].data);for(let ze=0;ze<Me.length;ze++){const Ht=Me[ze].image[Ae].image;k?Ce&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze+1,0,0,Ht.width,Ht.height,Ve,Pe,Ht.data):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze+1,it,Ht.width,Ht.height,0,Ve,Pe,Ht.data)}}else{k?Ce&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,Ve,Pe,Ee[Ae]):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,it,Ve,Pe,Ee[Ae]);for(let ze=0;ze<Me.length;ze++){const rt=Me[ze];k?Ce&&i.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze+1,0,0,Ve,Pe,rt.image[Ae]):i.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ze+1,it,Ve,Pe,rt.image[Ae])}}}y(M)&&_(a.TEXTURE_CUBE_MAP),de.__version=_e.version,M.onUpdate&&M.onUpdate(M)}B.__version=M.version}function Te(B,M,te,ve,_e,de){const We=c.convert(te.format,te.colorSpace),Le=c.convert(te.type),Je=U(te.internalFormat,We,Le,te.colorSpace),Ye=s.get(M),ye=s.get(te);if(ye.__renderTarget=M,!Ye.__hasExternalTextures){const Ee=Math.max(1,M.width>>de),Qe=Math.max(1,M.height>>de);_e===a.TEXTURE_3D||_e===a.TEXTURE_2D_ARRAY?i.texImage3D(_e,de,Je,Ee,Qe,M.depth,0,We,Le,null):i.texImage2D(_e,de,Je,Ee,Qe,0,We,Le,null)}i.bindFramebuffer(a.FRAMEBUFFER,B),Ge(M)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,ve,_e,ye.__webglTexture,0,It(M)):(_e===a.TEXTURE_2D||_e>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,ve,_e,ye.__webglTexture,de),i.bindFramebuffer(a.FRAMEBUFFER,null)}function Ne(B,M,te){if(a.bindRenderbuffer(a.RENDERBUFFER,B),M.depthBuffer){const ve=M.depthTexture,_e=ve&&ve.isDepthTexture?ve.type:null,de=I(M.stencilBuffer,_e),We=M.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Le=It(M);Ge(M)?d.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Le,de,M.width,M.height):te?a.renderbufferStorageMultisample(a.RENDERBUFFER,Le,de,M.width,M.height):a.renderbufferStorage(a.RENDERBUFFER,de,M.width,M.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,We,a.RENDERBUFFER,B)}else{const ve=M.textures;for(let _e=0;_e<ve.length;_e++){const de=ve[_e],We=c.convert(de.format,de.colorSpace),Le=c.convert(de.type),Je=U(de.internalFormat,We,Le,de.colorSpace),Ye=It(M);te&&Ge(M)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Ye,Je,M.width,M.height):Ge(M)?d.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Ye,Je,M.width,M.height):a.renderbufferStorage(a.RENDERBUFFER,Je,M.width,M.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function Xe(B,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(a.FRAMEBUFFER,B),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ve=s.get(M.depthTexture);ve.__renderTarget=M,(!ve.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),N(M.depthTexture,0);const _e=ve.__webglTexture,de=It(M);if(M.depthTexture.format===Ko)Ge(M)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,_e,0,de):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,_e,0);else if(M.depthTexture.format===Ns)Ge(M)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,_e,0,de):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function st(B){const M=s.get(B),te=B.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==B.depthTexture){const ve=B.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ve){const _e=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ve.removeEventListener("dispose",_e)};ve.addEventListener("dispose",_e),M.__depthDisposeCallback=_e}M.__boundDepthTexture=ve}if(B.depthTexture&&!M.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");const ve=B.texture.mipmaps;ve&&ve.length>0?Xe(M.__webglFramebuffer[0],B):Xe(M.__webglFramebuffer,B)}else if(te){M.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)if(i.bindFramebuffer(a.FRAMEBUFFER,M.__webglFramebuffer[ve]),M.__webglDepthbuffer[ve]===void 0)M.__webglDepthbuffer[ve]=a.createRenderbuffer(),Ne(M.__webglDepthbuffer[ve],B,!1);else{const _e=B.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,de=M.__webglDepthbuffer[ve];a.bindRenderbuffer(a.RENDERBUFFER,de),a.framebufferRenderbuffer(a.FRAMEBUFFER,_e,a.RENDERBUFFER,de)}}else{const ve=B.texture.mipmaps;if(ve&&ve.length>0?i.bindFramebuffer(a.FRAMEBUFFER,M.__webglFramebuffer[0]):i.bindFramebuffer(a.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=a.createRenderbuffer(),Ne(M.__webglDepthbuffer,B,!1);else{const _e=B.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,de=M.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,de),a.framebufferRenderbuffer(a.FRAMEBUFFER,_e,a.RENDERBUFFER,de)}}i.bindFramebuffer(a.FRAMEBUFFER,null)}function en(B,M,te){const ve=s.get(B);M!==void 0&&Te(ve.__webglFramebuffer,B,B.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),te!==void 0&&st(B)}function ut(B){const M=B.texture,te=s.get(B),ve=s.get(M);B.addEventListener("dispose",F);const _e=B.textures,de=B.isWebGLCubeRenderTarget===!0,We=_e.length>1;if(We||(ve.__webglTexture===void 0&&(ve.__webglTexture=a.createTexture()),ve.__version=M.version,h.memory.textures++),de){te.__webglFramebuffer=[];for(let Le=0;Le<6;Le++)if(M.mipmaps&&M.mipmaps.length>0){te.__webglFramebuffer[Le]=[];for(let Je=0;Je<M.mipmaps.length;Je++)te.__webglFramebuffer[Le][Je]=a.createFramebuffer()}else te.__webglFramebuffer[Le]=a.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){te.__webglFramebuffer=[];for(let Le=0;Le<M.mipmaps.length;Le++)te.__webglFramebuffer[Le]=a.createFramebuffer()}else te.__webglFramebuffer=a.createFramebuffer();if(We)for(let Le=0,Je=_e.length;Le<Je;Le++){const Ye=s.get(_e[Le]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=a.createTexture(),h.memory.textures++)}if(B.samples>0&&Ge(B)===!1){te.__webglMultisampledFramebuffer=a.createFramebuffer(),te.__webglColorRenderbuffer=[],i.bindFramebuffer(a.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let Le=0;Le<_e.length;Le++){const Je=_e[Le];te.__webglColorRenderbuffer[Le]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,te.__webglColorRenderbuffer[Le]);const Ye=c.convert(Je.format,Je.colorSpace),ye=c.convert(Je.type),Ee=U(Je.internalFormat,Ye,ye,Je.colorSpace,B.isXRRenderTarget===!0),Qe=It(B);a.renderbufferStorageMultisample(a.RENDERBUFFER,Qe,Ee,B.width,B.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Le,a.RENDERBUFFER,te.__webglColorRenderbuffer[Le])}a.bindRenderbuffer(a.RENDERBUFFER,null),B.depthBuffer&&(te.__webglDepthRenderbuffer=a.createRenderbuffer(),Ne(te.__webglDepthRenderbuffer,B,!0)),i.bindFramebuffer(a.FRAMEBUFFER,null)}}if(de){i.bindTexture(a.TEXTURE_CUBE_MAP,ve.__webglTexture),j(a.TEXTURE_CUBE_MAP,M);for(let Le=0;Le<6;Le++)if(M.mipmaps&&M.mipmaps.length>0)for(let Je=0;Je<M.mipmaps.length;Je++)Te(te.__webglFramebuffer[Le][Je],B,M,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Je);else Te(te.__webglFramebuffer[Le],B,M,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0);y(M)&&_(a.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(We){for(let Le=0,Je=_e.length;Le<Je;Le++){const Ye=_e[Le],ye=s.get(Ye);let Ee=a.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Ee=B.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),i.bindTexture(Ee,ye.__webglTexture),j(Ee,Ye),Te(te.__webglFramebuffer,B,Ye,a.COLOR_ATTACHMENT0+Le,Ee,0),y(Ye)&&_(Ee)}i.unbindTexture()}else{let Le=a.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Le=B.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),i.bindTexture(Le,ve.__webglTexture),j(Le,M),M.mipmaps&&M.mipmaps.length>0)for(let Je=0;Je<M.mipmaps.length;Je++)Te(te.__webglFramebuffer[Je],B,M,a.COLOR_ATTACHMENT0,Le,Je);else Te(te.__webglFramebuffer,B,M,a.COLOR_ATTACHMENT0,Le,0);y(M)&&_(Le),i.unbindTexture()}B.depthBuffer&&st(B)}function Et(B){const M=B.textures;for(let te=0,ve=M.length;te<ve;te++){const _e=M[te];if(y(_e)){const de=P(B),We=s.get(_e).__webglTexture;i.bindTexture(de,We),_(de),i.unbindTexture()}}}const V=[],at=[];function gt(B){if(B.samples>0){if(Ge(B)===!1){const M=B.textures,te=B.width,ve=B.height;let _e=a.COLOR_BUFFER_BIT;const de=B.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,We=s.get(B),Le=M.length>1;if(Le)for(let Ye=0;Ye<M.length;Ye++)i.bindFramebuffer(a.FRAMEBUFFER,We.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ye,a.RENDERBUFFER,null),i.bindFramebuffer(a.FRAMEBUFFER,We.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ye,a.TEXTURE_2D,null,0);i.bindFramebuffer(a.READ_FRAMEBUFFER,We.__webglMultisampledFramebuffer);const Je=B.texture.mipmaps;Je&&Je.length>0?i.bindFramebuffer(a.DRAW_FRAMEBUFFER,We.__webglFramebuffer[0]):i.bindFramebuffer(a.DRAW_FRAMEBUFFER,We.__webglFramebuffer);for(let Ye=0;Ye<M.length;Ye++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(_e|=a.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(_e|=a.STENCIL_BUFFER_BIT)),Le){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,We.__webglColorRenderbuffer[Ye]);const ye=s.get(M[Ye]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,ye,0)}a.blitFramebuffer(0,0,te,ve,0,0,te,ve,_e,a.NEAREST),m===!0&&(V.length=0,at.length=0,V.push(a.COLOR_ATTACHMENT0+Ye),B.depthBuffer&&B.resolveDepthBuffer===!1&&(V.push(de),at.push(de),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,at)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,V))}if(i.bindFramebuffer(a.READ_FRAMEBUFFER,null),i.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),Le)for(let Ye=0;Ye<M.length;Ye++){i.bindFramebuffer(a.FRAMEBUFFER,We.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ye,a.RENDERBUFFER,We.__webglColorRenderbuffer[Ye]);const ye=s.get(M[Ye]).__webglTexture;i.bindFramebuffer(a.FRAMEBUFFER,We.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ye,a.TEXTURE_2D,ye,0)}i.bindFramebuffer(a.DRAW_FRAMEBUFFER,We.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.resolveDepthBuffer===!1&&m){const M=B.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[M])}}}function It(B){return Math.min(l.maxSamples,B.samples)}function Ge(B){const M=s.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Wt(B){const M=h.render.frame;v.get(B)!==M&&(v.set(B,M),B.update())}function qe(B,M){const te=B.colorSpace,ve=B.format,_e=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||te!==rr&&te!==Fi&&(Bt.getTransfer(te)===Xt?(ve!==Ui||_e!==Nn)&&ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):on("WebGLTextures: Unsupported texture color space:",te)),M}function ot(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(p.width=B.naturalWidth||B.width,p.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(p.width=B.displayWidth,p.height=B.displayHeight):(p.width=B.width,p.height=B.height),p}this.allocateTextureUnit=fe,this.resetTextureUnits=re,this.setTexture2D=N,this.setTexture2DArray=D,this.setTexture3D=H,this.setTextureCube=z,this.rebindTextures=en,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Ge}function jT(a,e){function i(s,l=Fi){let c;const h=Bt.getTransfer(l);if(s===Nn)return a.UNSIGNED_BYTE;if(s===Bd)return a.UNSIGNED_SHORT_4_4_4_4;if(s===Od)return a.UNSIGNED_SHORT_5_5_5_1;if(s===Wv)return a.UNSIGNED_INT_5_9_9_9_REV;if(s===Qv)return a.UNSIGNED_INT_10F_11F_11F_REV;if(s===Xv)return a.BYTE;if(s===Yv)return a.SHORT;if(s===qo)return a.UNSIGNED_SHORT;if(s===Ld)return a.INT;if(s===ar)return a.UNSIGNED_INT;if(s===va)return a.FLOAT;if(s===Fs)return a.HALF_FLOAT;if(s===qv)return a.ALPHA;if(s===Kv)return a.RGB;if(s===Ui)return a.RGBA;if(s===Ko)return a.DEPTH_COMPONENT;if(s===Ns)return a.DEPTH_STENCIL;if(s===Zv)return a.RED;if(s===Nd)return a.RED_INTEGER;if(s===Pd)return a.RG;if(s===Id)return a.RG_INTEGER;if(s===zd)return a.RGBA_INTEGER;if(s===Nc||s===Pc||s===Ic||s===zc)if(h===Xt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Nc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Pc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ic)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Nc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Pc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ic)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===zc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===$h||s===ed||s===td||s===nd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===$h)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ed)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===td)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===nd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===id||s===ad||s===rd)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===id||s===ad)return h===Xt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===rd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===sd||s===od||s===ld||s===cd||s===ud||s===fd||s===hd||s===dd||s===pd||s===md||s===gd||s===vd||s===xd||s===Ad)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===sd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===od)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ld)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===cd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ud)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===fd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===hd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===dd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===pd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===md)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===gd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===vd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===xd)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ad)return h===Xt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===_d||s===Sd||s===yd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===_d)return h===Xt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Sd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===yd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Md||s===Ed||s===bd||s===Td)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Md)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Ed)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===bd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Td)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Os?a.UNSIGNED_INT_24_8:a[s]!==void 0?a[s]:null}return{convert:i}}const $T=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class t1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new cx(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new ln({vertexShader:$T,fragmentShader:e1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Si(new Is(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class n1 extends ya{constructor(e,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,v=null,g=null,A=null,S=null,E=null;const C=typeof XRWebGLBinding<"u",y=new t1,_={},P=i.getContextAttributes();let U=null,I=null;const Y=[],O=[],F=new Oe;let ie=null;const w=new ci;w.viewport=new $t;const R=new ci;R.viewport=new $t;const W=[w,R],re=new _y;let fe=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ue=Y[J];return ue===void 0&&(ue=new Rh,Y[J]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(J){let ue=Y[J];return ue===void 0&&(ue=new Rh,Y[J]=ue),ue.getGripSpace()},this.getHand=function(J){let ue=Y[J];return ue===void 0&&(ue=new Rh,Y[J]=ue),ue.getHandSpace()};function N(J){const ue=O.indexOf(J.inputSource);if(ue===-1)return;const Te=Y[ue];Te!==void 0&&(Te.update(J.inputSource,J.frame,p||h),Te.dispatchEvent({type:J.type,data:J.inputSource}))}function D(){l.removeEventListener("select",N),l.removeEventListener("selectstart",N),l.removeEventListener("selectend",N),l.removeEventListener("squeeze",N),l.removeEventListener("squeezestart",N),l.removeEventListener("squeezeend",N),l.removeEventListener("end",D),l.removeEventListener("inputsourceschange",H);for(let J=0;J<Y.length;J++){const ue=O[J];ue!==null&&(O[J]=null,Y[J].disconnect(ue))}fe=null,$=null,y.reset();for(const J in _)delete _[J];e.setRenderTarget(U),S=null,A=null,g=null,l=null,I=null,Ue.stop(),s.isPresenting=!1,e.setPixelRatio(ie),e.setSize(F.width,F.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){c=J,s.isPresenting===!0&&ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){d=J,s.isPresenting===!0&&ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(J){p=J},this.getBaseLayer=function(){return A!==null?A:S},this.getBinding=function(){return g===null&&C&&(g=new XRWebGLBinding(l,i)),g},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(J){if(l=J,l!==null){if(U=e.getRenderTarget(),l.addEventListener("select",N),l.addEventListener("selectstart",N),l.addEventListener("selectend",N),l.addEventListener("squeeze",N),l.addEventListener("squeezestart",N),l.addEventListener("squeezeend",N),l.addEventListener("end",D),l.addEventListener("inputsourceschange",H),P.xrCompatible!==!0&&await i.makeXRCompatible(),ie=e.getPixelRatio(),e.getSize(F),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Ne=null,Xe=null;P.depth&&(Xe=P.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Te=P.stencil?Ns:Ko,Ne=P.stencil?Os:ar);const st={colorFormat:i.RGBA8,depthFormat:Xe,scaleFactor:c};g=this.getBinding(),A=g.createProjectionLayer(st),l.updateRenderState({layers:[A]}),e.setPixelRatio(1),e.setSize(A.textureWidth,A.textureHeight,!1),I=new Hn(A.textureWidth,A.textureHeight,{format:Ui,type:Nn,depthTexture:new Vd(A.textureWidth,A.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:P.stencil,colorSpace:e.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:A.ignoreDepthValues===!1,resolveStencilBuffer:A.ignoreDepthValues===!1})}else{const Te={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,Te),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),I=new Hn(S.framebufferWidth,S.framebufferHeight,{format:Ui,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Ue.setContext(l),Ue.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function H(J){for(let ue=0;ue<J.removed.length;ue++){const Te=J.removed[ue],Ne=O.indexOf(Te);Ne>=0&&(O[Ne]=null,Y[Ne].disconnect(Te))}for(let ue=0;ue<J.added.length;ue++){const Te=J.added[ue];let Ne=O.indexOf(Te);if(Ne===-1){for(let st=0;st<Y.length;st++)if(st>=O.length){O.push(Te),Ne=st;break}else if(O[st]===null){O[st]=Te,Ne=st;break}if(Ne===-1)break}const Xe=Y[Ne];Xe&&Xe.connect(Te)}}const z=new K,le=new K;function he(J,ue,Te){z.setFromMatrixPosition(ue.matrixWorld),le.setFromMatrixPosition(Te.matrixWorld);const Ne=z.distanceTo(le),Xe=ue.projectionMatrix.elements,st=Te.projectionMatrix.elements,en=Xe[14]/(Xe[10]-1),ut=Xe[14]/(Xe[10]+1),Et=(Xe[9]+1)/Xe[5],V=(Xe[9]-1)/Xe[5],at=(Xe[8]-1)/Xe[0],gt=(st[8]+1)/st[0],It=en*at,Ge=en*gt,Wt=Ne/(-at+gt),qe=Wt*-at;if(ue.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(qe),J.translateZ(Wt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Xe[10]===-1)J.projectionMatrix.copy(ue.projectionMatrix),J.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const ot=en+Wt,B=ut+Wt,M=It-qe,te=Ge+(Ne-qe),ve=Et*ut/B*ot,_e=V*ut/B*ot;J.projectionMatrix.makePerspective(M,te,ve,_e,ot,B),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function L(J,ue){ue===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ue.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(l===null)return;let ue=J.near,Te=J.far;y.texture!==null&&(y.depthNear>0&&(ue=y.depthNear),y.depthFar>0&&(Te=y.depthFar)),re.near=R.near=w.near=ue,re.far=R.far=w.far=Te,(fe!==re.near||$!==re.far)&&(l.updateRenderState({depthNear:re.near,depthFar:re.far}),fe=re.near,$=re.far),re.layers.mask=J.layers.mask|6,w.layers.mask=re.layers.mask&3,R.layers.mask=re.layers.mask&5;const Ne=J.parent,Xe=re.cameras;L(re,Ne);for(let st=0;st<Xe.length;st++)L(Xe[st],Ne);Xe.length===2?he(re,w,R):re.projectionMatrix.copy(w.projectionMatrix),j(J,re,Ne)};function j(J,ue,Te){Te===null?J.matrix.copy(ue.matrixWorld):(J.matrix.copy(Te.matrixWorld),J.matrix.invert(),J.matrix.multiply(ue.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ue.projectionMatrix),J.projectionMatrixInverse.copy(ue.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Cd*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return re},this.getFoveation=function(){if(!(A===null&&S===null))return m},this.setFoveation=function(J){m=J,A!==null&&(A.fixedFoveation=J),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(re)},this.getCameraTexture=function(J){return _[J]};let pe=null;function Se(J,ue){if(v=ue.getViewerPose(p||h),E=ue,v!==null){const Te=v.views;S!==null&&(e.setRenderTargetFramebuffer(I,S.framebuffer),e.setRenderTarget(I));let Ne=!1;Te.length!==re.cameras.length&&(re.cameras.length=0,Ne=!0);for(let ut=0;ut<Te.length;ut++){const Et=Te[ut];let V=null;if(S!==null)V=S.getViewport(Et);else{const gt=g.getViewSubImage(A,Et);V=gt.viewport,ut===0&&(e.setRenderTargetTextures(I,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(I))}let at=W[ut];at===void 0&&(at=new ci,at.layers.enable(ut),at.viewport=new $t,W[ut]=at),at.matrix.fromArray(Et.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(Et.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(V.x,V.y,V.width,V.height),ut===0&&(re.matrix.copy(at.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale)),Ne===!0&&re.cameras.push(at)}const Xe=l.enabledFeatures;if(Xe&&Xe.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){g=s.getBinding();const ut=g.getDepthInformation(Te[0]);ut&&ut.isValid&&ut.texture&&y.init(ut,l.renderState)}if(Xe&&Xe.includes("camera-access")&&C){e.state.unbindTexture(),g=s.getBinding();for(let ut=0;ut<Te.length;ut++){const Et=Te[ut].camera;if(Et){let V=_[Et];V||(V=new cx,_[Et]=V);const at=g.getCameraImage(Et);V.sourceTexture=at}}}}for(let Te=0;Te<Y.length;Te++){const Ne=O[Te],Xe=Y[Te];Ne!==null&&Xe!==void 0&&Xe.update(Ne,ue,p||h)}pe&&pe(J,ue),ue.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ue}),E=null}const Ue=new mx;Ue.setAnimationLoop(Se),this.setAnimationLoop=function(J){pe=J},this.dispose=function(){}}}const Rr=new Sa,i1=new mn;function a1(a,e){function i(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function s(y,_){_.color.getRGB(y.fogColor.value,rx(a)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function l(y,_,P,U,I){_.isMeshBasicMaterial||_.isMeshLambertMaterial?c(y,_):_.isMeshToonMaterial?(c(y,_),g(y,_)):_.isMeshPhongMaterial?(c(y,_),v(y,_)):_.isMeshStandardMaterial?(c(y,_),A(y,_),_.isMeshPhysicalMaterial&&S(y,_,I)):_.isMeshMatcapMaterial?(c(y,_),E(y,_)):_.isMeshDepthMaterial?c(y,_):_.isMeshDistanceMaterial?(c(y,_),C(y,_)):_.isMeshNormalMaterial?c(y,_):_.isLineBasicMaterial?(h(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?m(y,_,P,U):_.isSpriteMaterial?p(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,i(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===Cn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,i(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===Cn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,i(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,i(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const P=e.get(_),U=P.envMap,I=P.envMapRotation;U&&(y.envMap.value=U,Rr.copy(I),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),y.envMapRotation.value.setFromMatrix4(i1.makeRotationFromEuler(Rr)),y.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,y.aoMapTransform))}function h(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function m(y,_,P,U){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*P,y.scale.value=U*.5,_.map&&(y.map.value=_.map,i(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function p(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function v(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function g(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function A(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function S(y,_,P){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Cn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=P.texture,y.transmissionSamplerSize.value.set(P.width,P.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,_){_.matcap&&(y.matcap.value=_.matcap)}function C(y,_){const P=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(P.matrixWorld),y.nearDistance.value=P.shadow.camera.near,y.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function r1(a,e,i,s){let l={},c={},h=[];const d=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function m(P,U){const I=U.program;s.uniformBlockBinding(P,I)}function p(P,U){let I=l[P.id];I===void 0&&(E(P),I=v(P),l[P.id]=I,P.addEventListener("dispose",y));const Y=U.program;s.updateUBOMapping(P,Y);const O=e.render.frame;c[P.id]!==O&&(A(P),c[P.id]=O)}function v(P){const U=g();P.__bindingPointIndex=U;const I=a.createBuffer(),Y=P.__size,O=P.usage;return a.bindBuffer(a.UNIFORM_BUFFER,I),a.bufferData(a.UNIFORM_BUFFER,Y,O),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,U,I),I}function g(){for(let P=0;P<d;P++)if(h.indexOf(P)===-1)return h.push(P),P;return on("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function A(P){const U=l[P.id],I=P.uniforms,Y=P.__cache;a.bindBuffer(a.UNIFORM_BUFFER,U);for(let O=0,F=I.length;O<F;O++){const ie=Array.isArray(I[O])?I[O]:[I[O]];for(let w=0,R=ie.length;w<R;w++){const W=ie[w];if(S(W,O,w,Y)===!0){const re=W.__offset,fe=Array.isArray(W.value)?W.value:[W.value];let $=0;for(let N=0;N<fe.length;N++){const D=fe[N],H=C(D);typeof D=="number"||typeof D=="boolean"?(W.__data[0]=D,a.bufferSubData(a.UNIFORM_BUFFER,re+$,W.__data)):D.isMatrix3?(W.__data[0]=D.elements[0],W.__data[1]=D.elements[1],W.__data[2]=D.elements[2],W.__data[3]=0,W.__data[4]=D.elements[3],W.__data[5]=D.elements[4],W.__data[6]=D.elements[5],W.__data[7]=0,W.__data[8]=D.elements[6],W.__data[9]=D.elements[7],W.__data[10]=D.elements[8],W.__data[11]=0):(D.toArray(W.__data,$),$+=H.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,re,W.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function S(P,U,I,Y){const O=P.value,F=U+"_"+I;if(Y[F]===void 0)return typeof O=="number"||typeof O=="boolean"?Y[F]=O:Y[F]=O.clone(),!0;{const ie=Y[F];if(typeof O=="number"||typeof O=="boolean"){if(ie!==O)return Y[F]=O,!0}else if(ie.equals(O)===!1)return ie.copy(O),!0}return!1}function E(P){const U=P.uniforms;let I=0;const Y=16;for(let F=0,ie=U.length;F<ie;F++){const w=Array.isArray(U[F])?U[F]:[U[F]];for(let R=0,W=w.length;R<W;R++){const re=w[R],fe=Array.isArray(re.value)?re.value:[re.value];for(let $=0,N=fe.length;$<N;$++){const D=fe[$],H=C(D),z=I%Y,le=z%H.boundary,he=z+le;I+=le,he!==0&&Y-he<H.storage&&(I+=Y-he),re.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=I,I+=H.storage}}}const O=I%Y;return O>0&&(I+=Y-O),P.__size=I,P.__cache={},this}function C(P){const U={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(U.boundary=4,U.storage=4):P.isVector2?(U.boundary=8,U.storage=8):P.isVector3||P.isColor?(U.boundary=16,U.storage=12):P.isVector4?(U.boundary=16,U.storage=16):P.isMatrix3?(U.boundary=48,U.storage=48):P.isMatrix4?(U.boundary=64,U.storage=64):P.isTexture?ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ct("WebGLRenderer: Unsupported uniform value type.",P),U}function y(P){const U=P.target;U.removeEventListener("dispose",y);const I=h.indexOf(U.__bindingPointIndex);h.splice(I,1),a.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function _(){for(const P in l)a.deleteBuffer(l[P]);h=[],l={},c={}}return{bind:m,update:p,dispose:_}}const s1=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let pa=null;function o1(){return pa===null&&(pa=new $S(s1,32,32,Pd,Fs),pa.minFilter=Dn,pa.magFilter=Dn,pa.wrapS=ga,pa.wrapT=ga,pa.generateMipmaps=!1,pa.needsUpdate=!0),pa}class l1{constructor(e={}){const{canvas:i=bS(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:A=!1}=e;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=h;const E=new Set([zd,Id,Nd]),C=new Set([Nn,ar,qo,Os,Bd,Od]),y=new Uint32Array(4),_=new Int32Array(4);let P=null,U=null;const I=[],Y=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ir,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let F=!1;this._outputColorSpace=Yt;let ie=0,w=0,R=null,W=-1,re=null;const fe=new $t,$=new $t;let N=null;const D=new vt(0);let H=0,z=i.width,le=i.height,he=1,L=null,j=null;const pe=new $t(0,0,z,le),Se=new $t(0,0,z,le);let Ue=!1;const J=new lx;let ue=!1,Te=!1;const Ne=new mn,Xe=new K,st=new $t,en={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function Et(){return R===null?he:1}let V=s;function at(T,Q){return i.getContext(T,Q)}try{const T={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${zs}`),i.addEventListener("webglcontextlost",Me,!1),i.addEventListener("webglcontextrestored",Ae,!1),i.addEventListener("webglcontextcreationerror",ze,!1),V===null){const Q="webgl2";if(V=at(Q,T),V===null)throw at(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw T("WebGLRenderer: "+T.message),T}let gt,It,Ge,Wt,qe,ot,B,M,te,ve,_e,de,We,Le,Je,Ye,ye,Ee,Qe,Ve,Pe,it,k,Re;function Ce(){gt=new gb(V),gt.init(),it=new jT(V,gt),It=new ob(V,gt,e,it),Ge=new ZT(V,gt),It.reversedDepthBuffer&&A&&Ge.buffers.depth.setReversed(!0),Wt=new Ab(V),qe=new IT,ot=new JT(V,gt,Ge,qe,It,it,Wt),B=new cb(O),M=new mb(O),te=new My(V),k=new rb(V,te),ve=new vb(V,te,Wt,k),_e=new Sb(V,ve,te,Wt),Qe=new _b(V,It,ot),Ye=new lb(qe),de=new PT(O,B,M,gt,It,k,Ye),We=new a1(O,qe),Le=new FT,Je=new YT(gt),Ee=new ab(O,B,M,Ge,_e,S,m),ye=new qT(O,_e,It),Re=new r1(V,Wt,It,Ge),Ve=new sb(V,gt,Wt),Pe=new xb(V,gt,Wt),Wt.programs=de.programs,O.capabilities=It,O.extensions=gt,O.properties=qe,O.renderLists=Le,O.shadowMap=ye,O.state=Ge,O.info=Wt}Ce();const De=new n1(O,V);this.xr=De,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const T=gt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=gt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(T){T!==void 0&&(he=T,this.setSize(z,le,!1))},this.getSize=function(T){return T.set(z,le)},this.setSize=function(T,Q,oe=!0){if(De.isPresenting){ct("WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,le=Q,i.width=Math.floor(T*he),i.height=Math.floor(Q*he),oe===!0&&(i.style.width=T+"px",i.style.height=Q+"px"),this.setViewport(0,0,T,Q)},this.getDrawingBufferSize=function(T){return T.set(z*he,le*he).floor()},this.setDrawingBufferSize=function(T,Q,oe){z=T,le=Q,he=oe,i.width=Math.floor(T*oe),i.height=Math.floor(Q*oe),this.setViewport(0,0,T,Q)},this.getCurrentViewport=function(T){return T.copy(fe)},this.getViewport=function(T){return T.copy(pe)},this.setViewport=function(T,Q,oe,ae){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,Q,oe,ae),Ge.viewport(fe.copy(pe).multiplyScalar(he).round())},this.getScissor=function(T){return T.copy(Se)},this.setScissor=function(T,Q,oe,ae){T.isVector4?Se.set(T.x,T.y,T.z,T.w):Se.set(T,Q,oe,ae),Ge.scissor($.copy(Se).multiplyScalar(he).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(T){Ge.setScissorTest(Ue=T)},this.setOpaqueSort=function(T){L=T},this.setTransparentSort=function(T){j=T},this.getClearColor=function(T){return T.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(T=!0,Q=!0,oe=!0){let ae=0;if(T){let Z=!1;if(R!==null){const be=R.texture.format;Z=E.has(be)}if(Z){const be=R.texture.type,we=C.has(be),Ie=Ee.getClearColor(),Fe=Ee.getClearAlpha(),$e=Ie.r,nt=Ie.g,Ke=Ie.b;we?(y[0]=$e,y[1]=nt,y[2]=Ke,y[3]=Fe,V.clearBufferuiv(V.COLOR,0,y)):(_[0]=$e,_[1]=nt,_[2]=Ke,_[3]=Fe,V.clearBufferiv(V.COLOR,0,_))}else ae|=V.COLOR_BUFFER_BIT}Q&&(ae|=V.DEPTH_BUFFER_BIT),oe&&(ae|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Me,!1),i.removeEventListener("webglcontextrestored",Ae,!1),i.removeEventListener("webglcontextcreationerror",ze,!1),Ee.dispose(),Le.dispose(),Je.dispose(),qe.dispose(),B.dispose(),M.dispose(),_e.dispose(),k.dispose(),Re.dispose(),de.dispose(),De.dispose(),De.removeEventListener("sessionstart",Vs),De.removeEventListener("sessionend",ks),Mi.stop()};function Me(T){T.preventDefault(),Yg("WebGLRenderer: Context Lost."),F=!0}function Ae(){Yg("WebGLRenderer: Context Restored."),F=!1;const T=Wt.autoReset,Q=ye.enabled,oe=ye.autoUpdate,ae=ye.needsUpdate,Z=ye.type;Ce(),Wt.autoReset=T,ye.enabled=Q,ye.autoUpdate=oe,ye.needsUpdate=ae,ye.type=Z}function ze(T){on("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function rt(T){const Q=T.target;Q.removeEventListener("dispose",rt),Ht(Q)}function Ht(T){Rt(T),qe.remove(T)}function Rt(T){const Q=qe.get(T).programs;Q!==void 0&&(Q.forEach(function(oe){de.releaseProgram(oe)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,Q,oe,ae,Z,be){Q===null&&(Q=en);const we=Z.isMesh&&Z.matrixWorld.determinant()<0,Ie=Qc(T,Q,oe,ae,Z);Ge.setMaterial(ae,we);let Fe=oe.index,$e=1;if(ae.wireframe===!0){if(Fe=ve.getWireframeAttribute(oe),Fe===void 0)return;$e=2}const nt=oe.drawRange,Ke=oe.attributes.position;let ht=nt.start*$e,Dt=(nt.start+nt.count)*$e;be!==null&&(ht=Math.max(ht,be.start*$e),Dt=Math.min(Dt,(be.start+be.count)*$e)),Fe!==null?(ht=Math.max(ht,0),Dt=Math.min(Dt,Fe.count)):Ke!=null&&(ht=Math.max(ht,0),Dt=Math.min(Dt,Ke.count));const wt=Dt-ht;if(wt<0||wt===1/0)return;k.setup(Z,ae,Ie,oe,Fe);let bt,Pt=Ve;if(Fe!==null&&(bt=te.get(Fe),Pt=Pe,Pt.setIndex(bt)),Z.isMesh)ae.wireframe===!0?(Ge.setLineWidth(ae.wireframeLinewidth*Et()),Pt.setMode(V.LINES)):Pt.setMode(V.TRIANGLES);else if(Z.isLine){let je=ae.linewidth;je===void 0&&(je=1),Ge.setLineWidth(je*Et()),Z.isLineSegments?Pt.setMode(V.LINES):Z.isLineLoop?Pt.setMode(V.LINE_LOOP):Pt.setMode(V.LINE_STRIP)}else Z.isPoints?Pt.setMode(V.POINTS):Z.isSprite&&Pt.setMode(V.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Zo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Pt.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(gt.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const je=Z._multiDrawStarts,Qt=Z._multiDrawCounts,Tt=Z._multiDrawCount,yn=Fe?te.get(Fe).bytesPerElement:1,ba=qe.get(ae).currentProgram.getUniforms();for(let Kt=0;Kt<Tt;Kt++)ba.setValue(V,"_gl_DrawID",Kt),Pt.render(je[Kt]/yn,Qt[Kt])}else if(Z.isInstancedMesh)Pt.renderInstances(ht,wt,Z.count);else if(oe.isInstancedBufferGeometry){const je=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Qt=Math.min(oe.instanceCount,je);Pt.renderInstances(ht,wt,Qt)}else Pt.render(ht,wt)};function Pn(T,Q,oe){T.transparent===!0&&T.side===kn&&T.forceSinglePass===!1?(T.side=Cn,T.needsUpdate=!0,gn(T,Q,oe),T.side=_a,T.needsUpdate=!0,gn(T,Q,oe),T.side=kn):gn(T,Q,oe)}this.compile=function(T,Q,oe=null){oe===null&&(oe=T),U=Je.get(oe),U.init(Q),Y.push(U),oe.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Q.layers)&&(U.pushLight(Z),Z.castShadow&&U.pushShadow(Z))}),T!==oe&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(Q.layers)&&(U.pushLight(Z),Z.castShadow&&U.pushShadow(Z))}),U.setupLights();const ae=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const be=Z.material;if(be)if(Array.isArray(be))for(let we=0;we<be.length;we++){const Ie=be[we];Pn(Ie,oe,Z),ae.add(Ie)}else Pn(be,oe,Z),ae.add(be)}),U=Y.pop(),ae},this.compileAsync=function(T,Q,oe=null){const ae=this.compile(T,Q,oe);return new Promise(Z=>{function be(){if(ae.forEach(function(we){qe.get(we).currentProgram.isReady()&&ae.delete(we)}),ae.size===0){Z(T);return}setTimeout(be,10)}gt.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let jn=null;function tl(T){jn&&jn(T)}function Vs(){Mi.stop()}function ks(){Mi.start()}const Mi=new mx;Mi.setAnimationLoop(tl),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(T){jn=T,De.setAnimationLoop(T),T===null?Mi.stop():Mi.start()},De.addEventListener("sessionstart",Vs),De.addEventListener("sessionend",ks),this.render=function(T,Q){if(Q!==void 0&&Q.isCamera!==!0){on("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(De.cameraAutoUpdate===!0&&De.updateCamera(Q),Q=De.getCamera()),T.isScene===!0&&T.onBeforeRender(O,T,Q,R),U=Je.get(T,Y.length),U.init(Q),Y.push(U),Ne.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),J.setFromProjectionMatrix(Ne,Hi,Q.reversedDepth),Te=this.localClippingEnabled,ue=Ye.init(this.clippingPlanes,Te),P=Le.get(T,I.length),P.init(),I.push(P),De.enabled===!0&&De.isPresenting===!0){const be=O.xr.getDepthSensingMesh();be!==null&&sr(be,Q,-1/0,O.sortObjects)}sr(T,Q,0,O.sortObjects),P.finish(),O.sortObjects===!0&&P.sort(L,j),ut=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,ut&&Ee.addToRenderList(P,T),this.info.render.frame++,ue===!0&&Ye.beginShadows();const oe=U.state.shadowsArray;ye.render(oe,T,Q),ue===!0&&Ye.endShadows(),this.info.autoReset===!0&&this.info.reset();const ae=P.opaque,Z=P.transmissive;if(U.setupLights(),Q.isArrayCamera){const be=Q.cameras;if(Z.length>0)for(let we=0,Ie=be.length;we<Ie;we++){const Fe=be[we];Ys(ae,Z,T,Fe)}ut&&Ee.render(T);for(let we=0,Ie=be.length;we<Ie;we++){const Fe=be[we];Xs(P,T,Fe,Fe.viewport)}}else Z.length>0&&Ys(ae,Z,T,Q),ut&&Ee.render(T),Xs(P,T,Q);R!==null&&w===0&&(ot.updateMultisampleRenderTarget(R),ot.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(O,T,Q),k.resetDefaultState(),W=-1,re=null,Y.pop(),Y.length>0?(U=Y[Y.length-1],ue===!0&&Ye.setGlobalState(O.clippingPlanes,U.state.camera)):U=null,I.pop(),I.length>0?P=I[I.length-1]:P=null};function sr(T,Q,oe,ae){if(T.visible===!1)return;if(T.layers.test(Q.layers)){if(T.isGroup)oe=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Q);else if(T.isLight)U.pushLight(T),T.castShadow&&U.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){ae&&st.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ne);const we=_e.update(T),Ie=T.material;Ie.visible&&P.push(T,we,Ie,oe,st.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){const we=_e.update(T),Ie=T.material;if(ae&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),st.copy(T.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),st.copy(we.boundingSphere.center)),st.applyMatrix4(T.matrixWorld).applyMatrix4(Ne)),Array.isArray(Ie)){const Fe=we.groups;for(let $e=0,nt=Fe.length;$e<nt;$e++){const Ke=Fe[$e],ht=Ie[Ke.materialIndex];ht&&ht.visible&&P.push(T,we,ht,oe,st.z,Ke)}}else Ie.visible&&P.push(T,we,Ie,oe,st.z,null)}}const be=T.children;for(let we=0,Ie=be.length;we<Ie;we++)sr(be[we],Q,oe,ae)}function Xs(T,Q,oe,ae){const{opaque:Z,transmissive:be,transparent:we}=T;U.setupLightsView(oe),ue===!0&&Ye.setGlobalState(O.clippingPlanes,oe),ae&&Ge.viewport(fe.copy(ae)),Z.length>0&&$n(Z,Q,oe),be.length>0&&$n(be,Q,oe),we.length>0&&$n(we,Q,oe),Ge.buffers.depth.setTest(!0),Ge.buffers.depth.setMask(!0),Ge.buffers.color.setMask(!0),Ge.setPolygonOffset(!1)}function Ys(T,Q,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;U.state.transmissionRenderTarget[ae.id]===void 0&&(U.state.transmissionRenderTarget[ae.id]=new Hn(1,1,{generateMipmaps:!0,type:gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float")?Fs:Nn,minFilter:Br,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Bt.workingColorSpace}));const be=U.state.transmissionRenderTarget[ae.id],we=ae.viewport||fe;be.setSize(we.z*O.transmissionResolutionScale,we.w*O.transmissionResolutionScale);const Ie=O.getRenderTarget(),Fe=O.getActiveCubeFace(),$e=O.getActiveMipmapLevel();O.setRenderTarget(be),O.getClearColor(D),H=O.getClearAlpha(),H<1&&O.setClearColor(16777215,.5),O.clear(),ut&&Ee.render(oe);const nt=O.toneMapping;O.toneMapping=ir;const Ke=ae.viewport;if(ae.viewport!==void 0&&(ae.viewport=void 0),U.setupLightsView(ae),ue===!0&&Ye.setGlobalState(O.clippingPlanes,ae),$n(T,oe,ae),ot.updateMultisampleRenderTarget(be),ot.updateRenderTargetMipmap(be),gt.has("WEBGL_multisampled_render_to_texture")===!1){let ht=!1;for(let Dt=0,wt=Q.length;Dt<wt;Dt++){const bt=Q[Dt],{object:Pt,geometry:je,material:Qt,group:Tt}=bt;if(Qt.side===kn&&Pt.layers.test(ae.layers)){const yn=Qt.side;Qt.side=Cn,Qt.needsUpdate=!0,cn(Pt,oe,ae,je,Qt,Tt),Qt.side=yn,Qt.needsUpdate=!0,ht=!0}}ht===!0&&(ot.updateMultisampleRenderTarget(be),ot.updateRenderTargetMipmap(be))}O.setRenderTarget(Ie,Fe,$e),O.setClearColor(D,H),Ke!==void 0&&(ae.viewport=Ke),O.toneMapping=nt}function $n(T,Q,oe){const ae=Q.isScene===!0?Q.overrideMaterial:null;for(let Z=0,be=T.length;Z<be;Z++){const we=T[Z],{object:Ie,geometry:Fe,group:$e}=we;let nt=we.material;nt.allowOverride===!0&&ae!==null&&(nt=ae),Ie.layers.test(oe.layers)&&cn(Ie,Q,oe,Fe,nt,$e)}}function cn(T,Q,oe,ae,Z,be){T.onBeforeRender(O,Q,oe,ae,Z,be),T.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(O,Q,oe,ae,T,be),Z.transparent===!0&&Z.side===kn&&Z.forceSinglePass===!1?(Z.side=Cn,Z.needsUpdate=!0,O.renderBufferDirect(oe,Q,ae,Z,T,be),Z.side=_a,Z.needsUpdate=!0,O.renderBufferDirect(oe,Q,ae,Z,T,be),Z.side=kn):O.renderBufferDirect(oe,Q,ae,Z,T,be),T.onAfterRender(O,Q,oe,ae,Z,be)}function gn(T,Q,oe){Q.isScene!==!0&&(Q=en);const ae=qe.get(T),Z=U.state.lights,be=U.state.shadowsArray,we=Z.state.version,Ie=de.getParameters(T,Z.state,be,Q,oe),Fe=de.getProgramCacheKey(Ie);let $e=ae.programs;ae.environment=T.isMeshStandardMaterial?Q.environment:null,ae.fog=Q.fog,ae.envMap=(T.isMeshStandardMaterial?M:B).get(T.envMap||ae.environment),ae.envMapRotation=ae.environment!==null&&T.envMap===null?Q.environmentRotation:T.envMapRotation,$e===void 0&&(T.addEventListener("dispose",rt),$e=new Map,ae.programs=$e);let nt=$e.get(Fe);if(nt!==void 0){if(ae.currentProgram===nt&&ae.lightsStateVersion===we)return Nr(T,Ie),nt}else Ie.uniforms=de.getUniforms(T),T.onBeforeCompile(Ie,O),nt=de.acquireProgram(Ie,Fe),$e.set(Fe,nt),ae.uniforms=Ie.uniforms;const Ke=ae.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ke.clippingPlanes=Ye.uniform),Nr(T,Ie),ae.needsLights=nl(T),ae.lightsStateVersion=we,ae.needsLights&&(Ke.ambientLightColor.value=Z.state.ambient,Ke.lightProbe.value=Z.state.probe,Ke.directionalLights.value=Z.state.directional,Ke.directionalLightShadows.value=Z.state.directionalShadow,Ke.spotLights.value=Z.state.spot,Ke.spotLightShadows.value=Z.state.spotShadow,Ke.rectAreaLights.value=Z.state.rectArea,Ke.ltc_1.value=Z.state.rectAreaLTC1,Ke.ltc_2.value=Z.state.rectAreaLTC2,Ke.pointLights.value=Z.state.point,Ke.pointLightShadows.value=Z.state.pointShadow,Ke.hemisphereLights.value=Z.state.hemi,Ke.directionalShadowMap.value=Z.state.directionalShadowMap,Ke.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ke.spotShadowMap.value=Z.state.spotShadowMap,Ke.spotLightMatrix.value=Z.state.spotLightMatrix,Ke.spotLightMap.value=Z.state.spotLightMap,Ke.pointShadowMap.value=Z.state.pointShadowMap,Ke.pointShadowMatrix.value=Z.state.pointShadowMatrix),ae.currentProgram=nt,ae.uniformsList=null,nt}function ki(T){if(T.uniformsList===null){const Q=T.currentProgram.getUniforms();T.uniformsList=Fc.seqWithValue(Q.seq,T.uniforms)}return T.uniformsList}function Nr(T,Q){const oe=qe.get(T);oe.outputColorSpace=Q.outputColorSpace,oe.batching=Q.batching,oe.batchingColor=Q.batchingColor,oe.instancing=Q.instancing,oe.instancingColor=Q.instancingColor,oe.instancingMorph=Q.instancingMorph,oe.skinning=Q.skinning,oe.morphTargets=Q.morphTargets,oe.morphNormals=Q.morphNormals,oe.morphColors=Q.morphColors,oe.morphTargetsCount=Q.morphTargetsCount,oe.numClippingPlanes=Q.numClippingPlanes,oe.numIntersection=Q.numClipIntersection,oe.vertexAlphas=Q.vertexAlphas,oe.vertexTangents=Q.vertexTangents,oe.toneMapping=Q.toneMapping}function Qc(T,Q,oe,ae,Z){Q.isScene!==!0&&(Q=en),ot.resetTextureUnits();const be=Q.fog,we=ae.isMeshStandardMaterial?Q.environment:null,Ie=R===null?O.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:rr,Fe=(ae.isMeshStandardMaterial?M:B).get(ae.envMap||we),$e=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,nt=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),Ke=!!oe.morphAttributes.position,ht=!!oe.morphAttributes.normal,Dt=!!oe.morphAttributes.color;let wt=ir;ae.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(wt=O.toneMapping);const bt=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Pt=bt!==void 0?bt.length:0,je=qe.get(ae),Qt=U.state.lights;if(ue===!0&&(Te===!0||T!==re)){const En=T===re&&ae.id===W;Ye.setState(ae,T,En)}let Tt=!1;ae.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Qt.state.version||je.outputColorSpace!==Ie||Z.isBatchedMesh&&je.batching===!1||!Z.isBatchedMesh&&je.batching===!0||Z.isBatchedMesh&&je.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&je.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&je.instancing===!1||!Z.isInstancedMesh&&je.instancing===!0||Z.isSkinnedMesh&&je.skinning===!1||!Z.isSkinnedMesh&&je.skinning===!0||Z.isInstancedMesh&&je.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&je.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&je.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&je.instancingMorph===!1&&Z.morphTexture!==null||je.envMap!==Fe||ae.fog===!0&&je.fog!==be||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==Ye.numPlanes||je.numIntersection!==Ye.numIntersection)||je.vertexAlphas!==$e||je.vertexTangents!==nt||je.morphTargets!==Ke||je.morphNormals!==ht||je.morphColors!==Dt||je.toneMapping!==wt||je.morphTargetsCount!==Pt)&&(Tt=!0):(Tt=!0,je.__version=ae.version);let yn=je.currentProgram;Tt===!0&&(yn=gn(ae,Q,Z));let ba=!1,Kt=!1,Xi=!1;const Zt=yn.getUniforms(),Mn=je.uniforms;if(Ge.useProgram(yn.program)&&(ba=!0,Kt=!0,Xi=!0),ae.id!==W&&(W=ae.id,Kt=!0),ba||re!==T){Ge.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Zt.setValue(V,"projectionMatrix",T.projectionMatrix),Zt.setValue(V,"viewMatrix",T.matrixWorldInverse);const Rn=Zt.map.cameraPosition;Rn!==void 0&&Rn.setValue(V,Xe.setFromMatrixPosition(T.matrixWorld)),It.logarithmicDepthBuffer&&Zt.setValue(V,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&Zt.setValue(V,"isOrthographic",T.isOrthographicCamera===!0),re!==T&&(re=T,Kt=!0,Xi=!0)}if(Z.isSkinnedMesh){Zt.setOptional(V,Z,"bindMatrix"),Zt.setOptional(V,Z,"bindMatrixInverse");const En=Z.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Zt.setValue(V,"boneTexture",En.boneTexture,ot))}Z.isBatchedMesh&&(Zt.setOptional(V,Z,"batchingTexture"),Zt.setValue(V,"batchingTexture",Z._matricesTexture,ot),Zt.setOptional(V,Z,"batchingIdTexture"),Zt.setValue(V,"batchingIdTexture",Z._indirectTexture,ot),Zt.setOptional(V,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Zt.setValue(V,"batchingColorTexture",Z._colorsTexture,ot));const vn=oe.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&Qe.update(Z,oe,yn),(Kt||je.receiveShadow!==Z.receiveShadow)&&(je.receiveShadow=Z.receiveShadow,Zt.setValue(V,"receiveShadow",Z.receiveShadow)),ae.isMeshGouraudMaterial&&ae.envMap!==null&&(Mn.envMap.value=Fe,Mn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),ae.isMeshStandardMaterial&&ae.envMap===null&&Q.environment!==null&&(Mn.envMapIntensity.value=Q.environmentIntensity),Mn.dfgLUT!==void 0&&(Mn.dfgLUT.value=o1()),Kt&&(Zt.setValue(V,"toneMappingExposure",O.toneMappingExposure),je.needsLights&&qc(Mn,Xi),be&&ae.fog===!0&&We.refreshFogUniforms(Mn,be),We.refreshMaterialUniforms(Mn,ae,he,le,U.state.transmissionRenderTarget[T.id]),Fc.upload(V,ki(je),Mn,ot)),ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(Fc.upload(V,ki(je),Mn,ot),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&Zt.setValue(V,"center",Z.center),Zt.setValue(V,"modelViewMatrix",Z.modelViewMatrix),Zt.setValue(V,"normalMatrix",Z.normalMatrix),Zt.setValue(V,"modelMatrix",Z.matrixWorld),ae.isShaderMaterial||ae.isRawShaderMaterial){const En=ae.uniformsGroups;for(let Rn=0,Bi=En.length;Rn<Bi;Rn++){const Yi=En[Rn];Re.update(Yi,yn),Re.bind(Yi,yn)}}return yn}function qc(T,Q){T.ambientLightColor.needsUpdate=Q,T.lightProbe.needsUpdate=Q,T.directionalLights.needsUpdate=Q,T.directionalLightShadows.needsUpdate=Q,T.pointLights.needsUpdate=Q,T.pointLightShadows.needsUpdate=Q,T.spotLights.needsUpdate=Q,T.spotLightShadows.needsUpdate=Q,T.rectAreaLights.needsUpdate=Q,T.hemisphereLights.needsUpdate=Q}function nl(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,Q,oe){const ae=qe.get(T);ae.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ae.__autoAllocateDepthBuffer===!1&&(ae.__useRenderToTexture=!1),qe.get(T.texture).__webglTexture=Q,qe.get(T.depthTexture).__webglTexture=ae.__autoAllocateDepthBuffer?void 0:oe,ae.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Q){const oe=qe.get(T);oe.__webglFramebuffer=Q,oe.__useDefaultFramebuffer=Q===void 0};const or=V.createFramebuffer();this.setRenderTarget=function(T,Q=0,oe=0){R=T,ie=Q,w=oe;let ae=!0,Z=null,be=!1,we=!1;if(T){const Fe=qe.get(T);if(Fe.__useDefaultFramebuffer!==void 0)Ge.bindFramebuffer(V.FRAMEBUFFER,null),ae=!1;else if(Fe.__webglFramebuffer===void 0)ot.setupRenderTarget(T);else if(Fe.__hasExternalTextures)ot.rebindTextures(T,qe.get(T.texture).__webglTexture,qe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ke=T.depthTexture;if(Fe.__boundDepthTexture!==Ke){if(Ke!==null&&qe.has(Ke)&&(T.width!==Ke.image.width||T.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(T)}}const $e=T.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(we=!0);const nt=qe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(nt[Q])?Z=nt[Q][oe]:Z=nt[Q],be=!0):T.samples>0&&ot.useMultisampledRTT(T)===!1?Z=qe.get(T).__webglMultisampledFramebuffer:Array.isArray(nt)?Z=nt[oe]:Z=nt,fe.copy(T.viewport),$.copy(T.scissor),N=T.scissorTest}else fe.copy(pe).multiplyScalar(he).floor(),$.copy(Se).multiplyScalar(he).floor(),N=Ue;if(oe!==0&&(Z=or),Ge.bindFramebuffer(V.FRAMEBUFFER,Z)&&ae&&Ge.drawBuffers(T,Z),Ge.viewport(fe),Ge.scissor($),Ge.setScissorTest(N),be){const Fe=qe.get(T.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Fe.__webglTexture,oe)}else if(we){const Fe=Q;for(let $e=0;$e<T.textures.length;$e++){const nt=qe.get(T.textures[$e]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+$e,nt.__webglTexture,oe,Fe)}}else if(T!==null&&oe!==0){const Fe=qe.get(T.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Fe.__webglTexture,oe)}W=-1},this.readRenderTargetPixels=function(T,Q,oe,ae,Z,be,we,Ie=0){if(!(T&&T.isWebGLRenderTarget)){on("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&we!==void 0&&(Fe=Fe[we]),Fe){Ge.bindFramebuffer(V.FRAMEBUFFER,Fe);try{const $e=T.textures[Ie],nt=$e.format,Ke=$e.type;if(!It.textureFormatReadable(nt)){on("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!It.textureTypeReadable(Ke)){on("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=T.width-ae&&oe>=0&&oe<=T.height-Z&&(T.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ie),V.readPixels(Q,oe,ae,Z,it.convert(nt),it.convert(Ke),be))}finally{const $e=R!==null?qe.get(R).__webglFramebuffer:null;Ge.bindFramebuffer(V.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(T,Q,oe,ae,Z,be,we,Ie=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=qe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&we!==void 0&&(Fe=Fe[we]),Fe)if(Q>=0&&Q<=T.width-ae&&oe>=0&&oe<=T.height-Z){Ge.bindFramebuffer(V.FRAMEBUFFER,Fe);const $e=T.textures[Ie],nt=$e.format,Ke=$e.type;if(!It.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!It.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ht=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,ht),V.bufferData(V.PIXEL_PACK_BUFFER,be.byteLength,V.STREAM_READ),T.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ie),V.readPixels(Q,oe,ae,Z,it.convert(nt),it.convert(Ke),0);const Dt=R!==null?qe.get(R).__webglFramebuffer:null;Ge.bindFramebuffer(V.FRAMEBUFFER,Dt);const wt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await TS(V,wt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,ht),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,be),V.deleteBuffer(ht),V.deleteSync(wt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Q=null,oe=0){const ae=Math.pow(2,-oe),Z=Math.floor(T.image.width*ae),be=Math.floor(T.image.height*ae),we=Q!==null?Q.x:0,Ie=Q!==null?Q.y:0;ot.setTexture2D(T,0),V.copyTexSubImage2D(V.TEXTURE_2D,oe,0,0,we,Ie,Z,be),Ge.unbindTexture()};const Ws=V.createFramebuffer(),Ea=V.createFramebuffer();this.copyTextureToTexture=function(T,Q,oe=null,ae=null,Z=0,be=null){be===null&&(Z!==0?(Zo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),be=Z,Z=0):be=0);let we,Ie,Fe,$e,nt,Ke,ht,Dt,wt;const bt=T.isCompressedTexture?T.mipmaps[be]:T.image;if(oe!==null)we=oe.max.x-oe.min.x,Ie=oe.max.y-oe.min.y,Fe=oe.isBox3?oe.max.z-oe.min.z:1,$e=oe.min.x,nt=oe.min.y,Ke=oe.isBox3?oe.min.z:0;else{const vn=Math.pow(2,-Z);we=Math.floor(bt.width*vn),Ie=Math.floor(bt.height*vn),T.isDataArrayTexture?Fe=bt.depth:T.isData3DTexture?Fe=Math.floor(bt.depth*vn):Fe=1,$e=0,nt=0,Ke=0}ae!==null?(ht=ae.x,Dt=ae.y,wt=ae.z):(ht=0,Dt=0,wt=0);const Pt=it.convert(Q.format),je=it.convert(Q.type);let Qt;Q.isData3DTexture?(ot.setTexture3D(Q,0),Qt=V.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(ot.setTexture2DArray(Q,0),Qt=V.TEXTURE_2D_ARRAY):(ot.setTexture2D(Q,0),Qt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Q.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Q.unpackAlignment);const Tt=V.getParameter(V.UNPACK_ROW_LENGTH),yn=V.getParameter(V.UNPACK_IMAGE_HEIGHT),ba=V.getParameter(V.UNPACK_SKIP_PIXELS),Kt=V.getParameter(V.UNPACK_SKIP_ROWS),Xi=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,bt.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,bt.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,$e),V.pixelStorei(V.UNPACK_SKIP_ROWS,nt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Ke);const Zt=T.isDataArrayTexture||T.isData3DTexture,Mn=Q.isDataArrayTexture||Q.isData3DTexture;if(T.isDepthTexture){const vn=qe.get(T),En=qe.get(Q),Rn=qe.get(vn.__renderTarget),Bi=qe.get(En.__renderTarget);Ge.bindFramebuffer(V.READ_FRAMEBUFFER,Rn.__webglFramebuffer),Ge.bindFramebuffer(V.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Yi=0;Yi<Fe;Yi++)Zt&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,qe.get(T).__webglTexture,Z,Ke+Yi),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,qe.get(Q).__webglTexture,be,wt+Yi)),V.blitFramebuffer($e,nt,we,Ie,ht,Dt,we,Ie,V.DEPTH_BUFFER_BIT,V.NEAREST);Ge.bindFramebuffer(V.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||qe.has(T)){const vn=qe.get(T),En=qe.get(Q);Ge.bindFramebuffer(V.READ_FRAMEBUFFER,Ws),Ge.bindFramebuffer(V.DRAW_FRAMEBUFFER,Ea);for(let Rn=0;Rn<Fe;Rn++)Zt?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,vn.__webglTexture,Z,Ke+Rn):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,vn.__webglTexture,Z),Mn?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,En.__webglTexture,be,wt+Rn):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,En.__webglTexture,be),Z!==0?V.blitFramebuffer($e,nt,we,Ie,ht,Dt,we,Ie,V.COLOR_BUFFER_BIT,V.NEAREST):Mn?V.copyTexSubImage3D(Qt,be,ht,Dt,wt+Rn,$e,nt,we,Ie):V.copyTexSubImage2D(Qt,be,ht,Dt,$e,nt,we,Ie);Ge.bindFramebuffer(V.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Mn?T.isDataTexture||T.isData3DTexture?V.texSubImage3D(Qt,be,ht,Dt,wt,we,Ie,Fe,Pt,je,bt.data):Q.isCompressedArrayTexture?V.compressedTexSubImage3D(Qt,be,ht,Dt,wt,we,Ie,Fe,Pt,bt.data):V.texSubImage3D(Qt,be,ht,Dt,wt,we,Ie,Fe,Pt,je,bt):T.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,be,ht,Dt,we,Ie,Pt,je,bt.data):T.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,be,ht,Dt,bt.width,bt.height,Pt,bt.data):V.texSubImage2D(V.TEXTURE_2D,be,ht,Dt,we,Ie,Pt,je,bt);V.pixelStorei(V.UNPACK_ROW_LENGTH,Tt),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,yn),V.pixelStorei(V.UNPACK_SKIP_PIXELS,ba),V.pixelStorei(V.UNPACK_SKIP_ROWS,Kt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Xi),be===0&&Q.generateMipmaps&&V.generateMipmap(Qt),Ge.unbindTexture()},this.initRenderTarget=function(T){qe.get(T).__webglFramebuffer===void 0&&ot.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ot.setTextureCube(T,0):T.isData3DTexture?ot.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ot.setTexture2DArray(T,0):ot.setTexture2D(T,0),Ge.unbindTexture()},this.resetState=function(){ie=0,w=0,R=null,Ge.reset(),k.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Bt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Bt._getUnpackColorSpace()}}var Fh=1/1e3,c1=1e3,u1=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(a){typeof document<"u"&&document.hidden!==void 0&&(a?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=a)}get delta(){return this._delta*Fh}get fixedDelta(){return this._fixedDelta*Fh}set fixedDelta(a){this._fixedDelta=a*c1}get elapsed(){return this._elapsed*Fh}update(a){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(a!==void 0?a:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(a){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},f1=(()=>{const a=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),i=new Li;return i.setAttribute("position",new fi(a,3)),i.setAttribute("uv",new fi(e,2)),i})(),yi=class wd{static get fullscreenGeometry(){return f1}constructor(e="Pass",i=new Dd,s=new px){this.name=e,this.renderer=null,this.scene=i,this.camera=s,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){const i=this.fullscreenMaterial;i!==null&&(i.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let i=this.screen;i!==null?i.material=e:(i=new Si(wd.fullscreenGeometry,e),i.frustumCulled=!1,this.scene===null&&(this.scene=new Dd),this.scene.add(i),this.screen=i)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,i=Or){}render(e,i,s,l,c){throw new Error("Render method not implemented!")}setSize(e,i){}initialize(e,i,s){}dispose(){for(const e of Object.keys(this)){const i=this[e];(i instanceof Hn||i instanceof Hs||i instanceof An||i instanceof wd)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},h1=class extends yi{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(a,e,i,s,l){const c=a.state.buffers.stencil;c.setLocked(!1),c.setTest(!1)}},d1=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,_x="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",Sx=class extends ln{constructor(){super({name:"CopyMaterial",defines:{DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new mt(null),depthBuffer:new mt(null),channelWeights:new mt(null),opacity:new mt(1)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:d1,vertexShader:_x}),this.depthFunc=Hc}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(a){const e=a!==null;this.colorWrite!==e&&(e?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=e,this.needsUpdate=!0),this.uniforms.inputBuffer.value=a}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(a){const e=a!==null;this.depthWrite!==e&&(e?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=e,this.depthWrite=e,this.needsUpdate=!0),this.uniforms.depthBuffer.value=a}set depthPacking(a){this.defines.DEPTH_PACKING=a.toFixed(0),this.needsUpdate=!0}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(a){a!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=a):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(a){this.uniforms.inputBuffer.value=a}getOpacity(a){return this.uniforms.opacity.value}setOpacity(a){this.uniforms.opacity.value=a}},p1=class extends yi{constructor(a,e=!0){super("CopyPass"),this.fullscreenMaterial=new Sx,this.needsSwap=!1,this.renderTarget=a,a===void 0&&(this.renderTarget=new Hn(1,1,{minFilter:Dn,magFilter:Dn,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(a){this.autoResize=a}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(a){this.autoResize=a}render(a,e,i,s,l){this.fullscreenMaterial.inputBuffer=e.texture,a.setRenderTarget(this.renderToScreen?null:this.renderTarget),a.render(this.scene,this.camera)}setSize(a,e){this.autoResize&&this.renderTarget.setSize(a,e)}initialize(a,e,i){i!==void 0&&(this.renderTarget.texture.type=i,i!==Nn?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":a!==null&&a.outputColorSpace===Yt&&(this.renderTarget.texture.colorSpace=Yt))}},Ov=new vt,Yd=class extends yi{constructor(a=!0,e=!0,i=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=a,this.depth=e,this.stencil=i,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(a,e,i){this.color=a,this.depth=e,this.stencil=i}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(a){this.overrideClearColor=a}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(a){this.overrideClearAlpha=a}render(a,e,i,s,l){const c=this.overrideClearColor,h=this.overrideClearAlpha,d=a.getClearAlpha(),m=c!==null,p=h>=0;m?(a.getClearColor(Ov),a.setClearColor(c,p?h:d)):p&&a.setClearAlpha(h),a.setRenderTarget(this.renderToScreen?null:e),a.clear(this.color,this.depth,this.stencil),m?a.setClearColor(Ov,d):p&&a.setClearAlpha(d)}},m1=class extends yi{constructor(a,e){super("MaskPass",a,e),this.needsSwap=!1,this.clearPass=new Yd(!1,!1,!0),this.inverse=!1}set mainScene(a){this.scene=a}set mainCamera(a){this.camera=a}get inverted(){return this.inverse}set inverted(a){this.inverse=a}get clear(){return this.clearPass.enabled}set clear(a){this.clearPass.enabled=a}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(a){this.inverted=a}render(a,e,i,s,l){const c=a.getContext(),h=a.state.buffers,d=this.scene,m=this.camera,p=this.clearPass,v=this.inverted?0:1,g=1-v;h.color.setMask(!1),h.depth.setMask(!1),h.color.setLocked(!0),h.depth.setLocked(!0),h.stencil.setTest(!0),h.stencil.setOp(c.REPLACE,c.REPLACE,c.REPLACE),h.stencil.setFunc(c.ALWAYS,v,4294967295),h.stencil.setClear(g),h.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?p.render(a,null):(p.render(a,e),p.render(a,i))),this.renderToScreen?(a.setRenderTarget(null),a.render(d,m)):(a.setRenderTarget(e),a.render(d,m),a.setRenderTarget(i),a.render(d,m)),h.color.setLocked(!1),h.depth.setLocked(!1),h.stencil.setLocked(!1),h.stencil.setFunc(c.EQUAL,1,4294967295),h.stencil.setOp(c.KEEP,c.KEEP,c.KEEP),h.stencil.setLocked(!0)}},g1=class{constructor(a=null,{depthBuffer:e=!0,stencilBuffer:i=!1,multisampling:s=0,frameBufferType:l}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,i,l,s),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new p1,this.depthTexture=null,this.passes=[],this.timer=new u1,this.autoRenderToScreen=!0,this.setRenderer(a)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(a){const e=this.inputBuffer,i=this.multisampling;i>0&&a>0?(this.inputBuffer.samples=a,this.outputBuffer.samples=a,this.inputBuffer.dispose(),this.outputBuffer.dispose()):i!==a&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,a),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(a){if(this.renderer=a,a!==null){const e=a.getSize(new Oe),i=a.getContext().getContextAttributes().alpha,s=this.inputBuffer.texture.type;s===Nn&&a.outputColorSpace===Yt&&(this.inputBuffer.texture.colorSpace=Yt,this.outputBuffer.texture.colorSpace=Yt,this.inputBuffer.dispose(),this.outputBuffer.dispose()),a.autoClear=!1,this.setSize(e.width,e.height);for(const l of this.passes)l.initialize(a,i,s)}}replaceRenderer(a,e=!0){const i=this.renderer,s=i.domElement.parentNode;return this.setRenderer(a),e&&s!==null&&(s.removeChild(i.domElement),s.appendChild(a.domElement)),i}createDepthTexture(){const a=this.depthTexture=new Vd;return this.inputBuffer.depthTexture=a,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(a.format=Ns,a.type=Os):a.type=ar,a}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const a of this.passes)a.setDepthTexture(null)}}createBuffer(a,e,i,s){const l=this.renderer,c=l===null?new Oe:l.getDrawingBufferSize(new Oe),h={minFilter:Dn,magFilter:Dn,stencilBuffer:e,depthBuffer:a,type:i},d=new Hn(c.width,c.height,h);return s>0&&(d.samples=s),i===Nn&&l!==null&&l.outputColorSpace===Yt&&(d.texture.colorSpace=Yt),d.texture.name="EffectComposer.Buffer",d.texture.generateMipmaps=!1,d}setMainScene(a){for(const e of this.passes)e.mainScene=a}setMainCamera(a){for(const e of this.passes)e.mainCamera=a}addPass(a,e){const i=this.passes,s=this.renderer,l=s.getDrawingBufferSize(new Oe),c=s.getContext().getContextAttributes().alpha,h=this.inputBuffer.texture.type;if(a.setRenderer(s),a.setSize(l.width,l.height),a.initialize(s,c,h),this.autoRenderToScreen&&(i.length>0&&(i[i.length-1].renderToScreen=!1),a.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?i.splice(e,0,a):i.push(a),this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!0),a.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const d=this.createDepthTexture();for(a of i)a.setDepthTexture(d)}else a.setDepthTexture(this.depthTexture)}removePass(a){const e=this.passes,i=e.indexOf(a);if(i!==-1&&e.splice(i,1).length>0){if(this.depthTexture!==null){const c=(d,m)=>d||m.needsDepthTexture;e.reduce(c,!1)||(a.getDepthTexture()===this.depthTexture&&a.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&i===e.length&&(a.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const a=this.passes;this.deleteDepthTexture(),a.length>0&&(this.autoRenderToScreen&&(a[a.length-1].renderToScreen=!1),this.passes=[])}render(a){const e=this.renderer,i=this.copyPass;let s=this.inputBuffer,l=this.outputBuffer,c=!1,h,d,m;a===void 0&&(this.timer.update(),a=this.timer.getDelta());for(const p of this.passes)p.enabled&&(p.render(e,s,l,a,c),p.needsSwap&&(c&&(i.renderToScreen=p.renderToScreen,h=e.getContext(),d=e.state.buffers.stencil,d.setFunc(h.NOTEQUAL,1,4294967295),i.render(e,s,l,a,c),d.setFunc(h.EQUAL,1,4294967295)),m=s,s=l,l=m),p instanceof m1?c=!0:p instanceof h1&&(c=!1))}setSize(a,e,i){const s=this.renderer,l=s.getSize(new Oe);(a===void 0||e===void 0)&&(a=l.width,e=l.height),(l.width!==a||l.height!==e)&&s.setSize(a,e,i);const c=s.getDrawingBufferSize(new Oe);this.inputBuffer.setSize(c.width,c.height),this.outputBuffer.setSize(c.width,c.height);for(const h of this.passes)h.setSize(c.width,c.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const a of this.passes)a.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),yi.fullscreenGeometry.dispose()}},Aa={NONE:0,DEPTH:1,CONVOLUTION:2},Ot={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},v1=class{constructor(){this.shaderParts=new Map([[Ot.FRAGMENT_HEAD,null],[Ot.FRAGMENT_MAIN_UV,null],[Ot.FRAGMENT_MAIN_IMAGE,null],[Ot.VERTEX_HEAD,null],[Ot.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Aa.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=rr}},Hh=!1,Nv=class{constructor(a=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(a),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let i;if(e.material.flatShading)switch(e.material.side){case kn:i=this.materialsFlatShadedDoubleSide;break;case Cn:i=this.materialsFlatShadedBackSide;break;default:i=this.materialsFlatShaded;break}else switch(e.material.side){case kn:i=this.materialsDoubleSide;break;case Cn:i=this.materialsBackSide;break;default:i=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=i[2]:e.isInstancedMesh?e.material=i[1]:e.material=i[0],++this.meshCount}}}cloneMaterial(a){if(!(a instanceof ln))return a.clone();const e=a.uniforms,i=new Map;for(const l in e){const c=e[l].value;c.isRenderTargetTexture&&(e[l].value=null,i.set(l,c))}const s=a.clone();for(const l of i)e[l[0]].value=l[1],s.uniforms[l[0]].value=l[1];return s}setMaterial(a){if(this.disposeMaterials(),this.material=a,a!==null){const e=this.materials=[this.cloneMaterial(a),this.cloneMaterial(a),this.cloneMaterial(a)];for(const i of e)i.uniforms=Object.assign({},a.uniforms),i.side=_a;e[2].skinning=!0,this.materialsBackSide=e.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},a.uniforms),s.side=Cn,s}),this.materialsDoubleSide=e.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},a.uniforms),s.side=kn,s}),this.materialsFlatShaded=e.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},a.uniforms),s.flatShading=!0,s}),this.materialsFlatShadedBackSide=e.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},a.uniforms),s.flatShading=!0,s.side=Cn,s}),this.materialsFlatShadedDoubleSide=e.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},a.uniforms),s.flatShading=!0,s.side=kn,s})}}render(a,e,i){const s=a.shadowMap.enabled;if(a.shadowMap.enabled=!1,Hh){const l=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),a.render(e,i);for(const c of l)c[0].material=c[1];this.meshCount!==l.size&&l.clear()}else{const l=e.overrideMaterial;e.overrideMaterial=this.material,a.render(e,i),e.overrideMaterial=l}a.shadowMap.enabled=s}disposeMaterials(){if(this.material!==null){const a=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of a)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Hh}static set workaroundEnabled(a){Hh=a}},tr=-1,Gi=class extends ya{constructor(a,e=tr,i=tr,s=1){super(),this.resizable=a,this.baseSize=new Oe(1,1),this.preferredSize=new Oe(e,i),this.target=this.preferredSize,this.s=s,this.effectiveSize=new Oe,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const a=this.baseSize,e=this.preferredSize,i=this.effectiveSize,s=this.scale;e.width!==tr?i.width=e.width:e.height!==tr?i.width=Math.round(e.height*(a.width/Math.max(a.height,1))):i.width=Math.round(a.width*s),e.height!==tr?i.height=e.height:e.width!==tr?i.height=Math.round(e.width/Math.max(a.width/Math.max(a.height,1),1)):i.height=Math.round(a.height*s)}get width(){return this.effectiveSize.width}set width(a){this.preferredWidth=a}get height(){return this.effectiveSize.height}set height(a){this.preferredHeight=a}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(a){this.s!==a&&(this.s=a,this.preferredSize.setScalar(tr),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(a){this.scale=a}get baseWidth(){return this.baseSize.width}set baseWidth(a){this.baseSize.width!==a&&(this.baseSize.width=a,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(a){this.baseWidth=a}get baseHeight(){return this.baseSize.height}set baseHeight(a){this.baseSize.height!==a&&(this.baseSize.height=a,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(a){this.baseHeight=a}setBaseSize(a,e){(this.baseSize.width!==a||this.baseSize.height!==e)&&(this.baseSize.set(a,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(a){this.preferredSize.width!==a&&(this.preferredSize.width=a,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(a){this.preferredWidth=a}get preferredHeight(){return this.preferredSize.height}set preferredHeight(a){this.preferredSize.height!==a&&(this.preferredSize.height=a,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(a){this.preferredHeight=a}setPreferredSize(a,e){(this.preferredSize.width!==a||this.preferredSize.height!==e)&&(this.preferredSize.set(a,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(a){this.s=a.scale,this.baseSize.set(a.baseWidth,a.baseHeight),this.preferredSize.set(a.preferredWidth,a.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return tr}},Mt={ADD:0,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},x1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb,y.a),y.a*opacity);}",A1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb)*0.5,y.a),y.a*opacity);}",_1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.xy,xHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",S1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/b)),vec3(1.0),step(1.0,a));return mix(x,vec4(z,y.a),y.a*opacity);}",y1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(x,vec4(z,y.a),y.a*opacity);}",M1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb,y.rgb),y.a),y.a*opacity);}",E1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(abs(x.rgb-y.rgb),y.a),y.a*opacity);}",b1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb/max(y.rgb,1e-12),y.a),y.a*opacity);}",T1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb-2.0*x.rgb*y.rgb),y.a),y.a*opacity);}",C1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=min(x.rgb,1.0);vec3 b=min(y.rgb,1.0);vec3 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(x,vec4(z,y.a),y.a*opacity);}",D1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(step(1.0,x.rgb+y.rgb),y.a),y.a*opacity);}",R1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.x,xHSL.yz));return mix(x,vec4(z,y.a),y.a*opacity);}",w1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-y.rgb,y.a),y.a*opacity);}",U1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(y.rgb*(1.0-x.rgb),y.a),y.a*opacity);}",L1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb,y.rgb),y.a),y.a*opacity);}",B1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(y.rgb+x.rgb-1.0,0.0,1.0),y.a),y.a*opacity);}",O1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb+y.rgb,1.0),y.a),y.a*opacity);}",N1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(2.0*y.rgb+x.rgb-1.0,0.0,1.0),y.a),y.a*opacity);}",P1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.xy,yHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",I1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb*y.rgb,y.a),y.a*opacity);}",z1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-abs(1.0-x.rgb-y.rgb),y.a),y.a*opacity);}",F1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,y.a*opacity);}",H1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(2.0*y.rgb*x.rgb,1.0-2.0*(1.0-y.rgb)*(1.0-x.rgb),step(0.5,x.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",G1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 y2=2.0*y.rgb;vec3 z=mix(mix(y2,x.rgb,step(0.5*x.rgb,y.rgb)),max(y2-1.0,vec3(0.0)),step(x.rgb,y2-1.0));return mix(x,vec4(z,y.a),y.a*opacity);}",V1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(min(x.rgb*x.rgb/max(1.0-y.rgb,1e-12),1.0),y.rgb,step(1.0,y.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",k1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.x,yHSL.y,xHSL.z));return mix(x,vec4(z,y.a),y.a*opacity);}",X1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb-min(x.rgb*y.rgb,1.0),y.a),y.a*opacity);}",Y1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb;vec3 b=y.rgb;vec3 y2=2.0*b;vec3 w=step(0.5,b);vec3 c=a-(1.0-y2)*a*(1.0-a);vec3 d=mix(a+(y2-1.0)*(sqrt(a)-a),a+(y2-1.0)*a*((16.0*a-12.0)*a+3.0),w*(1.0-step(0.25,a)));vec3 z=mix(c,d,w);return mix(x,vec4(z,y.a),y.a*opacity);}",W1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",Q1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb+y.rgb-1.0,0.0),y.a),y.a*opacity);}",q1="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(max(1.0-min((1.0-x.rgb)/(2.0*y.rgb),1.0),0.0),min(x.rgb/(2.0*(1.0-y.rgb)),1.0),step(0.5,y.rgb));return mix(x,vec4(z,y.a),y.a*opacity);}",K1=new Map([[Mt.ADD,x1],[Mt.AVERAGE,A1],[Mt.COLOR,_1],[Mt.COLOR_BURN,S1],[Mt.COLOR_DODGE,y1],[Mt.DARKEN,M1],[Mt.DIFFERENCE,E1],[Mt.DIVIDE,b1],[Mt.DST,null],[Mt.EXCLUSION,T1],[Mt.HARD_LIGHT,C1],[Mt.HARD_MIX,D1],[Mt.HUE,R1],[Mt.INVERT,w1],[Mt.INVERT_RGB,U1],[Mt.LIGHTEN,L1],[Mt.LINEAR_BURN,B1],[Mt.LINEAR_DODGE,O1],[Mt.LINEAR_LIGHT,N1],[Mt.LUMINOSITY,P1],[Mt.MULTIPLY,I1],[Mt.NEGATION,z1],[Mt.NORMAL,F1],[Mt.OVERLAY,H1],[Mt.PIN_LIGHT,G1],[Mt.REFLECT,V1],[Mt.SATURATION,k1],[Mt.SCREEN,X1],[Mt.SOFT_LIGHT,Y1],[Mt.SRC,W1],[Mt.SUBTRACT,Q1],[Mt.VIVID_LIGHT,q1]]),Z1=class extends ya{constructor(a,e=1){super(),this._blendFunction=a,this.opacity=new mt(e)}getOpacity(){return this.opacity.value}setOpacity(a){this.opacity.value=a}get blendFunction(){return this._blendFunction}set blendFunction(a){this._blendFunction=a,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(a){this.blendFunction=a}getShaderCode(){return K1.get(this.blendFunction)}},yx=class extends ya{constructor(a,e,{attributes:i=Aa.NONE,blendFunction:s=Mt.NORMAL,defines:l=new Map,uniforms:c=new Map,extensions:h=null,vertexShader:d=null}={}){super(),this.name=a,this.renderer=null,this.attributes=i,this.fragmentShader=e,this.vertexShader=d,this.defines=l,this.uniforms=c,this.extensions=h,this.blendMode=new Z1(s),this.blendMode.addEventListener("change",m=>this.setChanged()),this._inputColorSpace=rr,this._outputColorSpace=Fi}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(a){this._inputColorSpace=a,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(a){this._outputColorSpace=a,this.setChanged()}set mainScene(a){}set mainCamera(a){}getName(){return this.name}setRenderer(a){this.renderer=a}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(a){this.attributes=a,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(a){this.fragmentShader=a,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(a){this.vertexShader=a,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(a,e=Or){}update(a,e,i){}setSize(a,e){}initialize(a,e,i){}dispose(){for(const a of Object.keys(this)){const e=this[a];(e instanceof Hn||e instanceof Hs||e instanceof An||e instanceof yi)&&this[a].dispose()}}},Wd={MEDIUM:2,LARGE:3},J1=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,j1="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",$1=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],e3=class extends ln{constructor(a=new $t){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new mt(null),texelSize:new mt(new $t),scale:new mt(1),kernel:new mt(0)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:J1,vertexShader:j1}),this.setTexelSize(a.x,a.y),this.kernelSize=Wd.MEDIUM}set inputBuffer(a){this.uniforms.inputBuffer.value=a}setInputBuffer(a){this.inputBuffer=a}get kernelSequence(){return $1[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(a){this.uniforms.scale.value=a}getScale(){return this.uniforms.scale.value}setScale(a){this.uniforms.scale.value=a}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(a){this.uniforms.kernel.value=a}setKernel(a){this.kernel=a}setTexelSize(a,e){this.uniforms.texelSize.value.set(a,e,a*.5,e*.5)}setSize(a,e){const i=1/a,s=1/e;this.uniforms.texelSize.value.set(i,s,i*.5,s*.5)}},t3=class extends yi{constructor({kernelSize:a=Wd.MEDIUM,resolutionScale:e=.5,width:i=Gi.AUTO_SIZE,height:s=Gi.AUTO_SIZE,resolutionX:l=i,resolutionY:c=s}={}){super("KawaseBlurPass"),this.renderTargetA=new Hn(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const h=this.resolution=new Gi(this,l,c,e);h.addEventListener("change",d=>this.setSize(h.baseWidth,h.baseHeight)),this._blurMaterial=new e3,this._blurMaterial.kernelSize=a,this.copyMaterial=new Sx}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(a){this._blurMaterial=a}get dithering(){return this.copyMaterial.dithering}set dithering(a){this.copyMaterial.dithering=a}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(a){this.blurMaterial.kernelSize=a}get width(){return this.resolution.width}set width(a){this.resolution.preferredWidth=a}get height(){return this.resolution.height}set height(a){this.resolution.preferredHeight=a}get scale(){return this.blurMaterial.scale}set scale(a){this.blurMaterial.scale=a}getScale(){return this.blurMaterial.scale}setScale(a){this.blurMaterial.scale=a}getKernelSize(){return this.kernelSize}setKernelSize(a){this.kernelSize=a}getResolutionScale(){return this.resolution.scale}setResolutionScale(a){this.resolution.scale=a}render(a,e,i,s,l){const c=this.scene,h=this.camera,d=this.renderTargetA,m=this.renderTargetB,p=this.blurMaterial,v=p.kernelSequence;let g=e;this.fullscreenMaterial=p;for(let A=0,S=v.length;A<S;++A){const E=(A&1)===0?d:m;p.kernel=v[A],p.inputBuffer=g.texture,a.setRenderTarget(E),a.render(c,h),g=E}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=g.texture,a.setRenderTarget(this.renderToScreen?null:i),a.render(c,h)}setSize(a,e){const i=this.resolution;i.setBaseSize(a,e);const s=i.width,l=i.height;this.renderTargetA.setSize(s,l),this.renderTargetB.setSize(s,l),this.blurMaterial.setSize(a,e)}initialize(a,e,i){i!==void 0&&(this.renderTargetA.texture.type=i,this.renderTargetB.texture.type=i,i!==Nn?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):a!==null&&a.outputColorSpace===Yt&&(this.renderTargetA.texture.colorSpace=Yt,this.renderTargetB.texture.colorSpace=Yt))}static get AUTO_SIZE(){return Gi.AUTO_SIZE}},n3=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,i3=class extends ln{constructor(a=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:zs.replace(/\D+/g,"")},uniforms:{inputBuffer:new mt(null),threshold:new mt(0),smoothing:new mt(1),range:new mt(null)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:n3,vertexShader:_x}),this.colorOutput=a,this.luminanceRange=e}set inputBuffer(a){this.uniforms.inputBuffer.value=a}setInputBuffer(a){this.uniforms.inputBuffer.value=a}get threshold(){return this.uniforms.threshold.value}set threshold(a){this.smoothing>0||a>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=a}getThreshold(){return this.threshold}setThreshold(a){this.threshold=a}get smoothing(){return this.uniforms.smoothing.value}set smoothing(a){this.threshold>0||a>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=a}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(a){this.smoothing=a}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(a){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(a){a?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(a){return this.colorOutput}setColorOutputEnabled(a){this.colorOutput=a}get useRange(){return this.luminanceRange!==null}set useRange(a){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(a){a!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=a,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(a){this.luminanceRange=a}},a3=class extends yi{constructor({renderTarget:a,luminanceRange:e,colorOutput:i,resolutionScale:s=1,width:l=Gi.AUTO_SIZE,height:c=Gi.AUTO_SIZE,resolutionX:h=l,resolutionY:d=c}={}){super("LuminancePass"),this.fullscreenMaterial=new i3(i,e),this.needsSwap=!1,this.renderTarget=a,this.renderTarget===void 0&&(this.renderTarget=new Hn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const m=this.resolution=new Gi(this,h,d,s);m.addEventListener("change",p=>this.setSize(m.baseWidth,m.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(a,e,i,s,l){const c=this.fullscreenMaterial;c.inputBuffer=e.texture,a.setRenderTarget(this.renderToScreen?null:this.renderTarget),a.render(this.scene,this.camera)}setSize(a,e){const i=this.resolution;i.setBaseSize(a,e),this.renderTarget.setSize(i.width,i.height)}initialize(a,e,i){i!==void 0&&i!==Nn&&(this.renderTarget.texture.type=i,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},r3=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,s3="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",o3=class extends ln{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new mt(null),texelSize:new mt(new Oe)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:r3,vertexShader:s3})}set inputBuffer(a){this.uniforms.inputBuffer.value=a}setSize(a,e){this.uniforms.texelSize.value.set(1/a,1/e)}},l3=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,c3="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",u3=class extends ln{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new mt(null),supportBuffer:new mt(null),texelSize:new mt(new Oe),radius:new mt(.85)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:l3,vertexShader:c3})}set inputBuffer(a){this.uniforms.inputBuffer.value=a}set supportBuffer(a){this.uniforms.supportBuffer.value=a}get radius(){return this.uniforms.radius.value}set radius(a){this.uniforms.radius.value=a}setSize(a,e){this.uniforms.texelSize.value.set(1/a,1/e)}},f3=class extends yi{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new Hn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new o3,this.upsamplingMaterial=new u3,this.resolution=new Oe}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(a){if(this.levels!==a){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let i=0;i<a;++i){const s=e.clone();s.texture.name="Downsampling.Mipmap"+i,this.downsamplingMipmaps.push(s)}this.upsamplingMipmaps.push(e);for(let i=1,s=a-1;i<s;++i){const l=e.clone();l.texture.name="Upsampling.Mipmap"+i,this.upsamplingMipmaps.push(l)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(a){this.upsamplingMaterial.radius=a}render(a,e,i,s,l){const{scene:c,camera:h}=this,{downsamplingMaterial:d,upsamplingMaterial:m}=this,{downsamplingMipmaps:p,upsamplingMipmaps:v}=this;let g=e;this.fullscreenMaterial=d;for(let A=0,S=p.length;A<S;++A){const E=p[A];d.setSize(g.width,g.height),d.inputBuffer=g.texture,a.setRenderTarget(E),a.render(c,h),g=E}this.fullscreenMaterial=m;for(let A=v.length-1;A>=0;--A){const S=v[A];m.setSize(g.width,g.height),m.inputBuffer=g.texture,m.supportBuffer=p[A].texture,a.setRenderTarget(S),a.render(c,h),g=S}}setSize(a,e){const i=this.resolution;i.set(a,e);let s=i.width,l=i.height;for(let c=0,h=this.downsamplingMipmaps.length;c<h;++c)s=Math.round(s*.5),l=Math.round(l*.5),this.downsamplingMipmaps[c].setSize(s,l),c<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[c].setSize(s,l)}initialize(a,e,i){if(i!==void 0){const s=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const l of s)l.texture.type=i;if(i!==Nn)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(a!==null&&a.outputColorSpace===Yt)for(const l of s)l.texture.colorSpace=Yt}}dispose(){super.dispose();for(const a of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))a.dispose()}},h3=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,max(inputColor.a,texel.a));}`,d3=class extends yx{constructor({blendFunction:a=Mt.SCREEN,luminanceThreshold:e=1,luminanceSmoothing:i=.03,mipmapBlur:s=!0,intensity:l=1,radius:c=.85,levels:h=8,kernelSize:d=Wd.LARGE,resolutionScale:m=.5,width:p=Gi.AUTO_SIZE,height:v=Gi.AUTO_SIZE,resolutionX:g=p,resolutionY:A=v}={}){super("BloomEffect",h3,{blendFunction:a,uniforms:new Map([["map",new mt(null)],["intensity",new mt(l)]])}),this.renderTarget=new Hn(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new t3({kernelSize:d}),this.luminancePass=new a3({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=i,this.mipmapBlurPass=new f3,this.mipmapBlurPass.enabled=s,this.mipmapBlurPass.radius=c,this.mipmapBlurPass.levels=h,this.uniforms.get("map").value=s?this.mipmapBlurPass.texture:this.renderTarget.texture;const S=this.resolution=new Gi(this,g,A,m);S.addEventListener("change",E=>this.setSize(S.baseWidth,S.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(a){this.resolution.preferredWidth=a}get height(){return this.resolution.height}set height(a){this.resolution.preferredHeight=a}get dithering(){return this.blurPass.dithering}set dithering(a){this.blurPass.dithering=a}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(a){this.blurPass.kernelSize=a}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(a){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(a){this.uniforms.get("intensity").value=a}getIntensity(){return this.intensity}setIntensity(a){this.intensity=a}getResolutionScale(){return this.resolution.scale}setResolutionScale(a){this.resolution.scale=a}update(a,e,i){const s=this.renderTarget,l=this.luminancePass;l.enabled?(l.render(a,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(a,l.renderTarget):this.blurPass.render(a,l.renderTarget,s)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(a,e):this.blurPass.render(a,e,s)}setSize(a,e){const i=this.resolution;i.setBaseSize(a,e),this.renderTarget.setSize(i.width,i.height),this.blurPass.resolution.copy(i),this.luminancePass.setSize(a,e),this.mipmapBlurPass.setSize(a,e)}initialize(a,e,i){this.blurPass.initialize(a,e,i),this.luminancePass.initialize(a,e,i),this.mipmapBlurPass.initialize(a,e,i),i!==void 0&&(this.renderTarget.texture.type=i,a!==null&&a.outputColorSpace===Yt&&(this.renderTarget.texture.colorSpace=Yt))}},Pv=class extends yi{constructor(a,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=a,this.input=e}setInput(a){this.input=a}render(a,e,i,s,l){const c=this.fullscreenMaterial.uniforms;e!==null&&c!==void 0&&c[this.input]!==void 0&&(c[this.input].value=e.texture),a.setRenderTarget(this.renderToScreen?null:i),a.render(this.scene,this.camera)}initialize(a,e,i){i!==void 0&&i!==Nn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},p3=class extends yi{constructor(a,e,i=null){super("RenderPass",a,e),this.needsSwap=!1,this.clearPass=new Yd,this.overrideMaterialManager=i===null?null:new Nv(i),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(a){this.scene=a}set mainCamera(a){this.camera=a}get renderToScreen(){return super.renderToScreen}set renderToScreen(a){super.renderToScreen=a,this.clearPass.renderToScreen=a}get overrideMaterial(){const a=this.overrideMaterialManager;return a!==null?a.material:null}set overrideMaterial(a){const e=this.overrideMaterialManager;a!==null?e!==null?e.setMaterial(a):this.overrideMaterialManager=new Nv(a):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(a){this.overrideMaterial=a}get clear(){return this.clearPass.enabled}set clear(a){this.clearPass.enabled=a}getSelection(){return this.selection}setSelection(a){this.selection=a}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(a){this.ignoreBackground=a}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(a){this.skipShadowMapUpdate=a}getClearPass(){return this.clearPass}render(a,e,i,s,l){const c=this.scene,h=this.camera,d=this.selection,m=h.layers.mask,p=c.background,v=a.shadowMap.autoUpdate,g=this.renderToScreen?null:e;d!==null&&h.layers.set(d.getLayer()),this.skipShadowMapUpdate&&(a.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(c.background=null),this.clearPass.enabled&&this.clearPass.render(a,e),a.setRenderTarget(g),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(a,c,h):a.render(c,h),h.layers.mask=m,c.background=p,a.shadowMap.autoUpdate=v}},Mx={COLOR:2},m3={DISABLED:0},Ds={LOW:0,MEDIUM:1,HIGH:2,ULTRA:3},g3=`varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
#if EDGE_DETECTION_MODE == 1
#include <common>
#endif
#if EDGE_DETECTION_MODE == 0 || PREDICATION_MODE == 1
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}vec3 gatherNeighbors(){float p=readDepth(vUv);float pLeft=readDepth(vUv0);float pTop=readDepth(vUv1);return vec3(p,pLeft,pTop);}
#elif PREDICATION_MODE == 2
uniform sampler2D predicationBuffer;vec3 gatherNeighbors(){float p=texture2D(predicationBuffer,vUv).r;float pLeft=texture2D(predicationBuffer,vUv0).r;float pTop=texture2D(predicationBuffer,vUv1).r;return vec3(p,pLeft,pTop);}
#endif
#if PREDICATION_MODE != 0
vec2 calculatePredicatedThreshold(){vec3 neighbours=gatherNeighbors();vec2 delta=abs(neighbours.xx-neighbours.yz);vec2 edges=step(PREDICATION_THRESHOLD,delta);return PREDICATION_SCALE*EDGE_THRESHOLD*(1.0-PREDICATION_STRENGTH*edges);}
#endif
#if EDGE_DETECTION_MODE != 0
uniform sampler2D inputBuffer;
#endif
void main(){
#if EDGE_DETECTION_MODE == 0
const vec2 threshold=vec2(DEPTH_THRESHOLD);
#elif PREDICATION_MODE != 0
vec2 threshold=calculatePredicatedThreshold();
#else
const vec2 threshold=vec2(EDGE_THRESHOLD);
#endif
#if EDGE_DETECTION_MODE == 0
vec3 neighbors=gatherNeighbors();vec2 delta=abs(neighbors.xx-vec2(neighbors.y,neighbors.z));vec2 edges=step(threshold,delta);if(dot(edges,vec2(1.0))==0.0){discard;}gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 1
float l=luminance(texture2D(inputBuffer,vUv).rgb);float lLeft=luminance(texture2D(inputBuffer,vUv0).rgb);float lTop=luminance(texture2D(inputBuffer,vUv1).rgb);vec4 delta;delta.xy=abs(l-vec2(lLeft,lTop));vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}float lRight=luminance(texture2D(inputBuffer,vUv2).rgb);float lBottom=luminance(texture2D(inputBuffer,vUv3).rgb);delta.zw=abs(l-vec2(lRight,lBottom));vec2 maxDelta=max(delta.xy,delta.zw);float lLeftLeft=luminance(texture2D(inputBuffer,vUv4).rgb);float lTopTop=luminance(texture2D(inputBuffer,vUv5).rgb);delta.zw=abs(vec2(lLeft,lTop)-vec2(lLeftLeft,lTopTop));maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges.xy*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 2
vec4 delta;vec3 c=texture2D(inputBuffer,vUv).rgb;vec3 cLeft=texture2D(inputBuffer,vUv0).rgb;vec3 t=abs(c-cLeft);delta.x=max(max(t.r,t.g),t.b);vec3 cTop=texture2D(inputBuffer,vUv1).rgb;t=abs(c-cTop);delta.y=max(max(t.r,t.g),t.b);vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}vec3 cRight=texture2D(inputBuffer,vUv2).rgb;t=abs(c-cRight);delta.z=max(max(t.r,t.g),t.b);vec3 cBottom=texture2D(inputBuffer,vUv3).rgb;t=abs(c-cBottom);delta.w=max(max(t.r,t.g),t.b);vec2 maxDelta=max(delta.xy,delta.zw);vec3 cLeftLeft=texture2D(inputBuffer,vUv4).rgb;t=abs(c-cLeftLeft);delta.z=max(max(t.r,t.g),t.b);vec3 cTopTop=texture2D(inputBuffer,vUv5).rgb;t=abs(c-cTopTop);delta.w=max(max(t.r,t.g),t.b);maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#endif
}`,v3=`uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,0.0);vUv1=vUv+texelSize*vec2(0.0,-1.0);
#if EDGE_DETECTION_MODE != 0
vUv2=vUv+texelSize*vec2(1.0,0.0);vUv3=vUv+texelSize*vec2(0.0,1.0);vUv4=vUv+texelSize*vec2(-2.0,0.0);vUv5=vUv+texelSize*vec2(0.0,-2.0);
#endif
gl_Position=vec4(position.xy,1.0,1.0);}`,x3=class extends ln{constructor(a=new Oe,e=Mx.COLOR){super({name:"EdgeDetectionMaterial",defines:{THREE_REVISION:zs.replace(/\D+/g,""),LOCAL_CONTRAST_ADAPTATION_FACTOR:"2.0",EDGE_THRESHOLD:"0.1",DEPTH_THRESHOLD:"0.01",PREDICATION_MODE:"0",PREDICATION_THRESHOLD:"0.01",PREDICATION_SCALE:"2.0",PREDICATION_STRENGTH:"1.0",DEPTH_PACKING:"0"},uniforms:{inputBuffer:new mt(null),depthBuffer:new mt(null),predicationBuffer:new mt(null),texelSize:new mt(a)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:g3,vertexShader:v3}),this.edgeDetectionMode=e}set depthBuffer(a){this.uniforms.depthBuffer.value=a}set depthPacking(a){this.defines.DEPTH_PACKING=a.toFixed(0),this.needsUpdate=!0}setDepthBuffer(a,e=Or){this.depthBuffer=a,this.depthPacking=e}get edgeDetectionMode(){return Number(this.defines.EDGE_DETECTION_MODE)}set edgeDetectionMode(a){this.defines.EDGE_DETECTION_MODE=a.toFixed(0),this.needsUpdate=!0}getEdgeDetectionMode(){return this.edgeDetectionMode}setEdgeDetectionMode(a){this.edgeDetectionMode=a}get localContrastAdaptationFactor(){return Number(this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR)}set localContrastAdaptationFactor(a){this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR=a.toFixed("6"),this.needsUpdate=!0}getLocalContrastAdaptationFactor(){return this.localContrastAdaptationFactor}setLocalContrastAdaptationFactor(a){this.localContrastAdaptationFactor=a}get edgeDetectionThreshold(){return Number(this.defines.EDGE_THRESHOLD)}set edgeDetectionThreshold(a){this.defines.EDGE_THRESHOLD=a.toFixed("6"),this.defines.DEPTH_THRESHOLD=(a*.1).toFixed("6"),this.needsUpdate=!0}getEdgeDetectionThreshold(){return this.edgeDetectionThreshold}setEdgeDetectionThreshold(a){this.edgeDetectionThreshold=a}get predicationMode(){return Number(this.defines.PREDICATION_MODE)}set predicationMode(a){this.defines.PREDICATION_MODE=a.toFixed(0),this.needsUpdate=!0}getPredicationMode(){return this.predicationMode}setPredicationMode(a){this.predicationMode=a}set predicationBuffer(a){this.uniforms.predicationBuffer.value=a}setPredicationBuffer(a){this.uniforms.predicationBuffer.value=a}get predicationThreshold(){return Number(this.defines.PREDICATION_THRESHOLD)}set predicationThreshold(a){this.defines.PREDICATION_THRESHOLD=a.toFixed("6"),this.needsUpdate=!0}getPredicationThreshold(){return this.predicationThreshold}setPredicationThreshold(a){this.predicationThreshold=a}get predicationScale(){return Number(this.defines.PREDICATION_SCALE)}set predicationScale(a){this.defines.PREDICATION_SCALE=a.toFixed("6"),this.needsUpdate=!0}getPredicationScale(){return this.predicationScale}setPredicationScale(a){this.predicationScale=a}get predicationStrength(){return Number(this.defines.PREDICATION_STRENGTH)}set predicationStrength(a){this.defines.PREDICATION_STRENGTH=a.toFixed("6"),this.needsUpdate=!0}getPredicationStrength(){return this.predicationStrength}setPredicationStrength(a){this.predicationStrength=a}setSize(a,e){this.uniforms.texelSize.value.set(1/a,1/e)}},A3=`#define sampleLevelZeroOffset(t, coord, offset) texture2D(t, coord + offset * texelSize)
#if __VERSION__ < 300
#define round(v) floor(v + 0.5)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform lowp sampler2D areaTexture;uniform lowp sampler2D searchTexture;uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}vec2 decodeDiagBilinearAccess(in vec2 e){e.r=e.r*abs(5.0*e.r-5.0*0.75);return round(e);}vec4 decodeDiagBilinearAccess(in vec4 e){e.rb=e.rb*abs(5.0*e.rb-5.0*0.75);return round(e);}vec2 searchDiag1(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 searchDiag2(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);coord.x+=0.25*texelSize.x;vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;e=decodeDiagBilinearAccess(e);coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 areaDiag(const in vec2 dist,const in vec2 e,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE_DIAG,AREATEX_MAX_DISTANCE_DIAG)*e+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.x+=0.5;texCoord.y+=AREATEX_SUBTEX_SIZE*offset;return texture2D(areaTexture,texCoord).rg;}vec2 calculateDiagWeights(const in vec2 texCoord,const in vec2 e,const in vec4 subsampleIndices){vec2 weights=vec2(0.0);vec4 d;vec2 end;if(e.r>0.0){d.xz=searchDiag1(texCoord,vec2(-1.0,1.0),end);d.x+=float(end.y>0.9);}else{d.xz=vec2(0.0);}d.yw=searchDiag1(texCoord,vec2(1.0,-1.0),end);if(d.x+d.y>2.0){vec4 coords=vec4(-d.x+0.25,d.x,d.y,-d.y-0.25)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.xy=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).rg;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).rg;c.yxwz=decodeDiagBilinearAccess(c.xyzw);vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.z);}d.xz=searchDiag2(texCoord,vec2(-1.0,-1.0),end);if(sampleLevelZeroOffset(inputBuffer,texCoord,vec2(1,0)).r>0.0){d.yw=searchDiag2(texCoord,vec2(1.0),end);d.y+=float(end.y>0.9);}else{d.yw=vec2(0.0);}if(d.x+d.y>2.0){vec4 coords=vec4(-d.x,-d.x,d.y,d.y)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.x=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).g;c.y=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(0,-1)).r;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).gr;vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.w).gr;}return weights;}float searchLength(const in vec2 e,const in float offset){vec2 scale=SEARCHTEX_SIZE*vec2(0.5,-1.0);vec2 bias=SEARCHTEX_SIZE*vec2(offset,1.0);scale+=vec2(-1.0,1.0);bias+=vec2(0.5,-0.5);scale*=1.0/SEARCHTEX_PACKED_SIZE;bias*=1.0/SEARCHTEX_PACKED_SIZE;return texture2D(searchTexture,scale*e+bias).r;}float searchXLeft(in vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x>end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(-2.0,0.0)*texelSize+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.0)+3.25;return texelSize.x*offset+texCoord.x;}float searchXRight(vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x<end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(2.0,0.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.5)+3.25;return-texelSize.x*offset+texCoord.x;}float searchYUp(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.y>end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=-vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.0)+3.25;return texelSize.y*offset+texCoord.y;}float searchYDown(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;i++){if(!(texCoord.y<end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.5)+3.25;return-texelSize.y*offset+texCoord.y;}vec2 area(const in vec2 dist,const in float e1,const in float e2,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE)*round(4.0*vec2(e1,e2))+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.y=AREATEX_SUBTEX_SIZE*offset+texCoord.y;return texture2D(areaTexture,texCoord).rg;}void detectHorizontalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,1)).r;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).r;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,-2)).r;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,-2)).r;weights*=clamp(factor,0.0,1.0);
#endif
}void detectVerticalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(1,0)).g;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).g;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(-2,0)).g;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(-2,1)).g;weights*=clamp(factor,0.0,1.0);
#endif
}void main(){vec4 weights=vec4(0.0);vec4 subsampleIndices=vec4(0.0);vec2 e=texture2D(inputBuffer,vUv).rg;if(e.g>0.0){
#if !defined(DISABLE_DIAG_DETECTION)
weights.rg=calculateDiagWeights(vUv,e,subsampleIndices);if(weights.r==-weights.g){
#endif
vec2 d;vec3 coords;coords.x=searchXLeft(vOffset[0].xy,vOffset[2].x);coords.y=vOffset[1].y;d.x=coords.x;float e1=texture2D(inputBuffer,coords.xy).r;coords.z=searchXRight(vOffset[0].zw,vOffset[2].y);d.y=coords.z;d=round(resolution.xx*d+-vPixCoord.xx);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.zy,vec2(1,0)).r;weights.rg=area(sqrtD,e1,e2,subsampleIndices.y);coords.y=vUv.y;detectHorizontalCornerPattern(weights.rg,coords.xyzy,d);
#if !defined(DISABLE_DIAG_DETECTION)
}else{e.r=0.0;}
#endif
}if(e.r>0.0){vec2 d;vec3 coords;coords.y=searchYUp(vOffset[1].xy,vOffset[2].z);coords.x=vOffset[0].x;d.x=coords.y;float e1=texture2D(inputBuffer,coords.xy).g;coords.z=searchYDown(vOffset[1].zw,vOffset[2].w);d.y=coords.z;d=round(resolution.yy*d-vPixCoord.yy);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.xz,vec2(0,1)).g;weights.ba=area(sqrtD,e1,e2,subsampleIndices.x);coords.x=vUv.x;detectVerticalCornerPattern(weights.ba,coords.xyxz,d);}gl_FragColor=weights;}`,_3="uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void main(){vUv=position.xy*0.5+0.5;vPixCoord=vUv*resolution;vOffset[0]=vUv.xyxy+texelSize.xyxy*vec4(-0.25,-0.125,1.25,-0.125);vOffset[1]=vUv.xyxy+texelSize.xyxy*vec4(-0.125,-0.25,-0.125,1.25);vOffset[2]=vec4(vOffset[0].xz,vOffset[1].yw)+vec4(-2.0,2.0,-2.0,2.0)*texelSize.xxyy*MAX_SEARCH_STEPS_FLOAT;gl_Position=vec4(position.xy,1.0,1.0);}",S3=class extends ln{constructor(a=new Oe,e=new Oe){super({name:"SMAAWeightsMaterial",defines:{MAX_SEARCH_STEPS_INT:"16",MAX_SEARCH_STEPS_FLOAT:"16.0",MAX_SEARCH_STEPS_DIAG_INT:"8",MAX_SEARCH_STEPS_DIAG_FLOAT:"8.0",CORNER_ROUNDING:"25",CORNER_ROUNDING_NORM:"0.25",AREATEX_MAX_DISTANCE:"16.0",AREATEX_MAX_DISTANCE_DIAG:"20.0",AREATEX_PIXEL_SIZE:"(1.0 / vec2(160.0, 560.0))",AREATEX_SUBTEX_SIZE:"(1.0 / 7.0)",SEARCHTEX_SIZE:"vec2(66.0, 33.0)",SEARCHTEX_PACKED_SIZE:"vec2(64.0, 16.0)"},uniforms:{inputBuffer:new mt(null),searchTexture:new mt(null),areaTexture:new mt(null),resolution:new mt(e),texelSize:new mt(a)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:A3,vertexShader:_3})}set inputBuffer(a){this.uniforms.inputBuffer.value=a}setInputBuffer(a){this.uniforms.inputBuffer.value=a}get searchTexture(){return this.uniforms.searchTexture.value}set searchTexture(a){this.uniforms.searchTexture.value=a}get areaTexture(){return this.uniforms.areaTexture.value}set areaTexture(a){this.uniforms.areaTexture.value=a}setLookupTextures(a,e){this.searchTexture=a,this.areaTexture=e}get orthogonalSearchSteps(){return Number(this.defines.MAX_SEARCH_STEPS_INT)}set orthogonalSearchSteps(a){const e=Math.min(Math.max(a,0),112);this.defines.MAX_SEARCH_STEPS_INT=e.toFixed("0"),this.defines.MAX_SEARCH_STEPS_FLOAT=e.toFixed("1"),this.needsUpdate=!0}setOrthogonalSearchSteps(a){this.orthogonalSearchSteps=a}get diagonalSearchSteps(){return Number(this.defines.MAX_SEARCH_STEPS_DIAG_INT)}set diagonalSearchSteps(a){const e=Math.min(Math.max(a,0),20);this.defines.MAX_SEARCH_STEPS_DIAG_INT=e.toFixed("0"),this.defines.MAX_SEARCH_STEPS_DIAG_FLOAT=e.toFixed("1"),this.needsUpdate=!0}setDiagonalSearchSteps(a){this.diagonalSearchSteps=a}get diagonalDetection(){return this.defines.DISABLE_DIAG_DETECTION===void 0}set diagonalDetection(a){a?delete this.defines.DISABLE_DIAG_DETECTION:this.defines.DISABLE_DIAG_DETECTION="1",this.needsUpdate=!0}isDiagonalDetectionEnabled(){return this.diagonalDetection}setDiagonalDetectionEnabled(a){this.diagonalDetection=a}get cornerRounding(){return Number(this.defines.CORNER_ROUNDING)}set cornerRounding(a){const e=Math.min(Math.max(a,0),100);this.defines.CORNER_ROUNDING=e.toFixed("4"),this.defines.CORNER_ROUNDING_NORM=(e/100).toFixed("4"),this.needsUpdate=!0}setCornerRounding(a){this.cornerRounding=a}get cornerDetection(){return this.defines.DISABLE_CORNER_DETECTION===void 0}set cornerDetection(a){a?delete this.defines.DISABLE_CORNER_DETECTION:this.defines.DISABLE_CORNER_DETECTION="1",this.needsUpdate=!0}isCornerRoundingEnabled(){return this.cornerDetection}setCornerRoundingEnabled(a){this.cornerDetection=a}setSize(a,e){const i=this.uniforms;i.texelSize.value.set(1/a,1/e),i.resolution.value.set(a,e)}},Iv="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAeElEQVRYR+2XSwqAMAxEJ168ePEqwRSKhIIiuHjJqiU0gWE+1CQdApcVAMUAuARaMGCX1MIL/Ow13++9lW2s3mW9MWvsnWc/2fvGygwPAN4E8QzAA4CXAB6AHjG4JTHYI1ey3pcx6FHnEfhLDOIBKAmUBK6/ANUDTlROXAHd9EC1AAAAAElFTkSuQmCC",zv="data:image/png;base64,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",y3="uniform sampler2D weightMap;varying vec2 vOffset0;varying vec2 vOffset1;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 a;a.x=texture2D(weightMap,vOffset0).a;a.y=texture2D(weightMap,vOffset1).g;a.wz=texture2D(weightMap,uv).rb;vec4 color=inputColor;if(dot(a,vec4(1.0))>=1e-5){bool h=max(a.x,a.z)>max(a.y,a.w);vec4 blendingOffset=vec4(0.0,a.y,0.0,a.w);vec2 blendingWeight=a.yw;movec(bvec4(h),blendingOffset,vec4(a.x,0.0,a.z,0.0));movec(bvec2(h),blendingWeight,a.xz);blendingWeight/=dot(blendingWeight,vec2(1.0));vec4 blendingCoord=blendingOffset*vec4(texelSize,-texelSize)+uv.xyxy;color=blendingWeight.x*texture2D(inputBuffer,blendingCoord.xy);color+=blendingWeight.y*texture2D(inputBuffer,blendingCoord.zw);}outputColor=color;}",M3="varying vec2 vOffset0;varying vec2 vOffset1;void mainSupport(const in vec2 uv){vOffset0=uv+texelSize*vec2(1.0,0.0);vOffset1=uv+texelSize*vec2(0.0,1.0);}",ko=class extends yx{constructor({blendFunction:a=Mt.SRC,preset:e=Ds.MEDIUM,edgeDetectionMode:i=Mx.COLOR,predicationMode:s=m3.DISABLED}={}){super("SMAAEffect",y3,{vertexShader:M3,blendFunction:a,attributes:Aa.CONVOLUTION|Aa.DEPTH,uniforms:new Map([["weightMap",new mt(null)]])});let l,c;arguments.length>1&&(l=arguments[0],c=arguments[1],arguments.length>2&&(e=arguments[2]),arguments.length>3&&(i=arguments[3])),this.renderTargetEdges=new Hn(1,1,{depthBuffer:!1}),this.renderTargetEdges.texture.name="SMAA.Edges",this.renderTargetWeights=this.renderTargetEdges.clone(),this.renderTargetWeights.texture.name="SMAA.Weights",this.uniforms.get("weightMap").value=this.renderTargetWeights.texture,this.clearPass=new Yd(!0,!1,!1),this.clearPass.overrideClearColor=new vt(0),this.clearPass.overrideClearAlpha=1,this.edgeDetectionPass=new Pv(new x3),this.edgeDetectionMaterial.edgeDetectionMode=i,this.edgeDetectionMaterial.predicationMode=s,this.weightsPass=new Pv(new S3);const h=new dx;h.onLoad=()=>{const d=new An(l);d.name="SMAA.Search",d.magFilter=Xn,d.minFilter=Xn,d.generateMipmaps=!1,d.needsUpdate=!0,d.flipY=!0,this.weightsMaterial.searchTexture=d;const m=new An(c);m.name="SMAA.Area",m.magFilter=Dn,m.minFilter=Dn,m.generateMipmaps=!1,m.needsUpdate=!0,m.flipY=!1,this.weightsMaterial.areaTexture=m,this.dispatchEvent({type:"load"})},h.itemStart("search"),h.itemStart("area"),l!==void 0&&c!==void 0?(h.itemEnd("search"),h.itemEnd("area")):typeof Image<"u"&&(l=new Image,c=new Image,l.addEventListener("load",()=>h.itemEnd("search")),c.addEventListener("load",()=>h.itemEnd("area")),l.src=Iv,c.src=zv),this.applyPreset(e)}get edgesTexture(){return this.renderTargetEdges.texture}getEdgesTexture(){return this.edgesTexture}get weightsTexture(){return this.renderTargetWeights.texture}getWeightsTexture(){return this.weightsTexture}get edgeDetectionMaterial(){return this.edgeDetectionPass.fullscreenMaterial}get colorEdgesMaterial(){return this.edgeDetectionMaterial}getEdgeDetectionMaterial(){return this.edgeDetectionMaterial}get weightsMaterial(){return this.weightsPass.fullscreenMaterial}getWeightsMaterial(){return this.weightsMaterial}setEdgeDetectionThreshold(a){this.edgeDetectionMaterial.edgeDetectionThreshold=a}setOrthogonalSearchSteps(a){this.weightsMaterial.orthogonalSearchSteps=a}applyPreset(a){const e=this.edgeDetectionMaterial,i=this.weightsMaterial;switch(a){case Ds.LOW:e.edgeDetectionThreshold=.15,i.orthogonalSearchSteps=4,i.diagonalDetection=!1,i.cornerDetection=!1;break;case Ds.MEDIUM:e.edgeDetectionThreshold=.1,i.orthogonalSearchSteps=8,i.diagonalDetection=!1,i.cornerDetection=!1;break;case Ds.HIGH:e.edgeDetectionThreshold=.1,i.orthogonalSearchSteps=16,i.diagonalSearchSteps=8,i.cornerRounding=25,i.diagonalDetection=!0,i.cornerDetection=!0;break;case Ds.ULTRA:e.edgeDetectionThreshold=.05,i.orthogonalSearchSteps=32,i.diagonalSearchSteps=16,i.cornerRounding=25,i.diagonalDetection=!0,i.cornerDetection=!0;break}}setDepthTexture(a,e=Or){this.edgeDetectionMaterial.depthBuffer=a,this.edgeDetectionMaterial.depthPacking=e}update(a,e,i){this.clearPass.render(a,this.renderTargetEdges),this.edgeDetectionPass.render(a,e,this.renderTargetEdges),this.weightsPass.render(a,this.renderTargetEdges,this.renderTargetWeights)}setSize(a,e){this.edgeDetectionMaterial.setSize(a,e),this.weightsMaterial.setSize(a,e),this.renderTargetEdges.setSize(a,e),this.renderTargetWeights.setSize(a,e)}dispose(){const{searchTexture:a,areaTexture:e}=this.weightsMaterial;a!==null&&e!==null&&(a.dispose(),e.dispose()),super.dispose()}static get searchImageDataURL(){return Iv}static get areaImageDataURL(){return zv}},E3=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,b3="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",T3=class extends ln{constructor(a,e,i,s,l=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:zs.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new mt(null),depthBuffer:new mt(null),resolution:new mt(new Oe),texelSize:new mt(new Oe),cameraNear:new mt(.3),cameraFar:new mt(1e3),aspect:new mt(1),time:new mt(0)},blending:On,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:l}),a&&this.setShaderParts(a),e&&this.setDefines(e),i&&this.setUniforms(i),this.copyCameraSettings(s)}set inputBuffer(a){this.uniforms.inputBuffer.value=a}setInputBuffer(a){this.uniforms.inputBuffer.value=a}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(a){this.uniforms.depthBuffer.value=a}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(a){this.defines.DEPTH_PACKING=a.toFixed(0),this.needsUpdate=!0}setDepthBuffer(a,e=Or){this.depthBuffer=a,this.depthPacking=e}setShaderData(a){this.setShaderParts(a.shaderParts),this.setDefines(a.defines),this.setUniforms(a.uniforms),this.setExtensions(a.extensions)}setShaderParts(a){return this.fragmentShader=E3.replace(Ot.FRAGMENT_HEAD,a.get(Ot.FRAGMENT_HEAD)||"").replace(Ot.FRAGMENT_MAIN_UV,a.get(Ot.FRAGMENT_MAIN_UV)||"").replace(Ot.FRAGMENT_MAIN_IMAGE,a.get(Ot.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=b3.replace(Ot.VERTEX_HEAD,a.get(Ot.VERTEX_HEAD)||"").replace(Ot.VERTEX_MAIN_SUPPORT,a.get(Ot.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(a){for(const e of a.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(a){for(const e of a.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(a){this.extensions={};for(const e of a)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(a){this.encodeOutput!==a&&(a?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(a){return this.encodeOutput}setOutputEncodingEnabled(a){this.encodeOutput=a}get time(){return this.uniforms.time.value}set time(a){this.uniforms.time.value=a}setDeltaTime(a){this.uniforms.time.value+=a}adoptCameraSettings(a){this.copyCameraSettings(a)}copyCameraSettings(a){a&&(this.uniforms.cameraNear.value=a.near,this.uniforms.cameraFar.value=a.far,a instanceof ci?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(a,e){const i=this.uniforms;i.resolution.value.set(a,e),i.texelSize.value.set(1/a,1/e),i.aspect.value=a/e}static get Section(){return Ot}};function Fv(a,e,i){for(const s of e){const l="$1"+a+s.charAt(0).toUpperCase()+s.slice(1),c=new RegExp("([^\\.])(\\b"+s+"\\b)","g");for(const h of i.entries())h[1]!==null&&i.set(h[0],h[1].replace(c,l))}}function C3(a,e,i){let s=e.getFragmentShader(),l=e.getVertexShader();const c=s!==void 0&&/mainImage/.test(s),h=s!==void 0&&/mainUv/.test(s);if(i.attributes|=e.getAttributes(),s===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(h&&(i.attributes&Aa.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!c&&!h)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const d=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,m=i.shaderParts;let p=m.get(Ot.FRAGMENT_HEAD)||"",v=m.get(Ot.FRAGMENT_MAIN_UV)||"",g=m.get(Ot.FRAGMENT_MAIN_IMAGE)||"",A=m.get(Ot.VERTEX_HEAD)||"",S=m.get(Ot.VERTEX_MAIN_SUPPORT)||"";const E=new Set,C=new Set;if(h&&(v+=`	${a}MainUv(UV);
`,i.uvTransformation=!0),l!==null&&/mainSupport/.test(l)){const P=/mainSupport *\([\w\s]*?uv\s*?\)/.test(l);S+=`	${a}MainSupport(`,S+=P?`vUv);
`:`);
`;for(const U of l.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const I of U[1].split(/\s*,\s*/))i.varyings.add(I),E.add(I),C.add(I);for(const U of l.matchAll(d))C.add(U[1])}for(const P of s.matchAll(d))C.add(P[1]);for(const P of e.defines.keys())C.add(P.replace(/\([\w\s,]*\)/g,""));for(const P of e.uniforms.keys())C.add(P);C.delete("while"),C.delete("for"),C.delete("if"),e.uniforms.forEach((P,U)=>i.uniforms.set(a+U.charAt(0).toUpperCase()+U.slice(1),P)),e.defines.forEach((P,U)=>i.defines.set(a+U.charAt(0).toUpperCase()+U.slice(1),P));const y=new Map([["fragment",s],["vertex",l]]);Fv(a,C,i.defines),Fv(a,C,y),s=y.get("fragment"),l=y.get("vertex");const _=e.blendMode;if(i.blendModes.set(_.blendFunction,_),c){e.inputColorSpace!==null&&e.inputColorSpace!==i.colorSpace&&(g+=e.inputColorSpace===Yt?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==Fi?i.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(i.colorSpace=e.inputColorSpace);const P=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;g+=`${a}MainImage(color0, UV, `,(i.attributes&Aa.DEPTH)!==0&&P.test(s)&&(g+="depth, ",i.readDepth=!0),g+=`color1);
	`;const U=a+"BlendOpacity";i.uniforms.set(U,_.opacity),g+=`color0 = blend${_.blendFunction}(color0, color1, ${U});

	`,p+=`uniform float ${U};

`}if(p+=s+`
`,l!==null&&(A+=l+`
`),m.set(Ot.FRAGMENT_HEAD,p),m.set(Ot.FRAGMENT_MAIN_UV,v),m.set(Ot.FRAGMENT_MAIN_IMAGE,g),m.set(Ot.VERTEX_HEAD,A),m.set(Ot.VERTEX_MAIN_SUPPORT,S),e.extensions!==null)for(const P of e.extensions)i.extensions.add(P)}}var Hv=class extends yi{constructor(a,...e){super("EffectPass"),this.fullscreenMaterial=new T3(null,null,null,a),this.listener=i=>this.handleEvent(i),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(a){for(const e of this.effects)e.mainScene=a}set mainCamera(a){this.fullscreenMaterial.copyCameraSettings(a);for(const e of this.effects)e.mainCamera=a}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(a){this.fullscreenMaterial.encodeOutput=a}get dithering(){return this.fullscreenMaterial.dithering}set dithering(a){const e=this.fullscreenMaterial;e.dithering=a,e.needsUpdate=!0}setEffects(a){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=a.sort((e,i)=>i.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const a=new v1;let e=0;for(const h of this.effects)if(h.blendMode.blendFunction===Mt.DST)a.attributes|=h.getAttributes()&Aa.DEPTH;else{if((a.attributes&h.getAttributes()&Aa.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${h.name})`);C3("e"+e++,h,a)}let i=a.shaderParts.get(Ot.FRAGMENT_HEAD),s=a.shaderParts.get(Ot.FRAGMENT_MAIN_IMAGE),l=a.shaderParts.get(Ot.FRAGMENT_MAIN_UV);const c=/\bblend\b/g;for(const h of a.blendModes.values())i+=h.getShaderCode().replace(c,`blend${h.blendFunction}`)+`
`;(a.attributes&Aa.DEPTH)!==0?(a.readDepth&&(s=`float depth = readDepth(UV);

	`+s),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,a.colorSpace===Yt&&(s+=`color0 = sRGBToLinear(color0);
	`),a.uvTransformation?(l=`vec2 transformedUv = vUv;
`+l,a.defines.set("UV","transformedUv")):a.defines.set("UV","vUv"),a.shaderParts.set(Ot.FRAGMENT_HEAD,i),a.shaderParts.set(Ot.FRAGMENT_MAIN_IMAGE,s),a.shaderParts.set(Ot.FRAGMENT_MAIN_UV,l);for(const[h,d]of a.shaderParts)d!==null&&a.shaderParts.set(h,d.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(a)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(a,e=Or){this.fullscreenMaterial.depthBuffer=a,this.fullscreenMaterial.depthPacking=e;for(const i of this.effects)i.setDepthTexture(a,e)}render(a,e,i,s,l){for(const c of this.effects)c.update(a,e,s);if(!this.skipRendering||this.renderToScreen){const c=this.fullscreenMaterial;c.inputBuffer=e.texture,c.time+=s*this.timeScale,a.setRenderTarget(this.renderToScreen?null:i),a.render(this.scene,this.camera)}}setSize(a,e){this.fullscreenMaterial.setSize(a,e);for(const i of this.effects)i.setSize(a,e)}initialize(a,e,i){this.renderer=a;for(const s of this.effects)s.initialize(a,e,i);this.updateMaterial(),i!==void 0&&i!==Nn&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const a of this.effects)a.removeEventListener("change",this.listener),a.dispose()}handleEvent(a){switch(a.type){case"change":this.recompile();break}}};const D3=({effectOptions:a={onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:10,islandWidth:2,lanesPerRoad:4,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.03,400*.2],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:16777215,brokenLines:16777215,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}}})=>{const e=Oc.useRef(null),i=Oc.useRef(null);return Oc.useEffect(()=>{if(i.current){i.current.dispose();const $=document.getElementById("lights");if($)for(;$.firstChild;)$.removeChild($.firstChild)}const s={uFreq:{value:new K(3,6,10)},uAmp:{value:new K(30,30,20)}},l={uFreq:{value:new Oe(5,2)},uAmp:{value:new Oe(25,15)}},c={uFreq:{value:new Oe(2,3)},uAmp:{value:new Oe(35,10)}},h={uFreq:{value:new $t(4,8,8,1)},uAmp:{value:new $t(25,5,10,10)}},d={uFreq:{value:new Oe(4,8)},uAmp:{value:new Oe(10,20)},uPowY:{value:new Oe(20,2)}};let m=$=>Math.sin($)*.5+.5;const p={mountainDistortion:{uniforms:s,getDistortion:`
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,getJS:($,N)=>{let D=.02,H=s.uFreq.value,z=s.uAmp.value,le=new K(Math.cos($*Math.PI*H.x+N)*z.x-Math.cos(D*Math.PI*H.x+N)*z.x,m($*Math.PI*H.y+N)*z.y-m(D*Math.PI*H.y+N)*z.y,m($*Math.PI*H.z+N)*z.z-m(D*Math.PI*H.z+N)*z.z),he=new K(2,2,2),L=new K(0,0,-5);return le.multiply(he).add(L)}},xyDistortion:{uniforms:l,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:($,N)=>{let D=.02,H=l.uFreq.value,z=l.uAmp.value,le=new K(Math.cos($*Math.PI*H.x+N)*z.x-Math.cos(D*Math.PI*H.x+N)*z.x,Math.sin($*Math.PI*H.y+N+Math.PI/2)*z.y-Math.sin(D*Math.PI*H.y+N+Math.PI/2)*z.y,0),he=new K(2,.4,1),L=new K(0,0,-3);return le.multiply(he).add(L)}},LongRaceDistortion:{uniforms:c,getDistortion:`
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float camProgress = 0.0125;
            return vec3( 
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
              0.
            );
          }
        `,getJS:($,N)=>{let D=.0125,H=c.uFreq.value,z=c.uAmp.value,le=new K(Math.sin($*Math.PI*H.x+N)*z.x-Math.sin(D*Math.PI*H.x+N)*z.x,Math.sin($*Math.PI*H.y+N)*z.y-Math.sin(D*Math.PI*H.y+N)*z.y,0),he=new K(1,1,0),L=new K(0,0,-5);return le.multiply(he).add(L)}},turbulentDistortion:{uniforms:h,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,getJS:($,N)=>{const D=h.uFreq.value,H=h.uAmp.value,z=pe=>Math.cos(Math.PI*pe*D.x+N)*H.x+Math.pow(Math.cos(Math.PI*pe*D.y+N*(D.y/D.x)),2)*H.y,le=pe=>-m(Math.PI*pe*D.z+N)*H.z-Math.pow(m(Math.PI*pe*D.w+N/(D.z/D.w)),5)*H.w;let he=new K(z($)-z($+.007),le($)-le($+.007),0),L=new K(-2,-5,0),j=new K(0,0,-10);return he.multiply(L).add(j)}},turbulentDistortionStill:{uniforms:h,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r) * uAmp.r +
              pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `},deepDistortionStill:{uniforms:d,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x) * uAmp.x * 2.
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.05),
              0.
            );
          }
        `},deepDistortion:{uniforms:d,getDistortion:`
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x + uTime) * uAmp.x
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `,getJS:($,N)=>{const D=d.uFreq.value,H=d.uAmp.value,z=d.uPowY.value,le=Se=>Math.sin(Se*Math.PI*D.x+N)*H.x,he=Se=>Math.pow(Se*z.x,z.y)+Math.sin(Se*Math.PI*D.y+N)*H.y;let L=new K(le($)-le($+.01),he($)-he($+.01),0),j=new K(-2,-4,0),pe=new K(0,0,-10);return L.multiply(j).add(pe)}}};class v{constructor(N,D={}){this.options=D,this.options.distortion==null&&(this.options.distortion={uniforms:g,getDistortion:A}),this.container=N,this.renderer=new l1({antialias:!1,alpha:!0}),this.renderer.setSize(N.offsetWidth,N.offsetHeight,!1),this.renderer.setPixelRatio(window.devicePixelRatio),this.composer=new g1(this.renderer),N.append(this.renderer.domElement),this.camera=new ci(D.fov,N.offsetWidth/N.offsetHeight,.1,1e4),this.camera.position.z=-5,this.camera.position.y=8,this.camera.position.x=0,this.scene=new Dd,this.scene.background=null;let H=new Gd(D.colors.background,D.length*.2,D.length*500);this.scene.fog=H,this.fogUniforms={fogColor:{value:H.color},fogNear:{value:H.near},fogFar:{value:H.far}},this.clock=new Sy,this.assets={},this.disposed=!1,this.road=new O(this,D),this.leftCarLights=new y(this,D,D.colors.leftCars,D.movingAwaySpeed,new Oe(0,1-D.carLightsFade)),this.rightCarLights=new y(this,D,D.colors.rightCars,D.movingCloserSpeed,new Oe(1,0+D.carLightsFade)),this.leftSticks=new U(this,D),this.fovTarget=D.fov,this.speedUpTarget=0,this.speedUp=0,this.timeOffset=0,this.tick=this.tick.bind(this),this.init=this.init.bind(this),this.setSize=this.setSize.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onContextMenu=this.onContextMenu.bind(this),window.addEventListener("resize",this.onWindowResize.bind(this))}onWindowResize(){const N=this.container.offsetWidth,D=this.container.offsetHeight;this.renderer.setSize(N,D),this.camera.aspect=N/D,this.camera.updateProjectionMatrix(),this.composer.setSize(N,D)}initPasses(){this.renderPass=new p3(this.scene,this.camera),this.bloomPass=new Hv(this.camera,new d3({luminanceThreshold:.2,luminanceSmoothing:0,resolutionScale:1}));const N=new Hv(this.camera,new ko({preset:Ds.MEDIUM,searchImage:ko.searchImageDataURL,areaImage:ko.areaImageDataURL}));this.renderPass.renderToScreen=!1,this.bloomPass.renderToScreen=!1,N.renderToScreen=!0,this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(N)}loadAssets(){const N=this.assets;return new Promise(D=>{const H=new dx(D),z=new Image,le=new Image;N.smaa={},z.addEventListener("load",function(){N.smaa.search=this,H.itemEnd("smaa-search")}),le.addEventListener("load",function(){N.smaa.area=this,H.itemEnd("smaa-area")}),H.itemStart("smaa-search"),H.itemStart("smaa-area"),z.src=ko.searchImageDataURL,le.src=ko.areaImageDataURL})}init(){this.initPasses();const N=this.options;this.road.init(),this.leftCarLights.init(),this.leftCarLights.mesh.position.setX(-N.roadWidth/2-N.islandWidth/2),this.rightCarLights.init(),this.rightCarLights.mesh.position.setX(N.roadWidth/2+N.islandWidth/2),this.leftSticks.init(),this.leftSticks.mesh.position.setX(-(N.roadWidth+N.islandWidth/2)),this.container.addEventListener("mousedown",this.onMouseDown),this.container.addEventListener("mouseup",this.onMouseUp),this.container.addEventListener("mouseout",this.onMouseUp),this.container.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchEnd,{passive:!0}),this.container.addEventListener("contextmenu",this.onContextMenu),this.tick()}onMouseDown(N){this.options.onSpeedUp&&this.options.onSpeedUp(N),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onMouseUp(N){this.options.onSlowDown&&this.options.onSlowDown(N),this.fovTarget=this.options.fov,this.speedUpTarget=0}onTouchStart(N){this.options.onSpeedUp&&this.options.onSpeedUp(N),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onTouchEnd(N){this.options.onSlowDown&&this.options.onSlowDown(N),this.fovTarget=this.options.fov,this.speedUpTarget=0}onContextMenu(N){N.preventDefault()}update(N){let D=Math.exp(-(-60*Math.log2(.9))*N);this.speedUp+=C(this.speedUp,this.speedUpTarget,D,1e-5),this.timeOffset+=this.speedUp*N;let H=this.clock.elapsedTime+this.timeOffset;this.rightCarLights.update(H),this.leftCarLights.update(H),this.leftSticks.update(H),this.road.update(H);let z=!1,le=C(this.camera.fov,this.fovTarget,D);if(le!==0&&(this.camera.fov+=le*N*6,z=!0),this.options.distortion.getJS){const he=this.options.distortion.getJS(.025,H);this.camera.lookAt(new K(this.camera.position.x+he.x,this.camera.position.y+he.y,this.camera.position.z+he.z)),z=!0}z&&this.camera.updateProjectionMatrix(),this.options.isHyper&&console.log(this.options.isHyper)}render(N){this.composer.render(N)}dispose(){this.disposed=!0,this.renderer&&this.renderer.dispose(),this.composer&&this.composer.dispose(),this.scene&&this.scene.clear(),window.removeEventListener("resize",this.onWindowResize.bind(this)),this.container&&(this.container.removeEventListener("mousedown",this.onMouseDown),this.container.removeEventListener("mouseup",this.onMouseUp),this.container.removeEventListener("mouseout",this.onMouseUp),this.container.removeEventListener("touchstart",this.onTouchStart),this.container.removeEventListener("touchend",this.onTouchEnd),this.container.removeEventListener("touchcancel",this.onTouchEnd),this.container.removeEventListener("contextmenu",this.onContextMenu))}setSize(N,D,H){this.composer.setSize(N,D,H)}tick(){if(this.disposed||!this)return;if(fe(this.renderer,this.setSize)){const D=this.renderer.domElement;this.camera.aspect=D.clientWidth/D.clientHeight,this.camera.updateProjectionMatrix()}const N=this.clock.getDelta();this.render(N),this.update(N),requestAnimationFrame(this.tick)}}const g={uDistortionX:{value:new Oe(80,3)},uDistortionY:{value:new Oe(-40,2.5)}},A=`
      #define PI 3.14159265358979
      uniform vec2 uDistortionX;
      uniform vec2 uDistortionY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        progress = clamp(progress, 0., 1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
          xAmp * nsin(progress * PI * xFreq - PI / 2.),
          yAmp * nsin(progress * PI * yFreq - PI / 2.),
          0.
        );
      }
    `,S=$=>Array.isArray($)?Math.random()*($[1]-$[0])+$[0]:Math.random()*$,E=$=>Array.isArray($)?$[Math.floor(Math.random()*$.length)]:$;function C($,N,D=.1,H=.001){let z=(N-$)*D;return Math.abs(z)<H&&(z=N-$),z}class y{constructor(N,D,H,z,le){this.webgl=N,this.options=D,this.colors=H,this.speed=z,this.fade=le}init(){const N=this.options;let D=new fx(new K(0,0,0),new K(0,0,-1)),H=new Xd(D,40,1,8,!1),z=new cv().copy(H);z.instanceCount=N.lightPairsPerRoadWay*2;let le=N.roadWidth/N.lanesPerRoad,he=[],L=[],j=[],pe=this.colors;Array.isArray(pe)?pe=pe.map(J=>new vt(J)):pe=new vt(pe);for(let J=0;J<N.lightPairsPerRoadWay;J++){let ue=S(N.carLightsRadius),Te=S(N.carLightsLength),Ne=S(this.speed),st=J%N.lanesPerRoad*le-N.roadWidth/2+le/2,en=S(N.carWidthPercentage)*le,ut=S(N.carShiftX)*le;st+=ut;let Et=S(N.carFloorSeparation)+ue*1.3,V=-S(N.length);he.push(st-en/2),he.push(Et),he.push(V),he.push(st+en/2),he.push(Et),he.push(V),L.push(ue),L.push(Te),L.push(Ne),L.push(ue),L.push(Te),L.push(Ne);let at=E(pe);j.push(at.r),j.push(at.g),j.push(at.b),j.push(at.r),j.push(at.g),j.push(at.b)}z.setAttribute("aOffset",new Ts(new Float32Array(he),3,!1)),z.setAttribute("aMetrics",new Ts(new Float32Array(L),3,!1)),z.setAttribute("aColor",new Ts(new Float32Array(j),3,!1));let Se=new ln({fragmentShader:_,vertexShader:P,transparent:!0,uniforms:Object.assign({uTime:{value:0},uTravelLength:{value:N.length},uFade:{value:this.fade}},this.webgl.fogUniforms,N.distortion.uniforms)});Se.onBeforeCompile=J=>{J.vertexShader=J.vertexShader.replace("#include <getDistortion_vertex>",N.distortion.getDistortion)};let Ue=new Si(z,Se);Ue.frustumCulled=!1,this.webgl.scene.add(Ue),this.mesh=Ue}update(N){this.mesh.material.uniforms.uTime.value=N}}const _=`
      #define USE_FOG;
      ${et.fog_pars_fragment}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${et.fog_fragment}
      }
    `,P=`
      #define USE_FOG;
      ${et.fog_pars_vertex}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${et.fog_vertex}
      }
    `;class U{constructor(N,D){this.webgl=N,this.options=D}init(){const N=this.options,D=new Is(1,1);let H=new cv().copy(D),z=N.totalSideLightSticks;H.instanceCount=z;let le=N.length/(z-1);const he=[],L=[],j=[];let pe=N.colors.sticks;Array.isArray(pe)?pe=pe.map(J=>new vt(J)):pe=new vt(pe);for(let J=0;J<z;J++){let ue=S(N.lightStickWidth),Te=S(N.lightStickHeight);he.push((J-1)*le*2+le*Math.random());let Ne=E(pe);L.push(Ne.r),L.push(Ne.g),L.push(Ne.b),j.push(ue),j.push(Te)}H.setAttribute("aOffset",new Ts(new Float32Array(he),1,!1)),H.setAttribute("aColor",new Ts(new Float32Array(L),3,!1)),H.setAttribute("aMetrics",new Ts(new Float32Array(j),2,!1));const Se=new ln({fragmentShader:Y,vertexShader:I,side:kn,uniforms:Object.assign({uTravelLength:{value:N.length},uTime:{value:0}},this.webgl.fogUniforms,N.distortion.uniforms)});Se.onBeforeCompile=J=>{J.vertexShader=J.vertexShader.replace("#include <getDistortion_vertex>",N.distortion.getDistortion)};const Ue=new Si(H,Se);Ue.frustumCulled=!1,this.webgl.scene.add(Ue),this.mesh=Ue}update(N){this.mesh.material.uniforms.uTime.value=N}}const I=`
      #define USE_FOG;
      ${et.fog_pars_vertex}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                     0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                0, 		0,				0,	1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;

        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

        transformed.z += - uTravelLength + time;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${et.fog_vertex}
      }
    `,Y=`
      #define USE_FOG;
      ${et.fog_pars_fragment}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${et.fog_fragment}
      }
    `;class O{constructor(N,D){this.webgl=N,this.options=D,this.uTime={value:0}}createPlane(N,D,H){const z=this.options;let le=100;const he=new Is(H?z.roadWidth:z.islandWidth,z.length,20,le);let L={uTravelLength:{value:z.length},uColor:{value:new vt(H?z.colors.roadColor:z.colors.islandColor)},uTime:this.uTime};H&&(L=Object.assign(L,{uLanes:{value:z.lanesPerRoad},uBrokenLinesColor:{value:new vt(z.colors.brokenLines)},uShoulderLinesColor:{value:new vt(z.colors.shoulderLines)},uShoulderLinesWidthPercentage:{value:z.shoulderLinesWidthPercentage},uBrokenLinesLengthPercentage:{value:z.brokenLinesLengthPercentage},uBrokenLinesWidthPercentage:{value:z.brokenLinesWidthPercentage}}));const j=new ln({fragmentShader:H?W:ie,vertexShader:re,side:kn,uniforms:Object.assign(L,this.webgl.fogUniforms,z.distortion.uniforms)});j.onBeforeCompile=Se=>{Se.vertexShader=Se.vertexShader.replace("#include <getDistortion_vertex>",z.distortion.getDistortion)};const pe=new Si(he,j);return pe.rotation.x=-Math.PI/2,pe.position.z=-z.length/2,pe.position.x+=(this.options.islandWidth/2+z.roadWidth/2)*N,this.webgl.scene.add(pe),pe}init(){this.leftRoadWay=this.createPlane(-1,this.options.roadWidth,!0),this.rightRoadWay=this.createPlane(1,this.options.roadWidth,!0),this.island=this.createPlane(0,this.options.islandWidth,!1)}update(N){this.uTime.value=N}}const F=`
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${et.fog_pars_fragment}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${et.fog_fragment}
      }
    `,ie=F.replace("#include <roadMarkings_fragment>","").replace("#include <roadMarkings_vars>",""),W=F.replace("#include <roadMarkings_fragment>",`
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

      brokenLines = mix(brokenLines, sideLines, uv.x);
    `).replace("#include <roadMarkings_vars>",`
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
      highp float random(vec2 co) {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt = dot(co.xy, vec2(a, b));
        highp float sn = mod(dt, 3.14);
        return fract(sin(sn) * c);
      }
    `),re=`
      #define USE_FOG;
      uniform float uTime;
      ${et.fog_pars_vertex}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${et.fog_vertex}
      }
    `;function fe($,N){const D=$.domElement,H=D.clientWidth,z=D.clientHeight,le=D.width!==H||D.height!==z;return le&&N(H,z,!1),le}return(function(){const $=document.getElementById("lights"),N={...a};N.distortion=p[N.distortion];const D=new v($,N);i.current=D,D.loadAssets().then(D.init)})(),()=>{i.current&&i.current.dispose()}},[a]),Qo.jsx("div",{id:"lights",ref:e})};function R3(){return Qo.jsx("div",{style:{width:"100vw",height:"100vh"},children:Qo.jsx(D3,{})})}const w3=I_.createRoot(document.getElementById("root"));w3.render(Qo.jsx(Oc.StrictMode,{children:Qo.jsx(R3,{})}));
