





<?php include_once __DIR__  . '/header-dashboard.php'; ?>

    <div class="dashboard__contenedor-boton">
    <a class="dashboard__boton" href="/UpTask_MVC/public/index.php/panel/crear-curso">
        <i class="fa-solid fa-circle-plus"></i>
        <?php echo $nuevo_curso;?>
    </a>
    </div>
    <?php if(count($cursos) === 0 ) { ?>
        <p class="no-proyectos">No Hay Cursos Actuales </a></p>
    <?php } else { ?>
        <ul class="listado-proyectos">
           
            <?php foreach($cursos as $curso) { ?>
                <li class="proyecto">
                    <a href="/UpTask_MVC/public/index.php/panel/curso?id=<?php echo $curso->id; ?>">
                    <?php echo $curso->universidadCurso . " - " . $curso->nombreCurso; ?>
                    </a>
                </li>
            <?php } ?>
        </ul>
    <?php } ?>

<?php include_once __DIR__  . '/footer-dashboard.php'; ?>