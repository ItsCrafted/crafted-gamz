const BrowserThemeState = (() => {
  const THEME_KEY = 'cg_theme'
  const SETTINGS_KEY = 'cg_settings'
  const DEFAULT_THEME_STATE = {
    mode: 'dark',
    accentColor: null,
    bgPreset: 'minimal',
    radius: 16,
    glass: 1,
    specular: 1,
    wallpaper: null,
    customAccent: false,
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

  /* ── Dynamic wallpaper keys available in dynamic-wallpapers.html ── */
  const DYNAMIC_WALLPAPERS = [
    { key: 'lightning',    label: 'Lightning',    color: '7cb9ff' },
    { key: 'aurora',       label: 'Aurora',       color: '72efdd' },
    { key: 'starfield',    label: 'Starfield',    color: 'a78bfa' },
    { key: 'waves',        label: 'Waves',        color: '38bdf8' },
    { key: 'matrix',       label: 'Matrix',       color: '00ff41' },
    { key: 'rain',         label: 'Rain',         color: '60a5fa' },
    { key: 'snow',         label: 'Snow',         color: 'e0f2fe' },
    { key: 'sunset',       label: 'Sunset',       color: 'fb923c' },
    { key: 'cyberpunk',    label: 'Cyberpunk',    color: '00f5ff' },
    { key: 'clouds',       label: 'Clouds',       color: 'cbd5e1' },
    { key: 'volcano',      label: 'Volcano',      color: 'f97316' },
    { key: 'desert',       label: 'Desert',       color: 'fbbf24' },
    { key: 'glacier',      label: 'Glacier',      color: '7dd3fc' },
    { key: 'fireflies',    label: 'Fireflies',    color: 'fde68a' },
    { key: 'nebula-anim',  label: 'Nebula',       color: 'c084fc' },
    { key: 'ocean-anim',   label: 'Ocean',        color: '22d3ee' },
    { key: 'sakura',       label: 'Sakura',       color: 'f9a8d4' },
    { key: 'pulse',        label: 'Pulse',        color: '818cf8' },
    { key: 'galaxy',       label: 'Galaxy',       color: '93c5fd' },
    { key: 'plasma',       label: 'Plasma',       color: 'a855f7' },
    { key: 'thunder',      label: 'Thunder',      color: 'bfdbfe' },
    { key: 'aurora-dream', label: 'Aurora Dream', color: '34d399' },
    { key: 'cyber-rain',   label: 'Cyber Rain',   color: '2dd4bf' },
    { key: 'void',         label: 'Void',         color: 'a855f7' },
    { key: 'plasma-fire',  label: 'Plasma Fire',  color: 'f97316' },
  ]

  function isHexColor(value) {
    return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value.trim())
  }

  function normalizeAccentColor(value) {
    if (value === null || value === undefined || value === '') return null
    return isHexColor(value) ? value.trim().toLowerCase() : null
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

  function normalizeWallpaper(value) {
    if (!value) return null
    const key = String(value).trim().toLowerCase()
    return DYNAMIC_WALLPAPERS.some(w => w.key === key) ? key : null
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
      wallpaper: normalizeWallpaper(next.wallpaper),
      customAccent: next.customAccent === true,
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
      wallpaper: rawTheme.wallpaper ?? rawSettings.wallpaper ?? null,
      customAccent: rawTheme.customAccent ?? rawSettings.customAccent ?? false,
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
    const patchingCustomAccent = patch && patch.customAccent !== undefined ? patch.customAccent : current.customAccent
    const shouldUsePresetAccent = !patchingCustomAccent && patch && patch.accentColor === undefined && (patch.mode !== undefined || patch.bgPreset !== undefined)
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
      wallpaper: patch && patch.wallpaper !== undefined ? patch.wallpaper : current.wallpaper,
      customAccent: patchingCustomAccent,
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
      wallpaper: next.wallpaper,
      customAccent: next.customAccent,
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
    DYNAMIC_WALLPAPERS,
    loadThemeState,
    saveThemeState,
    getDefaultAccent,
    normalizeThemeState,
    normalizeWallpaper,
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
