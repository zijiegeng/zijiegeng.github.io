import{f as _,a4 as u,e as s,g as t,t as o,T as c,F as h,aj as f,z as g,o as a,ad as v,d as x,j as b}from"../modules/vue-B4QAKlIR.js";import{a as y,u as N,o as d}from"../index-DrKhBKue.js";import{_ as k}from"./NoteDisplay.vue_vue_type_style_index_0_lang-CxX9iHfF.js";import"../modules/shiki-DVNyJe3i.js";const T={id:"page-root"},w={class:"m-4"},L={class:"mb-10"},V={class:"text-4xl font-bold mt-2"},j={class:"opacity-50"},B={class:"text-lg"},H={class:"font-bold flex gap-2"},S={class:"opacity-50"},z={key:0,class:"border-main mb-8"},A=_({__name:"print",setup(C){const{slides:m,total:p}=y();u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),N({title:`Notes - ${d.title}`});const i=g(()=>m.value.map(e=>e.meta?.slide).filter(e=>e!==void 0&&e.noteHTML!==""));return(e,n)=>(a(),s("div",T,[t("div",w,[t("div",L,[t("h1",V,o(c(d).title),1),t("div",j,o(new Date().toLocaleString()),1)]),(a(!0),s(h,null,f(i.value,(l,r)=>(a(),s("div",{key:r,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",B,[t("div",H,[t("div",S,o(l?.no)+"/"+o(c(p)),1),v(" "+o(l?.title)+" ",1),n[0]||(n[0]=t("div",{class:"flex-auto"},null,-1))])]),x(k,{"note-html":l.noteHTML,class:"max-w-full"},null,8,["note-html"])]),r<i.value.length-1?(a(),s("hr",z)):b("v-if",!0)]))),128))])]))}});export{A as default};
