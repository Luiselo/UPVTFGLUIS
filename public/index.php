<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AsignaturaController;
use Controllers\LoginController;
use Controllers\DashboardController;
use Controllers\RelacionesController;
use MVC\Router;
$router = new Router();


//login 
$router -> post ('/', [LoginController::class, 'inicio']);
$router -> get('/', [LoginController::class, 'inicio']);

//$router -> get('/', [LoginController::class, 'login']);
//$router -> post ('/', [LoginController::class, 'login']);
$router -> post ('/logout', [LoginController::class, 'logout']);
$router -> get('/login', [LoginController::class, 'login']);
$router -> post ('/login', [LoginController::class, 'login']);
//Abajo se encuentra la llamada orginial desde admin a editarGrafo
//$router->get('/api/graficoAdmin', [DashboardController::class, 'graficoAdmin']);
// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
// Crear Cuenta
$router->get('/crear', [LoginController::class, 'crear']);
$router->post('/crear', [LoginController::class, 'crear']);
// Colocar el nuevo password
$router->get('/reestablecer', [LoginController::class, 'reestablecer']);
$router->post('/reestablecer', [LoginController::class, 'reestablecer']);

// Confirmación de Cuenta
$router->get('/mensaje', [LoginController::class, 'mensaje']);
$router->get('/confirmar', [LoginController::class, 'confirmar']);



// ZONA DE PROYECTOS
$router->get('/panel', [DashboardController::class, 'index']);
$router->post('/panel', [DashboardController::class, 'index']);

$router->get('/panel/crear-curso', [DashboardController::class, 'crear_curso']);
$router->post('/panel/crear-curso', [DashboardController::class, 'crear_curso']);
$router->get('/panel/crear-asignatura', [DashboardController::class, 'crear_asignatura']);
$router->post('/panel/crear-asignatura', [DashboardController::class, 'crear_asignatura']);
$router->get('/panel/editar-asignatura', [DashboardController::class, 'editar_asignatura']);
$router->post('/panel/editar-asignatura', [DashboardController::class, 'editar_asignatura']);
$router->get('/panel/curso', [DashboardController::class, 'curso']);
$router->get('/crear-proyecto', [DashboardController::class, 'crear_proyecto']);

// Formulario de olvide mi password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);

<<<<<<< HEAD
=======
//Crear
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
$router->get('/panel/anocurso', [DashboardController::class, 'anocurso']);
$router->post('/panel/anocurso', [DashboardController::class, 'anocurso']);
$router->post('/api/eliminarasignatura', [AsignaturaController::class, 'eliminarasignatura']);
$router->post('/api/eliminarCurso', [AsignaturaController::class, 'eliminarCurso']);
$router->post('/api/eliminarGrado', [AsignaturaController::class, 'eliminarGrado']);
<<<<<<< HEAD
=======
//CrearAno
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)
$router->post('/api/anocurso', [AsignaturaController::class, 'crearAno']);

$router->post('/api/anadirTags', [AsignaturaController::class, 'anadirTags2']);
$router->post('/crear-proyecto', [DashboardController::class, 'crear_proyecto']);
$router->post('/ver-usuarios', [DashboardController::class, 'ver_usuarios']);
$router->get('/ver-usuarios', [DashboardController::class, 'ver_usuarios']);
$router->post('/AdministradorUsuario', [DashboardController::class, 'perfil']);
$router->get('/AdministradorUsuario', [DashboardController::class, 'perfil']);
$router->get('/proyecto', [DashboardController::class, 'proyecto']);
$router->get('/perfil', [DashboardController::class, 'perfil']);
$router->post('/perfil', [DashboardController::class, 'perfil']);
$router->get('/cambiar-password', [DashboardController::class, 'cambiar_password']);
$router->post('/cambiar-password', [DashboardController::class, 'cambiar_password']);


// API
$router->get('/api/asignatura', [AsignaturaController::class, 'index']);
$router->post('/api/asignatura', [AsignaturaController::class, 'crear']);
$router->post('/api/AnadirRelacion', [AsignaturaController::class, 'AnadirRelacion']);
$router->post('/api/asignatura/actualizar', [AsignaturaController::class, 'actualizar']);
$router->post('/api/asignatura/actualizarGuia', [AsignaturaController::class, 'actualizarGuia']);
$router->get('/api/asignaturasRelacion', [RelacionesController::class, 'obtenerAsignaturasRelacion']);

$router->get('/api/temarios', [AsignaturaController::class, 'indexTareas']);

$router->post('/api/obtenerTags', [AsignaturaController::class, 'obtenerTags']);
$router->get('/api/obtenerTags', [AsignaturaController::class, 'obtenerTags']);


$router->post('/api/anadirTag', [AsignaturaController::class, 'anadirTags']);
$router->get('/api/anadirTag', [AsignaturaController::class, 'anadirTags']);

$router->get('/api/relacion', [RelacionesController::class, 'index']);
$router->post('/api/relacion', [RelacionesController::class, 'modificar']);
$router->post('/api/AnadirRelacion', [RelacionesController::class, 'AnadirRelacion']);
<<<<<<< HEAD
=======
$router->post('/api/eliminarRelacion', [RelacionesController::class, 'eliminarRelacion']);
>>>>>>> 25b85b50 (Inicial commit del proyecto UpTask_MVC)


$router->get('/api/relaciones', [DashboardController::class, 'relaciones']);


$router->get('/api/inforelaciones', [RelacionesController::class, 'inforelaciones']);

$router->post('/api/inforelaciones', [RelacionesController::class, 'inforelaciones']);


$router->get('/api/relacionAdmin', [DashboardController::class, 'relacionesAsignaturas']);

$router->get('/api/graficoAdmin', [DashboardController::class, 'graficoAdmin']);


$router->get('/api/grafo', [RelacionesController::class, 'obtener']);


$router->comprobarRutas();