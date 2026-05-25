(function() {
  'use strict';
  
  console.log('Navigation script loading...');
  
  function createStyles() {
    const existingStyles = document.getElementById('nav-bubble-styles');
    if (existingStyles) existingStyles.remove();
    
    const style = document.createElement('style');
    style.id = 'nav-bubble-styles';
    style.innerHTML = `
      nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  padding: 12px 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 999;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: auto;
  box-sizing: border-box;
  pointer-events: none;
  flex-wrap: wrap;
}

nav .bubble {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 30px;
  padding: 12px 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  pointer-events: auto;
  box-sizing: border-box;
  color: white;
  user-select: none;
  flex-shrink: 0;
  min-height: 50px;
  height: 50px;
  white-space: nowrap;
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid transparent;
}

nav .bubble:hover {
  color: #00ffe5;
  background: rgba(0, 255, 229, 0.1);
  border: 1px solid rgba(0, 255, 229, 0.2);
  box-shadow: 0 2px 10px rgba(0, 255, 229, 0.1);
  backdrop-filter: blur(5px);
  transform: translateY(-1px);
}

nav .time-wrapper {
  min-width: 140px;
  font-weight: bold;
  font-size: 16px;
}

nav .period-timer-wrapper {
  min-width: 200px;
  font-size: 12px;
  color: #96f3f5;
  text-align: center;
}

nav .links {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0;
  margin: 0;
  min-width: 400px;
  position: relative;
  cursor: default;
}

nav .links a {
  display: inline-flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  position: relative;
  transition: all 0.3s ease;
  padding: 8px 12px;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.2;
  border-radius: 20px;
  background: transparent;
  border: 1px solid transparent;
}

nav .links a i {
  color: #96f3f5;
  margin-right: 6px;
  font-size: 14px;
}

nav .links a:hover {
  color: #96f3f5;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(150, 243, 245, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  transform: translateY(-1px);
}

nav .links:hover {
  color: #00ffe5;
  background: rgba(0, 255, 229, 0.1);
  border: 1px solid rgba(0, 255, 229, 0.2);
  box-shadow: 0 2px 10px rgba(0, 255, 229, 0.1);
  backdrop-filter: blur(5px);
  transform: translateY(-1px);
}

nav .links a.active {
  color: #00ffe5;
  background: rgba(0, 255, 229, 0.15);
  border: 1px solid rgba(0, 255, 229, 0.3);
  box-shadow: 0 2px 10px rgba(0, 255, 229, 0.2);
}

nav .links .more {
  position: relative;
  display: inline-block;
}

nav .links .more .hamburger {
  font-size: 14px;
  cursor: pointer;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  background: transparent;
  border: 1px solid transparent;
}

nav .links .more .hamburger:hover {
  color: #96f3f5;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(150, 243, 245, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  transform: translateY(-1px);
}

nav .links .more .hamburger i {
  color: #96f3f5;
  margin-right: 6px;
}

nav .quick-access-wrapper {
  min-width: 50px;
  font-weight: bold;
  gap: 4px;
  font-size: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav .quick-access-wrapper i {
  color: #96f3f5;
  font-size: 16px;
}

nav .panic-btn-wrapper {
  min-width: 160px;
  flex-direction: column;
  font-weight: bold;
  gap: 2px;
  font-size: 11px;
  text-align: center;
}

nav .weather {
  min-width: 200px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: nowrap;
  text-align: center;
}

nav .weather button {
  background: #00ffe5;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  border-radius: 20px;
  transition: background 0.3s ease;
  font-size: 12px;
}

nav .weather button:hover {
  background: #4bf9ed;
}

nav .weather .icon {
  font-size: 18px;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: center;
}

nav .weather .temp,
nav .weather .desc,
nav .weather .wind {
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: white;
  line-height: 1;
  font-size: 12px;
}

nav .weather .temp {
  font-weight: bold;
  font-size: 14px;
}

nav .weather .desc {
  opacity: 0.8;
}

nav .weather .wind {
  opacity: 0.8;
  gap: 4px;
}

nav .weather .wind i {
  color: #00ffe5;
}

nav .system-status {
  min-width: 200px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: nowrap;
  text-align: center;
}

nav .system-status .battery-section {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-weight: bold;
}

nav .system-status .battery-section i {
  font-size: 14px;
  color: #4bf9ed;
}

nav .system-status .battery-section i.charging {
  color: #4ade80;
}

nav .system-status .separator {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 4px;
}

nav .system-status .network-section {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  opacity: 0.9;
}

nav .system-status .network-section i {
  color: #4bf9ed;
  font-size: 12px;
}

@media (max-width: 1200px) {
  nav {
    gap: 12px;
    padding: 8px 16px;
  }

  nav .bubble {
    min-height: 45px;
    height: 45px;
    padding: 10px 16px;
  }

  nav .links {
    min-width: 350px;
    gap: 6px;
  }

  nav .links a {
    font-size: 13px;
    padding: 6px 10px;
  }

  nav .quick-access-wrapper {
    min-width: 45px;
    font-size: 9px;
    padding: 6px 10px;
  }

  nav .system-status {
    min-width: 160px;
    font-size: 11px;
  }
}

@media (max-width: 900px) {
  nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 8px 12px;
  }

  nav .bubble {
    min-height: 40px;
    height: 40px;
  }

  nav .time-wrapper {
    min-width: 120px;
    font-size: 14px;
  }

  nav .period-timer-wrapper {
    min-width: 180px;
    font-size: 11px;
  }

  nav .links {
    min-width: 300px;
    gap: 6px;
  }

  nav .quick-access-wrapper {
    min-width: 40px;
    font-size: 8px;
    padding: 4px 8px;
  }

  nav .weather {
    min-width: 160px;
    font-size: 12px;
  }

  nav .panic-btn-wrapper {
    min-width: 140px;
    font-size: 10px;
  }

  nav .system-status {
    min-width: 140px;
    font-size: 10px;
  }
}

    `;
    document.head.appendChild(style);
    console.log('Styles created');
  }
  
  function createNavigation() {
    const existingNav = document.querySelector('nav');
    if (existingNav) existingNav.remove();
    
    const navHTML = `
      <nav>
        <div class="bubble time-wrapper">
          <div class="time">--:--:-- --</div>
        </div>

        <div class="bubble period-timer-wrapper">
          <div class="period-timer">Loading...</div>
        </div>

        <div class="bubble links">
          <a href="main.html"><i class="fas fa-house"></i> Home</a>
          <a href="search.html"><i class="fas fa-magnifying-glass"></i> Search</a>
          <a href="games.html"><i class="fas fa-gamepad"></i> Games</a>
          <a href="apps.html"><i class="fas fa-th-large"></i> Apps</a>
         <a href="movies.html"><i class="fas fa-film"></i> Movies</a>
          <a href="ai.html"><i class="fas fa-robot"></i> AI</a>
          <div class="more">
            <div class="hamburger"><i class="fas fa-bars"></i> More</div>
          </div>
        </div>

        <div class="bubble quick-access-wrapper" style="display: none;">
          <i class="fas fa-bolt"></i>
        </div>

        <div class="bubble panic-btn-wrapper">
          <div>Loading rank...</div>
        </div>

        <div class="bubble weather">
          <button id="enable-location-btn">Enable Location For Weather</button>
        </div>

        <div class="bubble system-status">
          <div class="battery-section">
            <i class="fas fa-battery-three-quarters"></i>
            <i class="fas fa-bolt" style="display: none;"></i>
            <span>--</span>
          </div>
          <div class="separator"></div>
          <div class="network-section">
            <i class="fas fa-wifi"></i>
            <span>--G</span>
          </div>
        </div>
      </nav>
    `;
    
    document.body.insertAdjacentHTML("afterbegin", navHTML);
    console.log('Navigation HTML created');
  }
  
  
  let clickCount = 0;
  let clickTimer;
  let panicButtonInitialized = false;
  
  function initializeAll() {
    console.log('Initializing all functionality...');
    
    const hamburger = document.querySelector(".links .more .hamburger");
    
    if (hamburger) {
      console.log('Setting up More button functionality...');
      
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('More button clicked - loading external script...');
        
        const script = document.createElement('script');
        script.src = 'menu.js'; 
        script.onload = () => {
          console.log('External script loaded successfully');
        };
        script.onerror = () => {
          console.error('Failed to load external script');
        };
        document.head.appendChild(script);
      });
      
      console.log('More button functionality set up');
      
      const periodTimerWrapper = document.querySelector('.period-timer-wrapper');

      if (periodTimerWrapper) {
        console.log('Setting up Period Timer click functionality...');
        
        periodTimerWrapper.style.cursor = 'pointer';
        
        periodTimerWrapper.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log('Period Timer clicked - loading external script...');
          
          const script = document.createElement('script');
          script.src = 'period-timer.js';
          script.onload = () => {
            console.log('Period Timer external script loaded successfully');
          };
          script.onerror = () => {
            console.error('Failed to load Period Timer external script');
          };
          document.head.appendChild(script);
        });
        
        console.log('Period Timer click functionality set up');
      }

      const timeWrapper = document.querySelector('.time-wrapper');

      if (timeWrapper) {
        console.log('Setting up Clock click functionality...');
        
        timeWrapper.style.cursor = 'pointer';
        
        timeWrapper.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log('Clock clicked - loading external script...');
          
          const script = document.createElement('script');
          script.src = 'clock.js';
          script.onload = () => {
            console.log('Clock external script loaded successfully');
          };
          script.onerror = () => {
            console.error('Failed to load Clock external script');
          };
          document.head.appendChild(script);
        });
        
        console.log('Clock click functionality set up');
      }
    }

    const quickAccessBtn = document.querySelector('.quick-access-wrapper');
    
    const showQuickAccess = localStorage.getItem('showQuickAccess') !== null ? localStorage.getItem('showQuickAccess') !== 'false' : false;
    if (quickAccessBtn) {
      quickAccessBtn.style.display = showQuickAccess ? 'flex' : 'none';
    }
    
    if (quickAccessBtn && showQuickAccess) {
      console.log('Setting up Quick Access button functionality...');
      
      quickAccessBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('Quick Access button clicked - loading external script...');
        
        const script = document.createElement('script');
        script.src = 'quick-access.js'; 
        script.onload = () => {
          console.log('Quick Access external script loaded successfully');
        };
        script.onerror = () => {
          console.error('Failed to load Quick Access external script');
        };
        document.head.appendChild(script);
      });
      
      console.log('Quick Access button functionality set up');
    }

    const currentPage = location.pathname.split("/").pop();
    document.querySelectorAll("nav .links a").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });

    function updateTime() {
      const show = localStorage.getItem('showClock') !== null ? localStorage.getItem('showClock') !== 'false' : false; 
      const timeDiv = document.querySelector("nav .time");
      const timeBubble = timeDiv?.closest('.bubble');

      if (!show) {
        if (timeBubble) {
          timeBubble.style.display = 'none';
        }
        return;
      }

      if (timeBubble) {
        timeBubble.style.display = 'flex';
      }

      if (!timeDiv) return;
      
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      const secondsStr = seconds < 10 ? '0' + seconds : seconds;

      timeDiv.textContent = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);

    const periodTimerDiv = document.querySelector('nav .period-timer');

    const schedulesByDay = {
      mon_thurs: [
        { name: '1st Period', start: '08:05', end: '08:54' },
        { name: 'Passing', start: '08:54', end: '08:58' },
        { name: '2nd Period', start: '08:58', end: '09:44' },
        { name: 'Passing', start: '09:44', end: '09:48' },
        { name: '3rd Period', start: '09:48', end: '10:34' },
        { name: 'Passing', start: '10:34', end: '10:38' },
        { name: 'Advisory', start: '10:38', end: '10:56' },
        { name: 'Passing', start: '10:56', end: '11:00' },
        { name: '4th Period', start: '11:00', end: '11:46' },
        { name: 'Passing', start: '11:46', end: '11:50' },
        { name: 'B Lunch', start: '11:50', end: '12:20' },
        { name: 'Passing', start: '12:20', end: '12:24' },
        { name: '5th Period', start: '12:24', end: '13:10' },
        { name: 'Passing', start: '13:10', end: '13:14' },
        { name: '6th Period', start: '13:14', end: '14:00' },
        { name: 'Passing', start: '14:00', end: '14:04' },
        { name: '7th Period', start: '14:04', end: '14:50' },
      ],
      tue_wed_fri: [
        { name: '1st Period', start: '08:05', end: '08:58' },
        { name: 'Passing', start: '08:58', end: '09:02' },
        { name: '2nd Period', start: '09:02', end: '09:51' },
        { name: 'Passing', start: '09:51', end: '09:55' },
        { name: '3rd Period', start: '09:55', end: '10:44' },
        { name: 'Passing', start: '10:44', end: '10:48' },
        { name: '4th Period', start: '10:48', end: '11:37' },
        { name: 'Passing', start: '11:37', end: '11:41' },
        { name: 'B Lunch', start: '11:41', end: '12:11' },
        { name: 'Passing', start: '12:11', end: '12:15' },
        { name: '5th Period', start: '12:15', end: '13:04' },
        { name: 'Passing', start: '13:04', end: '13:08' },
        { name: '6th Period', start: '13:08', end: '13:57' },
        { name: 'Passing', start: '13:57', end: '14:01' },
        { name: '7th Period', start: '14:01', end: '14:50' },
      ],
    };

    function parseHM(timeStr) {
      const [h, m] = timeStr.split(':').map(Number);
      return { h, m };
    }

    function getTodaySchedule() {
      const day = new Date().getDay();
      if (day === 1 || day === 4) return schedulesByDay.mon_thurs;
      if (day === 2 || day === 3 || day === 5) return schedulesByDay.tue_wed_fri;
      return [];
    }

    function formatDuration(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      let parts = [];
      if (hrs > 0) parts.push(`${hrs}h`);
      if (mins > 0 || hrs > 0) parts.push(`${mins}m`);
      parts.push(`${secs}s`);
      return parts.join(' ');
    }

    function updatePeriodTimer() {
      const show = localStorage.getItem('showPeriodTimer') !== null ? localStorage.getItem('showPeriodTimer') !== 'false' : false; 
      const periodTimerBubble = document.querySelector('nav .period-timer-wrapper');

      if (!show) {
        if (periodTimerBubble) {
          periodTimerBubble.style.display = 'none';
        }
        return;
      }

      if (!periodTimerDiv) return;
      
      if (periodTimerBubble) {
        periodTimerBubble.style.display = 'flex';
      }
      
      periodTimerDiv.style.visibility = 'visible';

      const now = new Date();
      const schedule = getTodaySchedule();

      if (!schedule || schedule.length === 0) {
        periodTimerDiv.textContent = 'No current period | No time to start | No time to end';
        return;
      }

      let current = null;
      for (const period of schedule) {
        const { h: sh, m: sm } = parseHM(period.start);
        const { h: eh, m: em } = parseHM(period.end);
        const startDate = new Date(now);
        startDate.setHours(sh, sm, 0, 0);
        const endDate = new Date(now);
        endDate.setHours(eh, em, 0, 0);

        if (now >= startDate && now < endDate) {
          current = { period, startDate, endDate };
          break;
        }
      }

      if (current) {
        const { period, startDate, endDate } = current;
        const sinceStart = now - startDate;
        const untilEnd = endDate - now;
        periodTimerDiv.textContent =
          `${period.name} | Since start: ${formatDuration(sinceStart)} | Until end: ${formatDuration(untilEnd)}`;
        return;
      }

      let nextPeriod = null;
      for (const period of schedule) {
        const { h: sh, m: sm } = parseHM(period.start);
        const startDate = new Date(now);
        startDate.setHours(sh, sm, 0, 0);

        if (startDate > now) {
          nextPeriod = { period, startDate };
          break;
        }
      }

      if (nextPeriod) {
        const { period, startDate } = nextPeriod;
        const timeToStart = startDate - now;
        periodTimerDiv.textContent =
          `No current period | Time til start ${period.name}: ${formatDuration(timeToStart)} | No current period`;
      } else {
        periodTimerDiv.textContent = 'No current period | No current period | No current period';
      }
    }
    
    updatePeriodTimer();
    setInterval(updatePeriodTimer, 1000);

    const weatherCodeMap = {
      0: { icon: 'fa-sun', color: '#f6d365', desc: 'Clear' },
      1: { icon: 'fa-cloud-sun', color: '#f6d365', desc: 'Mainly Clear' },
      2: { icon: 'fa-cloud-sun', color: '#d4d4d8', desc: 'Partly Cloudy' },
      3: { icon: 'fa-cloud', color: '#9ca3af', desc: 'Overcast' },
      45: { icon: 'fa-smog', color: '#9ca3af', desc: 'Fog' },
      48: { icon: 'fa-smog', color: '#9ca3af', desc: 'Fog' },
      51: { icon: 'fa-cloud-rain', color: '#3b82f6', desc: 'Light Drizzle' },
      53: { icon: 'fa-cloud-rain', color: '#2563eb', desc: 'Moderate Drizzle' },
      55: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Dense Drizzle' },
      56: { icon: 'fa-cloud-meatball', color: '#3b82f6', desc: 'Light Freezing Drizzle' },
      57: { icon: 'fa-cloud-meatball', color: '#2563eb', desc: 'Dense Freezing Drizzle' },
      61: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Slight Rain' },
      63: { icon: 'fa-cloud-showers-heavy', color: '#1d4ed8', desc: 'Moderate Rain' },
      65: { icon: 'fa-cloud-showers-heavy', color: '#1e3a8a', desc: 'Heavy Rain' },
      66: { icon: 'fa-snowflake', color: '#3b82f6', desc: 'Light Freezing Rain' },
      67: { icon: 'fa-snowflake', color: '#2563eb', desc: 'Heavy Freezing Rain' },
      71: { icon: 'fa-snowflake', color: '#e0f2fe', desc: 'Slight Snow Fall' },
      73: { icon: 'fa-snowflake', color: '#bae6fd', desc: 'Moderate Snow Fall' },
      75: { icon: 'fa-snowflake', color: '#7dd3fc', desc: 'Heavy Snow Fall' },
      77: { icon: 'fa-snowflake', color: '#38bdf8', desc: 'Snow Grains' },
      80: { icon: 'fa-cloud-showers-heavy', color: '#3b82f6', desc: 'Slight Rain Showers' },
      81: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Moderate Rain Showers' },
      82: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Violent Rain Showers' },
      85: { icon: 'fa-snowflake', color: '#3b82f6', desc: 'Slight Snow Showers' },
      86: { icon: 'fa-snowflake', color: '#2563eb', desc: 'Heavy Snow Showers' },
      95: { icon: 'fa-cloud-bolt', color: '#facc15', desc: 'Thunderstorm' },
      96: { icon: 'fa-cloud-bolt', color: '#eab308', desc: 'Thunderstorm with hail' },
      99: { icon: 'fa-cloud-bolt', color: '#ca8a04', desc: 'Thunderstorm with heavy hail' },
    };

    async function updateWeather() {
      const show = localStorage.getItem('showWeather') !== null ? localStorage.getItem('showWeather') !== 'false' : false; 
      const weatherDiv = document.querySelector('nav .weather');
      const weatherBubble = weatherDiv?.closest('.bubble');
      const enableBtn = document.getElementById('enable-location-btn');

      if (!show) {
        if (weatherBubble) {
          weatherBubble.style.display = 'none';
        }
        return;
      }

      if (weatherBubble) {
        weatherBubble.style.display = 'flex';
      }

      if (!navigator.geolocation) {
        if (enableBtn) {
          enableBtn.textContent = 'Geolocation not supported';
          enableBtn.disabled = true;
        }
        return;
      }

      function degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
          "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
      }

      if (!localStorage.getItem('weatherEnabled')) {
        if (enableBtn) {
          enableBtn.style.display = 'inline-block';
          enableBtn.onclick = () => {
            navigator.geolocation.getCurrentPosition(async (pos) => {
              localStorage.setItem('weatherEnabled', 'true');
              localStorage.setItem('lat', pos.coords.latitude);
              localStorage.setItem('lon', pos.coords.longitude);
              enableBtn.style.display = 'none';
              await updateWeather();
            }, () => {
              alert('Could not get location.');
            });
          };
        }
        return;
      } else {
        if (enableBtn) enableBtn.style.display = 'none';
      }

      const lat = localStorage.getItem('lat');
      const lon = localStorage.getItem('lon');
      if (!lat || !lon) return;

      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`);
        const data = await res.json();
        const weather = data.current_weather;

        if (!weather) {
          if (weatherDiv) weatherDiv.textContent = 'No weather data';
          return;
        }

        const code = weather.weathercode;
        const mapping = weatherCodeMap[code] || { icon: 'fa-question', desc: 'Unknown' };
        const iconClass = mapping.icon;
        const desc = mapping.desc;
        const temp = Math.round(weather.temperature);
        const windSpeed = Math.round(weather.windspeed);
        const windDir = degToCompass(weather.winddirection);

        if (weatherDiv) {
          weatherDiv.innerHTML = `
            <div class="icon"><i class="fas ${iconClass}" style="color:${mapping.color}"></i></div>
            <div class="temp">${temp}&deg;F</div>
            <div class="desc">${desc}</div>
            <div class="wind"><i class="fas fa-wind"></i> ${windSpeed} mph ${windDir}</div>
          `;
        }
      } catch (e) {
        if (weatherDiv) weatherDiv.textContent = 'Error loading weather';
      }
    }
    
    updateWeather();

    
    function renderPanicButton() {
      const show = localStorage.getItem('showPanicButton') !== null ? localStorage.getItem('showPanicButton') !== 'false' : false; 
      const panicBtnWrapper = document.querySelector('nav .panic-btn-wrapper');
      
      if (!show) {
        if (panicBtnWrapper) {
          panicBtnWrapper.style.display = 'none';
        }
        return;
      }

      if (!panicBtnWrapper) return;
      
      panicBtnWrapper.style.display = 'flex';
      panicBtnWrapper.style.flexDirection = 'column';
      panicBtnWrapper.style.alignItems = 'center';
      panicBtnWrapper.style.fontWeight = 'bold';
      panicBtnWrapper.style.userSelect = 'none';
      panicBtnWrapper.style.cursor = 'pointer';
      panicBtnWrapper.style.gap = '1px';
      panicBtnWrapper.style.minWidth = '140px';
      panicBtnWrapper.style.height = '25px';
      panicBtnWrapper.style.justifyContent = 'center';

      const STORAGE_KEY = 'craftedPlaytimeSeconds';
      const playtimeSeconds = Number(localStorage.getItem(STORAGE_KEY)) || 0;
      
      const ranks = [
  { name: 'Bronze I', icon: 'fa-medal', color: '#CD7F32', threshold: 0 },
  { name: 'Bronze II', icon: 'fa-medal', color: '#CD7F32', threshold: 600 },
  { name: 'Bronze III', icon: 'fa-medal', color: '#CD7F32', threshold: 1800 },
  { name: 'Silver I', icon: 'fa-trophy', color: '#C0C0C0', threshold: 2700 },
  { name: 'Silver II', icon: 'fa-trophy', color: '#C0C0C0', threshold: 3600 },
  { name: 'Silver III', icon: 'fa-trophy', color: '#C0C0C0', threshold: 5400 },
  { name: 'Gold I', icon: 'fa-crown', color: '#FFD700', threshold: 7200 },
  { name: 'Gold II', icon: 'fa-crown', color: '#FFD700', threshold: 10800 },
  { name: 'Gold III', icon: 'fa-crown', color: '#FFD700', threshold: 14400 },
  { name: 'Platinum I', icon: 'fa-gem', color: '#E5E4E2', threshold: 25200 },
  { name: 'Platinum II', icon: 'fa-gem', color: '#E5E4E2', threshold: 108000 },
  { name: 'Platinum III', icon: 'fa-gem', color: '#E5E4E2', threshold: 180000 },
  { name: 'Diamond I', icon: 'fa-diamond', color: '#B9F2FF', threshold: 259200 },
  { name: 'Diamond II', icon: 'fa-diamond', color: '#B9F2FF', threshold: 345600 },
  { name: 'Diamond III', icon: 'fa-diamond', color: '#B9F2FF', threshold: 432000 },
  { name: 'Master', icon: 'fa-fire', color: '#FF4500', threshold: 518400 },
  { name: 'Grandmaster', icon: 'fa-star', color: '#9400D3', threshold: 561600 },
  { name: 'Challenger', icon: 'fa-chess-king', color: '#FFD700', threshold: 608400 + 3600 }, 
  { name: 'No Life', icon: 'fa-leaf', color: '#32CD32', threshold: 720000 }, 
  { name: 'Unreal', icon: 'fa-skull', color: '#FF1493', threshold: 1800000 } 
];


      let currentRank = ranks[0]; 
      let nextRank = null;
      let currentRankIndex = 0;
      
      for (let i = ranks.length - 1; i >= 0; i--) {
        if (playtimeSeconds >= ranks[i].threshold) {
          currentRank = ranks[i];
          currentRankIndex = i;
          nextRank = i < ranks.length - 1 ? ranks[i + 1] : null;
          break;
        }
      }

      let progressPercent = 0;
      let progressText = '';
      
      if (nextRank) {
        const currentThreshold = currentRank.threshold;
        const nextThreshold = nextRank.threshold;
        const progress = playtimeSeconds - currentThreshold;
        const total = nextThreshold - currentThreshold;
        progressPercent = (progress / total) * 100;
        
        const timeLeft = nextThreshold - playtimeSeconds;
        const hoursLeft = Math.floor(timeLeft / 3600);
        const minutesLeft = Math.floor((timeLeft % 3600) / 60);
        const secondsLeft = timeLeft % 60;
        
        if (hoursLeft > 0) {
          progressText = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s to ${nextRank.name}`;
        } else {
          progressText = `${minutesLeft}m ${secondsLeft}s to ${nextRank.name}`;
        }
      } else {
        progressPercent = 100;
        progressText = 'Max Rank!';
      }

      function formatPlaytime(totalSeconds) {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        return `${minutes}m ${seconds}s`;
      }

      const playtimeDisplay = formatPlaytime(playtimeSeconds);

      panicBtnWrapper.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 11px; line-height: 1;">
          <div style="color: ${currentRank.color}; font-weight: bold; display: flex; align-items: center; gap: 3px;">
            <i class="fas ${currentRank.icon}" style="color: ${currentRank.color}; font-size: 10px;"></i>
            ${currentRank.name}
          </div>
          <div style="color: ${currentRank.color}; font-weight: normal; opacity: 0.8; font-size: 9px;">
            ${playtimeDisplay}
          </div>
        </div>
        <div style="width: 100%; background: rgba(255,255,255,0.1); height: 2px; border-radius: 1px; overflow: hidden; margin: 1px 0;">
          <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, ${currentRank.color}, ${nextRank ? nextRank.color : currentRank.color}); transition: width 0.3s ease;"></div>
        </div>
        <div style="color: rgba(255,255,255,0.5); font-weight: normal; font-size: 8px; line-height: 1; text-align: center;">
          ${progressText}
        </div>
      `;

      
      if (!panicButtonInitialized) {
        panicBtnWrapper.addEventListener('click', () => {
          clickCount++;
          console.log(`Click count: ${clickCount}`); 
          
          
          if (clickTimer) {
            clearTimeout(clickTimer);
          }
          
          
          clickTimer = setTimeout(() => {
            console.log('Resetting click count'); 
            clickCount = 0;
          }, 5000);
          
          
          if (clickCount >= 10) {
            console.log('10 clicks reached!'); 
            clickCount = 0;
            clearTimeout(clickTimer);
            
            
            if (window.pausePlaytimeTracking) {
              window.pausePlaytimeTracking();
            }
            
            const input = prompt('Enter playtime in seconds:');
            if (input && !isNaN(input) && Number(input) >= 0) {
              const seconds = parseInt(input);
              localStorage.setItem(STORAGE_KEY, seconds);
              console.log(`Playtime set to: ${seconds} seconds`); 
              
              
              setTimeout(() => {
                if (window.resumePlaytimeTracking) {
                  window.resumePlaytimeTracking();
                }
                renderPanicButton();
              }, 100);
            } else {
              
              if (window.resumePlaytimeTracking) {
                window.resumePlaytimeTracking();
              }
            }
          }
        });
        
        panicButtonInitialized = true;
      }
    }

    
    renderPanicButton();
    setInterval(renderPanicButton, 1000); 

    
    (function trackPlaytime() {
      const STORAGE_KEY = 'craftedPlaytimeSeconds';
      let isPaused = false;
      let playtimeInterval;

      function getPlaytime() {
        return Number(localStorage.getItem(STORAGE_KEY)) || 0;
      }

      function setPlaytime(seconds) {
        localStorage.setItem(STORAGE_KEY, seconds);
      }

      
      window.pausePlaytimeTracking = () => {
        console.log('Pausing playtime tracking');
        isPaused = true;
      };

      window.resumePlaytimeTracking = () => {
        console.log('Resuming playtime tracking');
        isPaused = false;
        
        seconds = getPlaytime();
        lastRenderedSecond = seconds;
        console.log(`Resumed with playtime: ${seconds} seconds`);
      };

      let seconds = getPlaytime();
      let lastRenderedSecond = seconds;

      playtimeInterval = setInterval(() => {
        if (isPaused) return; 
        
        seconds++;
        setPlaytime(seconds);
        
        
        if ((localStorage.getItem('showPanicButton') !== null ? localStorage.getItem('showPanicButton') !== 'false' : false) && 
            lastRenderedSecond !== seconds) {
          lastRenderedSecond = seconds;
          renderPanicButton();
        }
      }, 1000);
    })();

    function updateSystemStatus() {
      const show = localStorage.getItem('showSystemStatus') !== null ? localStorage.getItem('showSystemStatus') !== 'false' : false; 
      const systemStatusDiv = document.querySelector('nav .system-status');
      const systemStatusBubble = systemStatusDiv?.closest('.bubble');

      if (!show) {
        if (systemStatusBubble) {
          systemStatusBubble.style.display = 'none';
        }
        return;
      }

      if (systemStatusBubble) {
        systemStatusBubble.style.display = 'flex';
      }

      if (!systemStatusDiv) return;

      const batteryIcon = systemStatusDiv.querySelector('.battery-section i:first-child');
      const chargingIcon = systemStatusDiv.querySelector('.battery-section i:nth-child(2)');
      const batteryPercent = systemStatusDiv.querySelector('.battery-section span');
      const networkIcon = systemStatusDiv.querySelector('.network-section i');
      const networkText = systemStatusDiv.querySelector('.network-section span');

      if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging;
          
          let batteryIconClass = 'fa-battery-empty';
          
          if (level >= 75) {
            batteryIconClass = 'fa-battery-full';
          } else if (level >= 50) {
            batteryIconClass = 'fa-battery-three-quarters';
          } else if (level >= 25) {
            batteryIconClass = 'fa-battery-half';
          } else if (level >= 10) {
            batteryIconClass = 'fa-battery-quarter';
          }

          if (batteryIcon) {
            batteryIcon.className = `fas ${batteryIconClass}`;
          }

          if (chargingIcon) {
            chargingIcon.style.display = charging ? 'inline' : 'none';
          }

          if (batteryPercent) {
            batteryPercent.textContent = `${level}%`;
          }
        }).catch(() => {
          if (batteryIcon) {
            batteryIcon.className = 'fas fa-battery-three-quarters';
          }
          if (chargingIcon) {
            chargingIcon.style.display = 'none';
          }
          if (batteryPercent) {
            batteryPercent.textContent = 'N/A';
          }
        });
      } else {
        if (batteryIcon) {
          batteryIcon.className = 'fas fa-battery-three-quarters';
        }
        if (chargingIcon) {
          chargingIcon.style.display = 'none';
        }
        if (batteryPercent) {
          batteryPercent.textContent = 'N/A';
        }
      }

      async function getNetworkInfo() {
        let signalStrength = 'N/A';
        let wifiIcon = 'fa-wifi-slash';
        
        const isOnline = navigator.onLine;
        
        if (!isOnline) {
          signalStrength = 'Offline';
          wifiIcon = 'fa-wifi-slash';
        } else {
          if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            
            if (connection) {
              const effectiveType = connection.effectiveType;
              const downlink = connection.downlink;
              
              if (effectiveType === '4g' && downlink && downlink >= 10) {
                wifiIcon = 'fa-wifi';
                signalStrength = '4G';
              } else if (effectiveType === '4g' && downlink && downlink >= 5) {
                wifiIcon = 'fa-wifi';
                signalStrength = '4G';
              } else if (effectiveType === '4g') {
                wifiIcon = 'fa-wifi';
                signalStrength = '4G';
              } else if (effectiveType === '3g') {
                wifiIcon = 'fa-wifi';
                signalStrength = '3G';
              } else if (effectiveType === '2g') {
                wifiIcon = 'fa-wifi';
                signalStrength = '2G';
              } else if (effectiveType === 'slow-2g') {
                wifiIcon = 'fa-wifi';
                signalStrength = '1G';
              } else {
                wifiIcon = 'fa-wifi';
                signalStrength = '?G';
              }
            } else {
              wifiIcon = 'fa-wifi';
              signalStrength = '?G';
            }
          } else {
            wifiIcon = 'fa-wifi';
            signalStrength = '?G';
          }
        }

        if (networkIcon) {
          networkIcon.className = `fas ${wifiIcon}`;
        }
        if (networkText) {
          networkText.textContent = signalStrength;
        }
      }

      getNetworkInfo();
    }

    updateSystemStatus();
    setInterval(updateSystemStatus, 10000); 

    window.addEventListener('online', updateSystemStatus);
    window.addEventListener('offline', updateSystemStatus);

    const streams = {
      chillhop: {
        name: "Chillhop",
        url: "https://streams.ilovemusic.de/iloveradio13.mp3"
      },
      groovesalad: {
        name: "Groove Salad",
        url: "https://ice1.somafm.com/groovesalad-128-mp3"
      },
      mugi: {
        name: "Mugi",
        url: "https://streams.ilovemusic.de/iloveradio14.mp3"
      },
      lofi: {
        name: "Lofi",
        url: "https://streams.ilovemusic.de/iloveradio15.mp3"
      },
      vaporwave: {
        name: "Vaporwave",
        url: "https://streams.ilovemusic.de/iloveradio16.mp3"
      }
    };

    const stored = localStorage.getItem("cg-music-stream");
    const selectedKey = stored && (stored === "none" || streams[stored]) ? stored : "none";

    const audio = new Audio();
    audio.id = "cg-music-player";
    audio.volume = parseFloat(localStorage.getItem("cg-music-volume")) || 0.5;
    audio.loop = true;
    audio.style.display = "none";
    document.body.appendChild(audio);

    if (selectedKey !== "none") {
      audio.src = streams[selectedKey].url;
      audio.autoplay = true;
      audio.play().catch(() => {});
    }

    window.setStream = (key) => {
      if (key === "none") {
        audio.pause();
        audio.src = "";
        localStorage.setItem("cg-music-stream", key);
        return;
      }
      if (!streams[key]) return console.warn("Invalid stream:", key);
      localStorage.setItem("cg-music-stream", key);
      audio.src = streams[key].url;
      audio.play();
    };

    window.setMusicVolume = (v) => {
      audio.volume = v;
      localStorage.setItem("cg-music-volume", v);
    };

    window.getStreamList = () => streams;

    console.log('All functionality initialized');
  }
  
  function init() {
    console.log('Starting navigation initialization...');
    
    createStyles();
    createNavigation();
    
    setTimeout(() => {
      initializeAll();
      console.log('Navigation fully loaded!');
    }, 100);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

(function() {
  let firebaseApp;
  let rtdb;

  async function loadFirebaseConfig() {
    try {
      const res = await fetch('/.netlify/functions/get-firebase-config');
      if (!res.ok) throw new Error('Failed to fetch Firebase config');
      const config = await res.json();
      return config;
    } catch (error) {
      console.error('Error loading Firebase config:', error);
      throw error;
    }
  }

  async function initializeOnlineTracking() {
    try {
      if (typeof firebase === 'undefined') {
        await loadFirebaseSDK();
      }

      const config = await loadFirebaseConfig();
      firebaseApp = firebase.initializeApp(config);
      rtdb = firebase.database();
      await trackRealtimeOnline();
    } catch (error) {
      console.error('Failed to initialize online tracking:', error);
    }
  }

  function loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
      if (typeof firebase !== 'undefined') {
        resolve();
        return;
      }

      const appScript = document.createElement('script');
      appScript.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js';
      appScript.onload = () => {
        const dbScript = document.createElement('script');
        dbScript.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js';
        dbScript.onload = () => resolve();
        dbScript.onerror = () => reject(new Error('Failed to load Firebase Database SDK'));
        document.head.appendChild(dbScript);
      };
      appScript.onerror = () => reject(new Error('Failed to load Firebase App SDK'));
      document.head.appendChild(appScript);
    });
  }

  async function trackRealtimeOnline() {
    try {
      const sessionRef = rtdb.ref('onlineUsers').push();
      await sessionRef.set(true);
      sessionRef.onDisconnect().remove();

      rtdb.ref('onlineUsers').on('value', snap => {
        const count = snap.numChildren();
        const onlineCountElement = document.getElementById('online-count');
        if (onlineCountElement) {
          onlineCountElement.textContent = count;
        }
      });
    } catch (error) {
      console.error('Error setting up realtime online tracking:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOnlineTracking);
  } else {
    initializeOnlineTracking();
  }
})();