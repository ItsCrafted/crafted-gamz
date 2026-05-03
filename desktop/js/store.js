const CDN_BASE = 'all-app-stuff';

let allApps    = [];
let allSections = [];
let currentFilter = 'all';
let currentView   = 'home';
let searchQuery   = '';

async function init() {
    showLoading('loading...');
    try {
        const [appsRes, sectionsRes] = await Promise.all([
            fetch(`${CDN_BASE}/apps.json?v=${Date.now()}`,     { cache: 'no-store' }),
            fetch(`${CDN_BASE}/sections.json?v=${Date.now()}`, { cache: 'no-store' })
        ]);
        if (!appsRes.ok)     throw new Error(`apps.json: HTTP ${appsRes.status}`);
        if (!sectionsRes.ok) throw new Error(`sections.json: HTTP ${sectionsRes.status}`);

        allApps     = await appsRes.json();
        allSections = await sectionsRes.json();

        buildNav();
        showHomePage();
    } catch (err) {
        document.getElementById('appGrid').innerHTML = `
            <div class="state-block">
                <div class="state-comment">error</div>
                <div class="state-title">failed to load</div>
                <div class="error-box">
                    <strong>debug</strong><br>
                    ${err.toString()}<br><br>
                    <button onclick="init()">retry</button>
                </div>
            </div>`;
    }
}

function buildNav() {
    const navItems   = document.getElementById('navItems');
    const filterPills = document.getElementById('filterPills');

    navItems.innerHTML    = `<span class="nav-item active" data-category="all">all</span>`;
    filterPills.innerHTML = `<button class="pill active" data-filter="all">all</button>`;

    allSections.forEach((section, i) => {
        const sep  = document.createElement('span');
        sep.className = 'nav-sep';
        sep.textContent = '/';
        navItems.appendChild(sep);

        const navEl = document.createElement('span');
        navEl.className = 'nav-item';
        navEl.dataset.category = section.id;
        navEl.textContent = section.name.toLowerCase();
        navItems.appendChild(navEl);
        const pillEl = document.createElement('button');
        pillEl.className = 'pill';
        pillEl.dataset.filter = section.id;
        pillEl.textContent = section.name.toLowerCase();
        filterPills.appendChild(pillEl);
    });

    document.querySelectorAll('.nav-item').forEach(el =>
        el.addEventListener('click', () => {
            const cat = el.dataset.category;
            setActiveNav(cat);
            setActivePill(cat);
            cat === 'all' ? showHomePage() : showCategoryPage(cat);
        })
    );

    document.querySelectorAll('.pill').forEach(el =>
        el.addEventListener('click', () => {
            const cat = el.dataset.filter;
            setActivePill(cat);
            setActiveNav(cat);
            cat === 'all' ? showHomePage() : showCategoryPage(cat);
        })
    );
}

function showHomePage() {
    currentView   = 'home';
    currentFilter = 'all';
    searchQuery   = '';
    document.getElementById('searchInput').value    = '';
    document.getElementById('navSearchInput').value = '';
    setActiveNav('all');
    setActivePill('all');
    renderIconCarousel();
    renderApps(allApps);
}

function showCategoryPage(category) {
    currentView   = 'category';
    currentFilter = category;
    searchQuery   = '';
    document.getElementById('searchInput').value    = '';
    document.getElementById('navSearchInput').value = '';
    const filtered = allApps.filter(a =>
        (a.category || '').toLowerCase() === category.toLowerCase()
    );
    renderIconCarousel(filtered);
    renderApps(filtered);
}

function showSearchPage(query) {
    currentView = 'search';
    searchQuery = query.toLowerCase();
    const filtered = allApps.filter(a =>
        a.name.toLowerCase().includes(searchQuery) ||
        (a.desc  || '').toLowerCase().includes(searchQuery) ||
        (a.tags  || []).join(' ').toLowerCase().includes(searchQuery)
    );
    renderIconCarousel(filtered);
    renderApps(filtered);
}

function hideCarousel() {
    const c = document.getElementById('iconCarousel');
    if (c) c.style.display = 'none';
}

function setActiveNav(cat) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.nav-item[data-category="${cat}"]`)?.classList.add('active');
}

function setActivePill(filter) {
    document.querySelectorAll('.pill').forEach(el => el.classList.remove('active'));
    document.querySelector(`.pill[data-filter="${filter}"]`)?.classList.add('active');
}

function showLoading(msg) {
    document.getElementById('appGrid').innerHTML = `
        <div class="state-block">
            <div class="loader"></div>
            <div class="state-comment">please wait</div>
            <div class="state-title">${msg}</div>
        </div>`;
}

function appById(id) {
    return allApps.find(a => a.id === id);
}

function isAppInstalled(id) {
    try {
        if (window.parent?.isAppInstalled) return window.parent.isAppInstalled(id);
    } catch(e) {}
    return false;
}

function iconUrl(app) {
    let url = app.iconUrl || '';
    if (url) url += (url.includes('?') ? '&' : '?') + `v=${Date.now()}`;
    return url;
}

function renderIconCarousel(apps) {
    const carousel = document.getElementById('iconCarousel');
    const track1   = document.getElementById('iconCarouselTrack1');
    const track2   = document.getElementById('iconCarouselTrack2');
    const pool = (apps && apps.length > 0) ? apps : allApps;
    if (!carousel || pool.length === 0) return;
    carousel.style.display = 'flex';
    const PX_PER_ICON = 102;
    const PX_PER_SEC  = 80;

    const makeTrack = (track, items) => {
        track.innerHTML = '';
        const TARGET = 20;
        let fill = [...items];
        while (fill.length < TARGET) fill = fill.concat(items);
        [...fill, ...fill].forEach(app => {
            const img = document.createElement('img');
            img.className = 'carousel-icon';
            img.src = iconUrl(app);
            img.alt = app.name;
            img.onerror = function() { this.style.background = 'rgba(255,255,255,0.06)'; this.src = ''; };
            img.onclick = () => showDetail(app);
            track.appendChild(img);
        });
        const duration = (fill.length * PX_PER_ICON) / PX_PER_SEC;
        track.style.animationDuration = `${duration}s`;
    };

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    makeTrack(track1, shuffle(pool));
    makeTrack(track2, shuffle(pool));
}

function renderApps(apps) {
    const list    = document.getElementById('appGrid');
    const countEl = document.getElementById('filterCount');
    list.innerHTML = '';

    if (countEl) countEl.textContent = `${apps.length} app${apps.length !== 1 ? 's' : ''}`;

    if (apps.length === 0) {
        list.innerHTML = `
            <div class="state-block">
                <div class="state-comment">no results</div>
                <div class="state-title">no applications found</div>
            </div>`;
        return;
    }

    apps.forEach(app => {
        const installed = isAppInstalled(app.id);
        const tags = (app.tags || []).slice(0, 2)
            .map(t => `<span class="app-row-tag">${t}</span>`).join('');

        const row = document.createElement('div');
        row.className = 'app-row';
        row.innerHTML = `
            <img class="app-row-icon" src="${iconUrl(app)}" alt="${app.name}"
                 onerror="this.style.background='rgba(255,255,255,0.06)';this.src='';">
            <div class="app-row-body">
                <div class="app-row-name-wrap">
                    <span class="app-row-name">${app.name}</span>
                    <span class="app-row-cat">${(app.category || 'application').toLowerCase()}</span>
                </div>
                <span class="app-row-desc">${app.desc || ''}</span>
            </div>
            <div class="app-row-action">
                <div class="app-row-tags">${tags}</div>
                <button class="app-row-btn ${installed ? 'installed' : ''}"
                        onclick="event.stopPropagation(); showDetail(appById('${app.id}'))">
                    ${installed ? 'installed' : 'get'}
                </button>
            </div>`;
        row.onclick = () => showDetail(app);
        list.appendChild(row);
    });
}

function showDetail(app) {
    if (!app) return;
    const url = iconUrl(app);

    document.getElementById('detailIcon').src = url;
    document.getElementById('detailIcon').onerror = function() {
        this.style.background = 'rgba(255,255,255,0.06)'; this.src = '';
    };
    document.getElementById('detailCategory').textContent  = (app.category || 'application').toLowerCase();
    document.getElementById('detailTitle').textContent     = app.name;
    document.getElementById('detailDescription').textContent = app.desc || '';
    document.getElementById('detailAbout').textContent     = app.longDesc || app.desc || '';

    const ul = document.getElementById('detailFeatures');
    ul.innerHTML = '';
    (app.features || ['Modern interface','Optimized performance','Regular updates','Secure and reliable'])
        .forEach(f => { const li = document.createElement('li'); li.textContent = f; ul.appendChild(li); });

    const tagGroup = document.getElementById('detailTags');
    tagGroup.innerHTML = '';
    (app.tags || []).forEach(t => {
        const s = document.createElement('span'); s.textContent = t; tagGroup.appendChild(s);
    });

    const installed  = isAppInstalled(app.id);
    const installBtn = document.getElementById('detailInstallBtn');
    const openBtn    = document.getElementById('detailOpenBtn');

    if (installed) {
        installBtn.textContent = 'uninstall';
        installBtn.onclick = () => {
            if (window.parent?.uninstallApp) { window.parent.uninstallApp(app.id); closeDetail(); init(); }
        };
        openBtn.style.display = 'block';
        openBtn.onclick = () => {
            if (window.parent?.openApp) { window.parent.openApp(app.id); closeDetail(); }
        };
    } else {
        installBtn.textContent = 'get';
        installBtn.onclick = () => {
            if (window.parent?.installApp) { window.parent.installApp(app); closeDetail(); }
            else alert('install requires parent window integration.');
        };
        openBtn.style.display = 'none';
    }

    document.getElementById('detailView').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.getElementById('detailView').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('searchInput').addEventListener('input', e => {
    const v = e.target.value;
    document.getElementById('navSearchInput').value = v;
    v.trim() ? showSearchPage(v) : showHomePage();
});

document.getElementById('navSearchInput').addEventListener('input', e => {
    const v = e.target.value;
    document.getElementById('searchInput').value = v;
    v.trim() ? showSearchPage(v) : showHomePage();
});

document.getElementById('detailView').addEventListener('click', e => {
    if (e.target.id === 'detailView') closeDetail();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
});

init();