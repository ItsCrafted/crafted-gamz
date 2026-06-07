const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';
const isOnly = new URLSearchParams(window.location.search).get('only') === 'true';

const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
let auth, db, chosen = null, authReady = false;

const nextBtn  = document.getElementById('next-btn');
const errorMsg = document.getElementById('error-msg');

function select(el) {
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  chosen = el.dataset.value;
  nextBtn.disabled = false;
}

async function init() {
  try {
    const res = await fetch(FIREBASE_CONFIG_URL, {
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
    });
    const config = await res.json();
    if (!firebase.apps.length) firebase.initializeApp(config);
    auth = firebase.auth();
    db   = firebase.firestore();

    auth.onAuthStateChanged(user => {
      authReady = true;
      if (!user && shouldRedirect) { window.location.href = '1.html'; }
    });
  } catch (e) {
    errorMsg.textContent = 'Could not connect. Please refresh.';
  }
}

nextBtn.addEventListener('click', async () => {
  if (!chosen) return;

  const user = await new Promise(resolve => {
    if (authReady) return resolve(auth.currentUser);
    const unsub = auth.onAuthStateChanged(u => { unsub(); resolve(u); });
  });

  if (!user) { window.location.href = '1.html'; return; }

  nextBtn.disabled  = true;
  nextBtn.innerHTML = '<span class="spinner"></span>';

  try {
    await db.collection('users').doc(user.uid).update({
      environment: chosen,
      onboardingStep: 3
    });
    if (shouldRedirect) window.location.href = isOnly ? '5.html' : '3.html';
  } catch (e) {
    console.error(e.code, e.message);
    errorMsg.textContent = 'Something went wrong. Try again.';
    nextBtn.disabled     = false;
    nextBtn.textContent  = 'Continue';
  }
});

init();