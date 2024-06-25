<?php


namespace Model;

use Model\ActiveRecord;

class Tags extends ActiveRecord {
    protected static $tabla = 'tags';
    protected static $columnasDB = ['id', 'descripcion','cursoID'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->descripcion =$args['descripcion'] ?? '';
        $this->cursoID =$args['cursoID'] ?? '';
        $this->selected =$args['selected'] ?? '';
        
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

    public static function ObtenerTagsAsignatura($id) {

         
        $query ="SELECT  * FROM tags as a inner Join tags_asignatura as b on a.id = b.idTag where b.idAsignatura = '${id}'";
         $resultado = self::consultarSQL($query);
            return  $resultado ;

        
        
    
    }

    public static function eliminarTags($columna, $valor) {
        // Construir la consulta SQL para eliminar registros
        $query = "DELETE FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
       
        // Ejecutar la consulta SQL
   
        $resultado = self::$db->query($query);
   
        // Retornar el resultado de la consulta (puede ser útil para verificar éxito o manejar errores)
        return $resultado;
    }
 
    public static function obtenerTags($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
        $resultado = self::consultarSQL($query);
       
        return  $resultado  ;
    }
}