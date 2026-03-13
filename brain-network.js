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
HM.runForceLayout = function() {
  var nodes = HM.nodes;
  var edges = HM.edges;
  var W = HM.W, H = HM.H;
  var n = nodes.length;
  var k = Math.sqrt((W * H) / n) * 0.7;
  var iterations = HM.isMobile ? 100 : 250;
  var temp = Math.min(W, H) * 0.15;
  var cooling = temp / iterations;
  var margin = 60;
  var topMargin = 140;
  var usableW = W - margin * 2;
  var usableH = H - topMargin - margin;

  for (var iter = 0; iter < iterations; iter++) {
    for (var i = 0; i < n; i++) { nodes[i].vx = 0; nodes[i].vy = 0; }

    // Repulsion
    var repulseRadius = k * 4;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > repulseRadius) continue;
        d = Math.max(d, 1);
        var force = (k * k) / (d * d) * 2;
        var fx = (dx / d) * force, fy = (dy / d) * force;
        nodes[i].vx += fx; nodes[i].vy += fy;
        nodes[j].vx -= fx; nodes[j].vy -= fy;
      }
    }

    // Attraction (edges)
    for (var e = 0; e < edges.length; e++) {
      var s = nodes[edges[e].source], t = nodes[edges[e].target];
      var dx = t.x - s.x, dy = t.y - s.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var force = (d - k) * 0.05;
      var fx = (dx / d) * force, fy = (dy / d) * force;
      s.vx += fx; s.vy += fy;
      t.vx -= fx; t.vy -= fy;
    }

    // v2: Soft directional bias
    var bandStrength = 0.012;
    for (var i = 0; i < n; i++) {
      var pop = nodes[i].population;
      if (!pop) continue;
      var targetX = margin + pop.xBand * usableW;
      var targetY = topMargin + pop.yBand * usableH;
      nodes[i].vx += (targetX - nodes[i].x) * bandStrength;
      nodes[i].vy += (targetY - nodes[i].y) * bandStrength * 0.2;
    }

    // Strong center gravity
    var cx = W / 2, cy = (H + topMargin) / 2;
    for (var i = 0; i < n; i++) {
      nodes[i].vx += (cx - nodes[i].x) * 0.02;
      nodes[i].vy += (cy - nodes[i].y) * 0.02;
    }

    // Apply with temperature clamping
    for (var i = 0; i < n; i++) {
      var vLen = Math.sqrt(nodes[i].vx * nodes[i].vx + nodes[i].vy * nodes[i].vy) || 1;
      var capped = Math.min(vLen, temp);
      nodes[i].x += (nodes[i].vx / vLen) * capped;
      nodes[i].y += (nodes[i].vy / vLen) * capped;
      if (nodes[i].x < margin) nodes[i].vx += (margin - nodes[i].x) * 0.5;
      if (nodes[i].x > W - margin) nodes[i].vx -= (nodes[i].x - (W - margin)) * 0.5;
      if (nodes[i].y < topMargin) nodes[i].vy += (topMargin - nodes[i].y) * 0.5;
      if (nodes[i].y > H - margin) nodes[i].vy -= (nodes[i].y - (H - margin)) * 0.5;
      nodes[i].x = Math.max(20, Math.min(W - 20, nodes[i].x));
      nodes[i].y = Math.max(topMargin - 20, Math.min(H - 20, nodes[i].y));
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
    document.getElementById('progLabel').innerHTML = '<span class="progNum">' + needed.toLocaleString() + '</span> neurons until ' + next.name.toUpperCase();
    var prevMin = HM.currentTier.min;
    var pct = Math.min(100, ((neuronCount - prevMin) / (next.min - prevMin)) * 100);
    document.getElementById('progFill').style.width = pct + '%';
  }

  // Assign populations BEFORE layout
  HM.assignPopulations(neuronCount);

  // Seed positions with population bias
  var topMarginInit = 140;
  var marginInit = 60;
  var usableW = W - marginInit * 2;
  var usableH = H - topMarginInit - marginInit;
  var centerX = W / 2, centerY = topMarginInit + usableH / 2;
  for (var i = 0; i < nodes.length; i++) {
    var pop = nodes[i].population;
    if (pop) {
      var bandX = marginInit + pop.xBand * usableW;
      var bandY = topMarginInit + pop.yBand * usableH;
      nodes[i].x = centerX * 0.7 + bandX * 0.3 + (Math.random() - 0.5) * usableW * 0.3;
      nodes[i].y = centerY * 0.7 + bandY * 0.3 + (Math.random() - 0.5) * usableH * 0.3;
    }
  }

  // Run layout
  HM.runForceLayout();

  // Build legend
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
  var resCX = W / 2, resCY = resizeTop + resizeUsableH / 2;
  for (var i = 0; i < nodes.length; i++) {
    var pop = nodes[i].population;
    if (pop) {
      var bandX = resizeMargin + pop.xBand * resizeUsableW;
      var bandY = resizeTop + pop.yBand * resizeUsableH;
      nodes[i].x = resCX * 0.7 + bandX * 0.3 + (Math.random() - 0.5) * resizeUsableW * 0.3;
      nodes[i].y = resCY * 0.7 + bandY * 0.3 + (Math.random() - 0.5) * resizeUsableH * 0.3;
    } else {
      nodes[i].x = resCX + (Math.random() - 0.5) * resizeUsableW * 0.3;
      nodes[i].y = resCY + (Math.random() - 0.5) * resizeUsableH * 0.3;
    }
  }
  HM.runForceLayout();
  HM.renderStatic();
};

window.HM = HM;
