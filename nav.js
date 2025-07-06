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
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    z-index: 999;
    color: white;
  }

  nav .time {
    flex: 1;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    user-select: none;
    font-variant-numeric: tabular-nums;
  }

  nav .links {
    flex: 3;
    text-align: center;
  }

  nav .links a {
    display: inline-block;
    margin: 0 12px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    position: relative;
    transition: color 0.2s ease;
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

nav .weather {
  flex: 1;
  font-size: 16px;
  text-align: right;
  user-select: none;
  padding-right: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
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

`;
document.head.appendChild(style);

// Inject nav HTML
const navHTML = `
  <nav>
    <div class="time">--:--:-- --</div>
    <div class="links">
      <a href="main.html"><i class="fas fa-house"></i> Home</a>
      <a href="search.html"><i class="fas fa-magnifying-glass"></i> Search</a>
      <a href="games.html"><i class="fas fa-gamepad"></i> Games</a>
      <a href="apps.html"><i class="fas fa-th-large"></i> Apps</a>
      <a href="tools.html"><i class="fas fa-wrench"></i> Tools</a>
      <a href="transfer.html"><i class="fas fa-share"></i> Transfer</a>
      <a href="ai.html"><i class="fas fa-robot"></i> AI</a>
      <a href="partners.html"><i class="fas fa-handshake"></i> Partners</a>
    </div>
<div class="weather">
  <i class="fas fa-sun icon" style="color:#f6d365" aria-label="Clear weather"></i>
  <div class="temp">72°F</div>
  <div class="desc">Clear</div>
  <div class="wind"><i class="fas fa-wind"></i> 5 mph</div>
</div>

  </nav>
`;
document.body.insertAdjacentHTML("afterbegin", navHTML);

// Highlight active link
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll("nav .links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Update time in 12-hour format with seconds and AM/PM
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

// Map Open-Meteo weather codes to Font Awesome icons + colors + descriptions
const weatherCodeMap = {
  0:  { icon: 'fa-sun',          color: '#f6d365', desc: 'Clear' },
  1:  { icon: 'fa-cloud-sun',    color: '#f6d365', desc: 'Mainly Clear' },
  2:  { icon: 'fa-cloud-sun',    color: '#d4d4d8', desc: 'Partly Cloudy' },
  3:  { icon: 'fa-cloud',        color: '#9ca3af', desc: 'Overcast' },
  45: { icon: 'fa-smog',         color: '#9ca3af', desc: 'Fog' },
  48: { icon: 'fa-smog',         color: '#9ca3af', desc: 'Rime Fog' },
  51: { icon: 'fa-cloud-rain',   color: '#3b82f6', desc: 'Light Drizzle' },
  53: { icon: 'fa-cloud-rain',   color: '#2563eb', desc: 'Moderate Drizzle' },
  55: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Dense Drizzle' },
  56: { icon: 'fa-cloud-meatball',color: '#3b82f6', desc: 'Light Freezing Drizzle' },
  57: { icon: 'fa-cloud-meatball',color: '#2563eb', desc: 'Dense Freezing Drizzle' },
  61: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Slight Rain' },
  63: { icon: 'fa-cloud-showers-heavy', color: '#1d4ed8', desc: 'Moderate Rain' },
  65: { icon: 'fa-cloud-showers-heavy', color: '#1e3a8a', desc: 'Heavy Rain' },
  66: { icon: 'fa-snowflake',    color: '#3b82f6', desc: 'Light Freezing Rain' },
  67: { icon: 'fa-snowflake',    color: '#2563eb', desc: 'Heavy Freezing Rain' },
  71: { icon: 'fa-snowflake',    color: '#e0f2fe', desc: 'Slight Snow Fall' },
  73: { icon: 'fa-snowflake',    color: '#bae6fd', desc: 'Moderate Snow Fall' },
  75: { icon: 'fa-snowflake',    color: '#7dd3fc', desc: 'Heavy Snow Fall' },
  77: { icon: 'fa-snowflake',    color: '#38bdf8', desc: 'Snow Grains' },
  80: { icon: 'fa-cloud-showers-heavy', color: '#3b82f6', desc: 'Slight Rain Showers' },
  81: { icon: 'fa-cloud-showers-heavy', color: '#2563eb', desc: 'Moderate Rain Showers' },
  82: { icon: 'fa-cloud-showers-heavy', color: '#1e40af', desc: 'Violent Rain Showers' },
  85: { icon: 'fa-snowflake',    color: '#3b82f6', desc: 'Slight Snow Showers' },
  86: { icon: 'fa-snowflake',    color: '#2563eb', desc: 'Heavy Snow Showers' },
  95: { icon: 'fa-cloud-bolt',   color: '#facc15', desc: 'Thunderstorm' },
  96: { icon: 'fa-cloud-bolt',   color: '#eab308', desc: 'Thunderstorm with hail' },
  99: { icon: 'fa-cloud-bolt',   color: '#ca8a04', desc: 'Thunderstorm with heavy hail' },
};

// Helper: get icon info or fallback
function getWeatherIconDesc(code) {
  return weatherCodeMap[code] || { icon: 'fa-question', color: '#888', desc: 'Unknown' };
}

// Reference to weather div
const weatherDiv = document.querySelector("nav .weather");

// Render weather info with FontAwesome icons and colors, inline horizontally
function renderWeather(fahrenheit, code, windSpeed) {
  const { icon, color, desc } = getWeatherIconDesc(code);
  weatherDiv.innerHTML = `
    <i class="fas ${icon} icon" style="color:${color}" aria-label="${desc} weather"></i>
    <div class="temp">${fahrenheit}°F</div>
    <div class="desc">${desc}</div>
    <div class="wind"><i class="fas fa-wind"></i> ${windSpeed} mph</div>
  `;
}

// Fetch weather data from Open-Meteo
function fetchWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&windspeed_unit=mph`)
    .then(res => {
      if (!res.ok) throw new Error('Weather fetch failed');
      return res.json();
    })
    .then(data => {
      if (!data.current_weather) throw new Error('No weather data');
      const celsius = data.current_weather.temperature;
      const fahrenheit = Math.round(celsius * 9 / 5 + 32);
      const code = data.current_weather.weathercode;
      const windSpeed = Math.round(data.current_weather.windspeed);
      renderWeather(fahrenheit, code, windSpeed);
      localStorage.setItem('locationAccepted', 'true');
    })
    .catch(() => {
      weatherDiv.textContent = 'Unable to get weather';
    });
}

// Request location and fetch weather
function requestLocation() {
  if (!navigator.geolocation) {
    weatherDiv.textContent = "Geolocation not supported";
    return;
  }
  weatherDiv.textContent = 'Requesting location...';
  navigator.geolocation.getCurrentPosition(
    pos => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    },
    err => {
      weatherDiv.innerHTML = `<button id="enable-location-btn">Enable Location</button>`;
      document.getElementById('enable-location-btn').onclick = requestLocation;
      localStorage.removeItem('locationAccepted');
    },
    { timeout: 10000 }
  );
}

// Check if user already accepted location and auto fetch
if (localStorage.getItem('locationAccepted') === 'true') {
  requestLocation();
} else {
  // Setup button click handler
  document.getElementById('enable-location-btn').onclick = requestLocation;
}
