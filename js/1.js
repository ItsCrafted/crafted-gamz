// Onboarding Step 1: Account (handled by account manager in parent)
// This page just needs to check auth status and redirect

async function init() {
  try {
    const savedSession = localStorage.getItem('ccloud_session');
    if (!savedSession) {
      // Not logged in, show login (handled by parent)
      return;
    }

    const session = JSON.parse(savedSession);
    if (session.user && session.token) {
      // Already logged in, go to step 2
      window.location.href = '2.html';
    }
  } catch (e) {
    console.error('[Onboarding 1] Init error:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
