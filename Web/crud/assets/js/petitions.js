//usuarios
export async function getAllUsers() {
  const resp = await fetch("./api/getUsers.php");
  const json = await resp.json();

  return json;
}

//tareas
export async function getTasksForUser(userId) {
  try {
    const response = await fetch(`./api/getTasks.php?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

// Crear nueva tarea
export async function createTask(formData) {
  const res = await fetch(`/api/createTask.php`, {
    method: "POST",
    body: formData
  });
  const json = await res.json();
  return json;
}

// Eliminar tarea
export async function deleteTask(taskId) {
  try {
    const res = await fetch(`/api/deleteTask.php`, {
      method: "POST",
      body: JSON.stringify({ id:taskId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}


// Actualizar tarea
export async function updateTask(formData) {
  try {
    const res = await fetch(`/api/updateTask.php`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

