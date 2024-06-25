<?php


namespace Model;

use Model\ActiveRecord;

class Asignatura_idiomas extends ActiveRecord {
    protected static $tabla = 'asignaturas_idioma';
    protected static $columnasDB = ['id','idasignatura','idioma','nombre','guiadocente','competencias','contenidos','sistemas','convocatoria','sigla'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->idasignatura = $args['idasignatura'] ?? '';
        $this->idioma = $args['idioma'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->guiadocente = $args['guiadocente'] ?? '';
        $this->competencias = $args['competencias'] ?? '';
        $this->contenidos = $args['contenidos'] ?? '';
        $this->convocatoria = $args['convocatoria'] ?? ''; 
        $this->sistemas =$args['sistemas']?? '';       
        $this->sigla = $args['sigla'] ?? '';
    }
    
    public function sincronizarIdioma($args = [], $idioma)
    {
        $this->id = $args['id'] ?? null;
        $this->idasignatura = $args['idasignatura'] ?? '';
        
        // Asignación de propiedades según el idioma
        switch ($idioma) {
            case 'es':
                $this->guiadocente = $args['guiadocenteES'] ?? '';
                $this->nombre = $args['nombreES'] ?? null;
                $this->contenidos = $args['contenidosES'] ?? '';
                $this->convocatoria = $args['convocatoriaES'] ?? '';
                $this->competencias = $args['competenciasES'] ?? '';
                $this->sistemas =$args['sistemasES'] ?? '';     
                $this->sigla = $args['siglaES'] ?? '';
                $this->idioma = "es";
                break;
            case 'eu':
                $this->guiadocente = $args['guiadocenteEU'] ?? '';
                $this->nombre = $args['nombreEU'] ?? null;
                $this->contenidos = $args['contenidosEU'] ?? '';
                $this->convocatoria = $args['convocatoriaEU'] ?? '';
                $this->competencias = $args['competenciasEU'] ?? '';
                $this->sistemas =$args['sistemasEU'] ?? ''; 
                $this->sigla = $args['siglaEU'] ?? '';
                $this->idioma = "eu";

                break;
            case 'en':
               
                    $this->guiadocente = $args['guiadocenteEN'] ?? '';
                    $this->nombre = $args['nombreEN'] ?? null;
                    $this->contenidos = $args['contenidosEN'] ?? '';
                    $this->convocatoria = $args['convocatoriaEN'] ?? '';
                    $this->competencias = $args['competenciasEN'] ?? '';
                    $this->sistemas =$args['sistemasEN'] ?? ''; 
                    $this->sigla = $args['siglaEN'] ?? '';
                    $this->idioma = "en";
                break;
            default:
                // Idioma no válido
                break;
        }
    }
    public function sincronizarId($id)
    {
        $this->idasignatura = $id;
        
    }
    


    public function validarIdioma() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre de la asignatura es Obligatorio';
        }
        return self::$alertas;
    }

   
        public function actualizarGuiaDocente($campo) {

            $query = "UPDATE asignaturas SET ";
            $query .=  $campo;
            $query .= "=";
            $query .= "'".$this->$campo."'";
            $query .= " WHERE id = '" . $this -> id . "' ";
            $query .= " LIMIT 1 "; 
    
        
            $resultado = self::$db->query($query);
            return $resultado;
        }
    

    public static function obtenerAsignaturas($columna, $valor) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
  
        $resultado = self::consultarSQL($query);
       
        return  $resultado  ;
    }
    public static function eliminarAsignaturas($columna, $valor) {
        $query = "DELETE FROM " . static::$tabla . " WHERE ${columna} = '${valor}'";
        $resultado = self::$db->query($query);
        return $resultado;
    }
    

    public static function obtenerAsignaturasRelacion($valor,$filtro) {

        if($filtro ==-1){
            $query ="SELECT DISTINCT *, CASE WHEN EXISTS ( SELECT * FROM relaciones_asignaturas WHERE (id_asignatura1 = '${valor}' AND id_asignatura2 = a.id) OR (id_asignatura1 = a.id AND id_asignatura2 =  '${valor}') ) THEN TRUE ELSE FALSE END AS tiene_relacion FROM asignaturas a order by cursoID";
            $resultado = self::consultarSQL($query);
            return  $resultado ;
        }else{
            $query ="SELECT DISTINCT *, CASE WHEN EXISTS ( SELECT * FROM relaciones_asignaturas WHERE (id_asignatura1 = '${valor}' AND id_asignatura2 = a.id) OR (id_asignatura1 = a.id AND id_asignatura2 =  '${valor}') ) THEN TRUE ELSE FALSE END AS tiene_relacion FROM asignaturas a where cursoID = '${filtro}'";
            $resultado = self::consultarSQL($query);
            return  $resultado ;

        }
        
    
    }


        
    public static function obtenerAsignaturasFiltro($columna, $valor,$columnaFiltro, $valor2) {
        $query = "SELECT * FROM " . static::$tabla . " WHERE ${columna} = '${valor}' AND NOT  ${columnaFiltro} = '${valor2}' ";
        $resultado = self::consultarSQL($query);
     
        return  $resultado  ;
    }
}