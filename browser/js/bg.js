const bgFallback = document.getElementById('bg-fallback')
const bgFrame = document.getElementById('bg-frame')
function applyBackground() {
  const state = BrowserThemeState.loadThemeState()
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
  if (event.data.type === 'cg_bg_preset' || event.data.type === 'cg_theme_refresh') {
    applyBackground()
  }
})

window.addEventListener('storage', event => {
  if (event.key === BrowserThemeState.THEME_KEY || event.key === BrowserThemeState.SETTINGS_KEY) {
    applyBackground()
  }
})

applyBackground()