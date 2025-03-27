<?php
$host = "localhost";
$user = "root";  // Cambia esto si usas otro usuario
$password = "";  // Cambia esto si tienes contraseña en tu MySQL
$database = "lista_compras";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>