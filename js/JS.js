let addBtn = document.querySelector("#add-task");
let input = document.querySelector("input");
let taskList = document.querySelector(".list");
let tasks;
if (!localStorage.getItem("todo")) {
  tasks = [];
} else {
  tasks = getTasks();
}
if (tasks.length > 0) {
  window.addEventListener("load", showTasks);
}

addBtn.addEventListener("click", () => {
  let text = input.value;
  createTask(text);
  saveTasks(text);
  input.value = "";
});

taskList.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    let target = e.target.parentElement.parentElement;
    target.style = "display : none";
    tasks.splice(tasks.indexOf(target.textContent), 1);
    localStorage.setItem("todo", tasks);
  }
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("done");
  }
});

function createTask(text) {
  // if (input.value.length > 0) {
  let li = document.createElement("li");
  li.textContent = text;
  li.innerHTML +=
    '<span class="closeBtn"><i class="fa-solid fa-trash-can"></i></span>';
  taskList.appendChild(li);
  return li;
  // }
}
function saveTasks(text) {
  tasks.push(text);
  localStorage.setItem("todo", tasks);
}
function getTasks() {
  return localStorage.getItem("todo").split(",");
}
function showTasks() {
  for (let taskText of getTasks()) {
    createTask(taskText);
  }
}
