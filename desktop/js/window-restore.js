const WindowRestore = (() => {

    const WRITE_DEBOUNCE_MS = 2500;

    let docRef            = null;
    let writeTimer        = null;
    let lastPersistedJson = null;
    let isRestoring       = false;

    const log  = (...a) => console.debug('[WindowRestore]', ...a);
    const warn = (...a) => console.warn('[WindowRestore]',  ...a);
    const delay = ms => new Promise(r => setTimeout(r, ms));


    function captureState() {
        const windows = Array.from(document.querySelectorAll('.window'));
        const entries = windows.map(win => {
            const appId        = win.id.replace(/Window$/, '');
            const isMinimized  = win.classList.contains('minimized');
            const isFullscreen = win.classList.contains('fullscreen');
            return {
                appId,
                minimized:  isMinimized,
                fullscreen: isFullscreen,
                top:    isFullscreen ? null : (parseInt(win.style.top,    10) || 100),
                left:   isFullscreen ? null : (parseInt(win.style.left,   10) || 100),
                width:  isFullscreen ? null : (parseInt(win.style.width,  10) || 900),
                height: isFullscreen ? null : (parseInt(win.style.height, 10) || 700),
            };
        });
        return { windows: entries, savedAt: Date.now() };
    }


    function scheduleWrite() {
        if (!docRef || isRestoring) return;
        clearTimeout(writeTimer);
        writeTimer = setTimeout(async () => {
            const state = captureState();
            const json  = JSON.stringify(state);
            if (json === lastPersistedJson) return;
            try {
                await docRef.set(state);
                lastPersistedJson = json;
                log('Saved', state.windows.length, 'window(s)');
            } catch (err) {
                warn('Write failed:', err);
            }
        }, WRITE_DEBOUNCE_MS);
    }

    async function flushNow() {
        clearTimeout(writeTimer);
        if (!docRef) return;
        const state = captureState();
        const json  = JSON.stringify(state);
        if (json === lastPersistedJson) return;
        try {
            await docRef.set(state);
            lastPersistedJson = json;
        } catch (err) {
            warn('Flush failed:', err);
        }
    }


    async function restoreState() {
        if (!docRef) return;

        let snapshot;
        try {
            snapshot = await docRef.get();
        } catch (err) {
            warn('Read failed:', err);
            return;
        }

        if (!snapshot.exists) {
            log('No saved state — fresh session');
            return;
        }

        const state = snapshot.data();
        if (!state?.windows?.length) {
            log('Saved state is empty');
            return;
        }

        log('Restoring', state.windows.length, 'window(s)');

        isRestoring = true;

        for (const entry of state.windows) {
            try {
                await restoreOne(entry);
            } catch (err) {
                warn('Could not restore', entry.appId, '—', err.message);
            }
        }

        isRestoring = false;
        lastPersistedJson = JSON.stringify(captureState());

        if (typeof loadDock             === 'function') loadDock();
        if (typeof updateDockVisibility === 'function') updateDockVisibility();
    }

    async function restoreOne({ appId, minimized, fullscreen, top, left, width, height }) {
        if (typeof findApp === 'function' && !findApp(appId)) {
            log('Skipping unknown app:', appId);
            return;
        }

        if (typeof openApp !== 'function') {
            warn('openApp() not available');
            return;
        }

        openApp(appId);

        const win = document.getElementById(appId + 'Window');
        if (!win) return;

        if (!fullscreen && top !== null) {
            win.style.top    = top             + 'px';
            win.style.left   = left            + 'px';
            win.style.width  = (width  || 900) + 'px';
            win.style.height = (height || 700) + 'px';
        }

        if (minimized) {
            if (typeof minimizeWindow === 'function') {
                minimizeWindow(appId + 'Window');
                await delay(260);
            }
        } else if (fullscreen) {
            win.classList.add('fullscreen');
        } else {
            win.classList.remove('fullscreen');
        }
    }

    function patchHostFunctions() {
        const names = [
            'openApp', 'closeWindow', 'minimizeWindow',
            'restoreWindow', 'toggleFullscreen', 'pinApp', 'unpinApp',
        ];
        names.forEach(name => {
            const orig = window[name];
            if (typeof orig !== 'function') return;
            window[name] = function (...args) {
                const result = orig.apply(this, args);
                scheduleWrite();
                return result;
            };
        });
        log('Host functions patched');
    }

    function wireDragListener() {
        document.addEventListener('mouseup', () => setTimeout(scheduleWrite, 60));
    }

    function wireMutationObserver() {
        const observer = new MutationObserver(mutations => {
            if (isRestoring) return;
            const relevant = mutations.some(m => {
                for (const node of [...m.addedNodes, ...m.removedNodes]) {
                    if (node.nodeType === 1 && node.classList?.contains('window')) return true;
                }
                if (m.type === 'attributes' && m.target.classList?.contains('window')) return true;
                return false;
            });
            if (relevant) scheduleWrite();
        });
        observer.observe(document.body, {
            childList: true, subtree: true,
            attributes: true, attributeFilter: ['class', 'style'],
        });
    }

function hookIntoAccountManager() {
        const waitForAM = setInterval(() => {
            const am = window.accountManager;
            if (!am) return;
            if (!am.auth) return;

            clearInterval(waitForAM);
            log('accountManager found — listening for auth state');

            patchHostFunctions();
            wireDragListener();
            wireMutationObserver();

            let firstAuth = true;

            am.auth.onAuthStateChanged(async user => {
                if (!user) {
                    docRef = null;
                    if (!firstAuth) log('Signed out — writes suspended');
                    firstAuth = false;
                    return;
                }

                const newRef = am.db
                    .collection('users')
                    .doc(user.uid)
                    .collection('windowState')
                    .doc('current');

                const isNewUser = !docRef || docRef.path !== newRef.path;
                docRef = newRef;
                firstAuth = false;

                log('Auth ready — user:', user.uid);

                if (isNewUser) {
                    lastPersistedJson = null;
                    await restoreState();
                }

                window.removeEventListener('beforeunload', flushNow);
                window.addEventListener('beforeunload', flushNow);
            });

        }, 100);
    }

    hookIntoAccountManager();

    return {
        flush: flushNow,
        save:  scheduleWrite,
    };

})();