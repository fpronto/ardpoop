(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,function(t,e){t.exports={dns:"http://localhost",port:9e3}},,,,,,,function(t,e,a){t.exports=a.p+"static/media/logo.e6a7f2e3.svg"},function(t,e,a){t.exports=a.p+"static/media/poop_happy.4213c2be.svg"},function(t,e,a){t.exports=a.p+"static/media/poop_sad.b6913af0.svg"},function(t,e,a){t.exports=a.p+"static/media/poop_toxicity.62dab8ec.svg"},,,,function(t,e,a){t.exports=a(36)},,,,,,function(t,e,a){},function(t,e,a){},,,function(t,e,a){},function(t,e,a){},,,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(1),o=a.n(n),r=a(7),c=a.n(r),s=(a(24),a(8)),i=a(9),l=a(16),u=a(10),p=a(17),d=(a(25),a(3)),m=a.n(d),f=a(5),v=function(){var t=Object(f.a)(m.a.mark(function t(e){var a,n,o;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={method:"GET",headers:{"Content-Type":"application/json"},mode:"cors",cache:"default"},t.next=3,fetch(e,a);case 3:return n=t.sent,t.prev=4,t.next=7,n.json();case 7:return o=t.sent,t.abrupt("return",{json:o,data:n});case 11:return t.prev=11,t.t0=t.catch(4),t.abrupt("return",t.t0);case 14:case"end":return t.stop()}},t,null,[[4,11]])}));return function(e){return t.apply(this,arguments)}}(),h=function(){var t=Object(f.a)(m.a.mark(function t(e,a){var n,o,r;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"PUT",headers:{"Content-Type":"application/json"},mode:"cors",cache:"default",body:JSON.stringify(a)},t.next=3,fetch(e,n);case 3:return o=t.sent,t.prev=4,t.next=7,o.json();case 7:return r=t.sent,t.abrupt("return",{json:r,data:o});case 11:return t.prev=11,t.t0=t.catch(4),t.abrupt("return",t.t0);case 14:case"end":return t.stop()}},t,null,[[4,11]])}));return function(e,a){return t.apply(this,arguments)}}(),g=a(11),x=a.n(g),E=(a(28),function(t){return o.a.createElement("div",{className:"header"},o.a.createElement("img",{src:x.a,alt:"logo"}))}),b=a(12),y=a.n(b),w=a(13),j=a.n(w),N=(a(29),function(t){var e=t.status;return o.a.createElement("div",{className:"indicator"},o.a.createElement("img",{src:e?j.a:y.a,className:"App-logo",alt:"logo"}),o.a.createElement("span",{className:"indicator-text"},e?"Houston, we have a problem":"You can go now"))});N.defaultProps={};var S=N,k=a(15),I=(a(32),a(33),function(t){var e=t.top,a=t.cb;return o.a.createElement("div",{className:"table"},o.a.createElement(k.a,{data:e,columns:[{Header:"Name",accessor:"user",style:{textAlign:"left",fontSize:"20px"}},{Header:"Average(pups)",accessor:"average",style:{textAlign:"right",fontSize:"20px"}},{Header:"Top(pups)",accessor:"top",style:{textAlign:"right",fontSize:"20px"}},{Header:"Date",accessor:"date",style:{textAlign:"right",fontSize:"20px"}}],pageSize:"10",showPagination:!1,defaultSortMethod:function(t,e,a){return e-t},getTdProps:function(t,e,n,o){return{onClick:function(t,n){a(e.original)}}}}))});I.defaultProps={};var O=I,A=a(14),P=a.n(A),T=(a(34),function(t){var e=t.smellValue,a="smell-indicator-value";return a+=e<30?" green":e<60?" yellow":e<100?" orange":" red",o.a.createElement("div",{className:"smell-indicator"},o.a.createElement("div",{className:"smell-indicator-icon"},o.a.createElement("img",{src:P.a,alt:"toxicity"})),o.a.createElement("div",{className:"smell-indicator-text"},o.a.createElement("span",{className:"smell-indicator-label"},"Toxicity:"),o.a.createElement("span",{className:a},e)))});T.defaultProps={};var z=T,C=(a(35),function(t){var e=t.cb;return o.a.createElement("div",{className:"form"},o.a.createElement("input",{id:"name-input",type:"text",className:"form-input"}),o.a.createElement("button",{onClick:function(){var t=document.getElementById("name-input");e({name:t.value})}},"Insert Name"))});C.defaultProps={};var H=C,V=a(4),G=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(l.a)(this,Object(u.a)(e).call(this))).state={status:!1,top:[],smellValue:0,id:null},t.loadInfo=function(){var e=t.state,a=e.status,n=e.toxicity;v("".concat(V.dns,":").concat(V.port,"/api/v1/status")).then(function(e){a!==e.json.data.status&&t.setState({status:e.json.data.status})}).catch(function(){console.log("Error Getting bathroom Status")}),v("".concat(V.dns,":").concat(V.port,"/api/v1/toxicity")).then(function(e){var a=parseInt(e.json.data.toxicity,10);n!==a&&t.setState({smellValue:a})}).catch(function(){console.log("Error Getting bathroom Status")})},t}return Object(p.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=v("".concat(V.dns,":").concat(V.port,"/api/v1/top")),a=this.state.top;e.then(function(e){e.json.data.top&&a!==e.json.data.top&&t.setState({top:e.json.data.top})}).catch(function(){console.log("Error Getting bathroom Status")}),this.loadInfo(),setInterval(this.loadInfo,1e3)}},{key:"render",value:function(){var t,e=this,a=this.state,n=a.status,r=a.top,c=a.smellValue,s=a.change,i=a.id;return t=s?o.a.createElement(H,{cb:function(t){var a=h("".concat(V.dns,":").concat(V.port,"/api/v1/session/").concat(i,"/owner"),t);console.log(a),a.then(function(t){200===t.data.status&&e.setState({change:!1,id:null,top:t.json.data.top})})}}):o.a.createElement(O,{top:r,cb:function(t){t.lock||e.setState({change:!0,id:t.id})}}),o.a.createElement("div",{className:"App"},o.a.createElement(E,null),o.a.createElement(z,{smellValue:c}),o.a.createElement(S,{status:n}),t)}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[18,1,2]]]);
//# sourceMappingURL=main.5d50a694.chunk.js.map