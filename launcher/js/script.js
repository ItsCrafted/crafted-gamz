const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

const BASE          = 48;
const MAGNIFICATION = 90;
const DISTANCE      = 140;
const PANEL_H       = 68;
const MAX_OUTER_H   = Math.max(240, MAGNIFICATION + MAGNIFICATION / 2 + 4);

const outer = document.getElementById('dock-outer');
const panel = document.getElementById('dock-panel');
const items = [...document.querySelectorAll('.dock-item')];

class Spring {
  constructor(initial, cfg = SPRING) {
    this.x = initial; this.v = 0; this.target = initial;
    this.m = cfg.mass; this.k = cfg.stiffness; this.d = cfg.damping;
  }
  step(dt) {
    const sub = dt / 4;
    for (let i = 0; i < 4; i++) {
      const a = (-this.k * (this.x - this.target) - this.d * this.v) / this.m;
      this.v += a * sub;
      this.x += this.v * sub;
    }
  }
  get settled() { return Math.abs(this.v) < 0.05 && Math.abs(this.x - this.target) < 0.05; }
}

const iconSprings = items.map(() => new Spring(BASE));
const outerSpring = new Spring(PANEL_H);

let mouseX  = Infinity;
let hovered = false;
let running = false;
let prevT   = null;

function targetFor(el, i) {
  if (!hovered) return BASE;
  const rect    = el.getBoundingClientRect();
  const absDist = Math.abs(mouseX - (rect.left + rect.width / 2));
  if (absDist >= DISTANCE) return BASE;
  const t = 1 - absDist / DISTANCE;
  return BASE + (MAGNIFICATION - BASE) * t;
}

function tick(ts) {
  if (!prevT) prevT = ts;
  const dt = Math.min((ts - prevT) / 1000, 0.05);
  prevT = ts;

  outerSpring.target = hovered ? MAX_OUTER_H : PANEL_H;
  outerSpring.step(dt);
  outer.style.height = outerSpring.x.toFixed(1) + 'px';

  let allSettled = outerSpring.settled;

  items.forEach((el, i) => {
    const s = iconSprings[i];
    s.target = targetFor(el, i);
    s.step(dt);

    const sz = s.x;
    el.style.width        = sz.toFixed(1) + 'px';
    el.style.height       = sz.toFixed(1) + 'px';
    el.style.borderRadius = (sz * 0.25).toFixed(1) + 'px';
    el.querySelector('.dock-icon').style.fontSize = (sz * 0.38).toFixed(1) + 'px';

    if (!s.settled) allSettled = false;
  });

  if (allSettled) { running = false; prevT = null; }
  else requestAnimationFrame(tick);
}

function start() {
  if (!running) { running = true; prevT = null; requestAnimationFrame(tick); }
}

panel.addEventListener('mousemove', e => { mouseX = e.pageX; hovered = true;  start(); });
panel.addEventListener('mouseleave',  () => { mouseX = Infinity; hovered = false; start(); });

items.forEach(el => {
  el.addEventListener('click', () => { const h = el.dataset.href; if (h) window.open(h, ' blank'); });
  el.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){e.preventDefault();el.click();} });

  el.addEventListener('mousedown', () => {
    el.classList.remove('clicking');
    void el.offsetWidth;
    el.classList.add('clicking');
  });
  el.addEventListener('animationend', () => el.classList.remove('clicking'));
});

outer.style.height = PANEL_H + 'px';