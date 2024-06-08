// Initialize an empty array to store tasks
let tasks = [];

// Function to add a new task
function addTask() 
{
  // Get the task input element and trim the text
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  // Check if the input is not empty
  if (taskText !== '') 
  {
    // Push a new task object to the tasks array
    tasks.push({ text: taskText, completed: false });

    // Call the displayTasks function to update the UI
    displayTasks();

    // Clear the task input field
    taskInput.value = '';
  }
}

// Function to toggle the completion status of a task
function toggleTask(index) 
{
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Function to delete a task
function deleteTask(index) 
{
  tasks.splice(index, 1);
  displayTasks();
}

// Function to delete selected tasks
function deleteSelectedTasks() 
{
  tasks = tasks.filter(task => !task.completed);
  displayTasks();
}

// Function to toggle the completion status of all tasks
function selectAllTasks() 
{
  // Check if all tasks are already selected
  const areAllTasksSelected = tasks.every(task => task.completed);

  // Toggle the completion status of all tasks based on the current state
  tasks.forEach(task => {
    task.completed = !areAllTasksSelected;
  });

  // Update the UI after toggling tasks
  displayTasks();
}

// Function to display tasks on the UI
function displayTasks() 
{
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Loop through each task and create UI elements for display
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
 
    // Create a checkbox for task completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));
    li.appendChild(checkbox);

    // Create a span for task text
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) 
    {
      taskText.style.textDecoration = 'line-through';
    }
    li.appendChild(taskText);

    // Create a button to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    li.appendChild(deleteButton);

    // Append the task item to the task list
    taskList.appendChild(li);
  });

  // Create a "Select All" checkbox
  const selectAllCheckbox = document.createElement('input');
  selectAllCheckbox.type = 'checkbox';
  selectAllCheckbox.addEventListener('change', () => selectAllTasks());
  selectAllCheckbox.checked = tasks.length > 0 && tasks.every(task => task.completed);

  // Create a label for the "Select All" checkbox
  const selectAllLabel = document.createElement('label');
  selectAllLabel.textContent = 'Select All';
  selectAllLabel.insertBefore(selectAllCheckbox, selectAllLabel.firstChild);

  // Insert the "Select All" checkbox at the top of the task list
  taskList.insertBefore(selectAllLabel, taskList.firstChild);

  // Create a button to delete selected tasks
  const deleteSelectedButton = document.createElement('button');
  deleteSelectedButton.textContent = 'Delete Selected';
  deleteSelectedButton.addEventListener('click', deleteSelectedTasks);

  // Append the "Delete Selected" button to the task list
  taskList.appendChild(deleteSelectedButton);
}

// Initial display of tasks
displayTasks();
