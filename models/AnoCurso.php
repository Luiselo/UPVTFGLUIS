<?php


namespace Model;

use Model\ActiveRecord;

class AnoCurso extends ActiveRecord {
    protected static $tabla = 'anos_curso';
    protected static $columnasDB = ['idCurso', 'numero','descripcion','id'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;;
        $this->idCurso = $args['idCurso'] ?? null;
        $this->numero = $args['numero'] ?? null;
        $this->descripcion = $args['descripcion'] ?? null;
        $this->creditos = $args['creditos'] ?? null;
        $this->asignaturas = null;
       
        
       
    }
    public function actualizarCurso(int $id , int $ano, string $tipocurso)
    {
        $this-> id= $args['id'] ?? null; 
        $this->idCurso = $id ?? null;
        $this->numero = $ano ?? null;
        $this->descripcion = $tipocurso ?? null;

        
       
        
       
    }

    public static function getAnos($columna, $valor) {

       
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}' ORDER BY  numero";
       
        $resultado = self::consultarSQL($query);
        
     
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