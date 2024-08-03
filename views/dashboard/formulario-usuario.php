
<div id="lista-usuarios">
    <?php if (count($usuarios) === 0) : ?>
        <p class="no-proyectos">No Hay Usuarios Aún <a href="/crear-curso">Comienza creando uno</a></p>
    <?php else : ?>
        <ul class="listado-usuarios">
            <?php foreach ($usuarios as $usuario) : ?>
                <div class="usuario">
                   
                    <a href="AdministradorUsuario?id=<?php echo $usuario->id; ?>">
                            <div class="profesor__imagendiv">
                                <img class="profesor__imagen" src="data:image/*;base64, <?php echo $usuario->imagen; ?>" alt="Imagen" />
                            </div>
                            <div class="profesor__informacion">
                                <p class="profesor__nombre"><?php echo $usuario->nombre; ?></p>
                                <p class="profesor__campus">hehe</p>
                            </div>
                        </a>
                    </a>
                </div>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

