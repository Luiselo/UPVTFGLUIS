<?php

namespace Controllers;

use Model\Proyecto;
use Model\Tarea;
use Model\Curso;
use Model\AnoCurso;
use Model\Asignatura;
use Model\Asignatura_idiomas;
use Model\Relaciones_Asignatura;
use Model\Tags;
class RelacionesController {
<<<<<<< HEAD
=======


    public static function eliminarRelacion() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
           $id = $_POST['id'];
           $relacion = Relaciones_Asignatura::where('id',$id);
           $relacion -> eliminar();           
        }
           
       
           
        $respuesta = [
                'tipo' => 'Exito',
                'mensaje' => 'La relación ha sido eliminada correctamente.'
            ];
            echo json_encode($respuesta);
            
            
           
            
          
        }
        
    
    

>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
    public static function index() {
        $proyectoId = $_GET['id'];
        $asignaturaId = $_GET['as'];
        $proyecto = AnoCurso::where('id', $proyectoId);
         session_start();

        $group = array();
        $asign = array();
        $i = 0;
        $j = 0;
         $asignaturas = Asignatura::obtenerAsignaturasFiltro('cursoID', $proyecto->id,'id',$asignaturaId);
         $espacio= "";
         foreach($asignaturas as $asignatura){
            $group[$i]=  "{\"key\":\"$asignatura->id\", \"text\":\"$asignatura->asignatura\", \"isGroup\":true,  \"color\":\"0\",\"loc\":\"0 9999\" }";
            $i++;
            $relaciones = Relaciones_Asignatura::obtenerAsignaturas($asignaturaId,$asignatura->id);
 
            if (count($relaciones)>0){
                $espacio = ",";
            }
            
            foreach($relaciones as $relacion){
                $asign[$j]=  "{\"key\":$relacion->id, \"text\":\"$relacion->descripcion\", \"group\":\"$asignatura->id\", \"color\":\"$relacion->color\",\"loc\":\"0 9999\" }";
                $j++;
            }

         }
         $aux  = "{ \"class\": \"go.GraphLinksModel\",\"nodeDataArray\": [" ;
        
        $aux2 = " ],\"linkDataArray\": [ ]}";
        $resultado = $aux. implode(",",$group).$espacio.implode(",",$asign).$aux2;
       
       
         echo json_encode(['resultado' => $resultado]);
    }


    public static function AnadirRelacion() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            session_start();
<<<<<<< HEAD
     
=======
          
            
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
            $relacion = new Relaciones_Asignatura();
            $relacion -> sincronizar($_POST);
       

            $resultado =  $relacion->guardar();

 
            $respuesta = [
                'tipo' => 'exito',
<<<<<<< HEAD
                'id' => $resultado['id'],
=======
          
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
                'mensaje' => 'Relación Asignada Correctamente',
            ];
            echo json_encode($respuesta);
         
<<<<<<< HEAD
            
          
          
            
        }
    }
=======
        }
    }
   
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

public static function inforelaciones(){

    
    $id1 = $_GET['id1'];
    $id2 = $_GET['id2'];
    $asignatura = Asignatura::where('id',$id2);
    $tags = Tags::ObtenerTagsAsignatura($id2);
    $relacion = Relaciones_Asignatura::obtenerAsignaturas($id1, $id2);
   

    $respuesta = [
        'tipo' => 'exito',
        'mensaje' => 'Exito',
        'asignatura' => $asignatura,
        'tags' => $tags,
        'relacion' => $relacion
    ];
        echo json_encode(['respuesta' => $respuesta] );
        return;
}


    public static function obtener() {

        $idUniversidad = $_GET['id'];
        $curso = Curso::where('id',$idUniversidad);
        $anoCursos = AnoCurso::getAnos('idCurso', $idUniversidad);
        
        
        foreach($anoCursos as &$anoCurso){
            $asignaturas = Asignatura::obtenerAsignaturas('cursoID',$anoCurso->id);
            
            foreach($asignaturas as &$asignatura){
         
                $relaciones = Relaciones_Asignatura::obtenerRelacion('id_asignatura1',$asignatura->id);
                $informacion = Asignatura_idiomas::obtenerAsignaturas('idasignatura',$asignatura->id);
                $tags = Tags::ObtenerTagsAsignatura($asignatura->id);
                if (!empty($informacion)) {
                    $asignatura->actualizarInfo($informacion);
                }
                $asignatura -> relaciones = $relaciones;
                $asignatura -> tags = $tags;
            }
            $anoCurso-> asignaturas = $asignaturas;

           


        }
        $curso -> anoCurso =  $anoCursos;

        $respuesta = [
            'tipo' => 'exito',
            'mensaje' => 'Exito',
            'curso' => $curso
        ];
            echo json_encode(['respuesta' => $respuesta] );
            return;
    }




    public static function modificar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar que el proyecto exista
            $idCurso =  $_POST['idCurso'];
            $relaciones =  $_POST['relaciones'];
            $idAsignatura =  $_POST['idAsignatura'];
            
            $myObj = json_decode($relaciones);
            $keys =  $myObj->nodeDataArray;
            $args = [];
            foreach($keys as $key){
                if(!isset($key->isGroup)){
                   
                   $args['id_asignatura1'] = $idAsignatura;
                   $args['id_asignatura2'] = $key->group;
                   $args['descripcion'] = $key-> text;
                   $args['color'] = $key->color;
                 
                  // if($key->key>0){
                    //$args['id'] = $key->key;
                  // }
                   $newRelacion = new Relaciones_Asignatura($args);
                   $newRelacion -> guardar();
                }else{
                    Relaciones_Asignatura::eliminaRelaciones($idAsignatura,$key->key);
                }
                
                

            }
            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => 'Relaciones Creadas Correctamente',
            ];
                echo json_encode(['respuesta' => $respuesta]);
            

        }
    }

    public static function crear() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            session_start();

            $proyectoId = $_POST['proyectoId'];

            $proyecto = Proyecto::where('url', $proyectoId);

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 
            
            // Todo bien, instanciar y crear la tarea
            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;
            $resultado = $tarea->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Tarea Creada Correctamente',
                'proyectoId' => $proyecto->id
            ];
            echo json_encode($respuesta);
        }
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar que el proyecto exista
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 

            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;

            $resultado = $tarea->guardar();
            if($resultado) {
                $respuesta = [
                    'tipo' => 'exito',
                    'id' => $tarea->id,
                    'proyectoId' => $proyecto->id,
                    'mensaje' => 'Actualizado correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }

        }
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Validar que el proyecto exista
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();

            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            } 

            $tarea = new Tarea($_POST);
            $resultado = $tarea->eliminar();


            $resultado = [
                'resultado' => $resultado,
                'mensaje' => 'Eliminado Correctamente',
                'tipo' => 'exito'
            ];
            
            echo json_encode($resultado);
        }
    }



    public static function obtenerAsignaturasRelacion() {

        $idAsignatura1 = $_GET['id1'];
        $idAsignatura2 = $_GET['id2'];
        $asignatura1 = Asignatura::where('id'  , $idAsignatura1);

        
            $informacion = Asignatura_idiomas::obtenerAsignaturas('idasignatura',$idAsignatura1);
            if (!empty($informacion)) {
                $asignatura1->actualizarInfo($informacion);
            }
      
      
        $asignatura2 = Asignatura::where('id' , $idAsignatura2);

        
        $informacion = Asignatura_idiomas::obtenerAsignaturas('idasignatura', $idAsignatura2);
        if (!empty($informacion)) {
            $asignatura2->actualizarInfo($informacion);
        }
        $curso1 =  AnoCurso::where('id',$asignatura1->cursoID);
        $curso2 =  AnoCurso::where('id',$asignatura2->cursoID);

        $relacion = Relaciones_Asignatura::obtenerAsignaturas($idAsignatura1, $idAsignatura2);
        
       
        $respuesta = [
            'tipo' => 'exito',
            'mensaje' => 'Relaciones Creadas Correctamente',
            'asignatura1'=> $asignatura1,
            'asignatura2' => $asignatura2,
            'curso1' => $curso1,
            'curso2' => $curso2,
            'relacion' => $relacion,
        ];
            echo json_encode(['respuesta' => $respuesta] );
            return;
    }
}