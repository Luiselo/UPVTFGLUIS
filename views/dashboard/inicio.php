






<?php include_once __DIR__  . '/index-dashboard.php'; ?>

    <div class="dashboard__contenedor-boton">
   
    </div>
    <?php if(count($cursos) === 0 ) { ?>
        <p class="no-proyectos">No Hay Cursos Actuales </p>
    <?php } else { ?>
        <ul class="listado-proyectos">
           
            <?php foreach($cursos as $curso) { ?>
                <li class="proyecto">
                <a href="<?php echo BASE_URL . 'index.php?id=' . $curso->id; ?>">

                    <?php echo $curso->universidadCurso . " - " . $curso->nombreCurso; ?>

                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php } ?>

    <?php include_once __DIR__  . '/footer-inicio.php'; ?>