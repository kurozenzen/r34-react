(this["webpackJsonpr34-browser"]=this["webpackJsonpr34-browser"]||[]).push([[8],{107:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s}));var c,a,r=n(4),i=n(2),o=Object(i.e)(c||(c=Object(r.a)(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n"]))),s=Object(i.e)(a||(a=Object(r.a)(["\n  0% {\n    transform: rotate(0) scale(1);\n  }\n  60% {\n    transform: rotate(0) scale(1);\n  }\n  75% {\n    transform: rotate(0) scale(1.12);\n  }\n  80% {\n    transform: rotate(0) scale(1.1);\n  }\n  84% {\n    transform: rotate(-10deg) scale(1.1);\n  }\n  88% {\n    transform: rotate(10deg) scale(1.1);\n  }\n  92% {\n    transform: rotate(-10deg) scale(1.1);\n  }\n  96% {\n    transform: rotate(10deg) scale(1.1);\n  }\n  100% {\n    transform: rotate(0) scale(1);\n  }\n"])))},115:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var c,a=n(47),r=n(4),i=n(0),o=n(2),s=n(23),l=n(3),d=o.d.input((function(e){var t=e.theme;return Object(o.c)(c||(c=Object(r.a)(["\n    width: 50px;\n    ","\n    background-color: ",";\n    ","\n    text-align: center;\n  "])),Object(s.e)({theme:t}),t.colors.backgroundColor2,Object(s.d)({theme:t}))}));function b(e){var t=e.value,n=e.onSubmit,c=e.className,r=Object(i.useState)(t.toString()),o=Object(a.a)(r,2),s=o[0],b=o[1];Object(i.useEffect)((function(){"number"===typeof t&&b(t.toString())}),[t]);var u=Object(i.useCallback)((function(e){b(e.target.value)}),[]),j=Object(i.useCallback)((function(){n(Number(s))}),[s,n]),O=Object(i.useCallback)((function(e){"Enter"===e.key&&n(Number(s))}),[s,n]);return Object(l.jsx)(d,{type:"number",value:s,onChange:u,onBlur:j,onKeyDown:O,className:c})}},116:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var c,a,r,i,o=n(4),s=(n(0),n(2)),l=n(107),d=n(3),b=s.d.div(c||(c=Object(o.a)(["\n  display: inline-block;\n  white-space: nowrap;\n"]))),u=s.d.a((function(e){var t=e.theme;return Object(s.c)(a||(a=Object(o.a)(["\n    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);\n    line-height: 36px;\n    display: inline-block;\n    background-color: ",";\n    padding: 2px 12px;\n    text-align: center;\n    border-radius: ",";\n    color: ",";\n    cursor: pointer;\n    overflow-wrap: break-word;\n    vertical-align: middle;\n    border: 0 none #fff;\n    font-family: 'Quicksand', Helvetica, Century Gothic, sans-serif !important;\n    text-decoration: none;\n    text-shadow: none;\n    font-weight: 700;\n    font-size: 14px;\n\n    :visited {\n      color: "," !important;\n      text-decoration: none !important;\n    }\n\n    :hover {\n      opacity: 0.8;\n      text-decoration: none !important;\n    }\n\n    :active {\n      opacity: 0.6;\n      text-decoration: none !important;\n    }\n  "])),t.colors.layerBg,t.dimensions.borderRadius,t.colors.text,t.colors.text)})),j=s.d.span(r||(r=Object(o.a)(["\n  letter-spacing: -0.15px !important;\n  vertical-align: middle;\n  line-height: 33px !important;\n  padding: 0;\n  text-align: center;\n  text-decoration: none !important;\n  text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);\n\n  a {\n    text-decoration: none !important;\n  }\n\n  a:hover {\n    text-decoration: none;\n  }\n"]))),O=s.d.img(i||(i=Object(o.a)(["\n  display: initial !important;\n  vertical-align: middle;\n  height: 13px !important;\n  width: 20px !important;\n  padding-top: 0;\n  padding-bottom: 0;\n  border: none;\n  margin-top: 0;\n  margin-right: 5px;\n  margin-left: 0;\n  margin-bottom: 3px;\n  content: url('https://ko-fi.com/img/cup-border.png');\n\n  :after {\n    vertical-align: middle;\n    height: 25px;\n    padding-top: 0;\n    padding-bottom: 0;\n    border: none;\n    margin-top: 0;\n    margin-right: 6px;\n    margin-left: 0;\n    margin-bottom: 4px !important;\n    content: url('https://ko-fi.com/img/whitelogo.svg');\n\n    height: 15px !important;\n    width: 22px !important;\n    display: initial;\n    animation: "," 3s infinite;\n  }\n"])),l.b);function h(e){var t=e.id,n=e.label;return Object(d.jsx)(b,{children:Object(d.jsx)(u,{title:n,href:"https://ko-fi.com/"+t,target:"_blank",rel:"noopener noreferrer",children:Object(d.jsxs)(j,{children:[Object(d.jsx)(O,{src:"https://ko-fi.com/img/cup-border.png",className:"kofiimg",alt:"Ko-Fi button"}),n]})})})}},140:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return cn}));var c=n(47),a=n(0),r=n(28),i=n(11),o=n(138),s=n(3);function l(e){var t=e.Header,n=e.items,r=void 0===n?[]:n,l=e.LoadingItem,d=e.hasMoreRows,b=e.ItemComponent,u=e.loadMore,j=e.OutOfItems,O=e.isLoading,h=e.setLoading,p=Object(a.useState)(null),g=Object(c.a)(p,2),f=g[0],m=g[1],v=Object(a.useMemo)((function(){return new o.b({fixedWidth:!0})}),[]),x=t?1:0,w=r.length+x+1,k=Object(a.useCallback)((function(e){return e.index<x+r.length+(d?0:1)}),[d,r.length,x]);Object(a.useEffect)((function(){if(f){var e=function(){f.measureAllRows(),f.recomputeRowHeights(),f.forceUpdateGrid()};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}}),[f]);var y=Object(a.useCallback)((function(e){var n=e.index,c=e.key,a=e.parent,u=e.style;return Object(s.jsx)(o.a,{cache:v,columnIndex:0,rowIndex:n,parent:a,children:function(e){var c=e.measure,a=e.registerChild;return t&&n<x?Object(s.jsx)(t,{style:u,virtualRef:a,onLoad:c}):n<x+r.length?Object(s.jsx)(b,Object(i.a)({style:u,virtualRef:a,onLoad:c},r[n-x])):n<x+r.length+1?d||O?Object(s.jsx)(l,{style:u,virtualRef:a,onLoad:c}):j&&r.length>0?Object(s.jsx)(j,{style:u,virtualRef:a,onLoad:c}):Object(s.jsx)("div",{}):(console.warn("index not found / out of bounds. INDEX:",n),null)}},c)}),[v,t,x,r,b,d,O,l,j]);return Object(s.jsx)(o.c,{isRowLoaded:k,loadMoreRows:function(e){return O||!d?Promise.reject(0):(h(!0),u(),new Promise((function(e){setTimeout((function(){h(!1),e(1)}),1e3)})))},rowCount:w,children:function(e){var t=e.onRowsRendered,n=e.registerChild;return Object(s.jsx)(o.d,{ref:function(e){m(e),n(e)},onRowsRendered:t,rowRenderer:y,deferredMeasurementCache:v,overscanRowCount:10,rowCount:r.length+x+1,rowHeight:v.rowHeight,width:window.innerWidth,height:window.innerHeight})}})}var d=n(4),b=n(2),u=n(6),j=n(26),O=n(9),h=n(23),p=n(108),g=n(98);var f=n(105);function m(e){var t=e.value;return Object(s.jsxs)(f.a,{children:[Object(s.jsx)(g.u,{color:"white"}),Object(s.jsx)("span",{children:t})]})}var v,x,w=n(48),k=b.d.a((function(e){var t=e.color,n=e.theme;return Object(b.c)(v||(v=Object(d.a)(["\n    ","\n    ",";\n    white-space: nowrap;\n\n    svg {\n      height: 16px;\n    }\n  "])),Object(h.l)({theme:n}),t?Object(b.c)(x||(x=Object(d.a)(["\n          color: "," !important;\n        "])),t):"")}));function y(e){var t=e.value,n=Object(b.f)().colors.accentColor,c=Object(w.d)(t);return Object(s.jsxs)(k,{color:n,href:t,target:"_blank",rel:"noopener noreferrer",className:"source",children:[Object(s.jsx)(g.q,{color:n}),c]})}function C(e){var t=e.value,n=e.color,c=e.Icon,a=e.title;return Object(s.jsxs)(k,{href:t,target:"_blank",rel:"noopener noreferrer",className:"source",color:n,children:[Object(s.jsx)(c,{}),a]})}function L(e){return e.split(" ")[0].split("?")[0].split("/")[0]}var I={"twitter.com/":["#1da1f2",g.w,function(e){return L(e.split("twitter.com/")[1])}],"pixiv.net/":["#0096FA",function(e){return Object(s.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:Object(s.jsx)("path",{fill:"currentColor",d:"M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"})})},function(){return"Pixiv"}],"patreon.com/":["#FF424D",g.s,function(e){var t=e.split("patreon.com/")[1];return t.startsWith("posts/")?function(e){return e.split(" ")[0].split("?")[0].split("/")[1]}(t):L(t)}],"deviantart.com/":["#00e59b",g.i,function(e){return L(e.split("deviantart.com/")[1])}],"discordapp.com/":["#7289DA",g.j,function(){return"Discord"}],"tumblr.com":["#75869C",g.v,function(e){return new URL(e).hostname.split(".")[0]}]};function P(e){var t=e.value;if(Object(j.i)(t)){var n=t.split(" ");return Object(s.jsx)(s.Fragment,{children:n.map((function(e){var t=Object.keys(I).find((function(t){return e.includes(t)}));if(t){var n=Object(c.a)(I[t],3),a=n[0],r=n[1],i=n[2];return Object(s.jsx)(C,{value:e,color:a,Icon:r,title:i(e)},e)}return Object(s.jsx)(y,{value:e},e)}))})}return Object(s.jsx)(m,{value:t})}var R,S,N,_,E,M=n(93),T=b.d.div(R||(R=Object(d.a)(["\n  ","\n  ","\n  \n  flex-wrap: wrap;\n  padding-top: 0;\n  grid-row: 4/5;\n"])),h.i,h.o),F=b.d.div(S||(S=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  ","\n"])),Object(h.h)("4px")),z=b.d.span(N||(N=Object(d.a)(["\n  line-height: 20px;\n"]))),D=Object(b.d)(M.b)(_||(_=Object(d.a)(["\n  line-height: 20px;\n"])));function W(e){var t=e.comments,n=void 0===t?[]:t;return Object(s.jsx)(T,{children:n&&n.map((function(e,t){return Object(s.jsxs)(F,{children:[Object(s.jsx)(z,{children:e.creator}),Object(s.jsx)(D,{children:e.body})]},t)}))})}var A=Object(b.d)(M.b)(E||(E=Object(d.a)(["\n  white-space: nowrap;\n"])));function V(e){var t=e.created_at,n=e.status,c=e.width,a=e.height;return Object(s.jsxs)(T,{children:[Object(s.jsxs)(f.a,{children:[Object(s.jsx)(g.c,{}),Object(s.jsxs)(A,{children:[Object(w.b)(new Date(t))," (",Object(w.g)(Date.now()-t)," ago)"]})]}),Object(s.jsxs)(f.a,{children:[Object(s.jsx)(g.e,{}),Object(s.jsx)(A,{children:n})]}),Object(s.jsxs)(f.a,{children:[Object(s.jsx)(g.p,{}),Object(s.jsxs)(A,{children:[c," x ",a]})]})]})}function H(e){return Object(s.jsxs)(f.a,{children:[Object(s.jsx)(g.t,{color:"white"}),Object(s.jsx)("span",{children:e.value[0].toUpperCase()})]})}var Y,G,q,B,U,K,J,$,Q=n(5),X=Object(b.d)(f.a)((function(e){var t=e.$liked,n=e.theme;return Object(b.c)(Y||(Y=Object(d.a)(["\n    transition: transform 0.1s ease-out;\n\n    ","\n\n    :active {\n      transform: scale(1.1);\n    }\n  "])),t?Object(b.c)(G||(G=Object(d.a)(["\n          color: ",";\n\n          svg {\n            color: ",";\n          }\n        "])),n.colors.liked,n.colors.liked):Object(b.c)(q||(q=Object(d.a)([""]))))}));function Z(e){var t=e.value,n=e.postId,c=Object(r.b)(),i=Object(r.c)(Object(O.l)(n)),o=Object(a.useCallback)((function(e){e.stopPropagation(),i||c(Object(Q.z)(n))}),[c,i,n]);return Object(s.jsxs)(X,{onClick:o,$liked:i,children:[Object(s.jsx)(g.o,{color:"white"}),Object(s.jsx)("span",{children:t+Object(j.a)(i)})]})}var ee=b.d.div((function(e){var t=e.theme;return Object(b.c)(B||(B=Object(d.a)(["\n    grid-row: 2/3;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    ","\n    padding: ",";\n    ","\n    border-radius: 0 0 "," ",";\n  "])),Object(h.p)({theme:t}),t.dimensions.gutter,Object(h.k)(t.dimensions.hugeSpacing),t.dimensions.borderRadius,t.dimensions.borderRadius)})),te=b.d.div(U||(U=Object(d.a)(["\n  ","\n  ","\n  justify-content: space-around;\n  margin-top: 8px;\n  grid-row: 3/4;\n"])),h.l,h.o),ne=b.d.span(K||(K=Object(d.a)(["\n  ","\n"])),(function(e){var t=e.active,n=e.theme;return t?Object(b.c)(J||(J=Object(d.a)(["\n          color: ",";\n        "])),n.colors.accentColor):""})),ce=Object(b.d)(p.a)((function(e){var t=e.theme;return Object(b.c)($||($=Object(d.a)(["\n    grid-row: 4/5;\n    padding: ",";\n  "])),t.dimensions.gutter)}));function ae(e){var t=e.postId,n=e.onLoad,c=void 0===n?u.c:n,i=e.activeTab,o=e.setActiveTab,l=Object(r.c)(Object(O.s)(t)),d=l.rating,b=l.score,h=l.tags,p=l.source,g=l.created_at,f=l.status,m=l.height,v=l.width,x=l.comments,w=Object(a.useMemo)((function(){return Object(j.h)(h,"name")}),[h]),k=Object(r.c)(O.z),y=Object(r.c)(O.y),C=(null===x||void 0===x?void 0:x.length)||0,L=Object(a.useCallback)((function(e){e.stopPropagation(),o("tags")}),[o]),I=Object(a.useCallback)((function(e){e.stopPropagation(),o("comments")}),[o]),R=Object(a.useCallback)((function(e){e.stopPropagation(),o("metadata")}),[o]);return Object(a.useEffect)((function(){c()}),[c,i]),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)(ee,{children:[Object(s.jsx)(H,{value:d}),Object(s.jsx)(Z,{value:b,postId:t}),!!p&&Object(s.jsx)(P,{value:p})]}),(y&&C>0||k)&&Object(s.jsxs)(te,{children:[Object(s.jsx)(ne,{active:"tags"===i,onClick:L,children:"Tags"}),y&&C>0&&Object(s.jsx)(ne,{active:"comments"===i,onClick:I,children:"Comments"}),k&&Object(s.jsx)(ne,{active:"metadata"===i,onClick:R,children:"Metadata"})]}),{tags:Object(s.jsx)(ce,{tags:w,detailed:!1}),comments:Object(s.jsx)(W,{comments:x}),metadata:Object(s.jsx)(V,{created_at:g,status:f,width:v,height:m})}[i]]})}var re,ie,oe,se,le=n(106),de=n(107);var be,ue=b.d.input(se||(se=Object(d.a)(["\n  ","\n  ","\n"])),(function(){return Object(b.c)(oe||(oe=Object(d.a)(["\n    -webkit-appearance: none;\n    width: 100%;\n    background: transparent;\n    border-radius: 100px;\n    height: 6px;\n\n    &::-moz-range-progress {\n      background-color: ",";\n    }\n\n    &::-ms-fill-lower {\n      background-color: ",";\n    }\n  "])),(function(e){return e.theme.colors.accentColor}),(function(e){return e.theme.colors.accentColor}))}),(function(){var e=Object(b.c)(re||(re=Object(d.a)(["\n    height: 16px;\n    width: 16px;\n    border-radius: 100px;\n    background: #ffffff;\n    cursor: pointer;\n  "])));return Object(b.c)(ie||(ie=Object(d.a)(["\n    &::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      ","\n    }\n\n    &::-moz-range-thumb {\n      ","\n    }\n\n    &::-ms-thumb {\n      ","\n    }\n  "])),e,e,e)}));var je,Oe,he,pe,ge,fe,me,ve,xe,we,ke,ye,Ce=b.d.svg(be||(be=Object(d.a)(["\n  > rect {\n    transition: all 0.2s ease-in;\n  }\n\n  &.play {\n    .left {\n      clip-path: path('M1.61 0 L10.1 4.9 L10.1 19.1 L1.61 24');\n    }\n\n    .right {\n      clip-path: path('M22.39 12 L9.9 4.79 L9.9 19.21 L22.39 12');\n    }\n  }\n\n  &.pause {\n    .left {\n      clip-path: path('M4.8 0 L10 0 L10 24 L4.8 24');\n    }\n\n    .right {\n      clip-path: path('M19.2 0 L14 0 L14 24 L19.2 24');\n    }\n  }\n"])));var Le=b.d.div(he||(he=Object(d.a)(["\n  grid-area: 1/1/2/2;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 1fr auto auto;\n  z-index: 1;\n\n  ",";\n"])),(function(e){return e.isVisible?Object(b.c)(je||(je=Object(d.a)([""]))):Object(b.c)(Oe||(Oe=Object(d.a)(["\n        opacity: 0;\n        animation: "," 0.4s ease-in;\n      "])),de.a)})),Ie=Object(b.d)((function(e){var t=e.value,n=e.maxValue,r=e.className,i=e.onChange,o=Object(a.useState)(t),l=Object(c.a)(o,2),d=l[0],u=l[1],j=Object(a.useCallback)((function(e){console.log("update");var t=Number(e.target.value);u(t),i(t)}),[i]),O=Object(a.useCallback)((function(e){e.stopPropagation()}),[]);Object(a.useEffect)((function(){t!==d&&u(t)}),[t]);var h=Object(b.f)(),p=Math.round(d/n*100);return Object(s.jsx)(ue,{type:"range",step:.034,min:0,max:n,value:d,onChange:j,className:r,onClick:O,style:{backgroundImage:"linear-gradient(90deg, ".concat(h.colors.accentColor," ").concat(p,"%, transparent ").concat(p,"%\n      )")}})}))(pe||(pe=Object(d.a)(["\n  grid-area: 4/1/4/4;\n"]))),Pe=Object(b.d)(g.l)((function(e){var t=e.theme;return Object(b.c)(ge||(ge=Object(d.a)(["\n    grid-area: 1/1/2/2;\n    place-self: start start;\n    ","\n    margin: ",";\n  "])),h.f,t.dimensions.gutter)})),Re=Object(b.d)(g.f)((function(e){var t=e.theme;return Object(b.c)(fe||(fe=Object(d.a)(["\n    grid-area: 1/1/2/2;\n    place-self: start start;\n    ","\n    margin: ",";\n  "])),h.f,t.dimensions.gutter)})),Se=b.d.div(me||(me=Object(d.a)(["\n  grid-area: 3/1/4/2;\n  place-self: end stretch;\n  display: flex;\n  place-items: start center;\n  ","\n\n  > svg {\n    ","\n  }\n"])),h.o,h.f),Ne=Object(b.d)(g.a)(ve||(ve=Object(d.a)(["\n  grid-area: 3/2/4/3;\n  place-self: end center;\n  height: 32px;\n  width: 32px;\n"]))),_e=Object(b.d)((function(e){var t=e.onClick,n=void 0===t?u.c:t,r=e.className,i=Object(le.a)(!0),o=Object(c.a)(i,2),l=o[0],d=o[1],b=Object(a.useCallback)((function(e){n(e),d()}),[n,d]);return Object(s.jsxs)(Ce,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",onClick:b,className:"".concat(r," ").concat(l?"play":"pause"),children:[Object(s.jsx)("rect",{className:"left",color:"currentColor",x:"0",y:"0",width:"24",height:" 24"}),Object(s.jsx)("rect",{className:"right",color:"currentColor",x:"0",y:"0",width:"24",height:" 24"})]})}))(xe||(xe=Object(d.a)(["\n  height: 50px;\n  width: 50px;\n  grid-area: 2/2/3/3;\n  place-self: center center;\n  fill: white;\n  ","\n"])),h.f),Ee=b.d.div(we||(we=Object(d.a)(["\n  grid-area: 2/1/3/2;\n"]))),Me=b.d.div(ke||(ke=Object(d.a)(["\n  grid-area: 2/3/3/4;\n"]))),Te=b.d.span((function(e){return Object(b.c)(ye||(ye=Object(d.a)(["\n    grid-area: 3/3/4/4;\n    place-self: end end;\n    background: #00000080;\n    border-radius: 4px;\n    padding: ",";\n    margin: ",";\n  "])),e.theme.dimensions.spacing,e.theme.dimensions.gutter)}));var Fe,ze,De,We=function(e){var t=e.togglePlay,n=void 0===t?u.c:t,i=e.isPaused,o=void 0===i||i,l=e.isPlayable,d=void 0!==l&&l,b=e.currentTime,h=void 0===b?0:b,p=e.duration,f=void 0===p?null:p,m=e.mediaRef,v=e.postId,x=Object(r.b)(),k=Object(le.a)(),y=Object(c.a)(k,2),C=y[0],L=y[1],I=Object(r.c)(Object(O.s)(v)),P=Object(r.c)(O.t),R=Object(r.c)(O.i),S=Object(r.c)(O.D),N=Object(r.c)(O.n),_=Object(r.c)(O.w),E=Object(j.d)(S,I.big_src),M=Object(a.useCallback)((function(e){e.stopPropagation(),Object(j.b)(E)}),[E]),T=Object(a.useCallback)((function(e){e.stopPropagation(),R?x(Object(Q.u)()):(m&&m.pause(),x(Object(Q.t)(v)))}),[x,R,m,v]),F=Object(a.useCallback)((function(e){e.stopPropagation(),n()}),[n]),z=Object(a.useCallback)((function(e){var t=P[e];t&&x(Object(Q.C)(t.id))}),[x,P]),D=Object(a.useCallback)((function(){void 0!==N&&z(N)}),[z,N]),W=Object(a.useCallback)((function(){void 0!==_&&z(_)}),[z,_]),A=Object(a.useCallback)((function(e){m&&(m.currentTime=e)}),[m]);return Object(s.jsxs)(Le,{isVisible:o||C,onClick:L,children:[R?Object(s.jsx)(Re,{color:"white",onClick:T,"aria-label":"Open Fullscreen"}):Object(s.jsx)(Pe,{color:"white",onClick:T,"aria-label":"Open Fullscreen"}),Object(s.jsxs)(Se,{children:[Object(s.jsx)("a",{href:E,target:"_blank",rel:"noopener noreferrer","aria-label":"Open In New Tab",title:E,children:Object(s.jsx)(g.m,{color:"white"})}),Object(s.jsx)(g.k,{color:"white","aria-label":"Download Image",onClick:M,title:E})]}),d&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(_e,{color:"white",onClick:F,"aria-label":"Play/Pause"}),!!f&&!!h&&Object(s.jsx)(Ie,{value:h,maxValue:f,onChange:A}),m&&!isNaN(m.duration)&&Object(s.jsx)(Te,{children:Object(w.c)(m.duration)}),E.includes(".gif")&&Object(s.jsx)(Te,{children:"GIF"})]}),R&&Object(s.jsx)(Ee,{onClick:W}),R&&Object(s.jsx)(Me,{onClick:D}),R&&Object(s.jsx)(Ne,{})]})},Ae=n(51),Ve=b.d.video(Fe||(Fe=Object(d.a)(["\n  ","\n  ","\n  grid-area: 1/1/2/2;\n"])),h.j,h.r),He=Object(b.d)(Ve)(ze||(ze=Object(d.a)(["\n  ","\n"])),h.q),Ye=Object(b.d)(Ae.a)(De||(De=Object(d.a)(["\n  ","\n"])),h.q);function Ge(e){var t=e.src,n=e.onLoad,i=void 0===n?u.c:n,o=e.postId,l=e.width,d=e.height,b=Object(a.useState)(null),j=Object(c.a)(b,2),h=j[0],p=j[1],g=Object(a.useState)(Date.now()),f=Object(c.a)(g,2)[1],m=Object(a.useState)(null),v=Object(c.a)(m,2),x=v[0],w=v[1],k=Object(a.useCallback)((function(){h&&h.play();var e=setInterval((function(){f(Date.now())}),34);w(e)}),[h]),y=Object(a.useCallback)((function(){h&&h.pause(),clearInterval(x),w(null)}),[h,x]),C=Object(a.useCallback)((function(){h&&(h.paused?k():y())}),[h,k,y]),L=Object(r.c)(O.v)?"auto":"metadata";return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(He,{controls:!1,loop:!0,preload:L,ref:p,onLoadedMetadata:i,width:l,height:d,src:t}),Object(s.jsx)(We,{mediaRef:h,isPaused:!h||h.paused,currentTime:null===h||void 0===h?void 0:h.currentTime,duration:null===h||void 0===h?void 0:h.duration,postId:o,togglePlay:C,isPlayable:!0})]})}function qe(e){var t=e.src,n=e.thumbnail_src,r=e.onLoad,i=void 0===r?u.c:r,o=e.postId,l=e.width,d=e.height,b=Object(a.useState)(!0),j=Object(c.a)(b,2),O=j[0],h=j[1],p=O?n:t;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(Ye,{src:p,alt:p,loading:"lazy",onLoad:i,width:l,height:d}),Object(s.jsx)(We,{isPlayable:!0,isPaused:O,togglePlay:function(){h(!O)},postId:o})]})}function Be(e){var t=e.src,n=e.onLoad,c=void 0===n?u.c:n,a=e.postId,r=e.width,i=e.height;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(Ye,{src:t,alt:t,onLoad:c,loading:"lazy",width:r,height:i}),Object(s.jsx)(We,{isPlayable:!1,postId:a})]})}var Ue,Ke,Je;function $e(e){var t=e.type,n=e.src,i=e.thumbnail_src,o=e.onLoad,l=e.postId,d=e.width,b=e.height,h=Object(r.c)(Object(O.s)(l)),p=function(e,t){switch(Object(j.e)(e,t)){case u.a.VIDEO:return Ge;case u.a.GIF:return qe;default:return Be}}(t,h),g=Object(a.useMemo)((function(){return Object(j.e)(t,h)===u.a.GIF?[h.small_src.includes(".gif")?i:h.small_src,n.includes(".gif")?n:h.big_src]:[i,n]}),[h,n,i,t]),f=Object(c.a)(g,2),m=f[0],v=f[1];return Object(s.jsx)(p,{src:v,thumbnail_src:m,onLoad:o,postId:l,width:d,height:b})}var Qe=b.d.div((function(e){var t=e.theme;return Object(b.c)(Ue||(Ue=Object(d.a)(["\n    padding-top: ",";\n  "])),t.dimensions.gutter)})),Xe=b.d.div((function(e){var t=e.theme;return Object(b.c)(Ke||(Ke=Object(d.a)(["\n    padding: 0 ",";\n    width: 100%;\n    max-width: ",";\n    margin: auto;\n  "])),t.dimensions.gutter,t.dimensions.bodyWidth)})),Ze=b.d.div((function(e){var t=e.theme;return Object(b.c)(Je||(Je=Object(d.a)(["\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto auto auto;\n    border-radius: ",";\n    ","\n  "])),t.dimensions.borderRadius,Object(h.p)({theme:t}))}));function et(e){var t=e.media_type,n=e.small_src,i=e.big_src,o=e.thumbnail_src,l=e.style,d=e.onLoad,b=void 0===d?u.c:d,h=e.virtualRef,p=e.id,g=e.width,f=e.height,m=e.comments,v=e.has_comments,x=Object(r.b)(),w=Object(le.a)(!0),k=Object(c.a)(w,2),y=k[0],C=k[1],L=Object(r.c)(O.p),I=Object(r.c)(O.D),P=Object(r.c)(O.y),R=Object(a.useMemo)((function(){return Object(j.c)(L,I,i,n)}),[i,L,n,I]);Object(a.useEffect)((function(){b()}),[b,y]),Object(a.useEffect)((function(){!y&&P&&v&&!m&&x(Object(Q.v)(p))}),[y,P,v,m,x,p]);var S=Object(a.useState)("tags"),N=Object(c.a)(S,2),_=N[0],E=N[1];return Object(s.jsx)(Qe,{style:l,ref:h,className:"list-div",children:Object(s.jsx)(Xe,{children:Object(s.jsxs)(Ze,{onClick:C,role:"row",children:[Object(s.jsx)($e,{onLoad:b,type:t,src:R,thumbnail_src:o,postId:p,width:g,height:f}),!y&&Object(s.jsx)(ae,{postId:p,onLoad:b,activeTab:_,setActiveTab:E})]})})})}var tt=n(122),nt=n(123),ct=n(100);function at(e){var t=Object(r.b)();return Object(a.useCallback)((function(){return t(e())}),[e,t])}var rt,it=n(35);function ot(){var e=at(Q.y);return Object(s.jsx)(it.b,{onClick:e,"aria-label":"Search",children:"Search"})}function st(e){var t=e.onChange,n=Object(r.c)(O.a),c=Object(r.c)(O.o);return Object(a.useEffect)((function(){return t()}),[t,n]),c>0?Object(s.jsx)(p.a,{tags:n,detailed:!0}):null}var lt=b.d.section(rt||(rt=Object(d.a)(["\n  ","\n  ","\n  ","\n"])),h.g,h.o,h.c);function dt(e){var t=e.onLoad;return Object(s.jsxs)(lt,{children:[Object(s.jsx)(M.d,{children:Object(s.jsx)("label",{htmlFor:"tag-input",children:"Search"})}),Object(s.jsxs)(ct.a,{children:[Object(s.jsx)(tt.a,{}),Object(s.jsx)(st,{onChange:t}),Object(s.jsx)(nt.a,{}),Object(s.jsx)(ot,{})]})]})}var bt,ut,jt=n(102),Ot=n(116),ht=["Try tapping the little plus in the tag search.","You can exclude tags with the '-' modifier.","Each result will have at least one of your '~' tags.","Check out the settings. There are lots of uesful options there.","Starting a tag search with a * gives more results.","When filtering rated posts, you can configure the minimum score by taping the red number.","You can get more info about a post be tapping it once.","Tapping on a tag below a post adds it to your active tags.","Large gifs and videos can take a while to load in the app. Try clicking the 'Open in new tab' icon in the bottom left corner for faster loading times.","If anything stops working or gets weird. Reset the app in the settings.","I hope you are having a nice day!","If a tag is ambiguous, it will have a little arrow on the right. Tapping it shows related tags.","Tapping the icon in the top left of posts brings you into fullscreen mode.","Searching for nothing returns ALL posts ever made.","Results are sorted chronologically. Newest first.","You can search for safe posts by entering 'rating:safe' in the search field. The same works for questionable and explicit.","You can search for posts from a specific website by entering 'source:*twitter* for example.","You can upvote a post by tapping its score in the details.",'Wanna know more about a post? Enable "Show post metadata" in the options.',"Every time you reload the page, a random tip will be shown here.","You can enable comments in the settings. Not all post have comments though."],pt=Object(b.d)(M.b)((function(e){var t=e.theme;return Object(b.c)(bt||(bt=Object(d.a)(["\n    text-align: center;\n    font-size: 16px;\n    padding: ",";\n    max-width: ",";\n  "])),t.dimensions.hugeSpacing,t.dimensions.bodyWidth)}));function gt(){var e=Object(a.useMemo)((function(){return ht[Math.floor(Math.random()*ht.length)]}),[]);return Object(s.jsx)(pt,{children:e})}var ft=b.d.div((function(e){var t=e.theme;return Object(b.c)(ut||(ut=Object(d.a)(["\n    ","\n    ","\n    align-items: center;\n    max-width: ",";\n    margin: auto;\n\n    height: calc(100vh - 400px);\n    padding: 0 10%;\n  "])),Object(h.g)(),Object(h.h)(t.dimensions.hugeSpacing),t.dimensions.bodyWidth)}));function mt(){return Object(s.jsxs)(ft,{children:[Object(s.jsx)(gt,{}),Object(s.jsx)(Ot.b,{id:"V7V73PWW9",label:"Support Me on Ko-fi"})]})}function vt(){var e=Object(le.a)(),t=Object(c.a)(e,2),n=t[0],a=t[1],i=Object(r.c)(O.f),o=n?i.toLocaleString():Object(w.a)(i);return Object(s.jsxs)(M.d,{onClick:a,children:[o," results"]})}function xt(e){var t=e.onLoad,n=void 0===t?u.c:t,c=e.virtualRef,i=e.style,o=Object(r.c)(O.f);return Object(a.useEffect)((function(){o>0&&n()}),[o,n]),Object(s.jsxs)("div",{onLoad:n,ref:c,style:i,role:"row",children:[Object(s.jsx)(jt.a,{}),Object(s.jsx)(dt,{onLoad:n}),o>0?Object(s.jsx)(vt,{}):Object(s.jsx)(mt,{})]})}var wt,kt,yt,Ct=n(54),Lt=n(99),It=b.d.div((function(e){var t=e.theme;return Object(b.c)(wt||(wt=Object(d.a)(["\n    padding: ",";\n  "])),t.dimensions.gutter)})),Pt=Object(b.d)(ct.a)((function(e){var t=e.theme;return Object(b.c)(kt||(kt=Object(d.a)(["\n    max-width: ",";\n    margin: auto;\n    text-align: center;\n  "])),t.dimensions.bodyWidth)})),Rt=Object(b.d)(Ae.a)(yt||(yt=Object(d.a)(["\n  max-height: 50vh;\n"])));function St(e){var t=e.onLoad,n=void 0===t?u.c:t,c=e.virtualRef,i=e.style,o=Object(r.c)(O.c),l=Object(a.useMemo)((function(){return o.reduce((function(e,t){return e[t.name]=t,e}),{})}),[o]);return Object(s.jsx)(It,{style:i,ref:c,onLoad:n,role:"row",children:Object(s.jsxs)(Pt,{children:[Object(s.jsx)(Rt,{src:Ct.a,alt:"Shironeko does not understand"}),Object(s.jsx)(Lt.a,{}),Object(s.jsx)(M.c,{children:"You have reached the end!"}),Object(s.jsx)("p",{children:"Go look for something else!"}),o.length>0&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("p",{children:"How about some of these?"}),Object(s.jsx)(p.a,{tags:l,detailed:!0})]})]})})}var Nt,_t=n(55),Et=b.d.div(Nt||(Nt=Object(d.a)(["\n  display: grid;\n  place-items: center;\n"])));function Mt(e){var t=e.onLoad,n=void 0===t?u.c:t,c=e.virtualRef,a=e.style;return Object(s.jsx)(Et,{onLoad:n,ref:c,style:a,role:"row",children:Object(s.jsx)(_t.a,{})})}var Tt,Ft,zt,Dt,Wt,At,Vt=n(101),Ht=n(115),Yt=b.d.div((function(e){var t=e.theme;return Object(b.c)(Tt||(Tt=Object(d.a)(["\n    display: grid;\n    grid-template-columns: 1fr auto 1fr;\n    justify-content: center;\n    place-items: center;\n    gap: ",";\n    padding: ",";\n    padding-bottom: 0;\n    max-width: ",";\n    margin: auto;\n  "])),t.dimensions.gutter,t.dimensions.gutter,t.dimensions.bodyWidth)})),Gt=b.d.div(Ft||(Ft=Object(d.a)(["\n  display: flex;\n  place-self: flex-end;\n  gap: 8px;\n"]))),qt=b.d.div(zt||(zt=Object(d.a)(["\n  display: flex;\n  place-self: flex-start;\n  gap: 8px;\n"]))),Bt=Object(b.d)(it.d)(Dt||(Dt=Object(d.a)(["\n  min-width: 50px;\n"]))),Ut=Object(b.d)(Ht.a)(Wt||(Wt=Object(d.a)(["\n  min-width: 50px;\n"])));function Kt(e){var t=e.currentPage,n=e.loadPage,c=Object(r.c)(O.k),i=Object(a.useCallback)((function(e){return n(Number(e))}),[n]),o=Object(a.useCallback)((function(){return n(0)}),[n]),l=Object(a.useCallback)((function(){return n(c)}),[n,c]),d=Object(a.useCallback)((function(){return n(t-1)}),[t,n]),b=Object(a.useCallback)((function(){return n(t+1)}),[t,n]);return Object(s.jsxs)(Yt,{className:"page-navigation",children:[Object(s.jsxs)(Gt,{children:[t>1&&Object(s.jsx)(Bt,{onClick:o,children:"0"}),t>0&&Object(s.jsx)(Bt,{onClick:d,children:t-1})]}),Object(s.jsx)(Ut,{value:t,onSubmit:i}),Object(s.jsxs)(qt,{children:[t<c&&Object(s.jsx)(Bt,{onClick:b,children:t+1}),t<c-1&&Object(s.jsx)(Bt,{onClick:l,children:c})]})]})}var Jt=Object(b.d)(Vt.b)((function(e){var t=e.theme;return Object(b.c)(At||(At=Object(d.a)(["\n    padding-bottom: ",";\n  "])),t.dimensions.gutter)}));function $t(e){var t=e.header,n=e.items,c=e.ItemComponent,r=e.currentPage,o=e.loadPage,l=Object(a.useCallback)((function(e){o(e),document.getElementsByClassName("page-navigation")[0].scrollIntoView()}),[o]);return Object(s.jsxs)(Jt,{children:[t,n&&n.length>0&&Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(Kt,{currentPage:r,loadPage:o}),null===n||void 0===n?void 0:n.map((function(e){return Object(s.jsx)(c,Object(i.a)({},e),e.id)})),Object(s.jsx)(Kt,{currentPage:r,loadPage:l})]})]})}var Qt,Xt=n(114),Zt=n.n(Xt),en=n(31);var tn=b.d.div((function(e){var t=e.theme;return Object(b.c)(Qt||(Qt=Object(d.a)(["\n    position: fixed;\n    width: 100vw;\n    height: 200vh;\n    left: 0;\n    top: 0;\n\n    display: grid;\n    grid-template-columns: 100vw;\n    grid-template-rows: 100vh 40px auto;\n    overflow: auto;\n\n    background: ",";\n\n    z-index: 5;\n\n    scroll-snap-type: y mandatory;\n    //scroll-snap-points-y: 0vh 100vh;\n\n    > * {\n      scroll-snap-align: start;\n    }\n  "])),t.colors.backgroundColor)}));function nn(){var e=Object(r.c)(O.t),t=Object(r.c)(O.p),n=Object(r.c)(O.i),i=Object(r.c)(O.h),o=Object(r.c)(O.g),l=Object(r.c)(O.D),d=at(Q.x),b=Object(a.useState)(null),h=Object(c.a)(b,2),p=h[0],g=h[1];Zt()((function(){o+3>e.length&&d()}),2e3,[o,d,e.length]),Object(a.useEffect)((function(){n&&p&&p!==document.fullscreenElement&&Object(en.a)(p)}),[n,p]);var f,m=Object(a.useState)("tags"),v=Object(c.a)(m,2),x=v[0],w=v[1],k=at(Q.u);if(f=k,Object(a.useEffect)((function(){var e=function(e){console.log(document.fullscreenElement),document.fullscreenElement||f()};return document.addEventListener("fullscreenchange",e),function(){document.removeEventListener("fullscreenchange",e)}}),[f]),!n)return null;var y=i.media_type,C=i.small_src,L=i.big_src,I=i.thumbnail_src,P=i.id,R=i.width,S=i.height,N=Object(j.c)(t,l,L,C);return Object(s.jsxs)(tn,{ref:g,children:[Object(s.jsx)($e,{onLoad:u.c,type:y,src:N,thumbnail_src:I,postId:P,width:R,height:S}),Object(s.jsx)(ae,{postId:P,activeTab:x,setActiveTab:w})]})}function cn(){var e=Object(a.useState)(!1),t=Object(c.a)(e,2),n=t[0],i=t[1],o=Object(r.c)(O.t),d=Object(r.c)(O.j),b=Object(r.c)(O.x),j=Object(r.c)(O.r),h=Object(r.c)(O.q),p=Object(r.b)(),g=at(Q.x),f=Object(a.useCallback)((function(e){return p(Object(Q.y)(e))}),[p]);return document.title="R34 React",Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(nn,{}),b===u.f.INFINITE_COLUMN?Object(s.jsx)(l,{Header:xt,OutOfItems:St,items:o,LoadingItem:Mt,hasMoreRows:d,ItemComponent:et,loadMore:g,isLoading:n,setLoading:i}):Object(s.jsx)($t,{header:Object(s.jsx)(xt,{}),pageSize:j,currentPage:h,hasMorePages:d,loadPage:f,ItemComponent:et,isLoading:n,setLoading:i,items:o})]})}}}]);
//# sourceMappingURL=8.37904f26.chunk.js.map