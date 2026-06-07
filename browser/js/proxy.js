const WISP_QUERY_OVERRIDE = new URLSearchParams(window.location.search).get('wisp')
const WISP_WORKER_BASE = 'https://wisp.cgamz.online'
const DEFAULT_WISP_REGION = 'us-east-1'
const WISP_CONNECT_TIMEOUT_MS = 15000
const WISP_PING_TIMEOUT_MS = 8000
const WISP_BACKGROUND_PING_MS = 5000

const WISP_SERVERS = [
  { id: 'us-east-1', label: 'US East 1', location: 'Virginia, USA',     flagSrc: 'img/flags/us.png', lat: 37.4316,  lon: -78.6569  },
  { id: 'us-east-2', label: 'US East 2', location: 'Ohio, USA',         flagSrc: 'img/flags/us.png', lat: 40.4173,  lon: -82.9071  },
  { id: 'us-west',   label: 'US West',   location: 'Oregon, USA',       flagSrc: 'img/flags/us.png', lat: 43.8041,  lon: -120.5542 },
  { id: 'europe',    label: 'Europe',    location: 'Frankfurt, Germany', flagSrc: 'img/flags/eu.png', lat: 50.1109,  lon: 8.6821    },
  { id: 'asia',      label: 'Asia',      location: 'Singapore',         flagSrc: 'img/flags/sg.png', lat: 1.3521,   lon: 103.8198  },
]

const resolvedWispUrlCache = new Map()

async function resolveWispUrl(serverId) {
  if (WISP_QUERY_OVERRIDE) return WISP_QUERY_OVERRIDE
  if (resolvedWispUrlCache.has(serverId)) return resolvedWispUrlCache.get(serverId)

  try {
    const res = await fetch(`${WISP_WORKER_BASE}/${serverId}/`, { signal: AbortSignal.timeout(4000) })
    const data = await res.json()
    if (data && data.redirect) {
      resolvedWispUrlCache.set(serverId, data.redirect)
      return data.redirect
    }
    const headerUrl = res.headers.get('X-Wisp-Redirect')
    if (headerUrl) {
      resolvedWispUrlCache.set(serverId, headerUrl)
      return headerUrl
    }
  } catch (e) {}

  return null
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
    return getConfiguredWispServers()
      .map(s => ({ server: s, dist: geoDistanceKm(latitude, longitude, s.lat, s.lon) }))
      .sort((a, b) => a.dist - b.dist)[0].server
  } catch (e) {
    return null
  }
}

let uvReady = false
let baremuxReady = false
let baremuxConnection = null
let pendingInitPromise = null
let wispPreloadSocket = null
let currentWispServerId = WISP_SERVERS[0] ? WISP_SERVERS[0].id : ''
let currentWispLatencyMs = null
let bestWispServerId = ''
let currentWispStatus = 'connecting'
let wispUiReady = false
let proxyTransportGeneration = 0
let wispBackgroundPingIntervalId = null
let wispBackgroundPingInFlight = false
const wispPingByServerId = new Map()

function _wispBar() { return document.getElementById('wisp-bar') }
function _wispLabel() { return document.getElementById('wisp-bar-label') }
function _wispSwitcherButton() { return document.getElementById('wisp-switcher-btn') }
function _wispSwitcherMenu() { return document.getElementById('wisp-switcher-menu') }
function _wispSwitcherCurrent() { return document.getElementById('wisp-switcher-current') }
function _wispSwitcherIcon() { return document.getElementById('wisp-switcher-icon') }

function getConfiguredWispServers() {
  return WISP_SERVERS
}

function getWispServerById(id) {
  return getConfiguredWispServers().find(server => server.id === id) || null
}

function getCurrentWispServer() {
  return getWispServerById(currentWispServerId) || getConfiguredWispServers()[0] || null
}

function formatWispLatency(latencyMs) {
  return Number.isFinite(latencyMs) ? `${Math.round(latencyMs)} ms` : 'pending'
}

function setWispStatus(state, details = {}) {
  const bar = _wispBar()
  const label = _wispLabel()
  const server = details.server || getCurrentWispServer()
  const serverLabel = details.serverLabel || (server ? server.label : 'server')
  const latency = details.latency ?? currentWispLatencyMs

  currentWispStatus = state
  if (!bar) return

  bar.classList.remove('wisp-ok', 'wisp-err', 'wisp-connecting', 'wisp-disconnecting')
  if (state === 'connecting') {
    bar.classList.add('wisp-connecting')
    if (label) label.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting to ${serverLabel}...`
  } else if (state === 'disconnecting') {
    bar.classList.add('wisp-disconnecting')
    if (label) label.innerHTML = `<i class="fa-solid fa-plug"></i> Disconnecting from ${serverLabel}...`
  } else if (state === 'ok') {
    bar.classList.add('wisp-ok')
    if (label) label.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected: ${serverLabel}${Number.isFinite(latency) ? ` (${formatWispLatency(latency)})` : ''}`
  } else if (state === 'err') {
    bar.classList.add('wisp-err')
    if (label) label.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Couldn't connect to ${serverLabel}`
  }
}

function updateWispSwitcherButton() {
  const button = _wispSwitcherButton()
  const currentLabel = _wispSwitcherCurrent()
  const currentIcon = _wispSwitcherIcon()
  const server = getCurrentWispServer()
  if (!button || !currentLabel || !currentIcon || !server) return

  currentLabel.textContent = server.label
  currentIcon.className = 'wisp-switcher-icon wisp-flag'
  currentIcon.style.backgroundImage = server.flagSrc ? `url('${server.flagSrc}')` : ''
}

function renderWispSwitcherMenu() {
  const menu = _wispSwitcherMenu()
  if (!menu) return

  const servers = getConfiguredWispServers()
  const items = servers.map(server => {
    const ping = wispPingByServerId.get(server.id)
    const pingLabel = ping && ping.ok ? formatWispLatency(ping.latency) : ping && !ping.ok ? 'offline' : 'measuring'
    const activeClass = server.id === currentWispServerId ? ' is-active' : ''
    const badge = server.id === bestWispServerId ? '<span class="wisp-switcher-badge">Best</span>' : ''

    return `
      <button class="wisp-switcher-item${activeClass}" type="button" data-wisp-server-id="${server.id}">
        <span class="wisp-switcher-item-main">
          <span class="wisp-switcher-item-icon wisp-flag" aria-hidden="true" style="background-image:url('${server.flagSrc || ''}')"></span>
          <span class="wisp-switcher-item-copy">
            <span class="wisp-switcher-item-name">${server.label}</span>
            <span class="wisp-switcher-item-location">${server.location || ''}</span>
          </span>
        </span>
        <span class="wisp-switcher-item-meta">
          ${badge}
          <span class="wisp-switcher-ping">${pingLabel}</span>
        </span>
      </button>
    `
  }).join('')

  menu.innerHTML = `
    <div class="wisp-switcher-menu-head">
      <div class="wisp-switcher-menu-title">Wisp Regions</div>
    </div>
    ${items}
  `

  menu.querySelectorAll('[data-wisp-server-id]').forEach(item => {
    item.addEventListener('click', async event => {
      event.stopPropagation()
      const serverId = item.getAttribute('data-wisp-server-id')
      await switchWispServer(serverId)
    })
  })
}

function showWispSwitcherMenu() {
  const button = _wispSwitcherButton()
  const menu = _wispSwitcherMenu()
  if (!button || !menu) return
  renderWispSwitcherMenu()
  menu.hidden = false
  button.setAttribute('aria-expanded', 'true')
}

function hideWispSwitcherMenu() {
  const button = _wispSwitcherButton()
  const menu = _wispSwitcherMenu()
  if (!button || !menu) return
  menu.hidden = true
  button.setAttribute('aria-expanded', 'false')
}

function toggleWispSwitcherMenu() {
  const menu = _wispSwitcherMenu()
  if (!menu) return
  if (menu.hidden) showWispSwitcherMenu()
  else hideWispSwitcherMenu()
}

function initWispUi() {
  if (wispUiReady) return
  const button = _wispSwitcherButton()
  const menu = _wispSwitcherMenu()
  if (!button || !menu) return

  button.addEventListener('click', event => {
    event.stopPropagation()
    toggleWispSwitcherMenu()
  })

  document.addEventListener('click', event => {
    if (menu.hidden) return
    if (menu.contains(event.target) || button.contains(event.target)) return
    hideWispSwitcherMenu()
  })

  updateWispSwitcherButton()
  renderWispSwitcherMenu()
  wispUiReady = true
}

async function getWispUrl(serverId) {
  const id = serverId || currentWispServerId
  const resolved = await resolveWispUrl(id)
  if (resolved) return resolved
  return `wss://wisp-${id}.cgamz.online/`
}

function closeSocket(socket) {
  if (!socket) return Promise.resolve()

  return new Promise(resolve => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      resolve()
    }

    try {
      if (socket.readyState === WebSocket.CLOSED) {
        finish()
        return
      }

      socket.addEventListener('close', finish, { once: true })
      socket.close()
      window.setTimeout(finish, 1200)
    } catch (e) {
      finish()
    }
  })
}

async function measureWispServer(server, options = {}) {
  const timeoutMs = options.timeoutMs || WISP_PING_TIMEOUT_MS
  const keepOpen = !!options.keepOpen

  return new Promise(async resolve => {
    if (!server) {
      resolve({ ok: false, latency: null, socket: null, server })
      return
    }

    const wispUrl = await getWispUrl(server.id)

    if (!wispUrl) {
      resolve({ ok: false, latency: null, socket: null, server })
      return
    }

    const startedAt = performance.now()
    let settled = false
    let ws = null

    const finalize = result => {
      if (settled) return
      settled = true
      if (!keepOpen && ws) {
        try {
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close()
        } catch (e) {}
      }
      resolve({ ...result, server, socket: keepOpen && result.ok ? ws : null })
    }

    try {
      ws = new WebSocket(wispUrl)
      ws.binaryType = 'arraybuffer'

      const timeout = window.setTimeout(() => {
        finalize({ ok: false, latency: null })
      }, timeoutMs)

      ws.addEventListener('open', () => {
        window.clearTimeout(timeout)
        finalize({ ok: true, latency: Math.max(1, Math.round(performance.now() - startedAt)) })
      }, { once: true })

      ws.addEventListener('error', () => {
        window.clearTimeout(timeout)
        finalize({ ok: false, latency: null })
      }, { once: true })
    } catch (e) {
      finalize({ ok: false, latency: null })
    }
  })
}

async function preloadWispConnection() {
  const server = getCurrentWispServer()
  const serverId = server ? server.id : ''
  setWispStatus('connecting', { server })

  try {
    const result = await measureWispServer(server, {
      keepOpen: true,
      timeoutMs: WISP_CONNECT_TIMEOUT_MS,
    })

    if (!result.ok || !result.socket) {
      currentWispLatencyMs = null
      setWispStatus('err', { server })
      renderWispSwitcherMenu()
      return false
    }

    if (currentWispServerId !== serverId) {
      await closeSocket(result.socket)
      return false
    }

    currentWispLatencyMs = result.latency
    wispPingByServerId.set(server.id, { ok: true, latency: result.latency })
    wispPreloadSocket = result.socket
    wispPreloadSocket.addEventListener('close', () => {
      if (wispPreloadSocket === result.socket) wispPreloadSocket = null
    }, { once: true })
    setWispStatus('ok', { server, latency: result.latency })
    renderWispSwitcherMenu()
    return true
  } catch (e) {
    console.warn('Wisp preload failed:', e)
    currentWispLatencyMs = null
    setWispStatus('err', { server })
    renderWispSwitcherMenu()
    return false
  }
}

async function disconnectCurrentWispConnection() {
  const server = getCurrentWispServer()
  if (wispPreloadSocket || baremuxReady || pendingInitPromise) {
    setWispStatus('disconnecting', { server })
  }

  const socketToClose = wispPreloadSocket
  wispPreloadSocket = null
  await closeSocket(socketToClose)

  proxyTransportGeneration += 1
  baremuxReady = false
  baremuxConnection = null
  pendingInitPromise = null
}

async function pingConfiguredWispServers() {
  const servers = getConfiguredWispServers()
  if (!servers.length) return null

  const results = await Promise.all(servers.map(server => measureWispServer(server)))
  results.forEach(result => {
    wispPingByServerId.set(result.server.id, {
      ok: result.ok,
      latency: result.latency,
    })
  })

  const best = results
    .filter(result => result.ok && Number.isFinite(result.latency))
    .sort((a, b) => a.latency - b.latency)[0] || null

  bestWispServerId = best ? best.server.id : ''
  renderWispSwitcherMenu()
  return best
}

async function refreshWispPingSnapshot() {
  if (wispBackgroundPingInFlight) return null
  wispBackgroundPingInFlight = true

  try {
    const best = await pingConfiguredWispServers()
    const currentPing = wispPingByServerId.get(currentWispServerId)

    if (currentPing && currentPing.ok && Number.isFinite(currentPing.latency)) {
      currentWispLatencyMs = currentPing.latency
      if (currentWispStatus === 'ok') {
        setWispStatus('ok', {
          server: getCurrentWispServer(),
          latency: currentPing.latency,
        })
      }
    }

    return best
  } finally {
    wispBackgroundPingInFlight = false
  }
}

function startBackgroundWispPingLoop() {
  if (wispBackgroundPingIntervalId) return

  wispBackgroundPingIntervalId = window.setInterval(() => {
    refreshWispPingSnapshot().catch(error => {
      console.warn('Background Wisp ping refresh failed:', error)
    })
  }, WISP_BACKGROUND_PING_MS)
}

async function chooseBestWispServer() {
  const geo = WISP_QUERY_OVERRIDE ? null : await getClosestWispServer()
  if (geo) {
    currentWispServerId = geo.id
    bestWispServerId = geo.id
    currentWispLatencyMs = null
    updateWispSwitcherButton()
    renderWispSwitcherMenu()
    return geo
  }

  const best = await refreshWispPingSnapshot()
  if (best && best.server) {
    currentWispServerId = best.server.id
    currentWispLatencyMs = best.latency
  } else {
    const fallback = getConfiguredWispServers()[0] || null
    currentWispServerId = fallback ? fallback.id : ''
    currentWispLatencyMs = null
  }

  updateWispSwitcherButton()
  renderWispSwitcherMenu()
  return getCurrentWispServer()
}

function currentProxyAddress() {
  const input = document.getElementById('url-input')
  const value = typeof currentAddressValue === 'function'
    ? currentAddressValue()
    : ((input && input.value) || '').trim() || 'newtab'

  if (!value || value === 'newtab' || /^cg:\/\//i.test(value)) return ''
  return value
}

function reconnectActiveProxyPage(url) {
  if (!url) return

  const frame = document.getElementById('page-frame')
  const newTabPage = document.getElementById('new-tab-page')
  const statusText = document.getElementById('status-text')

  if (newTabPage) newTabPage.style.display = 'none'
  if (frame) frame.style.display = 'none'
  if (typeof showLoadingScreen === 'function') showLoadingScreen(url)
  if (frame) frame.src = getProxyUrl(url)
  if (statusText) statusText.textContent = `Switching server to ${getCurrentWispServer().label}...`
}

async function switchWispServer(serverId) {
  const targetServer = getWispServerById(serverId)
  if (!targetServer) return false

  const sameServer = targetServer.id === currentWispServerId
  const pageUrl = currentProxyAddress()

  hideWispSwitcherMenu()
  currentWispServerId = targetServer.id
  currentWispLatencyMs = wispPingByServerId.get(targetServer.id)?.latency ?? null
  updateWispSwitcherButton()
  renderWispSwitcherMenu()

  if (sameServer && wispPreloadSocket && baremuxReady) return true

  await disconnectCurrentWispConnection()
  const connected = await preloadWispConnection()
  if (!connected) return false

  const ready = await initBaremux()
  if (ready && pageUrl) reconnectActiveProxyPage(pageUrl)
  return ready
}

async function initUv() {
  if (uvReady) return true
  if (!('serviceWorker' in navigator)) return false
  if (typeof __uv$config === 'undefined') return false

  try {
    await navigator.serviceWorker.register('/uv/sw.js', { scope: '/uv/' })
    uvReady = true
    return true
  } catch (e) {
    console.warn('UV service worker registration failed:', e)
    return false
  }
}

async function initBaremux() {
  if (baremuxReady) return true
  if (pendingInitPromise) return pendingInitPromise

  const generation = proxyTransportGeneration
  pendingInitPromise = (async () => {
    if (!window.BareMux) {
      console.warn('BareMux not loaded')
      setWispStatus('err')
      return false
    }

    try {
      const wispUrl = await getWispUrl()
      baremuxConnection = new BareMux.BareMuxConnection('/baremux/worker.js')
      await baremuxConnection.setTransport('/libcurl/index.mjs', [{ wisp: wispUrl }])
      if (generation !== proxyTransportGeneration) return false
      baremuxReady = !!(await baremuxConnection.getTransport())
      if (!baremuxReady) setWispStatus('err')
      return baremuxReady
    } catch (e) {
      console.warn('BareMux transport initialization failed:', e)
      setWispStatus('err')
      return false
    } finally {
      pendingInitPromise = null
    }
  })()

  return pendingInitPromise
}

async function initProxyStack() {
  await initUv()
  await initBaremux()
}

function getProxyUrl(url) {
  if (!uvReady || typeof __uv$config === 'undefined') return url
  return __uv$config.prefix + __uv$config.encodeUrl(url)
}

function getRealUrlFromProxy(maybeProxyUrl) {
  if (typeof __uv$config === 'undefined') return maybeProxyUrl
  try {
    const absolute = new URL(maybeProxyUrl, window.location.origin)
    if (absolute.pathname.startsWith(__uv$config.prefix)) {
      const encoded = absolute.pathname.slice(__uv$config.prefix.length) + absolute.search + absolute.hash
      return __uv$config.decodeUrl(encoded)
    }
  } catch (e) {}
  return maybeProxyUrl
}

function getWispConnectionSummary() {
  const server = getCurrentWispServer()
  return {
    id: server ? server.id : '',
    label: server ? server.label : 'Unknown',
    latency: currentWispLatencyMs,
    latencyText: formatWispLatency(currentWispLatencyMs),
    status: currentWispStatus,
  }
}

window.getWispConnectionSummary = getWispConnectionSummary

document.addEventListener('DOMContentLoaded', async () => {
  initWispUi()
  await chooseBestWispServer()
  await preloadWispConnection()
  await initProxyStack()
  startBackgroundWispPingLoop()
})