<?php
function getBaseUrl() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $hostName = $_SERVER['HTTP_HOST'];
    $path = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
    return rtrim($protocol . $hostName . $path, '/').'/';
}

define('BASE_URL', getBaseUrl());
?>
