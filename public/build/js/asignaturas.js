<<<<<<< HEAD
!function(){let t=[],e=[],n=[];c();const o=document.querySelector("#agregar-tarea"),a=document.querySelector("#eliminar-tarea");o.addEventListener("click",(function(){!function(t=!1,e={}){const n="/UpTask_MVC/public/index.php/panel/crear-asignatura?id="+m();console.log(n),window.location.href=n}()})),a.addEventListener("click",(function(){!function(t){const e=m();Swal.fire({title:"¿Estas seguro de que quieresn eliminar el semestre completo?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(t=>{t.isConfirmed&&(console.log("jiji"),async function(t){const e=new FormData;e.append("id",t);try{const t="http://localhost/UpTask_MVC/public/index.php/api/eliminarCurso",n=await fetch(t,{method:"POST",body:e}),o=await n.json();(o.tipo="Exito")&&(Swal.fire("Eliminado!",o.mensaje,"success"),c())}catch(t){}}(e))})}()}));function i(n){const o=n.target.value;e=""!==o?t.filter(t=>t.estado===o):[],s()}async function c(){try{const e="http://localhost/UpTask_MVC/public/index.php/api/asignatura?id="+m(),n=await fetch(e),o=await n.json();console.log("miremos",o),t=o.asignaturas,s()}catch(t){console.log(t)}}function s(){!function(){const t=document.getElementById("listado-asignaturas1");for(;t.firstChild;)t.removeChild(t.firstChild);const e=document.getElementById("listado-asignaturas2");for(;e.firstChild;)e.removeChild(e.firstChild)}();const n=e.length?e:t;if(0===n.length){const t=document.getElementById("listado-asignaturas1"),e=document.createElement("LI");return e.textContent="No Hay Asignaturas",e.classList.add("no-tareas"),console.log("pasa"),t.appendChild(e),void console.log("no pasa")}console.log("hola1",n),n.forEach(t=>{const e=document.createElement("LI");e.dataset.tareaId=t.id,e.classList.add("tarea"),nombresString="";const n=document.createElement("P");console.log("1"),0===t.info.length?n.textContent=t.asignatura:(t.info.forEach((function(t){t&&t.nombre&&(console.log(t.nombre),nombresString+=t.nombre+", ")})),n.textContent=nombresString),console.log("2"),n.ondblclick=function(){!function(t=!0,e){console.log(e);const n=m(),o=e.id,a=`/UpTask_MVC/public/index.php/panel/editar-asignatura?id=${n}&idAsignatura=${o}`;console.log(a),window.location.href=a}(editar=!0,{...t})};const o=document.createElement("DIV");o.classList.add("opciones");const a=document.createElement("BUTTON");a.classList.add("estado-tarea"),a.classList.add("pendiente"),a.textContent="Modificar relaciones",a.ondblclick=function(){!function(t){window.location.replace("http://localhost/UpTask_MVC/public/index.php/api/relaciones?id="+t.id)}({...t})};const i=document.createElement("BUTTON");let s;i.classList.add("eliminar-tarea"),i.dataset.idTarea=t.id,i.textContent="Eliminar",i.ondblclick=function(){!function(t){Swal.fire({title:"¿Eliminar asignatura?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(e=>{e.isConfirmed&&(console.log("jiji"),async function(t){const e=new FormData;e.append("id",t.id);try{const t="http://localhost/UpTask_MVC/public/index.php/api/eliminarasignatura",n=await fetch(t,{method:"POST",body:e}),o=await n.json();(o.tipo="Exito")&&(Swal.fire("Eliminado!",o.mensaje,"success"),c())}catch(t){}}(t))})}({...t})},o.appendChild(a),o.appendChild(i),e.appendChild(n),e.appendChild(o),console.log("hola",t),s=1==t.semestre?document.getElementById("listado-asignaturas1"):document.getElementById("listado-asignaturas2"),s.appendChild(e)})}document.querySelectorAll('#filtros input[type="radio').forEach(t=>{t.addEventListener("input",i)});function l(t){if(44===t.keyCode){const e=document.getElementById("contenido");if(value=e.value,t.preventDefault(),""===t.target.value.trim()||t.target.value<1)return;if(n.find(t=>t==value))return;n=[...n,value],d(),e.value=""}}function d(){const t=document.getElementById("listado-temas"),e=document.getElementById("contenido");console.log(n),t.innerHTML="",e.innerHTML="";n.forEach(e=>{const n=document.createElement("LI");n.classList.add("curso_lista"),n.textContent=e,n.ondblclick=u,t.appendChild(n)}),r()}function r(){document.getElementById("formulario__listado").value=n.toString()}function u(t){t.target.remove(),n=n.filter(e=>e!==t.target.textContent),r()}function m(){const t=new URLSearchParams(window.location.search);return Object.fromEntries(t.entries()).id}document.getElementById("contenido").addEventListener("keypress",l)}();
=======
!function(){let t=[],n=[];o();const a=document.querySelector("#agregar-tarea"),e=document.querySelector("#eliminar-tarea");a.addEventListener("click",(function(){!function(t=!1,n={}){const a="/UpTask_MVC/public/index.php/panel/crear-asignatura?id="+s();window.location.href=a}()})),e.addEventListener("click",(function(){!function(t){const n=s();Swal.fire({title:translations.confirmar_eliminar_semestre,showCancelButton:!0,confirmButtonText:translations.confirmar,cancelButtonText:translations.cancelar}).then(t=>{t.isConfirmed&&async function(t){const n=new FormData;n.append("id",t);try{const t="http://localhost/UpTask_MVC/public/index.php/api/eliminarCurso",a=await fetch(t,{method:"POST",body:n}),e=await a.json();"Exito"===e.tipo&&(Swal.fire("Eliminado!",e.mensaje,"success").then(()=>{window.location.href="/UpTask_MVC/public/index.php/panel"}),o())}catch(t){console.log(t)}}(n)})}()}));function i(a){const e=a.target.value;n=""!==e?t.filter(t=>t.estado===e):[],c()}async function o(){try{const n="http://localhost/UpTask_MVC/public/index.php/api/asignatura?id="+s(),a=await fetch(n),e=await a.json();t=e.asignaturas,c()}catch(t){console.log(t)}}function c(){!function(){const t=document.getElementById("listado-asignaturas1");for(;t.firstChild;)t.removeChild(t.firstChild);const n=document.getElementById("listado-asignaturas2");for(;n.firstChild;)n.removeChild(n.firstChild)}();const a=n.length?n:t;if(0===a.length){const t=document.getElementById("listado-asignaturas1"),n=document.createElement("LI");return n.textContent=translations.no_hay_asignaturas,n.classList.add("no-tareas"),void t.appendChild(n)}a.forEach(t=>{const n=document.createElement("LI");n.dataset.tareaId=t.id,n.classList.add("tarea");let a="";const e=document.createElement("P");0===t.info.length?e.textContent=t.asignatura:(t.info.forEach((function(t){t&&t.nombre&&(a+=t.nombre+", ")})),e.textContent=a),e.ondblclick=function(){!function(t=!0,n){const a=s(),e=n.id,i=`/UpTask_MVC/public/index.php/panel/editar-asignatura?id=${a}&idAsignatura=${e}`;window.location.href=i}(!0,{...t})};const i=document.createElement("DIV");i.classList.add("opciones");const c=document.createElement("BUTTON");c.classList.add("estado-tarea"),c.classList.add("pendiente"),c.textContent=translations.modificar_relaciones,c.ondblclick=function(){!function(t){window.location.replace("http://localhost/UpTask_MVC/public/index.php/api/relaciones?id="+t.id)}({...t})};const r=document.createElement("BUTTON");let l;r.classList.add("eliminar-tarea"),r.dataset.idTarea=t.id,r.textContent=translations.eliminar,r.ondblclick=function(){!function(t){Swal.fire({title:translations.confirmar_eliminar_asignatura,showCancelButton:!0,confirmButtonText:translations.confirmar,cancelButtonText:translations.cancelar}).then(n=>{n.isConfirmed&&async function(t){const n=new FormData;n.append("id",t.id);try{const t="http://localhost/UpTask_MVC/public/index.php/api/eliminarasignatura",a=await fetch(t,{method:"POST",body:n}),e=await a.json();"Exito"===e.tipo&&(Swal.fire("Eliminado!",e.mensaje,"success"),o())}catch(t){console.log(t)}}(t)})}({...t})},i.appendChild(c),i.appendChild(r),n.appendChild(e),n.appendChild(i),l=1==t.semestre?document.getElementById("listado-asignaturas1"):document.getElementById("listado-asignaturas2"),l.appendChild(n)})}function s(){const t=new URLSearchParams(window.location.search);return Object.fromEntries(t.entries()).id||idCurso}document.querySelectorAll('#filtros input[type="radio"]').forEach(t=>{t.addEventListener("input",i)})}();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
