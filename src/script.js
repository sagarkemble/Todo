import { createIcons, icons } from "lucide";
import { gsap } from "gsap";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });
const addTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".task-list");
const greeting = document.getElementById("gretting");
const tagLine = document.getElementById("tag-line");
const headingWrapper = document.querySelector(".heading-wrapper");
const greetingsArr = [
  "Hello",
  "Hi",
  "Hey",
  "Vanakkam",
  "Sat Sri Akal",
  "Kem Cho",
  "Hola",
  "नमस्ते",
  "नमस्कार",
  "प्रणाम",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "Namaste",
  "Konnichiwa",
  "Annyeong",
  "Nǐ hǎo",
  "Hej",
  "Ahoj",
  "Sawasdee",
  "Kamusta",
  "Privet",
];
const taglinesArr = [
  "One task at a time",
  "Let’s get things done",
  "Start small, finish big",
  "Focus on what matters",
  "Plan. Do. Done.",
  "Make today productive",
  "Clear tasks, clear mind",
  "Turn plans into progress",
  "One step closer today",
  "Stay focused. Stay sharp",
  "Progress starts here",
  "Small wins every day",
  "Organize your day",
  "Let’s finish something today",
  "Your tasks, your pace",
  "Today is a good day to finish things",
  "Little progress matters",
  "Make progress, not excuses",
  "One checkmark closer",
  "Keep moving forward",
];

//loading the local data
const taskObj = JSON.parse(localStorage.getItem("taskList")) || {};

//add task listner and function
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const id = Date.now();
  taskObj[id] = {
    id,
    taskText,
  };
  localStorage.setItem("taskList", JSON.stringify(taskObj));

  addTask(taskText, id);
  taskInput.value = "";
});
function addTask(text, id) {
  const task = document.createElement("div");
  task.className = "task";
  task.id = id;

  const checkBox = document.createElement("input");
  checkBox.classList = "checkbox";
  checkBox.type = "checkbox";

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("task-remove");
  closeBtn.innerHTML = `<i data-lucide="x" width="16" height="16"></i>`;

  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.innerText = text;

  if (taskObj[id].status) {
    checkBox.checked = true;
    taskText.classList.add("completed");
  } else {
    checkBox.checked = false;
    taskText.classList.remove("completed");
  }

  task.appendChild(checkBox);
  task.appendChild(taskText);
  task.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    task.remove();
    delete taskObj[id];
    localStorage.setItem("taskList", JSON.stringify(taskObj));
  });

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      taskObj[id].status = true;
      taskText.classList.add("completed");
    } else {
      taskObj[id].status = false;
      taskText.classList.remove("completed");
    }

    localStorage.setItem("taskList", JSON.stringify(taskObj));
  });

  task.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    if (
      e.target === checkBox ||
      e.target.parentElement === closeBtn ||
      e.target.parentElement.tagName === "svg"
    )
      return;

    checkBox.checked = !checkBox.checked;
    checkBox.dispatchEvent(new Event("change"));
  });
  taskList.prepend(task);
  createIcons({ icons });
}

//change gretting and tag line function and listner
async function changeGretting() {
  await fadeOut(headingWrapper);
  const grettingRandomNumber = Math.floor(Math.random() * greetingsArr.length);
  const tagLineRandomNumber = Math.floor(Math.random() * taglinesArr.length);
  greeting.innerText = `${greetingsArr[grettingRandomNumber]}`;
  tagLine.innerText = taglinesArr[tagLineRandomNumber];
  await fadeIn(headingWrapper);
}
headingWrapper.addEventListener("click", () => changeGretting());

//loading the local data
function loadTask() {
  for (const key in taskObj) {
    addTask(taskObj[key].taskText, taskObj[key].id);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  await changeGretting();
  await loadTask();
  fadeIn(document.body, 0.5);
});

//animations
function fadeOut(element, time = 0.2) {
  return new Promise((resolve) => {
    gsap.to(element, {
      opacity: 0,
      animation: "easeInOut",
      duration: time,
      onComplete: resolve,
    });
  });
}

function fadeIn(element, time = 0.2) {
  return new Promise((resolve) => {
    gsap.to(element, {
      opacity: 1,
      animation: "easeInOut",
      duration: time,
      onComplete: resolve,
    });
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installBtn").style.display = "block";
});
