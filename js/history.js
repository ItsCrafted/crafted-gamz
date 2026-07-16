(() => {
  const HISTORY_KEY = 'crafted_gamz_history';
  const MAX_HISTORY_ITEMS = 100;
  const HISTORY_TYPES = {
    GAME: 'game',
    MOVIE: 'movie',
    MUSIC: 'music',
    VM: 'vm',
    SEARCH: 'search',
    PROXY: 'proxy'
  };

  let historyData = {
    items: [],
    lastSync: null
  };

  let ccloud = null;
  let syncEnabled = false;
  let syncTimer = null;

  function initCCloud() {
    // Get cCloud from parent if available
    const ccloudClient = (window.parent && window.parent.accountManager && window.parent.accountManager.ccloud)
      ? window.parent.accountManager.ccloud
      : window.accountManager?.ccloud;

    if (ccloudClient) {
      ccloud = ccloudClient;
      const user = ccloud.getCurrentUser();
      syncEnabled = !!user;
      if (syncEnabled) {
        syncFromCCloud();
        startAutoSync();
      } else {
        stopAutoSync();
      }
    } else {
      console.log('[History] cCloud not available yet');
    }
  }

  function loadHistory() {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      console.log('[History] Loading from localStorage, stored:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        historyData = {
          items: Array.isArray(parsed.items) ? parsed.items : [],
          lastSync: parsed.lastSync || null
        };
        console.log('[History] Loaded history:', historyData);
      } else {
        console.log('[History] No existing history found in localStorage');
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      historyData = { items: [], lastSync: null };
    }
  }

  function saveHistory() {
    try {
      console.log('[History] Saving to localStorage:', historyData);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
      console.log('[History] Saved successfully');
      if (syncEnabled) {
        scheduleSync();
      }
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  function addToHistory(type, item) {
    console.log('[History] addToHistory called:', { type, item });
    const historyItem = {
      id: item.id || generateId(),
      type: type,
      title: item.title || item.name || item.query || 'Unknown',
      subtitle: item.subtitle || item.artist || item.year || item.context || '',
      cover: item.coverUrl || item.poster || item.image || '',
      timestamp: Date.now(),
      metadata: {
        duration: item.duration || null,
        quality: item.quality || null,
        category: item.category || null,
        searchContext: item.searchContext || null
      }
    };

    console.log('[History] Created history item:', historyItem);

    // Remove existing item with same ID to avoid duplicates
    historyData.items = historyData.items.filter(i => i.id !== historyItem.id);

    // Add new item at the beginning
    historyData.items.unshift(historyItem);

    console.log('[History] History items count:', historyData.items.length);

    // Limit history size
    if (historyData.items.length > MAX_HISTORY_ITEMS) {
      historyData.items = historyData.items.slice(0, MAX_HISTORY_ITEMS);
    }

    saveHistory();
    return historyItem;
  }

  function addSearchHistory(query, context = 'general') {
    if (!query || !query.trim()) return;
    
    return addToHistory(HISTORY_TYPES.SEARCH, {
      id: `search_${Date.now()}_${query.slice(0, 20)}`,
      title: query.trim(),
      subtitle: context,
      searchContext: context
    });
  }

  function addProxyHistory(url, title = null) {
    if (!url || !url.trim()) return;
    
    const displayUrl = url.startsWith('https://') || url.startsWith('http://') 
      ? url 
      : `https://${url}`;
    
    return addToHistory(HISTORY_TYPES.PROXY, {
      id: `proxy_${Date.now()}_${url.slice(0, 20)}`,
      title: displayUrl,
      subtitle: title || extractHostname(displayUrl),
      searchContext: 'proxy'
    });
  }

  function extractHostname(url) {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace(/^www\./, '');
    } catch (e) {
      return url;
    }
  }

  function removeFromHistory(itemId) {
    historyData.items = historyData.items.filter(i => i.id !== itemId);
    saveHistory();
  }

  function clearHistory() {
    historyData.items = [];
    saveHistory();
  }

  function getHistory(type = null, limit = null) {
    let items = [...historyData.items];

    if (type) {
      items = items.filter(i => i.type === type);
    }

    if (limit) {
      items = items.slice(0, limit);
    }

    return items;
  }

  function getRecentHistory(type = null, limit = 10) {
    return getHistory(type, limit);
  }

  function getSearchHistory(limit = 20) {
    return getHistory(HISTORY_TYPES.SEARCH, limit);
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }

  function groupHistoryByDate(items) {
    const groups = {};
    
    items.forEach(item => {
      const date = new Date(item.timestamp);
      const dateKey = date.toLocaleDateString();
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(item);
    });

    return groups;
  }

  function generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // cCloud Sync Functions
  function scheduleSync() {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(syncToCCloud, 2000);
  }

  function startAutoSync() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = setInterval(syncToCCloud, 30000);
  }

  function stopAutoSync() {
    if (syncTimer) {
      clearInterval(syncTimer);
      syncTimer = null;
    }
  }

  async function syncToCCloud() {
    if (!syncEnabled || !ccloud) return;

    try {
      const user = ccloud.getCurrentUser();
      if (!user) {
        syncEnabled = false;
        return;
      }

      await ccloud.setData(`users/${user.uid}/history`, {
        items: historyData.items,
        lastSync: Date.now()
      });

      historyData.lastSync = Date.now();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
    } catch (error) {
      console.error('Failed to sync history to cCloud:', error);
    }
  }

  async function syncFromCCloud() {
    if (!syncEnabled || !ccloud) return;

    try {
      const user = ccloud.getCurrentUser();
      if (!user) {
        syncEnabled = false;
        return;
      }

      const data = await ccloud.getData(`users/${user.uid}/history`).catch(() => null);

      if (data && data.items && Array.isArray(data.items)) {
        const remoteTimestamp = data.lastSync || 0;
        const localTimestamp = historyData.lastSync || 0;

        if (remoteTimestamp > localTimestamp) {
          historyData = {
            items: data.items,
            lastSync: remoteTimestamp
          };
          localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
        }
      }
    } catch (error) {
      console.error('Failed to sync history from cCloud:', error);
    }
  }

  window.CraftedHistory = {
    HISTORY_TYPES,
    addToHistory,
    addSearchHistory,
    addProxyHistory,
    removeFromHistory,
    clearHistory,
    getHistory,
    getRecentHistory,
    getSearchHistory,
    formatTimestamp,
    groupHistoryByDate,
    loadHistory,
    saveHistory,
    syncToCCloud,
    syncFromCCloud
  };

  // Initialize
  loadHistory();

  // If running in iframe, use parent's CraftedHistory instead
  if (window.parent && window.parent !== window) {
    console.log('[History] Running in iframe context');
    console.log('[History] Parent has CraftedHistory:', !!window.parent.CraftedHistory);
    if (window.parent.CraftedHistory) {
      console.log('[History] Using parent CraftedHistory');
      window.CraftedHistory = window.parent.CraftedHistory;
      return; // Don't initialize cCloud in iframe context
    } else {
      console.log('[History] Parent CraftedHistory not available, waiting...');
      // Poll for parent CraftedHistory
      let attempts = 0;
      const checkParent = setInterval(() => {
        attempts++;
        if (window.parent.CraftedHistory) {
          console.log('[History] Parent CraftedHistory found after', attempts, 'attempts');
          window.CraftedHistory = window.parent.CraftedHistory;
          clearInterval(checkParent);
        } else if (attempts > 20) {
          console.log('[History] Gave up waiting for parent CraftedHistory');
          clearInterval(checkParent);
        }
      }, 200);
      return;
    }
  }

  console.log('[History] Running in main context, initializing cCloud');

  // Initialize cCloud when available
  function tryInitCCloud() {
    const am = window.accountManager;
    if (am && am.ccloud) {
      initCCloud();
    } else {
      console.log('[History] cCloud not ready, retrying in 500ms...');
      setTimeout(tryInitCCloud, 500);
    }
  }

  // Try to initialize immediately or wait for DOM
  if (window.accountManager?.ccloud) {
    tryInitCCloud();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      tryInitCCloud();
    });
  }
})();
