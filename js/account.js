class AccountManager {
  constructor() {
    this.CCLOUD_URL       = 'https://cloud.craftedgamz.com'
    this.BM_KEY           = 'cg_bookmarks'
    this.PINS_KEY         = 'cg_pins'
    this.TABS_KEY         = 'cg_tabs'
    this.SYNC_MS          = 8000

    this.ccloud         = null
    this.user           = null
    this.isGuest        = false
    this.syncIntervalId = null
    this.syncCount      = 0
    this.lastSyncHash   = ''

    this._lastPushedTheme = undefined
    this._lastPushedAds = undefined
    this._lastPushedMusicVolume = undefined
    this._lastPushedTipDismissed = undefined

    this._init()
  }

  async _init() {
    try {
      // Ensure ccloud-client.js is loaded
      if (typeof CCloudClient === 'undefined') {
        await this._loadScript('js/ccloud-client.js')
      }

      this.ccloud = new CCloudClient({
        workerUrl: this.CCLOUD_URL
      })
      
      // Check for existing session
      const currentUser = this.ccloud.getCurrentUser()
      if (currentUser) {
        this.user = currentUser
        this.isGuest = false
        console.log('[Account] Signed in from session:', currentUser.email)
        await this.pullBookmarks()
        await this.pullPins()
        await this.pullTabs()
        await this.pullRadius()
        await this.pullAds()
        await this.pullMusicVolume()
        await this.pullTipDismissed()
        this._startSync()
        this._hideOverlay()
      } else {
        this._showOverlay()
      }

      if (typeof UserStats !== 'undefined') UserStats.bindCCloud(this.ccloud)
    } catch (e) {
      console.error('[Account] Init failed:', e)
    }
  }

  _loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = src
      s.onload = resolve
      s.onerror = () => reject(new Error('Failed to load: ' + src))
      document.head.appendChild(s)
    })
  }

  async getUserProfile() {
    if (!this.user || !this.ccloud) return null
    try {
      const profile = await this.ccloud.getData(`users/${this.user.uid}/profile`)
      return profile
    } catch (e) {
      console.warn('[Account] Failed to get profile:', e)
      return null
    }
  }

  _getBookmarks() {
    try { return JSON.parse(localStorage.getItem(this.BM_KEY)) || [] } catch { return [] }
  }

  _setBookmarks(list) {
    localStorage.setItem(this.BM_KEY, JSON.stringify(list))
    if (typeof renderBookmarksBar === 'function') renderBookmarksBar()
  }

  async pushBookmarks() {
    if (!this.user || !this.ccloud) return
    const list = this._getBookmarks()
    const hash = JSON.stringify(list)
    if (hash === this.lastSyncHash) return
    this.lastSyncHash = hash
    this.syncCount++
    try {
      await this.ccloud.setData(`users/${this.user.uid}/bookmarks`, { bookmarks: list })
      console.log(`%c[Account] Sync #${this.syncCount} — pushed ${list.length} bookmarks`, 'color:#57b45f;font-weight:bold')
    } catch (e) {
      console.warn('[Account] Push failed:', e)
    }
  }

  async pullBookmarks() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/bookmarks`)
      if (!data) return
      const remote = data.bookmarks
      if (!Array.isArray(remote)) return

      const localMap = Object.fromEntries(this._getBookmarks().map(b => [b.url, b]))
      const merged = remote.map(b => ({
        ...b,
        favicon: (localMap[b.url]?.favicon?.startsWith('data:'))
          ? localMap[b.url].favicon
          : b.favicon
      }))
      this._setBookmarks(merged)
      this.lastSyncHash = JSON.stringify(merged)
      console.log(`[Account] Pulled ${merged.length} bookmarks from cCloud`)
    } catch (e) {
      console.warn('[Account] Pull failed:', e)
    }
  }

  _startSync() {
    if (this.syncIntervalId) return
    this.syncIntervalId = setInterval(() => {
      this.pushBookmarks()
      this.pushTabs()
      this.pushTheme()
      this.pushAds()
      this.pushMusicVolume()
      this.pushTipDismissed()
    }, this.SYNC_MS)
    console.log('[Account] Auto-sync started (every', this.SYNC_MS / 1000, 's, change-based)')
  }

  _stopSync() {
    if (this.syncIntervalId) { clearInterval(this.syncIntervalId); this.syncIntervalId = null }
    this.syncCount    = 0
    this.lastSyncHash = ''
    this._lastPushedRadius = undefined
    this._lastPushedTheme  = undefined
    this._lastPushedAds = undefined
    this._lastPushedMusicVolume = undefined
    this._lastPushedTipDismissed = undefined
  }


  _getPins() {
    try { return JSON.parse(localStorage.getItem(this.PINS_KEY)) || null } catch { return null }
  }

  _setPins(list) {
    localStorage.setItem(this.PINS_KEY, JSON.stringify(list))
    if (typeof renderPins === 'function') renderPins()
  }

  schedulePinSync() {
    clearTimeout(this._pinSyncTimer)
    this._pinSyncTimer = setTimeout(() => this.pushPins(), 2000)
  }

  async pushPins() {
    if (!this.user || !this.ccloud) return
    const pins = this._getPins()
    if (!pins) return
    try {
      await this.ccloud.setData(`users/${this.user.uid}/pins`, { pins })
      console.log(`[Account] Pushed ${pins.length} pins`)
    } catch (e) {
      console.warn('[Account] Pin push failed:', e)
    }
  }

  async pullPins() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/pins`)
      if (!data) return
      const remote = data.pins
      if (!Array.isArray(remote)) return
      const localMap = Object.fromEntries((this._getPins() || []).map(p => [p.url, p]))
      const merged = remote.map(p => ({
        ...p,
        favicon: (localMap[p.url]?.favicon?.startsWith('data:'))
          ? localMap[p.url].favicon
          : p.favicon
      }))
      this._setPins(merged)
      console.log(`[Account] Pulled ${merged.length} pins from cCloud`)
    } catch (e) {
      console.warn('[Account] Pin pull failed:', e)
    }
  }


  _getTabsSnapshot() {
    if (typeof chromeTabs === 'undefined') return null
    const tabs = chromeTabs.tabEls.map(tabEl => ({
      url:    tabEl.dataset.url   || 'newtab',
      title:  tabEl.dataset.title || 'New Tab',
      active: tabEl.hasAttribute('active'),
    }))
    if (!tabs.length) return null
    return tabs
  }

  async pushTabs() {
    if (!this.user || !this.ccloud) return
    const tabs = this._getTabsSnapshot()
    if (!tabs) return
    const hash = JSON.stringify(tabs)
    if (hash === this._lastTabsHash) return
    this._lastTabsHash = hash
    try {
      await this.ccloud.setData(`users/${this.user.uid}/tabs`, { tabs })
      console.log(`[Account] Pushed ${tabs.length} tabs`)
    } catch (e) {
      console.warn('[Account] Tab push failed:', e)
    }
  }

  async pullTabs() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/tabs`)
      if (!data) return
      const remote = data.tabs
      if (!Array.isArray(remote) || !remote.length) return
      localStorage.setItem(this.TABS_KEY, JSON.stringify(remote))
      console.log(`[Account] Pulled ${remote.length} tabs from cCloud`)
      if (typeof restoreTabs === 'function') restoreTabs(remote)
    } catch (e) {
      console.warn('[Account] Tab pull failed:', e)
    }
  }

  scheduleTabSync() {
    clearTimeout(this._tabSyncTimer)
    this._tabSyncTimer = setTimeout(() => this.pushTabs(), 1500)
  }


  _getLocalRadius() {
    try {
      const raw = JSON.parse(localStorage.getItem('cg_theme'))
      if (raw && typeof raw.radius === 'number') return raw.radius
    } catch {}
    return null
  }

  scheduleRadiusSync() { this.scheduleThemeSync() }
  scheduleGlassSync()   { this.scheduleThemeSync() }
  scheduleSpecularSync(){ this.scheduleThemeSync() }

  scheduleThemeSync() {
    if (!this.user) return
    clearTimeout(this._themeSyncTimer)
    this._themeSyncTimer = setTimeout(() => this.pushTheme(), 1500)
  }

  _getLocalTheme() {
    try {
      return JSON.parse(localStorage.getItem('cg_theme')) || null
    } catch { return null }
  }

  async pushTheme() {
    if (!this.user || !this.ccloud) return
    const theme = this._getLocalTheme()
    if (!theme) return
    const hash = JSON.stringify(theme)
    if (hash === this._lastPushedTheme) return
    this._lastPushedTheme = hash
    this._lastPushedRadius = theme.radius
    try {
      await this.ccloud.setData(`users/${this.user.uid}/theme`, {
        theme,
        radius: theme.radius ?? null
      })
      console.log('[Account] Pushed theme', theme)
    } catch (e) {
      console.warn('[Account] Theme push failed:', e)
    }
  }

  async pullTheme() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/theme`)
      if (!data) return

      let remote = data.theme || null
      if (!remote && typeof data.radius === 'number') {
        remote = { radius: data.radius }
      }
      if (!remote) return

      this._lastPushedTheme = JSON.stringify(remote)
      this._lastPushedRadius = remote.radius

      if (window.BrowserThemeState) {
        window.BrowserThemeState.saveThemeState(remote)
      }
      if (window.Theme && typeof window.Theme.refresh === 'function') {
        await window.Theme.refresh()
      }
      console.log('[Account] Pulled theme from cCloud', remote)
    } catch (e) {
      console.warn('[Account] Theme pull failed:', e)
    }
  }

  async pushRadius() { return this.pushTheme() }
  async pullRadius() { return this.pullTheme() }


  // Ads preference sync
  _getAds() {
    return localStorage.getItem('cg_ads') !== '0'
  }

  _setAds(enabled) {
    localStorage.setItem('cg_ads', enabled ? '1' : '0')
  }

  scheduleAdsSync() {
    if (!this.user) return
    clearTimeout(this._adsSyncTimer)
    this._adsSyncTimer = setTimeout(() => this.pushAds(), 1500)
  }

  async pushAds() {
    if (!this.user || !this.ccloud) return
    const ads = this._getAds()
    const hash = String(ads)
    if (hash === this._lastPushedAds) return
    this._lastPushedAds = hash
    try {
      await this.ccloud.setData(`users/${this.user.uid}/settings`, { ads })
      console.log('[Account] Pushed ads preference:', ads)
    } catch (e) {
      console.warn('[Account] Ads push failed:', e)
    }
  }

  async pullAds() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/settings`)
      if (!data) return
      if (typeof data.ads === 'boolean') {
        this._setAds(data.ads)
        this._lastPushedAds = String(data.ads)
        console.log('[Account] Pulled ads preference from cCloud:', data.ads)
      }
    } catch (e) {
      console.warn('[Account] Ads pull failed:', e)
    }
  }

  // Music volume sync
  _getMusicVolume() {
    try {
      const vol = localStorage.getItem('cg-music-volume')
      return vol !== null ? parseFloat(vol) : null
    } catch { return null }
  }

  _setMusicVolume(volume) {
    if (volume !== null) {
      localStorage.setItem('cg-music-volume', String(volume))
    } else {
      localStorage.removeItem('cg-music-volume')
    }
  }

  scheduleMusicVolumeSync() {
    if (!this.user) return
    clearTimeout(this._musicVolumeSyncTimer)
    this._musicVolumeSyncTimer = setTimeout(() => this.pushMusicVolume(), 1500)
  }

  async pushMusicVolume() {
    if (!this.user || !this.ccloud) return
    const volume = this._getMusicVolume()
    const hash = String(volume)
    if (hash === this._lastPushedMusicVolume) return
    this._lastPushedMusicVolume = hash
    try {
      await this.ccloud.setData(`users/${this.user.uid}/settings`, { musicVolume: volume })
      console.log('[Account] Pushed music volume:', volume)
    } catch (e) {
      console.warn('[Account] Music volume push failed:', e)
    }
  }

  async pullMusicVolume() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/settings`)
      if (!data) return
      if (typeof data.musicVolume === 'number' || data.musicVolume === null) {
        this._setMusicVolume(data.musicVolume)
        this._lastPushedMusicVolume = String(data.musicVolume)
        console.log('[Account] Pulled music volume from cCloud:', data.musicVolume)
      }
    } catch (e) {
      console.warn('[Account] Music volume pull failed:', e)
    }
  }

  // Tip dismissed sync
  _getTipDismissed() {
    return localStorage.getItem('cg_tip_dismissed') === '1'
  }

  _setTipDismissed(dismissed) {
    if (dismissed) {
      localStorage.setItem('cg_tip_dismissed', '1')
    } else {
      localStorage.removeItem('cg_tip_dismissed')
    }
  }

  scheduleTipDismissedSync() {
    if (!this.user) return
    clearTimeout(this._tipDismissedSyncTimer)
    this._tipDismissedSyncTimer = setTimeout(() => this.pushTipDismissed(), 1500)
  }

  async pushTipDismissed() {
    if (!this.user || !this.ccloud) return
    const tipDismissed = this._getTipDismissed()
    const hash = String(tipDismissed)
    if (hash === this._lastPushedTipDismissed) return
    this._lastPushedTipDismissed = hash
    try {
      await this.ccloud.setData(`users/${this.user.uid}/settings`, { tipDismissed })
      console.log('[Account] Pushed tip dismissed:', tipDismissed)
    } catch (e) {
      console.warn('[Account] Tip dismissed push failed:', e)
    }
  }

  async pullTipDismissed() {
    if (!this.user || !this.ccloud) return
    try {
      const data = await this.ccloud.getData(`users/${this.user.uid}/settings`)
      if (!data) return
      if (typeof data.tipDismissed === 'boolean') {
        this._setTipDismissed(data.tipDismissed)
        this._lastPushedTipDismissed = String(data.tipDismissed)
        console.log('[Account] Pulled tip dismissed from cCloud:', data.tipDismissed)
      }
    } catch (e) {
      console.warn('[Account] Tip dismissed pull failed:', e)
    }
  }


  async signOut() {
    await this.pushBookmarks()
    await this.pushPins()
    await this.pushTabs()
    await this.pushRadius()
    await this.pushAds()
    await this.pushMusicVolume()
    await this.pushTipDismissed()
    this._stopSync()
    await this.ccloud.signOut()
    this.user = null
    this.isGuest = false
  }


  _showOverlay() {
    if (document.getElementById('cg-auth-overlay')) return

    const overlay = document.createElement('div')
    overlay.id = 'cg-auth-overlay'
    overlay.innerHTML = `
      <style>
        #cg-auth-overlay {
          position:fixed;inset:0;background:rgba(0,0,0,.82);
          display:flex;align-items:center;justify-content:center;
          z-index:10000;
          font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
        }
        #cg-auth-box {
          position:relative;width:min(420px,92vw);
          border-radius:20px;overflow:hidden;
          box-shadow:0 20px 60px rgba(0,0,0,.6);
          display:flex;flex-direction:column;
        }
        .cg-glass {
          position:absolute;inset:0;z-index:0;
          backdrop-filter:blur(20px) saturate(150%);
          background:rgba(25,25,25,.48);
        }
        .cg-glass-border {
          position:absolute;inset:0;border-radius:inherit;z-index:1;pointer-events:none;
          box-shadow:inset 1px 1px 0 rgba(255,255,255,.15),inset 0 0 14px rgba(255,255,255,.05);
        }
        .cg-auth-body { position:relative;z-index:2;display:flex;flex-direction:column;padding:2rem; }
        #cg-auth-box h2 {
          color:#fff;font-size:clamp(22px,3.5vw,32px);font-weight:300;margin:0 0 6px;
          line-height:1.15;
        }
        .cg-sub { color:rgba(255,255,255,.55);font-size:13px;margin:0 0 1.4rem; }
        .cg-input {
          width:100%;padding:10px 14px;margin-bottom:10px;
          background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.16);
          border-radius:10px;color:#fff;font-size:14px;font-family:inherit;
          outline:none;box-sizing:border-box;transition:border-color .2s,background .2s;
        }
        .cg-input::placeholder { color:rgba(255,255,255,.35); }
        .cg-input:focus { border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.11); }
        .cg-btn {
          width:100%;padding:10px 18px;margin-bottom:9px;
          border-radius:10px;cursor:pointer;font-size:14px;font-family:inherit;font-weight:500;
          border:1.5px solid rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center;gap:10px;
          box-sizing:border-box;transition:all .2s;
        }
        .cg-btn:disabled { opacity:.45;cursor:not-allowed;transform:none!important; }
        .cg-btn-primary { background:rgba(255,255,255,.1);color:#fff; }
        .cg-btn-primary:hover:not(:disabled) { background:rgba(255,255,255,.18);transform:translateY(-1px); }
        .cg-btn-ghost   { background:transparent;color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.1);margin-bottom:0; }
        .cg-btn-ghost:hover { background:rgba(255,255,255,.07); }
        .cg-error  { color:#f28b82;font-size:12px;min-height:16px;margin:-4px 0 8px; }
        .cg-toggle { text-align:center;font-size:12px;color:rgba(255,255,255,.5);cursor:pointer;margin-top:8px;transition:color .15s; }
        .cg-toggle:hover { color:#fff; }
        .cg-footer {
          position:relative;z-index:2;text-align:center;padding:7px 0 10px;
          font-size:11px;color:rgba(255,255,255,.28);
          border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;
        }
      </style>

      <div id="cg-auth-box">
        <div class="cg-glass"></div>
        <div class="cg-glass-border"></div>

        <div class="cg-auth-body">
          <h2>Welcome to<br>Crafted Gamz</h2>
          <p class="cg-sub">Sign in to sync your bookmarks and settings across devices.</p>
          
          <input id="cg-name"     class="cg-input" type="text"     placeholder="Your name"  style="display:none" autocomplete="name">
          <input id="cg-email"    class="cg-input" type="email"    placeholder="Email"       autocomplete="email">
          <input id="cg-password" class="cg-input" type="password" placeholder="Password"    autocomplete="current-password">
          <div class="cg-error" id="cg-error"></div>
          <button class="cg-btn cg-btn-primary" id="cg-submit">Sign In</button>
          <button class="cg-btn cg-btn-ghost"   id="cg-guest">Continue as Guest</button>
          <div class="cg-toggle" id="cg-toggle">Don't have an account? Sign up</div>
        </div>

        <div class="cg-footer">Crafted Gamz · powered by cCloud</div>
      </div>
    `

    document.body.appendChild(overlay)

    let isSignUp = false
    const nameEl   = overlay.querySelector('#cg-name')
    const emailEl  = overlay.querySelector('#cg-email')
    const passEl   = overlay.querySelector('#cg-password')
    const submitEl = overlay.querySelector('#cg-submit')
    const guestEl  = overlay.querySelector('#cg-guest')
    const toggleEl = overlay.querySelector('#cg-toggle')
    const errorEl  = overlay.querySelector('#cg-error')

    const setErr   = msg => { errorEl.textContent = msg }
    const clearErr = ()  => { errorEl.textContent = '' }

    submitEl.addEventListener('click', async () => {
      clearErr()
      const email = emailEl.value.trim()
      const pass  = passEl.value
      const name  = nameEl.value.trim()
      if (!email || !pass) { setErr('Please enter your email and password.'); return }
      submitEl.disabled = true
      submitEl.textContent = isSignUp ? 'Creating account…' : 'Signing in…'
      try {
        if (isSignUp) {
          if (!name) { setErr('Please enter your name.'); submitEl.disabled = false; submitEl.textContent = 'Sign Up'; return }
          const result = await this.ccloud.registerWithEmail(email, pass, name, true)
          this.user = {
            uid: result.uid,
            email: result.email,
            displayName: result.displayName
          }
        } else {
          const result = await this.ccloud.signInWithEmail(email, pass, true)
          this.user = {
            uid: result.uid,
            email: result.email,
            displayName: result.displayName
          }
        }
        await this.pullBookmarks()
        await this.pullPins()
        await this.pullTabs()
        await this.pullRadius()
        await this.pullAds()
        await this.pullMusicVolume()
        await this.pullTipDismissed()
        this._startSync()
        this._hideOverlay()
      } catch (e) {
        submitEl.disabled = false
        submitEl.textContent = isSignUp ? 'Sign Up' : 'Sign In'
        setErr(e.message || (isSignUp ? 'Sign up failed' : 'Sign in failed'))
      }
    })

    toggleEl.addEventListener('click', () => {
      isSignUp = !isSignUp
      nameEl.style.display    = isSignUp ? 'block' : 'none'
      submitEl.textContent    = isSignUp ? 'Sign Up' : 'Sign In'
      toggleEl.textContent    = isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"
      clearErr()
    })

    guestEl.addEventListener('click', () => {
      this.isGuest = true
      this._hideOverlay()
    })

    const onEnter = e => { if (e.key === 'Enter') submitEl.click() }
    emailEl.addEventListener('keydown', onEnter)
    passEl.addEventListener('keydown',  onEnter)
    nameEl.addEventListener('keydown',  onEnter)
  }

  _hideOverlay() {
    const el = document.getElementById('cg-auth-overlay')
    if (el) el.remove()
  }
}

const accountManager = new AccountManager()
window.accountManager = accountManager