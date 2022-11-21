// Dependencies
import { taskBaseState, tasksBaseData } from "./Base_Data.js";

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
  active: new Set(),
  available: new Map(),
};

const multiplierMaps = {};

const updateSpeed = 20;

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

function addMultiplier(description, multiplier) {
  const [bucketName, effectName] = description.split(" ");

  if (!multiplierMaps[bucketName]) multiplierMaps[bucketName] = {};
  const bucket = multiplierMaps[bucketName];

  if (!bucket[effectName]) bucket[effectName] = new Map();
  const effect = bucket[effectName];

  const index = effect.size;
  effect.set(index, multiplier);

  return index;
}
function getMultipliers(type, path) {
  const multipliers = path.reduce((array, directory) => {
    const bucket = multiplierMaps[directory];
    if (!bucket || !bucket[type]) return array;

    const multipliers = Array.from(bucket[type].values());
    return array.concat(multipliers);
  }, []);

  return multipliers;
}

// State Handlers
function increaseXp(task, daysElaspsed) {
  let excess = task.xp + getXpGain(task.id) * daysElaspsed;
  const MAX_XP = getMaxXp(task);

  while (excess >= MAX_XP) {
    excess -= MAX_XP;
    task.level += 1;
  }

  task.xp = excess;
}
function getXpGain(id) {
  const xpMultipliers = getMultipliers("xp", getPath(id));
  const xpGain = xpMultipliers.reduce(
    (accumulator, multiplier) => accumulator * (1 + multiplier),
    10
  );

  return xpGain;
}
function getMaxXp(task) {
  return Math.round(
    task.xpScale * (task.level + 1) * Math.pow(1.01, task.level)
  );
}
function getXpLeft(task) {}

// Component Handlers
function updateComponent(task) {
  // task.style.width = (task.xp / getMaxXp(task)) * 100 + "%";

  const cells = task.component.children;

  cells[1].textContent = task.level;
  cells[2].textContent = formatTaskOutput(task);
  cells[3].textContent = getXpGain(task.id);
  cells[4].textContent = getXpLeft(task);
  if (task.highestLevel > 0) cells[5].textContent = task.highestLevel;
}

function createEntity(id, state, component) {
  const stateObject = Object.assign(state, taskBaseState);

  const entity = {
    id: id,
    state: stateObject,
    component: component,
  };

  return entity;
}
function createTask(id) {
  const ID = id;
  const STATE = getState(ID);
  const COMPONENT = getComponent("task");

  const entity = createEntity(ID, STATE, COMPONENT);

  tasks.available.set(entity.id, entity);

  if (entity.state.hasOwnProperty("description"))
    entity.state.multi_index = addMultiplier(
      entity.state.description,
      entity.state.multi
    );
}

function getTask(id) {
  return tasks.available.get(id);
}
function getComponent(type) {
  const component = document
    .getElementById(type + "-row-template")
    .content.firstElementChild.cloneNode(true);

  return component;
}
function getState(id) {
  const [type, group, name] = getPath(id);
  const state = tasksBaseData[type][group][name];
  return state;
}
function getPath(id) {
  const dir = id.split("/");
  return dir;
}

function activateTask(ID) {
  const DIRECTORY_TYPE = ID.substring(0, ID.indexOf("/"));
  const MATCHES = Array.from(tasks.active).filter((id) =>
    id.startsWith(DIRECTORY_TYPE)
  );

  if (MATCHES.length) MATCHES.forEach((match) => tasks.active.delete(match));

  tasks.active.add(ID);
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

function update() {
  const daysElaspsed = 1;
  tasks.active.forEach((task) => updateTask(task, daysElaspsed));
}
function updateTask(task, daysElaspsed) {
  increaseXp(task, daysElaspsed);
  updateComponent(task);
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
  tasks = data["tasks"];

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

  // Generate base data
  if (firstSession) {
    createTask("jobs/common/beggar");

    createTask("skills/fundamentals/concentration");
    createTask("skills/fundamentals/productivity");
    createTask("skills/combat/strength");

    activateTask("skills/concentration");
    activateTask("jobs/beggar");
  }

  // Start loops
  setInterval(saveData, 1000 * 30);
  setInterval(update, 1000 / updateSpeed);
})();
