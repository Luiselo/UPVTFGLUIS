    function mostrarGrafico(data,curso) {

      const cursoSeleccionado = curso.find(item => item.id === data.group);
      const cursosAnteriores = curso.filter(item => item.numero < cursoSeleccionado.numero);
      console.log('data',data);
      console.log('curso',curso);
      console.log('cursosAnteriores', cursosAnteriores);
      const sourceRelation = [];

for (const item of data.sourceLinks) {
  console.log('smantha hudson', item)
    sourceRelation.push({id:item.target.id,  asignatura: item.target, value: item.value });
}
      console.log('source', sourceRelation)

      const targetRelation = [];

      for (const item of data.targetLinks) {
        targetRelation.push({ id:item.source.id, asignatura: item.source, value: item.value });
    }
    const relaciones = sourceRelation.concat(targetRelation);

      const links =  data.sourceLinks.concat(data.targetLinks);
      console.log('relaciones',relaciones)

      const nombresUnicos = new Set(relaciones.map(item => item.asignatura))
      console.log('nomresUnicos', nombresUnicos)
      
    //  const todasLasrelaciones = data.relaciones.map(x=>({source: x.id_asignatura1, target: x.id_asignatura2, value: x.descripcion}).flat());
     // console.log('todasLasRelaciones',todasLasrelaciones);

       // links = sourceLinks.concat('LINKS',targetLinks);
        const modal = document.createElement('div'); // Cambié 'DIV' a 'dsiv' para que sea un elemento HTML válido
        modal.classList.add('modalGrafo'); // Cambié la clase 'se pone friki nasty' a 'modal' (puedes ajustarla según tus estilos CSS)
        modal.innerHTML = `
        
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
                <label>Descripción: </label>
                <input 
                    type="text"
                    name="descripcion"
                    placeholder="${data.descripcion ? 'Edita la Tarea' : 'Descripción del proyecto'}"
                    id="descripcion"
                    value="${data.descripcion ? data.descripcion : ''}" />
            </div>
          
           
            <div class="opciones">
                <button type="button" class="cerrar-modal">Cancelar</button>
            </div>
        </form>
        
           `;




        
        console.log('despues de conducir sin parar');
        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);
        document.querySelector('.dashboard').appendChild(modal);

        
        const tabla = document.querySelector('table');

        // Recorrer los nombres únicos y agregar una fila por cada nombre
        nombresUnicos.forEach(nombre => {

         console.log('1');
          // Crear una nueva fila
          const fila = document.createElement('tr');
        
          // Crear celdas para los campos Nombre, Curso y Nivel de Relevancia
          const celdaNombre = document.createElement('td');
          const celdaCurso = document.createElement('td');
          const celdaRelevancia = document.createElement('td');

          const celdaDescripcion = document.createElement('td');

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
           relevancia = "";
          if (cursoSeleccionado.numero > cursoSel.numero){
            relevancia = "predecesora";

          }else if(cursoSeleccionado.numero < cursoSel.numero){
            relevancia = "sucesora";
          }else{
            relevancia = "relación";
          }
          celdaNombre.textContent = nombre.nombre;
          celdaCurso.textContent = cursoSel.numero + " "+ cursoSel.descripcion;
          celdaRelevancia.textContent = relevancia;
        
          // Agregar las celdas a la fila
          fila.appendChild(celdaNombre);
       

          fila.appendChild(celdaCurso);
         
          fila.appendChild(celdaRelevancia);
          fila.appendChild(celdaDescripcion);
          console.log(tabla)   
          // Agregar la fila a la tabla
          tabla.appendChild(fila);
        });

        tabla.addEventListener('click', function(event) {
          const fila = event.target.closest('tr'); // Busca la fila más cercana al elemento clicado
        
          if (fila) {
            // Aquí puedes ejecutar la función que desees con la fila
            console.log('Fila clicada:', fila);
            // Por ejemplo, si deseas obtener los datos de una celda específica, puedes hacerlo así:
            const celdas = fila.querySelectorAll('td'); // Obtén todas las celdas de la fila
            const asignaturaRelacionada = celdas[0].textContent; // Obten la asignatura relacionada
            const idAsignatura = getIdAsignaturaPorNombre(asignaturaRelacionada, relaciones);
            document.getElementById('textAsignatura').textContent = asignaturaRelacionada;
            obtenerinfo(data.id,idAsignatura);
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

          console.log('se esta cerraando')
          const formulario = document.querySelector('.formulario');
          formulario.classList.add('cerrar');
          setTimeout(() => {
              modal.remove();
          }, 150);
      } 
     
  })

        
    }

    

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


      function getIdAsignaturaPorNombre(nombreBuscado,asignaturas) {
        let idAsignatura = null;

        asignaturas.forEach(asignatura => {
         
          if (asignatura.asignatura.nombre === nombreBuscado) {
            idAsignatura = asignatura.asignatura.id;
          }
        });
      
        return idAsignatura;
      }


      async function obtenerinfo(id1,id2) {
        // Construir la petición
        const datos = new FormData();
    
     
    
        try {
            const url = `http://localhost/UpTask_MVC/public/index.php/api/inforelaciones?id1=${id1}&id2=${id2}`;
          
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
           
            let textoRelevancia = '';
          console.log(resultado,' MENUDO DIA XD');
            if (resultado.respuesta.relacion[0].color === "0") {
              textoRelevancia = "Relevancia Ligera";
            } else if (resultado.respuesta.relacion[0].color === "1") {
              textoRelevancia = "Relevancia Moderada";
            } else if (resultado.respuesta.relacion[0].color === "2") {
              textoRelevancia = "Relevancia Fuerte";
            } else {
              textoRelevancia = "Relevancia Desconocida";
            }

            console.log(resultado.respuesta.tags);
//sdocument.getElementById('tagsComun').textContent = re.tipo;
document.getElementById('nivelRelacion').textContent = textoRelevancia;
document.getElementById('descripciónValue').textContent = resultado.respuesta.relacion[0].descripcion;


                console.log(resultado);

           
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }