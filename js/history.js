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

  let firebaseDb = null;
  let firebaseAuth = null;
  let syncEnabled = false;
  let syncTimer = null;

  function initFirebase() {
    // Try to access Firebase from parent window first (for iframe context)
    const targetFirebase = (window.parent && window.parent.firebase && window.parent.firebase.apps.length > 0)
      ? window.parent.firebase
      : firebase;

    if (typeof targetFirebase !== 'undefined' && targetFirebase.firestore && targetFirebase.auth) {
      try {
        // Check if Firebase app is initialized
        if (!targetFirebase.apps.length) {
          console.log('[History] Firebase app not initialized yet, waiting...');
          return;
        }
        firebaseDb = targetFirebase.firestore();
        firebaseAuth = targetFirebase.auth();

        firebaseAuth.onAuthStateChanged(user => {
          syncEnabled = !!user;
          if (syncEnabled) {
            syncFromFirebase();
            startAutoSync();
          } else {
            stopAutoSync();
          }
        });
      } catch (error) {
        console.error('Firebase initialization failed:', error);
      }
    } else {
      console.log('[History] Firebase not available yet');
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

  // Firebase Sync Functions
  function scheduleSync() {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(syncToFirebase, 2000);
  }

  function startAutoSync() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = setInterval(syncToFirebase, 30000);
  }

  function stopAutoSync() {
    if (syncTimer) {
      clearInterval(syncTimer);
      syncTimer = null;
    }
  }

  async function syncToFirebase() {
    if (!syncEnabled || !firebaseAuth.currentUser || !firebaseDb) return;

    try {
      const userId = firebaseAuth.currentUser.uid;
      const historyRef = firebaseDb.collection('users').doc(userId);
      
      await historyRef.set({
        history: {
          items: historyData.items,
          lastSync: Date.now()
        },
        lastSync: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      historyData.lastSync = Date.now();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
    } catch (error) {
      console.error('Failed to sync history to Firebase:', error);
    }
  }

  async function syncFromFirebase() {
    if (!syncEnabled || !firebaseAuth.currentUser || !firebaseDb) return;

    try {
      const userId = firebaseAuth.currentUser.uid;
      const historyRef = firebaseDb.collection('users').doc(userId);
      const doc = await historyRef.get();
      
      if (doc.exists) {
        const data = doc.data();
        const remoteData = data.history;
        
        if (remoteData && remoteData.items && Array.isArray(remoteData.items)) {
          const remoteTimestamp = remoteData.lastSync || 0;
          const localTimestamp = historyData.lastSync || 0;
          
          if (remoteTimestamp > localTimestamp) {
            historyData = {
              items: remoteData.items,
              lastSync: remoteTimestamp
            };
            localStorage.setItem(HISTORY_KEY, JSON.stringify(historyData));
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync history from Firebase:', error);
    }
  }

  // Export functions for use in other modules
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
    syncToFirebase,
    syncFromFirebase
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
      return; // Don't initialize Firebase in iframe context
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

  console.log('[History] Running in main context, initializing Firebase');

  // Initialize Firebase when available
  function tryInitFirebase() {
    const targetFirebase = (window.parent && window.parent.firebase)
      ? window.parent.firebase
      : firebase;

    if (typeof targetFirebase !== 'undefined' && targetFirebase.apps.length > 0) {
      initFirebase();
    } else {
      console.log('[History] Firebase not ready, retrying in 500ms...');
      setTimeout(tryInitFirebase, 500);
    }
  }

  if (typeof firebase !== 'undefined' || (window.parent && window.parent.firebase)) {
    tryInitFirebase();
  } else {
    // Wait for Firebase to load
    document.addEventListener('DOMContentLoaded', () => {
      tryInitFirebase();
    });
  }
})();
