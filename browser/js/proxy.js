const DEFAULT_WISP = 'wss://pale-pen-crafted-gamz-b0390771.koyeb.app/'
let uvReady = false
let baremuxReady = false
let baremuxConnection = null
let pendingInitPromise = null

function getWispUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('wisp') || DEFAULT_WISP
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
    if (!window.BareMux) { console.warn('BareMux not loaded'); return false }
    try {
      baremuxConnection = new BareMux.BareMuxConnection('/baremux/worker.js')
      await baremuxConnection.setTransport('/libcurl/index.mjs', [{ wisp: getWispUrl() }])
      baremuxReady = !!(await baremuxConnection.getTransport())
      return baremuxReady
    } catch (e) {
      console.warn('BareMux transport initialization failed:', e)
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