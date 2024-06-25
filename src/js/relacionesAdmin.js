let idiomas = [];
let asignatura = [];


let asignaturas =[];
let idiomaSeleccionado ="es";
let filtro ="-1";
console.log(curso)
console.log(asi)

const selectLanguage = document.getElementById('language-select');

// Agrega un evento para cambiar el idioma al seleccionar una opción
selectLanguage.addEventListener('change', function () {
    const selectedLanguage = this.value; // Obtén el idioma seleccionado
    
    // Llama a la función para cambiar el idioma
    idiomaSeleccionado= selectedLanguage
    filtrarAsignaturas(filtro);
}); 
console.log('1')
/*
async function ObtenerAsignaturas() {
    try {
        //
           

        const id = obtenerProyecto();
        const url = `http://localhost/UpTask_MVC/public/index.php/api/asignatura?id=${id}`;
        const respuesta = await fetch(url);
       
        const resultado = await respuesta.json();
        asignaturas = resultado.asignaturas;
       
        mostrarTareas();
    
    } catch (error) {
        console.log(error);
    }
}

*/

const cursosInputHidden = document.getElementById("contenido");
// Obtener el botón del acordeón y el contenido
const accordionButton = document.querySelector('.accordion-button');
const accordionContent = document.querySelector('.accordion-content');

const boton = document.getElementById("infoEditButton");

  boton.addEventListener("click", panelInfo);
console.log(accordionButton);

console.log('2')
// Agregar un evento clic al botón del acordeón
accordionButton.addEventListener('click', function () {
// Alternar la visibilidad del contenido del acordeón
if (accordionContent.style.display === 'block') {
   accordionContent.style.display = 'none';
} else {
   accordionContent.style.display = 'block';
}
});

console.log('3')
/*
modal.addEventListener('click', function(e) {
   e.preventDefault();
   console.log('entra aqui')
   if(e.target.classList.contains('cerrar-modal')) {
       console.log('se esta cerraando')
       const formulario = document.querySelector('.formulario');
       formulario.classList.add('cerrar');
       setTimeout(() => {
           modal.remove();
       }, 150);
   } 
  
})
*/

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


   
  function editLabel(labelId) {
    
    const textElement = document.getElementById(`${labelId}Text`);
    const inputElement = document.getElementById(`${labelId}Input`);
    const buttonElement = document.getElementById(`${labelId}Button`);

    if (textElement.style.display === "none") {
        textElement.style.display = "inline";
        inputElement.style.display = "none";
        buttonElement.textContent = "Editar";
    } else {
        textElement.style.display = "none";
        inputElement.style.display = "inline";
        buttonElement.textContent = "Guardar";
        

    }


    
}
function mostrarAlerta(mensaje, tipo, referencia) {
    console.log('1')
    // Previene la creación de multiples alertas
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    console.log('2')
    const alerta = document.createElement('DIV');
    alerta.classList.add('alerta', tipo);
    alerta.textContent = mensaje;
    console.log('3',referencia)
    // Inserta la alerta antes del legend
    referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);
    console.log('4')
    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

function expandTextArea(labelId) {
    const textareaContainer = document.getElementById(`${labelId}TextareaContainer`);
    const arrowElement = document.getElementById(`${labelId}Arrow`);
    
    if (textareaContainer.style.display === "none" || textareaContainer.style.display === "") {
        textareaContainer.style.display = "block";
        arrowElement.classList.add("arrow-up");
        arrowElement.classList.remove("arrow-down");
    } else {
        textareaContainer.style.display = "none";
        arrowElement.classList.add("arrow-down");
        arrowElement.classList.remove("arrow-up");
    }
}

function panelInfo( editar = false, asignatura = {}) {



      const modal = document.createElement('div'); // Cambié 'DIV' a 'dsiv' para que sea un elemento HTML válido
      modal.classList.add('modalGrafo'); // Cambié la clase 'se pone friki nasty' a 'modal' (puedes ajustarla según tus estilos CSS)
      modal.innerHTML = `
      <form class="formulario nueva-tarea">
      <div class ="relacion">
      <dl>
      
      <dt>Centro:</dt>
      <input type="text" class="relacionInput" id="centro" value="Facultad de Informática">
      <dt>Titulación:</dt>
      <input type="text" class="relacionInput" id="titulacion" value="Grado en Ingeniería Informática">
      <dt>Curso Académico:</dt>
      <input type="text" class="relacionInput" id="cursoAcademico" value="2023/24">
      <dt>Curso:</dt>
      <input type="text"  class="relacionInput" id="curso" value="Primero Obligatorio">
      <dt>Nº Créditos:</dt>
      <input type="text"  class="relacionInput" id="creditos" value="6">
      <dt>Idiomas:</dt>
      <input type="text"  class="relacionInput" id="idiomas" value="">
      <ul class="listado-asignaturas" id="listado-temas">
      </ul>

  
      </dl>
      <div class="opciones">
      <input 
          type="submit" 
          class="submit-nueva-tarea" 
          value="${asignatura.nombre ? 'Guardar Cambios' : 'Añadir Asignatura'} " 
      />
      <button type="button" class="cerrar-modal">Cancelar</button>
  </div>    
         
      </form>
      
         `;


      setTimeout(() => {
          const formulario = document.querySelector('.formulario');
          formulario.classList.add('animar');
      }, 0);
      document.querySelector('.dashboard').appendChild(modal);

      
    


      if(editar){
       // obtenerTemarios(tarea.id);
    } setTimeout(() => {
        const formulario = document.querySelector('.formulario');
        formulario.classList.add('animar');
    }, 0);

    console.log(modal)





    
  
    modal.addEventListener('click', function(e) {
   
    
        e.preventDefault();
 
        if(e.target.classList.contains('cerrar-modal')) {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('cerrar');
            setTimeout(() => {
                modal.remove();
            }, 500);
        } 
    
        if(e.target.classList.contains('submit-nueva-tarea')) {

            
            const centro = document.getElementById('centro').value.trim();
      
            const titulacion = document.getElementById('titulacion').value.trim();
         
          
        
           const cursoAcademico = document.getElementById('cursoAcademico').value.trim();
           const  curso = document.getElementById('curso').value.trim();

           const creditos = document.getElementById('creditos').value.trim();

            if(centro === '') {
                // Mostrar una alerta de error
                mostrarAlerta('El Nombre del centro es Obligatorio', 'error', document.querySelector('.formulario legend'));
                return;
            } 
           
            if(titulacion === '') {
                // Mostrar una alerta de error
                mostrarAlerta('La titulacion de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                return;
            } 

            if(descripcion === '') {
                // Mostrar una alerta de error
                mostrarAlerta('La titulacion de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                return;
            } 

            if(cursoAcademico === '') {
                // Mostrar una alerta de error
                mostrarAlerta('La titulacion de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                return;
            } 
            
            if(creditos === '') {
                // Mostrar una alerta de error
                mostrarAlerta('La titulacion de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                return;
            } 
            if(idiomas.length == 0){

                mostrarAlerta('No puede contener ningun idioma', 'error', document.querySelector('.formulario legend'));
                return;
            }
            if(editar) {
                tarea.asignatura = nombreTarea;
                tarea.semestre = semestreTarea;
                tarea.descripcion = descripcion;
                actualizarTarea(tarea);
                
            } else {
                agregarTarea(nombreTarea,semestreTarea,descripcion);
            }
            
        }
        
    })

   const cursosInputHidden = document.getElementById("idiomas");
   cursosInputHidden.addEventListener('keypress', guardarTag);
  }

  



    function actualizarInputHidden() {
        const cursosInputHidden = document.getElementById("formulario__listado");        
        cursosInputHidden.value = idiomas.toString();
 
    
    }
    async function actualizarTarea(tarea) {

        const centro = document.querySelector('#tarea').value.trim();
          
        const titulacion = document.getElementById('semestre').value.trim();
     
        const cursoAcademico = document.getElementById('descripcion').value.trim();
    
        const curso = document.getElementById('descripcion').value.trim();
    
        const creditos = document.getElementById('descripcion').value.trim();
    
        const idiomas = document.getElementById('descripcion').value.trim();
    
        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/asignatura/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
            
            const resultado = await respuesta.json();
    
            console.log(resultado);

            if(resultado.tipo === 'exito') {
                Swal.fire(
                    resultado.mensaje,
                    resultado.mensaje,
                    'success'
                );

                const modal = document.querySelector('.modal');
                if(modal) {
                    modal.remove();
                }
               
                

                tareas = tareas.map(tareaMemoria => {
                    if(tareaMemoria.id === id) {
                        tareaMemoria.estado = estado;
                        tareaMemoria.nombre = nombre;
                    } 

                    return tareaMemoria;
                });

                mostrarTareas();
            }
        } catch (error) {
            console.log(error);
        }



        
    }


    function guardarTag(e) {  

        if(e.keyCode === 44) {
            console.log('heloy , 1 ');
            const cursosInputHidden = document.getElementById("idiomas");        
            value = cursosInputHidden.value
            console.log('heloy , 2 ');
            e.preventDefault();
            if(e.target.value.trim() === '' || e.target.value < 1) { 
                return
            }
           
            
            if (idiomas.find(curso => curso == value)){
                return; 
            }
            idiomas = [...idiomas, value];

            mostrarTags();    
            cursosInputHidden.value="";
        }
        }

        function mostrarTags() {
            const cursoDiv = document.getElementById("listado-temas"); 
            const contenido = document.getElementById("idiomas"); 
          
            cursoDiv.innerHTML ='';
            contenido.innerHTML = '' ;
            var i = 0;
            idiomas.forEach(curso => {
                const etiqueta = document.createElement('LI');
                etiqueta.classList.add('curso_lista')
                etiqueta.textContent = curso;
                etiqueta.ondblclick = eliminarTag;
                cursoDiv.appendChild(etiqueta);
            })

           actualizarInputHidden(); 
        }

        function actualizarInputHidden() {
            const cursosInputHidden = document.getElementById("idiomas");        
            cursosInputHidden.value = idiomas.toString();
     
        
        }

        function eliminarTag(e) {

            e.target.remove()
            idiomas = idiomas.filter(curso => curso !== e.target.textContent)
            actualizarInputHidden();

        }


        console.log('4')
        document.addEventListener("DOMContentLoaded", function () {
            var botonGuardar = document.getElementById("editarDescripcion");
            var textarea = document.getElementById("guiadocente");
            console.log('1');
    
            botonGuardar.addEventListener("click", function () {
                console.log('pasa',textarea.value)
                // Obtener el nuevo valor del textarea (puedes modificarlo según tus necesidades)
                actualizarGuia('descripcion',textarea.value);
            });
            console.log('2');
            var botonGuardar = document.getElementById("editarCompetencias");
            var textarea = document.getElementById("competencias");
    
            botonGuardar.addEventListener("click", function () {
                console.log('pasa',textarea.value)
                // Obtener el nuevo valor del textarea (puedes modificarlo según tus necesidades)
                actualizarGuia('competencia',textarea.value);
            });
            console.log('3');
            var botonGuardar = document.getElementById("editarContenidos");
            var textarea = document.getElementById("contenidos");
    
            botonGuardar.addEventListener("click", function () {
                console.log('pasa',textarea.value)
                // Obtener el nuevo valor del textarea (puedes modificarlo según tus necesidades)
                actualizarGuia('temario',textarea.value);
            });

            console.log('4');
            var botonGuardar = document.getElementById("editarEvaluacion");
            var textarea = document.getElementById("sistema");
    
            botonGuardar.addEventListener("click", function () {
                console.log('pasa',textarea.value)
                // Obtener el nuevo valor del textarea (puedes modificarlo según tus necesidades)
                actualizarGuia('evaluacion',textarea.value);
            });

            console.log('5');
            var botonGuardar = document.getElementById("editarConvocatoria");
            var textarea = document.getElementById("convocatoria");
    
            botonGuardar.addEventListener("click", function () {
                console.log('pasa',textarea.value)
                // Obtener el nuevo valor del textarea (puedes modificarlo según tus necesidades)
                actualizarGuia('convocatoria',textarea.value);
            });
        });
        async function actualizarGuia(nombre,des) {
            console.log('pasa',asi.id)
            const id = asi.id;
            const campo = nombre;
            const datos = new FormData();
            
            datos.append('id', asi.id);
            datos.append(nombre, des);
            datos.append('nombre', nombre);
            console.log('pasa',datos)
            
        
            try {
                const url = 'http://localhost/UpTask_MVC/public/index.php/api/asignatura/actualizarGuia';
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: datos
                });

                console.log('pasa',datos)
            
                
                const resultado = await respuesta.json();
        
                console.log(resultado);
    
                if(resultado.tipo === 'exito') {
                    Swal.fire(
                        resultado.mensaje,
                        resultado.mensaje,
                        'success'
                    );
    
                    const modal = document.querySelector('.modal');
                    if(modal) {
                        modal.remove();
                    }
                   
                    
    
                    tareas = tareas.map(tareaMemoria => {
                        if(tareaMemoria.id === id) {
                            tareaMemoria.estado = estado;
                            tareaMemoria.nombre = nombre;
                        } 
    
                        return tareaMemoria;
                    });
    
                    mostrarTareas();
                }
            } catch (error) {
                console.log(error);
            }
    
    
    
            
        }

       
        function obtenerAsignatura() {
            const proyectoParams = new URLSearchParams(window.location.search);
            const proyecto = Object.fromEntries(proyectoParams.entries());
            return proyecto.id;
        }

        var inputs = document.querySelectorAll('input[name="filtro"]');

        // Agregar un event listener a cada elemento para llamar a la función obtenerasignaturasfiltro
        inputs.forEach(function (input) {
            input.addEventListener('change', function () {
                filtro = this.value
                filtrarAsignaturas(filtro);
            });
        });

        // Llamar a la función para el primer elemento seleccionado (si lo deseas)
       
    
        
    filtrarAsignaturas(filtro);
  

        async function filtrarAsignaturas(e) {
            const filtro = e;
            console.log('filtro chupi',e)
            const asignatura = obtenerAsignatura();

                const proyectoParams = new URLSearchParams(window.location.search);
                const proyecto = Object.fromEntries(proyectoParams.entries());
                proyecto.id;
            
          
            const url = `http://localhost/UpTask_MVC/public/index.php/api/relacionAdmin?id=${filtro}&as=${asignatura}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            asignaturas = resultado.resultado;
           
            visualizarAsignatuas(asignaturas,resultado.anos);

         //  document.getElementById("mySavedModel").value = resultado.resultado;
           // console.log(resultado.resultado);
           
    
         
        }
        function visualizarAsignatuas (asignaturas,anos){
            // Obtener una referencia al elemento de la tabla en el DOM
var tabla = document.querySelector('.relaciones-tabla');
while (tabla.rows.length > 0) {
    tabla.deleteRow(0); // Elimina la segunda fila y así sucesivamente
  }
  
// Crear la fila de encabezado
var encabezado = tabla.insertRow();
var encabezadoColumnas = ['Asignatura Relacionada', 'Curso', 'Nivel de Relevancia', 'Inf'];


for (var i = 0; i < encabezadoColumnas.length; i++) {
    var th = document.createElement('th');
    th.textContent = encabezadoColumnas[i];

    encabezado.appendChild(th);
}


// Rellenar la tabla con datos de asignaturas
for (var i = 0; i < asignaturas.length; i++) {
    var fila = tabla.insertRow();
    var datosAsignatura = [obtenerNombrePorIdioma(asignaturas[i]), "", asignaturas[i].asignatura, asignaturas[i].asignatura];
    var asignaturaID = asignaturas[i].id; // Guarda el ID de la asignatura

    for (var j = 0; j < anos.length; j++) {
        if (asignaturas[i].cursoID === anos[j].id) {
            datosAsignatura[1] = anos[j].numero + ' ' + anos[j].descripcion; // Asignar el nombre del curso
            break; // Salir del bucle una vez que se haya encontrado el nombre
        }
    }

    for (var j = 0; j < datosAsignatura.length; j++) {
        var celda = fila.insertCell();

        celda.textContent = datosAsignatura[j];
        fila.setAttribute('data-asignatura-id', asignaturaID);
    }
    if (asignaturas[i].tiene_relacion == 1) {
        fila.classList.add('verde');
    }
}
var filas = tabla.getElementsByTagName("tr");

// Agrega un evento de clic a cada fila
for (var i = 1; i < filas.length; i++) {
  filas[i].addEventListener("click", function() {
    // Cambia el estilo de fondo de la fila seleccionada
    this.classList.toggle("seleccionada");
    var filaID = this.getAttribute('data-asignatura-id');
    var idAsignatura = obtenerAsignatura();
    editarRelacion(idAsignatura,filaID);
    
  });

  filas[i].addEventListener("mouseover", function() {
    // Cambia el estilo de fondo cuando el ratón entra en la fila
    this.classList.add("hovered");
  });

  filas[i].addEventListener("mouseout", function() {
    // Elimina el estilo de fondo cuando el ratón sale de la fila
    this.classList.remove("hovered");
  });
}
        }







        async function  editarRelacion(id1,id2) {
            const url = `http://localhost/UpTask_MVC/public/index.php/api/asignaturasRelacion?id1=${id1}&id2=${id2}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
          

            asignatura1 = resultado.respuesta.asignatura1;
            console.log('quiero ver',asignatura1);
            asignatura2 = resultado.respuesta.asignatura2;
            nombre1= obtenerNombrePorIdioma(resultado.respuesta.asignatura1);
            nombre2= obtenerNombrePorIdioma(resultado.respuesta.asignatura2);

            info1 = obtenerInfo(asignatura1);
            info2 = obtenerInfo(asignatura2);


            console.log(asignatura1);
      
             // links = sourceLinks.concat('LINKS',targetLinks);
              const modal = document.createElement('DIV'); // Cambié 'DIV' a 'dsiv' para que sea un elemento HTML válido
              modal.classList.add('modalGrafo'); // Cambié la clase 'se pone friki nasty' a 'modal' (puedes ajustarla según tus estilos CSS)
              modal.innerHTML = `
              <form class="formulario nueva-tarea"  style="overflow: auto;">
  <div class="centrado">
    <legend class="centered-text">Relación de Asignaturas</legend>
    <h2 class="centered-text">${nombre1} y ${nombre2}</h2>

    
    
    <div class="campo">
      <label>Tipo de Relevancia:</label>
      <select name="tipo_relevancia" id="tipoRelevancia">
        <option value="fuerte">Relevancia Fuerte</option>
        <option value="moderada">Relevancia Moderada</option>
        <option value="ligera">Relevancia Ligera</option>
      </select>
    </div>

    <div class="campo">
      <label>Descripción de la Relación:</label>
      <textarea name="descripcion_relacion" id="descripcionRelacion" rows="4"></textarea>
    </div>
<div class="campo" style="display: none;">
      <label>Tags en común:</label>
      <input type="text" id="tags" name="tags" disabled>
    </div>



    <div class="campo">
      <ul class="listado-asignaturas" id="listado-temas"></ul>
      <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos" />
    </div>

    <div class="opciones">
    <input 
        type="submit" 
        class="submit-nueva-tarea" 
        value="${asignatura.nombre ? 'Guardar Cambios' : 'Asignar Relación'} " 
    />
    <button type="button" class="cerrar-modal">Cancelar</button>
</div>    

   
  </div>
</form>

                 `;

                 /*
                 if(editar){
                    obtenerTemarios(tarea.id);
                }
      */

              setTimeout(() => {
                  const formulario = document.querySelector('.formulario');
                  formulario.classList.add('animar');
              }, 0);
             
              
              const tabla = document.querySelector('table');
              const cursosInputHidden = document.getElementById("contenido");
              // Obtener el botón del acordeón y el contenido
             ;
              const accordionContent1 = document.querySelector('.accordion-content1');
              const accordionContent2 = document.querySelector('.accordion-content2');
             
                // Agregar un evento clic al botón del acordeón
              
      
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
               /*
                
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
                */
              
    
          
      
          // Agregar un evento clic al botón del acordeón
     
              modal.addEventListener('click', function(e) {
                  e.preventDefault();
                  if(e.target.classList.contains('cerrar-modal')) {
                      const formulario = document.querySelector('.formulario');
                      formulario.classList.add('cerrar');
                      setTimeout(() => {
                          modal.remove();
                      }, 150);
                  } 

                  if(e.target.classList.contains('submit-nueva-tarea')) {
             
                    const descripcionRelacion = document.getElementById('descripcionRelacion').value.trim();
                 
                    const tipoRelevancia = document.getElementById('tipoRelevancia').value.trim();
                
                   console.log('pasa'); 
                   
                    if(descripcionRelacion === '') {
                        // Mostrar una alerta de error
                        mostrarAlerta('La descripción de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                        return;
                    } 
    /*
                    if(editar) {
                        tarea.asignatura = nombreTarea;
                        tarea.semestre = semestreTarea;
                        tarea.descripcion = descripcion;
                        actualizarTarea(tarea);

                    
                        
                    }*/ else {
                        agregarRelacion(descripcionRelacion,tipoRelevancia,id1,id2);
                        setTimeout(() => {
                            modal.remove();
                        }, 150);
                    }
                    
                }
            })
                           
      
            document.querySelector('.dashboard').appendChild(modal);
      
          }

          async function agregarRelacion(descripcion,relacion,asignatura,asignatura1) {
            // Construir la petición
            const datos = new FormData();
           
            datos.append('descripcion', descripcion
            );
            datos.append('color', relacion);
            datos.append('id_asignatura1', asignatura);
            datos.append('id_asignatura2', asignatura1);
           
           
    
            try {
    
                const url = 'http://localhost/UpTask_MVC/public/index.php/api/AnadirRelacion';
              
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: datos
                });
             
                const resultado = await respuesta.json();
                mostrarAlerta(
                    resultado.mensaje, 
                    resultado.tipo, 
                    document.querySelector('.formulario legend')
                );

                console.log(resultado.tipo);
    
                if(resultado.tipo === 'exito') {
                    /*
                    Swal.fire(
                        resultado.mensaje,
                        resultado.mensaje,
                        'success'
                    );
                    */
    
                    const modal = document.querySelector('.modal');
                    if(modal) {
                        modal.remove();
                        window.location.reload();
                    }
                   
                    
    
    
                    
                }
            }catch (error) {
                console.log(error);
            }     
        }
    
        

          
function obtenerNombrePorIdioma(obj) {
    console.log(obj, idiomaSeleccionado)
    // Verifica si obj tiene la propiedad 'info' y no está vacía
    if (obj.info && obj.info.length > 0) {
        // Busca el objeto info que corresponde al idioma seleccionado
        const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);
  
        // Si se encuentra la información en el idioma seleccionado, devuelve su nombre
        if (infoIdioma && infoIdioma.nombre) {
            return infoIdioma.nombre;
        }
  
        // Si no se encuentra el idioma seleccionado, devuelve el nombre en el primer idioma del array
        const primerIdioma = obj.info[0];
        if (primerIdioma && primerIdioma.nombre) {
            return primerIdioma.nombre;
        }
    }
  
    // Si obj.info está vacío o no se encuentra el idioma seleccionado ni el primer idioma, devuelve obj.nombre
    return obj.asignatura;
  }

  function obtenerInfo(obj) {
    console.log(obj, idiomaSeleccionado)
    // Verifica si obj tiene la propiedad 'info' y no está vacía
    if (obj.info && obj.info.length > 0) {
        // Busca el objeto info que corresponde al idioma seleccionado
        const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);
  
        // Si se encuentra la información en el idioma seleccionado, devuelve su nombre
        if (infoIdioma && infoIdioma.nombre) {
            return infoIdioma;
        }
  
        // Si no se encuentra el idioma seleccionado, devuelve el nombre en el primer idioma del array
        const primerIdioma = obj.info[0];
        if (primerIdioma && primerIdioma.nombre) {
            return primerIdioma;
        }
    }
  
    // Si obj.info está vacío o no se encuentra el idioma seleccionado ni el primer idioma, devuelve obj.nombre
    return obj.asignatura;
  }