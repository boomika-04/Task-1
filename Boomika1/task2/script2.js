const input = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const filters = document.querySelectorAll(".filters button");
    const remainingCount = document.getElementById("remaining-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function renderTasks() {
      taskList.innerHTML = "";
      let filteredTasks = tasks.filter(t => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      });
      filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
          <span>${task.text}</span>
          <button data-delete="${index}">❌</button>
        `;
        taskList.appendChild(li);
      });
      updateRemaining();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateRemaining() {
      let count = tasks.filter(t => !t.completed).length;
      remainingCount.textContent = `${count} task(s) left`;
    }

    addBtn.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        tasks.push({ text: input.value, completed: false });
        input.value = "";
        renderTasks();
      }
    });

    input.addEventListener("keypress", e => {
      if (e.key === "Enter") addBtn.click();
    });

    taskList.addEventListener("click", e => {
      if (e.target.type === "checkbox") {
        let index = e.target.dataset.index;
        tasks[index].completed = e.target.checked;
        renderTasks();
      }
      if (e.target.dataset.delete !== undefined) {
        let index = e.target.dataset.delete;
        tasks.splice(index, 1);
        renderTasks();
      }
    });

    filters.forEach(btn => {
      btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        renderTasks();
      });
    });

    renderTasks();