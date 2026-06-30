const BrowserThemeState = (() => {
  const THEME_KEY = 'cg_theme'
  const SETTINGS_KEY = 'cg_settings'
  const DEFAULT_THEME_STATE = {
    mode: 'dark',
    accentColor: '#4285f4',
    bgPreset: 'minimal',
    radius: 16,
    glass: 1,
    specular: 1,
  }

  const BACKGROUND_PRESETS = {
    minimal: {
      label: 'Minimal',
      url: 'https://i.cgamz.site?c=minimal&i=17',
      preview: 'linear-gradient(135deg,#0a0e14,#050709)',
      dark: { base: '#16181b', surface: '#22262b', surface2: '#1c2024', accent: '#7dd3fc' },
      light: { base: '#eef2f7', surface: '#ffffff', surface2: '#e8edf4', accent: '#3b82f6' },
    },
    aurora: {
      label: 'Aurora',
      url: 'https://i.cgamz.site?c=nature&i=3',
      preview: 'linear-gradient(135deg,#0d1b2a,#1b4332)',
      dark: { base: '#0d1b2a', surface: '#143042', surface2: '#173b35', accent: '#72efdd' },
      light: { base: '#ecf8f5', surface: '#ffffff', surface2: '#dff4ec', accent: '#1c9c88' },
    },
    dusk: {
      label: 'Dusk',
      url: 'https://i.cgamz.site?c=nature&i=30',
      preview: 'linear-gradient(135deg,#1a0533,#2d1b69)',
      dark: { base: '#1c1232', surface: '#2a1d4d', surface2: '#22173f', accent: '#b794f6' },
      light: { base: '#f4effd', surface: '#ffffff', surface2: '#ece4fb', accent: '#7c3aed' },
    },
    ember: {
      label: 'Ember',
      url: 'https://i.cgamz.site?c=naural&i=10',
      preview: 'linear-gradient(135deg,#1a0800,#3d1a00)',
      dark: { base: '#20110b', surface: '#332018', surface2: '#2a1812', accent: '#fb923c' },
      light: { base: '#fff3eb', surface: '#ffffff', surface2: '#fde7d7', accent: '#ea580c' },
    },
    ocean: {
      label: 'Ocean',
      url: 'https://i.cgamz.site?c=minimal&i=3',
      preview: 'linear-gradient(135deg,#001a2c,#003554)',
      dark: { base: '#081c2d', surface: '#11314a', surface2: '#0c253a', accent: '#38bdf8' },
      light: { base: '#edf7ff', surface: '#ffffff', surface2: '#dbeefe', accent: '#0284c7' },
    },
    ash: {
      label: 'Ash',
      url: 'https://i.cgamz.site?c=minimal&i=25',
      preview: 'linear-gradient(135deg,#111111,#222222)',
      dark: { base: '#141414', surface: '#212121', surface2: '#1a1a1a', accent: '#d4d4d8' },
      light: { base: '#f5f5f5', surface: '#ffffff', surface2: '#ebebeb', accent: '#6b7280' },
    },
    rose: {
      label: 'Rose',
      url: 'https://i.cgamz.site?c=minimal&i=18',
      preview: 'linear-gradient(135deg,#1a0010,#2d0020)',
      dark: { base: '#1d0d19', surface: '#321727', surface2: '#27121f', accent: '#f9a8d4' },
      light: { base: '#fff0f6', surface: '#ffffff', surface2: '#fde2ef', accent: '#db2777' },
    },
    none: {
      label: 'None',
      url: 'https://i.cgamz.site?c=minimal',
      preview: 'linear-gradient(135deg,#101010,#1a1a1a)',
      dark: { base: '#16181b', surface: '#22262b', surface2: '#1c2024', accent: '#7dd3fc' },
      light: { base: '#eef2f7', surface: '#ffffff', surface2: '#e8edf4', accent: '#3b82f6' },
    },
  }

  function isHexColor(value) {
    return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value.trim())
  }

  function normalizeAccentColor(value) {
    return isHexColor(value) ? value.trim().toLowerCase() : DEFAULT_THEME_STATE.accentColor
  }

  function normalizeMode(value) {
    const mode = typeof value === 'string' ? value.trim().toLowerCase() : ''
    return ['dark', 'light'].includes(mode) ? mode : DEFAULT_THEME_STATE.mode
  }

  function normalizeBgPreset(value) {
    const preset = typeof value === 'string' ? value.trim().toLowerCase() : ''
    return BACKGROUND_PRESETS[preset] ? preset : DEFAULT_THEME_STATE.bgPreset
  }

  function normalizeRadius(value) {
    const num = Number(value)
    if (!Number.isFinite(num)) return DEFAULT_THEME_STATE.radius
    return Math.max(0, Math.min(50, Math.round(num)))
  }

  function normalizeGlass(value) {
    const num = Number(value)
    if (!Number.isFinite(num)) return DEFAULT_THEME_STATE.glass
    return Math.max(0, Math.min(2, Math.round(num * 1000) / 1000))
  }

  function normalizeSpecular(value) {
    const num = Number(value)
    if (!Number.isFinite(num)) return DEFAULT_THEME_STATE.specular
    return Math.max(0, Math.min(2, Math.round(num * 1000) / 1000))
  }

  function normalizeThemeState(raw) {
    const next = raw && typeof raw === 'object' ? raw : {}
    return {
      mode: normalizeMode(next.mode),
      accentColor: normalizeAccentColor(next.accentColor),
      bgPreset: normalizeBgPreset(next.bgPreset),
      radius: normalizeRadius(next.radius),
      glass: normalizeGlass(next.glass),
      specular: normalizeSpecular(next.specular),
    }
  }

  function loadRawThemeState() {
    try {
      const raw = localStorage.getItem(THEME_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  function loadRawSettingsState() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  function getLegacyMode(rawTheme, rawSettings) {
    if (rawTheme.mode !== undefined) {
      return normalizeMode(rawTheme.mode)
    }

    const legacyPreset = String(rawTheme.preset || '').trim().toLowerCase()
    if (legacyPreset === 'light') return 'light'

    if (rawSettings.theme !== undefined) {
      return normalizeMode(rawSettings.theme)
    }

    return DEFAULT_THEME_STATE.mode
  }

  function loadThemeState() {
    const rawTheme = loadRawThemeState()
    const rawSettings = loadRawSettingsState()

    return normalizeThemeState({
      mode: getLegacyMode(rawTheme, rawSettings),
      accentColor: rawTheme.accentColor || rawSettings.accentColor,
      bgPreset: rawTheme.bgPreset || rawTheme.bgStyle || rawSettings.bgPreset || rawSettings.bgStyle,
      radius: rawTheme.radius ?? rawSettings.radius,
      glass: rawTheme.glass ?? rawSettings.glass,
      specular: rawTheme.specular ?? rawSettings.specular,
    })
  }

  function getDefaultAccent(mode, presetKey) {
    const preset = getBackgroundPreset(presetKey)
    if (mode === 'light') return preset.light.accent
    return preset.dark.accent
  }

  function saveThemeState(patch) {
    const current = loadThemeState()
    const requestedMode = patch && patch.mode !== undefined ? patch.mode : current.mode
    const requestedPreset = patch && patch.bgPreset !== undefined ? patch.bgPreset : current.bgPreset
    const normalizedMode = normalizeMode(requestedMode)
    const normalizedPreset = normalizeBgPreset(requestedPreset)
    const shouldUsePresetAccent = patch && patch.accentColor === undefined && patch && (patch.mode !== undefined || patch.bgPreset !== undefined)
    const next = normalizeThemeState({
      ...current,
      ...patch,
      mode: normalizedMode,
      bgPreset: normalizedPreset,
      accentColor: patch && patch.accentColor !== undefined
        ? patch.accentColor
        : (shouldUsePresetAccent
          ? getDefaultAccent(normalizedMode, normalizedPreset)
          : current.accentColor),
      radius: patch && patch.radius !== undefined ? patch.radius : current.radius,
      glass: patch && patch.glass !== undefined ? patch.glass : current.glass,
      specular: patch && patch.specular !== undefined ? patch.specular : current.specular,
    })
    localStorage.setItem(THEME_KEY, JSON.stringify(next))

    const settings = loadRawSettingsState()
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      ...settings,
      theme: next.mode,
      accentColor: next.accentColor,
      bgStyle: next.bgPreset,
      radius: next.radius,
      glass: next.glass,
      specular: next.specular,
    }))

    return next
  }

  function getBackgroundPreset(key) {
    const presetKey = normalizeBgPreset(key)
    return { key: presetKey, ...BACKGROUND_PRESETS[presetKey] }
  }

  return {
    THEME_KEY,
    SETTINGS_KEY,
    DEFAULT_THEME_STATE,
    BACKGROUND_PRESETS,
    loadThemeState,
    saveThemeState,
    getDefaultAccent,
    normalizeThemeState,
    getBackgroundPreset,
  }
})()

window.BrowserThemeState = BrowserThemeState

/* Auto-apply --cg-radius, --cg-glass, and --cg-specular so every document that loads this module
   gets the values. theme.js overwrites them on the shell, but pages/iframes rely
   on this fallback. */
;(function () {
  function applyThemeVars() {
    try {
      var state = BrowserThemeState.loadThemeState()
      if (!state) return
      if (typeof state.radius === 'number') {
        document.documentElement.style.setProperty('--cg-radius', state.radius + 'px')
      }
      if (typeof state.glass === 'number') {
        document.documentElement.style.setProperty('--cg-glass', state.glass)
      }
      if (typeof state.specular === 'number') {
        document.documentElement.style.setProperty('--cg-specular', state.specular)
      }
    } catch (_) {}
  }
  applyThemeVars()
  window.addEventListener('storage', function (e) {
    if (e.key === BrowserThemeState.THEME_KEY || e.key === BrowserThemeState.SETTINGS_KEY) {
      applyThemeVars()
    }
  })
})()
