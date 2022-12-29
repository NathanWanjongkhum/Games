// DOM Cache
const taskHeaderRowTemplate = document.getElementById(
  "task-header-row-template"
);
const taskRowTemplate = document.getElementById("task-row-template");
const itemHeaderRowTemplate = document.getElementById(
  "item-header-row-template"
);
const itemRowTemplate = document.getElementById("item-row-template");
const requiredRowTemplate = document.getElementById("required-row-template");

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
var assets = {};

var tasks = {};
var items = {};
var settings = {};

var multiplierMaps = {};

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

function format(number, decimals = 2) {
  return {
    standard: toStandard,
    scientific: toScientific,
    engineering: toEngineering,
  }[settings.numberNotation].apply(null, [number]);

  function toStandard(value) {
    const suffixes = [
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

    const tier = (Math.log(value) / Math.log(1000)) | 0;
    if (tier > suffixes.length) return toScientific(value);

    let coefficent = (value / Math.pow(1000, tier)).toFixed(decimals);
    let suffix = suffixes[tier];

    return coefficent + suffix;
  }
  function toScientific(value) {
    return value.toExponential(decimals);
  }
  function toEngineering(value) {
    // SI pre
    const suffixes = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    const tier = (Math.log(value) / Math.log(1000)) | 0;
    if (tier > suffixes.length) return toScientific(value);

    let coefficent = (value / Math.pow(1000, tier)).toFixed(decimals);

    let suffix = suffixes[tier] || e;

    return coefficent + suffix;
  }
}
function formatAge() {
  const years = Math.floor(assets.age / 365);
  const days = Math.round(assets.age % 365);
  return `Age ${format(years, 0)} Day ${days}`;
}
function formatTaskOutput(task, elem) {
  const { level, multi, description } = task.state;

  const type = getPath(task.id)[0];

  switch (type) {
    case "skills":
      elem.textContent = formatEffect(1 + level * multi, description);
      break;
    case "jobs":
      if (elem.children.length === 0) elem.appendChild(initCoinText());

      const format = formatCoins(multi);

      for (let i = 0; i < elem.children.length; i++) {
        elem.children[i].textContent = format[i];
      }
      break;
    default:
      break;
  }
}
function formatCoins(value) {
  const platinum = (value / 1e6) | 0;

  let formatted = [];
  if (platinum < 1e4) {
    const gold = ((value % 1e6) / 1e4) | 0;
    const silver = ((value % 1e4) / 100) | 0;
    const copper = value % 100 | 0;

    const currencys = [platinum, gold, silver, copper];
    const currencySuffix = ["p", "g", "s", "c"];

    currencys.forEach((currency, index) => {
      formatted.push(currency ? currency + currencySuffix[index] : undefined);
    });
  } else {
    // Only largest denomination needs formatting
    const notated = format(platinum, 0);
    formatted[0] = notated + "p";
  }

  return formatted;
}
function createCoinText() {
  const fragment = document.createDocumentFragment();

  const units = ["platinum", "gold", "silver", "copper"];

  for (let i = 0; i <= units.length - 1; i++) {
    const unit = units[i];
    const node = document.createElement("span");
    node.style.color = `var(--${unit})`;

    fragment.appendChild(node);
  }

  return fragment;
}
function handleCoinText(container, coins) {
  const formattedCoins = formatCoins(coins);

  if (container.children.length === 0) container.appendChild(createCoinText());
  const text = container.children;

  for (let i = 0; i < text.length; i++) {
    text[i].textContent = formattedCoins[i] || "";
  }
}

function setEffectMultiplier(effect, key, multiplier) {
  effect.set(key, multiplier);
  tasks.available.forEach((task) => task.render());
}
function getMultipliers(type, tags) {
  const multipliers = tags.reduce((array, directory) => {
    const bucket = multiplierMaps[directory];
    if (!bucket || !bucket[type]) return array;

    const multipliers = Array.from(bucket[type].values());
    return array.concat(multipliers);
  }, []);

  return multipliers;
}
function getEffect(bucketName, effectName) {
  multiplierMaps[bucketName] = multiplierMaps[bucketName] ?? {};
  const bucket = multiplierMaps[bucketName];

  bucket[effectName] = bucket[effectName] ?? new Map();
  const effect = bucket[effectName];

  return effect;
}

function getTask(id) {
  return tasks.available.get(id);
}
function getItem(id) {
  return items.available.get(id);
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

function selectTask(id) {
  const task = getTask(id);
  const taskType = task.path[0];

  const previousTask = tasks.active.get(taskType);

  tasks.active.set(taskType, task);

  if (previousTask) previousTask.progressbar.classList.remove("current");
  task.progressbar.classList.add("current");
}

function selectItem(id) {
  const ITEM_REF = getItem(id);
  tasks.active.add(ITEM_REF);
}

function update() {
  const daysElaspsed = 1;

  updateAge(daysElaspsed);

  tasks.active.forEach((task) => task.update(daysElaspsed));
}

function updateAge(daysElaspsed) {
  assets.age += daysElaspsed;
  ageText.textContent = formatAge();
}

// Data persistence
function saveData() {
  // These data structs are unrelated and shouldnt be packaged under a larger struct
  // Instead we can develop with data seperated then bundle then before export
  // Development-wise avoids traversing from a higher level and avoids confusion on relations

  const data = {
    assets: assets,
    tasks: formatTypeForSave(tasks),
    items: formatTypeForSave(items),
    settings: settings,
  };

  localStorage.setItem("data", window.btoa(JSON.stringify(data)));

  function formatTypeForSave(type) {
    return {
      active: [...type.active],
      available: [...type.available.entries()],
    };
  }
}
function loadData(string) {
  if (!string) return true;
  const data = JSON.parse(window.atob(string));
  if (!data) return true;

  assets = data["assets"];
  tasks = prepareType("tasks");
  items = prepareType("items");
  settings = data["settings"];

  tasks.available.forEach((task) => (task.component = createRow(task.path)));
  data["tasks"].active.forEach(({ id }) => selectTask(id));

  items.available.forEach((item) => (item.component = createRow(item.path)));
  data["items"].active.forEach(({ id }) => selectItem(id));

  return false;

  function prepareType(key) {
    return {
      active: new Set(),
      available: new Map(data[key].available),
    };
  }
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
  localStorage.clear();
  // Get saved data
  const firstSession = loadData(localStorage.getItem("data"));

  // Get DOM
  tabsCollection.wrapper = document.getElementById("tab-wrapper");

  // Load Content
  createTabs();

  // Add Events
  setupEvents();

  if (firstSession) {
    setupData();
    setupEntities();

    selectTask("beggar");
    selectTask("concentration");
  }

  // Set base state
  selectTab("jobs");

  tasks.available.forEach((task) => task.render());

  // Start loops
  setInterval(update, 1000 / updateSpeed);
  setInterval(saveData, 1000 * 5);
})();

function setupEntities() {
  /* Jobs */
  new Job("beggar");
  // /* Skills */
  new Skill("concentration");
  new Skill("productivity");
  new Skill("strength");
  // /* Items */
  // createItem("homeless");
  // createItem("book");
}
function setupData() {
  assets = { money: 0, age: 14 * 365, happiness: 1 };
  tasks = {
    active: new Map(),
    available: new Map(),
  };
  items = {
    active: new Map(),
    available: new Map(),
  };
  settings = { numberNotation: "standard" };
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
