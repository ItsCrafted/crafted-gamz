const shouldRedirect = new URLSearchParams(window.location.search).get('skip') !== 'true';
const isOnly = new URLSearchParams(window.location.search).get('only') === 'true';

const FIREBASE_CONFIG_URL = 'https://firebase.cdn.cgamz.online';
    let auth, db;

    const tosCheck  = document.getElementById('tos-check');
    const ppCheck   = document.getElementById('pp-check');
    const nextBtn   = document.getElementById('next-btn');
    const errorMsg  = document.getElementById('error-msg');
    const scrollBox = document.getElementById('scroll-box');
    const scrollHint = document.getElementById('scroll-hint');

    const TOS_HTML = `
<h1>Terms of Service</h1>
<p style="color:var(--text-dim);font-size:11px;font-family:var(--mono);margin-bottom:16px;">Last updated: April 11, 2026 &nbsp;·&nbsp; Est. read: 2 min</p>
<hr>
<p>Welcome to Crafted Gamz. By using our services, you agree to these terms.</p>
<h2>1. Acceptance of Terms</h2>
<p>By accessing or using Crafted Gamz, you confirm that you are at least 11 years old and agree to be bound by these Terms of Service.</p>
<h2>2. Your Account</h2>
<p>You are responsible for maintaining the security of your account and password. Crafted Gamz cannot and will not be liable for any loss or damage from your failure to comply with this obligation.</p>
<ul>
  <li>Do not share your password with others</li>
  <li>Notify us immediately of any unauthorized access</li>
  <li>You are responsible for all activity under your account</li>
</ul>
<p>We will try our hardest to prevent data loss, but nothing is perfect.</p>
<h2>3. Acceptable Use</h2>
<p>You agree not to use Crafted Gamz to:</p>
<ul>
  <li>Violate any applicable laws or regulations</li>
  <li>Transmit harmful, offensive, or disruptive content</li>
  <li>Attempt to gain unauthorized access to our systems</li>
  <li>Interfere with other users' experience</li>
  <li>Purposely harm our systems or users</li>
</ul>
<h2>4. Data and Syncing</h2>
<p>Crafted Gamz syncs your game data across devices using your account. We store only the data necessary to provide this service. You can delete your account and associated data at any time — instructions are in our Privacy Policy.</p>
<h2>5. Termination</h2>
<p>We reserve the right to suspend or terminate accounts that violate these terms, with or without notice.</p>
<h2>6. Changes to Terms</h2>
<p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
<h2>7. Contact</h2>
<p>Questions? Email us at <strong>crafted@craftedgamz.com</strong></p>
`;

    const PP_HTML = `
<h1>Privacy Policy</h1>
<p style="color:var(--text-dim);font-size:11px;font-family:var(--mono);margin-bottom:16px;">Last updated: April 11, 2026 &nbsp;·&nbsp; Est. read: 2 min</p>
<hr>
<p>Crafted Gamz is committed to protecting your privacy. This policy explains what data we collect and how we use it.</p>
<h2>1. Information We Collect</h2>
<p><strong>Account information:</strong> When you register, we collect your name, email address, and a hashed password. We recommend using an OAuth provider.</p>
<p><strong>Game data:</strong> We sync your localStorage data (game progress, settings, preferences) to our servers so it's available across devices.</p>
<p><strong>OAuth data:</strong> If you sign in with Google or GitHub, we receive your name, email, and profile photo from that provider.</p>
<h2>2. How We Use Your Data</h2>
<p>We use your data to provide and maintain the sync service, restore your game progress across devices, and authenticate you securely. We do <strong>not</strong> sell your data to third parties. We will only disclose your info if required by law.</p>
<h2>3. Data Storage</h2>
<p>Your data is stored in Google Firebase Firestore, governed by Google's security and compliance standards.</p>
<h2>4. Cookies and Local Storage</h2>
<p>We use localStorage to store your game state locally. This data is mirrored to our servers when you are signed in.</p>
<h2>5. Third-Party Services</h2>
<ul>
  <li><strong>Firebase (by Google)</strong> — authentication and database</li>
  <li><strong>GitHub OAuth</strong> — optional sign-in provider</li>
  <li><strong>Google OAuth</strong> — optional sign-in provider</li>
</ul>
<h2>6. Your Rights</h2>
<p>You may request deletion of your account and all associated data at any time via Settings → Data → Delete. You can also export your data in the same area.</p>
<h2>7. Children's Privacy</h2>
<p>Crafted Gamz is not directed at children under 11. We do not knowingly collect personal information from children under 11.</p>
<h2>8. Changes to This Policy</h2>
<p>We may update this policy periodically. We are not required to notify users of changes.</p>
<h2>9. Contact</h2>
<p>Privacy questions or data deletion requests: <strong>crafted@craftedgamz.com</strong></p>
`;

    let activeTab = 'tos';

    function switchTab(tab) {
      if (activeTab === tab) return;
      activeTab = tab;
      document.getElementById('tos-tab').classList.toggle('active', tab === 'tos');
      document.getElementById('pp-tab').classList.toggle('active',  tab === 'pp');

      const content = document.getElementById('tos-content');
      content.classList.add('fading');
      setTimeout(() => {
        content.innerHTML = tab === 'tos' ? TOS_HTML : PP_HTML;
        scrollBox.scrollTop = 0;
        scrollHint.classList.remove('hidden');
        content.classList.remove('fading');
      }, 180);
    }

    scrollBox.addEventListener('scroll', () => {
      const nearBottom = scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 30;
      if (nearBottom) scrollHint.classList.add('hidden');
    });

    document.getElementById('tos-content').innerHTML = TOS_HTML;

    nextBtn.addEventListener('click', async () => {
      errorMsg.textContent = '';
      if (!tosCheck.checked || !ppCheck.checked) {
        errorMsg.textContent = 'Please agree to both before continuing.';
        return;
      }

      nextBtn.disabled   = true;
      nextBtn.innerHTML  = '<span class="spinner"></span>';

      try {
        const user = auth.currentUser;
        await db.collection('users').doc(user.uid).set(
          { agreedToTOS: true, agreedAt: firebase.firestore.FieldValue.serverTimestamp(), onboardingStep: 5 },
          { merge: true }
        );
        if (shouldRedirect) window.location.href = '5.html';
      } catch (e) {
        errorMsg.textContent = 'Something went wrong. Try again.';
        nextBtn.disabled     = false;
        nextBtn.textContent  = 'Agree & Continue';
      }
    });

    async function init() {
      try {
        const res = await fetch(FIREBASE_CONFIG_URL, {
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'craftedgamz-firebase' }
        });
        const config = await res.json();
        if (!firebase.apps.length) firebase.initializeApp(config);
        auth = firebase.auth();
        db   = firebase.firestore();
        auth.onAuthStateChanged(user => { if (!user) window.location.href = '1.html'; });
      } catch (e) {
        errorMsg.textContent = 'Could not connect. Please refresh.';
      }
    }

    init();

    const _origSwitch = window.switchTab;
    window.switchTab = function(tab) {
      if (_origSwitch) _origSwitch(tab);
      document.getElementById('tab-pill').classList.toggle('right', tab === 'pp');
    };