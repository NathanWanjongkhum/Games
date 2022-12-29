const jobBaseData = Object.freeze({
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
const skillBaseData = Object.freeze({
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

const itemBaseData = Object.freeze({
  properties: {
    homeless: { name: "Homeless", expense: 0, multi: 1 },
    tent: { name: "Tent", expense: 15, multi: 1.4 },
    "wooden hut": { name: "Wooden hut", expense: 100, multi: 2 },
    cottage: { name: "Cottage", expense: 750, multi: 3.5 },
    house: { name: "House", expense: 3000, multi: 6 },
    "large house": { name: "Large house", expense: 25000, multi: 12 },
    "small manor": { name: "Small Manor", expense: 300000, multi: 25 },
    "small palace": { name: "Small palace", expense: 5000000, multi: 60 },
    "grand palace": { name: "Grand palace", expense: 190000000, multi: 135 },
  },
  misc: {
    book: { name: "Book", expense: 10, multi: 1.5, description: "skill xp" },
    dumbbells: {
      name: "Dumbbells",
      expense: 50,
      multi: 1.5,
      description: "strength xp",
    },
    "personal squire": {
      name: "personal squire",
      expense: 200,
      multi: 2,
      description: "jobs xp",
    },
    "steel longsword": {
      name: "Steel longsword",
      expense: 1000,
      multi: 2,
      description: "military xp",
    },
    butler: {
      name: "Butler",
      expense: 7500,
      multi: 1.5,
      description: "happiness",
    },
    "sapphire charm": {
      name: "Sapphire charm",
      expense: 50000,
      multi: 3,
      description: "magic xp",
    },
    "study desk": {
      name: "Study desk",
      expense: 1000000,
      multi: 2,
      description: "skill xp",
    },
    library: {
      name: "Library",
      expense: 12000000,
      multi: 1.5,
      description: "skill xp",
    },
  },
});

const baseData = Object.freeze({
  jobs: jobBaseData,
  skills: skillBaseData,
  items: itemBaseData,
});

const tooltips = Object.freeze({
  //Common work
  Beggar:
    "Struggle day and night for a couple of copper coins. It feels like you are at the brink of death each day.",
  Farmer:
    "Plow the fields and grow the crops. It's not much but it's honest work.",
  Fisherman:
    "Reel in various fish and sell them for a handful of coins. A relaxing but still a poor paying job.",
  Miner:
    "Delve into dangerous caverns and mine valuable ores. The pay is quite meager compared to the risk involved.",
  Blacksmith:
    "Smelt ores and carefully forge weapons for the military. A respectable and OK paying commoner job.",
  Merchant:
    "Travel from town to town, bartering fine goods. The job pays decently well and is a lot less manually-intensive.",

  //Military
  Squire:
    "Carry around your knight's shield and sword along the battlefield. Very meager pay but the work experience is quite valuable.",
  Footman:
    "Put down your life to battle with enemy soldiers. A courageous, respectable job but you are still worthless in the grand scheme of things.",
  "Veteran footman":
    "More experienced and useful than the average footman, take out the enemy forces in battle with your might. The pay is not that bad.",
  Centenary:
    "By proving your skills with a bow, you were appointed to lead a small group of archers to ambush your enemies from a distance.",
  Knight:
    "Slash and pierce through enemy soldiers with ease, while covered in steel from head to toe. A decently paying and very respectable job.",
  "Veteran Knight":
    "Utilising your unmatched combat ability, slaugher enemies effortlessly. Most footmen in the military would never be able to acquire such a well paying job like this.",
  "Holy Knight":
    "Obliterate squadrons of enemy soldiers in one go with extraordinary proficiency, while equipped magically imbued blade. Such a feared unit on the battlefield is paid extremely well.",
  "Lieutenant General":
    "Feared by nations, obliterate entire armies in a blink of an eye. Roughly every century, only one holy knight is worthy of receiving such an esteemed title.",

  //The Arcane Association
  Student:
    "Study the theory of mana and practice basic spells. There is minor pay to cover living costs, however, this is a necessary stage in becoming a mage.",
  "Apprentice Mage":
    "Under the supervision of a skilled mage, perform basic spells against enemies in battle. Generous pay will be provided to cover living costs.",
  "Adept Mage":
    "Turn the tides of battle through casting intermediate spells and mentor other apprentices. The pay for this particular job is extremely high.",
  "Master Wizard":
    "Utilise advanced spells to ravage and destroy entire legions of enemy soldiers. Only a small percentage of mages deserve to attain this role and are rewarded with an insanely high pay.",
  Archmage:
    "Blessed with unparalleled talent, perform unbelievable feats with magic at will. It is said that an archamge has enough destructive power to wipe an empire off the map.",
  Chronomancer:
    "Specialize in harnessing temporal energies that alter the flow of time with supernatural divinations and otherwordly expertise.",
  Chairman:
    "Spend your days administrating The Arcane Association and investigate the concepts of true immortality. The chairman receives ludicrous amounts of pay daily.",
  Imperator:
    "You wield an unlimited power, making you unstoppable. By ruling with an iron fist, everyone in the Arcane Association has to obey your commands.",

  //The Void
  Corrupted:
    "Corrupted by Void, you are slowly turning into a slave with no free will, just to serve the Void for the rest of eternity... Can you resist it, or will it consume you forever?",
  "Void Slave":
    "Each day you are succumbing to the Void more and more, can you hold to your humanity for a bit longer, or will you let it devour you?",
  "Void Fiend":
    "You become an inquisitive yet putrid creature that siphons life from everything around you.",
  "Abyss Anomaly":
    "Screaming into existence, you become a manifestation of the unknowable nothingness that lies beyond.",
  "Void Wraith":
    "Damned soul... a shadow of your former self, lingering between realms and consumed by void... can you ever find peace?",
  "Void Reaver":
    "There are few who may tread the paths between worlds, these powers grant you an ability to generate fields of void energy that devour all living things.",
  "Void Lord":
    "You gazed into the dark heart of the Void long enough to become one of the most powerful and feared beings, all lesser void creatures are at your command.",
  "Abyss God":
    "Creator of the Void, a vast canvas of blackness and nothingness, in which the concept of its existence defies all logic, nothing will escape you.",

  //Galactic Council
  "Eternal Wanderer":
    "With the powers bestowed upon you by an unknown entity you wander around, visiting places revered and feared in search of answers.",
  Nova: "Extremely powerful being with tremedous telekinetic powers and the ability to rearrange the molecular structure of matter and energy, even up to cosmic scale.",
  "Sigma Proioxis":
    "A nigh-omnipotent cosmological entity, with vast matter and energy manipulation abilities that help you push the boundaries of the Universe itself.",
  Acallaris:
    "Primordial being that predate the universe, involved with the creation of life and powerful beyond mortal comprehension, existing as myths to the oldest species in the universe.",
  "One Above All": "Creator of everything.",

  //Fundamentals
  Concentration:
    "Improve your learning speed through practising intense concentration activities.",
  Productivity:
    "Learn to procrastinate less at work and receive more job experience per day.",
  Bargaining:
    "Study the tricks of the trade and persuasive skills to lower any type of expense.",
  Meditation:
    "Fill your mind with peace and tranquility to tap into greater happiness from within.",

  //Combat
  Strength:
    "Condition your body and strength through harsh training. Stronger individuals are paid more in the military.",
  "Battle Tactics":
    "Create and revise battle strategies, improving experience gained in the military.",
  "Muscle Memory":
    "Strengthen your neurons through habit and repetition, improving strength gains throughout the body.",

  //Magic
  "Mana Control":
    "Strengthen your mana channels throughout your body, aiding you in becoming a more powerful magical user.",
  "Life Essence":
    "Lengthen your lifespan through the means of magic. However, is this truly the immortality you have tried seeking for...?",
  "Time Warping":
    "Bend space and time through forbidden techniques, speeding up your learning processes.",
  "Astral Body":
    "Lengthen your lifespan drastically beyond comprehension by harnessing ethereal energy.",
  "Temporal Dimension":
    "Creating your own pocket dimension where centuries go by in mere seconds.",
  "All Seeing Eye":
    "As the highest rank of T.A.A, all funds go directly to you.",
  Brainwashing:
    "A technique designed to manipulate human thought and action against their desire.",

  //Dark magic - Evil Required
  "Dark Influence":
    "Encompass yourself with formidable power bestowed upon you by evil, allowing you to pick up and absorb any job or skill with ease.",
  "Evil Control":
    "Tame the raging and growing evil within you, improving evil gain in-between rebirths.",
  Intimidation:
    "Learn to emit a devilish aura which strikes extreme fear into other merchants, forcing them to give you heavy discounts.",
  "Demon Training":
    "A mere human body is too feeble and weak to withstand evil. Train with forbidden methods to slowly manifest into a demon, capable of absorbing knowledge rapidly.",
  "Blood Meditation":
    "Grow and culture the evil within you through the sacrifise of other living beings, drastically increasing evil gain.",
  "Demon's Wealth":
    "Through the means of dark magic, multiply the raw matter of the coins you receive from your job.",
  "Dark Knowledge":
    "Sealed for a very long time, you utilized these forbidden texts for your own personal gain.",
  "Void Influence":
    "Tapping into the powers of the Void while combining them with evil grants you an ulimited potential.",
  "Time Loop":
    "Mastery is achieved when 'telling time' becomes 'telling time what to do'.",
  "Evil Incarnate": "You have became the very thing you swore to destroy.",

  //Void Manipulation
  "Absolute Wish":
    "The power to fulfill absolutely any and all wishes without any limitations.",
  "Void Amplification":
    "You surrender yourself to the Void, making it easier to take control of you.",
  "Mind Seize":
    "In a trance like state, you feel the Void controlling your thoughts, perception, memories, emotions and personality.",
  "Ceaseless Abyss":
    "Never ending torture, you swore to serve the Void for the rest of your existence.",
  "Void Symbiosis":
    "A symbiotic relationship that helps you become one with the Void.",
  "Void Embodiment":
    "If thou gaze long into an abyss, the abyss will also gaze into thee.",
  "Abyss Manipulation":
    "Allows you to shape your own reality within the Void itself.",

  //Celestial Powers - Endgame
  "Cosmic Longevity":
    "You have seen it all, from the very beginning to the very end.",
  "Cosmic Recollection":
    "Being able to exist in multiple parallel timelines and manipulating you parallel selves, influencing their lives as you see fit.",
  "Essence Collector":
    "Exploit the unlimited potential of multiverse energies and collect its resources.",
  "Galactic Command": "Absolute power corrupts absolutely.",

  //Almightiness
  "Yin Yang":
    "Born from chaos when the universe was first created, believed to exist in harmony, balancing evil and good.",
  "Parallel Universe":
    "Self-contained plane of existence, co-existing with one's own, helping you restore fragments of your forgotten power.",
  "Higher Dimensions":
    "By possesing the power to partially alter the laws of physics and transceding lower dimensional spaces, your existence becomes never-ending.",
  Epiphany: "You become one with everything.",

  //Properties
  Homeless:
    "Sleep on the uncomfortable, filthy streets while almost freezing to death every night. It cannot get any worse than this.",
  Tent: "A thin sheet of tattered cloth held up by a couple of feeble, wooden sticks. Horrible living conditions but at least you have a roof over your head.",
  "Wooden Hut":
    "Shabby logs and dirty hay glued together with horse manure. Much more sturdy than a tent, however, the stench isn't very pleasant.",
  Cottage:
    "Structured with a timber frame and a thatched roof. Provides decent living conditions for a fair price.",
  House:
    "A building formed from stone bricks and sturdy timber, which contains a few rooms. Although quite expensive, it is a comfortable abode.",
  "Large House":
    "Much larger than a regular house, which boasts even more rooms and multiple floors. The building is quite spacious but comes with a hefty price tag.",
  "Small Palace":
    "A very rich and meticulously built structure rimmed with fine metals such as silver. Extremely high expenses to maintain for a lavish lifestyle.",
  "Grand Palace":
    "A grand residence completely composed of gold and silver. Provides the utmost luxurious and comfortable living conditions possible for a ludicrous price.",
  "Town Ruler":
    "You rule your very own community in your small town, owning multiple establishments.",
  "City Ruler":
    "As the highest ranking official, you manage and oversee everything that happens, while your pay is astronomical, so are your expenses.",
  "Nation Ruler":
    "You reign the whole nation, while your riches may be corrupted, everything you see belongs to you.",
  "Pocket Dimension":
    "A Dimension just for you, that can be summoned at will. What happens there stays there.",
  "Void Realm":
    "Unknown how or when the Void realm came into existence, containing elements which don’t exist outside of its dimensional plane are now all to your disposal",
  "Void Universe":
    "Predating our own universe, the Void has an ulimited amount of space for your belongings, if you are willing to submit to it.",
  "Astral Realm":
    "Beneath personality and ego lays the source of our deep character, our personhood. Here are the psychic senses, our deep mind and emotions, symbols and inner reality.",
  "Galactic Throne": "You sit on your throne, overseeing the existence itself.",

  //Misc
  Book: "A place to write down all your thoughts and discoveries, allowing you to learn a lot more quickly.",
  Dumbbells:
    "Heavy tools used in strenuous exercise to toughen up and accumulate strength even faster than before. ",
  "Personal Squire":
    "Assists you in completing day to day activities, giving you more time to be productive at work.",
  "Steel Longsword":
    "A fine blade used to slay enemies even quicker in combat and therefore gain more experience.",
  Butler:
    "Keeps your household clean at all times and also prepares three delicious meals per day, leaving you in a happier, stress-free mood.",
  "Sapphire Charm":
    "Embedded with a rare sapphire, this charm activates more mana channels within your body, providing a much easier time learning magic.",
  "Study Desk":
    "A dedicated area which provides many fine stationary and equipment designed for furthering your progress in research.",
  Library:
    "Stores a collection of books, each containing vast amounts of information from basic life skills to complex magic spells.",
  Observatory: "Used for observing terrestrial, marine and celestial events.",
  "Mind's Eye":
    "Lets you see memories, remember images, and even see new pictures and ideas.",
  "Void Necklace":
    "Helps you shape and manipulate void matter, even transmute it and rebuild into anything of your choosing.",
  "Void Armor":
    "Generates an innate armor as a part of you body, which is resistant to attacks, harm or pain.",
  "Void Blade":
    "Forged from void dust and dark matter, can slash through dimensional barriers. It's a weapon of choice for every Void Reaver.",
  "Void Orb":
    "When the orb touches non void entities, it instantly disintegrate them. Harnessing its power from Void realm.",
  "Void Dust":
    "Purest version of void created material, a teaspoon of it is as heavy as a small planet. ",
  "Celestial Robe":
    "The most powerful and essential equipment of any Celestial. Acts as a source of infinite power.",
  "Universe Fragment":
    "From the time the universe was born. Can create another small universes.",
  "Multiverse Fragment":
    "Came into existance long before our universe was created, this strange looking object with no shape radiates unlimited energy.",
});

const stylingData = Object.freeze({
  colors: {
    common: "#55a630",
    fundamentals: "#55a630",
    military: "#e63946",
    combat: "#e63946",
    "arcane association": "#C71585",
    magic: "#C71585",
    void: "#762B91",
    "void vanipulation": "#762B91",
    "galactic council": "#D5C010",
    "celestial powers": "#D5C010",
    almightiness: "#18d2d9",
    "dark magic": "#73000f",
    properties: "#219ebc",
    misc: "#b56576",
  },
});
