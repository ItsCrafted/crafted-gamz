class AccountManager {
  constructor() {
    this.FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online'
    this.BM_KEY              = 'cg_bookmarks'
    this.PINS_KEY            = 'cg_pins'
    this.SYNC_MS             = 8000

    this.db            = null
    this.auth          = null
    this.user          = null
    this.isGuest       = false
    this.firebaseLoaded = false
    this.syncIntervalId = null
    this.syncCount      = 0
    this.lastSyncHash   = ''

    this._init()
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

  async _loadConfig() {
    const res = await fetch(this.FIREBASE_CONFIG_URL, {
      headers: { 'X-Requested-With': 'craftedgamz-firebase' }
    })
    if (!res.ok) throw new Error('Config fetch failed: ' + res.status)
    return res.json()
  }

  async _init() {
    try {
      if (typeof firebase === 'undefined') {
        await this._loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js')
        await this._loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js')
        await this._loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js')
      }

      const config = await this._loadConfig()
      if (!firebase.apps.length) firebase.initializeApp(config)

      this.auth = firebase.auth()
      this.db   = firebase.firestore()
      this.firebaseLoaded = true

      this.auth.getRedirectResult().then(result => {
        if (result && result.user) this._ensureUserDoc(result.user)
      }).catch(e => console.warn('[Account] Redirect result:', e))

      this.auth.onAuthStateChanged(async u => {
        if (u) {
          this.user    = u
          this.isGuest = false
          console.log('[Account] Signed in:', u.email)
          await this.pullBookmarks()
          await this.pullPins()
          this._startSync()
          this._hideOverlay()
        } else {
          this.user = null
          this._stopSync()
          if (!this.isGuest) this._showOverlay()
        }
      })
    } catch (e) {
      console.error('[Account] Init failed:', e)
    }
  }


  async _ensureUserDoc(u) {
    const ref = this.db.collection('users').doc(u.uid)
    const doc = await ref.get()
    if (!doc.exists) {
      await ref.set({
        name:      u.displayName || u.email.split('@')[0],
        email:     u.email,
        photoURL:  u.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        bookmarks: []
      })
    }
  }

  async getUserProfile() {
    if (!this.user || !this.db) return null
    const doc = await this.db.collection('users').doc(this.user.uid).get()
    return doc.exists ? doc.data() : null
  }

  _getBookmarks() {
    try { return JSON.parse(localStorage.getItem(this.BM_KEY)) || [] } catch { return [] }
  }

  _setBookmarks(list) {
    localStorage.setItem(this.BM_KEY, JSON.stringify(list))
    if (typeof renderBookmarksBar === 'function') renderBookmarksBar()
  }

  async pushBookmarks() {
    if (!this.db) {
  console.warn('DB not ready')
  return
}
    if (!this.user || !this.db) return
    const list = this._getBookmarks()
    const hash = JSON.stringify(list)
    if (hash === this.lastSyncHash) return
    this.lastSyncHash = hash
    this.syncCount++
    try {
      await this.db.collection('users').doc(this.user.uid).set(
        { bookmarks: list, lastSync: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      )
      console.log(`%c[Account] Sync #${this.syncCount} — pushed ${list.length} bookmarks`, 'color:#57b45f;font-weight:bold')
    } catch (e) {
      console.warn('[Account] Push failed:', e)
    }
  }

  async pullBookmarks() {
    if (!this.user || !this.db) return
    try {
      const doc = await this.db.collection('users').doc(this.user.uid).get()
      if (!doc.exists) return
      const remote = doc.data().bookmarks
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
      console.log(`[Account] Pulled ${merged.length} bookmarks from Firestore`)
    } catch (e) {
      console.warn('[Account] Pull failed:', e)
    }
  }

  _startSync() {
    if (this.syncIntervalId) return
    this.syncIntervalId = setInterval(() => this.pushBookmarks(), this.SYNC_MS)
    console.log('[Account] Auto-sync started (every', this.SYNC_MS / 1000, 's, change-based)')
  }

  _stopSync() {
    if (this.syncIntervalId) { clearInterval(this.syncIntervalId); this.syncIntervalId = null }
    this.syncCount    = 0
    this.lastSyncHash = ''
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
    if (!this.user || !this.db) return
    const pins = this._getPins()
    if (!pins) return
    try {
      await this.db.collection('users').doc(this.user.uid).set(
        { pins, lastSync: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      )
      console.log(`[Account] Pushed ${pins.length} pins`)
    } catch (e) {
      console.warn('[Account] Pin push failed:', e)
    }
  }

  async pullPins() {
    if (!this.user || !this.db) return
    try {
      const doc = await this.db.collection('users').doc(this.user.uid).get()
      if (!doc.exists) return
      const remote = doc.data().pins
      if (!Array.isArray(remote)) return
      const localMap = Object.fromEntries((this._getPins() || []).map(p => [p.url, p]))
      const merged = remote.map(p => ({
        ...p,
        favicon: (localMap[p.url]?.favicon?.startsWith('data:'))
          ? localMap[p.url].favicon
          : p.favicon
      }))
      this._setPins(merged)
      console.log(`[Account] Pulled ${merged.length} pins from Firestore`)
    } catch (e) {
      console.warn('[Account] Pin pull failed:', e)
    }
  }


  async signOut() {
    await this.pushBookmarks()
    await this.pushPins()
    this._stopSync()
    await this.auth.signOut()
    this.user    = null
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
          position:relative;width:min(780px,92vw);aspect-ratio:16/9;
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
        .cg-auth-body { position:relative;z-index:2;display:flex;flex:1;min-height:0; }
        .cg-auth-left {
          flex:1;display:flex;flex-direction:column;justify-content:center;
          padding:2rem 1.75rem 1.5rem 2.25rem;
          border-right:1px solid rgba(255,255,255,.1);
        }
        .cg-auth-right {
          flex:1;display:flex;flex-direction:column;justify-content:center;
          padding:2rem 2.25rem 1.5rem 1.75rem;
        }
        #cg-auth-box h2 {
          color:#fff;font-size:clamp(22px,3.5vw,40px);font-weight:300;margin:0 0 6px;
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
        .cg-btn-google  { background:rgba(255,255,255,.94);color:#202124;border-color:transparent; }
        .cg-btn-google:hover:not(:disabled)  { background:#fff;box-shadow:0 0 20px rgba(255,255,255,.2);transform:translateY(-1px); }
        .cg-btn-github  { background:rgba(22,27,34,.9);color:#fff;border-color:rgba(255,255,255,.1); }
        .cg-btn-github:hover:not(:disabled)  { background:rgba(22,27,34,1);transform:translateY(-1px); }
        .cg-btn-primary { background:rgba(255,255,255,.1);color:#fff; }
        .cg-btn-primary:hover:not(:disabled) { background:rgba(255,255,255,.18);transform:translateY(-1px); }
        .cg-btn-ghost   { background:transparent;color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.1);margin-bottom:0; }
        .cg-btn-ghost:hover { background:rgba(255,255,255,.07); }
        .cg-divider {
          display:flex;align-items:center;gap:10px;
          color:rgba(255,255,255,.38);font-size:12px;margin-bottom:12px;
        }
        .cg-divider::before,.cg-divider::after { content:'';flex:1;border-bottom:1px solid rgba(255,255,255,.1); }
        .cg-error  { color:#f28b82;font-size:12px;min-height:16px;margin:-4px 0 8px; }
        .cg-toggle { text-align:center;font-size:12px;color:rgba(255,255,255,.5);cursor:pointer;margin-top:8px;transition:color .15s; }
        .cg-toggle:hover { color:#fff; }
        .cg-oauth-icon { width:17px;height:17px;flex-shrink:0; }
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
          <!-- Left: OAuth -->
          <div class="cg-auth-left">
            <h2>Welcome to<br>Crafted Gamz</h2>
            <p class="cg-sub">Sign in to sync your bookmarks across devices.</p>

            <button class="cg-btn cg-btn-google" id="cg-google-btn">
              <svg class="cg-oauth-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button class="cg-btn cg-btn-github" id="cg-github-btn">
              <svg class="cg-oauth-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.05.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          <!-- Right: Email -->
          <div class="cg-auth-right">
            <div class="cg-divider">or sign in with email</div>
            <input id="cg-name"     class="cg-input" type="text"     placeholder="Your name"  style="display:none" autocomplete="name">
            <input id="cg-email"    class="cg-input" type="email"    placeholder="Email"       autocomplete="email">
            <input id="cg-password" class="cg-input" type="password" placeholder="Password"    autocomplete="current-password">
            <div class="cg-error" id="cg-error"></div>
            <button class="cg-btn cg-btn-primary" id="cg-submit">Sign In</button>
            <button class="cg-btn cg-btn-ghost"   id="cg-guest">Continue as Guest</button>
            <div class="cg-toggle" id="cg-toggle">Don't have an account? Sign up</div>
          </div>
        </div>

        <div class="cg-footer">Crafted Gamz · your bookmarks sync to the cloud when signed in</div>
      </div>
    `

    document.body.appendChild(overlay)

    let isSignUp = false
    const nameEl   = overlay.querySelector('#cg-name')
    const emailEl  = overlay.querySelector('#cg-email')
    const passEl   = overlay.querySelector('#cg-password')
    const submitEl = overlay.querySelector('#cg-submit')
    const googleEl = overlay.querySelector('#cg-google-btn')
    const githubEl = overlay.querySelector('#cg-github-btn')
    const guestEl  = overlay.querySelector('#cg-guest')
    const toggleEl = overlay.querySelector('#cg-toggle')
    const errorEl  = overlay.querySelector('#cg-error')

    const setErr   = msg => { errorEl.textContent = msg }
    const clearErr = ()  => { errorEl.textContent = '' }

    const makeOAuthHandler = (type, btn) => async () => {
      clearErr()
      btn.disabled = true
      const orig = btn.innerHTML
      btn.innerHTML = '<span>Signing in…</span>'
      try {
        const provider = type === 'Google'
          ? new firebase.auth.GoogleAuthProvider()
          : new firebase.auth.GithubAuthProvider()
        try {
          const result = await this.auth.signInWithPopup(provider)
          await this._ensureUserDoc(result.user)
        } catch (popupErr) {
          if (popupErr.code === 'auth/unauthorized-domain') {
            await this.auth.signInWithRedirect(provider); return
          }
          throw popupErr
        }
      } catch (e) {
        btn.disabled = false
        btn.innerHTML = orig
        if (!['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(e.code)) {
          setErr(e.code === 'auth/popup-blocked'
            ? 'Pop-up blocked — please allow pop-ups for this site.'
            : e.message)
        }
      }
    }
    googleEl.addEventListener('click', makeOAuthHandler('Google', googleEl))
    githubEl.addEventListener('click', makeOAuthHandler('GitHub', githubEl))

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
          const cred = await this.auth.createUserWithEmailAndPassword(email, pass)
          await this._ensureUserDoc({ ...cred.user, displayName: name })
          await this.db.collection('users').doc(cred.user.uid).update({ name })
        } else {
          await this.auth.signInWithEmailAndPassword(email, pass)
        }
      } catch (e) {
        submitEl.disabled = false
        submitEl.textContent = isSignUp ? 'Sign Up' : 'Sign In'
        const msgs = {
          'auth/invalid-email':        'Invalid email address.',
          'auth/user-not-found':       'No account found with that email.',
          'auth/wrong-password':       'Incorrect password.',
          'auth/invalid-credential':   'Incorrect email or password.',
          'auth/email-already-in-use': 'That email is already in use.',
          'auth/weak-password':        'Password must be at least 6 characters.',
        }
        setErr(msgs[e.code] || e.message)
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