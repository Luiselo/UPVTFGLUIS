
<?php include_once __DIR__  . '/header-dashboard.php'; ?>

<?php

if(count($anos) === 0 ) { ?>
        <p class="no-proyectos">No Hay Usuarios Aún <a href="/crear-curso">Comienza creando uno</a></p>
    <?php } else { ?>

    
<div class="contenedor" id="container">

<div class="contenedor-grafico"> 

          <div id="center-container">
              <div id="infovis"></div>    
          </div>

          <div id="right-container">

                  <div id="inner-details"></div>

                  </div>

                  <div id="log"></div>


          </div>
</div>

  <?php } ?>
<?php include_once __DIR__  . '/footer-dashboard.php'; ?>

<?php
//<script src="../../build/js/highcharts.js"></script>
$script .= ' 
<script src="../../build/js/jit-yc.js"></script>
<script src="../../build/js/graficoEditable.js"></script>
   
';

?>