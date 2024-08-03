<?php
<<<<<<< HEAD
$db = mysqli_connect('localhost', 'root', '', 'grafo');
=======
$db = mysqli_connect('localhost', 'root', '', 'grafo2');
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}?>