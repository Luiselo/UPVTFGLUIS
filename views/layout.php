<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UPV | <?php echo $titulo; ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Open+Sans&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="../../public/build/css/app.css">
    <link rel="stylesheet" href="../public/build/css/app.css"> <!--Dirección para el LOGIN-->
    <link rel="stylesheet" href="../../../public/build/css/app.css">
    <link rel="stylesheet" href="../../../public/build/js/app.js">
   <link rel="stylesheet" href="../../../public/build/js/curso.js"> 
   <script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/sankey.js"></script>
<script src="https://code.highcharts.com/modules/arc-diagram.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

    
  <!--Dirección para el LOGIN  <link rel="stylesheet" href="../../../public/build/js/asignaturas.js"> --> 
    <link rel="stylesheet" href="../../../public/build/js/relacionesEditar.js">
    <link rel="stylesheet" href="../public/build/css/app.js"> <!--Dirección para el LOGIN-->
</head>
<body>

    <?php echo $contenido; ?>

    <?php echo $script ?? ''; ?>

</body>
</html>