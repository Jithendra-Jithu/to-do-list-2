// References
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const taskCounter = document.getElementById('task-counter');

// Load tasks from localStorage
window.onload = () => {
    loadTasks();
    updateCounter();
};

// Add a task
function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        taskItem.remove();
        saveTasks();
        updateCounter();
    };

    taskItem.appendChild(deleteBtn);
    taskItem.onclick = () => {
        taskItem.classList.toggle('checked');
        saveTasks();
        updateCounter();
    };

    listContainer.appendChild(taskItem);
    inputBox.value = '';
    saveTasks();
    updateCounter();
}

// Update task counter
function updateCounter() {
    const totalTasks = listContainer.children.length;
    const completedTasks = document.querySelectorAll('.checked').length;
    taskCounter.textContent = `Total: ${totalTasks} | Completed: ${completedTasks}`;
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    listContainer.childNodes.forEach(task => {
        tasks.push({
            text: task.textContent.slice(0, -1), // Remove delete button text
            checked: task.classList.contains('checked'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        if (task.checked) {
            taskItem.classList.add('checked');
        }

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            taskItem.remove();
            saveTasks();
            updateCounter();
        };

        taskItem.appendChild(deleteBtn);
        taskItem.onclick = () => {
            taskItem.classList.toggle('checked');
            saveTasks();
            updateCounter();
        };

        listContainer.appendChild(taskItem);
    });
}

// Clear all tasks
function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        listContainer.innerHTML = '';
        saveTasks();
        updateCounter();
    }
}
