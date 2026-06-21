(function () {
  const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

  function setStat(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = UserStats.formatCount(value);
  }

  async function init() {
    if (typeof UserStats === 'undefined') return;

    try {
      const res = await fetch(FIREBASE_CONFIG_URL, {
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
      });
      const config = await res.json();
      if (!firebase.apps.length) firebase.initializeApp(config);

      const auth = firebase.auth();
      const db = firebase.firestore();

      await new Promise((resolve) => {
        const unsub = auth.onAuthStateChanged(() => {
          unsub();
          resolve();
        });
      });

      if (!auth.currentUser) return;

      UserStats.bindAuth(firebase, auth);

      UserStats.subscribeUserCounts(db, (counts) => {
        setStat('stat-alltime', counts.allTime);
        setStat('stat-today', counts.today);
        setStat('stat-month', counts.month);
      });

      UserStats.subscribeOnlineCount(firebase, (online) => {
        setStat('stat-online', online);
      });
    } catch (e) {
      console.warn('[AboutStats]', e);
    }
  }

  init();
})();
