<?php


namespace Model;

use Model\ActiveRecord;

class Asignatura extends ActiveRecord {
    protected static $tabla = 'asignaturas';
<<<<<<< HEAD
    protected static $columnasDB = ['id', 'asignatura','descripcion', 'cursoID','semestre','creditos','competencia','temario','evaluacion','convocatoria'];
=======
    protected static $columnasDB = ['id', 'asignatura','descripcion', 'cursoID','semestre','creditos','competencia','temario','evaluacion','convocatoria','url'];
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->asignatura = $args['asignatura'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->cursoID = $args['cursoID'] ?? '';
        $this->semestre = $args['semestre'] ?? '';
        $this->relaciones = null;
        $this->creditos =$args['creditos'] ?? '';
        $this->competencia =$args['competencia'] ?? '';
        $this->temario =$args['temario'] ?? '';
        $this->evaluacion= $args['evaluacion'] ?? '';
        $this->convocatoria =$args['convocatoria'] ?? '';
        $this->tiene_relacion = $args['tiene_relacion'] ?? '' ;
        $this->tags= $args['tags'] ?? '' ;
<<<<<<< HEAD

=======
        $this->url = $args['url'] ?? '' ;
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
        $this->info = $args['info'] ?? '' ;
        
    }

    public function actualizarInfo($infoIdioma) {
        $this -> info = $infoIdioma;
     }
    
    public function actualizarNombre($nombre) {
       $this -> nombre;
    }
    public function validarProyecto() {
        if(!$this->proyecto) {
            self::$alertas['error'][] = 'El Nombre del Proyecto es Obligatorio';
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

    public static function obtenerAsignaturasRelacion($valor,$filtro,$curso) {

        if($filtro ==-1){
<<<<<<< HEAD
            $query ="SELECT DISTINCT *, CASE WHEN EXISTS ( SELECT * FROM relaciones_asignaturas WHERE (id_asignatura1 = '${valor}' AND id_asignatura2 = a.id) OR (id_asignatura1 = a.id AND id_asignatura2 =  '${valor}') ) THEN TRUE ELSE FALSE END AS tiene_relacion FROM asignaturas a inner join anos_curso as b on a.cursoID = b.id where b.idCurso = '${curso}' order by cursoID";
            $resultado = self::consultarSQL($query);
=======
            $query ="SELECT DISTINCT 
    a.id , 
    a.asignatura, 
    a.descripcion AS descripcion_asignatura,
    a.cursoID, 
    a.semestre, 
    a.creditos AS creditos_asignatura,
    a.competencia, 
    a.temario, 
    a.evaluacion, 
    a.convocatoria, 
    a.url, 
    b.id AS id_ano_curso, 
    b.idCurso, 
    b.numero, 
    b.descripcion AS descripcion_ano_curso, 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM relaciones_asignaturas 
            WHERE (id_asignatura1 = '${valor}' AND id_asignatura2 = a.id) 
               OR (id_asignatura1 = a.id AND id_asignatura2 = '${valor}')
        ) 
        THEN TRUE 
        ELSE FALSE 
    END AS tiene_relacion 
FROM 
    asignaturas a 
    INNER JOIN anos_curso b ON a.cursoID = b.id 
WHERE 
    b.idCurso = '${curso}'
ORDER BY 
    a.cursoID DESC;
;";
            $resultado = self::consultarSQL($query);
         
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
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