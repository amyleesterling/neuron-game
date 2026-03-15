// ── Prerender, static render, firing system, animation loop ──
var HM = window.HM || {};

// ── Prerender mini neuron ──
HM.prerenderNeuron = function(data, size) {
  size = Math.max(20, size);
  var oc = document.createElement('canvas');
  oc.width = size; oc.height = size;
  var ctx = oc.getContext('2d');

  // Cluster nodes: render as a multi-soma cluster
  if (data._isCluster) {
    var cx = size / 2, cy = size / 2, r = size * 0.4;
    if (HM.isMobile) {
      // No background glow on mobile, just solid dots
      var count = Math.min(data._clusterCount, 8);
      for (var si = 0; si < count; si++) {
        var a = (si / count) * Math.PI * 2 + Math.random() * 0.5;
        var dist = r * (0.15 + Math.random() * 0.45);
        var sx = cx + Math.cos(a) * dist;
        var sy = cy + Math.sin(a) * dist;
        var sr = size * (0.06 + Math.random() * 0.04);
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(80,170,230,0.8)';
        ctx.fill();
      }
    } else {
      var glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r);
      glow.addColorStop(0, 'rgba(100,200,255,0.25)');
      glow.addColorStop(0.6, 'rgba(40,120,200,0.1)');
      glow.addColorStop(1, 'rgba(4,20,70,0)');
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
      var count = Math.min(data._clusterCount, 12);
      for (var si = 0; si < count; si++) {
        var a = (si / count) * Math.PI * 2 + Math.random() * 0.5;
        var dist = r * (0.15 + Math.random() * 0.45);
        var sx = cx + Math.cos(a) * dist;
        var sy = cy + Math.sin(a) * dist;
        var sr = size * (0.06 + Math.random() * 0.04);
        var sg = ctx.createRadialGradient(sx, sy - sr * 0.1, 0, sx, sy, sr);
        sg.addColorStop(0, 'rgba(140,220,255,0.7)');
        sg.addColorStop(0.5, 'rgba(40,130,220,0.45)');
        sg.addColorStop(1, 'rgba(4,20,70,0.15)');
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fillStyle = sg; ctx.fill();
      }
    }
    return oc;
  }

  // Single leaderboard entry without shape
  if (!data._hasShape) {
    var cx = size / 2, cy = size / 2, r = size * 0.35;
    if (HM.isMobile) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(60,150,220,1)';
      ctx.fill();
    } else {
      var fg = ctx.createRadialGradient(cx, cy - r * 0.1, 0, cx, cy, r);
      fg.addColorStop(0, 'rgba(140,220,255,1)');
      fg.addColorStop(0.4, 'rgba(40,130,220,1)');
      fg.addColorStop(1, 'rgba(4,20,70,1)');
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = fg; ctx.fill();
    }
    return oc;
  }

  var cols = data.cols || 48;
  var rows = data.rows || 48;
  var maxDim = Math.max(cols, rows);
  var scale = size / maxDim;
  var offX = (size - cols * scale) / 2;
  var offY = (size - rows * scale) / 2;

  function gx(x) { return x * scale + scale / 2 + offX; }
  function gy(y) { return y * scale + scale / 2 + offY; }

  // Axon
  var axon = data.axon_pts;
  if (axon && axon.length > 0) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,107,157,0.4)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(gx(data.soma_x), gy(data.soma_y));
    for (var ai = 0; ai < axon.length; ai++) ctx.lineTo(gx(axon[ai].x), gy(axon[ai].y));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // Branches
  var branches = data.branches;
  if (branches) {
    for (var bi = 0; bi < branches.length; bi++) {
      var b = branches[bi];
      if (!b.path || b.path.length < 2) continue;
      ctx.save();
      ctx.strokeStyle = bi === 0 ? 'rgba(79,195,247,0.85)' : 'rgba(30,120,200,0.45)';
      ctx.lineWidth = bi === 0 ? 1.5 : 1;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(gx(data.soma_x), gy(data.soma_y));
      for (var pi = 0; pi < b.path.length; pi++) ctx.lineTo(gx(b.path[pi].x), gy(b.path[pi].y));
      ctx.stroke();
      ctx.restore();
    }
  }

  // Soma
  var smx = gx(data.soma_x), smy = gy(data.soma_y);
  var r = scale * 2.8;
  ctx.save(); ctx.translate(smx, smy);
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.8);
  ctx.bezierCurveTo(r * 0.25, -r * 0.35, r * 0.7, r * 0.2, r * 0.7, r * 0.6);
  ctx.bezierCurveTo(r * 0.4, r * 0.72, -r * 0.4, r * 0.72, -r * 0.7, r * 0.6);
  ctx.bezierCurveTo(-r * 0.7, r * 0.2, -r * 0.25, -r * 0.35, 0, -r * 0.8);
  ctx.closePath();
  if (HM.isMobile) {
    ctx.fillStyle = 'rgba(60,150,220,1)'; ctx.fill();
  } else {
    var fg = ctx.createRadialGradient(0, -r * 0.05, 0, 0, r * 0.2, r * 0.9);
    fg.addColorStop(0, 'rgba(140,220,255,1)');
    fg.addColorStop(0.4, 'rgba(40,130,220,1)');
    fg.addColorStop(1, 'rgba(4,20,70,1)');
    ctx.fillStyle = fg; ctx.fill();
  }
  ctx.restore();

  return oc;
};

// ── Render static layer ──
HM.renderStatic = function() {
  var nodes = HM.nodes, edges = HM.edges;
  var bgCtx = HM.bgCtx;
  var W = HM.W, H = HM.H;
  bgCtx.clearRect(0, 0, W, H);

  // Edges
  for (var e = 0; e < edges.length; e++) {
    var s = nodes[edges[e].source], t = nodes[edges[e].target];
    bgCtx.beginPath();
    bgCtx.moveTo(s.x, s.y);
    bgCtx.lineTo(t.x, t.y);
    var samePop = s.population && t.population && s.population.id === t.population.id;
    if (samePop) {
      var ec = s.population.color;
      bgCtx.strokeStyle = 'rgba(' + ec[0] + ',' + ec[1] + ',' + ec[2] + ',0.22)';
    } else {
      bgCtx.strokeStyle = 'rgba(79,195,247,0.1)';
    }
    bgCtx.lineWidth = 0.5 + (edges[e].weight / 20) * 0.5;
    bgCtx.stroke();
  }

  // Population territory zones
  var popCentroidData = {};
  for (var i = 0; i < nodes.length; i++) {
    if (!nodes[i].population) continue;
    var pid = nodes[i].population.id;
    if (!popCentroidData[pid]) popCentroidData[pid] = { sx: 0, sy: 0, count: 0, pop: nodes[i].population, maxDist: 0 };
    popCentroidData[pid].sx += nodes[i].x;
    popCentroidData[pid].sy += nodes[i].y;
    popCentroidData[pid].count++;
  }
  for (var pid in popCentroidData) {
    var pc = popCentroidData[pid];
    pc.cx = pc.sx / pc.count;
    pc.cy = pc.sy / pc.count;
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].population || nodes[i].population.id !== pid) continue;
      var ddx = nodes[i].x - pc.cx, ddy = nodes[i].y - pc.cy;
      var dd = Math.sqrt(ddx * ddx + ddy * ddy);
      if (dd > pc.maxDist) pc.maxDist = dd;
    }
  }
  if (!HM.isMobile) {
    for (var pid in popCentroidData) {
      var pc = popCentroidData[pid];
      var pop = pc.pop;
      var blobR = pc.maxDist + 40;
      var zoneGrad = bgCtx.createRadialGradient(pc.cx, pc.cy, blobR * 0.1, pc.cx, pc.cy, blobR);
      zoneGrad.addColorStop(0, 'rgba(' + pop.color[0] + ',' + pop.color[1] + ',' + pop.color[2] + ',0.03)');
      zoneGrad.addColorStop(0.6, 'rgba(' + pop.color[0] + ',' + pop.color[1] + ',' + pop.color[2] + ',0.015)');
      zoneGrad.addColorStop(1, 'rgba(' + pop.color[0] + ',' + pop.color[1] + ',' + pop.color[2] + ',0)');
      bgCtx.beginPath(); bgCtx.arc(pc.cx, pc.cy, blobR, 0, Math.PI * 2);
      bgCtx.fillStyle = zoneGrad; bgCtx.fill();
    }
  }

  // Nodes
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var pc = n.population ? n.population.color : [79,195,247];

    if (HM.isMobile) {
      // Simple solid circles on mobile — no prerender, no glow
      bgCtx.beginPath();
      bgCtx.arc(n.x, n.y, n.radius * 0.25, 0, Math.PI * 2);
      bgCtx.fillStyle = 'rgb(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ')';
      bgCtx.fill();
    } else {
      var glowR = n.radius * 1.15;
      var glow = bgCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      glow.addColorStop(0, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0.06)');
      glow.addColorStop(0.8, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0)');
      glow.addColorStop(1, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0)');
      bgCtx.beginPath(); bgCtx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      bgCtx.fillStyle = glow; bgCtx.fill();

      if (n.prerender) {
        var s = n.prerender.width;
        bgCtx.drawImage(n.prerender, n.x - s / 2, n.y - s / 2);
      }
    }

    var outlineR = HM.isMobile ? n.radius * 0.25 : n.radius * 0.6;
    if (n.population) {
      bgCtx.beginPath(); bgCtx.arc(n.x, n.y, outlineR, 0, Math.PI * 2);
      bgCtx.strokeStyle = 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0.6)';
      bgCtx.lineWidth = HM.isMobile ? 0.8 : 1.5;
      bgCtx.stroke();
    }

    if (n._isHub && !HM.isMobile) {
      bgCtx.beginPath(); bgCtx.arc(n.x, n.y, n.radius + 5, 0, Math.PI * 2);
      bgCtx.strokeStyle = 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0.35)';
      bgCtx.lineWidth = 1;
      bgCtx.setLineDash([3, 3]);
      bgCtx.stroke();
      bgCtx.setLineDash([]);
    }
  }

  // Population legend (bottom bar)
  var sortedPops = [];
  for (var pid in popCentroidData) sortedPops.push(popCentroidData[pid].pop);
  sortedPops.sort(function(a, b) { return a.xBand - b.xBand; });
  if (sortedPops.length > 0) {
    var legY = HM.H - 18;
    var letterGap = 1.5;
    bgCtx.font = '12px "Courier New", monospace';
    // measure total width with letter spacing
    var totalW = 0;
    for (var li = 0; li < sortedPops.length; li++) {
      var chars = sortedPops[li].name.split('');
      var nameW = 0;
      for (var ci = 0; ci < chars.length; ci++) nameW += bgCtx.measureText(chars[ci]).width + letterGap;
      totalW += 12 + nameW + 24;
    }
    var startX = (HM.W - totalW) / 2;
    for (var li = 0; li < sortedPops.length; li++) {
      var pop = sortedPops[li];
      var c = pop.color;
      // dot
      bgCtx.beginPath();
      bgCtx.arc(startX + 4, legY, 4, 0, Math.PI * 2);
      bgCtx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      bgCtx.fill();
      // name - draw char by char for letter spacing
      bgCtx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.9)';
      bgCtx.textAlign = 'left';
      var cx = startX + 12;
      var chars = pop.name.split('');
      for (var ci = 0; ci < chars.length; ci++) {
        bgCtx.fillText(chars[ci], cx, legY + 4);
        cx += bgCtx.measureText(chars[ci]).width + letterGap;
      }
      startX += 12 + cx - (startX + 12) + 24;
    }
    bgCtx.textAlign = 'center';
  }
};

// ── Firing system ──
HM.fireNode = function(idx, intensity, sourceIdx) {
  var fires = HM.fires;
  var nodes = HM.nodes;
  for (var f = 0; f < fires.length; f++) {
    if (fires[f].nodeIdx === idx && fires[f].intensity > 0.3) return;
  }
  var decay = HM.currentTier.decayRate + 0.01 / Math.sqrt((nodes[idx].data.score || 1));
  fires.push({ nodeIdx: idx, intensity: intensity || 1.0, decayRate: decay, propagated: false, sourceIdx: sourceIdx !== undefined ? sourceIdx : -1 });
};

HM.pickFromPopulation = function(popId) {
  var nodes = HM.nodes;
  var candidates = [];
  for (var i = 0; i < nodes.length; i++) {
    if (!popId || (nodes[i].population && nodes[i].population.id === popId)) {
      candidates.push(i);
    }
  }
  if (candidates.length === 0) return Math.floor(Math.random() * nodes.length);
  var totalScore = 0;
  for (var c = 0; c < candidates.length; c++) totalScore += (nodes[candidates[c]].data.score || 1);
  var r = Math.random() * totalScore, acc = 0;
  for (var c = 0; c < candidates.length; c++) {
    acc += (nodes[candidates[c]].data.score || 1);
    if (acc >= r) return candidates[c];
  }
  return candidates[0];
};

HM.startAutoFire = function() {
  if (HM.autoFireTimer) clearTimeout(HM.autoFireTimer);
  var nodes = HM.nodes;
  function doFire() {
    if (nodes.length === 0) return;

    var burstCount = HM.isMobile ? (3 + Math.floor(Math.random() * 4)) : (2 + Math.floor(Math.random() * 4));
    for (var b = 0; b < burstCount; b++) {
      var delay = b * (200 + Math.random() * 400);
      (function(d) {
        setTimeout(function() {
          var hasPopulations = nodes[0] && nodes[0].population;
          if (hasPopulations) {
            var pattern = Math.random();
            if (pattern < 0.35) {
              HM.fireNode(HM.pickFromPopulation('sensors'), 0.7 + Math.random() * 0.3);
            } else if (pattern < 0.5 && HM.currentTier.min >= 18000) {
              HM.fireNode(HM.pickFromPopulation('memory'), 0.7 + Math.random() * 0.3);
            } else if (pattern < 0.65 && HM.currentTier.min >= 5600) {
              HM.fireNode(HM.pickFromPopulation('relays'), 0.7 + Math.random() * 0.3);
            } else {
              HM.fireNode(HM.pickFromPopulation(null), 0.6 + Math.random() * 0.4);
            }
          } else {
            HM.fireNode(HM.pickFromPopulation(null), 0.6 + Math.random() * 0.4);
          }
        }, d);
      })(delay);
    }

    var baseInterval = HM.currentTier.fireInterval * (HM.isMobile ? 0.35 : 0.35);
    var jitter = (Math.random() - 0.5) * baseInterval * 0.4;
    HM.autoFireTimer = setTimeout(doFire, baseInterval + jitter);
  }
  var jitter = (Math.random() - 0.5) * HM.currentTier.fireInterval * 0.2;
  HM.autoFireTimer = setTimeout(doFire, HM.currentTier.fireInterval * 0.25 + jitter);
};

// ── Animation loop ──
HM.maxEdgeWeight = 1;

HM.animLoop = function() {
  var nodes = HM.nodes, edges = HM.edges, fires = HM.fires, signals = HM.signals;
  var fxCtx = HM.fxCtx;
  var W = HM.W, H = HM.H;
  var mobile = HM.isMobile;
  var maxFires = mobile ? 60 : 50;
  var maxSignals = mobile ? 100 : 200;
  fxCtx.clearRect(0, 0, W, H);

  if (edges.length > 0 && HM.maxEdgeWeight === 1) {
    for (var e = 0; e < edges.length; e++) {
      if (edges[e].weight > HM.maxEdgeWeight) HM.maxEdgeWeight = edges[e].weight;
    }
  }

  // Update fires
  for (var f = fires.length - 1; f >= 0; f--) {
    var fire = fires[f];
    fire.intensity *= (1 - fire.decayRate);

    if (!fire.propagated && fire.intensity < HM.currentTier.threshold) {
      fire.propagated = true;
      var nodeEdges = nodes[fire.nodeIdx].edgeIndices;
      var maxProp = mobile ? Math.min(8, nodeEdges.length) : nodeEdges.length;
      for (var e = 0; e < maxProp; e++) {
        var ei = nodeEdges[e];
        var edge = edges[ei];
        var dir = edge.source === fire.nodeIdx ? 1 : -1;
        var destIdx = dir === 1 ? edge.target : edge.source;
        if (destIdx === fire.sourceIdx) continue;
        var propIntensity = fire.intensity * HM.currentTier.propagation;
        if (mobile && (signals.length >= maxSignals || Math.random() < 0.25)) {
          // Skip signal animation — fire neighbor directly (cheap)
          if (propIntensity > 0.08 && fires.length < maxFires) {
            HM.fireNode(destIdx, propIntensity * 0.7, fire.nodeIdx);
          }
        } else {
          var dup = false;
          for (var s = 0; s < signals.length; s++) {
            if (signals[s].edgeIdx === ei && signals[s].direction === dir) { dup = true; break; }
          }
          if (!dup) {
            var speed = 0.012 + 0.008 * (edge.weight / HM.maxEdgeWeight);
            signals.push({ edgeIdx: ei, progress: 0, speed: speed, direction: dir, intensity: propIntensity });
          }
        }
      }
    }

    if (fire.intensity < 0.02) { fires.splice(f, 1); }
  }
  // Cap fires on mobile
  while (fires.length > maxFires) fires.shift();

  // Update signals
  for (var s = signals.length - 1; s >= 0; s--) {
    var sig = signals[s];
    sig.progress += sig.speed;
    if (sig.progress >= 1.0) {
      var edge = edges[sig.edgeIdx];
      var destIdx = sig.direction === 1 ? edge.target : edge.source;
      var srcIdx = sig.direction === 1 ? edge.source : edge.target;
      if (sig.intensity > 0.08 && fires.length < maxFires) {
        HM.fireNode(destIdx, sig.intensity, srcIdx);
      }
      signals.splice(s, 1);
    }
  }

  // Render active edges + signal dots
  for (var s = 0; s < signals.length; s++) {
    var sig = signals[s];
    var edge = edges[sig.edgeIdx];
    var sn = nodes[edge.source], tn = nodes[edge.target];
    var sx = sig.direction === 1 ? sn.x : tn.x;
    var sy = sig.direction === 1 ? sn.y : tn.y;
    var ex = sig.direction === 1 ? tn.x : sn.x;
    var ey = sig.direction === 1 ? tn.y : sn.y;

    var srcNode = sig.direction === 1 ? sn : tn;
    var sigCol = srcNode.population ? srcNode.population.color : [79,195,247];
    var sigColBright = [Math.min(255, sigCol[0]+80), Math.min(255, sigCol[1]+80), Math.min(255, sigCol[2]+80)];

    fxCtx.beginPath();
    fxCtx.moveTo(sn.x, sn.y);
    fxCtx.lineTo(tn.x, tn.y);
    fxCtx.strokeStyle = 'rgba(' + sigCol[0] + ',' + sigCol[1] + ',' + sigCol[2] + ',' + (0.25 + 0.35 * sig.intensity) + ')';
    fxCtx.lineWidth = 1;
    fxCtx.stroke();

    var px = sx + (ex - sx) * sig.progress;
    var py = sy + (ey - sy) * sig.progress;
    var dotR = 2 + sig.intensity * 1.3;

    if (mobile) {
      // Bigger dot + soft glow halo
      var mDotR = dotR * 1.4;
      fxCtx.beginPath(); fxCtx.arc(px, py, mDotR * 2, 0, Math.PI * 2);
      fxCtx.fillStyle = 'rgba(' + sigCol[0] + ',' + sigCol[1] + ',' + sigCol[2] + ',' + (sig.intensity * 0.15) + ')';
      fxCtx.fill();
      fxCtx.beginPath(); fxCtx.arc(px, py, mDotR, 0, Math.PI * 2);
      fxCtx.fillStyle = 'rgba(' + sigColBright[0] + ',' + sigColBright[1] + ',' + sigColBright[2] + ',' + Math.min(1, sig.intensity * 1.3) + ')';
      fxCtx.fill();
    } else {
      var dotGlow = fxCtx.createRadialGradient(px, py, 0, px, py, dotR * 1.3);
      dotGlow.addColorStop(0, 'rgba(' + sigColBright[0] + ',' + sigColBright[1] + ',' + sigColBright[2] + ',' + (sig.intensity * 0.7) + ')');
      dotGlow.addColorStop(1, 'rgba(' + sigCol[0] + ',' + sigCol[1] + ',' + sigCol[2] + ',0)');
      fxCtx.beginPath(); fxCtx.arc(px, py, dotR * 1.3, 0, Math.PI * 2);
      fxCtx.fillStyle = dotGlow; fxCtx.fill();
      fxCtx.beginPath(); fxCtx.arc(px, py, dotR, 0, Math.PI * 2);
      fxCtx.fillStyle = 'rgba(' + sigColBright[0] + ',' + sigColBright[1] + ',' + sigColBright[2] + ',' + Math.min(1, sig.intensity * 1.5) + ')';
      fxCtx.fill();

      // Trail (desktop only)
      for (var t = 1; t <= 3; t++) {
        var tp = sig.progress - t * 0.03;
        if (tp < 0) continue;
        var tx = sx + (ex - sx) * tp;
        var ty = sy + (ey - sy) * tp;
        fxCtx.beginPath(); fxCtx.arc(tx, ty, dotR * (1 - t * 0.2), 0, Math.PI * 2);
        fxCtx.fillStyle = 'rgba(' + sigCol[0] + ',' + sigCol[1] + ',' + sigCol[2] + ',' + (sig.intensity * (0.5 - t * 0.12)) + ')';
        fxCtx.fill();
      }
    }
  }

  // Render firing nodes
  for (var f = 0; f < fires.length; f++) {
    var fire = fires[f];
    var nd = nodes[fire.nodeIdx];
    var pc = nd.population ? nd.population.color : [200,240,255];

    if (mobile) {
      // Larger glow circle for visible firing
      var mfR = nd.radius * 1.2 * fire.intensity;
      fxCtx.beginPath(); fxCtx.arc(nd.x, nd.y, mfR * 2, 0, Math.PI * 2);
      fxCtx.fillStyle = 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',' + (fire.intensity * 0.15) + ')';
      fxCtx.fill();
      fxCtx.beginPath(); fxCtx.arc(nd.x, nd.y, mfR, 0, Math.PI * 2);
      fxCtx.fillStyle = 'rgba(' + Math.min(255, pc[0]+55) + ',' + Math.min(255, pc[1]+55) + ',' + Math.min(255, pc[2]+55) + ',' + (fire.intensity * 0.55) + ')';
      fxCtx.fill();
    } else {
      var glowR = nd.radius * 2 * fire.intensity;
      var glow = fxCtx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, glowR);
      glow.addColorStop(0, 'rgba(' + Math.min(255, pc[0]+55) + ',' + Math.min(255, pc[1]+55) + ',' + Math.min(255, pc[2]+55) + ',' + (fire.intensity * 0.5) + ')');
      glow.addColorStop(0.4, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',' + (fire.intensity * 0.2) + ')');
      glow.addColorStop(1, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0)');
      fxCtx.beginPath(); fxCtx.arc(nd.x, nd.y, glowR, 0, Math.PI * 2);
      fxCtx.fillStyle = glow; fxCtx.fill();
    }
  }

  // Hovered node highlight
  if (HM.hoveredNode >= 0) {
    var hn = nodes[HM.hoveredNode];
    for (var e = 0; e < hn.edgeIndices.length; e++) {
      var edge = edges[hn.edgeIndices[e]];
      var s = nodes[edge.source], t = nodes[edge.target];
      fxCtx.beginPath(); fxCtx.moveTo(s.x, s.y); fxCtx.lineTo(t.x, t.y);
      fxCtx.strokeStyle = 'rgba(79,195,247,0.25)';
      fxCtx.lineWidth = 1.5;
      fxCtx.stroke();
    }
    fxCtx.beginPath(); fxCtx.arc(hn.x, hn.y, hn.radius + 4, 0, Math.PI * 2);
    fxCtx.strokeStyle = 'rgba(79,195,247,0.5)';
    fxCtx.lineWidth = 1;
    fxCtx.stroke();
    var hpc = hn.population ? hn.population.color : [79,195,247];
    fxCtx.font = '700 10px "Courier New", monospace';
    fxCtx.fillStyle = 'rgb(' + hpc[0] + ',' + hpc[1] + ',' + hpc[2] + ')';
    fxCtx.textAlign = 'center';
    fxCtx.fillText((hn.data.name || 'ANON').toUpperCase(), hn.x, hn.y - hn.radius - 10);
  }

  if (!HM.hivePaused) requestAnimationFrame(HM.animLoop);
};

window.HM = HM;
