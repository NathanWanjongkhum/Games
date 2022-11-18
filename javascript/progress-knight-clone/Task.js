export default class Task {
  constructor(props) {
    this.name = props.name;
    this.xpScale = props.xpScale;
    this.xp = props.xp || 0;
    this.level = props.level || 0;
    this.highestLevel = props.highestLevel || 0;

    this.type = props.type;
    this.group = props.group;

    this.target = props.description;
    this.multipliers = [];

    this.element = undefined;
    this.fill = undefined;
  }

  getOutput() {
    return this.multipliers.reduce(
      (accumulator, value) => accumulator + value,
      1
    );
  }

  getHighestLevelMultiplier() {
    return 1 + this.highestLevel / 10;
  }

  getMaxXp() {
    return Math.round(
      this.xpScale * (this.level + 1) * Math.pow(1.01, this.level)
    );
  }
  getXpLeft() {
    return Math.round(this.getMaxXp() - this.xp);
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
}
