function showToast(message) {
  const toast = document.getElementById('settings-toast')
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toast._hide)
  toast._hide = setTimeout(() => toast.classList.remove('show'), 1800)
}

function notifyParent(message) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, '*')
  }
}

function getThemeState() {
  return BrowserThemeState.loadThemeState()
}

function setThemeState(patch) {
  return BrowserThemeState.saveThemeState(patch)
}

function applyThemeControls() {
  const themeState = getThemeState()
  document.getElementById('theme-select').value = themeState.mode
  // sync active state on both button and wrapper
  document.querySelectorAll('.bg-option[data-bg]').forEach(button => {
    const isActive = button.dataset.bg === themeState.bgPreset
    button.classList.toggle('active', isActive)
    if (button.parentElement?.classList.contains('bg-tile')) {
      button.parentElement.classList.toggle('active', isActive)
    }
  })
  applyRadiusControls(themeState.radius)
  applyGlassControls(themeState.glass)
  applySpecularControls(themeState.specular)
  applyAccentControls(themeState.accentColor)
  applyWallpaperControls(themeState.wallpaper)
}

function applyAccentControls(accentColor) {
  const input = document.getElementById('accent-color-input')
  const swatch = document.getElementById('accent-color-swatch')
  if (!input || !swatch) return
  if (accentColor) {
    input.value = accentColor
    swatch.style.background = accentColor
    swatch.classList.remove('empty')
  } else {
    swatch.style.background = ''
    swatch.classList.add('empty')
  }
}

function applyWallpaperControls(wallpaperKey) {
  document.querySelectorAll('.wallpaper-option').forEach(btn => {
    const isActive = btn.dataset.wallpaper === (wallpaperKey || '')
    btn.classList.toggle('active', isActive)
    if (btn.parentElement?.classList.contains('bg-tile')) {
      btn.parentElement.classList.toggle('active', isActive)
    }
  })
}

function applyGlassControls(glass) {
  const slider = document.getElementById('glass-slider')
  const valueLabel = document.getElementById('glass-value')
  if (!slider || !valueLabel) return
  const v = glass !== undefined ? glass : BrowserThemeState.DEFAULT_THEME_STATE.glass
  slider.value = v
  valueLabel.textContent = Math.round(v * 100)
  slider.style.setProperty('--radius-pct', `${(v / 2) * 100}%`)
}

function applySpecularControls(specular) {
  const slider = document.getElementById('specular-slider')
  const valueLabel = document.getElementById('specular-value')
  if (!slider || !valueLabel) return
  const v = specular !== undefined ? specular : BrowserThemeState.DEFAULT_THEME_STATE.specular
  slider.value = v
  valueLabel.textContent = Math.round(v * 100)
  slider.style.setProperty('--radius-pct', `${(v / 2) * 100}%`)
}

function applyRadiusControls(radius) {
  const slider = document.getElementById('radius-slider')
  const valueLabel = document.getElementById('radius-value')
  if (!slider || !valueLabel) return
  const v = radius !== undefined ? radius : BrowserThemeState.DEFAULT_THEME_STATE.radius
  slider.value = v
  valueLabel.textContent = v
  const max = Number(slider.max) || 50
  slider.style.setProperty('--radius-pct', `${(v / max) * 100}%`)
}

function makeTileWrapper(isActive) {
  const wrap = document.createElement('div')
  wrap.className = 'bg-tile' + (isActive ? ' active' : '')
  return wrap
}

function buildBackgroundGrid() {
  const grid = document.getElementById('bg-grid')
  const themeState = getThemeState()
  grid.innerHTML = ''

  Object.entries(BrowserThemeState.BACKGROUND_PRESETS).forEach(([key, preset]) => {
    const wrap = makeTileWrapper(themeState.bgPreset === key)
    wrap.dataset.bg = key

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'bg-option' + (themeState.bgPreset === key ? ' active' : '')
    button.dataset.bg = key
    button.style.background = preset.preview
    if (key === 'none') {
      button.style.borderStyle = 'dashed'
    } else {
      const frame = document.createElement('iframe')
      frame.src = preset.url
      frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;pointer-events:none'
      frame.setAttribute('sandbox', 'allow-scripts')
      frame.setAttribute('loading', 'lazy')
      button.appendChild(frame)
    }

    const lbl = document.createElement('div')
    lbl.className = 'bg-tile-label'
    lbl.textContent = preset.label

    button.addEventListener('click', () => {
      setThemeState({ bgPreset: key, wallpaper: null })
      applyThemeControls()
      notifyParent({ type: 'cg_bg_preset', preset: key })
      notifyParent({ type: 'cg_wallpaper', wallpaper: null })
      showToast('Background updated')
    })

    wrap.appendChild(button)
    wrap.appendChild(lbl)
    grid.appendChild(wrap)
  })
}

function buildWallpaperGrid() {
  const grid = document.getElementById('wallpaper-grid')
  const themeState = getThemeState()
  grid.innerHTML = ''

  // "None" tile
  const noneWrap = makeTileWrapper(!themeState.wallpaper)
  const noneBtn = document.createElement('button')
  noneBtn.type = 'button'
  noneBtn.className = 'bg-option wallpaper-option' + (!themeState.wallpaper ? ' active' : '')
  noneBtn.dataset.wallpaper = ''
  noneBtn.style.background = 'linear-gradient(135deg,#101010,#1a1a1a)'
  noneBtn.style.borderStyle = 'dashed'
  noneBtn.addEventListener('click', () => {
    setThemeState({ wallpaper: null, accentColor: null, customAccent: false })
    applyThemeControls()
    notifyParent({ type: 'cg_wallpaper', wallpaper: null })
    notifyParent({ type: 'cg_theme_accent', accentColor: null })
    showToast('Wallpaper removed')
  })
  const noneLbl = document.createElement('div')
  noneLbl.className = 'bg-tile-label'
  noneLbl.textContent = 'None'
  noneWrap.appendChild(noneBtn)
  noneWrap.appendChild(noneLbl)
  grid.appendChild(noneWrap)

  BrowserThemeState.DYNAMIC_WALLPAPERS.forEach(({ key, label, color }) => {
    const wrap = makeTileWrapper(themeState.wallpaper === key)

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'bg-option wallpaper-option' + (themeState.wallpaper === key ? ' active' : '')
    button.dataset.wallpaper = key

    // use per-wallpaper color for the snapshot; fallback to user accent if set
    const state = getThemeState()
    const accentParam = state.accentColor
      ? state.accentColor.replace('#', '')
      : color
    const frame = document.createElement('iframe')
    frame.src = `../dynamic-wallpapers.html?w=${encodeURIComponent(key)}&c=${accentParam}&snapshot=1`
    frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;pointer-events:none'
    frame.setAttribute('sandbox', 'allow-scripts')
    frame.setAttribute('loading', 'lazy')
    button.appendChild(frame)

    const lbl = document.createElement('div')
    lbl.className = 'bg-tile-label'
    lbl.textContent = label

    button.addEventListener('click', () => {
      const accentColor = '#' + color
      setThemeState({ wallpaper: key, bgPreset: 'none', accentColor, customAccent: false })
      applyThemeControls()
      notifyParent({ type: 'cg_wallpaper', wallpaper: key })
      notifyParent({ type: 'cg_bg_preset', preset: 'none' })
      notifyParent({ type: 'cg_theme_accent', accentColor })
      showToast(`Wallpaper: ${label}`)
    })

    wrap.appendChild(button)
    wrap.appendChild(lbl)
    grid.appendChild(wrap)
  })
}

document.getElementById('theme-select').addEventListener('change', event => {
  const mode = event.target.value
  setThemeState({ mode })
  applyThemeControls()
  notifyParent({ type: 'cg_theme_mode', mode })
  showToast('Theme updated')
})

// Accent color picker
const accentInput = document.getElementById('accent-color-input')
const accentSwatch = document.getElementById('accent-color-swatch')
const accentResetBtn = document.getElementById('accent-reset-btn')

accentInput.addEventListener('input', event => {
  const accentColor = event.target.value
  accentSwatch.style.background = accentColor
  setThemeState({ accentColor, customAccent: true })
  notifyParent({ type: 'cg_theme_accent', accentColor })
  // Also update the browser theme-color meta tag if we can reach it
  try {
    const meta = window.parent.document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = accentColor
  } catch (_) {}
})

accentInput.addEventListener('change', () => {
  showToast('Accent color updated')
})

accentResetBtn.addEventListener('click', () => {
  setThemeState({ accentColor: null, customAccent: false })
  applyAccentControls(null)
  notifyParent({ type: 'cg_theme_accent', accentColor: null })
  showToast('Accent color removed')
})

const radiusSlider = document.getElementById('radius-slider')
const radiusValueLabel = document.getElementById('radius-value')

function syncRadiusFill(slider) {
  const v = Number(slider.value)
  const max = Number(slider.max) || 50
  slider.style.setProperty('--radius-pct', `${(v / max) * 100}%`)
  radiusValueLabel.textContent = v
}

radiusSlider.addEventListener('input', event => {
  const radius = Number(event.target.value)
  setThemeState({ radius })
  syncRadiusFill(event.target)
  document.documentElement.style.setProperty('--cg-radius', `${radius}px`)
  notifyParent({ type: 'cg_radius', radius })
})

radiusSlider.addEventListener('change', () => {
  showToast('Roundness updated')
})

const glassSlider = document.getElementById('glass-slider')
const glassValueLabel = document.getElementById('glass-value')

glassSlider.addEventListener('input', event => {
  const glass = Number(event.target.value)
  setThemeState({ glass })
  glassValueLabel.textContent = Math.round(glass * 100)
  glassSlider.style.setProperty('--radius-pct', `${(glass / 2) * 100}%`)
  document.documentElement.style.setProperty('--cg-glass', glass)
  notifyParent({ type: 'cg_glass', glass })
})

glassSlider.addEventListener('change', () => {
  showToast('Glass opacity updated')
})

const specularSlider = document.getElementById('specular-slider')
const specularValueLabel = document.getElementById('specular-value')

specularSlider.addEventListener('input', event => {
  const specular = Number(event.target.value)
  setThemeState({ specular })
  specularValueLabel.textContent = Math.round(specular * 100)
  specularSlider.style.setProperty('--radius-pct', `${(specular / 2) * 100}%`)
  document.documentElement.style.setProperty('--cg-specular', specular)
  notifyParent({ type: 'cg_specular', specular })
})

specularSlider.addEventListener('change', () => {
  showToast('Specularity updated')
})

// Ads toggle
const adsToggle = document.getElementById('ads-toggle')
adsToggle.checked = localStorage.getItem('cg_ads') !== '0'
adsToggle.addEventListener('change', () => {
  localStorage.setItem('cg_ads', adsToggle.checked ? '1' : '0')
  if (window.accountManager && typeof window.accountManager.scheduleAdsSync === 'function') {
    window.accountManager.scheduleAdsSync()
  }
  showToast(adsToggle.checked ? 'Ads enabled' : 'Ads disabled')
})

buildBackgroundGrid()
buildWallpaperGrid()
applyThemeControls()

window.addEventListener('storage', event => {
  if (event.key === BrowserThemeState.THEME_KEY) {
    buildBackgroundGrid()
    buildWallpaperGrid()
    applyThemeControls()
  }
})
