import { skillBaseData } from "./Base_Data.js";
import Task from "./Task.js";

const taskRowTemplate = document.getElementById("task-row-template");

const ageText = document.getElementById("age");
const pauseButton = document.getElementById("pause-button");
const navbar = document.getElementById("navbar");

const skillsTable = document.getElementById("skills-table");
const importExportBox = document.getElementById("importExportBox");

// Depopulate namespace, simplifies names, packages related info
const tabsCollection = {
  wrapper: null,
  links: [],
  panels: [],
};

var paused = false;

var assets = {
  money: 0,
  age: 14 * 365,
  happiness: 1,
};
var tasks = {
  active: {},
  available: {},
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function formatAge() {
  const years = Math.floor(assets.age / 365);
  const days = Math.round(assets.age % 365);
  return `Age ${years} Day ${days}`;
}
function toggleGameFreeze() {
  paused = !paused;

  pauseButton.innerText = paused ? "Play" : "Pause";
}

// Original PK runs at 20/1000 or 1/50 (50fps) so every tick is only 1/3 a day
const ADJUST_TIME = 1 / 3;

function tick() {
  // Potential for setInterval() to collide with itself and delay next execution
  // With requestAnimationFrame() loop on completion or every 1/60 (60fps)

  // Recalculating every loop is wasteful (differance is +/- 0.002) and PK is day dependent anyways
  // const deltaTime = (timestamp - lastUpdate) / 1000;
  // An approximated interval also pervents an overrun tick from impacting calculations

  if (!paused) {
    const daysElaspsed = 1;

    update(daysElaspsed);
    render();
  }

  requestAnimationFrame(tick);
}
function update(daysElaspsed) {
  assets.age += daysElaspsed;
  console.log(assets.age);

  ageText.textContent = formatAge();

  for (const name in tasks.active) {
    const task = tasks.available[name];

    task.increaseXp(daysElaspsed);
    task.update();
  }
}
function render() {
  for (const name in tasks.available) {
  }
}

function createSkill(data) {
  const { name, xpScale, multi, description } = data;

  const task = new Task(name, xpScale);
  task.element = createSkillRow(task.name);

  task.update();

  tasks.available[task.name] = task;
}
function createSkillRow(name) {
  const row = taskRowTemplate.content.firstElementChild.cloneNode(true);
  row.id = name;
  row.classList.add("row");
  row.classList.add("skill-row");

  skillsTable.appendChild(row);

  return row; // In cases where need elem on init
}

function createTabs() {
  tabsCollection.panels = Array.from(
    tabsCollection.wrapper.querySelectorAll("[role='tabpanel']")
  );

  tabsCollection.panels.forEach((panel) => {
    const name = panel.getAttribute("aria-labelledby");
    createTab(name, navbar);
  });

  tabsCollection.links = Array.from(
    tabsCollection.wrapper.querySelectorAll("[role='tab']")
  );
}
function createTab(name, location) {
  const a = document.createElement("a");
  a.setAttribute("role", "tab");
  a.addEventListener("click", () => switchTab(name));
  a.innerText = capitalizeFirstLetter(name);
  a.id = name;

  location.appendChild(a);
}
function switchTab(key) {
  tabsCollection.panels.forEach((panel) => (panel.hidden = true));
  tabsCollection.links.forEach((link) =>
    link.setAttribute("aria-selected", false)
  );

  const selectedTabPanel = tabsCollection.panels.find(
    (panel) => panel.getAttribute("aria-labelledby") === key
  );
  const selectedTab = tabsCollection.links.find(
    (link) => link.getAttribute("id") === key
  );

  selectedTabPanel.hidden = false;
  selectedTab.setAttribute("aria-selected", true);
}

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
  if (!string) return;
  const data = JSON.parse(window.atob(string));
  if (!data) return;

  assets = data["assets"];
  tasks = data["tasks"];
}
function resetData() {
  localStorage.clear();
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
  loadData(localStorage.getItem("data"));

  tabsCollection.wrapper = document.getElementById("tab-wrapper");

  pauseButton.addEventListener("click", toggleGameFreeze);
  document
    .getElementById("import-button")
    .addEventListener("click", importData);
  document
    .getElementById("export-button")
    .addEventListener("click", exportData);
  document.getElementById("reset-button").addEventListener("click", resetData);

  window.addEventListener("keypress", (event) => {
    if (event.code === "32") toggleGameFreeze();
  });

  createTabs();

  createSkill(skillBaseData["Concentration"]);
  createSkill(skillBaseData["Strength"]);
  createSkill(skillBaseData["Concentration"]);

  requestAnimationFrame(tick);
})();
