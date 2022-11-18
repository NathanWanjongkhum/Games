// Dependencies
import { stylingData, tasksBase } from "./Base_Data.js";
import Task from "./Task.js";

// DOM Cache
const taskRowTemplate = document.getElementById("task-row-template");
const rowHeaderTemplate = document.getElementById("row-header-template");

const ageText = document.getElementById("age");
const pauseButton = document.getElementById("pause-button");
const navbar = document.getElementById("navbar");
const importExportBox = document.getElementById("importExportBox");

const tabsCollection = {
  // Depopulate namespace, simplifies names, packages related info
  wrapper: null,
  links: [],
  panels: [],
};

// Game state
var assets = {
  money: 0,
  age: 14 * 365,
  happiness: 1,
};
var tasks = {
  active: {},
  available: {},
};

var paused = false;

// Service functions
function toggleGameFreeze() {
  paused = !paused;

  pauseButton.innerText = paused ? "Play" : "Pause";
}

function capitalizeFirstLetters(string) {
  const text = string
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return text;
}
function formatAge() {
  const years = Math.floor(assets.age / 365);
  const days = Math.round(assets.age % 365);
  return `Age ${years} Day ${days}`;
}
function formatTaskOutput(task) {
  switch (task.type) {
    case "skills":
      return formatEffect(task.getOutput(), task.target);
    case "jobs":
      return formatMoney(task.getOutput());
    default:
      break;
  }
}
function formatMoney(value) {
  return value;
}
function formatEffect(value, effect) {
  return `x${value} ${effect}`;
}

// Continous functions
function tick() {
  // Potential for setInterval() to collide with itself and delay next execution
  // With requestAnimationFrame() loop on completion or every 1/60 (60fps)

  if (!paused) {
    const daysElaspsed = 0.028; // getDaysElapsed();

    update(daysElaspsed);
  }

  requestAnimationFrame(tick);
}
function update(daysElaspsed) {
  assets.age += daysElaspsed;
  ageText.textContent = formatAge();

  updateRows(daysElaspsed);
}
function updateRows(daysElaspsed) {
  for (const group in tasks.active) {
    const task = tasks.active[group];

    task.increaseXp(daysElaspsed);
    task.getOutput();

    updateRow(task);
  }
}
function updateRow(task) {
  task.fill.style.width = (task.xp / task.getMaxXp()) * 100 + "%";

  const cells = task.element.children;

  cells[1].textContent = task.level;
  cells[2].textContent = formatTaskOutput(task);
  cells[3].textContent = task.getXpGain();
  cells[4].textContent = task.getXpLeft();
  if (task.highestLevel > 0) cells[5].textContent = task.highestLevel;
}
// Tabs logic
function selectTab(key) {
  try {
    const selectedTabPanel = tabsCollection.panels.find(
      (panel) => panel.getAttribute("aria-labelledby") === key
    );

    if (!selectedTabPanel) throw "unknown panel";

    const selectedTab = tabsCollection.links.find(
      (link) => link.getAttribute("id") === key
    );

    if (!selectedTabPanel) throw "unknown tab";

    tabsCollection.panels.forEach((panel) => (panel.hidden = true));
    tabsCollection.links.forEach((link) =>
      link.setAttribute("aria-selected", false)
    );

    selectedTabPanel.hidden = false;
    selectedTab.setAttribute("aria-selected", true);
  } catch (error) {
    console.log(error);
  }
}

function createTabs() {
  tabsCollection.panels = Array.from(
    tabsCollection.wrapper.querySelectorAll("[role='tabpanel']")
  );

  tabsCollection.panels.forEach((panel) => {
    const name = panel.getAttribute("aria-labelledby");
    createTab(navbar, name);
  });

  tabsCollection.links = Array.from(
    tabsCollection.wrapper.querySelectorAll("[role='tab']")
  );
}
function createTab(location, name) {
  const a = document.createElement("a");
  a.setAttribute("role", "tab");
  a.addEventListener("click", () => selectTab(name));
  a.innerText = capitalizeFirstLetters(name);
  a.id = name;

  location.appendChild(a);
}

// Task Logic
function getTaskBase(type, group, name) {
  try {
    const task = tasksBase[type][group][name];
    if (!task) throw "missing task";

    return task;
  } catch (error) {
    console.log(error);
  }
}
function createNewTask(type, group, name) {
  const data = getTaskBase(type, group, name);

  const taskData = {
    name: name,
    type: type,
    group: group,
    description: data.description,
    xpScale: data.xpScale,
  };

  createTask(taskData, name);
}
function createTask(taskData) {
  if (tasks.available[taskData.name]) return;

  const task = new Task(taskData);
  setTaskElements(task);

  updateRow(task);

  tasks.available[task.name] = task;
}

function selectTask(type, name) {
  try {
    const previousTask = tasks.active[type];
    const newTask = tasks.available[name];
    if (!newTask) throw "missing item";

    if (previousTask) previousTask.fill.classList.remove("current");
    newTask.fill.classList.add("current");

    // previous task is ref so need to restate
    tasks.active[type] = newTask;
  } catch (error) {
    console.log(error);
  }
}

function setTaskElements(task) {
  task.element = createTaskRow(task.type, task.group, task.name);
  task.fill = task.element.querySelector(".progressbar-fill");
}

function createTaskGroup(type, group) {
  const container = document.createElement("tbody");
  container.id = group;

  createHeaderRow(container, type, group);

  const table = document.getElementById(type + "-table");
  table.appendChild(container);

  return container;
}
function createHeaderRow(location, type, group) {
  const row = rowHeaderTemplate.content.firstElementChild.cloneNode(true);
  row.style.backgroundColor = `var(--common)`;

  const children = row.children;
  children[0].innerText = capitalizeFirstLetters(group);
  children[2].innerText = stylingData[type];

  location.appendChild(row);

  return row;
}
function createTaskRow(type, group, name) {
  const row = taskRowTemplate.content.firstElementChild.cloneNode(true);
  row.classList.add("row");
  row.classList.add(type + "-row");

  row
    .querySelector(".progressbar")
    .addEventListener("click", () => selectTask(type, name));
  row.querySelector(".progressbar-text").innerText =
    capitalizeFirstLetters(name);

  const rowGroup =
    document.getElementById(group) || createTaskGroup(type, group);

  rowGroup.appendChild(row);

  return row; // In cases where need elem on init
}

// Data persistence
function saveData() {
  // These data structs are unrelated and shouldnt be packaged under a larger struct
  // Instead we can develop with data seperated then bundle then before export
  // Development-wise avoids traversing from a higher level and avoids confusion on relations

  const data = {
    assets: assets,
    tasks: tasks,
  };

  localStorage.setItem("data", window.btoa(JSON.stringify(data)));
}
function loadData(string) {
  if (!string) return true;
  const data = JSON.parse(window.atob(string));
  if (!data) return true;

  assets = data["assets"];

  for (const categoryName in data["tasks"]) {
    const taskObjects = data["tasks"][categoryName];

    for (const taskName in taskObjects) {
      const taskData = taskObjects[taskName];

      createTask(taskData);

      if (categoryName === "active") {
        selectTask(taskData.type, taskData.name);
      }
    }
  }

  return false;
}
function resetData() {
  localStorage.clear();
  location.reload();
}
function importData() {
  loadData(importExportBox.value);
  saveData();
}
function exportData() {
  const data = {
    assets: assets,
    tasks: tasks,
  };

  importExportBox.value = window.btoa(JSON.stringify(data));
}

(function init() {
  // Get saved data
  const firstSession = loadData(localStorage.getItem("data"));

  // Get DOM
  tabsCollection.wrapper = document.getElementById("tab-wrapper");

  // Add DOM events
  pauseButton.addEventListener("click", toggleGameFreeze);
  document
    .getElementById("import-button")
    .addEventListener("click", importData);
  document
    .getElementById("export-button")
    .addEventListener("click", exportData);
  document.getElementById("reset-button").addEventListener("click", resetData);

  // Get keys
  window.addEventListener("keypress", (event) => {
    if (event.code === "32") toggleGameFreeze();
  });

  // Load Content
  createTabs();

  // Set base state
  selectTab("skills");

  if (firstSession) {
    // Generate base data
    createNewTask("jobs", "common", "beggar");

    createNewTask("skills", "fundamentals", "concentration");
    createNewTask("skills", "fundamentals", "productivity");
    createNewTask("skills", "combat", "strength");

    selectTask("skills", "concentration");
    selectTask("jobs", "beggar");
  }

  // Start loops
  setInterval(saveData, 1000 * 30);
  requestAnimationFrame(tick);
})();
