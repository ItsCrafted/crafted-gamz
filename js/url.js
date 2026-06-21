const LOCAL_PAGES = {
  games: 'pages/games.html',
  movies: 'pages/movies.html',
  ai: 'pages/ai.html',
  about: 'pages/about.html',
  settings: 'pages/settings.html',
  account: 'pages/account.html',
  vms: 'pages/vms.html',
  chat: 'pages/chat.html',
}

const lockIcon = document.getElementById('lock-icon')
const lockIconBtn = document.getElementById('lock-icon-btn')
const connectionPopup = document.getElementById('connection-popup')
const connectionPopupTitle = document.getElementById('connection-popup-title')
const connectionPopupDesc = document.getElementById('connection-popup-desc')
const urlInput = document.getElementById('url-input')

function resolveCgUrl(input) {
  if (!/^cg:\/\//i.test(input)) return null
  const key = input.replace(/^cg:\/\//i, '').trim().toLowerCase()
  const target = LOCAL_PAGES[key]
  if (!target) return null
  return { key, target, display: `cg://${key}` }
}

function getDisplayUrl(rawUrl) {
  try {
    const absolute = new URL(rawUrl, window.location.origin)
    const entry = Object.entries(LOCAL_PAGES).find(([, path]) => absolute.pathname === path)
    if (entry) return `cg://${entry[0]}`
  } catch (e) {}
  return rawUrl
}

function currentAddressValue() {
  return (urlInput.value || '').trim() || 'newtab'
}

function setAddressIndicator(url) {
  if (url === 'newtab') { lockIcon.className = 'fa-solid fa-circle-info lock-icon'; return }
  if (/^cg:\/\//i.test(url)) { lockIcon.className = 'fa-solid fa-hard-drive lock-icon secure'; return }
  if (url.startsWith('https://')) { lockIcon.className = 'fa-solid fa-shield-halved lock-icon secure'; return }
  lockIcon.className = 'fa-solid fa-triangle-exclamation lock-icon'
}

function getConnectionDetails(url) {
  if (url === 'newtab') return { title: 'New Tab', desc: 'This is a local new-tab screen. No website connection is active.' }
  if (/^cg:\/\//i.test(url)) return { title: 'Local System Page', desc: 'This page is loaded from local files and is not proxied.' }
  if (url.startsWith('https://')) {
    const wisp = typeof getWispConnectionSummary === 'function' ? getWispConnectionSummary() : null
    const proxyDetails = wisp ? ` Proxied traffic is currently routed through ${wisp.label}${Number.isFinite(wisp.latency) ? ` (${wisp.latencyText})` : ''}.` : ''
    return { title: 'Secure HTTPS', desc: `Your connection uses HTTPS encryption.${proxyDetails}` }
  }
  return { title: 'Not Fully Secure', desc: 'This page is not using HTTPS encryption. Avoid entering sensitive information.' }
}

function hideConnectionPopup() { connectionPopup.hidden = true }

function showConnectionPopup() {
  const details = getConnectionDetails(currentAddressValue())
  connectionPopupTitle.textContent = details.title
  connectionPopupDesc.textContent = details.desc
  connectionPopup.hidden = false
}

function toggleConnectionPopup() {
  if (connectionPopup.hidden) showConnectionPopup()
  else hideConnectionPopup()
}

lockIconBtn.addEventListener('click', event => {
  event.stopPropagation()
  toggleConnectionPopup()
})

document.addEventListener('click', event => {
  if (connectionPopup.hidden) return
  if (connectionPopup.contains(event.target) || lockIconBtn.contains(event.target)) return
  hideConnectionPopup()
})
