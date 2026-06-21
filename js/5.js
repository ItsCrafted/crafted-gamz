const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';

const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
    let auth, db, userName = '';

    const envMap = {
      browser: { label: 'Browser mode', path: '../index.html' }
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
        if (typeof UserStats !== 'undefined') UserStats.bindAuth(firebase, auth);

        auth.onAuthStateChanged(async user => {
          if (!user && shouldRedirect) { window.location.href = '1.html'; return; }

          const doc = await db.collection('users').doc(user.uid).get();
          if (doc.exists) {
            userName = doc.data().name || '';

            await db.collection('users').doc(user.uid).set(
              { onboardingStep: 5, onboardingComplete: true },
              { merge: true }
            );
          }

          document.getElementById('greeting').textContent = userName
            ? `Hey, ${userName}.`
            : '';
          document.getElementById('env-label').textContent = envMap.browser.label;
        });
      } catch (e) {
        document.getElementById('env-label').textContent = 'Browser mode';
      }
    }

    document.getElementById('launch-btn').addEventListener('click', () => {
      const target = envMap.browser.path;
      if (shouldRedirect) window.location.href = target;
    });

    init();
