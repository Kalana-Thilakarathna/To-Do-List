import { v4 as uuidV4 } from "uuid";
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks : Task[] = loadTasks()
tasks.forEach(addTask)
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdDate: Date;
};

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdDate: new Date(),
  };

  addTask(newTask)
  saveTask()
  input.value=""
});

function addTask(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change",() => {
    task.completed = checkbox.checked
    console.log(tasks)
    saveTask()
  })
  tasks.push(task)
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTask(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const tasksJson = localStorage.getItem("TASKS")
    if (tasksJson == null) return []
    return JSON.parse(tasksJson)
}
