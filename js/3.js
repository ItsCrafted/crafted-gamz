// Onboarding Step 3: Display Name
// Simple flow step

async function init() {
  const nextBtn = document.getElementById('next-btn');
  const nameInput = document.getElementById('name-input');
  const charCount = document.getElementById('char-count');

  if (charCount && nameInput) {
    nameInput.addEventListener('input', () => {
      charCount.textContent = nameInput.value.length;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      window.location.href = '4.html';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
