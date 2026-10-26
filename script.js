(() => {
  "use strict";

  const starsCanvas = document.getElementById("space");
  const starsCtx = starsCanvas.getContext("2d");
  const blackHoleCanvas = document.getElementById("gargantua");
  const ctx = blackHoleCanvas.getContext("2d");
  const planets = [
    { el: document.querySelector(".nuclear"), angle: 0.3, speed: 0.30, rx: 245, ry: 116, phase: 0.0, color: [105, 174, 255], fall: 0 },
    { el: document.querySelector(".semiconductor"), angle: 2.0, speed: 0.42, rx: 170, ry: 82, phase: 1.4, color: [94, 238, 255], fall: 0 },
    { el: document.querySelector(".mechanics"), angle: 3.4, speed: 0.23, rx: 315, ry: 150, phase: 2.8, color: [210, 125, 255], fall: 0 },
    { el: document.querySelector(".radio"), angle: 5.0, speed: 0.19, rx: 405, ry: 190, phase: 4.1, color: [255, 190, 105], fall: 0 }
  ];

  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  let lastTime = 0;

  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const canvas of [starsCanvas, blackHoleCanvas]) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    makeStars();
  }

  function makeStars() {
    stars = [];
    const count = Math.min(1000, Math.floor(width * height / 1150));
    for (let i = 0; i < count; i++) {
      const layer = Math.random();
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: layer < .72 ? Math.random() * .8 + .15 : Math.random() * 1.45 + .35,
        alpha: Math.random() * .65 + .2,
        speed: (layer < .72 ? .7 : 2.1) * (Math.random() * .65 + .45),
        twinkle: Math.random() * 6.28
      });
    }
  }

  function holePosition(t) {
    return {
      x: width / 2 + Math.cos(t * 0.00012) * Math.min(56, width * .06),
      y: height / 2 + Math.sin(t * 0.000085) * Math.min(35, height * .045)
    };
  }

  function drawStars(dt, t) {
    const c = starsCtx;
    c.clearRect(0, 0, width, height);
    const nebula = c.createRadialGradient(width * .72, height * .28, 0, width * .72, height * .28, Math.max(width, height) * .7);
    nebula.addColorStop(0, "rgba(32,42,94,.16)");
    nebula.addColorStop(.55, "rgba(15,22,55,.08)");
    nebula.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = nebula;
    c.fillRect(0, 0, width, height);

    for (const s of stars) {
      s.x -= s.speed * dt * .012;
      if (s.x < -2) { s.x = width + 2; s.y = Math.random() * height; }
      const pulse = .75 + .25 * Math.sin(t * .001 + s.twinkle);
      c.beginPath();
      c.fillStyle = `rgba(220,230,255,${s.alpha * pulse})`;
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      c.fill();
      if (s.r > 1.35) {
        c.strokeStyle = `rgba(190,215,255,${s.alpha * pulse * .35})`;
        c.lineWidth = .6;
        c.beginPath();
        c.moveTo(s.x - 3, s.y); c.lineTo(s.x + 3, s.y);
        c.moveTo(s.x, s.y - 3); c.lineTo(s.x, s.y + 3);
        c.stroke();
      }
    }
  }

  function drawBlackHole(cx, cy, t, radius) {
    const c = ctx;
    c.clearRect(0, 0, width, height);

    // Diffuse gravitational glow
    const halo = c.createRadialGradient(cx, cy, radius * .8, cx, cy, radius * 3.5);
    halo.addColorStop(0, "rgba(255,126,45,.16)");
    halo.addColorStop(.35, "rgba(255,111,34,.09)");
    halo.addColorStop(1, "rgba(255,100,20,0)");
    c.fillStyle = halo;
    c.fillRect(cx - radius * 4, cy - radius * 4, radius * 8, radius * 8);

    // Back side of the accretion disk
    c.save();
    c.translate(cx, cy);
    c.scale(1, .28);
    for (let i = 0; i < 34; i++) {
      const r = radius * (1.12 + i * .055);
      c.beginPath();
      c.ellipse(0, 0, r * 1.55, r, 0, Math.PI, Math.PI * 2);
      c.strokeStyle = `rgba(${255},${145 + Math.min(75, i * 2)},${65 + Math.min(90, i * 2)},${.035 + .008 * (1 - i / 34)})`;
      c.lineWidth = 1.2 + (34 - i) * .09;
      c.stroke();
    }
    c.restore();

    // Hot, turbulent accretion disk
    c.save();
    c.translate(cx, cy);
    c.rotate(-.08);
    c.scale(1, .24);
    for (let i = 0; i < 46; i++) {
      const r = radius * (1.18 + i * .047);
      const phase = t * .00016 + i * .13;
      c.beginPath();
      c.ellipse(0, 0, r * 1.65, r, 0, phase, phase + Math.PI * (1.1 + .45 * Math.sin(t * .0003 + i)));
      const hot = Math.max(0, 1 - i / 50);
      c.strokeStyle = `rgba(255,${Math.floor(115 + hot * 125)},${Math.floor(45 + hot * 130)},${.035 + hot * .105})`;
      c.lineWidth = 1 + hot * 2.5;
      c.stroke();
    }
    c.restore();

    // Photon ring
    for (let i = 0; i < 8; i++) {
      c.beginPath();
      c.arc(cx, cy, radius * (1.02 + i * .009), 0, Math.PI * 2);
      c.strokeStyle = `rgba(255,225,170,${.18 - i * .018})`;
      c.lineWidth = i < 2 ? 2.1 : 1;
      c.stroke();
    }

    // Event horizon
    const black = c.createRadialGradient(cx - radius * .18, cy - radius * .2, radius * .06, cx, cy, radius * 1.04);
    black.addColorStop(0, "#000");
    black.addColorStop(.78, "#000");
    black.addColorStop(.96, "#020207");
    black.addColorStop(1, "rgba(255,169,94,.25)");
    c.beginPath();
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.fillStyle = black;
    c.fill();

    // Front half of the disk, drawn over the horizon edge
    c.save();
    c.translate(cx, cy + radius * .04);
    c.scale(1, .23);
    for (let i = 0; i < 22; i++) {
      const r = radius * (1.18 + i * .075);
      c.beginPath();
      c.ellipse(0, 0, r * 1.55, r, 0, .04, Math.PI - .04);
      c.strokeStyle = `rgba(255,${Math.floor(165 + i * 3)},${Math.floor(90 + i * 4)},${.08 - i * .002})`;
      c.lineWidth = 1.2 + (22 - i) * .09;
      c.stroke();
    }
    c.restore();
  }

  function positionPlanet(p, x, y, scale, opacity) {
    if (!p.el) return;
    p.el.style.left = `${x}px`;
    p.el.style.top = `${y}px`;
    p.el.style.opacity = String(opacity);
    p.el.style.filter = `brightness(${Math.max(.3, opacity)})`;
    p.el.style.setProperty("--orbit-scale", scale);
    const core = p.el.querySelector(".planet-core");
    if (core) core.style.transform = `scale(${scale})`;
  }

  function animate(now) {
    const dt = Math.min(40, now - (lastTime || now));
    lastTime = now;
    const t = now;
    drawStars(dt, t);
    const hole = holePosition(t);
    const radius = Math.max(36, Math.min(width, height) * .085);
    drawBlackHole(hole.x, hole.y, t, radius);

    const smallScreen = width < 650;
    const scale = smallScreen ? .62 : Math.min(1, width / 1200);
    const maxRX = Math.max(100, width * .43);
    const maxRY = Math.max(90, height * .30);

    planets.forEach((p, i) => {
      // Each object periodically enters a decaying spiral, then returns to its outer orbit.
      p.angle += p.speed * dt * .001;
      if (p.fall > 0) {
        p.fall += dt * .00022;
        if (p.fall >= 1) {
          p.fall = 0;
          p.angle += 1.1 + i * .3;
        }
      } else if (Math.sin(p.angle * .19 + p.phase) > .985) {
        p.fall = .001;
      }

      let inward = p.fall > 0 ? Math.min(.96, p.fall * p.fall * 1.08) : 0;
      const rx = Math.min(p.rx * scale, maxRX) * (1 - inward);
      const ry = Math.min(p.ry * scale, maxRY) * (1 - inward);
      const angle = p.angle + p.phase;
      const warp = 1 + .045 * Math.sin(t * .001 + i);
      const x = hole.x + Math.cos(angle) * rx * warp;
      const y = hole.y + Math.sin(angle) * ry;
      const opacity = p.fall > 0 ? Math.max(0, 1 - p.fall * 1.15) : 1;
      const planetScale = (smallScreen ? .78 : 1) * (p.fall > 0 ? Math.max(.08, 1 - p.fall) : 1);
      positionPlanet(p, x, y, planetScale, opacity);
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(animate);
})();
