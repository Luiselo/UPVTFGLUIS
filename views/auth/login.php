<div class="contenedor login">
<h1 class="upv"> UPV/EHU </h1>
    <div class="contenedor-sm">
     
        <p class="descripcion-pagina">Iniciar Sesión</p>
        <?php include_once __DIR__ .'/../templates/alertas.php'; ?>
        

        <form class="formulario" method="POST" action="" novalidate>
            <div class="campo">
                <label for="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Tu Email"
                    name="email"
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

            <input type="submit" class="boton" value="Iniciar Sesión">
        </form>

        <div class="acciones">
        
            <a href="olvide">¿Olvidaste tu contraseña?</a>
        </div>
    </div> <!--.contenedor-sm -->
</div>