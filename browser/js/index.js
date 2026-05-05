((window, factory) => {
  window.ChromeTabs = factory(window, window.Draggabilly)
})(window, (window, Draggabilly) => {
  const TAB_CONTENT_MARGIN = 9
  const TAB_CONTENT_OVERLAP_DISTANCE = 1
  const TAB_CONTENT_MIN_WIDTH = 24
  const TAB_CONTENT_MAX_WIDTH = 240
  const TAB_SIZE_SMALL = 84
  const TAB_SIZE_SMALLER = 60
  const TAB_SIZE_MINI = 48
  const NEW_TAB_BUTTON_WIDTH = 30
  const NEW_TAB_BUTTON_GAP = 8
  const noop = _ => {}
  const closest = (value, array) => {
    let closest = Infinity
    let closestIndex = -1
    array.forEach((v, i) => {
      if (Math.abs(value - v) < closest) {
        closest = Math.abs(value - v)
        closestIndex = i
      }
    })
    return closestIndex
  }
  const tabTemplate = `
    <div class="chrome-tab">
      <div class="chrome-tab-dividers"></div>
      <div class="chrome-tab-background">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"/></symbol><symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1,1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></svg>
      </div>
      <div class="chrome-tab-content">
        <div class="chrome-tab-favicon"></div>
        <div class="chrome-tab-title"></div>
        <div class="chrome-tab-drag-handle"></div>
        <div class="chrome-tab-close"></div>
      </div>
    </div>
  `
  const defaultTapProperties = { title: 'New Tab', favicon: false }
  let instanceId = 0

  class ChromeTabs {
    constructor() { this.draggabillies = [] }
    init(el) {
      this.el = el
      this.instanceId = instanceId
      this.el.setAttribute('data-chrome-tabs-instance-id', this.instanceId)
      instanceId += 1
      this.setupCustomProperties()
      this.setupStyleEl()
      this.setupEvents()
      this.layoutTabs()
      this.setupDraggabilly()
    }
    emit(eventName, data) { this.el.dispatchEvent(new CustomEvent(eventName, { detail: data })) }
    setupCustomProperties() { this.el.style.setProperty('--tab-content-margin', `${TAB_CONTENT_MARGIN}px`) }
    setupStyleEl() { this.styleEl = document.createElement('style'); this.el.appendChild(this.styleEl) }
    setupEvents() {
      window.addEventListener('resize', _ => { this.cleanUpPreviouslyDraggedTabs(); this.layoutTabs() })
      this.el.addEventListener('dblclick', event => { if ([this.el, this.tabContentEl].includes(event.target)) this.addTab() })
      this.tabEls.forEach(tabEl => this.setTabCloseEventListener(tabEl))
    }
    get tabEls() { return Array.prototype.slice.call(this.el.querySelectorAll('.chrome-tab')) }
    get tabContentEl() { return this.el.querySelector('.chrome-tabs-content') }
    get newTabButtonEl() { return this.el.querySelector('.chrome-tabs-newtab-btn') }
    get newTabButtonSpace() {
      const buttonWidth = this.newTabButtonEl ? this.newTabButtonEl.offsetWidth || NEW_TAB_BUTTON_WIDTH : NEW_TAB_BUTTON_WIDTH
      return buttonWidth + NEW_TAB_BUTTON_GAP
    }
    get tabContentWidths() {
      const numberOfTabs = this.tabEls.length
      const tabsContentWidth = Math.max(0, this.tabContentEl.clientWidth - this.newTabButtonSpace)
      const tabsCumulativeOverlappedWidth = (numberOfTabs - 1) * TAB_CONTENT_OVERLAP_DISTANCE
      const targetWidth = (tabsContentWidth - (2 * TAB_CONTENT_MARGIN) + tabsCumulativeOverlappedWidth) / numberOfTabs
      const clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth))
      const flooredClampedTargetWidth = Math.floor(clampedTargetWidth)
      const totalTabsWidthUsingTarget = (flooredClampedTargetWidth * numberOfTabs) + (2 * TAB_CONTENT_MARGIN) - tabsCumulativeOverlappedWidth
      const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget
      const widths = []
      let extraWidthRemaining = totalExtraWidthDueToFlooring
      for (let i = 0; i < numberOfTabs; i += 1) {
        const extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0 ? 1 : 0
        widths.push(flooredClampedTargetWidth + extraWidth)
        if (extraWidthRemaining > 0) extraWidthRemaining -= 1
      }
      return widths
    }
    get tabContentPositions() {
      const positions = []
      const tabContentWidths = this.tabContentWidths
      let position = TAB_CONTENT_MARGIN
      tabContentWidths.forEach((width, i) => {
        const offset = i * TAB_CONTENT_OVERLAP_DISTANCE
        positions.push(position - offset)
        position += width
      })
      return positions
    }
    get tabPositions() {
      const positions = []
      this.tabContentPositions.forEach(contentPosition => { positions.push(contentPosition - TAB_CONTENT_MARGIN) })
      return positions
    }
    layoutTabs() {
      const tabContentWidths = this.tabContentWidths
      const tabWidths = []
      this.tabEls.forEach((tabEl, i) => {
        const contentWidth = tabContentWidths[i]
        const width = contentWidth + (2 * TAB_CONTENT_MARGIN)
        tabWidths.push(width)
        tabEl.style.width = width + 'px'
        tabEl.removeAttribute('is-small')
        tabEl.removeAttribute('is-smaller')
        tabEl.removeAttribute('is-mini')
        if (contentWidth < TAB_SIZE_SMALL) tabEl.setAttribute('is-small', '')
        if (contentWidth < TAB_SIZE_SMALLER) tabEl.setAttribute('is-smaller', '')
        if (contentWidth < TAB_SIZE_MINI) tabEl.setAttribute('is-mini', '')
      })
      let styleHTML = ''
      this.tabPositions.forEach((position, i) => {
        styleHTML += `.chrome-tabs[data-chrome-tabs-instance-id="${this.instanceId}"] .chrome-tab:nth-child(${i + 1}){transform:translate3d(${position}px,0,0)}`
      })
      this.styleEl.innerHTML = styleHTML
      const newTabButtonEl = this.newTabButtonEl
      if (newTabButtonEl) {
        const lastTabIndex = this.tabEls.length - 1
        const buttonPosition = lastTabIndex >= 0
          ? this.tabPositions[lastTabIndex] + tabWidths[lastTabIndex] + NEW_TAB_BUTTON_GAP - 13
          : TAB_CONTENT_MARGIN
        newTabButtonEl.style.transform = `translate3d(${buttonPosition}px,-50%,0)`
      }
    }
    createNewTabEl() { const div = document.createElement('div'); div.innerHTML = tabTemplate; return div.firstElementChild }
    addTab(tabProperties, { animate = true, background = false } = {}) {
      const tabEl = this.createNewTabEl()
      if (animate) { tabEl.classList.add('chrome-tab-was-just-added'); setTimeout(() => tabEl.classList.remove('chrome-tab-was-just-added'), 500) }
      tabProperties = Object.assign({}, defaultTapProperties, tabProperties)
      this.tabContentEl.insertBefore(tabEl, this.newTabButtonEl || null)
      this.setTabCloseEventListener(tabEl)
      this.updateTab(tabEl, tabProperties)
      this.emit('tabAdd', { tabEl })
      if (!background) this.setCurrentTab(tabEl)
      this.cleanUpPreviouslyDraggedTabs()
      this.layoutTabs()
      this.setupDraggabilly()
    }
    setTabCloseEventListener(tabEl) { tabEl.querySelector('.chrome-tab-close').addEventListener('click', _ => this.removeTab(tabEl)) }
    get activeTabEl() { return this.el.querySelector('.chrome-tab[active]') }
    setCurrentTab(tabEl) {
      const activeTabEl = this.activeTabEl
      if (activeTabEl === tabEl) return
      if (activeTabEl) activeTabEl.removeAttribute('active')
      tabEl.setAttribute('active', '')
      this.emit('activeTabChange', { tabEl })
    }
    removeTab(tabEl) {
      if (tabEl === this.activeTabEl) {
        const tabs = this.tabEls
        const tabIndex = tabs.indexOf(tabEl)
        const fallbackTab = tabs[tabIndex + 1] || tabs[tabIndex - 1]
        if (fallbackTab) this.setCurrentTab(fallbackTab)
      }
      tabEl.parentNode.removeChild(tabEl)
      this.emit('tabRemove', { tabEl })
      this.cleanUpPreviouslyDraggedTabs()
      this.layoutTabs()
      this.setupDraggabilly()
    }
    updateTab(tabEl, tabProperties) {
      tabEl.querySelector('.chrome-tab-title').textContent = tabProperties.title
      const faviconEl = tabEl.querySelector('.chrome-tab-favicon')
      if (tabProperties.favicon) {
        faviconEl.style.backgroundImage = `url('${tabProperties.favicon}')`
        faviconEl.removeAttribute('hidden')
      } else {
        faviconEl.setAttribute('hidden', '')
        faviconEl.removeAttribute('style')
      }
      if (tabProperties.id) tabEl.setAttribute('data-tab-id', tabProperties.id)
    }
    cleanUpPreviouslyDraggedTabs() { this.tabEls.forEach(tabEl => tabEl.classList.remove('chrome-tab-was-just-dragged')) }
    setupDraggabilly() {
      const tabEls = this.tabEls
      const tabPositions = this.tabPositions
      if (this.isDragging) {
        this.isDragging = false
        this.el.classList.remove('chrome-tabs-is-sorting')
        this.draggabillyDragging.element.classList.remove('chrome-tab-is-dragging')
        this.draggabillyDragging.element.style.transform = ''
        this.draggabillyDragging.dragEnd()
        this.draggabillyDragging.isDragging = false
        this.draggabillyDragging.positionDrag = noop
        this.draggabillyDragging.destroy()
        this.draggabillyDragging = null
      }
      this.draggabillies.forEach(d => d.destroy())
      tabEls.forEach((tabEl, originalIndex) => {
        const originalTabPositionX = tabPositions[originalIndex]
        const draggabilly = new Draggabilly(tabEl, { axis: 'x', handle: '.chrome-tab-drag-handle', containment: this.tabContentEl })
        this.draggabillies.push(draggabilly)
        draggabilly.on('pointerDown', _ => { this.setCurrentTab(tabEl) })
        draggabilly.on('dragStart', _ => {
          this.isDragging = true
          this.draggabillyDragging = draggabilly
          tabEl.classList.add('chrome-tab-is-dragging')
          this.el.classList.add('chrome-tabs-is-sorting')
        })
        draggabilly.on('dragEnd', _ => {
          this.isDragging = false
          const finalTranslateX = parseFloat(tabEl.style.left, 10)
          tabEl.style.transform = 'translate3d(0,0,0)'
          requestAnimationFrame(_ => {
            tabEl.style.left = '0'
            tabEl.style.transform = `translate3d(${finalTranslateX}px,0,0)`
            requestAnimationFrame(_ => {
              tabEl.classList.remove('chrome-tab-is-dragging')
              this.el.classList.remove('chrome-tabs-is-sorting')
              tabEl.classList.add('chrome-tab-was-just-dragged')
              requestAnimationFrame(_ => {
                tabEl.style.transform = ''
                this.layoutTabs()
                this.setupDraggabilly()
              })
            })
          })
        })
        draggabilly.on('dragMove', (event, pointer, moveVector) => {
          const currentIndex = this.tabEls.indexOf(tabEl)
          const currentTabPositionX = originalTabPositionX + moveVector.x
          const destinationIndexTarget = closest(currentTabPositionX, tabPositions)
          const destinationIndex = Math.max(0, Math.min(this.tabEls.length, destinationIndexTarget))
          if (currentIndex !== destinationIndex) this.animateTabMove(tabEl, currentIndex, destinationIndex)
        })
      })
    }
    animateTabMove(tabEl, originIndex, destinationIndex) {
      if (destinationIndex < originIndex) tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex])
      else tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex + 1] || this.newTabButtonEl || null)
      this.emit('tabReorder', { tabEl, originIndex, destinationIndex })
      this.layoutTabs()
    }
  }
  return ChromeTabs
})

const tabsEl = document.getElementById('tabs-el')
const chromeTabs = new ChromeTabs()
chromeTabs.init(tabsEl)

const urlInput = document.getElementById('url-input')
const pageFrame = document.getElementById('page-frame')
const newTabPage = document.getElementById('new-tab-page')
const lockIcon = document.getElementById('lock-icon')
const lockIconBtn = document.getElementById('lock-icon-btn')
const connectionPopup = document.getElementById('connection-popup')
const connectionPopupTitle = document.getElementById('connection-popup-title')
const connectionPopupDesc = document.getElementById('connection-popup-desc')
const btnBack = document.getElementById('btn-back')
const btnForward = document.getElementById('btn-forward')
const btnRefresh = document.getElementById('btn-refresh')
const btnHome = document.getElementById('btn-home')
const btnSystemSettings = document.getElementById('btn-system-settings')
const btnUserPage = document.getElementById('btn-user-page')
const statusText = document.getElementById('status-text')
const DOUBLE_KEY_SHORTCUT_INTERVAL = 300
const recentShortcutKeys = new Map()

const DEFAULT_WISP = 'wss://pale-pen-crafted-gamz-b0390771.koyeb.app/'
let uvReady = false
let baremuxReady = false
let baremuxConnection = null
let pendingInitPromise = null
const tabHistory = new WeakMap()
let urlSyncIntervalId = null
let lastSyncedFrameUrl = ''
const LOCAL_PAGES = {
  games: '/browser/pages/games.html',
  movies: '/browser/pages/movies.html',
  ai: '/browser/pages/ai.html',
  music: '/browser/pages/music.html',
  about: '/browser/pages/about.html',
  settings: '/browser/pages/settings.html',
  account: '/browser/pages/account.html'
}

function getWispUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('wisp') || DEFAULT_WISP
}
function resolveCgUrl(input) {
  if (!/^cg:\/\//i.test(input)) return null
  const key = input.replace(/^cg:\/\//i, '').trim().toLowerCase()
  const target = LOCAL_PAGES[key]
  if (!target) return null
  return { key, target, display: `cg://${key}` }
}
function setAddressIndicator(url) {
  if (url === 'newtab') {
    lockIcon.className = 'fa-solid fa-circle-info lock-icon'
    return
  }
  if (/^cg:\/\//i.test(url)) {
    lockIcon.className = 'fa-solid fa-hard-drive lock-icon secure'
    return
  }
  if (url.startsWith('https://')) {
    lockIcon.className = 'fa-solid fa-shield-halved lock-icon secure'
    return
  }
  lockIcon.className = 'fa-solid fa-triangle-exclamation lock-icon'
}
function getConnectionDetails(url) {
  if (url === 'newtab') {
    return {
      title: 'New Tab',
      desc: 'This is a local new-tab screen. No website connection is active.'
    }
  }
  if (/^cg:\/\//i.test(url)) {
    return {
      title: 'Local System Page',
      desc: 'This page is loaded from local files in browser/pages and is not proxied.'
    }
  }
  if (url.startsWith('https://')) {
    return {
      title: 'Secure HTTPS',
      desc: 'Your connection uses HTTPS encryption. In this browser shell, content may still be routed through your proxy stack.'
    }
  }
  return {
    title: 'Not Fully Secure',
    desc: 'This page is not using HTTPS encryption. Avoid entering sensitive information.'
  }
}
function currentAddressValue() {
  return (urlInput.value || '').trim() || 'newtab'
}
function hideConnectionPopup() {
  connectionPopup.hidden = true
}
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
function getDisplayUrl(rawUrl) {
  try {
    const absolute = new URL(rawUrl, window.location.origin)
    const entry = Object.entries(LOCAL_PAGES).find(([, path]) => absolute.pathname === path)
    if (entry) return `cg://${entry[0]}`
  } catch (e) {}
  return rawUrl
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
    if (!window.BareMux) {
      console.warn('BareMux not loaded')
      return false
    }
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

function getActiveTab() { return chromeTabs.activeTabEl }
function openNewTab(options) { chromeTabs.addTab({ title: 'New Tab', favicon: false }, options) }
function ensureTabHistory(tabEl) {
  if (!tabEl) return null
  if (!tabHistory.has(tabEl)) {
    tabHistory.set(tabEl, { entries: ['newtab'], index: 0 })
  }
  return tabHistory.get(tabEl)
}
function syncNavButtons(tabEl = getActiveTab()) {
  const state = ensureTabHistory(tabEl)
  if (!state || state.entries[state.index] === 'newtab') {
    btnBack.disabled = true
    btnForward.disabled = true
    return
  }
  btnBack.disabled = state.index <= 0
  btnForward.disabled = state.index >= state.entries.length - 1
}
function pushTabHistory(tabEl, url) {
  const state = ensureTabHistory(tabEl)
  if (!state || !url || url === 'newtab') return
  const current = state.entries[state.index]
  if (current === url) return
  state.entries = state.entries.slice(0, state.index + 1)
  state.entries.push(url)
  state.index = state.entries.length - 1
}
function syncFromFrameLocation() {
  if (pageFrame.style.display === 'none') return
  let currentUrl = ''
  try {
    currentUrl = pageFrame.contentWindow.location.href || ''
  } catch (e) {
    currentUrl = pageFrame.src || ''
  }
  currentUrl = getRealUrlFromProxy(currentUrl)
  currentUrl = getDisplayUrl(currentUrl)
  if (!currentUrl || currentUrl === lastSyncedFrameUrl) return
  lastSyncedFrameUrl = currentUrl

  urlInput.value = currentUrl
  const tab = getActiveTab()
  if (!tab) return
  tab.dataset.url = currentUrl
  pushTabHistory(tab, currentUrl)

  let hostname = currentUrl
  try { hostname = new URL(currentUrl).hostname } catch (e) {}
  const fallbackTitle = hostname.replace(/^www\./, '')
  if (fallbackTitle) {
    tab.querySelector('.chrome-tab-title').textContent = fallbackTitle
    tab.dataset.title = fallbackTitle
  }
  setAddressIndicator(currentUrl)
  syncNavButtons(tab)
}
function startUrlSyncLoop() {
  if (urlSyncIntervalId) return
  urlSyncIntervalId = window.setInterval(syncFromFrameLocation, 350)
}
async function openHistoryEntry(tabEl, index) {
  const state = ensureTabHistory(tabEl)
  if (!state) return
  if (index < 0 || index >= state.entries.length) return
  state.index = index
  const url = state.entries[state.index]
  if (!url || url === 'newtab') {
    showNewTabPage()
    return
  }
  const local = resolveCgUrl(url)
  if (local) {
    pageFrame.src = local.target
    pageFrame.style.display = 'block'
    newTabPage.style.display = 'none'
    urlInput.value = local.display
    setAddressIndicator(local.display)
    syncNavButtons(tabEl)
    return
  }
  if (!uvReady || !baremuxReady) await initProxyStack()
  pageFrame.src = getProxyUrl(url)
  pageFrame.style.display = 'block'
  newTabPage.style.display = 'none'
  urlInput.value = url
  setAddressIndicator(url)
  syncNavButtons(tabEl)
}
function isTypingTarget(target) {
  return !!target && (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable
  )
}
function handleDoubleKeyShortcut(key) {
  if (key === 't') { openNewTab(); return true }
  if (key === 'w') {
    const activeTab = chromeTabs.activeTabEl
    if (activeTab) chromeTabs.removeTab(activeTab)
    return true
  }
  return false
}

function showNewTabPage() {
  newTabPage.style.display = 'flex'
  pageFrame.style.display = 'none'
  lastSyncedFrameUrl = ''
  urlInput.value = ''
  setAddressIndicator('newtab')
  hideConnectionPopup()
  syncNavButtons()
}

async function navigate(url) {
  if (!uvReady || !baremuxReady) await initProxyStack()
  let full = url.trim()
  if (!full) return
  const local = resolveCgUrl(full)
  if (local) {
    full = local.display
    urlInput.value = full
    newTabPage.style.display = 'none'
    pageFrame.style.display = 'block'
    pageFrame.src = local.target
    lastSyncedFrameUrl = full
    startUrlSyncLoop()
    setAddressIndicator(full)
    const localTab = getActiveTab()
    if (localTab) {
      localTab.querySelector('.chrome-tab-title').textContent = local.key.charAt(0).toUpperCase() + local.key.slice(1)
      localTab.querySelector('.chrome-tab-favicon').setAttribute('hidden', '')
      localTab.dataset.url = full
      localTab.dataset.title = local.key
      pushTabHistory(localTab, full)
    }
    statusText.textContent = ''
    syncNavButtons(localTab)
    return
  }
  if (!/^https?:\/\//i.test(full) && !full.startsWith('about:')) {
    if (full.includes('.') && !full.includes(' ')) {
      full = 'https://' + full
    } else {
      full = 'https://www.google.com/search?q=' + encodeURIComponent(full)
    }
  }
  urlInput.value = full
  newTabPage.style.display = 'none'
  pageFrame.style.display = 'block'
  pageFrame.src = getProxyUrl(full)
  lastSyncedFrameUrl = full
  startUrlSyncLoop()
  setAddressIndicator(full)
  const tab = getActiveTab()
  if (tab) {
    let hostname = full
    try { hostname = new URL(full).hostname } catch (e) {}
    const title = hostname.replace(/^www\./, '')
    tab.querySelector('.chrome-tab-title').textContent = title
    const faviconEl = tab.querySelector('.chrome-tab-favicon')
    faviconEl.style.backgroundImage = `url('https://www.google.com/s2/favicons?sz=16&domain_url=${encodeURIComponent(full)}')`
    faviconEl.removeAttribute('hidden')
    tab.dataset.url = full
    tab.dataset.title = title
    pushTabHistory(tab, full)
  }
  statusText.textContent = 'Loading ' + full
  syncNavButtons(tab)
}

pageFrame.addEventListener('load', () => {
  statusText.textContent = ''
  if (pageFrame.style.display === 'none') return

  let currentUrl = pageFrame.src || urlInput.value
  try {
    currentUrl = pageFrame.contentWindow.location.href || currentUrl
  } catch (e) {}
  currentUrl = getRealUrlFromProxy(currentUrl)
  currentUrl = getDisplayUrl(currentUrl)
  if (currentUrl) lastSyncedFrameUrl = currentUrl

  if (currentUrl) urlInput.value = currentUrl

  const tab = getActiveTab()
  if (!tab || !currentUrl) return

  tab.dataset.url = currentUrl
  pushTabHistory(tab, currentUrl)
  let hostname = currentUrl
  try { hostname = new URL(currentUrl).hostname } catch (e) {}
  const fallbackTitle = hostname.replace(/^www\./, '')

  try {
    const iframeTitle = pageFrame.contentDocument && pageFrame.contentDocument.title
    const title = (iframeTitle || fallbackTitle || 'New Tab').trim()
    tab.querySelector('.chrome-tab-title').textContent = title
    tab.dataset.title = title
  } catch (e) {
    tab.querySelector('.chrome-tab-title').textContent = fallbackTitle || 'New Tab'
    tab.dataset.title = fallbackTitle || 'New Tab'
  }

  setAddressIndicator(currentUrl)
  syncNavButtons(tab)
})

tabsEl.addEventListener('activeTabChange', async ({ detail }) => {
  const tab = detail.tabEl
  const url = tab.dataset.url || 'newtab'
  if (url === 'newtab') {
    showNewTabPage()
  } else {
    const state = ensureTabHistory(tab)
    if (!state.entries.length) {
      state.entries = [url]
      state.index = 0
    }
    await openHistoryEntry(tab, state.index)
    startUrlSyncLoop()
  }
  syncNavButtons(tab)
})

tabsEl.addEventListener('tabAdd', ({ detail }) => {
  detail.tabEl.dataset.url = 'newtab'
  detail.tabEl.dataset.title = 'New Tab'
  ensureTabHistory(detail.tabEl)
  syncNavButtons(detail.tabEl)
})

tabsEl.addEventListener('tabRemove', () => {
  if (chromeTabs.tabEls.length === 0) openNewTab()
})

document.getElementById('newtab-btn').addEventListener('click', () => {
  openNewTab()
})

urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') navigate(urlInput.value) })
urlInput.addEventListener('focus', () => urlInput.select())

btnRefresh.addEventListener('click', () => {
  if (pageFrame.style.display === 'none') return
  try {
    pageFrame.contentWindow.location.reload()
  } catch (e) {
    pageFrame.src = pageFrame.src
  }
})

btnHome.addEventListener('click', () => {
  showNewTabPage()
  const tab = getActiveTab()
  if (tab) {
    tab.querySelector('.chrome-tab-title').textContent = 'New Tab'
    tab.querySelector('.chrome-tab-favicon').setAttribute('hidden', '')
    tab.dataset.url = 'newtab'
    tabHistory.set(tab, { entries: ['newtab'], index: 0 })
  }
  syncNavButtons(tab)
})
btnSystemSettings.addEventListener('click', () => {
  navigate('cg://settings')
})
btnUserPage.addEventListener('click', () => {
  navigate('cg://account')
})

btnBack.addEventListener('click', async () => {
  const tab = getActiveTab()
  const state = ensureTabHistory(tab)
  if (!state || state.index <= 0) return
  await openHistoryEntry(tab, state.index - 1)
})
btnForward.addEventListener('click', async () => {
  const tab = getActiveTab()
  const state = ensureTabHistory(tab)
  if (!state || state.index >= state.entries.length - 1) return
  await openHistoryEntry(tab, state.index + 1)
})

document.getElementById('newtab-search').addEventListener('keydown', e => {
  if (e.key === 'Enter') navigate(e.target.value)
})

document.querySelectorAll('.shortcut').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.nav))
})
document.querySelectorAll('.url-shortcut-btn').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.localUri))
})
lockIconBtn.addEventListener('click', event => {
  event.stopPropagation()
  toggleConnectionPopup()
})
document.addEventListener('click', event => {
  if (connectionPopup.hidden) return
  if (connectionPopup.contains(event.target) || lockIconBtn.contains(event.target)) return
  hideConnectionPopup()
})
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideConnectionPopup()
})

window.addEventListener('keydown', e => {
  const key = e.key.toLowerCase()
  if (e.ctrlKey && key === 't') { openNewTab(); e.preventDefault(); return }
  if (e.ctrlKey && key === 'w') {
    const activeTab = chromeTabs.activeTabEl
    if (activeTab) chromeTabs.removeTab(activeTab)
    e.preventDefault()
    return
  }
  if (key === 'f5' && pageFrame.style.display !== 'none') {
    pageFrame.src = pageFrame.src
    return
  }
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return
  const now = performance.now()
  const lastPressAt = recentShortcutKeys.get(key) || 0
  if (now - lastPressAt <= DOUBLE_KEY_SHORTCUT_INTERVAL) {
    recentShortcutKeys.delete(key)
    if (handleDoubleKeyShortcut(key)) e.preventDefault()
    return
  }
  recentShortcutKeys.set(key, now)
})

initProxyStack()
ensureTabHistory(getActiveTab())
showNewTabPage()
