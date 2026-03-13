// ── Animal brain equivalents & neural populations ──
var HM = window.HM || {};

// Animal tiers by NEURON COUNT (number of players/neurons in hive mind)
HM.ANIMAL_TIERS = [
  { min: 0,      iconId: 'sponge',      name: 'Sponge',        fireInterval: 6000, decayRate: 0.07,  threshold: 0.85, propagation: 0.3  },
  { min: 1,      iconId: 'tardigrade',   name: 'Tardigrade',    fireInterval: 5500, decayRate: 0.065, threshold: 0.83, propagation: 0.35 },
  { min: 231,    iconId: 'seasquirt',    name: 'Sea Squirt',    fireInterval: 5000, decayRate: 0.06,  threshold: 0.8,  propagation: 0.4  },
  { min: 302,    iconId: 'roundworm',    name: 'C. elegans',    fireInterval: 4500, decayRate: 0.055, threshold: 0.75, propagation: 0.45 },
  { min: 500,    iconId: 'hydra',        name: 'Hydra',         fireInterval: 4000, decayRate: 0.05,  threshold: 0.7,  propagation: 0.5  },
  { min: 5600,   iconId: 'jellyfish',    name: 'Jellyfish',     fireInterval: 3500, decayRate: 0.045, threshold: 0.65, propagation: 0.55 },
  { min: 10000,  iconId: 'pondsnail',    name: 'Pond Snail',    fireInterval: 2800, decayRate: 0.037, threshold: 0.58, propagation: 0.63 },
  { min: 18000,  iconId: 'seaslug',      name: 'Sea Slug',      fireInterval: 3100, decayRate: 0.04,  threshold: 0.6,  propagation: 0.6  },
  { min: 20000,  iconId: 'snail',        name: 'Snail',         fireInterval: 2500, decayRate: 0.034, threshold: 0.55, propagation: 0.66 },
  { min: 60000,  iconId: 'gardensnail',  name: 'Garden Snail',  fireInterval: 2200, decayRate: 0.031, threshold: 0.52, propagation: 0.7  },
  { min: 100000, iconId: 'zebrafish',    name: 'Zebrafish',     fireInterval: 2000, decayRate: 0.028, threshold: 0.5,  propagation: 0.75 },
  { min: 100000, iconId: 'spider',       name: 'Spider',        fireInterval: 1800, decayRate: 0.025, threshold: 0.45, propagation: 0.8  },
  { min: 100000, iconId: 'fruitfly',     name: 'Fruit Fly',     fireInterval: 1500, decayRate: 0.02,  threshold: 0.4,  propagation: 0.85 }
];

// Neural populations (unlock progressively by tier)
// v2: directional flow layout — left (input) → middle (processing) → right (output)
HM.POPULATIONS = [
  { id: 'sensors',     name: 'SENSOR',        color: [79,195,247],  xBand: 0.0,  yBand: 0.6,  role: 'input',  unlockMin: 0,
    desc: 'The input scouts. Detect touch, chemicals, temperature, light, and other signals from the environment.' },
  { id: 'pacemakers',  name: 'PACEMAKER',     color: [220,180,60],  xBand: 0.15, yBand: 0.25, role: 'input',  unlockMin: 500,
    desc: 'Rhythm starters that can kick activity into motion without waiting for a fresh external cue every time. A bridge toward pulsing and spontaneous contraction.' },
  { id: 'trackers',    name: 'TRACKER',       color: [60,200,200],  xBand: 0.15, yBand: 0.75, role: 'input',  unlockMin: 60000,
    desc: 'Chemosensory seekers and foragers. These populations help follow gradients, maintain heading, and move toward useful targets in the environment.' },
  { id: 'relays',      name: 'RELAY',         color: [100,210,255], xBand: 0.35, yBand: 0.4,  role: 'bridge', unlockMin: 5600,
    desc: 'Distributed signal spread without a central boss. In a nerve net, activity propagates through many local connections instead of passing through a single command center.' },
  { id: 'rhythmloops', name: 'RHYTHM LOOP',   color: [100,150,255], xBand: 0.4,  yBand: 0.7,  role: 'bridge', unlockMin: 10000,
    desc: 'Repeating circuit loops that generate patterned actions like crawl, bite, pulse, or cycle. The basis of rhythmic behavior.' },
  { id: 'memory',      name: 'MEMORY',        color: [180,100,220], xBand: 0.5,  yBand: 0.3,  role: 'bridge', unlockMin: 10000,
    desc: 'Persistent circuit changes that let past experience shape future behavior. Not one literal cell type, but populations whose connections can hold a trace of learning.' },
  { id: 'modulators',  name: 'MODULATOR',     color: [220,100,220], xBand: 0.55, yBand: 0.65, role: 'bridge', unlockMin: 18000,
    desc: 'Tuning neurons that adjust the whole circuit\'s state \u2014 stronger or weaker responses, longer-lasting effects, and greater plasticity.' },
  { id: 'deciders',    name: 'DECIDER',       color: [255,100,160], xBand: 0.7,  yBand: 0.5,  role: 'bridge', unlockMin: 100000,
    desc: 'Action-selection circuits that weigh competing options \u2014 turn, continue, approach, avoid, strike, or abort \u2014 and push the system toward one choice.' },
  { id: 'hunters',     name: 'HUNTER',        color: [255,140,60],  xBand: 0.8,  yBand: 0.3,  role: 'output', unlockMin: 100000,
    desc: 'Specialized prey-detection circuits that lock onto small moving targets and trigger orienting, pursuit, and strike behavior.' },
  { id: 'motors',      name: 'MOTOR',         color: [220,100,100], xBand: 0.95, yBand: 0.5,  role: 'output', unlockMin: 302,
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
