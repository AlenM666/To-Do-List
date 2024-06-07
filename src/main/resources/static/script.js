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
        .then(task => {
            console.log('Task added:', task); // Log the returned task object
            addTaskToDOM(task);
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });

        taskInput.value = '';
    }
});

function addTaskToDOM(task) {
    console.log('Adding task to DOM:', task); // Log the task object to check the description
    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');

    // Create a p element for the task description next to the delete button
    const taskDescriptionPara = document.createElement('p');
    taskDescriptionPara.innerHTML = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        deleteTask(task.id, listItem);
    });

    // Append the task description and delete button to the list item
    listItem.appendChild(taskDescriptionPara);
    listItem.appendChild(deleteButton);

    // Append the list item to the task list
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
    })
    .catch(error => {
        console.error('Error loading tasks:', error);
    });
});
