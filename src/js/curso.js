(function Añadir() {
    let paso = 1;
    const pasoInicial = 1;
    const pasoFinal = 3;
    console.log('1')
  

   
    
    const anoButton = document.getElementById("agregar-curso"); 
    const numberInput = document.getElementById("curso");
    const descripcionInput = document.getElementById("descripcion");
    const cursoDiv = document.getElementById("listado-proyectos");
    const cursosInputHidden = document.getElementById("formulario__listado");
    const tablaButton = document.getElementById("buton_tabla");
    const cursoDiv2 = document.getElementById("tabla__cursos2");
   
    const eliminarTareaBtn = document.querySelector('#eliminar-tarea');
    
    eliminarTareaBtn.addEventListener('click', function() {
        confirmarEliminarSemestre();
    });
    function confirmarEliminarSemestre(tarea) {
        const id = obtenerProyecto();
        Swal.fire({
            title: '¿Estas seguro de que quieresn eliminar el semestre completo?',
            showCancelButton: true,
            confirmButtonText:'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('jiji')
                eliminarCurso(id);
            } 
        })
    }
    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
        return proyecto.id;
    }

    async function eliminarCurso(tarea) {

      
        
        const datos = new FormData();
        datos.append('id', tarea);
   


        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/eliminarGrado';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();
            if(resultado.tipo = "Exito") {
                 

                Swal.fire('Eliminado!', resultado.mensaje, 'success');

                //tareas = tareas.filter( tareaMemoria => tareaMemoria.id !== tarea.id);
                ObtenerAsignaturas();
                
            }
            
        } catch (error) {
            
        }
    }
    console.log('2')
    let cursos = [];

    // Recuperar del input oculto
    if (cursosInputHidden.value !== '') {
        cursos = cursosInputHidden.value.split(',');
        mostrarTags();
    }
    console.log('3')
    // Escuchar los cambios en el input

   
    anoButton.addEventListener('click', mostrarFormulario);
    console.log('3')
    function guardarTag() {          
        let value = numberInput.value + ' ' + descripcionInput.value;
        if (cursos.includes(value)) {
            return; 
        }
        cursos = [...cursos, value];
        descripcionInput.value = 'Obligatorio';
        mostrarTags();    
    }
    console.log('4')
    function mostrarSeccion() {
        paso++;
        let aux = 1;

        const seccionAnterior = document.querySelectorAll('.paso');
        const seccionAnterior2 = document.querySelectorAll('.section');
       
        seccionAnterior.forEach(element => {
            if (aux == paso) {
                element.classList.add('is-active');
            } else {
                element.classList.remove('is-active');
            }
            aux++;
        });

        aux = 1;
        seccionAnterior2.forEach(element => {
            if (aux == paso) {
                element.classList.add('step-active');
            } else {
                element.classList.remove('step-active');
            }
            aux++;
        });

        if (aux == 3) {
            rellenarCampos();
        }
    }
    console.log('5')
   


    function mostrarTags() {
       cursoDiv.innerHTML = '';
       console.log('OSTIA PUTA JODER')
        cursos.forEach(curso => {
            const etiqueta = document.createElement('LI');
            etiqueta.classList.add('proyecto');
            etiqueta.textContent = curso;
            etiqueta.ondblclick = eliminarTag;
            cursoDiv.appendChild(etiqueta);
        });
        actualizarInputHidden();
    }
    console.log('6')
    function eliminarTag(e) {
        e.target.remove();
        cursos = cursos.filter(curso => curso !== e.target.textContent);
        actualizarInputHidden();
    }

    function mostrarFormulario(tarea = {}) {
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form id="formulario2" class="formulario nueva-tarea">
                <legend>Agregar nuevo Año</legend>
                <div class="campo">
                    <label for="curso">Seleccionar año</label>
                    <select name="anoCurso" id="curso2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Especialidad</label>
                    <input type="text" name="especialidad" id="descripcion3" value="Obligatorio" />
                </div>
                <div class="campo">
                    <ul class="listado-asignaturas" id="listado-temas"></ul>
                    <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos" />     
                </div>
                <div class="opciones">
                    <input type="submit" class="submit-nueva-tarea" value="Crear Curso" />
                    <button type="button" class="cerrar-modal">Cancelar</button>
                </div>
            </form>
        `;
    
        console.log('7')
 
        modal.addEventListener('click', function(e) {
           e.preventDefault();
           const formulario = document.getElementById('formulario2');
           console.log('JODERRRRRRRRRRRRRRRRRRRR')
           console.log(formulario)
            if (e.target.classList.contains('cerrar-modal')) {
              
                  if (formulario) {
                    formulario.classList.add('cerrar');
                    setTimeout(() => {
                        modal.remove();
                    }, 500);
                } else {
                    console.error('El formulario no se pudo encontrar en el DOM xd.');
                }
            } if(e.target.classList.contains('submit-nueva-tarea')) {
             console.log('pasassssssssssssssssssssssssssssssssssssssssss')

             const selectElement = document.getElementById('curso2');
const valorSeleccionado = selectElement.value;

// Ahora puedes usar valorSeleccionado según tu necesidad
console.log('Valor seleccionado:', valorSeleccionado);
                const curso = document.getElementById('curso2').value.trim();
                
             console.log(curso)
                const descripcion = document.getElementById('descripcion3').value.trim();
            
               
             
               
                if(descripcion === '') {
                    
                    // Mostrar una alerta de error
                    mostrarAlerta('La descripción de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
                    return;
                } 

                
                    agregarTarea(curso,descripcion);
                
                
            }
        });
 
        document.querySelector('.dashboard').appendChild(modal);
           // Asegurar que el formulario esté animado al mostrarse
           setTimeout(() => {
            const formulario = document.getElementById('formulario2');
            if (formulario) {
                formulario.classList.add('animar');
            } else {
                console.error('El formulario no se pudo encontrar en el DOM.');
            }
        }, 0);
       
    }
        
        
    console.log('8')
    


    function agregarTarea(semestre, descripcion) {
        console.log(semestre,descripcion, '1')
        let value = semestre + ' ' + descripcion;
        if (cursos.includes(value)) {
            return;
        }
        cursos = [...cursos, value];
        
        mostrarTags();   
    }

    function actualizarInputHidden() {
        cursosInputHidden.value = cursos.toString();
    }

    function rellenarCampos() {
        console.log('QUE COÑO')
        cursoDiv2.innerHTML = '';
        cursos.forEach(curso => {
            const etiqueta = document.createElement('LI');
            etiqueta.classList.add('curso_lista');
            etiqueta.textContent = curso;
            etiqueta.ondblclick = anadirClases;
            cursoDiv2.appendChild(etiqueta);
        });
    }

    function anadirClases() {
        // Función para añadir clases
    }

})();
