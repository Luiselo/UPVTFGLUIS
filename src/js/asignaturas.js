(function() {
<<<<<<< HEAD


=======
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    let asignaturas = [];
    let filtradas = [];
    let tareas = [];
    let cursos = [];
<<<<<<< HEAD
   
    ObtenerAsignaturas();
=======

    ObtenerAsignaturas();

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    // Botón para mostrar el Modal de Agregar tarea
    const nuevaTareaBtn = document.querySelector('#agregar-tarea');
    const eliminarTareaBtn = document.querySelector('#eliminar-tarea');
    nuevaTareaBtn.addEventListener('click', function() {
        mostrarFormulario3();
    });
    eliminarTareaBtn.addEventListener('click', function() {
        confirmarEliminarSemestre();
    });

    function confirmarEliminarSemestre(tarea) {
        const id = obtenerProyecto();
        Swal.fire({
<<<<<<< HEAD
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
    // Filtros de búsqueda
    const filtros = document.querySelectorAll('#filtros input[type="radio');
    filtros.forEach( radio => {
        radio.addEventListener('input', filtrarTareas);
    } )
=======
            title: translations.confirmar_eliminar_semestre,
            showCancelButton: true,
            confirmButtonText: translations.confirmar,
            cancelButtonText: translations.cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCurso(id);
            } 
        });
    }

    // Filtros de búsqueda
    const filtros = document.querySelectorAll('#filtros input[type="radio"]');
    filtros.forEach(radio => {
        radio.addEventListener('input', filtrarTareas);
    });
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

    function filtrarTareas(e) {
        const filtro = e.target.value;

<<<<<<< HEAD
        if(filtro !== '') {
=======
        if (filtro !== '') {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            filtradas = asignaturas.filter(tarea => tarea.estado === filtro);
        } else {
            filtradas = [];
        }

        mostrarTareas();
    }

    async function ObtenerAsignaturas() {
        try {
<<<<<<< HEAD
            //
               
    
            const id = obtenerProyecto();
            const url = `http://localhost/UpTask_MVC/public/index.php/api/asignatura?id=${id}`;
            const respuesta = await fetch(url);
           
            const resultado = await respuesta.json();
            console.log('miremos',resultado)
            asignaturas = resultado.asignaturas;
           
            mostrarTareas();
        
=======
            const id = obtenerProyecto();
            const url = `http://localhost/UpTask_MVC/public/index.php/api/asignatura?id=${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            asignaturas = resultado.asignaturas;
            mostrarTareas();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        } catch (error) {
            console.log(error);
        }
    }

    function mostrarTareas() {
        limpiarTareas();
<<<<<<< HEAD
      
        const arrayTareas = filtradas.length ? filtradas : asignaturas;

        if(arrayTareas.length === 0) {
            const contenedorTareas = document.getElementById('listado-asignaturas1');

            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = 'No Hay Asignaturas';
            textoNoTareas.classList.add('no-tareas');
            console.log('pasa');
            contenedorTareas.appendChild(textoNoTareas);
            console.log('no pasa');
            return;
        }
        
        const estados = {
            0: 'Pendiente',
            1: 'Completa'
        }
     
        console.log('hola1',arrayTareas);
        arrayTareas.forEach(tarea => {
            const contenedorTarea = document.createElement('LI');
           
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');
            nombresString = '';

            const nombreTarea = document.createElement('P');
            console.log('1');
            if (tarea.info.length === 0){
                nombreTarea.textContent = tarea.asignatura;
            }else{
                tarea.info.forEach(function(elemento) {
                    if (elemento && elemento.nombre) {
                        console.log(elemento.nombre);
                      nombresString += elemento.nombre + ', '; // Agregamos el nombre al string con un espacio en blanco
                    }
                  });

                  nombreTarea.textContent = nombresString;
            }
            console.log('2');
            
            nombreTarea.ondblclick = function() {
                mostrarFormulario(editar = true, {...tarea});
            }
=======

        const arrayTareas = filtradas.length ? filtradas : asignaturas;

        if (arrayTareas.length === 0) {
            const contenedorTareas = document.getElementById('listado-asignaturas1');

            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = translations.no_hay_asignaturas;
            textoNoTareas.classList.add('no-tareas');
            contenedorTareas.appendChild(textoNoTareas);
            return;
        }

        arrayTareas.forEach(tarea => {
            const contenedorTarea = document.createElement('LI');
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');
            let nombresString = '';

            const nombreTarea = document.createElement('P');
            if (tarea.info.length === 0) {
                nombreTarea.textContent = tarea.asignatura;
            } else {
                tarea.info.forEach(function(elemento) {
                    if (elemento && elemento.nombre) {
                        nombresString += elemento.nombre + ', ';
                    }
                });
                nombreTarea.textContent = nombresString;
            }

            nombreTarea.ondblclick = function() {
                mostrarFormulario(true, { ...tarea });
            };
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

            const opcionesDiv = document.createElement('DIV');
            opcionesDiv.classList.add('opciones');

<<<<<<< HEAD
            // Botones
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add(`pendiente`);
            btnEstadoTarea.textContent = 'Modificar relaciones';
            btnEstadoTarea.ondblclick = function() {
                cambiarEstadoTarea({...tarea});

            }
=======
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add('pendiente');
            btnEstadoTarea.textContent = translations.modificar_relaciones;
            btnEstadoTarea.ondblclick = function() {
                cambiarEstadoTarea({ ...tarea });
            };
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

            const btnEliminarTarea = document.createElement('BUTTON');
            btnEliminarTarea.classList.add('eliminar-tarea');
            btnEliminarTarea.dataset.idTarea = tarea.id;
<<<<<<< HEAD
            btnEliminarTarea.textContent = 'Eliminar';
            btnEliminarTarea.ondblclick = function() {
                confirmarEliminarTarea({...tarea});
            }
          
            opcionesDiv.appendChild(btnEstadoTarea);
        
            opcionesDiv.appendChild(btnEliminarTarea);
         
            contenedorTarea.appendChild(nombreTarea);
            
            contenedorTarea.appendChild(opcionesDiv);
            let listadoTareas; 

            console.log('hola',tarea);
            if(tarea.semestre == 1)
             listadoTareas = document.getElementById('listado-asignaturas1');
        else 
             listadoTareas = document.getElementById('listado-asignaturas2');
=======
            btnEliminarTarea.textContent = translations.eliminar;
            btnEliminarTarea.ondblclick = function() {
                confirmarEliminarTarea({ ...tarea });
            };

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);
            contenedorTarea.appendChild(nombreTarea);
            contenedorTarea.appendChild(opcionesDiv);

            let listadoTareas;
            if (tarea.semestre == 1) {
                listadoTareas = document.getElementById('listado-asignaturas1');
            } else {
                listadoTareas = document.getElementById('listado-asignaturas2');
            }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            listadoTareas.appendChild(contenedorTarea);
        });
    }

<<<<<<< HEAD
    function totalPendientes() {
        const totalPendientes = tareas.filter(tarea => tarea.estado === "0");
        const pendientesRadio = document.querySelector('#pendientes');

        if(totalPendientes.length === 0) {
            pendientesRadio.disabled = true;
        } else {
            pendientesRadio.disabled = false;
        }   
    }
    function totalCompletas() {
        const totalCompletas = asignaturas.filter(tarea => tarea.estado === "1");
        const completasRadio = document.querySelector('#completadas');

        if(totalCompletas.length === 0) {
            completasRadio.disabled = true;
        } else {
            completasRadio.disabled = false;
        }   
    }

    function mostrarFormulario2( editar = false, tarea = {} ) {
       
=======
    function mostrarFormulario2(editar = false, tarea = {}) {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
<<<<<<< HEAD
                <legend>${editar ? 'Editar Asignatura' : 'Añade una nueva asignatura'}</legend>
                <div class="campo">
                    <label>Asignatura</label>
                    <input 
                        type="text"
                        name="tarea"
                        placeholder="${tarea.asignatura ? 'Edita la Tarea' : 'Nombre de la asignatura'}"
=======
                <legend>${editar ? translations.editar_asignatura : translations.nueva_asignatura}</legend>
                <div class="campo">
                    <label>${translations.asignatura}</label>
                    <input 
                        type="text"
                        name="tarea"
                        placeholder="${tarea.asignatura ? translations.editar_asignatura : translations.asignatura}"
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                        id="tarea"
                        value="${tarea.asignatura ? tarea.asignatura : ''}"
                    />
                </div>
                <div class="campo">
<<<<<<< HEAD
                <label>Siglas</label>
                <input 
                    type="text"
                    name="tarea"
                    placeholder="${tarea.asignatura ? 'Edita la Tarea' : 'Nombre de la asignatura'}"
                    id="tarea"
                    value="${tarea.asignatura ? tarea.asignatura : ''}"
                />
            </div>
                <div class="campo">
                    <label>Semestre</label>
                    <select  name ="semestre" 
                    value= "${tarea.semestre }"
                     id = "semestre">
                                <option value = "1" >Primer cuatrimestre</option>
                                <option value = "2">Segundo cuatrimestre</option>
                    </select>
                </div>
                <div class="campo">
                    <label>Descripción</label>
                    <input 
                        type="text"
                        name="descripcion"
                        placeholder="${tarea.descripcion ? 'Edita la Tarea' : 'Descripción del proyecto'}"
                        id="descripcion"
                        value="${tarea.descripcion ? tarea.descripcion : ''}"
                />
                </div>

                <div class="campo">
                <label>Contenido</label>
                <input 
                    type="text"
                    name="contenido"
                    placeholder="${tarea.campo ? 'Edita la Tarea' : 'Primes simestre'}"
                    id="contenido"
                    value="${tarea.campo ? tarea.nombre : ''}"
                />
                </div>

                <div class="campo">
                    
                        <ul class="listado-asignaturas" id="listado-temas">
                      </ul>
                        <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos"  />
                 
                </div>

=======
                    <label>${translations.siglas}</label>
                    <input 
                        type="text"
                        name="tarea"
                        placeholder="${tarea.siglas ? translations.editar_asignatura : translations.siglas}"
                        id="siglas"
                        value="${tarea.siglas ? tarea.siglas : ''}"
                    />
                </div>
                <div class="campo">
                    <label>${translations.semestre}</label>
                    <select name="semestre" id="semestre">
                        <option value="1">${translations.primer_cuatrimestre}</option>
                        <option value="2">${translations.segundo_cuatrimestre}</option>
                    </select>
                </div>
                <div class="campo">
                    <label>${translations.descripcion}</label>
                    <input 
                        type="text"
                        name="descripcion"
                        placeholder="${tarea.descripcion ? translations.editar_asignatura : translations.descripcion}"
                        id="descripcion"
                        value="${tarea.descripcion ? tarea.descripcion : ''}"
                    />
                </div>
                <div class="campo">
                    <label>${translations.contenido}</label>
                    <input 
                        type="text"
                        name="contenido"
                        placeholder="${tarea.contenido ? translations.editar_asignatura : translations.contenido}"
                        id="contenido"
                        value="${tarea.contenido ? tarea.contenido : ''}"
                    />
                </div>
                <div class="campo">
                    <ul class="listado-asignaturas" id="listado-temas"></ul>
                    <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos" />
                </div>
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                <div class="opciones">
                    <input 
                        type="submit" 
                        class="submit-nueva-tarea" 
<<<<<<< HEAD
                        value="${tarea.nombre ? 'Guardar Cambios' : 'Añadir Asignatura'} " 
                    />
                    <button type="button" class="cerrar-modal">Cancelar</button>
=======
                        value="${editar ? translations.guardar_cambios : translations.nueva_asignatura}"
                    />
                    <button type="button" class="cerrar-modal">${translations.cancelar}</button>
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                </div>
            </form>
        `;

<<<<<<< HEAD
        if(editar){
=======
        if (editar) {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            obtenerTemarios(tarea.id);
        }
        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);

        modal.addEventListener('click', function(e) {
            e.preventDefault();
<<<<<<< HEAD
            if(e.target.classList.contains('cerrar-modal')) {
=======
            if (e.target.classList.contains('cerrar-modal')) {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
<<<<<<< HEAD
            } 
            if(e.target.classList.contains('submit-nueva-tarea')) {
                const nombreTarea = document.querySelector('#tarea').value.trim();
          
                const semestreTarea = document.getElementById('semestre').value.trim();
             
                const descripcion = document.getElementById('descripcion').value.trim();
            
               
                if(nombreTarea === '') {
                    // Mostrar una alerta de error
                    mostrarAlerta('El Nombre de la asignatura es Obligatorio', 'error', document.querySelector('.formulario legend'));
                    return;
                } 
               
                if(descripcion === '') {
                    // Mostrar una alerta de error
                    mostrarAlerta('La descripción de la tarea es Obligatorio', 'error', document.querySelector('.formulario legend'));
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
=======
            }
            if (e.target.classList.contains('submit-nueva-tarea')) {
                const nombreTarea = document.querySelector('#tarea').value.trim();
                const siglas = document.querySelector('#siglas').value.trim();
                const semestreTarea = document.getElementById('semestre').value.trim();
                const descripcion = document.getElementById('descripcion').value.trim();
                const url = document.getElementById('url').value.trim();

                if (nombreTarea === '') {
                    mostrarAlerta(translations.nombre_asignatura_obligatorio, 'error', document.querySelector('.formulario legend'));
                    return;
                }
                if (descripcion === '') {
                    mostrarAlerta(translations.descripcion_obligatoria, 'error', document.querySelector('.formulario legend'));
                    return;
                }
                if (url === '') {
                    mostrarAlerta(translations.url_vacia, 'error', document.querySelector('.formulario legend'));
                    return;
                }

                if (editar) {
                    tarea.asignatura = nombreTarea;
                    tarea.siglas = siglas;
                    tarea.semestre = semestreTarea;
                    tarea.descripcion = descripcion;
                    tarea.url = url;
                    actualizarTarea(tarea);
                } else {
                    agregarTarea(nombreTarea, siglas, semestreTarea, descripcion);
                }
            }
        });
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        document.querySelector('.dashboard').appendChild(modal);
        const cursosInputHidden = document.getElementById("contenido");
        cursosInputHidden.addEventListener('keypress', guardarTag);
    }

<<<<<<< HEAD
    const cursosInputHidden = document.getElementById("contenido");
    cursosInputHidden.addEventListener('keypress', guardarTag);
    function mostrarFormulario3( editar = false, tarea = {} ) {
        const id = obtenerProyecto();
        const url = `/UpTask_MVC/public/index.php/panel/crear-asignatura?id=${id}`;
        console.log(url);
        window.location.href = url;

    }

    function mostrarFormulario( editar = true, tarea) {
       
       console.log(tarea);
        const id = obtenerProyecto();
        const idAsignatura = tarea.id;
        const url = `/UpTask_MVC/public/index.php/panel/editar-asignatura?id=${id}&idAsignatura=${idAsignatura}`;
        console.log(url);
        window.location.href = url;

    }

    
    function guardarTag(e) {  

        if(e.keyCode === 44) {
            const cursosInputHidden = document.getElementById("contenido");        
            value = cursosInputHidden.value
          
            e.preventDefault();
            if(e.target.value.trim() === '' || e.target.value < 1) { 
                return
            }
           
            
            if (cursos.find(curso => curso == value)){
                return; 
            }
            cursos = [...cursos, value];

            mostrarTags();    
            cursosInputHidden.value="";
        }
        }

        function mostrarTags() {
            const cursoDiv = document.getElementById("listado-temas"); 
            const contenido = document.getElementById("contenido"); 
            console.log( cursos);
            cursoDiv.innerHTML ='';
            contenido.innerHTML = '' ;
            var i = 0;
            cursos.forEach(curso => {
                const etiqueta = document.createElement('LI');
                etiqueta.classList.add('curso_lista')
                etiqueta.textContent = curso;
                etiqueta.ondblclick = eliminarTag;
                cursoDiv.appendChild(etiqueta);
            })

           actualizarInputHidden(); 
        }

        function actualizarInputHidden() {
            const cursosInputHidden = document.getElementById("formulario__listado");        
            cursosInputHidden.value = cursos.toString();
     
        
        }

        function eliminarTag(e) {

            e.target.remove()
            cursos = cursos.filter(curso => curso !== e.target.textContent)
            actualizarInputHidden();

        }

    async   function obtenerTemarios(id){
        try {
          
=======
    function mostrarFormulario3(editar = false, tarea = {}) {
        const id = obtenerProyecto();
        const url = `/UpTask_MVC/public/index.php/panel/crear-asignatura?id=${id}`;
        window.location.href = url;
    }

    function mostrarFormulario(editar = true, tarea) {
        const id = obtenerProyecto();
        const idAsignatura = tarea.id;
        const url = `/UpTask_MVC/public/index.php/panel/editar-asignatura?id=${id}&idAsignatura=${idAsignatura}`;
        window.location.href = url;
    }

    function guardarTag(e) {
        if (e.keyCode === 44) {
            const cursosInputHidden = document.getElementById("contenido");
            value = cursosInputHidden.value;

            e.preventDefault();
            if (e.target.value.trim() === '' || e.target.value < 1) {
                return;
            }

            if (cursos.find(curso => curso == value)) {
                return;
            }
            cursos = [...cursos, value];

            mostrarTags();
            cursosInputHidden.value = "";
        }
    }

    function mostrarTags() {
        const cursoDiv = document.getElementById("listado-temas");
        const contenido = document.getElementById("contenido");
        cursoDiv.innerHTML = '';
        contenido.innerHTML = '';
        cursos.forEach(curso => {
            const etiqueta = document.createElement('LI');
            etiqueta.classList.add('curso_lista');
            etiqueta.textContent = curso;
            etiqueta.ondblclick = eliminarTag;
            cursoDiv.appendChild(etiqueta);
        });

        actualizarInputHidden();
    }

    function actualizarInputHidden() {
        const cursosInputHidden = document.getElementById("formulario__listado");
        cursosInputHidden.value = cursos.toString();
    }

    function eliminarTag(e) {
        e.target.remove();
        cursos = cursos.filter(curso => curso !== e.target.textContent);
        actualizarInputHidden();
    }

    async function obtenerTemarios(id) {
        try {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            const url = `http://localhost/UpTask_MVC/public/index.php/api/temarios?id=${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const aux = resultado.temarios;

<<<<<<< HEAD
            aux.forEach( temario => {
                cursos = [...cursos, temario.descripcion];
            } )
            mostrarTags();        
        } catch (error) {
            console.log(error);
        }
       
    }


    // Muestra un mensaje en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {
        // Previene la creación de multiples alertas
        const alertaPrevia = document.querySelector('.alerta');
        if(alertaPrevia) {
            alertaPrevia.remove();
        }


=======
            aux.forEach(temario => {
                cursos = [...cursos, temario.descripcion];
            });
            mostrarTags();
        } catch (error) {
            console.log(error);
        }
    }

    function mostrarAlerta(mensaje, tipo, referencia) {
        const alertaPrevia = document.querySelector('.alerta');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;

<<<<<<< HEAD
        // Inserta la alerta antes del legend
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

        // Eliminar la alerta después de 5 segundos
=======
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }

<<<<<<< HEAD
    // Consultar el Servidor para añadir una nueva tarea al proyecto actual
    async function agregarTarea( nombre,semestre,descripcion) {
        // Construir la petición
        console.log(nombre);
        const datos = new FormData();
        datos.append('asignatura', nombre);
        datos.append('semestre', semestre);
        datos.append('descripcion', descripcion);
        datos.append('cursos', cursos);
        datos.append('cursoID', obtenerProyecto());
        try {

            const url = 'http://localhost/UpTask_MVC/public/index.php/api/asignatura';
          
=======
    async function agregarTarea(nombre, siglas, semestre, descripcion) {
        const datos = new FormData();
        datos.append('asignatura', nombre);
        datos.append('siglas', siglas);
        datos.append('semestre', semestre);
        datos.append('url', url);
        datos.append('descripcion', descripcion);
        datos.append('cursos', cursos);
        datos.append('cursoID', obtenerProyecto());

        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/asignatura';
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD
         
            const resultado = await respuesta.json();
            mostrarAlerta(
                resultado.mensaje, 
                resultado.tipo, 
                document.querySelector('.formulario legend')
            );

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
=======
            const resultado = await respuesta.json();
            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));

            if (resultado.tipo === 'exito') {
                Swal.fire(resultado.mensaje, resultado.mensaje, 'success');

                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.remove();
                }

                tareas = tareas.map(tareaMemoria => {
                    if (tareaMemoria.id === id) {
                        tareaMemoria.estado = estado;
                        tareaMemoria.nombre = nombre;
                    }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

                    return tareaMemoria;
                });

                mostrarTareas();
            }
<<<<<<< HEAD
        }catch (error) {
            console.log(error);
        }     
    }


    
    function cambiarEstadoTarea(tarea) {

        window.location.replace(
            `http://localhost/UpTask_MVC/public/index.php/api/relaciones?id=${tarea.id}`
          );
     
    }

    async function actualizarTarea(tarea) {

        const {id, asignatura, descripcion, cursoID,semestre} = tarea;
      
        const datos = new FormData();
        datos.append('asignatura', asignatura);
=======
        } catch (error) {
            console.log(error);
        }
    }

    function cambiarEstadoTarea(tarea) {
        window.location.replace(`http://localhost/UpTask_MVC/public/index.php/api/relaciones?id=${tarea.id}`);
    }

    async function actualizarTarea(tarea) {
        const { id, asignatura, siglas, descripcion, cursoID, semestre } = tarea;

        const datos = new FormData();
        datos.append('asignatura', asignatura);
        datos.append('siglas', siglas);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        datos.append('semestre', descripcion);
        datos.append('descripcion', semestre);
        datos.append('cursos', cursos);
        datos.append('cursoID', obtenerProyecto());
        datos.append('id', id);
<<<<<<< HEAD
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/asignatura/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD
            
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
=======
            const resultado = await respuesta.json();

            if (resultado.tipo === 'exito') {
                Swal.fire(resultado.mensaje, resultado.mensaje, 'success');

                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.remove();
                }

                tareas = tareas.map(tareaMemoria => {
                    if (tareaMemoria.id === id) {
                        tareaMemoria.estado = estado;
                        tareaMemoria.nombre = nombre;
                    }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

                    return tareaMemoria;
                });

                mostrarTareas();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function confirmarEliminarTarea(tarea) {
        Swal.fire({
<<<<<<< HEAD
            title: '¿Eliminar asignatura?',
            showCancelButton: true,
            confirmButtonText:'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('jiji')
                eliminarTarea(tarea);
            } 
        })
    }
    async function eliminarCurso(tarea) {

      
        
        const datos = new FormData();
        datos.append('id', tarea);
   

=======
            title: translations.confirmar_eliminar_asignatura,
            showCancelButton: true,
            confirmButtonText: translations.confirmar,
            cancelButtonText: translations.cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTarea(tarea);
            }
        });
    }

    async function eliminarCurso(tarea) {
        const datos = new FormData();
        datos.append('id', tarea);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/eliminarCurso';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD

            const resultado = await respuesta.json();
            if(resultado.tipo = "Exito") {
                 

                Swal.fire('Eliminado!', resultado.mensaje, 'success');

                //tareas = tareas.filter( tareaMemoria => tareaMemoria.id !== tarea.id);
                ObtenerAsignaturas();
            }
            
        } catch (error) {
            
        }
    }
    async function eliminarTarea(tarea) {

      
        
        const datos = new FormData();
        datos.append('id', tarea.id);
   

=======
            const resultado = await respuesta.json();

            if (resultado.tipo === "Exito") {
                Swal.fire('Eliminado!', resultado.mensaje, 'success').then(() => {
                    const url = `/UpTask_MVC/public/index.php/panel`;
                    window.location.href = url;
                });

                ObtenerAsignaturas();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function eliminarTarea(tarea) {
        const datos = new FormData();
        datos.append('id', tarea.id);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/eliminarasignatura';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD

            const resultado = await respuesta.json();
            if(resultado.tipo = "Exito") {
                Swal.fire('Eliminado!', resultado.mensaje, 'success');

                //tareas = tareas.filter( tareaMemoria => tareaMemoria.id !== tarea.id);
                ObtenerAsignaturas();
            }
            
        } catch (error) {
            
=======
            const resultado = await respuesta.json();

            if (resultado.tipo === "Exito") {
                Swal.fire('Eliminado!', resultado.mensaje, 'success');
                ObtenerAsignaturas();
            }
        } catch (error) {
            console.log(error);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        }
    }

    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
<<<<<<< HEAD
        return proyecto.id;
    }

    function limpiarTareas() {
        const listadoTareas = document.getElementById('listado-asignaturas1');
        
        while(listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }

        const listadoTareas2 = document.getElementById('listado-asignaturas2');
        
        while(listadoTareas2.firstChild) {
            listadoTareas2.removeChild(listadoTareas2.firstChild);
        }
    }

=======
        return proyecto.id || idCurso;
    }

    function limpiarTareas() {
        const listadoTareas1 = document.getElementById('listado-asignaturas1');
        while (listadoTareas1.firstChild) {
            listadoTareas1.removeChild(listadoTareas1.firstChild);
        }

        const listadoTareas2 = document.getElementById('listado-asignaturas2');
        while (listadoTareas2.firstChild) {
            listadoTareas2.removeChild(listadoTareas2.firstChild);
        }
    }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
})();
