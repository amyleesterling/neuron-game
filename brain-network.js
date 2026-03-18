// ── Network initialization, edge building, force layout ──
var HM = window.HM || {};

// ── Edge building (v2: flow-biased + hub connections) ──
var ROLE_ORDER = { 'input': 0, 'bridge': 1, 'output': 2 };

HM.buildEdges = function() {
  var nodes = HM.nodes;
  var edges = HM.edges;
  edges.length = 0;
  var n = nodes.length;
  if (n < 2) return;

  function dist(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 1. MST via Prim's to guarantee connectivity
  var inMST = new Array(n);
  inMST[0] = true;
  var mstCount = 1;
  var edgeSet = {};
  function edgeKey(a, b) { return Math.min(a, b) + '-' + Math.max(a, b); }

  while (mstCount < n) {
    var bestDist = Infinity, bestI = -1, bestJ = -1;
    for (var i = 0; i < n; i++) {
      if (!inMST[i]) continue;
      for (var j = 0; j < n; j++) {
        if (inMST[j]) continue;
        var d = dist(nodes[i], nodes[j]);
        if (d < bestDist) { bestDist = d; bestI = i; bestJ = j; }
      }
    }
    if (bestJ >= 0) {
      inMST[bestJ] = true;
      mstCount++;
      var key = edgeKey(bestI, bestJ);
      if (!edgeSet[key]) {
        edgeSet[key] = true;
        var w = Math.min(nodes[bestI].data.score || 1, nodes[bestJ].data.score || 1);
        var idx = edges.length;
        edges.push({ source: bestI, target: bestJ, weight: w });
        nodes[bestI].edgeIndices.push(idx);
        nodes[bestJ].edgeIndices.push(idx);
      }
    }
  }

  // 2. Budget-based extra connections with FLOW BIAS
  for (var i = 0; i < n; i++) {
    var budget = Math.ceil(Math.sqrt(nodes[i].data.score || 1));
    var current = nodes[i].edgeIndices.length;
    var remaining = Math.max(0, budget - current);
    if (remaining <= 0) continue;

    var myRole = nodes[i].population ? ROLE_ORDER[nodes[i].population.role] : 1;
    var myXBand = nodes[i].population ? nodes[i].population.xBand : 0.5;

    var dists = [];
    for (var j = 0; j < n; j++) {
      if (j === i) continue;
      var key = edgeKey(i, j);
      if (edgeSet[key]) continue;
      var d = dist(nodes[i], nodes[j]);
      var jRole = nodes[j].population ? ROLE_ORDER[nodes[j].population.role] : 1;
      var jXBand = nodes[j].population ? nodes[j].population.xBand : 0.5;
      var samePop = nodes[i].population && nodes[j].population && nodes[i].population.id === nodes[j].population.id;
      var flowBonus = 1.0;
      if (samePop) flowBonus = 0.5;
      else if (jXBand >= myXBand && jRole >= myRole) flowBonus = 0.7;
      else if (Math.abs(jXBand - myXBand) < 0.2) flowBonus = 0.8;
      dists.push({ idx: j, d: d * flowBonus });
    }
    dists.sort(function(a, b) { return a.d - b.d; });

    for (var k = 0; k < Math.min(remaining, dists.length); k++) {
      var j = dists[k].idx;
      var key = edgeKey(i, j);
      if (edgeSet[key]) continue;
      edgeSet[key] = true;
      var w = Math.min(nodes[i].data.score || 1, nodes[j].data.score || 1);
      var idx = edges.length;
      edges.push({ source: i, target: j, weight: w });
      nodes[i].edgeIndices.push(idx);
      nodes[j].edgeIndices.push(idx);
    }
  }

  // 3. Hub connections: top-scoring nodes get extra cross-population bridges
  var scores = [];
  for (var i = 0; i < n; i++) scores.push(nodes[i].data.score || 0);
  scores.sort(function(a, b) { return b - a; });
  var hubThreshold = scores[Math.min(Math.floor(n * 0.15), scores.length - 1)] || 5;

  for (var i = 0; i < n; i++) {
    if ((nodes[i].data.score || 0) < hubThreshold) continue;
    if (!nodes[i].population) continue;
    nodes[i]._isHub = true;

    var myPopId = nodes[i].population.id;
    var crossPop = [];
    for (var j = 0; j < n; j++) {
      if (j === i) continue;
      if (!nodes[j].population || nodes[j].population.id === myPopId) continue;
      var key = edgeKey(i, j);
      if (edgeSet[key]) continue;
      crossPop.push({ idx: j, d: dist(nodes[i], nodes[j]) });
    }
    crossPop.sort(function(a, b) { return a.d - b.d; });

    var hubExtra = Math.min(2, crossPop.length);
    for (var h = 0; h < hubExtra; h++) {
      var j = crossPop[h].idx;
      var key = edgeKey(i, j);
      if (edgeSet[key]) continue;
      edgeSet[key] = true;
      var w = Math.min(nodes[i].data.score || 1, nodes[j].data.score || 1);
      var idx = edges.length;
      edges.push({ source: i, target: j, weight: w });
      nodes[i].edgeIndices.push(idx);
      nodes[j].edgeIndices.push(idx);
    }
  }
};

// ── Force-directed layout (v2: directional bias) ──
HM.getLayoutRegion = function(pop, W, topMargin, usableW, usableH) {
  var role = pop ? pop.role : 'bridge';
  var centerY = topMargin + usableH * 0.58;
  var lift = pop ? (0.5 - pop.yBand) * usableH * 0.42 : 0;
  if (role === 'input') {
    return { cx: W * 0.37 + ((pop.xBand || 0.15) - 0.15) * usableW * 0.08, cy: centerY + lift, rx: usableW * 0.18, ry: usableH * 0.32 };
  }
  if (role === 'output') {
    return { cx: W * 0.63 + ((pop.xBand || 0.85) - 0.85) * usableW * 0.08, cy: centerY + lift, rx: usableW * 0.18, ry: usableH * 0.32 };
  }
  return { cx: W * 0.5 + ((pop && pop.xBand ? pop.xBand : 0.5) - 0.5) * usableW * 0.12, cy: centerY + lift * 0.85 - usableH * 0.02, rx: usableW * 0.12, ry: usableH * 0.24 };
};

HM.constrainToBrain = function(node, W, H, margin, topMargin, usableW, usableH) {
  var region = HM.getLayoutRegion(node.population, W, topMargin, usableW, usableH);
  var dx = node.x - region.cx;
  var dy = node.y - region.cy;
  var norm = (dx * dx) / (region.rx * region.rx) + (dy * dy) / (region.ry * region.ry);
  if (norm > 1) {
    var scale = 1 / Math.sqrt(norm);
    node.x = region.cx + dx * scale;
    node.y = region.cy + dy * scale;
  }
  var notchY = topMargin + usableH * 0.2;
  var notchHalf = usableW * 0.055;
  var midDx = node.x - W / 2;
  if (node.y < notchY && Math.abs(midDx) < notchHalf) {
    var push = (notchHalf - Math.abs(midDx)) / notchHalf;
    node.x += (midDx <= 0 ? -1 : 1) * push * 8;
    node.y += push * 10;
  }
  node.x = Math.max(margin * 0.65, Math.min(W - margin * 0.65, node.x));
  node.y = Math.max(topMargin - 10, Math.min(H - margin * 0.35, node.y));
};
HM.runForceLayout = function() {
  var nodes = HM.nodes;
  var edges = HM.edges;
  var W = HM.W, H = HM.H;
  var n = nodes.length;
  var k = Math.sqrt((W * H) / n) * 0.68;
  var iterations = HM.isMobile ? 110 : 250;
  var temp = Math.min(W, H) * 0.15;
  var cooling = temp / iterations;
  var margin = 60;
  var topMargin = 140;
  var usableW = W - margin * 2;
  var usableH = H - topMargin - margin;

  for (var iter = 0; iter < iterations; iter++) {
    for (var i = 0; i < n; i++) { nodes[i].vx = 0; nodes[i].vy = 0; }

    var repulseRadius = k * 4;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > repulseRadius) continue;
        d = Math.max(d, 1);
        var force = (k * k) / (d * d) * 1.9;
        var fx = (dx / d) * force, fy = (dy / d) * force;
        nodes[i].vx += fx; nodes[i].vy += fy;
        nodes[j].vx -= fx; nodes[j].vy -= fy;
      }
    }

    for (var e = 0; e < edges.length; e++) {
      var s = nodes[edges[e].source], t = nodes[edges[e].target];
      var dx = t.x - s.x, dy = t.y - s.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var force = (d - k) * 0.05;
      var fx = (dx / d) * force, fy = (dy / d) * force;
      s.vx += fx; s.vy += fy;
      t.vx -= fx; t.vy -= fy;
    }

    for (var i = 0; i < n; i++) {
      var region = HM.getLayoutRegion(nodes[i].population, W, topMargin, usableW, usableH);
      nodes[i].vx += (region.cx - nodes[i].x) * 0.018;
      nodes[i].vy += (region.cy - nodes[i].y) * 0.012;
    }

    var cx = W / 2, cy = topMargin + usableH * 0.57;
    for (var i = 0; i < n; i++) {
      nodes[i].vx += (cx - nodes[i].x) * 0.008;
      nodes[i].vy += (cy - nodes[i].y) * 0.006;
    }

    for (var i = 0; i < n; i++) {
      var vLen = Math.sqrt(nodes[i].vx * nodes[i].vx + nodes[i].vy * nodes[i].vy) || 1;
      var capped = Math.min(vLen, temp);
      nodes[i].x += (nodes[i].vx / vLen) * capped;
      nodes[i].y += (nodes[i].vy / vLen) * capped;
      HM.constrainToBrain(nodes[i], W, H, margin, topMargin, usableW, usableH);
    }

    temp = Math.max(0.5, temp - cooling);
  }
};

HM.initNetwork = function(data, totalNeuronCount) {
  var nodes = HM.nodes;
  var W = HM.W, H = HM.H;

  // Build nodes
  var totalSynapses = 0;
  var cx = W / 2, cy = (H + 130) / 2;
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    totalSynapses += d.score || 0;
    var r = d._isCluster
      ? Math.min(12, Math.max(6, Math.sqrt(d._clusterCount) * 1.2))
      : Math.max(5, Math.sqrt(d.score || 1) * 2);
    nodes.push({
      x: cx + (Math.random() - 0.5) * W * 0.5,
      y: cy + (Math.random() - 0.5) * H * 0.3,
      vx: 0, vy: 0,
      radius: r,
      data: d,
      prerender: null,
      edgeIndices: [],
      _isHub: false
    });
  }

  // Build edges
  HM.buildEdges();

  // Update stats
  var neuronCount = totalNeuronCount || nodes.length;
  document.getElementById('neuronCount').textContent = neuronCount;
  document.getElementById('synapseCount').textContent = totalSynapses.toLocaleString();
  document.getElementById('popCount').textContent = HM.getActivePopulations(neuronCount).length + '/' + HM.POPULATIONS.length;

  // Animal tier
  HM.currentTier = HM.getAnimalTier(neuronCount);
  document.getElementById('badgeIcon').innerHTML = HM.animalSVG(HM.currentTier.iconId, 22);
  document.getElementById('badgeText').textContent = 'AS SMART AS A ' + HM.currentTier.name.toUpperCase();

  var next = HM.getNextTier(neuronCount);
  if (next) {
    var needed = next.min - neuronCount;
    document.getElementById('progressWrap').style.display = 'flex';
    document.getElementById('progLabel').innerHTML = '~species unlock in <span class="progNum">' + needed.toLocaleString() + '</span> neurons';
    var prevMin = HM.currentTier.min;
    var pct = Math.min(100, ((neuronCount - prevMin) / (next.min - prevMin)) * 100);
    document.getElementById('progFill').style.width = pct + '%';
  }

  // Assign populations BEFORE layout
  HM.assignPopulations(neuronCount);

  // Seed positions with brain-shaped regions
  var topMarginInit = 140;
  var marginInit = 60;
  var usableW = W - marginInit * 2;
  var usableH = H - topMarginInit - marginInit;
  for (var i = 0; i < nodes.length; i++) {
    var region = HM.getLayoutRegion(nodes[i].population, W, topMarginInit, usableW, usableH);
    nodes[i].x = region.cx + (Math.random() - 0.5) * region.rx * 1.35;
    nodes[i].y = region.cy + (Math.random() - 0.5) * region.ry * 1.25;
    HM.constrainToBrain(nodes[i], W, H, marginInit, topMarginInit, usableW, usableH);
  }

  // Run layout
  HM.runForceLayout();

  // Build side panels
  HM.buildSpeciesList(neuronCount);
  HM.buildLegend(neuronCount);

  // Prerender mini neurons
  if (!HM.isMobile) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].prerender = HM.prerenderNeuron(nodes[i].data, Math.round(nodes[i].radius * 5));
    }
  }

  // Render static
  HM.renderStatic();

  // Start animation — burst of fires on load
  if (nodes.length > 0) {
    HM.fireNode(HM.pickFromPopulation('sensors'), 1.0);
    setTimeout(function() { HM.fireNode(HM.pickFromPopulation(null), 0.8); }, 300);
    setTimeout(function() { HM.fireNode(HM.pickFromPopulation(null), 0.9); }, 700);
  }
  HM.startAutoFire();
  requestAnimationFrame(HM.animLoop);
};

HM.layoutAndRender = function() {
  var nodes = HM.nodes;
  var W = HM.W, H = HM.H;
  var resizeMargin = 60;
  var resizeTop = 140;
  var resizeUsableW = W - resizeMargin * 2;
  var resizeUsableH = H - resizeTop - resizeMargin;
  for (var i = 0; i < nodes.length; i++) {
    var region = HM.getLayoutRegion(nodes[i].population, W, resizeTop, resizeUsableW, resizeUsableH);
    nodes[i].x = region.cx + (Math.random() - 0.5) * region.rx * 1.35;
    nodes[i].y = region.cy + (Math.random() - 0.5) * region.ry * 1.25;
    HM.constrainToBrain(nodes[i], W, H, resizeMargin, resizeTop, resizeUsableW, resizeUsableH);
  }
  HM.runForceLayout();
  HM.renderStatic();
};

window.HM = HM;
