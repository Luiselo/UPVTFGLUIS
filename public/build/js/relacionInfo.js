function mostrarGrafico(e,n){const o=n.find(n=>n.id===e.group),a=n.filter(e=>e.numero<o.numero);console.log("data",e),console.log("curso",n),console.log("cursosAnteriores",a);const t=[];for(const n of e.sourceLinks)t.push({asignatura:n.target,value:n.value});console.log("source",t);const l=[];for(const n of e.targetLinks)l.push({asignatura:n.source,value:n.value});const c=t.concat(l);e.sourceLinks.concat(e.targetLinks);console.log("relaciones",c);const i=new Set(c.map(e=>e.asignatura));console.log("nomresUnicos",i);const s=document.createElement("div");s.classList.add("modalGrafo"),s.innerHTML=`\n        <form class="formulario nueva-tarea">\n            <legend>${e.nombre}</legend>\n                <label>Curso: ${o.numero} ${o.descripcion}</label>\n            <div class="campo">\n                <label>Semestre: ${e.semestre}</label>\n            </div>\n\n            <h1>Relación de Asignaturas</h1>\n            <table class = "relaciones-tabla" border="1">\n                <tr>\n                    <th>Asignatura Relacionada</th>\n                    <th>Curso</th>\n                    <th>Nivel de Relevancia</th>\n                    <th>Inf </th>\n                </tr>\n               \n            </table>\n    \n            <div class="campo">\n                <label>Descripción: </label>\n                <input \n                    type="text"\n                    name="descripcion"\n                    placeholder="${e.descripcion?"Edita la Tarea":"Descripción del proyecto"}"\n                    id="descripcion"\n                    value="${e.descripcion?e.descripcion:""}" />\n            </div>\n            <div class="accordion">\n            <button class="accordion-button">Guía Docente Labels</button>\n            <div class="accordion-content">\n                <label>Título </label>\n                <label>Centro </label>\n                <label>Curso </label>\n                <label>Idiomas </label>\n                <label>Docencia </label>\n                <label>Guía docente </label>\n                <label> Descripción y Contextualización de la asignatura </label>\n                <label> Competencias/ Resultados de aprendizaje de la asignatura </label>\n                <label> Contenidos teórico-prácticos </label>\n                <label> Sistemas de evaluación </label>\n                <label> Convocatoria Ordinaria: Orientaciones y Renuncia </label>\n            </div>\n        </div>\n     \n            \n            <div class="campo">\n            <label>Antiguas asignaturas</label>\n            <input \n                type="text"\n                name="contenido"\n                placeholder="${e.campo?"Edita la Tarea":"Primes simestre"}"\n                id="contenido"\n                value="${e.campo?e.nombre:""}"\n            />\n            </div>\n            <div class="campo">\n                <ul class="listado-asignaturas" id="listado-temas">\n                </ul>\n                <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos"  />     \n            </div>\n            <div class="opciones">\n                <button type="button" class="cerrar-modal">Cancelar</button>\n            </div>\n        </form>\n        \n           `,console.log("despues de conducir sin parar"),setTimeout(()=>{document.querySelector(".formulario").classList.add("animar")},0),document.querySelector(".dashboard").appendChild(s);const r=document.querySelector("table");i.forEach(e=>{console.log("1");const a=document.createElement("tr"),t=document.createElement("td"),l=document.createElement("td"),c=document.createElement("td"),i=document.createElement("td");i.innerHTML=`\n                         ${n.nombre}\n                            <button onclick="expandirCelda(this)">Ver Más</button>\n                            <div style="display: none;">\n                            Texto completo de la Relación\n                            <button onclick="contraerCelda(this)">Cerrar</button>\n                            </div>\n                            `,console.log(t),console.log(l),console.log(c);const s=n.find(n=>n.id===e.group);relevancia="",o.numero>s.numero?relevancia="predecesora":o.numero<s.numero?relevancia="sucesora":relevancia="relación",t.textContent=e.nombre,l.textContent=s.numero+" "+s.descripcion,c.textContent=relevancia,a.appendChild(t),a.appendChild(l),a.appendChild(c),a.appendChild(i),console.log(r),r.appendChild(a)})}const cursosInputHidden=document.getElementById("contenido"),accordionButton=document.querySelector(".accordion-button"),accordionContent=document.querySelector(".accordion-content");function expandirCelda(e){e.nextElementSibling.style.display="block",e.style.display="none"}function contraerCelda(e){const n=e.parentElement;n.style.display="none",n.previousElementSibling.style.display="inline"}console.log(accordionButton),accordionButton.addEventListener("click",(function(){"block"===accordionContent.style.display?accordionContent.style.display="none":accordionContent.style.display="block"})),modal.addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("cerrar-modal")){console.log("se esta cerraando");document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{modal.remove()},150)}}));