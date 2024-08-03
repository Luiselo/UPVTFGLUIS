<?php
function __($key, $lang = 'es') {
    $translations = include __DIR__ . "/../languages/{$lang}.php";
    return $translations[$key] ?? $key;
}

function loadLanguage() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $lang = 'es'; // Idioma predeterminado

    if (isset($_GET['lang'])) {
        $lang = $_GET['lang'];
        $_SESSION['lang'] = $lang;
    } elseif (isset($_SESSION['lang'])) {
        $lang = $_SESSION['lang'];
    }

    return $lang;
}
?>
