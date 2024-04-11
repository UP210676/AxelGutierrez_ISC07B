<?php
include "./partials/Connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['id']) && isset($_POST['title']) && isset($_POST['description'])) {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        try {
            $sql = "UPDATE task SET title = ?, description = ? WHERE id = ?";
            $statement = $conn->prepare($sql);
            $statement->execute([$title, $description, $id]);

            if ($statement->rowCount() > 0) {
                echo json_encode(["success" => "Tarea actualizada correctamente"]);
            } else {
                echo json_encode(["error" => "No se pudo actualizar la tarea"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Faltan datos necesarios"]);
    }
} else {
    echo json_encode(["error" => "No se ha enviado el formulario correctamente"]);
}
?>
