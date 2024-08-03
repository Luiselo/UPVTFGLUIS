
<?php include_once __DIR__  . '/index-dashboard.php'; ?>

<?php

if(count($anos) === 0 ) { ?>
        <p class="no-proyectos">ERROR <a href="/crear-curso">Comienza creando uno</a></p>
    <?php } else { ?>

    
     
    

<div class="grafico">

<button id="disperse-button" class="expand-button">></button> <!-- Botón de dispersión -->

      <div  class="canvas"></div>
      <div class="panel"></div>
   
  

  


  <!-- Existing navbar content -->
  <button id="toggle-navbar" class="toggle-button">☰</button>
</div>

 
</div>



  <?php } ?>

</div>
    

<?php include_once __DIR__  . '/footer-inicio.php'; ?>

<?php
//<script src="../../build/js/highcharts.js"></script>
$script .= ' 
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.js"></script>

<script src="../public/build/js/graficoD3.js"></script>
<script src="../public/build/js/mostrarGrafico.js"></script>


   
';

?>

