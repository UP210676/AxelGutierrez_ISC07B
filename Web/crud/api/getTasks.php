<?php
include "./partials/Connection.php"; 

try {
  // Obtener el ID del usuario de la solicitud
  $userId = $_GET['userId'];
  
  // Consulta SQL que selecciona las tareas del usuario especificado
  $SQL = "SELECT task.*, CONCAT(user.firstname, ' ', user.lastname) AS fullname 
          FROM task 
          INNER JOIN user ON task.idUser = user.id
          WHERE task.idUser = :userId";
  
  // Preparar la consulta SQL con un marcador de posición para el ID de usuario
  $statement = $conn->prepare($SQL);
  
  // Vincular el valor del ID de usuario al marcador de posición
  $statement->bindParam(':userId', $userId);
  
  // Ejecutar la consulta preparada
  $statement->execute();

  $tasks = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $tasks[] = [
      "id" => $row['id'],
      "user" => $row['fullname'], // Nombre completo del usuario
      "title" => $row['title'],
      "description" => $row['description']
      // Puedes incluir más campos de la tabla de tareas si es necesario
    ];
  }

  echo json_encode($tasks);
} catch (PDOException $e) {
  die($e->getMessage());
}
?>
