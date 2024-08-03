//Inicialización

const proyectoParams = new URLSearchParams(window.location.search);
const proyecto = Object.fromEntries(proyectoParams.entries());
let tagsFiltro = ["-1"];
let tagsSeleccionados = []; // Variable global para almacenar los tags seleccionados
let idiomaSeleccionado = "es";
const dims = { height: 700, width: 500 };
let res; // Declarar la variable res fuera de la función
let origen;
let setColor = false;
let grafico = 1;
margin = ({top: 10, right: 100, bottom: 0, left: 100})
step = 14;

// procesamientoDatos.js

// Creación de elementos
const crearElemento = (tipo, id, clase, texto) => {
  const elemento = document.createElement(tipo);
  if (id) elemento.id = id;
  if (clase) elemento.classList.add(clase);
  if (texto) elemento.textContent = texto;
  return elemento;
};

// Añadir opciones al select
const agregarOpcionesSelect = (select, opciones) => {
  opciones.forEach(opcion => {
      const option = document.createElement('option');
      option.value = opcion.value;
      option.textContent = opcion.label;
      select.appendChild(option);
  });
};

// Manejar el cambio de idioma
const manejarCambioIdioma = (select, callback) => {
  select.addEventListener('change', function () {
      const selectedLanguage = this.value;
      idiomaSeleccionado = selectedLanguage;
      callback();
  });
};

// Manejar el cambio de gráfico
const manejarCambioGrafico = (select, callback) => {
  select.addEventListener('change', function () {
      const selectedGrafico = this.value;
      grafico = selectedGrafico;
      callback();
  });
};

// Crear botones de curso
const crearBotonesCurso = (cursos, callback) => {
  cursos.forEach(curso => {
      const botonCurso = crearElemento('button', curso.id, 'filter-button', `${curso.numero} ${curso.descripcion}`);
      botonCurso.classList.toggle('activo');
      botonCurso.addEventListener('click', () => {
          botonCurso.classList.toggle('activo');
          callback();
          botonCurso.style.backgroundColor = botonCurso.classList.contains('activo') ? color(botonCurso.id) : 'rgba(0, 0, 0, 0.5)';
      });
      document.getElementById('navbar').appendChild(botonCurso);
  });
};

// Manejar el botón de filtrado por tags
const manejarBotonTag = (callback) => {
  const botonTag = crearElemento('button', null, 'filter-button', 'Filtrar por Tag');
  botonTag.classList.toggle('activo');
  botonTag.addEventListener('click', () => {
      const tagsArray = res.anoCurso.flatMap(ano => ano.asignaturas.flatMap(asignatura => asignatura.tags.map(tag => tag.descripcion)));
      const uniqueTags = [...new Set(tagsArray)];
      callback(uniqueTags);
  });
  document.getElementById('navbar').appendChild(botonTag);
};

// Manejar el botón de toggle del navbar
const manejarToggleNavbar = () => {
  const toggleButton = crearElemento('button', 'toggle-navbar', 'toggle-button', '☰');
  document.getElementById('navbar').appendChild(toggleButton);
  toggleButton.addEventListener('click', () => {
      const navbar = document.getElementById('navbar');
      if (navbar.classList.contains('hidden')) {
          navbar.classList.remove('hidden');
          setTimeout(() => { navbar.style.opacity = 1; }, 10);
      } else {
          navbar.style.opacity = 0;
          setTimeout(() => { navbar.classList.add('hidden'); }, 500);
      }
  });
};


async function obtenerGrafo(id) {
  try {
      const url = `http://localhost/UpTask_MVC/public/index.php/api/grafo?id=${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      origen = resultado.respuesta.curso;
      res = { ...origen };

      const navbar = document.getElementById('navbar');

      manejarToggleNavbar();

      const selectLanguage = crearElemento('select', 'language-select', 'filter-button');
      agregarOpcionesSelect(selectLanguage, [
          { value: 'es', label: 'Español' },
          { value: 'eu', label: 'Euskera' },
          { value: 'en', label: 'Inglés' }
      ]);
      manejarCambioIdioma(selectLanguage, () => InicializarGrafo(res));
      navbar.appendChild(selectLanguage);

      const selectGrafo = crearElemento('select', 'grafo-select', 'filter-button');
      agregarOpcionesSelect(selectGrafo, [
          { value: 1, label: 'Grafo' },
          { value: 2, label: 'Circunferencia' },
          { value: 4, label: 'Árbol' },
      ]);
      manejarCambioGrafico(selectGrafo, () => InicializarGrafo(res));
      navbar.appendChild(selectGrafo);

      manejarBotonTag(mostrarTags);

      crearBotonesCurso(res.anoCurso, filtrarCursos);

      InicializarGrafo(res);

  } catch (error) {
      console.error("Error al obtener los datos del grafo:", error);
  }
}

async function InicializarGrafo(db){
  // data & firebase hook-up
  var data = [];
  db.anoCurso.forEach(ano =>{
    const doc = {...ano, id: ano.id};
    data.push(doc)
  })

  const cursoFiltrado = { ...data }; // Copia el objeto original

    insertargrafo(data,db);


  
}


//Ejecución
obtenerGrafo(proyecto.id);



function obtenerBotonesActivos() {
  return Array.from(document.querySelectorAll('.activo')).map(boton => boton.id);
}
function arc(d) {
  
  const y1 = d.source.y;
  const y2 = d.target.y;
  const r = Math.abs(y2 - y1) /1.7;
  return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
}

function rec(d) {
  const x1 = d.source.x;
  const y1 = d.source.y;
  const x2 = d.target.x;
  const y2 = d.target.y;
  
  return `M${x1},${y1} L${x2},${y2}`;
}

function arc2(d) {
 
  const y1 = d.source.y;
  const y2 = d.target.y;
  const r = Math.abs(y2 - y1) /1.7;
  return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
}
function insertargrafo (data,db){

const botonesActivos = obtenerBotonesActivos();


// Si tiene -1 significa que no hay ningun tag en uso por lo que no hay que filtrar nada
if (tagsFiltro[0] !== "-1") {
  const asignaturasFiltradas = data.flatMap(d => 
      d.asignaturas.filter(asignatura => {
          const cursoMatch = botonesActivos.includes(asignatura.cursoID);
          const tagMatch = asignatura.tags && asignatura.tags.some(tag => tagsFiltro.includes(tag.descripcion));
          return cursoMatch && tagMatch;
      })
  );

  asignaturas = asignaturasFiltradas.flatMap(asignatura => [obtenerNombrePorIdioma(asignatura)]);
} else {
  asignaturas = data.flatMap(d => 
      d.asignaturas.filter(a => botonesActivos.includes(a.cursoID))
  ).map(a => obtenerNombrePorIdioma(a));
}

 

dx = d3.max(asignaturas, d => d.length)*3 +d3.max(asignaturas, d => d.length)/1,9

height = (data.flatMap(d => d.asignaturas).length - 1) * step + margin.top + margin.bottom
 
function obtenerNombrePorIdioma(obj) {

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

function obtenersSiglaPorIdioma(obj) {
 

  // Verifica si obj tiene la propiedad 'info' y no está vacía
  if (obj.info && obj.info.length > 0) {
      // Busca el objeto info que corresponde al idioma seleccionado
      const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);

      // Si se encuentra la información en el idioma seleccionado, devuelve su nombre
      if (infoIdioma && infoIdioma.nombre) {
          return infoIdioma.sigla;
      }

      // Si no se encuentra el idioma seleccionado, devuelve el nombre en el primer idioma del array
      const primerIdioma = obj.info[0];
      if (primerIdioma && primerIdioma.nombre) {
          return primerIdioma.sigla;
      }
  }

  // Si obj.info está vacío o no se encuentra el idioma seleccionado ni el primer idioma, devuelve obj.nombre
  return obj.asignatura;
}

const nodes = data.flatMap(curso => curso.asignaturas.map(obj => {
  const sigla = obtenersSiglaPorIdioma(obj);
  const sigla2 = obtenersSiglaPorIdioma(obj);

  return {
    id: obj.id,
    sigla: sigla,
    nombre: obtenerNombrePorIdioma(obj),
    semestre: obj.semestre,
    sourceLinks: [],
    targetLinks: [],
    group: obj.cursoID,
    sigla2: sigla2,
    tags: obj.tags,
    curso: curso.numero
  };
}));

const relaciones = [];

const nodeById = new Map(nodes.map(d => [d.id, d]));

const allLinks = data.flatMap(d => d.asignaturas.flatMap(obj =>
  obj.relaciones.map(x => ({
    source: nodeById.get(x.id_asignatura1),
    target: nodeById.get(x.id_asignatura2),
    value: x.descripcion,
    color: x.color
  }))
));
const links = allLinks.filter((link) => link.target !== undefined);

for (const link of links) {
  const { source, target, value } = link;
  source.sourceLinks.push(link);
  target.targetLinks.push(link);
 
}const graph = { nodes, links };
escalax = d3.scaleLinear()
  .domain([0, dx]) // Establece el dominio de la escala
  .range([0, margin.left ]);


  d3.select('.panel').select('svg').remove();

  d3.select('.canvas').select('svg').remove();

  d3.select
const pvg = d3.select('.panel')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('viewBox', `0 0 ${dims.width} ${dims.height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

  const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('viewBox', `0 0 ${dims.width} ${dims.height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

svg.append("style")
  .text(`
    .hover path {
      stroke: transparent;
      
      
    }
    .hover marker-end{
      stroke: transparent;
    }
    .hover text {
      fill: #ccc;
    }
    .hover g.primary text {
      fill: black;
      font-weight: bold;
    }
    .hover g.secondary text {
      fill: #333;
      opacity: 1;
    }
    .hover path.primary {
      stroke: #333;
      stroke-opacity: 1;
      
    }
    .hover  path.secondary {
    
      opacity: 0.3;
    }

   .hover  path:not(.primary):not(.secondary) {
      marker-end: none;
    }
  `);

  const container = svg.append('g');




  const y = d3.scalePoint()
  .domain(graph.nodes.map(d => d.id).sort(d3.ascending))
  .range([margin.top, height - margin.bottom]);

  if(!setColor){
    
  color = d3.scaleOrdinal()
  .domain(graph.nodes.map(d => d.group).sort(d3.ascending))
  .range(d3.schemeCategory10);
  setColor = true;
  
  const botones = document.querySelectorAll(".filter-button");

  // Asigna colores a los botones según sus IDs
  botones.forEach(button => {
    const id = button.id;
    // Utiliza la escala de colores para asignar un color basado en el ID
    const buttonColor = color(id);
    // Establece el color de fondo del botón
    button.style.backgroundColor = buttonColor;
    // Puedes ajustar otros estilos según tus necesidades
  });
  
 
  }

const label = container.append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 8)
  .attr("text-anchor", "end")
  .selectAll("g")
  .data(graph.nodes)
  .enter()
  .append("g")
  .attr("transform", d => `translate(${d.x = dx }, ${d.y = y(d.id)})`)
  .attr("año", d => d.curso);

 
label.append("text")
  .attr("x", -6)
  .attr("class", "prueba")
  .attr("dy", "0.35em")
  .attr("fill", d => d3.lab(color(d.group)).darker(2))
  .text(d => d.nombre);

label.append("circle")
  .attr("r", 3)
  .attr("fill", d => color(d.group));

;

const path = container.insert("g", "*")
.attr("fill", "none")
.attr("class", "relacion")
.attr("stroke-opacity", 0.6)
.attr("stroke-width", 1.5)
.selectAll("path")
.data(graph.links)
.enter()
.append("path")
.attr("stroke", d => {
  const pathColor = d.source.group === d.target.group ? color(d.source.group) : color(d.source.group);
  // Establece el color del camino
  return pathColor;
})
.attr("d", arc)
.attr("transform", `translate(${dx - margin.left},0)`)
.attr("marker-end", d => `url(#arrow-${d.source.group}-${d.target.group})`)

// Define el marcador con un desplazamiento y color vinculado al camino
path.each(function(d) {
  const pathColor = d.source.group === d.target.group ? color(d.source.group) : color(d.target.group);

  // Ajusta el desplazamiento a la derecha cambiando el refX
  const arrow = container.append("defs").append("marker")
    .attr("id", `arrow-${d.source.group}-${d.target.group}`)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 16) // Ajusta el desplazamiento a la derecha aquí
    .attr("refY", 5)
    .attr("markerWidth", 20)
    .attr("markerHeight", 5)
    .attr("orient", "auto-start-reverse");

  arrow.append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .attr("fill", pathColor); // Establece el color del marcador igual al color del camino
});


  const path2 = container.insert("g", "*")
  .attr("fill", "none")
  .attr("class", "relacion")
  .attr("stroke-opacity", 0.6)
  .attr("stroke-width", 1.5)
  .selectAll("path")
  .data(relaciones)
  .enter()
  .append("path")
  .attr("stroke", d => d.source.group === d.target.group ? color(d.source.group) : color(d.target.group))
  .attr("d", arc2)
  .attr("transform", `translate(${dx - margin.left},0)`)
  ;


  
  const overlay = container.append("g")
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .selectAll("rect")
  .data(graph.nodes)
  .enter()
  .append("rect")
  .attr("width", margin.left + 40)
  .attr("height", step)
  .attr("y", d => y(d.id) - step / 2)
  .attr("x", dx - margin.left)
  .on("mouseover", function(d) {
    svg.classed("hover", true);
    label.classed("primary", n => n === d);
    label.classed("secondary", n => n.sourceLinks.some(l => l.target === d) || n.targetLinks.some(l => l.source === d));
    path.classed("primary", l => l.source === d || l.target === d).filter(".primary").raise();
  }).on("mouseout", d => {
    svg.classed("hover", false);
    label.classed("primary", false);
    label.classed("secondary", false);
    path.classed("primary", false).order();
  })
  .on("click", function(d) {
    // Llamar a la función externa
   
    miFuncionExterna(d, pvg,color,relaciones);
  });

//Imprimir Grafo principal

 
  if(grafico == 1){
   
    //imprimirNodoColumna(db,svg,color)
    imprimirTodosNodos(db,pvg,color)
 
  }else if(grafico == 2){
  
    imprimirNodos(db,pvg,color)

  }else if(grafico==3){
 
    updateGraph(svg, nodes, label, path, path2, overlay, container, dims, margin, rec);

}else if (grafico == 4){


  //disperseCanvas();
const width = 1928;
const marginTop = 10;
const marginRight = 10;
const marginBottom = 10;
const marginLeft = 40;
  
  
  var data2 = [];
  
  radius = width / 6;
  db.anoCurso.forEach(ano => {
    const doc = { ...ano, id: ano.id };
    data2.push(doc);
  });
  


  const asignaturaIds = data2.flatMap(d => d.asignaturas.map(a => a.id));

  const links = data2.flatMap(d =>
    d.asignaturas.flatMap(obj =>
      obj.relaciones
        .map(x => ({
          source: x.id_asignatura1,
          target: x.id_asignatura2,
          descripcion: x.descripcion,
          tipo: container.color
        }))
        .filter(link => asignaturaIds.includes(link.source) && asignaturaIds.includes(link.target))
    )
  );
  


  var asignaturas = data2.flatMap(d => d.asignaturas);
  
 
  
  function transformData(data, links, asignaturas) {
    const { nombreCurso, universidadCurso, anoCurso } = data;
   
    // Modificamos el nombre y creamos el atributo "children" para cada curso
    const modifiedCurso = {
      name: nombreCurso,
      children: transformAnoCurso(anoCurso, links, asignaturas) // Llamamos a una función para transformar los datos de "anoCurso"
    };
  
    return modifiedCurso;
  }
  
  // Función para transformar los datos de "anoCurso"
  function transformAnoCurso(anoCurso, links, asignaturas) {
    return anoCurso.map(curso => {

      const { id, numero, descripcion, asignaturas: cursoAsignaturas } = curso;
  
      const modifiedCurso = {
        name: numero + ' ' + descripcion,
        children: transformAsignaturas(cursoAsignaturas, links, asignaturas), // Llamamos a una función para transformar los datos de "asignaturas"
        group: id,
        padre: true
      };
  
      return modifiedCurso;
    });
  }
  
  function obtenerNombrePorIdioma(obj) {

    // Verifica si obj tiene la propiedad 'info' y no está vacía
    if (obj.info && obj.info.length > 0) {
      // Busca el objeto info que corresponde al idioma seleccionado
      const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);
  
      // Si se encuentra la información en el idioma seleccionado, devuelve su nombre
      if (infoIdioma && infoIdioma.nombre) {
        return infoIdioma.sigla;
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
  
  // Función para transformar los datos de "asignaturas"
  function transformAsignaturas(asignaturas, links, asignaturasData) {
    return asignaturas.map(asignaturaItem => {
 
      const { relaciones, id, asignatura, descripcion, cursoID } = asignaturaItem;
  
      nombre = obtenerNombrePorIdioma(asignaturaItem);
 
      // Modificamos el nombre y eliminamos el atributo "relaciones" en "asignaturas"
      const modifiedAsignatura = {
        name: nombre,
        descripción: descripcion,
        id: id,
        padre: true,
        children: transformacionfromChildren(id, links, asignaturasData),
        group: cursoID
      };
  
      return modifiedAsignatura;
    });
  }
  
  function transformacionfromChildren(id, links, asignaturasData) {
    const asignaturasRelacionadas = [];
    const asignaturasAgregadas = new Set(); // Conjunto para almacenar asignaturas únicas

    const enlacesOrigen = links.filter(enlace => enlace.source === id);
    enlacesOrigen.forEach(enlace => {
      const { target, value } = enlace;
      var clase = obtenerNombreAsignatura(target, asignaturasData);
  
      const asignatura = { name: obtenerNombrePorIdioma(clase), value: 1, group: clase.cursoID, padre: true, children: transformacionfromChildren(clase.id, links, asignaturas) };
  
      // Verificar si la asignatura ya ha sido agregada
      if (!asignaturasAgregadas.has(asignatura.name)) {
        asignaturasRelacionadas.push(asignatura);
        asignaturasAgregadas.add(asignatura.name);
      }
    });
  
    
  
    return asignaturasRelacionadas;
  }
  
  function obtenerNombreAsignatura(asignaturaId, asignaturasData) {
    const asignatura = asignaturasData.find(asignatura => asignatura.id === asignaturaId);
    if (asignatura) {
      return asignatura;
    } else {
      return null; // O cualquier valor predeterminado en caso de que el ID de la asignatura no exista
    }
  }
  
  // Aplicamos la transformación a tu dataset original
  const data = transformData(db, links, asignaturas);
  
 
  
  const root = d3.hierarchy(data);

  root.each(d => (d.current = d));

  function update2(event, source = root) {
  
    const duration = event && event.altKey ? 2500 : 250; // Mantener alt para ralentizar la transición
    const nodes = root.descendants().reverse();
    const links = root.links();
 
  
    // Compute the new tree layout.
    tree(root);

  
    // Inicializar x0 y y0 después de aplicar el layout
    root.eachBefore(d => {
      if (d.x !== undefined && d.y !== undefined) {
        d.x0 = d.x;
        d.y0 = d.y;
   
      } else {
      
      }
    });
  
    let left = root;
    let right = root;
    root.eachBefore(node => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

  
    const height = right.x - left.x + marginTop + marginBottom;

  
    const transition = svg.transition()
      .duration(duration)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
      .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    const node = gNode.selectAll("g")
      .data(nodes, d => d.id);

   
  
    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", d => {
        const y0 = source.y0 !== undefined ? source.y0 : (source.parent ? source.parent.y0 : 0);
        const x0 = source.x0 !== undefined ? source.x0 : (source.parent ? source.parent.x0 : 0);
       
        return `translate(${y0},${x0})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", (d, event) => {
       
        if (d.children) {
          d._children = d.children;
          d.children = null;
         
        } else {
          d.children = d._children;
          d._children = null;
        
        }
        update2(event, d); // Llama a la función de actualización con el nodo actual
      });
    
    nodeEnter.append("circle")
      .attr("r", 2.5)
      .attr("fill", d => d._children ? "#555" : "#999")
      .attr("stroke-width", 10);
    
    nodeEnter.append("text")
      .attr("dy", "0.31em")
      .attr("x", d => d._children ? -6 : 6)
      .attr("text-anchor", d => d._children ? "end" : "start")
      .text(d => {

          if (d.data && d.data.name) {
          return d.data.name;
        } else {
      
          return "prueba";
        }
      })
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .attr("stroke", "white")
      .attr("paint-order", "stroke");
  
  
    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
      .attr("transform", d => {
        
        return `translate(${d.y},${d.x})`;
      })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1);
  
    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
      .attr("transform", d => {
      
        return `translate(${source.y},${source.x})`;
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0);
  
    // Update the links…
    const link = gLink.selectAll("path")
      .data(links, d => d.target.id);
  
    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
      .attr("d", d => {
        console.log('Quiero Saber', d);
        const o = { x: source.x0, y: source.y0 };

    
        return diagonal({ source: o, target: o });
      }).attr("stroke", d => color(d.target.data.group))  .attr("data-value", d => d.descripcion)
      .attr("data-tipo", d => d.tipo).on("click", (event, d) => {
        if (d.value) {
            mostrarInformacion(d);
        }
    });;
  
    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
      .attr("d", d => {
       
        return diagonal(d);
      });
  
    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
      .attr("d", d => {
        const o = { x: source.x, y: source.y };
      
        return diagonal({ source: o, target: o });
      });
  
    // Stash the old positions for transition.
    root.eachBefore(d => {
     
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  
  // Llama a la función de actualización con el nodo raíz
  
  const dx = 10;
  const dy = (width - marginRight - marginLeft) / (1 + root.height);
  
  // Define the tree layout and the shape for links.
  const tree = d3.tree().nodeSize([dx, dy]);
  const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
  
  // Create the SVG container, a layer for the links and a layer for the nodes.
  pvg
    .attr("width", width)
    .attr("height", 700)
    .attr("viewBox", [-marginLeft, -marginTop, width, dx])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");

    const g2= pvg.append('g'); // Asegúrate de crear el elemento 'g' y asignarlo a la variable 'container'

const zoom = d3.zoom()
.scaleExtent([0.1, Math.min(width, height)])
.on('zoom', () => {
g2.attr('transform', d3.event.transform); // Realiza el zoom y la reducción del tamaño
this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale)));
this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)));
});
pvg.call(zoom);
  
  const gLink = g2.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);
  
  const gNode = g2.append("g")
    .attr("cursor", "pointer")
    .attr("pointer-events", "all");
  

  // Do the first update to the initial configuration of the tree — where a number of nodes
  // are open (arbitrarily selected as the root, plus nodes with 7 letters).
 
  root.x0 = dy / 2;
  root.y0 = 0;

  
// Asegúrate de que cada nodo en el árbol tenga propiedades x0 e y0 inicializadas
root.each(d => {
  d.x0 = d.x;
  d.y0 = d.y;
});
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

 

  root.x0 = dy / 2;
  root.y0 = 0;

      update2(null, root);
  
  return pvg
  .node();

  
  
  

}  


pvg.node();


}


function updateGraph(svg, nodes, label, path, path2, overlay, container, dims, margin,rec) {
  //disperseGrafico()
  const dx = 100; // Cantidad a mover hacia la derecha
  const dy = 0; // Cantidad a mover hacia abajo

  const t = svg.transition()
    .duration(750);

  // Calcula las posiciones `x` e `y`
  
overlay.on("click", d =>{


  mostrarGrafico(d,data);
  


})
  const groupedData = nodes.reduce((acc, node) => {
    if (!acc[node.curso]) {
      acc[node.curso] = [];
    }
    acc[node.curso].push(node);
    return acc;
  }, {});

  // Altura de cada fila
  const rowHeight = 70;

  // Convierte el objeto groupedData en un array de entradas
  const groupedDataArray = Object.entries(groupedData);
  

  // Número de columnas basado en el número de claves en groupedData
  const numColumns = Object.keys(groupedData).length;
 

  // Calcula el ancho de cada columna para que ocupen todo el ancho disponible
  const columnWidth = dims.width / numColumns;
  const groupWidths = groupedDataArray.map(([curso, group]) => group.length * columnWidth);

  // Calcula el desplazamiento horizontal para centrar las columnas
   totalWidth = numColumns * columnWidth;
   offsetX = (dims.width + 150 - totalWidth) / 2;
   additionalYOffset = 20;

  
  groupedDataArray.forEach(([curso, group], groupIndex) => {
  size = group.length;

    group.forEach((d, i) => {

       offsetX = (dims.width + 150 - columnWidth) / size;
      d.y = groupIndex * rowHeight +additionalYOffset // Índice de columna con desplazamiento
      d.x = i * rowHeight + offsetX + 10; // Índice de fila
    });
  });




  label.transition()
    .delay((d, i) => i * 20)
    .attrTween("transform", d => {
      const x = d.x; // Usa las posiciones calculadas
      const y = d.y;
      return t => `translate(${x},${y})`;
    });

  label.select("text").text(d => d.sigla);
  svg.attr("viewBox", [0, 0, dims.width, dims.height]);
  container.call(d3.zoom().on("zoom", function (event) {
    container.attr("transform", event.transform)
  }));

  // Transición para el path
  path.transition(t)
    .delay((d, i) => i * 20).attr("d", rec)
    .attr("transform", `translate(${dx - margin.left},0)`)
    .attr("marker-end", d => `url(#arrow-${d.source.group}-${d.target.group})`);

  // Transición para path2 (si también necesitas mover este path)
  path2.transition(t)
    .delay((d, i) => i * 20).attr("d", rec)
    .attrTween("transform", d => {
      const x = dx;
      const y = dy;
      return t => `translate(${x},${y})`;
    }).delay((d, i) => i * 20).attr("d", rec)
    .attr("transform", `translate(${dx - margin.left},0)`)
    .attr("marker-end", d => `url(#arrow-${d.source.group}-${d.target.group})`);

  // Transición para el overlay
  overlay.transition(t)
    .delay((d, i) => i * 20)
    .attr("y", d => d.y - step / 2)
    .attr("x", d => d.x - margin.left);
} 



function miFuncionExterna(data, svg, color, relaciones) {
  svg.selectAll('.parent-circle').remove();
  svg.selectAll("*").remove();

  svg.selectAll('.node').remove();
  svg.selectAll('.link').remove();
  svg.selectAll('.label').remove();
  svg.selectAll('.group-node').remove();
  svg.append("style")
  .text(`
    .hover path {
      stroke: transparent;
    }
    .hover text {
      fill: #ccc;
    }
    .hover g.primary text {
      fill: black;
      font-weight: bold;
    }
    .hover g.secondary text {
      fill: #333;
    }
    .hover path.primary {
      stroke: #333;
      stroke-opacity: 1;
    }
  `);

 
  var width = 500;
  var height = 700;

  svg.attr("viewBox", [0, 0, width, height]);

  const container = svg.append('g');
  const zoom = d3.zoom()
    .scaleExtent([0.1, Math.min(width, height)])
    .on('zoom', () => {
      container.attr('transform', d3.event.transform);
    });

  svg.call(zoom);

  function zoomed(event) {
    container.attr('transform', event.transform);
  }

  const relacionesFiltradas = relaciones.filter(relacion => {
    return relacion.target.id === data.id;
  });

  var sourceLinks = data.sourceLinks;
  var targetLinks = data.targetLinks;


  var allLinks = sourceLinks.concat(targetLinks).concat(relacionesFiltradas);

  var nodeIds = new Set();
  allLinks.forEach(function(link) {
  
    nodeIds.add(link.source);
    nodeIds.add(link.target);
  });
  var centralNodeId = data.id;

  var centralNodeGroups = new Set();
  
  // Comentado porque no se usa
  /*
  allLinks.forEach(function(link) {
    if (link.source.id === centralNodeId) {
      centralNodeGroups.add(link.target.group);
    }

    if (link.target.id === centralNodeId) {
      centralNodeGroups.add(link.source.group);
    }
  });
  */

  var groupNodes = [];
  var groupIndex = 0;
  var numGroups = centralNodeGroups.size;
  var anglePerGroup = 2 * Math.PI / numGroups;
  var r = 200; // Ajusta el radio a tu preferencia

  centralNodeGroups.forEach(function(group) {
    var angle = groupIndex * anglePerGroup;
    var x =  Math.cos(angle) * r;
    var y =  Math.sin(angle) * r;
    groupNodes.push({
      id: group,
      group: group,
      x: x,
      y: y,
      isGroup: true
    });
    groupIndex++;
  });

 
  var nodes = [];
  nodeIds.forEach(function(nodeId) {
    nodes.push({
      id: nodeId.id,
      nombre: nodeId.nombre,
      semestre: nodeId.semestre,
      group: nodeId.group,
      isGroup: false
    });
  });



  var links = allLinks.map(function(link) {
    return {
      source: link.source.id,
      target: link.target.id,
      value: link.value,
      color: link.color
    };
  });



  var dataset = {
    nodes: nodes,
    links: links
  };

  const simulation = d3.forceSimulation(dataset.nodes)
    .force("link", d3.forceLink(dataset.links).id(d => d.id).distance(400))
    .force("charge", d3.forceManyBody().strength(-800))
    .force("center", d3.forceCenter(width / 2, height / 2));

  var link = container.selectAll(".link")
    .data(dataset.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#aaa")
    .attr("stroke-width", function(d) {
     
      // Utilizar el campo 'nivel' para asignar el grosor de línea

      return Number(d.color)+1* 1.5; // Puedes ajustar el valor multiplicador según tus preferencias
    })  .on("mouseover", function(d) {
   
      d3.select(this).attr("stroke", "red").attr("stroke-width", function(d) {
          return (Number(d.color) + 1) * 4; // Aumenta el grosor para resaltar
      });
  })
  .on("mouseout", function(d) {
      d3.select(this).attr("stroke", "#aaa").attr("stroke-width", function(d) {
          return (Number(d.color) + 1) * 1.5; // Vuelve al grosor original
      })
  }).on("click",d => {

    mostrarRelacion(d)
  }).attr("marker-end", d => `url(#arrow-${d.source.group}-${d.target.group})`).style("stroke", "#aaa");

  var node = container.selectAll(".node")
    .data(dataset.nodes.filter(d => !d.isGroup))
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 15)
    .attr("fill", d => color(d.group))
    .on("mouseover", function(d) {
      
    }).on("mouseout", d => {
      
    }).on("click",d => {
     
    });

  var labels = container.selectAll(".label")
    .data(dataset.nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("fill", d => d3.color(color(d.group)).darker(5))
    .text(d => d.nombre);

  node.call(drag(simulation));

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    labels
      .attr("x", d => d.x + 10)
      .attr("y", d => d.y + 5);
  });

  function drag(simulation) {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}



function filtrarCursos() {

  function obtenerBotonesActivos() {
    const botones = document.querySelectorAll('.activo'); // Selecciona todos los elementos con la clase "activo"
    const idBotonesActivos = [];
    botones.forEach(function (boton) {
        idBotonesActivos.push(boton.id); // Agrega el ID del botón activo al array
    });

  
    return idBotonesActivos;
}

// Ejemplo de uso
const botonesActivos = obtenerBotonesActivos();


var aux = { ...res };

aux.anoCurso = aux.anoCurso.filter(ano => botonesActivos.includes(ano.id));


  InicializarGrafo(aux);

}


function imprimirTimeLine(aux, svg, color, relaciones) {

  updateLista();

  
   }




   function imprimirNodos(aux, svg, color) {
    console.log('aux',aux,'svg')
  
    var data2 = [];
    width = 600;
    radius = width / 6;
    aux.anoCurso.forEach(ano => {
      const doc = { ...ano, id: ano.id };
      data2.push(doc);
    });

  
    const asignaturaIds = data2.flatMap(d => d.asignaturas.map(a => a.id));
  
    const links = data2.flatMap(d =>
      d.asignaturas.flatMap(obj =>
        obj.relaciones
          .map(x => ({
            source: x.id_asignatura1,
            target: x.id_asignatura2,
            value: x.descripcion
          }))
          .filter(link => asignaturaIds.includes(link.source) && asignaturaIds.includes(link.target))
      )
    );
  
    var asignaturas = data2.flatMap(d => d.asignaturas);
  
    function transformData(data, links, asignaturas) {
      const { nombreCurso, universidadCurso, anoCurso } = data;
  
      const modifiedCurso = {
        name: nombreCurso,
        children: transformAnoCurso(anoCurso, links, asignaturas),
      };
  
      return modifiedCurso;
    }
  
    function transformAnoCurso(anoCurso, links, asignaturas) {
      return anoCurso.map((curso) => {
        const { id, numero, descripcion, asignaturas: cursoAsignaturas } = curso;
        const modifiedCurso = {
          name: numero + ' ' + descripcion,
          children: transformAsignaturas(cursoAsignaturas, links, asignaturas),
          group: id,
          padre: true
        };
        return modifiedCurso;
      });
    }
  
    function obtenerNombrePorIdioma(obj) {
      if (obj.info && obj.info.length > 0) {
        const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);
        if (infoIdioma && infoIdioma.nombre) {
          return infoIdioma.sigla;
        }
        const primerIdioma = obj.info[0];
        if (primerIdioma && primerIdioma.nombre) {
          return primerIdioma.sigla;
        }
      }
      return obj.asignatura;
    }
  
    function transformAsignaturas(asignaturas, links, asignaturasData) {
      return asignaturas.map((asignaturaItem) => {
        const { relaciones, id, asignatura, descripcion, cursoID } = asignaturaItem;
        nombre = obtenerNombrePorIdioma(asignaturaItem)
        const modifiedAsignatura = {
          name: nombre,
          descripción: descripcion,
          id: id,
          padre: true,
          children: transformacionfromChildren(id, links, asignaturasData),
          group: cursoID
        };
        return modifiedAsignatura;
      });
    }
  
    function transformacionfromChildren(id, links, asignaturasData) {
      const asignaturasRelacionadas = [];
      const asignaturasAgregadas = new Set();
      const enlacesOrigen = links.filter((enlace) => enlace.source === id);
      enlacesOrigen.forEach((enlace) => {
        const { target, value } = enlace;
        var clase = obtenerNombreAsignatura(target, asignaturasData);
        const asignatura = { name: obtenerNombrePorIdioma(clase), value: 1, group: clase.cursoID, padre: true, children: transformacionfromChildren(clase.id, links, asignaturasData) };
        if (!asignaturasAgregadas.has(asignatura.name)) {
          asignaturasRelacionadas.push(asignatura);
          asignaturasAgregadas.add(asignatura.name);
        }
      });
      return asignaturasRelacionadas;
    }
  
    function obtenerNombreAsignatura(asignaturaId, asignaturasData) {
      const asignatura = asignaturasData.find((asignatura) => asignatura.id === asignaturaId);
      if (asignatura) {
        return asignatura;
      } else {
        return null;
      }
    }
  
    const data = transformData(aux, links, asignaturas);
  
    const partition = data => {
      const assignValues = node => {
        if (!node.children || node.children.length === 0) {
          node.value = node.value || 1;
        } else {
          node.children.forEach(assignValues);
        }
      };
      assignValues(data);
  
      const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
  
      return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
    };
  
    const arc = d3.arc()
      .startAngle(d => Math.max(0, Math.min(2 * Math.PI, d.x0)))
      .endAngle(d => Math.max(0, Math.min(2 * Math.PI, d.x1)))
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
  
    const root = partition(data);
    root.each(d => (d.current = d));
  
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

      const zoom = d3.zoom()
    .scaleExtent([0.1, Math.min(width, height)])
    .on('zoom', () => {
      g.attr('transform', d3.event.transform); // Realiza el zoom y la reducción del tamaño
      this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale)));
      this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)));
    });
      svg.call(zoom);
  
   ;
  
    const format = d3.format(",d");
  
    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("fill", d => {
        return color(d.data.group);
      })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => arc(d.current))
      .filter(d => d.data.padre)
      .style("cursor", "pointer")
      .on("click", clicked)
      .each(function (d) {
        d3.select(this)
          .transition()
          .on("end", function () {
            d3.select(this)
              .append("title")
              .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
          });
      });
  
    const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .enter()
      .append("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .attr("font-size", d => calculateFontSize(d))
      .text(d => d.data.name)
      .each(function (d) {
        d3.select(this)
          .append("title")
          .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
      }) .on("mouseover", function(d) {
        
    })
    .on("mouseout", function(d) {
        
    }).on("click",d => {
      console.log(d)
      //mostrarRelacion(d)
    });
  
    const parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", () => clicked(parent.datum()));
  const parentText = g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text(root.data.name);
  
    function clicked(p) {
    
      parent.datum(p.parent || root);
      parentText.text(p.data.name);
  
      root.each(function (d) {
        d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        };
      });
      const t = g.transition().duration(750);
  
      path.transition(t)
        .tween("data", function (d) {
          const interpolate = d3.interpolate(d.current, d.target);
          return function (t) {
            d.current = interpolate(t);
          };
        })
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", function (d) {
          return arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0;
        })
        .attrTween("d", function (d) {
          return function () {
            return arc(d.current);
          };
        });
  
      label.filter(function (d) {
        return this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
    }
  
    function arcVisible(d) {
      return d && d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  
    function labelTransform(d) {
      const x = ((d.x0 + d.x1) / 2) * (180 / Math.PI);
      const y = ((d.y0 + d.y1) / 2) * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  
    function calculateFontSize(d) {
      const area = (d.x1 - d.x0) * (d.y1 - d.y0);
      if (area < 10) {
        return "10px";
      } else if (area < 100) {
        return "10px";
      } else {
        return "12px";
      }
    }
  }
  






function imprimirTodosNodos(aux, svg,color) {

data = aux.anoCurso

  svg.selectAll('.node').remove();
  svg.selectAll('.link').remove();
  svg.selectAll('.label').remove();
  svg.selectAll('.group-node').remove();

  //
  var groupNodes = [];
  var groupIndex = 0;
  var numGroups = data.length;
  var anglePerGroup = 2 * Math.PI / numGroups;
  var r = 200; // Ajusta el radio a tu preferencia

      // Crear un objeto para mapear grupos a posiciones X deseadas
const groupXPositions = {};
// Calcula las posiciones X para cada grupo en función de tu lógica específica


data.forEach(function(group) {
  var angle = groupIndex * anglePerGroup;
  var x =  Math.cos(angle) * r;
  var y =  Math.sin(angle) * r;
  groupXPositions[group.id] = x;
  groupNodes.push({
    id: group.id,
    group:group. descripcion,
    x: x,
    y: y,
    isGroup: true
  });
  groupIndex++;
});

function obtenerNombrePorIdioma(obj) {
 
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

var nodes = [];
asignaturas = data.flatMap(d => d.asignaturas.map(a => obtenerNombrePorIdioma(a)));
function obtenersSiglaPorIdioma(obj) {
        // Verifica si obj tiene la propiedad 'info' y no está vacía
        if (obj.info && obj.info.length > 0) {
            // Busca el objeto info que corresponde al idioma seleccionado
            const infoIdioma = obj.info.find(info => info.idioma === idiomaSeleccionado);
            // Si se encuentra la información en el idioma seleccionado, devuelve su nombre
            if (infoIdioma && infoIdioma.nombre) {
                return infoIdioma.sigla;
            }
            // Si no se encuentra el idioma seleccionado, devuelve el nombre en el primer idioma del array
            const primerIdioma = obj.info[0];
            if (primerIdioma && primerIdioma.nombre) {
                return primerIdioma.sigla;
            }
        }
        // Si obj.info está vacío o no se encuentra el idioma seleccionado ni el primer idioma, devuelve obj.nombre
        return obj.asignatura;
      }

    nodes = data.flatMap(d => d.asignaturas.map(obj => ({
    id: obj.id,
    nombre: obtenerNombrePorIdioma(obj),
    sigla: obtenersSiglaPorIdioma(obj),
    url: obj.url,
    semestre: obj.semestre,
    descripcion: obj.descripcion,
    sourceLinks: [],
    targetLinks: [],
    group: obj.cursoID,
    tags: obj.tags,
    isGroup: false
  })));
  
  const nodeById = new Map(nodes.map(d => [d.id, d]));

  const allLinks = data.flatMap(d => d.asignaturas.flatMap(obj =>
    obj.relaciones.map(x => ({
      source: nodeById.get(x.id_asignatura1),
      target: nodeById.get(x.id_asignatura2),
      color: x.color,
      value: x.descripcion
    }))
  ));

// Crea un conjunto de datos de relaciones basadas en etiquetas en común
const relaciones = [];
/*


for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const tagsAsignatura1 = nodes[i].tags.map(tag => tag.descripcion);
    const tagsAsignatura2 = nodes[j].tags.map(tag => tag.descripcion);
    const etiquetasComunes = tagsAsignatura1.filter(tag => tagsAsignatura2.includes(tag));

    if (etiquetasComunes.length > 0) {
      relaciones.push({ source: nodes[i], target: nodes[j] ,value: etiquetasComunes});
    }
  }
}
  
*/
 const links = allLinks.filter((link) => link.target !== undefined);
  
  
  for (const link of links) {
    const { source, target, value } = link;
    source.sourceLinks.push(link);
    target.targetLinks.push(link);
  }

  var groupLinks = [];

  /*
  nodes.forEach(function(groupNode) {
    
      groupLinks.push({
  
        source: groupNode.id,
        target: groupNode.group,
        value: 1,
       
      });
    
   
  });
*/

var allnodes = nodes.concat(groupNodes);
var allinks = links.concat(groupLinks).concat(relaciones);


  const graph = { allnodes, allinks };


    

    //-----------------------------ZOOOM-------------------------------------------

    var width = 500;
    var height = 700;
    svg.attr("viewBox", [0, 0, width, height]);
    const container = svg.append('g'); // Asegúrate de crear el elemento 'g' y asignarlo a la variable 'container'
    const zoom = d3.zoom()
    .scaleExtent([0.1, Math.min(width, height)])
    .on('zoom', () => {
      container.attr('transform', d3.event.transform); // Realiza el zoom y la reducción del tamaño
      this.xAxis.call(this.xScale.scale(d3.event.transform.rescaleX(this.xScale)));
      this.yAxis.call(this.yScale.scale(d3.event.transform.rescaleY(this.yScale)));
    });
      svg.call(zoom);
     function zoomed(event) {

      container.attr('transform', event.transform);
  }
  
    //-----------------------------ZOOOM-------------------------------------------


  
    const simulation = d3.forceSimulation(graph.allnodes)
    .force("link", d3.forceLink(groupLinks).id(d => d.id).distance(10))
    .force("charge", d3.forceManyBody().strength(-30)).force("center", d3.forceCenter(width / 2, height / 2));



// Agrega una fuerza para agrupar los nodos por posición X
//simulation.force("x", d3.forceX(d => groupXPositions[d.group]));
  



function getLineLength(d) {
  var x1 = d.source.x,
      y1 = d.source.y,
      x2 = d.target.x,
      y2 = d.target.y;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}


    var link = container.selectAll(".link")
    .data(graph.allinks)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#aaa")  .attr("stroke-width", 12)
    .attr("stroke-width", function(d) {

      // Utilizar el campo 'nivel' para asignar el grosor de línea

      return Number(d.color)+1* 1.5; // Puedes ajustar el valor multiplicador según tus preferencias
    }) .on("mouseover", function(d) {
  
      d3.select(this).attr("stroke", "red").attr("stroke-width", function(d) {
          return (Number(d.color) + 1) * 4; // Aumenta el grosor para resaltar
      });
  })
  .on("mouseout", function(d) {
      d3.select(this).attr("stroke", "#aaa").attr("stroke-width", function(d) {
          return (Number(d.color) + 1) * 1.5; // Vuelve al grosor original
      })
  }).on("click",d => {
   
    mostrarRelacion(d)
  }).attr("marker-end", d => `url(#arrow-${d.source.group}-${d.target.group})`).style("stroke", "#aaa").attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) {
      var dx = d.target.x - d.source.x;
      var dy = d.target.y - d.source.y;
      var length = Math.sqrt(dx * dx + dy * dy);
      var offset = 15; // Ajusta este valor según el tamaño de tu nodo
      return d.target.x - (dx / length) * offset;
    })
    .attr("y2", function(d) {
      var dx = d.target.x - d.source.x;
      var dy = d.target.y - d.source.y;
      var length = Math.sqrt(dx * dx + dy * dy);
      var offset = 15; // Ajusta este valor según el tamaño de tu nodo
      return d.target.y - (dy / length) * offset;
    });
   ;

   
   data.forEach(d => {
    d.asignaturas.forEach(a => {
      a.relaciones.forEach(r => {
        // Crear el marcador con un identificador único
        svg.append("defs").append("marker")
          .attr("id", `arrow-${r.id_asignatura1}-${r.id_asignatura2}`)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 5)
          .attr("refY", 0)
          .attr("markerWidth", 30) // Ajusta este valor para cambiar el tamaño de la flecha
          .attr("markerHeight", 30) // Ajusta este valor para cambiar el tamaño de la flecha
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M0,-5L10,0L0,5")
          .attr("fill", "#000");
      });
    });
  });

  
  var groupNode = container.selectAll(".group-node")
    .data(graph.allnodes.filter(d => d.isGroup)) // Filtra los group nodes
    .enter()
    .append("rect")
    .attr("class", "group-node")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", d => color(d.group)).call(drag(simulation));

    
    var labels = container.selectAll(".label")
    .data(graph.allnodes)
    .enter()
    .append("text")
    .attr("class", "label").style("font-size", "10px")  .style("opacity", "0.8")
    .attr("fill", d => d3.color(color(d.group)).darker(5))
    .text(d => d.nombre);

    svg.selectAll('.group-node').remove();
    var node = container.selectAll(".node")
    .data(graph.allnodes.filter(d => !d.isGroup)) // Filtra los nodos individuales
    .enter().append("g")
    .append("circle") .attr("r", 15)
    .attr("class", "node")  .on("mouseover", function(d) {
      d3.select(this).attr("r", 20);
  
      const relatedNodes = new Set();
      const targetNamesSet = new Set(d.sourceLinks.map(link => link.target.nombre));
      d.sourceLinks.forEach(link => {
        relatedNodes.add(link.target);
      });
      d.targetLinks.forEach(link => {
        relatedNodes.add(link.source);
      });
      d.targetLinks.forEach(link => targetNamesSet.add(link.source.nombre));
      const nombreslinks = Array.from(targetNamesSet);
  
      link.style("stroke", function(link) {
        if (link.source.nombre === d.nombre || link.target.nombre === d.nombre) {
          return "black";
        } else {
          return "#f0f0f0";
        }
      });
  
      for (const textEl of labels._groups[0]) {
        if (nombreslinks.includes(textEl.textContent)) {
          d3.select(textEl).style("font-weight", "bold").style("font-size", "22px");
        } else if (textEl.textContent == d.nombre) {
          d3.select(textEl).style("font-weight", "bold").style("font-size", "31px");
        } else {
          d3.select(textEl).style("color", "#ccc").style("opacity", "0.4");
        }
      }
  
      // Animar los nodos relacionados
      relatedNodes.forEach(node => {
        d3.select(node).transition().duration(2000)
          .attr("cx", d.x)
          .attr("cy", d.y);
      });
  
      // Animar los enlaces relacionados
      d.sourceLinks.forEach(link => {
        d3.select(link).transition().duration(2000)
          .attr("x1", d.x)
          .attr("y1", d.y);
      });
      d.targetLinks.forEach(link => {
        d3.select(link).transition().duration(2000)
          .attr("x2", d.x)
          .attr("y2", d.y);
      });
    }).on("mouseout", d => {
        for (const textEl of labels._groups[0]) {
          d3.select(textEl).style("font-weight", "normal") .style("font-size", "14px").style("color", "black").style("opacity", "0.8");
      }
        container.selectAll(".node").attr("r", 15);
        link.style("stroke", "#aaa")
     
    }).on("click", d =>{

    console.log(d,data)
      mostrarGrafico(d,data);
      
   
  
    }).attr("fill", d => color(d.group)).call(drag(simulation));




    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", function(d) {
          var dx = d.target.x - d.source.x;
          var dy = d.target.y - d.source.y;
          var length = Math.sqrt(dx * dx + dy * dy);
          var offset = 15; // Ajusta este valor según el tamaño de tu nodo
          return d.target.x - (dx / length) * offset;
        })
        .attr("y2", function(d) {
          var dx = d.target.x - d.source.x;
          var dy = d.target.y - d.source.y;
          var length = Math.sqrt(dx * dx + dy * dy);
          var offset = 15; // Ajusta este valor según el tamaño de tu nodo
          return d.target.y - (dy / length) * offset;
        });
    
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    
      groupNode.attr("x", d => d.x - 10) // Ajusta la posición x del cuadrado
        .attr("y", d => d.y - 10); // Ajusta la posición y del cuadrado
    
      labels.attr("x", d => d.x + 28)
        .attr("y", d => d.y + 5);
    });
    


    
 
  function drag(simulation) {
   
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
  function clicked(event, d) {
   
    if (d.fx === null && d.fy === null) {
      d.fx = d.x;
      d.fy = d.y;
    } else {
      d.fx = null;
      d.fy = null;
    }
  }

}


const contenedor = document.querySelector('.grafico');
const izquierdo = document.querySelector('.canvas');
const derecho = document.querySelector('.panel');
const expandirButton = document.getElementById('expandir-button');
let izquierdoVisible = true;



function disperseCanvas() {


  // Cambia el valor según la dirección de dispersión
    if (izquierdoVisible) {
      document.getElementById('disperse-button').textContent  = "<";
      izquierdo.style.flex = '0'; // Oculta el div izquierdo
      derecho.style.flex = '1'; // El div derecho ocupa todo el espacio
  } else {
    document.getElementById('disperse-button').textContent  = "<";
      izquierdo.style.flex = '1'; // El div izquierdo vuelve a ocupar todo el espacio
      derecho.style.flex = '1'; // Oculta el div derecho
  }
  izquierdoVisible = !izquierdoVisible;

  
}



function disperseGrafico() {


  // Cambia el valor según la dirección de dispersión
    if (izquierdoVisible) {
      document.getElementById('disperse-button').textContent  = "<";
      izquierdo.style.flex = '1'; // Oculta el div izquierdo
      derecho.style.flex = '0'; // El div derecho ocupa todo el espacio
  } else {
    document.getElementById('disperse-button').textContent  = "<";
      izquierdo.style.flex = '1'; // El div izquierdo vuelve a ocupar todo el espacio
      derecho.style.flex = '1'; // Oculta el div derecho
  }
  izquierdoVisible = !izquierdoVisible;


  
}


document.getElementById('disperse-button').addEventListener('click', disperseCanvas);

function crearRelaciones(asignaturas) {
  for (let i = 0; i < asignaturas.length; i++) {
    const asignaturaA = asignaturas[i];

    for (let j = i + 1; j < asignaturas.length; j++) {
      const asignaturaB = asignaturas[j];

      // Encuentra tags en común entre las dos asignaturas
      const tagsComunes = encontrarTagsComunes(asignaturaA.tags, asignaturaB.tags);

      // Si hay tags en común, establece la relación entre las dos asignaturas
      if (tagsComunes.length > 0) {
        asignaturaA.relacionesTag.push({
          id: asignaturaB.id,
          tagsComunes: tagsComunes,
        });

        asignaturaB.relacionesTag.push({
          id: asignaturaA.id,
          tagsComunes: tagsComunes,
        });
      }
    }
  }
}

function encontrarTagsComunes(tagsA, tagsB) {
  const tagsComunes = [];
  
  for (const tagA of tagsA) {
    for (const tagB of tagsB) {
      if (tagA.descripcion === tagB.descripcion) {
        tagsComunes.push(tagA.descripcion);
      }
    }
  }

  return tagsComunes;
}





  function mostrarTags(tags) {
       

    const modal = document.createElement('div');
    modal.classList.add('modalTags');
    modal.innerHTML = `
    <form class="formulario nueva-tarea">
        <legend>Lista de Tags</legend>
       
        <div class="modal-content">
            
            <h2></h2>
            <input type="text" id="buscarTag" value="-1" placeholder="Buscar tag">
            <div id="listaTagsModal" class="listaTagsModal">
            <label>
            <input type="checkbox" id="checkboxTodos" value="todos"> Todos
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
       
         // Preseleccionar el checkbox si está en tagsSeleccionados
         if (tagsSeleccionados.includes(tag)) {

          tagCheckbox.checked = true;
      }
    
        // Crear un elemento de etiqueta (label)
        const label = document.createElement("label");
        label.classList.add("tag-label");
        label.textContent = tag;
    
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
     if (checkbox.checked) {
 
    tagsSeleccionados.push(checkbox.value);
  } else {
    tagsSeleccionados = tagsSeleccionados.filter(tag => tag !== checkbox.value);
  }
    // Si se marca un elemento de etiqueta, desmarca "todos"
    checkboxTodos.checked = false;
  });
});

    
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
                if(tagsSeleccionados.length > 0 ){
const filteredData = JSON.parse(JSON.stringify(data));
 aux = { ...res };
                if (Array.isArray(filteredData)) {
                    aux.anoCurso.forEach(ano => {
                                  if (Array.isArray(ano.asignaturas)) {
                            ano.asignaturas = ano.asignaturas.filter(asignatura => {
                                let hasFilteredTag = false;
                                for (let tag of asignatura.tags) {
                                    if (tagsFiltro.includes(tag.descripcion)) {
                                        hasFilteredTag = true;
                                        break;
                                    }
                                }
                                if (!hasFilteredTag) {
                                             }
                                return hasFilteredTag;
                            });
                        }
                              });
                } else {
                
                }
                
                // Imprimir el resultado final
              InicializarGrafo(aux)  
              
                 }else{
               
               location.reload();
              }
                  setTimeout(() => {
                    modal.remove();
                }, 150);
            }
          
      
    })
    
    
        document.querySelector('.dashboard').appendChild(modal);
        const cursosInputHidden = document.getElementById("contenido");
      //  cursosInputHidden.addEventListener('keypress', guardarTag);
    }


    function imprimirNodoColumna(data, svg,color) {


  
      const asignaturas = data.anoCurso.flatMap(d => d.asignaturas
      .map(a => obtenerNombrePorIdioma(a)));
    
 
      dx = d3.max(asignaturas, d => d.length)*3 +d3.max(asignaturas, d => d.length)/1,9;
      
      height = (data.anoCurso.flatMap(d => d.asignaturas).length - 1) * step + margin.top + margin.bottom
       
   
      function arc(d) {
        
        const y1 = d.source.y;
        const y2 = d.target.y;
        const r = Math.abs(y2 - y1) /1.7;
        return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
      }
      function rec(d) {
        
        const y1 = d.source.y;
        const y2 = d.target.y;
        
        return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
      }
    
      function arc2(d) {
       
        const y1 = d.source.y;
        const y2 = d.target.y;
        const r = Math.abs(y2 - y1) /1.7;
        return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
      }
      
      
      function obtenerNombrePorIdioma(obj) {
        
      
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
    
      
      const nodes = data.anoCurso.flatMap(d => d.asignaturas.map(obj => ({
        id: obj.id,
        nombre: obtenerNombrePorIdioma(obj),
        sigla:  obtenerNombrePorIdioma ,
        url: obj.url,
        semestre: obj.semestre,
        sourceLinks: [],
        targetLinks: [],
        group: obj.cursoID,
        tags: obj.tags
      })));
     
      // Crea un conjunto de datos de relaciones basadas en etiquetas en común
      const relaciones = [];
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const tagsAsignatura1 = nodes[i].tags.map(tag => tag.descripcion);
          const tagsAsignatura2 = nodes[j].tags.map(tag => tag.descripcion);
          const etiquetasComunes = tagsAsignatura1.filter(tag => tagsAsignatura2.includes(tag));
      
          if (etiquetasComunes.length > 0) {
            relaciones.push({ source: nodes[i], target: nodes[j] });
          }
        }
      }
      const nodeById = new Map(nodes.map(d => [d.id, d]));
   
      
      const allLinks = data.anoCurso.flatMap(d => d.asignaturas.flatMap(obj =>
        obj.relaciones.map(x => ({
          source: nodeById.get(x.id_asignatura1),
          target: nodeById.get(x.id_asignatura2),
          value: x.descripcion
        }))
      ));
      
     
      const links = allLinks.filter((link) => link.target !== undefined);
      
      for (const link of links) {
        const { source, target, value } = link;
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
       
      }
    
      
      const graph = { nodes, links };
      
      
      
      
      
      escalax = d3.scaleLinear()
        .domain([0, dx]) // Establece el dominio de la escala
        .range([0, margin.left ]);
      
      
        d3.select('.panel').select('svg').remove();
      
        d3.select('.canvas').select('svg').remove();

      
      
      const pvg = d3.select('.canvas')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${dims.width} ${dims.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      
      pvg.append("style")
        .text(`
          .hover path {
            stroke: transparent;
          }
          .hover text {
            fill: #ccc;
          }
          .hover g.primary text {
            fill: black;
            font-weight: bold;
          }
          .hover g.secondary text {
            fill: #333;
          }
          .hover path.primary {
            stroke: #333;
            stroke-opacity: 1;
          }
        `);
      
        
      
      
        const y = d3.scalePoint()
        .domain(graph.nodes.map(d => d.id).sort(d3.ascending))
        .range([margin.top, height - margin.bottom]);
      
        if(!setColor){
          
        color = d3.scaleOrdinal()
        .domain(graph.nodes.map(d => d.group).sort(d3.ascending))
        .range(d3.schemeCategory10);
        setColor = true;
        

        }
      
      
     
      
      
      const label = pvg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 8)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${dx}, ${d.y = y(d.id)})`);
      
       
      label.append("text")
        .attr("x", -6)
        .attr("class", "prueba")
        .attr("dy", "0.35em")
        .attr("fill", d => d3.lab(color(d.group)).darker(2))
        .text(d => d.nombre);
      
      label.append("circle")
        .attr("r", 3)
        .attr("fill", d => color(d.group));
      
        const path = pvg.insert("g", "*")
        .attr("fill", "none")
        .attr("class", "relacion")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("stroke", d => d.source.group === d.target.group ? color(d.source.group) : color(d.target.group))
        .attr("d", arc)
        .attr("transform", `translate(${dx - margin.left},0)`)

      
        ;
      
      
        const path2 = pvg.insert("g", "*")
        .attr("fill", "none")
        .attr("class", "relacion")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(relaciones)
        .enter()
        .append("path")
        .attr("stroke", d => d.source.group === d.target.group ? color(d.source.group) : color(d.target.group))
        .attr("d", arc2)
        .attr("transform", `translate(${dx - margin.left},0)`)
        ;
      
      
        
        const overlay = pvg.append("g")
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .selectAll("rect")
        .data(graph.nodes)
        .enter()
        .append("rect")
        .attr("width", margin.left + 40)
        .attr("height", step)
        .attr("y", d => y(d.id) - step / 2)
        .attr("x", dx - margin.left)
        .on("mouseover", function(d) {
          pvg.classed("hover", true);
          label.classed("primary", n => n === d);
          label.classed("secondary", n => n.sourceLinks.some(l => l.target === d) || n.targetLinks.some(l => l.source === d));
          path.classed("primary", l => l.source === d || l.target === d).filter(".primary").raise();
        }).on("mouseout", d => {
          pvg.classed("hover", false);
          label.classed("primary", false);
          label.classed("secondary", false);
          path.classed("primary", false).order();
        })
        .on("click", function(d) {
          // Llamar a la función externa
         
         
        });
      
      
      
      
      
     
      //viewof_order.addEventListener("input", update);
      pvg.node();
      }










    