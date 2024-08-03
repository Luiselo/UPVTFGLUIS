<?php

namespace Controllers;

use Model\Proyecto;
use Model\Tarea;
use Model\AnoCurso;
use Model\Temario;
use Model\Curso;
use Model\Asignatura;
use Model\Asignatura_idiomas;
use Model\Tags;
use Model\Tags_Asignatura;
use Model\Relaciones_Asignatura;
class LanguageController {
    private $supportedLanguages = ['es', 'en', 'fr'];
    private $defaultLanguage = 'en';

    public function setLanguage($language) {
        if (in_array($language, $this->supportedLanguages)) {
            $_SESSION['lang'] = $language;
        } else {
            $_SESSION['lang'] = $this->defaultLanguage;
        }
    }

    public function getLanguage() {
        return isset($_SESSION['lang']) ? $_SESSION['lang'] : $this->defaultLanguage;
    }

    public function loadTranslations() {
        $language = $this->getLanguage();
        $filePath = "locales/{$language}.json";
        if (file_exists($filePath)) {
            $translations = file_get_contents($filePath);
            return json_decode($translations, true);
        }
        return [];
    }
}
