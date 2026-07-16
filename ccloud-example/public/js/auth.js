async function init() {
  App.ccloud = new CCloud({ workerUrl: App.workerUrl });
  await App.ccloud.init();
  const user = App.ccloud.getCurrentUser();
  if (user) showDashboard(user);
}

async function signInWithEmail() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;

  if (!email || !password) return showError('Please fill in all fields');
  showLoading(true);
  try {
    const user = await App.ccloud.signInWithEmail(email, password, rememberMe);
    showDashboard(user);
    showSuccess('Signed in successfully!');
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function registerWithEmail() {
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const displayName = document.getElementById('reg-displayname').value;
  const rememberMe = document.getElementById('reg-remember-me').checked;

  if (!email || !password) return showError('Please fill in all required fields');
  showLoading(true);
  try {
    const user = await App.ccloud.registerWithEmail(email, password, displayName, rememberMe);
    showDashboard(user);
    showSuccess('Registered successfully!');
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function signOut() {
  showLoading(true);
  try {
    await App.ccloud.signOut();
    location.reload();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

async function deleteAccount() {
  if (!confirm('Are you sure you want to delete your account and all data? This cannot be undone.')) return;
  showLoading(true);
  try {
    const user = App.ccloud.getCurrentUser();
    const idToken = await App.ccloud.getToken();
    await fetch(App.workerUrl + '/auth/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + idToken },
      body: JSON.stringify({ uid: user.uid }),
    });
    await App.ccloud.signOut();
    location.reload();
  } catch (e) {
    showError(e.message);
  }
  showLoading(false);
}

Object.assign(window, {
  init,
  signInWithEmail,
  registerWithEmail,
  signOut,
  deleteAccount,
});
