<?php
include "./partials/Connection.php";

if(isset($_POST['user'], $_POST['title'], $_POST['description'])) {
    $userId = $_POST['user'];
    $taskTitle = $_POST['title'];
    $description = $_POST['description'];
    try {
        $sql = "INSERT INTO task (title, idUser, description) VALUES (?, ?, ?)";
        $state = $conn->prepare($sql);
        $state->execute([$taskTitle, $userId, $description]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Missing data"]);
}
?>
