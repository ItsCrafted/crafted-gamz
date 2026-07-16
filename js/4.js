// Onboarding Step 4: Terms & Privacy
// Simple flow step with checkbox validation

async function init() {
  const nextBtn = document.getElementById('next-btn');
  const tosCheck = document.getElementById('tos-check');
  const ppCheck = document.getElementById('pp-check');

  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      if (!tosCheck?.checked || !ppCheck?.checked) {
        const errorMsg = document.getElementById('error-msg');
        if (errorMsg) errorMsg.textContent = 'Please agree to both documents';
        return;
      }

      window.location.href = '5.html';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
