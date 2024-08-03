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
    // Botón para mostrar el Modal de Agregar tarea
=======

    ObtenerAsignaturas();
    
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    const nuevaTareaBtn = document.getElementById('agregar-tarea');
    nuevaTareaBtn.addEventListener('click', function() {
        mostrarFormulario();
    });
<<<<<<< HEAD
    console.log('pasa')
    const nuevoTagsBtn = document.getElementById('editar-Tag');
    nuevoTagsBtn.addEventListener('click', function() {

         // Aquí puedes usar la variable 'tags' que proviene de PHP
    console.log('Tags:', tags);
        mostrarFormularioTag(false,tags);
    });
    console.log('pasa2')
    // Filtros de búsqueda
    const filtros = document.querySelectorAll('#filtros input[type="radio');
    filtros.forEach( radio => {
        radio.addEventListener('input', filtrarTareas);
    } )

    function filtrarTareas(e) {
        const filtro = e.target.value;

        if(filtro !== '') {
            filtradas = asignaturas.filter(tarea => tarea.estado === filtro);
        } else {
            filtradas = [];
        }

=======
    
    const nuevoTagsBtn = document.getElementById('editar-Tag');
    nuevoTagsBtn.addEventListener('click', function() {
        mostrarFormularioTag(false, tags);
    });

    const filtros = document.querySelectorAll('#filtros input[type="radio"]');
    filtros.forEach(radio => {
        radio.addEventListener('input', filtrarTareas);
    });

    function filtrarTareas(e) {
        const filtro = e.target.value;
        filtradas = filtro !== '' ? asignaturas.filter(tarea => tarea.estado === filtro) : [];
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
            console.log(resultado)
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
            const contenedorTareas = document.querySelector('#listado-asignaturas');

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
     
        console.log(arrayTareas);
=======
        const arrayTareas = filtradas.length ? filtradas : asignaturas;

        const cursoForm = document.querySelector('.cursoform');

        if (arrayTareas.length === 0) {
            const contenedorTareas = document.querySelector('#listado-asignaturas');
            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = cursoForm.getAttribute('data-no-hay-asignaturas');
            textoNoTareas.classList.add('no-tareas');
            contenedorTareas.appendChild(textoNoTareas);
            return;
        }

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        arrayTareas.forEach(tarea => {
            const contenedorTarea = document.createElement('LI');
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');

            const nombreTarea = document.createElement('P');
            nombreTarea.textContent = tarea.asignatura;
            nombreTarea.ondblclick = function() {
<<<<<<< HEAD
                mostrarFormulario(editar = true, {...tarea});
            }
=======
                mostrarFormulario(true, {...tarea});
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
            btnEstadoTarea.classList.add('estado-tarea', 'pendiente');
            btnEstadoTarea.textContent = cursoForm.getAttribute('data-modificar-relaciones');
            btnEstadoTarea.ondblclick = function() {
                cambiarEstadoTarea({...tarea});
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
            
=======
            btnEliminarTarea.textContent = cursoForm.getAttribute('data-eliminar');
            btnEliminarTarea.ondblclick = function() {
                confirmarEliminarTarea({...tarea});
            };

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);
            contenedorTarea.appendChild(nombreTarea);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            contenedorTarea.appendChild(opcionesDiv);

            const listadoTareas = document.querySelector('#listado-asignaturas');
            listadoTareas.appendChild(contenedorTarea);
        });
    }

    function totalPendientes() {
        const totalPendientes = tareas.filter(tarea => tarea.estado === "0");
<<<<<<< HEAD
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

    function mostrarFormulario( editar = false, tarea = {} ) {
       
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
            <legend>Agregar nuevo Año</legend>
              
                <div class="campo">
                <label for="curso">Seleccionar año</label>
                <select  name ="anoCurso" id = "curso">
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
                <input
                type="text"
                name="especialidad"
                id="descripcion"
                value="Obligatorio"
        />
                </div>
                <div class="campo">
                <ul class="listado-asignaturas" id="listado-temas">
                </ul>
                <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos"  />     
            </div>
            <div class="opciones">
            <input 
                type="submit" 
                class="submit-nueva-tarea" 
                value="Crear Curso" 
            />
            <button type="button" class="cerrar-modal">Cancelar</button>
        </div>
            </form>
        `;

        if(editar){
            obtenerTemarios(tarea.id);
        }
        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);

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
             
                const curso = document.getElementById('curso').value.trim();
             
                const descripcion = document.getElementById('descripcion').value.trim();
            
               
             
               
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
                    agregarTarea(curso,descripcion);
                }
                
            }
        })

        document.querySelector('.dashboard').appendChild(modal);
        const cursosInputHidden = document.getElementById("contenido");
        cursosInputHidden.addEventListener('keypress', guardarTag);
    }
  
    function mostrarFormularioTag(editar = false, tareas) {
=======
        document.querySelector('#pendientes').disabled = totalPendientes.length === 0;
    }

    function totalCompletas() {
        const totalCompletas = asignaturas.filter(tarea => tarea.estado === "1");
        document.querySelector('#completadas').disabled = totalCompletas.length === 0;
    }

    function mostrarFormulario(editar = false, tarea = {}) {
        const cursoForm = document.querySelector('.cursoform');
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
<<<<<<< HEAD
               
                <legend> Agregar tag </legend>
                
                <div class="campo">
                    <label>Agregar tags</label>
                    <input type="text" id="nuevo-tag" placeholder="Escribe un tag y presiona Enter">
                     </div>
                    <ul class="listado-tags" id="listado-tags">
                   
                    </ul>
                    <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos">
               
                
                <div class="opciones">
                    <input 
                        type="submit" 
                        class="submit-nueva-tarea" 
                        value="Añadir Tags" 
                    />
                    <button type="button" class="cerrar-modal">Cancelar</button>
                </div>
            </form>
        `;
    
        if (editar) {
            obtenerTemarios(tarea);
        }
    
        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);
    
        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.classList.contains('cerrar-modal')) {
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            }
            if (e.target.classList.contains('submit-nueva-tarea')) {
               
    
             
    console.log('oleeeeeeeeee')
               
                    agregarTag(tags);
                
            }
        });
    
        document.querySelector('.dashboard').appendChild(modal);
    
        // Script para manejar la lógica de agregar y eliminar tags
        const inputTag = document.getElementById('nuevo-tag');
        const listadoTags = document.getElementById('listado-tags');
        const formularioListado = document.getElementById('formulario__listado');
        console.log(tareas)
        let tags = tareas.map(tarea => tarea.descripcion);
     
        actualizarListadoTags();
    
=======
            <legend>${cursoForm.getAttribute('data-agregar-nuevo-ano')}</legend>
            <div class="campo">
                <label for="curso">${cursoForm.getAttribute('data-seleccionar-ano')}</label>
                <select name="anoCurso" id="curso">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div class="campo">
                <label>${cursoForm.getAttribute('data-especialidad')}</label>
                <input type="text" name="especialidad" id="descripcion" value="Obligatorio"/>
            </div>
            <div class="campo">
                <ul class="listado-asignaturas" id="listado-temas"></ul>
                <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos"/>     
            </div>
            <div class="opciones">
                <input type="submit" class="submit-nueva-tarea" value="${cursoForm.getAttribute('data-crear-curso')}"/>
                <button type="button" class="cerrar-modal">${cursoForm.getAttribute('data-cancelar')}</button>
            </div>
            </form>
        `;

        if (editar) {
            obtenerTemarios(tarea.id);
        }

        setTimeout(() => {
            document.querySelector('.formulario').classList.add('animar');
        }, 0);

        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.classList.contains('cerrar-modal')) {
                document.querySelector('.formulario').classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            } 
            if (e.target.classList.contains('submit-nueva-tarea')) {
                const curso = document.getElementById('curso').value.trim();
                const descripcion = document.getElementById('descripcion').value.trim();
                
                if (descripcion === '') {
                    mostrarAlerta(cursoForm.getAttribute('data-descripcion-obligatoria'), 'error', document.querySelector('.formulario legend'));
                    return;
                }

                if (editar) {
                    tarea.asignatura = nombreTarea;
                    tarea.semestre = semestreTarea;
                    tarea.descripcion = descripcion;
                    actualizarTarea(tarea);
                } else {
                    agregarAno(curso, descripcion);
                }
            }
        });

        document.querySelector('.dashboard').appendChild(modal);
    }

    function mostrarFormularioTag(editar = false, tareas) {
        const cursoForm = document.querySelector('.cursoform');
        
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>${cursoForm.getAttribute('data-agregar-tag')}</legend>
                <div class="campo">
                    <label>${cursoForm.getAttribute('data-agregar-tag')}</label>
                    <input type="text" id="nuevo-tag" placeholder="${cursoForm.getAttribute('data-escribe-tag')}">
                </div>
                <ul class="listado-tags" id="listado-tags"></ul>
                <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos">
                <div class="opciones">
                    <input type="submit" class="submit-nueva-tarea" value="${cursoForm.getAttribute('data-añadir-tags')}"/>
                    <button type="button" class="cerrar-modal">${cursoForm.getAttribute('data-cancelar')}</button>
                </div>
            </form>
        `;

        if (editar) {
            obtenerTemarios(tarea);
        }

        setTimeout(() => {
            document.querySelector('.formulario').classList.add('animar');
        }, 0);

        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.classList.contains('cerrar-modal')) {
                document.querySelector('.formulario').classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            } 
            if (e.target.classList.contains('submit-nueva-tarea')) {
                agregarTag(tags);
            }
        });

        document.querySelector('.dashboard').appendChild(modal);

        const inputTag = document.getElementById('nuevo-tag');
        const listadoTags = document.getElementById('listado-tags');
        const formularioListado = document.getElementById('formulario__listado');
        let tags = tareas.map(tarea => tarea.descripcion);
        
        actualizarListadoTags();

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        inputTag.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = inputTag.value.trim();
                if (tag && !tags.includes(tag)) {
                    tags.push(tag);
                    actualizarListadoTags();
                    inputTag.value = '';
                } else {
<<<<<<< HEAD
                    mostrarAlerta('El tag ya existe o está vacío', 'error', inputTag);
                }
            }
        });
    
        listadoTags.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const tag = e.target.parentElement.textContent.slice(0, -1).trim();
                console.log(tag)
                tags = tags.filter(t => t != tag);
                console.log(tags)
                actualizarListadoTags();
            }
        });
    
=======
                    mostrarAlerta(cursoForm.getAttribute('data-escribe-tag'), 'error', inputTag);
                }
            }
        });

        listadoTags.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const tag = e.target.parentElement.textContent.slice(0, -1).trim();
                tags = tags.filter(t => t != tag);
                actualizarListadoTags();
            }
        });

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        function actualizarListadoTags() {
            listadoTags.innerHTML = '';
            tags.forEach(tag => {
                const li = document.createElement('li');
                li.textContent = tag;
                const button = document.createElement('button');
                button.textContent = 'X';
                button.type = 'button';
                li.appendChild(button);
                listadoTags.appendChild(li);
            });
            formularioListado.value = tags.join(',');
        }
<<<<<<< HEAD
    
        function mostrarAlerta(mensaje, tipo, referencia) {
            console.log('entra')
            const alerta = document.createElement('div');
            alerta.classList.add('alerta', tipo);
            alerta.textContent = mensaje;
            
            // Insertar la alerta antes de la referencia
            referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);
            
            // Eliminar la alerta después de 3 segundos
=======

        function mostrarAlerta(mensaje, tipo, referencia) {
            const alerta = document.createElement('div');
            alerta.classList.add('alerta', tipo);
            alerta.textContent = mensaje;
            referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
    }
<<<<<<< HEAD
    
    
    
    
   

     

    async   function obtenerTemarios(id){
        try {
          
=======

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


        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;

        // Inserta la alerta antes del legend
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

        // Eliminar la alerta después de 5 segundos
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
        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
<<<<<<< HEAD
    async function agregarTag(tags) {
        // Construir la petición
        const datos = new FormData();
        datos.append('tags', tags);
        
        datos.append('idCurso', obtenerProyecto());

        
        try {

            const url = 'http://localhost/UpTask_MVC/public/index.php/api/anadirTags';
            console.log('heyyy')
=======

    async function agregarTag(tags) {
        const datos = new FormData();
        datos.append('tags', tags);
        datos.append('idCurso', obtenerProyecto());
        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/anadirTags';
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD
            console.log('heyyy');
            const resultado = await respuesta.json();
            console.log('heyyy');
            console.log('prueba')
           
            const prueba = document.querySelector('.formulario legend');
    console.log(prueba);
            mostrarAlerta(
                resultado.mensaje, 
                resultado.tipo, 
                document.querySelector('.formulario legend')
                
            );
            console.log('heyyy')
            console.log(resultado)
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
               
                


                
            }
        }catch (error) {
            console.log(error);
        }     
    }
    // Consultar el Servidor para añadir una nueva tarea al proyecto actual
    async function agregarTarea(semestre,descripcion) {
        // Construir la petición
=======
            const resultado = await respuesta.json();
            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));
            if (resultado.tipo === 'exito') {
                Swal.fire({
                    title: resultado.mensaje,
                    text: resultado.mensaje,
                    icon: 'success'
                }).then(() => {
                    location.reload();
                });
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.remove();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function agregarAno(semestre, descripcion) {
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        const datos = new FormData();
        datos.append('numero', semestre);
        datos.append('semestre', semestre);
        datos.append('descripcion', descripcion);
<<<<<<< HEAD
       
        datos.append('idCurso', obtenerProyecto());

        console.log(semestre,descripcion);
        try {

            const url = 'http://localhost/UpTask_MVC/public/index.php/api/anocurso';
          
=======
        datos.append('idCurso', obtenerProyecto());

        try {
            const url = 'http://localhost/UpTask_MVC/public/index.php/api/anocurso';
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
               
                


                
            }
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
      
=======
            const resultado = await respuesta.json();
            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.formulario legend'));
            if (resultado.tipo === 'exito') {
                Swal.fire(resultado.mensaje, resultado.mensaje, 'success').then(() => {
                    location.reload();
                });
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.remove();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function cambiarEstadoTarea(tarea) {
        window.location.replace(`http://localhost/UpTask_MVC/public/index.php/api/relaciones?id=${tarea.id}`);
    }

    async function actualizarTarea(tarea) {
        const { id, asignatura, descripcion, cursoID, semestre } = tarea;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        const datos = new FormData();
        datos.append('asignatura', asignatura);
        datos.append('semestre', descripcion);
        datos.append('descripcion', semestre);
        datos.append('cursos', cursos);
        datos.append('cursoID', obtenerProyecto());
        datos.append('id', id);
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

                    return tareaMemoria;
                });

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
                    return tareaMemoria;
                });
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                mostrarTareas();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function confirmarEliminarTarea(tarea) {
        Swal.fire({
<<<<<<< HEAD
            title: '¿Eliminar Tarea?',
            showCancelButton: true,
            confirmButtonText:'Si',
=======
            title: cursoForm.getAttribute('data-eliminar-tarea'),
            showCancelButton: true,
            confirmButtonText: 'Si',
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTarea(tarea);
<<<<<<< HEAD
            } 
        })
    }

    async function eliminarTarea(tarea) {

        const {estado, id, nombre} = tarea;
        
=======
            }
        });
    }

    async function eliminarTarea(tarea) {
        const { estado, id, nombre } = tarea;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());
<<<<<<< HEAD

=======
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        try {
            const url = 'http://localhost:3000/api/tarea/eliminar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
<<<<<<< HEAD

            const resultado = await respuesta.json();
            if(resultado.tipo = "exito") {
                
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
                   
                    
    
    
                    
                }
                Swal.fire('Eliminado!', resultado.mensaje, 'success');

                tareas = tareas.filter( tareaMemoria => tareaMemoria.id !== tarea.id);
                mostrarTareas();
            }
            
        } catch (error) {
            
=======
            const resultado = await respuesta.json();
            if (resultado.tipo = "exito") {
                Swal.fire('Eliminado!', resultado.mensaje, 'success');
                tareas = tareas.filter(tareaMemoria => tareaMemoria.id !== tarea.id);
                mostrarTareas();
            }
        } catch (error) {
            console.log(error);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        }
    }

    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
        return proyecto.id;
    }

    function limpiarTareas() {
        const listadoTareas = document.querySelector('#listado-asignaturas');
<<<<<<< HEAD
        
        while(listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }

=======
        while (listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
})();
