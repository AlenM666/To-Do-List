document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: taskText })
        })
        .then(response => response.json())
        .then(task => addTaskToDOM(task));

        taskInput.value = '';
    }
});

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    listItem.textContent = task.description;
    listItem.dataset.id = task.id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        deleteTask(task.id, listItem);
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function deleteTask(id, listItem) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    }).then(() => {
        listItem.remove();
    });
}

// Load existing tasks on page load
window.addEventListener('DOMContentLoaded', (event) => {
    fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => addTaskToDOM(task));
    });
});
