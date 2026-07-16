// Onboarding Step 1: Account (ccloud email/password sign-in only)

const ccloud = new CCloudClient();

async function handleSignIn() {
  try {
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');

    if (!email || !password) {
      errorMsg.textContent = 'Please enter your email and password';
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    errorMsg.textContent = '';

    // Sign in with ccloud
    await ccloud.signInWithEmail(email, password, true); // remember = true

    // If successful, redirect to step 2
    window.location.href = '2.html';
  } catch (e) {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = e.message || 'Sign in failed. Please check your email and password.';
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign In';
    console.error('[Onboarding 1] Sign in error:', e);
  }
}

async function init() {
  try {
    const savedSession = localStorage.getItem('ccloud_session');
    if (!savedSession) {
      // Not logged in, set up sign-in form
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.addEventListener('click', handleSignIn);
      
      // Allow Enter key to submit
      document.getElementById('password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSignIn();
        }
      });
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
