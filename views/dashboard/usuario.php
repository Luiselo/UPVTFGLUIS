<?php include_once __DIR__  . '/header-dashboard.php'; ?>

    <div class="contenedor-user">
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

        <form class="formulario" method="GET" action="crear">
            <?php include_once __DIR__ . '/formulario-usuario.php'; ?>
            <input type="submit" value="Crear Nuevo Usuario">
        </form>
    </div>

<?php include_once __DIR__  . '/footer-dashboard.php'; ?>