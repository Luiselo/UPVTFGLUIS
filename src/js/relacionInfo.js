    function mostrarGrafico(data,curso) {

      const cursoSeleccionado = curso.find(item => item.id === data.group);
      const cursosAnteriores = curso.filter(item => item.numero < cursoSeleccionado.numero);
      console.log('data',data);
      console.log('curso',curso);
      console.log('cursosAnteriores', cursosAnteriores);
      const sourceRelation = [];

for (const item of data.sourceLinks) {
    sourceRelation.push({ asignatura: item.target, value: item.value });
}
      console.log('source', sourceRelation)

      const targetRelation = [];

      for (const item of data.targetLinks) {
        targetRelation.push({ asignatura: item.source, value: item.value });
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
            <legend>${data.nombre}</legend>
                <label>Curso: ${cursoSeleccionado.numero} ${cursoSeleccionado.descripcion}</label>
            <div class="campo">
                <label>Semestre: ${data.semestre}</label>
            </div>

            <h1>Relación de Asignaturas</h1>
            <table class = "relaciones-tabla" border="1">
                <tr>
                    <th>Asignatura Relacionada</th>
                    <th>Curso</th>
                    <th>Nivel de Relevancia</th>
                    <th>Inf </th>
                </tr>
               
            </table>
    
            <div class="campo">
                <label>Descripción: </label>
                <input 
                    type="text"
                    name="descripcion"
                    placeholder="${data.descripcion ? 'Edita la Tarea' : 'Descripción del proyecto'}"
                    id="descripcion"
                    value="${data.descripcion ? data.descripcion : ''}" />
            </div>
            <div class="accordion">
            <button class="accordion-button">Guía Docente Labels</button>
            <div class="accordion-content">
                <label>Título </label>
                <label>Centro </label>
                <label>Curso </label>
                <label>Idiomas </label>
                <label>Docencia </label>
                <label>Guía docente </label>
                <label> Descripción y Contextualización de la asignatura </label>
                <label> Competencias/ Resultados de aprendizaje de la asignatura </label>
                <label> Contenidos teórico-prácticos </label>
                <label> Sistemas de evaluación </label>
                <label> Convocatoria Ordinaria: Orientaciones y Renuncia </label>
            </div>
        </div>
     
            
            <div class="campo">
            <label>Antiguas asignaturas</label>
            <input 
                type="text"
                name="contenido"
                placeholder="${data.campo ? 'Edita la Tarea' : 'Primes simestre'}"
                id="contenido"
                value="${data.campo ? data.nombre : ''}"
            />
            </div>
            <div class="campo">
                <ul class="listado-asignaturas" id="listado-temas">
                </ul>
                <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos"  />     
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

         celdaDescripcion.innerHTML = `
                         ${curso.nombre}
                            <button onclick="expandirCelda(this)">Ver Más</button>
                            <div style="display: none;">
                            Texto completo de la Relación
                            <button onclick="contraerCelda(this)">Cerrar</button>
                            </div>
                            `;
          console.log(celdaNombre);
          console.log(celdaCurso);
          console.log(celdaRelevancia);
          // Establecer el contenido de la celda de Nombre

          
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
  
    

        
    }

    const cursosInputHidden = document.getElementById("contenido");
    // Obtener el botón del acordeón y el contenido
const accordionButton = document.querySelector('.accordion-button');
const accordionContent = document.querySelector('.accordion-content');
console.log(accordionButton);

// Agregar un evento clic al botón del acordeón
accordionButton.addEventListener('click', function () {
   // Alternar la visibilidad del contenido del acordeón
   if (accordionContent.style.display === 'block') {
       accordionContent.style.display = 'none';
   } else {
       accordionContent.style.display = 'block';
   }
});

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