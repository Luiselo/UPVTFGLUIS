<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;
use Model\Curso;
use Model\AnoCurso;
use Classes\Email;
class LoginController {
<<<<<<< HEAD

    public static function inicio(Router $router) {
    
      
        
=======
    private static function loadLanguage() {
        // Default language
        $lang = 'es';

        // Check if a language is set in the session or query parameters
        if (isset($_GET['lang'])) {
            $lang = $_GET['lang'];
            $_SESSION['lang'] = $lang;
        } elseif (isset($_SESSION['lang'])) {
            $lang = $_SESSION['lang'];
        }

        // Load the language helper
        require_once __DIR__ . '/../helper/language_helper.php';
        return $lang;
    }
    public static function inicio(Router $router) {
    
      
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $cursos = [];
   
        $cursos = curso::all();
        
       if (isset($_GET['id']))  {

                // Añadir el nuevo password
                
                $num = $_GET['id'];

                // Validar el password
                $curso = Curso::where('id', $num);
            $anos = AnoCurso::getAnos('idCurso',  $num); 
        
            //graficoIndex
            $router->render('dashboard/grafico', [
                'titulo' =>  $curso->nombreCurso." ".$curso->universidadCurso,'anos' => $anos
            ]);
        }

        
        $router->render('dashboard/inicio', [
<<<<<<< HEAD
            'titulo' => 'Visualizador de asignaturas','cursos' => $cursos ]);
=======
            'titulo' => 'Catálogo de Grados Universitarios','cursos' => $cursos ]);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

     
        /*
       
        */
    }
    public static function login(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
     
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarLogin();
        
            if(empty($alertas)) {
               
                
                // Verificar quel el usuario exista
                $usuario = Usuario::where('email', $usuario->email);
                if(!$usuario) {
               
                    Usuario::setAlerta('error', 'El Usuario No Existe o no esta confirmado');
                } else {
                    // El Usuario existe
                   $aux =  hash('sha256', $_POST['password']);
                   $aux2= $usuario->password;
                        
                    if($aux == $aux2) {
                  
                        // Iniciar la sesión
                        session_start();    
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;
                        
                        
                        // Redireccionar
                        header('Location: /UpTask_MVC/public/index.php/panel');
                    } else {
                        Usuario::setAlerta('error', 'Password Incorrecto');
                    }
                }
            }
        }
        $alertas = Usuario::getAlertas();
        // Render a la vista 
        $router->render('auth/login', [
            'titulo' => 'Iniciar Sesión',
            'alertas' => $alertas
        ]);
    }
    public static function logout() {
        session_start();
        $_SESSION = [];
        header('Location: /');
    }



    public static function crear(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $alertas = [];
        $usuario = new Usuario;

        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Leer imagen
            if(!empty($_FILES['imagen']['tmp_name'])) {
          
            $carpeta_imagenes = '../public/img/speakers';
           // Crear la carpeta si no existe
            if(!is_dir($carpeta_imagenes)) {
                 mkdir($carpeta_imagenes, 0755, true);
              }
                
            $image =  base64_encode(file_get_contents($_FILES['imagen']['tmp_name']));
              // Generar el Token
        
             $_POST['imagen'] = $image;
          
         } 
       
            
            $usuario->sincronizar($_POST);
           
            $alertas = $usuario->validarNuevaCuenta();

            if(empty($alertas)) {
            
                $existeUsuario = Usuario::where('email', $usuario->email);

                if($existeUsuario) {
                    Usuario::setAlerta('error', 'El Usuario ya esta registrado');
                    $alertas = Usuario::getAlertas();
                } else {
                    $usuario->crearToken();
                    // Hashear el password
                    $usuario->hashPassword();

                    // Eliminar password2
                    unset($usuario->password2);

   
             
                    // Crear un nuevo usuario
                    $resultado =  $usuario->guardar();

                 

                    if($resultado) {
                        header('Location: mensaje');
                    }
                }
            }
        }
           // Render a la vista
           $router->render('auth/crear', [
            'titulo' => 'Crea tu cuenta en UPV', 
            'usuario' => $usuario, 
            'alertas' => $alertas
        ]);
    }

    public static function restablecer() {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        
        echo ("echo desde restablecer");
        if($_SERVER['REQUEST_METHOD'] === 'POST' ){
            
        }
    }

    public static function reestablecer(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        $token = s($_GET['token']);
        $mostrar = true;

        if(!$token) header('Location: /');

        // Identificar el usuario con este token
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)) {
            Usuario::setAlerta('error', 'Token No Válido');
            $mostrar = false;
        }


        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Añadir el nuevo password
            $usuario->sincronizar($_POST);

            // Validar el password
            $alertas = $usuario->validarPassword();

            if(empty($alertas)) {
                // Hashear el nuevo password
                $usuario->hashPassword();

                // Eliminar el Token
                $usuario->token = null;

                // Guardar el usuario en la BD
                $resultado = $usuario->guardar();

                // Redireccionar
                if($resultado) {
                    header('Location: /');
                }
            }
        }

        $alertas = Usuario::getAlertas();
        // Muestra la vista
        $router->render('auth/reestablecer', [
            'titulo' => 'Reestablecer Password',
            'alertas' => $alertas,
            'mostrar' => $mostrar
        ]);
    }


    public static function mensaje(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        $router->render('auth/confirmar', [
            'titulo' => 'Cuenta Creada Exitosamente'
        ]);
    }
    public static function confirmar(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        
        $token = s($_GET['token']);

        if(!$token) header('Location: /');

        // Encontrar al usuario con este token
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)) {
            // No se encontró un usuario con ese token
            Usuario::setAlerta('error', 'Token No Válido');
        } else {
            // Confirmar la cuenta
            $usuario->confirmado = 1;
            $usuario->token = null;
            unset($usuario->password2);
            
            // Guardar en la BD
            $usuario->guardar();

            Usuario::setAlerta('exito', 'Cuenta Comprobada Correctamente');
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/confirmar', [
            'titulo' => 'Confirma tu cuenta UpTask',
            'alertas' => $alertas
        ]);
    }
    public static function olvide(Router $router) {
<<<<<<< HEAD
=======
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $alertas = [];
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarEmail();

            if(empty($alertas)) {
                // Buscar el usuario
                $usuario = Usuario::where('email', $usuario->email);

                if($usuario) {

                    // Generar un nuevo token
                    $usuario->crearToken();
                    unset($usuario->password2);

                    // Actualizar el usuario
                    $usuario->guardar();

                    // Enviar el email
                    $email = new Email( $usuario->email, $usuario->nombre, $usuario->token );
                    $email->enviarInstrucciones();


                    // Imprimir la alerta
                    Usuario::setAlerta('exito', 'Hemos enviado las instrucciones a tu email');
                } else {
                    Usuario::setAlerta('error', 'El Usuario no existe o no esta confirmado');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        // Muestra la vista
        $router->render('auth/olvide', [
            'titulo' => 'Olvide mi Password',
            'alertas' => $alertas
        ]);
    }

    
}