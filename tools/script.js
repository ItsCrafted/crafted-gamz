// Cloak Toggle Script
const cloakToggle = document.getElementById('cloakToggle');

const savedCloak = localStorage.getItem('cloak');
if (savedCloak === '1') cloakToggle.checked = true;

cloakToggle.addEventListener('change', () => {
  localStorage.setItem('cloak', cloakToggle.checked ? '1' : '0');
});

// Particles Toggle and Color Script
const particlesToggle = document.getElementById('particlesToggle');
const particleColorInput = document.getElementById('particleColor');
const resetBtn = document.getElementById('resetColor');
const defaultColor = '#4bf9ed';

function reloadPage() {
  setTimeout(() => {
    location.reload();
  }, 150);
}

// Load stored settings
const particlesSetting = localStorage.getItem('particles');
const storedColor = localStorage.getItem('particleColor');

particlesToggle.checked = (particlesSetting !== '0');
particleColorInput.value = storedColor || '';

// Save toggle setting & reload page
particlesToggle.addEventListener('change', () => {
  localStorage.setItem('particles', particlesToggle.checked ? '1' : '0');
  reloadPage();
});

// Save color on input (validate hex)
particleColorInput.addEventListener('input', () => {
  const val = particleColorInput.value.trim().toLowerCase();
  if(/^#([0-9a-f]{6})$/.test(val)) {
    localStorage.setItem('particleColor', val);
    reloadPage();
  } else if (val === '') {
    localStorage.removeItem('particleColor');
    reloadPage();
  }
});

// Reset button clears color input and reloads
resetBtn.addEventListener('click', () => {
  particleColorInput.value = '';
  localStorage.removeItem('particleColor');
  reloadPage();
});

// IP Fetching Script
async function fetchIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    document.getElementById('ipDisplay').textContent = 'IP: ' + data.ip;
  } catch (error) {
    document.getElementById('ipDisplay').textContent = 'IP: Unable to fetch';
  }
}
fetchIP();

// Ping Script
async function ping(url) {
  const attempts = 5;
  let totalTime = 0;
  let successCount = 0;

  for (let i = 0; i < attempts; i++) {
    const start = performance.now();
    try {
      await fetch(url + '?cachebuster=' + Date.now(), { mode: 'no-cors' });
      const end = performance.now();
      totalTime += (end - start);
      successCount++;
    } catch (e) {
      // ignore errors
    }
  }
  if(successCount === 0) return null;
  return totalTime / successCount;
}

const resultEl = document.getElementById('autoPingResult');

(async () => {
  const avg = await ping('https://cgamz.site');
  if(avg === null) {
    resultEl.textContent = 'Failed to ping.';
  } else {
    resultEl.textContent = avg.toFixed(2) + ' ms (avg of 5)';
  }
})();

// Config Export/Import Script
const exportBtn = document.getElementById('configExport');
const importBtn = document.getElementById('configImport');
const fileInput = document.getElementById('configFileInput');

exportBtn.addEventListener('click', () => {
  const settings = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    settings[key] = localStorage.getItem(key);
  }
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'config.cgcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedSettings = JSON.parse(e.target.result);
      for (const key in importedSettings) {
        localStorage.setItem(key, importedSettings[key]);
      }
      alert('Settings imported! Reloading...');
      location.reload();
    } catch {
      alert('Invalid config file.');
    }
  };
  reader.readAsText(file);
});

// Presets Script
const presets = {
  google: {
    favicon: "https://www.google.com/favicon.ico",
    title: "Google"
  },
  drive: {
    favicon: "https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico",
    title: "My Drive - Google Drive" 
  },
  youtube: {
    favicon: "https://cgamz.site/tools/ytidky.png",
    title: "YouTube"
  },
  canva: {
    favicon: "https://static.canva.com/static/images/favicon.ico",
    title: "Home - Canva"
  },
  ixl: {
    favicon: "https://www.ixl.com/favicon.ico",
    title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish"
  },
  aps: {
    favicon: "https://www.aps.edu/favicon.ico",
    title: "Albuquerque Public Schools"
  },
  gclass: {
    favicon: "https://ssl.gstatic.com/classroom/favicon.png",
    title: "Classes"
  }
};

document.getElementById("presetSelect").addEventListener("change", function () {
  const selected = this.value;
  if (presets[selected]) {
    document.getElementById("disimgInput").value = presets[selected].favicon;
    document.getElementById("distxtInput").value = presets[selected].title;

    localStorage.setItem('disimg', presets[selected].favicon);
    localStorage.setItem('distxt', presets[selected].title);
    localStorage.setItem('disguise', '1');

    document.getElementById('disguiseToggle').checked = true;
  } else {
    document.getElementById("disimgInput").value = "";
    document.getElementById("distxtInput").value = "";

    localStorage.removeItem('disimg');
    localStorage.removeItem('distxt');
    localStorage.setItem('disguise', '0');

    document.getElementById('disguiseToggle').checked = false;
  }
});

document.getElementById('saveConfig').addEventListener('click', () => {
const disguiseChecked = document.getElementById('disguiseToggle').checked;
const faviconURL = document.getElementById('disimgInput').value.trim();
const tabTitle = document.getElementById('distxtInput').value.trim();

localStorage.setItem('disguise', disguiseChecked ? '1' : '0');
localStorage.setItem('disimg', faviconURL);
localStorage.setItem('distxt', tabTitle);

alert('Configuration saved!');
});

// Color Wheel Script
const colorWheel = document.getElementById('colorWheel');
const colorHex = document.getElementById('colorHex');
colorHex.value = colorWheel.value;

colorWheel.addEventListener('input', () => {
  colorHex.value = colorWheel.value.toLowerCase();
});

const periodTimerToggle = document.getElementById('periodTimerToggle');
const statusDiv = document.getElementById('status');

function updateStatus() {
  const val = localStorage.getItem('showPeriodTimer');
  const isOn = val === 'true';
  statusDiv.textContent = `Period Timer is currently: ${isOn ? 'ON' : 'OFF'}`;
  periodTimerToggle.checked = isOn;
}

// Toggle handler
periodTimerToggle.addEventListener('change', () => {
  localStorage.setItem('showPeriodTimer', periodTimerToggle.checked ? 'true' : 'false');
  updateStatus();
});

// Initialize on page load
updateStatus();

document.addEventListener('DOMContentLoaded', () => {
  const panicShowToggle = document.getElementById('panicShowToggle');
  const panicUrlInput = document.getElementById('panicUrlInput');
  const panicKeyCodeInput = document.getElementById('panicKeyCodeInput');
  const saveBtn = document.getElementById('savePanicSettings');
  const confirmation = document.getElementById('panicSaveConfirmation');

  const DEFAULT_PANIC_URL = 'https://www.google.com';
  const DEFAULT_SHOW_PANIC = 'true';
  const DEFAULT_PANIC_KEYCODE = 27;

  // Load saved settings or defaults
  const savedShow = localStorage.getItem('showPanicButton') ?? DEFAULT_SHOW_PANIC;
  const savedUrl = localStorage.getItem('panicUrl') || DEFAULT_PANIC_URL;
  const savedKeyCode = localStorage.getItem('panicKeyCode') || DEFAULT_PANIC_KEYCODE;

  panicShowToggle.checked = (savedShow === 'true');
  panicUrlInput.value = savedUrl;
  panicKeyCodeInput.value = savedKeyCode;

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('showPanicButton', panicShowToggle.checked ? 'true' : 'false');
    localStorage.setItem('panicUrl', panicUrlInput.value.trim() || DEFAULT_PANIC_URL);
    let code = parseInt(panicKeyCodeInput.value);
    if (isNaN(code) || code < 0 || code > 255) {
      alert('Please enter a valid key code between 0 and 255');
      return;
    }
    localStorage.setItem('panicKeyCode', code.toString());

    confirmation.style.display = 'block';
    setTimeout(() => {
      confirmation.style.display = 'none';
    }, 2500);
  });
});

