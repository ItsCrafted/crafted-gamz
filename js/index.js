const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';

    async function init() {
      let config;
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        config = await res.json();
      } catch (e) {
        redirect('onboarding/1.html');
        return;
      }

      if (!firebase.apps.length) firebase.initializeApp(config);
      const auth = firebase.auth();
      const db   = firebase.firestore();

      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          redirect('onboarding/1.html');
          return;
        }

        try {
          const doc = await db.collection('users').doc(user.uid).get();
          if (!doc.exists) {
            redirect('onboarding/1.html');
            return;
          }

          const data = doc.data();
          const step = data.onboardingStep || 1;

          if (step < 5) {
            redirect(`onboarding/${step}.html`);
            return;
          }

          const env = data.environment || 'website';
          const envMap = {
            desktop: 'desktop/index.html',
            windowed: 'browser/index.html',
            browser:  'browser/index.html',
            website: 'site/index.html'
          };
          redirect(envMap[env] || 'site/index.html');

        } catch (e) {
          redirect('onboarding/1.html');
        }
      });
    }

    function redirect(path) {
      window.location.href = path;
    }

    init();