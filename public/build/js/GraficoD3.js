const proyectoParams=new URLSearchParams(window.location.search),proyecto=Object.fromEntries(proyectoParams.entries());let tagsFiltro=["-1"],idiomaSeleccionado="es";const dims={height:700,width:500};let res,origen,setColor=!1,grafico=1;margin={top:10,right:100,bottom:0,left:100};var url=window.location.href;const urlParams=new URLSearchParams(window.location.search),gr=Object.fromEntries(proyectoParams.entries());var idxd=gr.id;function insertargrafo(t,e){const a=function(){const t=document.querySelectorAll(".activo"),e=[];return t.forEach((function(t){e.push(t.id)})),e}();if(tagsFiltro[0]=!1){t.flatMap(t=>t.asignaturas.filter(t=>a.includes(t.cursoID)&&(!t.tags||t.tags.find(t=>tagFiltro.includes(t))))).map(t=>r(t))}else v=t.flatMap(t=>t.asignaturas.filter(t=>a.includes(t.cursoID))).map(t=>r(t));function r(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}function n(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.sigla;const a=t.info[0];if(a&&a.nombre)return a.sigla}return t.asignatura}dx=3*d3.max(v,t=>t.length)+d3.max(v,t=>t.length)/1,height=(t.flatMap(t=>t.asignaturas).length-1)*step+margin.top+margin.bottom;const o=t.flatMap(t=>t.asignaturas.map(e=>{const a=n(e),o=n(e);return{id:e.id,sigla:a,nombre:r(e),semestre:e.semestre,sourceLinks:[],targetLinks:[],group:e.cursoID,sigla2:o,tags:e.tags,curso:t.numero}})),s=[];for(let t=0;t<o.length;t++)for(let e=t+1;e<o.length;e++){const a=o[t].tags.map(t=>t.descripcion),r=o[e].tags.map(t=>t.descripcion);a.filter(t=>r.includes(t)).length>0&&s.push({source:o[t],target:o[e]})}const i=new Map(o.map(t=>[t.id,t])),c=t.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:i.get(t.id_asignatura1),target:i.get(t.id_asignatura2),value:t.descripcion})))).filter(t=>void 0!==t.target);for(const t of c){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}const l={nodes:o,links:c};escalax=d3.scaleLinear().domain([0,dx]).range([0,margin.left]),d3.select(".panel").select("svg").remove(),d3.select(".canvas").select("svg").remove(),d3.select;const d=d3.select(".panel").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet"),u=d3.select(".canvas").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet");u.append("style").text("\n    .hover path {\n      stroke: transparent;\n      \n      \n    }\n    .hover marker-end{\n      stroke: transparent;\n    }\n    .hover text {\n      fill: #ccc;\n    }\n    .hover g.primary text {\n      fill: black;\n      font-weight: bold;\n    }\n    .hover g.secondary text {\n      fill: #333;\n      opacity: 1;\n    }\n    .hover path.primary {\n      stroke: #333;\n      stroke-opacity: 1;\n      \n    }\n    .hover  path.secondary {\n    \n      opacity: 0.3;\n    }\n\n   .hover  path:not(.primary):not(.secondary) {\n      marker-end: none;\n    }\n  ");const p=u.append("g"),g=d3.scalePoint().domain(l.nodes.map(t=>t.id).sort(d3.ascending)).range([margin.top,height-margin.bottom]);if(!setColor){color=d3.scaleOrdinal().domain(l.nodes.map(t=>t.group).sort(d3.ascending)).range(d3.schemeCategory10),setColor=!0;document.querySelectorAll(".filter-button").forEach(t=>{const e=t.id,a=color(e);t.style.backgroundColor=a})}const f=p.append("g").attr("font-family","sans-serif").attr("font-size",8).attr("text-anchor","end").selectAll("g").data(l.nodes).enter().append("g").attr("transform",t=>`translate(${t.x=dx}, ${t.y=g(t.id)})`).attr("año",t=>t.curso);f.append("text").attr("x",-6).attr("class","prueba").attr("dy","0.35em").attr("fill",t=>d3.lab(color(t.group)).darker(2)).text(t=>t.nombre),f.append("circle").attr("r",3).attr("fill",t=>color(t.group));const m=p.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(l.links).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?color(t.source.group):color(t.target.group)).attr("d",(function(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`})).attr("transform",`translate(${dx-margin.left},0)`).attr("marker-end",t=>`url(#arrow-${t.source.group}-${t.target.group})`);m.each((function(t){const e=t.source.group===t.target.group?color(t.source.group):color(t.target.group);p.append("defs").append("marker").attr("id",`arrow-${t.source.group}-${t.target.group}`).attr("viewBox","0 0 10 10").attr("refX",16).attr("refY",5).attr("markerWidth",5).attr("markerHeight",5).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("fill",e)}));const h=p.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(s).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?color(t.source.group):color(t.target.group)).attr("d",(function(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`})).attr("transform",`translate(${dx-margin.left},0)`),y=p.append("g").attr("fill","none").attr("pointer-events","all").selectAll("rect").data(l.nodes).enter().append("rect").attr("width",margin.left+40).attr("height",step).attr("y",t=>g(t.id)-step/2).attr("x",dx-margin.left).on("mouseover",(function(t){u.classed("hover",!0),f.classed("primary",e=>e===t),f.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),m.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{u.classed("hover",!1),f.classed("primary",!1),f.classed("secondary",!1),m.classed("primary",!1).order()}).on("click",(function(t){miFuncionExterna(t,d,color,s)}));if(1==grafico)imprimirTodosNodos(e,d,color);else if(2==grafico)imprimirNodos(e,d,color);else if(3==grafico)updateGraph(u,o,f,m,h,y,p,dims,margin,(function(t){return`M${t.source.x},${t.source.y} L${t.target.x},${t.target.y}`}));else if(4==grafico){disperseCanvas();const t=928,a=10,n=10,o=10,s=40;var x=[];radius=t/6,e.anoCurso.forEach(t=>{const e={...t,id:t.id};x.push(e)});const i=x.flatMap(t=>t.asignaturas.map(t=>t.id)),c=x.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:t.id_asignatura1,target:t.id_asignatura2,value:t.descripcion})).filter(t=>i.includes(t.source)&&i.includes(t.target))));var v=x.flatMap(t=>t.asignaturas);function b(t,e,a){return t.map(t=>{const{id:r,numero:n,descripcion:o,asignaturas:s}=t;return{name:n+" "+o,children:k(s,e,a),group:r,padre:!0}})}function r(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.sigla;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}function k(t,e,a){return t.map(t=>{const{relaciones:n,id:o,asignatura:s,descripcion:i,cursoID:c}=t;nombre=r(t);return{name:nombre,"descripción":i,id:o,padre:!0,children:w(o,e,a),group:c}})}function w(t,e,a){const n=[],o=new Set;return e.filter(e=>e.source===t).forEach(t=>{const{target:s,value:i}=t;var c=function(t,e){const a=e.find(e=>e.id===t);return a||null}(s,a);const l={name:r(c),value:1,group:c.cursoID,padre:!0,children:w(c.id,e,v)};o.has(l.name)||(n.push(l),o.add(l.name))}),n}const l=function(t,e,a){const{nombreCurso:r,universidadCurso:n,anoCurso:o}=t;return{name:r,children:b(o,e,a)}}(e,c,v),p=d3.hierarchy(l);p.each(t=>t.current=t);const g=10,f=(t-n-s)/(1+p.height),m=d3.tree().nodeSize([g,f]),h=d3.linkHorizontal().x(t=>t.y).y(t=>t.x);d.attr("width",t).attr("height",700).attr("viewBox",[-s,-a,t,g]).attr("style","max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");const y=d.append("g").attr("fill","none").attr("stroke","#555").attr("stroke-opacity",.4).attr("stroke-width",1.5),$=d.append("g").attr("cursor","pointer").attr("pointer-events","all");return p.x0=f/2,p.y0=0,p.each(t=>{t.x0=t.x,t.y0=t.y}),p.descendants().forEach((t,e)=>{t.id=e,t._children=t.children,t.depth&&7!==t.data.name.length&&(t.children=null)}),p.x0=f/2,p.y0=0,function e(r,n=p){const i=r&&r.altKey?2500:250,c=p.descendants().reverse(),l=p.links();m(p),p.eachBefore(t=>{void 0!==t.x&&void 0!==t.y&&(t.x0=t.x,t.y0=t.y)});let d=p,g=p;p.eachBefore(t=>{t.x<d.x&&(d=t),t.x>g.x&&(g=t)});const f=g.x-d.x+a+o,x=u.transition().duration(i).attr("height",f).attr("viewBox",[-s,d.x-a,t,f]).tween("resize",window.ResizeObserver?null:()=>()=>u.dispatch("toggle")),v=$.selectAll("g").data(c,t=>t.id),b=v.enter().append("g").attr("class","node").attr("transform",t=>`translate(${void 0!==n.y0?n.y0:n.parent?n.parent.y0:0},${void 0!==n.x0?n.x0:n.parent?n.parent.x0:0})`).attr("fill-opacity",0).attr("stroke-opacity",0).on("click",(t,a)=>{t.children?(t._children=t.children,t.children=null):(t.children=t._children,t._children=null),e(a,t)});b.append("circle").attr("r",2.5).attr("fill",t=>t._children?"#555":"#999").attr("stroke-width",10),b.append("text").attr("dy","0.31em").attr("x",t=>t._children?-6:6).attr("text-anchor",t=>t._children?"end":"start").text(t=>t.data&&t.data.name?t.data.name:(console.log(`Node ${t.id} has undefined data or name"`),"prueba")).attr("stroke-linejoin","round").attr("stroke-width",3).attr("stroke","white").attr("paint-order","stroke"),v.merge(b).transition(x).attr("transform",t=>`translate(${t.y},${t.x})`).attr("fill-opacity",1).attr("stroke-opacity",1),v.exit().transition(x).remove().attr("transform",t=>(console.log(`Exiting node ${t.id}: translate(${n.y},${n.x})`),`translate(${n.y},${n.x})`)).attr("fill-opacity",0).attr("stroke-opacity",0);const k=y.selectAll("path").data(l,t=>t.target.id),w=k.enter().append("path").attr("d",t=>{const e={x:n.x0,y:n.y0};return h({source:e,target:e})}).attr("stroke",t=>color(t.target.data.group));k.merge(w).transition(x).attr("d",t=>h(t)),k.exit().transition(x).remove().attr("d",t=>{const e={x:n.x,y:n.y};return h({source:e,target:e})}),p.eachBefore(t=>{t.x0=t.x,t.y0=t.y})}(null,p),d.node()}u.node()}function updateGraph(t,e,a,r,n,o,s,i,c,l){disperseGrafico();const d=t.transition().duration(750);o.on("click",t=>{mostrarGrafico(t,data)});const u=e.reduce((t,e)=>(t[e.curso]||(t[e.curso]=[]),t[e.curso].push(e),t),{}),p=Object.entries(u),g=Object.keys(u).length,f=i.width/g;p.map(([t,e])=>e.length*f);totalWidth=g*f,offsetX=(i.width+150-totalWidth)/2,additionalYOffset=20,p.forEach(([t,e],a)=>{size=e.length,e.forEach((t,e)=>{offsetX=(i.width+150-f)/size,t.y=70*a+additionalYOffset,t.x=70*e+offsetX+10})}),a.transition().delay((t,e)=>20*e).attrTween("transform",t=>{const e=t.x,a=t.y;return t=>`translate(${e},${a})`}),a.select("text").text(t=>t.sigla),t.attr("viewBox",[0,0,i.width,i.height]),s.call(d3.zoom().on("zoom",(function(t){s.attr("transform",t.transform)}))),r.transition(d).delay((t,e)=>20*e).attr("d",l).attr("transform",`translate(${100-c.left},0)`).attr("marker-end",t=>`url(#arrow-${t.source.group}-${t.target.group})`),n.transition(d).delay((t,e)=>20*e).attr("d",l).attrTween("transform",t=>t=>"translate(100,0)").delay((t,e)=>20*e).attr("d",l).attr("transform",`translate(${100-c.left},0)`).attr("marker-end",t=>`url(#arrow-${t.source.group}-${t.target.group})`),o.transition(d).delay((t,e)=>20*e).attr("y",t=>t.y-step/2).attr("x",t=>t.x-c.left)}function miFuncionExterna(t,e,a,r){e.selectAll(".node").remove(),e.selectAll(".link").remove(),e.selectAll(".label").remove(),e.selectAll(".group-node").remove(),e.append("style").text("\n    .hover path {\n      stroke: transparent;\n    }\n    .hover text {\n      fill: #ccc;\n    }\n    .hover g.primary text {\n      fill: black;\n      font-weight: bold;\n    }\n    .hover g.secondary text {\n      fill: #333;\n    }\n    .hover path.primary\n     {\n      stroke: #333;\n      stroke-opacity: 1;\n    }\n  ");e.attr("viewBox",[0,0,500,700]);const n=e.append("g"),o=d3.zoom().scaleExtent([.1,Math.min(500,700)]).on("zoom",()=>{n.attr("transform",d3.event.transform),this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale))),this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)))});e.call(o);const s=r.filter(e=>e.source.id===t.id||e.target.id===t.id);var i=t.sourceLinks,c=t.targetLinks,l=i.concat(c).concat(s),d=new Set;l.forEach((function(t){d.add(t.source),d.add(t.target)}));var u=t.id,p=new Set;l.forEach((function(t){t.source.id===u&&p.add(t.target.group),t.target.id===u&&p.add(t.source.group)}));var g=[],f=0,m=p.size,h=2*Math.PI/m;p.forEach((function(t){var e=f*h,a=200*Math.cos(e),r=200*Math.sin(e);g.push({id:t,group:t,x:a,y:r,isGroup:!0}),f++}));var y=[];d.forEach((function(t){y.push({id:t.nombre,semestre:t.semestre,nombre:t.nombre,group:t.group,isGroup:!1})})),y=y.concat(g);var x=[];g.forEach((function(e){x.push({source:t.nombre,target:e.id,value:1})}));var v=[];l.forEach((function(t){t.source.id==u&&v.push({source:t.target.group,target:t.target.nombre,value:t.value}),t.target.id==u&&v.push({source:t.source.group,target:t.source.nombre,value:t.value})})),v=v.concat(x);var b={nodes:y,groupNodes:g,links:v};const k=d3.forceSimulation(b.nodes).force("link",d3.forceLink(b.links).id(t=>t.id).distance(400)).force("charge",d3.forceManyBody().strength(-800)).force("center",d3.forceCenter(250,350));var w=n.selectAll(".link").data(b.links).enter().append("line").attr("class","link").attr("stroke","#aaa").attr("stroke-width",2),$=n.selectAll(".node").data(b.nodes.filter(t=>!t.isGroup)).enter().append("circle").attr("class","node").attr("r",15).attr("fill",t=>a(t.group)).on("mouseover",(function(t){e.classed("hover",!0),label.classed("primary",e=>e===t),label.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),path.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{e.classed("hover",!1),label.classed("primary",!1),label.classed("secondary",!1),path.classed("primary",!1).order()}),M=n.selectAll(".group-node").data(b.nodes.filter(t=>t.isGroup)).enter().append("rect").attr("class","group-node").attr("width",20).attr("height",20).attr("fill",t=>a(t.group)).call(C(k)),E=n.selectAll(".label").data(b.nodes).enter().append("text").attr("class","label").attr("fill",t=>d3.color(a(t.group)).darker(5)).text(t=>t.sigla);function C(t){return d3.drag().on("start",(function(e){d3.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=d3.event.x,t.fy=d3.event.y})).on("end",(function(e){d3.event.active||t.alphaTarget(0),e.fx=null,e.fy=null}))}$.call(C(k)),k.on("tick",()=>{w.attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y),$.attr("cx",t=>t.x).attr("cy",t=>t.y),M.attr("x",t=>t.x-10).attr("y",t=>t.y-10),E.attr("x",t=>t.x+8).attr("y",t=>t.y+5)})}async function obtenerGrafo(t){try{const t="http://localhost/UpTask_MVC/public/index.php/api/grafo?id="+idxd,e=await fetch(t),a=await e.json();origen=a.respuesta.curso,res=origen;const r=document.getElementById("navbar"),n=document.createElement("select");n.id="language-select";[{value:"es",label:"Español"},{value:"eu",label:"Euskera"},{value:"en",label:"Inglés"}].forEach(t=>{const e=document.createElement("option");e.value=t.value,e.textContent=t.label,n.appendChild(e)}),n.addEventListener("change",(function(){const t=this.value;idiomaSeleccionado=t,InicializarGrafo(res)}));const o=document.createElement("select");o.id="grafo-select";[{value:1,label:"Grafo"},{value:2,label:"Circurferencia"},{value:3,label:"Listado"},{value:4,label:"Árbol"}].forEach(t=>{const e=document.createElement("option");e.value=t.value,e.textContent=t.label,o.appendChild(e)}),o.addEventListener("change",(function(){const t=this.value;grafico=t,InicializarGrafo(res)})),o.classList.add("filter-button"),n.classList.add("filter-button"),r.appendChild(n);const s=document.createElement("button");s.classList.add("filter-button"),s.classList.toggle("activo"),s.addEventListener("click",()=>{const t=res.anoCurso.flatMap(t=>t.asignaturas.flatMap(t=>t.tags.map(t=>t.descripcion)));mostrarTags([...new Set(t)])}),s.textContent="Filtrar por Tag",r.appendChild(s),r.appendChild(o),res.anoCurso.forEach(t=>{const e=document.createElement("button");e.classList.add("filter-button"),e.id=t.id,e.classList.toggle("activo"),e.addEventListener("click",()=>{if(e.classList.toggle("activo"),filtrarCursos(),e.classList.contains("activo")){const t=color(e.id);e.style.backgroundColor=t}else e.style.backgroundColor="rgba(0, 0, 0, 0.5)"}),e.textContent=t.numero+" "+t.descripcion,r.appendChild(e)}),InicializarGrafo(res)}catch(t){console.log(t)}}function filtrarCursos(){const t=function(){const t=document.querySelectorAll(".activo"),e=[];return t.forEach((function(t){e.push(t.id)})),e}();var e={...res};e.anoCurso=e.anoCurso.filter(e=>t.includes(e.id)),InicializarGrafo(e)}async function InicializarGrafo(t){var e=[];t.anoCurso.forEach(t=>{const a={...t,id:t.id};e.push(a)});insertargrafo(e,t)}function imprimirTimeLine(t,e,a,r){updateLista()}function imprimirNodos(t,e,a){var r=[];width=450,radius=width/6,t.anoCurso.forEach(t=>{const e={...t,id:t.id};r.push(e)}),console.log("pruebaaaaaaaaaaaaaaaaaaaaa",r);const n=r.flatMap(t=>t.asignaturas.map(t=>t.id));function o(t,e,a){return t.map(t=>{const{id:r,numero:n,descripcion:o,asignaturas:s}=t;return{name:n+" "+o,children:i(s,e,a),group:r,padre:!0}})}function s(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.sigla;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}function i(t,e,a){return t.map(t=>{const{relaciones:r,id:n,asignatura:o,descripcion:i,cursoID:l}=t;nombre=s(t);return{name:nombre,"descripción":i,id:n,padre:!0,children:c(n,e,a),group:l}})}function c(t,e,a){const r=[],n=new Set;return e.filter(e=>e.source===t).forEach(t=>{const{target:o,value:i}=t;var l=function(t,e){const a=e.find(e=>e.id===t);return a||null}(o,a);const d={name:s(l),value:1,group:l.cursoID,padre:!0,children:c(l.id,e,a)};n.has(d.name)||(r.push(d),n.add(d.name))}),r}const l=function(t,e,a){const{nombreCurso:r,universidadCurso:n,anoCurso:s}=t;return{name:r,children:o(s,e,a)}}(t,r.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:t.id_asignatura1,target:t.id_asignatura2,value:t.descripcion})).filter(t=>n.includes(t.source)&&n.includes(t.target)))),r.flatMap(t=>t.asignaturas)),d=d3.arc().startAngle(t=>Math.max(0,Math.min(2*Math.PI,t.x0))).endAngle(t=>Math.max(0,Math.min(2*Math.PI,t.x1))).padAngle(t=>Math.min((t.x1-t.x0)/2,.005)).padRadius(1.5*radius).innerRadius(t=>t.y0*radius).outerRadius(t=>Math.max(t.y0*radius,t.y1*radius-1)),u=(t=>{const e=t=>{t.children&&0!==t.children.length?t.children.forEach(e):t.value=t.value||1};e(t);const a=d3.hierarchy(t).sum(t=>t.value).sort((t,e)=>e.value-t.value);return d3.partition().size([2*Math.PI,a.height+1])(a)})(l);u.each(t=>t.current=t);const p=e.append("g").attr("transform",`translate(${width/2},${width/2})`),g=d3.format(",d"),f=p.append("g").selectAll("path").data(u.descendants().slice(1)).enter().append("path").attr("fill",t=>a(t.data.group)).attr("fill-opacity",t=>x(t.current)?t.children?.6:.4:0).attr("d",t=>d(t.current)).filter(t=>t.data.padre).style("cursor","pointer").on("click",y).each((function(t){d3.select(this).transition().on("end",(function(){d3.select(this).append("title").text(t=>`${t.ancestors().map(t=>t.data.name).reverse().join("/")}\n${g(t.value)}`)}))})),m=p.append("g").attr("pointer-events","none").attr("text-anchor","middle").style("user-select","none").selectAll("text").data(u.descendants().slice(1)).enter().append("text").attr("dy","0.35em").attr("fill-opacity",t=>+v(t.current)).attr("transform",t=>b(t.current)).attr("font-size",t=>function(t){const e=(t.x1-t.x0)*(t.y1-t.y0);return e<10||e<100?"10px":"12px"}(t)).text(t=>t.data.name).each((function(t){d3.select(this).append("title").text(t=>`${t.ancestors().map(t=>t.data.name).reverse().join("/")}\n${g(t.value)}`)})),h=p.append("circle").datum(u).attr("r",radius).attr("fill","none").attr("pointer-events","all").on("click",()=>y(h.datum()));function y(t){h.datum(t.parent||u),u.each((function(e){e.target={x0:2*Math.max(0,Math.min(1,(e.x0-t.x0)/(t.x1-t.x0)))*Math.PI,x1:2*Math.max(0,Math.min(1,(e.x1-t.x0)/(t.x1-t.x0)))*Math.PI,y0:Math.max(0,e.y0-t.depth),y1:Math.max(0,e.y1-t.depth)}}));const e=p.transition().duration(750);f.transition(e).tween("data",(function(t){const e=d3.interpolate(t.current,t.target);return function(a){t.current=e(a)}})).filter((function(t){return+this.getAttribute("fill-opacity")||x(t.target)})).attr("fill-opacity",(function(t){return x(t.target)?t.children?.6:.4:0})).attrTween("d",(function(t){return function(){return d(t.current)}})),m.filter((function(t){return this.getAttribute("fill-opacity")||v(t.target)})).transition(e).attr("fill-opacity",t=>+v(t.target)).attrTween("transform",t=>()=>b(t.current))}function x(t){return t&&t.y1<=3&&t.y0>=1&&t.x1>t.x0}function v(t){return t.y1<=3&&t.y0>=1&&(t.y1-t.y0)*(t.x1-t.x0)>.03}function b(t){const e=(t.x0+t.x1)/2*(180/Math.PI);return`rotate(${e-90}) translate(${(t.y0+t.y1)/2*radius},0) rotate(${e<180?0:180})`}}function imprimirTodosNodos(t,e,a){data=t.anoCurso,e.selectAll(".node").remove(),e.selectAll(".link").remove(),e.selectAll(".label").remove(),e.selectAll(".group-node").remove();var r=[],n=0,o=data.length,s=2*Math.PI/o;const i={};function c(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}data.forEach((function(t){var e=n*s,a=200*Math.cos(e),o=200*Math.sin(e);i[t.id]=a,r.push({id:t.id,group:t.descripcion,x:a,y:o,isGroup:!0}),n++}));var l=[];function d(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.sigla;const a=t.info[0];if(a&&a.nombre)return a.sigla}return t.asignatura}asignaturas=data.flatMap(t=>t.asignaturas.map(t=>c(t))),l=data.flatMap(t=>t.asignaturas.map(t=>({id:t.id,nombre:c(t),sigla:d(t),semestre:t.semestre,descripcion:t.descripcion,sourceLinks:[],targetLinks:[],group:t.cursoID,tags:t.tags,isGroup:!1})));const u=new Map(l.map(t=>[t.id,t])),p=data.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:u.get(t.id_asignatura1),target:u.get(t.id_asignatura2),value:t.descripcion})))),g=[];for(let t=0;t<l.length;t++)for(let e=t+1;e<l.length;e++){const a=l[t].tags.map(t=>t.descripcion),r=l[e].tags.map(t=>t.descripcion),n=a.filter(t=>r.includes(t));n.length>0&&g.push({source:l[t],target:l[e],value:n})}const f=p.filter(t=>void 0!==t.target);for(const t of f){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}var m=[];const h={allnodes:l.concat(r),allinks:f.concat(m).concat(g)};e.attr("viewBox",[0,0,500,700]);const y=e.append("g"),x=d3.zoom().scaleExtent([.1,Math.min(500,700)]).on("zoom",()=>{y.attr("transform",d3.event.transform),this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale))),this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)))});e.call(x);const v=d3.forceSimulation(h.allnodes).force("link",d3.forceLink(m).id(t=>t.id).distance(180)).force("charge",d3.forceManyBody().strength(-50)).force("center",d3.forceCenter(250,350));var b=y.selectAll(".link").data(h.allinks).enter().append("line").attr("class","link").attr("stroke","#aaa").attr("stroke-width",(function(t){return 9*t.color+.5})).attr("marker-end",t=>`url(#arrow-${t.source.group}-${t.target.group}) `),k=y.selectAll(".group-node").data(h.allnodes.filter(t=>t.isGroup)).enter().append("rect").attr("class","group-node").attr("width",20).attr("height",20).attr("fill",t=>a(t.group)).call(M(v)),w=y.selectAll(".label").data(h.allnodes).enter().append("text").attr("class","label").style("font-size","10px").style("opacity","0.8").attr("fill",t=>d3.color(a(t.group)).darker(5)).text(t=>t.nombre);e.selectAll(".group-node").remove();var $=y.selectAll(".node").data(h.allnodes.filter(t=>!t.isGroup)).enter().append("g").append("circle").attr("r",5).attr("class","node").on("mouseover",(function(t){d3.select(this).attr("r",30);const e=new Set(t.sourceLinks.map(t=>t.target.nombre));t.targetLinks.forEach(t=>e.add(t.source.nombre));const a=Array.from(e);d3.selectAll("line"),b.style("stroke",(function(e){return e.source.nombre===t.nombre||e.target.nombre===t.nombre?"black":"#f0f0f0"}));for(const e of w._groups[0])a.includes(e.textContent)?d3.select(e).style("font-weight","bold").style("font-size","22px"):e.textContent==t.nombre?d3.select(e).style("font-weight","bold").style("font-size","31px"):d3.select(e).style("color","#ccc").style("opacity","0.4")})).on("mouseout",t=>{for(const t of w._groups[0])d3.select(t).style("font-weight","normal").style("font-size","14px").style("color","black").style("opacity","0.8");y.selectAll(".node").attr("r",15),b.style("stroke","#aaa").attr("stroke-width",2)}).on("click",t=>{mostrarGrafico(t,data)}).attr("fill",t=>a(t.group)).call(M(v));function M(t){return d3.drag().on("start",(function(e){d3.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=d3.event.x,t.fy=d3.event.y})).on("end",(function(e){d3.event.active||t.alphaTarget(0),e.fx=null,e.fy=null}))}v.on("tick",()=>{b.attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y),$.attr("cx",t=>t.x).attr("cy",t=>t.y),k.attr("x",t=>t.x-10).attr("y",t=>t.y-10),w.attr("x",t=>t.x+28).attr("y",t=>t.y+5)})}idxd?console.log('El valor del parámetro "id" es: '+idxd):console.log('El parámetro "id" no se encontró en la URL.'),step=14,obtenerGrafo(proyecto.id);const contenedor=document.querySelector(".grafico"),izquierdo=document.querySelector(".canvas"),derecho=document.querySelector(".panel"),expandirButton=document.getElementById("expandir-button");let izquierdoVisible=!0;function disperseCanvas(){izquierdoVisible?(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="0",derecho.style.flex="1"):(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="1",derecho.style.flex="1"),izquierdoVisible=!izquierdoVisible}function disperseGrafico(){izquierdoVisible?(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="1",derecho.style.flex="0"):(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="1",derecho.style.flex="1"),izquierdoVisible=!izquierdoVisible}function crearRelaciones(t){for(let e=0;e<t.length;e++){const a=t[e];for(let r=e+1;r<t.length;r++){const e=t[r],n=encontrarTagsComunes(a.tags,e.tags);n.length>0&&(a.relacionesTag.push({id:e.id,tagsComunes:n}),e.relacionesTag.push({id:a.id,tagsComunes:n}))}}}function encontrarTagsComunes(t,e){const a=[];for(const r of t)for(const t of e)r.descripcion===t.descripcion&&a.push(r.descripcion);return a}function mostrarTags(t){const e=document.createElement("div");e.classList.add("modalTags"),e.innerHTML='\n    <form class="formulario nueva-tarea">\n        <legend>Lista de Tags</legend>\n       \n        <div class="modal-content">\n            \n            <h2></h2>\n            <input type="text" id="buscarTag" value="-1" placeholder="Buscar tag">\n            <div id="listaTagsModal" class="listaTagsModal">\n            <label>\n            <input type="checkbox" id="checkboxTodos" value="todos"> Todos\n          </label>\n                </div>\n           \n        </div>\n    \n        \n    <div class="opciones">\n    <button type="button" class="submit-nueva-tarea" > Filtrar Tags</button>\n    <button type="button" class="cerrar-modal">Cancelar</button>\n    </div>    \n    </form>\n    ',document.body.appendChild(e);const a=document.getElementById("buscarTag");e.querySelector("#listaTagsModal");t.forEach(t=>{const e=document.createElement("div");e.classList.add("tag-container");const a=document.createElement("input");a.type="checkbox";a.value=t,a.classList.add("tag");const r=document.createElement("label");r.classList.add("tag-label"),r.textContent=t,e.appendChild(a),e.appendChild(r);document.getElementById("listaTagsModal").appendChild(e)});const r=document.getElementById("checkboxTodos"),n=document.querySelectorAll(".tag");r.addEventListener("click",(function(){r.checked&&(tagsFiltro=["-1"],n.forEach(t=>{t.checked=!1}))})),n.forEach(t=>{t.addEventListener("click",(function(){r.checked=!1}))}),a.addEventListener("keyup",(function(t){const e=t.target.value.toLowerCase();document.querySelectorAll(".tag-container").forEach(t=>{t.querySelector(".tag-label").textContent.toLowerCase().includes(e)?t.classList.remove("filtro"):t.classList.add("filtro")})})),e.addEventListener("click",(function(t){if(t.target.classList.contains("tag")){const e=t.target;e.value,e.checked}if(t.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{e.remove()},150)}if(t.target.classList.contains("submit-nueva-tarea")){document.querySelector(".formulario").classList.add("cerrar"),tagsFiltro=[],n.forEach(t=>{t.checked&&tagsFiltro.push(t.value)}),InicializarGrafo(res),setTimeout(()=>{e.remove()},150)}})),document.querySelector(".dashboard").appendChild(e);document.getElementById("contenido")}function imprimirNodoColumna(t,e,a){const r=t.anoCurso.flatMap(t=>t.asignaturas.map(t=>n(t)));function n(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}dx=3*d3.max(r,t=>t.length)+d3.max(r,t=>t.length)/1,height=(t.anoCurso.flatMap(t=>t.asignaturas).length-1)*step+margin.top+margin.bottom;const o=t.anoCurso.flatMap(t=>t.asignaturas.map(t=>({id:t.id,nombre:n(t),sigla:n,semestre:t.semestre,sourceLinks:[],targetLinks:[],group:t.cursoID,tags:t.tags}))),s=[];for(let t=0;t<o.length;t++)for(let e=t+1;e<o.length;e++){const a=o[t].tags.map(t=>t.descripcion),r=o[e].tags.map(t=>t.descripcion);a.filter(t=>r.includes(t)).length>0&&s.push({source:o[t],target:o[e]})}const i=new Map(o.map(t=>[t.id,t])),c=t.anoCurso.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:i.get(t.id_asignatura1),target:i.get(t.id_asignatura2),value:t.descripcion})))).filter(t=>void 0!==t.target);for(const t of c){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}const l={nodes:o,links:c};escalax=d3.scaleLinear().domain([0,dx]).range([0,margin.left]),d3.select(".panel").select("svg").remove(),d3.select(".canvas").select("svg").remove();const d=d3.select(".canvas").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet");d.append("style").text("\n          .hover path {\n            stroke: transparent;\n          }\n          .hover text {\n            fill: #ccc;\n          }\n          .hover g.primary text {\n            fill: black;\n            font-weight: bold;\n          }\n          .hover g.secondary text {\n            fill: #333;\n          }\n          .hover path.primary {\n            stroke: #333;\n            stroke-opacity: 1;\n          }\n        ");const u=d3.scalePoint().domain(l.nodes.map(t=>t.id).sort(d3.ascending)).range([margin.top,height-margin.bottom]);setColor||(a=d3.scaleOrdinal().domain(l.nodes.map(t=>t.group).sort(d3.ascending)).range(d3.schemeCategory10),setColor=!0);const p=d.append("g").attr("font-family","sans-serif").attr("font-size",8).attr("text-anchor","end").selectAll("g").data(l.nodes).enter().append("g").attr("transform",t=>`translate(${dx}, ${t.y=u(t.id)})`);p.append("text").attr("x",-6).attr("class","prueba").attr("dy","0.35em").attr("fill",t=>d3.lab(a(t.group)).darker(2)).text(t=>t.nombre),p.append("circle").attr("r",3).attr("fill",t=>a(t.group));const g=d.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(l.links).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?a(t.source.group):a(t.target.group)).attr("d",(function(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`})).attr("transform",`translate(${dx-margin.left},0)`).attr("marker-start","url(#arrow)").attr("marker-mid","url(#arrow)");d.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(s).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?a(t.source.group):a(t.target.group)).attr("d",(function(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`})).attr("transform",`translate(${dx-margin.left},0)`),d.append("g").attr("fill","none").attr("pointer-events","all").selectAll("rect").data(l.nodes).enter().append("rect").attr("width",margin.left+40).attr("height",step).attr("y",t=>u(t.id)-step/2).attr("x",dx-margin.left).on("mouseover",(function(t){d.classed("hover",!0),p.classed("primary",e=>e===t),p.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),g.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{d.classed("hover",!1),p.classed("primary",!1),p.classed("secondary",!1),g.classed("primary",!1).order()}).on("click",(function(t){}));d.node()}document.getElementById("disperse-button").addEventListener("click",disperseCanvas);