<div class="barra-mobile">
    <h1>UPV/EHU</h1>

    <div class="menu">
        <img id="mobile-menu" src="build/img/FacultadInformatica-Gipuzkoa-bilingue-positivo-alta" alt="imagen menus">
    </div>
</div>

<div class="barra">
    <p>Hola: <span><?php echo $_SESSION['nombre']; ?></span></p>

    <div class="language-switcher">
        <?php
        // Obtener los parámetros actuales de la URL
        $params = $_GET;
        $currentId = isset($params['id']) ? $params['id'] : null;
        $baseUrl = strtok($_SERVER["REQUEST_URI"], '?');

        // Generar URL para cada idioma
        function generateLangUrl($lang, $params) {
            $params['lang'] = $lang;
            return '?' . http_build_query($params);
        }
        ?>
        <a href="<?php echo generateLangUrl('es', $params); ?>">Español</a> | 
        <a href="<?php echo generateLangUrl('en', $params); ?>">English</a> | 
        <a href="<?php echo generateLangUrl('eus', $params); ?>">Euskera</a>
    </div>

    <a href="logout.php" class="cerrar-sesion">Cerrar Sesión</a>
</div>
