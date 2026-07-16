(() => {
  async function init() {
    try {
      // Check for cCloud session
      const sessionStr = localStorage.getItem('ccloud_session');
      if (!sessionStr) {
        redirect('onboarding/1.html');
        return;
      }

      const session = JSON.parse(sessionStr);
      if (!session || !session.user) {
        redirect('onboarding/1.html');
        return;
      }

      // Session exists, user is logged in
      redirect('index.html');
    } catch (e) {
      console.error('[Index] Error:', e);
      redirect('onboarding/1.html');
    }
  }

  function redirect(path) {
    window.location.href = path;
  }

  init();
})();

    init();
