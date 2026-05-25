
window.PlaytimeTracker = (function() {
  const STORAGE_KEY = 'craftedPlaytimeSeconds';
  let seconds = 0;
  let intervalId = null;

  function getPlaytime() {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  }

  function setPlaytime(seconds) {
    localStorage.setItem(STORAGE_KEY, seconds);
  }

  return {
    start() {
      if (intervalId) return; 
      
      seconds = getPlaytime();
      intervalId = setInterval(() => {
        seconds++;
        setPlaytime(seconds);
      }, 1000);
    },
    
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    
    getSeconds() {
      return seconds;
    },
    
    reset() {
      seconds = 0;
      setPlaytime(0);
    }
  };
})();


PlaytimeTracker.start();