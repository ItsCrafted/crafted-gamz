(function () {
    'use strict';

    const existing = document.getElementById('cc-overlay');
    if (existing) { existing.remove(); return; }

    if (!document.querySelector('link[href*="font-awesome"]') &&
        !document.querySelector('link[href*="fontawesome"]')) {
        const fa = document.createElement('link');
        fa.rel  = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    const style = document.createElement('style');
    style.id = 'cc-styles';
    style.textContent = `
        @keyframes cc-drop {
            from { opacity: 0; transform: translateY(-12px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes cc-fade-out {
            from { opacity: 1; transform: translateY(0)    scale(1);    }
            to   { opacity: 0; transform: translateY(-8px) scale(0.97); }
        }
        @keyframes cc-btn-press {
            0%   { transform: scale(1); }
            45%  { transform: scale(0.91); }
            100% { transform: scale(1); }
        }
        @keyframes cc-ripple {
            from { transform: scale(0); opacity: 0.4; }
            to   { transform: scale(2.4); opacity: 0; }
        }
        @keyframes cc-tab-in {
            from { opacity: 0; transform: translateX(6px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        #cc-overlay {
            position: fixed;
            top: 48px;
            right: 14px;
            z-index: 99999;
            animation: cc-drop 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        #cc-panel {
            width: 340px;
            max-height: calc(100vh - 70px);
            overflow-y: auto;
            background: rgba(18, 18, 20, 0.90);
            backdrop-filter: blur(50px) saturate(200%) brightness(1.1);
            -webkit-backdrop-filter: blur(50px) saturate(200%) brightness(1.1);
            border: 1px solid rgba(255,255,255,0.13);
            border-radius: 22px;
            padding: 14px;
            box-shadow:
                0 28px 70px rgba(0,0,0,0.65),
                0 4px 18px rgba(0,0,0,0.35),
                inset 0 1px 0 rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
            gap: 10px;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.12) transparent;
        }
        #cc-panel::-webkit-scrollbar { width: 4px; }
        #cc-panel::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.12);
            border-radius: 2px;
        }

        #cc-clock-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 4px 0;
        }
        #cc-clock-time {
            font-size: 34px;
            font-weight: 300;
            color: rgba(255,255,255,0.95);
            letter-spacing: -0.5px;
            line-height: 1;
        }
        #cc-clock-date {
            text-align: right;
            font-size: 11px;
            color: rgba(255,255,255,0.45);
            line-height: 1.6;
        }

        .cc-divider {
            height: 1px;
            background: rgba(255,255,255,0.07);
            margin: 0 2px;
            flex-shrink: 0;
        }
        #cc-tab-bar {
            display: flex;
            gap: 5px;
            background: rgba(255,255,255,0.06);
            border-radius: 12px;
            padding: 4px;
            flex-shrink: 0;
        }
        .cc-tab-btn {
            flex: 1;
            padding: 7px 6px;
            border-radius: 9px;
            border: none;
            background: transparent;
            color: rgba(255,255,255,0.48);
            font-family: 'Lexend', sans-serif;
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.18s;
            text-align: center;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        .cc-tab-btn i { font-size: 10px; }
        .cc-tab-btn:hover { color: rgba(255,255,255,0.8); }
        .cc-tab-btn.cc-tab-active {
            background: rgba(255,255,255,0.14);
            color: rgba(255,255,255,0.95);
        }

        .cc-tab-pane {
            display: none;
            flex-direction: column;
            gap: 10px;
        }
        .cc-tab-pane.cc-visible {
            display: flex;
            animation: cc-tab-in 0.2s ease forwards;
        }

        .cc-label {
            font-size: 9.5px;
            font-weight: 700;
            letter-spacing: 0.8px;
            color: rgba(255,255,255,0.35);
            text-transform: uppercase;
            padding: 2px 4px 0;
            user-select: none;
        }

        .cc-tile {
            position: relative;
            overflow: hidden;
            border-radius: 13px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.09);
            cursor: pointer;
            transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        .cc-tile:hover {
            background: rgba(255,255,255,0.12);
            border-color: rgba(255,255,255,0.15);
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .cc-tile:active { animation: cc-btn-press 0.22s ease forwards; }

        .cc-tile .cc-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            width: 60px; height: 60px;
            margin-top: -30px; margin-left: -30px;
            pointer-events: none;
            animation: cc-ripple 0.45s ease-out forwards;
        }

        .cc-tile-wide {
            display: flex;
            align-items: center;
            gap: 13px;
            padding: 12px 14px;
            min-height: 52px;
        }
        .cc-tile-wide .cc-tile-icon-wrap {
            width: 34px; height: 34px;
            border-radius: 9px;
            background: rgba(255,255,255,0.08);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .cc-tile-wide .cc-tile-icon-wrap i {
            font-size: 15px;
            color: rgba(255,255,255,0.82);
        }
        .cc-tile-wide .cc-tile-text { flex: 1; min-width: 0; }
        .cc-tile-wide .cc-tile-title {
            font-size: 13px;
            font-weight: 600;
            color: rgba(255,255,255,0.92);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .cc-tile-wide .cc-tile-sub {
            font-size: 10.5px;
            color: rgba(255,255,255,0.4);
            margin-top: 2px;
        }
        .cc-tile-wide .cc-tile-chevron {
            color: rgba(255,255,255,0.2);
            font-size: 11px;
            flex-shrink: 0;
        }

        .cc-slider-tile { padding: 12px 14px 13px; }
        .cc-slider-header {
            display: flex;
            align-items: center;
            gap: 9px;
            margin-bottom: 10px;
        }
        .cc-slider-header i { font-size: 14px; color: rgba(255,255,255,0.7); width: 16px; text-align: center; }
        .cc-slider-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .cc-slider-val   { margin-left: auto; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.38); }

        .cc-range {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 4px;
            border-radius: 2px;
            background: rgba(255,255,255,0.14);
            outline: none;
            cursor: pointer;
        }
        .cc-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px; height: 16px;
            border-radius: 50%;
            background: white;
            box-shadow: 0 1px 5px rgba(0,0,0,0.45);
            transition: transform 0.1s;
        }
        .cc-range::-webkit-slider-thumb:hover { transform: scale(1.2); }

        .cc-tile.nv-active {
            background: rgba(255, 140, 0, 0.22) !important;
            border-color: rgba(255, 140, 0, 0.38) !important;
        }
        .cc-tile.nv-active .cc-tile-icon-wrap {
            background: rgba(255, 140, 0, 0.2);
        }
        .cc-tile.nv-active .cc-tile-icon-wrap i { color: #ffb060; }
        .cc-tile.nv-active .cc-tile-title { color: #ffb060 !important; }
        .cc-tile.nv-active .cc-tile-sub   { color: rgba(255,176,96,0.55) !important; }

        #cc-profile-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 14px;
        }
        #cc-profile-avatar {
            width: 48px; height: 48px;
            border-radius: 50%;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.12);
            display: flex; align-items: center; justify-content: center;
            font-size: 20px; font-weight: 700;
            color: rgba(255,255,255,0.88);
            flex-shrink: 0;
        }
        #cc-profile-info { flex: 1; min-width: 0; }
        #cc-profile-name {
            font-size: 14px; font-weight: 600;
            color: rgba(255,255,255,0.95);
            margin-bottom: 2px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        #cc-profile-email {
            font-size: 11px; color: rgba(255,255,255,0.4);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        #cc-profile-badge {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 3px 10px;
            background: rgba(40,167,69,0.18);
            border: 1px solid rgba(40,167,69,0.3);
            border-radius: 20px;
            font-size: 10px; font-weight: 600;
            color: #5dca75;
            margin-top: 6px;
        }
        .cc-status-dot {
            width: 5px; height: 5px; border-radius: 50%; background: #28a745;
        }

        .cc-s-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 14px;
            overflow: hidden;
        }
        .cc-s-card-title {
            display: flex; align-items: center; gap: 8px;
            font-size: 10px; font-weight: 700;
            color: rgba(255,255,255,0.5);
            text-transform: uppercase; letter-spacing: 0.6px;
            padding: 10px 14px 9px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cc-s-card-title i { font-size: 11px; }

        .cc-s-row {
            display: flex; align-items: center;
            justify-content: space-between;
            padding: 11px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            gap: 10px;
        }
        .cc-s-row:last-child { border-bottom: none; }
        .cc-s-row-info { flex: 1; min-width: 0; }
        .cc-s-row-label {
            font-size: 12.5px; font-weight: 500;
            color: rgba(255,255,255,0.88);
            margin-bottom: 2px;
        }
        .cc-s-row-desc {
            font-size: 10.5px;
            color: rgba(255,255,255,0.38);
        }

        .cc-mb {
            padding: 6px 13px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 8px;
            color: rgba(255,255,255,0.88);
            font-family: 'Lexend', sans-serif;
            font-size: 11px; font-weight: 600;
            cursor: pointer;
            transition: all 0.18s;
            white-space: nowrap; flex-shrink: 0;
        }
        .cc-mb:hover {
            background: rgba(255,255,255,0.15);
            border-color: rgba(255,255,255,0.28);
        }
        .cc-mb.danger {
            background: rgba(220,53,69,0.16);
            border-color: rgba(220,53,69,0.3);
            color: #ff6b7a;
        }
        .cc-mb.danger:hover { background: rgba(220,53,69,0.26); }

        .cc-mb.extreme-danger {
            background: rgba(230, 15, 15, 0.16);
            border-color: rgba(220,53,69,0.3);
            color: #fa3044;
        }
        .cc-mb.extreme-danger:hover { background: rgba(255, 0, 25, 0.26); }

        .cc-input {
            width: 100%;
            padding: 9px 12px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 9px;
            color: rgba(255,255,255,0.9);
            font-family: 'Lexend', sans-serif;
            font-size: 12px;
            outline: none;
            transition: all 0.2s;
            margin-bottom: 8px;
            box-sizing: border-box;
        }
        .cc-input:focus {
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.26);
        }
        .cc-input::placeholder { color: rgba(255,255,255,0.28); }

        .cc-btn-row { display: flex; gap: 8px; margin-top: 2px; }
        .cc-auth-btn {
            flex: 1;
            padding: 9px 10px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 9px;
            color: rgba(255,255,255,0.88);
            font-family: 'Lexend', sans-serif;
            font-size: 11.5px; font-weight: 600;
            cursor: pointer;
            transition: all 0.18s;
        }
        .cc-auth-btn:hover { background: rgba(255,255,255,0.15); }
        .cc-auth-btn.primary {
            background: rgba(255,255,255,0.16);
            border-color: rgba(255,255,255,0.28);
        }

        .cc-stat-row {
            display: flex; align-items: center;
            justify-content: space-between;
            padding: 9px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cc-stat-row:last-child { border-bottom: none; }
        .cc-stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.65); }
        .cc-stat-val   { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.42); }

        .cc-inner-tabs {
            display: flex; gap: 5px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px; padding: 3px;
        }
        .cc-inner-tab {
            flex: 1; padding: 6px 4px;
            border-radius: 8px; border: none;
            background: transparent;
            color: rgba(255,255,255,0.45);
            font-family: 'Lexend', sans-serif;
            font-size: 10px; font-weight: 600;
            cursor: pointer; transition: all 0.18s;
            display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .cc-inner-tab i { font-size: 10px; }
        .cc-inner-tab:hover { color: rgba(255,255,255,0.75); }
        .cc-inner-tab.active {
            background: rgba(255,255,255,0.11);
            color: rgba(255,255,255,0.92);
        }

        .cc-inner-pane { display: none; flex-direction: column; gap: 10px; }
        .cc-inner-pane.visible { display: flex; }

        #cc-toast {
            position: fixed;
            bottom: 22px; right: 22px;
            padding: 11px 18px;
            background: rgba(22,22,24,0.92);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255,255,255,0.13);
            border-radius: 12px;
            color: rgba(255,255,255,0.9);
            font-family: 'Lexend', sans-serif;
            font-size: 12.5px; font-weight: 500;
            z-index: 999999;
            transition: opacity 0.28s, transform 0.28s;
            opacity: 0; transform: translateY(8px);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    function ccToast(msg) {
        let el = document.getElementById('cc-toast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'cc-toast';
            document.body.appendChild(el);
        }
        el.textContent = msg;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        clearTimeout(el._t);
        el._t = setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(8px)';
        }, 2600);
    }

    function runScript(name) {
        const s = document.createElement('script');
        s.src = `js/${name}.js`;
        s.onerror = () => console.warn(`[CC] Could not load js/${name}.js`);
        document.head.appendChild(s);
    }

    function addRipple(tile, e) {
        const r = document.createElement('span');
        r.className = 'cc-ripple';
        const rect = tile.getBoundingClientRect();
        r.style.top  = (e.clientY - rect.top)  + 'px';
        r.style.left = (e.clientX - rect.left) + 'px';
        tile.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    }

    function makeWideTile({ faIcon, title, sub, chevron = true, onClick }) {
        const t = document.createElement('div');
        t.className = 'cc-tile cc-tile-wide';
        t.innerHTML = `
            <div class="cc-tile-icon-wrap"><i class="${faIcon}"></i></div>
            <span class="cc-tile-text">
                <div class="cc-tile-title">${title}</div>
                ${sub ? `<div class="cc-tile-sub">${sub}</div>` : ''}
            </span>
            ${chevron ? '<i class="cc-tile-chevron fa-solid fa-chevron-right"></i>' : ''}`;
        t.addEventListener('click', e => { addRipple(t, e); onClick(e); });
        return t;
    }

    function divider() {
        return Object.assign(document.createElement('div'), { className: 'cc-divider' });
    }
    function label(text) {
        return Object.assign(document.createElement('div'), { className: 'cc-label', textContent: text });
    }

    function makeBrightnessSlider() {
        const saved = window.ScreenController ? window.ScreenController.getBrightness()
                    : parseInt(localStorage.getItem('cc_brightness') || '80', 10);
        const t = document.createElement('div');
        t.className = 'cc-tile cc-slider-tile';
        t.innerHTML = `
            <div class="cc-slider-header">
                <i class="fa-solid fa-sun"></i>
                <span class="cc-slider-label">Brightness</span>
                <span class="cc-slider-val">${saved}%</span>
            </div>
            <input type="range" class="cc-range" min="0" max="100" value="${saved}">`;
        const valEl = t.querySelector('.cc-slider-val');
        const range = t.querySelector('.cc-range');
        range.addEventListener('input', () => {
            const v = parseInt(range.value, 10);
            valEl.textContent = v + '%';
            if (window.ScreenController) window.ScreenController.setBrightness(v);
            else localStorage.setItem('cc_brightness', v);
        });
        range.addEventListener('click', e => e.stopPropagation());
        return t;
    }

    function makeNightVisionTile() {
        const isOn = window.ScreenController ? window.ScreenController.getNightVision()
                   : localStorage.getItem('cc_toggle_nightvision') === '1';
        const t = document.createElement('div');
        t.className = 'cc-tile cc-tile-wide' + (isOn ? ' nv-active' : '');
        t.innerHTML = `
            <div class="cc-tile-icon-wrap"><i class="fa-solid fa-moon"></i></div>
            <span class="cc-tile-text">
                <div class="cc-tile-title">Night Vision</div>
                <div class="cc-tile-sub">${isOn ? 'On — warm tint active' : 'Off — tap to enable'}</div>
            </span>`;
        t.addEventListener('click', e => {
            addRipple(t, e);
            const nowOn = !t.classList.contains('nv-active');
            t.classList.toggle('nv-active', nowOn);
            t.querySelector('.cc-tile-sub').textContent = nowOn ? 'On — warm tint active' : 'Off — tap to enable';
            if (window.ScreenController) window.ScreenController.setNightVision(nowOn);
            else localStorage.setItem('cc_toggle_nightvision', nowOn ? '1' : '0');
        });
        return t;
    }

    function close() {
        const p = document.getElementById('cc-overlay');
        if (!p) return;
        p.style.animation = 'cc-fade-out 0.2s cubic-bezier(0.4,0,1,1) forwards';
        p.addEventListener('animationend', () => { p.remove(); style.remove(); }, { once: true });
    }

    const panes = {};
    function switchTab(id) {
        Object.keys(panes).forEach(k => panes[k].classList.toggle('cc-visible', k === id));
        panel.querySelectorAll('.cc-tab-btn').forEach(b =>
            b.classList.toggle('cc-tab-active', b.dataset.tab === id));
        if (id === 'settings') initSettingsFirebase();
    }
    const overlay = document.createElement('div');
    overlay.id = 'cc-overlay';
    const panel = document.createElement('div');
    panel.id = 'cc-panel';
    const clockStrip = document.createElement('div');
    clockStrip.id = 'cc-clock-strip';
    clockStrip.innerHTML = `<div id="cc-clock-time">--:--</div><div id="cc-clock-date"></div>`;
    panel.appendChild(clockStrip);
    panel.appendChild(divider());

    const tabBar = document.createElement('div');
    tabBar.id = 'cc-tab-bar';
    [
        { id: 'controls',  fa: 'fa-solid fa-bolt',  text: 'Controls' },
        { id: 'settings',  fa: 'fa-solid fa-gear',  text: 'Settings' },
    ].forEach(({ id, fa, text }) => {
        const btn = document.createElement('button');
        btn.className = 'cc-tab-btn' + (id === 'controls' ? ' cc-tab-active' : '');
        btn.dataset.tab = id;
        btn.innerHTML = `<i class="${fa}"></i>${text}`;
        btn.addEventListener('click', () => switchTab(id));
        tabBar.appendChild(btn);
    });
    panel.appendChild(tabBar);
    const controlsPane = document.createElement('div');
    controlsPane.className = 'cc-tab-pane cc-visible';

    controlsPane.appendChild(label('Shortcuts'));
    [
        { faIcon: 'fa-solid fa-arrow-right-arrow-left', title: 'Transfer',  sub: 'Send or receive files',      onClick: () => { close(); setTimeout(() => runScript('transfer'), 120); } },
        { faIcon: 'fa-solid fa-users',                  title: 'About Us',  sub: 'Meet the Crafted Gamz team', onClick: () => { close(); setTimeout(() => runScript('about'), 120); } },
        { faIcon: 'fa-solid fa-palette',                 title: 'Customize Background',  sub: 'Personalize your experience', onClick: () => { close(); setTimeout(() => runScript('background'), 120); } },
        { faIcon: 'fa-solid fa-table-columns',              title: 'Change Layout',          sub: 'Switch your interface style',  onClick: () => { window.location.href = '../onboarding/2.html?skip=false&only=true'; } },
    ].forEach(cfg => controlsPane.appendChild(makeWideTile(cfg)));

    controlsPane.appendChild(divider());
    controlsPane.appendChild(label('Display'));
    controlsPane.appendChild(makeBrightnessSlider());
    controlsPane.appendChild(makeNightVisionTile());

    panes['controls'] = controlsPane;
    panel.appendChild(controlsPane);

    const settingsPane = document.createElement('div');
    settingsPane.className = 'cc-tab-pane';
    const innerTabBar = document.createElement('div');
    innerTabBar.className = 'cc-inner-tabs';

    const innerPanes = {};
    [
        { id: 'account', fa: 'fa-solid fa-user',     text: 'Account' },
        { id: 'data',    fa: 'fa-solid fa-database',  text: 'Data'    },
    ].forEach(({ id, fa, text }, i) => {
        const btn = document.createElement('button');
        btn.className = 'cc-inner-tab' + (i === 0 ? ' active' : '');
        btn.dataset.inner = id;
        btn.innerHTML = `<i class="${fa}"></i>${text}`;
        btn.addEventListener('click', () => switchInner(id));
        innerTabBar.appendChild(btn);

        const pane = document.createElement('div');
        pane.className = 'cc-inner-pane' + (i === 0 ? ' visible' : '');
        pane.dataset.innerId = id;
        innerPanes[id] = pane;
    });

    settingsPane.appendChild(innerTabBar);
    Object.values(innerPanes).forEach(p => settingsPane.appendChild(p));

    function switchInner(id) {
        Object.keys(innerPanes).forEach(k => {
            innerPanes[k].classList.toggle('visible', k === id);
        });
        innerTabBar.querySelectorAll('.cc-inner-tab').forEach(b =>
            b.classList.toggle('active', b.dataset.inner === id));
    }

    const accountPane = innerPanes['account'];
    const accountWrap = document.createElement('div');
    accountWrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;';
    accountPane.appendChild(accountWrap);

    function renderSignedIn(user) {
        const initial = (user.displayName || user.email || '?')[0].toUpperCase();
        accountWrap.innerHTML = `
            <div id="cc-profile-card">
                <div id="cc-profile-avatar">${initial}</div>
                <div id="cc-profile-info">
                    <div id="cc-profile-name">${user.displayName || 'User'}</div>
                    <div id="cc-profile-email">${user.email}</div>
                    <div id="cc-profile-badge"><span class="cc-status-dot"></span>Synced</div>
                </div>
            </div>
            <div class="cc-s-card">
                <div class="cc-s-card-title"><i class="fa-solid fa-user-gear"></i>Account</div>
                <div class="cc-s-row">
                    <div class="cc-s-row-info">
                        <div class="cc-s-row-label">Display Name</div>
                        <div class="cc-s-row-desc">Your name on record</div>
                    </div>
                    <button class="cc-mb" id="cc-edit-name">Edit</button>
                </div>
                <div class="cc-s-row">
                    <div class="cc-s-row-info">
                        <div class="cc-s-row-label">Email</div>
                        <div class="cc-s-row-desc">${user.email}</div>
                    </div>
                </div>
                <div class="cc-s-row">
                    <div class="cc-s-row-info">
                        <div class="cc-s-row-label">Sign Out</div>
                        <div class="cc-s-row-desc">Sign out of your account</div>
                    </div>
                    <button class="cc-mb danger" id="cc-signout">Sign Out</button>
                </div>
            </div>`;
        accountWrap.querySelector('#cc-edit-name').addEventListener('click', async () => {
            const name = prompt('New display name:', user.displayName || '');
            if (name && _fb) {
                try {
                    await _fb.updateProfile(_fb.auth.currentUser, { displayName: name });
                    ccToast('Display name updated!');
                    renderSignedIn({ ...user, displayName: name });
                } catch (e) { ccToast('Error: ' + e.message); }
            }
        });
        accountWrap.querySelector('#cc-signout').addEventListener('click', async () => {
            if (_fb) {
                try { await _fb.signOut(_fb.auth); ccToast('Signed out.'); }
                catch (e) { ccToast('Error: ' + e.message); }
            }
        });
    }

    function renderSignedOut() {
        accountWrap.innerHTML = `
            <div class="cc-s-card">
                <div class="cc-s-card-title"><i class="fa-solid fa-right-to-bracket"></i>Sign In</div>
                <div style="padding:12px 14px 14px;">
                    <input type="email"    id="cc-si-email" class="cc-input" placeholder="Email address">
                    <input type="password" id="cc-si-pass"  class="cc-input" placeholder="Password">
                    <div class="cc-btn-row">
                        <button class="cc-auth-btn primary" id="cc-signin">Sign In</button>
                        <button class="cc-auth-btn"         id="cc-to-signup">Create Account</button>
                    </div>
                </div>
            </div>`;
        accountWrap.querySelector('#cc-signin').addEventListener('click', async () => {
            const email = accountWrap.querySelector('#cc-si-email').value;
            const pass  = accountWrap.querySelector('#cc-si-pass').value;
            if (!email || !pass) { ccToast('Please fill in all fields'); return; }
            if (_fb) {
                try { await _fb.signInWithEmail(_fb.auth, email, pass); ccToast('Signed in!'); }
                catch (e) { ccToast('Error: ' + e.message); }
            }
        });
        accountWrap.querySelector('#cc-to-signup').addEventListener('click', renderSignUp);
    }

    function renderSignUp() {
        accountWrap.innerHTML = `
            <div class="cc-s-card">
                <div class="cc-s-card-title"><i class="fa-solid fa-user-plus"></i>Create Account</div>
                <div style="padding:12px 14px 14px;">
                    <input type="text"     id="cc-su-name"  class="cc-input" placeholder="Display name">
                    <input type="email"    id="cc-su-email" class="cc-input" placeholder="Email address">
                    <input type="password" id="cc-su-pass"  class="cc-input" placeholder="Password (min. 6 chars)">
                    <div class="cc-btn-row">
                        <button class="cc-auth-btn primary" id="cc-signup">Create Account</button>
                        <button class="cc-auth-btn"         id="cc-to-signin">Back</button>
                    </div>
                </div>
            </div>`;
        accountWrap.querySelector('#cc-signup').addEventListener('click', async () => {
            const name  = accountWrap.querySelector('#cc-su-name').value;
            const email = accountWrap.querySelector('#cc-su-email').value;
            const pass  = accountWrap.querySelector('#cc-su-pass').value;
            if (!name || !email || !pass) { ccToast('Please fill in all fields'); return; }
            if (pass.length < 6) { ccToast('Password must be at least 6 characters'); return; }
            if (_fb) {
                try {
                    const cred = await _fb.createUser(_fb.auth, email, pass);
                    await _fb.updateProfile(cred.user, { displayName: name });
                    ccToast('Account created!');
                } catch (e) { ccToast('Error: ' + e.message); }
            }
        });
        accountWrap.querySelector('#cc-to-signin').addEventListener('click', renderSignedOut);
    }
    function buildDataPane() {
        const pane = innerPanes['data'];
        const apps = JSON.parse(localStorage.getItem('installedApps') || '[]');
        let cacheKB = 0, settingsKB = 0;
        Object.keys(localStorage).forEach(k => {
            const sz = new Blob([localStorage.getItem(k)]).size;
            if (k.startsWith('app_cache_')) cacheKB += sz; else settingsKB += sz;
        });

        pane.innerHTML = '';
        const card1 = document.createElement('div');
        card1.className = 'cc-s-card';
        card1.innerHTML = `
            <div class="cc-s-card-title"><i class="fa-solid fa-hard-drive"></i>Storage</div>
            <div class="cc-stat-row"><span class="cc-stat-label">Installed Apps</span><span class="cc-stat-val">${apps.length}</span></div>
            <div class="cc-stat-row"><span class="cc-stat-label">Cached Data</span><span class="cc-stat-val">${(cacheKB/1024).toFixed(2)} KB</span></div>
            <div class="cc-stat-row"><span class="cc-stat-label">Settings Data</span><span class="cc-stat-val">${(settingsKB/1024).toFixed(2)} KB</span></div>`;
        pane.appendChild(card1);

        const card2 = document.createElement('div');
        card2.className = 'cc-s-card';
        card2.innerHTML = `
            <div class="cc-s-card-title"><i class="fa-solid fa-sliders"></i>Data Management</div>
            <div class="cc-s-row">
                <div class="cc-s-row-info"><div class="cc-s-row-label">Export Data</div><div class="cc-s-row-desc">Download all your data as JSON</div></div>
                <button class="cc-mb" id="cc-export">Export</button>
            </div>
            <div class="cc-s-row">
                <div class="cc-s-row-info"><div class="cc-s-row-label">Clear Cache</div><div class="cc-s-row-desc">Remove cached app data</div></div>
                <button class="cc-mb" id="cc-clear-cache">Clear</button>
            </div>
            <div class="cc-s-row">
                <div class="cc-s-row-info"><div class="cc-s-row-label">Reset All Data</div><div class="cc-s-row-desc">Remove all apps and settings</div></div>
                <button class="cc-mb danger" id="cc-reset">Reset</button>
            </div>
            <div class="cc-s-row">
                <div class="cc-s-row-info"><div class="cc-s-row-label">Delete Account</div><div class="cc-s-row-desc">Permanently deletes your Firebase account</div></div>
                <button class="cc-mb extreme-danger" id="cc-delete-account">Delete</button>
            </div>`;
        pane.appendChild(card2);

        card2.querySelector('#cc-export').addEventListener('click', () => {
            const blob = new Blob([JSON.stringify({
                installedApps: JSON.parse(localStorage.getItem('installedApps') || '[]'),
                exportDate: new Date().toISOString()
            }, null, 2)], { type: 'application/json' });
            const a = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(blob), download: 'crafted-gamz-data.json'
            });
            a.click(); URL.revokeObjectURL(a.href);
            ccToast('Data exported');
        });
        card2.querySelector('#cc-clear-cache').addEventListener('click', () => {
            if (confirm('Clear all cached app data?')) {
                Object.keys(localStorage).filter(k => k.startsWith('app_cache_')).forEach(k => localStorage.removeItem(k));
                buildDataPane();
                ccToast('Cache cleared');
            }
        });
        card2.querySelector('#cc-reset').addEventListener('click', () => {
            if (confirm('Remove all apps and settings?') && confirm('This cannot be undone. Continue?')) {
                localStorage.clear();
                buildDataPane();
                ccToast('All data reset');
                if (window.loadDock) window.loadDock();
            }
        });
        card2.querySelector('#cc-delete-account').addEventListener('click', async () => {
            if (!_fb || !_fb.auth.currentUser) {
                ccToast('No account signed in.');
                return;
            }
            if (confirm('Permanently delete your account? This cannot be undone.') &&
                confirm('Are you absolutely sure?')) {
                try {
                    const { deleteUser } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
                    await deleteUser(_fb.auth.currentUser);
                    localStorage.clear();
                    buildDataPane();
                    ccToast('Account deleted.');
                    if (window.loadDock) window.loadDock();
                } catch (e) {
                    if (e.code === 'auth/requires-recent-login') {
                        ccToast('Please sign out and sign back in, then try again.');
                    } else {
                        ccToast('Error: ' + e.message);
                    }
                }
            }
        });
    }
    buildDataPane();

    panes['settings'] = settingsPane;
    panel.appendChild(settingsPane);
    let _fb = null;
    let _fbInitialized = false;

    async function initSettingsFirebase() {
        if (_fbInitialized) return;
        _fbInitialized = true;
        renderSignedOut();
        try {
            const [{ initializeApp, getApps, getApp },
                   { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
                     signInWithEmailAndPassword, signOut, updateProfile },
                   { getDatabase, ref, set, get }] = await Promise.all([
                import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'),
                import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'),
                import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'),
            ]);
            let app;
            if (getApps().length > 0) {
                app = getApp();
            } else {
                const res = await fetch('https://firebase.cdn.cgamz.online', {
                    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
                });
                if (!res.ok) throw new Error('Config ' + res.status);
                const config = await res.json();
                app = initializeApp(config);
            }

            const auth = getAuth(app);
            const db   = getDatabase(app);

            _fb = {
                auth,
                signOut:        (a)       => signOut(a),
                signInWithEmail:(a, e, p) => signInWithEmailAndPassword(a, e, p),
                createUser:     (a, e, p) => createUserWithEmailAndPassword(a, e, p),
                updateProfile:  (u, d)    => updateProfile(u, d),
            };
            if (auth.currentUser) renderSignedIn(auth.currentUser);

            onAuthStateChanged(auth, async user => {
                if (user) {
                    renderSignedIn(user);
                    try {
                        const snap = await get(ref(db, 'users/' + user.uid));
                        if (snap.exists() && snap.val().installedApps)
                            localStorage.setItem('installedApps', JSON.stringify(snap.val().installedApps));
                    } catch (e) {}
                    window.addEventListener('storage', async () => {
                        try {
                            await set(ref(db, 'users/' + user.uid), {
                                installedApps: JSON.parse(localStorage.getItem('installedApps') || '[]'),
                                lastSync: Date.now()
                            });
                        } catch (e) {}
                    });
                } else {
                    renderSignedOut();
                }
            });
        } catch (err) {
            console.error('[CC] Firebase init failed', err);
            ccToast('Could not connect to account services.');
        }
    }

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    function tickClock() {
        const el = document.getElementById('cc-clock-time');
        const de = document.getElementById('cc-clock-date');
        if (!el) return;
        const now  = new Date();
        let h = now.getHours(), m = now.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        el.textContent = `${h}:${String(m).padStart(2,'0')} ${ampm}`;
        const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        de.innerHTML  = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}<br>${now.getFullYear()}`;
    }
    tickClock();
    const clockTick = setInterval(tickClock, 5000);

    function outsideClick(e) {
        if (!panel.contains(e.target) && e.target.id !== 'cc-overlay') {
            close(); clearInterval(clockTick);
            document.removeEventListener('mousedown', outsideClick);
        }
    }
    setTimeout(() => document.addEventListener('mousedown', outsideClick), 80);

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            close(); clearInterval(clockTick);
            document.removeEventListener('keydown', escHandler);
        }
    });

})();