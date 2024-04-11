import { getTasksForUser, getAllUsers, createTask, deleteTask, updateTask } from './petitions.js';

const taskForm = document.getElementById('form-task');

document.addEventListener('DOMContentLoaded', async () => {
  const listUsers = document.getElementById('users');
  const tableBody = document.querySelector('tbody');

  //  llenar la lista
  const users = await getAllUsers();
  for (const user of users) {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.fullname;
    listUsers.appendChild(option);
  }

  // cargar las tareas del usuario seleccionado
  const loadTasksForUser = async (userId) => {
    // limpiar
    tableBody.innerHTML = '';

    // tareas
    const tasks = await getTasksForUser(userId);

    // mostrar
    tasks.forEach(task => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.user}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>
          <button class="btn btn-secondary btn-sm">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm delete-task" data-task-id="${task.id}">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      `;
    });
  };



  // para actualizar tareas
  tableBody.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('update-task')) {
      const taskId = clickedElement.dataset.taskId;
      // datos de la tarea a actualizar
      const taskData = await getTaskById(taskId);
      // formulario
      document.getElementById('task_id').value = taskData.id;
      document.getElementById('title').value = taskData.title;
      document.getElementById('description').value = taskData.description;
    }
  });

  // formulario de actualización de tarea
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const response = await updateTask(formData);
    taskForm.reset();
    await loadTasksForUser(listUsers.value);
    console.log(response);
  });



  // cambio en la lista desplegable de usuarios
  listUsers.addEventListener('change', async (event) => {
    const userId = event.target.value;
    await loadTasksForUser(userId);
  });

  //Creación de una nueva tarea
  // Almacena el userId seleccionado 
  // antes de enviar la solicitud de actualización
  const selectedUserId = document.getElementById('users').value;

  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm); 
    const taskId = formData.get('task_id');

    if (taskId) {
      const response = await updateTask(formData);
      taskForm.reset();
      await loadTasksForUser(selectedUserId);

      console.log(response);
    } else {
      const response = await createTask(formData);
      taskForm.reset();
      await loadTasksForUser(selectedUserId);
      console.log(response);
    }
  });



  //  actualizar tareas
  tableBody.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('update-task')) {
      const taskId = clickedElement.dataset.taskId;
      // de la tarea a actualizar
      const taskData = await getTaskById(taskId);
      // datos de la tarea en el formulario
      document.getElementById('task_id').value = taskData.id;
      document.getElementById('title').value = taskData.title;
      document.getElementById('description').value = taskData.description;
    }
  });



  //  formulario de actualización de tarea
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm);
    const response = await updateTask(formData);
    taskForm.reset();
    const selectedUserId = document.getElementById('users').value;
    await loadTasksForUser(selectedUserId);
    console.log(response);
  });



  // eliminar tareas
  tableBody.addEventListener('click', async (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('delete-task')) {
      const taskId = clickedElement.dataset.taskId;
      if (confirm(`¿Estás seguro de que quieres eliminar la tarea ${taskId}?`)) {
        try {
          await deleteTask(taskId);
          const selectedUserId = document.getElementById('users').value;
          await loadTasksForUser(selectedUserId); 
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
        }
      }
    }
  });
});


