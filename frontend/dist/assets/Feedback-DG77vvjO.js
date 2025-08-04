import{c as i,j as e,f as n,U as h}from"./index-D_DsbWCf.js";/**
 * @license lucide-react v0.532.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],k=i("circle-check",j);/**
 * @license lucide-react v0.532.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],y=i("circle-x",m);/**
 * @license lucide-react v0.532.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],x=i("info",f);function u({children:r,title:t,message:c,variant:a="default",showIcon:l=!0,icon:d,iconSize:s=24}){return e.jsxs("div",{className:`oyk-alert oyk-alert-variant-${a}`,children:[l&&e.jsx("div",{className:"oyk-alert-icon",children:d?e.jsx(d,{size:s}):a==="danger"?e.jsx(y,{size:s}):a==="warning"?e.jsx(n,{size:s}):a==="success"?e.jsx(k,{size:s}):e.jsx(x,{size:s})}),e.jsxs("div",{className:"oyk-alert-content",children:[t&&e.jsx("p",{className:"oyk-alert-content-title",children:t}),c&&e.jsx("p",{className:"oyk-alert-content-message",children:c}),r]})]})}function p({name:r="",abbr:t="",src:c,icon:a=h,size:l=64,bgColor:d="var(--oyk-c-primary)",fgColor:s="var(--oyk-c-primary-fg)",borderColor:o="var(--oyk-card-bg)"}){return e.jsx("div",{className:"oyk-avatar",style:{backgroundColor:c?o:d,borderColor:o,color:s,width:l,height:l},children:c?e.jsx("img",{src:c,alt:r,className:"oyk-avatar-img"}):t||r?e.jsx("span",{className:"oyk-avatar-abbr",style:{fontSize:l*.25},children:t||r.charAt(0).toUpperCase()}):e.jsx("span",{className:"oyk-avatar-icon",children:e.jsx(a,{size:l*.5})})})}function g({children:r,title:t,message:c,variant:a="default",showIcon:l=!0,icon:d,iconSize:s=64,ghost:o=!1}){return e.jsxs("div",{className:`oyk-feedback oyk-feedback-variant-${a} ${o?"oyk-feedback-ghost":""}`,children:[l&&e.jsx("div",{className:"oyk-feedback-icon",children:d?e.jsx(d,{size:s}):a==="danger"?e.jsx(y,{size:s}):a==="warning"?e.jsx(n,{size:s}):a==="success"?e.jsx(k,{size:s}):e.jsx(x,{size:s})}),e.jsxs("div",{className:"oyk-feedback-content",children:[t&&e.jsx("p",{className:"oyk-feedback-content-title",children:t}),c&&e.jsx("p",{className:"oyk-feedback-content-message",children:c}),r&&e.jsx("div",{className:"oyk-feedback-content-children",children:r})]})]})}export{u as O,g as a,p as b};
