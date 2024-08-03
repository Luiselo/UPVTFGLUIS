
<?php include_once __DIR__  . '/admin-dashboard.php'; ?>

<?php

if(count($anos) === 0 ) { ?>
        <p class="no-proyectos">No Hay Usuarios Aún <a href="/crear-curso">Comienza creando uno</a></p>
    <?php } else { ?>

    


    
<div class="grafico">

      <div  class="canvas"></div>
      <div class="panel"></div>

  <!-- #region -->   </div>
  
  <!-- Existing navbar content -->
  <button id="toggle-navbar" class="toggle-button">☰</button>



  <?php } ?>
<?php include_once __DIR__  . '/footer-dashboard.php'; ?>

<?php
//<script src="../../build/js/highcharts.js"></script>
$script .= ' 
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.js"></script>

<script src="../../build/js/graficoD3.js"></script>


   
';

?>