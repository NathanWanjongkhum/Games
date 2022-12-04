// Dependencies
import { stylingData, taskBaseState, tasksBaseData } from "./BaseData.js";

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
  const path = getPath(task.id);
  switch (path[0]) {
    case "skills":
      return formatEffect(
        1 + task.state.level * task.state.multi,
        task.state.description
      );
    case "jobs":
      return formatMoney(task.state.multi);
    default:
      break;
  }
}
function format(number, decimals = 1) {
  const units = [
    "",
    "k",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "O",
    "N",
    "D",
    "Ud",
    "Dd",
    "Td",
    "Qad",
    "Qid",
    "Sxd",
    "Spd",
    "Od",
    "Nd",
    "V",
    "Uv",
    "Dv",
    "Tv",
    "Qav",
    "Qiv",
    "Sxv",
    "Spv",
    "Ov",
    "Nv",
    "Tr",
    "Ut",
    "Dt",
    "Tt",
  ];

  // what tier? (determines SI symbol)
  const tier = (Math.log10(number) / 3) | 0;
  if (tier <= 0) return number.toFixed(decimals);

  if (
    (gameData.settings.numberNotation == 0 || tier < 3) &&
    tier < units.length
  ) {
    // get suffix and determine scale
    const suffix = units[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(decimals) + suffix;
  } else {
    if (gameData.settings.numberNotation == 1)
      return number.toExponential(decimals).replace("e+", "e");
    else
      return math
        .format(number, { notation: "engineering", precision: 3 })
        .replace("e+", "e");
  }
}
function formatMoney(value) {
  const platinum = Math.floor(value / 1e6);
  const gold = Math.floor((value - platinum * 1e6) / 1e4);
  const silver = Math.floor((value - platinum * 1e6 - gold * 1e4) / 100);
  const copper = Math.floor(value - platinum * 1e6 - gold * 1e4 - silver * 100);

  return value;
}
function formatEffect(value, effect) {
  return `x${value.toFixed(2)} ${capitalizeFirstLetters(effect)}`;
}

function setMultiplier(state) {
  const [bucketName, effectName] = state.description.split(" ");
  const effect = validateMultiplier(bucketName, effectName);
  const index = state.multi_index || effect.size;

  effect.set(index, state.level * state.multi);
  return index;
}
function validateMultiplier(bucketName, effectName) {
  if (!multiplierMaps[bucketName]) multiplierMaps[bucketName] = {};
  const bucket = multiplierMaps[bucketName];

  if (!bucket[effectName]) bucket[effectName] = new Map();
  const effect = bucket[effectName];

  return effect;
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
function getXpGain(id) {
  const PATH = getPath(id);
  const xpMultipliers = getMultipliers("xp", PATH);
  const xpGain = xpMultipliers.reduce(
    (accumulator, multiplier) => accumulator * (1 + multiplier),
    10
  );

  return xpGain;
}
function getMaxXp(state) {
  return Math.round(
    state.xpScale * (state.level + 1) * Math.pow(1.01, state.level)
  );
}
function getXpLeft(state) {
  return Math.round(getMaxXp(state) - state.xp);
}

// Component Handlers
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
  const STATE = getState(id);
  const COMPONENT = createTaskRow(id);

  const entity = createEntity(id, STATE, COMPONENT);
  tasks.available.set(entity.id, entity);

  initTask(entity);
}

function initTask(task) {
  if (task.state.hasOwnProperty("description"))
    task.state.multi_index = setMultiplier(task.state);

  updateRow(task);
}

function getTask(id) {
  return tasks.available.get(id);
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

function activateTask(id) {
  const DIRECTORY_TYPE = id.substring(0, id.indexOf("/"));
  const MATCHES = Array.from(tasks.active).filter((_id) =>
    _id.startsWith(DIRECTORY_TYPE)
  );

  if (MATCHES.length)
    MATCHES.forEach((match) => {
      tasks.active.delete(match);
      getTask(match)
        .component.querySelector(".progressbar-fill")
        .classList.remove("current");
    });

  getTask(id)
    .component.querySelector(".progressbar-fill")
    .classList.add("current");
  tasks.active.add(id);
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
  row.style.backgroundColor = stylingData["task_color"][group];

  const children = row.children;
  children[0].innerText = capitalizeFirstLetters(group);
  children[2].innerText = stylingData["description"][type];

  location.appendChild(row);

  return row;
}
function createTaskRow(id) {
  const [type, group, name] = getPath(id);

  const row = taskRowTemplate.content.firstElementChild.cloneNode(true);
  row.classList.add("row");
  row.classList.add(type + "-row");

  row
    .querySelector(".progressbar")
    .addEventListener("click", () => activateTask(id));
  row.querySelector(".progressbar-text").innerText =
    capitalizeFirstLetters(name);

  const rowGroup =
    document.getElementById(group) || createTaskGroup(type, group);

  rowGroup.appendChild(row);

  return row; // In cases where need elem on init
}

function update() {
  const daysElaspsed = 1 / updateSpeed;

  assets.age += daysElaspsed;
  ageText.textContent = formatAge();

  tasks.active.forEach((id) => updateTask(id, daysElaspsed));
}
function updateTask(id, daysElaspsed) {
  const task = getTask(id);

  increaseXp(task, daysElaspsed);
  updateRow(task);
}

function increaseXp(task, daysElaspsed) {
  const state = task.state;
  const MAX_XP = getMaxXp(state);
  let excess = state.xp + getXpGain(task.id) * daysElaspsed;

  let flag = false;
  while (excess >= MAX_XP) {
    flag = true;
    excess -= MAX_XP;
    state.level += 1;
  }

  if (flag && state.description) {
    setMultiplier(state);
    tasks.available.forEach((task) => updateRow(task));
  }

  state.xp = excess;
}
function updateRow(task) {
  const state = task.state;
  task.component.querySelector(".progressbar-fill").style.width =
    (state.xp / getMaxXp(state)) * 100 + "%";

  const cells = task.component.children;

  cells[1].textContent = state.level;
  cells[2].textContent = formatTaskOutput(task);
  cells[3].textContent = getXpGain(task.id).toFixed();
  cells[4].textContent = getXpLeft(state).toFixed();
  cells[5].textContent = state.highestLevel;
}

// Data persistence
function saveData() {
  // These data structs are unrelated and shouldnt be packaged under a larger struct
  // Instead we can develop with data seperated then bundle then before export
  // Development-wise avoids traversing from a higher level and avoids confusion on relations

  const data = {
    assets: assets,
    tasks: {
      active: [...tasks.active],
      available: [...tasks.available.entries()],
    },
  };

  localStorage.setItem("data", window.btoa(JSON.stringify(data)));
}
function loadData(string) {
  if (!string) return true;
  const data = JSON.parse(window.atob(string));
  if (!data) return true;

  assets = data["assets"];
  tasks = {
    active: new Set(data["tasks"].active),
    available: new Map(data["tasks"].available),
  };

  tasks.available.forEach((task) => (task.component = createTaskRow(task.id)));

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
  setupEvents();

  // Load Content
  createTabs();

  // Set base state
  selectTab("skills");

  // Generate base data
  if (firstSession) setupData();
  activateTask("skills/fundamentals/concentration");
  activateTask("jobs/common/beggar");

  tasks.available.forEach((task) => initTask(task));

  // Start loops
  setInterval(update, 1000 / updateSpeed);
  setInterval(saveData, 1000 * 30);
})();

function setupData() {
  createTask("jobs/common/beggar");

  createTask("skills/fundamentals/concentration");
  createTask("skills/fundamentals/productivity");
  createTask("skills/combat/strength");
}
function setupEvents() {
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
}
