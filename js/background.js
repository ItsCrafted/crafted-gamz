const bgFallback = document.getElementById('bg-fallback')
const bgFrame = document.getElementById('bg-frame')

function buildWallpaperUrl(wallpaperKey, accentColor) {
  const base = `../dynamic-wallpapers.html?w=${encodeURIComponent(wallpaperKey)}`
  if (!accentColor) return base
  const hex = String(accentColor).replace(/^#/, '')
  return `${base}&c=${hex}`
}

function applyBackground() {
  const state = BrowserThemeState.loadThemeState()

  // Dynamic wallpaper takes priority over the bg-preset iframe
  if (state.wallpaper) {
    const url = buildWallpaperUrl(state.wallpaper, state.accentColor)
    bgFallback.style.background = '#050508'
    bgFrame.style.display = 'block'
    if (bgFrame.src !== url) {
      bgFrame.src = url
    }
    document.documentElement.dataset.bgPreset = state.bgPreset
    return
  }

  const preset = BrowserThemeState.getBackgroundPreset(state.bgPreset)

  bgFallback.style.background = preset.preview
  document.documentElement.dataset.bgPreset = preset.key

  if (!preset.url) {
    bgFrame.removeAttribute('src')
    bgFrame.style.display = 'none'
    return
  }

  bgFrame.style.display = 'block'
  if (bgFrame.src !== preset.url) {
    bgFrame.src = preset.url
  }
}

window.addEventListener('message', event => {
  if (!event.data || typeof event.data !== 'object') return
  if (
    event.data.type === 'cg_bg_preset' ||
    event.data.type === 'cg_theme_refresh' ||
    event.data.type === 'cg_wallpaper' ||
    event.data.type === 'cg_accent'
  ) {
    applyBackground()
  }
})

window.addEventListener('storage', event => {
  if (event.key === BrowserThemeState.THEME_KEY || event.key === BrowserThemeState.SETTINGS_KEY) {
    applyBackground()
  }
})

applyBackground()