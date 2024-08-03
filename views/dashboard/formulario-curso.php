<?php $cursos = []; ?>

<div class="cursoform" 
    data-nombre-curso-label="<?php echo $nombre_curso_label; ?>"
    data-nombre-curso-placeholder="<?php echo $nombre_curso_placeholder; ?>"
    data-universidad-curso-label="<?php echo $universidad_curso_label; ?>"
    data-universidad-curso-placeholder="<?php echo $universidad_curso_placeholder; ?>"
    data-agregar-curso="<?php echo $agregar_curso; ?>"
    data-modal-legend="<?php echo $modal_legend; ?>"
    data-modal-ano-label="<?php echo $modal_ano_label; ?>"
    data-modal-especialidad-label="<?php echo $modal_especialidad_label; ?>"
    data-modal-crear-curso="<?php echo $modal_crear_curso; ?>"
    data-modal-cancelar="<?php echo $modal_cancelar; ?>">

    <div class="campo">
        <label for="nombreCurso"><?php echo $nombre_curso_label; ?></label>
        <input
            type="text"
            name="nombreCurso"
            id="nombreCurso"
            placeholder="<?php echo $nombre_curso_placeholder; ?>"
        />
    </div>

    <div class="campo">
        <label for="universidadCurso"><?php echo $universidad_curso_label; ?></label>
        <input
            type="text"
            name="universidadCurso"
            id="universidadCurso"
            placeholder="<?php echo $universidad_curso_placeholder; ?>"
        />
    </div>
</div>

<div class="contenedor-nueva-tarea">
    <button
        type="button"
        class="agregar-curso"
        id="agregar-curso"
    >&#43; <?php echo $agregar_curso; ?></button>
</div>

<ul id="listado-proyectos" class="listado-proyectos"></ul>

<div class="listacurso">   
    <ul id="listado-tareas" class="listado-tareas"></ul>
    <input type="hidden" class="formulario__listado" id="formulario__listado" name="lista_cursos" />
</div> 

<div class="campo">
    <table></table>
</div>

<div class="cursoform"> 
    <div class="listacurso"> 
        <ul class="listado-tareas" id="tabla__cursos2"></ul>
    </div>
</div>
