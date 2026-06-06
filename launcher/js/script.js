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
  el.addEventListener('click', () => {
    const h = el.dataset.href;
    if (!h || el.classList.contains('launching')) return;
    el.classList.add('launching');
  });

  el.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){e.preventDefault();el.click();} });

  el.addEventListener('animationend', e => {
    if (e.animationName !== 'icon-launch') return;
    const h = el.dataset.href;
    if (h) window.location.href = h;
  });
});

outer.style.height = PANEL_H + 'px';


/* ══════════════════════════════════════════════════════════════
   ASCII POP-IN — each char bounces in, then scatter physics live
══════════════════════════════════════════════════════════════ */
(function () {
  var area = document.getElementById('ascii-area');
  if (!area) return;

  var raw = area.textContent;
  var html = '';
  var visIdx = 0;
  var BASE_DELAY = 80;
  var STAGGER    = 1.8;

  for (var i = 0; i < raw.length; i++) {
    var ch = raw[i];
    if (ch === '\n') {
      html += '\n';
    } else if (ch === ' ') {
      html += ' ';
    } else {
      var delay = (BASE_DELAY + visIdx * STAGGER).toFixed(1);
      // Full animation shorthand inline so we can clear it on animationend
      html += '<span class="ac" style="animation:charPop .35s cubic-bezier(0.34,1.56,0.64,1) ' + delay + 'ms forwards">' + ch + '</span>';
      visIdx++;
    }
  }
  area.innerHTML = html;

  var spans = Array.from(area.querySelectorAll('.ac'));
  var count = spans.length;
  var doneCount = 0;
  var scatterReady = false;

  // After each span's pop animation ends, clear the animation property
  // so JS transforms take full ownership of the element
  spans.forEach(function (s) {
    s.addEventListener('animationend', function () {
      s.style.animation = 'none';
      s.style.opacity   = '1';
      s.style.transform = 'none';
      doneCount++;
      if (doneCount === count && !scatterReady) {
        scatterReady = true;
        initScatter(spans);
      }
    }, { once: true });
  });

  // Fallback: if some animationend events don't fire (e.g. tab was hidden)
  var totalDur = BASE_DELAY + visIdx * STAGGER + 500;
  setTimeout(function () {
    if (!scatterReady) {
      scatterReady = true;
      spans.forEach(function (s) {
        s.style.animation = 'none';
        s.style.opacity   = '1';
        s.style.transform = 'none';
      });
      initScatter(spans);
    }
  }, totalDur);

  function initScatter(spans) {
    var count = spans.length;
    var px    = new Float32Array(count);
    var py    = new Float32Array(count);
    var vx    = new Float32Array(count);
    var vy    = new Float32Array(count);
    var rot   = new Float32Array(count);
    var vrot  = new Float32Array(count);
    var active = new Uint8Array(count);
    var homeX  = new Float32Array(count);
    var homeY  = new Float32Array(count);
    var rectsCached = false;

    function cacheRects() {
      for (var i = 0; i < count; i++) {
        var r = spans[i].getBoundingClientRect();
        homeX[i] = r.left + r.width  * 0.5;
        homeY[i] = r.top  + r.height * 0.5;
      }
      rectsCached = true;
    }

    window.addEventListener('resize', function () { rectsCached = false; });

    var RADIUS   = 75;
    var LAUNCH   = 6;
    var MAX_ROT  = 450;
    var GRAVITY  = 0.08;
    var SPRING_K = 0.003;
    var DRAG     = 0.985;
    var ROT_DRAG = 0.97;
    var REST_R   = 1.5;
    var loopRunning = false;

    function scatterTick() {
      var anyActive = false;
      for (var i = 0; i < count; i++) {
        if (!active[i]) continue;
        anyActive = true;
        vx[i]   += -px[i] * SPRING_K;
        vy[i]   += -py[i] * SPRING_K;
        if (py[i] < 0) vy[i] += GRAVITY;
        vx[i]   *= DRAG;  vy[i] *= DRAG;  vrot[i] *= ROT_DRAG;
        px[i]   += vx[i]; py[i] += vy[i]; rot[i]  += vrot[i];
        var spd  = Math.sqrt(vx[i]*vx[i] + vy[i]*vy[i]);
        var disp = Math.sqrt(px[i]*px[i] + py[i]*py[i]);
        if (disp < REST_R && spd < 0.3) {
          px[i]=py[i]=rot[i]=vx[i]=vy[i]=vrot[i]=0;
          active[i]=0;
          spans[i].style.transform='none';
          continue;
        }
        spans[i].style.transform =
          'translate('+px[i].toFixed(2)+'px,'+py[i].toFixed(2)+'px) rotate('+rot[i].toFixed(2)+'deg)';
      }
      if (anyActive) requestAnimationFrame(scatterTick);
      else loopRunning = false;
    }

    area.addEventListener('mousemove', function (e) {
      if (!rectsCached) cacheRects();
      var mx = e.clientX, my = e.clientY, launched = false;
      for (var i = 0; i < count; i++) {
        var dx = homeX[i] - mx, dy = homeY[i] - my;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < RADIUS) {
          var force = 1 - dist / RADIUS;
          var angle = Math.atan2(dy, dx);
          var spd   = LAUNCH * force * (0.5 + Math.random());
          vx[i]   += Math.cos(angle) * spd;
          vy[i]   += Math.sin(angle) * spd;
          vrot[i] += (Math.random() - 0.5) * MAX_ROT * force;
          active[i] = 1;
          launched  = true;
        }
      }
      if (launched && !loopRunning) { loopRunning=true; requestAnimationFrame(scatterTick); }
    });
  }
})();


/* ══════════════════════════════════════════════════════════════
   LIVE CLOCK
══════════════════════════════════════════════════════════════ */
(function () {
  var timeEl = document.getElementById('clock-time');
  var dateEl = document.getElementById('clock-date');
  if (!timeEl || !dateEl) return;

  var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function update() {
    var now = new Date();
    var h = now.getHours();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    timeEl.textContent = pad(h) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + ' ' + ampm;
    dateEl.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
  }

  update();
  setInterval(update, 1000);
})();


/* ══════════════════════════════════════════════════════════════
   SPOTLIGHT SEARCH  (press / to open, ESC to close)
══════════════════════════════════════════════════════════════ */
(function () {
  var overlay = document.getElementById('spotlight-overlay');
  var input   = document.getElementById('spotlight-input');
  var results = document.getElementById('spotlight-results');
  if (!overlay || !input || !results) return;

  var pages = Array.from(document.querySelectorAll('.dock-item[data-href]')).map(function (el) {
    return {
      name: el.getAttribute('aria-label') || el.querySelector('.dock-label').textContent,
      href: el.dataset.href,
      icon: el.querySelector('.dock-icon i').className
    };
  });

  var activeIdx = -1;

  function open() {
    overlay.classList.add('open');
    input.value = '';
    renderResults('');
    setTimeout(function () { input.focus(); }, 60);
  }

  function close() {
    overlay.classList.remove('open');
    input.blur();
  }

  function filtered(query) {
    if (!query) return pages;
    var q = query.toLowerCase();
    return pages.filter(function (p) { return p.name.toLowerCase().includes(q); });
  }

  function renderResults(query) {
    var list = filtered(query);
    activeIdx = list.length ? 0 : -1;
    if (!list.length) {
      results.innerHTML = '<div class="sp-empty">No results for "' + query + '"</div>';
      return;
    }
    results.innerHTML = list.map(function (p, i) {
      return '<div class="sp-item' + (i === 0 ? ' active' : '') + '" data-href="' + p.href + '" tabindex="-1">' +
        '<div class="sp-item-icon"><i class="' + p.icon + '"></i></div>' +
        '<div><div class="sp-item-name">' + p.name + '</div>' +
        '<div class="sp-item-desc">' + p.href + '</div></div>' +
        '</div>';
    }).join('');
    results.querySelectorAll('.sp-item').forEach(function (el) {
      el.addEventListener('click', function () { window.location.href = el.dataset.href; });
      el.addEventListener('mouseenter', function () {
        setActive(Array.from(results.querySelectorAll('.sp-item')).indexOf(el));
      });
    });
  }

  function setActive(idx) {
    var els = results.querySelectorAll('.sp-item');
    if (!els.length) return;
    idx = (idx + els.length) % els.length;
    activeIdx = idx;
    els.forEach(function (el, i) { el.classList.toggle('active', i === idx); });
    els[idx].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', function () { renderResults(input.value.trim()); });
  input.addEventListener('keydown', function (e) {
    var els = results.querySelectorAll('.sp-item');
    if      (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === 'Enter')     { e.preventDefault(); if (activeIdx >= 0 && els[activeIdx]) window.location.href = els[activeIdx].dataset.href; }
    else if (e.key === 'Escape')    { close(); }
  });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('open')) return;
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); open(); }
  });
})();


/* ══════════════════════════════════════════════════════════════
   WEATHER — IP geolocation via ipapi.co, weather via Open-Meteo
══════════════════════════════════════════════════════════════ */
(function () {
  var tempEl = document.getElementById('weather-temp');
  var descEl = document.getElementById('weather-desc');
  var locEl  = document.getElementById('weather-loc');
  var widget = document.getElementById('weather');
  if (!tempEl || !widget) return;

  var WMO = {
    0:'Clear',1:'Mostly Clear',2:'Partly Cloudy',3:'Overcast',
    45:'Fog',48:'Icy Fog',
    51:'Light Drizzle',53:'Drizzle',55:'Heavy Drizzle',
    61:'Light Rain',63:'Rain',65:'Heavy Rain',
    71:'Light Snow',73:'Snow',75:'Heavy Snow',77:'Snow Grains',
    80:'Showers',81:'Heavy Showers',82:'Violent Showers',
    85:'Snow Showers',86:'Heavy Snow Showers',
    95:'Thunderstorm',96:'Thunderstorm + Hail',99:'Thunderstorm + Heavy Hail'
  };

  function fetchWeather(lat, lon, city, region) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
              '&longitude=' + lon +
              '&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=auto';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var temp  = Math.round(d.current.temperature_2m);
        var label = WMO[d.current.weathercode] || 'Unknown';
        tempEl.textContent = temp + '°F';
        descEl.textContent = label;
        if (city && region) locEl.textContent = city + ', ' + region;
        else if (city)      locEl.textContent = city;
        widget.classList.add('loaded');
      })
      .catch(function () {
        descEl.textContent = 'Weather unavailable';
        widget.classList.add('loaded');
      });
  }

  // ipapi.co returns lat, lon, city, region_code — no API key needed for low usage
  fetch('https://ipapi.co/json/')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      fetchWeather(d.latitude, d.longitude, d.city, d.region_code);
    })
    .catch(function () {
      descEl.textContent = 'Location unavailable';
      widget.classList.add('loaded');
    });
})();