<?php

namespace Controllers;

use Model\Proyecto;
use Model\Tarea;
use Model\AnoCurso;
use Model\Temario;
use Model\Curso;
use Model\Asignatura;
use Model\Asignatura_idiomas;
use Model\Tags;
use Model\Tags_Asignatura;
use Model\Relaciones_Asignatura;

class AsignaturaController {
    public static function index() {
       
        $proyectoId = $_GET['id'];
        $proyecto = AnoCurso::where('id', $proyectoId);
     
        session_start();
       
        $asignaturas = Asignatura::obtenerAsignaturas('cursoID', $proyecto->id);

        foreach ($asignaturas as &$asignatura) {
            // Modificar el valor, por ejemplo, incrementar los créditos en 1
            $asignaturas_info = Asignatura_idiomas::obtenerAsignaturas('idasignatura', $asignatura->id);

            if (count($asignaturas_info) > 0) {
               
                $asignatura->actualizarInfo($asignaturas_info);
                
            }
        }
       
        echo json_encode(['asignaturas' => $asignaturas]);
    }


    public static function obtenerTags() {
       
        $idCurso = $_POST['idCurso'];
        $cursoID = AnoCurso::where('id', $idCurso);
        $Tags = Tags::obtenerTags('cursoID', $cursoID->idCurso );
     
        session_start();
       
       
        echo json_encode(['tags' => $Tags]);
    }

    public static function indexTareas() {
       
        $proyectoId = $_GET['id'];
        $proyecto = Asignatura::where('id', $proyectoId);
        session_start();
        $temarios = Temario::obtenerTemarios('idAsignatura', $_GET['id']);
        echo json_encode(['temarios' => $temarios]);
    }



    
    public static function crear() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
         
            session_start();

            $cursoId = $_POST['cursoID'];

            $curso = AnoCurso::where('id', $cursoId);

            if(!$curso) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la asignatura'
                ];
                echo json_encode($respuesta);
                return;
            } 
            
            // Todo bien, instanciar y crear la tarea
            $asignatura = new Asignatura($_POST);
    
            $resultado = $asignatura->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            $id = $resultado['id'];
            $temarios = explode (",", $_POST['cursos']);
         
            foreach ($temarios as $temario) {

                $args["idAsignatura"] = $id;
                $args["descripcion"] = $temario;
                $aux = new Temario($args);
                $resultado = $aux->guardar();
            }

            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            echo json_encode($respuesta);
        }
        
    }
    public static function eliminarasignatura() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
            
            $cursoId = $_POST['id'];
            $asignatura = Asignatura::where('id', $cursoId);
            $tags = Tags_Asignatura::where('idAsignatura',$asignatura-> id);
         
            $relaciones = Relaciones_Asignatura::eliminarasignatura($asignatura->id);
            if($tags)
            $tags -> eliminar();
            $asignatura -> eliminar();
            if(!$asignatura) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la asignatura'
                ];
                echo json_encode($respuesta);
                return;
            } else{$respuesta = [
                'tipo' => 'Exito',
                'mensaje' => 'El curso se ha eliminado de manera exitosa.'
            ];
            echo json_encode($respuesta);
            return;}
            
            // Todo bien, instanciar y crear la tarea
            $asignatura = new Asignatura($_POST);
    
            $resultado = $asignatura->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            $id = $resultado['id'];
            $temarios = explode (",", $_POST['cursos']);
         
            foreach ($temarios as $temario) {

                $args["idAsignatura"] = $id;
                $args["descripcion"] = $temario;
                $aux = new Temario($args);
                $resultado = $aux->guardar();
            }

            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            echo json_encode($respuesta);
        }
        
    
    }

    public static function eliminarCurso() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
         
           
            $cursoId = $_POST['id'];
            $AnoCurso = AnoCurso::where('id',$cursoId);
            
            $asignaturas = Asignatura::obtenerAsignaturas('id', $AnoCurso->id);
           
            if (!empty($asignaturas))
            foreach ($asignaturas as $asignatura){
                $tags = Tags_Asignatura::where('idAsignatura',$asignatura-> id);
              

                $relaciones = Relaciones_Asignatura::eliminarasignatura($asignatura->id);
             
                if($tags)
                //$tags -> eliminar();
                $asignatura -> eliminar();
                
        }
           
            $AnoCurso -> eliminar();
           
            if(!$AnoCurso) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la asignatura'
                ];
                echo json_encode($respuesta);
                return;
            } else{$respuesta = [
                'tipo' => 'Exito',
                'mensaje' => 'El curso se ha eliminado de manera exitosa.'
            ];
            echo json_encode($respuesta);
            return;}
            
            // Todo bien, instanciar y crear la tarea
            $asignatura = new Asignatura($_POST);
    
            $resultado = $asignatura->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            $id = $resultado['id'];
            $temarios = explode (",", $_POST['cursos']);
         
            foreach ($temarios as $temario) {

                $args["idAsignatura"] = $id;
                $args["descripcion"] = $temario;
                $aux = new Temario($args);
                $resultado = $aux->guardar();
            }

            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            echo json_encode($respuesta);
        }
        
    
    }


    public static function eliminarGrado() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
           
            $cursoId = $_POST['id'];
            $curso = Curso::where('id',$cursoId);
            
            $AnosCurso = AnoCurso::getAnos('idCurso', $curso->id);
     
           foreach($AnosCurso as $anos){
            $asignaturas = Asignatura::obtenerAsignaturas('id', $anos->id);
            if (!empty($asignaturas))
            foreach ($asignaturas as $asignatura){
                $tags = Tags_Asignatura::where('idAsignatura',$asignatura-> id);
              

                $relaciones = Relaciones_Asignatura::eliminarasignatura($asignatura->id);
             
                if($tags)
                //$tags -> eliminar();
                $asignatura -> eliminar();
           }
            
           $anos -> eliminar(); 
        }
           
        $curso ->eliminar();
           
            if(!$curso) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la asignatura'
                ];
                echo json_encode($respuesta);
                return;
            } else{$respuesta = [
                'tipo' => 'Exito',
                'mensaje' => 'El curso se ha eliminado de manera exitosa.'
            ];
            echo json_encode($respuesta);
            return;}
            
            // Todo bien, instanciar y crear la tarea
            $asignatura = new Asignatura($_POST);
    
            $resultado = $asignatura->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            $id = $resultado['id'];
            $temarios = explode (",", $_POST['cursos']);
         
            foreach ($temarios as $temario) {

                $args["idAsignatura"] = $id;
                $args["descripcion"] = $temario;
                $aux = new Temario($args);
                $resultado = $aux->guardar();
            }

            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            echo json_encode($respuesta);
        }
        
    
    }

    public static function crearAno() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
            $curso = new AnoCurso($_POST);
            $existeAnoCurso = AnoCurso::where3('idCurso', $curso->idCurso,'numero', $curso->numero, 'descripcion',$curso->descripcion);
            if($existeAnoCurso){
                AnoCurso::setAlerta('error', 'Ya hay un semestre con esta descripción');
                $alertas = AnoCurso::getAlertas();
            }
            if(empty($alertas)) {
                $resultado = $curso->guardar();
                $respuesta = [
                    'tipo' => 'exito',
                    'id' => $resultado['id'],
                    'mensaje' => 'Asignatura Creada Correctamente',
                ];
            }else{
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Ya hay un semestre con esta descripción'
                ];
            }           
            echo json_encode($respuesta);
        }
    }

    

    public static function anadirTags2() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
          
           $id = $_POST['idCurso'];
           
            $tags = $_POST['tags'];
            $eliminar = Tags::eliminarTags('cursoID', $id);

            $tagsArray = explode(',', $tags);


            
            foreach ($tagsArray as $tag) {
                $NewTag = new Tags();
                $NewTag -> descripcion = $tag;
                $NewTag -> cursoID = $id;
                $NewTag -> guardar();
            }
            
            



           
       
            $respuesta = [
                'tipo' => 'exito',
                'mensaje' => 'Tag creado correctamente'
            ];
           
            echo json_encode($respuesta);
        }
        
    }

    public static function anadirTagAsignatura() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
           $Ano_curso = AnoCurso::where('id',$_POST['idano']);
            
            $Tag = new Tags($_POST);
            $Tag -> cursoID = $Ano_curso->idCurso;
            $resultado = $Tag->guardar();
       
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente'
            ];
           
            echo json_encode($respuesta);
        }
        
    }

    public static function anadirTags() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
           $Ano_curso = AnoCurso::where('id',$_POST['idano']);
            
            $Tag = new Tags($_POST);
            $Tag -> cursoID = $Ano_curso->idCurso;
            $resultado = $Tag->guardar();
       
            $respuesta = [
                'tipo' => 'exito',
                'id' => $resultado['id'],
                'mensaje' => 'Asignatura Creada Correctamente'
            ];
           
            echo json_encode($respuesta);
        }
        
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
         
            session_start();

            $cursoId = $_POST['cursoID'];

            $curso = AnoCurso::where('id', $cursoId);

            if(!$curso) {
                $respuesta = [
                    'tipo' => 'error',
                    'mensaje' => 'Hubo un Error al agregar la asignatura'
                ];
                echo json_encode($respuesta);
                return;
            } 
            
            // Todo bien, instanciar y crear la tarea
            $asignatura = new Asignatura($_POST);
    
            $resultado = $asignatura->guardar();
            $respuesta = [
                'tipo' => 'exito',
                'id' => $asignatura->id,
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            $id = $asignatura->id;
            $temarios = explode (",", $_POST['cursos']);
            $res = Temario::eliminarTarea($asignatura->id);
            foreach ($temarios as $temario) {

                $args["idAsignatura"] = $id;
                $args["descripcion"] = $temario;
                $aux = new Temario($args);
                $resultado = $aux->guardar();
            }

            $respuesta = [
                'tipo' => 'exito',
                'id' => $asignatura-> id,
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
            echo json_encode($respuesta);
        }
    }

    
    public static function actualizarGuia() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            session_start();
            $campo = $_POST["nombre"];
           
            $asignatura = new Asignatura($_POST);
          
          
            $resultado = $asignatura->actualizarGuiaDocente($campo);
            $respuesta = [
                'tipo' => 'exito',
                'id' => $asignatura->id,
                'mensaje' => 'Asignatura Creada Correctamente',
                'proyectoId' => $asignatura->id
            ];
          
         
            echo json_encode($respuesta);
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
}