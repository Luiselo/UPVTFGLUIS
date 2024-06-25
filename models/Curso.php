<?php


namespace Model;

use Model\ActiveRecord;
use Classes\Email;

class Curso extends ActiveRecord {
    protected static $tabla = 'curso';
    protected static $columnasDB = ['id', 'nombreCurso','universidadCurso'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombreCurso = $args['nombreCurso'] ?? null;
        $this->universidadCurso = $args['universidadCurso'] ?? null;
        $this -> anoCurso = null;
       
        
       
    }

    public function validarCurso() {
        if(!$this->nombreCurso) {
            self::$alertas['error'][] = 'El nombre del curso es obligatorio';
        }
        if(!$this->universidadCurso) {
            self::$alertas['error'][] = 'El nombre del centro es obligatorio';
        }
        if($this->nombreCurso == "nombre"){
            self::$alertas['error'][] = 'El nombre del curso es obligatorio';
        }
        if($this->universidadCurso == "nombre del campus"){
            self::$alertas['error'][] = 'El nombre del centro es obligatorio';
        }

        
        return self::$alertas;
    }
}