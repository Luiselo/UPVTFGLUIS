<?php
$idiomasRegistrados = ''; // Inicializa la variable de idiomas
$nombreES = '';
$nombreEU = '';
$nombreEN = '';

$guiadocenteES = '';
$guiadocenteEU = '';
$guiadocenteEN = '';

$competenciasES = '';
$competenciasEU = '';
$competenciasEN = '';

$contenidosES = '';
$contenidosEU = '';
$contenidosEN = '';

$convocatoriaES = '';
$convocatoriaEU = '';
$convocatoriaEN = '';

$sistemaES = '';
$sistemaEU = '';
$sistemaEN = '';

$siglaES = '';
$siglaEU = '';
$siglaEN = '';



if(count($tags) > 0){
    
    $tagsJson = json_encode($tags);

    
}else{
    $tagsJson = [];
  
}
if (count($informacion) > 0) {
    foreach ($informacion as $idioma) {
        switch ($idioma->idioma) {
            case 'es':
                $nombreES = $idioma->nombre;
                $guiadocenteES = $idioma->guiadocente;
                $competenciasES = $idioma->competencias;
                $contenidosES = $idioma->contenidos;
                $convocatoriaES = $idioma->convocatoria;
                $sistemaES = $idioma->sistemas;
                $siglaES = $idioma -> sigla;
                $idiomasRegistrados .= 'es, '; // Agrega 'es' al string
                break;
            case 'eu':
                $nombreEU = $idioma->nombre;
                $guiadocenteEU = $idioma->guiadocente;
                $competenciasEU = $idioma->competencias;
                $contenidosEU = $idioma->contenidos;
                $convocatoriaEU = $idioma->convocatoria;
                $sistemaEU = $idioma->sistemas;
                $siglaEU = $idioma -> sigla;
                $idiomasRegistrados .= 'eu, '; // Agrega 'eu' al string
                break;
            case 'en':
                $nombreEN = $idioma->nombre;
                $guiadocenteEN = $idioma->guiadocente;
                $competenciasEN = $idioma->competencias;
                $contenidosEN = $idioma->contenidos;
                $convocatoriaEN = $idioma->convocatoria;
                $siglaEN = $idioma -> sigla;
                $sistemaEN = $idioma->sistemas;
                $idiomasRegistrados .= 'en, '; // Agrega 'en' al string
                break;
        }
    }

    // Elimina la última coma y espacio si es necesario
    if (!empty($idiomasRegistrados)) {
        $idiomasRegistrados = rtrim($idiomasRegistrados, ', ');
    }
}
?>
<script>
   <?php if (count($tags) > 0) :
        $tagsJson = json_encode($tags); ?>
        console.log('pruebaa');
        tags = <?php echo $tagsJson; ?>;
        console.log(tags); // Para verificar el contenido en la consola del navegador
<?php else : ?>
        tags = [];
        console.log('pruebaa');
        console.log(tags); // Para verificar el contenido en la consola del navegador
<?php endif; ?>


    var tags_asignatura = [];
    <?php if (count($tags_asignatura) > 0) :
        $tags_asignaturaJSON = json_encode($tags_asignatura); ?>
        console.log('pruebaa');
        tags_asignatura = <?php echo $tags_asignaturaJSON; ?>;
        console.log('dalas', tags_asignatura); // Para verificar el contenido en la consola del navegador
    <?php endif; ?>

    // Extraer los identificadores de tags_asignatura
    var tagIds = tags_asignatura.map(item => item.idTag);

    // Filtrar los tags que están en los identificadores de tags_asignatura
    var filteredTags = tags.filter(tag => tagIds.includes(tag.id));
    console.log('Filtered Tags:', filteredTags);
</script>

<form class="formulario nueva-tarea">

    <input type="hidden" id="cursoID" name="cursoID" value="<?php echo $cursoID; ?>" />


    <div class="campo__asignatura">
        <label>Número de créditos</label>
        <input 
            type="text"
            name="creditos"
            placeholder="Número de créditos"
            id="creditos"
            pattern="[0-9]*"
            value="<?php echo isset($asignatura->creditos) ? htmlspecialchars($asignatura->creditos) : ''; ?>"
        />
    </div>
    
    <div class="campo__asignatura">
        <label>Semestre</label>
        <input type="hidden" id="idas" name="idas" value="<?php echo $asignatura->id; ?>" />   
        <select name="semestre" id="semestre">
            <option value="1" <?php echo ($asignatura && $asignatura->semestre === '1') ? 'selected' : ''; ?>>Primer cuatrimestre</option>
            <option value="2" <?php echo ($asignatura && $asignatura->semestre === '2') ? 'selected' : ''; ?>>Segundo cuatrimestre</option>
        </select>
    </div>

    <div class="campo__asignatura">
        <label>URL</label>
        <input 
            type="text"
            name="url"
            placeholder="Dirección web de la asignatura"
            id="url" 
            
        value="<?php echo htmlspecialchars($asignatura->url ?? '') ?>" />
    </div>
    
   
    <div id="resultado"></div>

    <div class="campo__asignatura">
        <label>Idiomas (se puede seleccionar más de uno)</label>
        <select name="idioma" id="idioma">
            <option value="">Selecciona un idioma</option>
            <option value="es">Español</option>
            <option value="eu">Euskera</option>
            <option value="en">Inglés</option>
        </select>
    </div>
    <div class="campo__asignatura">
        <ul class="listado-asignaturas" id="listado-asignaturas"></ul>
        <input type="hidden" class="formulario__listado" value="<?php echo $idiomasRegistrados; ?>" id="formulario__Idioma" name="lista_idiomas" />
    </div>

    <!-- Secciones para cada idioma -->
    <div class="castellano" id="es" style="display: <?php echo empty($nombreES) ? 'none' : 'block'; ?>">
        <h2>Castellano</h2>
        <div class="campo__asignatura">
            <label>Asignatura</label>
            <input 
                type="text"
                name="nombreES"
                placeholder="Nombre de la asignatura"
                id="nombreES"
                value="<?php echo htmlspecialchars($nombreES); ?>"
            />
        </div>
        <div class="campo__asignatura">
            <label>Sigla</label>
            <input 
                type="text"
                name="siglaES"
                placeholder="Sigla de la asignatura"
                id="siglaES"
                value="<?php echo htmlspecialchars($siglaES); ?>"
            />
        </div>
    </div>

    <div class="euskera" id="eu" style="display: <?php echo empty($nombreEU) ? 'none' : 'block'; ?>">
        <h2>Euskera</h2>
        <div class="campo__asignatura">
            <label>Asignatura Izena</label>
            <input 
                type="text"
                name="nombreEU"
                placeholder="Nombre de la asignatura"
                id="nombreEU"
                value="<?php echo htmlspecialchars($nombreEU); ?>"
            />
        </div>
        <div class="campo__asignatura">
            <label>Sigla</label>
            <input 
                type="text"
                name="siglaEU"
                placeholder="Asignaturako Sigla"
                id="siglaEU"
                value="<?php echo htmlspecialchars($siglaEU); ?>"
            />
        </div>
    </div>

    <div class="ingles" id="en" style="display: <?php echo empty($nombreEN) ? 'none' : 'block'; ?>">
        <h2>English</h2>
        <div class="campo__asignatura">
            <label>Subject Title</label>
            <input 
                type="text"
                name="nombreEN"
                placeholder="Name of the subject"
                id="nombreEN"
                value="<?php echo htmlspecialchars($nombreEN); ?>"
            />
        </div>
        <div class="campo__asignatura">
            <label>Mark</label>
            <input 
                type="text"
                name="siglaEN"
                placeholder="Sigla of the Subject"
                id="siglaEN"
                value="<?php echo htmlspecialchars($siglaEN); ?>"
            />
        </div>
        </div>
    <!-- Resto de campos -->

  

    <div class="contenedor-nueva-tarea">
        <button
            type="button"
            class="agregar-tarea"
            id="editar-Tag"
        >&#43; Agregar Tags</button></div>
    <div class="campo__asignatura">
        
        
        <input 
            type="text"
            name="contenido"
            id="contenido"
            style="display: none;"
        />
    </div>

    <div class="campo">
        <ul class="listado-asignaturas" id="listado-temas"></ul>
        <input type="hidden" class="formulario__listado" id="formulario__listado2" name="lista_cursos2" />
    </div>

    <div class="campo">
        <ul class="listado-asignaturas" id="listado-temas"></ul>
        <input type="hidden" class="formulario__listado" id="formulario__tag" name="lista_tags" />
    </div>


   
   



