(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  const HUE_ANCHORS = [160, 270, 330, 190, 160];

  function lerpHue(anchors, t) {
    const slots = anchors.length - 1;
    const scaled = t * slots;
    const i = Math.floor(scaled) % slots;
    const f = scaled - Math.floor(scaled);
    const a = anchors[i], b = anchors[i + 1];
    let delta = b - a;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return ((a + delta * f) + 360) % 360;
  }

  function hsl(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0) * 255, f(8) * 255, f(4) * 255];
  }

  const CYCLE  = 18000;
  const OFFSET = 0.35;

  function frame(ts) {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t1   = (ts % CYCLE) / CYCLE;
    const t2   = (t1 + OFFSET) % 1;
    const hue1 = lerpHue(HUE_ANCHORS, t1);
    const hue2 = lerpHue(HUE_ANCHORS, t2);
    const c1   = hsl(hue1, 80, 28);
    const c2   = hsl(hue2, 80, 28);
    const r    = Math.max(W, H) * 0.75;

    const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    g1.addColorStop(0,    `rgba(${c1[0]|0},${c1[1]|0},${c1[2]|0},0.9)`);
    g1.addColorStop(0.35, `rgba(${c1[0]|0},${c1[1]|0},${c1[2]|0},0.3)`);
    g1.addColorStop(0.7,  `rgba(${c1[0]|0},${c1[1]|0},${c1[2]|0},0.06)`);
    g1.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(W, H, 0, W, H, r * 0.96);
    g2.addColorStop(0,    `rgba(${c2[0]|0},${c2[1]|0},${c2[2]|0},0.9)`);
    g2.addColorStop(0.35, `rgba(${c2[0]|0},${c2[1]|0},${c2[2]|0},0.3)`);
    g2.addColorStop(0.7,  `rgba(${c2[0]|0},${c2[1]|0},${c2[2]|0},0.06)`);
    g2.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    const mid = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.55);
    mid.addColorStop(0,   'rgba(0,0,0,0.82)');
    mid.addColorStop(0.6, 'rgba(0,0,0,0.4)');
    mid.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = mid;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();