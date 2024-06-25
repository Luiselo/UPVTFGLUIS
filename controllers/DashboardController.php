<?php

namespace Controllers;

use Model\AnoCurso;
use Model\Asignatura;
use Model\Curso;
use Model\Tags;
use MVC\Router;
use Model\Usuario;
use Model\Proyecto;
use Model\Asignatura_idiomas;
use Model\Tags_Asignatura;

class DashboardController {
    public static function index(Router $router) {
        session_start();
        isAuth();
        
        $cursos = [];
        $id = $_SESSION['id'];
        $cursos = curso::all();
        
        $router->render('dashboard/index', [
            'titulo' => 'Cursos','cursos' => $cursos

        ]);
    }

    public static function crear_anocurso(Router $router) {
        session_start();
        isAuth();
   
        $alertas = [];
        


        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $curso = new AnoCurso($_POST);

            // validación
            $alertas = $curso->validarCurso();

            if(empty($alertas)) {
                // Generar una URL única 
        

                // Redireccionar
                header('Location: /proyecto?id=' . $proyecto->url);

            }
        }


        $router->render('dashboard/crear-proyecto', [
            'alertas' => $alertas,
            'titulo' => 'Crear Proyecto',
            'usuarios' => $usuarios
        ]);
    }

    public static function curso(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
    
        // Verificar que la persona que visita el proyecto es quien lo creó
        $curso = Curso::where('id', $token);
    
        
    
        // Obtener los años y tags asociados al curso
        $anos = AnoCurso::getAnos('idCurso', $token);
        $tags = Tags::obtenerTags('cursoID', $token);
    
        // Renderizar la vista con los datos necesarios
        $router->render('dashboard/proyecto', [
            'titulo' => $curso->nombreCurso,
            'anos' => $anos,
            'tags' => $tags
        ]);
    }
    

    public static function anocurso(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
        
        // Revisar que la persona que visita el curso, es quien lo creo
     $curso = AnoCurso::where('id', $token);
    

        $nombre = $curso-> numero . ' '. $curso->descripcion;
        $router->render('dashboard/anocurso', [
            'titulo' => $nombre,'ano' => $curso
        ]);
    }


    
    public static function relaciones(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
        $asignatura = Asignatura::where('id', $token);
        $ano = AnoCurso::where('id', $asignatura->cursoID);
        $anos = AnoCurso::getAnos('idCurso', $ano->idCurso);        
        $router->render('dashboard/relaciones', [
            'titulo' => $asignatura->asignatura,'anos' => $anos,'asignatura' => $asignatura, 'curso' => $ano
        ]);
    }

    public static function graficoAdmin(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
        $curso = Curso::where('id',35);
        $anos = AnoCurso::getAnos('idCurso', 35); 
       
              
        $router->render('dashboard/graficoAdmin', [
            'titulo' =>  $curso->nombreCurso." ".$curso->universidadCurso,'anos' => $anos
        ]);
    }

    
    public static function crear_curso(Router $router) {
        session_start();
        isAuth();
        $alertas = [];
     
       
        $curso = new Curso;
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
   
            $curso->sincronizar($_POST);
            $listaCurso= $_POST["lista_cursos"];
            $alertas = $curso->validarCurso();

            
            if(empty($alertas)) {
        
                $existeUsuario = Curso::where2('nombreCurso',$curso->nombreCurso,'universidadCurso',$curso->universidadCurso);
                 if($existeUsuario) {
                    Curso::setAlerta('error', 'El Curso ya esta registrado');
                    $alertas = Curso::getAlertas();
                } else {
                    
                    $resultadoCurso =  $curso->guardar();   
                    
  
                    $aux = explode(',',$listaCurso);

                    if($listaCurso != ""){

                       
                
                    foreach ($aux as $ano) {
                        $aux = explode(' ',$ano,2);
                        $ano = new AnoCurso();
                        $ano -> actualizarCurso($resultadoCurso["id"],$aux[0],$aux[1]);
                        $resultado = $ano -> guardar();
                      

                    }
                    $resultado2 = AnoCurso::getAnos('idCurso',$resultadoCurso["id"]);
                  header("Location: //localhost/UpTask_MVC/public/index.php/panel/curso?id={$resultadoCurso['id']}");

               
                  
                    $router->render('dashboard/proyecto', [
                        'titulo' => $curso->nombreCurso,'anos' => $resultado2 
                    ]);

                }else{
                    $router->render('dashboard/proyecto', [
                        'titulo' => $curso->nombreCurso,'anos' => []
                    ]);
                }
                }
            }
        }
  
       
   
      
        $router->render('dashboard/crear-curso', [
            'alertas' => $alertas,
            'titulo' => 'Crear Curso'
        ]);
    }

    public static function crear_asignatura(Router $router) {
        session_start();
        isAuth();
        $alertas = [];
        $tags = [];
        if($_SERVER['REQUEST_METHOD'] === 'GET') {

            $token = $_GET['id'];
          $semestre = AnoCurso::where('id', $token);
           
            $tags = Tags::obtenerTags('cursoID', $semestre->idCurso);
            
            
        }
                   
        $asignatura = new Asignatura;
        $asIdiomas = array();
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
           
            $asignatura->sincronizar($_POST);
            $lista =$_POST['lista_cursos2'];
            $listaCursosArray = json_decode($lista, true);
           

            if (!empty($listaCursosArray)) {
                foreach ($listaCursosArray as $tag) {
                    $aux = new Tags_Asignatura();
                    $aux->idTag = $tag['id'];
                    $aux->idAsignatura = $_POST['idas'];
                    $aux->guardar();
                }
            }
        
            $token = $_POST['cursoID'];
            $lista_idiomas = $_POST['lista_idiomas'];;
            $idiomas = explode(',', $lista_idiomas);
            if (!empty($idiomas)) {
                foreach ($idiomas as $idioma) {
                    $asIdioma = new Asignatura_idiomas;
                    $asIdioma -> sincronizarIdioma($_POST,$idioma);
                    $asIdiomas[] = $asIdioma;
                    $alertas = $asIdioma->validarIdioma();
                    
                    if(!empty($alertas)) {
                    break;
                    }
                    $existeUsuario = Asignatura_idiomas::where('nombre', $asIdioma->nombre);
                 if($existeUsuario){
                    $asig = Asignatura::where('id',$existeUsuario->idasignatura);
                    if($asig->cursoID == $token){
                        Asignatura_idiomas::setAlerta('error', 'Ya ha una asignatura registrada con este nombre');
                        $alertas = Asignatura_idiomas::getAlertas();
                        break;
                    }
                  
                 }
                   
                 
                }
                  if(empty($alertas)) {
                                $resultado=  $asignatura->guardar();
                               
                                foreach ($asIdiomas as $asIdioma) {
                                        $asIdioma->sincronizarId($resultado["id"]);
                                        $asIdioma->guardar();

                                    }


                        }

                  
            } else {
                Asignatura_idiomas::setAlerta('error', 'No se ha seleccionado ningun idioma');
                $alertas = Asignatura_idiomas::getAlertas();
            }

        }
           
           
     


        

       
              
        $router->render('dashboard/crear-asignatura', [
            'alertas' => $alertas,
            'titulo' => 'Crear Asignatura',
            'asignatura'=>$asignatura,
            'informacion'=>$asIdiomas,
            'editar'=> false,
            'cursoID' =>$token,
            'tags' =>$tags
        ]);
    }




    public static function editar_asignatura(Router $router) {
        
        session_start();
        isAuth();
        $alertas = [];
        $asignatura = new Asignatura;
        $asIdiomas = array();
        $Tags_Asignatura = [];
        $tags = [];
       
        if($_SERVER['REQUEST_METHOD'] === 'GET') {

            $token = $_GET['id'];
            $asignaturaid = $_GET['idAsignatura'];
            $semestre = AnoCurso::where('id', $token);
            $asignatura =  Asignatura::where('id',$asignaturaid);
         
            $Tags_Asignatura = Tags_Asignatura::obtenerTags('idAsignatura', $asignaturaid);
            
           
            $tags = Tags::obtenerTags('cursoID', $semestre->idCursos);
             
            $asIdiomas = Asignatura_idiomas::obtenerAsignaturas('idasignatura', $asignaturaid);
            
        }
                   
       
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
           
            $asignatura->sincronizar($_POST);
                $asignatura-> id = $_POST['idas'];
            $asignatura-> actualizar();
            Tags_Asignatura::eliminarTarea($_POST['idas']);
            $lista =$_POST['lista_cursos2'];
            $listaCursosArray = json_decode($lista, true);



            if (!empty($listaCursosArray)) {
                foreach ($listaCursosArray as $tag) {
                    $aux = new Tags_Asignatura();
                    $aux->idTag = $tag['id'];
                    $aux->idAsignatura = $_POST['idas'];
                    $aux->guardar();
                }
            }
           


           $res  =  Asignatura_idiomas::eliminarAsignaturas('idasignatura', $asignatura-> id );
            $token = $_POST['cursoID'];
            $lista_idiomas = $_POST['lista_idiomas'];;
            $idiomas = explode(',', $lista_idiomas);
            if (!empty($idiomas)) {
                foreach ($idiomas as $idioma) {
                    $asIdioma = new Asignatura_idiomas;
                    $asIdioma -> sincronizarIdioma($_POST,$idioma);
                    $asIdiomas[] = $asIdioma;
                    $alertas = $asIdioma->validarIdioma();
                    
                    if(!empty($alertas)) {
                    break;
                    }
                    $existeUsuario = Asignatura_idiomas::where('nombre', $asIdioma->nombre);
                 if($existeUsuario){
                   
                    $asig = Asignatura::where('id',$existeUsuario->idasignatura);
                    if($asig)
                    if($asig->cursoID == $token){
                        Asignatura_idiomas::setAlerta('error', 'Ya ha una asignatura registrada con este nombre');
                        $alertas = Asignatura_idiomas::getAlertas();
                        break;
                    }
                  
                 }
                   
                 
                }

                           if(empty($alertas)) {
                                
                               
                                foreach ($asIdiomas as $asIdioma) {
                                        $asIdioma->sincronizarId($_POST['idas']);
                                        $asIdioma->guardar();

                                    }


                        }

                        
       

            } else {
                Asignatura_idiomas::setAlerta('error', 'No se ha seleccionado ningun idioma');
                $alertas = Asignatura_idiomas::getAlertas();
            }

        }
           
           
     

//AÑADIR TAGS IDIOMA,TAGS GENERAL EN CREAR TAMBIEN HAY UN EDITAR Y YA ESTA SINMAS Y DE AHI COMO LA ANTERIOR APP
        
  
       

        $router->render('dashboard/crear-asignatura', [
            'alertas' => $alertas,
            'titulo' => 'Editar Asignatura',
            'asignatura'=>$asignatura,
            'informacion'=>$asIdiomas,
            'editar'=> true,   
           'tags_asignatura' => $Tags_Asignatura,
           'tags' =>  $tags,
            'cursoID' =>$token
        ]);
    }


    public static function proyecto(Router $router) {
        session_start();
        isAuth();

        $token = $_GET['id'];
        if(!$token) header('Location: /panel');
        // Revisar que la persona que visita el proyecto, es quien lo creo
        $proyecto = Proyecto::where('url', $token);
        if($proyecto->propietarioId !== $_SESSION['id']) {
            header('Location: /panel');
        }

        $router->render('dashboard/proyecto', [
            'titulo' => $proyecto->proyecto
        ]);
    }

    public static function perfil(Router $router) {
        session_start();
        isAuth();
        $alertas = [];

        $usuario = Usuario::find($_SESSION['id']);

        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST);

            $alertas = $usuario->validar_perfil();

            if(empty($alertas)) {

                $existeUsuario = Usuario::where('email', $usuario->email);

                if($existeUsuario && $existeUsuario->id !== $usuario->id ) {
                    // Mensaje de error
                    Usuario::setAlerta('error', 'Email no válido, ya pertenece a otra cuenta');
                    $alertas = $usuario->getAlertas();
                } else {
                    // Guardar el registro
                    $usuario->guardar();

                    Usuario::setAlerta('exito', 'Guardado Correctamente');
                    $alertas = $usuario->getAlertas();

                    // Asignar el nombre nuevo a la barra
                    $_SESSION['nombre'] = $usuario->nombre;
                }
            }
        }
        
        $router->render('dashboard/perfil', [
            'titulo' => 'Perfil',
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function ver_usuarios(Router $router) {
        session_start();
        isAuth();
        $alertas = [];

        $cursos = [];
        $id = $_SESSION['id'];
        $usuario = usuario::all();
        
        $router->render('dashboard/usuario', [
            'titulo' => 'Vista de usuarios','usuarios' => $usuario, 'alertas' => $alertas

        ]);
    }


    public static function cambiar_password(Router $router) {
        session_start();
        isAuth();

        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = Usuario::find($_SESSION['id']);

            // Sincronizar con los datos del usuario
            $usuario->sincronizar($_POST);

            $alertas = $usuario->nuevo_password();

            if(empty($alertas)) {
                $resultado = $usuario->comprobar_password();

                if($resultado) {
                    $usuario->password = $usuario->password_nuevo;

                    // Eliminar propiedades No necesarias
                    unset($usuario->password_actual);
                    unset($usuario->password_nuevo);

                    // Hashear el nuevo password
                    $usuario->hashPassword();

                    // Actualizar
                    $resultado = $usuario->guardar();

                    if($resultado) {
                        Usuario::setAlerta('exito', 'Password Guardado Correctamente');
                        $alertas = $usuario->getAlertas();
                    }
                } else {
                    Usuario::setAlerta('error', 'Password Incorrecto');
                    $alertas = $usuario->getAlertas();
                }
            }
        }
        
        $router->render('panel/cambiar-password', [
            'titulo' => 'Cambiar Password',
            'alertas' => $alertas
         ]);
    }

    public static function relacionesAsignaturas(Router $router) {
      
        session_start();
        isAuth();

        $filtro = $_GET['id'];
        $asig =$_GET['as'];
        $asignatura = Asignatura::where('id', $asig);
        $curso = AnoCurso::where('id',$asignatura->cursoID);
        $idcurso = $curso -> idCurso;     
        //$ano = AnoCurso::where('id', $asignatura->cursoID);
       // $anos = AnoCurso::getAnos('idCurso', $ano->idCurso);  
       $anos = AnoCurso::all();    
        $asignaturas = Asignatura::obtenerAsignaturasRelacion($asig,$filtro,$idcurso);

        foreach($asignaturas as &$asignatura){
         
          
            $informacion = Asignatura_idiomas::obtenerAsignaturas('idasignatura',$asignatura->id);
            if (!empty($informacion)) {
                $asignatura->actualizarInfo($informacion);
            }
      
        }
 
        $resultado = [
            'resultado' => $asignaturas,
            'anos' => $anos,
            'asignaturas' => 'Asignaturas',
            'tipo' => 'exito'
        ];
        
        echo json_encode($resultado);
              
       
    }



}