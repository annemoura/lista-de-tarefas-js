const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function savetasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }
        span.addEventListener('click', function() {
            tasks[index].completed = !tasks[index].completed;
            savetasks();
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            tasks.splice(index, 1);
            savetasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Digite uma tarefa');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    savetasks();
    renderTasks();
    taskInput.value = '';
    
   
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});