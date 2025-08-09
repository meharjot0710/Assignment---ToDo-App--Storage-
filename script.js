const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    if (task.completed) taskDiv.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    const taskText = document.createElement("span");
    taskText.textContent = task.name;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newName = prompt("Update task name:", task.name);
      if (newName) {
        tasks[index].name = newName;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
  });
}

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName) {
      tasks.push({ name: taskName, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  }
});

renderTasks();
