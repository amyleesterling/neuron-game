// ── Learn Cards System & Controller ──
var HM = window.HM || {};

HM.LEARN_CARDS = [
  {
    title: 'What Is the Hive Mind?',
    body: 'A living network built from player-grown neurons. Each node is a neuron. Each link is a synapse-style connection. Together, they form a brain-inspired web assembled not by biologists, but by you.\n\nSignals drift directionally: from sensing, through processing, toward action.',
    draw: function(ctx, w, h, t) {
      var seed = 42;
      function srand() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }
      var nn = 18, pts = [], eg = [];
      seed = 42;
      for (var i = 0; i < nn; i++) {
        pts.push({ x: 40 + (w - 80) * (i / (nn - 1)) + (srand() - 0.5) * 60, y: 40 + (h - 80) * srand(), r: 3 + srand() * 4 });
      }
      seed = 42;
      for (var i = 0; i < nn; i++) {
        var conns = 1 + Math.floor(srand() * 2);
        for (var c = 0; c < conns; c++) {
          var j = Math.min(nn - 1, i + 1 + Math.floor(srand() * 3));
          if (j !== i) eg.push([i, j]);
        }
      }
      for (var i = 0; i < nn; i++) {
        pts[i].x += Math.sin(t * 0.4 + i * 1.3) * 3;
        pts[i].y += Math.cos(t * 0.5 + i * 0.9) * 2;
      }
      for (var e = 0; e < eg.length; e++) {
        var a = pts[eg[e][0]], b = pts[eg[e][1]];
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(79,195,247,0.12)'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      var sigIdx = Math.floor(t * 2) % eg.length;
      for (var s = 0; s < 3; s++) {
        var ei = (sigIdx + s * 5) % eg.length;
        var a = pts[eg[ei][0]], b = pts[eg[ei][1]];
        var prog = ((t * 1.5 + s * 2.1) % 3) / 3;
        var sx = a.x + (b.x - a.x) * prog, sy = a.y + (b.y - a.y) * prog;
        var grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
        grd.addColorStop(0, 'rgba(79,195,247,' + (0.8 - prog * 0.4) + ')');
        grd.addColorStop(1, 'rgba(79,195,247,0)');
        ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160,230,255,0.9)'; ctx.fill();
      }
      var cols = [[79,195,247],[180,100,220],[220,100,100]];
      for (var i = 0; i < nn; i++) {
        var frac = i / (nn - 1);
        var ci = frac < 0.33 ? 0 : frac < 0.66 ? 1 : 2;
        var cc = cols[ci];
        var glow = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, pts[i].r * 3);
        glow.addColorStop(0, 'rgba(' + cc[0] + ',' + cc[1] + ',' + cc[2] + ',0.5)');
        glow.addColorStop(1, 'rgba(' + cc[0] + ',' + cc[1] + ',' + cc[2] + ',0)');
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + cc[0] + ',' + cc[1] + ',' + cc[2] + ',0.8)'; ctx.fill();
      }
      ctx.globalAlpha = 0.15 + Math.sin(t) * 0.05;
      ctx.font = '10px "Courier New",monospace';
      ctx.fillStyle = '#4fc3f7'; ctx.textAlign = 'left';
      ctx.fillText('SENSE', 16, h - 12);
      ctx.textAlign = 'right';
      ctx.fillText('ACT', w - 16, h - 12);
      ctx.textAlign = 'center';
      ctx.fillText('\u2192  \u2192  \u2192', w / 2, h - 12);
      ctx.globalAlpha = 1;
    }
  },
  {
    title: 'How Neurons Work',
    body: 'Neurons receive signals, weigh them, and \u2014 if the signal is strong enough \u2014 fire. They talk to each other at synapses: tiny handshakes between cells.\n\nOne firing neuron means almost nothing. Ten thousand firing in waves? That\u2019s a thought. Your brain does this with 86 billion neurons.',
    draw: function(ctx, w, h, t) {
      var cx = w * 0.4, cy = h * 0.5;
      var somaR = 20;
      var cycle = t % 5;
      var dends = [
        {x: cx - 80, y: cy - 50, mx: cx - 45, my: cy - 25},
        {x: cx - 90, y: cy + 10, mx: cx - 50, my: cy + 5},
        {x: cx - 70, y: cy + 55, mx: cx - 40, my: cy + 30},
        {x: cx - 60, y: cy - 70, mx: cx - 30, my: cy - 40}
      ];
      ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      for (var d = 0; d < dends.length; d++) {
        ctx.beginPath();
        ctx.moveTo(dends[d].x, dends[d].y);
        ctx.quadraticCurveTo(dends[d].mx, dends[d].my, cx - somaR, cy + (d - 1.5) * 8);
        ctx.strokeStyle = 'rgba(79,195,247,0.3)'; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(dends[d].x, dends[d].y);
        ctx.lineTo(dends[d].x - 15, dends[d].y - 12);
        ctx.moveTo(dends[d].x, dends[d].y);
        ctx.lineTo(dends[d].x - 10, dends[d].y + 15);
        ctx.strokeStyle = 'rgba(79,195,247,0.15)'; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.lineWidth = 1.5;
      }
      ctx.beginPath();
      ctx.moveTo(cx + somaR, cy);
      ctx.bezierCurveTo(cx + 60, cy - 10, cx + 80, cy + 20, cx + 120, cy + 5);
      ctx.bezierCurveTo(cx + 140, cy - 5, cx + 150, cy + 15, w - 30, cy + 8);
      ctx.strokeStyle = 'rgba(220,100,100,0.35)'; ctx.lineWidth = 2; ctx.stroke();
      for (var at = 0; at < 3; at++) {
        var ax = w - 30 + at * 4, ay = cy + 8 + (at - 1) * 16;
        ctx.beginPath(); ctx.arc(ax, ay, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220,100,100,0.4)'; ctx.fill();
      }
      if (cycle < 2.5) {
        var sigProg = cycle / 2.5;
        for (var d = 0; d < dends.length; d++) {
          var dp = Math.min(1, sigProg + d * 0.15);
          if (dp > 1) dp = 1;
          var sx = dends[d].x + (cx - somaR - dends[d].x) * dp;
          var sy = dends[d].y + (cy + (d - 1.5) * 8 - dends[d].y) * dp;
          var grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
          grd.addColorStop(0, 'rgba(79,195,247,0.9)');
          grd.addColorStop(1, 'rgba(79,195,247,0)');
          ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
      }
      var fireIntensity = 0;
      if (cycle >= 2.2 && cycle < 3.2) {
        fireIntensity = cycle < 2.7 ? (cycle - 2.2) / 0.5 : 1 - (cycle - 2.7) / 0.5;
        fireIntensity = Math.max(0, fireIntensity);
      }
      var somaGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, somaR * 2.5);
      var gi = 0.2 + fireIntensity * 0.6;
      somaGlow.addColorStop(0, 'rgba(255,229,102,' + gi + ')');
      somaGlow.addColorStop(0.4, 'rgba(79,195,247,' + (gi * 0.5) + ')');
      somaGlow.addColorStop(1, 'rgba(79,195,247,0)');
      ctx.beginPath(); ctx.arc(cx, cy, somaR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = somaGlow; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, somaR, 0, Math.PI * 2);
      ctx.fillStyle = fireIntensity > 0.1 ? 'rgba(255,229,102,' + (0.5 + fireIntensity * 0.5) + ')' : 'rgba(79,195,247,0.5)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(79,195,247,0.6)'; ctx.lineWidth = 1.2; ctx.stroke();
      if (cycle >= 2.8) {
        var axProg = (cycle - 2.8) / 2.0;
        if (axProg <= 1) {
          var axLen = w - 30 - (cx + somaR);
          var px = cx + somaR + axLen * axProg;
          var py = cy + Math.sin(axProg * Math.PI * 2) * 10;
          var grd = ctx.createRadialGradient(px, py, 0, px, py, 10);
          grd.addColorStop(0, 'rgba(255,140,60,' + (0.9 - axProg * 0.5) + ')');
          grd.addColorStop(1, 'rgba(220,100,100,0)');
          ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
      }
      ctx.globalAlpha = 0.25;
      ctx.font = '9px "Courier New",monospace'; ctx.fillStyle = '#4fc3f7';
      ctx.textAlign = 'center';
      ctx.fillText('DENDRITES', cx - 65, h - 10);
      ctx.fillText('SOMA', cx, h - 10);
      ctx.fillText('AXON', cx + 100, h - 10);
      ctx.globalAlpha = 1;
    }
  },
  {
    title: 'Jobs in the Network',
    body: 'Networks work because different parts do different things. A brain isn\u2019t a uniform soup \u2014 it\u2019s a division of labor.\n\nSome neurons are connectors, linking populations that would otherwise stay separate. In real brains these hubs are disproportionately important. In this graph, you can spot them: they\u2019re the ones with the dashed rings and they come from the top 15% scorers.',
    draw: function(ctx, w, h, t) {
      var groups = [
        { cx: w * 0.22, cy: h * 0.4, col: [79,195,247], label: 'SENSORS', nodes: [] },
        { cx: w * 0.5, cy: h * 0.65, col: [180,100,220], label: 'BRIDGE', nodes: [] },
        { cx: w * 0.78, cy: h * 0.4, col: [220,100,100], label: 'MOTORS', nodes: [] }
      ];
      var hub = { x: w * 0.5, y: h * 0.35, r: 8 };
      var seed = 77;
      function sr() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
      for (var g = 0; g < 3; g++) {
        seed = 77 + g * 31;
        for (var i = 0; i < 6; i++) {
          var angle = (i / 6) * Math.PI * 2 + t * 0.15;
          var dist = 25 + sr() * 20;
          groups[g].nodes.push({
            x: groups[g].cx + Math.cos(angle) * dist + Math.sin(t * 0.3 + i) * 2,
            y: groups[g].cy + Math.sin(angle) * dist + Math.cos(t * 0.4 + i) * 2,
            r: 3 + sr() * 2
          });
        }
      }
      for (var g = 0; g < 3; g++) {
        var ns = groups[g].nodes;
        var c = groups[g].col;
        for (var i = 0; i < ns.length; i++) {
          for (var j = i + 1; j < ns.length; j++) {
            if (Math.abs(i - j) <= 2 || (i === 0 && j === ns.length - 1)) {
              ctx.beginPath(); ctx.moveTo(ns[i].x, ns[i].y); ctx.lineTo(ns[j].x, ns[j].y);
              ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.15)';
              ctx.lineWidth = 0.6; ctx.stroke();
            }
          }
        }
      }
      for (var g = 0; g < 3; g++) {
        var ns = groups[g].nodes;
        for (var i = 0; i < 3; i++) {
          ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(ns[i].x, ns[i].y);
          ctx.strokeStyle = 'rgba(255,229,102,0.2)'; ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
      for (var g = 0; g < 3; g++) {
        var c = groups[g].col;
        for (var i = 0; i < groups[g].nodes.length; i++) {
          var n = groups[g].nodes[i];
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.7)'; ctx.fill();
        }
        ctx.globalAlpha = 0.3; ctx.font = '9px "Courier New",monospace';
        ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
        ctx.textAlign = 'center';
        ctx.fillText(groups[g].label, groups[g].cx, groups[g].cy + 55);
        ctx.globalAlpha = 1;
      }
      var hubGlow = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 24);
      hubGlow.addColorStop(0, 'rgba(255,229,102,0.4)');
      hubGlow.addColorStop(1, 'rgba(255,229,102,0)');
      ctx.beginPath(); ctx.arc(hub.x, hub.y, 24, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow; ctx.fill();
      ctx.beginPath(); ctx.arc(hub.x, hub.y, hub.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,229,102,0.9)'; ctx.fill();
      ctx.beginPath(); ctx.arc(hub.x, hub.y, hub.r + 6, 0, Math.PI * 2);
      ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(255,229,102,0.5)';
      ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
      var pulse = (t * 0.8) % 3;
      if (pulse < 1) {
        var pr = hub.r + 6 + pulse * 30;
        ctx.beginPath(); ctx.arc(hub.x, hub.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,229,102,' + (0.3 * (1 - pulse)) + ')';
        ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.globalAlpha = 0.35; ctx.font = '700 9px "Courier New",monospace';
      ctx.fillStyle = '#ffe566'; ctx.textAlign = 'center';
      ctx.fillText('HUB', hub.x, hub.y - 20);
      ctx.globalAlpha = 1;
    }
  },
  {
    title: 'Why This Graph Moves',
    body: 'A force-directed graph shows structure, not anatomy. Think of it as a subway map for thought: not the physical tunnels, but the routes, junctions, and traffic that make the whole system work.\n\nThe motion reveals clusters, hubs, and hidden highways of influence \u2014 plus a loose left-to-right flow, from sensing to doing, just like a real nervous system.',
    draw: function(ctx, w, h, t) {
      var lines = [
        { col: [79,195,247], pts: [[30,50],[100,50],[160,90],[250,90],[330,50],[w-30,50]] },
        { col: [220,180,60], pts: [[30,h*0.45],[90,h*0.45],[140,h*0.55],[220,h*0.55],[280,h*0.4],[w-30,h*0.4]] },
        { col: [220,100,100], pts: [[30,h-50],[120,h-50],[180,h-80],[260,h-80],[320,h-50],[w-30,h-50]] },
        { col: [180,100,220], pts: [[100,30],[100,h*0.45],[160,h*0.55],[160,h-80],[260,h-80]] }
      ];
      for (var l = 0; l < lines.length; l++) {
        var c = lines[l].col, ps = lines[l].pts;
        ctx.beginPath();
        ctx.moveTo(ps[0][0], ps[0][1]);
        for (var p = 1; p < ps.length; p++) ctx.lineTo(ps[p][0], ps[p][1]);
        ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.3)';
        ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
      }
      for (var l = 0; l < lines.length; l++) {
        var c = lines[l].col, ps = lines[l].pts;
        for (var p = 0; p < ps.length; p++) {
          ctx.beginPath(); ctx.arc(ps[p][0], ps[p][1], 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.7)'; ctx.fill();
          ctx.beginPath(); ctx.arc(ps[p][0], ps[p][1], 2, 0, Math.PI * 2);
          ctx.fillStyle = '#fff'; ctx.fill();
        }
      }
      for (var l = 0; l < lines.length; l++) {
        var c = lines[l].col, ps = lines[l].pts;
        var totalLen = 0, segs = [];
        for (var p = 1; p < ps.length; p++) {
          var dx = ps[p][0] - ps[p-1][0], dy = ps[p][1] - ps[p-1][1];
          var sl = Math.sqrt(dx * dx + dy * dy);
          segs.push({ len: sl, start: totalLen });
          totalLen += sl;
        }
        var speed = 40 + l * 12;
        var pos = ((t * speed + l * 100) % (totalLen * 2));
        if (pos > totalLen) pos = totalLen * 2 - pos;
        var cumLen = 0;
        for (var s = 0; s < segs.length; s++) {
          if (cumLen + segs[s].len >= pos) {
            var frac = (pos - cumLen) / segs[s].len;
            var tx = ps[s][0] + (ps[s+1][0] - ps[s][0]) * frac;
            var ty = ps[s][1] + (ps[s+1][1] - ps[s][1]) * frac;
            var grd = ctx.createRadialGradient(tx, ty, 0, tx, ty, 10);
            grd.addColorStop(0, 'rgba(' + Math.min(255,c[0]+60) + ',' + Math.min(255,c[1]+60) + ',' + Math.min(255,c[2]+60) + ',0.9)');
            grd.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');
            ctx.beginPath(); ctx.arc(tx, ty, 10, 0, Math.PI * 2);
            ctx.fillStyle = grd; ctx.fill();
            ctx.beginPath(); ctx.arc(tx, ty, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.fill();
            break;
          }
          cumLen += segs[s].len;
        }
      }
      ctx.globalAlpha = 0.15 + Math.sin(t * 2) * 0.05;
      ctx.font = '9px "Courier New",monospace'; ctx.fillStyle = '#a0d8f0';
      ctx.textAlign = 'left'; ctx.fillText('JUNCTION', 165, h * 0.55 + 18);
      ctx.globalAlpha = 1;
    }
  },
  {
    title: 'How Activity Becomes Behavior',
    body: 'When signals ripple through a network, patterns emerge. In real nervous systems, those patterns produce movement, choice, memory, reflex \u2014 even the song currently stuck in your head.\n\nThe hive mind can\u2019t think. Not yet. But it runs on the same logic.',
    draw: function(ctx, w, h, t) {
      var cols = 7, rows = 3;
      var pts = [];
      var padX = 50, padY = 40;
      var spacingX = (w - padX * 2) / (cols - 1);
      var spacingY = (h - padY * 2) / (rows - 1);
      for (var c = 0; c < cols; c++) {
        for (var r = 0; r < rows; r++) {
          pts.push({
            x: padX + c * spacingX + Math.sin(t * 0.3 + c + r) * 3,
            y: padY + r * spacingY + Math.cos(t * 0.4 + c * 0.5) * 2,
            col: c, row: r
          });
        }
      }
      for (var i = 0; i < pts.length; i++) {
        for (var j = 0; j < pts.length; j++) {
          if (pts[j].col === pts[i].col + 1 && Math.abs(pts[j].row - pts[i].row) <= 1) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = 'rgba(79,195,247,0.1)'; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      var waveFront = ((t * 0.7) % 4) / 4 * (cols + 2) - 1;
      for (var i = 0; i < pts.length; i++) {
        var dist = pts[i].col - waveFront;
        var intensity = 0;
        if (dist > -0.5 && dist < 2) {
          intensity = 1 - Math.abs(dist - 0.5) / 1.5;
          intensity = Math.max(0, Math.min(1, intensity));
        }
        if (dist < 0 && dist > -3) {
          var trail = 1 + dist / 3;
          intensity = Math.max(intensity, trail * 0.3);
        }
        var r = 4 + intensity * 4;
        if (intensity > 0.05) {
          var grd = ctx.createRadialGradient(pts[i].x, pts[i].y, 0, pts[i].x, pts[i].y, r * 3);
          grd.addColorStop(0, 'rgba(255,229,102,' + (intensity * 0.6) + ')');
          grd.addColorStop(1, 'rgba(79,195,247,0)');
          ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        var blend = intensity;
        var nr = Math.round(79 + (255 - 79) * blend);
        var ng = Math.round(195 + (229 - 195) * blend);
        var nb = Math.round(247 + (102 - 247) * blend);
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + nr + ',' + ng + ',' + nb + ',' + (0.4 + intensity * 0.6) + ')';
        ctx.fill();
      }
      if (waveFront > cols - 1.5 && waveFront < cols + 0.5) {
        var burstI = 1 - Math.abs(waveFront - (cols - 0.5));
        burstI = Math.max(0, burstI);
        var bx = w - padX + 10, by = h / 2;
        var bgrd = ctx.createRadialGradient(bx, by, 0, bx, by, 40 * burstI);
        bgrd.addColorStop(0, 'rgba(255,140,60,' + (burstI * 0.5) + ')');
        bgrd.addColorStop(0.5, 'rgba(220,100,100,' + (burstI * 0.2) + ')');
        bgrd.addColorStop(1, 'rgba(220,100,100,0)');
        ctx.beginPath(); ctx.arc(bx, by, 40 * burstI, 0, Math.PI * 2);
        ctx.fillStyle = bgrd; ctx.fill();
        ctx.globalAlpha = burstI * 0.5;
        ctx.font = '700 11px "Courier New",monospace'; ctx.fillStyle = '#ff8c3c';
        ctx.textAlign = 'center'; ctx.fillText('ACTION', bx, by + 50);
        ctx.globalAlpha = 1;
      }
    }
  },
  {
    title: 'Want the Real Thing?',
    body: 'This hive mind is inspired by connectomics: the science of mapping every neuron and synapse in a nervous system. Researchers have mapped some small entire brains down to individual synapses.\n\nThe wiring is stranger and more beautiful than anyone expected. It even allows us to simulate real brains!',
    draw: function(ctx, w, h, t) {
      var cx = w / 2, cy = h / 2 - 5;
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy + 30);
      ctx.bezierCurveTo(cx - 90, cy - 20, cx - 70, cy - 60, cx - 20, cy - 55);
      ctx.bezierCurveTo(cx, cy - 70, cx + 10, cy - 68, cx + 20, cy - 55);
      ctx.bezierCurveTo(cx + 70, cy - 60, cx + 90, cy - 20, cx + 70, cy + 30);
      ctx.bezierCurveTo(cx + 50, cy + 55, cx - 50, cy + 55, cx - 70, cy + 30);
      ctx.strokeStyle = 'rgba(79,195,247,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - 55);
      ctx.quadraticCurveTo(cx + 5, cy - 20, cx - 2, cy + 30);
      ctx.strokeStyle = 'rgba(79,195,247,0.1)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy - 30); ctx.quadraticCurveTo(cx - 30, cy - 15, cx - 40, cy + 10);
      ctx.moveTo(cx + 50, cy - 30); ctx.quadraticCurveTo(cx + 30, cy - 15, cx + 40, cy + 10);
      ctx.strokeStyle = 'rgba(79,195,247,0.08)'; ctx.stroke();
      var seed = 123;
      function sr() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
      var synPts = [];
      seed = 123;
      for (var i = 0; i < 35; i++) {
        var ang = sr() * Math.PI * 2;
        var rad = sr() * 55;
        synPts.push({ x: cx + Math.cos(ang) * rad * 1.2, y: cy + Math.sin(ang) * rad * 0.8 });
      }
      var activeIdx = Math.floor((t * 3) % synPts.length);
      var recentCount = 8;
      for (var i = 0; i < synPts.length; i++) {
        var age = (activeIdx - i + synPts.length) % synPts.length;
        var bright = 0;
        if (age < recentCount) bright = 1 - age / recentCount;
        if (bright > 0) {
          var grd = ctx.createRadialGradient(synPts[i].x, synPts[i].y, 0, synPts[i].x, synPts[i].y, 6 + bright * 4);
          grd.addColorStop(0, 'rgba(79,195,247,' + (bright * 0.8) + ')');
          grd.addColorStop(1, 'rgba(79,195,247,0)');
          ctx.beginPath(); ctx.arc(synPts[i].x, synPts[i].y, 6 + bright * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(synPts[i].x, synPts[i].y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,195,247,' + (0.15 + bright * 0.7) + ')'; ctx.fill();
        if (bright > 0.3) {
          for (var j = i + 1; j < synPts.length; j++) {
            var dx = synPts[j].x - synPts[i].x, dy = synPts[j].y - synPts[i].y;
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
              ctx.beginPath(); ctx.moveTo(synPts[i].x, synPts[i].y); ctx.lineTo(synPts[j].x, synPts[j].y);
              ctx.strokeStyle = 'rgba(79,195,247,' + (bright * 0.2) + ')';
              ctx.lineWidth = 0.5; ctx.stroke();
            }
          }
        }
      }
      var scanY = cy - 55 + ((t * 20) % 110);
      ctx.beginPath(); ctx.moveTo(cx - 80, scanY); ctx.lineTo(cx + 80, scanY);
      ctx.strokeStyle = 'rgba(79,195,247,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    }
  },
  {
    title: 'Explore the Real Thing',
    body: 'Explore the real neurons of the fruit fly connectome at FlyWire Codex. Scientists mapped all 139,255 neurons and 54.5 million synapses in the adult fruit fly brain.\n\nThen come back and grow a few more of your own.',
    cta: { label: 'EXPLORE FLYWIRE CODEX', url: 'https://codex.flywire.ai' },
    draw: function(ctx, w, h, t) {
      var cx = w / 2, cy = h / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 8, 14, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,195,247,0.08)'; ctx.fill();
      ctx.strokeStyle = 'rgba(79,195,247,0.3)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy + 22, 18, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,195,247,0.05)'; ctx.fill();
      ctx.strokeStyle = 'rgba(79,195,247,0.25)'; ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy - 25, 12, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,195,247,0.08)'; ctx.fill();
      ctx.strokeStyle = 'rgba(79,195,247,0.35)'; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx - 10, cy - 28, 5, 4, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,80,80,0.5)'; ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 10, cy - 28, 5, 4, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,80,80,0.5)'; ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.ellipse(cx - 35, cy - 5, 28, 12, -0.4, 0, Math.PI * 2);
      ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx + 35, cy - 5, 28, 12, 0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy - 33); ctx.quadraticCurveTo(cx - 15, cy - 55, cx - 22, cy - 58);
      ctx.moveTo(cx + 6, cy - 33); ctx.quadraticCurveTo(cx + 15, cy - 55, cx + 22, cy - 58);
      ctx.strokeStyle = 'rgba(79,195,247,0.3)'; ctx.lineWidth = 0.8; ctx.stroke();
      for (var side = -1; side <= 1; side += 2) {
        for (var leg = 0; leg < 3; leg++) {
          var ly = cy - 5 + leg * 12;
          ctx.beginPath();
          ctx.moveTo(cx + side * 14, ly);
          ctx.lineTo(cx + side * 35, ly + 8 + leg * 3);
          ctx.strokeStyle = 'rgba(79,195,247,0.15)'; ctx.lineWidth = 0.6; ctx.stroke();
        }
      }
      var npts = [];
      var seed = 55;
      function sr() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
      seed = 55;
      for (var i = 0; i < 20; i++) {
        npts.push({
          x: cx + (sr() - 0.5) * 24,
          y: cy - 20 + sr() * 55
        });
      }
      for (var i = 0; i < npts.length; i++) {
        for (var j = i + 1; j < npts.length; j++) {
          var dx = npts[j].x - npts[i].x, dy = npts[j].y - npts[i].y;
          if (Math.sqrt(dx * dx + dy * dy) < 25) {
            ctx.beginPath(); ctx.moveTo(npts[i].x, npts[i].y); ctx.lineTo(npts[j].x, npts[j].y);
            ctx.strokeStyle = 'rgba(79,195,247,0.1)'; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      }
      var activeN = Math.floor((t * 4) % npts.length);
      for (var i = 0; i < npts.length; i++) {
        var age = (activeN - i + npts.length) % npts.length;
        var bright = age < 5 ? 1 - age / 5 : 0;
        if (bright > 0) {
          var grd = ctx.createRadialGradient(npts[i].x, npts[i].y, 0, npts[i].x, npts[i].y, 5);
          grd.addColorStop(0, 'rgba(79,195,247,' + (bright * 0.7) + ')');
          grd.addColorStop(1, 'rgba(79,195,247,0)');
          ctx.beginPath(); ctx.arc(npts[i].x, npts[i].y, 5, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(npts[i].x, npts[i].y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,195,247,' + (0.2 + bright * 0.6) + ')'; ctx.fill();
      }
      ctx.globalAlpha = 0.25; ctx.font = '9px "Courier New",monospace'; ctx.fillStyle = '#ffe566';
      ctx.textAlign = 'center';
      ctx.fillText('139,255 NEURONS \u00b7 54.5M SYNAPSES', cx, h - 10);
      ctx.globalAlpha = 1;
    }
  }
];

// ── Learn Cards Controller ──
HM.initLearnCards = function() {
  var currentCard = 0;
  var cardAnimFrames = [];
  var isOpen = false;
  var canvasEls = [];
  var canvasCtxs = [];
  var startTime = 0;

  function buildCards() {
    var canvasSlider = document.getElementById('lcCanvasSlider');
    var contentSlider = document.getElementById('lcContentSlider');
    var dots = document.getElementById('lcDots');
    canvasSlider.innerHTML = '';
    contentSlider.innerHTML = '';
    dots.innerHTML = '';

    for (var i = 0; i < HM.LEARN_CARDS.length; i++) {
      var card = HM.LEARN_CARDS[i];
      // Canvas slide
      var cSlide = document.createElement('div');
      cSlide.className = 'lc-canvas-slide';
      var cvs = document.createElement('canvas');
      cvs.width = 560; cvs.height = 220;
      cSlide.appendChild(cvs);
      canvasSlider.appendChild(cSlide);
      canvasEls.push(cvs);
      canvasCtxs.push(cvs.getContext('2d'));

      // Content slide
      var tSlide = document.createElement('div');
      tSlide.className = 'lc-content-slide';
      var html = '<div class="lc-title">' + card.title + '</div>';
      html += '<div class="lc-body">' + card.body.replace(/\n\n/g, '<br><br>') + '</div>';
      if (card.cta) {
        html += '<a class="lc-cta" href="' + card.cta.url + '" target="_blank" rel="noopener">' + card.cta.label + ' \u2192</a>';
      }
      tSlide.innerHTML = html;
      contentSlider.appendChild(tSlide);

      // Dot
      var dot = document.createElement('div');
      dot.className = 'lc-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-idx', i);
      dot.onclick = function() { goTo(parseInt(this.getAttribute('data-idx'))); };
      dots.appendChild(dot);
    }
  }

  function goTo(idx) {
    if (idx < 0 || idx >= HM.LEARN_CARDS.length) return;
    currentCard = idx;
    document.getElementById('lcCanvasSlider').style.transform = 'translateX(-' + (idx * 100) + '%)';
    document.getElementById('lcContentSlider').style.transform = 'translateX(-' + (idx * 100) + '%)';
    document.getElementById('lcCounter').textContent = (idx + 1) + ' / ' + HM.LEARN_CARDS.length;
    document.getElementById('lcPrev').disabled = idx === 0;
    document.getElementById('lcNext').disabled = idx === HM.LEARN_CARDS.length - 1;
    var dots = document.querySelectorAll('.lc-dot');
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle('active', d === idx);
    }
    document.getElementById('learnCardInner').scrollTop = 0;
  }

  function animateCards() {
    if (!isOpen) return;
    var elapsed = (performance.now() - startTime) / 1000;
    for (var i = Math.max(0, currentCard - 1); i <= Math.min(HM.LEARN_CARDS.length - 1, currentCard + 1); i++) {
      var cvs = canvasEls[i];
      var cCtx = canvasCtxs[i];
      cCtx.clearRect(0, 0, cvs.width, cvs.height);
      HM.LEARN_CARDS[i].draw(cCtx, cvs.width, cvs.height, elapsed);
    }
    requestAnimationFrame(animateCards);
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    if (canvasEls.length === 0) buildCards();
    goTo(0);
    document.getElementById('learnOverlay').classList.add('open');
    startTime = performance.now();
    requestAnimationFrame(animateCards);
    // Pause hive
    HM.hivePaused = true;
    if (HM.autoFireTimer) clearTimeout(HM.autoFireTimer);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    document.getElementById('learnOverlay').classList.remove('open');
    // Resume hive
    HM.hivePaused = false;
    HM.startAutoFire();
    requestAnimationFrame(HM.animLoop);
  }

  // Keyboard nav
  document.addEventListener('keydown', function(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') goTo(currentCard - 1);
    else if (e.key === 'ArrowRight') goTo(currentCard + 1);
  });

  // Touch swipe
  var touchStartX = 0;
  var learnCard = document.getElementById('learnCard');
  learnCard.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  learnCard.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo(currentCard + 1);
      else goTo(currentCard - 1);
    }
  }, { passive: true });

  window._learnCards = { open: open, close: close, next: function() { goTo(currentCard + 1); }, prev: function() { goTo(currentCard - 1); } };
};

window.HM = HM;
