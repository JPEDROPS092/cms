(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{559:function(t,e,r){"use strict";r.r(e);var n=r(224),o=r(455),c=r(450),v=r(464),l=r(205),_=r(203),d=r(131),m=r(204),h=r(83),f=r(109),w=r(445),P=r(31),C=(r(112),r(48),{data:function(){return{recentPosts:[]}},fetch:function(){var t=this;return Object(P.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.$get("/posts");case 3:r=e.sent,t.recentPosts=r.slice(0,5),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Erro ao buscar posts:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},methods:{formatDate:function(t){return new Date(t).toLocaleDateString("pt-BR")}}}),x=r(95),component=Object(x.a)(C,(function(){var t=this,e=t._self._c;return e("div",[e(o.a,{staticClass:"mb-5"},[e(c.d,{staticClass:"headline"},[t._v("\n      Bem-vindo ao Sistema de Gerenciamento de Conteúdo\n    ")]),t._v(" "),e(c.c,[e("p",[t._v("Este é um sistema simples de CMS desenvolvido com:")]),t._v(" "),e(_.a,{attrs:{dense:""}},[e(d.a,[e(f.a,[e(l.a,{attrs:{color:"primary"}},[t._v("mdi-server")])],1),t._v(" "),e(h.a,[e(h.c,[t._v("Backend: FastAPI e SQLAlchemy")])],1)],1),t._v(" "),e(d.a,[e(f.a,[e(l.a,{attrs:{color:"primary"}},[t._v("mdi-vuejs")])],1),t._v(" "),e(h.a,[e(h.c,[t._v("Frontend: Nuxt.js e Vuetify (Material Design)")])],1)],1)],1)],1),t._v(" "),e(c.a,[e(w.a),t._v(" "),e(n.a,{attrs:{color:"primary",text:"",to:"/posts"}},[t._v("\n        Ver Posts\n      ")]),t._v(" "),e(n.a,{attrs:{color:"primary",to:"/posts/new"}},[t._v("\n        Criar Novo Post\n      ")])],1)],1),t._v(" "),t.recentPosts.length>0?e(o.a,[e(c.d,[t._v("Posts Recentes")]),t._v(" "),e(c.c,[e(_.a,{attrs:{"two-line":""}},t._l(t.recentPosts,(function(r){return e(d.a,{key:r.id,attrs:{to:"/posts/".concat(r.id)}},[e(h.a,[e(h.c,{domProps:{textContent:t._s(r.title)}}),t._v(" "),e(h.b,[e(v.a,{staticClass:"mr-2",attrs:{"x-small":"",color:r.published?"success":"grey"}},[t._v("\n                "+t._s(r.published?"Publicado":"Rascunho")+"\n              ")]),t._v("\n              "+t._s(t.formatDate(r.created_at))+"\n            ")],1)],1),t._v(" "),e(m.a,[e(l.a,[t._v("mdi-chevron-right")])],1)],1)})),1)],1)],1):e(o.a,[e(c.c,{staticClass:"text-center"},[e("p",[t._v("Nenhum post encontrado. Comece criando um novo post!")]),t._v(" "),e(n.a,{staticClass:"mt-3",attrs:{color:"primary",to:"/posts/new"}},[t._v("\n        Criar Primeiro Post\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);