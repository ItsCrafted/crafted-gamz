const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

    async function init() {
      let config;
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        config = await res.json();
      } catch (e) {
        window.location.href = '1.html';
        return;
      }

      if (!firebase.apps.length) firebase.initializeApp(config);
      const auth = firebase.auth();
      const db   = firebase.firestore();

      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          window.location.href = '1.html';
          return;
        }
        try {
          const doc = await db.collection('users').doc(user.uid).get();
          const step = doc.exists ? (doc.data().onboardingStep || 1) : 1;
          window.location.href = `${step}.html`;
        } catch (e) {
          window.location.href = '1.html';
        }
      });
    }

    init();