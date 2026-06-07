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
    var count       = spans.length;
    var homeX       = new Float32Array(count);
    var homeY       = new Float32Array(count);
    var offX        = new Float32Array(count);
    var offY        = new Float32Array(count);
    var velX        = new Float32Array(count);
    var velY        = new Float32Array(count);
    var rectsCached = false;
    var loopRunning = false;
    var mx = -9999, my = -9999;

    var RADIUS      = 80;
    var PUSH_FORCE  = 18;
    var SPRING_K    = 0.12;
    var DAMPING     = 0.78;

    function cacheRects() {
      for (var i = 0; i < count; i++) {
        var r = spans[i].getBoundingClientRect();
        homeX[i] = r.left + r.width  * 0.5;
        homeY[i] = r.top  + r.height * 0.5;
      }
      rectsCached = true;
    }

    window.addEventListener('resize', function () { rectsCached = false; });

    function tick() {
      var anyActive = false;

      for (var i = 0; i < count; i++) {
        var cx   = homeX[i] + offX[i];
        var cy   = homeY[i] + offY[i];
        var dx   = cx - mx;
        var dy   = cy - my;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS && dist > 0.01) {
          var force  = (1 - dist / RADIUS) * PUSH_FORCE / dist;
          velX[i]  += dx * force;
          velY[i]  += dy * force;
        }

        velX[i] += -offX[i] * SPRING_K;
        velY[i] += -offY[i] * SPRING_K;
        velX[i] *= DAMPING;
        velY[i] *= DAMPING;
        offX[i] += velX[i];
        offY[i] += velY[i];

        var spd  = Math.abs(velX[i]) + Math.abs(velY[i]);
        var disp = Math.abs(offX[i]) + Math.abs(offY[i]);
        if (spd > 0.05 || disp > 0.15) anyActive = true;

        spans[i].style.transform = 'translate(' + offX[i].toFixed(2) + 'px,' + offY[i].toFixed(2) + 'px)';
      }

      if (anyActive) requestAnimationFrame(tick);
      else loopRunning = false;
    }

    function start() {
      if (!loopRunning) { loopRunning = true; requestAnimationFrame(tick); }
    }

    area.addEventListener('mousemove', function (e) {
      if (!rectsCached) cacheRects();
      mx = e.clientX;
      my = e.clientY;
      start();
    });

    area.addEventListener('mouseleave', function () {
      mx = -9999;
      my = -9999;
      start();
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
    var name = el.getAttribute('aria-label') || el.querySelector('.dock-label').textContent;
    var descs = {
      'Games':    'Browse and play browser games',
      'Browser':  'Built-in proxy web browser',
      'Movies':   'Stream movies and shows',
      'AI':       'Chat with AI assistants',
      'Music':    'Listen to music and radio',
      "VM's":     'Run virtual machines',
      'Info':     'About Crafted Gamz',
      'Account':  'Manage your account',
      'Settings': 'Customize your experience'
    };
    return {
      name: name,
      href: el.dataset.href,
      icon: el.querySelector('.dock-icon i').className,
      desc: descs[name] || ''
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
        '<div class="sp-item-desc">' + p.desc + '</div></div>' +
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
  var iconEl = document.getElementById('weather-icon');
  var widget = document.getElementById('weather');
  if (!tempEl || !widget) return;

  var WMO = {
    0:  { icon: 'fa-sun',                 color: '#f6d365', desc: 'Clear' },
    1:  { icon: 'fa-cloud-sun',           color: '#f6d365', desc: 'Mostly Clear' },
    2:  { icon: 'fa-cloud-sun',           color: '#d4d4d8', desc: 'Partly Cloudy' },
    3:  { icon: 'fa-cloud',               color: '#9ca3af', desc: 'Overcast' },
    45: { icon: 'fa-smog',                color: '#9ca3af', desc: 'Fog' },
    48: { icon: 'fa-smog',                color: '#9ca3af', desc: 'Icy Fog' },
    51: { icon: 'fa-cloud-rain',          color: '#3b82f6', desc: 'Light Drizzle' },
    53: { icon: 'fa-cloud-rain',          color: '#2563eb', desc: 'Drizzle' },
    55: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Heavy Drizzle' },
    61: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Light Rain' },
    63: { icon: 'fa-cloud-showers-heavy', color: '#1d4ed8', desc: 'Rain' },
    65: { icon: 'fa-cloud-showers-heavy', color: '#1e3a8a', desc: 'Heavy Rain' },
    71: { icon: 'fa-snowflake',           color: '#e0f2fe', desc: 'Light Snow' },
    73: { icon: 'fa-snowflake',           color: '#bae6fd', desc: 'Snow' },
    75: { icon: 'fa-snowflake',           color: '#7dd3fc', desc: 'Heavy Snow' },
    77: { icon: 'fa-snowflake',           color: '#38bdf8', desc: 'Snow Grains' },
    80: { icon: 'fa-cloud-showers-heavy', color: '#3b82f6', desc: 'Showers' },
    81: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Heavy Showers' },
    82: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Violent Showers' },
    85: { icon: 'fa-snowflake',           color: '#3b82f6', desc: 'Snow Showers' },
    86: { icon: 'fa-snowflake',           color: '#2563eb', desc: 'Heavy Snow Showers' },
    95: { icon: 'fa-cloud-bolt',          color: '#facc15', desc: 'Thunderstorm' },
    96: { icon: 'fa-cloud-bolt',          color: '#eab308', desc: 'Thunderstorm + Hail' },
    99: { icon: 'fa-cloud-bolt',          color: '#ca8a04', desc: 'Thunderstorm + Heavy Hail' }
  };

  function fetchWeather(lat, lon, city, region) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
              '&longitude=' + lon +
              '&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=auto';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var code    = d.current.weathercode;
        var mapping = WMO[code] || { icon: 'fa-cloud', color: 'rgba(255,255,255,0.7)', desc: 'Unknown' };
        var temp    = Math.round(d.current.temperature_2m);
        tempEl.textContent = temp + '°F';
        descEl.textContent = mapping.desc;
        if (iconEl) {
          iconEl.className = 'fa-solid ' + mapping.icon;
          iconEl.style.color = mapping.color;
        }
        if (city && region) locEl.textContent = city + ', ' + region;
        else if (city)      locEl.textContent = city;
        widget.classList.add('loaded');
      })
      .catch(function () {
        descEl.textContent = 'Weather unavailable';
        widget.classList.add('loaded');
      });
  }

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

/* ══════════════════════════════════════════════════════════════
   STATUS BAR — Wisp region pings + Firebase visitor counts
   Piggbacks on accountManager (account.js) — no duplicate init
══════════════════════════════════════════════════════════════ */
(function () {
  var WISP_REGIONS = [
    { id: 'wisp-dot-use1', url: 'https://wisp-us-east-1.cgamz.online' },
    { id: 'wisp-dot-use2', url: 'https://wisp-us-east-2.cgamz.online' },
    { id: 'wisp-dot-usw',  url: 'https://wisp-us-west.cgamz.online'   },
    { id: 'wisp-dot-eu',   url: 'https://wisp-europe.cgamz.online'    },
    { id: 'wisp-dot-as',   url: 'https://wisp-asia.cgamz.online'      }
  ];

  function pingRegion(region) {
    var dot = document.getElementById(region.id);
    if (!dot) return;
    fetch(region.url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
      .then(function () { dot.classList.remove('offline'); dot.classList.add('online');  })
      .catch(function () { dot.classList.remove('online');  dot.classList.add('offline'); });
  }

  function pingAll() { WISP_REGIONS.forEach(pingRegion); }
  pingAll();
  setInterval(pingAll, 30000);

  /* ── visitor counts via accountManager ── */
  function fmtNum(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(1)    + 'K';
    return String(n);
  }

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  // Whether this session has already incremented the counters
  var counted = sessionStorage.getItem('cgCounted') === '1';

  function initStats(db, rtdb, userId) {
    // Online presence via RTDB
    var onlineRef = rtdb.ref('onlineUsers/' + userId);
    onlineRef.set({ timestamp: firebase.database.ServerValue.TIMESTAMP });
    onlineRef.onDisconnect().remove();
    window.addEventListener('beforeunload', function () { onlineRef.remove(); });

    rtdb.ref('onlineUsers').on('value', function (snap) {
      var el = document.getElementById('stat-online-users');
      if (el) el.textContent = fmtNum(snap.numChildren());
    });

    db.collection('stats').doc('total').onSnapshot(function (doc) {
      var el = document.getElementById('stat-users-total');
      if (el) el.textContent = fmtNum(doc.exists ? doc.data().count : 0);
    });

    db.collection('stats').doc('daily_' + getTodayKey()).onSnapshot(function (doc) {
      var el = document.getElementById('stat-users-today');
      if (el) el.textContent = fmtNum(doc.exists ? doc.data().count : 0);
    });

    // Only increment once per browser session
    if (!counted) {
      counted = true;
      sessionStorage.setItem('cgCounted', '1');
      db.collection('stats').doc('total').set(
        { count: firebase.firestore.FieldValue.increment(1) }, { merge: true }
      ).catch(function () {});
      db.collection('stats').doc('daily_' + getTodayKey()).set(
        { count: firebase.firestore.FieldValue.increment(1), date: getTodayKey() }, { merge: true }
      ).catch(function () {});
    }
  }

  // Wait for accountManager to be ready, then hook into its Firebase instances
  function waitForAccountManager() {
    if (window.accountManager && window.accountManager.auth && window.accountManager.db) {
      var am = window.accountManager;

      // Load firebase-database compat if not already present (account.js doesn't load it)
      function attachStats(user) {
        if (!firebase.database) {
          var s = document.createElement('script');
          s.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js';
          s.onload = function () { initStats(am.db, firebase.database(), user.uid); };
          document.head.appendChild(s);
        } else {
          initStats(am.db, firebase.database(), user.uid);
        }
      }

      am.auth.onAuthStateChanged(function (user) {
        if (user) attachStats(user);
      });
    } else {
      setTimeout(waitForAccountManager, 50);
    }
  }

  waitForAccountManager();
})();