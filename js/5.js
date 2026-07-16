// Onboarding Step 5: Complete & Launch
// Final step - show user greeting and launch main app

async function init() {
  try {
    const savedSession = localStorage.getItem('ccloud_session');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      const greeting = document.getElementById('greeting');
      if (greeting && session.user) {
        greeting.textContent = `Welcome, ${session.user.displayName || session.user.email.split('@')[0]}!`;
      }
    }
  } catch (e) {
    console.error('[Onboarding 5] Init error:', e);
  }

  const launchBtn = document.getElementById('launch-btn');
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      window.location.href = '../';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
