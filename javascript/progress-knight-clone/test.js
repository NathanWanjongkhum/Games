const colors = {
  copper: "#a15c2f",
  silver: "#a8a8a8",
  gold: "#e5c100",
  platinum: "#79b9c7",
};

setTimeout(callback, 1000);

const fragment = document.createDocumentFragment();

const units = ["copper", "silver", "gold", "platinum"];

units.reverse().forEach((unit) => {
  const node = document.createElement("span");
  node.id = unit;
  node.style.color = colors[unit];
  fragment.appendChild(node);
});
units.reverse();

const age = document.getElementById("age");
age.append(fragment);

function callback() {
  for (let i = 0; i < 1; i++) {
    const value = (Math.random() * 9999999).toFixed();
    update(value);
  }
}
let gameData = {
  settings: {
    numberNotation: 0,
  },
};
function format(number, decimals = 2) {
  const formatter = {
    0: toStandard,
    1: toScientific,
    2: toEngineering,
  }[gameData.settings.numberNotation].apply(null, [number]);

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

    const tier = Math.log10(number) | 0;
    if (tier > suffixes.length) return toScientific(value);

    let coefficent = (value / Math.pow(10, tier)).toFixed(decimals);

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
