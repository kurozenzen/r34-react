(this["webpackJsonpr34-react"]=this["webpackJsonpr34-react"]||[]).push([[6],{193:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var c=n(10),a=n(41),r=(n(87),n(1));function i(){var e=Object(r.useState)(!1),t=Object(c.a)(e,2),n=t[0],i=t[1],s=Object(r.useState)(null),o=Object(c.a)(s,2),u=o[0],j=o[1];return Object(r.useEffect)((function(){try{var e=a.a.auth().onAuthStateChanged((function(e){e?(i(!0),j(e)):(i(!1),j(null))}));return function(){e()}}catch(t){i(!1),j(null)}}),[]),[n,u]}},194:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var c=n(1),a=n.n(c);function r(e){a.a.useEffect((function(){document.title=e}),[e])}},196:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var c,a,r=n(5),i=(n(1),n(4)),s=n(32),o=n(60),u=n(48),j=n(2),l=Object(i.d)(u.d)((function(e){var t=e.theme;return Object(i.c)(c||(c=Object(r.a)(["\n    padding-top: ",";\n  "])),t.dimensions.hugeSpacing)})),b=Object(i.d)(o.b)((function(e){var t=e.theme,n=e.$compact;return Object(i.c)(a||(a=Object(r.a)(["\n    padding: ",";\n    ",";\n  "])),n?t.dimensions.bigSpacing:t.dimensions.hugeSpacing,Object(s.e)(n?t.dimensions.bigSpacing:t.dimensions.hugeSpacing))}));function d(e){var t=e.title,n=e.children,c=e.className,a=e.compact,r=void 0!==a&&a;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(l,{children:t}),Object(j.jsx)(b,{$compact:r,className:c,children:n})]})}},197:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var c,a,r,i=n(10),s=n(5),o=(n(1),n(4)),u=n(19),j=n(31),l=n(2),b=o.d.div((function(e){var t=e.theme;return Object(o.c)(c||(c=Object(s.a)(["\n    width: 120px;\n    height: ",";\n  "])),t.dimensions.blockHeight)})),d=o.d.select(a||(a=Object(s.a)(["\n  ","\n\n  width: 100%;\n  height: 100%;\n"])),j.c),O=o.d.option((function(e){var t=e.theme;return Object(o.c)(r||(r=Object(s.a)(["\n    ","\n    background-color: ",";\n    ","\n  "])),Object(j.b)({theme:t}),t.colors.backgroundColor2,Object(u.c)({theme:t}))}));function h(e){var t=e.options,n=e.value,c=e.onChange;return Object(l.jsx)(b,{children:Object(l.jsx)(d,{value:n,onChange:c,children:Object.entries(t).map((function(e){var t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(l.jsx)(O,{value:n,children:c},n)}))})})}},198:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var c,a=n(10),r=n(5),i=n(1),s=n(4),o=n(31),u=n(2),j=s.d.input(c||(c=Object(r.a)(["\n  ","\n\n  width: 70px;\n  text-align: left;\n"])),o.c);function l(e){var t=e.value,n=e.onSubmit,c=e.className,r=e.min,s=e.max,o=e.step,l=Object(i.useState)(t.toString()),b=Object(a.a)(l,2),d=b[0],O=b[1];Object(i.useEffect)((function(){O(t.toString())}),[t]);var h=Object(i.useCallback)((function(e){O(e.target.value)}),[]),f=Object(i.useCallback)((function(){n(Number(d))}),[d,n]),g=Object(i.useCallback)((function(e){"Enter"===e.key&&e.target.blur()}),[]);return Object(u.jsx)(j,{type:"number",min:r,max:s,step:o,value:d,onChange:h,onBlur:f,onKeyDown:g,className:c})}},199:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c,a=n(5),r=n(4),i=n(19),s=n(86),o=Object(r.d)(s.b)(c||(c=Object(a.a)(["\n  ","\n  flex-grow: 1;\n"])),i.b)},201:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var c=n(10),a=n(1),r=n.n(a),i=n(208),s=n(193),o=n(7),u=n.n(o),j=n(14);function l(){return(l=Object(j.a)(u.a.mark((function e(t){var n,c,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(new TextEncoder).encode(t),e.next=3,crypto.subtle.digest("SHA-256",n);case 3:return c=e.sent,a=Array.from(new Uint8Array(c)),r=a.map((function(e){return e.toString(16).padStart(2,"0")})).join(""),e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){var e=r.a.useState({}),t=Object(c.a)(e,2),n=t[0],a=t[1],o=r.a.useState(),u=Object(c.a)(o,2),j=u[0],b=u[1],d=Object(s.a)(),O=Object(c.a)(d,2)[1];return r.a.useEffect((function(){(null===O||void 0===O?void 0:O.email)&&function(e){return l.apply(this,arguments)}(O.email).then((function(e){var t=i.a.firestore().collection("users/".concat(e,"/supertags"));return b(t),t.get()})).then((function(e){var t=e.docs.reduce((function(e,t){return e[t.id]=t.data(),e}),{});a(t)})).catch((function(e){console.error("Error with useSupertags",e)}))}),[null===O||void 0===O?void 0:O.email]),r.a.useEffect((function(){if(j){var e=j.onSnapshot((function(e){var t=e.docs.reduce((function(e,t){return e[t.id]=t.data(),e}),{});a(t)}));return function(){e()}}}),[j]),n}},230:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Be}));var c,a,r,i,s=n(10),o=n(5),u=n(4),j=n(56),l=n(193),b=n(194),d=n(22),O=n(19),h=n(199),f=n(86),g=n(99),p=n(48),x=n(196),v=n(96),m=n(1),k=n.n(m),y=n(2),S=u.d.div(c||(c=Object(o.a)(["\n  ","\n  grid-template-columns: 1fr auto;\n  grid-template-rows: auto auto;\n"])),O.h),w=Object(u.d)(p.c)((function(e){e.theme;return Object(u.c)(a||(a=Object(o.a)(["\n    grid-column: 1/2;\n    grid-row: 1/2;\n  "])))})),C=Object(u.d)(p.b)((function(e){e.theme;return Object(u.c)(r||(r=Object(o.a)(["\n    grid-column: 1/2;\n    grid-row: 2/3;\n  "])))})),T=u.d.div((function(e){e.theme;return Object(u.c)(i||(i=Object(o.a)(["\n    grid-column: 2/3;\n    grid-row: 1/3;\n  "])))}));function E(e){var t=e.title,n=e.description,c=e.children;return Object(y.jsxs)(S,{children:[Object(y.jsx)(w,{children:t}),Object(y.jsx)(C,{children:n}),Object(y.jsx)(T,{children:c})]})}var A,D,R=n(40),P=n(27),I=u.d.div(A||(A=Object(o.a)(["\n  ","\n"])),O.f),N=u.d.img((function(e){var t=e.theme;return Object(u.c)(D||(D=Object(o.a)(["\n    height: ",";\n    width: ",";\n    border-radius: ",";\n  "])),t.dimensions.blockHeight,t.dimensions.blockHeight,t.dimensions.borderRadius)}));function H(){var e=Object(l.a)(),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)(R.j,[]),r=Object(m.useCallback)(R.k,[]);if(n){var i=(null===c||void 0===c?void 0:c.displayName)||(null===c||void 0===c?void 0:c.email)||"",o=(null===c||void 0===c?void 0:c.photoURL)||"";return Object(y.jsx)(f.a,{children:Object(y.jsxs)(I,{children:[Object(y.jsx)(N,{src:o,alt:i,title:i}),Object(y.jsxs)(P.f,{onClick:r,children:[Object(y.jsx)(d.E,{}),Object(y.jsx)("span",{children:"Sign Out"})]})]})})}return Object(y.jsxs)(P.f,{onClick:a,children:[Object(y.jsx)(d.t,{}),Object(y.jsx)("span",{children:"Sign In"})]})}function F(){return Object(y.jsx)(E,{title:"Account",description:"Sign in to save your preferences across devices. Some preferences require you to be signed in because they use your stored data.",children:Object(y.jsx)(H,{})})}var L=n(59),M=n(95);function z(){var e=Object(L.a)("autoPlay"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Auto-play",description:"Start videos automatically once they become visible. This will use more data.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}var q=n(198);function B(){var e=Object(L.a)("autoscrollDelay"),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(y.jsx)(E,{title:"Autosroll delay",description:"Configure how long posts stay on screen in fullscreen view. Time in seconds",children:Object(y.jsx)(q.a,{value:n,onSubmit:c,min:1,max:60,step:1})})}var G=n(197),U={default:"Default",adaptable:"Adaptable",render:"Render"},W={default:["https://json-api.onrender.com"],adaptable:["https://rule34-json-api.adaptable.app"],render:["https://json-api.onrender.com"]};function J(){var e=Object(L.a)("backends"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object.keys(W).find((function(e){return n&&W[e].includes(n[0])})),r=Object(m.useCallback)((function(e){var t,n=e.target.value;c(null!==(t=W[n])&&void 0!==t?t:W.default)}),[c]);return Object(m.useEffect)((function(){void 0===a&&c(W.default)})),Object(y.jsx)(y.Fragment,{children:Object(y.jsx)(E,{title:"Backend",description:"Controls the backend used to fetch posts.",children:Object(y.jsx)(G.a,{options:U,value:null!==a&&void 0!==a?a:U.default,onChange:r})})})}function K(){var e=Object(L.a)("hideSeen"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Hide seen posts [NOT WORKING]",description:"Enabling this option will hide all posts you have seen before. Perfect if you are frequently browsing the same tags or sorting by score.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}function $(){var e=Object(L.a)("originals"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Load original sizes",description:"Display images and videos at their original resolution. This will consume more data but provides a nicer experience.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}function _(){var e=Object(L.a)("showMetadata"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Show post metadata",description:"Posts display more data in their details. Mainly for developing purposes but maybe it's useful to someone.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}function V(){var e=Object(L.a)("pageSize"),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(y.jsx)(E,{title:"Page size",description:"Controls the number of posts loaded at once.",children:Object(y.jsx)(q.a,{value:n,onSubmit:c,min:10,max:200,step:1})})}function Y(){var e=Object(L.a)("preloadVideos"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Preload Animations",description:"Start loading videos and gifs immediately instead of when you click play. This will improve your viewing experience but will consume a LOT of data. Only use with WIFI.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}var Q={infinite_column:"Infinite",pages:"Pages"};function X(){var e=Object(L.a)("resultsLayout"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(e){return c(e.target.value)}),[c]);return Object(y.jsx)(E,{title:"Results Layout",description:"Choose how your results are displayed.",children:Object(y.jsx)(G.a,{options:Q,value:n,onChange:a})})}function Z(){var e=Object(L.a)("showComments"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Show comments",description:"If there are comments on a post, they will appear in the details. This preference needs 'Show Post Details' to be enabled to have any effect.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}function ee(){var e=Object(L.a)("showPostDetails"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(){return c(!n)}),[n,c]);return Object(y.jsx)(E,{title:"Show post details",description:"When enabled, tapping a post shows additional details for the post. This includes tags, rating, likes, the artist and more.",children:Object(y.jsx)(M.a,{value:n,onToggle:a})})}var te,ne,ce,ae=n(3),re=n(15),ie=n(25),se=n(201),oe=n(6),ue=n(100),je=n(97),le=n(103),be=n(52),de=n(73),Oe=n(21),he=u.d.div((function(e){var t=e.theme;return Object(u.c)(te||(te=Object(o.a)(["\n    ","\n\n    padding-block: ",";\n\n    :not(:last-child) {\n      border-bottom: solid gray 1px;\n    }\n\n    :active {\n      background: ",";\n    }\n  "])),O.e,t.dimensions.bigSpacing,t.colors.layerBgHighlight)})),fe=u.d.div(ne||(ne=Object(o.a)(["\n  ","\n  grid-template-columns: auto auto 1fr auto auto;\n  grid-template-rows: 1fr auto;\n  align-items: center;\n  cursor: pointer;\n\n  > :first-child {\n    place-items: center;\n    grid-area: 1/1/3/2;\n  }\n  > :nth-child(2) {\n    grid-area: 1/2/2/3;\n  }\n  > :nth-child(3) {\n    grid-area: 1/3/2/4;\n  }\n  > :nth-child(4) {\n    grid-area: 2/2/3/4;\n  }\n  > :nth-child(5) {\n    grid-area: 1/4/3/5;\n  }\n  > :nth-child(6) {\n    grid-area: 1/6/3/6;\n  }\n"])),O.h),ge=Object(u.d)(de.b)((function(e){var t=e.theme;return Object(u.c)(ce||(ce=Object(o.a)(["\n    padding: ",";\n    cursor: pointer;\n    color: ",";\n  "])),t.dimensions.bigSpacing,t.colors.text)}));function pe(e){var t=e.supertag,n=t.name,c=t.description,a=t.tags,r=Object(ue.a)(),i=Object(s.a)(r,2),o=i[0],u=i[1],j=function(e){return[Object(m.useCallback)((function(t){var n=t,c=Object(ae.a)(Object(ae.a)({},e.tags),{},Object(be.a)({},n.name,n.modifier));Object(R.i)(e.name,c)}),[e.name,e.tags]),Object(m.useCallback)((function(t){var n=Object(ae.a)({},e.tags);delete n[t.name],Object(R.i)(e.name,n)}),[e.name,e.tags]),Object(m.useCallback)((function(){return Object(R.f)(e.name)}),[e.name])]}(t),l=Object(s.a)(j,3),b=l[0],O=l[1],h=l[2],f=Object(m.useMemo)((function(){return Object.entries(a).reduce((function(e,t){var n=Object(s.a)(t,2),c=n[0],a=n[1];return e[c]={name:c,modifier:a,types:[]},e}),{})}),[a]),g=k.a.useCallback((function(e){e.stopPropagation(),e.preventDefault(),h()}),[h]),x=k.a.useCallback((function(e){if(!Object(Oe.g)(e)){var t=["+","-","~"],n=t[(t.indexOf(e.modifier)+1)%3];b(Object(ae.a)(Object(ae.a)({},e),{},{modifier:n}))}}),[b]);return Object(y.jsxs)(he,{children:[Object(y.jsxs)(fe,{onClick:u,title:"Open supertag details",children:[Object(y.jsx)(d.I,{}),Object(y.jsx)("span",{children:n}),Object(y.jsxs)(p.b,{children:[Object.keys(a).length," tags"]}),Object(y.jsx)(p.b,{children:c}),Object(y.jsx)(ge,{to:"".concat(ie.c.SHARE,"?").concat(Object(Oe.c)(t)),title:"Share supertag",children:Object(y.jsx)(d.D,{})}),Object(y.jsx)(P.c,{onClick:g,title:"Delete supertag",children:Object(y.jsx)(d.h,{})})]}),o&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(le.a,{onSubmit:b,showSupertags:!1}),Object(y.jsx)(je.a,{tags:f,detailed:!1,onTagClick:O,onTagMenu:x})]})]})}function xe(){var e=Object(se.a)(),t=Object(re.b)(),n=k.a.useCallback((function(){return t(Object(oe.H)(ie.a.CREATE_SUPERTAG))}),[t]);return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(E,{title:"Supertags",description:"You can manage your supertags here. To create on sign in and try adding two or more tags to your search. Adding supertag to your search will add all the tags inside instead.",children:Object(y.jsxs)(P.f,{onClick:n,children:[Object(y.jsx)(d.z,{})," Add new"]})}),Object(y.jsx)("div",{children:Object.entries(e).map((function(e){var t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(y.jsx)(pe,{supertag:Object(ae.a)({name:n},c)},n)}))})]})}function ve(){var e=Object(L.a)("tagSuggestionsCount"),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(y.jsx)(E,{title:"Number of Tag suggestions",description:"Controls the number of tags displayed when searching. Increase this when searching for niche tags.",children:Object(y.jsx)(q.a,{value:n,onSubmit:c,min:3,max:200,step:1})})}var me={dark:"Dark",light:"Light",coffee:"Coffee",deepsea:"Deep Sea"};function ke(){var e=Object(L.a)("themeId"),t=Object(s.a)(e,2),n=t[0],c=t[1],a=Object(m.useCallback)((function(e){return c(e.target.value)}),[c]);return Object(y.jsx)(E,{title:"Theme",description:"Choose how the app looks.",children:Object(y.jsx)(G.a,{options:me,value:n,onChange:a})})}var ye,Se,we,Ce,Te=n(51),Ee=n(32),Ae=n(31),De=Object(u.d)(d.H).attrs((function(e){return{color:e.theme.colors.positive}}))(ye||(ye=Object(o.a)([""]))),Re=Object(u.d)(d.q).attrs((function(e){return{color:e.theme.colors.negative}}))(Se||(Se=Object(o.a)([""])));function Pe(e){return e.value?Object(y.jsx)(De,{}):Object(y.jsx)(Re,{})}var Ie=u.d.div(we||(we=Object(o.a)(["\n  ","\n"])),O.e),Ne=u.d.div(Ce||(Ce=Object(o.a)(["\n  ","\n  ","\n  ","\n  background: ",";\n"])),O.e,Ee.b,Ae.a,(function(e){return e.theme.colors.backgroundColor}));function He(){return Object(y.jsxs)(Ie,{children:[Object(y.jsx)(p.c,{children:"Feature Detection"}),Object(y.jsx)(p.b,{children:"This information is really valuable when investigating layout and browser issues."}),Object(y.jsxs)(Ne,{children:[Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.e})," Supports grid-gap"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.c})," Supports flex-gap"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.b})," Supports aspect-ratio"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.h})," Supports object-fit"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.d})," Supports fullscreen"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.g})," Supports advanced network info"]}),Object(y.jsxs)(p.b,{children:[Object(y.jsx)(Pe,{value:Te.f})," Supports localStorage"]})]})]})}var Fe,Le=n(104);function Me(){var e=Object(re.b)(),t=Object(m.useCallback)((function(){return e(Object(oe.N)([],0,0))}),[e]);return Object(y.jsxs)(P.b,{onClick:t,children:[Object(y.jsx)(d.M,{})," Reset Results"]})}function ze(){var e=Object(m.useCallback)(R.g,[]);return Object(y.jsxs)(P.b,{onClick:e,children:[Object(y.jsx)(d.M,{})," Reset seen posts"]})}var qe=u.d.div(Fe||(Fe=Object(o.a)(["\n  ","\n  flex-grow: 1;\n  justify-content: center;\n  min-height: 50px;\n"])),O.f);function Be(){var e=Object(u.f)(),t=Object(j.d)(),n=Object(l.a)(),c=Object(s.a)(n,1)[0];return Object(b.a)("Rule34 React - Preferences"),Object(y.jsxs)(f.a,{children:[Object(y.jsx)(v.a,{}),Object(y.jsxs)(h.a,{children:[Object(y.jsxs)(x.a,{title:"General",children:[Object(y.jsx)(X,{}),Object(y.jsx)(Y,{}),Object(y.jsx)($,{}),Object(y.jsx)(ve,{}),Object(y.jsx)(V,{}),Object(y.jsx)(ee,{}),Object(y.jsx)(Z,{})]}),Object(y.jsxs)(x.a,{title:"Account",children:[Object(y.jsx)(F,{}),Object(y.jsx)(ke,{}),c&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(xe,{}),Object(y.jsx)(K,{})]})]}),Object(y.jsxs)(x.a,{title:"Experimental",children:[Object(y.jsx)(p.b,{children:"These features that are still under active development. They might change a lot in the future. Please report any bugs you find so I can fix them :)"}),Object(y.jsx)(g.a,{}),Object(y.jsx)(z,{}),Object(y.jsx)(B,{})]}),Object(y.jsxs)(x.a,{title:"Developer",children:[Object(y.jsx)(_,{}),Object(y.jsx)(J,{}),Object(y.jsx)(He,{}),Object(y.jsx)(Me,{}),Object(y.jsx)(ze,{}),Object(y.jsx)(Le.a,{})]}),Object(y.jsxs)(qe,{children:[Object(y.jsx)(d.i,{color:e.colors.subduedText}),Object(y.jsx)(p.b,{children:t})]})]})]})}}}]);
//# sourceMappingURL=6.6e702645.chunk.js.map