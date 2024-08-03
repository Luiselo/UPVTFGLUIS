let asignaturas = [];
let cursos = [];
<<<<<<< HEAD
console.log()
const cursoDiv = document.getElementById("listado-asignaturas");
const cursosInputHidden = document.getElementById("formulario__Idioma");

const nuevoTagsBtn = document.getElementById('editar-Tag');
nuevoTagsBtn.addEventListener('click', function() {

    
    mostrarTags2(tags)
=======
let tagsFiltro = filteredTags;
console.log('1')

function generateSigla(idTitle, idSigla) {
  const titleInput = document.getElementById(idTitle);
  const siglaInput = document.getElementById(idSigla);
  
  titleInput.addEventListener('input', function() {
      const words = titleInput.value.trim().split(/\s+/);
      const sigla = words.map(word => word.charAt(0).toUpperCase()).join('');
      siglaInput.value = sigla;
  });
}
console.log('2')
window.onload = function() {
  generateSigla('nombreES', 'siglaES');
  generateSigla('nombreEU', 'siglaEU');
  generateSigla('nombreEN', 'siglaEN');
}
console.log('1')
const cursoDiv = document.getElementById("listado-asignaturas");
const listado = document.getElementById("listado-temas");
const cursosInputHidden = document.getElementById("formulario__Idioma");
const tagInputHidden = document.getElementById("formulario__tag");

const nuevoTagsBtn = document.getElementById('editar-Tag');
nuevoTagsBtn.addEventListener('click', function() {
  console.log('3')
 
    
    mostrarTags2(tags,filteredTags)
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    //mostrarFormularioTag(false,tags);
});


<<<<<<< HEAD
function mostrarTags2(tags) {
       

    const modal = document.createElement('div');
    modal.classList.add('modalTags');
    modal.innerHTML = `
    <form class="formulario nueva-tarea">
        <legend>Lista de Tags</legend>
       
        <div class="modal-content">
            
             <div id="listaTagsModal" class="listaTagsModal">
            <label>
                  </label>
                </div>
           
        </div>
    
        
    <div class="opciones">
    <button type="button" class="submit-nueva-tarea" > Filtrar Tags</button>
    <button type="button" class="cerrar-modal">Cancelar</button>
    </div>    
    </form>
    `;
    document.body.appendChild(modal);
    const buscarTagInput = document.getElementById('buscarTag');
       const tagsContainer = modal.querySelector("#listaTagsModal");
    
       tags.forEach(tag => {
        
        const tagContainer = document.createElement("div");
        tagContainer.classList.add("tag-container");
    
        // Crear un elemento de casilla de verificación (checkbox)
        const tagCheckbox = document.createElement("input");
        tagCheckbox.type = "checkbox";
        const jsonString = tag;
        tagCheckbox.value = tag;
        tagCheckbox.classList.add("tag");
    
        // Crear un elemento de etiqueta (label)
        const label = document.createElement("label");
        label.classList.add("tag-label");
        label.textContent = tag.descripcion;
    
        // Agregar el checkbox y el label al contenedor del tag
        tagContainer.appendChild(tagCheckbox);
        tagContainer.appendChild(label);
    
        // Agregar el tagContainer al contenedor principal (listaTagsModal)
        const listaTagsModal = document.getElementById('listaTagsModal');
        listaTagsModal.appendChild(tagContainer);
    
    
        
    });

    // Obtener el elemento "todos" y los elementos de etiqueta
const checkboxTodos = document.getElementById("checkboxTodos");
const checkboxes = document.querySelectorAll(".tag");

// Escuchar el evento clic en el elemento "todos"
checkboxTodos.addEventListener("click", function() {
  if (checkboxTodos.checked) {
    // Si "todos" está marcado, desmarca los demás elementos
    tagsFiltro= ["-1"];
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;

    });
  }
});

// Escuchar el evento clic en los elementos de etiqueta
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", function() {
    // Si se marca un elemento de etiqueta, desmarca "todos"
    checkboxTodos.checked = false;
  });
});
    console.log('3');
    // Agregar el modal al cuerpo del documento
    
    
    buscarTagInput.addEventListener('keyup', function(e) {
        const filtro = e.target.value.toLowerCase();
    
        document.querySelectorAll(".tag-container").forEach(tagContainer => {
            const label = tagContainer.querySelector(".tag-label");
    
            label.textContent.toLowerCase().includes(filtro)
                ? tagContainer.classList.remove("filtro")
                : tagContainer.classList.add("filtro");
        });
    });
  
    
   
    modal.addEventListener('click', function(e) {
    
    
     // Verifica si el evento proviene de una casilla de verificación con la clase "tag"
     if (e.target.classList.contains('tag')) {
        const checkbox = e.target;
        const tagId = checkbox.value;
        const isChecked = checkbox.checked;
        
        // Haz lo que necesites con el tagId y el valor isChecked
    }
    
        if(e.target.classList.contains('cerrar-modal')) {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('cerrar');
            setTimeout(() => {
                modal.remove();
            }, 150);
        } 
    
        if(e.target.classList.contains('submit-nueva-tarea')) {
    
           
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                tagsFiltro = [];
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                      tagsFiltro.push(checkbox.value);
                    }
                });
                
    
             //   mostrarTags();    
    console.log('LETS SEEEE',tagsFiltro);
    
    InicializarGrafo(res)  
                setTimeout(() => {
                    modal.remove();
                }, 150);
            }
          
      
    })
    
    
        document.querySelector('.dashboard').appendChild(modal);
        const cursosInputHidden = document.getElementById("contenido");
      //  cursosInputHidden.addEventListener('keypress', guardarTag);
    }
=======
console.log('4')

function mostrarTags2(tags, filteredTags) {
  console.log('POR EL AMOR DE deLX');

  const modal = document.createElement('div');
  modal.classList.add('modalTags');
  modal.innerHTML = `
    <form class="formulario nueva-tarea">
        <legend>Lista de Tags</legend>
        <div class="modal-content">
            <div id="listaTagsModal" class="listaTagsModal">
            </div>
        </div>
        <div class="opciones">
            <button type="button" class="submit-nueva-tarea">Filtrar Tags</button>
            <button type="button" class="cerrar-modal">Cancelar</button>
        </div>    
    </form>
  `;
  document.body.appendChild(modal);

  const tagsContainer = modal.querySelector("#listaTagsModal");

  tags.forEach(tag => {
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag-container");

    // Crear un elemento de casilla de verificación (checkbox)
    const tagCheckbox = document.createElement("input");
    tagCheckbox.type = "checkbox";
    tagCheckbox.value = JSON.stringify(tag);
    tagCheckbox.classList.add("tag");

    // Verificar si el tag está en filteredTags y marcar el checkbox si es así
    if (filteredTags.some(filteredTag => filteredTag.id === tag.id)) {
      tagCheckbox.checked = true;
    }

    // Crear un elemento de etiqueta (label)
    const label = document.createElement("label");
    label.classList.add("tag-label");
    label.textContent = tag.descripcion;

    // Agregar el checkbox y el label al contenedor del tag
    tagContainer.appendChild(tagCheckbox);
    tagContainer.appendChild(label);

    // Agregar el tagContainer al contenedor principal (listaTagsModal)
    tagsContainer.appendChild(tagContainer);
  });

  const checkboxes = document.querySelectorAll(".tag");
  console.log('3');

  modal.addEventListener('click', function(e) {
    // Verifica si el evento proviene de una casilla de verificación con la clase "tag"
    if (e.target.classList.contains('tag')) {
      const checkbox = e.target;
      const tagId = checkbox.value;
      const isChecked = checkbox.checked;
      // Haz lo que necesites con el tagId y el valor isChecked
    }

    if (e.target.classList.contains('cerrar-modal')) {
      const formulario = document.querySelector('.formulario');
      formulario.classList.add('cerrar');
      setTimeout(() => {
        modal.remove();
      }, 150);
    }
    console.log('4');
    if (e.target.classList.contains('submit-nueva-tarea')) {
      const formulario = document.querySelector('.formulario');
      formulario.classList.add('cerrar');

      const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // Asegúrate de seleccionar los checkboxes correctos
     tagsFiltro = [];
    console.log('pasaaaaaaaaaaaaa')
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          // Convertir la cadena JSON a un objeto
          const checkboxObject = JSON.parse(checkbox.value);
          // Guardar el objeto en el array tagsFiltro
          tagsFiltro.push(checkboxObject); // Asegúrate de que cada checkbox tenga un valor correcto
        }
      });

      if (tagsFiltro.length > 0) {
        console.log('hay filtrados.');
        // Aquí puedes llamar a una función para manejar los tags filtrados si es necesario
        mostrarTags();
    } else {
        console.log('No hay tags filtrados.');
    }

      setTimeout(() => {
        modal.remove();
      }, 150);
    }
  });

  document.querySelector('.dashboard').appendChild(modal);
}
if (tagsFiltro.length > 0) {
  console.log('hay filtrados.');
  // Aquí puedes llamar a una función para manejar los tags filtrados si es necesario
  mostrarTags();
  
  }
console.log('5');
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
function mostrarFormularioTag(editar = false, tareas) {
  const modal = document.createElement('DIV');
  modal.classList.add('modal');
  modal.innerHTML = `
      <form class="formulario nueva-tarea" id="modulo-tarea">
          <div class="campo">
              <label>Agregar tags</label>
              <input type="text" id="nuevo-tag" placeholder="Escriba un nuevo tag y presione Enter">
          </div>
          <div class="campo">
              <label>Seleccionar tags</label>
              <div class="listado-tags" id="listado-tags"></div>
              <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos">
          </div>
          <div class="opciones">
              <input type="submit" class="submit-nueva-tarea" value="Añadir Tags" />
              <button type="button" class="cerrar-modal">Cancelar</button>
          </div>
      </form>
  `;

  if (editar) {
      obtenerTemarios(tarea);
  }

  setTimeout(() => {
      const formulario = document.getElementById('modulo-tarea');
      formulario.classList.add('animar');
  }, 0);

  modal.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (e.target.classList.contains('tagch')) {

        const checkbox = e.target;
         // Cambiar el estado del checkbox
<<<<<<< HEAD
         console.log('the grefg2',e.target);
         checkbox.checked = !checkbox.checked;
       
        console.log('the grefg2',e.target);
=======
    
         checkbox.checked = !checkbox.checked;
       
        

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        // Haz lo que necesites con el tagId y el valor isChecked
    }
      if (e.target.classList.contains('cerrar-modal')) {
          const formulario = document.querySelector('.formulario');
          formulario.classList.add('cerrar');
          setTimeout(() => {
              modal.remove();
          }, 500);
      }
      if (e.target.classList.contains('submit-nueva-tarea')) {
<<<<<<< HEAD
          actualizarListadoTags();
=======
          mostrarTags();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

      }
  });

  document.querySelector('.dashboard').appendChild(modal);

  // Script para manejar la lógica de agregar y eliminar tags
  const inputTag = document.getElementById('nuevo-tag');
  const listadoTags = document.getElementById('listado-tags');
  const formularioListado = document.getElementById('formulario__listado');
  let tags = tareas.map(tarea => tarea.descripcion);

  actualizarListadoTags();



const checkboxes = document.querySelectorAll(".tagch");




  inputTag.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const tag = inputTag.value.trim();
          if (tag && !tags.includes(tag)) {
              tags.push(tag);
              actualizarListadoTags();
              inputTag.value = '';
          } else {
              mostrarAlerta('El tag ya existe o está vacío', 'error', inputTag);
          }
      }
  });

  function actualizarListadoTags() {
<<<<<<< HEAD
=======
    console.log('heyy')
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
      listadoTags.innerHTML = '';
      tareas.forEach(tag => {
          const li = document.createElement('div');
          li.classList.add("tag-container");
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = tag;
          checkbox.id = tag.id;
          
          checkbox.name = 'tagAsignatura';
          checkbox.classList.add("tagch");
          const label = document.createElement('label');
          label.htmlFor = tag.id;
          label.textContent = tag.descripcion;
          
          li.appendChild(checkbox);
          li.appendChild(label);
          listadoTags.appendChild(li);
      });
      formularioListado.value = tags.join(',');
  }
  async function agregarTag(tags) {
    // Construir la petición
    const datos = new FormData();
    datos.append('tags', tags);
<<<<<<< HEAD
=======
   
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    
    datos.append('idCurso', obtenerProyecto());

    
    try {

        const url = 'http://localhost/UpTask_MVC/public/index.php/api/anadirTagAsignatura';
<<<<<<< HEAD
        console.log('heyyy')
=======
      
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
=======
  
        const resultado = await respuesta.json();
   
        const prueba = document.querySelector('.formulario legend');

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        mostrarAlerta(
            resultado.mensaje, 
            resultado.tipo, 
            document.querySelector('.formulario legend')
            
        );
<<<<<<< HEAD
        console.log('heyyy')
        console.log(resultado)
=======
     
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
  function mostrarAlerta(mensaje, tipo, referencia) {
      const alerta = document.createElement('div');
      alerta.classList.add('alerta', tipo);
      alerta.textContent = mensaje;
      
      // Insertar la alerta antes de la referencia
      referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);
      
      // Eliminar la alerta después de 3 segundos
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}
<<<<<<< HEAD

=======
console.log('3')
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
// CSS básico para asegurar que los checkboxes sean visibles
const style = document.createElement('style');
style.innerHTML = `
  .listado-tags input[type="checkbox"] {
      display: inline-block;
      margin-right: 10px;
  }
`;
document.head.appendChild(style);



if (cursosInputHidden.value !== '') {
    asignaturas =  cursosInputHidden.value.split(',');
}

<<<<<<< HEAD
console.log(asignaturas);
console.log('1')
cursoDiv.innerHTML = '';

function mostrarTags() {
    const cursoDiv = document.getElementById("listado-temas");
    const contenido = document.getElementById("contenido");
    console.log(cursos);
    cursoDiv.innerHTML = '';
    contenido.innerHTML = '';
    
    cursos.forEach(curso => {
        const etiqueta = document.createElement('LI');
        etiqueta.classList.add('curso_lista');
        etiqueta.textContent = curso.descripcion;
        cursoDiv.appendChild(etiqueta);
    });

    actualizarInputHidden();
}
console.log('2')
function actualizarInputHidden() {
    const cursosInputHidden = document.getElementById("formulario__listado2");
    cursosInputHidden.value = JSON.stringify(cursos);
    console.log('AYUDAME', cursosInputHidden.value);
}

(function() {
    const btnAgregarTags = document.getElementById('btnAgregarTags');
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    const listaTags = document.getElementById('listaTags');
    console.log('3')
=======

cursoDiv.innerHTML = '';



function mostrarTags() {
  console.log('alizz')
    const cursoDiv = document.getElementById("listado-temas");
    const contenido = document.getElementById("contenido");
  
    cursoDiv.innerHTML = '';
    contenido.innerHTML = '';
    console.log('alizz', tagsFiltro)
    tagsFiltro.forEach(curso => {
      const etiqueta = document.createElement('LI');
      etiqueta.classList.add('curso_lista');
      etiqueta.textContent = curso.descripcion;
      console.log('descripcion', curso.descripcion)
      etiqueta.ondblclick = eliminarTags;
      cursoDiv.appendChild(etiqueta);
      actualizarInputHidden();
    });

    function eliminarTags(e) {
      e.target.remove();
      const divForm = document.getElementById(e);
    console.log('no hay mayor ciego que el que no quiere ver',e)
       aux = tagsFiltro.filter(curso=> 
        
        curso.descripcion !== e.target.textContent);
      console.log('PRUEBAAAAAAAAA',aux)
      tagsFiltro = aux;
      console.log('heyyyyyyyyyyyyyyyyyyyyy',tagsFiltro, aux)
      actualizarInputHidden();
  }
 
}

function actualizarInputHidden() {
  console.log('prueba', tagsFiltro)
  
  tagInputHidden.value = JSON.stringify(tagsFiltro);
    console.log(tagInputHidden)
}

(function() {
    //const btnAgregarTags = document.getElementById('btnAgregarTags');
    const ventanaEmergente = document.getElementById('ventanaEmergente');
    const listaTags = document.getElementById('listaTags');

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function obtenerProyecto() {
        const proyectoParams = new URLSearchParams(window.location.search);
        const proyecto = Object.fromEntries(proyectoParams.entries());
        return proyecto.id;
    }
/*
    btnAgregarTags.addEventListener('click', function() {
        obtenerTags(obtenerProyecto());
    });
  */
<<<<<<< HEAD
    console.log('4')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    asignaturas.forEach(curso => {
        const etiqueta = document.createElement('LI');
        etiqueta.classList.add('curso_lista');
        etiqueta.textContent = curso;
        etiqueta.ondblclick = eliminarIdioma;
        cursoDiv.appendChild(etiqueta);
    });

    const cursosInputHidden = document.getElementById("contenido");
    cursosInputHidden.addEventListener('keypress', guardarTag);
    const idiomaSelect = document.getElementById("idioma");

    idiomaSelect.addEventListener("change", function() {
        guardarIdioma(idiomaSelect.value);
    });
<<<<<<< HEAD
    console.log('5')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function guardarTag(e) {
        if (e.keyCode === 44) {
            e.preventDefault();
            const value = cursosInputHidden.value.trim();
            if (value === '' || value < 1) return;
            if (!cursos.find(curso => curso == value)) {
                cursos = [...cursos, value];
                mostrarTags();
            }
        }
    }

    function mostrarIdioma(value) {
        const cursoDiv = document.getElementById("listado-asignaturas");
        const divForm = document.getElementById(value);
        divForm.style.display = "";
        cursoDiv.innerHTML = '';
        asignaturas.forEach(curso => {
            const etiqueta = document.createElement('LI');
            etiqueta.classList.add('curso_lista');
            etiqueta.textContent = curso;
            etiqueta.ondblclick = eliminarIdioma;
            cursoDiv.appendChild(etiqueta);
        });
        actualizarIdiomaHidden();
    }

    function actualizarIdiomaHidden() {
        const cursosInputHidden = document.getElementById("formulario__Idioma");
        cursosInputHidden.value = asignaturas.toString();
    }
<<<<<<< HEAD
    console.log('7')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function eliminarIdioma(e) {
        e.target.remove();
        const divForm = document.getElementById(e.target.textContent);
        divForm.style.display = "none";
        asignaturas = asignaturas.filter(curso => curso !== e.target.textContent);
        actualizarIdiomaHidden();
    }

    function guardarIdioma(value) {
        if (!asignaturas.find(asignatura => asignatura == value)) {
            asignaturas = [...asignaturas, value];
            mostrarIdioma(value);
        }
    }
<<<<<<< HEAD
    console.log('8')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function mostrarTags() {
        const cursoDiv = document.getElementById("listado-temas");
        const contenido = document.getElementById("contenido");
        cursoDiv.innerHTML = '';
        contenido.innerHTML = '';
        cursos.forEach(curso => {
            const etiqueta = document.createElement('LI');
            etiqueta.classList.add('curso_lista');
            etiqueta.textContent = curso.descripcion;
            cursoDiv.appendChild(etiqueta);
        });
        actualizarInputHidden();
    }

    function actualizarInputHidden() {
        const cursosInputHidden = document.getElementById("formulario__listado");
        cursosInputHidden.value = cursos.toString();
    }
<<<<<<< HEAD
    console.log('9')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    function eliminarTag(e) {
        e.target.remove();
        cursos = cursos.filter(curso => curso.descripcion !== e.target.textContent);
        actualizarInputHidden();
    }
})();

function leerContenido() {
    const urlInput = document.getElementById('urlInput').value;
    const resultado = document.getElementById('resultado');

    if (!urlInput) {
        resultado.innerHTML = 'Por favor, ingrese una URL válida.';
        return;
    }

    fetch(urlInput)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener la página');
            return response.text();
        })
        .then(data => {
            resultado.innerHTML = '<h2>Contenido de la página:</h2><pre>' + data + '</pre>';
<<<<<<< HEAD
            console.log(data);
=======
     
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        })
        .catch(error => {
            resultado.innerHTML = 'Error: ' + error.message;
        });
}
<<<<<<< HEAD
console.log('11')
=======

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
async function editarRelacion(id1, id2) {
    const url = `http://localhost/UpTask_MVC/public/index.php/api/asignaturasRelacion?id1=${id1}&id2=${id2}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    const asignatura1 = resultado.respuesta.asignatura1;
    const asignatura2 = resultado.respuesta.asignatura2;
    const nombre1 = obtenerNombrePorIdioma(asignatura1);
    const nombre2 = obtenerNombrePorIdioma(asignatura2);
    const info1 = obtenerInfo(asignatura1);
    const info2 = obtenerInfo(asignatura2);

<<<<<<< HEAD
    console.log(asignatura1);
=======
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

    const modal = document.createElement('DIV');
    modal.classList.add('modalGrafo');
    modal.innerHTML = `
      <form class="formulario nueva-tarea" id="modulo-tarea" style="overflow: auto;">
        <div class="centrado">
          <legend class="centered-text">Relación de Asignaturas</legend>
          <h2 class="centered-text">${nombre1} y ${nombre2}</h2>
          <div class="campo">
            <div class="moda-info">
              <div class="modal-columna">
                <label>${nombre1}</label>
                <div class="accordion">
                  <div class="accordion-content1">
                    <div class="editable-container">
                      <div class="editable-header" onclick="expandTextArea('editLabel1')">
                        <label>Guía Docente:</label>
                        <div class="arrow-button arrow-down" id="editLabel1Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel1TextareaContainer">
                        <textarea id="guiadocente">${info1.guiadocente}</textarea>
                      </div>
                    </div>
                    <div class="editable-container">
                      <div class="editable-header" onclick="expandTextArea('editLabel3')">
                        <label>Contenidos teórico-prácticos:</label>
                        <div class="arrow-button arrow-down" id="editLabel3Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel3TextareaContainer">
                        <textarea id="contenidos">${info1.contenidos}</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-columna">
                <label>${nombre2}</label>
                <div class="accordion">
                  <div class="accordion-content2">
                    <div class="editable-container">
                      <div class="editable-header" onclick="expandTextArea('editLabel1')">
                        <label>Guía Docente:</label>
                        <div class="arrow-button arrow-down" id="editLabel1Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel1TextareaContainer">
                        <textarea id="guiadocente">${info2.guiadocente}</textarea>
                      </div>
                    </div>
                    <div class="editable-container">
                      <div class="editable-header" onclick="expandTextArea('editLabel3')">
                        <label>Contenidos teórico-prácticos:</label>
                        <div class="arrow-button arrow-down" id="editLabel3Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel3TextareaContainer">
                        <textarea id="contenidos">${info2.guiadocente}</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="campo">
            <label>Tags en común:</label>
            <input type="text" id="tags" name="tags" disabled>
          </div>
          <div class="campo">
            <label>Tipo de Relevancia:</label>
            <select name="tipo_relevancia" id="tipoRelevancia">
              <option value="2">Relevancia Fuerte</option>
              <option value="1">Relevancia Moderada</option>
              <option value="0">Relevancia Ligera</option>
            </select>
          </div>
          <div class="opciones">
            <input type="submit" class="submit-guardar" value="Guardar">
            <button type="button" class="submit-eliminar" id="cerrar-modal" value="Eliminar">Cancelar</button>
          </div>
        </div>
      </form>
    `;
    document.querySelector('body').appendChild(modal);

    const cerrarModalBtn = document.getElementById('cerrar-modal');
    cerrarModalBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    const formulario = document.querySelector('.formulario');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
<<<<<<< HEAD
        console.log("Guardando datos");
        console.log(asignatura1);
        const guiadocente1 = document.getElementById('guiadocente').value;
        const contenidos1 = document.getElementById('contenidos').value;
        console.log(guiadocente1);
        console.log(contenidos1);
=======
     
        const guiadocente1 = document.getElementById('guiadocente').value;
        const contenidos1 = document.getElementById('contenidos').value;
      
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    });
}

function obtenerNombrePorIdioma(asignatura) {
    if (!asignatura.idiomas) return 'Sin Nombre';
    const idiomaIngles = asignatura.idiomas.find(idioma => idioma.idioma === 'Ingles');
    const idiomaEspanol = asignatura.idiomas.find(idioma => idioma.idioma === 'Español');
    if (idiomaEspanol && idiomaEspanol.nombre) return idiomaEspanol.nombre;
    if (idiomaIngles && idiomaIngles.nombre) return idiomaIngles.nombre;
    return 'Sin Nombre';
}

function obtenerInfo(asignatura) {
    return {
        guiadocente: asignatura.guiadocente,
        contenidos: asignatura.contenidos
    };
}

function expandTextArea(editLabel) {
    const textareaContainer = document.getElementById(`${editLabel}TextareaContainer`);
    textareaContainer.style.display = textareaContainer.style.display === 'none' ? 'block' : 'none';
    const arrowButton = document.getElementById(`${editLabel}Arrow`);
    arrowButton.classList.toggle('arrow-down');
    arrowButton.classList.toggle('arrow-up');
}
<<<<<<< HEAD
console.log('13')
=======
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
