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
<<<<<<< HEAD

class DashboardController {
    public static function index(Router $router) {
        session_start();
        isAuth();
        
=======
use Model\Relaciones_Asignatura;
require_once __DIR__ . '/../helper/language_helper.php'; // Incluir el helper de idioma

class DashboardController {

    private static function loadLanguage() {
        // Start the session if it hasn't been started yet
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

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

    //Carga el panel de los grados registrados
    public static function index(Router $router) {
        session_start();
        isAuth();
        $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $cursos = [];
        $id = $_SESSION['id'];
        $cursos = curso::all();
        
        $router->render('dashboard/index', [
<<<<<<< HEAD
            'titulo' => 'Cursos','cursos' => $cursos

        ]);
    }

=======
            'titulo' => __('panel_grados', $lang),
            'nuevo_curso' => __('nuevo_grado', $lang),
            'cursos' => $cursos

        ]);
    }
/*
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
<<<<<<< HEAD
=======
        */
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

    public static function curso(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
<<<<<<< HEAD
    
=======
     // Cargar el idioma
     $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        // Verificar que la persona que visita el proyecto es quien lo creó
        $curso = Curso::where('id', $token);
    
        
    
        // Obtener los años y tags asociados al curso
        $anos = AnoCurso::getAnos('idCurso', $token);
        $tags = Tags::obtenerTags('cursoID', $token);
    
        // Renderizar la vista con los datos necesarios
        $router->render('dashboard/proyecto', [
<<<<<<< HEAD
            'titulo' => $curso->nombreCurso,
            'anos' => $anos,
            'tags' => $tags
        ]);
=======
           
                'titulo' => $curso->nombreCurso,
                'anos' => $anos,
                'tags' => $tags,
                'lang' => $lang,
                'curso_id' => $curso->id, // Asegúrate de pasar la id del curso
                'agregar_curso' => __('agregar_curso', $lang),
                'editar_tags' => __('editar_tags', $lang),
                'eliminar_curso' => __('eliminar_curso', $lang),
                'no_hay_cursos' => __('no_hay_cursos', $lang),
                'comienza_creando_uno' => __('comienza_creando_uno', $lang),
                'no_hay_asignaturas' => __('no_hay_asignaturas', $lang),
                'modificar_relaciones' => __('modificar_relaciones', $lang),
                'eliminar' => __('eliminar', $lang),
                'agregar_nuevo_ano' => __('agregar_nuevo_ano', $lang),
                'seleccionar_ano' => __('seleccionar_ano', $lang),
                'especialidad' => __('especialidad', $lang),
                'crear_curso' => __('crear_curso', $lang),
                'cancelar' => __('cancelar', $lang),
                'agregar_tag' => __('agregar_tag', $lang),
                'escribe_tag' => __('escribe_tag', $lang),
                'añadir_tags' => __('añadir_tags', $lang),
                'eliminar_semestre' => __('eliminar_semestre',$lang),
            ]);
      
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    }
    

    public static function anocurso(Router $router) {
        session_start();
        isAuth();
        $token = $_GET['id'];
        
<<<<<<< HEAD
        // Revisar que la persona que visita el curso, es quien lo creo
     $curso = AnoCurso::where('id', $token);
    

        $nombre = $curso-> numero . ' '. $curso->descripcion;
        $router->render('dashboard/anocurso', [
            'titulo' => $nombre,'ano' => $curso
        ]);
    }

=======
        // Cargar el idioma
        $lang = self::loadLanguage();
        
        // Revisar que la persona que visita el curso, es quien lo creo
        $curso = AnoCurso::where('id', $token);
    
        // Obtener el nombre del curso con traducción
        $nombre = $curso->numero . ' ' . $curso->descripcion;
    
        // Traducciones
        $titulo = __('titulo_curso', $lang); // Asegúrate de tener 'titulo_curso' en tus archivos de traducción
       // Traducciones
    // Traducciones
    $translations = [
        'nueva_asignatura' => __('nueva_asignatura', $lang),
        'eliminar_semestre' => __('eliminar_semestre', $lang),
        'primer_cuatrimestre' => __('primer_cuatrimestre', $lang),
        'segundo_cuatrimestre' => __('segundo_cuatrimestre', $lang),
        'confirmar_eliminar_semestre' => __('confirmar_eliminar_semestre', $lang),
        'confirmar' => __('confirmar', $lang),
        'cancelar' => __('cancelar', $lang),
        'modificar_relaciones' => __('modificar_relaciones', $lang),
        'eliminar' => __('eliminar', $lang),
        'editar_asignatura' => __('editar_asignatura', $lang),
        'asignatura' => __('asignatura', $lang),
        'siglas' => __('siglas', $lang),
        'semestre' => __('semestre', $lang),
        'descripcion' => __('descripcion', $lang),
        'contenido' => __('contenido', $lang),
        'guardar_cambios' => __('guardar_cambios', $lang),
        'nombre_asignatura_obligatorio' => __('nombre_asignatura_obligatorio', $lang),
        'descripcion_obligatoria' => __('descripcion_obligatoria', $lang),
        'url_vacia' => __('url_vacia', $lang),
        'confirmar_eliminar_asignatura' => __('confirmar_eliminar_asignatura', $lang),
        'no_hay_asignaturas' => __('no_hay_asignaturas', $lang)
    ];
    $router->render('dashboard/anocurso', [
        'titulo' => $nombre,
        'ano' => $curso,
        'translations' => $translations,
        'curso_id' => $curso->id // Asegúrate de pasar el id del curso
    ]);
    }
    
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

    
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

<<<<<<< HEAD
    
    public static function crear_curso(Router $router) {
        session_start();
        isAuth();
=======
    //Formulario de crear curso
    public static function crear_curso(Router $router) {
        session_start();
        isAuth();
         // Cargar el idioma
         $lang = self::loadLanguage();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
<<<<<<< HEAD
=======
                   
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                  header("Location: //localhost/UpTask_MVC/public/index.php/panel/curso?id={$resultadoCurso['id']}");

               
                  
                    $router->render('dashboard/proyecto', [
<<<<<<< HEAD
                        'titulo' => $curso->nombreCurso,'anos' => $resultado2 
                    ]);

                }else{
                    $router->render('dashboard/proyecto', [
                        'titulo' => $curso->nombreCurso,'anos' => []
=======
                        'titulo' => $curso->nombreCurso,'anos' => $resultado2 ,
                        'lang' => $lang,
                        'curso_id' => $curso->id, // Asegúrate de pasar la id del curso
                        'agregar_curso' => __('agregar_curso', $lang),
                        'editar_tags' => __('editar_tags', $lang),
                        'eliminar_curso' => __('eliminar_curso', $lang),
                        'no_hay_cursos' => __('no_hay_cursos', $lang),
                        'comienza_creando_uno' => __('comienza_creando_uno', $lang),
                        'no_hay_asignaturas' => __('no_hay_asignaturas', $lang),
                        'modificar_relaciones' => __('modificar_relaciones', $lang),
                        'eliminar' => __('eliminar', $lang),
                        'agregar_nuevo_ano' => __('agregar_nuevo_ano', $lang),
                        'seleccionar_ano' => __('seleccionar_ano', $lang),
                        'especialidad' => __('especialidad', $lang),
                        'crear_curso' => __('crear_curso', $lang),
                        'cancelar' => __('cancelar', $lang),
                        'agregar_tag' => __('agregar_tag', $lang),
                        'escribe_tag' => __('escribe_tag', $lang),
                        'añadir_tags' => __('añadir_tags', $lang)
                    ]);

                }else{
                    header("Location: //localhost/UpTask_MVC/public/index.php/panel/curso?id={$resultadoCurso['id']}");

                    $router->render('dashboard/proyecto', [
                        'titulo' => $curso->nombreCurso,'anos' => [],
                        'lang' => $lang,
                        'curso_id' => $curso->id, // Asegúrate de pasar la id del curso
                        'agregar_curso' => __('agregar_curso', $lang),
                        'editar_tags' => __('editar_tags', $lang),
                        'eliminar_curso' => __('eliminar_curso', $lang),
                        'no_hay_cursos' => __('no_hay_cursos', $lang),
                        'comienza_creando_uno' => __('comienza_creando_uno', $lang),
                        'no_hay_asignaturas' => __('no_hay_asignaturas', $lang),
                        'modificar_relaciones' => __('modificar_relaciones', $lang),
                        'eliminar' => __('eliminar', $lang),
                        'agregar_nuevo_ano' => __('agregar_nuevo_ano', $lang),
                        'seleccionar_ano' => __('seleccionar_ano', $lang),
                        'especialidad' => __('especialidad', $lang),
                        'crear_curso' => __('crear_curso', $lang),
                        'cancelar' => __('cancelar', $lang),
                        'agregar_tag' => __('agregar_tag', $lang),
                        'escribe_tag' => __('escribe_tag', $lang),
                        'añadir_tags' => __('añadir_tags', $lang)
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                    ]);
                }
                }
            }
        }
  
       
   
      
        $router->render('dashboard/crear-curso', [
            'alertas' => $alertas,
<<<<<<< HEAD
            'titulo' => 'Crear Curso'
=======
            'titulo' => __('create_course', $lang),
            'nombre_curso_label' => __('nombre_curso', $lang),
            'nombre_curso_placeholder' => __('nombre_placeholder', $lang),
            'universidad_curso_label' => __('universidad_curso', $lang),
            'universidad_curso_placeholder' => __('universidad_placeholder', $lang),
            'agregar_curso' => __('agregar_curso', $lang),
            'modal_legend' => __('modal_legend', $lang),
            'modal_ano_label' => __('modal_ano_label', $lang),
            'modal_especialidad_label' => __('modal_especialidad_label', $lang),
            'modal_crear_curso' => __('modal_crear_curso', $lang),
            'modal_cancelar' => __('modal_cancelar', $lang),
            'lang' => $lang
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        ]);
    }

    public static function crear_asignatura(Router $router) {
<<<<<<< HEAD
=======
        
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        session_start();
        isAuth();
        $alertas = [];
        $tags = [];
<<<<<<< HEAD
=======
        $Tags_Asignatura = [];
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        if($_SERVER['REQUEST_METHOD'] === 'GET') {

            $token = $_GET['id'];
          $semestre = AnoCurso::where('id', $token);
           
            $tags = Tags::obtenerTags('cursoID', $semestre->idCurso);
            
            
        }
                   
        $asignatura = new Asignatura;
        $asIdiomas = array();
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
<<<<<<< HEAD
           
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
=======
            
            if (empty($_POST['url'])) {
                Asignatura::setAlerta('error', 'El campo URL es obligatorio');
                $alertas = Asignatura::getAlertas();
            } else{
                
            $asignatura->sincronizar($_POST);
            
            $lista =$_POST['lista_tags'];
            $listaCursosArray = json_decode($lista, true);
           

           
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        
            $token = $_POST['cursoID'];
            $lista_idiomas = $_POST['lista_idiomas'];;
            $idiomas = explode(',', $lista_idiomas);
<<<<<<< HEAD
=======
            
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
<<<<<<< HEAD
                    if($asig->cursoID == $token){
                        Asignatura_idiomas::setAlerta('error', 'Ya ha una asignatura registrada con este nombre');
                        $alertas = Asignatura_idiomas::getAlertas();
=======
                    
                    if ($asig !== null && $asig->cursoID == $token) {
                        Asignatura_idiomas::setAlerta('error', 'Ya hay una asignatura registrada con este nombre');
                        $alertas = Asignatura_idiomas::getAlertas();
                       
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                        break;
                    }
                  
                 }
                   
                 
                }
                  if(empty($alertas)) {
                                $resultado=  $asignatura->guardar();
<<<<<<< HEAD
=======
                                if (!empty($listaCursosArray)) {
                                    foreach ($listaCursosArray as $tag) {
                                        $aux = new Tags_Asignatura();
                                        $valor = $tag['id'];
                                      
                                   
                                        $aux->idTag = $valor;
                                       
                                        $aux->idAsignatura = $resultado["id"];
                                      
                                        $aux->guardarsinId();
                                    }
                                }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                               
                                foreach ($asIdiomas as $asIdioma) {
                                        $asIdioma->sincronizarId($resultado["id"]);
                                        $asIdioma->guardar();

                                    }
<<<<<<< HEAD


=======
                                    $curso = AnoCurso::where('id', $token);
                                  
                                     $nombre = $curso-> numero . ' '. $curso->descripcion;
                                     $lang = self::loadLanguage();
                                     $titulo = __('titulo_curso', $lang);
                                     $translations = [
                                        'nueva_asignatura' => __('nueva_asignatura', $lang),
                                        'eliminar_semestre' => __('eliminar_semestre', $lang),
                                        'primer_cuatrimestre' => __('primer_cuatrimestre', $lang),
                                        'segundo_cuatrimestre' => __('segundo_cuatrimestre', $lang),
                                        'confirmar_eliminar_semestre' => __('confirmar_eliminar_semestre', $lang),
                                        'confirmar' => __('confirmar', $lang),
                                        'cancelar' => __('cancelar', $lang),
                                        'modificar_relaciones' => __('modificar_relaciones', $lang),
                                        'eliminar' => __('eliminar', $lang),
                                        'editar_asignatura' => __('editar_asignatura', $lang),
                                        'asignatura' => __('asignatura', $lang),
                                        'siglas' => __('siglas', $lang),
                                        'semestre' => __('semestre', $lang),
                                        'descripcion' => __('descripcion', $lang),
                                        'contenido' => __('contenido', $lang),
                                        'guardar_cambios' => __('guardar_cambios', $lang),
                                        'nombre_asignatura_obligatorio' => __('nombre_asignatura_obligatorio', $lang),
                                        'descripcion_obligatoria' => __('descripcion_obligatoria', $lang),
                                        'url_vacia' => __('url_vacia', $lang),
                                        'confirmar_eliminar_asignatura' => __('confirmar_eliminar_asignatura', $lang),
                                        'no_hay_asignaturas' => __('no_hay_asignaturas', $lang)
                                    ];
                                    $router->render('dashboard/anocurso', [
                                        'titulo' => $nombre,
                                        'ano' => $curso,
                                        'translations' => $translations,
                                        'curso_id' => $curso->id ,
                                        
                                    ]);
                                   
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                        }

                  
            } else {
                Asignatura_idiomas::setAlerta('error', 'No se ha seleccionado ningun idioma');
                $alertas = Asignatura_idiomas::getAlertas();
            }
<<<<<<< HEAD
=======
        }
        
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

        }
           
           
     


        

       
              
        $router->render('dashboard/crear-asignatura', [
            'alertas' => $alertas,
            'titulo' => 'Crear Asignatura',
            'asignatura'=>$asignatura,
            'informacion'=>$asIdiomas,
            'editar'=> false,
<<<<<<< HEAD
=======
            'tags_asignatura' => $Tags_Asignatura,
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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
<<<<<<< HEAD
=======
           
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            $asignatura =  Asignatura::where('id',$asignaturaid);
         
            $Tags_Asignatura = Tags_Asignatura::obtenerTags('idAsignatura', $asignaturaid);
            
<<<<<<< HEAD
           
            $tags = Tags::obtenerTags('cursoID', $semestre->idCursos);
=======

            $tags = Tags::obtenerTags('cursoID', $semestre->idCurso);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
             
            $asIdiomas = Asignatura_idiomas::obtenerAsignaturas('idasignatura', $asignaturaid);
            
        }
                   
       
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
<<<<<<< HEAD
=======
            
            if (empty($_POST['url'])) {
                Asignatura::setAlerta('error', 'El campo URL es obligatorio');
                $alertas = Asignatura::getAlertas();
            } else{

         
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
           
            $asignatura->sincronizar($_POST);
                $asignatura-> id = $_POST['idas'];
            $asignatura-> actualizar();
            Tags_Asignatura::eliminarTarea($_POST['idas']);
<<<<<<< HEAD
            $lista =$_POST['lista_cursos2'];
            $listaCursosArray = json_decode($lista, true);



=======
            $lista =$_POST['lista_tags'];
            $listaCursosArray = json_decode($lista, true);

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            if (!empty($listaCursosArray)) {
                foreach ($listaCursosArray as $tag) {
                    $aux = new Tags_Asignatura();
                    $aux->idTag = $tag['id'];
                    $aux->idAsignatura = $_POST['idas'];
<<<<<<< HEAD
                    $aux->guardar();
=======
                    $aux->guardarsinId();
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                }
            }
           


           $res  =  Asignatura_idiomas::eliminarAsignaturas('idasignatura', $asignatura-> id );
            $token = $_POST['cursoID'];
            $lista_idiomas = $_POST['lista_idiomas'];;
            $idiomas = explode(',', $lista_idiomas);
<<<<<<< HEAD
=======
            $idiomas = array_map('trim', explode(',', $lista_idiomas));
           
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            if (!empty($idiomas)) {
                foreach ($idiomas as $idioma) {
                    $asIdioma = new Asignatura_idiomas;
                    $asIdioma -> sincronizarIdioma($_POST,$idioma);
                    $asIdiomas[] = $asIdioma;
                    $alertas = $asIdioma->validarIdioma();
                    
<<<<<<< HEAD
                    if(!empty($alertas)) {
                    break;
=======
                    
                    if(!empty($alertas)) {
                  
                    break;
                    }else{
                       
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                    }
                    $existeUsuario = Asignatura_idiomas::where('nombre', $asIdioma->nombre);
                 if($existeUsuario){
                   
                    $asig = Asignatura::where('id',$existeUsuario->idasignatura);
                    if($asig)
<<<<<<< HEAD
=======
                    
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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

<<<<<<< HEAD

=======
                                    $curso = AnoCurso::where('id', $token);
                                  
                                    $nombre = $curso-> numero . ' '. $curso->descripcion;
                                     $lang = self::loadLanguage();
                                     $titulo = __('titulo_curso', $lang);
                                    $translations = [
                                        'nueva_asignatura' => __('nueva_asignatura', $lang),
                                        'eliminar_semestre' => __('eliminar_semestre', $lang),
                                        'primer_cuatrimestre' => __('primer_cuatrimestre', $lang),
                                        'segundo_cuatrimestre' => __('segundo_cuatrimestre', $lang),
                                        'confirmar_eliminar_semestre' => __('confirmar_eliminar_semestre', $lang),
                                        'confirmar' => __('confirmar', $lang),
                                        'cancelar' => __('cancelar', $lang),
                                        'modificar_relaciones' => __('modificar_relaciones', $lang),
                                        'eliminar' => __('eliminar', $lang),
                                        'editar_asignatura' => __('editar_asignatura', $lang),
                                        'asignatura' => __('asignatura', $lang),
                                        'siglas' => __('siglas', $lang),
                                        'semestre' => __('semestre', $lang),
                                        'descripcion' => __('descripcion', $lang),
                                        'contenido' => __('contenido', $lang),
                                        'guardar_cambios' => __('guardar_cambios', $lang),
                                        'nombre_asignatura_obligatorio' => __('nombre_asignatura_obligatorio', $lang),
                                        'descripcion_obligatoria' => __('descripcion_obligatoria', $lang),
                                        'url_vacia' => __('url_vacia', $lang),
                                        'confirmar_eliminar_asignatura' => __('confirmar_eliminar_asignatura', $lang),
                                        'no_hay_asignaturas' => __('no_hay_asignaturas', $lang)
                                    ];
                                    
                                    $router->render('dashboard/anocurso', [
                                        'titulo' => $nombre,
                                        'ano' => $curso,
                                        'translations' => $translations,
                                        'curso_id' => $curso->id ,
                                        
                                    ]);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                        }

                        
       

            } else {
                Asignatura_idiomas::setAlerta('error', 'No se ha seleccionado ningun idioma');
                $alertas = Asignatura_idiomas::getAlertas();
            }

        }
           
           
<<<<<<< HEAD
     
=======
    }
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

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
<<<<<<< HEAD
        $asig =$_GET['as'];
        $asignatura = Asignatura::where('id', $asig);
=======
        $asig = $_GET['as'];
        $asignatura = Asignatura::where('id', $asig);
        $aux6 =  $asignatura;
        $idiomasActual = Asignatura_idiomas::obtenerAsignaturas('idasignatura', $asig) ;
        $aux6 -> actualizarInfo($idiomasActual);
       
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $curso = AnoCurso::where('id',$asignatura->cursoID);
        $idcurso = $curso -> idCurso;     
        //$ano = AnoCurso::where('id', $asignatura->cursoID);
       // $anos = AnoCurso::getAnos('idCurso', $ano->idCurso);  
<<<<<<< HEAD
       $anos = AnoCurso::all();    
        $asignaturas = Asignatura::obtenerAsignaturasRelacion($asig,$filtro,$idcurso);

        foreach($asignaturas as &$asignatura){
         
          
=======
       $anos = AnoCurso::getAnos('idCurso', $idcurso);    
        $asignaturas = Asignatura::obtenerAsignaturasRelacion($asig,$filtro,$idcurso);
     
        foreach($asignaturas as &$asignatura){
         
          $asignatura -> relaciones = Relaciones_Asignatura::obtenerAsignaturas( $asignatura->id,$asig);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            $informacion = Asignatura_idiomas::obtenerAsignaturas('idasignatura',$asignatura->id);
            if (!empty($informacion)) {
                $asignatura->actualizarInfo($informacion);
            }
      
        }
 
        $resultado = [
            'resultado' => $asignaturas,
            'anos' => $anos,
<<<<<<< HEAD
=======
            'actualasignatura'=>   $aux6,
            'curso'=> $curso,
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            'asignaturas' => 'Asignaturas',
            'tipo' => 'exito'
        ];
        
        echo json_encode($resultado);
              
       
    }



}