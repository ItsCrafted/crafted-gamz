const DEFAULT_WISP = 'wss://pale-pen-crafted-gamz-b0390771.koyeb.app/'
let uvReady = false
let baremuxReady = false
let baremuxConnection = null
let pendingInitPromise = null
let wispPreloadSocket = null

function _wispBar()   { return document.getElementById('wisp-bar') }
function _wispLabel() { return document.getElementById('wisp-bar-label') }

function setWispStatus(state) {
  const bar = _wispBar(), label = _wispLabel()
  if (!bar) return
  bar.classList.remove('wisp-ok', 'wisp-err', 'wisp-connecting')
  if (state === 'connecting') {
    bar.classList.add('wisp-connecting')
    if (label) label.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting To Server…'
  } else if (state === 'ok') {
    bar.classList.add('wisp-ok')
    if (label) label.innerHTML = '<i class="fa-solid fa-circle-check"></i> Connected To Server.'
  } else if (state === 'err') {
    bar.classList.add('wisp-err')
    if (label) label.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Couldn\'t connect to server'
  }
}

function getWispUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('wisp') || DEFAULT_WISP
}

function preloadWispConnection() {
  return new Promise(resolve => {
    setWispStatus('connecting')
    try {
      const ws = new WebSocket(getWispUrl())
      ws.binaryType = 'arraybuffer'
      wispPreloadSocket = ws

      const timeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close()
          setWispStatus('err')
          resolve(false)
        }
      }, 60000)

      ws.addEventListener('open', () => {
        clearTimeout(timeout)
        setWispStatus('ok')
        resolve(true)
      })

      ws.addEventListener('error', () => {
        clearTimeout(timeout)
        setWispStatus('err')
        resolve(false)
      })

      ws.addEventListener('close', () => {
        if (wispPreloadSocket === ws) wispPreloadSocket = null
      })
    } catch (e) {
      console.warn('Wisp preload failed:', e)
      setWispStatus('err')
      resolve(false)
    }
  })
}

async function initUv() {
  if (!('serviceWorker' in navigator)) return
  if (typeof __uv$config === 'undefined') return
  try {
    await navigator.serviceWorker.register('/uv/sw.js', { scope: '/uv/' })
    uvReady = true
  } catch (e) {
    console.warn('UV service worker registration failed:', e)
  }
}

async function initBaremux() {
  if (baremuxReady) return true
  if (pendingInitPromise) return pendingInitPromise
  pendingInitPromise = (async () => {
    if (!window.BareMux) { console.warn('BareMux not loaded'); setWispStatus('err'); return false }
    try {
      baremuxConnection = new BareMux.BareMuxConnection('/baremux/worker.js')
      await baremuxConnection.setTransport('/libcurl/index.mjs', [{ wisp: getWispUrl() }])
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

document.addEventListener('DOMContentLoaded', async () => {
  await preloadWispConnection()
  await initProxyStack()
})