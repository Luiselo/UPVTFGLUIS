

const dims = { height: 500, width: 1100 };


const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dims.width + 100)
  .attr('height', dims.height + 100);

const graph = svg.append('g')
  .attr('transform', 'translate(0, 50)');

// tree and stratify


const stratify = d3.stratify()
  .id(d => d.name)
  .parentId(d => d.parent);

  
const tree = d3.tree()
  .size([dims.width, dims.height]);

// create ordinal scale
const colour = d3.scaleOrdinal(['#f4511e', '#e91e63', '#e53935', '#9c27b0']);


// update function  
const update = (data) => {

  //Nuevos diagramas dependiendo del número de cursos
  const nuevasDims = {height: dims.height/data.length, width: dims.width/data.length};

  graph.selectAll('.node').remove();
  graph.selectAll('.link').remove();

  // update ordinal scale domain
  colour.domain(data.map(d => d.id));

  // get nodes select;ion and join data

  const nodes = graph.selectAll('.node').data(data.map(d => d.asignaturas));


  
console.log('mirar');
  const enterNodes = nodes.enter()
    .append('g')
      .attr('class', 'node')
      .attr('transform', (d,i,n) => {     
        let y = (i * nuevasDims.height);
        return `translate(0, ${y})`
      }) .each(function(d) {
        console.log('1');
        

       const x = d3.scaleBand()
      .domain(d.map(item => item.asignatura)) // Define el dominio de la escala
      .range([0, dims.width]).paddingInner(0.2).paddingOuter(0.2); // Define el rango de salida de la escala

      const escalaTamañoFuente = d3.scaleLinear()
  .domain([0, d.length - 1]) // Mapear el rango de índices de los datos
  .range([6, 12]);

  
      console.log('2');
      d.forEach(asignatura=>{
              d3.select(this).append('g')
              .attr('transform', (d,i,n) => { 
                console.log(escalaTamañoFuente(i));
                let xa =  x(asignatura.asignatura);
                return `translate(${xa}, 100)`
              }) 
              .call(g => g.append("text")
              .attr('text-anchor', 'middle')
              .attr("dy", "-20")
              .attr("x", (x.bandwidth())/2)
              .attr("fill", d => colour(asignatura.cursoID))
              .text(d => asignatura.asignatura)
              .attr("font-size", function(d, i) { return escalaTamañoFuente(i); }))
              .call(g => g.append('circle')
              .attr('fill', d => colour(asignatura.cursoID))
              .attr('stroke', '#555')
              .attr('stroke-width', 2)
              .attr("stroke-width", 1.5)
              .attr("r", 4));

        });
        });
        // Realizar otras operaciones con los datos
        // ...

        
      

    


/*


   .call(g => g.append('rect')
              .attr('fill', d => colour(asignatura.cursoID))
              .attr('stroke', '#555')
              .attr('stroke-width', 2)
              .attr('width',  x.bandwidth)
              .attr('height', 50) );


 const clases = enterNodes.selectAll(".node").data(function(d) {return d} );

const clasesNodes = clases.enter().append('g')
.attr('transform', (d,i,n) => { 

  let x =  (i *(d.asignatura.length * 20));
  return `translate(${x}, 100)`
}) 
.call(g => g.append("text")
.attr('text-anchor', 'middle')

.attr("dy", "5")
.attr("fill", d => colour(d.id))
.text(d => d.asignatura))
.call(g => g.append('rect')
// apply the ordinal scale for fill
.attr('fill', d => colour(d.cursoID))
.attr('stroke', '#555')
.attr('stroke-width', 2)
.attr('width',  d => d.asignatura.length * 10)
.attr('height', 50).attr('transform', (d,i,n) => {     
  let x = 0;
  return `translate(${x}, 100)`
}) );
const cursos = enterNodes._groups;
console.log(enterNodes);
console.log(clases);


/*
 console.log('9');
 /*
  enterNodes.append('rect')
    // apply the ordinal scale for fill
    .attr('fill', d => colour(d.id))
    .attr('stroke', '#555')
    .attr('stroke-width', 2)
    .attr('width', 20)
    .attr('height', 50) .attr('transform', (d,i,n) => {     
      let y = (i * nuevasDims.height);
      return `translate(100, ${y})`
    });
*/
  enterNodes.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', 5)
    .attr('fill', 'white')
    ; 

};
const proyectoParams = new URLSearchParams(window.location.search);
const proyecto = Object.fromEntries(proyectoParams.entries());

obtenerGrafo(proyecto.id);
async   function obtenerGrafo(id){
  try {
    
      const url = `http://localhost/UpTask_MVC/public/index.php/api/grafo?id=${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const res = resultado.respuesta.curso;
 

      InicializarGrafo(res)


      
   return res;
  } catch (error) {
      console.log(error);
  }
 
}
async function InicializarGrafo(db){



        // data & firebase hook-up
        var data = [];
        db.anoCurso.forEach(ano =>{
          const doc = {...ano, id: ano.id};

          data.push(doc)
        })
        console.log(data);

     

          update(data);
          

        
}