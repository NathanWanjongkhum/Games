export const jobBaseData = Object.freeze({
  Beggar: { name: "Beggar", xpScale: 50, multi: 5 },
  Farmer: { name: "Farmer", xpScale: 100, multi: 9 },
  Fisherman: { name: "Fisherman", xpScale: 200, multi: 15 },
  Miner: { name: "Miner", xpScale: 400, multi: 40 },
  Blacksmith: { name: "Blacksmith", xpScale: 800, multi: 80 },
  Merchant: { name: "Merchant", xpScale: 1600, multi: 150 },

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

  "Junior Caretaker": { name: "Junior Caretaker", xpScale: 100000, multi: 15 },
  "Lead Caretaker": { name: "Lead Caretaker", xpScale: 1000000, multi: 115 },
  Freshman: { name: "Freshman", xpScale: 2000000, multi: 250 },
  Sophomore: { name: "Sophomore", xpScale: 4000000, multi: 500 },
  Junior: { name: "Junior", xpScale: 16000000, multi: 1000 },
  Senior: { name: "Senior", xpScale: 64000000, multi: 2000 },
  Probation: { name: "Probation", xpScale: 300000000, multi: 12000 },

  Baronet: { name: "Baronet", xpScale: 7500000, multi: 3500 },
  Baron: { name: "Baron", xpScale: 40000000, multi: 4500 },
  "Vice Count": { name: "Vice Count", xpScale: 160000000, multi: 6000 },
  Count: { name: "Count", xpScale: 640000000, multi: 8000 },
  Duke: { name: "Duke", xpScale: 2400000000, multi: 25000 },
  "Grand Duke": { name: "Grand Duke", xpScale: 9600000000, multi: 40000 },
  "Arch Duke": { name: "Arch Duke", xpScale: 40000000000, multi: 55000 },
  Lord: { name: "Lord", xpScale: 160000000000, multi: 150000 },
  "High Lord": { name: "High Lord", xpScale: 160000000000000, multi: 300000 },
  King: { name: "King", xpScale: 160000000000000, multi: 300000 },
  "High King": { name: "High King", xpScale: 160000000000000, multi: 1200000 },
  "Emperor of Mankind": {
    name: "Emperor of Mankind",
    xpScale: 160000000000000,
    multi: 2500000,
  },
});

export const skillBaseData = Object.freeze({
  Concentration: {
    name: "Concentration",
    xpScale: 100,
    multi: 0.01,
    description: "Skill xp",
  },
  Productivity: {
    name: "Productivity",
    xpScale: 100,
    multi: 0.01,
    description: "Job xp",
  },
  Bargaining: {
    name: "Bargaining",
    xpScale: 100,
    multi: -0.01,
    description: "Expenses",
  },
  Meditation: {
    name: "Meditation",
    xpScale: 100,
    multi: 0.01,
    description: "Happiness",
  },

  //Combat
  Strength: {
    name: "Strength",
    xpScale: 100,
    multi: 0.01,
    description: "Military pay",
  },
  "Battle tactics": {
    name: "Battle tactics",
    xpScale: 100,
    multi: 0.01,
    description: "Military xp",
  },
  "Muscle memory": {
    name: "Muscle memory",
    xpScale: 100,
    multi: 0.01,
    description: "Strength xp",
  },

  //Magic
  "Mana control": {
    name: "Mana control",
    xpScale: 100,
    multi: 0.01,
    description: "T.A.A. xp",
  },
  Immortality: {
    name: "Immortality",
    xpScale: 100,
    multi: 0.01,
    description: "Longer lifespan",
  },
  "Time warping": {
    name: "Time warping",
    xpScale: 100,
    multi: 0.01,
    description: "Gamespeed",
  },
  "Super immortality": {
    name: "Super immortality",
    xpScale: 100,
    multi: 0.01,
    description: "Longer lifespan",
  },

  //Mind
  "Novel Knowledge": {
    name: "Novel Knowledge",
    xpScale: 100,
    multi: 0.01,
    description: "Discovery xp",
  },
  "Unusual Insight": {
    name: "Unusual Insight",
    xpScale: 100,
    multi: 0.005,
    description: "Magical xp",
  },
  "Trade Psychology": {
    name: "Trade Psychology",
    xpScale: 100,
    multi: 0.8,
    description: "Merchant pay",
  },
  Flow: { name: "Flow", xpScale: 800, multi: 0.001, description: "Gamespeed" },
  "Magical Engineering": {
    name: "Magical Engineering",
    xpScale: 1000,
    multi: 0.01,
    description: "Chairman xp",
  },
  "Scales Of Thought": {
    name: "Scales Of Thought",
    xpScale: 1100,
    multi: 0.003,
    description: "Magical xp",
  },
  "Magical Biology": {
    name: "Magical Biology",
    xpScale: 1500,
    multi: 0.005,
    description: "Chairman xp",
  },

  "Dark influence": {
    name: "Dark influence",
    xpScale: 100,
    multi: 0.01,
    description: "All xp",
  },
  "Evil control": {
    name: "Evil control",
    xpScale: 100,
    multi: 0.01,
    description: "Evil gain",
  },
  Intimidation: {
    name: "Intimidation",
    xpScale: 100,
    multi: -0.01,
    description: "Expenses",
  },
  "Demon training": {
    name: "Demon training",
    xpScale: 100,
    multi: 0.01,
    description: "All xp",
  },
  "Blood meditation": {
    name: "Blood meditation",
    xpScale: 100,
    multi: 0.01,
    description: "Evil gain",
  },
  "Demon's wealth": {
    name: "Demon's wealth",
    xpScale: 100,
    multi: 0.002,
    description: "Job pay",
  },
});

export const itemBaseData = Object.freeze({
  Homeless: { name: "Homeless", expense: 0, multi: 1 },
  Tent: { name: "Tent", expense: 15, multi: 1.4 },
  "Wooden hut": { name: "Wooden hut", expense: 100, multi: 2 },
  Cottage: { name: "Cottage", expense: 750, multi: 3.5 },
  House: { name: "House", expense: 3000, multi: 6 },
  "Large house": { name: "Large house", expense: 25000, multi: 12 },
  "Small Manor": { name: "Small Manor", expense: 300000, multi: 25 },
  "Small palace": { name: "Small palace", expense: 5000000, multi: 60 },
  "Grand palace": { name: "Grand palace", expense: 190000000, multi: 135 },

  //Cameron's first addition: rag clothing. Woohoo!
  "Rag Clothing": {
    name: "Rag Clothing",
    expense: 3,
    multi: 1.5,
    description: "Skill xp",
  },
  Book: { name: "Book", expense: 10, multi: 1.5, description: "Skill xp" },
  "Basic Farm Tools": {
    name: "Basic Farm Tools",
    expense: 10,
    multi: 1.5,
    description: "Farm upgrade",
  },
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
    description: "Job xp",
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
});
