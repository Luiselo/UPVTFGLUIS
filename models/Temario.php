<?php


namespace Model;

use Model\ActiveRecord;

class Temario extends ActiveRecord {
    protected static $tabla = 'temarios';
    protected static $columnasDB = ['id', 'idAsignatura','descripcion'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->idAsignatura = $args['idAsignatura'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        
    }

    public static function eliminarTarea($asignaturaID) {
        $query = "DELETE FROM "  . static::$tabla . " WHERE idAsignatura = " . self::$db->escape_string($asignaturaID);
        $resultado = self::$db->query($query);
        return $resultado;
    }

    public function validarProyecto() {
        if(!$this->proyecto) {
            self::$alertas['error'][] = 'El Nombre del Proyecto es Obligatorio';
        }
        return self::$alertas;
    }

    public static function obtenerTemarios($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
        $resultado = self::consultarSQL($query);
       
        return  $resultado  ;
    }
}