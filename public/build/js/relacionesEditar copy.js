const cursosInputHidden=document.getElementById("contenido"),accordionButton=document.querySelector(".accordion-button"),accordionContent=document.querySelector(".accordion-content");function expandirCelda(e){e.nextElementSibling.style.display="block",e.style.display="none"}function contraerCelda(e){const t=e.parentElement;t.style.display="none",t.previousElementSibling.style.display="inline"}console.log(accordionButton),accordionButton.addEventListener("click",(function(){"block"===accordionContent.style.display?accordionContent.style.display="none":accordionContent.style.display="block"})),modal.addEventListener("click",(function(e){if(e.preventDefault(),console.log("entra aqui"),e.target.classList.contains("cerrar-modal")){console.log("se esta cerraando");document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{modal.remove()},150)}})),function(){document.querySelectorAll('#filtrosAsignaturas input[type="radio').forEach(t=>{t.addEventListener("input",e)});async function e(e){const t=e.target.value,o=n();console.log(t);const c=`http://localhost/UpTask_MVC/public/index.php/api/relacion?id=${t}&as=${o}`,a=await fetch(c),l=await a.json();document.getElementById("mySavedModel").value=l.resultado,console.log(l.resultado),load()}function t(){return document.querySelector('input[name="filtro"]:checked').value}function n(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).id}document.getElementById("guardarRelacion").addEventListener("click",(function(){!async function(){console.log("entra a guardar"),save();const o=t(),c=(document.getElementById("mySavedModel").value,n(),new FormData);c.append("idCurso",t()),c.append("relaciones",document.getElementById("mySavedModel").value),c.append("idAsignatura",n());const a=await fetch("http://localhost/UpTask_MVC/public/index.php/api/relacion",{method:"POST",body:c});(await a.json()).resultado;e(o)}()}));document.getElementById("contenido");const o=document.querySelector(".accordion-button"),c=document.querySelector(".accordion-content");o.addEventListener("click",(function(){"block"===c.style.display?c.style.display="none":c.style.display="block"})),modal.addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("cerrar-modal")){console.log("se esta cerraando");document.querySelector(".formulario").classList.add("cerrar"),setTimeout(()=>{modal.remove()},150)}}))}();