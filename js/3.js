const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';
const isOnly = new URLSearchParams(window.location.search).get('only') === 'true';

 const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
    let auth, db;

    const nameInput  = document.getElementById('name-input');
    const charCount  = document.getElementById('char-count');
    const nextBtn    = document.getElementById('next-btn');
    const errorMsg   = document.getElementById('error-msg');

    nameInput.addEventListener('input', () => {
      charCount.textContent = nameInput.value.length;
      errorMsg.textContent  = '';
    });

    async function init() {
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        const config = await res.json();
        if (!firebase.apps.length) firebase.initializeApp(config);
        auth = firebase.auth();
        db   = firebase.firestore();
        if (typeof UserStats !== 'undefined') UserStats.bindAuth(firebase, auth);

        auth.onAuthStateChanged(async user => {
          if (!user && shouldRedirect) { window.location.href = '1.html'; return; }
          const doc = await db.collection('users').doc(user.uid).get();
          if (doc.exists && doc.data().name) {
            nameInput.value       = doc.data().name;
            charCount.textContent = doc.data().name.length;
          }
        });
      } catch (e) {
        errorMsg.textContent = 'Could not connect. Please refresh.';
      }
    }

    nextBtn.addEventListener('click', async () => {
      const name = nameInput.value.trim();
      if (!name) { errorMsg.textContent = 'Please enter a display name.'; return; }
      if (name.length < 2) { errorMsg.textContent = 'Name must be at least 2 characters.'; return; }

      nextBtn.disabled   = true;
      nextBtn.innerHTML  = '<span class="spinner"></span>';

      try {
        const user = auth.currentUser;
        await db.collection('users').doc(user.uid).set(
          { name, onboardingStep: 4 },
          { merge: true }
        );
        if (shouldRedirect) window.location.href = isOnly ? '5.html' : '4.html';
      } catch (e) {
        errorMsg.textContent = 'Something went wrong. Try again.';
        nextBtn.disabled     = false;
        nextBtn.textContent  = 'Continue';
      }
    });

    nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') nextBtn.click(); });

    init();