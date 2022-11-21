export const jobBaseData = Object.freeze({
  common: {
    beggar: { name: "Beggar", xpScale: 50, multi: 5 },
    farmer: { name: "Farmer", xpScale: 100, multi: 9 },
    fisherman: { name: "Fisherman", xpScale: 200, multi: 15 },
    miner: { name: "Miner", xpScale: 400, multi: 40 },
    blacksmith: { name: "Blacksmith", xpScale: 800, multi: 80 },
    merchant: { name: "Merchant", xpScale: 1600, multi: 150 },
  },
  military: {
    Squire: { name: "Squire", xpScale: 100, multi: 5 },
    Footman: { name: "Footman", xpScale: 1000, multi: 50 },
    "Veteran footman": { name: "Veteran footman", xpScale: 10000, multi: 120 },
    Knight: { name: "Knight", xpScale: 100000, multi: 300 },
    "Veteran knight": { name: "Veteran knight", xpScale: 1000000, multi: 1000 },
    "Elite knight": { name: "Elite knight", xpScale: 7500000, multi: 3000 },
    "Holy knight": { name: "Holy knight", xpScale: 40000000, multi: 15000 },
    "Legendary knight": {
      name: "Legendary knight",
      xpScale: 150000000,
      multi: 50000,
    },
  },
  "arcane association": {
    Student: { name: "Student", xpScale: 100000, multi: 100 },
    "Apprentice mage": {
      name: "Apprentice mage",
      xpScale: 1000000,
      multi: 1000,
    },
    Mage: { name: "Mage", xpScale: 10000000, multi: 7500 },
    Wizard: { name: "Wizard", xpScale: 100000000, multi: 50000 },
    "Master wizard": {
      name: "Master wizard",
      xpScale: 10000000000,
      multi: 250000,
    },
    Chairman: { name: "Chairman", xpScale: 1000000000000, multi: 1000000 },
    "Illustrious Chairman": {
      name: "Illustrious Chairman",
      xpScale: 7000000000000,
      multi: 1500000,
    },
  },
});
export const skillBaseData = Object.freeze({
  fundamentals: {
    concentration: {
      name: "Concentration",
      xpScale: 100,
      multi: 0.01,
      description: "skills xp",
    },
    productivity: {
      name: "Productivity",
      xpScale: 100,
      multi: 0.01,
      description: "jobs xp",
    },
    bargaining: {
      name: "Bargaining",
      xpScale: 100,
      multi: -0.01,
      description: "expenses",
    },
    meditation: {
      name: "Meditation",
      xpScale: 100,
      multi: 0.01,
      description: "happiness",
    },
  },
  combat: {
    strength: {
      name: "Strength",
      xpScale: 100,
      multi: 0.01,
      description: "military pay",
    },
    "battle tactics": {
      name: "Battle tactics",
      xpScale: 100,
      multi: 0.01,
      description: "military xp",
    },
    "muscle memory": {
      name: "Muscle memory",
      xpScale: 100,
      multi: 0.01,
      description: "strength xp",
    },
  },
  magic: {
    "mana control": {
      name: "Mana control",
      xpScale: 100,
      multi: 0.01,
      description: "A.A. xp",
    },
    immortality: {
      name: "Immortality",
      xpScale: 100,
      multi: 0.01,
      description: "lifespan",
    },
    "time warping": {
      name: "Time warping",
      xpScale: 100,
      multi: 0.01,
      description: "gamespeed",
    },
    "super immortality": {
      name: "Super immortality",
      xpScale: 100,
      multi: 0.01,
      description: "lifespan",
    },
    "novel knowledge": {
      name: "Novel Knowledge",
      xpScale: 100,
      multi: 0.01,
      description: "discovery xp",
    },
    "unusual insight": {
      name: "Unusual Insight",
      xpScale: 100,
      multi: 0.005,
      description: "magic xp",
    },
    "trade psychology": {
      name: "Trade Psychology",
      xpScale: 100,
      multi: 0.8,
      description: "merchant pay",
    },
    flow: {
      name: "Flow",
      xpScale: 800,
      multi: 0.001,
      description: "gamespeed",
    },
    "magical engineering": {
      name: "Magical Engineering",
      xpScale: 1000,
      multi: 0.01,
      description: "chairman xp",
    },
    "scales of thought": {
      name: "Scales Of Thought",
      xpScale: 1100,
      multi: 0.003,
      description: "magic xp",
    },
    "magical biology": {
      name: "Magical Biology",
      xpScale: 1500,
      multi: 0.005,
      description: "chairman xp",
    },
  },
  "dark magic": {
    "dark influence": {
      name: "Dark influence",
      xpScale: 100,
      multi: 0.01,
      description: "all xp",
    },
    "evil control": {
      name: "Evil control",
      xpScale: 100,
      multi: 0.01,
      description: "evil gain",
    },
    intimidation: {
      name: "Intimidation",
      xpScale: 100,
      multi: -0.01,
      description: "expenses",
    },
    "demon training": {
      name: "Demon training",
      xpScale: 100,
      multi: 0.01,
      description: "all xp",
    },
    "blood meditation": {
      name: "Blood meditation",
      xpScale: 100,
      multi: 0.01,
      description: "evil gain",
    },
    "demon's wealth": {
      name: "Demon's wealth",
      xpScale: 100,
      multi: 0.002,
      description: "jobs pay",
    },
  },
});

export const tasksBaseData = Object.freeze({
  jobs: jobBaseData,
  skills: skillBaseData,
});
export const taskBaseState = Object.freeze({
  xp: 0,
  level: 0,
  highestLevel: 0,
});

export const itemBaseData = Object.freeze({
  Properties: {
    Homeless: { name: "Homeless", expense: 0, multi: 1 },
    Tent: { name: "Tent", expense: 15, multi: 1.4 },
    "Wooden hut": { name: "Wooden hut", expense: 100, multi: 2 },
    Cottage: { name: "Cottage", expense: 750, multi: 3.5 },
    House: { name: "House", expense: 3000, multi: 6 },
    "Large house": { name: "Large house", expense: 25000, multi: 12 },
    "Small Manor": { name: "Small Manor", expense: 300000, multi: 25 },
    "Small palace": { name: "Small palace", expense: 5000000, multi: 60 },
    "Grand palace": { name: "Grand palace", expense: 190000000, multi: 135 },
  },
  Misc: {
    "Rag Clothing": {
      name: "Rag Clothing",
      expense: 3,
      multi: 1.5,
      description: "Skill xp",
    },
    Book: { name: "Book", expense: 10, multi: 1.5, description: "Skill xp" },

    Dumbbells: {
      name: "Dumbbells",
      expense: 50,
      multi: 1.5,
      description: "Strength xp",
    },
    "Personal squire": {
      name: "Personal squire",
      expense: 200,
      multi: 2,
      description: "jobs xp",
    },
    "Steel longsword": {
      name: "Steel longsword",
      expense: 1000,
      multi: 2,
      description: "Military xp",
    },
    Butler: {
      name: "Butler",
      expense: 7500,
      multi: 1.5,
      description: "Happiness",
    },
    "Sapphire charm": {
      name: "Sapphire charm",
      expense: 50000,
      multi: 3,
      description: "Magic xp",
    },
    "Study desk": {
      name: "Study desk",
      expense: 1000000,
      multi: 2,
      description: "Skill xp",
    },
    Library: {
      name: "Library",
      expense: 12000000,
      multi: 1.5,
      description: "Skill xp",
    },
    "Small Field": {
      name: "Small Field",
      expense: 130,
      multi: 5.0,
      description: "Farm upgrade",
    },
    "Ox-driven Plow": {
      name: "Ox-driven Plow",
      expense: 200,
      multi: 2.4,
      description: "Farm upgrade",
    },
    "Livestock-derived Fertilizer": {
      name: "Livestock-derived Fertilizer",
      expense: 20,
      multi: 1.2,
      description: "Farm upgrade",
    },
    "Cheap Fishing Rod": {
      name: "Cheap Fishing Rod",
      expense: 20,
      multi: 2.0,
      description: "Fishing upgrade",
    },
    "Miner's Lantern": {
      name: "Miner's Lantern",
      expense: 35,
      multi: 1.5,
      description: "Mining upgrade",
    },
    "Crappy Anvil": {
      name: "Crappy Anvil",
      expense: 50,
      multi: 1.5,
      description: "Blacksmith upgrade",
    },
    "Breech Bellows": {
      name: "Breech Bellows",
      expense: 130,
      multi: 1.8,
      description: "Blacksmith upgrade",
    },
    "Pack Horse": {
      name: "Pack Horse",
      expense: 80,
      multi: 3.0,
      description: "Merchant upgrade",
    },
    "Small Shop": {
      name: "Small Shop",
      expense: 600,
      multi: 1.5,
      description: "Merchant upgrade",
    },
    "Weapon Outlet": {
      name: "Weapon Outlet",
      expense: 3000,
      multi: 3.0,
      description: "Merchant upgrade",
    },
  },
});

export const stylingData = Object.freeze({
  jobs: "Income/day",
  skills: "Effect",
});
