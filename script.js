(() => {
  "use strict";

  const starsCanvas = document.getElementById("space");
  const starsCtx = starsCanvas.getContext("2d");
  const blackHoleCanvas = document.getElementById("gargantua");
  const ctx = blackHoleCanvas.getContext("2d");

  const planets = [
    {
      el: document.querySelector(".nuclear"),
      angle: 0.3, speed: 0.30,
      rx: 245, ry: 116, phase: 0.0,
      color: [105, 174, 255], fall: 0
    },
    {
      el: document.querySelector(".semiconductor"),
      angle: 2.0, speed: 0.42,
      rx: 170, ry: 82, phase: 1.4,
      color: [94, 238, 255], fall: 0
    },
    {
      el: document.querySelector(".mechanics"),
      angle: 3.4, speed: 0.23,
      rx: 315, ry: 150, phase: 2.8,
      color: [210, 125, 255], fall: 0
    },
    {
      el: document.querySelector(".radio"),
      angle: 5.0, speed: 0.19,
      rx: 405, ry: 190, phase: 4.1,
      color: [255, 190, 105], fall: 0
    }
  ];

  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  let lastTime = 0;

  // Розмір полотен і підтримка екранів високої роздільності.
  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    for (const canvas of [starsCanvas, blackHoleCanvas]) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      canvas.getContext("2d").setTransform(
        dpr, 0, 0, dpr, 0, 0
      );
    }

    makeStars();
  }

  // Генерація зоряного неба.
  function makeStars() {
    stars = [];

    const count = Math.min(
      1000,
      Math.floor(width * height / 1150)
    );

    for (let i = 0; i < count; i++) {
      const layer = Math.random();

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: layer < 0.72
          ? Math.random() * 0.8 + 0.15
          : Math.random() * 1.45 + 0.35,
        alpha: Math.random() * 0.65 + 0.2,
        speed: (layer < 0.72 ? 0.7 : 2.1)
          * (Math.random() * 0.65 + 0.45),
        twinkle: Math.random() * 6.28
      });
    }
  }

  // Повільний рух чорної діри в просторі.
  function holePosition(t) {
    return {
      x: width / 2
        + Math.cos(t * 0.00012) * Math.min(56, width * 0.06),

      y: height / 2
        + Math.sin(t * 0.000085) * Math.min(35, height * 0.045)
    };
  }

  // Зорі, паралакс і слабка туманність.
  function drawStars(dt, t) {
    const c = starsCtx;

    c.clearRect(0, 0, width, height);

    const nebula = c.createRadialGradient(
      width * 0.72,
      height * 0.28,
      0,
      width * 0.72,
      height * 0.28,
      Math.max(width, height) * 0.7
    );

    nebula.addColorStop(0, "rgba(32,42,94,0.16)");
    nebula.addColorStop(0.55, "rgba(15,22,55,0.08)");
    nebula.addColorStop(1, "rgba(0,0,0,0)");

    c.fillStyle = nebula;
    c.fillRect(0, 0, width, height);

    for (const s of stars) {
      s.x -= s.speed * dt * 0.012;

      if (s.x < -2) {
        s.x = width + 2;
        s.y = Math.random() * height;
      }

      const pulse = 0.75
        + 0.25 * Math.sin(t * 0.001 + s.twinkle);

      c.beginPath();
      c.fillStyle =
        `rgba(220,230,255,${s.alpha * pulse})`;

      c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      c.fill();

      // Промені на найяскравіших зорях.
      if (s.r > 1.35) {
        c.strokeStyle =
          `rgba(190,215,255,${s.alpha * pulse * 0.35})`;

        c.lineWidth = 0.6;
        c.beginPath();

        c.moveTo(s.x - 3, s.y);
        c.lineTo(s.x + 3, s.y);

        c.moveTo(s.x, s.y - 3);
        c.lineTo(s.x, s.y + 3);

        c.stroke();
      }
    }
  }

  // Чорна діра Гаргантюа, акреційний диск і лінзування.
  function drawBlackHole(cx, cy, t, radius) {
    const c = ctx;

    c.clearRect(0, 0, width, height);

    // Широке золотисто-помаранчеве світіння.
    const halo = c.createRadialGradient(
      cx, cy,
      radius * 0.72,
      cx, cy,
      radius * 4.4
    );

    halo.addColorStop(0, "rgba(255,244,205,0.30)");
    halo.addColorStop(0.12, "rgba(255,164,65,0.32)");
    halo.addColorStop(0.32, "rgba(255,94,20,0.20)");
    halo.addColorStop(0.62, "rgba(156,48,18,0.10)");
    halo.addColorStop(1, "rgba(0,0,0,0)");

    c.fillStyle = halo;

    c.fillRect(
      cx - radius * 4.5,
      cy - radius * 4.5,
      radius * 9,
      radius * 9
    );

    // Об'ємна плазма за диском.
    c.save();

    c.translate(cx, cy);
    c.rotate(-0.045);
    c.scale(1, 0.255);

    const plasma = c.createRadialGradient(
      0, 0,
      radius * 0.75,
      0, 0,
      radius * 4.0
    );

    plasma.addColorStop(0, "rgba(255,246,210,0.82)");
    plasma.addColorStop(0.12, "rgba(255,198,105,0.76)");
    plasma.addColorStop(0.30, "rgba(255,112,31,0.48)");
    plasma.addColorStop(0.62, "rgba(193,64,20,0.17)");
    plasma.addColorStop(1, "rgba(80,24,10,0)");

    c.fillStyle = plasma;
    c.beginPath();

    c.ellipse(
      0, 0,
      radius * 4.0,
      radius * 2.0,
      0, 0, Math.PI * 2
    );

    c.fill();
    c.restore();

    // Далека частина диска: багатошарові дуги.
    c.save();

    c.translate(cx, cy - radius * 0.015);
    c.rotate(-0.045);
    c.scale(1, 0.255);

    for (let i = 0; i < 54; i++) {
      const f = i / 53;
      const r = radius * (1.08 + f * 2.55);
      const alpha = 0.13 * (1 - f) + 0.025;

      c.beginPath();

      c.ellipse(
        0, 0,
        r * 1.48,
        r,
        0,
        Math.PI * 1.02,
        Math.PI * 1.98
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(118 + 112 * (1-f))},` +
        `${Math.floor(38 + 125 * (1-f))},${alpha})`;

      c.lineWidth = 1 + (1-f) * 2.1;
      c.stroke();
    }

    c.restore();

    // Яскраві турбулентні ділянки плазми.
    c.save();

    c.translate(cx, cy);
    c.rotate(-0.045);
    c.scale(1, 0.255);

    for (let i = 0; i < 64; i++) {
      const f = i / 63;
      const r = radius * (1.12 + f * 2.65);

      const phase =
        t * (0.00022 + f * 0.000035) + i * 0.17;

      const start = phase % (Math.PI * 2);
      const arc = 0.42 + 0.52 * (1 - f);
      const hot = Math.pow(1 - f, 1.6);

      c.beginPath();

      c.ellipse(
        0, 0,
        r * 1.5,
        r,
        0,
        start,
        start + arc + 0.35 * Math.sin(t * 0.0007 + i)
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(104 + 151 * hot)},` +
        `${Math.floor(22 + 180 * hot)},${0.08 + 0.23 * hot})`;

      c.lineWidth = 0.9 + hot * 3.3;
      c.stroke();
    }

    // Розпечена майже біла внутрішня частина диска.
    for (let i = 0; i < 18; i++) {
      const r = radius * (1.08 + i * 0.035);

      c.beginPath();

      c.ellipse(
        0, 0,
        r * 1.52,
        r,
        0,
        0.10 + i * 0.018,
        Math.PI * 1.9 - i * 0.018
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(248 - i * 4)},` +
        `${Math.floor(210 - i * 6)},${0.34 - i * 0.012})`;

      c.lineWidth = 2.2 - i * 0.055;
      c.stroke();
    }

    c.restore();

    // ГРАВІТАЦІЙНЕ ЛІНЗУВАННЯ:
    // світло далекої частини диска викривлюється над горизонтом.
    c.save();

    c.translate(cx, cy - radius * 0.68);
    c.scale(1, 0.42);

    for (let i = 0; i < 13; i++) {
      c.beginPath();

      c.ellipse(
        0, 0,
        radius * (1.06 + i * 0.045),
        radius * (1.06 + i * 0.045),
        0,
        Math.PI * 1.08,
        Math.PI * 1.92
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(225 + (12-i)*2)},` +
        `${Math.floor(155 + (12-i)*4)},${0.22 - i * 0.012})`;

      c.lineWidth = i < 3 ? 2.1 : 1.15;
      c.stroke();
    }

    c.restore();

    // Фотонне кільце навколо горизонту подій.
    for (let i = 0; i < 12; i++) {
      c.beginPath();

      c.arc(
        cx, cy,
        radius * (1.015 + i * 0.006),
        0, Math.PI * 2
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(226 - i * 5)},` +
        `${Math.floor(160 - i * 5)},${0.42 - i * 0.028})`;

      c.lineWidth = i < 2 ? 2.8 : 1.15;
      c.stroke();
    }

    // Горизонт подій — глибоко чорний із золотистим краєм.
    const black = c.createRadialGradient(
      cx - radius * 0.2,
      cy - radius * 0.24,
      radius * 0.03,
      cx, cy,
      radius * 1.055
    );

    black.addColorStop(0, "#000000");
    black.addColorStop(0.82, "#000000");
    black.addColorStop(0.94, "#010105");
    black.addColorStop(0.975, "rgba(255,145,49,0.22)");
    black.addColorStop(1, "rgba(255,211,135,0.92)");

    c.beginPath();
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.fillStyle = black;
    c.fill();

    // Ближня частина диска проходить перед нижнім краєм діри.
    c.save();

    c.translate(cx, cy + radius * 0.10);
    c.rotate(-0.045);
    c.scale(1, 0.22);

    for (let i = 0; i < 30; i++) {
      const f = i / 29;
      const r = radius * (1.10 + f * 1.85);

      c.beginPath();

      c.ellipse(
        0, 0,
        r * 1.58,
        r,
        0,
        0.035,
        Math.PI - 0.035
      );

      const alpha = 0.25 * (1 - f) + 0.035;

      c.strokeStyle =
        `rgba(255,${Math.floor(137 + 118 * (1-f))},` +
        `${Math.floor(42 + 165 * (1-f))},${alpha})`;

      c.lineWidth = 1.4 + (1-f) * 2.8;
      c.stroke();
    }

    // Тонкі нитки розпеченої плазми.
    for (let i = 0; i < 11; i++) {
      const r = radius * (1.18 + i * 0.105);
      const start = 0.12 + Math.sin(t * 0.0005 + i) * 0.10;

      c.beginPath();

      c.ellipse(
        0, 0,
        r * 1.57,
        r,
        0,
        start,
        Math.PI - start
      );

      c.strokeStyle =
        `rgba(255,${Math.floor(200 + 5 * Math.sin(t * 0.0008 + i))},` +
        `${Math.floor(110 + 35 * Math.sin(t * 0.0004 + i))},0.23)`;

      c.lineWidth = 1.1;
      c.stroke();
    }

    c.restore();
  }

  // Розміщення планети на екрані.
  function positionPlanet(p, x, y, scale, opacity) {
    if (!p.el) return;

    p.el.style.left = `${x}px`;
    p.el.style.top = `${y}px`;
    p.el.style.opacity = String(opacity);

    p.el.style.filter =
      `brightness(${Math.max(0.3, opacity)})`;

    p.el.style.setProperty("--orbit-scale", scale);

    const core = p.el.querySelector(".planet-core");

    if (core) {
      core.style.transform = `scale(${scale})`;
    }
  }

  // Головний цикл анімації.
  function animate(now) {
    const dt = Math.min(40, now - (lastTime || now));
    lastTime = now;

    const t = now;

    drawStars(dt, t);

    const hole = holePosition(t);

    const radius = Math.max(
      36,
      Math.min(width, height) * 0.085
    );

    drawBlackHole(hole.x, hole.y, t, radius);

    const smallScreen = width < 650;
    const scale = smallScreen ? 0.62 : Math.min(1, width / 1200);

    const maxRX = Math.max(100, width * 0.43);
    const maxRY = Math.max(90, height * 0.30);

    planets.forEach((p, i) => {
      // Орбітальний рух.
      p.angle += p.speed * dt * 0.001;

      // Періодичне спіральне падіння до чорної діри.
      if (p.fall > 0) {
        p.fall += dt * 0.00022;

        if (p.fall >= 1) {
          p.fall = 0;
          p.angle += 1.1 + i * 0.3;
        }
      } else if (
        Math.sin(p.angle * 0.19 + p.phase) > 0.985
      ) {
        p.fall = 0.001;
      }

      const inward = p.fall > 0
        ? Math.min(0.96, p.fall * p.fall * 1.08)
        : 0;

      const rx = Math.min(p.rx * scale, maxRX) * (1 - inward);
      const ry = Math.min(p.ry * scale, maxRY) * (1 - inward);

      const angle = p.angle + p.phase;
      const warp = 1 + 0.045 * Math.sin(t * 0.001 + i);

      const x = hole.x + Math.cos(angle) * rx * warp;
      const y = hole.y + Math.sin(angle) * ry;

      const opacity = p.fall > 0
        ? Math.max(0, 1 - p.fall * 1.15)
        : 1;

      const planetScale = (smallScreen ? 0.78 : 1)
        * (p.fall > 0 ? Math.max(0.08, 1 - p.fall) : 1);

      positionPlanet(p, x, y, planetScale, opacity);
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });

  resize();
  requestAnimationFrame(animate);
})();
