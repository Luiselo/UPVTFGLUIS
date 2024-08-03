
<?php include_once __DIR__  . '/header-dashboard.php'; ?>

<?php


if(count($anos) === 0 ) { ?>
        <p class="no-proyectos">No Hay Usuarios Aún <a href="/crear-curso">Comienza creando uno</a></p>
    <?php } else { ?>
   
      <!-- En tu archivo PHP -->
    
<div class="contenedor">



  <!-- Tu comentario aquí <div id="filtrosAsignaturas" class="filtrosAsignaturas">
  <div class="filtros-inputs"> 
  <h2>Cursos:</h2>
     
        <?php  /*foreach($anos as $ano){
          echo"

          <div class=\"campo\">
              <label for=".$ano->numero.$ano->descripcion.">$ano->numero $ano->descripcion</label>
              <input
                  type=\"radio\"
                  id=".$ano->numero.$ano->descripcion."
                  name=\"filtro\"
                  value=".$ano->id."
                  
              />
          </div>";
        } */?>

        -->
        <h1 id="titulo">Relación de Asignaturas</h1>
         <!--
        
        <h1 id="titulo">Relación de Asignaturas</h1>
        <div class ="relacion">
        <dl>
          <dt>Centro: </dt>
          <dd>Facultad de Informática </dd>
          <dt>Titulación: </dt>
          <dd>Grado en Ingenería Informática </dd>
          <dt>Curso Académico: </dt>
          <dd>2023/24</dt>
          <dt>Curso:</dt>
          <dd>Primero Obligatorio</dd>
          <dt>Nº Creditos: </dt>
          <dd>6 </dd>
          <dt>Idiomas: </dt>
          <dd>Castellano, Euskera, Ingles</dd>
        </dl>

        <button id="infoEditButton">Editar</button>
    -->
        <?php 
        
        if(count($anos) === 0 ) { ?>
          <p class="no-proyectos">No Hay Usuarios Aún <a href="/crear-curso">Comienza creando uno</a></p>
      <?php } else { 
            echo"
            <div class=\"filtros\">
            <div class=\"campo\">

            <select id=\"language-select\">
                <option value=\"es\">Español</option>
                <option value=\"eu\">Euskera</option>
                <option value=\"en\">Inglés</option>
            </select>
        </div>
            <div class=\"filtros-inputs\">
          <div class=\"campo\">
          <label>Todos</label>
          <input
              type=\"radio\"
              id=\"-1\"
              name=\"filtro\"
              value=\"-1\"
              checked=\"checked\"
          />
      </div>";
     foreach($anos as $ano){
          echo"

          <div class=\"campo\">
              <label for=".$ano->numero.$ano->descripcion.">$ano->numero $ano->descripcion</label>
              <input
                  type=\"radio\"
                  id=".$ano->numero.$ano->descripcion."
                  name=\"filtro\"
                  value=".$ano->id."
                  
              />
          </div>";
        }
        echo "</div>";
        echo "</div>";
      }?>
      
      
        <table class = "relaciones-tabla" border="1">
               
                
        </table>
    

    <div class="accordion hidden" >
        <button class="accordion-button" id="accordion-button">Guía Docente Labels</button>
        <div class="accordion-content "  style="display: none;">
                      <div class="editable-container" >
                      <div class="editable-header" onclick="expandTextArea('editLabel1')">
                          <label>Título:</label>
                          <div class="arrow-button arrow-down"  id="editLabel1Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel1TextareaContainer">
                          <textarea id="guiadocente" > <?php echo $asignatura->descripcion; ?></textarea>
                          <input 
                        type="submit" 
                        id = "editarDescripcion"
                        class="submit-nueva-tarea" 
                        value="Guardar Cambios" 
                        />
                      </div>
                  </div>
                  <div class="editable-container" >
                      <div class="editable-header" onclick="expandTextArea('editLabel2')">
                          <label>Competencias/ Resultados de aprendizaje de la asignatura:</label>
                          <div class="arrow-button arrow-down"  id="editLabel2Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel2TextareaContainer">
                          <textarea id="competencias" > <?php echo $asignatura->competencia; ?></textarea>
                          <input 
                        type="submit" 
                        id = "editarCompetencias"
                        class="submit-nueva-tarea" 
                        value="Guardar Cambios" 
                        />
                      </div>
                  </div>
                  <div class="editable-container" >
                      <div class="editable-header" onclick="expandTextArea('editLabel3')">
                          <label>Contenidos teórico-prácticos:</label>
                          <div class="arrow-button arrow-down"  id="editLabel3Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel3TextareaContainer">
                          <textarea id="contenidos" > <?php echo $asignatura->temario; ?></textarea>
                          <input 
                        type="submit" 
                        id = "editarContenidos"
                        class="submit-nueva-tarea" 
                        value="Guardar Cambios" 
                        />
                      </div>
                  </div>
                  <div class="editable-container" >
                      <div class="editable-header" onclick="expandTextArea('editLabel4')">
                          <label>Sistemas de evaluación:</label>
                          <div class="arrow-button arrow-down"  id="editLabel4Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel4TextareaContainer">
                          <textarea id="sistema" > <?php echo $asignatura->evaluacion; ?></textarea>
                          <input 
                        type="submit" 
                        id = "editarEvaluacion"
                        class="submit-nueva-tarea" 
                        value="Guardar Cambios" 
                        />
                      </div>

                      
                  </div>
                  
                  <div class="editable-container" >
                      <div class="editable-header" onclick="expandTextArea('editLabel5')">
                          <label>Convocatoria Ordinaria: Orientaciones y Renuncia:</label>
                          <div class="arrow-button arrow-down"  id="editLabel5Arrow"></div>
                      </div>
                      <div class="textarea-container" id="editLabel5TextareaContainer">
                          <textarea id="convocatoria" > <?php echo $asignatura->convocatoria; ?></textarea>
                          <input 
                        type="submit" 
                        id = "editarConvocatoria"
                        class="submit-nueva-tarea" 
                        value="Guardar Cambios" 
                        />
                      </div>

                      
                  </div>
     
     

    </div>
    
   
    

    </div>
  

   


  <?php } ?>


<?php
$script = ''; // Define la variable $script como una cadena vacía

echo "<script>";
echo "var curso = " . json_encode($curso) . ";";
echo "var asi = " . json_encode($asignatura) . ";";
echo "</script>";

$script .= '
    <script src="../../build/js/relacionesAdmin.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
';

?>