<?php
include "./partials/Connection.php";

if (isset($_POST['id'])) {
  $taskId = (int) $_POST['id'];

  try {
    $sql = "DELETE FROM task WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$taskId]);

    echo json_encode(["success" => true]);
  } catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
    error_log("Error deleting task: " . $e->getMessage(), 0);
  }
} else {
  echo json_encode(["error" => "Missing task ID"]);
}
