!function(){let t=[],e=[],n=[],a=[];!async function(){try{const e="http://localhost/UpTask_MVC/public/index.php/api/asignatura?id="+u(),n=await fetch(e),a=await n.json();console.log(a),t=a.asignaturas,i()}catch(t){console.log(t)}}();document.querySelector("#agregar-tarea").addEventListener("click",(function(){c()}));function o(n){const a=n.target.value;e=""!==a?t.filter(t=>t.estado===a):[],i()}function i(){!function(){const t=document.querySelector("#listado-asignaturas");for(;t.firstChild;)t.removeChild(t.firstChild)}();const a=e.length?e:t;if(0===a.length){const t=document.querySelector("#listado-asignaturas"),e=document.createElement("LI");return e.textContent="No Hay Asignaturas",e.classList.add("no-tareas"),console.log("pasa"),t.appendChild(e),void console.log("no pasa")}console.log(a),a.forEach(t=>{const e=document.createElement("LI");e.dataset.tareaId=t.id,e.classList.add("tarea");const a=document.createElement("P");a.textContent=t.asignatura,a.ondblclick=function(){c(editar=!0,{...t})};const o=document.createElement("DIV");o.classList.add("opciones");const d=document.createElement("BUTTON");d.classList.add("estado-tarea"),d.classList.add("pendiente"),d.textContent="Modificar relaciones",d.ondblclick=function(){!function(t){window.location.replace("http://localhost/UpTask_MVC/public/index.php/api/relaciones?id="+t.id)}({...t})};const l=document.createElement("BUTTON");l.classList.add("eliminar-tarea"),l.dataset.idTarea=t.id,l.textContent="Eliminar",l.ondblclick=function(){!function(t){Swal.fire({title:"¿Eliminar Tarea?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(e=>{e.isConfirmed&&async function(t){const{estado:e,id:a,nombre:o}=t,c=new FormData;c.append("id",a),c.append("nombre",o),c.append("estado",e),c.append("proyectoId",u());try{const e="http://localhost:3000/api/tarea/eliminar",a=await fetch(e,{method:"POST",body:c}),o=await a.json();o.resultado&&(Swal.fire("Eliminado!",o.mensaje,"success"),n=n.filter(e=>e.id!==t.id),i())}catch(t){}}(t)})}({...t})},o.appendChild(d),o.appendChild(l),e.appendChild(a),e.appendChild(o);document.querySelector("#listado-asignaturas").appendChild(e)})}document.querySelectorAll('#filtros input[type="radio').forEach(t=>{t.addEventListener("input",o)});function c(t=!1,e={}){window.location.href="/UpTask_MVC/public/index.php/panel/crear-asignatura"}function d(t){if(44===t.keyCode){const e=document.getElementById("contenido");if(value=e.value,t.preventDefault(),""===t.target.value.trim()||t.target.value<1)return;if(a.find(t=>t==value))return;a=[...a,value],l(),e.value=""}}function l(){const t=document.getElementById("listado-temas"),e=document.getElementById("contenido");console.log(a),t.innerHTML="",e.innerHTML="";a.forEach(e=>{const n=document.createElement("LI");n.classList.add("curso_lista"),n.textContent=e,n.ondblclick=r,t.appendChild(n)}),s()}function s(){document.getElementById("formulario__listado").value=a.toString()}function r(t){t.target.remove(),a=a.filter(e=>e!==t.target.textContent),s()}function u(){const t=new URLSearchParams(window.location.search);return Object.fromEntries(t.entries()).id}document.getElementById("contenido").addEventListener("keypress",d)}();