
function todayKey() { return new Date().toISOString().slice(0, 10); }
function monthKey() { return new Date().toISOString().slice(0, 7);  }

function fmtNum(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1)     + 'K';
    return String(n);
}

function waitForDB(maxWaitMs = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const check = () => {
            if (window.accountManager && window.accountManager.db) {
                resolve(window.accountManager.db);
            } else if (Date.now() - start > maxWaitMs) {
                reject(new Error('Timed out waiting for Firestore'));
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}

async function recordVisit(db) {
    const today = todayKey();
    const month = monthKey();
    const inc   = firebase.firestore.FieldValue.increment(1);

    try {
        await Promise.all([
            db.collection('stats').doc('daily_' + today).set({ count: inc, date:  today }, { merge: true }),
            db.collection('stats').doc('monthly_' + month).set({ count: inc, month: month }, { merge: true }),
            db.collection('stats').doc('total').set({ count: inc }, { merge: true })
        ]);
        console.log('[Stats] Visit recorded.');
    } catch (err) {
        console.error('[Stats] Failed to record visit:', err.code, err.message);
    }
}

async function loadStats(db) {
    try {
        const [dailySnap, monthlySnap, totalSnap] = await Promise.all([
            db.collection('stats').doc('daily_'   + todayKey()).get(),
            db.collection('stats').doc('monthly_' + monthKey()).get(),
            db.collection('stats').doc('total').get()
        ]);

        document.getElementById('stat-today').textContent = fmtNum(dailySnap.exists   ? dailySnap.data().count   : 0);
        document.getElementById('stat-month').textContent = fmtNum(monthlySnap.exists ? monthlySnap.data().count : 0);
        document.getElementById('stat-total').textContent = fmtNum(totalSnap.exists   ? totalSnap.data().count   : 0);
    } catch (err) {
        console.error('[Stats] Failed to load stats:', err.code, err.message);
    }
}

function initAuthWidget() {
    const pollAuth = () => {
        if (window.accountManager && window.accountManager.auth) {
            window.accountManager.auth.onAuthStateChanged(renderAuthWidget);
        } else {
            setTimeout(pollAuth, 150);
        }
    };
    pollAuth();
}

function renderAuthWidget(user) {
    const btn = document.getElementById('authBtn');
    if (!btn) return;

    if (user) {
        const name    = user.displayName || user.email?.split('@')[0] || 'User';
        const initial = name.charAt(0).toUpperCase();
        const photo   = user.photoURL;

        btn.innerHTML = `
            <div class="auth-avatar" title="${name}">
                ${photo
                    ? `<img src="${photo}" alt="${name}" class="auth-avatar-img">`
                    : `<span class="auth-avatar-initial">${initial}</span>`}
            </div>
            <span class="auth-name">${name}</span>
            <button class="auth-signout-btn" onclick="topBarSignOut(event)" title="Sign out">
                <svg viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            </button>
        `;
        btn.classList.add('logged-in');
        btn.onclick = null;
    } else {
        btn.innerHTML = `
            <svg class="auth-icon" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            <span>Sign In</span>
        `;
        btn.classList.remove('logged-in');
        btn.onclick = () => window.accountManager?.showAuthPrompt?.();
    }
}

window.topBarSignOut = function(e) {
    e?.stopPropagation();
    window.accountManager?.signOut?.();
};

window.addEventListener('load', () => {
    setTimeout(async () => {
        try {
            const db = await waitForDB();
            await recordVisit(db);
            await loadStats(db);
        } catch (err) {
            console.warn('[Stats] Boot failed:', err);
        }
    }, 1000);

    initAuthWidget();
});