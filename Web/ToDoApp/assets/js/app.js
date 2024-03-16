// Elementos HTML
const userSelect = document.getElementById('select-users');
console.log(userSelect);
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const displayButton = document.getElementById('btndisplay');

userSelect.addEventListener('click',()=>{
    // getAllUsers()
    getUser(userSelect.value).then((text)=>{
        const nombreCompleto = userContainer.children[1].children[0].children[0];
        const emailUsuario = userContainer.children[1].children[1].children[0];
        console.log(text)
        nombreCompleto.textContent = `${text.firstname} ${text.lastname}`
        emailUsuario.textContent = `${text.email}`
    })
    //console.log(getAllTasks())
    getTasks(userSelect.value).then((text)=>{
        taskContainer.style.visibility = 'hidden'
        const ul = taskContainer.children[1]
        // ul.replaceChildren()
        while(ul.firstChild){
            ul.removeChild(ul.firstChild)
        }
            for (let i = 0; i < text.length; i++) {
                const li = document.createElement('li')
                const checkbox = document.createElement('input')
                checkbox.setAttribute('type','checkbox')
                li.innerText = `${text[i].id}. ${text[i].title}`
                if (text[i].completed) {
                    checkbox.checked = true
                }
                li.appendChild(checkbox)
                ul.appendChild(li)    
            }            
    })
    
}); //Fin de select mostrar informacion

displayButton.addEventListener('click',()=>{
    if (taskContainer.style.visibility === 'visible') {
        taskContainer.style.visibility = 'hidden';
    } else {
        taskContainer.style.visibility = 'visible';
    }
})

function getAllUsers() {
    return fetch('data/usuarios.json')
    .then((resp) => console.log(resp.json()));
    
}

function getUser(value) {
    return fetch('data/usuarios.json')
    .then((resp) => {
        return resp.json()
    }).then((resp)=>{
        return resp[value-1]
    });
}

function getTasks(userId){
    return fetch('data/tareas.json')
    .then((resp)=>{
        return resp.json()
    }).then((resp)=>{
        const array = []
        for (let i = 0; i < resp.length; i++) {
            const element = resp[i];
            if (element.userId==userId) {
                array.push(element);
            }
        }
        return array
    })
}

function getAllTasks() {
  return fetch('data/tareas.json')
    .then(resp => {
        return resp.json()});
}

