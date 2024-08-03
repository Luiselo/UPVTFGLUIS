<?php include_once __DIR__ . '/header-dashboard.php'; ?>

<div class="contenedor-sm">
    <div class="contenedor-nueva-tarea">
        <button type="button" class="agregar-tarea" id="agregar-tarea">&#43; <?php echo $agregar_curso; ?></button>
        <button type="button" class="agregar-tarea" id="editar-Tag">&#43; <?php echo $editar_tags; ?></button>
    </div>
    <div class="cursoform" 
    data-agregar-curso="<?php echo $agregar_curso; ?>"
    data-no-hay-asignaturas="<?php echo $no_hay_asignaturas; ?>"
    data-modificar-relaciones="<?php echo $modificar_relaciones; ?>"
    data-eliminar="<?php echo $eliminar; ?>"
    data-agregar-nuevo-ano="<?php echo $agregar_nuevo_ano; ?>"
    data-seleccionar-ano="<?php echo $seleccionar_ano; ?>"
    data-especialidad="<?php echo $especialidad; ?>"
    data-crear-curso="<?php echo $crear_curso; ?>"
    data-cancelar="<?php echo $cancelar; ?>"
    data-agregar-tag="<?php echo $agregar_tag; ?>"
    data-escribe-tag="<?php echo $escribe_tag; ?>"
    data-añadir-tags="<?php echo $añadir_tags; ?>"
    data-eliminar-semestre ="<?php echo $eliminar_semestre; ?>" 
    >
        <!-- Aquí va el contenido del formulario -->
    </div>

    <?php if (count($anos) === 0) { ?>
        <p class="no-proyectos"><?php echo $no_hay_cursos . ', ' . $comienza_creando_uno; ?></p>
    <?php } else { ?>
        <ul class="listado-proyectos">
            <?php foreach ($anos as $ano) { ?>
                <li class="proyecto">
                    <a href="/UpTask_MVC/public/index.php/panel/anocurso?id=<?php echo $ano->id; ?>">
                        <?php echo $ano->numero . " " . $ano->descripcion; ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php } ?>
</div>

<div class="contenedor-sm">
    <div class="contenedor-nueva-tarea">
        <button type="button" class="eliminar-tarea" id="eliminar-tarea">&#43; <?php echo $eliminar_curso; ?></button>
    </div>
</div>

<?php include_once __DIR__ . '/footer-dashboard.php'; ?>

<script>
    
   
    const tags = <?php echo json_encode($tags); ?>;
</script>

<?php
$script .= '
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../build/js/anosCurso.js"></script>
';
?>
