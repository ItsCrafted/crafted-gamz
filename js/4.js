// Onboarding Step 4: Terms & Privacy
// Simple flow step with checkbox validation

const tosContent = `
<h2>Terms of Service</h2>
<p><strong>Last Updated: January 2024</strong></p>

<h3>1. Acceptance of Terms</h3>
<p>By accessing and using Crafted Gamz, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h3>2. Use License</h3>
<p>Permission is granted to temporarily download one copy of the materials (information or software) from Crafted Gamz for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
<ul>
<li>Modify or copy the materials</li>
<li>Use the materials for any commercial purpose, or for any public display</li>
<li>Attempt to decompile or reverse engineer any software contained on Crafted Gamz</li>
<li>Remove any copyright or other proprietary notations from the materials</li>
<li>Transfer the materials to another person or "mirror" the materials on any other server</li>
</ul>

<h3>3. Disclaimer</h3>
<p>The materials on Crafted Gamz are provided on an 'as is' basis. Crafted Gamz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

<h3>4. Limitations</h3>
<p>In no event shall Crafted Gamz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Crafted Gamz.</p>

<h3>5. Accuracy of Materials</h3>
<p>The materials appearing on Crafted Gamz could include technical, typographical, or photographic errors. Crafted Gamz does not warrant that any of the materials on Crafted Gamz are accurate, complete, or current. Crafted Gamz may make changes to the materials contained on Crafted Gamz at any time without notice.</p>

<h3>6. Links</h3>
<p>Crafted Gamz has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Crafted Gamz of the site. Use of any such linked website is at the user's own risk.</p>

<h3>7. Modifications</h3>
<p>Crafted Gamz may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>

<h3>8. Governing Law</h3>
<p>These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
`;

const ppContent = `
<h2>Privacy Policy</h2>
<p><strong>Last Updated: January 2024</strong></p>

<h3>1. Introduction</h3>
<p>Crafted Gamz ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.</p>

<h3>2. Information We Collect</h3>
<p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
<ul>
<li><strong>Personal Data:</strong> Email address, display name, and account preferences</li>
<li><strong>Usage Data:</strong> Information about how you interact with our services, including game progress and settings</li>
<li><strong>Technical Data:</strong> Browser type, IP address, and pages visited</li>
</ul>

<h3>3. Use of Your Information</h3>
<p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
<ul>
<li>Create and manage your account</li>
<li>Save your game progress and preferences</li>
<li>Email you regarding your account or order</li>
<li>Generate analytics data to improve our services</li>
<li>Prevent fraudulent transactions and enhance security</li>
</ul>

<h3>4. Disclosure of Your Information</h3>
<p>We may share your information in the following situations:</p>
<ul>
<li><strong>By Law or to Protect Rights:</strong> If required by law or in response to legal requests</li>
<li><strong>Service Providers:</strong> With vendors who assist us in operating our website and conducting our business</li>
<li><strong>Business Transfers:</strong> If Crafted Gamz is involved in a merger, acquisition, or bankruptcy</li>
</ul>

<h3>5. Security of Your Information</h3>
<p>We use administrative, technical, and physical security measures to protect your personal information. However, perfect security does not exist on the Internet.</p>

<h3>6. Contact Us</h3>
<p>If you have questions or comments about this Privacy Policy, please contact us at the appropriate support channel.</p>

<h3>7. Changes to This Policy</h3>
<p>We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site following any modifications constitutes your acceptance of the updated Privacy Policy.</p>
`;

function switchTab(tab) {
  const tosTab = document.getElementById('tos-tab');
  const ppTab = document.getElementById('pp-tab');
  const tosContentEl = document.getElementById('tos-content');
  const tabPill = document.getElementById('tab-pill');
  
  if (tab === 'tos') {
    tosTab.classList.add('active');
    ppTab.classList.remove('active');
    tosContentEl.innerHTML = tosContent;
    tabPill.style.left = '0';
  } else if (tab === 'pp') {
    tosTab.classList.remove('active');
    ppTab.classList.add('active');
    tosContentEl.innerHTML = ppContent;
    tabPill.style.left = '50%';
  }
  
  // Scroll to top of content
  const scrollBox = document.getElementById('scroll-box');
  if (scrollBox) {
    scrollBox.scrollTop = 0;
  }
}

async function init() {
  // Load initial ToS content
  switchTab('tos');
  
  const nextBtn = document.getElementById('next-btn');
  const tosCheck = document.getElementById('tos-check');
  const ppCheck = document.getElementById('pp-check');
  const scrollBox = document.getElementById('scroll-box');
  const scrollHint = document.getElementById('scroll-hint');

  // Handle scroll hint
  if (scrollBox && scrollHint) {
    scrollBox.addEventListener('scroll', () => {
      if (scrollBox.scrollTop > 50) {
        scrollHint.style.opacity = '0';
        scrollHint.style.pointerEvents = 'none';
      } else {
        scrollHint.style.opacity = '1';
        scrollHint.style.pointerEvents = 'auto';
      }
    });
  }

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
