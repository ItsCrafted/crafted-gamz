const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';
const isOnly = new URLSearchParams(window.location.search).get('only') === 'true';

const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

    let auth, db;
    let isSignUp = false;

    const emailInput    = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const nameInput     = document.getElementById('name-input');
    const nameField     = document.getElementById('name-field');
    const submitBtn     = document.getElementById('submit-btn');
    const toggleBtn     = document.getElementById('toggle-btn');
    const errorMsg      = document.getElementById('error-msg');
    const googleBtn     = document.getElementById('google-btn');
    const githubBtn     = document.getElementById('github-btn');

    async function init() {
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        const config = await res.json();
        if (!firebase.apps.length) firebase.initializeApp(config);
        auth = firebase.auth();
        db   = firebase.firestore();

        auth.getRedirectResult().then(async (result) => {
          if (result.user) await handleOAuth(result.user);
        }).catch(console.error);

        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
              const step = doc.data().onboardingStep || 1;
              if (step > 1) { if (shouldRedirect) window.location.href = `${step}.html`; return; }
            }
            await db.collection('users').doc(user.uid).set(
              { onboardingStep: 2 }, { merge: true }
            );
            if (shouldRedirect) window.location.href = isOnly ? '5.html' : '2.html';
          }
        });
      } catch (e) {
        errorMsg.textContent = 'Could not connect. Please refresh.';
      }
    }

    async function handleOAuth(user) {
      const doc = await db.collection('users').doc(user.uid).get();
      if (!doc.exists) {
        await db.collection('users').doc(user.uid).set({
          name:      user.displayName || user.email.split('@')[0],
          email:     user.email,
          photoURL:  user.photoURL || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          storage:   {},
          onboardingStep: 2
        });
      }
    }

    toggleBtn.addEventListener('click', () => {
      isSignUp = !isSignUp;
      nameField.style.display  = isSignUp ? 'block' : 'none';
      submitBtn.textContent    = isSignUp ? 'Create Account' : 'Sign In';
      toggleBtn.textContent    = isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up";
      errorMsg.textContent     = '';
    });

    submitBtn.addEventListener('click', async () => {
      const email    = emailInput.value.trim();
      const password = passwordInput.value;
      const name     = nameInput.value.trim();
      errorMsg.textContent = '';

      if (!email || !password) { errorMsg.textContent = 'Email and password required.'; return; }

      submitBtn.disabled    = true;
      submitBtn.innerHTML   = `<span class="spinner"></span>`;

      try {
        if (isSignUp) {
          if (!name) { errorMsg.textContent = 'Display name required.'; submitBtn.disabled = false; submitBtn.textContent = 'Create Account'; return; }
          const cred = await auth.createUserWithEmailAndPassword(email, password);
          await db.collection('users').doc(cred.user.uid).set({
            name, email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            storage: {},
            onboardingStep: 2
          });
        } else {
          await auth.signInWithEmailAndPassword(email, password);
        }
      } catch (err) {
        submitBtn.disabled    = false;
        submitBtn.textContent = isSignUp ? 'Create Account' : 'Sign In';
        const map = {
          'auth/invalid-email':                   'Invalid email address.',
          'auth/user-not-found':                  'No account with that email.',
          'auth/wrong-password':                  'Incorrect password.',
          'auth/email-already-in-use':            'Email already in use.',
          'auth/weak-password':                   'Password must be 6+ characters.',
          'auth/popup-blocked':                   'Pop-up blocked — please allow pop-ups.',
          'auth/unauthorized-domain':             'This domain is not authorized in Firebase.',
          'auth/account-exists-with-different-credential': 'Account exists with a different sign-in method.'
        };
        errorMsg.textContent = map[err.code] || err.message;
      }
    });

    function oauthHandler(provider) {
      return async () => {
        errorMsg.textContent = '';
        try {
          const p = provider === 'Google'
            ? new firebase.auth.GoogleAuthProvider()
            : new firebase.auth.GithubAuthProvider();
          const result = await auth.signInWithPopup(p);
          await handleOAuth(result.user);
        } catch (err) {
          if (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-closed-by-user') return;
          const map = {
            'auth/popup-blocked':       'Pop-up blocked — please allow pop-ups.',
            'auth/unauthorized-domain': 'This domain is not authorized in Firebase.'
          };
          errorMsg.textContent = map[err.code] || err.message;
        }
      };
    }

    googleBtn.addEventListener('click', oauthHandler('Google'));
    githubBtn.addEventListener('click', oauthHandler('GitHub'));

    const enter = (e) => { if (e.key === 'Enter') submitBtn.click(); };
    emailInput.addEventListener('keypress', enter);
    passwordInput.addEventListener('keypress', enter);
    nameInput.addEventListener('keypress', enter);

    init();