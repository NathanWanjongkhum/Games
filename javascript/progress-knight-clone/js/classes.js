// Classes are great for dynamic data
// Some logic could be abstracted but additonal layers would be bloat and over-couple

function getData(path) {
  const [type, group, item] = path;
  const state = baseData[type][group][item];
  return state;
}
function getPath(id) {
  // We assume depth and empty proto because tasksBaseData is immuitable
  for (const [typeName, type] of Object.entries(baseData)) {
    for (const [groupName, group] of Object.entries(type)) {
      if (group.hasOwnProperty(id)) return [typeName, groupName, id];
    }
  }
  console.log("Missing path: ", id);
}

// Job & Skill are coupled because they have the same logic but different logic & rendering
class Task {
  constructor(id) {
    this.id = id;
    this.path = getPath(id);

    this.state = Object.assign({}, getData(this.path), {
      xp: 0,
      level: 0,
      highestLevel: 0,
    });

    this.row = document
      .getElementById("task-row-template")
      .content.firstElementChild.cloneNode(true);

    this.progressbar = this.row.querySelector(".progressbar-fill");

    this.row
      .querySelector(".progressbar")
      .addEventListener("click", () => selectTask(this.id));
    this.row.querySelector(".progressbar-text").innerText = this.state.name;

    tasks.available.set(this.id, this);

    this.render();
  }

  createGroup_() {
    const container = document.createElement("tbody");
    container.id = this.path[1];

    const table = document.getElementById(this.path[0] + "-table");
    table.appendChild(container);

    return container;
  }
  createHeaderRow_() {
    const row = taskHeaderRowTemplate.content.firstElementChild.cloneNode(true);
    row.style.backgroundColor = stylingData["colors"][this.path[1]];

    return row;
  }

  combineMultipliers(tagType, base) {
    return combineMultipliers(base, tagType, this.path);
  }

  addXp_(daysElaspsed) {
    let excess = this.state.xp + this.getXpGain() * daysElaspsed;

    const MAX_XP = this.getMaxXp();
    const leveledUp = excess >= MAX_XP;

    while (excess >= MAX_XP) {
      excess -= MAX_XP;
      this.state.level += 1;
    }

    this.state.xp = excess;

    return leveledUp;
  }
  getXpGain() {
    const xpGain = this.combineMultipliers("xp", 10);
    return xpGain;
  }
  getMaxXp() {
    return Math.round(
      this.state.xpScale *
        (this.state.level + 1) *
        Math.pow(1.01, this.state.level)
    );
  }
  getXpLeft() {
    return Math.round(this.getMaxXp() - this.state.xp);
  }

  render_(cell) {
    this.progressbar.style.width =
      (this.state.xp / this.getMaxXp()) * 100 + "%";

    cell[1].textContent = this.state.level;
    cell[3].textContent = this.getXpGain().toFixed();
    cell[4].textContent = this.getXpLeft(this.state).toFixed();
    cell[5].textContent = this.state.highestLevel;
  }
}
class Job extends Task {
  constructor(id) {
    super(id);

    const parent = document.getElementById(this.path[1]) || this.createGroup();
    parent.appendChild(this.row);
  }

  createGroup() {
    const container = this.createGroup_();
    container.appendChild(this.createHeaderRow());
    return container;
  }
  createHeaderRow() {
    const row = this.createHeaderRow_();

    const children = row.children;
    children[0].innerText = this.state.name;
    children[2].innerText = "Income/day";

    return row;
  }

  addXp(daysElaspsed) {
    const leveledUp = this.addXp_(daysElaspsed);
    if (leveledUp) {
      const effect = getEffect(this.id, "pay");
      setEffectMultiplier(effect, "level", this.getLevelMultiplier());
    }
  }

  getIncome() {
    return this.combineMultipliers("pay", this.state.multi);
  }
  getLevelMultiplier() {
    return 1 + Math.log10(this.state.level + 1);
  }

  update(daysElaspsed) {
    this.addXp(daysElaspsed);
    assets.coins += this.getIncome() * daysElaspsed;

    this.render();
  }
  render() {
    const cell = this.row.children;

    this.render_(cell);

    handleCoinText(cell[2], this.getIncome());
  }
}
class Skill extends Task {
  constructor(id) {
    super(id);

    const parent = document.getElementById(this.path[1]) || this.createGroup();
    parent.appendChild(this.row);
  }

  createGroup() {
    const container = this.createGroup_();
    container.appendChild(this.createHeaderRow());
    return container;
  }
  createHeaderRow() {
    const row = this.createHeaderRow_();

    const children = row.children;
    children[0].innerText = this.state.name;
    children[2].innerText = "Effect";

    return row;
  }

  addXp(daysElaspsed) {
    const leveledUp = this.addXp_(daysElaspsed);

    if (leveledUp) {
      const skillEffect = getEffect(this.id, "output");
      const levelMultiplier = this.getLevelMultiplier();
      setEffectMultiplier(skillEffect, "level", levelMultiplier);

      const outputEffect = getEffect(...this.state.description.split(" "));
      const outputMultiplier = this.combineMultipliers("output", 1);
      setEffectMultiplier(outputEffect, this.id, outputMultiplier);
    }
  }

  getLevelMultiplier() {
    return 1 + this.state.level / 100;
  }

  update(daysElaspsed) {
    this.addXp(daysElaspsed);

    this.render();
  }
  render() {
    const cell = this.row.children;

    this.render_(cell);

    cell[2].textContent = formatEffect(
      this.combineMultipliers("output", 1),
      this.state.description
    );
  }
}

class Item {
  constructor(id) {
    this.id = id;
    this.path = getPath(id);

    this.state = getData(this.path);

    this.row = document
      .getElementById("item-row-template")
      .content.firstElementChild.cloneNode(true);

    this.row
      .querySelector(".item-button")
      .addEventListener("click", () => selectItem(this.id));
    this.row.querySelector(".name").textContent = this.state.name;

    this.signal = this.row.querySelector(".item-signal");

    const parent = document.getElementById(this.path[1]) || this.createGroup();
    parent.appendChild(this.row);

    items.available.set(this.id, this);

    this.render();
  }

  createGroup() {
    const container = document.createElement("tbody");
    container.id = this.path[1];

    container.appendChild(this.createHeaderRow());

    const table = document.getElementById("items-table");
    table.appendChild(container);

    return container;
  }
  createHeaderRow() {
    const row = itemHeaderRowTemplate.content.firstElementChild.cloneNode(true);
    row.style.backgroundColor = stylingData["colors"][this.path[1]];

    const cell = row.children;

    cell[0].textContent = capitalizeFirstLetters(this.path[1]);

    return row;
  }

  combineMultipliers(tagType, base) {
    return combineMultipliers(base, tagType, this.path);
  }

  getExpense() {
    const expenseMultipliers = getMultiplier("expenses");

    const expense = expenseMultipliers.reduce(
      (accumulator, multiplier) => accumulator * multiplier,
      this.state.expense
    );

    return expense;
  }

  render() {
    const cell = this.row.children;

    cell[2].textContent = formatEffect(
      this.combineMultipliers("output", this.state.multi),
      this.state.description || "Happiness"
    );

    handleCoinText(cell[3], this.getExpense());
  }
}

class Requirement {
  constructor(id) {
    this.id = id;
    this.requirements = requirements[id];

    this.row = document
      .getElementById("required-row-template")
      .content.firstElementChild.cloneNode(true);

    this.requirementsText = [];
  }

  requirementSatisfied(key) {
    delete this.requirements[key];
  }
  allRequirementsSatisfied() {}

  render() {
    for (const [key, value, index] of Object.entries(this.requirements)) {
      let span = this.requirementsText[index];

      if (!span) {
        span = document.createElement("span");
        this.requirementsText.push(span);
      }

      switch (key) {
        case "coins":
          value <= assets.coins
            ? this.requirementSatisfied(key)
            : handleCoinText(span, value);
          break;
        case "evil":
          value <= assets.evil
            ? this.requirementSatisfied(key)
            : (span.textContent = format(value, 0) + "evil");
          break;

        default: /*task*/
          const task = getTask(key);

          // Task: X/Y
          value <= task.state.level
            ? this.requirementSatisfied()
            : (span.textContent = `${capitalizeFirstLetters(key)}: ${
                task.state.level
              }/${value} `);
          break;
      }
    }
  }
}
