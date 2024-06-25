<?php


namespace Model;

use Model\ActiveRecord;

class Relaciones_Asignatura extends ActiveRecord {
    protected static $tabla = 'relaciones_asignaturas';
    protected static $columnasDB = ['id','id_asignatura1','id_asignatura2','descripcion','color'];

    public function __construct($args = [])
    {
        $this-> id = $args['id'] ?? null;;
        $this->id_asignatura1 = $args['id_asignatura1'] ?? null;
        $this->id_asignatura2 = $args['id_asignatura2'] ?? null;
        $this->descripcion = $args['descripcion'] ?? null;
        $this-> color = $args['color'] ?? null;
       
        
       
    }
    public static function obtenerRelacion($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
        $resultado = self::consultarSQL($query);
       
       
        return  $resultado  ;
    }
    public static function obtenerAsignaturas($valor2, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE (id_asignatura1 = '${valor}' and id_asignatura2 = '${valor2}') or  (id_asignatura1 = '${valor2}' and id_asignatura2 = '${valor}') ";
        $resultado = self::consultarSQL($query);
        

        return  $resultado  ;
    }

    

    public function actualizarCurso(int $id , int $ano, string $tipocurso)
    {
        $this-> id= $args['id'] ?? null; 
        $this->idCurso = $id ?? null;
        $this->numero = $ano ?? null;
        $this->descripcion = $tipocurso ?? null;

        
       
        
       
    }

    public static function eliminaRelaciones($valor2, $valor) {
        $query = "DELETE FROM "  . static::$tabla . " WHERE (id_asignatura1 = '${valor}' and id_asignatura2 = '${valor2}') or  (id_asignatura1 = '${valor2}' and id_asignatura2 = '${valor}') ";
        $resultado = self::$db->query($query);
        return $resultado;
    }
    public static function eliminarAsignatura($valor) {
        $query = "DELETE FROM "  . static::$tabla . " WHERE (id_asignatura1 = '${valor}') or  (id_asignatura2 = '${valor}') ";
        $resultado = self::$db->query($query);
        return $resultado;
    }

    public function validarCurso() {
        if(!$this->nombreCurso) {
            self::$alertas['error'][] = 'El nombre del curso es obligatorio';
        }
        if(!$this->universidadCurso) {
            self::$alertas['error'][] = 'El nombre del cento es obligatorio';
        }
        return self::$alertas;
    }
}