// ── Animal brain equivalents & neural populations ──
var HM = window.HM || {};

// Animal tiers by NEURON COUNT (number of players/neurons in hive mind)
HM.ANIMAL_TIERS = [
  { min: 0,   iconId: 'sponge',     name: 'Sponge',      fireInterval: 6000, decayRate: 0.07,  threshold: 0.85, propagation: 0.3  },
  { min: 1,   iconId: 'tardigrade', name: 'Tardigrade',  fireInterval: 5500, decayRate: 0.065, threshold: 0.83, propagation: 0.35 },
  { min: 150, iconId: 'seasquirt',  name: 'Sea Squirt',  fireInterval: 5000, decayRate: 0.06,  threshold: 0.8,  propagation: 0.4  },
  { min: 300, iconId: 'roundworm',  name: 'C. elegans',  fireInterval: 4500, decayRate: 0.055, threshold: 0.75, propagation: 0.45 },
  { min: 500, iconId: 'hydra',      name: 'Hydra',       fireInterval: 4000, decayRate: 0.05,  threshold: 0.7,  propagation: 0.5  }
];

(function() {
  var funTierNames = [
    'Gelatinous Cube', 'Buzz Lightyear', 'Mimic Chest', 'Dungeon Roomba', 'Moss Goblin',
    'Cave Slime', 'Pixel Imp', 'Snack Dragon', 'Orc Warband', 'Moon Frog',
    'Star Beetle', 'Pocket Wyrm', 'Tiny Golem', 'Cloud Gremlin', 'Neon Sprite',
    'Bone Pixie', 'Swamp Blob', 'Dust Mimic', 'Toy Knight', 'Sewer Drake',
    'Void Hamster', 'Rust Wisp', 'Orb Pigeon', 'Fungal Troll', 'Laser Moth',
    'Astro Newt', 'Jelly Beast', 'Candy Ghoul', 'Gear Goblin', 'Plush Titan',
    'Sleepy Hydra', 'Glitch Bat', 'Mecha Kobold', 'Cosmic Axolotl', 'Bog Wizard',
    'Pocket Kaiju', 'Robo Toad', 'Chaos Ferret', 'Phantom Crab', 'Cursed Yeti',
    'Starlight Orc', 'Goblin Pilot', 'Dream Cyclops', 'Plasma Slug', 'Marsh Beast',
    'Sprite King', 'Mini Kraken', 'Velvet Demon', 'Space Bandit', 'Lava Bunny',
    'Frog Paladin', 'Chrome Chimera', 'Haunted Plush', 'Pixel Dragon', 'Moon Crawler',
    'Troll Mage', 'Bubble Wyvern', 'Snack Golem', 'Bug Knight', 'Warp Possum',
    'Glow Serpent', 'Orb Hydra', 'Crayon Beast', 'Nano Ogre', 'Goblin Mech',
    'Jelly Oracle', 'Star Wolf', 'Plush Lich', 'Doodle Drake', 'Hex Raccoon',
    'Space Slime', 'Pocket Phoenix', 'Crypt Otter', 'Mutant Pigeon', 'Dream Mimic',
    'Laser Unicorn', 'Bog Gremlin', 'Waffle Troll', 'Ghost Lizard', 'Mecha Griffin',
    'Pikachu', 'Magikarp', 'Jigglypuff', 'Psyduck', 'Bulbasaur',
    'Charmander', 'Squirtle', 'Eevee', 'Gengar', 'Snorlax',
    'Cubone', 'Lapras', 'Dragonite', 'Mewtwo', 'Pocket Basilisk',
    'Robo Gargoyle', 'Chaos Toad', 'Meme Yeti', 'Astro Chimera', 'Candy Wyvern',
    'Void Gnome', 'Dream Kaiju', 'Goblin Astronaut', 'Goblin Accountant', 'Necromancer Intern',
    'Space Pirate', 'Time Wizard', 'Dragon Teen', 'Vampire Clerk', 'Kobold Union',
    'Cosmic Slime', 'Haunted Armor', 'Troll with WiFi', 'Moon Goblin', 'Eldritch Goldfish',
    'Demogorgon', 'Mecha Wizard', 'Space Barbarian', 'Storm Lich', 'Robo Necromancer',
    'Plasma Dragon', 'Pocket Leviathan', 'Mythic Slug', 'Astral Warlock', 'Void Pirate',
    'Cyber Yeti', 'Crystal Mimic', 'Dungeon Kaiju', 'Cosmic Beholder', 'Doom Roomba',
    'Mewtwo Prime', 'Dragon Emperor', 'Star Kraken', 'Elder Goblin', 'Phoenix Knight',
    'Cosmic Dragon', 'Rune Colossus', 'Shadow Kaiju', 'Storm Phoenix', 'Titan Mimic',
    'Astral Behemoth', 'Void Dragon', 'Kraken Prime', 'Celestial Hydra', 'Mythic Chimera',
    'Cosmic Lich', 'Elder Basilisk', 'Star Leviathan', 'Arcane Overlord'
  ];

  function slugifyName(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  function roundTo(value, places) {
    var factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
  }

  function makeFunTier(min, name) {
    var t = (min - 1000) / 148000;
    return {
      min: min,
      iconId: 'auto:' + slugifyName(name),
      name: name,
      fireInterval: Math.round(lerp(3800, 1520, t)),
      decayRate: roundTo(lerp(0.048, 0.0205, t), 4),
      threshold: roundTo(lerp(0.68, 0.405, t), 4),
      propagation: roundTo(lerp(0.52, 0.845, t), 4)
    };
  }

  for (var i = 0; i < funTierNames.length; i++) {
    var min = (i + 1) * 1000;
    HM.ANIMAL_TIERS.push(makeFunTier(min, funTierNames[i]));
  }

  HM.ANIMAL_TIERS.push({
    min: 150000,
    iconId: 'fruitfly',
    name: 'Fruit Fly',
    fireInterval: 1500,
    decayRate: 0.02,
    threshold: 0.4,
    propagation: 0.85
  });
})();

// Neural populations (unlock progressively by tier)
// v2: directional flow layout — left (input) → middle (processing) → right (output)
HM.POPULATIONS = [
  { id: 'sensors',     name: 'SENSOR',        color: [79,195,247],  xBand: 0.0,  yBand: 0.6,  role: 'input',  unlockMin: 0,
    desc: 'The input scouts. Detect touch, chemicals, temperature, light, and other signals from the environment.' },
  { id: 'pacemakers',  name: 'PACEMAKER',     color: [220,180,60],  xBand: 0.15, yBand: 0.25, role: 'input',  unlockMin: 500,
    desc: 'Rhythm starters that can kick activity into motion without waiting for a fresh external cue every time. A bridge toward pulsing and spontaneous contraction.' },
  { id: 'trackers',    name: 'TRACKER',       color: [60,200,200],  xBand: 0.15, yBand: 0.75, role: 'input',  unlockMin: 26000,
    desc: 'Chemosensory seekers and foragers. These populations help follow gradients, maintain heading, and move toward useful targets in the environment.' },
  { id: 'relays',      name: 'RELAY',         color: [100,210,255], xBand: 0.35, yBand: 0.4,  role: 'bridge', unlockMin: 2000,
    desc: 'Distributed signal spread without a central boss. In a nerve net, activity propagates through many local connections instead of passing through a single command center.' },
  { id: 'rhythmloops', name: 'RHYTHM LOOP',   color: [100,150,255], xBand: 0.4,  yBand: 0.7,  role: 'bridge', unlockMin: 3000,
    desc: 'Repeating circuit loops that generate patterned actions like crawl, bite, pulse, or cycle. The basis of rhythmic behavior.' },
  { id: 'memory',      name: 'MEMORY',        color: [180,100,220], xBand: 0.5,  yBand: 0.3,  role: 'bridge', unlockMin: 3000,
    desc: 'Persistent circuit changes that let past experience shape future behavior. Not one literal cell type, but populations whose connections can hold a trace of learning.' },
  { id: 'modulators',  name: 'MODULATOR',     color: [220,100,220], xBand: 0.55, yBand: 0.65, role: 'bridge', unlockMin: 10000,
    desc: 'Tuning neurons that adjust the whole circuit\'s state \u2014 stronger or weaker responses, longer-lasting effects, and greater plasticity.' },
  { id: 'deciders',    name: 'DECIDER',       color: [255,100,160], xBand: 0.7,  yBand: 0.5,  role: 'bridge', unlockMin: 42000,
    desc: 'Action-selection circuits that weigh competing options \u2014 turn, continue, approach, avoid, strike, or abort \u2014 and push the system toward one choice.' },
  { id: 'hunters',     name: 'HUNTER',        color: [255,140,60],  xBand: 0.8,  yBand: 0.3,  role: 'output', unlockMin: 65000,
    desc: 'Specialized prey-detection circuits that lock onto small moving targets and trigger orienting, pursuit, and strike behavior.' },
  { id: 'motors',      name: 'MOTOR',         color: [220,100,100], xBand: 0.95, yBand: 0.5,  role: 'output', unlockMin: 300,
    desc: 'The output drivers. Activate muscles and steer movement, turning neural activity into action.' }
];

// Biological proportions for each population at different tiers
HM.POP_WEIGHTS = {
  'sensors':      { base: 0.38, decay: 0.04 },
  'motors':       { base: 0.35, decay: 0.04 },
  'pacemakers':   { base: 0.27, decay: 0.03 },
  'relays':       { base: 0.30, decay: 0.02 },
  'rhythmloops':  { base: 0.12, decay: 0.005 },
  'memory':       { base: 0.15, decay: 0.01 },
  'modulators':   { base: 0.10, decay: 0.005 },
  'trackers':     { base: 0.10, decay: 0.005 },
  'hunters':      { base: 0.08, decay: 0.003 },
  'deciders':     { base: 0.10, decay: 0.003 }
};

HM.getActivePopulations = function(neuronCount) {
  var active = [];
  for (var i = 0; i < HM.POPULATIONS.length; i++) {
    if (neuronCount >= HM.POPULATIONS[i].unlockMin) active.push(HM.POPULATIONS[i]);
  }
  return active;
};

HM.getPopulationWeights = function(neuronCount) {
  var active = HM.getActivePopulations(neuronCount);
  if (active.length === 0) return [];

  var weights = [];
  var totalW = 0;
  for (var i = 0; i < active.length; i++) {
    var pw = HM.POP_WEIGHTS[active[i].id];
    var laterPops = active.length - (i + 1);
    var w = pw.base - pw.decay * laterPops;
    w = Math.max(0.04, w);
    weights.push({ pop: active[i], weight: w });
    totalW += w;
  }
  for (var i = 0; i < weights.length; i++) weights[i].weight /= totalW;
  return weights;
};

HM.togglePanel = function(panelId) {
  var panels = ['speciesPanel', 'legendPanel'];
  for (var i = 0; i < panels.length; i++) {
    var panel = document.getElementById(panels[i]);
    if (!panel) continue;
    if (panels[i] === panelId) panel.classList.toggle('open');
    else panel.classList.remove('open');
  }
};

HM.buildSpeciesList = function(neuronCount) {
  var container = document.getElementById('speciesItems');
  if (!container) return;

  var currentTier = HM.getAnimalTier(neuronCount);
  var nextTier = HM.getNextTier(neuronCount);
  var html = '';

  for (var i = HM.ANIMAL_TIERS.length - 1; i >= 0; i--) {
    var tier = HM.ANIMAL_TIERS[i];
    if (tier.min > neuronCount) continue;
    var itemClass = 'legItem speciesUnlocked';
    var status = 'Unlocked';
    if (currentTier && tier.min === currentTier.min) {
      itemClass += ' speciesCurrent';
      status = 'Current Form';
    }
    html += '<div class="' + itemClass + '">' +
      '<div class="speciesMeta">' +
      '<span class="speciesIcon">' + HM.animalSVG(tier.iconId, 18) + '</span>' +
      '<span class="legName speciesName">' + tier.name + '</span>' +
      '<span class="speciesThreshold">' + tier.min.toLocaleString() + '</span>' +
      '</div>' +
      '<div class="speciesStatus">' + status + '</div>' +
      '</div>';
  }

  if (nextTier) {
    html = '<div class="legItem speciesNext">' +
      '<div class="speciesMeta">' +
      '<span class="speciesIcon">' + HM.animalSVG(nextTier.iconId, 18) + '</span>' +
      '<span class="legName speciesName">' + nextTier.name + '</span>' +
      '<span class="speciesThreshold">' + nextTier.min.toLocaleString() + '</span>' +
      '</div>' +
      '<div class="speciesStatus">Next in ' + (nextTier.min - neuronCount).toLocaleString() + ' neurons</div>' +
      '</div>' + html;
  }

  container.innerHTML = html;
};

HM.buildLegend = function(neuronCount) {
  var container = document.getElementById('legendItems');
  var html = '';
  function tierNameFor(minNeurons) {
    for (var i = HM.ANIMAL_TIERS.length - 1; i >= 0; i--) {
      if (minNeurons >= HM.ANIMAL_TIERS[i].min) return HM.animalSVG(HM.ANIMAL_TIERS[i].iconId, 12) + ' ' + HM.ANIMAL_TIERS[i].name;
    }
    return '';
  }
  var weights = HM.getPopulationWeights(neuronCount);
  var weightMap = {};
  for (var w = 0; w < weights.length; w++) weightMap[weights[w].pop.id] = weights[w].weight;

  for (var i = 0; i < HM.POPULATIONS.length; i++) {
    var pop = HM.POPULATIONS[i];
    var unlocked = neuronCount >= pop.unlockMin;
    var c = pop.color;
    var lockClass = unlocked ? '' : ' legLocked';
    var pct = weightMap[pop.id] ? Math.round(weightMap[pop.id] * 100) + '%' : '';
    var unlockLabel = unlocked ? (pct + ' OF NEURONS') : 'UNLOCKS AT ' + tierNameFor(pop.unlockMin).toUpperCase();
    html += '<div class="legItem' + lockClass + '">' +
      '<span class="legDot" style="background:rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')"></span>' +
      '<span class="legName" style="color:rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')">' + pop.name + '</span>' +
      '<span class="legUnlock">' + unlockLabel + '</span>' +
      '<div class="legDesc">' + (pop.desc || '') + '</div>' +
      '</div>';
  }
  container.innerHTML = html;
};

HM.assignPopulations = function(neuronCount) {
  var nodes = HM.nodes;
  var active = HM.getActivePopulations(neuronCount);
  if (active.length === 0) {
    for (var i = 0; i < nodes.length; i++) nodes[i].population = null;
    return;
  }

  var weights = HM.getPopulationWeights(neuronCount);

  var popLookup = {};
  for (var i = 0; i < active.length; i++) popLookup[active[i].id] = active[i];
  var unassigned = [];
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].data._assignPop && popLookup[nodes[i].data._assignPop]) {
      nodes[i].population = popLookup[nodes[i].data._assignPop];
    } else {
      unassigned.push(i);
    }
  }

  var indexed = [];
  for (var u = 0; u < unassigned.length; u++) {
    indexed.push({ idx: unassigned[u], x: nodes[unassigned[u]].x });
  }
  indexed.sort(function(a, b) { return a.x - b.x; });

  var sortedWeights = weights.slice().sort(function(a, b) { return a.pop.xBand - b.pop.xBand; });

  var n = indexed.length;
  var assigned = 0;
  for (var p = 0; p < sortedWeights.length; p++) {
    var count;
    if (p === sortedWeights.length - 1) {
      count = n - assigned;
    } else {
      count = Math.round(sortedWeights[p].weight * n);
    }
    for (var j = 0; j < count && assigned < n; j++) {
      nodes[indexed[assigned].idx].population = sortedWeights[p].pop;
      assigned++;
    }
  }
};

HM.getAnimalTier = function(count) {
  var tier = HM.ANIMAL_TIERS[0];
  for (var i = HM.ANIMAL_TIERS.length - 1; i >= 0; i--) {
    if (count >= HM.ANIMAL_TIERS[i].min) { tier = HM.ANIMAL_TIERS[i]; break; }
  }
  return tier;
};

HM.getNextTier = function(count) {
  for (var i = 0; i < HM.ANIMAL_TIERS.length; i++) {
    if (count < HM.ANIMAL_TIERS[i].min) return HM.ANIMAL_TIERS[i];
  }
  return null;
};

window.HM = HM;
