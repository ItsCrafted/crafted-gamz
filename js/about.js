(function () {
    'use strict';
    const existing = document.getElementById('about-overlay');
    if (existing) { existing.remove(); return; }
    const DATA = {
        app: {
            name:        'Crafted Gamz',
            version:     '15.0.0 Beta',
            description: 'Play hundreds of games, use proxies, use apps, chat With AI, connect to virtual machines, and watch movies all online for free. Crafted Gamz offers a wide variety of games and tools at your disposal, all for free.',
            logoSrc:     'img/logo.png',
            launched:    '2023',
            status:      'Active', 
        },
        dev: {
            name:     'Crafted',
            role:     'Lead Developer & Designer',
            avatar:   'C',
            avatarImg: 'img/dev/crafted.png',
            note:   'Owner and Main Dev.',
            links: [
                { label: 'GitHub',   url: 'https://github.com/ItsCrafted',  icon: 'fa-brands fa-github'},
                { label: 'Bio',  url: 'https://crafted.pages.dev',           icon: 'fa-solid fa-globe'},
                { label: 'Email', url: 'mailto:crafted@craftedgamz.com', icon: 'fa-solid fa-envelope' },
                { label: 'YouTube',   url: 'https://youtube.com/@Its_Crafted',       icon: 'fa-brands fa-youtube'}
            ],
        },

        contributors: [
            {
                name:   'Flame',
                role:   '2nd In Command',
                avatar: 'F',
                avatarImg: 'img/dev/flame.png',
                note:   'Tester',
            },
            {
                name:   'Mizzery',
                role:   'Random Helpful Friend',
                avatar: 'M',
                avatarImg: 'img/dev/mizzery.png',
                note:   'Ideas and emotional support.',
            }
        ],
        history: [
            {
                version: '15.0.0 Beta',
                date:    'Coming Soon',
                tag:     'current',
            },
        ],
        versions: [
             {
             name:   'Crafted Gamz Lite',
             desc:   'A lighter version of CG optimised for school networks.',
                url:    'https://lite.craftedgamz.com',
                 icon:   'fa-solid fa-feather',
                 badge:  'Lite',
            },
            {
             name:   'Crafted Gamz Version 14',
             desc:   'Crafted Gamz Version 14.',
                url:    'https://cg-v14.craftedgamz.workers.dev',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 13',
             desc:   'Crafted Gamz Version 13.',
                url:    'https://old-cg-v13.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 12',
             desc:   'Crafted Gamz Version 12.',
                url:    'https://old-cg-v12.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 10',
             desc:   'Crafted Gamz Version 10.',
                url:    'https://old-cg-v10.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 9',
             desc:   'Crafted Gamz Version 9.',
                url:    'https://old-cg-v9.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 8',
             desc:   'Crafted Gamz Version 8.',
                url:    'https://old-cg-v8.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 7',
             desc:   'Crafted Gamz Version 7.',
                url:    'https://old-cg-v7.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 6',
             desc:   'Crafted Gamz Version 6.',
                url:    'https://old-cg-v6.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 5',
             desc:   'Crafted Gamz Version 5.',
                url:    'https://old-cg-v5.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 4',
             desc:   'Crafted Gamz Version 4.',
                url:    'https://old-cg-v4.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 3',
             desc:   'Crafted Gamz Version 3.',
                url:    'https://old-cg-v3.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            },
            {
             name:   'Crafted Gamz Version 2',
             desc:   'Crafted Gamz Version 2.',
                url:    'https://old-cg-v2.netlify.app',
                 icon:   'fa-solid fa-feather',
                 badge:  'Legacy',
            }
            
        ],
        links: [
            { label: 'Discord',    url: 'coming soon',       icon: 'fa-brands fa-discord'  },
            { label: 'Source',     url: 'https://github.com/ItsCrafted/crafted-gamz',       icon: 'fa-brands fa-github'   },
            { label: 'Report Bug', url: 'mailto:crafted@craftedgamz.com',       icon: 'fa-solid fa-bug'       },
        ],
    };
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ab-fade-in  { from { opacity:0; } to { opacity:1; } }
        @keyframes ab-slide-in { from { opacity:0; transform:translateY(-16px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes ab-fade-out { from { opacity:1; } to { opacity:0; } }

        #about-overlay {
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            animation: ab-fade-in 0.28s ease-out;
            padding: 20px;
        }

        .ab-panel {
            background: linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.012));
            border: 1px solid rgba(255,255,255,0.11);
            border-radius: 26px;
            width: 540px;
            max-width: 100%;
            max-height: calc(100vh - 40px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            color: white;
            backdrop-filter: blur(44px) saturate(200%) brightness(1.08);
            -webkit-backdrop-filter: blur(44px) saturate(200%) brightness(1.08);
            box-shadow: 0 28px 70px rgba(0,0,0,0.6), inset 0 0 0.5px rgba(255,255,255,0.16);
            animation: ab-slide-in 0.28s cubic-bezier(0.22,1,0.36,1);
            position: relative;
        }
        .ab-panel::before {
            content: '';
            position: absolute; inset: 0;
            background: radial-gradient(ellipse at 65% 25%, rgba(255,255,255,0.07), transparent 65%);
            mix-blend-mode: soft-light;
            pointer-events: none;
            border-radius: inherit;
        }

        /* Tab bar */
        .ab-tabs {
            display: flex;
            align-items: center;
            gap: 2px;
            padding: 10px 44px 0 12px;
            flex-shrink: 0;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            overflow: hidden;
        }
        .ab-tab {
            padding: 7px 10px 9px;
            border: none;
            background: transparent;
            color: rgba(255,255,255,0.42);
            font-family: 'Lexend', sans-serif;
            font-size: 10.5px; font-weight: 700;
            letter-spacing: 0.2px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.18s;
            white-space: nowrap;
            display: flex; align-items: center; gap: 5px;
            margin-bottom: -1px;
        }
        .ab-tab i { font-size: 10px; }
        .ab-tab:hover { color: rgba(255,255,255,0.75); }
        .ab-tab.active {
            color: rgba(255,255,255,0.95);
            border-bottom-color: rgba(255,255,255,0.7);
        }

        /* Close button */
        .ab-close {
            position: absolute; top: 12px; right: 12px;
            width: 28px; height: 28px; border-radius: 50%;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.11);
            color: rgba(255,255,255,0.7);
            font-size: 12px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.18s;
            z-index: 10;
            flex-shrink: 0;
        }
        .ab-close:hover { background: rgba(255,255,255,0.13); }

        /* Scroll body */
        .ab-body {
            overflow-y: auto;
            padding: 24px 22px 28px;
            flex: 1;
            display: flex; flex-direction: column; gap: 18px;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.12) transparent;
        }
        .ab-body::-webkit-scrollbar { width: 4px; }
        .ab-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }

        /* Panes */
        .ab-pane { display: none; flex-direction: column; gap: 18px; }
        .ab-pane.active { display: flex; }

        /* Section heading */
        .ab-sh {
            font-size: 9.5px; font-weight: 700;
            letter-spacing: 0.8px; text-transform: uppercase;
            color: rgba(255,255,255,0.32);
            padding: 0 2px;
        }

        /* Card */
        .ab-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            overflow: hidden;
        }

        /* App hero */
        .ab-hero {
            display: flex; align-items: center; gap: 16px;
            padding: 18px;
        }
        .ab-hero-logo {
            width: 58px; height: 58px; border-radius: 16px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; flex-shrink: 0;
        }
        .ab-hero-logo img { width: 44px; height: 44px; object-fit: contain; }
        .ab-hero-logo i   { font-size: 24px; color: rgba(255,255,255,0.55); }
        .ab-hero-name  { font-size: 17px; font-weight: 700; color: rgba(255,255,255,0.95); margin-bottom: 3px; }
        .ab-hero-ver   { font-size: 11px; color: rgba(255,255,255,0.38); margin-bottom: 6px; }
        .ab-status-badge {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 3px 10px;
            background: rgba(40,167,69,0.18);
            border: 1px solid rgba(40,167,69,0.3);
            border-radius: 20px;
            font-size: 10px; font-weight: 600; color: #5dca75;
        }
        .ab-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #28a745; }

        /* Row inside card */
        .ab-row {
            display: flex; align-items: flex-start;
            justify-content: space-between;
            padding: 11px 16px;
            border-top: 1px solid rgba(255,255,255,0.05);
            gap: 10px;
        }
        .ab-row-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.38); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .ab-row-val   { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.82); line-height: 1.5; }

        /* Person card */
        .ab-person {
            display: flex; align-items: flex-start; gap: 14px;
            padding: 14px 16px;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ab-person:first-child { border-top: none; }
        .ab-avatar {
            width: 42px; height: 42px; border-radius: 50%;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.78);
            flex-shrink: 0; overflow: hidden;
        }
        .ab-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .ab-person-name { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.92); margin-bottom: 2px; }
        .ab-person-role { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 6px; }
        .ab-person-note { font-size: 12px; color: rgba(255,255,255,0.58); line-height: 1.55; }

        /* Dev links */
        .ab-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        .ab-link {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 5px 12px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px;
            color: rgba(255,255,255,0.72);
            font-family: 'Lexend', sans-serif;
            font-size: 11px; font-weight: 600;
            text-decoration: none;
            transition: all 0.18s;
            cursor: pointer;
        }
        .ab-link:hover { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.95); }
        .ab-link i { font-size: 11px; }

        /* Version history entry */
        .ab-ver-entry {
            padding: 14px 16px;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ab-ver-entry:first-child { border-top: none; }
        .ab-ver-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ab-ver-num  { font-size: 13.5px; font-weight: 700; color: rgba(255,255,255,0.92); }
        .ab-ver-date { font-size: 11px; color: rgba(255,255,255,0.35); margin-left: auto; }
        .ab-ver-tag  {
            font-size: 9.5px; font-weight: 700; letter-spacing: 0.5px;
            padding: 2px 8px; border-radius: 10px;
            text-transform: uppercase;
        }
        .ab-ver-tag.current { background: rgba(40,167,69,0.2);  border: 1px solid rgba(40,167,69,0.35);  color: #5dca75; }
        .ab-ver-tag.stable  { background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.35); color: #7eb8ff; }
        .ab-ver-tag.legacy  { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.45); }
        .ab-ver-changes { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 5px; }
        .ab-ver-changes li {
            font-size: 12px; color: rgba(255,255,255,0.6);
            padding-left: 14px; position: relative; line-height: 1.5;
        }
        .ab-ver-changes li::before {
            content: '–';
            position: absolute; left: 0;
            color: rgba(255,255,255,0.25);
        }

        /* Other versions tile */
        .ab-version-tile {
            display: flex; align-items: center; gap: 14px;
            padding: 13px 16px;
            border-top: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            text-decoration: none;
            transition: background 0.18s;
        }
        .ab-version-tile:first-child { border-top: none; }
        .ab-version-tile:hover { background: rgba(255,255,255,0.04); }
        .ab-version-icon {
            width: 36px; height: 36px; border-radius: 10px;
            background: rgba(255,255,255,0.07);
            display: flex; align-items: center; justify-content: center;
            font-size: 15px; color: rgba(255,255,255,0.65); flex-shrink: 0;
        }
        .ab-version-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.88); margin-bottom: 2px; }
        .ab-version-desc { font-size: 11px; color: rgba(255,255,255,0.38); }
        .ab-version-badge {
            margin-left: auto;
            font-size: 9.5px; font-weight: 700; letter-spacing: 0.4px;
            padding: 3px 9px; border-radius: 10px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.13);
            color: rgba(255,255,255,0.5);
            text-transform: uppercase; flex-shrink: 0;
        }

        /* Footer misc links */
        .ab-footer-links { display: flex; flex-wrap: wrap; gap: 8px; }

        /* Empty state */
        .ab-empty {
            text-align: center;
            padding: 24px 10px;
            font-size: 12px;
            color: rgba(255,255,255,0.25);
        }
    `;
    document.head.appendChild(style);

    function el(tag, cls, html) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html !== undefined) e.innerHTML = html;
        return e;
    }
    function card(...children) {
        const c = el('div', 'ab-card');
        children.forEach(ch => c.appendChild(ch));
        return c;
    }
    function sh(text) { return el('div', 'ab-sh', text); }
    function row(label, value) {
        const r = el('div', 'ab-row');
        const info = el('div');
        info.appendChild(el('div', 'ab-row-label', label));
        info.appendChild(el('div', 'ab-row-val', value || '<span style="opacity:.3">—</span>'));
        r.appendChild(info);
        return r;
    }
    function avatar(data) {
        const av = el('div', 'ab-avatar');
        if (data.avatarImg) {
            const img = document.createElement('img');
            img.src = data.avatarImg;
            img.onerror = () => { img.remove(); av.textContent = data.avatar || '?'; };
            av.appendChild(img);
        } else {
            av.textContent = data.avatar || '?';
        }
        return av;
    }

    function closeOverlay() {
        overlay.style.animation = 'ab-fade-out 0.2s ease-out forwards';
        overlay.addEventListener('animationend', () => {
            overlay.remove(); style.remove();
        }, { once: true });
    }

    function switchTab(id) {
        panel.querySelectorAll('.ab-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
        body.querySelectorAll('.ab-pane').forEach(p => p.classList.toggle('active', p.dataset.pane === id));
    }

    const overlay = document.createElement('div');
    overlay.id = 'about-overlay';

    const panel = el('div', 'ab-panel');

    const closeBtn = el('button', 'ab-close', '<i class="fa-solid fa-xmark"></i>');
    closeBtn.onclick = closeOverlay;
    panel.appendChild(closeBtn);

    const tabs = el('div', 'ab-tabs');
    const TAB_DEFS = [
        { id: 'app',          icon: 'fa-solid fa-circle-info',      label: 'App'          },
        { id: 'dev',          icon: 'fa-solid fa-user',              label: 'Developer'    },
        { id: 'contributors', icon: 'fa-solid fa-people-group',      label: 'Credits'      },
        { id: 'history',      icon: 'fa-solid fa-clock-rotate-left', label: 'History'      },
        { id: 'versions',     icon: 'fa-solid fa-layer-group',       label: 'Versions'     },
    ];
    TAB_DEFS.forEach(({ id, icon, label }, i) => {
        const btn = el('button', 'ab-tab' + (i === 0 ? ' active' : ''));
        btn.dataset.tab = id;
        btn.innerHTML = `<i class="${icon}"></i>${label}`;
        btn.onclick = () => switchTab(id);
        tabs.appendChild(btn);
    });
    panel.appendChild(tabs);

    const body = el('div', 'ab-body');
    panel.appendChild(body);
    const appPane = el('div', 'ab-pane active');
    appPane.dataset.pane = 'app';

    const heroCard = el('div', 'ab-card');
    const hero = el('div', 'ab-hero');
    const logoWrap = el('div', 'ab-hero-logo');
    if (DATA.app.logoSrc) {
        const img = document.createElement('img');
        img.src = DATA.app.logoSrc;
        img.onerror = () => { img.remove(); logoWrap.innerHTML = '<i class="fa-solid fa-gamepad"></i>'; };
        logoWrap.appendChild(img);
    } else {
        logoWrap.innerHTML = '<i class="fa-solid fa-gamepad"></i>';
    }
    const heroInfo = el('div');
    heroInfo.innerHTML = `
        <div class="ab-hero-name">${DATA.app.name}</div>
        <div class="ab-hero-ver">${DATA.app.version}</div>
        <span class="ab-status-badge"><span class="ab-status-dot"></span>${DATA.app.status}</span>`;
    hero.appendChild(logoWrap);
    hero.appendChild(heroInfo);
    heroCard.appendChild(hero);
    if (DATA.app.description) heroCard.appendChild(row('About', DATA.app.description));
    if (DATA.app.launched)    heroCard.appendChild(row('Launched', DATA.app.launched));
    appPane.appendChild(heroCard);

    if (DATA.links && DATA.links.length) {
        appPane.appendChild(sh('Links'));
        const lf = el('div', 'ab-footer-links');
        DATA.links.forEach(({ label, url, icon }) => {
            const a = el('a', 'ab-link', `<i class="${icon}"></i>${label}`);
            a.href = url; a.target = '_blank'; a.rel = 'noopener';
            lf.appendChild(a);
        });
        appPane.appendChild(lf);
    }

    body.appendChild(appPane);

    const devPane = el('div', 'ab-pane');
    devPane.dataset.pane = 'dev';

    const devCard = el('div', 'ab-card');
    const devPerson = el('div', 'ab-person');
    devPerson.style.borderTop = 'none';
    devPerson.appendChild(avatar(DATA.dev));
    const devInfo = el('div', '', '');
    devInfo.style.flex = '1';
    devInfo.innerHTML = `
        <div class="ab-person-name">${DATA.dev.name}</div>
        <div class="ab-person-role">${DATA.dev.role}</div>
        <div class="ab-person-note">${DATA.dev.note}</div>`;
    if (DATA.dev.links && DATA.dev.links.length) {
        const lw = el('div', 'ab-links');
        DATA.dev.links.forEach(({ label, url, icon }) => {
            const a = el('a', 'ab-link', `<i class="${icon}"></i>${label}`);
            a.href = url; a.target = '_blank'; a.rel = 'noopener';
            lw.appendChild(a);
        });
        devInfo.appendChild(lw);
    }
    devPerson.appendChild(devInfo);
    devCard.appendChild(devPerson);
    devPane.appendChild(devCard);
    body.appendChild(devPane);

    const contribPane = el('div', 'ab-pane');
    contribPane.dataset.pane = 'contributors';

    if (DATA.contributors && DATA.contributors.length) {
        const cc = el('div', 'ab-card');
        DATA.contributors.forEach(person => {
            const row2 = el('div', 'ab-person');
            row2.appendChild(avatar(person));
            const info = el('div');
            info.style.flex = '1';
            info.innerHTML = `
                <div class="ab-person-name">${person.name}</div>
                <div class="ab-person-role">${person.role}</div>
                <div class="ab-person-note">${person.note || ''}</div>`;
            row2.appendChild(info);
            cc.appendChild(row2);
        });
        contribPane.appendChild(cc);
    } else {
        contribPane.appendChild(el('div', 'ab-empty', 'No contributors listed yet.'));
    }
    body.appendChild(contribPane);

    const historyPane = el('div', 'ab-pane');
    historyPane.dataset.pane = 'history';

    if (DATA.history && DATA.history.length) {
        const hc = el('div', 'ab-card');
        DATA.history.forEach(entry => {
            const ve = el('div', 'ab-ver-entry');
            const vh = el('div', 'ab-ver-header');
            vh.innerHTML = `<span class="ab-ver-num">${entry.version}</span>`;
            if (entry.tag) vh.innerHTML += `<span class="ab-ver-tag ${entry.tag}">${entry.tag}</span>`;
            vh.innerHTML += `<span class="ab-ver-date">${entry.date}</span>`;
            ve.appendChild(vh);
            if (entry.changes && entry.changes.length) {
                const ul = el('ul', 'ab-ver-changes');
                entry.changes.forEach(c => ul.appendChild(el('li', '', c)));
                ve.appendChild(ul);
            }
            hc.appendChild(ve);
        });
        historyPane.appendChild(hc);
    } else {
        historyPane.appendChild(el('div', 'ab-empty', 'No history entries yet.'));
    }
    body.appendChild(historyPane);

    const versionsPane = el('div', 'ab-pane');
    versionsPane.dataset.pane = 'versions';

    if (DATA.versions && DATA.versions.length) {
        const vc = el('div', 'ab-card');
        DATA.versions.forEach(v => {
            const a = el('a', 'ab-version-tile');
            a.href = v.url || '#'; a.target = '_blank'; a.rel = 'noopener';
            a.innerHTML = `
                <div class="ab-version-icon"><i class="${v.icon || 'fa-solid fa-box'}"></i></div>
                <div>
                    <div class="ab-version-name">${v.name}</div>
                    <div class="ab-version-desc">${v.desc || ''}</div>
                </div>
                ${v.badge ? `<span class="ab-version-badge">${v.badge}</span>` : ''}`;
            vc.appendChild(a);
        });
        versionsPane.appendChild(vc);
    } else {
        versionsPane.appendChild(el('div', 'ab-empty', 'No other versions listed yet.'));
    }
    body.appendChild(versionsPane);

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { closeOverlay(); document.removeEventListener('keydown', esc); }
    });

})();