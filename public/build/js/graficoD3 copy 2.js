const proyectoParams=new URLSearchParams(window.location.search),proyecto=Object.fromEntries(proyectoParams.entries());let tagsFiltro=["-1"],idiomaSeleccionado="es";const dims={height:700,width:500};let res,origen,setColor=!1,grafico=1;margin={top:10,right:100,bottom:0,left:100};var url=window.location.href;const urlParams=new URLSearchParams(window.location.search),gr=Object.fromEntries(proyectoParams.entries());var idxd=gr.id;function insertargrafo(t,e){const a=function(){const t=document.querySelectorAll(".activo"),e=[];return t.forEach((function(t){e.push(t.id)})),e}();if(tagsFiltro[0]=!1){t.flatMap(t=>t.asignaturas.filter(t=>a.includes(t.cursoID)&&(!t.tags||t.tags.find(t=>tagFiltro.includes(t))))).map(t=>n(t))}else console.log("EMPIEZA LA FIESTA2",t),asignaturas=t.flatMap(t=>t.asignaturas.filter(t=>a.includes(t.cursoID))).map(t=>n(t));function r(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`}function o(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`}function n(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}dx=3*d3.max(asignaturas,t=>t.length)+d3.max(asignaturas,t=>t.length)/1,height=(t.flatMap(t=>t.asignaturas).length-1)*step+margin.top+margin.bottom;const s=t.flatMap(t=>t.asignaturas.map(t=>({id:t.id,nombre:n(t),semestre:t.semestre,sourceLinks:[],targetLinks:[],group:t.cursoID,tags:t.tags}))),i=[];for(let t=0;t<s.length;t++)for(let e=t+1;e<s.length;e++){const a=s[t].tags.map(t=>t.descripcion),r=s[e].tags.map(t=>t.descripcion);a.filter(t=>r.includes(t)).length>0&&i.push({source:s[t],target:s[e]})}const l=new Map(s.map(t=>[t.id,t])),c=t.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:l.get(t.id_asignatura1),target:l.get(t.id_asignatura2),value:t.descripcion})))).filter(t=>void 0!==t.target);for(const t of c){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}const d={nodes:s,links:c};escalax=d3.scaleLinear().domain([0,dx]).range([0,margin.left]),d3.select(".panel").select("svg").remove(),d3.select(".canvas").select("svg").remove();const u=d3.select(".panel").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet"),g=d3.select(".canvas").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet");g.append("style").text("\n    .hover path {\n      stroke: transparent;\n    }\n    .hover text {\n      fill: #ccc;\n    }\n    .hover g.primary text {\n      fill: black;\n      font-weight: bold;\n    }\n    .hover g.secondary text {\n      fill: #333;\n    }\n    .hover path.primary {\n      stroke: #333;\n      stroke-opacity: 1;\n    }\n  ");const p=d3.scalePoint().domain(d.nodes.map(t=>t.id).sort(d3.ascending)).range([margin.top,height-margin.bottom]);if(!setColor){color=d3.scaleOrdinal().domain(d.nodes.map(t=>t.group).sort(d3.ascending)).range(d3.schemeCategory10),setColor=!0;document.querySelectorAll(".filter-button").forEach(t=>{const e=t.id,a=color(e);t.style.backgroundColor=a})}const f=g.append("g").attr("font-family","sans-serif").attr("font-size",8).attr("text-anchor","end").selectAll("g").data(d.nodes).enter().append("g").attr("transform",t=>`translate(${dx}, ${t.y=p(t.id)})`);f.append("text").attr("x",-6).attr("class","prueba").attr("dy","0.35em").attr("fill",t=>d3.lab(color(t.group)).darker(2)).text(t=>t.nombre),f.append("circle").attr("r",3).attr("fill",t=>color(t.group));const m=u.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(d.links).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?color(t.source.group):color(t.target.group)).attr("d",r).attr("transform",`translate(${dx-margin.left},0)`).attr("marker-start","url(#arrow)").attr("marker-mid","url(#arrow)").attr("marker-end","url(#arrow)");g.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(i).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?color(t.source.group):color(t.target.group)).attr("d",o).attr("transform",`translate(${dx-margin.left},0)`),g.append("g").attr("fill","none").attr("pointer-events","all").selectAll("rect").data(d.nodes).enter().append("rect").attr("width",margin.left+40).attr("height",step).attr("y",t=>p(t.id)-step/2).attr("x",dx-margin.left).on("mouseover",(function(t){g.classed("hover",!0),f.classed("primary",e=>e===t),f.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),m.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{g.classed("hover",!1),f.classed("primary",!1),f.classed("secondary",!1),m.classed("primary",!1).order()}).on("click",(function(t){miFuncionExterna(t,u,color,i)}));console.log("2"),1==grafico?imprimirNodoColumna(e,g,color):imprimirNodos(e,u,color),g.node()}function miFuncionExterna(t,e,a,r){console.log("pasa",t,e,a),console.log("2"),e.selectAll(".node").remove(),e.selectAll(".link").remove(),e.selectAll(".label").remove(),e.selectAll(".group-node").remove(),e.append("style").text("\n    .hover path {\n      stroke: transparent;\n    }\n    .hover text {\n      fill: #ccc;\n    }\n    .hover g.primary text {\n      fill: black;\n      font-weight: bold;\n    }\n    .hover g.secondary text {\n      fill: #333;\n    }\n    .hover path.primary\n     {\n      stroke: #333;\n      stroke-opacity: 1;\n    }\n  ");console.log("2000000000000000000000000000000000000000000000000000000000",t),e.attr("viewBox",[0,0,500,700]);const o=e.append("g"),n=d3.zoom().scaleExtent([.1,Math.min(500,700)]).on("zoom",()=>{o.attr("transform",d3.event.transform),this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale))),this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)))});e.call(n),console.log("3");const s=r.filter(e=>e.source.id===t.id||e.target.id===t.id);var i=t.sourceLinks,l=t.targetLinks,c=i.concat(l).concat(s);console.log("4");var d=new Set;c.forEach((function(t){d.add(t.source),d.add(t.target)}));var u=t.id,g=new Set;c.forEach((function(t){t.source.id===u&&g.add(t.target.group),t.target.id===u&&g.add(t.source.group)})),console.log("5");var p=[],f=0,m=g.size,h=2*Math.PI/m;g.forEach((function(t){var e=f*h,a=200*Math.cos(e),r=200*Math.sin(e);p.push({id:t,group:t,x:a,y:r,isGroup:!0}),f++})),console.log("6",d);var y=[];d.forEach((function(t){y.push({id:t.nombre,semestre:t.semestre,nombre:t.nombre,group:t.group,isGroup:!1})})),console.log("6.5"),y=y.concat(p);var v=[];p.forEach((function(e){v.push({source:t.nombre,target:e.id,value:1})}));var x=[];c.forEach((function(t){t.source.id==u&&x.push({source:t.target.group,target:t.target.nombre,value:t.value}),console.log("6.6"),t.target.id==u&&x.push({source:t.source.group,target:t.source.nombre,value:t.value})})),x=x.concat(v),console.log("7");var b={nodes:y,groupNodes:p,links:x};const k=d3.forceSimulation(b.nodes).force("link",d3.forceLink(b.links).id(t=>t.id).distance(400)).force("charge",d3.forceManyBody().strength(-800)).force("center",d3.forceCenter(250,350));var E=o.selectAll(".link").data(b.links).enter().append("line").attr("class","link").attr("stroke","#aaa").attr("stroke-width",2),A=o.selectAll(".node").data(b.nodes.filter(t=>!t.isGroup)).enter().append("circle").attr("class","node").attr("r",15).attr("fill",t=>a(t.group)).on("mouseover",(function(t){e.classed("hover",!0),label.classed("primary",e=>e===t),label.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),path.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{e.classed("hover",!1),label.classed("primary",!1),label.classed("secondary",!1),path.classed("primary",!1).order()});console.log("3");var M=o.selectAll(".group-node").data(b.nodes.filter(t=>t.isGroup)).enter().append("rect").attr("class","group-node").attr("width",20).attr("height",20).attr("fill",t=>a(t.group)).call(C(k)),L=o.selectAll(".label").data(b.nodes).enter().append("text").attr("class","label").attr("fill",t=>d3.color(a(t.group)).darker(5)).text(t=>t.nombre);function C(t){return d3.drag().on("start",(function(e){d3.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=d3.event.x,t.fy=d3.event.y})).on("end",(function(e){d3.event.active||t.alphaTarget(0),e.fx=null,e.fy=null}))}A.call(C(k)),k.on("tick",()=>{E.attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y),A.attr("cx",t=>t.x).attr("cy",t=>t.y),M.attr("x",t=>t.x-10).attr("y",t=>t.y-10),L.attr("x",t=>t.x+8).attr("y",t=>t.y+5)}),console.log("9")}async function obtenerGrafo(t){try{console.log(idxd);const t="http://localhost/UpTask_MVC/public/index.php/api/grafo?id="+idxd,e=await fetch(t),a=await e.json();origen=a.respuesta.curso,res=origen,console.log("1",origen);const r=document.getElementById("navbar"),o=document.createElement("select");o.id="language-select";[{value:"es",label:"Español"},{value:"eu",label:"Euskera"},{value:"en",label:"Inglés"}].forEach(t=>{const e=document.createElement("option");e.value=t.value,e.textContent=t.label,o.appendChild(e)}),o.addEventListener("change",(function(){const t=this.value;idiomaSeleccionado=t,InicializarGrafo(res)}));const n=document.createElement("select");n.id="grafo-select";[{value:1,label:"Grafo"},{value:2,label:"Circurferencia"}].forEach(t=>{const e=document.createElement("option");e.value=t.value,e.textContent=t.label,n.appendChild(e)}),n.addEventListener("change",(function(){const t=this.value;grafico=t,InicializarGrafo(res)})),n.classList.add("filter-button"),o.classList.add("filter-button"),r.appendChild(o);const s=document.createElement("button");s.classList.add("filter-button"),s.classList.toggle("activo"),s.addEventListener("click",()=>{const t=res.anoCurso.flatMap(t=>t.asignaturas.flatMap(t=>t.tags.map(t=>t.descripcion)));mostrarTags([...new Set(t)])}),s.textContent="Filtrar por Tag",r.appendChild(s),r.appendChild(n),res.anoCurso.forEach(t=>{const e=document.createElement("button");e.classList.add("filter-button"),e.id=t.id,e.classList.toggle("activo"),e.addEventListener("click",()=>{if(e.classList.toggle("activo"),filtrarCursos(),e.classList.contains("activo")){const t=color(e.id);e.style.backgroundColor=t}else e.style.backgroundColor="rgba(0, 0, 0, 0.5)"}),e.textContent=t.numero+" "+t.descripcion,r.appendChild(e)}),InicializarGrafo(res)}catch(t){console.log(t)}}function filtrarCursos(){const t=function(){const t=document.querySelectorAll(".activo"),e=[];return t.forEach((function(t){e.push(t.id)})),e}();console.log("botones Activos",t);var e={...res};e.anoCurso=e.anoCurso.filter(e=>t.includes(e.id)),console.log("res",res.anoCurso,e.anoCurso),InicializarGrafo(e)}async function InicializarGrafo(t){var e=[];t.anoCurso.forEach(t=>{const a={...t,id:t.id};e.push(a)}),console.log("UNA DUDA PODEROSA",e,t);insertargrafo(e,t)}function imprimirNodos(t,e,a){var r=[];width=450,radius=width/6,t.anoCurso.forEach(t=>{const e={...t,id:t.id};r.push(e)});const o=r.flatMap(t=>t.asignaturas.map(t=>t.relaciones.map(t=>({source:t.id_asignatura1,target:t.id_asignatura2,value:t.descripcion}))).flat());console.log("hey",o),console.log("hey2",n);var n=r.flatMap(t=>t.asignaturas);function s(t,e,a){return t.map(t=>{console.log("hey4");const{id:r,numero:o,descripcion:n,asignaturas:s}=t;return{name:o+" "+n,children:i(s,e,a),group:r,padre:!0}})}function i(t,e,a){return t.map(t=>{console.log("hey5");const{relaciones:r,id:o,asignatura:n,descripcion:s,cursoID:i}=t;nombre=function(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}(t);return{name:nombre,"descripción":s,id:o,padre:!0,children:l(o,e,a),group:i}})}function l(t,e,a){const r=[],o=new Set;console.log("hey6","id",t,"links",e,a);e.filter(e=>e.source===t).forEach(t=>{const{target:e,value:n}=t;var s=c(e,a);console.log("jiji",e,"jujujuj",a);const i={name:s.asignatura,value:1,group:s.cursoID,padre:!0};o.has(i.name)||(r.push(i),o.add(i.name))});return e.filter(e=>e.target===t).forEach(t=>{const{source:e,value:n}=t;var s=c(e,a);const i={name:s.asignatura,value:1,group:s.cursoID,padre:!0};o.has(i.nombre)||(r.push(i),o.add(i.nombre))}),r}function c(t,e){console.log(t,"que entre la china");const a=e.find(e=>e.id===t);return a||null}console.log("hey2",n);const d=function(t,e,a){const{nombreCurso:r,universidadCurso:o,anoCurso:n}=t;return console.log("hey3"),{name:r,children:s(n,e,a)}}(t,o,n);partition=t=>{const e=d3.hierarchy(t).sum(t=>t.value).sort((t,e)=>e.value-t.value);return d3.partition().size([2*Math.PI,e.height+1])(e)};const u=d3.arc().startAngle(t=>Math.max(0,Math.min(2*Math.PI,t.x0))).endAngle(t=>Math.max(0,Math.min(2*Math.PI,t.x1))).padAngle(t=>Math.min((t.x1-t.x0)/2,.005)).padRadius(1.5*radius).innerRadius(t=>t.y0*radius).outerRadius(t=>Math.max(t.y0*radius,t.y1*radius-1)),g=partition(d);g.each(t=>t.current=t);const p=e.append("g").attr("transform",`translate(${width/2},${width/2})`),f=d3.format(",d"),m=p.append("g").selectAll("path").data(g.descendants().slice(1)).enter().append("path").attr("fill",t=>a(t.data.group)).attr("fill-opacity",t=>x(t.current)?t.children?.6:.4:0).attr("d",t=>u(t.current)).filter(t=>t.data.padre).style("cursor","pointer").on("click",v).each((function(t){d3.select(this).transition().on("end",(function(){d3.select(this).append("title").text(t=>`${t.ancestors().map(t=>t.data.name).reverse().join("/")}\n${f(t.value)}`)}))})),h=p.append("g").attr("pointer-events","none").attr("text-anchor","middle").style("user-select","none").selectAll("text").data(g.descendants().slice(1)).enter().append("text").attr("dy","0.35em").attr("fill-opacity",t=>+b(t.current)).attr("transform",t=>k(t.current)).attr("font-size",t=>function(t){const e=(t.x1-t.x0)*(t.y1-t.y0);return e<10||e<100?"10px":"12px"}(t)).text(t=>t.data.name).each((function(t){d3.select(this).append("title").text(t=>`${t.ancestors().map(t=>t.data.name).reverse().join("/")}\n${f(t.value)}`)})),y=p.append("circle").datum(g).attr("r",radius).attr("fill","none").attr("pointer-events","all").on("click",()=>v(y.datum()));function v(t){y.datum(t.parent||g),g.each((function(e){e.target={x0:2*Math.max(0,Math.min(1,(e.x0-t.x0)/(t.x1-t.x0)))*Math.PI,x1:2*Math.max(0,Math.min(1,(e.x1-t.x0)/(t.x1-t.x0)))*Math.PI,y0:Math.max(0,e.y0-t.depth),y1:Math.max(0,e.y1-t.depth)}}));const e=p.transition().duration(750);m.transition(e).tween("data",(function(t){const e=d3.interpolate(t.current,t.target);return function(a){t.current=e(a)}})).filter((function(t){return+this.getAttribute("fill-opacity")||x(t.target)})).attr("fill-opacity",(function(t){return x(t.target)?t.children?.6:.4:0})).attrTween("d",(function(t){return function(){return u(t.current)}})),h.filter((function(t){return this.getAttribute("fill-opacity")||b(t.target)})).transition(e).attr("fill-opacity",t=>+b(t.target)).attrTween("transform",t=>()=>k(t.current))}function x(t){return t&&t.y1<=3&&t.y0>=1&&t.x1>t.x0}function b(t){return t.y1<=3&&t.y0>=1&&(t.y1-t.y0)*(t.x1-t.x0)>.03}function k(t){const e=(t.x0+t.x1)/2*(180/Math.PI);return`rotate(${e-90}) translate(${(t.y0+t.y1)/2*radius},0) rotate(${e<180?0:180})`}}function imprimirTodosNodos(t,e,a){data=t.anoCurso,e.selectAll(".node").remove(),e.selectAll(".link").remove(),e.selectAll(".label").remove(),e.selectAll(".group-node").remove();var r=[],o=0,n=data.length,s=2*Math.PI/n;const i={};function l(t){if(t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}data.forEach((function(t){var e=o*s,a=200*Math.cos(e),n=200*Math.sin(e);i[t.id]=a,r.push({id:t.id,group:t.descripcion,x:a,y:n,isGroup:!0}),o++}));var c=[];asignaturas=data.flatMap(t=>t.asignaturas.map(t=>l(t))),c=data.flatMap(t=>t.asignaturas.map(t=>({id:t.id,nombre:l(t),semestre:t.semestre,descripcion:t.descripcion,sourceLinks:[],targetLinks:[],group:t.cursoID,tags:t.tags,isGroup:!1})));const d=new Map(c.map(t=>[t.id,t])),u=data.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:d.get(t.id_asignatura1),target:d.get(t.id_asignatura2),value:t.descripcion})))),g=[];for(let t=0;t<c.length;t++)for(let e=t+1;e<c.length;e++){const a=c[t].tags.map(t=>t.descripcion),r=c[e].tags.map(t=>t.descripcion),o=a.filter(t=>r.includes(t));o.length>0&&g.push({source:c[t],target:c[e],value:o})}const p=u.filter(t=>void 0!==t.target);for(const t of p){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}var f=[];const m={allnodes:c.concat(r),allinks:p.concat(f).concat(g)};e.attr("viewBox",[0,0,500,700]);const h=e.append("g"),y=d3.zoom().scaleExtent([.1,Math.min(500,700)]).on("zoom",()=>{h.attr("transform",d3.event.transform),this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale))),this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)))});e.call(y);const v=d3.forceSimulation(m.allnodes).force("link",d3.forceLink(f).id(t=>t.id).distance(150)).force("charge",d3.forceManyBody().strength(-50)).force("center",d3.forceCenter(250,350));var x=h.selectAll(".link").data(m.allinks).enter().append("line").attr("class","link").attr("stroke","#aaa").attr("stroke-width",(function(t){return 9*t.color+.5})),b=h.selectAll(".group-node").data(m.allnodes.filter(t=>t.isGroup)).enter().append("rect").attr("class","group-node").attr("width",20).attr("height",20).attr("fill",t=>a(t.group)).call(A(v)),k=h.selectAll(".label").data(m.allnodes).enter().append("text").attr("class","label").style("font-size","10px").style("opacity","0.8").attr("fill",t=>d3.color(a(t.group)).darker(5)).text(t=>t.nombre);e.selectAll(".group-node").remove();var E=h.selectAll(".node").data(m.allnodes.filter(t=>!t.isGroup)).enter().append("g").append("circle").attr("r",15).attr("class","node").on("mouseover",(function(t){d3.select(this).attr("r",30);const e=new Set(t.sourceLinks.map(t=>t.target.nombre));t.targetLinks.forEach(t=>e.add(t.source.nombre));const a=Array.from(e);d3.selectAll("line"),x.style("stroke",(function(e){return e.source.nombre===t.nombre||e.target.nombre===t.nombre?"black":"#f0f0f0"}));for(const e of k._groups[0])a.includes(e.textContent)?d3.select(e).style("font-weight","bold").style("font-size","22px"):e.textContent==t.nombre?d3.select(e).style("font-weight","bold").style("font-size","31px"):d3.select(e).style("color","#ccc").style("opacity","0.4")})).on("mouseout",t=>{for(const t of k._groups[0])d3.select(t).style("font-weight","normal").style("font-size","14px").style("color","black").style("opacity","0.8");h.selectAll(".node").attr("r",15),x.style("stroke","#aaa").attr("stroke-width",2)}).on("click",t=>{console.log("ELRUBIUS"),mostrarGrafico(t,data)}).attr("fill",t=>a(t.group)).call(A(v));function A(t){return d3.drag().on("start",(function(e){d3.event.active||t.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y})).on("drag",(function(t){t.fx=d3.event.x,t.fy=d3.event.y})).on("end",(function(e){d3.event.active||t.alphaTarget(0),e.fx=null,e.fy=null}))}v.on("tick",()=>{x.attr("x1",t=>t.source.x).attr("y1",t=>t.source.y).attr("x2",t=>t.target.x).attr("y2",t=>t.target.y),E.attr("cx",t=>t.x).attr("cy",t=>t.y),b.attr("x",t=>t.x-10).attr("y",t=>t.y-10),k.attr("x",t=>t.x+28).attr("y",t=>t.y+5)})}idxd?console.log('El valor del parámetro "id" es: '+idxd):console.log('El parámetro "id" no se encontró en la URL.'),step=14,obtenerGrafo(proyecto.id);const contenedor=document.querySelector(".grafico"),izquierdo=document.querySelector(".canvas"),derecho=document.querySelector(".panel"),expandirButton=document.getElementById("expandir-button");let izquierdoVisible=!0;function disperseCanvas(){izquierdoVisible?(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="0",derecho.style.flex="1"):(document.getElementById("disperse-button").textContent="<",izquierdo.style.flex="1",derecho.style.flex="1"),izquierdoVisible=!izquierdoVisible}function crearRelaciones(t){for(let e=0;e<t.length;e++){const a=t[e];for(let r=e+1;r<t.length;r++){const e=t[r],o=encontrarTagsComunes(a.tags,e.tags);o.length>0&&(a.relacionesTag.push({id:e.id,tagsComunes:o}),e.relacionesTag.push({id:a.id,tagsComunes:o}))}}}function encontrarTagsComunes(t,e){const a=[];for(const r of t)for(const t of e)r.descripcion===t.descripcion&&a.push(r.descripcion);return a}function mostrarTags(t){const e=document.createElement("div");e.classList.add("modalTags"),e.innerHTML='\n    <form class="formulario nueva-tarea">\n        <legend>Lista de Tags</legend>\n       \n        <div class="modal-content">\n            \n            <h2></h2>\n            <input type="text" id="buscarTag" value="-1" placeholder="Buscar tag">\n            <div id="listaTagsModal" class="listaTagsModal">\n            <label>\n            <input type="checkbox" id="checkboxTodos" value="todos"> Todos\n          </label>\n                </div>\n           \n        </div>\n    \n        \n    <div class="opciones">\n    <button type="button" class="submit-nueva-tarea" > Filtrar Tags</button>\n    <button type="button" class="cerrar-modal">Cancelar</button>\n    </div>    \n    </form>\n    ',document.body.appendChild(e);const a=document.getElementById("buscarTag");e.querySelector("#listaTagsModal");t.forEach(t=>{const e=document.createElement("div");e.classList.add("tag-container");const a=document.createElement("input");a.type="checkbox";a.value=t,a.classList.add("tag");const r=document.createElement("label");r.classList.add("tag-label"),r.textContent=t,e.appendChild(a),e.appendChild(r);document.getElementById("listaTagsModal").appendChild(e)});const r=document.getElementById("checkboxTodos"),o=document.querySelectorAll(".tag");r.addEventListener("click",(function(){r.checked&&(tagsFiltro=["-1"],o.forEach(t=>{t.checked=!1}))})),o.forEach(t=>{t.addEventListener("click",(function(){r.checked=!1}))}),console.log("3"),a.addEventListener("keyup",(function(t){const e=t.target.value.toLowerCase();document.querySelectorAll(".tag-container").forEach(t=>{t.querySelector(".tag-label").textContent.toLowerCase().includes(e)?t.classList.remove("filtro"):t.classList.add("filtro")})})),e.addEventListener("click",(function(t){if(t.target.classList.contains("tag")){const e=t.target;e.value,e.checked}if(t.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{e.remove()},150)}if(t.target.classList.contains("submit-nueva-tarea")){document.querySelector(".formulario").classList.add("cerrar"),tagsFiltro=[],o.forEach(t=>{t.checked&&tagsFiltro.push(t.value)}),console.log("LETS SEEEE",tagsFiltro),InicializarGrafo(res),setTimeout(()=>{e.remove()},150)}})),document.querySelector(".dashboard").appendChild(e);document.getElementById("contenido")}function imprimirNodoColumna(t,e,a){console.log("EMPIEZA LA FIESTA"),console.log("EMPIEZA LA FIESTA2",t);const r=t.anoCurso.flatMap(t=>t.asignaturas.map(t=>s(t)));function o(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`}function n(t){const e=t.source.y,a=t.target.y,r=Math.abs(a-e)/1.7;return`M${margin.left},${e}A${r},${r} 0,0,${e<a?1:0} ${margin.left},${a}`}function s(t){if(console.log("bebe yo se que todavia",t),t.info&&t.info.length>0){const e=t.info.find(t=>t.idioma===idiomaSeleccionado);if(e&&e.nombre)return e.nombre;const a=t.info[0];if(a&&a.nombre)return a.nombre}return t.asignatura}console.log("EMPIEZA LA FIESTA3",r),dx=3*d3.max(r,t=>t.length)+d3.max(r,t=>t.length)/1,height=(t.anoCurso.flatMap(t=>t.asignaturas).length-1)*step+margin.top+margin.bottom,console.log("EMPIEZA LA FIESTA4"),console.log("EMPIEZA LA FIESTA5"),console.log("EMPIEZA LA FIESTA6"),console.log("EMPIEZA LA FIESTA7");const i=t.anoCurso.flatMap(t=>t.asignaturas.map(t=>({id:t.id,nombre:s(t),semestre:t.semestre,sourceLinks:[],targetLinks:[],group:t.cursoID,tags:t.tags})));console.log("EMPIEZA LA FIESTA8");const l=[];for(let t=0;t<i.length;t++)for(let e=t+1;e<i.length;e++){const a=i[t].tags.map(t=>t.descripcion),r=i[e].tags.map(t=>t.descripcion);a.filter(t=>r.includes(t)).length>0&&l.push({source:i[t],target:i[e]})}const c=new Map(i.map(t=>[t.id,t]));console.log("EMPIEZA LA FIESTA9");const d=t.anoCurso.flatMap(t=>t.asignaturas.flatMap(t=>t.relaciones.map(t=>({source:c.get(t.id_asignatura1),target:c.get(t.id_asignatura2),value:t.descripcion}))));console.log("EMPIEZA LA FIESTA10");const u=d.filter(t=>void 0!==t.target);for(const t of u){const{source:e,target:a,value:r}=t;e.sourceLinks.push(t),a.targetLinks.push(t)}console.log("EMPIEZA LA FIESTA11");const g={nodes:i,links:u};escalax=d3.scaleLinear().domain([0,dx]).range([0,margin.left]),d3.select(".panel").select("svg").remove(),d3.select(".canvas").select("svg").remove(),console.log("EMPIEZA LA FIESTA12");const p=d3.select(".canvas").append("svg").attr("width","100%").attr("height","100%").attr("viewBox",`0 0 ${dims.width} ${dims.height}`).attr("preserveAspectRatio","xMidYMid meet");console.log("EMPIEZA LA FIESTA13"),p.append("style").text("\n          .hover path {\n            stroke: transparent;\n          }\n          .hover text {\n            fill: #ccc;\n          }\n          .hover g.primary text {\n            fill: black;\n            font-weight: bold;\n          }\n          .hover g.secondary text {\n            fill: #333;\n          }\n          .hover path.primary {\n            stroke: #333;\n            stroke-opacity: 1;\n          }\n        ");const f=d3.scalePoint().domain(g.nodes.map(t=>t.id).sort(d3.ascending)).range([margin.top,height-margin.bottom]);setColor||(a=d3.scaleOrdinal().domain(g.nodes.map(t=>t.group).sort(d3.ascending)).range(d3.schemeCategory10),setColor=!0);const m=p.append("g").attr("font-family","sans-serif").attr("font-size",8).attr("text-anchor","end").selectAll("g").data(g.nodes).enter().append("g").attr("transform",t=>`translate(${dx}, ${t.y=f(t.id)})`);m.append("text").attr("x",-6).attr("class","prueba").attr("dy","0.35em").attr("fill",t=>d3.lab(a(t.group)).darker(2)).text(t=>t.nombre),m.append("circle").attr("r",3).attr("fill",t=>a(t.group));const h=p.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(g.links).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?a(t.source.group):a(t.target.group)).attr("d",o).attr("transform",`translate(${dx-margin.left},0)`).attr("marker-start","url(#arrow)").attr("marker-mid","url(#arrow)").attr("marker-end","url(#arrow)");p.insert("g","*").attr("fill","none").attr("class","relacion").attr("stroke-opacity",.6).attr("stroke-width",1.5).selectAll("path").data(l).enter().append("path").attr("stroke",t=>t.source.group===t.target.group?a(t.source.group):a(t.target.group)).attr("d",n).attr("transform",`translate(${dx-margin.left},0)`),p.append("g").attr("fill","none").attr("pointer-events","all").selectAll("rect").data(g.nodes).enter().append("rect").attr("width",margin.left+40).attr("height",step).attr("y",t=>f(t.id)-step/2).attr("x",dx-margin.left).on("mouseover",(function(t){p.classed("hover",!0),m.classed("primary",e=>e===t),m.classed("secondary",e=>e.sourceLinks.some(e=>e.target===t)||e.targetLinks.some(e=>e.source===t)),h.classed("primary",e=>e.source===t||e.target===t).filter(".primary").raise()})).on("mouseout",t=>{p.classed("hover",!1),m.classed("primary",!1),m.classed("secondary",!1),h.classed("primary",!1).order()}).on("click",(function(t){}));p.node()}document.getElementById("disperse-button").addEventListener("click",disperseCanvas);