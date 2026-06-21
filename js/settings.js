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
  document.querySelectorAll('.bg-option').forEach(button => {
    button.classList.toggle('active', button.dataset.bg === themeState.bgPreset)
  })
}

function buildBackgroundGrid() {
  const grid = document.getElementById('bg-grid')
  const themeState = getThemeState()
  grid.innerHTML = ''

  Object.entries(BrowserThemeState.BACKGROUND_PRESETS).forEach(([key, preset]) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'bg-option' + (themeState.bgPreset === key ? ' active' : '')
    button.dataset.bg = key
    button.style.background = preset.preview
    if (key === 'none') button.style.borderStyle = 'dashed'
    button.innerHTML = `<span>${preset.label}</span>`

    button.addEventListener('click', () => {
      setThemeState({ bgPreset: key })
      applyThemeControls()
      notifyParent({ type: 'cg_bg_preset', preset: key })
      showToast('Background updated')
    })

    grid.appendChild(button)
  })
}

document.getElementById('theme-select').addEventListener('change', event => {
  const mode = event.target.value
  setThemeState({ mode })
  applyThemeControls()
  notifyParent({ type: 'cg_theme_mode', mode })
  showToast('Theme updated')
})

document.getElementById('switch-layout-row').addEventListener('click', () => {
  window.parent.location.href = '/onboarding/2.html?skip=false&only=true'
})

buildBackgroundGrid()
applyThemeControls()

window.addEventListener('storage', event => {
  if (event.key === BrowserThemeState.THEME_KEY) {
    buildBackgroundGrid()
    applyThemeControls()
  }
})
