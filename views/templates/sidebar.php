<aside class="sidebar">
    <div class="contenedor-sidebar">
        <h2>UPV</h2>

        <div class="cerrar-menu">
            <img id="cerrar-menu" src="build/img/cerrar.svg" alt="imagen cerrar menu">
        </div>
    </div>
    

    <nav class="sidebar-nav">
        <a class="<?php echo ($titulo === 'Asignaturas') ? 'activo' : ''; ?>" href="/UpTask_MVC/public/index.php/panel">Grados</a>
        <a class="<?php echo ($titulo === 'Usuarios') ? 'activo' : ''; ?>" href="ver-usuarios">Usuarios</a>
        </nav>

    <div class="cerrar-sesion-mobile">
        <a href="/logout" class="cerrar-sesion">Cerrar Sesión</a>
    </div>
</aside>