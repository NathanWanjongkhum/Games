export default class Task {
  constructor(name, xpScale) {
    this.name = name;
    this.xpScale = xpScale;
    this.xp = 0;
    this.level = 0;
    this.highestLevel = 0;

    this.element = undefined;
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

  increaseXp(daysElaspsed) {
    let excess = this.xp + this.getXpGain() * daysElaspsed;

    while (excess >= this.getMaxXp()) {
      excess -= this.getMaxXp();
      this.level += 1;
    }

    this.xp = excess;
  }

  update() {
    this.element.querySelector(".progressbar-fill").style.width =
      (this.getMaxXp - this.xp) * 100 + "%";

    const cells = this.element.children;

    cells[1].textContent = this.level;
    cells[2].textContent = this.getXpGain();
    cells[3].textContent = this.getXpLeft();
    cells[4].textContent = this.highestLevel;
  }
}
