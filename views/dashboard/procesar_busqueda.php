<?php
if (isset($_POST['nombreProyecto'])) {
    $nombreProyecto = $_POST['nombreProyecto'];

    $resultados = array();

    // Realiza la búsqueda en tu conjunto de datos ($usuarios)
    foreach ($usuarios as $usuario) {
        if (stripos($usuario->nombre, $nombreProyecto) !== false) {
            $resultados[] = $usuario;
        }
    }

    if (empty($resultados)) {
        echo '<p class="no-proyectos">No se encontraron resultados <a href="/crear-curso">Comienza creando uno</a></p>';
    } else {
        echo '<ul class="listado-usuarios">';
        foreach ($resultados as $usuario) {
            echo '<div class="usuario">';
            echo '<a href="/proyecto?id=' . $usuario->nombre . '">';
            echo '<a href="AdministradorUsuario.php?id=' . $usuario->email . '">';
            echo '<div class="profesor__imagendiv">';
            echo '<img class="profesor__imagen" src="data:image/*;base64, ' . $usuario->imagen . '" alt="Imagen" />';
            echo '</div>';
            echo '<div class="profesor__informacion">';
            echo '<p class="profesor__nombre">' . $usuario->nombre . '</p>';
            echo '<p class="profesor__campus">hehe</p>';
            echo '</div>';
            echo '</a></a></div>';
        }
        echo '</ul>';
    }
}
?>
