<?php 

require 'funciones.php';
require 'database.php';
<<<<<<< HEAD
=======
require 'config.php';
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
require __DIR__ . '/../vendor/autoload.php';

// Conectarnos a la base de datos
use Model\ActiveRecord;
ActiveRecord::setDB($db);