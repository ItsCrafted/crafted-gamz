(function () {
  function setStat(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = UserStats.formatCount(value);
  }

  async function init() {
    if (typeof UserStats === 'undefined') return;

    try {
      // Check for cCloud session
      const sessionStr = localStorage.getItem('ccloud_session');
      if (!sessionStr) return;

      const session = JSON.parse(sessionStr);
      if (!session || !session.user) return;

      // Get cCloud client from accountManager
      let ccloud = null;
      if (window.accountManager && window.accountManager.ccloud) {
        ccloud = window.accountManager.ccloud;
      } else if (window.parent && window.parent.accountManager && window.parent.accountManager.ccloud) {
        ccloud = window.parent.accountManager.ccloud;
      }

      if (!ccloud) return;

      // Bind cCloud client to UserStats and start subscriptions
      UserStats.bindCCloud(ccloud);

      UserStats.subscribeUserCounts((counts) => {
        setStat('stat-alltime', counts.allTime);
        setStat('stat-today', counts.today);
        setStat('stat-month', counts.month);
      });

      UserStats.subscribeOnlineCount((online) => {
        setStat('stat-online', online);
      });
    } catch (e) {
      console.warn('[AboutStats]', e);
    }
  }

  init();
})();
