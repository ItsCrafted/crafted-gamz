((window, factory) => {
  window.ChromeTabs = factory(window, window.Draggabilly)
})(window, (window, Draggabilly) => {
  const TAB_CONTENT_MARGIN = 9
  const TAB_CONTENT_OVERLAP_DISTANCE = -4
  const TAB_CONTENT_MIN_WIDTH = 24
  const TAB_CONTENT_MAX_WIDTH = 240
  const TAB_SIZE_SMALL = 84
  const TAB_SIZE_SMALLER = 60
  const TAB_SIZE_MINI = 48
  const NEW_TAB_BUTTON_WIDTH = 30
  const NEW_TAB_BUTTON_GAP = 8
  const noop = _ => _

  /* Generate SVG tab path data scaled by radius (0–50 px).
     Default radius=16 maps to the original r=8 SVG units.
     Uses the same bezier offsets as the original paths (4.5/3.5 scaled linearly). */
  function buildTabSVG(radius) {
    var r = Math.max(0, Math.min(50, radius)) / 16 * 8   // 0→0, 16→8, 50→25
    var k = +(r * 9 / 16).toFixed(2)                       // horizontal control offset (4.5 at r=8)
    var c = +(r * 7 / 16).toFixed(2)                       // vertical control offset   (3.5 at r=8)
    var active_rx = Math.round(r + 1)                       // active corner x (9 at r=8)
    var inactive_rx = Math.round(r)                         // inactive corner x (8 at r=8)
    var x0 = Math.round(active_rx + r)                      // start x = 17 at r=8
    var activeLeft   = 'M' + x0 + ' 0h' + (214 - x0) + 'v36H0v-2c' + k + ' 0 ' + active_rx + '-' + c + ' ' + active_rx + '-' + r + 'V' + r + 'c0-' + k + ' ' + (r - c) + '-' + r + ' ' + r + '-' + r + 'z'
    var inactiveLeft = 'M' + x0 + ' 0h' + (214 - x0) + 'v32H' + x0 + 'c-' + k + ' 0-' + inactive_rx + ' -' + c + '-' + inactive_rx + '-' + r + 'V' + r + 'c0-' + k + ' ' + (r - c) + '-' + r + ' ' + r + '-' + r + 'z'
    return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs>'
      + '<symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36"><path d="' + activeLeft + '"/></symbol>'
      + '<symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol>'
      + '<symbol id="chrome-tab-geometry-left-inactive" viewBox="0 0 214 36"><path d="' + inactiveLeft + '"/></symbol>'
      + '<symbol id="chrome-tab-geometry-right-inactive" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left-inactive"/></symbol>'
      + '<clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs>'
      + '<g class="tab-active-svg"><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1,1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></g>'
      + '<g class="tab-inactive-svg"><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left-inactive" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1,1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right-inactive" width="214" height="36" class="chrome-tab-geometry"/></svg></g></g></svg>'
  }

  function getTabRadius() {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue('--cg-radius')
      return v ? parseInt(v, 10) : 16
    } catch (_) { return 16 }
  }

  function buildTabTemplate(radius) {
    return '<div class="chrome-tab"><div class="chrome-tab-dividers"></div><div class="chrome-tab-background">'
      + buildTabSVG(radius || getTabRadius())
      + '</div><div class="chrome-tab-content"><div class="chrome-tab-favicon"></div><div class="chrome-tab-title"></div>'
      + '<div class="chrome-tab-drag-handle"></div><div class="chrome-tab-close"></div></div></div>'
  }

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
      this.updateTabRadius(getTabRadius())
      this.layoutTabs()
      this.setupDraggabilly()
      this.watchRadius()
    }

    watchRadius() {
      var self = this
      var last = getTabRadius()
      this._radiusObs = new MutationObserver(function () {
        var r = getTabRadius()
        if (r !== last) { last = r; self.updateTabRadius(r) }
      })
      this._radiusObs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
    }

    updateTabRadius(radius) {
      var svg = buildTabSVG(radius)
      this.tabEls.forEach(function (tabEl) {
        var bg = tabEl.querySelector('.chrome-tab-background')
        if (bg) bg.innerHTML = svg
      })
      this.layoutTabs()
    }

    /* Overlap distance scales with radius: full -4 at the default radius,
       tapering to 0 as the radius shrinks so square tabs don't stack. */
    overlapDistance() {
      var r = getTabRadius()
      var factor = Math.min(1, r / 16)
      return Math.round(TAB_CONTENT_OVERLAP_DISTANCE * factor)
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
      const overlapDistance = this.overlapDistance()
      const tabsCumulativeOverlappedWidth = (numberOfTabs - 1) * overlapDistance
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
      const overlapDistance = this.overlapDistance()
      let position = TAB_CONTENT_MARGIN
      tabContentWidths.forEach((width, i) => {
        const offset = i * overlapDistance
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

    createNewTabEl() { const div = document.createElement('div'); div.innerHTML = buildTabTemplate(); return div.firstElementChild }

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
        faviconEl.style.backgroundImage = `url('img/favicon.png')`
        faviconEl.removeAttribute('hidden')
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