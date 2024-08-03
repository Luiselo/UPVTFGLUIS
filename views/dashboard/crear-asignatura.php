<?php include_once __DIR__  . '/header-dashboard.php'; ?>

    <div class="contenedor-user">
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

 
<form class="formulario" method="POST" action="<?php echo $editar ? 'editar-asignatura' : 'crear-asignatura'; ?>">
            <?php include_once __DIR__ . '/formulario-asignatura.php'; ?>
            <input type="submit" value="<?php echo $editar ? 'Editar asignatura' : 'crear asignatura'; ?>">

        </form>
    </div>

    <?php include_once __DIR__  . '/footer-dashboard.php'; ?>

    <?php
//<script src="../../build/js/highcharts.js"></script>
$script .= ' 
<script src="../../build/js/jit-yc.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>


<script src="../../build/js/nuevaAsignatura.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

';

?>

