if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/cache.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

const CDN_BASE = 'all-app-stuff';

function getCDNUrl(path) {
    if (path && !path.startsWith('/')) path = '/' + path;
    return `${CDN_BASE}${path}`;
}

function getAppUrl(app) {
    const directory = app.directory || '';
    return `${CDN_BASE}/${directory}${app.id}.html`;
}

const apps = [
    {
        id: 'appStore',
        name: 'App Store',
        iconUrl: 'img/app_store.png',
        pinned: false,
        system: true,
        externalUrl: 'store.html'
    }
];

let contextMenuTarget = null;

function getInstalledApps() {
    const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
    return installed;
}

function saveInstalledApps(installedApps) {
    localStorage.setItem('installedApps', JSON.stringify(installedApps));
}

function isAppInstalled(appId) {
    const installed = getInstalledApps();
    return installed.some(app => app.id === appId);
}

function isAppPinned(appId) {
    const app = findApp(appId);
    return app && app.pinned;
}

function isAppOpen(appId) {
    const windowEl = document.getElementById(appId + 'Window');
    return windowEl !== null;
}

function isAppMinimized(appId) {
    const windowEl = document.getElementById(appId + 'Window');
    return windowEl && windowEl.classList.contains('minimized');
}

function pinApp(appId) {
    const installed = getInstalledApps();
    const app = installed.find(a => a.id === appId);
    if (app) {
        app.pinned = true;
        saveInstalledApps(installed);
    }

    const systemApp = apps.find(a => a.id === appId);
    if (systemApp) {
        systemApp.pinned = true;
    }

    loadDock();
}

function unpinApp(appId) {
    const installed = getInstalledApps();
    const app = installed.find(a => a.id === appId);
    if (app) {
        app.pinned = false;
        saveInstalledApps(installed);
    }

    const systemApp = apps.find(a => a.id === appId);
    if (systemApp) {
        systemApp.pinned = false;
    }
    loadDock();
}

function showContextMenu(e, type, data) {
    e.preventDefault();
    e.stopPropagation();
    
    const menu = document.getElementById('contextMenu');
    contextMenuTarget = data;
    
    let menuHtml = '';
    
    if (type === 'dock') {
        const windowId = data.appId + 'Window';
        const windowEl = document.getElementById(windowId);
        const isMinimized = windowEl && windowEl.classList.contains('minimized');
        const isOpen = windowEl && !windowEl.classList.contains('minimized');
        
        if (isMinimized) {
            menuHtml += `
                <div class="context-menu-item" onclick="restoreWindow('${windowId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                    Show
                </div>
                <div class="context-menu-item" onclick="closeWindow('${windowId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    Quit
                </div>
                <div class="context-menu-separator"></div>
            `;
        } else if (isOpen) {
            menuHtml += `
                <div class="context-menu-item" onclick="minimizeWindow('${windowId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>
                    Minimize
                </div>
                <div class="context-menu-item" onclick="closeWindow('${windowId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    Quit
                </div>
                <div class="context-menu-separator"></div>
            `;
        } else {
            menuHtml += `
                <div class="context-menu-item" onclick="openApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Open
                </div>
            `;
        }

        if (isAppPinned(data.appId)) {
            menuHtml += `
                <div class="context-menu-item" onclick="unpinApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z"/></svg>
                    Unpin from Dock
                </div>
            `;
        } else {
            menuHtml += `
                <div class="context-menu-item" onclick="pinApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M16,9V4l1,0c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3v2h5.97 v7l1,1l1-1v-7H19v-2C17.34,12,16,10.66,16,9z"/></svg>
                    Pin to Dock
                </div>
            `;
        }
        
        if (!data.system) {
            menuHtml += `
                <div class="context-menu-separator"></div>
                <div class="context-menu-item" onclick="uninstallApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    Uninstall
                </div>
            `;
        }
    } else if (type === 'launch') {
        menuHtml += `
            <div class="context-menu-item" onclick="openApp('${data.appId}'); hideContextMenu();">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Open
            </div>
        `;

        if (isAppPinned(data.appId)) {
            menuHtml += `
                <div class="context-menu-item" onclick="unpinApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M14,4v5c0,1.12,0.37,2.16,1,3H9c0.65-0.86,1-1.9,1-3V4H14 M17,2H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1c0,0,0,0,0,0l1,0v5 c0,1.66-1.34,3-3,3v2h5.97v7l1,1l1-1v-7H19v-2c0,0,0,0,0,0c-1.66,0-3-1.34-3-3V4l1,0c0,0,0,0,0,0c0.55,0,1-0.45,1-1 C18,2.45,17.55,2,17,2L17,2z"/></svg>
                    Unpin from Dock
                </div>
            `;
        } else {
            menuHtml += `
                <div class="context-menu-item" onclick="pinApp('${data.appId}'); hideContextMenu();">
                    <svg viewBox="0 0 24 24"><path d="M16,9V4l1,0c0.55,0,1-0.45,1-1c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3v2h5.97 v7l1,1l1-1v-7H19v-2C17.34,12,16,10.66,16,9z"/></svg>
                    Pin to Dock
                </div>
            `;
        }
    }
    
    menu.innerHTML = menuHtml;
    menu.classList.add('active');

    const menuWidth = 180;
    const menuHeight = menu.offsetHeight;
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 10;
    }
    
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}

function hideContextMenu() {
    const menu = document.getElementById('contextMenu');
    menu.classList.remove('active');
    contextMenuTarget = null;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.context-menu')) {
        hideContextMenu();
    }
});

document.addEventListener('contextmenu', (e) => {
    if (!e.target.closest('.dock-icon') && !e.target.closest('.launch-app')) {
        return;
    }
    e.preventDefault();
});

async function installApp(app) {
    const overlay = document.createElement('div');
    overlay.className = 'progress-overlay';
    overlay.innerHTML = `
        <div class="progress-box">
            <h3>Installing ${app.name}</h3>
            <div class="progress-status" id="installStatus">Preparing installation...</div>
            <div class="progress-bar">
                <div class="progress-bar-fill" id="installProgress" style="width: 0%"></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    const statusEl = document.getElementById('installStatus');
    const progressEl = document.getElementById('installProgress');
    
    try {
        statusEl.textContent = 'Downloading application...';
        progressEl.style.width = '30%';
        
        const directory = app.directory || '';
        const url = getCDNUrl(`/${directory}${app.id}.html`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        statusEl.textContent = 'Processing files...';
        progressEl.style.width = '60%';
        
        const html = await response.text();
        
        statusEl.textContent = 'Caching resources...';
        progressEl.style.width = '80%';
        
        localStorage.setItem(`app_cache_${app.id}`, html);
        
        statusEl.textContent = 'Finalizing installation...';
        progressEl.style.width = '90%';
        
        const installed = getInstalledApps();
        if (!installed.some(a => a.id === app.id)) {
            installed.push(app);
            saveInstalledApps(installed);
        }
        
        statusEl.textContent = 'Installation complete!';
        progressEl.style.width = '100%';
        
        await new Promise(resolve => setTimeout(resolve, 600));
        
        loadDock();
        loadLaunchApps();
        loadAppStore();
        
        overlay.remove();
    } catch (error) {
        console.error('Install error:', error);
        overlay.remove();
        alert(`Failed to install ${app.name}: ${error.message}`);
    }
}

function uninstallApp(appId) {
    localStorage.removeItem(`app_cache_${appId}`);
    
    const installed = getInstalledApps();
    const filtered = installed.filter(app => app.id !== appId);
    saveInstalledApps(filtered);
    
    const windowEl = document.getElementById(appId + 'Window');
    if (windowEl) {
        windowEl.remove();
    }
    
    loadDock();
    loadLaunchApps();
    loadAppStore();
}

function getAllApps() {
    const installed = getInstalledApps();
    const systemApps = apps.filter(app => app.system);
    
    const allApps = [...systemApps];
    installed.forEach(app => {
        if (!allApps.some(a => a.id === app.id)) {
            allApps.push(app);
        }
    });
    
    return allApps;
}

function findApp(appId) {
    const allApps = getAllApps();
    return allApps.find(a => a.id === appId);
}

function loadDock() {
    const dock = document.getElementById('dock');

    const icons = dock.querySelectorAll('.dock-icon:not(.launch-icon), .dock-separator:not(:first-child)');
    icons.forEach(icon => icon.remove());
    
    const allApps = getAllApps();

    const pinnedApps = allApps.filter(app => app.pinned);

    const runningApps = allApps.filter(app => {
        const windowEl = document.getElementById(app.id + 'Window');
        return windowEl && !app.pinned;
    });

    pinnedApps.forEach(app => {
        addDockIcon(app, dock);
    });

    if (pinnedApps.length > 0 && runningApps.length > 0) {
        const separator = document.createElement('div');
        separator.className = 'dock-separator';
        dock.appendChild(separator);
    }

    runningApps.forEach(app => {
        addDockIcon(app, dock);
    });
}

function addDockIcon(app, dock) {
    const icon = document.createElement('div');
    icon.className = 'dock-icon';
    icon.title = app.name;
    icon.setAttribute('data-app-id', app.id);
    icon.setAttribute('data-is-system', app.system ? 'true' : 'false');

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDockIconClick(app.id);
    });

    icon.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e, 'dock', { appId: app.id, system: app.system });
    });
    
    if (app.iconUrl) {
        icon.style.background = 'none';
        const img = document.createElement('img');
        img.src = app.iconUrl;
        img.style.cssText = 'width: 100%; height: 100%; border-radius: 16px; object-fit: cover; pointer-events: none;';
        img.onerror = function() {
            icon.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.display = 'none';
        };
        icon.appendChild(img);
    } else {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.style.pointerEvents = 'none';
        svg.innerHTML = app.icon;
        icon.appendChild(svg);
    }

    const windowEl = document.getElementById(app.id + 'Window');
    if (windowEl) {
        const indicator = document.createElement('div');
        indicator.className = 'dock-indicator';
        indicator.style.pointerEvents = 'none';
        icon.appendChild(indicator);
    }
    
    dock.appendChild(icon);
}

function bounceDockIcon(appId) {
    const icon = document.querySelector(`.dock-icon[data-app-id="${appId}"]`);
    if (!icon) return;
    icon.classList.remove('bouncing');
    void icon.offsetWidth;
    icon.classList.add('bouncing');
    icon.addEventListener('animationend', () => icon.classList.remove('bouncing'), { once: true });
}

function handleDockIconClick(appId) {
    const windowEl = document.getElementById(appId + 'Window');
    
    if (!windowEl) {
        openApp(appId);
    } else if (windowEl.classList.contains('minimized')) {
        restoreWindow(appId + 'Window');
    } else {
        minimizeWindow(appId + 'Window');
    }
}

function loadLaunchApps() {
    const container = document.getElementById('launchApps');
    container.innerHTML = '';
    
    const allApps = getAllApps();
    allApps.forEach(app => {
        const appEl = document.createElement('div');
        appEl.className = 'launch-app';
        appEl.dataset.appName = app.name.toLowerCase();
        
        appEl.addEventListener('click', (e) => {
            e.stopPropagation();
            openApp(app.id);
        });

        appEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showContextMenu(e, 'launch', { appId: app.id, system: app.system });
        });
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'launch-app-icon';
        iconDiv.style.pointerEvents = 'none';
        
        if (app.iconUrl) {
            iconDiv.style.background = 'none';
            const img = document.createElement('img');
            img.src = app.iconUrl;
            img.style.cssText = 'width: 100%; height: 100%; border-radius: 20px; object-fit: cover; pointer-events: none;';
            img.onerror = function() {
                iconDiv.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.display = 'none';
            };
            iconDiv.appendChild(img);
        } else {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.style.pointerEvents = 'none';
            svg.innerHTML = app.icon;
            iconDiv.appendChild(svg);
        }
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'launch-app-name';
        nameDiv.style.pointerEvents = 'none';
        nameDiv.textContent = app.name;
        
        appEl.appendChild(iconDiv);
        appEl.appendChild(nameDiv);
        container.appendChild(appEl);
    });
}

async function loadAppStore() {
    const content = document.querySelector('#appStoreWindow .window-content');
    if (!content) return;
    
    const appStoreApp = findApp('appStore');
    if (appStoreApp && appStoreApp.externalUrl) {
        const url = appStoreApp.externalUrl.startsWith('http')
            ? appStoreApp.externalUrl
            : appStoreApp.externalUrl;
        content.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>`;
        return;
    }
    
    content.innerHTML = '<div class="loading"><h3>Loading App Store...</h3><p>Discovering amazing applications</p></div>';
    
    try {
        const response = await fetch(getCDNUrl('/apps.json'));
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const storeApps = await response.json();
        
        let html = `
            <div class="app-store-nav">
                <div class="app-store-nav-item active">Apps</div>
                <div class="app-store-nav-item">Games</div>
                <div class="app-store-nav-item">Entertainment</div>
            </div>
            <div class="app-store-hero">
                <div class="app-store-hero-content">
                    <h1>Discover Apps</h1>
                    <p>Find and install amazing applications for your desktop</p>
                </div>
            </div>
            <div class="app-store-section">
                <div class="app-store-section-title">Featured Applications</div>
                <div class="app-grid">
        `;
        
        for (const app of storeApps) {
            const installed = isAppInstalled(app.id);
            const rating = 4.5;
            const iconUrl = app.iconUrl || '';
            
            html += `
                <div class="app-card" onclick='showAppDetail(${JSON.stringify(app).replace(/'/g, "&apos;")})'>
                    <div class="app-card-header">
                        <img src="${iconUrl}" class="app-card-icon" alt="${app.name}">
                        <div class="app-card-info">
                            <div class="app-card-category">${app.category || 'Application'}</div>
                            <div class="app-card-name">${app.name}</div>
                            <div class="app-card-desc">${app.desc || 'No description available'}</div>
                            <div class="app-card-rating">
                                <div class="app-card-stars">
                                    ${Array(5).fill(0).map((_, i) => `
                                        <svg viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                        </svg>
                                    `).join('')}
                                </div>
                                <span class="app-card-rating-text">${rating} (1.2K)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        html += '</div></div>';
        content.innerHTML = html;
    } catch (error) {
        console.error('App Store load error:', error);
        content.innerHTML = `
            <div class="loading">
                <h3>App Store Unavailable</h3>
                <p>Unable to connect to the app store at this time.</p>
                <p style="font-size: 13px; margin-top: 16px; opacity: 0.6;">Error: ${error.message}</p>
            </div>
        `;
    }
}

function showAppDetail(app) {
    const content = document.querySelector('#appStoreWindow .window-content');
    if (!content) return;
    
    const installed = isAppInstalled(app.id);
    const rating = 4.5;
    const downloads = '1.2M';
    const iconUrl = app.iconUrl || '';
    
    const features = app.features || [
        'Intuitive and user-friendly interface',
        'Fast and responsive performance',
        'Regular updates and improvements',
        'Secure and reliable'
    ];
    
    const featuresList = features.map(f => `• ${f}`).join('<br>');
    
    content.innerHTML = `
        <div class="app-detail">
            <div class="app-detail-hero">
                <div class="app-store-back" onclick="loadAppStore()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                    Back
                </div>
                <div class="app-detail-header">
                    <img src="${iconUrl}" class="app-detail-icon" alt="${app.name}">
                    <div class="app-detail-info">
                        <div class="app-detail-category">${app.category || 'Application'}</div>
                        <h2>${app.name}</h2>
                        <p>${app.desc || 'No description available.'}</p>
                        <div class="app-detail-meta">
                            <div class="app-detail-meta-item">
                                <div class="app-detail-meta-label">Rating</div>
                                <div class="app-detail-meta-value">★ ${rating}</div>
                            </div>
                            <div class="app-detail-meta-item">
                                <div class="app-detail-meta-label">Downloads</div>
                                <div class="app-detail-meta-value">${downloads}</div>
                            </div>
                            <div class="app-detail-meta-item">
                                <div class="app-detail-meta-label">Category</div>
                                <div class="app-detail-meta-value">${app.category || 'Application'}</div>
                            </div>
                        </div>
                        <div class="app-detail-actions">
                            ${installed 
                                ? `<button class="app-card-button uninstall" onclick='uninstallApp("${app.id}"); loadAppStore();'>Uninstall</button>
                                   <button class="app-card-button open" onclick='openApp("${app.id}")'>Open</button>`
                                : `<button class="app-card-button install" onclick='installApp(${JSON.stringify(app).replace(/'/g, "&apos;")})'>Get</button>`
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div class="app-detail-content">
                <div class="app-detail-section">
                    <h3>About this app</h3>
                    <p>${app.longDesc || app.desc || 'No additional information available about this application.'}</p>
                </div>
                <div class="app-detail-section">
                    <h3>Features</h3>
                    <p>${featuresList}</p>
                </div>
            </div>
        </div>
    `;
}

loadDock();
loadLaunchApps();
updateDockVisibility();

function updateTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    document.getElementById('time').textContent = `${dayName} ${month} ${date}  ${hours}:${minutes} ${ampm}`;
}
updateTime();
setInterval(updateTime, 1000);

(function() {
    const timeEl = document.getElementById('time');
    timeEl.style.cursor = 'pointer';
    timeEl.addEventListener('click', () => {
        const existing = document.getElementById('clock-script');
        if (existing) existing.remove();
        const s = document.createElement('script');
        s.id = 'clock-script';
        s.src = 'js/clock.js?t=' + Date.now();
        document.head.appendChild(s);
    });
})();

const PING_URL = 'https://ping.craftedgamz.workers.dev';

async function pingServer() {
    const dot = document.getElementById('networkDot');
    const label = document.getElementById('networkLabel');
    try {
        const res = await fetch(PING_URL, { method: 'GET', cache: 'no-store' });
        if (res.ok) {
            dot.className = 'network-dot connected';
            label.textContent = 'Connected to server';
        } else {
            throw new Error('bad status');
        }
    } catch {
        dot.className = 'network-dot disconnected';
        label.textContent = 'Not connected to server';
    }
}
pingServer();
setInterval(pingServer, 5000);

function updateDockVisibility() {
    const dockContainer = document.getElementById('dockContainer');
    const hasFullscreenWindow = Array.from(document.querySelectorAll('.window')).some(w => w.classList.contains('fullscreen'));
    
    if (hasFullscreenWindow) {
        dockContainer.classList.remove('visible');
    } else {
        dockContainer.classList.add('visible');
    }
}

const dockContainer = document.getElementById('dockContainer');
const dockTrigger = document.getElementById('dockTrigger');
let dockHoverTimeout;

function showDock() {
    clearTimeout(dockHoverTimeout);
    dockContainer.classList.add('hover');
}

function hideDock() {
    dockHoverTimeout = setTimeout(() => {
        dockContainer.classList.remove('hover');
    }, 300);
}

dockTrigger.addEventListener('mouseenter', showDock);
dockContainer.addEventListener('mouseenter', showDock);
dockContainer.addEventListener('mouseleave', hideDock);

function toggleLaunchMenu() {
    const menu = document.getElementById('launchMenu');
    menu.classList.toggle('active');
    if (!menu.classList.contains('active')) {
        document.getElementById('appSearch').value = '';
        loadLaunchApps();
    }
}

document.getElementById('launchMenu').addEventListener('click', (e) => {
    if (e.target.id === 'launchMenu') {
        toggleLaunchMenu();
    }
});

document.getElementById('appSearch').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const appElements = document.querySelectorAll('.launch-app');
    appElements.forEach(appEl => {
        const name = appEl.dataset.appName;
        appEl.style.display = name.includes(search) ? 'flex' : 'none';
    });
});

function openApp(appId) {
    let win = document.getElementById(appId + 'Window');
    if (!win) {
        win = createWindow(appId);
    }
    win.classList.add('active');
    win.classList.remove('minimized');
    document.getElementById('launchMenu').classList.remove('active');
    
    const app = findApp(appId);
    if (app) {
    }
    
    if (appId === 'appStore') {
        loadAppStore();
    }

    loadDock();
    win.classList.add('fullscreen');
    updateDockVisibility();

    requestAnimationFrame(() => bounceDockIcon(appId));
}

function createWindow(appId) {
    const app = findApp(appId);
    if (!app) {
        console.error('App not found:', appId);
        return null;
    }
    
    const win = document.createElement('div');
    win.id = appId + 'Window';
    win.className = 'window';
    win.style.top = '100px';
    win.style.left = '100px';
    win.style.width = '900px';
    win.style.height = '700px';
    
    win.innerHTML = `
        <div class="window-titlebar" onmousedown="startDrag(event, '${appId}Window')">
            <div class="window-controls" onmousedown="event.stopPropagation()">
                <div class="window-control close" onclick="event.stopPropagation(); closeWindow('${appId}Window')">
                    <svg viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </div>
                <div class="window-control minimize" onclick="event.stopPropagation(); minimizeWindow('${appId}Window')">
                    <svg viewBox="0 0 12 12"><path d="M2 6h8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </div>
                <div class="window-control fullscreen" onclick="event.stopPropagation(); toggleFullscreen('${appId}Window')">
                    <svg viewBox="0 0 12 12"><path d="M2 2h8v8H2z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </div>
            </div>
            <div class="window-title">${app.name}</div>
            <div style="width: 58px;"></div>
        </div>
        <div class="window-content">
            ${getWindowContent(appId)}
        </div>
    `;
    
    document.body.appendChild(win);
    return win;
}

function getWindowContent(appId) {
    const app = findApp(appId);
    
    if (app && app.externalUrl) {
        const url = app.externalUrl.startsWith('http')
            ? app.externalUrl
            : app.externalUrl;
        return `<iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>`;
    }
    
    if (appId === 'appStore') {
        return '<div class="loading"><h3>Loading App Store...</h3></div>';
    } else if (appId === 'settings') {
        return `
            <div class="settings-content">
                <div class="settings-section">
                    <h2>System Settings</h2>
                    <div class="settings-option">
                        <h3>Appearance</h3>
                        <p>Customize the look and feel of your desktop environment</p>
                    </div>
                    <div class="settings-option">
                        <h3>Privacy & Security</h3>
                        <p>Manage your privacy settings and security preferences</p>
                    </div>
                    <div class="settings-option">
                        <h3>Applications</h3>
                        <p>View and manage installed applications</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        const cachedHtml = localStorage.getItem(`app_cache_${appId}`);
        if (cachedHtml) {
            return `<iframe srcdoc="${cachedHtml.replace(/"/g, '&quot;')}" style="width: 100%; height: 100%; border: none;"></iframe>`;
        }
        return '<div class="loading"><h3>App content not found</h3></div>';
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.classList.add('closing');
    setTimeout(() => {
        win.remove();
        loadDock();
        updateDockVisibility();
    }, 200);
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.classList.add('minimizing');
    setTimeout(() => {
        win.classList.remove('minimizing', 'active', 'fullscreen');
        win.classList.add('minimized');
        loadDock();
        updateDockVisibility();
    }, 220);
}

function restoreWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.remove('minimized');
        win.classList.add('active');
        win.classList.add('fullscreen');
        const app = findApp(id.replace('Window', ''));
        if (app) {
        }
    }
    loadDock(); 
    updateDockVisibility();
}

function toggleFullscreen(id) {
    const win = document.getElementById(id);
    if (win) {
        const isFullscreen = win.classList.contains('fullscreen');
        
        if (isFullscreen) {
            win.classList.remove('fullscreen');
            win.style.width = '900px';
            win.style.height = '700px';
            win.style.top = '100px';
            win.style.left = '100px';
        } else {
            win.classList.add('fullscreen');
            const app = findApp(id.replace('Window', ''));
            if (app) {
            }
        }
    }
    updateDockVisibility();
}

let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let wasFullscreen = false;
const SNAP_THRESHOLD = 50;

function startDrag(e, windowId) {
    if (e.target.closest('.window-controls') || e.target.closest('.window-control')) {
        return;
    }
    
    const win = document.getElementById(windowId);
    
    if (win.classList.contains('fullscreen')) {
        wasFullscreen = true;
        win.classList.remove('fullscreen');
        
        const width = 900;
        const height = 700;
        offsetX = width / 2;
        offsetY = 24;
        
        win.style.width = width + 'px';
        win.style.height = height + 'px';
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    } else {
        wasFullscreen = false;
        const rect = win.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    }
    
    draggedWindow = win;
    isDragging = true;
}

document.addEventListener('mousemove', (e) => {
    if (draggedWindow && isDragging) {
        const newTop = e.clientY - offsetY;
        const newLeft = e.clientX - offsetX;
        
        draggedWindow.style.left = newLeft + 'px';
        draggedWindow.style.top = newTop + 'px';
        
        if (e.clientY <= SNAP_THRESHOLD) {
            draggedWindow.classList.add('snap-ready');
        } else {
            draggedWindow.classList.remove('snap-ready');
        }
    }
});

document.addEventListener('mouseup', (e) => {
    if (draggedWindow && isDragging) {
        if (e.clientY <= SNAP_THRESHOLD) {
            draggedWindow.classList.add('fullscreen');
            draggedWindow.classList.remove('snap-ready');
            updateDockVisibility();
        }
        isDragging = false;
        wasFullscreen = false;
        draggedWindow = null;
    }
});

window.getAllApps = getAllApps;
window.findApp = findApp;
window.installApp = installApp;
window.uninstallApp = uninstallApp;
window.openApp = openApp;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;
window.restoreWindow = restoreWindow;
window.pinApp = pinApp;
window.unpinApp = unpinApp;
const weatherCodeMap = {
    0:  { icon: 'fa-sun',                 color: '#f6d365', desc: 'Clear' },
    1:  { icon: 'fa-cloud-sun',           color: '#f6d365', desc: 'Mainly Clear' },
    2:  { icon: 'fa-cloud-sun',           color: '#d4d4d8', desc: 'Partly Cloudy' },
    3:  { icon: 'fa-cloud',               color: '#9ca3af', desc: 'Overcast' },
    45: { icon: 'fa-smog',                color: '#9ca3af', desc: 'Fog' },
    48: { icon: 'fa-smog',                color: '#9ca3af', desc: 'Fog' },
    51: { icon: 'fa-cloud-rain',          color: '#3b82f6', desc: 'Light Drizzle' },
    53: { icon: 'fa-cloud-rain',          color: '#2563eb', desc: 'Moderate Drizzle' },
    55: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Dense Drizzle' },
    61: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Slight Rain' },
    63: { icon: 'fa-cloud-showers-heavy', color: '#1d4ed8', desc: 'Moderate Rain' },
    65: { icon: 'fa-cloud-showers-heavy', color: '#1e3a8a', desc: 'Heavy Rain' },
    71: { icon: 'fa-snowflake',           color: '#e0f2fe', desc: 'Slight Snow' },
    73: { icon: 'fa-snowflake',           color: '#bae6fd', desc: 'Moderate Snow' },
    75: { icon: 'fa-snowflake',           color: '#7dd3fc', desc: 'Heavy Snow' },
    77: { icon: 'fa-snowflake',           color: '#38bdf8', desc: 'Snow Grains' },
    80: { icon: 'fa-cloud-showers-heavy', color: '#3b82f6', desc: 'Rain Showers' },
    81: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Rain Showers' },
    82: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Heavy Showers' },
    85: { icon: 'fa-snowflake',           color: '#3b82f6', desc: 'Snow Showers' },
    86: { icon: 'fa-snowflake',           color: '#2563eb', desc: 'Heavy Snow Showers' },
    95: { icon: 'fa-cloud-bolt',          color: '#facc15', desc: 'Thunderstorm' },
    96: { icon: 'fa-cloud-bolt',          color: '#eab308', desc: 'Thunderstorm + Hail' },
    99: { icon: 'fa-cloud-bolt',          color: '#ca8a04', desc: 'Thunderstorm + Hail' },
};

function degToCompass(deg) {
    const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return dirs[Math.floor((deg / 22.5) + 0.5) % 16];
}

async function fetchAndRenderWeather() {
    const lat = localStorage.getItem('weatherLat');
    const lon = localStorage.getItem('weatherLon');
    if (!lat || !lon) return;

    const pill = document.getElementById('weatherContent');
    if (!pill) return;

    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`
        );
        const data = await res.json();
        const w = data.current_weather;
        if (!w) throw new Error('no data');

        const map = weatherCodeMap[w.weathercode] || { icon: 'fa-cloud', color: '#fff', desc: 'Unknown' };
        const temp = Math.round(w.temperature);
        const wind = Math.round(w.windspeed);
        const dir  = degToCompass(w.winddirection);

        pill.innerHTML = `
            <i class="fas ${map.icon} w-icon" style="color:${map.color}"></i>
            <span class="w-temp">${temp}&deg;F</span>
            <div class="top-bar-divider"></div>
            <span class="w-desc">${map.desc}</span>
            <div class="top-bar-divider"></div>
            <span class="w-wind"><i class="fas fa-wind" style="font-size:10px"></i> ${wind} mph ${dir}</span>
        `;
    } catch {
        document.getElementById('weatherContent').innerHTML =
            '<i class="fas fa-triangle-exclamation"></i> Weather unavailable';
    }
}

let weatherInterval = null;

function startWeatherInterval() {
    if (weatherInterval) return;
    weatherInterval = setInterval(fetchAndRenderWeather, 10 * 60 * 1000);
}

function handleWeatherClick() {
    if (localStorage.getItem('weatherEnabled') === 'true') {
        fetchAndRenderWeather();
        return;
    }

    if (!navigator.geolocation) {
        document.getElementById('weatherContent').textContent = 'Geolocation not supported';
        return;
    }

    document.getElementById('weatherContent').innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Getting location...';

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            localStorage.setItem('weatherEnabled', 'true');
            localStorage.setItem('weatherLat', pos.coords.latitude);
            localStorage.setItem('weatherLon', pos.coords.longitude);
            await fetchAndRenderWeather();
            startWeatherInterval();
        },
        () => {
            document.getElementById('weatherContent').innerHTML =
                '<i class="fas fa-location-dot"></i> Location denied — click to retry';
        }
    );
}
if (localStorage.getItem('weatherEnabled') === 'true') {
    fetchAndRenderWeather();
    startWeatherInterval();
}