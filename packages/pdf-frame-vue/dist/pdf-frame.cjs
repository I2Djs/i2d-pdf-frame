"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const m=require("i2djs"),c=require("vue"),A=["i-g","i-group","i-circle","i-line","i-path","i-ellipse","i-polygon","i-polyline","i-rect","i-text","i-image","i-page","i-linearGradient","i-radialGradient","i-page-template","i-animate","i-animatePath"];function I(r){const u={},o={},a={},{render:h}=c.createRenderer({patchProp(e,t,n,i,l,b,d,w,C){x(t)(e,i)},insert:(e,t,n)=>{t||(t=r),!(!e||!t||!t.child)&&(e instanceof m.canvasGradient||(e.nodeName==="animate"?(e.parent=t,c.nextTick().then(()=>{t.animateTo(e,e.from)})):e.nodeName==="animatePath"?(e.parent=t,c.nextTick().then(()=>{t.animatePathTo(e,e.from)})):t.child([e])))},remove:e=>{e!=null&&e.remove()},createElement:(e,t,n,i)=>{var C,S,T;const l=e.split("-").slice(1).join("-");let b=A.indexOf(e),d=null,w=r.ctx.type_;switch(b===-1&&console.warn(`Unknown PDF-Frame tag: ${e}`),l){case"page-template":if(w!=="pdf")return console.warn("page-template element is invalid in canvas context"),null;d=r.createTemplate(),o[i.id]=d;break;case"page":if(w!=="pdf")return console.warn("Page element is invalid in canvas context"),null;d=r.addPage();break;case"linearGradient":d=m.createLinearGradient(),a[i.id]=d;break;case"radialGradient":d=m.createRadialGradient(),a[i.id]=d;break;case"animate":d=f(i),i.from&&(d.from={attr:{...i.from,style:null},style:((C=i.from)==null?void 0:C.style)??{}});break;case"animatePath":d=s(i),i.from&&(d.from={attr:{d:((S=i==null?void 0:i.from)==null?void 0:S.d)??"",style:null},style:((T=i.from)==null?void 0:T.style)??{}});break;default:d=g(l,i);break}return d},createText:e=>{},createComment:e=>{},setText:(e,t)=>{},setElementText:(e,t)=>{},parentNode:e=>e&&e.dom.parent?e.dom.parent:null,nextSibling:e=>(t,n)=>{},querySelector:e=>r.fetchEl(e)||null}),x=e=>(t,n)=>{if(typeof n=="function"&&(n=n(t)),e!=="style")if(e==="src"&&!u[n])u[n]=r.createAsyncTexture({attr:{src:n}}),u[n].then(i=>{u[n]=i.exportAsDataUrl(),t.setAttr(e,u[n])});else if(e==="src"&&u[n])t.setAttr(e,u[n]);else if(e==="text"&&n)t.text(n);else if(e==="p-template"&&t instanceof m.canvasNodeExe)t.addTemplate(o[n]);else if(e==="event")for(let i in n)t.on&&t.on(i,n[i]);else e==="block"?t.block=!0:e==="data"?t.data(n):e==="transform"?t.setAttr(e,p(n)):e==="bbox"?t.bbox=n:t.setAttr(e,n);else for(let i in n){let l=n[i];if(typeof l=="function"&&(l=l(t)),(i==="fillStyle"||i==="strokeStyle")&&typeof l=="string"&&l.startsWith("grad")){const b=l.match(/\(([^)]+)\)/)[1];l=y(b)}t.setStyle(i,l)}};function g(e,t){return new m.canvasNodeExe(r.ctx,{el:e==="group"?"g":e,attr:{},style:{},bbox:t&&t.bbox!==void 0?t.bbox:!0},Math.round(Math.random()*1e7),0)}function p(e){if(typeof e=="object"&&!Array.isArray(e)&&e!==null)return e;const t={};for(const n in e=e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)){const i=e[n].match(/[\w\.\-]+/g);t[i.shift()]=i.map(l=>parseFloat(l))}return t}function y(e){return a[e]}function f(e){var t;return{nodeName:"animate",attr:{...(e==null?void 0:e.to)??{},style:null},style:((t=e==null?void 0:e.to)==null?void 0:t.style)??{},duration:e.duration||0,ease:e.ease||"default",loop:e.loop||0,end:e.end||null,delay:e.delay||0,direction:e.direction||"default",setAttr:function(n,i){},setStyle:function(n,i){},remove:function(){this.parent.interrupt()}}}function s(e){var t,n;return{nodeName:"animatePath",attr:{d:((t=e==null?void 0:e.to)==null?void 0:t.d)??"",style:null},style:((n=e==null?void 0:e.to)==null?void 0:n.style)??{},duration:e.duration||0,ease:e.ease||"default",loop:e.loop||0,end:e.end||null,delay:e.delay||0,direction:e.direction||"default",setAttr:function(i,l){},setStyle:function(i,l){},remove:function(){this.parent.interrupt()}}}return h}const O=c.defineComponent({props:{type:{type:String,required:!0,default:"pdf"},id:{type:String,required:!0,default:"pdf-frame-id"},height:{type:Number,required:!1,default:0},width:{type:Number,required:!1,default:0},layerSetting:{type:Object,required:!1,default:()=>{}},onUpdate:{type:Function,required:!1,default:()=>{}},config:{type:Object,required:!1,default:()=>{}},info:{type:Object,required:!1,default:()=>{}},encryption:{type:Object,required:!1,default:()=>{}}},emits:["on-resize","on-ready","on-update"],setup(r,u){let o,a=null;const h=c.getCurrentInstance();c.onMounted(()=>{c.nextTick().then(()=>{const f=u.slots.default;a||(r.type==="pdf"||r.type==="pdf-blob"?a=g(r):r.type==="canvas"?a=p(r):console.warn(`Unknown render context: ${r.type}`)),a&&a.onResize&&a.onResize(()=>{u.emit("on-resize",{height:a.height,width:a.width})}),a&&a.onChange&&a.onChange(t=>{a&&a.container&&a.container.tagName==="IFRAME"&&a.container.setAttribute("src",t),r.onUpdate&&y(t)});const s=I(a),e=c.h(x,f);s(e,a),u.emit("on-ready",a)})}),c.onUnmounted(()=>{a&&(a.destroy(),a=null)}),c.watch(()=>r.encryption,f=>{a.setConfig&&a.setConfig({encryption:f})},{deep:!0}),c.watch(()=>r.info,f=>{a.setConfig&&a.setConfig({info:f})},{deep:!0}),c.watch(()=>r.config,f=>{a.setConfig&&a.setConfig({...f})},{deep:!0});const x=c.defineComponent({setup(f,s){const e=c.getCurrentInstance();e.parent=h,e.appContext=h.appContext,e.root=h.root,e.provides=h.provides;const t=s.slots.default;return()=>c.h(c.Fragment,t())}});function g(f){let s=document.getElementById(o.props.id);return m.pdfLayer(s,{height:f.height,width:f.width,...f.config||{},info:f.info||{},encryption:f.encryption||{}},{autoUpdate:!0,onUpdate:t=>{s.tagName==="IFRAME"&&s.setAttribute("src",t),f.onUpdate&&y(t)}})}function p(f){let s=document.getElementById(o.props.id);return m.canvasLayer(s,f.config,{...f.layerSetting})}switch(r.type){case"pdf":o=c.h("iframe",{id:r.id,class:"pdfIframe renderOutput",type:"application/pdf",src:null,style:{height:"100%",width:"100%"}});break;case"pdf-blob":o=c.h("div",{id:r.id,class:"renderOutput",style:{height:"100%",width:"100%"}});break;case"canvas":o=c.h("div",{id:r.id,class:"renderOutput",style:{height:r.height?r.height+"px":"100%",width:r.width?r.width+"px":"100%"}});break;case"default":o=c.h("iframe",{id:r.id,class:"pdfIframe renderOutput",type:"application/pdf",src:null,style:{height:"100%",width:"100%"}});break}function y(f){u.emit("on-update",f)}return()=>o}});exports.default=O;
