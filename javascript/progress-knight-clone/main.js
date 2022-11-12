import { skillBaseData } from "./Base_Data.js";

const taskRowTemplate = document.getElementById("task-row-template");
const skillsTable = document.getElementById("skills-table");

const assets = {
  money: 0,
  age: 14,
  happiness: 1,
};
const tasks = {
  active: new Map(),
  available: new Map(),
};

class Task {
  constructor(name, xpScale) {
    this.name = name;
    this.xpScale = xpScale;
    this.xp = 0;
    this.level = 0;
    this.highestLevel = 0;

    tasks.available.set(name, this);
  }

  getMaxXp() {
    return Math.round(
      this.xpScale * (this.level + 1) * Math.pow(1.01, this.level)
    );
  }

  getXpLeft() {
    return Math.round(this.getMaxXp() - this.xp);
  }

  getHighestLevelMultiplier() {
    return 1 + this.highestLevel / 10;
  }

  getXpGain() {
    return 10;
  }

  increaseXp(dt) {
    let excess = this.xp + this.getXpGain() * dt;

    while (excess >= this.getMaxXp()) {
      excess -= this.getMaxXp();
      this.level += 1;
    }

    this.xp = excess;
  }

  getElement() {
    return document.getElementById(this.name) || createSkillRow(this.name);
  }
}

function tick(timestamp, lastUpdate) {
  const deltaTime = (timestamp - lastUpdate) / 1000;

  update(deltaTime);
  render();

  lastUpdate = timestamp;

  requestAnimationFrame((timestamp) => tick(timestamp, lastUpdate));
}
function update(dt) {
  tasks.available.forEach((task) => {
    task.increaseXp(dt);
  });
}
function render() {
  // Elem is data dependent to increase saftey
  // (1) Data is Map so only 1 instance may exist
  // (2) Pervents empty elem from being created

  tasks.active.forEach((task) => {
    const row = task.getElement();

    updateSkillRow(row, task);
  });
}

function updateSkillRow(row, task) {
  const cells = row.children;

  cells.querySelector(".progressbar-fill").style.width =
    (task.getMaxXp - task.xp) * 100 + "%";
  cells[1].textContent = task.level;
  cells[2].textContent = task.getXpGain();
  cells[3].textContent = task.getXpLeft();
  cells[4].textContent = task.highestLevel;
}

function createSkill(data) {
  const { name, xpScale, multi, description } = data;

  const task = new Task(name, xpScale);
  const row = task.getElement();

  updateSkillRow(row, task);
}
function createSkillRow(name) {
  const row = taskRowTemplate.content.firstElementChild.cloneNode(true);
  row.id = name;
  row.classList.add("row");
  row.classList.add("skill-row");

  skillsTable.appendChild(row);

  return row; // In cases where need elem on init
}

function init() {
  createSkill(skillBaseData["Concentration"]);
  createSkill(skillBaseData["Strength"]);
  createSkill(skillBaseData["Concentration"]);

  requestAnimationFrame((timestamp) => tick(timestamp, 0));
}

init();
