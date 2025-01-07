// References
const inputBox = document.getElementById('input-box');
const categorySelect = document.getElementById('category-select');
const listContainer = document.getElementById('list-container');
const taskCounter = document.getElementById('task-counter');
const progressBar = document.querySelector('.progress');
const progressLabel = document.getElementById('progress-label');

// Add Task
function addTask() {
    const taskText = inputBox.value.trim();
    const category = categorySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `${taskText} <small>[${category}]</small> <span class="delete-btn" onclick="deleteTask(this)">✖</span>`;
    taskItem.onclick = toggleComplete;
    listContainer.appendChild(taskItem);

    inputBox.value = '';
    updateCounter();
    updateProgress();
}

// Delete Task
function deleteTask(deleteButton) {
    deleteButton.parentElement.remove();
    updateCounter();
    updateProgress();
}

// Toggle Completion
function toggleComplete() {
    this.classList.toggle('checked');
    updateCounter();
    updateProgress();
}

// Update Counter
function updateCounter() {
    const totalTasks = listContainer.children.length;
    const completedTasks = document.querySelectorAll('.checked').length;
    taskCounter.textContent = `Total: ${totalTasks} | Completed: ${completedTasks}`;
}

// Update Progress
function updateProgress() {
    const totalTasks = listContainer.children.length;
    const completedTasks = document.querySelectorAll('.checked').length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
    progressLabel.textContent = `Completion: ${Math.round(progress)}%`;
}

// Change Background
function changeBackground() {
    const colors = ['#3a6186', '#89253e', '#4e54c8', '#8f94fb', '#36d1dc'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('.container').style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor})`;
}

// Search Tasks
function searchTasks() {
    const query = document.getElementById('search-box').value.toLowerCase();
    Array.from(listContainer.children).forEach(task => {
        const text = task.textContent.toLowerCase();
        task.style.display = text.includes(query) ? '' : 'none';
    });
}
// Clear All Tasks
function clearTasks() {
    listContainer.innerHTML = ''; // Remove all tasks from the list
    inputBox.value = ''; // Clear the input box
    document.getElementById('search-box').value = ''; // Clear the search box
    updateCounter(); // Update task counter
    updateProgress(); // Reset progress bar
}

