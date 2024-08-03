<?php
$cursoId = isset($curso_id) ? $curso_id : null;

// Incluir script de ID del curso si existe
if ($cursoId !== null) {
    $script = '
        <script>
            // Declarar la variable id en JavaScript
            var idCurso = ' . json_encode($cursoId) . ';
            console.log("ID del curso:", idCurso);
        </script>
    ';
    echo $script;
}
?>

<?php include_once __DIR__ . '/header-dashboard.php'; ?>

<div class="contenedor-sm">
    <div class="contenedor-nueva-tarea">
        <button
            type="button"
            class="agregar-tarea"
            id="agregar-tarea"
        >&#43; <?php echo $translations['nueva_asignatura']; ?></button>
    </div>
</div>

<h2><?php echo $translations['primer_cuatrimestre']; ?></h2>
<ul id="listado-asignaturas1" class="listado-asignaturas"></ul>

<h2><?php echo $translations['segundo_cuatrimestre']; ?></h2>
<ul id="listado-asignaturas2" class="listado-asignaturas"></ul>

<div class="contenedor-sm">
    <div class="contenedor-nueva-tarea">
        <button
            type="button"
            class="eliminar-tarea"
            id="eliminar-tarea"
        >&#43; <?php echo $translations['eliminar_semestre']; ?></button>
    </div>
</div>

<?php include_once __DIR__ . '/footer-dashboard.php'; ?>

<script>
    // Pasar las traducciones de PHP a JavaScript
    const translations = <?php echo json_encode($translations); ?>;
</script>

<?php
$script .= '
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../build/js/asignaturas.js"></script>
';
?>
