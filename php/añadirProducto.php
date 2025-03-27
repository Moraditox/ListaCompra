<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];

    $sql = "INSERT INTO productos (nombre, precio) VALUES ('$nombre', $precio)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Producto agregado"]);
    } else {
        echo json_encode(["error" => "Error al agregar producto"]);
    }
}

$conn->close();
?>