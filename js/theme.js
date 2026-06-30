const Theme = (() => {
  const DEFAULT_STATE = window.BrowserThemeState
    ? BrowserThemeState.DEFAULT_THEME_STATE
    : { mode: 'dark', accentColor: '#4285f4', bgPreset: 'minimal' }

  function loadState() {
    return window.BrowserThemeState
      ? BrowserThemeState.loadThemeState()
      : { ...DEFAULT_STATE }
  }

  function saveState(patch) {
    return window.BrowserThemeState
      ? BrowserThemeState.saveThemeState(patch)
      : { ...loadState(), ...patch }
  }

  function getBackgroundPreset(key) {
    return window.BrowserThemeState
      ? BrowserThemeState.getBackgroundPreset(key)
      : {
          key: DEFAULT_STATE.bgPreset,
          label: 'Minimal',
          url: '',
          preview: '',
          dark: { base: '#16181b', surface: '#22262b', surface2: '#1c2024', accent: '#7dd3fc' },
          light: { base: '#eef2f7', surface: '#ffffff', surface2: '#e8edf4', accent: '#3b82f6' },
        }
  }

  function clamp(value) {
    return Math.max(0, Math.min(255, value))
  }

  function hexToRgb(hex) {
    const safe = String(hex || '#000000').trim()
    return {
      r: parseInt(safe.slice(1, 3), 16),
      g: parseInt(safe.slice(3, 5), 16),
      b: parseInt(safe.slice(5, 7), 16),
    }
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(value => clamp(Math.round(value)).toString(16).padStart(2, '0')).join('')
  }

  function rgba(hex, alpha) {
    const { r, g, b } = hexToRgb(hex)
    return `rgba(${r},${g},${b},${alpha})`
  }

  function mixHex(a, b, amount) {
    const first = hexToRgb(a)
    const second = hexToRgb(b)
    const weight = Math.max(0, Math.min(1, amount))
    return rgbToHex(
      first.r + (second.r - first.r) * weight,
      first.g + (second.g - first.g) * weight,
      first.b + (second.b - first.b) * weight
    )
  }

  function applyVars(vars) {
    const root = document.documentElement
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value))
  }

  function applyRadius(radius) {
    const state = loadState()
    const value = (radius !== undefined && radius !== null)
      ? BrowserThemeState.normalizeThemeState({ ...state, radius }).radius
      : state.radius
    document.documentElement.style.setProperty('--cg-radius', `${value}px`)
    return value
  }

  function applyGlass(glass) {
    const state = loadState()
    const value = (glass !== undefined && glass !== null)
      ? BrowserThemeState.normalizeThemeState({ ...state, glass }).glass
      : state.glass
    document.documentElement.style.setProperty('--cg-glass', value)
    return value
  }

  function applySpecular(specular) {
    const state = loadState()
    const value = (specular !== undefined && specular !== null)
      ? BrowserThemeState.normalizeThemeState({ ...state, specular }).specular
      : state.specular
    document.documentElement.style.setProperty('--cg-specular', value)
    return value
  }

  function buildVarsFromPalette(palette, mode, accentOverride, glass) {
    const accent = accentOverride || palette.accent
    const isLight = mode === 'light'
    const base = palette.base
    const surface = palette.surface
    const surface2 = palette.surface2 || mixHex(base, surface, 0.55)
    const text = isLight ? '#000000' : '#ffffff'
    const textSub = isLight ? 'rgba(0,0,0,0.74)' : 'rgba(255,255,255,0.72)'
    const textMuted = isLight ? 'rgba(0,0,0,0.54)' : 'rgba(255,255,255,0.48)'
    const textDim = isLight ? 'rgba(0,0,0,0.42)' : 'rgba(255,255,255,0.38)'
    const border = isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.12)'
    const borderSub = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
    const divider = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)'
    const hoverColor = isLight ? '#000000' : '#ffffff'
    const tintTarget = isLight ? '#ffffff' : accent
    const glassMult = typeof glass === 'number' ? glass : 1

    return {
      '--ui-base': base,
      '--ui-base-rgb': `${hexToRgb(base).r},${hexToRgb(base).g},${hexToRgb(base).b}`,
      '--ui-surface': surface,
      '--ui-surface-2': surface2,
      '--ui-surface-3': rgba(mixHex(surface, tintTarget, isLight ? 0.06 : 0.1), isLight ? 0.92 : 0.94),
      '--ui-surface-4': rgba(mixHex(base, surface, 0.72), isLight ? 0.98 : 0.97),
      '--ui-surface-5': rgba(mixHex(base, surface2, 0.42), isLight ? 0.98 : 0.98),
      '--ui-overlay': rgba(mixHex(base, hoverColor, isLight ? 0.2 : 0.04), (isLight ? 0.84 : 0.76) * glassMult),
      '--ui-border': border,
      '--ui-border-sub': borderSub,
      '--ui-addr-bg': rgba(mixHex(surface2, accent, isLight ? 0.08 : 0.15), isLight ? 0.78 : 0.52),
      '--ui-addr-focus': rgba(mixHex(surface, accent, isLight ? 0.12 : 0.22), isLight ? 0.9 : 0.64),
      '--ui-icon-bg': rgba(mixHex(surface2, accent, isLight ? 0.06 : 0.12), isLight ? 0.88 : 0.92),
      '--ui-hover': rgba(hoverColor, isLight ? 0.08 : 0.1),
      '--ui-hover-2': rgba(hoverColor, isLight ? 0.06 : 0.08),
      '--ui-active': rgba(accent, isLight ? 0.18 : 0.2),
      '--ui-pin-remove': rgba(mixHex(base, accent, isLight ? 0.04 : 0.08), 0.96),
      '--ui-toast-bg': rgba(mixHex(surface, accent, isLight ? 0.08 : 0.1), 0.96),
      '--ui-search-bg': rgba(mixHex(base, accent, isLight ? 0.18 : 0.14), isLight ? 0.62 : 0.34),
      '--ui-accent': accent,
      '--ui-accent-rgb': `${hexToRgb(accent).r},${hexToRgb(accent).g},${hexToRgb(accent).b}`,
      '--ui-text': text,
      '--ui-text-sub': textSub,
      '--ui-text-muted': textMuted,
      '--ui-text-dim': textDim,
      '--ui-divider': divider,
      '--ui-secure': isLight ? '#2f855a' : '#81c995',
      '--ui-star': isLight ? '#d69e2e' : '#f5c542',
    }
  }

  function notifyBackgroundFrame(state) {
    const frame = document.getElementById('browser-bg-frame')
    if (!frame || !frame.contentWindow) return
    frame.contentWindow.postMessage({ type: 'cg_bg_preset', preset: state.bgPreset }, '*')
    frame.contentWindow.postMessage({ type: 'cg_wallpaper', wallpaper: state.wallpaper }, '*')
    frame.contentWindow.postMessage({ type: 'cg_accent', accentColor: state.accentColor }, '*')
  }

  function normalizeLegacyPreset(presetKey) {
    const key = String(presetKey || '').trim().toLowerCase()
    if (key === 'light') return 'light'
    return 'dark'
  }

  async function applyState(state, options = {}) {
    const nextState = {
      mode: state.mode || DEFAULT_STATE.mode,
      accentColor: state.accentColor !== undefined ? state.accentColor : DEFAULT_STATE.accentColor,
      bgPreset: state.bgPreset || DEFAULT_STATE.bgPreset,
      radius: state.radius !== undefined ? state.radius : DEFAULT_STATE.radius,
      glass: state.glass !== undefined ? state.glass : DEFAULT_STATE.glass,
      specular: state.specular !== undefined ? state.specular : DEFAULT_STATE.specular,
      wallpaper: state.wallpaper !== undefined ? state.wallpaper : DEFAULT_STATE.wallpaper,
      customAccent: state.customAccent !== undefined ? state.customAccent : DEFAULT_STATE.customAccent,
    }

    const preset = getBackgroundPreset(nextState.bgPreset)
    if (nextState.mode === 'light') {
      applyVars(buildVarsFromPalette(preset.light, 'light', nextState.accentColor, nextState.glass))
    } else {
      applyVars(buildVarsFromPalette(preset.dark, 'dark', nextState.accentColor, nextState.glass))
    }

    applyRadius(nextState.radius)
    applyGlass(nextState.glass)
    applySpecular(nextState.specular)

    document.documentElement.dataset.theme = nextState.mode
    document.documentElement.dataset.bgPreset = nextState.bgPreset

    // Keep the browser theme-color meta in sync with the resolved accent
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      const preset = getBackgroundPreset(nextState.bgPreset)
      const resolvedAccent = nextState.accentColor || (nextState.mode === 'light' ? preset.light.accent : preset.dark.accent)
      metaThemeColor.content = resolvedAccent
    }

    if (!options.skipSave) {
      saveState(nextState)
    }

    notifyBackgroundFrame(nextState)
    return nextState
  }

  async function applyMode(mode) {
    const state = loadState()
    return applyState({ ...state, mode: normalizeLegacyPreset(mode) })
  }

  async function applyPreset(presetKey) {
    const state = loadState()
    return applyState({ ...state, bgPreset: presetKey })
  }

  async function setRadius(radius) {
    const state = loadState()
    return applyState({ ...state, radius })
  }

  async function setGlass(glass) {
    const state = loadState()
    return applyState({ ...state, glass })
  }

  async function setSpecular(specular) {
    const state = loadState()
    return applyState({ ...state, specular })
  }

  async function setAccentColor(accentColor, customAccent = true) {
    const state = loadState()
    return applyState({ ...state, accentColor, customAccent })
  }

  async function setWallpaper(wallpaper) {
    const state = loadState()
    return applyState({ ...state, wallpaper })
  }

  async function setBackgroundPreset(bgPreset) {
    const state = loadState()
    return applyState({ ...state, bgPreset })
  }

  async function refresh() {
    return applyState(loadState(), { skipSave: true })
  }

  async function init() {
    await refresh()
  }

  window.addEventListener('message', event => {
    if (!event.data || typeof event.data !== 'object') return

    if (event.data.type === 'cg_theme_mode' && event.data.mode) {
      applyMode(event.data.mode)
      return
    }

    if (event.data.type === 'cg_theme_preset' && event.data.preset) {
      applyPreset(event.data.preset)
      return
    }

    if (event.data.type === 'cg_theme_accent' && event.data.accentColor) {
      setAccentColor(event.data.accentColor)
      return
    }

    if (event.data.type === 'cg_bg_preset' && event.data.preset) {
      setBackgroundPreset(event.data.preset)
      return
    }

    if (event.data.type === 'cg_wallpaper') {
      setWallpaper(event.data.wallpaper ?? null)
      return
    }

    if (event.data.type === 'cg_radius' && event.data.radius !== undefined) {
      setRadius(event.data.radius).then(() => {
        if (window.accountManager && typeof window.accountManager.scheduleRadiusSync === 'function') {
          window.accountManager.scheduleRadiusSync()
        }
      })
      return
    }

    if (event.data.type === 'cg_glass' && event.data.glass !== undefined) {
      setGlass(event.data.glass).then(() => {
        if (window.accountManager && typeof window.accountManager.scheduleGlassSync === 'function') {
          window.accountManager.scheduleGlassSync()
        }
      })
      return
    }

    if (event.data.type === 'cg_specular' && event.data.specular !== undefined) {
      setSpecular(event.data.specular).then(() => {
        if (window.accountManager && typeof window.accountManager.scheduleSpecularSync === 'function') {
          window.accountManager.scheduleSpecularSync()
        }
      })
      return
    }

    if (event.data.type === 'cg_theme_refresh') {
      refresh()
    }
  })

  window.addEventListener('storage', event => {
    if (event.key === 'cg_theme' || event.key === 'cg_settings') {
      refresh()
    }
  })

  return {
    init,
    refresh,
    applyMode,
    applyPreset,
    setAccentColor,
    setWallpaper,
    setRadius,
    setGlass,
    setSpecular,
    setBackgroundPreset,
    getState: loadState,
  }
})()

Theme.init()
