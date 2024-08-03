<?php


namespace Model;

use Model\ActiveRecord;

class Tags_Asignatura extends ActiveRecord {
    protected static $tabla = 'tags_Asignatura';
    protected static $columnasDB = ['idTag', 'idAsignatura'];

    public function __construct($args = [])
    {
<<<<<<< HEAD
        $this->idTag = $args['idTag'] ?? null;
=======
        
        $this->idTag = $args['idTag'] ?? '';
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $this->idAsignatura =$args['idAsignatura'] ?? '';
      
        
    }

    public static function eliminarTarea($asignaturaID) {
        $query = "DELETE FROM "  . static::$tabla . " WHERE idAsignatura =  '${asignaturaID}'";
        $resultado = self::$db->query($query);
        return $resultado;
    }

    public function validarProyecto() {
        if(!$this->proyecto) {
            self::$alertas['error'][] = 'El Nombre del Proyecto es Obligatorio';
        }
        return self::$alertas;
    }

    public static function obtenerTags($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
        $resultado = self::consultarSQL($query);
       
        return  $resultado  ;
    }
}