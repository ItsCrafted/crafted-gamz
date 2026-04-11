class AccountManager {
  constructor() {
    this.FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
    this.db = null;
    this.auth = null;
    this.user = null;
    this.syncInterval = null;
    this.isGuest = false;
    this.lastSyncData = null;
    this.syncCount = 0;
    this.firebaseLoaded = false;

    this.loadFirebaseSDK();
  }

  async loadFirebaseSDK() {
    try {
      if (typeof firebase !== 'undefined') {
        console.log('Firebase SDK already loaded');
        this.firebaseLoaded = true;
        await this.initFirebase();
        return;
      }

      console.log('Loading Firebase SDK...');

      await this.loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
      await this.loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js');
      await this.loadScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js');

      console.log('Firebase SDK loaded successfully');
      this.firebaseLoaded = true;

      await this.initFirebase();
    } catch (error) {
      console.error('Failed to load Firebase SDK:', error);
      alert('Failed to load authentication system. Please refresh the page.');
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  async loadFirebaseConfig() {
    try {
      console.log('Fetching Firebase config from:', this.FIREBASE_CONFIG_URL);

      const res = await fetch(this.FIREBASE_CONFIG_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'craftedgamz-firebase'
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Firebase config fetch failed:', res.status, errorText);
        throw new Error(`Failed to fetch Firebase config: ${res.status}`);
      }

      const config = await res.json();
      console.log('Firebase config loaded successfully');
      return config;
    } catch (error) {
      console.error('Error loading Firebase config:', error);
      throw error;
    }
  }

  async initFirebase() {
    try {
      if (!this.firebaseLoaded) {
        console.log('Waiting for Firebase SDK to load...');
        return;
      }

      const config = await this.loadFirebaseConfig();

      if (!firebase.apps || firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }

      this.auth = firebase.auth();
      this.db = firebase.firestore();

      this.auth.getRedirectResult().then(async (result) => {
        if (result.user) {
          console.log('Redirect sign-in successful');
          await this.handleOAuthSignIn(result);
        }
      }).catch((error) => {
        console.error('Redirect error:', error);
      });

      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log('User signed in:', user.email);
          this.user = user;
          this.isGuest = false;
          await this.loadUserData();
          this.startAutoSync();
          this.hideAuthPrompt();

          const profile = await this.getUserProfile();
          if (profile && profile.name) {
            localStorage.setItem('craftedGamzUser', profile.name);
          }
        } else {
          console.log('User signed out');
          this.user = null;
          this.stopAutoSync();
          if (!this.isGuest) {
            this.showAuthPrompt();
          }
        }
      });
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      alert('Failed to load Firebase configuration. Please check your connection.');
    }
  }

  async loadMarkdown(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      return this.renderMarkdown(text);
    } catch (e) {
      return `<p style="color:rgba(255,255,255,0.6)">Failed to load content: ${e.message}</p>`;
    }
  }

  renderMarkdown(md) {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\\n/g, '<br>')
    .replace(/\\n\\n/g, '<br><br>')
    .replace(/\n{2,}/g, '</p><p>')
    ;
  return `<p>${html}</p>`;
}

  showAuthPrompt() {
    const existing = document.getElementById('auth-prompt-overlay');
    if (existing) existing.remove();

    if (!document.getElementById('svg-filters')) {
      const svgFilters = document.createElement('div');
      svgFilters.id = 'svg-filters';
      svgFilters.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="lg-dist">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" result="warp"/>
              <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="warp"/>
            </filter>
          </defs>
        </svg>
      `;
      svgFilters.style.cssText = 'position: absolute; width: 0; height: 0;';
      document.body.appendChild(svgFilters);
    }

    const overlay = document.createElement('div');
    overlay.id = 'auth-prompt-overlay';
    overlay.innerHTML = `
      <style>
        :root {
          --lg-bg-color: rgba(40, 40, 40, 0.3);
          --lg-highlight: rgba(255, 255, 255, 0.15);
          --lg-text: #ffffff;
        }

        #auth-prompt-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #auth-prompt-box {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
          width: 90%;
          max-width: 780px;
          aspect-ratio: 16 / 9;
          display: flex;
          flex-direction: column;
        }

        .glass-filter {
          position: absolute;
          inset: 0;
          z-index: 0;
          backdrop-filter: blur(10px);
          filter: url(#lg-dist);
          isolation: isolate;
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: var(--lg-bg-color);
        }

        .glass-specular {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          overflow: hidden;
          box-shadow: inset 1px 1px 0 var(--lg-highlight),
                      inset 0 0 10px var(--lg-highlight);
          pointer-events: none;
        }


        .glass-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex: 1;
          min-height: 0;
        }

        .auth-panel-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 1.75rem 1rem 2.25rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .auth-panel-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 2.25rem 1rem 1.75rem;
        }

        #auth-prompt-box h2 {
          color: var(--lg-text);
          font-size: 50px;
          margin: 0 0 6px;
          font-weight: 300;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        #auth-prompt-box .auth-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          margin: 0 0 1.25rem;
        }

        .auth-input {
          width: 100%;
          padding: 10px 16px;
          margin-bottom: 10px;
          font-size: 14px;
          background: rgba(60, 60, 60, 0.2);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          box-sizing: border-box;
        }

        .auth-input::placeholder { color: rgba(255, 255, 255, 0.45); }

        .auth-input:focus {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(80, 80, 80, 0.3);
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.15);
        }

        .auth-btn {
          width: 100%;
          padding: 11px 20px;
          margin-bottom: 10px;
          font-size: 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(5px);
          font-weight: 500;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-sizing: border-box;
        }

        .auth-btn-primary {
          background: rgba(60, 60, 60, 0.3);
          color: white;
          margin-bottom: 8px;
        }

        .auth-btn-primary:hover:not(:disabled) {
          background: rgba(80, 80, 80, 0.4);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .auth-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .auth-btn-google {
          background: rgba(255, 255, 255, 0.92);
          color: #202124;
          border-color: rgba(255, 255, 255, 0.9);
        }

        .auth-btn-google:hover:not(:disabled) {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .auth-btn-github {
          background: rgba(36, 41, 47, 0.9);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .auth-btn-github:hover:not(:disabled) {
          background: rgba(36, 41, 47, 1);
          box-shadow: 0 0 20px rgba(100, 100, 100, 0.3);
          transform: translateY(-1px);
        }

        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .auth-btn-secondary {
          background: rgba(40, 40, 40, 0.2);
          color: rgba(255, 255, 255, 0.85);
          border-color: rgba(255, 255, 255, 0.15);
          margin-bottom: 0;
        }

        .auth-btn-secondary:hover {
          background: rgba(60, 60, 60, 0.3);
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .auth-divider::before { margin-right: 12px; }
        .auth-divider::after  { margin-left:  12px; }

        .auth-toggle {
          text-align: center;
          margin-top: 10px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
        }

        .auth-toggle:hover {
          color: white;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }

        .auth-error {
          color: #ff6b6b;
          font-size: 13px;
          margin-top: -6px;
          margin-bottom: 10px;
          min-height: 18px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .oauth-icon { width: 18px; height: 18px; flex-shrink: 0; }


        .auth-footer {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 8px 0 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .auth-footer a {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .auth-footer a:hover { color: rgba(255, 255, 255, 0.9); }

        .auth-footer .sep {
          margin: 0 8px;
          color: rgba(255, 255, 255, 0.25);
        }


        #auth-legal-view {
          position: relative;
          z-index: 3;
          display: none;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .auth-legal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.75rem 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .auth-legal-back {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          font-size: 13px;
          padding: 5px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .auth-legal-back:hover { background: rgba(255,255,255,0.2); }

        .auth-legal-title {
          color: white;
          font-size: 16px;
          font-weight: 400;
          margin: 0;
        }

        .auth-legal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem 1.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.7;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.2) transparent;
        }

        .auth-legal-body h1 { color: white; font-size: 18px; font-weight: 400; margin: 0 0 0.75rem; }
        .auth-legal-body h2 { color: white; font-size: 15px; font-weight: 500; margin: 1rem 0 0.5rem; }
        .auth-legal-body h3 { color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500; margin: 0.75rem 0 0.4rem; }
        .auth-legal-body h4 { color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 500; margin: 0.5rem 0 0.3rem; }
        .auth-legal-body p  { margin: 0 0 0.75rem; }
        .auth-legal-body ul { margin: 0 0 0.75rem; padding-left: 1.25rem; }
        .auth-legal-body li { margin-bottom: 0.25rem; }
        .auth-legal-body hr { border: none; border-top: 1px solid rgba(255,255,255,0.15); margin: 1rem 0; }
        .auth-legal-body strong { color: white; }

        .auth-legal-loading {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          padding: 1.25rem 1.75rem;
        }
      </style>

      <div id="auth-prompt-box">
        <div class="glass-filter"></div>
        <div class="glass-overlay"></div>
        <div class="glass-specular"></div>

        <div class="glass-content" id="auth-form-view">

          <div class="auth-panel-left">
            <h2>Welcome to Crafted Gamz!</h2>
            <p class="auth-subtitle">Sign in to sync your data across devices</p>

            <button class="auth-btn auth-btn-google" id="auth-google">
              <svg class="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button class="auth-btn auth-btn-github" id="auth-github">
              <svg class="oauth-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          <div class="auth-panel-right">
            <div class="auth-divider">or</div>

            <input type="text"     id="auth-name"     class="auth-input" placeholder="Your name"  style="display:none;">
            <input type="email"    id="auth-email"    class="auth-input" placeholder="Email">
            <input type="password" id="auth-password" class="auth-input" placeholder="Password">
            <div id="auth-error" class="auth-error"></div>

            <button class="auth-btn auth-btn-primary" id="auth-submit">Sign In</button>
            <button class="auth-btn auth-btn-secondary" id="auth-guest">Continue as Guest</button>

            <div class="auth-toggle" id="auth-toggle">Don't have an account? Sign up</div>
          </div>
        </div>

        <div id="auth-legal-view">
          <div class="auth-legal-header">
            <button class="auth-legal-back" id="auth-legal-back">← Back</button>
            <h3 class="auth-legal-title" id="auth-legal-title"></h3>
          </div>
          <div class="auth-legal-body" id="auth-legal-body">
            <p class="auth-legal-loading">Loading…</p>
          </div>
        </div>

        <div class="auth-footer">
          By continuing you agree to our
          <a id="auth-tos-link">Terms of Service</a>
          <span class="sep">·</span>
          <a id="auth-privacy-link">Privacy Policy</a>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    let isSignUp = false;

    const nameInput     = overlay.querySelector('#auth-name');
    const emailInput    = overlay.querySelector('#auth-email');
    const passwordInput = overlay.querySelector('#auth-password');
    const submitBtn     = overlay.querySelector('#auth-submit');
    const googleBtn     = overlay.querySelector('#auth-google');
    const githubBtn     = overlay.querySelector('#auth-github');
    const guestBtn      = overlay.querySelector('#auth-guest');
    const toggleBtn     = overlay.querySelector('#auth-toggle');
    const errorDiv      = overlay.querySelector('#auth-error');

    const formView      = overlay.querySelector('#auth-form-view');
    const legalView     = overlay.querySelector('#auth-legal-view');
    const legalTitle    = overlay.querySelector('#auth-legal-title');
    const legalBody     = overlay.querySelector('#auth-legal-body');
    const legalBackBtn  = overlay.querySelector('#auth-legal-back');
    const tosLink       = overlay.querySelector('#auth-tos-link');
    const privacyLink   = overlay.querySelector('#auth-privacy-link');


    const showLegal = async (title, url) => {
      formView.style.display = 'none';
      legalView.style.display = 'flex';
      legalTitle.textContent = title;
      legalBody.innerHTML = '<p class="auth-legal-loading">Loading…</p>';
      const html = await this.loadMarkdown(url);
      legalBody.innerHTML = html;
    };

    const hideLegal = () => {
      legalView.style.display = 'none';
      formView.style.display = 'flex';
    };

    const TOS_URL     = 'legal/tos.md';
    const PRIVACY_URL = 'legal/privacy.md';

    tosLink.addEventListener('click',     () => showLegal('Terms of Service', TOS_URL));
    privacyLink.addEventListener('click', () => showLegal('Privacy Policy',   PRIVACY_URL));
    legalBackBtn.addEventListener('click', hideLegal);


    const createOAuthHandler = (providerType, button) => {
      return async () => {
        errorDiv.textContent = '';
        button.disabled = true;
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span>Signing in…</span>';

        try {
          let provider;
          if (providerType === 'Google') {
            provider = new firebase.auth.GoogleAuthProvider();
          } else if (providerType === 'GitHub') {
            provider = new firebase.auth.GithubAuthProvider();
          }

          try {
            const result = await this.auth.signInWithPopup(provider);
            await this.handleOAuthSignIn(result);
          } catch (popupError) {
            if (popupError.code === 'auth/unauthorized-domain') {
              await this.auth.signInWithRedirect(provider);
              return;
            }
            throw popupError;
          }
        } catch (error) {
          console.error(`${providerType} Sign-In error:`, error);
          button.disabled = false;
          button.innerHTML = originalHTML;

          if (error.code === 'auth/popup-closed-by-user') {
            errorDiv.textContent = 'Sign-in cancelled';
          } else if (error.code === 'auth/popup-blocked') {
            errorDiv.textContent = 'Pop-up blocked. Please allow pop-ups for this site.';
          } else if (error.code === 'auth/cancelled-popup-request') {
            errorDiv.textContent = '';
          } else if (error.code === 'auth/unauthorized-domain') {
            errorDiv.textContent = 'This domain is not authorized. Please add it to Firebase Console.';
          } else if (error.code === 'auth/account-exists-with-different-credential') {
            errorDiv.textContent = 'An account already exists with this email using a different sign-in method.';
          } else {
            errorDiv.textContent = error.message;
          }
        }
      };
    };

    googleBtn.addEventListener('click', createOAuthHandler('Google', googleBtn));
    githubBtn.addEventListener('click', createOAuthHandler('GitHub', githubBtn));


    toggleBtn.addEventListener('click', () => {
      isSignUp = !isSignUp;
      if (isSignUp) {
        nameInput.style.display = 'block';
        submitBtn.textContent = 'Sign Up';
        toggleBtn.textContent = 'Already have an account? Sign in';
      } else {
        nameInput.style.display = 'none';
        submitBtn.textContent = 'Sign In';
        toggleBtn.textContent = "Don't have an account? Sign up";
      }
      errorDiv.textContent = '';
    });


    submitBtn.addEventListener('click', async () => {
      const email    = emailInput.value.trim();
      const password = passwordInput.value;
      const name     = nameInput.value.trim();

      errorDiv.textContent = '';

      if (!email || !password) {
        errorDiv.textContent = 'Please enter email and password';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = isSignUp ? 'Creating account…' : 'Signing in…';

      try {
        if (isSignUp) {
          if (!name) {
            errorDiv.textContent = 'Please enter your name';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign Up';
            return;
          }
          const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
          await this.db.collection('users').doc(userCredential.user.uid).set({
            name:      name,
            email:     email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            storage:   {}
          });
        } else {
          await this.auth.signInWithEmailAndPassword(email, password);
        }
      } catch (error) {
        console.error('Auth error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = isSignUp ? 'Sign Up' : 'Sign In';

        if (error.code === 'auth/invalid-email') {
          errorDiv.textContent = 'Invalid email address';
        } else if (error.code === 'auth/user-not-found') {
          errorDiv.textContent = 'No account found with this email';
        } else if (error.code === 'auth/wrong-password') {
          errorDiv.textContent = 'Incorrect password';
        } else if (error.code === 'auth/email-already-in-use') {
          errorDiv.textContent = 'Email already in use';
        } else if (error.code === 'auth/weak-password') {
          errorDiv.textContent = 'Password should be at least 6 characters';
        } else {
          errorDiv.textContent = error.message;
        }
      }
    });


    guestBtn.addEventListener('click', () => {
      console.log('Continuing as guest');
      this.isGuest = true;
      this.hideAuthPrompt();
    });


    const handleEnter = (e) => { if (e.key === 'Enter') submitBtn.click(); };
    emailInput.addEventListener('keypress',    handleEnter);
    passwordInput.addEventListener('keypress', handleEnter);
    nameInput.addEventListener('keypress',     handleEnter);
  }

  hideAuthPrompt() {
    const overlay = document.getElementById('auth-prompt-overlay');
    if (overlay) overlay.remove();
  }


  async handleOAuthSignIn(result) {
    console.log('OAuth Sign-In successful');

    const userDoc = await this.db.collection('users').doc(result.user.uid).get();
    if (!userDoc.exists) {
      await this.db.collection('users').doc(result.user.uid).set({
        name:      result.user.displayName || result.user.email.split('@')[0] || 'User',
        email:     result.user.email,
        photoURL:  result.user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        storage:   {}
      });
    }
  }


  async loadUserData() {
    if (!this.user) return;

    try {
      localStorage.clear();

      const doc = await this.db.collection('users').doc(this.user.uid).get();
      if (doc.exists) {
        const data    = doc.data();
        const storage = data.storage || {};
        const keys    = Object.keys(storage);

        keys.forEach(key => {
          try {
            localStorage.setItem(key, storage[key]);
          } catch (e) {
            console.warn(`Failed to set localStorage key "${key}":`, e);
          }
        });

        console.log(`User data loaded from server: ${keys.length} items restored`);
      } else {
        console.log('No stored data found for user');
      }

      this.restoreBackground();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  restoreBackground() {
    try {
      const pref  = JSON.parse(localStorage.getItem('bgPreference'));
      if (!pref) return;
      const frame = document.getElementById('background-frame');
      if (!frame) return;

      if (pref.mode === 'daily') {
        frame.src = 'https://i.cgamz.site';
      } else if (pref.collection && pref.index) {
        frame.src = `https://i.cgamz.site?c=${encodeURIComponent(pref.collection)}&i=${encodeURIComponent(pref.index)}`;
      }

      console.log('[Background] Restored preference:', pref);
    } catch (e) {
      console.warn('[Background] Failed to restore preference:', e);
    }
  }

  async syncToServer() {
    if (!this.user) return;

    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      storage[key] = localStorage.getItem(key);
    }

    const storageString = JSON.stringify(storage);
    if (this.lastSyncData === storageString) return;

    this.lastSyncData = storageString;
    this.syncCount++;

    console.log(
      `%c[Sync #${this.syncCount}] Data changed — syncing ${Object.keys(storage).length} items`,
      'color: #4CAF50; font-weight: bold'
    );

    await this.db.collection('users').doc(this.user.uid).set({
      storage,
      lastSync: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  startAutoSync() {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      this.syncToServer();
    }, 5000);

    console.log('[Auto-Sync] Started — syncing every 5 seconds (change-based)');
  }

  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      this.syncCount    = 0;
      this.lastSyncData = null;
      console.log('%c[Auto-Sync] Stopped', 'color: #FF9800; font-weight: bold');
    }
  }


  async signOut() {
    await this.auth.signOut();
    localStorage.clear();
    this.isGuest = false;
  }

  getUserName() {
    return this.user ? this.user.email : 'Guest';
  }

  async getUserProfile() {
    if (!this.user) return null;

    const doc = await this.db.collection('users').doc(this.user.uid).get();
    return doc.exists ? doc.data() : null;
  }
}


const accountManager = new AccountManager();
window.accountManager = accountManager;

document.addEventListener('DOMContentLoaded', () => {
  const signoutBtn = document.getElementById('signout-btn');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => {
      accountManager.signOut();
    });
  }
});