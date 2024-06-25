//Inicialización
const proyectoParams = new URLSearchParams(window.location.search);
const proyecto = Object.fromEntries(proyectoParams.entries());
let tagsFiltro = ["-1"];

let idiomaSeleccionado = "es";
const dims = { height: 700, width: 500 };
let res; // Declarar la variable res fuera de la función
let origen;
let setColor = false;
let grafico = 1;
margin = ({top: 10, right: 100, bottom: 0, left: 100})
var url = window.location.href;

// Analizamos la URL para obtener los parámetros
const urlParams = new URLSearchParams(window.location.search);
const gr = Object.fromEntries(proyectoParams.entries());

// Obtenemos el valor del parámetro 'id'
var idxd = gr.id;

// Verificamos si se encontró el parámetro 'id' y lo mostramos
if (idxd) {
    console.log('El valor del parámetro "id" es: ' + idxd);
} else {
    console.log('El parámetro "id" no se encontró en la URL.');
}
step = 14;



obtenerGrafo(proyecto.id);
function insertargrafo (data,db){

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


 
  
/*
  if(tagsFiltro[0] != "-1"){

     asignaturas = data
    .flatMap(d => d.asignaturas.filter(a => botonesActivos.includes(a.cursoID) && a.tags.some(tag => tagsFiltro.includes(tag)))
    .map(a => obtenerNombrePorIdioma(a)));           
}else{
  */
  
  if(tagsFiltro[0]=! "-1"){
    const asignaturasFiltradas = data
    .flatMap(d => d.asignaturas.filter(a =>
      botonesActivos.includes(a.cursoID) && 
      (!a.tags || a.tags.find(tag => tagFiltro.includes(tag))
    )))
    .map(a => obtenerNombrePorIdioma(a));
  
  }else{
          
      console.log('EMPIEZA LA FIESTA2', data);
    asignaturas = data.flatMap(d => d.asignaturas.filter(a => botonesActivos.includes(a.cursoID)))
    .map(a => obtenerNombrePorIdioma(a));

 }

 

dx = d3.max(asignaturas, d => d.length)*3 +d3.max(asignaturas, d => d.length)/1,9

height = (data.flatMap(d => d.asignaturas).length - 1) * step + margin.top + margin.bottom
 


  //Control de barra
/*
  
  const options = [
    { name: "Order by name", value: (a, b) => d3.ascending(a.nombre, b.nombre) },
    { name: "Order by group", value: (a, b) => a.group - b.group || d3.ascending(a.nombre, b.nombre) },
    { name: "Order by degree", value: (a, b) => d3.sum(b.sourceLinks, l => l.value) + d3.sum(b.targetLinks, l => l.value) - d3.sum(a.sourceLinks, l => l.value) - d3.sum(a.targetLinks, l => l.value) || d3.ascending(a.id, b.id) }
  ];
  
  
  
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.alignItems = "center";
  form.style.minHeight = "33px";
  
  const select = document.createElement("select");
  select.setAttribute("name", "i");
  
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option.name;
    select.appendChild(optionElement);
  });
  
  form.appendChild(select);
  
  let timeout = setTimeout(() => {
    select.selectedIndex = 1;
    form.dispatchEvent(new CustomEvent("input"));
  }, 2000);
  
  form.onchange = () => {
    form.dispatchEvent(new CustomEvent("input")); // Safari
  };
  
  form.oninput = (event) => {
    if (event.isTrusted) {
      form.onchange = null;
      clearTimeout(timeout);
    }
    form.value = options[select.selectedIndex].value;
  };
  
  form.value = options[select.selectedIndex].value;
  
  const contenido = document.querySelector(".contenido");
  contenido.appendChild(form);
  

  
  
*/  
//const viewof_order = form;
function arc(d) {
  
  const y1 = d.source.y;
  const y2 = d.target.y;
  const r = Math.abs(y2 - y1) /1.7;
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
//Nodos



const nodes = data.flatMap(d => d.asignaturas.map(obj => ({
  id: obj.id,
  nombre: obtenerNombrePorIdioma(obj),
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






const allLinks = data.flatMap(d => d.asignaturas.flatMap(obj =>
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


  


const label = svg.append("g")
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
  .attr("marker-start","url(#arrow)")  
  .attr("marker-mid","url(#arrow)")  
  .attr("marker-end","url(#arrow)"); ;
  ;


  const path2 = svg.insert("g", "*")
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


  
  const overlay = svg.append("g")
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


  console.log('2')
  if(grafico == 1){

    //imprimirTodosNodos(db,pvg,color)
    imprimirNodoColumna(db,svg,color)
 
  }else{
    imprimirNodos(db,pvg,color)
  }

  //



function update() {



 // y.domain(graph.nodes.sort(viewof_order.value).map(d => d.id));
  

  const t = svg.transition()
    .duration(750);

    

  label.transition(t)
    .delay((d, i) => i * 20)
    .attrTween("transform", d => {
      const i = d3.interpolateNumber(d.y, y(d.id));
      return t => `translate(${dx},${d.y = i(t)})`;
    });

  path.transition(t)
    .duration(750 + graph.nodes.length * 20)
    .attrTween("d", d => () => arc(d));
  

    
  path2.transition(t)
  .duration(750 + graph.nodes.length * 20)
  .attrTween("d", d => () => arc2(d));

  
    overlay.transition(t)
    .delay((d, i) => i * 20)
    .attr("y", d => {
    
      return y(d.id) - step / 2;
    });
  

}

//viewof_order.addEventListener("input", update);


svg.node();


}




function miFuncionExterna(data, svg,color,relaciones) {
  console.log('pasa',data,svg,color)

  console.log('2');

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
    .hover path.primary
     {
      stroke: #333;
      stroke-opacity: 1;
    }
  `);


  var width = 500;
  var height = 700;

console.log('2000000000000000000000000000000000000000000000000000000000' , data);
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

console.log('3');
function zoomed(event) {

  container.attr('transform', event.transform);
}
const relacionesFiltradas = relaciones.filter(relacion => {
  return relacion.source.id === data.id || relacion.target.id === data.id;
});


  var sourceLinks = data.sourceLinks;
  var targetLinks = data.targetLinks;

 
  var allLinks = sourceLinks.concat(targetLinks).concat(relacionesFiltradas);
  console.log('4');

  var nodeIds = new Set();
  allLinks.forEach(function(link) {
    nodeIds.add(link.source);
    nodeIds.add(link.target);
  });
  var centralNodeId = data.id;


  var centralNodeGroups = new Set();
  allLinks.forEach(function(link) {



  if (link.source.id === centralNodeId) {
 
    centralNodeGroups.add(link.target.group);
  }

  if (link.target.id === centralNodeId) {
    centralNodeGroups.add(link.source.group);
  }
});

console.log('5');
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

console.log('6',nodeIds);

  var nodes = [];
  nodeIds.forEach(function(nodeId) {
    nodes.push({
      id: nodeId.nombre,
      semestre: nodeId.semestre,
      nombre: nodeId.nombre,
      group: nodeId.group,
      isGroup: false

    });
  });
 
  console.log('6.5');
  nodes = nodes.concat(groupNodes);

  var groupLinks = [];
groupNodes.forEach(function(groupNode) {
  
    groupLinks.push({

      source: data.nombre,
      target: groupNode.id,
      value: 1,
     
    });
  
 
});


  var links = [];
  allLinks.forEach(function(link) {



    if(link.source.id == centralNodeId){

    links.push({
      source: link.target.group,
      target: link.target.nombre,
      value: link.value
    });
  }
  console.log('6.6');
    if(link.target.id == centralNodeId){

   
    links.push({
      source: link.source.group,
      target: link.source.nombre,
      value: link.value
    });
  }
  });
//group links une el nodo central a los cuadrados
  links = links.concat(groupLinks);
  console.log('7');

  var dataset = {
    nodes: nodes,
    groupNodes: groupNodes,
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
    .attr("stroke-width", 2);

    var node = container.selectAll(".node")
    .data(dataset.nodes.filter(d => !d.isGroup)) // Filtra los nodos individuales
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 15)
    .attr("fill", d => color(d.group)).on("mouseover", function(d) {
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
   ;
   
console.log('3');
  
  var groupNode = container.selectAll(".group-node")
    .data(dataset.nodes.filter(d => d.isGroup)) // Filtra los group nodes
    .enter()
    .append("rect")
    .attr("class", "group-node")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d => color(d.group)) .call(drag(simulation));
    
    var labels = container.selectAll(".label")
    .data(dataset.nodes)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("fill", d => d3.color(color(d.group)).darker(5))
    .text(d => d.nombre);
   
    node.call(drag(simulation));
    


    // ZOOM


  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
        
   groupNode.attr("x", d => d.x - 10) // Ajusta la posición x del cuadrado
        .attr("y", d => d.y - 10); // Ajusta la posición y del cuadrado


    labels.attr("x", d => d.x + 8)
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

console.log('9');
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


async function obtenerGrafo(id){
  try {
    console.log(idxd)
      const url = `http://localhost/UpTask_MVC/public/index.php/api/grafo?id=${idxd}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      origen = resultado.respuesta.curso;

      res = origen 
      console.log('1', origen);

      const navbar = document.getElementById('navbar');

// Crea el elemento select
const selectLanguage = document.createElement('select');
selectLanguage.id = 'language-select';

// Define las opciones del select
const languages = [
    { value: 'es', label: 'Español' },
    { value: 'eu', label: 'Euskera' },
    { value: 'en', label: 'Inglés' }
];

// Agrega las opciones al select
languages.forEach(language => {
    const option = document.createElement('option');
    option.value = language.value;
    option.textContent = language.label;
    selectLanguage.appendChild(option);
});

// Agrega un evento para cambiar el idioma al seleccionar una opción
selectLanguage.addEventListener('change', function () {
    const selectedLanguage = this.value;
    idiomaSeleccionado = selectedLanguage;
    
    InicializarGrafo(res)  
    // Puedes agregar aquí la lógica para cambiar el idioma
});

// Crea el elemento select
const selectGrafo = document.createElement('select');
selectGrafo.id = 'grafo-select';

// Define las opciones del select
const grafos = [
    { value: 1, label: 'Grafo' },
    { value: 2, label: 'Circurferencia' },

];

// Agrega las opciones al select
grafos.forEach(grafo => {
    const option = document.createElement('option');
    option.value = grafo.value;
    option.textContent = grafo.label;
    selectGrafo.appendChild(option);
});

// Agrega un evento para cambiar el idioma al seleccionar una opción
selectGrafo.addEventListener('change', function () {
    const selectedLanguage = this.value;
    grafico = selectedLanguage;
    
    InicializarGrafo(res)  
    // Puedes agregar aquí la lógica para cambiar el idioma
});


selectGrafo.classList.add("filter-button"); 
selectLanguage.classList.add("filter-button"); 


// Agrega el select al elemento "navbar"
navbar.appendChild(selectLanguage);




const botonTag = document.createElement('button'); // Crear un elemento de botón
      botonTag.classList.add('filter-button'); 
      botonTag.classList.toggle('activo');
      botonTag.addEventListener('click', () => {

        // Utilizar map para recopilar todos los tags únicos
const tagsArray = res.anoCurso.flatMap((ano) =>
ano.asignaturas.flatMap((asignatura) =>
  asignatura.tags.map((tag) => tag.descripcion)
)
);

// Convertir el array de tags en un conjunto para eliminar duplicados
const uniqueTags = [...new Set(tagsArray)];
        mostrarTags(uniqueTags);
      });
      botonTag.textContent = "Filtrar por Tag" // Establecer el texto del botón como el nombre del curso
      navbar.appendChild(botonTag); // Agregar el botón al div 'navbar'
      
  


navbar.appendChild(selectGrafo);
      res.anoCurso.forEach(curso => {
       
        const botonCurso = document.createElement('button'); // Crear un elemento de botón
        botonCurso.classList.add('filter-button'); 
        botonCurso.id = curso.id;
         botonCurso.classList.toggle('activo');
        botonCurso.addEventListener('click', () => {
          botonCurso.classList.toggle('activo'); // Alternar la clase 'activo'
         filtrarCursos(); // Llamar a la función para filtrar los cursos
         if (botonCurso.classList.contains('activo')) {
          const buttonColor = color(botonCurso.id);
    // Establece el color de fondo del botón
        botonCurso.style.backgroundColor = buttonColor;
         
        } else {
          // Color más apagado (puedes ajustar el valor según tu preferencia)
          botonCurso.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Por ejemplo, color más transparente
        }
        });
        botonCurso.textContent = curso.numero + " "+ curso.descripcion; // Establecer el texto del botón como el nombre del curso
        navbar.appendChild(botonCurso); // Agregar el botón al div 'navbar'
        
      });

      InicializarGrafo(res)    
   
  } catch (error) {
      console.log(error);
    
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
console.log('botones Activos',botonesActivos); // Esto imprimirá un array con los IDs de los botones activos



var aux = { ...res };

aux.anoCurso = aux.anoCurso.filter(ano => botonesActivos.includes(ano.id));


console.log('res',res.anoCurso,aux.anoCurso)


  InicializarGrafo(aux);

}

async function InicializarGrafo(db){



        // data & firebase hook-up
        var data = [];


        db.anoCurso.forEach(ano =>{
          const doc = {...ano, id: ano.id};

          data.push(doc)
        })
        console.log('UNA DUDA PODEROSA',data,db);

        const cursoFiltrado = { ...data }; // Copia el objeto original
       // Filtrar las asignaturas
     
  
          insertargrafo(data,db);








          
          

        
}





function imprimirNodos(aux, svg, color) {

  var data2 = [];
  width =450;
  radius = width / 6
  aux.anoCurso.forEach(ano =>{
    const doc = {...ano, id: ano.id};

    data2.push(doc)
  })

 const links = data2.flatMap(d => d.asignaturas.map(obj => obj.relaciones.map(x=>({source: x.id_asignatura1, target: x.id_asignatura2, value: x.descripcion}))).flat());
 
 console.log('hey',links)
 /*
const allLinks = data.flatMap(d => d.asignaturas.flatMap(obj =>
  obj.relaciones.map(x => ({
    source: nodeById.get(x.id_asignatura1),
    target: nodeById.get(x.id_asignatura2),
    value: x.descripcion
  }))
));

const links = allLinks.filter((link) => link.target !== undefined);
 */
console.log('hey2',asignaturas);
 var asignaturas = data2.flatMap(d => d.asignaturas);

 console.log('hey2',asignaturas);

function transformData(data, links, asignaturas) {
  const { nombreCurso, universidadCurso, anoCurso } = data;
  console.log('hey3')
  // Modificamos el nombre y creamos el atributo "children" para cada curso
  const modifiedCurso = {
    name: nombreCurso,
    children: transformAnoCurso(anoCurso, links, asignaturas), // Llamamos a una función para transformar los datos de "anoCurso"
  };

  return modifiedCurso;
}

// Función para transformar los datos de "anoCurso"
function transformAnoCurso(anoCurso, links, asignaturas) {
  return anoCurso.map((curso) => {
    console.log('hey4')
    const { id, numero, descripcion, asignaturas: cursoAsignaturas } = curso;

    const modifiedCurso = {
      name: numero + ' ' + descripcion,
      children: transformAsignaturas(cursoAsignaturas, links, asignaturas), // Llamamos a una función para transformar los datos de "asignaturas"
      group: id,   
      padre:true

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
// Función para transformar los datos de "asignaturas"
function transformAsignaturas(asignaturas, links, asignaturasData) {
  return asignaturas.map((asignaturaItem) => {
    console.log('hey5')
    const { relaciones, id, asignatura, descripcion, cursoID } = asignaturaItem;

nombre = obtenerNombrePorIdioma(asignaturaItem)


    // Modificamos el nombre y eliminamos el atributo "relaciones" en "asignaturas"
    const modifiedAsignatura = {
      name: nombre,
      descripción: descripcion,
      id: id,
      padre:true,
      children: transformacionfromChildren(id, links, asignaturasData),
      group :cursoID
    };
   
    return modifiedAsignatura;
  });
}

function transformacionfromChildren(id, links, asignaturasData) {
  const asignaturasRelacionadas = [];
  const asignaturasAgregadas = new Set(); // Conjunto para almacenar asignaturas únicas
  console.log('hey6','id',id,'links',links,asignaturasData)
  // Buscar enlaces donde el ID de la asignatura es el origen (source)
  const enlacesOrigen = links.filter((enlace) => enlace.source === id);
  enlacesOrigen.forEach((enlace) => {
    const { target, value } = enlace;
    var clase = obtenerNombreAsignatura(target,asignaturasData);
    console.log('jiji',target,'jujujuj',asignaturasData);
    const asignatura = { name: clase.asignatura, value: 1,group: clase.cursoID, padre: true };
    
    // Verificar si la asignatura ya ha sido agregada
    if (!asignaturasAgregadas.has(asignatura.name)) {
      asignaturasRelacionadas.push(asignatura);
      asignaturasAgregadas.add(asignatura.name);
    }
  });
  
  // Buscar enlaces donde el ID de la asignatura es el destino (target)
  const enlacesDestino = links.filter((enlace) => enlace.target === id);
  enlacesDestino.forEach((enlace) => {
    const { source, value } = enlace;
    var clase = obtenerNombreAsignatura(source,asignaturasData)
    
    const asignatura = { name: clase.asignatura, value: 1, group: clase.cursoID, padre: true };
    
    // Verificar si la asignatura ya ha sido agregada
    if (!asignaturasAgregadas.has(asignatura.nombre)) {
      asignaturasRelacionadas.push(asignatura);
      asignaturasAgregadas.add(asignatura.nombre);
    }
  });
  
  return asignaturasRelacionadas;
}


function obtenerNombreAsignatura(asignaturaId, asignaturasData) {
console.log(asignaturaId,'que entre la china');
  const asignatura = asignaturasData.find((asignatura) => asignatura.id === asignaturaId);
  
  if (asignatura) {
    return asignatura;
  } else {
    return null; // O cualquier valor predeterminado en caso de que el ID de la asignatura no exista
  }
}
  // Aplicamos la transformación a tu dataset original
  const data = transformData(aux,links, asignaturas);




  partition = data => {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
      (root);
  }
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
  .each(function(d) {
   
    d3.select(this)
      .transition()
      .on("end", function() {
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
  .each(function(d) {
    d3.select(this)
      .append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  });

const parent = g.append("circle")
  .datum(root)
  .attr("r", radius)
  .attr("fill", "none")
  .attr("pointer-events", "all")
  .on("click", () => clicked(parent.datum()));
  
  function clicked(p) {
   
    parent.datum(p.parent || root);
  
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
  
    

      //actualiza los label
      label.filter(function(d) {
   
        return this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }

function arccentroid(d) {
  var percentage = (100 * d.dx) / d.parent.dx;
  return d3.format(",.2f")(percentage) + "%";
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
  const area = (d.x1 - d.x0) * (d.y1 - d.y0); // Calcula el área del rectángulo

  // Define las reglas para ajustar el tamaño de la fuente en función del área
  if (area < 10) {
    return "10px";
  } else if (area < 100) {
    return "10px";
  } else {
    return "12px";
  }
}



















//nueva vida





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




   nodes = data.flatMap(d => d.asignaturas.map(obj => ({
    id: obj.id,
    nombre: obtenerNombrePorIdioma(obj),
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
      value: x.descripcion
    }))
  ));

// Crea un conjunto de datos de relaciones basadas en etiquetas en común
const relaciones = [];

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
    .force("link", d3.forceLink(groupLinks).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-50)).force("center", d3.forceCenter(width / 2, height / 2));



// Agrega una fuerza para agrupar los nodos por posición X
//simulation.force("x", d3.forceX(d => groupXPositions[d.group]));
  





    var link = container.selectAll(".link")
    .data(graph.allinks)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#aaa")
    .attr("stroke-width", function(d) {
      // Utilizar el campo 'nivel' para asignar el grosor de línea
      return d.color *9 + 0.5; // Puedes ajustar el valor multiplicador según tus preferencias
    });

   

  
  var groupNode = container.selectAll(".group-node")
    .data(graph.allnodes.filter(d => d.isGroup)) // Filtra los group nodes
    .enter()
    .append("rect")
    .attr("class", "group-node")
    .attr("width", 20)
    .attr("height", 20)
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
    .attr("class", "node").on("mouseover", function(d) {
                          //svg.classed("hover", true);

                
                      d3.select(this).attr("r", 30);

                          const targetNamesSet = new Set(d.sourceLinks.map(link => link.target.nombre));

                    // Agregar los nombres de los sources en targetLinks al conjunto.
                    d.targetLinks.forEach(link => targetNamesSet.add(link.source.nombre));

                    // Convertir el conjunto de nombres únicos en un array.
                    const nombreslinks = Array.from(targetNamesSet);


                    d3.selectAll("line"); // Esto es solo un ejemplo, ajusta la selección según tu estructura de datos.

                    // Ahora, puedes seleccionar y cambiar el color de los enlaces que coincidan con 'obj.nombre'.
                    link.style("stroke", function(link) {
                      if (link.source.nombre === d.nombre || link.target.nombre === d.nombre) {
                        return "black"; // Cambia el color de los enlaces que coinciden con 'obj.nombre' a negro.
                      } else {
                        return "#f0f0f0"; // Cambia el color de los demás enlaces a gris (u otro color deseado).
                      }
                    });




                          for (const textEl of labels._groups[0]) {

                            
                            if(nombreslinks.includes(textEl.textContent)){

                                d3.select(textEl).style("font-weight", "bold") .style("font-size", "22px");
                            }else  if (textEl.textContent == d.nombre) {

                              d3.select(textEl).style("font-weight", "bold") .style("font-size", "31px");
                              // Cambia "new-class" por la clase que deseas aplicar
                            } else{
                              d3.select(textEl)
                      .style("color", "#ccc") // Cambia el color del texto a gris claro
                      .style("opacity", "0.4");
                            }
                          }
        

                        // label.classed("primary", n => n === d);
                          //label.classed("secondary", n => n.sourceLinks.some(l => l.target === d) || n.targetLinks.some(l => l.source === d));
                        // path.classed("primary", l => l.source === d || l.target === d).filter(".primary").raise();

     
    }).on("mouseout", d => {
        for (const textEl of labels._groups[0]) {
          d3.select(textEl).style("font-weight", "normal") .style("font-size", "14px").style("color", "black").style("opacity", "0.8");
      
      }

   
        container.selectAll(".node").attr("r", 15);

        link.style("stroke", "#aaa")
       .attr("stroke-width", 2);
    }).on("click", d =>{
      console.log('ELRUBIUS')

      mostrarGrafico(d,data);
      
   
  
    }).attr("fill", d => color(d.group)).call(drag(simulation));




  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
        
   groupNode.attr("x", d => d.x -10 ) // Ajusta la posición x del cuadrado
        .attr("y", d => d.y -10 ); // Ajusta la posición y del cuadrado


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

// Llama a la función para crear relaciones
//crearRelaciones(tuObjetoAsignaturas.tags);

// Ahora, las asignaturas deberían tener relaciones en su propiedad "relaciones".





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


    function imprimirNodoColumna(data, svg,color) {


      console.log('EMPIEZA LA FIESTA');

    

        function obtenerBotonesActivos() {
        
          const botones = document.querySelectorAll('.activo'); // Selecciona todos los elementos con la clase "activo"
          const idBotonesActivos = [];
      
          botones.forEach(function (boton) {
              idBotonesActivos.push(boton.id); // Agrega el ID del botón activo al array
          });
      
        
          return idBotonesActivos;
      }
      
      console.log('EMPIEZA LA FIESTA2', data);
    
      const asignaturas = data.anoCurso.flatMap(d => d.asignaturas
      .map(a => obtenerNombrePorIdioma(a)));
    
      
       
      
       console.log('EMPIEZA LA FIESTA3', asignaturas);
   
      
      dx = d3.max(asignaturas, d => d.length)*3 +d3.max(asignaturas, d => d.length)/1,9;
      
      height = (data.anoCurso.flatMap(d => d.asignaturas).length - 1) * step + margin.top + margin.bottom
       
      
      console.log('EMPIEZA LA FIESTA4');
      function arc(d) {
        
        const y1 = d.source.y;
        const y2 = d.target.y;
        const r = Math.abs(y2 - y1) /1.7;
        return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
      }
      console.log('EMPIEZA LA FIESTA5');
      function arc2(d) {
       
        const y1 = d.source.y;
        const y2 = d.target.y;
        const r = Math.abs(y2 - y1) /1.7;
        return `M${margin.left},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${margin.left},${y2}`;
      }
      console.log('EMPIEZA LA FIESTA6');
      
      function obtenerNombrePorIdioma(obj) {
        console.log('bebe yo se que todavia', obj)
      
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
      //Nodos
      
      console.log('EMPIEZA LA FIESTA7');
      
      const nodes = data.anoCurso.flatMap(d => d.asignaturas.map(obj => ({
        id: obj.id,
        nombre: obtenerNombrePorIdioma(obj),
        semestre: obj.semestre,
        sourceLinks: [],
        targetLinks: [],
        group: obj.cursoID,
        tags: obj.tags
      })));
      console.log('EMPIEZA LA FIESTA8');
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
      
      
      console.log('EMPIEZA LA FIESTA9');
      
      
      
      const allLinks = data.anoCurso.flatMap(d => d.asignaturas.flatMap(obj =>
        obj.relaciones.map(x => ({
          source: nodeById.get(x.id_asignatura1),
          target: nodeById.get(x.id_asignatura2),
          value: x.descripcion
        }))
      ));
      
      console.log('EMPIEZA LA FIESTA10');
      const links = allLinks.filter((link) => link.target !== undefined);
      
      for (const link of links) {
        const { source, target, value } = link;
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
       
      }
      console.log('EMPIEZA LA FIESTA11');
      
      const graph = { nodes, links };
      
      
      
      
      
      escalax = d3.scaleLinear()
        .domain([0, dx]) // Establece el dominio de la escala
        .range([0, margin.left ]);
      
      
        d3.select('.panel').select('svg').remove();
      
        d3.select('.canvas').select('svg').remove();

        console.log('EMPIEZA LA FIESTA12');
      
      const pvg = d3.select('.canvas')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${dims.width} ${dims.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
      
        console.log('EMPIEZA LA FIESTA13');
      
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
        .attr("marker-start","url(#arrow)")  
        .attr("marker-mid","url(#arrow)")  
        .attr("marker-end","url(#arrow)"); ;
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
      
      
      
      
      
      function update() {
      
      
      
       // y.domain(graph.nodes.sort(viewof_order.value).map(d => d.id));
        
      
        const t = pvg.transition()
          .duration(750);
      
          
      
        label.transition(t)
          .delay((d, i) => i * 20)
          .attrTween("transform", d => {
            const i = d3.interpolateNumber(d.y, y(d.id));
            return t => `translate(${dx},${d.y = i(t)})`;
          });
      
        path.transition(t)
          .duration(750 + graph.nodes.length * 20)
          .attrTween("d", d => () => arc(d));
        
      
          
        path2.transition(t)
        .duration(750 + graph.nodes.length * 20)
        .attrTween("d", d => () => arc2(d));
      
        
          overlay.transition(t)
          .delay((d, i) => i * 20)
          .attr("y", d => {
          
            return y(d.id) - step / 2;
          });
        
      
      }
      
      //viewof_order.addEventListener("input", update);
      
      
      pvg.node();
      
      
      }










    