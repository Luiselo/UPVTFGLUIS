<?php


namespace Model;

use Model\ActiveRecord;

class Tags_Asignatura extends ActiveRecord {
    protected static $tabla = 'tags_Asignatura';
    protected static $columnasDB = ['idTag', 'idAsignatura'];

    public function __construct($args = [])
    {
        $this->idTag = $args['idTag'] ?? null;
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