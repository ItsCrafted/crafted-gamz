const WISP_WORKER_BASE = 'https://wisp.cgamz.online';
const WISP_SERVERS = [
  { id: 'us-east-1', label: 'US East 1', location: 'Virginia, USA',     lat: 37.4316,  lon: -78.6569  },
  { id: 'us-east-2', label: 'US East 2', location: 'Ohio, USA',         lat: 40.4173,  lon: -82.9071  },
  { id: 'us-west',   label: 'US West',   location: 'Oregon, USA',       lat: 43.8041,  lon: -120.5542 },
  { id: 'europe',    label: 'Europe',    location: 'Frankfurt, Germany', lat: 50.1109,  lon: 8.6821    },
  { id: 'asia',      label: 'Asia',      location: 'Singapore',         lat: 1.3521,   lon: 103.8198  },
];

const resolvedWispUrlCache = new Map();

async function resolveWispUrl(serverId) {
  if (resolvedWispUrlCache.has(serverId)) return resolvedWispUrlCache.get(serverId);

  try {
    const res = await fetch(`${WISP_WORKER_BASE}/${serverId}/`, { signal: AbortSignal.timeout(4000) });
    const data = await res.json();
    if (data && data.redirect) {
      resolvedWispUrlCache.set(serverId, data.redirect);
      return data.redirect;
    }
    const headerUrl = res.headers.get('X-Wisp-Redirect');
    if (headerUrl) {
      resolvedWispUrlCache.set(serverId, headerUrl);
      return headerUrl;
    }
  } catch (e) {}

  return `wss://wisp-${serverId}.cgamz.online/`;
}

async function getWispUrl(serverId) {
  const id = serverId || 'us-east-1';
  const resolved = await resolveWispUrl(id);
  if (resolved) return resolved;
  return `wss://wisp-${id}.cgamz.online/`;
}

function geoDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function getClosestWispServer() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
    const data = await res.json()
    const { latitude, longitude } = data
    if (!latitude || !longitude) return null
    return WISP_SERVERS
      .map(s => ({ server: s, dist: geoDistanceKm(latitude, longitude, s.lat, s.lon) }))
      .sort((a, b) => a.dist - b.dist)[0].server
  } catch (e) {
    return null
  }
}

const searchInput = document.getElementById('searchInput');
const wispDropdown = document.getElementById('wispDropdown');
const wispDropdownTrigger = document.getElementById('wispDropdownTrigger');
const wispDropdownValue = document.getElementById('wispDropdownValue');
const wispDropdownMenu = document.getElementById('wispDropdownMenu');
const backendDropdown = document.getElementById('backendDropdown');
const backendDropdownTrigger = document.getElementById('backendDropdownTrigger');
const backendDropdownValue = document.getElementById('backendDropdownValue');
const backendDropdownMenu = document.getElementById('backendDropdownMenu');
const browserContainer = document.getElementById('browser-container');
const browserIframe = document.getElementById('browser-iframe');
const browserUrlInput = document.getElementById('browserUrlInput');
const mainContent = document.getElementById('main-content');
const customWispInput = document.getElementById('customWispInput');

let selectedWispServer = 'us-east-1';
let selectedBackend = 'ultraviolet';

// Populate wisp dropdown with servers
async function populateWispServers() {
  const currentValue = localStorage.getItem('wisp_server') || '';
  const isCustom = localStorage.getItem('wisp_is_custom') === 'true';

  if (isCustom && currentValue) {
    customWispInput.value = currentValue;
    selectedWispServer = 'custom';
    wispDropdownValue.textContent = 'Custom WebSocket...';
  } else {
    selectedWispServer = currentValue || 'us-east-1';
    const server = WISP_SERVERS.find(s => s.id === selectedWispServer);
    if (server) {
      wispDropdownValue.textContent = `${server.label} (${server.location})`;
    }
  }

  // Update active state in dropdown menu
  updateDropdownActiveState();

  // Populate backend dropdown
  selectedBackend = localStorage.getItem('backend') || 'ultraviolet';
  backendDropdownValue.textContent = selectedBackend.charAt(0).toUpperCase() + selectedBackend.slice(1);
  updateBackendDropdownActiveState();
}

function updateDropdownActiveState() {
  const items = wispDropdownMenu.querySelectorAll('.dropdown-item');
  items.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.value === selectedWispServer) {
      item.classList.add('active');
    }
  });
}

function updateBackendDropdownActiveState() {
  const items = backendDropdownMenu.querySelectorAll('.dropdown-item');
  items.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.value === selectedBackend) {
      item.classList.add('active');
    }
  });
}

// Handle custom dropdown toggle
wispDropdownTrigger.addEventListener('click', () => {
  wispDropdown.classList.toggle('open');
});

// Handle backend dropdown toggle
backendDropdownTrigger.addEventListener('click', () => {
  backendDropdown.classList.toggle('open');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!wispDropdown.contains(e.target)) {
    wispDropdown.classList.remove('open');
  }
  if (!backendDropdown.contains(e.target)) {
    backendDropdown.classList.remove('open');
  }
});

// Handle dropdown item selection
wispDropdownMenu.addEventListener('click', async (e) => {
  const item = e.target.closest('.dropdown-item');
  if (!item) return;

  const value = item.dataset.value;
  selectedWispServer = value;
  wispDropdown.classList.remove('open');

  const customModal = document.getElementById('customWispModal');

  if (value === 'custom') {
    customModal.style.display = 'block';
    customWispInput.focus();
    wispDropdownValue.textContent = 'Custom WebSocket...';
  } else {
    customModal.style.display = 'none';
    const server = WISP_SERVERS.find(s => s.id === value);
    if (server) {
      wispDropdownValue.textContent = `${server.label} (${server.location})`;
      const wispUrl = await getWispUrl(value);
      localStorage.setItem('wisp_server', wispUrl);
      localStorage.setItem('wisp_is_custom', 'false');
    }
  }

  updateDropdownActiveState();
});

// Handle backend dropdown item selection
backendDropdownMenu.addEventListener('click', (e) => {
  const item = e.target.closest('.dropdown-item');
  if (!item) return;

  const value = item.dataset.value;
  selectedBackend = value;
  backendDropdown.classList.remove('open');
  backendDropdownValue.textContent = value.charAt(0).toUpperCase() + value.slice(1);
  localStorage.setItem('backend', value);
  updateBackendDropdownActiveState();
});

// Handle save custom wisp
document.getElementById('saveCustomWisp').addEventListener('click', () => {
  const customUrl = customWispInput.value.trim();
  if (customUrl) {
    localStorage.setItem('wisp_server', customUrl);
    localStorage.setItem('wisp_is_custom', 'true');
    document.getElementById('customWispModal').style.display = 'none';
  }
});

// Handle cancel custom wisp
document.getElementById('cancelCustomWisp').addEventListener('click', () => {
  document.getElementById('customWispModal').style.display = 'none';
  selectedWispServer = localStorage.getItem('wisp_server') || 'us-east-1';
  const server = WISP_SERVERS.find(s => s.id === selectedWispServer);
  if (server) {
    wispDropdownValue.textContent = `${server.label} (${server.location})`;
  }
  updateDropdownActiveState();
});

// Initialize
populateWispServers();

        function search() {
            let input = searchInput.value.trim();
            if (!input) return;

            let url = input;

            if (!url.includes(".") || url.includes(" ")) {
                url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
            } else {
                if (!url.startsWith("http://") && !url.startsWith("https://")) {
                    url = "https://" + url;
                }
            }

            navigate(url);
        }

        async function navigate(url) {
            let wisp;
            const isCustom = localStorage.getItem('wisp_is_custom') === 'true';

            if (isCustom) {
                wisp = localStorage.getItem('wisp_server') || customWispInput.value.trim();
            } else {
                const serverId = selectedWispServer || 'us-east-1';
                wisp = await getWispUrl(serverId);
            }

            const backend = selectedBackend;

            const searcherUrl = `searcher.html?q=${encodeURIComponent(url)}&wisp=${encodeURIComponent(wisp)}&backend=${encodeURIComponent(backend)}`;

            browserIframe.src = searcherUrl;
            browserUrlInput.value = url;

            mainContent.style.display = 'none';
            browserContainer.classList.add('active');
        }

        function navigateFromBar() {
            let input = browserUrlInput.value.trim();
            if (!input) return;

            let url = input;
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                if (url.includes(".")) {
                    url = "https://" + url;
                } else {
                    url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
                }
            }

            navigate(url);
        }

        function goBack() {
            browserContainer.classList.remove('active');
            browserIframe.src = '';
            mainContent.style.display = 'flex';
            searchInput.value = '';
            browserUrlInput.value = '';
        }

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                search();
            }
        });

        browserUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                navigateFromBar();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && browserContainer.classList.contains('active')) {
                goBack();
            }
        });