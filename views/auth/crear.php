<div class="contenedor crear">

    <div class="contenedor-sm">
        <p class="descripcion-pagina">Crea tu cuenta</p>

        <?php include_once __DIR__ .'/../templates/alertas.php'; ?>

        <form class="formulario" method="POST" enctype="multipart/form-data" action="crear">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    placeholder="Tu Nombre"
                    name="nombre"
                    value="<?php echo $usuario->nombre; ?>"
                
                />
            </div>

            <div class="campo">
                <label for="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Tu Email"
                    name="email"
                    value="<?php echo $usuario->email; ?>"
                />
            </div>

            <div class="campo">
                <label for="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="Tu Password"
                    name="password"
                />
            </div>

            <div class="campo">
                <label for="password2">Repetir Password</label>
                <input 
                    type="password"
                    id="password2"
                    placeholder="Repite tu Password"
                    name="password2"
                />
            </div>
            <div class="formulario__campo">
        <label for="imagen" class="formulario__label">Imagen</label>
        <input
            type="file"
            class="formulario__input formulario__input--file"
            id="imagen"
            name="imagen"
        >
    </div>
            <input type="submit" class="boton" value="Crear Cuenta">
        </form>

       
    </div> <!--.contenedor-sm -->
</div>