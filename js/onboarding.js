async function init() {
  try {
    // Check if user is logged in via cCloud
    const savedSession = localStorage.getItem('ccloud_session');
    if (!savedSession) {
      window.location.href = '1.html';
      return;
    }

    const session = JSON.parse(savedSession);
    if (!session.user || !session.token) {
      window.location.href = '1.html';
      return;
    }

    // User is logged in, go to main page
    window.location.href = '../';
  } catch (e) {
    console.warn('[Onboarding] Init error:', e);
    window.location.href = '1.html';
  }
}

init();