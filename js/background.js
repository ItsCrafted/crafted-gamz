(function() {
    'use strict';

    const STORAGE_KEY = 'bgPreference';
    const COLLECTIONS = ['minimal', 'nature', 'infrastructure'];
    const IMG_BASE = 'https://i.cgamz.site/images';

    function getPreference() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
        catch { return {}; }
    }

    function savePreference(pref) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
    }

    function applyBackground(collection, index, mode) {
    const frame = document.getElementById('background-frame');
    if (!frame) return;
    if (mode === 'daily') {
        frame.src = `https://i.cgamz.site`;
    } else {
        frame.src = `https://i.cgamz.site?c=${encodeURIComponent(collection)}&i=${encodeURIComponent(index)}`;
    }
}

    const existing = document.getElementById('bg-pref-overlay');
    if (existing) existing.remove();
    const existingStyle = document.getElementById('bg-pref-style');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'bg-pref-style';
    style.textContent = `
        @keyframes bgFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes bgSlideIn {
            from { opacity: 0; transform: translateY(-16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        #bg-pref-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.35);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            animation: bgFadeIn 0.4s ease-out;
        }
        #bg-pref-panel {
            background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008));
            border: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(18px) saturate(180%) contrast(120%) brightness(105%);
            -webkit-backdrop-filter: blur(18px) saturate(180%) contrast(120%) brightness(105%);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3), inset 0 0 0.5px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.02);
            border-radius: 24px;
            color: white;
            user-select: none;
            animation: bgSlideIn 0.3s ease-out;
            position: relative;
            width: min(88vw, 960px);
            aspect-ratio: 16/9;
            display: flex;
            flex-direction: row;
            overflow: hidden;
        }
        #bg-pref-panel::before {
            content: "";
            position: absolute;
            top: 0; left: -50%;
            width: 200%; height: 100%;
            background: radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.07), transparent 60%);
            mix-blend-mode: soft-light;
            pointer-events: none;
            z-index: 1;
        }
        #bg-pref-sidebar {
            width: 220px;
            flex-shrink: 0;
            border-right: 1px solid rgba(255,255,255,0.07);
            padding: 36px 28px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            z-index: 2;
            position: relative;
        }
        #bg-pref-main {
            flex: 1;
            padding: 36px 32px 28px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            overflow: hidden;
            z-index: 2;
            position: relative;
        }
        #bg-pref-close {
            position: absolute;
            top: 16px; right: 18px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            width: 36px; height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: bold;
            font-family: inherit;
            transition: all 0.2s ease;
            z-index: 10;
        }
        #bg-pref-close:hover {
            background: rgba(255,255,255,0.14);
            border-color: rgba(255,255,255,0.28);
            transform: translateY(-1px);
        }
        .bgp-title {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.3px;
        }
        .bgp-label {
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.4;
        }
        .bgp-tabs {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .bgp-tab {
            padding: 7px 14px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.04);
            color: white;
            font-size: 13px;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.18s ease;
            text-transform: capitalize;
            text-align: left;
        }
        .bgp-tab:hover {
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.22);
        }
        .bgp-tab.active {
            background: rgba(255,255,255,0.16);
            border-color: rgba(255,255,255,0.45);
            font-weight: 600;
        }
        .bgp-mode-row {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .bgp-mode-btn {
            padding: 7px 14px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
            background: rgba(255,255,255,0.04);
            color: white;
            font-size: 13px;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.18s ease;
            text-align: left;
        }
        .bgp-mode-btn:hover {
            background: rgba(255,255,255,0.09);
            border-color: rgba(255,255,255,0.22);
        }
        .bgp-mode-btn.active {
            background: rgba(255,255,255,0.16);
            border-color: rgba(255,255,255,0.45);
            font-weight: 600;
        }
        .bgp-apply {
            margin-top: auto;
            padding: 9px 0;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.22);
            background: rgba(255,255,255,0.08);
            color: white;
            font-size: 13px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.3px;
            width: 100%;
        }
        .bgp-apply:hover {
            background: rgba(255,255,255,0.18);
            border-color: rgba(255,255,255,0.5);
            transform: translateY(-1px);
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .bgp-grid-wrap {
            flex: 1;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.15) transparent;
        }
        .bgp-grid-wrap::-webkit-scrollbar { width: 4px; }
        .bgp-grid-wrap::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .bgp-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 7px;
        }
        .bgp-thumb {
            aspect-ratio: 16/10;
            border-radius: 7px;
            border: 2px solid rgba(255,255,255,0.07);
            cursor: pointer;
            overflow: hidden;
            transition: all 0.18s ease;
            background: rgba(255,255,255,0.04);
            position: relative;
        }
        .bgp-thumb:hover {
            border-color: rgba(255,255,255,0.35);
            transform: scale(1.06);
        }
        .bgp-thumb.selected {
            border-color: white;
            box-shadow: 0 0 12px rgba(255,255,255,0.3);
        }
        .bgp-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .bgp-thumb-num {
            position: absolute;
            bottom: 2px; right: 4px;
            font-size: 8px;
            opacity: 0;
            color: white;
            text-shadow: 0 1px 4px rgba(0,0,0,0.9);
            transition: opacity 0.12s ease;
            font-family: inherit;
        }
        .bgp-thumb:hover .bgp-thumb-num,
        .bgp-thumb.selected .bgp-thumb-num { opacity: 0.65; }
        .bgp-sidebar-spacer { flex: 1; }
    `;
    document.head.appendChild(style);

    const pref = getPreference();
    let selCol = pref.collection || COLLECTIONS[0];
    let selIdx = pref.index || 1;
    let selMode = pref.mode || 'daily';

    const overlay = document.createElement('div');
    overlay.id = 'bg-pref-overlay';

    const panel = document.createElement('div');
    panel.id = 'bg-pref-panel';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'bg-pref-close';
    closeBtn.textContent = '✕';

    const sidebar = document.createElement('div');
    sidebar.id = 'bg-pref-sidebar';

    const main = document.createElement('div');
    main.id = 'bg-pref-main';

    const title = document.createElement('div');
    title.className = 'bgp-title';
    title.textContent = 'Background';

    const colLabel = document.createElement('div');
    colLabel.className = 'bgp-label';
    colLabel.textContent = 'Collection';

    const tabs = document.createElement('div');
    tabs.className = 'bgp-tabs';

    COLLECTIONS.forEach(col => {
        const tab = document.createElement('button');
        tab.className = 'bgp-tab' + (col === selCol ? ' active' : '');
        tab.textContent = col;
        tab.onclick = () => {
            selCol = col;
            selIdx = 1;
            tabs.querySelectorAll('.bgp-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGrid();
        };
        tabs.appendChild(tab);
    });

    const modeLabel = document.createElement('div');
    modeLabel.className = 'bgp-label';
    modeLabel.textContent = 'Rotation';

    const modeRow = document.createElement('div');
    modeRow.className = 'bgp-mode-row';

    [['daily', 'Daily Rotation'], ['fixed', 'Fixed Image']].forEach(([key, label]) => {
        const btn = document.createElement('button');
        btn.className = 'bgp-mode-btn' + (key === selMode ? ' active' : '');
        btn.textContent = label;
        btn.onclick = () => {
            selMode = key;
            modeRow.querySelectorAll('.bgp-mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        modeRow.appendChild(btn);
    });

    const spacer = document.createElement('div');
    spacer.className = 'bgp-sidebar-spacer';

    const applyBtn = document.createElement('button');
    applyBtn.className = 'bgp-apply';
    applyBtn.textContent = 'Apply';

    applyBtn.onclick = () => {
        savePreference({ collection: selCol, index: selIdx, mode: selMode });
        applyBackground(selCol, selIdx, selMode);
        // Immediately sync to server so the preference isn't lost on reload
        if (window.accountManager && typeof window.accountManager.syncToServer === 'function') {
            window.accountManager.syncToServer();
        }
        closeOverlay();
    };

    sidebar.appendChild(title);
    sidebar.appendChild(colLabel);
    sidebar.appendChild(tabs);
    sidebar.appendChild(modeLabel);
    sidebar.appendChild(modeRow);
    sidebar.appendChild(spacer);
    sidebar.appendChild(applyBtn);

    const imgLabel = document.createElement('div');
    imgLabel.className = 'bgp-label';
    imgLabel.textContent = 'Image';

    const gridWrap = document.createElement('div');
    gridWrap.className = 'bgp-grid-wrap';

    const grid = document.createElement('div');
    grid.className = 'bgp-grid';
    gridWrap.appendChild(grid);

    function renderGrid() {
        grid.innerHTML = '';
        for (let i = 1; i <= 31; i++) {
            const thumb = document.createElement('div');
            thumb.className = 'bgp-thumb' + (i === selIdx ? ' selected' : '');

            const img = document.createElement('img');
            img.src = `${IMG_BASE}/${selCol}/${i}.png`;
            img.loading = 'lazy';
            img.alt = '';
            thumb.appendChild(img);

            const num = document.createElement('span');
            num.className = 'bgp-thumb-num';
            num.textContent = i;
            thumb.appendChild(num);

            const capturedI = i;
            thumb.onclick = () => {
                selIdx = capturedI;
                grid.querySelectorAll('.bgp-thumb').forEach(t => t.classList.remove('selected'));
                thumb.classList.add('selected');
            };

            grid.appendChild(thumb);
        }
    }

    renderGrid();

    main.appendChild(imgLabel);
    main.appendChild(gridWrap);

    panel.appendChild(closeBtn);
    panel.appendChild(sidebar);
    panel.appendChild(main);
    overlay.appendChild(panel);

    function closeOverlay() {
        overlay.style.animation = 'bgFadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
            if (style.parentNode) style.remove();
        }, 200);
    }

    closeBtn.onclick = closeOverlay;

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeOverlay();
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeOverlay();
            document.removeEventListener('keydown', escHandler);
        }
    });

    document.body.appendChild(overlay);

})();