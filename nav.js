// Inject styles
const style = document.createElement('style');
style.innerHTML = `
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  padding: 12px 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 999;
  color: white;
  display: flex;
  align-items: center;
  /* Remove justify-content: center to avoid shifting */
  justify-content: space-between;
}

nav .time-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 220px;
  min-width: 220px;
  justify-content: flex-start;
  flex: none;
}

nav .links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  display: flex;
  gap: 24px;
  padding: 15px 0;          /* vertical padding */
  align-items: center;      /* vertical centering of children */
  height: 100%;             /* fill nav height to center vertically */
}

nav .links a {
  display: inline-flex;      /* inline-flex for vertical centering */
  align-items: center;       /* center icon + text vertically */
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  transition: color 0.2s ease;
  padding: 0 8px;            /* optional horizontal padding */
  height: 100%;              /* fill nav height for vertical centering */
}


nav .links a i {
  color: #96f3f5;
  margin-right: 6px;
}

nav .links a::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: -4px;
  background: linear-gradient(to right, #00ffe5, #4bf9ed);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

nav .links a:hover {
  color: #96f3f5;
}

nav .links a:hover::after {
  transform: scaleX(1);
}

nav .links a.active {
  color: #00ffe5;
}

nav .links .more {
  position: relative;
  display: inline-block;
  text-align: center;
}

nav .links .more .hamburger {
  font-size: 16px;
  cursor: pointer;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
}

nav .links .more .hamburger i {
  color: #96f3f5;
  margin-right: 6px;
}

nav .links .more:hover .dropdown {
  display: flex;
}

nav .links .more .dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  min-width: 160px;
  display: none;
  flex-direction: column;
  z-index: 1000;
  padding: 8px 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.8);
}

nav .links .more .dropdown a {
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: background 0.2s ease;
}

nav .links .more .dropdown a:hover {
  background: rgba(0,0,0,0.8);
}

nav .weather {
  flex: none;
  font-size: 16px;
  text-align: right;
  user-select: none;
  padding-right: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 220px; /* same width as left to keep balance */
}

nav .weather button {
  background: #00ffe5;
  border: none;
  padding: 6px 12px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;
}

nav .weather button:hover {
  background: #4bf9ed;
}

nav .weather .icon {
  font-size: 24px;
  filter: drop-shadow(0 0 1px rgba(0,0,0,0.8));
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
}

nav .weather .temp {
  font-weight: bold;
}

nav .weather .desc {
  font-size: 14px;
  opacity: 0.8;
}

nav .weather .wind {
  font-size: 14px;
  opacity: 0.8;
  gap: 6px;
}

nav .weather .wind i {
  color: #00ffe5;
}

nav .period-timer {
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  padding-left: 6px;
  white-space: nowrap;
  user-select: none;
  color: #96f3f5;
}

`;
document.head.appendChild(style);

const navHTML = `
  <nav>
    <div class="time-wrapper" style="display:flex; align-items:center; gap:6px;">
  <div class="time">--:--:-- --</div>
  <div class="period-timer"></div>
</div>

    <div class="links">
      <a href="main.html"><i class="fas fa-house"></i> Home</a>
      <a href="search.html"><i class="fas fa-magnifying-glass"></i> Search</a>
      <a href="games.html"><i class="fas fa-gamepad"></i> Games</a>
      <a href="apps.html"><i class="fas fa-th-large"></i> Apps</a>
      <a href="ai.html"><i class="fas fa-robot"></i> AI</a>
      <div class="more">
        <div class="hamburger"><i class="fas fa-bars"></i> More</div>
        <div class="dropdown">
          <a href="tools.html"><i class="fas fa-wrench"></i> Tools</a>
          <a href="transfer.html"><i class="fas fa-share"></i> Transfer</a>
          <a href="partners.html"><i class="fas fa-handshake"></i> Partners</a>
          <a href="aicalc.html"><i class="fas fa-calculator"></i> AI Calculator</a>
          <a href="elaassist.html"><i class="fas fa-pen-nib"></i> ELA Assistant</a>
        </div>
      </div>
    </div>
    <div class="weather">
      <button id="enable-location-btn">Enable Location For Weather</button>
    </div>
  </nav>
`;
document.body.insertAdjacentHTML("afterbegin", navHTML);


document.addEventListener("click", (e) => {
  const more = document.querySelector(".links .more");
  const dropdown = more.querySelector(".dropdown");
  if (more.contains(e.target)) {
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  } else {
    dropdown.style.display = "none";
  }
});

const currentPage = location.pathname.split("/").pop();
document.querySelectorAll("nav .links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

function updateTime() {
  const timeDiv = document.querySelector("nav .time");
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

const periodTimerDiv = document.createElement('div');
periodTimerDiv.className = 'period-timer';
document.querySelector('nav').querySelector('.time').after(periodTimerDiv);

const schedule = window.periodSchedule || [];

function parseHM(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

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

function getTodaySchedule() {
  const day = new Date().getDay(); 
  if (day === 1 || day === 4) return schedulesByDay.mon_thurs;
  if (day === 2 || day === 3 || day === 5) return schedulesByDay.tue_wed_fri;
  return [];
}



function getCurrentPeriod(now) {
  const schedule = getTodaySchedule();
  for (const period of schedule) {
    const { h: sh, m: sm } = parseHM(period.start);
    const { h: eh, m: em } = parseHM(period.end);
    const startDate = new Date(now);
    startDate.setHours(sh, sm, 0, 0);
    const endDate = new Date(now);
    endDate.setHours(eh, em, 0, 0);
    if (now >= startDate && now < endDate) return { period, startDate, endDate };
  }
  return null;
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
  const show = localStorage.getItem('showPeriodTimer') === 'true';
if (!show) {
  periodTimerDiv.style.visibility = 'hidden'; // hides text but keeps space
  periodTimerDiv.textContent = '';            // clears any text inside
  return;
}
  periodTimerDiv.style.display = 'inline-block';

  const now = new Date();
  const schedule = getTodaySchedule();

  if (!schedule || schedule.length === 0) {
    periodTimerDiv.textContent = 'No current period | No time to start | No time to end';
    return;
  }

  // Find current period
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

  // If no current period, find next upcoming period
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
    // No next period either (day over)
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
  48: { icon: 'fa-smog', color: '#9ca3af', desc: 'Rime Fog' },
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

function getWeatherIconDesc(code) {
  return weatherCodeMap[code] || { icon: 'fa-question', color: '#888', desc: 'Unknown' };
}

const weatherDiv = document.querySelector("nav .weather");

function renderWeather(f, code, w) {
  const { icon, color, desc } = getWeatherIconDesc(code);
  weatherDiv.innerHTML = `
    <i class="fas ${icon} icon" style="color:${color}" aria-label="${desc} weather"></i>
    <div class="temp">${f}°F</div>
    <div class="desc">${desc}</div>
    <div class="wind"><i class="fas fa-wind"></i> ${w} mph</div>
  `;
}

function fetchWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&windspeed_unit=mph`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => {
      if (!d.current_weather) throw new Error();
      const c = d.current_weather.temperature;
      renderWeather(Math.round(c * 9 / 5 + 32), d.current_weather.weathercode, Math.round(d.current_weather.windspeed));
      localStorage.setItem('locationAccepted', 'true');
    })
    .catch(() => { weatherDiv.innerHTML = `<button id="enable-location-btn">Enable Location For Weather</button>`; });
}

function requestLocation() {
  if (!navigator.geolocation) return weatherDiv.textContent = "Geolocation not supported";
  weatherDiv.textContent = 'Requesting location...';
  navigator.geolocation.getCurrentPosition(
    p => fetchWeather(p.coords.latitude, p.coords.longitude),
    () => {
      weatherDiv.innerHTML = `<button id="enable-location-btn">Enable Location For Weather</button>`;
      localStorage.removeItem('locationAccepted');
    },
    { timeout: 10000 }
  );
}

// Add event listener to the button
document.getElementById('enable-location-btn').addEventListener('click', requestLocation);

// If location was previously accepted, automatically request weather
if (localStorage.getItem('locationAccepted') === 'true') {
  requestLocation();
}