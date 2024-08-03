    function mostrarGrafico(data,curso) {

      const cursoSeleccionado = curso.find(item => item.id === data.group);
      const cursosAnteriores = curso.filter(item => item.numero < cursoSeleccionado.numero);
<<<<<<< HEAD
      console.log('data',data);
      console.log('curso',curso);
      console.log('cursosAnteriores', cursosAnteriores);
      const sourceRelation = [];

for (const item of data.sourceLinks) {
  console.log('smantha hudson', item)
    sourceRelation.push({id:item.target.id,  asignatura: item.target, value: item.value });
}
      console.log('source', sourceRelation)
=======
      
  
      const sourceRelation = [];

for (const item of data.sourceLinks) {

    sourceRelation.push({id:item.target.id,  asignatura: item.target, value: item.value });
}
      
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

      const targetRelation = [];

      for (const item of data.targetLinks) {
        targetRelation.push({ id:item.source.id, asignatura: item.source, value: item.value });
    }
    const relaciones = sourceRelation.concat(targetRelation);

      const links =  data.sourceLinks.concat(data.targetLinks);
<<<<<<< HEAD
      console.log('relaciones',relaciones)

      const nombresUnicos = new Set(relaciones.map(item => item.asignatura))
      console.log('nomresUnicos', nombresUnicos)
=======
  

      const nombresUnicos = new Set(relaciones.map(item => item.asignatura))
      
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
      
    //  const todasLasrelaciones = data.relaciones.map(x=>({source: x.id_asignatura1, target: x.id_asignatura2, value: x.descripcion}).flat());
     // console.log('todasLasRelaciones',todasLasrelaciones);

       // links = sourceLinks.concat('LINKS',targetLinks);
        const modal = document.createElement('div'); // Cambié 'DIV' a 'dsiv' para que sea un elemento HTML válido
        modal.classList.add('modalGrafo'); // Cambié la clase 'se pone friki nasty' a 'modal' (puedes ajustarla según tus estilos CSS)
        modal.innerHTML = `
<<<<<<< HEAD
        
        <form class="formulario nueva-tarea">
            <h2>Relaciónes de ${data.nombre}</h2>
           
          
          

          <div class="Info">
  <div class="info-campo">
  <div class="columna">

<h3>Asignatura relacionada:</h3>
   <p id="textAsignatura"></p>

   
  <h3>Nivel de la relación:</h3>
  <p id="nivelRelacion"></p>
    <h3>Tags en común:</h3>
  <p id="tagsComun"></p>
</div>
<div class="columna">

  <textarea id="descripciónValue"></textarea>
</div>
  </div>
 
</div>

            <table class = "relaciones-tabla" border="1">
                <tr>
                    <th>Asignatura Relacionada</th>
                    <th>Curso</th>
                    <th>Nivel de Relevancia</th>
                    <th>Url </th>
                </tr>
               
            </table>
    
            <div class="campo"  style="display: none;>
=======
        <form class="formulario nueva-tarea">
            <h2>Relaciónes de <a href="${data.url}" target="_blank">${data.nombre}</a> Semestre: ${data.semestre} </h2>
            
            <div class="Info">
                <div class="info-campo">
                    <div class="columna">
                        <h3>Asignatura relacionada:</h3>
                        <p id="textAsignatura"></p>
                        <h4>Nivel de la relación:</h4>
                        <p id="nivelRelacion"></p>
                        <h4>Tags en común:</h4>
                        <p id="tagsComun"></p>
                        
                    </div>
                    <div class="columna">
                        <textarea id="descripciónValue"></textarea>
                    </div>
                </div>
            </div>
            
            <table class="relaciones-tabla" border="1">
                <tr>
                    <th>Asignatura Relacionada</th>
                    <th>Curso</th>
                    <th>Semestre</th>
                    <th>Url</th>
                </tr>
            </table>
            
            <div class="campo" style="display: none;">
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                <label>Descripción: </label>
                <input 
                    type="text"
                    name="descripcion"
                    placeholder="${data.descripcion ? 'Edita la Tarea' : 'Descripción del proyecto'}"
                    id="descripcion"
                    value="${data.descripcion ? data.descripcion : ''}" />
            </div>
<<<<<<< HEAD
          
           
=======
            
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            <div class="opciones">
                <button type="button" class="cerrar-modal">Cancelar</button>
            </div>
        </form>
<<<<<<< HEAD
        
           `;
=======
    `;
    
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)




        
<<<<<<< HEAD
        console.log('despues de conducir sin parar');
=======
  
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);
        document.querySelector('.dashboard').appendChild(modal);

        
        const tabla = document.querySelector('table');

        // Recorrer los nombres únicos y agregar una fila por cada nombre
        nombresUnicos.forEach(nombre => {

<<<<<<< HEAD
         console.log('1');
=======
    
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
          // Crear una nueva fila
          const fila = document.createElement('tr');
        
          // Crear celdas para los campos Nombre, Curso y Nivel de Relevancia
          const celdaNombre = document.createElement('td');
          const celdaCurso = document.createElement('td');
          const celdaRelevancia = document.createElement('td');

          const celdaDescripcion = document.createElement('td');

<<<<<<< HEAD
          console.log('name',nombre)
            
         celdaDescripcion.innerHTML = `
                       
                            
                            <div>
                              ${nombre.nombre}
                        
                            </div>
                            `;
          console.log(celdaNombre);
          console.log(celdaCurso);
          console.log(celdaRelevancia);
          // Establecer el contenido de la celda de Nombre

          console.log('SOLO por saber', curso)
          const cursoSel = curso.find(item => item.id === nombre.group);
=======
          
      
         
          // Establecer el contenido de la celda de Nombre

       
          const cursoSel = curso.find(item => item.id === nombre.group);
          /*
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
           relevancia = "";
          if (cursoSeleccionado.numero > cursoSel.numero){
            relevancia = "predecesora";

          }else if(cursoSeleccionado.numero < cursoSel.numero){
            relevancia = "sucesora";
          }else{
            relevancia = "relación";
          }
<<<<<<< HEAD
          celdaNombre.textContent = nombre.nombre;
          celdaCurso.textContent = cursoSel.numero + " "+ cursoSel.descripcion;
          celdaRelevancia.textContent = relevancia;
=======
            */
           if(nombre.semestre = 1){
            relevancia="Primer semestre"
           }else{
            relevancia = "Segundo semestre"
           }
          celdaNombre.textContent = nombre.nombre;
          celdaCurso.textContent = cursoSel.numero + " "+ cursoSel.descripcion;
          celdaRelevancia.textContent = relevancia;
                
         celdaDescripcion.innerHTML = `
                       
                            
         <div>
           ${nombre.url}
     
         </div>
         `;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        
          // Agregar las celdas a la fila
          fila.appendChild(celdaNombre);
       

          fila.appendChild(celdaCurso);
         
          fila.appendChild(celdaRelevancia);
          fila.appendChild(celdaDescripcion);
<<<<<<< HEAD
          console.log(tabla)   
=======
     
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
          // Agregar la fila a la tabla
          tabla.appendChild(fila);
        });

        tabla.addEventListener('click', function(event) {
          const fila = event.target.closest('tr'); // Busca la fila más cercana al elemento clicado
        
          if (fila) {
            // Aquí puedes ejecutar la función que desees con la fila
<<<<<<< HEAD
            console.log('Fila clicada:', fila);
            // Por ejemplo, si deseas obtener los datos de una celda específica, puedes hacerlo así:
            const celdas = fila.querySelectorAll('td'); // Obtén todas las celdas de la fila
            const asignaturaRelacionada = celdas[0].textContent; // Obten la asignatura relacionada
            const idAsignatura = getIdAsignaturaPorNombre(asignaturaRelacionada, relaciones);
            document.getElementById('textAsignatura').textContent = asignaturaRelacionada;
            obtenerinfo(data.id,idAsignatura);
=======
        
            // Por ejemplo, si deseas obtener los datos de una celda específica, puedes hacerlo así:
            const celdas = fila.querySelectorAll('td'); // Obtén todas las celdas de la fila
            const asignaturaRelacionada = celdas[0].textContent; // Obten la asignatura relacionada
            const asignaturaTarget = getasignaturaTargetPorNombre(asignaturaRelacionada, relaciones);
         
            
            document.getElementById('textAsignatura').textContent = asignaturaRelacionada;
            console.log('tagsEnComun')
            tagsEnComun = obtenerTagsEnComun(data,asignaturaTarget)
          console.log(tagsEnComun)
            escribirTagsEnComun(tagsEnComun)
            obtenerinfo(data.id,asignaturaTarget.id);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
          }
        });
        const cursosInputHidden = document.getElementById("contenido");
         // Obtener el botón del acordeón y el contenido

         /*
    const accordionButton = document.querySelector('.accordion-button');
    const accordionContent = document.querySelector('.accordion-content');
    

    // Agregar un evento clic al botón del acordeón
    accordionButton.addEventListener('click', function () {
        // Alternar la visibilidad del contenido del acordeón
        if (accordionContent.style.display === 'block') {
            accordionContent.style.display = 'none';
        } else {
            accordionContent.style.display = 'block';
        }
    });
*/
    modal.addEventListener('click', function(e) {
      e.preventDefault();
      if(e.target.classList.contains('cerrar-modal')) {

<<<<<<< HEAD
          console.log('se esta cerraando')
=======
     
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
          const formulario = document.querySelector('.formulario');
          formulario.classList.add('cerrar');
          setTimeout(() => {
              modal.remove();
          }, 150);
      } 
     
  })

        
    }

<<<<<<< HEAD
    

=======

    // Función para agregar los tags al párrafo
function escribirTagsEnComun(tags) {
  const tagsComunElement = document.getElementById('tagsComun');
  tagsComunElement.textContent = ''; // Limpiar contenido existente

  if (tags.length === 0) {
      tagsComunElement.textContent = 'No hay tags en común.';
  } else {
      tagsComunElement.textContent = 'Tags en común: ' + tags.join(', ');
  }
}
// Función para obtener los tags en común
// Función para obtener los tags en común
function obtenerTagsEnComun(asignaturaTarget, asignaturaData) {
  // Verificar y obtener los tags de la asignaturaTarget
  const tagsTarget = Array.isArray(asignaturaTarget.tags) ? asignaturaTarget.tags.map(tag => tag.descripcion) : [];

  // Inicializar un array para los tags en común
  const tagsEnComun = [];

  // Verificar que asignaturaData.tags sea un array, si no, inicializarlo como un array vacío
  const tagsData = Array.isArray(asignaturaData.tags) ? asignaturaData.tags : [];

  // Iterar sobre los tags de asignaturaData
  tagsData.forEach(tag => {
    if (tagsTarget.includes(tag.descripcion) && !tagsEnComun.includes(tag.descripcion)) {
      tagsEnComun.push(tag.descripcion);
    }
  });

  return tagsEnComun;
}
 
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function expandirCelda(button) {
        const div = button.nextElementSibling; // Obtiene el elemento div siguiente
        div.style.display = "block"; // Muestra el contenido completo de la relación
        button.style.display = "none"; // Oculta el botón "Ver Más"
      }
      
      function contraerCelda(button) {
        const div = button.parentElement; // Obtiene el elemento div padre
        div.style.display = "none"; // Oculta el contenido completo de la relación
        div.previousElementSibling.style.display = "inline"; // Muestra el botón "Ver Más"
      }


<<<<<<< HEAD
      function getIdAsignaturaPorNombre(nombreBuscado,asignaturas) {
        let idAsignatura = null;
=======
      function getasignaturaTargetPorNombre(nombreBuscado,asignaturas) {
        let asignaturaTarget = null;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        asignaturas.forEach(asignatura => {
         
          if (asignatura.asignatura.nombre === nombreBuscado) {
<<<<<<< HEAD
            idAsignatura = asignatura.asignatura.id;
          }
        });
      
        return idAsignatura;
=======
            asignaturaTarget = asignatura.asignatura;
          }
        });
      
        return asignaturaTarget;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
      }


      async function obtenerinfo(id1,id2) {
        // Construir la petición
        const datos = new FormData();
    
     
    
        try {
            const url = `http://localhost/UpTask_MVC/public/index.php/api/inforelaciones?id1=${id1}&id2=${id2}`;
          
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
           
            let textoRelevancia = '';
<<<<<<< HEAD
          console.log(resultado,' MENUDO DIA XD');
=======
     
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            if (resultado.respuesta.relacion[0].color === "0") {
              textoRelevancia = "Relevancia Ligera";
            } else if (resultado.respuesta.relacion[0].color === "1") {
              textoRelevancia = "Relevancia Moderada";
            } else if (resultado.respuesta.relacion[0].color === "2") {
              textoRelevancia = "Relevancia Fuerte";
            } else {
              textoRelevancia = "Relevancia Desconocida";
            }

<<<<<<< HEAD
            console.log(resultado.respuesta.tags);
//sdocument.getElementById('tagsComun').textContent = re.tipo;
document.getElementById('nivelRelacion').textContent = textoRelevancia;
document.getElementById('descripciónValue').textContent = resultado.respuesta.relacion[0].descripcion;


                console.log(resultado);
=======
    
//sdocument.getElementById('tagsComun').textContent = re.tipo;
document.getElementById('nivelRelacion').textContent = textoRelevancia;
document.getElementById('descripciónValue').textContent = resultado.respuesta.relacion[0].descripcion;
// Obtener el nombre actual del elemento textAsignatura
const textAsignaturaElement = document.getElementById('textAsignatura');
const nombreAsignatura = textAsignaturaElement.textContent;

// Crear el enlace
const asignaturaEnlace = document.createElement('a');
asignaturaEnlace.href = resultado.respuesta.asignatura.url;
asignaturaEnlace.target = '_blank'; // Abre el enlace en una nueva pestaña
asignaturaEnlace.textContent = nombreAsignatura; // Usa el nombre actual del elemento

// Reemplazar el contenido del elemento con el enlace
textAsignaturaElement.textContent = ''; // Limpiar cualquier texto existente
textAsignaturaElement.appendChild(asignaturaEnlace);


>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

           
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
<<<<<<< HEAD
    }
=======
    }

    function mostrarRelacion(relacion) {
     
  
      const modal = document.createElement('div');
      modal.classList.add('modalGrafo');
  
      if (!relacion.source || !relacion.target) {
 
          return;
      }
  
      var nombre1 = relacion.source.nombre;
      var nombre2 = relacion.target.nombre;
  
  
      var relevancia = {
          0: '1', // Relevancia Ligera
          1: '2', // Relevancia Moderada
          2: '3'  // Relevancia Fuerte
      }[relacion.color];
  
  
      var descripcion = relacion.value;
  
  
      modal.innerHTML = `
      <form class="formulario nueva-tarea" style="overflow: auto;">
          <div class="centrado">
              <legend class="centered-text">Relación de Asignaturas</legend>
              <h2 class="centered-text">${nombre1} y ${nombre2}</h2>
  
              <div class="campo">
                  <label>Tipo de Relevancia:</label>
                  <select name="tipo_relevancia" id="tipoRelevancia" disabled>
                      <option value="3">Relevancia Fuerte</option>
                      <option value="2">Relevancia Moderada</option>
                      <option value="1">Relevancia Ligera</option>
                  </select>
              </div>
  
              <div class="campo">
                  <label>Descripción de la Relación:</label>
                  <textarea name="descripcion_relacion" id="descripcionRelacion" rows="4" readonly></textarea>
              </div>
  
              <div class="campo" style="display: none;">
                
                  <input type="text" id="tags" name="tags" disabled>
              </div>
  
              <div class="campo">
                  <ul class="listado-asignaturas" id="listado-temas"></ul>
                  <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos" />
              </div>
  
              <div class="opciones">
                  <button type="button" class="cerrar-modal">Salir</button>
              </div>
          </div>
      </form>
      `;
  
      // Añadir el modal al cuerpo del documento
      setTimeout(() => {
          const formulario = document.querySelector('.formulario');
          formulario.classList.add('animar');
      }, 0);
      document.querySelector('.dashboard').appendChild(modal);
  
   
  
      // Establecer la relevancia seleccionada y la descripción
      document.getElementById('tipoRelevancia').value = relevancia;
      document.getElementById('descripcionRelacion').value = descripcion;
  
      // Deshabilitar todos los campos para que no se pueda interactuar con ellos
      var formElements = modal.querySelectorAll('input, textarea, select, button');
      formElements.forEach(function(element) {
          element.disabled = true;
      });
  
      // Habilitar solo el botón de cancelar
      var cerrarModalButton = modal.querySelector('.cerrar-modal');
      cerrarModalButton.disabled = false;
  
      // Añadir el evento para cerrar el modal
      cerrarModalButton.addEventListener('click', function() {
          document.querySelector('.dashboard').removeChild(modal);
      });
  }
  
  
  
  
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
