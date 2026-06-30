(() => {
  // Inject all required styles
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    :root { --intro-grid: 24px; --intro-ink: #f8fafc; --intro-glyph-size: 28px; --intro-glyph-weight: 800; --intro-letter-gap: 42px; --intro-font: "Space Grotesk","Avenir Next",Inter,system-ui,sans-serif; }
    #intro-stage { position:fixed;inset:0;z-index:99999;overflow:hidden;background:#000;cursor:pointer;user-select:none;opacity:1; }
    #intro-stage.is-running { cursor:default; }
    #intro-stage .shape-layer { position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none; }
    #intro-stage .shape { fill:none;stroke:#fff;stroke-opacity:0.78;stroke-width:1;vector-effect:non-scaling-stroke; }
    #intro-stage .shape-body { transform-box:fill-box;transform-origin:center;will-change:transform,opacity; }
    #intro-stage .glyph { position:absolute;width:var(--intro-grid);height:var(--intro-grid);display:grid;place-items:center;color:var(--intro-ink);background:transparent;font-family:var(--intro-font);font-size:var(--intro-glyph-size);font-weight:var(--intro-glyph-weight);line-height:1;letter-spacing:0;pointer-events:none;transform-origin:center;will-change:transform,opacity; }
    #intro-stage .intro-title { position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:48px;color:#fff;font-family:var(--intro-font);font-weight:var(--intro-glyph-weight);text-align:center;pointer-events:none;transition:opacity 360ms ease,filter 360ms ease; }
    #intro-stage .intro-title.fade-away { opacity:0;filter:blur(8px); }
    #intro-stage .title-line { display:flex;justify-content:center;gap:var(--intro-letter-gap);font-family:var(--intro-font);font-size:var(--intro-glyph-size);font-weight:var(--intro-glyph-weight);line-height:1;letter-spacing:0; }
    #intro-stage .version-line { display:flex;justify-content:center;gap:20px;opacity:0;font-family:var(--intro-font);font-size:var(--intro-glyph-size);font-weight:var(--intro-glyph-weight);line-height:1;letter-spacing:0;will-change:opacity,transform,filter; }
    #intro-stage .title-letter { display:inline-block;opacity:0;transform-origin:center;will-change:opacity,transform,filter; }
    #intro-stage .version-letter { display:inline-block; }
    @keyframes intro-prompt-fadein { from{opacity:0} to{opacity:1} }
    #intro-stage .continue-prompt { position:absolute;inset:0;display:grid;place-items:center;color:var(--intro-ink);background:transparent;font-family:var(--intro-font);font-size:28px;font-weight:var(--intro-glyph-weight);line-height:1;letter-spacing:0;text-shadow:none;cursor:pointer;opacity:0;animation:intro-prompt-fadein 1.2s ease-out 0.3s forwards; }
    #intro-particles { position:absolute;inset:0;width:100%;height:100%;z-index:0;opacity:0.38;pointer-events:none; }
    #intro-fog { position:absolute;inset:0;z-index:0;pointer-events:none; }
    #intro-fog .fog-cloud { position:absolute;width:600px;height:400px;background:radial-gradient(ellipse at center,rgba(255,255,255,0.025) 0%,rgba(255,255,255,0) 80%);border-radius:50%;filter:blur(120px); }
    @keyframes intro-drift { 0%{transform:translateX(0);opacity:0} 10%{opacity:1} 85%{opacity:1} 100%{transform:translateX(-500px);opacity:0} }
  `;
  document.head.appendChild(styleEl);

  // Create and mount the stage element
  const stage = document.createElement("main");
  stage.id = "intro-stage";
  stage.setAttribute("aria-label", "CRAFTEDGAMZ16 intro");
  document.body.appendChild(stage);

  const TEXT = "CRAFTEDGAMZ16v";
  const GRID = 24;
  const DEFAULT_LAYOUT_CODE = "W1sxMiw2XSxbMjEsOV0sWzMwLDEyXSxbMzksMTVdLFs0OCwxOF0sWzU3LDIxXSxbNjYsMjRdLFsyMiwxNl0sWzMxLDE5XSxbNDAsMjJdLFs0OSwyNV0sWzMyLDI2XSxbNDEsMjldLFsyMywyM11d";
  const glyphs = [];
  const shapeElements = [];
  const introAudio = new Audio("/intro.mp3");
  const LETTER_DELAY = 112;
  const TITLE_LINES = ["CRAFTED", "GAMZ"];
  const VERSION_TEXT = "V16";
  let shapeLayer = null;
  let shapeLayer2 = null;
  let shapeElements2 = [];
  let continuePrompt = null;
  let hasStarted = false;
  const shapes = [
    { type: "circle", x: 7, y: 4, radius: 1.9 },
    { type: "squiggle", points: [[27, 2.5], [29, 1.4], [31, 3.4], [34, 1.9], [37, 2.8]] },
    { type: "rect", x: 62, y: 4, w: 5.8, h: 3, r: 0.6, rotate: 8 },
    { type: "circle", x: 73, y: 6, radius: 2.5 },
    { type: "diamond", x: 3, y: 17, w: 3.8, h: 3.8 },
    { type: "arc", x: 72, y: 17, radius: 2.6, start: 210, end: 36 },
    { type: "squiggle", points: [[2, 27], [4, 25.8], [6, 28], [8, 26.5], [10, 27.4]] },
    { type: "rect", x: 64, y: 27, w: 5.5, h: 2, r: 0.8, rotate: -11 },
    { type: "circle", x: 16, y: 27.4, radius: 1.4 },
    { type: "diamond", x: 72, y: 24, w: 3.7, h: 3.7 },
    { type: "squiggle", points: [[42, 2.5], [44, 1.4], [46, 3.4], [48, 1.9], [50, 2.8]] }
  ];

  introAudio.preload = "auto";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function sleep(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function setGlyphPosition(glyph, x, y) {
    const maxX = window.innerWidth - GRID;
    const maxY = window.innerHeight - GRID;
    const nextX = clamp(x, 0, maxX);
    const nextY = clamp(y, 0, maxY);

    glyph.style.left = `${nextX}px`;
    glyph.style.top = `${nextY}px`;
    glyph.dataset.x = String(nextX / GRID);
    glyph.dataset.y = String(nextY / GRID);
  }

  function decodeLayout(code) {
    if (!code) return null;

    try {
      const decoded = JSON.parse(atob(code));
      if (!Array.isArray(decoded) || decoded.length !== TEXT.length) return null;

      return decoded.map((point) => {
        if (!Array.isArray(point) || point.length !== 2) {
          throw new Error("Bad point");
        }

        return [Number(point[0]), Number(point[1])];
      });
    } catch {
      return null;
    }
  }

  function createGlyph(character, index, point) {
    const glyph = document.createElement("span");
    glyph.className = "glyph";
    glyph.textContent = character;
    glyph.ariaLabel = `${character} ${index + 1}`;
    glyph.dataset.index = String(index);

    setGlyphPosition(glyph, point[0] * GRID, point[1] * GRID);
    stage.appendChild(glyph);
    glyphs.push(glyph);
  }

  function pointToPixels(point) {
    return point * GRID;
  }

  function createSvgElement(type, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", type);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    element.classList.add("shape");
    return element;
  }

  function squigglePath(points) {
    return points.map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${pointToPixels(point[0])} ${pointToPixels(point[1])}`;
    }).join(" ");
  }

  function arcPath(shape) {
    const start = shape.start * Math.PI / 180;
    const end = shape.end * Math.PI / 180;
    const radius = pointToPixels(shape.radius);
    const centerX = pointToPixels(shape.x);
    const centerY = pointToPixels(shape.y);
    const startX = centerX + Math.cos(start) * radius;
    const startY = centerY + Math.sin(start) * radius;
    const endX = centerX + Math.cos(end) * radius;
    const endY = centerY + Math.sin(end) * radius;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`;
  }

  function createShape(shape) {
    if (shape.type === "rect") {
      const x = pointToPixels(shape.x);
      const y = pointToPixels(shape.y);
      const width = pointToPixels(shape.w);
      const height = pointToPixels(shape.h);
      const centerX = x + width / 2;
      const centerY = y + height / 2;

      return createSvgElement("rect", {
        x,
        y,
        width,
        height,
        rx: pointToPixels(shape.r),
        transform: `rotate(${shape.rotate} ${centerX} ${centerY})`
      });
    }

    if (shape.type === "circle") {
      return createSvgElement("circle", {
        cx: pointToPixels(shape.x),
        cy: pointToPixels(shape.y),
        r: pointToPixels(shape.radius)
      });
    }

    if (shape.type === "diamond") {
      const x = pointToPixels(shape.x);
      const y = pointToPixels(shape.y);
      const width = pointToPixels(shape.w);
      const height = pointToPixels(shape.h);

      return createSvgElement("rect", {
        x,
        y,
        width,
        height,
        transform: `rotate(45 ${x + width / 2} ${y + height / 2})`
      });
    }

    if (shape.type === "arc") {
      return createSvgElement("path", {
        d: arcPath(shape)
      });
    }

    return createSvgElement("path", {
      d: squigglePath(shape.points)
    });
  }

  function createShapeLayer(targetElements, id = "") {
    const layer = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if (id) {
      layer.setAttribute("id", id);
    }

    layer.classList.add("shape-layer");
    layer.setAttribute("aria-hidden", "true");
    layer.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    stage.appendChild(layer);

    shapes.forEach((shape) => {
      const element = createShape(shape);
      const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");

      wrapper.classList.add("shape-body");
      wrapper.appendChild(element);
      targetElements.push(wrapper);
      layer.appendChild(wrapper);
    });

    return layer;
  }

  function drawShapes() {
    shapeLayer = createShapeLayer(shapeElements, "shape-layer");
  }

  function keepSceneOnScreen() {
    document.querySelectorAll(".shape-layer").forEach((layer) => {
      layer.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    });

    glyphs.forEach((glyph) => {
      setGlyphPosition(
        glyph,
        Number(glyph.dataset.x) * GRID,
        Number(glyph.dataset.y) * GRID
      );
    });
  }

  function randomBetween(seed, min, max) {
    const x = Math.sin(seed * 999) * 10000;
    const random = x - Math.floor(x);
    return min + random * (max - min);
  }

  function burstPhysics(element, index, total) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let dx = centerX - window.innerWidth / 2;
    let dy = centerY - window.innerHeight / 2;

    if (Math.hypot(dx, dy) < 12) {
      const angle = index / total * Math.PI * 2 - Math.PI / 2;
      dx = Math.cos(angle);
      dy = Math.sin(angle);
    }

    const length = Math.hypot(dx, dy) || 1;
    const normalX = dx / length;
    const normalY = dy / length;
    const tangentX = -normalY;
    const tangentY = normalX;
    const speed = randomBetween(index + 3, 1.55, 2.75);
    const drift = randomBetween(index + 13, -0.48, 0.48);
    const lift = randomBetween(index + 23, -0.2, 0.08);

    return {
      x: 0,
      y: 0,
      vx: normalX * speed + tangentX * drift,
      vy: normalY * speed + tangentY * drift + lift,
      ax: normalX * 0.00042,
      ay: normalY * 0.00042 + 0.00008,
      spin: randomBetween(index + 33, -1.1, 1.1),
      rotation: 0,
      scale: 1
    };
  }

  function createStreakCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = "position:absolute;inset:0;pointer-events:none;";
    stage.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const diagonal = Math.hypot(canvas.width, canvas.height);
    const COUNT = 90;

    // Each streak: angle, speed, length, width, offset from center, opacity
    const streaks = Array.from({ length: COUNT }, (_, i) => {
      const rng = (s) => { const x = Math.sin(s * 127.1 + i * 311.7) * 43758.5; return x - Math.floor(x); };
      return {
        angle: rng(1) * Math.PI * 2,
        speed: 0.55 + rng(2) * 0.7,
        length: 0.08 + rng(3) * 0.22,
        width: 0.5 + rng(4) * 1.8,
        start: rng(5) * 0.18,        // fractional distance from center where streak begins
        opacity: 0.4 + rng(6) * 0.6
      };
    });

    return {
      canvas,
      draw(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Envelope: flash in fast, hold, then fade with the burst
        const env = progress < 0.08
          ? progress / 0.08
          : progress < 0.65
            ? 1
            : Math.max(0, 1 - (progress - 0.65) / 0.35);

        if (env <= 0) return;

        streaks.forEach((s) => {
          // Each streak travels outward: head moves from center toward edge
          const head = Math.min(1, progress * s.speed * 2.4) * (diagonal * 0.8);
          const tail = Math.max(0, head - diagonal * s.length);
          const headX = cx + Math.cos(s.angle) * head;
          const headY = cy + Math.sin(s.angle) * head;
          const tailX = cx + Math.cos(s.angle) * tail;
          const tailY = cy + Math.sin(s.angle) * tail;

          const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(0.6, `rgba(255,255,255,${s.opacity * env * 0.7})`);
          grad.addColorStop(1, `rgba(255,255,255,${s.opacity * env})`);

          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.stroke();
          ctx.restore();
        });
      }
    };
  }

  async function burstScene() {
    // Explode all glyphs AND shapes simultaneously
    const items = [...glyphs, ...shapeElements];
    const streak = createStreakCanvas();

    const bodies = items.map((element, index) => {
      element.style.opacity = "1";
      element.style.transform = "translate3d(0, 0, 0) rotate(0deg) scale(1)";

      return {
        element,
        ...burstPhysics(element, index, items.length)
      };
    });

    await new Promise((resolve) => {
      const duration = 1250;
      let previous = null;
      let start = null;

      function frame(time) {
        if (start === null) {
          start = time;
          previous = time;
        }

        const elapsed = time - start;
        const delta = Math.min(time - previous, 34);
        previous = time;

        const progress = Math.min(elapsed / duration, 1);

        streak.draw(progress);

        bodies.forEach((body) => {
          const blast = progress < 0.18 ? 1 + progress * 0.9 : 1.16 - progress * 0.16;
          const fade = progress < 0.68 ? 1 : Math.max(0, 1 - (progress - 0.68) / 0.32);

          body.vx += body.ax * delta;
          body.vy += body.ay * delta;
          body.vx *= 0.997;
          body.vy *= 0.997;
          body.x += body.vx * delta;
          body.y += body.vy * delta;
          body.rotation += body.spin * delta;
          body.element.style.opacity = String(fade);
          body.element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg) scale(${blast})`;
        });

        if (elapsed < duration) {
          window.requestAnimationFrame(frame);
          return;
        }

        resolve();
      }

      window.requestAnimationFrame(frame);
    });

    streak.canvas.remove();
    shapeLayer.remove();
    shapeLayer = null;
    glyphs.forEach((glyph) => glyph.remove());
    glyphs.length = 0;
    shapeElements.length = 0;
  }

  function createTitleLine(text) {
    const line = document.createElement("div");
    line.className = "title-line";

    [...text].forEach((character) => {
      const letter = document.createElement("span");
      letter.className = "title-letter";
      letter.textContent = character;
      line.appendChild(letter);
    });

    return line;
  }

  function createFinalTitle() {
    const title = document.createElement("section");
    title.className = "intro-title";
    title.setAttribute("aria-label", "Crafted Gamz v16");

    TITLE_LINES.forEach((line) => {
      title.appendChild(createTitleLine(line));
    });

    const version = document.createElement("div");
    version.className = "version-line";

    [...VERSION_TEXT].forEach((character) => {
      const letter = document.createElement("span");
      letter.className = "version-letter";
      letter.textContent = character;
      version.appendChild(letter);
    });

    title.appendChild(version);
    stage.appendChild(title);

    return title;
  }

  async function animateTitle(title) {
    const letters = [...title.querySelectorAll(".title-letter")];
    const animations = letters.map((letter, index) => (
      letter.animate([
        {
          opacity: 0,
          filter: "blur(18px)",
          transform: "rotate(-1080deg) scale(0.08)"
        },
        {
          opacity: 1,
          filter: "blur(2px)",
          transform: "rotate(28deg) scale(1.22)",
          offset: 0.78
        },
        {
          opacity: 1,
          filter: "blur(0)",
          transform: "rotate(-8deg) scale(0.96)",
          offset: 0.91
        },
        {
          opacity: 1,
          filter: "blur(0)",
          transform: "rotate(0deg) scale(1)"
        }
      ], {
        delay: index * LETTER_DELAY,
        duration: 1100,
        easing: "cubic-bezier(.12,.9,.18,1)",
        fill: "forwards"
      })
    ));

    await Promise.all(animations.map((animation) => animation.finished.catch(() => {})));
    await sleep(200);

    const version = title.querySelector(".version-line");
    await version.animate([
      {
        opacity: 0,
        filter: "blur(10px)",
        transform: "translateY(12px) scale(0.94)"
      },
      {
        opacity: 1,
        filter: "blur(0)",
        transform: "translateY(0) scale(1)"
      }
    ], {
      duration: 720,
      easing: "ease-out",
      fill: "forwards"
    }).finished.catch(() => {});
  }

  // Draw a second identical shape layer that fades in from invisible to their original positions
  function drawFinalShapes() {
    shapeElements2 = [];
    shapeLayer2 = createShapeLayer(shapeElements2, "shape-layer-2");

    // Start all shapes invisible
    shapeElements2.forEach((wrapper) => {
      wrapper.style.opacity = "0";
    });
  }

  async function fadeInFinalShapes() {
    const duration = 360;
    const start = performance.now();

    await new Promise((resolve) => {
      function frame(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);

        shapeElements2.forEach((wrapper) => {
          wrapper.style.opacity = String(progress);
        });

        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          resolve();
        }
      }

      window.requestAnimationFrame(frame);
    });
  }

  async function fadeIntro(title) {
    await sleep(2000);
    title.classList.add("fade-away");

    await sleep(160);
    await stage.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 660,
      easing: "ease-out",
      fill: "forwards"
    }).finished.catch(() => {});

    window.removeEventListener("resize", keepSceneOnScreen);
    stage.remove();
  }

  async function fadeInScene() {
    const items = [...glyphs, ...shapeElements];
    const duration = 900;
    const start = performance.now();

    await new Promise((resolve) => {
      function frame(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);

        items.forEach((el) => {
          el.style.opacity = String(eased);
        });

        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          resolve();
        }
      }

      window.requestAnimationFrame(frame);
    });
  }


  async function runIntro() {
    // Hide the continue prompt immediately
    if (continuePrompt) {
      continuePrompt.remove();
      continuePrompt = null;
    }

    stage.classList.add("is-running");

    // 1. Fade in all glyphs + shapes
    await fadeInScene();

    // 2. Hold for 1 second
    await sleep(1000);

    // 3. Explode everything
    await burstScene();

    // 4. Brief pause
    await sleep(300);

    // 5. Draw final shapes (invisible) + roll in title text simultaneously
    drawFinalShapes();
    const title = createFinalTitle();

    await Promise.all([
      animateTitle(title),
      fadeInFinalShapes()
    ]);

    // 6. Hold then fade out
    await fadeIntro(title);
  }

  function startBackground() {
    // Particles layer
    const particlesDiv = document.createElement("div");
    particlesDiv.id = "intro-particles";
    stage.appendChild(particlesDiv);

    // Load particles.js from CDN then init
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    script.onload = () => {
      window.particlesJS("intro-particles", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle", stroke: { width: 0, color: "#ffffff" } },
          opacity: { value: 0.9, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 175,
            color: "#ffffff",
            opacity: 0.5,
            width: 1
          },
          move: { enable: true, speed: 4, random: true, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: false }, onclick: { enable: false }, resize: false }
        },
        retina_detect: true
      });
    };
    document.head.appendChild(script);

    // Fog cloud layer
    const fogDiv = document.createElement("div");
    fogDiv.id = "intro-fog";
    stage.appendChild(fogDiv);

    for (let i = 0; i < 8; i++) {
      const cloud = document.createElement("div");
      cloud.className = "fog-cloud";
      cloud.style.top = `${Math.random() * 100}%`;
      cloud.style.left = `${Math.random() * 100}%`;
      const duration = 25 + Math.random() * 15;
      const direction = Math.random() > 0.7 ? "reverse" : "normal";
      cloud.style.animation = `intro-drift ${duration}s linear infinite ${direction}`;
      cloud.style.transform = `scale(${0.5 + Math.random() * 0.6})`;
      fogDiv.appendChild(cloud);
    }
  }

  function createContinuePrompt() {
    const prompt = document.createElement("div");
    prompt.className = "continue-prompt";
    prompt.textContent = "Click To Continue";
    stage.appendChild(prompt);
    return prompt;
  }

  function init() {
    startBackground();
    continuePrompt = createContinuePrompt();

    window.addEventListener("resize", keepSceneOnScreen);

    // Wait for a click anywhere on stage to start
    function handleStart() {
      if (hasStarted) return;
      hasStarted = true;
      stage.removeEventListener("click", handleStart);

      // Build scene now (invisible), fade-in handled by runIntro
      const layout = decodeLayout(DEFAULT_LAYOUT_CODE);
      drawShapes();
      [...TEXT].forEach((character, index) => {
        createGlyph(character, index, layout[index]);
      });
      // Start everything invisible — fadeInScene will reveal them
      glyphs.forEach((glyph) => { glyph.style.opacity = "0"; });
      shapeElements.forEach((wrapper) => { wrapper.style.opacity = "0"; });

      introAudio.play().catch(() => {});

      // Wait one frame so the browser lays out all new elements before
      // burstPhysics calls getBoundingClientRect on them
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => runIntro());
      });
    }

    stage.addEventListener("click", handleStart);
  }

  window.addEventListener("load", init);
})();
