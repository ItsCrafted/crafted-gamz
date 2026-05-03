const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';
const isOnly = new URLSearchParams(window.location.search).get('only') === 'true';

const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
    let auth, db, userEnv = 'website', userName = '';

    const envMap = {
      desktop: { label: 'Desktop mode',  path: '../desktop/index.html' },
      tabbed:  { label: 'Tabbed mode',   path: '../tabbed/index.html'  },
      website: { label: 'Website mode',  path: '../website/index.html' }
    };

    async function init() {
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        const config = await res.json();
        if (!firebase.apps.length) firebase.initializeApp(config);
        auth = firebase.auth();
        db   = firebase.firestore();

        auth.onAuthStateChanged(async user => {
          if (!user && shouldRedirect) { window.location.href = '1.html'; return; }

          const doc = await db.collection('users').doc(user.uid).get();
          if (doc.exists) {
            const data = doc.data();
            userEnv  = data.environment || 'website';
            userName = data.name || '';

            await db.collection('users').doc(user.uid).set(
              { onboardingStep: 5, onboardingComplete: true },
              { merge: true }
            );
          }

          document.getElementById('greeting').textContent = userName
            ? `Hey, ${userName}.`
            : '';
          document.getElementById('env-label').textContent = envMap[userEnv]?.label || 'Website mode';
        });
      } catch (e) {
        document.getElementById('env-label').textContent = 'Website mode';
      }
    }

    document.getElementById('launch-btn').addEventListener('click', () => {
      const target = envMap[userEnv]?.path || '../website/index.html';
      if (shouldRedirect) window.location.href = target;
    });

    init();