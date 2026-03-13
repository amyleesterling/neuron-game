// ── Main glue: Supabase init, canvas setup, data fetch, mouse interaction ──
(function() {
  var HM = window.HM || {};

  // ── Supabase ──
  var sb = supabase.createClient(
    'https://amyxocqdfcaeieerqllv.supabase.co',
    'sb_publishable_uvng-9IdwolvuiCG9pQTIQ_1gyaKOVH'
  );

  // ── Mobile detection ──
  HM.isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

  // ── Canvas setup ──
  var bgCanvas = document.getElementById('bgCanvas');
  var fxCanvas = document.getElementById('fxCanvas');
  HM.bgCtx = bgCanvas.getContext('2d');
  HM.fxCtx = fxCanvas.getContext('2d');

  function resize() {
    HM.W = window.innerWidth; HM.H = window.innerHeight;
    bgCanvas.width = HM.W; bgCanvas.height = HM.H;
    fxCanvas.width = HM.W; fxCanvas.height = HM.H;
  }
  resize();
  window.addEventListener('resize', function() { resize(); if (HM.nodes.length) { HM.layoutAndRender(); } });

  // ── Data ──
  HM.nodes = [];
  HM.edges = [];
  HM.fires = [];
  HM.signals = [];
  HM.currentTier = HM.ANIMAL_TIERS[0];
  HM.hoveredNode = -1;
  HM.autoFireTimer = null;
  HM.hivePaused = false;
  var mouseX = -1, mouseY = -1;

  window.HM = HM;

  // ── Init learn cards ──
  HM.initLearnCards();

  // ── Fetch data from both sources and merge ──
  Promise.all([
    sb.from('neuron_gallery')
      .select('name, score, branches, soma_x, soma_y, axon_pts, cols, rows, created_at')
      .order('score', { ascending: false }),
    sb.from('neuron_snake_leaderboard')
      .select('name, score, created_at')
      .gt('score', 0)
      .order('score', { ascending: false })
  ]).then(function(results) {
    var galleryRes = results[0];
    var lbRes = results[1];
    var galleryData = (galleryRes.data || []);
    var lbData = (lbRes.data || []);

    var galleryKeys = {};
    for (var i = 0; i < galleryData.length; i++) {
      galleryData[i]._hasShape = true;
      galleryKeys[galleryData[i].name + '|' + galleryData[i].score] = true;
    }

    var lbOnly = [];
    for (var j = 0; j < lbData.length; j++) {
      var key = lbData[j].name + '|' + lbData[j].score;
      if (!galleryKeys[key]) lbOnly.push(lbData[j]);
    }

    var totalNeurons = galleryData.length + lbOnly.length;
    var activePops = [];
    for (var pi = 0; pi < HM.POPULATIONS.length; pi++) {
      if (totalNeurons >= HM.POPULATIONS[pi].unlockMin) activePops.push(HM.POPULATIONS[pi]);
    }
    var popWeights = [];
    var totalPW = 0;
    for (var pi = 0; pi < activePops.length; pi++) {
      var pw = HM.POP_WEIGHTS[activePops[pi].id];
      var laterPops = activePops.length - (pi + 1);
      var w = pw.base - pw.decay * laterPops;
      w = Math.max(0.04, w);
      popWeights.push({ pop: activePops[pi], weight: w });
      totalPW += w;
    }
    for (var pi = 0; pi < popWeights.length; pi++) popWeights[pi].weight /= totalPW;

    var SCORE_BINS = [1, 3, 6, 10, 15, 25, 50, Infinity];
    var clusters = [];
    for (var b = 0; b < SCORE_BINS.length; b++) {
      var lo = b === 0 ? 1 : SCORE_BINS[b - 1];
      var hi = SCORE_BINS[b];
      var members = [];
      for (var k = 0; k < lbOnly.length; k++) {
        var s = lbOnly[k].score || 0;
        if (s >= lo && s < hi) members.push(lbOnly[k]);
      }
      if (members.length === 0) continue;
      var totalScore = 0;
      for (var m = 0; m < members.length; m++) totalScore += members[m].score || 0;
      var label = hi === Infinity ? (lo + '+') : (lo + '-' + (hi - 1));

      var remaining = members.length;
      for (var pi = 0; pi < popWeights.length; pi++) {
        var count = pi === popWeights.length - 1 ? remaining : Math.round(members.length * popWeights[pi].weight);
        count = Math.min(count, remaining);
        if (count <= 0) continue;
        remaining -= count;
        var binScore = Math.round(totalScore * (count / members.length));
        clusters.push({
          name: count + ' neurons (score ' + label + ')',
          score: binScore,
          _hasShape: false,
          _isCluster: true,
          _clusterCount: count,
          _clusterAvg: Math.round(totalScore / members.length * 10) / 10,
          _assignPop: popWeights[pi].pop.id,
          created_at: members[0].created_at
        });
      }
    }

    var merged = galleryData.slice();
    for (var c = 0; c < clusters.length; c++) merged.push(clusters[c]);
    merged.sort(function(a, b) { return (b.score || 0) - (a.score || 0); });

    var totalNeuronCount = galleryData.length + lbOnly.length;

    if (!merged.length) {
      document.querySelector('#loading .loadText').textContent = 'NO NEURONS FOUND';
      return;
    }
    HM.initNetwork(merged, totalNeuronCount);
    document.getElementById('loading').style.display = 'none';
  });

  // ── Mouse interaction ──
  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  fxCanvas.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    HM.hoveredNode = -1;
    for (var i = 0; i < HM.nodes.length; i++) {
      var dx = mouseX - HM.nodes[i].x, dy = mouseY - HM.nodes[i].y;
      if (Math.sqrt(dx * dx + dy * dy) < HM.nodes[i].radius + 8) {
        HM.hoveredNode = i;
        break;
      }
    }

    var tooltip = document.getElementById('tooltip');
    if (HM.hoveredNode >= 0) {
      var nd = HM.nodes[HM.hoveredNode];
      if (nd.data._isCluster) {
        document.getElementById('ttName').textContent = nd.data._clusterCount + ' NEURONS';
        document.getElementById('ttScore').textContent = 'AVG SCORE ' + nd.data._clusterAvg + ' · ' + nd.data.score + ' TOTAL SYNAPSES';
      } else {
        document.getElementById('ttName').textContent = (nd.data.name || 'ANON').toUpperCase();
        document.getElementById('ttScore').textContent = nd.data.score + ' SYNAPSES';
      }
      var ttPop = document.getElementById('ttPop');
      if (nd.population) {
        var pc = nd.population.color;
        ttPop.textContent = nd.population.name;
        ttPop.style.color = 'rgb(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ')';
        ttPop.style.display = 'block';
      } else {
        ttPop.style.display = 'none';
      }
      document.getElementById('ttDate').textContent = formatDate(nd.data.created_at);
      var cc = nd.data.country_code;
      document.getElementById('ttFlag').innerHTML = cc ? '<img src="https://flagcdn.com/w20/' + cc.toLowerCase() + '.png" style="height:10px;vertical-align:middle;margin-right:4px;">' : '';
      tooltip.style.display = 'block';
      var tx = mouseX + 16, ty = mouseY + 16;
      if (tx + 220 > HM.W) tx = mouseX - 230;
      if (ty + 80 > HM.H) ty = mouseY - 90;
      tooltip.style.left = tx + 'px';
      tooltip.style.top = ty + 'px';
      fxCanvas.style.cursor = 'pointer';
    } else {
      tooltip.style.display = 'none';
      fxCanvas.style.cursor = 'crosshair';
    }
  });

  fxCanvas.addEventListener('click', function(e) {
    if (HM.hoveredNode >= 0) {
      HM.fireNode(HM.hoveredNode, 1.0);
    } else {
      var best = -1, bestDist = Infinity;
      for (var i = 0; i < HM.nodes.length; i++) {
        var dx = e.clientX - HM.nodes[i].x, dy = e.clientY - HM.nodes[i].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < bestDist) { bestDist = d; best = i; }
      }
      if (best >= 0 && bestDist < 100) HM.fireNode(best, 0.8);
    }
  });

  fxCanvas.addEventListener('mouseleave', function() {
    HM.hoveredNode = -1;
    document.getElementById('tooltip').style.display = 'none';
  });

  // ── Touch support ──
  fxCanvas.addEventListener('touchstart', function(e) {
    var t = e.touches[0];
    var best = -1, bestDist = Infinity;
    for (var i = 0; i < HM.nodes.length; i++) {
      var dx = t.clientX - HM.nodes[i].x, dy = t.clientY - HM.nodes[i].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    if (best >= 0 && bestDist < 40) {
      HM.hoveredNode = best;
      HM.fireNode(best, 1.0);
      var nd = HM.nodes[best];
      var tooltip = document.getElementById('tooltip');
      if (nd.data._isCluster) {
        document.getElementById('ttName').textContent = nd.data._clusterCount + ' NEURONS';
        document.getElementById('ttScore').textContent = 'AVG SCORE ' + nd.data._clusterAvg + ' · ' + nd.data.score + ' TOTAL SYNAPSES';
      } else {
        document.getElementById('ttName').textContent = (nd.data.name || 'ANON').toUpperCase();
        document.getElementById('ttScore').textContent = nd.data.score + ' SYNAPSES';
      }
      tooltip.style.display = 'block';
      tooltip.style.left = Math.min(t.clientX + 10, HM.W - 200) + 'px';
      tooltip.style.top = Math.max(t.clientY - 80, 10) + 'px';
    } else if (best >= 0 && bestDist < 100) {
      HM.fireNode(best, 0.8);
    }
  }, { passive: true });

  fxCanvas.addEventListener('touchend', function() {
    setTimeout(function() {
      HM.hoveredNode = -1;
      document.getElementById('tooltip').style.display = 'none';
    }, 1500);
  }, { passive: true });

})();
