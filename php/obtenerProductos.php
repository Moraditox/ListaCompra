<?php
include 'connect.php';

// Verifica si se ha enviado el parámetro 'id' y si es un número válido
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']); // Convertir el ID a número entero para seguridad

    // Consulta preparada para evitar SQL Injection
    $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
    
    if ($stmt) {
        $stmt->bind_param("i", $id); // "i" indica un valor entero
        $stmt->execute();
        $result = $stmt->get_result();

        $producto = $result->fetch_assoc(); // Obtener un solo resultado

        echo json_encode($producto ? $producto : ["error" => "Producto no encontrado"]);
        $stmt->close();
    } else {
        echo json_encode(["error" => "Error en la consulta"]);
    }
} else {
    // Si no se recibe un ID válido, obtener todos los productos
    $sql = "SELECT * FROM productos";
    $result = $conn->query($sql);

    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    echo json_encode($productos);
}

$conn->close();
?>
