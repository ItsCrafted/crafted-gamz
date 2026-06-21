(function (global) {
  const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
  const STATS_DOC = 'userCounts';
  const HEARTBEAT_MS = 60000;
  const ONLINE_WINDOW_MS = 300000;
  const DB_SCRIPT = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js';

  let rtdb = null;
  let presenceUid = null;
  let heartbeatId = null;
  let visHandler = null;
  let authBound = false;

  function todayUTC() {
    return new Date().toISOString().slice(0, 10);
  }

  function monthUTC() {
    return new Date().toISOString().slice(0, 7);
  }

  function formatCount(n) {
    if (n == null || Number.isNaN(n)) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 10000) return Math.round(n / 1000) + 'K';
    return String(n);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load: ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensureRtdb(firebase) {
    if (rtdb) return rtdb;
    if (typeof firebase.database === 'undefined') await loadScript(DB_SCRIPT);
    if (!firebase.apps.length) {
      const res = await fetch(FIREBASE_CONFIG_URL, {
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
      });
      firebase.initializeApp(await res.json());
    }
    rtdb = firebase.database();
    return rtdb;
  }

  async function recordNewUser(db) {
    if (!db) return;
    const ref = db.collection('stats').doc(STATS_DOC);
    const todayDate = todayUTC();
    const monthKey = monthUTC();

    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.exists ? snap.data() : {};

      tx.set(ref, {
        allTime: (data.allTime || 0) + 1,
        today: data.todayDate === todayDate ? (data.today || 0) + 1 : 1,
        todayDate,
        month: data.monthKey === monthKey ? (data.month || 0) + 1 : 1,
        monthKey,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });
  }

  function currentPage() {
    try {
      return (location.pathname + location.search).slice(0, 500);
    } catch {
      return '/';
    }
  }

  async function startPresence(firebase, uid) {
    if (!uid || presenceUid === uid) return;
    stopPresence();

    const db = await ensureRtdb(firebase);
    presenceUid = uid;
    const ref = db.ref('onlineUsers/' + uid);

    const ping = () => {
      ref.set({ timestamp: Date.now(), page: currentPage() }).catch(() => {});
    };

    ping();
    heartbeatId = setInterval(ping, HEARTBEAT_MS);

    visHandler = () => {
      if (!document.hidden) ping();
    };
    document.addEventListener('visibilitychange', visHandler);
  }

  function stopPresence() {
    if (heartbeatId) {
      clearInterval(heartbeatId);
      heartbeatId = null;
    }
    if (visHandler) {
      document.removeEventListener('visibilitychange', visHandler);
      visHandler = null;
    }
    presenceUid = null;
  }

  function bindAuth(firebase, auth) {
    if (authBound) return;
    authBound = true;
    auth.onAuthStateChanged((user) => {
      if (user) startPresence(firebase, user.uid);
      else stopPresence();
    });
  }

  function subscribeUserCounts(db, onUpdate) {
    return db.collection('stats').doc(STATS_DOC).onSnapshot(
      (snap) => {
        const data = snap.exists ? snap.data() : {};
        onUpdate({
          allTime: data.allTime || 0,
          today: data.todayDate === todayUTC() ? (data.today || 0) : 0,
          month: data.monthKey === monthUTC() ? (data.month || 0) : 0
        });
      },
      () => onUpdate({ allTime: 0, today: 0, month: 0 })
    );
  }

  function countOnlineUsers(snap) {
    const now = Date.now();
    let count = 0;
    snap.forEach((child) => {
      const val = child.val();
      if (val && typeof val.timestamp === 'number' && val.timestamp >= now - ONLINE_WINDOW_MS) {
        count++;
      }
    });
    return count;
  }

  function subscribeOnlineCount(firebase, onUpdate) {
    let ref = null;
    let handler = null;

    ensureRtdb(firebase).then((db) => {
      ref = db.ref('onlineUsers');
      handler = (snap) => onUpdate(countOnlineUsers(snap));
      ref.on('value', handler);
    });

    return () => {
      if (ref && handler) ref.off('value', handler);
    };
  }

  global.UserStats = {
    recordNewUser,
    bindAuth,
    startPresence,
    stopPresence,
    subscribeUserCounts,
    subscribeOnlineCount,
    formatCount,
    ensureRtdb
  };
})(window);
