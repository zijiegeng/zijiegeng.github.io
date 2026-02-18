/**
 * Interactive Particle Network / Constellation Background
 * DPR-aware, multi-color, mouse-interactive with birth/death effects.
 */
(function() {
  'use strict';

  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduce) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d', { alpha: true });

  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild);

  var W = 0, H = 0, dpr = 1;

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = canvas.width  = Math.floor(window.innerWidth * dpr);
    H = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  resize();

  var rand = function(a, b) { return a + Math.random() * (b - a); };

  var palette = [
    { r: 91,  g: 92,  b: 255, a: 0.72 },
    { r: 0,   g: 184, b: 217, a: 0.68 },
    { r: 43,  g: 217, b: 124, a: 0.52 }
  ];

  function rgba(c, aMul) {
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a * (aMul || 1)) + ')';
  }

  var particles = [];
  var TARGET_COUNT = 0;

  function densityCount() {
    var base = Math.sqrt(window.innerWidth * window.innerHeight) / 3.8;
    return Math.max(40, Math.min(90, Math.round(base)));
  }

  function makeParticle(x, y) {
    var c = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: x !== undefined ? x : rand(0, W),
      y: y !== undefined ? y : rand(0, H),
      vx: rand(-0.38, 0.38) * dpr,
      vy: rand(-0.34, 0.34) * dpr,
      r: rand(1.0, 2.4) * dpr,
      c: c,
      t: rand(0, Math.PI * 2),
      life: 1.0,
      dying: false,
      age: 0,
      maxAge: rand(600, 1800)
    };
  }

  function init() {
    particles.length = 0;
    TARGET_COUNT = densityCount();
    for (var i = 0; i < TARGET_COUNT; i++) {
      var p = makeParticle();
      p.age = rand(0, p.maxAge * 0.8);
      particles.push(p);
    }
  }
  init();

  var mouse = { x: W * 0.5, y: H * 0.35, vx: 0, vy: 0, has: false };
  var lastPX = null, lastPY = null;
  var spawnCooldown = 0;

  window.addEventListener('pointermove', function(e) {
    var x = e.clientX * dpr;
    var y = e.clientY * dpr;
    mouse.has = true;
    if (lastPX !== null) {
      mouse.vx = x - lastPX;
      mouse.vy = y - lastPY;
    }
    mouse.x = x;
    mouse.y = y;
    lastPX = x;
    lastPY = y;
  }, { passive: true });

  window.addEventListener('pointerleave', function() {
    mouse.has = false;
    mouse.vx = mouse.vy = 0;
  }, { passive: true });

  var time = 0;
  var animId;

  function draw() {
    time++;
    ctx.clearRect(0, 0, W, H);

    var cx = mouse.has ? mouse.x : W * 0.5 + Math.sin(time * 0.003) * W * 0.15;
    var cy = mouse.has ? mouse.y : H * 0.35 + Math.cos(time * 0.004) * H * 0.10;
    var maxDim = Math.max(W, H) * 0.55;
    var wash = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim);
    wash.addColorStop(0, 'rgba(91,92,255,0.06)');
    wash.addColorStop(0.45, 'rgba(0,184,217,0.04)');
    wash.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    var influenceR = 200 * dpr;
    var influenceR2 = influenceR * influenceR;
    var killR = 60 * dpr;
    var killR2 = killR * killR;
    var i, j, p, a, b, dx, dy, d2, d, k, near;

    if (spawnCooldown > 0) spawnCooldown--;

    for (i = particles.length - 1; i >= 0; i--) {
      p = particles[i];
      p.age++;
      p.t += 0.012 + rand(-0.002, 0.002);

      if (p.age > p.maxAge && !p.dying) {
        p.dying = true;
      }

      if (p.dying) {
        p.life -= 0.015;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
      } else if (p.life < 1.0) {
        p.life = Math.min(1.0, p.life + 0.02);
      }

      var wobbleX = Math.sin(p.t) * 0.08 * dpr;
      var wobbleY = Math.cos(p.t * 1.3) * 0.06 * dpr;

      if (mouse.has) {
        dx = mouse.x - p.x;
        dy = mouse.y - p.y;
        d2 = dx * dx + dy * dy;

        if (d2 < killR2 && !p.dying && spawnCooldown === 0) {
          var mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
          if (mouseSpeed > 3 * dpr) {
            p.dying = true;
            spawnCooldown = 3;
          }
        }

        if (d2 < influenceR2) {
          d = Math.sqrt(d2) + 0.001;
          k = (1 - d / influenceR) * 0.006 * dpr;
          var mvx = Math.max(-14 * dpr, Math.min(14 * dpr, mouse.vx)) * 0.0001;
          var mvy = Math.max(-14 * dpr, Math.min(14 * dpr, mouse.vy)) * 0.0001;
          p.vx += (dx / d) * k + mvx;
          p.vy += (dy / d) * k + mvy;
        }
      }

      p.vx *= 0.988;
      p.vy *= 0.988;
      p.x += p.vx + wobbleX;
      p.y += p.vy + wobbleY;

      var m = 50 * dpr;
      if (p.x < -m) p.x = W + m;
      if (p.x > W + m) p.x = -m;
      if (p.y < -m) p.y = H + m;
      if (p.y > H + m) p.y = -m;
    }

    if (particles.length < TARGET_COUNT && time % 4 === 0) {
      var newP;
      if (mouse.has) {
        var angle = rand(0, Math.PI * 2);
        var dist = rand(120, 280) * dpr;
        newP = makeParticle(
          mouse.x + Math.cos(angle) * dist,
          mouse.y + Math.sin(angle) * dist
        );
      } else {
        newP = makeParticle();
      }
      newP.life = 0.0;
      particles.push(newP);
    }

    var linkDist = 130 * dpr;
    var linkDist2 = linkDist * linkDist;
    var alpha;

    for (i = 0; i < particles.length; i++) {
      for (j = i + 1; j < particles.length; j++) {
        a = particles[i];
        b = particles[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 > linkDist2) continue;

        d = Math.sqrt(d2);
        alpha = (1 - d / linkDist) * 0.22 * Math.min(a.life, b.life);

        if (mouse.has) {
          var mx = (a.x + b.x) * 0.5 - mouse.x;
          var my = (a.y + b.y) * 0.5 - mouse.y;
          var md2 = mx * mx + my * my;
          if (md2 < (220 * dpr) * (220 * dpr)) alpha *= 1.3;
        }

        if (alpha < 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(10,14,22,' + alpha + ')';
        ctx.lineWidth = 1 * dpr * 0.35;
        ctx.stroke();
      }
    }

    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      near = 0;
      if (mouse.has) {
        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        d = Math.sqrt(dx * dx + dy * dy);
        near = Math.max(0, 1 - d / (200 * dpr));
      }
      var aMul = (0.38 + near * 0.65) * p.life;

      if (aMul < 0.01) continue;

      ctx.beginPath();
      ctx.arc(p.x, p.y, (p.r + near * 1.2 * dpr) * p.life, 0, Math.PI * 2);
      ctx.fillStyle = rgba(p.c, aMul);
      ctx.fill();

      if (near > 0.18 && p.life > 0.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.r + 3.8 * dpr + near * 2.4 * dpr) * p.life, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,184,217,' + (near * 0.16 * p.life) + ')';
        ctx.lineWidth = 1 * dpr * 0.3;
        ctx.stroke();
      }
    }

    animId = requestAnimationFrame(draw);
  }

  animId = requestAnimationFrame(draw);

  var resizeTimer = null;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      resize();
      init();
    }, 200);
  }, { passive: true });

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(draw);
    }
  });
})();
