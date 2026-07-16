const TAB_DATA = {
  files: { title: 'Files Explorer', desc: 'View and manage document data collections.' },
  add: { title: 'Database Editor', desc: 'Commit new documents or pull custom collections.' },
  search: { title: 'Data Search', desc: 'Search database collections using pattern matching.' },
  history: { title: 'Audit Log', desc: 'View revision histories and roll back document state.' },
  schemas: { title: 'Data Schemas', desc: 'Define structural constraints and schemas.' },
  account: { title: 'Account Settings', desc: 'Configure your user profile, backups, and security settings.' },
  docs: { title: 'Developer Docs', desc: 'Integrate the client SDK into your serverless projects.' },
};

function showDashboard(user) {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('dashboard-section').classList.remove('hidden');
  document.getElementById('user-name').textContent = user.displayName || user.email;
  document.getElementById('user-email').textContent = user.email;
  document.getElementById('account-email').textContent = user.email;
  document.getElementById('account-uid').textContent = user.uid;

  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
  document.getElementById('user-avatar-initial').textContent = initial;

  document.getElementById('account-created').textContent = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'Active User';

  const fieldSelect = document.getElementById('field-select');
  fieldSelect.innerHTML = '<option value="">Select a field to view details</option>';
  Object.keys(user).forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    fieldSelect.appendChild(option);
  });

  loadFileTree();
}

function showTab(tab) {
  document.querySelectorAll('.menu-item').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach((t) => t.classList.add('hidden'));

  const activeBtn = document.querySelector(`.menu-item[onclick="showTab('${tab}')"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const activePanel = document.getElementById('tab-' + tab);
  if (activePanel) activePanel.classList.remove('hidden');

  const titleEl = document.getElementById('workspace-current-tab');
  const descEl = document.getElementById('workspace-current-desc');

  if (TAB_DATA[tab]) {
    titleEl.textContent = TAB_DATA[tab].title;
    descEl.textContent = TAB_DATA[tab].desc;
  }
}

function showRegister() {
  document.getElementById('email-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('email-form').classList.remove('hidden');
}

function showFieldDetails() {
  const select = document.getElementById('field-select');
  const details = document.getElementById('field-details');
  const user = App.ccloud.getCurrentUser();

  if (!select.value || !user) {
    details.classList.remove('show');
    return;
  }

  const value = user[select.value];
  details.innerHTML = `
    <div class="field-row">
      <span class="field-label">Field:</span>
      <span class="field-value">${escapeHtml(select.value)}</span>
    </div>
    <div class="field-row">
      <span class="field-label">Type:</span>
      <span class="field-value">${escapeHtml(typeof value)}</span>
    </div>
    <div class="field-row">
      <span class="field-label">Value:</span>
      <span class="field-value" style="font-family: monospace;">${escapeHtml(typeof value === 'object' ? JSON.stringify(value, null, 2) : value)}</span>
    </div>
  `;
  details.classList.add('show');
}

function closeFileViewer() {
  document.getElementById('file-viewer').classList.add('hidden');
}

function updateBulkActionState() {
  const checked = document.querySelectorAll('.file-checkbox:checked').length;
  const bar = document.getElementById('bulk-actions-bar');
  if (!bar) return;

  if (checked > 0) {
    bar.classList.remove('hidden');
    document.getElementById('checked-count').textContent = checked;
  } else {
    bar.classList.add('hidden');
  }
}

Object.assign(window, {
  showDashboard,
  showTab,
  showRegister,
  showLogin,
  showFieldDetails,
  closeFileViewer,
  updateBulkActionState,
});
