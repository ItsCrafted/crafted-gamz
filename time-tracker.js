


(function() {
  
  if (window.CG_TIME_TRACKER_INITIALIZED) {
    return;
  }
  window.CG_TIME_TRACKER_INITIALIZED = true;

  
  window.CG_MAX_SECONDS = 7 * 3600; 

  let trackingInterval = null;

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function initTimeTracking() {
    
    const lastUpdateDay = localStorage.getItem('cg_last_day');
    const today = getTodayKey();
    
    if (lastUpdateDay !== today) {
      localStorage.setItem('cg_time_seconds', '0');
      localStorage.setItem('cg_last_day', today);
    }

    
    trackingInterval = setInterval(() => {
      let currentTime = parseInt(localStorage.getItem('cg_time_seconds') || '0', 10);
      
      
      if (currentTime < window.CG_MAX_SECONDS) {
        currentTime++;
        localStorage.setItem('cg_time_seconds', currentTime.toString());
      }
    }, 1000); 

    
    window.addEventListener('beforeunload', () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    });
  }

  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeTracking);
  } else {
    initTimeTracking();
  }
})();