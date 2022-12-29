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
    const multipliers = getMultipliers(tagType, this.path);
    const result = multipliers.reduce(
      (accumulator, multiplier) => accumulator * multiplier,
      base
    );

    return result;
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
    return this.combineMultipliers("xp", 10);
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
    assets.money += this.getIncome() * daysElaspsed;

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

  addXp(daysElaspsed) {
    const leveledUp = this.addXp_(daysElaspsed);

    if (leveledUp) {
      const selfEffect = getEffect(this.id, "output");
      const selfMultiplier = 1 + this.state.level / 100;
      setEffectMultiplier(selfEffect, "level", selfMultiplier);

      const outputEffect = getEffect(...this.state.description.split(" "));
      const outputMultiplier = this.combineMultipliers("output", 1);
      setEffectMultiplier(outputEffect, this.id, outputMultiplier);
    }
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

  formatEffect(value, effect) {
    // console.log(value, effect, multiplierMaps);
    return `x${format(value)} ${capitalizeFirstLetters(effect)}`;
  }

  update(daysElaspsed) {
    this.addXp(daysElaspsed);

    this.render();
  }
  render() {
    const cell = this.row.children;

    this.render_(cell);

    cell[2].textContent = this.formatEffect(
      this.combineMultipliers("output", 1),
      this.state.description
    );
  }
}
