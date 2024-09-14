let taskId = 0; // Global counter for assigning unique IDs to tasks

// Function to show or hide the add task form
function addTask() {
    const taskForm = document.getElementById('taskForm');
    taskForm.style.display = taskForm.style.display === 'block' ? 'none' : 'block';
}

// Function to show or hide the remove task form
function removeTask() {
    const removeTask = document.getElementById('removeTask');
    removeTask.style.display = removeTask.style.display === 'block' ? 'none' : 'block';
}

// Function to add a new task to the list
function addTask() {
    const task = document.getElementById('taskInputField').value;

    if (task !== "") {
        taskId++;
        const newTask = document.createElement('button');
        newTask.id = 'task-' + taskId;

        newTask.addEventListener('click', function() {
            this.classList.toggle('active');
        });

        const idElement = document.createElement('div');
        idElement.classList.add('task-id');
        idElement.textContent = `${taskId}`;

        const textElement = document.createElement('div');
        textElement.classList.add('task-text');
        textElement.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', function() {
            removeTask(this);
        });

        newTask.appendChild(idElement);
        newTask.appendChild(textElement);
        newTask.appendChild(deleteButton);

        const newTaskLi = document.createElement('li');
        newTaskLi.id = 'item-' + taskId;
        newTaskLi.appendChild(newTask);
        document.getElementById('taskList').appendChild(newTaskLi);

        document.getElementById('taskInputField').value = "";
    } else {
        alert("Please enter a task.");
    }
}

// Function to remove a task using the remove button
function removeTask(deleteButton) {
    const taskToRemove = deleteButton.parentElement.parentElement;

    if (taskToRemove) {
        taskToRemove.remove();
        updateTask();
    }
}

// Function to update the IDs of the remaining tasks
function updateTask() {
    const taskList = document.getElementById('taskList').getElementsByTagName('li');
    let newID = 1;

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i].getElementsByTagName('button')[0];
        task.id = 'task-' + newID;
        taskList[i].id = 'item-' + newID;

        const idElement = task.getElementsByClassName('task-id')[0];
        if (idElement) {
            idElement.textContent = newID;
        }

        newID++;
    }

    taskId = newID - 1; // Update global counter to the last assigned ID
}

// Function to remove a task by its manually entered ID
function removeTaskById() {
    const taskId = document.getElementById('remove').value;
    const taskToRemove = document.getElementById('item-' + taskId);

    if (taskToRemove) {
        taskToRemove.remove();
        document.getElementById('remove').value = "";
        updateTask(); // Call the update function after removal
    } else {
        alert("Task with the specified ID was not found.");
    }
}

// Call the update function when the page loads to initialize IDs correctly
updateTask();
